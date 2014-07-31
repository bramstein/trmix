/**
	Animated blocks
**/
(function () {
  this.blocks = [];
  var container = $(".animated-blocks #block-container");
  container.html("");
  this.xRows = 16;
  this.yRows = 10;

  // Coordinates in the grid of the content that needs to be excluded
  var cd = {};
  cd.firstx = 2;
  cd.firsty = 2;
  cd.lastx = this.xRows - 3;
  cd.lasty = this.yRows - 2;

  for(var y = 0; y < this.yRows; y++){
    for(var x = 0; x < this.xRows; x++) {
      var id = (y * this.xRows) + x;
      container.append("<div id='" + id  + "'></div>");
      if (!(x >= cd.firstx && x <= cd.lastx &&
        y >= cd.firsty && y < cd.lasty)){
        this.blocks.push(id);
      }
    }
  }
  var delay = 0;
  while(this.blocks.length !== 0){
    var randomindex = Math.floor(Math.random() * (this.blocks.length));
    $("#" + this.blocks[randomindex]).css({
      'animation': 'animate-opacity 20s ' +  delay + 's infinite',
      '-webkit-animation': 'animate-opacity 20s ' +  delay + 's infinite',
      '-moz-animation': 'animate-opacity 20s ' +  delay + 's infinite',
      '-o-animation' : 'animate-opacity 20s ' +  delay + 's infinite'
    });
    delay+=0.5;
    this.blocks.splice(randomindex,1);
  }
}());