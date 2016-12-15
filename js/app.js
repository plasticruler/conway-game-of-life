/* configs */
var CANVAS_SIZE = 801;
var CELL_WIDTH = 20;
var ROW_COUNT = Math.round(CANVAS_SIZE / CELL_WIDTH);
var FRAME_RATE = 10;

var g = new Grid(ROW_COUNT, ROW_COUNT);


var _NEUTRAL = 1;
var _VISITED = 2;
var _CURRENT = 3;
var _OBSTACLE = 4;
var _START = 5;
var _END = 6;
var backupGrid;;
var pause = false;

/* configs */
function setup() {
    createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    frameRate(FRAME_RATE);
    //row, column
    createGlider(5, 8);
    //createBlinker(3, 3);
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

function keyPressed() {
    pause = !pause;
    return false;
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
    if (pause) {
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
    rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}