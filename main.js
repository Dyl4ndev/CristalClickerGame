let cristales = 0;
let porClic = 1;
let autoCristales = 0;
let bonusPorClic = 0;

// Upgrades con 50 niveles
const upgrades = [
  {id:"upgrade1", nivel:1, max:50, precioBase:25, incremento:1, tipo:"clic"},
  {id:"upgrade2", nivel:1, max:50, precioBase:50, incremento:1.5, tipo:"auto"},
  {id:"upgrade3", nivel:1, max:50, precioBase:30, incremento:2, tipo:"bonus"}
];

function actualizarPantalla() {
  document.getElementById('contador').innerText = `Cristales: ${Math.floor(cristales)}`;
}

function crearEmoji(x, y) {
  const span = document.createElement('span');
  span.className = 'emoji';
  span.innerText = '';
  span.style.left = x + 'px';
  span.style.top = y + 'px';
  document.body.appendChild(span);
  setTimeout(() => span.remove(), 800);
}

function actualizarFondo() {
  const nivelesTotales = upgrades.reduce((acc, u)=> acc + u.nivel, 0);
  if(nivelesTotales <= 50) document.getElementById('fondo').style.background = "#0b0f2d";
  else if(nivelesTotales <= 100) document.getElementById('fondo').style.background = "#1b1f45";
  else if(nivelesTotales <= 150) document.getElementById('fondo').style.background = "#3a3f7f";
  else if(nivelesTotales <= 200) document.getElementById('fondo').style.background = "#5a5fff";
  else document.getElementById('fondo').style.background = "#000000";
}

// Inicializar botones de upgrades
upgrades.forEach(upg => {
  const btn = document.getElementById(upg.id);
  btn.innerHTML = `Lvl ${upg.nivel}<br><span>${upg.precioBase} cristales</span>`;
  btn.addEventListener('click', ()=> comprarUpgrade(upg));
});

function comprarUpgrade(upg) {
  if(cristales >= upg.precioBase && upg.nivel < upg.max){
    cristales -= upg.precioBase;
    upg.nivel++;
    if(upg.tipo === "clic") porClic += upg.incremento;
    if(upg.tipo === "auto") autoCristales += upg.incremento;
    if(upg.tipo === "bonus") bonusPorClic += upg.incremento;
    
    upg.precioBase = Math.floor(upg.precioBase * 1.7);
    const btn = document.getElementById(upg.id);
    btn.innerHTML = `Lvl ${upg.nivel}<br><span>${upg.precioBase} cristales</span>`;
    
    actualizarFondo();
    actualizarPantalla();
  }
}

// Multi-touch
document.addEventListener('touchstart', (e) => {
  e.preventDefault();
  for(let i=0; i<e.touches.length; i++){
    const touch = e.touches[i];
    cristales += porClic + bonusPorClic;
    crearEmoji(touch.clientX, touch.clientY);
  }
  actualizarPantalla();
});

document.addEventListener('click', (e) => {
  cristales += porClic + bonusPorClic;
  crearEmoji(e.clientX, e.clientY);
  actualizarPantalla();
});

// Auto-clicker
setInterval(()=> {
  cristales += autoCristales;
  actualizarPantalla();
},1000);

actualizarPantalla();