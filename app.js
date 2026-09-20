const GAMES=[["Baccarat", "table", "🃏"], ["Rock Paper Scissors", "skill", "✊"], ["Diamonds", "instant", "💎"], ["Packs", "instant", "🎁"], ["Darts", "skill", "🎯"], ["Drill", "instant", "⛏️"], ["Prime Dice", "dice", "🎲"], ["Cases", "instant", "📦"], ["Scarab", "instant", "🪲"], ["Dragon Tower", "instant", "🐉"], ["Moles", "skill", "🕳️"], ["Slide", "instant", "↗️"], ["Flip", "instant", "🪙"], ["Pump", "instant", "📈"], ["Wheel", "instant", "🎡"], ["Snakes", "skill", "🐍"], ["Roulette", "table", "🎡"], ["Tome of Life", "instant", "📖"], ["Mines", "instant", "💣"], ["Dice", "dice", "🎲"], ["Blackjack", "table", "🃏"], ["Plinko", "instant", "🔺"], ["Limbo", "instant", "↕️"], ["Keno", "table", "🔢"], ["Crash", "instant", "🚀"], ["Chicken", "skill", "🐔"], ["Hilo", "table", "↕️"]];
let balance=10000, activeFilter='All', currentGame=null;
const $=s=>document.querySelector(s);
function money(){ $('#balance').textContent=balance.toLocaleString(); $('#heroBalance').textContent=balance.toLocaleString(); }
function add(n){balance+=n;money()}
function spend(n){n=Number(n)||0;if(n<=0||n>balance){alert('Insufficient demo credits.');return false}balance-=n;money();return true}
function claimDemo(){add(1000);alert('1,000 demo credits added.');}
function renderFilters(){const cats=['All','Table','Skill','Instant','Dice'];$('#filters').innerHTML=cats.map(c=>`<button class="filter ${c===activeFilter?'active':''}" onclick="setFilter('${c}')">${c}</button>`).join('')}
function setFilter(c){activeFilter=c;renderFilters();render()}
function render(){let q=($('#search').value||'').toLowerCase();let list=GAMES.map((g,i)=>({...g,i})).filter(g=>(activeFilter==='All'||g[1]===activeFilter.toLowerCase())&&g[0].toLowerCase().includes(q));$('#gameGrid').innerHTML=list.map(g=>`<article class="gameCard" onclick="openGame(${g.i})"><span class="tag">${g[1].toUpperCase()}</span><div class="gameIcon">${g[2]}</div><div class="gameName">${g[0]}</div><div class="playHint">PLAY DEMO ›</div></article>`).join('')}
$('#search').oninput=render;

