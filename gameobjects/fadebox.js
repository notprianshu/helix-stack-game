import Phaser from 'phaser';

export default class FadeBox extends Phaser.GameObjects.Rectangle {
    constructor(scene, x = 32, y = 32, w = 64) {
        super(scene, x, y, w, 64, 0xffffff);
        this.y = y;
        this.scene = scene;
        scene.add.existing(this);
        this.init();
    }
    init() {
        this.fadeOut();
    }
    fadeOut() {
        this.fadeOut = this.scene.tweens.add({
            targets: this,
            y: {from: this.y, to: this.y + 20},
            alpha: {from: 1, to: 0},
            duration: 300,
            onComplete: () => this.destroy()
        })
    }
}