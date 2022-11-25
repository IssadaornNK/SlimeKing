import Phaser from "phaser";

let playButton;
let background;

class MainMenu extends Phaser.Scene {
    constructor(test) {
        super({
            key: "MainMenu",
        });
    }

    preload() {
        this.load.image('startButton','src/GameScene/playButton.png')
        this.load.image('slimelogo','src/GameScene/Slimeking_logo.png')
        this.load.image('bg','/src/GameScene/scene1.png')
        this.load.image('scene2','src/GameScene/Scene2.png')
        this.load.image('map','src/GameScene/map.png')
    }

    create() {
        background = this.add.image(5760,540,'map')
        playButton = this.add.image(950,720,'startButton').setScale(0.5)
        this.add.image(950,360,'slimelogo').setScale(2)
        playButton.setInteractive()
        playButton.on("pointerdown",()=>{
            this.scene.start("GameScene")
        })
    }

    update(delta, time) {
    }
}
export default MainMenu;