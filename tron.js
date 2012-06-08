//TODO: make damage based, tween animations,juice it (music, super anims, loudness of music based on proximity to square?)

var width = 1024,
 height = 640,
 gLoop,
 score = 0,
 lost = false,
 c = document.getElementById('c'),
 ctx = c.getContext('2d');

c.width = width;
c.height = height;

var clear = function(){
	ctx.fillStyle = '#26466d';                   //'#d0e7f9';

	ctx.beginPath();

	ctx.rect(0,0,width,height);

	ctx.closePath();

	ctx.fill();
}




var player = new (function(){
	var that = this;
	that.image = new Image();
	that.image.src = "cycle.png";
	that.width = 16;
	that.height = 16;
	
	that.x = 9999999;
	that.y = 9999999;

	that.prevx = 9999999;
	that.prevy = 9999999;

	that.movement = 16;

	that.interval = 0;

	that.direction = 'none';

	that.setPosition = function(x,y){

		//if(that.prevx != 9999999 && that.prevy != 9999999 || that.x != 0 && that.y != 0){ //ugly if to prevent 0,0 from being blocked
			that.prevx = that.x; //other possible solution is to make initial x,y out of canvas
			that.prevy = that.y;		
		//}

		that.x = x;
		that.y = y;
	}

	that.draw = function(){
		try{
			ctx.drawImage(that.image, 0, 0, that.width, that.height, that.x, that.y, that.width, that.height);
		} catch (e){} 
		that.interval++
	}

	that.moveLeft = function(){
		//if(that.x-that.movement >= 0){
			that.setPosition(that.x-that.movement,that.y);
			
		//}
	}

	that.moveRight = function(){
		//if(that.x+that.width+that.movement <= width){ //+10 represents the current hardcoded value of dx & dy; this way 595px->605px !possible
			that.setPosition(that.x+that.movement,that.y);
		//}
	}
	
	that.moveUp = function(){
		//if(that.y-that.movement >= 0){
			that.setPosition(that.x,that.y-that.movement);
		//}
	}

	that.moveDown = function(){
		//if(that.y+that.height+that.movement <= height){ //+10 represents the current hardcoded value of dx & dy; this way 595px->605px !possible
			that.setPosition(that.x,that.y+that.movement);
		//}
	}

	that.move = function(dir){
		if(that.interval==3){ //this might cause unexpected lag between moves
			that.interval = 0;
		if (dir == 'left'){
			that.moveLeft();
		}else if (dir == 'up'){
			that.moveUp();
		} else if (dir == 'right'){
			that.moveRight();
		} else if (dir == 'down'){
			that.moveDown();
		}
	}
	}

	that.win = function(){ //try to make loss that actually ceases gameloop!
		//lose game 
		lost = true;
		ctx.font = '100pt Arial';
                ctx.fillStyle = 'rgb(0,0,0)';
                ctx.textAlign = 'center';
                ctx.fillText("Player 1 wins!",(width/2)-20,(height/2)+85);
	
	}

	that.tie = function(){
		lost = true;
		ctx.font = '100pt Arial';
                ctx.fillStyle = 'rgb(0,0,0)';
                ctx.textAlign = 'center';
                ctx.fillText("It's a tie!",(width/2)-20,(height/2)+85);

	}
	
})();


