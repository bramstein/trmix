goog.provide('tr.Rasterizer');

goog.require('tr.Platform');
goog.require('tr.Browser');
goog.require('tr.Version');

goog.scope(function () {
  /**
   * @enum {string}
   */
  tr.Rasterizer = {
    UNKNOWN: 'unknown',
    GDI: 'gdi',
    DIRECTWRITE: 'directwrite',
    CORETEXT: 'coretext',
    FREETYPE: 'freetype'
  };

  var Rasterizer = tr.Rasterizer,
      Platform = tr.Platform,
      Browser = tr.Browser,
      Version = tr.Version;

  /**
   * @param {tr.UserAgent} userAgent
   * @return {tr.Rasterizer}
   */
  Rasterizer.get = function (userAgent) {
    if (userAgent.getPlatform() === Platform.WINDOWS) {
      // Windows XP only has GDI, and Chrome and Opera always
      // use GDI on Windows.
      if (userAgent.getBrowser() === Browser.CHROME ||
          userAgent.getBrowser() === Browser.OPERA ||
          userAgent.getPlatformVersion().lt(new Version(6, 0))) {
        return Rasterizer.GDI;
      } else if (userAgent.getPlatformVersion().ge(new Version(6, 0))) {
        if (userAgent.getBrowser() === Browser.INTERNET_EXPLORER && userAgent.getBrowserVersion().le(new Version(8, 0))) {
          return Rasterizer.GDI;
        } else {
          return Rasterizer.DIRECTWRITE;
        }
      } else {
        return Rasterizer.UNKNOWN;
      }
    } else if (userAgent.getPlatform() === Platform.WINDOWS_PHONE) {
      return Rasterizer.DIRECTWRITE;
    } else if (userAgent.getPlatform() === Platform.OSX ||
               userAgent.getPlatform() === Platform.IOS) {
      return Rasterizer.CORETEXT;
    } else if (userAgent.getPlatform() === Platform.ANDROID ||
               userAgent.getPlatform() === Platform.LINUX ||
               userAgent.getPlatform() === Platform.CHROME_OS ||
               userAgent.getPlatform() === Platform.FIREFOX_OS ||
               userAgent.getPlatform() === Platform.BLACKBERRY) {
      return Rasterizer.FREETYPE;
    } else {
      return Rasterizer.UNKNOWN;
    }
  };
});
