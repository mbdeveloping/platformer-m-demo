export default class Controller {
    constructor() {
        this.left = { active: false },
        this.right = { active: false },
        this.jump = { active: false },
        this.up = { active: false },
        this.down = { active: false },
        this.attack = { active: false }
    }

    resetState() {
        this.left.active = false;
        this.right.active = false;
        this.up.active = false;
        this.down.active = false;
    }

    setState(eventType, action) {
        if (eventType === 'keydown') {
            this.resetState();
            action.active = true;
        } else {
            action.active = false;
        }
    }

    keyEvent(event) {
    
        switch (event.keyCode) {
            case 65: event.type === 'keydown' ? this.left.active = true : this.left.active = false; //A
            break;
            case 68: event.type === 'keydown' ? this.right.active = true : this.right.active = false; //D
            break;
            case 32: event.type === 'keydown' ? this.jump.active = true : this.jump.active = false; //SPACE
            break;
            case 13: event.type === 'keydown' ? this.attack.active = true : this.attack.active = false; //ENTER
            break;
            case 87: event.type === 'keydown' ? this.up.active = true : this.up.active = false; // W
            break;
            case 83: event.type === 'keydown' ? this.down.active = true : this.down.active = false; // W
            break;
        }
    }
}