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
};

createSinglePlayerTools();

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