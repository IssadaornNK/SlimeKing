import Phaser from "phaser";
let background;
let slime;
let platforms;
class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('bg','/src/GameScene/4.png');
        this.load.image('platform','src/GameScene/7.png');

    }

    create() {
        background = this.add.image(800,500,'bg');
        platforms = this.physics.add.staticGroup();
        platforms.create(800, 980, 'platform').refreshBody();

    }

    update(delta, time) {
        
    }
}
export default GameScene;
