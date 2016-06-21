function SearchMove(){
	balls = CheckTurn_Count(1);

	if(balls > 1){

		Completed = false;
		//formar linea
		if(Completed == false) Completed = CompleteRow(0,1);
		if(Completed == false) Completed = CompleteRow(1,1);		
		if(Completed == false) Completed = CompleteRow(2,1);

		/*if(Completed == false) Completed = CompleteColum(0,1);		
		if(Completed == false) Completed = CompleteColum(1,1);		
		if(Completed == false) Completed = CompleteColum(2,1);
		
		if(Completed == false) Completed = CompleteDiag(1,1);		
		if(Completed == false) Completed = CompleteDiag(-1,1);

		*///cortar linea
		if(Completed == false) Completed = CompleteRow(0,2);
		if(Completed == false) Completed = CompleteRow(1,2);	
		if(Completed == false) Completed = CompleteRow(2,2);

		/*if(Completed == false) Completed = CompleteColum(0,2);		
		if(Completed == false) Completed = CompleteColum(1,2);		
		if(Completed == false) Completed = CompleteColum(2,2);
		
		if(Completed == false) Completed = CompleteDiag(1,2);		
		if(Completed == false) Completed = CompleteDiag(-1,2);
		*/

		if (Completed == false){
		//sino se hizo lo anterior
			if(balls == 3){
				CellFind = false;
				while(CellFind == false){
					x = Math.round(Math.random()*2);
					y = Math.round(Math.random()*2);
					if(board[x][y] == 1 && CheckBlock(x,y) == false)	CellFind = true;
				}
				Ball_Sellected_x = x;
				Ball_Sellected_y = y;
				ClearCell(x,y);
			}
			RandomMove();
		}
	}
	else{
		RandomMove();
	}
}




function RandomMove() {
	CellAvaible = false;

	while(CellAvaible == false){
		x = Math.round(Math.random()*2);
		y = Math.round(Math.random()*2);
		if (board[x][y] == 0 && DifMov(x,y)){
			CellAvaible = true;
		}
	}
	PaintCell(x,y);
}




function CompleteRow(x, turn_value){
	// si hay dos en linea
	if (CheckRow(x,turn_value) == 2){
		
		//buscar la celda  falta para completar la linea
		Find_final = false;
		for (i=0; i<3; i++){
			if (board[i][x] == 0){
				Find_final = true;
				Find_final_x = i;
				Find_final_y = x;
			}
		}
		// si esta vacia
		if (Find_final == true){
			//si hay tres fichas
			if (CheckTurn_Count(turn_value) == 3){
				//preguntar de quien completar la linea
				// si es la maquina armarmos linea
				if (turn_value == 1){
					//buscamos la perdida 
					Find_Lost = false:

					for (i=0; i<3 && Find_Lost == false; i++){
						if(i != x){
							for(j=0; j<3 && Find_Lost == false; j++){
								if (board[j][i] == 1){
									Find_Lost = true;
									Find_Lost_x = j;
									Find_Lost_y = i;
								}
							}
						}
					}
					//y la borramos
					Ball_Sellected_x = Find_Lost_x;
					Ball_Sellected_y = Find_Lost_y;
					ClearCell(Find_Lost_x,Find_Lost_y);
				}
				//sino -> bloqueamos la linea
				else{
					//buscamos una q no bloquee y cambiarla de lugar
					CellFind = false;
					while(CellFind == false){
						x = Math.round(Math.random()*2);
						y = Math.round(Math.random()*2);
						if(board[x][y] == 1 && CheckBlock(x,y) == false){
							CellFind = true;
						}
					}
					Ball_Sellected_x = x;
					Ball_Sellected_y = y;
					//la borramos
					ClearCell(x,y);
				}
			}
			//pintamos la casilla final
			PaintCell(Find_final_x,Find_final_y);
			//return true
			return true;
		}
		//sino esta vacia return false
		else
			return false;
	}
	//sino return false
	return false;
}