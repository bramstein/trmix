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
        userAgent.getPlatform() === Platform.WINDOWS_PHONE) {
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
      return Antialiasing.UNKNOWN;
    }
  };
});
