import Phaser from "phaser";
let background;
let slime;
let platforms;
let keyW;
let keyA;
let keyS;
let keyD;
class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('bg','/src/GameScene/scene1.png');
        this.load.image('platform','src/GameScene/GrassFloor1.png');
        this.load.image('smallPlatform','src/GameScene/grassfloor.png');
        this.load.spritesheet('slime', '/src/GameScene/spritesheet.png',
             { frameWidth: 317.4, frameHeight: 254 });
    }

    create() {
        background = this.add.image(800,500,'bg');
        platforms = this.physics.add.staticGroup();
        platforms.create(800, 980, 'platform').refreshBody();
        platforms.create(1100,900,'smallPlatform');
        platforms.create(550,780,'smallPlatform').setScale(0.6);

        this.physics.add.collider(slime, platforms);
        slime = this.physics.add.sprite(350, 860, 'slime').setScale(0.5)

        this.anims.create({
            key: 'slimeLeft',
            frames: this.anims.generateFrameNumbers('slime', {
                start: 5,
                end: 8
            }),
            duration: 1000,
            repeat: -1
        })

        this.anims.create({
            key: 'slimeRight',
             frames: this.anims.generateFrameNumbers('slime', {
                 start: 0,
                 end: 3
             }),
             duration: 1000,
             repeat: -1
         })
         keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
         keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
         // keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
         slime.setCollideWorldBounds(true)
        
    }

    update(delta, time) {
        
    }
}
export default GameScene;
