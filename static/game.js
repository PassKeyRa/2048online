var colors = ["#d8d3cd", "#ddcdba", "#c98740", "#dd801c", "#dd621c", "#dd3c1c", "#ddcc5d", "#d2dd5c", "#d7e827", "#45e061", "#45e0cb", "#458de0"];

var socket = io();

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
}

var board = [
	2,4,0,0,
	0,0,8,0,
	0,0,0,0,
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

function move(capt){
	if (capt == 'left'){

	}
	if (capt == 'right'){

	}
	if (capt == 'up'){

	}
	if (capt == 'down'){

	}
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
	ctx.font = "56px serif";
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
	ctx.fillText(board[k].toString(10), x+50, y+70);
}

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

function start(){
	draw_block(0);
	draw_block(1);
	draw_block(6);
}
