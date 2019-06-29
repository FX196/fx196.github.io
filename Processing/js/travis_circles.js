function setup() {
    createCanvas(320, 320);
    strokeWeight(4);
    stroke(205, 182, 44);
    noFill();
    c = 0;
    spin_r = width * 0.24;
    di = width * 0.18
}

function draw() {
    // 205, 182, 44
    if (c < 120) {
        t = c * (PI / 120);

        theta = map(max(1 - cos(t), 0), 0, 2, 0, PI);
        clear();
        circle(cos(theta) * spin_r + width / 2, sin(theta) * spin_r + height / 2, di);
        circle(-cos(theta) * spin_r + width / 2, -sin(theta) * spin_r + height / 2, di);
    }

    c += 1;
    c %= 140;

}