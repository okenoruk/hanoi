/// <reference path="types/phaser.d.ts"/>

class TowerGame {

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
  rods: Phaser.Sprite[];

  preload() {
    this.game.load.image('bg', 'img/sky.png');
    this.game.load.image('rod', 'img/rod.png');
  }

  create() {
    console.log('create');

    const bg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg');
    bg.anchor.setTo(0.5, 0.5);

    this.setWorld();

    this.objDisks = [];

    // this.game.time.events.loop(50, this.createDisks.bind(this));

    this.createRods();
    this.createDisks();
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
        graphic.body.bounce.setTo(0.2, 0.2);

        // Enable drag
        graphic.inputEnabled = true;
        graphic.input.enableDrag(false, true);

        const color = Phaser.Color.getRandomColor(0, 255);
        this.objDisks.push({graphic, color, order: i});
      }
    }
  }

  createRods() {
    this.rods = [];

    for (let i = 0 ; i < 3 ; i++) {
      if (this.rods.length === 0 || typeof this.rods[i] === 'undefined') {
        const rod = this.game.add.sprite(100 * i, 400, 'rod');
        rod.width = 20;
        rod.height = 100;

        // Enable physics
        this.game.physics.enable(rod);
        rod.body.collideWorldBounds = true;
        // rod.body.checkCollision.up = false;
        // rod.body.checkCollision.down = false;
        // rod.body.immovable = true;

        this.rods.push(rod);
      }
    }
  }

  update() {
    this.objDisks.forEach(d => {
      d.graphic.beginFill(d.color, 1);//We fill rectangle with random color
      d.graphic.drawRoundedRect(0, 10, (30 * this.disks) / d.order, 10, 10);
      d.graphic.endFill();

      // Stop disk if dragged
      if (d.graphic.input.isDragged) {
        d.graphic.body.velocity.setTo(0, 0);
      }

      // Add collision
      this.rods.forEach((rod) => {
        this.game.physics.arcade.collide(rod, d.graphic);
      });
    });
  }

  render() {
    this.game.debug.rectangle(this.floor, '#708090');
  }
}

window.onload = () => {
  const game = new TowerGame();
};
