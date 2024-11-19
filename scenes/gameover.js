import Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super({key: 'gameover'});
    }

    create() {
        const winstatus = this.registry.get('win');
        this.width = 512;
        this.height = 512;

        if (winstatus) {
            const text1 = this.add.bitmapText(
                153,
                this.height/2 -20,
                'arcade',
                'You Win!',
                40
            )
            const text2 = this.add.bitmapText(
                42.5,
                this.height/2 + 50,
                'arcade',
                'Press Space or Click to restart', 
                20
            )
        } else {
            const text1 = this.add.bitmapText(
                121,
                this.height/2 -20,
                'arcade',
                'Try Again!',
                40
            )
            const text2 = this.add.bitmapText(
                42.5,
                this.height/2 + 50,
                'arcade',
                'Press Space or Click to restart', 
                20
            )
        }

        this.input.keyboard.on('keydown-SPACE', this.startGame, this);
        this.input.on('pointerdown', this.startGame, this);

    }

    startGame() {
        this.scene.start('Game');
    }

}

