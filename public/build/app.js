/// <reference path="types/phaser.d.ts"/>
var SimpleGame = /** @class */ (function () {
    function SimpleGame(disks) {
        if (disks === void 0) { disks = 3; }
        this.disks = disks;
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, render: this.render });
    }
    SimpleGame.prototype.preload = function () {
        this.game.load.image('bg', 'img/sky.png');
    };
    SimpleGame.prototype.create = function () {
        console.log('create');
        var bg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bg');
        bg.anchor.setTo(0.5, 0.5);
        this.floor = new Phaser.Rectangle(0, 500, 800, 50);
    };
    SimpleGame.prototype.render = function () {
        this.game.debug.rectangle(this.floor, '#ff00aa');
        for (var i = 1; i <= this.disks; i++) {
            // draw disks
        }
    };
    return SimpleGame;
}());
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=app.js.map