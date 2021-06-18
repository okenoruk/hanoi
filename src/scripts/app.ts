/// <reference path="types/phaser.d.ts"/>

class SimpleGame {

  constructor(disks = 3) {
    this.disks = disks;
    this.game = new Phaser.Game(this.canvasWidth, this.canvasHeight, Phaser.AUTO, 'content',
      { preload: this.preload.bind(this), create: this.create.bind(this), update: this.update.bind(this),
        render: this.render.bind(this) });
  }

  canvasWidth = 800;
  canvasHeight = 600;

  game: Phaser.Game;
  disks: number;

  floor: Phaser.Rectangle;
  objDisks: Disk[];

  preload() {
    this.game.load.image('bg', 'img/sky.png');
  }

  create() {
    console.log('create');

    const bg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg');
    bg.anchor.setTo(0.5, 0.5);

    this.floor = new Phaser.Rectangle(0, 500, this.game.width, 50);

    this.objDisks = [];

    this.game.time.events.loop(50, this.createDisks.bind(this));
  }

  createDisks() {
    console.log('create disks');

    for (let i = 1 ; i <= this.disks ; i ++) {
      // draw disks
      if (typeof this.objDisks[i] === 'undefined') {
        const graphic = this.game.add.graphics(10 * i, 20 + 5 * i);
        const color = Phaser.Color.getRandomColor(0, 255);
        this.objDisks.push({graphic, color});
      }
    }
  }

  update() {
    console.log('update');
    console.log(this.objDisks);

    this.objDisks.forEach(d => {
      d.graphic.beginFill(d.color, 1);//We fill rectangle with random color
      d.graphic.drawRoundedRect(0, 10, 30, 10, 10);
      d.graphic.endFill();
    });
  }

  render() {
    this.game.debug.rectangle(this.floor, '#708090');
  }
}

window.onload = () => {
  const game = new SimpleGame();
};
