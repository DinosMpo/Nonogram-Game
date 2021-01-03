//Draw the grid
Nonogram.prototype.drawGrid = function() {
	//To background tou canvas
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, this.width, this.height);
	//To xrwma gia to plegma twn ari8mwn grammhs sthlhs
	ctx.fillStyle = "#e0e0d1";
	ctx.fillRect(0, this.maxColumnNumberSize * this.blockSize, this.maxRowNumberSize * this.blockSize, this.height);
	ctx.fillRect(this.maxRowNumberSize * this.blockSize, 0, this.width, this.maxColumnNumberSize * this.blockSize);
	ctx.fillStyle = "black";
	ctx.lineWidth = 1;
	ctx.beginPath();
	//Γραμμες πλέγματος κάθε στήλης
	for (var i = (this.maxColumnNumberSize) * this.blockSize; i < this.height; i += this.blockSize ) {
		ctx.moveTo(0,i);
		ctx.lineTo(this.width,i);
	}
	//Γραμμες πλέγματος κάθε γραμμής
	for ( var y = (this.maxRowNumberSize) * this.blockSize; y < this.width; y += this.blockSize ) { //100 ; 100 < 250 ; 100 += 50
		ctx.moveTo(y,0);
		ctx.lineTo(y, this.height);
	}
	//Γραμμες πλεγματος αριθμων
	for ( let i = 0; i < this.maxColumnNumberSize; i++ ) { //Gia ka8e grammh
		ctx.moveTo((this.maxRowNumberSize) * this.blockSize ,(i+1)*this.blockSize);
		ctx.lineTo(this.width, (i+1)*this.blockSize);
	}
	for ( let i = 0; i < this.maxRowNumberSize; i++ ) { //Gia ka8e sthlh
		ctx.moveTo( (i+1)*this.blockSize , (this.maxColumnNumberSize) * this.blockSize);
		ctx.lineTo( (i+1)*this.blockSize , this.height);
	}
	ctx.stroke();
	ctx.closePath();
}

Nonogram.prototype.drawRowNumbers = function() {
	for (var i = 0; i < this.rowNumbersGrid.length; i ++) {
		ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
		ctx.fillText( this.rowNumbersGrid[i].number, (this.rowNumbersGrid[i].x) + (this.blockSize/3), (this.rowNumbersGrid[i].y) + ((this.blockSize+8)/2));
	}
}

Nonogram.prototype.drawColumnNumbers = function() {
	for (var i = 0; i < this.columnNumbersGrid.length; i ++) {
		ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
		ctx.fillText(this.columnNumbersGrid[i].number, (this.columnNumbersGrid[i].x) + (this.blockSize/3), (this.columnNumbersGrid[i].y) + ((this.blockSize+8)/2));
	}
}

Nonogram.prototype.strokeCurrentChoice = function(cell) {
	//for the current and previous choice
	if(this.previousChoice.active) {
		ctx.beginPath();
		for(let i=0; i<this.previousChoice.cell.length; i++) {
			if(this.previousChoice.cell[i].value === 1) {
				this.drawWhiteCell(this.previousChoice.cell[i]);
				this.drawBlackCell(this.previousChoice.cell[i]);
			}else if(this.previousChoice.cell[i].value === 2) {
				this.drawWhiteCell(this.previousChoice.cell[i]);
				this.drawXCell(this.previousChoice.cell[i]);
			}else{
				ctx.fillStyle = "white";
				ctx.fillRect(this.previousChoice.cell[i].x + 2, this.previousChoice.cell[i].y + 2, this.previousChoice.cell[i].w - 4, this.previousChoice.cell[i].h - 4);
			}
		}
		ctx.stroke();
		ctx.closePath();
		this.previousChoice.cell = []; // gia na kanw clear ton pinaka
	}
	this.currentChoice.cell = cell;
	this.previousChoice.cell.push(cell);
	this.previousChoice.active = true;

	ctx.strokeStyle = "red";
	ctx.lineWidth   = 4;
	ctx.strokeRect(cell.x+5, cell.y+5, this.blockSize-10, this.blockSize-10);
}

//Draw the cell black
let drawBlackCellValue = 6;
Nonogram.prototype.drawBlackCell = function(cell) {
	ctx.fillStyle = 'black';
	ctx.fillRect(cell.x + drawBlackCellValue, cell.y + drawBlackCellValue, cell.w - (drawBlackCellValue * 2), cell.h - (drawBlackCellValue * 2));
}

