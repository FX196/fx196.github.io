let noiseMax = 2;
let t = 0;
let phase = 0;
let phase_delta = 0.00001;

function setup() {
    dim = 320;
    //console.log($('#source'));
    createCanvas(dim, dim);
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    stroke(255);
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.01) {
        let xOff = map(cos(a), -1, 1, 0, noiseMax);
        let yOff = map(sin(a), -1, 1, 0, noiseMax);
        let r = map(noise(xOff, yOff, t), 0, 1, dim*120/400, dim*160/400);
        let x = r * cos(a + phase);
        let y = r * sin(a + phase);
        vertex(x, y);
    }
    if (random(1000) <= 10) {
        phase_delta = -phase_delta;
    }
    phase += phase_delta;
    phase %= 1000;
    t += 0.01;
    t %= 1000;
    endShape(CLOSE);
}