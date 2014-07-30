/**
	Animated blocks. First call init, than animate.
**/
var blockAnimation = function(){
	this.init = function(excludeContent){
		this.blocks = [];
		this.excludeContent = excludeContent || true;
		var container = $(".animatedBlocks .block-container");
		container.html("");
		this.xRows = 16;
		this.yRows = 10;

		// If content needs to be excluded, check from where to where.
		var cd = {};
		if(this.excludeContent){
			cd.firstx = 2;
			cd.firsty = 2;
			cd.lastx = this.xRows-3;
			cd.lasty = this.yRows-2;
		}
		for(var y = 0;y < this.yRows; y++){
			for(var x = 0;x < this.xRows; x++){
				var id = (y * this.xRows) + x;
				container.append("<div id='" + id  + "'></div>");
				if(!this.excludeContent){
					this.blocks.push(id);
				}else if (!(x >= cd.firstx && x <= cd.lastx &&
						y >= cd.firsty && y < cd.lasty)){
					this.blocks.push(id);
				}/*else{
          $("#" + id).css({'background-color' : 'red', 'opacity' : '1'})
          }*/
			}
		}
		var delay = 0;
		while(this.blocks.length !== 0){
			var randomindex = random(0, this.blocks.length-1);
			$("#" + this.blocks[randomindex]).css({
				'animation': 'animate-opacity 20s ' +  delay + 's infinite',
				'-webkit-animation': 'animate-opacity 20s ' +  delay + 's infinite',
				'-moz-animation': 'animate-opacity 20s ' +  delay + 's infinite',
				'-o-animation' : 'animate-opacity 20s ' +  delay + 's infinite'
			});
			delay+=0.5;
			this.blocks.splice(randomindex,1);
		}
	};

	//min and max inclusive
	function random(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}
};

var animation = new blockAnimation();
animation.init(true);
