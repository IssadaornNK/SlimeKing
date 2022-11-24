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
        this.load.image('tinyPlatform','src/GameScene/tinyground.png');
        this.load.spritesheet('slime', '/src/GameScene/spritesheet.png',
             { frameWidth: 317.4, frameHeight: 254 });
        this.load.image('heart','src/GameScene/PikPng.com_cute-heart-png_653468.png');
    }

    create() {

        //bg
        background = this.add.image(800,500,'bg');

        //platform
        platforms = this.physics.add.staticGroup();
        platforms.create(800, 980, 'platform').refreshBody();
        platforms.create(1100,900,'smallPlatform');
        platforms.create(480,720,'tinyPlatform');

        //slime
        slime = this.physics.add.sprite(350, 860, 'slime').setScale(0.5);
        this.physics.add.collider(slime);
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

         //input
         keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
         keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
         keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)

         //settings
         slime.setCollideWorldBounds(true);
         slime.setBounce(0.3);
         slime.body.setGravityY(300)
         this.physics.add.collider(slime, platforms);

         hearts = this.physics.add.group({
            key: 'heart',
            repeat: 2,
            setXY: { x: 12, y: 0, stepX: 1000 }
        });
    
        hearts.children.iterate(function (child) {
    
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
        });
        this.physics.add.collider(hearts, platforms);
        this.physics.add.overlap(player, hearts, collectStar, null, this);
    }

    update(delta, time) {
        if (keyA.isDown) {
            slime.setVelocityX(-250)
            slime.anims.play('slimeLeft', true); // waiting for spritesheet
        } else if (keyD.isDown) {
            slime.setVelocityX(250)
            slime.anims.play('slimeRight', true); // waiting for spritesheet
        } else {
            slime.setVelocityX(0)
            // slime.anims.play('slimeAni', false);
            slime.anims.play('slimeLeft', false);
            slime.anims.play('slimeRight', false); // waiting for spritesheet
        }
        if(keyW.isDown&&slime.body.touching.down) {
            slime.setVelocityY(-480);
            slime.anims.play('slimeleft', true);
        }
    }
}
export default GameScene;
