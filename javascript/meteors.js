
const meteorAngle = Math.floor(Math.random() * 140) + 20;

const meteorSizes = Array.prototype.concat(
    Array(20).fill(1),
    Array(10).fill(2),
    Array(1).fill(3),
);
const meteorColours = Array.prototype.concat(
    Array(10).fill("#FFFFFF"),
    Array(1).fill("#FFFAB8"),
    Array(1).fill("#abfff4")
);
const meteorSpeeds = Array.prototype.concat(
    Array(10).fill(70),
    Array(5).fill(60),
    Array(1).fill(50)
);

function selectRandom(array) {
    return array[Math.floor(Math.random() * array.length)]
}

class Meteor {
    
    constructor(element) {
        this.element = element;
        this.completion = 0;
        this.target = Math.floor(Math.random() * 50) + 50;
        this.length = Math.floor(Math.random() * 50) + 100;
        
        this.x = Math.floor(Math.random() * screen.width);
        this.y = Math.floor(Math.random() * screen.height) - 200;
        
        this.speed = selectRandom(meteorSpeeds);
        if (meteorAngle < 90) {
            this.xSpeed = Math.cos(meteorAngle * Math.PI / 180) * this.speed;
            this.ySpeed = Math.sin(meteorAngle * Math.PI / 180) * this.speed;
        } else if (meteorAngle > 90) {
            this.xSpeed = -Math.cos((180 - meteorAngle) * Math.PI / 180) * this.speed;
            this.ySpeed = Math.sin((180 - meteorAngle) * Math.PI / 180) * this.speed;
        } else {
            this.xSpeed = 0;
            this.ySpeed = this.speed;
        }
        
        this.size = selectRandom(meteorSizes);
        this.colour = selectRandom(meteorColours);
        
        element.style.width = this.length + "px";
        element.style.transform = "rotate(" + meteorAngle + "deg)";
        element.style.backgroundColor = this.colour;
        element.style.boxShadow = "0px 0px " + this.size + "px " + this.size + "px " + this.colour;
        
        this.updatePosition();
    }
    
    updatePosition() {
        this.x += this.xSpeed / 10;
        this.y += this.ySpeed / 10;
        this.element.style.left = Math.floor(this.x) + "px";
        this.element.style.top = Math.floor(this.y) + "px";
        this.completion += 1;
        if (this.completion <= 10) {
            this.element.style.opacity = this.completion / 10
        } else if (this.completion >= (this.target - 10)) {
            this.element.style.opacity = (this.target - this.completion) / 10;
        }
    }
}

function showMeteor() {
    const element = document.createElement("div");
    element.classList.add("meteor");
    const meteor = new Meteor(element);
    meteor.interval = setInterval(function() {
        meteor.updatePosition();
        if (meteor.completion === meteor.target) {
            clearInterval(meteor.interval);
            meteor.interval = undefined;
            backgroundElement.removeChild(element);
        }
    }, 5);
    
    backgroundElement.appendChild(element);
}

setInterval(function() {
    setTimeout(function() {
        showMeteor();
    }, Math.floor(Math.random() * 3000));
    
    setTimeout(function() {
        showMeteor();
    }, Math.floor(Math.random() * 3000));
}, 3000);
