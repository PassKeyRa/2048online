var colors = ["#d8d3cd", "#ddcdba", "#c98740", "#dd801c", "#dd621c", "#dd3c1c", "#ddcc5d", "#d2dd5c", "#d7e827", "#45e061", "#45e0cb", "#458de0"];

var socket = io();

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
}

var board = [
	0,2,0,2,
	0,0,2,0,
	0,0,4,8,
	0,0,0,0
];

function check_lose(){
	for (var i = 0; i < 15; i++){
		if (i % 4 != 3 && board[i] == board[i+1]){
			return true;
		}
		if (i < 12){
			if (board[i] == board[i+4]){
				return true;
			}
		}
	}
	return false;
}

var canvas = document.getElementById('canvas');
canvas.width = 475;
canvas.height = 475;
var ctx = canvas.getContext('2d');

function draw_board(){
	for (var i = 0; i < 16; i++){
		var x = ((i%4)*100)+(((i%4)+1)*15);
		var y = (Math.floor(i/4)*100) + ((Math.floor(i/4)+1)*15);
		ctx.beginPath();
		ctx.fillStyle = "#a59d95";
		ctx.arc(x+5, y+5, 5, 0, Math.PI*2, false);
		ctx.fill();
		ctx.fillRect(x+5, y, 90, 10);
		ctx.arc(x+95, y+5, 5, 0, Math.PI*2, false);
		ctx.fill();
		ctx.fillRect(x+90, y+5, 10, 90);
		ctx.arc(x+95, y+95, 5, 0, Math.PI*2, false);
		ctx.fillRect(x+5, y+90, 90, 10);
		ctx.arc(x+5, y+95, 5, 0, Math.PI*2, false);
		ctx.fill();
		ctx.fillRect(x, y+5, 10, 90);
	}
}

function draw_block(k){
	var col =  colors[(Math.log2(board[k])-1)%12];
	var x = ((k%4)*100)+(((k%4)+1)*15);
	var y = (Math.floor(k/4)*100) + ((Math.floor(k/4)+1)*15);
	ctx.beginPath();
	ctx.fillStyle = col;
	if (board[k] <= 512){
		ctx.font = "48px Helvetica";
	}
	else{
		ctx.font = "40px Helvetica";
	}
	ctx.textAlign = "center";
	ctx.arc(x+5, y+5, 5, 0, Math.PI*2, false);
	ctx.fill();
	ctx.fillRect(x+5, y, 90, 10);
	ctx.arc(x+95, y+5, 5, 0, Math.PI*2, false);
	ctx.fill();
	ctx.fillRect(x+90, y+5, 10, 90);
	ctx.arc(x+95, y+95, 5, 0, Math.PI*2, false);
	ctx.fillRect(x+5, y+90, 90, 10);
	ctx.arc(x+5, y+95, 5, 0, Math.PI*2, false);
	ctx.fill();
	ctx.fillRect(x, y+5, 10, 90);
	if ((Math.log2(board[k])-1)%12 < 2){
		ctx.fillStyle = "#3d3b39";
	}
	else{
		ctx.fillStyle = "white";
	}
	if (board[k] <= 512){
		ctx.fillText(board[k].toString(10), x+50, y+65, 80);
	}
	else{
		ctx.fillText(board[k].toString(10), x+50, y+63, 80);
	}
}

function draw_block2(k, x, y){
	var col =  colors[(Math.log2(board[k])-1)%12];
	ctx.beginPath();
	ctx.fillStyle = col;
	if (board[k] <= 512){
		ctx.font = "48px Helvetica";
	}
	else{
		ctx.font = "40px Helvetica";
	}
	ctx.textAlign = "center";
	ctx.arc(x+5, y+5, 5, 0, Math.PI*2, false);
	ctx.fill();
	ctx.fillRect(x+5, y, 90, 10);
	ctx.arc(x+95, y+5, 5, 0, Math.PI*2, false);
	ctx.fill();
	ctx.fillRect(x+90, y+5, 10, 90);
	ctx.arc(x+95, y+95, 5, 0, Math.PI*2, false);
	ctx.fillRect(x+5, y+90, 90, 10);
	ctx.arc(x+5, y+95, 5, 0, Math.PI*2, false);
	ctx.fill();
	ctx.fillRect(x, y+5, 10, 90);
	if ((Math.log2(board[k])-1)%12 < 2){
		ctx.fillStyle = "#3d3b39";
	}
	else{
		ctx.fillStyle = "white";
	}
	if (board[k] <= 512){
		ctx.fillText(board[k].toString(10), x+50, y+65, 80);
	}
	else{
		ctx.fillText(board[k].toString(10), x+50, y+63, 80);
	}
}

