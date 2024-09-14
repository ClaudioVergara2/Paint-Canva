const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let painting = false;
let brushColor = '#000000';
let brushSize = 5;

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    const pos = getMousePos(e);

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.getElementById('clear').addEventListener('click', clearCanvas);
document.getElementById('colorPicker').addEventListener('input', (e) => {
    brushColor = e.target.value;
});
document.getElementById('brushSize').addEventListener('input', (e) => {
    brushSize = e.target.value;
    document.getElementById('brushSizeLabel').textContent = `Tamaño del Pincel: ${brushSize}`;
});

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);


