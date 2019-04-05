function setup() {
    createCanvas(320, 320);
    background(249,249,249);
    stroke(2, 5);
    noFill();
    t = 0;
}

function draw() {
    coords = [];
    for(let i=0;i<8; i++){
        coords[i] = map(noise(t+10+i*5), 0, 1, 0, height);
    }
    bezier(...coords);
    t+=0.005;
    if(t > 10){
        clear();
        setup();
    }
}