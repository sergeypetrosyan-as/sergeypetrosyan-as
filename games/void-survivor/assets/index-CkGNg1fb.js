var hf=Object.defineProperty;var uf=(i,t,e)=>t in i?hf(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var $=(i,t,e)=>uf(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const kl=14;class ff{constructor(){$(this,"ctx",null);$(this,"master",null);$(this,"music",null);$(this,"noiseBuf",null);$(this,"voices",0);$(this,"volume",.6);$(this,"muted",!1);$(this,"musicOn",!1);$(this,"step",0);$(this,"nextTime",0);$(this,"timer",null);$(this,"wave",1);$(this,"duck",!1);$(this,"last",{})}init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}try{const t=window.AudioContext??window.webkitAudioContext;if(!t)return;this.ctx=new t,this.master=this.ctx.createGain(),this.master.connect(this.ctx.destination),this.music=this.ctx.createGain(),this.music.connect(this.master),this.applyGain();const e=this.ctx.sampleRate*.6;this.noiseBuf=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const n=this.noiseBuf.getChannelData(0);let s=12345;for(let r=0;r<e;r++)s=s*1664525+1013904223>>>0,n[r]=s/4294967296*2-1}catch{this.ctx=null}}setVolume(t){this.volume=t,this.applyGain()}setMuted(t){this.muted=t,this.applyGain()}setDuck(t){this.duck=t,this.applyGain()}applyGain(){if(!this.master||!this.music||!this.ctx)return;const t=this.ctx.currentTime;this.master.gain.setTargetAtTime(this.muted?0:this.volume*.7,t,.02),this.music.gain.setTargetAtTime(this.duck?.12:.3,t,.1)}tone(t,e,n,s,r,a=0){const o=this.ctx;if(!o||!this.master||this.muted||this.voices>=kl)return;const l=o.currentTime+a,c=o.createOscillator(),h=o.createGain();c.type=n,c.frequency.setValueAtTime(t,l),r&&c.frequency.exponentialRampToValueAtTime(Math.max(20,r),l+e),h.gain.setValueAtTime(1e-4,l),h.gain.exponentialRampToValueAtTime(s,l+.008),h.gain.exponentialRampToValueAtTime(1e-4,l+e),c.connect(h),h.connect(this.master),this.voices++,c.onended=()=>{this.voices--},c.start(l),c.stop(l+e+.02)}noise(t,e,n,s=0){const r=this.ctx;if(!r||!this.master||!this.noiseBuf||this.muted||this.voices>=kl)return;const a=r.currentTime+s,o=r.createBufferSource();o.buffer=this.noiseBuf;const l=r.createBiquadFilter();l.type="lowpass",l.frequency.setValueAtTime(n,a),l.frequency.exponentialRampToValueAtTime(Math.max(80,n*.2),a+t);const c=r.createGain();c.gain.setValueAtTime(e,a),c.gain.exponentialRampToValueAtTime(1e-4,a+t),o.connect(l),l.connect(c),c.connect(this.master),this.voices++,o.onended=()=>{this.voices--},o.start(a),o.stop(a+t+.02)}gate(t,e){const n=performance.now();return n-(this.last[t]??0)<e?!1:(this.last[t]=n,!0)}handle(t){if(!(!this.ctx||this.muted)){this.wave=t.wave;for(const e of t.events)switch(e.t){case"shot":this.gate("shot",90)&&this.tone(e.a===1?300:620,.07,"sawtooth",.05,e.a===1?160:260);break;case"hit":this.gate("hit",45)&&this.tone(180+Math.random()*40,.04,"square",.04);break;case"kill":this.gate("kill",40)&&this.tone(300+Math.min(900,t.chain*25),.09,"triangle",.07,120);break;case"mote":this.gate("mote",55)&&this.tone(880+Math.random()*200,.05,"sine",.035);break;case"shard":this.tone(1040,.08,"sine",.07),this.tone(1560,.12,"sine",.06,void 0,.07);break;case"chest":for(let n=0;n<4;n++)this.tone(520*Math.pow(1.26,n),.14,"triangle",.08,void 0,n*.06);break;case"hurt":this.noise(.18,.2,1800),this.tone(140,.2,"square",.1,60);break;case"levelup":for(let n=0;n<4;n++)this.tone(440*Math.pow(1.335,n),.22,"triangle",.09,void 0,n*.07);break;case"fieldUp":this.tone(300,.25,"sine",.07,700);break;case"absorb":this.gate("absorb",60)&&this.tone(900,.06,"sine",.05,500);break;case"fieldBreak":this.noise(.3,.16,3e3),this.tone(500,.3,"sawtooth",.07,100);break;case"detonate":this.noise(.6,.35,2600),this.tone(160,.55,"sawtooth",.14,35);break;case"beam":this.gate("beam",100)&&this.tone(1200,.14,"sawtooth",.05,300);break;case"arc":this.gate("arc",100)&&this.noise(.12,.08,6e3);break;case"shieldBlock":this.gate("block",80)&&this.tone(2e3,.04,"square",.03);break;case"telegraph":this.gate("tele",120)&&this.tone(500,.1,"sine",.03,700);break;case"bossWarn":for(let n=0;n<3;n++)this.tone(300,.4,"sawtooth",.08,700,n*.45);break;case"bossPhase":this.tone(120,.7,"sawtooth",.12,400);break;case"bossDown":case"win":for(let n=0;n<6;n++)this.tone(330*Math.pow(1.19,n),.3,"triangle",.09,void 0,n*.09);break;case"dead":this.noise(.8,.3,1400),this.tone(220,.9,"sawtooth",.12,40);break;case"wave":(e.a??1)>1&&this.tone(660,.16,"square",.05,880);break}}}click(){this.tone(700,.05,"square",.05,900)}startMusic(){!this.ctx||this.musicOn||(this.musicOn=!0,this.nextTime=this.ctx.currentTime+.1,this.step=0,this.timer=window.setInterval(()=>this.schedule(),100))}stopMusic(){this.musicOn=!1,this.timer!==null&&window.clearInterval(this.timer),this.timer=null}schedule(){const t=this.ctx;if(!t||!this.music||!this.musicOn)return;const n=60/(118+2*this.wave)/4,s=[55,55,65.4,49][Math.floor(this.step/16)%4];for(;this.nextTime<t.currentTime+.25;){const r=this.step%16,a=this.nextTime;(r%4===0||r===10)&&this.mTone(s*(r===10?1.5:1),n*3,"sawtooth",.22,a,700),r%2===0&&this.mTone(s*4*[1,1.5,1.2,1.8][r/2%4],n*1.5,"square",.05,a,2400),r%2===1&&this.mHat(a),this.nextTime+=n,this.step++}}mTone(t,e,n,s,r,a){const o=this.ctx;if(!o||!this.music)return;const l=o.createOscillator(),c=o.createBiquadFilter(),h=o.createGain();l.type=n,l.frequency.value=t,c.type="lowpass",c.frequency.value=a,h.gain.setValueAtTime(s,r),h.gain.exponentialRampToValueAtTime(1e-4,r+e),l.connect(c),c.connect(h),h.connect(this.music),l.start(r),l.stop(r+e+.02)}mHat(t){const e=this.ctx;if(!e||!this.music||!this.noiseBuf)return;const n=e.createBufferSource();n.buffer=this.noiseBuf;const s=e.createBiquadFilter();s.type="highpass",s.frequency.value=7e3;const r=e.createGain();r.gain.setValueAtTime(.06,t),r.gain.exponentialRampToValueAtTime(1e-4,t+.04),n.connect(s),s.connect(r),r.connect(this.music),n.start(t),n.stop(t+.05)}}function df(i){return{s:i>>>0||2654435769}}function tn(i){i.s=i.s+1831565813>>>0;let t=i.s;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Us(i,t,e){return t+(e-t)*tn(i)}function Ar(i,t){return tn(i)<t}function Cr(i,t,e){let n=0;for(const r of t)n+=Math.max(0,e(r));if(n<=0)return null;let s=tn(i)*n;for(const r of t)if(s-=Math.max(0,e(r)),s<=0)return r;return t[t.length-1]??null}const Vr=[{id:"pulse",name:"Pulse Amp",kind:"weapon",maxLevel:5,weight:7,tags:["weapon","auto-aim"],icon:"P",color:"#F1EDE7",desc:i=>`Pulse Cannon: ${8+2.5*(i-1)} dmg, ${i>=5?3:i>=3?2:1} shot${i>=3?"s":""} per volley.`},{id:"orbit",name:"Orbit Blades",kind:"weapon",maxLevel:5,weight:10,tags:["weapon","melee"],icon:"O",color:"#D3B9B7",desc:i=>`${i+1} blades circle you for ${6+2.5*i} dmg per hit.`},{id:"homing",name:"Seeker Swarm",kind:"weapon",maxLevel:5,weight:9,rare:!0,tags:["weapon","homing"],icon:"H",color:"#E96B74",desc:i=>`Fires ${1+Math.floor((i-1)/2)} homing missile${i>=3?"s":""} for ${11+3*i} dmg.`},{id:"pierce",name:"Lance Beam",kind:"weapon",maxLevel:5,weight:9,rare:!0,tags:["weapon","piercing"],icon:"L",color:"#FFFFFF",desc:i=>`Beam through every enemy in a line: ${16+6*i} dmg${i>=4?", twin beams":""}.`},{id:"chain",name:"Chain Arc",kind:"weapon",maxLevel:5,weight:9,rare:!0,tags:["weapon","lightning"],icon:"C",color:"#EEB9B9",desc:i=>`Lightning jumps ${2+i} times for ${10+3.5*i} dmg, ignores shields.`},{id:"vitality",name:"Vitality",kind:"passive",maxLevel:5,weight:8,defensive:!0,tags:["defense"],icon:"+",color:"#E30016",desc:()=>"+20 max HP and heal 20."},{id:"regen",name:"Regeneration",kind:"passive",maxLevel:5,weight:7,defensive:!0,tags:["defense"],icon:"R",color:"#D3B9B7",desc:i=>`Regenerate ${(.7*i).toFixed(1)} HP per second.`},{id:"swift",name:"Swift Thrusters",kind:"passive",maxLevel:5,weight:7,tags:["mobility"],icon:"S",color:"#F1EDE7",desc:i=>`+${7*i}% move speed.`},{id:"magnet",name:"Magnet Core",kind:"passive",maxLevel:5,weight:6,tags:["economy"],icon:"M",color:"#E96B74",desc:i=>`+${30*i}% pickup radius.`},{id:"overclock",name:"Overclock",kind:"passive",maxLevel:5,weight:8,tags:["cooldown"],icon:"X",color:"#E30016",desc:i=>`Weapons cool down ${Math.round((1-Math.pow(.93,i))*100)}% faster.`},{id:"fortune",name:"Fortune",kind:"passive",maxLevel:5,weight:5,tags:["luck"],icon:"$",color:"#E96B74",desc:i=>`Luck ${(.1*i).toFixed(1)}: rarer cards, more chests and shards.`},{id:"plating",name:"Plating",kind:"passive",maxLevel:4,weight:6,defensive:!0,tags:["defense"],icon:"A",color:"#D3B9B7",desc:i=>`Take ${Math.round((1-Math.pow(.94,i))*100)}% less damage.`},{id:"siphon",name:"Siphon",kind:"signature",maxLevel:3,weight:9,rare:!0,tags:["essence","signature"],icon:"V",color:"#D3B9B7",desc:i=>`Kills fill your Reserve x${[1,1.5,2][i-1]} (cap ${[60,100,150][i-1]}).`},{id:"bulwark",name:"Bulwark Field",kind:"signature",maxLevel:3,weight:9,rare:!0,requires:{siphon:1},tags:["essence","shield","signature"],icon:"B",color:"#F1EDE7",desc:i=>`Reserve becomes a shield ring that eats bullets and burns enemies (+${25*(i-1)}% burn).`},{id:"detonation",name:"Detonation",kind:"signature",maxLevel:3,weight:9,rare:!0,requires:{bulwark:1},tags:["essence","burst","signature"],icon:"D",color:"#E30016",desc:i=>`Field break or release (E) bursts for Reserve spent (+${30*(i-1)}% power).`},{id:"overcharge",name:"Overcharge",kind:"filler",maxLevel:999,weight:1,tags:["damage"],icon:"^",color:"#E96B74",desc:()=>"+4% damage to everything."},{id:"repair",name:"Repair Kit",kind:"filler",maxLevel:999,weight:1,defensive:!0,tags:["heal"],icon:"K",color:"#E30016",desc:()=>"Heal 35% of max HP now."},{id:"cache",name:"Shard Cache",kind:"filler",maxLevel:999,weight:1,tags:["shards"],icon:"*",color:"#E96B74",desc:()=>"Gain 8 Shards immediately."}],Yi=Object.fromEntries(Vr.map(i=>[i.id,i]));function pf(){const i={};for(const t of Vr)i[t.id]=0;return i.pulse=1,i}const Wr=[{id:"seekerLance",name:"Seeker Lance",needs:["homing","pierce"],desc:"Missiles pierce 2 extra enemies; beam damage x1.25."},{id:"leechArc",name:"Leech Arc",needs:["siphon","chain"],desc:"Arc +2 jumps; every arc hit adds 1 Reserve."},{id:"bladedField",name:"Bladed Field",needs:["bulwark","orbit"],desc:"Blades ride the field edge for x1.6 damage; field burns x1.5."},{id:"clusterBurst",name:"Cluster Burst",needs:["detonation","homing"],desc:"Detonations also launch homing shards."},{id:"voidReactor",name:"Void Reactor",needs:["siphon","bulwark","detonation"],desc:"Detonations refund 25% of the Reserve spent."}],mf=4,Lh=["pulse","orbit","homing","pierce","chain"];function Dh(i,t,e){return{maxHp:100+t.hp+20*i.vitality,speed:190*(1+t.speed+.07*i.swift),pickup:70*(1+.3*i.magnet),cdMul:Math.pow(.93,i.overclock),dmgMul:1+.04*e,luck:t.luck+.1*i.fortune,taken:Math.pow(.94,i.plating),regen:.7*i.regen}}function vi(i,t){const e=Wr.find(n=>n.id===t);return!!e&&e.needs.every(n=>i[n]>0)}const gf=[0,60,100,150],vf=[0,1,1.5,2];function Xr(i){return gf[Math.min(3,i.siphon)]??0}function xf(i,t,e){if(i.siphon<=0)return 0;const n=1+Math.min(.3,.01*e);return t*vf[Math.min(3,i.siphon)]*n}function Bl(i,t){return Math.min(150,44+.5*i*(1+.2*(t-1)))}function _f(i){return 1.2+.012*i}function yf(i){return 3+.3*i}function Mf(i,t,e){return(5+.1*i)*(1+.25*(t-1))*(e?1.5:1)}const Ih=8;function Sf(i,t,e){return(10+1.5*i)*(1+.3*(t-1))*e}function bf(i){return Math.min(340,80+2.4*i)}function Ef(i){let t=0;for(const e of Lh)i[e]>0&&t++;return t}function Tf(i,t){const e=t.levels;if(e[i.id]>=i.maxLevel)return!1;if(i.kind==="filler")return!0;if(!t.unlocked.has(i.id))return!1;if(i.requires){for(const n of Object.keys(i.requires))if(e[n]<(i.requires[n]??0))return!1}return!(i.kind==="weapon"&&e[i.id]===0&&Ef(e)>=mf)}function wf(i,t){return t[i.id]>0?!1:Wr.some(e=>e.needs.includes(i.id)&&e.needs.every(n=>n===i.id||t[n]>0))}function ra(i,t){const e=t.levels;let n=i.weight;return e[i.id]>0&&i.kind!=="filler"&&(n*=1.5),i.rare&&(n*=1+t.luck*(t.chest?3:1)),i.id==="bulwark"&&e.siphon>0&&e.bulwark===0&&(n*=2.5),i.id==="detonation"&&e.bulwark>0&&e.detonation===0&&(n*=2.5),wf(i,e)&&(n*=2),i.id==="repair"&&(n=t.hpFrac<.6?6*(1-t.hpFrac):.4),i.kind==="filler"&&i.id!=="repair"&&(n=.4),t.chest&&i.kind!=="filler"&&(n*=i.rare?2:1),n}function Af(i,t){const e=Vr.filter(c=>Tf(c,i)),n=e.filter(c=>!i.exclude.includes(c.id)),s=n.filter(c=>c.kind!=="filler").length>=3?n:e,r=[],a=c=>{c&&!r.includes(c)&&r.push(c)};if(!Lh.some(c=>c!=="pulse"&&i.levels[c]>0)&&i.levelUps<3){const c=s.filter(h=>h.kind==="weapon"&&h.id!=="pulse"&&i.levels[h.id]===0);a(Cr(t,c,h=>ra(h,i)))}if(i.hpFrac<.5||i.sinceDefensive>=4){const c=s.filter(h=>h.defensive&&!r.includes(h));a(Cr(t,c,h=>h.id==="repair"?.5:ra(h,i)))}let l=0;for(;r.length<3&&l++<40;){const c=s.filter(h=>!r.includes(h));if(a(Cr(t,c,h=>ra(h,i))),c.length===0)break}for(const c of["overcharge","repair","cache"]){if(r.length>=3)break;a(Yi[c])}return r.slice(0,3).map(c=>c.id)}function Cf(i,t){if(!Yi[i]||t[i]>0)return null;const n=Wr.find(s=>s.needs.includes(i)&&s.needs.every(r=>r===i||t[r]>0));return n?`Synergy: ${n.name}`:null}class Js{constructor(t){$(this,"list",[]);$(this,"free",[]);$(this,"make");this.make=t}acquire(){const t=this.free.pop()??this.make();return this.list.push(t),t}removeAt(t){const e=this.list.length-1,n=this.list[t];this.list[t]=this.list[e],this.list.pop(),this.free.push(n)}clear(){for(const t of this.list)this.free.push(t);this.list.length=0}get count(){return this.list.length}}const Rf=96,Pf=1632,wi=34;class Lf{constructor(){$(this,"cells",[]);$(this,"used",[]);for(let t=0;t<wi*wi;t++)this.cells.push([])}idx(t){const e=Math.floor((t+Pf)/Rf);return e<0?0:e>=wi?wi-1:e}rebuild(t){for(const e of this.used)this.cells[e].length=0;this.used.length=0;for(const e of t){if(!e.alive)continue;const n=this.idx(e.y)*wi+this.idx(e.x),s=this.cells[n];s.length===0&&this.used.push(n),s.push(e)}}query(t,e,n,s){s.length=0;const r=n+52,a=this.idx(t-r),o=this.idx(t+r),l=this.idx(e-r),c=this.idx(e+r);for(let h=l;h<=c;h++)for(let u=a;u<=o;u++){const f=this.cells[h*wi+u];for(let d=0;d<f.length;d++)s.push(f[d])}return s}}const Df=1200,Uh=160,If=120,Uf=160,Nf=140,zl=300,Hl=60,Ee=1200,Sn=1300;function jt(i,t){i.events.length<600&&i.events.push(t)}function Ff(i){return Math.min(20,Math.floor(i/60)+1)}function Gl(i){const t=i-1;return 1+.16*t+.004*t*t}function Ns(i){return 1+.03*(i-1)}function Jo(i){return 1+.012*(i-1)}function Nh(i){return 5+4*i+Math.floor(.45*i*i)}function qr(i,t,e){if(i==="foundry"){const n=Sn-e,s=Math.hypot(t.x,t.y);s>n&&(t.x*=n/s,t.y*=n/s)}else{const n=Ee-e;t.x>n?t.x=n:t.x<-n&&(t.x=-n),t.y>n?t.y=n:t.y<-n&&(t.y=-n)}}function Of(i,t,e){return i==="foundry"?Math.hypot(t,e)>Sn+40:Math.abs(t)>Ee+40||Math.abs(e)>Ee+40}function Ja(i,t,e,n,s,r,a){if(i.eBullets>=Uf)return null;const o=i.bullets.acquire();return o.alive=!0,o.friendly=!1,o.x=t,o.y=e,o.vx=Math.cos(n)*s,o.vy=Math.sin(n)*s,o.r=a?7:5,o.dmg=r,o.life=4,o.kind=a?1:0,o.pierce=0,o.homing=!1,o.turn=0,o.hits.length=0,i.eBullets++,o}function ja(i,t,e,n,s,r,a,o,l,c){if(i.pBullets>=Nf)return null;const h=i.bullets.acquire();return h.alive=!0,h.friendly=!0,h.x=t,h.y=e,h.vx=Math.cos(n)*s,h.vy=Math.sin(n)*s,h.r=o===1?6:o===2?4:5,h.dmg=r,h.life=a,h.kind=o,h.pierce=l,h.homing=c,h.turn=4,h.hits.length=0,i.pBullets++,h}function Qa(i,t){const e=i.hazards.acquire();return e.alive=!0,e.kind=t.kind,e.x=t.x,e.y=t.y,e.x2=t.x2??t.x,e.y2=t.y2??t.y,e.r=t.r??44,e.width=t.width??40,e.t=0,e.tele=t.tele??1,e.life=t.life??6,e.dps=t.dps??14,e.tick=0,e.hit=!1,e}function Fh(i,t,e,n,s){n?Qa(i,{kind:"lane",x:t,y:e-1500,x2:t,y2:e+1500,width:44,tele:1.2,dps:s}):Qa(i,{kind:"lane",x:t-1500,y:e,x2:t+1500,y2:e,width:44,tele:1.2,dps:s}),jt(i,{t:"lane",x:t,y:e})}function Vn(i,t,e,n,s,r=18){if(t==="mote"&&i.pickups.list.length>=zl+Hl+6){i.pendingXp+=s;return}if(t==="shard"&&i.pickups.list.length>=zl+Hl+6){i.shardsCollected+=1;return}const a=i.pickups.acquire();a.alive=!0,a.kind=t;const o=tn(i.rng)*Math.PI*2,l=tn(i.rng)*r;a.x=e+Math.cos(o)*l,a.y=n+Math.sin(o)*l,a.vx=Math.cos(o)*l*3,a.vy=Math.sin(o)*l*3,a.v=s,a.t=0,a.pulled=!1}const xi={swarm:{kind:"swarm",name:"Drifter",hp:6,speed:78,r:9,dmg:6,xp:1,ess:1,shard:.004,color:"#E30016"},spitter:{kind:"spitter",name:"Spitter",hp:14,speed:60,r:11,dmg:6,xp:3,ess:2,shard:.02,color:"#EEB9B9"},rammer:{kind:"rammer",name:"Rammer",hp:24,speed:70,r:13,dmg:12,xp:4,ess:3,shard:.025,color:"#C9061A"},cleaver:{kind:"cleaver",name:"Cleaver",hp:36,speed:52,r:16,dmg:9,xp:4,ess:3,shard:.025,color:"#E30016"},splitlet:{kind:"splitlet",name:"Splitlet",hp:5,speed:120,r:7,dmg:4,xp:1,ess:0,shard:0,color:"#AB0B1A"},aegis:{kind:"aegis",name:"Aegis",hp:44,speed:58,r:14,dmg:10,xp:7,ess:5,shard:.05,color:"#D3B9B7"},caster:{kind:"caster",name:"Voidcaster",hp:30,speed:50,r:12,dmg:8,xp:7,ess:5,shard:.05,color:"#AB0B1A"},warden:{kind:"warden",name:"Core Warden",hp:700,speed:45,r:40,dmg:14,xp:60,ess:40,shard:1,color:"#E30016"}};function Oh(i){return i.bossAlive?If:Uh}function kf(){return{id:0,alive:!1,kind:"swarm",x:0,y:0,vx:0,vy:0,r:9,hp:1,maxHp:1,speed:1,dmg:1,xp:1,ess:1,t:0,state:0,timer:0,act:0,ang:0,shield:0,shieldDir:1,tx:0,ty:0,elite:!1,tier:0,phase:0,flash:0,bladeCd:0,seed:0,noEss:!1,kx:0,ky:0}}function Vs(i,t,e,n,s=!1,r=0){const a=xi[t],o=i.enemies.acquire(),l=t==="warden"?1:Gl(i.wave),c=s?3.5:1;return o.id=++i.nextId,o.alive=!0,o.kind=t,o.x=e,o.y=n,o.vx=0,o.vy=0,o.kx=0,o.ky=0,o.r=a.r*(s?1.35:1),o.hp=o.maxHp=t==="warden"?700*(1+.9*(r-1))*Gl(i.wave):a.hp*l*c,o.speed=a.speed*Jo(i.wave),o.dmg=a.dmg*Ns(i.wave)*(s?1.3:1),o.xp=a.xp*(s?3:1)*(t==="warden"?r:1),o.ess=a.ess*(s?3:1)*(t==="warden"?r:1),o.t=0,o.state=0,o.timer=t==="warden"?2.2:Us(i.rng,.6,2.2),o.act=0,o.ang=0,o.shield=tn(i.rng)*Math.PI*2,o.shieldDir=tn(i.rng)<.5?1:-1,o.tx=0,o.ty=0,o.elite=s,o.tier=r,o.phase=0,o.flash=0,o.bladeCd=0,o.seed=tn(i.rng)*6.28,o.noEss=t==="splitlet",o}function jo(i,t=560,e=640,n){const s=n??tn(i.rng)*Math.PI*2,r=Us(i.rng,t,e),a={x:i.player.x+Math.cos(s)*r,y:i.player.y+Math.sin(s)*r};return qr(i.arena,a,20),a}function Je(i,t,e,n){i.vx=t*n,i.vy=e*n}function Bf(i,t,e){const n=i.player;t.t+=e,t.flash>0&&(t.flash-=e),t.bladeCd>0&&(t.bladeCd-=e);const s=n.x-t.x,r=n.y-t.y,a=Math.hypot(s,r)||1,o=s/a,l=r/a;switch(t.kind){case"swarm":case"splitlet":{const h=Math.sin(t.t*3+t.seed)*.35;Je(t,o-l*h,l+o*h,t.speed);break}case"cleaver":Je(t,o,l,t.speed);break;case"aegis":t.shield+=t.shieldDir*1.4*e,Je(t,o,l,t.speed);break;case"spitter":{if(t.state===0){const h=t.seed>3.14?1:-1;a>300?Je(t,o,l,t.speed):a<240?Je(t,-o,-l,t.speed):Je(t,-l*h,o*h,t.speed*.6),t.timer-=e,t.timer<=0&&a<520&&(t.state=1,t.timer=.7,t.ang=Math.atan2(r,s),jt(i,{t:"telegraph",x:t.x,y:t.y}))}else t.vx=t.vy=0,t.timer>.25&&(t.ang=Math.atan2(r,s)),t.timer-=e,t.timer<=0&&(Ja(i,t.x,t.y,t.ang,230,8*Ns(i.wave),!1),t.state=0,t.timer=2.8+tn(i.rng)*.6);break}case"rammer":{if(t.state===0)Je(t,o,l,t.speed),t.timer-=e,t.timer<=0&&a<340&&(t.state=1,t.timer=.8,t.ang=Math.atan2(r,s),jt(i,{t:"telegraph",x:t.x,y:t.y}));else if(t.state===1)t.vx=t.vy=0,t.timer>.3&&(t.ang=Math.atan2(r,s)),t.timer-=e,t.timer<=0&&(t.state=2,t.timer=.55);else if(t.state===2){const h=480*Jo(i.wave);t.vx=Math.cos(t.ang)*h,t.vy=Math.sin(t.ang)*h,t.timer-=e,t.timer<=0&&(t.state=3,t.timer=.9)}else t.vx=t.vy=0,t.timer-=e,t.timer<=0&&(t.state=0,t.timer=1.5);break}case"caster":{t.state===0?(a>340?Je(t,o,l,t.speed):a<290?Je(t,-o,-l,t.speed):Je(t,-l,o,t.speed*.5),t.timer-=e,t.timer<=0&&a<600&&(t.state=1,t.timer=.5,t.tx=n.x,t.ty=n.y,jt(i,{t:"telegraph",x:t.x,y:t.y}))):(t.vx=t.vy=0,t.timer-=e,t.timer<=0&&(Qa(i,{kind:"pool",x:t.tx,y:t.ty,r:44,tele:1,life:6,dps:14*Ns(i.wave)}),jt(i,{t:"pool",x:t.tx,y:t.ty}),t.state=0,t.timer=5.5));break}case"warden":zf(i,t,e,o,l,a);break}t.x+=(t.vx+t.kx)*e,t.y+=(t.vy+t.ky)*e;const c=Math.max(0,1-6*e);t.kx*=c,t.ky*=c,qr(i.arena,t,t.r)}function zf(i,t,e,n,s,r){const a=i.player;t.phase===0&&t.hp<=t.maxHp*.5&&(t.phase=1,jt(i,{t:"bossPhase",x:t.x,y:t.y}));const o=t.phase===1,l=(14+2*t.tier)*Ns(i.wave);if(t.state===0){const c=t.speed*(o?1.3:1);if(r>230?Je(t,n,s,c):r<150?Je(t,-n,-s,c):Je(t,-s,n,c*.5),t.timer-=e,t.timer<=0){const h=o?4:3;t.tx=t.act%h,t.act++,t.state=1,t.timer=.8,t.ang=Math.atan2(a.y-t.y,a.x-t.x),jt(i,{t:"telegraph",x:t.x,y:t.y})}}else if(t.state===1){if(t.vx=t.vy=0,t.tx===3&&t.timer>.3&&(t.ang=Math.atan2(a.y-t.y,a.x-t.x)),t.timer-=e,t.timer<=0){const c=t.tx;if(t.state=0,t.timer=o?2.3:3.2,c===0){const h=10+2*t.tier,u=t.t;for(let f=0;f<h;f++)Ja(i,t.x,t.y,u+f/h*Math.PI*2,170,l*.6,!0);if(o)for(let f=0;f<h;f++)Ja(i,t.x,t.y,-u+(f+.5)/h*Math.PI*2,130,l*.6,!0)}else if(c===1){const h=o?3:2;for(let u=0;u<h;u++){const f=u%2===0,d=u===0?0:Us(i.rng,-160,160);Fh(i,a.x+(f?d:0),a.y+(f?0:d),f,(18+2*t.tier)*Ns(i.wave))}}else if(c===2){const h=(o?6:4)+t.tier;for(let u=0;u<h&&!(i.enemies.count>=Uh);u++){const f=u/h*Math.PI*2,d=Vs(i,"swarm",t.x+Math.cos(f)*60,t.y+Math.sin(f)*60);qr(i.arena,d,d.r)}}else t.state=2,t.timer=.6}}else t.vx=Math.cos(t.ang)*520,t.vy=Math.sin(t.ang)*520,t.timer-=e,t.timer<=0&&(t.state=0,t.timer=1.5)}const Vl=["swarm","spitter","rammer","cleaver","aegis","caster"],Wl={swarm:1,spitter:3,rammer:4,cleaver:4,aegis:6,caster:6},Hf={swarm:1,spitter:2,rammer:3,cleaver:4,aegis:6,caster:8},Xl=[300,600,900,1140];function Gf(i){return 2.4+.8*(i-1)}const kh=[7,3,3,3,3,2],ql=[5,4,4,4,4,3],Vf=[[10,0,0,0,0,0],[10,2,0,0,0,0],[10,3,2,0,0,0],[9,3,3,2,0,0],[9,3,3,3,0,0],[8,3,3,3,2,0],[8,3,3,3,3,0],kh];function Wf(i){if(i<=8)return Vf[i-1];if(i>=14)return ql;const t=(i-8)/6;return kh.map((e,n)=>e+(ql[n]-e)*t)}function Xf(){return"warden"}function qf(i){const e=i.bossesSpawned+1,n=jo(i,380,440),s=Vs(i,Xf(),n.x,n.y,!1,e);s.timer=2.4,i.bossesSpawned++,i.bossAlive=!0,jt(i,{t:"bossWarn",x:s.x,y:s.y,a:e,s:e===4?"FINAL WARDEN":"CORE WARDEN"})}function Yf(i,t){const e=tn(i.rng)*Math.PI*2,n=5+t;for(let s=0;s<n&&!(i.enemies.count>=Oh(i));s++){const r=e+(s/n-.5)*(Math.PI/2),a=jo(i,580,640,r);Vs(i,"swarm",a.x,a.y)}}function $f(i,t){const e=Ff(i.time);i.wave=e,e>i.packWave&&(i.packWave=e,jt(i,{t:"wave",x:0,y:0,a:e}),Yf(i,e)),i.bossesSpawned<Xl.length&&i.time>=Xl[i.bossesSpawned]&&qf(i),i.budget=Math.min(30,i.budget+Gf(e)*t*(i.bossAlive?.5:1));const n=Wf(e),s=Oh(i);for(let r=0;r<6;r++){if(i.enemies.count>=s){i.budget=Math.min(i.budget,12);break}const a=Cr(i.rng,Vl,c=>{const h=Vl.indexOf(c);return Wl[c]<=i.budget&&e>=Hf[c]?n[h]:0});if(!a)break;const o=jo(i),l=e>=5&&Ar(i.rng,.03+.005*(e-5));Vs(i,a,o.x,o.y,l),i.budget-=Wl[a]*(l?2:1)}}const Or=1/60,Zf=12;function Bh(){return{unlocked:["pulse","orbit","vitality","regen","swift","magnet","overclock","fortune","plating","siphon","bulwark","detonation"],hp:0,speed:0,luck:0,rerolls:1,startSiphon:!1,arena:"hollow"}}function zh(){return{mx:0,my:0,aimX:0,aimY:0,hasAim:!1,release:!1,toggleHold:!1}}function Hh(i,t=Bh()){const e=pf();t.startSiphon&&(e.siphon=1);const n=Dh(e,t,0),s=t.arena;return{seed:i,rng:df(i),arena:s,tick:0,time:0,state:"playing",player:{x:0,y:0,vx:0,vy:0,r:Zf,hp:n.maxHp,maxHp:n.maxHp,iframes:0,flash:0,facing:0,level:1,xp:0,xpNext:Nh(1),reserve:0,fieldOn:!1,fieldR:0,fieldSpent:0,fieldTick:0,hold:!1,detCd:0,pulseCd:.3,homingCd:1,lanceCd:1,chainCd:1,orbitAngle:0,regenAcc:0,kvx:0,kvy:0},stats:n,levels:e,meta:t,enemies:new Js(kf),bullets:new Js(()=>({alive:!1,friendly:!1,x:0,y:0,vx:0,vy:0,r:5,dmg:1,life:1,kind:0,pierce:0,homing:!1,turn:0,hits:[]})),hazards:new Js(()=>({alive:!1,kind:"pool",x:0,y:0,x2:0,y2:0,r:40,width:40,t:0,tele:1,life:1,dps:1,tick:0,hit:!1})),pickups:new Js(()=>({alive:!1,kind:"mote",x:0,y:0,vx:0,vy:0,v:1,t:0,pulled:!1})),grid:new Lf,events:[],nextId:0,budget:0,wave:1,packWave:0,bossesSpawned:0,bossAlive:!1,laneTimer:10,pendingLevels:0,pendingChests:0,choice:null,rerolls:t.rerolls,picks:[],sinceDefensive:0,levelUps:0,kills:0,killsBy:{},damageDealt:0,shardsCollected:0,bossesKilled:0,chain:0,chainTimer:0,maxChain:0,detonations:0,deathTimer:0,winReason:"",scratch:[],eBullets:0,pBullets:0,pendingXp:0}}function Ji(i,t,e,n,s){let r=null,a=n*n;for(const o of i.enemies.list){if(!o.alive||s&&s.includes(o.id))continue;const l=(o.x-t)*(o.x-t)+(o.y-e)*(o.y-e);l<a&&(a=l,r=o)}return r}function Kf(i,t){let e=i-t;for(;e>Math.PI;)e-=Math.PI*2;for(;e<-Math.PI;)e+=Math.PI*2;return Math.abs(e)}function Gh(i,t,e){return i.kind!=="aegis"?!1:Kf(i.shield,Math.atan2(e-i.y,t-i.x))<50*Math.PI/180}function Qo(i,t){const e=Xr(i.levels);i.player.reserve=Math.min(e,i.player.reserve+t)}function tl(i,t,e,n){const s=i.player;if(s.iframes>0||i.state!=="playing")return!1;const r=t*i.stats.taken;s.hp-=r,s.iframes=.7,s.flash=.25;const a=Math.hypot(s.x-e,s.y-n)||1;return s.kvx+=(s.x-e)/a*160,s.kvy+=(s.y-n)/a*160,jt(i,{t:"hurt",x:s.x,y:s.y,a:r}),s.hp<=0&&(s.hp=0,i.state="dead",i.deathTimer=0,jt(i,{t:"dead",x:s.x,y:s.y})),!0}function Jf(i,t){const e=i.player;i.state==="playing"&&(e.hp-=t*i.stats.taken,e.flash=Math.max(e.flash,.1),jt(i,{t:"hurt",x:e.x,y:e.y,a:t*i.stats.taken,b:1}),e.hp<=0&&(e.hp=0,i.state="dead",jt(i,{t:"dead",x:e.x,y:e.y})))}function as(i,t,e,n=t.x,s=t.y){if(!t.alive||e<=0)return!1;const r=Math.min(e,t.hp);return i.damageDealt+=r,t.hp-=e,t.flash=.09,jt(i,{t:"hit",x:n,y:s,a:e,s:t.kind}),t.hp<=0?(jf(i,t),!0):!1}function Vh(i,t){const e=i.player;for(e.xp+=t;e.xp>=e.xpNext&&e.level<40;)e.xp-=e.xpNext,e.level++,e.xpNext=Nh(e.level),i.pendingLevels++,jt(i,{t:"levelup",x:e.x,y:e.y,a:e.level});e.level>=40&&(e.xp=Math.min(e.xp,e.xpNext-1))}function jf(i,t){t.alive=!1,i.kills++,i.killsBy[t.kind]=(i.killsBy[t.kind]??0)+1,i.chain++,i.chainTimer=1.5,i.chain>i.maxChain&&(i.maxChain=i.chain),i.chain%10===0&&jt(i,{t:"chain",x:i.player.x,y:i.player.y,a:i.chain});const e=i.stats.luck,n=xi[t.kind];if(jt(i,{t:"kill",x:t.x,y:t.y,a:t.r,b:t.elite?1:0,s:t.kind}),t.noEss||Qo(i,xf(i.levels,t.ess,i.chain)),Vn(i,"mote",t.x,t.y,t.xp),t.kind==="warden"){i.bossesKilled++,i.bossAlive=!1,jt(i,{t:"bossDown",x:t.x,y:t.y,a:t.tier});for(let a=0;a<6;a++)Vn(i,"mote",t.x,t.y,t.xp/6,60);for(let a=0;a<15*t.tier;a++)Vn(i,"shard",t.x,t.y,1,70);Vn(i,"chest",t.x,t.y,1,20);for(const a of i.enemies.list)a.alive&&a.kind!=="warden"&&a.t<8&&a.kind==="swarm"&&(a.alive=!1,i.kills++,i.killsBy.swarm=(i.killsBy.swarm??0)+1,Vn(i,"mote",a.x,a.y,a.xp),jt(i,{t:"kill",x:a.x,y:a.y,a:a.r,b:0,s:"swarm"}));t.tier>=4&&(i.state="won",i.winReason="Final Warden destroyed",jt(i,{t:"win",x:t.x,y:t.y}));return}if(t.kind==="cleaver")for(let a=0;a<2&&!(i.enemies.count>=160);a++){const o=tn(i.rng)*Math.PI*2,l=Vs(i,"splitlet",t.x+Math.cos(o)*10,t.y+Math.sin(o)*10);l.kx=Math.cos(o)*160,l.ky=Math.sin(o)*160}const s=t.elite?1:n.shard*(1+e);Ar(i.rng,s)&&Vn(i,"shard",t.x,t.y,1),t.elite&&Ar(i.rng,.5)&&Vn(i,"shard",t.x,t.y,1);const r=t.elite?.08:.0035*(1+e);Ar(i.rng,r)&&Vn(i,"chest",t.x,t.y,1)}function aa(i,t,e){const n=i.player;if(t.hasAim)return{x:t.aimX,y:t.aimY,e:Ji(i,t.aimX,t.aimY,120)};const s=Ji(i,n.x,n.y,e);return s?{x:s.x,y:s.y,e:s}:null}function Qf(i,t,e){const n=i.player,s=i.levels,r=i.stats.cdMul,a=i.stats.dmgMul;if(n.pulseCd-=e,n.homingCd-=e,n.lanceCd-=e,n.chainCd-=e,n.pulseCd<=0){const o=aa(i,t,560);if(o){const l=Math.atan2(o.y-n.y,o.x-n.x),c=s.pulse>=5?3:s.pulse>=3?2:1,h=(8+2.5*(s.pulse-1))*a;for(let u=0;u<c;u++)ja(i,n.x+Math.cos(l)*14,n.y+Math.sin(l)*14,l+(u-(c-1)/2)*.14,520,h,1.1,0,0,!1);n.facing=l,jt(i,{t:"shot",x:n.x,y:n.y,a:0}),n.pulseCd=.55*r}else n.pulseCd=.1}if(s.homing>0&&n.homingCd<=0){const o=aa(i,t,560);if(o){const l=1+Math.floor((s.homing-1)/2),c=(11+3*s.homing)*a,h=vi(s,"seekerLance")?2:0,u=Math.atan2(o.y-n.y,o.x-n.x);for(let f=0;f<l;f++)ja(i,n.x,n.y,u+(f-(l-1)/2)*.7+(l===1?.5:0),300,c,2.5,1,h,!0);jt(i,{t:"shot",x:n.x,y:n.y,a:1}),n.homingCd=1.6*r}else n.homingCd=.2}if(s.pierce>0&&n.lanceCd<=0){const o=aa(i,t,520);if(o){const l=Math.atan2(o.y-n.y,o.x-n.x),c=s.pierce>=4?2:1,h=(16+6*s.pierce)*a*(vi(s,"seekerLance")?1.25:1);for(let u=0;u<c;u++)td(i,l+(c===2?u===0?-.12:.12:0),h);n.lanceCd=2*r}else n.lanceCd=.2}if(s.chain>0&&n.chainCd<=0){const o=t.hasAim?Ji(i,t.aimX,t.aimY,160):Ji(i,n.x,n.y,400);o?(ed(i,o),n.chainCd=1.7*r):n.chainCd=.2}}function td(i,t,e){const n=i.player,s=520,r=Math.cos(t),a=Math.sin(t);for(const o of i.enemies.list){if(!o.alive)continue;const l=o.x-n.x,c=o.y-n.y,h=l*r+c*a;if(h<0||h>s+o.r)continue;Math.abs(l*-a+c*r)<=9+o.r&&as(i,o,e)}jt(i,{t:"beam",x:n.x,y:n.y,a:n.x+r*s,b:n.y+a*s})}function ed(i,t){const e=i.player,n=i.levels,s=vi(n,"leechArc"),r=2+n.chain+(s?2:0),a=(10+3.5*n.chain)*i.stats.dmgMul,o=[],l=[e.x,e.y];let c=t;for(let h=0;h<=r&&c;h++){const u=c;l.push(u.x,u.y),o.push(u.id);const f=u.x,d=u.y;as(i,u,a*Math.pow(.85,h)),s&&Qo(i,1),c=Ji(i,f,d,150,o)}jt(i,{t:"arc",x:e.x,y:e.y,pts:l})}function nd(i,t){const e=i.player,n=i.levels;if(n.orbit<=0)return;e.orbitAngle+=3.2*t;const s=n.orbit+1,r=vi(n,"bladedField")&&e.fieldOn,a=r?e.fieldR+10:64,o=(6+2.5*n.orbit)*i.stats.dmgMul*(r?1.6:1),l=i.scratch;for(let c=0;c<s;c++){const h=e.orbitAngle+c/s*Math.PI*2,u=e.x+Math.cos(h)*a,f=e.y+Math.sin(h)*a;i.grid.query(u,f,14,l);for(const d of l)if(!(!d.alive||d.bladeCd>0)&&!(Math.hypot(d.x-u,d.y-f)>d.r+10)){if(Gh(d,u,f)){jt(i,{t:"shieldBlock",x:u,y:f}),d.bladeCd=.2;continue}d.bladeCd=.35,as(i,d,o,u,f)}}}function id(i,t){const e=i.player,n=i.scratch,s=i.bullets.list;i.eBullets=0,i.pBullets=0;for(let r=s.length-1;r>=0;r--){const a=s[r];if(!a.alive){i.bullets.removeAt(r);continue}if(a.life-=t,a.life<=0||Of(i.arena,a.x,a.y)){a.alive=!1,i.bullets.removeAt(r);continue}if(a.friendly){if(a.homing){const l=Ji(i,a.x,a.y,420,a.hits);if(l){const c=Math.atan2(a.vy,a.vx);let u=Math.atan2(l.y-a.y,l.x-a.x)-c;for(;u>Math.PI;)u-=Math.PI*2;for(;u<-Math.PI;)u+=Math.PI*2;const f=Math.max(-a.turn*t,Math.min(a.turn*t,u)),d=Math.hypot(a.vx,a.vy);a.vx=Math.cos(c+f)*d,a.vy=Math.sin(c+f)*d}}a.x+=a.vx*t,a.y+=a.vy*t,i.grid.query(a.x,a.y,a.r,n);let o=!1;for(const l of n)if(!(!l.alive||a.hits.includes(l.id))&&!(Math.hypot(l.x-a.x,l.y-a.y)>l.r+a.r)){if(Gh(l,a.x,a.y)){jt(i,{t:"shieldBlock",x:a.x,y:a.y}),o=!0;break}if(as(i,l,a.dmg,a.x,a.y),a.pierce>0)a.pierce--,a.hits.push(l.id),a.hits.length>8&&a.hits.shift();else{o=!0;break}}if(o){a.alive=!1,i.bullets.removeAt(r);continue}i.pBullets++}else{a.x+=a.vx*t,a.y+=a.vy*t;let o=!1;if(e.fieldOn&&Math.hypot(a.x-e.x,a.y-e.y)<e.fieldR+a.r){const c=yf(a.dmg);e.reserve-=c,e.fieldSpent+=c,jt(i,{t:"absorb",x:a.x,y:a.y}),o=!0}if(o||Math.hypot(a.x-e.x,a.y-e.y)<a.r+e.r*.8&&e.iframes<=0&&(tl(i,a.dmg,a.x-a.vx,a.y-a.vy),o=!0),o){a.alive=!1,i.bullets.removeAt(r);continue}i.eBullets++}}}function Yl(i,t){const e=i.levels,n=i.player;if(t<Ih||e.detonation<=0)return;const s=Sf(t,e.detonation,i.stats.dmgMul),r=bf(t);for(const a of i.enemies.list){if(!a.alive)continue;const o=Math.hypot(a.x-n.x,a.y-n.y);if(o<=r+a.r){const l=o||1;a.kx+=(a.x-n.x)/l*220,a.ky+=(a.y-n.y)/l*220,as(i,a,s)}}for(const a of i.bullets.list)a.alive&&!a.friendly&&Math.hypot(a.x-n.x,a.y-n.y)<=r&&(a.alive=!1);if(vi(e,"clusterBurst")){const a=4+2*e.detonation;for(let o=0;o<a;o++)ja(i,n.x,n.y,o/a*Math.PI*2,260,s*.25,2,2,0,!0)}vi(e,"voidReactor")&&Qo(i,t*.25),i.detonations++,jt(i,{t:"detonate",x:n.x,y:n.y,a:r,b:s})}function sd(i,t,e){const n=i.player,s=i.levels;n.detCd=Math.max(0,n.detCd-e);const r=Xr(i.levels);if(s.siphon<=0){n.reserve=0,n.fieldOn=!1;return}if(n.reserve>r&&(n.reserve=r),t.toggleHold&&s.bulwark>0&&(n.hold=!n.hold),t.release&&n.detCd<=0&&s.detonation>0){const l=n.fieldSpent+n.reserve;l>=Ih&&(n.reserve=0,n.fieldOn=!1,n.fieldSpent=0,n.detCd=1,Yl(i,l))}if(s.bulwark<=0)return;if(!n.fieldOn){!n.hold&&n.reserve>=.15*r&&(n.fieldOn=!0,n.fieldR=Bl(n.reserve,s.bulwark),jt(i,{t:"fieldUp",x:n.x,y:n.y}));return}if(n.hold){n.fieldOn=!1;return}const a=Bl(n.reserve,s.bulwark);n.fieldR=a;const o=_f(a)*e;if(n.reserve-=o,n.fieldSpent=Math.min(400,n.fieldSpent+o),n.fieldTick-=e,n.fieldTick<=0){n.fieldTick=.25;const l=vi(s,"bladedField"),c=Mf(n.reserve,s.bulwark,l)*i.stats.dmgMul,h=i.scratch;i.grid.query(n.x,n.y,a,h);for(const u of h){if(!u.alive)continue;const f=Math.hypot(u.x-n.x,u.y-n.y);if(f<a+u.r){const d=f||1;u.kx+=(u.x-n.x)/d*140,u.ky+=(u.y-n.y)/d*140,as(i,u,c)}}}if(n.reserve<=0){n.reserve=0,n.fieldOn=!1,jt(i,{t:"fieldBreak",x:n.x,y:n.y,a});const l=n.fieldSpent;n.fieldSpent=0,Yl(i,l)}}function rd(i,t,e,n,s,r){const a=s-e,o=r-n,l=a*a+o*o||1;let c=((i-e)*a+(t-n)*o)/l;return c=Math.max(0,Math.min(1,c)),Math.hypot(i-(e+c*a),t-(n+c*o))}function ad(i,t){const e=i.player,n=i.hazards.list;for(let s=n.length-1;s>=0;s--){const r=n[s];if(r.t+=t,r.kind==="pool"){const a=r.t-r.tele;if(a>=r.life){i.hazards.removeAt(s);continue}a>=0&&(r.r=44+34*Math.min(1,a/r.life),r.tick-=t,r.tick<=0&&(r.tick=.25,Math.hypot(e.x-r.x,e.y-r.y)<r.r+e.r*.5&&Jf(i,r.dps*.25)))}else{if(r.t>r.tele+.35){i.hazards.removeAt(s);continue}r.t>=r.tele&&!r.hit&&rd(e.x,e.y,r.x,r.y,r.x2,r.y2)<r.width/2+e.r*.8&&tl(i,r.dps,e.x-1,e.y)&&(r.hit=!0)}}}function od(i,t){const e=i.player,n=i.pickups.list,s=i.stats.pickup;for(let r=n.length-1;r>=0;r--){const a=n[r];a.t+=t;const o=e.x-a.x,l=e.y-a.y,c=Math.hypot(o,l)||1;if(!a.pulled&&c<s&&(a.pulled=!0),a.pulled){const h=320+(a.t>2?100:0);a.x+=o/c*h*t,a.y+=l/c*h*t}else a.x+=a.vx*t,a.y+=a.vy*t,a.vx*=.9,a.vy*=.9;c<e.r+8&&(a.kind==="mote"?(Vh(i,a.v),jt(i,{t:"mote",x:a.x,y:a.y})):a.kind==="shard"?(i.shardsCollected+=a.v,jt(i,{t:"shard",x:a.x,y:a.y})):(i.pendingChests++,i.shardsCollected+=10,jt(i,{t:"chest",x:a.x,y:a.y})),i.pickups.removeAt(r))}}function el(i,t=[]){const e=i.pendingLevels<=0&&i.pendingChests>0,n=Af({levels:i.levels,hpFrac:i.player.hp/i.player.maxHp,luck:i.stats.luck,unlocked:new Set(i.meta.unlocked),levelUps:i.levelUps,sinceDefensive:i.sinceDefensive,chest:e,exclude:t},i.rng);i.choice={ids:n,chest:e},i.state="levelup"}function ld(i,t){const e=Yi[t],n=i.player;i.levels[t]++,i.picks.push(t),i.sinceDefensive=e.defensive?0:i.sinceDefensive+1;const s=n.maxHp;i.stats=Dh(i.levels,i.meta,i.levels.overcharge),n.maxHp=i.stats.maxHp,n.hp=Math.min(n.maxHp,n.hp+Math.max(0,n.maxHp-s)),t==="repair"&&(n.hp=Math.min(n.maxHp,n.hp+n.maxHp*.35)),t==="cache"&&(i.shardsCollected+=8),t==="siphon"&&i.levels.siphon===1&&(n.reserve=Math.min(Xr(i.levels),n.reserve+10))}function nl(i,t){if(i.state!=="levelup"||!i.choice)return!1;const e=i.choice.ids[t];if(!e)return!1;const n=i.choice.chest;return ld(i,e),i.levelUps++,n?i.pendingChests=Math.max(0,i.pendingChests-1):i.pendingLevels=Math.max(0,i.pendingLevels-1),i.choice=null,i.state="playing",(i.pendingLevels>0||i.pendingChests>0)&&el(i),!0}function Wh(i){if(i.state!=="levelup"||!i.choice||i.rerolls<=0)return!1;i.rerolls--;const t=i.choice.ids.slice();return el(i,t),!0}function cd(i,t,e){const n=i.player;let s=t.mx,r=t.my;const a=Math.hypot(s,r);a>1&&(s/=a,r/=a),n.vx=s*i.stats.speed+n.kvx,n.vy=r*i.stats.speed+n.kvy;const o=Math.max(0,1-8*e);n.kvx*=o,n.kvy*=o,n.x+=n.vx*e,n.y+=n.vy*e,qr(i.arena,n,n.r),a>.1&&(n.facing=Math.atan2(r,s)),n.iframes>0&&(n.iframes-=e),n.flash>0&&(n.flash-=e),i.stats.regen>0&&n.hp<n.maxHp&&(n.hp=Math.min(n.maxHp,n.hp+i.stats.regen*e))}function hd(i){const t=i.scratch;for(const e of i.enemies.list)if(!(!e.alive||e.kind==="warden")){i.grid.query(e.x,e.y,e.r*2,t);for(const n of t){if(n===e||!n.alive||n.id<e.id||n.kind==="warden")continue;const s=n.x-e.x,r=n.y-e.y,a=(e.r+n.r)*.9,o=s*s+r*r;if(o<a*a&&o>1e-4){const l=Math.sqrt(o),c=(a-l)*.25,h=s/l,u=r/l;e.x-=h*c,e.y-=u*c,n.x+=h*c,n.y+=u*c}}}}function ud(i){const t=i.player,e=i.scratch;i.grid.query(t.x,t.y,24,e);for(const n of e)n.alive&&Math.hypot(n.x-t.x,n.y-t.y)<n.r+t.r*.8&&tl(i,n.dmg,n.x,n.y)&&(n.kx-=(t.x-n.x)/(n.r+1)*40)}function to(i,t){if(i.state!=="playing"){i.state==="dead"&&(i.deathTimer+=Or);return}const e=Or;if(i.tick++,i.time+=e,cd(i,t,e),$f(i,e),i.chainTimer>0&&(i.chainTimer-=e,i.chainTimer<=0&&(i.chain=0)),i.arena==="foundry"&&i.wave>=3&&(i.laneTimer-=e,i.laneTimer<=0)){i.laneTimer=14;const a=tn(i.rng)<.5;Fh(i,i.player.x+Us(i.rng,-200,200),i.player.y+Us(i.rng,-200,200),a,16)}for(const a of i.enemies.list)a.alive&&Bf(i,a,e);i.grid.rebuild(i.enemies.list),hd(i),Qf(i,t,e),nd(i,e),sd(i,t,e),id(i,e),ad(i,e),ud(i),od(i,e),i.pendingXp>0&&(Vh(i,i.pendingXp),i.pendingXp=0);const n=i.enemies.list;for(let a=n.length-1;a>=0;a--)n[a].alive||i.enemies.removeAt(a);const s=i.pickups.list;for(let a=s.length-1;a>=0;a--)s[a].alive||i.pickups.removeAt(a);const r=i.hazards.list;for(let a=r.length-1;a>=0;a--)r[a].alive||i.hazards.removeAt(a);i.state==="playing"&&(i.time>=Df?(i.state="won",i.winReason="Survived the full run",jt(i,{t:"win",x:i.player.x,y:i.player.y})):(i.pendingLevels>0||i.pendingChests>0)&&el(i))}function fd(i){return i>=4500?"S":i>=3e3?"A":i>=1800?"B":i>=900?"C":"D"}function dd(i){const t=i.state==="won",e=Math.floor(i.time),n=Math.floor(i.time/20),s=Math.floor(i.kills/40),r=10*i.bossesKilled,a=t?100:0,o=Math.floor(i.shardsCollected),l=i.kills+2*e+250*i.bossesKilled+i.player.level*20+(t?1500:0);return{won:t,time:e,wave:i.wave,kills:i.kills,killsBy:{...i.killsBy},damage:Math.round(i.damageDealt),level:i.player.level,picks:i.picks.slice(),bosses:i.bossesKilled,shardsCollected:o,shardsTime:n,shardsKills:s,shardsBosses:r,shardsWin:a,shardsTotal:o+n+s+r+a,score:l,rating:fd(l),maxChain:i.maxChain,detonations:i.detonations}}const Xh=[{id:"w_homing",name:"Seeker Swarm",desc:"Unlocks homing missiles in the upgrade pool. Pairs with Lance Beam and Detonation.",cost:[40],group:"weapon"},{id:"w_pierce",name:"Lance Beam",desc:"Unlocks the piercing beam. Pairs with Seeker Swarm.",cost:[60],group:"weapon"},{id:"w_chain",name:"Chain Arc",desc:"Unlocks lightning that jumps between enemies. Pairs with Siphon.",cost:[90],group:"weapon"},{id:"b_hp",name:"Hull Plating",desc:"Start every run with +10 max HP per tier.",cost:[50,90,140],group:"bonus"},{id:"b_speed",name:"Thruster Tuning",desc:"Start every run with +4% move speed per tier.",cost:[60,110],group:"bonus"},{id:"b_luck",name:"Lucky Charm",desc:"Start every run with +0.1 luck per tier.",cost:[70,120],group:"bonus"},{id:"b_reroll",name:"Spare Circuit",desc:"One extra reroll of upgrade cards each run.",cost:[80],group:"bonus"},{id:"s_siphon",name:"Primed Siphon",desc:"Start every run with Siphon level 1 already installed.",cost:[120],group:"start"},{id:"a_foundry",name:"Arena: Ring Foundry",desc:"A circular arena with periodic lightning lanes.",cost:[150],group:"arena"}];function on(i,t){return i[t]??0}function il(i,t){const e=on(i,t.id);return e>=t.cost.length?null:t.cost[e]}function qh(i,t,e){const n=il(i,e);return n!==null&&t>=n}function pd(i,t,e){const n=Xh.find(r=>r.id===e);if(!n||!qh(i,t,n))return null;const s=il(i,n)??0;return{owned:{...i,[e]:on(i,e)+1},shards:t-s}}function Yh(i,t){return t==="hollow"||on(i,"a_foundry")>0}function $h(i,t){const e=Bh(),n=new Set(e.unlocked);return on(i,"w_homing")&&n.add("homing"),on(i,"w_pierce")&&n.add("pierce"),on(i,"w_chain")&&n.add("chain"),{unlocked:[...n],hp:10*on(i,"b_hp"),speed:.04*on(i,"b_speed"),luck:.1*on(i,"b_luck"),rerolls:1+on(i,"b_reroll"),startSiphon:on(i,"s_siphon")>0,arena:Yh(i,t)?t:"hollow"}}const Zh=Object.freeze({red:"#E30016",wine:"#72151D",bone:"#F1EDE7",ink:"#030303",white:"#FFFFFF"});function eo(i){let t=String(i).replace("#","").trim();(t.length===3||t.length===4)&&(t=[...t].map(n=>n+n).join(""));const e=parseInt(t.slice(0,6),16);return[e>>16&255,e>>8&255,e&255]}function md([i,t,e]){const n=s=>Math.max(0,Math.min(255,Math.round(s))).toString(16).padStart(2,"0");return`#${n(i)}${n(t)}${n(e)}`.toUpperCase()}function Wi(i,t,e){const n=eo(i),s=eo(t);return md(n.map((r,a)=>r+(s[a]-r)*e))}function kt(i,t){const[e,n,s]=eo(i);return`rgba(${e}, ${n}, ${s}, ${t})`}const{red:gd,wine:vd,bone:xd,ink:_d,white:yd}=Zh,Md=Object.freeze({night:["ink","wine",.16],dusk:["ink","wine",.42],mesa:["wine","ink",.38],ember:["wine","red",.5],rose:["red","bone",.45],blush:["red","bone",.78],tan:["bone","wine",.24],saddle:["bone","wine",.52],umber:["wine","ink",.62],smoke:["bone","ink",.55],ash:["bone","ink",.32]}),$l={red:gd,wine:vd,bone:xd,ink:_d,white:yd},Sd=Object.freeze(Object.fromEntries(Object.entries(Md).map(([i,[t,e,n]])=>[i,Wi($l[t],$l[e],n)]))),et=Object.freeze({...Zh,...Sd}),oa=Object.freeze({bg:et.night,bgDeep:et.ink,bgHorizon:et.dusk,surface:Wi(et.night,et.wine,.22),surfaceRaised:Wi(et.night,et.wine,.38),fg:et.bone,fgStrong:et.white,fgSecondary:et.ash,fgMuted:et.smoke,accent:et.red,accentDeep:et.wine,accentSoft:et.rose,line:et.ember,paper:et.bone,paperShade:et.tan,paperInk:Wi(et.ink,et.wine,.3),paperLine:et.saddle,player:et.bone,hostile:et.red,collectible:et.rose,world:et.tan,quiet:Wi(et.dusk,et.ash,.25)});Object.freeze({neutral:[et.ink,et.night,et.umber,et.smoke,et.tan,et.bone,et.white],red:[et.ink,et.wine,et.ember,et.red,et.rose,et.blush],moon:[et.ink,et.dusk,et.saddle,et.tan,et.bone,et.white],star:[et.ink,et.wine,et.red,et.rose,et.blush],earth:[et.ink,et.umber,et.mesa,et.saddle,et.tan,et.bone],wine:[et.ink,et.night,et.wine,et.ember,et.rose]});const T={ink:et.ink,night:et.night,dusk:et.dusk,mesa:et.mesa,umber:et.umber,wine:et.wine,ember:et.ember,red:et.red,rose:et.rose,blush:et.blush,tan:et.tan,saddle:et.saddle,bone:et.bone,white:et.white,ash:et.ash,smoke:et.smoke,quiet:oa.quiet,surface:oa.surface,surfaceRaised:oa.surfaceRaised,scarlet:Wi(et.red,et.ember,.45)},Fs={title:'"Rye", "Zilla Slab", Georgia, serif',slab:'"Zilla Slab", Georgia, serif'},la=700,bd=40,Ed=40,Td=24,wd=12;class Ad{constructor(){$(this,"particles",[]);$(this,"pi",0);$(this,"pops",[]);$(this,"rings",[]);$(this,"beams",[]);$(this,"shocks",[]);$(this,"flares",[]);$(this,"trauma",0);$(this,"flash",0);$(this,"flashColor","#ffffff");$(this,"banner","");$(this,"bannerLife",0);$(this,"bannerColor","#ffffff");$(this,"slow",0);$(this,"kills",0);$(this,"fieldPulse",0);$(this,"budget",1);for(let t=0;t<la;t++)this.particles.push({alive:!1,x:0,y:0,z:0,vx:0,vy:0,vz:0,rx:0,ry:0,spin:0,life:0,max:1,size:2,color:"#ffffff",kind:0})}reset(){for(const t of this.particles)t.alive=!1;this.pops.length=0,this.rings.length=0,this.beams.length=0,this.shocks.length=0,this.flares.length=0,this.trauma=0,this.flash=0,this.bannerLife=0,this.slow=0,this.fieldPulse=0}burst(t,e,n,s,r,a=.5,o=2.5,l=0,c=8){const h=Math.max(n>0?1:0,Math.round(n*this.budget));for(let u=0;u<h;u++){const f=this.particles[this.pi];this.pi=(this.pi+1)%la;const d=Math.random()*Math.PI*2,m=r*(.3+Math.random()*.7);f.alive=!0,f.x=t,f.y=e,f.z=c,f.vx=Math.cos(d)*m,f.vy=Math.sin(d)*m,f.vz=(l===1?140:60)+Math.random()*r*.7,f.rx=Math.random()*6.28,f.ry=Math.random()*6.28,f.spin=(Math.random()-.5)*18,f.life=f.max=a*(.6+Math.random()*.6),f.size=o*(.6+Math.random()*.8),f.color=s,f.kind=l}}ember(t,e,n){const s=this.particles[this.pi];this.pi=(this.pi+1)%la,s.alive=!0,s.x=t+(Math.random()-.5)*8,s.y=e+(Math.random()-.5)*8,s.z=6+Math.random()*8,s.vx=(Math.random()-.5)*30,s.vy=(Math.random()-.5)*30,s.vz=20+Math.random()*40,s.rx=s.ry=0,s.spin=0,s.life=s.max=.35+Math.random()*.2,s.size=2.2,s.color=n,s.kind=0}ring(t,e,n,s,r,a,o=3){this.rings.length>=Ed&&this.rings.shift(),this.rings.push({x:t,y:e,r:n,grow:s,life:r,max:r,color:a,w:o})}beam(t,e,n,s,r=!1){this.beams.length>=Td&&this.beams.shift(),this.beams.push({pts:t,life:e,max:e,color:n,w:s,jagged:r})}flare(t,e,n,s,r,a=600,o=90){this.flares.length>=wd&&this.flares.shift(),this.flares.push({x:t,y:e,h:o,color:n,power:s,life:r,max:r,range:a})}shock(t,e,n,s=.55){this.shocks.length>=4&&this.shocks.shift(),this.shocks.push({x:t,y:e,r:0,maxR:n,life:s,max:s})}pop(t,e,n,s,r=!1){this.pops.length>=bd&&this.pops.shift(),this.pops.push({x:t+(Math.random()-.5)*14,y:e-8,text:n,life:.7,color:s,big:r})}announce(t,e="#ffffff",n=2.2){this.banner=t,this.bannerLife=n,this.bannerColor=e}handle(t,e){const n=e.reducedFlash,s=n?.5:1,r=a=>{e.shake&&(this.trauma=Math.min(1,this.trauma+a))};for(const a of t.events)switch(a.t){case"hit":{this.burst(a.x,a.y,3,T.bone,120,.25,2,0,12),e.numbers&&(a.a??0)>=1&&(this.pops.length<24||Math.random()<.4)&&this.pop(a.x,a.y,String(Math.round(a.a??0)),T.bone);break}case"kill":{const o=a.s??"swarm",l=xi[o]?.color??T.red,c=(a.b?20:8)*s;this.burst(a.x,a.y,Math.round(c*.6),l,200,.9,o==="cleaver"?5:3.5,1,12),this.burst(a.x,a.y,Math.round(c*.5),l,240,.4,2.2,0,12),(a.a??0)>30&&this.ring(a.x,a.y,10,260,.5,l,4);break}case"hurt":r(.45),!n&&!a.b&&(this.flash=Math.max(this.flash,.25)),this.flashColor=T.red,this.burst(t.player.x,t.player.y,14,T.red,200,.5,3,0,14),this.flare(t.player.x,t.player.y,T.red,.8,.25,400,60);break;case"mote":this.burst(a.x,a.y,2,T.rose,60,.25,2);break;case"shard":this.burst(a.x,a.y,6,T.rose,120,.4,2.5),this.pop(a.x,a.y,"+1 shard",T.rose,!0);break;case"chest":this.burst(a.x,a.y,24,T.rose,220,.7,3),this.ring(a.x,a.y,10,220,.6,T.rose),this.flare(a.x,a.y,T.rose,1.2,.6,500),this.announce("Chest opened",T.rose,1.6);break;case"levelup":this.burst(t.player.x,t.player.y,Math.round(40*s),T.tan,260,.8,3,0,16),this.ring(t.player.x,t.player.y,10,380,.7,T.bone,5),this.flare(t.player.x,t.player.y,T.bone,1,.6,500);break;case"fieldUp":this.ring(a.x,a.y,20,240,.4,T.bone),this.flare(a.x,a.y,T.bone,.8,.4,500);break;case"fieldBreak":this.burst(a.x,a.y,Math.round(24*s),T.tan,280,.6,3,0,20),r(.2);break;case"absorb":this.burst(a.x,a.y,4,T.bone,120,.3,2,0,12),this.fieldPulse=Math.min(1,this.fieldPulse+.35);break;case"detonate":{const o=a.a??100;this.ring(a.x,a.y,10,o*3.2,.45,T.blush,8),this.ring(a.x,a.y,10,o*2.2,.35,T.bone,4),this.burst(a.x,a.y,Math.round(60*s),T.tan,420,.8,3.5,0,16),this.flare(a.x,a.y,T.blush,n?2:4,.5,o*2.4,120),n||this.shock(a.x,a.y,o*1.4),r(Math.min(.9,.3+o/500)),n||(this.flash=Math.max(this.flash,.3),this.flashColor=T.blush);break}case"beam":this.beam([a.x,a.y,a.a??a.x,a.b??a.y],.16,T.bone,6);break;case"arc":a.pts&&this.beam(a.pts,.22,T.blush,3,!0);break;case"shieldBlock":this.burst(a.x,a.y,4,T.tan,140,.2,2,0,12);break;case"telegraph":break;case"pool":this.ring(a.x,a.y,10,120,.5,T.ember);break;case"lane":r(.05);break;case"bossWarn":this.announce(a.s==="FINAL WARDEN"?"Warning: the Final Warden":"Warning: Core Warden inbound",T.red,3),r(.4);break;case"bossPhase":this.announce("The Warden opens up",T.red,2),this.ring(a.x,a.y,20,500,.6,T.red,6),this.flare(a.x,a.y,T.red,2.5,.7,900,140),r(.5);break;case"bossDown":this.announce("Warden down",T.bone,3),this.burst(a.x,a.y,Math.round(150*s),T.bone,520,1.1,4,1,30),this.ring(a.x,a.y,10,700,.8,T.blush,8),this.flare(a.x,a.y,T.blush,n?2.5:5,1.1,1200,160),n||this.shock(a.x,a.y,520,.8),r(.9),this.slow=.5;break;case"wave":(a.a??1)>1&&this.announce(`Wave ${a.a}`,T.bone,2);break;case"chain":this.burst(t.player.x,t.player.y,12,T.tan,200,.5,2.5,0,16),this.pop(t.player.x,t.player.y-30,`Chain ×${a.a}`,T.blush,!0);break;case"dead":this.burst(a.x,a.y,Math.round(80*s),T.bone,360,1,3.5,1,14),this.flare(a.x,a.y,T.bone,2,.8,700),r(.8),this.slow=.8;break;case"win":this.announce("Victory",T.bone,3);break}}update(t){const e=620*t;for(const n of this.particles){if(!n.alive)continue;if(n.life-=t,n.life<=0){n.alive=!1;continue}n.x+=n.vx*t,n.y+=n.vy*t;const s=n.z>.5?1-2*t:1-7*t;n.vx*=s,n.vy*=s,n.vz-=n.kind===1?e:e*.35,n.z+=n.vz*t,n.z<0&&(n.z=0,n.vz=-n.vz*.32,n.spin*=.5),n.rx+=n.spin*t,n.ry+=n.spin*.7*t}for(let n=this.pops.length-1;n>=0;n--){const s=this.pops[n];s.life-=t,s.y-=40*t,s.life<=0&&this.pops.splice(n,1)}for(let n=this.rings.length-1;n>=0;n--){const s=this.rings[n];s.life-=t,s.r+=s.grow*t,s.life<=0&&this.rings.splice(n,1)}for(let n=this.beams.length-1;n>=0;n--)this.beams[n].life-=t,this.beams[n].life<=0&&this.beams.splice(n,1);for(let n=this.shocks.length-1;n>=0;n--){const s=this.shocks[n];s.life-=t,s.r=s.maxR*Math.sqrt(1-Math.max(0,s.life)/s.max),s.life<=0&&this.shocks.splice(n,1)}for(let n=this.flares.length-1;n>=0;n--)this.flares[n].life-=t,this.flares[n].life<=0&&this.flares.splice(n,1);this.trauma=Math.max(0,this.trauma-3*t),this.flash=Math.max(0,this.flash-2.5*t),this.fieldPulse=Math.max(0,this.fieldPulse-3*t),this.bannerLife>0&&(this.bannerLife-=t),this.slow>0&&(this.slow-=t)}}const Cd={low:{level:"low",maxDpr:1,dprScale:.75,bloom:"off",lights:1,particles:.4,reflections:"env",ripple:!1,anisotropy:1},medium:{level:"medium",maxDpr:1.25,dprScale:1,bloom:"half",lights:4,particles:.7,reflections:"env",ripple:!0,anisotropy:4},high:{level:"high",maxDpr:2,dprScale:1,bloom:"full",lights:8,particles:1,reflections:"planar",ripple:!0,anisotropy:8}},Kh={low:"Low",medium:"Medium",high:"High"};function Rd(i){const t=typeof matchMedia=="function"&&matchMedia("(pointer: coarse)").matches;let e="";try{if(i){const s=i.getExtension("WEBGL_debug_renderer_info");e=String(s?i.getParameter(s.UNMASKED_RENDERER_WEBGL):i.getParameter(i.RENDERER))}}catch{e=""}if(/swiftshader|llvmpipe|software|basic render/i.test(e))return"low";const n=navigator.hardwareConcurrency||4;return t?/apple/i.test(e)&&n>=6?"medium":"low":/mali|adreno|powervr|videocore/i.test(e)?"low":/intel|uhd|iris|radeon\(tm\) graphics|vega \d/i.test(e)||n<=4?"medium":"high"}function Pd(i,t){return i==="auto"?t:i}function Ld(i){return i==="high"?"medium":"low"}function Ws(i=1){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const pn=Math.PI*2;function Jh(i,t,e,n,s,{seed:r=7,density:a=.6,colors:o=[et.tan,et.ember],alpha:l=.08}={}){const c=Ws(r),h=Math.round(n*s*a/1e3);i.save();for(let u=0;u<h;u++){i.globalAlpha=l*(.4+c()*.6),i.fillStyle=o[c()*o.length|0];const f=c()<.9?1:2;i.fillRect(t+c()*n,e+c()*s,f,f)}i.restore()}function jh(i,t,{angle:e=0,gap:n=4,color:s=et.ink,width:r=1,alpha:a=1,bounds:o}){const[l,c,h,u]=o;i.save(),i.beginPath(),t(i),i.clip(),i.globalAlpha=a,i.strokeStyle=s,i.lineWidth=r;const f=l+h/2,d=c+u/2,m=Math.hypot(h,u)/2+n;i.translate(f,d),i.rotate(e),i.beginPath();for(let x=-m;x<=m;x+=n)i.moveTo(-m,x),i.lineTo(m,x);i.stroke(),i.restore()}function Dd(i,t,e,n,{face:s=et.bone,ink:r=et.wine,rim:a=et.ember,phase:o=0,shadow:l=et.night,rings:c=3,hatch:h=!0,glow:u=.18}={}){i.save();const f=(1+Math.cos((o%1+1)%1*pn))/2;if(u*=.15+.85*f,u>0){const m=i.createRadialGradient(t,e,n*.8,t,e,n*2.4);m.addColorStop(0,kt(s,u)),m.addColorStop(1,kt(s,0)),i.fillStyle=m,i.beginPath(),i.arc(t,e,n*2.4,0,pn),i.fill()}i.fillStyle=s,i.beginPath(),i.arc(t,e,n,0,pn),i.fill(),h&&jh(i,m=>{m.arc(t,e,n,0,pn)},{angle:-.5,gap:Math.max(2.2,n/9),color:r,width:Math.max(.6,n/60),alpha:.22,bounds:[t-n,e-n*.1,n*2,n*1.1]}),i.strokeStyle=a;for(let m=0;m<c;m++)i.globalAlpha=.55-m*.12,i.lineWidth=Math.max(.8,n/40),i.beginPath(),i.arc(t,e,n*(1-.1*(m+1)),0,pn),i.stroke();i.globalAlpha=1,i.lineWidth=Math.max(1,n/26),i.beginPath(),i.arc(t,e,n,0,pn),i.stroke();const d=(o%1+1)%1;if(d>.001&&d<.999){i.save(),i.beginPath(),i.arc(t,e,n+.5,0,pn),i.clip(),i.fillStyle=l,i.globalAlpha=.9;const m=Math.cos(d*pn),x=d<.5;i.beginPath(),i.arc(t,e,n+1,x?-Math.PI/2:Math.PI/2,x?Math.PI/2:3*Math.PI/2,!1),i.ellipse(t,e,Math.abs(m)*(n+1),n+1,0,x?Math.PI/2:3*Math.PI/2,x?-Math.PI/2:Math.PI/2,m>0),i.fill(),i.restore()}i.restore()}function Zl(i,t,e,n,{seed:s=3,height:r=60,fill:a=et.mesa,strata:o=et.ember,bottom:l,plateaus:c=3,strataAlpha:h=.35}={}){const u=Ws(s),f=e-t,d=[[t,n-r*(.15+u()*.15)]],m=f/c;for(let g=0;g<c;g++){const p=t+g*m+m*(.1+u()*.15),M=t+(g+1)*m-m*(.1+u()*.15),v=n-r*(.65+u()*.35),_=m*(.06+u()*.06);d.push([p,n-r*(.15+u()*.2)]),d.push([p+_,v]),d.push([M-_,v+(u()-.5)*3]),d.push([M,n-r*(.15+u()*.2)])}d.push([e,n-r*(.12+u()*.15)]);const x=g=>{g.moveTo(t,l??n+2);for(const[p,M]of d)g.lineTo(p,M);g.lineTo(e,l??n+2),g.closePath()};return i.fillStyle=a,i.beginPath(),x(i),i.fill(),jh(i,x,{angle:0,gap:Math.max(3,r/9),color:o,width:1,alpha:h,bounds:[t,n-r,f,(l??n)-n+r+2]}),d}function ca(i,t,e,n,{fill:s=et.ink,arms:r=[.55,.35],seed:a=1}={}){const o=Math.max(3,n*.16),l=Ws(a);i.save(),i.fillStyle=s;const c=(h,u,f,d)=>{i.beginPath(),i.moveTo(h-f/2,u+d),i.lineTo(h-f/2,u+f/2),i.arc(h,u+f/2,f/2,Math.PI,0),i.lineTo(h+f/2,u+d),i.closePath(),i.fill()};c(t,e-n,o,n),r.forEach((h,u)=>{const f=u%2===0?-1:1,d=e-n*h,m=o*(1.3+l()*.4),x=n*(.22+l()*.12);i.fillRect(t+(f<0?-m:0),d-o*.35,m,o*.7),c(t+f*m,d-x,o*.8,x+o*.35)}),i.restore()}function Yr(i,t,e,n,s=et.bone,r=1){i.save(),i.globalAlpha=r,i.fillStyle=s,i.beginPath(),i.moveTo(t,e-n),i.quadraticCurveTo(t,e,t+n,e),i.quadraticCurveTo(t,e,t,e+n),i.quadraticCurveTo(t,e,t-n,e),i.quadraticCurveTo(t,e,t,e-n),i.fill(),i.restore()}function ha(i,t,e,n,{fill:s=et.rose,edge:r=et.bone,rot:a=-Math.PI/2,points:o=5,inner:l=.45}={}){i.save(),i.beginPath();for(let c=0;c<o*2;c++){const h=c%2===0?n:n*l,u=a+c*Math.PI/o,f=t+Math.cos(u)*h,d=e+Math.sin(u)*h;c===0?i.moveTo(f,d):i.lineTo(f,d)}i.closePath(),i.fillStyle=s,i.fill(),i.lineWidth=Math.max(1,n/7),i.strokeStyle=r,i.lineJoin="round",i.stroke(),i.restore()}function Qh(i,t,e,n,s,{seed:r=11,count:a=80,color:o=et.bone,max:l=1.6,alpha:c=.55,twinkle:h=0}={}){const u=Ws(r);for(let f=0;f<a;f++){const d=t+u()*n,m=e+u()*s*u(),x=.4+u()*l,g=u()*pn,p=c*(.35+u()*.65)*(h?.75+.25*Math.sin(h*pn+g):1);x>l*.85?Yr(i,d,m,x*2.2,o,p):(i.globalAlpha=p,i.fillStyle=o,i.fillRect(d,m,x,x),i.globalAlpha=1)}}function sl(i,t,{color:e=et.rose,node:n=et.bone,alpha:s=.8,dash:r=[2,5],width:a=1,nodeR:o=2.6,progress:l=1}={}){i.save(),i.globalAlpha=s,i.strokeStyle=e,i.lineWidth=a,i.setLineDash(r),i.beginPath();let c=0;const h=[];for(let f=1;f<t.length;f++){const d=Math.hypot(t[f][0]-t[f-1][0],t[f][1]-t[f-1][1]);h.push(d),c+=d}let u=c*l;i.moveTo(t[0][0],t[0][1]);for(let f=1;f<t.length&&u>0;f++){const d=h[f-1],m=Math.min(1,u/d);i.lineTo(t[f-1][0]+(t[f][0]-t[f-1][0])*m,t[f-1][1]+(t[f][1]-t[f-1][1])*m),u-=d}i.stroke(),i.setLineDash([]);for(const[f,d]of t)i.globalAlpha=s,i.strokeStyle=e,i.beginPath(),i.arc(f,d,o*1.9,0,pn),i.stroke(),Yr(i,f,d,o*1.6,n,1);i.restore()}function Id(i,t,e,n,{fill:s=et.ink,slit:r=et.red,telescopeAngle:a=-.9}={}){i.save(),i.fillStyle=s;const o=n*1.6,l=n*.8;i.fillRect(t-o/2,e-l,o,l),i.beginPath(),i.arc(t,e-l,o*.42,Math.PI,0),i.closePath(),i.fill(),i.save(),i.translate(t,e-l-o*.18),i.rotate(a),i.fillRect(0,-n*.07,n*.75,n*.14),i.restore(),i.strokeStyle=r,i.lineWidth=Math.max(1,n*.06),i.beginPath(),i.moveTo(t,e-l-o*.4),i.lineTo(t,e-l-1),i.stroke(),i.fillStyle=r,i.globalAlpha=.85,i.fillRect(t-n*.1,e-n*.36,n*.2,n*.36),i.restore()}const Me={phosphor:T.bone,cyan:T.bone,essence:T.rose,signal:T.red,brass:T.tan},Cn=Fs.slab,Kl=Fs.slab,Ud=Fs.title,ua=Math.PI*2,Jl={weapon:0,signature:1,passive:2,filler:3},Nd=Vr.filter(i=>i.kind!=="filler").sort((i,t)=>Jl[i.kind]-Jl[t.kind]);class tu{constructor(){$(this,"rim",null);$(this,"rimW",0);$(this,"rimH",0)}buildRim(t,e,n){const s=document.createElement("canvas");s.width=t,s.height=e;const r=s.getContext("2d");if(!r)return s;const a=r.createRadialGradient(t/2,e/2,Math.min(t,e)*.45,t/2,e/2,Math.hypot(t,e)*.56);a.addColorStop(0,kt(T.ink,0)),a.addColorStop(1,kt(T.ink,.62)),r.fillStyle=a,r.fillRect(0,0,t,e);const o=r.createLinearGradient(0,0,0,40*n);o.addColorStop(0,kt(T.bone,.05)),o.addColorStop(1,kt(T.bone,0)),r.fillStyle=o,r.fillRect(0,0,t,40*n),Jh(r,0,0,t,e,{seed:19,density:.5,colors:[T.tan,T.ember],alpha:.07});let l=7;const c=()=>(l=l*16807%2147483647,l/2147483647),h=t-26*n,u=92*n,f=(d,m,x,g,p)=>{let M=d,v=m;const _=6+Math.floor(c()*4);r.beginPath(),r.moveTo(M,v);for(let C=0;C<_;C++){x+=(c()-.5)*.7;const w=g/_*(.6+c()*.8);M+=Math.cos(x)*w,v+=Math.sin(x)*w,r.lineTo(M,v),p>0&&c()<.28&&f(M,v,x+(c()<.5?.9:-.9),g*.4,p-1)}r.stroke()};r.lineCap="round",r.lineJoin="round";for(let d=0;d<2;d++)l=7,r.strokeStyle=d===0?kt(T.ink,.35):kt(T.bone,.17),r.lineWidth=(d===0?2.4:1)*Math.max(1,n*.9),r.save(),d===0&&r.translate(1.2*n,1.2*n),f(h,u,Math.PI*.82,150*n,2),f(h,u,Math.PI*1.25,90*n,1),f(h,u,Math.PI*.55,70*n,1),r.restore();return r.fillStyle=kt(T.bone,.2),r.beginPath(),r.arc(h,u,2.4*n,0,ua),r.fill(),s}draw(t,e,n,s,r,a,o,l,c,h){const u=Math.max(.8,Math.min(1.9,Math.min(e,n)/760));if(r){const f=r.player;if(f.hp/f.maxHp<.3&&r.state==="playing"){const d=o.reducedFlash?.22:.18+.12*Math.sin(l*6),m=t.createRadialGradient(e/2,n/2,Math.min(e,n)*.38,e/2,n/2,Math.max(e,n)*.72);m.addColorStop(0,kt(T.red,0)),m.addColorStop(1,kt(T.red,d)),t.fillStyle=m,t.fillRect(0,0,e,n)}h&&o.numbers&&this.drawPops(t,a,u,h)}r&&((!this.rim||this.rimW!==e||this.rimH!==n)&&(this.rim=this.buildRim(e,n,u),this.rimW=e,this.rimH=n),t.drawImage(this.rim,0,0)),r&&this.drawReadout(t,e,n,u,r,a,l),c&&c.active&&(t.strokeStyle=kt(T.tan,.45),t.lineWidth=2*s,t.beginPath(),t.arc(c.bx,c.by,56*s,0,ua),t.stroke(),t.fillStyle=kt(T.bone,.45),t.beginPath(),t.arc(c.kx,c.ky,24*s,0,ua),t.fill()),a.flash>0&&!o.reducedFlash&&(t.globalAlpha=Math.min(.35,a.flash),t.fillStyle=a.flashColor,t.fillRect(0,0,e,n),t.globalAlpha=1)}drawPops(t,e,n,s){t.textAlign="center",t.textBaseline="middle",t.lineJoin="round";for(const r of e.pops){const a=s(r.x,r.y,26);a&&(t.globalAlpha=Math.min(1,r.life/.3),t.font=`${r.big?700:600} ${Math.round((r.big?16:13)*n)}px ${Kl}`,t.strokeStyle=kt(T.ink,.85),t.lineWidth=3*n,t.strokeText(r.text,a.x,a.y),t.fillStyle=r.color,t.fillText(r.text,a.x,a.y))}t.globalAlpha=1,t.textBaseline="alphabetic"}text(t,e,n,s,r,a,o="left"){return t.font=r,t.textAlign=o,t.fillStyle=kt(T.ink,.75),t.fillText(e,n+1,s+1),t.fillStyle=a,t.fillText(e,n,s),t.measureText(e).width}nums(t,e,n,s,r,a,o="left"){t.font=r;const l=Math.max(..."0123456789".split("").map(f=>t.measureText(f).width)),c=[...e].map(f=>f>="0"&&f<="9"?l:t.measureText(f).width),h=c.reduce((f,d)=>f+d,0);let u=o==="center"?n-h/2:o==="right"?n-h:n;return t.textAlign="center",[...e].forEach((f,d)=>{const m=u+c[d]/2;t.fillStyle=kt(T.ink,.75),t.fillText(f,m+1,s+1),t.fillStyle=a,t.fillText(f,m,s),u+=c[d]}),h}bar(t,e,n,s,r,a,o,l,c){const h=Math.max(0,Math.min(1,a));t.fillStyle=kt(T.umber,.8),t.fillRect(e,n,s,r),t.fillStyle=o,t.fillRect(e,n,h*s,r),h>0&&h<1&&(t.fillStyle=kt(T.white,.75),t.fillRect(e+h*s-Math.max(1,c),n,Math.max(1,c),r)),t.fillStyle=kt(T.night,.8);const u=Math.max(1,Math.round(c*1.4));for(let f=1;f<l;f++)t.fillRect(Math.round(e+s*f/l),n,u,r);t.strokeStyle=kt(T.ember,.75),t.lineWidth=1,t.strokeRect(Math.round(e)-.5,Math.round(n)-.5,Math.round(s)+1,Math.round(r)+1)}keycap(t,e,n,s,r,a,o){const l=17*a;t.strokeStyle=o?kt(T.tan,.85):kt(T.ember,.6),t.lineWidth=1,t.fillStyle=kt(T.umber,.8),t.fillRect(s,r-l+3*a,l,l),t.strokeRect(Math.round(s)+.5,Math.round(r-l+3*a)+.5,Math.round(l),Math.round(l)),this.text(t,e,s+l/2,r-1*a,`700 ${Math.round(12*a)}px ${Cn}`,o?Me.phosphor:kt(T.bone,.45),"center");const c=this.text(t,n,s+l+6*a,r-1*a,`600 ${Math.round(13*a)}px ${Cn}`,o?Me.phosphor:kt(T.bone,.45));return l+6*a+c+16*a}drawReadout(t,e,n,s,r,a,o){const l=r.player,c=Math.round(18*s),h=62*s,u=Math.min(220*s,e*.3),f=c+h,d=`600 ${Math.round(13*s)}px ${Cn}`,m=k=>`600 ${Math.round(k*s)}px ${Kl}`,x=kt(T.bone,.62),g=(r.levels.siphon>0?r.levels.detonation>0||r.levels.bulwark>0?104:80:58)*s,p=t.createLinearGradient(0,0,f+u+120*s,0);p.addColorStop(0,kt(T.umber,.6)),p.addColorStop(1,kt(T.umber,0)),t.fillStyle=p,t.fillRect(0,0,f+u+120*s,c+g),t.strokeStyle=kt(T.ember,.9),t.lineWidth=1,t.beginPath(),t.moveTo(c-8*s,c+16*s),t.lineTo(c-8*s,c-6*s),t.lineTo(c+14*s,c-6*s),t.moveTo(c-11*s,c+16*s),t.lineTo(c-11*s,c-9*s),t.lineTo(c+14*s,c-9*s),t.stroke(),t.fillStyle=T.ember,t.beginPath(),t.moveTo(c-8*s,c-6*s-3.5*s),t.lineTo(c-8*s+3.5*s,c-6*s),t.lineTo(c-8*s,c-6*s+3.5*s),t.lineTo(c-8*s-3.5*s,c-6*s),t.fill();let M=c+10*s;const v=l.hp/l.maxHp<.3;this.text(t,"Hull",c,M+1*s,d,v?Me.signal:Me.phosphor),this.bar(t,f,M-9*s,u,10*s,l.hp/l.maxHp,v?Me.signal:Me.phosphor,Math.max(4,Math.round(l.maxHp/20)),s);let _=f+u+8*s;if(_+=this.nums(t,String(Math.ceil(l.hp)),_,M+1*s,m(15),v?Me.signal:Me.phosphor),this.nums(t,`/${l.maxHp}`,_+2*s,M+1*s,m(12),x),M+=22*s,this.text(t,"Essence",c,M+1*s,d,Me.essence),this.bar(t,f,M-7*s,u,6*s,l.xp/l.xpNext,Me.essence,10,s),this.nums(t,`Lv ${l.level}`,f+u+8*s,M+1*s,`700 ${Math.round(14*s)}px ${Cn}`,Me.essence),r.levels.siphon>0){M+=22*s;const k=Xr(r.levels),q=r.levels.bulwark>0?l.fieldOn?"Field up":l.hold?"Holding":"Charging":"Reserve",N=l.fieldOn?Me.cyan:l.hold?Me.brass:T.saddle;this.text(t,q,c,M+1*s,d,N),this.bar(t,f,M-8*s,u,8*s,l.reserve/k,N,15,s),r.levels.bulwark>0&&(t.fillStyle=kt(T.bone,.7),t.fillRect(f+u*.15,M-11*s,Math.max(1,s),14*s));let V=f+u+8*s;if(V+=this.nums(t,String(Math.floor(l.reserve)),V,M+1*s,m(14),N),this.nums(t,`/${k}`,V+2*s,M+1*s,m(12),x),r.levels.bulwark>0){M+=25*s;let B=c;if(r.levels.detonation>0){const nt=l.detCd<=0&&l.reserve+l.fieldSpent>=8;B+=this.keycap(t,"E",l.detCd>0?"Release cooling":"Release",B,M,s,nt)}this.keycap(t,"Q",l.hold?"Stop holding":"Hold",B,M,s,!0)}}const C=Math.floor(r.time),w=String(Math.floor(C/60)).padStart(2,"0"),R=String(C%60).padStart(2,"0"),L=e/s<700?c+g+8*s:c;this.nums(t,`${w}:${R}`,e/2,L+22*s,`700 ${Math.round(30*s)}px ${Cn}`,Me.phosphor,"center"),this.nums(t,`Wave ${r.wave}`,e/2,L+42*s,d,T.tan,"center");for(const k of r.enemies.list){if(!k.alive||k.kind!=="warden")continue;const q=Math.min(520*s,e*.62),N=e/2-q/2,V=L+70*s,B=k.tier===4?"Final Warden":`Core Warden, tier ${k.tier}`;this.text(t,B,N,V-6*s,`600 ${Math.round(13*s)}px ${Cn}`,k.phase?Me.signal:Me.phosphor),k.phase&&this.text(t,"Armour open",N+q,V-6*s,d,Me.signal,"right"),this.bar(t,N,V,q,8*s,k.hp/k.maxHp,k.phase?Me.signal:Me.phosphor,20,s),t.fillStyle=Me.phosphor,t.fillRect(N+q*.5-s*.5,V-4*s,Math.max(1,s),16*s);break}const S=this.text(t,"kills",e-c,c+20*s,`600 ${Math.round(13*s)}px ${Cn}`,x,"right");this.nums(t,String(r.kills),e-c-S-6*s,c+20*s,m(24),Me.phosphor,"right"),r.chain>=5&&this.text(t,`Chain ×${r.chain}`,e-c,c+42*s,`600 ${Math.round(14*s)}px ${Cn}`,Me.brass,"right");const y=Math.round(28*s);let P=c,H=n-c-y-6*s;for(const k of Nd){const q=r.levels[k.id];if(q<=0)continue;t.fillStyle=kt(T.umber,.82),t.fillRect(P,H,y,y),t.strokeStyle=k.color,t.globalAlpha=.7,t.lineWidth=1,t.strokeRect(P+.5,H+.5,y-1,y-1),t.globalAlpha=1,this.text(t,k.icon,P+y/2,H+y*.7,`700 ${Math.round(15*s)}px ${Cn}`,k.color,"center");const N=k.maxLevel,V=(y-(N-1)*2*s)/N;for(let B=0;B<N;B++)t.fillStyle=B<q?k.color:kt(T.bone,.18),t.fillRect(P+B*(V+2*s),H+y+3*s,V,2.5*s);P+=y+6*s,P>e*.45&&(P=c,H-=y+12*s)}const z=Wr.filter(k=>k.needs.every(q=>r.levels[q]>0));if(z.length){t.font=d;const k=8*s,q=8*s,N=z.map(ht=>t.measureText(ht.name).width+q*2),V=N.reduce((ht,ft)=>ht+ft,0)+k*(z.length-1);let B=Math.max(e*.5-V/2,e*.48);B+V>e-c&&(B=e-c-V);const nt=n-c-4*s;z.forEach((ht,ft)=>{t.fillStyle=kt(T.umber,.82),t.fillRect(B,nt-16*s,N[ft],22*s),t.strokeStyle=kt(T.ember,.95),t.strokeRect(Math.round(B)+.5,Math.round(nt-16*s)+.5,Math.round(N[ft]),Math.round(22*s)),this.text(t,ht.name,B+q,nt,d,Me.brass),B+=N[ft]+k})}if(a.bannerLife>0&&a.banner){const k=Math.min(1,a.bannerLife/.5);t.globalAlpha=k;const q=n*.3,N=this.text(t,a.banner,e/2,q,`400 ${Math.round(32*s)}px ${Ud}`,a.bannerColor,"center");t.fillStyle=a.bannerColor,t.globalAlpha=k*.6,t.fillRect(e/2-N/2,q+10*s,N,Math.max(1,s)),t.globalAlpha=1}}}const pe=Math.PI*2;class Fd{constructor(t){$(this,"kind","2d");$(this,"visor",new tu);$(this,"canvas");$(this,"ctx");$(this,"W",0);$(this,"H",0);$(this,"S",1);$(this,"dpr",1);$(this,"camX",0);$(this,"camY",0);$(this,"glows",new Map);$(this,"snap",!0);this.canvas=t;const e=t.getContext("2d",{alpha:!1});if(!e)throw new Error("Canvas 2D is not available in this browser.");this.ctx=e,this.resize()}resize(){this.dpr=Math.min(2,window.devicePixelRatio||1);const t=Math.max(1,Math.floor(window.innerWidth*this.dpr)),e=Math.max(1,Math.floor(window.innerHeight*this.dpr));(this.canvas.width!==t||this.canvas.height!==e)&&(this.canvas.width=t,this.canvas.height=e),this.W=t,this.H=e,this.S=Math.min(e/720,t/560)}resetCamera(){this.snap=!0}glow(t){let e=this.glows.get(t);if(!e){e=document.createElement("canvas"),e.width=e.height=64;const n=e.getContext("2d");if(n){const s=n.createRadialGradient(32,32,0,32,32,32);s.addColorStop(0,t),s.addColorStop(.35,t+"66"),s.addColorStop(1,t+"00"),n.fillStyle=s,n.fillRect(0,0,64,64)}this.glows.set(t,e)}return e}drawGlow(t,e,n,s,r=1){const a=this.ctx;a.globalAlpha=r,a.drawImage(this.glow(s),t-n,e-n,n*2,n*2)}draw(t,e,n,s,r){const a=this.ctx,{W:o,H:l}=this;a.setTransform(1,0,0,1,0,0),a.globalAlpha=1,a.globalCompositeOperation="source-over",a.fillStyle=T.night,a.fillRect(0,0,o,l);let c=0,h=0;if(t){if(this.snap?(this.camX=t.player.x,this.camY=t.player.y,this.snap=!1):(this.camX+=(t.player.x-this.camX)*.12,this.camY+=(t.player.y-this.camY)*.12),n.shake&&e.trauma>0){const M=e.trauma*e.trauma*12*this.dpr;c=(Math.random()*2-1)*M,h=(Math.random()*2-1)*M}}else this.camX=Math.sin(s*.15)*300,this.camY=Math.cos(s*.11)*300;const u=t?t.arena:"hollow";a.setTransform(this.S,0,0,this.S,o/2-this.camX*this.S+c,l/2-this.camY*this.S+h);const f=o/this.S,d=l/this.S,m=this.camX-f/2-40,x=this.camX+f/2+40,g=this.camY-d/2-40,p=this.camY+d/2+40;this.drawFloor(u,m,x,g,p,s),t?(this.drawHazards(t,n,s),this.drawPickups(t,s,m,x,g,p),this.drawEnemies(t,n,s,m,x,g,p),this.drawBullets(t,n,m,x,g,p),this.drawPlayerStuff(t,s)):this.drawAttract(s),this.drawFx(e,m,x,g,p,n),a.setTransform(1,0,0,1,0,0),a.globalAlpha=1,a.globalCompositeOperation="source-over",this.visor.draw(a,o,l,this.dpr,t,e,n,s,r,null)}drawFloor(t,e,n,s,r,a){const o=this.ctx,l=t==="foundry"?T.ember:T.tan;o.fillStyle=t==="foundry"?T.umber:T.night,t==="foundry"?(o.beginPath(),o.arc(0,0,Sn,0,pe),o.fill()):o.fillRect(-Ee,-Ee,Ee*2,Ee*2),o.lineWidth=1,o.strokeStyle=t==="foundry"?kt(T.ember,.18):kt(T.tan,.09),o.beginPath();const c=80;for(let u=Math.floor(e/c)*c;u<n;u+=c)o.moveTo(u,s),o.lineTo(u,r);for(let u=Math.floor(s/c)*c;u<r;u+=c)o.moveTo(e,u),o.lineTo(n,u);o.stroke();const h=320;for(let u=Math.floor(e/h)*h;u<n;u+=h)for(let f=Math.floor(s/h)*h;f<r;f+=h){let d=(Math.imul(u|0,73856093)^Math.imul(f|0,19349663))>>>0;const m=()=>(d=Math.imul(d^d>>>15,2246822507)+1831565813>>>0)/4294967296;for(let M=0;M<10;M++)Yr(o,u+m()*h,f+m()*h,1.5+m()*2.5,T.ash,.25+m()*.2);const x=[];let g=u+30+m()*60,p=f+60+m()*200;for(let M=0;M<4;M++)x.push([g,p]),g+=40+m()*30,p+=(m()-.5)*80;sl(o,x,{color:t==="foundry"?T.ember:T.quiet,node:T.ash,alpha:.6,dash:[3,5],width:1,nodeR:1.8})}o.save(),o.beginPath(),o.rect(e-400,s-400,n-e+800,r-s+800),t==="foundry"?o.arc(0,0,Sn,0,pe,!0):o.rect(-Ee,-Ee,Ee*2,Ee*2),o.clip("evenodd"),o.fillStyle=T.ink,o.fillRect(e-400,s-400,n-e+800,r-s+800),o.restore(),o.strokeStyle=l,o.globalAlpha=.55+Math.sin(a*2)*.1,o.lineWidth=4,t==="foundry"?(o.beginPath(),o.arc(0,0,Sn,0,pe),o.stroke()):o.strokeRect(-Ee,-Ee,Ee*2,Ee*2),o.globalAlpha=1}drawAttract(t){const e=this.ctx;e.globalCompositeOperation="lighter";const n=[T.bone,T.ember,T.tan,T.wine,T.saddle];for(let s=0;s<14;s++){const r=t*(.1+s*.013)+s*1.7,a=160+s*40;this.drawGlow(this.camX+Math.cos(r)*a,this.camY+Math.sin(r*1.2)*a*.7,30+s%4*14,n[s%n.length],.35)}e.globalAlpha=1,e.globalCompositeOperation="source-over"}drawHazards(t,e,n){const s=this.ctx;for(const r of t.hazards.list)if(r.kind==="pool"){if(r.t<r.tele){const a=r.t/r.tele;s.strokeStyle=T.red,s.lineWidth=3,s.setLineDash([8,8]),s.globalAlpha=.4+.5*Math.sin(n*18),s.beginPath(),s.arc(r.x,r.y,44,0,pe),s.stroke(),s.setLineDash([]),s.globalAlpha=.25*a,s.fillStyle=T.wine,s.fill()}else{const a=s.createRadialGradient(r.x,r.y,0,r.x,r.y,r.r);a.addColorStop(0,kt(T.night,.85)),a.addColorStop(.8,kt(T.wine,.5)),a.addColorStop(1,kt(T.ember,.85)),s.globalAlpha=1,s.fillStyle=a,s.beginPath(),s.arc(r.x,r.y,r.r,0,pe),s.fill(),s.strokeStyle=T.red,s.lineWidth=3,s.stroke()}s.globalAlpha=1}else{const a=r.t>=r.tele;if(s.lineCap="butt",a)s.globalAlpha=1,s.strokeStyle=T.blush,s.lineWidth=r.width,s.beginPath(),s.moveTo(r.x,r.y),s.lineTo(r.x2,r.y2),s.stroke(),s.strokeStyle=T.red,s.lineWidth=r.width*1.6,s.globalAlpha=.35,s.stroke();else{const o=.18+.25*(.5+.5*Math.sin(n*22));s.globalAlpha=o,s.strokeStyle=T.wine,s.lineWidth=r.width,s.beginPath(),s.moveTo(r.x,r.y),s.lineTo(r.x2,r.y2),s.stroke(),s.globalAlpha=.9,s.setLineDash([22,22]),s.lineWidth=3,s.strokeStyle=T.red,s.beginPath(),s.moveTo(r.x,r.y),s.lineTo(r.x2,r.y2),s.stroke(),s.setLineDash([])}s.globalAlpha=1}}drawPickups(t,e,n,s,r,a){const o=this.ctx;o.globalCompositeOperation="lighter";for(const l of t.pickups.list)l.x<n||l.x>s||l.y<r||l.y>a||(l.kind==="mote"?this.drawGlow(l.x,l.y,9,T.rose,.5):l.kind==="shard"?this.drawGlow(l.x,l.y,13,T.rose,.6):this.drawGlow(l.x,l.y,28+Math.sin(e*6)*4,T.rose,.5));o.globalAlpha=1,o.globalCompositeOperation="source-over";for(const l of t.pickups.list)l.x<n||l.x>s||l.y<r||l.y>a||(l.kind==="mote"?ha(o,l.x,l.y,5,{fill:T.rose,edge:T.blush}):l.kind==="shard"?ha(o,l.x,l.y,9,{fill:T.rose,edge:T.bone,rot:-Math.PI/2+Math.sin(e*2)*.3}):(o.fillStyle=T.saddle,o.strokeStyle=T.umber,o.lineWidth=3,o.fillRect(l.x-12,l.y-9,24,18),o.strokeRect(l.x-12,l.y-9,24,18),ha(o,l.x,l.y,5,{fill:T.rose,edge:T.bone})))}poly(t,e,n,s,r,a,o,l){const c=this.ctx;c.beginPath();for(let h=0;h<s;h++){const u=r+h/s*pe,f=t+Math.cos(u)*n,d=e+Math.sin(u)*n;h===0?c.moveTo(f,d):c.lineTo(f,d)}c.closePath(),a&&(c.fillStyle=a,c.fill()),o&&(c.lineWidth=l,c.strokeStyle=o,c.stroke())}drawEnemies(t,e,n,s,r,a,o){const l=this.ctx,c=t.player;for(const h of t.enemies.list)!h.alive||h.x<s-200||h.x>r+200||h.y<a-200||h.y>o+200||this.drawTelegraph(h,n);for(const h of t.enemies.list){if(!h.alive||h.x<s||h.x>r||h.y<a||h.y>o)continue;const u=xi[h.kind],f=h.flash>0?T.white:u.color,d=Math.atan2(c.y-h.y,c.x-h.x);let m=h.x,x=h.y;h.kind==="rammer"&&h.state===1&&(m+=Math.sin(n*90)*2.5,x+=Math.cos(n*80)*2.5),l.lineWidth=2.5,l.lineJoin="round";const g=h.flash>0?T.white:u.color+"44";switch(h.kind){case"swarm":case"splitlet":this.poly(m,x,h.r*1.15,3,d,g,f,2.5);break;case"spitter":this.poly(m,x,h.r*1.2,4,d,g,f,2.5),l.fillStyle=h.state===1&&Math.floor(n*24)%2===0?T.white:f,l.beginPath(),l.arc(m,x,3.5,0,pe),l.fill();break;case"rammer":this.poly(m,x,h.r*1.25,4,d+Math.PI/4,g,f,3),l.fillStyle=f,l.beginPath(),l.moveTo(m+Math.cos(d)*(h.r+9),x+Math.sin(d)*(h.r+9)),l.lineTo(m+Math.cos(d+2.5)*h.r*.6,x+Math.sin(d+2.5)*h.r*.6),l.lineTo(m+Math.cos(d-2.5)*h.r*.6,x+Math.sin(d-2.5)*h.r*.6),l.closePath(),l.fill();break;case"cleaver":l.fillStyle=g,l.strokeStyle=f,l.lineWidth=5,l.beginPath(),l.arc(m,x,h.r-2,0,pe),l.fill(),l.stroke(),l.lineWidth=2,l.beginPath(),l.moveTo(m-5,x-h.r+3),l.lineTo(m+3,x-2),l.lineTo(m-3,x+4),l.lineTo(m+5,x+h.r-3),l.stroke();break;case"aegis":l.fillStyle=g,l.strokeStyle=f,l.lineWidth=2.5,l.beginPath(),l.arc(m,x,h.r,0,pe),l.fill(),l.stroke(),l.strokeStyle=h.flash>0?T.white:T.tan,l.lineWidth=6,l.lineCap="round",l.beginPath(),l.arc(m,x,h.r+9,h.shield-.87,h.shield+.87),l.stroke(),l.lineCap="butt";break;case"caster":this.poly(m,x,h.r*1.35,12,n*.8,null,f,2.5),l.fillStyle=g,l.beginPath(),l.arc(m,x,h.r*.7,0,pe),l.fill(),l.fillStyle=h.state===1?T.white:f,l.beginPath(),l.arc(m,x,3.5,0,pe),l.fill();break;case"warden":{l.globalCompositeOperation="lighter",this.drawGlow(m,x,h.r*2.6,h.phase?T.red:T.ember,.45+(h.state===1?.35*Math.sin(n*30):0)),l.globalAlpha=1,l.globalCompositeOperation="source-over",this.poly(m,x,h.r,8,n*.4,h.flash>0?T.white:kt(T.umber,.92),h.phase?T.red:T.saddle,4),this.poly(m,x,h.r*.55,8,-n*.8,null,h.phase?T.red:T.blush,3);for(let p=0;p<8;p++){const M=n*(h.phase?1.8:1)+p/8*pe;l.fillStyle=h.phase?T.red:T.blush,l.beginPath(),l.arc(m+Math.cos(M)*(h.r+16),x+Math.sin(M)*(h.r+16),5,0,pe),l.fill()}l.fillStyle=h.phase?T.red:T.blush,l.beginPath(),l.arc(m,x,8,0,pe),l.fill();break}}h.elite&&(l.strokeStyle=T.blush,l.lineWidth=3,l.setLineDash([6,4]),l.beginPath(),l.arc(m,x,h.r+6,0,pe),l.stroke(),l.setLineDash([]))}}drawTelegraph(t,e){const n=this.ctx,s=.45+.4*Math.sin(e*40);if(t.kind==="spitter"&&t.state===1){const r=1-t.timer/.7;n.strokeStyle=T.red,n.globalAlpha=.25+.6*r,n.lineWidth=2+4*r,n.beginPath(),n.moveTo(t.x,t.y),n.lineTo(t.x+Math.cos(t.ang)*520,t.y+Math.sin(t.ang)*520),n.stroke(),n.globalAlpha=1}else if(t.kind==="rammer"&&t.state===1){n.fillStyle=T.blush,n.globalAlpha=.14+.18*s;const r=480*.55+40;n.save(),n.translate(t.x,t.y),n.rotate(t.ang),n.fillRect(0,-t.r,r,t.r*2),n.restore(),n.globalAlpha=1}else t.kind==="caster"&&t.state===1?(n.strokeStyle=T.red,n.globalAlpha=.7,n.lineWidth=2,n.setLineDash([6,6]),n.beginPath(),n.arc(t.tx,t.ty,44,0,pe),n.stroke(),n.setLineDash([]),n.globalAlpha=1):t.kind==="warden"&&t.state===1&&(n.strokeStyle=T.red,n.globalAlpha=.5+.4*Math.sin(e*28),n.lineWidth=5,n.beginPath(),n.arc(t.x,t.y,t.r+30+(1-t.timer/.8)*30,0,pe),n.stroke(),t.tx===3&&(n.lineWidth=36,n.globalAlpha=.25,n.beginPath(),n.moveTo(t.x,t.y),n.lineTo(t.x+Math.cos(t.ang)*330,t.y+Math.sin(t.ang)*330),n.stroke()),n.globalAlpha=1)}drawBullets(t,e,n,s,r,a){const o=this.ctx;o.globalCompositeOperation="lighter";for(const l of t.bullets.list)l.x<n||l.x>s||l.y<r||l.y>a||(l.friendly?this.drawGlow(l.x,l.y,l.kind===1?16:12,l.kind===1?T.tan:l.kind===2?T.white:T.bone,.6):this.drawGlow(l.x,l.y,l.r*3.4,l.kind===1?T.blush:T.red,.7));o.globalAlpha=1,o.globalCompositeOperation="source-over";for(const l of t.bullets.list)if(!(l.x<n||l.x>s||l.y<r||l.y>a))if(l.friendly){o.strokeStyle=l.kind===1?T.tan:T.bone,o.lineWidth=l.kind===1?4:3,o.lineCap="round";const c=Math.hypot(l.vx,l.vy)||1;o.beginPath(),o.moveTo(l.x-l.vx/c*9,l.y-l.vy/c*9),o.lineTo(l.x,l.y),o.stroke(),o.lineCap="butt"}else e.outline&&(o.fillStyle=T.ink,o.beginPath(),o.arc(l.x,l.y,l.r+3,0,pe),o.fill()),o.fillStyle=l.kind===1?T.blush:T.red,o.beginPath(),o.arc(l.x,l.y,l.r,0,pe),o.fill(),o.fillStyle=T.bone,o.beginPath(),o.arc(l.x,l.y,l.r*.45,0,pe),o.fill()}drawPlayerStuff(t,e){const n=this.ctx,s=t.player,r=t.levels;if(t.state==="dead"&&t.deathTimer>.05)return;if(r.siphon>0&&r.bulwark>0)if(s.fieldOn){const o=s.fieldR,l=n.createRadialGradient(s.x,s.y,o*.4,s.x,s.y,o);l.addColorStop(0,kt(T.bone,.02)),l.addColorStop(1,kt(T.bone,.2)),n.fillStyle=l,n.beginPath(),n.arc(s.x,s.y,o,0,pe),n.fill(),n.strokeStyle=T.bone,n.lineWidth=3,n.beginPath(),n.arc(s.x,s.y,o,0,pe),n.stroke(),n.setLineDash([10,14]),n.lineWidth=2,n.strokeStyle=T.tan,n.lineDashOffset=-e*40,n.beginPath(),n.arc(s.x,s.y,o-8,0,pe),n.stroke(),n.setLineDash([])}else s.hold&&(n.strokeStyle=T.tan,n.lineWidth=2,n.setLineDash([4,6]),n.beginPath(),n.arc(s.x,s.y,26+s.reserve*.1,0,pe),n.stroke(),n.setLineDash([]));if(r.orbit>0){const l=s.fieldOn&&r.bulwark>0&&r.siphon>0?s.fieldR+10:64,c=r.orbit+1;for(let h=0;h<c;h++){const u=s.orbitAngle+h/c*pe,f=s.x+Math.cos(u)*l,d=s.y+Math.sin(u)*l;n.save(),n.translate(f,d),n.rotate(u+Math.PI/2),n.fillStyle=T.bone,n.strokeStyle=T.tan,n.lineWidth=2,n.beginPath(),n.moveTo(0,-11),n.lineTo(5,0),n.lineTo(0,9),n.lineTo(-5,0),n.closePath(),n.fill(),n.stroke(),n.restore()}}const a=s.iframes>0&&Math.floor(e*18)%2===0;n.globalCompositeOperation="lighter",this.drawGlow(s.x,s.y,34,s.flash>0?T.red:T.bone,.45),n.globalAlpha=1,n.globalCompositeOperation="source-over",a||(n.save(),n.translate(s.x,s.y),n.rotate(s.facing),n.fillStyle=T.bone,n.strokeStyle=T.tan,n.lineWidth=3,n.lineJoin="round",n.beginPath(),n.moveTo(15,0),n.lineTo(-11,11),n.lineTo(-5,0),n.lineTo(-11,-11),n.closePath(),n.fill(),n.stroke(),n.fillStyle=T.wine,n.beginPath(),n.arc(-1,0,3,0,pe),n.fill(),n.restore())}drawFx(t,e,n,s,r,a){const o=this.ctx;o.globalCompositeOperation="lighter";for(const l of t.rings)o.globalAlpha=Math.max(0,l.life/l.max)*(a.reducedFlash?.5:1),o.strokeStyle=l.color,o.lineWidth=l.w,o.beginPath(),o.arc(l.x,l.y,l.r,0,pe),o.stroke();for(const l of t.beams){o.globalAlpha=Math.max(0,l.life/l.max),o.strokeStyle=l.color,o.lineWidth=l.w,o.lineCap="round",o.lineJoin="round",o.beginPath();for(let c=0;c<l.pts.length;c+=2)c===0?o.moveTo(l.pts[0],l.pts[1]):o.lineTo(l.pts[c],l.pts[c+1]);o.stroke(),o.lineCap="butt"}for(const l of t.particles)!l.alive||l.x<e||l.x>n||l.y<s||l.y>r||(o.globalAlpha=Math.max(0,l.life/l.max),o.fillStyle=l.color,o.fillRect(l.x-l.size/2,l.y-l.size/2,l.size,l.size));o.globalAlpha=1,o.globalCompositeOperation="source-over",o.textAlign="center";for(const l of t.pops)o.globalAlpha=Math.min(1,l.life/.3),o.font=l.big?`700 16px ${Fs.slab}`:`600 13px ${Fs.slab}`,o.fillStyle=T.ink,o.fillText(l.text,l.x+1,l.y+1),o.fillStyle=l.color,o.fillText(l.text,l.x,l.y);o.globalAlpha=1}screenToWorld(t,e){return{x:this.camX+(t*this.dpr-this.W/2)/this.S,y:this.camY+(e*this.dpr-this.H/2)/this.S}}resetRun(t){this.snap=!0}setQuality(t){}dispose(){this.glows.clear()}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rl="170",Od=0,jl=1,kd=2,eu=1,Bd=2,Un=3,ei=0,He=1,Qe=2,On=0,$i=1,Bn=2,Ql=3,tc=4,zd=5,ui=100,Hd=101,Gd=102,Vd=103,Wd=104,Xd=200,qd=201,Yd=202,$d=203,no=204,io=205,Zd=206,Kd=207,Jd=208,jd=209,Qd=210,tp=211,ep=212,np=213,ip=214,so=0,ro=1,ao=2,ji=3,oo=4,lo=5,co=6,ho=7,nu=0,sp=1,rp=2,ti=0,iu=1,su=2,ru=3,al=4,ap=5,au=6,ou=7,lu=300,Qi=301,ts=302,uo=303,fo=304,$r=306,Os=1e3,di=1001,po=1002,en=1003,op=1004,js=1005,bn=1006,fa=1007,pi=1008,zn=1009,cu=1010,hu=1011,ks=1012,ol=1013,_i=1014,En=1015,xn=1016,ll=1017,cl=1018,es=1020,uu=35902,fu=1021,du=1022,vn=1023,pu=1024,mu=1025,Zi=1026,ns=1027,hl=1028,ul=1029,gu=1030,fl=1031,dl=1033,Rr=33776,Pr=33777,Lr=33778,Dr=33779,mo=35840,go=35841,vo=35842,xo=35843,_o=36196,yo=37492,Mo=37496,So=37808,bo=37809,Eo=37810,To=37811,wo=37812,Ao=37813,Co=37814,Ro=37815,Po=37816,Lo=37817,Do=37818,Io=37819,Uo=37820,No=37821,Ir=36492,Fo=36494,Oo=36495,vu=36283,ko=36284,Bo=36285,zo=36286,lp=3200,cp=3201,xu=0,hp=1,Jn="",Xe="srgb",os="srgb-linear",Zr="linear",ce="srgb",Ai=7680,ec=519,up=512,fp=513,dp=514,_u=515,pp=516,mp=517,gp=518,vp=519,nc=35044,Qs=35048,ic="300 es",Fn=2e3,kr=2001;class ls{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Fe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],da=Math.PI/180,Ho=180/Math.PI;function cs(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Fe[i&255]+Fe[i>>8&255]+Fe[i>>16&255]+Fe[i>>24&255]+"-"+Fe[t&255]+Fe[t>>8&255]+"-"+Fe[t>>16&15|64]+Fe[t>>24&255]+"-"+Fe[e&63|128]+Fe[e>>8&255]+"-"+Fe[e>>16&255]+Fe[e>>24&255]+Fe[n&255]+Fe[n>>8&255]+Fe[n>>16&255]+Fe[n>>24&255]).toLowerCase()}function De(i,t,e){return Math.max(t,Math.min(e,i))}function xp(i,t){return(i%t+t)%t}function pa(i,t,e){return(1-e)*i+e*t}function ps(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function We(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class rt{constructor(t=0,e=0){rt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(De(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Wt{constructor(t,e,n,s,r,a,o,l,c){Wt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],x=s[0],g=s[3],p=s[6],M=s[1],v=s[4],_=s[7],C=s[2],w=s[5],R=s[8];return r[0]=a*x+o*M+l*C,r[3]=a*g+o*v+l*w,r[6]=a*p+o*_+l*R,r[1]=c*x+h*M+u*C,r[4]=c*g+h*v+u*w,r[7]=c*p+h*_+u*R,r[2]=f*x+d*M+m*C,r[5]=f*g+d*v+m*w,r[8]=f*p+d*_+m*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,m=e*u+n*f+s*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return t[0]=u*x,t[1]=(s*c-h*n)*x,t[2]=(o*n-s*a)*x,t[3]=f*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-o*e)*x,t[6]=d*x,t[7]=(n*l-c*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ma.makeScale(t,e)),this}rotate(t){return this.premultiply(ma.makeRotation(-t)),this}translate(t,e){return this.premultiply(ma.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ma=new Wt;function yu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Br(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function _p(){const i=Br("canvas");return i.style.display="block",i}const sc={};function bs(i){i in sc||(sc[i]=!0,console.warn(i))}function yp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Mp(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Sp(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Jt={enabled:!0,workingColorSpace:os,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ce&&(i.r=kn(i.r),i.g=kn(i.g),i.b=kn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ce&&(i.r=Ki(i.r),i.g=Ki(i.g),i.b=Ki(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Jn?Zr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function kn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ki(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const rc=[.64,.33,.3,.6,.15,.06],ac=[.2126,.7152,.0722],oc=[.3127,.329],lc=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cc=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Jt.define({[os]:{primaries:rc,whitePoint:oc,transfer:Zr,toXYZ:lc,fromXYZ:cc,luminanceCoefficients:ac,workingColorSpaceConfig:{unpackColorSpace:Xe},outputColorSpaceConfig:{drawingBufferColorSpace:Xe}},[Xe]:{primaries:rc,whitePoint:oc,transfer:ce,toXYZ:lc,fromXYZ:cc,luminanceCoefficients:ac,outputColorSpaceConfig:{drawingBufferColorSpace:Xe}}});let Ci;class bp{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ci===void 0&&(Ci=Br("canvas")),Ci.width=t.width,Ci.height=t.height;const n=Ci.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ci}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Br("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=kn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(kn(e[n]/255)*255):e[n]=kn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ep=0;class Mu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ep++}),this.uuid=cs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ga(s[a].image)):r.push(ga(s[a]))}else r=ga(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function ga(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?bp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Tp=0;class ke extends ls{constructor(t=ke.DEFAULT_IMAGE,e=ke.DEFAULT_MAPPING,n=di,s=di,r=bn,a=pi,o=vn,l=zn,c=ke.DEFAULT_ANISOTROPY,h=Jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tp++}),this.uuid=cs(),this.name="",this.source=new Mu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==lu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Os:t.x=t.x-Math.floor(t.x);break;case di:t.x=t.x<0?0:1;break;case po:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Os:t.y=t.y-Math.floor(t.y);break;case di:t.y=t.y<0?0:1;break;case po:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ke.DEFAULT_IMAGE=null;ke.DEFAULT_MAPPING=lu;ke.DEFAULT_ANISOTROPY=1;class oe{constructor(t=0,e=0,n=0,s=1){oe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(c+1)/2,_=(d+1)/2,C=(p+1)/2,w=(h+f)/4,R=(u+x)/4,L=(m+g)/4;return v>_&&v>C?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=w/n,r=R/n):_>C?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=w/s,r=L/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=R/r,s=L/r),this.set(n,s,r,e),this}let M=Math.sqrt((g-m)*(g-m)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(g-m)/M,this.y=(u-x)/M,this.z=(f-h)/M,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class wp extends ls{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new oe(0,0,t,e),this.scissorTest=!1,this.viewport=new oe(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new ke(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Mu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class nn extends wp{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Su extends ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=en,this.minFilter=en,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ap extends ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=en,this.minFilter=en,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ni{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const f=r[a+0],d=r[a+1],m=r[a+2],x=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=m,t[e+3]=x;return}if(u!==x||l!==f||c!==d||h!==m){let g=1-o;const p=l*f+c*d+h*m+u*x,M=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const C=Math.sqrt(v),w=Math.atan2(C,p*M);g=Math.sin(g*w)/C,o=Math.sin(o*w)/C}const _=o*M;if(l=l*g+f*_,c=c*g+d*_,h=h*g+m*_,u=u*g+x*_,g===1-o){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],f=r[a+1],d=r[a+2],m=r[a+3];return t[e]=o*m+h*u+l*d-c*f,t[e+1]=l*m+h*f+c*u-o*d,t[e+2]=c*m+h*d+o*f-l*u,t[e+3]=h*m-o*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),f=l(n/2),d=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u+f*d*m;break;case"YZX":this._x=f*h*u+c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u-f*d*m;break;case"XZY":this._x=f*h*u-c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u+f*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(n>o&&n>u){const d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>u){const d=2*Math.sqrt(1+o-n-u);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(De(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(hc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(hc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return va.copy(this).projectOnVector(t),this.sub(va)}reflect(t){return this.sub(va.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(De(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const va=new I,hc=new ni;class Ei{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(un.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(un.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=un.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,un):un.fromBufferAttribute(r,a),un.applyMatrix4(t.matrixWorld),this.expandByPoint(un);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),tr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),tr.copy(n.boundingBox)),tr.applyMatrix4(t.matrixWorld),this.union(tr)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,un),un.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ms),er.subVectors(this.max,ms),Ri.subVectors(t.a,ms),Pi.subVectors(t.b,ms),Li.subVectors(t.c,ms),Wn.subVectors(Pi,Ri),Xn.subVectors(Li,Pi),si.subVectors(Ri,Li);let e=[0,-Wn.z,Wn.y,0,-Xn.z,Xn.y,0,-si.z,si.y,Wn.z,0,-Wn.x,Xn.z,0,-Xn.x,si.z,0,-si.x,-Wn.y,Wn.x,0,-Xn.y,Xn.x,0,-si.y,si.x,0];return!xa(e,Ri,Pi,Li,er)||(e=[1,0,0,0,1,0,0,0,1],!xa(e,Ri,Pi,Li,er))?!1:(nr.crossVectors(Wn,Xn),e=[nr.x,nr.y,nr.z],xa(e,Ri,Pi,Li,er))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,un).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(un).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Rn=[new I,new I,new I,new I,new I,new I,new I,new I],un=new I,tr=new Ei,Ri=new I,Pi=new I,Li=new I,Wn=new I,Xn=new I,si=new I,ms=new I,er=new I,nr=new I,ri=new I;function xa(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ri.fromArray(i,r);const o=s.x*Math.abs(ri.x)+s.y*Math.abs(ri.y)+s.z*Math.abs(ri.z),l=t.dot(ri),c=e.dot(ri),h=n.dot(ri);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Cp=new Ei,gs=new I,_a=new I;class Xs{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Cp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gs.subVectors(t,this.center);const e=gs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(gs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(_a.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gs.copy(t.center).add(_a)),this.expandByPoint(gs.copy(t.center).sub(_a))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Pn=new I,ya=new I,ir=new I,qn=new I,Ma=new I,sr=new I,Sa=new I;class bu{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Pn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Pn.copy(this.origin).addScaledVector(this.direction,e),Pn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ya.copy(t).add(e).multiplyScalar(.5),ir.copy(e).sub(t).normalize(),qn.copy(this.origin).sub(ya);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ir),o=qn.dot(this.direction),l=-qn.dot(ir),c=qn.lengthSq(),h=Math.abs(1-a*a);let u,f,d,m;if(h>0)if(u=a*l-o,f=a*o-l,m=r*h,u>=0)if(f>=-m)if(f<=m){const x=1/h;u*=x,f*=x,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-m?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=m?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ya).addScaledVector(ir,f),d}intersectSphere(t,e){Pn.subVectors(t.center,this.origin);const n=Pn.dot(this.direction),s=Pn.dot(Pn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Pn)!==null}intersectTriangle(t,e,n,s,r){Ma.subVectors(e,t),sr.subVectors(n,t),Sa.crossVectors(Ma,sr);let a=this.direction.dot(Sa),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;qn.subVectors(this.origin,t);const l=o*this.direction.dot(sr.crossVectors(qn,sr));if(l<0)return null;const c=o*this.direction.dot(Ma.cross(qn));if(c<0||l+c>a)return null;const h=-o*qn.dot(Sa);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ie{constructor(t,e,n,s,r,a,o,l,c,h,u,f,d,m,x,g){ie.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,u,f,d,m,x,g)}set(t,e,n,s,r,a,o,l,c,h,u,f,d,m,x,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ie().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Di.setFromMatrixColumn(t,0).length(),r=1/Di.setFromMatrixColumn(t,1).length(),a=1/Di.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,d=a*u,m=o*h,x=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+m*c,e[5]=f-x*c,e[9]=-o*l,e[2]=x-f*c,e[6]=m+d*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,m=c*h,x=c*u;e[0]=f+x*o,e[4]=m*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-m,e[6]=x+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,m=c*h,x=c*u;e[0]=f-x*o,e[4]=-a*u,e[8]=m+d*o,e[1]=d+m*o,e[5]=a*h,e[9]=x-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,d=a*u,m=o*h,x=o*u;e[0]=l*h,e[4]=m*c-d,e[8]=f*c+x,e[1]=l*u,e[5]=x*c+f,e[9]=d*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,d=a*c,m=o*l,x=o*c;e[0]=l*h,e[4]=x-f*u,e[8]=m*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+m,e[10]=f-x*u}else if(t.order==="XZY"){const f=a*l,d=a*c,m=o*l,x=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+x,e[5]=a*h,e[9]=d*u-m,e[2]=m*u-d,e[6]=o*h,e[10]=x*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Rp,t,Pp)}lookAt(t,e,n){const s=this.elements;return $e.subVectors(t,e),$e.lengthSq()===0&&($e.z=1),$e.normalize(),Yn.crossVectors(n,$e),Yn.lengthSq()===0&&(Math.abs(n.z)===1?$e.x+=1e-4:$e.z+=1e-4,$e.normalize(),Yn.crossVectors(n,$e)),Yn.normalize(),rr.crossVectors($e,Yn),s[0]=Yn.x,s[4]=rr.x,s[8]=$e.x,s[1]=Yn.y,s[5]=rr.y,s[9]=$e.y,s[2]=Yn.z,s[6]=rr.z,s[10]=$e.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],x=n[6],g=n[10],p=n[14],M=n[3],v=n[7],_=n[11],C=n[15],w=s[0],R=s[4],L=s[8],S=s[12],y=s[1],P=s[5],H=s[9],z=s[13],k=s[2],q=s[6],N=s[10],V=s[14],B=s[3],nt=s[7],ht=s[11],ft=s[15];return r[0]=a*w+o*y+l*k+c*B,r[4]=a*R+o*P+l*q+c*nt,r[8]=a*L+o*H+l*N+c*ht,r[12]=a*S+o*z+l*V+c*ft,r[1]=h*w+u*y+f*k+d*B,r[5]=h*R+u*P+f*q+d*nt,r[9]=h*L+u*H+f*N+d*ht,r[13]=h*S+u*z+f*V+d*ft,r[2]=m*w+x*y+g*k+p*B,r[6]=m*R+x*P+g*q+p*nt,r[10]=m*L+x*H+g*N+p*ht,r[14]=m*S+x*z+g*V+p*ft,r[3]=M*w+v*y+_*k+C*B,r[7]=M*R+v*P+_*q+C*nt,r[11]=M*L+v*H+_*N+C*ht,r[15]=M*S+v*z+_*V+C*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],m=t[3],x=t[7],g=t[11],p=t[15];return m*(+r*l*u-s*c*u-r*o*f+n*c*f+s*o*d-n*l*d)+x*(+e*l*d-e*c*f+r*a*f-s*a*d+s*c*h-r*l*h)+g*(+e*c*u-e*o*d-r*a*u+n*a*d+r*o*h-n*c*h)+p*(-s*o*h-e*l*u+e*o*f+s*a*u-n*a*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],m=t[12],x=t[13],g=t[14],p=t[15],M=u*g*c-x*f*c+x*l*d-o*g*d-u*l*p+o*f*p,v=m*f*c-h*g*c-m*l*d+a*g*d+h*l*p-a*f*p,_=h*x*c-m*u*c+m*o*d-a*x*d-h*o*p+a*u*p,C=m*u*l-h*x*l-m*o*f+a*x*f+h*o*g-a*u*g,w=e*M+n*v+s*_+r*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/w;return t[0]=M*R,t[1]=(x*f*r-u*g*r-x*s*d+n*g*d+u*s*p-n*f*p)*R,t[2]=(o*g*r-x*l*r+x*s*c-n*g*c-o*s*p+n*l*p)*R,t[3]=(u*l*r-o*f*r-u*s*c+n*f*c+o*s*d-n*l*d)*R,t[4]=v*R,t[5]=(h*g*r-m*f*r+m*s*d-e*g*d-h*s*p+e*f*p)*R,t[6]=(m*l*r-a*g*r-m*s*c+e*g*c+a*s*p-e*l*p)*R,t[7]=(a*f*r-h*l*r+h*s*c-e*f*c-a*s*d+e*l*d)*R,t[8]=_*R,t[9]=(m*u*r-h*x*r-m*n*d+e*x*d+h*n*p-e*u*p)*R,t[10]=(a*x*r-m*o*r+m*n*c-e*x*c-a*n*p+e*o*p)*R,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*d-e*o*d)*R,t[12]=C*R,t[13]=(h*x*s-m*u*s+m*n*f-e*x*f-h*n*g+e*u*g)*R,t[14]=(m*o*s-a*x*s-m*n*l+e*x*l+a*n*g-e*o*g)*R,t[15]=(a*u*s-h*o*s+h*n*l-e*u*l-a*n*f+e*o*f)*R,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,d=r*h,m=r*u,x=a*h,g=a*u,p=o*u,M=l*c,v=l*h,_=l*u,C=n.x,w=n.y,R=n.z;return s[0]=(1-(x+p))*C,s[1]=(d+_)*C,s[2]=(m-v)*C,s[3]=0,s[4]=(d-_)*w,s[5]=(1-(f+p))*w,s[6]=(g+M)*w,s[7]=0,s[8]=(m+v)*R,s[9]=(g-M)*R,s[10]=(1-(f+x))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Di.set(s[0],s[1],s[2]).length();const a=Di.set(s[4],s[5],s[6]).length(),o=Di.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],fn.copy(this);const c=1/r,h=1/a,u=1/o;return fn.elements[0]*=c,fn.elements[1]*=c,fn.elements[2]*=c,fn.elements[4]*=h,fn.elements[5]*=h,fn.elements[6]*=h,fn.elements[8]*=u,fn.elements[9]*=u,fn.elements[10]*=u,e.setFromRotationMatrix(fn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Fn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let d,m;if(o===Fn)d=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===kr)d=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Fn){const l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(a-r),f=(e+t)*c,d=(n+s)*h;let m,x;if(o===Fn)m=(a+r)*u,x=-2*u;else if(o===kr)m=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=x,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Di=new I,fn=new ie,Rp=new I(0,0,0),Pp=new I(1,1,1),Yn=new I,rr=new I,$e=new I,uc=new ie,fc=new ni;class _n{constructor(t=0,e=0,n=0,s=_n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(De(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-De(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(De(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-De(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(De(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-De(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return uc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(uc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return fc.setFromEuler(this),this.setFromQuaternion(fc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_n.DEFAULT_ORDER="XYZ";class pl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Lp=0;const dc=new I,Ii=new ni,Ln=new ie,ar=new I,vs=new I,Dp=new I,Ip=new ni,pc=new I(1,0,0),mc=new I(0,1,0),gc=new I(0,0,1),vc={type:"added"},Up={type:"removed"},Ui={type:"childadded",child:null},ba={type:"childremoved",child:null};class Ue extends ls{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Lp++}),this.uuid=cs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ue.DEFAULT_UP.clone();const t=new I,e=new _n,n=new ni,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ie},normalMatrix:{value:new Wt}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=Ue.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ue.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ii.setFromAxisAngle(t,e),this.quaternion.multiply(Ii),this}rotateOnWorldAxis(t,e){return Ii.setFromAxisAngle(t,e),this.quaternion.premultiply(Ii),this}rotateX(t){return this.rotateOnAxis(pc,t)}rotateY(t){return this.rotateOnAxis(mc,t)}rotateZ(t){return this.rotateOnAxis(gc,t)}translateOnAxis(t,e){return dc.copy(t).applyQuaternion(this.quaternion),this.position.add(dc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(pc,t)}translateY(t){return this.translateOnAxis(mc,t)}translateZ(t){return this.translateOnAxis(gc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ar.copy(t):ar.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(vs,ar,this.up):Ln.lookAt(ar,vs,this.up),this.quaternion.setFromRotationMatrix(Ln),s&&(Ln.extractRotation(s.matrixWorld),Ii.setFromRotationMatrix(Ln),this.quaternion.premultiply(Ii.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(vc),Ui.child=t,this.dispatchEvent(Ui),Ui.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Up),ba.child=t,this.dispatchEvent(ba),ba.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(vc),Ui.child=t,this.dispatchEvent(Ui),Ui.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,t,Dp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,Ip,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ue.DEFAULT_UP=new I(0,1,0);Ue.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ue.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const dn=new I,Dn=new I,Ea=new I,In=new I,Ni=new I,Fi=new I,xc=new I,Ta=new I,wa=new I,Aa=new I,Ca=new oe,Ra=new oe,Pa=new oe;class gn{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),dn.subVectors(t,e),s.cross(dn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){dn.subVectors(s,e),Dn.subVectors(n,e),Ea.subVectors(t,e);const a=dn.dot(dn),o=dn.dot(Dn),l=dn.dot(Ea),c=Dn.dot(Dn),h=Dn.dot(Ea),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-o*h)*f,m=(a*h-o*l)*f;return r.set(1-d-m,m,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,In)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,In.x),l.addScaledVector(a,In.y),l.addScaledVector(o,In.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return Ca.setScalar(0),Ra.setScalar(0),Pa.setScalar(0),Ca.fromBufferAttribute(t,e),Ra.fromBufferAttribute(t,n),Pa.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Ca,r.x),a.addScaledVector(Ra,r.y),a.addScaledVector(Pa,r.z),a}static isFrontFacing(t,e,n,s){return dn.subVectors(n,e),Dn.subVectors(t,e),dn.cross(Dn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return dn.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),dn.cross(Dn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return gn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return gn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return gn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return gn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return gn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Ni.subVectors(s,n),Fi.subVectors(r,n),Ta.subVectors(t,n);const l=Ni.dot(Ta),c=Fi.dot(Ta);if(l<=0&&c<=0)return e.copy(n);wa.subVectors(t,s);const h=Ni.dot(wa),u=Fi.dot(wa);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Ni,a);Aa.subVectors(t,r);const d=Ni.dot(Aa),m=Fi.dot(Aa);if(m>=0&&d<=m)return e.copy(r);const x=d*c-l*m;if(x<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(Fi,o);const g=h*m-d*u;if(g<=0&&u-h>=0&&d-m>=0)return xc.subVectors(r,s),o=(u-h)/(u-h+(d-m)),e.copy(s).addScaledVector(xc,o);const p=1/(g+x+f);return a=x*p,o=f*p,e.copy(n).addScaledVector(Ni,a).addScaledVector(Fi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Eu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$n={h:0,s:0,l:0},or={h:0,s:0,l:0};function La(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ut{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Xe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Jt.workingColorSpace){if(t=xp(t,1),e=De(e,0,1),n=De(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=La(a,r,t+1/3),this.g=La(a,r,t),this.b=La(a,r,t-1/3)}return Jt.toWorkingColorSpace(this,s),this}setStyle(t,e=Xe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Xe){const n=Eu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=kn(t.r),this.g=kn(t.g),this.b=kn(t.b),this}copyLinearToSRGB(t){return this.r=Ki(t.r),this.g=Ki(t.g),this.b=Ki(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Xe){return Jt.fromWorkingColorSpace(Oe.copy(this),t),Math.round(De(Oe.r*255,0,255))*65536+Math.round(De(Oe.g*255,0,255))*256+Math.round(De(Oe.b*255,0,255))}getHexString(t=Xe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.fromWorkingColorSpace(Oe.copy(this),e);const n=Oe.r,s=Oe.g,r=Oe.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.fromWorkingColorSpace(Oe.copy(this),e),t.r=Oe.r,t.g=Oe.g,t.b=Oe.b,t}getStyle(t=Xe){Jt.fromWorkingColorSpace(Oe.copy(this),t);const e=Oe.r,n=Oe.g,s=Oe.b;return t!==Xe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL($n),this.setHSL($n.h+t,$n.s+e,$n.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL($n),t.getHSL(or);const n=pa($n.h,or.h,e),s=pa($n.s,or.s,e),r=pa($n.l,or.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Oe=new Ut;Ut.NAMES=Eu;let Np=0;class qs extends ls{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Np++}),this.uuid=cs(),this.name="",this.blending=$i,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=no,this.blendDst=io,this.blendEquation=ui,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ut(0,0,0),this.blendAlpha=0,this.depthFunc=ji,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ec,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ai,this.stencilZFail=Ai,this.stencilZPass=Ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==$i&&(n.blending=this.blending),this.side!==ei&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==no&&(n.blendSrc=this.blendSrc),this.blendDst!==io&&(n.blendDst=this.blendDst),this.blendEquation!==ui&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ji&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ec&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ai&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ai&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ai&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class sn extends qs{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=nu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const we=new I,lr=new rt;class ln{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=nc,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)lr.fromBufferAttribute(this,e),lr.applyMatrix3(t),this.setXY(e,lr.x,lr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix3(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ps(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=We(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ps(e,this.array)),e}setX(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ps(e,this.array)),e}setY(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ps(e,this.array)),e}setZ(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ps(e,this.array)),e}setW(t,e){return this.normalized&&(e=We(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array),s=We(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=We(e,this.array),n=We(n,this.array),s=We(s,this.array),r=We(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==nc&&(t.usage=this.usage),t}}class Tu extends ln{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class wu extends ln{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ve extends ln{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Fp=0;const an=new ie,Da=new Ue,Oi=new I,Ze=new Ei,xs=new Ei,Pe=new I;class Ge extends ls{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fp++}),this.uuid=cs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yu(t)?wu:Tu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Wt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return an.makeRotationFromQuaternion(t),this.applyMatrix4(an),this}rotateX(t){return an.makeRotationX(t),this.applyMatrix4(an),this}rotateY(t){return an.makeRotationY(t),this.applyMatrix4(an),this}rotateZ(t){return an.makeRotationZ(t),this.applyMatrix4(an),this}translate(t,e,n){return an.makeTranslation(t,e,n),this.applyMatrix4(an),this}scale(t,e,n){return an.makeScale(t,e,n),this.applyMatrix4(an),this}lookAt(t){return Da.lookAt(t),Da.updateMatrix(),this.applyMatrix4(Da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Oi).negate(),this.translate(Oi.x,Oi.y,Oi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ve(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ei);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ze.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,Ze.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,Ze.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(Ze.min),this.boundingBox.expandByPoint(Ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(Ze.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];xs.setFromBufferAttribute(o),this.morphTargetsRelative?(Pe.addVectors(Ze.min,xs.min),Ze.expandByPoint(Pe),Pe.addVectors(Ze.max,xs.max),Ze.expandByPoint(Pe)):(Ze.expandByPoint(xs.min),Ze.expandByPoint(xs.max))}Ze.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Pe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Pe));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Pe.fromBufferAttribute(o,c),l&&(Oi.fromBufferAttribute(t,c),Pe.add(Oi)),s=Math.max(s,n.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ln(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let L=0;L<n.count;L++)o[L]=new I,l[L]=new I;const c=new I,h=new I,u=new I,f=new rt,d=new rt,m=new rt,x=new I,g=new I;function p(L,S,y){c.fromBufferAttribute(n,L),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,y),f.fromBufferAttribute(r,L),d.fromBufferAttribute(r,S),m.fromBufferAttribute(r,y),h.sub(c),u.sub(c),d.sub(f),m.sub(f);const P=1/(d.x*m.y-m.x*d.y);isFinite(P)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(P),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(P),o[L].add(x),o[S].add(x),o[y].add(x),l[L].add(g),l[S].add(g),l[y].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let L=0,S=M.length;L<S;++L){const y=M[L],P=y.start,H=y.count;for(let z=P,k=P+H;z<k;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const v=new I,_=new I,C=new I,w=new I;function R(L){C.fromBufferAttribute(s,L),w.copy(C);const S=o[L];v.copy(S),v.sub(C.multiplyScalar(C.dot(S))).normalize(),_.crossVectors(w,S);const P=_.dot(l[L])<0?-1:1;a.setXYZW(L,v.x,v.y,v.z,P)}for(let L=0,S=M.length;L<S;++L){const y=M[L],P=y.start,H=y.count;for(let z=P,k=P+H;z<k;z+=3)R(t.getX(z+0)),R(t.getX(z+1)),R(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ln(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new I,r=new I,a=new I,o=new I,l=new I,c=new I,h=new I,u=new I;if(t)for(let f=0,d=t.count;f<d;f+=3){const m=t.getX(f+0),x=t.getX(f+1),g=t.getX(f+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,g),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let d=0,m=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?d=l[x]*o.data.stride+o.offset:d=l[x]*h;for(let p=0;p<h;p++)f[m++]=c[d++]}return new ln(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ge,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _c=new ie,ai=new bu,cr=new Xs,yc=new I,hr=new I,ur=new I,fr=new I,Ia=new I,dr=new I,Mc=new I,pr=new I;class ue extends Ue{constructor(t=new Ge,e=new sn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){dr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Ia.fromBufferAttribute(u,t),a?dr.addScaledVector(Ia,h):dr.addScaledVector(Ia.sub(e),h))}e.add(dr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),cr.copy(n.boundingSphere),cr.applyMatrix4(r),ai.copy(t.ray).recast(t.near),!(cr.containsPoint(ai.origin)===!1&&(ai.intersectSphere(cr,yc)===null||ai.origin.distanceToSquared(yc)>(t.far-t.near)**2))&&(_c.copy(r).invert(),ai.copy(t.ray).applyMatrix4(_c),!(n.boundingBox!==null&&ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ai)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,x=f.length;m<x;m++){const g=f[m],p=a[g.materialIndex],M=Math.max(g.start,d.start),v=Math.min(o.count,Math.min(g.start+g.count,d.start+d.count));for(let _=M,C=v;_<C;_+=3){const w=o.getX(_),R=o.getX(_+1),L=o.getX(_+2);s=mr(this,p,t,n,c,h,u,w,R,L),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,d.start),x=Math.min(o.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){const M=o.getX(g),v=o.getX(g+1),_=o.getX(g+2);s=mr(this,a,t,n,c,h,u,M,v,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,x=f.length;m<x;m++){const g=f[m],p=a[g.materialIndex],M=Math.max(g.start,d.start),v=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let _=M,C=v;_<C;_+=3){const w=_,R=_+1,L=_+2;s=mr(this,p,t,n,c,h,u,w,R,L),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){const M=g,v=g+1,_=g+2;s=mr(this,a,t,n,c,h,u,M,v,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Op(i,t,e,n,s,r,a,o){let l;if(t.side===He?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===ei,o),l===null)return null;pr.copy(o),pr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(pr);return c<e.near||c>e.far?null:{distance:c,point:pr.clone(),object:i}}function mr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,hr),i.getVertexPosition(l,ur),i.getVertexPosition(c,fr);const h=Op(i,t,e,n,hr,ur,fr,Mc);if(h){const u=new I;gn.getBarycoord(Mc,hr,ur,fr,u),s&&(h.uv=gn.getInterpolatedAttribute(s,o,l,c,u,new rt)),r&&(h.uv1=gn.getInterpolatedAttribute(r,o,l,c,u,new rt)),a&&(h.normal=gn.getInterpolatedAttribute(a,o,l,c,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new I,materialIndex:0};gn.getNormal(hr,ur,fr,f.normal),h.face=f,h.barycoord=u}return h}class he extends Ge{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,d=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,s,a,2),m("x","z","y",1,-1,t,n,-e,s,a,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ve(c,3)),this.setAttribute("normal",new ve(h,3)),this.setAttribute("uv",new ve(u,2));function m(x,g,p,M,v,_,C,w,R,L,S){const y=_/R,P=C/L,H=_/2,z=C/2,k=w/2,q=R+1,N=L+1;let V=0,B=0;const nt=new I;for(let ht=0;ht<N;ht++){const ft=ht*P-z;for(let Dt=0;Dt<q;Dt++){const Ht=Dt*y-H;nt[x]=Ht*M,nt[g]=ft*v,nt[p]=k,c.push(nt.x,nt.y,nt.z),nt[x]=0,nt[g]=0,nt[p]=w>0?1:-1,h.push(nt.x,nt.y,nt.z),u.push(Dt/R),u.push(1-ht/L),V+=1}}for(let ht=0;ht<L;ht++)for(let ft=0;ft<R;ft++){const Dt=f+ft+q*ht,Ht=f+ft+q*(ht+1),Z=f+(ft+1)+q*(ht+1),it=f+(ft+1)+q*ht;l.push(Dt,Ht,it),l.push(Ht,Z,it),B+=6}o.addGroup(d,B,S),d+=B,f+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new he(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function is(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Be(i){const t={};for(let e=0;e<i.length;e++){const n=is(i[e]);for(const s in n)t[s]=n[s]}return t}function kp(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Au(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const ss={clone:is,merge:Be};var Bp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ae extends qs{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bp,this.fragmentShader=zp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=is(t.uniforms),this.uniformsGroups=kp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Cu extends Ue{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=Fn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Zn=new I,Sc=new rt,bc=new rt;class qe extends Cu{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ho*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(da*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ho*2*Math.atan(Math.tan(da*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Zn.x,Zn.y).multiplyScalar(-t/Zn.z),Zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Zn.x,Zn.y).multiplyScalar(-t/Zn.z)}getViewSize(t,e){return this.getViewBounds(t,Sc,bc),e.subVectors(bc,Sc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(da*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ki=-90,Bi=1;class Hp extends Ue{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new qe(ki,Bi,t,e);s.layers=this.layers,this.add(s);const r=new qe(ki,Bi,t,e);r.layers=this.layers,this.add(r);const a=new qe(ki,Bi,t,e);a.layers=this.layers,this.add(a);const o=new qe(ki,Bi,t,e);o.layers=this.layers,this.add(o);const l=new qe(ki,Bi,t,e);l.layers=this.layers,this.add(l);const c=new qe(ki,Bi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===kr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Ru extends ke{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Qi,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Gp extends nn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Ru(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:bn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new he(5,5,5),r=new Ae({name:"CubemapFromEquirect",uniforms:is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:He,blending:On});r.uniforms.tEquirect.value=e;const a=new ue(s,r),o=e.minFilter;return e.minFilter===pi&&(e.minFilter=bn),new Hp(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const Ua=new I,Vp=new I,Wp=new Wt;class Nn{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ua.subVectors(n,e).cross(Vp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ua),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Wp.getNormalMatrix(t),s=this.coplanarPoint(Ua).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const oi=new Xs,gr=new I;class ml{constructor(t=new Nn,e=new Nn,n=new Nn,s=new Nn,r=new Nn,a=new Nn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Fn){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],d=s[8],m=s[9],x=s[10],g=s[11],p=s[12],M=s[13],v=s[14],_=s[15];if(n[0].setComponents(l-r,f-c,g-d,_-p).normalize(),n[1].setComponents(l+r,f+c,g+d,_+p).normalize(),n[2].setComponents(l+a,f+h,g+m,_+M).normalize(),n[3].setComponents(l-a,f-h,g-m,_-M).normalize(),n[4].setComponents(l-o,f-u,g-x,_-v).normalize(),e===Fn)n[5].setComponents(l+o,f+u,g+x,_+v).normalize();else if(e===kr)n[5].setComponents(o,u,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),oi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),oi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(oi)}intersectsSprite(t){return oi.center.set(0,0,0),oi.radius=.7071067811865476,oi.applyMatrix4(t.matrixWorld),this.intersectsSphere(oi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(gr.x=s.normal.x>0?t.max.x:t.min.x,gr.y=s.normal.y>0?t.max.y:t.min.y,gr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(gr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Pu(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Xp(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){const m=u[f],x=u[d];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++f,u[f]=x)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){const x=u[d];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class ze extends Ge{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=t/o,f=e/l,d=[],m=[],x=[],g=[];for(let p=0;p<h;p++){const M=p*f-a;for(let v=0;v<c;v++){const _=v*u-r;m.push(_,-M,0),x.push(0,0,1),g.push(v/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){const v=M+c*p,_=M+c*(p+1),C=M+1+c*(p+1),w=M+1+c*p;d.push(v,_,w),d.push(_,C,w)}this.setIndex(d),this.setAttribute("position",new ve(m,3)),this.setAttribute("normal",new ve(x,3)),this.setAttribute("uv",new ve(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ze(t.width,t.height,t.widthSegments,t.heightSegments)}}var qp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yp=`#ifdef USE_ALPHAHASH
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
#endif`,$p=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jp=`#ifdef USE_AOMAP
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
#endif`,Qp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tm=`#ifdef USE_BATCHING
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
#endif`,em=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,nm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,im=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,rm=`#ifdef USE_IRIDESCENCE
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
#endif`,am=`#ifdef USE_BUMPMAP
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
#endif`,om=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,lm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,um=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,fm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,dm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,pm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,mm=`#define PI 3.141592653589793
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
} // validated`,gm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,vm=`vec3 transformedNormal = objectNormal;
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
#endif`,xm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_m=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ym=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Mm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Sm="gl_FragColor = linearToOutputTexel( gl_FragColor );",bm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Em=`#ifdef USE_ENVMAP
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
#endif`,Tm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,wm=`#ifdef USE_ENVMAP
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
#endif`,Am=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cm=`#ifdef USE_ENVMAP
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
#endif`,Rm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Pm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Dm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Im=`#ifdef USE_GRADIENTMAP
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
}`,Um=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Nm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Fm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Om=`uniform bool receiveShadow;
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
#endif`,km=`#ifdef USE_ENVMAP
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
#endif`,Bm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Gm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vm=`PhysicalMaterial material;
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
#endif`,Wm=`struct PhysicalMaterial {
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
}`,Xm=`
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
#endif`,qm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ym=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$m=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Km=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,jm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,t0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,e0=`#if defined( USE_POINTS_UV )
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
#endif`,n0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,i0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,s0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,r0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,a0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,o0=`#ifdef USE_MORPHTARGETS
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
#endif`,l0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,c0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,h0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,u0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,f0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,d0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,p0=`#ifdef USE_NORMALMAP
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
#endif`,m0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,g0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,v0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,x0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,y0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,M0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,S0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,b0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,E0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,T0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,w0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,A0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,C0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,R0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,P0=`float getShadowMask() {
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
}`,L0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,D0=`#ifdef USE_SKINNING
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
#endif`,I0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,U0=`#ifdef USE_SKINNING
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
#endif`,N0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,F0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,O0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,k0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,B0=`#ifdef USE_TRANSMISSION
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
#endif`,z0=`#ifdef USE_TRANSMISSION
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
#endif`,H0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,G0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,V0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,W0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const X0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,q0=`uniform sampler2D t2D;
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
}`,Y0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,K0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,J0=`#include <common>
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
}`,j0=`#if DEPTH_PACKING == 3200
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
}`,Q0=`#define DISTANCE
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
}`,tg=`#define DISTANCE
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
}`,eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ng=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ig=`uniform float scale;
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
}`,sg=`uniform vec3 diffuse;
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
}`,rg=`#include <common>
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
}`,ag=`uniform vec3 diffuse;
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
}`,og=`#define LAMBERT
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
}`,lg=`#define LAMBERT
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
}`,cg=`#define MATCAP
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
}`,hg=`#define MATCAP
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
}`,ug=`#define NORMAL
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
}`,fg=`#define NORMAL
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
}`,dg=`#define PHONG
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
}`,pg=`#define PHONG
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
}`,mg=`#define STANDARD
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
}`,gg=`#define STANDARD
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
}`,vg=`#define TOON
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
}`,xg=`#define TOON
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
}`,_g=`uniform float size;
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
}`,yg=`uniform vec3 diffuse;
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
}`,Mg=`#include <common>
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
}`,Sg=`uniform vec3 color;
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
}`,bg=`uniform float rotation;
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
}`,Eg=`uniform vec3 diffuse;
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
}`,qt={alphahash_fragment:qp,alphahash_pars_fragment:Yp,alphamap_fragment:$p,alphamap_pars_fragment:Zp,alphatest_fragment:Kp,alphatest_pars_fragment:Jp,aomap_fragment:jp,aomap_pars_fragment:Qp,batching_pars_vertex:tm,batching_vertex:em,begin_vertex:nm,beginnormal_vertex:im,bsdfs:sm,iridescence_fragment:rm,bumpmap_pars_fragment:am,clipping_planes_fragment:om,clipping_planes_pars_fragment:lm,clipping_planes_pars_vertex:cm,clipping_planes_vertex:hm,color_fragment:um,color_pars_fragment:fm,color_pars_vertex:dm,color_vertex:pm,common:mm,cube_uv_reflection_fragment:gm,defaultnormal_vertex:vm,displacementmap_pars_vertex:xm,displacementmap_vertex:_m,emissivemap_fragment:ym,emissivemap_pars_fragment:Mm,colorspace_fragment:Sm,colorspace_pars_fragment:bm,envmap_fragment:Em,envmap_common_pars_fragment:Tm,envmap_pars_fragment:wm,envmap_pars_vertex:Am,envmap_physical_pars_fragment:km,envmap_vertex:Cm,fog_vertex:Rm,fog_pars_vertex:Pm,fog_fragment:Lm,fog_pars_fragment:Dm,gradientmap_pars_fragment:Im,lightmap_pars_fragment:Um,lights_lambert_fragment:Nm,lights_lambert_pars_fragment:Fm,lights_pars_begin:Om,lights_toon_fragment:Bm,lights_toon_pars_fragment:zm,lights_phong_fragment:Hm,lights_phong_pars_fragment:Gm,lights_physical_fragment:Vm,lights_physical_pars_fragment:Wm,lights_fragment_begin:Xm,lights_fragment_maps:qm,lights_fragment_end:Ym,logdepthbuf_fragment:$m,logdepthbuf_pars_fragment:Zm,logdepthbuf_pars_vertex:Km,logdepthbuf_vertex:Jm,map_fragment:jm,map_pars_fragment:Qm,map_particle_fragment:t0,map_particle_pars_fragment:e0,metalnessmap_fragment:n0,metalnessmap_pars_fragment:i0,morphinstance_vertex:s0,morphcolor_vertex:r0,morphnormal_vertex:a0,morphtarget_pars_vertex:o0,morphtarget_vertex:l0,normal_fragment_begin:c0,normal_fragment_maps:h0,normal_pars_fragment:u0,normal_pars_vertex:f0,normal_vertex:d0,normalmap_pars_fragment:p0,clearcoat_normal_fragment_begin:m0,clearcoat_normal_fragment_maps:g0,clearcoat_pars_fragment:v0,iridescence_pars_fragment:x0,opaque_fragment:_0,packing:y0,premultiplied_alpha_fragment:M0,project_vertex:S0,dithering_fragment:b0,dithering_pars_fragment:E0,roughnessmap_fragment:T0,roughnessmap_pars_fragment:w0,shadowmap_pars_fragment:A0,shadowmap_pars_vertex:C0,shadowmap_vertex:R0,shadowmask_pars_fragment:P0,skinbase_vertex:L0,skinning_pars_vertex:D0,skinning_vertex:I0,skinnormal_vertex:U0,specularmap_fragment:N0,specularmap_pars_fragment:F0,tonemapping_fragment:O0,tonemapping_pars_fragment:k0,transmission_fragment:B0,transmission_pars_fragment:z0,uv_pars_fragment:H0,uv_pars_vertex:G0,uv_vertex:V0,worldpos_vertex:W0,background_vert:X0,background_frag:q0,backgroundCube_vert:Y0,backgroundCube_frag:$0,cube_vert:Z0,cube_frag:K0,depth_vert:J0,depth_frag:j0,distanceRGBA_vert:Q0,distanceRGBA_frag:tg,equirect_vert:eg,equirect_frag:ng,linedashed_vert:ig,linedashed_frag:sg,meshbasic_vert:rg,meshbasic_frag:ag,meshlambert_vert:og,meshlambert_frag:lg,meshmatcap_vert:cg,meshmatcap_frag:hg,meshnormal_vert:ug,meshnormal_frag:fg,meshphong_vert:dg,meshphong_frag:pg,meshphysical_vert:mg,meshphysical_frag:gg,meshtoon_vert:vg,meshtoon_frag:xg,points_vert:_g,points_frag:yg,shadow_vert:Mg,shadow_frag:Sg,sprite_vert:bg,sprite_frag:Eg},dt={common:{diffuse:{value:new Ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new Ut(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},Mn={basic:{uniforms:Be([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:Be([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Ut(0)}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:Be([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Ut(0)},specular:{value:new Ut(1118481)},shininess:{value:30}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:Be([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:Be([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Ut(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:Be([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:Be([dt.points,dt.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:Be([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:Be([dt.common,dt.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:Be([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:Be([dt.sprite,dt.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distanceRGBA:{uniforms:Be([dt.common,dt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distanceRGBA_vert,fragmentShader:qt.distanceRGBA_frag},shadow:{uniforms:Be([dt.lights,dt.fog,{color:{value:new Ut(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};Mn.physical={uniforms:Be([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new Ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new Ut(0)},specularColor:{value:new Ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};const vr={r:0,b:0,g:0},li=new _n,Tg=new ie;function wg(i,t,e,n,s,r,a){const o=new Ut(0);let l=r===!0?0:1,c,h,u=null,f=0,d=null;function m(M){let v=M.isScene===!0?M.background:null;return v&&v.isTexture&&(v=(M.backgroundBlurriness>0?e:t).get(v)),v}function x(M){let v=!1;const _=m(M);_===null?p(o,l):_&&_.isColor&&(p(_,1),v=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(M,v){const _=m(v);_&&(_.isCubeTexture||_.mapping===$r)?(h===void 0&&(h=new ue(new he(1,1,1),new Ae({name:"BackgroundCubeMaterial",uniforms:is(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:He,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),li.copy(v.backgroundRotation),li.x*=-1,li.y*=-1,li.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(li.y*=-1,li.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Tg.makeRotationFromEuler(li)),h.material.toneMapped=Jt.getTransfer(_.colorSpace)!==ce,(u!==_||f!==_.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=_,f=_.version,d=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new ue(new ze(2,2),new Ae({name:"BackgroundMaterial",uniforms:is(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Jt.getTransfer(_.colorSpace)!==ce,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||f!==_.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=_,f=_.version,d=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,v){M.getRGB(vr,Au(i)),n.buffers.color.setClear(vr.r,vr.g,vr.b,v,a)}return{getClearColor:function(){return o},setClearColor:function(M,v=1){o.set(M),l=v,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(o,l)},render:x,addToRenderList:g}}function Ag(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(y,P,H,z,k){let q=!1;const N=u(z,H,P);r!==N&&(r=N,c(r.object)),q=d(y,z,H,k),q&&m(y,z,H,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,_(y,P,H,z),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,P,H){const z=H.wireframe===!0;let k=n[y.id];k===void 0&&(k={},n[y.id]=k);let q=k[P.id];q===void 0&&(q={},k[P.id]=q);let N=q[z];return N===void 0&&(N=f(l()),q[z]=N),N}function f(y){const P=[],H=[],z=[];for(let k=0;k<e;k++)P[k]=0,H[k]=0,z[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:H,attributeDivisors:z,object:y,attributes:{},index:null}}function d(y,P,H,z){const k=r.attributes,q=P.attributes;let N=0;const V=H.getAttributes();for(const B in V)if(V[B].location>=0){const ht=k[B];let ft=q[B];if(ft===void 0&&(B==="instanceMatrix"&&y.instanceMatrix&&(ft=y.instanceMatrix),B==="instanceColor"&&y.instanceColor&&(ft=y.instanceColor)),ht===void 0||ht.attribute!==ft||ft&&ht.data!==ft.data)return!0;N++}return r.attributesNum!==N||r.index!==z}function m(y,P,H,z){const k={},q=P.attributes;let N=0;const V=H.getAttributes();for(const B in V)if(V[B].location>=0){let ht=q[B];ht===void 0&&(B==="instanceMatrix"&&y.instanceMatrix&&(ht=y.instanceMatrix),B==="instanceColor"&&y.instanceColor&&(ht=y.instanceColor));const ft={};ft.attribute=ht,ht&&ht.data&&(ft.data=ht.data),k[B]=ft,N++}r.attributes=k,r.attributesNum=N,r.index=z}function x(){const y=r.newAttributes;for(let P=0,H=y.length;P<H;P++)y[P]=0}function g(y){p(y,0)}function p(y,P){const H=r.newAttributes,z=r.enabledAttributes,k=r.attributeDivisors;H[y]=1,z[y]===0&&(i.enableVertexAttribArray(y),z[y]=1),k[y]!==P&&(i.vertexAttribDivisor(y,P),k[y]=P)}function M(){const y=r.newAttributes,P=r.enabledAttributes;for(let H=0,z=P.length;H<z;H++)P[H]!==y[H]&&(i.disableVertexAttribArray(H),P[H]=0)}function v(y,P,H,z,k,q,N){N===!0?i.vertexAttribIPointer(y,P,H,k,q):i.vertexAttribPointer(y,P,H,z,k,q)}function _(y,P,H,z){x();const k=z.attributes,q=H.getAttributes(),N=P.defaultAttributeValues;for(const V in q){const B=q[V];if(B.location>=0){let nt=k[V];if(nt===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(nt=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(nt=y.instanceColor)),nt!==void 0){const ht=nt.normalized,ft=nt.itemSize,Dt=t.get(nt);if(Dt===void 0)continue;const Ht=Dt.buffer,Z=Dt.type,it=Dt.bytesPerElement,_t=Z===i.INT||Z===i.UNSIGNED_INT||nt.gpuType===ol;if(nt.isInterleavedBufferAttribute){const ot=nt.data,Rt=ot.stride,Ot=nt.offset;if(ot.isInstancedInterleavedBuffer){for(let It=0;It<B.locationSize;It++)p(B.location+It,ot.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let It=0;It<B.locationSize;It++)g(B.location+It);i.bindBuffer(i.ARRAY_BUFFER,Ht);for(let It=0;It<B.locationSize;It++)v(B.location+It,ft/B.locationSize,Z,ht,Rt*it,(Ot+ft/B.locationSize*It)*it,_t)}else{if(nt.isInstancedBufferAttribute){for(let ot=0;ot<B.locationSize;ot++)p(B.location+ot,nt.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let ot=0;ot<B.locationSize;ot++)g(B.location+ot);i.bindBuffer(i.ARRAY_BUFFER,Ht);for(let ot=0;ot<B.locationSize;ot++)v(B.location+ot,ft/B.locationSize,Z,ht,ft*it,ft/B.locationSize*ot*it,_t)}}else if(N!==void 0){const ht=N[V];if(ht!==void 0)switch(ht.length){case 2:i.vertexAttrib2fv(B.location,ht);break;case 3:i.vertexAttrib3fv(B.location,ht);break;case 4:i.vertexAttrib4fv(B.location,ht);break;default:i.vertexAttrib1fv(B.location,ht)}}}}M()}function C(){L();for(const y in n){const P=n[y];for(const H in P){const z=P[H];for(const k in z)h(z[k].object),delete z[k];delete P[H]}delete n[y]}}function w(y){if(n[y.id]===void 0)return;const P=n[y.id];for(const H in P){const z=P[H];for(const k in z)h(z[k].object),delete z[k];delete P[H]}delete n[y.id]}function R(y){for(const P in n){const H=n[P];if(H[y.id]===void 0)continue;const z=H[y.id];for(const k in z)h(z[k].object),delete z[k];delete H[y.id]}}function L(){S(),a=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:S,dispose:C,releaseStatesOfGeometry:w,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:g,disableUnusedAttributes:M}}function Cg(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let m=0;m<u;m++)d+=h[m];e.update(d,n,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<c.length;m++)a(c[m],h[m],f[m]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let m=0;for(let x=0;x<u;x++)m+=h[x]*f[x];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Rg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==vn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const L=R===xn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==zn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==En&&!L)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=m>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:M,maxVaryings:v,maxFragmentUniforms:_,vertexTextures:C,maxSamples:w}}function Pg(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Nn,o=new Wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const m=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):c();else{const M=r?0:n,v=M*4;let _=p.clippingState||null;l.value=_,_=h(m,f,v,d);for(let C=0;C!==v;++C)_[C]=e[C];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,m){const x=u!==null?u.length:0;let g=null;if(x!==0){if(g=l.value,m!==!0||g===null){const p=d+x*4,M=f.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<p)&&(g=new Float32Array(p));for(let v=0,_=d;v!==x;++v,_+=4)a.copy(u[v]).applyMatrix4(M,o),a.normal.toArray(g,_),g[_+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}function Lg(i){let t=new WeakMap;function e(a,o){return o===uo?a.mapping=Qi:o===fo&&(a.mapping=ts),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===uo||o===fo)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Gp(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class gl extends Cu{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Xi=4,Ec=[.125,.215,.35,.446,.526,.582],fi=20,Na=new gl,Tc=new Ut;let Fa=null,Oa=0,ka=0,Ba=!1;const hi=(1+Math.sqrt(5))/2,zi=1/hi,wc=[new I(-hi,zi,0),new I(hi,zi,0),new I(-zi,0,hi),new I(zi,0,hi),new I(0,hi,-zi),new I(0,hi,zi),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class Go{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Fa=this._renderer.getRenderTarget(),Oa=this._renderer.getActiveCubeFace(),ka=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Fa,Oa,ka),this._renderer.xr.enabled=Ba,t.scissorTest=!1,xr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Qi||t.mapping===ts?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Fa=this._renderer.getRenderTarget(),Oa=this._renderer.getActiveCubeFace(),ka=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:bn,minFilter:bn,generateMipmaps:!1,type:xn,format:vn,colorSpace:os,depthBuffer:!1},s=Ac(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ac(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Dg(r)),this._blurMaterial=Ig(r,t,e)}return s}_compileMaterial(t){const e=new ue(this._lodPlanes[0],t);this._renderer.compile(e,Na)}_sceneToCubeUV(t,e,n,s){const o=new qe(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Tc),h.toneMapping=ti,h.autoClear=!1;const d=new sn({name:"PMREM.Background",side:He,depthWrite:!1,depthTest:!1}),m=new ue(new he,d);let x=!1;const g=t.background;g?g.isColor&&(d.color.copy(g),t.background=null,x=!0):(d.color.copy(Tc),x=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):M===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const v=this._cubeSize;xr(s,M*v,p>2?v:0,v,v),h.setRenderTarget(s),x&&h.render(m,o),h.render(t,o)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Qi||t.mapping===ts;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new ue(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;xr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Na)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=wc[(s-r-1)%wc.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ue(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*fi-1),x=r/m,g=isFinite(r)?1+Math.floor(h*x):fi;g>fi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${fi}`);const p=[];let M=0;for(let R=0;R<fi;++R){const L=R/x,S=Math.exp(-L*L/2);p.push(S),R===0?M+=S:R<g&&(M+=2*S)}for(let R=0;R<p.length;R++)p[R]=p[R]/M;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:v}=this;f.dTheta.value=m,f.mipInt.value=v-n;const _=this._sizeLods[s],C=3*_*(s>v-Xi?s-v+Xi:0),w=4*(this._cubeSize-_);xr(e,C,w,3*_,2*_),l.setRenderTarget(e),l.render(u,Na)}}function Dg(i){const t=[],e=[],n=[];let s=i;const r=i-Xi+1+Ec.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Xi?l=Ec[a-i+Xi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,m=6,x=3,g=2,p=1,M=new Float32Array(x*m*d),v=new Float32Array(g*m*d),_=new Float32Array(p*m*d);for(let w=0;w<d;w++){const R=w%3*2/3-1,L=w>2?0:-1,S=[R,L,0,R+2/3,L,0,R+2/3,L+1,0,R,L,0,R+2/3,L+1,0,R,L+1,0];M.set(S,x*m*w),v.set(f,g*m*w);const y=[w,w,w,w,w,w];_.set(y,p*m*w)}const C=new Ge;C.setAttribute("position",new ln(M,x)),C.setAttribute("uv",new ln(v,g)),C.setAttribute("faceIndex",new ln(_,p)),t.push(C),s>Xi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ac(i,t,e){const n=new nn(i,t,e);return n.texture.mapping=$r,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function xr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Ig(i,t,e){const n=new Float32Array(fi),s=new I(0,1,0);return new Ae({name:"SphericalGaussianBlur",defines:{n:fi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:vl(),fragmentShader:`

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
		`,blending:On,depthTest:!1,depthWrite:!1})}function Cc(){return new Ae({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vl(),fragmentShader:`

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
		`,blending:On,depthTest:!1,depthWrite:!1})}function Rc(){return new Ae({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function vl(){return`

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
	`}function Ug(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===uo||l===fo,h=l===Qi||l===ts;if(c||h){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Go(i)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const d=o.image;return c&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Go(i)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Ng(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&bs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Fg(i,t,e,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const m in f.attributes)t.remove(f.attributes[m]);for(const m in f.morphAttributes){const x=f.morphAttributes[m];for(let g=0,p=x.length;g<p;g++)t.remove(x[g])}f.removeEventListener("dispose",a),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const m in f)t.update(f[m],i.ARRAY_BUFFER);const d=u.morphAttributes;for(const m in d){const x=d[m];for(let g=0,p=x.length;g<p;g++)t.update(x[g],i.ARRAY_BUFFER)}}function c(u){const f=[],d=u.index,m=u.attributes.position;let x=0;if(d!==null){const M=d.array;x=d.version;for(let v=0,_=M.length;v<_;v+=3){const C=M[v+0],w=M[v+1],R=M[v+2];f.push(C,w,w,R,R,C)}}else if(m!==void 0){const M=m.array;x=m.version;for(let v=0,_=M.length/3-1;v<_;v+=3){const C=v+0,w=v+1,R=v+2;f.push(C,w,w,R,R,C)}}else return;const g=new(yu(f)?wu:Tu)(f,1);g.version=x;const p=r.get(u);p&&t.remove(p),r.set(u,g)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Og(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*a),e.update(d,n,1)}function c(f,d,m){m!==0&&(i.drawElementsInstanced(n,d,r,f*a,m),e.update(d,n,m))}function h(f,d,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,m);let g=0;for(let p=0;p<m;p++)g+=d[p];e.update(g,n,1)}function u(f,d,m,x){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)c(f[p]/a,d[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,x,0,m);let p=0;for(let M=0;M<m;M++)p+=d[M]*x[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function kg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Bg(i,t,e){const n=new WeakMap,s=new oe;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let y=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var d=y;f!==void 0&&f.texture.dispose();const m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let _=0;m===!0&&(_=1),x===!0&&(_=2),g===!0&&(_=3);let C=o.attributes.position.count*_,w=1;C>t.maxTextureSize&&(w=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const R=new Float32Array(C*w*4*u),L=new Su(R,C,w,u);L.type=En,L.needsUpdate=!0;const S=_*4;for(let P=0;P<u;P++){const H=p[P],z=M[P],k=v[P],q=C*w*4*P;for(let N=0;N<H.count;N++){const V=N*S;m===!0&&(s.fromBufferAttribute(H,N),R[q+V+0]=s.x,R[q+V+1]=s.y,R[q+V+2]=s.z,R[q+V+3]=0),x===!0&&(s.fromBufferAttribute(z,N),R[q+V+4]=s.x,R[q+V+5]=s.y,R[q+V+6]=s.z,R[q+V+7]=0),g===!0&&(s.fromBufferAttribute(k,N),R[q+V+8]=s.x,R[q+V+9]=s.y,R[q+V+10]=s.z,R[q+V+11]=k.itemSize===4?s.w:1)}}f={count:u,texture:L,size:new rt(C,w)},n.set(o,f),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const x=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function zg(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class Lu extends ke{constructor(t,e,n,s,r,a,o,l,c,h=Zi){if(h!==Zi&&h!==ns)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Zi&&(n=_i),n===void 0&&h===ns&&(n=es),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:en,this.minFilter=l!==void 0?l:en,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Du=new ke,Pc=new Lu(1,1),Iu=new Su,Uu=new Ap,Nu=new Ru,Lc=[],Dc=[],Ic=new Float32Array(16),Uc=new Float32Array(9),Nc=new Float32Array(4);function hs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Lc[s];if(r===void 0&&(r=new Float32Array(s),Lc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ce(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Re(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Kr(i,t){let e=Dc[t];e===void 0&&(e=new Int32Array(t),Dc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Hg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Gg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2fv(this.addr,t),Re(e,t)}}function Vg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;i.uniform3fv(this.addr,t),Re(e,t)}}function Wg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4fv(this.addr,t),Re(e,t)}}function Xg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;Nc.set(n),i.uniformMatrix2fv(this.addr,!1,Nc),Re(e,n)}}function qg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;Uc.set(n),i.uniformMatrix3fv(this.addr,!1,Uc),Re(e,n)}}function Yg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Re(e,t)}else{if(Ce(e,n))return;Ic.set(n),i.uniformMatrix4fv(this.addr,!1,Ic),Re(e,n)}}function $g(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Zg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2iv(this.addr,t),Re(e,t)}}function Kg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3iv(this.addr,t),Re(e,t)}}function Jg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4iv(this.addr,t),Re(e,t)}}function jg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Qg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2uiv(this.addr,t),Re(e,t)}}function tv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3uiv(this.addr,t),Re(e,t)}}function ev(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4uiv(this.addr,t),Re(e,t)}}function nv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Pc.compareFunction=_u,r=Pc):r=Du,e.setTexture2D(t||r,s)}function iv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Uu,s)}function sv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Nu,s)}function rv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Iu,s)}function av(i){switch(i){case 5126:return Hg;case 35664:return Gg;case 35665:return Vg;case 35666:return Wg;case 35674:return Xg;case 35675:return qg;case 35676:return Yg;case 5124:case 35670:return $g;case 35667:case 35671:return Zg;case 35668:case 35672:return Kg;case 35669:case 35673:return Jg;case 5125:return jg;case 36294:return Qg;case 36295:return tv;case 36296:return ev;case 35678:case 36198:case 36298:case 36306:case 35682:return nv;case 35679:case 36299:case 36307:return iv;case 35680:case 36300:case 36308:case 36293:return sv;case 36289:case 36303:case 36311:case 36292:return rv}}function ov(i,t){i.uniform1fv(this.addr,t)}function lv(i,t){const e=hs(t,this.size,2);i.uniform2fv(this.addr,e)}function cv(i,t){const e=hs(t,this.size,3);i.uniform3fv(this.addr,e)}function hv(i,t){const e=hs(t,this.size,4);i.uniform4fv(this.addr,e)}function uv(i,t){const e=hs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function fv(i,t){const e=hs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function dv(i,t){const e=hs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function pv(i,t){i.uniform1iv(this.addr,t)}function mv(i,t){i.uniform2iv(this.addr,t)}function gv(i,t){i.uniform3iv(this.addr,t)}function vv(i,t){i.uniform4iv(this.addr,t)}function xv(i,t){i.uniform1uiv(this.addr,t)}function _v(i,t){i.uniform2uiv(this.addr,t)}function yv(i,t){i.uniform3uiv(this.addr,t)}function Mv(i,t){i.uniform4uiv(this.addr,t)}function Sv(i,t,e){const n=this.cache,s=t.length,r=Kr(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Du,r[a])}function bv(i,t,e){const n=this.cache,s=t.length,r=Kr(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Uu,r[a])}function Ev(i,t,e){const n=this.cache,s=t.length,r=Kr(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Nu,r[a])}function Tv(i,t,e){const n=this.cache,s=t.length,r=Kr(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Re(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Iu,r[a])}function wv(i){switch(i){case 5126:return ov;case 35664:return lv;case 35665:return cv;case 35666:return hv;case 35674:return uv;case 35675:return fv;case 35676:return dv;case 5124:case 35670:return pv;case 35667:case 35671:return mv;case 35668:case 35672:return gv;case 35669:case 35673:return vv;case 5125:return xv;case 36294:return _v;case 36295:return yv;case 36296:return Mv;case 35678:case 36198:case 36298:case 36306:case 35682:return Sv;case 35679:case 36299:case 36307:return bv;case 35680:case 36300:case 36308:case 36293:return Ev;case 36289:case 36303:case 36311:case 36292:return Tv}}class Av{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=av(e.type)}}class Cv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=wv(e.type)}}class Rv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const za=/(\w+)(\])?(\[|\.)?/g;function Fc(i,t){i.seq.push(t),i.map[t.id]=t}function Pv(i,t,e){const n=i.name,s=n.length;for(za.lastIndex=0;;){const r=za.exec(n),a=za.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Fc(e,c===void 0?new Av(o,i,t):new Cv(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new Rv(o),Fc(e,u)),e=u}}}class Ur{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Pv(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Oc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Lv=37297;let Dv=0;function Iv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const kc=new Wt;function Uv(i){Jt._getMatrix(kc,Jt.workingColorSpace,i);const t=`mat3( ${kc.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(i)){case Zr:return[t,"LinearTransferOETF"];case ce:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Bc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Iv(i.getShaderSource(t),a)}else return s}function Nv(i,t){const e=Uv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Fv(i,t){let e;switch(t){case iu:e="Linear";break;case su:e="Reinhard";break;case ru:e="Cineon";break;case al:e="ACESFilmic";break;case au:e="AgX";break;case ou:e="Neutral";break;case ap:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const _r=new I;function Ov(){Jt.getLuminanceCoefficients(_r);const i=_r.x.toFixed(4),t=_r.y.toFixed(4),e=_r.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function kv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Es).join(`
`)}function Bv(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function zv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Es(i){return i!==""}function zc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Hc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Hv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vo(i){return i.replace(Hv,Vv)}const Gv=new Map;function Vv(i,t){let e=qt[t];if(e===void 0){const n=Gv.get(t);if(n!==void 0)e=qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Vo(e)}const Wv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gc(i){return i.replace(Wv,Xv)}function Xv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Vc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function qv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===eu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Bd?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Un&&(t="SHADOWMAP_TYPE_VSM"),t}function Yv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Qi:case ts:t="ENVMAP_TYPE_CUBE";break;case $r:t="ENVMAP_TYPE_CUBE_UV";break}return t}function $v(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ts:t="ENVMAP_MODE_REFRACTION";break}return t}function Zv(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case nu:t="ENVMAP_BLENDING_MULTIPLY";break;case sp:t="ENVMAP_BLENDING_MIX";break;case rp:t="ENVMAP_BLENDING_ADD";break}return t}function Kv(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Jv(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=qv(e),c=Yv(e),h=$v(e),u=Zv(e),f=Kv(e),d=kv(e),m=Bv(r),x=s.createProgram();let g,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Es).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Es).join(`
`),p.length>0&&(p+=`
`)):(g=[Vc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Es).join(`
`),p=[Vc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ti?"#define TONE_MAPPING":"",e.toneMapping!==ti?qt.tonemapping_pars_fragment:"",e.toneMapping!==ti?Fv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,Nv("linearToOutputTexel",e.outputColorSpace),Ov(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Es).join(`
`)),a=Vo(a),a=zc(a,e),a=Hc(a,e),o=Vo(o),o=zc(o,e),o=Hc(o,e),a=Gc(a),o=Gc(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===ic?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ic?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=M+g+a,_=M+p+o,C=Oc(s,s.VERTEX_SHADER,v),w=Oc(s,s.FRAGMENT_SHADER,_);s.attachShader(x,C),s.attachShader(x,w),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function R(P){if(i.debug.checkShaderErrors){const H=s.getProgramInfoLog(x).trim(),z=s.getShaderInfoLog(C).trim(),k=s.getShaderInfoLog(w).trim();let q=!0,N=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,C,w);else{const V=Bc(s,C,"vertex"),B=Bc(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+H+`
`+V+`
`+B)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(z===""||k==="")&&(N=!1);N&&(P.diagnostics={runnable:q,programLog:H,vertexShader:{log:z,prefix:g},fragmentShader:{log:k,prefix:p}})}s.deleteShader(C),s.deleteShader(w),L=new Ur(s,x),S=zv(s,x)}let L;this.getUniforms=function(){return L===void 0&&R(this),L};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(x,Lv)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Dv++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=C,this.fragmentShader=w,this}let jv=0;class Qv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new tx(t),e.set(t,n)),n}}class tx{constructor(t){this.id=jv++,this.code=t,this.usedTimes=0}}function ex(i,t,e,n,s,r,a){const o=new pl,l=new Qv,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,y,P,H,z){const k=H.fog,q=z.geometry,N=S.isMeshStandardMaterial?H.environment:null,V=(S.isMeshStandardMaterial?e:t).get(S.envMap||N),B=V&&V.mapping===$r?V.image.height:null,nt=m[S.type];S.precision!==null&&(d=s.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const ht=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ft=ht!==void 0?ht.length:0;let Dt=0;q.morphAttributes.position!==void 0&&(Dt=1),q.morphAttributes.normal!==void 0&&(Dt=2),q.morphAttributes.color!==void 0&&(Dt=3);let Ht,Z,it,_t;if(nt){const le=Mn[nt];Ht=le.vertexShader,Z=le.fragmentShader}else Ht=S.vertexShader,Z=S.fragmentShader,l.update(S),it=l.getVertexShaderID(S),_t=l.getFragmentShaderID(S);const ot=i.getRenderTarget(),Rt=i.state.buffers.depth.getReversed(),Ot=z.isInstancedMesh===!0,It=z.isBatchedMesh===!0,Qt=!!S.map,Q=!!S.matcap,lt=!!V,D=!!S.aoMap,Pt=!!S.lightMap,st=!!S.bumpMap,St=!!S.normalMap,ut=!!S.displacementMap,Nt=!!S.emissiveMap,yt=!!S.metalnessMap,A=!!S.roughnessMap,b=S.anisotropy>0,G=S.clearcoat>0,K=S.dispersion>0,tt=S.iridescence>0,J=S.sheen>0,Tt=S.transmission>0,pt=b&&!!S.anisotropyMap,Mt=G&&!!S.clearcoatMap,Zt=G&&!!S.clearcoatNormalMap,at=G&&!!S.clearcoatRoughnessMap,bt=tt&&!!S.iridescenceMap,Ft=tt&&!!S.iridescenceThicknessMap,Bt=J&&!!S.sheenColorMap,Et=J&&!!S.sheenRoughnessMap,Kt=!!S.specularMap,Xt=!!S.specularColorMap,me=!!S.specularIntensityMap,U=Tt&&!!S.transmissionMap,mt=Tt&&!!S.thicknessMap,Y=!!S.gradientMap,j=!!S.alphaMap,xt=S.alphaTest>0,gt=!!S.alphaHash,Gt=!!S.extensions;let be=ti;S.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(be=i.toneMapping);const Ne={shaderID:nt,shaderType:S.type,shaderName:S.name,vertexShader:Ht,fragmentShader:Z,defines:S.defines,customVertexShaderID:it,customFragmentShaderID:_t,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:It,batchingColor:It&&z._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&z.instanceColor!==null,instancingMorph:Ot&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ot===null?i.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:os,alphaToCoverage:!!S.alphaToCoverage,map:Qt,matcap:Q,envMap:lt,envMapMode:lt&&V.mapping,envMapCubeUVHeight:B,aoMap:D,lightMap:Pt,bumpMap:st,normalMap:St,displacementMap:f&&ut,emissiveMap:Nt,normalMapObjectSpace:St&&S.normalMapType===hp,normalMapTangentSpace:St&&S.normalMapType===xu,metalnessMap:yt,roughnessMap:A,anisotropy:b,anisotropyMap:pt,clearcoat:G,clearcoatMap:Mt,clearcoatNormalMap:Zt,clearcoatRoughnessMap:at,dispersion:K,iridescence:tt,iridescenceMap:bt,iridescenceThicknessMap:Ft,sheen:J,sheenColorMap:Bt,sheenRoughnessMap:Et,specularMap:Kt,specularColorMap:Xt,specularIntensityMap:me,transmission:Tt,transmissionMap:U,thicknessMap:mt,gradientMap:Y,opaque:S.transparent===!1&&S.blending===$i&&S.alphaToCoverage===!1,alphaMap:j,alphaTest:xt,alphaHash:gt,combine:S.combine,mapUv:Qt&&x(S.map.channel),aoMapUv:D&&x(S.aoMap.channel),lightMapUv:Pt&&x(S.lightMap.channel),bumpMapUv:st&&x(S.bumpMap.channel),normalMapUv:St&&x(S.normalMap.channel),displacementMapUv:ut&&x(S.displacementMap.channel),emissiveMapUv:Nt&&x(S.emissiveMap.channel),metalnessMapUv:yt&&x(S.metalnessMap.channel),roughnessMapUv:A&&x(S.roughnessMap.channel),anisotropyMapUv:pt&&x(S.anisotropyMap.channel),clearcoatMapUv:Mt&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:Zt&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:at&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ft&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:Bt&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:Et&&x(S.sheenRoughnessMap.channel),specularMapUv:Kt&&x(S.specularMap.channel),specularColorMapUv:Xt&&x(S.specularColorMap.channel),specularIntensityMapUv:me&&x(S.specularIntensityMap.channel),transmissionMapUv:U&&x(S.transmissionMap.channel),thicknessMapUv:mt&&x(S.thicknessMap.channel),alphaMapUv:j&&x(S.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(St||b),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!q.attributes.uv&&(Qt||j),fog:!!k,useFog:S.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Rt,skinning:z.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Dt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:be,decodeVideoTexture:Qt&&S.map.isVideoTexture===!0&&Jt.getTransfer(S.map.colorSpace)===ce,decodeVideoTextureEmissive:Nt&&S.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(S.emissiveMap.colorSpace)===ce,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Qe,flipSided:S.side===He,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Gt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&S.extensions.multiDraw===!0||It)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function p(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)y.push(P),y.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(M(y,S),v(y,S),y.push(i.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function M(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function v(S,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),S.push(o.mask)}function _(S){const y=m[S.type];let P;if(y){const H=Mn[y];P=ss.clone(H.uniforms)}else P=S.uniforms;return P}function C(S,y){let P;for(let H=0,z=h.length;H<z;H++){const k=h[H];if(k.cacheKey===y){P=k,++P.usedTimes;break}}return P===void 0&&(P=new Jv(i,y,S,r),h.push(P)),P}function w(S){if(--S.usedTimes===0){const y=h.indexOf(S);h[y]=h[h.length-1],h.pop(),S.destroy()}}function R(S){l.remove(S)}function L(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:_,acquireProgram:C,releaseProgram:w,releaseShaderCache:R,programs:h,dispose:L}}function nx(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function ix(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Wc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Xc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,f,d,m,x,g){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:m,renderOrder:u.renderOrder,z:x,group:g},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=x,p.group=g),t++,p}function o(u,f,d,m,x,g){const p=a(u,f,d,m,x,g);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function l(u,f,d,m,x,g){const p=a(u,f,d,m,x,g);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||ix),n.length>1&&n.sort(f||Wc),s.length>1&&s.sort(f||Wc)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function sx(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Xc,i.set(n,[a])):s>=r.length?(a=new Xc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function rx(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Ut};break;case"SpotLight":e={position:new I,direction:new I,color:new Ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Ut,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Ut,groundColor:new Ut};break;case"RectAreaLight":e={color:new Ut,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function ax(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let ox=0;function lx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function cx(i){const t=new rx,e=ax(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const s=new I,r=new ie,a=new ie;function o(c){let h=0,u=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,m=0,x=0,g=0,p=0,M=0,v=0,_=0,C=0,w=0,R=0;c.sort(lx);for(let S=0,y=c.length;S<y;S++){const P=c[S],H=P.color,z=P.intensity,k=P.distance,q=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=H.r*z,u+=H.g*z,f+=H.b*z;else if(P.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(P.sh.coefficients[N],z);R++}else if(P.isDirectionalLight){const N=t.get(P);if(N.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const V=P.shadow,B=e.get(P);B.shadowIntensity=V.intensity,B.shadowBias=V.bias,B.shadowNormalBias=V.normalBias,B.shadowRadius=V.radius,B.shadowMapSize=V.mapSize,n.directionalShadow[d]=B,n.directionalShadowMap[d]=q,n.directionalShadowMatrix[d]=P.shadow.matrix,M++}n.directional[d]=N,d++}else if(P.isSpotLight){const N=t.get(P);N.position.setFromMatrixPosition(P.matrixWorld),N.color.copy(H).multiplyScalar(z),N.distance=k,N.coneCos=Math.cos(P.angle),N.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),N.decay=P.decay,n.spot[x]=N;const V=P.shadow;if(P.map&&(n.spotLightMap[C]=P.map,C++,V.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[x]=V.matrix,P.castShadow){const B=e.get(P);B.shadowIntensity=V.intensity,B.shadowBias=V.bias,B.shadowNormalBias=V.normalBias,B.shadowRadius=V.radius,B.shadowMapSize=V.mapSize,n.spotShadow[x]=B,n.spotShadowMap[x]=q,_++}x++}else if(P.isRectAreaLight){const N=t.get(P);N.color.copy(H).multiplyScalar(z),N.halfWidth.set(P.width*.5,0,0),N.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=N,g++}else if(P.isPointLight){const N=t.get(P);if(N.color.copy(P.color).multiplyScalar(P.intensity),N.distance=P.distance,N.decay=P.decay,P.castShadow){const V=P.shadow,B=e.get(P);B.shadowIntensity=V.intensity,B.shadowBias=V.bias,B.shadowNormalBias=V.normalBias,B.shadowRadius=V.radius,B.shadowMapSize=V.mapSize,B.shadowCameraNear=V.camera.near,B.shadowCameraFar=V.camera.far,n.pointShadow[m]=B,n.pointShadowMap[m]=q,n.pointShadowMatrix[m]=P.shadow.matrix,v++}n.point[m]=N,m++}else if(P.isHemisphereLight){const N=t.get(P);N.skyColor.copy(P.color).multiplyScalar(z),N.groundColor.copy(P.groundColor).multiplyScalar(z),n.hemi[p]=N,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const L=n.hash;(L.directionalLength!==d||L.pointLength!==m||L.spotLength!==x||L.rectAreaLength!==g||L.hemiLength!==p||L.numDirectionalShadows!==M||L.numPointShadows!==v||L.numSpotShadows!==_||L.numSpotMaps!==C||L.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=_+C-w,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=R,L.directionalLength=d,L.pointLength=m,L.spotLength=x,L.rectAreaLength=g,L.hemiLength=p,L.numDirectionalShadows=M,L.numPointShadows=v,L.numSpotShadows=_,L.numSpotMaps=C,L.numLightProbes=R,n.version=ox++)}function l(c,h){let u=0,f=0,d=0,m=0,x=0;const g=h.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const v=c[p];if(v.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),u++}else if(v.isSpotLight){const _=n.spot[d];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),d++}else if(v.isRectAreaLight){const _=n.rectArea[m];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(g),a.identity(),r.copy(v.matrixWorld),r.premultiply(g),a.extractRotation(r),_.halfWidth.set(v.width*.5,0,0),_.halfHeight.set(0,v.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),m++}else if(v.isPointLight){const _=n.point[f];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){const _=n.hemi[x];_.direction.setFromMatrixPosition(v.matrixWorld),_.direction.transformDirection(g),x++}}}return{setup:o,setupView:l,state:n}}function qc(i){const t=new cx(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function hx(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new qc(i),t.set(s,[o])):r>=a.length?(o=new qc(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class ux extends qs{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=lp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class fx extends qs{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const dx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,px=`uniform sampler2D shadow_pass;
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
}`;function mx(i,t,e){let n=new ml;const s=new rt,r=new rt,a=new oe,o=new ux({depthPacking:cp}),l=new fx,c={},h=e.maxTextureSize,u={[ei]:He,[He]:ei,[Qe]:Qe},f=new Ae({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:dx,fragmentShader:px}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const m=new Ge;m.setAttribute("position",new ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ue(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=eu;let p=this.type;this.render=function(w,R,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;const S=i.getRenderTarget(),y=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),H=i.state;H.setBlending(On),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const z=p!==Un&&this.type===Un,k=p===Un&&this.type!==Un;for(let q=0,N=w.length;q<N;q++){const V=w[q],B=V.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const nt=B.getFrameExtents();if(s.multiply(nt),r.copy(B.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/nt.x),s.x=r.x*nt.x,B.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/nt.y),s.y=r.y*nt.y,B.mapSize.y=r.y)),B.map===null||z===!0||k===!0){const ft=this.type!==Un?{minFilter:en,magFilter:en}:{};B.map!==null&&B.map.dispose(),B.map=new nn(s.x,s.y,ft),B.map.texture.name=V.name+".shadowMap",B.camera.updateProjectionMatrix()}i.setRenderTarget(B.map),i.clear();const ht=B.getViewportCount();for(let ft=0;ft<ht;ft++){const Dt=B.getViewport(ft);a.set(r.x*Dt.x,r.y*Dt.y,r.x*Dt.z,r.y*Dt.w),H.viewport(a),B.updateMatrices(V,ft),n=B.getFrustum(),_(R,L,B.camera,V,this.type)}B.isPointLightShadow!==!0&&this.type===Un&&M(B,L),B.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(S,y,P)};function M(w,R){const L=t.update(x);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new nn(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(R,null,L,f,x,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(R,null,L,d,x,null)}function v(w,R,L,S){let y=null;const P=L.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)y=P;else if(y=L.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const H=y.uuid,z=R.uuid;let k=c[H];k===void 0&&(k={},c[H]=k);let q=k[z];q===void 0&&(q=y.clone(),k[z]=q,R.addEventListener("dispose",C)),y=q}if(y.visible=R.visible,y.wireframe=R.wireframe,S===Un?y.side=R.shadowSide!==null?R.shadowSide:R.side:y.side=R.shadowSide!==null?R.shadowSide:u[R.side],y.alphaMap=R.alphaMap,y.alphaTest=R.alphaTest,y.map=R.map,y.clipShadows=R.clipShadows,y.clippingPlanes=R.clippingPlanes,y.clipIntersection=R.clipIntersection,y.displacementMap=R.displacementMap,y.displacementScale=R.displacementScale,y.displacementBias=R.displacementBias,y.wireframeLinewidth=R.wireframeLinewidth,y.linewidth=R.linewidth,L.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const H=i.properties.get(y);H.light=L}return y}function _(w,R,L,S,y){if(w.visible===!1)return;if(w.layers.test(R.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===Un)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,w.matrixWorld);const z=t.update(w),k=w.material;if(Array.isArray(k)){const q=z.groups;for(let N=0,V=q.length;N<V;N++){const B=q[N],nt=k[B.materialIndex];if(nt&&nt.visible){const ht=v(w,nt,S,y);w.onBeforeShadow(i,w,R,L,z,ht,B),i.renderBufferDirect(L,null,z,ht,w,B),w.onAfterShadow(i,w,R,L,z,ht,B)}}}else if(k.visible){const q=v(w,k,S,y);w.onBeforeShadow(i,w,R,L,z,q,null),i.renderBufferDirect(L,null,z,q,w,null),w.onAfterShadow(i,w,R,L,z,q,null)}}const H=w.children;for(let z=0,k=H.length;z<k;z++)_(H[z],R,L,S,y)}function C(w){w.target.removeEventListener("dispose",C);for(const L in c){const S=c[L],y=w.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const gx={[so]:ro,[ao]:co,[oo]:ho,[ji]:lo,[ro]:so,[co]:ao,[ho]:oo,[lo]:ji};function vx(i,t){function e(){let U=!1;const mt=new oe;let Y=null;const j=new oe(0,0,0,0);return{setMask:function(xt){Y!==xt&&!U&&(i.colorMask(xt,xt,xt,xt),Y=xt)},setLocked:function(xt){U=xt},setClear:function(xt,gt,Gt,be,Ne){Ne===!0&&(xt*=be,gt*=be,Gt*=be),mt.set(xt,gt,Gt,be),j.equals(mt)===!1&&(i.clearColor(xt,gt,Gt,be),j.copy(mt))},reset:function(){U=!1,Y=null,j.set(-1,0,0,0)}}}function n(){let U=!1,mt=!1,Y=null,j=null,xt=null;return{setReversed:function(gt){if(mt!==gt){const Gt=t.get("EXT_clip_control");mt?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT);const be=xt;xt=null,this.setClear(be)}mt=gt},getReversed:function(){return mt},setTest:function(gt){gt?ot(i.DEPTH_TEST):Rt(i.DEPTH_TEST)},setMask:function(gt){Y!==gt&&!U&&(i.depthMask(gt),Y=gt)},setFunc:function(gt){if(mt&&(gt=gx[gt]),j!==gt){switch(gt){case so:i.depthFunc(i.NEVER);break;case ro:i.depthFunc(i.ALWAYS);break;case ao:i.depthFunc(i.LESS);break;case ji:i.depthFunc(i.LEQUAL);break;case oo:i.depthFunc(i.EQUAL);break;case lo:i.depthFunc(i.GEQUAL);break;case co:i.depthFunc(i.GREATER);break;case ho:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}j=gt}},setLocked:function(gt){U=gt},setClear:function(gt){xt!==gt&&(mt&&(gt=1-gt),i.clearDepth(gt),xt=gt)},reset:function(){U=!1,Y=null,j=null,xt=null,mt=!1}}}function s(){let U=!1,mt=null,Y=null,j=null,xt=null,gt=null,Gt=null,be=null,Ne=null;return{setTest:function(le){U||(le?ot(i.STENCIL_TEST):Rt(i.STENCIL_TEST))},setMask:function(le){mt!==le&&!U&&(i.stencilMask(le),mt=le)},setFunc:function(le,cn,wn){(Y!==le||j!==cn||xt!==wn)&&(i.stencilFunc(le,cn,wn),Y=le,j=cn,xt=wn)},setOp:function(le,cn,wn){(gt!==le||Gt!==cn||be!==wn)&&(i.stencilOp(le,cn,wn),gt=le,Gt=cn,be=wn)},setLocked:function(le){U=le},setClear:function(le){Ne!==le&&(i.clearStencil(le),Ne=le)},reset:function(){U=!1,mt=null,Y=null,j=null,xt=null,gt=null,Gt=null,be=null,Ne=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],m=null,x=!1,g=null,p=null,M=null,v=null,_=null,C=null,w=null,R=new Ut(0,0,0),L=0,S=!1,y=null,P=null,H=null,z=null,k=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,V=0;const B=i.getParameter(i.VERSION);B.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(B)[1]),N=V>=1):B.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),N=V>=2);let nt=null,ht={};const ft=i.getParameter(i.SCISSOR_BOX),Dt=i.getParameter(i.VIEWPORT),Ht=new oe().fromArray(ft),Z=new oe().fromArray(Dt);function it(U,mt,Y,j){const xt=new Uint8Array(4),gt=i.createTexture();i.bindTexture(U,gt),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Gt=0;Gt<Y;Gt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(mt,0,i.RGBA,1,1,j,0,i.RGBA,i.UNSIGNED_BYTE,xt):i.texImage2D(mt+Gt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xt);return gt}const _t={};_t[i.TEXTURE_2D]=it(i.TEXTURE_2D,i.TEXTURE_2D,1),_t[i.TEXTURE_CUBE_MAP]=it(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),_t[i.TEXTURE_2D_ARRAY]=it(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),_t[i.TEXTURE_3D]=it(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ot(i.DEPTH_TEST),a.setFunc(ji),st(!1),St(jl),ot(i.CULL_FACE),D(On);function ot(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function Rt(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Ot(U,mt){return u[U]!==mt?(i.bindFramebuffer(U,mt),u[U]=mt,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=mt),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=mt),!0):!1}function It(U,mt){let Y=d,j=!1;if(U){Y=f.get(mt),Y===void 0&&(Y=[],f.set(mt,Y));const xt=U.textures;if(Y.length!==xt.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let gt=0,Gt=xt.length;gt<Gt;gt++)Y[gt]=i.COLOR_ATTACHMENT0+gt;Y.length=xt.length,j=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,j=!0);j&&i.drawBuffers(Y)}function Qt(U){return m!==U?(i.useProgram(U),m=U,!0):!1}const Q={[ui]:i.FUNC_ADD,[Hd]:i.FUNC_SUBTRACT,[Gd]:i.FUNC_REVERSE_SUBTRACT};Q[Vd]=i.MIN,Q[Wd]=i.MAX;const lt={[Xd]:i.ZERO,[qd]:i.ONE,[Yd]:i.SRC_COLOR,[no]:i.SRC_ALPHA,[Qd]:i.SRC_ALPHA_SATURATE,[Jd]:i.DST_COLOR,[Zd]:i.DST_ALPHA,[$d]:i.ONE_MINUS_SRC_COLOR,[io]:i.ONE_MINUS_SRC_ALPHA,[jd]:i.ONE_MINUS_DST_COLOR,[Kd]:i.ONE_MINUS_DST_ALPHA,[tp]:i.CONSTANT_COLOR,[ep]:i.ONE_MINUS_CONSTANT_COLOR,[np]:i.CONSTANT_ALPHA,[ip]:i.ONE_MINUS_CONSTANT_ALPHA};function D(U,mt,Y,j,xt,gt,Gt,be,Ne,le){if(U===On){x===!0&&(Rt(i.BLEND),x=!1);return}if(x===!1&&(ot(i.BLEND),x=!0),U!==zd){if(U!==g||le!==S){if((p!==ui||_!==ui)&&(i.blendEquation(i.FUNC_ADD),p=ui,_=ui),le)switch(U){case $i:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bn:i.blendFunc(i.ONE,i.ONE);break;case Ql:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case tc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case $i:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Bn:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ql:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case tc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}M=null,v=null,C=null,w=null,R.set(0,0,0),L=0,g=U,S=le}return}xt=xt||mt,gt=gt||Y,Gt=Gt||j,(mt!==p||xt!==_)&&(i.blendEquationSeparate(Q[mt],Q[xt]),p=mt,_=xt),(Y!==M||j!==v||gt!==C||Gt!==w)&&(i.blendFuncSeparate(lt[Y],lt[j],lt[gt],lt[Gt]),M=Y,v=j,C=gt,w=Gt),(be.equals(R)===!1||Ne!==L)&&(i.blendColor(be.r,be.g,be.b,Ne),R.copy(be),L=Ne),g=U,S=!1}function Pt(U,mt){U.side===Qe?Rt(i.CULL_FACE):ot(i.CULL_FACE);let Y=U.side===He;mt&&(Y=!Y),st(Y),U.blending===$i&&U.transparent===!1?D(On):D(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const j=U.stencilWrite;o.setTest(j),j&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Nt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ot(i.SAMPLE_ALPHA_TO_COVERAGE):Rt(i.SAMPLE_ALPHA_TO_COVERAGE)}function st(U){y!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),y=U)}function St(U){U!==Od?(ot(i.CULL_FACE),U!==P&&(U===jl?i.cullFace(i.BACK):U===kd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Rt(i.CULL_FACE),P=U}function ut(U){U!==H&&(N&&i.lineWidth(U),H=U)}function Nt(U,mt,Y){U?(ot(i.POLYGON_OFFSET_FILL),(z!==mt||k!==Y)&&(i.polygonOffset(mt,Y),z=mt,k=Y)):Rt(i.POLYGON_OFFSET_FILL)}function yt(U){U?ot(i.SCISSOR_TEST):Rt(i.SCISSOR_TEST)}function A(U){U===void 0&&(U=i.TEXTURE0+q-1),nt!==U&&(i.activeTexture(U),nt=U)}function b(U,mt,Y){Y===void 0&&(nt===null?Y=i.TEXTURE0+q-1:Y=nt);let j=ht[Y];j===void 0&&(j={type:void 0,texture:void 0},ht[Y]=j),(j.type!==U||j.texture!==mt)&&(nt!==Y&&(i.activeTexture(Y),nt=Y),i.bindTexture(U,mt||_t[U]),j.type=U,j.texture=mt)}function G(){const U=ht[nt];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function K(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function tt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function J(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Tt(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Zt(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function at(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function bt(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ft(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Bt(U){Ht.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Ht.copy(U))}function Et(U){Z.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),Z.copy(U))}function Kt(U,mt){let Y=c.get(mt);Y===void 0&&(Y=new WeakMap,c.set(mt,Y));let j=Y.get(U);j===void 0&&(j=i.getUniformBlockIndex(mt,U.name),Y.set(U,j))}function Xt(U,mt){const j=c.get(mt).get(U);l.get(mt)!==j&&(i.uniformBlockBinding(mt,j,U.__bindingPointIndex),l.set(mt,j))}function me(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},nt=null,ht={},u={},f=new WeakMap,d=[],m=null,x=!1,g=null,p=null,M=null,v=null,_=null,C=null,w=null,R=new Ut(0,0,0),L=0,S=!1,y=null,P=null,H=null,z=null,k=null,Ht.set(0,0,i.canvas.width,i.canvas.height),Z.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ot,disable:Rt,bindFramebuffer:Ot,drawBuffers:It,useProgram:Qt,setBlending:D,setMaterial:Pt,setFlipSided:st,setCullFace:St,setLineWidth:ut,setPolygonOffset:Nt,setScissorTest:yt,activeTexture:A,bindTexture:b,unbindTexture:G,compressedTexImage2D:K,compressedTexImage3D:tt,texImage2D:bt,texImage3D:Ft,updateUBOMapping:Kt,uniformBlockBinding:Xt,texStorage2D:Zt,texStorage3D:at,texSubImage2D:J,texSubImage3D:Tt,compressedTexSubImage2D:pt,compressedTexSubImage3D:Mt,scissor:Bt,viewport:Et,reset:me}}function Yc(i,t,e,n){const s=xx(n);switch(e){case fu:return i*t;case pu:return i*t;case mu:return i*t*2;case hl:return i*t/s.components*s.byteLength;case ul:return i*t/s.components*s.byteLength;case gu:return i*t*2/s.components*s.byteLength;case fl:return i*t*2/s.components*s.byteLength;case du:return i*t*3/s.components*s.byteLength;case vn:return i*t*4/s.components*s.byteLength;case dl:return i*t*4/s.components*s.byteLength;case Rr:case Pr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Lr:case Dr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case go:case xo:return Math.max(i,16)*Math.max(t,8)/4;case mo:case vo:return Math.max(i,8)*Math.max(t,8)/2;case _o:case yo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Mo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case So:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case bo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Eo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case To:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case wo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ao:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Co:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ro:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Po:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Lo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Do:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Io:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Uo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case No:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ir:case Fo:case Oo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case vu:case ko:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Bo:case zo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function xx(i){switch(i){case zn:case cu:return{byteLength:1,components:1};case ks:case hu:case xn:return{byteLength:2,components:1};case ll:case cl:return{byteLength:2,components:4};case _i:case ol:case En:return{byteLength:4,components:1};case uu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function _x(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new rt,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(A,b){return d?new OffscreenCanvas(A,b):Br("canvas")}function x(A,b,G){let K=1;const tt=yt(A);if((tt.width>G||tt.height>G)&&(K=G/Math.max(tt.width,tt.height)),K<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const J=Math.floor(K*tt.width),Tt=Math.floor(K*tt.height);u===void 0&&(u=m(J,Tt));const pt=b?m(J,Tt):u;return pt.width=J,pt.height=Tt,pt.getContext("2d").drawImage(A,0,0,J,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+J+"x"+Tt+")."),pt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),A;return A}function g(A){return A.generateMipmaps}function p(A){i.generateMipmap(A)}function M(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(A,b,G,K,tt=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let J=b;if(b===i.RED&&(G===i.FLOAT&&(J=i.R32F),G===i.HALF_FLOAT&&(J=i.R16F),G===i.UNSIGNED_BYTE&&(J=i.R8)),b===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(J=i.R8UI),G===i.UNSIGNED_SHORT&&(J=i.R16UI),G===i.UNSIGNED_INT&&(J=i.R32UI),G===i.BYTE&&(J=i.R8I),G===i.SHORT&&(J=i.R16I),G===i.INT&&(J=i.R32I)),b===i.RG&&(G===i.FLOAT&&(J=i.RG32F),G===i.HALF_FLOAT&&(J=i.RG16F),G===i.UNSIGNED_BYTE&&(J=i.RG8)),b===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(J=i.RG8UI),G===i.UNSIGNED_SHORT&&(J=i.RG16UI),G===i.UNSIGNED_INT&&(J=i.RG32UI),G===i.BYTE&&(J=i.RG8I),G===i.SHORT&&(J=i.RG16I),G===i.INT&&(J=i.RG32I)),b===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(J=i.RGB8UI),G===i.UNSIGNED_SHORT&&(J=i.RGB16UI),G===i.UNSIGNED_INT&&(J=i.RGB32UI),G===i.BYTE&&(J=i.RGB8I),G===i.SHORT&&(J=i.RGB16I),G===i.INT&&(J=i.RGB32I)),b===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),G===i.UNSIGNED_INT&&(J=i.RGBA32UI),G===i.BYTE&&(J=i.RGBA8I),G===i.SHORT&&(J=i.RGBA16I),G===i.INT&&(J=i.RGBA32I)),b===i.RGB&&G===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),b===i.RGBA){const Tt=tt?Zr:Jt.getTransfer(K);G===i.FLOAT&&(J=i.RGBA32F),G===i.HALF_FLOAT&&(J=i.RGBA16F),G===i.UNSIGNED_BYTE&&(J=Tt===ce?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function _(A,b){let G;return A?b===null||b===_i||b===es?G=i.DEPTH24_STENCIL8:b===En?G=i.DEPTH32F_STENCIL8:b===ks&&(G=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===_i||b===es?G=i.DEPTH_COMPONENT24:b===En?G=i.DEPTH_COMPONENT32F:b===ks&&(G=i.DEPTH_COMPONENT16),G}function C(A,b){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==en&&A.minFilter!==bn?Math.log2(Math.max(b.width,b.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?b.mipmaps.length:1}function w(A){const b=A.target;b.removeEventListener("dispose",w),L(b),b.isVideoTexture&&h.delete(b)}function R(A){const b=A.target;b.removeEventListener("dispose",R),y(b)}function L(A){const b=n.get(A);if(b.__webglInit===void 0)return;const G=A.source,K=f.get(G);if(K){const tt=K[b.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&S(A),Object.keys(K).length===0&&f.delete(G)}n.remove(A)}function S(A){const b=n.get(A);i.deleteTexture(b.__webglTexture);const G=A.source,K=f.get(G);delete K[b.__cacheKey],a.memory.textures--}function y(A){const b=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(b.__webglFramebuffer[K]))for(let tt=0;tt<b.__webglFramebuffer[K].length;tt++)i.deleteFramebuffer(b.__webglFramebuffer[K][tt]);else i.deleteFramebuffer(b.__webglFramebuffer[K]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[K])}else{if(Array.isArray(b.__webglFramebuffer))for(let K=0;K<b.__webglFramebuffer.length;K++)i.deleteFramebuffer(b.__webglFramebuffer[K]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let K=0;K<b.__webglColorRenderbuffer.length;K++)b.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[K]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const G=A.textures;for(let K=0,tt=G.length;K<tt;K++){const J=n.get(G[K]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),a.memory.textures--),n.remove(G[K])}n.remove(A)}let P=0;function H(){P=0}function z(){const A=P;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),P+=1,A}function k(A){const b=[];return b.push(A.wrapS),b.push(A.wrapT),b.push(A.wrapR||0),b.push(A.magFilter),b.push(A.minFilter),b.push(A.anisotropy),b.push(A.internalFormat),b.push(A.format),b.push(A.type),b.push(A.generateMipmaps),b.push(A.premultiplyAlpha),b.push(A.flipY),b.push(A.unpackAlignment),b.push(A.colorSpace),b.join()}function q(A,b){const G=n.get(A);if(A.isVideoTexture&&ut(A),A.isRenderTargetTexture===!1&&A.version>0&&G.__version!==A.version){const K=A.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(G,A,b);return}}e.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+b)}function N(A,b){const G=n.get(A);if(A.version>0&&G.__version!==A.version){Z(G,A,b);return}e.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+b)}function V(A,b){const G=n.get(A);if(A.version>0&&G.__version!==A.version){Z(G,A,b);return}e.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+b)}function B(A,b){const G=n.get(A);if(A.version>0&&G.__version!==A.version){it(G,A,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+b)}const nt={[Os]:i.REPEAT,[di]:i.CLAMP_TO_EDGE,[po]:i.MIRRORED_REPEAT},ht={[en]:i.NEAREST,[op]:i.NEAREST_MIPMAP_NEAREST,[js]:i.NEAREST_MIPMAP_LINEAR,[bn]:i.LINEAR,[fa]:i.LINEAR_MIPMAP_NEAREST,[pi]:i.LINEAR_MIPMAP_LINEAR},ft={[up]:i.NEVER,[vp]:i.ALWAYS,[fp]:i.LESS,[_u]:i.LEQUAL,[dp]:i.EQUAL,[gp]:i.GEQUAL,[pp]:i.GREATER,[mp]:i.NOTEQUAL};function Dt(A,b){if(b.type===En&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===bn||b.magFilter===fa||b.magFilter===js||b.magFilter===pi||b.minFilter===bn||b.minFilter===fa||b.minFilter===js||b.minFilter===pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,nt[b.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,nt[b.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,nt[b.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,ht[b.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,ht[b.minFilter]),b.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ft[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===en||b.minFilter!==js&&b.minFilter!==pi||b.type===En&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Ht(A,b){let G=!1;A.__webglInit===void 0&&(A.__webglInit=!0,b.addEventListener("dispose",w));const K=b.source;let tt=f.get(K);tt===void 0&&(tt={},f.set(K,tt));const J=k(b);if(J!==A.__cacheKey){tt[J]===void 0&&(tt[J]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,G=!0),tt[J].usedTimes++;const Tt=tt[A.__cacheKey];Tt!==void 0&&(tt[A.__cacheKey].usedTimes--,Tt.usedTimes===0&&S(b)),A.__cacheKey=J,A.__webglTexture=tt[J].texture}return G}function Z(A,b,G){let K=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(K=i.TEXTURE_3D);const tt=Ht(A,b),J=b.source;e.bindTexture(K,A.__webglTexture,i.TEXTURE0+G);const Tt=n.get(J);if(J.version!==Tt.__version||tt===!0){e.activeTexture(i.TEXTURE0+G);const pt=Jt.getPrimaries(Jt.workingColorSpace),Mt=b.colorSpace===Jn?null:Jt.getPrimaries(b.colorSpace),Zt=b.colorSpace===Jn||pt===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Zt);let at=x(b.image,!1,s.maxTextureSize);at=Nt(b,at);const bt=r.convert(b.format,b.colorSpace),Ft=r.convert(b.type);let Bt=v(b.internalFormat,bt,Ft,b.colorSpace,b.isVideoTexture);Dt(K,b);let Et;const Kt=b.mipmaps,Xt=b.isVideoTexture!==!0,me=Tt.__version===void 0||tt===!0,U=J.dataReady,mt=C(b,at);if(b.isDepthTexture)Bt=_(b.format===ns,b.type),me&&(Xt?e.texStorage2D(i.TEXTURE_2D,1,Bt,at.width,at.height):e.texImage2D(i.TEXTURE_2D,0,Bt,at.width,at.height,0,bt,Ft,null));else if(b.isDataTexture)if(Kt.length>0){Xt&&me&&e.texStorage2D(i.TEXTURE_2D,mt,Bt,Kt[0].width,Kt[0].height);for(let Y=0,j=Kt.length;Y<j;Y++)Et=Kt[Y],Xt?U&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,Et.width,Et.height,bt,Ft,Et.data):e.texImage2D(i.TEXTURE_2D,Y,Bt,Et.width,Et.height,0,bt,Ft,Et.data);b.generateMipmaps=!1}else Xt?(me&&e.texStorage2D(i.TEXTURE_2D,mt,Bt,at.width,at.height),U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,at.width,at.height,bt,Ft,at.data)):e.texImage2D(i.TEXTURE_2D,0,Bt,at.width,at.height,0,bt,Ft,at.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Xt&&me&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,Bt,Kt[0].width,Kt[0].height,at.depth);for(let Y=0,j=Kt.length;Y<j;Y++)if(Et=Kt[Y],b.format!==vn)if(bt!==null)if(Xt){if(U)if(b.layerUpdates.size>0){const xt=Yc(Et.width,Et.height,b.format,b.type);for(const gt of b.layerUpdates){const Gt=Et.data.subarray(gt*xt/Et.data.BYTES_PER_ELEMENT,(gt+1)*xt/Et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,gt,Et.width,Et.height,1,bt,Gt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,Et.width,Et.height,at.depth,bt,Et.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Y,Bt,Et.width,Et.height,at.depth,0,Et.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Y,0,0,0,Et.width,Et.height,at.depth,bt,Ft,Et.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Y,Bt,Et.width,Et.height,at.depth,0,bt,Ft,Et.data)}else{Xt&&me&&e.texStorage2D(i.TEXTURE_2D,mt,Bt,Kt[0].width,Kt[0].height);for(let Y=0,j=Kt.length;Y<j;Y++)Et=Kt[Y],b.format!==vn?bt!==null?Xt?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,Y,0,0,Et.width,Et.height,bt,Et.data):e.compressedTexImage2D(i.TEXTURE_2D,Y,Bt,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?U&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,Et.width,Et.height,bt,Ft,Et.data):e.texImage2D(i.TEXTURE_2D,Y,Bt,Et.width,Et.height,0,bt,Ft,Et.data)}else if(b.isDataArrayTexture)if(Xt){if(me&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,Bt,at.width,at.height,at.depth),U)if(b.layerUpdates.size>0){const Y=Yc(at.width,at.height,b.format,b.type);for(const j of b.layerUpdates){const xt=at.data.subarray(j*Y/at.data.BYTES_PER_ELEMENT,(j+1)*Y/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,at.width,at.height,1,bt,Ft,xt)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,bt,Ft,at.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Bt,at.width,at.height,at.depth,0,bt,Ft,at.data);else if(b.isData3DTexture)Xt?(me&&e.texStorage3D(i.TEXTURE_3D,mt,Bt,at.width,at.height,at.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,bt,Ft,at.data)):e.texImage3D(i.TEXTURE_3D,0,Bt,at.width,at.height,at.depth,0,bt,Ft,at.data);else if(b.isFramebufferTexture){if(me)if(Xt)e.texStorage2D(i.TEXTURE_2D,mt,Bt,at.width,at.height);else{let Y=at.width,j=at.height;for(let xt=0;xt<mt;xt++)e.texImage2D(i.TEXTURE_2D,xt,Bt,Y,j,0,bt,Ft,null),Y>>=1,j>>=1}}else if(Kt.length>0){if(Xt&&me){const Y=yt(Kt[0]);e.texStorage2D(i.TEXTURE_2D,mt,Bt,Y.width,Y.height)}for(let Y=0,j=Kt.length;Y<j;Y++)Et=Kt[Y],Xt?U&&e.texSubImage2D(i.TEXTURE_2D,Y,0,0,bt,Ft,Et):e.texImage2D(i.TEXTURE_2D,Y,Bt,bt,Ft,Et);b.generateMipmaps=!1}else if(Xt){if(me){const Y=yt(at);e.texStorage2D(i.TEXTURE_2D,mt,Bt,Y.width,Y.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,bt,Ft,at)}else e.texImage2D(i.TEXTURE_2D,0,Bt,bt,Ft,at);g(b)&&p(K),Tt.__version=J.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function it(A,b,G){if(b.image.length!==6)return;const K=Ht(A,b),tt=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+G);const J=n.get(tt);if(tt.version!==J.__version||K===!0){e.activeTexture(i.TEXTURE0+G);const Tt=Jt.getPrimaries(Jt.workingColorSpace),pt=b.colorSpace===Jn?null:Jt.getPrimaries(b.colorSpace),Mt=b.colorSpace===Jn||Tt===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const Zt=b.isCompressedTexture||b.image[0].isCompressedTexture,at=b.image[0]&&b.image[0].isDataTexture,bt=[];for(let j=0;j<6;j++)!Zt&&!at?bt[j]=x(b.image[j],!0,s.maxCubemapSize):bt[j]=at?b.image[j].image:b.image[j],bt[j]=Nt(b,bt[j]);const Ft=bt[0],Bt=r.convert(b.format,b.colorSpace),Et=r.convert(b.type),Kt=v(b.internalFormat,Bt,Et,b.colorSpace),Xt=b.isVideoTexture!==!0,me=J.__version===void 0||K===!0,U=tt.dataReady;let mt=C(b,Ft);Dt(i.TEXTURE_CUBE_MAP,b);let Y;if(Zt){Xt&&me&&e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,Kt,Ft.width,Ft.height);for(let j=0;j<6;j++){Y=bt[j].mipmaps;for(let xt=0;xt<Y.length;xt++){const gt=Y[xt];b.format!==vn?Bt!==null?Xt?U&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,xt,0,0,gt.width,gt.height,Bt,gt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,xt,Kt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,xt,0,0,gt.width,gt.height,Bt,Et,gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,xt,Kt,gt.width,gt.height,0,Bt,Et,gt.data)}}}else{if(Y=b.mipmaps,Xt&&me){Y.length>0&&mt++;const j=yt(bt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,Kt,j.width,j.height)}for(let j=0;j<6;j++)if(at){Xt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,bt[j].width,bt[j].height,Bt,Et,bt[j].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Kt,bt[j].width,bt[j].height,0,Bt,Et,bt[j].data);for(let xt=0;xt<Y.length;xt++){const Gt=Y[xt].image[j].image;Xt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,xt+1,0,0,Gt.width,Gt.height,Bt,Et,Gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,xt+1,Kt,Gt.width,Gt.height,0,Bt,Et,Gt.data)}}else{Xt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Bt,Et,bt[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Kt,Bt,Et,bt[j]);for(let xt=0;xt<Y.length;xt++){const gt=Y[xt];Xt?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,xt+1,0,0,Bt,Et,gt.image[j]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,xt+1,Kt,Bt,Et,gt.image[j])}}}g(b)&&p(i.TEXTURE_CUBE_MAP),J.__version=tt.version,b.onUpdate&&b.onUpdate(b)}A.__version=b.version}function _t(A,b,G,K,tt,J){const Tt=r.convert(G.format,G.colorSpace),pt=r.convert(G.type),Mt=v(G.internalFormat,Tt,pt,G.colorSpace),Zt=n.get(b),at=n.get(G);if(at.__renderTarget=b,!Zt.__hasExternalTextures){const bt=Math.max(1,b.width>>J),Ft=Math.max(1,b.height>>J);tt===i.TEXTURE_3D||tt===i.TEXTURE_2D_ARRAY?e.texImage3D(tt,J,Mt,bt,Ft,b.depth,0,Tt,pt,null):e.texImage2D(tt,J,Mt,bt,Ft,0,Tt,pt,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),St(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,tt,at.__webglTexture,0,st(b)):(tt===i.TEXTURE_2D||tt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,tt,at.__webglTexture,J),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ot(A,b,G){if(i.bindRenderbuffer(i.RENDERBUFFER,A),b.depthBuffer){const K=b.depthTexture,tt=K&&K.isDepthTexture?K.type:null,J=_(b.stencilBuffer,tt),Tt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=st(b);St(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt,J,b.width,b.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt,J,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,J,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Tt,i.RENDERBUFFER,A)}else{const K=b.textures;for(let tt=0;tt<K.length;tt++){const J=K[tt],Tt=r.convert(J.format,J.colorSpace),pt=r.convert(J.type),Mt=v(J.internalFormat,Tt,pt,J.colorSpace),Zt=st(b);G&&St(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Zt,Mt,b.width,b.height):St(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Zt,Mt,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Mt,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Rt(A,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(b.depthTexture);K.__renderTarget=b,(!K.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),q(b.depthTexture,0);const tt=K.__webglTexture,J=st(b);if(b.depthTexture.format===Zi)St(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0);else if(b.depthTexture.format===ns)St(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function Ot(A){const b=n.get(A),G=A.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==A.depthTexture){const K=A.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),K){const tt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,K.removeEventListener("dispose",tt)};K.addEventListener("dispose",tt),b.__depthDisposeCallback=tt}b.__boundDepthTexture=K}if(A.depthTexture&&!b.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Rt(b.__webglFramebuffer,A)}else if(G){b.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[K]),b.__webglDepthbuffer[K]===void 0)b.__webglDepthbuffer[K]=i.createRenderbuffer(),ot(b.__webglDepthbuffer[K],A,!1);else{const tt=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=b.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,tt,i.RENDERBUFFER,J)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),ot(b.__webglDepthbuffer,A,!1);else{const K=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,tt=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,tt),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,tt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function It(A,b,G){const K=n.get(A);b!==void 0&&_t(K.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&Ot(A)}function Qt(A){const b=A.texture,G=n.get(A),K=n.get(b);A.addEventListener("dispose",R);const tt=A.textures,J=A.isWebGLCubeRenderTarget===!0,Tt=tt.length>1;if(Tt||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=b.version,a.memory.textures++),J){G.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(b.mipmaps&&b.mipmaps.length>0){G.__webglFramebuffer[pt]=[];for(let Mt=0;Mt<b.mipmaps.length;Mt++)G.__webglFramebuffer[pt][Mt]=i.createFramebuffer()}else G.__webglFramebuffer[pt]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){G.__webglFramebuffer=[];for(let pt=0;pt<b.mipmaps.length;pt++)G.__webglFramebuffer[pt]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(Tt)for(let pt=0,Mt=tt.length;pt<Mt;pt++){const Zt=n.get(tt[pt]);Zt.__webglTexture===void 0&&(Zt.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&St(A)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let pt=0;pt<tt.length;pt++){const Mt=tt[pt];G.__webglColorRenderbuffer[pt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[pt]);const Zt=r.convert(Mt.format,Mt.colorSpace),at=r.convert(Mt.type),bt=v(Mt.internalFormat,Zt,at,Mt.colorSpace,A.isXRRenderTarget===!0),Ft=st(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ft,bt,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,G.__webglColorRenderbuffer[pt])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),ot(G.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),Dt(i.TEXTURE_CUBE_MAP,b);for(let pt=0;pt<6;pt++)if(b.mipmaps&&b.mipmaps.length>0)for(let Mt=0;Mt<b.mipmaps.length;Mt++)_t(G.__webglFramebuffer[pt][Mt],A,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Mt);else _t(G.__webglFramebuffer[pt],A,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);g(b)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let pt=0,Mt=tt.length;pt<Mt;pt++){const Zt=tt[pt],at=n.get(Zt);e.bindTexture(i.TEXTURE_2D,at.__webglTexture),Dt(i.TEXTURE_2D,Zt),_t(G.__webglFramebuffer,A,Zt,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,0),g(Zt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let pt=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(pt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(pt,K.__webglTexture),Dt(pt,b),b.mipmaps&&b.mipmaps.length>0)for(let Mt=0;Mt<b.mipmaps.length;Mt++)_t(G.__webglFramebuffer[Mt],A,b,i.COLOR_ATTACHMENT0,pt,Mt);else _t(G.__webglFramebuffer,A,b,i.COLOR_ATTACHMENT0,pt,0);g(b)&&p(pt),e.unbindTexture()}A.depthBuffer&&Ot(A)}function Q(A){const b=A.textures;for(let G=0,K=b.length;G<K;G++){const tt=b[G];if(g(tt)){const J=M(A),Tt=n.get(tt).__webglTexture;e.bindTexture(J,Tt),p(J),e.unbindTexture()}}}const lt=[],D=[];function Pt(A){if(A.samples>0){if(St(A)===!1){const b=A.textures,G=A.width,K=A.height;let tt=i.COLOR_BUFFER_BIT;const J=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Tt=n.get(A),pt=b.length>1;if(pt)for(let Mt=0;Mt<b.length;Mt++)e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let Mt=0;Mt<b.length;Mt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(tt|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(tt|=i.STENCIL_BUFFER_BIT)),pt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[Mt]);const Zt=n.get(b[Mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Zt,0)}i.blitFramebuffer(0,0,G,K,0,0,G,K,tt,i.NEAREST),l===!0&&(lt.length=0,D.length=0,lt.push(i.COLOR_ATTACHMENT0+Mt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(lt.push(J),D.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,D)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,lt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pt)for(let Mt=0;Mt<b.length;Mt++){e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[Mt]);const Zt=n.get(b[Mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,Zt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const b=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function st(A){return Math.min(s.maxSamples,A.samples)}function St(A){const b=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ut(A){const b=a.render.frame;h.get(A)!==b&&(h.set(A,b),A.update())}function Nt(A,b){const G=A.colorSpace,K=A.format,tt=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||G!==os&&G!==Jn&&(Jt.getTransfer(G)===ce?(K!==vn||tt!==zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),b}function yt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=H,this.setTexture2D=q,this.setTexture2DArray=N,this.setTexture3D=V,this.setTextureCube=B,this.rebindTextures=It,this.setupRenderTarget=Qt,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=St}function yx(i,t){function e(n,s=Jn){let r;const a=Jt.getTransfer(s);if(n===zn)return i.UNSIGNED_BYTE;if(n===ll)return i.UNSIGNED_SHORT_4_4_4_4;if(n===cl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===uu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===cu)return i.BYTE;if(n===hu)return i.SHORT;if(n===ks)return i.UNSIGNED_SHORT;if(n===ol)return i.INT;if(n===_i)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===xn)return i.HALF_FLOAT;if(n===fu)return i.ALPHA;if(n===du)return i.RGB;if(n===vn)return i.RGBA;if(n===pu)return i.LUMINANCE;if(n===mu)return i.LUMINANCE_ALPHA;if(n===Zi)return i.DEPTH_COMPONENT;if(n===ns)return i.DEPTH_STENCIL;if(n===hl)return i.RED;if(n===ul)return i.RED_INTEGER;if(n===gu)return i.RG;if(n===fl)return i.RG_INTEGER;if(n===dl)return i.RGBA_INTEGER;if(n===Rr||n===Pr||n===Lr||n===Dr)if(a===ce)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Rr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Rr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Pr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Lr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===mo||n===go||n===vo||n===xo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===mo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===go)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===vo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===xo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===_o||n===yo||n===Mo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===_o||n===yo)return a===ce?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Mo)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===So||n===bo||n===Eo||n===To||n===wo||n===Ao||n===Co||n===Ro||n===Po||n===Lo||n===Do||n===Io||n===Uo||n===No)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===So)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===bo)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Eo)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===To)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===wo)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ao)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Co)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ro)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Po)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Lo)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Do)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Io)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Uo)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===No)return a===ce?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ir||n===Fo||n===Oo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ir)return a===ce?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Fo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Oo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===vu||n===ko||n===Bo||n===zo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ir)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ko)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Bo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===zo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===es?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Mx extends qe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class mi extends Ue{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Sx={type:"move"};class Ha{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const x of t.hand.values()){const g=e.getJointPose(x,n),p=this._getHandJoint(c,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;c.inputState.pinching&&f>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Sx)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new mi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const bx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ex=`
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

}`;class Tx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new ke,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ae({vertexShader:bx,fragmentShader:Ex,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ue(new ze(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wx extends ls{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,m=null;const x=new Tx,g=e.getContextAttributes();let p=null,M=null;const v=[],_=[],C=new rt;let w=null;const R=new qe;R.viewport=new oe;const L=new qe;L.viewport=new oe;const S=[R,L],y=new Mx;let P=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let it=v[Z];return it===void 0&&(it=new Ha,v[Z]=it),it.getTargetRaySpace()},this.getControllerGrip=function(Z){let it=v[Z];return it===void 0&&(it=new Ha,v[Z]=it),it.getGripSpace()},this.getHand=function(Z){let it=v[Z];return it===void 0&&(it=new Ha,v[Z]=it),it.getHandSpace()};function z(Z){const it=_.indexOf(Z.inputSource);if(it===-1)return;const _t=v[it];_t!==void 0&&(_t.update(Z.inputSource,Z.frame,c||a),_t.dispatchEvent({type:Z.type,data:Z.inputSource}))}function k(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",q);for(let Z=0;Z<v.length;Z++){const it=_[Z];it!==null&&(_[Z]=null,v[Z].disconnect(it))}P=null,H=null,x.reset(),t.setRenderTarget(p),d=null,f=null,u=null,s=null,M=null,Ht.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",k),s.addEventListener("inputsourceschange",q),g.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(C),s.renderState.layers===void 0){const it={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,it),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new nn(d.framebufferWidth,d.framebufferHeight,{format:vn,type:zn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let it=null,_t=null,ot=null;g.depth&&(ot=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=g.stencil?ns:Zi,_t=g.stencil?es:_i);const Rt={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(Rt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),M=new nn(f.textureWidth,f.textureHeight,{format:vn,type:zn,depthTexture:new Lu(f.textureWidth,f.textureHeight,_t,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ht.setContext(s),Ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function q(Z){for(let it=0;it<Z.removed.length;it++){const _t=Z.removed[it],ot=_.indexOf(_t);ot>=0&&(_[ot]=null,v[ot].disconnect(_t))}for(let it=0;it<Z.added.length;it++){const _t=Z.added[it];let ot=_.indexOf(_t);if(ot===-1){for(let Ot=0;Ot<v.length;Ot++)if(Ot>=_.length){_.push(_t),ot=Ot;break}else if(_[Ot]===null){_[Ot]=_t,ot=Ot;break}if(ot===-1)break}const Rt=v[ot];Rt&&Rt.connect(_t)}}const N=new I,V=new I;function B(Z,it,_t){N.setFromMatrixPosition(it.matrixWorld),V.setFromMatrixPosition(_t.matrixWorld);const ot=N.distanceTo(V),Rt=it.projectionMatrix.elements,Ot=_t.projectionMatrix.elements,It=Rt[14]/(Rt[10]-1),Qt=Rt[14]/(Rt[10]+1),Q=(Rt[9]+1)/Rt[5],lt=(Rt[9]-1)/Rt[5],D=(Rt[8]-1)/Rt[0],Pt=(Ot[8]+1)/Ot[0],st=It*D,St=It*Pt,ut=ot/(-D+Pt),Nt=ut*-D;if(it.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Nt),Z.translateZ(ut),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Rt[10]===-1)Z.projectionMatrix.copy(it.projectionMatrix),Z.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const yt=It+ut,A=Qt+ut,b=st-Nt,G=St+(ot-Nt),K=Q*Qt/A*yt,tt=lt*Qt/A*yt;Z.projectionMatrix.makePerspective(b,G,K,tt,yt,A),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function nt(Z,it){it===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(it.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let it=Z.near,_t=Z.far;x.texture!==null&&(x.depthNear>0&&(it=x.depthNear),x.depthFar>0&&(_t=x.depthFar)),y.near=L.near=R.near=it,y.far=L.far=R.far=_t,(P!==y.near||H!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),P=y.near,H=y.far),R.layers.mask=Z.layers.mask|2,L.layers.mask=Z.layers.mask|4,y.layers.mask=R.layers.mask|L.layers.mask;const ot=Z.parent,Rt=y.cameras;nt(y,ot);for(let Ot=0;Ot<Rt.length;Ot++)nt(Rt[Ot],ot);Rt.length===2?B(y,R,L):y.projectionMatrix.copy(R.projectionMatrix),ht(Z,y,ot)};function ht(Z,it,_t){_t===null?Z.matrix.copy(it.matrixWorld):(Z.matrix.copy(_t.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(it.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(it.projectionMatrix),Z.projectionMatrixInverse.copy(it.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Ho*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(Z){l=Z,f!==null&&(f.fixedFoveation=Z),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Z)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let ft=null;function Dt(Z,it){if(h=it.getViewerPose(c||a),m=it,h!==null){const _t=h.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let ot=!1;_t.length!==y.cameras.length&&(y.cameras.length=0,ot=!0);for(let Ot=0;Ot<_t.length;Ot++){const It=_t[Ot];let Qt=null;if(d!==null)Qt=d.getViewport(It);else{const lt=u.getViewSubImage(f,It);Qt=lt.viewport,Ot===0&&(t.setRenderTargetTextures(M,lt.colorTexture,f.ignoreDepthValues?void 0:lt.depthStencilTexture),t.setRenderTarget(M))}let Q=S[Ot];Q===void 0&&(Q=new qe,Q.layers.enable(Ot),Q.viewport=new oe,S[Ot]=Q),Q.matrix.fromArray(It.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(It.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(Qt.x,Qt.y,Qt.width,Qt.height),Ot===0&&(y.matrix.copy(Q.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ot===!0&&y.cameras.push(Q)}const Rt=s.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")){const Ot=u.getDepthInformation(_t[0]);Ot&&Ot.isValid&&Ot.texture&&x.init(t,Ot,s.renderState)}}for(let _t=0;_t<v.length;_t++){const ot=_[_t],Rt=v[_t];ot!==null&&Rt!==void 0&&Rt.update(ot,it,c||a)}ft&&ft(Z,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),m=null}const Ht=new Pu;Ht.setAnimationLoop(Dt),this.setAnimationLoop=function(Z){ft=Z},this.dispose=function(){}}}const ci=new _n,Ax=new ie;function Cx(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Au(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,M,v,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,_)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),x(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,M,v):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===He&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===He&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const M=t.get(p),v=M.envMap,_=M.envMapRotation;v&&(g.envMap.value=v,ci.copy(_),ci.x*=-1,ci.y*=-1,ci.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ci.y*=-1,ci.z*=-1),g.envMapRotation.value.setFromMatrix4(Ax.makeRotationFromEuler(ci)),g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,M,v){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*M,g.scale.value=v*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,M){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===He&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){const M=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Rx(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,v){const _=v.program;n.uniformBlockBinding(M,_)}function c(M,v){let _=s[M.id];_===void 0&&(m(M),_=h(M),s[M.id]=_,M.addEventListener("dispose",g));const C=v.program;n.updateUBOMapping(M,C);const w=t.render.frame;r[M.id]!==w&&(f(M),r[M.id]=w)}function h(M){const v=u();M.__bindingPointIndex=v;const _=i.createBuffer(),C=M.__size,w=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,C,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,_),_}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const v=s[M.id],_=M.uniforms,C=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let w=0,R=_.length;w<R;w++){const L=Array.isArray(_[w])?_[w]:[_[w]];for(let S=0,y=L.length;S<y;S++){const P=L[S];if(d(P,w,S,C)===!0){const H=P.__offset,z=Array.isArray(P.value)?P.value:[P.value];let k=0;for(let q=0;q<z.length;q++){const N=z[q],V=x(N);typeof N=="number"||typeof N=="boolean"?(P.__data[0]=N,i.bufferSubData(i.UNIFORM_BUFFER,H+k,P.__data)):N.isMatrix3?(P.__data[0]=N.elements[0],P.__data[1]=N.elements[1],P.__data[2]=N.elements[2],P.__data[3]=0,P.__data[4]=N.elements[3],P.__data[5]=N.elements[4],P.__data[6]=N.elements[5],P.__data[7]=0,P.__data[8]=N.elements[6],P.__data[9]=N.elements[7],P.__data[10]=N.elements[8],P.__data[11]=0):(N.toArray(P.__data,k),k+=V.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,v,_,C){const w=M.value,R=v+"_"+_;if(C[R]===void 0)return typeof w=="number"||typeof w=="boolean"?C[R]=w:C[R]=w.clone(),!0;{const L=C[R];if(typeof w=="number"||typeof w=="boolean"){if(L!==w)return C[R]=w,!0}else if(L.equals(w)===!1)return L.copy(w),!0}return!1}function m(M){const v=M.uniforms;let _=0;const C=16;for(let R=0,L=v.length;R<L;R++){const S=Array.isArray(v[R])?v[R]:[v[R]];for(let y=0,P=S.length;y<P;y++){const H=S[y],z=Array.isArray(H.value)?H.value:[H.value];for(let k=0,q=z.length;k<q;k++){const N=z[k],V=x(N),B=_%C,nt=B%V.boundary,ht=B+nt;_+=nt,ht!==0&&C-ht<V.storage&&(_+=C-ht),H.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=_,_+=V.storage}}}const w=_%C;return w>0&&(_+=C-w),M.__size=_,M.__cache={},this}function x(M){const v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function g(M){const v=M.target;v.removeEventListener("dispose",g);const _=a.indexOf(v.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Px{constructor(t={}){const{canvas:e=_p(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const m=new Uint32Array(4),x=new Int32Array(4);let g=null,p=null;const M=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Xe,this.toneMapping=ti,this.toneMappingExposure=1;const _=this;let C=!1,w=0,R=0,L=null,S=-1,y=null;const P=new oe,H=new oe;let z=null;const k=new Ut(0);let q=0,N=e.width,V=e.height,B=1,nt=null,ht=null;const ft=new oe(0,0,N,V),Dt=new oe(0,0,N,V);let Ht=!1;const Z=new ml;let it=!1,_t=!1;const ot=new ie,Rt=new ie,Ot=new I,It=new oe,Qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Q=!1;function lt(){return L===null?B:1}let D=n;function Pt(E,F){return e.getContext(E,F)}try{const E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${rl}`),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",xt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),D===null){const F="webgl2";if(D=Pt(F,E),D===null)throw Pt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let st,St,ut,Nt,yt,A,b,G,K,tt,J,Tt,pt,Mt,Zt,at,bt,Ft,Bt,Et,Kt,Xt,me,U;function mt(){st=new Ng(D),st.init(),Xt=new yx(D,st),St=new Rg(D,st,t,Xt),ut=new vx(D,st),St.reverseDepthBuffer&&f&&ut.buffers.depth.setReversed(!0),Nt=new kg(D),yt=new nx,A=new _x(D,st,ut,yt,St,Xt,Nt),b=new Lg(_),G=new Ug(_),K=new Xp(D),me=new Ag(D,K),tt=new Fg(D,K,Nt,me),J=new zg(D,tt,K,Nt),Bt=new Bg(D,St,A),at=new Pg(yt),Tt=new ex(_,b,G,st,St,me,at),pt=new Cx(_,yt),Mt=new sx,Zt=new hx(st),Ft=new wg(_,b,G,ut,J,d,l),bt=new mx(_,J,St),U=new Rx(D,Nt,St,ut),Et=new Cg(D,st,Nt),Kt=new Og(D,st,Nt),Nt.programs=Tt.programs,_.capabilities=St,_.extensions=st,_.properties=yt,_.renderLists=Mt,_.shadowMap=bt,_.state=ut,_.info=Nt}mt();const Y=new wx(_,D);this.xr=Y,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const E=st.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=st.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(E){E!==void 0&&(B=E,this.setSize(N,V,!1))},this.getSize=function(E){return E.set(N,V)},this.setSize=function(E,F,W=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=E,V=F,e.width=Math.floor(E*B),e.height=Math.floor(F*B),W===!0&&(e.style.width=E+"px",e.style.height=F+"px"),this.setViewport(0,0,E,F)},this.getDrawingBufferSize=function(E){return E.set(N*B,V*B).floor()},this.setDrawingBufferSize=function(E,F,W){N=E,V=F,B=W,e.width=Math.floor(E*W),e.height=Math.floor(F*W),this.setViewport(0,0,E,F)},this.getCurrentViewport=function(E){return E.copy(P)},this.getViewport=function(E){return E.copy(ft)},this.setViewport=function(E,F,W,X){E.isVector4?ft.set(E.x,E.y,E.z,E.w):ft.set(E,F,W,X),ut.viewport(P.copy(ft).multiplyScalar(B).round())},this.getScissor=function(E){return E.copy(Dt)},this.setScissor=function(E,F,W,X){E.isVector4?Dt.set(E.x,E.y,E.z,E.w):Dt.set(E,F,W,X),ut.scissor(H.copy(Dt).multiplyScalar(B).round())},this.getScissorTest=function(){return Ht},this.setScissorTest=function(E){ut.setScissorTest(Ht=E)},this.setOpaqueSort=function(E){nt=E},this.setTransparentSort=function(E){ht=E},this.getClearColor=function(E){return E.copy(Ft.getClearColor())},this.setClearColor=function(){Ft.setClearColor.apply(Ft,arguments)},this.getClearAlpha=function(){return Ft.getClearAlpha()},this.setClearAlpha=function(){Ft.setClearAlpha.apply(Ft,arguments)},this.clear=function(E=!0,F=!0,W=!0){let X=0;if(E){let O=!1;if(L!==null){const ct=L.texture.format;O=ct===dl||ct===fl||ct===ul}if(O){const ct=L.texture.type,vt=ct===zn||ct===_i||ct===ks||ct===es||ct===ll||ct===cl,wt=Ft.getClearColor(),At=Ft.getClearAlpha(),zt=wt.r,Vt=wt.g,Ct=wt.b;vt?(m[0]=zt,m[1]=Vt,m[2]=Ct,m[3]=At,D.clearBufferuiv(D.COLOR,0,m)):(x[0]=zt,x[1]=Vt,x[2]=Ct,x[3]=At,D.clearBufferiv(D.COLOR,0,x))}else X|=D.COLOR_BUFFER_BIT}F&&(X|=D.DEPTH_BUFFER_BIT),W&&(X|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",xt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),Mt.dispose(),Zt.dispose(),yt.dispose(),b.dispose(),G.dispose(),J.dispose(),me.dispose(),U.dispose(),Tt.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",Pl),Y.removeEventListener("sessionend",Ll),ii.stop()};function j(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function xt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=Nt.autoReset,F=bt.enabled,W=bt.autoUpdate,X=bt.needsUpdate,O=bt.type;mt(),Nt.autoReset=E,bt.enabled=F,bt.autoUpdate=W,bt.needsUpdate=X,bt.type=O}function gt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Gt(E){const F=E.target;F.removeEventListener("dispose",Gt),be(F)}function be(E){Ne(E),yt.remove(E)}function Ne(E){const F=yt.get(E).programs;F!==void 0&&(F.forEach(function(W){Tt.releaseProgram(W)}),E.isShaderMaterial&&Tt.releaseShaderCache(E))}this.renderBufferDirect=function(E,F,W,X,O,ct){F===null&&(F=Qt);const vt=O.isMesh&&O.matrixWorld.determinant()<0,wt=of(E,F,W,X,O);ut.setMaterial(X,vt);let At=W.index,zt=1;if(X.wireframe===!0){if(At=tt.getWireframeAttribute(W),At===void 0)return;zt=2}const Vt=W.drawRange,Ct=W.attributes.position;let te=Vt.start*zt,ge=(Vt.start+Vt.count)*zt;ct!==null&&(te=Math.max(te,ct.start*zt),ge=Math.min(ge,(ct.start+ct.count)*zt)),At!==null?(te=Math.max(te,0),ge=Math.min(ge,At.count)):Ct!=null&&(te=Math.max(te,0),ge=Math.min(ge,Ct.count));const xe=ge-te;if(xe<0||xe===1/0)return;me.setup(O,X,wt,W,At);let Ve,se=Et;if(At!==null&&(Ve=K.get(At),se=Kt,se.setIndex(Ve)),O.isMesh)X.wireframe===!0?(ut.setLineWidth(X.wireframeLinewidth*lt()),se.setMode(D.LINES)):se.setMode(D.TRIANGLES);else if(O.isLine){let Lt=X.linewidth;Lt===void 0&&(Lt=1),ut.setLineWidth(Lt*lt()),O.isLineSegments?se.setMode(D.LINES):O.isLineLoop?se.setMode(D.LINE_LOOP):se.setMode(D.LINE_STRIP)}else O.isPoints?se.setMode(D.POINTS):O.isSprite&&se.setMode(D.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)se.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(st.get("WEBGL_multi_draw"))se.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Lt=O._multiDrawStarts,An=O._multiDrawCounts,re=O._multiDrawCount,hn=At?K.get(At).bytesPerElement:1,Ti=yt.get(X).currentProgram.getUniforms();for(let Ye=0;Ye<re;Ye++)Ti.setValue(D,"_gl_DrawID",Ye),se.render(Lt[Ye]/hn,An[Ye])}else if(O.isInstancedMesh)se.renderInstances(te,xe,O.count);else if(W.isInstancedBufferGeometry){const Lt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,An=Math.min(W.instanceCount,Lt);se.renderInstances(te,xe,An)}else se.render(te,xe)};function le(E,F,W){E.transparent===!0&&E.side===Qe&&E.forceSinglePass===!1?(E.side=He,E.needsUpdate=!0,Ks(E,F,W),E.side=ei,E.needsUpdate=!0,Ks(E,F,W),E.side=Qe):Ks(E,F,W)}this.compile=function(E,F,W=null){W===null&&(W=E),p=Zt.get(W),p.init(F),v.push(p),W.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),E!==W&&E.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights();const X=new Set;return E.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ct=O.material;if(ct)if(Array.isArray(ct))for(let vt=0;vt<ct.length;vt++){const wt=ct[vt];le(wt,W,O),X.add(wt)}else le(ct,W,O),X.add(ct)}),v.pop(),p=null,X},this.compileAsync=function(E,F,W=null){const X=this.compile(E,F,W);return new Promise(O=>{function ct(){if(X.forEach(function(vt){yt.get(vt).currentProgram.isReady()&&X.delete(vt)}),X.size===0){O(E);return}setTimeout(ct,10)}st.get("KHR_parallel_shader_compile")!==null?ct():setTimeout(ct,10)})};let cn=null;function wn(E){cn&&cn(E)}function Pl(){ii.stop()}function Ll(){ii.start()}const ii=new Pu;ii.setAnimationLoop(wn),typeof self<"u"&&ii.setContext(self),this.setAnimationLoop=function(E){cn=E,Y.setAnimationLoop(E),E===null?ii.stop():ii.start()},Y.addEventListener("sessionstart",Pl),Y.addEventListener("sessionend",Ll),this.render=function(E,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(F),F=Y.getCamera()),E.isScene===!0&&E.onBeforeRender(_,E,F,L),p=Zt.get(E,v.length),p.init(F),v.push(p),Rt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Z.setFromProjectionMatrix(Rt),_t=this.localClippingEnabled,it=at.init(this.clippingPlanes,_t),g=Mt.get(E,M.length),g.init(),M.push(g),Y.enabled===!0&&Y.isPresenting===!0){const ct=_.xr.getDepthSensingMesh();ct!==null&&sa(ct,F,-1/0,_.sortObjects)}sa(E,F,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(nt,ht),Q=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Q&&Ft.addToRenderList(g,E),this.info.render.frame++,it===!0&&at.beginShadows();const W=p.state.shadowsArray;bt.render(W,E,F),it===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=g.opaque,O=g.transmissive;if(p.setupLights(),F.isArrayCamera){const ct=F.cameras;if(O.length>0)for(let vt=0,wt=ct.length;vt<wt;vt++){const At=ct[vt];Il(X,O,E,At)}Q&&Ft.render(E);for(let vt=0,wt=ct.length;vt<wt;vt++){const At=ct[vt];Dl(g,E,At,At.viewport)}}else O.length>0&&Il(X,O,E,F),Q&&Ft.render(E),Dl(g,E,F);L!==null&&(A.updateMultisampleRenderTarget(L),A.updateRenderTargetMipmap(L)),E.isScene===!0&&E.onAfterRender(_,E,F),me.resetDefaultState(),S=-1,y=null,v.pop(),v.length>0?(p=v[v.length-1],it===!0&&at.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?g=M[M.length-1]:g=null};function sa(E,F,W,X){if(E.visible===!1)return;if(E.layers.test(F.layers)){if(E.isGroup)W=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(F);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Z.intersectsSprite(E)){X&&It.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Rt);const vt=J.update(E),wt=E.material;wt.visible&&g.push(E,vt,wt,W,It.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Z.intersectsObject(E))){const vt=J.update(E),wt=E.material;if(X&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),It.copy(E.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),It.copy(vt.boundingSphere.center)),It.applyMatrix4(E.matrixWorld).applyMatrix4(Rt)),Array.isArray(wt)){const At=vt.groups;for(let zt=0,Vt=At.length;zt<Vt;zt++){const Ct=At[zt],te=wt[Ct.materialIndex];te&&te.visible&&g.push(E,vt,te,W,It.z,Ct)}}else wt.visible&&g.push(E,vt,wt,W,It.z,null)}}const ct=E.children;for(let vt=0,wt=ct.length;vt<wt;vt++)sa(ct[vt],F,W,X)}function Dl(E,F,W,X){const O=E.opaque,ct=E.transmissive,vt=E.transparent;p.setupLightsView(W),it===!0&&at.setGlobalState(_.clippingPlanes,W),X&&ut.viewport(P.copy(X)),O.length>0&&Zs(O,F,W),ct.length>0&&Zs(ct,F,W),vt.length>0&&Zs(vt,F,W),ut.buffers.depth.setTest(!0),ut.buffers.depth.setMask(!0),ut.buffers.color.setMask(!0),ut.setPolygonOffset(!1)}function Il(E,F,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[X.id]===void 0&&(p.state.transmissionRenderTarget[X.id]=new nn(1,1,{generateMipmaps:!0,type:st.has("EXT_color_buffer_half_float")||st.has("EXT_color_buffer_float")?xn:zn,minFilter:pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));const ct=p.state.transmissionRenderTarget[X.id],vt=X.viewport||P;ct.setSize(vt.z,vt.w);const wt=_.getRenderTarget();_.setRenderTarget(ct),_.getClearColor(k),q=_.getClearAlpha(),q<1&&_.setClearColor(16777215,.5),_.clear(),Q&&Ft.render(W);const At=_.toneMapping;_.toneMapping=ti;const zt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),p.setupLightsView(X),it===!0&&at.setGlobalState(_.clippingPlanes,X),Zs(E,W,X),A.updateMultisampleRenderTarget(ct),A.updateRenderTargetMipmap(ct),st.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let Ct=0,te=F.length;Ct<te;Ct++){const ge=F[Ct],xe=ge.object,Ve=ge.geometry,se=ge.material,Lt=ge.group;if(se.side===Qe&&xe.layers.test(X.layers)){const An=se.side;se.side=He,se.needsUpdate=!0,Ul(xe,W,X,Ve,se,Lt),se.side=An,se.needsUpdate=!0,Vt=!0}}Vt===!0&&(A.updateMultisampleRenderTarget(ct),A.updateRenderTargetMipmap(ct))}_.setRenderTarget(wt),_.setClearColor(k,q),zt!==void 0&&(X.viewport=zt),_.toneMapping=At}function Zs(E,F,W){const X=F.isScene===!0?F.overrideMaterial:null;for(let O=0,ct=E.length;O<ct;O++){const vt=E[O],wt=vt.object,At=vt.geometry,zt=X===null?vt.material:X,Vt=vt.group;wt.layers.test(W.layers)&&Ul(wt,F,W,At,zt,Vt)}}function Ul(E,F,W,X,O,ct){E.onBeforeRender(_,F,W,X,O,ct),E.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),O.onBeforeRender(_,F,W,X,E,ct),O.transparent===!0&&O.side===Qe&&O.forceSinglePass===!1?(O.side=He,O.needsUpdate=!0,_.renderBufferDirect(W,F,X,O,E,ct),O.side=ei,O.needsUpdate=!0,_.renderBufferDirect(W,F,X,O,E,ct),O.side=Qe):_.renderBufferDirect(W,F,X,O,E,ct),E.onAfterRender(_,F,W,X,O,ct)}function Ks(E,F,W){F.isScene!==!0&&(F=Qt);const X=yt.get(E),O=p.state.lights,ct=p.state.shadowsArray,vt=O.state.version,wt=Tt.getParameters(E,O.state,ct,F,W),At=Tt.getProgramCacheKey(wt);let zt=X.programs;X.environment=E.isMeshStandardMaterial?F.environment:null,X.fog=F.fog,X.envMap=(E.isMeshStandardMaterial?G:b).get(E.envMap||X.environment),X.envMapRotation=X.environment!==null&&E.envMap===null?F.environmentRotation:E.envMapRotation,zt===void 0&&(E.addEventListener("dispose",Gt),zt=new Map,X.programs=zt);let Vt=zt.get(At);if(Vt!==void 0){if(X.currentProgram===Vt&&X.lightsStateVersion===vt)return Fl(E,wt),Vt}else wt.uniforms=Tt.getUniforms(E),E.onBeforeCompile(wt,_),Vt=Tt.acquireProgram(wt,At),zt.set(At,Vt),X.uniforms=wt.uniforms;const Ct=X.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ct.clippingPlanes=at.uniform),Fl(E,wt),X.needsLights=cf(E),X.lightsStateVersion=vt,X.needsLights&&(Ct.ambientLightColor.value=O.state.ambient,Ct.lightProbe.value=O.state.probe,Ct.directionalLights.value=O.state.directional,Ct.directionalLightShadows.value=O.state.directionalShadow,Ct.spotLights.value=O.state.spot,Ct.spotLightShadows.value=O.state.spotShadow,Ct.rectAreaLights.value=O.state.rectArea,Ct.ltc_1.value=O.state.rectAreaLTC1,Ct.ltc_2.value=O.state.rectAreaLTC2,Ct.pointLights.value=O.state.point,Ct.pointLightShadows.value=O.state.pointShadow,Ct.hemisphereLights.value=O.state.hemi,Ct.directionalShadowMap.value=O.state.directionalShadowMap,Ct.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ct.spotShadowMap.value=O.state.spotShadowMap,Ct.spotLightMatrix.value=O.state.spotLightMatrix,Ct.spotLightMap.value=O.state.spotLightMap,Ct.pointShadowMap.value=O.state.pointShadowMap,Ct.pointShadowMatrix.value=O.state.pointShadowMatrix),X.currentProgram=Vt,X.uniformsList=null,Vt}function Nl(E){if(E.uniformsList===null){const F=E.currentProgram.getUniforms();E.uniformsList=Ur.seqWithValue(F.seq,E.uniforms)}return E.uniformsList}function Fl(E,F){const W=yt.get(E);W.outputColorSpace=F.outputColorSpace,W.batching=F.batching,W.batchingColor=F.batchingColor,W.instancing=F.instancing,W.instancingColor=F.instancingColor,W.instancingMorph=F.instancingMorph,W.skinning=F.skinning,W.morphTargets=F.morphTargets,W.morphNormals=F.morphNormals,W.morphColors=F.morphColors,W.morphTargetsCount=F.morphTargetsCount,W.numClippingPlanes=F.numClippingPlanes,W.numIntersection=F.numClipIntersection,W.vertexAlphas=F.vertexAlphas,W.vertexTangents=F.vertexTangents,W.toneMapping=F.toneMapping}function of(E,F,W,X,O){F.isScene!==!0&&(F=Qt),A.resetTextureUnits();const ct=F.fog,vt=X.isMeshStandardMaterial?F.environment:null,wt=L===null?_.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:os,At=(X.isMeshStandardMaterial?G:b).get(X.envMap||vt),zt=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Vt=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ct=!!W.morphAttributes.position,te=!!W.morphAttributes.normal,ge=!!W.morphAttributes.color;let xe=ti;X.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(xe=_.toneMapping);const Ve=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,se=Ve!==void 0?Ve.length:0,Lt=yt.get(X),An=p.state.lights;if(it===!0&&(_t===!0||E!==y)){const rn=E===y&&X.id===S;at.setState(X,E,rn)}let re=!1;X.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==An.state.version||Lt.outputColorSpace!==wt||O.isBatchedMesh&&Lt.batching===!1||!O.isBatchedMesh&&Lt.batching===!0||O.isBatchedMesh&&Lt.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Lt.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Lt.instancing===!1||!O.isInstancedMesh&&Lt.instancing===!0||O.isSkinnedMesh&&Lt.skinning===!1||!O.isSkinnedMesh&&Lt.skinning===!0||O.isInstancedMesh&&Lt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Lt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Lt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Lt.instancingMorph===!1&&O.morphTexture!==null||Lt.envMap!==At||X.fog===!0&&Lt.fog!==ct||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==at.numPlanes||Lt.numIntersection!==at.numIntersection)||Lt.vertexAlphas!==zt||Lt.vertexTangents!==Vt||Lt.morphTargets!==Ct||Lt.morphNormals!==te||Lt.morphColors!==ge||Lt.toneMapping!==xe||Lt.morphTargetsCount!==se)&&(re=!0):(re=!0,Lt.__version=X.version);let hn=Lt.currentProgram;re===!0&&(hn=Ks(X,F,O));let Ti=!1,Ye=!1,fs=!1;const _e=hn.getUniforms(),yn=Lt.uniforms;if(ut.useProgram(hn.program)&&(Ti=!0,Ye=!0,fs=!0),X.id!==S&&(S=X.id,Ye=!0),Ti||y!==E){ut.buffers.depth.getReversed()?(ot.copy(E.projectionMatrix),Mp(ot),Sp(ot),_e.setValue(D,"projectionMatrix",ot)):_e.setValue(D,"projectionMatrix",E.projectionMatrix),_e.setValue(D,"viewMatrix",E.matrixWorldInverse);const Hn=_e.map.cameraPosition;Hn!==void 0&&Hn.setValue(D,Ot.setFromMatrixPosition(E.matrixWorld)),St.logarithmicDepthBuffer&&_e.setValue(D,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&_e.setValue(D,"isOrthographic",E.isOrthographicCamera===!0),y!==E&&(y=E,Ye=!0,fs=!0)}if(O.isSkinnedMesh){_e.setOptional(D,O,"bindMatrix"),_e.setOptional(D,O,"bindMatrixInverse");const rn=O.skeleton;rn&&(rn.boneTexture===null&&rn.computeBoneTexture(),_e.setValue(D,"boneTexture",rn.boneTexture,A))}O.isBatchedMesh&&(_e.setOptional(D,O,"batchingTexture"),_e.setValue(D,"batchingTexture",O._matricesTexture,A),_e.setOptional(D,O,"batchingIdTexture"),_e.setValue(D,"batchingIdTexture",O._indirectTexture,A),_e.setOptional(D,O,"batchingColorTexture"),O._colorsTexture!==null&&_e.setValue(D,"batchingColorTexture",O._colorsTexture,A));const ds=W.morphAttributes;if((ds.position!==void 0||ds.normal!==void 0||ds.color!==void 0)&&Bt.update(O,W,hn),(Ye||Lt.receiveShadow!==O.receiveShadow)&&(Lt.receiveShadow=O.receiveShadow,_e.setValue(D,"receiveShadow",O.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(yn.envMap.value=At,yn.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&F.environment!==null&&(yn.envMapIntensity.value=F.environmentIntensity),Ye&&(_e.setValue(D,"toneMappingExposure",_.toneMappingExposure),Lt.needsLights&&lf(yn,fs),ct&&X.fog===!0&&pt.refreshFogUniforms(yn,ct),pt.refreshMaterialUniforms(yn,X,B,V,p.state.transmissionRenderTarget[E.id]),Ur.upload(D,Nl(Lt),yn,A)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Ur.upload(D,Nl(Lt),yn,A),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&_e.setValue(D,"center",O.center),_e.setValue(D,"modelViewMatrix",O.modelViewMatrix),_e.setValue(D,"normalMatrix",O.normalMatrix),_e.setValue(D,"modelMatrix",O.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const rn=X.uniformsGroups;for(let Hn=0,Gn=rn.length;Hn<Gn;Hn++){const Ol=rn[Hn];U.update(Ol,hn),U.bind(Ol,hn)}}return hn}function lf(E,F){E.ambientLightColor.needsUpdate=F,E.lightProbe.needsUpdate=F,E.directionalLights.needsUpdate=F,E.directionalLightShadows.needsUpdate=F,E.pointLights.needsUpdate=F,E.pointLightShadows.needsUpdate=F,E.spotLights.needsUpdate=F,E.spotLightShadows.needsUpdate=F,E.rectAreaLights.needsUpdate=F,E.hemisphereLights.needsUpdate=F}function cf(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(E,F,W){yt.get(E.texture).__webglTexture=F,yt.get(E.depthTexture).__webglTexture=W;const X=yt.get(E);X.__hasExternalTextures=!0,X.__autoAllocateDepthBuffer=W===void 0,X.__autoAllocateDepthBuffer||st.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,F){const W=yt.get(E);W.__webglFramebuffer=F,W.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(E,F=0,W=0){L=E,w=F,R=W;let X=!0,O=null,ct=!1,vt=!1;if(E){const At=yt.get(E);if(At.__useDefaultFramebuffer!==void 0)ut.bindFramebuffer(D.FRAMEBUFFER,null),X=!1;else if(At.__webglFramebuffer===void 0)A.setupRenderTarget(E);else if(At.__hasExternalTextures)A.rebindTextures(E,yt.get(E.texture).__webglTexture,yt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ct=E.depthTexture;if(At.__boundDepthTexture!==Ct){if(Ct!==null&&yt.has(Ct)&&(E.width!==Ct.image.width||E.height!==Ct.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(E)}}const zt=E.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(vt=!0);const Vt=yt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Vt[F])?O=Vt[F][W]:O=Vt[F],ct=!0):E.samples>0&&A.useMultisampledRTT(E)===!1?O=yt.get(E).__webglMultisampledFramebuffer:Array.isArray(Vt)?O=Vt[W]:O=Vt,P.copy(E.viewport),H.copy(E.scissor),z=E.scissorTest}else P.copy(ft).multiplyScalar(B).floor(),H.copy(Dt).multiplyScalar(B).floor(),z=Ht;if(ut.bindFramebuffer(D.FRAMEBUFFER,O)&&X&&ut.drawBuffers(E,O),ut.viewport(P),ut.scissor(H),ut.setScissorTest(z),ct){const At=yt.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+F,At.__webglTexture,W)}else if(vt){const At=yt.get(E.texture),zt=F||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,At.__webglTexture,W||0,zt)}S=-1},this.readRenderTargetPixels=function(E,F,W,X,O,ct,vt){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=yt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&vt!==void 0&&(wt=wt[vt]),wt){ut.bindFramebuffer(D.FRAMEBUFFER,wt);try{const At=E.texture,zt=At.format,Vt=At.type;if(!St.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!St.textureTypeReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=E.width-X&&W>=0&&W<=E.height-O&&D.readPixels(F,W,X,O,Xt.convert(zt),Xt.convert(Vt),ct)}finally{const At=L!==null?yt.get(L).__webglFramebuffer:null;ut.bindFramebuffer(D.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(E,F,W,X,O,ct,vt){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=yt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&vt!==void 0&&(wt=wt[vt]),wt){const At=E.texture,zt=At.format,Vt=At.type;if(!St.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!St.textureTypeReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=E.width-X&&W>=0&&W<=E.height-O){ut.bindFramebuffer(D.FRAMEBUFFER,wt);const Ct=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ct),D.bufferData(D.PIXEL_PACK_BUFFER,ct.byteLength,D.STREAM_READ),D.readPixels(F,W,X,O,Xt.convert(zt),Xt.convert(Vt),0);const te=L!==null?yt.get(L).__webglFramebuffer:null;ut.bindFramebuffer(D.FRAMEBUFFER,te);const ge=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await yp(D,ge,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ct),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ct),D.deleteBuffer(Ct),D.deleteSync(ge),ct}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,F=null,W=0){E.isTexture!==!0&&(bs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,E=arguments[1]);const X=Math.pow(2,-W),O=Math.floor(E.image.width*X),ct=Math.floor(E.image.height*X),vt=F!==null?F.x:0,wt=F!==null?F.y:0;A.setTexture2D(E,0),D.copyTexSubImage2D(D.TEXTURE_2D,W,0,0,vt,wt,O,ct),ut.unbindTexture()},this.copyTextureToTexture=function(E,F,W=null,X=null,O=0){E.isTexture!==!0&&(bs("WebGLRenderer: copyTextureToTexture function signature has changed."),X=arguments[0]||null,E=arguments[1],F=arguments[2],O=arguments[3]||0,W=null);let ct,vt,wt,At,zt,Vt,Ct,te,ge;const xe=E.isCompressedTexture?E.mipmaps[O]:E.image;W!==null?(ct=W.max.x-W.min.x,vt=W.max.y-W.min.y,wt=W.isBox3?W.max.z-W.min.z:1,At=W.min.x,zt=W.min.y,Vt=W.isBox3?W.min.z:0):(ct=xe.width,vt=xe.height,wt=xe.depth||1,At=0,zt=0,Vt=0),X!==null?(Ct=X.x,te=X.y,ge=X.z):(Ct=0,te=0,ge=0);const Ve=Xt.convert(F.format),se=Xt.convert(F.type);let Lt;F.isData3DTexture?(A.setTexture3D(F,0),Lt=D.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(A.setTexture2DArray(F,0),Lt=D.TEXTURE_2D_ARRAY):(A.setTexture2D(F,0),Lt=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,F.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,F.unpackAlignment);const An=D.getParameter(D.UNPACK_ROW_LENGTH),re=D.getParameter(D.UNPACK_IMAGE_HEIGHT),hn=D.getParameter(D.UNPACK_SKIP_PIXELS),Ti=D.getParameter(D.UNPACK_SKIP_ROWS),Ye=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,xe.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,xe.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,At),D.pixelStorei(D.UNPACK_SKIP_ROWS,zt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Vt);const fs=E.isDataArrayTexture||E.isData3DTexture,_e=F.isDataArrayTexture||F.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const yn=yt.get(E),ds=yt.get(F),rn=yt.get(yn.__renderTarget),Hn=yt.get(ds.__renderTarget);ut.bindFramebuffer(D.READ_FRAMEBUFFER,rn.__webglFramebuffer),ut.bindFramebuffer(D.DRAW_FRAMEBUFFER,Hn.__webglFramebuffer);for(let Gn=0;Gn<wt;Gn++)fs&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,yt.get(E).__webglTexture,O,Vt+Gn),E.isDepthTexture?(_e&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,yt.get(F).__webglTexture,O,ge+Gn),D.blitFramebuffer(At,zt,ct,vt,Ct,te,ct,vt,D.DEPTH_BUFFER_BIT,D.NEAREST)):_e?D.copyTexSubImage3D(Lt,O,Ct,te,ge+Gn,At,zt,ct,vt):D.copyTexSubImage2D(Lt,O,Ct,te,ge+Gn,At,zt,ct,vt);ut.bindFramebuffer(D.READ_FRAMEBUFFER,null),ut.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else _e?E.isDataTexture||E.isData3DTexture?D.texSubImage3D(Lt,O,Ct,te,ge,ct,vt,wt,Ve,se,xe.data):F.isCompressedArrayTexture?D.compressedTexSubImage3D(Lt,O,Ct,te,ge,ct,vt,wt,Ve,xe.data):D.texSubImage3D(Lt,O,Ct,te,ge,ct,vt,wt,Ve,se,xe):E.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,O,Ct,te,ct,vt,Ve,se,xe.data):E.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,O,Ct,te,xe.width,xe.height,Ve,xe.data):D.texSubImage2D(D.TEXTURE_2D,O,Ct,te,ct,vt,Ve,se,xe);D.pixelStorei(D.UNPACK_ROW_LENGTH,An),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,re),D.pixelStorei(D.UNPACK_SKIP_PIXELS,hn),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ti),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ye),O===0&&F.generateMipmaps&&D.generateMipmap(Lt),ut.unbindTexture()},this.copyTextureToTexture3D=function(E,F,W=null,X=null,O=0){return E.isTexture!==!0&&(bs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),W=arguments[0]||null,X=arguments[1]||null,E=arguments[2],F=arguments[3],O=arguments[4]||0),bs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,F,W,X,O)},this.initRenderTarget=function(E){yt.get(E).__webglFramebuffer===void 0&&A.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?A.setTextureCube(E,0):E.isData3DTexture?A.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?A.setTexture2DArray(E,0):A.setTexture2D(E,0),ut.unbindTexture()},this.resetState=function(){w=0,R=0,L=null,ut.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}}class xl{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ut(t),this.density=e}clone(){return new xl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Fu extends Ue{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Lx extends ke{constructor(t=null,e=1,n=1,s,r,a,o,l,c=en,h=en,u,f){super(null,a,o,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cs extends ln{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Hi=new ie,$c=new ie,yr=[],Zc=new Ei,Dx=new ie,_s=new ue,ys=new Xs;class Wo extends ue{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Cs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Dx)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ei),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Hi),Zc.copy(t.boundingBox).applyMatrix4(Hi),this.boundingBox.union(Zc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Xs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Hi),ys.copy(t.boundingSphere).applyMatrix4(Hi),this.boundingSphere.union(ys)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(_s.geometry=this.geometry,_s.material=this.material,_s.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ys.copy(this.boundingSphere),ys.applyMatrix4(n),t.ray.intersectsSphere(ys)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Hi),$c.multiplyMatrices(n,Hi),_s.matrixWorld=$c,_s.raycast(t,yr);for(let a=0,o=yr.length;a<o;a++){const l=yr[a];l.instanceId=r,l.object=this,e.push(l)}yr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Cs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Lx(new Float32Array(s*this.count),s,this.count,hl,En));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Ix extends ke{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Tn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(a-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new rt:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new I,s=[],r=[],a=[],o=new I,l=new ie;for(let d=0;d<=t;d++){const m=d/t;s[d]=this.getTangentAt(m,new I)}r[0]=new I,a[0]=new I;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(De(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,m))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(De(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],d*m)),a[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class _l extends Tn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new rt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Ux extends _l{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function yl(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,d*=h,s(a,o,f,d)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const Mr=new I,Ga=new yl,Va=new yl,Wa=new yl;class Nx extends Tn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new I){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Mr.subVectors(s[0],s[1]).add(s[0]),c=Mr);const u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Mr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Mr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),d),x=Math.pow(u.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(h),d);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),Ga.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,m,x,g),Va.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,m,x,g),Wa.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,m,x,g)}else this.curveType==="catmullrom"&&(Ga.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Va.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),Wa.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(Ga.calc(l),Va.calc(l),Wa.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Kc(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function Fx(i,t){const e=1-i;return e*e*t}function Ox(i,t){return 2*(1-i)*i*t}function kx(i,t){return i*i*t}function Rs(i,t,e,n){return Fx(i,t)+Ox(i,e)+kx(i,n)}function Bx(i,t){const e=1-i;return e*e*e*t}function zx(i,t){const e=1-i;return 3*e*e*i*t}function Hx(i,t){return 3*(1-i)*i*i*t}function Gx(i,t){return i*i*i*t}function Ps(i,t,e,n,s){return Bx(i,t)+zx(i,e)+Hx(i,n)+Gx(i,s)}class Ou extends Tn{constructor(t=new rt,e=new rt,n=new rt,s=new rt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new rt){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ps(t,s.x,r.x,a.x,o.x),Ps(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Vx extends Tn{constructor(t=new I,e=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new I){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ps(t,s.x,r.x,a.x,o.x),Ps(t,s.y,r.y,a.y,o.y),Ps(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ku extends Tn{constructor(t=new rt,e=new rt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new rt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new rt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Wx extends Tn{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Bu extends Tn{constructor(t=new rt,e=new rt,n=new rt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new rt){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Rs(t,s.x,r.x,a.x),Rs(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Xx extends Tn{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Rs(t,s.x,r.x,a.x),Rs(t,s.y,r.y,a.y),Rs(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class zu extends Tn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new rt){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(Kc(o,l.x,c.x,h.x,u.x),Kc(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new rt().fromArray(s))}return this}}var Xo=Object.freeze({__proto__:null,ArcCurve:Ux,CatmullRomCurve3:Nx,CubicBezierCurve:Ou,CubicBezierCurve3:Vx,EllipseCurve:_l,LineCurve:ku,LineCurve3:Wx,QuadraticBezierCurve:Bu,QuadraticBezierCurve3:Xx,SplineCurve:zu});class qx extends Tn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xo[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Xo[s.type]().fromJSON(s))}return this}}class Jc extends qx{constructor(t){super(),this.type="Path",this.currentPoint=new rt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new ku(this.currentPoint.clone(),new rt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Bu(this.currentPoint.clone(),new rt(t,e),new rt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new Ou(this.currentPoint.clone(),new rt(t,e),new rt(n,s),new rt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new zu(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){const c=new _l(t,e,n,s,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class zr extends Ge{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new I,h=new rt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*s;c.x=t*Math.cos(d),c.y=t*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ve(a,3)),this.setAttribute("normal",new ve(o,3)),this.setAttribute("uv",new ve(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zr(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class je extends Ge{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let m=0;const x=[],g=n/2;let p=0;M(),a===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new ve(u,3)),this.setAttribute("normal",new ve(f,3)),this.setAttribute("uv",new ve(d,2));function M(){const _=new I,C=new I;let w=0;const R=(e-t)/n;for(let L=0;L<=r;L++){const S=[],y=L/r,P=y*(e-t)+t;for(let H=0;H<=s;H++){const z=H/s,k=z*l+o,q=Math.sin(k),N=Math.cos(k);C.x=P*q,C.y=-y*n+g,C.z=P*N,u.push(C.x,C.y,C.z),_.set(q,R,N).normalize(),f.push(_.x,_.y,_.z),d.push(z,1-y),S.push(m++)}x.push(S)}for(let L=0;L<s;L++)for(let S=0;S<r;S++){const y=x[S][L],P=x[S+1][L],H=x[S+1][L+1],z=x[S][L+1];(t>0||S!==0)&&(h.push(y,P,z),w+=3),(e>0||S!==r-1)&&(h.push(P,H,z),w+=3)}c.addGroup(p,w,0),p+=w}function v(_){const C=m,w=new rt,R=new I;let L=0;const S=_===!0?t:e,y=_===!0?1:-1;for(let H=1;H<=s;H++)u.push(0,g*y,0),f.push(0,y,0),d.push(.5,.5),m++;const P=m;for(let H=0;H<=s;H++){const k=H/s*l+o,q=Math.cos(k),N=Math.sin(k);R.x=S*N,R.y=g*y,R.z=S*q,u.push(R.x,R.y,R.z),f.push(0,y,0),w.x=q*.5+.5,w.y=N*.5*y+.5,d.push(w.x,w.y),m++}for(let H=0;H<s;H++){const z=C+H,k=P+H;_===!0?h.push(k,k+1,z):h.push(k+1,k,z),L+=3}c.addGroup(p,L,_===!0?1:2),p+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new je(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ml extends je{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Ml(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ys extends Ge{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new ve(r,3)),this.setAttribute("normal",new ve(r.slice(),3)),this.setAttribute("uv",new ve(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const v=new I,_=new I,C=new I;for(let w=0;w<e.length;w+=3)d(e[w+0],v),d(e[w+1],_),d(e[w+2],C),l(v,_,C,M)}function l(M,v,_,C){const w=C+1,R=[];for(let L=0;L<=w;L++){R[L]=[];const S=M.clone().lerp(_,L/w),y=v.clone().lerp(_,L/w),P=w-L;for(let H=0;H<=P;H++)H===0&&L===w?R[L][H]=S:R[L][H]=S.clone().lerp(y,H/P)}for(let L=0;L<w;L++)for(let S=0;S<2*(w-L)-1;S++){const y=Math.floor(S/2);S%2===0?(f(R[L][y+1]),f(R[L+1][y]),f(R[L][y])):(f(R[L][y+1]),f(R[L+1][y+1]),f(R[L+1][y]))}}function c(M){const v=new I;for(let _=0;_<r.length;_+=3)v.x=r[_+0],v.y=r[_+1],v.z=r[_+2],v.normalize().multiplyScalar(M),r[_+0]=v.x,r[_+1]=v.y,r[_+2]=v.z}function h(){const M=new I;for(let v=0;v<r.length;v+=3){M.x=r[v+0],M.y=r[v+1],M.z=r[v+2];const _=g(M)/2/Math.PI+.5,C=p(M)/Math.PI+.5;a.push(_,1-C)}m(),u()}function u(){for(let M=0;M<a.length;M+=6){const v=a[M+0],_=a[M+2],C=a[M+4],w=Math.max(v,_,C),R=Math.min(v,_,C);w>.9&&R<.1&&(v<.2&&(a[M+0]+=1),_<.2&&(a[M+2]+=1),C<.2&&(a[M+4]+=1))}}function f(M){r.push(M.x,M.y,M.z)}function d(M,v){const _=M*3;v.x=t[_+0],v.y=t[_+1],v.z=t[_+2]}function m(){const M=new I,v=new I,_=new I,C=new I,w=new rt,R=new rt,L=new rt;for(let S=0,y=0;S<r.length;S+=9,y+=6){M.set(r[S+0],r[S+1],r[S+2]),v.set(r[S+3],r[S+4],r[S+5]),_.set(r[S+6],r[S+7],r[S+8]),w.set(a[y+0],a[y+1]),R.set(a[y+2],a[y+3]),L.set(a[y+4],a[y+5]),C.copy(M).add(v).add(_).divideScalar(3);const P=g(C);x(w,y+0,M,P),x(R,y+2,v,P),x(L,y+4,_,P)}}function x(M,v,_,C){C<0&&M.x===1&&(a[v]=M.x-1),_.x===0&&_.z===0&&(a[v]=C/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ys(t.vertices,t.indices,t.radius,t.details)}}class Sl extends Jc{constructor(t){super(t),this.uuid=cs(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Jc().fromJSON(s))}return this}}const Yx={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Hu(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,u,f,d;if(n&&(r=jx(i,t,r,e)),i.length>80*e){o=c=i[0],l=h=i[1];for(let m=e;m<s;m+=e)u=i[m],f=i[m+1],u<o&&(o=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);d=Math.max(c-o,h-l),d=d!==0?32767/d:0}return Bs(r,a,e,o,l,d,0),a}};function Hu(i,t,e,n,s){let r,a;if(s===c_(i,t,e,n)>0)for(r=t;r<e;r+=n)a=jc(r,i[r],i[r+1],a);else for(r=e-n;r>=t;r-=n)a=jc(r,i[r],i[r+1],a);return a&&Jr(a,a.next)&&(Hs(a),a=a.next),a}function yi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Jr(e,e.next)||Se(e.prev,e,e.next)===0)){if(Hs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Bs(i,t,e,n,s,r,a){if(!i)return;!a&&r&&i_(i,n,s,r);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?Zx(i,n,s,r):$x(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),Hs(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Kx(yi(i),t,e),Bs(i,t,e,n,s,r,2)):a===2&&Jx(i,t,e,n,s,r):Bs(yi(i),t,e,n,s,r,1);break}}}function $x(i){const t=i.prev,e=i,n=i.next;if(Se(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=s<r?s<a?s:a:r<a?r:a,u=o<l?o<c?o:c:l<c?l:c,f=s>r?s>a?s:a:r>a?r:a,d=o>l?o>c?o:c:l>c?l:c;let m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=f&&m.y>=u&&m.y<=d&&qi(s,o,r,l,a,c,m.x,m.y)&&Se(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Zx(i,t,e,n){const s=i.prev,r=i,a=i.next;if(Se(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,u=r.y,f=a.y,d=o<l?o<c?o:c:l<c?l:c,m=h<u?h<f?h:f:u<f?u:f,x=o>l?o>c?o:c:l>c?l:c,g=h>u?h>f?h:f:u>f?u:f,p=qo(d,m,t,e,n),M=qo(x,g,t,e,n);let v=i.prevZ,_=i.nextZ;for(;v&&v.z>=p&&_&&_.z<=M;){if(v.x>=d&&v.x<=x&&v.y>=m&&v.y<=g&&v!==s&&v!==a&&qi(o,h,l,u,c,f,v.x,v.y)&&Se(v.prev,v,v.next)>=0||(v=v.prevZ,_.x>=d&&_.x<=x&&_.y>=m&&_.y<=g&&_!==s&&_!==a&&qi(o,h,l,u,c,f,_.x,_.y)&&Se(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;v&&v.z>=p;){if(v.x>=d&&v.x<=x&&v.y>=m&&v.y<=g&&v!==s&&v!==a&&qi(o,h,l,u,c,f,v.x,v.y)&&Se(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;_&&_.z<=M;){if(_.x>=d&&_.x<=x&&_.y>=m&&_.y<=g&&_!==s&&_!==a&&qi(o,h,l,u,c,f,_.x,_.y)&&Se(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Kx(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!Jr(s,r)&&Gu(s,n,n.next,r)&&zs(s,r)&&zs(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Hs(n),Hs(n.next),n=i=r),n=n.next}while(n!==i);return yi(n)}function Jx(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&a_(a,o)){let l=Vu(a,o);a=yi(a,a.next),l=yi(l,l.next),Bs(a,t,e,n,s,r,0),Bs(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function jx(i,t,e,n){const s=[];let r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=Hu(i,o,l,n,!1),c===c.next&&(c.steiner=!0),s.push(r_(c));for(s.sort(Qx),r=0;r<s.length;r++)e=t_(s[r],e);return e}function Qx(i,t){return i.x-t.x}function t_(i,t){const e=e_(i,t);if(!e)return t;const n=Vu(e,i);return yi(n,n.next),yi(e,e.next)}function e_(i,t){let e=t,n=-1/0,s;const r=i.x,a=i.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const f=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;const o=s,l=s.x,c=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&qi(a<c?r:n,a,l,c,a<c?n:r,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(r-e.x),zs(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&n_(s,e)))&&(s=e,h=u)),e=e.next;while(e!==o);return s}function n_(i,t){return Se(i.prev,i,t.prev)<0&&Se(t.next,i,i.next)<0}function i_(i,t,e,n){let s=i;do s.z===0&&(s.z=qo(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,s_(s)}function s_(i){let t,e,n,s,r,a,o,l,c=1;do{for(e=i,i=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,o--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(a>1);return i}function qo(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function r_(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function qi(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function a_(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!o_(i,t)&&(zs(i,t)&&zs(t,i)&&l_(i,t)&&(Se(i.prev,i,t.prev)||Se(i,t.prev,t))||Jr(i,t)&&Se(i.prev,i,i.next)>0&&Se(t.prev,t,t.next)>0)}function Se(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Jr(i,t){return i.x===t.x&&i.y===t.y}function Gu(i,t,e,n){const s=br(Se(i,t,e)),r=br(Se(i,t,n)),a=br(Se(e,n,i)),o=br(Se(e,n,t));return!!(s!==r&&a!==o||s===0&&Sr(i,e,t)||r===0&&Sr(i,n,t)||a===0&&Sr(e,i,n)||o===0&&Sr(e,t,n))}function Sr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function br(i){return i>0?1:i<0?-1:0}function o_(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Gu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function zs(i,t){return Se(i.prev,i,i.next)<0?Se(i,t,i.next)>=0&&Se(i,i.prev,t)>=0:Se(i,t,i.prev)<0||Se(i,i.next,t)<0}function l_(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Vu(i,t){const e=new Yo(i.i,i.x,i.y),n=new Yo(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function jc(i,t,e,n){const s=new Yo(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Hs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Yo(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function c_(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Ls{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Ls.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];Qc(t),th(n,t);let a=t.length;e.forEach(Qc);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,th(n,e[l]);const o=Yx.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Qc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function th(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class jr extends Ge{constructor(t=new Sl([new rt(.5,.5),new rt(-.5,.5),new rt(-.5,-.5),new rt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new ve(s,3)),this.setAttribute("uv",new ve(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:d-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:h_;let v,_=!1,C,w,R,L;p&&(v=p.getSpacedPoints(h),_=!0,f=!1,C=p.computeFrenetFrames(h,!1),w=new I,R=new I,L=new I),f||(g=0,d=0,m=0,x=0);const S=o.extractPoints(c);let y=S.shape;const P=S.holes;if(!Ls.isClockWise(y)){y=y.reverse();for(let Q=0,lt=P.length;Q<lt;Q++){const D=P[Q];Ls.isClockWise(D)&&(P[Q]=D.reverse())}}const z=Ls.triangulateShape(y,P),k=y;for(let Q=0,lt=P.length;Q<lt;Q++){const D=P[Q];y=y.concat(D)}function q(Q,lt,D){return lt||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(lt,D)}const N=y.length,V=z.length;function B(Q,lt,D){let Pt,st,St;const ut=Q.x-lt.x,Nt=Q.y-lt.y,yt=D.x-Q.x,A=D.y-Q.y,b=ut*ut+Nt*Nt,G=ut*A-Nt*yt;if(Math.abs(G)>Number.EPSILON){const K=Math.sqrt(b),tt=Math.sqrt(yt*yt+A*A),J=lt.x-Nt/K,Tt=lt.y+ut/K,pt=D.x-A/tt,Mt=D.y+yt/tt,Zt=((pt-J)*A-(Mt-Tt)*yt)/(ut*A-Nt*yt);Pt=J+ut*Zt-Q.x,st=Tt+Nt*Zt-Q.y;const at=Pt*Pt+st*st;if(at<=2)return new rt(Pt,st);St=Math.sqrt(at/2)}else{let K=!1;ut>Number.EPSILON?yt>Number.EPSILON&&(K=!0):ut<-Number.EPSILON?yt<-Number.EPSILON&&(K=!0):Math.sign(Nt)===Math.sign(A)&&(K=!0),K?(Pt=-Nt,st=ut,St=Math.sqrt(b)):(Pt=ut,st=Nt,St=Math.sqrt(b/2))}return new rt(Pt/St,st/St)}const nt=[];for(let Q=0,lt=k.length,D=lt-1,Pt=Q+1;Q<lt;Q++,D++,Pt++)D===lt&&(D=0),Pt===lt&&(Pt=0),nt[Q]=B(k[Q],k[D],k[Pt]);const ht=[];let ft,Dt=nt.concat();for(let Q=0,lt=P.length;Q<lt;Q++){const D=P[Q];ft=[];for(let Pt=0,st=D.length,St=st-1,ut=Pt+1;Pt<st;Pt++,St++,ut++)St===st&&(St=0),ut===st&&(ut=0),ft[Pt]=B(D[Pt],D[St],D[ut]);ht.push(ft),Dt=Dt.concat(ft)}for(let Q=0;Q<g;Q++){const lt=Q/g,D=d*Math.cos(lt*Math.PI/2),Pt=m*Math.sin(lt*Math.PI/2)+x;for(let st=0,St=k.length;st<St;st++){const ut=q(k[st],nt[st],Pt);ot(ut.x,ut.y,-D)}for(let st=0,St=P.length;st<St;st++){const ut=P[st];ft=ht[st];for(let Nt=0,yt=ut.length;Nt<yt;Nt++){const A=q(ut[Nt],ft[Nt],Pt);ot(A.x,A.y,-D)}}}const Ht=m+x;for(let Q=0;Q<N;Q++){const lt=f?q(y[Q],Dt[Q],Ht):y[Q];_?(R.copy(C.normals[0]).multiplyScalar(lt.x),w.copy(C.binormals[0]).multiplyScalar(lt.y),L.copy(v[0]).add(R).add(w),ot(L.x,L.y,L.z)):ot(lt.x,lt.y,0)}for(let Q=1;Q<=h;Q++)for(let lt=0;lt<N;lt++){const D=f?q(y[lt],Dt[lt],Ht):y[lt];_?(R.copy(C.normals[Q]).multiplyScalar(D.x),w.copy(C.binormals[Q]).multiplyScalar(D.y),L.copy(v[Q]).add(R).add(w),ot(L.x,L.y,L.z)):ot(D.x,D.y,u/h*Q)}for(let Q=g-1;Q>=0;Q--){const lt=Q/g,D=d*Math.cos(lt*Math.PI/2),Pt=m*Math.sin(lt*Math.PI/2)+x;for(let st=0,St=k.length;st<St;st++){const ut=q(k[st],nt[st],Pt);ot(ut.x,ut.y,u+D)}for(let st=0,St=P.length;st<St;st++){const ut=P[st];ft=ht[st];for(let Nt=0,yt=ut.length;Nt<yt;Nt++){const A=q(ut[Nt],ft[Nt],Pt);_?ot(A.x,A.y+v[h-1].y,v[h-1].x+D):ot(A.x,A.y,u+D)}}}Z(),it();function Z(){const Q=s.length/3;if(f){let lt=0,D=N*lt;for(let Pt=0;Pt<V;Pt++){const st=z[Pt];Rt(st[2]+D,st[1]+D,st[0]+D)}lt=h+g*2,D=N*lt;for(let Pt=0;Pt<V;Pt++){const st=z[Pt];Rt(st[0]+D,st[1]+D,st[2]+D)}}else{for(let lt=0;lt<V;lt++){const D=z[lt];Rt(D[2],D[1],D[0])}for(let lt=0;lt<V;lt++){const D=z[lt];Rt(D[0]+N*h,D[1]+N*h,D[2]+N*h)}}n.addGroup(Q,s.length/3-Q,0)}function it(){const Q=s.length/3;let lt=0;_t(k,lt),lt+=k.length;for(let D=0,Pt=P.length;D<Pt;D++){const st=P[D];_t(st,lt),lt+=st.length}n.addGroup(Q,s.length/3-Q,1)}function _t(Q,lt){let D=Q.length;for(;--D>=0;){const Pt=D;let st=D-1;st<0&&(st=Q.length-1);for(let St=0,ut=h+g*2;St<ut;St++){const Nt=N*St,yt=N*(St+1),A=lt+Pt+Nt,b=lt+st+Nt,G=lt+st+yt,K=lt+Pt+yt;Ot(A,b,G,K)}}}function ot(Q,lt,D){l.push(Q),l.push(lt),l.push(D)}function Rt(Q,lt,D){It(Q),It(lt),It(D);const Pt=s.length/3,st=M.generateTopUV(n,s,Pt-3,Pt-2,Pt-1);Qt(st[0]),Qt(st[1]),Qt(st[2])}function Ot(Q,lt,D,Pt){It(Q),It(lt),It(Pt),It(lt),It(D),It(Pt);const st=s.length/3,St=M.generateSideWallUV(n,s,st-6,st-3,st-2,st-1);Qt(St[0]),Qt(St[1]),Qt(St[3]),Qt(St[1]),Qt(St[2]),Qt(St[3])}function It(Q){s.push(l[Q*3+0]),s.push(l[Q*3+1]),s.push(l[Q*3+2])}function Qt(Q){r.push(Q.x),r.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return u_(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Xo[s.type]().fromJSON(s)),new jr(n,t.options)}}const h_={generateTopUV:function(i,t,e,n,s){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new rt(r,a),new rt(o,l),new rt(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[s*3],d=t[s*3+1],m=t[s*3+2],x=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new rt(a,1-l),new rt(c,1-u),new rt(f,1-m),new rt(x,1-p)]:[new rt(o,1-l),new rt(h,1-u),new rt(d,1-m),new rt(g,1-p)]}};function u_(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Kn extends Ys{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Kn(t.radius,t.detail)}}class Ds extends Ys{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ds(t.radius,t.detail)}}class mn extends Ge{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new I,f=new I,d=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){const M=[],v=p/n;let _=0;p===0&&a===0?_=.5/e:p===n&&l===Math.PI&&(_=-.5/e);for(let C=0;C<=e;C++){const w=C/e;u.x=-t*Math.cos(s+w*r)*Math.sin(a+v*o),u.y=t*Math.cos(a+v*o),u.z=t*Math.sin(s+w*r)*Math.sin(a+v*o),m.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),g.push(w+_,1-v),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const v=h[p][M+1],_=h[p][M],C=h[p+1][M],w=h[p+1][M+1];(p!==0||a>0)&&d.push(v,_,w),(p!==n-1||l<Math.PI)&&d.push(_,C,w)}this.setIndex(d),this.setAttribute("position",new ve(m,3)),this.setAttribute("normal",new ve(x,3)),this.setAttribute("uv",new ve(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new mn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class bl extends Ys{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new bl(t.radius,t.detail)}}class Qn extends Ge{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],h=new I,u=new I,f=new I;for(let d=0;d<=n;d++)for(let m=0;m<=s;m++){const x=m/s*r,g=d/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(x),u.y=(t+e*Math.cos(g))*Math.sin(x),u.z=e*Math.sin(g),o.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(m/s),c.push(d/n)}for(let d=1;d<=n;d++)for(let m=1;m<=s;m++){const x=(s+1)*d+m-1,g=(s+1)*(d-1)+m-1,p=(s+1)*(d-1)+m,M=(s+1)*d+m;a.push(x,g,M),a.push(g,p,M)}this.setIndex(a),this.setAttribute("position",new ve(o,3)),this.setAttribute("normal",new ve(l,3)),this.setAttribute("uv",new ve(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qn(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class f_ extends Ae{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class jn extends qs{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ut(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xu,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class d_ extends jn{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new rt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return De(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ut(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ut(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ut(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class El extends Ue{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ut(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class p_ extends El{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ue.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ut(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Xa=new ie,eh=new I,nh=new I;class Wu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new rt(512,512),this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ml,this._frameExtents=new rt(1,1),this._viewportCount=1,this._viewports=[new oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;eh.setFromMatrixPosition(t.matrixWorld),e.position.copy(eh),nh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(nh),e.updateMatrixWorld(),Xa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Xa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const ih=new ie,Ms=new I,qa=new I;class m_ extends Wu{constructor(){super(new qe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new rt(4,2),this._viewportCount=6,this._viewports=[new oe(2,1,1,1),new oe(0,1,1,1),new oe(3,1,1,1),new oe(1,1,1,1),new oe(3,0,1,1),new oe(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ms.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ms),qa.copy(n.position),qa.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(qa),n.updateMatrixWorld(),s.makeTranslation(-Ms.x,-Ms.y,-Ms.z),ih.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ih)}}class g_ extends El{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new m_}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class v_ extends Wu{constructor(){super(new gl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class sh extends El{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ue.DEFAULT_UP),this.updateMatrix(),this.target=new Ue,this.shadow=new v_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class x_{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=rh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=rh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function rh(){return performance.now()}const ah=new ie;class __{constructor(t,e,n=0,s=1/0){this.ray=new bu(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new pl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ah.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ah),this}intersectObject(t,e=!0,n=[]){return $o(t,this,n,e),n.sort(oh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)$o(t[s],this,n,e);return n.sort(oh),n}}function oh(i,t){return i.distance-t.distance}function $o(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)$o(r[a],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rl);const lh=new ie,ch=new ni,hh=new _n,uh=new I,fh=new I;class y_{constructor(t,e,n,s={}){$(this,"mesh");$(this,"cap");$(this,"n",0);$(this,"m");$(this,"c");$(this,"g");$(this,"extra",{});$(this,"extraAttr",[]);$(this,"glowAttr",null);if(this.cap=n,this.mesh=new Wo(t,e,n),this.mesh.instanceMatrix.setUsage(Qs),this.m=this.mesh.instanceMatrix.array,this.c=null,s.color!==!1){const r=new Cs(new Float32Array(n*3).fill(1),3);r.setUsage(Qs),this.mesh.instanceColor=r,this.c=r.array}if(this.g=null,s.glow&&(this.glowAttr=new Cs(new Float32Array(n*3),3),this.glowAttr.setUsage(Qs),t.setAttribute("aGlow",this.glowAttr),this.g=this.glowAttr.array),s.extra)for(const[r,a]of Object.entries(s.extra)){const o=new Cs(new Float32Array(n*a),a);o.setUsage(Qs),t.setAttribute(r,o),this.extra[r]=o.array,this.extraAttr.push(o)}this.mesh.count=0,this.mesh.frustumCulled=s.frustumCulled??!1,s.renderOrder!==void 0&&(this.mesh.renderOrder=s.renderOrder)}begin(){this.n=0}get full(){return this.n>=this.cap}put(t,e,n,s,r,a,o){if(this.n>=this.cap)return-1;const l=this.n++,c=l*16,h=this.m,u=Math.cos(s),f=Math.sin(s);return h[c]=u*r,h[c+1]=0,h[c+2]=-f*r,h[c+3]=0,h[c+4]=0,h[c+5]=a,h[c+6]=0,h[c+7]=0,h[c+8]=f*o,h[c+9]=0,h[c+10]=u*o,h[c+11]=0,h[c+12]=t,h[c+13]=e,h[c+14]=n,h[c+15]=1,this.g&&(this.g[l*3]=this.g[l*3+1]=this.g[l*3+2]=0),l}putEuler(t,e,n,s,r,a,o,l,c){if(this.n>=this.cap)return-1;const h=this.n++;return hh.set(s,r,a),ch.setFromEuler(hh),uh.set(t,e,n),fh.set(o,l,c),lh.compose(uh,ch,fh),lh.toArray(this.m,h*16),this.g&&(this.g[h*3]=this.g[h*3+1]=this.g[h*3+2]=0),h}putMatrix(t){if(this.n>=this.cap)return-1;const e=this.n++;return t.toArray(this.m,e*16),this.g&&(this.g[e*3]=this.g[e*3+1]=this.g[e*3+2]=0),e}color(t,e,n,s){if(t<0||!this.c)return;const r=t*3;this.c[r]=e,this.c[r+1]=n,this.c[r+2]=s}colorC(t,e,n=1){this.color(t,e.r*n,e.g*n,e.b*n)}glow(t,e,n,s){if(t<0||!this.g)return;const r=t*3;this.g[r]=e,this.g[r+1]=n,this.g[r+2]=s}glowC(t,e,n){this.glow(t,e.r*n,e.g*n,e.b*n)}end(){const t=this.n;if(this.mesh.count=t,t===0)return;const e=this.mesh.instanceMatrix;if(e.clearUpdateRanges(),e.addUpdateRange(0,t*16),e.needsUpdate=!0,this.mesh.instanceColor){const n=this.mesh.instanceColor;n.clearUpdateRanges(),n.addUpdateRange(0,t*3),n.needsUpdate=!0}this.glowAttr&&(this.glowAttr.clearUpdateRanges(),this.glowAttr.addUpdateRange(0,t*3),this.glowAttr.needsUpdate=!0);for(const n of this.extraAttr)n.clearUpdateRanges(),n.addUpdateRange(0,t*n.itemSize),n.needsUpdate=!0}dispose(){this.mesh.geometry.dispose();const t=this.mesh.material;Array.isArray(t)?t.forEach(e=>e.dispose()):t.dispose(),this.mesh.dispose()}}function Er(i){const t=new jn(i);return t.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
attribute vec3 aGlow;
varying vec3 vGlow;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vGlow = aGlow;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vGlow;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
totalEmissiveRadiance += vGlow;`)},t.customProgramCacheKey=()=>"vs-glow-standard",t}function dh(i=16777215,t={}){return new sn({color:i,...t})}function Gi(i,t=1){return new sn({map:i,transparent:!0,opacity:t,blending:Bn,depthWrite:!1,fog:!1})}function M_(i){return new sn({map:i,color:T.ink,transparent:!0,opacity:.75,depthWrite:!1,fog:!1,alphaMap:i})}const Xu=`
float vsHash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vsNoise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(vsHash(i), vsHash(i + vec2(1.0, 0.0)), u.x), mix(vsHash(i + vec2(0.0, 1.0)), vsHash(i + vec2(1.0, 1.0)), u.x), u.y);
}`;function S_(){return new Ae({uniforms:{uTime:{value:0}},transparent:!0,depthWrite:!1,vertexShader:`
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
      ${Xu}
      void main() {
        float r = length(vUv);
        if (r > 1.0) discard;
        float a = atan(vUv.y, vUv.x);
        if (vP.y < 0.5) {
          float ring = smoothstep(0.84, 0.92, r) * (1.0 - smoothstep(0.96, 1.0, r));
          float dash = step(0.45, fract(a * 3.8197 + uTime * 0.7));
          float pulse = 0.6 + 0.4 * sin(uTime * 18.0);
          float fill = vP.x * 0.35 * (1.0 - r * 0.6);
          vec3 col = vec3(1.0, 0.22, 0.26) * (ring * dash * pulse * 1.1) + vec3(0.42, 0.02, 0.05) * fill;
          float alpha = clamp(ring * dash * pulse + fill, 0.0, 1.0);
          gl_FragColor = vec4(col, alpha);
        } else {
          float sw = vsNoise(vec2(a * 2.5 + uTime * 0.9 + r * 5.0 + vP.z, r * 7.0 - uTime * 1.6));
          float sw2 = vsNoise(vec2(a * 5.0 - uTime * 0.6, r * 12.0 + uTime) + vP.z * 3.0);
          vec3 deep = vec3(0.02, 0.0, 0.004);
          vec3 mid = vec3(0.55, 0.02, 0.05);
          float rim = smoothstep(0.8, 0.95, r) * (1.0 - smoothstep(0.97, 1.0, r));
          vec3 col = mix(deep, mid, pow(sw * sw2, 1.2) * r * 1.3) + rim * vec3(1.1, 0.12, 0.16);
          float alpha = (0.82 + 0.18 * sw) * vP.w;
          gl_FragColor = vec4(col, alpha);
        }
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`})}function b_(){return new Ae({uniforms:{uTime:{value:0}},transparent:!0,depthWrite:!1,blending:Bn,vertexShader:`
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
      ${Xu}
      void main() {
        float across = abs(vUv.y * 2.0 - 1.0);
        float edge = 1.0 - across;
        if (vL.x < 0.5) {
          float s = fract((vUv.x * vL.z + vUv.y * vL.w) / 46.0 - uTime * 1.4);
          float stripe = step(0.5, s);
          float pulse = 0.55 + 0.45 * sin(uTime * 20.0);
          float border = smoothstep(0.78, 0.9, across) * (1.0 - smoothstep(0.95, 1.0, across));
          vec3 col = mix(vec3(0.9, 0.0, 0.03), vec3(0.22, 0.01, 0.02), stripe) * (0.18 + 0.2 * pulse + 0.25 * vL.y) * smoothstep(0.0, 0.2, edge);
          col += vec3(0.95, 0.45, 0.45) * border * 0.9;
          gl_FragColor = vec4(col, 1.0);
        } else {
          float flick = 0.75 + 0.25 * vsNoise(vec2(vUv.x * vL.z * 0.05 - uTime * 40.0, uTime * 13.0));
          float core = pow(edge, 3.0);
          vec3 col = vec3(3.0, 2.3, 2.1) * core * flick + vec3(1.0, 0.04, 0.07) * pow(edge, 0.8) * 0.9;
          gl_FragColor = vec4(col, 1.0);
        }
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`})}function E_(){return new Ae({uniforms:{uTime:{value:0},uColor:{value:new Ut(T.tan)},uPulse:{value:0},uStrength:{value:.42}},transparent:!0,depthWrite:!1,blending:Bn,side:Qe,vertexShader:`
      varying vec3 vN;
      varying vec3 vV;
      varying vec3 vW;
      varying float vH;
      varying vec2 vL;
      void main() {
        vL = position.xz;
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
      varying vec2 vL;
      void main() {
        float fres = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.6);
        // engraved latitude rings plus a slowly turning ring of compass ticks
        float lat = abs(fract(vH * 7.0) - 0.5);
        float ringLine = 1.0 - smoothstep(0.0, 0.035, lat);
        float ang = atan(vL.y, vL.x) + uTime * 0.12;
        float tick = 1.0 - smoothstep(0.0, 0.05, abs(fract(ang * 5.7295780) - 0.5));
        float hexLine = max(ringLine, tick * (1.0 - smoothstep(0.0, 0.18, vH)));
        float shimmer = 0.5 + 0.5 * sin(uTime * 1.4 + vW.x * 0.03 + vW.z * 0.025);
        float base = smoothstep(0.0, 0.08, vH) ;
        float k = fres * 1.1 + hexLine * (0.10 + 0.12 * shimmer) + uPulse * (0.25 + fres);
        k *= mix(1.6, 1.0, base);
        vec3 col = uColor * k * uStrength;
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`})}function T_(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Ge;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0;const u=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let m=0;m<d.count;++m)u.push(d.getX(m)+h);h+=i[f].attributes.position.count}l.setIndex(u)}for(const h in r){const u=ph(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let x=0;x<a[h].length;++x)d.push(a[h][x][f]);const m=ph(d);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function ph(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new ln(a,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let f=0,d=h.count;f<d;f++)for(let m=0;m<e;m++){const x=h.getComponent(f,m);o.setComponent(f+u,m,x)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}function w_(i){const t=i.index?i.toNonIndexed():i;t!==i&&i.dispose();for(const e of Object.keys(t.attributes))e!=="position"&&e!=="normal"&&t.deleteAttribute(e);return t}function ee(i,t=!1){const e=i.map(w_),n=T_(e,!1);if(e.forEach(s=>s.dispose()),!n)throw new Error("Could not merge model geometry.");return t&&n.computeVertexNormals(),n.computeBoundingSphere(),n}function Zo(i,t,e){return new Ml(i,t,e)}function Tr(i,t,e,n,s=0){const r=Zo(i,t,5);return r.rotateZ(-Math.PI/2),r.translate(e+t/2,0,0),s&&r.rotateZ(s),r.rotateY(n),r}function mh(i,t,e=.08){const n=new Sl;i.forEach(([r,a],o)=>o===0?n.moveTo(r,a):n.lineTo(r,a)),n.closePath();const s=new jr(n,{depth:t,bevelEnabled:e>0,bevelThickness:e,bevelSize:e,bevelSegments:1,curveSegments:4});return s.rotateX(-Math.PI/2),s}function gh(i,t,e,n){const s=new Sl;for(let a=0;a<10;a++){const o=a%2===0?i:i*t,l=Math.PI/2+a*Math.PI/5,c=Math.cos(l)*o,h=Math.sin(l)*o;a===0?s.moveTo(c,h):s.lineTo(c,h)}s.closePath();const r=new jr(s,{depth:e,bevelEnabled:!0,bevelThickness:n,bevelSize:n,bevelSegments:1});return r.translate(0,0,-e/2),r}function A_(){const i={};{const t=[new Ds(.72,0)];for(let s=0;s<5;s++)t.push(Tr(.16,.7,.5,s/5*Math.PI*2+.3));const e=Zo(.13,.5,5);e.translate(0,.8,0),t.push(e),i.drifter=ee(t,!0);const n=new Qn(.52,.07,6,24);n.rotateX(Math.PI/2),i.drifterEye=ee([n])}{const t=[],e=new je(.5,.66,.42,8);e.translate(0,.95,0),t.push(e);for(let a=0;a<3;a++){const o=a/3*Math.PI*2+Math.PI/3,l=new he(.75,.14,.16);l.rotateZ(-.55),l.translate(.6,.78,0),l.rotateY(o);const c=new he(.13,.78,.13);c.translate(.93,.36,0),c.rotateY(o);const h=new he(.3,.07,.24);h.translate(1,.03,0),h.rotateY(o),t.push(l,c,h)}i.spitterBody=ee(t,!0);const n=new he(.78,.4,.66);n.translate(-.05,1.38,0);const s=new he(.4,.12,.7);s.translate(.12,1.62,0);const r=new je(.09,.12,.8,8);r.rotateZ(-Math.PI/2),r.translate(.66,1.36,0),i.spitterHead=ee([n,s,r],!0),i.spitterMuzzle=ee([new mn(1,10,8)])}{const t=mh([[1.35,0],[.15,.86],[-.92,.76],[-1.05,0],[-.92,-.76],[.15,-.86]],.62,.12);t.translate(0,.1,0);const e=new he(1.3,.2,.42);e.translate(-.15,.9,0);const n=Zo(.2,.8,6);n.rotateZ(-Math.PI/2),n.translate(1.62,.45,0);const s=new he(.6,.3,.25);s.translate(-.4,.7,.62);const r=s.clone();r.translate(0,0,-1.24),i.rammer=ee([t,e,n,s,r],!0);const a=new he(.1,.12,.95);a.translate(.86,.6,0),i.rammerEye=ee([a])}{const t=new Kn(1,0),n=t.getAttribute("position").array;for(let s=0;s<n.length;s+=9){const r=(n[s]+n[s+3]+n[s+6])/3,a=(n[s+2]+n[s+5]+n[s+8])/3,o=(n[s+1]+n[s+4]+n[s+7])/3,l=r>=0?1:-1,c=a>=0?1:-1,h=l*.09,u=c*.09,f=o*.05;for(let d=0;d<3;d++)n[s+d*3]+=h,n[s+d*3+1]+=f,n[s+d*3+2]+=u}t.scale(1,1.15,1),i.cleaver=ee([t],!0),i.cleaverCore=ee([new Kn(.66,0)],!0)}{const t=new Ds(1,0);t.scale(.7,1.35,.7),i.splitlet=ee([t],!0)}{const t=new je(1,1.08,.42,20);t.translate(0,.26,0);const e=new mn(.62,16,8,0,Math.PI*2,0,Math.PI/2);e.translate(0,.46,0);const n=new he(.5,.2,.1);n.translate(.6,.55,0),i.aegis=ee([t,e,n]);const s=new Qn(1.03,.055,6,32);s.rotateX(Math.PI/2),s.translate(0,.32,0),i.aegisRim=ee([s]);const r=50*Math.PI/180,a=new je(1,1,1,16,1,!0,Math.PI/2-r,r*2);a.translate(0,.55,0),i.shieldPlate=a;const o=new Qn(1,.035,4,16,r*2);o.rotateX(Math.PI/2),o.rotateY(r);const l=o.clone();l.translate(0,1.05,0),o.translate(0,.05,0),i.shieldFrame=ee([o,l])}{const t=[new Kn(.55,1)];for(let e=0;e<8;e++)t.push(Tr(.12,.72,.42,e/8*Math.PI*2));for(let e=0;e<4;e++)t.push(Tr(.1,.5,.4,e/4*Math.PI*2+Math.PI/4,.75)),t.push(Tr(.1,.5,.4,e/4*Math.PI*2+Math.PI/4,-.75));i.caster=ee(t,!0),i.casterCore=ee([new Kn(.45,1)])}{const t=new je(.92,1.05,.5,8);t.translate(0,.25,0);const e=new je(.58,.85,.32,8);e.translate(0,.66,0);const n=new je(.16,.24,.5,8);n.translate(0,.95,0),i.wardenHull=ee([t,e,n],!0);const s=new he(.42,.36,.62);s.translate(0,.3,0);const r=new he(.1,.12,.66);r.translate(.2,.52,0),i.wardenPetal=ee([s,r],!0);const a=new Qn(.75,.06,6,8);a.rotateX(Math.PI/2),i.wardenCrown=ee([a]),i.wardenNode=ee([new Kn(1,0)],!0),i.wardenCore=ee([new Kn(1,1)])}{const t=mh([[1.3,0],[-.9,.95],[-.5,0],[-.9,-.95]],.26,.08);t.translate(0,.1,0);const e=new he(1.2,.16,.22);e.translate(.05,.4,0);const n=new je(.16,.2,.6,10);n.rotateZ(Math.PI/2),n.translate(-.55,.26,.48);const s=n.clone();s.translate(0,0,-.96),i.wick=ee([t,e,n,s]);const r=new mn(.3,16,8,0,Math.PI*2,0,Math.PI/2);r.scale(1.5,.9,1),r.translate(.2,.42,0),i.wickCanopy=ee([r]);const a=new mn(.15,10,8);a.translate(-.88,.26,.48);const o=a.clone();o.translate(0,0,-.96);const l=new mn(.09,8,6);l.translate(1.2,.28,0),i.wickGlow=ee([a,o,l])}{i.mote=ee([gh(1.2,.48,.35,.08)],!0),i.shard=ee([gh(1.25,.45,.45,.12)],!0);const t=new he(1.6,.9,1.1);t.translate(0,.45,0);const e=new he(1.7,.25,1.2);e.translate(0,1,0);const n=new he(.14,1.2,1.18);n.translate(-.55,.6,0);const s=n.clone();s.translate(1.1,0,0),i.chest=ee([t,e,n,s],!0);const r=new he(1.62,.06,1.12);r.translate(0,.88,0),i.chestSeam=ee([r])}i.ball=ee([new mn(1,12,8)]),i.ballLow=ee([new mn(1,8,6)]);{const t=new Ds(1,0);t.scale(1.25,.22,.42),i.blade=ee([t],!0)}return i.debris=ee([new bl(1,0)],!0),i.box=ee([new he(1,1,1)]),i}function C_(){const i=new ze(2,2);return i.rotateX(-Math.PI/2),i}function R_(){const i=new ze(1,1);return i.rotateX(-Math.PI/2),i.translate(.5,0,0),i}function P_(){return new mn(1,48,14,0,Math.PI*2,0,Math.PI/2)}const qu={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class us{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const L_=new gl(-1,1,1,-1,0,1);class D_ extends Ge{constructor(){super(),this.setAttribute("position",new ve([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ve([0,2,0,0,2,0],2))}}const I_=new D_;class Tl{constructor(t){this._mesh=new ue(I_,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,L_)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Yu extends us{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Ae?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=ss.clone(t.uniforms),this.material=new Ae({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Tl(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class vh extends us{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class U_ extends us{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class N_{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new rt);this._width=n.width,this._height=n.height,e=new nn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:xn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Yu(qu),this.copyPass.material.blending=On,this.clock=new x_}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}vh!==void 0&&(a instanceof vh?n=!0:a instanceof U_&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new rt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class F_ extends us{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ut}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}}const O_={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ut(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class rs extends us{constructor(t,e,n,s){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new rt(t.x,t.y):new rt(256,256),this.clearColor=new Ut(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new nn(r,a,{type:xn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new nn(r,a,{type:xn});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const d=new nn(r,a,{type:xn});d.texture.name="UnrealBloomPass.v"+u,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),a=Math.round(a/2)}const o=O_;this.highPassUniforms=ss.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ae({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new rt(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=qu;this.copyUniforms=ss.clone(h.uniforms),this.blendMaterial=new Ae({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Bn,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Ut,this.oldClearAlpha=1,this.basic=new sn,this.fsQuad=new Tl(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new rt(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=rs.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=rs.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=a}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Ae({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new rt(.5,.5)},direction:{value:new rt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new Ae({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}rs.BlurDirectionX=new rt(1,0);rs.BlurDirectionY=new rt(0,1);const k_={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class B_ extends us{constructor(){super();const t=k_;this.uniforms=ss.clone(t.uniforms),this.material=new f_({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Tl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Jt.getTransfer(this._outputColorSpace)===ce&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===iu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===su?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ru?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===al?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===au?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ou&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const z_={uniforms:{tDiffuse:{value:null},uCenter:{value:new rt(.5,.5)},uRadius:{value:0},uWidth:{value:.05},uStrength:{value:0},uAspect:{value:1}},vertexShader:`
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
      c.rgb += c.rgb * band * uStrength * 14.0 + vec3(1.0, 0.55, 0.5) * band * uStrength * 1.6;
      gl_FragColor = c;
    }`};class H_{constructor(t,e,n,s,r,a){$(this,"composer");$(this,"bloom",null);$(this,"shock");$(this,"rt");$(this,"half");this.half=s.bloom==="half";const o=t.getPixelRatio();this.rt=new nn(Math.max(1,r*o),Math.max(1,a*o),{type:xn,samples:s.level==="high"?4:s.level==="medium"?2:0}),this.composer=new N_(t,this.rt),this.composer.addPass(new F_(e,n)),s.bloom!=="off"&&(this.bloom=new rs(new rt(r,a),.6,this.half?.25:.4,1),this.composer.addPass(this.bloom)),this.shock=new Yu(z_),this.shock.enabled=!1,this.composer.addPass(this.shock),this.composer.addPass(new B_),this.setSize(r,a,o)}setSize(t,e,n){this.composer.setPixelRatio(n),this.composer.setSize(t,e),this.shock.uniforms.uAspect.value=t/Math.max(1,e)}setBloomStrength(t){this.bloom&&(this.bloom.strength=t)}render(){this.composer.render()}dispose(){this.bloom?.dispose(),this.shock.dispose(),this.composer.dispose(),this.rt.dispose()}}class Qr extends ue{constructor(t,e={}){super(t),this.isReflector=!0,this.type="Reflector",this.camera=new qe;const n=this,s=e.color!==void 0?new Ut(e.color):new Ut(8355711),r=e.textureWidth||512,a=e.textureHeight||512,o=e.clipBias||0,l=e.shader||Qr.ReflectorShader,c=e.multisample!==void 0?e.multisample:4,h=new Nn,u=new I,f=new I,d=new I,m=new ie,x=new I(0,0,-1),g=new oe,p=new I,M=new I,v=new oe,_=new ie,C=this.camera,w=new nn(r,a,{samples:c,type:xn}),R=new Ae({name:l.name!==void 0?l.name:"unspecified",uniforms:ss.clone(l.uniforms),fragmentShader:l.fragmentShader,vertexShader:l.vertexShader});R.uniforms.tDiffuse.value=w.texture,R.uniforms.color.value=s,R.uniforms.textureMatrix.value=_,this.material=R,this.onBeforeRender=function(L,S,y){if(f.setFromMatrixPosition(n.matrixWorld),d.setFromMatrixPosition(y.matrixWorld),m.extractRotation(n.matrixWorld),u.set(0,0,1),u.applyMatrix4(m),p.subVectors(f,d),p.dot(u)>0)return;p.reflect(u).negate(),p.add(f),m.extractRotation(y.matrixWorld),x.set(0,0,-1),x.applyMatrix4(m),x.add(d),M.subVectors(f,x),M.reflect(u).negate(),M.add(f),C.position.copy(p),C.up.set(0,1,0),C.up.applyMatrix4(m),C.up.reflect(u),C.lookAt(M),C.far=y.far,C.updateMatrixWorld(),C.projectionMatrix.copy(y.projectionMatrix),_.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),_.multiply(C.projectionMatrix),_.multiply(C.matrixWorldInverse),_.multiply(n.matrixWorld),h.setFromNormalAndCoplanarPoint(u,f),h.applyMatrix4(C.matrixWorldInverse),g.set(h.normal.x,h.normal.y,h.normal.z,h.constant);const P=C.projectionMatrix;v.x=(Math.sign(g.x)+P.elements[8])/P.elements[0],v.y=(Math.sign(g.y)+P.elements[9])/P.elements[5],v.z=-1,v.w=(1+P.elements[10])/P.elements[14],g.multiplyScalar(2/g.dot(v)),P.elements[2]=g.x,P.elements[6]=g.y,P.elements[10]=g.z+1-o,P.elements[14]=g.w,n.visible=!1;const H=L.getRenderTarget(),z=L.xr.enabled,k=L.shadowMap.autoUpdate;L.xr.enabled=!1,L.shadowMap.autoUpdate=!1,L.setRenderTarget(w),L.state.buffers.depth.setMask(!0),L.autoClear===!1&&L.clear(),L.render(S,C),L.xr.enabled=z,L.shadowMap.autoUpdate=k,L.setRenderTarget(H);const q=y.viewport;q!==void 0&&L.state.viewport(q),n.visible=!0},this.getRenderTarget=function(){return w},this.dispose=function(){w.dispose(),n.material.dispose()}}}Qr.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
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

		}`};function Mi(i,t=i){const e=document.createElement("canvas");e.width=i,e.height=t;const n=e.getContext("2d");if(!n)throw new Error("Canvas 2D is not available for texture generation.");return[e,n]}function Si(i,t=!0){const e=new Ix(i);return t&&(e.colorSpace=Xe),e.needsUpdate=!0,e}function G_(){const[i,t]=Mi(128),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.18,"rgba(255,255,255,0.65)"),e.addColorStop(.5,"rgba(255,255,255,0.18)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),Si(i,!1)}function xh(i=!1){const[e,n]=Mi(256),s=256/2,r=n.createRadialGradient(s,s,s*.72,s,s,s);if(r.addColorStop(0,"rgba(255,255,255,0)"),r.addColorStop(.72,"rgba(255,255,255,0.15)"),r.addColorStop(.9,"rgba(255,255,255,1)"),r.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=r,n.fillRect(0,0,256,256),i){n.globalCompositeOperation="destination-out",n.translate(s,s);const a=36;for(let o=0;o<a;o++)n.rotate(Math.PI*2/a),n.fillRect(0,-4,s,8)}return Si(e,!1)}function V_(){const[i,t]=Mi(16,64),e=t.createLinearGradient(0,0,0,64);return e.addColorStop(0,"rgba(255,255,255,0)"),e.addColorStop(.35,"rgba(255,255,255,0.35)"),e.addColorStop(.5,"rgba(255,255,255,1)"),e.addColorStop(.65,"rgba(255,255,255,0.35)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,16,64),Si(i,!1)}function W_(){const[i,t]=Mi(256,64);t.fillStyle="rgba(255,255,255,0.22)",t.fillRect(0,4,256,56),t.fillStyle="rgba(255,255,255,1)";for(let n=0;n<4;n++){const s=n*64+14;t.beginPath(),t.moveTo(s,8),t.lineTo(s+26,32),t.lineTo(s,56),t.lineTo(s+12,56),t.lineTo(s+38,32),t.lineTo(s+12,8),t.closePath(),t.fill()}t.fillRect(0,0,256,4),t.fillRect(0,60,256,4);const e=Si(i,!1);return e.wrapS=Os,e}function _h(i,t,e,n){const s=i.getImageData(0,0,t,t);let r=n;for(let a=0;a<s.data.length;a+=4){r=r*16807%2147483647;const o=(r/2147483647-.5)*e;s.data[a]=Math.max(0,Math.min(255,s.data[a]+o)),s.data[a+1]=Math.max(0,Math.min(255,s.data[a+1]+o)),s.data[a+2]=Math.max(0,Math.min(255,s.data[a+2]+o))}i.putImageData(s,0,0)}function Ya(i,t,e,n,s){let r=s;const a=()=>(r=r*48271%2147483647,r/2147483647);for(let o=0;o<n;o++){const l=a()*t,c=a()*t,h=t*(.05+a()*.18);for(const u of[-t,0,t])for(const f of[-t,0,t]){const d=i.createRadialGradient(l+u,c+f,0,l+u,c+f,h);d.addColorStop(0,e),d.addColorStop(1,kt(T.ink,0)),i.fillStyle=d,i.fillRect(l+u-h,c+f-h,h*2,h*2)}}}function X_(i,t,e){const[r,a]=Mi(1024);a.fillStyle=t,a.fillRect(0,0,1024,1024),Ya(a,1024,kt(i?T.wine:T.dusk,.28),14,11),_h(a,1024,8,5),Qh(a,12,12,1e3,1e3,{seed:i?41:23,count:280,color:T.ash,max:2.8,alpha:.5}),a.strokeStyle=e,a.lineWidth=2;for(let f=0;f<=4;f++)a.beginPath(),a.moveTo(f*256,0),a.lineTo(f*256,1024),a.moveTo(0,f*256),a.lineTo(1024,f*256),a.stroke();a.lineWidth=1.5;for(let f=0;f<4;f++)for(let d=0;d<=4;d++)for(let m=1;m<8;m++){const x=f*256+m*256/8,g=m===4?9:4;a.beginPath(),a.moveTo(x,d*256-g),a.lineTo(x,d*256+g),a.moveTo(d*256-g,x),a.lineTo(d*256+g,x),a.stroke()}for(let f=0;f<=4;f++)for(let d=0;d<=4;d++)a.beginPath(),a.arc(f*256,d*256,10,0,Math.PI*2),a.stroke();const o=Ws(i?77:5);for(let f=0;f<2;f++){const d=90+f*470+o()*120,m=120+f*380+o()*160,x=[];let g=d,p=m;for(let M=0;M<5;M++)x.push([g,p]),g+=50+o()*70,p+=(o()-.45)*110;sl(a,x,{color:i?T.ember:T.saddle,node:T.tan,alpha:.55,dash:[8,10],width:3,nodeR:4.5})}Yr(a,256*2,256*2,18,T.ash,.3);const[l,c]=Mi(1024);c.fillStyle="rgb(150, 150, 150)",c.fillRect(0,0,1024,1024),Ya(c,1024,"rgba(210, 210, 210, 0.35)",18,23),Ya(c,1024,"rgba(60, 60, 60, 0.35)",10,31),_h(c,1024,26,9),c.strokeStyle="rgb(255, 255, 255)",c.lineWidth=5;for(let f=0;f<=4;f++)c.beginPath(),c.moveTo(f*256,0),c.lineTo(f*256,1024),c.moveTo(0,f*256),c.lineTo(1024,f*256),c.stroke();const h=Si(r,!0),u=Si(l,!1);for(const f of[h,u])f.wrapS=f.wrapT=Os;return{map:h,rough:u,tile:320}}function q_(){const[i,t]=Mi(64,256);t.fillStyle=T.ink,t.fillRect(0,0,64,256);let e=3;const n=()=>(e=e*16807%2147483647,e/2147483647);for(let s=4;s<252;s+=6+Math.floor(n()*10)){const r=.12+n()*.35;t.fillStyle=`rgba(255,255,255,${r})`,t.fillRect(0,s,64,1+Math.floor(n()*2))}return Si(i,!1)}function Y_(i,t){const e=new Fu,n=[],s=(c,h,u,f,d,m,x=0,g=0)=>{const p=new sn({color:new Ut(h).multiplyScalar(u),side:Qe}),M=new ue(c,p);M.position.set(f,d,m),M.rotation.set(g,x,0),e.add(M),n.push(c,p)},r=new he(100,50,100);s(r,T.night,1,0,10,0);const a=t==="foundry";s(new ze(80,2.2),T.bone,a?1.2:1.8,0,34.5,-12,0,Math.PI/2),s(new ze(80,1.4),T.ember,1.2,0,34.5,14,0,Math.PI/2),s(new ze(26,9),a?T.ember:T.saddle,a?1.2:.8,-49.5,16,0,Math.PI/2),s(new ze(40,3),T.wine,1.4,0,18,-49.5),s(new ze(30,4),a?T.red:T.tan,.7,49.5,10,10,-Math.PI/2),s(new ze(60,6),T.mesa,1,0,6,49.5,Math.PI);const o=new Go(i),l=o.fromScene(e,.035);return o.dispose(),n.forEach(c=>c.dispose()),l}class $_{constructor(t){$(this,"group",new mi);$(this,"arena");$(this,"reflector",null);$(this,"disposables",[]);$(this,"beacon");$(this,"stripMat");this.arena=t.arena;const e=t.arena==="foundry",n=new Ut(e?T.ember:T.tan),s=N=>(this.disposables.push(N),N),r=X_(e,e?T.mesa:T.dusk,e?kt(T.ember,.45):kt(T.tan,.22));s(r.map),s(r.rough),r.map.anisotropy=r.rough.anisotropy=t.anisotropy;const a=e?Sn*2:Ee*2;r.map.repeat.set(a/r.tile,a/r.tile),r.rough.repeat.copy(r.map.repeat);const o=s(new jn({color:16777215,map:r.map,roughnessMap:r.rough,roughness:1,metalness:.25,envMapIntensity:.9,transparent:t.planar,opacity:t.planar?.84:1})),l=s(e?new zr(Sn,128):new ze(a,a));l.rotateX(-Math.PI/2);const c=new ue(l,o);if(c.renderOrder=-10,this.group.add(c),t.planar){const N=s(e?new zr(Sn,96):new ze(a,a)),V=new Qr(N,{textureWidth:Math.max(256,Math.floor(t.width*.5)),textureHeight:Math.max(256,Math.floor(t.height*.5)),color:new Ut(T.saddle).multiplyScalar(.35),clipBias:.003});V.rotateX(-Math.PI/2),V.position.y=-1.2,V.renderOrder=-20,this.reflector=V,this.group.add(V)}const h=s(new jn({color:T.mesa,metalness:.15,roughness:.85})),u=s(new jn({color:T.umber,metalness:.05,roughness:.95}));this.stripMat=s(new sn({color:n.clone().multiplyScalar(2.2)}));const f=34;if(e){const N=Sn+14,V=s(new je(N,N,f,128,1,!0));V.translate(0,f/2,0),this.group.add(new ue(V,s(new jn({color:T.mesa,metalness:.15,roughness:.85,side:Qe}))));const B=s(new Qn(N-4,2.4,4,160));B.rotateX(Math.PI/2),B.translate(0,f+1,0),this.group.add(new ue(B,this.stripMat));const nt=s(new Qn(N-6,1.2,4,160));nt.rotateX(Math.PI/2),nt.translate(0,6,0),this.group.add(new ue(nt,this.stripMat));const ht=s(new je(N+20,N-60,700,96,1,!0));ht.translate(0,-350,0),this.group.add(new ue(ht,u))}else{const N=Ee*2+56,V=26,B=s(new he(N,f,V));B.translate(0,f/2,0);const nt=s(new he(N-40,3,4)),ht=s(new he(N-40,1.6,2)),ft=s(new he(N+40,700,40));ft.translate(0,-350,0);for(let Ht=0;Ht<4;Ht++){const Z=Ht*Math.PI/2,it=new mi;it.rotation.y=Z;const _t=Ee+V/2,ot=new ue(B,h);ot.position.set(0,0,_t);const Rt=new ue(nt,this.stripMat);Rt.position.set(0,f+1.5,_t-V/2+2);const Ot=new ue(ht,this.stripMat);Ot.position.set(0,7,_t-V/2-.5);const It=new ue(ft,u);It.position.set(0,0,_t+6),it.add(ot,Rt,Ot,It),this.group.add(it)}const Dt=s(new he(60,90,60));Dt.translate(0,45,0);for(const[Ht,Z]of[[-1,-1],[1,-1],[1,1],[-1,1]]){const it=new ue(Dt,h);it.position.set(Ht*(Ee+30),0,Z*(Ee+30)),this.group.add(it)}}let d=e?91:17;const m=()=>(d=d*16807%2147483647,d/2147483647),x=s(new he(1,1,1));x.translate(0,.5,0);const g=s(new jn({color:T.mesa,metalness:.05,roughness:.9})),p=s(new ze(1,1)),M=s(q_()),v=s(new sn({map:M,transparent:!0,blending:Bn,depthWrite:!1})),_=84,C=new Wo(x,g,_),w=new Wo(p,v,_);this.disposables.push(C,w);const R=new ie,L=new ni,S=new I,y=new I,P=new I(0,1,0),H=e?[T.ember,T.wine,T.saddle]:[T.wine,T.ember,T.saddle,T.tan],z=new Ut,k=e?Sn:Ee*1.2;for(let N=0;N<_;N++){const V=m()*Math.PI*2,B=k+380+Math.pow(m(),.8)*2600,nt=Math.cos(V)*B,ht=Math.sin(V)*B,ft=160+m()*320,Dt=380+m()*760,Ht=-900-m()*300;L.setFromAxisAngle(P,-V+Math.PI/2+(m()-.5)*.4),C.setMatrixAt(N,R.compose(S.set(nt,Ht,ht),L,y.set(ft,Dt,ft*(.6+m()*.6))));const Z=260+m()*360,it=Ht+Dt-Z*.6-m()*200,_t=new I(-Math.cos(V),0,-Math.sin(V)),ot=new I(nt,it,ht).addScaledVector(_t,ft*.52),Rt=new ni().setFromUnitVectors(new I(0,0,1),_t);w.setMatrixAt(N,R.compose(ot,Rt,y.set(ft*.96,Z,1))),z.set(H[Math.floor(m()*H.length)]).multiplyScalar(.25+m()*.35),w.setColorAt(N,z)}C.instanceMatrix.needsUpdate=!0,w.instanceMatrix.needsUpdate=!0,w.instanceColor&&(w.instanceColor.needsUpdate=!0),this.group.add(C,w),this.beacon=s(new sn({color:new Ut(T.red).multiplyScalar(2)}));const q=s(new mn(10,8,6));for(let N=0;N<10;N++){const V=m()*Math.PI*2,B=k+600+m()*1600,nt=new ue(q,this.beacon);nt.position.set(Math.cos(V)*B,200+m()*500,Math.sin(V)*B),this.group.add(nt)}}update(t){const e=Math.sin(t*2.4)>.6;this.beacon.color.set(e?T.red:T.wine).multiplyScalar(e?2:.4);const n=1.1+Math.sin(t*2)*.12;this.stripMat.color.set(this.arena==="foundry"?T.ember:T.tan).multiplyScalar(this.arena==="foundry"?n*1.4:n*.55)}resize(t,e){this.reflector?.getRenderTarget().setSize(Math.max(256,Math.floor(t*.5)),Math.max(256,Math.floor(e*.5)))}dispose(){this.group.removeFromParent(),this.reflector&&(this.reflector.dispose(),this.reflector=null);for(const t of this.disposables)t.dispose();this.disposables.length=0}}const Vi=Math.PI*2,Z_=40,yh=60*Math.PI/180,$a=8;class K_{constructor(t,e,n){$(this,"kind","3d");$(this,"dpr",1);$(this,"camX",0);$(this,"camY",0);$(this,"lost",!1);$(this,"onContext",null);$(this,"gl");$(this,"view");$(this,"hud");$(this,"hctx");$(this,"visor",new tu);$(this,"scene",new Fu);$(this,"camera",new qe(Z_,1,10,9e3));$(this,"preset");$(this,"post",null);$(this,"stage",null);$(this,"env",null);$(this,"envArena","hollow");$(this,"M");$(this,"tex",[]);$(this,"layers",[]);$(this,"lights",[]);$(this,"snap",!0);$(this,"cssW",1);$(this,"cssH",1);$(this,"colors",new Map);$(this,"tmpV",new I);$(this,"tmpP",{x:0,y:0});$(this,"ray",new __);$(this,"plane",new Nn(new I(0,1,0),0));$(this,"lastFacing",0);$(this,"bank",0);$(this,"wick",new mi);$(this,"wickGlowMat");$(this,"field");$(this,"fieldMat");$(this,"poolMat");$(this,"laneMat");$(this,"L");$(this,"onLost",t=>{t.preventDefault(),this.lost=!0,this.onContext?.(!0)});$(this,"onRestored",()=>{this.lost=!1,this.rebuildEnv(this.envArena),this.onContext?.(!1)});$(this,"project",(t,e,n)=>{const s=this.tmpV.set(t,n,e).project(this.camera);return s.z>1||s.x<-1.2||s.x>1.2||s.y<-1.2||s.y>1.2?null:(this.tmpP.x=(s.x*.5+.5)*this.hud.width,this.tmpP.y=(-s.y*.5+.5)*this.hud.height,this.tmpP)});$(this,"fakeEnemy",{id:0,alive:!0,kind:"swarm",x:0,y:0,vx:0,vy:0,r:10,hp:1,maxHp:1,speed:0,dmg:0,xp:0,ess:0,t:0,state:0,timer:0,act:0,ang:0,shield:0,shieldDir:1,tx:0,ty:0,elite:!1,tier:1,phase:0,flash:0,bladeCd:0,seed:0,noEss:!1,kx:0,ky:0});$(this,"dummyFx",{ember:()=>{}});this.view=t,this.hud=e,this.preset=n;const s=e.getContext("2d");if(!s)throw new Error("Canvas 2D is not available for the HUD.");if(this.hctx=s,this.gl=new Px({canvas:t,antialias:!1,powerPreference:"high-performance",alpha:!1,stencil:!1}),!this.gl.capabilities.isWebGL2)throw new Error("WebGL2 is not available.");this.gl.toneMapping=al,this.gl.toneMappingExposure=1.05,this.gl.outputColorSpace=Xe,this.scene.background=new Ut(T.night),this.scene.fog=new xl(T.night,36e-5),this.scene.add(new p_(T.saddle,T.ink,.9));const r=new sh(T.bone,1.3);r.position.set(-.45,1,.35),this.scene.add(r);const a=new sh(T.ember,.35);a.position.set(.6,.5,-.8),this.scene.add(a);for(let N=0;N<$a;N++){const V=new g_(16777215,0,400,1.7);V.visible=N<n.lights,this.lights.push(V),this.scene.add(V)}this.M=A_();const o=G_(),l=xh(),c=xh(!0),h=V_(),u=W_();this.tex.push(o,l,c,h,u);const f=Er({color:16777215,metalness:.6,roughness:.4,flatShading:!0}),d=Er({color:16777215,metalness:.35,roughness:.5}),m=Er({color:16777215,metalness:.15,roughness:.1,flatShading:!0}),x=Er({color:16777215,metalness:.95,roughness:.28,flatShading:!0}),g=dh(16777215),p=Gi(o),M=Gi(l),v=Gi(c),_=Gi(h),C=Gi(u),w=new sn({color:16777215,transparent:!0,blending:Bn,depthWrite:!1}),R=new sn({color:T.ink,side:He}),L=new sn({color:16777215,transparent:!0,opacity:.85,blending:Bn,depthWrite:!1,side:Qe});this.poolMat=S_(),this.laneMat=b_();const S=this.M,y=(N,V,B,nt,ht=!1,ft,Dt)=>{const Ht=new y_(V.clone(),B,nt,{glow:ht,extra:ft,renderOrder:Dt});return this.layers.push(Ht),this.scene.add(Ht.mesh),Ht},P=C_(),H=R_();this.L={shadow:y("shadow",P,M_(o),420,!1,void 0,1),pools:y("pools",P,this.poolMat,40,!1,{aPool:4},2),lanes:y("lanes",H,this.laneMat,12,!1,{aLane:4},3),splat:y("splat",P,p,900,!1,void 0,4),rings:y("rings",P,M,260,!1,void 0,5),ringsDash:y("ringsDash",P,v,8,!1,void 0,5),lines:y("lines",H,_,160,!1,void 0,6),chevrons:y("chevrons",H,C,60,!1,void 0,6),drifter:y("drifter",S.drifter,f,200,!0),drifterEye:y("drifterEye",S.drifterEye,g,200),spitterBody:y("spitterBody",S.spitterBody,f,100,!0),spitterHead:y("spitterHead",S.spitterHead,f,100,!0),spitterMuzzle:y("spitterMuzzle",S.spitterMuzzle,g,100),rammer:y("rammer",S.rammer,f,100,!0),rammerEye:y("rammerEye",S.rammerEye,g,100),cleaver:y("cleaver",S.cleaver,m,100,!0),cleaverCore:y("cleaverCore",S.cleaverCore,g,100),splitlet:y("splitlet",S.splitlet,m,200,!0),aegis:y("aegis",S.aegis,d,100,!0),aegisRim:y("aegisRim",S.aegisRim,g,100),shieldFrame:y("shieldFrame",S.shieldFrame,x,100,!0),shieldPlate:y("shieldPlate",S.shieldPlate,L,100,!1,void 0,8),caster:y("caster",S.caster,f,100,!0),casterCore:y("casterCore",S.casterCore,g,100),wardenHull:y("wardenHull",S.wardenHull,d,3,!0),wardenPetal:y("wardenPetal",S.wardenPetal,f,24,!0),wardenCrown:y("wardenCrown",S.wardenCrown,g,3),wardenNode:y("wardenNode",S.wardenNode,g,24),wardenCore:y("wardenCore",S.wardenCore,g,3),mote:y("mote",S.mote,g,320),shard:y("shard",S.shard,x,70,!0),chest:y("chest",S.chest,x,12,!0),chestSeam:y("chestSeam",S.chestSeam,g,12),blade:y("blade",S.blade,g,8),pbolt:y("pbolt",S.ballLow,g,160),eOutline:y("eOutline",S.ballLow,R,180),eCore:y("eCore",S.ballLow,g,180),eShell:y("eShell",S.ball,w,180,!1,void 0,9),sparks:y("sparks",S.ballLow,g,700),debris:y("debris",S.debris,f,700,!0),beams:y("beams",H,_,240,!1,void 0,12)};const z=Gi(h);z.depthTest=!1,this.L.beams.mesh.material=z,P.dispose(),H.dispose();const k=new jn({color:T.bone,metalness:.35,roughness:.45,emissive:T.tan,emissiveIntensity:.22}),q=new d_({color:T.umber,metalness:.2,roughness:.1,clearcoat:1,emissive:T.saddle,emissiveIntensity:.3});this.wickGlowMat=dh(16777215),this.wickGlowMat.color.set(T.bone).multiplyScalar(2.4),this.wick.add(new ue(S.wick,k),new ue(S.wickCanopy,q),new ue(S.wickGlow,this.wickGlowMat)),this.scene.add(this.wick),this.fieldMat=E_(),this.field=new ue(P_(),this.fieldMat),this.field.renderOrder=10,this.field.visible=!1,this.scene.add(this.field),t.addEventListener("webglcontextlost",this.onLost,!1),t.addEventListener("webglcontextrestored",this.onRestored,!1),this.applyPreset(n),this.resize(),this.buildStage("hollow")}rebuildEnv(t){this.env?.dispose(),this.env=Y_(this.gl,t),this.envArena=t,this.scene.environment=this.env.texture,this.scene.environmentIntensity=.85}buildStage(t){this.stage?.dispose(),this.stage=new $_({arena:t,planar:this.preset.reflections==="planar",anisotropy:Math.min(this.preset.anisotropy,this.gl.capabilities.getMaxAnisotropy()),width:this.cssW*this.gl.getPixelRatio(),height:this.cssH*this.gl.getPixelRatio()}),this.scene.add(this.stage.group),(!this.env||this.envArena!==t)&&this.rebuildEnv(t)}applyPreset(t){this.preset=t;for(let e=0;e<$a;e++)this.lights[e].visible=e<t.lights;this.post?.dispose(),this.post=null,this.resize(),(t.bloom!=="off"||t.ripple)&&(this.post=new H_(this.gl,this.scene,this.camera,t,this.cssW,this.cssH))}setQuality(t){const e=t.reflections==="planar"!=(this.preset.reflections==="planar");this.applyPreset(t),e&&this.stage&&this.buildStage(this.stage.arena)}resize(){const t=Math.max(1,window.innerWidth),e=Math.max(1,window.innerHeight);this.cssW=t,this.cssH=e;const n=Math.min(this.preset.maxDpr,window.devicePixelRatio||1)*this.preset.dprScale;this.gl.setPixelRatio(n),this.gl.setSize(t,e,!1),this.view.style.width="100%",this.view.style.height="100%",this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.post?.setSize(t,e,n),this.stage?.resize(t*n,e*n),this.dpr=Math.min(2,window.devicePixelRatio||1);const s=Math.floor(t*this.dpr),r=Math.floor(e*this.dpr);(this.hud.width!==s||this.hud.height!==r)&&(this.hud.width=s,this.hud.height=r)}resetCamera(){this.snap=!0}resetRun(t){this.snap=!0,(!this.stage||this.stage.arena!==t.arena)&&this.buildStage(t.arena),this.gl.renderLists.dispose()}screenToWorld(t,e){const n=new rt(t/this.cssW*2-1,-(e/this.cssH)*2+1);this.ray.setFromCamera(n,this.camera);const s=this.ray.ray.intersectPlane(this.plane,this.tmpV);return s?{x:s.x,y:s.z}:null}col(t){let e=this.colors.get(t);return e||(e=new Ut(t),this.colors.set(t,e)),e}dispose(){this.view.removeEventListener("webglcontextlost",this.onLost),this.view.removeEventListener("webglcontextrestored",this.onRestored);for(const t of this.layers)t.dispose();this.layers.length=0;for(const t of Object.values(this.M))t.dispose();for(const t of this.tex)t.dispose();this.wick.traverse(t=>{const e=t;e.isMesh&&e.material.dispose()}),this.field.geometry.dispose(),this.fieldMat.dispose(),this.stage?.dispose(),this.env?.dispose(),this.post?.dispose(),this.gl.dispose()}draw(t,e,n,s,r){for(const h of this.layers)h.begin();this.poolMat.uniforms.uTime.value=s,this.laneMat.uniforms.uTime.value=s,this.fieldMat.uniforms.uTime.value=s,this.stage?.update(s);let a=0,o=0;if(t){if(this.snap?(this.camX=t.player.x,this.camY=t.player.y,this.snap=!1):(this.camX+=(t.player.x-this.camX)*.12,this.camY+=(t.player.y-this.camY)*.12),n.shake&&e.trauma>0){const f=e.trauma*e.trauma*12;a=(Math.random()*2-1)*f,o=(Math.random()*2-1)*f}const h=this.cssW/this.cssH,u=Math.max(857,769/h);this.camera.position.set(this.camX+a,Math.sin(yh)*u,this.camY+o+Math.cos(yh)*u),this.camera.lookAt(this.camX+a,0,this.camY+o)}else{const h=s*.05;this.camera.position.set(Math.sin(h)*760,330,Math.cos(h)*760),this.camera.lookAt(0,60,0)}let l=0;t?l=this.drawWorld(t,e,n,s):l=this.drawAttract(s),this.drawFx(e,n,s),l=this.drawLights(t,e,s,l);for(let h=l;h<$a;h++)this.lights[h].intensity=0;for(const h of this.layers)h.end();if(this.post){const h=e.shocks.length&&this.preset.ripple&&!n.reducedFlash?e.shocks[e.shocks.length-1]:null,u=this.post.shock;if(h){const f=this.tmpV.set(h.x,0,h.y).project(this.camera),d=f.x*.5+.5,m=f.y*.5+.5,x=this.tmpV.set(h.x+h.r,0,h.y).project(this.camera),g=this.cssW/this.cssH,p=Math.abs((x.x*.5+.5-d)*g);u.uniforms.uCenter.value.set(d,m),u.uniforms.uRadius.value=p,u.uniforms.uWidth.value=.035+p*.12,u.uniforms.uStrength.value=.022*(h.life/h.max),u.enabled=!0}else u.enabled=!1;this.post.setBloomStrength(n.reducedFlash?.35:.6)}this.lost||(this.post?this.post.render():this.gl.render(this.scene,this.camera));const c=this.hctx;c.setTransform(1,0,0,1,0,0),c.clearRect(0,0,this.hud.width,this.hud.height),this.visor.draw(c,this.hud.width,this.hud.height,this.dpr,t,e,n,s,r,t?this.project:null)}shadowAt(t,e,n,s){const r=Math.max(.35,1-s/80);this.L.shadow.put(t,.35,e,0,n*1.5*r+2,1,n*1.5*r+2)}splat(t,e,n,s,r){const a=this.L.splat.put(t,.6,e,0,n,1,n);this.L.splat.colorC(a,s,r)}ringAt(t,e,n,s,r,a=!1,o=.9){const l=a?this.L.ringsDash:this.L.rings,c=l.put(t,o,e,0,n,1,n);Array.isArray(s)?l.color(c,s[0]*r,s[1]*r,s[2]*r):l.colorC(c,s,r)}lineAt(t,e,n,s,r,a,o,l,c=.8){const h=s-e,u=r-n,f=Math.hypot(h,u);if(f<.5)return;const d=t.put(e,c,n,-Math.atan2(u,h),f,1,a);Array.isArray(o)?t.color(d,o[0]*l,o[1]*l,o[2]*l):t.colorC(d,o,l)}drawWorld(t,e,n,s){const r=this.L,a=t.player,o=this.camX,l=this.camY,c=760*Math.max(1,this.cssW/this.cssH),h=640,u=520,f=(v,_,C)=>v>o-c-C&&v<o+c+C&&_>l-h-C&&_<l+u+C;for(const v of t.hazards.list)if(v.alive)if(v.kind==="pool"){const _=v.t<v.tele,C=_?44:v.r,w=r.pools.put(v.x,.5,v.y,0,C,1,C);if(w>=0){const R=r.pools.extra.aPool,L=v.t-v.tele;R[w*4]=_?v.t/v.tele:1,R[w*4+1]=_?0:1,R[w*4+2]=(v.x*.013+v.y*.007)%10,R[w*4+3]=_?1:Math.min(1,L/.25,(v.life-L)/.6)}_||this.splat(v.x,v.y,C*1.3,this.col(T.wine),.25)}else{const _=Math.hypot(v.x2-v.x,v.y2-v.y),C=r.lanes.put(v.x,.7,v.y,-Math.atan2(v.y2-v.y,v.x2-v.x),_,1,v.width);if(C>=0){const w=r.lanes.extra.aLane;w[C*4]=v.t>=v.tele?1:0,w[C*4+1]=Math.min(1,v.t/v.tele),w[C*4+2]=_,w[C*4+3]=v.width}}const d=this.col(T.rose),m=this.col(T.saddle);for(const v of t.pickups.list){if(!v.alive||!f(v.x,v.y,40))continue;const _=v.x*.05+v.y*.03;if(v.kind==="mote"){const C=Math.max(0,Math.sin(s*2.6+_*3))**24*3,w=r.mote.put(v.x,8+Math.sin(s*4+_)*2,v.y,Math.sin(s*1.3+_)*.9,4,4,4);r.mote.colorC(w,d,1.5+C),this.splat(v.x,v.y,14,d,.16)}else if(v.kind==="shard"){const C=Math.max(0,Math.sin(s*2+_*2))**30*2.5,w=r.shard.putEuler(v.x,12+Math.sin(s*3+_)*2,v.y,.3,s*1.6+_,.2,6.5,6.5,6.5);r.shard.colorC(w,d,1),r.shard.glowC(w,d,.45+C),this.splat(v.x,v.y,22,d,.24),this.shadowAt(v.x,v.y,5,12)}else{const C=r.chest.put(v.x,0,v.y,.4,12,12,12);r.chest.colorC(C,m,1),r.chest.glowC(C,d,.12);const w=2+Math.sin(s*6)*1.2,R=r.chestSeam.put(v.x,0,v.y,.4,12,12,12);r.chestSeam.colorC(R,d,w),this.splat(v.x,v.y,46,d,.3+.12*Math.sin(s*6)),this.shadowAt(v.x,v.y,14,0)}}for(const v of t.enemies.list)!v.alive||!f(v.x,v.y,340)||(this.drawTelegraph(v,s),f(v.x,v.y,60)&&this.drawEnemy(v,a.x,a.y,s,e));const x=this.col(T.red),g=this.col(T.blush),p=this.col(T.tan),M=this.col(T.bone);for(const v of t.bullets.list)if(!(!v.alive||!f(v.x,v.y,30)))if(v.friendly){const _=-Math.atan2(v.vy,v.vx),C=r.pbolt.put(v.x,12,v.y,_,v.kind===1?7:9,v.kind===1?3.2:2.4,v.kind===1?3.2:2.4);v.kind===1?(r.pbolt.colorC(C,p,2.6),Math.random()<.35&&e.ember(v.x,v.y,T.tan),this.splat(v.x,v.y,18,p,.22)):v.kind===2?r.pbolt.colorC(C,this.col(T.white),2.4):(r.pbolt.colorC(C,M,2.8),this.splat(v.x,v.y,16,M,.14))}else{const _=v.kind===1?g:x,C=v.r;n.outline&&r.eOutline.put(v.x,10,v.y,0,C+3.2,C+3.2,C+3.2);const w=r.eCore.put(v.x,10,v.y,0,C*.62,C*.62,C*.62);r.eCore.colorC(w,this.col(T.bone),2.2);const R=r.eShell.put(v.x,10,v.y,0,C*1.15,C*1.15,C*1.15);r.eShell.colorC(R,_,1.5),this.splat(v.x,v.y,24,_,.7)}return this.drawPlayer(t,e,s),0}drawTelegraph(t,e){const n=this.L;if(t.kind==="spitter"&&t.state===1){const s=1-t.timer/.7;this.lineAt(n.lines,t.x,t.y,t.x+Math.cos(t.ang)*520,t.y+Math.sin(t.ang)*520,6+10*s,this.col(T.red),.6+2.4*s)}else if(t.kind==="rammer"&&t.state===1){const s=.5+.5*Math.sin(e*40),r=480*Jo(1)*.55+40;this.lineAt(n.chevrons,t.x,t.y,t.x+Math.cos(t.ang)*r,t.y+Math.sin(t.ang)*r,t.r*2.2,this.col(T.blush),.45+.6*s)}else if(t.kind==="caster"&&t.state===1)this.ringAt(t.tx,t.ty,46,this.col(T.red),1.4,!0);else if(t.kind==="warden"&&t.state===1){const s=1-t.timer/.8;this.ringAt(t.x,t.y,t.r+34+s*34,this.col(T.red),1.4+Math.sin(e*28)*.5),t.tx===3&&this.lineAt(n.chevrons,t.x,t.y,t.x+Math.cos(t.ang)*330,t.y+Math.sin(t.ang)*330,40,this.col(T.red),1+s)}}drawEnemy(t,e,n,s,r){const a=this.L,o=xi[t.kind],l=this.col(o.color),c=Math.atan2(n-t.y,e-t.x),h=t.r,u=t.flash>0?5:0,f=t.seed,d=.1+l.r*.26,m=.05+l.g*.2,x=.05+l.b*.2,g=t.elite;let p=0;switch(t.kind){case"swarm":{p=12+Math.sin(s*5+f)*2.5;const M=a.drifter.put(t.x,p,t.y,s*3+f,h,h,h);a.drifter.color(M,d,m,x),a.drifter.glow(M,l.r*.12+u,l.g*.12+u,l.b*.12+u);const v=a.drifterEye.put(t.x,p,t.y,0,h,h,h);a.drifterEye.colorC(v,l,2.2);break}case"splitlet":{p=9+Math.sin(s*7+f)*2;const M=a.splitlet.putEuler(t.x,p,t.y,.5,s*7+f,.3,h,h,h);a.splitlet.colorC(M,this.col(T.wine),1),a.splitlet.glow(M,l.r*.9+u,l.g*.9+u,l.b*.9+u);break}case"spitter":{const M=Math.abs(Math.sin(s*7+f))*.6,v=a.spitterBody.put(t.x,M,t.y,-c,h,h,h);a.spitterBody.color(v,d,m,x),a.spitterBody.glow(v,u,u,u);const _=-t.ang,C=a.spitterHead.put(t.x,M,t.y,t.state===1?_:-c,h,h,h);a.spitterHead.color(C,d*1.1,m*1.1,x*1.1);const w=t.state===1?1-t.timer/.7:0;a.spitterHead.glow(C,l.r*(.1+w*.8)+u,l.g*(.1+w*.8)+u,l.b*(.1+w*.8)+u);const R=.17*h*(1+w*1.6),L=t.state===1?t.ang:c,S=a.spitterMuzzle.put(t.x+Math.cos(L)*1.12*h,M+1.36*h,t.y+Math.sin(L)*1.12*h,0,R,R,R),y=w>.85&&Math.floor(s*30)%2===0?2.5:1;a.spitterMuzzle.color(S,(l.r*1.5+w*3)*y,(l.g*1.5+w*3)*y,(l.b*1.5+w*3)*y),w>0&&this.splat(t.x,t.y,30+40*w,l,.3+w);break}case"rammer":{let M=t.x,v=t.y,_=1,C=1;const w=t.state===0?c:t.ang;if(t.state===1){M+=Math.sin(s*90)*1.8,v+=Math.cos(s*80)*1.8;const S=1-t.timer/.8;C=1-.3*S,_=1+.12*S}else t.state===2&&(C=.88,_=1.12,r.ember(t.x-Math.cos(t.ang)*h,t.y-Math.sin(t.ang)*h,T.blush),this.lineAt(this.L.lines,t.x-Math.cos(t.ang)*70,t.y-Math.sin(t.ang)*70,t.x,t.y,h*1.6,this.col(T.ember),.9));const R=a.rammer.put(M,0,v,-w,h*_,h*C,h*_);a.rammer.color(R,d,m,x),a.rammer.glow(R,u,u,u);const L=a.rammerEye.put(M,0,v,-w,h*_,h*C,h*_);a.rammerEye.colorC(L,l,t.state===1?4:2);break}case"cleaver":{p=h*1.25+Math.sin(s*2+f)*2;const M=Math.sin(s*.9+f)*.35,v=s*.6+f,_=Math.cos(s*.7+f)*.3,C=a.cleaver.putEuler(t.x,p,t.y,M,v,_,h,h,h);a.cleaver.colorC(C,this.col(T.mesa),1.4),a.cleaver.glow(C,l.r*.18+u,l.g*.18+u,l.b*.18+u);const w=1.6+Math.sin(s*4+f)*.5,R=a.cleaverCore.putEuler(t.x,p,t.y,M,v,_,h,h,h);a.cleaverCore.colorC(R,l,w),this.splat(t.x,t.y,h*2.2,l,.18);break}case"aegis":{const M=a.aegis.put(t.x,0,t.y,-c,h,h,h);a.aegis.colorC(M,this.col(T.umber),1.6),a.aegis.glow(M,u,u,u);const v=a.aegisRim.put(t.x,0,t.y,0,h,h,h);a.aegisRim.colorC(v,l,1.8);const _=h+9,C=a.shieldFrame.put(t.x,0,t.y,-t.shield,_,h*1.1,_);a.shieldFrame.colorC(C,this.col(T.tan),1),a.shieldFrame.glowC(C,l,.3+u*.2);const w=a.shieldPlate.put(t.x,0,t.y,-t.shield,_,h*1.1,_);a.shieldPlate.colorC(w,l,t.flash>0?2.5:.85);break}case"caster":{p=30+Math.sin(s*2.2+f)*4;const M=t.state===1?1-t.timer/.5:0,v=a.caster.putEuler(t.x,p,t.y,.25,s*.8+f,0,h,h,h);a.caster.color(v,d,m,x),a.caster.glow(v,l.r*.1+u,l.g*.1+u,l.b*.1+u);const _=h*(1+.7*M),C=a.casterCore.put(t.x,p,t.y,0,_,_,_);a.casterCore.colorC(C,l,1.8+4*M),this.splat(t.x,t.y,30+30*M,l,.25+.6*M);break}case"warden":this.drawWarden(t,c,s,u);break}this.shadowAt(t.x,t.y,h,p),g&&this.ringAt(t.x,t.y,h+8,this.col(T.blush),1.2+Math.sin(s*5)*.25)}drawWarden(t,e,n,s){const r=this.L,a=t.r,o=t.phase===1,l=t.state===1?.5+.5*Math.sin(n*28):0,c=r.wardenHull.put(t.x,0,t.y,-e*.25+n*.1,a,a,a);o?r.wardenHull.colorC(c,this.col(T.wine),1):r.wardenHull.colorC(c,this.col(T.saddle),1);const h=this.col(T.red);r.wardenHull.glow(c,(o?h.r*.3:0)+l*h.r*.6+s*.5,(o?h.g*.3:0)+l*h.g*.6+s*.5,(o?h.b*.3:0)+l*h.b*.6+s*.5);const u=o?.32+Math.sin(n*3)*.04:0,f=n*.35;for(let M=0;M<8;M++){const v=f+M/8*Vi,_=a*(.98+u),C=r.wardenPetal.put(t.x+Math.cos(v)*_,u*8,t.y+Math.sin(v)*_,-v,a,a*(1-u*.3),a);r.wardenPetal.colorC(C,this.col(T.mesa),1.2),r.wardenPetal.glow(C,s*.5+(o?.2:0),s*.5,s*.5+(o?.1:0))}const d=o?h:this.col(T.blush),m=r.wardenCrown.put(t.x,a*.92,t.y,-n*(o?1.6:.8),a,a,a);r.wardenCrown.colorC(m,d,2.2+l*2);const x=n*(o?1.8:1);for(let M=0;M<8;M++){const v=x+M/8*Vi,_=a+18,C=r.wardenNode.put(t.x+Math.cos(v)*_,a*.55+Math.sin(n*3+M)*3,t.y+Math.sin(v)*_,v,5.5,5.5,5.5);o?r.wardenNode.colorC(C,h,3.2):r.wardenNode.colorC(C,this.col(T.blush),2.4)}const g=a*(o?.34:.24)*(1+l*.25),p=r.wardenCore.put(t.x,a*.75,t.y,n,g,g,g);o?r.wardenCore.colorC(p,h,5):r.wardenCore.colorC(p,this.col(T.blush),3.4),this.splat(t.x,t.y,a*3,o?h:this.col(T.ember),.35+l*.5)}drawPlayer(t,e,n){const s=this.L,r=t.player,a=t.levels,o=t.state==="dead"&&t.deathTimer>.05,l=r.iframes>0&&Math.floor(n*18)%2===0;this.wick.visible=!o&&!l;let c=r.facing-this.lastFacing;for(;c>Math.PI;)c-=Vi;for(;c<-Math.PI;)c+=Vi;this.lastFacing=r.facing,this.bank+=(Math.max(-.6,Math.min(.6,c*8))-this.bank)*.15;const h=9+Math.sin(n*3)*1.5;this.wick.position.set(r.x,h,r.y),this.wick.rotation.set(this.bank,-r.facing,0,"YXZ"),this.wick.scale.setScalar(12);const u=Math.hypot(r.vx,r.vy),f=.7+Math.min(1,u/190)*1.2;if(r.flash>0?this.wickGlowMat.color.set(T.red).multiplyScalar(3.5):this.wickGlowMat.color.set(T.bone).multiplyScalar(1.4*f),o)return;this.shadowAt(r.x,r.y,14,h),this.splat(r.x,r.y,60,this.col(T.bone),.1),u>40&&Math.random()<.5&&e.ember(r.x-Math.cos(r.facing)*12,r.y-Math.sin(r.facing)*12,T.tan);const d=a.siphon>0&&a.bulwark>0;if(this.field.visible=d&&r.fieldOn,this.field.visible){const m=r.fieldR;this.field.position.set(r.x,0,r.y),this.field.scale.set(m,m*.42,m),this.fieldMat.uniforms.uPulse.value=e.fieldPulse,this.ringAt(r.x,r.y,m,this.col(T.bone),.75+e.fieldPulse*1.5),this.ringAt(r.x,r.y,m-12,this.col(T.tan),.6+e.fieldPulse,!0)}else d&&r.hold&&this.ringAt(r.x,r.y,26+r.reserve*.1,this.col(T.tan),1.4,!0);if(a.orbit>0){const m=r.fieldOn&&d,x=m?r.fieldR+10:64,g=a.orbit+1,p=this.col(T.tan);for(let M=0;M<g;M++){const v=r.orbitAngle+M/g*Vi,_=r.x+Math.cos(v)*x,C=r.y+Math.sin(v)*x,w=s.blade.put(_,14,C,-(v+Math.PI/2),11,11,11);s.blade.colorC(w,p,m?1.9:1.4),this.splat(_,C,22,p,.25)}}}drawAttract(t){this.wick.visible=!0,this.field.visible=!1,this.wick.position.set(0,26+Math.sin(t*1.4)*4,0),this.wick.rotation.set(Math.sin(t*.7)*.15,t*.25,0,"YXZ"),this.wick.scale.setScalar(26),this.wickGlowMat.color.set(T.bone).multiplyScalar(2.2),this.shadowAt(0,0,30,26),this.splat(0,0,160,this.col(T.bone),.18);const e=["swarm","spitter","rammer","cleaver","aegis","caster","swarm","rammer"],n=this.fakeEnemy;for(let s=0;s<e.length;s++){const r=t*.12+s/e.length*Vi,a=260+s%2*70;n.kind=e[s],n.x=Math.cos(r)*a,n.y=Math.sin(r)*a,n.r=xi[n.kind].r*1.6,n.seed=s*1.3,n.shield=t*1.4+s,n.ang=r+Math.PI,n.elite=s===3,this.drawEnemy(n,0,0,t,this.dummyFx)}return 0}drawFx(t,e,n){const s=this.L,r=e.reducedFlash?.55:1;for(const a of t.rings){const o=Math.max(0,a.life/a.max);this.ringAt(a.x,a.y,a.r,this.col(a.color),o*2.2*r,!1,1.2)}for(const a of t.shocks){const o=Math.max(0,a.life/a.max);this.ringAt(a.x,a.y,a.r,[1,1,1],o*1.6*r,!1,1.4)}for(const a of t.beams){const o=Math.max(0,a.life/a.max),l=this.col(a.color),c=a.pts;for(let h=0;h+3<c.length;h+=2){const u=c[h],f=c[h+1],d=c[h+2],m=c[h+3];if(!a.jagged)this.lineAt(s.beams,u,f,d,m,a.w*3.2,l,3.2*o,16),this.lineAt(s.beams,u,f,d,m,a.w*1.1,[1,1,1],4*o,16.5);else{const x=d-u,g=m-f,p=Math.hypot(x,g)||1,M=-g/p,v=x/p;let _=u,C=f;const w=5;for(let R=1;R<=w;R++){const L=R/w,S=R===w?0:(Math.random()-.5)*Math.min(26,p*.25),y=u+x*L+M*S,P=f+g*L+v*S;this.lineAt(s.beams,_,C,y,P,a.w*3.4,l,3*o,18),this.lineAt(s.beams,_,C,y,P,a.w*1.1,[1,1,1],2.5*o,18.5),_=y,C=P}}}}for(const a of t.particles){if(!a.alive)continue;const o=Math.max(0,a.life/a.max),l=this.col(a.color);if(a.kind===1){const c=a.size*1.3,h=s.debris.putEuler(a.x,a.z+c*.5,a.y,a.rx,a.ry,0,c,c,c);s.debris.color(h,.12+l.r*.3,.06+l.g*.3,.06+l.b*.3),s.debris.glowC(h,l,o*o*2.2)}else{const c=a.size*.55*(.4+.6*o),h=s.sparks.put(a.x,a.z+1,a.y,0,c,c,c);s.sparks.colorC(h,l,1+3*o)}}}drawLights(t,e,n,s){const r=this.preset.lights;let a=s;const o=(l,c,h,u,f,d)=>{if(a>=r)return;const m=this.lights[a++];m.position.set(l,c,h),m.color.copy(u),m.intensity=f,m.distance=d};if(t){const l=t.player;t.state==="dead"&&t.deathTimer>.05||o(l.x,90,l.y,this.col(T.bone),3600,480)}else o(0,140,0,this.col(T.bone),6e3,900);for(let l=e.flares.length-1;l>=0&&a<r;l--){const c=e.flares[l],h=Math.pow(Math.max(0,c.life/c.max),1.5);o(c.x,c.h,c.y,this.col(c.color),c.power*16e3*h,c.range)}if(t&&a<r){for(const l of t.enemies.list)if(l.alive&&l.kind==="warden"){const c=l.state===1?.6+.4*Math.sin(n*28):.25;if(o(l.x,90,l.y,this.col(l.phase?T.red:T.blush),2e4*c,700),a>=r)break}}return a}}function $u(i,t=zh()){const e=i.player;let n=0,s=0,r=0;for(const c of i.enemies.list){if(!c.alive)continue;const h=e.x-c.x,u=e.y-c.y,f=h*h+u*u;if(f<260*260){const d=Math.sqrt(f)||1,m=(c.kind==="warden"?3:1)/(d+20);n+=h/d*m*100,s+=u/d*m*100,d<140&&r++}}for(const c of i.bullets.list){if(!c.alive||c.friendly)continue;const h=e.x-c.x,u=e.y-c.y,f=h*h+u*u;if(f<120*120){const d=Math.sqrt(f)||1,m=Math.hypot(c.vx,c.vy)||1,x=h*-c.vy+u*c.vx>0?1:-1;n+=-c.vy/m*x*(60/d),s+=c.vx/m*x*(60/d)}}for(const c of i.hazards.list){const h=Math.hypot(e.x-c.x,e.y-c.y);c.kind==="pool"&&h<c.r+60&&(n+=(e.x-c.x)/(h||1)*2,s+=(e.y-c.y)/(h||1)*2)}if(r===0){let c=1e9;for(const h of i.pickups.list){const u=Math.hypot(h.x-e.x,h.y-e.y);u<c&&u<400&&(c=u,n+=(h.x-e.x)/u*.6,s+=(h.y-e.y)/u*.6)}}const a=i.arena==="foundry"?1300:1200,o=Math.hypot(e.x,e.y);o>a-300&&(n-=e.x/o*1.5,s-=e.y/o*1.5);const l=Math.hypot(n,s);return t.mx=l>.02?n/l:0,t.my=l>.02?s/l:0,t.hasAim=!1,t.release=i.levels.detonation>0&&e.reserve>70&&r>=4,t.toggleHold=!1,t}const Zu="void-survivor:v1";function J_(i=!1){return{volume:.6,muted:!1,shake:!i,reducedFlash:i,outline:!0,aim:"auto",numbers:!0,quality:"auto"}}function Ku(i=!1){return{v:1,shards:0,owned:{},best:{time:0,kills:0,wave:0,score:0,level:0},stats:{runs:0,wins:0,kills:0,deaths:0,bosses:0,playtime:0},settings:J_(i),arena:"hollow"}}function Ke(i,t,e=0,n=1e9){return typeof i=="number"&&Number.isFinite(i)?Math.min(n,Math.max(e,i)):t}function Ss(i,t){return typeof i=="boolean"?i:t}function j_(i,t=!1){const e=Ku(t);if(!i)return e;let n;try{n=JSON.parse(i)}catch{return e}if(!n||typeof n!="object")return e;const s=n;if(s.v!==1)return e;const r=s.best&&typeof s.best=="object"?s.best:{},a=s.stats&&typeof s.stats=="object"?s.stats:{},o=s.settings&&typeof s.settings=="object"?s.settings:{},l=s.owned&&typeof s.owned=="object"?s.owned:{},c={};for(const f of Object.keys(l)){const d=l[f];typeof d=="number"&&Number.isFinite(d)&&d>0&&d<10&&(c[f]=Math.floor(d))}const h=o.quality==="low"||o.quality==="medium"||o.quality==="high"||o.quality==="auto"?o.quality:e.settings.quality,u=o.aim==="mouse"||o.aim==="move"||o.aim==="auto"?o.aim:e.settings.aim;return{v:1,shards:Math.floor(Ke(s.shards,0)),owned:c,best:{time:Ke(r.time,0),kills:Ke(r.kills,0),wave:Ke(r.wave,0),score:Ke(r.score,0),level:Ke(r.level,0)},stats:{runs:Ke(a.runs,0),wins:Ke(a.wins,0),kills:Ke(a.kills,0),deaths:Ke(a.deaths,0),bosses:Ke(a.bosses,0),playtime:Ke(a.playtime,0)},settings:{volume:Ke(o.volume,e.settings.volume,0,1),muted:Ss(o.muted,e.settings.muted),shake:Ss(o.shake,e.settings.shake),reducedFlash:Ss(o.reducedFlash,e.settings.reducedFlash),outline:Ss(o.outline,e.settings.outline),aim:u,numbers:Ss(o.numbers,e.settings.numbers),quality:h},arena:s.arena==="foundry"?"foundry":"hollow"}}function Q_(i=!1){try{return j_(localStorage.getItem(Zu),i)}catch{return Ku(i)}}function ty(i){try{localStorage.setItem(Zu,JSON.stringify(i))}catch{}}function Mh(i){const t=Math.min(2,window.devicePixelRatio||1),e=Math.max(1,window.innerWidth),n=Math.max(1,window.innerHeight);(i.width!==Math.floor(e*t)||i.height!==Math.floor(n*t))&&(i.width=Math.floor(e*t),i.height=Math.floor(n*t));const s=i.getContext("2d");if(!s)return;s.setTransform(t,0,0,t,0,0),s.clearRect(0,0,e,n);const r=e<760,a=Math.min(e,n);Qh(s,r?0:e*.45,0,r?e:e*.55,n*.6,{seed:31,count:r?40:70,color:T.ash,max:1.5,alpha:.4});const o=a*(r?.08:.085),l=r?e-o-22:e*.82,c=r?o+26:n*.2;Dd(s,l,c,o,{face:T.bone,ink:T.wine,rim:T.ember,phase:.12,shadow:T.night,glow:.12}),r||sl(s,[[l-o*4.2,c+o*.4],[l-o*3.1,c-o*.5],[l-o*2,c+o*.1],[l-o*1.4,c+o*1.6]],{color:T.quiet,node:T.ash,alpha:.85,dash:[2,5],width:1,nodeR:2.2});const h=n;Zl(s,-20,e+20,h-n*.07,{seed:5,height:n*.15,fill:T.mesa,strata:T.ember,bottom:h,plateaus:r?2:3,strataAlpha:.3});const u=h-n*.035;Zl(s,-20,e+20,u,{seed:12,height:n*.06,fill:T.umber,strata:T.wine,bottom:h,plateaus:r?2:4,strataAlpha:.4}),s.fillStyle=T.ink,s.fillRect(0,h-n*.022,e,n*.022);const f=r?e*.78:e*.88;Id(s,f,h-n*.022,a*.05,{fill:T.ink,slit:T.red,telescopeAngle:-.8});const d=a*.07;ca(s,r?e*.14:e*.56,h-n*.02,d,{fill:T.ink,seed:2}),ca(s,r?e*.32:e*.66,h-n*.02,d*.62,{fill:T.ink,seed:4,arms:[.5]}),r||ca(s,e*.96,h-n*.02,d*.8,{fill:T.ink,seed:9}),Jh(s,0,0,e,n,{seed:3,density:.35,colors:[T.tan,T.ember],alpha:.06})}const Sh=["menu","vault","settings","howto","pause","levelup","summary"];function $t(i){const t=document.getElementById(i);if(!t)throw new Error(`Missing element #${i}`);return t}function Yt(i,t,e){const n=document.createElement(i);return t&&(n.className=t),e!==void 0&&(n.textContent=e),n}function Ts(i){const t=Math.floor(i);return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`}const ey={signature:"Signature core",weapon:"Weapon",passive:"Passive",filler:"One-time fix"},ny=["I","II","III"];class iy{constructor(t,e){$(this,"current",null);$(this,"h");$(this,"getSave");$(this,"opener",null);$(this,"settingsReturn","menu");this.h=t,this.getSave=e;const n=(a,o)=>{$t(a).addEventListener("click",()=>{this.h.click(),o()})};n("btnStart",()=>t.start()),n("btnVault",()=>this.open("vault")),n("btnSettings",()=>{this.settingsReturn="menu",this.open("settings")}),n("btnHow",()=>this.open("howto")),n("vaultBack",()=>this.open("menu")),n("howBack",()=>this.open("menu")),n("settingsBack",()=>this.open(this.settingsReturn)),n("pResume",()=>t.resume()),n("pRestart",()=>t.restart()),n("pSettings",()=>{this.settingsReturn="pause",this.open("settings")}),n("pQuit",()=>t.quit()),n("btnReroll",()=>t.reroll()),n("sumAgain",()=>t.restart()),n("sumVault",()=>{this.settingsReturn="menu",this.open("vault")}),n("sumMenu",()=>t.quit());const s=()=>this.getSave().settings;$t("setVolume").addEventListener("input",a=>{s().volume=Number(a.target.value)/100,t.settingsChanged()});const r=(a,o)=>{$t(a).addEventListener("change",l=>{s()[o]=l.target.checked,t.settingsChanged()})};r("setMuted","muted"),r("setShake","shake"),r("setFlash","reducedFlash"),r("setOutline","outline"),r("setNumbers","numbers"),$t("setAim").addEventListener("change",a=>{s().aim=a.target.value,t.settingsChanged()}),$t("setQuality").addEventListener("change",a=>{s().quality=a.target.value,t.settingsChanged()}),window.addEventListener("resize",()=>{this.current==="menu"&&Mh($t("menuSky"))}),document.addEventListener("keydown",a=>{if(a.key!=="Tab"||!this.current||this.current==="menu")return;const o=$t(this.current),l=Array.from(o.querySelectorAll("button, input, select, [tabindex]")).filter(f=>!f.hasAttribute("disabled")&&f.offsetParent!==null);if(l.length===0)return;const c=l[0],h=l[l.length-1],u=document.activeElement;a.shiftKey&&(u===c||!o.contains(u))?(a.preventDefault(),h.focus()):!a.shiftKey&&(u===h||!o.contains(u))&&(a.preventDefault(),c.focus())})}open(t){this.current===null&&(this.opener=document.activeElement);for(const s of Sh)$t(s).classList.toggle("hidden",s!==t);this.current=t,t==="menu"&&(this.renderMenu(),Mh($t("menuSky"))),t==="vault"&&this.renderVault(),t==="settings"&&this.syncSettings();const n=$t(t).querySelector(".btn-primary, .mod, .btn, input, select");window.setTimeout(()=>n?.focus(),0)}close(){for(const t of Sh)$t(t).classList.add("hidden");this.current=null,this.opener&&document.contains(this.opener)&&this.opener.blur(),document.activeElement?.blur?.()}announce(t){$t("live").textContent=t}setQualityNote(t){$t("qualityNote").textContent=t}renderMenu(){const t=this.getSave();$t("menuShards").textContent=String(t.shards);const e=t.best,n=t.stats.runs;$t("menuBest").textContent=e.time>0?`Longest run ${Ts(e.time)}, with ${e.kills} kills on wave ${e.wave}. ${n} ${n===1?"run":"runs"} logged.`:"No runs logged yet. Your best run will show here.";const s=$t("arenaPick");s.querySelectorAll("label").forEach(a=>a.remove());const r=[{id:"hollow",name:"The Hollow"},{id:"foundry",name:"Ring Foundry"}];for(const a of r){const o=Yh(t.owned,a.id),l=Yt("label","chip"),c=Yt("input");c.type="radio",c.name="arena",c.value=a.id,c.checked=t.arena===a.id&&o,c.disabled=!o,c.addEventListener("change",()=>this.h.arena(a.id));const h=Yt("span",void 0,a.name);o||h.append(Yt("small",void 0,"Unlock in the Vault")),l.append(c,h),s.append(l)}}renderVault(){const t=this.getSave();$t("vaultShards").textContent=String(t.shards);const e=$t("vaultList");e.textContent="";for(const n of Xh){const s=on(t.owned,n.id),r=il(t.owned,n),a=Yt("li","locker-row"+(s>0?" owned":"")),o=Yt("div","locker-text");o.append(Yt("h3",void 0,n.name),Yt("p",void 0,n.desc));const l=Yt("span","ticks");l.setAttribute("role","img"),l.setAttribute("aria-label",`${s} of ${n.cost.length} owned`);for(let h=0;h<n.cost.length;h++)l.append(Yt("i",h<s?"on":void 0));const c=Yt("button","btn btn-buy");c.type="button",r===null?(c.textContent=n.cost.length>1?"Maxed":"Owned",c.disabled=!0):(c.textContent=`Buy for ${r} Shards`,c.disabled=!qh(t.owned,t.shards,n),c.disabled&&(c.title=`You need ${r-t.shards} more Shards`),c.addEventListener("click",()=>{this.h.click(),this.h.buy(n.id)})),a.append(o,l,c),e.append(a)}}syncSettings(){const t=this.getSave().settings;$t("setVolume").value=String(Math.round(t.volume*100)),$t("setMuted").checked=t.muted,$t("setShake").checked=t.shake,$t("setFlash").checked=t.reducedFlash,$t("setOutline").checked=t.outline,$t("setNumbers").checked=t.numbers,$t("setAim").value=t.aim,$t("setQuality").value=t.quality}renderChoice(t){const e=t.choice;if(!e)return;$t("luTitle").textContent=e.chest?"Chest salvage":`Level ${t.player.level}`,$t("luSub").textContent=e.chest?"A sealed cache, heavy with rare parts. Slot one module.":"Wick has Essence to spare. Slot one module.";const n=$t("cards");n.textContent="",e.ids.forEach((r,a)=>n.append(this.module(Yi[r],t.levels,a)));const s=$t("btnReroll");s.textContent=t.rerolls>0?`Reroll the rig (4), ${t.rerolls} left`:"No rerolls left",s.disabled=t.rerolls<=0,this.announce(`${e.chest?"Chest salvage":"Level up"}. Choose one of three modules.`)}module(t,e,n){const s=e[t.id],r=t.kind==="filler",a=Yt("button",`mod mod-${t.kind}`);a.type="button",a.style.setProperty("--accent",t.color);const o=Math.min(t.maxLevel,s+1),l=t.desc(o),c=r?"single use":s===0?`new, level 1 of ${t.maxLevel}`:`level ${o} of ${t.maxLevel}`;a.setAttribute("aria-label",`Install ${t.name}, ${c}. ${l} Key ${n+1}.`);const h=Yt("span","mod-slot",ny[n]??String(n+1));h.setAttribute("aria-hidden","true");const u=Yt("span","mod-key",String(n+1));u.setAttribute("aria-hidden","true");const f=Yt("span","mod-seal",t.icon);if(f.setAttribute("aria-hidden","true"),a.append(h,u,f,Yt("span","mod-kind",ey[t.kind]),Yt("span","mod-name",t.name)),!r){const m=Yt("span","ticks");for(let x=0;x<t.maxLevel;x++)m.append(Yt("i",x<s?"on":x===s?"new":void 0));a.append(m,Yt("span","mod-level",s===0?"New module":`Upgrade to level ${o}`))}a.append(Yt("span","mod-desc",l));const d=Cf(t.id,e);return d&&a.append(Yt("span","mod-tape","Completes "+d.replace(/^Synergy:\s*/,""))),a.addEventListener("click",()=>{this.h.click(),this.h.pick(n)}),a}renderSummary(t,e,n){$t("sumTitle").textContent=t.won?"Wick recovered":"Signal lost",$t("sumLine").textContent=t.won?`The salvage drone came home from ${n} after ${Ts(t.time)} with ${t.kills} kills.`:`Wick went dark in ${n} at ${Ts(t.time)}, on wave ${t.wave}.`;const s=$t("sumRating");s.textContent=t.rating,s.setAttribute("aria-label",`Rating ${t.rating}`),s.dataset.rating=t.rating;const r=$t("sumGrid");r.textContent="";const a=new Set(e),o=[["Time",Ts(t.time),"time"],["Wave",String(t.wave),"wave"],["Kills",String(t.kills),"kills"],["Damage dealt",t.damage.toLocaleString("en")],["Level",String(t.level)],["Wardens down",String(t.bosses)],["Best chain",`×${t.maxChain}`],["Detonations",String(t.detonations)],["Score",t.score.toLocaleString("en"),"score"]];for(const[g,p,M]of o){const v=Yt("div"),_=Yt("dd",void 0,p);M&&a.has(M)&&_.append(Yt("span","best-tag","New best")),v.append(Yt("dt",void 0,g),_),r.append(v)}const l=$t("sumKills");l.textContent="";const c=Object.keys(t.killsBy).sort((g,p)=>t.killsBy[p]-t.killsBy[g]);c.length===0&&l.append(Yt("li","empty","Nothing this time."));const h=c.length?t.killsBy[c[0]]:1;for(const g of c){const p=xi[g],M=Yt("li"),v=Yt("i");v.style.setProperty("--w",String(Math.max(.04,t.killsBy[g]/h))),v.style.setProperty("--c",p?.color??"var(--mw-bone)"),v.setAttribute("aria-hidden","true"),M.append(Yt("span",void 0,p?.name??g),v,Yt("span","num",String(t.killsBy[g]))),l.append(M)}const u=$t("sumPicks");u.textContent="",t.picks.length===0&&u.append(Yt("li","empty","No modules taken."));let f=0;for(;f<t.picks.length;){const g=t.picks[f];let p=1;for(;t.picks[f+p]===g;)p++;const M=Yt("li",void 0,Yi[g].name+(p>1?` ×${p}`:""));M.style.setProperty("--c",Yi[g].color),u.append(M),f+=p}const d=$t("sumShards");d.textContent="";const m=[["Crystals collected",t.shardsCollected],["Time survived",t.shardsTime],["Kills",t.shardsKills],["Wardens",t.shardsBosses],["Victory bonus",t.shardsWin]];for(const[g,p]of m){const M=Yt("li");M.append(Yt("span",void 0,g),Yt("span","num",`+${p}`)),d.append(M)}const x=Yt("li","total");x.append(Yt("span",void 0,"Total"),Yt("span","num",String(t.shardsTotal))),d.append(x)}}const sy=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1,ae=Q_(sy),bh=document.getElementById("view"),bi=document.getElementById("hud"),Hr=document.getElementById("fatal"),wl=document.getElementById("notice"),ry=document.getElementById("noticeText");document.getElementById("noticeClose")?.addEventListener("click",()=>wl.classList.add("hidden"));function Eh(i){ry.textContent=i,wl.classList.remove("hidden")}function ay(){try{const t=document.createElement("canvas").getContext("webgl2");if(!t)return"low";const e=Rd(t);return t.getExtension("WEBGL_lose_context")?.loseContext(),e}catch{return"low"}}let ws=ay(),Th=!1;const ta=()=>Cd[Pd(ae.settings.quality,ws)],gi=new Ad;gi.budget=ta().particles;let Ie;try{const i=new K_(bh,bi,ta());i.onContext=t=>{t?($s(),Eh("The graphics card reset and the 3D view was lost. The run is paused; it will come back on its own in a moment.")):(wl.classList.add("hidden"),ne.announce("3D view restored."))},Ie=i}catch(i){console.warn("WebGL renderer unavailable, using Canvas 2D.",i),bh.classList.add("hidden");try{Ie=new Fd(bi),Eh("3D graphics could not start because WebGL is unavailable or blocked in this browser, so you are playing the flat 2D view. Turning on hardware acceleration usually fixes this.")}catch(t){throw Hr.textContent="This browser cannot draw the game: neither WebGL nor Canvas 2D is available.",Hr.classList.remove("hidden"),t}}document.body.dataset.renderer=Ie.kind;const Le=new ff;Le.volume=ae.settings.volume;Le.muted=ae.settings.muted;let de="menu",Te=null,Nr=0,Fr=0,Gs=performance.now(),Ju=0,ea=!1,wh=!1,ju=null,Qu=0,Za=0,wr=0,As=0,Ah=0,Ka=0;const ye=zh(),na=new Set;let Ko=-1,tf=-1,ef=!1,Ch=1,Rh=0;const fe={active:!1,bx:0,by:0,kx:0,ky:0,id:-1,x:0,y:0},Is=()=>ty(ae);function Al(){Le.setVolume(ae.settings.volume),Le.setMuted(ae.settings.muted)}let Ph=null;function Cl(){const i=ta();gi.budget=i.particles,Ph!==i.level&&(Ph=i.level,Ie.setQuality(i)),ne.setQualityNote(ae.settings.quality==="auto"?`Auto is using ${Kh[i.level]} on this device.`:"")}function oy(){const i=/seed=(\d+)/.exec(location.hash);return i?Number(i[1])>>>0:(Date.now()^Math.floor(performance.now()*1e3))>>>0||1}function Gr(){Le.init(),Le.startMusic(),Le.setDuck(!1),Te=Hh(oy(),$h(ae.owned,ae.arena)),gi.reset(),Ie.resetRun(Te),Nr=0,Fr=0,As=0,Ju=performance.now(),ye.release=!1,ye.toggleHold=!1,de="playing",ne.close(),ne.announce("Run started. Survive."),ia(!0)}function ly(){Te=null,ea=!1,de="menu",Le.stopMusic(),ia(!1),ne.open("menu")}function $s(){de==="playing"&&(de="paused",Le.setDuck(!0),ne.open("pause"))}function nf(){de==="paused"&&(de="playing",Le.setDuck(!1),ne.close(),Gs=performance.now())}function cy(){if(!Te)return;const i=dd(Te);ju=i;const t=[],e=ae.best;i.time>e.time&&(e.time=i.time,t.push("time")),i.kills>e.kills&&(e.kills=i.kills,t.push("kills")),i.wave>e.wave&&(e.wave=i.wave,t.push("wave")),i.score>e.score&&(e.score=i.score,t.push("score")),e.level=Math.max(e.level,i.level),ae.shards+=i.shardsTotal,ae.stats.runs++,ae.stats.kills+=i.kills,ae.stats.bosses+=i.bosses,ae.stats.playtime+=Math.round((performance.now()-Ju)/1e3),i.won?ae.stats.wins++:ae.stats.deaths++,Is(),de="summary",Le.setDuck(!0),ia(!1),ne.renderSummary(i,t,Te.arena==="foundry"?"Ring Foundry":"The Hollow"),ne.open("summary"),ne.announce(`${i.won?"Victory":"Run over"}. Rating ${i.rating}. ${i.kills} kills in ${Ts(i.time)}.`)}function ia(i){const t=document.getElementById("touch");if(!t)return;const e=window.matchMedia?.("(pointer: coarse)").matches??!1;t.classList.toggle("hidden",!(i&&e))}const ne=new iy({start:Gr,resume:nf,restart:()=>{Gr()},quit:ly,pick:i=>sf(i),reroll:()=>{Te&&Wh(Te)&&ne.renderChoice(Te)},buy:i=>{const t=pd(ae.owned,ae.shards,i);t&&(ae.owned=t.owned,ae.shards=t.shards,Is(),ne.renderVault(),ne.announce("Purchased."))},arena:i=>{ae.arena=i,Is()},settingsChanged:()=>{Al(),Cl(),Is()},click:()=>Le.click()},()=>ae);function sf(i){if(!(!Te||de!=="levelup")&&nl(Te,i)){if(Te.state==="levelup"){ne.renderChoice(Te);return}de="playing",Le.setDuck(!1),ne.close(),Gs=performance.now()}}function hy(i){return i instanceof HTMLInputElement&&i.type==="text"}window.addEventListener("keydown",i=>{if(hy(i.target))return;const t=i.key.toLowerCase();if(Le.init(),t==="m"){ae.settings.muted=!ae.settings.muted,Al(),Is(),ne.current==="settings"&&ne.syncSettings();return}if(de==="levelup"){t==="1"||t==="2"||t==="3"?sf(Number(t)-1):t==="4"&&Te&&Wh(Te)&&ne.renderChoice(Te);return}if(t==="escape"||t==="p"){de==="playing"?$s():de==="paused"?nf():ne.current==="settings"?ne.open(ne.settingsReturn):(ne.current==="vault"||ne.current==="howto")&&ne.open("menu"),i.preventDefault();return}if(t==="r"&&(de==="paused"||de==="summary")){Gr();return}if(de==="menu"&&t==="enter"&&ne.current==="menu"&&document.activeElement===document.body){Gr();return}de==="playing"&&(t==="e"||t===" "?(ye.release=!0,i.preventDefault()):t==="q"&&(ye.toggleHold=!0)),["arrowup","arrowdown","arrowleft","arrowright"," "].includes(t)&&de==="playing"&&i.preventDefault(),na.add(t)});window.addEventListener("keyup",i=>na.delete(i.key.toLowerCase()));window.addEventListener("blur",()=>{na.clear(),$s()});document.addEventListener("visibilitychange",()=>{document.hidden&&$s()});window.addEventListener("resize",()=>Ie.resize());window.addEventListener("orientationchange",()=>Ie.resize());bi.addEventListener("pointermove",i=>{if(Ko=i.clientX,tf=i.clientY,i.pointerType==="mouse"&&(ef=!0),fe.active&&i.pointerId===fe.id){const t=Ie.dpr,e=i.clientX*t-fe.bx,n=i.clientY*t-fe.by,s=Math.hypot(e,n),r=56*t,a=s>r?r/s:1;fe.kx=fe.bx+e*a,fe.ky=fe.by+n*a,fe.x=e*a/r,fe.y=n*a/r}});bi.addEventListener("pointerdown",i=>{if(Le.init(),i.pointerType==="touch"&&de==="playing"&&!fe.active&&i.clientX<window.innerWidth*.62){fe.active=!0,fe.id=i.pointerId,fe.bx=fe.kx=i.clientX*Ie.dpr,fe.by=fe.ky=i.clientY*Ie.dpr,fe.x=fe.y=0,bi.setPointerCapture(i.pointerId),ia(!0);const t=document.getElementById("touch");t&&t.classList.remove("hidden")}});const rf=i=>{fe.active&&i.pointerId===fe.id&&(fe.active=!1,fe.x=fe.y=0)};bi.addEventListener("pointerup",rf);bi.addEventListener("pointercancel",rf);const Rl=(i,t)=>document.getElementById(i)?.addEventListener("pointerdown",e=>{e.preventDefault(),Le.init(),t()});Rl("tRelease",()=>{ye.release=!0});Rl("tHold",()=>{ye.toggleHold=!0});Rl("tPause",$s);function uy(i){const t=na;let e=(t.has("d")||t.has("arrowright")?1:0)-(t.has("a")||t.has("arrowleft")?1:0),n=(t.has("s")||t.has("arrowdown")?1:0)-(t.has("w")||t.has("arrowup")?1:0);fe.active&&(e+=fe.x,n+=fe.y),ye.mx=e,ye.my=n;const s=Math.hypot(e,n);if(s>.2&&(Ch=e/s,Rh=n/s),ye.hasAim=!1,ae.settings.aim==="mouse"&&ef&&Ko>=0){const r=Ie.screenToWorld(Ko,tf);r&&(ye.aimX=r.x,ye.aimY=r.y,ye.hasAim=!0)}else ae.settings.aim==="move"&&(ye.aimX=i.player.x+Ch*240,ye.aimY=i.player.y+Rh*240,ye.hasAim=!0)}function af(i){if(!wh){requestAnimationFrame(af);try{const t=Math.min(.25,Math.max(0,(i-Gs)/1e3));let e=Math.min(.05,t);Gs=i,gi.slow>0&&(e*=.4);const n=Te;if(n&&(de==="playing"||de==="ending")){Nr+=e;let s=0;for(;Nr>=Or&&s<5;){if(Nr-=Or,s++,ea?($u(n,ye),n.player.hp=n.player.maxHp,n.state==="levelup"&&nl(n,0)):de==="playing"?uy(n):ye.mx=ye.my=0,to(n,ye),ye.release=!1,ye.toggleHold=!1,n.events.length){gi.handle(n,ae.settings),Le.handle(n);for(const r of n.events)r.t==="bossWarn"?ne.announce("Warning: the Core Warden approaches."):r.t==="wave"&&(r.a??1)>1&&ne.announce(`Wave ${r.a}`);n.events.length=0}if(n.state!=="playing")break}n.state==="levelup"&&de==="playing"?(de="levelup",Le.setDuck(!0),ne.renderChoice(n),ne.open("levelup")):(n.state==="dead"||n.state==="won")&&de==="playing"&&(de="ending",Fr=n.state==="dead"?1.1:1.8),de==="ending"&&(n.state==="dead"&&to(n,ye),Fr-=e,Fr<=0&&cy())}gi.update(e),Ie.draw(Te,gi,ae.settings,i/1e3,fe.active?fe:null),fy(t)}catch(t){wh=!0,Hr.textContent="Something went wrong and the game stopped. Reload the page to continue.",Hr.classList.remove("hidden"),console.error(t)}}}function fy(i){Za++,wr+=i,wr>=1&&(Qu=Math.round(Za/wr),Za=0,wr=0),de==="playing"&&!ea&&ae.settings.quality==="auto"&&!Th&&Ie.kind==="3d"&&(As+=i,As>3&&As<9?(Ka++,i>1/45&&Ah++):As>=9&&Ka>30&&(Th=!0,Ah/Ka>.5&&ws!=="low"&&(ws=Ld(ws),Cl(),ne.announce(`Graphics lowered to ${Kh[ws]} to keep the game smooth.`))))}function dy(){if(Al(),Cl(),Ie.resize(),location.hash==="#demo"||location.hash==="#demo-late"){ea=!0,Te=Hh(20260,$h({w_homing:1,w_chain:1},"hollow"));const i=Te,t=location.hash==="#demo-late"?960:330;for(let e=0;e<60*t&&($u(i,ye),i.player.hp=i.player.maxHp,i.state==="levelup"&&nl(i,e%3),to(i,ye),i.events.length=0,!(i.state==="dead"||i.state==="won"));e++);Ie.resetRun(i),de="playing",ne.close()}else ne.open("menu");window.__vs={get world(){return Te},get app(){return de},get summary(){return ju},get fps(){return Qu},get renderer(){return Ie.kind},get quality(){return ta().level},get gfx(){return Ie}},requestAnimationFrame(i=>{Gs=i,af(i)})}dy();
