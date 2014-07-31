(function () {
  var container = document.getElementById('block-container');
  var columns = 16;
  var rows = 10;
  var cd = {firstx : 2, firsty : 2, lastx : columns - 3, lasty : rows - 2};
  var delay = [];
  var animatedblocks = rows * columns - (cd.lastx - cd.firstx) * (cd.lasty - cd.firsty);

  for(var i = 0; i <  animatedblocks; i++){
    delay.push(i / 2);
  }
  var frag = document.createDocumentFragment();
  for(var y = 0; y < rows; y++){
    for(var x = 0; x < columns; x++) {
      var block = document.createElement('div');
      if (!(x >= cd.firstx && x <= cd.lastx && y >= cd.firsty && y < cd.lasty)){
        var randomindex = Math.floor(Math.random() * (delay.length));
        block.style.cssText =
          'animation : animate-opacity 20s ' +  delay[randomindex] + 's infinite;' +
          '-webkit-animation : animate-opacity 20s ' +  delay[randomindex] + 's infinite;' +
          '-moz-animation : animate-opacity 20s ' +  delay[randomindex] + 's infinite;' +
          '-o-animation : animate-opacity 20s ' +  delay[randomindex] + 's infinite;';
        delay.splice(randomindex,1);
      }
      frag.appendChild(block);
    }
  }
  container.appendChild(frag);
}());