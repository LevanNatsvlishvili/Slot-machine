class SlotMachine {
  constructor(app, symbols) {
    this.app = app;
    this.symbols = symbols;
    this.rows = 3;
    this.columns = 5;
    this.canvasWidth = 800;
    this.canvasHeight = 500;
    this.reelSpeed = 20;
    this.slotWidth = 800 / this.columns;
    this.slotHeight = 500 / this.rows;
    this.reels = [];
    this.spinning = false;
    this.totalRows = this.rows + 15; // Include additional rows for spinning
  }

  create() {
    for (let i = 0; i < this.columns; i++) {
      const reel = [];
      for (let j = this.totalRows - 1; j >= 0; j--) {
        const symbol = this.createSymbol(i, j - 15); // Create extra rows above the visible area
        this.app.stage.addChild(symbol);
        reel.push(symbol);
      }
      this.reels.push(reel);
    }
  }

  createSymbol(column, row) {
    const symbol = PIXI.Sprite.from(this.symbols[Math.floor(Math.random() * this.symbols.length)]);
    symbol.width = this.slotWidth;
    symbol.height = this.slotHeight;
    symbol.x = column * this.slotWidth;
    symbol.y = row * this.slotHeight;
    return symbol;
  }

  spin() {
    this.spinning = true;
    let currentStopIndex = -1;

    this.spinInterval = setInterval(() => {
      for (let i = 0; i < this.columns; i++) {
        const reel = this.reels[i];
        if (i >= currentStopIndex) {
          for (let j = 0; j < reel.length; j++) {
            reel[j].y += this.reelSpeed;
            if (reel[j].y >= this.canvasHeight) {
              reel[j].y -= this.totalRows * this.slotHeight;
              reel[j].texture = PIXI.Texture.from(this.symbols[Math.floor(Math.random() * this.symbols.length)]);
            }
          }
        }
      }

      if (!this.spinning) {
        clearInterval(spinInterval);
      }
    }, 10);

    const mathRandom = Math.floor(Math.random() * this.symbols.length);

    setTimeout(() => {
      currentStopIndex += 1;
      console.log(currentStopIndex);
      this.stopInterval = setInterval(() => {
        currentStopIndex += 1;
        if (currentStopIndex === this.columns - 1) {
          this.stopSpinner();
        }
      }, (this.slotHeight / this.reelSpeed) * 2 * 10 * this.rows);
    }, (this.slotHeight / this.reelSpeed) * mathRandom * 10 * this.rows);
  }

  stopSpinner() {
    setTimeout(() => {
      this.spinning = false;
      clearInterval(this.spinInterval);
      clearInterval(this.stopInterval);
    }, (this.slotHeight / this.reelSpeed) * 2 * 10 * this.rows);
  }
}

const app = new PIXI.Application({ width: 800, height: 500 });
document.body.appendChild(app.view);

const symbols = [
  'images/M00_000.jpg',
  'images/M01_000.jpg',
  'images/M02_000.jpg',
  'images/M03_000.jpg',
  'images/M04_000.jpg',
  'images/M05_000.jpg',
  'images/M06_000.jpg',
  'images/M07_000.jpg',
  'images/M08_000.jpg',
  'images/M09_000.jpg',
  'images/M10_000.jpg',
  'images/M11_000.jpg',
  'images/M12_000.jpg',
];

const slotMachine = new SlotMachine(app, symbols);
slotMachine.create();

document.getElementById('spinButton').addEventListener('click', () => {
  if (!slotMachine.spinning) {
    slotMachine.spin();
  }
});
