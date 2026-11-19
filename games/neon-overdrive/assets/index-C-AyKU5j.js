var Yh=Object.defineProperty;var $h=(i,t,e)=>t in i?Yh(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var L=(i,t,e)=>$h(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();class Kh{constructor(){L(this,"ctx",null);L(this,"master",null);L(this,"sfx",null);L(this,"musicGain",null);L(this,"noise",null);L(this,"engA",null);L(this,"engB",null);L(this,"engF",null);L(this,"engG",null);L(this,"windG",null);L(this,"windF",null);L(this,"timer",0);L(this,"nextStep",0);L(this,"step",0);L(this,"root",110);L(this,"musicOn",!0);L(this,"musicRunning",!1);L(this,"ducked",!1);L(this,"volume",.7);L(this,"muted",!1);L(this,"available",typeof window<"u"&&!!(window.AudioContext||window.webkitAudioContext))}ensure(){if(this.available)try{if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext,e=new t;this.ctx=e;const n=e.createDynamicsCompressor();n.threshold.value=-14,n.ratio.value=4,this.master=e.createGain(),this.sfx=e.createGain(),this.musicGain=e.createGain(),this.sfx.connect(this.master),this.musicGain.connect(this.master),this.master.connect(n).connect(e.destination);const s=e.sampleRate,r=e.createBuffer(1,s,e.sampleRate),o=r.getChannelData(0);for(let a=0;a<s;a++)o[a]=Math.random()*2-1;this.noise=r,this.applyGains(),this.buildEngine()}this.ctx.state==="suspended"&&this.ctx.resume()}catch{this.available=!1}}applyGains(){if(!this.ctx||!this.master||!this.musicGain||!this.sfx)return;const t=this.ctx.currentTime;this.master.gain.setTargetAtTime(this.muted?0:this.volume,t,.03),this.sfx.gain.value=1,this.musicGain.gain.setTargetAtTime(this.musicOn?this.ducked?.12:.38:0,t,.1)}setVolume(t){this.volume=Math.max(0,Math.min(1,t)),this.applyGains()}setMuted(t){this.muted=t,this.applyGains()}setMusic(t){this.musicOn=t,this.applyGains()}duck(t){this.ducked=t,this.applyGains()}suspend(){this.ctx&&this.ctx.state==="running"&&this.ctx.suspend()}resume(){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}buildEngine(){const t=this.ctx;if(!t||!this.sfx||!this.noise)return;this.engA=t.createOscillator(),this.engB=t.createOscillator(),this.engA.type="sawtooth",this.engB.type="square",this.engF=t.createBiquadFilter(),this.engF.type="lowpass",this.engF.frequency.value=500,this.engG=t.createGain(),this.engG.gain.value=0,this.engA.connect(this.engF),this.engB.connect(this.engF),this.engF.connect(this.engG).connect(this.sfx),this.engA.start(),this.engB.start();const e=t.createBufferSource();e.buffer=this.noise,e.loop=!0,this.windF=t.createBiquadFilter(),this.windF.type="bandpass",this.windF.frequency.value=800,this.windF.Q.value=.6,this.windG=t.createGain(),this.windG.gain.value=0,e.connect(this.windF).connect(this.windG).connect(this.sfx),e.start()}engine(t,e,n,s){if(!this.ctx||!this.engA||!this.engB||!this.engF||!this.engG||!this.windG||!this.windF)return;const r=this.ctx.currentTime,o=Math.max(0,Math.min(1.5,t)),a=(55+o*210)*(n?1.2:1);this.engA.frequency.setTargetAtTime(a,r,.05),this.engB.frequency.setTargetAtTime(a*1.5,r,.05),this.engF.frequency.setTargetAtTime(500+o*2200,r,.08);const l=s?.04+(e?.05:0)+o*.03:0;this.engG.gain.setTargetAtTime(l,r,.06),this.windG.gain.setTargetAtTime(s?o*o*.1:0,r,.1),this.windF.frequency.setTargetAtTime(500+o*1800,r,.1)}tone(t,e,n,s,r=0,o){const a=this.ctx;if(!a||!this.sfx)return;const l=a.currentTime+r,c=a.createOscillator(),h=a.createGain();c.type=n,c.frequency.setValueAtTime(t,l),o&&c.frequency.exponentialRampToValueAtTime(o,l+e),h.gain.setValueAtTime(s,l),h.gain.exponentialRampToValueAtTime(1e-4,l+e),c.connect(h).connect(this.sfx),c.start(l),c.stop(l+e+.02)}burst(t,e,n,s,r,o=1){const a=this.ctx;if(!a||!this.sfx||!this.noise)return;const l=a.currentTime,c=a.createBufferSource();c.buffer=this.noise;const h=a.createBiquadFilter();h.type=r,h.Q.value=o,h.frequency.setValueAtTime(n,l),h.frequency.exponentialRampToValueAtTime(s,l+t);const u=a.createGain();u.gain.setValueAtTime(e,l),u.gain.exponentialRampToValueAtTime(1e-4,l+t),c.connect(h).connect(u).connect(this.sfx),c.start(l,Math.random()*.5),c.stop(l+t+.02)}blip(t){this.tone(t==="move"?660:t==="ok"?990:330,.06,"square",.05)}countdown(t){this.tone(t===0?880:440,t===0?.5:.18,"square",.09)}boost(){this.burst(.6,.35,400,3200,"bandpass",1.2),this.tone(180,.4,"sawtooth",.05,0,520)}thud(t){this.tone(140,.25,"sine",.25+t*.3,0,40),this.burst(.18+t*.12,.2+t*.25,1800,160,"lowpass")}scrape(t){this.burst(.09,.05+t*.06,3200,5200,"highpass")}chime(){this.tone(880,.25,"sine",.12),this.tone(1320,.3,"sine",.1,.07)}lap(){this.tone(660,.2,"triangle",.14),this.tone(990,.2,"triangle",.14,.1),this.tone(1320,.4,"triangle",.14,.2)}gateOpen(){this.tone(523,.18,"triangle",.12),this.tone(659,.18,"triangle",.12,.07),this.tone(784,.3,"triangle",.12,.14)}gateSealed(){this.tone(90,.45,"sawtooth",.2,0,50),this.tone(97,.45,"square",.1,0,55)}finish(t){(t?[523,659,784,1046]:[392,349,330,294]).forEach((n,s)=>this.tone(n,.3,"triangle",.14,s*.12))}startMusic(t){this.root=t,!(!this.ctx||this.musicRunning)&&(this.musicRunning=!0,this.step=0,this.nextStep=this.ctx.currentTime+.08,this.timer=window.setInterval(()=>this.schedule(),40))}stopMusic(){window.clearInterval(this.timer),this.musicRunning=!1}schedule(){const t=this.ctx;if(!t||t.state!=="running")return;const e=60/118/4;for(;this.nextStep<t.currentTime+.15;)this.note(this.step,this.nextStep),this.nextStep+=e,this.step=(this.step+1)%64}note(t,e){const n=this.ctx;if(!n||!this.musicGain||!this.noise)return;const s=Math.floor(t/16)%4,r=[0,3,5,7][s],o=t%16,a=h=>this.root*Math.pow(2,h/12),l=(h,u,d,f,g)=>{const _=n.createOscillator(),m=n.createGain(),p=n.createBiquadFilter();p.type="lowpass",p.frequency.value=g,_.type=u,_.frequency.value=h,m.gain.setValueAtTime(f,e),m.gain.exponentialRampToValueAtTime(1e-4,e+d),_.connect(p).connect(m).connect(this.musicGain),_.start(e),_.stop(e+d+.02)};o%2===0&&l(a(r-12),"sawtooth",.22,.2,700);const c=[0,7,12,15,12,7,10,7];if((o%2===1||o%4===0)&&l(a(r+c[o%8]),"triangle",.16,.1,3e3),o%4===0){const h=n.createOscillator(),u=n.createGain();h.frequency.setValueAtTime(130,e),h.frequency.exponentialRampToValueAtTime(40,e+.12),u.gain.setValueAtTime(.4,e),u.gain.exponentialRampToValueAtTime(1e-4,e+.16),h.connect(u).connect(this.musicGain),h.start(e),h.stop(e+.2)}if(o%4===2){const h=n.createBufferSource();h.buffer=this.noise;const u=n.createBiquadFilter();u.type="highpass",u.frequency.value=7e3;const d=n.createGain();d.gain.setValueAtTime(.06,e),d.gain.exponentialRampToValueAtTime(1e-4,e+.05),h.connect(u).connect(d).connect(this.musicGain),h.start(e,Math.random()*.5),h.stop(e+.07)}}}const rt={SEG_LEN:200,ROAD_W:2e3,CAM_H:1e3,FOV:100,FOV_BOOST:16,DRAW:240,PLAYER_Z:840,MAX_SPEED:12e3,KMH:.02667,ACCEL:2180,COAST:1330,BRAKE:7500,REV_ACCEL:1500,REV_MAX:.25,OVER_DECEL:3e3,OFFROAD_CAP:.3,OFFROAD_DECEL:5500,BOOST_MULT:1.3,BOOST_ACCEL:2,BOOST_DRAIN:24,BOOST_MIN:2,STEER:2.1,CENT:.5,GRIP:7,DRIFT_GRIP:2.2,DRIFT_STEER:1.3,DRIFT_CENT:.6,DRIFT_SCRUB:480,DRIFT_MIN_SPEED:.35,DRIFT_HOLD_SPEED:.3,DRIFT_GAIN:22,CLEAN_GAIN:2.4,CLEAN_AFTER_HIT:2,WALL_PENALTY:6,BUMP_PENALTY:3,RESERVE_START:30,OFFROAD_X:1,WALL_X:1.34,WALL_SCRAPE_X:1.24,WALL_SPEED_KEEP:.62,WALL_COOLDOWN:.35,SCRAPE_DECEL:2400,SPINE_HALF:.22,SPINE_RAIL:.26,SPINE_OUTER:.3,SPINE_INNER_CLAMP:.2,SPINE_SPEED_MULT:1.14,SPINE_ADVANCE:1.35,SPINE_DRAIN:5,SPINE_CRASH_KEEP:.3,SPINE_CRASH_X:.42,SPINE_GATE_COOLDOWN:.5,LAPS:3,CHECKPOINTS:4,COUNTDOWN:3.2,MAX_DT:.05,CAR_DS:260,CAR_DX:.3,CAR_WORLD_W:420},In=[{id:"cruise",name:"CRUISE",blurb:"Forgiving grip, fast reserve, gentle rivals.",ai:.84,grip:1.15,regen:1.25,threshold:35},{id:"velocity",name:"VELOCITY",blurb:"The intended race. Rivals push hard.",ai:.93,grip:1,regen:1,threshold:40},{id:"redline",name:"REDLINE",blurb:"Slippery grip, slow reserve, rivals at full speed.",ai:1,grip:.88,regen:.8,threshold:45}],Zh=[{name:"ROOK",color:0,skill:1,lane:-.5,weaveAmp:.14,weaveHz:.31,start:{s:400,x:-.5},early:1.03,late:.98},{name:"SABLE",color:1,skill:.985,lane:.55,weaveAmp:.07,weaveHz:.23,start:{s:400,x:.5},early:1,late:1},{name:"CINDER",color:2,skill:.97,lane:-.15,weaveAmp:.1,weaveHz:.27,start:{s:0,x:-.5},early:.97,late:1.04}];function Jh(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const jh=(i,t,e)=>i+(t-i)*e*e,Fs=(i,t,e)=>i+(t-i)*(-Math.cos(e*Math.PI)/2+.5);function Qh(i){const t=[],e=()=>t.length?t[t.length-1].y2:0,n=(u,d)=>{const f=t.length;t.push({i:f,curve:u,y1:e(),y2:d,spine:!1,gate:0,cp:0,band:Math.floor(f/3)%2,sprites:[]})},s=(u,d,f,g,_)=>{const m=e(),p=m+_*rt.SEG_LEN,E=u+d+f;for(let M=0;M<u;M++)n(jh(0,g,M/u),Fs(m,p,M/E));for(let M=0;M<d;M++)n(g,Fs(m,p,(u+M)/E));for(let M=0;M<f;M++)n(Fs(g,0,M/f),Fs(m,p,(u+d+M)/E))};for(const u of i.sections)s(u[0],u[1],u[2],u[3],u[4]);s(30,30,30,0,-e()/rt.SEG_LEN),t[t.length-1].y2=0;const r=t.length,o=[],a=[];for(const u of i.spines){const d=Math.floor(u.at*r),f=Math.min(r-2,d+u.len);for(let g=d;g<f;g++)t[g].spine=!0;t[d].gate=1,t[f].gate=2,o.push(d),a.push(f)}[Math.floor(r/4),Math.floor(r/2),Math.floor(r*3/4),0].forEach((u,d)=>{t[u].cp=d+1});const c=Jh(i.seed);let h=6;for(;h<r-4;){for(const u of[-1,1]){if(c()<.2)continue;const d=c(),f=d<.45?"tower":d<.75?"sign":"pylon",g=f==="tower"?2.2+c()*4.2:f==="sign"?1.7+c()*1.4:1.35+c()*.3;t[h].sprites.push({kind:f,x:u*g,tex:Math.floor(c()*4)})}h+=4+Math.floor(c()*6)}return{def:i,segs:t,length:r*rt.SEG_LEN,spineStarts:o,spineEnds:a}}function pi(i,t){const e=i.segs.length,n=Math.floor(t/rt.SEG_LEN);return i.segs[(n%e+e)%e]}function tu(i,t){const e=pi(i,t),n=(t%rt.SEG_LEN+rt.SEG_LEN)%rt.SEG_LEN/rt.SEG_LEN;return e.y1+(e.y2-e.y1)*n}function eu(i,t){const e=i.length,n=(t%e+e)%e;let s=1/0;for(const r of i.spineStarts){let o=r*rt.SEG_LEN-n;o<0&&(o+=e),o<s&&(s=o)}return s}const rs=160;class nu{constructor(){L(this,"pool",Array.from({length:rs},()=>({on:!1,x:0,y:0,vx:0,vy:0,life:0,max:1,size:2,color:"#ffffff",kind:0})));L(this,"cursor",0)}take(){for(let e=0;e<rs;e++){const n=this.pool[(this.cursor+e)%rs];if(!n.on)return this.cursor=(this.cursor+e+1)%rs,n}const t=this.pool[this.cursor];return this.cursor=(this.cursor+1)%rs,t}sparks(t,e,n,s,r){for(let o=0;o<s;o++){const a=this.take();a.on=!0,a.x=t,a.y=e,a.vx=(n*(.4+Math.random()*1.2)+(Math.random()-.5)*.9)*r*.9,a.vy=(-.3-Math.random()*1)*r*.8,a.max=a.life=.25+Math.random()*.4,a.size=1.5+Math.random()*2.2,a.color=Math.random()<.5?"#ec979a":"#eeb6b6",a.kind=0}}smoke(t,e,n,s){const r=this.take();r.on=!0,r.x=t+(Math.random()-.5)*n*.1,r.y=e,r.vx=(Math.random()-.5)*n*.25,r.vy=-n*(.1+Math.random()*.15),r.max=r.life=.5+Math.random()*.4,r.size=n*(.03+Math.random()*.03),r.color=s,r.kind=1}streak(t,e,n,s){const r=this.take();r.on=!0,r.x=t,r.y=e,r.vx=(Math.random()-.5)*n*.3,r.vy=n*(.9+Math.random()*.8),r.max=r.life=.22+Math.random()*.15,r.size=n*.012,r.color=s,r.kind=2}update(t){for(const e of this.pool)if(e.on){if(e.life-=t,e.life<=0){e.on=!1;continue}e.x+=e.vx*t,e.y+=e.vy*t,e.kind===0&&(e.vy+=900*t)}}clear(){for(const t of this.pool)t.on=!1}draw(t){for(const e of this.pool){if(!e.on)continue;const n=e.life/e.max;t.globalAlpha=n,t.fillStyle=e.color,e.kind===0?t.fillRect(e.x,e.y,e.size,e.size):e.kind===1?(t.beginPath(),t.arc(e.x,e.y,e.size*(2-n),0,6.283),t.fill()):t.fillRect(e.x,e.y,e.size,e.size*14*n)}t.globalAlpha=1}}const Gc=Object.freeze({red:"#E30016",wine:"#72151D",bone:"#F1EDE7",ink:"#030303",white:"#FFFFFF"});function So(i){let t=String(i).replace("#","").trim();(t.length===3||t.length===4)&&(t=[...t].map(n=>n+n).join(""));const e=parseInt(t.slice(0,6),16);return[e>>16&255,e>>8&255,e&255]}function iu([i,t,e]){const n=s=>Math.max(0,Math.min(255,Math.round(s))).toString(16).padStart(2,"0");return`#${n(i)}${n(t)}${n(e)}`.toUpperCase()}function Dn(i,t,e){const n=So(i),s=So(t);return iu(n.map((r,o)=>r+(s[o]-r)*e))}function $e(i,t){const[e,n,s]=So(i);return`rgba(${e}, ${n}, ${s}, ${t})`}const{red:su,wine:ru,bone:ou,ink:au,white:lu}=Gc,cu=Object.freeze({night:["ink","wine",.16],dusk:["ink","wine",.42],mesa:["wine","ink",.38],ember:["wine","red",.5],rose:["red","bone",.45],blush:["red","bone",.78],tan:["bone","wine",.24],saddle:["bone","wine",.52],umber:["wine","ink",.62],smoke:["bone","ink",.55],ash:["bone","ink",.32]}),Ka={red:su,wine:ru,bone:ou,ink:au,white:lu},hu=Object.freeze(Object.fromEntries(Object.entries(cu).map(([i,[t,e,n]])=>[i,Dn(Ka[t],Ka[e],n)]))),O=Object.freeze({...Gc,...hu});Object.freeze({bg:O.night,bgDeep:O.ink,bgHorizon:O.dusk,surface:Dn(O.night,O.wine,.22),surfaceRaised:Dn(O.night,O.wine,.38),fg:O.bone,fgStrong:O.white,fgSecondary:O.ash,fgMuted:O.smoke,accent:O.red,accentDeep:O.wine,accentSoft:O.rose,line:O.ember,paper:O.bone,paperShade:O.tan,paperInk:Dn(O.ink,O.wine,.3),paperLine:O.saddle,player:O.bone,hostile:O.red,collectible:O.rose,world:O.tan,quiet:Dn(O.dusk,O.ash,.25)});Object.freeze({neutral:[O.ink,O.night,O.umber,O.smoke,O.tan,O.bone,O.white],red:[O.ink,O.wine,O.ember,O.red,O.rose,O.blush],moon:[O.ink,O.dusk,O.saddle,O.tan,O.bone,O.white],star:[O.ink,O.wine,O.red,O.rose,O.blush],earth:[O.ink,O.umber,O.mesa,O.saddle,O.tan,O.bone],wine:[O.ink,O.night,O.wine,O.ember,O.rose]});function Hc(i=1){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const Hn=Math.PI*2;function uu(i,t,e,n,s,{seed:r=7,density:o=.6,colors:a=[O.tan,O.ember],alpha:l=.08}={}){const c=Hc(r),h=Math.round(n*s*o/1e3);i.save();for(let u=0;u<h;u++){i.globalAlpha=l*(.4+c()*.6),i.fillStyle=a[c()*a.length|0];const d=c()<.9?1:2;i.fillRect(t+c()*n,e+c()*s,d,d)}i.restore()}function Vc(i,t,{angle:e=0,gap:n=4,color:s=O.ink,width:r=1,alpha:o=1,bounds:a}){const[l,c,h,u]=a;i.save(),i.beginPath(),t(i),i.clip(),i.globalAlpha=o,i.strokeStyle=s,i.lineWidth=r;const d=l+h/2,f=c+u/2,g=Math.hypot(h,u)/2+n;i.translate(d,f),i.rotate(e),i.beginPath();for(let _=-g;_<=g;_+=n)i.moveTo(-g,_),i.lineTo(g,_);i.stroke(),i.restore()}function du(i,t,e,n,{face:s=O.bone,ink:r=O.wine,rim:o=O.ember,phase:a=0,shadow:l=O.night,rings:c=3,hatch:h=!0,glow:u=.18}={}){i.save();const d=(1+Math.cos((a%1+1)%1*Hn))/2;if(u*=.15+.85*d,u>0){const g=i.createRadialGradient(t,e,n*.8,t,e,n*2.4);g.addColorStop(0,$e(s,u)),g.addColorStop(1,$e(s,0)),i.fillStyle=g,i.beginPath(),i.arc(t,e,n*2.4,0,Hn),i.fill()}i.fillStyle=s,i.beginPath(),i.arc(t,e,n,0,Hn),i.fill(),h&&Vc(i,g=>{g.arc(t,e,n,0,Hn)},{angle:-.5,gap:Math.max(2.2,n/9),color:r,width:Math.max(.6,n/60),alpha:.22,bounds:[t-n,e-n*.1,n*2,n*1.1]}),i.strokeStyle=o;for(let g=0;g<c;g++)i.globalAlpha=.55-g*.12,i.lineWidth=Math.max(.8,n/40),i.beginPath(),i.arc(t,e,n*(1-.1*(g+1)),0,Hn),i.stroke();i.globalAlpha=1,i.lineWidth=Math.max(1,n/26),i.beginPath(),i.arc(t,e,n,0,Hn),i.stroke();const f=(a%1+1)%1;if(f>.001&&f<.999){i.save(),i.beginPath(),i.arc(t,e,n+.5,0,Hn),i.clip(),i.fillStyle=l,i.globalAlpha=.9;const g=Math.cos(f*Hn),_=f<.5;i.beginPath(),i.arc(t,e,n+1,_?-Math.PI/2:Math.PI/2,_?Math.PI/2:3*Math.PI/2,!1),i.ellipse(t,e,Math.abs(g)*(n+1),n+1,0,_?Math.PI/2:3*Math.PI/2,_?-Math.PI/2:Math.PI/2,g>0),i.fill(),i.restore()}i.restore()}function Wc(i,t,e,n,{seed:s=3,height:r=60,fill:o=O.mesa,strata:a=O.ember,bottom:l,plateaus:c=3,strataAlpha:h=.35}={}){const u=Hc(s),d=e-t,f=[[t,n-r*(.15+u()*.15)]],g=d/c;for(let m=0;m<c;m++){const p=t+m*g+g*(.1+u()*.15),E=t+(m+1)*g-g*(.1+u()*.15),M=n-r*(.65+u()*.35),v=g*(.06+u()*.06);f.push([p,n-r*(.15+u()*.2)]),f.push([p+v,M]),f.push([E-v,M+(u()-.5)*3]),f.push([E,n-r*(.15+u()*.2)])}f.push([e,n-r*(.12+u()*.15)]);const _=m=>{m.moveTo(t,l??n+2);for(const[p,E]of f)m.lineTo(p,E);m.lineTo(e,l??n+2),m.closePath()};return i.fillStyle=o,i.beginPath(),_(i),i.fill(),Vc(i,_,{angle:0,gap:Math.max(3,r/9),color:a,width:1,alpha:h,bounds:[t,n-r,d,(l??n)-n+r+2]}),f}function Xc(i,t,e,n,s,{color:r=O.ember,stitch:o=O.tan,radius:a=10,inset:l=6,corner:c=6,stitchAlpha:h=.6}={}){const u=(g,_,m,p,E,M)=>{g.beginPath(),g.moveTo(_+M,m),g.arcTo(_+p,m,_+p,m+E,M),g.arcTo(_+p,m+E,_,m+E,M),g.arcTo(_,m+E,_,m,M),g.arcTo(_,m,_+p,m,M),g.closePath()};i.save(),i.strokeStyle=r,i.lineWidth=2,u(i,t+1,e+1,n-2,s-2,a),i.stroke(),i.lineWidth=1,u(i,t+l,e+l,n-l*2,s-l*2,Math.max(2,a-l/2)),i.stroke(),i.globalAlpha=h,i.strokeStyle=o,i.setLineDash([3,4]);const d=l/2+1;u(i,t+d,e+d,n-d*2,s-d*2,Math.max(2,a-d/2)),i.stroke(),i.setLineDash([]),i.globalAlpha=1,i.fillStyle=r;const f=c;for(const[g,_]of[[t+l*2.2,e+l*2.2],[t+n-l*2.2,e+l*2.2],[t+l*2.2,e+s-l*2.2],[t+n-l*2.2,e+s-l*2.2]])i.beginPath(),i.moveTo(g,_-f),i.lineTo(g+f,_),i.lineTo(g,_+f),i.lineTo(g-f,_),i.closePath(),i.fill();i.restore()}function qc(i,t,e,n,{fill:s=O.ink,slit:r=O.red,telescopeAngle:o=-.9}={}){i.save(),i.fillStyle=s;const a=n*1.6,l=n*.8;i.fillRect(t-a/2,e-l,a,l),i.beginPath(),i.arc(t,e-l,a*.42,Math.PI,0),i.closePath(),i.fill(),i.save(),i.translate(t,e-l-a*.18),i.rotate(o),i.fillRect(0,-n*.07,n*.75,n*.14),i.restore(),i.strokeStyle=r,i.lineWidth=Math.max(1,n*.06),i.beginPath(),i.moveTo(t,e-l-a*.4),i.lineTo(t,e-l-1),i.stroke(),i.fillStyle=r,i.globalAlpha=.85,i.fillRect(t-n*.1,e-n*.36,n*.2,n*.36),i.restore()}const Yc='"Rye", "Zilla Slab", Georgia, serif',ws='"Zilla Slab", Georgia, serif';function Ls(i,t){const e=document.createElement("canvas");e.width=i,e.height=t;const n=e.getContext("2d");if(!n)throw new Error("2d context unavailable");return[e,n]}function Is(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const Za=["MOTEL","DINER","DEPOT","OASIS","ASSAY","SALOON","STAR","COMET","ORBIT","MESA","FUEL","INN"];function fu(i,t,e,n,s){const r=Is(t),[o,a]=Ls(e,n),l=i.tints[Math.floor(r()*i.tints.length)],c=a.createLinearGradient(0,0,e,0);c.addColorStop(0,l),c.addColorStop(.5,O.mesa),c.addColorStop(1,l),a.fillStyle=c,a.globalAlpha=.75,a.fillRect(0,0,e,n),a.globalAlpha=1,a.fillStyle=O.umber,a.globalAlpha=.35;for(let f=4;f<n;f+=7)a.fillRect(0,f,e,1);a.globalAlpha=1;const h=Math.floor(e/14),u=Math.floor(n/18);for(let f=1;f<u;f++)for(let g=0;g<h;g++)if(r()<.45){const _=i.signs[Math.floor(r()*i.signs.length)];a.globalAlpha=.35+r()*.6,a.fillStyle=r()<.7?O.blush:_,a.fillRect(6+g*14,6+f*18,8,9)}a.globalAlpha=1;const d=i.signs[Math.floor(r()*2)];return a.fillStyle=d,a.fillRect(0,0,3,n),a.fillRect(e-3,0,3,n),a.fillRect(0,0,e,s?6:3),o}function pu(i,t,e){const n=Is(t),[s,r]=Ls(220,320),o=i.signs[Math.floor(n()*i.signs.length)];return r.fillStyle=O.mesa,r.fillRect(104,120,12,200),r.fillStyle=O.umber,r.fillRect(6,6,208,118),Xc(r,6,6,208,118,{color:o,stitch:O.tan,radius:8,inset:7,corner:5}),e&&(r.lineWidth=6,r.strokeStyle=o,r.strokeRect(10,10,200,110)),r.fillStyle=o,r.font=`38px ${Yc}`,r.textAlign="center",r.textBaseline="middle",r.fillText(Za[Math.floor(n()*Za.length)],110,60),r.fillStyle=O.tan,r.font=`600 15px ${ws}`,r.fillText("OPEN ALL NIGHT",110,96),s}function mu(i,t){const e=Is(t),[n,s]=Ls(48,320),r=i.signs[Math.floor(e()*i.signs.length)];return s.fillStyle=O.umber,s.fillRect(20,20,8,300),s.fillStyle=r,s.fillRect(12,4,24,26),s.fillRect(22,40,4,260),n}function Ja(i,t,e,n,s){const r=Is(t),[o,a]=Ls(e,n);if(!s)return a.globalAlpha=.8,Wc(a,0,e,n,{seed:t*3+1,height:n*.7,fill:i.skyline,strata:O.ember,plateaus:5,strataAlpha:.25}),a.fillStyle=i.skyline,a.fillRect(0,n*.75,e,n*.25),a.globalAlpha=1,o;let l=Math.floor(e*.45),c=0;for(;c<e;){const h=28+Math.floor(r()*70),u=30+Math.floor(r()*80);a.fillStyle=i.skyline,a.globalAlpha=s?1:.7,a.fillRect(c,n-u,h,u),a.globalAlpha=s?.9:.5;for(let d=n-u+8;d<n-6;d+=11)for(let f=c+5;f<c+h-6;f+=9)r()<(s?.3:.2)&&(a.fillStyle=r()<.6?O.blush:i.signs[Math.floor(r()*i.signs.length)],a.fillRect(f,d,3,4));a.globalAlpha=1,s&&(a.fillStyle=i.signs[Math.floor(r()*i.signs.length)],a.globalAlpha=.85,a.fillRect(c,n-u,h,2)),c<=l&&l<c+h+6&&(a.globalAlpha=1,qc(a,c+h/2,n-u,40,{fill:i.skyline,slit:O.rose}),l=-1),a.globalAlpha=1,c+=h+Math.floor(r()*6)}return o}function gu(i,t,e){const n=Is(t*7+1),s=[[128,360],[160,520],[110,440],[180,300]],r=Array.from({length:90},()=>({x:n(),y:n()*.9,r:.5+n()*1.3,p:n()*6.28}));return{towers:s.map(([o,a],l)=>fu(i,t*31+l,o,a,e)),towerW:[1500,1800,1300,2e3],signs:[0,1,2,3].map(o=>pu(i,t*17+o,e)),pylons:[0,1,2,3].map(o=>mu(i,t*13+o)),far:Ja(i,t*5+1,2048,260,!1),near:Ja(i,t*5+2,2048,300,!0),stars:r}}const _u=[{body:O.bone,body2:O.tan,accent:O.white,glow:O.bone},{body:O.red,body2:O.ember,accent:O.rose,glow:O.red},{body:O.wine,body2:O.umber,accent:O.ember,glow:O.ember},{body:O.saddle,body2:O.mesa,accent:O.red,glow:O.red}];function vu(i){const[t,e]=Ls(256,130),n=e.createRadialGradient(128,112,4,128,112,120);n.addColorStop(0,i.glow+"aa"),n.addColorStop(1,i.glow+"00"),e.fillStyle=n,e.fillRect(0,70,256,60),e.fillStyle=O.ink,e.fillRect(24,74,40,46),e.fillRect(192,74,40,46),e.fillStyle=O.umber,e.fillRect(28,78,6,38),e.fillRect(222,78,6,38);const s=e.createLinearGradient(0,56,0,108);s.addColorStop(0,i.body),s.addColorStop(1,i.body2),e.fillStyle=s,e.beginPath(),e.moveTo(18,104),e.lineTo(238,104),e.lineTo(232,72),e.lineTo(204,56),e.lineTo(52,56),e.lineTo(24,72),e.closePath(),e.fill();const r=e.createLinearGradient(0,22,0,58);r.addColorStop(0,O.mesa),r.addColorStop(1,O.ink),e.fillStyle=r,e.beginPath(),e.moveTo(70,58),e.lineTo(186,58),e.lineTo(166,24),e.lineTo(90,24),e.closePath(),e.fill(),e.fillStyle="rgba(255,255,255,0.18)",e.beginPath(),e.moveTo(96,28),e.lineTo(130,28),e.lineTo(112,54),e.lineTo(84,54),e.closePath(),e.fill(),e.fillStyle=i.body2,e.fillRect(52,36,8,24),e.fillRect(196,36,8,24),e.fillStyle=i.body,e.fillRect(34,28,188,10),e.fillStyle=i.accent,e.fillRect(34,28,188,2),e.shadowColor=O.red,e.shadowBlur=8,e.fillStyle=O.red,e.fillRect(40,70,176,9),e.fillStyle=O.blush,e.fillRect(60,72,136,3),e.shadowBlur=0,e.fillStyle="#060304",e.fillRect(62,90,132,20),e.fillStyle=i.body2;for(let o=0;o<6;o++)e.fillRect(70+o*21,92,4,16);return e.fillStyle="#f7f4f0",e.beginPath(),e.arc(96,100,6,0,7),e.arc(160,100,6,0,7),e.fill(),e.fillStyle="#060304",e.beginPath(),e.arc(96,100,3.5,0,7),e.arc(160,100,3.5,0,7),e.fill(),t}const yi=(i,t)=>(i%t+t)%t,ja=6;class xu{constructor(t){L(this,"kind","2d");L(this,"g");L(this,"fx",new nu);L(this,"art",null);L(this,"artKey","");L(this,"cars",_u.map(vu));L(this,"skyFar",0);L(this,"skyNear",0);L(this,"lines",Array.from({length:44},(t,e)=>({ang:e/44*Math.PI*2+Math.sin(e*12.9)*.2,ph:e*.618%1,len:.12+e*7%5*.04})));L(this,"carX",0);L(this,"carY",0);L(this,"carW",0);L(this,"px1",[]);L(this,"py1",[]);L(this,"pw1",[]);L(this,"ps1",[]);L(this,"px2",[]);L(this,"py2",[]);L(this,"pw2",[]);L(this,"ps2",[]);L(this,"clip",[]);L(this,"vis",[]);L(this,"ok",[]);this.canvas=t;const e=t.getContext("2d",{alpha:!1});if(!e)throw new Error("Canvas 2D unavailable");this.g=e;for(const n of[this.px1,this.py1,this.pw1,this.ps1,this.px2,this.py2,this.pw2,this.ps2,this.clip])n.length=rt.DRAW+2}resize(t){const e=Math.min(window.devicePixelRatio||1,2);let n=window.innerWidth*e,s=window.innerHeight*e;const r=Math.sqrt(1920*1080/(n*s)),o=Math.min(1,r)*t;n=Math.max(320,Math.floor(n*o)),s=Math.max(240,Math.floor(s*o)),(this.canvas.width!==n||this.canvas.height!==s)&&(this.canvas.width=n,this.canvas.height=s)}clearFx(){this.fx.clear()}dispose(){this.art=null}getArt(t){const e=`${t.trackIdx}:${t.highContrast?1:0}`;return(!this.art||this.artKey!==e)&&(this.art=gu(t.track.def.palette,t.track.def.seed,t.highContrast),this.artKey=e),this.art}quad(t,e,n,s,r,o,a,l,c){const h=this.g;h.fillStyle=c,h.beginPath(),h.moveTo(t,e),h.lineTo(n,s),h.lineTo(r,o),h.lineTo(a,l),h.closePath(),h.fill()}wall(t,e,n,s,r){const o=this.px1[t]+e*this.pw1[t],a=this.px2[t]+e*this.pw2[t],l=this.py1[t],c=this.py2[t],h=this.ps1[t]*n*(this.canvas.height/2),u=this.ps2[t]*n*(this.canvas.height/2);this.quad(o,l,a,c,a,c-u,o,l-h,s),this.quad(o,l-h*.86,a,c-u*.86,a,c-u,o,l-h,r)}render(t){const e=this.g,n=this.canvas.width,s=this.canvas.height,r=t.track.def.palette,o=this.getArt(t),a=t.highContrast,l=t.track.segs,c=l.length,h=rt.SEG_LEN,u=rt.FOV+rt.FOV_BOOST*t.boostAmt,d=1/Math.tan(u*Math.PI/360),f=rt.CAM_H+tu(t.track,t.s),g=t.s-rt.PLAYER_Z,_=Math.floor(g/h),m=(g-_*h)/h,p=l[yi(_,c)],E=l[yi(Math.floor(t.s/h),c)];this.skyFar+=E.curve*t.speedPct*t.dt*140,this.skyNear+=E.curve*t.speedPct*t.dt*260,this.fx.update(t.dt),e.save(),e.translate(t.shakeX,t.shakeY);const M=e.createLinearGradient(0,0,0,s/2);if(M.addColorStop(0,r.skyTop),M.addColorStop(.55,r.skyMid),M.addColorStop(1,r.skyBottom),e.fillStyle=M,e.fillRect(-40,-40,n+80,s/2+40),!a){for(const R of o.stars)e.globalAlpha=.2+.2*Math.sin(t.time*1.5+R.p),e.fillStyle=O.bone,e.fillRect(R.x*n,R.y*s*.42,R.r,R.r);e.globalAlpha=1}const v=s*.09,F=yi(n*.62-this.skyFar*.12*(n/1280),n+v*4)-v*2,C=s*.2;du(e,F,C,v,{face:r.sun2,ink:O.wine,rim:O.ember,phase:.88,shadow:r.skyTop,rings:a?0:3,hatch:!a,glow:a?0:.14});const A=(R,Y,st)=>{const K=s*st/R.height,pt=R.width*K;let Mt=-yi(Y*K,pt);for(;Mt<n;Mt+=pt)e.drawImage(R,Mt,s/2-R.height*K+1,pt+1,R.height*K)};A(o.far,this.skyFar*.5,.2),A(o.near,this.skyNear,.26),e.fillStyle=r.ground0,e.fillRect(-40,s/2,n+80,s/2+40);const I=e.createLinearGradient(0,s/2-s*.09,0,s/2+2);I.addColorStop(0,r.fog+"00"),I.addColorStop(1,r.fog+(a?"66":"cc")),e.fillStyle=I,e.fillRect(-40,s/2-s*.09,n+80,s*.09+2);const S=t.gateOpen?r.accentA:O.red;let x=0,P=-(p.curve*m),U=s;const D=n/2,k=s/2;for(let R=0;R<rt.DRAW;R++){const Y=_+R,st=l[yi(Y,c)],K=Y*h-g,pt=K+h,Mt=t.x*rt.ROAD_W-x,Ut=t.x*rt.ROAD_W-x-P;if(this.ok[R]=K>20,this.ok[R]){const j=d/K,ot=d/pt;this.ps1[R]=j,this.ps2[R]=ot,this.px1[R]=D+j*-Mt*D,this.px2[R]=D+ot*-Ut*D,this.py1[R]=k-j*(st.y1-f)*k,this.py2[R]=k-ot*(st.y2-f)*k,this.pw1[R]=j*rt.ROAD_W*D,this.pw2[R]=ot*rt.ROAD_W*D}if(x+=P,P+=st.curve,this.clip[R]=U,this.vis[R]=!1,!this.ok[R]||this.py2[R]>=this.py1[R]||this.py2[R]>=U)continue;this.vis[R]=!0;const It=this.px1[R],X=this.py1[R],Q=this.pw1[R],T=this.px2[R],dt=this.py2[R],tt=this.pw2[R],_t=st.band===0;e.fillStyle=_t?r.ground0:r.ground1,e.fillRect(-40,dt,n+80,X-dt+1);const at=Q/7,yt=tt/7,gt=a?_t?O.white:O.rose:_t?r.rumble0:r.rumble1;this.quad(It-Q-at,X,T-tt-yt,dt,T-tt,dt,It-Q,X,gt),this.quad(It+Q+at,X,T+tt+yt,dt,T+tt,dt,It+Q,X,gt),this.quad(It-Q,X,T-tt,dt,T+tt,dt,It+Q,X,a?_t?O.ink:O.night:_t?r.road0:r.road1);const w=Q*.025,y=tt*.025;if(this.quad(It-Q+w,X,T-tt+y,dt,T-tt,dt,It-Q,X,r.edge),this.quad(It+Q-w,X,T+tt-y,dt,T+tt,dt,It+Q,X,r.edge),_t){const j=Q/(a?22:36),ot=tt/(a?22:36);for(let nt=1;nt<4;nt++){if(nt===2&&st.spine)continue;const Ct=-1+nt*2/4;this.quad(It+Ct*Q-j,X,T+Ct*tt-ot,dt,T+Ct*tt+ot,dt,It+Ct*Q+j,X,r.lane)}}if(st.spine){const j=rt.SPINE_HALF,ot=.5+.5*Math.sin(t.time*6-R*.35);e.globalAlpha=t.gateOpen?.2+.18*ot:.25,this.quad(It-j*Q,X,T-j*tt,dt,T+j*tt,dt,It+j*Q,X,S),e.globalAlpha=1;const nt=Q*.02,Ct=tt*.02;if(this.quad(It-j*Q-nt,X,T-j*tt-Ct,dt,T-j*tt+Ct,dt,It-j*Q+nt,X,S),this.quad(It+j*Q-nt,X,T+j*tt-Ct,dt,T+j*tt+Ct,dt,It+j*Q+nt,X,S),st.band===0&&t.gateOpen){const Et=Q*.16,Pt=tt*.16;e.globalAlpha=.55,this.quad(It-Et,X,T-Pt,dt,T,dt-(X-dt)*.2,It,X-(X-dt)*.2,S),this.quad(It+Et,X,T+Pt,dt,T,dt-(X-dt)*.2,It,X-(X-dt)*.2,S),e.globalAlpha=1}}const $=1-Math.exp(-Math.pow(R/rt.DRAW,2)*ja);$>.01&&(e.globalAlpha=a?$*.4:$,e.fillStyle=r.fog,e.fillRect(-40,dt,n+80,X-dt+1),e.globalAlpha=1),U=X}const q=t.rivals.map(R=>Math.floor(R.s/h)-_);for(let R=rt.DRAW-1;R>0;R--){if(!this.ok[R])continue;const Y=_+R,st=l[yi(Y,c)],K=1-(1-Math.exp(-Math.pow(R/rt.DRAW,2)*ja))*(a?.4:.92);if(this.vis[R]){const X=st.band===0?O.umber:O.mesa;if(this.wall(R,rt.WALL_X,320,X,a?O.white:r.accentB),this.wall(R,-1.34,320,X,a?O.white:r.accentB),st.spine){const Q=t.gateOpen?r.accentA:O.red;e.globalAlpha=K,this.wall(R,rt.SPINE_RAIL,150,O.night,Q),this.wall(R,-.26,150,O.night,Q),e.globalAlpha=1}}const pt=this.px1[R],Mt=this.py1[R],Ut=this.ps1[R],It=this.clip[R];for(const X of st.sprites){let Q,T;X.kind==="tower"?(Q=o.towers[X.tex],T=o.towerW[X.tex]):X.kind==="sign"?(Q=o.signs[X.tex],T=1100):(Q=o.pylons[X.tex],T=150);const dt=T*Ut*D;if(dt<2)continue;const tt=dt*Q.height/Q.width,_t=pt+Ut*X.x*rt.ROAD_W*D-dt/2,at=Mt-tt,yt=Math.max(0,at+tt-It);yt>=tt||(e.globalAlpha=K,e.drawImage(Q,0,0,Q.width,Q.height*(1-yt/tt),_t,at,dt,tt-yt))}e.globalAlpha=1,st.cp>0&&this.vis[R]&&this.drawArch(R,st.cp,r.accentA,r.accentB,K,t.time),st.gate===1&&this.vis[R]?this.drawGate(R,t,K):st.gate===2&&this.vis[R]&&this.drawExit(R,r.accentB,K);for(let X=0;X<t.rivals.length;X++){if(q[X]!==R)continue;const Q=t.rivals[X],T=(Q.s-Y*h)/h,dt=this.ps1[R]+(this.ps2[R]-this.ps1[R])*T,tt=this.px1[R]+(this.px2[R]-this.px1[R])*T+dt*Q.x*rt.ROAD_W*D,_t=this.py1[R]+(this.py2[R]-this.py1[R])*T,at=rt.CAR_WORLD_W*dt*D;if(at<2)continue;const yt=this.cars[1+Q.color%3],gt=at*yt.height/yt.width,w=Math.max(0,_t-It);e.globalAlpha=K,e.fillStyle="rgba(3, 3, 3,0.45)",e.beginPath(),e.ellipse(tt,_t,at*.5,at*.06,0,0,7),e.fill(),w<gt&&e.drawImage(yt,0,0,yt.width,yt.height*(1-w/gt),tt-at/2,_t-gt,at,gt-w),e.globalAlpha=1}}const B=Math.min(n*.23,s*.46),W=this.cars[0],z=B*W.height/W.width,it=Math.sin(t.time*38)*(.5+t.speedPct*1.6)*(s/720),ht=D+t.steer*n*.012,ut=s*.945+it,mt=Math.max(-.22,Math.min(.22,t.steer*.04+t.vx*.03+(t.drifting?t.vx*.07:0)));if(this.carX=ht,this.carY=ut,this.carW=B,e.save(),e.translate(ht,ut),e.rotate(mt),e.fillStyle="rgba(3, 3, 3,0.5)",e.beginPath(),e.ellipse(0,-2,B*.52,B*.05,0,0,7),e.fill(),e.drawImage(W,-B/2,-z,B,z),t.boosting){e.globalCompositeOperation="lighter";for(const R of[-.125,.125]){const Y=R*B,st=-z*.23,K=B*(.28+.06*Math.sin(t.time*90)),pt=e.createRadialGradient(Y,st,0,Y,st,K);pt.addColorStop(0,$e(O.bone,.9)),pt.addColorStop(.35,$e(O.rose,.7)),pt.addColorStop(1,$e(O.red,0)),e.fillStyle=pt,e.fillRect(Y-K,st-K,K*2,K*2)}e.globalCompositeOperation="source-over"}e.restore(),t.drifting&&t.speedPct>.3&&Math.random()<t.dt*60*.7&&(this.fx.smoke(ht-B*.32,ut-z*.08,B,$e(O.tan,.5)),this.fx.smoke(ht+B*.32,ut-z*.08,B,$e(O.tan,.5))),t.boosting&&Math.random()<t.dt*60*.9&&this.fx.streak(ht+(Math.random()<.5?-1:1)*B*.125,ut-z*.25,B,Math.random()<.5?O.bone:O.rose),this.fx.draw(e);const St=t.speedLines?Math.max(0,t.speedPct-.45)*1.8+t.boostAmt*.6:0;if(St>.02){const R=Math.min(1,St)*(t.reducedMotion?.4:1),Y=Math.hypot(n,s)*.55;e.lineWidth=Math.max(1,s/360),e.strokeStyle=t.boostAmt>.2?O.blush:O.bone;const st=s*.5;for(const K of this.lines){K.ph=(K.ph+t.dt*(.5+t.speedPct*1.7+t.boostAmt*1.4))%1;const pt=Y*(.18+K.ph*.82),Mt=pt+Y*K.len*(.3+K.ph)*(.6+t.boostAmt);e.globalAlpha=R*K.ph*.7,e.beginPath(),e.moveTo(D+Math.cos(K.ang)*pt,st+Math.sin(K.ang)*pt*.7),e.lineTo(D+Math.cos(K.ang)*Mt,st+Math.sin(K.ang)*Mt*.7),e.stroke()}e.globalAlpha=1}if(t.boostAmt>.02&&!a){const R=e.createRadialGradient(D,k,s*.3,D,k,s*1);R.addColorStop(0,$e(O.rose,0)),R.addColorStop(1,$e(O.ember,(t.reducedFlash?.14:.3)*t.boostAmt)),e.fillStyle=R,e.fillRect(-40,-40,n+80,s+80)}t.flash>.01&&!t.reducedFlash&&(e.globalAlpha=Math.min(1,t.flash)*.18,e.fillStyle=O.bone,e.fillRect(-40,-40,n+80,s+80),e.globalAlpha=1),e.restore()}sparks(t,e){this.fx.sparks(this.carX+t*this.carW*.5,this.carY-this.carW*.1,t,e,this.carW)}drawArch(t,e,n,s,r,o){const a=this.g,l=this.canvas.height,c=this.px1[t],h=this.py1[t],u=this.pw1[t],d=this.ps1[t]*900*(l/2),f=this.ps1[t]*130*(l/2);a.globalAlpha=r;const g=e===4?O.bone:n,_=Math.max(2,u*.05);if(a.fillStyle=g,a.fillRect(c-u*1.08-_,h-d,_*2,d),a.fillRect(c+u*1.08-_,h-d,_*2,d),e===4){const p=u*2.2/24;for(let E=0;E<24;E++)for(let M=0;M<2;M++)a.fillStyle=(E+M)%2===0?O.bone:O.ink,a.fillRect(c-u*1.1+E*p,h-d-f+M*f/2,p+.5,f/2+.5)}else a.fillStyle=s,a.fillRect(c-u*1.1,h-d-f,u*2.2,f),a.fillStyle=n,a.fillRect(c-u*1.1,h-d-f,u*2.2,Math.max(1,f*.12)),u>70&&(a.fillStyle=O.bone,a.font=`700 ${Math.max(10,Math.floor(f*.7))}px ${ws}`,a.textAlign="center",a.textBaseline="middle",a.fillText(`CHECKPOINT ${e}`,c,h-d-f/2+Math.sin(o*3)*.5));a.globalAlpha=1}drawGate(t,e,n){const s=this.g,r=this.canvas.height,o=this.px1[t],a=this.py1[t],l=this.pw1[t],c=this.ps1[t]*620*(r/2),h=e.gateOpen,u=h?O.rose:O.red,d=h||e.reducedFlash?1:.7+.3*Math.sin(e.time*50);s.globalAlpha=n*d;const f=rt.SPINE_RAIL*l,g=Math.max(2,l*.035);if(h){const m=s.createLinearGradient(0,a-c,0,a);m.addColorStop(0,$e(O.rose,0)),m.addColorStop(1,$e(O.rose,.28)),s.fillStyle=m,s.fillRect(o-f,a-c,f*2,c)}else{s.fillStyle=$e(O.red,.5),s.fillRect(o-f,a-c,f*2,c),s.save(),s.beginPath(),s.rect(o-f,a-c,f*2,c),s.clip(),s.fillStyle=$e(O.ink,.8);const m=Math.max(8,c/6);for(let p=-c;p<f*2+c;p+=m*2)s.beginPath(),s.moveTo(o-f+p,a),s.lineTo(o-f+p+m,a),s.lineTo(o-f+p+m+c,a-c),s.lineTo(o-f+p+c,a-c),s.closePath(),s.fill();s.restore()}s.fillStyle=u,s.fillRect(o-f-g,a-c,g*2,c),s.fillRect(o+f-g,a-c,g*2,c);const _=Math.max(3,c*.16);s.fillRect(o-f-g,a-c-_*.4,f*2+g*2,_),s.lineWidth=g*1.4,s.strokeStyle=u,s.beginPath(),s.ellipse(o,a-c-_*.4,f+g,c*.32,0,Math.PI,0),s.stroke(),f>26&&(s.fillStyle=O.ink,s.font=`700 ${Math.max(9,Math.floor(_*.7))}px ${ws}`,s.textAlign="center",s.textBaseline="middle",s.fillText(h?"SPINE OPEN":e.gateText,o,a-c+_*.1)),s.globalAlpha=1}drawExit(t,e,n){const s=this.g,r=this.canvas.height,o=this.px1[t],a=this.py1[t],l=this.pw1[t],c=this.ps1[t]*420*(r/2),h=rt.SPINE_RAIL*l,u=Math.max(2,l*.025);s.globalAlpha=n,s.fillStyle=e,s.fillRect(o-h-u,a-c,u*2,c),s.fillRect(o+h-u,a-c,u*2,c),s.fillRect(o-h-u,a-c,h*2+u*2,Math.max(2,c*.08)),s.globalAlpha=1}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const va="170",Mu=0,Qa=1,yu=2,xa=1,$c=2,Pn=3,Jn=0,Ie=1,sn=2,Fn=0,fi=1,_n=2,tl=3,el=4,Su=5,ci=100,bu=101,Eu=102,wu=103,Tu=104,Au=200,Ru=201,Cu=202,Pu=203,bo=204,Eo=205,Lu=206,Iu=207,Du=208,Nu=209,Uu=210,Fu=211,Ou=212,Bu=213,ku=214,wo=0,To=1,Ao=2,Xi=3,Ro=4,Co=5,Po=6,Lo=7,Kc=0,zu=1,Gu=2,Zn=0,Zc=1,Jc=2,jc=3,Ma=4,Hu=5,Qc=6,th=7,eh=300,qi=301,Yi=302,Io=303,Do=304,Cr=306,mi=1e3,ui=1001,No=1002,ke=1003,Vu=1004,Os=1005,vn=1006,Fr=1007,di=1008,kn=1009,nh=1010,ih=1011,Ts=1012,ya=1013,gi=1014,xn=1015,Mn=1016,Sa=1017,ba=1018,$i=1020,sh=35902,rh=1021,oh=1022,fn=1023,ah=1024,lh=1025,Vi=1026,Ki=1027,Ea=1028,wa=1029,ch=1030,Ta=1031,Aa=1033,_r=33776,vr=33777,xr=33778,Mr=33779,Uo=35840,Fo=35841,Oo=35842,Bo=35843,ko=36196,zo=37492,Go=37496,Ho=37808,Vo=37809,Wo=37810,Xo=37811,qo=37812,Yo=37813,$o=37814,Ko=37815,Zo=37816,Jo=37817,jo=37818,Qo=37819,ta=37820,ea=37821,yr=36492,na=36494,ia=36495,hh=36283,sa=36284,ra=36285,oa=36286,Wu=3200,Xu=3201,uh=0,qu=1,Ln="",Ve="srgb",Qi="srgb-linear",Pr="linear",re="srgb",Si=7680,nl=519,Yu=512,$u=513,Ku=514,dh=515,Zu=516,Ju=517,ju=518,Qu=519,aa=35044,la=35048,il="300 es",Nn=2e3,br=2001;class ts{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Ce=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Or=Math.PI/180,Er=180/Math.PI;function On(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ce[i&255]+Ce[i>>8&255]+Ce[i>>16&255]+Ce[i>>24&255]+"-"+Ce[t&255]+Ce[t>>8&255]+"-"+Ce[t>>16&15|64]+Ce[t>>24&255]+"-"+Ce[e&63|128]+Ce[e>>8&255]+"-"+Ce[e>>16&255]+Ce[e>>24&255]+Ce[n&255]+Ce[n>>8&255]+Ce[n>>16&255]+Ce[n>>24&255]).toLowerCase()}function Ae(i,t,e){return Math.max(t,Math.min(e,i))}function td(i,t){return(i%t+t)%t}function Br(i,t,e){return(1-e)*i+e*t}function gn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ae(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class ct{constructor(t=0,e=0){ct.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ae(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qt{constructor(t,e,n,s,r,o,a,l,c){qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],E=s[1],M=s[4],v=s[7],F=s[2],C=s[5],A=s[8];return r[0]=o*_+a*E+l*F,r[3]=o*m+a*M+l*C,r[6]=o*p+a*v+l*A,r[1]=c*_+h*E+u*F,r[4]=c*m+h*M+u*C,r[7]=c*p+h*v+u*A,r[2]=d*_+f*E+g*F,r[5]=d*m+f*M+g*C,r[8]=d*p+f*v+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*c-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=d*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(kr.makeScale(t,e)),this}rotate(t){return this.premultiply(kr.makeRotation(-t)),this}translate(t,e){return this.premultiply(kr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const kr=new qt;function fh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function wr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ed(){const i=wr("canvas");return i.style.display="block",i}const sl={};function vs(i){i in sl||(sl[i]=!0,console.warn(i))}function nd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function id(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function sd(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Qt={enabled:!0,workingColorSpace:Qi,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===re&&(i.r=Bn(i.r),i.g=Bn(i.g),i.b=Bn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===re&&(i.r=Wi(i.r),i.g=Wi(i.g),i.b=Wi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ln?Pr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Wi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const rl=[.64,.33,.3,.6,.15,.06],ol=[.2126,.7152,.0722],al=[.3127,.329],ll=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cl=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Qt.define({[Qi]:{primaries:rl,whitePoint:al,transfer:Pr,toXYZ:ll,fromXYZ:cl,luminanceCoefficients:ol,workingColorSpaceConfig:{unpackColorSpace:Ve},outputColorSpaceConfig:{drawingBufferColorSpace:Ve}},[Ve]:{primaries:rl,whitePoint:al,transfer:re,toXYZ:ll,fromXYZ:cl,luminanceCoefficients:ol,outputColorSpaceConfig:{drawingBufferColorSpace:Ve}}});let bi;class rd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{bi===void 0&&(bi=wr("canvas")),bi.width=t.width,bi.height=t.height;const n=bi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=bi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=wr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Bn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Bn(e[n]/255)*255):e[n]=Bn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let od=0;class ph{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=On(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(zr(s[o].image)):r.push(zr(s[o]))}else r=zr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function zr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?rd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ad=0;class De extends ts{constructor(t=De.DEFAULT_IMAGE,e=De.DEFAULT_MAPPING,n=ui,s=ui,r=vn,o=di,a=fn,l=kn,c=De.DEFAULT_ANISOTROPY,h=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=On(),this.name="",this.source=new ph(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==eh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case mi:t.x=t.x-Math.floor(t.x);break;case ui:t.x=t.x<0?0:1;break;case No:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case mi:t.y=t.y-Math.floor(t.y);break;case ui:t.y=t.y<0?0:1;break;case No:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}De.DEFAULT_IMAGE=null;De.DEFAULT_MAPPING=eh;De.DEFAULT_ANISOTROPY=1;class le{constructor(t=0,e=0,n=0,s=1){le.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,v=(f+1)/2,F=(p+1)/2,C=(h+d)/4,A=(u+_)/4,I=(g+m)/4;return M>v&&M>F?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=C/n,r=A/n):v>F?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=C/s,r=I/s):F<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(F),n=A/r,s=I/r),this.set(n,s,r,e),this}let E=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(u-_)/E,this.z=(d-h)/E,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ld extends ts{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new le(0,0,t,e),this.scissorTest=!1,this.viewport=new le(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new De(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new ph(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class on extends ld{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class mh extends De{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class cd extends De{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ds{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let m=1-a;const p=l*d+c*f+h*g+u*_,E=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const F=Math.sqrt(M),C=Math.atan2(F,p*E);m=Math.sin(m*C)/F,a=Math.sin(a*C)/F}const v=a*E;if(l=l*m+d*v,c=c*m+f*v,h=h*m+g*v,u=u*m+_*v,m===1-a){const F=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=F,c*=F,h*=F,u*=F}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-a*f,t[e+2]=c*g+h*f+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ae(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(t=0,e=0,n=0){N.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(hl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(hl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Gr.copy(this).projectOnVector(t),this.sub(Gr)}reflect(t){return this.sub(Gr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ae(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Gr=new N,hl=new Ds;class vi{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,cn):cn.fromBufferAttribute(r,o),cn.applyMatrix4(t.matrixWorld),this.expandByPoint(cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Bs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Bs.copy(n.boundingBox)),Bs.applyMatrix4(t.matrixWorld),this.union(Bs)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,cn),cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(os),ks.subVectors(this.max,os),Ei.subVectors(t.a,os),wi.subVectors(t.b,os),Ti.subVectors(t.c,os),Vn.subVectors(wi,Ei),Wn.subVectors(Ti,wi),ti.subVectors(Ei,Ti);let e=[0,-Vn.z,Vn.y,0,-Wn.z,Wn.y,0,-ti.z,ti.y,Vn.z,0,-Vn.x,Wn.z,0,-Wn.x,ti.z,0,-ti.x,-Vn.y,Vn.x,0,-Wn.y,Wn.x,0,-ti.y,ti.x,0];return!Hr(e,Ei,wi,Ti,ks)||(e=[1,0,0,0,1,0,0,0,1],!Hr(e,Ei,wi,Ti,ks))?!1:(zs.crossVectors(Vn,Wn),e=[zs.x,zs.y,zs.z],Hr(e,Ei,wi,Ti,ks))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(wn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const wn=[new N,new N,new N,new N,new N,new N,new N,new N],cn=new N,Bs=new vi,Ei=new N,wi=new N,Ti=new N,Vn=new N,Wn=new N,ti=new N,os=new N,ks=new N,zs=new N,ei=new N;function Hr(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ei.fromArray(i,r);const a=s.x*Math.abs(ei.x)+s.y*Math.abs(ei.y)+s.z*Math.abs(ei.z),l=t.dot(ei),c=e.dot(ei),h=n.dot(ei);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const hd=new vi,as=new N,Vr=new N;class xi{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):hd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;as.subVectors(t,this.center);const e=as.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(as,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Vr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(as.copy(t.center).add(Vr)),this.expandByPoint(as.copy(t.center).sub(Vr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Tn=new N,Wr=new N,Gs=new N,Xn=new N,Xr=new N,Hs=new N,qr=new N;class Ra{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Tn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Tn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Tn.copy(this.origin).addScaledVector(this.direction,e),Tn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Wr.copy(t).add(e).multiplyScalar(.5),Gs.copy(e).sub(t).normalize(),Xn.copy(this.origin).sub(Wr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Gs),a=Xn.dot(this.direction),l=-Xn.dot(Gs),c=Xn.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Wr).addScaledVector(Gs,d),f}intersectSphere(t,e){Tn.subVectors(t.center,this.origin);const n=Tn.dot(this.direction),s=Tn.dot(Tn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Tn)!==null}intersectTriangle(t,e,n,s,r){Xr.subVectors(e,t),Hs.subVectors(n,t),qr.crossVectors(Xr,Hs);let o=this.direction.dot(qr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Xn.subVectors(this.origin,t);const l=a*this.direction.dot(Hs.crossVectors(Xn,Hs));if(l<0)return null;const c=a*this.direction.dot(Xr.cross(Xn));if(c<0||l+c>o)return null;const h=-a*Xn.dot(qr);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ie{constructor(t,e,n,s,r,o,a,l,c,h,u,d,f,g,_,m){ie.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,f,g,_,m)}set(t,e,n,s,r,o,a,l,c,h,u,d,f,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ie().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ai.setFromMatrixColumn(t,0).length(),r=1/Ai.setFromMatrixColumn(t,1).length(),o=1/Ai.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-_*c,e[9]=-a*l,e[2]=_-d*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;e[0]=d+_*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=_+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;e[0]=d-_*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,f=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+_,e[1]=l*u,e[5]=_*c+d,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=o*l,f=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+_,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ud,t,dd)}lookAt(t,e,n){const s=this.elements;return qe.subVectors(t,e),qe.lengthSq()===0&&(qe.z=1),qe.normalize(),qn.crossVectors(n,qe),qn.lengthSq()===0&&(Math.abs(n.z)===1?qe.x+=1e-4:qe.z+=1e-4,qe.normalize(),qn.crossVectors(n,qe)),qn.normalize(),Vs.crossVectors(qe,qn),s[0]=qn.x,s[4]=Vs.x,s[8]=qe.x,s[1]=qn.y,s[5]=Vs.y,s[9]=qe.y,s[2]=qn.z,s[6]=Vs.z,s[10]=qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],E=n[3],M=n[7],v=n[11],F=n[15],C=s[0],A=s[4],I=s[8],S=s[12],x=s[1],P=s[5],U=s[9],D=s[13],k=s[2],q=s[6],B=s[10],W=s[14],z=s[3],it=s[7],ht=s[11],ut=s[15];return r[0]=o*C+a*x+l*k+c*z,r[4]=o*A+a*P+l*q+c*it,r[8]=o*I+a*U+l*B+c*ht,r[12]=o*S+a*D+l*W+c*ut,r[1]=h*C+u*x+d*k+f*z,r[5]=h*A+u*P+d*q+f*it,r[9]=h*I+u*U+d*B+f*ht,r[13]=h*S+u*D+d*W+f*ut,r[2]=g*C+_*x+m*k+p*z,r[6]=g*A+_*P+m*q+p*it,r[10]=g*I+_*U+m*B+p*ht,r[14]=g*S+_*D+m*W+p*ut,r[3]=E*C+M*x+v*k+F*z,r[7]=E*A+M*P+v*q+F*it,r[11]=E*I+M*U+v*B+F*ht,r[15]=E*S+M*D+v*W+F*ut,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*f-n*l*f)+_*(+e*l*f-e*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+m*(+e*c*u-e*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-s*a*h-e*l*u+e*a*d+s*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],E=u*m*c-_*d*c+_*l*f-a*m*f-u*l*p+a*d*p,M=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,v=h*_*c-g*u*c+g*a*f-o*_*f-h*a*p+o*u*p,F=g*u*l-h*_*l-g*a*d+o*_*d+h*a*m-o*u*m,C=e*E+n*M+s*v+r*F;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return t[0]=E*A,t[1]=(_*d*r-u*m*r-_*s*f+n*m*f+u*s*p-n*d*p)*A,t[2]=(a*m*r-_*l*r+_*s*c-n*m*c-a*s*p+n*l*p)*A,t[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*f-n*l*f)*A,t[4]=M*A,t[5]=(h*m*r-g*d*r+g*s*f-e*m*f-h*s*p+e*d*p)*A,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*p-e*l*p)*A,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*f+e*l*f)*A,t[8]=v*A,t[9]=(g*u*r-h*_*r-g*n*f+e*_*f+h*n*p-e*u*p)*A,t[10]=(o*_*r-g*a*r+g*n*c-e*_*c-o*n*p+e*a*p)*A,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*f-e*a*f)*A,t[12]=F*A,t[13]=(h*_*s-g*u*s+g*n*d-e*_*d-h*n*m+e*u*m)*A,t[14]=(g*a*s-o*_*s-g*n*l+e*_*l+o*n*m-e*a*m)*A,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*d+e*a*d)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,_=o*h,m=o*u,p=a*u,E=l*c,M=l*h,v=l*u,F=n.x,C=n.y,A=n.z;return s[0]=(1-(_+p))*F,s[1]=(f+v)*F,s[2]=(g-M)*F,s[3]=0,s[4]=(f-v)*C,s[5]=(1-(d+p))*C,s[6]=(m+E)*C,s[7]=0,s[8]=(g+M)*A,s[9]=(m-E)*A,s[10]=(1-(d+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ai.set(s[0],s[1],s[2]).length();const o=Ai.set(s[4],s[5],s[6]).length(),a=Ai.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],hn.copy(this);const c=1/r,h=1/o,u=1/a;return hn.elements[0]*=c,hn.elements[1]*=c,hn.elements[2]*=c,hn.elements[4]*=h,hn.elements[5]*=h,hn.elements[6]*=h,hn.elements[8]*=u,hn.elements[9]*=u,hn.elements[10]*=u,e.setFromRotationMatrix(hn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Nn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let f,g;if(a===Nn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===br)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Nn){const l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(o-r),d=(e+t)*c,f=(n+s)*h;let g,_;if(a===Nn)g=(o+r)*u,_=-2*u;else if(a===br)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ai=new N,hn=new ie,ud=new N(0,0,0),dd=new N(1,1,1),qn=new N,Vs=new N,qe=new N,ul=new ie,dl=new Ds;class yn{constructor(t=0,e=0,n=0,s=yn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ae(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ae(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ae(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ae(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ae(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ae(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ul.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ul,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return dl.setFromEuler(this),this.setFromQuaternion(dl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yn.DEFAULT_ORDER="XYZ";class gh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let fd=0;const fl=new N,Ri=new Ds,An=new ie,Ws=new N,ls=new N,pd=new N,md=new Ds,pl=new N(1,0,0),ml=new N(0,1,0),gl=new N(0,0,1),_l={type:"added"},gd={type:"removed"},Ci={type:"childadded",child:null},Yr={type:"childremoved",child:null};class de extends ts{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=On(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=de.DEFAULT_UP.clone();const t=new N,e=new yn,n=new Ds,s=new N(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ie},normalMatrix:{value:new qt}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=de.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ri.setFromAxisAngle(t,e),this.quaternion.multiply(Ri),this}rotateOnWorldAxis(t,e){return Ri.setFromAxisAngle(t,e),this.quaternion.premultiply(Ri),this}rotateX(t){return this.rotateOnAxis(pl,t)}rotateY(t){return this.rotateOnAxis(ml,t)}rotateZ(t){return this.rotateOnAxis(gl,t)}translateOnAxis(t,e){return fl.copy(t).applyQuaternion(this.quaternion),this.position.add(fl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(pl,t)}translateY(t){return this.translateOnAxis(ml,t)}translateZ(t){return this.translateOnAxis(gl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(An.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ws.copy(t):Ws.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?An.lookAt(ls,Ws,this.up):An.lookAt(Ws,ls,this.up),this.quaternion.setFromRotationMatrix(An),s&&(An.extractRotation(s.matrixWorld),Ri.setFromRotationMatrix(An),this.quaternion.premultiply(Ri.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(_l),Ci.child=t,this.dispatchEvent(Ci),Ci.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(gd),Yr.child=t,this.dispatchEvent(Yr),Yr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),An.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),An.multiply(t.parent.matrixWorld)),t.applyMatrix4(An),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(_l),Ci.child=t,this.dispatchEvent(Ci),Ci.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,t,pd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,md,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}de.DEFAULT_UP=new N(0,1,0);de.DEFAULT_MATRIX_AUTO_UPDATE=!0;de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new N,Rn=new N,$r=new N,Cn=new N,Pi=new N,Li=new N,vl=new N,Kr=new N,Zr=new N,Jr=new N,jr=new le,Qr=new le,to=new le;class rn{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),un.subVectors(t,e),s.cross(un);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){un.subVectors(s,e),Rn.subVectors(n,e),$r.subVectors(t,e);const o=un.dot(un),a=un.dot(Rn),l=un.dot($r),c=Rn.dot(Rn),h=Rn.dot($r),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Cn)===null?!1:Cn.x>=0&&Cn.y>=0&&Cn.x+Cn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Cn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Cn.x),l.addScaledVector(o,Cn.y),l.addScaledVector(a,Cn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return jr.setScalar(0),Qr.setScalar(0),to.setScalar(0),jr.fromBufferAttribute(t,e),Qr.fromBufferAttribute(t,n),to.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(jr,r.x),o.addScaledVector(Qr,r.y),o.addScaledVector(to,r.z),o}static isFrontFacing(t,e,n,s){return un.subVectors(n,e),Rn.subVectors(t,e),un.cross(Rn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return un.subVectors(this.c,this.b),Rn.subVectors(this.a,this.b),un.cross(Rn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return rn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return rn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return rn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return rn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return rn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Pi.subVectors(s,n),Li.subVectors(r,n),Kr.subVectors(t,n);const l=Pi.dot(Kr),c=Li.dot(Kr);if(l<=0&&c<=0)return e.copy(n);Zr.subVectors(t,s);const h=Pi.dot(Zr),u=Li.dot(Zr);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Pi,o);Jr.subVectors(t,r);const f=Pi.dot(Jr),g=Li.dot(Jr);if(g>=0&&f<=g)return e.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Li,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return vl.subVectors(r,s),a=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(vl,a);const p=1/(m+_+d);return o=_*p,a=d*p,e.copy(n).addScaledVector(Pi,o).addScaledVector(Li,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const _h={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yn={h:0,s:0,l:0},Xs={h:0,s:0,l:0};function eo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class ft{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ve){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Qt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Qt.workingColorSpace){if(t=td(t,1),e=Ae(e,0,1),n=Ae(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=eo(o,r,t+1/3),this.g=eo(o,r,t),this.b=eo(o,r,t-1/3)}return Qt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ve){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ve){const n=_h[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Bn(t.r),this.g=Bn(t.g),this.b=Bn(t.b),this}copyLinearToSRGB(t){return this.r=Wi(t.r),this.g=Wi(t.g),this.b=Wi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ve){return Qt.fromWorkingColorSpace(Pe.copy(this),t),Math.round(Ae(Pe.r*255,0,255))*65536+Math.round(Ae(Pe.g*255,0,255))*256+Math.round(Ae(Pe.b*255,0,255))}getHexString(t=Ve){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.fromWorkingColorSpace(Pe.copy(this),e);const n=Pe.r,s=Pe.g,r=Pe.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.fromWorkingColorSpace(Pe.copy(this),e),t.r=Pe.r,t.g=Pe.g,t.b=Pe.b,t}getStyle(t=Ve){Qt.fromWorkingColorSpace(Pe.copy(this),t);const e=Pe.r,n=Pe.g,s=Pe.b;return t!==Ve?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Yn),this.setHSL(Yn.h+t,Yn.s+e,Yn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Yn),t.getHSL(Xs);const n=Br(Yn.h,Xs.h,e),s=Br(Yn.s,Xs.s,e),r=Br(Yn.l,Xs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pe=new ft;ft.NAMES=_h;let _d=0;class jn extends ts{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_d++}),this.uuid=On(),this.name="",this.blending=fi,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bo,this.blendDst=Eo,this.blendEquation=ci,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ft(0,0,0),this.blendAlpha=0,this.depthFunc=Xi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Si,this.stencilZFail=Si,this.stencilZPass=Si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==fi&&(n.blending=this.blending),this.side!==Jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==bo&&(n.blendSrc=this.blendSrc),this.blendDst!==Eo&&(n.blendDst=this.blendDst),this.blendEquation!==ci&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Xi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Si&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Si&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Si&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Zt extends jn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.combine=Kc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Me=new N,qs=new ct;class Ne{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=aa,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)qs.fromBufferAttribute(this,e),qs.applyMatrix3(t),this.setXY(e,qs.x,qs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=gn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=gn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=gn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=gn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array),r=ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==aa&&(t.usage=this.usage),t}}class vh extends Ne{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class xh extends Ne{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class oe extends Ne{constructor(t,e,n){super(new Float32Array(t),e,n)}}let vd=0;const je=new ie,no=new de,Ii=new N,Ye=new vi,cs=new vi,Ee=new N;class xe extends ts{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=On(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(fh(t)?xh:vh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return je.makeRotationFromQuaternion(t),this.applyMatrix4(je),this}rotateX(t){return je.makeRotationX(t),this.applyMatrix4(je),this}rotateY(t){return je.makeRotationY(t),this.applyMatrix4(je),this}rotateZ(t){return je.makeRotationZ(t),this.applyMatrix4(je),this}translate(t,e,n){return je.makeTranslation(t,e,n),this.applyMatrix4(je),this}scale(t,e,n){return je.makeScale(t,e,n),this.applyMatrix4(je),this}lookAt(t){return no.lookAt(t),no.updateMatrix(),this.applyMatrix4(no.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ii).negate(),this.translate(Ii.x,Ii.y,Ii.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new oe(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ye.setFromBufferAttribute(r),this.morphTargetsRelative?(Ee.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Ee),Ee.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Ee)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const n=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];cs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ee.addVectors(Ye.min,cs.min),Ye.expandByPoint(Ee),Ee.addVectors(Ye.max,cs.max),Ye.expandByPoint(Ee)):(Ye.expandByPoint(cs.min),Ye.expandByPoint(cs.max))}Ye.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ee.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ee));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ee.fromBufferAttribute(a,c),l&&(Ii.fromBufferAttribute(t,c),Ee.add(Ii)),s=Math.max(s,n.distanceToSquared(Ee))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ne(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let I=0;I<n.count;I++)a[I]=new N,l[I]=new N;const c=new N,h=new N,u=new N,d=new ct,f=new ct,g=new ct,_=new N,m=new N;function p(I,S,x){c.fromBufferAttribute(n,I),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,x),d.fromBufferAttribute(r,I),f.fromBufferAttribute(r,S),g.fromBufferAttribute(r,x),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(P),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),a[I].add(_),a[S].add(_),a[x].add(_),l[I].add(m),l[S].add(m),l[x].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let I=0,S=E.length;I<S;++I){const x=E[I],P=x.start,U=x.count;for(let D=P,k=P+U;D<k;D+=3)p(t.getX(D+0),t.getX(D+1),t.getX(D+2))}const M=new N,v=new N,F=new N,C=new N;function A(I){F.fromBufferAttribute(s,I),C.copy(F);const S=a[I];M.copy(S),M.sub(F.multiplyScalar(F.dot(S))).normalize(),v.crossVectors(C,S);const P=v.dot(l[I])<0?-1:1;o.setXYZW(I,M.x,M.y,M.z,P)}for(let I=0,S=E.length;I<S;++I){const x=E[I],P=x.start,U=x.count;for(let D=P,k=P+U;D<k;D+=3)A(t.getX(D+0)),A(t.getX(D+1)),A(t.getX(D+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ne(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new N,r=new N,o=new N,a=new N,l=new N,c=new N,h=new N,u=new N;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ee.fromBufferAttribute(t,e),Ee.normalize(),t.setXYZ(e,Ee.x,Ee.y,Ee.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Ne(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new xe,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const xl=new ie,ni=new Ra,Ys=new xi,Ml=new N,$s=new N,Ks=new N,Zs=new N,io=new N,Js=new N,yl=new N,js=new N;class zt extends de{constructor(t=new xe,e=new Zt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Js.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(io.fromBufferAttribute(u,t),o?Js.addScaledVector(io,h):Js.addScaledVector(io.sub(e),h))}e.add(Js)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ys.copy(n.boundingSphere),Ys.applyMatrix4(r),ni.copy(t.ray).recast(t.near),!(Ys.containsPoint(ni.origin)===!1&&(ni.intersectSphere(Ys,Ml)===null||ni.origin.distanceToSquared(Ml)>(t.far-t.near)**2))&&(xl.copy(r).invert(),ni.copy(t.ray).applyMatrix4(xl),!(n.boundingBox!==null&&ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ni)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],E=Math.max(m.start,f.start),M=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let v=E,F=M;v<F;v+=3){const C=a.getX(v),A=a.getX(v+1),I=a.getX(v+2);s=Qs(this,p,t,n,c,h,u,C,A,I),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const E=a.getX(m),M=a.getX(m+1),v=a.getX(m+2);s=Qs(this,o,t,n,c,h,u,E,M,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],E=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=E,F=M;v<F;v+=3){const C=v,A=v+1,I=v+2;s=Qs(this,p,t,n,c,h,u,C,A,I),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const E=m,M=m+1,v=m+2;s=Qs(this,o,t,n,c,h,u,E,M,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function xd(i,t,e,n,s,r,o,a){let l;if(t.side===Ie?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Jn,a),l===null)return null;js.copy(a),js.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(js);return c<e.near||c>e.far?null:{distance:c,point:js.clone(),object:i}}function Qs(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,$s),i.getVertexPosition(l,Ks),i.getVertexPosition(c,Zs);const h=xd(i,t,e,n,$s,Ks,Zs,yl);if(h){const u=new N;rn.getBarycoord(yl,$s,Ks,Zs,u),s&&(h.uv=rn.getInterpolatedAttribute(s,a,l,c,u,new ct)),r&&(h.uv1=rn.getInterpolatedAttribute(r,a,l,c,u,new ct)),o&&(h.normal=rn.getInterpolatedAttribute(o,a,l,c,u,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new N,materialIndex:0};rn.getNormal($s,Ks,Zs,d.normal),h.face=d,h.barycoord=u}return h}class ue extends xe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new oe(c,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(u,2));function g(_,m,p,E,M,v,F,C,A,I,S){const x=v/A,P=F/I,U=v/2,D=F/2,k=C/2,q=A+1,B=I+1;let W=0,z=0;const it=new N;for(let ht=0;ht<B;ht++){const ut=ht*P-D;for(let mt=0;mt<q;mt++){const St=mt*x-U;it[_]=St*E,it[m]=ut*M,it[p]=k,c.push(it.x,it.y,it.z),it[_]=0,it[m]=0,it[p]=C>0?1:-1,h.push(it.x,it.y,it.z),u.push(mt/A),u.push(1-ht/I),W+=1}}for(let ht=0;ht<I;ht++)for(let ut=0;ut<A;ut++){const mt=d+ut+q*ht,St=d+ut+q*(ht+1),R=d+(ut+1)+q*(ht+1),Y=d+(ut+1)+q*ht;l.push(mt,St,Y),l.push(St,R,Y),z+=6}a.addGroup(f,z,S),f+=z,d+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ue(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Zi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Fe(i){const t={};for(let e=0;e<i.length;e++){const n=Zi(i[e]);for(const s in n)t[s]=n[s]}return t}function Md(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Mh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}const As={clone:Zi,merge:Fe};var yd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Le extends jn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yd,this.fragmentShader=Sd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Zi(t.uniforms),this.uniformsGroups=Md(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class yh extends de{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=Nn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const $n=new N,Sl=new ct,bl=new ct;class We extends yh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Er*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Or*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Er*2*Math.atan(Math.tan(Or*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set($n.x,$n.y).multiplyScalar(-t/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($n.x,$n.y).multiplyScalar(-t/$n.z)}getViewSize(t,e){return this.getViewBounds(t,Sl,bl),e.subVectors(bl,Sl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Or*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Di=-90,Ni=1;class bd extends de{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new We(Di,Ni,t,e);s.layers=this.layers,this.add(s);const r=new We(Di,Ni,t,e);r.layers=this.layers,this.add(r);const o=new We(Di,Ni,t,e);o.layers=this.layers,this.add(o);const a=new We(Di,Ni,t,e);a.layers=this.layers,this.add(a);const l=new We(Di,Ni,t,e);l.layers=this.layers,this.add(l);const c=new We(Di,Ni,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Nn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===br)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Sh extends De{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:qi,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ed extends on{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Sh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:vn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ue(5,5,5),r=new Le({name:"CubemapFromEquirect",uniforms:Zi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ie,blending:Fn});r.uniforms.tEquirect.value=e;const o=new zt(s,r),a=e.minFilter;return e.minFilter===di&&(e.minFilter=vn),new bd(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const so=new N,wd=new N,Td=new qt;class ai{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=so.subVectors(n,e).cross(wd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(so),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Td.getNormalMatrix(t),s=this.coplanarPoint(so).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ii=new xi,tr=new N;class Ca{constructor(t=new ai,e=new ai,n=new ai,s=new ai,r=new ai,o=new ai){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Nn){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],E=s[13],M=s[14],v=s[15];if(n[0].setComponents(l-r,d-c,m-f,v-p).normalize(),n[1].setComponents(l+r,d+c,m+f,v+p).normalize(),n[2].setComponents(l+o,d+h,m+g,v+E).normalize(),n[3].setComponents(l-o,d-h,m-g,v-E).normalize(),n[4].setComponents(l-a,d-u,m-_,v-M).normalize(),e===Nn)n[5].setComponents(l+a,d+u,m+_,v+M).normalize();else if(e===br)n[5].setComponents(a,u,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ii.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ii.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ii)}intersectsSprite(t){return ii.center.set(0,0,0),ii.radius=.7071067811865476,ii.applyMatrix4(t.matrixWorld),this.intersectsSphere(ii)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(tr.x=s.normal.x>0?t.max.x:t.min.x,tr.y=s.normal.y>0?t.max.y:t.min.y,tr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(tr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function bh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Ad(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Ke extends xe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const E=p*d-o;for(let M=0;M<c;M++){const v=M*u-r;g.push(v,-E,0),_.push(0,0,1),m.push(M/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<a;E++){const M=E+c*p,v=E+c*(p+1),F=E+1+c*(p+1),C=E+1+c*p;f.push(M,v,C),f.push(v,F,C)}this.setIndex(f),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(_,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ke(t.width,t.height,t.widthSegments,t.heightSegments)}}var Rd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Cd=`#ifdef USE_ALPHAHASH
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
#endif`,Pd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ld=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Id=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Dd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nd=`#ifdef USE_AOMAP
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
#endif`,Ud=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Fd=`#ifdef USE_BATCHING
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
#endif`,Od=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gd=`#ifdef USE_IRIDESCENCE
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
#endif`,Hd=`#ifdef USE_BUMPMAP
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
#endif`,Vd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Wd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$d=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Kd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Zd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Jd=`#define PI 3.141592653589793
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
} // validated`,jd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Qd=`vec3 transformedNormal = objectNormal;
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
#endif`,tf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ef=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rf="gl_FragColor = linearToOutputTexel( gl_FragColor );",of=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,af=`#ifdef USE_ENVMAP
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
#endif`,lf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cf=`#ifdef USE_ENVMAP
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
#endif`,hf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,uf=`#ifdef USE_ENVMAP
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
#endif`,df=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ff=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gf=`#ifdef USE_GRADIENTMAP
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
}`,_f=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mf=`uniform bool receiveShadow;
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
#endif`,yf=`#ifdef USE_ENVMAP
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
#endif`,Sf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ef=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tf=`PhysicalMaterial material;
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
#endif`,Af=`struct PhysicalMaterial {
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
}`,Rf=`
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
#endif`,Cf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Pf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,If=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Df=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Uf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ff=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Of=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Bf=`#if defined( USE_POINTS_UV )
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
#endif`,kf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wf=`#ifdef USE_MORPHTARGETS
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
#endif`,Xf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Yf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,$f=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Jf=`#ifdef USE_NORMALMAP
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
#endif`,jf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ep=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,np=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ip=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,sp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,op=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ap=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,up=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,fp=`float getShadowMask() {
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
}`,pp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mp=`#ifdef USE_SKINNING
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
#endif`,gp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_p=`#ifdef USE_SKINNING
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
#endif`,vp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Mp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Sp=`#ifdef USE_TRANSMISSION
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
#endif`,bp=`#ifdef USE_TRANSMISSION
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
#endif`,Ep=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ap=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Rp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cp=`uniform sampler2D t2D;
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
}`,Pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ip=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Np=`#include <common>
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
}`,Up=`#if DEPTH_PACKING == 3200
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
}`,Fp=`#define DISTANCE
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
}`,Op=`#define DISTANCE
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
}`,Bp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zp=`uniform float scale;
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
}`,Gp=`uniform vec3 diffuse;
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
}`,Hp=`#include <common>
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
}`,Vp=`uniform vec3 diffuse;
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
}`,Wp=`#define LAMBERT
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
}`,Xp=`#define LAMBERT
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
}`,qp=`#define MATCAP
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
}`,Yp=`#define MATCAP
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
}`,$p=`#define NORMAL
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
}`,Kp=`#define NORMAL
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
}`,Zp=`#define PHONG
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
}`,Jp=`#define PHONG
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
}`,jp=`#define STANDARD
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
}`,Qp=`#define STANDARD
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
}`,tm=`#define TOON
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
}`,em=`#define TOON
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
}`,nm=`uniform float size;
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
}`,im=`uniform vec3 diffuse;
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
}`,sm=`#include <common>
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
}`,rm=`uniform vec3 color;
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
}`,om=`uniform float rotation;
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
}`,am=`uniform vec3 diffuse;
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
}`,$t={alphahash_fragment:Rd,alphahash_pars_fragment:Cd,alphamap_fragment:Pd,alphamap_pars_fragment:Ld,alphatest_fragment:Id,alphatest_pars_fragment:Dd,aomap_fragment:Nd,aomap_pars_fragment:Ud,batching_pars_vertex:Fd,batching_vertex:Od,begin_vertex:Bd,beginnormal_vertex:kd,bsdfs:zd,iridescence_fragment:Gd,bumpmap_pars_fragment:Hd,clipping_planes_fragment:Vd,clipping_planes_pars_fragment:Wd,clipping_planes_pars_vertex:Xd,clipping_planes_vertex:qd,color_fragment:Yd,color_pars_fragment:$d,color_pars_vertex:Kd,color_vertex:Zd,common:Jd,cube_uv_reflection_fragment:jd,defaultnormal_vertex:Qd,displacementmap_pars_vertex:tf,displacementmap_vertex:ef,emissivemap_fragment:nf,emissivemap_pars_fragment:sf,colorspace_fragment:rf,colorspace_pars_fragment:of,envmap_fragment:af,envmap_common_pars_fragment:lf,envmap_pars_fragment:cf,envmap_pars_vertex:hf,envmap_physical_pars_fragment:yf,envmap_vertex:uf,fog_vertex:df,fog_pars_vertex:ff,fog_fragment:pf,fog_pars_fragment:mf,gradientmap_pars_fragment:gf,lightmap_pars_fragment:_f,lights_lambert_fragment:vf,lights_lambert_pars_fragment:xf,lights_pars_begin:Mf,lights_toon_fragment:Sf,lights_toon_pars_fragment:bf,lights_phong_fragment:Ef,lights_phong_pars_fragment:wf,lights_physical_fragment:Tf,lights_physical_pars_fragment:Af,lights_fragment_begin:Rf,lights_fragment_maps:Cf,lights_fragment_end:Pf,logdepthbuf_fragment:Lf,logdepthbuf_pars_fragment:If,logdepthbuf_pars_vertex:Df,logdepthbuf_vertex:Nf,map_fragment:Uf,map_pars_fragment:Ff,map_particle_fragment:Of,map_particle_pars_fragment:Bf,metalnessmap_fragment:kf,metalnessmap_pars_fragment:zf,morphinstance_vertex:Gf,morphcolor_vertex:Hf,morphnormal_vertex:Vf,morphtarget_pars_vertex:Wf,morphtarget_vertex:Xf,normal_fragment_begin:qf,normal_fragment_maps:Yf,normal_pars_fragment:$f,normal_pars_vertex:Kf,normal_vertex:Zf,normalmap_pars_fragment:Jf,clearcoat_normal_fragment_begin:jf,clearcoat_normal_fragment_maps:Qf,clearcoat_pars_fragment:tp,iridescence_pars_fragment:ep,opaque_fragment:np,packing:ip,premultiplied_alpha_fragment:sp,project_vertex:rp,dithering_fragment:op,dithering_pars_fragment:ap,roughnessmap_fragment:lp,roughnessmap_pars_fragment:cp,shadowmap_pars_fragment:hp,shadowmap_pars_vertex:up,shadowmap_vertex:dp,shadowmask_pars_fragment:fp,skinbase_vertex:pp,skinning_pars_vertex:mp,skinning_vertex:gp,skinnormal_vertex:_p,specularmap_fragment:vp,specularmap_pars_fragment:xp,tonemapping_fragment:Mp,tonemapping_pars_fragment:yp,transmission_fragment:Sp,transmission_pars_fragment:bp,uv_pars_fragment:Ep,uv_pars_vertex:wp,uv_vertex:Tp,worldpos_vertex:Ap,background_vert:Rp,background_frag:Cp,backgroundCube_vert:Pp,backgroundCube_frag:Lp,cube_vert:Ip,cube_frag:Dp,depth_vert:Np,depth_frag:Up,distanceRGBA_vert:Fp,distanceRGBA_frag:Op,equirect_vert:Bp,equirect_frag:kp,linedashed_vert:zp,linedashed_frag:Gp,meshbasic_vert:Hp,meshbasic_frag:Vp,meshlambert_vert:Wp,meshlambert_frag:Xp,meshmatcap_vert:qp,meshmatcap_frag:Yp,meshnormal_vert:$p,meshnormal_frag:Kp,meshphong_vert:Zp,meshphong_frag:Jp,meshphysical_vert:jp,meshphysical_frag:Qp,meshtoon_vert:tm,meshtoon_frag:em,points_vert:nm,points_frag:im,shadow_vert:sm,shadow_frag:rm,sprite_vert:om,sprite_frag:am},wt={common:{diffuse:{value:new ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new ft(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},mn={basic:{uniforms:Fe([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:Fe([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new ft(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:Fe([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new ft(0)},specular:{value:new ft(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:Fe([wt.common,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.roughnessmap,wt.metalnessmap,wt.fog,wt.lights,{emissive:{value:new ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:Fe([wt.common,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.gradientmap,wt.fog,wt.lights,{emissive:{value:new ft(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:Fe([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:Fe([wt.points,wt.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:Fe([wt.common,wt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:Fe([wt.common,wt.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:Fe([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:Fe([wt.sprite,wt.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:Fe([wt.common,wt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:Fe([wt.lights,wt.fog,{color:{value:new ft(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};mn.physical={uniforms:Fe([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new ft(0)},specularColor:{value:new ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};const er={r:0,b:0,g:0},si=new yn,lm=new ie;function cm(i,t,e,n,s,r,o){const a=new ft(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(E){let M=E.isScene===!0?E.background:null;return M&&M.isTexture&&(M=(E.backgroundBlurriness>0?e:t).get(M)),M}function _(E){let M=!1;const v=g(E);v===null?p(a,l):v&&v.isColor&&(p(v,1),M=!0);const F=i.xr.getEnvironmentBlendMode();F==="additive"?n.buffers.color.setClear(0,0,0,1,o):F==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,M){const v=g(M);v&&(v.isCubeTexture||v.mapping===Cr)?(h===void 0&&(h=new zt(new ue(1,1,1),new Le({name:"BackgroundCubeMaterial",uniforms:Zi(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Ie,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(F,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),si.copy(M.backgroundRotation),si.x*=-1,si.y*=-1,si.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(lm.makeRotationFromEuler(si)),h.material.toneMapped=Qt.getTransfer(v.colorSpace)!==re,(u!==v||d!==v.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new zt(new Ke(2,2),new Le({name:"BackgroundMaterial",uniforms:Zi(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Qt.getTransfer(v.colorSpace)!==re,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function p(E,M){E.getRGB(er,Mh(i)),n.buffers.color.setClear(er.r,er.g,er.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(E,M=1){a.set(E),l=M,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,p(a,l)},render:_,addToRenderList:m}}function hm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(x,P,U,D,k){let q=!1;const B=u(D,U,P);r!==B&&(r=B,c(r.object)),q=f(x,D,U,k),q&&g(x,D,U,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,v(x,P,U,D),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function u(x,P,U){const D=U.wireframe===!0;let k=n[x.id];k===void 0&&(k={},n[x.id]=k);let q=k[P.id];q===void 0&&(q={},k[P.id]=q);let B=q[D];return B===void 0&&(B=d(l()),q[D]=B),B}function d(x){const P=[],U=[],D=[];for(let k=0;k<e;k++)P[k]=0,U[k]=0,D[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:U,attributeDivisors:D,object:x,attributes:{},index:null}}function f(x,P,U,D){const k=r.attributes,q=P.attributes;let B=0;const W=U.getAttributes();for(const z in W)if(W[z].location>=0){const ht=k[z];let ut=q[z];if(ut===void 0&&(z==="instanceMatrix"&&x.instanceMatrix&&(ut=x.instanceMatrix),z==="instanceColor"&&x.instanceColor&&(ut=x.instanceColor)),ht===void 0||ht.attribute!==ut||ut&&ht.data!==ut.data)return!0;B++}return r.attributesNum!==B||r.index!==D}function g(x,P,U,D){const k={},q=P.attributes;let B=0;const W=U.getAttributes();for(const z in W)if(W[z].location>=0){let ht=q[z];ht===void 0&&(z==="instanceMatrix"&&x.instanceMatrix&&(ht=x.instanceMatrix),z==="instanceColor"&&x.instanceColor&&(ht=x.instanceColor));const ut={};ut.attribute=ht,ht&&ht.data&&(ut.data=ht.data),k[z]=ut,B++}r.attributes=k,r.attributesNum=B,r.index=D}function _(){const x=r.newAttributes;for(let P=0,U=x.length;P<U;P++)x[P]=0}function m(x){p(x,0)}function p(x,P){const U=r.newAttributes,D=r.enabledAttributes,k=r.attributeDivisors;U[x]=1,D[x]===0&&(i.enableVertexAttribArray(x),D[x]=1),k[x]!==P&&(i.vertexAttribDivisor(x,P),k[x]=P)}function E(){const x=r.newAttributes,P=r.enabledAttributes;for(let U=0,D=P.length;U<D;U++)P[U]!==x[U]&&(i.disableVertexAttribArray(U),P[U]=0)}function M(x,P,U,D,k,q,B){B===!0?i.vertexAttribIPointer(x,P,U,k,q):i.vertexAttribPointer(x,P,U,D,k,q)}function v(x,P,U,D){_();const k=D.attributes,q=U.getAttributes(),B=P.defaultAttributeValues;for(const W in q){const z=q[W];if(z.location>=0){let it=k[W];if(it===void 0&&(W==="instanceMatrix"&&x.instanceMatrix&&(it=x.instanceMatrix),W==="instanceColor"&&x.instanceColor&&(it=x.instanceColor)),it!==void 0){const ht=it.normalized,ut=it.itemSize,mt=t.get(it);if(mt===void 0)continue;const St=mt.buffer,R=mt.type,Y=mt.bytesPerElement,st=R===i.INT||R===i.UNSIGNED_INT||it.gpuType===ya;if(it.isInterleavedBufferAttribute){const K=it.data,pt=K.stride,Mt=it.offset;if(K.isInstancedInterleavedBuffer){for(let Ut=0;Ut<z.locationSize;Ut++)p(z.location+Ut,K.meshPerAttribute);x.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Ut=0;Ut<z.locationSize;Ut++)m(z.location+Ut);i.bindBuffer(i.ARRAY_BUFFER,St);for(let Ut=0;Ut<z.locationSize;Ut++)M(z.location+Ut,ut/z.locationSize,R,ht,pt*Y,(Mt+ut/z.locationSize*Ut)*Y,st)}else{if(it.isInstancedBufferAttribute){for(let K=0;K<z.locationSize;K++)p(z.location+K,it.meshPerAttribute);x.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let K=0;K<z.locationSize;K++)m(z.location+K);i.bindBuffer(i.ARRAY_BUFFER,St);for(let K=0;K<z.locationSize;K++)M(z.location+K,ut/z.locationSize,R,ht,ut*Y,ut/z.locationSize*K*Y,st)}}else if(B!==void 0){const ht=B[W];if(ht!==void 0)switch(ht.length){case 2:i.vertexAttrib2fv(z.location,ht);break;case 3:i.vertexAttrib3fv(z.location,ht);break;case 4:i.vertexAttrib4fv(z.location,ht);break;default:i.vertexAttrib1fv(z.location,ht)}}}}E()}function F(){I();for(const x in n){const P=n[x];for(const U in P){const D=P[U];for(const k in D)h(D[k].object),delete D[k];delete P[U]}delete n[x]}}function C(x){if(n[x.id]===void 0)return;const P=n[x.id];for(const U in P){const D=P[U];for(const k in D)h(D[k].object),delete D[k];delete P[U]}delete n[x.id]}function A(x){for(const P in n){const U=n[P];if(U[x.id]===void 0)continue;const D=U[x.id];for(const k in D)h(D[k].object),delete D[k];delete U[x.id]}}function I(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:S,dispose:F,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:E}}function um(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function dm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==fn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const I=A===Mn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==kn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==xn&&!I)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),F=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:F,maxSamples:C}}function fm(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new ai,a=new qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const E=r?0:n,M=E*4;let v=p.clippingState||null;l.value=v,v=h(g,d,M,f);for(let F=0;F!==M;++F)v[F]=e[F];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,E=d.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,v=f;M!==_;++M,v+=4)o.copy(u[M]).applyMatrix4(E,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function pm(i){let t=new WeakMap;function e(o,a){return a===Io?o.mapping=qi:a===Do&&(o.mapping=Yi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Io||a===Do)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Ed(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Pa extends yh{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Gi=4,El=[.125,.215,.35,.446,.526,.582],hi=20,ro=new Pa,wl=new ft;let oo=null,ao=0,lo=0,co=!1;const li=(1+Math.sqrt(5))/2,Ui=1/li,Tl=[new N(-li,Ui,0),new N(li,Ui,0),new N(-Ui,0,li),new N(Ui,0,li),new N(0,li,-Ui),new N(0,li,Ui),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class ca{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){oo=this._renderer.getRenderTarget(),ao=this._renderer.getActiveCubeFace(),lo=this._renderer.getActiveMipmapLevel(),co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(oo,ao,lo),this._renderer.xr.enabled=co,t.scissorTest=!1,nr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===qi||t.mapping===Yi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),oo=this._renderer.getRenderTarget(),ao=this._renderer.getActiveCubeFace(),lo=this._renderer.getActiveMipmapLevel(),co=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:Mn,format:fn,colorSpace:Qi,depthBuffer:!1},s=Al(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Al(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=mm(r)),this._blurMaterial=gm(r,t,e)}return s}_compileMaterial(t){const e=new zt(this._lodPlanes[0],t);this._renderer.compile(e,ro)}_sceneToCubeUV(t,e,n,s){const a=new We(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(wl),h.toneMapping=Zn,h.autoClear=!1;const f=new Zt({name:"PMREM.Background",side:Ie,depthWrite:!1,depthTest:!1}),g=new zt(new ue,f);let _=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,_=!0):(f.color.copy(wl),_=!0);for(let p=0;p<6;p++){const E=p%3;E===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):E===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const M=this._cubeSize;nr(s,E*M,p>2?M:0,M,M),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===qi||t.mapping===Yi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new zt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;nr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ro)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Tl[(s-r-1)%Tl.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new zt(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*hi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):hi;m>hi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${hi}`);const p=[];let E=0;for(let A=0;A<hi;++A){const I=A/_,S=Math.exp(-I*I/2);p.push(S),A===0?E+=S:A<m&&(E+=2*S)}for(let A=0;A<p.length;A++)p[A]=p[A]/E;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;const v=this._sizeLods[s],F=3*v*(s>M-Gi?s-M+Gi:0),C=4*(this._cubeSize-v);nr(e,F,C,3*v,2*v),l.setRenderTarget(e),l.render(u,ro)}}function mm(i){const t=[],e=[],n=[];let s=i;const r=i-Gi+1+El.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-Gi?l=El[o-i+Gi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,E=new Float32Array(_*g*f),M=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let C=0;C<f;C++){const A=C%3*2/3-1,I=C>2?0:-1,S=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];E.set(S,_*g*C),M.set(d,m*g*C);const x=[C,C,C,C,C,C];v.set(x,p*g*C)}const F=new xe;F.setAttribute("position",new Ne(E,_)),F.setAttribute("uv",new Ne(M,m)),F.setAttribute("faceIndex",new Ne(v,p)),t.push(F),s>Gi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Al(i,t,e){const n=new on(i,t,e);return n.texture.mapping=Cr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function nr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function gm(i,t,e){const n=new Float32Array(hi),s=new N(0,1,0);return new Le({name:"SphericalGaussianBlur",defines:{n:hi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:La(),fragmentShader:`

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
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Rl(){return new Le({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:La(),fragmentShader:`

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
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Cl(){return new Le({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:La(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function La(){return`

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
	`}function _m(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Io||l===Do,h=l===qi||l===Yi;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new ca(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new ca(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function vm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&vs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function xm(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const E=f.array;_=f.version;for(let M=0,v=E.length;M<v;M+=3){const F=E[M+0],C=E[M+1],A=E[M+2];d.push(F,C,C,A,A,F)}}else if(g!==void 0){const E=g.array;_=g.version;for(let M=0,v=E.length/3-1;M<v;M+=3){const F=M+0,C=M+1,A=M+2;d.push(F,C,C,A,A,F)}}else return;const m=new(fh(d)?xh:vh)(d,1);m.version=_;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Mm(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let E=0;E<g;E++)p+=f[E]*_[E];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function ym(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Sm(i,t,e){const n=new WeakMap,s=new le;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let x=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",x)};var f=x;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let F=a.attributes.position.count*v,C=1;F>t.maxTextureSize&&(C=Math.ceil(F/t.maxTextureSize),F=t.maxTextureSize);const A=new Float32Array(F*C*4*u),I=new mh(A,F,C,u);I.type=xn,I.needsUpdate=!0;const S=v*4;for(let P=0;P<u;P++){const U=p[P],D=E[P],k=M[P],q=F*C*4*P;for(let B=0;B<U.count;B++){const W=B*S;g===!0&&(s.fromBufferAttribute(U,B),A[q+W+0]=s.x,A[q+W+1]=s.y,A[q+W+2]=s.z,A[q+W+3]=0),_===!0&&(s.fromBufferAttribute(D,B),A[q+W+4]=s.x,A[q+W+5]=s.y,A[q+W+6]=s.z,A[q+W+7]=0),m===!0&&(s.fromBufferAttribute(k,B),A[q+W+8]=s.x,A[q+W+9]=s.y,A[q+W+10]=s.z,A[q+W+11]=k.itemSize===4?s.w:1)}}d={count:u,texture:I,size:new ct(F,C)},n.set(a,d),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function bm(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Eh extends De{constructor(t,e,n,s,r,o,a,l,c,h=Vi){if(h!==Vi&&h!==Ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Vi&&(n=gi),n===void 0&&h===Ki&&(n=$i),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:ke,this.minFilter=l!==void 0?l:ke,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const wh=new De,Pl=new Eh(1,1),Th=new mh,Ah=new cd,Rh=new Sh,Ll=[],Il=[],Dl=new Float32Array(16),Nl=new Float32Array(9),Ul=new Float32Array(4);function es(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Ll[s];if(r===void 0&&(r=new Float32Array(s),Ll[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Se(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function be(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Lr(i,t){let e=Il[t];e===void 0&&(e=new Int32Array(t),Il[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Em(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function wm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2fv(this.addr,t),be(e,t)}}function Tm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Se(e,t))return;i.uniform3fv(this.addr,t),be(e,t)}}function Am(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4fv(this.addr,t),be(e,t)}}function Rm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(Se(e,n))return;Ul.set(n),i.uniformMatrix2fv(this.addr,!1,Ul),be(e,n)}}function Cm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(Se(e,n))return;Nl.set(n),i.uniformMatrix3fv(this.addr,!1,Nl),be(e,n)}}function Pm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(Se(e,n))return;Dl.set(n),i.uniformMatrix4fv(this.addr,!1,Dl),be(e,n)}}function Lm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Im(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2iv(this.addr,t),be(e,t)}}function Dm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;i.uniform3iv(this.addr,t),be(e,t)}}function Nm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4iv(this.addr,t),be(e,t)}}function Um(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Fm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;i.uniform2uiv(this.addr,t),be(e,t)}}function Om(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;i.uniform3uiv(this.addr,t),be(e,t)}}function Bm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;i.uniform4uiv(this.addr,t),be(e,t)}}function km(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Pl.compareFunction=dh,r=Pl):r=wh,e.setTexture2D(t||r,s)}function zm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Ah,s)}function Gm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Rh,s)}function Hm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Th,s)}function Vm(i){switch(i){case 5126:return Em;case 35664:return wm;case 35665:return Tm;case 35666:return Am;case 35674:return Rm;case 35675:return Cm;case 35676:return Pm;case 5124:case 35670:return Lm;case 35667:case 35671:return Im;case 35668:case 35672:return Dm;case 35669:case 35673:return Nm;case 5125:return Um;case 36294:return Fm;case 36295:return Om;case 36296:return Bm;case 35678:case 36198:case 36298:case 36306:case 35682:return km;case 35679:case 36299:case 36307:return zm;case 35680:case 36300:case 36308:case 36293:return Gm;case 36289:case 36303:case 36311:case 36292:return Hm}}function Wm(i,t){i.uniform1fv(this.addr,t)}function Xm(i,t){const e=es(t,this.size,2);i.uniform2fv(this.addr,e)}function qm(i,t){const e=es(t,this.size,3);i.uniform3fv(this.addr,e)}function Ym(i,t){const e=es(t,this.size,4);i.uniform4fv(this.addr,e)}function $m(i,t){const e=es(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Km(i,t){const e=es(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Zm(i,t){const e=es(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Jm(i,t){i.uniform1iv(this.addr,t)}function jm(i,t){i.uniform2iv(this.addr,t)}function Qm(i,t){i.uniform3iv(this.addr,t)}function t0(i,t){i.uniform4iv(this.addr,t)}function e0(i,t){i.uniform1uiv(this.addr,t)}function n0(i,t){i.uniform2uiv(this.addr,t)}function i0(i,t){i.uniform3uiv(this.addr,t)}function s0(i,t){i.uniform4uiv(this.addr,t)}function r0(i,t,e){const n=this.cache,s=t.length,r=Lr(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),be(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||wh,r[o])}function o0(i,t,e){const n=this.cache,s=t.length,r=Lr(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),be(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Ah,r[o])}function a0(i,t,e){const n=this.cache,s=t.length,r=Lr(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),be(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Rh,r[o])}function l0(i,t,e){const n=this.cache,s=t.length,r=Lr(e,s);Se(n,r)||(i.uniform1iv(this.addr,r),be(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Th,r[o])}function c0(i){switch(i){case 5126:return Wm;case 35664:return Xm;case 35665:return qm;case 35666:return Ym;case 35674:return $m;case 35675:return Km;case 35676:return Zm;case 5124:case 35670:return Jm;case 35667:case 35671:return jm;case 35668:case 35672:return Qm;case 35669:case 35673:return t0;case 5125:return e0;case 36294:return n0;case 36295:return i0;case 36296:return s0;case 35678:case 36198:case 36298:case 36306:case 35682:return r0;case 35679:case 36299:case 36307:return o0;case 35680:case 36300:case 36308:case 36293:return a0;case 36289:case 36303:case 36311:case 36292:return l0}}class h0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Vm(e.type)}}class u0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=c0(e.type)}}class d0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const ho=/(\w+)(\])?(\[|\.)?/g;function Fl(i,t){i.seq.push(t),i.map[t.id]=t}function f0(i,t,e){const n=i.name,s=n.length;for(ho.lastIndex=0;;){const r=ho.exec(n),o=ho.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Fl(e,c===void 0?new h0(a,i,t):new u0(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new d0(a),Fl(e,u)),e=u}}}class Sr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);f0(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Ol(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const p0=37297;let m0=0;function g0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Bl=new qt;function _0(i){Qt._getMatrix(Bl,Qt.workingColorSpace,i);const t=`mat3( ${Bl.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(i)){case Pr:return[t,"LinearTransferOETF"];case re:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function kl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+g0(i.getShaderSource(t),o)}else return s}function v0(i,t){const e=_0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function x0(i,t){let e;switch(t){case Zc:e="Linear";break;case Jc:e="Reinhard";break;case jc:e="Cineon";break;case Ma:e="ACESFilmic";break;case Qc:e="AgX";break;case th:e="Neutral";break;case Hu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ir=new N;function M0(){Qt.getLuminanceCoefficients(ir);const i=ir.x.toFixed(4),t=ir.y.toFixed(4),e=ir.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function y0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xs).join(`
`)}function S0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function b0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function xs(i){return i!==""}function zl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Gl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const E0=/^[ \t]*#include +<([\w\d./]+)>/gm;function ha(i){return i.replace(E0,T0)}const w0=new Map;function T0(i,t){let e=$t[t];if(e===void 0){const n=w0.get(t);if(n!==void 0)e=$t[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ha(e)}const A0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hl(i){return i.replace(A0,R0)}function R0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Vl(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function C0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===xa?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===$c?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Pn&&(t="SHADOWMAP_TYPE_VSM"),t}function P0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case qi:case Yi:t="ENVMAP_TYPE_CUBE";break;case Cr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function L0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Yi:t="ENVMAP_MODE_REFRACTION";break}return t}function I0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Kc:t="ENVMAP_BLENDING_MULTIPLY";break;case zu:t="ENVMAP_BLENDING_MIX";break;case Gu:t="ENVMAP_BLENDING_ADD";break}return t}function D0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function N0(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=C0(e),c=P0(e),h=L0(e),u=I0(e),d=D0(e),f=y0(e),g=S0(r),_=s.createProgram();let m,p,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(xs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(xs).join(`
`),p.length>0&&(p+=`
`)):(m=[Vl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xs).join(`
`),p=[Vl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Zn?"#define TONE_MAPPING":"",e.toneMapping!==Zn?$t.tonemapping_pars_fragment:"",e.toneMapping!==Zn?x0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,v0("linearToOutputTexel",e.outputColorSpace),M0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(xs).join(`
`)),o=ha(o),o=zl(o,e),o=Gl(o,e),a=ha(a),a=zl(a,e),a=Gl(a,e),o=Hl(o),a=Hl(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===il?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===il?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=E+m+o,v=E+p+a,F=Ol(s,s.VERTEX_SHADER,M),C=Ol(s,s.FRAGMENT_SHADER,v);s.attachShader(_,F),s.attachShader(_,C),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(P){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(_).trim(),D=s.getShaderInfoLog(F).trim(),k=s.getShaderInfoLog(C).trim();let q=!0,B=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,F,C);else{const W=kl(s,F,"vertex"),z=kl(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+U+`
`+W+`
`+z)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(D===""||k==="")&&(B=!1);B&&(P.diagnostics={runnable:q,programLog:U,vertexShader:{log:D,prefix:m},fragmentShader:{log:k,prefix:p}})}s.deleteShader(F),s.deleteShader(C),I=new Sr(s,_),S=b0(s,_)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(_,p0)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=m0++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=F,this.fragmentShader=C,this}let U0=0;class F0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new O0(t),e.set(t,n)),n}}class O0{constructor(t){this.id=U0++,this.code=t,this.usedTimes=0}}function B0(i,t,e,n,s,r,o){const a=new gh,l=new F0,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,x,P,U,D){const k=U.fog,q=D.geometry,B=S.isMeshStandardMaterial?U.environment:null,W=(S.isMeshStandardMaterial?e:t).get(S.envMap||B),z=W&&W.mapping===Cr?W.image.height:null,it=g[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const ht=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ut=ht!==void 0?ht.length:0;let mt=0;q.morphAttributes.position!==void 0&&(mt=1),q.morphAttributes.normal!==void 0&&(mt=2),q.morphAttributes.color!==void 0&&(mt=3);let St,R,Y,st;if(it){const se=mn[it];St=se.vertexShader,R=se.fragmentShader}else St=S.vertexShader,R=S.fragmentShader,l.update(S),Y=l.getVertexShaderID(S),st=l.getFragmentShaderID(S);const K=i.getRenderTarget(),pt=i.state.buffers.depth.getReversed(),Mt=D.isInstancedMesh===!0,Ut=D.isBatchedMesh===!0,It=!!S.map,X=!!S.matcap,Q=!!W,T=!!S.aoMap,dt=!!S.lightMap,tt=!!S.bumpMap,_t=!!S.normalMap,at=!!S.displacementMap,yt=!!S.emissiveMap,gt=!!S.metalnessMap,w=!!S.roughnessMap,y=S.anisotropy>0,$=S.clearcoat>0,j=S.dispersion>0,ot=S.iridescence>0,nt=S.sheen>0,Ct=S.transmission>0,Et=y&&!!S.anisotropyMap,Pt=$&&!!S.clearcoatMap,Kt=$&&!!S.clearcoatNormalMap,vt=$&&!!S.clearcoatRoughnessMap,Dt=ot&&!!S.iridescenceMap,Gt=ot&&!!S.iridescenceThicknessMap,Ht=nt&&!!S.sheenColorMap,Nt=nt&&!!S.sheenRoughnessMap,Jt=!!S.specularMap,Yt=!!S.specularColorMap,ce=!!S.specularIntensityMap,G=Ct&&!!S.transmissionMap,Tt=Ct&&!!S.thicknessMap,et=!!S.gradientMap,lt=!!S.alphaMap,Lt=S.alphaTest>0,At=!!S.alphaHash,Wt=!!S.extensions;let ve=Zn;S.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(ve=i.toneMapping);const Re={shaderID:it,shaderType:S.type,shaderName:S.name,vertexShader:St,fragmentShader:R,defines:S.defines,customVertexShaderID:Y,customFragmentShaderID:st,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Ut,batchingColor:Ut&&D._colorsTexture!==null,instancing:Mt,instancingColor:Mt&&D.instanceColor!==null,instancingMorph:Mt&&D.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:K===null?i.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Qi,alphaToCoverage:!!S.alphaToCoverage,map:It,matcap:X,envMap:Q,envMapMode:Q&&W.mapping,envMapCubeUVHeight:z,aoMap:T,lightMap:dt,bumpMap:tt,normalMap:_t,displacementMap:d&&at,emissiveMap:yt,normalMapObjectSpace:_t&&S.normalMapType===qu,normalMapTangentSpace:_t&&S.normalMapType===uh,metalnessMap:gt,roughnessMap:w,anisotropy:y,anisotropyMap:Et,clearcoat:$,clearcoatMap:Pt,clearcoatNormalMap:Kt,clearcoatRoughnessMap:vt,dispersion:j,iridescence:ot,iridescenceMap:Dt,iridescenceThicknessMap:Gt,sheen:nt,sheenColorMap:Ht,sheenRoughnessMap:Nt,specularMap:Jt,specularColorMap:Yt,specularIntensityMap:ce,transmission:Ct,transmissionMap:G,thicknessMap:Tt,gradientMap:et,opaque:S.transparent===!1&&S.blending===fi&&S.alphaToCoverage===!1,alphaMap:lt,alphaTest:Lt,alphaHash:At,combine:S.combine,mapUv:It&&_(S.map.channel),aoMapUv:T&&_(S.aoMap.channel),lightMapUv:dt&&_(S.lightMap.channel),bumpMapUv:tt&&_(S.bumpMap.channel),normalMapUv:_t&&_(S.normalMap.channel),displacementMapUv:at&&_(S.displacementMap.channel),emissiveMapUv:yt&&_(S.emissiveMap.channel),metalnessMapUv:gt&&_(S.metalnessMap.channel),roughnessMapUv:w&&_(S.roughnessMap.channel),anisotropyMapUv:Et&&_(S.anisotropyMap.channel),clearcoatMapUv:Pt&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Kt&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:vt&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Dt&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Gt&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ht&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&_(S.sheenRoughnessMap.channel),specularMapUv:Jt&&_(S.specularMap.channel),specularColorMapUv:Yt&&_(S.specularColorMap.channel),specularIntensityMapUv:ce&&_(S.specularIntensityMap.channel),transmissionMapUv:G&&_(S.transmissionMap.channel),thicknessMapUv:Tt&&_(S.thicknessMap.channel),alphaMapUv:lt&&_(S.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(_t||y),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!q.attributes.uv&&(It||lt),fog:!!k,useFog:S.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:pt,skinning:D.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:ut,morphTextureStride:mt,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:ve,decodeVideoTexture:It&&S.map.isVideoTexture===!0&&Qt.getTransfer(S.map.colorSpace)===re,decodeVideoTextureEmissive:yt&&S.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(S.emissiveMap.colorSpace)===re,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===sn,flipSided:S.side===Ie,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Wt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Wt&&S.extensions.multiDraw===!0||Ut)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Re.vertexUv1s=c.has(1),Re.vertexUv2s=c.has(2),Re.vertexUv3s=c.has(3),c.clear(),Re}function p(S){const x=[];if(S.shaderID?x.push(S.shaderID):(x.push(S.customVertexShaderID),x.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)x.push(P),x.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(E(x,S),M(x,S),x.push(i.outputColorSpace)),x.push(S.customProgramCacheKey),x.join()}function E(S,x){S.push(x.precision),S.push(x.outputColorSpace),S.push(x.envMapMode),S.push(x.envMapCubeUVHeight),S.push(x.mapUv),S.push(x.alphaMapUv),S.push(x.lightMapUv),S.push(x.aoMapUv),S.push(x.bumpMapUv),S.push(x.normalMapUv),S.push(x.displacementMapUv),S.push(x.emissiveMapUv),S.push(x.metalnessMapUv),S.push(x.roughnessMapUv),S.push(x.anisotropyMapUv),S.push(x.clearcoatMapUv),S.push(x.clearcoatNormalMapUv),S.push(x.clearcoatRoughnessMapUv),S.push(x.iridescenceMapUv),S.push(x.iridescenceThicknessMapUv),S.push(x.sheenColorMapUv),S.push(x.sheenRoughnessMapUv),S.push(x.specularMapUv),S.push(x.specularColorMapUv),S.push(x.specularIntensityMapUv),S.push(x.transmissionMapUv),S.push(x.thicknessMapUv),S.push(x.combine),S.push(x.fogExp2),S.push(x.sizeAttenuation),S.push(x.morphTargetsCount),S.push(x.morphAttributeCount),S.push(x.numDirLights),S.push(x.numPointLights),S.push(x.numSpotLights),S.push(x.numSpotLightMaps),S.push(x.numHemiLights),S.push(x.numRectAreaLights),S.push(x.numDirLightShadows),S.push(x.numPointLightShadows),S.push(x.numSpotLightShadows),S.push(x.numSpotLightShadowsWithMaps),S.push(x.numLightProbes),S.push(x.shadowMapType),S.push(x.toneMapping),S.push(x.numClippingPlanes),S.push(x.numClipIntersection),S.push(x.depthPacking)}function M(S,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){const x=g[S.type];let P;if(x){const U=mn[x];P=As.clone(U.uniforms)}else P=S.uniforms;return P}function F(S,x){let P;for(let U=0,D=h.length;U<D;U++){const k=h[U];if(k.cacheKey===x){P=k,++P.usedTimes;break}}return P===void 0&&(P=new N0(i,x,S,r),h.push(P)),P}function C(S){if(--S.usedTimes===0){const x=h.indexOf(S);h[x]=h[h.length-1],h.pop(),S.destroy()}}function A(S){l.remove(S)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:F,releaseProgram:C,releaseShaderCache:A,programs:h,dispose:I}}function k0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function z0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Wl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Xl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,g,_,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(u,d,f,g,_,m){const p=o(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||z0),n.length>1&&n.sort(d||Wl),s.length>1&&s.sort(d||Wl)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function G0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Xl,i.set(n,[o])):s>=r.length?(o=new Xl,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function H0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new ft};break;case"SpotLight":e={position:new N,direction:new N,color:new ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new ft,groundColor:new ft};break;case"RectAreaLight":e={color:new ft,position:new N,halfWidth:new N,halfHeight:new N};break}return i[t.id]=e,e}}}function V0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let W0=0;function X0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function q0(i){const t=new H0,e=V0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);const s=new N,r=new ie,o=new ie;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,E=0,M=0,v=0,F=0,C=0,A=0;c.sort(X0);for(let S=0,x=c.length;S<x;S++){const P=c[S],U=P.color,D=P.intensity,k=P.distance,q=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=U.r*D,u+=U.g*D,d+=U.b*D;else if(P.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(P.sh.coefficients[B],D);A++}else if(P.isDirectionalLight){const B=t.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const W=P.shadow,z=e.get(P);z.shadowIntensity=W.intensity,z.shadowBias=W.bias,z.shadowNormalBias=W.normalBias,z.shadowRadius=W.radius,z.shadowMapSize=W.mapSize,n.directionalShadow[f]=z,n.directionalShadowMap[f]=q,n.directionalShadowMatrix[f]=P.shadow.matrix,E++}n.directional[f]=B,f++}else if(P.isSpotLight){const B=t.get(P);B.position.setFromMatrixPosition(P.matrixWorld),B.color.copy(U).multiplyScalar(D),B.distance=k,B.coneCos=Math.cos(P.angle),B.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),B.decay=P.decay,n.spot[_]=B;const W=P.shadow;if(P.map&&(n.spotLightMap[F]=P.map,F++,W.updateMatrices(P),P.castShadow&&C++),n.spotLightMatrix[_]=W.matrix,P.castShadow){const z=e.get(P);z.shadowIntensity=W.intensity,z.shadowBias=W.bias,z.shadowNormalBias=W.normalBias,z.shadowRadius=W.radius,z.shadowMapSize=W.mapSize,n.spotShadow[_]=z,n.spotShadowMap[_]=q,v++}_++}else if(P.isRectAreaLight){const B=t.get(P);B.color.copy(U).multiplyScalar(D),B.halfWidth.set(P.width*.5,0,0),B.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=B,m++}else if(P.isPointLight){const B=t.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity),B.distance=P.distance,B.decay=P.decay,P.castShadow){const W=P.shadow,z=e.get(P);z.shadowIntensity=W.intensity,z.shadowBias=W.bias,z.shadowNormalBias=W.normalBias,z.shadowRadius=W.radius,z.shadowMapSize=W.mapSize,z.shadowCameraNear=W.camera.near,z.shadowCameraFar=W.camera.far,n.pointShadow[g]=z,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=P.shadow.matrix,M++}n.point[g]=B,g++}else if(P.isHemisphereLight){const B=t.get(P);B.skyColor.copy(P.color).multiplyScalar(D),B.groundColor.copy(P.groundColor).multiplyScalar(D),n.hemi[p]=B,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=wt.LTC_FLOAT_1,n.rectAreaLTC2=wt.LTC_FLOAT_2):(n.rectAreaLTC1=wt.LTC_HALF_1,n.rectAreaLTC2=wt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const I=n.hash;(I.directionalLength!==f||I.pointLength!==g||I.spotLength!==_||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==E||I.numPointShadows!==M||I.numSpotShadows!==v||I.numSpotMaps!==F||I.numLightProbes!==A)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=v+F-C,n.spotLightMap.length=F,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=A,I.directionalLength=f,I.pointLength=g,I.spotLength=_,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=E,I.numPointShadows=M,I.numSpotShadows=v,I.numSpotMaps=F,I.numLightProbes=A,n.version=W0++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,E=c.length;p<E;p++){const M=c[p];if(M.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),u++}else if(M.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),f++}else if(M.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(M.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function ql(i){const t=new q0(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Y0(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new ql(i),t.set(s,[a])):r>=o.length?(a=new ql(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class $0 extends jn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Wu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class K0 extends jn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Z0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,J0=`uniform sampler2D shadow_pass;
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
}`;function j0(i,t,e){let n=new Ca;const s=new ct,r=new ct,o=new le,a=new $0({depthPacking:Xu}),l=new K0,c={},h=e.maxTextureSize,u={[Jn]:Ie,[Ie]:Jn,[sn]:sn},d=new Le({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:Z0,fragmentShader:J0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new xe;g.setAttribute("position",new Ne(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new zt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xa;let p=this.type;this.render=function(C,A,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const S=i.getRenderTarget(),x=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Fn),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const D=p!==Pn&&this.type===Pn,k=p===Pn&&this.type!==Pn;for(let q=0,B=C.length;q<B;q++){const W=C[q],z=W.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const it=z.getFrameExtents();if(s.multiply(it),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/it.x),s.x=r.x*it.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/it.y),s.y=r.y*it.y,z.mapSize.y=r.y)),z.map===null||D===!0||k===!0){const ut=this.type!==Pn?{minFilter:ke,magFilter:ke}:{};z.map!==null&&z.map.dispose(),z.map=new on(s.x,s.y,ut),z.map.texture.name=W.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();const ht=z.getViewportCount();for(let ut=0;ut<ht;ut++){const mt=z.getViewport(ut);o.set(r.x*mt.x,r.y*mt.y,r.x*mt.z,r.y*mt.w),U.viewport(o),z.updateMatrices(W,ut),n=z.getFrustum(),v(A,I,z.camera,W,this.type)}z.isPointLightShadow!==!0&&this.type===Pn&&E(z,I),z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,x,P)};function E(C,A){const I=t.update(_);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new on(s.x,s.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(A,null,I,d,_,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(A,null,I,f,_,null)}function M(C,A,I,S){let x=null;const P=I.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(P!==void 0)x=P;else if(x=I.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const U=x.uuid,D=A.uuid;let k=c[U];k===void 0&&(k={},c[U]=k);let q=k[D];q===void 0&&(q=x.clone(),k[D]=q,A.addEventListener("dispose",F)),x=q}if(x.visible=A.visible,x.wireframe=A.wireframe,S===Pn?x.side=A.shadowSide!==null?A.shadowSide:A.side:x.side=A.shadowSide!==null?A.shadowSide:u[A.side],x.alphaMap=A.alphaMap,x.alphaTest=A.alphaTest,x.map=A.map,x.clipShadows=A.clipShadows,x.clippingPlanes=A.clippingPlanes,x.clipIntersection=A.clipIntersection,x.displacementMap=A.displacementMap,x.displacementScale=A.displacementScale,x.displacementBias=A.displacementBias,x.wireframeLinewidth=A.wireframeLinewidth,x.linewidth=A.linewidth,I.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const U=i.properties.get(x);U.light=I}return x}function v(C,A,I,S,x){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&x===Pn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,C.matrixWorld);const D=t.update(C),k=C.material;if(Array.isArray(k)){const q=D.groups;for(let B=0,W=q.length;B<W;B++){const z=q[B],it=k[z.materialIndex];if(it&&it.visible){const ht=M(C,it,S,x);C.onBeforeShadow(i,C,A,I,D,ht,z),i.renderBufferDirect(I,null,D,ht,C,z),C.onAfterShadow(i,C,A,I,D,ht,z)}}}else if(k.visible){const q=M(C,k,S,x);C.onBeforeShadow(i,C,A,I,D,q,null),i.renderBufferDirect(I,null,D,q,C,null),C.onAfterShadow(i,C,A,I,D,q,null)}}const U=C.children;for(let D=0,k=U.length;D<k;D++)v(U[D],A,I,S,x)}function F(C){C.target.removeEventListener("dispose",F);for(const I in c){const S=c[I],x=C.target.uuid;x in S&&(S[x].dispose(),delete S[x])}}}const Q0={[wo]:To,[Ao]:Po,[Ro]:Lo,[Xi]:Co,[To]:wo,[Po]:Ao,[Lo]:Ro,[Co]:Xi};function tg(i,t){function e(){let G=!1;const Tt=new le;let et=null;const lt=new le(0,0,0,0);return{setMask:function(Lt){et!==Lt&&!G&&(i.colorMask(Lt,Lt,Lt,Lt),et=Lt)},setLocked:function(Lt){G=Lt},setClear:function(Lt,At,Wt,ve,Re){Re===!0&&(Lt*=ve,At*=ve,Wt*=ve),Tt.set(Lt,At,Wt,ve),lt.equals(Tt)===!1&&(i.clearColor(Lt,At,Wt,ve),lt.copy(Tt))},reset:function(){G=!1,et=null,lt.set(-1,0,0,0)}}}function n(){let G=!1,Tt=!1,et=null,lt=null,Lt=null;return{setReversed:function(At){if(Tt!==At){const Wt=t.get("EXT_clip_control");Tt?Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.ZERO_TO_ONE_EXT):Wt.clipControlEXT(Wt.LOWER_LEFT_EXT,Wt.NEGATIVE_ONE_TO_ONE_EXT);const ve=Lt;Lt=null,this.setClear(ve)}Tt=At},getReversed:function(){return Tt},setTest:function(At){At?K(i.DEPTH_TEST):pt(i.DEPTH_TEST)},setMask:function(At){et!==At&&!G&&(i.depthMask(At),et=At)},setFunc:function(At){if(Tt&&(At=Q0[At]),lt!==At){switch(At){case wo:i.depthFunc(i.NEVER);break;case To:i.depthFunc(i.ALWAYS);break;case Ao:i.depthFunc(i.LESS);break;case Xi:i.depthFunc(i.LEQUAL);break;case Ro:i.depthFunc(i.EQUAL);break;case Co:i.depthFunc(i.GEQUAL);break;case Po:i.depthFunc(i.GREATER);break;case Lo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}lt=At}},setLocked:function(At){G=At},setClear:function(At){Lt!==At&&(Tt&&(At=1-At),i.clearDepth(At),Lt=At)},reset:function(){G=!1,et=null,lt=null,Lt=null,Tt=!1}}}function s(){let G=!1,Tt=null,et=null,lt=null,Lt=null,At=null,Wt=null,ve=null,Re=null;return{setTest:function(se){G||(se?K(i.STENCIL_TEST):pt(i.STENCIL_TEST))},setMask:function(se){Tt!==se&&!G&&(i.stencilMask(se),Tt=se)},setFunc:function(se,an,bn){(et!==se||lt!==an||Lt!==bn)&&(i.stencilFunc(se,an,bn),et=se,lt=an,Lt=bn)},setOp:function(se,an,bn){(At!==se||Wt!==an||ve!==bn)&&(i.stencilOp(se,an,bn),At=se,Wt=an,ve=bn)},setLocked:function(se){G=se},setClear:function(se){Re!==se&&(i.clearStencil(se),Re=se)},reset:function(){G=!1,Tt=null,et=null,lt=null,Lt=null,At=null,Wt=null,ve=null,Re=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,E=null,M=null,v=null,F=null,C=null,A=new ft(0,0,0),I=0,S=!1,x=null,P=null,U=null,D=null,k=null;const q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,W=0;const z=i.getParameter(i.VERSION);z.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(z)[1]),B=W>=1):z.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),B=W>=2);let it=null,ht={};const ut=i.getParameter(i.SCISSOR_BOX),mt=i.getParameter(i.VIEWPORT),St=new le().fromArray(ut),R=new le().fromArray(mt);function Y(G,Tt,et,lt){const Lt=new Uint8Array(4),At=i.createTexture();i.bindTexture(G,At),i.texParameteri(G,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(G,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Wt=0;Wt<et;Wt++)G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?i.texImage3D(Tt,0,i.RGBA,1,1,lt,0,i.RGBA,i.UNSIGNED_BYTE,Lt):i.texImage2D(Tt+Wt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Lt);return At}const st={};st[i.TEXTURE_2D]=Y(i.TEXTURE_2D,i.TEXTURE_2D,1),st[i.TEXTURE_CUBE_MAP]=Y(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[i.TEXTURE_2D_ARRAY]=Y(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),st[i.TEXTURE_3D]=Y(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),K(i.DEPTH_TEST),o.setFunc(Xi),tt(!1),_t(Qa),K(i.CULL_FACE),T(Fn);function K(G){h[G]!==!0&&(i.enable(G),h[G]=!0)}function pt(G){h[G]!==!1&&(i.disable(G),h[G]=!1)}function Mt(G,Tt){return u[G]!==Tt?(i.bindFramebuffer(G,Tt),u[G]=Tt,G===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Tt),G===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Tt),!0):!1}function Ut(G,Tt){let et=f,lt=!1;if(G){et=d.get(Tt),et===void 0&&(et=[],d.set(Tt,et));const Lt=G.textures;if(et.length!==Lt.length||et[0]!==i.COLOR_ATTACHMENT0){for(let At=0,Wt=Lt.length;At<Wt;At++)et[At]=i.COLOR_ATTACHMENT0+At;et.length=Lt.length,lt=!0}}else et[0]!==i.BACK&&(et[0]=i.BACK,lt=!0);lt&&i.drawBuffers(et)}function It(G){return g!==G?(i.useProgram(G),g=G,!0):!1}const X={[ci]:i.FUNC_ADD,[bu]:i.FUNC_SUBTRACT,[Eu]:i.FUNC_REVERSE_SUBTRACT};X[wu]=i.MIN,X[Tu]=i.MAX;const Q={[Au]:i.ZERO,[Ru]:i.ONE,[Cu]:i.SRC_COLOR,[bo]:i.SRC_ALPHA,[Uu]:i.SRC_ALPHA_SATURATE,[Du]:i.DST_COLOR,[Lu]:i.DST_ALPHA,[Pu]:i.ONE_MINUS_SRC_COLOR,[Eo]:i.ONE_MINUS_SRC_ALPHA,[Nu]:i.ONE_MINUS_DST_COLOR,[Iu]:i.ONE_MINUS_DST_ALPHA,[Fu]:i.CONSTANT_COLOR,[Ou]:i.ONE_MINUS_CONSTANT_COLOR,[Bu]:i.CONSTANT_ALPHA,[ku]:i.ONE_MINUS_CONSTANT_ALPHA};function T(G,Tt,et,lt,Lt,At,Wt,ve,Re,se){if(G===Fn){_===!0&&(pt(i.BLEND),_=!1);return}if(_===!1&&(K(i.BLEND),_=!0),G!==Su){if(G!==m||se!==S){if((p!==ci||v!==ci)&&(i.blendEquation(i.FUNC_ADD),p=ci,v=ci),se)switch(G){case fi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _n:i.blendFunc(i.ONE,i.ONE);break;case tl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case el:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case fi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _n:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case tl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case el:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}E=null,M=null,F=null,C=null,A.set(0,0,0),I=0,m=G,S=se}return}Lt=Lt||Tt,At=At||et,Wt=Wt||lt,(Tt!==p||Lt!==v)&&(i.blendEquationSeparate(X[Tt],X[Lt]),p=Tt,v=Lt),(et!==E||lt!==M||At!==F||Wt!==C)&&(i.blendFuncSeparate(Q[et],Q[lt],Q[At],Q[Wt]),E=et,M=lt,F=At,C=Wt),(ve.equals(A)===!1||Re!==I)&&(i.blendColor(ve.r,ve.g,ve.b,Re),A.copy(ve),I=Re),m=G,S=!1}function dt(G,Tt){G.side===sn?pt(i.CULL_FACE):K(i.CULL_FACE);let et=G.side===Ie;Tt&&(et=!et),tt(et),G.blending===fi&&G.transparent===!1?T(Fn):T(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),o.setFunc(G.depthFunc),o.setTest(G.depthTest),o.setMask(G.depthWrite),r.setMask(G.colorWrite);const lt=G.stencilWrite;a.setTest(lt),lt&&(a.setMask(G.stencilWriteMask),a.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),a.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),yt(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?K(i.SAMPLE_ALPHA_TO_COVERAGE):pt(i.SAMPLE_ALPHA_TO_COVERAGE)}function tt(G){x!==G&&(G?i.frontFace(i.CW):i.frontFace(i.CCW),x=G)}function _t(G){G!==Mu?(K(i.CULL_FACE),G!==P&&(G===Qa?i.cullFace(i.BACK):G===yu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pt(i.CULL_FACE),P=G}function at(G){G!==U&&(B&&i.lineWidth(G),U=G)}function yt(G,Tt,et){G?(K(i.POLYGON_OFFSET_FILL),(D!==Tt||k!==et)&&(i.polygonOffset(Tt,et),D=Tt,k=et)):pt(i.POLYGON_OFFSET_FILL)}function gt(G){G?K(i.SCISSOR_TEST):pt(i.SCISSOR_TEST)}function w(G){G===void 0&&(G=i.TEXTURE0+q-1),it!==G&&(i.activeTexture(G),it=G)}function y(G,Tt,et){et===void 0&&(it===null?et=i.TEXTURE0+q-1:et=it);let lt=ht[et];lt===void 0&&(lt={type:void 0,texture:void 0},ht[et]=lt),(lt.type!==G||lt.texture!==Tt)&&(it!==et&&(i.activeTexture(et),it=et),i.bindTexture(G,Tt||st[G]),lt.type=G,lt.texture=Tt)}function $(){const G=ht[it];G!==void 0&&G.type!==void 0&&(i.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ot(){try{i.compressedTexImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function nt(){try{i.texSubImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ct(){try{i.texSubImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Et(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Pt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Kt(){try{i.texStorage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function vt(){try{i.texStorage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Dt(){try{i.texImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Gt(){try{i.texImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ht(G){St.equals(G)===!1&&(i.scissor(G.x,G.y,G.z,G.w),St.copy(G))}function Nt(G){R.equals(G)===!1&&(i.viewport(G.x,G.y,G.z,G.w),R.copy(G))}function Jt(G,Tt){let et=c.get(Tt);et===void 0&&(et=new WeakMap,c.set(Tt,et));let lt=et.get(G);lt===void 0&&(lt=i.getUniformBlockIndex(Tt,G.name),et.set(G,lt))}function Yt(G,Tt){const lt=c.get(Tt).get(G);l.get(Tt)!==lt&&(i.uniformBlockBinding(Tt,lt,G.__bindingPointIndex),l.set(Tt,lt))}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},it=null,ht={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,E=null,M=null,v=null,F=null,C=null,A=new ft(0,0,0),I=0,S=!1,x=null,P=null,U=null,D=null,k=null,St.set(0,0,i.canvas.width,i.canvas.height),R.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:K,disable:pt,bindFramebuffer:Mt,drawBuffers:Ut,useProgram:It,setBlending:T,setMaterial:dt,setFlipSided:tt,setCullFace:_t,setLineWidth:at,setPolygonOffset:yt,setScissorTest:gt,activeTexture:w,bindTexture:y,unbindTexture:$,compressedTexImage2D:j,compressedTexImage3D:ot,texImage2D:Dt,texImage3D:Gt,updateUBOMapping:Jt,uniformBlockBinding:Yt,texStorage2D:Kt,texStorage3D:vt,texSubImage2D:nt,texSubImage3D:Ct,compressedTexSubImage2D:Et,compressedTexSubImage3D:Pt,scissor:Ht,viewport:Nt,reset:ce}}function Yl(i,t,e,n){const s=eg(n);switch(e){case rh:return i*t;case ah:return i*t;case lh:return i*t*2;case Ea:return i*t/s.components*s.byteLength;case wa:return i*t/s.components*s.byteLength;case ch:return i*t*2/s.components*s.byteLength;case Ta:return i*t*2/s.components*s.byteLength;case oh:return i*t*3/s.components*s.byteLength;case fn:return i*t*4/s.components*s.byteLength;case Aa:return i*t*4/s.components*s.byteLength;case _r:case vr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case xr:case Mr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Fo:case Bo:return Math.max(i,16)*Math.max(t,8)/4;case Uo:case Oo:return Math.max(i,8)*Math.max(t,8)/2;case ko:case zo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Go:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ho:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Vo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Wo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Xo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case qo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Yo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case $o:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ko:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Zo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Jo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case jo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Qo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ta:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ea:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case yr:case na:case ia:return Math.ceil(i/4)*Math.ceil(t/4)*16;case hh:case sa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ra:case oa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function eg(i){switch(i){case kn:case nh:return{byteLength:1,components:1};case Ts:case ih:case Mn:return{byteLength:2,components:1};case Sa:case ba:return{byteLength:2,components:4};case gi:case ya:case xn:return{byteLength:4,components:1};case sh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function ng(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ct,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,y){return f?new OffscreenCanvas(w,y):wr("canvas")}function _(w,y,$){let j=1;const ot=gt(w);if((ot.width>$||ot.height>$)&&(j=$/Math.max(ot.width,ot.height)),j<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const nt=Math.floor(j*ot.width),Ct=Math.floor(j*ot.height);u===void 0&&(u=g(nt,Ct));const Et=y?g(nt,Ct):u;return Et.width=nt,Et.height=Ct,Et.getContext("2d").drawImage(w,0,0,nt,Ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ot.width+"x"+ot.height+") to ("+nt+"x"+Ct+")."),Et}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ot.width+"x"+ot.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){i.generateMipmap(w)}function E(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(w,y,$,j,ot=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let nt=y;if(y===i.RED&&($===i.FLOAT&&(nt=i.R32F),$===i.HALF_FLOAT&&(nt=i.R16F),$===i.UNSIGNED_BYTE&&(nt=i.R8)),y===i.RED_INTEGER&&($===i.UNSIGNED_BYTE&&(nt=i.R8UI),$===i.UNSIGNED_SHORT&&(nt=i.R16UI),$===i.UNSIGNED_INT&&(nt=i.R32UI),$===i.BYTE&&(nt=i.R8I),$===i.SHORT&&(nt=i.R16I),$===i.INT&&(nt=i.R32I)),y===i.RG&&($===i.FLOAT&&(nt=i.RG32F),$===i.HALF_FLOAT&&(nt=i.RG16F),$===i.UNSIGNED_BYTE&&(nt=i.RG8)),y===i.RG_INTEGER&&($===i.UNSIGNED_BYTE&&(nt=i.RG8UI),$===i.UNSIGNED_SHORT&&(nt=i.RG16UI),$===i.UNSIGNED_INT&&(nt=i.RG32UI),$===i.BYTE&&(nt=i.RG8I),$===i.SHORT&&(nt=i.RG16I),$===i.INT&&(nt=i.RG32I)),y===i.RGB_INTEGER&&($===i.UNSIGNED_BYTE&&(nt=i.RGB8UI),$===i.UNSIGNED_SHORT&&(nt=i.RGB16UI),$===i.UNSIGNED_INT&&(nt=i.RGB32UI),$===i.BYTE&&(nt=i.RGB8I),$===i.SHORT&&(nt=i.RGB16I),$===i.INT&&(nt=i.RGB32I)),y===i.RGBA_INTEGER&&($===i.UNSIGNED_BYTE&&(nt=i.RGBA8UI),$===i.UNSIGNED_SHORT&&(nt=i.RGBA16UI),$===i.UNSIGNED_INT&&(nt=i.RGBA32UI),$===i.BYTE&&(nt=i.RGBA8I),$===i.SHORT&&(nt=i.RGBA16I),$===i.INT&&(nt=i.RGBA32I)),y===i.RGB&&$===i.UNSIGNED_INT_5_9_9_9_REV&&(nt=i.RGB9_E5),y===i.RGBA){const Ct=ot?Pr:Qt.getTransfer(j);$===i.FLOAT&&(nt=i.RGBA32F),$===i.HALF_FLOAT&&(nt=i.RGBA16F),$===i.UNSIGNED_BYTE&&(nt=Ct===re?i.SRGB8_ALPHA8:i.RGBA8),$===i.UNSIGNED_SHORT_4_4_4_4&&(nt=i.RGBA4),$===i.UNSIGNED_SHORT_5_5_5_1&&(nt=i.RGB5_A1)}return(nt===i.R16F||nt===i.R32F||nt===i.RG16F||nt===i.RG32F||nt===i.RGBA16F||nt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),nt}function v(w,y){let $;return w?y===null||y===gi||y===$i?$=i.DEPTH24_STENCIL8:y===xn?$=i.DEPTH32F_STENCIL8:y===Ts&&($=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===gi||y===$i?$=i.DEPTH_COMPONENT24:y===xn?$=i.DEPTH_COMPONENT32F:y===Ts&&($=i.DEPTH_COMPONENT16),$}function F(w,y){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==ke&&w.minFilter!==vn?Math.log2(Math.max(y.width,y.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?y.mipmaps.length:1}function C(w){const y=w.target;y.removeEventListener("dispose",C),I(y),y.isVideoTexture&&h.delete(y)}function A(w){const y=w.target;y.removeEventListener("dispose",A),x(y)}function I(w){const y=n.get(w);if(y.__webglInit===void 0)return;const $=w.source,j=d.get($);if(j){const ot=j[y.__cacheKey];ot.usedTimes--,ot.usedTimes===0&&S(w),Object.keys(j).length===0&&d.delete($)}n.remove(w)}function S(w){const y=n.get(w);i.deleteTexture(y.__webglTexture);const $=w.source,j=d.get($);delete j[y.__cacheKey],o.memory.textures--}function x(w){const y=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(y.__webglFramebuffer[j]))for(let ot=0;ot<y.__webglFramebuffer[j].length;ot++)i.deleteFramebuffer(y.__webglFramebuffer[j][ot]);else i.deleteFramebuffer(y.__webglFramebuffer[j]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[j])}else{if(Array.isArray(y.__webglFramebuffer))for(let j=0;j<y.__webglFramebuffer.length;j++)i.deleteFramebuffer(y.__webglFramebuffer[j]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let j=0;j<y.__webglColorRenderbuffer.length;j++)y.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[j]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const $=w.textures;for(let j=0,ot=$.length;j<ot;j++){const nt=n.get($[j]);nt.__webglTexture&&(i.deleteTexture(nt.__webglTexture),o.memory.textures--),n.remove($[j])}n.remove(w)}let P=0;function U(){P=0}function D(){const w=P;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),P+=1,w}function k(w){const y=[];return y.push(w.wrapS),y.push(w.wrapT),y.push(w.wrapR||0),y.push(w.magFilter),y.push(w.minFilter),y.push(w.anisotropy),y.push(w.internalFormat),y.push(w.format),y.push(w.type),y.push(w.generateMipmaps),y.push(w.premultiplyAlpha),y.push(w.flipY),y.push(w.unpackAlignment),y.push(w.colorSpace),y.join()}function q(w,y){const $=n.get(w);if(w.isVideoTexture&&at(w),w.isRenderTargetTexture===!1&&w.version>0&&$.__version!==w.version){const j=w.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{R($,w,y);return}}e.bindTexture(i.TEXTURE_2D,$.__webglTexture,i.TEXTURE0+y)}function B(w,y){const $=n.get(w);if(w.version>0&&$.__version!==w.version){R($,w,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,$.__webglTexture,i.TEXTURE0+y)}function W(w,y){const $=n.get(w);if(w.version>0&&$.__version!==w.version){R($,w,y);return}e.bindTexture(i.TEXTURE_3D,$.__webglTexture,i.TEXTURE0+y)}function z(w,y){const $=n.get(w);if(w.version>0&&$.__version!==w.version){Y($,w,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture,i.TEXTURE0+y)}const it={[mi]:i.REPEAT,[ui]:i.CLAMP_TO_EDGE,[No]:i.MIRRORED_REPEAT},ht={[ke]:i.NEAREST,[Vu]:i.NEAREST_MIPMAP_NEAREST,[Os]:i.NEAREST_MIPMAP_LINEAR,[vn]:i.LINEAR,[Fr]:i.LINEAR_MIPMAP_NEAREST,[di]:i.LINEAR_MIPMAP_LINEAR},ut={[Yu]:i.NEVER,[Qu]:i.ALWAYS,[$u]:i.LESS,[dh]:i.LEQUAL,[Ku]:i.EQUAL,[ju]:i.GEQUAL,[Zu]:i.GREATER,[Ju]:i.NOTEQUAL};function mt(w,y){if(y.type===xn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===vn||y.magFilter===Fr||y.magFilter===Os||y.magFilter===di||y.minFilter===vn||y.minFilter===Fr||y.minFilter===Os||y.minFilter===di)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,it[y.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,it[y.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,it[y.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,ht[y.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,ht[y.minFilter]),y.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ut[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===ke||y.minFilter!==Os&&y.minFilter!==di||y.type===xn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const $=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function St(w,y){let $=!1;w.__webglInit===void 0&&(w.__webglInit=!0,y.addEventListener("dispose",C));const j=y.source;let ot=d.get(j);ot===void 0&&(ot={},d.set(j,ot));const nt=k(y);if(nt!==w.__cacheKey){ot[nt]===void 0&&(ot[nt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,$=!0),ot[nt].usedTimes++;const Ct=ot[w.__cacheKey];Ct!==void 0&&(ot[w.__cacheKey].usedTimes--,Ct.usedTimes===0&&S(y)),w.__cacheKey=nt,w.__webglTexture=ot[nt].texture}return $}function R(w,y,$){let j=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(j=i.TEXTURE_3D);const ot=St(w,y),nt=y.source;e.bindTexture(j,w.__webglTexture,i.TEXTURE0+$);const Ct=n.get(nt);if(nt.version!==Ct.__version||ot===!0){e.activeTexture(i.TEXTURE0+$);const Et=Qt.getPrimaries(Qt.workingColorSpace),Pt=y.colorSpace===Ln?null:Qt.getPrimaries(y.colorSpace),Kt=y.colorSpace===Ln||Et===Pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Kt);let vt=_(y.image,!1,s.maxTextureSize);vt=yt(y,vt);const Dt=r.convert(y.format,y.colorSpace),Gt=r.convert(y.type);let Ht=M(y.internalFormat,Dt,Gt,y.colorSpace,y.isVideoTexture);mt(j,y);let Nt;const Jt=y.mipmaps,Yt=y.isVideoTexture!==!0,ce=Ct.__version===void 0||ot===!0,G=nt.dataReady,Tt=F(y,vt);if(y.isDepthTexture)Ht=v(y.format===Ki,y.type),ce&&(Yt?e.texStorage2D(i.TEXTURE_2D,1,Ht,vt.width,vt.height):e.texImage2D(i.TEXTURE_2D,0,Ht,vt.width,vt.height,0,Dt,Gt,null));else if(y.isDataTexture)if(Jt.length>0){Yt&&ce&&e.texStorage2D(i.TEXTURE_2D,Tt,Ht,Jt[0].width,Jt[0].height);for(let et=0,lt=Jt.length;et<lt;et++)Nt=Jt[et],Yt?G&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,Nt.width,Nt.height,Dt,Gt,Nt.data):e.texImage2D(i.TEXTURE_2D,et,Ht,Nt.width,Nt.height,0,Dt,Gt,Nt.data);y.generateMipmaps=!1}else Yt?(ce&&e.texStorage2D(i.TEXTURE_2D,Tt,Ht,vt.width,vt.height),G&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,vt.width,vt.height,Dt,Gt,vt.data)):e.texImage2D(i.TEXTURE_2D,0,Ht,vt.width,vt.height,0,Dt,Gt,vt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Yt&&ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Tt,Ht,Jt[0].width,Jt[0].height,vt.depth);for(let et=0,lt=Jt.length;et<lt;et++)if(Nt=Jt[et],y.format!==fn)if(Dt!==null)if(Yt){if(G)if(y.layerUpdates.size>0){const Lt=Yl(Nt.width,Nt.height,y.format,y.type);for(const At of y.layerUpdates){const Wt=Nt.data.subarray(At*Lt/Nt.data.BYTES_PER_ELEMENT,(At+1)*Lt/Nt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,At,Nt.width,Nt.height,1,Dt,Wt)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,Nt.width,Nt.height,vt.depth,Dt,Nt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,et,Ht,Nt.width,Nt.height,vt.depth,0,Nt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Yt?G&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,et,0,0,0,Nt.width,Nt.height,vt.depth,Dt,Gt,Nt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,et,Ht,Nt.width,Nt.height,vt.depth,0,Dt,Gt,Nt.data)}else{Yt&&ce&&e.texStorage2D(i.TEXTURE_2D,Tt,Ht,Jt[0].width,Jt[0].height);for(let et=0,lt=Jt.length;et<lt;et++)Nt=Jt[et],y.format!==fn?Dt!==null?Yt?G&&e.compressedTexSubImage2D(i.TEXTURE_2D,et,0,0,Nt.width,Nt.height,Dt,Nt.data):e.compressedTexImage2D(i.TEXTURE_2D,et,Ht,Nt.width,Nt.height,0,Nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Yt?G&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,Nt.width,Nt.height,Dt,Gt,Nt.data):e.texImage2D(i.TEXTURE_2D,et,Ht,Nt.width,Nt.height,0,Dt,Gt,Nt.data)}else if(y.isDataArrayTexture)if(Yt){if(ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Tt,Ht,vt.width,vt.height,vt.depth),G)if(y.layerUpdates.size>0){const et=Yl(vt.width,vt.height,y.format,y.type);for(const lt of y.layerUpdates){const Lt=vt.data.subarray(lt*et/vt.data.BYTES_PER_ELEMENT,(lt+1)*et/vt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,lt,vt.width,vt.height,1,Dt,Gt,Lt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,vt.width,vt.height,vt.depth,Dt,Gt,vt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ht,vt.width,vt.height,vt.depth,0,Dt,Gt,vt.data);else if(y.isData3DTexture)Yt?(ce&&e.texStorage3D(i.TEXTURE_3D,Tt,Ht,vt.width,vt.height,vt.depth),G&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,vt.width,vt.height,vt.depth,Dt,Gt,vt.data)):e.texImage3D(i.TEXTURE_3D,0,Ht,vt.width,vt.height,vt.depth,0,Dt,Gt,vt.data);else if(y.isFramebufferTexture){if(ce)if(Yt)e.texStorage2D(i.TEXTURE_2D,Tt,Ht,vt.width,vt.height);else{let et=vt.width,lt=vt.height;for(let Lt=0;Lt<Tt;Lt++)e.texImage2D(i.TEXTURE_2D,Lt,Ht,et,lt,0,Dt,Gt,null),et>>=1,lt>>=1}}else if(Jt.length>0){if(Yt&&ce){const et=gt(Jt[0]);e.texStorage2D(i.TEXTURE_2D,Tt,Ht,et.width,et.height)}for(let et=0,lt=Jt.length;et<lt;et++)Nt=Jt[et],Yt?G&&e.texSubImage2D(i.TEXTURE_2D,et,0,0,Dt,Gt,Nt):e.texImage2D(i.TEXTURE_2D,et,Ht,Dt,Gt,Nt);y.generateMipmaps=!1}else if(Yt){if(ce){const et=gt(vt);e.texStorage2D(i.TEXTURE_2D,Tt,Ht,et.width,et.height)}G&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Dt,Gt,vt)}else e.texImage2D(i.TEXTURE_2D,0,Ht,Dt,Gt,vt);m(y)&&p(j),Ct.__version=nt.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function Y(w,y,$){if(y.image.length!==6)return;const j=St(w,y),ot=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+$);const nt=n.get(ot);if(ot.version!==nt.__version||j===!0){e.activeTexture(i.TEXTURE0+$);const Ct=Qt.getPrimaries(Qt.workingColorSpace),Et=y.colorSpace===Ln?null:Qt.getPrimaries(y.colorSpace),Pt=y.colorSpace===Ln||Ct===Et?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);const Kt=y.isCompressedTexture||y.image[0].isCompressedTexture,vt=y.image[0]&&y.image[0].isDataTexture,Dt=[];for(let lt=0;lt<6;lt++)!Kt&&!vt?Dt[lt]=_(y.image[lt],!0,s.maxCubemapSize):Dt[lt]=vt?y.image[lt].image:y.image[lt],Dt[lt]=yt(y,Dt[lt]);const Gt=Dt[0],Ht=r.convert(y.format,y.colorSpace),Nt=r.convert(y.type),Jt=M(y.internalFormat,Ht,Nt,y.colorSpace),Yt=y.isVideoTexture!==!0,ce=nt.__version===void 0||j===!0,G=ot.dataReady;let Tt=F(y,Gt);mt(i.TEXTURE_CUBE_MAP,y);let et;if(Kt){Yt&&ce&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Tt,Jt,Gt.width,Gt.height);for(let lt=0;lt<6;lt++){et=Dt[lt].mipmaps;for(let Lt=0;Lt<et.length;Lt++){const At=et[Lt];y.format!==fn?Ht!==null?Yt?G&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Lt,0,0,At.width,At.height,Ht,At.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Lt,Jt,At.width,At.height,0,At.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Yt?G&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Lt,0,0,At.width,At.height,Ht,Nt,At.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Lt,Jt,At.width,At.height,0,Ht,Nt,At.data)}}}else{if(et=y.mipmaps,Yt&&ce){et.length>0&&Tt++;const lt=gt(Dt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Tt,Jt,lt.width,lt.height)}for(let lt=0;lt<6;lt++)if(vt){Yt?G&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,Dt[lt].width,Dt[lt].height,Ht,Nt,Dt[lt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Jt,Dt[lt].width,Dt[lt].height,0,Ht,Nt,Dt[lt].data);for(let Lt=0;Lt<et.length;Lt++){const Wt=et[Lt].image[lt].image;Yt?G&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Lt+1,0,0,Wt.width,Wt.height,Ht,Nt,Wt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Lt+1,Jt,Wt.width,Wt.height,0,Ht,Nt,Wt.data)}}else{Yt?G&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,0,0,Ht,Nt,Dt[lt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0,Jt,Ht,Nt,Dt[lt]);for(let Lt=0;Lt<et.length;Lt++){const At=et[Lt];Yt?G&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Lt+1,0,0,Ht,Nt,At.image[lt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Lt+1,Jt,Ht,Nt,At.image[lt])}}}m(y)&&p(i.TEXTURE_CUBE_MAP),nt.__version=ot.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function st(w,y,$,j,ot,nt){const Ct=r.convert($.format,$.colorSpace),Et=r.convert($.type),Pt=M($.internalFormat,Ct,Et,$.colorSpace),Kt=n.get(y),vt=n.get($);if(vt.__renderTarget=y,!Kt.__hasExternalTextures){const Dt=Math.max(1,y.width>>nt),Gt=Math.max(1,y.height>>nt);ot===i.TEXTURE_3D||ot===i.TEXTURE_2D_ARRAY?e.texImage3D(ot,nt,Pt,Dt,Gt,y.depth,0,Ct,Et,null):e.texImage2D(ot,nt,Pt,Dt,Gt,0,Ct,Et,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),_t(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,ot,vt.__webglTexture,0,tt(y)):(ot===i.TEXTURE_2D||ot>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ot<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,ot,vt.__webglTexture,nt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function K(w,y,$){if(i.bindRenderbuffer(i.RENDERBUFFER,w),y.depthBuffer){const j=y.depthTexture,ot=j&&j.isDepthTexture?j.type:null,nt=v(y.stencilBuffer,ot),Ct=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Et=tt(y);_t(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Et,nt,y.width,y.height):$?i.renderbufferStorageMultisample(i.RENDERBUFFER,Et,nt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,nt,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ct,i.RENDERBUFFER,w)}else{const j=y.textures;for(let ot=0;ot<j.length;ot++){const nt=j[ot],Ct=r.convert(nt.format,nt.colorSpace),Et=r.convert(nt.type),Pt=M(nt.internalFormat,Ct,Et,nt.colorSpace),Kt=tt(y);$&&_t(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Kt,Pt,y.width,y.height):_t(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Kt,Pt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,Pt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function pt(w,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(y.depthTexture);j.__renderTarget=y,(!j.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),q(y.depthTexture,0);const ot=j.__webglTexture,nt=tt(y);if(y.depthTexture.format===Vi)_t(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ot,0,nt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ot,0);else if(y.depthTexture.format===Ki)_t(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ot,0,nt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ot,0);else throw new Error("Unknown depthTexture format")}function Mt(w){const y=n.get(w),$=w.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==w.depthTexture){const j=w.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),j){const ot=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,j.removeEventListener("dispose",ot)};j.addEventListener("dispose",ot),y.__depthDisposeCallback=ot}y.__boundDepthTexture=j}if(w.depthTexture&&!y.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");pt(y.__webglFramebuffer,w)}else if($){y.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[j]),y.__webglDepthbuffer[j]===void 0)y.__webglDepthbuffer[j]=i.createRenderbuffer(),K(y.__webglDepthbuffer[j],w,!1);else{const ot=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,nt=y.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,nt),i.framebufferRenderbuffer(i.FRAMEBUFFER,ot,i.RENDERBUFFER,nt)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),K(y.__webglDepthbuffer,w,!1);else{const j=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,ot)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(w,y,$){const j=n.get(w);y!==void 0&&st(j.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),$!==void 0&&Mt(w)}function It(w){const y=w.texture,$=n.get(w),j=n.get(y);w.addEventListener("dispose",A);const ot=w.textures,nt=w.isWebGLCubeRenderTarget===!0,Ct=ot.length>1;if(Ct||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=y.version,o.memory.textures++),nt){$.__webglFramebuffer=[];for(let Et=0;Et<6;Et++)if(y.mipmaps&&y.mipmaps.length>0){$.__webglFramebuffer[Et]=[];for(let Pt=0;Pt<y.mipmaps.length;Pt++)$.__webglFramebuffer[Et][Pt]=i.createFramebuffer()}else $.__webglFramebuffer[Et]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){$.__webglFramebuffer=[];for(let Et=0;Et<y.mipmaps.length;Et++)$.__webglFramebuffer[Et]=i.createFramebuffer()}else $.__webglFramebuffer=i.createFramebuffer();if(Ct)for(let Et=0,Pt=ot.length;Et<Pt;Et++){const Kt=n.get(ot[Et]);Kt.__webglTexture===void 0&&(Kt.__webglTexture=i.createTexture(),o.memory.textures++)}if(w.samples>0&&_t(w)===!1){$.__webglMultisampledFramebuffer=i.createFramebuffer(),$.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let Et=0;Et<ot.length;Et++){const Pt=ot[Et];$.__webglColorRenderbuffer[Et]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,$.__webglColorRenderbuffer[Et]);const Kt=r.convert(Pt.format,Pt.colorSpace),vt=r.convert(Pt.type),Dt=M(Pt.internalFormat,Kt,vt,Pt.colorSpace,w.isXRRenderTarget===!0),Gt=tt(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Gt,Dt,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Et,i.RENDERBUFFER,$.__webglColorRenderbuffer[Et])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&($.__webglDepthRenderbuffer=i.createRenderbuffer(),K($.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(nt){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),mt(i.TEXTURE_CUBE_MAP,y);for(let Et=0;Et<6;Et++)if(y.mipmaps&&y.mipmaps.length>0)for(let Pt=0;Pt<y.mipmaps.length;Pt++)st($.__webglFramebuffer[Et][Pt],w,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Et,Pt);else st($.__webglFramebuffer[Et],w,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0);m(y)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let Et=0,Pt=ot.length;Et<Pt;Et++){const Kt=ot[Et],vt=n.get(Kt);e.bindTexture(i.TEXTURE_2D,vt.__webglTexture),mt(i.TEXTURE_2D,Kt),st($.__webglFramebuffer,w,Kt,i.COLOR_ATTACHMENT0+Et,i.TEXTURE_2D,0),m(Kt)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let Et=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Et=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Et,j.__webglTexture),mt(Et,y),y.mipmaps&&y.mipmaps.length>0)for(let Pt=0;Pt<y.mipmaps.length;Pt++)st($.__webglFramebuffer[Pt],w,y,i.COLOR_ATTACHMENT0,Et,Pt);else st($.__webglFramebuffer,w,y,i.COLOR_ATTACHMENT0,Et,0);m(y)&&p(Et),e.unbindTexture()}w.depthBuffer&&Mt(w)}function X(w){const y=w.textures;for(let $=0,j=y.length;$<j;$++){const ot=y[$];if(m(ot)){const nt=E(w),Ct=n.get(ot).__webglTexture;e.bindTexture(nt,Ct),p(nt),e.unbindTexture()}}}const Q=[],T=[];function dt(w){if(w.samples>0){if(_t(w)===!1){const y=w.textures,$=w.width,j=w.height;let ot=i.COLOR_BUFFER_BIT;const nt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ct=n.get(w),Et=y.length>1;if(Et)for(let Pt=0;Pt<y.length;Pt++)e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let Pt=0;Pt<y.length;Pt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(ot|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(ot|=i.STENCIL_BUFFER_BIT)),Et){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ct.__webglColorRenderbuffer[Pt]);const Kt=n.get(y[Pt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Kt,0)}i.blitFramebuffer(0,0,$,j,0,0,$,j,ot,i.NEAREST),l===!0&&(Q.length=0,T.length=0,Q.push(i.COLOR_ATTACHMENT0+Pt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Q.push(nt),T.push(nt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,T)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Q))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Et)for(let Pt=0;Pt<y.length;Pt++){e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.RENDERBUFFER,Ct.__webglColorRenderbuffer[Pt]);const Kt=n.get(y[Pt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.TEXTURE_2D,Kt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const y=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function tt(w){return Math.min(s.maxSamples,w.samples)}function _t(w){const y=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function at(w){const y=o.render.frame;h.get(w)!==y&&(h.set(w,y),w.update())}function yt(w,y){const $=w.colorSpace,j=w.format,ot=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||$!==Qi&&$!==Ln&&(Qt.getTransfer($)===re?(j!==fn||ot!==kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),y}function gt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=D,this.resetTextureUnits=U,this.setTexture2D=q,this.setTexture2DArray=B,this.setTexture3D=W,this.setTextureCube=z,this.rebindTextures=Ut,this.setupRenderTarget=It,this.updateRenderTargetMipmap=X,this.updateMultisampleRenderTarget=dt,this.setupDepthRenderbuffer=Mt,this.setupFrameBufferTexture=st,this.useMultisampledRTT=_t}function ig(i,t){function e(n,s=Ln){let r;const o=Qt.getTransfer(s);if(n===kn)return i.UNSIGNED_BYTE;if(n===Sa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ba)return i.UNSIGNED_SHORT_5_5_5_1;if(n===sh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===nh)return i.BYTE;if(n===ih)return i.SHORT;if(n===Ts)return i.UNSIGNED_SHORT;if(n===ya)return i.INT;if(n===gi)return i.UNSIGNED_INT;if(n===xn)return i.FLOAT;if(n===Mn)return i.HALF_FLOAT;if(n===rh)return i.ALPHA;if(n===oh)return i.RGB;if(n===fn)return i.RGBA;if(n===ah)return i.LUMINANCE;if(n===lh)return i.LUMINANCE_ALPHA;if(n===Vi)return i.DEPTH_COMPONENT;if(n===Ki)return i.DEPTH_STENCIL;if(n===Ea)return i.RED;if(n===wa)return i.RED_INTEGER;if(n===ch)return i.RG;if(n===Ta)return i.RG_INTEGER;if(n===Aa)return i.RGBA_INTEGER;if(n===_r||n===vr||n===xr||n===Mr)if(o===re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===_r)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===_r)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===vr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Mr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Uo||n===Fo||n===Oo||n===Bo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Uo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Fo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Oo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Bo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ko||n===zo||n===Go)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ko||n===zo)return o===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Go)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ho||n===Vo||n===Wo||n===Xo||n===qo||n===Yo||n===$o||n===Ko||n===Zo||n===Jo||n===jo||n===Qo||n===ta||n===ea)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ho)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Vo)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Wo)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Xo)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===qo)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Yo)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===$o)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ko)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Zo)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Jo)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===jo)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Qo)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ta)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ea)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===yr||n===na||n===ia)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===yr)return o===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===na)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ia)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===hh||n===sa||n===ra||n===oa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===yr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===sa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ra)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===oa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===$i?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class sg extends We{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ze extends de{constructor(){super(),this.isGroup=!0,this.type="Group"}}const rg={type:"move"};class uo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ze,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ze,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ze,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(rg)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ze;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const og=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ag=`
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

}`;class lg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new De,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Le({vertexShader:og,fragmentShader:ag,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new zt(new Ke(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cg extends ts{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=new lg,m=e.getContextAttributes();let p=null,E=null;const M=[],v=[],F=new ct;let C=null;const A=new We;A.viewport=new le;const I=new We;I.viewport=new le;const S=[A,I],x=new sg;let P=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(R){let Y=M[R];return Y===void 0&&(Y=new uo,M[R]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(R){let Y=M[R];return Y===void 0&&(Y=new uo,M[R]=Y),Y.getGripSpace()},this.getHand=function(R){let Y=M[R];return Y===void 0&&(Y=new uo,M[R]=Y),Y.getHandSpace()};function D(R){const Y=v.indexOf(R.inputSource);if(Y===-1)return;const st=M[Y];st!==void 0&&(st.update(R.inputSource,R.frame,c||o),st.dispatchEvent({type:R.type,data:R.inputSource}))}function k(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",q);for(let R=0;R<M.length;R++){const Y=v[R];Y!==null&&(v[R]=null,M[R].disconnect(Y))}P=null,U=null,_.reset(),t.setRenderTarget(p),f=null,d=null,u=null,s=null,E=null,St.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(F.width,F.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(R){r=R,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(R){a=R,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(R){c=R},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(R){if(s=R,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",k),s.addEventListener("inputsourceschange",q),m.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(F),s.renderState.layers===void 0){const Y={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,Y),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),E=new on(f.framebufferWidth,f.framebufferHeight,{format:fn,type:kn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let Y=null,st=null,K=null;m.depth&&(K=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Y=m.stencil?Ki:Vi,st=m.stencil?$i:gi);const pt={colorFormat:e.RGBA8,depthFormat:K,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(pt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),E=new on(d.textureWidth,d.textureHeight,{format:fn,type:kn,depthTexture:new Eh(d.textureWidth,d.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),St.setContext(s),St.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function q(R){for(let Y=0;Y<R.removed.length;Y++){const st=R.removed[Y],K=v.indexOf(st);K>=0&&(v[K]=null,M[K].disconnect(st))}for(let Y=0;Y<R.added.length;Y++){const st=R.added[Y];let K=v.indexOf(st);if(K===-1){for(let Mt=0;Mt<M.length;Mt++)if(Mt>=v.length){v.push(st),K=Mt;break}else if(v[Mt]===null){v[Mt]=st,K=Mt;break}if(K===-1)break}const pt=M[K];pt&&pt.connect(st)}}const B=new N,W=new N;function z(R,Y,st){B.setFromMatrixPosition(Y.matrixWorld),W.setFromMatrixPosition(st.matrixWorld);const K=B.distanceTo(W),pt=Y.projectionMatrix.elements,Mt=st.projectionMatrix.elements,Ut=pt[14]/(pt[10]-1),It=pt[14]/(pt[10]+1),X=(pt[9]+1)/pt[5],Q=(pt[9]-1)/pt[5],T=(pt[8]-1)/pt[0],dt=(Mt[8]+1)/Mt[0],tt=Ut*T,_t=Ut*dt,at=K/(-T+dt),yt=at*-T;if(Y.matrixWorld.decompose(R.position,R.quaternion,R.scale),R.translateX(yt),R.translateZ(at),R.matrixWorld.compose(R.position,R.quaternion,R.scale),R.matrixWorldInverse.copy(R.matrixWorld).invert(),pt[10]===-1)R.projectionMatrix.copy(Y.projectionMatrix),R.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const gt=Ut+at,w=It+at,y=tt-yt,$=_t+(K-yt),j=X*It/w*gt,ot=Q*It/w*gt;R.projectionMatrix.makePerspective(y,$,j,ot,gt,w),R.projectionMatrixInverse.copy(R.projectionMatrix).invert()}}function it(R,Y){Y===null?R.matrixWorld.copy(R.matrix):R.matrixWorld.multiplyMatrices(Y.matrixWorld,R.matrix),R.matrixWorldInverse.copy(R.matrixWorld).invert()}this.updateCamera=function(R){if(s===null)return;let Y=R.near,st=R.far;_.texture!==null&&(_.depthNear>0&&(Y=_.depthNear),_.depthFar>0&&(st=_.depthFar)),x.near=I.near=A.near=Y,x.far=I.far=A.far=st,(P!==x.near||U!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),P=x.near,U=x.far),A.layers.mask=R.layers.mask|2,I.layers.mask=R.layers.mask|4,x.layers.mask=A.layers.mask|I.layers.mask;const K=R.parent,pt=x.cameras;it(x,K);for(let Mt=0;Mt<pt.length;Mt++)it(pt[Mt],K);pt.length===2?z(x,A,I):x.projectionMatrix.copy(A.projectionMatrix),ht(R,x,K)};function ht(R,Y,st){st===null?R.matrix.copy(Y.matrixWorld):(R.matrix.copy(st.matrixWorld),R.matrix.invert(),R.matrix.multiply(Y.matrixWorld)),R.matrix.decompose(R.position,R.quaternion,R.scale),R.updateMatrixWorld(!0),R.projectionMatrix.copy(Y.projectionMatrix),R.projectionMatrixInverse.copy(Y.projectionMatrixInverse),R.isPerspectiveCamera&&(R.fov=Er*2*Math.atan(1/R.projectionMatrix.elements[5]),R.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(R){l=R,d!==null&&(d.fixedFoveation=R),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=R)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let ut=null;function mt(R,Y){if(h=Y.getViewerPose(c||o),g=Y,h!==null){const st=h.views;f!==null&&(t.setRenderTargetFramebuffer(E,f.framebuffer),t.setRenderTarget(E));let K=!1;st.length!==x.cameras.length&&(x.cameras.length=0,K=!0);for(let Mt=0;Mt<st.length;Mt++){const Ut=st[Mt];let It=null;if(f!==null)It=f.getViewport(Ut);else{const Q=u.getViewSubImage(d,Ut);It=Q.viewport,Mt===0&&(t.setRenderTargetTextures(E,Q.colorTexture,d.ignoreDepthValues?void 0:Q.depthStencilTexture),t.setRenderTarget(E))}let X=S[Mt];X===void 0&&(X=new We,X.layers.enable(Mt),X.viewport=new le,S[Mt]=X),X.matrix.fromArray(Ut.transform.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale),X.projectionMatrix.fromArray(Ut.projectionMatrix),X.projectionMatrixInverse.copy(X.projectionMatrix).invert(),X.viewport.set(It.x,It.y,It.width,It.height),Mt===0&&(x.matrix.copy(X.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),K===!0&&x.cameras.push(X)}const pt=s.enabledFeatures;if(pt&&pt.includes("depth-sensing")){const Mt=u.getDepthInformation(st[0]);Mt&&Mt.isValid&&Mt.texture&&_.init(t,Mt,s.renderState)}}for(let st=0;st<M.length;st++){const K=v[st],pt=M[st];K!==null&&pt!==void 0&&pt.update(K,Y,c||o)}ut&&ut(R,Y),Y.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Y}),g=null}const St=new bh;St.setAnimationLoop(mt),this.setAnimationLoop=function(R){ut=R},this.dispose=function(){}}}const ri=new yn,hg=new ie;function ug(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Mh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,E,M,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,E,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ie&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ie&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const E=t.get(p),M=E.envMap,v=E.envMapRotation;M&&(m.envMap.value=M,ri.copy(v),ri.x*=-1,ri.y*=-1,ri.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ri.y*=-1,ri.z*=-1),m.envMapRotation.value.setFromMatrix4(hg.makeRotationFromEuler(ri)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,E,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ie&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const E=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function dg(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,M){const v=M.program;n.uniformBlockBinding(E,v)}function c(E,M){let v=s[E.id];v===void 0&&(g(E),v=h(E),s[E.id]=v,E.addEventListener("dispose",m));const F=M.program;n.updateUBOMapping(E,F);const C=t.render.frame;r[E.id]!==C&&(d(E),r[E.id]=C)}function h(E){const M=u();E.__bindingPointIndex=M;const v=i.createBuffer(),F=E.__size,C=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,F,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,v),v}function u(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){const M=s[E.id],v=E.uniforms,F=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let C=0,A=v.length;C<A;C++){const I=Array.isArray(v[C])?v[C]:[v[C]];for(let S=0,x=I.length;S<x;S++){const P=I[S];if(f(P,C,S,F)===!0){const U=P.__offset,D=Array.isArray(P.value)?P.value:[P.value];let k=0;for(let q=0;q<D.length;q++){const B=D[q],W=_(B);typeof B=="number"||typeof B=="boolean"?(P.__data[0]=B,i.bufferSubData(i.UNIFORM_BUFFER,U+k,P.__data)):B.isMatrix3?(P.__data[0]=B.elements[0],P.__data[1]=B.elements[1],P.__data[2]=B.elements[2],P.__data[3]=0,P.__data[4]=B.elements[3],P.__data[5]=B.elements[4],P.__data[6]=B.elements[5],P.__data[7]=0,P.__data[8]=B.elements[6],P.__data[9]=B.elements[7],P.__data[10]=B.elements[8],P.__data[11]=0):(B.toArray(P.__data,k),k+=W.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(E,M,v,F){const C=E.value,A=M+"_"+v;if(F[A]===void 0)return typeof C=="number"||typeof C=="boolean"?F[A]=C:F[A]=C.clone(),!0;{const I=F[A];if(typeof C=="number"||typeof C=="boolean"){if(I!==C)return F[A]=C,!0}else if(I.equals(C)===!1)return I.copy(C),!0}return!1}function g(E){const M=E.uniforms;let v=0;const F=16;for(let A=0,I=M.length;A<I;A++){const S=Array.isArray(M[A])?M[A]:[M[A]];for(let x=0,P=S.length;x<P;x++){const U=S[x],D=Array.isArray(U.value)?U.value:[U.value];for(let k=0,q=D.length;k<q;k++){const B=D[k],W=_(B),z=v%F,it=z%W.boundary,ht=z+it;v+=it,ht!==0&&F-ht<W.storage&&(v+=F-ht),U.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=v,v+=W.storage}}}const C=v%F;return C>0&&(v+=F-C),E.__size=v,E.__cache={},this}function _(E){const M={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(M.boundary=4,M.storage=4):E.isVector2?(M.boundary=8,M.storage=8):E.isVector3||E.isColor?(M.boundary=16,M.storage=12):E.isVector4?(M.boundary=16,M.storage=16):E.isMatrix3?(M.boundary=48,M.storage=48):E.isMatrix4?(M.boundary=64,M.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),M}function m(E){const M=E.target;M.removeEventListener("dispose",m);const v=o.indexOf(M.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function p(){for(const E in s)i.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class fg{constructor(t={}){const{canvas:e=ed(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const E=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ve,this.toneMapping=Zn,this.toneMappingExposure=1;const v=this;let F=!1,C=0,A=0,I=null,S=-1,x=null;const P=new le,U=new le;let D=null;const k=new ft(0);let q=0,B=e.width,W=e.height,z=1,it=null,ht=null;const ut=new le(0,0,B,W),mt=new le(0,0,B,W);let St=!1;const R=new Ca;let Y=!1,st=!1;const K=new ie,pt=new ie,Mt=new N,Ut=new le,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let X=!1;function Q(){return I===null?z:1}let T=n;function dt(b,H){return e.getContext(b,H)}try{const b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${va}`),e.addEventListener("webglcontextlost",lt,!1),e.addEventListener("webglcontextrestored",Lt,!1),e.addEventListener("webglcontextcreationerror",At,!1),T===null){const H="webgl2";if(T=dt(H,b),T===null)throw dt(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let tt,_t,at,yt,gt,w,y,$,j,ot,nt,Ct,Et,Pt,Kt,vt,Dt,Gt,Ht,Nt,Jt,Yt,ce,G;function Tt(){tt=new vm(T),tt.init(),Yt=new ig(T,tt),_t=new dm(T,tt,t,Yt),at=new tg(T,tt),_t.reverseDepthBuffer&&d&&at.buffers.depth.setReversed(!0),yt=new ym(T),gt=new k0,w=new ng(T,tt,at,gt,_t,Yt,yt),y=new pm(v),$=new _m(v),j=new Ad(T),ce=new hm(T,j),ot=new xm(T,j,yt,ce),nt=new bm(T,ot,j,yt),Ht=new Sm(T,_t,w),vt=new fm(gt),Ct=new B0(v,y,$,tt,_t,ce,vt),Et=new ug(v,gt),Pt=new G0,Kt=new Y0(tt),Gt=new cm(v,y,$,at,nt,f,l),Dt=new j0(v,nt,_t),G=new dg(T,yt,_t,at),Nt=new um(T,tt,yt),Jt=new Mm(T,tt,yt),yt.programs=Ct.programs,v.capabilities=_t,v.extensions=tt,v.properties=gt,v.renderLists=Pt,v.shadowMap=Dt,v.state=at,v.info=yt}Tt();const et=new cg(v,T);this.xr=et,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){const b=tt.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=tt.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(b){b!==void 0&&(z=b,this.setSize(B,W,!1))},this.getSize=function(b){return b.set(B,W)},this.setSize=function(b,H,Z=!0){if(et.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=b,W=H,e.width=Math.floor(b*z),e.height=Math.floor(H*z),Z===!0&&(e.style.width=b+"px",e.style.height=H+"px"),this.setViewport(0,0,b,H)},this.getDrawingBufferSize=function(b){return b.set(B*z,W*z).floor()},this.setDrawingBufferSize=function(b,H,Z){B=b,W=H,z=Z,e.width=Math.floor(b*Z),e.height=Math.floor(H*Z),this.setViewport(0,0,b,H)},this.getCurrentViewport=function(b){return b.copy(P)},this.getViewport=function(b){return b.copy(ut)},this.setViewport=function(b,H,Z,J){b.isVector4?ut.set(b.x,b.y,b.z,b.w):ut.set(b,H,Z,J),at.viewport(P.copy(ut).multiplyScalar(z).round())},this.getScissor=function(b){return b.copy(mt)},this.setScissor=function(b,H,Z,J){b.isVector4?mt.set(b.x,b.y,b.z,b.w):mt.set(b,H,Z,J),at.scissor(U.copy(mt).multiplyScalar(z).round())},this.getScissorTest=function(){return St},this.setScissorTest=function(b){at.setScissorTest(St=b)},this.setOpaqueSort=function(b){it=b},this.setTransparentSort=function(b){ht=b},this.getClearColor=function(b){return b.copy(Gt.getClearColor())},this.setClearColor=function(){Gt.setClearColor.apply(Gt,arguments)},this.getClearAlpha=function(){return Gt.getClearAlpha()},this.setClearAlpha=function(){Gt.setClearAlpha.apply(Gt,arguments)},this.clear=function(b=!0,H=!0,Z=!0){let J=0;if(b){let V=!1;if(I!==null){const xt=I.texture.format;V=xt===Aa||xt===Ta||xt===wa}if(V){const xt=I.texture.type,Rt=xt===kn||xt===gi||xt===Ts||xt===$i||xt===Sa||xt===ba,Ft=Gt.getClearColor(),Ot=Gt.getClearAlpha(),Vt=Ft.r,Xt=Ft.g,Bt=Ft.b;Rt?(g[0]=Vt,g[1]=Xt,g[2]=Bt,g[3]=Ot,T.clearBufferuiv(T.COLOR,0,g)):(_[0]=Vt,_[1]=Xt,_[2]=Bt,_[3]=Ot,T.clearBufferiv(T.COLOR,0,_))}else J|=T.COLOR_BUFFER_BIT}H&&(J|=T.DEPTH_BUFFER_BIT),Z&&(J|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",lt,!1),e.removeEventListener("webglcontextrestored",Lt,!1),e.removeEventListener("webglcontextcreationerror",At,!1),Pt.dispose(),Kt.dispose(),gt.dispose(),y.dispose(),$.dispose(),nt.dispose(),ce.dispose(),G.dispose(),Ct.dispose(),et.dispose(),et.removeEventListener("sessionstart",Ga),et.removeEventListener("sessionend",Ha),Qn.stop()};function lt(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),F=!0}function Lt(){console.log("THREE.WebGLRenderer: Context Restored."),F=!1;const b=yt.autoReset,H=Dt.enabled,Z=Dt.autoUpdate,J=Dt.needsUpdate,V=Dt.type;Tt(),yt.autoReset=b,Dt.enabled=H,Dt.autoUpdate=Z,Dt.needsUpdate=J,Dt.type=V}function At(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Wt(b){const H=b.target;H.removeEventListener("dispose",Wt),ve(H)}function ve(b){Re(b),gt.remove(b)}function Re(b){const H=gt.get(b).programs;H!==void 0&&(H.forEach(function(Z){Ct.releaseProgram(Z)}),b.isShaderMaterial&&Ct.releaseShaderCache(b))}this.renderBufferDirect=function(b,H,Z,J,V,xt){H===null&&(H=It);const Rt=V.isMesh&&V.matrixWorld.determinant()<0,Ft=Wh(b,H,Z,J,V);at.setMaterial(J,Rt);let Ot=Z.index,Vt=1;if(J.wireframe===!0){if(Ot=ot.getWireframeAttribute(Z),Ot===void 0)return;Vt=2}const Xt=Z.drawRange,Bt=Z.attributes.position;let te=Xt.start*Vt,he=(Xt.start+Xt.count)*Vt;xt!==null&&(te=Math.max(te,xt.start*Vt),he=Math.min(he,(xt.start+xt.count)*Vt)),Ot!==null?(te=Math.max(te,0),he=Math.min(he,Ot.count)):Bt!=null&&(te=Math.max(te,0),he=Math.min(he,Bt.count));const fe=he-te;if(fe<0||fe===1/0)return;ce.setup(V,J,Ft,Z,Ot);let He,ee=Nt;if(Ot!==null&&(He=j.get(Ot),ee=Jt,ee.setIndex(He)),V.isMesh)J.wireframe===!0?(at.setLineWidth(J.wireframeLinewidth*Q()),ee.setMode(T.LINES)):ee.setMode(T.TRIANGLES);else if(V.isLine){let kt=J.linewidth;kt===void 0&&(kt=1),at.setLineWidth(kt*Q()),V.isLineSegments?ee.setMode(T.LINES):V.isLineLoop?ee.setMode(T.LINE_LOOP):ee.setMode(T.LINE_STRIP)}else V.isPoints?ee.setMode(T.POINTS):V.isSprite&&ee.setMode(T.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)ee.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(tt.get("WEBGL_multi_draw"))ee.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const kt=V._multiDrawStarts,En=V._multiDrawCounts,ne=V._multiDrawCount,ln=Ot?j.get(Ot).bytesPerElement:1,Mi=gt.get(J).currentProgram.getUniforms();for(let Xe=0;Xe<ne;Xe++)Mi.setValue(T,"_gl_DrawID",Xe),ee.render(kt[Xe]/ln,En[Xe])}else if(V.isInstancedMesh)ee.renderInstances(te,fe,V.count);else if(Z.isInstancedBufferGeometry){const kt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,En=Math.min(Z.instanceCount,kt);ee.renderInstances(te,fe,En)}else ee.render(te,fe)};function se(b,H,Z){b.transparent===!0&&b.side===sn&&b.forceSinglePass===!1?(b.side=Ie,b.needsUpdate=!0,Us(b,H,Z),b.side=Jn,b.needsUpdate=!0,Us(b,H,Z),b.side=sn):Us(b,H,Z)}this.compile=function(b,H,Z=null){Z===null&&(Z=b),p=Kt.get(Z),p.init(H),M.push(p),Z.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),b!==Z&&b.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights();const J=new Set;return b.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const xt=V.material;if(xt)if(Array.isArray(xt))for(let Rt=0;Rt<xt.length;Rt++){const Ft=xt[Rt];se(Ft,Z,V),J.add(Ft)}else se(xt,Z,V),J.add(xt)}),M.pop(),p=null,J},this.compileAsync=function(b,H,Z=null){const J=this.compile(b,H,Z);return new Promise(V=>{function xt(){if(J.forEach(function(Rt){gt.get(Rt).currentProgram.isReady()&&J.delete(Rt)}),J.size===0){V(b);return}setTimeout(xt,10)}tt.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let an=null;function bn(b){an&&an(b)}function Ga(){Qn.stop()}function Ha(){Qn.start()}const Qn=new bh;Qn.setAnimationLoop(bn),typeof self<"u"&&Qn.setContext(self),this.setAnimationLoop=function(b){an=b,et.setAnimationLoop(b),b===null?Qn.stop():Qn.start()},et.addEventListener("sessionstart",Ga),et.addEventListener("sessionend",Ha),this.render=function(b,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(et.cameraAutoUpdate===!0&&et.updateCamera(H),H=et.getCamera()),b.isScene===!0&&b.onBeforeRender(v,b,H,I),p=Kt.get(b,M.length),p.init(H),M.push(p),pt.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),R.setFromProjectionMatrix(pt),st=this.localClippingEnabled,Y=vt.init(this.clippingPlanes,st),m=Pt.get(b,E.length),m.init(),E.push(m),et.enabled===!0&&et.isPresenting===!0){const xt=v.xr.getDepthSensingMesh();xt!==null&&Ur(xt,H,-1/0,v.sortObjects)}Ur(b,H,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(it,ht),X=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,X&&Gt.addToRenderList(m,b),this.info.render.frame++,Y===!0&&vt.beginShadows();const Z=p.state.shadowsArray;Dt.render(Z,b,H),Y===!0&&vt.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=m.opaque,V=m.transmissive;if(p.setupLights(),H.isArrayCamera){const xt=H.cameras;if(V.length>0)for(let Rt=0,Ft=xt.length;Rt<Ft;Rt++){const Ot=xt[Rt];Wa(J,V,b,Ot)}X&&Gt.render(b);for(let Rt=0,Ft=xt.length;Rt<Ft;Rt++){const Ot=xt[Rt];Va(m,b,Ot,Ot.viewport)}}else V.length>0&&Wa(J,V,b,H),X&&Gt.render(b),Va(m,b,H);I!==null&&(w.updateMultisampleRenderTarget(I),w.updateRenderTargetMipmap(I)),b.isScene===!0&&b.onAfterRender(v,b,H),ce.resetDefaultState(),S=-1,x=null,M.pop(),M.length>0?(p=M[M.length-1],Y===!0&&vt.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function Ur(b,H,Z,J){if(b.visible===!1)return;if(b.layers.test(H.layers)){if(b.isGroup)Z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(H);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||R.intersectsSprite(b)){J&&Ut.setFromMatrixPosition(b.matrixWorld).applyMatrix4(pt);const Rt=nt.update(b),Ft=b.material;Ft.visible&&m.push(b,Rt,Ft,Z,Ut.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||R.intersectsObject(b))){const Rt=nt.update(b),Ft=b.material;if(J&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ut.copy(b.boundingSphere.center)):(Rt.boundingSphere===null&&Rt.computeBoundingSphere(),Ut.copy(Rt.boundingSphere.center)),Ut.applyMatrix4(b.matrixWorld).applyMatrix4(pt)),Array.isArray(Ft)){const Ot=Rt.groups;for(let Vt=0,Xt=Ot.length;Vt<Xt;Vt++){const Bt=Ot[Vt],te=Ft[Bt.materialIndex];te&&te.visible&&m.push(b,Rt,te,Z,Ut.z,Bt)}}else Ft.visible&&m.push(b,Rt,Ft,Z,Ut.z,null)}}const xt=b.children;for(let Rt=0,Ft=xt.length;Rt<Ft;Rt++)Ur(xt[Rt],H,Z,J)}function Va(b,H,Z,J){const V=b.opaque,xt=b.transmissive,Rt=b.transparent;p.setupLightsView(Z),Y===!0&&vt.setGlobalState(v.clippingPlanes,Z),J&&at.viewport(P.copy(J)),V.length>0&&Ns(V,H,Z),xt.length>0&&Ns(xt,H,Z),Rt.length>0&&Ns(Rt,H,Z),at.buffers.depth.setTest(!0),at.buffers.depth.setMask(!0),at.buffers.color.setMask(!0),at.setPolygonOffset(!1)}function Wa(b,H,Z,J){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[J.id]===void 0&&(p.state.transmissionRenderTarget[J.id]=new on(1,1,{generateMipmaps:!0,type:tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float")?Mn:kn,minFilter:di,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));const xt=p.state.transmissionRenderTarget[J.id],Rt=J.viewport||P;xt.setSize(Rt.z,Rt.w);const Ft=v.getRenderTarget();v.setRenderTarget(xt),v.getClearColor(k),q=v.getClearAlpha(),q<1&&v.setClearColor(16777215,.5),v.clear(),X&&Gt.render(Z);const Ot=v.toneMapping;v.toneMapping=Zn;const Vt=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),p.setupLightsView(J),Y===!0&&vt.setGlobalState(v.clippingPlanes,J),Ns(b,Z,J),w.updateMultisampleRenderTarget(xt),w.updateRenderTargetMipmap(xt),tt.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let Bt=0,te=H.length;Bt<te;Bt++){const he=H[Bt],fe=he.object,He=he.geometry,ee=he.material,kt=he.group;if(ee.side===sn&&fe.layers.test(J.layers)){const En=ee.side;ee.side=Ie,ee.needsUpdate=!0,Xa(fe,Z,J,He,ee,kt),ee.side=En,ee.needsUpdate=!0,Xt=!0}}Xt===!0&&(w.updateMultisampleRenderTarget(xt),w.updateRenderTargetMipmap(xt))}v.setRenderTarget(Ft),v.setClearColor(k,q),Vt!==void 0&&(J.viewport=Vt),v.toneMapping=Ot}function Ns(b,H,Z){const J=H.isScene===!0?H.overrideMaterial:null;for(let V=0,xt=b.length;V<xt;V++){const Rt=b[V],Ft=Rt.object,Ot=Rt.geometry,Vt=J===null?Rt.material:J,Xt=Rt.group;Ft.layers.test(Z.layers)&&Xa(Ft,H,Z,Ot,Vt,Xt)}}function Xa(b,H,Z,J,V,xt){b.onBeforeRender(v,H,Z,J,V,xt),b.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),V.onBeforeRender(v,H,Z,J,b,xt),V.transparent===!0&&V.side===sn&&V.forceSinglePass===!1?(V.side=Ie,V.needsUpdate=!0,v.renderBufferDirect(Z,H,J,V,b,xt),V.side=Jn,V.needsUpdate=!0,v.renderBufferDirect(Z,H,J,V,b,xt),V.side=sn):v.renderBufferDirect(Z,H,J,V,b,xt),b.onAfterRender(v,H,Z,J,V,xt)}function Us(b,H,Z){H.isScene!==!0&&(H=It);const J=gt.get(b),V=p.state.lights,xt=p.state.shadowsArray,Rt=V.state.version,Ft=Ct.getParameters(b,V.state,xt,H,Z),Ot=Ct.getProgramCacheKey(Ft);let Vt=J.programs;J.environment=b.isMeshStandardMaterial?H.environment:null,J.fog=H.fog,J.envMap=(b.isMeshStandardMaterial?$:y).get(b.envMap||J.environment),J.envMapRotation=J.environment!==null&&b.envMap===null?H.environmentRotation:b.envMapRotation,Vt===void 0&&(b.addEventListener("dispose",Wt),Vt=new Map,J.programs=Vt);let Xt=Vt.get(Ot);if(Xt!==void 0){if(J.currentProgram===Xt&&J.lightsStateVersion===Rt)return Ya(b,Ft),Xt}else Ft.uniforms=Ct.getUniforms(b),b.onBeforeCompile(Ft,v),Xt=Ct.acquireProgram(Ft,Ot),Vt.set(Ot,Xt),J.uniforms=Ft.uniforms;const Bt=J.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Bt.clippingPlanes=vt.uniform),Ya(b,Ft),J.needsLights=qh(b),J.lightsStateVersion=Rt,J.needsLights&&(Bt.ambientLightColor.value=V.state.ambient,Bt.lightProbe.value=V.state.probe,Bt.directionalLights.value=V.state.directional,Bt.directionalLightShadows.value=V.state.directionalShadow,Bt.spotLights.value=V.state.spot,Bt.spotLightShadows.value=V.state.spotShadow,Bt.rectAreaLights.value=V.state.rectArea,Bt.ltc_1.value=V.state.rectAreaLTC1,Bt.ltc_2.value=V.state.rectAreaLTC2,Bt.pointLights.value=V.state.point,Bt.pointLightShadows.value=V.state.pointShadow,Bt.hemisphereLights.value=V.state.hemi,Bt.directionalShadowMap.value=V.state.directionalShadowMap,Bt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Bt.spotShadowMap.value=V.state.spotShadowMap,Bt.spotLightMatrix.value=V.state.spotLightMatrix,Bt.spotLightMap.value=V.state.spotLightMap,Bt.pointShadowMap.value=V.state.pointShadowMap,Bt.pointShadowMatrix.value=V.state.pointShadowMatrix),J.currentProgram=Xt,J.uniformsList=null,Xt}function qa(b){if(b.uniformsList===null){const H=b.currentProgram.getUniforms();b.uniformsList=Sr.seqWithValue(H.seq,b.uniforms)}return b.uniformsList}function Ya(b,H){const Z=gt.get(b);Z.outputColorSpace=H.outputColorSpace,Z.batching=H.batching,Z.batchingColor=H.batchingColor,Z.instancing=H.instancing,Z.instancingColor=H.instancingColor,Z.instancingMorph=H.instancingMorph,Z.skinning=H.skinning,Z.morphTargets=H.morphTargets,Z.morphNormals=H.morphNormals,Z.morphColors=H.morphColors,Z.morphTargetsCount=H.morphTargetsCount,Z.numClippingPlanes=H.numClippingPlanes,Z.numIntersection=H.numClipIntersection,Z.vertexAlphas=H.vertexAlphas,Z.vertexTangents=H.vertexTangents,Z.toneMapping=H.toneMapping}function Wh(b,H,Z,J,V){H.isScene!==!0&&(H=It),w.resetTextureUnits();const xt=H.fog,Rt=J.isMeshStandardMaterial?H.environment:null,Ft=I===null?v.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Qi,Ot=(J.isMeshStandardMaterial?$:y).get(J.envMap||Rt),Vt=J.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Xt=!!Z.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Bt=!!Z.morphAttributes.position,te=!!Z.morphAttributes.normal,he=!!Z.morphAttributes.color;let fe=Zn;J.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(fe=v.toneMapping);const He=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,ee=He!==void 0?He.length:0,kt=gt.get(J),En=p.state.lights;if(Y===!0&&(st===!0||b!==x)){const Je=b===x&&J.id===S;vt.setState(J,b,Je)}let ne=!1;J.version===kt.__version?(kt.needsLights&&kt.lightsStateVersion!==En.state.version||kt.outputColorSpace!==Ft||V.isBatchedMesh&&kt.batching===!1||!V.isBatchedMesh&&kt.batching===!0||V.isBatchedMesh&&kt.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&kt.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&kt.instancing===!1||!V.isInstancedMesh&&kt.instancing===!0||V.isSkinnedMesh&&kt.skinning===!1||!V.isSkinnedMesh&&kt.skinning===!0||V.isInstancedMesh&&kt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&kt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&kt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&kt.instancingMorph===!1&&V.morphTexture!==null||kt.envMap!==Ot||J.fog===!0&&kt.fog!==xt||kt.numClippingPlanes!==void 0&&(kt.numClippingPlanes!==vt.numPlanes||kt.numIntersection!==vt.numIntersection)||kt.vertexAlphas!==Vt||kt.vertexTangents!==Xt||kt.morphTargets!==Bt||kt.morphNormals!==te||kt.morphColors!==he||kt.toneMapping!==fe||kt.morphTargetsCount!==ee)&&(ne=!0):(ne=!0,kt.__version=J.version);let ln=kt.currentProgram;ne===!0&&(ln=Us(J,H,V));let Mi=!1,Xe=!1,is=!1;const pe=ln.getUniforms(),pn=kt.uniforms;if(at.useProgram(ln.program)&&(Mi=!0,Xe=!0,is=!0),J.id!==S&&(S=J.id,Xe=!0),Mi||x!==b){at.buffers.depth.getReversed()?(K.copy(b.projectionMatrix),id(K),sd(K),pe.setValue(T,"projectionMatrix",K)):pe.setValue(T,"projectionMatrix",b.projectionMatrix),pe.setValue(T,"viewMatrix",b.matrixWorldInverse);const zn=pe.map.cameraPosition;zn!==void 0&&zn.setValue(T,Mt.setFromMatrixPosition(b.matrixWorld)),_t.logarithmicDepthBuffer&&pe.setValue(T,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&pe.setValue(T,"isOrthographic",b.isOrthographicCamera===!0),x!==b&&(x=b,Xe=!0,is=!0)}if(V.isSkinnedMesh){pe.setOptional(T,V,"bindMatrix"),pe.setOptional(T,V,"bindMatrixInverse");const Je=V.skeleton;Je&&(Je.boneTexture===null&&Je.computeBoneTexture(),pe.setValue(T,"boneTexture",Je.boneTexture,w))}V.isBatchedMesh&&(pe.setOptional(T,V,"batchingTexture"),pe.setValue(T,"batchingTexture",V._matricesTexture,w),pe.setOptional(T,V,"batchingIdTexture"),pe.setValue(T,"batchingIdTexture",V._indirectTexture,w),pe.setOptional(T,V,"batchingColorTexture"),V._colorsTexture!==null&&pe.setValue(T,"batchingColorTexture",V._colorsTexture,w));const ss=Z.morphAttributes;if((ss.position!==void 0||ss.normal!==void 0||ss.color!==void 0)&&Ht.update(V,Z,ln),(Xe||kt.receiveShadow!==V.receiveShadow)&&(kt.receiveShadow=V.receiveShadow,pe.setValue(T,"receiveShadow",V.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(pn.envMap.value=Ot,pn.flipEnvMap.value=Ot.isCubeTexture&&Ot.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&H.environment!==null&&(pn.envMapIntensity.value=H.environmentIntensity),Xe&&(pe.setValue(T,"toneMappingExposure",v.toneMappingExposure),kt.needsLights&&Xh(pn,is),xt&&J.fog===!0&&Et.refreshFogUniforms(pn,xt),Et.refreshMaterialUniforms(pn,J,z,W,p.state.transmissionRenderTarget[b.id]),Sr.upload(T,qa(kt),pn,w)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Sr.upload(T,qa(kt),pn,w),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&pe.setValue(T,"center",V.center),pe.setValue(T,"modelViewMatrix",V.modelViewMatrix),pe.setValue(T,"normalMatrix",V.normalMatrix),pe.setValue(T,"modelMatrix",V.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const Je=J.uniformsGroups;for(let zn=0,Gn=Je.length;zn<Gn;zn++){const $a=Je[zn];G.update($a,ln),G.bind($a,ln)}}return ln}function Xh(b,H){b.ambientLightColor.needsUpdate=H,b.lightProbe.needsUpdate=H,b.directionalLights.needsUpdate=H,b.directionalLightShadows.needsUpdate=H,b.pointLights.needsUpdate=H,b.pointLightShadows.needsUpdate=H,b.spotLights.needsUpdate=H,b.spotLightShadows.needsUpdate=H,b.rectAreaLights.needsUpdate=H,b.hemisphereLights.needsUpdate=H}function qh(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(b,H,Z){gt.get(b.texture).__webglTexture=H,gt.get(b.depthTexture).__webglTexture=Z;const J=gt.get(b);J.__hasExternalTextures=!0,J.__autoAllocateDepthBuffer=Z===void 0,J.__autoAllocateDepthBuffer||tt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,H){const Z=gt.get(b);Z.__webglFramebuffer=H,Z.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(b,H=0,Z=0){I=b,C=H,A=Z;let J=!0,V=null,xt=!1,Rt=!1;if(b){const Ot=gt.get(b);if(Ot.__useDefaultFramebuffer!==void 0)at.bindFramebuffer(T.FRAMEBUFFER,null),J=!1;else if(Ot.__webglFramebuffer===void 0)w.setupRenderTarget(b);else if(Ot.__hasExternalTextures)w.rebindTextures(b,gt.get(b.texture).__webglTexture,gt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Bt=b.depthTexture;if(Ot.__boundDepthTexture!==Bt){if(Bt!==null&&gt.has(Bt)&&(b.width!==Bt.image.width||b.height!==Bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(b)}}const Vt=b.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(Rt=!0);const Xt=gt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Xt[H])?V=Xt[H][Z]:V=Xt[H],xt=!0):b.samples>0&&w.useMultisampledRTT(b)===!1?V=gt.get(b).__webglMultisampledFramebuffer:Array.isArray(Xt)?V=Xt[Z]:V=Xt,P.copy(b.viewport),U.copy(b.scissor),D=b.scissorTest}else P.copy(ut).multiplyScalar(z).floor(),U.copy(mt).multiplyScalar(z).floor(),D=St;if(at.bindFramebuffer(T.FRAMEBUFFER,V)&&J&&at.drawBuffers(b,V),at.viewport(P),at.scissor(U),at.setScissorTest(D),xt){const Ot=gt.get(b.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+H,Ot.__webglTexture,Z)}else if(Rt){const Ot=gt.get(b.texture),Vt=H||0;T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,Ot.__webglTexture,Z||0,Vt)}S=-1},this.readRenderTargetPixels=function(b,H,Z,J,V,xt,Rt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ft=gt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Rt!==void 0&&(Ft=Ft[Rt]),Ft){at.bindFramebuffer(T.FRAMEBUFFER,Ft);try{const Ot=b.texture,Vt=Ot.format,Xt=Ot.type;if(!_t.textureFormatReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_t.textureTypeReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=b.width-J&&Z>=0&&Z<=b.height-V&&T.readPixels(H,Z,J,V,Yt.convert(Vt),Yt.convert(Xt),xt)}finally{const Ot=I!==null?gt.get(I).__webglFramebuffer:null;at.bindFramebuffer(T.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(b,H,Z,J,V,xt,Rt){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ft=gt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Rt!==void 0&&(Ft=Ft[Rt]),Ft){const Ot=b.texture,Vt=Ot.format,Xt=Ot.type;if(!_t.textureFormatReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_t.textureTypeReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=b.width-J&&Z>=0&&Z<=b.height-V){at.bindFramebuffer(T.FRAMEBUFFER,Ft);const Bt=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,Bt),T.bufferData(T.PIXEL_PACK_BUFFER,xt.byteLength,T.STREAM_READ),T.readPixels(H,Z,J,V,Yt.convert(Vt),Yt.convert(Xt),0);const te=I!==null?gt.get(I).__webglFramebuffer:null;at.bindFramebuffer(T.FRAMEBUFFER,te);const he=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await nd(T,he,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,Bt),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,xt),T.deleteBuffer(Bt),T.deleteSync(he),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,H=null,Z=0){b.isTexture!==!0&&(vs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,b=arguments[1]);const J=Math.pow(2,-Z),V=Math.floor(b.image.width*J),xt=Math.floor(b.image.height*J),Rt=H!==null?H.x:0,Ft=H!==null?H.y:0;w.setTexture2D(b,0),T.copyTexSubImage2D(T.TEXTURE_2D,Z,0,0,Rt,Ft,V,xt),at.unbindTexture()},this.copyTextureToTexture=function(b,H,Z=null,J=null,V=0){b.isTexture!==!0&&(vs("WebGLRenderer: copyTextureToTexture function signature has changed."),J=arguments[0]||null,b=arguments[1],H=arguments[2],V=arguments[3]||0,Z=null);let xt,Rt,Ft,Ot,Vt,Xt,Bt,te,he;const fe=b.isCompressedTexture?b.mipmaps[V]:b.image;Z!==null?(xt=Z.max.x-Z.min.x,Rt=Z.max.y-Z.min.y,Ft=Z.isBox3?Z.max.z-Z.min.z:1,Ot=Z.min.x,Vt=Z.min.y,Xt=Z.isBox3?Z.min.z:0):(xt=fe.width,Rt=fe.height,Ft=fe.depth||1,Ot=0,Vt=0,Xt=0),J!==null?(Bt=J.x,te=J.y,he=J.z):(Bt=0,te=0,he=0);const He=Yt.convert(H.format),ee=Yt.convert(H.type);let kt;H.isData3DTexture?(w.setTexture3D(H,0),kt=T.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(w.setTexture2DArray(H,0),kt=T.TEXTURE_2D_ARRAY):(w.setTexture2D(H,0),kt=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,H.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,H.unpackAlignment);const En=T.getParameter(T.UNPACK_ROW_LENGTH),ne=T.getParameter(T.UNPACK_IMAGE_HEIGHT),ln=T.getParameter(T.UNPACK_SKIP_PIXELS),Mi=T.getParameter(T.UNPACK_SKIP_ROWS),Xe=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,fe.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,fe.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Ot),T.pixelStorei(T.UNPACK_SKIP_ROWS,Vt),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Xt);const is=b.isDataArrayTexture||b.isData3DTexture,pe=H.isDataArrayTexture||H.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const pn=gt.get(b),ss=gt.get(H),Je=gt.get(pn.__renderTarget),zn=gt.get(ss.__renderTarget);at.bindFramebuffer(T.READ_FRAMEBUFFER,Je.__webglFramebuffer),at.bindFramebuffer(T.DRAW_FRAMEBUFFER,zn.__webglFramebuffer);for(let Gn=0;Gn<Ft;Gn++)is&&T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,gt.get(b).__webglTexture,V,Xt+Gn),b.isDepthTexture?(pe&&T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,gt.get(H).__webglTexture,V,he+Gn),T.blitFramebuffer(Ot,Vt,xt,Rt,Bt,te,xt,Rt,T.DEPTH_BUFFER_BIT,T.NEAREST)):pe?T.copyTexSubImage3D(kt,V,Bt,te,he+Gn,Ot,Vt,xt,Rt):T.copyTexSubImage2D(kt,V,Bt,te,he+Gn,Ot,Vt,xt,Rt);at.bindFramebuffer(T.READ_FRAMEBUFFER,null),at.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else pe?b.isDataTexture||b.isData3DTexture?T.texSubImage3D(kt,V,Bt,te,he,xt,Rt,Ft,He,ee,fe.data):H.isCompressedArrayTexture?T.compressedTexSubImage3D(kt,V,Bt,te,he,xt,Rt,Ft,He,fe.data):T.texSubImage3D(kt,V,Bt,te,he,xt,Rt,Ft,He,ee,fe):b.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,V,Bt,te,xt,Rt,He,ee,fe.data):b.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,V,Bt,te,fe.width,fe.height,He,fe.data):T.texSubImage2D(T.TEXTURE_2D,V,Bt,te,xt,Rt,He,ee,fe);T.pixelStorei(T.UNPACK_ROW_LENGTH,En),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,ne),T.pixelStorei(T.UNPACK_SKIP_PIXELS,ln),T.pixelStorei(T.UNPACK_SKIP_ROWS,Mi),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Xe),V===0&&H.generateMipmaps&&T.generateMipmap(kt),at.unbindTexture()},this.copyTextureToTexture3D=function(b,H,Z=null,J=null,V=0){return b.isTexture!==!0&&(vs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Z=arguments[0]||null,J=arguments[1]||null,b=arguments[2],H=arguments[3],V=arguments[4]||0),vs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,H,Z,J,V)},this.initRenderTarget=function(b){gt.get(b).__webglFramebuffer===void 0&&w.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?w.setTextureCube(b,0):b.isData3DTexture?w.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?w.setTexture2DArray(b,0):w.setTexture2D(b,0),at.unbindTexture()},this.resetState=function(){C=0,A=0,I=null,at.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}}class Ia{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ft(t),this.density=e}clone(){return new Ia(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class $l extends de{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yn,this.environmentIntensity=1,this.environmentRotation=new yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class pg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=aa,this.updateRanges=[],this.version=0,this.uuid=On()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=On()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=On()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ue=new N;class Tr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=gn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=gn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=gn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=gn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array),r=ae(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ne(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Tr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ch extends jn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new ft(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Fi;const hs=new N,Oi=new N,Bi=new N,ki=new ct,us=new ct,Ph=new ie,sr=new N,ds=new N,rr=new N,Kl=new ct,fo=new ct,Zl=new ct;class mg extends de{constructor(t=new Ch){if(super(),this.isSprite=!0,this.type="Sprite",Fi===void 0){Fi=new xe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new pg(e,5);Fi.setIndex([0,1,2,0,2,3]),Fi.setAttribute("position",new Tr(n,3,0,!1)),Fi.setAttribute("uv",new Tr(n,2,3,!1))}this.geometry=Fi,this.material=t,this.center=new ct(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Oi.setFromMatrixScale(this.matrixWorld),Ph.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Bi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Oi.multiplyScalar(-Bi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;or(sr.set(-.5,-.5,0),Bi,o,Oi,s,r),or(ds.set(.5,-.5,0),Bi,o,Oi,s,r),or(rr.set(.5,.5,0),Bi,o,Oi,s,r),Kl.set(0,0),fo.set(1,0),Zl.set(1,1);let a=t.ray.intersectTriangle(sr,ds,rr,!1,hs);if(a===null&&(or(ds.set(-.5,.5,0),Bi,o,Oi,s,r),fo.set(0,1),a=t.ray.intersectTriangle(sr,rr,ds,!1,hs),a===null))return;const l=t.ray.origin.distanceTo(hs);l<t.near||l>t.far||e.push({distance:l,point:hs.clone(),uv:rn.getInterpolation(hs,sr,ds,rr,Kl,fo,Zl,new ct),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function or(i,t,e,n,s,r){ki.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(us.x=r*ki.x-s*ki.y,us.y=s*ki.x+r*ki.y):us.copy(ki),i.copy(t),i.x+=us.x,i.y+=us.y,i.applyMatrix4(Ph)}class gg extends De{constructor(t=null,e=1,n=1,s,r,o,a,l,c=ke,h=ke,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jl extends Ne{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const zi=new ie,jl=new ie,ar=[],Ql=new vi,_g=new ie,fs=new zt,ps=new xi;class we extends zt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Jl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,_g)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new vi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,zi),Ql.copy(t.boundingBox).applyMatrix4(zi),this.boundingBox.union(Ql)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new xi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,zi),ps.copy(t.boundingSphere).applyMatrix4(zi),this.boundingSphere.union(ps)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(fs.geometry=this.geometry,fs.material=this.material,fs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ps.copy(this.boundingSphere),ps.applyMatrix4(n),t.ray.intersectsSphere(ps)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,zi),jl.multiplyMatrices(n,zi),fs.matrixWorld=jl,fs.raycast(t,ar);for(let o=0,a=ar.length;o<a;o++){const l=ar[o];l.instanceId=r,l.object=this,e.push(l)}ar.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Jl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new gg(new Float32Array(s*this.count),s,this.count,Ea,xn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Lh extends jn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ar=new N,Rr=new N,tc=new ie,ms=new Ra,lr=new xi,po=new N,ec=new N;class vg extends de{constructor(t=new xe,e=new Lh){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Ar.fromBufferAttribute(e,s-1),Rr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Ar.distanceTo(Rr);t.setAttribute("lineDistance",new oe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),lr.copy(n.boundingSphere),lr.applyMatrix4(s),lr.radius+=r,t.ray.intersectsSphere(lr)===!1)return;tc.copy(s).invert(),ms.copy(t.ray).applyMatrix4(tc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){const p=h.getX(_),E=h.getX(_+1),M=cr(this,t,ms,l,p,E);M&&e.push(M)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=cr(this,t,ms,l,_,m);p&&e.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=f,m=g-1;_<m;_+=c){const p=cr(this,t,ms,l,_,_+1);p&&e.push(p)}if(this.isLineLoop){const _=cr(this,t,ms,l,g-1,f);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function cr(i,t,e,n,s,r){const o=i.geometry.attributes.position;if(Ar.fromBufferAttribute(o,s),Rr.fromBufferAttribute(o,r),e.distanceSqToSegment(Ar,Rr,po,ec)>n)return;po.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(po);if(!(l<t.near||l>t.far))return{distance:l,point:ec.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const nc=new N,ic=new N;class xg extends vg{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)nc.fromBufferAttribute(e,s),ic.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+nc.distanceTo(ic);t.setAttribute("lineDistance",new oe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Da extends jn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new ft(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const sc=new ie,ua=new Ra,hr=new xi,ur=new N;class Ih extends de{constructor(t=new xe,e=new Da){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),hr.copy(n.boundingSphere),hr.applyMatrix4(s),hr.radius+=r,t.ray.intersectsSphere(hr)===!1)return;sc.copy(s).invert(),ua.copy(t.ray).applyMatrix4(sc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,_=f;g<_;g++){const m=c.getX(g);ur.fromBufferAttribute(u,m),rc(ur,m,l,s,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,_=f;g<_;g++)ur.fromBufferAttribute(u,g),rc(ur,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function rc(i,t,e,n,s,r,o){const a=ua.distanceSqToPoint(i);if(a<e){const l=new N;ua.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Mg extends De{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Sn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new ct:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new N,s=[],r=[],o=[],a=new N,l=new ie;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new N)}r[0]=new N,o[0]=new N;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ae(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Ae(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Na extends Sn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new ct){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class yg extends Na{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ua(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const dr=new N,mo=new Ua,go=new Ua,_o=new Ua;class Sg extends Sn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new N){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(dr.subVectors(s[0],s[1]).add(s[0]),c=dr);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(dr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=dr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),mo.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,m),go.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,m),_o.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(mo.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),go.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),_o.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(mo.calc(l),go.calc(l),_o.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new N().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function oc(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function bg(i,t){const e=1-i;return e*e*t}function Eg(i,t){return 2*(1-i)*i*t}function wg(i,t){return i*i*t}function Ms(i,t,e,n){return bg(i,t)+Eg(i,e)+wg(i,n)}function Tg(i,t){const e=1-i;return e*e*e*t}function Ag(i,t){const e=1-i;return 3*e*e*i*t}function Rg(i,t){return 3*(1-i)*i*i*t}function Cg(i,t){return i*i*i*t}function ys(i,t,e,n,s){return Tg(i,t)+Ag(i,e)+Rg(i,n)+Cg(i,s)}class Dh extends Sn{constructor(t=new ct,e=new ct,n=new ct,s=new ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ct){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ys(t,s.x,r.x,o.x,a.x),ys(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Pg extends Sn{constructor(t=new N,e=new N,n=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new N){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ys(t,s.x,r.x,o.x,a.x),ys(t,s.y,r.y,o.y,a.y),ys(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Nh extends Sn{constructor(t=new ct,e=new ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ct){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Lg extends Sn{constructor(t=new N,e=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new N){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new N){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Uh extends Sn{constructor(t=new ct,e=new ct,n=new ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ct){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Ms(t,s.x,r.x,o.x),Ms(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ig extends Sn{constructor(t=new N,e=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new N){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Ms(t,s.x,r.x,o.x),Ms(t,s.y,r.y,o.y),Ms(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Fh extends Sn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ct){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(oc(a,l.x,c.x,h.x,u.x),oc(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new ct().fromArray(s))}return this}}var da=Object.freeze({__proto__:null,ArcCurve:yg,CatmullRomCurve3:Sg,CubicBezierCurve:Dh,CubicBezierCurve3:Pg,EllipseCurve:Na,LineCurve:Nh,LineCurve3:Lg,QuadraticBezierCurve:Uh,QuadraticBezierCurve3:Ig,SplineCurve:Fh});class Dg extends Sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new da[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new da[s.type]().fromJSON(s))}return this}}class fa extends Dg{constructor(t){super(),this.type="Path",this.currentPoint=new ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Nh(this.currentPoint.clone(),new ct(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Uh(this.currentPoint.clone(),new ct(t,e),new ct(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new Dh(this.currentPoint.clone(),new ct(t,e),new ct(n,s),new ct(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Fh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){const c=new Na(t,e,n,s,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Fa extends xe{constructor(t=[new ct(0,-.5),new ct(.5,0),new ct(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ae(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/e,u=new N,d=new ct,f=new N,g=new N,_=new N;let m=0,p=0;for(let E=0;E<=t.length-1;E++)switch(E){case 0:m=t[E+1].x-t[E].x,p=t[E+1].y-t[E].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:m=t[E+1].x-t[E].x,p=t[E+1].y-t[E].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(g)}for(let E=0;E<=e;E++){const M=n+E*h*s,v=Math.sin(M),F=Math.cos(M);for(let C=0;C<=t.length-1;C++){u.x=t[C].x*v,u.y=t[C].y,u.z=t[C].x*F,o.push(u.x,u.y,u.z),d.x=E/e,d.y=C/(t.length-1),a.push(d.x,d.y);const A=l[3*C+0]*v,I=l[3*C+1],S=l[3*C+0]*F;c.push(A,I,S)}}for(let E=0;E<e;E++)for(let M=0;M<t.length-1;M++){const v=M+E*t.length,F=v,C=v+t.length,A=v+t.length+1,I=v+1;r.push(F,C,I),r.push(A,I,C)}this.setIndex(r),this.setAttribute("position",new oe(o,3)),this.setAttribute("uv",new oe(a,2)),this.setAttribute("normal",new oe(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fa(t.points,t.segments,t.phiStart,t.phiLength)}}class Oe extends xe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;E(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new oe(u,3)),this.setAttribute("normal",new oe(d,3)),this.setAttribute("uv",new oe(f,2));function E(){const v=new N,F=new N;let C=0;const A=(e-t)/n;for(let I=0;I<=r;I++){const S=[],x=I/r,P=x*(e-t)+t;for(let U=0;U<=s;U++){const D=U/s,k=D*l+a,q=Math.sin(k),B=Math.cos(k);F.x=P*q,F.y=-x*n+m,F.z=P*B,u.push(F.x,F.y,F.z),v.set(q,A,B).normalize(),d.push(v.x,v.y,v.z),f.push(D,1-x),S.push(g++)}_.push(S)}for(let I=0;I<s;I++)for(let S=0;S<r;S++){const x=_[S][I],P=_[S+1][I],U=_[S+1][I+1],D=_[S][I+1];(t>0||S!==0)&&(h.push(x,P,D),C+=3),(e>0||S!==r-1)&&(h.push(P,U,D),C+=3)}c.addGroup(p,C,0),p+=C}function M(v){const F=g,C=new ct,A=new N;let I=0;const S=v===!0?t:e,x=v===!0?1:-1;for(let U=1;U<=s;U++)u.push(0,m*x,0),d.push(0,x,0),f.push(.5,.5),g++;const P=g;for(let U=0;U<=s;U++){const k=U/s*l+a,q=Math.cos(k),B=Math.sin(k);A.x=S*B,A.y=m*x,A.z=S*q,u.push(A.x,A.y,A.z),d.push(0,x,0),C.x=q*.5+.5,C.y=B*.5*x+.5,f.push(C.x,C.y),g++}for(let U=0;U<s;U++){const D=F+U,k=P+U;v===!0?h.push(k,k+1,D):h.push(k+1,k,D),I+=3}c.addGroup(p,I,v===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Oa extends fa{constructor(t){super(t),this.uuid=On(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new fa().fromJSON(s))}return this}}const Ng={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Oh(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,d,f;if(n&&(r=kg(i,t,r,e)),i.length>80*e){a=c=i[0],l=h=i[1];for(let g=e;g<s;g+=e)u=i[g],d=i[g+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return Rs(r,o,e,a,l,f,0),o}};function Oh(i,t,e,n,s){let r,o;if(s===Zg(i,t,e,n)>0)for(r=t;r<e;r+=n)o=ac(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=ac(r,i[r],i[r+1],o);return o&&Ir(o,o.next)&&(Ps(o),o=o.next),o}function _i(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Ir(e,e.next)||_e(e.prev,e,e.next)===0)){if(Ps(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Rs(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Wg(i,n,s,r);let a=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?Fg(i,n,s,r):Ug(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),Ps(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Og(_i(i),t,e),Rs(i,t,e,n,s,r,2)):o===2&&Bg(i,t,e,n,s,r):Rs(_i(i),t,e,n,s,r,1);break}}}function Ug(i){const t=i.prev,e=i,n=i.next;if(_e(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,d=s>r?s>o?s:o:r>o?r:o,f=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Hi(s,a,r,l,o,c,g.x,g.y)&&_e(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Fg(i,t,e,n){const s=i.prev,r=i,o=i.next;if(_e(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,d=o.y,f=a<l?a<c?a:c:l<c?l:c,g=h<u?h<d?h:d:u<d?u:d,_=a>l?a>c?a:c:l>c?l:c,m=h>u?h>d?h:d:u>d?u:d,p=pa(f,g,t,e,n),E=pa(_,m,t,e,n);let M=i.prevZ,v=i.nextZ;for(;M&&M.z>=p&&v&&v.z<=E;){if(M.x>=f&&M.x<=_&&M.y>=g&&M.y<=m&&M!==s&&M!==o&&Hi(a,h,l,u,c,d,M.x,M.y)&&_e(M.prev,M,M.next)>=0||(M=M.prevZ,v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Hi(a,h,l,u,c,d,v.x,v.y)&&_e(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;M&&M.z>=p;){if(M.x>=f&&M.x<=_&&M.y>=g&&M.y<=m&&M!==s&&M!==o&&Hi(a,h,l,u,c,d,M.x,M.y)&&_e(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;v&&v.z<=E;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Hi(a,h,l,u,c,d,v.x,v.y)&&_e(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Og(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!Ir(s,r)&&Bh(s,n,n.next,r)&&Cs(s,r)&&Cs(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Ps(n),Ps(n.next),n=i=r),n=n.next}while(n!==i);return _i(n)}function Bg(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Yg(o,a)){let l=kh(o,a);o=_i(o,o.next),l=_i(l,l.next),Rs(o,t,e,n,s,r,0),Rs(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function kg(i,t,e,n){const s=[];let r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=Oh(i,a,l,n,!1),c===c.next&&(c.steiner=!0),s.push(qg(c));for(s.sort(zg),r=0;r<s.length;r++)e=Gg(s[r],e);return e}function zg(i,t){return i.x-t.x}function Gg(i,t){const e=Hg(i,t);if(!e)return t;const n=kh(e,i);return _i(n,n.next),_i(e,e.next)}function Hg(i,t){let e=t,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,l=s.x,c=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&Hi(o<c?r:n,o,l,c,o<c?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),Cs(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&Vg(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function Vg(i,t){return _e(i.prev,i,t.prev)<0&&_e(t.next,i,i.next)<0}function Wg(i,t,e,n){let s=i;do s.z===0&&(s.z=pa(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Xg(s)}function Xg(i){let t,e,n,s,r,o,a,l,c=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(o>1);return i}function pa(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function qg(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Hi(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Yg(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!$g(i,t)&&(Cs(i,t)&&Cs(t,i)&&Kg(i,t)&&(_e(i.prev,i,t.prev)||_e(i,t.prev,t))||Ir(i,t)&&_e(i.prev,i,i.next)>0&&_e(t.prev,t,t.next)>0)}function _e(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Ir(i,t){return i.x===t.x&&i.y===t.y}function Bh(i,t,e,n){const s=pr(_e(i,t,e)),r=pr(_e(i,t,n)),o=pr(_e(e,n,i)),a=pr(_e(e,n,t));return!!(s!==r&&o!==a||s===0&&fr(i,e,t)||r===0&&fr(i,n,t)||o===0&&fr(e,i,n)||a===0&&fr(e,t,n))}function fr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function pr(i){return i>0?1:i<0?-1:0}function $g(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Bh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Cs(i,t){return _e(i.prev,i,i.next)<0?_e(i,t,i.next)>=0&&_e(i,i.prev,t)>=0:_e(i,t,i.prev)<0||_e(i,i.next,t)<0}function Kg(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function kh(i,t){const e=new ma(i.i,i.x,i.y),n=new ma(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function ac(i,t,e,n){const s=new ma(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Ps(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function ma(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Zg(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Ss{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Ss.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];lc(t),cc(n,t);let o=t.length;e.forEach(lc);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,cc(n,e[l]);const a=Ng.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function lc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function cc(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Dr extends xe{constructor(t=new Oa([new ct(.5,.5),new ct(-.5,.5),new ct(-.5,-.5),new ct(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new oe(s,3)),this.setAttribute("uv",new oe(r,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,E=e.UVGenerator!==void 0?e.UVGenerator:Jg;let M,v=!1,F,C,A,I;p&&(M=p.getSpacedPoints(h),v=!0,d=!1,F=p.computeFrenetFrames(h,!1),C=new N,A=new N,I=new N),d||(m=0,f=0,g=0,_=0);const S=a.extractPoints(c);let x=S.shape;const P=S.holes;if(!Ss.isClockWise(x)){x=x.reverse();for(let X=0,Q=P.length;X<Q;X++){const T=P[X];Ss.isClockWise(T)&&(P[X]=T.reverse())}}const D=Ss.triangulateShape(x,P),k=x;for(let X=0,Q=P.length;X<Q;X++){const T=P[X];x=x.concat(T)}function q(X,Q,T){return Q||console.error("THREE.ExtrudeGeometry: vec does not exist"),X.clone().addScaledVector(Q,T)}const B=x.length,W=D.length;function z(X,Q,T){let dt,tt,_t;const at=X.x-Q.x,yt=X.y-Q.y,gt=T.x-X.x,w=T.y-X.y,y=at*at+yt*yt,$=at*w-yt*gt;if(Math.abs($)>Number.EPSILON){const j=Math.sqrt(y),ot=Math.sqrt(gt*gt+w*w),nt=Q.x-yt/j,Ct=Q.y+at/j,Et=T.x-w/ot,Pt=T.y+gt/ot,Kt=((Et-nt)*w-(Pt-Ct)*gt)/(at*w-yt*gt);dt=nt+at*Kt-X.x,tt=Ct+yt*Kt-X.y;const vt=dt*dt+tt*tt;if(vt<=2)return new ct(dt,tt);_t=Math.sqrt(vt/2)}else{let j=!1;at>Number.EPSILON?gt>Number.EPSILON&&(j=!0):at<-Number.EPSILON?gt<-Number.EPSILON&&(j=!0):Math.sign(yt)===Math.sign(w)&&(j=!0),j?(dt=-yt,tt=at,_t=Math.sqrt(y)):(dt=at,tt=yt,_t=Math.sqrt(y/2))}return new ct(dt/_t,tt/_t)}const it=[];for(let X=0,Q=k.length,T=Q-1,dt=X+1;X<Q;X++,T++,dt++)T===Q&&(T=0),dt===Q&&(dt=0),it[X]=z(k[X],k[T],k[dt]);const ht=[];let ut,mt=it.concat();for(let X=0,Q=P.length;X<Q;X++){const T=P[X];ut=[];for(let dt=0,tt=T.length,_t=tt-1,at=dt+1;dt<tt;dt++,_t++,at++)_t===tt&&(_t=0),at===tt&&(at=0),ut[dt]=z(T[dt],T[_t],T[at]);ht.push(ut),mt=mt.concat(ut)}for(let X=0;X<m;X++){const Q=X/m,T=f*Math.cos(Q*Math.PI/2),dt=g*Math.sin(Q*Math.PI/2)+_;for(let tt=0,_t=k.length;tt<_t;tt++){const at=q(k[tt],it[tt],dt);K(at.x,at.y,-T)}for(let tt=0,_t=P.length;tt<_t;tt++){const at=P[tt];ut=ht[tt];for(let yt=0,gt=at.length;yt<gt;yt++){const w=q(at[yt],ut[yt],dt);K(w.x,w.y,-T)}}}const St=g+_;for(let X=0;X<B;X++){const Q=d?q(x[X],mt[X],St):x[X];v?(A.copy(F.normals[0]).multiplyScalar(Q.x),C.copy(F.binormals[0]).multiplyScalar(Q.y),I.copy(M[0]).add(A).add(C),K(I.x,I.y,I.z)):K(Q.x,Q.y,0)}for(let X=1;X<=h;X++)for(let Q=0;Q<B;Q++){const T=d?q(x[Q],mt[Q],St):x[Q];v?(A.copy(F.normals[X]).multiplyScalar(T.x),C.copy(F.binormals[X]).multiplyScalar(T.y),I.copy(M[X]).add(A).add(C),K(I.x,I.y,I.z)):K(T.x,T.y,u/h*X)}for(let X=m-1;X>=0;X--){const Q=X/m,T=f*Math.cos(Q*Math.PI/2),dt=g*Math.sin(Q*Math.PI/2)+_;for(let tt=0,_t=k.length;tt<_t;tt++){const at=q(k[tt],it[tt],dt);K(at.x,at.y,u+T)}for(let tt=0,_t=P.length;tt<_t;tt++){const at=P[tt];ut=ht[tt];for(let yt=0,gt=at.length;yt<gt;yt++){const w=q(at[yt],ut[yt],dt);v?K(w.x,w.y+M[h-1].y,M[h-1].x+T):K(w.x,w.y,u+T)}}}R(),Y();function R(){const X=s.length/3;if(d){let Q=0,T=B*Q;for(let dt=0;dt<W;dt++){const tt=D[dt];pt(tt[2]+T,tt[1]+T,tt[0]+T)}Q=h+m*2,T=B*Q;for(let dt=0;dt<W;dt++){const tt=D[dt];pt(tt[0]+T,tt[1]+T,tt[2]+T)}}else{for(let Q=0;Q<W;Q++){const T=D[Q];pt(T[2],T[1],T[0])}for(let Q=0;Q<W;Q++){const T=D[Q];pt(T[0]+B*h,T[1]+B*h,T[2]+B*h)}}n.addGroup(X,s.length/3-X,0)}function Y(){const X=s.length/3;let Q=0;st(k,Q),Q+=k.length;for(let T=0,dt=P.length;T<dt;T++){const tt=P[T];st(tt,Q),Q+=tt.length}n.addGroup(X,s.length/3-X,1)}function st(X,Q){let T=X.length;for(;--T>=0;){const dt=T;let tt=T-1;tt<0&&(tt=X.length-1);for(let _t=0,at=h+m*2;_t<at;_t++){const yt=B*_t,gt=B*(_t+1),w=Q+dt+yt,y=Q+tt+yt,$=Q+tt+gt,j=Q+dt+gt;Mt(w,y,$,j)}}}function K(X,Q,T){l.push(X),l.push(Q),l.push(T)}function pt(X,Q,T){Ut(X),Ut(Q),Ut(T);const dt=s.length/3,tt=E.generateTopUV(n,s,dt-3,dt-2,dt-1);It(tt[0]),It(tt[1]),It(tt[2])}function Mt(X,Q,T,dt){Ut(X),Ut(Q),Ut(dt),Ut(Q),Ut(T),Ut(dt);const tt=s.length/3,_t=E.generateSideWallUV(n,s,tt-6,tt-3,tt-2,tt-1);It(_t[0]),It(_t[1]),It(_t[3]),It(_t[1]),It(_t[2]),It(_t[3])}function Ut(X){s.push(l[X*3+0]),s.push(l[X*3+1]),s.push(l[X*3+2])}function It(X){r.push(X.x),r.push(X.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return jg(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new da[s.type]().fromJSON(s)),new Dr(n,t.options)}}const Jg={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new ct(r,o),new ct(a,l),new ct(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],g=t[s*3+2],_=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new ct(o,1-l),new ct(c,1-u),new ct(d,1-g),new ct(_,1-p)]:[new ct(a,1-l),new ct(h,1-u),new ct(f,1-g),new ct(m,1-p)]}};function jg(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Ji extends xe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new N,d=new N,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const E=[],M=p/n;let v=0;p===0&&o===0?v=.5/e:p===n&&l===Math.PI&&(v=-.5/e);for(let F=0;F<=e;F++){const C=F/e;u.x=-t*Math.cos(s+C*r)*Math.sin(o+M*a),u.y=t*Math.cos(o+M*a),u.z=t*Math.sin(s+C*r)*Math.sin(o+M*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(C+v,1-M),E.push(c++)}h.push(E)}for(let p=0;p<n;p++)for(let E=0;E<e;E++){const M=h[p][E+1],v=h[p][E],F=h[p+1][E],C=h[p+1][E+1];(p!==0||o>0)&&f.push(M,v,C),(p!==n-1||l<Math.PI)&&f.push(v,F,C)}this.setIndex(f),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(_,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ji(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ba extends xe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new N,u=new N,d=new N;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const _=g/s*r,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(_),u.y=(t+e*Math.cos(m))*Math.sin(_),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const _=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,E=(s+1)*f+g;o.push(_,m,E),o.push(m,p,E)}this.setIndex(o),this.setAttribute("position",new oe(a,3)),this.setAttribute("normal",new oe(l,3)),this.setAttribute("uv",new oe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ba(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Qg extends Le{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class ge extends jn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ft(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=uh,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class zh extends ge{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ct(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ae(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ft(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ft(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ft(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Nr extends de{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ft(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class t_ extends Nr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ft(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const vo=new ie,hc=new N,uc=new N;class ka{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ct(512,512),this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ca,this._frameExtents=new ct(1,1),this._viewportCount=1,this._viewports=[new le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;hc.setFromMatrixPosition(t.matrixWorld),e.position.copy(hc),uc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(uc),e.updateMatrixWorld(),vo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(vo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class e_ extends ka{constructor(){super(new We(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Er*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class n_ extends Nr{constructor(t,e,n=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.target=new de,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new e_}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const dc=new ie,gs=new N,xo=new N;class i_ extends ka{constructor(){super(new We(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ct(4,2),this._viewportCount=6,this._viewports=[new le(2,1,1,1),new le(0,1,1,1),new le(3,1,1,1),new le(1,1,1,1),new le(3,0,1,1),new le(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),gs.setFromMatrixPosition(t.matrixWorld),n.position.copy(gs),xo.copy(n.position),xo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(xo),n.updateMatrixWorld(),s.makeTranslation(-gs.x,-gs.y,-gs.z),dc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(dc)}}class mr extends Nr{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new i_}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class s_ extends ka{constructor(){super(new Pa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class r_ extends Nr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.target=new de,this.shadow=new s_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class o_{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=fc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=fc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function fc(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:va}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=va);const Gh={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class ns{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const a_=new Pa(-1,1,1,-1,0,1);class l_ extends xe{constructor(){super(),this.setAttribute("position",new oe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new oe([0,2,0,0,2,0],2))}}const c_=new l_;class za{constructor(t){this._mesh=new zt(c_,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,a_)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Hh extends ns{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Le?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=As.clone(t.uniforms),this.material=new Le({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new za(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class pc extends ns{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class h_ extends ns{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class u_{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new ct);this._width=n.width,this._height=n.height,e=new on(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Mn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Hh(Gh),this.copyPass.material.blending=Fn,this.clock=new o_}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}pc!==void 0&&(o instanceof pc?n=!0:o instanceof h_&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new ct);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const d_={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class f_ extends ns{constructor(){super();const t=d_;this.uniforms=As.clone(t.uniforms),this.material=new Qg({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new za(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Qt.getTransfer(this._outputColorSpace)===re&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Zc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Jc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===jc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ma?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Qc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===th&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class p_ extends ns{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ft}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const m_={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ft(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ji extends ns{constructor(t,e,n,s){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new ct(t.x,t.y):new ct(256,256),this.clearColor=new ft(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new on(r,o,{type:Mn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new on(r,o,{type:Mn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new on(r,o,{type:Mn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=m_;this.highPassUniforms=As.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Le({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ct(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Gh;this.copyUniforms=As.clone(h.uniforms),this.blendMaterial=new Le({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:_n,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new ft,this.oldClearAlpha=1,this.basic=new Zt,this.fsQuad=new za(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ct(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=ji.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ji.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Le({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new ct(.5,.5)},direction:{value:new ct(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new Le({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}ji.BlurDirectionX=new ct(1,0);ji.BlurDirectionY=new ct(0,1);const mc=[{name:"Kestrel",paint:"#F1EDE7",accent:"#F1EDE7",length:4.5,width:1.96,wheelbase:2.72,track:1.68,wheelR:.35,top:[[-2.18,.4],[-2.3,.76],[-2,.88],[-1,.86],[.7,.74],[1.9,.56],[2.22,.4]],canopy:[[-1.78,.86],[-1,1.12],[-.15,1.15],[.72,.76]],canopyWidth:.7,wing:"low",flare:.02},{name:"Rook",paint:"#E30016",accent:"#E30016",length:4.4,width:1.94,wheelbase:2.68,track:1.66,wheelR:.34,top:[[-2.2,.46],[-2.22,.78],[-1.6,.84],[-.4,.82],[.6,.68],[2,.42],[2.2,.3]],canopy:[[-1.4,.82],[-.7,1.06],[0,1.07],[.6,.7]],canopyWidth:.6,wing:"tall",flare:0},{name:"Sable",paint:"#72151D",accent:"#AB0B1A",length:4.8,width:1.98,wheelbase:2.9,track:1.7,wheelR:.36,top:[[-2.4,.5],[-2.38,.86],[-1.6,.95],[-.4,.9],[.9,.78],[2.2,.6],[2.42,.44]],canopy:[[-2,.94],[-1.05,1.22],[.05,1.24],[.95,.8]],canopyWidth:.78,wing:"none",flare:0},{name:"Cinder",paint:"#AF7D7E",accent:"#E30016",length:4.2,width:2.04,wheelbase:2.56,track:1.76,wheelR:.37,top:[[-2.1,.48],[-2.12,.92],[-1.5,.98],[-.7,.96],[.5,.82],[1.8,.62],[2.1,.46]],canopy:[[-1.45,.96],[-.8,1.26],[.05,1.27],[.5,.84]],canopyWidth:.74,wing:"low",flare:.08}];function g_(i){return{glass:new zh({color:590852,metalness:0,roughness:.04,clearcoat:1,clearcoatRoughness:.02,envMapIntensity:1.6,reflectivity:.9}),rubber:new ge({color:787461,roughness:.88,metalness:0}),rim:new ge({color:14799309,roughness:.28,metalness:1}),disc:new ge({color:2623756,roughness:.45,metalness:.9}),trim:new ge({color:590852,roughness:.55,metalness:.2}),seam:new Zt({color:328451}),headlight:new ge({color:656389,emissive:16513528,emissiveIntensity:6,roughness:.2}),shadow:new Zt({map:i,color:197379,transparent:!0,opacity:.75,depthWrite:!1}),glow:i}}function gc(i,t,e){const n=new Oa;n.moveTo(i[0][0],i[0][1]);for(let r=1;r<i.length;r++)n.lineTo(i[r][0],i[r][1]);n.closePath();const s=new Dr(n,{depth:t,bevelEnabled:!0,bevelThickness:e,bevelSize:e,bevelSegments:4,curveSegments:6});return s.rotateY(Math.PI/2),s.translate(-t/2,0,0),s.computeVertexNormals(),s}function __(i){const t=[],e=i.wheelbase/2,n=i.wheelR+.07,s=i.wheelR+.02,r=.2,o=i.top[0][0],a=i.top[i.top.length-1][0];t.push([o+.03,r+.04]);for(const l of[-e,e]){t.push([l-n-.02,r]);for(let c=0;c<=10;c++){const h=Math.PI-c/10*Math.PI;t.push([l+Math.cos(h)*n,s+Math.sin(h)*n])}t.push([l+n+.02,r])}t.push([a-.08,r+.02]);for(let l=i.top.length-1;l>=0;l--)t.push(i.top[l]);return t}function _c(i,t,e,n){const s=i.attributes.position;for(let r=0;r<s.count;r++){const o=s.getY(r),a=Math.min(1,Math.max(0,(o-t)/(e-t)));s.setX(r,s.getX(r)*(1-(1-n)*a*a))}s.needsUpdate=!0,i.computeVertexNormals()}function v_(i,t){const e=[],n=i*.72;e.push(new ct(n,-t/2));for(let r=0;r<=8;r++){const o=-Math.PI/2+r/8*Math.PI;e.push(new ct(i-.05+Math.cos(o)*.05,Math.sin(o)*(t/2)))}e.push(new ct(n,t/2));const s=new Fa(e,28);return s.rotateZ(Math.PI/2),s}class x_{constructor(t,e){L(this,"root",new Ze);L(this,"body",new Ze);L(this,"spec");L(this,"wheels",[]);L(this,"tail");L(this,"paint");L(this,"underMat");L(this,"exhaust",[]);L(this,"exhaustMat");L(this,"spinA",0);L(this,"geoms",[]);L(this,"mats",[]);L(this,"exhaustPos",new N);L(this,"halfLength");this.spec=t,this.halfLength=t.length/2,this.root.add(this.body),this.root.rotation.order="YXZ";const n=t.width,s=W=>(this.geoms.push(W),W),r=W=>(this.mats.push(W),W);this.paint=r(new zh({color:t.paint,metalness:.3,roughness:.36,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:1.2})),this.tail=r(new ge({color:394244,emissive:11798809,emissiveIntensity:2.2,roughness:.3}));const o=r(new ge({color:328451,emissive:new ft(t.accent),emissiveIntensity:2.2,roughness:.3}));this.underMat=r(new ge({color:197379,emissive:new ft(t.accent),emissiveIntensity:.9}));const a=(W,z,it=this.body,ht=!0)=>{const ut=new zt(W,z);return ut.castShadow=ht,it.add(ut),ut},l=(W,z,it)=>s(new ue(W,z,it)),c=.07,h=s(gc(__(t),n-c*2-.04,c));if(_c(h,.45,.95,.8),a(h,this.paint),t.flare>0)for(const W of[-1,1])for(const z of[-t.wheelbase/2,t.wheelbase/2])a(l(t.flare+.06,.12,t.wheelR*2.5),this.paint).position.set(W*(n/2+t.flare/2-.02),t.wheelR*2+.06,-z);const u=n*t.canopyWidth,d=s(gc(t.canopy.concat([[t.canopy[t.canopy.length-1][0]-.1,t.canopy[0][1]-.04]]),u-.24,.12));_c(d,.8,1.28,.72),a(d,e.glass);const f=n/2-.005,g=[-t.canopy[t.canopy.length-1][0]+.05,-t.canopy[0][0]-.25];for(const W of[-1,1]){for(const ht of g)a(l(.006,.36,.012),e.seam,this.body,!1).position.set(W*f,.56,ht);a(l(.008,.012,t.wheelbase-t.wheelR*2.4),e.seam,this.body,!1).position.set(W*f,.36,0),a(l(.05,.07,t.wheelbase-t.wheelR*2.3),e.trim).position.set(W*(n/2-.02),.22,0)}const _=a(l(n*.7,.008,.01),e.seam,this.body,!1),m=t.top[t.top.length-2];_.position.set(0,m[1]+.035,-m[0]+.15),_.rotation.x=-.15;const p=t.top[t.top.length-1][0],E=t.top[0][0];a(l(n*.94,.04,.3),e.trim).position.set(0,.17,-p-.02),a(l(n*.8,.16,.3),e.trim).position.set(0,.26,-E+.12);for(let W=-2;W<=2;W++)a(l(.02,.14,.32),e.trim).position.set(W*.22,.24,-E+.14);a(l(n*.78,.035,.04),o,this.body,!1).position.set(0,t.top[t.top.length-1][1]+.03,-p-.05);for(const W of[-1,1])a(l(.34,.06,.06),e.headlight,this.body,!1).position.set(W*(n/2-.3),t.top[t.top.length-1][1]-.04,-p-.04);if(a(l(n*.86,.3,.03),e.trim,this.body,!1).position.set(0,t.top[0][1]+.2,-E+.16),a(l(n*.84,.05,.04),this.tail,this.body,!1).position.set(0,t.top[0][1]+.3,-E+.19),a(l(n*.75,.02,t.wheelbase*.9),this.underMat,this.body,!1).position.set(0,.17,0),t.wing!=="none"){const W=t.wing==="tall"?.42:.14,z=a(l(n*.92,.04,.34),this.paint);z.position.set(0,t.top[1][1]+W+.04,-E-.22),z.rotation.x=.12;for(const it of[-1,1])a(l(.03,W+.04,.12),e.trim).position.set(it*n*.32,t.top[1][1]+W/2,-E-.2)}this.exhaustMat=r(new Ch({map:e.glow,color:new ft("#fbfaf8"),transparent:!0,blending:_n,depthWrite:!1,opacity:0}));const S=s(new Oe(.07,.08,.16,14,1,!0));S.rotateX(Math.PI/2);for(const W of[-.38,.38]){a(S,e.disc,this.body,!1).position.set(W,.32,-E+.2);const it=new mg(this.exhaustMat);it.position.set(W,.32,-E+.36),it.renderOrder=5,this.body.add(it),this.exhaust.push(it)}this.exhaustPos.set(0,.32,-E+.4);const x=s(v_(t.wheelR,.3)),P=s(new Oe(t.wheelR*.68,t.wheelR*.68,.02,24));P.rotateZ(Math.PI/2);const U=l(.02,t.wheelR*1.25,.06),D=s(new Oe(t.wheelR*.58,t.wheelR*.58,.03,24));D.rotateZ(Math.PI/2);const k=r(new ge({color:new ft(t.accent).multiplyScalar(.5),roughness:.4,metalness:.3})),q=l(.07,.16,.12);for(const W of[1,-1])for(const z of[-1,1]){const it=new Ze;it.position.set(z*t.track/2,t.wheelR,-W*t.wheelbase/2),this.root.add(it);const ht=new Ze;it.add(ht);const ut=new zt(x,e.rubber);ut.castShadow=!0,ht.add(ut);const mt=new zt(P,e.rim);mt.position.x=z*.1,ht.add(mt);for(let Y=0;Y<5;Y++){const st=new zt(U,e.rim);st.position.x=z*.125,st.rotation.x=Y/5*Math.PI,ht.add(st)}const St=new zt(D,e.disc);St.position.x=-z*.02,ht.add(St);const R=new zt(q,k);R.position.set(z*.04,t.wheelR*.4,W*.08),it.add(R),this.wheels.push({pivot:it,spin:ht,front:W===1})}const B=new zt(s(new Ke(n*1.5,t.length*1.25)),e.shadow);B.rotation.x=-Math.PI/2,B.position.y=.02,B.renderOrder=1,this.root.add(B)}animate(t,e,n,s,r){this.spinA-=t/this.spec.wheelR;for(const a of this.wheels)a.spin.rotation.x=this.spinA,a.pivot.rotation.y=a.front?-e*.38:0;this.tail.emissiveIntensity=n?9:2.2;const o=.85+.15*Math.sin(r*70);this.exhaustMat.opacity=Math.min(1,s*1.2)*o;for(const a of this.exhaust){const l=.25+s*.6*o;a.scale.set(l,l,l)}}dispose(){for(const t of this.geoms)t.dispose();for(const t of this.mats)t.dispose();this.root.removeFromParent()}}class vc{constructor(t,e,n,s,r,o,a){L(this,"points");L(this,"pos");L(this,"col");L(this,"vel");L(this,"life");L(this,"max");L(this,"base");L(this,"next",0);L(this,"live",0);this.size=t,this.gravity=r,this.drag=o,this.grow=a,this.pos=new Float32Array(t*3),this.col=new Float32Array(t*4),this.vel=new Float32Array(t*3),this.life=new Float32Array(t),this.max=new Float32Array(t),this.base=new Float32Array(t*4);const l=new xe;l.setAttribute("position",new Ne(this.pos,3).setUsage(la)),l.setAttribute("color",new Ne(this.col,4).setUsage(la));const c=new Da({size:n,map:e,vertexColors:!0,transparent:!0,depthWrite:!1,sizeAttenuation:!0,blending:s?_n:fi});this.points=new Ih(l,c),this.points.frustumCulled=!1,this.points.renderOrder=6}spawn(t,e,n,s,r,o,a,l,c,h,u){const d=this.next;this.next=(this.next+1)%this.size,this.pos[d*3]=t,this.pos[d*3+1]=e,this.pos[d*3+2]=n,this.vel[d*3]=s,this.vel[d*3+1]=r,this.vel[d*3+2]=o,this.life[d]=a,this.max[d]=a,this.base[d*4]=l,this.base[d*4+1]=c,this.base[d*4+2]=h,this.base[d*4+3]=u,this.live=this.size}update(t){if(!this.live)return;let e=0;const n=Math.exp(-this.drag*t);for(let r=0;r<this.size;r++){if(this.life[r]<=0){this.col[r*4+3]=0;continue}e++,this.life[r]-=t;const o=Math.max(0,this.life[r]/this.max[r]);this.vel[r*3]*=n,this.vel[r*3+1]=this.vel[r*3+1]*n-this.gravity*t,this.vel[r*3+2]*=n,this.pos[r*3]+=this.vel[r*3]*t,this.pos[r*3+1]+=this.vel[r*3+1]*t,this.pos[r*3+2]+=this.vel[r*3+2]*t,this.col[r*4]=this.base[r*4],this.col[r*4+1]=this.base[r*4+1],this.col[r*4+2]=this.base[r*4+2],this.col[r*4+3]=this.base[r*4+3]*(this.grow>0?o*(1-o)*4:o)}e||(this.live=0);const s=this.points.geometry;s.attributes.position.needsUpdate=!0,s.attributes.color.needsUpdate=!0}clear(){this.life.fill(0),this.col.fill(0),this.points.geometry.attributes.color.needsUpdate=!0,this.live=0}dispose(){this.points.geometry.dispose(),this.points.material.dispose(),this.points.removeFromParent()}}class M_{constructor(t,e){L(this,"group",new Ze);L(this,"sparks");L(this,"mist");L(this,"streaks");L(this,"sp");L(this,"streakState",[]);L(this,"streakMat");this.sparks=new vc(220,t,.22,!0,9.8,1.2,0),this.mist=new vc(260,e,1.25,!1,-.4,1.6,1),this.group.add(this.sparks.points,this.mist.points);const n=70;this.sp=new Float32Array(n*6);const s=new xe;s.setAttribute("position",new Ne(this.sp,3).setUsage(la)),this.streakMat=new Lh({color:16447991,transparent:!0,opacity:0,blending:_n,depthWrite:!1,fog:!1}),this.streaks=new xg(s,this.streakMat),this.streaks.frustumCulled=!1,this.streaks.renderOrder=8;for(let r=0;r<n;r++)this.streakState.push(this.newStreak(!0))}newStreak(t){return{x:(Math.random()<.5?-1:1)*(3.2+Math.random()*5),y:-1.6+Math.random()*3.6,z:t?-Math.random()*60:-60-Math.random()*10,len:1.2+Math.random()*2.4}}updateStreaks(t,e,n,s){if(this.streakMat.opacity=Math.min(.2,n*.18),this.streakMat.color.setRGB(.95,.93-s*.45,.9-s*.43),this.streaks.visible=n>.02,!this.streaks.visible)return;const r=e*(1.6+s);for(let o=0;o<this.streakState.length;o++){const a=this.streakState[o];a.z+=r*t,a.z>2&&(this.streakState[o]=this.newStreak(!1));const l=this.streakState[o],c=l.len*(.3+n*.9)*(1+s*.6);this.sp[o*6]=l.x,this.sp[o*6+1]=l.y,this.sp[o*6+2]=l.z,this.sp[o*6+3]=l.x,this.sp[o*6+4]=l.y,this.sp[o*6+5]=l.z-c}this.streaks.geometry.attributes.position.needsUpdate=!0}update(t){this.sparks.update(t),this.mist.update(t)}clear(){this.sparks.clear(),this.mist.clear()}dispose(){this.sparks.dispose(),this.mist.dispose(),this.streaks.geometry.dispose(),this.streakMat.dispose(),this.streaks.removeFromParent(),this.group.removeFromParent()}}const Te=1/150,me=7.5,xc=.006,y_=.022,Be=260,ga=520,Vh=()=>({x:0,y:0,z:0,head:0,bank:0,pitch:0}),Es=class Es{constructor(t){L(this,"n");L(this,"rows");L(this,"px");L(this,"py");L(this,"pz");L(this,"head");L(this,"bank");L(this,"curve");L(this,"grid",new Map);this.track=t;const e=t.segs,n=e.length;this.n=n,this.rows=Be+n+ga+1;const s=this.rows;this.px=new Float32Array(s),this.py=new Float32Array(s),this.pz=new Float32Array(s),this.head=new Float32Array(s),this.bank=new Float32Array(s),this.curve=new Float32Array(s);const r=a=>e[(a%n+n)%n],o=rt.SEG_LEN*Te;for(let a=Be;a<s;a++){const l=a-Be,c=r(l);if(this.curve[a]=c.curve,this.py[a]=c.y1*Te,a>Be){const h=this.head[a-1],u=h+r(l-1).curve*xc,d=(h+u)/2;this.head[a]=u,this.px[a]=this.px[a-1]+Math.sin(d)*o,this.pz[a]=this.pz[a-1]-Math.cos(d)*o}}for(let a=Be-1;a>=0;a--){const l=a-Be,c=r(l);this.curve[a]=c.curve,this.py[a]=c.y1*Te;const h=this.head[a+1],u=h-c.curve*xc,d=(u+h)/2;this.head[a]=u,this.px[a]=this.px[a+1]-Math.sin(d)*o,this.pz[a]=this.pz[a+1]+Math.cos(d)*o}for(let a=0;a<s;a++){let l=0,c=0;for(let h=-6;h<=6;h++){const u=a+h;u<0||u>=s||(l+=this.curve[u],c++)}this.bank[a]=l/c*y_}for(let a=0;a<s;a+=2)this.addGrid(a)}key(t,e){return(t+4096)*8192+(e+4096)}addGrid(t){const e=Es.CELL,n=this.key(Math.floor(this.px[t]/e),Math.floor(this.pz[t]/e));let s=this.grid.get(n);s||this.grid.set(n,s=[]),s.push(t)}nearRoad(t,e,n,s=-1,r=-1){const o=Es.CELL,a=Math.ceil(n/o),l=Math.floor(t/o),c=Math.floor(e/o),h=n*n;for(let u=-a;u<=a;u++)for(let d=-a;d<=a;d++){const f=this.grid.get(this.key(l+u,c+d));if(f)for(const g of f){if(g>=s&&g<=r)continue;const _=this.px[g]-t,m=this.pz[g]-e;if(_*_+m*m<h)return!0}}return!1}get length(){return this.n*rt.SEG_LEN}get minS(){return-Be*rt.SEG_LEN}get maxS(){return(this.n+ga)*rt.SEG_LEN}sample(t,e){const n=t/rt.SEG_LEN+Be;let s=Math.floor(n);s<0&&(s=0),s>this.rows-2&&(s=this.rows-2);const r=Math.min(1,Math.max(0,n-s)),o=s,a=s+1;return e.x=this.px[o]+(this.px[a]-this.px[o])*r,e.y=this.py[o]+(this.py[a]-this.py[o])*r,e.z=this.pz[o]+(this.pz[a]-this.pz[o])*r,e.head=this.head[o]+(this.head[a]-this.head[o])*r,e.bank=this.bank[o]+(this.bank[a]-this.bank[o])*r,e.pitch=Math.atan2(this.py[a]-this.py[o],rt.SEG_LEN*Te),e}point(t,e,n,s,r){this.sample(t,s);const o=Math.cos(s.head),a=Math.sin(s.head),l=Math.cos(s.bank),c=Math.sin(s.bank),h=e*me,u=h*l+n*c,d=-h*c+n*l;r.x=s.x+o*u,r.y=s.y+d,r.z=s.z+a*u}static local(t,e,n){return n+(t-e)}};L(Es,"CELL",40);let _a=Es;function Mc(i){let t=0,e=0;for(const n of i.segs)n.y2>n.y1&&(t+=(n.y2-n.y1)*Te),e=Math.max(e,Math.abs(n.curve));return{lengthKm:i.length*Te/1e3,climbM:t,sharpest:e}}function Un(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function ze(i,t){const e=document.createElement("canvas");e.width=i,e.height=t;const n=e.getContext("2d");if(!n)throw new Error("2D canvas unavailable for texture generation");return[e,n]}function Ge(i,t,e=!1){const n=new Mg(i);return n.colorSpace=t?Ve:Ln,e&&(n.wrapS=n.wrapT=mi),n.needsUpdate=!0,n}function bs(i,t,e,n){const s=Math.ceil(i/e),r=Math.ceil(t/e),o=new Float32Array(s*r).map(()=>n()),a=new Float32Array(i*t),l=c=>c*c*(3-2*c);for(let c=0;c<t;c++){const h=c/e,u=Math.floor(h),d=l(h-u);for(let f=0;f<i;f++){const g=f/e,_=Math.floor(g),m=l(g-_),p=o[u%r*s+_%s],E=o[u%r*s+(_+1)%s],M=o[(u+1)%r*s+_%s],v=o[(u+1)%r*s+(_+1)%s];a[c*i+f]=(p+(E-p)*m)*(1-d)+(M+(v-M)*m)*d}}return a}function yc(i,t,e){const r=Un(i),o=bs(512,1024,4,r),a=bs(512,1024,32,r),l=bs(512,1024,128,r),[c,h]=ze(512,1024),[u,d]=ze(512,1024),f=h.createImageData(512,1024),g=d.createImageData(512,1024),_=new Float32Array(512*1024),m=[-.75,-.25,.25,.75];for(let A=0;A<1024;A++)for(let I=0;I<512;I++){const S=A*512+I,x=I/512*2-1;let P=0;for(const it of m){const ht=Math.abs(x-it);P=Math.max(P,Math.max(0,1-Math.abs(ht-.07)/.05))}const U=o[S]>.82?.1:o[S]<.12?-.06:0;let D=.105+(a[S]-.5)*.04+U-P*.02+(l[S]-.5)*.03;D=Math.max(.02,D);const k=Math.max(0,(l[S]*.7+a[S]*.3-.56)*6),q=Math.min(1,k)*.3,B=Math.round(D*255*(1-q*.35));f.data[S*4]=B+4,f.data[S*4+1]=B+1,f.data[S*4+2]=B,f.data[S*4+3]=255;const W=.62-P*.17-q*.42+(o[S]-.5)*.12,z=Math.round(Math.max(.06,Math.min(1,W))*255);g.data[S*4]=z,g.data[S*4+1]=z,g.data[S*4+2]=z,g.data[S*4+3]=255,_[S]=o[S]*.6+a[S]*.4-q*.5}h.putImageData(f,0,0),d.putImageData(g,0,0);for(let A=0;A<7;A++){let I=r()*512,S=r()*1024;h.strokeStyle="rgba(6, 3, 4,0.85)",d.strokeStyle="rgba(20, 6, 7,1)",h.lineWidth=d.lineWidth=1.5+r()*2,h.beginPath(),d.beginPath(),h.moveTo(I,S),d.moveTo(I,S);for(let x=0;x<14;x++)I+=(r()-.5)*40,S+=10+r()*30,h.lineTo(I,S),d.lineTo(I,S);h.stroke(),d.stroke()}const p=(A,I,S,x)=>{h.fillStyle=e?"#ffffff":"rgba(243, 240, 235,0.92)",h.fillRect(A,I,S,x),d.fillStyle="#dac5c2",d.fillRect(A,I,S,x);for(let P=0;P<S*x/30;P++)h.fillStyle="rgba(16, 5, 6,0.5)",h.fillRect(A+r()*S,I+r()*x,1+r()*2,1+r()*2)},E=A=>(A+1)/2*512,M=e?9:6;for(const A of[-.5,0,.5])if(!(t&&A===0))for(const I of[0,1024/2])p(E(A)-M/2,I+20,M,1024/4);for(const A of[-.955,.955])p(E(A)-M/2-1,0,M+2,1024);const[v,F]=ze(512,1024),C=F.createImageData(512,1024);for(let A=0;A<1024;A++)for(let I=0;I<512;I++){const S=A*512+I,x=_[A*512+(I+1)%512]-_[A*512+(I-1+512)%512],P=_[(A+1)%1024*512+I]-_[(A-1+1024)%1024*512+I],U=2.2;let D=-x*U,k=-P*U;const q=1,B=Math.hypot(D,k,q);D/=B,k/=B,C.data[S*4]=Math.round((D*.5+.5)*255),C.data[S*4+1]=Math.round((k*.5+.5)*255),C.data[S*4+2]=Math.round(q/B*.5*255+127),C.data[S*4+3]=255}return F.putImageData(C,0,0),{map:Ge(c,!0,!0),rough:Ge(u,!1,!0),normal:Ge(v,!1,!0)}}function Sc(i){const n=Un(i),s=bs(256,256,8,n),r=bs(256,256,64,n),[o,a]=ze(256,256),[l,c]=ze(256,256),h=a.createImageData(256,256),u=c.createImageData(256,256);for(let d=0;d<256*256;d++){const f=Math.floor(d/256),g=Math.max(0,r[d]-.5)*.25*(f/256),_=.3+(s[d]-.5)*.08+(r[d]-.5)*.1-g,m=Math.round(Math.max(0,_)*255);h.data[d*4]=m+4,h.data[d*4+1]=m+1,h.data[d*4+2]=m,h.data[d*4+3]=255;const p=Math.round((.78+(s[d]-.5)*.2)*255);u.data[d*4]=u.data[d*4+1]=u.data[d*4+2]=p,u.data[d*4+3]=255}return a.putImageData(h,0,0),c.putImageData(u,0,0),a.fillStyle="rgba(3, 3, 3,0.5)",a.fillRect(0,0,2,256),{map:Ge(o,!0,!0),rough:Ge(l,!1,!0)}}function S_(i,t){const n=Un(i*7+3),[s,r]=ze(128,128),o=r.createImageData(128,128),a=t.signs.map(h=>new ft(h)),l=[new ft(O.blush),new ft(O.bone),new ft(O.tan)];for(let h=0;h<128;h++){const u=n()<.18?-.3:n()<.12?.3:0;for(let d=0;d<128;d++){const f=(h*128+d)*4,g=n()<.22+u,_=n(),m=_<.03?a[Math.floor(n()*a.length)]:l[_<.55?0:_<.8?1:2];o.data[f]=Math.round(m.r*255),o.data[f+1]=Math.round(m.g*255),o.data[f+2]=Math.round(m.b*255),o.data[f+3]=Math.round(g?(.3+n()*.5)*255:n()*10)}}r.putImageData(o,0,0);const c=Ge(s,!0,!0);return c.magFilter=ke,c.minFilter=ke,c.generateMipmaps=!1,c}function b_(i,t,e){const r=Un(i+(e?91:17)),[o,a]=ze(2048,256),l=new ft(t.skyline),h=`#${(e?l.clone().lerp(new ft(t.fog),.5):l.clone().multiplyScalar(.7)).getHexString()}`;if(e)Wc(a,0,2048,256,{seed:i*3+1,height:256*.62,fill:h,strata:O.ember,plateaus:5,strataAlpha:.22}),a.fillStyle=h,a.fillRect(0,256*.78,2048,256*.22);else{let d=0,f=Math.floor(2048*(.3+r()*.4));for(;d<2048;){const g=26+r()*60,_=256*(.12+r()*.22);a.fillStyle=h,a.fillRect(d,256-_,g,_),r()<.5&&a.fillRect(d+g*.2,256-_-6,g*.6,6);for(let p=0;p<3;p++)r()<.4&&a.fillRect(d+4+r()*(g-8),256-_+4,3,2);const m=Math.floor(g/9);for(let p=0;p<m;p++)r()>.28||(a.fillStyle=r()<.75?"rgba(238, 185, 185, 0.62)":"rgba(241, 237, 231, 0.55)",a.fillRect(d+4+p*9,256-_*(.4+r()*.3),3,4));d<=f&&f<d+g+6?(qc(a,d+g/2,256-_,34,{fill:h,slit:O.rose,telescopeAngle:-.8}),f=-1):r()<.06&&(a.fillStyle=h,a.fillRect(d+g/2-12,256-_-40,24,16),a.fillRect(d+g/2-10,256-_-24,2,24),a.fillRect(d+g/2+8,256-_-24,2,24)),d+=g+(r()<.25?r()*30:0)}}const u=Ge(o,!0);return u.wrapS=mi,u}const bc=["MOTEL","DINER","DEPOT","OASIS","ASSAY","LIVERY","SALOON","STAR","COMET","ORBIT","MESA","FUEL"];function E_(i,t){const s=Un(i),[r,o]=ze(512,256);o.fillStyle=O.umber,o.fillRect(0,0,512,256),uu(o,0,0,512,256,{seed:i,density:2.2,colors:[O.tan,O.ember],alpha:.12}),Xc(o,8,8,496,240,{color:t,stitch:O.tan,radius:14,inset:10,corner:8,stitchAlpha:.55});const a=bc[Math.floor(s()*bc.length)];return o.fillStyle=t,o.textAlign="center",o.textBaseline="middle",o.font=`${256*.36}px ${Yc}`,o.fillText(a,512/2,256*.45),o.fillStyle=O.tan,o.font=`600 ${256*.1}px ${ws}`,o.fillText(["Open all night","Rooms by the moon","Water and fuel","Last stop west","Mesa line"][Math.floor(s()*5)],512/2,256*.76),Ge(r,!0)}function w_(){const[i,t]=ze(128,128);t.fillStyle="#060304",t.fillRect(0,0,128,128),t.fillStyle="#c40618";for(let e=-128;e<256;e+=32)t.beginPath(),t.moveTo(e,128),t.lineTo(e+16,128),t.lineTo(e+16+128,0),t.lineTo(e+128,0),t.closePath(),t.fill();return Ge(i,!0,!0)}function T_(){const[i,t]=ze(256,128);t.clearRect(0,0,256,128),t.strokeStyle="#ffffff",t.lineWidth=12,t.lineJoin="miter";for(const e of[70,128,186])t.beginPath(),t.moveTo(e-30,100),t.lineTo(e,40),t.lineTo(e+30,100),t.stroke();return Ge(i,!0)}function A_(){const[i,t]=ze(256,32);for(let e=0;e<16;e++)for(let n=0;n<2;n++)t.fillStyle=(e+n)%2?"#080404":"#fbfaf9",t.fillRect(e*16,n*16,16,16);return Ge(i,!0)}function _s(i,t){const[e,n]=ze(1024,96);return n.fillStyle=O.umber,n.fillRect(0,0,1024,96),n.fillStyle=t,n.fillRect(0,0,1024,6),n.fillRect(0,90,1024,6),n.strokeStyle=O.tan,n.globalAlpha=.5,n.setLineDash([6,7]),n.lineWidth=2,n.strokeRect(10,12,1004,72),n.setLineDash([]),n.globalAlpha=1,n.fillStyle=O.bone,n.font=`600 58px ${ws}`,n.textAlign="center",n.textBaseline="middle",n.fillText(i,512,50),Ge(e,!0)}function R_(){const[i,t]=ze(128,128),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.2,"rgba(255,255,255,0.55)"),e.addColorStop(.5,"rgba(255,255,255,0.12)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),Ge(i,!0)}function C_(){const[i,t]=ze(64,256);for(let e=0;e<256;e++){const n=e/255,s=Math.pow(1-n,1.6)*Math.min(1,n*12),r=t.createLinearGradient(0,0,64,0);r.addColorStop(0,"rgba(255,255,255,0)"),r.addColorStop(.5,`rgba(255,255,255,${s})`),r.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=r,t.fillRect(0,e,64,1)}return Ge(i,!0)}function P_(){const[i,t]=ze(64,64),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,0.8)"),e.addColorStop(.6,"rgba(255,255,255,0.25)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),Ge(i,!0)}function L_(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new xe;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const u=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=i[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=Ec(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let _=0;_<o[h].length;++_)f.push(o[h][_][d]);const g=Ec(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Ec(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new Ne(o,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<e;g++){const _=h.getComponent(d,g);a.setComponent(d+u,g,_)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const jt={KERB_IN:1,KERB_OUT:1.07,BARRIER:1.47,BARRIER_BACK:1.52,POLE:1.6,TUNNEL:1.62};class Qe{constructor(){L(this,"pos",[]);L(this,"uv",[]);L(this,"idx",[])}get empty(){return this.idx.length===0}build(){const t=new xe;return t.setAttribute("position",new oe(this.pos,3)),t.setAttribute("uv",new oe(this.uv,2)),t.setIndex(this.idx),t.computeVertexNormals(),t.computeBoundingSphere(),t}}const Mo=i=>i.map(([t,e])=>[-t,e]).reverse(),wc={halogen:[O.bone,O.blush,O.bone,O.tan],violet:[O.blush,O.rose,O.bone,O.blush],meridian:[O.rose,O.blush,O.bone,O.rose]},Tc={halogen:[7,34],violet:[6,26],meridian:[22,120]};class I_{constructor(t,e,n,s){L(this,"group",new Ze);L(this,"lamps",[]);L(this,"disposables",[]);L(this,"pose",Vh());L(this,"pt",{x:0,y:0,z:0});L(this,"segs");L(this,"n");L(this,"tunnelRow");L(this,"spineField");L(this,"spineLine");L(this,"gateFrame");L(this,"curtainOpen");L(this,"curtainSealed");L(this,"bannerOpen");L(this,"bannerSealed");L(this,"beacon");L(this,"threshold",-1);L(this,"open",!0);L(this,"skyline",new Ze);this.path=t,this.def=e,this.opts=n,this.shared=s,this.segs=t.track.segs,this.n=this.segs.length,this.tunnelRow=new Uint8Array(t.rows);for(const h of e.tunnels??[]){const u=Math.floor(h.at*this.n);for(const d of this.rowsFor(u))for(let f=d;f<=d+h.len&&f<t.rows;f++)this.tunnelRow[f]=1}const r=h=>(this.disposables.push(h),h),o=e.palette,a=new ft(o.accentA);this.spineField=r(new Zt({color:a.clone().multiplyScalar(.5),transparent:!0,opacity:.22,blending:_n,depthWrite:!1})),this.spineLine=r(new Zt({color:a.clone().multiplyScalar(3)})),this.gateFrame=r(new Zt({color:a.clone().multiplyScalar(4)}));const l=r(T_());l.wrapT=mi,l.repeat.set(1,2),this.curtainOpen=r(new Zt({map:l,color:new ft(O.rose).multiplyScalar(1.1),transparent:!0,opacity:.55,blending:_n,depthWrite:!1,side:sn}));const c=r(w_());c.repeat.set(2,2),this.curtainSealed=r(new Zt({map:c,color:new ft(1.6,1.6,1.6),transparent:!0,opacity:.82,depthWrite:!1,side:sn})),this.bannerOpen=r(new Zt({map:r(_s("Spine open",O.rose)),color:new ft(1.15,1.15,1.15)})),this.bannerSealed=r(new Zt({color:new ft(1.15,1.15,1.15)})),this.beacon=r(new Zt({color:new ft(5,.2,.2)})),this.setThreshold(n.threshold),this.buildRibbons(r),this.buildGates(r),this.buildStreetLights(r),this.buildOverpasses(r),this.buildCity(r),this.buildSkyline(r),this.lamps.sort((h,u)=>h.s-u.s)}seg(t){const e=t-Be;return this.segs[(e%this.n+this.n)%this.n]}rowS(t){return(t-Be)*rt.SEG_LEN}rowsFor(t){const e=[];for(let n=Be+t-this.n*2;n<this.path.rows;n+=this.n)n>=0&&e.push(n);return e}at(t,e,n){return this.path.point(this.rowS(t),e,n,this.pose,this.pt),new N(this.pt.x,this.pt.y,this.pt.z)}orient(t,e,n=!1){this.path.sample(this.rowS(e),this.pose),t.rotation.order="YXZ",t.rotation.set(n?0:this.pose.pitch,-this.pose.head,n?0:-this.pose.bank)}ribbon(t,e,n,s,r,o,a){const l=t.pos.length/3,c=r.length,h=[0];for(let d=1;d<c;d++){const f=(r[d][0]-r[d-1][0])*me,g=r[d][1]-r[d-1][1];h.push(h[d-1]+Math.hypot(f,g))}let u=0;for(let d=e;;d+=s){const f=Math.min(d,n);for(let g=0;g<c;g++){this.path.point(this.rowS(f),r[g][0],r[g][1],this.pose,this.pt),t.pos.push(this.pt.x,this.pt.y,this.pt.z);const _=o==="lat"?(r[g][0]+1)/2:h[g]/o;t.uv.push(_,(f-Be)*rt.SEG_LEN*Te/a)}if(u++,f>=n)break}for(let d=0;d<u-1;d++)for(let f=0;f<c-1;f++){const g=l+d*c+f,_=g+1,m=g+c,p=m+1;t.idx.push(g,_,m,_,p,m)}}buildRibbons(t){const e=this.opts.highContrast,n=this.shared.anisotropy,s=yc(this.def.seed,!1,e),r=yc(this.def.seed,!0,e);for(const mt of[s,r])for(const St of[mt.map,mt.rough,mt.normal])St.anisotropy=n,t(St);const o=t(new ge({map:s.map,roughnessMap:s.rough,normalMap:s.normal,normalScale:new ct(.28,.28),roughness:1,metalness:0,envMapIntensity:.7})),a=t(new ge({map:r.map,roughnessMap:r.rough,normalMap:r.normal,normalScale:new ct(.28,.28),roughness:1,metalness:0,envMapIntensity:.7})),l=Sc(this.def.seed+5);l.map.anisotropy=n,t(l.map),t(l.rough);const c=t(new ge({map:l.map,roughnessMap:l.rough,color:new ft(O.tan),roughness:1,envMapIntensity:.4})),h=t(new ge({map:l.map,roughnessMap:l.rough,color:11969441,roughness:.9,side:sn,envMapIntensity:.3})),u=t(new ge({map:l.map,color:new ft(Dn(O.umber,O.saddle,.3)),roughness:.95,envMapIntensity:.25})),d=t(new ge({color:9800071,roughness:.7,metalness:0})),f=t(new ge({color:13612724,roughness:.32,metalness:.95,envMapIntensity:1.2})),g=new ft(e?"#ffffff":this.def.palette.edge),_=t(new Zt({color:g.clone().multiplyScalar(e?1.5:1.3)})),m=t(new Zt({color:new ft(this.def.palette.accentB).multiplyScalar(1.6)})),p=[[jt.KERB_IN,0],[jt.KERB_IN,.1],[jt.KERB_OUT,.12]],E=[[jt.KERB_OUT,.12],[jt.BARRIER,.06]],M=[[jt.BARRIER,0],[jt.BARRIER,.2],[jt.BARRIER+.02,.5],[jt.BARRIER+.026,.92],[jt.BARRIER_BACK,.92],[jt.BARRIER_BACK,0]],v=[[jt.BARRIER-.001,.12],[jt.BARRIER-.001,.17]],F=[[jt.BARRIER+.03,1],[jt.BARRIER+.03,1.3],[jt.BARRIER+.045,1.3],[jt.BARRIER+.045,1]],C=[[jt.BARRIER_BACK,.18],[3.2,.2],[6,-.2],[16,-1.2]],A=[[jt.TUNNEL,0],[jt.TUNNEL,7.2]],I=[[jt.TUNNEL,7.2],[-1.62,7.2]],S=[[jt.TUNNEL-.002,1],[jt.TUNNEL-.002,1.12]],x=[[.245,.035],[.275,.035]],P=[[.24,0],[.24,.03],[.28,.03],[.28,0]],U=this.path.rows,D=120,k=2,q=(mt,St,R)=>{const Y=[];let st=-1;for(let K=mt;K<=St;K++){const pt=R(K);if(pt&&st<0&&(st=K),(!pt||K===St)&&st>=0){const Mt=K;Mt>st&&Y.push([st,Mt]),st=-1}}return Y};for(let mt=0;mt<U-1;mt+=D){const St=Math.min(U-1,mt+D),R=new Qe,Y=new Qe,st=new Qe,K=new Qe,pt=new Qe,Mt=new Qe,Ut=new Qe,It=new Qe,X=new Qe,Q=new Qe,T=new Qe,dt=new Qe,tt=at=>this.seg(at).spine;for(const[at,yt]of q(mt,St,gt=>!tt(gt)))this.ribbon(R,at,yt,k,[[-1,0],[1,0]],"lat",16);for(const[at,yt]of q(mt,St,tt)){this.ribbon(Y,at,yt,k,[[-1,0],[1,0]],"lat",16),this.ribbon(Q,at,yt,k,[[-.24,.015],[.24,.015]],"lat",4);for(const gt of[x,Mo(x)])this.ribbon(T,at,yt,k,gt,1,4);for(const gt of[P,Mo(P)])this.ribbon(dt,at,yt,k,gt,1,4)}for(const at of[1,-1]){const yt=gt=>at>0?gt:Mo(gt);this.ribbon(Mt,mt,St,k,yt(p),1,4),this.ribbon(pt,mt,St,k,yt(E),4,8),this.ribbon(st,mt,St,k,yt(M),1.5,3),this.ribbon(It,mt,St,k,yt(v),1,4),this.ribbon(pt,mt,St,k,yt(C),12,12);for(const[gt,w]of q(mt,St,y=>!this.tunnelRow[y]))this.ribbon(Ut,gt,w,k,yt(F),1,4);for(const[gt,w]of q(mt,St,y=>!!this.tunnelRow[y]))this.ribbon(K,gt,w,k,yt(A),4,4),this.ribbon(X,gt,w,k,yt(S),1,4)}for(const[at,yt]of q(mt,St,gt=>!!this.tunnelRow[gt]))this.ribbon(K,at,yt,k,I,4,4);const _t=(at,yt,gt=!0,w=0)=>{if(at.empty)return;const y=new zt(t(at.build()),yt);y.receiveShadow=gt,y.renderOrder=w,this.group.add(y)};_t(R,o),_t(Y,a),_t(st,c),_t(K,h),_t(pt,u),_t(Mt,d),_t(Ut,f,!1),_t(It,_,!1),_t(X,m,!1),_t(Q,this.spineField,!1,2),_t(T,this.spineLine,!1),_t(dt,this.spineLine,!1)}const B=t(new ue(.12,1.3,.12)),W=[],z=[],it=new de,ht=new ft("#faf9f7");for(let mt=0;mt<U;mt+=2){if(this.tunnelRow[mt]){if(mt%6===0){for(const St of[-.55,.55])it.position.copy(this.at(mt,St,7.1)),this.orient(it,mt,!0),it.scale.set(1,1,1),it.updateMatrix(),z.push(it.matrix.clone());if(mt%18===0){const St=this.at(mt,0,6.6);this.lamps.push({s:this.rowS(mt),x:St.x,y:St.y,z:St.z,color:ht,power:.6})}}continue}if(mt%2===0)for(const St of[-1,1])it.position.copy(this.at(mt,St*(jt.BARRIER+.06),.65)),this.orient(it,mt,!0),it.updateMatrix(),W.push(it.matrix.clone())}const ut=new we(B,f,W.length);if(W.forEach((mt,St)=>ut.setMatrixAt(St,mt)),ut.frustumCulled=!1,this.group.add(ut),z.length){const mt=t(new ue(.5,.08,2.6)),St=t(new Zt({color:ht.clone().multiplyScalar(5)})),R=new we(mt,St,z.length);z.forEach((Y,st)=>R.setMatrixAt(st,Y)),R.frustumCulled=!1,this.group.add(R);for(const Y of this.def.tunnels??[])for(const st of this.rowsFor(Math.floor(Y.at*this.n))){const K=new Oa;K.moveTo(-22,-2),K.lineTo(22,-2),K.lineTo(22,16),K.lineTo(-22,16),K.closePath();const pt=new fa,Mt=jt.TUNNEL*me;pt.moveTo(-Mt,0),pt.lineTo(-Mt,7.2),pt.lineTo(Mt,7.2),pt.lineTo(Mt,0),pt.closePath(),K.holes.push(pt);const Ut=t(new Dr(K,{depth:1.2,bevelEnabled:!1})),It=new zt(Ut,c);It.position.copy(this.at(st,0,0)),this.orient(It,st,!0),this.group.add(It);const X=new zt(t(new ue(Mt*2+1,.25,.1)),m);X.position.copy(this.at(st,0,7.6)),this.orient(X,st,!0),X.translateZ(.7),this.group.add(X)}}}gantry(t,e,n,s,r){const o=new Ze;o.position.copy(this.at(e,0,0)),this.orient(o,e,!0);const a=jt.POLE*me*2,l=t(new ue(.5,n,.5));for(const u of[-1,1]){const d=new zt(l,r);d.position.set(u*a/2,n/2,0),d.castShadow=!1,o.add(d)}const c=new zt(t(new ue(a+.5,.9,.7)),r);c.position.set(0,n,0),o.add(c);const h=new zt(t(new ue(a,.06,.08)),s);return h.position.set(0,n-.47,.3),o.add(h),this.group.add(o),o}buildGates(t){const e=t(new ge({color:1508872,roughness:.45,metalness:.8})),n=t(new Zt({color:new ft(O.rose).multiplyScalar(1.8)})),s=t(new Zt({color:new ft(1.8,1.8,1.8)})),r=t(new Zt({map:t(_s("Spine exit",O.rose)),color:new ft(1.15,1.15,1.15)})),o=t(A_());o.wrapS=mi;const a=t(new Zt({map:o,color:new ft(1.6,1.6,1.6)})),l=t(new ge({map:o,roughness:.5,transparent:!0,opacity:.85,polygonOffset:!0,polygonOffsetFactor:-2})),c=[1,2,3].map(m=>t(new Zt({map:t(_s(`Checkpoint ${m}`,this.def.palette.accentA)),color:new ft(1.15,1.15,1.15)}))),h=t(new Ke(8,.75)),u=t(new Ke(.5*me,4.2)),d=t(new ue(.1,4.4,.1)),f=t(new Ba(.26*me,.07,6,28,Math.PI)),g=t(new ue(.28,.28,.12)),_=jt.POLE*me*2;for(let m=0;m<this.n;m++){const p=this.segs[m];if(!(!p.gate&&!p.cp))for(const E of this.rowsFor(m)){if(p.gate===1){const M=this.gantry(t,E,6.6,this.gateFrame,e),v=new zt(h,this.bannerOpen),F=new zt(h,this.bannerSealed);for(const x of[v,F])x.position.set(0,6.6,.37),M.add(x);const C=new zt(u,this.curtainOpen),A=new zt(u,this.curtainSealed);for(const x of[C,A])x.position.set(0,2.1,0),x.renderOrder=3,M.add(x);for(const x of[-1,1]){const P=new zt(d,this.gateFrame);P.position.set(x*.26*me,4.4,0),M.add(P)}const I=new zt(t(new ue(.52*me,.1,.1)),this.gateFrame);I.position.set(0,4.25,0),M.add(I);const S=new zt(f,this.gateFrame);S.position.set(0,4.3,0),M.add(S);for(const x of[-1,1]){const P=new zt(g,this.gateFrame);P.position.set(x*.26*me,4.95,0),P.rotation.z=Math.PI/4,M.add(P)}}else if(p.gate===2){const M=this.gantry(t,E,6,n,e),v=new zt(h,r);v.position.set(0,6,.37),M.add(v)}if(p.cp){const M=p.cp===4,v=this.gantry(t,E,7.2,M?s:n,e),F=new zt(t(new Ke(_*.7,.85)),M?a:c[p.cp-1]);if(M&&o.repeat.set(6,1),F.position.set(0,7.2,.37),v.add(F),M){const C=new zt(t(new Ke(2*me,1.4)),l);C.rotation.x=-Math.PI/2,C.position.y=.02,C.receiveShadow=!0,v.add(C)}}}}}setThreshold(t){t!==this.threshold&&(this.threshold=t,this.bannerSealed.map?.dispose(),this.bannerSealed.map=_s(`Spine sealed below ${t} %`,O.red),this.bannerSealed.needsUpdate=!0)}setGate(t,e,n){this.open=t;const s=t||n?1:.55+.45*(Math.sin(e*50)>0?1:0),r=t?new ft(O.rose):new ft(O.red);this.gateFrame.color.copy(r).multiplyScalar(2.4*s),this.spineLine.color.copy(r).multiplyScalar(t?1.9:1.6*s);const o=.4+.12*Math.sin(e*5);this.spineField.color.copy(r).multiplyScalar(t?o:.3),this.curtainOpen.visible=t,this.curtainSealed.visible=!t,this.curtainSealed.opacity=.82*s,this.bannerOpen.visible=t,this.bannerSealed.visible=!t,this.curtainOpen.map.offset.y=-e*1.2,this.beacon.color.setRGB(Math.sin(e*3)>.6?6:.3,.1,.1),this.open}buildStreetLights(t){const e=(wc[this.def.id]??wc.halogen).map(R=>new ft(R)),n=new de,s=[],r=[],o=[],a=[],l=[],c=[],h=[],u=9.5,d=24;Un(this.def.seed*3+1);let f=0;for(let R=0;R<this.path.rows;R+=d/2){const Y=f++%2===0?1:-1;if(this.tunnelRow[R]||this.tunnelRow[Math.min(this.path.rows-1,R+4)])continue;const st=((R-Be)%this.n+this.n)%this.n,K=e[(st*7+(Y>0?1:0))%e.length];n.position.copy(this.at(R,Y*jt.POLE,0)),this.orient(n,R,!0),n.scale.set(1,u,1),n.updateMatrix(),s.push(n.matrix.clone());const pt=(jt.POLE-.95)*me;n.position.copy(this.at(R,Y*(jt.POLE-pt/2/me),u-.1)),n.scale.set(pt,1,1),n.updateMatrix(),r.push(n.matrix.clone());const Mt=this.at(R,Y*.97,u-.3);n.position.copy(Mt),n.scale.set(1,1,1),n.updateMatrix(),o.push(n.matrix.clone()),a.push(K.clone().multiplyScalar(this.def.id==="halogen"?3.2:3.6)),c.push(Mt.x,Mt.y-.2,Mt.z),h.push(K.r,K.g,K.b);const Ut=15;n.position.copy(this.at(R-Math.round(Ut/2/(rt.SEG_LEN*Te)),Y*.97,.03)),this.orient(n,R),n.rotateX(-Math.PI/2),n.scale.set(1.5,Ut,1),n.updateMatrix(),l.push(n.matrix.clone()),this.lamps.push({s:this.rowS(R),x:Mt.x,y:Mt.y-.4,z:Mt.z,color:K,power:1})}const g=t(new ge({color:2099210,roughness:.5,metalness:.8})),_=t(new Oe(.09,.14,1,10));_.translate(0,.5,0);const m=new we(_,g,s.length);s.forEach((R,Y)=>m.setMatrixAt(Y,R));const p=new we(t(new ue(1,.14,.18)),g,r.length);r.forEach((R,Y)=>p.setMatrixAt(Y,R));const E=t(new Zt({color:16777215})),M=new we(t(new ue(1.1,.12,.42)),E,o.length);o.forEach((R,Y)=>{M.setMatrixAt(Y,R),M.setColorAt(Y,a[Y])});const v=t(new Zt({map:this.shared.streak,transparent:!0,opacity:.42,blending:_n,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4})),F=new we(t(new Ke(1,1)),v,l.length);l.forEach((R,Y)=>{F.setMatrixAt(Y,R),F.setColorAt(Y,e[Y%e.length])}),F.renderOrder=2;const C=t(new xe);C.setAttribute("position",new oe(c,3)),C.setAttribute("color",new oe(h,3));const A=t(new Da({size:5.5,map:this.shared.glow,vertexColors:!0,transparent:!0,opacity:.18,blending:_n,depthWrite:!1,sizeAttenuation:!0})),I=new Ih(C,A);for(const R of[m,p,M,F])R.frustumCulled=!1,this.group.add(R);I.frustumCulled=!1,I.renderOrder=4,this.group.add(I);const S=this.def.palette.signs.map((R,Y)=>t(E_(this.def.seed*13+Y,R))),x=S.map(()=>[]),P=[],U=[],D=[],k=[];for(let R=0;R<this.path.rows;R++)if(!this.tunnelRow[R])for(const Y of this.seg(R).sprites){const st=Math.sign(Y.x);if(Y.kind==="sign"){const K=st*Math.max(2.15,Math.abs(Y.x)+.4),pt=6+Y.tex%3*1.5;n.position.copy(this.at(R,K,pt)),this.orient(n,R,!0),n.rotateY(-st*.32),n.scale.set(9,4.5,1),n.updateMatrix(),x[Y.tex%x.length].push(n.matrix.clone()),n.translateZ(-.2),n.scale.set(9.4,4.9,.35),n.updateMatrix(),P.push(n.matrix.clone());for(const Mt of[-2.6,2.6]){const Ut=this.at(R,K,0);n.position.copy(Ut),this.orient(n,R,!0),n.rotateY(-st*.32),n.translateX(Mt),n.translateZ(-.25),n.scale.set(.3,pt-2.2,.3),n.updateMatrix(),U.push(n.matrix.clone())}}else Y.kind==="pylon"&&(n.position.copy(this.at(R,st*1.58,.15)),this.orient(n,R,!0),n.scale.set(1,1,1),n.updateMatrix(),D.push(n.matrix.clone()),k.push(new ft(this.def.palette.signs[Y.tex%this.def.palette.signs.length]).multiplyScalar(1.8)))}S.forEach((R,Y)=>{if(!x[Y].length)return;const st=t(new Zt({map:R,color:new ft(1.05,1.05,1.05)})),K=new we(t(new Ke(1,1)),st,x[Y].length);x[Y].forEach((pt,Mt)=>K.setMatrixAt(Mt,pt)),K.frustumCulled=!1,this.group.add(K)});const q=t(new ue(1,1,1)),B=new we(q,g,P.length);P.forEach((R,Y)=>B.setMatrixAt(Y,R));const W=t(new ue(1,1,1));W.translate(0,.5,0);const z=new we(W,g,U.length);U.forEach((R,Y)=>z.setMatrixAt(Y,R));const it=t(new Oe(.12,.12,1,10));it.translate(0,.5,0);const ht=new we(it,g,Math.max(1,D.length)),ut=t(new Oe(.125,.125,.12,10));ut.translate(0,.92,0);const mt=t(new Zt({color:16777215})),St=new we(ut,mt,Math.max(1,D.length));D.forEach((R,Y)=>{ht.setMatrixAt(Y,R),St.setMatrixAt(Y,R),St.setColorAt(Y,k[Y])}),ht.count=St.count=D.length;for(const R of[B,z,ht,St])R.frustumCulled=!1,this.group.add(R)}buildOverpasses(t){const e=this.def.overpasses??[];if(!e.length)return;const n=Sc(this.def.seed+9);t(n.map),t(n.rough),n.map.repeat.set(6,1);const s=t(new ge({map:n.map,roughnessMap:n.rough,color:new ft(Dn(O.tan,O.saddle,.35)),roughness:1,envMapIntensity:.4})),r=t(new Zt({color:new ft(this.def.palette.accentB).multiplyScalar(1.6)})),o=t(new Zt({color:new ft(O.bone).multiplyScalar(2.6)})),a=t(new Zt({map:t(_s("Auralis transit line",this.def.palette.accentB)),color:new ft(1.3,1.3,1.3)})),l=t(new ue(70,1.8,13)),c=t(new ue(70,1.1,.3)),h=t(new ue(1.6,1,2.4));h.translate(0,.5,0);const u=t(new ue(70,.12,.12)),d=t(new ue(.4,.06,6)),f=t(new Ke(14,1.3));for(const g of e)for(const _ of this.rowsFor(Math.floor(g*this.n))){const m=new Ze;m.position.copy(this.at(_,0,0)),this.orient(m,_,!0);const p=7.6,E=new zt(l,s);E.position.y=p+.9,E.receiveShadow=!0,m.add(E);for(const F of[-6.35,6.35]){const C=new zt(c,s);C.position.set(0,p+2.35,F),m.add(C);const A=new zt(u,r);A.position.set(0,p+1.2,F+Math.sign(F)*.06),m.add(A)}for(const F of[-1,1])for(const C of[-4,4]){const A=new zt(h,s);A.position.set(F*(jt.BARRIER_BACK*me+1.4),-2,C),A.scale.y=p+2,m.add(A)}for(const F of[-.6,0,.6]){const C=new zt(d,o);C.position.set(F*me,p-.03,0),m.add(C)}const M=new zt(f,a);M.position.set(0,p+1,6.62),m.add(M),this.group.add(m);const v=this.at(_,0,p-.5);this.lamps.push({s:this.rowS(_),x:v.x,y:v.y,z:v.z,color:new ft(O.bone),power:.7})}}buildCity(t){const e=this.def.palette,n=this.opts.density,[s,r]=Tc[this.def.id]??Tc.halogen,o=[],a=[],l=[],c=[],h=[],u=[],d=[],f=new de,g=e.tints.map(U=>new ft(U)),_=[O.saddle,O.tan,Dn(O.saddle,O.mesa,.4),Dn(O.tan,O.saddle,.5)].map(U=>new ft(U).multiplyScalar(.55)),m=(U,D,k,q,B,W,z)=>{const it=Math.hypot(q,B)/2,ht=D*(k+it)/me,ut=this.at(U,ht,0);if(this.path.nearRoad(ut.x,ut.z,jt.BARRIER_BACK*me+it+1.5))return;this.path.sample(this.rowS(U),this.pose);const mt=this.pose.y-2,St=-this.pose.head+(z()-.5)*.12;f.position.set(ut.x,mt,ut.z),f.rotation.set(0,St,0),f.scale.set(q,W+2,B),f.updateMatrix(),o.push(f.matrix.clone());const R=_[Math.floor(z()*_.length)].clone().lerp(g[Math.floor(z()*g.length)],.35);a.push(R);const Y=1+Math.floor(z()*3);for(let st=0;st<Y;st++){const K=2+z()*3;f.position.set(0,0,0),f.rotation.set(0,St,0),f.scale.set(K,1.4+z()*1.8,2+z()*3);const pt=(z()-.5)*(q-K)*.8,Mt=(z()-.5)*(B-3)*.8;f.position.set(ut.x+Math.cos(-St)*pt-Math.sin(-St)*Mt,mt+W+2,ut.z+Math.sin(-St)*pt+Math.cos(-St)*Mt),f.updateMatrix(),l.push(f.matrix.clone())}if(W>40&&z()<.4){const st=8+z()*18;f.position.set(ut.x,mt+W+2,ut.z),f.rotation.set(0,0,0),f.scale.set(1,st,1),f.updateMatrix(),c.push(f.matrix.clone()),f.position.set(ut.x,mt+W+2+st,ut.z),f.scale.set(1,1,1),f.updateMatrix(),h.push(f.matrix.clone())}W>30&&z()<.28&&(f.position.set(ut.x,mt+W-1.2,ut.z),f.rotation.set(0,St,0),f.scale.set(q+.2,.5,B+.2),f.updateMatrix(),u.push(f.matrix.clone()),d.push(new ft(e.signs[Math.floor(z()*e.signs.length)]).multiplyScalar(1.4)))};for(let U=0;U<this.path.rows;U+=2){const D=((U-Be)%this.n+this.n)%this.n,k=this.segs[D];for(const q of k.sprites){if(q.kind!=="tower")continue;const B=Un(D*977+(q.x>0?1:2)),W=12+B()*16,z=12+B()*16,it=s+Math.pow(B(),1.6)*(r-s);m(U,Math.sign(q.x),14+(Math.abs(q.x)-2.2)*3,W,z,it,B)}if(D%10===0)for(const q of[-1,1])for(let B=0;B<3;B++){const W=Un(D*131+B*17+(q>0?5:9));if(W()>n*(B===0?.55:.8))continue;const z=14+W()*22,it=14+W()*22,ht=(s+Math.pow(W(),1.4)*(r-s))*(B===2?1.3:1);m(U,q,18+B*34+W()*14,z,it,ht,W)}}const p=t(S_(this.def.seed,e)),E=t(new ge({color:16777215,roughness:.9,metalness:.02,envMapIntensity:.3}));E.onBeforeCompile=U=>{U.uniforms.uWin={value:p},U.uniforms.uWinGain={value:this.opts.highContrast?1:1.15},U.vertexShader=U.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vBLocal;
varying vec3 vBNormal;
varying vec3 vBScale;
varying float vBSeed;`).replace("#include <begin_vertex>",`#include <begin_vertex>
#ifdef USE_INSTANCING
  vBScale = vec3(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz), length(instanceMatrix[2].xyz));
  vBSeed = float(gl_InstanceID);
#else
  vBScale = vec3(1.0);
  vBSeed = 0.0;
#endif
  vBLocal = position * vBScale;
  vBNormal = normal;`),U.fragmentShader=U.fragmentShader.replace("#include <common>",`#include <common>
uniform sampler2D uWin;
uniform float uWinGain;
varying vec3 vBLocal;
varying vec3 vBNormal;
varying vec3 vBScale;
varying float vBSeed;`).replace("#include <color_fragment>",`#include <color_fragment>
  bool bSideX = abs(vBNormal.x) > 0.5;
  bool bRoof = abs(vBNormal.y) > 0.5;
  float bH = (bSideX ? vBLocal.z + vBScale.z * 0.5 : vBLocal.x + vBScale.x * 0.5);
  float bShop = step(vBLocal.y, 4.6);
  vec2 bCell = vec2(bH / mix(1.9, 6.0, bShop), (vBLocal.y - 0.6) / 3.4);
  vec2 bId = floor(bCell);
  vec2 bF = fract(bCell);
  float bWin = bRoof ? 0.0 : step(0.16, bF.x) * step(bF.x, 0.84) * step(mix(0.3, 0.05, bShop), bF.y) * step(bF.y, 0.86);
  float bFace = bSideX ? (vBNormal.x > 0.0 ? 1.0 : 2.0) : (vBNormal.z > 0.0 ? 3.0 : 4.0);
  vec4 bLook = texture2D(uWin, (bId + vec2(vBSeed * 13.0 + bFace * 29.0, vBSeed * 5.0 + bFace * 3.0) + 0.5) / 128.0);
  float bLit = bWin * mix(bLook.a, 0.85, bShop * 0.7) * (0.55 + 0.45 * smoothstep(0.3, 0.8, bF.y));
  bLit *= 0.75 + 0.25 * sin(bF.x * 3.14159);
  diffuseColor.rgb *= mix(1.0, 0.1, bWin);
  // engraved strata in the adobe
  diffuseColor.rgb *= 0.92 + 0.08 * step(0.5, fract(vBLocal.y * 1.7 + vBSeed * 0.37));
  // spandrel bands between floors
  diffuseColor.rgb *= bRoof ? 0.6 : (1.0 - 0.18 * step(0.9, bF.y));`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
  roughnessFactor = mix(roughnessFactor, 0.22, bWin);`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += bLook.rgb * bLit * uWinGain;`)};const M=t(new ue(1,1,1));M.translate(0,.5,0);const v=new we(M,E,Math.max(1,o.length));o.forEach((U,D)=>{v.setMatrixAt(D,U),v.setColorAt(D,a[D])}),v.count=o.length,v.receiveShadow=!1;const F=t(new ge({color:new ft(O.mesa),roughness:.85,metalness:.1})),C=new we(M,F,Math.max(1,l.length));l.forEach((U,D)=>C.setMatrixAt(D,U)),C.count=l.length;const A=t(new Oe(.12,.25,1,6));A.translate(0,.5,0);const I=new we(A,F,Math.max(1,c.length));c.forEach((U,D)=>I.setMatrixAt(D,U)),I.count=c.length;const S=new we(t(new Ji(.45,8,6)),this.beacon,Math.max(1,h.length));h.forEach((U,D)=>S.setMatrixAt(D,U)),S.count=h.length;const x=t(new Zt({color:16777215})),P=new we(M,x,Math.max(1,u.length));u.forEach((U,D)=>{P.setMatrixAt(D,U),P.setColorAt(D,d[D])}),P.count=u.length;for(const U of[v,C,I,S,P])U.frustumCulled=!1,this.group.add(U);this.buildCacti(t)}buildCacti(t){const e=new Oe(.42,.5,6,8);e.translate(0,3,0);const n=new Ji(.42,8,4,0,Math.PI*2,0,Math.PI/2);n.translate(0,6,0);const s=new Oe(.28,.28,1.4,6);s.rotateZ(Math.PI/2),s.translate(-1,2.8,0);const r=new Oe(.28,.3,2.2,6);r.translate(-1.6,3.9,0);const o=new Oe(.26,.26,1.2,6);o.rotateZ(Math.PI/2),o.translate(.9,3.8,0);const a=new Oe(.26,.28,1.6,6);a.translate(1.45,4.5,0);const l=[e,n,s,r,o,a],c=l.map(m=>m.toNonIndexed()),h=L_(c);for(const m of[...l,...c])m.dispose();if(!h)return;t(h);const u=t(new ge({color:new ft(O.umber),roughness:1,metalness:0})),d=new de,f=[],g=Un(this.def.seed*41+7);for(let m=30;m<this.path.rows;m+=70){if(this.tunnelRow[m])continue;const p=g()<.5?-1:1,E=jt.BARRIER_BACK*me+7+g()*10,M=this.at(m,p*E/me,0);if(this.path.nearRoad(M.x,M.z,jt.BARRIER_BACK*me+4))continue;this.path.sample(this.rowS(m),this.pose),d.position.set(M.x,this.pose.y-.3,M.z),d.rotation.set(0,g()*Math.PI*2,0);const v=.8+g()*.7;d.scale.set(v,v,v),d.updateMatrix(),f.push(d.matrix.clone())}if(!f.length)return;const _=new we(h,u,f.length);f.forEach((m,p)=>_.setMatrixAt(p,m)),_.frustumCulled=!1,this.group.add(_)}buildSkyline(t){for(const[e,n,s]of[[!0,2600,520],[!1,1700,330]]){const r=t(b_(this.def.seed,this.def.palette,e));r.repeat.set(e?5:4,1);const o=t(new Zt({map:r,transparent:!0,alphaTest:.02,side:Ie,fog:!1,depthWrite:!1,color:new ft(e?.85:1,e?.82:1,e?.82:1)})),a=t(new Oe(n,n,s,64,1,!0));a.translate(0,s/2-40,0);const l=new zt(a,o);l.renderOrder=-5,l.frustumCulled=!1,this.skyline.add(l)}}get extent(){return[-Be*rt.SEG_LEN,(this.n+ga)*rt.SEG_LEN]}dispose(){this.group.removeFromParent(),this.skyline.removeFromParent(),this.group.traverse(t=>{t instanceof we&&t.dispose()});for(const t of this.disposables)t.dispose();this.bannerSealed.map?.dispose(),this.disposables=[]}}const Ac={low:{pixelCap:1,maxPixels:1e6,bloom:!1,shadow:0,softShadow:!1,density:.45,lamps:4,msaa:0},medium:{pixelCap:1.25,maxPixels:21e5,bloom:!0,shadow:1024,softShadow:!1,density:.75,lamps:6,msaa:4},high:{pixelCap:2,maxPixels:38e5,bloom:!0,shadow:2048,softShadow:!0,density:1,lamps:10,msaa:4}},Rc=10;function Cc(i){let t="";try{const n=i.getExtension("WEBGL_debug_renderer_info");t=String(n?i.getParameter(n.UNMASKED_RENDERER_WEBGL):i.getParameter(i.RENDERER))}catch{t=""}if(/swiftshader|llvmpipe|softpipe|software|basic render|microsoft basic/i.test(t))return"low";let e=!1;try{e=window.matchMedia("(pointer: coarse)").matches&&Math.min(window.screen.width,window.screen.height)<820}catch{e=!1}return e?"low":/nvidia|geforce|quadro|rtx|gtx|radeon rx|radeon pro|apple m\d|apple gpu/i.test(t)?"high":"medium"}const D_={uniforms:{tDiffuse:{value:null},uTime:{value:0},uGrain:{value:.03},uVig:{value:.55},uFlash:{value:0},uBoost:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform sampler2D tDiffuse; uniform float uTime, uGrain, uVig, uFlash, uBoost; varying vec2 vUv;
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      vec2 d = (vUv - 0.5) * vec2(1.0, 0.82);
      float v = smoothstep(0.78, 0.18, length(d));
      c.rgb *= mix(1.0, v, uVig);
      // boost: a warm rose-ember halo at the edges (no cold neon)
      c.rgb += vec3(0.42, 0.11, 0.13) * uBoost * (1.0 - v);
      float n = fract(sin(dot(gl_FragCoord.xy + fract(uTime) * 917.0, vec2(12.9898, 78.233))) * 43758.5453);
      c.rgb += (n - 0.5) * uGrain;
      c.rgb = mix(c.rgb, vec3(1.0), uFlash);
      gl_FragColor = c;
    }`};function Pc(){return new Le({uniforms:{uTop:{value:new ft},uMid:{value:new ft},uHor:{value:new ft},uMoon:{value:new N(.4,.32,-.85).normalize()},uStars:{value:1}},vertexShader:`varying vec3 vDir;
      void main(){ vDir = position; vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position = p.xyww; }`,fragmentShader:`uniform vec3 uTop, uMid, uHor, uMoon; uniform float uStars; varying vec3 vDir;
      float hash(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
      void main(){
        vec3 d = normalize(vDir);
        float h = d.y;
        vec3 c = mix(uHor, uMid, smoothstep(-0.02, 0.16, h));
        c = mix(c, uTop, smoothstep(0.12, 0.65, h));
        // quiet bone stars: small and low contrast, they never compete with the Spine
        vec3 q = floor(d * 380.0);
        float s = hash(q);
        c += vec3(0.95, 0.91, 0.87) * step(0.9975, s) * smoothstep(0.06, 0.4, h) * (0.18 + 0.4 * hash(q + 3.1)) * uStars;
        // the carved moon: bone face, engraved hatching, ember rings, a gibbous phase shadow
        vec3 mz = normalize(uMoon);
        vec3 mx = normalize(cross(vec3(0.0, 1.0, 0.0), mz));
        vec3 my = cross(mz, mx);
        const float R = 0.085;
        vec2 p = vec2(dot(d, mx), dot(d, my)) / R;
        float r = length(p);
        float disk = (1.0 - smoothstep(0.965, 1.0, r)) * step(0.0, dot(d, mz)) * uStars;
        vec3 mc = vec3(0.945, 0.929, 0.906);
        float hz = smoothstep(0.05, 0.7, -(p.x * 0.55 + p.y * 0.85));
        mc = mix(mc, vec3(0.447, 0.082, 0.114), hz * step(0.55, fract((p.x - p.y) * 6.5)) * 0.3);
        float ring = 0.0;
        for (int i = 1; i <= 3; i++) {
          float rr = 1.0 - 0.1 * float(i);
          ring = max(ring, (1.0 - smoothstep(0.0, 0.02, abs(r - rr))) * (0.55 - 0.12 * float(i)));
        }
        ring = max(ring, 1.0 - smoothstep(0.0, 0.035, abs(r - 0.97)));
        mc = mix(mc, vec3(0.671, 0.043, 0.102), ring);
        float term = -0.5 * sqrt(max(0.0, 1.0 - p.y * p.y));
        float shade = 1.0 - smoothstep(term - 0.03, term + 0.03, p.x);
        mc = mix(mc, uTop * 1.6 + vec3(0.03, 0.008, 0.01), shade * 0.9);
        c = mix(c, mc * 1.08, disk);
        float halo = 1.0 - smoothstep(0.0, R * 3.2, length(d - mz));
        c += vec3(0.42, 0.27, 0.25) * halo * halo * 0.2 * (1.0 - disk) * uStars;
        gl_FragColor = vec4(c, 1.0);
      }`,side:Ie,depthWrite:!1,fog:!1})}const ye=new N,Kn=new N,N_=(i,t)=>(i%t+t)%t;class U_{constructor(t,e){L(this,"kind","3d");L(this,"gl");L(this,"scene",new $l);L(this,"camera",new We(64,16/9,.1,3400));L(this,"composer");L(this,"bloom");L(this,"post");L(this,"level","medium");L(this,"requested","auto");L(this,"q",Ac.medium);L(this,"world",null);L(this,"worldKey","");L(this,"path",null);L(this,"env",null);L(this,"pmrem");L(this,"sky");L(this,"skyMat");L(this,"shared");L(this,"glow");L(this,"streak");L(this,"smoke");L(this,"cars",[]);L(this,"fx");L(this,"moon",new r_(15656930,.35));L(this,"hemi",new t_(7817804,394244,.35));L(this,"pool",[]);L(this,"heads",[]);L(this,"under");L(this,"tailLight");L(this,"boostLight");L(this,"pose",Vh());L(this,"pt",{x:0,y:0,z:0});L(this,"camOff",6.4);L(this,"camOffV",0);L(this,"camLat",0);L(this,"camH",2.1);L(this,"lookLat",0);L(this,"prevLocal",0);L(this,"prevSpeed",0);L(this,"accel",0);L(this,"fov",64);L(this,"rivalPrev",[]);L(this,"lost",!1);L(this,"frameAcc",0);L(this,"frameN",0);L(this,"lastDown",0);L(this,"now",0);L(this,"bodyRoll",0);L(this,"bodyPitch",0);L(this,"moonYaw",NaN);L(this,"orbit",Number(new URLSearchParams(location.search).get("orbit")??0)||0);L(this,"onLevelChange",()=>{});L(this,"onContext",()=>{});L(this,"onLost",t=>{t.preventDefault(),this.lost=!0,this.onContext(!0)});L(this,"onRestored",()=>{this.lost=!1,this.disposeWorld(),this.buildComposer(),this.onContext(!1)});this.canvas=t,this.gl=new fg({canvas:t,antialias:!1,powerPreference:"high-performance",stencil:!1});const n=this.gl.getContext();this.gl.toneMapping=Ma,this.gl.toneMappingExposure=1.05,this.gl.outputColorSpace=Ve,this.gl.shadowMap.enabled=!0,this.pmrem=new ca(this.gl),this.glow=R_(),this.streak=C_(),this.smoke=P_(),this.shared=g_(this.glow),this.skyMat=Pc(),this.sky=new zt(new Ji(3e3,32,16),this.skyMat),this.sky.renderOrder=-10,this.sky.frustumCulled=!1,this.scene.add(this.sky),this.scene.add(this.camera),this.scene.add(this.hemi),this.moon.castShadow=!0;const s=this.moon.shadow.camera;s.left=-14,s.right=14,s.top=14,s.bottom=-14,s.near=1,s.far=140,this.moon.shadow.bias=-4e-4,this.moon.shadow.normalBias=.03,this.scene.add(this.moon,this.moon.target);for(let o=0;o<Rc;o++){const a=new mr(16777215,0,48,2);this.pool.push(a)}mc.forEach(o=>{const a=new x_(o,this.shared);this.cars.push(a),this.scene.add(a.root)}),this.rivalPrev=[0,1,2].map(()=>({x:0,s:0,speed:0,brake:0}));const r=this.cars[0];for(const o of[-.62,.62]){const a=new n_(16447991,0,95,.46,.55,2);a.position.set(o,.62,-r.halfLength+.1),a.target.position.set(o*1.6,0,-r.halfLength-26),r.root.add(a,a.target),this.heads.push(a)}this.under=new mr(new ft(mc[0].accent),5,5.5,2),this.under.position.set(0,.25,0),this.tailLight=new mr(12126233,2,7,2),this.tailLight.position.set(0,.25,r.halfLength+2.4),this.boostLight=new mr(16382197,0,9,2),this.boostLight.position.copy(r.exhaustPos).add(new N(0,.1,.6)),r.root.add(this.under,this.tailLight,this.boostLight),this.fx=new M_(this.glow,this.smoke),this.scene.add(this.fx.group),this.camera.add(this.fx.streaks),this.scene.fog=new Ia(197379,.0024),this.requested=e,this.level=e==="auto"?Cc(n):e,this.applyLevel(this.level,!0),t.addEventListener("webglcontextlost",this.onLost,!1),t.addEventListener("webglcontextrestored",this.onRestored,!1),this.resize()}get activeLevel(){return this.level}setQuality(t){this.requested=t;const e=t==="auto"?Cc(this.gl.getContext()):t;e!==this.level&&this.applyLevel(e,!1)}applyLevel(t,e){this.level=t,this.q=Ac[t];const n=this.q;this.gl.shadowMap.enabled=n.shadow>0,this.gl.shadowMap.type=n.softShadow?$c:xa,this.moon.castShadow=n.shadow>0,n.shadow>0&&(this.moon.shadow.mapSize.set(n.shadow,n.shadow),this.moon.shadow.map?.dispose(),this.moon.shadow.map=null);for(let s=0;s<Rc;s++){const r=this.pool[s];s<n.lamps&&!r.parent?this.scene.add(r):s>=n.lamps&&r.parent&&r.removeFromParent()}e||(this.disposeWorld(),this.scene.traverse(s=>{const r=s.material;Array.isArray(r)?r.forEach(o=>o.needsUpdate=!0):r&&(r.needsUpdate=!0)})),this.buildComposer(),this.resize(),this.onLevelChange(t)}buildComposer(){this.composer?.dispose(),this.bloom?.dispose();const t=this.gl.getDrawingBufferSize(new ct),e=new on(Math.max(1,t.x),Math.max(1,t.y),{type:Mn,samples:this.q.msaa});this.composer=new u_(this.gl,e),this.composer.addPass(new p_(this.scene,this.camera)),this.bloom=new ji(new ct(t.x/2,t.y/2),.36,.45,.97),this.bloom.enabled=this.q.bloom,this.composer.addPass(this.bloom),this.composer.addPass(new f_),this.post=new Hh(D_),this.composer.addPass(this.post)}resize(){const t=Math.max(1,window.innerWidth),e=Math.max(1,window.innerHeight),n=window.devicePixelRatio||1,s=Math.max(.5,Math.min(n,this.q.pixelCap,Math.sqrt(this.q.maxPixels/(t*e))));this.gl.setPixelRatio(s),this.gl.setSize(t,e,!1),this.composer.setPixelRatio(s),this.composer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}disposeWorld(){this.world?.dispose(),this.world=null,this.worldKey="",this.env?.dispose(),this.env=null,this.scene.environment=null}ensureWorld(t){const e=`${t.track.def.id}:${this.level}:${t.highContrast?1:0}`;if(this.world&&this.worldKey===e&&this.path)return this.world.setThreshold(t.threshold),this.world;this.disposeWorld(),(!this.path||this.path.track!==t.track)&&(this.path=new _a(t.track));const n=Math.min(8,this.gl.capabilities.getMaxAnisotropy());return this.world=new I_(this.path,t.track.def,{density:this.q.density,highContrast:t.highContrast,threshold:t.threshold},{glow:this.glow,streak:this.streak,anisotropy:n}),this.scene.add(this.world.group,this.world.skyline),this.worldKey=e,this.applyPalette(t.track.def.palette),this.fx.clear(),this.world}applyPalette(t){const e=new ft(t.fog).lerp(new ft(t.skyBottom),.25).multiplyScalar(.5);this.scene.fog.color.copy(e),this.skyMat.uniforms.uTop.value.set(t.skyTop).multiplyScalar(.6),this.skyMat.uniforms.uMid.value.set(t.skyMid).multiplyScalar(.55),this.skyMat.uniforms.uHor.value.copy(e).lerp(new ft(t.skyBottom),.35).multiplyScalar(1.3),this.hemi.color.set(t.skyMid),this.env=this.buildEnv(t),this.scene.environment=this.env.texture,this.scene.environmentIntensity=.55}buildEnv(t){const e=new $l,n=[],s=Pc();s.uniforms.uTop.value.set(t.skyTop).multiplyScalar(.5),s.uniforms.uMid.value.set(t.skyMid).multiplyScalar(.5),s.uniforms.uHor.value.set(t.skyBottom).multiplyScalar(.7),s.uniforms.uStars.value=0;const r=new Ji(80,32,16);e.add(new zt(r,s)),n.push(s,r);const o=new ue(1,1,1);n.push(o);const a=new Zt({color:new ft("#eb8e93").multiplyScalar(1.6)}),l=new Zt({color:new ft("#f8f7f4").multiplyScalar(1.4)}),c=new Zt({color:new ft("#060404")}),h=t.signs.map(m=>new Zt({color:new ft(m).multiplyScalar(1.6)}));n.push(a,l,c,...h);let u=7;const d=()=>(u=u*16807%2147483647,u/2147483647);for(let m=0;m<64;m++){const p=m/64*Math.PI*2,E=40+d()*25,M=6+d()*30,v=new zt(o,c);v.position.set(Math.cos(p)*E,M/2-4,Math.sin(p)*E),v.scale.set(6+d()*8,M,6+d()*8),v.lookAt(0,v.position.y,0),e.add(v);for(let F=0;F<4;F++){const C=new zt(o,d()<.7?a:l);C.position.copy(v.position).multiplyScalar(.96),C.position.y=d()*M-3,C.scale.set(1+d()*3,.4,.2),C.lookAt(0,C.position.y,0),e.add(C)}if(d()<.25){const F=new zt(o,h[Math.floor(d()*h.length)]);F.position.copy(v.position).multiplyScalar(.94),F.position.y=4+d()*10,F.scale.set(5,2,.2),F.lookAt(0,F.position.y,0),e.add(F)}}const f=new Zt({color:new ft("#eca0a2").multiplyScalar(6)});n.push(f);for(let m=0;m<6;m++){const p=new zt(o,f);p.position.set(m%2?7:-7,9,-30+m*12),p.scale.set(1.2,.2,.5),e.add(p)}const g=new zt(new Ke(400,400),new Zt({color:393988}));g.rotation.x=-Math.PI/2,g.position.y=-4,e.add(g),n.push(g.geometry,g.material);const _=this.pmrem.fromScene(e,.02,.1,400);for(const m of n)m.dispose();return _}render(t){if(this.lost)return;const e=performance.now();this.now=t.time;const n=this.ensureWorld(t),s=this.path,r=s.length,o=t.dt,a=N_(t.s,r);this.prevLocal-a>r/2?this.fx.clear():a-this.prevLocal>r/2&&this.fx.clear();const l=a-this.prevLocal,c=Math.abs(l)>r/2?l-Math.sign(l)*r:l;this.prevLocal=a;const h=t.speedPct*12e3*Te;if(o>0){const U=(h-this.prevSpeed)/o;this.accel+=(U-this.accel)*Math.min(1,o*4)}this.prevSpeed=h;const u=this.cars[0];s.point(a,t.x,0,this.pose,this.pt),u.root.position.set(this.pt.x,this.pt.y,this.pt.z);const d=this.pose.head,f=t.vx*.12+(t.drifting?t.vx*.1:0);u.root.rotation.set(this.pose.pitch,-(d+f),-this.pose.bank);const g=Math.max(-.07,Math.min(.07,-t.vx*.025-t.steer*t.speedPct*.025)),_=Math.max(-.04,Math.min(.04,this.accel*.0022)),m=Math.min(1,o*8);this.bodyRoll+=(g-this.bodyRoll)*m,this.bodyPitch+=(_-this.bodyPitch)*m,u.body.rotation.set(this.bodyPitch,0,this.bodyRoll),u.body.position.y=Math.sin(t.time*31)*.004*t.speedPct,u.animate(Math.max(-2,c*Te),t.steer,t.braking,t.boostAmt,t.time);for(const U of this.heads)U.intensity=1100;this.tailLight.intensity=t.braking?2.2:.5,this.boostLight.intensity=t.boostAmt*40,this.under.intensity=4;for(let U=0;U<3;U++){const D=this.cars[U+1],k=t.rivals[U];if(!k){D.root.visible=!1;continue}const q=a+(k.s-t.s);if(q<s.minS+2e3||q>s.maxS-2e3||Math.abs(k.s-t.s)>9e4){D.root.visible=!1;continue}D.root.visible=!0;const B=this.rivalPrev[U],W=k.s-B.s,z=k.x-B.x,it=W>1?Math.atan2(z*me,W*Te):0,ht=k.speed<B.speed-30*Math.max(o,.001)*60?1:0;B.brake+=(ht-B.brake)*Math.min(1,o*10),B.s=k.s,B.x=k.x,B.speed=k.speed,s.point(q,k.x,0,this.pose,this.pt),D.root.position.set(this.pt.x,this.pt.y,this.pt.z),D.root.rotation.set(this.pose.pitch,-(this.pose.head+Math.max(-.3,Math.min(.3,it))),-this.pose.bank),D.body.rotation.z=Math.max(-.05,Math.min(.05,-it*.3)),D.animate(Math.max(0,Math.min(5,W*Te)),Math.max(-1,Math.min(1,it*4)),B.brake>.5,0,t.time);const ut=(k.s-t.s)*Te;ut>2&&ut<70&&k.speed>3e3&&Math.random()<o*40&&this.spray(D,k.speed*Te,.5)}n.setGate(t.gateOpen,t.time,t.reducedFlash);const p=this.camera;if(t.cinematic){const U=t.time*.11+this.orbit,D=8.4;u.root.updateMatrixWorld(),ye.set(Math.sin(U)*D,1.25+Math.sin(t.time*.23)*.3,Math.cos(U)*D),ye.applyMatrix4(u.root.matrixWorld),p.position.copy(ye),Kn.set(-.6,.6,0).applyMatrix4(u.root.matrixWorld),p.up.set(0,1,0),p.lookAt(Kn),this.fov+=(36-this.fov)*Math.min(1,o*3);const k=this.canvas.width,q=this.canvas.height,B=k>q*1.2?-k*.17:0;(!p.view?.enabled||p.view.offsetX!==B)&&p.setViewOffset(k,q,B,0,k,q)}else{p.view?.enabled&&p.clearViewOffset();const U=6.4+t.speedPct*.9+t.boostAmt*1.3+Math.max(0,this.accel)*.02,D=9,k=D*D*(U-this.camOff)-2*D*this.camOffV;this.camOffV+=k*o,this.camOff+=this.camOffV*o;const q=t.x*me*.85;this.camLat+=(q-this.camLat)*Math.min(1,o*5),this.lookLat+=(t.x*me-this.lookLat)*Math.min(1,o*7),this.camH+=(2.05+t.speedPct*.1-this.camH)*Math.min(1,o*3);const B=a-this.camOff/Te;s.point(B,this.camLat/me,0,this.pose,this.pt),p.position.set(this.pt.x,this.pt.y+this.camH,this.pt.z),s.point(a+9/Te,this.lookLat/me,0,this.pose,this.pt),Kn.set(this.pt.x,this.pt.y+.85,this.pt.z);const W=720/Math.max(1,this.canvas.height);p.position.x+=t.shakeX*W*.016,p.position.y+=t.shakeY*W*.012,p.up.set(0,1,0),p.lookAt(Kn),s.sample(a,this.pose),p.rotateZ(-this.pose.bank*.45-t.vx*.006+t.shakeX*W*.0012);const z=64+t.speedPct*5+t.boostAmt*12;this.fov+=(z-this.fov)*Math.min(1,o*5)}Math.abs(p.fov-this.fov)>.01&&(p.fov=this.fov,p.updateProjectionMatrix()),this.sky.position.copy(p.position),p.getWorldDirection(ye);const E=Math.atan2(ye.x,-ye.z)+.38;Number.isFinite(this.moonYaw)||(this.moonYaw=E);let M=E-this.moonYaw;M-=Math.round(M/(Math.PI*2))*Math.PI*2,this.moonYaw+=M*Math.min(1,o*.35),this.skyMat.uniforms.uMoon.value.set(Math.sin(this.moonYaw),.2,-Math.cos(this.moonYaw)).normalize(),n.skyline.position.set(p.position.x,p.position.y-30,p.position.z);const v=n.lamps,F=a-this.camOff/Te-15/Te;let C=0,A=v.length;for(;C<A;){const U=C+A>>1;v[U].s<F?C=U+1:A=U}const I=this.q.lamps,S=Math.max(1,(v[Math.min(v.length-1,C+I-1)]?.s??F)-F);for(let U=0;U<I;U++){const D=this.pool[U],k=v[C+U];if(!k){D.intensity=0;continue}D.position.set(k.x,k.y,k.z),D.color.copy(k.color);const q=(k.s-F)/S,B=q>.7?Math.max(0,1-(q-.7)/.3):1;D.intensity=380*k.power*B}if(this.moon.position.set(u.root.position.x+18,u.root.position.y+60,u.root.position.z+24),this.moon.target.position.copy(u.root.position),!t.cinematic&&t.dt>0&&(h>14&&Math.random()<o*60*Math.min(1,t.speedPct*1.3)&&this.spray(u,h,1),t.drifting&&t.speedPct>.3))for(let U=0;U<2;U++)this.smokeAt(u,U?1:-1,h);this.fx.update(o);const x=t.speedLines&&!t.cinematic?Math.max(0,t.speedPct-.45)*1.8+t.boostAmt*.6:0;this.fx.updateStreaks(o,h,Math.min(1,x)*(t.reducedMotion?.4:1),t.boostAmt);const P=this.post.uniforms;P.uTime.value=t.time,P.uGrain.value=t.reducedFlash||t.highContrast?0:.028,P.uVig.value=t.highContrast?.2:.5,P.uFlash.value=t.reducedFlash?0:Math.min(1,t.flash)*.18,P.uBoost.value=t.highContrast?0:t.boostAmt*(t.reducedFlash?.25:.5),this.bloom.enabled=this.q.bloom,this.composer.render(o),this.autoLevel(performance.now()-e,o)}autoLevel(t,e){if(this.requested!=="auto"||e<=0||(this.frameAcc+=e,this.frameN++,this.frameN<120))return;const n=this.frameAcc/this.frameN*1e3;this.frameAcc=0,this.frameN=0,n>24&&this.level!=="low"&&this.now-this.lastDown>6&&(this.lastDown=this.now,this.applyLevel(this.level==="high"?"medium":"low",!1))}spray(t,e,n){t.root.updateMatrixWorld();const s=t.spec;for(const r of[-1,1]){if(Math.random()>n)continue;ye.set(r*s.track/2+(Math.random()-.5)*.3,.15,s.wheelbase/2+s.wheelR),ye.applyMatrix4(t.root.matrixWorld),Kn.set((Math.random()-.5)*1.6+r*.6,.6+Math.random()*1.4,0).applyQuaternion(t.root.quaternion);const o=new N(0,0,-1).applyQuaternion(t.root.quaternion).multiplyScalar(e*.55);this.fx.mist.spawn(ye.x,ye.y,ye.z,o.x+Kn.x,Kn.y,o.z+Kn.z,.5+Math.random()*.4,.83,.73,.72,.16+Math.min(.14,e/600))}}smokeAt(t,e,n){t.root.updateMatrixWorld();const s=t.spec;ye.set(e*s.track/2,.2,s.wheelbase/2),ye.applyMatrix4(t.root.matrixWorld);const r=new N(0,0,-1).applyQuaternion(t.root.quaternion).multiplyScalar(n*.7);this.fx.mist.spawn(ye.x,ye.y,ye.z,r.x+(Math.random()-.5)*2,.8+Math.random(),r.z+(Math.random()-.5)*2,.9+Math.random()*.5,.9,.84,.82,.3)}sparks(t,e){const n=this.cars[0];n.root.updateMatrixWorld();const s=new N(0,0,-1).applyQuaternion(n.root.quaternion),r=new N(1,0,0).applyQuaternion(n.root.quaternion),o=this.prevSpeed;for(let a=0;a<e;a++){ye.set(t*n.spec.width/2,.3+Math.random()*.3,(Math.random()-.3)*n.spec.length*.6).applyMatrix4(n.root.matrixWorld);const l=s.clone().multiplyScalar(o*(.5+Math.random()*.4));l.addScaledVector(r,t*(1+Math.random()*4)),l.y+=1+Math.random()*4;const c=Math.random();this.fx.sparks.spawn(ye.x,ye.y,ye.z,l.x,l.y,l.z,.25+Math.random()*.45,1.6,.5+c*.45,.48+c*.4,1)}}clearFx(){this.fx.clear()}get trackPath(){return this.path}dispose(){this.canvas.removeEventListener("webglcontextlost",this.onLost),this.canvas.removeEventListener("webglcontextrestored",this.onRestored),this.disposeWorld();for(const e of this.cars)e.dispose();const t=this.shared;for(const e of[t.glass,t.rubber,t.rim,t.disc,t.trim,t.seam,t.headlight,t.shadow])e.dispose();this.fx.dispose(),this.glow.dispose(),this.streak.dispose(),this.smoke.dispose(),this.sky.geometry.dispose(),this.skyMat.dispose(),this.moon.shadow.map?.dispose();for(const e of this.pool)e.dispose();this.bloom.dispose(),this.composer.dispose(),this.pmrem.dispose(),this.gl.dispose()}}const F_=["auto","low","medium","high"],Lc="neon-overdrive:v1";function O_(){let i=!1,t=!1;try{i=!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,t=!!window.matchMedia?.("(prefers-contrast: more)").matches}catch{}return{volume:.7,muted:!1,music:!0,shake:!i,reducedFlash:i,highContrast:t,speedLines:!0,tutorialSeen:!1,lastTrack:0,lastDiff:1,quality:"auto"}}function Ic(){return{bestTotal:null,bestLap:null,bestPos:null,bestSplits:[],races:0}}const gr=(i,t,e,n)=>typeof i=="number"&&Number.isFinite(i)?Math.min(n,Math.max(e,i)):t,oi=(i,t)=>typeof i=="boolean"?i:t,Dc=i=>typeof i=="number"&&Number.isFinite(i)&&i>0&&i<36e3?i:null;function B_(i){const t=O_(),e={v:1,settings:t,records:{}};if(!i)return e;let n;try{n=JSON.parse(i)}catch{return e}if(!n||typeof n!="object")return e;const s=n;if(s.v!==1)return e;const r=s.settings&&typeof s.settings=="object"?s.settings:{};e.settings={volume:gr(r.volume,t.volume,0,1),muted:oi(r.muted,t.muted),music:oi(r.music,t.music),shake:oi(r.shake,t.shake),reducedFlash:oi(r.reducedFlash,t.reducedFlash),highContrast:oi(r.highContrast,t.highContrast),speedLines:oi(r.speedLines,t.speedLines),tutorialSeen:oi(r.tutorialSeen,t.tutorialSeen),lastTrack:Math.round(gr(r.lastTrack,0,0,2)),lastDiff:Math.round(gr(r.lastDiff,1,0,2)),quality:F_.includes(r.quality)?r.quality:t.quality};const o=s.records;if(o&&typeof o=="object")for(const[a,l]of Object.entries(o)){if(!/^\d:\d$/.test(a)||!l||typeof l!="object")continue;const c=l,h=Array.isArray(c.bestSplits)?c.bestSplits.filter(d=>typeof d=="number"&&Number.isFinite(d)).slice(0,4):[],u=typeof c.bestPos=="number"&&c.bestPos>=1&&c.bestPos<=4?Math.round(c.bestPos):null;e.records[a]={bestTotal:Dc(c.bestTotal),bestLap:Dc(c.bestLap),bestPos:u,bestSplits:h.length===4?h:[],races:Math.round(gr(c.races,0,0,1e6))}}return e}class k_{constructor(){L(this,"data");L(this,"timer",0);let t=null;try{t=localStorage.getItem(Lc)}catch{t=null}this.data=B_(t)}get settings(){return this.data.settings}record(t,e){return this.data.records[`${t}:${e}`]??Ic()}submit(t,e,n,s,r,o){const a=`${t}:${e}`,l=this.data.records[a]??Ic(),c=Math.min(...s),h={total:l.bestTotal===null||n<l.bestTotal,lap:l.bestLap===null||c<l.bestLap,pos:l.bestPos===null||o<l.bestPos};return h.total&&(l.bestTotal=n),h.lap&&(l.bestLap=c,r.length===4&&(l.bestSplits=r)),h.pos&&(l.bestPos=o),l.races++,this.data.records[a]=l,this.save(),h}resetRecords(){this.data.records={},this.save()}save(){window.clearTimeout(this.timer),this.timer=window.setTimeout(()=>this.flush(),150)}flush(){try{localStorage.setItem(Lc,JSON.stringify(this.data))}catch{}}}const nn=[{id:"halogen",name:"HALOGEN RUN",tagline:"Waterfront warm-up",blurb:"Wide avenues, gentle sweepers and a long glowing quay. The Spine runs under the harbour lights.",rank:1,aiBonus:0,hz:110,seed:11,sections:[[25,40,25,0,0],[30,50,30,2,0],[25,40,25,0,12],[25,40,25,-2.5,-8],[40,80,40,0,0],[30,45,30,3,10],[30,45,30,-3,-10],[40,80,40,0,6],[25,40,25,2.5,0],[25,40,25,-2,-6],[30,100,30,0,0],[30,50,30,-3,8],[30,40,30,3,-8],[40,100,40,0,0]],spines:[{at:.1,len:160},{at:.46,len:190},{at:.8,len:150}],overpasses:[.035,.36,.71],palette:{skyTop:"#150607",skyMid:"#320B0E",skyBottom:"#6A3E40",sun1:"#D3B9B7",sun2:"#F1EDE7",ground0:"#2D0A0D",ground1:"#320B0E",road0:"#130606",road1:"#160607",rumble0:"#F1EDE7",rumble1:"#AB0B1A",lane:"#F1EDE7",edge:"#D3B9B7",accentA:"#E96B74",accentB:"#AB0B1A",fog:"#51282A",tints:["#D3B9B7","#AF7D7E","#886A6B","#825556"],signs:["#E96B74","#F1EDE7","#D3B9B7","#E30016"],skyline:"#480E13"}},{id:"violet",name:"VIOLET DESCENT",tagline:"Hill district drop",blurb:"The road climbs over the old terraces and falls away. Crests hide the next gate, so watch your reserve.",rank:2,aiBonus:.03,hz:73.4,seed:23,sections:[[25,40,25,0,0],[30,40,30,2.5,18],[30,40,30,-3,-6],[30,50,30,0,24],[35,40,35,3.5,0],[30,40,30,-4,-22],[25,60,25,0,-8],[30,40,30,4,14],[30,40,30,-4.5,8],[40,60,40,0,28],[30,40,30,3,-20],[30,40,30,-3.5,-12],[40,70,40,0,10],[30,40,30,4.5,-10],[30,40,30,-3,0],[40,80,40,0,0]],spines:[{at:.12,len:180},{at:.47,len:210},{at:.8,len:170}],overpasses:[.04,.62],palette:{skyTop:"#150607",skyMid:"#29090C",skyBottom:"#4F1A1E",sun1:"#AF7D7E",sun2:"#F1EDE7",ground0:"#2D0A0D",ground1:"#29090C",road0:"#0f0506",road1:"#110506",rumble0:"#E30016",rumble1:"#F1EDE7",lane:"#F1EDE7",edge:"#AB0B1A",accentA:"#E96B74",accentB:"#72151D",fog:"#310B0E",tints:["#672F33","#825556","#480E13","#AF7D7E"],signs:["#E96B74","#F1EDE7","#AF7D7E","#E30016"],skyline:"#320B0E"}},{id:"meridian",name:"REDLINE MERIDIAN",tagline:"Financial canyon sprint",blurb:"Long flat-out straights between glass cliffs, then violent esses. The Spine is the only honest shortcut.",rank:3,aiBonus:.05,hz:92.5,seed:37,sections:[[25,60,25,0,0],[25,35,25,4,6],[20,30,20,-4.5,-6],[20,30,20,5,0],[30,120,30,0,12],[25,40,25,-5.5,-12],[30,100,30,0,0],[25,40,25,4.5,14],[20,30,20,-5,-10],[20,30,20,5.5,8],[20,30,20,-4,-8],[40,140,40,0,0],[25,40,25,4,10],[25,40,25,-4.5,-10],[30,90,30,0,18],[25,40,25,5,-18],[30,100,30,0,0]],spines:[{at:.09,len:220},{at:.43,len:230},{at:.78,len:200}],overpasses:[.03,.66],tunnels:[{at:.3,len:200}],palette:{skyTop:"#150607",skyMid:"#320B0E",skyBottom:"#69282D",sun1:"#EEB9B9",sun2:"#F1EDE7",ground0:"#2D0A0D",ground1:"#320B0E",road0:"#100506",road1:"#140607",rumble0:"#E96B74",rumble1:"#72151D",lane:"#EEB9B9",edge:"#E96B74",accentA:"#E96B74",accentB:"#AB0B1A",fog:"#452022",tints:["#672F33","#480E13","#825556","#72151D"],signs:["#E96B74","#F1EDE7","#D3B9B7","#E30016"],skyline:"#2D0A0D"}}],en=(i,t,e)=>i<t?t:i>e?e:i;function z_(i,t){return{s:i,x:t,vx:0,speed:0,reserve:rt.RESERVE_START,boosting:!1,drifting:!1,spineMode:!1,wallCd:0,gateCd:0,cleanT:0,slip:0}}function G_(i,t,e,n,s,r){const o=rt.MAX_SPEED,a=pi(e,i.s),l=Math.abs(i.x)<=rt.OFFROAD_X,c=t.boost&&i.reserve>rt.BOOST_MIN&&i.speed>1e3;c&&!i.boosting&&r.push({type:"boostStart",value:1}),i.boosting=c,i.boosting&&(i.reserve-=rt.BOOST_DRAIN*s);let h=o*(i.boosting?rt.BOOST_MULT:1)*(i.spineMode?rt.SPINE_SPEED_MULT:1);if(l||(h=Math.min(h,o*rt.OFFROAD_CAP)),t.brake)i.speed>0?i.speed=Math.max(0,i.speed-rt.BRAKE*s):i.speed=Math.max(-o*rt.REV_MAX,i.speed-rt.REV_ACCEL*s);else if(t.throttle){if(i.speed<0)i.speed=Math.min(0,i.speed+rt.BRAKE*s);else if(i.speed<h){const S=rt.ACCEL*(i.boosting?rt.BOOST_ACCEL:1)*(1-.55*(i.speed/h));i.speed=Math.min(h,i.speed+S*s)}}else i.speed>0?i.speed=Math.max(0,i.speed-rt.COAST*s):i.speed<0&&(i.speed=Math.min(0,i.speed+rt.COAST*s));i.speed>h&&(i.speed=Math.max(h,i.speed-(l?rt.OVER_DECEL:rt.OFFROAD_DECEL)*s));const u=t.steer;i.drifting?(!t.drift||i.speed<rt.DRIFT_HOLD_SPEED*o)&&(i.drifting=!1):t.drift&&i.speed>rt.DRIFT_MIN_SPEED*o&&Math.abs(u)>.2&&(i.drifting=!0);const d=en(Math.abs(i.speed)/o,0,1.6),f=en(Math.abs(i.speed)/3600,0,1)*(i.speed<0?-1:1),g=(i.drifting?rt.DRIFT_GRIP:rt.GRIP)*n.grip,_=rt.STEER*(i.drifting?rt.DRIFT_STEER:1),m=i.speed>0?a.curve*d*d*rt.CENT*(i.drifting?rt.DRIFT_CENT:1):0,p=u*_*f-m;i.vx+=(p-i.vx)*Math.min(1,g*s),i.x+=i.vx*s,i.slip=i.vx,i.cleanT+=s,i.drifting&&(i.reserve+=rt.DRIFT_GAIN*en(Math.abs(i.vx)/1.2,0,1)*n.regen*s,i.speed=Math.max(0,i.speed-rt.DRIFT_SCRUB*s)),i.cleanT>rt.CLEAN_AFTER_HIT&&d>.5&&l&&(i.reserve+=rt.CLEAN_GAIN*n.regen*s),i.spineMode&&(i.reserve-=rt.SPINE_DRAIN*s);const E=i.s;i.s+=i.speed*s*(i.spineMode?rt.SPINE_ADVANCE:1),i.s<0&&(i.s=0,i.speed=0),i.gateCd=Math.max(0,i.gateCd-s);const M=e.segs.length,v=Math.floor(E/rt.SEG_LEN)+1,F=Math.floor(i.s/rt.SEG_LEN);for(let S=v;S<=F;S++){const x=e.segs[(S%M+M)%M];if(x.gate===1)if(Math.abs(i.x)<rt.SPINE_RAIL)if(i.reserve>=n.threshold)i.spineMode=!0,r.push({type:"gateOpen",value:i.reserve});else{const P=i.x>=0?1:-1;i.speed*=rt.SPINE_CRASH_KEEP,i.x=P*rt.SPINE_CRASH_X,i.vx=P*.6,i.gateCd=rt.SPINE_GATE_COOLDOWN,i.cleanT=0,i.spineMode=!1,i.boosting=!1,r.push({type:"gateSealed",value:1})}else i.spineMode=!1;else x.gate===2&&(i.spineMode=!1)}if(pi(e,i.s).spine){const S=i.x>=0?1:-1,x=Math.abs(i.x);i.spineMode?x>rt.SPINE_INNER_CLAMP&&(Math.abs(i.vx)>.3&&(i.speed*=.985,r.push({type:"rail",value:en(Math.abs(i.vx)/2,.1,1)})),i.x=S*rt.SPINE_INNER_CLAMP,i.vx=-S*Math.abs(i.vx)*.3):x<rt.SPINE_OUTER&&(Math.abs(i.vx)>.3&&(i.speed*=.99,r.push({type:"rail",value:en(Math.abs(i.vx)/2,.1,1)})),i.x=S*rt.SPINE_OUTER,i.vx=S*Math.abs(i.vx)*.3)}else i.spineMode=!1;i.wallCd=Math.max(0,i.wallCd-s);const A=Math.abs(i.x),I=i.x>=0?1:-1;if(A>=rt.WALL_X){if(i.wallCd<=0){const S=en(.3+Math.abs(i.vx)*.25+i.speed/o*.35,.2,1);i.speed*=rt.WALL_SPEED_KEEP,i.reserve-=rt.WALL_PENALTY,i.cleanT=0,i.wallCd=rt.WALL_COOLDOWN,r.push({type:"wall",value:S})}i.x=I*(rt.WALL_X-.03),i.vx=-I*Math.abs(i.vx)*.35}else A>rt.WALL_SCRAPE_X&&i.speed>2e3&&(i.speed=Math.max(0,i.speed-rt.SCRAPE_DECEL*s),i.cleanT=0,r.push({type:"scrape",value:en((A-rt.WALL_SCRAPE_X)/.1,.2,1)}));i.reserve=en(i.reserve,0,100),(!Number.isFinite(i.speed)||!Number.isFinite(i.x))&&(i.speed=0,i.x=0,i.vx=0)}function H_(){return Zh.map((i,t)=>({name:i.name,color:i.color,skill:i.skill,lane:i.lane,weaveAmp:i.weaveAmp,weaveHz:i.weaveHz,phase:t*2.1,s:i.start.s,x:i.start.x,speed:0,finish:null,early:i.early,late:i.late}))}function Nc(i,t,e,n,s,r,o,a){const l=pi(t,i.s),c=rt.LAPS*t.length,h=en(i.s/c,0,1),u=i.early+(i.late-i.early)*h;let d=rt.MAX_SPEED*(e.ai+n)*i.skill*u;d*=1-.052*Math.abs(l.curve)*(1.05-i.skill*.5);const f=i.s-s;f>6e3?d*=.93:f<-5e3&&(d*=1.04);const g=3e3*a;i.speed+=en(d-i.speed,-g*1.5,g),i.s+=i.speed*a;let _=i.lane+Math.sin(o*i.weaveHz*Math.PI*2+i.phase)*i.weaveAmp;const m=i.s-s;m>0&&m<700&&Math.abs(i.x-r)<.35&&(_+=(i.x>=r?1:-1)*.4);const p=pi(t,i.s+3e3);(l.spine||p.spine)&&Math.abs(_)<.45&&(_=(_>=0?1:-1)*.6),_=en(_,-.9,.9),i.x+=en(_-i.x,-1.2*a,1.2*a),i.finish===null&&i.s>=c&&(i.finish=o-(i.s-c)/Math.max(1,i.speed))}const Uc={steer:0,throttle:!1,brake:!1,drift:!1,boost:!1};class V_{constructor(t,e){L(this,"track");L(this,"diffIdx");L(this,"trackBonus");L(this,"player",z_(0,.5));L(this,"rivals",H_());L(this,"phase","countdown");L(this,"time",0);L(this,"clock",0);L(this,"cdT",0);L(this,"cdShown",0);L(this,"events",[]);L(this,"maxS",0);L(this,"cpCount",0);L(this,"lapStart",0);L(this,"lapTimes",[]);L(this,"splits",[[]]);L(this,"finishTime",null);L(this,"rank",4);L(this,"bumpCd",0);L(this,"results",[]);L(this,"wrongSpine",0);L(this,"spinePasses",0);this.track=t,this.diffIdx=e,this.trackBonus=t.def.aiBonus,this.rank=this.computeRank()}get diff(){return In[this.diffIdx]}update(t,e){const n=Math.min(t,rt.MAX_DT);this.clock+=n;const s=this.events;if(this.phase==="countdown"){this.cdT+=n;const c=Math.floor((this.cdT-.2)/1),h=c>=0&&c<3?3-c:this.cdT>=rt.COUNTDOWN?0:this.cdShown;h!==this.cdShown&&h>0&&s.push({type:"countdown",value:h}),this.cdShown=h,this.cdT>=rt.COUNTDOWN&&(this.phase="racing",s.push({type:"go",value:0}));return}this.time+=n;const r=this.phase==="finished",o=r?{steer:0,throttle:!1,brake:this.player.speed>0&&this.time-(this.finishTime??0)>1.2,drift:!1,boost:!1}:e,a=s.length;G_(this.player,o,this.track,this.diff,n,s);for(let c=a;c<s.length;c++)s[c].type==="gateOpen"?this.spinePasses++:s[c].type==="gateSealed"&&this.wrongSpine++;for(const c of this.rivals)Nc(c,this.track,this.diff,this.trackBonus,this.player.s,this.player.x,this.time,n);this.collide(n),r||this.progress();const l=this.computeRank();l!==this.rank&&(this.rank=l,s.push({type:"position",value:l}))}collide(t){const e=this.player;this.bumpCd=Math.max(0,this.bumpCd-t);for(const n of this.rivals){const s=n.s-e.s,r=e.x-n.x;if(Math.abs(s)<rt.CAR_DS&&Math.abs(r)<rt.CAR_DX){const o=r>=0?1:-1,a=(rt.CAR_DX-Math.abs(r)+.02)*.5;e.x+=o*a,n.x-=o*a*.6,e.vx+=o*.6,s>0?e.speed>n.speed&&(e.speed=Math.max(n.speed*.94,e.speed*.92)):n.speed*=.93,this.bumpCd<=0&&(this.bumpCd=.4,e.reserve=Math.max(0,e.reserve-rt.BUMP_PENALTY),e.cleanT=0,this.events.push({type:"bump",value:Math.min(1,Math.abs(e.speed-n.speed)/4e3+.3)}))}}}progress(){const t=this.track.length;this.maxS=Math.max(this.maxS,this.player.s);const e=Math.floor(this.maxS/(t/rt.CHECKPOINTS));for(;this.cpCount<e&&this.phase!=="finished";){this.cpCount++;const n=this.cpCount,s=(n-1)%rt.CHECKPOINTS+1,r=Math.floor((n-1)/rt.CHECKPOINTS),o=this.time-this.lapStart;if(s<rt.CHECKPOINTS)this.splits[r][s-1]=o,this.events.push({type:"checkpoint",value:o,text:String(s)});else{this.lapTimes.push(o),this.splits[r][rt.CHECKPOINTS-1]=o,this.lapStart=this.time;const a=r+1;a>=rt.LAPS?(this.finishTime=this.time,this.phase="finished",this.events.push({type:"finish",value:this.time})):(this.splits.push([]),this.events.push({type:"lap",value:o,text:String(a+1)}))}}}computeRank(){const t=this.finishTime;let e=1;for(const n of this.rivals)n.finish!==null&&t===null?e++:n.finish!==null&&t!==null?n.finish<t&&e++:t===null&&n.s>this.player.s&&e++;return e}get lap(){return Math.min(rt.LAPS,Math.floor(this.maxS/this.track.length)+1)}settle(){if(this.finishTime===null)return;let t=0;for(;this.rivals.some(n=>n.finish===null)&&t++<6e3;){this.time+=1/30;for(const n of this.rivals)Nc(n,this.track,this.diff,this.trackBonus,n.s,this.player.x,this.time,1/30)}const e=[{name:"JUNO (YOU)",time:this.finishTime,player:!0,place:0},...this.rivals.map(n=>({name:n.name,time:n.finish??1/0,player:!1,place:0}))];e.sort((n,s)=>n.time-s.time),e.forEach((n,s)=>{n.place=s+1}),this.results=e,this.rank=e.find(n=>n.player)?.place??4}}function dn(i){if(i==null||!Number.isFinite(i))return"--:--.---";const t=Math.floor(i/60),e=i-t*60;return`${t}:${e<10?"0":""}${e.toFixed(3)}`}const bt=i=>{const t=document.getElementById(i);if(!t)throw new Error(`missing #${i}`);return t},tn=i=>i.toLowerCase().replace(/\b\w/g,t=>t.toUpperCase()),Fc=["","first","second","third","fourth"],W_=[{id:"auto",name:"Auto"},{id:"low",name:"Low"},{id:"medium",name:"Medium"},{id:"high",name:"High"}];function Oc(i,t,e,n=6){const s=i.segs,r=s.length;let o=1/0,a=-1/0;for(const d of s)o=Math.min(o,d.y1),a=Math.max(a,d.y1);const l=Math.max(1,a-o),c=[],h=Math.max(1,Math.floor(r/160));for(let d=0;d<=r;d+=h){const f=s[Math.min(r-1,d)],g=d/r*t,_=e-n-(f.y1-o)/l*(e-n*2);c.push(`${g.toFixed(1)},${_.toFixed(1)}`)}const u=`M${c.join(" L")}`;return{line:u,area:`${u} L${t},${e} L0,${e} Z`,zones:i.spineStarts.map((d,f)=>[d/r*t,(i.spineEnds[f]-d)/r*t])}}class X_{constructor(t,e){L(this,"current",null);L(this,"returnTo","title");L(this,"selTrack",0);L(this,"selDiff",1);L(this,"msgTimer",0);L(this,"noticeTimer",0);L(this,"last",{});L(this,"dotEls",[]);L(this,"towerEls",[]);L(this,"builtTrack","");L(this,"gfx",{kind:"3d",level:null});this.store=t,this.cb=e,this.buildSetup(),this.buildQuality(),this.buildTower(),this.bind(),this.syncSettings()}set(t,e){this.last[t]!==e&&(this.last[t]=e,bt(t).textContent=e)}show(t){for(const s of document.querySelectorAll(".screen"))s.hidden=!0;if(this.current=t,!t)return;const e=bt("s-"+t);e.hidden=!1,t==="setup"&&this.refreshSetup(),t==="records"&&this.buildRecords(),t==="settings"&&this.syncSettings();const n=t==="setup"?bt("startBtn"):e.querySelector(".primary, .btn, input, button");window.setTimeout(()=>n?.focus({preventScroll:!0}),0)}buildSetup(){const t=bt("trackList");t.innerHTML="",nn.forEach((n,s)=>{const r=this.cb.track(s),o=Mc(r),a=Oc(r,200,26,3),l=document.createElement("button");l.className="track-row",l.type="button",l.setAttribute("role","radio"),l.innerHTML=`<span class="num">${s+1}</span><span class="name">${tn(n.name)}</span><span class="meta">${o.lengthKm.toFixed(1)} km, ${n.tagline.toLowerCase()}</span><svg viewBox="0 0 200 26" preserveAspectRatio="none" aria-hidden="true"><path d="${a.line}"/></svg>`,l.addEventListener("click",()=>{this.selTrack=s,this.cb.onSound("move"),this.refreshSetup()}),t.appendChild(l)});const e=bt("diffRow");e.innerHTML="",In.forEach((n,s)=>{const r=document.createElement("button");r.type="button",r.setAttribute("role","radio"),r.textContent=tn(n.name),r.addEventListener("click",()=>{this.selDiff=s,this.cb.onSound("move"),this.refreshSetup()}),e.appendChild(r)})}refreshSetup(){bt("trackList").querySelectorAll(".track-row").forEach((l,c)=>l.setAttribute("aria-checked",String(c===this.selTrack))),bt("diffRow").querySelectorAll("button").forEach((l,c)=>l.setAttribute("aria-checked",String(c===this.selDiff)));const t=nn[this.selTrack],e=this.cb.track(this.selTrack),n=Mc(e);bt("tdName").textContent=tn(t.name),bt("tdBlurb").textContent=t.blurb;const s=Oc(e,600,120);bt("tdProfile").innerHTML=`<defs><linearGradient id="profFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E96B74" stop-opacity="0.24"/><stop offset="1" stop-color="#E96B74" stop-opacity="0"/></linearGradient></defs>${s.zones.map(([l,c])=>`<rect class="zone" x="${l.toFixed(1)}" y="0" width="${c.toFixed(1)}" height="120"/><line class="zone-edge" x1="${l.toFixed(1)}" y1="0" x2="${l.toFixed(1)}" y2="120"/>`).join("")}<path class="area" d="${s.area}"/><path class="line" d="${s.line}"/>`;const r=n.sharpest>=5?"Hairpin":n.sharpest>=4?"Tight":n.sharpest>=3?"Medium":"Open";bt("tdFacts").innerHTML=[["Lap length",`${n.lengthKm.toFixed(2)}<small>km</small>`],["Climb per lap",`${Math.round(n.climbM)}<small>m</small>`],["Spine gates",`${e.spineStarts.length}`],["Sharpest bend",r]].map(([l,c])=>`<div><dt>${l}</dt><dd>${c}</dd></div>`).join("");const o=In[this.selDiff];bt("diffBlurb").textContent=`${o.blurb} Spine gates open at ${o.threshold} % reserve.`;const a=this.store.record(this.selTrack,this.selDiff);bt("bestLine").textContent=a.bestTotal===null?"No personal best on this track and difficulty yet.":`Your best: ${dn(a.bestTotal)} race, ${dn(a.bestLap)} lap, best finish ${Fc[a.bestPos??0]??"-"}.`,bt("startBtn").textContent=`Start race on ${tn(t.name)}`}buildRecords(){const t=nn.flatMap((e,n)=>In.map((s,r)=>{const o=this.store.record(n,r);return`<tr><td>${tn(e.name)}</td><td>${tn(s.name)}</td><td class="num">${dn(o.bestTotal)}</td><td class="num">${dn(o.bestLap)}</td><td class="num">${o.bestPos??"-"}</td><td class="num">${o.races}</td></tr>`})).join("");bt("recTable").innerHTML=`<thead><tr><th scope="col">Track</th><th scope="col">Difficulty</th><th scope="col" class="num">Best race</th><th scope="col" class="num">Best lap</th><th scope="col" class="num">Best place</th><th scope="col" class="num">Races</th></tr></thead><tbody>${t}</tbody>`,bt("recConfirm").hidden=!0}buildQuality(){const t=bt("qRow");t.innerHTML="",W_.forEach(e=>{const n=document.createElement("button");n.type="button",n.setAttribute("role","radio"),n.textContent=e.name,n.dataset.q=e.id,n.addEventListener("click",()=>{this.store.settings.quality=e.id,this.store.save(),this.cb.onSound("move"),this.cb.onSettings(),this.syncSettings()}),t.appendChild(n)})}setGraphics(t,e){this.gfx={kind:t,level:e},this.syncSettings()}bind(){document.querySelectorAll("[data-go]").forEach(n=>{n.addEventListener("click",()=>{this.cb.onSound(n.dataset.go==="title"?"back":"ok"),this.returnTo="title",this.show(n.dataset.go)})}),bt("startBtn").addEventListener("click",()=>{this.cb.onSound("ok"),this.cb.onStart(this.selTrack,this.selDiff)}),bt("guideBack").addEventListener("click",()=>{this.cb.onSound("back"),this.show(this.returnTo)}),bt("setBack").addEventListener("click",()=>{this.cb.onSound("back"),this.show(this.returnTo)}),bt("pResume").addEventListener("click",()=>this.cb.onResume()),bt("pRestart").addEventListener("click",()=>this.cb.onRestart()),bt("pQuit").addEventListener("click",()=>this.cb.onQuit()),bt("pGuide").addEventListener("click",()=>{this.returnTo="pause",this.show("guide")}),bt("pSettings").addEventListener("click",()=>{this.returnTo="pause",this.show("settings")}),bt("rAgain").addEventListener("click",()=>this.cb.onRestart()),bt("rNext").addEventListener("click",()=>this.cb.onNext()),bt("rMenu").addEventListener("click",()=>this.cb.onQuit()),bt("tutOk").addEventListener("click",()=>this.cb.onTutorialDone()),bt("noticeClose").addEventListener("click",()=>{bt("notice").hidden=!0}),bt("recReset").addEventListener("click",()=>{bt("recConfirm").hidden=!1,bt("recNo").focus()}),bt("recNo").addEventListener("click",()=>{bt("recConfirm").hidden=!0,bt("recReset").focus()}),bt("recYes").addEventListener("click",()=>{this.store.resetRecords(),this.buildRecords(),bt("recReset").focus()});const t=this.store.settings,e=(n,s)=>{bt(n).addEventListener("change",r=>{t[s]=r.target.checked,this.store.save(),this.cb.onSettings()})};e("optMute","muted"),e("optMusic","music"),e("optShake","shake"),e("optLines","speedLines"),e("optFlash","reducedFlash"),e("optHc","highContrast"),bt("optVol").addEventListener("input",n=>{t.volume=Number(n.target.value)/100,bt("volOut").textContent=`${Math.round(t.volume*100)} %`,this.store.save(),this.cb.onSettings()}),window.addEventListener("keydown",n=>{if(!this.current||this.current==="fatal")return;const s=n.target;if(s instanceof HTMLInputElement&&(s.type==="range"||s.type==="checkbox")&&(n.code==="ArrowLeft"||n.code==="ArrowRight"))return;const r=n.code==="ArrowDown"||n.code==="ArrowRight"?1:n.code==="ArrowUp"||n.code==="ArrowLeft"?-1:0;if(!r)return;const o=Array.from(bt("s-"+this.current).querySelectorAll("button, input")).filter(c=>c.offsetParent!==null);if(!o.length)return;n.preventDefault();const a=o.indexOf(document.activeElement);o[(a+r+o.length)%o.length].focus(),this.cb.onSound("move")})}syncSettings(){const t=this.store.settings;bt("optVol").value=String(Math.round(t.volume*100)),bt("volOut").textContent=`${Math.round(t.volume*100)} %`,bt("optMute").checked=t.muted,bt("optMusic").checked=t.music,bt("optShake").checked=t.shake,bt("optLines").checked=t.speedLines,bt("optFlash").checked=t.reducedFlash,bt("optHc").checked=t.highContrast,document.body.classList.toggle("hc",t.highContrast),document.body.classList.toggle("rf",t.reducedFlash),bt("qRow").querySelectorAll("button").forEach(n=>{n.setAttribute("aria-checked",String(n.dataset.q===t.quality)),n.disabled=this.gfx.kind==="2d"});const e=this.gfx.level?tn(this.gfx.level):"";bt("gfxStatus").textContent=this.gfx.kind==="2d"?"Running the simplified 2D view because WebGL is not available. Quality options need the 3D view.":t.quality==="auto"?`Auto chose ${e} for this device. It steps down if frames run slow.`:{Low:"Low: no bloom or shadows and a thinner city. For older or battery-saving laptops.",Medium:"Medium: bloom, car shadows and most of the city. The target for most laptops.",High:"High: sharper image, soft shadows, the full city and more street lights."}[e]??""}notice(t,e){const n=bt("notice");bt("noticeText").textContent=t,n.classList.toggle("ok",e),n.hidden=!1,window.clearTimeout(this.noticeTimer),e&&(this.noticeTimer=window.setTimeout(()=>n.hidden=!0,3e3))}showHud(t){bt("hud").classList.toggle("hidden",!t),document.body.classList.toggle("racing",t)}buildTower(){const t=bt("hTower");t.innerHTML="",this.towerEls=[];for(let e=0;e<4;e++){const n=document.createElement("li"),s=document.createElement("span");s.className="n",s.textContent=String(e+1);const r=document.createElement("span");r.className="code";const o=document.createElement("span");o.className="gap",n.append(s,r,o),t.appendChild(n),this.towerEls.push({li:n,n:s,code:r,gap:o})}}buildProgress(t){if(this.builtTrack===t.def.id)return;this.builtTrack=t.def.id;const e=bt("hProg");e.querySelectorAll(".zone, .dot, .cp").forEach(s=>s.remove());const n=t.segs.length;t.spineStarts.forEach((s,r)=>{const o=document.createElement("i");o.className="zone",o.style.left=`${s/n*100}%`,o.style.width=`${(t.spineEnds[r]-s)/n*100}%`,e.appendChild(o)});for(let s=1;s<rt.CHECKPOINTS;s++){const r=document.createElement("i");r.className="cp",r.style.left=`${s/rt.CHECKPOINTS*100}%`,e.appendChild(r)}this.dotEls=[];for(let s=0;s<4;s++){const r=document.createElement("i");r.className="dot",e.appendChild(r),this.dotEls.push(r)}}hud(t){this.set("hPos",String(t.pos)),this.set("hLap",String(t.lap)),this.set("hTime",t.time),this.set("hSplit",t.split),this.last.splitClass!==t.splitClass&&(this.last.splitClass=t.splitClass,bt("hSplit").className=`split ${t.splitClass}`),this.set("hSpeed",String(t.speed)),this.set("hRes",String(Math.round(t.reserve)));const e=bt("hResBar"),n=`${t.reserve.toFixed(1)}%`;this.last.resW!==n&&(this.last.resW=n,e.style.width=n);const s=t.reserve>=t.threshold?"1":"0";this.last.ready!==s&&(this.last.ready=s,e.classList.toggle("ready",s==="1"));const r=`${t.threshold}%`;this.last.thr!==r&&(this.last.thr=r,bt("hThr").style.left=r);const o=t.boosting?"1":"0";this.last.bt!==o&&(this.last.bt=o,bt("hBoost").classList.toggle("on",t.boosting));const a=t.spine==="in"?"In the Spine":t.spine==="open"?"Spine open":`Spine sealed below ${t.threshold} %`;this.set("hSpineText",a),this.set("hSpineDist",t.spineDist?`next gate ${t.spineDist}`:""),this.last.spine!==t.spine&&(this.last.spine=t.spine,bt("hSpine").className=`spine ${t.spine}`),t.dots.forEach((l,c)=>{const h=this.dotEls[c];h&&(h.style.left=`${(l.p*100).toFixed(1)}%`,this.last["dot"+c]!==String(l.me)&&(this.last["dot"+c]=String(l.me),h.classList.toggle("me",l.me)))}),t.tower.forEach((l,c)=>{const h=this.towerEls[c];if(!h)return;const u=`${l.code}|${l.gap}|${l.me}`;this.last["tw"+c]!==u&&(this.last["tw"+c]=u,h.code.textContent=l.code,h.gap.textContent=l.gap,h.li.classList.toggle("me",l.me))})}message(t,e=!1,n=1400,s=!1){const r=bt("hMsg");r.textContent=t,r.classList.toggle("bad",e),r.classList.toggle("hint",s),r.classList.add("show"),window.clearTimeout(this.msgTimer),this.msgTimer=window.setTimeout(()=>r.classList.remove("show"),n)}clearMessage(){bt("hMsg").classList.remove("show")}countdown(t){const e=bt("cd");e.textContent=t,e.classList.remove("pop"),t&&(e.offsetWidth,e.classList.add("pop"))}announce(t){bt("live").textContent=t}showResults(t){const e=nn[t.trackIdx];bt("resTrack").textContent=`${tn(e.name)} on ${tn(In[this.selDiff].name)}, total ${dn(t.total)}`,bt("resPlace").textContent=`P${t.place}`,bt("resH").textContent=`You finished ${Fc[t.place]??t.place}`;const n=t.rows[0]?.time??0;bt("resTable").innerHTML=`<thead><tr><th scope="col">Pos</th><th scope="col">Driver</th><th scope="col" class="num">Time</th><th scope="col" class="num">Gap</th></tr></thead><tbody>${t.rows.map(l=>`<tr class="${l.player?"me":""}"><td>${l.place}</td><td>${l.player?"Juno Vael (you)":tn(l.name)}</td><td class="num">${dn(l.time)}</td><td class="num">${l.place===1?"Winner":Number.isFinite(l.time)?`+${(l.time-n).toFixed(2)}`:"-"}</td></tr>`).join("")}</tbody>`;const s=Math.min(...t.laps),r=Math.max(...t.laps),o=s*.92;bt("resLaps").innerHTML=t.laps.map((l,c)=>`<li class="${l===s?"fastest":""}"><span>Lap ${c+1}</span><span class="bar"><i style="width:${((l-o)/Math.max(.001,r-o)*100).toFixed(1)}%"></i></span><span class="t">${dn(l)}</span></li>`).join("");const a=[t.newBest.total?"race time":"",t.newBest.lap?"lap time":"",t.newBest.pos?"finishing place":""].filter(Boolean);bt("resBest").textContent=a.length?`New personal best ${a.join(", ")}. Your fastest lap is highlighted.`:"No new personal best this time. Your fastest lap is highlighted.",bt("rNext").hidden=!t.hasNext,t.hasNext&&(bt("rNext").textContent=`Next track: ${tn(nn[t.trackIdx+1].name)}`),bt("rAgain").textContent=`Race ${tn(e.name)} again`,this.show("results")}setTouch(t){bt("touch").classList.toggle("hidden",!t)}}function Bc(i,t,e=.2){const n=i.player,s=pi(i.track,n.s),r=pi(i.track,n.s+2400),o=s.spine||r.spine?n.reserve>=i.diff.threshold?0:.6:e,a=Math.max(-1,Math.min(1,(o-n.x)*2.2+s.curve*.32*(n.speed/rt.MAX_SPEED))),l=Math.abs(r.curve)>4&&n.speed>rt.MAX_SPEED*.8;return{steer:a,throttle:!l,brake:!1,drift:Math.abs(s.curve)>2.4&&Math.abs(a)>.3,boost:n.reserve>t&&!s.spine}}const q_=new Set(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyW","KeyA","KeyS","KeyD","ShiftLeft","ShiftRight","Space","KeyB","Enter","KeyQ"]);class Y_{constructor(){L(this,"down",new Set);L(this,"touch",{left:!1,right:!1,gas:!1,brake:!1,drift:!1,boost:!1});L(this,"steerSmooth",0);L(this,"captureGameKeys",!1);L(this,"onAction",()=>{});L(this,"onFirstGesture",()=>{});window.addEventListener("keydown",t=>this.key(t,!0)),window.addEventListener("keyup",t=>this.key(t,!1)),window.addEventListener("blur",()=>this.reset()),document.addEventListener("visibilitychange",()=>{document.hidden&&this.reset()}),window.addEventListener("pointerdown",()=>this.onFirstGesture(),{passive:!0})}reset(){this.down.clear();for(const t of Object.keys(this.touch))this.touch[t]=!1;this.steerSmooth=0}key(t,e){e&&this.onFirstGesture(),this.captureGameKeys&&q_.has(t.code)&&t.preventDefault(),e&&!t.repeat&&(t.code==="KeyR"?this.onAction("restart"):t.code==="KeyP"||t.code==="Escape"?this.onAction("pause"):t.code==="KeyM"&&this.onAction("mute")),e?this.down.add(t.code):this.down.delete(t.code)}bindTouch(t){t.querySelectorAll("[data-touch]").forEach(e=>{const n=e.dataset.touch,s=r=>o=>{o.preventDefault(),this.touch[n]=r,e.classList.toggle("on",r)};e.addEventListener("pointerdown",s(!0));for(const r of["pointerup","pointercancel","pointerleave"])e.addEventListener(r,s(!1));e.addEventListener("contextmenu",r=>r.preventDefault())})}any(...t){return t.some(e=>this.down.has(e))}sample(t){const e=this.any("ArrowLeft","KeyA")||this.touch.left,s=(this.any("ArrowRight","KeyD")||this.touch.right?1:0)-(e?1:0),r=s===0?9:6,o=s-this.steerSmooth;return this.steerSmooth+=Math.sign(o)*Math.min(Math.abs(o),r*t),{steer:this.steerSmooth,throttle:this.any("ArrowUp","KeyW")||this.touch.gas,brake:this.any("ArrowDown","KeyS")||this.touch.brake,drift:this.any("ShiftLeft","ShiftRight","Space")||this.touch.drift,boost:this.any("KeyB","Enter","KeyQ")||this.touch.boost}}}const $_=["ROK","SAB","CIN"],kc=[1,.85,.7,.55];class K_{constructor(t,e){L(this,"store",new k_);L(this,"audio",new Kh);L(this,"input",new Y_);L(this,"renderer");L(this,"r3d",null);L(this,"ui");L(this,"tracks",[]);L(this,"race",null);L(this,"state","menu");L(this,"trackIdx",0);L(this,"diffIdx",1);L(this,"raf",0);L(this,"last",0);L(this,"clock",0);L(this,"boostAmt",0);L(this,"flash",0);L(this,"shake",0);L(this,"attractS",0);L(this,"finishT",0);L(this,"scrapeCd",0);L(this,"perfAcc",0);L(this,"perfN",0);L(this,"scaleIdx",0);L(this,"musicStarted",!1);L(this,"reduced",!1);L(this,"lastSplit","");L(this,"lastSplitClass","");L(this,"disposed",!1);L(this,"pausedFrom","racing");L(this,"lastInput",Uc);L(this,"demo");L(this,"glLost",!1);L(this,"frameMs",16);L(this,"qualityLocked",!1);this.canvas=t,this.demo=e.demo,this.qualityLocked=e.quality!==null;try{this.reduced=!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches}catch{this.reduced=!1}const n=this.store.settings;let s="";if(e.want3d)try{this.r3d=new U_(t,e.quality??n.quality)}catch(r){console.warn("3D renderer failed, using the 2D view",r),s="The 3D view could not start on this device.",this.r3d=null;const o=t.cloneNode(!1);t.replaceWith(o),this.canvas=o}else s="WebGL is not available in this browser.";if(this.renderer=this.r3d??new xu(this.canvas),this.trackIdx=n.lastTrack,this.diffIdx=n.lastDiff,this.ui=new X_(this.store,{onStart:(r,o)=>this.startRace(r,o),onResume:()=>this.resume(),onRestart:()=>this.restart(),onQuit:()=>this.quit(),onNext:()=>this.next(),onSettings:()=>this.applySettings(),onSound:r=>this.audio.blip(r),onTutorialDone:()=>{this.store.settings.tutorialSeen=!0,this.store.save(),this.ui.show("title")},track:r=>this.track(r)}),this.ui.selTrack=this.trackIdx,this.ui.selDiff=this.diffIdx,this.r3d){const r=this.r3d;this.ui.setGraphics("3d",r.activeLevel),r.onLevelChange=o=>this.ui.setGraphics("3d",o),r.onContext=o=>{this.glLost=o,o?(this.pause(),this.ui.notice("The browser interrupted the graphics. Waiting for it to restore them. If nothing happens, reload the page.",!1)):this.ui.notice("Graphics restored.",!0)}}else this.ui.setGraphics("2d",null),this.ui.notice(`${s} You are seeing the simplified 2D view. For full 3D graphics, turn on hardware acceleration in your browser settings, update the browser, then reload.`,!1);if(this.input.bindTouch(document.getElementById("touch")),this.input.onAction=r=>this.action(r),this.input.onFirstGesture=()=>this.gesture(),this.applySettings(),window.addEventListener("resize",()=>this.resize()),document.addEventListener("visibilitychange",()=>this.visibility()),window.addEventListener("blur",()=>{!this.demo&&(this.state==="racing"||this.state==="countdown")&&this.pause()}),this.resize(),this.demo){this.ui.show(null),this.startRace(Math.max(0,Math.min(nn.length-1,e.demoTrack)),1);const r=this.race;if(r){r.cdT=rt.COUNTDOWN;const o=Math.round(e.demoAt*60);for(let a=0;a<o;a++)r.update(1/60,Bc(r,55,.35)),r.events.length=0;this.ui.countdown(""),r.phase!=="countdown"&&(this.state=r.phase==="finished"?"finishing":"racing"),r.phase==="finished"&&this.showResults(r)}}else{const r=new URLSearchParams(location.search).get("screen"),o=["title","setup","guide","settings","records"].includes(r??"");this.ui.show(o?r:n.tutorialSeen?"title":"tutorial")}}start(){this.last=performance.now();const t=e=>{this.disposed||(this.raf=requestAnimationFrame(t),this.tick(e))};this.raf=requestAnimationFrame(t)}dispose(){this.disposed=!0,cancelAnimationFrame(this.raf),this.audio.stopMusic(),this.store.flush(),this.renderer.dispose()}track(t){var e;return(e=this.tracks)[t]??(e[t]=Qh(nn[t]))}gesture(){this.audio.ensure(),this.audio.setVolume(this.store.settings.volume),this.audio.setMuted(this.store.settings.muted),this.audio.setMusic(this.store.settings.music),this.musicStarted||(this.musicStarted=!0,this.audio.startMusic(nn[this.trackIdx].hz))}applySettings(){const t=this.store.settings;this.audio.setVolume(t.volume),this.audio.setMuted(t.muted),this.audio.setMusic(t.music),document.body.classList.toggle("hc",t.highContrast),document.body.classList.toggle("rf",t.reducedFlash),this.qualityLocked||this.r3d?.setQuality(t.quality),this.store.save()}resize(){this.renderer.resize(kc[this.scaleIdx])}visibility(){document.hidden?(this.audio.suspend(),!this.demo&&(this.state==="racing"||this.state==="countdown")&&this.pause()):(this.audio.resume(),this.last=performance.now())}startRace(t,e){this.gesture(),this.trackIdx=t,this.diffIdx=e,this.ui.selTrack=t,this.ui.selDiff=e;const n=this.store.settings;this.demo||(n.lastTrack=t,n.lastDiff=e,this.store.save());const s=this.track(t);this.race=new V_(s,e),this.state="countdown",this.boostAmt=0,this.flash=0,this.shake=0,this.finishT=0,this.lastSplit="",this.lastSplitClass="",this.renderer.clearFx(),this.ui.buildProgress(s),this.ui.show(null),this.ui.showHud(!0),this.ui.clearMessage(),this.ui.countdown(""),this.input.reset(),this.input.captureGameKeys=!0,document.activeElement?.blur(),this.audio.duck(!1),this.audio.stopMusic(),this.audio.startMusic(nn[t].hz),this.ui.announce(`${nn[t].name}. Three laps. Get ready.`)}restart(){this.state==="menu"||!this.race||this.startRace(this.trackIdx,this.diffIdx)}next(){const t=Math.min(nn.length-1,this.trackIdx+1);this.startRace(t,this.diffIdx)}quit(){this.race=null,this.state="menu",this.input.captureGameKeys=!1,this.ui.showHud(!1),this.ui.countdown(""),this.audio.duck(!1),this.audio.stopMusic(),this.audio.startMusic(110),this.ui.returnTo="title",this.ui.show("title")}pause(){this.state!=="racing"&&this.state!=="countdown"||(this.pausedFrom=this.state,this.state="paused",this.input.reset(),this.audio.duck(!0),this.ui.returnTo="pause",this.ui.show("pause"))}resume(){this.state!=="paused"||this.glLost||(this.state=this.pausedFrom==="countdown"?"countdown":"racing",this.ui.show(null),this.audio.duck(!1),this.last=performance.now(),document.activeElement?.blur())}action(t){if(!this.demo){if(t==="mute"){const e=this.store.settings;e.muted=!e.muted,this.applySettings(),this.ui.syncSettings(),this.state!=="menu"&&this.ui.message(e.muted?"Sound off":"Sound on",!1,900);return}if(t==="restart"){(this.state==="racing"||this.state==="countdown"||this.state==="paused"||this.state==="finishing"||this.state==="results")&&this.restart();return}switch(this.state){case"racing":case"countdown":this.pause();break;case"paused":this.ui.current==="pause"?this.resume():this.ui.show("pause");break;case"menu":{const e=this.ui.current;e==="tutorial"?(this.store.settings.tutorialSeen=!0,this.store.save(),this.ui.show("title")):e&&e!=="title"&&this.ui.show("title");break}}}}tick(t){const e=Math.min(.25,(t-this.last)/1e3);this.last=t;const n=Math.min(e,rt.MAX_DT);if(this.frameMs+=(e*1e3-this.frameMs)*.05,window.__nodFrameMs=this.frameMs,this.clock+=n,this.perf(e),this.scrapeCd>0&&(this.scrapeCd-=n),this.state==="menu"||!this.race){this.attractS+=6800*n,this.audio.engine(0,!1,!1,!1),this.renderer.render(this.attractFrame(n));return}const s=this.race,r=this.state;if(r==="racing"||r==="countdown"||r==="finishing"){let a=r==="racing"?this.input.sample(n):Uc;this.demo&&r==="racing"&&(a=Bc(s,55,.35)),this.lastInput=a,s.update(n,a),this.handleEvents(s.events.splice(0)),this.boostAmt+=((s.player.boosting?1:0)-this.boostAmt)*Math.min(1,5*n),this.flash=Math.max(0,this.flash-n*11),this.shake*=Math.exp(-5*n),r==="countdown"&&s.phase==="racing"&&(this.state="racing"),r==="racing"&&s.phase==="finished"&&(this.state="finishing",this.finishT=0,this.input.captureGameKeys=!1),this.state==="finishing"&&(this.finishT+=n,this.finishT>3&&this.showResults(s)),this.audio.engine(Math.abs(s.player.speed)/rt.MAX_SPEED,a.throttle,s.player.boosting,!0)}else this.audio.engine(0,!1,!1,!1);const o=this.state==="paused"||this.state==="results";this.renderer.render(this.raceFrame(s,o?0:n)),(this.state==="racing"||this.state==="finishing"||this.state==="countdown")&&this.updateHud(s)}perf(t){if(this.renderer.kind!=="2d"||(this.perfAcc+=t,++this.perfN<40))return;const e=this.perfAcc/this.perfN*1e3;this.perfAcc=0,this.perfN=0,e>21&&this.scaleIdx<kc.length-1?(this.scaleIdx++,this.resize()):e<12&&this.scaleIdx>0&&(this.scaleIdx--,this.resize())}shakeOffset(){if(!this.store.settings.shake||this.shake<.2)return[0,0];const e=this.renderer.kind==="2d"?this.canvas.height:720,n=(this.reduced?.4:1)*this.shake*(e/720);return[(Math.random()-.5)*2*n,(Math.random()-.5)*2*n]}baseFrame(t,e,n){const s=this.store.settings,[r,o]=this.shakeOffset(),a=In[this.diffIdx].threshold;return{track:t,trackIdx:e,boostAmt:this.boostAmt,time:this.clock,dt:n,gateText:`SEALED  NEED ${a}%`,threshold:a,flash:this.flash,shakeX:r,shakeY:o,highContrast:s.highContrast,reducedFlash:s.reducedFlash,speedLines:s.speedLines,reducedMotion:this.reduced}}attractFrame(t){const e=this.ui.current==="setup"?this.ui.selTrack:0,n=this.track(e),s=this.renderer.kind==="3d"?.25+Math.sin(this.clock*.21)*.2:Math.sin(this.clock*.5)*.45;return{...this.baseFrame(n,e,t),s:this.attractS,x:s,speedPct:.57,steer:Math.cos(this.clock*.21)*.1,vx:Math.cos(this.clock*.21)*.04,drifting:!1,boosting:!1,braking:!1,rivals:[],gateOpen:!0,boostAmt:0,cinematic:!0}}raceFrame(t,e){const n=t.player,s=In[t.diffIdx],r=this.lastInput;return{...this.baseFrame(t.track,this.trackIdx,e),s:n.s,x:n.x,speedPct:Math.max(0,n.speed)/rt.MAX_SPEED,steer:r.steer,vx:n.vx,drifting:n.drifting,boosting:n.boosting,braking:r.brake&&n.speed>0||t.phase==="finished",rivals:t.rivals,gateOpen:n.reserve>=s.threshold||n.spineMode,cinematic:!1}}updateHud(t){const e=t.player,n=In[t.diffIdx],s=t.track.length,r=eu(t.track,e.s)*.0074,o=e.spineMode?"in":e.reserve>=n.threshold?"open":"sealed",a=3*s,l=[{code:"JUN",s:Math.min(e.s,a),speed:e.speed,me:!0,fin:t.finishTime},...t.rivals.map((u,d)=>({code:$_[d],s:Math.min(u.s,a),speed:u.speed,me:!1,fin:u.finish}))];l.sort((u,d)=>u.fin!==null&&d.fin!==null?u.fin-d.fin:u.fin!==null?-1:d.fin!==null?1:d.s-u.s);const c=l[0],h=l.map((u,d)=>{let f="Leader";if(d>0&&u.fin!==null&&c.fin!==null)f=`+${(u.fin-c.fin).toFixed(2)}`;else if(d>0){const g=Math.max(5e3,(u.speed+c.speed)/2);f=`+${((c.s-u.s)/g).toFixed(2)}`}return{code:u.code,gap:f,me:u.me}});this.ui.hud({pos:t.rank,lap:t.lap,time:dn(t.time),split:this.lastSplit,splitClass:this.lastSplitClass,speed:Math.round(Math.abs(e.speed)*(e.spineMode?rt.SPINE_ADVANCE:1)*rt.KMH),reserve:e.reserve,threshold:n.threshold,boosting:e.boosting,spine:o,spineDist:e.spineMode?"":r<700?`${Math.round(r/10)*10} m`:"",dots:[{p:Math.min(e.s,a)%s/s,me:!0},...t.rivals.map(u=>({p:Math.min(u.s,a)%s/s,me:!1}))],tower:h})}handleEvents(t){const e=this.race;if(!e)return;const s=e.player.x>=0?1:-1;for(const r of t)switch(r.type){case"countdown":this.ui.countdown(String(r.value)),this.audio.countdown(r.value);break;case"go":this.ui.countdown("Go"),this.audio.countdown(0),window.setTimeout(()=>this.state!=="menu"&&this.ui.countdown(""),800),this.ui.message(`The lit centre channel is the Spine. Its gates open at ${In[e.diffIdx].threshold} % reserve.`,!1,4200,!0);break;case"checkpoint":{const o=Number(r.text),a=this.store.record(this.trackIdx,this.diffIdx).bestSplits[o-1];let l="";if(this.lastSplitClass="",a!==void 0){const c=r.value-a;l=`${c>=0?"+":"−"}${Math.abs(c).toFixed(2)}`,this.lastSplitClass=c>0?"up":"down"}this.lastSplit=`Split ${o}  ${dn(r.value)}${l?"  "+l:""}`,this.ui.message(`Checkpoint ${o}`,!1,1400),this.ui.announce(`Checkpoint ${o}, ${r.value.toFixed(1)} seconds`),this.audio.chime();break}case"lap":this.lastSplit=`Lap ${Number(r.text)-1}  ${dn(r.value)}`,this.lastSplitClass="",this.ui.message(Number(r.text)===rt.LAPS?"Final lap":`Lap ${r.text}`,!1,1600),this.ui.announce(`Lap ${Number(r.text)-1} complete, ${r.value.toFixed(1)} seconds. Lap ${r.text}.`),this.audio.lap();break;case"finish":this.ui.message("Finish",!1,2400),this.audio.finish(e.computeRank()<=2),this.ui.announce(`Finished in position ${e.computeRank()}.`);break;case"wall":this.audio.thud(r.value),this.shake=Math.max(this.shake,6+r.value*10),this.flash=1,this.renderer.sparks(s,18+Math.round(r.value*22));break;case"scrape":this.scrapeCd<=0&&(this.scrapeCd=.07,this.audio.scrape(r.value),this.renderer.sparks(s,4),this.shake=Math.max(this.shake,2.5));break;case"rail":this.audio.thud(.25),this.shake=Math.max(this.shake,3),this.renderer.sparks(s,6);break;case"bump":this.audio.thud(r.value*.7),this.shake=Math.max(this.shake,4+r.value*5),this.renderer.sparks(s,8);break;case"gateOpen":this.audio.gateOpen(),this.ui.message("Spine open",!1,1200),this.ui.announce("Spine gate open.");break;case"gateSealed":this.audio.gateSealed(),this.audio.thud(1),this.shake=16,this.flash=1,this.renderer.sparks(s,30),this.ui.message("Spine sealed. Charge your reserve first.",!0,1800),this.ui.announce("Spine gate sealed. Reserve too low.");break;case"boostStart":this.audio.boost();break;case"position":this.ui.announce(`Position ${r.value} of 4`);break}}showResults(t){t.settle(),this.state="results",this.input.captureGameKeys=!1;const e=t.results.find(o=>o.player)?.place??t.rank;let n=0;t.lapTimes.forEach((o,a)=>{o<t.lapTimes[n]&&(n=a)});const s=t.finishTime??t.time,r=this.demo?{total:!1,lap:!1,pos:!1}:this.store.submit(this.trackIdx,this.diffIdx,s,t.lapTimes,t.splits[n]??[],e);this.ui.showHud(!1),this.ui.showResults({trackIdx:this.trackIdx,rows:t.results,place:e,laps:t.lapTimes,total:s,newBest:r,hasNext:this.trackIdx<nn.length-1}),this.ui.announce(`Results. Position ${e}. Total time ${dn(s)}.`)}}function yo(i){document.querySelectorAll(".screen").forEach(n=>n.hidden=!0);const t=document.getElementById("fatalText");t&&(t.textContent=i);const e=document.getElementById("s-fatal");e&&(e.hidden=!1)}function Z_(){try{const t=document.createElement("canvas").getContext("webgl2");return t?(t.getExtension("WEBGL_lose_context")?.loseContext(),!0):!1}catch{return!1}}function zc(){const i=document.getElementById("view");if(!i){yo("The game view is missing from the page. Reload to try again.");return}const t=new URLSearchParams(location.search),e=t.get("renderer")!=="2d"&&Z_();if(!e&&!document.createElement("canvas").getContext("2d")){yo("This browser cannot draw the game: neither WebGL nor Canvas 2D is available. Try a recent Chrome, Edge, Firefox or Safari.");return}let n;try{n=new K_(i,{want3d:e,demo:t.get("demo")==="1",demoTrack:Number(t.get("track")??0)||0,quality:["low","medium","high"].find(s=>s===t.get("quality"))??null,demoAt:Math.max(0,Math.min(600,Number(t.get("at")??9)||0))})}catch(s){console.error(s),yo("Neon Overdrive failed to start. Reload the page; if it keeps happening, the details are in the browser console.");return}n.start(),window.addEventListener("pagehide",()=>n.dispose(),{once:!0})}function J_(){const i=document.fonts;if(!i?.load)return Promise.resolve();const t=Promise.all(['400 40px "Rye"','600 40px "Zilla Slab"','700 40px "Zilla Slab"'].map(e=>i.load(e).catch(()=>[])));return Promise.race([t,new Promise(e=>setTimeout(e,1500))])}J_().then(zc,zc);
