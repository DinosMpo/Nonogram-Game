//Cell Object (einai ta kelia tou nonogram)
function Cell(w, h, x, y, value) {
	this.w = w;
	this.h = h;
	this.x = x;
	this.y = y;
	this.value = value;
}

//------------------------------------------------------------------------------------
//Cell object for the numbers
function NumberCell(w, h, x, y, number) {
	this.w = w;
	this.h = h;
	this.x = x;
	this.y = y;
	// this.value = value; 8a to energopoihsoume otan kanoume thn ulopoihsh gia thn akurwsh twn keliwn
	this.number = number;
}

function Nonogram(grid) {
	this.correctGrid = grid;
	let windowWidth = window.innerWidth; // to width tou para8urou
	let windowHeight = window.innerHeight; // to upsos tou para8urou
	let size; //auto ousiastika einai to mege8os tou canvas

	if(windowWidth > windowHeight) {
		size = windowHeight - 50; // auto to exw kanei gia na xwrane kai ta tools
	}else{
		size = windowWidth;
	}
	
	this.rowNumbers = [];

	//Apo edw pairnw tous ari8mous gia ka8e grammh
	//pairnw ton ari8mo twn pinakwn pou periexei to grid 
	//ousiastika einai oi grammes tou nonogram
	//kai briskw tous ari8mous pou exei h ka8e grammh
	for(let i=0;i<this.correctGrid.length;i++) { //correctGrid.length = einai h ka8e grammh 0 ; 0 < 5 ; 0++
		//gia ka8e grammh tou grid bazoume enan ftiaxnoume enan pinaka kai tou dinoume thn timh 0
		this.rowNumbers[i] = []; //enas pinakas gia ka8e grammh
		this.rowNumbers[i][0] = 0;
	}

	//gia ka8e grammh tou grid
	for(let row = 0; row < this.correctGrid.length; row++) { // this.correctGrid.length = 5 
		let counter = 0; // counter pou metraei posoi 1 einai sunexomenoi
		let depth = 0; // metraei to ba8os tou pinaka

		//gia ka8e sthlh ths grammhs
		for(let column = 0; column < this.correctGrid[row].length; column++) { //correctGrid[i].length einai h ka8e sthlh
			// ama einai assos sthn sthlh
			if(this.correctGrid[row][column] == 1) {
				counter += 1; //auksanetai kata 1
				this.rowNumbers[row][depth] = counter; //to depth ginetai oso einai to counter
			}else{
				//ama eixame brei kapoion 1
				if(counter != 0) {
					this.rowNumbers[row][depth] = counter; //sthn grammh kai sto ba8os pou eimaste bazoume ton ari8mo
					counter = 0; //mhdenizoume ton counter
					depth++; // kai to ba8os megalwnei
				}
			}
		}
	}

	this.columnNumbers = [];

	//Apo edw pairnw tous ari8mous gia ka8e sthllh
	for(let sthlh=0;sthlh<this.correctGrid[0].length;sthlh++) {
		this.columnNumbers[sthlh] = [];
		this.columnNumbers[sthlh][0] = 0;
	}

	for(let sthlh=0;sthlh<this.correctGrid[0].length;sthlh++) {
		let counter = 0;
		let depth = 0;

		for(let grammh=0;grammh<this.correctGrid.length;grammh++) {
			if(this.correctGrid[grammh][sthlh]==1) {
				counter += 1;
				this.columnNumbers[sthlh][depth] = counter;
			}
			else{
				if(counter != 0) {
					this.columnNumbers[sthlh][depth] = counter;
					counter = 0;
					depth++;
				}
			}
		}
	}

	this.maxRowNumberSize = 0;
	this.maxColumnNumberSize = 0;
	
	for (let i =0; i < this.rowNumbers.length; i ++) {
		if (this.maxRowNumberSize < this.rowNumbers[i].length) {
			this.maxRowNumberSize = this.rowNumbers[i].length;
		}
	}
	
	for (let i =0; i < this.columnNumbers.length; i ++) {
		if (this.maxColumnNumberSize < this.columnNumbers[i].length) {
			this.maxColumnNumberSize = this.columnNumbers[i].length;
		}
	}

	let maxSize;

	if(this.maxRowNumberSize > this.maxColumnNumberSize) {
		maxSize = this.maxRowNumberSize + this.correctGrid.length;
	}else{
		maxSize = this.maxColumnNumberSize  + this.correctGrid.length;
	}
	
	this.blockSize = 0; // Mege8os tou block/cell
	this.blockSize = Math.floor((size / maxSize) - 1); // το -1 θα το εξηγησω στην συνέχεια οταν γίνει το drawgrid

	//to width kai to height 8a bgainei apo to mege8os tou para8urou
	this.width = 0; //to platos tou canvas
	this.height = 0; //to upsos tou canvas

	//----- Edw to afhsa

	this.width = (this.correctGrid[0].length + this.maxRowNumberSize) * this.blockSize;
	this.height = (this.correctGrid.length + this.maxColumnNumberSize) * this.blockSize;

	this.rowNumbersGrid = [];
	this.columnNumbersGrid = [];


	


	//--------------------------------------------------------------------------------------------------------	
	// this.emptyGrid = []; // Adeio nonogram , tou xrhsth
	// this.userChoices = [];// einai gia to store
	// this.fillCellChoice = "default"; //Auto 8a xrhsimepsei gia ta tools
	// this.currentChoice = {};
	// this.previousChoice = {
	// 	active: false
	// };
	// this.correct = false;
}