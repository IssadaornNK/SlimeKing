import Phaser from "phaser";
let background;
let next;
let i=1;
let slime;
let platform;
let keyW;
let keyA;
let keyD;
let star;
let storySound;
class story extends Phaser.Scene {
    constructor(test) {
        super({
            key: "story",
        });
    }

    preload() {
        this.load.image('backg','src/GameScene/storyScene.png');
        this.load.image('t1','src/GameScene/text1.png');
        this.load.image('t2','src/GameScene/text2.png');
        this.load.image('t3','src/GameScene/text3.png');
        this.load.image('t4','src/GameScene/text4.png');
        this.load.image('t5','src/GameScene/text5.png');
        this.load.image('t6','src/GameScene/text6.png');
        this.load.image('t7','src/GameScene/text7.png');
        this.load.image('t8','src/GameScene/text8.png');
        this.load.spritesheet('slime', '/src/GameScene/spritesheet.png',
             { frameWidth: 317, frameHeight: 254 });
        this.load.image('floor','src/GameScene/floor.png')
        this.load.image('star','src/GameScene/kindpng_3039539.png');
        this.load.audio('storySound','src/GameScene/very-lush-and-swag-loop-74140.mp3')
    }

    create() {
        background = this.add.image(960,540,'backg');
        storySound = this.sound.add('storySound',{loop:true});
        storySound.play();
        //slime
        slime = this.physics.add.sprite(1400, 800, 'slime').setScale(0.5);
        this.physics.add.collider(slime);
        this.anims.create({
            key: 'slimeLeft',
            frames: this.anims.generateFrameNumbers('slime', {
                start: 5,
                end: 9
            }),
            duration: 1000,
            repeat: -1
        })
        this.anims.create({
            key: 'slimeRight',
             frames: this.anims.generateFrameNumbers('slime', {
                 start: 0,
                 end: 4
             }),
             duration: 1000,
             repeat: -1
         })
        this.input.on("pointerdown",()=>{
            if(i<=8){
                next = this.add.image(350,880,'t'+i);
                i++;
                if(i==6){
                    star = this.add.sprite(1750,970,'star');
                }
            }
            else{
                this.scene.start("GameScene");
                storySound.stop();
            }
        })
        


         //
        platform = this.physics.add.staticGroup();
        platform.enableBody = true;
        platform.create(1020, 1040, 'floor').setScale(1.1).refreshBody();
        slime.setCollideWorldBounds(true);
        slime.setBounce(0.3);
        slime.body.setGravityY(300)
        this.physics.add.collider(slime, platform);

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

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
            slime.setVelocityY(-550);
            slime.anims.play('slimeleft', true);
        }
    }

}
export default story;
