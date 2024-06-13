const colorPicker = document.querySelector("#colorPicker");
const sketchPad = document.querySelector(".sketchPad");
const context = sketchPad.getContext("2d");
const drawBtn = document.querySelector("#draw");
const eraseBtn = document.querySelector("#erase");
const clearBtn = document.querySelector("#clear");

let selectedColor = "#000";

colorPicker.addEventListener("input", () => {
  selectedColor = colorPicker.value;
});

let drawing = false;
let erasing = false;

// Set the canvas size to maintain a square shape
function resizeCanvas() {
  const size = Math.min(window.innerWidth, window.innerHeight) * 0.5;
  sketchPad.width = size;
  sketchPad.height = size;
  sketchPad.lineWidth = 2; // Reset line width after resizing
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Initial call to set the canvas size

function startDrawing(event) {
  drawing = true;
  draw(event);
}

function endDrawing() {
  drawing = false;
  context.beginPath();
}

function draw(event) {
  if (!drawing) return;

  // Adjust for touch or mouse events
  const clientX = event.touches ? event.touches[0].clientX : event.clientX;
  const clientY = event.touches ? event.touches[0].clientY : event.clientY;

  // Adjust for canvas offset
  const rect = sketchPad.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  if (erasing) {
    context.clearRect(x - 10, y - 10, 20, 20);
  } else {
    context.lineWidth = 2; // Adjust the width for finer lines
    context.lineCap = "round"; // Round line cap for smoother edges
    context.strokeStyle = selectedColor; // Color of the drawing

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
  }
}

function clearSketchPad() {
  context.clearRect(0, 0, sketchPad.width, sketchPad.height);
}

sketchPad.addEventListener("mousedown", startDrawing);
sketchPad.addEventListener("mouseup", endDrawing);
sketchPad.addEventListener("mousemove", draw);

sketchPad.addEventListener("touchstart", startDrawing);
sketchPad.addEventListener("touchend", endDrawing);
sketchPad.addEventListener("touchmove", draw);

drawBtn.addEventListener("click", () => {
  erasing = false;
  drawBtn.disabled = true;
  eraseBtn.disabled = false;
});

eraseBtn.addEventListener("click", () => {
  erasing = true;
  drawBtn.disabled = false;
  eraseBtn.disabled = true;
});

clearBtn.addEventListener("click", clearSketchPad);

drawBtn.disabled = true;
