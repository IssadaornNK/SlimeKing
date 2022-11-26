import Phaser from "phaser";
let player
let monster
let event
let monGroup
let cursor
let score = 0
let text

class MonsterCreation extends Phaser.Scene {
    constructor(test) {
        super({
            key: "MonsterCreation",
        });
    }
    

    preload() {
        this.load.image('R', 'src/image/TimeEventClass/Rapid.png') // player
        this.load.image('S', 'src/image/TimeEventClass/Separate.png') //monster
        // this.load.image('cat', 'src/image/playermeow.jpg')
    }

    create() {
        //player
        player = this.physics.add.image(225, 600, 'R')
        player.setImmovable() //player ไม่ขยับ
        player.setCollideWorldBounds(true)

        //cat
        // cat = this.add.image(player.x , player.y, 'cat').setScale(0.25)

        //monster
        monGroup = this.physics.add.group(); //สร้าง group object

        //monster spawn
        event = this.time.addEvent({
            delay: 3000, 
            callback: function() {
                monster = this.physics.add.image(225, 150, 'S')
                monGroup.add(monster)
                monGroup.setVelocityY(200)
                
            },
            callbackScope: this,
            loop: true
            // repeat: 3 //เริ่มนับจาก ครั้งต่อไป
        })


        //text
        text = this.add.text(15, 15, "Score: " + score)

        
        this.physics.add.collider(player, monGroup, () => {
            monster.setVisible()
            score++
            text.setText("Score: " + score)
        })

        //cursor
        cursor = this.input.keyboard.createCursorKeys();

        


    }

    update(delta, time) {
        //monster destroy
        for(let i = 0; i < monGroup.getChildren().length; i++){ //ทำให้เรารู้ว่าใน group มีกี่ตัว
            if(monGroup.getChildren()[i].y > 750){ //i จะเก็บ index ทุกตัว
                monGroup.getChildren()[i].destroy()
            }
        }

        //movement
        //cursor [left, right, up, down]
        if(cursor.left.isDown){
            player.setVelocityX(-500)
        }else if(cursor.right.isDown){
            player.setVelocityX(500)
        }else if(cursor.up.isDown){
            player.setVelocityY(-500)
        }else if(cursor.down.isDown){
            player.setVelocityY(500)
        }else{
            player.setVelocityX(0)
            player.setVelocityY(0)
        }

    }
}
export default MonsterCreation;

