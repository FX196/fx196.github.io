function setup() {
    createCanvas(320, 320);
    background(0);
    stroke(255);
    strokeWeight(5);
    noFill();
    t = 0;
}

function draw() {
    background(0);
    translate (width/2,height/2);

    for (let i = 0; i < 20; i++) {
        line (x1(i), y1(i),x2(i), y2(i));
    }

    t += 0.2;
}

function x1(i) {
    let z = t+i;
    return sin(z/10) * 100 + sin(z/5) * 50;
}

function x2(i) {
    let z = t+i;
    return sin(z/10)*100 + sin(z) * 2;
}

function y1(i) {
    let z = t+i;
    return cos(z/10) * 100;
}

function y2(i) {
    let z = t+i;
    return cos(z/20)*100 + cos(z/12) * 20;
}