//Draw the cell white
let drawWhiteCellValue = 2;
Nonogram.prototype.drawWhiteCell = function(cell) {
	ctx.fillStyle = "white";
	ctx.fillRect(cell.x + drawWhiteCellValue, cell.y + drawWhiteCellValue, cell.w - (drawWhiteCellValue * 2), cell.h - (drawWhiteCellValue * 2));
}

//Draw the cell X
let drawXCellValue = 6;
Nonogram.prototype.drawXCell = function(cell) {
	ctx.strokeStyle = "black";
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(cell.x + drawXCellValue, cell.y + drawXCellValue);
	ctx.lineTo(cell.x + this.blockSize - drawXCellValue, cell.y + this.blockSize - drawXCellValue);
	ctx.moveTo(cell.x + this.blockSize - drawXCellValue, cell.y + drawXCellValue);
	ctx.lineTo(cell.x + drawXCellValue, cell.y + this.blockSize - drawXCellValue);
	ctx.stroke();
	ctx.closePath();
}

//Gemisma twn keliwn
Nonogram.prototype.fillCels = function(mouseX, mouseY) {
	ctx.lineWidth = 3;
	ctx.beginPath();
	for(var i=0; i<this.rowNumbersGrid.length; i++) {
		if(mouseX >= this.rowNumbersGrid[i].x && mouseY >= this.rowNumbersGrid[i].y && mouseX <= (this.rowNumbersGrid[i].x + this.blockSize) && mouseY <= (this.rowNumbersGrid[i].y + this.blockSize)) {
			if(this.rowNumbersGrid[i].value === 0) {
				ctx.strokeStyle = "red";
				ctx.moveTo(this.rowNumbersGrid[i].x+3, (this.rowNumbersGrid[i].y + this.blockSize)-3);
				ctx.lineTo((this.rowNumbersGrid[i].x + this.blockSize)-3, this.rowNumbersGrid[i].y+3);
				this.rowNumbersGrid[i].value = 1;
			}else{
				ctx.fillStyle = "#e0e0d1";
				ctx.fillRect(this.rowNumbersGrid[i].x+2, this.rowNumbersGrid[i].y+2, this.rowNumbersGrid[i].w-3, this.rowNumbersGrid[i].h-3);
				ctx.fillStyle = "black";
				ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
				ctx.fillText( this.rowNumbersGrid[i].number, (this.rowNumbersGrid[i].x) + (this.blockSize/3), (this.rowNumbersGrid[i].y) + ((this.blockSize+8)/2));
				this.rowNumbersGrid[i].value = 0;
			}
			break;
		}
	}
	for(var i=0; i<this.columnNumbersGrid.length; i++) {
		if(mouseX >= this.columnNumbersGrid[i].x && mouseY >= this.columnNumbersGrid[i].y && mouseX <= (this.columnNumbersGrid[i].x + this.blockSize) && mouseY <= (this.columnNumbersGrid[i].y + this.blockSize)) {
			if(this.columnNumbersGrid[i].value === 0) {
				ctx.strokeStyle = "red";
				ctx.moveTo(this.columnNumbersGrid[i].x+3, (this.columnNumbersGrid[i].y + this.blockSize)-3);
				ctx.lineTo((this.columnNumbersGrid[i].x + this.blockSize)-3, this.columnNumbersGrid[i].y+3);
				this.columnNumbersGrid[i].value = 1;
			}else{
				ctx.fillStyle = "#e0e0d1";
				ctx.fillRect(this.columnNumbersGrid[i].x+2, this.columnNumbersGrid[i].y+2, this.columnNumbersGrid[i].w-3, this.columnNumbersGrid[i].h-3);
				ctx.fillStyle = "black";
				ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
				ctx.fillText(this.columnNumbersGrid[i].number, (this.columnNumbersGrid[i].x) + (this.blockSize/3), (this.columnNumbersGrid[i].y) + ((this.blockSize+8)/2));
				this.columnNumbersGrid[i].value = 0;
			}
			break;
		}
	}
	ctx.stroke();
	ctx.closePath();

	if(this.fillCellChoice == "default") {
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value == 0) { //fill the cell black
					this.emptyGrid[i].value = 1;
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawBlackCell(this.emptyGrid[i]);
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
		    	}else if(this.emptyGrid[i].value == 1) { //fill the cell with a X
			    	this.emptyGrid[i].value = 2;
			    	this.drawWhiteCell(this.emptyGrid[i]);
					this.drawXCell(this.emptyGrid[i]);
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
				}else { //Clear the cell
					this.emptyGrid[i].value = 0;
					this.drawWhiteCell(this.emptyGrid[i]);
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
				}
			}
		}
	}else if(this.fillCellChoice == "black"){
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value !== 1) {
					this.emptyGrid[i].value = 1;//fil the cell black
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawBlackCell(this.emptyGrid[i]);
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
			    }else{
					this.emptyGrid[i].value = 0;
					this.drawWhiteCell(this.emptyGrid[i]);
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
				}
			}
		}
	}else if(this.fillCellChoice == "x") {
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value !== 2) {
					this.emptyGrid[i].value = 2;
					this.drawWhiteCell(this.emptyGrid[i]);
					this.drawXCell(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
					this.strokeCurrentChoice(this.emptyGrid[i]);
		    	}else{
		    		this.emptyGrid[i].value = 0;
					this.drawWhiteCell(this.emptyGrid[i]);
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);
		    	}
		    }
		}
	}else if(this.fillCellChoice == "white") {
		for(var i=0;i<this.emptyGrid.length;i++) {
			if(mouseX >= this.emptyGrid[i].x && mouseY >= this.emptyGrid[i].y && mouseX <= (this.emptyGrid[i].x + this.blockSize) && mouseY <= (this.emptyGrid[i].y + this.blockSize)) {
				if(this.emptyGrid[i].value !== 0) {
					this.emptyGrid[i].value = 0;
					this.drawWhiteCell(this.emptyGrid[i]);
					this.strokeCurrentChoice(this.emptyGrid[i]);
					this.drawPreview(this.emptyGrid[i]);;
			    }
			}
		}
	}
}

