const cube = document.getElementById("cube");

let isDragging = false;
let startX, startY;
let currentRotX = -20;
let currentRotY = 0;

cube.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;

// Mouse down
cube.addEventListener("mousedown", e => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    cube.style.cursor = "grabbing";
});

// Mouse move
document.addEventListener("mousemove", e => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    currentRotY += dx * 0.4;
    currentRotX -= dy * 0.4;

    cube.style.transform =
        `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;

    startX = e.clientX;
    startY = e.clientY;
});

// Mouse up
document.addEventListener("mouseup", () => {
    isDragging = false;
    cube.style.cursor = "grab";
});

// Touch events
cube.addEventListener("touchstart", e => {
    isDragging = true;
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
});

cube.addEventListener("touchmove", e => {
    if (!isDragging) return;
    const touch = e.touches[0];

    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;

    currentRotY += dx * 0.4;
    currentRotX -= dy * 0.4;

    cube.style.transform =
        `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;

    startX = touch.clientX;
    startY = touch.clientY;
});

cube.addEventListener("touchend", () => {
    isDragging = false;
});

// Click → navigate
document.querySelectorAll(".face").forEach(face => {
    face.addEventListener("click", () => {
        if (!isDragging) {
            window.location.href = face.dataset.link;
        }
    });
});
