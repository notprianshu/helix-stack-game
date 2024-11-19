import Phaser from 'phaser';

export default class Box extends Phaser.GameObjects.Rectangle {
    constructor(scene, x = 32, y = 32, w = 64, enableTweens = true) {
        super(scene, x, y, w, 64, 0xffffff);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.collideWorldBounds = true;
        this.body.setMass(1);
        if(enableTweens) this.init();
    }
    init() {
        this.ran = Phaser.Math.Between(500, 600);
        console.log(this.ran);
        this.leftToRight();
    }
    printCenter() {
        // console.log(this.getCenter().x)
        this.scene.time.delayedCall(
            1000,
            () => this.printCenter()
        )
    }
    leftToRight() {
        this.firstTween = this.scene.tweens.add({
            targets: this,
            x: {from: 32, to: 480},
            duration: this.ran,
            onComplete: () => this.rightToLeft()
        })
    }
    rightToLeft() {
        this.secondTween = this.scene.tweens.add({
            targets: this,
            x: {from: 480, to: 32},
            duration: this.ran,
            onComplete: () => this.leftToRight()
        })
    }
}