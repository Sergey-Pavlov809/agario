import { futimesSync } from 'fs';
import './css/style.css';

const c = document.getElementById('canvas') as HTMLCanvasElement;
console.log(c);
c.width = window.innerWidth;
c.height = window.innerHeight;
const context = c.getContext('2d');

// context.strokeStyle = '#ded0df';
// context.strokeRect(12, 12, 200, 200);
// context.fillStyle = '#ded0df';
// context.fillRect(300, 12, 200, 200);

context.beginPath();
// context.moveTo(120, 120);
// context.lineTo(220, 220);
// context.lineTo(220, 120);
// context.lineTo(120, 120);

// context.fillStyle = '#ded0df';
// context.fill();
// context.moveTo(700, 0);
// context.lineTo(700, 700);
// context.stroke();

// context.beginPath();
// context.moveTo(10, 340);
// context.lineTo(1500, 340);
// context.stroke();


context.moveTo(c.width / 2, 0);
context.lineTo(c.width / 2, c.height);
context.stroke();

context.beginPath();
context.moveTo(0, c.height / 2);
context.lineTo(c.width, c.height / 2);
context.stroke();

function axisX(x: number, y1: number, y2: number, operator: boolean) {
    for (let i = c.width / 2 / 20; i > 0; i--) {
        context.beginPath();
        context.moveTo(x, y1);
        context.lineTo(x, y2);
        context.stroke();
        if (operator) {
            x += 20;
        }
        else {
            x -= 20;
        }
    }
}

function axisY(y: number, x1: number, x2: number, operator: boolean) {
    for (let i = c.height / 2 / 20; i > 0; i--) {
        context.beginPath();
        context.moveTo(x1, y);
        context.lineTo(x2, y);
        context.stroke();
        if (operator) {
            y += 20;
        }
        else {
            y -= 20;
        }
    }
}

// ось X положительное направление
axisX(c.width / 2 + 20, c.height / 2 - 3, c.height / 2 + 3, true);
// ось X отрицательное направление
axisX(c.width / 2 - 20, c.height / 2 - 3, c.height / 2 + 3, false);
// ось Y положительное направление
axisY(c.height / 2 - 20, c.width / 2 - 5, c.width / 2 + 5, false);
// ось Y отрицательное направление
axisY(c.height / 2 + 20, c.width / 2 - 5, c.width / 2 + 5, true);


// // context.beginPath();
// // context.arc(c.width / 2, c.height / 2, 150, 0, Math.PI * 2);
// // context.stroke();

function f(x: number) {
    return Math.pow(x, 2);
}

function drawGraph(k: number) {
    let x = (k - c.width / 2) / 20;
    let y = c.height / 2 - f(x);
    context.lineTo(k, y);
    context.stroke();
    context.strokeStyle = 'red';
}

// по точкам
// for (let k = c.width / 2; k > 0; k = k - 10) {
//     let x = (k - c.width / 2) / 20;
//     let y = c.height / 2 - f(x);
//     context.beginPath();
//     context.arc(k, y, 1, 0, Math.PI * 2);
//     context.stroke();
// }

// for (let k = c.width / 2; k < c.width; k = k + 10) {
//     let x = (k - c.width / 2) / 20;
//     let y = c.height / 2 - f(x);
//     context.beginPath();
//     context.arc(k, y, 1, 0, Math.PI * 2);
//     context.stroke();
// }

context.beginPath();
context.moveTo(c.width / 2, c.height / 2);
for (let k = c.width / 2; k > 0; k = k - 10) {
    drawGraph(k);
}

context.beginPath();
context.moveTo(c.width / 2, c.height / 2);
for (let k = c.width / 2; k < c.width; k = k + 10) {
    drawGraph(k);
}