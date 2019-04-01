int[][] result;
float t, c;

float ease(float p) {
  return 3*p*p - 2*p*p*p;
}

float ease(float p, float g) {
  if (p < 0.5)
    return 0.5 * pow(2*p, g);
  else
    return 1 - 0.5 * pow(2*(1 - p), g);
}

float mn = .5*sqrt(3), ia = atan(sqrt(.5));

void push() {
  pushMatrix();
  pushStyle();
}

void pop() {
  popStyle();
  popMatrix();
}

void draw() {

  if (!recording) {
    t = mouseX*1.0/width;
    c = mouseY*1.0/height;
    if (mousePressed)
      println(c);
    draw_();
  } else {
    for (int i=0; i<width*height; i++)
      for (int a=0; a<3; a++)
        result[i][a] = 0;

    c = 0;
    for (int sa=0; sa<samplesPerFrame; sa++) {
      t = map(frameCount-1 + sa*shutterAngle/samplesPerFrame, 0, numFrames, 0, 1);
      draw_();
      loadPixels();
      for (int i=0; i<pixels.length; i++) {
        result[i][0] += pixels[i] >> 16 & 0xff;
        result[i][1] += pixels[i] >> 8 & 0xff;
        result[i][2] += pixels[i] & 0xff;
      }
    }

    loadPixels();
    for (int i=0; i<pixels.length; i++)
      pixels[i] = 0xff << 24 |
        int(result[i][0]*1.0/samplesPerFrame) << 16 |
        int(result[i][1]*1.0/samplesPerFrame) << 8 |
        int(result[i][2]*1.0/samplesPerFrame);
    updatePixels();

    saveFrame("fr###.png");
    println(frameCount,"/",numFrames);
    if (frameCount==numFrames)
      exit();
  }
}

//////////////////////////////////////////////////////////////////////////////

int samplesPerFrame = 5;
int numFrames = 100;
float shutterAngle = .7;

boolean recording = true;

OpenSimplexNoise noise;


int n = 20;

float ax = 250;
float ay = 450;

int m = 500;

class Thing{
  float cx = random(0.1*width,0.9*width);
  float cy = random(0.1*height,0.5*height);

  float id = random(100);

  float mov = 50;
  float rad = 0.75;

  float offset_factor = 1.5;

  float x(float ph){
    return cx + mov*(float)noise.eval(id+rad*cos(TWO_PI*(t+ph)),rad*sin(TWO_PI*(t+ph)));
  }

  float y(float ph){
    return cy + mov*(float)noise.eval(100+id+rad*cos(TWO_PI*(t+ph)),rad*sin(TWO_PI*(t+ph)));
  }

  void show(){
    float x = x(0);
    float y = y(0);

    stroke(255);
    strokeWeight(1);
    fill(255);
    ellipse(x,y,4,4);

    /*noFill();
    stroke(255,100);
    strokeWeight(2);
    beginShape();
    for(int i=0;i<=m;i++){
      float tt = 1.0*i/m;

      float xx = lerp(x(-offset_factor*tt),ax,tt);
      float yy = lerp(y(-offset_factor*tt),ay,tt);

      vertex(xx,yy);
    }
    endShape();*/
    stroke(255,100);
    for(int i=0;i<=m;i++){
      float tt = 1.0*i/m;

      float xx = lerp(x(-offset_factor*tt),ax,tt);
      float yy = lerp(y(-offset_factor*tt),ay,tt);

      point(xx,yy);
    }
  }

}


Thing[] array = new Thing[n];

void setup(){
  size(500,500,P3D);
  result = new int[width*height][3];

  noise = new OpenSimplexNoise();

  for(int i=0;i<n;i++){
    array[i] = new Thing();
  }
}

void draw_(){
  background(0);

  for(int i=0;i<n;i++){
    array[i].show();
  }
}