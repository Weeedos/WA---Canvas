const nav = document.querySelector(".nav");
const canvas = document.querySelector(".canvas");
let array = [];
const context = canvas.getContext('2d');
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;
let isPainting = false;
let size = 5;
let startX;
let startY;

if (localStorage.getItem("drawings") !== null) {
    let tmp = JSON.parse(localStorage.getItem("drawings"));
    for (let i = 0; i < tmp.length; i++) {
        array.push(tmp[i]);
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

const save = document.querySelector(".save");
save.addEventListener("click", () => {
    array.push(canvas.toDataURL("image/png"));
    localStorage.setItem("drawings", JSON.stringify(array));
});

const cislo = document.getElementById("cislo");
const load = document.querySelector(".load");
load.addEventListener("click", () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let img = new Image();
    let c = cislo.value;
    img.src = array[c];
    context.drawImage(img, 0, 0);
});

const clearButtonLocalStorage = document.querySelector(".clearLocalStorage");
clearButtonLocalStorage.addEventListener("click", () => {
    localStorage.clear();
    array.length = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
});