import Phaser from "phaser";
import Box from "../gameobjects/box.js";
import FadeBox from "../gameobjects/fadebox.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "Game" });
    }

    preload() { 
    }

    create() {
        this.space = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
        this.boxes = this.add.group();
        this.baseBox = new Box(this, 256, 480, 64, false);
        this.newBox = new Box(this);
        this.spaceKeyUp = true;
    }

    update() {
        this.physics.add.overlap(
            this.newBox,
            this.baseBox,
            () => this.onCollide(),
            null,
            this
        );

        if (this.space.isDown && this.spaceKeyUp) {
            this.spaceKeyUp = false;

            this.newBox.body.allowGravity = true;
            if (this.newBox.firstTween) {
                this.newBox.firstTween.stop();
            }
            if (this.newBox.secondTween) {
                this.newBox.secondTween.stop();
            }
        }
        if (this.space.isUp) {
            this.spaceKeyUp = true;
        }

        if (this.newBox.getBottomRight().y > this.baseBox.getTopRight().y) {
            console.log("Game Over!");
            this.scene.pause();
        }
    }

    onCollide() {
        const y = this.baseBox.y - 64;
        let x; 
        if (this.newBox.x < this.baseBox.x) {
            x = this.newBox.x + Math.abs(this.baseBox.x - this.newBox.x) / 2;
        } else {
            x = this.newBox.x - Math.abs(this.baseBox.x - this.newBox.x) / 2;
        }
        let width = this.baseBox.width - Math.abs(this.baseBox.x - this.newBox.x);

        this.createFadeBox();

        this.newBox.destroy();
        this.baseBox = new Box(this, x, y, width, false);
        this.newBox = new Box(this, 32, 32, width);
    }

    createFadeBox() {
        let width = Math.abs(this.baseBox.x - this.newBox.x);
        let y = this.baseBox.y - 64;
        let x;
        if (this.newBox.x < this.baseBox.x) {
            // x = this.newBox.x - Math.abs(this.baseBox.x - this.newBox.x);
            x = this.baseBox.getBottomLeft().x - (width/2);
        } else {
            // x = this.newBox.x + Math.abs(this.baseBox.x - this.newBox.x);
            x = this.baseBox.getBottomRight().x + (width/2);
        }
        new FadeBox(this, x, y, width);
    }
}
