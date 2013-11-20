goog.provide('tr.Version');

goog.scope(function () {
  /**
   * Represents a version as used in user agent strings. Note
   * that this does not represent any sort of reliable versioning
   * scheme (like Semantic Versioning) but merely a best effort
   * at parsing a large amount of wildly different version strings.
   *
   * @constructor
   * @param {?number=} opt_major
   * @param {?number=} opt_minor
   * @param {?number=} opt_patch
   * @param {?(number|string)=} opt_build
   */
  tr.Version = function(opt_major, opt_minor, opt_patch, opt_build) {
    /**
     * @type {?number}
     */
    this.major_ = goog.isDefAndNotNull(opt_major) ? opt_major : null;

    /**
     * @type {?number}
     */
    this.minor_ = goog.isDefAndNotNull(opt_minor) ? opt_minor : null;

    /**
     * @type {?number}
     */
    this.patch_ = goog.isDefAndNotNull(opt_patch) ? opt_patch : null;

    /**
     * @type {?(number|string)}
     */
    this.build_ = goog.isDefAndNotNull(opt_build) ? opt_build : null;
  };

  var Version = tr.Version;

  Version.TOKENIZER = new RegExp(
    "^" +
    "([0-9]+)" +            // major
    "(?:" +
      "[\\._-]([0-9]+)" +   // minor
    ")?" +
    "(?:" +
      "[\\._-]([0-9]+)" +  // patch
    ")?" +
    "(?:" +
      "[\\._+-]?(.*)" +    // build
    ")?$"
  );

  /**
   * Returns true if the version is valid. A
   * version is considered valid if it has at
   * least a major version number.
   *
   * @return {boolean}
   */
  Version.prototype.isValid = function () {
    return !goog.isNull(this.major_);
  };

  /**
   * Compares two versions. Returns -1 if this
   * is smaller than version. Returns 1 if this
   * is greater than version. Returns 0 if this
   * equals version.
   *
   * Build strings or numbers are ignored when
   * comparing versions.
   *
   * @param {tr.Version} version
   * @return {number}
   */
  Version.prototype.compare = function (version) {
    if (this.major_ > version.major_ ||
        ((this.major_ === version.major_ && this.minor_ > version.minor_) ||
          (this.major_ === version.major_ && this.minor_ === version.minor_ && this.patch_ > version.patch_))) {
      return 1;
    } else if (this.major_ < version.major_ ||
               ((this.major_ === version.major_ && this.minor_ < version.minor_) ||
                (this.major_ === version.major_ && this.minor_ === version.minor_ && this.patch_ < version.patch_))) {
      return -1;
    }
    return 0;
  };

  /**
   * @param {tr.Version} version
   * @return {boolean}
   */
  Version.prototype.gt = function (version) {
    return this.compare(version) === 1;
  };

  /**
   * @param {tr.Version} version
   * @return {boolean}
   */
  Version.prototype.lt = function (version) {
    return this.compare(version) === -1;
  };

  /**
   * @param {tr.Version} version
   * @return {boolean}
   */
  Version.prototype.ge = function (version) {
    return this.compare(version) === 0 || this.compare(version) === 1;
  };

  /**
   * @param {tr.Version} version
   * @return {boolean}
   */
  Version.prototype.le = function (version) {
    return this.compare(version) === 0 || this.compare(version) === -1;
  };

  /**
   * @param {tr.Version} version
   * @return {boolean}
   */
  Version.prototype.eq = function (version) {
    return this.compare(version) === 0;
  };

  /**
   * @param {tr.Version} version
   * @return {boolean}
   */
  Version.prototype.ne = function (version) {
    return this.compare(version) !== 0;
  };

  /**
   * @param {string} str
   * @return {!tr.Version}
   */
  Version.parse = function (str) {
    var match = Version.TOKENIZER.exec(str),
        major = null,
        minor = null,
        patch = null,
        build = null;

    if (match) {
      if (!goog.isNull(match[1]) && !!match[1]) {
        major = parseInt(match[1], 10);
      }

      if (!goog.isNull(match[2]) && !!match[2]) {
        minor = parseInt(match[2], 10);
      }

      if (!goog.isNull(match[3]) && !!match[3]) {
        patch = parseInt(match[3], 10);
      }

      if (!goog.isNull(match[4]) && !!match[4]) {
        if (/^[0-9]+$/.test(match[4])) {
          build = parseInt(match[4], 10);
        } else {
          build = match[4];
        }
      }
    }

    return new Version(major, minor, patch, build);
  };
});
