var canvas = document.getElementById('juego');
var ctx = canvas.getContext('2d');
var size = 20;
//cabeza
var ejes = { x:0,y:0 };
//comida
var ejes1 = null;
//Cuerpo
var cuerpo = [];

//Contadores
dx = 0;
dy = 0;

setInterval(main,200);

function main(){
    cambiar();
    dibujar();
}
function cambiar(){
    var prevX, prevY;
    prevX = ejes.x;
    prevY = ejes.y;
    //actualizar ejes de la cabeza
    ejes.x += dx;
    ejes.y += dy;

    //actualizar ejes de la comida
    if(ejes1 && ejes.x === ejes1.x && ejes.y === ejes1.y ){
        ejes1 = null;
        crecerCuerpo(prevX,prevY);
    }
    if(!ejes1){
        ejes1 = {x:valorX(),y:valorY()};
    }
}

function dibujar(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    
    //Dibujando la cabeza
    dibujarObj(ejes,size,'red');
    cuerpo.forEach(element =>
            dibujarObj(element,size,'red')
        );
    //Dibujando la comida
    dibujarObj(ejes1,size, 'blue');
}
function dibujarObj(ejes,size,color){
    ctx.fillStyle = color;
    ctx.fillRect(ejes.x,ejes.y, size,size);
}
function valorX(){
    vx = (Math.floor(Math.random()*20))*20;
    return vx;
}
function valorY(){
    vy = (Math.floor(Math.random()*30))*20;
    return vy;
}
function crecerCuerpo(prevX,prevY){
    cuerpo.push(
        {x:prevX,y:prevY}
    );
}

document.addEventListener('keydown',function(e){
    var tecla = e.key;
    //console.log(tecla);

    switch (tecla) {
        case 'ArrowUp':
            dx = 0;
            dy = -size;
            break;
            
        case 'ArrowDown':
            dx = 0;
            dy = size;
            break;
        case 'ArrowLeft':
            dx = -size;
            dy = 0;
            break;
        case 'ArrowRight':
            dx = size;
            dy = 0;
            break;
    }
});