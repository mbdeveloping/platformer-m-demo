import Character from "./Character";

export default class Player extends Character {
    constructor(posX, posY) {
        super(posX, posY),
        this.type = 'Player'
    }
}