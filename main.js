let cristales = 0;
let porClic = 1;

const upgrades = [
  {id:"upgrade1", nivel:1, max:10, base:25, incremento:1, tipo:"clic", descripcion:"+Cristales por clic"}, 
  {id:"upgrade2", nivel:1, max:10, base:50, incremento:1, tipo:"auto", descripcion:"Generador automático"}, 
  {id:"upgrade3", nivel:1, max:10, base:30, incremento:0.5, tipo:"bonus", descripcion:"Bonus adicional por clic"} 
];

let autoCristales = 0;
let bonusPorClic = 0;

function actualizarPantalla() {
  document.getElementById('contador').innerText = `Cristales: ${Math.floor(cristales)}`;
}

function crearEmoji(x, y) {
  const span = document.createElement('span');
  span.className = 'emoji';
  span.innerText = '💎';
  span.style.left = x + 'px';
  span.style.top = y + 'px';
  document.body.appendChild(span);
  setTimeout(() => span.remove(), 800);
}

function actualizarFondo() {
  const nivelesTotales = upgrades.reduce((acc, u)=> acc + u.nivel, 0);
  if(nivelesTotales <= 5) document.getElementById('fondo').style.background = "#0b0f2d";
  else if(nivelesTotales <= 8) document.getElementById('fondo').style.background = "#1b1f45";
  else if(nivelesTotales <= 11) document.getElementById('fondo').style.background = "#3a3f7f";
  else if(nivelesTotales <= 14) document.getElementById('fondo').style.background = "#5a5fff";
  else document.getElementById('fondo').style.background = "#000000"; 
}

// Inicializa los botones con descripciones
upgrades.forEach(upg => {
  const btn = document.getElementById(upg.id);
  btn.innerHTML = `<span class="desc">${upg.descripcion}</span>
                   Lvl ${upg.nivel}
                   <span>${upg.base} cristales</span>`;

  btn.addEventListener('click', ()=>{
    if(cristales >= upg.base && upg.nivel < upg.max){
      cristales -= upg.base;
      upg.nivel++;
      if(upg.tipo === "clic") porClic += upg.incremento;
      if(upg.tipo === "auto") autoCristales += upg.incremento;
      if(upg.tipo === "bonus") bonusPorClic += upg.incremento;
      upg.base = Math.floor(upg.base*2); 
      btn.innerHTML = `<span class="desc">${upg.descripcion}</span>
                       Lvl ${upg.nivel}
                       <span>${upg.base} cristales</span>`;
      actualizarFondo();
      actualizarPantalla();
    }
  });
});

// Multi-touch y click normal
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