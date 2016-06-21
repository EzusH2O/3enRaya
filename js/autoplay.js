var board = new Array(3);
var turn;

var Cross_Sellected_x;
var Cross_Sellected_y;

var Ball_Sellected_x;
var Ball_Sellected_y;


function ClearCell(x, y){
	board[x][y] = 0;
	cell = document.getElementById('c' + x + y);
	cell.innerHTML = '';
}

function ClearBoar(){

	for (i=0; i < 3 ; i++){
		for (j=0; j < 3 ; j++){
			ClearCell(i, j);
		}
	}
}

function PaintCell(x,y){

	cell = document.getElementById('c' + x + y);
	cell.innerHTML ="<img src="+ turn +".png></img>";


	if (turn == 'ball'){
		board[x][y]=1;
		Ball_Sellected_x = x;
		Ball_Sellected_y = y;
	}

	if (turn == 'cross'){
		board[x][y]=2;
		Cross_Sellected_x = x;
		Cross_Sellected_y = y;
	}

	CheckLine();

	if (turn == "ball"){
		turn = "cross";
	}
	else{
		turn = "ball";
	}

}


function CheckCell(x,y){
	crosses = CheckTurn_Count(2);
	if(crosses == 3){
		if(board[x][y] == 2){
			Cross_Sellected_x = x;
			Cross_Sellected_y = y;
			ClearCell(x,y);
		}
	}
	else{
		if(board[x][y] == 0 && DifMov(x,y)){
			SelectCell(x,y);
		}

	}


}

function SelectCell(x,y){
	PaintCell(x,y);
	SearchMove(x,y);
}



function autoplay(){

	for (i = 0; i < 3; i++)	board[i] = new Array(3);
	
	turn = "ball";	

	Cross_Sellected_x = 4;
	Cross_Sellected_y = 4;

	Ball_Sellected_x = 4;
	Ball_Sellected_y = 4;
	

	ClearBoar();
	SearchMove();

}	


autoplay();


/*
vacia = 0
ball = 1
cross = 2

*/

/************************
+		+		+		+
+	c02	+	c12	+	c22	+
+++++++++++++++++++++++++
+		+		+		+
+	c01	+	c11	+	c21	+
+++++++++++++++++++++++++
+		+		+		+
+	c00	+	c10	+	c20 +
+++++++++++++++++++++++++
*/