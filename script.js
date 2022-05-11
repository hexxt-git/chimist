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
let res = 4

canvas.width = width
canvas.height = height - 9

c.fillStyle = randomColor()
c.strokeStyle = randomColor()
c.font = '25px monospace'

class Part {
    constructor ( x, y, a, child){
        this.x = x
        this.y = y
        this.a = a
        this.child = child
        this.lines = []
        for ( let i in this.child ){
            this.lines.push( new Line( this.x, this.y, this.child[i].x, this.child[i].y))
        }
        this.addChild = function (child){
            this.child.push(child)
            this.lines.push( new Line( this.x, this.y, child.x, child.y))
        }
        this.render = function (){
            let text = []
            for ( let i in this.a ){
                text.push(i)
                text.push(this.a[i])
            }
            text = text.join('')
            c.fillRect( this.x - res/2 , this.y - res/2 , res, res)
            c.strokeText( text, this.x+2, this.y-4)
            if ( this.child != undefined ){
                for ( let i = 0 ; i < this.child.length ; i++ ){
                    this.child[i].render()
                }
            }
            for ( let i = 0 ; i < this.lines.length ; i++ ){
                this.lines[i].render()
            }
        }
    }
}
class Line {
    constructor ( startX, startY, endX, endY, count){
        this.startX = startX
        this.startY = startY
        this.endX = endX
        this.endY = endY
        this.count = count
        this.render = ()=>{
            c.stroke()
            c.beginPath()
            c.moveTo( startX, startY)
            c.lineTo( endX, endY)
            c.stroke()
        }
    }
}

function generaterdm(){
    let nextGen
    if ( rdm(3) != 0 ) {
        nextGen = new Array(1).fill(null)
    } else {
        nextGen = new Array(rdm(1)).fill(null)
    }
    for ( let i in nextGen ){
        nextGen[i] = new Part( rdm(width), rdm(height), {A:3}, generaterdm())
    }
    return nextGen
}

let molecule = new Part( 100, 250, {C:5,H:3}, generaterdm())
write(molecule)
molecule.render()




/*
let length = 5
length = random( 2, 10, true)
let step = 50
let verticalLine = Math.sqrt( Math.pow( step, 2) + Math.pow( step, 2) ) * 0.9
let x = width/2 - ( step * length / 2)
let y = height/2

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
    let branch = random( 0, 3, true)
    if (!rdm(4)){
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
            write(branch)
            c.strokeText( 'C1H' + H, X + 2, Y + 2)
        }
    }
    if ( i == length ) h++
    c.strokeText( 'C1H' + h, x + 2, y + 2)
}
*/
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
