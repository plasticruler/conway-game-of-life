/* configs */


var ROW_COUNT = 20;
var COL_COUNT = 50;
var CELL_WIDTH = 10;

var CANVAS_WIDTH = COL_COUNT * CELL_WIDTH;
var CANVAS_HEIGHT = ROW_COUNT * CELL_WIDTH;


var FRAME_RATE = 10;

var g = new Grid(ROW_COUNT, COL_COUNT, CELL_WIDTH);


var _NEUTRAL = 1;
var _VISITED = 2;
var _CURRENT = 3;
var _OBSTACLE = 4;
var _START = 5;
var _END = 6;
var backupGrid;;
var pause = true;

/* configs */
function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    frameRate(FRAME_RATE);
    //row, column
    createGlider(5, 8);
    createBlinker(6, 13);
    createBlinker(13, 13);
    createBlinker(10, 15);
}

function createBlinker(row, col) {
    g.Cells[g.getIndex(row, col)].IsAlive = true;
    g.Cells[g.getIndex(row + 1, col)].IsAlive = true;
    g.Cells[g.getIndex(row + 2, col)].IsAlive = true;
}

function createGlider(row, col) {
    g.Cells[g.getIndex(row, col)].IsAlive = true;
    g.Cells[g.getIndex(row + 1, col + 1)].IsAlive = true;
    g.Cells[g.getIndex(row + 2, col - 1)].IsAlive = true;
    g.Cells[g.getIndex(row + 2, col)].IsAlive = true;
    g.Cells[g.getIndex(row + 2, col + 1)].IsAlive = true;
}
//user inputs
function keyPressed() {
    pause = !pause;
    return false;
}

function mouseClicked() {
    var c = convertMousePositionToGrid(mouseX, mouseY);
    g.Cells[g.getIndex(c[0], c[1])].IsAlive = !g.Cells[g.getIndex(c[0], c[1])].IsAlive;
}

function convertMousePositionToGrid(x, y) {
    var col = Math.ceil(x / CELL_WIDTH);
    var row = Math.ceil(y / CELL_WIDTH);
    return [parseInt(row) - 1, parseInt(col) - 1];
}

function resetIsVisited() {
    for (var i = 0; i < g.Cells.length; i++) {
        g.Cells[i].IsVisited = false;
    }
    visited = [];
}


function draw() {
    background('white');
    g.Draw();
    if (!pause) {
        var backupGrid = new Grid(g.ROW_COUNT, g.COL_COUNT);

        for (var z = 0; z < g.Cells.length; z++) {
            backupGrid.Cells[z].IsAlive = g.Cells[z].isAlive();
        }

        for (var z = 0; z < g.Cells.length; z++) {
            g.Cells[z].IsAlive = backupGrid.Cells[z].IsAlive;
        }

    }

    noFill();
    strokeWeight(3);
    rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}