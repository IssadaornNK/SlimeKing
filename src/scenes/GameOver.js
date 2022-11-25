import Phaser from "phaser";
let bgOver;
let playButton;

class GameOver extends Phaser.Scene {
    constructor(test) {
        super({
            key: "GameOver",
        });
    }

    preload() {
        this.load.image('gameOver','src/GameScene/GameOverButWeeb.png');
        this.load.image('restart','src/GameScene/pngkey.com-replay-png-2243342.png');
    }

    create() {
        bgOver = this.add.image(960,540,'gameOver')
        playButton = this.add.image(960,530,'restart').setScale(0.5)
        //this.add.image(950,360,'slimelogo').setScale(2)
        //theOtherScene = this.scene.get('GameOver');
        playButton.setInteractive()
        playButton.on("pointerdown",()=>{
            this.scene.start("GameScene")
        })
    }

    update(delta, time) {
    }
}
export default GameOver;