const cube = document.getElementById("cube");

let isDragging = false;
let startX, startY;
let rotX = -20;
let rotY = 0;

cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

cube.addEventListener("mousedown", e => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    cube.style.cursor = "grabbing";
});

document.addEventListener("mousemove", e => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    rotY += dx * 0.4;
    rotX -= dy * 0.4;
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    startX = e.clientX;
    startY = e.clientY;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    cube.style.cursor = "grab";
});

cube.addEventListener("touchstart", e => {
    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    isDragging = true;
});

cube.addEventListener("touchmove", e => {
    if (!isDragging) return;
    const t = e.touches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    rotY += dx * 0.4;
    rotX -= dy * 0.4;
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    startX = t.clientX;
    startY = t.clientY;
});

cube.addEventListener("touchend", () => isDragging = false);

/* CLICK → NAVIGATE */
document.querySelectorAll(".face").forEach(face => {
    face.addEventListener("click", () => {
        if (!isDragging) window.location.href = face.dataset.link;
    });
});
