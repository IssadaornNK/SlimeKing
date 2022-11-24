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
        //bg.fixedToCamera = true;
        this.load.image('platform','src/GameScene/7.png');
        this.load.spritesheet('slime','/src/GameScene/Slime.png',{frameWidth: 315, frameHeight: 312});
    }

    create() {
        background = this.add.image(800,500,'bg');
        platforms = this.physics.add.staticGroup();
        platforms.create(800,980,'platform').refreshBody();
        /*slime = this.physics.add.sprite(600,700,'slime').setScale(0.6);
        slime.setBounce(0.2);
        slime.setCollideWorldBounds(true);

        this.anims.create({
        key: 'front',
        frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
        });*/
    }

    update(delta, time) {
        // console.log("update")
        //slime.anims.play('slime',true);
    }
}
export default GameScene;
