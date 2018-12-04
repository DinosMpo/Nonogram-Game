//Draw the grid
Nonogram.prototype.drawGrid = function() {
	//To background tou canvas
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, this.width, this.height);

	//To xrwma gia to plegma twn ari8mwn grammhs sthlhs
	ctx.beginPath();
	ctx.fillStyle = "#e0e0d1";
	ctx.fillRect(0, this.maxColumnNumberSize * this.blockSize, this.maxRowNumberSize * this.blockSize, this.height);
	ctx.fillRect(this.maxRowNumberSize * this.blockSize, 0, this.width, this.maxColumnNumberSize * this.blockSize);
	ctx.fillStyle = "black";
	ctx.closePath();

	ctx.lineWidth = 1;
	//Γραμμες πλέγματος κάθε στήλης
	for (var i = (this.maxColumnNumberSize ) * this.blockSize; i < this.height; i += this.blockSize ) {
		ctx.beginPath();
		ctx.moveTo(0,i);
		ctx.lineTo(this.width,i);
		ctx.stroke(); // Mporei na mhn xreiazetai
		ctx.closePath();
	}

	//Γραμμες πλέγματος κάθε γραμμής
	for ( var y = (this.maxRowNumberSize ) * this.blockSize; y < this.width; y += this.blockSize ) { //100 ; 100 < 250 ; 100 += 50
		ctx.beginPath(); // Auth h grammh nomizw den xreiazetai giati xrhsimopoiei thn apo panw
		ctx.moveTo(y,0);
		ctx.lineTo(y, this.height);
		ctx.stroke();
		ctx.closePath();
	}

	for (var i = (this.maxColumnNumberSize ) * this.blockSize; i < this.height; i += this.blockSize ) {
		for ( var y = (this.maxRowNumberSize ) * this.blockSize; y < this.width; y += this.blockSize ) {
			this.emptyGrid.push(new Cell(this.blockSize, this.blockSize, y, i, 0)); // bazw ena koutakh gia ka8e koutakh ston pinaka
		}
	}

	//Γραμμες πλεγματος αριθμων
	for ( let i = 0; i < this.maxColumnNumberSize; i++ ) { //Gia ka8e grammh
		ctx.beginPath();
		ctx.moveTo((this.maxRowNumberSize ) * this.blockSize ,(i+1)*this.blockSize);
		ctx.lineTo(this.width, (i+1)*this.blockSize);
		ctx.stroke();
		ctx.closePath();
	}

	for ( let i = 0; i < this.maxRowNumberSize; i++ ) { //Gia ka8e sthlh
		ctx.beginPath();
		ctx.moveTo( (i+1)*this.blockSize , (this.maxColumnNumberSize ) * this.blockSize);
		ctx.lineTo( (i+1)*this.blockSize , this.height);
		ctx.stroke();
		ctx.closePath();
	}
}

Nonogram.prototype.fillRowNumbers = function() {
	for (var i = 0; i < this.rowNumbers.length; i ++) {
		for ( var y = 0; y < this.rowNumbers[i].length; y ++) {
			this.rowNumbersGrid.push(new NumberCell(
				this.blockSize, 
				this.blockSize, 
				(y * this.blockSize), 
				( this.maxColumnNumberSize * this.blockSize) + (i * this.blockSize),   
				this.rowNumbers[i][y])
			);
		}
	}

	for (var i = 0; i < this.rowNumbersGrid.length; i ++) {
		ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
		ctx.fillText( this.rowNumbersGrid[i].number, (this.rowNumbersGrid[i].x) + (this.blockSize / 2) - 7, (this.rowNumbersGrid[i].y) + (this.blockSize / 2) + 5);
	}
}

Nonogram.prototype.fillColumnNumbers = function() {
	for (var i = 0; i < this.columnNumbers.length; i ++) {
		for ( var y = 0; y < this.columnNumbers[i].length; y ++) {
			this.columnNumbersGrid.push(new NumberCell(
				this.blockSize, 
				this.blockSize, 
				((this.maxRowNumberSize) * this.blockSize) + (i * this.blockSize), 
				(y * this.blockSize), this.columnNumbers[i][y])
			);
		}
	}

	for (var i = 0; i < this.columnNumbersGrid.length; i ++) {
		ctx.font = "bold " + (this.blockSize / 2) + "px Arial";
		ctx.fillText(this.columnNumbersGrid[i].number, (this.columnNumbersGrid[i].x) + (this.blockSize / 2) - 7, (this.columnNumbersGrid[i].y) + (this.blockSize / 2)  + 5);
	}
}