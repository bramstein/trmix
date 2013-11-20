goog.provide('tr.UserAgent');

goog.require('tr.Browser');
goog.require('tr.Platform');
goog.require('tr.Version');

goog.scope(function () {
  /**
   * @constructor
   * @param {tr.Browser} browser
   * @param {tr.Version} browserVersion
   * @param {tr.Platform} platform
   * @param {tr.Version} platformVersion
   */
  tr.UserAgent = function(browser, browserVersion, platform, platformVersion) {
    this.browser_ = browser;
    this.browserVersion_ = browserVersion;
    this.platform_ = platform;
    this.platformVersion_ = platformVersion;
  }

  var UserAgent = tr.UserAgent,
      Browser = tr.Browser,
      Platform = tr.Platform,
      Version = tr.Version;

  /**
   * @return {tr.Browser}
   */
  UserAgent.prototype.getBrowser = function () {
    return this.browser_;
  };

  /**
   * @return {tr.Version}
   */
  UserAgent.prototype.getBrowserVersion = function () {
    return this.browserVersion_;
  };

  /**
   * @return {tr.Platform}
   */
  UserAgent.prototype.getPlatform = function () {
    return this.platform_;
  };

  /**
   * @return {tr.Version}
   */
  UserAgent.prototype.getPlatformVersion = function () {
    return this.platformVersion_;
  };

  /**
   * @param {string} userAgent
   * @return {tr.UserAgent}
   */
  UserAgent.parse = function (userAgent) {
    var browser = Browser.UNKNOWN,
        browserVersion = new Version(),
        platform = Platform.UNKNOWN,
        platformVersion = new Version(),
        match = null;

    if (match = /(?:iPod|iPad|iPhone).*? OS ([\d_]+)/.exec(userAgent)) {
      platform = Platform.IOS;
      platformVersion = Version.parse(match[1]);
    } else if (match = /(?:BB\d{2}|BlackBerry).*?Version\/([^\s]*)/.exec(userAgent)) {
      platform = Platform.BLACKBERRY;
      platformVersion = Version.parse(match[1]);
    } else if (match = /Android ([^;)]+)|Android/.exec(userAgent)) {
      platform = Platform.ANDROID;
      platformVersion = Version.parse(match[1]);
    } else if (match = /Windows Phone(?: OS)? ([^;)]+)/.exec(userAgent)) {
      platform = Platform.WINDOWS_PHONE;
      platformVersion = Version.parse(match[1]);
    } else if (match = /Linux ([^;)]+)|Linux/.exec(userAgent)) {
      platform = Platform.LINUX;
      platformVersion = Version.parse(match[1]);
    } else if (match = /OS X ([^;)]+)/.exec(userAgent)) {
      platform = Platform.OSX;
      platformVersion = Version.parse(match[1]);
    } else if (match = /Windows NT ([^;)]+)/.exec(userAgent)) {
      platform = Platform.WINDOWS;
      platformVersion = Version.parse(match[1]);
    } else if (match = /CrOS ([^;)]+)/.exec(userAgent)) {
      platform = Platform.CHROME_OS;
      platformVersion = Version.parse(match[1]);
    }

    if (match = /MSIE ([\d\w\.]+)/.exec(userAgent)) {
      browser = Browser.INTERNET_EXPLORER;
      browserVersion = Version.parse(match[1]);
    } else if (match = /Trident.*rv:([\d\w\.]+)/.exec(userAgent)) {
      browser = Browser.INTERNET_EXPLORER;
      browserVersion = Version.parse(match[1]);
    } else if (match = /OPR\/([\d.]+)/.exec(userAgent)) {
      browser = Browser.OPERA;
      browserVersion = Version.parse(match[1]);
    } else if (match = /Opera Mini.*Version\/([\d\.]+)/.exec(userAgent)) {
      browser = Browser.OPERA;
      browserVersion = Version.parse(match[1]);
    } else if (match = /Opera(?: |.*Version\/|\/)([\d\.]+)/.exec(userAgent)) {
      browser = Browser.OPERA;
      browserVersion = Version.parse(match[1]);
    } else if (match = /Firefox\/([\d\w\.]+)|Firefox/.exec(userAgent)) {
      browser = Browser.FIREFOX;
      browserVersion = Version.parse(match[1]);
    } else if (match = /(?:Chrome|CrMo|CriOS)\/([\d\.]+)/.exec(userAgent)) {
      browser = Browser.CHROME;
      browserVersion = Version.parse(match[1]);
    } else if (match = /Silk\/([\d\._]+)/.exec(userAgent)) {
      browser = Browser.SILK;
      browserVersion = Version.parse(match[1]);
    } else if (platform === Platform.ANDROID || platform === Platform.BLACKBERRY) {
      browser = Browser.BUILTIN;
    } else if (match = /Version\/([\d\.\w]+).*Safari/.exec(userAgent)) {
      browser = Browser.SAFARI;
      browserVersion = Version.parse(match[1]);
    }

    return new UserAgent(browser, browserVersion, platform, platformVersion);
  };
});
