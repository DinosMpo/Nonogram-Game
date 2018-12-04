"use strict"; //prepei na ekshghsw ti kanei auto

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let nonogram = new Nonogram([[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1],[0,1,0,1,0],[1,0,1,0,1]]);

canvas.width = nonogram.width;
canvas.height = nonogram.height;

console.log("rowNumbers");
console.log(nonogram.rowNumbers);
console.log("columnNumbers");
console.log(nonogram.columnNumbers);
console.log("blockSize = " + nonogram.blockSize);
console.log("width = " + nonogram.width);
console.log("height = " + nonogram.height);

nonogram.drawGrid();
nonogram.fillRowNumbers();
nonogram.fillColumnNumbers();
