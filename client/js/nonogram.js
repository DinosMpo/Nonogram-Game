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
function NumberCell(w, h, x, y, value, number) {
	this.w = w;
	this.h = h;
	this.x = x;
	this.y = y;
	this.value = value;
	this.number = number;
}

//------------------------------------------------------------------------------------
//Nonogram Object
function Nonogram(levelGrid) {
	this.levelGrid = levelGrid;
	let windowWidth = window.innerWidth; // to width tou para8urou
	let windowHeight = window.innerHeight; // to upsos tou para8urou
	let size; //auto ousiastika einai to mege8os tou canvas

	if(windowWidth > windowHeight) {
		size = windowHeight - 30; // auto to exw kanei gia na xwrane kai ta tools
	}else{
		size = windowWidth;
	}
	
	//Apo edw pairnw tous ari8mous gia ka8e grammh
	//pairnw ton ari8mo twn pinakwn pou periexei to grid 
	//ousiastika einai oi grammes tou nonogram
	//kai briskw tous ari8mous pou exei h ka8e grammh
	this.rowNumbers = [];
	for(let i=0;i<this.levelGrid.length;i++) { //levelGrid.length = einai h ka8e grammh 0 ; 0 < 5 ; 0++
		//gia ka8e grammh tou grid bazoume enan ftiaxnoume enan pinaka kai tou dinoume thn timh 0
		this.rowNumbers[i] = []; //enas pinakas gia ka8e grammh
		this.rowNumbers[i][0] = 0;
	}

	//gia ka8e grammh tou grid
	for(let row = 0; row < this.levelGrid.length; row++) { // this.levelGrid.length = 5 
		let counter = 0; // counter pou metraei posoi 1 einai sunexomenoi
		let depth = 0; // metraei to ba8os tou pinaka

		//gia ka8e sthlh ths grammhs
		for(let column = 0; column < this.levelGrid[row].length; column++) { //levelGrid[i].length einai h ka8e sthlh
			// ama einai assos sthn sthlh
			if(this.levelGrid[row][column] == 1) {
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

	//Apo edw pairnw tous ari8mous gia ka8e sthllh
	this.columnNumbers = [];
	for(let i=0;i<this.levelGrid[0].length;i++) {
		this.columnNumbers[i] = [];
		this.columnNumbers[i][0] = 0;
	}

	for(let column=0;column<this.levelGrid[0].length;column++) {
		let counter = 0;
		let depth = 0;

		for(let row=0;row<this.levelGrid.length;row++) {
			if(this.levelGrid[row][column]==1) {
				counter += 1;
				this.columnNumbers[column][depth] = counter;
			}
			else{
				if(counter != 0) {
					this.columnNumbers[column][depth] = counter;
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
		maxSize = this.maxRowNumberSize + this.levelGrid.length;
	}else{
		maxSize = this.maxColumnNumberSize  + this.levelGrid.length;
	}
	
	this.blockSize = 0; // Mege8os tou block/cell
	this.blockSize = Math.floor((size / maxSize) - 1); // το -1 θα το εξηγησω στην συνέχεια οταν γίνει το drawgrid
	//to width kai to height 8a bgainei apo to mege8os tou para8urou
	this.width = 0; //to platos tou canvas
	this.height = 0; //to upsos tou canvas
	this.width = (this.levelGrid[0].length + this.maxRowNumberSize) * this.blockSize;
	this.height = (this.levelGrid.length + this.maxColumnNumberSize) * this.blockSize;
	this.rowNumbersGrid = [];
	this.columnNumbersGrid = [];
	//Create row numbers cels
	for (var i = 0; i < this.rowNumbers.length; i ++) {
		for ( var y = 0; y < this.rowNumbers[i].length; y ++) {
			this.rowNumbersGrid.push(new NumberCell(
			this.blockSize, 
			this.blockSize, 
			(y * this.blockSize), 
			((this.maxColumnNumberSize) * this.blockSize) + (i * this.blockSize),
			0,   
			this.rowNumbers[i][y]));
		}
	}
	//Create column numbers cels
	for (var i = 0; i < this.columnNumbers.length; i ++) {
		for ( var y = 0; y < this.columnNumbers[i].length; y ++) {
			this.columnNumbersGrid.push(new NumberCell(
				this.blockSize, 
				this.blockSize, 
				((this.maxRowNumberSize) * this.blockSize) + (i * this.blockSize), 
				(y * this.blockSize), 
				0, 
				this.columnNumbers[i][y]));
		}
	}

	this.emptyGrid = []; // Adeio nonogram , tou xrhsth
	for (let i = (this.maxColumnNumberSize ) * this.blockSize; i < this.height; i += this.blockSize ) { //100 ; 100 < 250 ; 100 += 50
		for ( let y = (this.maxRowNumberSize ) * this.blockSize; y < this.width; y += this.blockSize ) { //100 ; 100 < 250 ; 100 += 50
			this.emptyGrid.push(new Cell(this.blockSize, this.blockSize, y, i, 0)); // βάζω ένα κουτάκη για κάθε κουτάκη στον πίνακα
		}
	}

	this.currentChoice = {
		cell: []
	};
	this.previousChoice = {
		active: false,
		cell: []
	};



















	this.fillCellChoice = "default"; //Auto 8a xrhsimepsei gia ta tools

	// implemantaion for redo
	this.cellChoices = {
		pastCells: [],
		newCells : [],
		index    : 0,
		update   : function() {
			if(this.index < this.pastCells.length) {
				let limit = this.pastCells.length;
				for(let i=this.index; i<limit; i++) {
					this.pastCells.pop();
					this.newCells.pop();
				}
				this.index = this.pastCells.length;
			}
		}
	};


	//--------------------------------------------------------------------------------------------------------	
	// this.userChoices = [];// einai gia to store
	
	// this.currentChoice = {};
	// this.previousChoice = {
	// 	active: false
	// };
	// this.correct = false;
}