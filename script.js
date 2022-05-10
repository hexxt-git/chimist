function rdm (max){
    return Math.floor(Math.random()*(max +1));
};
function random ( min, max, floor){
    if (floor) return Math.floor((Math.random()*(max - min + 1)) + min);
    return (Math.random()*(max - min)) + min;
};
function rdmAround (x, floor){
    if (floor) return Math.floor( Math.random()* x * 2 - x )
    return Math.random()* x * 2 - x
}
function write (input){
    console.log('%c' +  JSON.stringify(input), 'color: #8BF');
    return void 0;
};
function error (input){
    console.log('%c' + JSON.stringify(input), 'color: #F54;');
    return void 0;
};
function $ (id){
    return document.getElementById(id);
};
function randomColor (){
    return `hsl( ${rdm(360)}, ${random( 20, 70, true)}%, 50%)`
}

let container = $('container')
let canvas = $('canvas')
let c = canvas.getContext('2d')
let width = container.clientWidth
let height = container.clientHeight
let fps = 100

canvas.width = width
canvas.height = height - 9

c.fillStyle = randomColor()
c.strokeStyle = randomColor()
c.font = '25px monospace'

let mouse = {
    x: width/2,
    y: height/2,
    z: false
}
container.addEventListener( 'mousemove', ( event)=>{
    mouse.x = event.x
    mouse.y = event.y
})
canvas.addEventListener( 'mousedown', ()=>{
    mouse.z = true
})
canvas.addEventListener( 'mouseup', ()=>{
    mouse.z = false
})

class Object {
    
//for a quad    x, y,  'quad',  width, height (square or rectangle)
//for a circle  x, y, 'circle', radius, angle( in radians )

    constructor(x, y, type, a, b, srokeStyle, fillStyle) {
        
        this.x = x;
        this.y = y;

        this.vx = 0;
        this.vy = 0;

        this.type = type;

        switch (this.type) {
            case 'quad':{
                this.w = a;
                this.h = b;
                break
            }
            case 'circle':{
                this.r = a;
                this.a = b;
                break
            }
            case 'fillCircle':{
                this.r = a;
                this.a = b;
                break
            }
        }

        this.srokeStyle = srokeStyle;
        this.fillStyle = fillStyle;

        this.render = ()=>{

            c.strokeStyle = this.srokeStyle;
            c.fillStyle = this.fillStyle;

            switch (this.type) {
                case 'quad': {
                    c.fillRect(this.x, this.y, this.w, this.h);
                    break;
                }
                case 'circle': {
                    c.beginPath();
                    c.arc(this.x, this.y, this.r, 0, this.a, false);
                    c.stroke();
                    break;
                }
                case 'fillCircle': {
                    c.beginPath();
                    c.arc(this.x, this.y, this.r, 0, this.a, false);
                    c.fill();
                    c.stroke();
                    break;
                }

            }
        }

        this.update = ()=>{
            this.x += this.vx
            this.y += this.vy
        }
    }
}

let length = 5
length = random( 2, 8, true)
write(width)
write(length)
write(width/length/3)
let step = 40;
let x = width/2 - ( step * length/1.3)
let y = height/2
let verticalLine = Math.sqrt( Math.pow( step, 2) + Math.pow( step, 2) ) * 0.9

c.fillRect( x-2, y-2, 4, 4 );
    for ( let i = 0 ; i <= length ; i++ ){
    let h = 3;
    if ( i == 0 ){
        c.strokeText( 'C1H' + h, x + 2, y + 2)
    } 
    c.beginPath()
    c.moveTo( x, y)
    h--
    x += step
    y += i % 2 == 0 ? step : -step;
    c.fillRect( x-2, y-2, 4, 4 );
    c.lineTo( x, y)
    c.stroke()
    if (!rdm(2)){
        let branch = random( 1, 3, true)
        h--
        let X = x
        let Y = y
        let H = 2
        c.fillRect( X-2, Y-2, 4, 4 );
        for ( let a = 0 ; a < branch ; a++ ){
            c.beginPath()
            c.moveTo( X, Y)
            if ( a != 0 ){
                X += a % 2 == 0 ? step : -step
                Y += i % 2 == 0 ? step : -step
            }
            else{
                Y += i % 2 == 0 ? verticalLine : - verticalLine
            }
            c.lineTo( X, Y)
            c.stroke()
            c.fillRect( X-2, Y-2, 4, 4 );
            if ( a + 1 == branch ) H++
            c.strokeText( 'C1H' + H, X + 2, Y + 2)
        }
    }
    if ( i == length ) h++
    c.strokeText( 'C1H' + h, x + 2, y + 2)
}

/*
for ( let i = 0 ; i < 4 ; i++ ){
    let h = 3;
    c.beginPath()
    c.moveTo( x, y)
    c.fillRect( x-2, y-2, 4, 4)
    h--
    let x1 = x + step
    let y1 = i % 2 ? y + step : + y - step;
    c.lineTo( x1, y1)
    c.stroke()
    c.fillRect( x1-2, y1-2, 4, 4)
    c.strokeText( 'C1H' + h, x + 21, + 2 y1)
    x = x1
    y = y1
}
*/