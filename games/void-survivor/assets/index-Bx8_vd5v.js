var Vu=Object.defineProperty;var Wu=(i,t,e)=>t in i?Vu(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var Y=(i,t,e)=>Wu(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Tl=14;class Xu{constructor(){Y(this,"ctx",null);Y(this,"master",null);Y(this,"music",null);Y(this,"noiseBuf",null);Y(this,"voices",0);Y(this,"volume",.6);Y(this,"muted",!1);Y(this,"musicOn",!1);Y(this,"step",0);Y(this,"nextTime",0);Y(this,"timer",null);Y(this,"wave",1);Y(this,"duck",!1);Y(this,"last",{})}init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}try{const t=window.AudioContext??window.webkitAudioContext;if(!t)return;this.ctx=new t,this.master=this.ctx.createGain(),this.master.connect(this.ctx.destination),this.music=this.ctx.createGain(),this.music.connect(this.master),this.applyGain();const e=this.ctx.sampleRate*.6;this.noiseBuf=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const n=this.noiseBuf.getChannelData(0);let s=12345;for(let r=0;r<e;r++)s=s*1664525+1013904223>>>0,n[r]=s/4294967296*2-1}catch{this.ctx=null}}setVolume(t){this.volume=t,this.applyGain()}setMuted(t){this.muted=t,this.applyGain()}setDuck(t){this.duck=t,this.applyGain()}applyGain(){if(!this.master||!this.music||!this.ctx)return;const t=this.ctx.currentTime;this.master.gain.setTargetAtTime(this.muted?0:this.volume*.7,t,.02),this.music.gain.setTargetAtTime(this.duck?.12:.3,t,.1)}tone(t,e,n,s,r,a=0){const o=this.ctx;if(!o||!this.master||this.muted||this.voices>=Tl)return;const l=o.currentTime+a,h=o.createOscillator(),c=o.createGain();h.type=n,h.frequency.setValueAtTime(t,l),r&&h.frequency.exponentialRampToValueAtTime(Math.max(20,r),l+e),c.gain.setValueAtTime(1e-4,l),c.gain.exponentialRampToValueAtTime(s,l+.008),c.gain.exponentialRampToValueAtTime(1e-4,l+e),h.connect(c),c.connect(this.master),this.voices++,h.onended=()=>{this.voices--},h.start(l),h.stop(l+e+.02)}noise(t,e,n,s=0){const r=this.ctx;if(!r||!this.master||!this.noiseBuf||this.muted||this.voices>=Tl)return;const a=r.currentTime+s,o=r.createBufferSource();o.buffer=this.noiseBuf;const l=r.createBiquadFilter();l.type="lowpass",l.frequency.setValueAtTime(n,a),l.frequency.exponentialRampToValueAtTime(Math.max(80,n*.2),a+t);const h=r.createGain();h.gain.setValueAtTime(e,a),h.gain.exponentialRampToValueAtTime(1e-4,a+t),o.connect(l),l.connect(h),h.connect(this.master),this.voices++,o.onended=()=>{this.voices--},o.start(a),o.stop(a+t+.02)}gate(t,e){const n=performance.now();return n-(this.last[t]??0)<e?!1:(this.last[t]=n,!0)}handle(t){if(!(!this.ctx||this.muted)){this.wave=t.wave;for(const e of t.events)switch(e.t){case"shot":this.gate("shot",90)&&this.tone(e.a===1?300:620,.07,"sawtooth",.05,e.a===1?160:260);break;case"hit":this.gate("hit",45)&&this.tone(180+Math.random()*40,.04,"square",.04);break;case"kill":this.gate("kill",40)&&this.tone(300+Math.min(900,t.chain*25),.09,"triangle",.07,120);break;case"mote":this.gate("mote",55)&&this.tone(880+Math.random()*200,.05,"sine",.035);break;case"shard":this.tone(1040,.08,"sine",.07),this.tone(1560,.12,"sine",.06,void 0,.07);break;case"chest":for(let n=0;n<4;n++)this.tone(520*Math.pow(1.26,n),.14,"triangle",.08,void 0,n*.06);break;case"hurt":this.noise(.18,.2,1800),this.tone(140,.2,"square",.1,60);break;case"levelup":for(let n=0;n<4;n++)this.tone(440*Math.pow(1.335,n),.22,"triangle",.09,void 0,n*.07);break;case"fieldUp":this.tone(300,.25,"sine",.07,700);break;case"absorb":this.gate("absorb",60)&&this.tone(900,.06,"sine",.05,500);break;case"fieldBreak":this.noise(.3,.16,3e3),this.tone(500,.3,"sawtooth",.07,100);break;case"detonate":this.noise(.6,.35,2600),this.tone(160,.55,"sawtooth",.14,35);break;case"beam":this.gate("beam",100)&&this.tone(1200,.14,"sawtooth",.05,300);break;case"arc":this.gate("arc",100)&&this.noise(.12,.08,6e3);break;case"shieldBlock":this.gate("block",80)&&this.tone(2e3,.04,"square",.03);break;case"telegraph":this.gate("tele",120)&&this.tone(500,.1,"sine",.03,700);break;case"bossWarn":for(let n=0;n<3;n++)this.tone(300,.4,"sawtooth",.08,700,n*.45);break;case"bossPhase":this.tone(120,.7,"sawtooth",.12,400);break;case"bossDown":case"win":for(let n=0;n<6;n++)this.tone(330*Math.pow(1.19,n),.3,"triangle",.09,void 0,n*.09);break;case"dead":this.noise(.8,.3,1400),this.tone(220,.9,"sawtooth",.12,40);break;case"wave":(e.a??1)>1&&this.tone(660,.16,"square",.05,880);break}}}click(){this.tone(700,.05,"square",.05,900)}startMusic(){!this.ctx||this.musicOn||(this.musicOn=!0,this.nextTime=this.ctx.currentTime+.1,this.step=0,this.timer=window.setInterval(()=>this.schedule(),100))}stopMusic(){this.musicOn=!1,this.timer!==null&&window.clearInterval(this.timer),this.timer=null}schedule(){const t=this.ctx;if(!t||!this.music||!this.musicOn)return;const n=60/(118+2*this.wave)/4,s=[55,55,65.4,49][Math.floor(this.step/16)%4];for(;this.nextTime<t.currentTime+.25;){const r=this.step%16,a=this.nextTime;(r%4===0||r===10)&&this.mTone(s*(r===10?1.5:1),n*3,"sawtooth",.22,a,700),r%2===0&&this.mTone(s*4*[1,1.5,1.2,1.8][r/2%4],n*1.5,"square",.05,a,2400),r%2===1&&this.mHat(a),this.nextTime+=n,this.step++}}mTone(t,e,n,s,r,a){const o=this.ctx;if(!o||!this.music)return;const l=o.createOscillator(),h=o.createBiquadFilter(),c=o.createGain();l.type=n,l.frequency.value=t,h.type="lowpass",h.frequency.value=a,c.gain.setValueAtTime(s,r),c.gain.exponentialRampToValueAtTime(1e-4,r+e),l.connect(h),h.connect(c),c.connect(this.music),l.start(r),l.stop(r+e+.02)}mHat(t){const e=this.ctx;if(!e||!this.music||!this.noiseBuf)return;const n=e.createBufferSource();n.buffer=this.noiseBuf;const s=e.createBiquadFilter();s.type="highpass",s.frequency.value=7e3;const r=e.createGain();r.gain.setValueAtTime(.06,t),r.gain.exponentialRampToValueAtTime(1e-4,t+.04),n.connect(s),s.connect(r),r.connect(this.music),n.start(t),n.stop(t+.05)}}function qu(i){return{s:i>>>0||2654435769}}function Je(i){i.s=i.s+1831565813>>>0;let t=i.s;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ls(i,t,e){return t+(e-t)*Je(i)}function Sr(i,t){return Je(i)<t}function br(i,t,e){let n=0;for(const r of t)n+=Math.max(0,e(r));if(n<=0)return null;let s=Je(i)*n;for(const r of t)if(s-=Math.max(0,e(r)),s<=0)return r;return t[t.length-1]??null}const kr=[{id:"pulse",name:"Pulse Amp",kind:"weapon",maxLevel:5,weight:7,tags:["weapon","auto-aim"],icon:"P",color:"#7af8ff",desc:i=>`Pulse Cannon: ${8+2.5*(i-1)} dmg, ${i>=5?3:i>=3?2:1} shot${i>=3?"s":""} per volley.`},{id:"orbit",name:"Orbit Blades",kind:"weapon",maxLevel:5,weight:10,tags:["weapon","melee"],icon:"O",color:"#59ffb5",desc:i=>`${i+1} blades circle you for ${6+2.5*i} dmg per hit.`},{id:"homing",name:"Seeker Swarm",kind:"weapon",maxLevel:5,weight:9,rare:!0,tags:["weapon","homing"],icon:"H",color:"#ffa23a",desc:i=>`Fires ${1+Math.floor((i-1)/2)} homing missile${i>=3?"s":""} for ${11+3*i} dmg.`},{id:"pierce",name:"Lance Beam",kind:"weapon",maxLevel:5,weight:9,rare:!0,tags:["weapon","piercing"],icon:"L",color:"#e9fbff",desc:i=>`Beam through every enemy in a line: ${16+6*i} dmg${i>=4?", twin beams":""}.`},{id:"chain",name:"Chain Arc",kind:"weapon",maxLevel:5,weight:9,rare:!0,tags:["weapon","lightning"],icon:"C",color:"#b58cff",desc:i=>`Lightning jumps ${2+i} times for ${10+3.5*i} dmg, ignores shields.`},{id:"vitality",name:"Vitality",kind:"passive",maxLevel:5,weight:8,defensive:!0,tags:["defense"],icon:"+",color:"#ff5d8f",desc:()=>"+20 max HP and heal 20."},{id:"regen",name:"Regeneration",kind:"passive",maxLevel:5,weight:7,defensive:!0,tags:["defense"],icon:"R",color:"#59ffb5",desc:i=>`Regenerate ${(.7*i).toFixed(1)} HP per second.`},{id:"swift",name:"Swift Thrusters",kind:"passive",maxLevel:5,weight:7,tags:["mobility"],icon:"S",color:"#35f2ff",desc:i=>`+${7*i}% move speed.`},{id:"magnet",name:"Magnet Core",kind:"passive",maxLevel:5,weight:6,tags:["economy"],icon:"M",color:"#ffd24a",desc:i=>`+${30*i}% pickup radius.`},{id:"overclock",name:"Overclock",kind:"passive",maxLevel:5,weight:8,tags:["cooldown"],icon:"X",color:"#ff2e88",desc:i=>`Weapons cool down ${Math.round((1-Math.pow(.93,i))*100)}% faster.`},{id:"fortune",name:"Fortune",kind:"passive",maxLevel:5,weight:5,tags:["luck"],icon:"$",color:"#ffd24a",desc:i=>`Luck ${(.1*i).toFixed(1)}: rarer cards, more chests and shards.`},{id:"plating",name:"Plating",kind:"passive",maxLevel:4,weight:6,defensive:!0,tags:["defense"],icon:"A",color:"#9bb4ff",desc:i=>`Take ${Math.round((1-Math.pow(.94,i))*100)}% less damage.`},{id:"siphon",name:"Siphon",kind:"signature",maxLevel:3,weight:9,rare:!0,tags:["essence","signature"],icon:"V",color:"#59ffb5",desc:i=>`Kills fill your Reserve x${[1,1.5,2][i-1]} (cap ${[60,100,150][i-1]}).`},{id:"bulwark",name:"Bulwark Field",kind:"signature",maxLevel:3,weight:9,rare:!0,requires:{siphon:1},tags:["essence","shield","signature"],icon:"B",color:"#35f2ff",desc:i=>`Reserve becomes a shield ring that eats bullets and burns enemies (+${25*(i-1)}% burn).`},{id:"detonation",name:"Detonation",kind:"signature",maxLevel:3,weight:9,rare:!0,requires:{bulwark:1},tags:["essence","burst","signature"],icon:"D",color:"#ff2e88",desc:i=>`Field break or release (E) bursts for Reserve spent (+${30*(i-1)}% power).`},{id:"overcharge",name:"Overcharge",kind:"filler",maxLevel:999,weight:1,tags:["damage"],icon:"^",color:"#ffa23a",desc:()=>"+4% damage to everything."},{id:"repair",name:"Repair Kit",kind:"filler",maxLevel:999,weight:1,defensive:!0,tags:["heal"],icon:"K",color:"#ff5d8f",desc:()=>"Heal 35% of max HP now."},{id:"cache",name:"Shard Cache",kind:"filler",maxLevel:999,weight:1,tags:["shards"],icon:"*",color:"#ffd24a",desc:()=>"Gain 8 Shards immediately."}],Vi=Object.fromEntries(kr.map(i=>[i.id,i]));function Yu(){const i={};for(const t of kr)i[t.id]=0;return i.pulse=1,i}const Br=[{id:"seekerLance",name:"Seeker Lance",needs:["homing","pierce"],desc:"Missiles pierce 2 extra enemies; beam damage x1.25."},{id:"leechArc",name:"Leech Arc",needs:["siphon","chain"],desc:"Arc +2 jumps; every arc hit adds 1 Reserve."},{id:"bladedField",name:"Bladed Field",needs:["bulwark","orbit"],desc:"Blades ride the field edge for x1.6 damage; field burns x1.5."},{id:"clusterBurst",name:"Cluster Burst",needs:["detonation","homing"],desc:"Detonations also launch homing shards."},{id:"voidReactor",name:"Void Reactor",needs:["siphon","bulwark","detonation"],desc:"Detonations refund 25% of the Reserve spent."}],$u=4,ph=["pulse","orbit","homing","pierce","chain"];function mh(i,t,e){return{maxHp:100+t.hp+20*i.vitality,speed:190*(1+t.speed+.07*i.swift),pickup:70*(1+.3*i.magnet),cdMul:Math.pow(.93,i.overclock),dmgMul:1+.04*e,luck:t.luck+.1*i.fortune,taken:Math.pow(.94,i.plating),regen:.7*i.regen}}function fi(i,t){const e=Br.find(n=>n.id===t);return!!e&&e.needs.every(n=>i[n]>0)}const Zu=[0,60,100,150],Ku=[0,1,1.5,2];function zr(i){return Zu[Math.min(3,i.siphon)]??0}function Ju(i,t,e){if(i.siphon<=0)return 0;const n=1+Math.min(.3,.01*e);return t*Ku[Math.min(3,i.siphon)]*n}function wl(i,t){return Math.min(150,44+.5*i*(1+.2*(t-1)))}function ju(i){return 1.2+.012*i}function Qu(i){return 3+.3*i}function tf(i,t,e){return(5+.1*i)*(1+.25*(t-1))*(e?1.5:1)}const gh=8;function ef(i,t,e){return(10+1.5*i)*(1+.3*(t-1))*e}function nf(i){return Math.min(340,80+2.4*i)}function sf(i){let t=0;for(const e of ph)i[e]>0&&t++;return t}function rf(i,t){const e=t.levels;if(e[i.id]>=i.maxLevel)return!1;if(i.kind==="filler")return!0;if(!t.unlocked.has(i.id))return!1;if(i.requires){for(const n of Object.keys(i.requires))if(e[n]<(i.requires[n]??0))return!1}return!(i.kind==="weapon"&&e[i.id]===0&&sf(e)>=$u)}function af(i,t){return t[i.id]>0?!1:Br.some(e=>e.needs.includes(i.id)&&e.needs.every(n=>n===i.id||t[n]>0))}function jr(i,t){const e=t.levels;let n=i.weight;return e[i.id]>0&&i.kind!=="filler"&&(n*=1.5),i.rare&&(n*=1+t.luck*(t.chest?3:1)),i.id==="bulwark"&&e.siphon>0&&e.bulwark===0&&(n*=2.5),i.id==="detonation"&&e.bulwark>0&&e.detonation===0&&(n*=2.5),af(i,e)&&(n*=2),i.id==="repair"&&(n=t.hpFrac<.6?6*(1-t.hpFrac):.4),i.kind==="filler"&&i.id!=="repair"&&(n=.4),t.chest&&i.kind!=="filler"&&(n*=i.rare?2:1),n}function of(i,t){const e=kr.filter(h=>rf(h,i)),n=e.filter(h=>!i.exclude.includes(h.id)),s=n.filter(h=>h.kind!=="filler").length>=3?n:e,r=[],a=h=>{h&&!r.includes(h)&&r.push(h)};if(!ph.some(h=>h!=="pulse"&&i.levels[h]>0)&&i.levelUps<3){const h=s.filter(c=>c.kind==="weapon"&&c.id!=="pulse"&&i.levels[c.id]===0);a(br(t,h,c=>jr(c,i)))}if(i.hpFrac<.5||i.sinceDefensive>=4){const h=s.filter(c=>c.defensive&&!r.includes(c));a(br(t,h,c=>c.id==="repair"?.5:jr(c,i)))}let l=0;for(;r.length<3&&l++<40;){const h=s.filter(c=>!r.includes(c));if(a(br(t,h,c=>jr(c,i))),h.length===0)break}for(const h of["overcharge","repair","cache"]){if(r.length>=3)break;a(Vi[h])}return r.slice(0,3).map(h=>h.id)}function lf(i,t){if(!Vi[i]||t[i]>0)return null;const n=Br.find(s=>s.needs.includes(i)&&s.needs.every(r=>r===i||t[r]>0));return n?`Synergy: ${n.name}`:null}class qs{constructor(t){Y(this,"list",[]);Y(this,"free",[]);Y(this,"make");this.make=t}acquire(){const t=this.free.pop()??this.make();return this.list.push(t),t}removeAt(t){const e=this.list.length-1,n=this.list[t];this.list[t]=this.list[e],this.list.pop(),this.free.push(n)}clear(){for(const t of this.list)this.free.push(t);this.list.length=0}get count(){return this.list.length}}const cf=96,hf=1632,Mi=34;class uf{constructor(){Y(this,"cells",[]);Y(this,"used",[]);for(let t=0;t<Mi*Mi;t++)this.cells.push([])}idx(t){const e=Math.floor((t+hf)/cf);return e<0?0:e>=Mi?Mi-1:e}rebuild(t){for(const e of this.used)this.cells[e].length=0;this.used.length=0;for(const e of t){if(!e.alive)continue;const n=this.idx(e.y)*Mi+this.idx(e.x),s=this.cells[n];s.length===0&&this.used.push(n),s.push(e)}}query(t,e,n,s){s.length=0;const r=n+52,a=this.idx(t-r),o=this.idx(t+r),l=this.idx(e-r),h=this.idx(e+r);for(let c=l;c<=h;c++)for(let u=a;u<=o;u++){const f=this.cells[c*Mi+u];for(let d=0;d<f.length;d++)s.push(f[d])}return s}}const ff=1200,vh=160,df=120,pf=160,mf=140,Al=300,Cl=60,Me=1200,xn=1300;function Zt(i,t){i.events.length<600&&i.events.push(t)}function gf(i){return Math.min(20,Math.floor(i/60)+1)}function Rl(i){const t=i-1;return 1+.16*t+.004*t*t}function Ds(i){return 1+.03*(i-1)}function Bo(i){return 1+.012*(i-1)}function xh(i){return 5+4*i+Math.floor(.45*i*i)}function Hr(i,t,e){if(i==="foundry"){const n=xn-e,s=Math.hypot(t.x,t.y);s>n&&(t.x*=n/s,t.y*=n/s)}else{const n=Me-e;t.x>n?t.x=n:t.x<-n&&(t.x=-n),t.y>n?t.y=n:t.y<-n&&(t.y=-n)}}function vf(i,t,e){return i==="foundry"?Math.hypot(t,e)>xn+40:Math.abs(t)>Me+40||Math.abs(e)>Me+40}function Ha(i,t,e,n,s,r,a){if(i.eBullets>=pf)return null;const o=i.bullets.acquire();return o.alive=!0,o.friendly=!1,o.x=t,o.y=e,o.vx=Math.cos(n)*s,o.vy=Math.sin(n)*s,o.r=a?7:5,o.dmg=r,o.life=4,o.kind=a?1:0,o.pierce=0,o.homing=!1,o.turn=0,o.hits.length=0,i.eBullets++,o}function Ga(i,t,e,n,s,r,a,o,l,h){if(i.pBullets>=mf)return null;const c=i.bullets.acquire();return c.alive=!0,c.friendly=!0,c.x=t,c.y=e,c.vx=Math.cos(n)*s,c.vy=Math.sin(n)*s,c.r=o===1?6:o===2?4:5,c.dmg=r,c.life=a,c.kind=o,c.pierce=l,c.homing=h,c.turn=4,c.hits.length=0,i.pBullets++,c}function Va(i,t){const e=i.hazards.acquire();return e.alive=!0,e.kind=t.kind,e.x=t.x,e.y=t.y,e.x2=t.x2??t.x,e.y2=t.y2??t.y,e.r=t.r??44,e.width=t.width??40,e.t=0,e.tele=t.tele??1,e.life=t.life??6,e.dps=t.dps??14,e.tick=0,e.hit=!1,e}function _h(i,t,e,n,s){n?Va(i,{kind:"lane",x:t,y:e-1500,x2:t,y2:e+1500,width:44,tele:1.2,dps:s}):Va(i,{kind:"lane",x:t-1500,y:e,x2:t+1500,y2:e,width:44,tele:1.2,dps:s}),Zt(i,{t:"lane",x:t,y:e})}function kn(i,t,e,n,s,r=18){if(t==="mote"&&i.pickups.list.length>=Al+Cl+6){i.pendingXp+=s;return}if(t==="shard"&&i.pickups.list.length>=Al+Cl+6){i.shardsCollected+=1;return}const a=i.pickups.acquire();a.alive=!0,a.kind=t;const o=Je(i.rng)*Math.PI*2,l=Je(i.rng)*r;a.x=e+Math.cos(o)*l,a.y=n+Math.sin(o)*l,a.vx=Math.cos(o)*l*3,a.vy=Math.sin(o)*l*3,a.v=s,a.t=0,a.pulled=!1}const di={swarm:{kind:"swarm",name:"Drifter",hp:6,speed:78,r:9,dmg:6,xp:1,ess:1,shard:.004,color:"#a6ff4d"},spitter:{kind:"spitter",name:"Spitter",hp:14,speed:60,r:11,dmg:6,xp:3,ess:2,shard:.02,color:"#ff4fa0"},rammer:{kind:"rammer",name:"Rammer",hp:24,speed:70,r:13,dmg:12,xp:4,ess:3,shard:.025,color:"#ffa23a"},cleaver:{kind:"cleaver",name:"Cleaver",hp:36,speed:52,r:16,dmg:9,xp:4,ess:3,shard:.025,color:"#b06cff"},splitlet:{kind:"splitlet",name:"Splitlet",hp:5,speed:120,r:7,dmg:4,xp:1,ess:0,shard:0,color:"#d6a2ff"},aegis:{kind:"aegis",name:"Aegis",hp:44,speed:58,r:14,dmg:10,xp:7,ess:5,shard:.05,color:"#35f2ff"},caster:{kind:"caster",name:"Voidcaster",hp:30,speed:50,r:12,dmg:8,xp:7,ess:5,shard:.05,color:"#8a5cff"},warden:{kind:"warden",name:"Core Warden",hp:700,speed:45,r:40,dmg:14,xp:60,ess:40,shard:1,color:"#ffffff"}};function yh(i){return i.bossAlive?df:vh}function xf(){return{id:0,alive:!1,kind:"swarm",x:0,y:0,vx:0,vy:0,r:9,hp:1,maxHp:1,speed:1,dmg:1,xp:1,ess:1,t:0,state:0,timer:0,act:0,ang:0,shield:0,shieldDir:1,tx:0,ty:0,elite:!1,tier:0,phase:0,flash:0,bladeCd:0,seed:0,noEss:!1,kx:0,ky:0}}function Bs(i,t,e,n,s=!1,r=0){const a=di[t],o=i.enemies.acquire(),l=t==="warden"?1:Rl(i.wave),h=s?3.5:1;return o.id=++i.nextId,o.alive=!0,o.kind=t,o.x=e,o.y=n,o.vx=0,o.vy=0,o.kx=0,o.ky=0,o.r=a.r*(s?1.35:1),o.hp=o.maxHp=t==="warden"?700*(1+.9*(r-1))*Rl(i.wave):a.hp*l*h,o.speed=a.speed*Bo(i.wave),o.dmg=a.dmg*Ds(i.wave)*(s?1.3:1),o.xp=a.xp*(s?3:1)*(t==="warden"?r:1),o.ess=a.ess*(s?3:1)*(t==="warden"?r:1),o.t=0,o.state=0,o.timer=t==="warden"?2.2:Ls(i.rng,.6,2.2),o.act=0,o.ang=0,o.shield=Je(i.rng)*Math.PI*2,o.shieldDir=Je(i.rng)<.5?1:-1,o.tx=0,o.ty=0,o.elite=s,o.tier=r,o.phase=0,o.flash=0,o.bladeCd=0,o.seed=Je(i.rng)*6.28,o.noEss=t==="splitlet",o}function zo(i,t=560,e=640,n){const s=n??Je(i.rng)*Math.PI*2,r=Ls(i.rng,t,e),a={x:i.player.x+Math.cos(s)*r,y:i.player.y+Math.sin(s)*r};return Hr(i.arena,a,20),a}function Ze(i,t,e,n){i.vx=t*n,i.vy=e*n}function _f(i,t,e){const n=i.player;t.t+=e,t.flash>0&&(t.flash-=e),t.bladeCd>0&&(t.bladeCd-=e);const s=n.x-t.x,r=n.y-t.y,a=Math.hypot(s,r)||1,o=s/a,l=r/a;switch(t.kind){case"swarm":case"splitlet":{const c=Math.sin(t.t*3+t.seed)*.35;Ze(t,o-l*c,l+o*c,t.speed);break}case"cleaver":Ze(t,o,l,t.speed);break;case"aegis":t.shield+=t.shieldDir*1.4*e,Ze(t,o,l,t.speed);break;case"spitter":{if(t.state===0){const c=t.seed>3.14?1:-1;a>300?Ze(t,o,l,t.speed):a<240?Ze(t,-o,-l,t.speed):Ze(t,-l*c,o*c,t.speed*.6),t.timer-=e,t.timer<=0&&a<520&&(t.state=1,t.timer=.7,t.ang=Math.atan2(r,s),Zt(i,{t:"telegraph",x:t.x,y:t.y}))}else t.vx=t.vy=0,t.timer>.25&&(t.ang=Math.atan2(r,s)),t.timer-=e,t.timer<=0&&(Ha(i,t.x,t.y,t.ang,230,8*Ds(i.wave),!1),t.state=0,t.timer=2.8+Je(i.rng)*.6);break}case"rammer":{if(t.state===0)Ze(t,o,l,t.speed),t.timer-=e,t.timer<=0&&a<340&&(t.state=1,t.timer=.8,t.ang=Math.atan2(r,s),Zt(i,{t:"telegraph",x:t.x,y:t.y}));else if(t.state===1)t.vx=t.vy=0,t.timer>.3&&(t.ang=Math.atan2(r,s)),t.timer-=e,t.timer<=0&&(t.state=2,t.timer=.55);else if(t.state===2){const c=480*Bo(i.wave);t.vx=Math.cos(t.ang)*c,t.vy=Math.sin(t.ang)*c,t.timer-=e,t.timer<=0&&(t.state=3,t.timer=.9)}else t.vx=t.vy=0,t.timer-=e,t.timer<=0&&(t.state=0,t.timer=1.5);break}case"caster":{t.state===0?(a>340?Ze(t,o,l,t.speed):a<290?Ze(t,-o,-l,t.speed):Ze(t,-l,o,t.speed*.5),t.timer-=e,t.timer<=0&&a<600&&(t.state=1,t.timer=.5,t.tx=n.x,t.ty=n.y,Zt(i,{t:"telegraph",x:t.x,y:t.y}))):(t.vx=t.vy=0,t.timer-=e,t.timer<=0&&(Va(i,{kind:"pool",x:t.tx,y:t.ty,r:44,tele:1,life:6,dps:14*Ds(i.wave)}),Zt(i,{t:"pool",x:t.tx,y:t.ty}),t.state=0,t.timer=5.5));break}case"warden":yf(i,t,e,o,l,a);break}t.x+=(t.vx+t.kx)*e,t.y+=(t.vy+t.ky)*e;const h=Math.max(0,1-6*e);t.kx*=h,t.ky*=h,Hr(i.arena,t,t.r)}function yf(i,t,e,n,s,r){const a=i.player;t.phase===0&&t.hp<=t.maxHp*.5&&(t.phase=1,Zt(i,{t:"bossPhase",x:t.x,y:t.y}));const o=t.phase===1,l=(14+2*t.tier)*Ds(i.wave);if(t.state===0){const h=t.speed*(o?1.3:1);if(r>230?Ze(t,n,s,h):r<150?Ze(t,-n,-s,h):Ze(t,-s,n,h*.5),t.timer-=e,t.timer<=0){const c=o?4:3;t.tx=t.act%c,t.act++,t.state=1,t.timer=.8,t.ang=Math.atan2(a.y-t.y,a.x-t.x),Zt(i,{t:"telegraph",x:t.x,y:t.y})}}else if(t.state===1){if(t.vx=t.vy=0,t.tx===3&&t.timer>.3&&(t.ang=Math.atan2(a.y-t.y,a.x-t.x)),t.timer-=e,t.timer<=0){const h=t.tx;if(t.state=0,t.timer=o?2.3:3.2,h===0){const c=10+2*t.tier,u=t.t;for(let f=0;f<c;f++)Ha(i,t.x,t.y,u+f/c*Math.PI*2,170,l*.6,!0);if(o)for(let f=0;f<c;f++)Ha(i,t.x,t.y,-u+(f+.5)/c*Math.PI*2,130,l*.6,!0)}else if(h===1){const c=o?3:2;for(let u=0;u<c;u++){const f=u%2===0,d=u===0?0:Ls(i.rng,-160,160);_h(i,a.x+(f?d:0),a.y+(f?0:d),f,(18+2*t.tier)*Ds(i.wave))}}else if(h===2){const c=(o?6:4)+t.tier;for(let u=0;u<c&&!(i.enemies.count>=vh);u++){const f=u/c*Math.PI*2,d=Bs(i,"swarm",t.x+Math.cos(f)*60,t.y+Math.sin(f)*60);Hr(i.arena,d,d.r)}}else t.state=2,t.timer=.6}}else t.vx=Math.cos(t.ang)*520,t.vy=Math.sin(t.ang)*520,t.timer-=e,t.timer<=0&&(t.state=0,t.timer=1.5)}const Pl=["swarm","spitter","rammer","cleaver","aegis","caster"],Ll={swarm:1,spitter:3,rammer:4,cleaver:4,aegis:6,caster:6},Mf={swarm:1,spitter:2,rammer:3,cleaver:4,aegis:6,caster:8},Dl=[300,600,900,1140];function Sf(i){return 2.4+.8*(i-1)}const Mh=[7,3,3,3,3,2],Il=[5,4,4,4,4,3],bf=[[10,0,0,0,0,0],[10,2,0,0,0,0],[10,3,2,0,0,0],[9,3,3,2,0,0],[9,3,3,3,0,0],[8,3,3,3,2,0],[8,3,3,3,3,0],Mh];function Ef(i){if(i<=8)return bf[i-1];if(i>=14)return Il;const t=(i-8)/6;return Mh.map((e,n)=>e+(Il[n]-e)*t)}function Tf(){return"warden"}function wf(i){const e=i.bossesSpawned+1,n=zo(i,380,440),s=Bs(i,Tf(),n.x,n.y,!1,e);s.timer=2.4,i.bossesSpawned++,i.bossAlive=!0,Zt(i,{t:"bossWarn",x:s.x,y:s.y,a:e,s:e===4?"FINAL WARDEN":"CORE WARDEN"})}function Af(i,t){const e=Je(i.rng)*Math.PI*2,n=5+t;for(let s=0;s<n&&!(i.enemies.count>=yh(i));s++){const r=e+(s/n-.5)*(Math.PI/2),a=zo(i,580,640,r);Bs(i,"swarm",a.x,a.y)}}function Cf(i,t){const e=gf(i.time);i.wave=e,e>i.packWave&&(i.packWave=e,Zt(i,{t:"wave",x:0,y:0,a:e}),Af(i,e)),i.bossesSpawned<Dl.length&&i.time>=Dl[i.bossesSpawned]&&wf(i),i.budget=Math.min(30,i.budget+Sf(e)*t*(i.bossAlive?.5:1));const n=Ef(e),s=yh(i);for(let r=0;r<6;r++){if(i.enemies.count>=s){i.budget=Math.min(i.budget,12);break}const a=br(i.rng,Pl,h=>{const c=Pl.indexOf(h);return Ll[h]<=i.budget&&e>=Mf[h]?n[c]:0});if(!a)break;const o=zo(i),l=e>=5&&Sr(i.rng,.03+.005*(e-5));Bs(i,a,o.x,o.y,l),i.budget-=Ll[a]*(l?2:1)}}const Dr=1/60,Rf=12;function Sh(){return{unlocked:["pulse","orbit","vitality","regen","swift","magnet","overclock","fortune","plating","siphon","bulwark","detonation"],hp:0,speed:0,luck:0,rerolls:1,startSiphon:!1,arena:"hollow"}}function bh(){return{mx:0,my:0,aimX:0,aimY:0,hasAim:!1,release:!1,toggleHold:!1}}function Eh(i,t=Sh()){const e=Yu();t.startSiphon&&(e.siphon=1);const n=mh(e,t,0),s=t.arena;return{seed:i,rng:qu(i),arena:s,tick:0,time:0,state:"playing",player:{x:0,y:0,vx:0,vy:0,r:Rf,hp:n.maxHp,maxHp:n.maxHp,iframes:0,flash:0,facing:0,level:1,xp:0,xpNext:xh(1),reserve:0,fieldOn:!1,fieldR:0,fieldSpent:0,fieldTick:0,hold:!1,detCd:0,pulseCd:.3,homingCd:1,lanceCd:1,chainCd:1,orbitAngle:0,regenAcc:0,kvx:0,kvy:0},stats:n,levels:e,meta:t,enemies:new qs(xf),bullets:new qs(()=>({alive:!1,friendly:!1,x:0,y:0,vx:0,vy:0,r:5,dmg:1,life:1,kind:0,pierce:0,homing:!1,turn:0,hits:[]})),hazards:new qs(()=>({alive:!1,kind:"pool",x:0,y:0,x2:0,y2:0,r:40,width:40,t:0,tele:1,life:1,dps:1,tick:0,hit:!1})),pickups:new qs(()=>({alive:!1,kind:"mote",x:0,y:0,vx:0,vy:0,v:1,t:0,pulled:!1})),grid:new uf,events:[],nextId:0,budget:0,wave:1,packWave:0,bossesSpawned:0,bossAlive:!1,laneTimer:10,pendingLevels:0,pendingChests:0,choice:null,rerolls:t.rerolls,picks:[],sinceDefensive:0,levelUps:0,kills:0,killsBy:{},damageDealt:0,shardsCollected:0,bossesKilled:0,chain:0,chainTimer:0,maxChain:0,detonations:0,deathTimer:0,winReason:"",scratch:[],eBullets:0,pBullets:0,pendingXp:0}}function Yi(i,t,e,n,s){let r=null,a=n*n;for(const o of i.enemies.list){if(!o.alive||s&&s.includes(o.id))continue;const l=(o.x-t)*(o.x-t)+(o.y-e)*(o.y-e);l<a&&(a=l,r=o)}return r}function Pf(i,t){let e=i-t;for(;e>Math.PI;)e-=Math.PI*2;for(;e<-Math.PI;)e+=Math.PI*2;return Math.abs(e)}function Th(i,t,e){return i.kind!=="aegis"?!1:Pf(i.shield,Math.atan2(e-i.y,t-i.x))<50*Math.PI/180}function Ho(i,t){const e=zr(i.levels);i.player.reserve=Math.min(e,i.player.reserve+t)}function Go(i,t,e,n){const s=i.player;if(s.iframes>0||i.state!=="playing")return!1;const r=t*i.stats.taken;s.hp-=r,s.iframes=.7,s.flash=.25;const a=Math.hypot(s.x-e,s.y-n)||1;return s.kvx+=(s.x-e)/a*160,s.kvy+=(s.y-n)/a*160,Zt(i,{t:"hurt",x:s.x,y:s.y,a:r}),s.hp<=0&&(s.hp=0,i.state="dead",i.deathTimer=0,Zt(i,{t:"dead",x:s.x,y:s.y})),!0}function Lf(i,t){const e=i.player;i.state==="playing"&&(e.hp-=t*i.stats.taken,e.flash=Math.max(e.flash,.1),Zt(i,{t:"hurt",x:e.x,y:e.y,a:t*i.stats.taken,b:1}),e.hp<=0&&(e.hp=0,i.state="dead",Zt(i,{t:"dead",x:e.x,y:e.y})))}function ns(i,t,e,n=t.x,s=t.y){if(!t.alive||e<=0)return!1;const r=Math.min(e,t.hp);return i.damageDealt+=r,t.hp-=e,t.flash=.09,Zt(i,{t:"hit",x:n,y:s,a:e,s:t.kind}),t.hp<=0?(Df(i,t),!0):!1}function wh(i,t){const e=i.player;for(e.xp+=t;e.xp>=e.xpNext&&e.level<40;)e.xp-=e.xpNext,e.level++,e.xpNext=xh(e.level),i.pendingLevels++,Zt(i,{t:"levelup",x:e.x,y:e.y,a:e.level});e.level>=40&&(e.xp=Math.min(e.xp,e.xpNext-1))}function Df(i,t){t.alive=!1,i.kills++,i.killsBy[t.kind]=(i.killsBy[t.kind]??0)+1,i.chain++,i.chainTimer=1.5,i.chain>i.maxChain&&(i.maxChain=i.chain),i.chain%10===0&&Zt(i,{t:"chain",x:i.player.x,y:i.player.y,a:i.chain});const e=i.stats.luck,n=di[t.kind];if(Zt(i,{t:"kill",x:t.x,y:t.y,a:t.r,b:t.elite?1:0,s:t.kind}),t.noEss||Ho(i,Ju(i.levels,t.ess,i.chain)),kn(i,"mote",t.x,t.y,t.xp),t.kind==="warden"){i.bossesKilled++,i.bossAlive=!1,Zt(i,{t:"bossDown",x:t.x,y:t.y,a:t.tier});for(let a=0;a<6;a++)kn(i,"mote",t.x,t.y,t.xp/6,60);for(let a=0;a<15*t.tier;a++)kn(i,"shard",t.x,t.y,1,70);kn(i,"chest",t.x,t.y,1,20);for(const a of i.enemies.list)a.alive&&a.kind!=="warden"&&a.t<8&&a.kind==="swarm"&&(a.alive=!1,i.kills++,i.killsBy.swarm=(i.killsBy.swarm??0)+1,kn(i,"mote",a.x,a.y,a.xp),Zt(i,{t:"kill",x:a.x,y:a.y,a:a.r,b:0,s:"swarm"}));t.tier>=4&&(i.state="won",i.winReason="Final Warden destroyed",Zt(i,{t:"win",x:t.x,y:t.y}));return}if(t.kind==="cleaver")for(let a=0;a<2&&!(i.enemies.count>=160);a++){const o=Je(i.rng)*Math.PI*2,l=Bs(i,"splitlet",t.x+Math.cos(o)*10,t.y+Math.sin(o)*10);l.kx=Math.cos(o)*160,l.ky=Math.sin(o)*160}const s=t.elite?1:n.shard*(1+e);Sr(i.rng,s)&&kn(i,"shard",t.x,t.y,1),t.elite&&Sr(i.rng,.5)&&kn(i,"shard",t.x,t.y,1);const r=t.elite?.08:.0035*(1+e);Sr(i.rng,r)&&kn(i,"chest",t.x,t.y,1)}function Qr(i,t,e){const n=i.player;if(t.hasAim)return{x:t.aimX,y:t.aimY,e:Yi(i,t.aimX,t.aimY,120)};const s=Yi(i,n.x,n.y,e);return s?{x:s.x,y:s.y,e:s}:null}function If(i,t,e){const n=i.player,s=i.levels,r=i.stats.cdMul,a=i.stats.dmgMul;if(n.pulseCd-=e,n.homingCd-=e,n.lanceCd-=e,n.chainCd-=e,n.pulseCd<=0){const o=Qr(i,t,560);if(o){const l=Math.atan2(o.y-n.y,o.x-n.x),h=s.pulse>=5?3:s.pulse>=3?2:1,c=(8+2.5*(s.pulse-1))*a;for(let u=0;u<h;u++)Ga(i,n.x+Math.cos(l)*14,n.y+Math.sin(l)*14,l+(u-(h-1)/2)*.14,520,c,1.1,0,0,!1);n.facing=l,Zt(i,{t:"shot",x:n.x,y:n.y,a:0}),n.pulseCd=.55*r}else n.pulseCd=.1}if(s.homing>0&&n.homingCd<=0){const o=Qr(i,t,560);if(o){const l=1+Math.floor((s.homing-1)/2),h=(11+3*s.homing)*a,c=fi(s,"seekerLance")?2:0,u=Math.atan2(o.y-n.y,o.x-n.x);for(let f=0;f<l;f++)Ga(i,n.x,n.y,u+(f-(l-1)/2)*.7+(l===1?.5:0),300,h,2.5,1,c,!0);Zt(i,{t:"shot",x:n.x,y:n.y,a:1}),n.homingCd=1.6*r}else n.homingCd=.2}if(s.pierce>0&&n.lanceCd<=0){const o=Qr(i,t,520);if(o){const l=Math.atan2(o.y-n.y,o.x-n.x),h=s.pierce>=4?2:1,c=(16+6*s.pierce)*a*(fi(s,"seekerLance")?1.25:1);for(let u=0;u<h;u++)Uf(i,l+(h===2?u===0?-.12:.12:0),c);n.lanceCd=2*r}else n.lanceCd=.2}if(s.chain>0&&n.chainCd<=0){const o=t.hasAim?Yi(i,t.aimX,t.aimY,160):Yi(i,n.x,n.y,400);o?(Nf(i,o),n.chainCd=1.7*r):n.chainCd=.2}}function Uf(i,t,e){const n=i.player,s=520,r=Math.cos(t),a=Math.sin(t);for(const o of i.enemies.list){if(!o.alive)continue;const l=o.x-n.x,h=o.y-n.y,c=l*r+h*a;if(c<0||c>s+o.r)continue;Math.abs(l*-a+h*r)<=9+o.r&&ns(i,o,e)}Zt(i,{t:"beam",x:n.x,y:n.y,a:n.x+r*s,b:n.y+a*s})}function Nf(i,t){const e=i.player,n=i.levels,s=fi(n,"leechArc"),r=2+n.chain+(s?2:0),a=(10+3.5*n.chain)*i.stats.dmgMul,o=[],l=[e.x,e.y];let h=t;for(let c=0;c<=r&&h;c++){const u=h;l.push(u.x,u.y),o.push(u.id);const f=u.x,d=u.y;ns(i,u,a*Math.pow(.85,c)),s&&Ho(i,1),h=Yi(i,f,d,150,o)}Zt(i,{t:"arc",x:e.x,y:e.y,pts:l})}function Ff(i,t){const e=i.player,n=i.levels;if(n.orbit<=0)return;e.orbitAngle+=3.2*t;const s=n.orbit+1,r=fi(n,"bladedField")&&e.fieldOn,a=r?e.fieldR+10:64,o=(6+2.5*n.orbit)*i.stats.dmgMul*(r?1.6:1),l=i.scratch;for(let h=0;h<s;h++){const c=e.orbitAngle+h/s*Math.PI*2,u=e.x+Math.cos(c)*a,f=e.y+Math.sin(c)*a;i.grid.query(u,f,14,l);for(const d of l)if(!(!d.alive||d.bladeCd>0)&&!(Math.hypot(d.x-u,d.y-f)>d.r+10)){if(Th(d,u,f)){Zt(i,{t:"shieldBlock",x:u,y:f}),d.bladeCd=.2;continue}d.bladeCd=.35,ns(i,d,o,u,f)}}}function Of(i,t){const e=i.player,n=i.scratch,s=i.bullets.list;i.eBullets=0,i.pBullets=0;for(let r=s.length-1;r>=0;r--){const a=s[r];if(!a.alive){i.bullets.removeAt(r);continue}if(a.life-=t,a.life<=0||vf(i.arena,a.x,a.y)){a.alive=!1,i.bullets.removeAt(r);continue}if(a.friendly){if(a.homing){const l=Yi(i,a.x,a.y,420,a.hits);if(l){const h=Math.atan2(a.vy,a.vx);let u=Math.atan2(l.y-a.y,l.x-a.x)-h;for(;u>Math.PI;)u-=Math.PI*2;for(;u<-Math.PI;)u+=Math.PI*2;const f=Math.max(-a.turn*t,Math.min(a.turn*t,u)),d=Math.hypot(a.vx,a.vy);a.vx=Math.cos(h+f)*d,a.vy=Math.sin(h+f)*d}}a.x+=a.vx*t,a.y+=a.vy*t,i.grid.query(a.x,a.y,a.r,n);let o=!1;for(const l of n)if(!(!l.alive||a.hits.includes(l.id))&&!(Math.hypot(l.x-a.x,l.y-a.y)>l.r+a.r)){if(Th(l,a.x,a.y)){Zt(i,{t:"shieldBlock",x:a.x,y:a.y}),o=!0;break}if(ns(i,l,a.dmg,a.x,a.y),a.pierce>0)a.pierce--,a.hits.push(l.id),a.hits.length>8&&a.hits.shift();else{o=!0;break}}if(o){a.alive=!1,i.bullets.removeAt(r);continue}i.pBullets++}else{a.x+=a.vx*t,a.y+=a.vy*t;let o=!1;if(e.fieldOn&&Math.hypot(a.x-e.x,a.y-e.y)<e.fieldR+a.r){const h=Qu(a.dmg);e.reserve-=h,e.fieldSpent+=h,Zt(i,{t:"absorb",x:a.x,y:a.y}),o=!0}if(o||Math.hypot(a.x-e.x,a.y-e.y)<a.r+e.r*.8&&e.iframes<=0&&(Go(i,a.dmg,a.x-a.vx,a.y-a.vy),o=!0),o){a.alive=!1,i.bullets.removeAt(r);continue}i.eBullets++}}}function Ul(i,t){const e=i.levels,n=i.player;if(t<gh||e.detonation<=0)return;const s=ef(t,e.detonation,i.stats.dmgMul),r=nf(t);for(const a of i.enemies.list){if(!a.alive)continue;const o=Math.hypot(a.x-n.x,a.y-n.y);if(o<=r+a.r){const l=o||1;a.kx+=(a.x-n.x)/l*220,a.ky+=(a.y-n.y)/l*220,ns(i,a,s)}}for(const a of i.bullets.list)a.alive&&!a.friendly&&Math.hypot(a.x-n.x,a.y-n.y)<=r&&(a.alive=!1);if(fi(e,"clusterBurst")){const a=4+2*e.detonation;for(let o=0;o<a;o++)Ga(i,n.x,n.y,o/a*Math.PI*2,260,s*.25,2,2,0,!0)}fi(e,"voidReactor")&&Ho(i,t*.25),i.detonations++,Zt(i,{t:"detonate",x:n.x,y:n.y,a:r,b:s})}function kf(i,t,e){const n=i.player,s=i.levels;n.detCd=Math.max(0,n.detCd-e);const r=zr(i.levels);if(s.siphon<=0){n.reserve=0,n.fieldOn=!1;return}if(n.reserve>r&&(n.reserve=r),t.toggleHold&&s.bulwark>0&&(n.hold=!n.hold),t.release&&n.detCd<=0&&s.detonation>0){const l=n.fieldSpent+n.reserve;l>=gh&&(n.reserve=0,n.fieldOn=!1,n.fieldSpent=0,n.detCd=1,Ul(i,l))}if(s.bulwark<=0)return;if(!n.fieldOn){!n.hold&&n.reserve>=.15*r&&(n.fieldOn=!0,n.fieldR=wl(n.reserve,s.bulwark),Zt(i,{t:"fieldUp",x:n.x,y:n.y}));return}if(n.hold){n.fieldOn=!1;return}const a=wl(n.reserve,s.bulwark);n.fieldR=a;const o=ju(a)*e;if(n.reserve-=o,n.fieldSpent=Math.min(400,n.fieldSpent+o),n.fieldTick-=e,n.fieldTick<=0){n.fieldTick=.25;const l=fi(s,"bladedField"),h=tf(n.reserve,s.bulwark,l)*i.stats.dmgMul,c=i.scratch;i.grid.query(n.x,n.y,a,c);for(const u of c){if(!u.alive)continue;const f=Math.hypot(u.x-n.x,u.y-n.y);if(f<a+u.r){const d=f||1;u.kx+=(u.x-n.x)/d*140,u.ky+=(u.y-n.y)/d*140,ns(i,u,h)}}}if(n.reserve<=0){n.reserve=0,n.fieldOn=!1,Zt(i,{t:"fieldBreak",x:n.x,y:n.y,a});const l=n.fieldSpent;n.fieldSpent=0,Ul(i,l)}}function Bf(i,t,e,n,s,r){const a=s-e,o=r-n,l=a*a+o*o||1;let h=((i-e)*a+(t-n)*o)/l;return h=Math.max(0,Math.min(1,h)),Math.hypot(i-(e+h*a),t-(n+h*o))}function zf(i,t){const e=i.player,n=i.hazards.list;for(let s=n.length-1;s>=0;s--){const r=n[s];if(r.t+=t,r.kind==="pool"){const a=r.t-r.tele;if(a>=r.life){i.hazards.removeAt(s);continue}a>=0&&(r.r=44+34*Math.min(1,a/r.life),r.tick-=t,r.tick<=0&&(r.tick=.25,Math.hypot(e.x-r.x,e.y-r.y)<r.r+e.r*.5&&Lf(i,r.dps*.25)))}else{if(r.t>r.tele+.35){i.hazards.removeAt(s);continue}r.t>=r.tele&&!r.hit&&Bf(e.x,e.y,r.x,r.y,r.x2,r.y2)<r.width/2+e.r*.8&&Go(i,r.dps,e.x-1,e.y)&&(r.hit=!0)}}}function Hf(i,t){const e=i.player,n=i.pickups.list,s=i.stats.pickup;for(let r=n.length-1;r>=0;r--){const a=n[r];a.t+=t;const o=e.x-a.x,l=e.y-a.y,h=Math.hypot(o,l)||1;if(!a.pulled&&h<s&&(a.pulled=!0),a.pulled){const c=320+(a.t>2?100:0);a.x+=o/h*c*t,a.y+=l/h*c*t}else a.x+=a.vx*t,a.y+=a.vy*t,a.vx*=.9,a.vy*=.9;h<e.r+8&&(a.kind==="mote"?(wh(i,a.v),Zt(i,{t:"mote",x:a.x,y:a.y})):a.kind==="shard"?(i.shardsCollected+=a.v,Zt(i,{t:"shard",x:a.x,y:a.y})):(i.pendingChests++,i.shardsCollected+=10,Zt(i,{t:"chest",x:a.x,y:a.y})),i.pickups.removeAt(r))}}function Vo(i,t=[]){const e=i.pendingLevels<=0&&i.pendingChests>0,n=of({levels:i.levels,hpFrac:i.player.hp/i.player.maxHp,luck:i.stats.luck,unlocked:new Set(i.meta.unlocked),levelUps:i.levelUps,sinceDefensive:i.sinceDefensive,chest:e,exclude:t},i.rng);i.choice={ids:n,chest:e},i.state="levelup"}function Gf(i,t){const e=Vi[t],n=i.player;i.levels[t]++,i.picks.push(t),i.sinceDefensive=e.defensive?0:i.sinceDefensive+1;const s=n.maxHp;i.stats=mh(i.levels,i.meta,i.levels.overcharge),n.maxHp=i.stats.maxHp,n.hp=Math.min(n.maxHp,n.hp+Math.max(0,n.maxHp-s)),t==="repair"&&(n.hp=Math.min(n.maxHp,n.hp+n.maxHp*.35)),t==="cache"&&(i.shardsCollected+=8),t==="siphon"&&i.levels.siphon===1&&(n.reserve=Math.min(zr(i.levels),n.reserve+10))}function Wo(i,t){if(i.state!=="levelup"||!i.choice)return!1;const e=i.choice.ids[t];if(!e)return!1;const n=i.choice.chest;return Gf(i,e),i.levelUps++,n?i.pendingChests=Math.max(0,i.pendingChests-1):i.pendingLevels=Math.max(0,i.pendingLevels-1),i.choice=null,i.state="playing",(i.pendingLevels>0||i.pendingChests>0)&&Vo(i),!0}function Ah(i){if(i.state!=="levelup"||!i.choice||i.rerolls<=0)return!1;i.rerolls--;const t=i.choice.ids.slice();return Vo(i,t),!0}function Vf(i,t,e){const n=i.player;let s=t.mx,r=t.my;const a=Math.hypot(s,r);a>1&&(s/=a,r/=a),n.vx=s*i.stats.speed+n.kvx,n.vy=r*i.stats.speed+n.kvy;const o=Math.max(0,1-8*e);n.kvx*=o,n.kvy*=o,n.x+=n.vx*e,n.y+=n.vy*e,Hr(i.arena,n,n.r),a>.1&&(n.facing=Math.atan2(r,s)),n.iframes>0&&(n.iframes-=e),n.flash>0&&(n.flash-=e),i.stats.regen>0&&n.hp<n.maxHp&&(n.hp=Math.min(n.maxHp,n.hp+i.stats.regen*e))}function Wf(i){const t=i.scratch;for(const e of i.enemies.list)if(!(!e.alive||e.kind==="warden")){i.grid.query(e.x,e.y,e.r*2,t);for(const n of t){if(n===e||!n.alive||n.id<e.id||n.kind==="warden")continue;const s=n.x-e.x,r=n.y-e.y,a=(e.r+n.r)*.9,o=s*s+r*r;if(o<a*a&&o>1e-4){const l=Math.sqrt(o),h=(a-l)*.25,c=s/l,u=r/l;e.x-=c*h,e.y-=u*h,n.x+=c*h,n.y+=u*h}}}}function Xf(i){const t=i.player,e=i.scratch;i.grid.query(t.x,t.y,24,e);for(const n of e)n.alive&&Math.hypot(n.x-t.x,n.y-t.y)<n.r+t.r*.8&&Go(i,n.dmg,n.x,n.y)&&(n.kx-=(t.x-n.x)/(n.r+1)*40)}function Wa(i,t){if(i.state!=="playing"){i.state==="dead"&&(i.deathTimer+=Dr);return}const e=Dr;if(i.tick++,i.time+=e,Vf(i,t,e),Cf(i,e),i.chainTimer>0&&(i.chainTimer-=e,i.chainTimer<=0&&(i.chain=0)),i.arena==="foundry"&&i.wave>=3&&(i.laneTimer-=e,i.laneTimer<=0)){i.laneTimer=14;const a=Je(i.rng)<.5;_h(i,i.player.x+Ls(i.rng,-200,200),i.player.y+Ls(i.rng,-200,200),a,16)}for(const a of i.enemies.list)a.alive&&_f(i,a,e);i.grid.rebuild(i.enemies.list),Wf(i),If(i,t,e),Ff(i,e),kf(i,t,e),Of(i,e),zf(i,e),Xf(i),Hf(i,e),i.pendingXp>0&&(wh(i,i.pendingXp),i.pendingXp=0);const n=i.enemies.list;for(let a=n.length-1;a>=0;a--)n[a].alive||i.enemies.removeAt(a);const s=i.pickups.list;for(let a=s.length-1;a>=0;a--)s[a].alive||i.pickups.removeAt(a);const r=i.hazards.list;for(let a=r.length-1;a>=0;a--)r[a].alive||i.hazards.removeAt(a);i.state==="playing"&&(i.time>=ff?(i.state="won",i.winReason="Survived the full run",Zt(i,{t:"win",x:i.player.x,y:i.player.y})):(i.pendingLevels>0||i.pendingChests>0)&&Vo(i))}function qf(i){return i>=4500?"S":i>=3e3?"A":i>=1800?"B":i>=900?"C":"D"}function Yf(i){const t=i.state==="won",e=Math.floor(i.time),n=Math.floor(i.time/20),s=Math.floor(i.kills/40),r=10*i.bossesKilled,a=t?100:0,o=Math.floor(i.shardsCollected),l=i.kills+2*e+250*i.bossesKilled+i.player.level*20+(t?1500:0);return{won:t,time:e,wave:i.wave,kills:i.kills,killsBy:{...i.killsBy},damage:Math.round(i.damageDealt),level:i.player.level,picks:i.picks.slice(),bosses:i.bossesKilled,shardsCollected:o,shardsTime:n,shardsKills:s,shardsBosses:r,shardsWin:a,shardsTotal:o+n+s+r+a,score:l,rating:qf(l),maxChain:i.maxChain,detonations:i.detonations}}const Ch=[{id:"w_homing",name:"Seeker Swarm",desc:"Unlocks homing missiles in the upgrade pool. Pairs with Lance Beam and Detonation.",cost:[40],group:"weapon"},{id:"w_pierce",name:"Lance Beam",desc:"Unlocks the piercing beam. Pairs with Seeker Swarm.",cost:[60],group:"weapon"},{id:"w_chain",name:"Chain Arc",desc:"Unlocks lightning that jumps between enemies. Pairs with Siphon.",cost:[90],group:"weapon"},{id:"b_hp",name:"Hull Plating",desc:"Start every run with +10 max HP per tier.",cost:[50,90,140],group:"bonus"},{id:"b_speed",name:"Thruster Tuning",desc:"Start every run with +4% move speed per tier.",cost:[60,110],group:"bonus"},{id:"b_luck",name:"Lucky Charm",desc:"Start every run with +0.1 luck per tier.",cost:[70,120],group:"bonus"},{id:"b_reroll",name:"Spare Circuit",desc:"One extra reroll of upgrade cards each run.",cost:[80],group:"bonus"},{id:"s_siphon",name:"Primed Siphon",desc:"Start every run with Siphon level 1 already installed.",cost:[120],group:"start"},{id:"a_foundry",name:"Arena: Ring Foundry",desc:"A circular arena with periodic lightning lanes.",cost:[150],group:"arena"}];function sn(i,t){return i[t]??0}function Xo(i,t){const e=sn(i,t.id);return e>=t.cost.length?null:t.cost[e]}function Rh(i,t,e){const n=Xo(i,e);return n!==null&&t>=n}function $f(i,t,e){const n=Ch.find(r=>r.id===e);if(!n||!Rh(i,t,n))return null;const s=Xo(i,n)??0;return{owned:{...i,[e]:sn(i,e)+1},shards:t-s}}function Ph(i,t){return t==="hollow"||sn(i,"a_foundry")>0}function Lh(i,t){const e=Sh(),n=new Set(e.unlocked);return sn(i,"w_homing")&&n.add("homing"),sn(i,"w_pierce")&&n.add("pierce"),sn(i,"w_chain")&&n.add("chain"),{unlocked:[...n],hp:10*sn(i,"b_hp"),speed:.04*sn(i,"b_speed"),luck:.1*sn(i,"b_luck"),rerolls:1+sn(i,"b_reroll"),startSiphon:sn(i,"s_siphon")>0,arena:Ph(i,t)?t:"hollow"}}const ta=700,Zf=40,Kf=40,Jf=24,jf=12;class Qf{constructor(){Y(this,"particles",[]);Y(this,"pi",0);Y(this,"pops",[]);Y(this,"rings",[]);Y(this,"beams",[]);Y(this,"shocks",[]);Y(this,"flares",[]);Y(this,"trauma",0);Y(this,"flash",0);Y(this,"flashColor","#ffffff");Y(this,"banner","");Y(this,"bannerLife",0);Y(this,"bannerColor","#ffffff");Y(this,"slow",0);Y(this,"kills",0);Y(this,"fieldPulse",0);Y(this,"budget",1);for(let t=0;t<ta;t++)this.particles.push({alive:!1,x:0,y:0,z:0,vx:0,vy:0,vz:0,rx:0,ry:0,spin:0,life:0,max:1,size:2,color:"#fff",kind:0})}reset(){for(const t of this.particles)t.alive=!1;this.pops.length=0,this.rings.length=0,this.beams.length=0,this.shocks.length=0,this.flares.length=0,this.trauma=0,this.flash=0,this.bannerLife=0,this.slow=0,this.fieldPulse=0}burst(t,e,n,s,r,a=.5,o=2.5,l=0,h=8){const c=Math.max(n>0?1:0,Math.round(n*this.budget));for(let u=0;u<c;u++){const f=this.particles[this.pi];this.pi=(this.pi+1)%ta;const d=Math.random()*Math.PI*2,g=r*(.3+Math.random()*.7);f.alive=!0,f.x=t,f.y=e,f.z=h,f.vx=Math.cos(d)*g,f.vy=Math.sin(d)*g,f.vz=(l===1?140:60)+Math.random()*r*.7,f.rx=Math.random()*6.28,f.ry=Math.random()*6.28,f.spin=(Math.random()-.5)*18,f.life=f.max=a*(.6+Math.random()*.6),f.size=o*(.6+Math.random()*.8),f.color=s,f.kind=l}}ember(t,e,n){const s=this.particles[this.pi];this.pi=(this.pi+1)%ta,s.alive=!0,s.x=t+(Math.random()-.5)*8,s.y=e+(Math.random()-.5)*8,s.z=6+Math.random()*8,s.vx=(Math.random()-.5)*30,s.vy=(Math.random()-.5)*30,s.vz=20+Math.random()*40,s.rx=s.ry=0,s.spin=0,s.life=s.max=.35+Math.random()*.2,s.size=2.2,s.color=n,s.kind=0}ring(t,e,n,s,r,a,o=3){this.rings.length>=Kf&&this.rings.shift(),this.rings.push({x:t,y:e,r:n,grow:s,life:r,max:r,color:a,w:o})}beam(t,e,n,s,r=!1){this.beams.length>=Jf&&this.beams.shift(),this.beams.push({pts:t,life:e,max:e,color:n,w:s,jagged:r})}flare(t,e,n,s,r,a=600,o=90){this.flares.length>=jf&&this.flares.shift(),this.flares.push({x:t,y:e,h:o,color:n,power:s,life:r,max:r,range:a})}shock(t,e,n,s=.55){this.shocks.length>=4&&this.shocks.shift(),this.shocks.push({x:t,y:e,r:0,maxR:n,life:s,max:s})}pop(t,e,n,s,r=!1){this.pops.length>=Zf&&this.pops.shift(),this.pops.push({x:t+(Math.random()-.5)*14,y:e-8,text:n,life:.7,color:s,big:r})}announce(t,e="#ffffff",n=2.2){this.banner=t,this.bannerLife=n,this.bannerColor=e}handle(t,e){const n=e.reducedFlash,s=n?.5:1,r=a=>{e.shake&&(this.trauma=Math.min(1,this.trauma+a))};for(const a of t.events)switch(a.t){case"hit":{this.burst(a.x,a.y,3,"#ffffff",120,.25,2,0,12),e.numbers&&(a.a??0)>=1&&(this.pops.length<24||Math.random()<.4)&&this.pop(a.x,a.y,String(Math.round(a.a??0)),"#e9fbff");break}case"kill":{const o=a.s??"swarm",l=di[o]?.color??"#fff",h=(a.b?20:8)*s;this.burst(a.x,a.y,Math.round(h*.6),l,200,.9,o==="cleaver"?5:3.5,1,12),this.burst(a.x,a.y,Math.round(h*.5),l,240,.4,2.2,0,12),(a.a??0)>30&&this.ring(a.x,a.y,10,260,.5,l,4);break}case"hurt":r(.45),!n&&!a.b&&(this.flash=Math.max(this.flash,.25)),this.flashColor="#ff2e5a",this.burst(t.player.x,t.player.y,14,"#ff5d8f",200,.5,3,0,14),this.flare(t.player.x,t.player.y,"#ff2e5a",.8,.25,400,60);break;case"mote":this.burst(a.x,a.y,2,"#59ffb5",60,.25,2);break;case"shard":this.burst(a.x,a.y,6,"#ffd24a",120,.4,2.5),this.pop(a.x,a.y,"+1 shard","#ffd24a",!0);break;case"chest":this.burst(a.x,a.y,24,"#ffd24a",220,.7,3),this.ring(a.x,a.y,10,220,.6,"#ffd24a"),this.flare(a.x,a.y,"#ffc65a",1.2,.6,500),this.announce("Chest opened","#ffd24a",1.6);break;case"levelup":this.burst(t.player.x,t.player.y,Math.round(40*s),"#59ffb5",260,.8,3,0,16),this.ring(t.player.x,t.player.y,10,380,.7,"#59ffb5",5),this.flare(t.player.x,t.player.y,"#59ffb5",1,.6,500);break;case"fieldUp":this.ring(a.x,a.y,20,240,.4,"#35f2ff"),this.flare(a.x,a.y,"#35f2ff",.8,.4,500);break;case"fieldBreak":this.burst(a.x,a.y,Math.round(24*s),"#35f2ff",280,.6,3,0,20),r(.2);break;case"absorb":this.burst(a.x,a.y,4,"#35f2ff",120,.3,2,0,12),this.fieldPulse=Math.min(1,this.fieldPulse+.35);break;case"detonate":{const o=a.a??100;this.ring(a.x,a.y,10,o*3.2,.45,"#ff2e88",8),this.ring(a.x,a.y,10,o*2.2,.35,"#ffffff",4),this.burst(a.x,a.y,Math.round(60*s),"#ff7ac0",420,.8,3.5,0,16),this.flare(a.x,a.y,"#ff6ab4",n?2:4,.5,o*2.4,120),n||this.shock(a.x,a.y,o*1.4),r(Math.min(.9,.3+o/500)),n||(this.flash=Math.max(this.flash,.3),this.flashColor="#ff7ac0");break}case"beam":this.beam([a.x,a.y,a.a??a.x,a.b??a.y],.16,"#e9fbff",6);break;case"arc":a.pts&&this.beam(a.pts,.22,"#b58cff",3,!0);break;case"shieldBlock":this.burst(a.x,a.y,4,"#35f2ff",140,.2,2,0,12);break;case"telegraph":break;case"pool":this.ring(a.x,a.y,10,120,.5,"#8a5cff");break;case"lane":r(.05);break;case"bossWarn":this.announce(a.s==="FINAL WARDEN"?"Warning: the Final Warden":"Warning: Core Warden inbound","#ff2e88",3),r(.4);break;case"bossPhase":this.announce("The Warden opens up","#ff2e88",2),this.ring(a.x,a.y,20,500,.6,"#ff2e88",6),this.flare(a.x,a.y,"#ff2e88",2.5,.7,900,140),r(.5);break;case"bossDown":this.announce("Warden down","#ffd24a",3),this.burst(a.x,a.y,Math.round(150*s),"#ffffff",520,1.1,4,1,30),this.ring(a.x,a.y,10,700,.8,"#ffd24a",8),this.flare(a.x,a.y,"#ffe2a0",n?2.5:5,1.1,1200,160),n||this.shock(a.x,a.y,520,.8),r(.9),this.slow=.5;break;case"wave":(a.a??1)>1&&this.announce(`Wave ${a.a}`,"#7af8ff",2);break;case"chain":this.burst(t.player.x,t.player.y,12,"#ffd24a",200,.5,2.5,0,16),this.pop(t.player.x,t.player.y-30,`Chain ×${a.a}`,"#ffd24a",!0);break;case"dead":this.burst(a.x,a.y,Math.round(80*s),"#e9fbff",360,1,3.5,1,14),this.flare(a.x,a.y,"#e9fbff",2,.8,700),r(.8),this.slow=.8;break;case"win":this.announce("Victory","#59ffb5",3);break}}update(t){const e=620*t;for(const n of this.particles){if(!n.alive)continue;if(n.life-=t,n.life<=0){n.alive=!1;continue}n.x+=n.vx*t,n.y+=n.vy*t;const s=n.z>.5?1-2*t:1-7*t;n.vx*=s,n.vy*=s,n.vz-=n.kind===1?e:e*.35,n.z+=n.vz*t,n.z<0&&(n.z=0,n.vz=-n.vz*.32,n.spin*=.5),n.rx+=n.spin*t,n.ry+=n.spin*.7*t}for(let n=this.pops.length-1;n>=0;n--){const s=this.pops[n];s.life-=t,s.y-=40*t,s.life<=0&&this.pops.splice(n,1)}for(let n=this.rings.length-1;n>=0;n--){const s=this.rings[n];s.life-=t,s.r+=s.grow*t,s.life<=0&&this.rings.splice(n,1)}for(let n=this.beams.length-1;n>=0;n--)this.beams[n].life-=t,this.beams[n].life<=0&&this.beams.splice(n,1);for(let n=this.shocks.length-1;n>=0;n--){const s=this.shocks[n];s.life-=t,s.r=s.maxR*Math.sqrt(1-Math.max(0,s.life)/s.max),s.life<=0&&this.shocks.splice(n,1)}for(let n=this.flares.length-1;n>=0;n--)this.flares[n].life-=t,this.flares[n].life<=0&&this.flares.splice(n,1);this.trauma=Math.max(0,this.trauma-3*t),this.flash=Math.max(0,this.flash-2.5*t),this.fieldPulse=Math.max(0,this.fieldPulse-3*t),this.bannerLife>0&&(this.bannerLife-=t),this.slow>0&&(this.slow-=t)}}const td={low:{level:"low",maxDpr:1,dprScale:.75,bloom:"off",lights:1,particles:.4,reflections:"env",ripple:!1,anisotropy:1},medium:{level:"medium",maxDpr:1.25,dprScale:1,bloom:"half",lights:4,particles:.7,reflections:"env",ripple:!0,anisotropy:4},high:{level:"high",maxDpr:2,dprScale:1,bloom:"full",lights:8,particles:1,reflections:"planar",ripple:!0,anisotropy:8}},Dh={low:"Low",medium:"Medium",high:"High"};function ed(i){const t=typeof matchMedia=="function"&&matchMedia("(pointer: coarse)").matches;let e="";try{if(i){const s=i.getExtension("WEBGL_debug_renderer_info");e=String(s?i.getParameter(s.UNMASKED_RENDERER_WEBGL):i.getParameter(i.RENDERER))}}catch{e=""}if(/swiftshader|llvmpipe|software|basic render/i.test(e))return"low";const n=navigator.hardwareConcurrency||4;return t?/apple/i.test(e)&&n>=6?"medium":"low":/mali|adreno|powervr|videocore/i.test(e)?"low":/intel|uhd|iris|radeon\(tm\) graphics|vega \d/i.test(e)||n<=4?"medium":"high"}function nd(i,t){return i==="auto"?t:i}function id(i){return i==="high"?"medium":"low"}const xe={phosphor:"#cfe9ea",cyan:"#35f2ff",essence:"#59ffb5",signal:"#ff2e88",brass:"#d9a441"},Si='"Chakra Petch", "Segoe UI", system-ui, sans-serif',hs='"IBM Plex Sans", "Segoe UI", system-ui, sans-serif',Nl='"IBM Plex Mono", Consolas, "Courier New", monospace',ea=Math.PI*2,Fl={weapon:0,signature:1,passive:2,filler:3},sd=kr.filter(i=>i.kind!=="filler").sort((i,t)=>Fl[i.kind]-Fl[t.kind]);class Ih{constructor(){Y(this,"rim",null);Y(this,"rimW",0);Y(this,"rimH",0)}buildRim(t,e,n){const s=document.createElement("canvas");s.width=t,s.height=e;const r=s.getContext("2d");if(!r)return s;const a=r.createRadialGradient(t/2,e/2,Math.min(t,e)*.45,t/2,e/2,Math.hypot(t,e)*.56);a.addColorStop(0,"rgba(3,4,8,0)"),a.addColorStop(1,"rgba(3,4,8,0.62)"),r.fillStyle=a,r.fillRect(0,0,t,e);const o=r.createLinearGradient(0,0,0,40*n);o.addColorStop(0,"rgba(207,233,234,0.05)"),o.addColorStop(1,"rgba(207,233,234,0)"),r.fillStyle=o,r.fillRect(0,0,t,40*n);let l=7;const h=()=>(l=l*16807%2147483647,l/2147483647),c=t-26*n,u=92*n,f=(d,g,y,m,p)=>{let v=d,M=g;const x=6+Math.floor(h()*4);r.beginPath(),r.moveTo(v,M);for(let R=0;R<x;R++){y+=(h()-.5)*.7;const w=m/x*(.6+h()*.8);v+=Math.cos(y)*w,M+=Math.sin(y)*w,r.lineTo(v,M),p>0&&h()<.28&&f(v,M,y+(h()<.5?.9:-.9),m*.4,p-1)}r.stroke()};r.lineCap="round",r.lineJoin="round";for(let d=0;d<2;d++)l=7,r.strokeStyle=d===0?"rgba(0,0,0,0.35)":"rgba(207,233,234,0.17)",r.lineWidth=(d===0?2.4:1)*Math.max(1,n*.9),r.save(),d===0&&r.translate(1.2*n,1.2*n),f(c,u,Math.PI*.82,150*n,2),f(c,u,Math.PI*1.25,90*n,1),f(c,u,Math.PI*.55,70*n,1),r.restore();return r.fillStyle="rgba(207,233,234,0.2)",r.beginPath(),r.arc(c,u,2.4*n,0,ea),r.fill(),s}draw(t,e,n,s,r,a,o,l,h,c){const u=Math.max(.8,Math.min(1.9,Math.min(e,n)/760));if(r){const f=r.player;if(f.hp/f.maxHp<.3&&r.state==="playing"){const d=o.reducedFlash?.22:.18+.12*Math.sin(l*6),g=t.createRadialGradient(e/2,n/2,Math.min(e,n)*.38,e/2,n/2,Math.max(e,n)*.72);g.addColorStop(0,"rgba(255,46,90,0)"),g.addColorStop(1,`rgba(255,46,90,${d})`),t.fillStyle=g,t.fillRect(0,0,e,n)}c&&o.numbers&&this.drawPops(t,a,u,c)}r&&((!this.rim||this.rimW!==e||this.rimH!==n)&&(this.rim=this.buildRim(e,n,u),this.rimW=e,this.rimH=n),t.drawImage(this.rim,0,0)),r&&this.drawReadout(t,e,n,u,r,a,l),h&&h.active&&(t.strokeStyle="rgba(207,233,234,0.4)",t.lineWidth=2*s,t.beginPath(),t.arc(h.bx,h.by,56*s,0,ea),t.stroke(),t.fillStyle="rgba(53,242,255,0.45)",t.beginPath(),t.arc(h.kx,h.ky,24*s,0,ea),t.fill()),a.flash>0&&!o.reducedFlash&&(t.globalAlpha=Math.min(.35,a.flash),t.fillStyle=a.flashColor,t.fillRect(0,0,e,n),t.globalAlpha=1)}drawPops(t,e,n,s){t.textAlign="center",t.textBaseline="middle",t.lineJoin="round";for(const r of e.pops){const a=s(r.x,r.y,26);a&&(t.globalAlpha=Math.min(1,r.life/.3),t.font=`500 ${Math.round((r.big?15:12)*n)}px ${r.big?hs:Nl}`,t.strokeStyle="rgba(3,4,8,0.85)",t.lineWidth=3*n,t.strokeText(r.text,a.x,a.y),t.fillStyle=r.color,t.fillText(r.text,a.x,a.y))}t.globalAlpha=1,t.textBaseline="alphabetic"}text(t,e,n,s,r,a,o="left"){return t.font=r,t.textAlign=o,t.fillStyle="rgba(3,4,8,0.75)",t.fillText(e,n+1,s+1),t.fillStyle=a,t.fillText(e,n,s),t.measureText(e).width}bar(t,e,n,s,r,a,o,l,h){const c=Math.max(0,Math.min(1,a));t.fillStyle="rgba(7,8,12,0.66)",t.fillRect(e,n,s,r),t.fillStyle=o,t.fillRect(e,n,c*s,r),c>0&&c<1&&(t.fillStyle="rgba(255,255,255,0.75)",t.fillRect(e+c*s-Math.max(1,h),n,Math.max(1,h),r)),t.fillStyle="rgba(7,8,12,0.75)";const u=Math.max(1,Math.round(h*1.4));for(let f=1;f<l;f++)t.fillRect(Math.round(e+s*f/l),n,u,r);t.strokeStyle="rgba(207,233,234,0.32)",t.lineWidth=1,t.strokeRect(Math.round(e)-.5,Math.round(n)-.5,Math.round(s)+1,Math.round(r)+1)}keycap(t,e,n,s,r,a,o){const l=17*a;t.strokeStyle=o?"rgba(207,233,234,0.8)":"rgba(207,233,234,0.3)",t.lineWidth=1,t.fillStyle="rgba(7,8,12,0.7)",t.fillRect(s,r-l+3*a,l,l),t.strokeRect(Math.round(s)+.5,Math.round(r-l+3*a)+.5,Math.round(l),Math.round(l)),this.text(t,e,s+l/2,r-1*a,`600 ${Math.round(11*a)}px ${hs}`,o?xe.phosphor:"rgba(207,233,234,0.45)","center");const h=this.text(t,n,s+l+6*a,r-1*a,`400 ${Math.round(12*a)}px ${hs}`,o?xe.phosphor:"rgba(207,233,234,0.45)");return l+6*a+h+16*a}drawReadout(t,e,n,s,r,a,o){const l=r.player,h=Math.round(18*s),c=62*s,u=Math.min(220*s,e*.3),f=h+c,d=`600 ${Math.round(12*s)}px ${hs}`,g=I=>`500 ${Math.round(I*s)}px ${Nl}`,y="rgba(207,233,234,0.6)",m=(r.levels.siphon>0?r.levels.detonation>0||r.levels.bulwark>0?104:80:58)*s,p=t.createLinearGradient(0,0,f+u+120*s,0);p.addColorStop(0,"rgba(7,8,12,0.55)"),p.addColorStop(1,"rgba(7,8,12,0)"),t.fillStyle=p,t.fillRect(0,0,f+u+120*s,h+m),t.strokeStyle="rgba(207,233,234,0.45)",t.lineWidth=1,t.beginPath(),t.moveTo(h-8*s,h+14*s),t.lineTo(h-8*s,h-6*s),t.lineTo(h+12*s,h-6*s),t.stroke();let v=h+10*s;const M=l.hp/l.maxHp<.3;this.text(t,"Hull",h,v+1*s,d,M?xe.signal:xe.phosphor),this.bar(t,f,v-9*s,u,10*s,l.hp/l.maxHp,M?xe.signal:xe.phosphor,Math.max(4,Math.round(l.maxHp/20)),s);let x=f+u+8*s;if(x+=this.text(t,String(Math.ceil(l.hp)),x,v+1*s,g(14),M?xe.signal:xe.phosphor),this.text(t,`/${l.maxHp}`,x+2*s,v+1*s,g(11),y),v+=22*s,this.text(t,"Essence",h,v+1*s,d,xe.essence),this.bar(t,f,v-7*s,u,6*s,l.xp/l.xpNext,xe.essence,10,s),this.text(t,`Lv ${l.level}`,f+u+8*s,v+1*s,`600 ${Math.round(13*s)}px ${Si}`,xe.essence),r.levels.siphon>0){v+=22*s;const I=zr(r.levels),z=r.levels.bulwark>0?l.fieldOn?"Field up":l.hold?"Holding":"Charging":"Reserve",X=l.fieldOn?xe.cyan:l.hold?xe.brass:"#2fb6c9";this.text(t,z,h,v+1*s,d,X),this.bar(t,f,v-8*s,u,8*s,l.reserve/I,X,15,s),r.levels.bulwark>0&&(t.fillStyle="rgba(207,233,234,0.7)",t.fillRect(f+u*.15,v-11*s,Math.max(1,s),14*s));let O=f+u+8*s;if(O+=this.text(t,String(Math.floor(l.reserve)),O,v+1*s,g(13),X),this.text(t,`/${I}`,O+2*s,v+1*s,g(11),y),r.levels.bulwark>0){v+=25*s;let H=h;if(r.levels.detonation>0){const G=l.detCd<=0&&l.reserve+l.fieldSpent>=8;H+=this.keycap(t,"E",l.detCd>0?"Release cooling":"Release",H,v,s,G)}this.keycap(t,"Q",l.hold?"Stop holding":"Hold",H,v,s,!0)}}const R=Math.floor(r.time),w=String(Math.floor(R/60)).padStart(2,"0"),A=String(R%60).padStart(2,"0");this.text(t,`${w}:${A}`,e/2,h+22*s,`700 ${Math.round(30*s)}px ${Si}`,xe.phosphor,"center"),this.text(t,`Wave ${r.wave}`,e/2,h+42*s,d,"rgba(122,248,255,0.85)","center");for(const I of r.enemies.list){if(!I.alive||I.kind!=="warden")continue;const z=Math.min(520*s,e*.62),X=e/2-z/2,O=h+70*s,H=I.tier===4?"Final Warden":`Core Warden, tier ${I.tier}`;this.text(t,H,X,O-6*s,`600 ${Math.round(13*s)}px ${Si}`,I.phase?xe.signal:xe.phosphor),I.phase&&this.text(t,"Armour open",X+z,O-6*s,d,xe.signal,"right"),this.bar(t,X,O,z,8*s,I.hp/I.maxHp,I.phase?xe.signal:xe.phosphor,20,s),t.fillStyle=xe.phosphor,t.fillRect(X+z*.5-s*.5,O-4*s,Math.max(1,s),16*s);break}const L=this.text(t,"kills",e-h,h+20*s,`400 ${Math.round(12*s)}px ${hs}`,y,"right");this.text(t,String(r.kills),e-h-L-6*s,h+20*s,g(22),xe.phosphor,"right"),r.chain>=5&&this.text(t,`Chain ×${r.chain}`,e-h,h+42*s,`600 ${Math.round(14*s)}px ${Si}`,xe.brass,"right");const S=Math.round(28*s);let _=h,C=n-h-S-6*s;for(const I of sd){const z=r.levels[I.id];if(z<=0)continue;t.fillStyle="rgba(7,8,12,0.72)",t.fillRect(_,C,S,S),t.strokeStyle=I.color,t.globalAlpha=.7,t.lineWidth=1,t.strokeRect(_+.5,C+.5,S-1,S-1),t.globalAlpha=1,this.text(t,I.icon,_+S/2,C+S*.7,`700 ${Math.round(15*s)}px ${Si}`,I.color,"center");const X=I.maxLevel,O=(S-(X-1)*2*s)/X;for(let H=0;H<X;H++)t.fillStyle=H<z?I.color:"rgba(207,233,234,0.18)",t.fillRect(_+H*(O+2*s),C+S+3*s,O,2.5*s);_+=S+6*s,_>e*.45&&(_=h,C-=S+12*s)}const k=Br.filter(I=>I.needs.every(z=>r.levels[z]>0));if(k.length){t.font=d;const I=8*s,z=8*s,X=k.map(tt=>t.measureText(tt.name).width+z*2),O=X.reduce((tt,lt)=>tt+lt,0)+I*(k.length-1);let H=Math.max(e*.5-O/2,e*.48);H+O>e-h&&(H=e-h-O);const G=n-h-4*s;k.forEach((tt,lt)=>{t.fillStyle="rgba(7,8,12,0.7)",t.fillRect(H,G-16*s,X[lt],22*s),t.strokeStyle="rgba(217,164,65,0.75)",t.strokeRect(Math.round(H)+.5,Math.round(G-16*s)+.5,Math.round(X[lt]),Math.round(22*s)),this.text(t,tt.name,H+z,G,d,xe.brass),H+=X[lt]+I})}if(a.bannerLife>0&&a.banner){const I=Math.min(1,a.bannerLife/.5);t.globalAlpha=I;const z=n*.3,X=this.text(t,a.banner,e/2,z,`700 ${Math.round(34*s)}px ${Si}`,a.bannerColor,"center");t.fillStyle=a.bannerColor,t.globalAlpha=I*.6,t.fillRect(e/2-X/2,z+10*s,X,Math.max(1,s)),t.globalAlpha=1}}}const ue=Math.PI*2;class rd{constructor(t){Y(this,"kind","2d");Y(this,"visor",new Ih);Y(this,"canvas");Y(this,"ctx");Y(this,"W",0);Y(this,"H",0);Y(this,"S",1);Y(this,"dpr",1);Y(this,"camX",0);Y(this,"camY",0);Y(this,"glows",new Map);Y(this,"snap",!0);this.canvas=t;const e=t.getContext("2d",{alpha:!1});if(!e)throw new Error("Canvas 2D is not available in this browser.");this.ctx=e,this.resize()}resize(){this.dpr=Math.min(2,window.devicePixelRatio||1);const t=Math.max(1,Math.floor(window.innerWidth*this.dpr)),e=Math.max(1,Math.floor(window.innerHeight*this.dpr));(this.canvas.width!==t||this.canvas.height!==e)&&(this.canvas.width=t,this.canvas.height=e),this.W=t,this.H=e,this.S=Math.min(e/720,t/560)}resetCamera(){this.snap=!0}glow(t){let e=this.glows.get(t);if(!e){e=document.createElement("canvas"),e.width=e.height=64;const n=e.getContext("2d");if(n){const s=n.createRadialGradient(32,32,0,32,32,32);s.addColorStop(0,t),s.addColorStop(.35,t+"66"),s.addColorStop(1,t+"00"),n.fillStyle=s,n.fillRect(0,0,64,64)}this.glows.set(t,e)}return e}drawGlow(t,e,n,s,r=1){const a=this.ctx;a.globalAlpha=r,a.drawImage(this.glow(s),t-n,e-n,n*2,n*2)}draw(t,e,n,s,r){const a=this.ctx,{W:o,H:l}=this;a.setTransform(1,0,0,1,0,0),a.globalAlpha=1,a.globalCompositeOperation="source-over",a.fillStyle="#07080c",a.fillRect(0,0,o,l);let h=0,c=0;if(t){if(this.snap?(this.camX=t.player.x,this.camY=t.player.y,this.snap=!1):(this.camX+=(t.player.x-this.camX)*.12,this.camY+=(t.player.y-this.camY)*.12),n.shake&&e.trauma>0){const v=e.trauma*e.trauma*12*this.dpr;h=(Math.random()*2-1)*v,c=(Math.random()*2-1)*v}}else this.camX=Math.sin(s*.15)*300,this.camY=Math.cos(s*.11)*300;const u=t?t.arena:"hollow";a.setTransform(this.S,0,0,this.S,o/2-this.camX*this.S+h,l/2-this.camY*this.S+c);const f=o/this.S,d=l/this.S,g=this.camX-f/2-40,y=this.camX+f/2+40,m=this.camY-d/2-40,p=this.camY+d/2+40;this.drawFloor(u,g,y,m,p,s),t?(this.drawHazards(t,n,s),this.drawPickups(t,s,g,y,m,p),this.drawEnemies(t,n,s,g,y,m,p),this.drawBullets(t,n,g,y,m,p),this.drawPlayerStuff(t,s)):this.drawAttract(s),this.drawFx(e,g,y,m,p,n),a.setTransform(1,0,0,1,0,0),a.globalAlpha=1,a.globalCompositeOperation="source-over",this.visor.draw(a,o,l,this.dpr,t,e,n,s,r,null)}drawFloor(t,e,n,s,r,a){const o=this.ctx,l=t==="foundry"?"#ff8a3a":"#35f2ff";o.fillStyle="#0d0920",t==="foundry"?(o.beginPath(),o.arc(0,0,xn,0,ue),o.fill()):o.fillRect(-Me,-Me,Me*2,Me*2),o.lineWidth=1,o.strokeStyle=t==="foundry"?"rgba(255,138,58,0.08)":"rgba(120,140,255,0.09)",o.beginPath();const h=80;for(let c=Math.floor(e/h)*h;c<n;c+=h)o.moveTo(c,s),o.lineTo(c,r);for(let c=Math.floor(s/h)*h;c<r;c+=h)o.moveTo(e,c),o.lineTo(n,c);o.stroke(),o.save(),o.beginPath(),o.rect(e-400,s-400,n-e+800,r-s+800),t==="foundry"?o.arc(0,0,xn,0,ue,!0):o.rect(-Me,-Me,Me*2,Me*2),o.clip("evenodd"),o.fillStyle="#04030a",o.fillRect(e-400,s-400,n-e+800,r-s+800),o.restore(),o.strokeStyle=l,o.globalAlpha=.55+Math.sin(a*2)*.1,o.lineWidth=4,t==="foundry"?(o.beginPath(),o.arc(0,0,xn,0,ue),o.stroke()):o.strokeRect(-Me,-Me,Me*2,Me*2),o.globalAlpha=1}drawAttract(t){const e=this.ctx;e.globalCompositeOperation="lighter";const n=["#35f2ff","#ff2e88","#a6ff4d","#ffa23a","#8a5cff"];for(let s=0;s<14;s++){const r=t*(.1+s*.013)+s*1.7,a=160+s*40;this.drawGlow(this.camX+Math.cos(r)*a,this.camY+Math.sin(r*1.2)*a*.7,30+s%4*14,n[s%n.length],.35)}e.globalAlpha=1,e.globalCompositeOperation="source-over"}drawHazards(t,e,n){const s=this.ctx;for(const r of t.hazards.list)if(r.kind==="pool"){if(r.t<r.tele){const a=r.t/r.tele;s.strokeStyle="#c7a8ff",s.lineWidth=3,s.setLineDash([8,8]),s.globalAlpha=.4+.5*Math.sin(n*18),s.beginPath(),s.arc(r.x,r.y,44,0,ue),s.stroke(),s.setLineDash([]),s.globalAlpha=.25*a,s.fillStyle="#8a5cff",s.fill()}else{const a=s.createRadialGradient(r.x,r.y,0,r.x,r.y,r.r);a.addColorStop(0,"rgba(60,10,120,0.85)"),a.addColorStop(.8,"rgba(120,60,255,0.5)"),a.addColorStop(1,"rgba(190,140,255,0.85)"),s.globalAlpha=1,s.fillStyle=a,s.beginPath(),s.arc(r.x,r.y,r.r,0,ue),s.fill(),s.strokeStyle="#e6d4ff",s.lineWidth=3,s.stroke()}s.globalAlpha=1}else{const a=r.t>=r.tele;if(s.lineCap="butt",a)s.globalAlpha=1,s.strokeStyle="#fff6c4",s.lineWidth=r.width,s.beginPath(),s.moveTo(r.x,r.y),s.lineTo(r.x2,r.y2),s.stroke(),s.strokeStyle="#ffd24a",s.lineWidth=r.width*1.6,s.globalAlpha=.35,s.stroke();else{const o=.18+.25*(.5+.5*Math.sin(n*22));s.globalAlpha=o,s.strokeStyle="#ffd24a",s.lineWidth=r.width,s.beginPath(),s.moveTo(r.x,r.y),s.lineTo(r.x2,r.y2),s.stroke(),s.globalAlpha=.9,s.setLineDash([22,22]),s.lineWidth=3,s.strokeStyle="#ff2e88",s.beginPath(),s.moveTo(r.x,r.y),s.lineTo(r.x2,r.y2),s.stroke(),s.setLineDash([])}s.globalAlpha=1}}drawPickups(t,e,n,s,r,a){const o=this.ctx;o.globalCompositeOperation="lighter";for(const l of t.pickups.list)l.x<n||l.x>s||l.y<r||l.y>a||(l.kind==="mote"?this.drawGlow(l.x,l.y,9,"#59ffb5",.8):l.kind==="shard"?this.drawGlow(l.x,l.y,13,"#ffd24a",.9):this.drawGlow(l.x,l.y,28+Math.sin(e*6)*4,"#ffd24a",.8));o.globalAlpha=1,o.globalCompositeOperation="source-over";for(const l of t.pickups.list)l.x<n||l.x>s||l.y<r||l.y>a||(l.kind==="mote"?(o.fillStyle="#baffe0",o.beginPath(),o.moveTo(l.x,l.y-5),o.lineTo(l.x+3.5,l.y),o.lineTo(l.x,l.y+5),o.lineTo(l.x-3.5,l.y),o.closePath(),o.fill()):l.kind==="shard"?this.poly(l.x,l.y,7,6,e*2,"#ffe9a0","#ffd24a",2):(o.fillStyle="#2b2108",o.strokeStyle="#ffd24a",o.lineWidth=3,o.fillRect(l.x-12,l.y-9,24,18),o.strokeRect(l.x-12,l.y-9,24,18),o.fillStyle="#ffd24a",o.fillRect(l.x-3,l.y-3,6,6)))}poly(t,e,n,s,r,a,o,l){const h=this.ctx;h.beginPath();for(let c=0;c<s;c++){const u=r+c/s*ue,f=t+Math.cos(u)*n,d=e+Math.sin(u)*n;c===0?h.moveTo(f,d):h.lineTo(f,d)}h.closePath(),a&&(h.fillStyle=a,h.fill()),o&&(h.lineWidth=l,h.strokeStyle=o,h.stroke())}drawEnemies(t,e,n,s,r,a,o){const l=this.ctx,h=t.player;for(const c of t.enemies.list)!c.alive||c.x<s-200||c.x>r+200||c.y<a-200||c.y>o+200||this.drawTelegraph(c,n);for(const c of t.enemies.list){if(!c.alive||c.x<s||c.x>r||c.y<a||c.y>o)continue;const u=di[c.kind],f=c.flash>0?"#ffffff":u.color,d=Math.atan2(h.y-c.y,h.x-c.x);let g=c.x,y=c.y;c.kind==="rammer"&&c.state===1&&(g+=Math.sin(n*90)*2.5,y+=Math.cos(n*80)*2.5),l.lineWidth=2.5,l.lineJoin="round";const m=c.flash>0?"#ffffff":u.color+"44";switch(c.kind){case"swarm":case"splitlet":this.poly(g,y,c.r*1.15,3,d,m,f,2.5);break;case"spitter":this.poly(g,y,c.r*1.2,4,d,m,f,2.5),l.fillStyle=c.state===1&&Math.floor(n*24)%2===0?"#ffffff":f,l.beginPath(),l.arc(g,y,3.5,0,ue),l.fill();break;case"rammer":this.poly(g,y,c.r*1.25,4,d+Math.PI/4,m,f,3),l.fillStyle=f,l.beginPath(),l.moveTo(g+Math.cos(d)*(c.r+9),y+Math.sin(d)*(c.r+9)),l.lineTo(g+Math.cos(d+2.5)*c.r*.6,y+Math.sin(d+2.5)*c.r*.6),l.lineTo(g+Math.cos(d-2.5)*c.r*.6,y+Math.sin(d-2.5)*c.r*.6),l.closePath(),l.fill();break;case"cleaver":l.fillStyle=m,l.strokeStyle=f,l.lineWidth=5,l.beginPath(),l.arc(g,y,c.r-2,0,ue),l.fill(),l.stroke(),l.lineWidth=2,l.beginPath(),l.moveTo(g-5,y-c.r+3),l.lineTo(g+3,y-2),l.lineTo(g-3,y+4),l.lineTo(g+5,y+c.r-3),l.stroke();break;case"aegis":l.fillStyle=m,l.strokeStyle=f,l.lineWidth=2.5,l.beginPath(),l.arc(g,y,c.r,0,ue),l.fill(),l.stroke(),l.strokeStyle=c.flash>0?"#ffffff":"#bff9ff",l.lineWidth=6,l.lineCap="round",l.beginPath(),l.arc(g,y,c.r+9,c.shield-.87,c.shield+.87),l.stroke(),l.lineCap="butt";break;case"caster":this.poly(g,y,c.r*1.35,12,n*.8,null,f,2.5),l.fillStyle=m,l.beginPath(),l.arc(g,y,c.r*.7,0,ue),l.fill(),l.fillStyle=c.state===1?"#ffffff":f,l.beginPath(),l.arc(g,y,3.5,0,ue),l.fill();break;case"warden":{l.globalCompositeOperation="lighter",this.drawGlow(g,y,c.r*2.6,c.phase?"#ff2e88":"#8a8aff",.45+(c.state===1?.35*Math.sin(n*30):0)),l.globalAlpha=1,l.globalCompositeOperation="source-over",this.poly(g,y,c.r,8,n*.4,c.flash>0?"#fff":"rgba(20,10,40,0.9)",c.phase?"#ff2e88":"#ffffff",4),this.poly(g,y,c.r*.55,8,-n*.8,null,c.phase?"#ffa23a":"#7af8ff",3);for(let p=0;p<8;p++){const v=n*(c.phase?1.8:1)+p/8*ue;l.fillStyle=c.phase?"#ff2e88":"#e9fbff",l.beginPath(),l.arc(g+Math.cos(v)*(c.r+16),y+Math.sin(v)*(c.r+16),5,0,ue),l.fill()}l.fillStyle="#fff",l.beginPath(),l.arc(g,y,8,0,ue),l.fill();break}}c.elite&&(l.strokeStyle="#ffd24a",l.lineWidth=3,l.setLineDash([6,4]),l.beginPath(),l.arc(g,y,c.r+6,0,ue),l.stroke(),l.setLineDash([]))}}drawTelegraph(t,e){const n=this.ctx,s=.45+.4*Math.sin(e*40);if(t.kind==="spitter"&&t.state===1){const r=1-t.timer/.7;n.strokeStyle="#ff4fa0",n.globalAlpha=.25+.6*r,n.lineWidth=2+4*r,n.beginPath(),n.moveTo(t.x,t.y),n.lineTo(t.x+Math.cos(t.ang)*520,t.y+Math.sin(t.ang)*520),n.stroke(),n.globalAlpha=1}else if(t.kind==="rammer"&&t.state===1){n.fillStyle="#ffa23a",n.globalAlpha=.18+.2*s;const r=480*.55+40;n.save(),n.translate(t.x,t.y),n.rotate(t.ang),n.fillRect(0,-t.r,r,t.r*2),n.restore(),n.globalAlpha=1}else t.kind==="caster"&&t.state===1?(n.strokeStyle="#c7a8ff",n.globalAlpha=.7,n.lineWidth=2,n.setLineDash([6,6]),n.beginPath(),n.arc(t.tx,t.ty,44,0,ue),n.stroke(),n.setLineDash([]),n.globalAlpha=1):t.kind==="warden"&&t.state===1&&(n.strokeStyle="#ff2e88",n.globalAlpha=.5+.4*Math.sin(e*28),n.lineWidth=5,n.beginPath(),n.arc(t.x,t.y,t.r+30+(1-t.timer/.8)*30,0,ue),n.stroke(),t.tx===3&&(n.lineWidth=36,n.globalAlpha=.25,n.beginPath(),n.moveTo(t.x,t.y),n.lineTo(t.x+Math.cos(t.ang)*330,t.y+Math.sin(t.ang)*330),n.stroke()),n.globalAlpha=1)}drawBullets(t,e,n,s,r,a){const o=this.ctx;o.globalCompositeOperation="lighter";for(const l of t.bullets.list)l.x<n||l.x>s||l.y<r||l.y>a||(l.friendly?this.drawGlow(l.x,l.y,l.kind===1?16:12,l.kind===1?"#ffa23a":l.kind===2?"#ff7ac0":"#7af8ff",.9):this.drawGlow(l.x,l.y,l.r*3.4,l.kind===1?"#ffa23a":"#ff2e88",.85));o.globalAlpha=1,o.globalCompositeOperation="source-over";for(const l of t.bullets.list)if(!(l.x<n||l.x>s||l.y<r||l.y>a))if(l.friendly){o.strokeStyle=l.kind===1?"#ffd0a0":"#e9fbff",o.lineWidth=l.kind===1?4:3,o.lineCap="round";const h=Math.hypot(l.vx,l.vy)||1;o.beginPath(),o.moveTo(l.x-l.vx/h*9,l.y-l.vy/h*9),o.lineTo(l.x,l.y),o.stroke(),o.lineCap="butt"}else e.outline&&(o.fillStyle="#000000",o.beginPath(),o.arc(l.x,l.y,l.r+3,0,ue),o.fill()),o.fillStyle=l.kind===1?"#ffa23a":"#ff2e88",o.beginPath(),o.arc(l.x,l.y,l.r,0,ue),o.fill(),o.fillStyle="#ffffff",o.beginPath(),o.arc(l.x,l.y,l.r*.45,0,ue),o.fill()}drawPlayerStuff(t,e){const n=this.ctx,s=t.player,r=t.levels;if(t.state==="dead"&&t.deathTimer>.05)return;if(r.siphon>0&&r.bulwark>0)if(s.fieldOn){const o=s.fieldR,l=n.createRadialGradient(s.x,s.y,o*.4,s.x,s.y,o);l.addColorStop(0,"rgba(53,242,255,0.02)"),l.addColorStop(1,"rgba(53,242,255,0.28)"),n.fillStyle=l,n.beginPath(),n.arc(s.x,s.y,o,0,ue),n.fill(),n.strokeStyle="#9ff7ff",n.lineWidth=3,n.beginPath(),n.arc(s.x,s.y,o,0,ue),n.stroke(),n.setLineDash([10,14]),n.lineWidth=2,n.strokeStyle="#35f2ff",n.lineDashOffset=-e*40,n.beginPath(),n.arc(s.x,s.y,o-8,0,ue),n.stroke(),n.setLineDash([])}else s.hold&&(n.strokeStyle="#ffd24a",n.lineWidth=2,n.setLineDash([4,6]),n.beginPath(),n.arc(s.x,s.y,26+s.reserve*.1,0,ue),n.stroke(),n.setLineDash([]));if(r.orbit>0){const l=s.fieldOn&&r.bulwark>0&&r.siphon>0?s.fieldR+10:64,h=r.orbit+1;for(let c=0;c<h;c++){const u=s.orbitAngle+c/h*ue,f=s.x+Math.cos(u)*l,d=s.y+Math.sin(u)*l;n.save(),n.translate(f,d),n.rotate(u+Math.PI/2),n.fillStyle="#baffe0",n.strokeStyle="#59ffb5",n.lineWidth=2,n.beginPath(),n.moveTo(0,-11),n.lineTo(5,0),n.lineTo(0,9),n.lineTo(-5,0),n.closePath(),n.fill(),n.stroke(),n.restore()}}const a=s.iframes>0&&Math.floor(e*18)%2===0;n.globalCompositeOperation="lighter",this.drawGlow(s.x,s.y,34,s.flash>0?"#ff5d8f":"#35f2ff",.7),n.globalAlpha=1,n.globalCompositeOperation="source-over",a||(n.save(),n.translate(s.x,s.y),n.rotate(s.facing),n.fillStyle="#e9fbff",n.strokeStyle="#35f2ff",n.lineWidth=3,n.lineJoin="round",n.beginPath(),n.moveTo(15,0),n.lineTo(-11,11),n.lineTo(-5,0),n.lineTo(-11,-11),n.closePath(),n.fill(),n.stroke(),n.fillStyle="#ff2e88",n.beginPath(),n.arc(-1,0,3,0,ue),n.fill(),n.restore())}drawFx(t,e,n,s,r,a){const o=this.ctx;o.globalCompositeOperation="lighter";for(const l of t.rings)o.globalAlpha=Math.max(0,l.life/l.max)*(a.reducedFlash?.5:1),o.strokeStyle=l.color,o.lineWidth=l.w,o.beginPath(),o.arc(l.x,l.y,l.r,0,ue),o.stroke();for(const l of t.beams){o.globalAlpha=Math.max(0,l.life/l.max),o.strokeStyle=l.color,o.lineWidth=l.w,o.lineCap="round",o.lineJoin="round",o.beginPath();for(let h=0;h<l.pts.length;h+=2)h===0?o.moveTo(l.pts[0],l.pts[1]):o.lineTo(l.pts[h],l.pts[h+1]);o.stroke(),o.lineCap="butt"}for(const l of t.particles)!l.alive||l.x<e||l.x>n||l.y<s||l.y>r||(o.globalAlpha=Math.max(0,l.life/l.max),o.fillStyle=l.color,o.fillRect(l.x-l.size/2,l.y-l.size/2,l.size,l.size));o.globalAlpha=1,o.globalCompositeOperation="source-over",o.textAlign="center";for(const l of t.pops)o.globalAlpha=Math.min(1,l.life/.3),o.font=l.big?'600 16px "IBM Plex Sans", system-ui, sans-serif':'500 12px "IBM Plex Mono", monospace',o.fillStyle="#000",o.fillText(l.text,l.x+1,l.y+1),o.fillStyle=l.color,o.fillText(l.text,l.x,l.y);o.globalAlpha=1}screenToWorld(t,e){return{x:this.camX+(t*this.dpr-this.W/2)/this.S,y:this.camY+(e*this.dpr-this.H/2)/this.S}}resetRun(t){this.snap=!0}setQuality(t){}dispose(){this.glows.clear()}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qo="170",ad=0,Ol=1,od=2,Uh=1,ld=2,Rn=3,Kn=0,ke=1,Ke=2,Dn=0,Wi=1,Un=2,kl=3,Bl=4,cd=5,ai=100,hd=101,ud=102,fd=103,dd=104,pd=200,md=201,gd=202,vd=203,Xa=204,qa=205,xd=206,_d=207,yd=208,Md=209,Sd=210,bd=211,Ed=212,Td=213,wd=214,Ya=0,$a=1,Za=2,$i=3,Ka=4,Ja=5,ja=6,Qa=7,Nh=0,Ad=1,Cd=2,Zn=0,Fh=1,Oh=2,kh=3,Yo=4,Rd=5,Bh=6,zh=7,Hh=300,Zi=301,Ki=302,to=303,eo=304,Gr=306,Is=1e3,li=1001,no=1002,je=1003,Pd=1004,Ys=1005,_n=1006,na=1007,ci=1008,Nn=1009,Gh=1010,Vh=1011,Us=1012,$o=1013,pi=1014,yn=1015,pn=1016,Zo=1017,Ko=1018,Ji=1020,Wh=35902,Xh=1021,qh=1022,dn=1023,Yh=1024,$h=1025,Xi=1026,ji=1027,Jo=1028,jo=1029,Zh=1030,Qo=1031,tl=1033,Er=33776,Tr=33777,wr=33778,Ar=33779,io=35840,so=35841,ro=35842,ao=35843,oo=36196,lo=37492,co=37496,ho=37808,uo=37809,fo=37810,po=37811,mo=37812,go=37813,vo=37814,xo=37815,_o=37816,yo=37817,Mo=37818,So=37819,bo=37820,Eo=37821,Cr=36492,To=36494,wo=36495,Kh=36283,Ao=36284,Co=36285,Ro=36286,Ld=3200,Dd=3201,Jh=0,Id=1,qn="",Ve="srgb",is="srgb-linear",Vr="linear",ae="srgb",bi=7680,zl=519,Ud=512,Nd=513,Fd=514,jh=515,Od=516,kd=517,Bd=518,zd=519,Hl=35044,$s=35048,Gl="300 es",Ln=2e3,Ir=2001;class ss{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ie=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ia=Math.PI/180,Po=180/Math.PI;function rs(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ie[i&255]+Ie[i>>8&255]+Ie[i>>16&255]+Ie[i>>24&255]+"-"+Ie[t&255]+Ie[t>>8&255]+"-"+Ie[t>>16&15|64]+Ie[t>>24&255]+"-"+Ie[e&63|128]+Ie[e>>8&255]+"-"+Ie[e>>16&255]+Ie[e>>24&255]+Ie[n&255]+Ie[n>>8&255]+Ie[n>>16&255]+Ie[n>>24&255]).toLowerCase()}function Re(i,t,e){return Math.max(t,Math.min(e,i))}function Hd(i,t){return(i%t+t)%t}function sa(i,t,e){return(1-e)*i+e*t}function us(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function He(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class it{constructor(t=0,e=0){it.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ht{constructor(t,e,n,s,r,a,o,l,h){Ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,h)}set(t,e,n,s,r,a,o,l,h){const c=this.elements;return c[0]=t,c[1]=s,c[2]=o,c[3]=e,c[4]=r,c[5]=l,c[6]=n,c[7]=a,c[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],h=n[1],c=n[4],u=n[7],f=n[2],d=n[5],g=n[8],y=s[0],m=s[3],p=s[6],v=s[1],M=s[4],x=s[7],R=s[2],w=s[5],A=s[8];return r[0]=a*y+o*v+l*R,r[3]=a*m+o*M+l*w,r[6]=a*p+o*x+l*A,r[1]=h*y+c*v+u*R,r[4]=h*m+c*M+u*w,r[7]=h*p+c*x+u*A,r[2]=f*y+d*v+g*R,r[5]=f*m+d*M+g*w,r[8]=f*p+d*x+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8];return e*a*c-e*o*h-n*r*c+n*o*l+s*r*h-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],u=c*a-o*h,f=o*l-c*r,d=h*r-a*l,g=e*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return t[0]=u*y,t[1]=(s*h-c*n)*y,t[2]=(o*n-s*a)*y,t[3]=f*y,t[4]=(c*e-s*l)*y,t[5]=(s*r-o*e)*y,t[6]=d*y,t[7]=(n*l-h*e)*y,t[8]=(a*e-n*r)*y,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),h=Math.sin(r);return this.set(n*l,n*h,-n*(l*a+h*o)+a+t,-s*h,s*l,-s*(-h*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ra.makeScale(t,e)),this}rotate(t){return this.premultiply(ra.makeRotation(-t)),this}translate(t,e){return this.premultiply(ra.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ra=new Ht;function Qh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ur(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Gd(){const i=Ur("canvas");return i.style.display="block",i}const Vl={};function ys(i){i in Vl||(Vl[i]=!0,console.warn(i))}function Vd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Wd(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Xd(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const $t={enabled:!0,workingColorSpace:is,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ae&&(i.r=In(i.r),i.g=In(i.g),i.b=In(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ae&&(i.r=qi(i.r),i.g=qi(i.g),i.b=qi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===qn?Vr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function In(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function qi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Wl=[.64,.33,.3,.6,.15,.06],Xl=[.2126,.7152,.0722],ql=[.3127,.329],Yl=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$l=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);$t.define({[is]:{primaries:Wl,whitePoint:ql,transfer:Vr,toXYZ:Yl,fromXYZ:$l,luminanceCoefficients:Xl,workingColorSpaceConfig:{unpackColorSpace:Ve},outputColorSpaceConfig:{drawingBufferColorSpace:Ve}},[Ve]:{primaries:Wl,whitePoint:ql,transfer:ae,toXYZ:Yl,fromXYZ:$l,luminanceCoefficients:Xl,outputColorSpaceConfig:{drawingBufferColorSpace:Ve}}});let Ei;class qd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ei===void 0&&(Ei=Ur("canvas")),Ei.width=t.width,Ei.height=t.height;const n=Ei.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ei}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ur("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=In(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(In(e[n]/255)*255):e[n]=In(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Yd=0;class tu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=rs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(aa(s[a].image)):r.push(aa(s[a]))}else r=aa(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function aa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?qd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let $d=0;class Ne extends ss{constructor(t=Ne.DEFAULT_IMAGE,e=Ne.DEFAULT_MAPPING,n=li,s=li,r=_n,a=ci,o=dn,l=Nn,h=Ne.DEFAULT_ANISOTROPY,c=qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=rs(),this.name="",this.source=new tu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Hh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Is:t.x=t.x-Math.floor(t.x);break;case li:t.x=t.x<0?0:1;break;case no:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Is:t.y=t.y-Math.floor(t.y);break;case li:t.y=t.y<0?0:1;break;case no:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ne.DEFAULT_IMAGE=null;Ne.DEFAULT_MAPPING=Hh;Ne.DEFAULT_ANISOTROPY=1;class se{constructor(t=0,e=0,n=0,s=1){se.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,h=l[0],c=l[4],u=l[8],f=l[1],d=l[5],g=l[9],y=l[2],m=l[6],p=l[10];if(Math.abs(c-f)<.01&&Math.abs(u-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(c+f)<.1&&Math.abs(u+y)<.1&&Math.abs(g+m)<.1&&Math.abs(h+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(h+1)/2,x=(d+1)/2,R=(p+1)/2,w=(c+f)/4,A=(u+y)/4,L=(g+m)/4;return M>x&&M>R?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=w/n,r=A/n):x>R?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=w/s,r=L/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=A/r,s=L/r),this.set(n,s,r,e),this}let v=Math.sqrt((m-g)*(m-g)+(u-y)*(u-y)+(f-c)*(f-c));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(u-y)/v,this.z=(f-c)/v,this.w=Math.acos((h+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Zd extends ss{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new se(0,0,t,e),this.scissorTest=!1,this.viewport=new se(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ne(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new tu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qe extends Zd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class eu extends Ne{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=je,this.minFilter=je,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Kd extends Ne{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=je,this.minFilter=je,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],h=n[s+1],c=n[s+2],u=n[s+3];const f=r[a+0],d=r[a+1],g=r[a+2],y=r[a+3];if(o===0){t[e+0]=l,t[e+1]=h,t[e+2]=c,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=y;return}if(u!==y||l!==f||h!==d||c!==g){let m=1-o;const p=l*f+h*d+c*g+u*y,v=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const R=Math.sqrt(M),w=Math.atan2(R,p*v);m=Math.sin(m*w)/R,o=Math.sin(o*w)/R}const x=o*v;if(l=l*m+f*x,h=h*m+d*x,c=c*m+g*x,u=u*m+y*x,m===1-o){const R=1/Math.sqrt(l*l+h*h+c*c+u*u);l*=R,h*=R,c*=R,u*=R}}t[e]=l,t[e+1]=h,t[e+2]=c,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],h=n[s+2],c=n[s+3],u=r[a],f=r[a+1],d=r[a+2],g=r[a+3];return t[e]=o*g+c*u+l*d-h*f,t[e+1]=l*g+c*f+h*u-o*d,t[e+2]=h*g+c*d+o*f-l*u,t[e+3]=c*g-o*u-l*f-h*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,h=o(n/2),c=o(s/2),u=o(r/2),f=l(n/2),d=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*c*u+h*d*g,this._y=h*d*u-f*c*g,this._z=h*c*g+f*d*u,this._w=h*c*u-f*d*g;break;case"YXZ":this._x=f*c*u+h*d*g,this._y=h*d*u-f*c*g,this._z=h*c*g-f*d*u,this._w=h*c*u+f*d*g;break;case"ZXY":this._x=f*c*u-h*d*g,this._y=h*d*u+f*c*g,this._z=h*c*g+f*d*u,this._w=h*c*u-f*d*g;break;case"ZYX":this._x=f*c*u-h*d*g,this._y=h*d*u+f*c*g,this._z=h*c*g-f*d*u,this._w=h*c*u+f*d*g;break;case"YZX":this._x=f*c*u+h*d*g,this._y=h*d*u+f*c*g,this._z=h*c*g-f*d*u,this._w=h*c*u-f*d*g;break;case"XZY":this._x=f*c*u-h*d*g,this._y=h*d*u-f*c*g,this._z=h*c*g+f*d*u,this._w=h*c*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],h=e[2],c=e[6],u=e[10],f=n+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(c-l)*d,this._y=(r-h)*d,this._z=(a-s)*d}else if(n>o&&n>u){const d=2*Math.sqrt(1+n-o-u);this._w=(c-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+h)/d}else if(o>u){const d=2*Math.sqrt(1+o-n-u);this._w=(r-h)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+c)/d}else{const d=2*Math.sqrt(1+u-n-o);this._w=(a-s)/d,this._x=(r+h)/d,this._y=(l+c)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Re(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,h=e._z,c=e._w;return this._x=n*c+a*o+s*h-r*l,this._y=s*c+a*l+r*o-n*h,this._z=r*c+a*h+n*l-s*o,this._w=a*c-n*o-s*l-r*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const h=Math.sqrt(l),c=Math.atan2(h,o),u=Math.sin((1-e)*c)/h,f=Math.sin(e*c)/h;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Zl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Zl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,h=2*(a*s-o*n),c=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*h+a*u-o*c,this.y=n+l*c+o*h-r*u,this.z=s+l*u+r*c-a*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return oa.copy(this).projectOnVector(t),this.sub(oa)}reflect(t){return this.sub(oa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const oa=new D,Zl=new Jn;class _i{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ln):ln.fromBufferAttribute(r,a),ln.applyMatrix4(t.matrixWorld),this.expandByPoint(ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Zs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Zs.copy(n.boundingBox)),Zs.applyMatrix4(t.matrixWorld),this.union(Zs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ln),ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(fs),Ks.subVectors(this.max,fs),Ti.subVectors(t.a,fs),wi.subVectors(t.b,fs),Ai.subVectors(t.c,fs),Bn.subVectors(wi,Ti),zn.subVectors(Ai,wi),Qn.subVectors(Ti,Ai);let e=[0,-Bn.z,Bn.y,0,-zn.z,zn.y,0,-Qn.z,Qn.y,Bn.z,0,-Bn.x,zn.z,0,-zn.x,Qn.z,0,-Qn.x,-Bn.y,Bn.x,0,-zn.y,zn.x,0,-Qn.y,Qn.x,0];return!la(e,Ti,wi,Ai,Ks)||(e=[1,0,0,0,1,0,0,0,1],!la(e,Ti,wi,Ai,Ks))?!1:(Js.crossVectors(Bn,zn),e=[Js.x,Js.y,Js.z],la(e,Ti,wi,Ai,Ks))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(En[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),En[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),En[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),En[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),En[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),En[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),En[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),En[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(En),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const En=[new D,new D,new D,new D,new D,new D,new D,new D],ln=new D,Zs=new _i,Ti=new D,wi=new D,Ai=new D,Bn=new D,zn=new D,Qn=new D,fs=new D,Ks=new D,Js=new D,ti=new D;function la(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ti.fromArray(i,r);const o=s.x*Math.abs(ti.x)+s.y*Math.abs(ti.y)+s.z*Math.abs(ti.z),l=t.dot(ti),h=e.dot(ti),c=n.dot(ti);if(Math.max(-Math.max(l,h,c),Math.min(l,h,c))>o)return!1}return!0}const Jd=new _i,ds=new D,ca=new D;class zs{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Jd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ds.subVectors(t,this.center);const e=ds.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ds,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ca.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ds.copy(t.center).add(ca)),this.expandByPoint(ds.copy(t.center).sub(ca))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Tn=new D,ha=new D,js=new D,Hn=new D,ua=new D,Qs=new D,fa=new D;class nu{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Tn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Tn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Tn.copy(this.origin).addScaledVector(this.direction,e),Tn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ha.copy(t).add(e).multiplyScalar(.5),js.copy(e).sub(t).normalize(),Hn.copy(this.origin).sub(ha);const r=t.distanceTo(e)*.5,a=-this.direction.dot(js),o=Hn.dot(this.direction),l=-Hn.dot(js),h=Hn.lengthSq(),c=Math.abs(1-a*a);let u,f,d,g;if(c>0)if(u=a*l-o,f=a*o-l,g=r*c,u>=0)if(f>=-g)if(f<=g){const y=1/c;u*=y,f*=y,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+h}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+h;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+h;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+h):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+h):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+h);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ha).addScaledVector(js,f),d}intersectSphere(t,e){Tn.subVectors(t.center,this.origin);const n=Tn.dot(this.direction),s=Tn.dot(Tn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const h=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,f=this.origin;return h>=0?(n=(t.min.x-f.x)*h,s=(t.max.x-f.x)*h):(n=(t.max.x-f.x)*h,s=(t.min.x-f.x)*h),c>=0?(r=(t.min.y-f.y)*c,a=(t.max.y-f.y)*c):(r=(t.max.y-f.y)*c,a=(t.min.y-f.y)*c),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Tn)!==null}intersectTriangle(t,e,n,s,r){ua.subVectors(e,t),Qs.subVectors(n,t),fa.crossVectors(ua,Qs);let a=this.direction.dot(fa),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Hn.subVectors(this.origin,t);const l=o*this.direction.dot(Qs.crossVectors(Hn,Qs));if(l<0)return null;const h=o*this.direction.dot(ua.cross(Hn));if(h<0||l+h>a)return null;const c=-o*Hn.dot(fa);return c<0?null:this.at(c/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class te{constructor(t,e,n,s,r,a,o,l,h,c,u,f,d,g,y,m){te.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,h,c,u,f,d,g,y,m)}set(t,e,n,s,r,a,o,l,h,c,u,f,d,g,y,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=h,p[6]=c,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new te().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ci.setFromMatrixColumn(t,0).length(),r=1/Ci.setFromMatrixColumn(t,1).length(),a=1/Ci.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),h=Math.sin(s),c=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*c,d=a*u,g=o*c,y=o*u;e[0]=l*c,e[4]=-l*u,e[8]=h,e[1]=d+g*h,e[5]=f-y*h,e[9]=-o*l,e[2]=y-f*h,e[6]=g+d*h,e[10]=a*l}else if(t.order==="YXZ"){const f=l*c,d=l*u,g=h*c,y=h*u;e[0]=f+y*o,e[4]=g*o-d,e[8]=a*h,e[1]=a*u,e[5]=a*c,e[9]=-o,e[2]=d*o-g,e[6]=y+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*c,d=l*u,g=h*c,y=h*u;e[0]=f-y*o,e[4]=-a*u,e[8]=g+d*o,e[1]=d+g*o,e[5]=a*c,e[9]=y-f*o,e[2]=-a*h,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*c,d=a*u,g=o*c,y=o*u;e[0]=l*c,e[4]=g*h-d,e[8]=f*h+y,e[1]=l*u,e[5]=y*h+f,e[9]=d*h-g,e[2]=-h,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,d=a*h,g=o*l,y=o*h;e[0]=l*c,e[4]=y-f*u,e[8]=g*u+d,e[1]=u,e[5]=a*c,e[9]=-o*c,e[2]=-h*c,e[6]=d*u+g,e[10]=f-y*u}else if(t.order==="XZY"){const f=a*l,d=a*h,g=o*l,y=o*h;e[0]=l*c,e[4]=-u,e[8]=h*c,e[1]=f*u+y,e[5]=a*c,e[9]=d*u-g,e[2]=g*u-d,e[6]=o*c,e[10]=y*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(jd,t,Qd)}lookAt(t,e,n){const s=this.elements;return qe.subVectors(t,e),qe.lengthSq()===0&&(qe.z=1),qe.normalize(),Gn.crossVectors(n,qe),Gn.lengthSq()===0&&(Math.abs(n.z)===1?qe.x+=1e-4:qe.z+=1e-4,qe.normalize(),Gn.crossVectors(n,qe)),Gn.normalize(),tr.crossVectors(qe,Gn),s[0]=Gn.x,s[4]=tr.x,s[8]=qe.x,s[1]=Gn.y,s[5]=tr.y,s[9]=qe.y,s[2]=Gn.z,s[6]=tr.z,s[10]=qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],h=n[12],c=n[1],u=n[5],f=n[9],d=n[13],g=n[2],y=n[6],m=n[10],p=n[14],v=n[3],M=n[7],x=n[11],R=n[15],w=s[0],A=s[4],L=s[8],S=s[12],_=s[1],C=s[5],k=s[9],I=s[13],z=s[2],X=s[6],O=s[10],H=s[14],G=s[3],tt=s[7],lt=s[11],ft=s[15];return r[0]=a*w+o*_+l*z+h*G,r[4]=a*A+o*C+l*X+h*tt,r[8]=a*L+o*k+l*O+h*lt,r[12]=a*S+o*I+l*H+h*ft,r[1]=c*w+u*_+f*z+d*G,r[5]=c*A+u*C+f*X+d*tt,r[9]=c*L+u*k+f*O+d*lt,r[13]=c*S+u*I+f*H+d*ft,r[2]=g*w+y*_+m*z+p*G,r[6]=g*A+y*C+m*X+p*tt,r[10]=g*L+y*k+m*O+p*lt,r[14]=g*S+y*I+m*H+p*ft,r[3]=v*w+M*_+x*z+R*G,r[7]=v*A+M*C+x*X+R*tt,r[11]=v*L+M*k+x*O+R*lt,r[15]=v*S+M*I+x*H+R*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],h=t[13],c=t[2],u=t[6],f=t[10],d=t[14],g=t[3],y=t[7],m=t[11],p=t[15];return g*(+r*l*u-s*h*u-r*o*f+n*h*f+s*o*d-n*l*d)+y*(+e*l*d-e*h*f+r*a*f-s*a*d+s*h*c-r*l*c)+m*(+e*h*u-e*o*d-r*a*u+n*a*d+r*o*c-n*h*c)+p*(-s*o*c-e*l*u+e*o*f+s*a*u-n*a*f+n*l*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],u=t[9],f=t[10],d=t[11],g=t[12],y=t[13],m=t[14],p=t[15],v=u*m*h-y*f*h+y*l*d-o*m*d-u*l*p+o*f*p,M=g*f*h-c*m*h-g*l*d+a*m*d+c*l*p-a*f*p,x=c*y*h-g*u*h+g*o*d-a*y*d-c*o*p+a*u*p,R=g*u*l-c*y*l-g*o*f+a*y*f+c*o*m-a*u*m,w=e*v+n*M+s*x+r*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return t[0]=v*A,t[1]=(y*f*r-u*m*r-y*s*d+n*m*d+u*s*p-n*f*p)*A,t[2]=(o*m*r-y*l*r+y*s*h-n*m*h-o*s*p+n*l*p)*A,t[3]=(u*l*r-o*f*r-u*s*h+n*f*h+o*s*d-n*l*d)*A,t[4]=M*A,t[5]=(c*m*r-g*f*r+g*s*d-e*m*d-c*s*p+e*f*p)*A,t[6]=(g*l*r-a*m*r-g*s*h+e*m*h+a*s*p-e*l*p)*A,t[7]=(a*f*r-c*l*r+c*s*h-e*f*h-a*s*d+e*l*d)*A,t[8]=x*A,t[9]=(g*u*r-c*y*r-g*n*d+e*y*d+c*n*p-e*u*p)*A,t[10]=(a*y*r-g*o*r+g*n*h-e*y*h-a*n*p+e*o*p)*A,t[11]=(c*o*r-a*u*r-c*n*h+e*u*h+a*n*d-e*o*d)*A,t[12]=R*A,t[13]=(c*y*s-g*u*s+g*n*f-e*y*f-c*n*m+e*u*m)*A,t[14]=(g*o*s-a*y*s-g*n*l+e*y*l+a*n*m-e*o*m)*A,t[15]=(a*u*s-c*o*s+c*n*l-e*u*l-a*n*f+e*o*f)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,h=r*a,c=r*o;return this.set(h*a+n,h*o-s*l,h*l+s*o,0,h*o+s*l,c*o+n,c*l-s*a,0,h*l-s*o,c*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,h=r+r,c=a+a,u=o+o,f=r*h,d=r*c,g=r*u,y=a*c,m=a*u,p=o*u,v=l*h,M=l*c,x=l*u,R=n.x,w=n.y,A=n.z;return s[0]=(1-(y+p))*R,s[1]=(d+x)*R,s[2]=(g-M)*R,s[3]=0,s[4]=(d-x)*w,s[5]=(1-(f+p))*w,s[6]=(m+v)*w,s[7]=0,s[8]=(g+M)*A,s[9]=(m-v)*A,s[10]=(1-(f+y))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ci.set(s[0],s[1],s[2]).length();const a=Ci.set(s[4],s[5],s[6]).length(),o=Ci.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],cn.copy(this);const h=1/r,c=1/a,u=1/o;return cn.elements[0]*=h,cn.elements[1]*=h,cn.elements[2]*=h,cn.elements[4]*=c,cn.elements[5]*=c,cn.elements[6]*=c,cn.elements[8]*=u,cn.elements[9]*=u,cn.elements[10]*=u,e.setFromRotationMatrix(cn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Ln){const l=this.elements,h=2*r/(e-t),c=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let d,g;if(o===Ln)d=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ir)d=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=c,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Ln){const l=this.elements,h=1/(e-t),c=1/(n-s),u=1/(a-r),f=(e+t)*h,d=(n+s)*c;let g,y;if(o===Ln)g=(a+r)*u,y=-2*u;else if(o===Ir)g=r*u,y=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*h,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=y,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ci=new D,cn=new te,jd=new D(0,0,0),Qd=new D(1,1,1),Gn=new D,tr=new D,qe=new D,Kl=new te,Jl=new Jn;class mn{constructor(t=0,e=0,n=0,s=mn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],h=s[5],c=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Re(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Re(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Re(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Re(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(Re(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,h),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Re(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,h),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-c,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Kl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Kl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Jl.setFromEuler(this),this.setFromQuaternion(Jl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}mn.DEFAULT_ORDER="XYZ";class el{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let tp=0;const jl=new D,Ri=new Jn,wn=new te,er=new D,ps=new D,ep=new D,np=new Jn,Ql=new D(1,0,0),tc=new D(0,1,0),ec=new D(0,0,1),nc={type:"added"},ip={type:"removed"},Pi={type:"childadded",child:null},da={type:"childremoved",child:null};class Le extends ss{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tp++}),this.uuid=rs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Le.DEFAULT_UP.clone();const t=new D,e=new mn,n=new Jn,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new te},normalMatrix:{value:new Ht}}),this.matrix=new te,this.matrixWorld=new te,this.matrixAutoUpdate=Le.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new el,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ri.setFromAxisAngle(t,e),this.quaternion.multiply(Ri),this}rotateOnWorldAxis(t,e){return Ri.setFromAxisAngle(t,e),this.quaternion.premultiply(Ri),this}rotateX(t){return this.rotateOnAxis(Ql,t)}rotateY(t){return this.rotateOnAxis(tc,t)}rotateZ(t){return this.rotateOnAxis(ec,t)}translateOnAxis(t,e){return jl.copy(t).applyQuaternion(this.quaternion),this.position.add(jl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ql,t)}translateY(t){return this.translateOnAxis(tc,t)}translateZ(t){return this.translateOnAxis(ec,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(wn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?er.copy(t):er.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ps.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wn.lookAt(ps,er,this.up):wn.lookAt(er,ps,this.up),this.quaternion.setFromRotationMatrix(wn),s&&(wn.extractRotation(s.matrixWorld),Ri.setFromRotationMatrix(wn),this.quaternion.premultiply(Ri.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(nc),Pi.child=t,this.dispatchEvent(Pi),Pi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ip),da.child=t,this.dispatchEvent(da),da.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),wn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),wn.multiply(t.parent.matrixWorld)),t.applyMatrix4(wn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(nc),Pi.child=t,this.dispatchEvent(Pi),Pi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ps,t,ep),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ps,np,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let h=0,c=l.length;h<c;h++){const u=l[h];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),h=a(t.textures),c=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),h.length>0&&(n.textures=h),c.length>0&&(n.images=c),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const h in o){const c=o[h];delete c.metadata,l.push(c)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Le.DEFAULT_UP=new D(0,1,0);Le.DEFAULT_MATRIX_AUTO_UPDATE=!0;Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const hn=new D,An=new D,pa=new D,Cn=new D,Li=new D,Di=new D,ic=new D,ma=new D,ga=new D,va=new D,xa=new se,_a=new se,ya=new se;class fn{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),hn.subVectors(t,e),s.cross(hn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){hn.subVectors(s,e),An.subVectors(n,e),pa.subVectors(t,e);const a=hn.dot(hn),o=hn.dot(An),l=hn.dot(pa),h=An.dot(An),c=An.dot(pa),u=a*h-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(h*l-o*c)*f,g=(a*c-o*l)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Cn)===null?!1:Cn.x>=0&&Cn.y>=0&&Cn.x+Cn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Cn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Cn.x),l.addScaledVector(a,Cn.y),l.addScaledVector(o,Cn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return xa.setScalar(0),_a.setScalar(0),ya.setScalar(0),xa.fromBufferAttribute(t,e),_a.fromBufferAttribute(t,n),ya.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(xa,r.x),a.addScaledVector(_a,r.y),a.addScaledVector(ya,r.z),a}static isFrontFacing(t,e,n,s){return hn.subVectors(n,e),An.subVectors(t,e),hn.cross(An).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return hn.subVectors(this.c,this.b),An.subVectors(this.a,this.b),hn.cross(An).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return fn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return fn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return fn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return fn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return fn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Li.subVectors(s,n),Di.subVectors(r,n),ma.subVectors(t,n);const l=Li.dot(ma),h=Di.dot(ma);if(l<=0&&h<=0)return e.copy(n);ga.subVectors(t,s);const c=Li.dot(ga),u=Di.dot(ga);if(c>=0&&u<=c)return e.copy(s);const f=l*u-c*h;if(f<=0&&l>=0&&c<=0)return a=l/(l-c),e.copy(n).addScaledVector(Li,a);va.subVectors(t,r);const d=Li.dot(va),g=Di.dot(va);if(g>=0&&d<=g)return e.copy(r);const y=d*h-l*g;if(y<=0&&h>=0&&g<=0)return o=h/(h-g),e.copy(n).addScaledVector(Di,o);const m=c*g-d*u;if(m<=0&&u-c>=0&&d-g>=0)return ic.subVectors(r,s),o=(u-c)/(u-c+(d-g)),e.copy(s).addScaledVector(ic,o);const p=1/(m+y+f);return a=y*p,o=f*p,e.copy(n).addScaledVector(Li,a).addScaledVector(Di,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const iu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},nr={h:0,s:0,l:0};function Ma(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Dt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ve){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=$t.workingColorSpace){return this.r=t,this.g=e,this.b=n,$t.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=$t.workingColorSpace){if(t=Hd(t,1),e=Re(e,0,1),n=Re(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Ma(a,r,t+1/3),this.g=Ma(a,r,t),this.b=Ma(a,r,t-1/3)}return $t.toWorkingColorSpace(this,s),this}setStyle(t,e=Ve){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ve){const n=iu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=In(t.r),this.g=In(t.g),this.b=In(t.b),this}copyLinearToSRGB(t){return this.r=qi(t.r),this.g=qi(t.g),this.b=qi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ve){return $t.fromWorkingColorSpace(Ue.copy(this),t),Math.round(Re(Ue.r*255,0,255))*65536+Math.round(Re(Ue.g*255,0,255))*256+Math.round(Re(Ue.b*255,0,255))}getHexString(t=Ve){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.fromWorkingColorSpace(Ue.copy(this),e);const n=Ue.r,s=Ue.g,r=Ue.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,h;const c=(o+a)/2;if(o===a)l=0,h=0;else{const u=a-o;switch(h=c<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=h,t.l=c,t}getRGB(t,e=$t.workingColorSpace){return $t.fromWorkingColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=Ve){$t.fromWorkingColorSpace(Ue.copy(this),t);const e=Ue.r,n=Ue.g,s=Ue.b;return t!==Ve?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Vn),this.setHSL(Vn.h+t,Vn.s+e,Vn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Vn),t.getHSL(nr);const n=sa(Vn.h,nr.h,e),s=sa(Vn.s,nr.s,e),r=sa(Vn.l,nr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ue=new Dt;Dt.NAMES=iu;let sp=0;class Hs extends ss{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sp++}),this.uuid=rs(),this.name="",this.blending=Wi,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xa,this.blendDst=qa,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Dt(0,0,0),this.blendAlpha=0,this.depthFunc=$i,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bi,this.stencilZFail=bi,this.stencilZPass=bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Wi&&(n.blending=this.blending),this.side!==Kn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Xa&&(n.blendSrc=this.blendSrc),this.blendDst!==qa&&(n.blendDst=this.blendDst),this.blendEquation!==ai&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==$i&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==bi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==bi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==bi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class tn extends Hs{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.combine=Nh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const be=new D,ir=new it;class rn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Hl,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ir.fromBufferAttribute(this,e),ir.applyMatrix3(t),this.setXY(e,ir.x,ir.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=us(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=He(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=us(e,this.array)),e}setX(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=us(e,this.array)),e}setY(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=us(e,this.array)),e}setZ(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=us(e,this.array)),e}setW(t,e){return this.normalized&&(e=He(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=He(e,this.array),n=He(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=He(e,this.array),n=He(n,this.array),s=He(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=He(e,this.array),n=He(n,this.array),s=He(s,this.array),r=He(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Hl&&(t.usage=this.usage),t}}class su extends rn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ru extends rn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class pe extends rn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let rp=0;const nn=new te,Sa=new Le,Ii=new D,Ye=new _i,ms=new _i,Ae=new D;class Be extends ss{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rp++}),this.uuid=rs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Qh(t)?ru:su)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ht().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return nn.makeRotationFromQuaternion(t),this.applyMatrix4(nn),this}rotateX(t){return nn.makeRotationX(t),this.applyMatrix4(nn),this}rotateY(t){return nn.makeRotationY(t),this.applyMatrix4(nn),this}rotateZ(t){return nn.makeRotationZ(t),this.applyMatrix4(nn),this}translate(t,e,n){return nn.makeTranslation(t,e,n),this.applyMatrix4(nn),this}scale(t,e,n){return nn.makeScale(t,e,n),this.applyMatrix4(nn),this}lookAt(t){return Sa.lookAt(t),Sa.updateMatrix(),this.applyMatrix4(Sa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ii).negate(),this.translate(Ii.x,Ii.y,Ii.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new pe(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _i);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ye.setFromBufferAttribute(r),this.morphTargetsRelative?(Ae.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Ae),Ae.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Ae)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ms.setFromBufferAttribute(o),this.morphTargetsRelative?(Ae.addVectors(Ye.min,ms.min),Ye.expandByPoint(Ae),Ae.addVectors(Ye.max,ms.max),Ye.expandByPoint(Ae)):(Ye.expandByPoint(ms.min),Ye.expandByPoint(ms.max))}Ye.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ae.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ae));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let h=0,c=o.count;h<c;h++)Ae.fromBufferAttribute(o,h),l&&(Ii.fromBufferAttribute(t,h),Ae.add(Ii)),s=Math.max(s,n.distanceToSquared(Ae))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new rn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let L=0;L<n.count;L++)o[L]=new D,l[L]=new D;const h=new D,c=new D,u=new D,f=new it,d=new it,g=new it,y=new D,m=new D;function p(L,S,_){h.fromBufferAttribute(n,L),c.fromBufferAttribute(n,S),u.fromBufferAttribute(n,_),f.fromBufferAttribute(r,L),d.fromBufferAttribute(r,S),g.fromBufferAttribute(r,_),c.sub(h),u.sub(h),d.sub(f),g.sub(f);const C=1/(d.x*g.y-g.x*d.y);isFinite(C)&&(y.copy(c).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(C),m.copy(u).multiplyScalar(d.x).addScaledVector(c,-g.x).multiplyScalar(C),o[L].add(y),o[S].add(y),o[_].add(y),l[L].add(m),l[S].add(m),l[_].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let L=0,S=v.length;L<S;++L){const _=v[L],C=_.start,k=_.count;for(let I=C,z=C+k;I<z;I+=3)p(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const M=new D,x=new D,R=new D,w=new D;function A(L){R.fromBufferAttribute(s,L),w.copy(R);const S=o[L];M.copy(S),M.sub(R.multiplyScalar(R.dot(S))).normalize(),x.crossVectors(w,S);const C=x.dot(l[L])<0?-1:1;a.setXYZW(L,M.x,M.y,M.z,C)}for(let L=0,S=v.length;L<S;++L){const _=v[L],C=_.start,k=_.count;for(let I=C,z=C+k;I<z;I+=3)A(t.getX(I+0)),A(t.getX(I+1)),A(t.getX(I+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new rn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new D,r=new D,a=new D,o=new D,l=new D,h=new D,c=new D,u=new D;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),y=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,m),c.subVectors(a,r),u.subVectors(s,r),c.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),h.fromBufferAttribute(n,m),o.add(c),l.add(c),h.add(c),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,h.x,h.y,h.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),c.subVectors(a,r),u.subVectors(s,r),c.cross(u),n.setXYZ(f+0,c.x,c.y,c.z),n.setXYZ(f+1,c.x,c.y,c.z),n.setXYZ(f+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ae.fromBufferAttribute(t,e),Ae.normalize(),t.setXYZ(e,Ae.x,Ae.y,Ae.z)}toNonIndexed(){function t(o,l){const h=o.array,c=o.itemSize,u=o.normalized,f=new h.constructor(l.length*c);let d=0,g=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?d=l[y]*o.data.stride+o.offset:d=l[y]*c;for(let p=0;p<c;p++)f[g++]=h[d++]}return new rn(f,c,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Be,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],h=t(l,n);e.setAttribute(o,h)}const r=this.morphAttributes;for(const o in r){const l=[],h=r[o];for(let c=0,u=h.length;c<u;c++){const f=h[c],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const h=a[o];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(t[h]=l[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const h=n[l];t.data.attributes[l]=h.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],c=[];for(let u=0,f=h.length;u<f;u++){const d=h[u];c.push(d.toJSON(t.data))}c.length>0&&(s[l]=c,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const h in s){const c=s[h];this.setAttribute(h,c.clone(e))}const r=t.morphAttributes;for(const h in r){const c=[],u=r[h];for(let f=0,d=u.length;f<d;f++)c.push(u[f].clone(e));this.morphAttributes[h]=c}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let h=0,c=a.length;h<c;h++){const u=a[h];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const sc=new te,ei=new nu,sr=new zs,rc=new D,rr=new D,ar=new D,or=new D,ba=new D,lr=new D,ac=new D,cr=new D;class le extends Le{constructor(t=new Be,e=new tn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){lr.set(0,0,0);for(let l=0,h=r.length;l<h;l++){const c=o[l],u=r[l];c!==0&&(ba.fromBufferAttribute(u,t),a?lr.addScaledVector(ba,c):lr.addScaledVector(ba.sub(e),c))}e.add(lr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),sr.copy(n.boundingSphere),sr.applyMatrix4(r),ei.copy(t.ray).recast(t.near),!(sr.containsPoint(ei.origin)===!1&&(ei.intersectSphere(sr,rc)===null||ei.origin.distanceToSquared(rc)>(t.far-t.near)**2))&&(sc.copy(r).invert(),ei.copy(t.ray).applyMatrix4(sc),!(n.boundingBox!==null&&ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ei)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,h=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=f.length;g<y;g++){const m=f[g],p=a[m.materialIndex],v=Math.max(m.start,d.start),M=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let x=v,R=M;x<R;x+=3){const w=o.getX(x),A=o.getX(x+1),L=o.getX(x+2);s=hr(this,p,t,n,h,c,u,w,A,L),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),y=Math.min(o.count,d.start+d.count);for(let m=g,p=y;m<p;m+=3){const v=o.getX(m),M=o.getX(m+1),x=o.getX(m+2);s=hr(this,a,t,n,h,c,u,v,M,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=f.length;g<y;g++){const m=f[g],p=a[m.materialIndex],v=Math.max(m.start,d.start),M=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let x=v,R=M;x<R;x+=3){const w=x,A=x+1,L=x+2;s=hr(this,p,t,n,h,c,u,w,A,L),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),y=Math.min(l.count,d.start+d.count);for(let m=g,p=y;m<p;m+=3){const v=m,M=m+1,x=m+2;s=hr(this,a,t,n,h,c,u,v,M,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function ap(i,t,e,n,s,r,a,o){let l;if(t.side===ke?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Kn,o),l===null)return null;cr.copy(o),cr.applyMatrix4(i.matrixWorld);const h=e.ray.origin.distanceTo(cr);return h<e.near||h>e.far?null:{distance:h,point:cr.clone(),object:i}}function hr(i,t,e,n,s,r,a,o,l,h){i.getVertexPosition(o,rr),i.getVertexPosition(l,ar),i.getVertexPosition(h,or);const c=ap(i,t,e,n,rr,ar,or,ac);if(c){const u=new D;fn.getBarycoord(ac,rr,ar,or,u),s&&(c.uv=fn.getInterpolatedAttribute(s,o,l,h,u,new it)),r&&(c.uv1=fn.getInterpolatedAttribute(r,o,l,h,u,new it)),a&&(c.normal=fn.getInterpolatedAttribute(a,o,l,h,u,new D),c.normal.dot(n.direction)>0&&c.normal.multiplyScalar(-1));const f={a:o,b:l,c:h,normal:new D,materialIndex:0};fn.getNormal(rr,ar,or,f.normal),c.face=f,c.barycoord=u}return c}class oe extends Be{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],h=[],c=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new pe(h,3)),this.setAttribute("normal",new pe(c,3)),this.setAttribute("uv",new pe(u,2));function g(y,m,p,v,M,x,R,w,A,L,S){const _=x/A,C=R/L,k=x/2,I=R/2,z=w/2,X=A+1,O=L+1;let H=0,G=0;const tt=new D;for(let lt=0;lt<O;lt++){const ft=lt*C-I;for(let Pt=0;Pt<X;Pt++){const kt=Pt*_-k;tt[y]=kt*v,tt[m]=ft*M,tt[p]=z,h.push(tt.x,tt.y,tt.z),tt[y]=0,tt[m]=0,tt[p]=w>0?1:-1,c.push(tt.x,tt.y,tt.z),u.push(Pt/A),u.push(1-lt/L),H+=1}}for(let lt=0;lt<L;lt++)for(let ft=0;ft<A;ft++){const Pt=f+ft+X*lt,kt=f+ft+X*(lt+1),$=f+(ft+1)+X*(lt+1),et=f+(ft+1)+X*lt;l.push(Pt,kt,et),l.push(kt,$,et),G+=6}o.addGroup(d,G,S),d+=G,f+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Qi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Fe(i){const t={};for(let e=0;e<i.length;e++){const n=Qi(i[e]);for(const s in n)t[s]=n[s]}return t}function op(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function au(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const ts={clone:Qi,merge:Fe};var lp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ee extends Hs{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lp,this.fragmentShader=cp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Qi(t.uniforms),this.uniformsGroups=op(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class ou extends Le{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new te,this.projectionMatrix=new te,this.projectionMatrixInverse=new te,this.coordinateSystem=Ln}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Wn=new D,oc=new it,lc=new it;class We extends ou{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Po*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ia*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Po*2*Math.atan(Math.tan(ia*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Wn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Wn.x,Wn.y).multiplyScalar(-t/Wn.z),Wn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wn.x,Wn.y).multiplyScalar(-t/Wn.z)}getViewSize(t,e){return this.getViewBounds(t,oc,lc),e.subVectors(lc,oc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ia*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,h=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/h,s*=a.width/l,n*=a.height/h}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ui=-90,Ni=1;class hp extends Le{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new We(Ui,Ni,t,e);s.layers=this.layers,this.add(s);const r=new We(Ui,Ni,t,e);r.layers=this.layers,this.add(r);const a=new We(Ui,Ni,t,e);a.layers=this.layers,this.add(a);const o=new We(Ui,Ni,t,e);o.layers=this.layers,this.add(o);const l=new We(Ui,Ni,t,e);l.layers=this.layers,this.add(l);const h=new We(Ui,Ni,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const h of e)this.remove(h);if(t===Ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ir)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,h,c]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,h),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),t.render(e,c),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class lu extends Ne{constructor(t,e,n,s,r,a,o,l,h,c){t=t!==void 0?t:[],e=e!==void 0?e:Zi,super(t,e,n,s,r,a,o,l,h,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class up extends Qe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new lu(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:_n}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new oe(5,5,5),r=new Ee({name:"CubemapFromEquirect",uniforms:Qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ke,blending:Dn});r.uniforms.tEquirect.value=e;const a=new le(s,r),o=e.minFilter;return e.minFilter===ci&&(e.minFilter=_n),new hp(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const Ea=new D,fp=new D,dp=new Ht;class Pn{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ea.subVectors(n,e).cross(fp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ea),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||dp.getNormalMatrix(t),s=this.coplanarPoint(Ea).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ni=new zs,ur=new D;class nl{constructor(t=new Pn,e=new Pn,n=new Pn,s=new Pn,r=new Pn,a=new Pn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ln){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],h=s[4],c=s[5],u=s[6],f=s[7],d=s[8],g=s[9],y=s[10],m=s[11],p=s[12],v=s[13],M=s[14],x=s[15];if(n[0].setComponents(l-r,f-h,m-d,x-p).normalize(),n[1].setComponents(l+r,f+h,m+d,x+p).normalize(),n[2].setComponents(l+a,f+c,m+g,x+v).normalize(),n[3].setComponents(l-a,f-c,m-g,x-v).normalize(),n[4].setComponents(l-o,f-u,m-y,x-M).normalize(),e===Ln)n[5].setComponents(l+o,f+u,m+y,x+M).normalize();else if(e===Ir)n[5].setComponents(o,u,y,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(t){return ni.center.set(0,0,0),ni.radius=.7071067811865476,ni.applyMatrix4(t.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(ur.x=s.normal.x>0?t.max.x:t.min.x,ur.y=s.normal.y>0?t.max.y:t.min.y,ur.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ur)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function cu(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function pp(i){const t=new WeakMap;function e(o,l){const h=o.array,c=o.usage,u=h.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,h,c),o.onUploadCallback();let d;if(h instanceof Float32Array)d=i.FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)d=i.SHORT;else if(h instanceof Uint32Array)d=i.UNSIGNED_INT;else if(h instanceof Int32Array)d=i.INT;else if(h instanceof Int8Array)d=i.BYTE;else if(h instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:f,type:d,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,h){const c=l.array,u=l.updateRanges;if(i.bindBuffer(h,o),u.length===0)i.bufferSubData(h,0,c);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],y=u[d];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++f,u[f]=y)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const y=u[d];i.bufferSubData(h,y.start*c.BYTES_PER_ELEMENT,c,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=t.get(o);(!c||c.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const h=t.get(o);if(h===void 0)t.set(o,e(o,l));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,o,l),h.version=o.version}}return{get:s,remove:r,update:a}}class Oe extends Be{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),h=o+1,c=l+1,u=t/o,f=e/l,d=[],g=[],y=[],m=[];for(let p=0;p<c;p++){const v=p*f-a;for(let M=0;M<h;M++){const x=M*u-r;g.push(x,-v,0),y.push(0,0,1),m.push(M/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<o;v++){const M=v+h*p,x=v+h*(p+1),R=v+1+h*(p+1),w=v+1+h*p;d.push(M,x,w),d.push(x,R,w)}this.setIndex(d),this.setAttribute("position",new pe(g,3)),this.setAttribute("normal",new pe(y,3)),this.setAttribute("uv",new pe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oe(t.width,t.height,t.widthSegments,t.heightSegments)}}var mp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,vp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_p=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Sp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ep=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Tp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ap=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Cp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Rp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Pp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Lp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Dp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ip=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Up=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Np=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Fp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Op=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,kp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Bp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,zp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Hp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xp="gl_FragColor = linearToOutputTexel( gl_FragColor );",qp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,$p=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Zp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Kp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Jp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,jp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,em=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,im=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,am=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,om=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,lm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,um=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,dm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,pm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,mm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,gm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_m=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ym=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Mm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Em=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Am=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Cm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Rm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Lm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Im=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Um=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Om=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,km=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Hm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Wm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ym=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$m=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Km=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Jm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,jm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Qm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,t0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,e0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,n0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,i0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,s0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,r0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,a0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,o0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,l0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,c0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,h0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,u0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,f0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,d0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const p0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,m0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,g0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,v0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,x0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,y0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,M0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,S0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,b0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,E0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,T0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,A0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,C0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,R0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,L0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,D0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,I0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,U0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,N0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,F0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,O0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,k0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,B0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,z0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,H0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,G0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,V0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,W0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,X0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,q0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Y0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vt={alphahash_fragment:mp,alphahash_pars_fragment:gp,alphamap_fragment:vp,alphamap_pars_fragment:xp,alphatest_fragment:_p,alphatest_pars_fragment:yp,aomap_fragment:Mp,aomap_pars_fragment:Sp,batching_pars_vertex:bp,batching_vertex:Ep,begin_vertex:Tp,beginnormal_vertex:wp,bsdfs:Ap,iridescence_fragment:Cp,bumpmap_pars_fragment:Rp,clipping_planes_fragment:Pp,clipping_planes_pars_fragment:Lp,clipping_planes_pars_vertex:Dp,clipping_planes_vertex:Ip,color_fragment:Up,color_pars_fragment:Np,color_pars_vertex:Fp,color_vertex:Op,common:kp,cube_uv_reflection_fragment:Bp,defaultnormal_vertex:zp,displacementmap_pars_vertex:Hp,displacementmap_vertex:Gp,emissivemap_fragment:Vp,emissivemap_pars_fragment:Wp,colorspace_fragment:Xp,colorspace_pars_fragment:qp,envmap_fragment:Yp,envmap_common_pars_fragment:$p,envmap_pars_fragment:Zp,envmap_pars_vertex:Kp,envmap_physical_pars_fragment:om,envmap_vertex:Jp,fog_vertex:jp,fog_pars_vertex:Qp,fog_fragment:tm,fog_pars_fragment:em,gradientmap_pars_fragment:nm,lightmap_pars_fragment:im,lights_lambert_fragment:sm,lights_lambert_pars_fragment:rm,lights_pars_begin:am,lights_toon_fragment:lm,lights_toon_pars_fragment:cm,lights_phong_fragment:hm,lights_phong_pars_fragment:um,lights_physical_fragment:fm,lights_physical_pars_fragment:dm,lights_fragment_begin:pm,lights_fragment_maps:mm,lights_fragment_end:gm,logdepthbuf_fragment:vm,logdepthbuf_pars_fragment:xm,logdepthbuf_pars_vertex:_m,logdepthbuf_vertex:ym,map_fragment:Mm,map_pars_fragment:Sm,map_particle_fragment:bm,map_particle_pars_fragment:Em,metalnessmap_fragment:Tm,metalnessmap_pars_fragment:wm,morphinstance_vertex:Am,morphcolor_vertex:Cm,morphnormal_vertex:Rm,morphtarget_pars_vertex:Pm,morphtarget_vertex:Lm,normal_fragment_begin:Dm,normal_fragment_maps:Im,normal_pars_fragment:Um,normal_pars_vertex:Nm,normal_vertex:Fm,normalmap_pars_fragment:Om,clearcoat_normal_fragment_begin:km,clearcoat_normal_fragment_maps:Bm,clearcoat_pars_fragment:zm,iridescence_pars_fragment:Hm,opaque_fragment:Gm,packing:Vm,premultiplied_alpha_fragment:Wm,project_vertex:Xm,dithering_fragment:qm,dithering_pars_fragment:Ym,roughnessmap_fragment:$m,roughnessmap_pars_fragment:Zm,shadowmap_pars_fragment:Km,shadowmap_pars_vertex:Jm,shadowmap_vertex:jm,shadowmask_pars_fragment:Qm,skinbase_vertex:t0,skinning_pars_vertex:e0,skinning_vertex:n0,skinnormal_vertex:i0,specularmap_fragment:s0,specularmap_pars_fragment:r0,tonemapping_fragment:a0,tonemapping_pars_fragment:o0,transmission_fragment:l0,transmission_pars_fragment:c0,uv_pars_fragment:h0,uv_pars_vertex:u0,uv_vertex:f0,worldpos_vertex:d0,background_vert:p0,background_frag:m0,backgroundCube_vert:g0,backgroundCube_frag:v0,cube_vert:x0,cube_frag:_0,depth_vert:y0,depth_frag:M0,distanceRGBA_vert:S0,distanceRGBA_frag:b0,equirect_vert:E0,equirect_frag:T0,linedashed_vert:w0,linedashed_frag:A0,meshbasic_vert:C0,meshbasic_frag:R0,meshlambert_vert:P0,meshlambert_frag:L0,meshmatcap_vert:D0,meshmatcap_frag:I0,meshnormal_vert:U0,meshnormal_frag:N0,meshphong_vert:F0,meshphong_frag:O0,meshphysical_vert:k0,meshphysical_frag:B0,meshtoon_vert:z0,meshtoon_frag:H0,points_vert:G0,points_frag:V0,shadow_vert:W0,shadow_frag:X0,sprite_vert:q0,sprite_frag:Y0},ht={common:{diffuse:{value:new Dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new Dt(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},vn={basic:{uniforms:Fe([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:Fe([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Dt(0)}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:Fe([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Dt(0)},specular:{value:new Dt(1118481)},shininess:{value:30}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:Fe([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new Dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:Fe([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new Dt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:Fe([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:Fe([ht.points,ht.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:Fe([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:Fe([ht.common,ht.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:Fe([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:Fe([ht.sprite,ht.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distanceRGBA:{uniforms:Fe([ht.common,ht.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distanceRGBA_vert,fragmentShader:Vt.distanceRGBA_frag},shadow:{uniforms:Fe([ht.lights,ht.fog,{color:{value:new Dt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};vn.physical={uniforms:Fe([vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new Dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new Dt(0)},specularColor:{value:new Dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const fr={r:0,b:0,g:0},ii=new mn,$0=new te;function Z0(i,t,e,n,s,r,a){const o=new Dt(0);let l=r===!0?0:1,h,c,u=null,f=0,d=null;function g(v){let M=v.isScene===!0?v.background:null;return M&&M.isTexture&&(M=(v.backgroundBlurriness>0?e:t).get(M)),M}function y(v){let M=!1;const x=g(v);x===null?p(o,l):x&&x.isColor&&(p(x,1),M=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(v,M){const x=g(M);x&&(x.isCubeTexture||x.mapping===Gr)?(c===void 0&&(c=new le(new oe(1,1,1),new Ee({name:"BackgroundCubeMaterial",uniforms:Qi(vn.backgroundCube.uniforms),vertexShader:vn.backgroundCube.vertexShader,fragmentShader:vn.backgroundCube.fragmentShader,side:ke,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(c)),ii.copy(M.backgroundRotation),ii.x*=-1,ii.y*=-1,ii.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),c.material.uniforms.envMap.value=x,c.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4($0.makeRotationFromEuler(ii)),c.material.toneMapped=$t.getTransfer(x.colorSpace)!==ae,(u!==x||f!==x.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,f=x.version,d=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(h===void 0&&(h=new le(new Oe(2,2),new Ee({name:"BackgroundMaterial",uniforms:Qi(vn.background.uniforms),vertexShader:vn.background.vertexShader,fragmentShader:vn.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=x,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.toneMapped=$t.getTransfer(x.colorSpace)!==ae,x.matrixAutoUpdate===!0&&x.updateMatrix(),h.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,d=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null))}function p(v,M){v.getRGB(fr,au(i)),n.buffers.color.setClear(fr.r,fr.g,fr.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(v,M=1){o.set(v),l=M,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,p(o,l)},render:y,addToRenderList:m}}function K0(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(_,C,k,I,z){let X=!1;const O=u(I,k,C);r!==O&&(r=O,h(r.object)),X=d(_,I,k,z),X&&g(_,I,k,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,x(_,C,k,I),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return i.createVertexArray()}function h(_){return i.bindVertexArray(_)}function c(_){return i.deleteVertexArray(_)}function u(_,C,k){const I=k.wireframe===!0;let z=n[_.id];z===void 0&&(z={},n[_.id]=z);let X=z[C.id];X===void 0&&(X={},z[C.id]=X);let O=X[I];return O===void 0&&(O=f(l()),X[I]=O),O}function f(_){const C=[],k=[],I=[];for(let z=0;z<e;z++)C[z]=0,k[z]=0,I[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:k,attributeDivisors:I,object:_,attributes:{},index:null}}function d(_,C,k,I){const z=r.attributes,X=C.attributes;let O=0;const H=k.getAttributes();for(const G in H)if(H[G].location>=0){const lt=z[G];let ft=X[G];if(ft===void 0&&(G==="instanceMatrix"&&_.instanceMatrix&&(ft=_.instanceMatrix),G==="instanceColor"&&_.instanceColor&&(ft=_.instanceColor)),lt===void 0||lt.attribute!==ft||ft&&lt.data!==ft.data)return!0;O++}return r.attributesNum!==O||r.index!==I}function g(_,C,k,I){const z={},X=C.attributes;let O=0;const H=k.getAttributes();for(const G in H)if(H[G].location>=0){let lt=X[G];lt===void 0&&(G==="instanceMatrix"&&_.instanceMatrix&&(lt=_.instanceMatrix),G==="instanceColor"&&_.instanceColor&&(lt=_.instanceColor));const ft={};ft.attribute=lt,lt&&lt.data&&(ft.data=lt.data),z[G]=ft,O++}r.attributes=z,r.attributesNum=O,r.index=I}function y(){const _=r.newAttributes;for(let C=0,k=_.length;C<k;C++)_[C]=0}function m(_){p(_,0)}function p(_,C){const k=r.newAttributes,I=r.enabledAttributes,z=r.attributeDivisors;k[_]=1,I[_]===0&&(i.enableVertexAttribArray(_),I[_]=1),z[_]!==C&&(i.vertexAttribDivisor(_,C),z[_]=C)}function v(){const _=r.newAttributes,C=r.enabledAttributes;for(let k=0,I=C.length;k<I;k++)C[k]!==_[k]&&(i.disableVertexAttribArray(k),C[k]=0)}function M(_,C,k,I,z,X,O){O===!0?i.vertexAttribIPointer(_,C,k,z,X):i.vertexAttribPointer(_,C,k,I,z,X)}function x(_,C,k,I){y();const z=I.attributes,X=k.getAttributes(),O=C.defaultAttributeValues;for(const H in X){const G=X[H];if(G.location>=0){let tt=z[H];if(tt===void 0&&(H==="instanceMatrix"&&_.instanceMatrix&&(tt=_.instanceMatrix),H==="instanceColor"&&_.instanceColor&&(tt=_.instanceColor)),tt!==void 0){const lt=tt.normalized,ft=tt.itemSize,Pt=t.get(tt);if(Pt===void 0)continue;const kt=Pt.buffer,$=Pt.type,et=Pt.bytesPerElement,vt=$===i.INT||$===i.UNSIGNED_INT||tt.gpuType===$o;if(tt.isInterleavedBufferAttribute){const rt=tt.data,At=rt.stride,Nt=tt.offset;if(rt.isInstancedInterleavedBuffer){for(let Lt=0;Lt<G.locationSize;Lt++)p(G.location+Lt,rt.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Lt=0;Lt<G.locationSize;Lt++)m(G.location+Lt);i.bindBuffer(i.ARRAY_BUFFER,kt);for(let Lt=0;Lt<G.locationSize;Lt++)M(G.location+Lt,ft/G.locationSize,$,lt,At*et,(Nt+ft/G.locationSize*Lt)*et,vt)}else{if(tt.isInstancedBufferAttribute){for(let rt=0;rt<G.locationSize;rt++)p(G.location+rt,tt.meshPerAttribute);_.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let rt=0;rt<G.locationSize;rt++)m(G.location+rt);i.bindBuffer(i.ARRAY_BUFFER,kt);for(let rt=0;rt<G.locationSize;rt++)M(G.location+rt,ft/G.locationSize,$,lt,ft*et,ft/G.locationSize*rt*et,vt)}}else if(O!==void 0){const lt=O[H];if(lt!==void 0)switch(lt.length){case 2:i.vertexAttrib2fv(G.location,lt);break;case 3:i.vertexAttrib3fv(G.location,lt);break;case 4:i.vertexAttrib4fv(G.location,lt);break;default:i.vertexAttrib1fv(G.location,lt)}}}}v()}function R(){L();for(const _ in n){const C=n[_];for(const k in C){const I=C[k];for(const z in I)c(I[z].object),delete I[z];delete C[k]}delete n[_]}}function w(_){if(n[_.id]===void 0)return;const C=n[_.id];for(const k in C){const I=C[k];for(const z in I)c(I[z].object),delete I[z];delete C[k]}delete n[_.id]}function A(_){for(const C in n){const k=n[C];if(k[_.id]===void 0)continue;const I=k[_.id];for(const z in I)c(I[z].object),delete I[z];delete k[_.id]}}function L(){S(),a=!0,r!==s&&(r=s,h(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:S,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:m,disableUnusedAttributes:v}}function J0(i,t,e){let n;function s(h){n=h}function r(h,c){i.drawArrays(n,h,c),e.update(c,n,1)}function a(h,c,u){u!==0&&(i.drawArraysInstanced(n,h,c,u),e.update(c,n,u))}function o(h,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,c,0,u);let d=0;for(let g=0;g<u;g++)d+=c[g];e.update(d,n,1)}function l(h,c,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<h.length;g++)a(h[g],c[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,h,0,c,0,f,0,u);let g=0;for(let y=0;y<u;y++)g+=c[y]*f[y];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function j0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==dn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const L=A===pn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Nn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==yn&&!L)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const c=l(h);c!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",c,"instead."),h=c);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:R,maxSamples:w}}function Q0(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Pn,o=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=c(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,y=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?c(null):h();else{const v=r?0:n,M=v*4;let x=p.clippingState||null;l.value=x,x=c(g,f,M,d);for(let R=0;R!==M;++R)x[R]=e[R];p.clippingState=x,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function h(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function c(u,f,d,g){const y=u!==null?u.length:0;let m=null;if(y!==0){if(m=l.value,g!==!0||m===null){const p=d+y*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,x=d;M!==y;++M,x+=4)a.copy(u[M]).applyMatrix4(v,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}function tg(i){let t=new WeakMap;function e(a,o){return o===to?a.mapping=Zi:o===eo&&(a.mapping=Ki),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===to||o===eo)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const h=new up(l.height);return h.fromEquirectangularTexture(i,a),t.set(a,h),a.addEventListener("dispose",s),e(h.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class il extends ou{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,a=r+h*this.view.width,o-=c*this.view.offsetY,l=o-c*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const zi=4,cc=[.125,.215,.35,.446,.526,.582],oi=20,Ta=new il,hc=new Dt;let wa=null,Aa=0,Ca=0,Ra=!1;const ri=(1+Math.sqrt(5))/2,Fi=1/ri,uc=[new D(-ri,Fi,0),new D(ri,Fi,0),new D(-Fi,0,ri),new D(Fi,0,ri),new D(0,ri,-Fi),new D(0,ri,Fi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class Lo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){wa=this._renderer.getRenderTarget(),Aa=this._renderer.getActiveCubeFace(),Ca=this._renderer.getActiveMipmapLevel(),Ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=dc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(wa,Aa,Ca),this._renderer.xr.enabled=Ra,t.scissorTest=!1,dr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Zi||t.mapping===Ki?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),wa=this._renderer.getRenderTarget(),Aa=this._renderer.getActiveCubeFace(),Ca=this._renderer.getActiveMipmapLevel(),Ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:pn,format:dn,colorSpace:is,depthBuffer:!1},s=fc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=eg(r)),this._blurMaterial=ng(r,t,e)}return s}_compileMaterial(t){const e=new le(this._lodPlanes[0],t);this._renderer.compile(e,Ta)}_sceneToCubeUV(t,e,n,s){const o=new We(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],c=this._renderer,u=c.autoClear,f=c.toneMapping;c.getClearColor(hc),c.toneMapping=Zn,c.autoClear=!1;const d=new tn({name:"PMREM.Background",side:ke,depthWrite:!1,depthTest:!1}),g=new le(new oe,d);let y=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,y=!0):(d.color.copy(hc),y=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(o.up.set(0,l[p],0),o.lookAt(h[p],0,0)):v===1?(o.up.set(0,0,l[p]),o.lookAt(0,h[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,h[p]));const M=this._cubeSize;dr(s,v*M,p>2?M:0,M,M),c.setRenderTarget(s),y&&c.render(g,o),c.render(t,o)}g.geometry.dispose(),g.material.dispose(),c.toneMapping=f,c.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Zi||t.mapping===Ki;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=pc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=dc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new le(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;dr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Ta)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=uc[(s-r-1)%uc.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,u=new le(this._lodPlanes[s],h),f=h.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*oi-1),y=r/g,m=isFinite(r)?1+Math.floor(c*y):oi;m>oi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${oi}`);const p=[];let v=0;for(let A=0;A<oi;++A){const L=A/y,S=Math.exp(-L*L/2);p.push(S),A===0?v+=S:A<m&&(v+=2*S)}for(let A=0;A<p.length;A++)p[A]=p[A]/v;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;const x=this._sizeLods[s],R=3*x*(s>M-zi?s-M+zi:0),w=4*(this._cubeSize-x);dr(e,R,w,3*x,2*x),l.setRenderTarget(e),l.render(u,Ta)}}function eg(i){const t=[],e=[],n=[];let s=i;const r=i-zi+1+cc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-zi?l=cc[a-i+zi-1]:a===0&&(l=0),n.push(l);const h=1/(o-2),c=-h,u=1+h,f=[c,c,u,c,u,u,c,c,u,u,c,u],d=6,g=6,y=3,m=2,p=1,v=new Float32Array(y*g*d),M=new Float32Array(m*g*d),x=new Float32Array(p*g*d);for(let w=0;w<d;w++){const A=w%3*2/3-1,L=w>2?0:-1,S=[A,L,0,A+2/3,L,0,A+2/3,L+1,0,A,L,0,A+2/3,L+1,0,A,L+1,0];v.set(S,y*g*w),M.set(f,m*g*w);const _=[w,w,w,w,w,w];x.set(_,p*g*w)}const R=new Be;R.setAttribute("position",new rn(v,y)),R.setAttribute("uv",new rn(M,m)),R.setAttribute("faceIndex",new rn(x,p)),t.push(R),s>zi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function fc(i,t,e){const n=new Qe(i,t,e);return n.texture.mapping=Gr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function dr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function ng(i,t,e){const n=new Float32Array(oi),s=new D(0,1,0);return new Ee({name:"SphericalGaussianBlur",defines:{n:oi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function dc(){return new Ee({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function pc(){return new Ee({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Dn,depthTest:!1,depthWrite:!1})}function sl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ig(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,h=l===to||l===eo,c=l===Zi||l===Ki;if(h||c){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Lo(i)),u=h?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const d=o.image;return h&&d&&d.height>0||c&&d&&s(d)?(e===null&&(e=new Lo(i)),u=h?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const h=6;for(let c=0;c<h;c++)o[c]!==void 0&&l++;return l===h}function r(o){const l=o.target;l.removeEventListener("dispose",r);const h=t.get(l);h!==void 0&&(t.delete(l),h.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function sg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&ys("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function rg(i,t,e,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const y=f.morphAttributes[g];for(let m=0,p=y.length;m<p;m++)t.remove(y[m])}f.removeEventListener("dispose",a),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const d=u.morphAttributes;for(const g in d){const y=d[g];for(let m=0,p=y.length;m<p;m++)t.update(y[m],i.ARRAY_BUFFER)}}function h(u){const f=[],d=u.index,g=u.attributes.position;let y=0;if(d!==null){const v=d.array;y=d.version;for(let M=0,x=v.length;M<x;M+=3){const R=v[M+0],w=v[M+1],A=v[M+2];f.push(R,w,w,A,A,R)}}else if(g!==void 0){const v=g.array;y=g.version;for(let M=0,x=v.length/3-1;M<x;M+=3){const R=M+0,w=M+1,A=M+2;f.push(R,w,w,A,A,R)}}else return;const m=new(Qh(f)?ru:su)(f,1);m.version=y;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function c(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&h(u)}else h(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:c}}function ag(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*a),e.update(d,n,1)}function h(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*a,g),e.update(d,n,g))}function c(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,y){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)h(f[p]/a,d[p],y[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,y,0,g);let p=0;for(let v=0;v<g;v++)p+=d[v]*y[v];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=h,this.renderMultiDraw=c,this.renderMultiDrawInstances=u}function og(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function lg(i,t,e){const n=new WeakMap,s=new se;function r(a,o,l){const h=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=c!==void 0?c.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let _=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",_)};var d=_;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),y===!0&&(x=2),m===!0&&(x=3);let R=o.attributes.position.count*x,w=1;R>t.maxTextureSize&&(w=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const A=new Float32Array(R*w*4*u),L=new eu(A,R,w,u);L.type=yn,L.needsUpdate=!0;const S=x*4;for(let C=0;C<u;C++){const k=p[C],I=v[C],z=M[C],X=R*w*4*C;for(let O=0;O<k.count;O++){const H=O*S;g===!0&&(s.fromBufferAttribute(k,O),A[X+H+0]=s.x,A[X+H+1]=s.y,A[X+H+2]=s.z,A[X+H+3]=0),y===!0&&(s.fromBufferAttribute(I,O),A[X+H+4]=s.x,A[X+H+5]=s.y,A[X+H+6]=s.z,A[X+H+7]=0),m===!0&&(s.fromBufferAttribute(z,O),A[X+H+8]=s.x,A[X+H+9]=s.y,A[X+H+10]=s.z,A[X+H+11]=z.itemSize===4?s.w:1)}}f={count:u,texture:L,size:new it(R,w)},n.set(o,f),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<h.length;m++)g+=h[m];const y=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",y),l.getUniforms().setValue(i,"morphTargetInfluences",h)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function cg(i,t,e,n){let s=new WeakMap;function r(l){const h=n.render.frame,c=l.geometry,u=t.get(l,c);if(s.get(u)!==h&&(t.update(u),s.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return u}function a(){s=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:r,dispose:a}}class hu extends Ne{constructor(t,e,n,s,r,a,o,l,h,c=Xi){if(c!==Xi&&c!==ji)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&c===Xi&&(n=pi),n===void 0&&c===ji&&(n=Ji),super(null,s,r,a,o,l,c,n,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:je,this.minFilter=l!==void 0?l:je,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const uu=new Ne,mc=new hu(1,1),fu=new eu,du=new Kd,pu=new lu,gc=[],vc=[],xc=new Float32Array(16),_c=new Float32Array(9),yc=new Float32Array(4);function as(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=gc[s];if(r===void 0&&(r=new Float32Array(s),gc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Te(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function we(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Wr(i,t){let e=vc[t];e===void 0&&(e=new Int32Array(t),vc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function hg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function ug(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2fv(this.addr,t),we(e,t)}}function fg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;i.uniform3fv(this.addr,t),we(e,t)}}function dg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4fv(this.addr,t),we(e,t)}}function pg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),we(e,t)}else{if(Te(e,n))return;yc.set(n),i.uniformMatrix2fv(this.addr,!1,yc),we(e,n)}}function mg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),we(e,t)}else{if(Te(e,n))return;_c.set(n),i.uniformMatrix3fv(this.addr,!1,_c),we(e,n)}}function gg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),we(e,t)}else{if(Te(e,n))return;xc.set(n),i.uniformMatrix4fv(this.addr,!1,xc),we(e,n)}}function vg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function xg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2iv(this.addr,t),we(e,t)}}function _g(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;i.uniform3iv(this.addr,t),we(e,t)}}function yg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4iv(this.addr,t),we(e,t)}}function Mg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Sg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2uiv(this.addr,t),we(e,t)}}function bg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;i.uniform3uiv(this.addr,t),we(e,t)}}function Eg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4uiv(this.addr,t),we(e,t)}}function Tg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(mc.compareFunction=jh,r=mc):r=uu,e.setTexture2D(t||r,s)}function wg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||du,s)}function Ag(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||pu,s)}function Cg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||fu,s)}function Rg(i){switch(i){case 5126:return hg;case 35664:return ug;case 35665:return fg;case 35666:return dg;case 35674:return pg;case 35675:return mg;case 35676:return gg;case 5124:case 35670:return vg;case 35667:case 35671:return xg;case 35668:case 35672:return _g;case 35669:case 35673:return yg;case 5125:return Mg;case 36294:return Sg;case 36295:return bg;case 36296:return Eg;case 35678:case 36198:case 36298:case 36306:case 35682:return Tg;case 35679:case 36299:case 36307:return wg;case 35680:case 36300:case 36308:case 36293:return Ag;case 36289:case 36303:case 36311:case 36292:return Cg}}function Pg(i,t){i.uniform1fv(this.addr,t)}function Lg(i,t){const e=as(t,this.size,2);i.uniform2fv(this.addr,e)}function Dg(i,t){const e=as(t,this.size,3);i.uniform3fv(this.addr,e)}function Ig(i,t){const e=as(t,this.size,4);i.uniform4fv(this.addr,e)}function Ug(i,t){const e=as(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Ng(i,t){const e=as(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Fg(i,t){const e=as(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Og(i,t){i.uniform1iv(this.addr,t)}function kg(i,t){i.uniform2iv(this.addr,t)}function Bg(i,t){i.uniform3iv(this.addr,t)}function zg(i,t){i.uniform4iv(this.addr,t)}function Hg(i,t){i.uniform1uiv(this.addr,t)}function Gg(i,t){i.uniform2uiv(this.addr,t)}function Vg(i,t){i.uniform3uiv(this.addr,t)}function Wg(i,t){i.uniform4uiv(this.addr,t)}function Xg(i,t,e){const n=this.cache,s=t.length,r=Wr(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),we(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||uu,r[a])}function qg(i,t,e){const n=this.cache,s=t.length,r=Wr(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),we(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||du,r[a])}function Yg(i,t,e){const n=this.cache,s=t.length,r=Wr(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),we(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||pu,r[a])}function $g(i,t,e){const n=this.cache,s=t.length,r=Wr(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),we(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||fu,r[a])}function Zg(i){switch(i){case 5126:return Pg;case 35664:return Lg;case 35665:return Dg;case 35666:return Ig;case 35674:return Ug;case 35675:return Ng;case 35676:return Fg;case 5124:case 35670:return Og;case 35667:case 35671:return kg;case 35668:case 35672:return Bg;case 35669:case 35673:return zg;case 5125:return Hg;case 36294:return Gg;case 36295:return Vg;case 36296:return Wg;case 35678:case 36198:case 36298:case 36306:case 35682:return Xg;case 35679:case 36299:case 36307:return qg;case 35680:case 36300:case 36308:case 36293:return Yg;case 36289:case 36303:case 36311:case 36292:return $g}}class Kg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Rg(e.type)}}class Jg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Zg(e.type)}}class jg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Pa=/(\w+)(\])?(\[|\.)?/g;function Mc(i,t){i.seq.push(t),i.map[t.id]=t}function Qg(i,t,e){const n=i.name,s=n.length;for(Pa.lastIndex=0;;){const r=Pa.exec(n),a=Pa.lastIndex;let o=r[1];const l=r[2]==="]",h=r[3];if(l&&(o=o|0),h===void 0||h==="["&&a+2===s){Mc(e,h===void 0?new Kg(o,i,t):new Jg(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new jg(o),Mc(e,u)),e=u}}}class Rr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Qg(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Sc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const tv=37297;let ev=0;function nv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const bc=new Ht;function iv(i){$t._getMatrix(bc,$t.workingColorSpace,i);const t=`mat3( ${bc.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(i)){case Vr:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Ec(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+nv(i.getShaderSource(t),a)}else return s}function sv(i,t){const e=iv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function rv(i,t){let e;switch(t){case Fh:e="Linear";break;case Oh:e="Reinhard";break;case kh:e="Cineon";break;case Yo:e="ACESFilmic";break;case Bh:e="AgX";break;case zh:e="Neutral";break;case Rd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const pr=new D;function av(){$t.getLuminanceCoefficients(pr);const i=pr.x.toFixed(4),t=pr.y.toFixed(4),e=pr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ov(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ms).join(`
`)}function lv(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function cv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Ms(i){return i!==""}function Tc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function wc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const hv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Do(i){return i.replace(hv,fv)}const uv=new Map;function fv(i,t){let e=Vt[t];if(e===void 0){const n=uv.get(t);if(n!==void 0)e=Vt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Do(e)}const dv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ac(i){return i.replace(dv,pv)}function pv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Cc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function mv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Uh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===ld?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Rn&&(t="SHADOWMAP_TYPE_VSM"),t}function gv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Zi:case Ki:t="ENVMAP_TYPE_CUBE";break;case Gr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function vv(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ki:t="ENVMAP_MODE_REFRACTION";break}return t}function xv(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Nh:t="ENVMAP_BLENDING_MULTIPLY";break;case Ad:t="ENVMAP_BLENDING_MIX";break;case Cd:t="ENVMAP_BLENDING_ADD";break}return t}function _v(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function yv(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=mv(e),h=gv(e),c=vv(e),u=xv(e),f=_v(e),d=ov(e),g=lv(r),y=s.createProgram();let m,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ms).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ms).join(`
`),p.length>0&&(p+=`
`)):(m=[Cc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ms).join(`
`),p=[Cc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Zn?"#define TONE_MAPPING":"",e.toneMapping!==Zn?Vt.tonemapping_pars_fragment:"",e.toneMapping!==Zn?rv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,sv("linearToOutputTexel",e.outputColorSpace),av(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ms).join(`
`)),a=Do(a),a=Tc(a,e),a=wc(a,e),o=Do(o),o=Tc(o,e),o=wc(o,e),a=Ac(a),o=Ac(o),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Gl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Gl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=v+m+a,x=v+p+o,R=Sc(s,s.VERTEX_SHADER,M),w=Sc(s,s.FRAGMENT_SHADER,x);s.attachShader(y,R),s.attachShader(y,w),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function A(C){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(y).trim(),I=s.getShaderInfoLog(R).trim(),z=s.getShaderInfoLog(w).trim();let X=!0,O=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,R,w);else{const H=Ec(s,R,"vertex"),G=Ec(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+k+`
`+H+`
`+G)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(I===""||z==="")&&(O=!1);O&&(C.diagnostics={runnable:X,programLog:k,vertexShader:{log:I,prefix:m},fragmentShader:{log:z,prefix:p}})}s.deleteShader(R),s.deleteShader(w),L=new Rr(s,y),S=cv(s,y)}let L;this.getUniforms=function(){return L===void 0&&A(this),L};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(y,tv)),_},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ev++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=R,this.fragmentShader=w,this}let Mv=0;class Sv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new bv(t),e.set(t,n)),n}}class bv{constructor(t){this.id=Mv++,this.code=t,this.usedTimes=0}}function Ev(i,t,e,n,s,r,a){const o=new el,l=new Sv,h=new Set,c=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(S){return h.add(S),S===0?"uv":`uv${S}`}function m(S,_,C,k,I){const z=k.fog,X=I.geometry,O=S.isMeshStandardMaterial?k.environment:null,H=(S.isMeshStandardMaterial?e:t).get(S.envMap||O),G=H&&H.mapping===Gr?H.image.height:null,tt=g[S.type];S.precision!==null&&(d=s.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const lt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ft=lt!==void 0?lt.length:0;let Pt=0;X.morphAttributes.position!==void 0&&(Pt=1),X.morphAttributes.normal!==void 0&&(Pt=2),X.morphAttributes.color!==void 0&&(Pt=3);let kt,$,et,vt;if(tt){const re=vn[tt];kt=re.vertexShader,$=re.fragmentShader}else kt=S.vertexShader,$=S.fragmentShader,l.update(S),et=l.getVertexShaderID(S),vt=l.getFragmentShaderID(S);const rt=i.getRenderTarget(),At=i.state.buffers.depth.getReversed(),Nt=I.isInstancedMesh===!0,Lt=I.isBatchedMesh===!0,Kt=!!S.map,j=!!S.matcap,at=!!H,P=!!S.aoMap,Ct=!!S.lightMap,nt=!!S.bumpMap,yt=!!S.normalMap,ct=!!S.displacementMap,It=!!S.emissiveMap,xt=!!S.metalnessMap,T=!!S.roughnessMap,b=S.anisotropy>0,B=S.clearcoat>0,Z=S.dispersion>0,Q=S.iridescence>0,K=S.sheen>0,bt=S.transmission>0,ut=b&&!!S.anisotropyMap,_t=B&&!!S.clearcoatMap,Xt=B&&!!S.clearcoatNormalMap,st=B&&!!S.clearcoatRoughnessMap,Mt=Q&&!!S.iridescenceMap,Ut=Q&&!!S.iridescenceThicknessMap,Ft=K&&!!S.sheenColorMap,St=K&&!!S.sheenRoughnessMap,Yt=!!S.specularMap,Gt=!!S.specularColorMap,fe=!!S.specularIntensityMap,U=bt&&!!S.transmissionMap,dt=bt&&!!S.thicknessMap,q=!!S.gradientMap,J=!!S.alphaMap,gt=S.alphaTest>0,pt=!!S.alphaHash,Bt=!!S.extensions;let ye=Zn;S.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(ye=i.toneMapping);const De={shaderID:tt,shaderType:S.type,shaderName:S.name,vertexShader:kt,fragmentShader:$,defines:S.defines,customVertexShaderID:et,customFragmentShaderID:vt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:Lt,batchingColor:Lt&&I._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&I.instanceColor!==null,instancingMorph:Nt&&I.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:rt===null?i.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:is,alphaToCoverage:!!S.alphaToCoverage,map:Kt,matcap:j,envMap:at,envMapMode:at&&H.mapping,envMapCubeUVHeight:G,aoMap:P,lightMap:Ct,bumpMap:nt,normalMap:yt,displacementMap:f&&ct,emissiveMap:It,normalMapObjectSpace:yt&&S.normalMapType===Id,normalMapTangentSpace:yt&&S.normalMapType===Jh,metalnessMap:xt,roughnessMap:T,anisotropy:b,anisotropyMap:ut,clearcoat:B,clearcoatMap:_t,clearcoatNormalMap:Xt,clearcoatRoughnessMap:st,dispersion:Z,iridescence:Q,iridescenceMap:Mt,iridescenceThicknessMap:Ut,sheen:K,sheenColorMap:Ft,sheenRoughnessMap:St,specularMap:Yt,specularColorMap:Gt,specularIntensityMap:fe,transmission:bt,transmissionMap:U,thicknessMap:dt,gradientMap:q,opaque:S.transparent===!1&&S.blending===Wi&&S.alphaToCoverage===!1,alphaMap:J,alphaTest:gt,alphaHash:pt,combine:S.combine,mapUv:Kt&&y(S.map.channel),aoMapUv:P&&y(S.aoMap.channel),lightMapUv:Ct&&y(S.lightMap.channel),bumpMapUv:nt&&y(S.bumpMap.channel),normalMapUv:yt&&y(S.normalMap.channel),displacementMapUv:ct&&y(S.displacementMap.channel),emissiveMapUv:It&&y(S.emissiveMap.channel),metalnessMapUv:xt&&y(S.metalnessMap.channel),roughnessMapUv:T&&y(S.roughnessMap.channel),anisotropyMapUv:ut&&y(S.anisotropyMap.channel),clearcoatMapUv:_t&&y(S.clearcoatMap.channel),clearcoatNormalMapUv:Xt&&y(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&y(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Mt&&y(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&y(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ft&&y(S.sheenColorMap.channel),sheenRoughnessMapUv:St&&y(S.sheenRoughnessMap.channel),specularMapUv:Yt&&y(S.specularMap.channel),specularColorMapUv:Gt&&y(S.specularColorMap.channel),specularIntensityMapUv:fe&&y(S.specularIntensityMap.channel),transmissionMapUv:U&&y(S.transmissionMap.channel),thicknessMapUv:dt&&y(S.thicknessMap.channel),alphaMapUv:J&&y(S.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(yt||b),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!X.attributes.uv&&(Kt||J),fog:!!z,useFog:S.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:At,skinning:I.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Pt,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:ye,decodeVideoTexture:Kt&&S.map.isVideoTexture===!0&&$t.getTransfer(S.map.colorSpace)===ae,decodeVideoTextureEmissive:It&&S.emissiveMap.isVideoTexture===!0&&$t.getTransfer(S.emissiveMap.colorSpace)===ae,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ke,flipSided:S.side===ke,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Bt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&S.extensions.multiDraw===!0||Lt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return De.vertexUv1s=h.has(1),De.vertexUv2s=h.has(2),De.vertexUv3s=h.has(3),h.clear(),De}function p(S){const _=[];if(S.shaderID?_.push(S.shaderID):(_.push(S.customVertexShaderID),_.push(S.customFragmentShaderID)),S.defines!==void 0)for(const C in S.defines)_.push(C),_.push(S.defines[C]);return S.isRawShaderMaterial===!1&&(v(_,S),M(_,S),_.push(i.outputColorSpace)),_.push(S.customProgramCacheKey),_.join()}function v(S,_){S.push(_.precision),S.push(_.outputColorSpace),S.push(_.envMapMode),S.push(_.envMapCubeUVHeight),S.push(_.mapUv),S.push(_.alphaMapUv),S.push(_.lightMapUv),S.push(_.aoMapUv),S.push(_.bumpMapUv),S.push(_.normalMapUv),S.push(_.displacementMapUv),S.push(_.emissiveMapUv),S.push(_.metalnessMapUv),S.push(_.roughnessMapUv),S.push(_.anisotropyMapUv),S.push(_.clearcoatMapUv),S.push(_.clearcoatNormalMapUv),S.push(_.clearcoatRoughnessMapUv),S.push(_.iridescenceMapUv),S.push(_.iridescenceThicknessMapUv),S.push(_.sheenColorMapUv),S.push(_.sheenRoughnessMapUv),S.push(_.specularMapUv),S.push(_.specularColorMapUv),S.push(_.specularIntensityMapUv),S.push(_.transmissionMapUv),S.push(_.thicknessMapUv),S.push(_.combine),S.push(_.fogExp2),S.push(_.sizeAttenuation),S.push(_.morphTargetsCount),S.push(_.morphAttributeCount),S.push(_.numDirLights),S.push(_.numPointLights),S.push(_.numSpotLights),S.push(_.numSpotLightMaps),S.push(_.numHemiLights),S.push(_.numRectAreaLights),S.push(_.numDirLightShadows),S.push(_.numPointLightShadows),S.push(_.numSpotLightShadows),S.push(_.numSpotLightShadowsWithMaps),S.push(_.numLightProbes),S.push(_.shadowMapType),S.push(_.toneMapping),S.push(_.numClippingPlanes),S.push(_.numClipIntersection),S.push(_.depthPacking)}function M(S,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reverseDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),S.push(o.mask)}function x(S){const _=g[S.type];let C;if(_){const k=vn[_];C=ts.clone(k.uniforms)}else C=S.uniforms;return C}function R(S,_){let C;for(let k=0,I=c.length;k<I;k++){const z=c[k];if(z.cacheKey===_){C=z,++C.usedTimes;break}}return C===void 0&&(C=new yv(i,_,S,r),c.push(C)),C}function w(S){if(--S.usedTimes===0){const _=c.indexOf(S);c[_]=c[c.length-1],c.pop(),S.destroy()}}function A(S){l.remove(S)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:R,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:L}}function Tv(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function wv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Rc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Pc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,f,d,g,y,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:y,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=y,p.group=m),t++,p}function o(u,f,d,g,y,m){const p=a(u,f,d,g,y,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function l(u,f,d,g,y,m){const p=a(u,f,d,g,y,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function h(u,f){e.length>1&&e.sort(u||wv),n.length>1&&n.sort(f||Rc),s.length>1&&s.sort(f||Rc)}function c(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:c,sort:h}}function Av(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Pc,i.set(n,[a])):s>=r.length?(a=new Pc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Cv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new Dt};break;case"SpotLight":e={position:new D,direction:new D,color:new Dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Dt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Dt,groundColor:new Dt};break;case"RectAreaLight":e={color:new Dt,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function Rv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Pv=0;function Lv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Dv(i){const t=new Cv,e=Rv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new D);const s=new D,r=new te,a=new te;function o(h){let c=0,u=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,g=0,y=0,m=0,p=0,v=0,M=0,x=0,R=0,w=0,A=0;h.sort(Lv);for(let S=0,_=h.length;S<_;S++){const C=h[S],k=C.color,I=C.intensity,z=C.distance,X=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)c+=k.r*I,u+=k.g*I,f+=k.b*I;else if(C.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(C.sh.coefficients[O],I);A++}else if(C.isDirectionalLight){const O=t.get(C);if(O.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const H=C.shadow,G=e.get(C);G.shadowIntensity=H.intensity,G.shadowBias=H.bias,G.shadowNormalBias=H.normalBias,G.shadowRadius=H.radius,G.shadowMapSize=H.mapSize,n.directionalShadow[d]=G,n.directionalShadowMap[d]=X,n.directionalShadowMatrix[d]=C.shadow.matrix,v++}n.directional[d]=O,d++}else if(C.isSpotLight){const O=t.get(C);O.position.setFromMatrixPosition(C.matrixWorld),O.color.copy(k).multiplyScalar(I),O.distance=z,O.coneCos=Math.cos(C.angle),O.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),O.decay=C.decay,n.spot[y]=O;const H=C.shadow;if(C.map&&(n.spotLightMap[R]=C.map,R++,H.updateMatrices(C),C.castShadow&&w++),n.spotLightMatrix[y]=H.matrix,C.castShadow){const G=e.get(C);G.shadowIntensity=H.intensity,G.shadowBias=H.bias,G.shadowNormalBias=H.normalBias,G.shadowRadius=H.radius,G.shadowMapSize=H.mapSize,n.spotShadow[y]=G,n.spotShadowMap[y]=X,x++}y++}else if(C.isRectAreaLight){const O=t.get(C);O.color.copy(k).multiplyScalar(I),O.halfWidth.set(C.width*.5,0,0),O.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=O,m++}else if(C.isPointLight){const O=t.get(C);if(O.color.copy(C.color).multiplyScalar(C.intensity),O.distance=C.distance,O.decay=C.decay,C.castShadow){const H=C.shadow,G=e.get(C);G.shadowIntensity=H.intensity,G.shadowBias=H.bias,G.shadowNormalBias=H.normalBias,G.shadowRadius=H.radius,G.shadowMapSize=H.mapSize,G.shadowCameraNear=H.camera.near,G.shadowCameraFar=H.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=C.shadow.matrix,M++}n.point[g]=O,g++}else if(C.isHemisphereLight){const O=t.get(C);O.skyColor.copy(C.color).multiplyScalar(I),O.groundColor.copy(C.groundColor).multiplyScalar(I),n.hemi[p]=O,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ht.LTC_FLOAT_1,n.rectAreaLTC2=ht.LTC_FLOAT_2):(n.rectAreaLTC1=ht.LTC_HALF_1,n.rectAreaLTC2=ht.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=u,n.ambient[2]=f;const L=n.hash;(L.directionalLength!==d||L.pointLength!==g||L.spotLength!==y||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==v||L.numPointShadows!==M||L.numSpotShadows!==x||L.numSpotMaps!==R||L.numLightProbes!==A)&&(n.directional.length=d,n.spot.length=y,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+R-w,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=A,L.directionalLength=d,L.pointLength=g,L.spotLength=y,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=v,L.numPointShadows=M,L.numSpotShadows=x,L.numSpotMaps=R,L.numLightProbes=A,n.version=Pv++)}function l(h,c){let u=0,f=0,d=0,g=0,y=0;const m=c.matrixWorldInverse;for(let p=0,v=h.length;p<v;p++){const M=h[p];if(M.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(M.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const x=n.hemi[y];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(m),y++}}}return{setup:o,setupView:l,state:n}}function Lc(i){const t=new Dv(i),e=[],n=[];function s(c){h.camera=c,e.length=0,n.length=0}function r(c){e.push(c)}function a(c){n.push(c)}function o(){t.setup(e)}function l(c){t.setupView(e,c)}const h={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:h,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Iv(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Lc(i),t.set(s,[o])):r>=a.length?(o=new Lc(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Uv extends Hs{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Ld,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Nv extends Hs{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Fv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ov=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function kv(i,t,e){let n=new nl;const s=new it,r=new it,a=new se,o=new Uv({depthPacking:Dd}),l=new Nv,h={},c=e.maxTextureSize,u={[Kn]:ke,[ke]:Kn,[Ke]:Ke},f=new Ee({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:Fv,fragmentShader:Ov}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Be;g.setAttribute("position",new rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new le(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Uh;let p=this.type;this.render=function(w,A,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const S=i.getRenderTarget(),_=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),k=i.state;k.setBlending(Dn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const I=p!==Rn&&this.type===Rn,z=p===Rn&&this.type!==Rn;for(let X=0,O=w.length;X<O;X++){const H=w[X],G=H.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",H,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const tt=G.getFrameExtents();if(s.multiply(tt),r.copy(G.mapSize),(s.x>c||s.y>c)&&(s.x>c&&(r.x=Math.floor(c/tt.x),s.x=r.x*tt.x,G.mapSize.x=r.x),s.y>c&&(r.y=Math.floor(c/tt.y),s.y=r.y*tt.y,G.mapSize.y=r.y)),G.map===null||I===!0||z===!0){const ft=this.type!==Rn?{minFilter:je,magFilter:je}:{};G.map!==null&&G.map.dispose(),G.map=new Qe(s.x,s.y,ft),G.map.texture.name=H.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const lt=G.getViewportCount();for(let ft=0;ft<lt;ft++){const Pt=G.getViewport(ft);a.set(r.x*Pt.x,r.y*Pt.y,r.x*Pt.z,r.y*Pt.w),k.viewport(a),G.updateMatrices(H,ft),n=G.getFrustum(),x(A,L,G.camera,H,this.type)}G.isPointLightShadow!==!0&&this.type===Rn&&v(G,L),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,_,C)};function v(w,A){const L=t.update(y);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Qe(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,L,f,y,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,L,d,y,null)}function M(w,A,L,S){let _=null;const C=L.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)_=C;else if(_=L.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const k=_.uuid,I=A.uuid;let z=h[k];z===void 0&&(z={},h[k]=z);let X=z[I];X===void 0&&(X=_.clone(),z[I]=X,A.addEventListener("dispose",R)),_=X}if(_.visible=A.visible,_.wireframe=A.wireframe,S===Rn?_.side=A.shadowSide!==null?A.shadowSide:A.side:_.side=A.shadowSide!==null?A.shadowSide:u[A.side],_.alphaMap=A.alphaMap,_.alphaTest=A.alphaTest,_.map=A.map,_.clipShadows=A.clipShadows,_.clippingPlanes=A.clippingPlanes,_.clipIntersection=A.clipIntersection,_.displacementMap=A.displacementMap,_.displacementScale=A.displacementScale,_.displacementBias=A.displacementBias,_.wireframeLinewidth=A.wireframeLinewidth,_.linewidth=A.linewidth,L.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const k=i.properties.get(_);k.light=L}return _}function x(w,A,L,S,_){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&_===Rn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,w.matrixWorld);const I=t.update(w),z=w.material;if(Array.isArray(z)){const X=I.groups;for(let O=0,H=X.length;O<H;O++){const G=X[O],tt=z[G.materialIndex];if(tt&&tt.visible){const lt=M(w,tt,S,_);w.onBeforeShadow(i,w,A,L,I,lt,G),i.renderBufferDirect(L,null,I,lt,w,G),w.onAfterShadow(i,w,A,L,I,lt,G)}}}else if(z.visible){const X=M(w,z,S,_);w.onBeforeShadow(i,w,A,L,I,X,null),i.renderBufferDirect(L,null,I,X,w,null),w.onAfterShadow(i,w,A,L,I,X,null)}}const k=w.children;for(let I=0,z=k.length;I<z;I++)x(k[I],A,L,S,_)}function R(w){w.target.removeEventListener("dispose",R);for(const L in h){const S=h[L],_=w.target.uuid;_ in S&&(S[_].dispose(),delete S[_])}}}const Bv={[Ya]:$a,[Za]:ja,[Ka]:Qa,[$i]:Ja,[$a]:Ya,[ja]:Za,[Qa]:Ka,[Ja]:$i};function zv(i,t){function e(){let U=!1;const dt=new se;let q=null;const J=new se(0,0,0,0);return{setMask:function(gt){q!==gt&&!U&&(i.colorMask(gt,gt,gt,gt),q=gt)},setLocked:function(gt){U=gt},setClear:function(gt,pt,Bt,ye,De){De===!0&&(gt*=ye,pt*=ye,Bt*=ye),dt.set(gt,pt,Bt,ye),J.equals(dt)===!1&&(i.clearColor(gt,pt,Bt,ye),J.copy(dt))},reset:function(){U=!1,q=null,J.set(-1,0,0,0)}}}function n(){let U=!1,dt=!1,q=null,J=null,gt=null;return{setReversed:function(pt){if(dt!==pt){const Bt=t.get("EXT_clip_control");dt?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT);const ye=gt;gt=null,this.setClear(ye)}dt=pt},getReversed:function(){return dt},setTest:function(pt){pt?rt(i.DEPTH_TEST):At(i.DEPTH_TEST)},setMask:function(pt){q!==pt&&!U&&(i.depthMask(pt),q=pt)},setFunc:function(pt){if(dt&&(pt=Bv[pt]),J!==pt){switch(pt){case Ya:i.depthFunc(i.NEVER);break;case $a:i.depthFunc(i.ALWAYS);break;case Za:i.depthFunc(i.LESS);break;case $i:i.depthFunc(i.LEQUAL);break;case Ka:i.depthFunc(i.EQUAL);break;case Ja:i.depthFunc(i.GEQUAL);break;case ja:i.depthFunc(i.GREATER);break;case Qa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}J=pt}},setLocked:function(pt){U=pt},setClear:function(pt){gt!==pt&&(dt&&(pt=1-pt),i.clearDepth(pt),gt=pt)},reset:function(){U=!1,q=null,J=null,gt=null,dt=!1}}}function s(){let U=!1,dt=null,q=null,J=null,gt=null,pt=null,Bt=null,ye=null,De=null;return{setTest:function(re){U||(re?rt(i.STENCIL_TEST):At(i.STENCIL_TEST))},setMask:function(re){dt!==re&&!U&&(i.stencilMask(re),dt=re)},setFunc:function(re,an,Sn){(q!==re||J!==an||gt!==Sn)&&(i.stencilFunc(re,an,Sn),q=re,J=an,gt=Sn)},setOp:function(re,an,Sn){(pt!==re||Bt!==an||ye!==Sn)&&(i.stencilOp(re,an,Sn),pt=re,Bt=an,ye=Sn)},setLocked:function(re){U=re},setClear:function(re){De!==re&&(i.clearStencil(re),De=re)},reset:function(){U=!1,dt=null,q=null,J=null,gt=null,pt=null,Bt=null,ye=null,De=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,h=new WeakMap;let c={},u={},f=new WeakMap,d=[],g=null,y=!1,m=null,p=null,v=null,M=null,x=null,R=null,w=null,A=new Dt(0,0,0),L=0,S=!1,_=null,C=null,k=null,I=null,z=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,H=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(G)[1]),O=H>=1):G.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),O=H>=2);let tt=null,lt={};const ft=i.getParameter(i.SCISSOR_BOX),Pt=i.getParameter(i.VIEWPORT),kt=new se().fromArray(ft),$=new se().fromArray(Pt);function et(U,dt,q,J){const gt=new Uint8Array(4),pt=i.createTexture();i.bindTexture(U,pt),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Bt=0;Bt<q;Bt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(dt,0,i.RGBA,1,1,J,0,i.RGBA,i.UNSIGNED_BYTE,gt):i.texImage2D(dt+Bt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,gt);return pt}const vt={};vt[i.TEXTURE_2D]=et(i.TEXTURE_2D,i.TEXTURE_2D,1),vt[i.TEXTURE_CUBE_MAP]=et(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),vt[i.TEXTURE_2D_ARRAY]=et(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),vt[i.TEXTURE_3D]=et(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),rt(i.DEPTH_TEST),a.setFunc($i),nt(!1),yt(Ol),rt(i.CULL_FACE),P(Dn);function rt(U){c[U]!==!0&&(i.enable(U),c[U]=!0)}function At(U){c[U]!==!1&&(i.disable(U),c[U]=!1)}function Nt(U,dt){return u[U]!==dt?(i.bindFramebuffer(U,dt),u[U]=dt,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=dt),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=dt),!0):!1}function Lt(U,dt){let q=d,J=!1;if(U){q=f.get(dt),q===void 0&&(q=[],f.set(dt,q));const gt=U.textures;if(q.length!==gt.length||q[0]!==i.COLOR_ATTACHMENT0){for(let pt=0,Bt=gt.length;pt<Bt;pt++)q[pt]=i.COLOR_ATTACHMENT0+pt;q.length=gt.length,J=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,J=!0);J&&i.drawBuffers(q)}function Kt(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const j={[ai]:i.FUNC_ADD,[hd]:i.FUNC_SUBTRACT,[ud]:i.FUNC_REVERSE_SUBTRACT};j[fd]=i.MIN,j[dd]=i.MAX;const at={[pd]:i.ZERO,[md]:i.ONE,[gd]:i.SRC_COLOR,[Xa]:i.SRC_ALPHA,[Sd]:i.SRC_ALPHA_SATURATE,[yd]:i.DST_COLOR,[xd]:i.DST_ALPHA,[vd]:i.ONE_MINUS_SRC_COLOR,[qa]:i.ONE_MINUS_SRC_ALPHA,[Md]:i.ONE_MINUS_DST_COLOR,[_d]:i.ONE_MINUS_DST_ALPHA,[bd]:i.CONSTANT_COLOR,[Ed]:i.ONE_MINUS_CONSTANT_COLOR,[Td]:i.CONSTANT_ALPHA,[wd]:i.ONE_MINUS_CONSTANT_ALPHA};function P(U,dt,q,J,gt,pt,Bt,ye,De,re){if(U===Dn){y===!0&&(At(i.BLEND),y=!1);return}if(y===!1&&(rt(i.BLEND),y=!0),U!==cd){if(U!==m||re!==S){if((p!==ai||x!==ai)&&(i.blendEquation(i.FUNC_ADD),p=ai,x=ai),re)switch(U){case Wi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Un:i.blendFunc(i.ONE,i.ONE);break;case kl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Bl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Wi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Un:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case kl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Bl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}v=null,M=null,R=null,w=null,A.set(0,0,0),L=0,m=U,S=re}return}gt=gt||dt,pt=pt||q,Bt=Bt||J,(dt!==p||gt!==x)&&(i.blendEquationSeparate(j[dt],j[gt]),p=dt,x=gt),(q!==v||J!==M||pt!==R||Bt!==w)&&(i.blendFuncSeparate(at[q],at[J],at[pt],at[Bt]),v=q,M=J,R=pt,w=Bt),(ye.equals(A)===!1||De!==L)&&(i.blendColor(ye.r,ye.g,ye.b,De),A.copy(ye),L=De),m=U,S=!1}function Ct(U,dt){U.side===Ke?At(i.CULL_FACE):rt(i.CULL_FACE);let q=U.side===ke;dt&&(q=!q),nt(q),U.blending===Wi&&U.transparent===!1?P(Dn):P(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const J=U.stencilWrite;o.setTest(J),J&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),It(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?rt(i.SAMPLE_ALPHA_TO_COVERAGE):At(i.SAMPLE_ALPHA_TO_COVERAGE)}function nt(U){_!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),_=U)}function yt(U){U!==ad?(rt(i.CULL_FACE),U!==C&&(U===Ol?i.cullFace(i.BACK):U===od?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):At(i.CULL_FACE),C=U}function ct(U){U!==k&&(O&&i.lineWidth(U),k=U)}function It(U,dt,q){U?(rt(i.POLYGON_OFFSET_FILL),(I!==dt||z!==q)&&(i.polygonOffset(dt,q),I=dt,z=q)):At(i.POLYGON_OFFSET_FILL)}function xt(U){U?rt(i.SCISSOR_TEST):At(i.SCISSOR_TEST)}function T(U){U===void 0&&(U=i.TEXTURE0+X-1),tt!==U&&(i.activeTexture(U),tt=U)}function b(U,dt,q){q===void 0&&(tt===null?q=i.TEXTURE0+X-1:q=tt);let J=lt[q];J===void 0&&(J={type:void 0,texture:void 0},lt[q]=J),(J.type!==U||J.texture!==dt)&&(tt!==q&&(i.activeTexture(q),tt=q),i.bindTexture(U,dt||vt[U]),J.type=U,J.texture=dt)}function B(){const U=lt[tt];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Z(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function bt(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ut(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _t(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Xt(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function st(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ut(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ft(U){kt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),kt.copy(U))}function St(U){$.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),$.copy(U))}function Yt(U,dt){let q=h.get(dt);q===void 0&&(q=new WeakMap,h.set(dt,q));let J=q.get(U);J===void 0&&(J=i.getUniformBlockIndex(dt,U.name),q.set(U,J))}function Gt(U,dt){const J=h.get(dt).get(U);l.get(dt)!==J&&(i.uniformBlockBinding(dt,J,U.__bindingPointIndex),l.set(dt,J))}function fe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},tt=null,lt={},u={},f=new WeakMap,d=[],g=null,y=!1,m=null,p=null,v=null,M=null,x=null,R=null,w=null,A=new Dt(0,0,0),L=0,S=!1,_=null,C=null,k=null,I=null,z=null,kt.set(0,0,i.canvas.width,i.canvas.height),$.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:rt,disable:At,bindFramebuffer:Nt,drawBuffers:Lt,useProgram:Kt,setBlending:P,setMaterial:Ct,setFlipSided:nt,setCullFace:yt,setLineWidth:ct,setPolygonOffset:It,setScissorTest:xt,activeTexture:T,bindTexture:b,unbindTexture:B,compressedTexImage2D:Z,compressedTexImage3D:Q,texImage2D:Mt,texImage3D:Ut,updateUBOMapping:Yt,uniformBlockBinding:Gt,texStorage2D:Xt,texStorage3D:st,texSubImage2D:K,texSubImage3D:bt,compressedTexSubImage2D:ut,compressedTexSubImage3D:_t,scissor:Ft,viewport:St,reset:fe}}function Dc(i,t,e,n){const s=Hv(n);switch(e){case Xh:return i*t;case Yh:return i*t;case $h:return i*t*2;case Jo:return i*t/s.components*s.byteLength;case jo:return i*t/s.components*s.byteLength;case Zh:return i*t*2/s.components*s.byteLength;case Qo:return i*t*2/s.components*s.byteLength;case qh:return i*t*3/s.components*s.byteLength;case dn:return i*t*4/s.components*s.byteLength;case tl:return i*t*4/s.components*s.byteLength;case Er:case Tr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case wr:case Ar:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case so:case ao:return Math.max(i,16)*Math.max(t,8)/4;case io:case ro:return Math.max(i,8)*Math.max(t,8)/2;case oo:case lo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case co:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ho:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case uo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case fo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case po:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case mo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case go:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case vo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case xo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case _o:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case yo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Mo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case So:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case bo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Eo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Cr:case To:case wo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Kh:case Ao:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Co:case Ro:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Hv(i){switch(i){case Nn:case Gh:return{byteLength:1,components:1};case Us:case Vh:case pn:return{byteLength:2,components:1};case Zo:case Ko:return{byteLength:2,components:4};case pi:case $o:case yn:return{byteLength:4,components:1};case Wh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Gv(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new it,c=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,b){return d?new OffscreenCanvas(T,b):Ur("canvas")}function y(T,b,B){let Z=1;const Q=xt(T);if((Q.width>B||Q.height>B)&&(Z=B/Math.max(Q.width,Q.height)),Z<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const K=Math.floor(Z*Q.width),bt=Math.floor(Z*Q.height);u===void 0&&(u=g(K,bt));const ut=b?g(K,bt):u;return ut.width=K,ut.height=bt,ut.getContext("2d").drawImage(T,0,0,K,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+K+"x"+bt+")."),ut}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function v(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(T,b,B,Z,Q=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let K=b;if(b===i.RED&&(B===i.FLOAT&&(K=i.R32F),B===i.HALF_FLOAT&&(K=i.R16F),B===i.UNSIGNED_BYTE&&(K=i.R8)),b===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.R8UI),B===i.UNSIGNED_SHORT&&(K=i.R16UI),B===i.UNSIGNED_INT&&(K=i.R32UI),B===i.BYTE&&(K=i.R8I),B===i.SHORT&&(K=i.R16I),B===i.INT&&(K=i.R32I)),b===i.RG&&(B===i.FLOAT&&(K=i.RG32F),B===i.HALF_FLOAT&&(K=i.RG16F),B===i.UNSIGNED_BYTE&&(K=i.RG8)),b===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RG8UI),B===i.UNSIGNED_SHORT&&(K=i.RG16UI),B===i.UNSIGNED_INT&&(K=i.RG32UI),B===i.BYTE&&(K=i.RG8I),B===i.SHORT&&(K=i.RG16I),B===i.INT&&(K=i.RG32I)),b===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RGB8UI),B===i.UNSIGNED_SHORT&&(K=i.RGB16UI),B===i.UNSIGNED_INT&&(K=i.RGB32UI),B===i.BYTE&&(K=i.RGB8I),B===i.SHORT&&(K=i.RGB16I),B===i.INT&&(K=i.RGB32I)),b===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),B===i.UNSIGNED_INT&&(K=i.RGBA32UI),B===i.BYTE&&(K=i.RGBA8I),B===i.SHORT&&(K=i.RGBA16I),B===i.INT&&(K=i.RGBA32I)),b===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),b===i.RGBA){const bt=Q?Vr:$t.getTransfer(Z);B===i.FLOAT&&(K=i.RGBA32F),B===i.HALF_FLOAT&&(K=i.RGBA16F),B===i.UNSIGNED_BYTE&&(K=bt===ae?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function x(T,b){let B;return T?b===null||b===pi||b===Ji?B=i.DEPTH24_STENCIL8:b===yn?B=i.DEPTH32F_STENCIL8:b===Us&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===pi||b===Ji?B=i.DEPTH_COMPONENT24:b===yn?B=i.DEPTH_COMPONENT32F:b===Us&&(B=i.DEPTH_COMPONENT16),B}function R(T,b){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==je&&T.minFilter!==_n?Math.log2(Math.max(b.width,b.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?b.mipmaps.length:1}function w(T){const b=T.target;b.removeEventListener("dispose",w),L(b),b.isVideoTexture&&c.delete(b)}function A(T){const b=T.target;b.removeEventListener("dispose",A),_(b)}function L(T){const b=n.get(T);if(b.__webglInit===void 0)return;const B=T.source,Z=f.get(B);if(Z){const Q=Z[b.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&S(T),Object.keys(Z).length===0&&f.delete(B)}n.remove(T)}function S(T){const b=n.get(T);i.deleteTexture(b.__webglTexture);const B=T.source,Z=f.get(B);delete Z[b.__cacheKey],a.memory.textures--}function _(T){const b=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(b.__webglFramebuffer[Z]))for(let Q=0;Q<b.__webglFramebuffer[Z].length;Q++)i.deleteFramebuffer(b.__webglFramebuffer[Z][Q]);else i.deleteFramebuffer(b.__webglFramebuffer[Z]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[Z])}else{if(Array.isArray(b.__webglFramebuffer))for(let Z=0;Z<b.__webglFramebuffer.length;Z++)i.deleteFramebuffer(b.__webglFramebuffer[Z]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let Z=0;Z<b.__webglColorRenderbuffer.length;Z++)b.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[Z]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const B=T.textures;for(let Z=0,Q=B.length;Z<Q;Z++){const K=n.get(B[Z]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),a.memory.textures--),n.remove(B[Z])}n.remove(T)}let C=0;function k(){C=0}function I(){const T=C;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),C+=1,T}function z(T){const b=[];return b.push(T.wrapS),b.push(T.wrapT),b.push(T.wrapR||0),b.push(T.magFilter),b.push(T.minFilter),b.push(T.anisotropy),b.push(T.internalFormat),b.push(T.format),b.push(T.type),b.push(T.generateMipmaps),b.push(T.premultiplyAlpha),b.push(T.flipY),b.push(T.unpackAlignment),b.push(T.colorSpace),b.join()}function X(T,b){const B=n.get(T);if(T.isVideoTexture&&ct(T),T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){const Z=T.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(B,T,b);return}}e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+b)}function O(T,b){const B=n.get(T);if(T.version>0&&B.__version!==T.version){$(B,T,b);return}e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+b)}function H(T,b){const B=n.get(T);if(T.version>0&&B.__version!==T.version){$(B,T,b);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+b)}function G(T,b){const B=n.get(T);if(T.version>0&&B.__version!==T.version){et(B,T,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+b)}const tt={[Is]:i.REPEAT,[li]:i.CLAMP_TO_EDGE,[no]:i.MIRRORED_REPEAT},lt={[je]:i.NEAREST,[Pd]:i.NEAREST_MIPMAP_NEAREST,[Ys]:i.NEAREST_MIPMAP_LINEAR,[_n]:i.LINEAR,[na]:i.LINEAR_MIPMAP_NEAREST,[ci]:i.LINEAR_MIPMAP_LINEAR},ft={[Ud]:i.NEVER,[zd]:i.ALWAYS,[Nd]:i.LESS,[jh]:i.LEQUAL,[Fd]:i.EQUAL,[Bd]:i.GEQUAL,[Od]:i.GREATER,[kd]:i.NOTEQUAL};function Pt(T,b){if(b.type===yn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===_n||b.magFilter===na||b.magFilter===Ys||b.magFilter===ci||b.minFilter===_n||b.minFilter===na||b.minFilter===Ys||b.minFilter===ci)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,tt[b.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,tt[b.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,tt[b.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,lt[b.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,lt[b.minFilter]),b.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,ft[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===je||b.minFilter!==Ys&&b.minFilter!==ci||b.type===yn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function kt(T,b){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,b.addEventListener("dispose",w));const Z=b.source;let Q=f.get(Z);Q===void 0&&(Q={},f.set(Z,Q));const K=z(b);if(K!==T.__cacheKey){Q[K]===void 0&&(Q[K]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Q[K].usedTimes++;const bt=Q[T.__cacheKey];bt!==void 0&&(Q[T.__cacheKey].usedTimes--,bt.usedTimes===0&&S(b)),T.__cacheKey=K,T.__webglTexture=Q[K].texture}return B}function $(T,b,B){let Z=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(Z=i.TEXTURE_3D);const Q=kt(T,b),K=b.source;e.bindTexture(Z,T.__webglTexture,i.TEXTURE0+B);const bt=n.get(K);if(K.version!==bt.__version||Q===!0){e.activeTexture(i.TEXTURE0+B);const ut=$t.getPrimaries($t.workingColorSpace),_t=b.colorSpace===qn?null:$t.getPrimaries(b.colorSpace),Xt=b.colorSpace===qn||ut===_t?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xt);let st=y(b.image,!1,s.maxTextureSize);st=It(b,st);const Mt=r.convert(b.format,b.colorSpace),Ut=r.convert(b.type);let Ft=M(b.internalFormat,Mt,Ut,b.colorSpace,b.isVideoTexture);Pt(Z,b);let St;const Yt=b.mipmaps,Gt=b.isVideoTexture!==!0,fe=bt.__version===void 0||Q===!0,U=K.dataReady,dt=R(b,st);if(b.isDepthTexture)Ft=x(b.format===ji,b.type),fe&&(Gt?e.texStorage2D(i.TEXTURE_2D,1,Ft,st.width,st.height):e.texImage2D(i.TEXTURE_2D,0,Ft,st.width,st.height,0,Mt,Ut,null));else if(b.isDataTexture)if(Yt.length>0){Gt&&fe&&e.texStorage2D(i.TEXTURE_2D,dt,Ft,Yt[0].width,Yt[0].height);for(let q=0,J=Yt.length;q<J;q++)St=Yt[q],Gt?U&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,St.width,St.height,Mt,Ut,St.data):e.texImage2D(i.TEXTURE_2D,q,Ft,St.width,St.height,0,Mt,Ut,St.data);b.generateMipmaps=!1}else Gt?(fe&&e.texStorage2D(i.TEXTURE_2D,dt,Ft,st.width,st.height),U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,st.width,st.height,Mt,Ut,st.data)):e.texImage2D(i.TEXTURE_2D,0,Ft,st.width,st.height,0,Mt,Ut,st.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Gt&&fe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,Ft,Yt[0].width,Yt[0].height,st.depth);for(let q=0,J=Yt.length;q<J;q++)if(St=Yt[q],b.format!==dn)if(Mt!==null)if(Gt){if(U)if(b.layerUpdates.size>0){const gt=Dc(St.width,St.height,b.format,b.type);for(const pt of b.layerUpdates){const Bt=St.data.subarray(pt*gt/St.data.BYTES_PER_ELEMENT,(pt+1)*gt/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,pt,St.width,St.height,1,Mt,Bt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,St.width,St.height,st.depth,Mt,St.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Ft,St.width,St.height,st.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,St.width,St.height,st.depth,Mt,Ut,St.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,Ft,St.width,St.height,st.depth,0,Mt,Ut,St.data)}else{Gt&&fe&&e.texStorage2D(i.TEXTURE_2D,dt,Ft,Yt[0].width,Yt[0].height);for(let q=0,J=Yt.length;q<J;q++)St=Yt[q],b.format!==dn?Mt!==null?Gt?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,St.width,St.height,Mt,St.data):e.compressedTexImage2D(i.TEXTURE_2D,q,Ft,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?U&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,St.width,St.height,Mt,Ut,St.data):e.texImage2D(i.TEXTURE_2D,q,Ft,St.width,St.height,0,Mt,Ut,St.data)}else if(b.isDataArrayTexture)if(Gt){if(fe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,Ft,st.width,st.height,st.depth),U)if(b.layerUpdates.size>0){const q=Dc(st.width,st.height,b.format,b.type);for(const J of b.layerUpdates){const gt=st.data.subarray(J*q/st.data.BYTES_PER_ELEMENT,(J+1)*q/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,st.width,st.height,1,Mt,Ut,gt)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,Mt,Ut,st.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ft,st.width,st.height,st.depth,0,Mt,Ut,st.data);else if(b.isData3DTexture)Gt?(fe&&e.texStorage3D(i.TEXTURE_3D,dt,Ft,st.width,st.height,st.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,Mt,Ut,st.data)):e.texImage3D(i.TEXTURE_3D,0,Ft,st.width,st.height,st.depth,0,Mt,Ut,st.data);else if(b.isFramebufferTexture){if(fe)if(Gt)e.texStorage2D(i.TEXTURE_2D,dt,Ft,st.width,st.height);else{let q=st.width,J=st.height;for(let gt=0;gt<dt;gt++)e.texImage2D(i.TEXTURE_2D,gt,Ft,q,J,0,Mt,Ut,null),q>>=1,J>>=1}}else if(Yt.length>0){if(Gt&&fe){const q=xt(Yt[0]);e.texStorage2D(i.TEXTURE_2D,dt,Ft,q.width,q.height)}for(let q=0,J=Yt.length;q<J;q++)St=Yt[q],Gt?U&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,Mt,Ut,St):e.texImage2D(i.TEXTURE_2D,q,Ft,Mt,Ut,St);b.generateMipmaps=!1}else if(Gt){if(fe){const q=xt(st);e.texStorage2D(i.TEXTURE_2D,dt,Ft,q.width,q.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Mt,Ut,st)}else e.texImage2D(i.TEXTURE_2D,0,Ft,Mt,Ut,st);m(b)&&p(Z),bt.__version=K.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function et(T,b,B){if(b.image.length!==6)return;const Z=kt(T,b),Q=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);const K=n.get(Q);if(Q.version!==K.__version||Z===!0){e.activeTexture(i.TEXTURE0+B);const bt=$t.getPrimaries($t.workingColorSpace),ut=b.colorSpace===qn?null:$t.getPrimaries(b.colorSpace),_t=b.colorSpace===qn||bt===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const Xt=b.isCompressedTexture||b.image[0].isCompressedTexture,st=b.image[0]&&b.image[0].isDataTexture,Mt=[];for(let J=0;J<6;J++)!Xt&&!st?Mt[J]=y(b.image[J],!0,s.maxCubemapSize):Mt[J]=st?b.image[J].image:b.image[J],Mt[J]=It(b,Mt[J]);const Ut=Mt[0],Ft=r.convert(b.format,b.colorSpace),St=r.convert(b.type),Yt=M(b.internalFormat,Ft,St,b.colorSpace),Gt=b.isVideoTexture!==!0,fe=K.__version===void 0||Z===!0,U=Q.dataReady;let dt=R(b,Ut);Pt(i.TEXTURE_CUBE_MAP,b);let q;if(Xt){Gt&&fe&&e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Yt,Ut.width,Ut.height);for(let J=0;J<6;J++){q=Mt[J].mipmaps;for(let gt=0;gt<q.length;gt++){const pt=q[gt];b.format!==dn?Ft!==null?Gt?U&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt,0,0,pt.width,pt.height,Ft,pt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt,Yt,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Gt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt,0,0,pt.width,pt.height,Ft,St,pt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt,Yt,pt.width,pt.height,0,Ft,St,pt.data)}}}else{if(q=b.mipmaps,Gt&&fe){q.length>0&&dt++;const J=xt(Mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Yt,J.width,J.height)}for(let J=0;J<6;J++)if(st){Gt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Mt[J].width,Mt[J].height,Ft,St,Mt[J].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Yt,Mt[J].width,Mt[J].height,0,Ft,St,Mt[J].data);for(let gt=0;gt<q.length;gt++){const Bt=q[gt].image[J].image;Gt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt+1,0,0,Bt.width,Bt.height,Ft,St,Bt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt+1,Yt,Bt.width,Bt.height,0,Ft,St,Bt.data)}}else{Gt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ft,St,Mt[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Yt,Ft,St,Mt[J]);for(let gt=0;gt<q.length;gt++){const pt=q[gt];Gt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt+1,0,0,Ft,St,pt.image[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,gt+1,Yt,Ft,St,pt.image[J])}}}m(b)&&p(i.TEXTURE_CUBE_MAP),K.__version=Q.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function vt(T,b,B,Z,Q,K){const bt=r.convert(B.format,B.colorSpace),ut=r.convert(B.type),_t=M(B.internalFormat,bt,ut,B.colorSpace),Xt=n.get(b),st=n.get(B);if(st.__renderTarget=b,!Xt.__hasExternalTextures){const Mt=Math.max(1,b.width>>K),Ut=Math.max(1,b.height>>K);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,K,_t,Mt,Ut,b.depth,0,bt,ut,null):e.texImage2D(Q,K,_t,Mt,Ut,0,bt,ut,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),yt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,Q,st.__webglTexture,0,nt(b)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,Q,st.__webglTexture,K),e.bindFramebuffer(i.FRAMEBUFFER,null)}function rt(T,b,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),b.depthBuffer){const Z=b.depthTexture,Q=Z&&Z.isDepthTexture?Z.type:null,K=x(b.stencilBuffer,Q),bt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=nt(b);yt(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ut,K,b.width,b.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ut,K,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,K,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,bt,i.RENDERBUFFER,T)}else{const Z=b.textures;for(let Q=0;Q<Z.length;Q++){const K=Z[Q],bt=r.convert(K.format,K.colorSpace),ut=r.convert(K.type),_t=M(K.internalFormat,bt,ut,K.colorSpace),Xt=nt(b);B&&yt(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Xt,_t,b.width,b.height):yt(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Xt,_t,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,_t,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function At(T,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(b.depthTexture);Z.__renderTarget=b,(!Z.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),X(b.depthTexture,0);const Q=Z.__webglTexture,K=nt(b);if(b.depthTexture.format===Xi)yt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(b.depthTexture.format===ji)yt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Nt(T){const b=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==T.depthTexture){const Z=T.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),Z){const Q=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,Z.removeEventListener("dispose",Q)};Z.addEventListener("dispose",Q),b.__depthDisposeCallback=Q}b.__boundDepthTexture=Z}if(T.depthTexture&&!b.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");At(b.__webglFramebuffer,T)}else if(B){b.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[Z]),b.__webglDepthbuffer[Z]===void 0)b.__webglDepthbuffer[Z]=i.createRenderbuffer(),rt(b.__webglDepthbuffer[Z],T,!1);else{const Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=b.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,K)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),rt(b.__webglDepthbuffer,T,!1);else{const Z=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,Q)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Lt(T,b,B){const Z=n.get(T);b!==void 0&&vt(Z.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Nt(T)}function Kt(T){const b=T.texture,B=n.get(T),Z=n.get(b);T.addEventListener("dispose",A);const Q=T.textures,K=T.isWebGLCubeRenderTarget===!0,bt=Q.length>1;if(bt||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=b.version,a.memory.textures++),K){B.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer[ut]=[];for(let _t=0;_t<b.mipmaps.length;_t++)B.__webglFramebuffer[ut][_t]=i.createFramebuffer()}else B.__webglFramebuffer[ut]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer=[];for(let ut=0;ut<b.mipmaps.length;ut++)B.__webglFramebuffer[ut]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(bt)for(let ut=0,_t=Q.length;ut<_t;ut++){const Xt=n.get(Q[ut]);Xt.__webglTexture===void 0&&(Xt.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&yt(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ut=0;ut<Q.length;ut++){const _t=Q[ut];B.__webglColorRenderbuffer[ut]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ut]);const Xt=r.convert(_t.format,_t.colorSpace),st=r.convert(_t.type),Mt=M(_t.internalFormat,Xt,st,_t.colorSpace,T.isXRRenderTarget===!0),Ut=nt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ut,Mt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,B.__webglColorRenderbuffer[ut])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),rt(B.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Pt(i.TEXTURE_CUBE_MAP,b);for(let ut=0;ut<6;ut++)if(b.mipmaps&&b.mipmaps.length>0)for(let _t=0;_t<b.mipmaps.length;_t++)vt(B.__webglFramebuffer[ut][_t],T,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,_t);else vt(B.__webglFramebuffer[ut],T,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);m(b)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let ut=0,_t=Q.length;ut<_t;ut++){const Xt=Q[ut],st=n.get(Xt);e.bindTexture(i.TEXTURE_2D,st.__webglTexture),Pt(i.TEXTURE_2D,Xt),vt(B.__webglFramebuffer,T,Xt,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,0),m(Xt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let ut=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ut=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ut,Z.__webglTexture),Pt(ut,b),b.mipmaps&&b.mipmaps.length>0)for(let _t=0;_t<b.mipmaps.length;_t++)vt(B.__webglFramebuffer[_t],T,b,i.COLOR_ATTACHMENT0,ut,_t);else vt(B.__webglFramebuffer,T,b,i.COLOR_ATTACHMENT0,ut,0);m(b)&&p(ut),e.unbindTexture()}T.depthBuffer&&Nt(T)}function j(T){const b=T.textures;for(let B=0,Z=b.length;B<Z;B++){const Q=b[B];if(m(Q)){const K=v(T),bt=n.get(Q).__webglTexture;e.bindTexture(K,bt),p(K),e.unbindTexture()}}}const at=[],P=[];function Ct(T){if(T.samples>0){if(yt(T)===!1){const b=T.textures,B=T.width,Z=T.height;let Q=i.COLOR_BUFFER_BIT;const K=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,bt=n.get(T),ut=b.length>1;if(ut)for(let _t=0;_t<b.length;_t++)e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let _t=0;_t<b.length;_t++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ut){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,bt.__webglColorRenderbuffer[_t]);const Xt=n.get(b[_t]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Xt,0)}i.blitFramebuffer(0,0,B,Z,0,0,B,Z,Q,i.NEAREST),l===!0&&(at.length=0,P.length=0,at.push(i.COLOR_ATTACHMENT0+_t),T.depthBuffer&&T.resolveDepthBuffer===!1&&(at.push(K),P.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,P)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,at))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ut)for(let _t=0;_t<b.length;_t++){e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,bt.__webglColorRenderbuffer[_t]);const Xt=n.get(b[_t]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,Xt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const b=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function nt(T){return Math.min(s.maxSamples,T.samples)}function yt(T){const b=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ct(T){const b=a.render.frame;c.get(T)!==b&&(c.set(T,b),T.update())}function It(T,b){const B=T.colorSpace,Z=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==is&&B!==qn&&($t.getTransfer(B)===ae?(Z!==dn||Q!==Nn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),b}function xt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(h.width=T.naturalWidth||T.width,h.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(h.width=T.displayWidth,h.height=T.displayHeight):(h.width=T.width,h.height=T.height),h}this.allocateTextureUnit=I,this.resetTextureUnits=k,this.setTexture2D=X,this.setTexture2DArray=O,this.setTexture3D=H,this.setTextureCube=G,this.rebindTextures=Lt,this.setupRenderTarget=Kt,this.updateRenderTargetMipmap=j,this.updateMultisampleRenderTarget=Ct,this.setupDepthRenderbuffer=Nt,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=yt}function Vv(i,t){function e(n,s=qn){let r;const a=$t.getTransfer(s);if(n===Nn)return i.UNSIGNED_BYTE;if(n===Zo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ko)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Wh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Gh)return i.BYTE;if(n===Vh)return i.SHORT;if(n===Us)return i.UNSIGNED_SHORT;if(n===$o)return i.INT;if(n===pi)return i.UNSIGNED_INT;if(n===yn)return i.FLOAT;if(n===pn)return i.HALF_FLOAT;if(n===Xh)return i.ALPHA;if(n===qh)return i.RGB;if(n===dn)return i.RGBA;if(n===Yh)return i.LUMINANCE;if(n===$h)return i.LUMINANCE_ALPHA;if(n===Xi)return i.DEPTH_COMPONENT;if(n===ji)return i.DEPTH_STENCIL;if(n===Jo)return i.RED;if(n===jo)return i.RED_INTEGER;if(n===Zh)return i.RG;if(n===Qo)return i.RG_INTEGER;if(n===tl)return i.RGBA_INTEGER;if(n===Er||n===Tr||n===wr||n===Ar)if(a===ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Er)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Er)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Tr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===wr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ar)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===io||n===so||n===ro||n===ao)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===io)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===so)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ro)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ao)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===oo||n===lo||n===co)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===oo||n===lo)return a===ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===co)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===vo||n===xo||n===_o||n===yo||n===Mo||n===So||n===bo||n===Eo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ho)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===uo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===fo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===po)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===mo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===go)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===vo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===_o)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===yo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Mo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===So)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===bo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Eo)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Cr||n===To||n===wo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Cr)return a===ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===To)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===wo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Kh||n===Ao||n===Co||n===Ro)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Cr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ao)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Co)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ro)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ji?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Wv extends We{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class hi extends Le{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Xv={type:"move"};class La{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){a=!0;for(const y of t.hand.values()){const m=e.getJointPose(y,n),p=this._getHandJoint(h,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const c=h.joints["index-finger-tip"],u=h.joints["thumb-tip"],f=c.position.distanceTo(u.position),d=.02,g=.005;h.inputState.pinching&&f>d+g?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&f<=d-g&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Xv)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new hi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const qv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Yv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class $v{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ne,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ee({vertexShader:qv,fragmentShader:Yv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new le(new Oe(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Zv extends ss{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,h=null,c=null,u=null,f=null,d=null,g=null;const y=new $v,m=e.getContextAttributes();let p=null,v=null;const M=[],x=[],R=new it;let w=null;const A=new We;A.viewport=new se;const L=new We;L.viewport=new se;const S=[A,L],_=new Wv;let C=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let et=M[$];return et===void 0&&(et=new La,M[$]=et),et.getTargetRaySpace()},this.getControllerGrip=function($){let et=M[$];return et===void 0&&(et=new La,M[$]=et),et.getGripSpace()},this.getHand=function($){let et=M[$];return et===void 0&&(et=new La,M[$]=et),et.getHandSpace()};function I($){const et=x.indexOf($.inputSource);if(et===-1)return;const vt=M[et];vt!==void 0&&(vt.update($.inputSource,$.frame,h||a),vt.dispatchEvent({type:$.type,data:$.inputSource}))}function z(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",X);for(let $=0;$<M.length;$++){const et=x[$];et!==null&&(x[$]=null,M[$].disconnect(et))}C=null,k=null,y.reset(),t.setRenderTarget(p),d=null,f=null,u=null,s=null,v=null,kt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function($){h=$},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",z),s.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(R),s.renderState.layers===void 0){const et={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Qe(d.framebufferWidth,d.framebufferHeight,{format:dn,type:Nn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let et=null,vt=null,rt=null;m.depth&&(rt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=m.stencil?ji:Xi,vt=m.stencil?Ji:pi);const At={colorFormat:e.RGBA8,depthFormat:rt,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(At),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),v=new Qe(f.textureWidth,f.textureHeight,{format:dn,type:Nn,depthTexture:new hu(f.textureWidth,f.textureHeight,vt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),h=null,a=await s.requestReferenceSpace(o),kt.setContext(s),kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function X($){for(let et=0;et<$.removed.length;et++){const vt=$.removed[et],rt=x.indexOf(vt);rt>=0&&(x[rt]=null,M[rt].disconnect(vt))}for(let et=0;et<$.added.length;et++){const vt=$.added[et];let rt=x.indexOf(vt);if(rt===-1){for(let Nt=0;Nt<M.length;Nt++)if(Nt>=x.length){x.push(vt),rt=Nt;break}else if(x[Nt]===null){x[Nt]=vt,rt=Nt;break}if(rt===-1)break}const At=M[rt];At&&At.connect(vt)}}const O=new D,H=new D;function G($,et,vt){O.setFromMatrixPosition(et.matrixWorld),H.setFromMatrixPosition(vt.matrixWorld);const rt=O.distanceTo(H),At=et.projectionMatrix.elements,Nt=vt.projectionMatrix.elements,Lt=At[14]/(At[10]-1),Kt=At[14]/(At[10]+1),j=(At[9]+1)/At[5],at=(At[9]-1)/At[5],P=(At[8]-1)/At[0],Ct=(Nt[8]+1)/Nt[0],nt=Lt*P,yt=Lt*Ct,ct=rt/(-P+Ct),It=ct*-P;if(et.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(It),$.translateZ(ct),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),At[10]===-1)$.projectionMatrix.copy(et.projectionMatrix),$.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const xt=Lt+ct,T=Kt+ct,b=nt-It,B=yt+(rt-It),Z=j*Kt/T*xt,Q=at*Kt/T*xt;$.projectionMatrix.makePerspective(b,B,Z,Q,xt,T),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function tt($,et){et===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(et.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let et=$.near,vt=$.far;y.texture!==null&&(y.depthNear>0&&(et=y.depthNear),y.depthFar>0&&(vt=y.depthFar)),_.near=L.near=A.near=et,_.far=L.far=A.far=vt,(C!==_.near||k!==_.far)&&(s.updateRenderState({depthNear:_.near,depthFar:_.far}),C=_.near,k=_.far),A.layers.mask=$.layers.mask|2,L.layers.mask=$.layers.mask|4,_.layers.mask=A.layers.mask|L.layers.mask;const rt=$.parent,At=_.cameras;tt(_,rt);for(let Nt=0;Nt<At.length;Nt++)tt(At[Nt],rt);At.length===2?G(_,A,L):_.projectionMatrix.copy(A.projectionMatrix),lt($,_,rt)};function lt($,et,vt){vt===null?$.matrix.copy(et.matrixWorld):($.matrix.copy(vt.matrixWorld),$.matrix.invert(),$.matrix.multiply(et.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(et.projectionMatrix),$.projectionMatrixInverse.copy(et.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Po*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(_)};let ft=null;function Pt($,et){if(c=et.getViewerPose(h||a),g=et,c!==null){const vt=c.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let rt=!1;vt.length!==_.cameras.length&&(_.cameras.length=0,rt=!0);for(let Nt=0;Nt<vt.length;Nt++){const Lt=vt[Nt];let Kt=null;if(d!==null)Kt=d.getViewport(Lt);else{const at=u.getViewSubImage(f,Lt);Kt=at.viewport,Nt===0&&(t.setRenderTargetTextures(v,at.colorTexture,f.ignoreDepthValues?void 0:at.depthStencilTexture),t.setRenderTarget(v))}let j=S[Nt];j===void 0&&(j=new We,j.layers.enable(Nt),j.viewport=new se,S[Nt]=j),j.matrix.fromArray(Lt.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(Lt.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(Kt.x,Kt.y,Kt.width,Kt.height),Nt===0&&(_.matrix.copy(j.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),rt===!0&&_.cameras.push(j)}const At=s.enabledFeatures;if(At&&At.includes("depth-sensing")){const Nt=u.getDepthInformation(vt[0]);Nt&&Nt.isValid&&Nt.texture&&y.init(t,Nt,s.renderState)}}for(let vt=0;vt<M.length;vt++){const rt=x[vt],At=M[vt];rt!==null&&At!==void 0&&At.update(rt,et,h||a)}ft&&ft($,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}const kt=new cu;kt.setAnimationLoop(Pt),this.setAnimationLoop=function($){ft=$},this.dispose=function(){}}}const si=new mn,Kv=new te;function Jv(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,au(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,v,M,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),c(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),y(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,v,M):p.isSpriteMaterial?h(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===ke&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===ke&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=t.get(p),M=v.envMap,x=v.envMapRotation;M&&(m.envMap.value=M,si.copy(x),si.x*=-1,si.y*=-1,si.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),m.envMapRotation.value.setFromMatrix4(Kv.makeRotationFromEuler(si)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,v,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ke&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){const v=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function jv(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,M){const x=M.program;n.uniformBlockBinding(v,x)}function h(v,M){let x=s[v.id];x===void 0&&(g(v),x=c(v),s[v.id]=x,v.addEventListener("dispose",m));const R=M.program;n.updateUBOMapping(v,R);const w=t.render.frame;r[v.id]!==w&&(f(v),r[v.id]=w)}function c(v){const M=u();v.__bindingPointIndex=M;const x=i.createBuffer(),R=v.__size,w=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,R,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,x),x}function u(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const M=s[v.id],x=v.uniforms,R=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let w=0,A=x.length;w<A;w++){const L=Array.isArray(x[w])?x[w]:[x[w]];for(let S=0,_=L.length;S<_;S++){const C=L[S];if(d(C,w,S,R)===!0){const k=C.__offset,I=Array.isArray(C.value)?C.value:[C.value];let z=0;for(let X=0;X<I.length;X++){const O=I[X],H=y(O);typeof O=="number"||typeof O=="boolean"?(C.__data[0]=O,i.bufferSubData(i.UNIFORM_BUFFER,k+z,C.__data)):O.isMatrix3?(C.__data[0]=O.elements[0],C.__data[1]=O.elements[1],C.__data[2]=O.elements[2],C.__data[3]=0,C.__data[4]=O.elements[3],C.__data[5]=O.elements[4],C.__data[6]=O.elements[5],C.__data[7]=0,C.__data[8]=O.elements[6],C.__data[9]=O.elements[7],C.__data[10]=O.elements[8],C.__data[11]=0):(O.toArray(C.__data,z),z+=H.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(v,M,x,R){const w=v.value,A=M+"_"+x;if(R[A]===void 0)return typeof w=="number"||typeof w=="boolean"?R[A]=w:R[A]=w.clone(),!0;{const L=R[A];if(typeof w=="number"||typeof w=="boolean"){if(L!==w)return R[A]=w,!0}else if(L.equals(w)===!1)return L.copy(w),!0}return!1}function g(v){const M=v.uniforms;let x=0;const R=16;for(let A=0,L=M.length;A<L;A++){const S=Array.isArray(M[A])?M[A]:[M[A]];for(let _=0,C=S.length;_<C;_++){const k=S[_],I=Array.isArray(k.value)?k.value:[k.value];for(let z=0,X=I.length;z<X;z++){const O=I[z],H=y(O),G=x%R,tt=G%H.boundary,lt=G+tt;x+=tt,lt!==0&&R-lt<H.storage&&(x+=R-lt),k.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=x,x+=H.storage}}}const w=x%R;return w>0&&(x+=R-w),v.__size=x,v.__cache={},this}function y(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function m(v){const M=v.target;M.removeEventListener("dispose",m);const x=a.indexOf(M.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function p(){for(const v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:h,dispose:p}}class Qv{constructor(t={}){const{canvas:e=Gd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const g=new Uint32Array(4),y=new Int32Array(4);let m=null,p=null;const v=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ve,this.toneMapping=Zn,this.toneMappingExposure=1;const x=this;let R=!1,w=0,A=0,L=null,S=-1,_=null;const C=new se,k=new se;let I=null;const z=new Dt(0);let X=0,O=e.width,H=e.height,G=1,tt=null,lt=null;const ft=new se(0,0,O,H),Pt=new se(0,0,O,H);let kt=!1;const $=new nl;let et=!1,vt=!1;const rt=new te,At=new te,Nt=new D,Lt=new se,Kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let j=!1;function at(){return L===null?G:1}let P=n;function Ct(E,N){return e.getContext(E,N)}try{const E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${qo}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",gt,!1),e.addEventListener("webglcontextcreationerror",pt,!1),P===null){const N="webgl2";if(P=Ct(N,E),P===null)throw Ct(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let nt,yt,ct,It,xt,T,b,B,Z,Q,K,bt,ut,_t,Xt,st,Mt,Ut,Ft,St,Yt,Gt,fe,U;function dt(){nt=new sg(P),nt.init(),Gt=new Vv(P,nt),yt=new j0(P,nt,t,Gt),ct=new zv(P,nt),yt.reverseDepthBuffer&&f&&ct.buffers.depth.setReversed(!0),It=new og(P),xt=new Tv,T=new Gv(P,nt,ct,xt,yt,Gt,It),b=new tg(x),B=new ig(x),Z=new pp(P),fe=new K0(P,Z),Q=new rg(P,Z,It,fe),K=new cg(P,Q,Z,It),Ft=new lg(P,yt,T),st=new Q0(xt),bt=new Ev(x,b,B,nt,yt,fe,st),ut=new Jv(x,xt),_t=new Av,Xt=new Iv(nt),Ut=new Z0(x,b,B,ct,K,d,l),Mt=new kv(x,K,yt),U=new jv(P,It,yt,ct),St=new J0(P,nt,It),Yt=new ag(P,nt,It),It.programs=bt.programs,x.capabilities=yt,x.extensions=nt,x.properties=xt,x.renderLists=_t,x.shadowMap=Mt,x.state=ct,x.info=It}dt();const q=new Zv(x,P);this.xr=q,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const E=nt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=nt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(E){E!==void 0&&(G=E,this.setSize(O,H,!1))},this.getSize=function(E){return E.set(O,H)},this.setSize=function(E,N,V=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=E,H=N,e.width=Math.floor(E*G),e.height=Math.floor(N*G),V===!0&&(e.style.width=E+"px",e.style.height=N+"px"),this.setViewport(0,0,E,N)},this.getDrawingBufferSize=function(E){return E.set(O*G,H*G).floor()},this.setDrawingBufferSize=function(E,N,V){O=E,H=N,G=V,e.width=Math.floor(E*V),e.height=Math.floor(N*V),this.setViewport(0,0,E,N)},this.getCurrentViewport=function(E){return E.copy(C)},this.getViewport=function(E){return E.copy(ft)},this.setViewport=function(E,N,V,W){E.isVector4?ft.set(E.x,E.y,E.z,E.w):ft.set(E,N,V,W),ct.viewport(C.copy(ft).multiplyScalar(G).round())},this.getScissor=function(E){return E.copy(Pt)},this.setScissor=function(E,N,V,W){E.isVector4?Pt.set(E.x,E.y,E.z,E.w):Pt.set(E,N,V,W),ct.scissor(k.copy(Pt).multiplyScalar(G).round())},this.getScissorTest=function(){return kt},this.setScissorTest=function(E){ct.setScissorTest(kt=E)},this.setOpaqueSort=function(E){tt=E},this.setTransparentSort=function(E){lt=E},this.getClearColor=function(E){return E.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor.apply(Ut,arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha.apply(Ut,arguments)},this.clear=function(E=!0,N=!0,V=!0){let W=0;if(E){let F=!1;if(L!==null){const ot=L.texture.format;F=ot===tl||ot===Qo||ot===jo}if(F){const ot=L.texture.type,mt=ot===Nn||ot===pi||ot===Us||ot===Ji||ot===Zo||ot===Ko,Et=Ut.getClearColor(),Tt=Ut.getClearAlpha(),Ot=Et.r,zt=Et.g,wt=Et.b;mt?(g[0]=Ot,g[1]=zt,g[2]=wt,g[3]=Tt,P.clearBufferuiv(P.COLOR,0,g)):(y[0]=Ot,y[1]=zt,y[2]=wt,y[3]=Tt,P.clearBufferiv(P.COLOR,0,y))}else W|=P.COLOR_BUFFER_BIT}N&&(W|=P.DEPTH_BUFFER_BIT),V&&(W|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",gt,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),_t.dispose(),Xt.dispose(),xt.dispose(),b.dispose(),B.dispose(),K.dispose(),fe.dispose(),U.dispose(),bt.dispose(),q.dispose(),q.removeEventListener("sessionstart",vl),q.removeEventListener("sessionend",xl),jn.stop()};function J(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function gt(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const E=It.autoReset,N=Mt.enabled,V=Mt.autoUpdate,W=Mt.needsUpdate,F=Mt.type;dt(),It.autoReset=E,Mt.enabled=N,Mt.autoUpdate=V,Mt.needsUpdate=W,Mt.type=F}function pt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Bt(E){const N=E.target;N.removeEventListener("dispose",Bt),ye(N)}function ye(E){De(E),xt.remove(E)}function De(E){const N=xt.get(E).programs;N!==void 0&&(N.forEach(function(V){bt.releaseProgram(V)}),E.isShaderMaterial&&bt.releaseShaderCache(E))}this.renderBufferDirect=function(E,N,V,W,F,ot){N===null&&(N=Kt);const mt=F.isMesh&&F.matrixWorld.determinant()<0,Et=zu(E,N,V,W,F);ct.setMaterial(W,mt);let Tt=V.index,Ot=1;if(W.wireframe===!0){if(Tt=Q.getWireframeAttribute(V),Tt===void 0)return;Ot=2}const zt=V.drawRange,wt=V.attributes.position;let Jt=zt.start*Ot,de=(zt.start+zt.count)*Ot;ot!==null&&(Jt=Math.max(Jt,ot.start*Ot),de=Math.min(de,(ot.start+ot.count)*Ot)),Tt!==null?(Jt=Math.max(Jt,0),de=Math.min(de,Tt.count)):wt!=null&&(Jt=Math.max(Jt,0),de=Math.min(de,wt.count));const me=de-Jt;if(me<0||me===1/0)return;fe.setup(F,W,Et,V,Tt);let ze,ee=St;if(Tt!==null&&(ze=Z.get(Tt),ee=Yt,ee.setIndex(ze)),F.isMesh)W.wireframe===!0?(ct.setLineWidth(W.wireframeLinewidth*at()),ee.setMode(P.LINES)):ee.setMode(P.TRIANGLES);else if(F.isLine){let Rt=W.linewidth;Rt===void 0&&(Rt=1),ct.setLineWidth(Rt*at()),F.isLineSegments?ee.setMode(P.LINES):F.isLineLoop?ee.setMode(P.LINE_LOOP):ee.setMode(P.LINE_STRIP)}else F.isPoints?ee.setMode(P.POINTS):F.isSprite&&ee.setMode(P.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ee.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(nt.get("WEBGL_multi_draw"))ee.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Rt=F._multiDrawStarts,bn=F._multiDrawCounts,ne=F._multiDrawCount,on=Tt?Z.get(Tt).bytesPerElement:1,yi=xt.get(W).currentProgram.getUniforms();for(let Xe=0;Xe<ne;Xe++)yi.setValue(P,"_gl_DrawID",Xe),ee.render(Rt[Xe]/on,bn[Xe])}else if(F.isInstancedMesh)ee.renderInstances(Jt,me,F.count);else if(V.isInstancedBufferGeometry){const Rt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,bn=Math.min(V.instanceCount,Rt);ee.renderInstances(Jt,me,bn)}else ee.render(Jt,me)};function re(E,N,V){E.transparent===!0&&E.side===Ke&&E.forceSinglePass===!1?(E.side=ke,E.needsUpdate=!0,Xs(E,N,V),E.side=Kn,E.needsUpdate=!0,Xs(E,N,V),E.side=Ke):Xs(E,N,V)}this.compile=function(E,N,V=null){V===null&&(V=E),p=Xt.get(V),p.init(N),M.push(p),V.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),E!==V&&E.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const W=new Set;return E.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ot=F.material;if(ot)if(Array.isArray(ot))for(let mt=0;mt<ot.length;mt++){const Et=ot[mt];re(Et,V,F),W.add(Et)}else re(ot,V,F),W.add(ot)}),M.pop(),p=null,W},this.compileAsync=function(E,N,V=null){const W=this.compile(E,N,V);return new Promise(F=>{function ot(){if(W.forEach(function(mt){xt.get(mt).currentProgram.isReady()&&W.delete(mt)}),W.size===0){F(E);return}setTimeout(ot,10)}nt.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let an=null;function Sn(E){an&&an(E)}function vl(){jn.stop()}function xl(){jn.start()}const jn=new cu;jn.setAnimationLoop(Sn),typeof self<"u"&&jn.setContext(self),this.setAnimationLoop=function(E){an=E,q.setAnimationLoop(E),E===null?jn.stop():jn.start()},q.addEventListener("sessionstart",vl),q.addEventListener("sessionend",xl),this.render=function(E,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(N),N=q.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,N,L),p=Xt.get(E,M.length),p.init(N),M.push(p),At.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),$.setFromProjectionMatrix(At),vt=this.localClippingEnabled,et=st.init(this.clippingPlanes,vt),m=_t.get(E,v.length),m.init(),v.push(m),q.enabled===!0&&q.isPresenting===!0){const ot=x.xr.getDepthSensingMesh();ot!==null&&Jr(ot,N,-1/0,x.sortObjects)}Jr(E,N,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(tt,lt),j=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,j&&Ut.addToRenderList(m,E),this.info.render.frame++,et===!0&&st.beginShadows();const V=p.state.shadowsArray;Mt.render(V,E,N),et===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,F=m.transmissive;if(p.setupLights(),N.isArrayCamera){const ot=N.cameras;if(F.length>0)for(let mt=0,Et=ot.length;mt<Et;mt++){const Tt=ot[mt];yl(W,F,E,Tt)}j&&Ut.render(E);for(let mt=0,Et=ot.length;mt<Et;mt++){const Tt=ot[mt];_l(m,E,Tt,Tt.viewport)}}else F.length>0&&yl(W,F,E,N),j&&Ut.render(E),_l(m,E,N);L!==null&&(T.updateMultisampleRenderTarget(L),T.updateRenderTargetMipmap(L)),E.isScene===!0&&E.onAfterRender(x,E,N),fe.resetDefaultState(),S=-1,_=null,M.pop(),M.length>0?(p=M[M.length-1],et===!0&&st.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function Jr(E,N,V,W){if(E.visible===!1)return;if(E.layers.test(N.layers)){if(E.isGroup)V=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(N);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||$.intersectsSprite(E)){W&&Lt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(At);const mt=K.update(E),Et=E.material;Et.visible&&m.push(E,mt,Et,V,Lt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||$.intersectsObject(E))){const mt=K.update(E),Et=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Lt.copy(E.boundingSphere.center)):(mt.boundingSphere===null&&mt.computeBoundingSphere(),Lt.copy(mt.boundingSphere.center)),Lt.applyMatrix4(E.matrixWorld).applyMatrix4(At)),Array.isArray(Et)){const Tt=mt.groups;for(let Ot=0,zt=Tt.length;Ot<zt;Ot++){const wt=Tt[Ot],Jt=Et[wt.materialIndex];Jt&&Jt.visible&&m.push(E,mt,Jt,V,Lt.z,wt)}}else Et.visible&&m.push(E,mt,Et,V,Lt.z,null)}}const ot=E.children;for(let mt=0,Et=ot.length;mt<Et;mt++)Jr(ot[mt],N,V,W)}function _l(E,N,V,W){const F=E.opaque,ot=E.transmissive,mt=E.transparent;p.setupLightsView(V),et===!0&&st.setGlobalState(x.clippingPlanes,V),W&&ct.viewport(C.copy(W)),F.length>0&&Ws(F,N,V),ot.length>0&&Ws(ot,N,V),mt.length>0&&Ws(mt,N,V),ct.buffers.depth.setTest(!0),ct.buffers.depth.setMask(!0),ct.buffers.color.setMask(!0),ct.setPolygonOffset(!1)}function yl(E,N,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Qe(1,1,{generateMipmaps:!0,type:nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float")?pn:Nn,minFilter:ci,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));const ot=p.state.transmissionRenderTarget[W.id],mt=W.viewport||C;ot.setSize(mt.z,mt.w);const Et=x.getRenderTarget();x.setRenderTarget(ot),x.getClearColor(z),X=x.getClearAlpha(),X<1&&x.setClearColor(16777215,.5),x.clear(),j&&Ut.render(V);const Tt=x.toneMapping;x.toneMapping=Zn;const Ot=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),et===!0&&st.setGlobalState(x.clippingPlanes,W),Ws(E,V,W),T.updateMultisampleRenderTarget(ot),T.updateRenderTargetMipmap(ot),nt.has("WEBGL_multisampled_render_to_texture")===!1){let zt=!1;for(let wt=0,Jt=N.length;wt<Jt;wt++){const de=N[wt],me=de.object,ze=de.geometry,ee=de.material,Rt=de.group;if(ee.side===Ke&&me.layers.test(W.layers)){const bn=ee.side;ee.side=ke,ee.needsUpdate=!0,Ml(me,V,W,ze,ee,Rt),ee.side=bn,ee.needsUpdate=!0,zt=!0}}zt===!0&&(T.updateMultisampleRenderTarget(ot),T.updateRenderTargetMipmap(ot))}x.setRenderTarget(Et),x.setClearColor(z,X),Ot!==void 0&&(W.viewport=Ot),x.toneMapping=Tt}function Ws(E,N,V){const W=N.isScene===!0?N.overrideMaterial:null;for(let F=0,ot=E.length;F<ot;F++){const mt=E[F],Et=mt.object,Tt=mt.geometry,Ot=W===null?mt.material:W,zt=mt.group;Et.layers.test(V.layers)&&Ml(Et,N,V,Tt,Ot,zt)}}function Ml(E,N,V,W,F,ot){E.onBeforeRender(x,N,V,W,F,ot),E.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),F.onBeforeRender(x,N,V,W,E,ot),F.transparent===!0&&F.side===Ke&&F.forceSinglePass===!1?(F.side=ke,F.needsUpdate=!0,x.renderBufferDirect(V,N,W,F,E,ot),F.side=Kn,F.needsUpdate=!0,x.renderBufferDirect(V,N,W,F,E,ot),F.side=Ke):x.renderBufferDirect(V,N,W,F,E,ot),E.onAfterRender(x,N,V,W,F,ot)}function Xs(E,N,V){N.isScene!==!0&&(N=Kt);const W=xt.get(E),F=p.state.lights,ot=p.state.shadowsArray,mt=F.state.version,Et=bt.getParameters(E,F.state,ot,N,V),Tt=bt.getProgramCacheKey(Et);let Ot=W.programs;W.environment=E.isMeshStandardMaterial?N.environment:null,W.fog=N.fog,W.envMap=(E.isMeshStandardMaterial?B:b).get(E.envMap||W.environment),W.envMapRotation=W.environment!==null&&E.envMap===null?N.environmentRotation:E.envMapRotation,Ot===void 0&&(E.addEventListener("dispose",Bt),Ot=new Map,W.programs=Ot);let zt=Ot.get(Tt);if(zt!==void 0){if(W.currentProgram===zt&&W.lightsStateVersion===mt)return bl(E,Et),zt}else Et.uniforms=bt.getUniforms(E),E.onBeforeCompile(Et,x),zt=bt.acquireProgram(Et,Tt),Ot.set(Tt,zt),W.uniforms=Et.uniforms;const wt=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(wt.clippingPlanes=st.uniform),bl(E,Et),W.needsLights=Gu(E),W.lightsStateVersion=mt,W.needsLights&&(wt.ambientLightColor.value=F.state.ambient,wt.lightProbe.value=F.state.probe,wt.directionalLights.value=F.state.directional,wt.directionalLightShadows.value=F.state.directionalShadow,wt.spotLights.value=F.state.spot,wt.spotLightShadows.value=F.state.spotShadow,wt.rectAreaLights.value=F.state.rectArea,wt.ltc_1.value=F.state.rectAreaLTC1,wt.ltc_2.value=F.state.rectAreaLTC2,wt.pointLights.value=F.state.point,wt.pointLightShadows.value=F.state.pointShadow,wt.hemisphereLights.value=F.state.hemi,wt.directionalShadowMap.value=F.state.directionalShadowMap,wt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,wt.spotShadowMap.value=F.state.spotShadowMap,wt.spotLightMatrix.value=F.state.spotLightMatrix,wt.spotLightMap.value=F.state.spotLightMap,wt.pointShadowMap.value=F.state.pointShadowMap,wt.pointShadowMatrix.value=F.state.pointShadowMatrix),W.currentProgram=zt,W.uniformsList=null,zt}function Sl(E){if(E.uniformsList===null){const N=E.currentProgram.getUniforms();E.uniformsList=Rr.seqWithValue(N.seq,E.uniforms)}return E.uniformsList}function bl(E,N){const V=xt.get(E);V.outputColorSpace=N.outputColorSpace,V.batching=N.batching,V.batchingColor=N.batchingColor,V.instancing=N.instancing,V.instancingColor=N.instancingColor,V.instancingMorph=N.instancingMorph,V.skinning=N.skinning,V.morphTargets=N.morphTargets,V.morphNormals=N.morphNormals,V.morphColors=N.morphColors,V.morphTargetsCount=N.morphTargetsCount,V.numClippingPlanes=N.numClippingPlanes,V.numIntersection=N.numClipIntersection,V.vertexAlphas=N.vertexAlphas,V.vertexTangents=N.vertexTangents,V.toneMapping=N.toneMapping}function zu(E,N,V,W,F){N.isScene!==!0&&(N=Kt),T.resetTextureUnits();const ot=N.fog,mt=W.isMeshStandardMaterial?N.environment:null,Et=L===null?x.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:is,Tt=(W.isMeshStandardMaterial?B:b).get(W.envMap||mt),Ot=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,zt=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),wt=!!V.morphAttributes.position,Jt=!!V.morphAttributes.normal,de=!!V.morphAttributes.color;let me=Zn;W.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(me=x.toneMapping);const ze=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ee=ze!==void 0?ze.length:0,Rt=xt.get(W),bn=p.state.lights;if(et===!0&&(vt===!0||E!==_)){const en=E===_&&W.id===S;st.setState(W,E,en)}let ne=!1;W.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==bn.state.version||Rt.outputColorSpace!==Et||F.isBatchedMesh&&Rt.batching===!1||!F.isBatchedMesh&&Rt.batching===!0||F.isBatchedMesh&&Rt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Rt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Rt.instancing===!1||!F.isInstancedMesh&&Rt.instancing===!0||F.isSkinnedMesh&&Rt.skinning===!1||!F.isSkinnedMesh&&Rt.skinning===!0||F.isInstancedMesh&&Rt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Rt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Rt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Rt.instancingMorph===!1&&F.morphTexture!==null||Rt.envMap!==Tt||W.fog===!0&&Rt.fog!==ot||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==st.numPlanes||Rt.numIntersection!==st.numIntersection)||Rt.vertexAlphas!==Ot||Rt.vertexTangents!==zt||Rt.morphTargets!==wt||Rt.morphNormals!==Jt||Rt.morphColors!==de||Rt.toneMapping!==me||Rt.morphTargetsCount!==ee)&&(ne=!0):(ne=!0,Rt.__version=W.version);let on=Rt.currentProgram;ne===!0&&(on=Xs(W,N,F));let yi=!1,Xe=!1,ls=!1;const ge=on.getUniforms(),gn=Rt.uniforms;if(ct.useProgram(on.program)&&(yi=!0,Xe=!0,ls=!0),W.id!==S&&(S=W.id,Xe=!0),yi||_!==E){ct.buffers.depth.getReversed()?(rt.copy(E.projectionMatrix),Wd(rt),Xd(rt),ge.setValue(P,"projectionMatrix",rt)):ge.setValue(P,"projectionMatrix",E.projectionMatrix),ge.setValue(P,"viewMatrix",E.matrixWorldInverse);const Fn=ge.map.cameraPosition;Fn!==void 0&&Fn.setValue(P,Nt.setFromMatrixPosition(E.matrixWorld)),yt.logarithmicDepthBuffer&&ge.setValue(P,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&ge.setValue(P,"isOrthographic",E.isOrthographicCamera===!0),_!==E&&(_=E,Xe=!0,ls=!0)}if(F.isSkinnedMesh){ge.setOptional(P,F,"bindMatrix"),ge.setOptional(P,F,"bindMatrixInverse");const en=F.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),ge.setValue(P,"boneTexture",en.boneTexture,T))}F.isBatchedMesh&&(ge.setOptional(P,F,"batchingTexture"),ge.setValue(P,"batchingTexture",F._matricesTexture,T),ge.setOptional(P,F,"batchingIdTexture"),ge.setValue(P,"batchingIdTexture",F._indirectTexture,T),ge.setOptional(P,F,"batchingColorTexture"),F._colorsTexture!==null&&ge.setValue(P,"batchingColorTexture",F._colorsTexture,T));const cs=V.morphAttributes;if((cs.position!==void 0||cs.normal!==void 0||cs.color!==void 0)&&Ft.update(F,V,on),(Xe||Rt.receiveShadow!==F.receiveShadow)&&(Rt.receiveShadow=F.receiveShadow,ge.setValue(P,"receiveShadow",F.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(gn.envMap.value=Tt,gn.flipEnvMap.value=Tt.isCubeTexture&&Tt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&N.environment!==null&&(gn.envMapIntensity.value=N.environmentIntensity),Xe&&(ge.setValue(P,"toneMappingExposure",x.toneMappingExposure),Rt.needsLights&&Hu(gn,ls),ot&&W.fog===!0&&ut.refreshFogUniforms(gn,ot),ut.refreshMaterialUniforms(gn,W,G,H,p.state.transmissionRenderTarget[E.id]),Rr.upload(P,Sl(Rt),gn,T)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Rr.upload(P,Sl(Rt),gn,T),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&ge.setValue(P,"center",F.center),ge.setValue(P,"modelViewMatrix",F.modelViewMatrix),ge.setValue(P,"normalMatrix",F.normalMatrix),ge.setValue(P,"modelMatrix",F.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const en=W.uniformsGroups;for(let Fn=0,On=en.length;Fn<On;Fn++){const El=en[Fn];U.update(El,on),U.bind(El,on)}}return on}function Hu(E,N){E.ambientLightColor.needsUpdate=N,E.lightProbe.needsUpdate=N,E.directionalLights.needsUpdate=N,E.directionalLightShadows.needsUpdate=N,E.pointLights.needsUpdate=N,E.pointLightShadows.needsUpdate=N,E.spotLights.needsUpdate=N,E.spotLightShadows.needsUpdate=N,E.rectAreaLights.needsUpdate=N,E.hemisphereLights.needsUpdate=N}function Gu(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(E,N,V){xt.get(E.texture).__webglTexture=N,xt.get(E.depthTexture).__webglTexture=V;const W=xt.get(E);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||nt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,N){const V=xt.get(E);V.__webglFramebuffer=N,V.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(E,N=0,V=0){L=E,w=N,A=V;let W=!0,F=null,ot=!1,mt=!1;if(E){const Tt=xt.get(E);if(Tt.__useDefaultFramebuffer!==void 0)ct.bindFramebuffer(P.FRAMEBUFFER,null),W=!1;else if(Tt.__webglFramebuffer===void 0)T.setupRenderTarget(E);else if(Tt.__hasExternalTextures)T.rebindTextures(E,xt.get(E.texture).__webglTexture,xt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const wt=E.depthTexture;if(Tt.__boundDepthTexture!==wt){if(wt!==null&&xt.has(wt)&&(E.width!==wt.image.width||E.height!==wt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(E)}}const Ot=E.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(mt=!0);const zt=xt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(zt[N])?F=zt[N][V]:F=zt[N],ot=!0):E.samples>0&&T.useMultisampledRTT(E)===!1?F=xt.get(E).__webglMultisampledFramebuffer:Array.isArray(zt)?F=zt[V]:F=zt,C.copy(E.viewport),k.copy(E.scissor),I=E.scissorTest}else C.copy(ft).multiplyScalar(G).floor(),k.copy(Pt).multiplyScalar(G).floor(),I=kt;if(ct.bindFramebuffer(P.FRAMEBUFFER,F)&&W&&ct.drawBuffers(E,F),ct.viewport(C),ct.scissor(k),ct.setScissorTest(I),ot){const Tt=xt.get(E.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,Tt.__webglTexture,V)}else if(mt){const Tt=xt.get(E.texture),Ot=N||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Tt.__webglTexture,V||0,Ot)}S=-1},this.readRenderTargetPixels=function(E,N,V,W,F,ot,mt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=xt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&mt!==void 0&&(Et=Et[mt]),Et){ct.bindFramebuffer(P.FRAMEBUFFER,Et);try{const Tt=E.texture,Ot=Tt.format,zt=Tt.type;if(!yt.textureFormatReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!yt.textureTypeReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=E.width-W&&V>=0&&V<=E.height-F&&P.readPixels(N,V,W,F,Gt.convert(Ot),Gt.convert(zt),ot)}finally{const Tt=L!==null?xt.get(L).__webglFramebuffer:null;ct.bindFramebuffer(P.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(E,N,V,W,F,ot,mt){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=xt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&mt!==void 0&&(Et=Et[mt]),Et){const Tt=E.texture,Ot=Tt.format,zt=Tt.type;if(!yt.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!yt.textureTypeReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=E.width-W&&V>=0&&V<=E.height-F){ct.bindFramebuffer(P.FRAMEBUFFER,Et);const wt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,wt),P.bufferData(P.PIXEL_PACK_BUFFER,ot.byteLength,P.STREAM_READ),P.readPixels(N,V,W,F,Gt.convert(Ot),Gt.convert(zt),0);const Jt=L!==null?xt.get(L).__webglFramebuffer:null;ct.bindFramebuffer(P.FRAMEBUFFER,Jt);const de=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Vd(P,de,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,wt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ot),P.deleteBuffer(wt),P.deleteSync(de),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,N=null,V=0){E.isTexture!==!0&&(ys("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,E=arguments[1]);const W=Math.pow(2,-V),F=Math.floor(E.image.width*W),ot=Math.floor(E.image.height*W),mt=N!==null?N.x:0,Et=N!==null?N.y:0;T.setTexture2D(E,0),P.copyTexSubImage2D(P.TEXTURE_2D,V,0,0,mt,Et,F,ot),ct.unbindTexture()},this.copyTextureToTexture=function(E,N,V=null,W=null,F=0){E.isTexture!==!0&&(ys("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,E=arguments[1],N=arguments[2],F=arguments[3]||0,V=null);let ot,mt,Et,Tt,Ot,zt,wt,Jt,de;const me=E.isCompressedTexture?E.mipmaps[F]:E.image;V!==null?(ot=V.max.x-V.min.x,mt=V.max.y-V.min.y,Et=V.isBox3?V.max.z-V.min.z:1,Tt=V.min.x,Ot=V.min.y,zt=V.isBox3?V.min.z:0):(ot=me.width,mt=me.height,Et=me.depth||1,Tt=0,Ot=0,zt=0),W!==null?(wt=W.x,Jt=W.y,de=W.z):(wt=0,Jt=0,de=0);const ze=Gt.convert(N.format),ee=Gt.convert(N.type);let Rt;N.isData3DTexture?(T.setTexture3D(N,0),Rt=P.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(T.setTexture2DArray(N,0),Rt=P.TEXTURE_2D_ARRAY):(T.setTexture2D(N,0),Rt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const bn=P.getParameter(P.UNPACK_ROW_LENGTH),ne=P.getParameter(P.UNPACK_IMAGE_HEIGHT),on=P.getParameter(P.UNPACK_SKIP_PIXELS),yi=P.getParameter(P.UNPACK_SKIP_ROWS),Xe=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,me.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,me.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Tt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ot),P.pixelStorei(P.UNPACK_SKIP_IMAGES,zt);const ls=E.isDataArrayTexture||E.isData3DTexture,ge=N.isDataArrayTexture||N.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const gn=xt.get(E),cs=xt.get(N),en=xt.get(gn.__renderTarget),Fn=xt.get(cs.__renderTarget);ct.bindFramebuffer(P.READ_FRAMEBUFFER,en.__webglFramebuffer),ct.bindFramebuffer(P.DRAW_FRAMEBUFFER,Fn.__webglFramebuffer);for(let On=0;On<Et;On++)ls&&P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,xt.get(E).__webglTexture,F,zt+On),E.isDepthTexture?(ge&&P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,xt.get(N).__webglTexture,F,de+On),P.blitFramebuffer(Tt,Ot,ot,mt,wt,Jt,ot,mt,P.DEPTH_BUFFER_BIT,P.NEAREST)):ge?P.copyTexSubImage3D(Rt,F,wt,Jt,de+On,Tt,Ot,ot,mt):P.copyTexSubImage2D(Rt,F,wt,Jt,de+On,Tt,Ot,ot,mt);ct.bindFramebuffer(P.READ_FRAMEBUFFER,null),ct.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else ge?E.isDataTexture||E.isData3DTexture?P.texSubImage3D(Rt,F,wt,Jt,de,ot,mt,Et,ze,ee,me.data):N.isCompressedArrayTexture?P.compressedTexSubImage3D(Rt,F,wt,Jt,de,ot,mt,Et,ze,me.data):P.texSubImage3D(Rt,F,wt,Jt,de,ot,mt,Et,ze,ee,me):E.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,F,wt,Jt,ot,mt,ze,ee,me.data):E.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,F,wt,Jt,me.width,me.height,ze,me.data):P.texSubImage2D(P.TEXTURE_2D,F,wt,Jt,ot,mt,ze,ee,me);P.pixelStorei(P.UNPACK_ROW_LENGTH,bn),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ne),P.pixelStorei(P.UNPACK_SKIP_PIXELS,on),P.pixelStorei(P.UNPACK_SKIP_ROWS,yi),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Xe),F===0&&N.generateMipmaps&&P.generateMipmap(Rt),ct.unbindTexture()},this.copyTextureToTexture3D=function(E,N,V=null,W=null,F=0){return E.isTexture!==!0&&(ys("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,W=arguments[1]||null,E=arguments[2],N=arguments[3],F=arguments[4]||0),ys('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,N,V,W,F)},this.initRenderTarget=function(E){xt.get(E).__webglFramebuffer===void 0&&T.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?T.setTextureCube(E,0):E.isData3DTexture?T.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?T.setTexture2DArray(E,0):T.setTexture2D(E,0),ct.unbindTexture()},this.resetState=function(){w=0,A=0,L=null,ct.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}}class rl{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Dt(t),this.density=e}clone(){return new rl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class mu extends Le{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mn,this.environmentIntensity=1,this.environmentRotation=new mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class tx extends Ne{constructor(t=null,e=1,n=1,s,r,a,o,l,h=je,c=je,u,f){super(null,a,o,l,h,c,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ws extends rn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Oi=new te,Ic=new te,mr=[],Uc=new _i,ex=new te,gs=new le,vs=new zs;class Io extends le{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ws(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,ex)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new _i),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Oi),Uc.copy(t.boundingBox).applyMatrix4(Oi),this.boundingBox.union(Uc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new zs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Oi),vs.copy(t.boundingSphere).applyMatrix4(Oi),this.boundingSphere.union(vs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(gs.geometry=this.geometry,gs.material=this.material,gs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vs.copy(this.boundingSphere),vs.applyMatrix4(n),t.ray.intersectsSphere(vs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Oi),Ic.multiplyMatrices(n,Oi),gs.matrixWorld=Ic,gs.raycast(t,mr);for(let a=0,o=mr.length;a<o;a++){const l=mr[a];l.instanceId=r,l.object=this,e.push(l)}mr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ws(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new tx(new Float32Array(s*this.count),s,this.count,Jo,yn));const r=this.morphTexture.source.data.data;let a=0;for(let h=0;h<n.length;h++)a+=n[h];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class nx extends Ne{constructor(t,e,n,s,r,a,o,l,h){super(t,e,n,s,r,a,o,l,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Mn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,h;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),h=n[s]-a,h<0)o=s+1;else if(h>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const c=n[s],f=n[s+1]-c,d=(a-c)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new it:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new D,s=[],r=[],a=[],o=new D,l=new te;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new D)}r[0]=new D,a[0]=new D;let h=Number.MAX_VALUE;const c=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);c<=h&&(h=c,n.set(1,0,0)),u<=h&&(h=u,n.set(0,1,0)),f<=h&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Re(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,g))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Re(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class al extends Mn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new it){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),h=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const c=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=h-this.aY;l=f*c-d*u+this.aX,h=f*u+d*c+this.aY}return n.set(l,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class ix extends al{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ol(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,h){s(a,o,h*(o-r),h*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,h,c,u){let f=(a-r)/h-(o-r)/(h+c)+(o-a)/c,d=(o-a)/c-(l-a)/(c+u)+(l-o)/u;f*=c,d*=c,s(a,o,f,d)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const gr=new D,Da=new ol,Ia=new ol,Ua=new ol;class sx extends Mn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new D){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let h,c;this.closed||o>0?h=s[(o-1)%r]:(gr.subVectors(s[0],s[1]).add(s[0]),h=gr);const u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?c=s[(o+2)%r]:(gr.subVectors(s[r-1],s[r-2]).add(s[r-1]),c=gr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(h.distanceToSquared(u),d),y=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(c),d);y<1e-4&&(y=1),g<1e-4&&(g=y),m<1e-4&&(m=y),Da.initNonuniformCatmullRom(h.x,u.x,f.x,c.x,g,y,m),Ia.initNonuniformCatmullRom(h.y,u.y,f.y,c.y,g,y,m),Ua.initNonuniformCatmullRom(h.z,u.z,f.z,c.z,g,y,m)}else this.curveType==="catmullrom"&&(Da.initCatmullRom(h.x,u.x,f.x,c.x,this.tension),Ia.initCatmullRom(h.y,u.y,f.y,c.y,this.tension),Ua.initCatmullRom(h.z,u.z,f.z,c.z,this.tension));return n.set(Da.calc(l),Ia.calc(l),Ua.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Nc(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function rx(i,t){const e=1-i;return e*e*t}function ax(i,t){return 2*(1-i)*i*t}function ox(i,t){return i*i*t}function As(i,t,e,n){return rx(i,t)+ax(i,e)+ox(i,n)}function lx(i,t){const e=1-i;return e*e*e*t}function cx(i,t){const e=1-i;return 3*e*e*i*t}function hx(i,t){return 3*(1-i)*i*i*t}function ux(i,t){return i*i*i*t}function Cs(i,t,e,n,s){return lx(i,t)+cx(i,e)+hx(i,n)+ux(i,s)}class gu extends Mn{constructor(t=new it,e=new it,n=new it,s=new it){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new it){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Cs(t,s.x,r.x,a.x,o.x),Cs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class fx extends Mn{constructor(t=new D,e=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new D){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Cs(t,s.x,r.x,a.x,o.x),Cs(t,s.y,r.y,a.y,o.y),Cs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class vu extends Mn{constructor(t=new it,e=new it){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new it){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new it){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class dx extends Mn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class xu extends Mn{constructor(t=new it,e=new it,n=new it){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new it){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(As(t,s.x,r.x,a.x),As(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class px extends Mn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(As(t,s.x,r.x,a.x),As(t,s.y,r.y,a.y),As(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class _u extends Mn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new it){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],h=s[a],c=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(Nc(o,l.x,h.x,c.x,u.x),Nc(o,l.y,h.y,c.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new it().fromArray(s))}return this}}var Uo=Object.freeze({__proto__:null,ArcCurve:ix,CatmullRomCurve3:sx,CubicBezierCurve:gu,CubicBezierCurve3:fx,EllipseCurve:al,LineCurve:vu,LineCurve3:dx,QuadraticBezierCurve:xu,QuadraticBezierCurve3:px,SplineCurve:_u});class mx extends Mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Uo[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),h=l===0?0:1-a/l;return o.getPointAt(h,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let h=0;h<l.length;h++){const c=l[h];n&&n.equals(c)||(e.push(c),n=c)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Uo[s.type]().fromJSON(s))}return this}}class Fc extends mx{constructor(t){super(),this.type="Path",this.currentPoint=new it,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new vu(this.currentPoint.clone(),new it(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new xu(this.currentPoint.clone(),new it(t,e),new it(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new gu(this.currentPoint.clone(),new it(t,e),new it(n,s),new it(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new _u(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){const h=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(t+h,e+c,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){const h=new al(t,e,n,s,r,a,o,l);if(this.curves.length>0){const u=h.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(h);const c=h.getPoint(1);return this.currentPoint.copy(c),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Nr extends Be{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],h=new D,c=new it;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*s;h.x=t*Math.cos(d),h.y=t*Math.sin(d),a.push(h.x,h.y,h.z),o.push(0,0,1),c.x=(a[f]/t+1)/2,c.y=(a[f+1]/t+1)/2,l.push(c.x,c.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new pe(a,3)),this.setAttribute("normal",new pe(o,3)),this.setAttribute("uv",new pe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Nr(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ge extends Be{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const h=this;s=Math.floor(s),r=Math.floor(r);const c=[],u=[],f=[],d=[];let g=0;const y=[],m=n/2;let p=0;v(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(c),this.setAttribute("position",new pe(u,3)),this.setAttribute("normal",new pe(f,3)),this.setAttribute("uv",new pe(d,2));function v(){const x=new D,R=new D;let w=0;const A=(e-t)/n;for(let L=0;L<=r;L++){const S=[],_=L/r,C=_*(e-t)+t;for(let k=0;k<=s;k++){const I=k/s,z=I*l+o,X=Math.sin(z),O=Math.cos(z);R.x=C*X,R.y=-_*n+m,R.z=C*O,u.push(R.x,R.y,R.z),x.set(X,A,O).normalize(),f.push(x.x,x.y,x.z),d.push(I,1-_),S.push(g++)}y.push(S)}for(let L=0;L<s;L++)for(let S=0;S<r;S++){const _=y[S][L],C=y[S+1][L],k=y[S+1][L+1],I=y[S][L+1];(t>0||S!==0)&&(c.push(_,C,I),w+=3),(e>0||S!==r-1)&&(c.push(C,k,I),w+=3)}h.addGroup(p,w,0),p+=w}function M(x){const R=g,w=new it,A=new D;let L=0;const S=x===!0?t:e,_=x===!0?1:-1;for(let k=1;k<=s;k++)u.push(0,m*_,0),f.push(0,_,0),d.push(.5,.5),g++;const C=g;for(let k=0;k<=s;k++){const z=k/s*l+o,X=Math.cos(z),O=Math.sin(z);A.x=S*O,A.y=m*_,A.z=S*X,u.push(A.x,A.y,A.z),f.push(0,_,0),w.x=X*.5+.5,w.y=O*.5*_+.5,d.push(w.x,w.y),g++}for(let k=0;k<s;k++){const I=R+k,z=C+k;x===!0?c.push(z,z+1,I):c.push(z+1,z,I),L+=3}h.addGroup(p,L,x===!0?1:2),p+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ge(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ll extends Ge{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new ll(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Gs extends Be{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),h(n),c(),this.setAttribute("position",new pe(r,3)),this.setAttribute("normal",new pe(r.slice(),3)),this.setAttribute("uv",new pe(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const M=new D,x=new D,R=new D;for(let w=0;w<e.length;w+=3)d(e[w+0],M),d(e[w+1],x),d(e[w+2],R),l(M,x,R,v)}function l(v,M,x,R){const w=R+1,A=[];for(let L=0;L<=w;L++){A[L]=[];const S=v.clone().lerp(x,L/w),_=M.clone().lerp(x,L/w),C=w-L;for(let k=0;k<=C;k++)k===0&&L===w?A[L][k]=S:A[L][k]=S.clone().lerp(_,k/C)}for(let L=0;L<w;L++)for(let S=0;S<2*(w-L)-1;S++){const _=Math.floor(S/2);S%2===0?(f(A[L][_+1]),f(A[L+1][_]),f(A[L][_])):(f(A[L][_+1]),f(A[L+1][_+1]),f(A[L+1][_]))}}function h(v){const M=new D;for(let x=0;x<r.length;x+=3)M.x=r[x+0],M.y=r[x+1],M.z=r[x+2],M.normalize().multiplyScalar(v),r[x+0]=M.x,r[x+1]=M.y,r[x+2]=M.z}function c(){const v=new D;for(let M=0;M<r.length;M+=3){v.x=r[M+0],v.y=r[M+1],v.z=r[M+2];const x=m(v)/2/Math.PI+.5,R=p(v)/Math.PI+.5;a.push(x,1-R)}g(),u()}function u(){for(let v=0;v<a.length;v+=6){const M=a[v+0],x=a[v+2],R=a[v+4],w=Math.max(M,x,R),A=Math.min(M,x,R);w>.9&&A<.1&&(M<.2&&(a[v+0]+=1),x<.2&&(a[v+2]+=1),R<.2&&(a[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function d(v,M){const x=v*3;M.x=t[x+0],M.y=t[x+1],M.z=t[x+2]}function g(){const v=new D,M=new D,x=new D,R=new D,w=new it,A=new it,L=new it;for(let S=0,_=0;S<r.length;S+=9,_+=6){v.set(r[S+0],r[S+1],r[S+2]),M.set(r[S+3],r[S+4],r[S+5]),x.set(r[S+6],r[S+7],r[S+8]),w.set(a[_+0],a[_+1]),A.set(a[_+2],a[_+3]),L.set(a[_+4],a[_+5]),R.copy(v).add(M).add(x).divideScalar(3);const C=m(R);y(w,_+0,v,C),y(A,_+2,M,C),y(L,_+4,x,C)}}function y(v,M,x,R){R<0&&v.x===1&&(a[M]=v.x-1),x.x===0&&x.z===0&&(a[M]=R/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gs(t.vertices,t.indices,t.radius,t.details)}}class yu extends Fc{constructor(t){super(t),this.uuid=rs(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Fc().fromJSON(s))}return this}}const gx={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Mu(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,h,c,u,f,d;if(n&&(r=Mx(i,t,r,e)),i.length>80*e){o=h=i[0],l=c=i[1];for(let g=e;g<s;g+=e)u=i[g],f=i[g+1],u<o&&(o=u),f<l&&(l=f),u>h&&(h=u),f>c&&(c=f);d=Math.max(h-o,c-l),d=d!==0?32767/d:0}return Ns(r,a,e,o,l,d,0),a}};function Mu(i,t,e,n,s){let r,a;if(s===Dx(i,t,e,n)>0)for(r=t;r<e;r+=n)a=Oc(r,i[r],i[r+1],a);else for(r=e-n;r>=t;r-=n)a=Oc(r,i[r],i[r+1],a);return a&&Xr(a,a.next)&&(Os(a),a=a.next),a}function mi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Xr(e,e.next)||_e(e.prev,e,e.next)===0)){if(Os(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ns(i,t,e,n,s,r,a){if(!i)return;!a&&r&&wx(i,n,s,r);let o=i,l,h;for(;i.prev!==i.next;){if(l=i.prev,h=i.next,r?xx(i,n,s,r):vx(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(h.i/e|0),Os(i),i=h.next,o=h.next;continue}if(i=h,i===o){a?a===1?(i=_x(mi(i),t,e),Ns(i,t,e,n,s,r,2)):a===2&&yx(i,t,e,n,s,r):Ns(mi(i),t,e,n,s,r,1);break}}}function vx(i){const t=i.prev,e=i,n=i.next;if(_e(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,h=n.y,c=s<r?s<a?s:a:r<a?r:a,u=o<l?o<h?o:h:l<h?l:h,f=s>r?s>a?s:a:r>a?r:a,d=o>l?o>h?o:h:l>h?l:h;let g=n.next;for(;g!==t;){if(g.x>=c&&g.x<=f&&g.y>=u&&g.y<=d&&Hi(s,o,r,l,a,h,g.x,g.y)&&_e(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function xx(i,t,e,n){const s=i.prev,r=i,a=i.next;if(_e(s,r,a)>=0)return!1;const o=s.x,l=r.x,h=a.x,c=s.y,u=r.y,f=a.y,d=o<l?o<h?o:h:l<h?l:h,g=c<u?c<f?c:f:u<f?u:f,y=o>l?o>h?o:h:l>h?l:h,m=c>u?c>f?c:f:u>f?u:f,p=No(d,g,t,e,n),v=No(y,m,t,e,n);let M=i.prevZ,x=i.nextZ;for(;M&&M.z>=p&&x&&x.z<=v;){if(M.x>=d&&M.x<=y&&M.y>=g&&M.y<=m&&M!==s&&M!==a&&Hi(o,c,l,u,h,f,M.x,M.y)&&_e(M.prev,M,M.next)>=0||(M=M.prevZ,x.x>=d&&x.x<=y&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&Hi(o,c,l,u,h,f,x.x,x.y)&&_e(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;M&&M.z>=p;){if(M.x>=d&&M.x<=y&&M.y>=g&&M.y<=m&&M!==s&&M!==a&&Hi(o,c,l,u,h,f,M.x,M.y)&&_e(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;x&&x.z<=v;){if(x.x>=d&&x.x<=y&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&Hi(o,c,l,u,h,f,x.x,x.y)&&_e(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function _x(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!Xr(s,r)&&Su(s,n,n.next,r)&&Fs(s,r)&&Fs(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Os(n),Os(n.next),n=i=r),n=n.next}while(n!==i);return mi(n)}function yx(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Rx(a,o)){let l=bu(a,o);a=mi(a,a.next),l=mi(l,l.next),Ns(a,t,e,n,s,r,0),Ns(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Mx(i,t,e,n){const s=[];let r,a,o,l,h;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,h=Mu(i,o,l,n,!1),h===h.next&&(h.steiner=!0),s.push(Cx(h));for(s.sort(Sx),r=0;r<s.length;r++)e=bx(s[r],e);return e}function Sx(i,t){return i.x-t.x}function bx(i,t){const e=Ex(i,t);if(!e)return t;const n=bu(e,i);return mi(n,n.next),mi(e,e.next)}function Ex(i,t){let e=t,n=-1/0,s;const r=i.x,a=i.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const f=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;const o=s,l=s.x,h=s.y;let c=1/0,u;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&Hi(a<h?r:n,a,l,h,a<h?n:r,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(r-e.x),Fs(e,i)&&(u<c||u===c&&(e.x>s.x||e.x===s.x&&Tx(s,e)))&&(s=e,c=u)),e=e.next;while(e!==o);return s}function Tx(i,t){return _e(i.prev,i,t.prev)<0&&_e(t.next,i,i.next)<0}function wx(i,t,e,n){let s=i;do s.z===0&&(s.z=No(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Ax(s)}function Ax(i){let t,e,n,s,r,a,o,l,h=1;do{for(e=i,i=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<h&&(o++,n=n.nextZ,!!n);t++);for(l=h;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,o--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,h*=2}while(a>1);return i}function No(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Cx(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Hi(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function Rx(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Px(i,t)&&(Fs(i,t)&&Fs(t,i)&&Lx(i,t)&&(_e(i.prev,i,t.prev)||_e(i,t.prev,t))||Xr(i,t)&&_e(i.prev,i,i.next)>0&&_e(t.prev,t,t.next)>0)}function _e(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Xr(i,t){return i.x===t.x&&i.y===t.y}function Su(i,t,e,n){const s=xr(_e(i,t,e)),r=xr(_e(i,t,n)),a=xr(_e(e,n,i)),o=xr(_e(e,n,t));return!!(s!==r&&a!==o||s===0&&vr(i,e,t)||r===0&&vr(i,n,t)||a===0&&vr(e,i,n)||o===0&&vr(e,t,n))}function vr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function xr(i){return i>0?1:i<0?-1:0}function Px(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Su(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Fs(i,t){return _e(i.prev,i,i.next)<0?_e(i,t,i.next)>=0&&_e(i,i.prev,t)>=0:_e(i,t,i.prev)<0||_e(i,i.next,t)<0}function Lx(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function bu(i,t){const e=new Fo(i.i,i.x,i.y),n=new Fo(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Oc(i,t,e,n){const s=new Fo(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Os(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Fo(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Dx(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Rs{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Rs.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];kc(t),Bc(n,t);let a=t.length;e.forEach(kc);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,Bc(n,e[l]);const o=gx.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function kc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Bc(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class cl extends Be{constructor(t=new yu([new it(.5,.5),new it(-.5,.5),new it(-.5,-.5),new it(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){const h=t[o];a(h)}this.setAttribute("position",new pe(s,3)),this.setAttribute("uv",new pe(r,2)),this.computeVertexNormals();function a(o){const l=[],h=e.curveSegments!==void 0?e.curveSegments:12,c=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:d-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,v=e.UVGenerator!==void 0?e.UVGenerator:Ix;let M,x=!1,R,w,A,L;p&&(M=p.getSpacedPoints(c),x=!0,f=!1,R=p.computeFrenetFrames(c,!1),w=new D,A=new D,L=new D),f||(m=0,d=0,g=0,y=0);const S=o.extractPoints(h);let _=S.shape;const C=S.holes;if(!Rs.isClockWise(_)){_=_.reverse();for(let j=0,at=C.length;j<at;j++){const P=C[j];Rs.isClockWise(P)&&(C[j]=P.reverse())}}const I=Rs.triangulateShape(_,C),z=_;for(let j=0,at=C.length;j<at;j++){const P=C[j];_=_.concat(P)}function X(j,at,P){return at||console.error("THREE.ExtrudeGeometry: vec does not exist"),j.clone().addScaledVector(at,P)}const O=_.length,H=I.length;function G(j,at,P){let Ct,nt,yt;const ct=j.x-at.x,It=j.y-at.y,xt=P.x-j.x,T=P.y-j.y,b=ct*ct+It*It,B=ct*T-It*xt;if(Math.abs(B)>Number.EPSILON){const Z=Math.sqrt(b),Q=Math.sqrt(xt*xt+T*T),K=at.x-It/Z,bt=at.y+ct/Z,ut=P.x-T/Q,_t=P.y+xt/Q,Xt=((ut-K)*T-(_t-bt)*xt)/(ct*T-It*xt);Ct=K+ct*Xt-j.x,nt=bt+It*Xt-j.y;const st=Ct*Ct+nt*nt;if(st<=2)return new it(Ct,nt);yt=Math.sqrt(st/2)}else{let Z=!1;ct>Number.EPSILON?xt>Number.EPSILON&&(Z=!0):ct<-Number.EPSILON?xt<-Number.EPSILON&&(Z=!0):Math.sign(It)===Math.sign(T)&&(Z=!0),Z?(Ct=-It,nt=ct,yt=Math.sqrt(b)):(Ct=ct,nt=It,yt=Math.sqrt(b/2))}return new it(Ct/yt,nt/yt)}const tt=[];for(let j=0,at=z.length,P=at-1,Ct=j+1;j<at;j++,P++,Ct++)P===at&&(P=0),Ct===at&&(Ct=0),tt[j]=G(z[j],z[P],z[Ct]);const lt=[];let ft,Pt=tt.concat();for(let j=0,at=C.length;j<at;j++){const P=C[j];ft=[];for(let Ct=0,nt=P.length,yt=nt-1,ct=Ct+1;Ct<nt;Ct++,yt++,ct++)yt===nt&&(yt=0),ct===nt&&(ct=0),ft[Ct]=G(P[Ct],P[yt],P[ct]);lt.push(ft),Pt=Pt.concat(ft)}for(let j=0;j<m;j++){const at=j/m,P=d*Math.cos(at*Math.PI/2),Ct=g*Math.sin(at*Math.PI/2)+y;for(let nt=0,yt=z.length;nt<yt;nt++){const ct=X(z[nt],tt[nt],Ct);rt(ct.x,ct.y,-P)}for(let nt=0,yt=C.length;nt<yt;nt++){const ct=C[nt];ft=lt[nt];for(let It=0,xt=ct.length;It<xt;It++){const T=X(ct[It],ft[It],Ct);rt(T.x,T.y,-P)}}}const kt=g+y;for(let j=0;j<O;j++){const at=f?X(_[j],Pt[j],kt):_[j];x?(A.copy(R.normals[0]).multiplyScalar(at.x),w.copy(R.binormals[0]).multiplyScalar(at.y),L.copy(M[0]).add(A).add(w),rt(L.x,L.y,L.z)):rt(at.x,at.y,0)}for(let j=1;j<=c;j++)for(let at=0;at<O;at++){const P=f?X(_[at],Pt[at],kt):_[at];x?(A.copy(R.normals[j]).multiplyScalar(P.x),w.copy(R.binormals[j]).multiplyScalar(P.y),L.copy(M[j]).add(A).add(w),rt(L.x,L.y,L.z)):rt(P.x,P.y,u/c*j)}for(let j=m-1;j>=0;j--){const at=j/m,P=d*Math.cos(at*Math.PI/2),Ct=g*Math.sin(at*Math.PI/2)+y;for(let nt=0,yt=z.length;nt<yt;nt++){const ct=X(z[nt],tt[nt],Ct);rt(ct.x,ct.y,u+P)}for(let nt=0,yt=C.length;nt<yt;nt++){const ct=C[nt];ft=lt[nt];for(let It=0,xt=ct.length;It<xt;It++){const T=X(ct[It],ft[It],Ct);x?rt(T.x,T.y+M[c-1].y,M[c-1].x+P):rt(T.x,T.y,u+P)}}}$(),et();function $(){const j=s.length/3;if(f){let at=0,P=O*at;for(let Ct=0;Ct<H;Ct++){const nt=I[Ct];At(nt[2]+P,nt[1]+P,nt[0]+P)}at=c+m*2,P=O*at;for(let Ct=0;Ct<H;Ct++){const nt=I[Ct];At(nt[0]+P,nt[1]+P,nt[2]+P)}}else{for(let at=0;at<H;at++){const P=I[at];At(P[2],P[1],P[0])}for(let at=0;at<H;at++){const P=I[at];At(P[0]+O*c,P[1]+O*c,P[2]+O*c)}}n.addGroup(j,s.length/3-j,0)}function et(){const j=s.length/3;let at=0;vt(z,at),at+=z.length;for(let P=0,Ct=C.length;P<Ct;P++){const nt=C[P];vt(nt,at),at+=nt.length}n.addGroup(j,s.length/3-j,1)}function vt(j,at){let P=j.length;for(;--P>=0;){const Ct=P;let nt=P-1;nt<0&&(nt=j.length-1);for(let yt=0,ct=c+m*2;yt<ct;yt++){const It=O*yt,xt=O*(yt+1),T=at+Ct+It,b=at+nt+It,B=at+nt+xt,Z=at+Ct+xt;Nt(T,b,B,Z)}}}function rt(j,at,P){l.push(j),l.push(at),l.push(P)}function At(j,at,P){Lt(j),Lt(at),Lt(P);const Ct=s.length/3,nt=v.generateTopUV(n,s,Ct-3,Ct-2,Ct-1);Kt(nt[0]),Kt(nt[1]),Kt(nt[2])}function Nt(j,at,P,Ct){Lt(j),Lt(at),Lt(Ct),Lt(at),Lt(P),Lt(Ct);const nt=s.length/3,yt=v.generateSideWallUV(n,s,nt-6,nt-3,nt-2,nt-1);Kt(yt[0]),Kt(yt[1]),Kt(yt[3]),Kt(yt[1]),Kt(yt[2]),Kt(yt[3])}function Lt(j){s.push(l[j*3+0]),s.push(l[j*3+1]),s.push(l[j*3+2])}function Kt(j){r.push(j.x),r.push(j.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Ux(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Uo[s.type]().fromJSON(s)),new cl(n,t.options)}}const Ix={generateTopUV:function(i,t,e,n,s){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],h=t[s*3],c=t[s*3+1];return[new it(r,a),new it(o,l),new it(h,c)]},generateSideWallUV:function(i,t,e,n,s,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],h=t[n*3],c=t[n*3+1],u=t[n*3+2],f=t[s*3],d=t[s*3+1],g=t[s*3+2],y=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-c)<Math.abs(a-h)?[new it(a,1-l),new it(h,1-u),new it(f,1-g),new it(y,1-p)]:[new it(o,1-l),new it(c,1-u),new it(d,1-g),new it(m,1-p)]}};function Ux(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Xn extends Gs{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Xn(t.radius,t.detail)}}class Gi extends Gs{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Gi(t.radius,t.detail)}}class un extends Be{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let h=0;const c=[],u=new D,f=new D,d=[],g=[],y=[],m=[];for(let p=0;p<=n;p++){const v=[],M=p/n;let x=0;p===0&&a===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let R=0;R<=e;R++){const w=R/e;u.x=-t*Math.cos(s+w*r)*Math.sin(a+M*o),u.y=t*Math.cos(a+M*o),u.z=t*Math.sin(s+w*r)*Math.sin(a+M*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),y.push(f.x,f.y,f.z),m.push(w+x,1-M),v.push(h++)}c.push(v)}for(let p=0;p<n;p++)for(let v=0;v<e;v++){const M=c[p][v+1],x=c[p][v],R=c[p+1][v],w=c[p+1][v+1];(p!==0||a>0)&&d.push(M,x,w),(p!==n-1||l<Math.PI)&&d.push(x,R,w)}this.setIndex(d),this.setAttribute("position",new pe(g,3)),this.setAttribute("normal",new pe(y,3)),this.setAttribute("uv",new pe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new un(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class hl extends Gs{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new hl(t.radius,t.detail)}}class $n extends Be{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],h=[],c=new D,u=new D,f=new D;for(let d=0;d<=n;d++)for(let g=0;g<=s;g++){const y=g/s*r,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(y),u.y=(t+e*Math.cos(m))*Math.sin(y),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),c.x=t*Math.cos(y),c.y=t*Math.sin(y),f.subVectors(u,c).normalize(),l.push(f.x,f.y,f.z),h.push(g/s),h.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=s;g++){const y=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,p=(s+1)*(d-1)+g,v=(s+1)*d+g;a.push(y,m,v),a.push(m,p,v)}this.setIndex(a),this.setAttribute("position",new pe(o,3)),this.setAttribute("normal",new pe(l,3)),this.setAttribute("uv",new pe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Nx extends Ee{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class Yn extends Hs{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jh,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Fx extends Yn{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new it(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Re(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Dt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Dt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Dt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class ul extends Le{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Dt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Ox extends ul{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Dt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Na=new te,zc=new D,Hc=new D;class Eu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new it(512,512),this.map=null,this.mapPass=null,this.matrix=new te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new nl,this._frameExtents=new it(1,1),this._viewportCount=1,this._viewports=[new se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;zc.setFromMatrixPosition(t.matrixWorld),e.position.copy(zc),Hc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Hc),e.updateMatrixWorld(),Na.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Na),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Na)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Gc=new te,xs=new D,Fa=new D;class kx extends Eu{constructor(){super(new We(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new it(4,2),this._viewportCount=6,this._viewports=[new se(2,1,1,1),new se(0,1,1,1),new se(3,1,1,1),new se(1,1,1,1),new se(3,0,1,1),new se(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),xs.setFromMatrixPosition(t.matrixWorld),n.position.copy(xs),Fa.copy(n.position),Fa.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Fa),n.updateMatrixWorld(),s.makeTranslation(-xs.x,-xs.y,-xs.z),Gc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gc)}}class Bx extends ul{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new kx}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class zx extends Eu{constructor(){super(new il(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Vc extends ul{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.target=new Le,this.shadow=new zx}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Hx{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Wc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Wc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Wc(){return performance.now()}const Xc=new te;class Gx{constructor(t,e,n=0,s=1/0){this.ray=new nu(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new el,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Xc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Xc),this}intersectObject(t,e=!0,n=[]){return Oo(t,this,n,e),n.sort(qc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Oo(t[s],this,n,e);return n.sort(qc),n}}function qc(i,t){return i.distance-t.distance}function Oo(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Oo(r[a],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qo);const Yc=new te,$c=new Jn,Zc=new mn,Kc=new D,Jc=new D;class Vx{constructor(t,e,n,s={}){Y(this,"mesh");Y(this,"cap");Y(this,"n",0);Y(this,"m");Y(this,"c");Y(this,"g");Y(this,"extra",{});Y(this,"extraAttr",[]);Y(this,"glowAttr",null);if(this.cap=n,this.mesh=new Io(t,e,n),this.mesh.instanceMatrix.setUsage($s),this.m=this.mesh.instanceMatrix.array,this.c=null,s.color!==!1){const r=new ws(new Float32Array(n*3).fill(1),3);r.setUsage($s),this.mesh.instanceColor=r,this.c=r.array}if(this.g=null,s.glow&&(this.glowAttr=new ws(new Float32Array(n*3),3),this.glowAttr.setUsage($s),t.setAttribute("aGlow",this.glowAttr),this.g=this.glowAttr.array),s.extra)for(const[r,a]of Object.entries(s.extra)){const o=new ws(new Float32Array(n*a),a);o.setUsage($s),t.setAttribute(r,o),this.extra[r]=o.array,this.extraAttr.push(o)}this.mesh.count=0,this.mesh.frustumCulled=s.frustumCulled??!1,s.renderOrder!==void 0&&(this.mesh.renderOrder=s.renderOrder)}begin(){this.n=0}get full(){return this.n>=this.cap}put(t,e,n,s,r,a,o){if(this.n>=this.cap)return-1;const l=this.n++,h=l*16,c=this.m,u=Math.cos(s),f=Math.sin(s);return c[h]=u*r,c[h+1]=0,c[h+2]=-f*r,c[h+3]=0,c[h+4]=0,c[h+5]=a,c[h+6]=0,c[h+7]=0,c[h+8]=f*o,c[h+9]=0,c[h+10]=u*o,c[h+11]=0,c[h+12]=t,c[h+13]=e,c[h+14]=n,c[h+15]=1,this.g&&(this.g[l*3]=this.g[l*3+1]=this.g[l*3+2]=0),l}putEuler(t,e,n,s,r,a,o,l,h){if(this.n>=this.cap)return-1;const c=this.n++;return Zc.set(s,r,a),$c.setFromEuler(Zc),Kc.set(t,e,n),Jc.set(o,l,h),Yc.compose(Kc,$c,Jc),Yc.toArray(this.m,c*16),this.g&&(this.g[c*3]=this.g[c*3+1]=this.g[c*3+2]=0),c}putMatrix(t){if(this.n>=this.cap)return-1;const e=this.n++;return t.toArray(this.m,e*16),this.g&&(this.g[e*3]=this.g[e*3+1]=this.g[e*3+2]=0),e}color(t,e,n,s){if(t<0||!this.c)return;const r=t*3;this.c[r]=e,this.c[r+1]=n,this.c[r+2]=s}colorC(t,e,n=1){this.color(t,e.r*n,e.g*n,e.b*n)}glow(t,e,n,s){if(t<0||!this.g)return;const r=t*3;this.g[r]=e,this.g[r+1]=n,this.g[r+2]=s}glowC(t,e,n){this.glow(t,e.r*n,e.g*n,e.b*n)}end(){const t=this.n;if(this.mesh.count=t,t===0)return;const e=this.mesh.instanceMatrix;if(e.clearUpdateRanges(),e.addUpdateRange(0,t*16),e.needsUpdate=!0,this.mesh.instanceColor){const n=this.mesh.instanceColor;n.clearUpdateRanges(),n.addUpdateRange(0,t*3),n.needsUpdate=!0}this.glowAttr&&(this.glowAttr.clearUpdateRanges(),this.glowAttr.addUpdateRange(0,t*3),this.glowAttr.needsUpdate=!0);for(const n of this.extraAttr)n.clearUpdateRanges(),n.addUpdateRange(0,t*n.itemSize),n.needsUpdate=!0}dispose(){this.mesh.geometry.dispose();const t=this.mesh.material;Array.isArray(t)?t.forEach(e=>e.dispose()):t.dispose(),this.mesh.dispose()}}function _r(i){const t=new Yn(i);return t.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
attribute vec3 aGlow;
varying vec3 vGlow;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vGlow = aGlow;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vGlow;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
totalEmissiveRadiance += vGlow;`)},t.customProgramCacheKey=()=>"vs-glow-standard",t}function jc(i=16777215,t={}){return new tn({color:i,...t})}function ki(i,t=1){return new tn({map:i,transparent:!0,opacity:t,blending:Un,depthWrite:!1,fog:!1})}function Wx(i){return new tn({map:i,color:0,transparent:!0,opacity:.75,depthWrite:!1,fog:!1,alphaMap:i})}const Tu=`
float vsHash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vsNoise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(vsHash(i), vsHash(i + vec2(1.0, 0.0)), u.x), mix(vsHash(i + vec2(0.0, 1.0)), vsHash(i + vec2(1.0, 1.0)), u.x), u.y);
}`;function Xx(){return new Ee({uniforms:{uTime:{value:0}},transparent:!0,depthWrite:!1,vertexShader:`
      attribute vec4 aPool;
      varying vec4 vP;
      varying vec2 vUv;
      void main() {
        vUv = uv * 2.0 - 1.0;
        vP = aPool;
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
      }`,fragmentShader:`
      uniform float uTime;
      varying vec4 vP;
      varying vec2 vUv;
      ${Tu}
      void main() {
        float r = length(vUv);
        if (r > 1.0) discard;
        float a = atan(vUv.y, vUv.x);
        if (vP.y < 0.5) {
          float ring = smoothstep(0.84, 0.92, r) * (1.0 - smoothstep(0.96, 1.0, r));
          float dash = step(0.45, fract(a * 3.8197 + uTime * 0.7));
          float pulse = 0.6 + 0.4 * sin(uTime * 18.0);
          float fill = vP.x * 0.35 * (1.0 - r * 0.6);
          vec3 col = vec3(0.75, 0.6, 1.0) * (ring * dash * pulse * 1.1) + vec3(0.3, 0.15, 0.8) * fill;
          float alpha = clamp(ring * dash * pulse + fill, 0.0, 1.0);
          gl_FragColor = vec4(col, alpha);
        } else {
          float sw = vsNoise(vec2(a * 2.5 + uTime * 0.9 + r * 5.0 + vP.z, r * 7.0 - uTime * 1.6));
          float sw2 = vsNoise(vec2(a * 5.0 - uTime * 0.6, r * 12.0 + uTime) + vP.z * 3.0);
          vec3 deep = vec3(0.015, 0.0, 0.05);
          vec3 mid = vec3(0.35, 0.12, 0.95);
          float rim = smoothstep(0.8, 0.95, r) * (1.0 - smoothstep(0.97, 1.0, r));
          vec3 col = mix(deep, mid, pow(sw * sw2, 1.2) * r * 1.3) + rim * vec3(0.55, 0.3, 1.1);
          float alpha = (0.82 + 0.18 * sw) * vP.w;
          gl_FragColor = vec4(col, alpha);
        }
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`})}function qx(){return new Ee({uniforms:{uTime:{value:0}},transparent:!0,depthWrite:!1,blending:Un,vertexShader:`
      attribute vec4 aLane;
      varying vec4 vL;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vL = aLane;
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
      }`,fragmentShader:`
      uniform float uTime;
      varying vec4 vL;
      varying vec2 vUv;
      ${Tu}
      void main() {
        float across = abs(vUv.y * 2.0 - 1.0);
        float edge = 1.0 - across;
        if (vL.x < 0.5) {
          float s = fract((vUv.x * vL.z + vUv.y * vL.w) / 46.0 - uTime * 1.4);
          float stripe = step(0.5, s);
          float pulse = 0.55 + 0.45 * sin(uTime * 20.0);
          float border = smoothstep(0.78, 0.9, across) * (1.0 - smoothstep(0.95, 1.0, across));
          vec3 col = mix(vec3(1.0, 0.18, 0.53), vec3(1.0, 0.82, 0.29), stripe) * (0.18 + 0.2 * pulse + 0.25 * vL.y) * smoothstep(0.0, 0.2, edge);
          col += vec3(1.0, 0.82, 0.29) * border * 1.2;
          gl_FragColor = vec4(col, 1.0);
        } else {
          float flick = 0.75 + 0.25 * vsNoise(vec2(vUv.x * vL.z * 0.05 - uTime * 40.0, uTime * 13.0));
          float core = pow(edge, 3.0);
          vec3 col = vec3(3.2, 2.9, 2.0) * core * flick + vec3(1.0, 0.7, 0.2) * pow(edge, 0.8) * 0.9;
          gl_FragColor = vec4(col, 1.0);
        }
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`})}function Yx(){return new Ee({uniforms:{uTime:{value:0},uColor:{value:new Dt(3535615)},uPulse:{value:0},uStrength:{value:1}},transparent:!0,depthWrite:!1,blending:Un,side:Ke,vertexShader:`
      varying vec3 vN;
      varying vec3 vV;
      varying vec3 vW;
      varying float vH;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vW = wp.xyz;
        vH = position.y;
        vec4 mv = viewMatrix * wp;
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uPulse;
      uniform float uStrength;
      varying vec3 vN;
      varying vec3 vV;
      varying vec3 vW;
      varying float vH;
      void main() {
        float fres = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.6);
        vec2 p = vW.xz / 16.0 + vec2(0.0, uTime * 0.25);
        vec2 r = vec2(1.0, 1.7320508);
        vec2 h = r * 0.5;
        vec2 a = mod(p, r) - h;
        vec2 b = mod(p - h, r) - h;
        vec2 gv = dot(a, a) < dot(b, b) ? a : b;
        float e = 0.5 - max(abs(gv.x), dot(abs(gv), vec2(0.5, 0.8660254)));
        float hexLine = 1.0 - smoothstep(0.0, 0.05, e);
        float shimmer = 0.5 + 0.5 * sin(uTime * 2.2 + vW.x * 0.05 + vW.z * 0.04);
        float base = smoothstep(0.0, 0.08, vH) ;
        float k = fres * 1.1 + hexLine * (0.10 + 0.12 * shimmer) + uPulse * (0.25 + fres);
        k *= mix(1.6, 1.0, base);
        vec3 col = uColor * k * uStrength;
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`})}function $x(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Be;let h=0;for(let c=0;c<i.length;++c){const u=i[c];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". The geometry must have either an index or a position attribute"),null;l.addGroup(h,d,c),h+=d}}if(e){let c=0;const u=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+c);c+=i[f].attributes.position.count}l.setIndex(u)}for(const c in r){const u=Qc(r[c]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" attribute."),null;l.setAttribute(c,u)}for(const c in a){const u=a[c][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[c]=[];for(let f=0;f<u;++f){const d=[];for(let y=0;y<a[c].length;++y)d.push(a[c][y][f]);const g=Qc(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" morphAttribute."),null;l.morphAttributes[c].push(g)}}return l}function Qc(i){let t,e,n,s=-1,r=0;for(let h=0;h<i.length;++h){const c=i[h];if(t===void 0&&(t=c.array.constructor),t!==c.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=c.itemSize),e!==c.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=c.normalized),n!==c.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=c.gpuType),s!==c.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=c.count*e}const a=new t(r),o=new rn(a,e,n);let l=0;for(let h=0;h<i.length;++h){const c=i[h];if(c.isInterleavedBufferAttribute){const u=l/e;for(let f=0,d=c.count;f<d;f++)for(let g=0;g<e;g++){const y=c.getComponent(f,g);o.setComponent(f+u,g,y)}}else a.set(c.array,l);l+=c.count*e}return s!==void 0&&(o.gpuType=s),o}function Zx(i){const t=i.index?i.toNonIndexed():i;t!==i&&i.dispose();for(const e of Object.keys(t.attributes))e!=="position"&&e!=="normal"&&t.deleteAttribute(e);return t}function jt(i,t=!1){const e=i.map(Zx),n=$x(e,!1);if(e.forEach(s=>s.dispose()),!n)throw new Error("Could not merge model geometry.");return t&&n.computeVertexNormals(),n.computeBoundingSphere(),n}function Ss(i,t,e){return new ll(i,t,e)}function yr(i,t,e,n,s=0){const r=Ss(i,t,5);return r.rotateZ(-Math.PI/2),r.translate(e+t/2,0,0),s&&r.rotateZ(s),r.rotateY(n),r}function th(i,t,e=.08){const n=new yu;i.forEach(([r,a],o)=>o===0?n.moveTo(r,a):n.lineTo(r,a)),n.closePath();const s=new cl(n,{depth:t,bevelEnabled:e>0,bevelThickness:e,bevelSize:e,bevelSegments:1,curveSegments:4});return s.rotateX(-Math.PI/2),s}function Kx(){const i={};{const t=[new Gi(.72,0)];for(let s=0;s<5;s++)t.push(yr(.16,.7,.5,s/5*Math.PI*2+.3));const e=Ss(.13,.5,5);e.translate(0,.8,0),t.push(e),i.drifter=jt(t,!0);const n=new $n(.52,.07,6,24);n.rotateX(Math.PI/2),i.drifterEye=jt([n])}{const t=[],e=new Ge(.5,.66,.42,8);e.translate(0,.95,0),t.push(e);for(let a=0;a<3;a++){const o=a/3*Math.PI*2+Math.PI/3,l=new oe(.75,.14,.16);l.rotateZ(-.55),l.translate(.6,.78,0),l.rotateY(o);const h=new oe(.13,.78,.13);h.translate(.93,.36,0),h.rotateY(o);const c=new oe(.3,.07,.24);c.translate(1,.03,0),c.rotateY(o),t.push(l,h,c)}i.spitterBody=jt(t,!0);const n=new oe(.78,.4,.66);n.translate(-.05,1.38,0);const s=new oe(.4,.12,.7);s.translate(.12,1.62,0);const r=new Ge(.09,.12,.8,8);r.rotateZ(-Math.PI/2),r.translate(.66,1.36,0),i.spitterHead=jt([n,s,r],!0),i.spitterMuzzle=jt([new un(1,10,8)])}{const t=th([[1.35,0],[.15,.86],[-.92,.76],[-1.05,0],[-.92,-.76],[.15,-.86]],.62,.12);t.translate(0,.1,0);const e=new oe(1.3,.2,.42);e.translate(-.15,.9,0);const n=Ss(.2,.8,6);n.rotateZ(-Math.PI/2),n.translate(1.62,.45,0);const s=new oe(.6,.3,.25);s.translate(-.4,.7,.62);const r=s.clone();r.translate(0,0,-1.24),i.rammer=jt([t,e,n,s,r],!0);const a=new oe(.1,.12,.95);a.translate(.86,.6,0),i.rammerEye=jt([a])}{const t=new Xn(1,0),n=t.getAttribute("position").array;for(let s=0;s<n.length;s+=9){const r=(n[s]+n[s+3]+n[s+6])/3,a=(n[s+2]+n[s+5]+n[s+8])/3,o=(n[s+1]+n[s+4]+n[s+7])/3,l=r>=0?1:-1,h=a>=0?1:-1,c=l*.09,u=h*.09,f=o*.05;for(let d=0;d<3;d++)n[s+d*3]+=c,n[s+d*3+1]+=f,n[s+d*3+2]+=u}t.scale(1,1.15,1),i.cleaver=jt([t],!0),i.cleaverCore=jt([new Xn(.66,0)],!0)}{const t=new Gi(1,0);t.scale(.7,1.35,.7),i.splitlet=jt([t],!0)}{const t=new Ge(1,1.08,.42,20);t.translate(0,.26,0);const e=new un(.62,16,8,0,Math.PI*2,0,Math.PI/2);e.translate(0,.46,0);const n=new oe(.5,.2,.1);n.translate(.6,.55,0),i.aegis=jt([t,e,n]);const s=new $n(1.03,.055,6,32);s.rotateX(Math.PI/2),s.translate(0,.32,0),i.aegisRim=jt([s]);const r=50*Math.PI/180,a=new Ge(1,1,1,16,1,!0,Math.PI/2-r,r*2);a.translate(0,.55,0),i.shieldPlate=a;const o=new $n(1,.035,4,16,r*2);o.rotateX(Math.PI/2),o.rotateY(r);const l=o.clone();l.translate(0,1.05,0),o.translate(0,.05,0),i.shieldFrame=jt([o,l])}{const t=[new Xn(.55,1)];for(let e=0;e<8;e++)t.push(yr(.12,.72,.42,e/8*Math.PI*2));for(let e=0;e<4;e++)t.push(yr(.1,.5,.4,e/4*Math.PI*2+Math.PI/4,.75)),t.push(yr(.1,.5,.4,e/4*Math.PI*2+Math.PI/4,-.75));i.caster=jt(t,!0),i.casterCore=jt([new Xn(.45,1)])}{const t=new Ge(.92,1.05,.5,8);t.translate(0,.25,0);const e=new Ge(.58,.85,.32,8);e.translate(0,.66,0);const n=new Ge(.16,.24,.5,8);n.translate(0,.95,0),i.wardenHull=jt([t,e,n],!0);const s=new oe(.42,.36,.62);s.translate(0,.3,0);const r=new oe(.1,.12,.66);r.translate(.2,.52,0),i.wardenPetal=jt([s,r],!0);const a=new $n(.75,.06,6,8);a.rotateX(Math.PI/2),i.wardenCrown=jt([a]),i.wardenNode=jt([new Xn(1,0)],!0),i.wardenCore=jt([new Xn(1,1)])}{const t=th([[1.3,0],[-.9,.95],[-.5,0],[-.9,-.95]],.26,.08);t.translate(0,.1,0);const e=new oe(1.2,.16,.22);e.translate(.05,.4,0);const n=new Ge(.16,.2,.6,10);n.rotateZ(Math.PI/2),n.translate(-.55,.26,.48);const s=n.clone();s.translate(0,0,-.96),i.wick=jt([t,e,n,s]);const r=new un(.3,16,8,0,Math.PI*2,0,Math.PI/2);r.scale(1.5,.9,1),r.translate(.2,.42,0),i.wickCanopy=jt([r]);const a=new un(.15,10,8);a.translate(-.88,.26,.48);const o=a.clone();o.translate(0,0,-.96);const l=new un(.09,8,6);l.translate(1.2,.28,0),i.wickGlow=jt([a,o,l])}{const t=new Gi(1,0);t.scale(.7,1.15,.7),i.mote=jt([t],!0);const e=new Ge(.5,.5,.8,6),n=Ss(.5,.55,6);n.translate(0,.675,0);const s=Ss(.5,.4,6);s.rotateX(Math.PI),s.translate(0,-.6,0),i.shard=jt([e,n,s],!0);const r=new oe(1.6,.9,1.1);r.translate(0,.45,0);const a=new oe(1.7,.25,1.2);a.translate(0,1,0);const o=new oe(.14,1.2,1.18);o.translate(-.55,.6,0);const l=o.clone();l.translate(1.1,0,0),i.chest=jt([r,a,o,l],!0);const h=new oe(1.62,.06,1.12);h.translate(0,.88,0),i.chestSeam=jt([h])}i.ball=jt([new un(1,12,8)]),i.ballLow=jt([new un(1,8,6)]);{const t=new Gi(1,0);t.scale(1.25,.22,.42),i.blade=jt([t],!0)}return i.debris=jt([new hl(1,0)],!0),i.box=jt([new oe(1,1,1)]),i}function Jx(){const i=new Oe(2,2);return i.rotateX(-Math.PI/2),i}function jx(){const i=new Oe(1,1);return i.rotateX(-Math.PI/2),i.translate(.5,0,0),i}function Qx(){return new un(1,48,14,0,Math.PI*2,0,Math.PI/2)}const wu={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class os{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const t_=new il(-1,1,1,-1,0,1);class e_ extends Be{constructor(){super(),this.setAttribute("position",new pe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new pe([0,2,0,0,2,0],2))}}const n_=new e_;class fl{constructor(t){this._mesh=new le(n_,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,t_)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Au extends os{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Ee?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=ts.clone(t.uniforms),this.material=new Ee({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new fl(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class eh extends os{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class i_ extends os{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class s_{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new it);this._width=n.width,this._height=n.height,e=new Qe(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:pn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Au(wu),this.copyPass.material.blending=Dn,this.clock=new Hx}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}eh!==void 0&&(a instanceof eh?n=!0:a instanceof i_&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new it);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class r_ extends os{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Dt}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}}const a_={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Dt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class es extends os{constructor(t,e,n,s){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new it(t.x,t.y):new it(256,256),this.clearColor=new Dt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Qe(r,a,{type:pn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new Qe(r,a,{type:pn});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const d=new Qe(r,a,{type:pn});d.texture.name="UnrealBloomPass.v"+u,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),a=Math.round(a/2)}const o=a_;this.highPassUniforms=ts.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ee({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new it(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const c=wu;this.copyUniforms=ts.clone(c.uniforms),this.blendMaterial=new Ee({uniforms:this.copyUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,blending:Un,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Dt,this.oldClearAlpha=1,this.basic=new tn,this.fsQuad=new fl(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new it(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=es.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=es.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=a}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Ee({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new it(.5,.5)},direction:{value:new it(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new Ee({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}es.BlurDirectionX=new it(1,0);es.BlurDirectionY=new it(0,1);const o_={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class l_ extends os{constructor(){super();const t=o_;this.uniforms=ts.clone(t.uniforms),this.material=new Nx({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new fl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},$t.getTransfer(this._outputColorSpace)===ae&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Fh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Oh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===kh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Yo?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Bh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===zh&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const c_={uniforms:{tDiffuse:{value:null},uCenter:{value:new it(.5,.5)},uRadius:{value:0},uWidth:{value:.05},uStrength:{value:0},uAspect:{value:1}},vertexShader:`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform vec2 uCenter;
    uniform float uRadius;
    uniform float uWidth;
    uniform float uStrength;
    uniform float uAspect;
    varying vec2 vUv;
    void main() {
      vec2 d = vUv - uCenter;
      d.x *= uAspect;
      float dist = length(d);
      float x = (dist - uRadius) / uWidth;
      float band = exp(-x * x * 2.5);
      vec2 dir = dist > 1e-4 ? d / dist : vec2(0.0);
      dir.x /= uAspect;
      // refract inward on the leading edge, outward behind it
      vec2 uv = vUv - dir * band * uStrength * sign(x + 0.3);
      vec4 c = texture2D(tDiffuse, uv);
      c.rgb += c.rgb * band * uStrength * 14.0 + vec3(1.0, 0.45, 0.75) * band * uStrength * 1.6;
      gl_FragColor = c;
    }`};class h_{constructor(t,e,n,s,r,a){Y(this,"composer");Y(this,"bloom",null);Y(this,"shock");Y(this,"rt");Y(this,"half");this.half=s.bloom==="half";const o=t.getPixelRatio();this.rt=new Qe(Math.max(1,r*o),Math.max(1,a*o),{type:pn,samples:s.level==="high"?4:s.level==="medium"?2:0}),this.composer=new s_(t,this.rt),this.composer.addPass(new r_(e,n)),s.bloom!=="off"&&(this.bloom=new es(new it(r,a),.6,this.half?.25:.4,1),this.composer.addPass(this.bloom)),this.shock=new Au(c_),this.shock.enabled=!1,this.composer.addPass(this.shock),this.composer.addPass(new l_),this.setSize(r,a,o)}setSize(t,e,n){this.composer.setPixelRatio(n),this.composer.setSize(t,e),this.shock.uniforms.uAspect.value=t/Math.max(1,e)}setBloomStrength(t){this.bloom&&(this.bloom.strength=t)}render(){this.composer.render()}dispose(){this.bloom?.dispose(),this.shock.dispose(),this.composer.dispose(),this.rt.dispose()}}class qr extends le{constructor(t,e={}){super(t),this.isReflector=!0,this.type="Reflector",this.camera=new We;const n=this,s=e.color!==void 0?new Dt(e.color):new Dt(8355711),r=e.textureWidth||512,a=e.textureHeight||512,o=e.clipBias||0,l=e.shader||qr.ReflectorShader,h=e.multisample!==void 0?e.multisample:4,c=new Pn,u=new D,f=new D,d=new D,g=new te,y=new D(0,0,-1),m=new se,p=new D,v=new D,M=new se,x=new te,R=this.camera,w=new Qe(r,a,{samples:h,type:pn}),A=new Ee({name:l.name!==void 0?l.name:"unspecified",uniforms:ts.clone(l.uniforms),fragmentShader:l.fragmentShader,vertexShader:l.vertexShader});A.uniforms.tDiffuse.value=w.texture,A.uniforms.color.value=s,A.uniforms.textureMatrix.value=x,this.material=A,this.onBeforeRender=function(L,S,_){if(f.setFromMatrixPosition(n.matrixWorld),d.setFromMatrixPosition(_.matrixWorld),g.extractRotation(n.matrixWorld),u.set(0,0,1),u.applyMatrix4(g),p.subVectors(f,d),p.dot(u)>0)return;p.reflect(u).negate(),p.add(f),g.extractRotation(_.matrixWorld),y.set(0,0,-1),y.applyMatrix4(g),y.add(d),v.subVectors(f,y),v.reflect(u).negate(),v.add(f),R.position.copy(p),R.up.set(0,1,0),R.up.applyMatrix4(g),R.up.reflect(u),R.lookAt(v),R.far=_.far,R.updateMatrixWorld(),R.projectionMatrix.copy(_.projectionMatrix),x.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),x.multiply(R.projectionMatrix),x.multiply(R.matrixWorldInverse),x.multiply(n.matrixWorld),c.setFromNormalAndCoplanarPoint(u,f),c.applyMatrix4(R.matrixWorldInverse),m.set(c.normal.x,c.normal.y,c.normal.z,c.constant);const C=R.projectionMatrix;M.x=(Math.sign(m.x)+C.elements[8])/C.elements[0],M.y=(Math.sign(m.y)+C.elements[9])/C.elements[5],M.z=-1,M.w=(1+C.elements[10])/C.elements[14],m.multiplyScalar(2/m.dot(M)),C.elements[2]=m.x,C.elements[6]=m.y,C.elements[10]=m.z+1-o,C.elements[14]=m.w,n.visible=!1;const k=L.getRenderTarget(),I=L.xr.enabled,z=L.shadowMap.autoUpdate;L.xr.enabled=!1,L.shadowMap.autoUpdate=!1,L.setRenderTarget(w),L.state.buffers.depth.setMask(!0),L.autoClear===!1&&L.clear(),L.render(S,R),L.xr.enabled=I,L.shadowMap.autoUpdate=z,L.setRenderTarget(k);const X=_.viewport;X!==void 0&&L.state.viewport(X),n.visible=!0},this.getRenderTarget=function(){return w},this.dispose=function(){w.dispose(),n.material.dispose()}}}qr.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};function gi(i,t=i){const e=document.createElement("canvas");e.width=i,e.height=t;const n=e.getContext("2d");if(!n)throw new Error("Canvas 2D is not available for texture generation.");return[e,n]}function vi(i,t=!0){const e=new nx(i);return t&&(e.colorSpace=Ve),e.needsUpdate=!0,e}function u_(){const[i,t]=gi(128),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.18,"rgba(255,255,255,0.65)"),e.addColorStop(.5,"rgba(255,255,255,0.18)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),vi(i,!1)}function nh(i=!1){const[e,n]=gi(256),s=256/2,r=n.createRadialGradient(s,s,s*.72,s,s,s);if(r.addColorStop(0,"rgba(255,255,255,0)"),r.addColorStop(.72,"rgba(255,255,255,0.15)"),r.addColorStop(.9,"rgba(255,255,255,1)"),r.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=r,n.fillRect(0,0,256,256),i){n.globalCompositeOperation="destination-out",n.translate(s,s);const a=36;for(let o=0;o<a;o++)n.rotate(Math.PI*2/a),n.fillRect(0,-4,s,8)}return vi(e,!1)}function f_(){const[i,t]=gi(16,64),e=t.createLinearGradient(0,0,0,64);return e.addColorStop(0,"rgba(255,255,255,0)"),e.addColorStop(.35,"rgba(255,255,255,0.35)"),e.addColorStop(.5,"rgba(255,255,255,1)"),e.addColorStop(.65,"rgba(255,255,255,0.35)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,16,64),vi(i,!1)}function d_(){const[i,t]=gi(256,64);t.fillStyle="rgba(255,255,255,0.22)",t.fillRect(0,4,256,56),t.fillStyle="rgba(255,255,255,1)";for(let n=0;n<4;n++){const s=n*64+14;t.beginPath(),t.moveTo(s,8),t.lineTo(s+26,32),t.lineTo(s,56),t.lineTo(s+12,56),t.lineTo(s+38,32),t.lineTo(s+12,8),t.closePath(),t.fill()}t.fillRect(0,0,256,4),t.fillRect(0,60,256,4);const e=vi(i,!1);return e.wrapS=Is,e}function ih(i,t,e,n){const s=i.getImageData(0,0,t,t);let r=n;for(let a=0;a<s.data.length;a+=4){r=r*16807%2147483647;const o=(r/2147483647-.5)*e;s.data[a]=Math.max(0,Math.min(255,s.data[a]+o)),s.data[a+1]=Math.max(0,Math.min(255,s.data[a+1]+o)),s.data[a+2]=Math.max(0,Math.min(255,s.data[a+2]+o))}i.putImageData(s,0,0)}function Oa(i,t,e,n,s){let r=s;const a=()=>(r=r*48271%2147483647,r/2147483647);for(let o=0;o<n;o++){const l=a()*t,h=a()*t,c=t*(.05+a()*.18);for(const u of[-t,0,t])for(const f of[-t,0,t]){const d=i.createRadialGradient(l+u,h+f,0,l+u,h+f,c);d.addColorStop(0,e),d.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=d,i.fillRect(l+u-c,h+f-c,c*2,c*2)}}}function p_(i,t){const[s,r]=gi(1024);r.fillStyle=i,r.fillRect(0,0,1024,1024),Oa(r,1024,"rgba(40,46,70,0.10)",14,11),ih(r,1024,10,5),r.strokeStyle=t,r.lineWidth=2;for(let c=0;c<=4;c++)r.beginPath(),r.moveTo(c*256,0),r.lineTo(c*256,1024),r.moveTo(0,c*256),r.lineTo(1024,c*256),r.stroke();r.lineWidth=1.5;for(let c=0;c<4;c++)for(let u=0;u<4;u++){const f=c*256+128,d=u*256+256/2;r.beginPath(),r.moveTo(f-6,d),r.lineTo(f+6,d),r.moveTo(f,d-6),r.lineTo(f,d+6),r.stroke()}const[a,o]=gi(1024);o.fillStyle="rgb(108,108,108)",o.fillRect(0,0,1024,1024),Oa(o,1024,"rgba(150,150,150,0.35)",18,23),Oa(o,1024,"rgba(0,0,0,0.45)",10,31),ih(o,1024,26,9),o.strokeStyle="rgb(210,210,210)",o.lineWidth=5;for(let c=0;c<=4;c++)o.beginPath(),o.moveTo(c*256,0),o.lineTo(c*256,1024),o.moveTo(0,c*256),o.lineTo(1024,c*256),o.stroke();const l=vi(s,!0),h=vi(a,!1);for(const c of[l,h])c.wrapS=c.wrapT=Is;return{map:l,rough:h,tile:320}}function m_(){const[i,t]=gi(64,256);t.fillStyle="#000",t.fillRect(0,0,64,256);let e=3;const n=()=>(e=e*16807%2147483647,e/2147483647);for(let s=6;s<250;s+=10){if(n()<.45)continue;const r=.25+n()*.75;t.fillStyle=`rgba(255,255,255,${r})`,t.fillRect(8,s,48,4)}return vi(i,!1)}function g_(i,t){const e=new mu,n=[],s=(h,c,u,f,d,g,y=0,m=0)=>{const p=new tn({color:new Dt(c).multiplyScalar(u),side:Ke}),v=new le(h,p);v.position.set(f,d,g),v.rotation.set(m,y,0),e.add(v),n.push(h,p)},r=new oe(100,50,100);s(r,t==="foundry"?854022:395020,1,0,10,0);const a=t==="foundry";s(new Oe(80,2.2),a?16747066:3535615,a?2.2:2.6,0,34.5,-12,0,Math.PI/2),s(new Oe(80,1.4),16723592,1.8,0,34.5,14,0,Math.PI/2),s(new Oe(26,9),a?16756838:14263361,a?1.6:1.1,-49.5,16,0,Math.PI/2),s(new Oe(40,3),9067775,1.4,0,18,-49.5),s(new Oe(30,4),a?16738858:3535615,1,49.5,10,10,-Math.PI/2),s(new Oe(60,6),1778240,1,0,6,49.5,Math.PI);const o=new Lo(i),l=o.fromScene(e,.035);return o.dispose(),n.forEach(h=>h.dispose()),l}class v_{constructor(t){Y(this,"group",new hi);Y(this,"arena");Y(this,"reflector",null);Y(this,"disposables",[]);Y(this,"beacon");Y(this,"stripMat");this.arena=t.arena;const e=t.arena==="foundry",n=new Dt(e?16747066:3535615),s=O=>(this.disposables.push(O),O),r=p_(e?"#160d0a":"#0c0e15",e?"rgba(255,150,80,0.20)":"rgba(130,160,255,0.17)");s(r.map),s(r.rough),r.map.anisotropy=r.rough.anisotropy=t.anisotropy;const a=e?xn*2:Me*2;r.map.repeat.set(a/r.tile,a/r.tile),r.rough.repeat.copy(r.map.repeat);const o=s(new Yn({color:16777215,map:r.map,roughnessMap:r.rough,roughness:1,metalness:.55,envMapIntensity:1.1,transparent:t.planar,opacity:t.planar?.84:1})),l=s(e?new Nr(xn,128):new Oe(a,a));l.rotateX(-Math.PI/2);const h=new le(l,o);if(h.renderOrder=-10,this.group.add(h),t.planar){const O=s(e?new Nr(xn,96):new Oe(a,a)),H=new qr(O,{textureWidth:Math.max(256,Math.floor(t.width*.5)),textureHeight:Math.max(256,Math.floor(t.height*.5)),color:e?6969936:5922928,clipBias:.003});H.rotateX(-Math.PI/2),H.position.y=-1.2,H.renderOrder=-20,this.reflector=H,this.group.add(H)}const c=s(new Yn({color:1316383,metalness:.8,roughness:.38})),u=s(new Yn({color:460812,metalness:.4,roughness:.7}));this.stripMat=s(new tn({color:n.clone().multiplyScalar(2.2)}));const f=34;if(e){const O=xn+14,H=s(new Ge(O,O,f,128,1,!0));H.translate(0,f/2,0),this.group.add(new le(H,s(new Yn({color:1708558,metalness:.8,roughness:.4,side:Ke}))));const G=s(new $n(O-4,2.4,4,160));G.rotateX(Math.PI/2),G.translate(0,f+1,0),this.group.add(new le(G,this.stripMat));const tt=s(new $n(O-6,1.2,4,160));tt.rotateX(Math.PI/2),tt.translate(0,6,0),this.group.add(new le(tt,this.stripMat));const lt=s(new Ge(O+20,O-60,700,96,1,!0));lt.translate(0,-350,0),this.group.add(new le(lt,u))}else{const O=Me*2+56,H=26,G=s(new oe(O,f,H));G.translate(0,f/2,0);const tt=s(new oe(O-40,3,4)),lt=s(new oe(O-40,1.6,2)),ft=s(new oe(O+40,700,40));ft.translate(0,-350,0);for(let kt=0;kt<4;kt++){const $=kt*Math.PI/2,et=new hi;et.rotation.y=$;const vt=Me+H/2,rt=new le(G,c);rt.position.set(0,0,vt);const At=new le(tt,this.stripMat);At.position.set(0,f+1.5,vt-H/2+2);const Nt=new le(lt,this.stripMat);Nt.position.set(0,7,vt-H/2-.5);const Lt=new le(ft,u);Lt.position.set(0,0,vt+6),et.add(rt,At,Nt,Lt),this.group.add(et)}const Pt=s(new oe(60,90,60));Pt.translate(0,45,0);for(const[kt,$]of[[-1,-1],[1,-1],[1,1],[-1,1]]){const et=new le(Pt,c);et.position.set(kt*(Me+30),0,$*(Me+30)),this.group.add(et)}}let d=e?91:17;const g=()=>(d=d*16807%2147483647,d/2147483647),y=s(new oe(1,1,1));y.translate(0,.5,0);const m=s(new Yn({color:e?1182730:723987,metalness:.7,roughness:.55})),p=s(new Oe(1,1)),v=s(m_()),M=s(new tn({map:v,transparent:!0,blending:Un,depthWrite:!1})),x=84,R=new Io(y,m,x),w=new Io(p,M,x);this.disposables.push(R,w);const A=new te,L=new Jn,S=new D,_=new D,C=new D(0,1,0),k=e?[16747066,16756838,16723592,14263361]:[3535615,16723592,9067775,14263361,5898165],I=new Dt,z=e?xn:Me*1.2;for(let O=0;O<x;O++){const H=g()*Math.PI*2,G=z+380+Math.pow(g(),.8)*2600,tt=Math.cos(H)*G,lt=Math.sin(H)*G,ft=70+g()*200,Pt=500+g()*1300,kt=-900-g()*300;L.setFromAxisAngle(C,-H+Math.PI/2+(g()-.5)*.4),R.setMatrixAt(O,A.compose(S.set(tt,kt,lt),L,_.set(ft,Pt,ft*(.6+g()*.6))));const $=120+g()*260,et=kt+Pt-$*.6-g()*200,vt=new D(-Math.cos(H),0,-Math.sin(H)),rt=new D(tt,et,lt).addScaledVector(vt,ft*.52),At=new Jn().setFromUnitVectors(new D(0,0,1),vt);w.setMatrixAt(O,A.compose(rt,At,_.set(ft*.7,$,1))),I.set(k[Math.floor(g()*k.length)]).multiplyScalar(g()<.2?1.6:.35+g()*.5),w.setColorAt(O,I)}R.instanceMatrix.needsUpdate=!0,w.instanceMatrix.needsUpdate=!0,w.instanceColor&&(w.instanceColor.needsUpdate=!0),this.group.add(R,w),this.beacon=s(new tn({color:new Dt(16723546).multiplyScalar(3)}));const X=s(new un(10,8,6));for(let O=0;O<10;O++){const H=g()*Math.PI*2,G=z+600+g()*1600,tt=new le(X,this.beacon);tt.position.set(Math.cos(H)*G,200+g()*500,Math.sin(H)*G),this.group.add(tt)}}update(t){const e=Math.sin(t*2.4)>.6;this.beacon.color.setRGB(e?3:.25,e?.35:.03,e?.6:.06);const n=2+Math.sin(t*2)*.25;this.arena==="foundry"?this.stripMat.color.setRGB(1*n,.32*n,.07*n):this.stripMat.color.setRGB(.04*n,.88*n,1*n)}resize(t,e){this.reflector?.getRenderTarget().setSize(Math.max(256,Math.floor(t*.5)),Math.max(256,Math.floor(e*.5)))}dispose(){this.group.removeFromParent(),this.reflector&&(this.reflector.dispose(),this.reflector=null);for(const t of this.disposables)t.dispose();this.disposables.length=0}}const Bi=Math.PI*2,x_=40,sh=60*Math.PI/180,ka=8;class __{constructor(t,e,n){Y(this,"kind","3d");Y(this,"dpr",1);Y(this,"camX",0);Y(this,"camY",0);Y(this,"lost",!1);Y(this,"onContext",null);Y(this,"gl");Y(this,"view");Y(this,"hud");Y(this,"hctx");Y(this,"visor",new Ih);Y(this,"scene",new mu);Y(this,"camera",new We(x_,1,10,9e3));Y(this,"preset");Y(this,"post",null);Y(this,"stage",null);Y(this,"env",null);Y(this,"envArena","hollow");Y(this,"M");Y(this,"tex",[]);Y(this,"layers",[]);Y(this,"lights",[]);Y(this,"snap",!0);Y(this,"cssW",1);Y(this,"cssH",1);Y(this,"colors",new Map);Y(this,"tmpV",new D);Y(this,"tmpP",{x:0,y:0});Y(this,"ray",new Gx);Y(this,"plane",new Pn(new D(0,1,0),0));Y(this,"lastFacing",0);Y(this,"bank",0);Y(this,"wick",new hi);Y(this,"wickGlowMat");Y(this,"field");Y(this,"fieldMat");Y(this,"poolMat");Y(this,"laneMat");Y(this,"L");Y(this,"onLost",t=>{t.preventDefault(),this.lost=!0,this.onContext?.(!0)});Y(this,"onRestored",()=>{this.lost=!1,this.rebuildEnv(this.envArena),this.onContext?.(!1)});Y(this,"project",(t,e,n)=>{const s=this.tmpV.set(t,n,e).project(this.camera);return s.z>1||s.x<-1.2||s.x>1.2||s.y<-1.2||s.y>1.2?null:(this.tmpP.x=(s.x*.5+.5)*this.hud.width,this.tmpP.y=(-s.y*.5+.5)*this.hud.height,this.tmpP)});Y(this,"fakeEnemy",{id:0,alive:!0,kind:"swarm",x:0,y:0,vx:0,vy:0,r:10,hp:1,maxHp:1,speed:0,dmg:0,xp:0,ess:0,t:0,state:0,timer:0,act:0,ang:0,shield:0,shieldDir:1,tx:0,ty:0,elite:!1,tier:1,phase:0,flash:0,bladeCd:0,seed:0,noEss:!1,kx:0,ky:0});Y(this,"dummyFx",{ember:()=>{}});this.view=t,this.hud=e,this.preset=n;const s=e.getContext("2d");if(!s)throw new Error("Canvas 2D is not available for the HUD.");if(this.hctx=s,this.gl=new Qv({canvas:t,antialias:!1,powerPreference:"high-performance",alpha:!1,stencil:!1}),!this.gl.capabilities.isWebGL2)throw new Error("WebGL2 is not available.");this.gl.toneMapping=Yo,this.gl.toneMappingExposure=1.05,this.gl.outputColorSpace=Ve,this.scene.background=new Dt(262921),this.scene.fog=new rl(657174,36e-5),this.scene.add(new Ox(3818616,328456,1.25));const r=new Vc(13162751,1.3);r.position.set(-.45,1,.35),this.scene.add(r);const a=new Vc(16732064,.35);a.position.set(.6,.5,-.8),this.scene.add(a);for(let O=0;O<ka;O++){const H=new Bx(16777215,0,400,1.7);H.visible=O<n.lights,this.lights.push(H),this.scene.add(H)}this.M=Kx();const o=u_(),l=nh(),h=nh(!0),c=f_(),u=d_();this.tex.push(o,l,h,c,u);const f=_r({color:16777215,metalness:.6,roughness:.4,flatShading:!0}),d=_r({color:16777215,metalness:.35,roughness:.5}),g=_r({color:16777215,metalness:.15,roughness:.1,flatShading:!0}),y=_r({color:16777215,metalness:.95,roughness:.28,flatShading:!0}),m=jc(16777215),p=ki(o),v=ki(l),M=ki(h),x=ki(c),R=ki(u),w=new tn({color:16777215,transparent:!0,blending:Un,depthWrite:!1}),A=new tn({color:0,side:ke}),L=new tn({color:16777215,transparent:!0,opacity:.85,blending:Un,depthWrite:!1,side:Ke});this.poolMat=Xx(),this.laneMat=qx();const S=this.M,_=(O,H,G,tt,lt=!1,ft,Pt)=>{const kt=new Vx(H.clone(),G,tt,{glow:lt,extra:ft,renderOrder:Pt});return this.layers.push(kt),this.scene.add(kt.mesh),kt},C=Jx(),k=jx();this.L={shadow:_("shadow",C,Wx(o),420,!1,void 0,1),pools:_("pools",C,this.poolMat,40,!1,{aPool:4},2),lanes:_("lanes",k,this.laneMat,12,!1,{aLane:4},3),splat:_("splat",C,p,900,!1,void 0,4),rings:_("rings",C,v,260,!1,void 0,5),ringsDash:_("ringsDash",C,M,8,!1,void 0,5),lines:_("lines",k,x,160,!1,void 0,6),chevrons:_("chevrons",k,R,60,!1,void 0,6),drifter:_("drifter",S.drifter,f,200,!0),drifterEye:_("drifterEye",S.drifterEye,m,200),spitterBody:_("spitterBody",S.spitterBody,f,100,!0),spitterHead:_("spitterHead",S.spitterHead,f,100,!0),spitterMuzzle:_("spitterMuzzle",S.spitterMuzzle,m,100),rammer:_("rammer",S.rammer,f,100,!0),rammerEye:_("rammerEye",S.rammerEye,m,100),cleaver:_("cleaver",S.cleaver,g,100,!0),cleaverCore:_("cleaverCore",S.cleaverCore,m,100),splitlet:_("splitlet",S.splitlet,g,200,!0),aegis:_("aegis",S.aegis,d,100,!0),aegisRim:_("aegisRim",S.aegisRim,m,100),shieldFrame:_("shieldFrame",S.shieldFrame,y,100,!0),shieldPlate:_("shieldPlate",S.shieldPlate,L,100,!1,void 0,8),caster:_("caster",S.caster,f,100,!0),casterCore:_("casterCore",S.casterCore,m,100),wardenHull:_("wardenHull",S.wardenHull,d,3,!0),wardenPetal:_("wardenPetal",S.wardenPetal,f,24,!0),wardenCrown:_("wardenCrown",S.wardenCrown,m,3),wardenNode:_("wardenNode",S.wardenNode,m,24),wardenCore:_("wardenCore",S.wardenCore,m,3),mote:_("mote",S.mote,m,320),shard:_("shard",S.shard,y,70,!0),chest:_("chest",S.chest,y,12,!0),chestSeam:_("chestSeam",S.chestSeam,m,12),blade:_("blade",S.blade,m,8),pbolt:_("pbolt",S.ballLow,m,160),eOutline:_("eOutline",S.ballLow,A,180),eCore:_("eCore",S.ballLow,m,180),eShell:_("eShell",S.ball,w,180,!1,void 0,9),sparks:_("sparks",S.ballLow,m,700),debris:_("debris",S.debris,f,700,!0),beams:_("beams",k,x,240,!1,void 0,12)};const I=ki(c);I.depthTest=!1,this.L.beams.mesh.material=I,C.dispose(),k.dispose();const z=new Yn({color:15005439,metalness:.55,roughness:.3,emissive:801348,emissiveIntensity:.35}),X=new Fx({color:660504,metalness:.2,roughness:.05,clearcoat:1,emissive:3535615,emissiveIntensity:.45});this.wickGlowMat=jc(16777215),this.wickGlowMat.color.setRGB(1.2,3.2,3.6),this.wick.add(new le(S.wick,z),new le(S.wickCanopy,X),new le(S.wickGlow,this.wickGlowMat)),this.scene.add(this.wick),this.fieldMat=Yx(),this.field=new le(Qx(),this.fieldMat),this.field.renderOrder=10,this.field.visible=!1,this.scene.add(this.field),t.addEventListener("webglcontextlost",this.onLost,!1),t.addEventListener("webglcontextrestored",this.onRestored,!1),this.applyPreset(n),this.resize(),this.buildStage("hollow")}rebuildEnv(t){this.env?.dispose(),this.env=g_(this.gl,t),this.envArena=t,this.scene.environment=this.env.texture,this.scene.environmentIntensity=.85}buildStage(t){this.stage?.dispose(),this.stage=new v_({arena:t,planar:this.preset.reflections==="planar",anisotropy:Math.min(this.preset.anisotropy,this.gl.capabilities.getMaxAnisotropy()),width:this.cssW*this.gl.getPixelRatio(),height:this.cssH*this.gl.getPixelRatio()}),this.scene.add(this.stage.group),(!this.env||this.envArena!==t)&&this.rebuildEnv(t)}applyPreset(t){this.preset=t;for(let e=0;e<ka;e++)this.lights[e].visible=e<t.lights;this.post?.dispose(),this.post=null,this.resize(),(t.bloom!=="off"||t.ripple)&&(this.post=new h_(this.gl,this.scene,this.camera,t,this.cssW,this.cssH))}setQuality(t){const e=t.reflections==="planar"!=(this.preset.reflections==="planar");this.applyPreset(t),e&&this.stage&&this.buildStage(this.stage.arena)}resize(){const t=Math.max(1,window.innerWidth),e=Math.max(1,window.innerHeight);this.cssW=t,this.cssH=e;const n=Math.min(this.preset.maxDpr,window.devicePixelRatio||1)*this.preset.dprScale;this.gl.setPixelRatio(n),this.gl.setSize(t,e,!1),this.view.style.width="100%",this.view.style.height="100%",this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.post?.setSize(t,e,n),this.stage?.resize(t*n,e*n),this.dpr=Math.min(2,window.devicePixelRatio||1);const s=Math.floor(t*this.dpr),r=Math.floor(e*this.dpr);(this.hud.width!==s||this.hud.height!==r)&&(this.hud.width=s,this.hud.height=r)}resetCamera(){this.snap=!0}resetRun(t){this.snap=!0,(!this.stage||this.stage.arena!==t.arena)&&this.buildStage(t.arena),this.gl.renderLists.dispose()}screenToWorld(t,e){const n=new it(t/this.cssW*2-1,-(e/this.cssH)*2+1);this.ray.setFromCamera(n,this.camera);const s=this.ray.ray.intersectPlane(this.plane,this.tmpV);return s?{x:s.x,y:s.z}:null}col(t){let e=this.colors.get(t);return e||(e=new Dt(t),this.colors.set(t,e)),e}dispose(){this.view.removeEventListener("webglcontextlost",this.onLost),this.view.removeEventListener("webglcontextrestored",this.onRestored);for(const t of this.layers)t.dispose();this.layers.length=0;for(const t of Object.values(this.M))t.dispose();for(const t of this.tex)t.dispose();this.wick.traverse(t=>{const e=t;e.isMesh&&e.material.dispose()}),this.field.geometry.dispose(),this.fieldMat.dispose(),this.stage?.dispose(),this.env?.dispose(),this.post?.dispose(),this.gl.dispose()}draw(t,e,n,s,r){for(const c of this.layers)c.begin();this.poolMat.uniforms.uTime.value=s,this.laneMat.uniforms.uTime.value=s,this.fieldMat.uniforms.uTime.value=s,this.stage?.update(s);let a=0,o=0;if(t){if(this.snap?(this.camX=t.player.x,this.camY=t.player.y,this.snap=!1):(this.camX+=(t.player.x-this.camX)*.12,this.camY+=(t.player.y-this.camY)*.12),n.shake&&e.trauma>0){const f=e.trauma*e.trauma*12;a=(Math.random()*2-1)*f,o=(Math.random()*2-1)*f}const c=this.cssW/this.cssH,u=Math.max(857,769/c);this.camera.position.set(this.camX+a,Math.sin(sh)*u,this.camY+o+Math.cos(sh)*u),this.camera.lookAt(this.camX+a,0,this.camY+o)}else{const c=s*.05;this.camera.position.set(Math.sin(c)*760,330,Math.cos(c)*760),this.camera.lookAt(0,60,0)}let l=0;t?l=this.drawWorld(t,e,n,s):l=this.drawAttract(s),this.drawFx(e,n,s),l=this.drawLights(t,e,s,l);for(let c=l;c<ka;c++)this.lights[c].intensity=0;for(const c of this.layers)c.end();if(this.post){const c=e.shocks.length&&this.preset.ripple&&!n.reducedFlash?e.shocks[e.shocks.length-1]:null,u=this.post.shock;if(c){const f=this.tmpV.set(c.x,0,c.y).project(this.camera),d=f.x*.5+.5,g=f.y*.5+.5,y=this.tmpV.set(c.x+c.r,0,c.y).project(this.camera),m=this.cssW/this.cssH,p=Math.abs((y.x*.5+.5-d)*m);u.uniforms.uCenter.value.set(d,g),u.uniforms.uRadius.value=p,u.uniforms.uWidth.value=.035+p*.12,u.uniforms.uStrength.value=.022*(c.life/c.max),u.enabled=!0}else u.enabled=!1;this.post.setBloomStrength(n.reducedFlash?.35:.6)}this.lost||(this.post?this.post.render():this.gl.render(this.scene,this.camera));const h=this.hctx;h.setTransform(1,0,0,1,0,0),h.clearRect(0,0,this.hud.width,this.hud.height),this.visor.draw(h,this.hud.width,this.hud.height,this.dpr,t,e,n,s,r,t?this.project:null)}shadowAt(t,e,n,s){const r=Math.max(.35,1-s/80);this.L.shadow.put(t,.35,e,0,n*1.5*r+2,1,n*1.5*r+2)}splat(t,e,n,s,r){const a=this.L.splat.put(t,.6,e,0,n,1,n);this.L.splat.colorC(a,s,r)}ringAt(t,e,n,s,r,a=!1,o=.9){const l=a?this.L.ringsDash:this.L.rings,h=l.put(t,o,e,0,n,1,n);Array.isArray(s)?l.color(h,s[0]*r,s[1]*r,s[2]*r):l.colorC(h,s,r)}lineAt(t,e,n,s,r,a,o,l,h=.8){const c=s-e,u=r-n,f=Math.hypot(c,u);if(f<.5)return;const d=t.put(e,h,n,-Math.atan2(u,c),f,1,a);Array.isArray(o)?t.color(d,o[0]*l,o[1]*l,o[2]*l):t.colorC(d,o,l)}drawWorld(t,e,n,s){const r=this.L,a=t.player,o=this.camX,l=this.camY,h=760*Math.max(1,this.cssW/this.cssH),c=640,u=520,f=(v,M,x)=>v>o-h-x&&v<o+h+x&&M>l-c-x&&M<l+u+x;for(const v of t.hazards.list)if(v.alive)if(v.kind==="pool"){const M=v.t<v.tele,x=M?44:v.r,R=r.pools.put(v.x,.5,v.y,0,x,1,x);if(R>=0){const w=r.pools.extra.aPool,A=v.t-v.tele;w[R*4]=M?v.t/v.tele:1,w[R*4+1]=M?0:1,w[R*4+2]=(v.x*.013+v.y*.007)%10,w[R*4+3]=M?1:Math.min(1,A/.25,(v.life-A)/.6)}M||this.splat(v.x,v.y,x*1.3,this.col("#8a5cff"),.25)}else{const M=Math.hypot(v.x2-v.x,v.y2-v.y),x=r.lanes.put(v.x,.7,v.y,-Math.atan2(v.y2-v.y,v.x2-v.x),M,1,v.width);if(x>=0){const R=r.lanes.extra.aLane;R[x*4]=v.t>=v.tele?1:0,R[x*4+1]=Math.min(1,v.t/v.tele),R[x*4+2]=M,R[x*4+3]=v.width}}const d=this.col("#59ffb5"),g=this.col("#ffd24a");for(const v of t.pickups.list){if(!v.alive||!f(v.x,v.y,40))continue;const M=v.x*.05+v.y*.03;if(v.kind==="mote"){const x=Math.max(0,Math.sin(s*2.6+M*3))**24*3,R=r.mote.put(v.x,8+Math.sin(s*4+M)*2,v.y,s*2+M,4,4,4);r.mote.color(R,.35*(1.6+x),1*(1.6+x),.71*(1.6+x)),this.splat(v.x,v.y,14,d,.22)}else if(v.kind==="shard"){const x=Math.max(0,Math.sin(s*2+M*2))**30*2.5,R=r.shard.putEuler(v.x,12+Math.sin(s*3+M)*2,v.y,.3,s*1.6+M,.2,6.5,6.5,6.5);r.shard.color(R,1,.72,.25),r.shard.glowC(R,g,.5+x),this.splat(v.x,v.y,22,g,.3),this.shadowAt(v.x,v.y,5,12)}else{const x=r.chest.put(v.x,0,v.y,.4,12,12,12);r.chest.color(x,.85,.62,.3),r.chest.glowC(x,g,.22);const R=2+Math.sin(s*6)*1.2,w=r.chestSeam.put(v.x,0,v.y,.4,12,12,12);r.chestSeam.colorC(w,g,R),this.splat(v.x,v.y,46,g,.4+.15*Math.sin(s*6)),this.shadowAt(v.x,v.y,14,0)}}for(const v of t.enemies.list)!v.alive||!f(v.x,v.y,340)||(this.drawTelegraph(v,s),f(v.x,v.y,60)&&this.drawEnemy(v,a.x,a.y,s,e));const y=this.col("#ff2e88"),m=this.col("#ffa23a"),p=this.col("#7af8ff");for(const v of t.bullets.list)if(!(!v.alive||!f(v.x,v.y,30)))if(v.friendly){const M=-Math.atan2(v.vy,v.vx),x=r.pbolt.put(v.x,12,v.y,M,v.kind===1?7:9,v.kind===1?3.2:2.4,v.kind===1?3.2:2.4);v.kind===1?(r.pbolt.color(x,3.4,1.5,.35),Math.random()<.35&&e.ember(v.x,v.y,"#ffa23a"),this.splat(v.x,v.y,18,m,.3)):v.kind===2?r.pbolt.color(x,3.4,.9,2.2):(r.pbolt.color(x,1.2,3.4,3.8),this.splat(v.x,v.y,16,p,.18))}else{const M=v.kind===1?m:y,x=v.r;n.outline&&r.eOutline.put(v.x,10,v.y,0,x+3.2,x+3.2,x+3.2);const R=r.eCore.put(v.x,10,v.y,0,x*.62,x*.62,x*.62);r.eCore.color(R,2.2,2.2,2.2);const w=r.eShell.put(v.x,10,v.y,0,x*1.15,x*1.15,x*1.15);r.eShell.colorC(w,M,1.5),this.splat(v.x,v.y,24,M,.7)}return this.drawPlayer(t,e,s),0}drawTelegraph(t,e){const n=this.L;if(t.kind==="spitter"&&t.state===1){const s=1-t.timer/.7;this.lineAt(n.lines,t.x,t.y,t.x+Math.cos(t.ang)*520,t.y+Math.sin(t.ang)*520,6+10*s,this.col("#ff4fa0"),.6+2.4*s)}else if(t.kind==="rammer"&&t.state===1){const s=.5+.5*Math.sin(e*40),r=480*Bo(1)*.55+40;this.lineAt(n.chevrons,t.x,t.y,t.x+Math.cos(t.ang)*r,t.y+Math.sin(t.ang)*r,t.r*2.2,this.col("#ffa23a"),.55+.7*s)}else if(t.kind==="caster"&&t.state===1)this.ringAt(t.tx,t.ty,46,this.col("#c7a8ff"),1.6,!0);else if(t.kind==="warden"&&t.state===1){const s=1-t.timer/.8;this.ringAt(t.x,t.y,t.r+34+s*34,this.col("#ff2e88"),1.4+Math.sin(e*28)*.5),t.tx===3&&this.lineAt(n.chevrons,t.x,t.y,t.x+Math.cos(t.ang)*330,t.y+Math.sin(t.ang)*330,40,this.col("#ff2e88"),1+s)}}drawEnemy(t,e,n,s,r){const a=this.L,o=di[t.kind],l=this.col(o.color),h=Math.atan2(n-t.y,e-t.x),c=t.r,u=t.flash>0?5:0,f=t.seed,d=.16+l.r*.22,g=.16+l.g*.22,y=.18+l.b*.22,m=t.elite;let p=0;switch(t.kind){case"swarm":{p=12+Math.sin(s*5+f)*2.5;const v=a.drifter.put(t.x,p,t.y,s*3+f,c,c,c);a.drifter.color(v,d,g,y),a.drifter.glow(v,l.r*.12+u,l.g*.12+u,l.b*.12+u);const M=a.drifterEye.put(t.x,p,t.y,0,c,c,c);a.drifterEye.colorC(M,l,2.2);break}case"splitlet":{p=9+Math.sin(s*7+f)*2;const v=a.splitlet.putEuler(t.x,p,t.y,.5,s*7+f,.3,c,c,c);a.splitlet.color(v,.55,.4,.75),a.splitlet.glow(v,l.r*.9+u,l.g*.9+u,l.b*.9+u);break}case"spitter":{const v=Math.abs(Math.sin(s*7+f))*.6,M=a.spitterBody.put(t.x,v,t.y,-h,c,c,c);a.spitterBody.color(M,d,g,y),a.spitterBody.glow(M,u,u,u);const x=-t.ang,R=a.spitterHead.put(t.x,v,t.y,t.state===1?x:-h,c,c,c);a.spitterHead.color(R,d*1.1,g*1.1,y*1.1);const w=t.state===1?1-t.timer/.7:0;a.spitterHead.glow(R,l.r*(.1+w*.8)+u,l.g*(.1+w*.8)+u,l.b*(.1+w*.8)+u);const A=.17*c*(1+w*1.6),L=t.state===1?t.ang:h,S=a.spitterMuzzle.put(t.x+Math.cos(L)*1.12*c,v+1.36*c,t.y+Math.sin(L)*1.12*c,0,A,A,A),_=w>.85&&Math.floor(s*30)%2===0?2.5:1;a.spitterMuzzle.color(S,(l.r*1.5+w*3)*_,(l.g*1.5+w*3)*_,(l.b*1.5+w*3)*_),w>0&&this.splat(t.x,t.y,30+40*w,l,.3+w);break}case"rammer":{let v=t.x,M=t.y,x=1,R=1;const w=t.state===0?h:t.ang;if(t.state===1){v+=Math.sin(s*90)*1.8,M+=Math.cos(s*80)*1.8;const S=1-t.timer/.8;R=1-.3*S,x=1+.12*S}else t.state===2&&(R=.88,x=1.12,r.ember(t.x-Math.cos(t.ang)*c,t.y-Math.sin(t.ang)*c,"#ffa23a"),this.lineAt(this.L.lines,t.x-Math.cos(t.ang)*70,t.y-Math.sin(t.ang)*70,t.x,t.y,c*1.6,this.col("#ffa23a"),.9));const A=a.rammer.put(v,0,M,-w,c*x,c*R,c*x);a.rammer.color(A,d,g,y),a.rammer.glow(A,u,u,u);const L=a.rammerEye.put(v,0,M,-w,c*x,c*R,c*x);a.rammerEye.colorC(L,l,t.state===1?4:2);break}case"cleaver":{p=c*1.25+Math.sin(s*2+f)*2;const v=Math.sin(s*.9+f)*.35,M=s*.6+f,x=Math.cos(s*.7+f)*.3,R=a.cleaver.putEuler(t.x,p,t.y,v,M,x,c,c,c);a.cleaver.color(R,.32,.18,.5),a.cleaver.glow(R,l.r*.18+u,l.g*.18+u,l.b*.18+u);const w=1.6+Math.sin(s*4+f)*.5,A=a.cleaverCore.putEuler(t.x,p,t.y,v,M,x,c,c,c);a.cleaverCore.colorC(A,l,w),this.splat(t.x,t.y,c*2.2,l,.18);break}case"aegis":{const v=a.aegis.put(t.x,0,t.y,-h,c,c,c);a.aegis.color(v,.2,.32,.38),a.aegis.glow(v,u,u,u);const M=a.aegisRim.put(t.x,0,t.y,0,c,c,c);a.aegisRim.colorC(M,l,1.8);const x=c+9,R=a.shieldFrame.put(t.x,0,t.y,-t.shield,x,c*1.1,x);a.shieldFrame.color(R,.75,.8,.85),a.shieldFrame.glowC(R,l,.3+u*.2);const w=a.shieldPlate.put(t.x,0,t.y,-t.shield,x,c*1.1,x);a.shieldPlate.colorC(w,l,t.flash>0?2.5:.85);break}case"caster":{p=30+Math.sin(s*2.2+f)*4;const v=t.state===1?1-t.timer/.5:0,M=a.caster.putEuler(t.x,p,t.y,.25,s*.8+f,0,c,c,c);a.caster.color(M,d,g,y),a.caster.glow(M,l.r*.1+u,l.g*.1+u,l.b*.1+u);const x=c*(1+.7*v),R=a.casterCore.put(t.x,p,t.y,0,x,x,x);a.casterCore.colorC(R,l,1.8+4*v),this.splat(t.x,t.y,30+30*v,l,.25+.6*v);break}case"warden":this.drawWarden(t,h,s,u);break}this.shadowAt(t.x,t.y,c,p),m&&this.ringAt(t.x,t.y,c+8,this.col("#ffd24a"),1.5+Math.sin(s*5)*.3)}drawWarden(t,e,n,s){const r=this.L,a=t.r,o=t.phase===1,l=t.state===1?.5+.5*Math.sin(n*28):0,h=r.wardenHull.put(t.x,0,t.y,-e*.25+n*.1,a,a,a);o?r.wardenHull.color(h,.32,.18,.26):r.wardenHull.color(h,.78,.8,.86);const c=this.col("#ff2e88");r.wardenHull.glow(h,(o?c.r*.3:0)+l*c.r*.6+s*.5,(o?c.g*.3:0)+l*c.g*.6+s*.5,(o?c.b*.3:0)+l*c.b*.6+s*.5);const u=o?.32+Math.sin(n*3)*.04:0,f=n*.35;for(let v=0;v<8;v++){const M=f+v/8*Bi,x=a*(.98+u),R=r.wardenPetal.put(t.x+Math.cos(M)*x,u*8,t.y+Math.sin(M)*x,-M,a,a*(1-u*.3),a);r.wardenPetal.color(R,.26,.26,.3),r.wardenPetal.glow(R,s*.5+(o?.2:0),s*.5,s*.5+(o?.1:0))}const d=o?c:this.col("#7af8ff"),g=r.wardenCrown.put(t.x,a*.92,t.y,-n*(o?1.6:.8),a,a,a);r.wardenCrown.colorC(g,d,2.2+l*2);const y=n*(o?1.8:1);for(let v=0;v<8;v++){const M=y+v/8*Bi,x=a+18,R=r.wardenNode.put(t.x+Math.cos(M)*x,a*.55+Math.sin(n*3+v)*3,t.y+Math.sin(M)*x,M,5.5,5.5,5.5);o?r.wardenNode.color(R,3.2,.4,1.4):r.wardenNode.color(R,2.6,3,3.2)}const m=a*(o?.34:.24)*(1+l*.25),p=r.wardenCore.put(t.x,a*.75,t.y,n,m,m,m);o?r.wardenCore.color(p,5,1.2,2.8):r.wardenCore.color(p,3.5,3.8,4),this.splat(t.x,t.y,a*3,o?c:this.col("#9aa8ff"),.35+l*.5)}drawPlayer(t,e,n){const s=this.L,r=t.player,a=t.levels,o=t.state==="dead"&&t.deathTimer>.05,l=r.iframes>0&&Math.floor(n*18)%2===0;this.wick.visible=!o&&!l;let h=r.facing-this.lastFacing;for(;h>Math.PI;)h-=Bi;for(;h<-Math.PI;)h+=Bi;this.lastFacing=r.facing,this.bank+=(Math.max(-.6,Math.min(.6,h*8))-this.bank)*.15;const c=9+Math.sin(n*3)*1.5;this.wick.position.set(r.x,c,r.y),this.wick.rotation.set(this.bank,-r.facing,0,"YXZ"),this.wick.scale.setScalar(12);const u=Math.hypot(r.vx,r.vy),f=.7+Math.min(1,u/190)*1.2;if(r.flash>0?this.wickGlowMat.color.setRGB(3.5,.8,1.4):this.wickGlowMat.color.setRGB(.6*f,2*f,2.4*f),o)return;this.shadowAt(r.x,r.y,14,c),this.splat(r.x,r.y,60,this.col("#35f2ff"),.14),u>40&&Math.random()<.5&&e.ember(r.x-Math.cos(r.facing)*12,r.y-Math.sin(r.facing)*12,"#7af8ff");const d=a.siphon>0&&a.bulwark>0;if(this.field.visible=d&&r.fieldOn,this.field.visible){const g=r.fieldR;this.field.position.set(r.x,0,r.y),this.field.scale.set(g,g*.42,g),this.fieldMat.uniforms.uPulse.value=e.fieldPulse,this.ringAt(r.x,r.y,g,this.col("#35f2ff"),1.4+e.fieldPulse*2)}else d&&r.hold&&this.ringAt(r.x,r.y,26+r.reserve*.1,this.col("#d9a441"),1.6,!0);if(a.orbit>0){const g=r.fieldOn&&d,y=g?r.fieldR+10:64,m=a.orbit+1,p=this.col("#59ffb5");for(let v=0;v<m;v++){const M=r.orbitAngle+v/m*Bi,x=r.x+Math.cos(M)*y,R=r.y+Math.sin(M)*y,w=s.blade.put(x,14,R,-(M+Math.PI/2),11,11,11);s.blade.colorC(w,p,g?1.9:1.4),this.splat(x,R,22,p,.25)}}}drawAttract(t){this.wick.visible=!0,this.field.visible=!1,this.wick.position.set(0,26+Math.sin(t*1.4)*4,0),this.wick.rotation.set(Math.sin(t*.7)*.15,t*.25,0,"YXZ"),this.wick.scale.setScalar(26),this.wickGlowMat.color.setRGB(1.2,3,3.4),this.shadowAt(0,0,30,26),this.splat(0,0,160,this.col("#35f2ff"),.35);const e=["swarm","spitter","rammer","cleaver","aegis","caster","swarm","rammer"],n=this.fakeEnemy;for(let s=0;s<e.length;s++){const r=t*.12+s/e.length*Bi,a=260+s%2*70;n.kind=e[s],n.x=Math.cos(r)*a,n.y=Math.sin(r)*a,n.r=di[n.kind].r*1.6,n.seed=s*1.3,n.shield=t*1.4+s,n.ang=r+Math.PI,n.elite=s===3,this.drawEnemy(n,0,0,t,this.dummyFx)}return 0}drawFx(t,e,n){const s=this.L,r=e.reducedFlash?.55:1;for(const a of t.rings){const o=Math.max(0,a.life/a.max);this.ringAt(a.x,a.y,a.r,this.col(a.color),o*2.2*r,!1,1.2)}for(const a of t.shocks){const o=Math.max(0,a.life/a.max);this.ringAt(a.x,a.y,a.r,[1,1,1],o*1.6*r,!1,1.4)}for(const a of t.beams){const o=Math.max(0,a.life/a.max),l=this.col(a.color),h=a.pts;for(let c=0;c+3<h.length;c+=2){const u=h[c],f=h[c+1],d=h[c+2],g=h[c+3];if(!a.jagged)this.lineAt(s.beams,u,f,d,g,a.w*3.2,l,3.2*o,16),this.lineAt(s.beams,u,f,d,g,a.w*1.1,[1,1,1],4*o,16.5);else{const y=d-u,m=g-f,p=Math.hypot(y,m)||1,v=-m/p,M=y/p;let x=u,R=f;const w=5;for(let A=1;A<=w;A++){const L=A/w,S=A===w?0:(Math.random()-.5)*Math.min(26,p*.25),_=u+y*L+v*S,C=f+m*L+M*S;this.lineAt(s.beams,x,R,_,C,a.w*3.4,l,3*o,18),this.lineAt(s.beams,x,R,_,C,a.w*1.1,[1,1,1],2.5*o,18.5),x=_,R=C}}}}for(const a of t.particles){if(!a.alive)continue;const o=Math.max(0,a.life/a.max),l=this.col(a.color);if(a.kind===1){const h=a.size*1.3,c=s.debris.putEuler(a.x,a.z+h*.5,a.y,a.rx,a.ry,0,h,h,h);s.debris.color(c,.18+l.r*.3,.18+l.g*.3,.2+l.b*.3),s.debris.glowC(c,l,o*o*2.2)}else{const h=a.size*.55*(.4+.6*o),c=s.sparks.put(a.x,a.z+1,a.y,0,h,h,h);s.sparks.colorC(c,l,1+3*o)}}}drawLights(t,e,n,s){const r=this.preset.lights;let a=s;const o=(l,h,c,u,f,d)=>{if(a>=r)return;const g=this.lights[a++];g.position.set(l,h,c),g.color.copy(u),g.intensity=f,g.distance=d};if(t){const l=t.player;t.state==="dead"&&t.deathTimer>.05||o(l.x,90,l.y,this.col("#9feaff"),7e3,480)}else o(0,140,0,this.col("#9feaff"),7e3,900);for(let l=e.flares.length-1;l>=0&&a<r;l--){const h=e.flares[l],c=Math.pow(Math.max(0,h.life/h.max),1.5);o(h.x,h.h,h.y,this.col(h.color),h.power*16e3*c,h.range)}if(t&&a<r){for(const l of t.enemies.list)if(l.alive&&l.kind==="warden"){const h=l.state===1?.6+.4*Math.sin(n*28):.25;if(o(l.x,90,l.y,this.col(l.phase?"#ff2e88":"#b9c4ff"),2e4*h,700),a>=r)break}}return a}}function Cu(i,t=bh()){const e=i.player;let n=0,s=0,r=0;for(const h of i.enemies.list){if(!h.alive)continue;const c=e.x-h.x,u=e.y-h.y,f=c*c+u*u;if(f<260*260){const d=Math.sqrt(f)||1,g=(h.kind==="warden"?3:1)/(d+20);n+=c/d*g*100,s+=u/d*g*100,d<140&&r++}}for(const h of i.bullets.list){if(!h.alive||h.friendly)continue;const c=e.x-h.x,u=e.y-h.y,f=c*c+u*u;if(f<120*120){const d=Math.sqrt(f)||1,g=Math.hypot(h.vx,h.vy)||1,y=c*-h.vy+u*h.vx>0?1:-1;n+=-h.vy/g*y*(60/d),s+=h.vx/g*y*(60/d)}}for(const h of i.hazards.list){const c=Math.hypot(e.x-h.x,e.y-h.y);h.kind==="pool"&&c<h.r+60&&(n+=(e.x-h.x)/(c||1)*2,s+=(e.y-h.y)/(c||1)*2)}if(r===0){let h=1e9;for(const c of i.pickups.list){const u=Math.hypot(c.x-e.x,c.y-e.y);u<h&&u<400&&(h=u,n+=(c.x-e.x)/u*.6,s+=(c.y-e.y)/u*.6)}}const a=i.arena==="foundry"?1300:1200,o=Math.hypot(e.x,e.y);o>a-300&&(n-=e.x/o*1.5,s-=e.y/o*1.5);const l=Math.hypot(n,s);return t.mx=l>.02?n/l:0,t.my=l>.02?s/l:0,t.hasAim=!1,t.release=i.levels.detonation>0&&e.reserve>70&&r>=4,t.toggleHold=!1,t}const Ru="void-survivor:v1";function y_(i=!1){return{volume:.6,muted:!1,shake:!i,reducedFlash:i,outline:!0,aim:"auto",numbers:!0,quality:"auto"}}function Pu(i=!1){return{v:1,shards:0,owned:{},best:{time:0,kills:0,wave:0,score:0,level:0},stats:{runs:0,wins:0,kills:0,deaths:0,bosses:0,playtime:0},settings:y_(i),arena:"hollow"}}function $e(i,t,e=0,n=1e9){return typeof i=="number"&&Number.isFinite(i)?Math.min(n,Math.max(e,i)):t}function _s(i,t){return typeof i=="boolean"?i:t}function M_(i,t=!1){const e=Pu(t);if(!i)return e;let n;try{n=JSON.parse(i)}catch{return e}if(!n||typeof n!="object")return e;const s=n;if(s.v!==1)return e;const r=s.best&&typeof s.best=="object"?s.best:{},a=s.stats&&typeof s.stats=="object"?s.stats:{},o=s.settings&&typeof s.settings=="object"?s.settings:{},l=s.owned&&typeof s.owned=="object"?s.owned:{},h={};for(const f of Object.keys(l)){const d=l[f];typeof d=="number"&&Number.isFinite(d)&&d>0&&d<10&&(h[f]=Math.floor(d))}const c=o.quality==="low"||o.quality==="medium"||o.quality==="high"||o.quality==="auto"?o.quality:e.settings.quality,u=o.aim==="mouse"||o.aim==="move"||o.aim==="auto"?o.aim:e.settings.aim;return{v:1,shards:Math.floor($e(s.shards,0)),owned:h,best:{time:$e(r.time,0),kills:$e(r.kills,0),wave:$e(r.wave,0),score:$e(r.score,0),level:$e(r.level,0)},stats:{runs:$e(a.runs,0),wins:$e(a.wins,0),kills:$e(a.kills,0),deaths:$e(a.deaths,0),bosses:$e(a.bosses,0),playtime:$e(a.playtime,0)},settings:{volume:$e(o.volume,e.settings.volume,0,1),muted:_s(o.muted,e.settings.muted),shake:_s(o.shake,e.settings.shake),reducedFlash:_s(o.reducedFlash,e.settings.reducedFlash),outline:_s(o.outline,e.settings.outline),aim:u,numbers:_s(o.numbers,e.settings.numbers),quality:c},arena:s.arena==="foundry"?"foundry":"hollow"}}function S_(i=!1){try{return M_(localStorage.getItem(Ru),i)}catch{return Pu(i)}}function b_(i){try{localStorage.setItem(Ru,JSON.stringify(i))}catch{}}const rh=["menu","vault","settings","howto","pause","levelup","summary"];function qt(i){const t=document.getElementById(i);if(!t)throw new Error(`Missing element #${i}`);return t}function Wt(i,t,e){const n=document.createElement(i);return t&&(n.className=t),e!==void 0&&(n.textContent=e),n}function bs(i){const t=Math.floor(i);return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`}const E_={signature:"Signature core",weapon:"Weapon",passive:"Passive",filler:"One-time fix"};class T_{constructor(t,e){Y(this,"current",null);Y(this,"h");Y(this,"getSave");Y(this,"opener",null);Y(this,"settingsReturn","menu");this.h=t,this.getSave=e;const n=(a,o)=>{qt(a).addEventListener("click",()=>{this.h.click(),o()})};n("btnStart",()=>t.start()),n("btnVault",()=>this.open("vault")),n("btnSettings",()=>{this.settingsReturn="menu",this.open("settings")}),n("btnHow",()=>this.open("howto")),n("vaultBack",()=>this.open("menu")),n("howBack",()=>this.open("menu")),n("settingsBack",()=>this.open(this.settingsReturn)),n("pResume",()=>t.resume()),n("pRestart",()=>t.restart()),n("pSettings",()=>{this.settingsReturn="pause",this.open("settings")}),n("pQuit",()=>t.quit()),n("btnReroll",()=>t.reroll()),n("sumAgain",()=>t.restart()),n("sumVault",()=>{this.settingsReturn="menu",this.open("vault")}),n("sumMenu",()=>t.quit());const s=()=>this.getSave().settings;qt("setVolume").addEventListener("input",a=>{s().volume=Number(a.target.value)/100,t.settingsChanged()});const r=(a,o)=>{qt(a).addEventListener("change",l=>{s()[o]=l.target.checked,t.settingsChanged()})};r("setMuted","muted"),r("setShake","shake"),r("setFlash","reducedFlash"),r("setOutline","outline"),r("setNumbers","numbers"),qt("setAim").addEventListener("change",a=>{s().aim=a.target.value,t.settingsChanged()}),qt("setQuality").addEventListener("change",a=>{s().quality=a.target.value,t.settingsChanged()}),document.addEventListener("keydown",a=>{if(a.key!=="Tab"||!this.current||this.current==="menu")return;const o=qt(this.current),l=Array.from(o.querySelectorAll("button, input, select, [tabindex]")).filter(f=>!f.hasAttribute("disabled")&&f.offsetParent!==null);if(l.length===0)return;const h=l[0],c=l[l.length-1],u=document.activeElement;a.shiftKey&&(u===h||!o.contains(u))?(a.preventDefault(),c.focus()):!a.shiftKey&&(u===c||!o.contains(u))&&(a.preventDefault(),h.focus())})}open(t){this.current===null&&(this.opener=document.activeElement);for(const s of rh)qt(s).classList.toggle("hidden",s!==t);this.current=t,t==="menu"&&this.renderMenu(),t==="vault"&&this.renderVault(),t==="settings"&&this.syncSettings();const n=qt(t).querySelector(".btn-primary, .mod, .btn, input, select");window.setTimeout(()=>n?.focus(),0)}close(){for(const t of rh)qt(t).classList.add("hidden");this.current=null,this.opener&&document.contains(this.opener)&&this.opener.blur(),document.activeElement?.blur?.()}announce(t){qt("live").textContent=t}setQualityNote(t){qt("qualityNote").textContent=t}renderMenu(){const t=this.getSave();qt("menuShards").textContent=String(t.shards);const e=t.best,n=t.stats.runs;qt("menuBest").textContent=e.time>0?`Longest run ${bs(e.time)}, with ${e.kills} kills on wave ${e.wave}. ${n} ${n===1?"run":"runs"} logged.`:"No runs logged yet. Your best run will show here.";const s=qt("arenaPick");s.querySelectorAll("label").forEach(a=>a.remove());const r=[{id:"hollow",name:"The Hollow"},{id:"foundry",name:"Ring Foundry"}];for(const a of r){const o=Ph(t.owned,a.id),l=Wt("label","chip"),h=Wt("input");h.type="radio",h.name="arena",h.value=a.id,h.checked=t.arena===a.id&&o,h.disabled=!o,h.addEventListener("change",()=>this.h.arena(a.id));const c=Wt("span",void 0,a.name);o||c.append(Wt("small",void 0,"Unlock in the Vault")),l.append(h,c),s.append(l)}}renderVault(){const t=this.getSave();qt("vaultShards").textContent=String(t.shards);const e=qt("vaultList");e.textContent="";for(const n of Ch){const s=sn(t.owned,n.id),r=Xo(t.owned,n),a=Wt("li","locker-row"+(s>0?" owned":"")),o=Wt("div","locker-text");o.append(Wt("h3",void 0,n.name),Wt("p",void 0,n.desc));const l=Wt("span","ticks");l.setAttribute("role","img"),l.setAttribute("aria-label",`${s} of ${n.cost.length} owned`);for(let c=0;c<n.cost.length;c++)l.append(Wt("i",c<s?"on":void 0));const h=Wt("button","btn btn-buy");h.type="button",r===null?(h.textContent=n.cost.length>1?"Maxed":"Owned",h.disabled=!0):(h.textContent=`Buy for ${r} Shards`,h.disabled=!Rh(t.owned,t.shards,n),h.disabled&&(h.title=`You need ${r-t.shards} more Shards`),h.addEventListener("click",()=>{this.h.click(),this.h.buy(n.id)})),a.append(o,l,h),e.append(a)}}syncSettings(){const t=this.getSave().settings;qt("setVolume").value=String(Math.round(t.volume*100)),qt("setMuted").checked=t.muted,qt("setShake").checked=t.shake,qt("setFlash").checked=t.reducedFlash,qt("setOutline").checked=t.outline,qt("setNumbers").checked=t.numbers,qt("setAim").value=t.aim,qt("setQuality").value=t.quality}renderChoice(t){const e=t.choice;if(!e)return;qt("luTitle").textContent=e.chest?"Chest salvage":`Level ${t.player.level}`,qt("luSub").textContent=e.chest?"A sealed cache, heavy with rare parts. Slot one module.":"Wick has Essence to spare. Slot one module.";const n=qt("cards");n.textContent="",e.ids.forEach((r,a)=>n.append(this.module(Vi[r],t.levels,a)));const s=qt("btnReroll");s.textContent=t.rerolls>0?`Reroll the rig (4), ${t.rerolls} left`:"No rerolls left",s.disabled=t.rerolls<=0,this.announce(`${e.chest?"Chest salvage":"Level up"}. Choose one of three modules.`)}module(t,e,n){const s=e[t.id],r=t.kind==="filler",a=Wt("button",`mod mod-${t.kind}`);a.type="button",a.style.setProperty("--accent",t.color);const o=Math.min(t.maxLevel,s+1),l=t.desc(o),h=r?"single use":s===0?`new, level 1 of ${t.maxLevel}`:`level ${o} of ${t.maxLevel}`;a.setAttribute("aria-label",`Install ${t.name}, ${h}. ${l} Key ${n+1}.`);const c=Wt("span","mod-slot",String(n+1));c.setAttribute("aria-hidden","true");const u=Wt("span","mod-led");if(u.setAttribute("aria-hidden","true"),a.append(c,u,Wt("span","mod-kind",E_[t.kind]),Wt("span","mod-name",t.name)),!r){const d=Wt("span","ticks");for(let g=0;g<t.maxLevel;g++)d.append(Wt("i",g<s?"on":g===s?"new":void 0));a.append(d,Wt("span","mod-level",s===0?"New module":`Upgrade to level ${o}`))}a.append(Wt("span","mod-desc",l));const f=lf(t.id,e);return f&&a.append(Wt("span","mod-tape","Completes "+f.replace(/^Synergy:\s*/,""))),a.addEventListener("click",()=>{this.h.click(),this.h.pick(n)}),a}renderSummary(t,e,n){qt("sumTitle").textContent=t.won?"Wick recovered":"Signal lost",qt("sumLine").textContent=t.won?`The salvage drone came home from ${n} after ${bs(t.time)} with ${t.kills} kills.`:`Wick went dark in ${n} at ${bs(t.time)}, on wave ${t.wave}.`;const s=qt("sumRating");s.textContent=t.rating,s.setAttribute("aria-label",`Rating ${t.rating}`),s.dataset.rating=t.rating;const r=qt("sumGrid");r.textContent="";const a=new Set(e),o=[["Time",bs(t.time),"time"],["Wave",String(t.wave),"wave"],["Kills",String(t.kills),"kills"],["Damage dealt",t.damage.toLocaleString("en")],["Level",String(t.level)],["Wardens down",String(t.bosses)],["Best chain",`×${t.maxChain}`],["Detonations",String(t.detonations)],["Score",t.score.toLocaleString("en"),"score"]];for(const[m,p,v]of o){const M=Wt("div"),x=Wt("dd",void 0,p);v&&a.has(v)&&x.append(Wt("span","best-tag","New best")),M.append(Wt("dt",void 0,m),x),r.append(M)}const l=qt("sumKills");l.textContent="";const h=Object.keys(t.killsBy).sort((m,p)=>t.killsBy[p]-t.killsBy[m]);h.length===0&&l.append(Wt("li","empty","Nothing this time."));const c=h.length?t.killsBy[h[0]]:1;for(const m of h){const p=di[m],v=Wt("li"),M=Wt("i");M.style.setProperty("--w",String(Math.max(.04,t.killsBy[m]/c))),M.style.setProperty("--c",p?.color??"#cfe9ea"),M.setAttribute("aria-hidden","true"),v.append(Wt("span",void 0,p?.name??m),M,Wt("span","num",String(t.killsBy[m]))),l.append(v)}const u=qt("sumPicks");u.textContent="",t.picks.length===0&&u.append(Wt("li","empty","No modules taken."));let f=0;for(;f<t.picks.length;){const m=t.picks[f];let p=1;for(;t.picks[f+p]===m;)p++;const v=Wt("li",void 0,Vi[m].name+(p>1?` ×${p}`:""));v.style.setProperty("--c",Vi[m].color),u.append(v),f+=p}const d=qt("sumShards");d.textContent="";const g=[["Crystals collected",t.shardsCollected],["Time survived",t.shardsTime],["Kills",t.shardsKills],["Wardens",t.shardsBosses],["Victory bonus",t.shardsWin]];for(const[m,p]of g){const v=Wt("li");v.append(Wt("span",void 0,m),Wt("span","num",`+${p}`)),d.append(v)}const y=Wt("li","total");y.append(Wt("span",void 0,"Total"),Wt("span","num",String(t.shardsTotal))),d.append(y)}}const w_=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,ie=S_(w_),ah=document.getElementById("view"),xi=document.getElementById("hud"),Fr=document.getElementById("fatal"),dl=document.getElementById("notice"),A_=document.getElementById("noticeText");document.getElementById("noticeClose")?.addEventListener("click",()=>dl.classList.add("hidden"));function oh(i){A_.textContent=i,dl.classList.remove("hidden")}function C_(){try{const t=document.createElement("canvas").getContext("webgl2");if(!t)return"low";const e=ed(t);return t.getExtension("WEBGL_lose_context")?.loseContext(),e}catch{return"low"}}let Es=C_(),lh=!1;const Yr=()=>td[nd(ie.settings.quality,Es)],ui=new Qf;ui.budget=Yr().particles;let Pe;try{const i=new __(ah,xi,Yr());i.onContext=t=>{t?(Vs(),oh("The graphics card reset and the 3D view was lost. The run is paused; it will come back on its own in a moment.")):(dl.classList.add("hidden"),Qt.announce("3D view restored."))},Pe=i}catch(i){console.warn("WebGL renderer unavailable, using Canvas 2D.",i),ah.classList.add("hidden");try{Pe=new rd(xi),oh("3D graphics could not start because WebGL is unavailable or blocked in this browser, so you are playing the flat 2D view. Turning on hardware acceleration usually fixes this.")}catch(t){throw Fr.textContent="This browser cannot draw the game: neither WebGL nor Canvas 2D is available.",Fr.classList.remove("hidden"),t}}document.body.dataset.renderer=Pe.kind;const Ce=new Xu;Ce.volume=ie.settings.volume;Ce.muted=ie.settings.muted;let he="menu",Se=null,Pr=0,Lr=0,ks=performance.now(),Lu=0,$r=!1,ch=!1,Du=null,Iu=0,Ba=0,Mr=0,Ts=0,hh=0,za=0;const ve=bh(),Zr=new Set;let ko=-1,Uu=-1,Nu=!1,uh=1,fh=0;const ce={active:!1,bx:0,by:0,kx:0,ky:0,id:-1,x:0,y:0},Ps=()=>b_(ie);function pl(){Ce.setVolume(ie.settings.volume),Ce.setMuted(ie.settings.muted)}let dh=null;function ml(){const i=Yr();ui.budget=i.particles,dh!==i.level&&(dh=i.level,Pe.setQuality(i)),Qt.setQualityNote(ie.settings.quality==="auto"?`Auto is using ${Dh[i.level]} on this device.`:"")}function R_(){const i=/seed=(\d+)/.exec(location.hash);return i?Number(i[1])>>>0:(Date.now()^Math.floor(performance.now()*1e3))>>>0||1}function Or(){Ce.init(),Ce.startMusic(),Ce.setDuck(!1),Se=Eh(R_(),Lh(ie.owned,ie.arena)),ui.reset(),Pe.resetRun(Se),Pr=0,Lr=0,Ts=0,Lu=performance.now(),ve.release=!1,ve.toggleHold=!1,he="playing",Qt.close(),Qt.announce("Run started. Survive."),Kr(!0)}function P_(){Se=null,$r=!1,he="menu",Ce.stopMusic(),Kr(!1),Qt.open("menu")}function Vs(){he==="playing"&&(he="paused",Ce.setDuck(!0),Qt.open("pause"))}function Fu(){he==="paused"&&(he="playing",Ce.setDuck(!1),Qt.close(),ks=performance.now())}function L_(){if(!Se)return;const i=Yf(Se);Du=i;const t=[],e=ie.best;i.time>e.time&&(e.time=i.time,t.push("time")),i.kills>e.kills&&(e.kills=i.kills,t.push("kills")),i.wave>e.wave&&(e.wave=i.wave,t.push("wave")),i.score>e.score&&(e.score=i.score,t.push("score")),e.level=Math.max(e.level,i.level),ie.shards+=i.shardsTotal,ie.stats.runs++,ie.stats.kills+=i.kills,ie.stats.bosses+=i.bosses,ie.stats.playtime+=Math.round((performance.now()-Lu)/1e3),i.won?ie.stats.wins++:ie.stats.deaths++,Ps(),he="summary",Ce.setDuck(!0),Kr(!1),Qt.renderSummary(i,t,Se.arena==="foundry"?"Ring Foundry":"The Hollow"),Qt.open("summary"),Qt.announce(`${i.won?"Victory":"Run over"}. Rating ${i.rating}. ${i.kills} kills in ${bs(i.time)}.`)}function Kr(i){const t=document.getElementById("touch");if(!t)return;const e=window.matchMedia?.("(pointer: coarse)").matches??!1;t.classList.toggle("hidden",!(i&&e))}const Qt=new T_({start:Or,resume:Fu,restart:()=>{Or()},quit:P_,pick:i=>Ou(i),reroll:()=>{Se&&Ah(Se)&&Qt.renderChoice(Se)},buy:i=>{const t=$f(ie.owned,ie.shards,i);t&&(ie.owned=t.owned,ie.shards=t.shards,Ps(),Qt.renderVault(),Qt.announce("Purchased."))},arena:i=>{ie.arena=i,Ps()},settingsChanged:()=>{pl(),ml(),Ps()},click:()=>Ce.click()},()=>ie);function Ou(i){if(!(!Se||he!=="levelup")&&Wo(Se,i)){if(Se.state==="levelup"){Qt.renderChoice(Se);return}he="playing",Ce.setDuck(!1),Qt.close(),ks=performance.now()}}function D_(i){return i instanceof HTMLInputElement&&i.type==="text"}window.addEventListener("keydown",i=>{if(D_(i.target))return;const t=i.key.toLowerCase();if(Ce.init(),t==="m"){ie.settings.muted=!ie.settings.muted,pl(),Ps(),Qt.current==="settings"&&Qt.syncSettings();return}if(he==="levelup"){t==="1"||t==="2"||t==="3"?Ou(Number(t)-1):t==="4"&&Se&&Ah(Se)&&Qt.renderChoice(Se);return}if(t==="escape"||t==="p"){he==="playing"?Vs():he==="paused"?Fu():Qt.current==="settings"?Qt.open(Qt.settingsReturn):(Qt.current==="vault"||Qt.current==="howto")&&Qt.open("menu"),i.preventDefault();return}if(t==="r"&&(he==="paused"||he==="summary")){Or();return}if(he==="menu"&&t==="enter"&&Qt.current==="menu"&&document.activeElement===document.body){Or();return}he==="playing"&&(t==="e"||t===" "?(ve.release=!0,i.preventDefault()):t==="q"&&(ve.toggleHold=!0)),["arrowup","arrowdown","arrowleft","arrowright"," "].includes(t)&&he==="playing"&&i.preventDefault(),Zr.add(t)});window.addEventListener("keyup",i=>Zr.delete(i.key.toLowerCase()));window.addEventListener("blur",()=>{Zr.clear(),Vs()});document.addEventListener("visibilitychange",()=>{document.hidden&&Vs()});window.addEventListener("resize",()=>Pe.resize());window.addEventListener("orientationchange",()=>Pe.resize());xi.addEventListener("pointermove",i=>{if(ko=i.clientX,Uu=i.clientY,i.pointerType==="mouse"&&(Nu=!0),ce.active&&i.pointerId===ce.id){const t=Pe.dpr,e=i.clientX*t-ce.bx,n=i.clientY*t-ce.by,s=Math.hypot(e,n),r=56*t,a=s>r?r/s:1;ce.kx=ce.bx+e*a,ce.ky=ce.by+n*a,ce.x=e*a/r,ce.y=n*a/r}});xi.addEventListener("pointerdown",i=>{if(Ce.init(),i.pointerType==="touch"&&he==="playing"&&!ce.active&&i.clientX<window.innerWidth*.62){ce.active=!0,ce.id=i.pointerId,ce.bx=ce.kx=i.clientX*Pe.dpr,ce.by=ce.ky=i.clientY*Pe.dpr,ce.x=ce.y=0,xi.setPointerCapture(i.pointerId),Kr(!0);const t=document.getElementById("touch");t&&t.classList.remove("hidden")}});const ku=i=>{ce.active&&i.pointerId===ce.id&&(ce.active=!1,ce.x=ce.y=0)};xi.addEventListener("pointerup",ku);xi.addEventListener("pointercancel",ku);const gl=(i,t)=>document.getElementById(i)?.addEventListener("pointerdown",e=>{e.preventDefault(),Ce.init(),t()});gl("tRelease",()=>{ve.release=!0});gl("tHold",()=>{ve.toggleHold=!0});gl("tPause",Vs);function I_(i){const t=Zr;let e=(t.has("d")||t.has("arrowright")?1:0)-(t.has("a")||t.has("arrowleft")?1:0),n=(t.has("s")||t.has("arrowdown")?1:0)-(t.has("w")||t.has("arrowup")?1:0);ce.active&&(e+=ce.x,n+=ce.y),ve.mx=e,ve.my=n;const s=Math.hypot(e,n);if(s>.2&&(uh=e/s,fh=n/s),ve.hasAim=!1,ie.settings.aim==="mouse"&&Nu&&ko>=0){const r=Pe.screenToWorld(ko,Uu);r&&(ve.aimX=r.x,ve.aimY=r.y,ve.hasAim=!0)}else ie.settings.aim==="move"&&(ve.aimX=i.player.x+uh*240,ve.aimY=i.player.y+fh*240,ve.hasAim=!0)}function Bu(i){if(!ch){requestAnimationFrame(Bu);try{const t=Math.min(.25,Math.max(0,(i-ks)/1e3));let e=Math.min(.05,t);ks=i,ui.slow>0&&(e*=.4);const n=Se;if(n&&(he==="playing"||he==="ending")){Pr+=e;let s=0;for(;Pr>=Dr&&s<5;){if(Pr-=Dr,s++,$r?(Cu(n,ve),n.player.hp=n.player.maxHp,n.state==="levelup"&&Wo(n,0)):he==="playing"?I_(n):ve.mx=ve.my=0,Wa(n,ve),ve.release=!1,ve.toggleHold=!1,n.events.length){ui.handle(n,ie.settings),Ce.handle(n);for(const r of n.events)r.t==="bossWarn"?Qt.announce("Warning: the Core Warden approaches."):r.t==="wave"&&(r.a??1)>1&&Qt.announce(`Wave ${r.a}`);n.events.length=0}if(n.state!=="playing")break}n.state==="levelup"&&he==="playing"?(he="levelup",Ce.setDuck(!0),Qt.renderChoice(n),Qt.open("levelup")):(n.state==="dead"||n.state==="won")&&he==="playing"&&(he="ending",Lr=n.state==="dead"?1.1:1.8),he==="ending"&&(n.state==="dead"&&Wa(n,ve),Lr-=e,Lr<=0&&L_())}ui.update(e),Pe.draw(Se,ui,ie.settings,i/1e3,ce.active?ce:null),U_(t)}catch(t){ch=!0,Fr.textContent="Something went wrong and the game stopped. Reload the page to continue.",Fr.classList.remove("hidden"),console.error(t)}}}function U_(i){Ba++,Mr+=i,Mr>=1&&(Iu=Math.round(Ba/Mr),Ba=0,Mr=0),he==="playing"&&!$r&&ie.settings.quality==="auto"&&!lh&&Pe.kind==="3d"&&(Ts+=i,Ts>3&&Ts<9?(za++,i>1/45&&hh++):Ts>=9&&za>30&&(lh=!0,hh/za>.5&&Es!=="low"&&(Es=id(Es),ml(),Qt.announce(`Graphics lowered to ${Dh[Es]} to keep the game smooth.`))))}function N_(){if(pl(),ml(),Pe.resize(),location.hash==="#demo"||location.hash==="#demo-late"){$r=!0,Se=Eh(20260,Lh({w_homing:1,w_chain:1},"hollow"));const i=Se,t=location.hash==="#demo-late"?960:330;for(let e=0;e<60*t&&(Cu(i,ve),i.player.hp=i.player.maxHp,i.state==="levelup"&&Wo(i,e%3),Wa(i,ve),i.events.length=0,!(i.state==="dead"||i.state==="won"));e++);Pe.resetRun(i),he="playing",Qt.close()}else Qt.open("menu");window.__vs={get world(){return Se},get app(){return he},get summary(){return Du},get fps(){return Iu},get renderer(){return Pe.kind},get quality(){return Yr().level},get gfx(){return Pe}},requestAnimationFrame(i=>{ks=i,Bu(i)})}N_();
