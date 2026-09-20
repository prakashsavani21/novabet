const games=[
["Baccarat","table","🃏"],["Rock Paper Scissors","skill","✋"],["Diamonds","instant","💎"],["Packs","instant","🎁"],
["Darts","skill","🎯"],["Drill","instant","⛏️"],["Prime Dice","instant","🎲"],["Cases","instant","📦"],["Scarab","instant","𓂀"],
["Dragon Tower","instant","🐉"],["Moles","skill","🐹"],["Slide","skill","🧊"],["Flip","instant","🪙"],["Pump","instant","🎈"],
["Wheel","instant","🎡"],["Snakes","skill","🐍"],["Roulette","table","🎰"],["Tome of Life","instant","📖"],["Mines","instant","💣"],
["Dice","instant","🎲"],["Blackjack","table","♠️"],["Plinko","instant","🔵"],["Limbo","instant","📈"],["Keno","instant","🔢"],
["Crash","instant","🚀"],["Chicken","skill","🐔"],["Hilo","skill","🃏"]];
const counts=[74,56,70,41,18,49,83,32,41,332,320,275,204,145,143,144,112,132,2282,1982,1167,1077,1695,1359,950,294,502];
const palettes=[["#126fe9","#ef3f83"],["#7138e8","#e83b91"],["#1779ea","#6840e8"],["#ffb819","#ef4e67"],["#00aee9","#42d53e"],["#ff7d18","#703ee7"]];
let filter="all";
const gamesEl=document.querySelector("#games"),search=document.querySelector("#search");
function render(){const q=search.value.toLowerCase();gamesEl.innerHTML="";games.forEach((g,i)=>{if(filter!="all"&&g[1]!=filter)return;if(q&&!g[0].toLowerCase().includes(q))return;let p=palettes[i%palettes.length],e=document.createElement("article");e.innerHTML=`<div class="game-card" style="--a:${p[0]};--b:${p[1]}"><div class="game-art">${g[2]}</div><div class="tag">${g[1].toUpperCase()}</div><div class="game-name">${g[0]}</div></div><div class="playing"><span class="dot"></span>${counts[i].toLocaleString()} playing</div>`;e.querySelector(".game-card").onclick=()=>openModal(g[0]);gamesEl.appendChild(e)})}
document.querySelectorAll(".quick-card").forEach(b=>b.onclick=()=>{document.querySelectorAll(".quick-card").forEach(x=>x.classList.remove("active"));b.classList.add("active");filter=b.dataset.filter;render()});
search.oninput=render;
const modal=document.querySelector("#modal");
function openModal(title,text="The selected original game will be connected to the secure server-side game engine in the next phase."){document.querySelector("#modalTitle").textContent=title;document.querySelector("#modalText").textContent=text;modal.classList.remove("hidden")}
document.querySelector("#close").onclick=()=>modal.classList.add("hidden");
modal.onclick=e=>{if(e.target===modal)modal.classList.add("hidden")};
["loginBtn","registerBtn","heroRegister"].forEach(id=>document.querySelector("#"+id).onclick=()=>openModal(id==="loginBtn"?"Sign In":"Create Account","Account authentication will be connected to the production backend in the next phase."));
document.querySelector("#gamesBtn").onclick=()=>document.querySelector("#games").scrollIntoView();
render();