// import p5 from 'p5';
const p5 = require('../node_modules/p5/lib/p5');
export class Circle {
    pos: number;
    r: number;
    vel: number;
    show: Function;
    update: Function;
    eats: Function;

    constructor(public x: number, public y: number, r: number, public s: any) {
        this.pos = s.createVector(x, y);
        this.r = r;
        this.vel = s.createVector(0, 0);

        this.show = function () {
            s.fill(255);
            s.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
        };

        this.update = function () {
            const newvel = s.createVector(s.mouseX - s.width / 2, s.mouseY - s.height / 2);
            newvel.setMag(3);

            this.vel.lerp(newvel, 0.1);
            this.pos.x = s.constrain(this.pos.x, -s.width + this.r, s.width - this.r);
            this.pos.y = s.constrain(this.pos.y, -s.height + this.r, s.height - this.r);
            this.pos.add(this.vel);
        };

        this.eats = function (other: any) {
            var d = p5.Vector.dist(this.pos, other.pos);
            if (d < this.r + other.r) {
                var sum = s.PI * this.r * this.r + s.PI * other.r * other.r;
                this.r = s.sqrt(sum / s.PI);
                return true;
            }
            else {
                return false;
            }
        };
    }

}