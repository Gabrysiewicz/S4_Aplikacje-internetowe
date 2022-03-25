window.addEventListener('load', () => {
    document.getElementById("slider").style.height = `${document.getElementById("current-slide").offsetHeight}px`;
})
const maxHeight = window.innerHeight;
document.getElementById("guitars").style.height = `${maxHeight}px`;