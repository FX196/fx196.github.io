function setup() {
    createCanvas(320, 320);
    background(0);
    t = 0;
    delta = 0.005;
}

function draw() {
    // fade the background by giving it a low opacity
    background(0, 10);
    colorMode(HSB, 100);


    var x = map(noise(t), 0, 1, 40, 280);
    var y = map(noise(t+5), 0, 1, 40, 280);
    var h = 100 * map(noise(t+10), 0, 1, 0.5, 1);
    var s = 100 * map(noise(t+15), 0, 1, 0.6, 0.8);
    var b = 100 * map(noise(t+20), 0, 1, 0.5, 1);

    noStroke();
    fill(h, s, b);
    ellipse(x, y, 80, 80);

    t += delta;
    if(random(1000)<=10){
        delta = -delta;
    }
}