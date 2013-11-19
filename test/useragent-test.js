describe('tr.UserAgent', function () {
  var UserAgent = tr.UserAgent,
      Platform = tr.Platform,
      Browser = tr.Browser,
      Version = tr.Version;

  describe('Internet Explorer', function () {
    it('matches all versions', function () {
      expect(UserAgent.parse('Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; InfoPath.2; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)')).to.eql(
        new UserAgent(Browser.INTERNET_EXPLORER, new Version(7, 0), Platform.WINDOWS, new Version(5, 1))
      );

      expect(UserAgent.parse('Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.1; Media Center PC 3.0; .NET CLR 1.0.3705; .NET CLR 1.1.4322; .NET CLR 2.0.50727; InfoPath.1)')).to.eql(
        new UserAgent(Browser.INTERNET_EXPLORER, new Version(7, 0, null, 'b'), Platform.WINDOWS, new Version(5, 1))
      );

      expect(UserAgent.parse('Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; InfoPath.2)')).to.eql(
        new UserAgent(Browser.INTERNET_EXPLORER, new Version(8, 0), Platform.WINDOWS, new Version(6, 1))
      );
    });

    it('matches a minimal user agent string', function () {
      expect(UserAgent.parse('Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)')).to.eql(
        new UserAgent(Browser.INTERNET_EXPLORER, new Version(7, 0), Platform.WINDOWS, new Version(5, 1))
      );
    });

    it('matches Internet Explorer on Windows Phone', function () {
      expect(UserAgent.parse('Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; ARM; Touch; IEMobile/10.0; <Manufacturer>; <Device>; <Operator>)')).to.eql(
        new UserAgent(Browser.INTERNET_EXPLORER, new Version(10, 0), Platform.WINDOWS_PHONE, new Version(8, 0))
      );

      expect(UserAgent.parse('Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; SAMSUNG; SGH-i917)')).to.eql(
        new UserAgent(Browser.INTERNET_EXPLORER, new Version(9, 0), Platform.WINDOWS_PHONE, new Version(7, 5))
      );
    });

    it('matches Internet Explorer 11', function () {
      expect(UserAgent.parse('Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko')).to.eql(
        new UserAgent(Browser.INTERNET_EXPLORER, new Version(11, 0), Platform.WINDOWS, new Version(6, 3))
      );
    });
  });

  describe('Firefox', function () {
    it('matches all versions', function () {
      expect(UserAgent.parse('Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3 GTB7.1')).to.eql(
        new UserAgent(Browser.FIREFOX, new Version(3, 6, 3), Platform.OSX, new Version(10, 5))
      );

      expect(UserAgent.parse('Mozilla/5.0 (X11; U; Linux i686; ru-RU; rv:1.9.2a1pre) Gecko/20090405 Ubuntu/9.04 (jaunty) Firefox/3.6a1pre')).to.eql(
        new UserAgent(Browser.FIREFOX, new Version(3, 6, null, 'a1pre'), Platform.LINUX, new Version())
      );

      expect(UserAgent.parse('Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; en-US; rv:2.0b1) Gecko/20100630 Firefox/4.0b1')).to.eql(
        new UserAgent(Browser.FIREFOX, new Version(4, 0, null, 'b1'), Platform.OSX, new Version(10, 6))
      );
    });

    it('matches Firefox on Android', function () {
      expect(UserAgent.parse('Mozilla/5.0 (Android; Mobile; rv:13.0) Gecko/15.0 Firefox/14.0')).to.eql(
        new UserAgent(Browser.FIREFOX, new Version(14, 0), Platform.ANDROID, new Version())
      );
    });

    it('matches Firefox on Firefox OS', function () {
      expect(UserAgent.parse('Mozilla/5.0 (Mobile; rv:14.0) Gecko/14.0 Firefox/14.0')).to.eql(
        new UserAgent(Browser.FIREFOX, new Version(14, 0), Platform.UNKNOWN, new Version())
      );
    });
  });

  describe('Chrome', function () {
    it('matches all versions', function () {
      expect(UserAgent.parse('Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8; en-US) AppleWebKit/533.2 (KHTML, like Gecko) Chrome/5.0.342.9 Safari/533.2')).to.eql(
        new UserAgent(Browser.CHROME, new Version(5, 0, 342, 9), Platform.OSX, new Version(10, 5, 8))
      );
    });

    it('matches Chrome on ChromeOS', function () {
      expect(UserAgent.parse('Mozilla/5.0 (X11; CrOS i686 1660.57.0) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.46 Safari/535.19')).to.eql(
        new UserAgent(Browser.CHROME, new Version(18, 0, 1025, 46), Platform.CHROME_OS, new Version())
      );
    });

    it('matches Chrome on Android', function () {
      expect(UserAgent.parse('Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; Nexus S Build/IML74K) AppleWebKit/535.7 (KHTML, like Gecko) CrMo/16.0.912.75 Mobile Safari/535.7')).to.eql(
        new UserAgent(Browser.CHROME, new Version(16, 0, 912, 75), Platform.ANDROID, new Version(4, 0, 3))
      );

      expect(UserAgent.parse('Mozilla/5.0 (Linux; Android 4.2.2; SGH-M919 Build/JDQ39) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.169 Mobile Safari/537.22')).to.eql(
        new UserAgent(Browser.CHROME, new Version(25, 0, 1364, 169), Platform.ANDROID, new Version(4, 2, 2))
      );
    });

    it('matches Chrome on iOS', function () {
      expect(UserAgent.parse('Mozilla/5.0 (iPad; U; CPU OS 5_1_1 like Mac OS X; en-us) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3')).to.eql(
        new UserAgent(Browser.CHROME, new Version(19, 0, 1084, 60), Platform.IOS, new Version(5, 1, 1))
      );

      expect(UserAgent.parse('Mozilla/5.0 (iPod; U; CPU iPhone OS 5_1_1 like Mac OS X; en-us) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3')).to.eql(
        new UserAgent(Browser.CHROME, new Version(19, 0, 1084, 60), Platform.IOS, new Version(5, 1, 1))
      );
    });
  });

  describe('Safari', function () {
    it('matches all versions', function () {
      expect(UserAgent.parse('Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8; en-us) AppleWebKit/531.21.8 (KHTML, like Gecko) Version/4.0.4 Safari/531.21.10')).to.eql(
        new UserAgent(Browser.SAFARI, new Version(4, 0, 4), Platform.OSX, new Version(10, 5, 8))
      );

      expect(UserAgent.parse('Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_4_11; tr) AppleWebKit/528.4+ (KHTML, like Gecko) Version/4.0dp1 Safari/526.11.2')).to.eql(
        new UserAgent(Browser.SAFARI, new Version(4, 0, null, 'dp1'), Platform.OSX, new Version(10, 4, 11))
      );
    });

    it('matches Safari on iOS', function () {
      expect(UserAgent.parse('Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_1_2 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7D11 Safari/528.16')).to.eql(
        new UserAgent(Browser.SAFARI, new Version(4, 0), Platform.IOS, new Version(3, 1, 2))
      );

      expect(UserAgent.parse('Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10')).to.eql(
        new UserAgent(Browser.SAFARI, new Version(4, 0, 4), Platform.IOS, new Version(3, 2))
      );

      expect(UserAgent.parse('Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B360 Safari/531.21.10')).to.eql(
        new UserAgent(Browser.SAFARI, new Version(4, 0, 4), Platform.IOS, new Version(3, 2))
      );

      expect(UserAgent.parse('Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10')).to.eql(
        new UserAgent(Browser.SAFARI, new Version(4, 0, 4), Platform.IOS, new Version(3, 2))
      );

      expect(UserAgent.parse('Mozilla/5.0 (iPod; U; CPU iPhone OS 3_1 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7C144 Safari/528.16')).to.eql(
        new UserAgent(Browser.SAFARI, new Version(4, 0), Platform.IOS, new Version(3, 1))
      );
    });
  });

  describe('Silk', function () {
    it('matches 2nd generation', function () {
      expect(UserAgent.parse('Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; KFOT Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Silk/2.6 Mobile Safari/535.19 Silk-Accelerated=false')).to.eql(
        new UserAgent(Browser.SILK, new Version(2, 6), Platform.ANDROID, new Version(4, 0, 3))
      );

      expect(UserAgent.parse('Mozilla/5.0 (Linux; U; en-us; KFOT Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Silk/2.6 Safari/535.19 Silk-Accelerated=false')).to.eql(
        new UserAgent(Browser.SILK, new Version(2, 6), Platform.LINUX, new Version())
      );

      expect(UserAgent.parse('Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; KFTT Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Silk/2.6 Mobile Safari/535.19 Silk-Accelerated=false')).to.eql(
        new UserAgent(Browser.SILK, new Version(2, 6), Platform.ANDROID, new Version(4, 0, 3))
      );

      expect(UserAgent.parse('Mozilla/5.0 (Linux; U; en-us; KFTT Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Silk/2.6 Safari/535.19 Silk-Accelerated=false')).to.eql(
        new UserAgent(Browser.SILK, new Version(2, 6), Platform.LINUX, new Version())
      );
    });

    it('matches 1st generation', function () {
      expect(UserAgent.parse('Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; Silk/1.0.22.79_10013310) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 Silk-Accelerated=false')).to.eql(
        new UserAgent(Browser.SILK, new Version(1, 0, 22, '79_10013310'), Platform.ANDROID, new Version(2, 3, 4))
      );

      expect(UserAgent.parse('Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.0.22.79_10013310) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=false')).to.eql(
        new UserAgent(Browser.SILK, new Version(1, 0, 22, '79_10013310'), Platform.OSX, new Version(10, 6, 3))
      );
    });
  });

  describe('Opera', function () {
    it('matches all versions', function () {
      expect(UserAgent.parse('Opera/9.80 (Linux i686; U; en) Presto/2.5.22 Version/10.51')).to.eql(
        new UserAgent(Browser.OPERA, new Version(10, 51), Platform.LINUX, new Version())
      );

      expect(UserAgent.parse('Mozilla/5.0 (Linux i686 ; U; en; rv:1.8.1) Gecko/20061208 Firefox/2.0.0 Opera 9.70')).to.eql(
        new UserAgent(Browser.OPERA, new Version(9, 70), Platform.LINUX, new Version())
      );

      expect(UserAgent.parse('Opera/9.64 (X11; Linux i686; U; Linux Mint; nb) Presto/2.1.1')).to.eql(
        new UserAgent(Browser.OPERA, new Version(9, 64), Platform.LINUX, new Version())
      );
    });

    it('matches Opera Mobile on Android', function () {
      expect(UserAgent.parse('Opera/9.80 (Android 4.1.1; Linux; Opera Mobi/ADR-1207201819; U; en) Presto/2.10.254 Version/12.00')).to.eql(
        new UserAgent(Browser.OPERA, new Version(12, 0), Platform.ANDROID, new Version(4, 1, 1))
      );
    });

    it('matches Opera Mini on Android', function () {
      expect(UserAgent.parse('Opera/9.80 (Android; Opera Mini/7.0.29952/28.2144; U; en) Presto/2.8.119 Version/11.10')).to.eql(
        new UserAgent(Browser.OPERA, new Version(11, 10), Platform.ANDROID, new Version())
      );
    });

    it('matches Opera Next', function () {
      expect(UserAgent.parse('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.20 Safari/537.36  OPR/15.0.1147.18 (Edition Next)')).to.eql(
        new UserAgent(Browser.OPERA, new Version(15, 0, 1147, 18), Platform.OSX, new Version(10, 8, 3))
      );
    });
  });

  describe('Builtin browsers', function () {
    it('matches Android builtin browser', function () {
      expect(UserAgent.parse('Mozilla/5.0 (Linux; U; Android 2.2.1; en-ca; LG-P505R Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1')).to.eql(
        new UserAgent(Browser.BUILTIN, new Version(), Platform.ANDROID, new Version(2, 2, 1))
      );

      expect(UserAgent.parse('Mozilla/5.0 (Linux; U; Android 2.1-update1; en-us; Nexus One Build/ERE27) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17')).to.eql(
        new UserAgent(Browser.BUILTIN, new Version(), Platform.ANDROID, new Version(2, 1, null, 'update1'))
      );

      expect(UserAgent.parse('Mozilla/5.0 (Linux; U; Android 4.1.2; en-us; sdk Build/MASTER) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30')).to.eql(
        new UserAgent(Browser.BUILTIN, new Version(), Platform.ANDROID, new Version(4, 1, 2))
      );

      expect(UserAgent.parse('Mozilla/5.0 (Linux; U; Android 4.1.2; en-us; Nexus S Build/JZO54K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30')).to.eql(
        new UserAgent(Browser.BUILTIN, new Version(), Platform.ANDROID, new Version(4, 1, 2))
      );
    });

    it('matches "builtin" Chrome', function () {
      expect(UserAgent.parse('Mozilla/5.0 (Linux; Android 4.2.2; sl-si; SAMSUNG GT-I9505 Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Version/1.0 Chrome/18.0.1025.308 Mobile Safari/535.19')).to.eql(
        new UserAgent(Browser.CHROME, new Version(18, 0, 1025, 308), Platform.ANDROID, new Version(4, 2, 2))
      );

      expect(UserAgent.parse('Mozilla/5.0 (Linux; Android 4.2.2; sl-si; SAMSUNG GT-I9505 Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Version/1.0 Chrome/18.0.1025.308 Mobile Safari/535.19')).to.eql(
        new UserAgent(Browser.CHROME, new Version(18, 0, 1025, 308), Platform.ANDROID, new Version(4, 2, 2))
      );
    });

    it('matches builtin browser in "Desktop" mode', function () {
      expect(UserAgent.parse('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.34 Safari/534.24')).to.eql(
        new UserAgent(Browser.CHROME, new Version(11, 0, 696, 34), Platform.LINUX, new Version())
      );

      expect(UserAgent.parse('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.34 Safari/534.24')).to.eql(
        new UserAgent(Browser.CHROME, new Version(11, 0, 696, 34), Platform.LINUX, new Version())
      );
    });

    it('matches BlackBerry builtin browser', function () {
      expect(UserAgent.parse('Mozilla/5.0 (BB10; Touch) AppleWebKit/537.3+ (KHTML, like Gecko) Version/10.0.9.388 Mobile Safari/537.3+')).to.eql(
        new UserAgent(Browser.BUILTIN, new Version(), Platform.BLACKBERRY, new Version(10, 0, 9, 388))
      );

      expect(UserAgent.parse('Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+')).to.eql(
        new UserAgent(Browser.BUILTIN, new Version(), Platform.BLACKBERRY, new Version(7, 1, 0, 346))
      );
    });
  });
});
