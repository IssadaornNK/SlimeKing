import 'phaser';
import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import MainMenu from './scenes/MainMenu';
import MonsterCreation from './scenes/MonsterCreation';
import Bullet from './scenes/Bullet';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 450,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        Bullet,
        MonsterCreation,
        MainMenu,
        GameScene
    ],
    
    
};

const game = new Phaser.Game(config);

