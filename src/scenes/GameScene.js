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
let starDisplay;
let monster;
let mon;
let bullet;
let event;
let bulletGroup;
let hr;
let starCount =0;
class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('bg','/src/GameScene/scene1.png');
        this.load.image('scene2','src/GameScene/Scene2.png');
        this.load.image('platform','src/GameScene/GrassFloor1.png');
        this.load.image('ground','src/GameScene/ground.png')
        this.load.image('smallPlatform','src/GameScene/grassfloor.png');
        this.load.image('tinyPlatform','src/GameScene/tinyground.png');
        this.load.spritesheet('slime', '/src/GameScene/spritesheet.png',
             { frameWidth: 317, frameHeight: 254 });
        this.load.image('heart','src/GameScene/PikPng.com_cute-heart-png_653468.png');
        this.load.image('star','src/GameScene/kindpng_3039539.png');
        this.load.image('map','src/GameScene/map.png')
        this.load.spritesheet('mon', 'src/GameScene/Female.png',
             { frameWidth: 32 , frameHeight: 32 });
        this.load.image('bullet','src/GameScene/kindpng_1797062.png');
    }

    create() {
        //========bg=======
        background = this.add.image(5760,540,'map');
        //background = this.add.image(1920+960,540,'scene2');
        
        
        //========platform=======
        platforms = this.physics.add.staticGroup();
        platforms.enableBody = true
        platforms.create(5760, 1020, 'ground').setScale(1.1).refreshBody();
        platforms.create(1100,920,'smallPlatform');
        platforms.create(2050,920,'smallPlatform');
        platforms.create(480,720,'tinyPlatform');
        platforms.create(2500,700,'tinyPlatform');
        platforms.create(2870,920,'smallPlatform');
        platforms.create(2900,550,'tinyPlatform');
        platforms.create(3500,350,'tinyPlatform');
        platforms.create(4000,900,'platform');
        platforms.create(4500,940,'platform');
        platforms.create(6000,920,'smallPlatform');
        platforms.create(6700,940,'tinyPlatform');
        platforms.create(7500,920,'smallPlatform');
        platforms.create(8040,920,'smallPlatform');
        platforms.create(8040,860,'smallPlatform');
        platforms.create(8580,920,'smallPlatform');
        platforms.create(9700,750,'tinyPlatform');
        

        //========slime========
        slime = this.physics.add.sprite(350, 860, 'slime').setScale(0.5);
        this.physics.add.collider(slime);
        this.anims.create({
            key: 'slimeLeft',
            frames: this.anims.generateFrameNumbers('slime', {
                start: 5,
                end: 9
            }),
            duration: 800,
            repeat: -1
        })
        this.anims.create({
            key: 'slimeRight',
             frames: this.anims.generateFrameNumbers('slime', {
                 start: 0,
                 end: 4
             }),
             duration: 800,
             repeat: -1
         })



         //================================================================enemy========================================================================
         monster = this.physics.add.sprite(1200,700,'mon').setScale(4);
         this.physics.add.collider(monster);
         monster.setGravityY(200);
         this.anims.create({
            key: 'monLeft',
            frames : this.anims.generateFrameNumbers('mon',{
                start: 3,
                end: 5
            }),
            duration: 1000,
            repeat: -1
         })
         this.anims.create({
            key: 'monRight',
            frames : this.anims.generateFrameNumbers('mon',{
                start: 0,
                end: 2
            }),
            duration: 1000,
            repeat: -1
         })
         this.physics.add.collider(monster, platforms);
         this.physics.add.overlap(monster, slime,this.enemyKiller);
        //  this.physics.add.collider(monster, slime);this.enemyKiller
         //this.physics.add.overlap(monster, slime, this.damage,null,this);
        


         //================================================================input================================================================
         keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
         keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
         keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

         //========settings========
         slime.setCollideWorldBounds(true);
         slime.setBounce(0.3);
         slime.body.setGravityY(300)
         this.physics.add.collider(slime, platforms);

         cursors = this.input.keyboard.createCursorKeys();
         //================================================================heart================================================================
         hearts = this.physics.add.group({
            key: 'heart',
            repeat: 20,
            setXY: { x: 2700, y: 0, stepX: 1250 }
        });
        hr = this.physics.add.staticGroup();
        hr.create(3500,260,'heart').setScale(2);
        hearts.children.iterate(function (child) {
    
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    
        });
        this.physics.add.collider(hearts, platforms);
        this.physics.add.overlap(slime, hr, this.extraHeart);
        this.physics.add.overlap(slime, hearts, this.collectHeart);

        heartDisplay = this.add.text(16, 16, 'hp: 3', { fontSize: '60px', fill: '#000' });

        //========star========
        stars = this.physics.add.group({
            key: 'star',
            repeat: 25,
            setXY: { x: 300, y: 0, stepX: 450 }
        });

        stars.children.iterate(function (child) {
    
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    
        });

        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(slime, stars, this.collectStar);

        starDisplay = this.add.text(16, 100, 'Star: 0/25', { fontSize: '60px', fill: '#000' });

        //========camera========
        this.cameras.main.setBounds(0, 0, background.displayWidth,background.displayHeight);
        this.physics.world.setBounds(0, 0, 1920*6, 1080*6);
        this.cameras.main.startFollow(slime, true, 0.5, 0.5);
        //this.cameras.main.followOffset.set(-300, 0);

        //this.cameras.main.setZoom(2);

        // this.physics.moveToObject(this.monster, this.slime, 100);
       

        //========weapon========
        //fireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACEBAR);
        bulletGroup = this.physics.add.group()
        event = this.time.addEvent({
            delay: 1000,
            callback: function() {
                bullet = this.physics.add.image(monster.x, monster.y,'bullet')
                bullet.setScale(0.7)
                bullet.setDepth(0.9)
                bulletGroup.add(bullet)
                bulletGroup.setVelocityY(50)
                bulletGroup.setVelocityX(-1080)
            },
            callbackScope: this,
            loop: true
            })
            this.physics.add.collider(slime, bulletGroup, this.damage);
            
        }

    update(delta, time) {
        //background.tilePositionX += 2;
        //platforms.tilePositionX += 2;
        // this.enemyFollows();
        // this.physics.moveToObject(this.monster, this.slime, 100);
        
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

        heartDisplay.setScrollFactor(0);
        starDisplay.setScrollFactor(0);

        // if (monster.x > slime.x){
        //     monster.setVelocityX(-100);
        //     monster.anims.play('monLeft', true);
        // } else if (monster.x < slime.x){
        //     monster.setVelocityX(100);
        //     monster.anims.play('monRight', true);
        //     //monster.anims.play('monLeft', false);
        // }else {
        //     monster.setVelocityX(0);
        //     monster.anims.play('monRight', false);
        //     monster.anims.play('monLeft', false);
        // }
        // }else if (monster.position.x < slime.position.x ){
        //     monster.setVelocityX(20)
        //     monster.anims.play('monRight', true);
        if(hp<=0){
            this.scene.start("GameOver")
            hp =3;
        }
        if(starCount==25){
            this.scene.start("win");
            hp=3;
            starCount=0;
        }

       {
            this.enemyFollows();
            monster.anims.play('monLeft', true);
        }
    }//endUpdate

    collectHeart (slime, heart)
    {
        heart.disableBody(true, true);
        hp +=1;
        heartDisplay.setText('hp: ' + hp);
    }
    extraHeart(slime,hr)
    {
        hr.disableBody(true,true);
        hp+=5;
        heartDisplay.setText('hp: ' + hp);
    }
    collectStar(slime,star)
    {
        star.disableBody(true, true);
        starCount += 1;
        starDisplay.setText('Star: '+starCount+'/25');
    }
        damage(slime,bullet)
        {
            hp -= 1;
            heartDisplay.setText('hp: '+ hp);
            bullet.destroy();
        }
    enemyKiller(monster,slime)
    {
        event.destroy();
        monster.setVisible(false);
    }
    enemyFollows () {
        this.physics.moveToObject(monster,slime,100);
    }
}
export default GameScene;
