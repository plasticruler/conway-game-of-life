var Cell = function(g, row, col, cell_width) {

    this.Column = col;
    this.Row = row;
    this.Cell_Width = cell_width;
    this.cellType = _NEUTRAL;
    this.IsVisited = false;
    this.IsAlive = false;
    this.g = g;

    this.setCellType = function(t) {
        this.cellType = t;
    }

    this.isAlive = function() {
        var r = this.getNeighbours();
        /*
            https://en.wikipedia.org/wiki/Conway's_Game_of_Life
            Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
            Any live cell with two or three live neighbours lives on to the next generation.
            Any live cell with more than three live neighbours dies, as if by overpopulation.
            Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
        */
        var liveCount = 0;
        for (var i = 0; i < r.length; i++) {
            if (r[i].IsAlive)
                liveCount++;
        }
        if (liveCount < 2)
            return false;
        if ((liveCount == 3 || liveCount == 2) && this.IsAlive)
            return true;
        if (liveCount == 3)
            return true;
        if (liveCount > 3)
            return false;


    }
    this.show = function() {
        strokeWeight(2);
        fill(this.getCellColour());
        stroke('#333399');

        line(this.Column * this.Cell_Width,
            this.Row * this.Cell_Width,
            this.Column * this.Cell_Width + this.Cell_Width,
            this.Row * this.Cell_Width);


        line(this.Column * this.Cell_Width,
            this.Row * this.Cell_Width + this.Cell_Width,
            this.Columncol * this.Cell_Width + this.Cell_Width,
            this.Row * this.Cell_Width + this.Cell_Width);


        line(col * this.Cell_Width + this.Cell_Width, row * this.Cell_Width, col * this.Cell_Width + this.Cell_Width, row * this.Cell_Width + this.Cell_Width);

        line(col * this.Cell_Width, row * this.Cell_Width, col * this.Cell_Width, row * this.Cell_Width + this.Cell_Width);


        noStroke();
        rect(col * this.Cell_Width, row * this.Cell_Width, this.Cell_Width, this.Cell_Width);
    }



    this.getUnvisitedNeighbours = function() {
        var n = this.getNeighbours();
        var result = [];
        for (var i = 0; i < n.length; i++) {
            if (!n[i].IsVisited) {
                result.push(n[i]);
            }
        }
        return result;
    }
    this.getNeighbours = function() {
        var result = [];
        //for a square grid
        var n1 = g.Cells[g.getIndex(this.Row + 1, this.Column)];
        var n2 = g.Cells[g.getIndex(this.Row - 1, this.Column)];
        var n3 = g.Cells[g.getIndex(this.Row, this.Column + 1)];
        var n4 = g.Cells[g.getIndex(this.Row, this.Column - 1)];

        var n5 = g.Cells[g.getIndex(this.Row + 1, this.Column + 1)];
        var n6 = g.Cells[g.getIndex(this.Row - 1, this.Column - 1)];
        var n7 = g.Cells[g.getIndex(this.Row - 1, this.Column + 1)];
        var n8 = g.Cells[g.getIndex(this.Row + 1, this.Column - 1)];

        if (n1)
            result.push(n1);
        if (n2)
            result.push(n2);
        if (n3)
            result.push(n3);
        if (n4)
            result.push(n4);
        if (n5)
            result.push(n5);
        if (n6)
            result.push(n6);
        if (n7)
            result.push(n7);
        if (n8)
            result.push(n8);

        return result;
    }

    this.getCellColour = function() {
        if (this.cellType == _OBSTACLE)
            return 'black';
        if (this.IsAlive)
            return 'green';
        else
            return '#FFB533';
    }
}