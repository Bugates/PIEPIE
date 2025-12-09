const cube = document.getElementById("cube");
const sections = {
    home: document.getElementById("home"),
    electrical: document.getElementById("electrical"),
    mechanical: document.getElementById("mechanical")
};

const faces = {
    front: document.querySelector(".face.front"),
    right: document.querySelector(".face.right"),
    top: document.querySelector(".face.top")
};

let rotX = -30;
let rotY = 40;
let solvingStep = 0;
let solvingDone = false;

cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

/*
Solving steps: slow, cinematic rotations.
Not real cube moves, but feels like a solve sequence.
For each step we set new angles and optionally trigger a reveal.
*/

const solvingSteps = [
    { x: -30, y: 40, reveal: null },
    { x: -20, y: 70, reveal: null },
    { x: -15, y: 90, reveal: "home", face: "front" },
    { x: -10, y: 130, reveal: null },
    { x: -15, y: 180, reveal: "electrical", face: "right" },
    { x: -10, y: 210, reveal: null },
    { x: -15, y: 260, reveal: "mechanical", face: "top" },
    { x: -20, y: 300, reveal: null },
    { x: -25, y: 330, reveal: null },
    { x: -20, y: 360, reveal: null }
];

function applyStep(step) {
    rotX = step.x;
    rotY = step.y;
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    if (step.reveal) {
        revealSection(step.reveal, step.face);
    }
}

function revealSection(sectionKey, faceKey) {
    const section = sections[sectionKey];
    if (section && !section.classList.contains("visible")) {
        section.classList.add("visible");

        if (faceKey && faces[faceKey]) {
            const face = faces[faceKey];
            face.classList.add("flipping");
            setTimeout(() => {
                face.classList.remove("flipping");
            }, 650);
        }
    }
}

function startSolvingAnimation() {
    const interval = setInterval(() => {
        if (solvingStep >= solvingSteps.length) {
            clearInterval(interval);
            solvingDone = true;
            enableDragging();
            return;
        }
        const step = solvingSteps[solvingStep];
        applyStep(step);
        solvingStep += 1;
    }, 1200);
}

/* Dragging after solve */

let isDragging = false;
let startX = 0;
let startY = 0;

function enableDragging() {
    cube.classList.add("draggable");

    cube.addEventListener("mousedown", e => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        cube.classList.add("dragging");
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
        cube.classList.remove("dragging");
    });

    cube.addEventListener("touchstart", e => {
        const t = e.touches[0];
        isDragging = true;
        startX = t.clientX;
        startY = t.clientY;
        cube.classList.add("dragging");
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

    cube.addEventListener("touchend", () => {
        isDragging = false;
        cube.classList.remove("dragging");
    });
}

/* Start the cinematic solve once the page loads */

window.addEventListener("load", startSolvingAnimation);
