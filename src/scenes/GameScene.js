import Phaser from "phaser";
let background;
let slime;
let platforms;
let keyW;
let keyA;
let keyS;
let keyD;
let hearts;
let hp =3;
let heartDisplay;
let cursors;
let stars;
let atk =10;
let atkDisplay;
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
        this.load.image('star','src/GameScene/kindpng_3039539.png');
    }

    create() {

        //bg
        background = this.add.image(960,540,'bg');

        //platform
        platforms = this.physics.add.staticGroup();
        platforms.create(960, 1020, 'platform').refreshBody();
        platforms.create(1100,920,'smallPlatform');
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

         cursors = this.input.keyboard.createCursorKeys();
         //heart
         hearts = this.physics.add.group({
            key: 'heart',
            repeat: 2,
            setXY: { x: 450, y: 250, stepX: 1000 }
        });

        hearts.children.iterate(function (child) {
    
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    
        });
        this.physics.add.collider(hearts, platforms);
        this.physics.add.overlap(slime, hearts, this.collectHeart);

        heartDisplay = this.add.text(16, 16, 'hp: 3', { fontSize: '60px', fill: '#000' });

        stars = this.physics.add.group({
            key: 'star',
            repeat: 3,
            setXY: { x: 300, y: 250, stepX: 950 }
        });

        //star
        stars.children.iterate(function (child) {
    
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    
        });

        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(slime, stars, this.collectStar);

        atkDisplay = this.add.text(16, 100, 'atk: 10%', { fontSize: '60px', fill: '#000' });

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
            slime.setVelocityY(-510);
            slime.anims.play('slimeleft', true);
        }
    }
    collectHeart (slime, heart)
    {
        heart.disableBody(true, true);
        hp +=1;
        heartDisplay.setText('hp: ' + hp);
    }
    collectStar(slime,star)
    {
        star.disableBody(true, true);
        atk +=10;
        atkDisplay.setText('atk: '+atk+'%');
    }
}
export default GameScene;
