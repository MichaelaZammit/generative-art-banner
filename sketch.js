let mic, amplitude;
let t = 0;
let micStarted = false;
let startButton;

function setup() {
  let canvas = createCanvas(windowWidth, 400);
  canvas.parent('banner-container');
  background(0);
  colorMode(HSB, 255);
  noStroke();

  startButton = createButton('Click to Start Mic');
  startButton.position(width / 2 - 60, height / 2 - 20);
  startButton.mousePressed(startMic);
}

function startMic() {
  mic = new p5.AudioIn();
  mic.start(() => {
    amplitude = new p5.Amplitude();
    amplitude.setInput(mic);
    micStarted = true;
    startButton.hide();
  }, err => {
    console.error("Microphone access denied or error:", err);
  });
}

function draw() {
  background(0, 10);
  if (!micStarted) return;

  let level = amplitude.getLevel();
  let boosted = pow(level * 3, 2);
  let shapeCount = int(map(boosted, 0, 1, 1, 5));
  let tSpeed = map(boosted, 0, 1, 0.002, 0.05);

  for (let i = 0; i < shapeCount; i++) {
    let size = random(20, 100);
    let hue = frameCount % 255;
    let x = noise(t + i) * width;
    let y = noise(t + 1000 + i) * height;

    push();
    translate(x, y);
    rotate(radians(frameCount % 360));
    fill(hue, 200, 255, 200);
    ellipse(0, 0, size);
    pop();
  }

  t += tSpeed;
}
