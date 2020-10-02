import p5 from 'p5';
let step = 20;
const sketch = (s) => {
    s.setup = () => {
        let p = s.createCanvas(window.innerWidth, window.innerHeight);
        s.background(220);
        p.mouseWheel(s.changeSize);
        s.noLoop();
    }
    s.draw = () => {
        s.background(220);
        s.translate(s.width / 2, s.height / 2);


        s.line(-s.width, 0, s.width, 0);
        s.stroke(126);

         s.line(0, -s.height, 0, s.height);
        s.stroke(126);

        function axis(x, y, a) {
            if(a === 'x') {
                s.line(x, y, x,  -y);
            }
            else if (a === 'y' ){
                s.line(x, y, -x,  y);
            }
            s.stroke(126);
        }

        let x = -step;
        let y = -3;
        for(let i = 0; i >= -s.width / step; i--) {
            axis(x, y, 'x');
            x -= step;
        }

        x = step;
        y = 3;
        for(let i = 0; i <= s.width / step; i++) {
            axis(x, y, 'x');
            x += step;
        }

        x = 3;
        y = step;
        for(let i = 0; i <= s.height / step; i++) {
            axis(x, y, 'y');
            y += step;
        }

        x = -3;
        y = -step;
        for(let i = 0; i >= -s.height / step; i--) {
            axis(x, y, 'y');
            y -= step;
        }

        function f(x) {
            return Math.pow(x, 2);
        }

        function drawGraph(k) {
            let x_1 = k / (step / h);
            let y_1 = - f(x_1);
            // console.log(k, y_1);
            
            s.line(x_0, y_0, k, y_1);
            s.stroke('green');
            x_0 = k;
            y_0 = y_1;
        }

        let x_0 = 0, y_0 = 0, h = 5;
        for (let i = 0; i >= -s.width; i = i - h) {
            drawGraph(i);
        }

        x_0 = 0, y_0 = 0;
        for (let i = 0; i <= s.width; i = i + h) {
            drawGraph(i);
        }

        
    };

    s.changeSize = event => {
        if (event.deltaY > 0) {
          step += 10;
        } else {
          step -= 10;
        }
      }
}

const sketchInst = new p5(sketch);


