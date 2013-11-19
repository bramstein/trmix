describe('tr.dom', function () {
  var dom = tr.dom;

  describe('dom.addClass', function () {
    it('adds a class name', function () {
      var element = dom.createElement('div');

      dom.addClass(element, 'test');

      expect(element.className).to.eql('test');
    });

    it('prevents double classnames from being introduced', function () {
      var element = dom.createElement('div');

      dom.addClass(element, 'test');
      dom.addClass(element, 'test');

      expect(element.className).to.eql('test');
    });
  });

  describe('dom.removeClass', function () {
    it('removes an existing class', function () {
      var element = dom.createElement('div');

      element.className = 'test 123';
      dom.removeClass(element, 'test');

      expect(element.className).to.eql('123');
    });

    it('removes double classes', function () {
      var element = dom.createElement('div');

      element.className = 'test test 123';
      dom.removeClass(element, 'test');

      expect(element.className).to.eql('123');
    });
  });

  describe('dom.hasClass', function () {
    it('returns true if the class is present', function () {
      var element = dom.createElement('div');

      element.className = 'test';
      expect(dom.hasClass(element, 'test')).to.be(true);
    });

    it('returns false if the class is not present', function () {
      var element = dom.createElement('div');

      expect(dom.hasClass(element, 'test')).to.be(false);
    });
  });

  describe('createElement', function () {
    it('create an element', function () {
      expect(dom.createElement('div')).to.not.be(null);
      expect(dom.createElement('div').nodeName).to.eql('DIV');
    });

    it('create an element with attributes', function () {
      var element = dom.createElement('div', { id: 'test', 'data-bind': 'secret' });

      expect(element.id).to.eql('test');
      expect(element.getAttribute('data-bind')).to.eql('secret');
    });

    it('handle augmented Object.prototype', function () {
      Object.prototype.evil = function() {};

      var element = dom.createElement('div', { id: 'test'});

      expect(Object.prototype.hasOwnProperty.call(element, 'evil')).to.be(false);

      delete Object.prototype.evil;
    });
  });
});
