import Phaser from "phaser";
let background; //create variable for background
let ermine; //create variable for spritesheet
let bullet; //create variable for group object
let basketball;
let football;
let volleyball;
let bird;
let cursor;
let keyW;
let keyA;
let keyS;
let keyD;


class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: "GameScene",
        });
    }

    preload() {
        this.load.image('bg','src/image/objectClass/backGround.png'); //background (image and tileSprite)
        this.load.spritesheet('ermine','src/image/objectClass/playerErmine.png', 
        {frameWidth: 500, frameHeight: 300}); //spritesheet
        this.load.image('bullet','src/image/objectClass/Bullet.png');
        this.load.image('basketball','src/image/objectClass/basketball.png');
        this.load.image('football','src/image/objectClass/football.png');
        this.load.image('volleyball','src/image/objectClass/volleyball.png')
        this.load.spritesheet('bird','src/image/objectClass/bird.png',
        {frameWidth: 410, frameHeight: 310});


    }

    create() {
        // background = this.add.image(100,350,'bg'); //image
        // ermine = this.physics.add.sprite(220,400,'ermine').setScale(0.5).setDepth(2).setSize(420,200).setOffset(60,70); //sprite
        // ermine.setCollideWorldBounds(true);
        // background = this.add.tileSprite(0, 0, 450, 720, 'bg').setOrigin(0, 0).setDepth(1); //tileSprtie
        // bullet = this.physics.add.staticGroup(); //GroupObject
        // bullet.create(200,300,'bullet')
        // bullet.create(500,300,'bullet')
        // bullet.create(400,500,'bullet')

        // basketball = this.add.image(200,300,'basketball').setScale(0.1).setDepth(3);
        // football = this.add.image(250,300,'football').setScale(0.1).setDepth(1);
        // volleyball = this.add.image(250,350,'volleyball').setScale(0.2).setDepth(2);
        bird = this.physics.add.sprite(220,400,'bird').setScale(0.5)
        this.anims.create({
           key: 'birdAni',
           frames: this.anims.generateFrameNumbers('bird', {
            start: 0,
            end: 7
           }),
           duration: 500,
           repeat: -1  
        })

    // this.input.on('pointermove', (pointer)=>{
    //     bird.x = pointer.x
    //     bird.y = pointer.y
    // })

        // cursor = this.input.keyboard.createCursorKeys()

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        bird.setCollideWorldBounds(true)
    }

    update(delta, time) {
        // background.tilePositionX += 2; //tileSprite
        bird.anims.play('birdAni', true);
        // if(cursor.up.isDown){
        //     bird.setVelocityY(-500)
        // }else if(cursor.down.isDown){
        //     bird.setVelocityY(500)
        // }else{
        //     bird.setVelocityY(0)
        // }

        // if(cursor.left.isDown){
        //     bird.setVelocityX(-500)
        // }else if(cursor.right.isDown){
        //     bird.setVelocityX(500)
        // }else{
        //     bird.setVelocityX(0)
        // }

        if(keyW.isDown){
            bird.setVelocityY(-500)
        }else if(keyS.isDown){
            bird.setVelocityY(500)
        }else{
            bird.setVelocityY(0)
        }

        if(keyA.isDown){
            bird.setVelocityX(-500)
        }else if(keyD.isDown){
            bird.setVelocityX(500)
        }else{
            bird.setVelocityX(0)
        }
    }
}
export default GameScene;

