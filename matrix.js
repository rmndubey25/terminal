// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix characters
const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const matrixArray = matrix.split("");

const fontSize = 10;
const columns = canvas.width / fontSize;

// Array to store drops
const drops = [];

// Initialize drops
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// Matrix rain animation
function drawMatrix() {
    // Black background with slight opacity for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Green text
    ctx.fillStyle = '#00ff00';
    ctx.font = fontSize + 'px Fira Code';

    // Draw characters
    for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Start the animation
setInterval(drawMatrix, 35);

// Recalculate columns when window is resized
window.addEventListener('resize', function() {
    resizeCanvas();
    const newColumns = canvas.width / fontSize;
    
    // Adjust drops array
    if (newColumns > columns) {
        for (let i = columns; i < newColumns; i++) {
            drops[i] = 1;
        }
    } else {
        drops.length = newColumns;
    }
});