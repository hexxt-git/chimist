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
    return `hsl( ${rdm(360)}, ${random( 15, 60, true)}%, 50%)`
}

let container = $('container')
let canvas = $('canvas')
let c = canvas.getContext('2d')
let width = container.clientWidth
let height = container.clientHeight
let fps = 100


canvas.width = width
canvas.height = height - 9

$('button').addEventListener('click', ()=>{
    localStorage.setItem('dark', localStorage.getItem('dark')/1+1 )
    updateMode()
    location.reload(); 
})
function updateMode(){
    if(localStorage.getItem('dark')%2 == 0){
        $('button').style = `
        filter: invert(100%);
        -webkit-filter: invert(100%);`
        container.style ='background-color: #fff;'
        c.strokeStyle = '#111'
        c.fillStyle = '#111'
    } else {
        $('button').style = `
        filter: invert(0%);
        -webkit-filter: invert(0%);`
        container.style ='background-color: #151521;'
        c.fillStyle = randomColor()
        c.strokeStyle = randomColor()
    }
}
updateMode()
updateMode()




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

let length = 5
length = random( 2, 8, true)
let step = 60;
let x = width/2 - ( step * length/1.3)
let y = height/2
let verticalLine = Math.sqrt( Math.pow( step, 2) + Math.pow( step, 2) ) * 0.9
let special = !rdm(2)
let double = false
let triple = false
let global = {
    C: 0,
    H: 0,
    O: 0,
}
c.fillRect( x-2, y-2, 4, 4 );

for ( let i = 0 ; i <= length ; i++ ){ //alkane
    let h = 3;
    if ( i == 0 ){
        global.H += h
        global.C += 1
        c.strokeText( 'CH' + h, x + 2, y + 2)
    } 
    c.beginPath()
    c.moveTo( x, y)
    h--
    x += step
    y += i % 2 == 0 ? step : -step;
    c.fillRect( x-2, y-2, 4, 4 );
    c.lineTo( x, y)
    c.stroke()
    if ( double ){
        h--
        special++
        double = false
        c.beginPath()
        c.moveTo( x+5, y)
        if ( i % 2 == 0){
            c.lineTo( x-step+5, y-step)
        } else {
            c.lineTo( x-step+5, y+step)
        }
        c.stroke()
    }
    if ( triple ){ //
        h--
        h--
        special++
        triple = false

        if ( i % 2 == 0){
            c.beginPath()
            c.moveTo( x+5, y)
            c.lineTo( x-step+5, y-step)
            c.stroke()

            c.beginPath()
            c.moveTo( x-5, y)
            c.lineTo( x-step-5, y-step)
            c.stroke()

        } else {
            c.beginPath()
            c.moveTo( x+5, y)
            c.lineTo( x-step+5, y+step)
            c.stroke()

            c.beginPath()
            c.moveTo( x-5, y)
            c.lineTo( x-step-5, y+step)
            c.stroke()

        }
    }
    if (!rdm(3) & h >= 2 & special == 0){
        special++
        h--
        h--
        c.beginPath()
        c.moveTo( x+3, y)
        if ( i % 2 == 0){
            c.lineTo( x+3, y+verticalLine)
        } else {
            c.lineTo( x+3, y-verticalLine)
        }
        c.stroke()
        c.beginPath()
        c.moveTo( x-3, y)
        if ( i % 2 == 0){
            c.lineTo( x-3, y+verticalLine)
            c.fillRect( x-2, y-2+verticalLine, 4, 4)
            c.strokeText( 'O', x , y + verticalLine)
        } else {
            c.lineTo( x-3, y-verticalLine)
            c.fillRect( x-2, y-verticalLine-2, 4, 4)
            c.strokeText( 'O', x , y - verticalLine)
        }
        global.O++
        c.stroke()
    }
    if ( !rdm(4) & h >= 1 ){
        let branch = random( 1, 4, true)
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
            global.C++
            global.H += H
            c.strokeText( 'CH' + H, X + 2, Y + 2)
        }
    }
    if ( !rdm(4) & special == 0 & i != length ){
        double = true
        h--
    } else if ( rdm(4) & special == 0 & i != length & h >= 2){
        triple = true
        h--
        h--
    }
    if ( i == length ) h++
    global.C++
    global.H += h
    if ( h == 0 ){
        c.strokeText( 'C', x + 2, y + 2)
    } else if ( h == 1 ){
        c.strokeText( 'CH', x + 2, y + 2)
    } else {
        c.strokeText( 'CH'+h, x + 2, y + 2)
    }
}

global.O != 0 ? c.strokeText(`C${global.C}H${global.H}O${global.O}`, 15, height-25) : c.strokeText(`C${global.C}H${global.H}`, 15, height-25)