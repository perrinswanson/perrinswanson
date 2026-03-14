
const movingLeft = Math.random() < 0.5

const sizes = Array.prototype.concat(
    Array(200).fill(1),
    Array(200).fill(2),
    Array(30).fill(3),
    Array(20).fill(4),
    Array(10).fill(5),
    Array(1).fill(10)
);
const colours = Array.prototype.concat(
    Array(10).fill("#FFFFFF"),
    Array(1).fill("#FFFAB8"),
    Array(1).fill("#FFAA3B"),
    Array(1).fill("#C40000"),
    Array(1).fill("#abfff4")
);
const alphaSpeeds = Array.prototype.concat(
    Array(50).fill(1),
    Array(20).fill(2),
    Array(10).fill(3),
    Array(2).fill(4),
    Array(1).fill(5)
);
const movementSpeeds = Array.prototype.concat(
    Array(10).fill(1),
    Array(5).fill(2),
    Array(5).fill(3),
    Array(5).fill(4),
    Array(3).fill(5),
    Array(1).fill(10)
);

function selectRandom(array) {
    return array[Math.floor(Math.random() * array.length)]
}

class Star {
    constructor(element) {
        this.element = element;
        this.shouldUpdateOpacity = Math.random() < 0.6;
        this.shouldUpdatePosition = Math.random() < 0.4;
        this.reset(false);
    }
    
    reset(end) {
        this.size = selectRandom(sizes) / 2;
        this.colour = selectRandom(colours);
        this.movementSpeed = selectRandom(alphaSpeeds);
        this.alphaSpeed = selectRandom(movementSpeeds);
        
        if (end) {
            if (movingLeft) {
                this.left = screen.width + 10;
            } else {
                this.left = -10;
            }
        } else {
            this.left = Math.floor(Math.random() * screen.width);
        }
        this.alpha = Math.random();
        this.increaseAlpha = Math.random() < 0.5;
        
        this.element.style.width = this.size + "px";
        this.element.style.height = this.size + "px";
        this.element.style.borderRadius = (this.size / 2) + "px";
        this.element.style.opacity = this.alpha;
        
        this.element.style.left = this.left + "px";
        this.element.style.top = Math.floor(Math.random() * screen.height) + "px";
        
        this.element.style.backgroundColor = this.colour;
        this.element.style.boxShadow = "0px 0px " + this.size + "px " + this.size + "px " + this.colour;
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
        if (this.alpha > 1) {
            this.alpha = 1;
            this.increaseAlpha = false;
        }
        this.element.style.opacity = this.alpha;
    }
    
    updatePosition() {
        if (movingLeft) {
            this.left -= this.movementSpeed / 10;
            
            if (this.left < -10) {
                this.reset(true);
            } else {
                this.element.style.left = Math.floor(this.left) + "px";
            }
        } else {
            this.left += this.movementSpeed / 10;
            
            if (this.left > screen.width + 10) {
                this.reset(true);
            } else {
                this.element.style.left = Math.floor(this.left) + "px";
            }
        }
    }
}

const min = screen.width / 6;
const max = screen.width / 3;
const count = min + (Math.random() * (max - min));

const stars = [];
const backgroundElement = document.getElementById("background");

for (i = 0; i < count; i++) {
    const element = document.createElement("div");
    element.className = "star";
    
    stars.push(new Star(element));
    
    backgroundElement.appendChild(element);
}

setInterval(function() {
    for (const star of stars) {
        if (star.shouldUpdateOpacity) {
            star.updateOpacity();
        }
        if (star.shouldUpdatePosition) {
            star.updatePosition();
        }
    }
}, 5);
