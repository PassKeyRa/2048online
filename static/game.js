var socket = io();

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min)) + min;
}

var board = [
	0,0,0,0,0,0,
	0,0,0,0,0,0,
	0,0,0,0,0,0,
	0,0,0,0,0,0,
	0,0,0,0,0,0,
	0,0,0,0,0,0
];

function check_lose(){
	for (var i = 0; i < 35; i++){
		if (i % 6 != 5 && board[i] == board[i+1]){
			return true;
		}
		if (i < 30){
			if (board[i] == board[i+6]){
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
canvas.width = 600;
canvas.height = 600;
var ctx = canvas.getContext('2d');

function draw_block(k){
	var x = (k%6)*100;
	var y = Math.floor(k/6)*100;
	ctx.beginPath();
	ctx.fillStyle = "#afaa93";
	ctx.arc(x+6, y+6, 5, 0, Math.PI*2, false);
	ctx.fill();
	ctx.fillRect(x+6, y+1, 88, 10);
	ctx.arc(x+93, y+6, 5, 0, Math.PI*2, false);
	ctx.fill();
	ctx.fillRect(x+88, y+6, 10, 88);
	ctx.arc(x+93, y+93, 5, 0, Math.PI*2, false);
	ctx.fill();
	ctx.fillRect(x+6, y+88, 88, 10);
	ctx.arc(x+6, y+93, 5, 0, Math.PI*2, false);
	ctx.fill();
	ctx.fillRect(x+1, y+6, 10, 88);
}

function new_block(){
	var spaces = [];
	for (var i = 0; i < 36; i++){
		if (board[i] == 0){
			spaces.push(i);
		}
	}
	var tmp = getRandomInt(0, spaces.length);
	board[tmp] = 2;
	draw_block(tmp);
}

function start(){
	draw_block(0);
	draw_block(1);
	draw_block(6);
}
