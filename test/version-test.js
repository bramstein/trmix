describe('Version', function () {
  var Version = tr.Version;

  describe('parse', function () {
    it('should ignore non versions', function () {
      expect(Version.parse('abcedf')).to.eql(new Version());
      expect(Version.parse('...')).to.eql(new Version());
      expect(Version.parse('Unknown')).to.eql(new Version());
    });

    it('should parse single digit versions', function () {
      expect(Version.parse('0')).to.eql(new Version(0));
      expect(Version.parse('1')).to.eql(new Version(1));
    });

    it('should parse two digit versions', function () {
      expect(Version.parse('1.0')).to.eql(new Version(1, 0));
      expect(Version.parse('12.9')).to.eql(new Version(12, 9));
    });

    it('should parse three digit versions', function () {
      expect(Version.parse('1.2.5')).to.eql(new Version(1, 2, 5));
      expect(Version.parse('10.0.2')).to.eql(new Version(10, 0, 2));
    });

    it('should accept alternate separators', function () {
      expect(Version.parse('10_8_2')).to.eql(new Version(10, 8, 2));
      expect(Version.parse('5-46-2')).to.eql(new Version(5, 46, 2));
    });

    it('should accept build strings', function () {
      expect(Version.parse('1.3.5+alpha')).to.eql(new Version(1, 3, 5, 'alpha'));
      expect(Version.parse('1.3.5-askdsj')).to.eql(new Version(1, 3, 5, 'askdsj'));
    });

    it('should parse real version strings', function () {
      expect(Version.parse('5.0')).to.eql(new Version(5, 0));
      expect(Version.parse('531.9')).to.eql(new Version(531, 9));
      expect(Version.parse('1.9.2.3')).to.eql(new Version(1, 9, 2, 3));
      expect(Version.parse('3.6.3')).to.eql(new Version(3, 6, 3));
      expect(Version.parse('1.9.2a1pre')).to.eql(new Version(1, 9, 2, 'a1pre'));
      expect(Version.parse('3.6a1pre')).to.eql(new Version(3, 6, null, 'a1pre'));
      expect(Version.parse('2.0b1')).to.eql(new Version(2, 0, null, 'b1'));
      expect(Version.parse('5.0.342.9')).to.eql(new Version(5, 0, 342, 9));
      expect(Version.parse('10_5_8')).to.eql(new Version(10, 5, 8));
      expect(Version.parse('18.0.1025.46')).to.eql(new Version(18, 0, 1025, 46));
      expect(Version.parse('4.0dp1')).to.eql(new Version(4, 0, null, 'dp1'));
      expect(Version.parse('528.4+')).to.eql(new Version(528, 4));
      expect(Version.parse('2.1-update1')).to.eql(new Version(2, 1, null, 'update1'));
      expect(Version.parse('10.0.22.79_1003310')).to.eql(new Version(10, 0, 22, '79_1003310'));
      expect(Version.parse('1.b')).to.eql(new Version(1, null, null, 'b'));
      expect(Version.parse('0.10.1')).to.eql(new Version(0, 10, 1));
    });
  });

  describe('#compare', function () {
    it('should return zero when two versions are equal', function () {
      expect(new Version(1, 2, 3).compare(new Version(1, 2, 3))).to.eql(0);
    });

    it('should return one when one version is greater', function () {
      expect(new Version(1, 2, 3).compare(new Version(0, 1, 3))).to.eql(1);
      expect(new Version(1, 2, 3).compare(new Version(1, 2, 2))).to.eql(1);
      expect(new Version(1, 2, 3).compare(new Version(1, 1, 3))).to.eql(1);
    });

    it('should return minus one when one version is smaller', function () {
      expect(new Version(1, 2, 3).compare(new Version(1, 2, 4))).to.eql(-1);
      expect(new Version(1, 2, 3).compare(new Version(1, 3, 3))).to.eql(-1);
      expect(new Version(1, 2, 3).compare(new Version(2, 2, 3))).to.eql(-1);
    });
  });

  describe('#eq', function () {
    it('should return true when two versions are equal', function () {
      expect(new Version(1, 2, 3).eq(new Version(1, 2, 3))).to.be(true);
    });

    it('should return false when two versions are unequal', function () {
      expect(new Version(3, 2, 1).eq(new Version(1, 2, 3))).to.be(false);
    });
  });

  describe('#gt', function () {
    it('should return true when one version is greater than another', function () {
      expect(new Version(3, 2, 1).gt(new Version(1, 2, 3))).to.be(true);
    });

    it('should return false when one version is not greater than another', function () {
      expect(new Version(1, 2, 3).gt(new Version(3, 2, 1))).to.be(false)
    });
  });

  describe('#ge', function () {
    it('should return true when one version is greater than another', function () {
      expect(new Version(3, 2, 1).ge(new Version(1, 2, 3))).to.be(true);
    });

    it('should return false when one version is not greater than another', function () {
      expect(new Version(1, 2, 3).ge(new Version(3, 2, 1))).to.be(false)
    });

    it('should return true when one version is equal to another', function () {
      expect(new Version(1, 2, 3).ge(new Version(1, 2, 3))).to.be(true);
    });
  });

  describe('#lt', function () {
    it('should return true when one version is less than another', function () {
      expect(new Version(1, 2, 3).lt(new Version(3, 2, 1))).to.be(true);
    });

    it('should return false when one version is not less than another', function () {
      expect(new Version(3, 2, 1).lt(new Version(1, 2, 3))).to.be(false)
    });
  });

  describe('#le', function () {
    it('should return true when one version is less than another', function () {
      expect(new Version(1, 2, 3).le(new Version(3, 2, 1))).to.be(true);
    });

    it('should return false when one version is not less than another', function () {
      expect(new Version(3, 2, 1).le(new Version(1, 2, 3))).to.be(false)
    });

    it('should return true when one version is equal to another', function () {
      expect(new Version(1, 2, 3).le(new Version(1, 2, 3))).to.be(true);
    });
  });

  describe('#isValid', function () {
    it('should return true when the version is valid', function () {
      expect(new Version(1).isValid()).to.be(true);
      expect(new Version(1, 2).isValid()).to.be(true);
    });

    it('should return false when the version is not valid', function () {
      expect(new Version().isValid()).to.be(false);
      expect(new Version(null, 1).isValid()).to.be(false);
    });
  });
});
