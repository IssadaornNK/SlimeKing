import Phaser from "phaser";
let background;

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
    }

    create() {
        background = this.add.image(960,540,'back')
        Button = this.add.image(300,850,'restart').setScale(0.5)
        //this.add.image(950,360,'slimelogo').setScale(2)
        //theOtherScene = this.scene.get('GameOver');
        Button.setInteractive()
        Button.on("pointerdown",()=>{
            this.scene.start("GameScene")
        })
    }

    update(delta, time) {
    }
}
export default story;