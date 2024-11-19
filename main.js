import Phaser from 'phaser';
import Game from './scenes/game.js'
import GameOver from './scenes/gameover.js';

const config = {
    type: Phaser.AUTO,
    width: 512,
    height: 512,
    scene: [Game, GameOver],
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 1000 },
          // debug: true
        },
    },
    backgroundColor: '#00000'
};

const game = new Phaser.Game(config);