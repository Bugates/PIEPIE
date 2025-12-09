document.querySelectorAll('.face').forEach(face => {
    face.addEventListener('click', () => {
        const link = face.dataset.link;
        window.location.href = link;
    });
});

