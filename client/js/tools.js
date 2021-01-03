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

//For the help tool