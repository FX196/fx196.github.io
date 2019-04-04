function setup() {
    createCanvas(320, 320);
    background(0);
    t = 0;
    delta = 0.015;
}

function draw() {
    // fade the background by giving it a low opacity
    background(0, 10);


    var x = map(noise(t), 0, 1, 40, 280);
    var y = map(noise(t+5), 0, 1, 40, 280);
    var r = 255 * map(noise(t+10), 0, 1, 0.5, 1);
    var g = 255 * map(noise(t+15), 0, 1, 0.5, 1);
    var b = 255 * map(noise(t+20), 0, 1, 0.5, 1);

    noStroke();
    fill(r, g, b);
    ellipse(x, y, 80, 80);

    t += delta;
    if(random(1000)<=10){
        delta = -delta;
    }
}
