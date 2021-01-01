import Character from "./Character";

export default class Player extends Character {
    constructor(name = 'Manty') {
        super(),
        this.type = 'Player',
        this.name = name
    }
}