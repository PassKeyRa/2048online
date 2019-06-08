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

function draw_block(k){
	
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
	
}
