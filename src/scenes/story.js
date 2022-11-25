import Phaser from "phaser";
let background;
let next;
let i=1;
let slime;
let platform;

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
             { frameWidth: 317.4, frameHeight: 254 });
        this.load.image('floor','src/GameScene/floor.png')
    }

    create() {
        background = this.add.image(960,540,'backg');
        this.input.on("pointerdown",()=>{
            if(i<=8){
                next = this.add.image(350,880,'t'+i);
                i++;
            }
            else{
                this.scene.start("GameScene");
            }
        })

        //slime
        slime = this.physics.add.sprite(1500, 800, 'slime').setScale(0.5);
        this.physics.add.collider(slime);
        this.anims.create({
            key: 'slimeLeft',
            frames: this.anims.generateFrameNumbers('slime', {
                start: 3,
                end: 5
            }),
            duration: 1000,
            repeat: -1
        })
        this.anims.create({
            key: 'slimeRight',
             frames: this.anims.generateFrameNumbers('slime', {
                 start: 0,
                 end: 2
             }),
             duration: 1000,
             repeat: -1
         })
        

         //
        platform = this.physics.add.staticGroup();
        platform.enableBody = true;
        platform.create(1020, 1040, 'floor').setScale(1.1).refreshBody();
        slime.setCollideWorldBounds(true);
        slime.setBounce(0.3);
        slime.body.setGravityY(300)
        this.physics.add.collider(slime, platform);
    }

    update(delta, time) {
    }
}
export default story;