var player2 = new (function(){
	var that = this;
	that.image = new Image();
	that.image.src = "cycleblue.png";
	that.width = 16;
	that.height = 16;
	
	that.x = -9999999;
	that.y = -9999999;

	that.prevx = -9999999;
	that.prevy = -9999999;

	that.movement = 16;

	that.interval = 0;

	that.direction = 'none';

	that.setPosition = function(x,y){

		//if(that.prevx != 9999999 && that.prevy != 9999999 || that.x != 0 && that.y != 0){ //ugly if to prevent 0,0 from being blocked
			that.prevx = that.x; //other possible solution is to make initial x,y out of canvas
			that.prevy = that.y;		
		//}

		that.x = x;
		that.y = y;
	}

	that.draw = function(){
		try{
			ctx.drawImage(that.image, 0, 0, that.width, that.height, that.x, that.y, that.width, that.height);
		} catch (e){} 
		that.interval++
	}

	that.moveLeft = function(){
		//if(that.x-that.movement >= 0){
			that.setPosition(that.x-that.movement,that.y);
			
		//}
	}

	that.moveRight = function(){
		//if(that.x+that.width+that.movement <= width){ //+10 represents the current hardcoded value of dx & dy; this way 595px->605px !possible
			that.setPosition(that.x+that.movement,that.y);
		//}
	}
	
	that.moveUp = function(){
		//if(that.y-that.movement >= 0){
			that.setPosition(that.x,that.y-that.movement);
		//}
	}

	that.moveDown = function(){
		//if(that.y+that.height+that.movement <= height){ //+10 represents the current hardcoded value of dx & dy; this way 595px->605px !possible
			that.setPosition(that.x,that.y+that.movement);
		//}
	}
	that.move = function(dir){
		if(that.interval == 3){ 
			that.interval = 0;
		if (dir == 'left'){
			that.moveLeft();
		}else if (dir == 'up'){
			that.moveUp();
		} else if (dir == 'right'){
			that.moveRight();
		} else if (dir == 'down'){
			that.moveDown();
		}
	}
	}

	that.win = function(){ //try to make loss that actually ceases gameloop!
		//lose game 
		lost = true;
		ctx.font = '100pt Arial';
                ctx.fillStyle = 'rgb(0,0,0)';
                ctx.textAlign = 'center';
                ctx.fillText("Player 2 wins!",(width/2)-20,(height/2)+85);

	}
	
})();

var trails = [];

var trail = function (x,y,player){
        var that = this;
        that.image = new Image();
	
	if(player == 1){
        	that.image.src = "trail.png";
	} else if(player == 2){
		that.image.src = "trailblue.png";
	}

	var onCollide = function(){
		player.die();
		player2.die();
	}

        that.width = 16;
        that.height = 16;

        that.x = x;
        that.y = y;

        return that;
};

var drawTrails = function(){
        for(var i=1;i<trails.length;i++){
                ctx.drawImage(trails[i].image,trails[i].x,trails[i].y);
       }
}


var Restart = function(){
        player.direction = 'right';
	player.x = 9999999; //necessary because x/y value persists through game loss, setposition sets x value to prevx 
	player.y = 9999999; //so x/y value when game lost will be in trails at start
        player.setPosition((width/2)-256,height/2);
	player2.direction = 'left';
	player2.x = -9999999;
	player2.y = -9999999;
	player2.setPosition((width/2)+256,height/2);
        lost = false;
	trails = [];
        GameLoop();
}


document.onkeypress = function(e){
	if(e.keyCode) keycode = e.keyCode;
	else{keycode = e.which}

	ch = keycode;


	if(ch == 97){ //edit this so that keeps moveLeft()ing until alternate keypress
		player.direction = 'left';
	} else if(ch == 119){
		player.direction = 'up';
	} else if(ch == 100){
		player.direction = 'right';
	} else if(ch == 115){
		player.direction = 'down';
	} 

	if(ch == 106){
		player2.direction = 'left';
	} else if(ch == 105){
		player2.direction = 'up';
	} else if(ch == 108){
		player2.direction = 'right';
	} else if(ch == 107){
		player2.direction = 'down';
	} 
	
	if(lost && ((ch == 114)||(ch == 32))){
		Restart();
	}
}

player.setPosition(width/2-256,height/2);

player2.setPosition(width/2 + 256,height/2);

player.direction = 'right';
player2.direction = 'left';
var checkCollision = function(){
	trails.forEach(function(e,ind){
		if((player.x == e.x && player.y == e.y)||(player.x+player.width > width)||
		(player.x < 0)||(player.y < 0)||(player.y+player.height > height)){
                        player2.win();
                } else if((player2.x == e.x && player2.y == e.y)||(player2.x+player2.width > width)||
		(player2.x < 0)||(player2.y < 0)||(player2.y+player2.height > height)){
			player.win();
		} 
        })

	if((player.x == player2.x && player.y == player2.y)){
		player.tie();
	}
}

var GameLoop = function(){
	clear();
	player.draw();
	player2.draw();
	trails.push(new trail(player.prevx,player.prevy,1));
	trails.push(new trail(player2.prevx,player2.prevy,2));	
	player.move(player.direction);
	player2.move(player2.direction);
	drawTrails(); 
	checkCollision();
	if(!lost){
		gLoop = setTimeout(GameLoop,1000/50);
	}
	
}
GameLoop();
