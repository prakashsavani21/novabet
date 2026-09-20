const GAMES = [["Baccarat", "table"], ["Rock Paper Scissors", "rps"], ["Diamonds", "slots"], ["Packs", "cases"], ["Darts", "darts"], ["Drill", "mines"], ["Prime Dice", "dice"], ["Cases", "cases"], ["Scarab", "slots"], ["Dragon Tower", "tower"], ["Moles", "moles"], ["Slide", "slide"], ["Flip", "flip"], ["Pump", "pump"], ["Wheel", "wheel"], ["Snakes", "snakes"], ["Roulette", "roulette"], ["Tome of Life", "slots"], ["Mines", "mines"], ["Dice", "dice"], ["Blackjack", "blackjack"], ["Plinko", "plinko"], ["Limbo", "limbo"], ["Keno", "keno"], ["Crash", "crash"], ["Chicken", "chicken"], ["Hilo", "hilo"]];

let balance=10000, filter='all';
const icons=['♠','✊','◆','▣','🎯','⛏','⚄','📦','🪲','🐉','🕳','↗','🪙','⛽','◉','🐍','🎡','📖','💣','🎲','🃏','🔺','↕','🔢','🚀','🐔','↕'];
const grid=document.querySelector('#grid'),search=document.querySelector('#search'),modal=document.querySelector('#modal'),modalContent=document.querySelector('#modalContent');
function render(){let q=(search.value||'').toLowerCase();grid.innerHTML=GAMES.map((g,i)=>({g,i})).filter(x=>(filter==='all'||x.g[1]===filter)&&x.g[0].toLowerCase().includes(q)).map(x=>`<article class="game" onclick="openGame(${x.i})"><div class="game-icon">${icons[x.i]}</div><h3>${x.g[0]}</h3><small>Original demo</small></article>`).join('')}
function updateBalance(){document.querySelector('#balanceHero').textContent=balance.toLocaleString()}
function spend(n){n=Math.max(0,Number(n)||0);if(n>balance){alert('Not enough virtual credits.');return false}balance-=n;updateBalance();return true}
function win(n){balance+=Number(n)||0;updateBalance()}
function closeModal(){modal.classList.add('hidden')}
document.querySelector('#close').onclick=closeModal;modal.onclick=e=>{if(e.target===modal)closeModal()};
document.querySelector('#demoBonus').onclick=()=>{balance+=1000;updateBalance();alert('+1,000 virtual demo credits')};
document.querySelector('#signin').onclick=()=>showAccount('Sign In');document.querySelector('#register').onclick=()=>showAccount('Create Account');
search.oninput=render;document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;render()});
function showAccount(title){modalContent.innerHTML=`<div class="game-panel"><h2>${title}</h2><p class="muted">Demo UI only — no real account or payment is connected.</p><input class="input" style="width:100%;margin:7px 0" placeholder="Email"><input class="input" style="width:100%;margin:7px 0" placeholder="Password" type="password"><button class="primary" style="width:100%;margin-top:8px" onclick="closeModal()">Continue Demo</button></div>`;modal.classList.remove('hidden')}
function openGame(i){let name=GAMES[i][0],type=GAMES[i][1];modalContent.innerHTML=`<div class="game-panel"><h2>${name}</h2><p class="muted">Interactive virtual-credit demo. No deposits or withdrawals.</p>${gameTemplate(type,name)}</div>`;modal.classList.remove('hidden')}
function betControl(label='Stake'){return `<div class="row"><label class="muted">${label}</label><input id="stake" class="input" type="number" min="1" value="100"><button class="primary" onclick="playCurrent()">Play Demo</button></div>`}
function gameTemplate(type,name){
if(type==='dice')return `<div class="game-stage"><div id="gameResult" class="result">?</div>${betControl()}<p class="muted">Roll over 50 to win a demo multiplier.</p></div>`;
if(type==='mines')return `<div class="game-stage"><div id="mineGrid" style="display:grid;grid-template-columns:repeat(5,1fr);gap:7px"></div>${betControl()}<p class="muted">Virtual minefield demo.</p></div>`;
if(type==='roulette'||type==='wheel')return `<div class="game-stage"><div id="gameResult" class="result">◎</div>${betControl('Stake')}<p class="muted">A virtual spin with simulated outcomes.</p></div>`;
if(type==='blackjack')return `<div class="game-stage"><div id="gameResult" class="result">🃏</div><div class="cards"><div class="card">A♠</div><div class="card">10♥</div></div>${betControl()}<p class="muted">Simplified demo round.</p></div>`;
if(type==='rps')return `<div class="game-stage"><div class="row" style="justify-content:center"><button class="secondary" onclick="rps('Rock')">🪨 Rock</button><button class="secondary" onclick="rps('Paper')">📄 Paper</button><button class="secondary" onclick="rps('Scissors')">✂️ Scissors</button></div><div id="gameResult" class="result">VS</div>${betControl()}</div>`;
if(type==='tower'||type==='chicken')return `<div class="game-stage"><div id="gameResult" class="result">▣ ▣ ▣ ▣ ▣</div>${betControl()}<p class="muted">Virtual level demo.</p></div>`;
if(type==='plinko')return `<div class="game-stage"><div id="gameResult" class="result">🔺</div>${betControl()}<p class="muted">Virtual Plinko result.</p></div>`;
if(type==='crash'||type==='limbo'||type==='pump')return `<div class="game-stage"><div id="gameResult" class="result">1.00×</div>${betControl()}<p class="muted">Simulated multiplier demo.</p></div>`;
return `<div class="game-stage"><div id="gameResult" class="result">${icons[GAMES.findIndex(x=>x[0]===name)]||'★'}</div>${betControl()}<p class="muted">Original arcade-style virtual game demo.</p></div>`}
function playCurrent(){let s=Number(document.querySelector('#stake')?.value||100);if(!spend(s))return;let result=document.querySelector('#gameResult');let type=GAMES.find(x=>x[0]===modalContent.querySelector('h2').textContent)?.[1]||'';let r=Math.random();
if(type==='dice'){let roll=Math.floor(Math.random()*100)+1;result.textContent=roll;if(roll>50)win(s*1.9)}
else if(type==='roulette'||type==='wheel'){let n=Math.floor(Math.random()*37);result.textContent=n;if([0,7,14,21,28,35].includes(n))win(s*5)}
else if(type==='blackjack'){result.textContent=r>.45?'WIN 🃏':'DEALER WINS';if(r>.45)win(s*1.95)}
else if(type==='crash'||type==='limbo'||type==='pump'){let m=(1+r*4).toFixed(2);result.textContent=m+'×';if(Number(m)>2)win(s*2)}
else{result.textContent=r>.5?'SUCCESS':'TRY AGAIN';if(r>.5)win(s*1.8)}}
function rps(p){let arr=['Rock','Paper','Scissors'],c=arr[Math.floor(Math.random()*3)],w=(p==='Rock'&&c==='Scissors')||(p==='Paper'&&c==='Rock')||(p==='Scissors'&&c==='Paper');let s=Number(document.querySelector('#stake').value||100);if(!spend(s))return;document.querySelector('#gameResult').textContent=`You: ${p} • CPU: ${c} • ${w?'WIN':'NO WIN'}`;if(w)win(s*1.8)}
render();updateBalance();
