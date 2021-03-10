function createSinglePlayerTools() {
	//Tools creation
	const singlePlayerTools = ['default', 'black', 'x', 'white'];
	const singlePlayerExtraTools = ['redo_undo', 'clear', 'help', 'home'];
	const tools = document.getElementById("tools");
	const singleplayer = document.createElement('div');
	singleplayer.id = "singleplayer-tools";
	tools.appendChild(singleplayer);

	for(let i=0; i<singlePlayerTools.length; i++) {
		var li = document.createElement('li');
		li.classList.add("tool");
		var div = document.createElement('div');
		div.className = singlePlayerTools[i];
		var img = document.createElement('img');
		img.src = "img/" + singlePlayerTools[i] + ".png";
		div.appendChild(img);
		li.appendChild(div);
		singleplayer.appendChild(li);
	}

	for(let i=0; i<singlePlayerExtraTools.length; i++) {   
		var li = document.createElement('li');
		li.classList.add("extra-tool");
		var div = document.createElement('div');
		div.className = singlePlayerExtraTools[i];
		var img = document.createElement('img');
		img.src = "img/" + singlePlayerExtraTools[i] + ".png";
		div.appendChild(img);
		li.appendChild(div);
		singleplayer.appendChild(li);
	}

	let expandRedoUndoTool = ["undo", "redo"];
	let redo_undo_tool = document.getElementsByClassName("redo_undo")[0];
	let expand_redo_undo = document.createElement('div');
	expand_redo_undo.className = 'expand';
	for(let i=0; i<expandRedoUndoTool.length; i++) {
		let div = document.createElement('div');
		div.className = expandRedoUndoTool[i];
		let img = document.createElement('img');
		img.src = "img/" + expandRedoUndoTool[i] + ".png";
		div.appendChild(img);
		// let li = document.createElement('li');
		// redo_undo_tool.parent().appendChild();
		expand_redo_undo.appendChild(div)
	}
	redo_undo_tool.parentNode.appendChild(expand_redo_undo);

	singleplayer.firstElementChild.classList.add("active");
};

createSinglePlayerTools();

let singleplayer = document.getElementById("singleplayer-tools");
let singleplayerTools = singleplayer.getElementsByClassName("tool");

for (let i = 0; i < singleplayerTools.length; i++) {
  singleplayerTools[i].addEventListener("click", function() {
    let current = singleplayer.getElementsByClassName("active");
    
    if(typeof current[0] !== 'undefined') {
    	current[0].className = current[0].className.replace(" active", "");
    }
    
    this.className += " active";
  });
}

//For the default tool
$(".default").click(function(){
	if(nonogram.fillCellChoice !== "default") {
		nonogram.fillCellChoice = "default";
	}
});

//For the black tool
$(".black").click(function(){
	if(nonogram.fillCellChoice !== "black") {
		nonogram.fillCellChoice = "black";
	}
});

//For the x tool
$(".x").click(function(){
	if(nonogram.fillCellChoice !== "x") {
		nonogram.fillCellChoice = "x";
	}
});

//For the white tool
$(".white").click(function(){
	if(nonogram.fillCellChoice !== "white") {
		nonogram.fillCellChoice = "white";
	}
});

//For the redo undo tool
$(".redo_undo").click(function() {
	if($(".expand").is(":hidden")) {
		$(".redo_undo").css({"background": "linear-gradient(to bottom right, grey, #999966)"});
		$(".expand").show();
	}else{
		$(".expand").hide();
		$(".redo_undo").css({"background": "linear-gradient(to bottom right, #e0e0d1, #999966)"});
	}
});

//For the undo tool
$(".undo").click(function(){
	if(nonogram.cellChoices.index == 0) {
		return;
	}
	let index = nonogram.cellChoices.index-1;
	let cell = nonogram.cellChoices.pastCells[index].cell;
	if(nonogram.cellChoices.pastCells[index].value == 0) {
		//white cell
		nonogram.emptyGrid[cell].value = 0;
		nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
		nonogram.drawPreview(nonogram.emptyGrid[cell]);
		nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
		nonogram.cellChoices.index --;
	}else if(nonogram.cellChoices.pastCells[index].value == 1) {
		//black cell
		nonogram.emptyGrid[cell].value = 1;
		nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
		nonogram.drawBlackCell(nonogram.emptyGrid[cell]);
		nonogram.drawPreview(nonogram.emptyGrid[cell]);
		nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
		nonogram.cellChoices.index --;
	}else if(nonogram.cellChoices.pastCells[index].value == 2) {
		//x cell
		nonogram.emptyGrid[cell].value = 2;
		nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
		nonogram.drawXCell(nonogram.emptyGrid[cell]);
		nonogram.drawPreview(nonogram.emptyGrid[cell]);
		nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
		nonogram.cellChoices.index --;
	}
	nonogram.findUserChoices();
	store(currentStage, nonogram.userChoices.levelGrid);
	store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
	store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);
	nonogram.findProgress();
	$("#info-current-progress").text("");
	$("#info-current-progress").text(nonogram.findProgress() + "%");	
});

