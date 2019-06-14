var colors = ["#d8d3cd", "#ddcdba", "#c98740", "#dd801c", "#dd621c", "#dd3c1c", "#ddcc5d", "#d2dd5c", "#d7e827", "#45e061", "#45e0cb", "#458de0"];

var socket = io();

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
}

var board = [
	0,2,0,2,
	0,0,2,0,
	4,0,4,8,
	0,8,8,8
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
		for (var i = 0; i < 4; i++){
			for (var j = 0; j < 4; j++){
				var k = i*4+j;
				//console.log(k);
				if (board[k] == 0){
					continue;
				}

				for (var r = j+1; r < 4; r++){
					if (board[i*4+r] == 0){
						continue;
					}
					if (board[i*4+r] == board[k]){
						board[k] *= 2;
						board[i*4+r] = 0;
						//console.log('replacement '+board[k]);
						break;
					}
					else{
						break;
					}
				}
				var l = j-1;
				var shift = i*4+j;
				while (l >= 0){
					if (board[i*4+l] != 0){
						break;
					}
					shift = i*4+l;
					l--;
				}
				//console.log(shift);
				if (shift != k){
					board[shift] = board[k];
					board[k] = 0;
				}
			}
			//console.log(board);
		}

		ctx.clearRect(0, 0, 475, 475);
		draw_board();
		for (var i = 0; i < board.length; i++){
			if (board[i] != 0){
				draw_block(i);
			}
		}
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
