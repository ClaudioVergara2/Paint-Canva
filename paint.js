const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let painting = false;
let brushColor = '#000000';
let brushSize = 5;

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
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.getElementById('clear').addEventListener('click', clearCanvas);

document.getElementById('brushSize').addEventListener('input', (e) => {
    brushSize = e.target.value;
    document.getElementById('brushSizeLabel').innerText = `Tamaño del Pincel: ${brushSize}`;
});

const colorButtons = document.querySelectorAll('.btn-color');
colorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        brushColor = e.target.getAttribute('data-color');
    });
});

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);



