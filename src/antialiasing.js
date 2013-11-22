goog.provide('tr.Antialiasing');

goog.require('tr.Platform');
goog.require('tr.Browser');
goog.require('tr.Version');

goog.scope(function () {

  /**
   * @enum {string}
   */
  tr.Antialiasing = {
    UNKNOWN: 'unknown',
    NONE: 'none',
    GRAYSCALE: 'grayscale',
    SUBPIXEL: 'subpixel'
  };

  var Antialiasing = tr.Antialiasing,
      Platform = tr.Platform,
      Browser = tr.Browser,
      Version = tr.Version;

  /**
   * @param {tr.UserAgent} userAgent
   * @return {tr.Antialiasing}
   */
  Antialiasing.get = function (userAgent) {
    if (userAgent.getPlatform() === Platform.IOS ||
        userAgent.getPlatform() === Platform.FIREFOX_OS ||
        userAgent.getPlatform() === Platform.CHROME_OS ||
        userAgent.getPlatform() === Platform.BLACKBERRY ||
        userAgent.getPlatform() === Platform.WINDOWS_PHONE ||
        userAgent.getPlatform() === Platform.ANDROID) {
      return Antialiasing.GRAYSCALE;
    } else if (userAgent.getPlatform() === Platform.WINDOWS &&
               userAgent.getPlatformVersion().ge(new Version(6, 2)) &&
               userAgent.getBrowser() === Browser.INTERNET_EXPLORER) {
      return Antialiasing.GRAYSCALE;
    } else {
      return Antialiasing.UNKNOWN;
    }
  };

  /**
   * @param {tr.UserAgent} userAgent
   * @return {tr.Antialiasing}
   */
  Antialiasing.guess = function (userAgent) {
    var antialiasing = Antialiasing.get(userAgent);

    if (antialiasing !== Antialiasing.UNKNOWN) {
      return antialiasing;
    } else {
      if (userAgent.getPlatform() === Platform.OSX ||
          userAgent.getPlatform() === Platform.LINUX) {
        // Font-smoothing is turned on by default on OSX, so
        // we assume most people do not disable it.
        return Antialiasing.SUBPIXEL;
      } else if (userAgent.getPlatform() === Platform.WINDOWS) {
        // Windows Vista+
        if (userAgent.getPlatformVersion().ge(new Version(6, 0))) {
          // ClearType is turned on by default on Windows Vista+ and
          // has improved a lot with DirectWrite, so we assume most
          // people have turned it on.
          return Antialiasing.SUBPIXEL;
        } else {
          if (userAgent.getBrowser() === Browser.INTERNET_EXPLORER) {
            if (userAgent.getBrowserVersion().ge(new Version(7, 0))) {
              return Antialiasing.SUBPIXEL;
            } else {
              // IE6 most likely does not have ClearType turned on
              return Antialiasing.GRAYSCALE;
            }
          } else {
            // If the user is using modern browsers on WindowsXP, they
            // most likely also have IE7 or IE8 installed and thus
            // ClearType enabled.
            return Antialiasing.SUBPIXEL;
          }
        }
      } else {
        return Antialiasing.UNKNOWN;
      }
    }
  };
});
