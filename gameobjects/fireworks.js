import Phaser from 'phaser';

export default class Fireworks {
    constructor(scene) {
        this.scene = scene;
        // this.scene.load.spritesheet('pinkfire', '../assets/pinkfire.png', {frameWidth: 258, frameHeight: 258}),
        // this.scene.load.spritesheet('purplefire', '../assets/purplefire.png', {frameWidth: 258, frameHeight: 258}),
        // this.scene.load.spritesheet('yellowfire', '../assets/purplefire.png', {frameWidth: 258, frameHeight: 258}),
        this.fireworks = ['pinkfire', 'purplefire', 'yellowfire']
        this.createAnims()
        this.createFireWorks(this.scene, this.fireworks)
    }

    createAnims() {
        this.fireworks.forEach((f) => {
            this.scene.anims.create({
                key: f,
                frames: this.scene.anims.generateFrameNumbers(f, {start: 0, end: 6}),
                frameRate: 7
            });
        })
    }

    createFireWorks(scene, f) {
        for(let k = 0; k < 10; k++){
            setTimeout(function () {
                new Firework(scene, f[k%3]);
                console.log('hello');
            }, k*1000)
        }
        // this.fireworks.forEach((f) => {
        //     new Firework(this.scene, f);
        // })
    }
}

class Firework extends Phaser.GameObjects.Sprite {
    constructor(scene, firename) {
        let x = Phaser.Math.Between(0, 500);
        super(scene, x, 10, firename);
        this.y = Phaser.Math.Between(100, 200);
        this.firename = firename;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.init();
    }
    init() {
        this.scene.tweens.add({
            targets: this,
            y: {from: 502, to: this.y},
            duration: 1000,
            onComplete: () => this.destroy(),
        })
        this.anims.play(this.firename, true);
    }
}