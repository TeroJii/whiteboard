const canvas = document.getElementById("whiteboard");
const context = canvas.getContext("2d");
const toolButtons = document.querySelectorAll(".tool[data-color]");
const eraserButton = document.getElementById("eraser");
const clearButton = document.getElementById("clear-board");

let drawing = false;
let currentColor = "#000000";
let lineWidth = 4;

const resizeCanvas = () => {
  const snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  context.putImageData(snapshot, 0, 0);
  context.lineCap = "round";
  context.lineJoin = "round";
};

const getPoint = (event) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

const startDrawing = (event) => {
  drawing = true;
  const point = getPoint(event);
  context.beginPath();
  context.moveTo(point.x, point.y);
};

const draw = (event) => {
  if (!drawing) {
    return;
  }

  const point = getPoint(event);
  context.strokeStyle = currentColor;
  context.lineWidth = lineWidth;
  context.lineTo(point.x, point.y);
  context.stroke();
};

const stopDrawing = () => {
  drawing = false;
  context.closePath();
};

const setActiveButton = (button) => {
  document.querySelectorAll(".tool").forEach((element) => {
    element.classList.remove("active");
  });
  button.classList.add("active");
};

toolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentColor = button.dataset.color;
    lineWidth = 4;
    setActiveButton(button);
  });
});

eraserButton.addEventListener("click", () => {
  currentColor = "#ffffff";
  lineWidth = 20;
  setActiveButton(eraserButton);
});

clearButton.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("pointerdown", startDrawing);
canvas.addEventListener("pointermove", draw);
canvas.addEventListener("pointerup", stopDrawing);
canvas.addEventListener("pointerleave", stopDrawing);

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
