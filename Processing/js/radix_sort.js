function setup() {
    createCanvas(320, 320);
    numDots = 628;
    frameRate(6);
    exp = 12;
}

function zeroArray(size) {
    let arr = [];
    arr.length = size;
    arr.fill(0);
    return arr;
}

function shuffleArray(array) {
    let i, j = 0, temp;

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp
    }
}

function randArray(size, a, b) {
    let arr = [];
    for (let i = a; i <= b; i++) {
        arr.push(i);
    }
    shuffleArray(arr);
    return arr;
}

function radixSortH(arr, base, exp) {
    let l = arr.length;
    let out = zeroArray(l);
    let counts = zeroArray(base);

    for (let i = 0; i < l; i++) {
        let ind = Math.floor(arr[i] / Math.pow(base, exp)) % base;
        counts[ind] += 1;
    }

    for (let i = 1; i < base; i++) {
        counts[i] += counts[i - 1]
    }

    let i = l - 1;
    while (i >= 0) {
        let ind = Math.floor(arr[i] / Math.pow(base, exp)) % base;
        out[counts[(ind) % base] - 1] = arr[i];
        counts[(ind) % base] -= 1;
        i--;
    }

    return out;

}

function plotArray(arr) {
    background(0);
    translate(width / 2, height / 2);
    stroke(255);
    let delta = TWO_PI / arr.length;
    for (let i = 0; i <= arr.length; i++) {
        let a = i * delta;
        let r = height * 0.4 * (1 - (Math.abs(i - arr[i]) / arr.length));
        let x = r * cos(a);
        let y = r * sin(a);
        point(x, y);
    }
}

function draw() {
    if (exp === 12) {
        arr = randArray(628 * 16, 0, Math.pow(2, 12) - 1);
        plotArray(arr);
        exp = 0;
    } else {
        arr = radixSortH(arr, 2, exp);
        plotArray(arr);
        exp += 1;
    }

}