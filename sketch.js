let t = 0; // Time variable for Perlin noise, used to create smooth motion

function setup() {
  // Create a responsive canvas and attach it to the banner container
  let canvas = createCanvas(windowWidth, 400);
  canvas.parent('banner-container');

  // Set background color once at the start
  background(0);

  // Use HSB color mode for rainbow-style color transitions
  colorMode(HSB, 255);

  // No outlines for shapes
  noStroke();
}

function draw() {
  // Draw a semi-transparent black background to create a fading trail effect
  background(0, 10); 

  // Only generate shapes while mouse is pressed
  if (mouseIsPressed) {
    let size = random(20, 100); // Random size for each circle
    let hue = frameCount % 255; // Cycle hue over time (0–255)

    // Add Perlin noise to the mouse position for more organic movement
    let x = mouseX + noise(t) * 50 - 25;
    let y = mouseY + noise(t + 1000) * 50 - 25;

    // Prepare to apply transformations like rotation
    push();
    translate(x, y); // Move origin to (x, y)
    rotate(radians(frameCount % 360)); // Rotate based on frame count for subtle motion

    // Set fill color with current hue and some transparency
    fill(hue, 200, 255, 200);

    // Draw the circle at the transformed origin
    ellipse(0, 0, size);

    pop(); // Restore original drawing settings

    t += 0.01; // Increment time for Perlin noise movement
  }
}
