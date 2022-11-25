import Phaser from "phaser";
let background;
let Button;

class win extends Phaser.Scene {
    constructor(test) {
        super({
            key: "win",
        });
    }

    preload() {
        this.load.image('back','src/GameScene/win.png');
        this.load.image('restart','src/GameScene/pngkey.com-replay-png-2243342.png');
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
export default win;