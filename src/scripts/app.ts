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
  objDisks: IDisk[];

  preload() {
    this.game.load.image('bg', 'img/sky.png');
  }

  create() {
    console.log('create');

    const bg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg');
    bg.anchor.setTo(0.5, 0.5);

    this.setWorld();

    this.objDisks = [];

    this.game.time.events.loop(50, this.createDisks.bind(this));
  }

  setWorld() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.floor = new Phaser.Rectangle(0, 500, this.game.width, 50);

    //  Set the world (global) gravity
    this.game.physics.arcade.gravity.y = 100;

    //  Set bounds
    this.game.physics.arcade.setBounds(0, 0, this.game.width, this.game.height - 100 - (this.floor.height / 2));
  }

  createDisks() {
    console.log('create disks');

    for (let i = 1 ; i <= this.disks ; i ++) {
      // draw disks
      if (this.objDisks.length === 0 || typeof this.objDisks[i - 1] === 'undefined') {
        const graphic = this.game.add.graphics(10 * i, 20 + 5 * i);
        graphic.lineStyle(1, Phaser.Color.BLACK);

        // Enable physics
        this.game.physics.enable(graphic);
        graphic.body.collideWorldBounds = true;
        graphic.body.bounce.y = 0.8;

        // Enable drag
        graphic.inputEnabled = true;
        graphic.input.enableDrag(false, true);

        const color = Phaser.Color.getRandomColor(0, 255);
        this.objDisks.push({graphic, color});
      }
    }
  }

  update() {
    this.objDisks.forEach(d => {
      d.graphic.beginFill(d.color, 1);//We fill rectangle with random color
      d.graphic.drawRoundedRect(0, 10, 30, 10, 10);
      d.graphic.endFill();

      // Stop disk if dragged
      if (d.graphic.input.isDragged) {
        d.graphic.body.velocity.setTo(0, 0);
      }

      // let bounce = this.game.add.tween(d.graphic);
      // bounce.to({ y: this.game.world.height - 100 }, 1000 + Math.random() * 3000, Phaser.Easing.Bounce.In);
      // bounce.start();
    });
  }

  render() {
    this.game.debug.rectangle(this.floor, '#708090');
  }
}

window.onload = () => {
  const game = new SimpleGame();
};
