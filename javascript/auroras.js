
const maxColourValue = 64;

function getRandomColour() {
    const value = Math.floor(Math.random() * maxColourValue);
    if (value > 32 && value < 56) {
        return getRandomColour();
    }
    return value;
}

function toHex(value) {
    return ("0" + value.toString(16)).slice(-2);
}

class Background {
    constructor(previous) {
        if (previous) {
            this.currentRed = previous.targetRed;
            this.currentGreen = previous.targetGreen;
            this.currentBlue = previous.targetBlue;
        } else {
            this.currentRed = getRandomColour();
            this.currentGreen = getRandomColour();
            this.currentBlue = getRandomColour();
        }
        this.targetRed = getRandomColour();
        this.targetGreen = getRandomColour();
        this.targetBlue = getRandomColour();
    }
    
    updateValues() {
        if (this.currentRed < this.targetRed) {
            this.currentRed += 1;
        } else if (this.currentRed > this.targetRed) {
            this.currentRed -= 1;
        }
        if (this.currentGreen < this.targetGreen) {
            this.currentGreen += 1;
        } else if (this.currentGreen > this.targetGreen) {
            this.currentGreen -= 1;
        }
        if (this.currentBlue < this.targetBlue) {
            this.currentBlue += 1;
        } else if (this.currentBlue > this.targetBlue) {
            this.currentBlue -= 1;
        }
    }
    
    toString() {
        const red = toHex(this.currentRed);
        const green = toHex(this.currentGreen);
        const blue = toHex(this.currentBlue);
        return "#" + red + green + blue;
    }
    
    isComplete() {
        return this.currentRed === this.targetRed && this.currentGreen === this.targetGreen && this.currentBlue === this.targetBlue;
    }
}

let background1 = new Background();
let background2 = new Background();
let background3 = new Background();

function updateStyle() {
    document.body.style.backgroundColor = background1.toString();
    document.body.style.backgroundImage = "linear-gradient(to bottom, " + background1.toString() + ", " + background2.toString() + ", " + background3.toString() + ")";
}

updateStyle();

setInterval(function() {
    background1.updateValues();
    background2.updateValues();
    background3.updateValues();
    
    updateStyle();
    
    if (background1.isComplete()) {
        background1 = new Background(background1);
    }
    if (background2.isComplete()) {
        background2 = new Background(background2);
    }
    if (background3.isComplete()) {
        background3 = new Background(background3);
    }
}, 100);
