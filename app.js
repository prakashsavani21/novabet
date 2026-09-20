const games = [
["Baccarat","table","🃏","Cards"],["Rock Paper Scissors","skill","✋","Skill"],["Diamonds","instant","💎","Instant"],
["Packs","instant","🎁","Instant"],["Darts","skill","🎯","Skill"],["Drill","instant","⛏️","Instant"],
["Prime Dice","instant","🎲","Instant"],["Cases","instant","📦","Instant"],["Scarab","instant","𓂀","Instant"],
["Dragon Tower","instant","🐉","Instant"],["Moles","skill","🐹","Skill"],["Slide","skill","🧊","Skill"],
["Flip","instant","🪙","Instant"],["Pump","instant","🎈","Instant"],["Wheel","instant","🎡","Instant"],
["Snakes","skill","🐍","Skill"],["Roulette","table","🎰","Table"],["Tome of Life","instant","📖","Instant"],
["Mines","instant","💣","Instant"],["Dice","instant","🎲","Instant"],["Blackjack","table","♠️","Table"],
["Plinko","instant","🔵","Instant"],["Limbo","instant","📈","Instant"],["Keno","instant","🔢","Instant"],
["Crash","instant","🚀","Instant"],["Chicken","skill","🐔","Skill"],["Hilo","skill","🃏","Skill"]
];

const palettes = [
["#0b72e7","#ff4f6d"],["#7b35e8","#f54d89"],["#12a4ed","#8a38ef"],["#ffbd16","#ef4c67"],
["#10a5e8","#39d34a"],["#ff7b18","#7b3fe4"]
];

const root = document.querySelector("#games");
const search = document.querySelector("#search");
let filter = "all";

function render(){
  const q = search.value.trim().toLowerCase();
  root.innerHTML = "";
  games.forEach((g,i)=>{
    const [name,type,icon,label] = g;
    if(filter !== "all" && type !== filter) return;
    if(q && !name.toLowerCase().includes(q)) return;
    const p = palettes[i % palettes.length];
    const count = [74,56,70,41,18,49,83,32,41,332,320,275,204,145,143,144,112,132,2282,1982,1167,1077,1695,1359,950,294,502][i];
    const el = document.createElement("article");
    el.className = "game";
    el.innerHTML = `<div class="game-card" style="--a:${p[0]};--b:${p[1]}">
      <div class="art">${icon}</div>
      <div class="tag">${label.toUpperCase()}</div>
      <div class="game-title">${name}</div>
    </div>
    <div class="playing"><span class="dot"></span>${count.toLocaleString()} playing</div>`;
    el.querySelector(".game-card").onclick = ()=>openModal(name);
    root.appendChild(el);
  });
}

document.querySelectorAll(".tab").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");
    filter=btn.dataset.filter;
    render();
  };
});
search.oninput=render;

const modal=document.querySelector("#modal");
function openModal(name){
  document.querySelector("#modalTitle").textContent=name;
  document.querySelector("#modalText").textContent="This original game will be connected to the server-authoritative real-money game engine in the next development phase.";
  modal.classList.remove("hidden");
}
function openAccount(kind){
  document.querySelector("#modalTitle").textContent=kind==="register"?"Create your account":"Sign in";
  document.querySelector("#modalText").textContent="Authentication will be connected to the production backend in the next phase.";
  modal.classList.remove("hidden");
}
document.querySelector("#close").onclick=()=>modal.classList.add("hidden");
modal.onclick=e=>{if(e.target===modal)modal.classList.add("hidden")};
document.querySelector("#signin").onclick=()=>openAccount("signin");
document.querySelector("#register").onclick=()=>openAccount("register");
document.querySelector("#heroRegister").onclick=()=>openAccount("register");
document.querySelector("#browse").onclick=()=>document.querySelector("#games").scrollIntoView({behavior:"smooth"});
render();
