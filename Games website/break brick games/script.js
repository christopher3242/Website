const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let gamePaused = false;
let score = 0; // Initialize score

let brickRowCount = 5;
let brickColumnCount = 6;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 40;
const brickOffsetLeft = 40;
let bricks = [];

// Initialize the bricks
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Event listeners for keyboard and touch
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
canvas.addEventListener("touchstart", touchStartHandler);
canvas.addEventListener("touchmove", touchMoveHandler);
canvas.addEventListener("touchend", touchEndHandler); // To handle touch end

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    }
    if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function touchStartHandler(e) {
    const touchX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
    if (touchX > canvas.width / 2) {
        rightPressed = true;
    } else {
        leftPressed = true;
    }
}

function touchMoveHandler(e) {
    const touchX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
    rightPressed = touchX > canvas.width / 2;
    leftPressed = touchX <= canvas.width / 2; // Updated to simplify logic
}

function touchEndHandler(e) {
    rightPressed = false;
    leftPressed = false; // Stop paddle movement when touch ends
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++; // Increment score
                    document.getElementById("scoreDisplay").innerText = `Score: ${score}`; // Update score display

                    // Play brick break sound
                    document.getElementById("breakSound").play();
                }
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        // Play bounce sound
        document.getElementById("bounceSound").play();
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            // Play bounce sound when hitting the paddle
            document.getElementById("bounceSound").play();
        } else {
            // Game over logic
            gamePaused = true;
            document.getElementById("gameOverSound").play();
            document.getElementById("gameOverMessage").style.display = "block";
            return; // Stop drawing further
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;

    // Only request a new animation frame if the game is not paused
    if (!gamePaused) {
        requestAnimationFrame(draw);
    }
}

// Event listeners for buttons
document.getElementById("restartButton").addEventListener("click", function() {
    location.reload(); // Restart the game
});

// Exit button redirects to a specified link
document.getElementById("exitButton").addEventListener("click", function() {
    window.location.href = "../games.html";
});

// Start the game
draw();