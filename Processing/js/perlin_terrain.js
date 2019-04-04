var cols, rows;
var scl = 30;
var w = 350 * 1.8;
var h = 250 * 1.8;

var t = 0;

var terrain = [];

function setup() {
    frameRate(40);
    createCanvas(320, 320, WEBGL);
    cols = w / scl;
    rows = h / scl;

    for (let x = 0; x < cols; x++) {
        terrain[x] = [];
        for (let y = 0; y < rows; y++) {
            terrain[x][y] = 0; //specify a default value for now
        }
    }
}

function draw() {


    let x;
    let y;
    for (y = 0; y < rows; y++) {
        let xoff = 0;
        for (x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xoff, 0.2 * y, t), 0, 1, -50, 50);
            xoff += 0.2;
        }
    }


    background(0);
    translate(0, 50);
    rotateX(PI / 3);
    fill(200);
    translate(-w / 2, -h / 2);
    for (y = 0; y < rows - 1; y++) {
        beginShape(TRIANGLE_STRIP);
        for (x = 0; x < cols; x++) {
            vertex(x * scl, y * scl, terrain[x][y]);
            vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
        }
        endShape();
    }

    t += 0.01;
}