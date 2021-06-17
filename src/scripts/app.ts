/// <reference path="types/phaser.d.ts"/>

class SimpleGame {

  constructor(disks = 3) {
    this.disks = disks;
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content',
      { preload: this.preload, create: this.create, render: this.render });
  }

  game: Phaser.Game;
  disks: number;

  floor: Phaser.Rectangle;

  preload() {
    this.game.load.image('bg', 'img/sky.png');
  }

  create() {
    console.log('create');

    const bg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg');
    bg.anchor.setTo(0.5, 0.5);

    this.floor = new Phaser.Rectangle(0, 500, 800, 50);
  }

  render() {
    this.game.debug.rectangle(this.floor, '#708090');

    for (let i = 1 ; i <= this.disks ; i ++) {
      // draw disks
    }
  }
}

window.onload = () => {
  const game = new SimpleGame();
};
