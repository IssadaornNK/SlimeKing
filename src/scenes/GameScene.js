import Phaser from "phaser";
let background;
let slime;
class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('bg','/src/GameScene/4.png');
        //bg.fixedToCamera = true;
        this.load.spritesheet('slime','/src/GameScene/Slime.png',{frameWidth: 315, frameHeight: 312});
    }

    create() {
        background = this.add.image(800,500,'bg');
        slime = this.physics.add.sprite(600,700,'slime').setScale(0.6);
        this.anims.create({
            key: 'slime1',
            frame: this.anims.generateFrameNumbers('slime',{
                start:0,
                end:1
            }),
            duration:500,
            repeat:-1
        })
    }

    update(delta, time) {
        slime.anims.play('slime1',true);
    }
}
export default GameScene;
