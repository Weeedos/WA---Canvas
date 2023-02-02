const nav = document.querySelector(".nav");
const canvas = document.querySelector(".canvas");
const clearButtonLocalStorage = document.querySelector(".clearLocalStorage");
const save = document.querySelector(".save");
const cislo = document.getElementById("cislo");
const load = document.querySelector(".load");
let pole = [];
const context = canvas.getContext('2d');
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;
let isPainting = false;
let size = 10;
let startX;
let startY;

if (localStorage.getItem("drawings") !== null) {
    let tmp = JSON.parse(localStorage.getItem("drawings"));
    for (let i = 0; i < tmp.length; i++) {
        pole.push(tmp[i]);
    }
}

var height = document.querySelector(".nav").getBoundingClientRect().height;

nav.addEventListener("click", e => {
    if (e.target.id === "clear") {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
});

nav.addEventListener("change", e => {
    if (e.target.id === "color") {
        context.strokeStyle = e.target.value;
    }

    if (e.target.id === "size") {
        size = e.target.value;
    }

});

const draw = (e) => {
    if (!isPainting) {
        return;
    }

    context.lineWidth = size;
    context.lineCap = 'round';

    context.lineTo(e.clientX - canvasOffsetX, e.clientY - height);
    context.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    context.stroke();
    context.beginPath();
});

canvas.addEventListener('mousemove', draw);

save.addEventListener("click", () => {
    pole.push(canvas.toDataURL("image/png"));
    localStorage.setItem("drawings", JSON.stringify(pole));
});

load.addEventListener("click", () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let img = new Image();
    let c = cislo.value;
    img.src = pole[c];
    context.drawImage(img, 0, 0);
});

clearButtonLocalStorage.addEventListener("click", () => {
    localStorage.clear();
    pole.length = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
});