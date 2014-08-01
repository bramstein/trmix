(function () {
  var container = document.getElementById('block-container');
  var columns = 20;
  var rows = 8;
  var cd = {
    xstart : 2,
    ystart : 1,
    xend : columns - 3,
    yend : rows - 2
  };
  var delay = [];
  var animatedblocks = rows * columns - (cd.xend - cd.xstart) * (cd.yend - cd.ystart);

  for(var i = 0; i <  animatedblocks; i++){
    delay.push(i / 2);
  }
  var frag = document.createDocumentFragment();
  for(var y = 0; y < rows; y++){
    for(var x = 0; x < columns; x++) {
      var block = document.createElement('div');
      if (!(x >= cd.xstart && x <= cd.xend && y >= cd.ystart && y <= cd.yend)){
        var randomindex = Math.floor(Math.random() * (delay.length));
        block.style.cssText = 'animation : animate-opacity 20s ' +  delay[randomindex] + 's infinite;' +
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