function openModal(html){$('#modalBody').innerHTML=html;$('#modal').classList.remove('hidden')}
function closeModal(){$('#modal').classList.add('hidden')}
function stake(){return `<div class="stakeRow"><span class="muted">Stake</span><input id="stake" class="stake" type="number" min="1" value="100"><button class="btn primary" onclick="play()">Play</button></div>`}
function openAccount(title){openModal(`<h2 class="modalTitle">${title}</h2><p class="modalSub">Frontend demo account screen — no real account or payment connection.</p><input class="accountInput" placeholder="Email"><input class="accountInput" type="password" placeholder="Password"><button class="btn primary" style="width:100%;margin-top:8px" onclick="closeModal()">Continue Demo</button>`)}
function openGame(i){currentGame=GAMES[i][0];let t=GAMES[i][1];let h=`<h2 class="modalTitle">${currentGame}</h2><p class="modalSub">Playable virtual-credit frontend demo. No deposits or withdrawals.</p>`;
if(currentGame==='Rock Paper Scissors')h+=`<div class="stage"><div class="choiceRow"><button class="choice" onclick="rps('Rock')">🪨 Rock</button><button class="choice" onclick="rps('Paper')">📄 Paper</button><button class="choice" onclick="rps('Scissors')">✂️ Scissors</button></div><div id="result" class="bigResult">VS</div>${stake()}</div>`;
else if(['Mines','Drill'].includes(currentGame))h+=`<div class="stage"><div id="mineGrid" class="grid5">${Array.from({length:25},(_,n)=>`<button class="cell" onclick="mine(${n})">?</button>`).join('')}</div>${stake()}<p class="muted">Find safe cells. A mine ends the demo round.</p></div>`;
else if(currentGame==='Baccarat')h+=`<div class="stage"><div id="result" class="bigResult">PLAYER • BANKER</div>${stake()}<p class="muted">Simplified virtual baccarat round.</p></div>`;
else if(currentGame==='Blackjack')h+=`<div class="stage"><div class="cards"><div class="card">A♠</div><div class="card">10♥</div><div class="card">?</div></div><div id="result" class="bigResult">21</div>${stake()}<p class="muted">Simplified virtual blackjack round.</p></div>`;
else if(currentGame==='Roulette')h+=`<div class="stage"><div id="result" class="bigResult">0</div><div class="choiceRow"><button class="choice" onclick="roulette('red')">Red</button><button class="choice" onclick="roulette('black')">Black</button><button class="choice" onclick="roulette('zero')">0</button></div>${stake()}</div>`;
else if(currentGame==='Keno')h+=`<div class="stage"><div id="keno" class="grid5">${Array.from({length:25},(_,n)=>`<button class="cell" onclick="kenoPick(${n+1})">${n+1}</button>`).join('')}</div><div class="choiceRow" style="margin-top:14px"><button class="btn primary" onclick="kenoDraw()">Draw</button></div>${stake()}</div>`;
else if(currentGame==='Plinko')h+=`<div class="stage"><div id="result" class="bigResult">🔺</div>${stake()}<p class="muted">A virtual ball chooses a multiplier lane.</p></div>`;
else if(['Crash','Limbo','Pump'].includes(currentGame))h+=`<div class="stage"><div id="result" class="bigResult">1.00×</div>${stake()}<p class="muted">Simulated multiplier demo.</p></div>`;
else if(currentGame==='Wheel'||currentGame==='Diamonds'||currentGame==='Packs'||currentGame==='Cases'||currentGame==='Scarab'||currentGame==='Tome of Life'||currentGame==='Flip')h+=`<div class="stage"><div id="result" class="bigResult">${GAMES[i][2]}</div>${stake()}<p class="muted">Animated-style instant game demo.</p></div>`;
else if(['Dice','Prime Dice'].includes(currentGame))h+=`<div class="stage"><div id="result" class="bigResult">?</div>${stake()}<p class="muted">Roll a virtual number and compare against the target.</p></div>`;
else h+=`<div class="stage"><div id="result" class="bigResult">${GAMES[i][2]}</div>${stake()}<p class="muted">Original interactive demo game screen.</p></div>`;
openModal(h)}
function play(){let s=Number($('#stake')?.value||100);if(!spend(s))return;let r=Math.random(),out=$('#result');
if(['Dice','Prime Dice'].includes(currentGame)){let n=Math.floor(r*100)+1;out.textContent=n;if(n>=51)add(Math.floor(s*1.9))}
else if(['Crash','Limbo','Pump'].includes(currentGame)){let m=(1+r*4).toFixed(2);out.textContent=m+'×';if(+m>=2)add(s*2)}
else if(currentGame==='Plinko'){let m=[0,0.5,1,1.5,2,3,5][Math.floor(r*7)];out.textContent=m+'×';if(m>1)add(Math.floor(s*m))}
else{out.textContent=r>.5?'WIN':'TRY AGAIN';if(r>.5)add(Math.floor(s*1.8))}
}
function rps(p){let s=Number($('#stake').value||100);if(!spend(s))return;let a=['Rock','Paper','Scissors'],c=a[Math.floor(Math.random()*3)],w=(p==='Rock'&&c==='Scissors')||(p==='Paper'&&c==='Rock')||(p==='Scissors'&&c==='Paper');$('#result').textContent=`${p} vs ${c} — ${w?'WIN':'LOSE'}`;if(w)add(Math.floor(s*1.8))}
function roulette(color){let s=Number($('#stake').value||100);if(!spend(s))return;let n=Math.floor(Math.random()*37),red=[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36],c=n===0?'zero':red.includes(n)?'red':'black';$('#result').textContent=n;if(c===color)add(color==='zero'?s*20:s*1.9)}
function mine(n){let s=Number($('#stake').value||100);let cells=[...document.querySelectorAll('.cell')];if(cells[n].disabled)return;if(Math.random()<.18){cells[n].textContent='💣';cells.forEach(x=>x.disabled=true);return}cells[n].textContent='💎';cells[n].disabled=true}
function kenoPick(n){event.currentTarget.classList.toggle('picked');}
function kenoDraw(){let picks=[...document.querySelectorAll('#keno .picked')].map(x=>+x.textContent);if(!picks.length){alert('Pick at least one number.');return}let draw=new Set();while(draw.size<10)draw.add(1+Math.floor(Math.random()*25));let hits=picks.filter(x=>draw.has(x)).length;$('#keno').querySelectorAll('.cell').forEach(x=>{if(draw.has(+x.textContent))x.textContent='✓'});alert(`You hit ${hits} number(s). Draw: ${[...draw].join(', ')}`)}
renderFilters();render();money();
