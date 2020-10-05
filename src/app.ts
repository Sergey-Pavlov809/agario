import { Circle } from './circle';
const p5 = require('../node_modules/p5/lib/p5');
const http = require('http');







let x, y;

let reqObj: any = [];
let player: any;
const food: any = [];
let zoom: number = 1;




const sketch = (s: typeof p5) => {
    s.setup = () => {
        s.createCanvas(window.innerWidth, window.innerHeight);
        s.background(220);
        x = s.mouseX;
        y = s.mouseY;

        const options = {
            hostname: '127.0.0.1',
            port: 3000,
            path: '/?x=' + x + '&y=' + y,
            method: 'GET'
        };
        
        let req = http.request(options, function (res: any) {
            res.on('data', function (body: any) {
                var string = new TextDecoder("utf-8").decode(body);
                reqObj = JSON.parse(string);
                
                //do eats
                for (let i = reqObj.f.length - 1; i >= 0; i--) {
                    let obj = new Circle(reqObj.f[i].x, reqObj.f[i].y, reqObj.f[i].r, s);
                    food.push(obj);
                }
            });
            res.on('end', function (chunck: any) {
                // do player
                player = new Circle(reqObj.p.x, reqObj.p.y, reqObj.p.r, s);
                console.log('Response ended');
            });
        });
        req.end();
    }

    s.draw = () => {
        
        s.background(220);
        s.translate(s.width / 2, s.height / 2);

         const newZoom: number = 36 / player.r;
         zoom = s.lerp(zoom, newZoom, 0.0001);
         s.scale(zoom);
         s.translate(-player.pos.x, -player.pos.y);

        for (let i = -s.width; i < s.width; i = i + 50) {
            s.line(i, -s.height, i, s.height);
            s.stroke(126);
        }
        for (let i = -s.height; i < s.height; i = i + 50) {
            s.line(-s.width, i, s.width, i);
            s.stroke(126);
        }

        //console.log(player);










        player.show();
        player.update();


        for(let i = food.length - 1; i >= 0; i--) {
            food[i].show();
            if(player.eats(food[i])) {
                food.splice(i, 1);
            }
        }
    }

}





const sketchInst = new p5(sketch);