//For the redo tool
$(".redo").click(function(){
	if(nonogram.cellChoices.index == nonogram.cellChoices.newCells.length) {
		return;
	}
	
	let index;
	index = nonogram.cellChoices.index;
	let cell = nonogram.cellChoices.newCells[index].cell;
	if(nonogram.cellChoices.newCells[index].value == 0) {
		//white cell
		nonogram.emptyGrid[cell].value = 0;
		nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
		nonogram.drawPreview(nonogram.emptyGrid[cell]);
		nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
		nonogram.cellChoices.index ++;
	}else if(nonogram.cellChoices.newCells[index].value == 1) {
		//black cell
		nonogram.emptyGrid[cell].value = 1;
		nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
		nonogram.drawBlackCell(nonogram.emptyGrid[cell]);
		nonogram.drawPreview(nonogram.emptyGrid[cell]);
		nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
		nonogram.cellChoices.index ++;
	}else if(nonogram.cellChoices.newCells[index].value == 2) {
		//x cell
		nonogram.emptyGrid[cell].value = 2;
		nonogram.drawWhiteCell(nonogram.emptyGrid[cell]);
		nonogram.drawXCell(nonogram.emptyGrid[cell]);
		nonogram.drawPreview(nonogram.emptyGrid[cell]);
		nonogram.strokeCurrentChoice(nonogram.emptyGrid[cell]);
		nonogram.cellChoices.index ++;
	}
	nonogram.findUserChoices();
	store(currentStage, nonogram.userChoices.levelGrid);
	store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
	store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);
	nonogram.findProgress();
	$("#info-current-progress").text("");
	$("#info-current-progress").text(nonogram.findProgress() + "%");
});

//For the clear tool
$(".clear").click(function() {
	for(let i=0; i<nonogram.emptyGrid.length; i++) {
		nonogram.emptyGrid[i].value = 0;
	}

	for(let i=0; i<nonogram.rowNumbersGrid.length; i++) {
		nonogram.rowNumbersGrid[i].value = 0;
	}

	for(let i=0; i<nonogram.columnNumbersGrid.length; i++) {
		nonogram.columnNumbersGrid[i].value = 0;
	}

	ctx.clearRect(0,0,canvas.width, canvas.height);
	nonogram.drawGrid();
	nonogram.drawRowNumbers();
	nonogram.drawColumnNumbers();
	// nonogram.findUserChoices();
	// store(currentStage, nonogram.userChoices.levelGrid);
	// store('rowNumbersGrid-'+currentStage, nonogram.userChoices.rowNumbersGrid);
	// store('columnNumbersGrid-'+currentStage, nonogram.userChoices.columnNumbersGrid);
	// store("correct-" + currentStage, 0);
	// $(".correct-" + currentStage).hide();
// 	$("#info-current-progress").text("");
// 	$("#info-current-progress").text(nonogram.findProgress() + "%");
// 	nonogram.cellChoices.index = 0;
// 	nonogram.cellChoices.update();
});

