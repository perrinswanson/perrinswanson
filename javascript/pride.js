
class Stripe {
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = Math.floor(Math.random() * 20) / 100;
        this.alphaSpeed = Math.floor(Math.random() * 10) + 5;
    }
    
    updateOpacity() {
        if (this.increaseAlpha) {
            this.alpha += this.alphaSpeed / 2000;
        } else {
            this.alpha -= this.alphaSpeed / 2000;
        }
        
        if (this.alpha < 0) {
            this.alpha = 0;
            this.increaseAlpha = true;
        }
        if (this.alpha > 0.2) {
            this.alpha = 0.2;
            this.increaseAlpha = false;
        }
    }
    
    toString() {
        return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
    }
}

const stripes = [
    new Stripe(97, 57, 21),
    new Stripe(115, 215, 238),
    new Stripe(255, 175, 199),
    new Stripe(255, 255, 255),
    new Stripe(229, 0, 0),
    new Stripe(255, 141, 0),
    new Stripe(255, 238, 0),
    new Stripe(2, 129, 33),
    new Stripe(0, 76, 255),
    new Stripe(118, 0, 136),
];

function updateStyle() {
    const colourString = stripes.map(function (stripe) { return stripe.toString() }).join(", ");
    document.body.style.backgroundImage = "linear-gradient(to bottom, #000000, " + colourString + ")";
}

updateStyle();

setInterval(function() {
    for (const stripe of stripes) {
        stripe.updateOpacity();
    }
    updateStyle();
}, 100);