Nonogram.prototype.drawPreview = function(cell) {
	let x = 0; //Οι συντεταγμένες του κελιού x και y
	let y = 0;
	let widthPreview = this.maxRowNumberSize * this.blockSize; //Πολλαπλασιαζουμε το πλήθος των κελιών που έιναι στα κελιά ανα γραμμή και ανα στήλη με το μέγεθος των κελιών.
	let heightPreview = this.maxColumnNumberSize * this.blockSize; //για να βρούμε το μεγεθος από αριστερα και απο δεξιά
	let size; //Το μέγεθος του drawPreview. Συγκρίνουμε το widthPreview με το heightPreview και παίρνουμε το μικρότερο ή το ίσο.

	if(widthPreview == heightPreview) {
		size = widthPreview-2; //Me thn afairesh dhmiourgoume ena keno apo deksia gia na mhn einai kolhmeno deksias
		x = (Math.floor(((cell.x) - size) / this.blockSize) * Math.floor(size / this.levelGrid[0].length));
		y = (Math.floor(((cell.y) - size) / this.blockSize) * Math.floor(size / this.levelGrid.length));
	}else if(widthPreview > heightPreview){
		size = heightPreview;
		x = Math.floor(((cell.x) - widthPreview) / this.blockSize) * Math.floor(size / this.levelGrid[0].length) + ((widthPreview/2)-(size/2));
		y = Math.floor(((cell.y) - size) / this.blockSize) * Math.floor(size / this.levelGrid.length) + ((heightPreview/2)-(size/2));
	}else{
		size = widthPreview-8;
		x = Math.floor(((cell.x) - size) / this.blockSize) * Math.floor(size / this.levelGrid[0].length) + ((widthPreview/2)-(size/2));
		y = Math.floor(((cell.y) - heightPreview) / this.blockSize) * Math.floor(size / this.levelGrid.length) + ((heightPreview/2)-(size/2));
	}
	let widthCell = Math.floor(size / this.levelGrid[0].length); //328/5
	let heightCell = Math.floor(size / this.levelGrid.length); //328/5

	if(cell.value === 1) {
		ctx.fillStyle = "black";
		ctx.fillRect(x + Math.floor((size-(widthCell*this.levelGrid[0].length))/2), y + Math.floor((size-(heightCell*this.levelGrid.length))/2), widthCell, heightCell);
		// ctx.fillRect(x + widthCell, y + heightCell, widthCell, heightCell);
	}else{
		ctx.fillStyle = "white";
		ctx.fillRect(x + Math.floor((size-(widthCell*this.levelGrid[0].length))/2), y + Math.floor((size-(heightCell*this.levelGrid.length))/2), widthCell, heightCell);
		// ctx.fillRect(x + widthCell, y + heightCell, widthCell, heightCell);
	}
}