$(".help").click(function() {
	let helpChoices = {	wrong: [], correct: [],	index: []};
	//οι 2 for einai gia na brw tis la8os epiloges
	for(let i=0; i<nonogram.levelGrid.length; i++) {
		for(let y=0; y<nonogram.levelGrid[i].length; y++) {
			//ama exei balei x se shmeio pou 8a eprepe na uparxei mauro keli 
			if(nonogram.levelGrid[i][y] === 1 && nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].value === 2) {
				//apo8hkeuw thn la8os kai thn swsth epilogh gia na exw ta swsta kelia apo8hkeumena
				helpChoices.wrong.push(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y]);
				helpChoices.correct.push(nonogram.levelGrid[i][y]);
				helpChoices.index.push(i*nonogram.levelGrid[0].length+y);
			//ama exei balei mauro se shmeio pou 8a eprepe na einai keno (h x)
			}else if(nonogram.levelGrid[i][y] === 0 && nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y].value === 1) {
				//apo8hkeuw thn la8os kai thn swsth epilogh gia na exw ta swsta kelia apo8hkeumena
				helpChoices.wrong.push(nonogram.emptyGrid[(i*nonogram.levelGrid[0].length)+y]);
				helpChoices.correct.push(nonogram.levelGrid[i][y]);
				helpChoices.index.push(i*nonogram.levelGrid[0].length+y);
			}
		}
	}
	//sthn sunexeia prepei na parw ena tuxaio la8os
	let randomChoice = Math.floor(Math.random() * helpChoices.index.length);
	// kai na to dior8wsw analogws sthn pista
	if(helpChoices.correct[randomChoice] === 0 && helpChoices.wrong[randomChoice].value === 1) { //ama exei balei mauro se keli pou prepei na einai aspro
		nonogram.emptyGrid[helpChoices.index[randomChoice]].value = 2;
		// nonogram.findUserChoices();
		// store(currentStage, nonogram.userChoices);
		ctx.strokeStyle = "green";
		ctx.lineWidth   = 4;
		ctx.strokeRect(nonogram.emptyGrid[helpChoices.index[randomChoice]].x+5, nonogram.emptyGrid[helpChoices.index[randomChoice]].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
		setTimeout( function() {
				nonogram.drawWhiteCell(nonogram.emptyGrid[helpChoices.index[randomChoice]]);
				ctx.strokeStyle = "green";
				ctx.strokeRect(nonogram.emptyGrid[helpChoices.index[randomChoice]].x+5, nonogram.emptyGrid[helpChoices.index[randomChoice]].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
		}, 500);
		setTimeout( function() {
			nonogram.drawXCell(nonogram.emptyGrid[helpChoices.index[randomChoice]]);
			ctx.strokeStyle = "green";
			ctx.strokeRect(nonogram.emptyGrid[helpChoices.index[randomChoice]].x+5, nonogram.emptyGrid[helpChoices.index[randomChoice]].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
		}, 1000 );
		nonogram.drawPreview(nonogram.emptyGrid[helpChoices.index[randomChoice]]);
		ctx.strokeStyle = "black";
	}else if(helpChoices.correct[randomChoice] === 1 && helpChoices.wrong[randomChoice].value === 2) { //ama exei balei x se shmeio pou 8a eprepe na einai mauro
		nonogram.emptyGrid[helpChoices.index[randomChoice]].value = 1;
		// nonogram.findUserChoices();
		// store(currentStage, nonogram.userChoices);
		ctx.strokeStyle = "green";
		ctx.strokeRect(nonogram.emptyGrid[helpChoices.index[randomChoice]].x+5, nonogram.emptyGrid[helpChoices.index[randomChoice]].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
		setTimeout( function() {
				nonogram.drawWhiteCell(nonogram.emptyGrid[helpChoices.index[randomChoice]]);
				ctx.strokeStyle = "green";
				ctx.strokeRect(nonogram.emptyGrid[helpChoices.index[randomChoice]].x+5, nonogram.emptyGrid[helpChoices.index[randomChoice]].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
		}, 500);
		setTimeout( function() {
			nonogram.drawBlackCell(nonogram.emptyGrid[helpChoices.index[randomChoice]]);
			ctx.strokeStyle = "green";
			ctx.strokeRect(nonogram.emptyGrid[helpChoices.index[randomChoice]].x+5, nonogram.emptyGrid[helpChoices.index[randomChoice]].y+5, nonogram.blockSize-10, nonogram.blockSize-10);
		}, 1000 );
		nonogram.drawPreview(nonogram.emptyGrid[helpChoices.index[randomChoice]]);
		ctx.strokeStyle = "black";
	}
});

//Home button
$(".home").click(function(){
	if(state == "multiplayer") {
		if(turn === false) {
			$("#waiting-screen").hide();
		}
		sock.emit('exit-multiplayer', multiplayerGame);
		currentLevel = "none"; //?
		turn = false;
		wait = false;
	}

	$("#container-tools").hide();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	container.style.transform = "none";
	container.style.left = "0%";
	container.style.top = "0%";
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	canvas.style.border = "none";
	state = "menu";
	$("#menu").show();
	$("#clients-count").show();
	//If drag controls was active then disable them
	if($('#top').show()) {
		$('#top').hide();
		$('#bottom').hide();
		$('#left').hide();
		$('#right').hide();
	}
});