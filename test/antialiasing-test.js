describe('tr.Antialiasing', function () {
  var Antialiasing = tr.Antialiasing,
      UserAgent = tr.UserAgent;

  function getMatch(userAgent) {
    return Antialiasing.get(UserAgent.parse(userAgent));
  }

  function guessMatch(userAgent) {
    return Antialiasing.guess(UserAgent.parse(userAgent));
  }

  describe('tr.Antialiasing.get', function () {
    describe('UNKNOWN', function () {
      it('matches unknown user agents', function () {
        expect(getMatch('Unknown')).to.eql(Antialiasing.UNKNOWN);
      });

      it('ignores known user agents', function () {
        expect(getMatch('Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30')).to.not.eql(Antialiasing.UNKNOWN);
      });
    });

    describe('GRAYSCALE', function () {
      it('matches known user agents', function () {
        expect(getMatch('Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3 like Mac OS X; en-gb) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8F190 Safari/6533.18.5')).to.eql(Antialiasing.GRAYSCALE);
        expect(getMatch('Mozilla/5.0 (iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10gin_lib.cc')).to.eql(Antialiasing.GRAYSCALE);
        expect(getMatch('Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30')).to.eql(Antialiasing.GRAYSCALE);
        expect(getMatch('Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+')).to.eql(Antialiasing.GRAYSCALE);
        expect(getMatch('Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko')).to.eql(Antialiasing.GRAYSCALE);
        expect(getMatch('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)')).to.eql(Antialiasing.GRAYSCALE);
        expect(getMatch('Mozilla/5.0 (X11; CrOS i686 4319.74.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36')).to.eql(Antialiasing.GRAYSCALE);
      });

      it('ignores non-grayscale user agents', function () {
        expect(getMatch('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)')).to.not.eql(Antialiasing.GRAYSCALE);
        expect(getMatch('Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko')).to.not.eql(Antialiasing.GRAYSCALE);
        expect(getMatch('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.48 Safari/537.36')).to.not.eql(Antialiasing.GRAYSCALE);
      });
    });
  });

  describe('tr.Antialiasing.guess', function () {
    describe('UNKNOWN', function () {
      it('matches unknown user agents', function () {
        expect(guessMatch('Unknown')).to.eql(Antialiasing.UNKNOWN);
      });

      it('ignores known user agents', function () {
        expect(guessMatch('Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30')).to.not.eql(Antialiasing.UNKNOWN);
      });
    });

    describe('GRAYSCALE', function () {
      it('matches known user agents', function () {
        expect(guessMatch('Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3 like Mac OS X; en-gb) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8F190 Safari/6533.18.5')).to.eql(Antialiasing.GRAYSCALE);
        expect(guessMatch('Mozilla/5.0 (iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10gin_lib.cc')).to.eql(Antialiasing.GRAYSCALE);
        expect(guessMatch('Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30')).to.eql(Antialiasing.GRAYSCALE);
        expect(guessMatch('Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+')).to.eql(Antialiasing.GRAYSCALE);
        expect(guessMatch('Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko')).to.eql(Antialiasing.GRAYSCALE);
        expect(guessMatch('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)')).to.eql(Antialiasing.GRAYSCALE);
        expect(guessMatch('Mozilla/5.0 (X11; CrOS i686 4319.74.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36')).to.eql(Antialiasing.GRAYSCALE);
        expect(guessMatch('Mozilla/4.0 (compatible; MSIE 6.1; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)')).to.eql(Antialiasing.GRAYSCALE);
      });

      it('ignores non-grayscale user agents', function () {
        expect(guessMatch('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)')).to.not.eql(Antialiasing.GRAYSCALE);
        expect(guessMatch('Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko')).to.not.eql(Antialiasing.GRAYSCALE);
        expect(guessMatch('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.48 Safari/537.36')).to.not.eql(Antialiasing.GRAYSCALE);
      });
    });

    describe('SUBPIXEL', function () {
      it('matches known user agents', function () {
        expect(guessMatch('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.48 Safari/537.36')).to.eql(Antialiasing.SUBPIXEL);
        expect(guessMatch('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.71 (KHTML, like Gecko) Version/6.1 Safari/537.71')).to.eql(Antialiasing.SUBPIXEL);
        expect(guessMatch('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:25.0) Gecko/20100101 Firefox/25.0')).to.eql(Antialiasing.SUBPIXEL);
        expect(guessMatch('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.9 Safari/536.5')).to.eql(Antialiasing.SUBPIXEL);
        expect(guessMatch('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0')).to.eql(Antialiasing.SUBPIXEL);
        expect(guessMatch('Opera/9.80 (X11; Linux x86_64; U; fr) Presto/2.9.168 Version/11.50')).to.eql(Antialiasing.SUBPIXEL);
        expect(guessMatch('Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)')).to.eql(Antialiasing.SUBPIXEL);
        expect(guessMatch('Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; GTB7.4; InfoPath.2; SV1; .NET CLR 3.3.69573; WOW64; en-US)')).to.eql(Antialiasing.SUBPIXEL)
        expect(guessMatch('Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0; chromeframe/11.0.696.57)')).to.eql(Antialiasing.SUBPIXEL);
        expect(guessMatch('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)')).to.eql(Antialiasing.SUBPIXEL);
        expect(guessMatch('Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0')).to.eql(Antialiasing.SUBPIXEL);
        expect(guessMatch('Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0')).to.eql(Antialiasing.SUBPIXEL);
      });

      it('ignores non-subpixel user agents', function () {
        expect(guessMatch('Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3 like Mac OS X; en-gb) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8F190 Safari/6533.18.5')).to.eql(Antialiasing.GRAYSCALE);
        expect(guessMatch('Mozilla/5.0 (iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10gin_lib.cc')).to.eql(Antialiasing.GRAYSCALE);
        expect(guessMatch('Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30')).to.eql(Antialiasing.GRAYSCALE);
        expect(guessMatch('Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.1.0.346 Mobile Safari/534.11+')).to.eql(Antialiasing.GRAYSCALE);
        expect(guessMatch('Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko')).to.eql(Antialiasing.GRAYSCALE);
        expect(guessMatch('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)')).to.eql(Antialiasing.GRAYSCALE);
        expect(guessMatch('Mozilla/5.0 (X11; CrOS i686 4319.74.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36')).to.eql(Antialiasing.GRAYSCALE);
        expect(guessMatch('Mozilla/4.0 (compatible; MSIE 6.1; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)')).to.eql(Antialiasing.GRAYSCALE);
      });
    });
  });
});
