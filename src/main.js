import 'phaser';
import Phaser from 'phaser';
import GameScene from './scenes/GameScene';


const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 1920,
    height: 1020,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [
        GameScene
    ],
    
    
};

const game = new Phaser.Game(config);