/*function clear_block(k, x, y){

}*/

function new_block(){
	var spaces = [];
	for (var i = 0; i < 16; i++){
		if (board[i] == 0){
			spaces.push(i);
		}
	}
	var tmp = getRandomInt(0, spaces.length);
	board[tmp] = 2;
	draw_block(tmp);
}

draw_board();

function move(capt){
	if (capt == 'left'){
		var speed = [];
		for (var i = 0; i < board.length; i++){
			if (board[i] == 0 || i % 4 == 0){
				var x = ((i%4)*100)+(((i%4)+1)*15);
				var y = (Math.floor(i/4)*100) + ((Math.floor(i/4)+1)*15);
				if (i % 4 == 0 && board[i] != 0){
					speed.push([0, x, y, x, y, true]);
				}
				else{
					speed.push([0, x, y, x, y, false]);
				}
				console.log(0)
				continue;
			}
			var tmp = i % 4;
			var k = 0;
			for (var j = 1; j <= tmp; j++){
				if (board[i-j]!=0){
					if (board[i-j]==board[i]){
						k+=1;
						k = -k;
					}
					break;
				}
				else{
					k+=1;
				}
			}
			var x = ((i%4)*100)+(((i%4)+1)*15);
			var y = (Math.floor(i/4)*100) + ((Math.floor(i/4)+1)*15);
			var x1 = (((i-Math.abs(k))%4)*100)+((((i-Math.abs(k))%4)+1)*15);
			//console.log(k);
			speed.push([k, x, y, x1, y, false]); //k, x, y, x1, y1
		}
		//console.log(speed);
		
		ctx.clearRect(0, 0, 475, 475);
		draw_board();

		for (var l = 0; l < speed.length; l++){
			if (speed[l][0] == 0){
				if (speed[l][5] == true){
					draw_block2(l, speed[l][1], speed[l][2]);
				}
				continue;
			}
			
			if (speed[l][1] != speed[l][3]){
				if (speed[l][0] < 0){
					board[l-Math.abs(speed[l][0])] = board[l]*2;
					board[l] = 0;
				}
				else{
					board[l-Math.abs(speed[l][0])] = board[l];
					board[l] = 0;
				}
				speed[l][1] = speed[l][3];
				draw_block2(l-Math.abs(speed[l][0]), speed[l][1], speed[l][2]);
				continue;
			}
			/*if (speed[l][1] == speed[l][3] && speed[l][0] < 0){
				board[l-Math.abs(speed[l][0])] += board[l];
				board[l] = 0;
				draw_block2(l-Math.abs(speed[l][0]), speed[l][1], speed[l][2]);
				continue;
			}*/
		}
		console.log(board);
	}
	/*if (capt == 'right'){
		for (var i = 0; i < board.length; i++){
			
		}
	}
	if (capt == 'up'){
		for (var i = 0; i < board.length; i++){
			
		}
	}
	if (capt == 'down'){
		for (var i = 0; i < board.length; i++){
			
		}
	}*/
}

function start(){
	for (var i = 0; i < board.length; i++){
		if (board[i] != 0){
			draw_block(i);
		}
	}
	document.addEventListener('keydown', function(event){
		switch (event.keyCode){
			case 87:
				move('up');
				//new_block();
				break;
			case 65:
				move('left');
				//new_block();
				break;
			case 83:
				move('down');
				//new_block();
				break;
			case 68:
				move('right');
				//new_block();
				break;
		}

		switch (event.keyCode){
			case 38:
				move('up');
				//new_block();
				break;
			case 37:
				move('left');
				//new_block();
				break;
			case 40:
				move('down');
				//new_block();
				break;
			case 39:
				move('right');
				//new_block();
				break;
		}
	});
}
