/**
	Animated blocks
**/
(function () {
  var blocks = [];
  var container = document.getElementById('block-container');
  var columns = 16;
  var rows = 10;

  // Coordinates in the grid of the content that needs to be excluded
  var cd = {
    firstx : 2,
    firsty : 2,
    lastx : columns - 3,
    lasty : rows - 2
  };

  for(var y = 0; y < rows; y++){
    for(var x = 0; x < columns; x++) {
      var block = document.createElement('div');
      container.appendChild(block);
      if (!(x >= cd.firstx && x <= cd.lastx &&
        y >= cd.firsty && y < cd.lasty)){
        blocks.push(block);
      }
    }
  }

  var delay = 0;
  while(blocks.length !== 0){
    var randomindex = Math.floor(Math.random() * (blocks.length));
    blocks[randomindex].style.cssText =
      'animation : animate-opacity 20s ' +  delay + 's infinite;' +
      '-webkit-animation : animate-opacity 20s ' +  delay + 's infinite;' +
      '-moz-animation : animate-opacity 20s ' +  delay + 's infinite;' +
      '-o-animation : animate-opacity 20s ' +  delay + 's infinite;';
    delay += 0.5;
    blocks.splice(randomindex,1);
  }
}());