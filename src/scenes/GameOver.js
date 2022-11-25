import Phaser from "phaser";
let background;
let playButton;
class GameOver extends Phaser.Scene {
    constructor(test) {
        super({
            key: "GameOver",
        });
    }

    preload() {
        this.load.image('bg','src/GameScene/GameOver.png');
        this.laod.image('restart','src/GameScene/pngkey.com-replay-png-2243342.png');
    }

    create() {
        background = this.add.image(960,540,'bg')
        playButton = this.add.image(950,720,'restart').setScale(0.5)
        //this.add.image(950,360,'slimelogo').setScale(2)
        playButton.setInteractive()
        playButton.on("pointerdown",()=>{
            this.scene.start("GameScene")
        })
    }

    update(delta, time) {
    }
}
export default GameOver;