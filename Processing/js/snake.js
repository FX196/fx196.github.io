let scl = 20;
let footer_height = 40;
let head;
let tail;
let f;
let score;
let h;
let w;
let dead;


function setup() {
    createCanvas(800, 800 + footer_height);
    f = new Food();
    head = new SnakeBlock();
    tail = head;
    for (let i = 0; i < 10; i++) {
        lengthen();
    }
    score = 0;
    head.setDir(0, 1);
    frameRate(10);
    textFont('Helvetica');
    dead = false;
    for(let i=0;i<5;i++){
        tail.update();
    }
}

function draw() {
    background(0);
    //textSize(20);


    if (!dead) {
        if ((f.x === head.x) && (f.y === head.y)) {
            lengthen();
            f = new Food();
        }
        if (checkDead() === true) {
            dead = true;
        }
        f.show();
        tail.update();
        head.show();
        rect(-1, height - footer_height, width + 1, footer_height);
        fill(0);
        textSize(20);
        text("Score: " + score, 10, height - footer_height + 10, 200, 30);
    } else {
        head.show();
        textSize(60);
        text("DEAD", width / 2-100, height / 2-100, 200, 200);
        noLoop();
    }
}

function lengthen() {
    let t = new SnakeBlock();
    tail.next = t;
    t.prev = tail;
    t.x = tail.x - tail.xSpeed * scl;
    t.y = tail.y - tail.ySpeed * scl;
    t.xSpeed = tail.xSpeed * scl;
    t.ySpeed = tail.ySpeed * scl;
    tail = t;

    score += 1;
}

function checkDead() {
    return head.next.next.checkHasSnake(head.x, head.y);
}


function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            head.setDir(0, -1);
            break;
        case DOWN_ARROW:
            head.setDir(0, 1);
            break;
        case LEFT_ARROW:
            head.setDir(-1, 0);
            break;
        case RIGHT_ARROW:
            head.setDir(1, 0);
            break;
        case 32:
            console.log(f.x, f.y, head.x, head.y);
            console.log(checkDead());
            break;
    }
}

function Food() {
    this.x = Math.floor(random(0, (width / scl))) * scl;
    this.y = Math.floor(random(0, ((height - footer_height) / scl))) * scl;

    this.show = function () {
        fill(255, 0, 0);
        rect(this.x, this.y, scl, scl);
    }
}


function SnakeBlock() {
    this.shade = 255;

    this.x = 0;
    this.y = 0;

    this.xSpeed = 0;
    this.ySpeed = 0;

    this.prev = null;
    this.next = null;

    this.update = function () {
        if (this.prev) {
            this.xSpeed = this.prev.xSpeed;
            this.ySpeed = this.prev.ySpeed;
            this.prev.update();
        }
        this.x += this.xSpeed * scl;
        this.y += this.ySpeed * scl;
        //this.x = constrain(this.x, 0, w-scl);
        //this.y = constrain(this.y, 0, h-scl);
        this.x = (this.x + width) % width;
        this.y = (this.y + (height - footer_height)) % (height - footer_height);
    };

    this.setDir = function (x, y) {
        if ((x !== -this.xSpeed || x === 0) && (y !== -this.ySpeed || y === 0)) {
            this.xSpeed = x;
            this.ySpeed = y;
        }
    };

    this.show = function () {
        fill(this.shade);
        rect(this.x, this.y, scl, scl);
        if (this.next) {
            this.next.show();
        }
    };

    this.checkHasSnake = function (x, y) {
        if (this.x === x && this.y === y) {
            return true;
        } else if (this.next == null) {
            return false;
        } else {
            return this.next.checkHasSnake(x, y);
        }
    }


}