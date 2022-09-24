const Shape = require('./shape');
const directions = require('./directions');

module.exports = class Board {

  currentShape;
  currentTimeout;
  occupiedPoints = [];

  constructor(top, right, bottom, left, screen, game) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
    this.screen = screen;
    this.game = game;
    this.algorithm = game.algorithm();
    this.draw();
    this.startNewShape();
  }

  topAndBottomBorder = '+--------------------+';

  draw() {

    this.screen.d(this.left, this.top, this.topAndBottomBorder);

    for (let i = this.top + 1; i < this.bottom; i++) {
      this.screen.d(this.left, i, '|');
    }

    for (let i = this.top + 1; i < this.bottom; i++) {
      this.screen.d(this.right, i, '|');
    }

    this.drawBottomBorder();

    this.screen.render();
  }

  drawBottomBorder() {
    this.screen.d(this.left, this.bottom, this.topAndBottomBorder);
  }

  setIndicator(x, clear) {
    this.screen.d(x, this.bottom, clear ? '-' : '=');
  }

  startNewShape() {
    this.drawBottomBorder(); // reset bottom border indicator
    this.currentShape = new Shape(this.screen, this);
    this.currentTimeout = setTimeout(this.moveShapeAutomatically.bind(this), this.game.interval);
  }

  moveShapeAutomatically() {
    this.currentShape.move(directions.AUTO);
  }

  isPointOccupied(p) {
    for (const op of this.occupiedPoints) {
      if (op[0] === p[0] && op[1] === p[1]) { return true; }
    }

    return false;
  }

};

