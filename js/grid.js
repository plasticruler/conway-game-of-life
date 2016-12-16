var Grid = function(rows, cols, cell_width) {

    this.Cells = [];
    this.ROW_COUNT = rows;
    this.COL_COUNT = cols;
    this.CELL_WIDTH = cell_width;

    this.setup = function() {
        for (var row = 0; row < this.ROW_COUNT; row++) {
            for (var col = 0; col < this.COL_COUNT; col++) {
                this.Cells.push(new Cell(this, row, col, this.CELL_WIDTH));
            }
        }
    }
    this.getReachableNeighbours = function(a) {
        var neighbours = a.getNeighbours();
        var r = [];
        for (var i = 0; i < neighbours.length; i++) {
            if (isConnected(a, neighbours[i]))
                r.push(neighbours[i]);
        }
        return r;
    }

    this.getReachableUnvisitedNeighbours = function(a) {
        var neighbours = a.getNeighbours();
        var r = [];
        for (var i = 0; i < neighbours.length; i++) {
            if (isConnected(a, neighbours[i]) && !neighbours[i].IsVisited)
                r.push(neighbours[i]);
        }
        return r;
    }

    this.getIndex = function(row, col) {
        if (row < 0 || col < 0 || row > this.ROW_COUNT - 1 || col > this.COL_COUNT - 1) {
            return -1;
        }
        return col + row * this.COL_COUNT;
    }

    this.getCell = function(i, j) {
        return this.Cells[getIndex(i, j)];
    }
    this.Draw = function() {
        for (var z = 0; z < this.Cells.length; z++) {
            this.Cells[z].show();
        }
    }
    this.setup(); //call setup
}