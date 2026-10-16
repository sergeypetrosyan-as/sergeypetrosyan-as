var Ph=Object.defineProperty;var Lh=(i,t,e)=>t in i?Ph(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var P=(i,t,e)=>Lh(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();class Ih{constructor(){P(this,"ctx",null);P(this,"master",null);P(this,"sfx",null);P(this,"musicGain",null);P(this,"noise",null);P(this,"engA",null);P(this,"engB",null);P(this,"engF",null);P(this,"engG",null);P(this,"windG",null);P(this,"windF",null);P(this,"timer",0);P(this,"nextStep",0);P(this,"step",0);P(this,"root",110);P(this,"musicOn",!0);P(this,"musicRunning",!1);P(this,"ducked",!1);P(this,"volume",.7);P(this,"muted",!1);P(this,"available",typeof window<"u"&&!!(window.AudioContext||window.webkitAudioContext))}ensure(){if(this.available)try{if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext,e=new t;this.ctx=e;const n=e.createDynamicsCompressor();n.threshold.value=-14,n.ratio.value=4,this.master=e.createGain(),this.sfx=e.createGain(),this.musicGain=e.createGain(),this.sfx.connect(this.master),this.musicGain.connect(this.master),this.master.connect(n).connect(e.destination);const s=e.sampleRate,r=e.createBuffer(1,s,e.sampleRate),o=r.getChannelData(0);for(let a=0;a<s;a++)o[a]=Math.random()*2-1;this.noise=r,this.applyGains(),this.buildEngine()}this.ctx.state==="suspended"&&this.ctx.resume()}catch{this.available=!1}}applyGains(){if(!this.ctx||!this.master||!this.musicGain||!this.sfx)return;const t=this.ctx.currentTime;this.master.gain.setTargetAtTime(this.muted?0:this.volume,t,.03),this.sfx.gain.value=1,this.musicGain.gain.setTargetAtTime(this.musicOn?this.ducked?.12:.38:0,t,.1)}setVolume(t){this.volume=Math.max(0,Math.min(1,t)),this.applyGains()}setMuted(t){this.muted=t,this.applyGains()}setMusic(t){this.musicOn=t,this.applyGains()}duck(t){this.ducked=t,this.applyGains()}suspend(){this.ctx&&this.ctx.state==="running"&&this.ctx.suspend()}resume(){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}buildEngine(){const t=this.ctx;if(!t||!this.sfx||!this.noise)return;this.engA=t.createOscillator(),this.engB=t.createOscillator(),this.engA.type="sawtooth",this.engB.type="square",this.engF=t.createBiquadFilter(),this.engF.type="lowpass",this.engF.frequency.value=500,this.engG=t.createGain(),this.engG.gain.value=0,this.engA.connect(this.engF),this.engB.connect(this.engF),this.engF.connect(this.engG).connect(this.sfx),this.engA.start(),this.engB.start();const e=t.createBufferSource();e.buffer=this.noise,e.loop=!0,this.windF=t.createBiquadFilter(),this.windF.type="bandpass",this.windF.frequency.value=800,this.windF.Q.value=.6,this.windG=t.createGain(),this.windG.gain.value=0,e.connect(this.windF).connect(this.windG).connect(this.sfx),e.start()}engine(t,e,n,s){if(!this.ctx||!this.engA||!this.engB||!this.engF||!this.engG||!this.windG||!this.windF)return;const r=this.ctx.currentTime,o=Math.max(0,Math.min(1.5,t)),a=(55+o*210)*(n?1.2:1);this.engA.frequency.setTargetAtTime(a,r,.05),this.engB.frequency.setTargetAtTime(a*1.5,r,.05),this.engF.frequency.setTargetAtTime(500+o*2200,r,.08);const l=s?.04+(e?.05:0)+o*.03:0;this.engG.gain.setTargetAtTime(l,r,.06),this.windG.gain.setTargetAtTime(s?o*o*.1:0,r,.1),this.windF.frequency.setTargetAtTime(500+o*1800,r,.1)}tone(t,e,n,s,r=0,o){const a=this.ctx;if(!a||!this.sfx)return;const l=a.currentTime+r,c=a.createOscillator(),h=a.createGain();c.type=n,c.frequency.setValueAtTime(t,l),o&&c.frequency.exponentialRampToValueAtTime(o,l+e),h.gain.setValueAtTime(s,l),h.gain.exponentialRampToValueAtTime(1e-4,l+e),c.connect(h).connect(this.sfx),c.start(l),c.stop(l+e+.02)}burst(t,e,n,s,r,o=1){const a=this.ctx;if(!a||!this.sfx||!this.noise)return;const l=a.currentTime,c=a.createBufferSource();c.buffer=this.noise;const h=a.createBiquadFilter();h.type=r,h.Q.value=o,h.frequency.setValueAtTime(n,l),h.frequency.exponentialRampToValueAtTime(s,l+t);const u=a.createGain();u.gain.setValueAtTime(e,l),u.gain.exponentialRampToValueAtTime(1e-4,l+t),c.connect(h).connect(u).connect(this.sfx),c.start(l,Math.random()*.5),c.stop(l+t+.02)}blip(t){this.tone(t==="move"?660:t==="ok"?990:330,.06,"square",.05)}countdown(t){this.tone(t===0?880:440,t===0?.5:.18,"square",.09)}boost(){this.burst(.6,.35,400,3200,"bandpass",1.2),this.tone(180,.4,"sawtooth",.05,0,520)}thud(t){this.tone(140,.25,"sine",.25+t*.3,0,40),this.burst(.18+t*.12,.2+t*.25,1800,160,"lowpass")}scrape(t){this.burst(.09,.05+t*.06,3200,5200,"highpass")}chime(){this.tone(880,.25,"sine",.12),this.tone(1320,.3,"sine",.1,.07)}lap(){this.tone(660,.2,"triangle",.14),this.tone(990,.2,"triangle",.14,.1),this.tone(1320,.4,"triangle",.14,.2)}gateOpen(){this.tone(523,.18,"triangle",.12),this.tone(659,.18,"triangle",.12,.07),this.tone(784,.3,"triangle",.12,.14)}gateSealed(){this.tone(90,.45,"sawtooth",.2,0,50),this.tone(97,.45,"square",.1,0,55)}finish(t){(t?[523,659,784,1046]:[392,349,330,294]).forEach((n,s)=>this.tone(n,.3,"triangle",.14,s*.12))}startMusic(t){this.root=t,!(!this.ctx||this.musicRunning)&&(this.musicRunning=!0,this.step=0,this.nextStep=this.ctx.currentTime+.08,this.timer=window.setInterval(()=>this.schedule(),40))}stopMusic(){window.clearInterval(this.timer),this.musicRunning=!1}schedule(){const t=this.ctx;if(!t||t.state!=="running")return;const e=60/118/4;for(;this.nextStep<t.currentTime+.15;)this.note(this.step,this.nextStep),this.nextStep+=e,this.step=(this.step+1)%64}note(t,e){const n=this.ctx;if(!n||!this.musicGain||!this.noise)return;const s=Math.floor(t/16)%4,r=[0,3,5,7][s],o=t%16,a=h=>this.root*Math.pow(2,h/12),l=(h,u,f,p,g)=>{const _=n.createOscillator(),m=n.createGain(),d=n.createBiquadFilter();d.type="lowpass",d.frequency.value=g,_.type=u,_.frequency.value=h,m.gain.setValueAtTime(p,e),m.gain.exponentialRampToValueAtTime(1e-4,e+f),_.connect(d).connect(m).connect(this.musicGain),_.start(e),_.stop(e+f+.02)};o%2===0&&l(a(r-12),"sawtooth",.22,.2,700);const c=[0,7,12,15,12,7,10,7];if((o%2===1||o%4===0)&&l(a(r+c[o%8]),"triangle",.16,.1,3e3),o%4===0){const h=n.createOscillator(),u=n.createGain();h.frequency.setValueAtTime(130,e),h.frequency.exponentialRampToValueAtTime(40,e+.12),u.gain.setValueAtTime(.4,e),u.gain.exponentialRampToValueAtTime(1e-4,e+.16),h.connect(u).connect(this.musicGain),h.start(e),h.stop(e+.2)}if(o%4===2){const h=n.createBufferSource();h.buffer=this.noise;const u=n.createBiquadFilter();u.type="highpass",u.frequency.value=7e3;const f=n.createGain();f.gain.setValueAtTime(.06,e),f.gain.exponentialRampToValueAtTime(1e-4,e+.05),h.connect(u).connect(f).connect(this.musicGain),h.start(e,Math.random()*.5),h.stop(e+.07)}}}const st={SEG_LEN:200,ROAD_W:2e3,CAM_H:1e3,FOV:100,FOV_BOOST:16,DRAW:240,PLAYER_Z:840,MAX_SPEED:12e3,KMH:.02667,ACCEL:2180,COAST:1330,BRAKE:7500,REV_ACCEL:1500,REV_MAX:.25,OVER_DECEL:3e3,OFFROAD_CAP:.3,OFFROAD_DECEL:5500,BOOST_MULT:1.3,BOOST_ACCEL:2,BOOST_DRAIN:24,BOOST_MIN:2,STEER:2.1,CENT:.5,GRIP:7,DRIFT_GRIP:2.2,DRIFT_STEER:1.3,DRIFT_CENT:.6,DRIFT_SCRUB:480,DRIFT_MIN_SPEED:.35,DRIFT_HOLD_SPEED:.3,DRIFT_GAIN:22,CLEAN_GAIN:2.4,CLEAN_AFTER_HIT:2,WALL_PENALTY:6,BUMP_PENALTY:3,RESERVE_START:30,OFFROAD_X:1,WALL_X:1.34,WALL_SCRAPE_X:1.24,WALL_SPEED_KEEP:.62,WALL_COOLDOWN:.35,SCRAPE_DECEL:2400,SPINE_HALF:.22,SPINE_RAIL:.26,SPINE_OUTER:.3,SPINE_INNER_CLAMP:.2,SPINE_SPEED_MULT:1.14,SPINE_ADVANCE:1.35,SPINE_DRAIN:5,SPINE_CRASH_KEEP:.3,SPINE_CRASH_X:.42,SPINE_GATE_COOLDOWN:.5,LAPS:3,CHECKPOINTS:4,COUNTDOWN:3.2,MAX_DT:.05,CAR_DS:260,CAR_DX:.3,CAR_WORLD_W:420},Pn=[{id:"cruise",name:"CRUISE",blurb:"Forgiving grip, fast reserve, gentle rivals.",ai:.84,grip:1.15,regen:1.25,threshold:35},{id:"velocity",name:"VELOCITY",blurb:"The intended race. Rivals push hard.",ai:.93,grip:1,regen:1,threshold:40},{id:"redline",name:"REDLINE",blurb:"Slippery grip, slow reserve, rivals at full speed.",ai:1,grip:.88,regen:.8,threshold:45}],Dh=[{name:"ROOK",color:0,skill:1,lane:-.5,weaveAmp:.14,weaveHz:.31,start:{s:400,x:-.5},early:1.03,late:.98},{name:"SABLE",color:1,skill:.985,lane:.55,weaveAmp:.07,weaveHz:.23,start:{s:400,x:.5},early:1,late:1},{name:"CINDER",color:2,skill:.97,lane:-.15,weaveAmp:.1,weaveHz:.27,start:{s:0,x:-.5},early:.97,late:1.04}];function Nh(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const Uh=(i,t,e)=>i+(t-i)*e*e,Ls=(i,t,e)=>i+(t-i)*(-Math.cos(e*Math.PI)/2+.5);function Fh(i){const t=[],e=()=>t.length?t[t.length-1].y2:0,n=(u,f)=>{const p=t.length;t.push({i:p,curve:u,y1:e(),y2:f,spine:!1,gate:0,cp:0,band:Math.floor(p/3)%2,sprites:[]})},s=(u,f,p,g,_)=>{const m=e(),d=m+_*st.SEG_LEN,E=u+f+p;for(let S=0;S<u;S++)n(Uh(0,g,S/u),Ls(m,d,S/E));for(let S=0;S<f;S++)n(g,Ls(m,d,(u+S)/E));for(let S=0;S<p;S++)n(Ls(g,0,S/p),Ls(m,d,(u+f+S)/E))};for(const u of i.sections)s(u[0],u[1],u[2],u[3],u[4]);s(30,30,30,0,-e()/st.SEG_LEN),t[t.length-1].y2=0;const r=t.length,o=[],a=[];for(const u of i.spines){const f=Math.floor(u.at*r),p=Math.min(r-2,f+u.len);for(let g=f;g<p;g++)t[g].spine=!0;t[f].gate=1,t[p].gate=2,o.push(f),a.push(p)}[Math.floor(r/4),Math.floor(r/2),Math.floor(r*3/4),0].forEach((u,f)=>{t[u].cp=f+1});const c=Nh(i.seed);let h=6;for(;h<r-4;){for(const u of[-1,1]){if(c()<.2)continue;const f=c(),p=f<.45?"tower":f<.75?"sign":"pylon",g=p==="tower"?2.2+c()*4.2:p==="sign"?1.7+c()*1.4:1.35+c()*.3;t[h].sprites.push({kind:p,x:u*g,tex:Math.floor(c()*4)})}h+=4+Math.floor(c()*6)}return{def:i,segs:t,length:r*st.SEG_LEN,spineStarts:o,spineEnds:a}}function hi(i,t){const e=i.segs.length,n=Math.floor(t/st.SEG_LEN);return i.segs[(n%e+e)%e]}function Oh(i,t){const e=hi(i,t),n=(t%st.SEG_LEN+st.SEG_LEN)%st.SEG_LEN/st.SEG_LEN;return e.y1+(e.y2-e.y1)*n}function Bh(i,t){const e=i.length,n=(t%e+e)%e;let s=1/0;for(const r of i.spineStarts){let o=r*st.SEG_LEN-n;o<0&&(o+=e),o<s&&(s=o)}return s}const ts=160;class kh{constructor(){P(this,"pool",Array.from({length:ts},()=>({on:!1,x:0,y:0,vx:0,vy:0,life:0,max:1,size:2,color:"#fff",kind:0})));P(this,"cursor",0)}take(){for(let e=0;e<ts;e++){const n=this.pool[(this.cursor+e)%ts];if(!n.on)return this.cursor=(this.cursor+e+1)%ts,n}const t=this.pool[this.cursor];return this.cursor=(this.cursor+1)%ts,t}sparks(t,e,n,s,r){for(let o=0;o<s;o++){const a=this.take();a.on=!0,a.x=t,a.y=e,a.vx=(n*(.4+Math.random()*1.2)+(Math.random()-.5)*.9)*r*.9,a.vy=(-.3-Math.random()*1)*r*.8,a.max=a.life=.25+Math.random()*.4,a.size=1.5+Math.random()*2.2,a.color=Math.random()<.5?"#ffd36b":"#fff4c8",a.kind=0}}smoke(t,e,n,s){const r=this.take();r.on=!0,r.x=t+(Math.random()-.5)*n*.1,r.y=e,r.vx=(Math.random()-.5)*n*.25,r.vy=-n*(.1+Math.random()*.15),r.max=r.life=.5+Math.random()*.4,r.size=n*(.03+Math.random()*.03),r.color=s,r.kind=1}streak(t,e,n,s){const r=this.take();r.on=!0,r.x=t,r.y=e,r.vx=(Math.random()-.5)*n*.3,r.vy=n*(.9+Math.random()*.8),r.max=r.life=.22+Math.random()*.15,r.size=n*.012,r.color=s,r.kind=2}update(t){for(const e of this.pool)if(e.on){if(e.life-=t,e.life<=0){e.on=!1;continue}e.x+=e.vx*t,e.y+=e.vy*t,e.kind===0&&(e.vy+=900*t)}}clear(){for(const t of this.pool)t.on=!1}draw(t){for(const e of this.pool){if(!e.on)continue;const n=e.life/e.max;t.globalAlpha=n,t.fillStyle=e.color,e.kind===0?t.fillRect(e.x,e.y,e.size,e.size):e.kind===1?(t.beginPath(),t.arc(e.x,e.y,e.size*(2-n),0,6.283),t.fill()):t.fillRect(e.x,e.y,e.size,e.size*14*n)}t.globalAlpha=1}}function Ts(i,t){const e=document.createElement("canvas");e.width=i,e.height=t;const n=e.getContext("2d");if(!n)throw new Error("2d context unavailable");return[e,n]}function As(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const Ga=["VOLT","HALO","NOVA","KAI","SPINE","DRIVE","AXIS","ZEN","LUMA","PRISM","ARC","ION"],zh='"Arial Black", Impact, "Segoe UI", sans-serif';function Hh(i,t,e,n,s){const r=As(t),[o,a]=Ts(e,n),l=i.tints[Math.floor(r()*i.tints.length)],c=a.createLinearGradient(0,0,e,0);c.addColorStop(0,l),c.addColorStop(.5,"#05081c"),c.addColorStop(1,l),a.fillStyle=c,a.fillRect(0,0,e,n);const h=Math.floor(e/14),u=Math.floor(n/18);for(let p=1;p<u;p++)for(let g=0;g<h;g++)if(r()<.45){const _=i.signs[Math.floor(r()*i.signs.length)];a.globalAlpha=.35+r()*.6,a.fillStyle=r()<.7?"#ffe9a8":_,a.fillRect(6+g*14,6+p*18,8,9)}a.globalAlpha=1;const f=i.signs[Math.floor(r()*2)];return a.fillStyle=f,a.fillRect(0,0,3,n),a.fillRect(e-3,0,3,n),a.fillRect(0,0,e,s?6:3),a.shadowColor=f,a.shadowBlur=12,a.fillRect(e/2-2,0,4,10),o}function Gh(i,t,e){const n=As(t),[s,r]=Ts(220,320),o=i.signs[Math.floor(n()*i.signs.length)];return r.fillStyle="#1a2040",r.fillRect(104,120,12,200),r.fillStyle="#05081c",r.fillRect(6,6,208,118),r.lineWidth=e?8:5,r.strokeStyle=o,r.shadowColor=o,r.shadowBlur=e?0:18,r.strokeRect(10,10,200,110),r.fillStyle=o,r.font=`900 52px ${zh}`,r.textAlign="center",r.textBaseline="middle",r.fillText(Ga[Math.floor(n()*Ga.length)],110,66),r.shadowBlur=0,r.fillStyle=o,r.globalAlpha=.8,r.fillRect(70,94,80,4),s}function Vh(i,t){const e=As(t),[n,s]=Ts(48,320),r=i.signs[Math.floor(e()*i.signs.length)];return s.fillStyle="#10163a",s.fillRect(20,20,8,300),s.shadowColor=r,s.shadowBlur=16,s.fillStyle=r,s.fillRect(12,4,24,26),s.fillRect(22,40,4,260),n}function Va(i,t,e,n,s){const r=As(t),[o,a]=Ts(e,n);let l=0;for(;l<e;){const c=28+Math.floor(r()*(s?70:50)),h=(s?70:50)+Math.floor(r()*(s?170:130));a.fillStyle=i.skyline,a.globalAlpha=s?1:.7,a.fillRect(l,n-h,c,h),a.globalAlpha=s?.9:.5;for(let u=n-h+8;u<n-6;u+=11)for(let f=l+5;f<l+c-6;f+=9)r()<(s?.3:.2)&&(a.fillStyle=r()<.6?"#ffd98a":i.signs[Math.floor(r()*i.signs.length)],a.fillRect(f,u,3,4));a.globalAlpha=1,s&&(a.fillStyle=i.signs[Math.floor(r()*i.signs.length)],a.globalAlpha=.85,a.fillRect(l,n-h,c,2)),r()<.25&&(a.globalAlpha=1,a.fillStyle="#ff2e63",a.fillRect(l+c/2-1,n-h-14,2,14)),a.globalAlpha=1,l+=c+Math.floor(r()*6)}return o}function Wh(i,t,e){const n=As(t*7+1),s=[[128,360],[160,520],[110,440],[180,300]],r=Array.from({length:90},()=>({x:n(),y:n()*.9,r:.5+n()*1.3,p:n()*6.28}));return{towers:s.map(([o,a],l)=>Hh(i,t*31+l,o,a,e)),towerW:[1500,1800,1300,2e3],signs:[0,1,2,3].map(o=>Gh(i,t*17+o,e)),pylons:[0,1,2,3].map(o=>Vh(i,t*13+o)),far:Va(i,t*5+1,2048,260,!1),near:Va(i,t*5+2,2048,300,!0),stars:r}}const Xh=[{body:"#2cf6ff",body2:"#0a5a7a",accent:"#ffffff",glow:"#2cf6ff"},{body:"#ff2ea6",body2:"#6b0f55",accent:"#ffd0ee",glow:"#ff2ea6"},{body:"#8a4dff",body2:"#2a1470",accent:"#e0d0ff",glow:"#8a4dff"},{body:"#ffb347",body2:"#7a3d0a",accent:"#fff0d0",glow:"#ffb347"}];function qh(i){const[t,e]=Ts(256,130),n=e.createRadialGradient(128,112,4,128,112,120);n.addColorStop(0,i.glow+"aa"),n.addColorStop(1,i.glow+"00"),e.fillStyle=n,e.fillRect(0,70,256,60),e.fillStyle="#05060f",e.fillRect(24,74,40,46),e.fillRect(192,74,40,46),e.fillStyle="#1b2250",e.fillRect(28,78,6,38),e.fillRect(222,78,6,38);const s=e.createLinearGradient(0,56,0,108);s.addColorStop(0,i.body),s.addColorStop(1,i.body2),e.fillStyle=s,e.beginPath(),e.moveTo(18,104),e.lineTo(238,104),e.lineTo(232,72),e.lineTo(204,56),e.lineTo(52,56),e.lineTo(24,72),e.closePath(),e.fill();const r=e.createLinearGradient(0,22,0,58);r.addColorStop(0,"#1b2a6a"),r.addColorStop(1,"#050816"),e.fillStyle=r,e.beginPath(),e.moveTo(70,58),e.lineTo(186,58),e.lineTo(166,24),e.lineTo(90,24),e.closePath(),e.fill(),e.fillStyle="rgba(255,255,255,0.18)",e.beginPath(),e.moveTo(96,28),e.lineTo(130,28),e.lineTo(112,54),e.lineTo(84,54),e.closePath(),e.fill(),e.fillStyle=i.body2,e.fillRect(52,36,8,24),e.fillRect(196,36,8,24),e.fillStyle=i.body,e.fillRect(34,28,188,10),e.fillStyle=i.accent,e.fillRect(34,28,188,2),e.shadowColor="#ff2e63",e.shadowBlur=16,e.fillStyle="#ff5a7e",e.fillRect(40,70,176,9),e.fillStyle="#ffd0d8",e.fillRect(60,72,136,3),e.shadowBlur=0,e.fillStyle="#05060f",e.fillRect(62,90,132,20),e.fillStyle=i.body2;for(let o=0;o<6;o++)e.fillRect(70+o*21,92,4,16);return e.fillStyle="#c8d0ff",e.beginPath(),e.arc(96,100,6,0,7),e.arc(160,100,6,0,7),e.fill(),e.fillStyle="#05060f",e.beginPath(),e.arc(96,100,3.5,0,7),e.arc(160,100,3.5,0,7),e.fill(),t}const _i=(i,t)=>(i%t+t)%t,Wa=6;class Yh{constructor(t){P(this,"kind","2d");P(this,"g");P(this,"fx",new kh);P(this,"art",null);P(this,"artKey","");P(this,"cars",Xh.map(qh));P(this,"skyFar",0);P(this,"skyNear",0);P(this,"lines",Array.from({length:44},(t,e)=>({ang:e/44*Math.PI*2+Math.sin(e*12.9)*.2,ph:e*.618%1,len:.12+e*7%5*.04})));P(this,"carX",0);P(this,"carY",0);P(this,"carW",0);P(this,"px1",[]);P(this,"py1",[]);P(this,"pw1",[]);P(this,"ps1",[]);P(this,"px2",[]);P(this,"py2",[]);P(this,"pw2",[]);P(this,"ps2",[]);P(this,"clip",[]);P(this,"vis",[]);P(this,"ok",[]);this.canvas=t;const e=t.getContext("2d",{alpha:!1});if(!e)throw new Error("Canvas 2D unavailable");this.g=e;for(const n of[this.px1,this.py1,this.pw1,this.ps1,this.px2,this.py2,this.pw2,this.ps2,this.clip])n.length=st.DRAW+2}resize(t){const e=Math.min(window.devicePixelRatio||1,2);let n=window.innerWidth*e,s=window.innerHeight*e;const r=Math.sqrt(1920*1080/(n*s)),o=Math.min(1,r)*t;n=Math.max(320,Math.floor(n*o)),s=Math.max(240,Math.floor(s*o)),(this.canvas.width!==n||this.canvas.height!==s)&&(this.canvas.width=n,this.canvas.height=s)}clearFx(){this.fx.clear()}dispose(){this.art=null}getArt(t){const e=`${t.trackIdx}:${t.highContrast?1:0}`;return(!this.art||this.artKey!==e)&&(this.art=Wh(t.track.def.palette,t.track.def.seed,t.highContrast),this.artKey=e),this.art}quad(t,e,n,s,r,o,a,l,c){const h=this.g;h.fillStyle=c,h.beginPath(),h.moveTo(t,e),h.lineTo(n,s),h.lineTo(r,o),h.lineTo(a,l),h.closePath(),h.fill()}wall(t,e,n,s,r){const o=this.px1[t]+e*this.pw1[t],a=this.px2[t]+e*this.pw2[t],l=this.py1[t],c=this.py2[t],h=this.ps1[t]*n*(this.canvas.height/2),u=this.ps2[t]*n*(this.canvas.height/2);this.quad(o,l,a,c,a,c-u,o,l-h,s),this.quad(o,l-h*.86,a,c-u*.86,a,c-u,o,l-h,r)}render(t){const e=this.g,n=this.canvas.width,s=this.canvas.height,r=t.track.def.palette,o=this.getArt(t),a=t.highContrast,l=t.track.segs,c=l.length,h=st.SEG_LEN,u=st.FOV+st.FOV_BOOST*t.boostAmt,f=1/Math.tan(u*Math.PI/360),p=st.CAM_H+Oh(t.track,t.s),g=t.s-st.PLAYER_Z,_=Math.floor(g/h),m=(g-_*h)/h,d=l[_i(_,c)],E=l[_i(Math.floor(t.s/h),c)];this.skyFar+=E.curve*t.speedPct*t.dt*140,this.skyNear+=E.curve*t.speedPct*t.dt*260,this.fx.update(t.dt),e.save(),e.translate(t.shakeX,t.shakeY);const S=e.createLinearGradient(0,0,0,s/2);if(S.addColorStop(0,r.skyTop),S.addColorStop(.55,r.skyMid),S.addColorStop(1,r.skyBottom),e.fillStyle=S,e.fillRect(-40,-40,n+80,s/2+40),!a){for(const I of o.stars)e.globalAlpha=.35+.35*Math.sin(t.time*1.5+I.p),e.fillStyle="#cfe8ff",e.fillRect(I.x*n,I.y*s*.42,I.r,I.r);e.globalAlpha=1}const x=s*.17,F=_i(n*.6-this.skyFar*.12*(n/1280),n+x*2)-x*.5,C=s/2-x*.55;e.save(),e.beginPath(),e.arc(F,C,x,0,Math.PI*2),e.clip();const A=e.createLinearGradient(0,C-x,0,C+x);if(A.addColorStop(0,r.sun2),A.addColorStop(1,r.sun1),e.fillStyle=A,e.fillRect(F-x,C-x,x*2,x*2),!a){e.fillStyle=r.skyBottom;for(let I=0;I<6;I++)e.fillRect(F-x,C+x*(.05+I*.17),x*2,x*(.015+I*.016))}e.restore();const L=(I,rt,Y)=>{const ot=s*Y/I.height,vt=I.width*ot;let Lt=-_i(rt*ot,vt);for(;Lt<n;Lt+=vt)e.drawImage(I,Lt,s/2-I.height*ot+1,vt+1,I.height*ot)};L(o.far,this.skyFar*.5,.2),L(o.near,this.skyNear,.26),e.fillStyle=r.ground0,e.fillRect(-40,s/2,n+80,s/2+40);const y=e.createLinearGradient(0,s/2-s*.09,0,s/2+2);y.addColorStop(0,r.fog+"00"),y.addColorStop(1,r.fog+(a?"66":"cc")),e.fillStyle=y,e.fillRect(-40,s/2-s*.09,n+80,s*.09+2);const v=t.gateOpen?r.accentA:"#ff2e63";let R=0,N=-(d.curve*m),U=s;const O=n/2,X=s/2;for(let I=0;I<st.DRAW;I++){const rt=_+I,Y=l[_i(rt,c)],ot=rt*h-g,vt=ot+h,Lt=t.x*st.ROAD_W-R,zt=t.x*st.ROAD_W-R-N;if(this.ok[I]=ot>20,this.ok[I]){const nt=f/ot,et=f/vt;this.ps1[I]=nt,this.ps2[I]=et,this.px1[I]=O+nt*-Lt*O,this.px2[I]=O+et*-zt*O,this.py1[I]=X-nt*(Y.y1-p)*X,this.py2[I]=X-et*(Y.y2-p)*X,this.pw1[I]=nt*st.ROAD_W*O,this.pw2[I]=et*st.ROAD_W*O}if(R+=N,N+=Y.curve,this.clip[I]=U,this.vis[I]=!1,!this.ok[I]||this.py2[I]>=this.py1[I]||this.py2[I]>=U)continue;this.vis[I]=!0;const Z=this.px1[I],J=this.py1[I],T=this.pw1[I],mt=this.px2[I],j=this.py2[I],at=this.pw2[I],lt=Y.band===0;e.fillStyle=lt?r.ground0:r.ground1,e.fillRect(-40,j,n+80,J-j+1);const yt=T/7,ut=at/7,w=a?lt?"#ffffff":"#ffe600":lt?r.rumble0:r.rumble1;this.quad(Z-T-yt,J,mt-at-ut,j,mt-at,j,Z-T,J,w),this.quad(Z+T+yt,J,mt+at+ut,j,mt+at,j,Z+T,J,w),this.quad(Z-T,J,mt-at,j,mt+at,j,Z+T,J,a?lt?"#000000":"#0b0b12":lt?r.road0:r.road1);const M=T*.025,q=at*.025;if(this.quad(Z-T+M,J,mt-at+q,j,mt-at,j,Z-T,J,r.edge),this.quad(Z+T-M,J,mt+at-q,j,mt+at,j,Z+T,J,r.edge),lt){const nt=T/(a?22:36),et=at/(a?22:36);for(let Rt=1;Rt<4;Rt++){if(Rt===2&&Y.spine)continue;const Mt=-1+Rt*2/4;this.quad(Z+Mt*T-nt,J,mt+Mt*at-et,j,mt+Mt*at+et,j,Z+Mt*T+nt,J,r.lane)}}if(Y.spine){const nt=st.SPINE_HALF,et=.5+.5*Math.sin(t.time*6-I*.35);e.globalAlpha=t.gateOpen?.2+.18*et:.25,this.quad(Z-nt*T,J,mt-nt*at,j,mt+nt*at,j,Z+nt*T,J,v),e.globalAlpha=1;const Rt=T*.02,Mt=at*.02;if(this.quad(Z-nt*T-Rt,J,mt-nt*at-Mt,j,mt-nt*at+Mt,j,Z-nt*T+Rt,J,v),this.quad(Z+nt*T-Rt,J,mt+nt*at-Mt,j,mt+nt*at+Mt,j,Z+nt*T+Rt,J,v),Y.band===0&&t.gateOpen){const Ct=T*.16,$t=at*.16;e.globalAlpha=.55,this.quad(Z-Ct,J,mt-$t,j,mt,j-(J-j)*.2,Z,J-(J-j)*.2,v),this.quad(Z+Ct,J,mt+$t,j,mt,j-(J-j)*.2,Z,J-(J-j)*.2,v),e.globalAlpha=1}}const it=1-Math.exp(-Math.pow(I/st.DRAW,2)*Wa);it>.01&&(e.globalAlpha=a?it*.4:it,e.fillStyle=r.fog,e.fillRect(-40,j,n+80,J-j+1),e.globalAlpha=1),U=J}const W=t.rivals.map(I=>Math.floor(I.s/h)-_);for(let I=st.DRAW-1;I>0;I--){if(!this.ok[I])continue;const rt=_+I,Y=l[_i(rt,c)],ot=1-(1-Math.exp(-Math.pow(I/st.DRAW,2)*Wa))*(a?.4:.92);if(this.vis[I]&&(this.wall(I,st.WALL_X,320,Y.band===0?"#0c1238":"#141b4c",a?"#ffffff":r.accentB),this.wall(I,-1.34,320,Y.band===0?"#0c1238":"#141b4c",a?"#ffffff":r.accentB),Y.spine)){const J=t.gateOpen?r.accentA:"#ff2e63";e.globalAlpha=ot,this.wall(I,st.SPINE_RAIL,150,"#071030",J),this.wall(I,-.26,150,"#071030",J),e.globalAlpha=1}const vt=this.px1[I],Lt=this.py1[I],zt=this.ps1[I],Z=this.clip[I];for(const J of Y.sprites){let T,mt;J.kind==="tower"?(T=o.towers[J.tex],mt=o.towerW[J.tex]):J.kind==="sign"?(T=o.signs[J.tex],mt=1100):(T=o.pylons[J.tex],mt=150);const j=mt*zt*O;if(j<2)continue;const at=j*T.height/T.width,lt=vt+zt*J.x*st.ROAD_W*O-j/2,yt=Lt-at,ut=Math.max(0,yt+at-Z);ut>=at||(e.globalAlpha=ot,e.drawImage(T,0,0,T.width,T.height*(1-ut/at),lt,yt,j,at-ut))}e.globalAlpha=1,Y.cp>0&&this.vis[I]&&this.drawArch(I,Y.cp,r.accentA,r.accentB,ot,t.time),Y.gate===1&&this.vis[I]?this.drawGate(I,t,ot):Y.gate===2&&this.vis[I]&&this.drawExit(I,r.accentB,ot);for(let J=0;J<t.rivals.length;J++){if(W[J]!==I)continue;const T=t.rivals[J],mt=(T.s-rt*h)/h,j=this.ps1[I]+(this.ps2[I]-this.ps1[I])*mt,at=this.px1[I]+(this.px2[I]-this.px1[I])*mt+j*T.x*st.ROAD_W*O,lt=this.py1[I]+(this.py2[I]-this.py1[I])*mt,yt=st.CAR_WORLD_W*j*O;if(yt<2)continue;const ut=this.cars[1+T.color%3],w=yt*ut.height/ut.width,M=Math.max(0,lt-Z);e.globalAlpha=ot,e.fillStyle="rgba(0,0,0,0.45)",e.beginPath(),e.ellipse(at,lt,yt*.5,yt*.06,0,0,7),e.fill(),M<w&&e.drawImage(ut,0,0,ut.width,ut.height*(1-M/w),at-yt/2,lt-w,yt,w-M),e.globalAlpha=1}}const H=Math.min(n*.23,s*.46),B=this.cars[0],Q=H*B.height/B.width,pt=Math.sin(t.time*38)*(.5+t.speedPct*1.6)*(s/720),ft=O+t.steer*n*.012,dt=s*.945+pt,St=Math.max(-.22,Math.min(.22,t.steer*.04+t.vx*.03+(t.drifting?t.vx*.07:0)));if(this.carX=ft,this.carY=dt,this.carW=H,e.save(),e.translate(ft,dt),e.rotate(St),e.fillStyle="rgba(0,0,0,0.5)",e.beginPath(),e.ellipse(0,-2,H*.52,H*.05,0,0,7),e.fill(),e.drawImage(B,-H/2,-Q,H,Q),t.boosting){e.globalCompositeOperation="lighter";for(const I of[-.125,.125]){const rt=I*H,Y=-Q*.23,ot=H*(.28+.06*Math.sin(t.time*90)),vt=e.createRadialGradient(rt,Y,0,rt,Y,ot);vt.addColorStop(0,"rgba(255,255,255,0.95)"),vt.addColorStop(.35,"rgba(255,179,71,0.8)"),vt.addColorStop(1,"rgba(255,46,166,0)"),e.fillStyle=vt,e.fillRect(rt-ot,Y-ot,ot*2,ot*2)}e.globalCompositeOperation="source-over"}e.restore(),t.drifting&&t.speedPct>.3&&Math.random()<t.dt*60*.7&&(this.fx.smoke(ft-H*.32,dt-Q*.08,H,"rgba(210,220,255,0.6)"),this.fx.smoke(ft+H*.32,dt-Q*.08,H,"rgba(210,220,255,0.6)")),t.boosting&&Math.random()<t.dt*60*.9&&this.fx.streak(ft+(Math.random()<.5?-1:1)*H*.125,dt-Q*.25,H,Math.random()<.5?"#2cf6ff":"#ff2ea6"),this.fx.draw(e);const z=t.speedLines?Math.max(0,t.speedPct-.45)*1.8+t.boostAmt*.6:0;if(z>.02){const I=Math.min(1,z)*(t.reducedMotion?.4:1),rt=Math.hypot(n,s)*.55;e.lineWidth=Math.max(1,s/360),e.strokeStyle=t.boostAmt>.2?"#bff9ff":"#9fb4ff";const Y=s*.5;for(const ot of this.lines){ot.ph=(ot.ph+t.dt*(.5+t.speedPct*1.7+t.boostAmt*1.4))%1;const vt=rt*(.18+ot.ph*.82),Lt=vt+rt*ot.len*(.3+ot.ph)*(.6+t.boostAmt);e.globalAlpha=I*ot.ph*.7,e.beginPath(),e.moveTo(O+Math.cos(ot.ang)*vt,Y+Math.sin(ot.ang)*vt*.7),e.lineTo(O+Math.cos(ot.ang)*Lt,Y+Math.sin(ot.ang)*Lt*.7),e.stroke()}e.globalAlpha=1}if(t.boostAmt>.02&&!a){const I=e.createRadialGradient(O,X,s*.3,O,X,s*1);I.addColorStop(0,"rgba(44,246,255,0)"),I.addColorStop(1,`rgba(120,80,255,${(t.reducedFlash?.18:.38)*t.boostAmt})`),e.fillStyle=I,e.fillRect(-40,-40,n+80,s+80)}t.flash>.01&&!t.reducedFlash&&(e.globalAlpha=Math.min(1,t.flash)*.18,e.fillStyle="#ffffff",e.fillRect(-40,-40,n+80,s+80),e.globalAlpha=1),e.restore()}sparks(t,e){this.fx.sparks(this.carX+t*this.carW*.5,this.carY-this.carW*.1,t,e,this.carW)}drawArch(t,e,n,s,r,o){const a=this.g,l=this.canvas.height,c=this.px1[t],h=this.py1[t],u=this.pw1[t],f=this.ps1[t]*900*(l/2),p=this.ps1[t]*130*(l/2);a.globalAlpha=r;const g=e===4?"#ffffff":n,_=Math.max(2,u*.05);if(a.fillStyle=g,a.fillRect(c-u*1.08-_,h-f,_*2,f),a.fillRect(c+u*1.08-_,h-f,_*2,f),e===4){const d=u*2.2/24;for(let E=0;E<24;E++)for(let S=0;S<2;S++)a.fillStyle=(E+S)%2===0?"#ffffff":"#10142e",a.fillRect(c-u*1.1+E*d,h-f-p+S*p/2,d+.5,p/2+.5)}else a.fillStyle=s,a.fillRect(c-u*1.1,h-f-p,u*2.2,p),a.fillStyle=n,a.fillRect(c-u*1.1,h-f-p,u*2.2,Math.max(1,p*.12)),u>70&&(a.fillStyle="#ffffff",a.font=`900 ${Math.max(10,Math.floor(p*.7))}px "Arial Black", Impact, sans-serif`,a.textAlign="center",a.textBaseline="middle",a.fillText(`CHECKPOINT ${e}`,c,h-f-p/2+Math.sin(o*3)*.5));a.globalAlpha=1}drawGate(t,e,n){const s=this.g,r=this.canvas.height,o=this.px1[t],a=this.py1[t],l=this.pw1[t],c=this.ps1[t]*620*(r/2),h=e.gateOpen,u=h?"#2cf6ff":"#ff2e63",f=h||e.reducedFlash?1:.7+.3*Math.sin(e.time*50);s.globalAlpha=n*f;const p=st.SPINE_RAIL*l,g=Math.max(2,l*.035);if(h){const m=s.createLinearGradient(0,a-c,0,a);m.addColorStop(0,"rgba(44,246,255,0.0)"),m.addColorStop(1,"rgba(44,246,255,0.28)"),s.fillStyle=m,s.fillRect(o-p,a-c,p*2,c)}else{s.fillStyle="rgba(255,46,99,0.55)",s.fillRect(o-p,a-c,p*2,c),s.save(),s.beginPath(),s.rect(o-p,a-c,p*2,c),s.clip(),s.fillStyle="rgba(10,6,20,0.8)";const m=Math.max(8,c/6);for(let d=-c;d<p*2+c;d+=m*2)s.beginPath(),s.moveTo(o-p+d,a),s.lineTo(o-p+d+m,a),s.lineTo(o-p+d+m+c,a-c),s.lineTo(o-p+d+c,a-c),s.closePath(),s.fill();s.restore()}s.fillStyle=u,s.fillRect(o-p-g,a-c,g*2,c),s.fillRect(o+p-g,a-c,g*2,c);const _=Math.max(3,c*.16);s.fillRect(o-p-g,a-c-_*.4,p*2+g*2,_),p>26&&(s.fillStyle="#05081c",s.font=`900 ${Math.max(9,Math.floor(_*.7))}px "Arial Black", Impact, sans-serif`,s.textAlign="center",s.textBaseline="middle",s.fillText(h?"SPINE OPEN":e.gateText,o,a-c+_*.1)),s.globalAlpha=1}drawExit(t,e,n){const s=this.g,r=this.canvas.height,o=this.px1[t],a=this.py1[t],l=this.pw1[t],c=this.ps1[t]*420*(r/2),h=st.SPINE_RAIL*l,u=Math.max(2,l*.025);s.globalAlpha=n,s.fillStyle=e,s.fillRect(o-h-u,a-c,u*2,c),s.fillRect(o+h-u,a-c,u*2,c),s.fillRect(o-h-u,a-c,h*2+u*2,Math.max(2,c*.08)),s.globalAlpha=1}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const fa="170",$h=0,Xa=1,Kh=2,da=1,Lc=2,Rn=3,Yn=0,Le=1,tn=2,In=0,ci=1,mn=2,qa=3,Ya=4,Zh=5,ri=100,Jh=101,jh=102,Qh=103,tu=104,eu=200,nu=201,iu=202,su=203,_o=204,vo=205,ru=206,ou=207,au=208,lu=209,cu=210,hu=211,uu=212,fu=213,du=214,xo=0,Mo=1,yo=2,Hi=3,So=4,bo=5,Eo=6,wo=7,Ic=0,pu=1,mu=2,Xn=0,Dc=1,Nc=2,Uc=3,pa=4,gu=5,Fc=6,Oc=7,Bc=300,Gi=301,Vi=302,To=303,Ao=304,Er=306,ui=1e3,ai=1001,Ro=1002,Fe=1003,_u=1004,Is=1005,gn=1006,Lr=1007,li=1008,Un=1009,kc=1010,zc=1011,Ms=1012,ma=1013,fi=1014,_n=1015,vn=1016,ga=1017,_a=1018,Wi=1020,Hc=35902,Gc=1021,Vc=1022,hn=1023,Wc=1024,Xc=1025,ki=1026,Xi=1027,va=1028,xa=1029,qc=1030,Ma=1031,ya=1033,fr=33776,dr=33777,pr=33778,mr=33779,Co=35840,Po=35841,Lo=35842,Io=35843,Do=36196,No=37492,Uo=37496,Fo=37808,Oo=37809,Bo=37810,ko=37811,zo=37812,Ho=37813,Go=37814,Vo=37815,Wo=37816,Xo=37817,qo=37818,Yo=37819,$o=37820,Ko=37821,gr=36492,Zo=36494,Jo=36495,Yc=36283,jo=36284,Qo=36285,ta=36286,vu=3200,xu=3201,$c=0,Mu=1,Cn="",He="srgb",$i="srgb-linear",wr="linear",se="srgb",vi=7680,$a=519,yu=512,Su=513,bu=514,Kc=515,Eu=516,wu=517,Tu=518,Au=519,ea=35044,na=35048,Ka="300 es",Ln=2e3,vr=2001;class Ki{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Re=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ir=Math.PI/180,xr=180/Math.PI;function Dn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Re[i&255]+Re[i>>8&255]+Re[i>>16&255]+Re[i>>24&255]+"-"+Re[t&255]+Re[t>>8&255]+"-"+Re[t>>16&15|64]+Re[t>>24&255]+"-"+Re[e&63|128]+Re[e>>8&255]+"-"+Re[e>>16&255]+Re[e>>24&255]+Re[n&255]+Re[n>>8&255]+Re[n>>16&255]+Re[n>>24&255]).toLowerCase()}function Ee(i,t,e){return Math.max(t,Math.min(e,i))}function Ru(i,t){return(i%t+t)%t}function Dr(i,t,e){return(1-e)*i+e*t}function dn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function re(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class ht{constructor(t=0,e=0){ht.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xt{constructor(t,e,n,s,r,o,a,l,c){Xt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],p=n[5],g=n[8],_=s[0],m=s[3],d=s[6],E=s[1],S=s[4],x=s[7],F=s[2],C=s[5],A=s[8];return r[0]=o*_+a*E+l*F,r[3]=o*m+a*S+l*C,r[6]=o*d+a*x+l*A,r[1]=c*_+h*E+u*F,r[4]=c*m+h*S+u*C,r[7]=c*d+h*x+u*A,r[2]=f*_+p*E+g*F,r[5]=f*m+p*S+g*C,r[8]=f*d+p*x+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*r,p=c*r-o*l,g=e*u+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*c-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=f*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=p*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Nr.makeScale(t,e)),this}rotate(t){return this.premultiply(Nr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Nr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Nr=new Xt;function Zc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Mr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Cu(){const i=Mr("canvas");return i.style.display="block",i}const Za={};function ds(i){i in Za||(Za[i]=!0,console.warn(i))}function Pu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Lu(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Iu(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Jt={enabled:!0,workingColorSpace:$i,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===se&&(i.r=Nn(i.r),i.g=Nn(i.g),i.b=Nn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===se&&(i.r=zi(i.r),i.g=zi(i.g),i.b=zi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Cn?wr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Nn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function zi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Ja=[.64,.33,.3,.6,.15,.06],ja=[.2126,.7152,.0722],Qa=[.3127,.329],tl=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),el=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Jt.define({[$i]:{primaries:Ja,whitePoint:Qa,transfer:wr,toXYZ:tl,fromXYZ:el,luminanceCoefficients:ja,workingColorSpaceConfig:{unpackColorSpace:He},outputColorSpaceConfig:{drawingBufferColorSpace:He}},[He]:{primaries:Ja,whitePoint:Qa,transfer:se,toXYZ:tl,fromXYZ:el,luminanceCoefficients:ja,outputColorSpaceConfig:{drawingBufferColorSpace:He}}});let xi;class Du{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{xi===void 0&&(xi=Mr("canvas")),xi.width=t.width,xi.height=t.height;const n=xi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=xi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Mr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Nn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Nn(e[n]/255)*255):e[n]=Nn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Nu=0;class Jc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=Dn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ur(s[o].image)):r.push(Ur(s[o]))}else r=Ur(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ur(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Du.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Uu=0;class Ie extends Ki{constructor(t=Ie.DEFAULT_IMAGE,e=Ie.DEFAULT_MAPPING,n=ai,s=ai,r=gn,o=li,a=hn,l=Un,c=Ie.DEFAULT_ANISOTROPY,h=Cn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Uu++}),this.uuid=Dn(),this.name="",this.source=new Jc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ht(0,0),this.repeat=new ht(1,1),this.center=new ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Bc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ui:t.x=t.x-Math.floor(t.x);break;case ai:t.x=t.x<0?0:1;break;case Ro:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ui:t.y=t.y-Math.floor(t.y);break;case ai:t.y=t.y<0?0:1;break;case Ro:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ie.DEFAULT_IMAGE=null;Ie.DEFAULT_MAPPING=Bc;Ie.DEFAULT_ANISOTROPY=1;class oe{constructor(t=0,e=0,n=0,s=1){oe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],p=l[5],g=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(c+1)/2,x=(p+1)/2,F=(d+1)/2,C=(h+f)/4,A=(u+_)/4,L=(g+m)/4;return S>x&&S>F?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=C/n,r=A/n):x>F?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=C/s,r=L/s):F<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(F),n=A/r,s=L/r),this.set(n,s,r,e),this}let E=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(u-_)/E,this.z=(f-h)/E,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Fu extends Ki{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new oe(0,0,t,e),this.scissorTest=!1,this.viewport=new oe(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ie(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Jc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class nn extends Fu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class jc extends Ie{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ou extends Ie{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rs{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==f||c!==p||h!==g){let m=1-a;const d=l*f+c*p+h*g+u*_,E=d>=0?1:-1,S=1-d*d;if(S>Number.EPSILON){const F=Math.sqrt(S),C=Math.atan2(F,d*E);m=Math.sin(m*C)/F,a=Math.sin(a*C)/F}const x=a*E;if(l=l*m+f*x,c=c*m+p*x,h=h*m+g*x,u=u*m+_*x,m===1-a){const F=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=F,c*=F,h*=F,u*=F}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*p-c*f,t[e+1]=l*g+h*f+c*u-a*p,t[e+2]=c*g+h*p+a*f-l*u,t[e+3]=h*g-a*u-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),f=l(n/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"YZX":this._x=f*h*u+c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u-f*p*g;break;case"XZY":this._x=f*h*u-c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(nl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(nl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Fr.copy(this).projectOnVector(t),this.sub(Fr)}reflect(t){return this.sub(Fr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fr=new D,nl=new Rs;class pi{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(on.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(on.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=on.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,on):on.fromBufferAttribute(r,o),on.applyMatrix4(t.matrixWorld),this.expandByPoint(on);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ds.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ds.copy(n.boundingBox)),Ds.applyMatrix4(t.matrixWorld),this.union(Ds)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,on),on.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(es),Ns.subVectors(this.max,es),Mi.subVectors(t.a,es),yi.subVectors(t.b,es),Si.subVectors(t.c,es),Bn.subVectors(yi,Mi),kn.subVectors(Si,yi),Zn.subVectors(Mi,Si);let e=[0,-Bn.z,Bn.y,0,-kn.z,kn.y,0,-Zn.z,Zn.y,Bn.z,0,-Bn.x,kn.z,0,-kn.x,Zn.z,0,-Zn.x,-Bn.y,Bn.x,0,-kn.y,kn.x,0,-Zn.y,Zn.x,0];return!Or(e,Mi,yi,Si,Ns)||(e=[1,0,0,0,1,0,0,0,1],!Or(e,Mi,yi,Si,Ns))?!1:(Us.crossVectors(Bn,kn),e=[Us.x,Us.y,Us.z],Or(e,Mi,yi,Si,Ns))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,on).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(on).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const bn=[new D,new D,new D,new D,new D,new D,new D,new D],on=new D,Ds=new pi,Mi=new D,yi=new D,Si=new D,Bn=new D,kn=new D,Zn=new D,es=new D,Ns=new D,Us=new D,Jn=new D;function Or(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Jn.fromArray(i,r);const a=s.x*Math.abs(Jn.x)+s.y*Math.abs(Jn.y)+s.z*Math.abs(Jn.z),l=t.dot(Jn),c=e.dot(Jn),h=n.dot(Jn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Bu=new pi,ns=new D,Br=new D;class mi{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Bu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ns.subVectors(t,this.center);const e=ns.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ns,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Br.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ns.copy(t.center).add(Br)),this.expandByPoint(ns.copy(t.center).sub(Br))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const En=new D,kr=new D,Fs=new D,zn=new D,zr=new D,Os=new D,Hr=new D;class Sa{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,En)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=En.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(En.copy(this.origin).addScaledVector(this.direction,e),En.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){kr.copy(t).add(e).multiplyScalar(.5),Fs.copy(e).sub(t).normalize(),zn.copy(this.origin).sub(kr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Fs),a=zn.dot(this.direction),l=-zn.dot(Fs),c=zn.lengthSq(),h=Math.abs(1-o*o);let u,f,p,g;if(h>0)if(u=o*l-a,f=o*a-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,p=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(kr).addScaledVector(Fs,f),p}intersectSphere(t,e){En.subVectors(t.center,this.origin);const n=En.dot(this.direction),s=En.dot(En)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,En)!==null}intersectTriangle(t,e,n,s,r){zr.subVectors(e,t),Os.subVectors(n,t),Hr.crossVectors(zr,Os);let o=this.direction.dot(Hr),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;zn.subVectors(this.origin,t);const l=a*this.direction.dot(Os.crossVectors(zn,Os));if(l<0)return null;const c=a*this.direction.dot(zr.cross(zn));if(c<0||l+c>o)return null;const h=-a*zn.dot(Hr);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ne{constructor(t,e,n,s,r,o,a,l,c,h,u,f,p,g,_,m){ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,f,p,g,_,m)}set(t,e,n,s,r,o,a,l,c,h,u,f,p,g,_,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ne().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/bi.setFromMatrixColumn(t,0).length(),r=1/bi.setFromMatrixColumn(t,1).length(),o=1/bi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,p=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=f-_*c,e[9]=-a*l,e[2]=_-f*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*h,p=l*u,g=c*h,_=c*u;e[0]=f+_*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=_+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*h,p=l*u,g=c*h,_=c*u;e[0]=f-_*a,e[4]=-o*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=_-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*h,p=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=g*c-p,e[8]=f*c+_,e[1]=l*u,e[5]=_*c+f,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-f*u,e[8]=g*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+_,e[5]=o*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ku,t,zu)}lookAt(t,e,n){const s=this.elements;return We.subVectors(t,e),We.lengthSq()===0&&(We.z=1),We.normalize(),Hn.crossVectors(n,We),Hn.lengthSq()===0&&(Math.abs(n.z)===1?We.x+=1e-4:We.z+=1e-4,We.normalize(),Hn.crossVectors(n,We)),Hn.normalize(),Bs.crossVectors(We,Hn),s[0]=Hn.x,s[4]=Bs.x,s[8]=We.x,s[1]=Hn.y,s[5]=Bs.y,s[9]=We.y,s[2]=Hn.z,s[6]=Bs.z,s[10]=We.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],p=n[13],g=n[2],_=n[6],m=n[10],d=n[14],E=n[3],S=n[7],x=n[11],F=n[15],C=s[0],A=s[4],L=s[8],y=s[12],v=s[1],R=s[5],N=s[9],U=s[13],O=s[2],X=s[6],W=s[10],H=s[14],B=s[3],Q=s[7],pt=s[11],ft=s[15];return r[0]=o*C+a*v+l*O+c*B,r[4]=o*A+a*R+l*X+c*Q,r[8]=o*L+a*N+l*W+c*pt,r[12]=o*y+a*U+l*H+c*ft,r[1]=h*C+u*v+f*O+p*B,r[5]=h*A+u*R+f*X+p*Q,r[9]=h*L+u*N+f*W+p*pt,r[13]=h*y+u*U+f*H+p*ft,r[2]=g*C+_*v+m*O+d*B,r[6]=g*A+_*R+m*X+d*Q,r[10]=g*L+_*N+m*W+d*pt,r[14]=g*y+_*U+m*H+d*ft,r[3]=E*C+S*v+x*O+F*B,r[7]=E*A+S*R+x*X+F*Q,r[11]=E*L+S*N+x*W+F*pt,r[15]=E*y+S*U+x*H+F*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],p=t[14],g=t[3],_=t[7],m=t[11],d=t[15];return g*(+r*l*u-s*c*u-r*a*f+n*c*f+s*a*p-n*l*p)+_*(+e*l*p-e*c*f+r*o*f-s*o*p+s*c*h-r*l*h)+m*(+e*c*u-e*a*p-r*o*u+n*o*p+r*a*h-n*c*h)+d*(-s*a*h-e*l*u+e*a*f+s*o*u-n*o*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],p=t[11],g=t[12],_=t[13],m=t[14],d=t[15],E=u*m*c-_*f*c+_*l*p-a*m*p-u*l*d+a*f*d,S=g*f*c-h*m*c-g*l*p+o*m*p+h*l*d-o*f*d,x=h*_*c-g*u*c+g*a*p-o*_*p-h*a*d+o*u*d,F=g*u*l-h*_*l-g*a*f+o*_*f+h*a*m-o*u*m,C=e*E+n*S+s*x+r*F;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return t[0]=E*A,t[1]=(_*f*r-u*m*r-_*s*p+n*m*p+u*s*d-n*f*d)*A,t[2]=(a*m*r-_*l*r+_*s*c-n*m*c-a*s*d+n*l*d)*A,t[3]=(u*l*r-a*f*r-u*s*c+n*f*c+a*s*p-n*l*p)*A,t[4]=S*A,t[5]=(h*m*r-g*f*r+g*s*p-e*m*p-h*s*d+e*f*d)*A,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*d-e*l*d)*A,t[7]=(o*f*r-h*l*r+h*s*c-e*f*c-o*s*p+e*l*p)*A,t[8]=x*A,t[9]=(g*u*r-h*_*r-g*n*p+e*_*p+h*n*d-e*u*d)*A,t[10]=(o*_*r-g*a*r+g*n*c-e*_*c-o*n*d+e*a*d)*A,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*p-e*a*p)*A,t[12]=F*A,t[13]=(h*_*s-g*u*s+g*n*f-e*_*f-h*n*m+e*u*m)*A,t[14]=(g*a*s-o*_*s-g*n*l+e*_*l+o*n*m-e*a*m)*A,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*f+e*a*f)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,f=r*c,p=r*h,g=r*u,_=o*h,m=o*u,d=a*u,E=l*c,S=l*h,x=l*u,F=n.x,C=n.y,A=n.z;return s[0]=(1-(_+d))*F,s[1]=(p+x)*F,s[2]=(g-S)*F,s[3]=0,s[4]=(p-x)*C,s[5]=(1-(f+d))*C,s[6]=(m+E)*C,s[7]=0,s[8]=(g+S)*A,s[9]=(m-E)*A,s[10]=(1-(f+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=bi.set(s[0],s[1],s[2]).length();const o=bi.set(s[4],s[5],s[6]).length(),a=bi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],an.copy(this);const c=1/r,h=1/o,u=1/a;return an.elements[0]*=c,an.elements[1]*=c,an.elements[2]*=c,an.elements[4]*=h,an.elements[5]*=h,an.elements[6]*=h,an.elements[8]*=u,an.elements[9]*=u,an.elements[10]*=u,e.setFromRotationMatrix(an),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Ln){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let p,g;if(a===Ln)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===vr)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Ln){const l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(o-r),f=(e+t)*c,p=(n+s)*h;let g,_;if(a===Ln)g=(o+r)*u,_=-2*u;else if(a===vr)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const bi=new D,an=new ne,ku=new D(0,0,0),zu=new D(1,1,1),Hn=new D,Bs=new D,We=new D,il=new ne,sl=new Rs;class xn{constructor(t=0,e=0,n=0,s=xn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ee(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ee(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return il.makeRotationFromQuaternion(t),this.setFromRotationMatrix(il,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return sl.setFromEuler(this),this.setFromQuaternion(sl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xn.DEFAULT_ORDER="XYZ";class Qc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Hu=0;const rl=new D,Ei=new Rs,wn=new ne,ks=new D,is=new D,Gu=new D,Vu=new Rs,ol=new D(1,0,0),al=new D(0,1,0),ll=new D(0,0,1),cl={type:"added"},Wu={type:"removed"},wi={type:"childadded",child:null},Gr={type:"childremoved",child:null};class de extends Ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hu++}),this.uuid=Dn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=de.DEFAULT_UP.clone();const t=new D,e=new xn,n=new Rs,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ne},normalMatrix:{value:new Xt}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=de.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.multiply(Ei),this}rotateOnWorldAxis(t,e){return Ei.setFromAxisAngle(t,e),this.quaternion.premultiply(Ei),this}rotateX(t){return this.rotateOnAxis(ol,t)}rotateY(t){return this.rotateOnAxis(al,t)}rotateZ(t){return this.rotateOnAxis(ll,t)}translateOnAxis(t,e){return rl.copy(t).applyQuaternion(this.quaternion),this.position.add(rl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ol,t)}translateY(t){return this.translateOnAxis(al,t)}translateZ(t){return this.translateOnAxis(ll,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(wn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ks.copy(t):ks.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wn.lookAt(is,ks,this.up):wn.lookAt(ks,is,this.up),this.quaternion.setFromRotationMatrix(wn),s&&(wn.extractRotation(s.matrixWorld),Ei.setFromRotationMatrix(wn),this.quaternion.premultiply(Ei.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(cl),wi.child=t,this.dispatchEvent(wi),wi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Wu),Gr.child=t,this.dispatchEvent(Gr),Gr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),wn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),wn.multiply(t.parent.matrixWorld)),t.applyMatrix4(wn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(cl),wi.child=t,this.dispatchEvent(wi),wi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,t,Gu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(is,Vu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}de.DEFAULT_UP=new D(0,1,0);de.DEFAULT_MATRIX_AUTO_UPDATE=!0;de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ln=new D,Tn=new D,Vr=new D,An=new D,Ti=new D,Ai=new D,hl=new D,Wr=new D,Xr=new D,qr=new D,Yr=new oe,$r=new oe,Kr=new oe;class en{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),ln.subVectors(t,e),s.cross(ln);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){ln.subVectors(s,e),Tn.subVectors(n,e),Vr.subVectors(t,e);const o=ln.dot(ln),a=ln.dot(Tn),l=ln.dot(Vr),c=Tn.dot(Tn),h=Tn.dot(Vr),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,p=(c*l-a*h)*f,g=(o*h-a*l)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,An)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,An.x),l.addScaledVector(o,An.y),l.addScaledVector(a,An.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Yr.setScalar(0),$r.setScalar(0),Kr.setScalar(0),Yr.fromBufferAttribute(t,e),$r.fromBufferAttribute(t,n),Kr.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Yr,r.x),o.addScaledVector($r,r.y),o.addScaledVector(Kr,r.z),o}static isFrontFacing(t,e,n,s){return ln.subVectors(n,e),Tn.subVectors(t,e),ln.cross(Tn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ln.subVectors(this.c,this.b),Tn.subVectors(this.a,this.b),ln.cross(Tn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return en.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return en.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return en.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return en.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return en.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Ti.subVectors(s,n),Ai.subVectors(r,n),Wr.subVectors(t,n);const l=Ti.dot(Wr),c=Ai.dot(Wr);if(l<=0&&c<=0)return e.copy(n);Xr.subVectors(t,s);const h=Ti.dot(Xr),u=Ai.dot(Xr);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Ti,o);qr.subVectors(t,r);const p=Ti.dot(qr),g=Ai.dot(qr);if(g>=0&&p<=g)return e.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Ai,a);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return hl.subVectors(r,s),a=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(hl,a);const d=1/(m+_+f);return o=_*d,a=f*d,e.copy(n).addScaledVector(Ti,o).addScaledVector(Ai,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const th={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gn={h:0,s:0,l:0},zs={h:0,s:0,l:0};function Zr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class gt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=He){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Jt.workingColorSpace){if(t=Ru(t,1),e=Ee(e,0,1),n=Ee(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Zr(o,r,t+1/3),this.g=Zr(o,r,t),this.b=Zr(o,r,t-1/3)}return Jt.toWorkingColorSpace(this,s),this}setStyle(t,e=He){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=He){const n=th[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Nn(t.r),this.g=Nn(t.g),this.b=Nn(t.b),this}copyLinearToSRGB(t){return this.r=zi(t.r),this.g=zi(t.g),this.b=zi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=He){return Jt.fromWorkingColorSpace(Ce.copy(this),t),Math.round(Ee(Ce.r*255,0,255))*65536+Math.round(Ee(Ce.g*255,0,255))*256+Math.round(Ee(Ce.b*255,0,255))}getHexString(t=He){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.fromWorkingColorSpace(Ce.copy(this),e);const n=Ce.r,s=Ce.g,r=Ce.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.fromWorkingColorSpace(Ce.copy(this),e),t.r=Ce.r,t.g=Ce.g,t.b=Ce.b,t}getStyle(t=He){Jt.fromWorkingColorSpace(Ce.copy(this),t);const e=Ce.r,n=Ce.g,s=Ce.b;return t!==He?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Gn),this.setHSL(Gn.h+t,Gn.s+e,Gn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Gn),t.getHSL(zs);const n=Dr(Gn.h,zs.h,e),s=Dr(Gn.s,zs.s,e),r=Dr(Gn.l,zs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ce=new gt;gt.NAMES=th;let Xu=0;class $n extends Ki{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xu++}),this.uuid=Dn(),this.name="",this.blending=ci,this.side=Yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_o,this.blendDst=vo,this.blendEquation=ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new gt(0,0,0),this.blendAlpha=0,this.depthFunc=Hi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$a,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vi,this.stencilZFail=vi,this.stencilZPass=vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ci&&(n.blending=this.blending),this.side!==Yn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==_o&&(n.blendSrc=this.blendSrc),this.blendDst!==vo&&(n.blendDst=this.blendDst),this.blendEquation!==ri&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Hi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$a&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Kt extends $n{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.combine=Ic,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new D,Hs=new ht;class Oe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ea,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Hs.fromBufferAttribute(this,e),Hs.applyMatrix3(t),this.setXY(e,Hs.x,Hs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=dn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=dn(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=dn(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=dn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=dn(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ea&&(t.usage=this.usage),t}}class eh extends Oe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class nh extends Oe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ce extends Oe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let qu=0;const Ke=new ne,Jr=new de,Ri=new D,Xe=new pi,ss=new pi,Se=new D;class ye extends Ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qu++}),this.uuid=Dn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Zc(t)?nh:eh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Xt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ke.makeRotationFromQuaternion(t),this.applyMatrix4(Ke),this}rotateX(t){return Ke.makeRotationX(t),this.applyMatrix4(Ke),this}rotateY(t){return Ke.makeRotationY(t),this.applyMatrix4(Ke),this}rotateZ(t){return Ke.makeRotationZ(t),this.applyMatrix4(Ke),this}translate(t,e,n){return Ke.makeTranslation(t,e,n),this.applyMatrix4(Ke),this}scale(t,e,n){return Ke.makeScale(t,e,n),this.applyMatrix4(Ke),this}lookAt(t){return Jr.lookAt(t),Jr.updateMatrix(),this.applyMatrix4(Jr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ce(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new pi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Xe.setFromBufferAttribute(r),this.morphTargetsRelative?(Se.addVectors(this.boundingBox.min,Xe.min),this.boundingBox.expandByPoint(Se),Se.addVectors(this.boundingBox.max,Xe.max),this.boundingBox.expandByPoint(Se)):(this.boundingBox.expandByPoint(Xe.min),this.boundingBox.expandByPoint(Xe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(Xe.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];ss.setFromBufferAttribute(a),this.morphTargetsRelative?(Se.addVectors(Xe.min,ss.min),Xe.expandByPoint(Se),Se.addVectors(Xe.max,ss.max),Xe.expandByPoint(Se)):(Xe.expandByPoint(ss.min),Xe.expandByPoint(ss.max))}Xe.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Se.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Se));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Se.fromBufferAttribute(a,c),l&&(Ri.fromBufferAttribute(t,c),Se.add(Ri)),s=Math.max(s,n.distanceToSquared(Se))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Oe(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<n.count;L++)a[L]=new D,l[L]=new D;const c=new D,h=new D,u=new D,f=new ht,p=new ht,g=new ht,_=new D,m=new D;function d(L,y,v){c.fromBufferAttribute(n,L),h.fromBufferAttribute(n,y),u.fromBufferAttribute(n,v),f.fromBufferAttribute(r,L),p.fromBufferAttribute(r,y),g.fromBufferAttribute(r,v),h.sub(c),u.sub(c),p.sub(f),g.sub(f);const R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(R),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(R),a[L].add(_),a[y].add(_),a[v].add(_),l[L].add(m),l[y].add(m),l[v].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let L=0,y=E.length;L<y;++L){const v=E[L],R=v.start,N=v.count;for(let U=R,O=R+N;U<O;U+=3)d(t.getX(U+0),t.getX(U+1),t.getX(U+2))}const S=new D,x=new D,F=new D,C=new D;function A(L){F.fromBufferAttribute(s,L),C.copy(F);const y=a[L];S.copy(y),S.sub(F.multiplyScalar(F.dot(y))).normalize(),x.crossVectors(C,y);const R=x.dot(l[L])<0?-1:1;o.setXYZW(L,S.x,S.y,S.z,R)}for(let L=0,y=E.length;L<y;++L){const v=E[L],R=v.start,N=v.count;for(let U=R,O=R+N;U<O;U+=3)A(t.getX(U+0)),A(t.getX(U+1)),A(t.getX(U+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Oe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const s=new D,r=new D,o=new D,a=new D,l=new D,c=new D,h=new D,u=new D;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Se.fromBufferAttribute(t,e),Se.normalize(),t.setXYZ(e,Se.x,Se.y,Se.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*h;for(let d=0;d<h;d++)f[g++]=c[p++]}return new Oe(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ye,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],p=t(f,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ul=new ne,jn=new Sa,Gs=new mi,fl=new D,Vs=new D,Ws=new D,Xs=new D,jr=new D,qs=new D,dl=new D,Ys=new D;class kt extends de{constructor(t=new ye,e=new Kt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){qs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(jr.fromBufferAttribute(u,t),o?qs.addScaledVector(jr,h):qs.addScaledVector(jr.sub(e),h))}e.add(qs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Gs.copy(n.boundingSphere),Gs.applyMatrix4(r),jn.copy(t.ray).recast(t.near),!(Gs.containsPoint(jn.origin)===!1&&(jn.intersectSphere(Gs,fl)===null||jn.origin.distanceToSquared(fl)>(t.far-t.near)**2))&&(ul.copy(r).invert(),jn.copy(t.ray).applyMatrix4(ul),!(n.boundingBox!==null&&jn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,jn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],E=Math.max(m.start,p.start),S=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let x=E,F=S;x<F;x+=3){const C=a.getX(x),A=a.getX(x+1),L=a.getX(x+2);s=$s(this,d,t,n,c,h,u,C,A,L),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const E=a.getX(m),S=a.getX(m+1),x=a.getX(m+2);s=$s(this,o,t,n,c,h,u,E,S,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],E=Math.max(m.start,p.start),S=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=E,F=S;x<F;x+=3){const C=x,A=x+1,L=x+2;s=$s(this,d,t,n,c,h,u,C,A,L),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const E=m,S=m+1,x=m+2;s=$s(this,o,t,n,c,h,u,E,S,x),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Yu(i,t,e,n,s,r,o,a){let l;if(t.side===Le?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Yn,a),l===null)return null;Ys.copy(a),Ys.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ys);return c<e.near||c>e.far?null:{distance:c,point:Ys.clone(),object:i}}function $s(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Vs),i.getVertexPosition(l,Ws),i.getVertexPosition(c,Xs);const h=Yu(i,t,e,n,Vs,Ws,Xs,dl);if(h){const u=new D;en.getBarycoord(dl,Vs,Ws,Xs,u),s&&(h.uv=en.getInterpolatedAttribute(s,a,l,c,u,new ht)),r&&(h.uv1=en.getInterpolatedAttribute(r,a,l,c,u,new ht)),o&&(h.normal=en.getInterpolatedAttribute(o,a,l,c,u,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new D,materialIndex:0};en.getNormal(Vs,Ws,Xs,f.normal),h.face=f,h.barycoord=u}return h}class fe extends ye{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,p=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ce(c,3)),this.setAttribute("normal",new ce(h,3)),this.setAttribute("uv",new ce(u,2));function g(_,m,d,E,S,x,F,C,A,L,y){const v=x/A,R=F/L,N=x/2,U=F/2,O=C/2,X=A+1,W=L+1;let H=0,B=0;const Q=new D;for(let pt=0;pt<W;pt++){const ft=pt*R-U;for(let dt=0;dt<X;dt++){const St=dt*v-N;Q[_]=St*E,Q[m]=ft*S,Q[d]=O,c.push(Q.x,Q.y,Q.z),Q[_]=0,Q[m]=0,Q[d]=C>0?1:-1,h.push(Q.x,Q.y,Q.z),u.push(dt/A),u.push(1-pt/L),H+=1}}for(let pt=0;pt<L;pt++)for(let ft=0;ft<A;ft++){const dt=f+ft+X*pt,St=f+ft+X*(pt+1),z=f+(ft+1)+X*(pt+1),I=f+(ft+1)+X*pt;l.push(dt,St,I),l.push(St,z,I),B+=6}a.addGroup(p,B,y),p+=B,f+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function qi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ne(i){const t={};for(let e=0;e<i.length;e++){const n=qi(i[e]);for(const s in n)t[s]=n[s]}return t}function $u(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ih(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const ys={clone:qi,merge:Ne};var Ku=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pe extends $n{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ku,this.fragmentShader=Zu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=qi(t.uniforms),this.uniformsGroups=$u(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class sh extends de{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=Ln}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Vn=new D,pl=new ht,ml=new ht;class Ge extends sh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=xr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ir*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return xr*2*Math.atan(Math.tan(Ir*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z),Vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z)}getViewSize(t,e){return this.getViewBounds(t,pl,ml),e.subVectors(ml,pl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ir*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ci=-90,Pi=1;class Ju extends de{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ge(Ci,Pi,t,e);s.layers=this.layers,this.add(s);const r=new Ge(Ci,Pi,t,e);r.layers=this.layers,this.add(r);const o=new Ge(Ci,Pi,t,e);o.layers=this.layers,this.add(o);const a=new Ge(Ci,Pi,t,e);a.layers=this.layers,this.add(a);const l=new Ge(Ci,Pi,t,e);l.layers=this.layers,this.add(l);const c=new Ge(Ci,Pi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Ln)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===vr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class rh extends Ie{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Gi,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ju extends nn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new rh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:gn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new fe(5,5,5),r=new Pe({name:"CubemapFromEquirect",uniforms:qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Le,blending:In});r.uniforms.tEquirect.value=e;const o=new kt(s,r),a=e.minFilter;return e.minFilter===li&&(e.minFilter=gn),new Ju(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Qr=new D,Qu=new D,tf=new Xt;class ii{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Qr.subVectors(n,e).cross(Qu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Qr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||tf.getNormalMatrix(t),s=this.coplanarPoint(Qr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qn=new mi,Ks=new D;class ba{constructor(t=new ii,e=new ii,n=new ii,s=new ii,r=new ii,o=new ii){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ln){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],p=s[8],g=s[9],_=s[10],m=s[11],d=s[12],E=s[13],S=s[14],x=s[15];if(n[0].setComponents(l-r,f-c,m-p,x-d).normalize(),n[1].setComponents(l+r,f+c,m+p,x+d).normalize(),n[2].setComponents(l+o,f+h,m+g,x+E).normalize(),n[3].setComponents(l-o,f-h,m-g,x-E).normalize(),n[4].setComponents(l-a,f-u,m-_,x-S).normalize(),e===Ln)n[5].setComponents(l+a,f+u,m+_,x+S).normalize();else if(e===vr)n[5].setComponents(a,u,_,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Qn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Qn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Qn)}intersectsSprite(t){return Qn.center.set(0,0,0),Qn.radius=.7071067811865476,Qn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Qn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Ks.x=s.normal.x>0?t.max.x:t.min.x,Ks.y=s.normal.y>0?t.max.y:t.min.y,Ks.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ks)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function oh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function ef(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){const g=u[f],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){const _=u[p];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class qe extends ye{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,f=e/l,p=[],g=[],_=[],m=[];for(let d=0;d<h;d++){const E=d*f-o;for(let S=0;S<c;S++){const x=S*u-r;g.push(x,-E,0),_.push(0,0,1),m.push(S/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let E=0;E<a;E++){const S=E+c*d,x=E+c*(d+1),F=E+1+c*(d+1),C=E+1+c*d;p.push(S,x,C),p.push(x,F,C)}this.setIndex(p),this.setAttribute("position",new ce(g,3)),this.setAttribute("normal",new ce(_,3)),this.setAttribute("uv",new ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qe(t.width,t.height,t.widthSegments,t.heightSegments)}}var nf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sf=`#ifdef USE_ALPHAHASH
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
#endif`,rf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,of=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,af=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,lf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cf=`#ifdef USE_AOMAP
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
#endif`,hf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uf=`#ifdef USE_BATCHING
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
#endif`,ff=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,df=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,gf=`#ifdef USE_IRIDESCENCE
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
#endif`,_f=`#ifdef USE_BUMPMAP
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
#endif`,vf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,xf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Mf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Sf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,bf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ef=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,wf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Tf=`#define PI 3.141592653589793
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
} // validated`,Af=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Rf=`vec3 transformedNormal = objectNormal;
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
#endif`,Cf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Pf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,If=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Df="gl_FragColor = linearToOutputTexel( gl_FragColor );",Nf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Uf=`#ifdef USE_ENVMAP
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
#endif`,Ff=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Of=`#ifdef USE_ENVMAP
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
#endif`,Bf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kf=`#ifdef USE_ENVMAP
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
#endif`,zf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Gf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wf=`#ifdef USE_GRADIENTMAP
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
}`,Xf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$f=`uniform bool receiveShadow;
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
#endif`,Kf=`#ifdef USE_ENVMAP
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
#endif`,Zf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,td=`PhysicalMaterial material;
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
#endif`,ed=`struct PhysicalMaterial {
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
}`,nd=`
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
#endif`,id=`#if defined( RE_IndirectDiffuse )
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
#endif`,sd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,od=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ad=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ld=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ud=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,fd=`#if defined( USE_POINTS_UV )
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
#endif`,dd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,md=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_d=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vd=`#ifdef USE_MORPHTARGETS
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
#endif`,xd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Md=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,yd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Sd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ed=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wd=`#ifdef USE_NORMALMAP
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
#endif`,Td=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ad=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Pd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ld=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Id=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ud=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Od=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hd=`float getShadowMask() {
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
}`,Gd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vd=`#ifdef USE_SKINNING
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
#endif`,Wd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xd=`#ifdef USE_SKINNING
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
#endif`,qd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$d=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Kd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zd=`#ifdef USE_TRANSMISSION
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
#endif`,Jd=`#ifdef USE_TRANSMISSION
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
#endif`,jd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ep=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const np=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ip=`uniform sampler2D t2D;
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
}`,sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ap=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lp=`#include <common>
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
}`,cp=`#if DEPTH_PACKING == 3200
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
}`,hp=`#define DISTANCE
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
}`,up=`#define DISTANCE
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
}`,fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pp=`uniform float scale;
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
}`,mp=`uniform vec3 diffuse;
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
}`,gp=`#include <common>
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
}`,_p=`uniform vec3 diffuse;
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
}`,vp=`#define LAMBERT
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
}`,xp=`#define LAMBERT
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
}`,Mp=`#define MATCAP
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
}`,yp=`#define MATCAP
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
}`,Sp=`#define NORMAL
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
}`,bp=`#define NORMAL
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
}`,Ep=`#define PHONG
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
}`,wp=`#define PHONG
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
}`,Tp=`#define STANDARD
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
}`,Ap=`#define STANDARD
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
}`,Rp=`#define TOON
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
}`,Cp=`#define TOON
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
}`,Pp=`uniform float size;
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
}`,Lp=`uniform vec3 diffuse;
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
}`,Ip=`#include <common>
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
}`,Dp=`uniform vec3 color;
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
}`,Np=`uniform float rotation;
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
}`,Up=`uniform vec3 diffuse;
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
}`,Yt={alphahash_fragment:nf,alphahash_pars_fragment:sf,alphamap_fragment:rf,alphamap_pars_fragment:of,alphatest_fragment:af,alphatest_pars_fragment:lf,aomap_fragment:cf,aomap_pars_fragment:hf,batching_pars_vertex:uf,batching_vertex:ff,begin_vertex:df,beginnormal_vertex:pf,bsdfs:mf,iridescence_fragment:gf,bumpmap_pars_fragment:_f,clipping_planes_fragment:vf,clipping_planes_pars_fragment:xf,clipping_planes_pars_vertex:Mf,clipping_planes_vertex:yf,color_fragment:Sf,color_pars_fragment:bf,color_pars_vertex:Ef,color_vertex:wf,common:Tf,cube_uv_reflection_fragment:Af,defaultnormal_vertex:Rf,displacementmap_pars_vertex:Cf,displacementmap_vertex:Pf,emissivemap_fragment:Lf,emissivemap_pars_fragment:If,colorspace_fragment:Df,colorspace_pars_fragment:Nf,envmap_fragment:Uf,envmap_common_pars_fragment:Ff,envmap_pars_fragment:Of,envmap_pars_vertex:Bf,envmap_physical_pars_fragment:Kf,envmap_vertex:kf,fog_vertex:zf,fog_pars_vertex:Hf,fog_fragment:Gf,fog_pars_fragment:Vf,gradientmap_pars_fragment:Wf,lightmap_pars_fragment:Xf,lights_lambert_fragment:qf,lights_lambert_pars_fragment:Yf,lights_pars_begin:$f,lights_toon_fragment:Zf,lights_toon_pars_fragment:Jf,lights_phong_fragment:jf,lights_phong_pars_fragment:Qf,lights_physical_fragment:td,lights_physical_pars_fragment:ed,lights_fragment_begin:nd,lights_fragment_maps:id,lights_fragment_end:sd,logdepthbuf_fragment:rd,logdepthbuf_pars_fragment:od,logdepthbuf_pars_vertex:ad,logdepthbuf_vertex:ld,map_fragment:cd,map_pars_fragment:hd,map_particle_fragment:ud,map_particle_pars_fragment:fd,metalnessmap_fragment:dd,metalnessmap_pars_fragment:pd,morphinstance_vertex:md,morphcolor_vertex:gd,morphnormal_vertex:_d,morphtarget_pars_vertex:vd,morphtarget_vertex:xd,normal_fragment_begin:Md,normal_fragment_maps:yd,normal_pars_fragment:Sd,normal_pars_vertex:bd,normal_vertex:Ed,normalmap_pars_fragment:wd,clearcoat_normal_fragment_begin:Td,clearcoat_normal_fragment_maps:Ad,clearcoat_pars_fragment:Rd,iridescence_pars_fragment:Cd,opaque_fragment:Pd,packing:Ld,premultiplied_alpha_fragment:Id,project_vertex:Dd,dithering_fragment:Nd,dithering_pars_fragment:Ud,roughnessmap_fragment:Fd,roughnessmap_pars_fragment:Od,shadowmap_pars_fragment:Bd,shadowmap_pars_vertex:kd,shadowmap_vertex:zd,shadowmask_pars_fragment:Hd,skinbase_vertex:Gd,skinning_pars_vertex:Vd,skinning_vertex:Wd,skinnormal_vertex:Xd,specularmap_fragment:qd,specularmap_pars_fragment:Yd,tonemapping_fragment:$d,tonemapping_pars_fragment:Kd,transmission_fragment:Zd,transmission_pars_fragment:Jd,uv_pars_fragment:jd,uv_pars_vertex:Qd,uv_vertex:tp,worldpos_vertex:ep,background_vert:np,background_frag:ip,backgroundCube_vert:sp,backgroundCube_frag:rp,cube_vert:op,cube_frag:ap,depth_vert:lp,depth_frag:cp,distanceRGBA_vert:hp,distanceRGBA_frag:up,equirect_vert:fp,equirect_frag:dp,linedashed_vert:pp,linedashed_frag:mp,meshbasic_vert:gp,meshbasic_frag:_p,meshlambert_vert:vp,meshlambert_frag:xp,meshmatcap_vert:Mp,meshmatcap_frag:yp,meshnormal_vert:Sp,meshnormal_frag:bp,meshphong_vert:Ep,meshphong_frag:wp,meshphysical_vert:Tp,meshphysical_frag:Ap,meshtoon_vert:Rp,meshtoon_frag:Cp,points_vert:Pp,points_frag:Lp,shadow_vert:Ip,shadow_frag:Dp,sprite_vert:Np,sprite_frag:Up},Et={common:{diffuse:{value:new gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new gt(16777215)},opacity:{value:1},center:{value:new ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},fn={basic:{uniforms:Ne([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:Ne([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new gt(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:Ne([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new gt(0)},specular:{value:new gt(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:Ne([Et.common,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.roughnessmap,Et.metalnessmap,Et.fog,Et.lights,{emissive:{value:new gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:Ne([Et.common,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.gradientmap,Et.fog,Et.lights,{emissive:{value:new gt(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:Ne([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:Ne([Et.points,Et.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:Ne([Et.common,Et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:Ne([Et.common,Et.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:Ne([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:Ne([Et.sprite,Et.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:Ne([Et.common,Et.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:Ne([Et.lights,Et.fog,{color:{value:new gt(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};fn.physical={uniforms:Ne([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new gt(0)},specularColor:{value:new gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};const Zs={r:0,b:0,g:0},ti=new xn,Fp=new ne;function Op(i,t,e,n,s,r,o){const a=new gt(0);let l=r===!0?0:1,c,h,u=null,f=0,p=null;function g(E){let S=E.isScene===!0?E.background:null;return S&&S.isTexture&&(S=(E.backgroundBlurriness>0?e:t).get(S)),S}function _(E){let S=!1;const x=g(E);x===null?d(a,l):x&&x.isColor&&(d(x,1),S=!0);const F=i.xr.getEnvironmentBlendMode();F==="additive"?n.buffers.color.setClear(0,0,0,1,o):F==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,S){const x=g(S);x&&(x.isCubeTexture||x.mapping===Er)?(h===void 0&&(h=new kt(new fe(1,1,1),new Pe({name:"BackgroundCubeMaterial",uniforms:qi(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:Le,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(F,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ti.copy(S.backgroundRotation),ti.x*=-1,ti.y*=-1,ti.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ti.y*=-1,ti.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Fp.makeRotationFromEuler(ti)),h.material.toneMapped=Jt.getTransfer(x.colorSpace)!==se,(u!==x||f!==x.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,p=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new kt(new qe(2,2),new Pe({name:"BackgroundMaterial",uniforms:qi(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=Jt.getTransfer(x.colorSpace)!==se,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,f=x.version,p=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function d(E,S){E.getRGB(Zs,ih(i)),n.buffers.color.setClear(Zs.r,Zs.g,Zs.b,S,o)}return{getClearColor:function(){return a},setClearColor:function(E,S=1){a.set(E),l=S,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,d(a,l)},render:_,addToRenderList:m}}function Bp(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(v,R,N,U,O){let X=!1;const W=u(U,N,R);r!==W&&(r=W,c(r.object)),X=p(v,U,N,O),X&&g(v,U,N,O),O!==null&&t.update(O,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,x(v,R,N,U),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function l(){return i.createVertexArray()}function c(v){return i.bindVertexArray(v)}function h(v){return i.deleteVertexArray(v)}function u(v,R,N){const U=N.wireframe===!0;let O=n[v.id];O===void 0&&(O={},n[v.id]=O);let X=O[R.id];X===void 0&&(X={},O[R.id]=X);let W=X[U];return W===void 0&&(W=f(l()),X[U]=W),W}function f(v){const R=[],N=[],U=[];for(let O=0;O<e;O++)R[O]=0,N[O]=0,U[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:N,attributeDivisors:U,object:v,attributes:{},index:null}}function p(v,R,N,U){const O=r.attributes,X=R.attributes;let W=0;const H=N.getAttributes();for(const B in H)if(H[B].location>=0){const pt=O[B];let ft=X[B];if(ft===void 0&&(B==="instanceMatrix"&&v.instanceMatrix&&(ft=v.instanceMatrix),B==="instanceColor"&&v.instanceColor&&(ft=v.instanceColor)),pt===void 0||pt.attribute!==ft||ft&&pt.data!==ft.data)return!0;W++}return r.attributesNum!==W||r.index!==U}function g(v,R,N,U){const O={},X=R.attributes;let W=0;const H=N.getAttributes();for(const B in H)if(H[B].location>=0){let pt=X[B];pt===void 0&&(B==="instanceMatrix"&&v.instanceMatrix&&(pt=v.instanceMatrix),B==="instanceColor"&&v.instanceColor&&(pt=v.instanceColor));const ft={};ft.attribute=pt,pt&&pt.data&&(ft.data=pt.data),O[B]=ft,W++}r.attributes=O,r.attributesNum=W,r.index=U}function _(){const v=r.newAttributes;for(let R=0,N=v.length;R<N;R++)v[R]=0}function m(v){d(v,0)}function d(v,R){const N=r.newAttributes,U=r.enabledAttributes,O=r.attributeDivisors;N[v]=1,U[v]===0&&(i.enableVertexAttribArray(v),U[v]=1),O[v]!==R&&(i.vertexAttribDivisor(v,R),O[v]=R)}function E(){const v=r.newAttributes,R=r.enabledAttributes;for(let N=0,U=R.length;N<U;N++)R[N]!==v[N]&&(i.disableVertexAttribArray(N),R[N]=0)}function S(v,R,N,U,O,X,W){W===!0?i.vertexAttribIPointer(v,R,N,O,X):i.vertexAttribPointer(v,R,N,U,O,X)}function x(v,R,N,U){_();const O=U.attributes,X=N.getAttributes(),W=R.defaultAttributeValues;for(const H in X){const B=X[H];if(B.location>=0){let Q=O[H];if(Q===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(Q=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(Q=v.instanceColor)),Q!==void 0){const pt=Q.normalized,ft=Q.itemSize,dt=t.get(Q);if(dt===void 0)continue;const St=dt.buffer,z=dt.type,I=dt.bytesPerElement,rt=z===i.INT||z===i.UNSIGNED_INT||Q.gpuType===ma;if(Q.isInterleavedBufferAttribute){const Y=Q.data,ot=Y.stride,vt=Q.offset;if(Y.isInstancedInterleavedBuffer){for(let Lt=0;Lt<B.locationSize;Lt++)d(B.location+Lt,Y.meshPerAttribute);v.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let Lt=0;Lt<B.locationSize;Lt++)m(B.location+Lt);i.bindBuffer(i.ARRAY_BUFFER,St);for(let Lt=0;Lt<B.locationSize;Lt++)S(B.location+Lt,ft/B.locationSize,z,pt,ot*I,(vt+ft/B.locationSize*Lt)*I,rt)}else{if(Q.isInstancedBufferAttribute){for(let Y=0;Y<B.locationSize;Y++)d(B.location+Y,Q.meshPerAttribute);v.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let Y=0;Y<B.locationSize;Y++)m(B.location+Y);i.bindBuffer(i.ARRAY_BUFFER,St);for(let Y=0;Y<B.locationSize;Y++)S(B.location+Y,ft/B.locationSize,z,pt,ft*I,ft/B.locationSize*Y*I,rt)}}else if(W!==void 0){const pt=W[H];if(pt!==void 0)switch(pt.length){case 2:i.vertexAttrib2fv(B.location,pt);break;case 3:i.vertexAttrib3fv(B.location,pt);break;case 4:i.vertexAttrib4fv(B.location,pt);break;default:i.vertexAttrib1fv(B.location,pt)}}}}E()}function F(){L();for(const v in n){const R=n[v];for(const N in R){const U=R[N];for(const O in U)h(U[O].object),delete U[O];delete R[N]}delete n[v]}}function C(v){if(n[v.id]===void 0)return;const R=n[v.id];for(const N in R){const U=R[N];for(const O in U)h(U[O].object),delete U[O];delete R[N]}delete n[v.id]}function A(v){for(const R in n){const N=n[R];if(N[v.id]===void 0)continue;const U=N[v.id];for(const O in U)h(U[O].object),delete U[O];delete N[v.id]}}function L(){y(),o=!0,r!==s&&(r=s,c(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:y,dispose:F,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:E}}function kp(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function l(c,h,u,f){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function zp(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==hn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const L=A===vn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Un&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==_n&&!L)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),F=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:E,maxVaryings:S,maxFragmentUniforms:x,vertexTextures:F,maxSamples:C}}function Hp(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new ii,a=new Xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||n!==0||s;return s=f,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const E=r?0:n,S=E*4;let x=d.clippingState||null;l.value=x,x=h(g,f,S,p);for(let F=0;F!==S;++F)x[F]=e[F];d.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const d=p+_*4,E=f.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<d)&&(m=new Float32Array(d));for(let S=0,x=p;S!==_;++S,x+=4)o.copy(u[S]).applyMatrix4(E,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Gp(i){let t=new WeakMap;function e(o,a){return a===To?o.mapping=Gi:a===Ao&&(o.mapping=Vi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===To||a===Ao)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new ju(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Ea extends sh{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Oi=4,gl=[.125,.215,.35,.446,.526,.582],oi=20,to=new Ea,_l=new gt;let eo=null,no=0,io=0,so=!1;const si=(1+Math.sqrt(5))/2,Li=1/si,vl=[new D(-si,Li,0),new D(si,Li,0),new D(-Li,0,si),new D(Li,0,si),new D(0,si,-Li),new D(0,si,Li),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class ia{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){eo=this._renderer.getRenderTarget(),no=this._renderer.getActiveCubeFace(),io=this._renderer.getActiveMipmapLevel(),so=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ml(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(eo,no,io),this._renderer.xr.enabled=so,t.scissorTest=!1,Js(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Gi||t.mapping===Vi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),eo=this._renderer.getRenderTarget(),no=this._renderer.getActiveCubeFace(),io=this._renderer.getActiveMipmapLevel(),so=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:gn,minFilter:gn,generateMipmaps:!1,type:vn,format:hn,colorSpace:$i,depthBuffer:!1},s=xl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Vp(r)),this._blurMaterial=Wp(r,t,e)}return s}_compileMaterial(t){const e=new kt(this._lodPlanes[0],t);this._renderer.compile(e,to)}_sceneToCubeUV(t,e,n,s){const a=new Ge(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(_l),h.toneMapping=Xn,h.autoClear=!1;const p=new Kt({name:"PMREM.Background",side:Le,depthWrite:!1,depthTest:!1}),g=new kt(new fe,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(_l),_=!0);for(let d=0;d<6;d++){const E=d%3;E===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):E===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const S=this._cubeSize;Js(s,E*S,d>2?S:0,S,S),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Gi||t.mapping===Vi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ml());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new kt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Js(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,to)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=vl[(s-r-1)%vl.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new kt(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*oi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):oi;m>oi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${oi}`);const d=[];let E=0;for(let A=0;A<oi;++A){const L=A/_,y=Math.exp(-L*L/2);d.push(y),A===0?E+=y:A<m&&(E+=2*y)}for(let A=0;A<d.length;A++)d[A]=d[A]/E;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const x=this._sizeLods[s],F=3*x*(s>S-Oi?s-S+Oi:0),C=4*(this._cubeSize-x);Js(e,F,C,3*x,2*x),l.setRenderTarget(e),l.render(u,to)}}function Vp(i){const t=[],e=[],n=[];let s=i;const r=i-Oi+1+gl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-Oi?l=gl[o-i+Oi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,d=1,E=new Float32Array(_*g*p),S=new Float32Array(m*g*p),x=new Float32Array(d*g*p);for(let C=0;C<p;C++){const A=C%3*2/3-1,L=C>2?0:-1,y=[A,L,0,A+2/3,L,0,A+2/3,L+1,0,A,L,0,A+2/3,L+1,0,A,L+1,0];E.set(y,_*g*C),S.set(f,m*g*C);const v=[C,C,C,C,C,C];x.set(v,d*g*C)}const F=new ye;F.setAttribute("position",new Oe(E,_)),F.setAttribute("uv",new Oe(S,m)),F.setAttribute("faceIndex",new Oe(x,d)),t.push(F),s>Oi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function xl(i,t,e){const n=new nn(i,t,e);return n.texture.mapping=Er,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Js(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Wp(i,t,e){const n=new Float32Array(oi),s=new D(0,1,0);return new Pe({name:"SphericalGaussianBlur",defines:{n:oi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:wa(),fragmentShader:`

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
		`,blending:In,depthTest:!1,depthWrite:!1})}function Ml(){return new Pe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wa(),fragmentShader:`

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
		`,blending:In,depthTest:!1,depthWrite:!1})}function yl(){return new Pe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function wa(){return`

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
	`}function Xp(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===To||l===Ao,h=l===Gi||l===Vi;if(c||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new ia(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new ia(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function qp(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&ds("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Yp(i,t,e,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,d=_.length;m<d;m++)t.remove(_[m])}f.removeEventListener("dispose",o),delete s[f.id];const p=r.get(f);p&&(t.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,d=_.length;m<d;m++)t.update(_[m],i.ARRAY_BUFFER)}}function c(u){const f=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const E=p.array;_=p.version;for(let S=0,x=E.length;S<x;S+=3){const F=E[S+0],C=E[S+1],A=E[S+2];f.push(F,C,C,A,A,F)}}else if(g!==void 0){const E=g.array;_=g.version;for(let S=0,x=E.length/3-1;S<x;S+=3){const F=S+0,C=S+1,A=S+2;f.push(F,C,C,A,A,F)}}else return;const m=new(Zc(f)?nh:eh)(f,1);m.version=_;const d=r.get(u);d&&t.remove(d),r.set(u,m)}function h(u){const f=r.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function $p(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,p){i.drawElements(n,p,r,f*o),e.update(p,n,1)}function c(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,f*o,g),e.update(p,n,g))}function h(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,n,1)}function u(f,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,_,0,g);let d=0;for(let E=0;E<g;E++)d+=p[E]*_[E];e.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Kp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Zp(i,t,e){const n=new WeakMap,s=new oe;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let v=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",v)};var p=v;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let F=a.attributes.position.count*x,C=1;F>t.maxTextureSize&&(C=Math.ceil(F/t.maxTextureSize),F=t.maxTextureSize);const A=new Float32Array(F*C*4*u),L=new jc(A,F,C,u);L.type=_n,L.needsUpdate=!0;const y=x*4;for(let R=0;R<u;R++){const N=d[R],U=E[R],O=S[R],X=F*C*4*R;for(let W=0;W<N.count;W++){const H=W*y;g===!0&&(s.fromBufferAttribute(N,W),A[X+H+0]=s.x,A[X+H+1]=s.y,A[X+H+2]=s.z,A[X+H+3]=0),_===!0&&(s.fromBufferAttribute(U,W),A[X+H+4]=s.x,A[X+H+5]=s.y,A[X+H+6]=s.z,A[X+H+7]=0),m===!0&&(s.fromBufferAttribute(O,W),A[X+H+8]=s.x,A[X+H+9]=s.y,A[X+H+10]=s.z,A[X+H+11]=O.itemSize===4?s.w:1)}}f={count:u,texture:L,size:new ht(F,C)},n.set(a,f),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Jp(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class ah extends Ie{constructor(t,e,n,s,r,o,a,l,c,h=ki){if(h!==ki&&h!==Xi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ki&&(n=fi),n===void 0&&h===Xi&&(n=Wi),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Fe,this.minFilter=l!==void 0?l:Fe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const lh=new Ie,Sl=new ah(1,1),ch=new jc,hh=new Ou,uh=new rh,bl=[],El=[],wl=new Float32Array(16),Tl=new Float32Array(9),Al=new Float32Array(4);function Zi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=bl[s];if(r===void 0&&(r=new Float32Array(s),bl[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function xe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Me(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Tr(i,t){let e=El[t];e===void 0&&(e=new Int32Array(t),El[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function jp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Qp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2fv(this.addr,t),Me(e,t)}}function tm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(xe(e,t))return;i.uniform3fv(this.addr,t),Me(e,t)}}function em(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4fv(this.addr,t),Me(e,t)}}function nm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Me(e,t)}else{if(xe(e,n))return;Al.set(n),i.uniformMatrix2fv(this.addr,!1,Al),Me(e,n)}}function im(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Me(e,t)}else{if(xe(e,n))return;Tl.set(n),i.uniformMatrix3fv(this.addr,!1,Tl),Me(e,n)}}function sm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(xe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Me(e,t)}else{if(xe(e,n))return;wl.set(n),i.uniformMatrix4fv(this.addr,!1,wl),Me(e,n)}}function rm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function om(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2iv(this.addr,t),Me(e,t)}}function am(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;i.uniform3iv(this.addr,t),Me(e,t)}}function lm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4iv(this.addr,t),Me(e,t)}}function cm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function hm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(xe(e,t))return;i.uniform2uiv(this.addr,t),Me(e,t)}}function um(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(xe(e,t))return;i.uniform3uiv(this.addr,t),Me(e,t)}}function fm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(xe(e,t))return;i.uniform4uiv(this.addr,t),Me(e,t)}}function dm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Sl.compareFunction=Kc,r=Sl):r=lh,e.setTexture2D(t||r,s)}function pm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||hh,s)}function mm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||uh,s)}function gm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||ch,s)}function _m(i){switch(i){case 5126:return jp;case 35664:return Qp;case 35665:return tm;case 35666:return em;case 35674:return nm;case 35675:return im;case 35676:return sm;case 5124:case 35670:return rm;case 35667:case 35671:return om;case 35668:case 35672:return am;case 35669:case 35673:return lm;case 5125:return cm;case 36294:return hm;case 36295:return um;case 36296:return fm;case 35678:case 36198:case 36298:case 36306:case 35682:return dm;case 35679:case 36299:case 36307:return pm;case 35680:case 36300:case 36308:case 36293:return mm;case 36289:case 36303:case 36311:case 36292:return gm}}function vm(i,t){i.uniform1fv(this.addr,t)}function xm(i,t){const e=Zi(t,this.size,2);i.uniform2fv(this.addr,e)}function Mm(i,t){const e=Zi(t,this.size,3);i.uniform3fv(this.addr,e)}function ym(i,t){const e=Zi(t,this.size,4);i.uniform4fv(this.addr,e)}function Sm(i,t){const e=Zi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function bm(i,t){const e=Zi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Em(i,t){const e=Zi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function wm(i,t){i.uniform1iv(this.addr,t)}function Tm(i,t){i.uniform2iv(this.addr,t)}function Am(i,t){i.uniform3iv(this.addr,t)}function Rm(i,t){i.uniform4iv(this.addr,t)}function Cm(i,t){i.uniform1uiv(this.addr,t)}function Pm(i,t){i.uniform2uiv(this.addr,t)}function Lm(i,t){i.uniform3uiv(this.addr,t)}function Im(i,t){i.uniform4uiv(this.addr,t)}function Dm(i,t,e){const n=this.cache,s=t.length,r=Tr(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||lh,r[o])}function Nm(i,t,e){const n=this.cache,s=t.length,r=Tr(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||hh,r[o])}function Um(i,t,e){const n=this.cache,s=t.length,r=Tr(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||uh,r[o])}function Fm(i,t,e){const n=this.cache,s=t.length,r=Tr(e,s);xe(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||ch,r[o])}function Om(i){switch(i){case 5126:return vm;case 35664:return xm;case 35665:return Mm;case 35666:return ym;case 35674:return Sm;case 35675:return bm;case 35676:return Em;case 5124:case 35670:return wm;case 35667:case 35671:return Tm;case 35668:case 35672:return Am;case 35669:case 35673:return Rm;case 5125:return Cm;case 36294:return Pm;case 36295:return Lm;case 36296:return Im;case 35678:case 36198:case 36298:case 36306:case 35682:return Dm;case 35679:case 36299:case 36307:return Nm;case 35680:case 36300:case 36308:case 36293:return Um;case 36289:case 36303:case 36311:case 36292:return Fm}}class Bm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=_m(e.type)}}class km{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Om(e.type)}}class zm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const ro=/(\w+)(\])?(\[|\.)?/g;function Rl(i,t){i.seq.push(t),i.map[t.id]=t}function Hm(i,t,e){const n=i.name,s=n.length;for(ro.lastIndex=0;;){const r=ro.exec(n),o=ro.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Rl(e,c===void 0?new Bm(a,i,t):new km(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new zm(a),Rl(e,u)),e=u}}}class _r{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Hm(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Cl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Gm=37297;let Vm=0;function Wm(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Pl=new Xt;function Xm(i){Jt._getMatrix(Pl,Jt.workingColorSpace,i);const t=`mat3( ${Pl.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(i)){case wr:return[t,"LinearTransferOETF"];case se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Ll(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Wm(i.getShaderSource(t),o)}else return s}function qm(i,t){const e=Xm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Ym(i,t){let e;switch(t){case Dc:e="Linear";break;case Nc:e="Reinhard";break;case Uc:e="Cineon";break;case pa:e="ACESFilmic";break;case Fc:e="AgX";break;case Oc:e="Neutral";break;case gu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const js=new D;function $m(){Jt.getLuminanceCoefficients(js);const i=js.x.toFixed(4),t=js.y.toFixed(4),e=js.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Km(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ps).join(`
`)}function Zm(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Jm(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ps(i){return i!==""}function Il(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Dl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const jm=/^[ \t]*#include +<([\w\d./]+)>/gm;function sa(i){return i.replace(jm,t0)}const Qm=new Map;function t0(i,t){let e=Yt[t];if(e===void 0){const n=Qm.get(t);if(n!==void 0)e=Yt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return sa(e)}const e0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nl(i){return i.replace(e0,n0)}function n0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ul(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function i0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===da?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Lc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Rn&&(t="SHADOWMAP_TYPE_VSM"),t}function s0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Gi:case Vi:t="ENVMAP_TYPE_CUBE";break;case Er:t="ENVMAP_TYPE_CUBE_UV";break}return t}function r0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Vi:t="ENVMAP_MODE_REFRACTION";break}return t}function o0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ic:t="ENVMAP_BLENDING_MULTIPLY";break;case pu:t="ENVMAP_BLENDING_MIX";break;case mu:t="ENVMAP_BLENDING_ADD";break}return t}function a0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function l0(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=i0(e),c=s0(e),h=r0(e),u=o0(e),f=a0(e),p=Km(e),g=Zm(r),_=s.createProgram();let m,d,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ps).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ps).join(`
`),d.length>0&&(d+=`
`)):(m=[Ul(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ps).join(`
`),d=[Ul(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Xn?"#define TONE_MAPPING":"",e.toneMapping!==Xn?Yt.tonemapping_pars_fragment:"",e.toneMapping!==Xn?Ym("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,qm("linearToOutputTexel",e.outputColorSpace),$m(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ps).join(`
`)),o=sa(o),o=Il(o,e),o=Dl(o,e),a=sa(a),a=Il(a,e),a=Dl(a,e),o=Nl(o),a=Nl(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===Ka?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ka?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const S=E+m+o,x=E+d+a,F=Cl(s,s.VERTEX_SHADER,S),C=Cl(s,s.FRAGMENT_SHADER,x);s.attachShader(_,F),s.attachShader(_,C),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(R){if(i.debug.checkShaderErrors){const N=s.getProgramInfoLog(_).trim(),U=s.getShaderInfoLog(F).trim(),O=s.getShaderInfoLog(C).trim();let X=!0,W=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,F,C);else{const H=Ll(s,F,"vertex"),B=Ll(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+N+`
`+H+`
`+B)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(U===""||O==="")&&(W=!1);W&&(R.diagnostics={runnable:X,programLog:N,vertexShader:{log:U,prefix:m},fragmentShader:{log:O,prefix:d}})}s.deleteShader(F),s.deleteShader(C),L=new _r(s,_),y=Jm(s,_)}let L;this.getUniforms=function(){return L===void 0&&A(this),L};let y;this.getAttributes=function(){return y===void 0&&A(this),y};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(_,Gm)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Vm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=F,this.fragmentShader=C,this}let c0=0;class h0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new u0(t),e.set(t,n)),n}}class u0{constructor(t){this.id=c0++,this.code=t,this.usedTimes=0}}function f0(i,t,e,n,s,r,o){const a=new Qc,l=new h0,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,v,R,N,U){const O=N.fog,X=U.geometry,W=y.isMeshStandardMaterial?N.environment:null,H=(y.isMeshStandardMaterial?e:t).get(y.envMap||W),B=H&&H.mapping===Er?H.image.height:null,Q=g[y.type];y.precision!==null&&(p=s.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const pt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ft=pt!==void 0?pt.length:0;let dt=0;X.morphAttributes.position!==void 0&&(dt=1),X.morphAttributes.normal!==void 0&&(dt=2),X.morphAttributes.color!==void 0&&(dt=3);let St,z,I,rt;if(Q){const ie=fn[Q];St=ie.vertexShader,z=ie.fragmentShader}else St=y.vertexShader,z=y.fragmentShader,l.update(y),I=l.getVertexShaderID(y),rt=l.getFragmentShaderID(y);const Y=i.getRenderTarget(),ot=i.state.buffers.depth.getReversed(),vt=U.isInstancedMesh===!0,Lt=U.isBatchedMesh===!0,zt=!!y.map,Z=!!y.matcap,J=!!H,T=!!y.aoMap,mt=!!y.lightMap,j=!!y.bumpMap,at=!!y.normalMap,lt=!!y.displacementMap,yt=!!y.emissiveMap,ut=!!y.metalnessMap,w=!!y.roughnessMap,M=y.anisotropy>0,q=y.clearcoat>0,it=y.dispersion>0,nt=y.iridescence>0,et=y.sheen>0,Rt=y.transmission>0,Mt=M&&!!y.anisotropyMap,Ct=q&&!!y.clearcoatMap,$t=q&&!!y.clearcoatNormalMap,_t=q&&!!y.clearcoatRoughnessMap,It=nt&&!!y.iridescenceMap,Bt=nt&&!!y.iridescenceThicknessMap,Ht=et&&!!y.sheenColorMap,Dt=et&&!!y.sheenRoughnessMap,Zt=!!y.specularMap,qt=!!y.specularColorMap,ae=!!y.specularIntensityMap,k=Rt&&!!y.transmissionMap,wt=Rt&&!!y.thicknessMap,tt=!!y.gradientMap,ct=!!y.alphaMap,Pt=y.alphaTest>0,Tt=!!y.alphaHash,Vt=!!y.extensions;let ge=Xn;y.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(ge=i.toneMapping);const Ae={shaderID:Q,shaderType:y.type,shaderName:y.name,vertexShader:St,fragmentShader:z,defines:y.defines,customVertexShaderID:I,customFragmentShaderID:rt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Lt,batchingColor:Lt&&U._colorsTexture!==null,instancing:vt,instancingColor:vt&&U.instanceColor!==null,instancingMorph:vt&&U.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Y===null?i.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:$i,alphaToCoverage:!!y.alphaToCoverage,map:zt,matcap:Z,envMap:J,envMapMode:J&&H.mapping,envMapCubeUVHeight:B,aoMap:T,lightMap:mt,bumpMap:j,normalMap:at,displacementMap:f&&lt,emissiveMap:yt,normalMapObjectSpace:at&&y.normalMapType===Mu,normalMapTangentSpace:at&&y.normalMapType===$c,metalnessMap:ut,roughnessMap:w,anisotropy:M,anisotropyMap:Mt,clearcoat:q,clearcoatMap:Ct,clearcoatNormalMap:$t,clearcoatRoughnessMap:_t,dispersion:it,iridescence:nt,iridescenceMap:It,iridescenceThicknessMap:Bt,sheen:et,sheenColorMap:Ht,sheenRoughnessMap:Dt,specularMap:Zt,specularColorMap:qt,specularIntensityMap:ae,transmission:Rt,transmissionMap:k,thicknessMap:wt,gradientMap:tt,opaque:y.transparent===!1&&y.blending===ci&&y.alphaToCoverage===!1,alphaMap:ct,alphaTest:Pt,alphaHash:Tt,combine:y.combine,mapUv:zt&&_(y.map.channel),aoMapUv:T&&_(y.aoMap.channel),lightMapUv:mt&&_(y.lightMap.channel),bumpMapUv:j&&_(y.bumpMap.channel),normalMapUv:at&&_(y.normalMap.channel),displacementMapUv:lt&&_(y.displacementMap.channel),emissiveMapUv:yt&&_(y.emissiveMap.channel),metalnessMapUv:ut&&_(y.metalnessMap.channel),roughnessMapUv:w&&_(y.roughnessMap.channel),anisotropyMapUv:Mt&&_(y.anisotropyMap.channel),clearcoatMapUv:Ct&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:$t&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:It&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Bt&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ht&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Dt&&_(y.sheenRoughnessMap.channel),specularMapUv:Zt&&_(y.specularMap.channel),specularColorMapUv:qt&&_(y.specularColorMap.channel),specularIntensityMapUv:ae&&_(y.specularIntensityMap.channel),transmissionMapUv:k&&_(y.transmissionMap.channel),thicknessMapUv:wt&&_(y.thicknessMap.channel),alphaMapUv:ct&&_(y.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(at||M),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!X.attributes.uv&&(zt||ct),fog:!!O,useFog:y.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:ot,skinning:U.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:dt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:ge,decodeVideoTexture:zt&&y.map.isVideoTexture===!0&&Jt.getTransfer(y.map.colorSpace)===se,decodeVideoTextureEmissive:yt&&y.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(y.emissiveMap.colorSpace)===se,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===tn,flipSided:y.side===Le,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Vt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Vt&&y.extensions.multiDraw===!0||Lt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ae.vertexUv1s=c.has(1),Ae.vertexUv2s=c.has(2),Ae.vertexUv3s=c.has(3),c.clear(),Ae}function d(y){const v=[];if(y.shaderID?v.push(y.shaderID):(v.push(y.customVertexShaderID),v.push(y.customFragmentShaderID)),y.defines!==void 0)for(const R in y.defines)v.push(R),v.push(y.defines[R]);return y.isRawShaderMaterial===!1&&(E(v,y),S(v,y),v.push(i.outputColorSpace)),v.push(y.customProgramCacheKey),v.join()}function E(y,v){y.push(v.precision),y.push(v.outputColorSpace),y.push(v.envMapMode),y.push(v.envMapCubeUVHeight),y.push(v.mapUv),y.push(v.alphaMapUv),y.push(v.lightMapUv),y.push(v.aoMapUv),y.push(v.bumpMapUv),y.push(v.normalMapUv),y.push(v.displacementMapUv),y.push(v.emissiveMapUv),y.push(v.metalnessMapUv),y.push(v.roughnessMapUv),y.push(v.anisotropyMapUv),y.push(v.clearcoatMapUv),y.push(v.clearcoatNormalMapUv),y.push(v.clearcoatRoughnessMapUv),y.push(v.iridescenceMapUv),y.push(v.iridescenceThicknessMapUv),y.push(v.sheenColorMapUv),y.push(v.sheenRoughnessMapUv),y.push(v.specularMapUv),y.push(v.specularColorMapUv),y.push(v.specularIntensityMapUv),y.push(v.transmissionMapUv),y.push(v.thicknessMapUv),y.push(v.combine),y.push(v.fogExp2),y.push(v.sizeAttenuation),y.push(v.morphTargetsCount),y.push(v.morphAttributeCount),y.push(v.numDirLights),y.push(v.numPointLights),y.push(v.numSpotLights),y.push(v.numSpotLightMaps),y.push(v.numHemiLights),y.push(v.numRectAreaLights),y.push(v.numDirLightShadows),y.push(v.numPointLightShadows),y.push(v.numSpotLightShadows),y.push(v.numSpotLightShadowsWithMaps),y.push(v.numLightProbes),y.push(v.shadowMapType),y.push(v.toneMapping),y.push(v.numClippingPlanes),y.push(v.numClipIntersection),y.push(v.depthPacking)}function S(y,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),y.push(a.mask)}function x(y){const v=g[y.type];let R;if(v){const N=fn[v];R=ys.clone(N.uniforms)}else R=y.uniforms;return R}function F(y,v){let R;for(let N=0,U=h.length;N<U;N++){const O=h[N];if(O.cacheKey===v){R=O,++R.usedTimes;break}}return R===void 0&&(R=new l0(i,v,y,r),h.push(R)),R}function C(y){if(--y.usedTimes===0){const v=h.indexOf(y);h[v]=h[h.length-1],h.pop(),y.destroy()}}function A(y){l.remove(y)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:x,acquireProgram:F,releaseProgram:C,releaseShaderCache:A,programs:h,dispose:L}}function d0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function p0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Fl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ol(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,p,g,_,m){let d=i[t];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=_,d.group=m),t++,d}function a(u,f,p,g,_,m){const d=o(u,f,p,g,_,m);p.transmission>0?n.push(d):p.transparent===!0?s.push(d):e.push(d)}function l(u,f,p,g,_,m){const d=o(u,f,p,g,_,m);p.transmission>0?n.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function c(u,f){e.length>1&&e.sort(u||p0),n.length>1&&n.sort(f||Fl),s.length>1&&s.sort(f||Fl)}function h(){for(let u=t,f=i.length;u<f;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function m0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Ol,i.set(n,[o])):s>=r.length?(o=new Ol,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function g0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new gt};break;case"SpotLight":e={position:new D,direction:new D,color:new gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new gt,groundColor:new gt};break;case"RectAreaLight":e={color:new gt,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function _0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let v0=0;function x0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function M0(i){const t=new g0,e=_0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const s=new D,r=new ne,o=new ne;function a(c){let h=0,u=0,f=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,E=0,S=0,x=0,F=0,C=0,A=0;c.sort(x0);for(let y=0,v=c.length;y<v;y++){const R=c[y],N=R.color,U=R.intensity,O=R.distance,X=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=N.r*U,u+=N.g*U,f+=N.b*U;else if(R.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(R.sh.coefficients[W],U);A++}else if(R.isDirectionalLight){const W=t.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const H=R.shadow,B=e.get(R);B.shadowIntensity=H.intensity,B.shadowBias=H.bias,B.shadowNormalBias=H.normalBias,B.shadowRadius=H.radius,B.shadowMapSize=H.mapSize,n.directionalShadow[p]=B,n.directionalShadowMap[p]=X,n.directionalShadowMatrix[p]=R.shadow.matrix,E++}n.directional[p]=W,p++}else if(R.isSpotLight){const W=t.get(R);W.position.setFromMatrixPosition(R.matrixWorld),W.color.copy(N).multiplyScalar(U),W.distance=O,W.coneCos=Math.cos(R.angle),W.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),W.decay=R.decay,n.spot[_]=W;const H=R.shadow;if(R.map&&(n.spotLightMap[F]=R.map,F++,H.updateMatrices(R),R.castShadow&&C++),n.spotLightMatrix[_]=H.matrix,R.castShadow){const B=e.get(R);B.shadowIntensity=H.intensity,B.shadowBias=H.bias,B.shadowNormalBias=H.normalBias,B.shadowRadius=H.radius,B.shadowMapSize=H.mapSize,n.spotShadow[_]=B,n.spotShadowMap[_]=X,x++}_++}else if(R.isRectAreaLight){const W=t.get(R);W.color.copy(N).multiplyScalar(U),W.halfWidth.set(R.width*.5,0,0),W.halfHeight.set(0,R.height*.5,0),n.rectArea[m]=W,m++}else if(R.isPointLight){const W=t.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),W.distance=R.distance,W.decay=R.decay,R.castShadow){const H=R.shadow,B=e.get(R);B.shadowIntensity=H.intensity,B.shadowBias=H.bias,B.shadowNormalBias=H.normalBias,B.shadowRadius=H.radius,B.shadowMapSize=H.mapSize,B.shadowCameraNear=H.camera.near,B.shadowCameraFar=H.camera.far,n.pointShadow[g]=B,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=R.shadow.matrix,S++}n.point[g]=W,g++}else if(R.isHemisphereLight){const W=t.get(R);W.skyColor.copy(R.color).multiplyScalar(U),W.groundColor.copy(R.groundColor).multiplyScalar(U),n.hemi[d]=W,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Et.LTC_FLOAT_1,n.rectAreaLTC2=Et.LTC_FLOAT_2):(n.rectAreaLTC1=Et.LTC_HALF_1,n.rectAreaLTC2=Et.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const L=n.hash;(L.directionalLength!==p||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==m||L.hemiLength!==d||L.numDirectionalShadows!==E||L.numPointShadows!==S||L.numSpotShadows!==x||L.numSpotMaps!==F||L.numLightProbes!==A)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=x+F-C,n.spotLightMap.length=F,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=A,L.directionalLength=p,L.pointLength=g,L.spotLength=_,L.rectAreaLength=m,L.hemiLength=d,L.numDirectionalShadows=E,L.numPointShadows=S,L.numSpotShadows=x,L.numSpotMaps=F,L.numLightProbes=A,n.version=v0++)}function l(c,h){let u=0,f=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let d=0,E=c.length;d<E;d++){const S=c[d];if(S.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),u++}else if(S.isSpotLight){const x=n.spot[p];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),p++}else if(S.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(S.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(S.width*.5,0,0),x.halfHeight.set(0,S.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(S.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function Bl(i){const t=new M0(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function y0(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Bl(i),t.set(s,[a])):r>=o.length?(a=new Bl(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class S0 extends $n{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=vu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class b0 extends $n{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const E0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,w0=`uniform sampler2D shadow_pass;
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
}`;function T0(i,t,e){let n=new ba;const s=new ht,r=new ht,o=new oe,a=new S0({depthPacking:xu}),l=new b0,c={},h=e.maxTextureSize,u={[Yn]:Le,[Le]:Yn,[tn]:tn},f=new Pe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ht},radius:{value:4}},vertexShader:E0,fragmentShader:w0}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new ye;g.setAttribute("position",new Oe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new kt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=da;let d=this.type;this.render=function(C,A,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const y=i.getRenderTarget(),v=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),N=i.state;N.setBlending(In),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const U=d!==Rn&&this.type===Rn,O=d===Rn&&this.type!==Rn;for(let X=0,W=C.length;X<W;X++){const H=C[X],B=H.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",H,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const Q=B.getFrameExtents();if(s.multiply(Q),r.copy(B.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,B.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,B.mapSize.y=r.y)),B.map===null||U===!0||O===!0){const ft=this.type!==Rn?{minFilter:Fe,magFilter:Fe}:{};B.map!==null&&B.map.dispose(),B.map=new nn(s.x,s.y,ft),B.map.texture.name=H.name+".shadowMap",B.camera.updateProjectionMatrix()}i.setRenderTarget(B.map),i.clear();const pt=B.getViewportCount();for(let ft=0;ft<pt;ft++){const dt=B.getViewport(ft);o.set(r.x*dt.x,r.y*dt.y,r.x*dt.z,r.y*dt.w),N.viewport(o),B.updateMatrices(H,ft),n=B.getFrustum(),x(A,L,B.camera,H,this.type)}B.isPointLightShadow!==!0&&this.type===Rn&&E(B,L),B.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(y,v,R)};function E(C,A){const L=t.update(_);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new nn(s.x,s.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(A,null,L,f,_,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(A,null,L,p,_,null)}function S(C,A,L,y){let v=null;const R=L.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(R!==void 0)v=R;else if(v=L.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const N=v.uuid,U=A.uuid;let O=c[N];O===void 0&&(O={},c[N]=O);let X=O[U];X===void 0&&(X=v.clone(),O[U]=X,A.addEventListener("dispose",F)),v=X}if(v.visible=A.visible,v.wireframe=A.wireframe,y===Rn?v.side=A.shadowSide!==null?A.shadowSide:A.side:v.side=A.shadowSide!==null?A.shadowSide:u[A.side],v.alphaMap=A.alphaMap,v.alphaTest=A.alphaTest,v.map=A.map,v.clipShadows=A.clipShadows,v.clippingPlanes=A.clippingPlanes,v.clipIntersection=A.clipIntersection,v.displacementMap=A.displacementMap,v.displacementScale=A.displacementScale,v.displacementBias=A.displacementBias,v.wireframeLinewidth=A.wireframeLinewidth,v.linewidth=A.linewidth,L.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const N=i.properties.get(v);N.light=L}return v}function x(C,A,L,y,v){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&v===Rn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,C.matrixWorld);const U=t.update(C),O=C.material;if(Array.isArray(O)){const X=U.groups;for(let W=0,H=X.length;W<H;W++){const B=X[W],Q=O[B.materialIndex];if(Q&&Q.visible){const pt=S(C,Q,y,v);C.onBeforeShadow(i,C,A,L,U,pt,B),i.renderBufferDirect(L,null,U,pt,C,B),C.onAfterShadow(i,C,A,L,U,pt,B)}}}else if(O.visible){const X=S(C,O,y,v);C.onBeforeShadow(i,C,A,L,U,X,null),i.renderBufferDirect(L,null,U,X,C,null),C.onAfterShadow(i,C,A,L,U,X,null)}}const N=C.children;for(let U=0,O=N.length;U<O;U++)x(N[U],A,L,y,v)}function F(C){C.target.removeEventListener("dispose",F);for(const L in c){const y=c[L],v=C.target.uuid;v in y&&(y[v].dispose(),delete y[v])}}}const A0={[xo]:Mo,[yo]:Eo,[So]:wo,[Hi]:bo,[Mo]:xo,[Eo]:yo,[wo]:So,[bo]:Hi};function R0(i,t){function e(){let k=!1;const wt=new oe;let tt=null;const ct=new oe(0,0,0,0);return{setMask:function(Pt){tt!==Pt&&!k&&(i.colorMask(Pt,Pt,Pt,Pt),tt=Pt)},setLocked:function(Pt){k=Pt},setClear:function(Pt,Tt,Vt,ge,Ae){Ae===!0&&(Pt*=ge,Tt*=ge,Vt*=ge),wt.set(Pt,Tt,Vt,ge),ct.equals(wt)===!1&&(i.clearColor(Pt,Tt,Vt,ge),ct.copy(wt))},reset:function(){k=!1,tt=null,ct.set(-1,0,0,0)}}}function n(){let k=!1,wt=!1,tt=null,ct=null,Pt=null;return{setReversed:function(Tt){if(wt!==Tt){const Vt=t.get("EXT_clip_control");wt?Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.ZERO_TO_ONE_EXT):Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.NEGATIVE_ONE_TO_ONE_EXT);const ge=Pt;Pt=null,this.setClear(ge)}wt=Tt},getReversed:function(){return wt},setTest:function(Tt){Tt?Y(i.DEPTH_TEST):ot(i.DEPTH_TEST)},setMask:function(Tt){tt!==Tt&&!k&&(i.depthMask(Tt),tt=Tt)},setFunc:function(Tt){if(wt&&(Tt=A0[Tt]),ct!==Tt){switch(Tt){case xo:i.depthFunc(i.NEVER);break;case Mo:i.depthFunc(i.ALWAYS);break;case yo:i.depthFunc(i.LESS);break;case Hi:i.depthFunc(i.LEQUAL);break;case So:i.depthFunc(i.EQUAL);break;case bo:i.depthFunc(i.GEQUAL);break;case Eo:i.depthFunc(i.GREATER);break;case wo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ct=Tt}},setLocked:function(Tt){k=Tt},setClear:function(Tt){Pt!==Tt&&(wt&&(Tt=1-Tt),i.clearDepth(Tt),Pt=Tt)},reset:function(){k=!1,tt=null,ct=null,Pt=null,wt=!1}}}function s(){let k=!1,wt=null,tt=null,ct=null,Pt=null,Tt=null,Vt=null,ge=null,Ae=null;return{setTest:function(ie){k||(ie?Y(i.STENCIL_TEST):ot(i.STENCIL_TEST))},setMask:function(ie){wt!==ie&&!k&&(i.stencilMask(ie),wt=ie)},setFunc:function(ie,sn,yn){(tt!==ie||ct!==sn||Pt!==yn)&&(i.stencilFunc(ie,sn,yn),tt=ie,ct=sn,Pt=yn)},setOp:function(ie,sn,yn){(Tt!==ie||Vt!==sn||ge!==yn)&&(i.stencilOp(ie,sn,yn),Tt=ie,Vt=sn,ge=yn)},setLocked:function(ie){k=ie},setClear:function(ie){Ae!==ie&&(i.clearStencil(ie),Ae=ie)},reset:function(){k=!1,wt=null,tt=null,ct=null,Pt=null,Tt=null,Vt=null,ge=null,Ae=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,E=null,S=null,x=null,F=null,C=null,A=new gt(0,0,0),L=0,y=!1,v=null,R=null,N=null,U=null,O=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,H=0;const B=i.getParameter(i.VERSION);B.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(B)[1]),W=H>=1):B.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),W=H>=2);let Q=null,pt={};const ft=i.getParameter(i.SCISSOR_BOX),dt=i.getParameter(i.VIEWPORT),St=new oe().fromArray(ft),z=new oe().fromArray(dt);function I(k,wt,tt,ct){const Pt=new Uint8Array(4),Tt=i.createTexture();i.bindTexture(k,Tt),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Vt=0;Vt<tt;Vt++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(wt,0,i.RGBA,1,1,ct,0,i.RGBA,i.UNSIGNED_BYTE,Pt):i.texImage2D(wt+Vt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Pt);return Tt}const rt={};rt[i.TEXTURE_2D]=I(i.TEXTURE_2D,i.TEXTURE_2D,1),rt[i.TEXTURE_CUBE_MAP]=I(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),rt[i.TEXTURE_2D_ARRAY]=I(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),rt[i.TEXTURE_3D]=I(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Y(i.DEPTH_TEST),o.setFunc(Hi),j(!1),at(Xa),Y(i.CULL_FACE),T(In);function Y(k){h[k]!==!0&&(i.enable(k),h[k]=!0)}function ot(k){h[k]!==!1&&(i.disable(k),h[k]=!1)}function vt(k,wt){return u[k]!==wt?(i.bindFramebuffer(k,wt),u[k]=wt,k===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=wt),k===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=wt),!0):!1}function Lt(k,wt){let tt=p,ct=!1;if(k){tt=f.get(wt),tt===void 0&&(tt=[],f.set(wt,tt));const Pt=k.textures;if(tt.length!==Pt.length||tt[0]!==i.COLOR_ATTACHMENT0){for(let Tt=0,Vt=Pt.length;Tt<Vt;Tt++)tt[Tt]=i.COLOR_ATTACHMENT0+Tt;tt.length=Pt.length,ct=!0}}else tt[0]!==i.BACK&&(tt[0]=i.BACK,ct=!0);ct&&i.drawBuffers(tt)}function zt(k){return g!==k?(i.useProgram(k),g=k,!0):!1}const Z={[ri]:i.FUNC_ADD,[Jh]:i.FUNC_SUBTRACT,[jh]:i.FUNC_REVERSE_SUBTRACT};Z[Qh]=i.MIN,Z[tu]=i.MAX;const J={[eu]:i.ZERO,[nu]:i.ONE,[iu]:i.SRC_COLOR,[_o]:i.SRC_ALPHA,[cu]:i.SRC_ALPHA_SATURATE,[au]:i.DST_COLOR,[ru]:i.DST_ALPHA,[su]:i.ONE_MINUS_SRC_COLOR,[vo]:i.ONE_MINUS_SRC_ALPHA,[lu]:i.ONE_MINUS_DST_COLOR,[ou]:i.ONE_MINUS_DST_ALPHA,[hu]:i.CONSTANT_COLOR,[uu]:i.ONE_MINUS_CONSTANT_COLOR,[fu]:i.CONSTANT_ALPHA,[du]:i.ONE_MINUS_CONSTANT_ALPHA};function T(k,wt,tt,ct,Pt,Tt,Vt,ge,Ae,ie){if(k===In){_===!0&&(ot(i.BLEND),_=!1);return}if(_===!1&&(Y(i.BLEND),_=!0),k!==Zh){if(k!==m||ie!==y){if((d!==ri||x!==ri)&&(i.blendEquation(i.FUNC_ADD),d=ri,x=ri),ie)switch(k){case ci:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case mn:i.blendFunc(i.ONE,i.ONE);break;case qa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ya:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case ci:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case mn:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case qa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ya:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}E=null,S=null,F=null,C=null,A.set(0,0,0),L=0,m=k,y=ie}return}Pt=Pt||wt,Tt=Tt||tt,Vt=Vt||ct,(wt!==d||Pt!==x)&&(i.blendEquationSeparate(Z[wt],Z[Pt]),d=wt,x=Pt),(tt!==E||ct!==S||Tt!==F||Vt!==C)&&(i.blendFuncSeparate(J[tt],J[ct],J[Tt],J[Vt]),E=tt,S=ct,F=Tt,C=Vt),(ge.equals(A)===!1||Ae!==L)&&(i.blendColor(ge.r,ge.g,ge.b,Ae),A.copy(ge),L=Ae),m=k,y=!1}function mt(k,wt){k.side===tn?ot(i.CULL_FACE):Y(i.CULL_FACE);let tt=k.side===Le;wt&&(tt=!tt),j(tt),k.blending===ci&&k.transparent===!1?T(In):T(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),r.setMask(k.colorWrite);const ct=k.stencilWrite;a.setTest(ct),ct&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),yt(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?Y(i.SAMPLE_ALPHA_TO_COVERAGE):ot(i.SAMPLE_ALPHA_TO_COVERAGE)}function j(k){v!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),v=k)}function at(k){k!==$h?(Y(i.CULL_FACE),k!==R&&(k===Xa?i.cullFace(i.BACK):k===Kh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ot(i.CULL_FACE),R=k}function lt(k){k!==N&&(W&&i.lineWidth(k),N=k)}function yt(k,wt,tt){k?(Y(i.POLYGON_OFFSET_FILL),(U!==wt||O!==tt)&&(i.polygonOffset(wt,tt),U=wt,O=tt)):ot(i.POLYGON_OFFSET_FILL)}function ut(k){k?Y(i.SCISSOR_TEST):ot(i.SCISSOR_TEST)}function w(k){k===void 0&&(k=i.TEXTURE0+X-1),Q!==k&&(i.activeTexture(k),Q=k)}function M(k,wt,tt){tt===void 0&&(Q===null?tt=i.TEXTURE0+X-1:tt=Q);let ct=pt[tt];ct===void 0&&(ct={type:void 0,texture:void 0},pt[tt]=ct),(ct.type!==k||ct.texture!==wt)&&(Q!==tt&&(i.activeTexture(tt),Q=tt),i.bindTexture(k,wt||rt[k]),ct.type=k,ct.texture=wt)}function q(){const k=pt[Q];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function it(){try{i.compressedTexImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function nt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function et(){try{i.texSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Rt(){try{i.texSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Mt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ct(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function $t(){try{i.texStorage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function _t(){try{i.texStorage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function It(){try{i.texImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Bt(){try{i.texImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ht(k){St.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),St.copy(k))}function Dt(k){z.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),z.copy(k))}function Zt(k,wt){let tt=c.get(wt);tt===void 0&&(tt=new WeakMap,c.set(wt,tt));let ct=tt.get(k);ct===void 0&&(ct=i.getUniformBlockIndex(wt,k.name),tt.set(k,ct))}function qt(k,wt){const ct=c.get(wt).get(k);l.get(wt)!==ct&&(i.uniformBlockBinding(wt,ct,k.__bindingPointIndex),l.set(wt,ct))}function ae(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Q=null,pt={},u={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,E=null,S=null,x=null,F=null,C=null,A=new gt(0,0,0),L=0,y=!1,v=null,R=null,N=null,U=null,O=null,St.set(0,0,i.canvas.width,i.canvas.height),z.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Y,disable:ot,bindFramebuffer:vt,drawBuffers:Lt,useProgram:zt,setBlending:T,setMaterial:mt,setFlipSided:j,setCullFace:at,setLineWidth:lt,setPolygonOffset:yt,setScissorTest:ut,activeTexture:w,bindTexture:M,unbindTexture:q,compressedTexImage2D:it,compressedTexImage3D:nt,texImage2D:It,texImage3D:Bt,updateUBOMapping:Zt,uniformBlockBinding:qt,texStorage2D:$t,texStorage3D:_t,texSubImage2D:et,texSubImage3D:Rt,compressedTexSubImage2D:Mt,compressedTexSubImage3D:Ct,scissor:Ht,viewport:Dt,reset:ae}}function kl(i,t,e,n){const s=C0(n);switch(e){case Gc:return i*t;case Wc:return i*t;case Xc:return i*t*2;case va:return i*t/s.components*s.byteLength;case xa:return i*t/s.components*s.byteLength;case qc:return i*t*2/s.components*s.byteLength;case Ma:return i*t*2/s.components*s.byteLength;case Vc:return i*t*3/s.components*s.byteLength;case hn:return i*t*4/s.components*s.byteLength;case ya:return i*t*4/s.components*s.byteLength;case fr:case dr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case pr:case mr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Po:case Io:return Math.max(i,16)*Math.max(t,8)/4;case Co:case Lo:return Math.max(i,8)*Math.max(t,8)/2;case Do:case No:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Uo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Fo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Oo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Bo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ko:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case zo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ho:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Go:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Vo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Wo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Xo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case qo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Yo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case $o:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ko:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case gr:case Zo:case Jo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Yc:case jo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Qo:case ta:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function C0(i){switch(i){case Un:case kc:return{byteLength:1,components:1};case Ms:case zc:case vn:return{byteLength:2,components:1};case ga:case _a:return{byteLength:2,components:4};case fi:case ma:case _n:return{byteLength:4,components:1};case Hc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function P0(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ht,h=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,M){return p?new OffscreenCanvas(w,M):Mr("canvas")}function _(w,M,q){let it=1;const nt=ut(w);if((nt.width>q||nt.height>q)&&(it=q/Math.max(nt.width,nt.height)),it<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const et=Math.floor(it*nt.width),Rt=Math.floor(it*nt.height);u===void 0&&(u=g(et,Rt));const Mt=M?g(et,Rt):u;return Mt.width=et,Mt.height=Rt,Mt.getContext("2d").drawImage(w,0,0,et,Rt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+nt.width+"x"+nt.height+") to ("+et+"x"+Rt+")."),Mt}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+nt.width+"x"+nt.height+")."),w;return w}function m(w){return w.generateMipmaps}function d(w){i.generateMipmap(w)}function E(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(w,M,q,it,nt=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let et=M;if(M===i.RED&&(q===i.FLOAT&&(et=i.R32F),q===i.HALF_FLOAT&&(et=i.R16F),q===i.UNSIGNED_BYTE&&(et=i.R8)),M===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(et=i.R8UI),q===i.UNSIGNED_SHORT&&(et=i.R16UI),q===i.UNSIGNED_INT&&(et=i.R32UI),q===i.BYTE&&(et=i.R8I),q===i.SHORT&&(et=i.R16I),q===i.INT&&(et=i.R32I)),M===i.RG&&(q===i.FLOAT&&(et=i.RG32F),q===i.HALF_FLOAT&&(et=i.RG16F),q===i.UNSIGNED_BYTE&&(et=i.RG8)),M===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(et=i.RG8UI),q===i.UNSIGNED_SHORT&&(et=i.RG16UI),q===i.UNSIGNED_INT&&(et=i.RG32UI),q===i.BYTE&&(et=i.RG8I),q===i.SHORT&&(et=i.RG16I),q===i.INT&&(et=i.RG32I)),M===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(et=i.RGB8UI),q===i.UNSIGNED_SHORT&&(et=i.RGB16UI),q===i.UNSIGNED_INT&&(et=i.RGB32UI),q===i.BYTE&&(et=i.RGB8I),q===i.SHORT&&(et=i.RGB16I),q===i.INT&&(et=i.RGB32I)),M===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(et=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(et=i.RGBA16UI),q===i.UNSIGNED_INT&&(et=i.RGBA32UI),q===i.BYTE&&(et=i.RGBA8I),q===i.SHORT&&(et=i.RGBA16I),q===i.INT&&(et=i.RGBA32I)),M===i.RGB&&q===i.UNSIGNED_INT_5_9_9_9_REV&&(et=i.RGB9_E5),M===i.RGBA){const Rt=nt?wr:Jt.getTransfer(it);q===i.FLOAT&&(et=i.RGBA32F),q===i.HALF_FLOAT&&(et=i.RGBA16F),q===i.UNSIGNED_BYTE&&(et=Rt===se?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT_4_4_4_4&&(et=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(et=i.RGB5_A1)}return(et===i.R16F||et===i.R32F||et===i.RG16F||et===i.RG32F||et===i.RGBA16F||et===i.RGBA32F)&&t.get("EXT_color_buffer_float"),et}function x(w,M){let q;return w?M===null||M===fi||M===Wi?q=i.DEPTH24_STENCIL8:M===_n?q=i.DEPTH32F_STENCIL8:M===Ms&&(q=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===fi||M===Wi?q=i.DEPTH_COMPONENT24:M===_n?q=i.DEPTH_COMPONENT32F:M===Ms&&(q=i.DEPTH_COMPONENT16),q}function F(w,M){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Fe&&w.minFilter!==gn?Math.log2(Math.max(M.width,M.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?M.mipmaps.length:1}function C(w){const M=w.target;M.removeEventListener("dispose",C),L(M),M.isVideoTexture&&h.delete(M)}function A(w){const M=w.target;M.removeEventListener("dispose",A),v(M)}function L(w){const M=n.get(w);if(M.__webglInit===void 0)return;const q=w.source,it=f.get(q);if(it){const nt=it[M.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&y(w),Object.keys(it).length===0&&f.delete(q)}n.remove(w)}function y(w){const M=n.get(w);i.deleteTexture(M.__webglTexture);const q=w.source,it=f.get(q);delete it[M.__cacheKey],o.memory.textures--}function v(w){const M=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let it=0;it<6;it++){if(Array.isArray(M.__webglFramebuffer[it]))for(let nt=0;nt<M.__webglFramebuffer[it].length;nt++)i.deleteFramebuffer(M.__webglFramebuffer[it][nt]);else i.deleteFramebuffer(M.__webglFramebuffer[it]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[it])}else{if(Array.isArray(M.__webglFramebuffer))for(let it=0;it<M.__webglFramebuffer.length;it++)i.deleteFramebuffer(M.__webglFramebuffer[it]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let it=0;it<M.__webglColorRenderbuffer.length;it++)M.__webglColorRenderbuffer[it]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[it]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const q=w.textures;for(let it=0,nt=q.length;it<nt;it++){const et=n.get(q[it]);et.__webglTexture&&(i.deleteTexture(et.__webglTexture),o.memory.textures--),n.remove(q[it])}n.remove(w)}let R=0;function N(){R=0}function U(){const w=R;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),R+=1,w}function O(w){const M=[];return M.push(w.wrapS),M.push(w.wrapT),M.push(w.wrapR||0),M.push(w.magFilter),M.push(w.minFilter),M.push(w.anisotropy),M.push(w.internalFormat),M.push(w.format),M.push(w.type),M.push(w.generateMipmaps),M.push(w.premultiplyAlpha),M.push(w.flipY),M.push(w.unpackAlignment),M.push(w.colorSpace),M.join()}function X(w,M){const q=n.get(w);if(w.isVideoTexture&&lt(w),w.isRenderTargetTexture===!1&&w.version>0&&q.__version!==w.version){const it=w.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{z(q,w,M);return}}e.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+M)}function W(w,M){const q=n.get(w);if(w.version>0&&q.__version!==w.version){z(q,w,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+M)}function H(w,M){const q=n.get(w);if(w.version>0&&q.__version!==w.version){z(q,w,M);return}e.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+M)}function B(w,M){const q=n.get(w);if(w.version>0&&q.__version!==w.version){I(q,w,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+M)}const Q={[ui]:i.REPEAT,[ai]:i.CLAMP_TO_EDGE,[Ro]:i.MIRRORED_REPEAT},pt={[Fe]:i.NEAREST,[_u]:i.NEAREST_MIPMAP_NEAREST,[Is]:i.NEAREST_MIPMAP_LINEAR,[gn]:i.LINEAR,[Lr]:i.LINEAR_MIPMAP_NEAREST,[li]:i.LINEAR_MIPMAP_LINEAR},ft={[yu]:i.NEVER,[Au]:i.ALWAYS,[Su]:i.LESS,[Kc]:i.LEQUAL,[bu]:i.EQUAL,[Tu]:i.GEQUAL,[Eu]:i.GREATER,[wu]:i.NOTEQUAL};function dt(w,M){if(M.type===_n&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===gn||M.magFilter===Lr||M.magFilter===Is||M.magFilter===li||M.minFilter===gn||M.minFilter===Lr||M.minFilter===Is||M.minFilter===li)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,Q[M.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,Q[M.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,Q[M.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,pt[M.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,pt[M.minFilter]),M.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ft[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Fe||M.minFilter!==Is&&M.minFilter!==li||M.type===_n&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const q=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function St(w,M){let q=!1;w.__webglInit===void 0&&(w.__webglInit=!0,M.addEventListener("dispose",C));const it=M.source;let nt=f.get(it);nt===void 0&&(nt={},f.set(it,nt));const et=O(M);if(et!==w.__cacheKey){nt[et]===void 0&&(nt[et]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,q=!0),nt[et].usedTimes++;const Rt=nt[w.__cacheKey];Rt!==void 0&&(nt[w.__cacheKey].usedTimes--,Rt.usedTimes===0&&y(M)),w.__cacheKey=et,w.__webglTexture=nt[et].texture}return q}function z(w,M,q){let it=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(it=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(it=i.TEXTURE_3D);const nt=St(w,M),et=M.source;e.bindTexture(it,w.__webglTexture,i.TEXTURE0+q);const Rt=n.get(et);if(et.version!==Rt.__version||nt===!0){e.activeTexture(i.TEXTURE0+q);const Mt=Jt.getPrimaries(Jt.workingColorSpace),Ct=M.colorSpace===Cn?null:Jt.getPrimaries(M.colorSpace),$t=M.colorSpace===Cn||Mt===Ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$t);let _t=_(M.image,!1,s.maxTextureSize);_t=yt(M,_t);const It=r.convert(M.format,M.colorSpace),Bt=r.convert(M.type);let Ht=S(M.internalFormat,It,Bt,M.colorSpace,M.isVideoTexture);dt(it,M);let Dt;const Zt=M.mipmaps,qt=M.isVideoTexture!==!0,ae=Rt.__version===void 0||nt===!0,k=et.dataReady,wt=F(M,_t);if(M.isDepthTexture)Ht=x(M.format===Xi,M.type),ae&&(qt?e.texStorage2D(i.TEXTURE_2D,1,Ht,_t.width,_t.height):e.texImage2D(i.TEXTURE_2D,0,Ht,_t.width,_t.height,0,It,Bt,null));else if(M.isDataTexture)if(Zt.length>0){qt&&ae&&e.texStorage2D(i.TEXTURE_2D,wt,Ht,Zt[0].width,Zt[0].height);for(let tt=0,ct=Zt.length;tt<ct;tt++)Dt=Zt[tt],qt?k&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,Dt.width,Dt.height,It,Bt,Dt.data):e.texImage2D(i.TEXTURE_2D,tt,Ht,Dt.width,Dt.height,0,It,Bt,Dt.data);M.generateMipmaps=!1}else qt?(ae&&e.texStorage2D(i.TEXTURE_2D,wt,Ht,_t.width,_t.height),k&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,_t.width,_t.height,It,Bt,_t.data)):e.texImage2D(i.TEXTURE_2D,0,Ht,_t.width,_t.height,0,It,Bt,_t.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){qt&&ae&&e.texStorage3D(i.TEXTURE_2D_ARRAY,wt,Ht,Zt[0].width,Zt[0].height,_t.depth);for(let tt=0,ct=Zt.length;tt<ct;tt++)if(Dt=Zt[tt],M.format!==hn)if(It!==null)if(qt){if(k)if(M.layerUpdates.size>0){const Pt=kl(Dt.width,Dt.height,M.format,M.type);for(const Tt of M.layerUpdates){const Vt=Dt.data.subarray(Tt*Pt/Dt.data.BYTES_PER_ELEMENT,(Tt+1)*Pt/Dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,Tt,Dt.width,Dt.height,1,It,Vt)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,Dt.width,Dt.height,_t.depth,It,Dt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,tt,Ht,Dt.width,Dt.height,_t.depth,0,Dt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qt?k&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,Dt.width,Dt.height,_t.depth,It,Bt,Dt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,tt,Ht,Dt.width,Dt.height,_t.depth,0,It,Bt,Dt.data)}else{qt&&ae&&e.texStorage2D(i.TEXTURE_2D,wt,Ht,Zt[0].width,Zt[0].height);for(let tt=0,ct=Zt.length;tt<ct;tt++)Dt=Zt[tt],M.format!==hn?It!==null?qt?k&&e.compressedTexSubImage2D(i.TEXTURE_2D,tt,0,0,Dt.width,Dt.height,It,Dt.data):e.compressedTexImage2D(i.TEXTURE_2D,tt,Ht,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qt?k&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,Dt.width,Dt.height,It,Bt,Dt.data):e.texImage2D(i.TEXTURE_2D,tt,Ht,Dt.width,Dt.height,0,It,Bt,Dt.data)}else if(M.isDataArrayTexture)if(qt){if(ae&&e.texStorage3D(i.TEXTURE_2D_ARRAY,wt,Ht,_t.width,_t.height,_t.depth),k)if(M.layerUpdates.size>0){const tt=kl(_t.width,_t.height,M.format,M.type);for(const ct of M.layerUpdates){const Pt=_t.data.subarray(ct*tt/_t.data.BYTES_PER_ELEMENT,(ct+1)*tt/_t.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ct,_t.width,_t.height,1,It,Bt,Pt)}M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,_t.width,_t.height,_t.depth,It,Bt,_t.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ht,_t.width,_t.height,_t.depth,0,It,Bt,_t.data);else if(M.isData3DTexture)qt?(ae&&e.texStorage3D(i.TEXTURE_3D,wt,Ht,_t.width,_t.height,_t.depth),k&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,_t.width,_t.height,_t.depth,It,Bt,_t.data)):e.texImage3D(i.TEXTURE_3D,0,Ht,_t.width,_t.height,_t.depth,0,It,Bt,_t.data);else if(M.isFramebufferTexture){if(ae)if(qt)e.texStorage2D(i.TEXTURE_2D,wt,Ht,_t.width,_t.height);else{let tt=_t.width,ct=_t.height;for(let Pt=0;Pt<wt;Pt++)e.texImage2D(i.TEXTURE_2D,Pt,Ht,tt,ct,0,It,Bt,null),tt>>=1,ct>>=1}}else if(Zt.length>0){if(qt&&ae){const tt=ut(Zt[0]);e.texStorage2D(i.TEXTURE_2D,wt,Ht,tt.width,tt.height)}for(let tt=0,ct=Zt.length;tt<ct;tt++)Dt=Zt[tt],qt?k&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,It,Bt,Dt):e.texImage2D(i.TEXTURE_2D,tt,Ht,It,Bt,Dt);M.generateMipmaps=!1}else if(qt){if(ae){const tt=ut(_t);e.texStorage2D(i.TEXTURE_2D,wt,Ht,tt.width,tt.height)}k&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,It,Bt,_t)}else e.texImage2D(i.TEXTURE_2D,0,Ht,It,Bt,_t);m(M)&&d(it),Rt.__version=et.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function I(w,M,q){if(M.image.length!==6)return;const it=St(w,M),nt=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+q);const et=n.get(nt);if(nt.version!==et.__version||it===!0){e.activeTexture(i.TEXTURE0+q);const Rt=Jt.getPrimaries(Jt.workingColorSpace),Mt=M.colorSpace===Cn?null:Jt.getPrimaries(M.colorSpace),Ct=M.colorSpace===Cn||Rt===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);const $t=M.isCompressedTexture||M.image[0].isCompressedTexture,_t=M.image[0]&&M.image[0].isDataTexture,It=[];for(let ct=0;ct<6;ct++)!$t&&!_t?It[ct]=_(M.image[ct],!0,s.maxCubemapSize):It[ct]=_t?M.image[ct].image:M.image[ct],It[ct]=yt(M,It[ct]);const Bt=It[0],Ht=r.convert(M.format,M.colorSpace),Dt=r.convert(M.type),Zt=S(M.internalFormat,Ht,Dt,M.colorSpace),qt=M.isVideoTexture!==!0,ae=et.__version===void 0||it===!0,k=nt.dataReady;let wt=F(M,Bt);dt(i.TEXTURE_CUBE_MAP,M);let tt;if($t){qt&&ae&&e.texStorage2D(i.TEXTURE_CUBE_MAP,wt,Zt,Bt.width,Bt.height);for(let ct=0;ct<6;ct++){tt=It[ct].mipmaps;for(let Pt=0;Pt<tt.length;Pt++){const Tt=tt[Pt];M.format!==hn?Ht!==null?qt?k&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Pt,0,0,Tt.width,Tt.height,Ht,Tt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Pt,Zt,Tt.width,Tt.height,0,Tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):qt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Pt,0,0,Tt.width,Tt.height,Ht,Dt,Tt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Pt,Zt,Tt.width,Tt.height,0,Ht,Dt,Tt.data)}}}else{if(tt=M.mipmaps,qt&&ae){tt.length>0&&wt++;const ct=ut(It[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,wt,Zt,ct.width,ct.height)}for(let ct=0;ct<6;ct++)if(_t){qt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,It[ct].width,It[ct].height,Ht,Dt,It[ct].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,Zt,It[ct].width,It[ct].height,0,Ht,Dt,It[ct].data);for(let Pt=0;Pt<tt.length;Pt++){const Vt=tt[Pt].image[ct].image;qt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Pt+1,0,0,Vt.width,Vt.height,Ht,Dt,Vt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Pt+1,Zt,Vt.width,Vt.height,0,Ht,Dt,Vt.data)}}else{qt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,0,0,Ht,Dt,It[ct]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,Zt,Ht,Dt,It[ct]);for(let Pt=0;Pt<tt.length;Pt++){const Tt=tt[Pt];qt?k&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Pt+1,0,0,Ht,Dt,Tt.image[ct]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Pt+1,Zt,Ht,Dt,Tt.image[ct])}}}m(M)&&d(i.TEXTURE_CUBE_MAP),et.__version=nt.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function rt(w,M,q,it,nt,et){const Rt=r.convert(q.format,q.colorSpace),Mt=r.convert(q.type),Ct=S(q.internalFormat,Rt,Mt,q.colorSpace),$t=n.get(M),_t=n.get(q);if(_t.__renderTarget=M,!$t.__hasExternalTextures){const It=Math.max(1,M.width>>et),Bt=Math.max(1,M.height>>et);nt===i.TEXTURE_3D||nt===i.TEXTURE_2D_ARRAY?e.texImage3D(nt,et,Ct,It,Bt,M.depth,0,Rt,Mt,null):e.texImage2D(nt,et,Ct,It,Bt,0,Rt,Mt,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),at(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,it,nt,_t.__webglTexture,0,j(M)):(nt===i.TEXTURE_2D||nt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,it,nt,_t.__webglTexture,et),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Y(w,M,q){if(i.bindRenderbuffer(i.RENDERBUFFER,w),M.depthBuffer){const it=M.depthTexture,nt=it&&it.isDepthTexture?it.type:null,et=x(M.stencilBuffer,nt),Rt=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Mt=j(M);at(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Mt,et,M.width,M.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt,et,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,et,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Rt,i.RENDERBUFFER,w)}else{const it=M.textures;for(let nt=0;nt<it.length;nt++){const et=it[nt],Rt=r.convert(et.format,et.colorSpace),Mt=r.convert(et.type),Ct=S(et.internalFormat,Rt,Mt,et.colorSpace),$t=j(M);q&&at(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,$t,Ct,M.width,M.height):at(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$t,Ct,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Ct,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ot(w,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const it=n.get(M.depthTexture);it.__renderTarget=M,(!it.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),X(M.depthTexture,0);const nt=it.__webglTexture,et=j(M);if(M.depthTexture.format===ki)at(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0,et):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,nt,0);else if(M.depthTexture.format===Xi)at(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0,et):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,nt,0);else throw new Error("Unknown depthTexture format")}function vt(w){const M=n.get(w),q=w.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==w.depthTexture){const it=w.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),it){const nt=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,it.removeEventListener("dispose",nt)};it.addEventListener("dispose",nt),M.__depthDisposeCallback=nt}M.__boundDepthTexture=it}if(w.depthTexture&&!M.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");ot(M.__webglFramebuffer,w)}else if(q){M.__webglDepthbuffer=[];for(let it=0;it<6;it++)if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[it]),M.__webglDepthbuffer[it]===void 0)M.__webglDepthbuffer[it]=i.createRenderbuffer(),Y(M.__webglDepthbuffer[it],w,!1);else{const nt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=M.__webglDepthbuffer[it];i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,nt,i.RENDERBUFFER,et)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),Y(M.__webglDepthbuffer,w,!1);else{const it=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,nt=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,nt),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,nt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Lt(w,M,q){const it=n.get(w);M!==void 0&&rt(it.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&vt(w)}function zt(w){const M=w.texture,q=n.get(w),it=n.get(M);w.addEventListener("dispose",A);const nt=w.textures,et=w.isWebGLCubeRenderTarget===!0,Rt=nt.length>1;if(Rt||(it.__webglTexture===void 0&&(it.__webglTexture=i.createTexture()),it.__version=M.version,o.memory.textures++),et){q.__webglFramebuffer=[];for(let Mt=0;Mt<6;Mt++)if(M.mipmaps&&M.mipmaps.length>0){q.__webglFramebuffer[Mt]=[];for(let Ct=0;Ct<M.mipmaps.length;Ct++)q.__webglFramebuffer[Mt][Ct]=i.createFramebuffer()}else q.__webglFramebuffer[Mt]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){q.__webglFramebuffer=[];for(let Mt=0;Mt<M.mipmaps.length;Mt++)q.__webglFramebuffer[Mt]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(Rt)for(let Mt=0,Ct=nt.length;Mt<Ct;Mt++){const $t=n.get(nt[Mt]);$t.__webglTexture===void 0&&($t.__webglTexture=i.createTexture(),o.memory.textures++)}if(w.samples>0&&at(w)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let Mt=0;Mt<nt.length;Mt++){const Ct=nt[Mt];q.__webglColorRenderbuffer[Mt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[Mt]);const $t=r.convert(Ct.format,Ct.colorSpace),_t=r.convert(Ct.type),It=S(Ct.internalFormat,$t,_t,Ct.colorSpace,w.isXRRenderTarget===!0),Bt=j(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Bt,It,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,q.__webglColorRenderbuffer[Mt])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),Y(q.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(et){e.bindTexture(i.TEXTURE_CUBE_MAP,it.__webglTexture),dt(i.TEXTURE_CUBE_MAP,M);for(let Mt=0;Mt<6;Mt++)if(M.mipmaps&&M.mipmaps.length>0)for(let Ct=0;Ct<M.mipmaps.length;Ct++)rt(q.__webglFramebuffer[Mt][Ct],w,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Ct);else rt(q.__webglFramebuffer[Mt],w,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0);m(M)&&d(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Rt){for(let Mt=0,Ct=nt.length;Mt<Ct;Mt++){const $t=nt[Mt],_t=n.get($t);e.bindTexture(i.TEXTURE_2D,_t.__webglTexture),dt(i.TEXTURE_2D,$t),rt(q.__webglFramebuffer,w,$t,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,0),m($t)&&d(i.TEXTURE_2D)}e.unbindTexture()}else{let Mt=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Mt=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Mt,it.__webglTexture),dt(Mt,M),M.mipmaps&&M.mipmaps.length>0)for(let Ct=0;Ct<M.mipmaps.length;Ct++)rt(q.__webglFramebuffer[Ct],w,M,i.COLOR_ATTACHMENT0,Mt,Ct);else rt(q.__webglFramebuffer,w,M,i.COLOR_ATTACHMENT0,Mt,0);m(M)&&d(Mt),e.unbindTexture()}w.depthBuffer&&vt(w)}function Z(w){const M=w.textures;for(let q=0,it=M.length;q<it;q++){const nt=M[q];if(m(nt)){const et=E(w),Rt=n.get(nt).__webglTexture;e.bindTexture(et,Rt),d(et),e.unbindTexture()}}}const J=[],T=[];function mt(w){if(w.samples>0){if(at(w)===!1){const M=w.textures,q=w.width,it=w.height;let nt=i.COLOR_BUFFER_BIT;const et=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Rt=n.get(w),Mt=M.length>1;if(Mt)for(let Ct=0;Ct<M.length;Ct++)e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer);for(let Ct=0;Ct<M.length;Ct++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(nt|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(nt|=i.STENCIL_BUFFER_BIT)),Mt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[Ct]);const $t=n.get(M[Ct]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,$t,0)}i.blitFramebuffer(0,0,q,it,0,0,q,it,nt,i.NEAREST),l===!0&&(J.length=0,T.length=0,J.push(i.COLOR_ATTACHMENT0+Ct),w.depthBuffer&&w.resolveDepthBuffer===!1&&(J.push(et),T.push(et),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,T)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,J))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Mt)for(let Ct=0;Ct<M.length;Ct++){e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[Ct]);const $t=n.get(M[Ct]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.TEXTURE_2D,$t,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const M=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function j(w){return Math.min(s.maxSamples,w.samples)}function at(w){const M=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function lt(w){const M=o.render.frame;h.get(w)!==M&&(h.set(w,M),w.update())}function yt(w,M){const q=w.colorSpace,it=w.format,nt=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||q!==$i&&q!==Cn&&(Jt.getTransfer(q)===se?(it!==hn||nt!==Un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),M}function ut(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=N,this.setTexture2D=X,this.setTexture2DArray=W,this.setTexture3D=H,this.setTextureCube=B,this.rebindTextures=Lt,this.setupRenderTarget=zt,this.updateRenderTargetMipmap=Z,this.updateMultisampleRenderTarget=mt,this.setupDepthRenderbuffer=vt,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=at}function L0(i,t){function e(n,s=Cn){let r;const o=Jt.getTransfer(s);if(n===Un)return i.UNSIGNED_BYTE;if(n===ga)return i.UNSIGNED_SHORT_4_4_4_4;if(n===_a)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Hc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===kc)return i.BYTE;if(n===zc)return i.SHORT;if(n===Ms)return i.UNSIGNED_SHORT;if(n===ma)return i.INT;if(n===fi)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===vn)return i.HALF_FLOAT;if(n===Gc)return i.ALPHA;if(n===Vc)return i.RGB;if(n===hn)return i.RGBA;if(n===Wc)return i.LUMINANCE;if(n===Xc)return i.LUMINANCE_ALPHA;if(n===ki)return i.DEPTH_COMPONENT;if(n===Xi)return i.DEPTH_STENCIL;if(n===va)return i.RED;if(n===xa)return i.RED_INTEGER;if(n===qc)return i.RG;if(n===Ma)return i.RG_INTEGER;if(n===ya)return i.RGBA_INTEGER;if(n===fr||n===dr||n===pr||n===mr)if(o===se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===fr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===fr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===mr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Co||n===Po||n===Lo||n===Io)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Co)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Po)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Lo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Io)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Do||n===No||n===Uo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Do||n===No)return o===se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Uo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Fo||n===Oo||n===Bo||n===ko||n===zo||n===Ho||n===Go||n===Vo||n===Wo||n===Xo||n===qo||n===Yo||n===$o||n===Ko)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Fo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Oo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Bo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ko)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===zo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ho)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Go)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Vo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Wo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Xo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===qo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Yo)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===$o)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ko)return o===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===gr||n===Zo||n===Jo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===gr)return o===se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Zo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Jo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Yc||n===jo||n===Qo||n===ta)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===gr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===jo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Qo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ta)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Wi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class I0 extends Ge{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ye extends de{constructor(){super(),this.isGroup=!0,this.type="Group"}}const D0={type:"move"};class oo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ye,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ye,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ye,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(D0)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ye;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const N0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,U0=`
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

}`;class F0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ie,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Pe({vertexShader:N0,fragmentShader:U0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new kt(new qe(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class O0 extends Ki{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,p=null,g=null;const _=new F0,m=e.getContextAttributes();let d=null,E=null;const S=[],x=[],F=new ht;let C=null;const A=new Ge;A.viewport=new oe;const L=new Ge;L.viewport=new oe;const y=[A,L],v=new I0;let R=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let I=S[z];return I===void 0&&(I=new oo,S[z]=I),I.getTargetRaySpace()},this.getControllerGrip=function(z){let I=S[z];return I===void 0&&(I=new oo,S[z]=I),I.getGripSpace()},this.getHand=function(z){let I=S[z];return I===void 0&&(I=new oo,S[z]=I),I.getHandSpace()};function U(z){const I=x.indexOf(z.inputSource);if(I===-1)return;const rt=S[I];rt!==void 0&&(rt.update(z.inputSource,z.frame,c||o),rt.dispatchEvent({type:z.type,data:z.inputSource}))}function O(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",O),s.removeEventListener("inputsourceschange",X);for(let z=0;z<S.length;z++){const I=x[z];I!==null&&(x[z]=null,S[z].disconnect(I))}R=null,N=null,_.reset(),t.setRenderTarget(d),p=null,f=null,u=null,s=null,E=null,St.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(F.width,F.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){r=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){a=z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(z){c=z},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(z){if(s=z,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",O),s.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(F),s.renderState.layers===void 0){const I={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,I),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new nn(p.framebufferWidth,p.framebufferHeight,{format:hn,type:Un,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let I=null,rt=null,Y=null;m.depth&&(Y=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,I=m.stencil?Xi:ki,rt=m.stencil?Wi:fi);const ot={colorFormat:e.RGBA8,depthFormat:Y,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(ot),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),E=new nn(f.textureWidth,f.textureHeight,{format:hn,type:Un,depthTexture:new ah(f.textureWidth,f.textureHeight,rt,void 0,void 0,void 0,void 0,void 0,void 0,I),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),St.setContext(s),St.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X(z){for(let I=0;I<z.removed.length;I++){const rt=z.removed[I],Y=x.indexOf(rt);Y>=0&&(x[Y]=null,S[Y].disconnect(rt))}for(let I=0;I<z.added.length;I++){const rt=z.added[I];let Y=x.indexOf(rt);if(Y===-1){for(let vt=0;vt<S.length;vt++)if(vt>=x.length){x.push(rt),Y=vt;break}else if(x[vt]===null){x[vt]=rt,Y=vt;break}if(Y===-1)break}const ot=S[Y];ot&&ot.connect(rt)}}const W=new D,H=new D;function B(z,I,rt){W.setFromMatrixPosition(I.matrixWorld),H.setFromMatrixPosition(rt.matrixWorld);const Y=W.distanceTo(H),ot=I.projectionMatrix.elements,vt=rt.projectionMatrix.elements,Lt=ot[14]/(ot[10]-1),zt=ot[14]/(ot[10]+1),Z=(ot[9]+1)/ot[5],J=(ot[9]-1)/ot[5],T=(ot[8]-1)/ot[0],mt=(vt[8]+1)/vt[0],j=Lt*T,at=Lt*mt,lt=Y/(-T+mt),yt=lt*-T;if(I.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(yt),z.translateZ(lt),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),ot[10]===-1)z.projectionMatrix.copy(I.projectionMatrix),z.projectionMatrixInverse.copy(I.projectionMatrixInverse);else{const ut=Lt+lt,w=zt+lt,M=j-yt,q=at+(Y-yt),it=Z*zt/w*ut,nt=J*zt/w*ut;z.projectionMatrix.makePerspective(M,q,it,nt,ut,w),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function Q(z,I){I===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices(I.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(s===null)return;let I=z.near,rt=z.far;_.texture!==null&&(_.depthNear>0&&(I=_.depthNear),_.depthFar>0&&(rt=_.depthFar)),v.near=L.near=A.near=I,v.far=L.far=A.far=rt,(R!==v.near||N!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),R=v.near,N=v.far),A.layers.mask=z.layers.mask|2,L.layers.mask=z.layers.mask|4,v.layers.mask=A.layers.mask|L.layers.mask;const Y=z.parent,ot=v.cameras;Q(v,Y);for(let vt=0;vt<ot.length;vt++)Q(ot[vt],Y);ot.length===2?B(v,A,L):v.projectionMatrix.copy(A.projectionMatrix),pt(z,v,Y)};function pt(z,I,rt){rt===null?z.matrix.copy(I.matrixWorld):(z.matrix.copy(rt.matrixWorld),z.matrix.invert(),z.matrix.multiply(I.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy(I.projectionMatrix),z.projectionMatrixInverse.copy(I.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=xr*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(z){l=z,f!==null&&(f.fixedFoveation=z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=z)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let ft=null;function dt(z,I){if(h=I.getViewerPose(c||o),g=I,h!==null){const rt=h.views;p!==null&&(t.setRenderTargetFramebuffer(E,p.framebuffer),t.setRenderTarget(E));let Y=!1;rt.length!==v.cameras.length&&(v.cameras.length=0,Y=!0);for(let vt=0;vt<rt.length;vt++){const Lt=rt[vt];let zt=null;if(p!==null)zt=p.getViewport(Lt);else{const J=u.getViewSubImage(f,Lt);zt=J.viewport,vt===0&&(t.setRenderTargetTextures(E,J.colorTexture,f.ignoreDepthValues?void 0:J.depthStencilTexture),t.setRenderTarget(E))}let Z=y[vt];Z===void 0&&(Z=new Ge,Z.layers.enable(vt),Z.viewport=new oe,y[vt]=Z),Z.matrix.fromArray(Lt.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(Lt.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set(zt.x,zt.y,zt.width,zt.height),vt===0&&(v.matrix.copy(Z.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),Y===!0&&v.cameras.push(Z)}const ot=s.enabledFeatures;if(ot&&ot.includes("depth-sensing")){const vt=u.getDepthInformation(rt[0]);vt&&vt.isValid&&vt.texture&&_.init(t,vt,s.renderState)}}for(let rt=0;rt<S.length;rt++){const Y=x[rt],ot=S[rt];Y!==null&&ot!==void 0&&ot.update(Y,I,c||o)}ft&&ft(z,I),I.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:I}),g=null}const St=new oh;St.setAnimationLoop(dt),this.setAnimationLoop=function(z){ft=z},this.dispose=function(){}}}const ei=new xn,B0=new ne;function k0(i,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,ih(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,E,S,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,x)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),_(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,E,S):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Le&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Le&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const E=t.get(d),S=E.envMap,x=E.envMapRotation;S&&(m.envMap.value=S,ei.copy(x),ei.x*=-1,ei.y*=-1,ei.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ei.y*=-1,ei.z*=-1),m.envMapRotation.value.setFromMatrix4(B0.makeRotationFromEuler(ei)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,E,S){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*E,m.scale.value=S*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,E){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Le&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const E=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function z0(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,S){const x=S.program;n.uniformBlockBinding(E,x)}function c(E,S){let x=s[E.id];x===void 0&&(g(E),x=h(E),s[E.id]=x,E.addEventListener("dispose",m));const F=S.program;n.updateUBOMapping(E,F);const C=t.render.frame;r[E.id]!==C&&(f(E),r[E.id]=C)}function h(E){const S=u();E.__bindingPointIndex=S;const x=i.createBuffer(),F=E.__size,C=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,F,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,x),x}function u(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(E){const S=s[E.id],x=E.uniforms,F=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let C=0,A=x.length;C<A;C++){const L=Array.isArray(x[C])?x[C]:[x[C]];for(let y=0,v=L.length;y<v;y++){const R=L[y];if(p(R,C,y,F)===!0){const N=R.__offset,U=Array.isArray(R.value)?R.value:[R.value];let O=0;for(let X=0;X<U.length;X++){const W=U[X],H=_(W);typeof W=="number"||typeof W=="boolean"?(R.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,N+O,R.__data)):W.isMatrix3?(R.__data[0]=W.elements[0],R.__data[1]=W.elements[1],R.__data[2]=W.elements[2],R.__data[3]=0,R.__data[4]=W.elements[3],R.__data[5]=W.elements[4],R.__data[6]=W.elements[5],R.__data[7]=0,R.__data[8]=W.elements[6],R.__data[9]=W.elements[7],R.__data[10]=W.elements[8],R.__data[11]=0):(W.toArray(R.__data,O),O+=H.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(E,S,x,F){const C=E.value,A=S+"_"+x;if(F[A]===void 0)return typeof C=="number"||typeof C=="boolean"?F[A]=C:F[A]=C.clone(),!0;{const L=F[A];if(typeof C=="number"||typeof C=="boolean"){if(L!==C)return F[A]=C,!0}else if(L.equals(C)===!1)return L.copy(C),!0}return!1}function g(E){const S=E.uniforms;let x=0;const F=16;for(let A=0,L=S.length;A<L;A++){const y=Array.isArray(S[A])?S[A]:[S[A]];for(let v=0,R=y.length;v<R;v++){const N=y[v],U=Array.isArray(N.value)?N.value:[N.value];for(let O=0,X=U.length;O<X;O++){const W=U[O],H=_(W),B=x%F,Q=B%H.boundary,pt=B+Q;x+=Q,pt!==0&&F-pt<H.storage&&(x+=F-pt),N.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=x,x+=H.storage}}}const C=x%F;return C>0&&(x+=F-C),E.__size=x,E.__cache={},this}function _(E){const S={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(S.boundary=4,S.storage=4):E.isVector2?(S.boundary=8,S.storage=8):E.isVector3||E.isColor?(S.boundary=16,S.storage=12):E.isVector4?(S.boundary=16,S.storage=16):E.isMatrix3?(S.boundary=48,S.storage=48):E.isMatrix4?(S.boundary=64,S.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),S}function m(E){const S=E.target;S.removeEventListener("dispose",m);const x=o.indexOf(S.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function d(){for(const E in s)i.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}class H0{constructor(t={}){const{canvas:e=Cu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,d=null;const E=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=He,this.toneMapping=Xn,this.toneMappingExposure=1;const x=this;let F=!1,C=0,A=0,L=null,y=-1,v=null;const R=new oe,N=new oe;let U=null;const O=new gt(0);let X=0,W=e.width,H=e.height,B=1,Q=null,pt=null;const ft=new oe(0,0,W,H),dt=new oe(0,0,W,H);let St=!1;const z=new ba;let I=!1,rt=!1;const Y=new ne,ot=new ne,vt=new D,Lt=new oe,zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Z=!1;function J(){return L===null?B:1}let T=n;function mt(b,G){return e.getContext(b,G)}try{const b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${fa}`),e.addEventListener("webglcontextlost",ct,!1),e.addEventListener("webglcontextrestored",Pt,!1),e.addEventListener("webglcontextcreationerror",Tt,!1),T===null){const G="webgl2";if(T=mt(G,b),T===null)throw mt(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let j,at,lt,yt,ut,w,M,q,it,nt,et,Rt,Mt,Ct,$t,_t,It,Bt,Ht,Dt,Zt,qt,ae,k;function wt(){j=new qp(T),j.init(),qt=new L0(T,j),at=new zp(T,j,t,qt),lt=new R0(T,j),at.reverseDepthBuffer&&f&&lt.buffers.depth.setReversed(!0),yt=new Kp(T),ut=new d0,w=new P0(T,j,lt,ut,at,qt,yt),M=new Gp(x),q=new Xp(x),it=new ef(T),ae=new Bp(T,it),nt=new Yp(T,it,yt,ae),et=new Jp(T,nt,it,yt),Ht=new Zp(T,at,w),_t=new Hp(ut),Rt=new f0(x,M,q,j,at,ae,_t),Mt=new k0(x,ut),Ct=new m0,$t=new y0(j),Bt=new Op(x,M,q,lt,et,p,l),It=new T0(x,et,at),k=new z0(T,yt,at,lt),Dt=new kp(T,j,yt),Zt=new $p(T,j,yt),yt.programs=Rt.programs,x.capabilities=at,x.extensions=j,x.properties=ut,x.renderLists=Ct,x.shadowMap=It,x.state=lt,x.info=yt}wt();const tt=new O0(x,T);this.xr=tt,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){const b=j.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=j.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(b){b!==void 0&&(B=b,this.setSize(W,H,!1))},this.getSize=function(b){return b.set(W,H)},this.setSize=function(b,G,$=!0){if(tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=b,H=G,e.width=Math.floor(b*B),e.height=Math.floor(G*B),$===!0&&(e.style.width=b+"px",e.style.height=G+"px"),this.setViewport(0,0,b,G)},this.getDrawingBufferSize=function(b){return b.set(W*B,H*B).floor()},this.setDrawingBufferSize=function(b,G,$){W=b,H=G,B=$,e.width=Math.floor(b*$),e.height=Math.floor(G*$),this.setViewport(0,0,b,G)},this.getCurrentViewport=function(b){return b.copy(R)},this.getViewport=function(b){return b.copy(ft)},this.setViewport=function(b,G,$,K){b.isVector4?ft.set(b.x,b.y,b.z,b.w):ft.set(b,G,$,K),lt.viewport(R.copy(ft).multiplyScalar(B).round())},this.getScissor=function(b){return b.copy(dt)},this.setScissor=function(b,G,$,K){b.isVector4?dt.set(b.x,b.y,b.z,b.w):dt.set(b,G,$,K),lt.scissor(N.copy(dt).multiplyScalar(B).round())},this.getScissorTest=function(){return St},this.setScissorTest=function(b){lt.setScissorTest(St=b)},this.setOpaqueSort=function(b){Q=b},this.setTransparentSort=function(b){pt=b},this.getClearColor=function(b){return b.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor.apply(Bt,arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha.apply(Bt,arguments)},this.clear=function(b=!0,G=!0,$=!0){let K=0;if(b){let V=!1;if(L!==null){const xt=L.texture.format;V=xt===ya||xt===Ma||xt===xa}if(V){const xt=L.texture.type,At=xt===Un||xt===fi||xt===Ms||xt===Wi||xt===ga||xt===_a,Nt=Bt.getClearColor(),Ut=Bt.getClearAlpha(),Gt=Nt.r,Wt=Nt.g,Ft=Nt.b;At?(g[0]=Gt,g[1]=Wt,g[2]=Ft,g[3]=Ut,T.clearBufferuiv(T.COLOR,0,g)):(_[0]=Gt,_[1]=Wt,_[2]=Ft,_[3]=Ut,T.clearBufferiv(T.COLOR,0,_))}else K|=T.COLOR_BUFFER_BIT}G&&(K|=T.DEPTH_BUFFER_BIT),$&&(K|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ct,!1),e.removeEventListener("webglcontextrestored",Pt,!1),e.removeEventListener("webglcontextcreationerror",Tt,!1),Ct.dispose(),$t.dispose(),ut.dispose(),M.dispose(),q.dispose(),et.dispose(),ae.dispose(),k.dispose(),Rt.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",Na),tt.removeEventListener("sessionend",Ua),Kn.stop()};function ct(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),F=!0}function Pt(){console.log("THREE.WebGLRenderer: Context Restored."),F=!1;const b=yt.autoReset,G=It.enabled,$=It.autoUpdate,K=It.needsUpdate,V=It.type;wt(),yt.autoReset=b,It.enabled=G,It.autoUpdate=$,It.needsUpdate=K,It.type=V}function Tt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Vt(b){const G=b.target;G.removeEventListener("dispose",Vt),ge(G)}function ge(b){Ae(b),ut.remove(b)}function Ae(b){const G=ut.get(b).programs;G!==void 0&&(G.forEach(function($){Rt.releaseProgram($)}),b.isShaderMaterial&&Rt.releaseShaderCache(b))}this.renderBufferDirect=function(b,G,$,K,V,xt){G===null&&(G=zt);const At=V.isMesh&&V.matrixWorld.determinant()<0,Nt=Ah(b,G,$,K,V);lt.setMaterial(K,At);let Ut=$.index,Gt=1;if(K.wireframe===!0){if(Ut=nt.getWireframeAttribute($),Ut===void 0)return;Gt=2}const Wt=$.drawRange,Ft=$.attributes.position;let jt=Wt.start*Gt,le=(Wt.start+Wt.count)*Gt;xt!==null&&(jt=Math.max(jt,xt.start*Gt),le=Math.min(le,(xt.start+xt.count)*Gt)),Ut!==null?(jt=Math.max(jt,0),le=Math.min(le,Ut.count)):Ft!=null&&(jt=Math.max(jt,0),le=Math.min(le,Ft.count));const he=le-jt;if(he<0||he===1/0)return;ae.setup(V,K,Nt,$,Ut);let ze,te=Dt;if(Ut!==null&&(ze=it.get(Ut),te=Zt,te.setIndex(ze)),V.isMesh)K.wireframe===!0?(lt.setLineWidth(K.wireframeLinewidth*J()),te.setMode(T.LINES)):te.setMode(T.TRIANGLES);else if(V.isLine){let Ot=K.linewidth;Ot===void 0&&(Ot=1),lt.setLineWidth(Ot*J()),V.isLineSegments?te.setMode(T.LINES):V.isLineLoop?te.setMode(T.LINE_LOOP):te.setMode(T.LINE_STRIP)}else V.isPoints?te.setMode(T.POINTS):V.isSprite&&te.setMode(T.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)te.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(j.get("WEBGL_multi_draw"))te.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Ot=V._multiDrawStarts,Sn=V._multiDrawCounts,ee=V._multiDrawCount,rn=Ut?it.get(Ut).bytesPerElement:1,gi=ut.get(K).currentProgram.getUniforms();for(let Ve=0;Ve<ee;Ve++)gi.setValue(T,"_gl_DrawID",Ve),te.render(Ot[Ve]/rn,Sn[Ve])}else if(V.isInstancedMesh)te.renderInstances(jt,he,V.count);else if($.isInstancedBufferGeometry){const Ot=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Sn=Math.min($.instanceCount,Ot);te.renderInstances(jt,he,Sn)}else te.render(jt,he)};function ie(b,G,$){b.transparent===!0&&b.side===tn&&b.forceSinglePass===!1?(b.side=Le,b.needsUpdate=!0,Ps(b,G,$),b.side=Yn,b.needsUpdate=!0,Ps(b,G,$),b.side=tn):Ps(b,G,$)}this.compile=function(b,G,$=null){$===null&&($=b),d=$t.get($),d.init(G),S.push(d),$.traverseVisible(function(V){V.isLight&&V.layers.test(G.layers)&&(d.pushLight(V),V.castShadow&&d.pushShadow(V))}),b!==$&&b.traverseVisible(function(V){V.isLight&&V.layers.test(G.layers)&&(d.pushLight(V),V.castShadow&&d.pushShadow(V))}),d.setupLights();const K=new Set;return b.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const xt=V.material;if(xt)if(Array.isArray(xt))for(let At=0;At<xt.length;At++){const Nt=xt[At];ie(Nt,$,V),K.add(Nt)}else ie(xt,$,V),K.add(xt)}),S.pop(),d=null,K},this.compileAsync=function(b,G,$=null){const K=this.compile(b,G,$);return new Promise(V=>{function xt(){if(K.forEach(function(At){ut.get(At).currentProgram.isReady()&&K.delete(At)}),K.size===0){V(b);return}setTimeout(xt,10)}j.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let sn=null;function yn(b){sn&&sn(b)}function Na(){Kn.stop()}function Ua(){Kn.start()}const Kn=new oh;Kn.setAnimationLoop(yn),typeof self<"u"&&Kn.setContext(self),this.setAnimationLoop=function(b){sn=b,tt.setAnimationLoop(b),b===null?Kn.stop():Kn.start()},tt.addEventListener("sessionstart",Na),tt.addEventListener("sessionend",Ua),this.render=function(b,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(G),G=tt.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,G,L),d=$t.get(b,S.length),d.init(G),S.push(d),ot.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),z.setFromProjectionMatrix(ot),rt=this.localClippingEnabled,I=_t.init(this.clippingPlanes,rt),m=Ct.get(b,E.length),m.init(),E.push(m),tt.enabled===!0&&tt.isPresenting===!0){const xt=x.xr.getDepthSensingMesh();xt!==null&&Pr(xt,G,-1/0,x.sortObjects)}Pr(b,G,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(Q,pt),Z=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,Z&&Bt.addToRenderList(m,b),this.info.render.frame++,I===!0&&_t.beginShadows();const $=d.state.shadowsArray;It.render($,b,G),I===!0&&_t.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=m.opaque,V=m.transmissive;if(d.setupLights(),G.isArrayCamera){const xt=G.cameras;if(V.length>0)for(let At=0,Nt=xt.length;At<Nt;At++){const Ut=xt[At];Oa(K,V,b,Ut)}Z&&Bt.render(b);for(let At=0,Nt=xt.length;At<Nt;At++){const Ut=xt[At];Fa(m,b,Ut,Ut.viewport)}}else V.length>0&&Oa(K,V,b,G),Z&&Bt.render(b),Fa(m,b,G);L!==null&&(w.updateMultisampleRenderTarget(L),w.updateRenderTargetMipmap(L)),b.isScene===!0&&b.onAfterRender(x,b,G),ae.resetDefaultState(),y=-1,v=null,S.pop(),S.length>0?(d=S[S.length-1],I===!0&&_t.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function Pr(b,G,$,K){if(b.visible===!1)return;if(b.layers.test(G.layers)){if(b.isGroup)$=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(G);else if(b.isLight)d.pushLight(b),b.castShadow&&d.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||z.intersectsSprite(b)){K&&Lt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ot);const At=et.update(b),Nt=b.material;Nt.visible&&m.push(b,At,Nt,$,Lt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||z.intersectsObject(b))){const At=et.update(b),Nt=b.material;if(K&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Lt.copy(b.boundingSphere.center)):(At.boundingSphere===null&&At.computeBoundingSphere(),Lt.copy(At.boundingSphere.center)),Lt.applyMatrix4(b.matrixWorld).applyMatrix4(ot)),Array.isArray(Nt)){const Ut=At.groups;for(let Gt=0,Wt=Ut.length;Gt<Wt;Gt++){const Ft=Ut[Gt],jt=Nt[Ft.materialIndex];jt&&jt.visible&&m.push(b,At,jt,$,Lt.z,Ft)}}else Nt.visible&&m.push(b,At,Nt,$,Lt.z,null)}}const xt=b.children;for(let At=0,Nt=xt.length;At<Nt;At++)Pr(xt[At],G,$,K)}function Fa(b,G,$,K){const V=b.opaque,xt=b.transmissive,At=b.transparent;d.setupLightsView($),I===!0&&_t.setGlobalState(x.clippingPlanes,$),K&&lt.viewport(R.copy(K)),V.length>0&&Cs(V,G,$),xt.length>0&&Cs(xt,G,$),At.length>0&&Cs(At,G,$),lt.buffers.depth.setTest(!0),lt.buffers.depth.setMask(!0),lt.buffers.color.setMask(!0),lt.setPolygonOffset(!1)}function Oa(b,G,$,K){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[K.id]===void 0&&(d.state.transmissionRenderTarget[K.id]=new nn(1,1,{generateMipmaps:!0,type:j.has("EXT_color_buffer_half_float")||j.has("EXT_color_buffer_float")?vn:Un,minFilter:li,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace}));const xt=d.state.transmissionRenderTarget[K.id],At=K.viewport||R;xt.setSize(At.z,At.w);const Nt=x.getRenderTarget();x.setRenderTarget(xt),x.getClearColor(O),X=x.getClearAlpha(),X<1&&x.setClearColor(16777215,.5),x.clear(),Z&&Bt.render($);const Ut=x.toneMapping;x.toneMapping=Xn;const Gt=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),d.setupLightsView(K),I===!0&&_t.setGlobalState(x.clippingPlanes,K),Cs(b,$,K),w.updateMultisampleRenderTarget(xt),w.updateRenderTargetMipmap(xt),j.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let Ft=0,jt=G.length;Ft<jt;Ft++){const le=G[Ft],he=le.object,ze=le.geometry,te=le.material,Ot=le.group;if(te.side===tn&&he.layers.test(K.layers)){const Sn=te.side;te.side=Le,te.needsUpdate=!0,Ba(he,$,K,ze,te,Ot),te.side=Sn,te.needsUpdate=!0,Wt=!0}}Wt===!0&&(w.updateMultisampleRenderTarget(xt),w.updateRenderTargetMipmap(xt))}x.setRenderTarget(Nt),x.setClearColor(O,X),Gt!==void 0&&(K.viewport=Gt),x.toneMapping=Ut}function Cs(b,G,$){const K=G.isScene===!0?G.overrideMaterial:null;for(let V=0,xt=b.length;V<xt;V++){const At=b[V],Nt=At.object,Ut=At.geometry,Gt=K===null?At.material:K,Wt=At.group;Nt.layers.test($.layers)&&Ba(Nt,G,$,Ut,Gt,Wt)}}function Ba(b,G,$,K,V,xt){b.onBeforeRender(x,G,$,K,V,xt),b.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),V.onBeforeRender(x,G,$,K,b,xt),V.transparent===!0&&V.side===tn&&V.forceSinglePass===!1?(V.side=Le,V.needsUpdate=!0,x.renderBufferDirect($,G,K,V,b,xt),V.side=Yn,V.needsUpdate=!0,x.renderBufferDirect($,G,K,V,b,xt),V.side=tn):x.renderBufferDirect($,G,K,V,b,xt),b.onAfterRender(x,G,$,K,V,xt)}function Ps(b,G,$){G.isScene!==!0&&(G=zt);const K=ut.get(b),V=d.state.lights,xt=d.state.shadowsArray,At=V.state.version,Nt=Rt.getParameters(b,V.state,xt,G,$),Ut=Rt.getProgramCacheKey(Nt);let Gt=K.programs;K.environment=b.isMeshStandardMaterial?G.environment:null,K.fog=G.fog,K.envMap=(b.isMeshStandardMaterial?q:M).get(b.envMap||K.environment),K.envMapRotation=K.environment!==null&&b.envMap===null?G.environmentRotation:b.envMapRotation,Gt===void 0&&(b.addEventListener("dispose",Vt),Gt=new Map,K.programs=Gt);let Wt=Gt.get(Ut);if(Wt!==void 0){if(K.currentProgram===Wt&&K.lightsStateVersion===At)return za(b,Nt),Wt}else Nt.uniforms=Rt.getUniforms(b),b.onBeforeCompile(Nt,x),Wt=Rt.acquireProgram(Nt,Ut),Gt.set(Ut,Wt),K.uniforms=Nt.uniforms;const Ft=K.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ft.clippingPlanes=_t.uniform),za(b,Nt),K.needsLights=Ch(b),K.lightsStateVersion=At,K.needsLights&&(Ft.ambientLightColor.value=V.state.ambient,Ft.lightProbe.value=V.state.probe,Ft.directionalLights.value=V.state.directional,Ft.directionalLightShadows.value=V.state.directionalShadow,Ft.spotLights.value=V.state.spot,Ft.spotLightShadows.value=V.state.spotShadow,Ft.rectAreaLights.value=V.state.rectArea,Ft.ltc_1.value=V.state.rectAreaLTC1,Ft.ltc_2.value=V.state.rectAreaLTC2,Ft.pointLights.value=V.state.point,Ft.pointLightShadows.value=V.state.pointShadow,Ft.hemisphereLights.value=V.state.hemi,Ft.directionalShadowMap.value=V.state.directionalShadowMap,Ft.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ft.spotShadowMap.value=V.state.spotShadowMap,Ft.spotLightMatrix.value=V.state.spotLightMatrix,Ft.spotLightMap.value=V.state.spotLightMap,Ft.pointShadowMap.value=V.state.pointShadowMap,Ft.pointShadowMatrix.value=V.state.pointShadowMatrix),K.currentProgram=Wt,K.uniformsList=null,Wt}function ka(b){if(b.uniformsList===null){const G=b.currentProgram.getUniforms();b.uniformsList=_r.seqWithValue(G.seq,b.uniforms)}return b.uniformsList}function za(b,G){const $=ut.get(b);$.outputColorSpace=G.outputColorSpace,$.batching=G.batching,$.batchingColor=G.batchingColor,$.instancing=G.instancing,$.instancingColor=G.instancingColor,$.instancingMorph=G.instancingMorph,$.skinning=G.skinning,$.morphTargets=G.morphTargets,$.morphNormals=G.morphNormals,$.morphColors=G.morphColors,$.morphTargetsCount=G.morphTargetsCount,$.numClippingPlanes=G.numClippingPlanes,$.numIntersection=G.numClipIntersection,$.vertexAlphas=G.vertexAlphas,$.vertexTangents=G.vertexTangents,$.toneMapping=G.toneMapping}function Ah(b,G,$,K,V){G.isScene!==!0&&(G=zt),w.resetTextureUnits();const xt=G.fog,At=K.isMeshStandardMaterial?G.environment:null,Nt=L===null?x.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:$i,Ut=(K.isMeshStandardMaterial?q:M).get(K.envMap||At),Gt=K.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Wt=!!$.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Ft=!!$.morphAttributes.position,jt=!!$.morphAttributes.normal,le=!!$.morphAttributes.color;let he=Xn;K.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(he=x.toneMapping);const ze=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,te=ze!==void 0?ze.length:0,Ot=ut.get(K),Sn=d.state.lights;if(I===!0&&(rt===!0||b!==v)){const $e=b===v&&K.id===y;_t.setState(K,b,$e)}let ee=!1;K.version===Ot.__version?(Ot.needsLights&&Ot.lightsStateVersion!==Sn.state.version||Ot.outputColorSpace!==Nt||V.isBatchedMesh&&Ot.batching===!1||!V.isBatchedMesh&&Ot.batching===!0||V.isBatchedMesh&&Ot.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Ot.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Ot.instancing===!1||!V.isInstancedMesh&&Ot.instancing===!0||V.isSkinnedMesh&&Ot.skinning===!1||!V.isSkinnedMesh&&Ot.skinning===!0||V.isInstancedMesh&&Ot.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Ot.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Ot.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Ot.instancingMorph===!1&&V.morphTexture!==null||Ot.envMap!==Ut||K.fog===!0&&Ot.fog!==xt||Ot.numClippingPlanes!==void 0&&(Ot.numClippingPlanes!==_t.numPlanes||Ot.numIntersection!==_t.numIntersection)||Ot.vertexAlphas!==Gt||Ot.vertexTangents!==Wt||Ot.morphTargets!==Ft||Ot.morphNormals!==jt||Ot.morphColors!==le||Ot.toneMapping!==he||Ot.morphTargetsCount!==te)&&(ee=!0):(ee=!0,Ot.__version=K.version);let rn=Ot.currentProgram;ee===!0&&(rn=Ps(K,G,V));let gi=!1,Ve=!1,ji=!1;const ue=rn.getUniforms(),un=Ot.uniforms;if(lt.useProgram(rn.program)&&(gi=!0,Ve=!0,ji=!0),K.id!==y&&(y=K.id,Ve=!0),gi||v!==b){lt.buffers.depth.getReversed()?(Y.copy(b.projectionMatrix),Lu(Y),Iu(Y),ue.setValue(T,"projectionMatrix",Y)):ue.setValue(T,"projectionMatrix",b.projectionMatrix),ue.setValue(T,"viewMatrix",b.matrixWorldInverse);const Fn=ue.map.cameraPosition;Fn!==void 0&&Fn.setValue(T,vt.setFromMatrixPosition(b.matrixWorld)),at.logarithmicDepthBuffer&&ue.setValue(T,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&ue.setValue(T,"isOrthographic",b.isOrthographicCamera===!0),v!==b&&(v=b,Ve=!0,ji=!0)}if(V.isSkinnedMesh){ue.setOptional(T,V,"bindMatrix"),ue.setOptional(T,V,"bindMatrixInverse");const $e=V.skeleton;$e&&($e.boneTexture===null&&$e.computeBoneTexture(),ue.setValue(T,"boneTexture",$e.boneTexture,w))}V.isBatchedMesh&&(ue.setOptional(T,V,"batchingTexture"),ue.setValue(T,"batchingTexture",V._matricesTexture,w),ue.setOptional(T,V,"batchingIdTexture"),ue.setValue(T,"batchingIdTexture",V._indirectTexture,w),ue.setOptional(T,V,"batchingColorTexture"),V._colorsTexture!==null&&ue.setValue(T,"batchingColorTexture",V._colorsTexture,w));const Qi=$.morphAttributes;if((Qi.position!==void 0||Qi.normal!==void 0||Qi.color!==void 0)&&Ht.update(V,$,rn),(Ve||Ot.receiveShadow!==V.receiveShadow)&&(Ot.receiveShadow=V.receiveShadow,ue.setValue(T,"receiveShadow",V.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(un.envMap.value=Ut,un.flipEnvMap.value=Ut.isCubeTexture&&Ut.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&G.environment!==null&&(un.envMapIntensity.value=G.environmentIntensity),Ve&&(ue.setValue(T,"toneMappingExposure",x.toneMappingExposure),Ot.needsLights&&Rh(un,ji),xt&&K.fog===!0&&Mt.refreshFogUniforms(un,xt),Mt.refreshMaterialUniforms(un,K,B,H,d.state.transmissionRenderTarget[b.id]),_r.upload(T,ka(Ot),un,w)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(_r.upload(T,ka(Ot),un,w),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&ue.setValue(T,"center",V.center),ue.setValue(T,"modelViewMatrix",V.modelViewMatrix),ue.setValue(T,"normalMatrix",V.normalMatrix),ue.setValue(T,"modelMatrix",V.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const $e=K.uniformsGroups;for(let Fn=0,On=$e.length;Fn<On;Fn++){const Ha=$e[Fn];k.update(Ha,rn),k.bind(Ha,rn)}}return rn}function Rh(b,G){b.ambientLightColor.needsUpdate=G,b.lightProbe.needsUpdate=G,b.directionalLights.needsUpdate=G,b.directionalLightShadows.needsUpdate=G,b.pointLights.needsUpdate=G,b.pointLightShadows.needsUpdate=G,b.spotLights.needsUpdate=G,b.spotLightShadows.needsUpdate=G,b.rectAreaLights.needsUpdate=G,b.hemisphereLights.needsUpdate=G}function Ch(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(b,G,$){ut.get(b.texture).__webglTexture=G,ut.get(b.depthTexture).__webglTexture=$;const K=ut.get(b);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=$===void 0,K.__autoAllocateDepthBuffer||j.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,G){const $=ut.get(b);$.__webglFramebuffer=G,$.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(b,G=0,$=0){L=b,C=G,A=$;let K=!0,V=null,xt=!1,At=!1;if(b){const Ut=ut.get(b);if(Ut.__useDefaultFramebuffer!==void 0)lt.bindFramebuffer(T.FRAMEBUFFER,null),K=!1;else if(Ut.__webglFramebuffer===void 0)w.setupRenderTarget(b);else if(Ut.__hasExternalTextures)w.rebindTextures(b,ut.get(b.texture).__webglTexture,ut.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Ft=b.depthTexture;if(Ut.__boundDepthTexture!==Ft){if(Ft!==null&&ut.has(Ft)&&(b.width!==Ft.image.width||b.height!==Ft.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(b)}}const Gt=b.texture;(Gt.isData3DTexture||Gt.isDataArrayTexture||Gt.isCompressedArrayTexture)&&(At=!0);const Wt=ut.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Wt[G])?V=Wt[G][$]:V=Wt[G],xt=!0):b.samples>0&&w.useMultisampledRTT(b)===!1?V=ut.get(b).__webglMultisampledFramebuffer:Array.isArray(Wt)?V=Wt[$]:V=Wt,R.copy(b.viewport),N.copy(b.scissor),U=b.scissorTest}else R.copy(ft).multiplyScalar(B).floor(),N.copy(dt).multiplyScalar(B).floor(),U=St;if(lt.bindFramebuffer(T.FRAMEBUFFER,V)&&K&&lt.drawBuffers(b,V),lt.viewport(R),lt.scissor(N),lt.setScissorTest(U),xt){const Ut=ut.get(b.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+G,Ut.__webglTexture,$)}else if(At){const Ut=ut.get(b.texture),Gt=G||0;T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,Ut.__webglTexture,$||0,Gt)}y=-1},this.readRenderTargetPixels=function(b,G,$,K,V,xt,At){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Nt=ut.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&At!==void 0&&(Nt=Nt[At]),Nt){lt.bindFramebuffer(T.FRAMEBUFFER,Nt);try{const Ut=b.texture,Gt=Ut.format,Wt=Ut.type;if(!at.textureFormatReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!at.textureTypeReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=b.width-K&&$>=0&&$<=b.height-V&&T.readPixels(G,$,K,V,qt.convert(Gt),qt.convert(Wt),xt)}finally{const Ut=L!==null?ut.get(L).__webglFramebuffer:null;lt.bindFramebuffer(T.FRAMEBUFFER,Ut)}}},this.readRenderTargetPixelsAsync=async function(b,G,$,K,V,xt,At){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Nt=ut.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&At!==void 0&&(Nt=Nt[At]),Nt){const Ut=b.texture,Gt=Ut.format,Wt=Ut.type;if(!at.textureFormatReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!at.textureTypeReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(G>=0&&G<=b.width-K&&$>=0&&$<=b.height-V){lt.bindFramebuffer(T.FRAMEBUFFER,Nt);const Ft=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,Ft),T.bufferData(T.PIXEL_PACK_BUFFER,xt.byteLength,T.STREAM_READ),T.readPixels(G,$,K,V,qt.convert(Gt),qt.convert(Wt),0);const jt=L!==null?ut.get(L).__webglFramebuffer:null;lt.bindFramebuffer(T.FRAMEBUFFER,jt);const le=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await Pu(T,le,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,Ft),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,xt),T.deleteBuffer(Ft),T.deleteSync(le),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,G=null,$=0){b.isTexture!==!0&&(ds("WebGLRenderer: copyFramebufferToTexture function signature has changed."),G=arguments[0]||null,b=arguments[1]);const K=Math.pow(2,-$),V=Math.floor(b.image.width*K),xt=Math.floor(b.image.height*K),At=G!==null?G.x:0,Nt=G!==null?G.y:0;w.setTexture2D(b,0),T.copyTexSubImage2D(T.TEXTURE_2D,$,0,0,At,Nt,V,xt),lt.unbindTexture()},this.copyTextureToTexture=function(b,G,$=null,K=null,V=0){b.isTexture!==!0&&(ds("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,b=arguments[1],G=arguments[2],V=arguments[3]||0,$=null);let xt,At,Nt,Ut,Gt,Wt,Ft,jt,le;const he=b.isCompressedTexture?b.mipmaps[V]:b.image;$!==null?(xt=$.max.x-$.min.x,At=$.max.y-$.min.y,Nt=$.isBox3?$.max.z-$.min.z:1,Ut=$.min.x,Gt=$.min.y,Wt=$.isBox3?$.min.z:0):(xt=he.width,At=he.height,Nt=he.depth||1,Ut=0,Gt=0,Wt=0),K!==null?(Ft=K.x,jt=K.y,le=K.z):(Ft=0,jt=0,le=0);const ze=qt.convert(G.format),te=qt.convert(G.type);let Ot;G.isData3DTexture?(w.setTexture3D(G,0),Ot=T.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(w.setTexture2DArray(G,0),Ot=T.TEXTURE_2D_ARRAY):(w.setTexture2D(G,0),Ot=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,G.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,G.unpackAlignment);const Sn=T.getParameter(T.UNPACK_ROW_LENGTH),ee=T.getParameter(T.UNPACK_IMAGE_HEIGHT),rn=T.getParameter(T.UNPACK_SKIP_PIXELS),gi=T.getParameter(T.UNPACK_SKIP_ROWS),Ve=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,he.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,he.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Ut),T.pixelStorei(T.UNPACK_SKIP_ROWS,Gt),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Wt);const ji=b.isDataArrayTexture||b.isData3DTexture,ue=G.isDataArrayTexture||G.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const un=ut.get(b),Qi=ut.get(G),$e=ut.get(un.__renderTarget),Fn=ut.get(Qi.__renderTarget);lt.bindFramebuffer(T.READ_FRAMEBUFFER,$e.__webglFramebuffer),lt.bindFramebuffer(T.DRAW_FRAMEBUFFER,Fn.__webglFramebuffer);for(let On=0;On<Nt;On++)ji&&T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,ut.get(b).__webglTexture,V,Wt+On),b.isDepthTexture?(ue&&T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,ut.get(G).__webglTexture,V,le+On),T.blitFramebuffer(Ut,Gt,xt,At,Ft,jt,xt,At,T.DEPTH_BUFFER_BIT,T.NEAREST)):ue?T.copyTexSubImage3D(Ot,V,Ft,jt,le+On,Ut,Gt,xt,At):T.copyTexSubImage2D(Ot,V,Ft,jt,le+On,Ut,Gt,xt,At);lt.bindFramebuffer(T.READ_FRAMEBUFFER,null),lt.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else ue?b.isDataTexture||b.isData3DTexture?T.texSubImage3D(Ot,V,Ft,jt,le,xt,At,Nt,ze,te,he.data):G.isCompressedArrayTexture?T.compressedTexSubImage3D(Ot,V,Ft,jt,le,xt,At,Nt,ze,he.data):T.texSubImage3D(Ot,V,Ft,jt,le,xt,At,Nt,ze,te,he):b.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,V,Ft,jt,xt,At,ze,te,he.data):b.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,V,Ft,jt,he.width,he.height,ze,he.data):T.texSubImage2D(T.TEXTURE_2D,V,Ft,jt,xt,At,ze,te,he);T.pixelStorei(T.UNPACK_ROW_LENGTH,Sn),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,ee),T.pixelStorei(T.UNPACK_SKIP_PIXELS,rn),T.pixelStorei(T.UNPACK_SKIP_ROWS,gi),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Ve),V===0&&G.generateMipmaps&&T.generateMipmap(Ot),lt.unbindTexture()},this.copyTextureToTexture3D=function(b,G,$=null,K=null,V=0){return b.isTexture!==!0&&(ds("WebGLRenderer: copyTextureToTexture3D function signature has changed."),$=arguments[0]||null,K=arguments[1]||null,b=arguments[2],G=arguments[3],V=arguments[4]||0),ds('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,G,$,K,V)},this.initRenderTarget=function(b){ut.get(b).__webglFramebuffer===void 0&&w.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?w.setTextureCube(b,0):b.isData3DTexture?w.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?w.setTexture2DArray(b,0):w.setTexture2D(b,0),lt.unbindTexture()},this.resetState=function(){C=0,A=0,L=null,lt.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}}class Ta{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new gt(t),this.density=e}clone(){return new Ta(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class zl extends de{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xn,this.environmentIntensity=1,this.environmentRotation=new xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class G0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ea,this.updateRanges=[],this.version=0,this.uuid=Dn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const De=new D;class yr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyMatrix4(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.applyNormalMatrix(t),this.setXYZ(e,De.x,De.y,De.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)De.fromBufferAttribute(this,e),De.transformDirection(t),this.setXYZ(e,De.x,De.y,De.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=dn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=dn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=dn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=dn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=dn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),s=re(s,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Oe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new yr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class fh extends $n{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new gt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ii;const rs=new D,Di=new D,Ni=new D,Ui=new ht,os=new ht,dh=new ne,Qs=new D,as=new D,tr=new D,Hl=new ht,ao=new ht,Gl=new ht;class V0 extends de{constructor(t=new fh){if(super(),this.isSprite=!0,this.type="Sprite",Ii===void 0){Ii=new ye;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new G0(e,5);Ii.setIndex([0,1,2,0,2,3]),Ii.setAttribute("position",new yr(n,3,0,!1)),Ii.setAttribute("uv",new yr(n,2,3,!1))}this.geometry=Ii,this.material=t,this.center=new ht(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Di.setFromMatrixScale(this.matrixWorld),dh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ni.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Di.multiplyScalar(-Ni.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;er(Qs.set(-.5,-.5,0),Ni,o,Di,s,r),er(as.set(.5,-.5,0),Ni,o,Di,s,r),er(tr.set(.5,.5,0),Ni,o,Di,s,r),Hl.set(0,0),ao.set(1,0),Gl.set(1,1);let a=t.ray.intersectTriangle(Qs,as,tr,!1,rs);if(a===null&&(er(as.set(-.5,.5,0),Ni,o,Di,s,r),ao.set(0,1),a=t.ray.intersectTriangle(Qs,tr,as,!1,rs),a===null))return;const l=t.ray.origin.distanceTo(rs);l<t.near||l>t.far||e.push({distance:l,point:rs.clone(),uv:en.getInterpolation(rs,Qs,as,tr,Hl,ao,Gl,new ht),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function er(i,t,e,n,s,r){Ui.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(os.x=r*Ui.x-s*Ui.y,os.y=s*Ui.x+r*Ui.y):os.copy(Ui),i.copy(t),i.x+=os.x,i.y+=os.y,i.applyMatrix4(dh)}class W0 extends Ie{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Fe,h=Fe,u,f){super(null,o,a,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vl extends Oe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Fi=new ne,Wl=new ne,nr=[],Xl=new pi,X0=new ne,ls=new kt,cs=new mi;class we extends kt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Vl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,X0)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new pi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Fi),Xl.copy(t.boundingBox).applyMatrix4(Fi),this.boundingBox.union(Xl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new mi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Fi),cs.copy(t.boundingSphere).applyMatrix4(Fi),this.boundingSphere.union(cs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(ls.geometry=this.geometry,ls.material=this.material,ls.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),cs.copy(this.boundingSphere),cs.applyMatrix4(n),t.ray.intersectsSphere(cs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Fi),Wl.multiplyMatrices(n,Fi),ls.matrixWorld=Wl,ls.raycast(t,nr);for(let o=0,a=nr.length;o<a;o++){const l=nr[o];l.instanceId=r,l.object=this,e.push(l)}nr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Vl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new W0(new Float32Array(s*this.count),s,this.count,va,_n));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class ph extends $n{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new gt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Sr=new D,br=new D,ql=new ne,hs=new Sa,ir=new mi,lo=new D,Yl=new D;class q0 extends de{constructor(t=new ye,e=new ph){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Sr.fromBufferAttribute(e,s-1),br.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Sr.distanceTo(br);t.setAttribute("lineDistance",new ce(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ir.copy(n.boundingSphere),ir.applyMatrix4(s),ir.radius+=r,t.ray.intersectsSphere(ir)===!1)return;ql.copy(s).invert(),hs.copy(t.ray).applyMatrix4(ql);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const d=h.getX(_),E=h.getX(_+1),S=sr(this,t,hs,l,d,E);S&&e.push(S)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(p),d=sr(this,t,hs,l,_,m);d&&e.push(d)}}else{const p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const d=sr(this,t,hs,l,_,_+1);d&&e.push(d)}if(this.isLineLoop){const _=sr(this,t,hs,l,g-1,p);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function sr(i,t,e,n,s,r){const o=i.geometry.attributes.position;if(Sr.fromBufferAttribute(o,s),br.fromBufferAttribute(o,r),e.distanceSqToSegment(Sr,br,lo,Yl)>n)return;lo.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(lo);if(!(l<t.near||l>t.far))return{distance:l,point:Yl.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const $l=new D,Kl=new D;class Y0 extends q0{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)$l.fromBufferAttribute(e,s),Kl.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+$l.distanceTo(Kl);t.setAttribute("lineDistance",new ce(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Aa extends $n{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new gt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Zl=new ne,ra=new Sa,rr=new mi,or=new D;class mh extends de{constructor(t=new ye,e=new Aa){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),rr.copy(n.boundingSphere),rr.applyMatrix4(s),rr.radius+=r,t.ray.intersectsSphere(rr)===!1)return;Zl.copy(s).invert(),ra.copy(t.ray).applyMatrix4(Zl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=f,_=p;g<_;g++){const m=c.getX(g);or.fromBufferAttribute(u,m),Jl(or,m,l,s,t,e,this)}}else{const f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=f,_=p;g<_;g++)or.fromBufferAttribute(u,g),Jl(or,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Jl(i,t,e,n,s,r,o){const a=ra.distanceSqToPoint(i);if(a<e){const l=new D;ra.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class $0 extends Ie{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Mn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],f=n[s+1]-h,p=(o-h)/f;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new ht:new D);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new D,s=[],r=[],o=[],a=new D,l=new ne;for(let p=0;p<=t;p++){const g=p/t;s[p]=this.getTangentAt(g,new D)}r[0]=new D,o[0]=new D;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Ee(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Ee(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ra extends Mn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new ht){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*h-p*u+this.aX,c=f*u+p*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class K0 extends Ra{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Ca(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let f=(o-r)/c-(a-r)/(c+h)+(a-o)/h,p=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,p*=h,s(o,a,f,p)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const ar=new D,co=new Ca,ho=new Ca,uo=new Ca;class Z0 extends Mn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new D){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(ar.subVectors(s[0],s[1]).add(s[0]),c=ar);const u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(ar.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=ar),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),p),_=Math.pow(u.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(h),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),co.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,_,m),ho.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,_,m),uo.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(co.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),ho.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),uo.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(co.calc(l),ho.calc(l),uo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function jl(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function J0(i,t){const e=1-i;return e*e*t}function j0(i,t){return 2*(1-i)*i*t}function Q0(i,t){return i*i*t}function ms(i,t,e,n){return J0(i,t)+j0(i,e)+Q0(i,n)}function tg(i,t){const e=1-i;return e*e*e*t}function eg(i,t){const e=1-i;return 3*e*e*i*t}function ng(i,t){return 3*(1-i)*i*i*t}function ig(i,t){return i*i*i*t}function gs(i,t,e,n,s){return tg(i,t)+eg(i,e)+ng(i,n)+ig(i,s)}class gh extends Mn{constructor(t=new ht,e=new ht,n=new ht,s=new ht){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ht){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(gs(t,s.x,r.x,o.x,a.x),gs(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class sg extends Mn{constructor(t=new D,e=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new D){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(gs(t,s.x,r.x,o.x,a.x),gs(t,s.y,r.y,o.y,a.y),gs(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class _h extends Mn{constructor(t=new ht,e=new ht){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ht){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ht){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class rg extends Mn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class vh extends Mn{constructor(t=new ht,e=new ht,n=new ht){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ht){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ms(t,s.x,r.x,o.x),ms(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class og extends Mn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ms(t,s.x,r.x,o.x),ms(t,s.y,r.y,o.y),ms(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class xh extends Mn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ht){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(jl(a,l.x,c.x,h.x,u.x),jl(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new ht().fromArray(s))}return this}}var oa=Object.freeze({__proto__:null,ArcCurve:K0,CatmullRomCurve3:Z0,CubicBezierCurve:gh,CubicBezierCurve3:sg,EllipseCurve:Ra,LineCurve:_h,LineCurve3:rg,QuadraticBezierCurve:vh,QuadraticBezierCurve3:og,SplineCurve:xh});class ag extends Mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new oa[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new oa[s.type]().fromJSON(s))}return this}}class aa extends ag{constructor(t){super(),this.type="Path",this.currentPoint=new ht,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new _h(this.currentPoint.clone(),new ht(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new vh(this.currentPoint.clone(),new ht(t,e),new ht(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new gh(this.currentPoint.clone(),new ht(t,e),new ht(n,s),new ht(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new xh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){const c=new Ra(t,e,n,s,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Pa extends ye{constructor(t=[new ht(0,-.5),new ht(.5,0),new ht(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ee(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/e,u=new D,f=new ht,p=new D,g=new D,_=new D;let m=0,d=0;for(let E=0;E<=t.length-1;E++)switch(E){case 0:m=t[E+1].x-t[E].x,d=t[E+1].y-t[E].y,p.x=d*1,p.y=-m,p.z=d*0,_.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:m=t[E+1].x-t[E].x,d=t[E+1].y-t[E].y,p.x=d*1,p.y=-m,p.z=d*0,g.copy(p),p.x+=_.x,p.y+=_.y,p.z+=_.z,p.normalize(),l.push(p.x,p.y,p.z),_.copy(g)}for(let E=0;E<=e;E++){const S=n+E*h*s,x=Math.sin(S),F=Math.cos(S);for(let C=0;C<=t.length-1;C++){u.x=t[C].x*x,u.y=t[C].y,u.z=t[C].x*F,o.push(u.x,u.y,u.z),f.x=E/e,f.y=C/(t.length-1),a.push(f.x,f.y);const A=l[3*C+0]*x,L=l[3*C+1],y=l[3*C+0]*F;c.push(A,L,y)}}for(let E=0;E<e;E++)for(let S=0;S<t.length-1;S++){const x=S+E*t.length,F=x,C=x+t.length,A=x+t.length+1,L=x+1;r.push(F,C,L),r.push(A,L,C)}this.setIndex(r),this.setAttribute("position",new ce(o,3)),this.setAttribute("uv",new ce(a,2)),this.setAttribute("normal",new ce(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pa(t.points,t.segments,t.phiStart,t.phiLength)}}class pn extends ye{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],p=[];let g=0;const _=[],m=n/2;let d=0;E(),o===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new ce(u,3)),this.setAttribute("normal",new ce(f,3)),this.setAttribute("uv",new ce(p,2));function E(){const x=new D,F=new D;let C=0;const A=(e-t)/n;for(let L=0;L<=r;L++){const y=[],v=L/r,R=v*(e-t)+t;for(let N=0;N<=s;N++){const U=N/s,O=U*l+a,X=Math.sin(O),W=Math.cos(O);F.x=R*X,F.y=-v*n+m,F.z=R*W,u.push(F.x,F.y,F.z),x.set(X,A,W).normalize(),f.push(x.x,x.y,x.z),p.push(U,1-v),y.push(g++)}_.push(y)}for(let L=0;L<s;L++)for(let y=0;y<r;y++){const v=_[y][L],R=_[y+1][L],N=_[y+1][L+1],U=_[y][L+1];(t>0||y!==0)&&(h.push(v,R,U),C+=3),(e>0||y!==r-1)&&(h.push(R,N,U),C+=3)}c.addGroup(d,C,0),d+=C}function S(x){const F=g,C=new ht,A=new D;let L=0;const y=x===!0?t:e,v=x===!0?1:-1;for(let N=1;N<=s;N++)u.push(0,m*v,0),f.push(0,v,0),p.push(.5,.5),g++;const R=g;for(let N=0;N<=s;N++){const O=N/s*l+a,X=Math.cos(O),W=Math.sin(O);A.x=y*W,A.y=m*v,A.z=y*X,u.push(A.x,A.y,A.z),f.push(0,v,0),C.x=X*.5+.5,C.y=W*.5*v+.5,p.push(C.x,C.y),g++}for(let N=0;N<s;N++){const U=F+N,O=R+N;x===!0?h.push(O,O+1,U):h.push(O+1,O,U),L+=3}c.addGroup(d,L,x===!0?1:2),d+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class La extends aa{constructor(t){super(t),this.uuid=Dn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new aa().fromJSON(s))}return this}}const lg={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Mh(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,f,p;if(n&&(r=dg(i,t,r,e)),i.length>80*e){a=c=i[0],l=h=i[1];for(let g=e;g<s;g+=e)u=i[g],f=i[g+1],u<a&&(a=u),f<l&&(l=f),u>c&&(c=u),f>h&&(h=f);p=Math.max(c-a,h-l),p=p!==0?32767/p:0}return Ss(r,o,e,a,l,p,0),o}};function Mh(i,t,e,n,s){let r,o;if(s===Eg(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Ql(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Ql(r,i[r],i[r+1],o);return o&&Ar(o,o.next)&&(Es(o),o=o.next),o}function di(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Ar(e,e.next)||me(e.prev,e,e.next)===0)){if(Es(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ss(i,t,e,n,s,r,o){if(!i)return;!o&&r&&vg(i,n,s,r);let a=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?hg(i,n,s,r):cg(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),Es(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=ug(di(i),t,e),Ss(i,t,e,n,s,r,2)):o===2&&fg(i,t,e,n,s,r):Ss(di(i),t,e,n,s,r,1);break}}}function cg(i){const t=i.prev,e=i,n=i.next;if(me(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,f=s>r?s>o?s:o:r>o?r:o,p=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=p&&Bi(s,a,r,l,o,c,g.x,g.y)&&me(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function hg(i,t,e,n){const s=i.prev,r=i,o=i.next;if(me(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,f=o.y,p=a<l?a<c?a:c:l<c?l:c,g=h<u?h<f?h:f:u<f?u:f,_=a>l?a>c?a:c:l>c?l:c,m=h>u?h>f?h:f:u>f?u:f,d=la(p,g,t,e,n),E=la(_,m,t,e,n);let S=i.prevZ,x=i.nextZ;for(;S&&S.z>=d&&x&&x.z<=E;){if(S.x>=p&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&Bi(a,h,l,u,c,f,S.x,S.y)&&me(S.prev,S,S.next)>=0||(S=S.prevZ,x.x>=p&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&Bi(a,h,l,u,c,f,x.x,x.y)&&me(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;S&&S.z>=d;){if(S.x>=p&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&Bi(a,h,l,u,c,f,S.x,S.y)&&me(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;x&&x.z<=E;){if(x.x>=p&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&Bi(a,h,l,u,c,f,x.x,x.y)&&me(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function ug(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!Ar(s,r)&&yh(s,n,n.next,r)&&bs(s,r)&&bs(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Es(n),Es(n.next),n=i=r),n=n.next}while(n!==i);return di(n)}function fg(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&yg(o,a)){let l=Sh(o,a);o=di(o,o.next),l=di(l,l.next),Ss(o,t,e,n,s,r,0),Ss(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function dg(i,t,e,n){const s=[];let r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=Mh(i,a,l,n,!1),c===c.next&&(c.steiner=!0),s.push(Mg(c));for(s.sort(pg),r=0;r<s.length;r++)e=mg(s[r],e);return e}function pg(i,t){return i.x-t.x}function mg(i,t){const e=gg(i,t);if(!e)return t;const n=Sh(e,i);return di(n,n.next),di(e,e.next)}function gg(i,t){let e=t,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,l=s.x,c=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&Bi(o<c?r:n,o,l,c,o<c?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),bs(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&_g(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function _g(i,t){return me(i.prev,i,t.prev)<0&&me(t.next,i,i.next)<0}function vg(i,t,e,n){let s=i;do s.z===0&&(s.z=la(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,xg(s)}function xg(i){let t,e,n,s,r,o,a,l,c=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(o>1);return i}function la(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Mg(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Bi(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function yg(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Sg(i,t)&&(bs(i,t)&&bs(t,i)&&bg(i,t)&&(me(i.prev,i,t.prev)||me(i,t.prev,t))||Ar(i,t)&&me(i.prev,i,i.next)>0&&me(t.prev,t,t.next)>0)}function me(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Ar(i,t){return i.x===t.x&&i.y===t.y}function yh(i,t,e,n){const s=cr(me(i,t,e)),r=cr(me(i,t,n)),o=cr(me(e,n,i)),a=cr(me(e,n,t));return!!(s!==r&&o!==a||s===0&&lr(i,e,t)||r===0&&lr(i,n,t)||o===0&&lr(e,i,n)||a===0&&lr(e,t,n))}function lr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function cr(i){return i>0?1:i<0?-1:0}function Sg(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&yh(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function bs(i,t){return me(i.prev,i,i.next)<0?me(i,t,i.next)>=0&&me(i,i.prev,t)>=0:me(i,t,i.prev)<0||me(i,i.next,t)<0}function bg(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Sh(i,t){const e=new ca(i.i,i.x,i.y),n=new ca(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Ql(i,t,e,n){const s=new ca(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Es(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function ca(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Eg(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class _s{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return _s.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];tc(t),ec(n,t);let o=t.length;e.forEach(tc);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,ec(n,e[l]);const a=lg.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function tc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function ec(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Rr extends ye{constructor(t=new La([new ht(.5,.5),new ht(-.5,.5),new ht(-.5,-.5),new ht(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new ce(s,3)),this.setAttribute("uv",new ce(r,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:p-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const d=e.extrudePath,E=e.UVGenerator!==void 0?e.UVGenerator:wg;let S,x=!1,F,C,A,L;d&&(S=d.getSpacedPoints(h),x=!0,f=!1,F=d.computeFrenetFrames(h,!1),C=new D,A=new D,L=new D),f||(m=0,p=0,g=0,_=0);const y=a.extractPoints(c);let v=y.shape;const R=y.holes;if(!_s.isClockWise(v)){v=v.reverse();for(let Z=0,J=R.length;Z<J;Z++){const T=R[Z];_s.isClockWise(T)&&(R[Z]=T.reverse())}}const U=_s.triangulateShape(v,R),O=v;for(let Z=0,J=R.length;Z<J;Z++){const T=R[Z];v=v.concat(T)}function X(Z,J,T){return J||console.error("THREE.ExtrudeGeometry: vec does not exist"),Z.clone().addScaledVector(J,T)}const W=v.length,H=U.length;function B(Z,J,T){let mt,j,at;const lt=Z.x-J.x,yt=Z.y-J.y,ut=T.x-Z.x,w=T.y-Z.y,M=lt*lt+yt*yt,q=lt*w-yt*ut;if(Math.abs(q)>Number.EPSILON){const it=Math.sqrt(M),nt=Math.sqrt(ut*ut+w*w),et=J.x-yt/it,Rt=J.y+lt/it,Mt=T.x-w/nt,Ct=T.y+ut/nt,$t=((Mt-et)*w-(Ct-Rt)*ut)/(lt*w-yt*ut);mt=et+lt*$t-Z.x,j=Rt+yt*$t-Z.y;const _t=mt*mt+j*j;if(_t<=2)return new ht(mt,j);at=Math.sqrt(_t/2)}else{let it=!1;lt>Number.EPSILON?ut>Number.EPSILON&&(it=!0):lt<-Number.EPSILON?ut<-Number.EPSILON&&(it=!0):Math.sign(yt)===Math.sign(w)&&(it=!0),it?(mt=-yt,j=lt,at=Math.sqrt(M)):(mt=lt,j=yt,at=Math.sqrt(M/2))}return new ht(mt/at,j/at)}const Q=[];for(let Z=0,J=O.length,T=J-1,mt=Z+1;Z<J;Z++,T++,mt++)T===J&&(T=0),mt===J&&(mt=0),Q[Z]=B(O[Z],O[T],O[mt]);const pt=[];let ft,dt=Q.concat();for(let Z=0,J=R.length;Z<J;Z++){const T=R[Z];ft=[];for(let mt=0,j=T.length,at=j-1,lt=mt+1;mt<j;mt++,at++,lt++)at===j&&(at=0),lt===j&&(lt=0),ft[mt]=B(T[mt],T[at],T[lt]);pt.push(ft),dt=dt.concat(ft)}for(let Z=0;Z<m;Z++){const J=Z/m,T=p*Math.cos(J*Math.PI/2),mt=g*Math.sin(J*Math.PI/2)+_;for(let j=0,at=O.length;j<at;j++){const lt=X(O[j],Q[j],mt);Y(lt.x,lt.y,-T)}for(let j=0,at=R.length;j<at;j++){const lt=R[j];ft=pt[j];for(let yt=0,ut=lt.length;yt<ut;yt++){const w=X(lt[yt],ft[yt],mt);Y(w.x,w.y,-T)}}}const St=g+_;for(let Z=0;Z<W;Z++){const J=f?X(v[Z],dt[Z],St):v[Z];x?(A.copy(F.normals[0]).multiplyScalar(J.x),C.copy(F.binormals[0]).multiplyScalar(J.y),L.copy(S[0]).add(A).add(C),Y(L.x,L.y,L.z)):Y(J.x,J.y,0)}for(let Z=1;Z<=h;Z++)for(let J=0;J<W;J++){const T=f?X(v[J],dt[J],St):v[J];x?(A.copy(F.normals[Z]).multiplyScalar(T.x),C.copy(F.binormals[Z]).multiplyScalar(T.y),L.copy(S[Z]).add(A).add(C),Y(L.x,L.y,L.z)):Y(T.x,T.y,u/h*Z)}for(let Z=m-1;Z>=0;Z--){const J=Z/m,T=p*Math.cos(J*Math.PI/2),mt=g*Math.sin(J*Math.PI/2)+_;for(let j=0,at=O.length;j<at;j++){const lt=X(O[j],Q[j],mt);Y(lt.x,lt.y,u+T)}for(let j=0,at=R.length;j<at;j++){const lt=R[j];ft=pt[j];for(let yt=0,ut=lt.length;yt<ut;yt++){const w=X(lt[yt],ft[yt],mt);x?Y(w.x,w.y+S[h-1].y,S[h-1].x+T):Y(w.x,w.y,u+T)}}}z(),I();function z(){const Z=s.length/3;if(f){let J=0,T=W*J;for(let mt=0;mt<H;mt++){const j=U[mt];ot(j[2]+T,j[1]+T,j[0]+T)}J=h+m*2,T=W*J;for(let mt=0;mt<H;mt++){const j=U[mt];ot(j[0]+T,j[1]+T,j[2]+T)}}else{for(let J=0;J<H;J++){const T=U[J];ot(T[2],T[1],T[0])}for(let J=0;J<H;J++){const T=U[J];ot(T[0]+W*h,T[1]+W*h,T[2]+W*h)}}n.addGroup(Z,s.length/3-Z,0)}function I(){const Z=s.length/3;let J=0;rt(O,J),J+=O.length;for(let T=0,mt=R.length;T<mt;T++){const j=R[T];rt(j,J),J+=j.length}n.addGroup(Z,s.length/3-Z,1)}function rt(Z,J){let T=Z.length;for(;--T>=0;){const mt=T;let j=T-1;j<0&&(j=Z.length-1);for(let at=0,lt=h+m*2;at<lt;at++){const yt=W*at,ut=W*(at+1),w=J+mt+yt,M=J+j+yt,q=J+j+ut,it=J+mt+ut;vt(w,M,q,it)}}}function Y(Z,J,T){l.push(Z),l.push(J),l.push(T)}function ot(Z,J,T){Lt(Z),Lt(J),Lt(T);const mt=s.length/3,j=E.generateTopUV(n,s,mt-3,mt-2,mt-1);zt(j[0]),zt(j[1]),zt(j[2])}function vt(Z,J,T,mt){Lt(Z),Lt(J),Lt(mt),Lt(J),Lt(T),Lt(mt);const j=s.length/3,at=E.generateSideWallUV(n,s,j-6,j-3,j-2,j-1);zt(at[0]),zt(at[1]),zt(at[3]),zt(at[1]),zt(at[2]),zt(at[3])}function Lt(Z){s.push(l[Z*3+0]),s.push(l[Z*3+1]),s.push(l[Z*3+2])}function zt(Z){r.push(Z.x),r.push(Z.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Tg(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new oa[s.type]().fromJSON(s)),new Rr(n,t.options)}}const wg={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new ht(r,o),new ht(a,l),new ht(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],f=t[s*3],p=t[s*3+1],g=t[s*3+2],_=t[r*3],m=t[r*3+1],d=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new ht(o,1-l),new ht(c,1-u),new ht(f,1-g),new ht(_,1-d)]:[new ht(a,1-l),new ht(h,1-u),new ht(p,1-g),new ht(m,1-d)]}};function Tg(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class ws extends ye{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new D,f=new D,p=[],g=[],_=[],m=[];for(let d=0;d<=n;d++){const E=[],S=d/n;let x=0;d===0&&o===0?x=.5/e:d===n&&l===Math.PI&&(x=-.5/e);for(let F=0;F<=e;F++){const C=F/e;u.x=-t*Math.cos(s+C*r)*Math.sin(o+S*a),u.y=t*Math.cos(o+S*a),u.z=t*Math.sin(s+C*r)*Math.sin(o+S*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(C+x,1-S),E.push(c++)}h.push(E)}for(let d=0;d<n;d++)for(let E=0;E<e;E++){const S=h[d][E+1],x=h[d][E],F=h[d+1][E],C=h[d+1][E+1];(d!==0||o>0)&&p.push(S,x,C),(d!==n-1||l<Math.PI)&&p.push(x,F,C)}this.setIndex(p),this.setAttribute("position",new ce(g,3)),this.setAttribute("normal",new ce(_,3)),this.setAttribute("uv",new ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ws(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ag extends Pe{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class pe extends $n{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new gt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$c,this.normalScale=new ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class bh extends pe{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ht(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ee(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new gt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new gt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new gt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Cr extends de{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new gt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Rg extends Cr{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.groundColor=new gt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const fo=new ne,nc=new D,ic=new D;class Ia{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ht(512,512),this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ba,this._frameExtents=new ht(1,1),this._viewportCount=1,this._viewports=[new oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;nc.setFromMatrixPosition(t.matrixWorld),e.position.copy(nc),ic.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ic),e.updateMatrixWorld(),fo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(fo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Cg extends Ia{constructor(){super(new Ge(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=xr*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Pg extends Cr{constructor(t,e,n=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.target=new de,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Cg}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const sc=new ne,us=new D,po=new D;class Lg extends Ia{constructor(){super(new Ge(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ht(4,2),this._viewportCount=6,this._viewports=[new oe(2,1,1,1),new oe(0,1,1,1),new oe(3,1,1,1),new oe(1,1,1,1),new oe(3,0,1,1),new oe(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),us.setFromMatrixPosition(t.matrixWorld),n.position.copy(us),po.copy(n.position),po.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(po),n.updateMatrixWorld(),s.makeTranslation(-us.x,-us.y,-us.z),sc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sc)}}class hr extends Cr{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Lg}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Ig extends Ia{constructor(){super(new Ea(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Dg extends Cr{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.target=new de,this.shadow=new Ig}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Ng{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=rc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=rc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function rc(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:fa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=fa);const Eh={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ji{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Ug=new Ea(-1,1,1,-1,0,1);class Fg extends ye{constructor(){super(),this.setAttribute("position",new ce([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ce([0,2,0,0,2,0],2))}}const Og=new Fg;class Da{constructor(t){this._mesh=new kt(Og,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Ug)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class wh extends Ji{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Pe?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=ys.clone(t.uniforms),this.material=new Pe({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Da(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class oc extends Ji{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class Bg extends Ji{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class kg{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new ht);this._width=n.width,this._height=n.height,e=new nn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:vn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new wh(Eh),this.copyPass.material.blending=In,this.clock=new Ng}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}oc!==void 0&&(o instanceof oc?n=!0:o instanceof Bg&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new ht);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const zg={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Hg extends Ji{constructor(){super();const t=zg;this.uniforms=ys.clone(t.uniforms),this.material=new Ag({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Da(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Jt.getTransfer(this._outputColorSpace)===se&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Dc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Nc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Uc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===pa?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Fc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Oc&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Gg extends Ji{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new gt}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const Vg={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new gt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Yi extends Ji{constructor(t,e,n,s){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new ht(t.x,t.y):new ht(256,256),this.clearColor=new gt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new nn(r,o,{type:vn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new nn(r,o,{type:vn});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const p=new nn(r,o,{type:vn});p.texture.name="UnrealBloomPass.v"+u,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),o=Math.round(o/2)}const a=Vg;this.highPassUniforms=ys.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Pe({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ht(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Eh;this.copyUniforms=ys.clone(h.uniforms),this.blendMaterial=new Pe({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:mn,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new gt,this.oldClearAlpha=1,this.basic=new Kt,this.fsQuad=new Da(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new ht(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Yi.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Yi.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Pe({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new ht(.5,.5)},direction:{value:new ht(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new Pe({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Yi.BlurDirectionX=new ht(1,0);Yi.BlurDirectionY=new ht(0,1);const ac=[{name:"Kestrel",paint:"#b9c0c9",accent:"#2cf6ff",length:4.5,width:1.96,wheelbase:2.72,track:1.68,wheelR:.35,top:[[-2.18,.4],[-2.3,.76],[-2,.88],[-1,.86],[.7,.74],[1.9,.56],[2.22,.4]],canopy:[[-1.78,.86],[-1,1.12],[-.15,1.15],[.72,.76]],canopyWidth:.7,wing:"low",flare:.02},{name:"Rook",paint:"#c2185b",accent:"#ff2ea6",length:4.4,width:1.94,wheelbase:2.68,track:1.66,wheelR:.34,top:[[-2.2,.46],[-2.22,.78],[-1.6,.84],[-.4,.82],[.6,.68],[2,.42],[2.2,.3]],canopy:[[-1.4,.82],[-.7,1.06],[0,1.07],[.6,.7]],canopyWidth:.6,wing:"tall",flare:0},{name:"Sable",paint:"#4b2a8a",accent:"#a07bff",length:4.8,width:1.98,wheelbase:2.9,track:1.7,wheelR:.36,top:[[-2.4,.5],[-2.38,.86],[-1.6,.95],[-.4,.9],[.9,.78],[2.2,.6],[2.42,.44]],canopy:[[-2,.94],[-1.05,1.22],[.05,1.24],[.95,.8]],canopyWidth:.78,wing:"none",flare:0},{name:"Cinder",paint:"#e07a12",accent:"#ffb347",length:4.2,width:2.04,wheelbase:2.56,track:1.76,wheelR:.37,top:[[-2.1,.48],[-2.12,.92],[-1.5,.98],[-.7,.96],[.5,.82],[1.8,.62],[2.1,.46]],canopy:[[-1.45,.96],[-.8,1.26],[.05,1.27],[.5,.84]],canopyWidth:.74,wing:"low",flare:.08}];function Wg(i){return{glass:new bh({color:658964,metalness:0,roughness:.04,clearcoat:1,clearcoatRoughness:.02,envMapIntensity:1.6,reflectivity:.9}),rubber:new pe({color:1315862,roughness:.88,metalness:0}),rim:new pe({color:12172998,roughness:.28,metalness:1}),disc:new pe({color:4869200,roughness:.45,metalness:.9}),trim:new pe({color:789776,roughness:.55,metalness:.2}),seam:new Kt({color:328966}),headlight:new pe({color:1118481,emissive:15135999,emissiveIntensity:6,roughness:.2}),shadow:new Kt({map:i,color:0,transparent:!0,opacity:.75,depthWrite:!1}),glow:i}}function lc(i,t,e){const n=new La;n.moveTo(i[0][0],i[0][1]);for(let r=1;r<i.length;r++)n.lineTo(i[r][0],i[r][1]);n.closePath();const s=new Rr(n,{depth:t,bevelEnabled:!0,bevelThickness:e,bevelSize:e,bevelSegments:4,curveSegments:6});return s.rotateY(Math.PI/2),s.translate(-t/2,0,0),s.computeVertexNormals(),s}function Xg(i){const t=[],e=i.wheelbase/2,n=i.wheelR+.07,s=i.wheelR+.02,r=.2,o=i.top[0][0],a=i.top[i.top.length-1][0];t.push([o+.03,r+.04]);for(const l of[-e,e]){t.push([l-n-.02,r]);for(let c=0;c<=10;c++){const h=Math.PI-c/10*Math.PI;t.push([l+Math.cos(h)*n,s+Math.sin(h)*n])}t.push([l+n+.02,r])}t.push([a-.08,r+.02]);for(let l=i.top.length-1;l>=0;l--)t.push(i.top[l]);return t}function cc(i,t,e,n){const s=i.attributes.position;for(let r=0;r<s.count;r++){const o=s.getY(r),a=Math.min(1,Math.max(0,(o-t)/(e-t)));s.setX(r,s.getX(r)*(1-(1-n)*a*a))}s.needsUpdate=!0,i.computeVertexNormals()}function qg(i,t){const e=[],n=i*.72;e.push(new ht(n,-t/2));for(let r=0;r<=8;r++){const o=-Math.PI/2+r/8*Math.PI;e.push(new ht(i-.05+Math.cos(o)*.05,Math.sin(o)*(t/2)))}e.push(new ht(n,t/2));const s=new Pa(e,28);return s.rotateZ(Math.PI/2),s}class Yg{constructor(t,e){P(this,"root",new Ye);P(this,"body",new Ye);P(this,"spec");P(this,"wheels",[]);P(this,"tail");P(this,"paint");P(this,"underMat");P(this,"exhaust",[]);P(this,"exhaustMat");P(this,"spinA",0);P(this,"geoms",[]);P(this,"mats",[]);P(this,"exhaustPos",new D);P(this,"halfLength");this.spec=t,this.halfLength=t.length/2,this.root.add(this.body),this.root.rotation.order="YXZ";const n=t.width,s=H=>(this.geoms.push(H),H),r=H=>(this.mats.push(H),H);this.paint=r(new bh({color:t.paint,metalness:.55,roughness:.32,clearcoat:1,clearcoatRoughness:.06,envMapIntensity:1.2})),this.tail=r(new pe({color:2228224,emissive:16718378,emissiveIntensity:2.2,roughness:.3}));const o=r(new pe({color:328965,emissive:new gt(t.accent),emissiveIntensity:3.5,roughness:.3}));this.underMat=r(new pe({color:0,emissive:new gt(t.accent),emissiveIntensity:.9}));const a=(H,B,Q=this.body,pt=!0)=>{const ft=new kt(H,B);return ft.castShadow=pt,Q.add(ft),ft},l=(H,B,Q)=>s(new fe(H,B,Q)),c=.07,h=s(lc(Xg(t),n-c*2-.04,c));if(cc(h,.45,.95,.8),a(h,this.paint),t.flare>0)for(const H of[-1,1])for(const B of[-t.wheelbase/2,t.wheelbase/2])a(l(t.flare+.06,.12,t.wheelR*2.5),this.paint).position.set(H*(n/2+t.flare/2-.02),t.wheelR*2+.06,-B);const u=n*t.canopyWidth,f=s(lc(t.canopy.concat([[t.canopy[t.canopy.length-1][0]-.1,t.canopy[0][1]-.04]]),u-.24,.12));cc(f,.8,1.28,.72),a(f,e.glass);const p=n/2-.005,g=[-t.canopy[t.canopy.length-1][0]+.05,-t.canopy[0][0]-.25];for(const H of[-1,1]){for(const pt of g)a(l(.006,.36,.012),e.seam,this.body,!1).position.set(H*p,.56,pt);a(l(.008,.012,t.wheelbase-t.wheelR*2.4),e.seam,this.body,!1).position.set(H*p,.36,0),a(l(.05,.07,t.wheelbase-t.wheelR*2.3),e.trim).position.set(H*(n/2-.02),.22,0)}const _=a(l(n*.7,.008,.01),e.seam,this.body,!1),m=t.top[t.top.length-2];_.position.set(0,m[1]+.035,-m[0]+.15),_.rotation.x=-.15;const d=t.top[t.top.length-1][0],E=t.top[0][0];a(l(n*.94,.04,.3),e.trim).position.set(0,.17,-d-.02),a(l(n*.8,.16,.3),e.trim).position.set(0,.26,-E+.12);for(let H=-2;H<=2;H++)a(l(.02,.14,.32),e.trim).position.set(H*.22,.24,-E+.14);a(l(n*.78,.035,.04),o,this.body,!1).position.set(0,t.top[t.top.length-1][1]+.03,-d-.05);for(const H of[-1,1])a(l(.34,.06,.06),e.headlight,this.body,!1).position.set(H*(n/2-.3),t.top[t.top.length-1][1]-.04,-d-.04);if(a(l(n*.86,.3,.03),e.trim,this.body,!1).position.set(0,t.top[0][1]+.2,-E+.16),a(l(n*.84,.05,.04),this.tail,this.body,!1).position.set(0,t.top[0][1]+.3,-E+.19),a(l(n*.75,.02,t.wheelbase*.9),this.underMat,this.body,!1).position.set(0,.17,0),t.wing!=="none"){const H=t.wing==="tall"?.42:.14,B=a(l(n*.92,.04,.34),this.paint);B.position.set(0,t.top[1][1]+H+.04,-E-.22),B.rotation.x=.12;for(const Q of[-1,1])a(l(.03,H+.04,.12),e.trim).position.set(Q*n*.32,t.top[1][1]+H/2,-E-.2)}this.exhaustMat=r(new fh({map:e.glow,color:new gt("#9ef8ff"),transparent:!0,blending:mn,depthWrite:!1,opacity:0}));const y=s(new pn(.07,.08,.16,14,1,!0));y.rotateX(Math.PI/2);for(const H of[-.38,.38]){a(y,e.disc,this.body,!1).position.set(H,.32,-E+.2);const Q=new V0(this.exhaustMat);Q.position.set(H,.32,-E+.36),Q.renderOrder=5,this.body.add(Q),this.exhaust.push(Q)}this.exhaustPos.set(0,.32,-E+.4);const v=s(qg(t.wheelR,.3)),R=s(new pn(t.wheelR*.68,t.wheelR*.68,.02,24));R.rotateZ(Math.PI/2);const N=l(.02,t.wheelR*1.25,.06),U=s(new pn(t.wheelR*.58,t.wheelR*.58,.03,24));U.rotateZ(Math.PI/2);const O=r(new pe({color:new gt(t.accent).multiplyScalar(.5),roughness:.4,metalness:.3})),X=l(.07,.16,.12);for(const H of[1,-1])for(const B of[-1,1]){const Q=new Ye;Q.position.set(B*t.track/2,t.wheelR,-H*t.wheelbase/2),this.root.add(Q);const pt=new Ye;Q.add(pt);const ft=new kt(v,e.rubber);ft.castShadow=!0,pt.add(ft);const dt=new kt(R,e.rim);dt.position.x=B*.1,pt.add(dt);for(let I=0;I<5;I++){const rt=new kt(N,e.rim);rt.position.x=B*.125,rt.rotation.x=I/5*Math.PI,pt.add(rt)}const St=new kt(U,e.disc);St.position.x=-B*.02,pt.add(St);const z=new kt(X,O);z.position.set(B*.04,t.wheelR*.4,H*.08),Q.add(z),this.wheels.push({pivot:Q,spin:pt,front:H===1})}const W=new kt(s(new qe(n*1.5,t.length*1.25)),e.shadow);W.rotation.x=-Math.PI/2,W.position.y=.02,W.renderOrder=1,this.root.add(W)}animate(t,e,n,s,r){this.spinA-=t/this.spec.wheelR;for(const a of this.wheels)a.spin.rotation.x=this.spinA,a.pivot.rotation.y=a.front?-e*.38:0;this.tail.emissiveIntensity=n?9:2.2;const o=.85+.15*Math.sin(r*70);this.exhaustMat.opacity=Math.min(1,s*1.2)*o;for(const a of this.exhaust){const l=.25+s*.6*o;a.scale.set(l,l,l)}}dispose(){for(const t of this.geoms)t.dispose();for(const t of this.mats)t.dispose();this.root.removeFromParent()}}class hc{constructor(t,e,n,s,r,o,a){P(this,"points");P(this,"pos");P(this,"col");P(this,"vel");P(this,"life");P(this,"max");P(this,"base");P(this,"next",0);P(this,"live",0);this.size=t,this.gravity=r,this.drag=o,this.grow=a,this.pos=new Float32Array(t*3),this.col=new Float32Array(t*4),this.vel=new Float32Array(t*3),this.life=new Float32Array(t),this.max=new Float32Array(t),this.base=new Float32Array(t*4);const l=new ye;l.setAttribute("position",new Oe(this.pos,3).setUsage(na)),l.setAttribute("color",new Oe(this.col,4).setUsage(na));const c=new Aa({size:n,map:e,vertexColors:!0,transparent:!0,depthWrite:!1,sizeAttenuation:!0,blending:s?mn:ci});this.points=new mh(l,c),this.points.frustumCulled=!1,this.points.renderOrder=6}spawn(t,e,n,s,r,o,a,l,c,h,u){const f=this.next;this.next=(this.next+1)%this.size,this.pos[f*3]=t,this.pos[f*3+1]=e,this.pos[f*3+2]=n,this.vel[f*3]=s,this.vel[f*3+1]=r,this.vel[f*3+2]=o,this.life[f]=a,this.max[f]=a,this.base[f*4]=l,this.base[f*4+1]=c,this.base[f*4+2]=h,this.base[f*4+3]=u,this.live=this.size}update(t){if(!this.live)return;let e=0;const n=Math.exp(-this.drag*t);for(let r=0;r<this.size;r++){if(this.life[r]<=0){this.col[r*4+3]=0;continue}e++,this.life[r]-=t;const o=Math.max(0,this.life[r]/this.max[r]);this.vel[r*3]*=n,this.vel[r*3+1]=this.vel[r*3+1]*n-this.gravity*t,this.vel[r*3+2]*=n,this.pos[r*3]+=this.vel[r*3]*t,this.pos[r*3+1]+=this.vel[r*3+1]*t,this.pos[r*3+2]+=this.vel[r*3+2]*t,this.col[r*4]=this.base[r*4],this.col[r*4+1]=this.base[r*4+1],this.col[r*4+2]=this.base[r*4+2],this.col[r*4+3]=this.base[r*4+3]*(this.grow>0?o*(1-o)*4:o)}e||(this.live=0);const s=this.points.geometry;s.attributes.position.needsUpdate=!0,s.attributes.color.needsUpdate=!0}clear(){this.life.fill(0),this.col.fill(0),this.points.geometry.attributes.color.needsUpdate=!0,this.live=0}dispose(){this.points.geometry.dispose(),this.points.material.dispose(),this.points.removeFromParent()}}class $g{constructor(t,e){P(this,"group",new Ye);P(this,"sparks");P(this,"mist");P(this,"streaks");P(this,"sp");P(this,"streakState",[]);P(this,"streakMat");this.sparks=new hc(220,t,.22,!0,9.8,1.2,0),this.mist=new hc(260,e,1.25,!1,-.4,1.6,1),this.group.add(this.sparks.points,this.mist.points);const n=70;this.sp=new Float32Array(n*6);const s=new ye;s.setAttribute("position",new Oe(this.sp,3).setUsage(na)),this.streakMat=new ph({color:12577023,transparent:!0,opacity:0,blending:mn,depthWrite:!1,fog:!1}),this.streaks=new Y0(s,this.streakMat),this.streaks.frustumCulled=!1,this.streaks.renderOrder=8;for(let r=0;r<n;r++)this.streakState.push(this.newStreak(!0))}newStreak(t){return{x:(Math.random()<.5?-1:1)*(3.2+Math.random()*5),y:-1.6+Math.random()*3.6,z:t?-Math.random()*60:-60-Math.random()*10,len:1.2+Math.random()*2.4}}updateStreaks(t,e,n,s){if(this.streakMat.opacity=Math.min(.2,n*.18),this.streakMat.color.setRGB(.7+s*.2,.85+s*.1,1),this.streaks.visible=n>.02,!this.streaks.visible)return;const r=e*(1.6+s);for(let o=0;o<this.streakState.length;o++){const a=this.streakState[o];a.z+=r*t,a.z>2&&(this.streakState[o]=this.newStreak(!1));const l=this.streakState[o],c=l.len*(.3+n*.9)*(1+s*.6);this.sp[o*6]=l.x,this.sp[o*6+1]=l.y,this.sp[o*6+2]=l.z,this.sp[o*6+3]=l.x,this.sp[o*6+4]=l.y,this.sp[o*6+5]=l.z-c}this.streaks.geometry.attributes.position.needsUpdate=!0}update(t){this.sparks.update(t),this.mist.update(t)}clear(){this.sparks.clear(),this.mist.clear()}dispose(){this.sparks.dispose(),this.mist.dispose(),this.streaks.geometry.dispose(),this.streakMat.dispose(),this.streaks.removeFromParent(),this.group.removeFromParent()}}const be=1/150,ve=7.5,uc=.006,Kg=.022,Ue=260,ha=520,Th=()=>({x:0,y:0,z:0,head:0,bank:0,pitch:0}),xs=class xs{constructor(t){P(this,"n");P(this,"rows");P(this,"px");P(this,"py");P(this,"pz");P(this,"head");P(this,"bank");P(this,"curve");P(this,"grid",new Map);this.track=t;const e=t.segs,n=e.length;this.n=n,this.rows=Ue+n+ha+1;const s=this.rows;this.px=new Float32Array(s),this.py=new Float32Array(s),this.pz=new Float32Array(s),this.head=new Float32Array(s),this.bank=new Float32Array(s),this.curve=new Float32Array(s);const r=a=>e[(a%n+n)%n],o=st.SEG_LEN*be;for(let a=Ue;a<s;a++){const l=a-Ue,c=r(l);if(this.curve[a]=c.curve,this.py[a]=c.y1*be,a>Ue){const h=this.head[a-1],u=h+r(l-1).curve*uc,f=(h+u)/2;this.head[a]=u,this.px[a]=this.px[a-1]+Math.sin(f)*o,this.pz[a]=this.pz[a-1]-Math.cos(f)*o}}for(let a=Ue-1;a>=0;a--){const l=a-Ue,c=r(l);this.curve[a]=c.curve,this.py[a]=c.y1*be;const h=this.head[a+1],u=h-c.curve*uc,f=(u+h)/2;this.head[a]=u,this.px[a]=this.px[a+1]-Math.sin(f)*o,this.pz[a]=this.pz[a+1]+Math.cos(f)*o}for(let a=0;a<s;a++){let l=0,c=0;for(let h=-6;h<=6;h++){const u=a+h;u<0||u>=s||(l+=this.curve[u],c++)}this.bank[a]=l/c*Kg}for(let a=0;a<s;a+=2)this.addGrid(a)}key(t,e){return(t+4096)*8192+(e+4096)}addGrid(t){const e=xs.CELL,n=this.key(Math.floor(this.px[t]/e),Math.floor(this.pz[t]/e));let s=this.grid.get(n);s||this.grid.set(n,s=[]),s.push(t)}nearRoad(t,e,n,s=-1,r=-1){const o=xs.CELL,a=Math.ceil(n/o),l=Math.floor(t/o),c=Math.floor(e/o),h=n*n;for(let u=-a;u<=a;u++)for(let f=-a;f<=a;f++){const p=this.grid.get(this.key(l+u,c+f));if(p)for(const g of p){if(g>=s&&g<=r)continue;const _=this.px[g]-t,m=this.pz[g]-e;if(_*_+m*m<h)return!0}}return!1}get length(){return this.n*st.SEG_LEN}get minS(){return-Ue*st.SEG_LEN}get maxS(){return(this.n+ha)*st.SEG_LEN}sample(t,e){const n=t/st.SEG_LEN+Ue;let s=Math.floor(n);s<0&&(s=0),s>this.rows-2&&(s=this.rows-2);const r=Math.min(1,Math.max(0,n-s)),o=s,a=s+1;return e.x=this.px[o]+(this.px[a]-this.px[o])*r,e.y=this.py[o]+(this.py[a]-this.py[o])*r,e.z=this.pz[o]+(this.pz[a]-this.pz[o])*r,e.head=this.head[o]+(this.head[a]-this.head[o])*r,e.bank=this.bank[o]+(this.bank[a]-this.bank[o])*r,e.pitch=Math.atan2(this.py[a]-this.py[o],st.SEG_LEN*be),e}point(t,e,n,s,r){this.sample(t,s);const o=Math.cos(s.head),a=Math.sin(s.head),l=Math.cos(s.bank),c=Math.sin(s.bank),h=e*ve,u=h*l+n*c,f=-h*c+n*l;r.x=s.x+o*u,r.y=s.y+f,r.z=s.z+a*u}static local(t,e,n){return n+(t-e)}};P(xs,"CELL",40);let ua=xs;function fc(i){let t=0,e=0;for(const n of i.segs)n.y2>n.y1&&(t+=(n.y2-n.y1)*be),e=Math.max(e,Math.abs(n.curve));return{lengthKm:i.length*be/1e3,climbM:t,sharpest:e}}function qn(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Be(i,t){const e=document.createElement("canvas");e.width=i,e.height=t;const n=e.getContext("2d");if(!n)throw new Error("2D canvas unavailable for texture generation");return[e,n]}function ke(i,t,e=!1){const n=new $0(i);return n.colorSpace=t?He:Cn,e&&(n.wrapS=n.wrapT=ui),n.needsUpdate=!0,n}function vs(i,t,e,n){const s=Math.ceil(i/e),r=Math.ceil(t/e),o=new Float32Array(s*r).map(()=>n()),a=new Float32Array(i*t),l=c=>c*c*(3-2*c);for(let c=0;c<t;c++){const h=c/e,u=Math.floor(h),f=l(h-u);for(let p=0;p<i;p++){const g=p/e,_=Math.floor(g),m=l(g-_),d=o[u%r*s+_%s],E=o[u%r*s+(_+1)%s],S=o[(u+1)%r*s+_%s],x=o[(u+1)%r*s+(_+1)%s];a[c*i+p]=(d+(E-d)*m)*(1-f)+(S+(x-S)*m)*f}}return a}function dc(i,t,e){const r=qn(i),o=vs(512,1024,4,r),a=vs(512,1024,32,r),l=vs(512,1024,128,r),[c,h]=Be(512,1024),[u,f]=Be(512,1024),p=h.createImageData(512,1024),g=f.createImageData(512,1024),_=new Float32Array(512*1024),m=[-.75,-.25,.25,.75];for(let A=0;A<1024;A++)for(let L=0;L<512;L++){const y=A*512+L,v=L/512*2-1;let R=0;for(const Q of m){const pt=Math.abs(v-Q);R=Math.max(R,Math.max(0,1-Math.abs(pt-.07)/.05))}const N=o[y]>.82?.1:o[y]<.12?-.06:0;let U=.105+(a[y]-.5)*.04+N-R*.02+(l[y]-.5)*.03;U=Math.max(.02,U);const O=Math.max(0,(l[y]*.7+a[y]*.3-.56)*6),X=Math.min(1,O),W=Math.round(U*255*(1-X*.35));p.data[y*4]=W,p.data[y*4+1]=W+1,p.data[y*4+2]=W+4,p.data[y*4+3]=255;const H=.62-R*.17-X*.42+(o[y]-.5)*.12,B=Math.round(Math.max(.06,Math.min(1,H))*255);g.data[y*4]=B,g.data[y*4+1]=B,g.data[y*4+2]=B,g.data[y*4+3]=255,_[y]=o[y]*.6+a[y]*.4-X*.5}h.putImageData(p,0,0),f.putImageData(g,0,0);for(let A=0;A<7;A++){let L=r()*512,y=r()*1024;h.strokeStyle="rgba(6,7,9,0.85)",f.strokeStyle="rgba(40,40,40,1)",h.lineWidth=f.lineWidth=1.5+r()*2,h.beginPath(),f.beginPath(),h.moveTo(L,y),f.moveTo(L,y);for(let v=0;v<14;v++)L+=(r()-.5)*40,y+=10+r()*30,h.lineTo(L,y),f.lineTo(L,y);h.stroke(),f.stroke()}const d=(A,L,y,v)=>{h.fillStyle=e?"#ffffff":"rgba(214,220,222,0.92)",h.fillRect(A,L,y,v),f.fillStyle="#b4b4b4",f.fillRect(A,L,y,v);for(let R=0;R<y*v/30;R++)h.fillStyle="rgba(30,32,36,0.5)",h.fillRect(A+r()*y,L+r()*v,1+r()*2,1+r()*2)},E=A=>(A+1)/2*512,S=e?9:6;for(const A of[-.5,0,.5])if(!(t&&A===0))for(const L of[0,1024/2])d(E(A)-S/2,L+20,S,1024/4);for(const A of[-.955,.955])d(E(A)-S/2-1,0,S+2,1024);const[x,F]=Be(512,1024),C=F.createImageData(512,1024);for(let A=0;A<1024;A++)for(let L=0;L<512;L++){const y=A*512+L,v=_[A*512+(L+1)%512]-_[A*512+(L-1+512)%512],R=_[(A+1)%1024*512+L]-_[(A-1+1024)%1024*512+L],N=2.2;let U=-v*N,O=-R*N;const X=1,W=Math.hypot(U,O,X);U/=W,O/=W,C.data[y*4]=Math.round((U*.5+.5)*255),C.data[y*4+1]=Math.round((O*.5+.5)*255),C.data[y*4+2]=Math.round(X/W*.5*255+127),C.data[y*4+3]=255}return F.putImageData(C,0,0),{map:ke(c,!0,!0),rough:ke(u,!1,!0),normal:ke(x,!1,!0)}}function pc(i){const n=qn(i),s=vs(256,256,8,n),r=vs(256,256,64,n),[o,a]=Be(256,256),[l,c]=Be(256,256),h=a.createImageData(256,256),u=c.createImageData(256,256);for(let f=0;f<256*256;f++){const p=Math.floor(f/256),g=Math.max(0,r[f]-.5)*.25*(p/256),_=.3+(s[f]-.5)*.08+(r[f]-.5)*.1-g,m=Math.round(Math.max(0,_)*255);h.data[f*4]=m,h.data[f*4+1]=m,h.data[f*4+2]=m+3,h.data[f*4+3]=255;const d=Math.round((.78+(s[f]-.5)*.2)*255);u.data[f*4]=u.data[f*4+1]=u.data[f*4+2]=d,u.data[f*4+3]=255}return a.putImageData(h,0,0),c.putImageData(u,0,0),a.fillStyle="rgba(0,0,0,0.5)",a.fillRect(0,0,2,256),{map:ke(o,!0,!0),rough:ke(l,!1,!0)}}function Zg(i,t){const n=qn(i*7+3),[s,r]=Be(128,128),o=r.createImageData(128,128),a=t.signs.map(c=>new gt(c));for(let c=0;c<128;c++){const h=n()<.18?-.3:n()<.12?.35:0;for(let u=0;u<128;u++){const f=(c*128+u)*4,p=n()<.27+h,g=n();let _=255,m=190,d=120;if(g<.3)_=205,m=222,d=255;else if(g<.32){const E=a[Math.floor(n()*a.length)];_=Math.round(E.r*255),m=Math.round(E.g*255),d=Math.round(E.b*255)}else g<.5&&(_=255,m=214,d=160);o.data[f]=_,o.data[f+1]=m,o.data[f+2]=d,o.data[f+3]=Math.round(p?(.3+n()*.55)*255:n()*10)}}r.putImageData(o,0,0);const l=ke(s,!0,!0);return l.magFilter=Fe,l.minFilter=Fe,l.generateMipmaps=!1,l}function Jg(i,t,e){const r=qn(i+(e?91:17)),[o,a]=Be(2048,256),l=new gt(t.skyline),c=e?l.clone().lerp(new gt(t.fog),.45):l.clone().multiplyScalar(.6);let h=0;for(;h<2048;){const f=18+r()*(e?50:70),p=256*(e?.25+r()*.45:.3+r()*.65);a.fillStyle=`#${c.getHexString()}`,a.fillRect(h,256-p,f,p),r()<.3&&a.fillRect(h+f*.45,256-p-14-r()*30,2,40);const g=Math.floor(f/5),_=Math.floor(p/6);for(let m=1;m<_;m++)for(let d=0;d<g;d++)r()>(e?.18:.26)||(a.fillStyle=r()<.75?`rgba(255,205,150,${e?.45:.7})`:`rgba(200,225,255,${e?.4:.6})`,a.fillRect(h+1+d*5,256-p+m*6,2,2));h+=f+(r()<.2?r()*20:0)}const u=ke(o,!0);return u.wrapS=ui,u}const mc=["VOLT","HALO","NOVA","KAI","SPINE","DRIVE","AXIS","ZEN","LUMA","PRISM","ARC","ION"];function jg(i,t){const s=qn(i),[r,o]=Be(512,256);o.fillStyle="#05060a",o.fillRect(0,0,512,256);const a=o.createLinearGradient(0,0,0,256);a.addColorStop(0,"rgba(255,255,255,0.05)"),a.addColorStop(1,"rgba(255,255,255,0.0)"),o.fillStyle=a,o.fillRect(8,8,496,240),o.strokeStyle=t,o.lineWidth=6,o.strokeRect(14,14,484,228);const l=mc[Math.floor(s()*mc.length)];o.fillStyle=t,o.font=`italic 700 ${256*.52}px "Barlow Condensed", "Arial Narrow", sans-serif`,o.textAlign="center",o.textBaseline="middle",o.fillText(l,512/2,256*.46),o.fillStyle="rgba(255,255,255,0.85)",o.font=`500 ${256*.1}px "Barlow", sans-serif`,o.fillText(["Open all night","Auralis grid","Charge here","Level 9","Harbour line"][Math.floor(s()*5)],512/2,256*.8),o.fillStyle="rgba(0,0,0,0.55)";for(let c=0;c<3;c++)o.fillRect(s()*512,s()*256,6+s()*20,3);return ke(r,!0)}function Qg(){const[i,t]=Be(128,128);t.fillStyle="#12020a",t.fillRect(0,0,128,128),t.fillStyle="#ff2e4a";for(let e=-128;e<256;e+=32)t.beginPath(),t.moveTo(e,128),t.lineTo(e+16,128),t.lineTo(e+16+128,0),t.lineTo(e+128,0),t.closePath(),t.fill();return ke(i,!0,!0)}function t_(){const[i,t]=Be(256,128);t.clearRect(0,0,256,128),t.strokeStyle="#ffffff",t.lineWidth=12,t.lineJoin="miter";for(const e of[70,128,186])t.beginPath(),t.moveTo(e-30,100),t.lineTo(e,40),t.lineTo(e+30,100),t.stroke();return ke(i,!0)}function e_(){const[i,t]=Be(256,32);for(let e=0;e<16;e++)for(let n=0;n<2;n++)t.fillStyle=(e+n)%2?"#0b0c10":"#f2f4f5",t.fillRect(e*16,n*16,16,16);return ke(i,!0)}function fs(i,t){const[e,n]=Be(1024,96);return n.fillStyle="#07090d",n.fillRect(0,0,1024,96),n.fillStyle=t,n.fillRect(0,0,1024,6),n.fillRect(0,90,1024,6),n.fillStyle="#e8f0f2",n.font='italic 700 60px "Barlow Condensed", "Arial Narrow", sans-serif',n.textAlign="center",n.textBaseline="middle",n.fillText(i,512,50),ke(e,!0)}function n_(){const[i,t]=Be(128,128),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.2,"rgba(255,255,255,0.55)"),e.addColorStop(.5,"rgba(255,255,255,0.12)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),ke(i,!0)}function i_(){const[i,t]=Be(64,256);for(let e=0;e<256;e++){const n=e/255,s=Math.pow(1-n,1.6)*Math.min(1,n*12),r=t.createLinearGradient(0,0,64,0);r.addColorStop(0,"rgba(255,255,255,0)"),r.addColorStop(.5,`rgba(255,255,255,${s})`),r.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=r,t.fillRect(0,e,64,1)}return ke(i,!0)}function s_(){const[i,t]=Be(64,64),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,0.8)"),e.addColorStop(.6,"rgba(255,255,255,0.25)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),ke(i,!0)}const Qt={KERB_IN:1,KERB_OUT:1.07,BARRIER:1.47,BARRIER_BACK:1.52,POLE:1.6,TUNNEL:1.62};class Ze{constructor(){P(this,"pos",[]);P(this,"uv",[]);P(this,"idx",[])}get empty(){return this.idx.length===0}build(){const t=new ye;return t.setAttribute("position",new ce(this.pos,3)),t.setAttribute("uv",new ce(this.uv,2)),t.setIndex(this.idx),t.computeVertexNormals(),t.computeBoundingSphere(),t}}const mo=i=>i.map(([t,e])=>[-t,e]).reverse(),gc={halogen:["#dbe7ff","#dbe7ff","#cfe0ff","#9ff6ff"],violet:["#ffb35c","#ffb35c","#c49bff","#ffb35c"],meridian:["#ffac4f","#ffac4f","#ffc77a","#ffac4f"]},_c={halogen:[14,85],violet:[10,60],meridian:[36,190]};class r_{constructor(t,e,n,s){P(this,"group",new Ye);P(this,"lamps",[]);P(this,"disposables",[]);P(this,"pose",Th());P(this,"pt",{x:0,y:0,z:0});P(this,"segs");P(this,"n");P(this,"tunnelRow");P(this,"spineField");P(this,"spineLine");P(this,"gateFrame");P(this,"curtainOpen");P(this,"curtainSealed");P(this,"bannerOpen");P(this,"bannerSealed");P(this,"beacon");P(this,"threshold",-1);P(this,"open",!0);P(this,"skyline",new Ye);this.path=t,this.def=e,this.opts=n,this.shared=s,this.segs=t.track.segs,this.n=this.segs.length,this.tunnelRow=new Uint8Array(t.rows);for(const h of e.tunnels??[]){const u=Math.floor(h.at*this.n);for(const f of this.rowsFor(u))for(let p=f;p<=f+h.len&&p<t.rows;p++)this.tunnelRow[p]=1}const r=h=>(this.disposables.push(h),h),o=e.palette,a=new gt(o.accentA);this.spineField=r(new Kt({color:a.clone().multiplyScalar(.5),transparent:!0,opacity:.22,blending:mn,depthWrite:!1})),this.spineLine=r(new Kt({color:a.clone().multiplyScalar(3)})),this.gateFrame=r(new Kt({color:a.clone().multiplyScalar(4)}));const l=r(t_());l.wrapT=ui,l.repeat.set(1,2),this.curtainOpen=r(new Kt({map:l,color:new gt("#2cf6ff").multiplyScalar(1.2),transparent:!0,opacity:.55,blending:mn,depthWrite:!1,side:tn}));const c=r(Qg());c.repeat.set(2,2),this.curtainSealed=r(new Kt({map:c,color:new gt(1.6,1.6,1.6),transparent:!0,opacity:.82,depthWrite:!1,side:tn})),this.bannerOpen=r(new Kt({map:r(fs("Spine open","#2cf6ff")),color:new gt(1.4,1.4,1.4)})),this.bannerSealed=r(new Kt({color:new gt(1.4,1.4,1.4)})),this.beacon=r(new Kt({color:new gt(5,.2,.2)})),this.setThreshold(n.threshold),this.buildRibbons(r),this.buildGates(r),this.buildStreetLights(r),this.buildOverpasses(r),this.buildCity(r),this.buildSkyline(r),this.lamps.sort((h,u)=>h.s-u.s)}seg(t){const e=t-Ue;return this.segs[(e%this.n+this.n)%this.n]}rowS(t){return(t-Ue)*st.SEG_LEN}rowsFor(t){const e=[];for(let n=Ue+t-this.n*2;n<this.path.rows;n+=this.n)n>=0&&e.push(n);return e}at(t,e,n){return this.path.point(this.rowS(t),e,n,this.pose,this.pt),new D(this.pt.x,this.pt.y,this.pt.z)}orient(t,e,n=!1){this.path.sample(this.rowS(e),this.pose),t.rotation.order="YXZ",t.rotation.set(n?0:this.pose.pitch,-this.pose.head,n?0:-this.pose.bank)}ribbon(t,e,n,s,r,o,a){const l=t.pos.length/3,c=r.length,h=[0];for(let f=1;f<c;f++){const p=(r[f][0]-r[f-1][0])*ve,g=r[f][1]-r[f-1][1];h.push(h[f-1]+Math.hypot(p,g))}let u=0;for(let f=e;;f+=s){const p=Math.min(f,n);for(let g=0;g<c;g++){this.path.point(this.rowS(p),r[g][0],r[g][1],this.pose,this.pt),t.pos.push(this.pt.x,this.pt.y,this.pt.z);const _=o==="lat"?(r[g][0]+1)/2:h[g]/o;t.uv.push(_,(p-Ue)*st.SEG_LEN*be/a)}if(u++,p>=n)break}for(let f=0;f<u-1;f++)for(let p=0;p<c-1;p++){const g=l+f*c+p,_=g+1,m=g+c,d=m+1;t.idx.push(g,_,m,_,d,m)}}buildRibbons(t){const e=this.opts.highContrast,n=this.shared.anisotropy,s=dc(this.def.seed,!1,e),r=dc(this.def.seed,!0,e);for(const dt of[s,r])for(const St of[dt.map,dt.rough,dt.normal])St.anisotropy=n,t(St);const o=t(new pe({map:s.map,roughnessMap:s.rough,normalMap:s.normal,normalScale:new ht(.28,.28),roughness:1,metalness:0,envMapIntensity:.7})),a=t(new pe({map:r.map,roughnessMap:r.rough,normalMap:r.normal,normalScale:new ht(.28,.28),roughness:1,metalness:0,envMapIntensity:.7})),l=pc(this.def.seed+5);l.map.anisotropy=n,t(l.map),t(l.rough);const c=t(new pe({map:l.map,roughnessMap:l.rough,color:12106948,roughness:1,envMapIntensity:.5})),h=t(new pe({map:l.map,roughnessMap:l.rough,color:10133158,roughness:.9,side:tn,envMapIntensity:.3})),u=t(new pe({map:l.map,color:3817288,roughness:.42,envMapIntensity:.8})),f=t(new pe({color:9212056,roughness:.7,metalness:0})),p=t(new pe({color:10725809,roughness:.32,metalness:.95,envMapIntensity:1.2})),g=new gt(e?"#ffffff":this.def.palette.edge),_=t(new Kt({color:g.clone().multiplyScalar(e?1.5:2.6)})),m=t(new Kt({color:new gt(this.def.palette.accentB).multiplyScalar(2.4)})),d=[[Qt.KERB_IN,0],[Qt.KERB_IN,.1],[Qt.KERB_OUT,.12]],E=[[Qt.KERB_OUT,.12],[Qt.BARRIER,.06]],S=[[Qt.BARRIER,0],[Qt.BARRIER,.2],[Qt.BARRIER+.02,.5],[Qt.BARRIER+.026,.92],[Qt.BARRIER_BACK,.92],[Qt.BARRIER_BACK,0]],x=[[Qt.BARRIER-.001,.12],[Qt.BARRIER-.001,.17]],F=[[Qt.BARRIER+.03,1],[Qt.BARRIER+.03,1.3],[Qt.BARRIER+.045,1.3],[Qt.BARRIER+.045,1]],C=[[Qt.BARRIER_BACK,.18],[3.2,.2],[6,-.2],[16,-1.2]],A=[[Qt.TUNNEL,0],[Qt.TUNNEL,7.2]],L=[[Qt.TUNNEL,7.2],[-1.62,7.2]],y=[[Qt.TUNNEL-.002,1],[Qt.TUNNEL-.002,1.12]],v=[[.245,.035],[.275,.035]],R=[[.24,0],[.24,.03],[.28,.03],[.28,0]],N=this.path.rows,U=120,O=2,X=(dt,St,z)=>{const I=[];let rt=-1;for(let Y=dt;Y<=St;Y++){const ot=z(Y);if(ot&&rt<0&&(rt=Y),(!ot||Y===St)&&rt>=0){const vt=Y;vt>rt&&I.push([rt,vt]),rt=-1}}return I};for(let dt=0;dt<N-1;dt+=U){const St=Math.min(N-1,dt+U),z=new Ze,I=new Ze,rt=new Ze,Y=new Ze,ot=new Ze,vt=new Ze,Lt=new Ze,zt=new Ze,Z=new Ze,J=new Ze,T=new Ze,mt=new Ze,j=lt=>this.seg(lt).spine;for(const[lt,yt]of X(dt,St,ut=>!j(ut)))this.ribbon(z,lt,yt,O,[[-1,0],[1,0]],"lat",16);for(const[lt,yt]of X(dt,St,j)){this.ribbon(I,lt,yt,O,[[-1,0],[1,0]],"lat",16),this.ribbon(J,lt,yt,O,[[-.24,.015],[.24,.015]],"lat",4);for(const ut of[v,mo(v)])this.ribbon(T,lt,yt,O,ut,1,4);for(const ut of[R,mo(R)])this.ribbon(mt,lt,yt,O,ut,1,4)}for(const lt of[1,-1]){const yt=ut=>lt>0?ut:mo(ut);this.ribbon(vt,dt,St,O,yt(d),1,4),this.ribbon(ot,dt,St,O,yt(E),4,8),this.ribbon(rt,dt,St,O,yt(S),1.5,3),this.ribbon(zt,dt,St,O,yt(x),1,4),this.ribbon(ot,dt,St,O,yt(C),12,12);for(const[ut,w]of X(dt,St,M=>!this.tunnelRow[M]))this.ribbon(Lt,ut,w,O,yt(F),1,4);for(const[ut,w]of X(dt,St,M=>!!this.tunnelRow[M]))this.ribbon(Y,ut,w,O,yt(A),4,4),this.ribbon(Z,ut,w,O,yt(y),1,4)}for(const[lt,yt]of X(dt,St,ut=>!!this.tunnelRow[ut]))this.ribbon(Y,lt,yt,O,L,4,4);const at=(lt,yt,ut=!0,w=0)=>{if(lt.empty)return;const M=new kt(t(lt.build()),yt);M.receiveShadow=ut,M.renderOrder=w,this.group.add(M)};at(z,o),at(I,a),at(rt,c),at(Y,h),at(ot,u),at(vt,f),at(Lt,p,!1),at(zt,_,!1),at(Z,m,!1),at(J,this.spineField,!1,2),at(T,this.spineLine,!1),at(mt,this.spineLine,!1)}const W=t(new fe(.12,1.3,.12)),H=[],B=[],Q=new de,pt=new gt("#f4f1e6");for(let dt=0;dt<N;dt+=2){if(this.tunnelRow[dt]){if(dt%6===0){for(const St of[-.55,.55])Q.position.copy(this.at(dt,St,7.1)),this.orient(Q,dt,!0),Q.scale.set(1,1,1),Q.updateMatrix(),B.push(Q.matrix.clone());if(dt%18===0){const St=this.at(dt,0,6.6);this.lamps.push({s:this.rowS(dt),x:St.x,y:St.y,z:St.z,color:pt,power:.6})}}continue}if(dt%2===0)for(const St of[-1,1])Q.position.copy(this.at(dt,St*(Qt.BARRIER+.06),.65)),this.orient(Q,dt,!0),Q.updateMatrix(),H.push(Q.matrix.clone())}const ft=new we(W,p,H.length);if(H.forEach((dt,St)=>ft.setMatrixAt(St,dt)),ft.frustumCulled=!1,this.group.add(ft),B.length){const dt=t(new fe(.5,.08,2.6)),St=t(new Kt({color:pt.clone().multiplyScalar(5)})),z=new we(dt,St,B.length);B.forEach((I,rt)=>z.setMatrixAt(rt,I)),z.frustumCulled=!1,this.group.add(z);for(const I of this.def.tunnels??[])for(const rt of this.rowsFor(Math.floor(I.at*this.n))){const Y=new La;Y.moveTo(-22,-2),Y.lineTo(22,-2),Y.lineTo(22,16),Y.lineTo(-22,16),Y.closePath();const ot=new aa,vt=Qt.TUNNEL*ve;ot.moveTo(-vt,0),ot.lineTo(-vt,7.2),ot.lineTo(vt,7.2),ot.lineTo(vt,0),ot.closePath(),Y.holes.push(ot);const Lt=t(new Rr(Y,{depth:1.2,bevelEnabled:!1})),zt=new kt(Lt,c);zt.position.copy(this.at(rt,0,0)),this.orient(zt,rt,!0),this.group.add(zt);const Z=new kt(t(new fe(vt*2+1,.25,.1)),m);Z.position.copy(this.at(rt,0,7.6)),this.orient(Z,rt,!0),Z.translateZ(.7),this.group.add(Z)}}}gantry(t,e,n,s,r){const o=new Ye;o.position.copy(this.at(e,0,0)),this.orient(o,e,!0);const a=Qt.POLE*ve*2,l=t(new fe(.5,n,.5));for(const u of[-1,1]){const f=new kt(l,r);f.position.set(u*a/2,n/2,0),f.castShadow=!1,o.add(f)}const c=new kt(t(new fe(a+.5,.9,.7)),r);c.position.set(0,n,0),o.add(c);const h=new kt(t(new fe(a,.06,.08)),s);return h.position.set(0,n-.47,.3),o.add(h),this.group.add(o),o}buildGates(t){const e=t(new pe({color:2764600,roughness:.45,metalness:.8})),n=t(new Kt({color:new gt("#ffb347").multiplyScalar(3)})),s=t(new Kt({color:new gt(1.8,1.8,1.8)})),r=t(new Kt({map:t(fs("Spine exit","#ffb347")),color:new gt(1.3,1.3,1.3)})),o=t(e_());o.wrapS=ui;const a=t(new Kt({map:o,color:new gt(1.6,1.6,1.6)})),l=t(new pe({map:o,roughness:.5,transparent:!0,opacity:.85,polygonOffset:!0,polygonOffsetFactor:-2})),c=[1,2,3].map(g=>t(new Kt({map:t(fs(`Checkpoint ${g}`,this.def.palette.accentA)),color:new gt(1.3,1.3,1.3)}))),h=t(new qe(8,.75)),u=t(new qe(.5*ve,4.2)),f=t(new fe(.1,4.4,.1)),p=Qt.POLE*ve*2;for(let g=0;g<this.n;g++){const _=this.segs[g];if(!(!_.gate&&!_.cp))for(const m of this.rowsFor(g)){if(_.gate===1){const d=this.gantry(t,m,6.6,this.gateFrame,e),E=new kt(h,this.bannerOpen),S=new kt(h,this.bannerSealed);for(const A of[E,S])A.position.set(0,6.6,.37),d.add(A);const x=new kt(u,this.curtainOpen),F=new kt(u,this.curtainSealed);for(const A of[x,F])A.position.set(0,2.1,0),A.renderOrder=3,d.add(A);for(const A of[-1,1]){const L=new kt(f,this.gateFrame);L.position.set(A*.26*ve,4.4,0),d.add(L)}const C=new kt(t(new fe(.52*ve,.1,.1)),this.gateFrame);C.position.set(0,4.25,0),d.add(C)}else if(_.gate===2){const d=this.gantry(t,m,6,n,e),E=new kt(h,r);E.position.set(0,6,.37),d.add(E)}if(_.cp){const d=_.cp===4,E=this.gantry(t,m,7.2,d?s:n,e),S=new kt(t(new qe(p*.7,.85)),d?a:c[_.cp-1]);if(d&&o.repeat.set(6,1),S.position.set(0,7.2,.37),E.add(S),d){const x=new kt(t(new qe(2*ve,1.4)),l);x.rotation.x=-Math.PI/2,x.position.y=.02,x.receiveShadow=!0,E.add(x)}}}}}setThreshold(t){t!==this.threshold&&(this.threshold=t,this.bannerSealed.map?.dispose(),this.bannerSealed.map=fs(`Spine sealed below ${t} %`,"#ff4354"),this.bannerSealed.needsUpdate=!0)}setGate(t,e,n){this.open=t;const s=t||n?1:.55+.45*(Math.sin(e*50)>0?1:0),r=t?new gt("#2cf6ff"):new gt("#ff3348");this.gateFrame.color.copy(r).multiplyScalar(4*s),this.spineLine.color.copy(r).multiplyScalar(t?2.6:2.2*s);const o=.4+.12*Math.sin(e*5);this.spineField.color.copy(r).multiplyScalar(t?o:.3),this.curtainOpen.visible=t,this.curtainSealed.visible=!t,this.curtainSealed.opacity=.82*s,this.bannerOpen.visible=t,this.bannerSealed.visible=!t,this.curtainOpen.map.offset.y=-e*1.2,this.beacon.color.setRGB(Math.sin(e*3)>.6?6:.3,.1,.1),this.open}buildStreetLights(t){const e=(gc[this.def.id]??gc.halogen).map(z=>new gt(z)),n=new de,s=[],r=[],o=[],a=[],l=[],c=[],h=[],u=9.5,f=24;qn(this.def.seed*3+1);let p=0;for(let z=0;z<this.path.rows;z+=f/2){const I=p++%2===0?1:-1;if(this.tunnelRow[z]||this.tunnelRow[Math.min(this.path.rows-1,z+4)])continue;const rt=((z-Ue)%this.n+this.n)%this.n,Y=e[(rt*7+(I>0?1:0))%e.length];n.position.copy(this.at(z,I*Qt.POLE,0)),this.orient(n,z,!0),n.scale.set(1,u,1),n.updateMatrix(),s.push(n.matrix.clone());const ot=(Qt.POLE-.95)*ve;n.position.copy(this.at(z,I*(Qt.POLE-ot/2/ve),u-.1)),n.scale.set(ot,1,1),n.updateMatrix(),r.push(n.matrix.clone());const vt=this.at(z,I*.97,u-.3);n.position.copy(vt),n.scale.set(1,1,1),n.updateMatrix(),o.push(n.matrix.clone()),a.push(Y.clone().multiplyScalar(this.def.id==="halogen"?6:7)),c.push(vt.x,vt.y-.2,vt.z),h.push(Y.r,Y.g,Y.b);const Lt=15;n.position.copy(this.at(z-Math.round(Lt/2/(st.SEG_LEN*be)),I*.97,.03)),this.orient(n,z),n.rotateX(-Math.PI/2),n.scale.set(1.5,Lt,1),n.updateMatrix(),l.push(n.matrix.clone()),this.lamps.push({s:this.rowS(z),x:vt.x,y:vt.y-.4,z:vt.z,color:Y,power:1})}const g=t(new pe({color:3817287,roughness:.5,metalness:.8})),_=t(new pn(.09,.14,1,10));_.translate(0,.5,0);const m=new we(_,g,s.length);s.forEach((z,I)=>m.setMatrixAt(I,z));const d=new we(t(new fe(1,.14,.18)),g,r.length);r.forEach((z,I)=>d.setMatrixAt(I,z));const E=t(new Kt({color:16777215})),S=new we(t(new fe(1.1,.12,.42)),E,o.length);o.forEach((z,I)=>{S.setMatrixAt(I,z),S.setColorAt(I,a[I])});const x=t(new Kt({map:this.shared.streak,transparent:!0,opacity:.42,blending:mn,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4})),F=new we(t(new qe(1,1)),x,l.length);l.forEach((z,I)=>{F.setMatrixAt(I,z),F.setColorAt(I,e[I%e.length])}),F.renderOrder=2;const C=t(new ye);C.setAttribute("position",new ce(c,3)),C.setAttribute("color",new ce(h,3));const A=t(new Aa({size:5.5,map:this.shared.glow,vertexColors:!0,transparent:!0,opacity:.32,blending:mn,depthWrite:!1,sizeAttenuation:!0})),L=new mh(C,A);for(const z of[m,d,S,F])z.frustumCulled=!1,this.group.add(z);L.frustumCulled=!1,L.renderOrder=4,this.group.add(L);const y=this.def.palette.signs.map((z,I)=>t(jg(this.def.seed*13+I,z))),v=y.map(()=>[]),R=[],N=[],U=[],O=[];for(let z=0;z<this.path.rows;z++)if(!this.tunnelRow[z])for(const I of this.seg(z).sprites){const rt=Math.sign(I.x);if(I.kind==="sign"){const Y=rt*Math.max(2.15,Math.abs(I.x)+.4),ot=6+I.tex%3*1.5;n.position.copy(this.at(z,Y,ot)),this.orient(n,z,!0),n.rotateY(-rt*.32),n.scale.set(9,4.5,1),n.updateMatrix(),v[I.tex%v.length].push(n.matrix.clone()),n.translateZ(-.2),n.scale.set(9.4,4.9,.35),n.updateMatrix(),R.push(n.matrix.clone());for(const vt of[-2.6,2.6]){const Lt=this.at(z,Y,0);n.position.copy(Lt),this.orient(n,z,!0),n.rotateY(-rt*.32),n.translateX(vt),n.translateZ(-.25),n.scale.set(.3,ot-2.2,.3),n.updateMatrix(),N.push(n.matrix.clone())}}else I.kind==="pylon"&&(n.position.copy(this.at(z,rt*1.58,.15)),this.orient(n,z,!0),n.scale.set(1,1,1),n.updateMatrix(),U.push(n.matrix.clone()),O.push(new gt(this.def.palette.signs[I.tex%this.def.palette.signs.length]).multiplyScalar(4)))}y.forEach((z,I)=>{if(!v[I].length)return;const rt=t(new Kt({map:z,color:new gt(2.2,2.2,2.2)})),Y=new we(t(new qe(1,1)),rt,v[I].length);v[I].forEach((ot,vt)=>Y.setMatrixAt(vt,ot)),Y.frustumCulled=!1,this.group.add(Y)});const X=t(new fe(1,1,1)),W=new we(X,g,R.length);R.forEach((z,I)=>W.setMatrixAt(I,z));const H=t(new fe(1,1,1));H.translate(0,.5,0);const B=new we(H,g,N.length);N.forEach((z,I)=>B.setMatrixAt(I,z));const Q=t(new pn(.12,.12,1,10));Q.translate(0,.5,0);const pt=new we(Q,g,Math.max(1,U.length)),ft=t(new pn(.125,.125,.12,10));ft.translate(0,.92,0);const dt=t(new Kt({color:16777215})),St=new we(ft,dt,Math.max(1,U.length));U.forEach((z,I)=>{pt.setMatrixAt(I,z),St.setMatrixAt(I,z),St.setColorAt(I,O[I])}),pt.count=St.count=U.length;for(const z of[W,B,pt,St])z.frustumCulled=!1,this.group.add(z)}buildOverpasses(t){const e=this.def.overpasses??[];if(!e.length)return;const n=pc(this.def.seed+9);t(n.map),t(n.rough),n.map.repeat.set(6,1);const s=t(new pe({map:n.map,roughnessMap:n.rough,color:10265002,roughness:1,envMapIntensity:.5})),r=t(new Kt({color:new gt(this.def.palette.accentB).multiplyScalar(3)})),o=t(new Kt({color:new gt("#f2efe4").multiplyScalar(4)})),a=t(new Kt({map:t(fs("Auralis transit line",this.def.palette.accentB)),color:new gt(1.3,1.3,1.3)})),l=t(new fe(70,1.8,13)),c=t(new fe(70,1.1,.3)),h=t(new fe(1.6,1,2.4));h.translate(0,.5,0);const u=t(new fe(70,.12,.12)),f=t(new fe(.4,.06,6)),p=t(new qe(14,1.3));for(const g of e)for(const _ of this.rowsFor(Math.floor(g*this.n))){const m=new Ye;m.position.copy(this.at(_,0,0)),this.orient(m,_,!0);const d=7.6,E=new kt(l,s);E.position.y=d+.9,E.receiveShadow=!0,m.add(E);for(const F of[-6.35,6.35]){const C=new kt(c,s);C.position.set(0,d+2.35,F),m.add(C);const A=new kt(u,r);A.position.set(0,d+1.2,F+Math.sign(F)*.06),m.add(A)}for(const F of[-1,1])for(const C of[-4,4]){const A=new kt(h,s);A.position.set(F*(Qt.BARRIER_BACK*ve+1.4),-2,C),A.scale.y=d+2,m.add(A)}for(const F of[-.6,0,.6]){const C=new kt(f,o);C.position.set(F*ve,d-.03,0),m.add(C)}const S=new kt(p,a);S.position.set(0,d+1,6.62),m.add(S),this.group.add(m);const x=this.at(_,0,d-.5);this.lamps.push({s:this.rowS(_),x:x.x,y:x.y,z:x.z,color:new gt("#f2efe4"),power:.7})}}buildCity(t){const e=this.def.palette,n=this.opts.density,[s,r]=_c[this.def.id]??_c.halogen,o=[],a=[],l=[],c=[],h=[],u=[],f=[],p=new de,g=e.tints.map(N=>new gt(N)),_=[new gt("#2a2f38"),new gt("#1d222b"),new gt("#353a42"),new gt("#252b36")],m=(N,U,O,X,W,H,B)=>{const Q=Math.hypot(X,W)/2,pt=U*(O+Q)/ve,ft=this.at(N,pt,0);if(this.path.nearRoad(ft.x,ft.z,Qt.BARRIER_BACK*ve+Q+1.5))return;this.path.sample(this.rowS(N),this.pose);const dt=this.pose.y-2,St=-this.pose.head+(B()-.5)*.12;p.position.set(ft.x,dt,ft.z),p.rotation.set(0,St,0),p.scale.set(X,H+2,W),p.updateMatrix(),o.push(p.matrix.clone());const z=_[Math.floor(B()*_.length)].clone().lerp(g[Math.floor(B()*g.length)],.35);a.push(z);const I=1+Math.floor(B()*3);for(let rt=0;rt<I;rt++){const Y=2+B()*3;p.position.set(0,0,0),p.rotation.set(0,St,0),p.scale.set(Y,1.4+B()*1.8,2+B()*3);const ot=(B()-.5)*(X-Y)*.8,vt=(B()-.5)*(W-3)*.8;p.position.set(ft.x+Math.cos(-St)*ot-Math.sin(-St)*vt,dt+H+2,ft.z+Math.sin(-St)*ot+Math.cos(-St)*vt),p.updateMatrix(),l.push(p.matrix.clone())}if(H>40&&B()<.4){const rt=8+B()*18;p.position.set(ft.x,dt+H+2,ft.z),p.rotation.set(0,0,0),p.scale.set(1,rt,1),p.updateMatrix(),c.push(p.matrix.clone()),p.position.set(ft.x,dt+H+2+rt,ft.z),p.scale.set(1,1,1),p.updateMatrix(),h.push(p.matrix.clone())}H>30&&B()<.28&&(p.position.set(ft.x,dt+H-1.2,ft.z),p.rotation.set(0,St,0),p.scale.set(X+.2,.5,W+.2),p.updateMatrix(),u.push(p.matrix.clone()),f.push(new gt(e.signs[Math.floor(B()*e.signs.length)]).multiplyScalar(2.5)))};for(let N=0;N<this.path.rows;N+=2){const U=((N-Ue)%this.n+this.n)%this.n,O=this.segs[U];for(const X of O.sprites){if(X.kind!=="tower")continue;const W=qn(U*977+(X.x>0?1:2)),H=12+W()*16,B=12+W()*16,Q=s+Math.pow(W(),1.6)*(r-s);m(N,Math.sign(X.x),14+(Math.abs(X.x)-2.2)*3,H,B,Q,W)}if(U%10===0)for(const X of[-1,1])for(let W=0;W<3;W++){const H=qn(U*131+W*17+(X>0?5:9));if(H()>n*(W===0?.55:.8))continue;const B=14+H()*22,Q=14+H()*22,pt=(s+Math.pow(H(),1.4)*(r-s))*(W===2?1.3:1);m(N,X,18+W*34+H()*14,B,Q,pt,H)}}const d=t(Zg(this.def.seed,e)),E=t(new pe({color:16777215,roughness:.55,metalness:.35,envMapIntensity:.6}));E.onBeforeCompile=N=>{N.uniforms.uWin={value:d},N.uniforms.uWinGain={value:this.opts.highContrast?1:1.15},N.vertexShader=N.vertexShader.replace("#include <common>",`#include <common>
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
  vBNormal = normal;`),N.fragmentShader=N.fragmentShader.replace("#include <common>",`#include <common>
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
  diffuseColor.rgb *= mix(1.0, 0.12, bWin);
  // spandrel bands between floors
  diffuseColor.rgb *= bRoof ? 0.6 : (1.0 - 0.18 * step(0.9, bF.y));`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
  roughnessFactor = mix(roughnessFactor, 0.22, bWin);`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
  totalEmissiveRadiance += bLook.rgb * bLit * uWinGain;`)};const S=t(new fe(1,1,1));S.translate(0,.5,0);const x=new we(S,E,Math.max(1,o.length));o.forEach((N,U)=>{x.setMatrixAt(U,N),x.setColorAt(U,a[U])}),x.count=o.length,x.receiveShadow=!1;const F=t(new pe({color:2830134,roughness:.7,metalness:.4})),C=new we(S,F,Math.max(1,l.length));l.forEach((N,U)=>C.setMatrixAt(U,N)),C.count=l.length;const A=t(new pn(.12,.25,1,6));A.translate(0,.5,0);const L=new we(A,F,Math.max(1,c.length));c.forEach((N,U)=>L.setMatrixAt(U,N)),L.count=c.length;const y=new we(t(new ws(.45,8,6)),this.beacon,Math.max(1,h.length));h.forEach((N,U)=>y.setMatrixAt(U,N)),y.count=h.length;const v=t(new Kt({color:16777215})),R=new we(S,v,Math.max(1,u.length));u.forEach((N,U)=>{R.setMatrixAt(U,N),R.setColorAt(U,f[U])}),R.count=u.length;for(const N of[x,C,L,y,R])N.frustumCulled=!1,this.group.add(N)}buildSkyline(t){for(const[e,n,s]of[[!0,2600,520],[!1,1700,330]]){const r=t(Jg(this.def.seed,this.def.palette,e));r.repeat.set(e?5:4,1);const o=t(new Kt({map:r,transparent:!0,alphaTest:.02,side:Le,fog:!1,depthWrite:!1,color:new gt(e?.8:1,e?.8:1,e?.85:1)})),a=t(new pn(n,n,s,64,1,!0));a.translate(0,s/2-40,0);const l=new kt(a,o);l.renderOrder=-5,l.frustumCulled=!1,this.skyline.add(l)}}get extent(){return[-Ue*st.SEG_LEN,(this.n+ha)*st.SEG_LEN]}dispose(){this.group.removeFromParent(),this.skyline.removeFromParent(),this.group.traverse(t=>{t instanceof we&&t.dispose()});for(const t of this.disposables)t.dispose();this.bannerSealed.map?.dispose(),this.disposables=[]}}const vc={low:{pixelCap:1,maxPixels:1e6,bloom:!1,shadow:0,softShadow:!1,density:.45,lamps:4,msaa:0},medium:{pixelCap:1.25,maxPixels:21e5,bloom:!0,shadow:1024,softShadow:!1,density:.75,lamps:6,msaa:4},high:{pixelCap:2,maxPixels:38e5,bloom:!0,shadow:2048,softShadow:!0,density:1,lamps:10,msaa:4}},xc=10;function Mc(i){let t="";try{const n=i.getExtension("WEBGL_debug_renderer_info");t=String(n?i.getParameter(n.UNMASKED_RENDERER_WEBGL):i.getParameter(i.RENDERER))}catch{t=""}if(/swiftshader|llvmpipe|softpipe|software|basic render|microsoft basic/i.test(t))return"low";let e=!1;try{e=window.matchMedia("(pointer: coarse)").matches&&Math.min(window.screen.width,window.screen.height)<820}catch{e=!1}return e?"low":/nvidia|geforce|quadro|rtx|gtx|radeon rx|radeon pro|apple m\d|apple gpu/i.test(t)?"high":"medium"}const o_={uniforms:{tDiffuse:{value:null},uTime:{value:0},uGrain:{value:.03},uVig:{value:.55},uFlash:{value:0},uBoost:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform sampler2D tDiffuse; uniform float uTime, uGrain, uVig, uFlash, uBoost; varying vec2 vUv;
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      vec2 d = (vUv - 0.5) * vec2(1.0, 0.82);
      float v = smoothstep(0.78, 0.18, length(d));
      c.rgb *= mix(1.0, v, uVig);
      c.rgb += vec3(0.08, 0.32, 0.42) * uBoost * (1.0 - v);
      float n = fract(sin(dot(gl_FragCoord.xy + fract(uTime) * 917.0, vec2(12.9898, 78.233))) * 43758.5453);
      c.rgb += (n - 0.5) * uGrain;
      c.rgb = mix(c.rgb, vec3(1.0), uFlash);
      gl_FragColor = c;
    }`};function yc(){return new Pe({uniforms:{uTop:{value:new gt},uMid:{value:new gt},uHor:{value:new gt},uMoon:{value:new D(.4,.32,-.85).normalize()},uStars:{value:1}},vertexShader:`varying vec3 vDir;
      void main(){ vDir = position; vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position = p.xyww; }`,fragmentShader:`uniform vec3 uTop, uMid, uHor, uMoon; uniform float uStars; varying vec3 vDir;
      float hash(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
      void main(){
        vec3 d = normalize(vDir);
        float h = d.y;
        vec3 c = mix(uHor, uMid, smoothstep(-0.02, 0.16, h));
        c = mix(c, uTop, smoothstep(0.12, 0.65, h));
        vec3 q = floor(d * 380.0);
        float s = hash(q);
        c += vec3(0.9, 0.95, 1.0) * step(0.9972, s) * smoothstep(0.06, 0.4, h) * (0.35 + 0.65 * hash(q + 3.1)) * uStars;
        float m = dot(d, normalize(uMoon));
        c += vec3(0.95, 0.97, 1.0) * smoothstep(0.99945, 0.99965, m) * 2.2;
        c += vec3(0.25, 0.3, 0.42) * pow(max(m, 0.0), 220.0) * 0.5;
        gl_FragColor = vec4(c, 1.0);
      }`,side:Le,depthWrite:!1,fog:!1})}const Te=new D,Wn=new D,a_=(i,t)=>(i%t+t)%t;class l_{constructor(t,e){P(this,"kind","3d");P(this,"gl");P(this,"scene",new zl);P(this,"camera",new Ge(64,16/9,.1,3400));P(this,"composer");P(this,"bloom");P(this,"post");P(this,"level","medium");P(this,"requested","auto");P(this,"q",vc.medium);P(this,"world",null);P(this,"worldKey","");P(this,"path",null);P(this,"env",null);P(this,"pmrem");P(this,"sky");P(this,"skyMat");P(this,"shared");P(this,"glow");P(this,"streak");P(this,"smoke");P(this,"cars",[]);P(this,"fx");P(this,"moon",new Dg(10466047,.35));P(this,"hemi",new Rg(3820154,460812,.35));P(this,"pool",[]);P(this,"heads",[]);P(this,"under");P(this,"tailLight");P(this,"boostLight");P(this,"pose",Th());P(this,"pt",{x:0,y:0,z:0});P(this,"camOff",6.4);P(this,"camOffV",0);P(this,"camLat",0);P(this,"camH",2.1);P(this,"lookLat",0);P(this,"prevLocal",0);P(this,"prevSpeed",0);P(this,"accel",0);P(this,"fov",64);P(this,"rivalPrev",[]);P(this,"lost",!1);P(this,"frameAcc",0);P(this,"frameN",0);P(this,"lastDown",0);P(this,"now",0);P(this,"bodyRoll",0);P(this,"bodyPitch",0);P(this,"orbit",Number(new URLSearchParams(location.search).get("orbit")??0)||0);P(this,"onLevelChange",()=>{});P(this,"onContext",()=>{});P(this,"onLost",t=>{t.preventDefault(),this.lost=!0,this.onContext(!0)});P(this,"onRestored",()=>{this.lost=!1,this.disposeWorld(),this.buildComposer(),this.onContext(!1)});this.canvas=t,this.gl=new H0({canvas:t,antialias:!1,powerPreference:"high-performance",stencil:!1});const n=this.gl.getContext();this.gl.toneMapping=pa,this.gl.toneMappingExposure=1.05,this.gl.outputColorSpace=He,this.gl.shadowMap.enabled=!0,this.pmrem=new ia(this.gl),this.glow=n_(),this.streak=i_(),this.smoke=s_(),this.shared=Wg(this.glow),this.skyMat=yc(),this.sky=new kt(new ws(3e3,32,16),this.skyMat),this.sky.renderOrder=-10,this.sky.frustumCulled=!1,this.scene.add(this.sky),this.scene.add(this.camera),this.scene.add(this.hemi),this.moon.castShadow=!0;const s=this.moon.shadow.camera;s.left=-14,s.right=14,s.top=14,s.bottom=-14,s.near=1,s.far=140,this.moon.shadow.bias=-4e-4,this.moon.shadow.normalBias=.03,this.scene.add(this.moon,this.moon.target);for(let o=0;o<xc;o++){const a=new hr(16777215,0,48,2);this.pool.push(a)}ac.forEach(o=>{const a=new Yg(o,this.shared);this.cars.push(a),this.scene.add(a.root)}),this.rivalPrev=[0,1,2].map(()=>({x:0,s:0,speed:0,brake:0}));const r=this.cars[0];for(const o of[-.62,.62]){const a=new Pg(15266303,0,95,.46,.55,2);a.position.set(o,.62,-r.halfLength+.1),a.target.position.set(o*1.6,0,-r.halfLength-26),r.root.add(a,a.target),this.heads.push(a)}this.under=new hr(new gt(ac[0].accent),5,5.5,2),this.under.position.set(0,.25,0),this.tailLight=new hr(16719920,2,7,2),this.tailLight.position.set(0,.25,r.halfLength+2.4),this.boostLight=new hr(8386303,0,9,2),this.boostLight.position.copy(r.exhaustPos).add(new D(0,.1,.6)),r.root.add(this.under,this.tailLight,this.boostLight),this.fx=new $g(this.glow,this.smoke),this.scene.add(this.fx.group),this.camera.add(this.fx.streaks),this.scene.fog=new Ta(0,.0024),this.requested=e,this.level=e==="auto"?Mc(n):e,this.applyLevel(this.level,!0),t.addEventListener("webglcontextlost",this.onLost,!1),t.addEventListener("webglcontextrestored",this.onRestored,!1),this.resize()}get activeLevel(){return this.level}setQuality(t){this.requested=t;const e=t==="auto"?Mc(this.gl.getContext()):t;e!==this.level&&this.applyLevel(e,!1)}applyLevel(t,e){this.level=t,this.q=vc[t];const n=this.q;this.gl.shadowMap.enabled=n.shadow>0,this.gl.shadowMap.type=n.softShadow?Lc:da,this.moon.castShadow=n.shadow>0,n.shadow>0&&(this.moon.shadow.mapSize.set(n.shadow,n.shadow),this.moon.shadow.map?.dispose(),this.moon.shadow.map=null);for(let s=0;s<xc;s++){const r=this.pool[s];s<n.lamps&&!r.parent?this.scene.add(r):s>=n.lamps&&r.parent&&r.removeFromParent()}e||(this.disposeWorld(),this.scene.traverse(s=>{const r=s.material;Array.isArray(r)?r.forEach(o=>o.needsUpdate=!0):r&&(r.needsUpdate=!0)})),this.buildComposer(),this.resize(),this.onLevelChange(t)}buildComposer(){this.composer?.dispose(),this.bloom?.dispose();const t=this.gl.getDrawingBufferSize(new ht),e=new nn(Math.max(1,t.x),Math.max(1,t.y),{type:vn,samples:this.q.msaa});this.composer=new kg(this.gl,e),this.composer.addPass(new Gg(this.scene,this.camera)),this.bloom=new Yi(new ht(t.x/2,t.y/2),.55,.5,.95),this.bloom.enabled=this.q.bloom,this.composer.addPass(this.bloom),this.composer.addPass(new Hg),this.post=new wh(o_),this.composer.addPass(this.post)}resize(){const t=Math.max(1,window.innerWidth),e=Math.max(1,window.innerHeight),n=window.devicePixelRatio||1,s=Math.max(.5,Math.min(n,this.q.pixelCap,Math.sqrt(this.q.maxPixels/(t*e))));this.gl.setPixelRatio(s),this.gl.setSize(t,e,!1),this.composer.setPixelRatio(s),this.composer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}disposeWorld(){this.world?.dispose(),this.world=null,this.worldKey="",this.env?.dispose(),this.env=null,this.scene.environment=null}ensureWorld(t){const e=`${t.track.def.id}:${this.level}:${t.highContrast?1:0}`;if(this.world&&this.worldKey===e&&this.path)return this.world.setThreshold(t.threshold),this.world;this.disposeWorld(),(!this.path||this.path.track!==t.track)&&(this.path=new ua(t.track));const n=Math.min(8,this.gl.capabilities.getMaxAnisotropy());return this.world=new r_(this.path,t.track.def,{density:this.q.density,highContrast:t.highContrast,threshold:t.threshold},{glow:this.glow,streak:this.streak,anisotropy:n}),this.scene.add(this.world.group,this.world.skyline),this.worldKey=e,this.applyPalette(t.track.def.palette),this.fx.clear(),this.world}applyPalette(t){const e=new gt(t.fog).lerp(new gt(t.skyBottom),.25).multiplyScalar(.5);this.scene.fog.color.copy(e),this.skyMat.uniforms.uTop.value.set(t.skyTop).multiplyScalar(.6),this.skyMat.uniforms.uMid.value.set(t.skyMid).multiplyScalar(.55),this.skyMat.uniforms.uHor.value.copy(e).lerp(new gt(t.skyBottom),.35).multiplyScalar(1.3),this.hemi.color.set(t.skyMid),this.env=this.buildEnv(t),this.scene.environment=this.env.texture,this.scene.environmentIntensity=.55}buildEnv(t){const e=new zl,n=[],s=yc();s.uniforms.uTop.value.set(t.skyTop).multiplyScalar(.5),s.uniforms.uMid.value.set(t.skyMid).multiplyScalar(.5),s.uniforms.uHor.value.set(t.skyBottom).multiplyScalar(.7),s.uniforms.uStars.value=0;const r=new ws(80,32,16);e.add(new kt(r,s)),n.push(s,r);const o=new fe(1,1,1);n.push(o);const a=new Kt({color:new gt("#ffc58a").multiplyScalar(1.6)}),l=new Kt({color:new gt("#c6dcff").multiplyScalar(1.4)}),c=new Kt({color:new gt("#06080c")}),h=t.signs.map(m=>new Kt({color:new gt(m).multiplyScalar(3)}));n.push(a,l,c,...h);let u=7;const f=()=>(u=u*16807%2147483647,u/2147483647);for(let m=0;m<64;m++){const d=m/64*Math.PI*2,E=40+f()*25,S=6+f()*30,x=new kt(o,c);x.position.set(Math.cos(d)*E,S/2-4,Math.sin(d)*E),x.scale.set(6+f()*8,S,6+f()*8),x.lookAt(0,x.position.y,0),e.add(x);for(let F=0;F<4;F++){const C=new kt(o,f()<.7?a:l);C.position.copy(x.position).multiplyScalar(.96),C.position.y=f()*S-3,C.scale.set(1+f()*3,.4,.2),C.lookAt(0,C.position.y,0),e.add(C)}if(f()<.25){const F=new kt(o,h[Math.floor(f()*h.length)]);F.position.copy(x.position).multiplyScalar(.94),F.position.y=4+f()*10,F.scale.set(5,2,.2),F.lookAt(0,F.position.y,0),e.add(F)}}const p=new Kt({color:new gt("#ffd9a8").multiplyScalar(6)});n.push(p);for(let m=0;m<6;m++){const d=new kt(o,p);d.position.set(m%2?7:-7,9,-30+m*12),d.scale.set(1.2,.2,.5),e.add(d)}const g=new kt(new qe(400,400),new Kt({color:329224}));g.rotation.x=-Math.PI/2,g.position.y=-4,e.add(g),n.push(g.geometry,g.material);const _=this.pmrem.fromScene(e,.02,.1,400);for(const m of n)m.dispose();return _}render(t){if(this.lost)return;const e=performance.now();this.now=t.time;const n=this.ensureWorld(t),s=this.path,r=s.length,o=t.dt,a=a_(t.s,r);this.prevLocal-a>r/2?this.fx.clear():a-this.prevLocal>r/2&&this.fx.clear();const l=a-this.prevLocal,c=Math.abs(l)>r/2?l-Math.sign(l)*r:l;this.prevLocal=a;const h=t.speedPct*12e3*be;if(o>0){const v=(h-this.prevSpeed)/o;this.accel+=(v-this.accel)*Math.min(1,o*4)}this.prevSpeed=h;const u=this.cars[0];s.point(a,t.x,0,this.pose,this.pt),u.root.position.set(this.pt.x,this.pt.y,this.pt.z);const f=this.pose.head,p=t.vx*.12+(t.drifting?t.vx*.1:0);u.root.rotation.set(this.pose.pitch,-(f+p),-this.pose.bank);const g=Math.max(-.07,Math.min(.07,-t.vx*.025-t.steer*t.speedPct*.025)),_=Math.max(-.04,Math.min(.04,this.accel*.0022)),m=Math.min(1,o*8);this.bodyRoll+=(g-this.bodyRoll)*m,this.bodyPitch+=(_-this.bodyPitch)*m,u.body.rotation.set(this.bodyPitch,0,this.bodyRoll),u.body.position.y=Math.sin(t.time*31)*.004*t.speedPct,u.animate(Math.max(-2,c*be),t.steer,t.braking,t.boostAmt,t.time);for(const v of this.heads)v.intensity=1100;this.tailLight.intensity=t.braking?2.2:.5,this.boostLight.intensity=t.boostAmt*40,this.under.intensity=4;for(let v=0;v<3;v++){const R=this.cars[v+1],N=t.rivals[v];if(!N){R.root.visible=!1;continue}const U=a+(N.s-t.s);if(U<s.minS+2e3||U>s.maxS-2e3||Math.abs(N.s-t.s)>9e4){R.root.visible=!1;continue}R.root.visible=!0;const O=this.rivalPrev[v],X=N.s-O.s,W=N.x-O.x,H=X>1?Math.atan2(W*ve,X*be):0,B=N.speed<O.speed-30*Math.max(o,.001)*60?1:0;O.brake+=(B-O.brake)*Math.min(1,o*10),O.s=N.s,O.x=N.x,O.speed=N.speed,s.point(U,N.x,0,this.pose,this.pt),R.root.position.set(this.pt.x,this.pt.y,this.pt.z),R.root.rotation.set(this.pose.pitch,-(this.pose.head+Math.max(-.3,Math.min(.3,H))),-this.pose.bank),R.body.rotation.z=Math.max(-.05,Math.min(.05,-H*.3)),R.animate(Math.max(0,Math.min(5,X*be)),Math.max(-1,Math.min(1,H*4)),O.brake>.5,0,t.time);const Q=(N.s-t.s)*be;Q>2&&Q<70&&N.speed>3e3&&Math.random()<o*40&&this.spray(R,N.speed*be,.5)}n.setGate(t.gateOpen,t.time,t.reducedFlash);const d=this.camera;if(t.cinematic){const v=t.time*.11+this.orbit,R=8.4;u.root.updateMatrixWorld(),Te.set(Math.sin(v)*R,1.25+Math.sin(t.time*.23)*.3,Math.cos(v)*R),Te.applyMatrix4(u.root.matrixWorld),d.position.copy(Te),Wn.set(-.6,.6,0).applyMatrix4(u.root.matrixWorld),d.up.set(0,1,0),d.lookAt(Wn),this.fov+=(36-this.fov)*Math.min(1,o*3);const N=this.canvas.width,U=this.canvas.height,O=N>U*1.2?-N*.17:0;(!d.view?.enabled||d.view.offsetX!==O)&&d.setViewOffset(N,U,O,0,N,U)}else{d.view?.enabled&&d.clearViewOffset();const v=6.4+t.speedPct*.9+t.boostAmt*1.3+Math.max(0,this.accel)*.02,R=9,N=R*R*(v-this.camOff)-2*R*this.camOffV;this.camOffV+=N*o,this.camOff+=this.camOffV*o;const U=t.x*ve*.85;this.camLat+=(U-this.camLat)*Math.min(1,o*5),this.lookLat+=(t.x*ve-this.lookLat)*Math.min(1,o*7),this.camH+=(2.05+t.speedPct*.1-this.camH)*Math.min(1,o*3);const O=a-this.camOff/be;s.point(O,this.camLat/ve,0,this.pose,this.pt),d.position.set(this.pt.x,this.pt.y+this.camH,this.pt.z),s.point(a+9/be,this.lookLat/ve,0,this.pose,this.pt),Wn.set(this.pt.x,this.pt.y+.85,this.pt.z);const X=720/Math.max(1,this.canvas.height);d.position.x+=t.shakeX*X*.016,d.position.y+=t.shakeY*X*.012,d.up.set(0,1,0),d.lookAt(Wn),s.sample(a,this.pose),d.rotateZ(-this.pose.bank*.45-t.vx*.006+t.shakeX*X*.0012);const W=64+t.speedPct*5+t.boostAmt*12;this.fov+=(W-this.fov)*Math.min(1,o*5)}Math.abs(d.fov-this.fov)>.01&&(d.fov=this.fov,d.updateProjectionMatrix()),this.sky.position.copy(d.position),n.skyline.position.set(d.position.x,d.position.y-30,d.position.z);const E=n.lamps,S=a-this.camOff/be-15/be;let x=0,F=E.length;for(;x<F;){const v=x+F>>1;E[v].s<S?x=v+1:F=v}const C=this.q.lamps,A=Math.max(1,(E[Math.min(E.length-1,x+C-1)]?.s??S)-S);for(let v=0;v<C;v++){const R=this.pool[v],N=E[x+v];if(!N){R.intensity=0;continue}R.position.set(N.x,N.y,N.z),R.color.copy(N.color);const U=(N.s-S)/A,O=U>.7?Math.max(0,1-(U-.7)/.3):1;R.intensity=380*N.power*O}if(this.moon.position.set(u.root.position.x+18,u.root.position.y+60,u.root.position.z+24),this.moon.target.position.copy(u.root.position),!t.cinematic&&t.dt>0&&(h>14&&Math.random()<o*60*Math.min(1,t.speedPct*1.3)&&this.spray(u,h,1),t.drifting&&t.speedPct>.3))for(let v=0;v<2;v++)this.smokeAt(u,v?1:-1,h);this.fx.update(o);const L=t.speedLines&&!t.cinematic?Math.max(0,t.speedPct-.45)*1.8+t.boostAmt*.6:0;this.fx.updateStreaks(o,h,Math.min(1,L)*(t.reducedMotion?.4:1),t.boostAmt);const y=this.post.uniforms;y.uTime.value=t.time,y.uGrain.value=t.reducedFlash||t.highContrast?0:.028,y.uVig.value=t.highContrast?.2:.5,y.uFlash.value=t.reducedFlash?0:Math.min(1,t.flash)*.18,y.uBoost.value=t.highContrast?0:t.boostAmt*(t.reducedFlash?.25:.5),this.bloom.enabled=this.q.bloom,this.composer.render(o),this.autoLevel(performance.now()-e,o)}autoLevel(t,e){if(this.requested!=="auto"||e<=0||(this.frameAcc+=e,this.frameN++,this.frameN<120))return;const n=this.frameAcc/this.frameN*1e3;this.frameAcc=0,this.frameN=0,n>24&&this.level!=="low"&&this.now-this.lastDown>6&&(this.lastDown=this.now,this.applyLevel(this.level==="high"?"medium":"low",!1))}spray(t,e,n){t.root.updateMatrixWorld();const s=t.spec;for(const r of[-1,1]){if(Math.random()>n)continue;Te.set(r*s.track/2+(Math.random()-.5)*.3,.15,s.wheelbase/2+s.wheelR),Te.applyMatrix4(t.root.matrixWorld),Wn.set((Math.random()-.5)*1.6+r*.6,.6+Math.random()*1.4,0).applyQuaternion(t.root.quaternion);const o=new D(0,0,-1).applyQuaternion(t.root.quaternion).multiplyScalar(e*.55);this.fx.mist.spawn(Te.x,Te.y,Te.z,o.x+Wn.x,Wn.y,o.z+Wn.z,.5+Math.random()*.4,.62,.68,.78,.16+Math.min(.14,e/600))}}smokeAt(t,e,n){t.root.updateMatrixWorld();const s=t.spec;Te.set(e*s.track/2,.2,s.wheelbase/2),Te.applyMatrix4(t.root.matrixWorld);const r=new D(0,0,-1).applyQuaternion(t.root.quaternion).multiplyScalar(n*.7);this.fx.mist.spawn(Te.x,Te.y,Te.z,r.x+(Math.random()-.5)*2,.8+Math.random(),r.z+(Math.random()-.5)*2,.9+Math.random()*.5,.82,.84,.9,.3)}sparks(t,e){const n=this.cars[0];n.root.updateMatrixWorld();const s=new D(0,0,-1).applyQuaternion(n.root.quaternion),r=new D(1,0,0).applyQuaternion(n.root.quaternion),o=this.prevSpeed;for(let a=0;a<e;a++){Te.set(t*n.spec.width/2,.3+Math.random()*.3,(Math.random()-.3)*n.spec.length*.6).applyMatrix4(n.root.matrixWorld);const l=s.clone().multiplyScalar(o*(.5+Math.random()*.4));l.addScaledVector(r,t*(1+Math.random()*4)),l.y+=1+Math.random()*4;const c=Math.random();this.fx.sparks.spawn(Te.x,Te.y,Te.z,l.x,l.y,l.z,.25+Math.random()*.45,1.6,.9+c*.5,.45+c*.4,1)}}clearFx(){this.fx.clear()}get trackPath(){return this.path}dispose(){this.canvas.removeEventListener("webglcontextlost",this.onLost),this.canvas.removeEventListener("webglcontextrestored",this.onRestored),this.disposeWorld();for(const e of this.cars)e.dispose();const t=this.shared;for(const e of[t.glass,t.rubber,t.rim,t.disc,t.trim,t.seam,t.headlight,t.shadow])e.dispose();this.fx.dispose(),this.glow.dispose(),this.streak.dispose(),this.smoke.dispose(),this.sky.geometry.dispose(),this.skyMat.dispose(),this.moon.shadow.map?.dispose();for(const e of this.pool)e.dispose();this.bloom.dispose(),this.composer.dispose(),this.pmrem.dispose(),this.gl.dispose()}}const c_=["auto","low","medium","high"],Sc="neon-overdrive:v1";function h_(){let i=!1,t=!1;try{i=!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,t=!!window.matchMedia?.("(prefers-contrast: more)").matches}catch{}return{volume:.7,muted:!1,music:!0,shake:!i,reducedFlash:i,highContrast:t,speedLines:!0,tutorialSeen:!1,lastTrack:0,lastDiff:1,quality:"auto"}}function bc(){return{bestTotal:null,bestLap:null,bestPos:null,bestSplits:[],races:0}}const ur=(i,t,e,n)=>typeof i=="number"&&Number.isFinite(i)?Math.min(n,Math.max(e,i)):t,ni=(i,t)=>typeof i=="boolean"?i:t,Ec=i=>typeof i=="number"&&Number.isFinite(i)&&i>0&&i<36e3?i:null;function u_(i){const t=h_(),e={v:1,settings:t,records:{}};if(!i)return e;let n;try{n=JSON.parse(i)}catch{return e}if(!n||typeof n!="object")return e;const s=n;if(s.v!==1)return e;const r=s.settings&&typeof s.settings=="object"?s.settings:{};e.settings={volume:ur(r.volume,t.volume,0,1),muted:ni(r.muted,t.muted),music:ni(r.music,t.music),shake:ni(r.shake,t.shake),reducedFlash:ni(r.reducedFlash,t.reducedFlash),highContrast:ni(r.highContrast,t.highContrast),speedLines:ni(r.speedLines,t.speedLines),tutorialSeen:ni(r.tutorialSeen,t.tutorialSeen),lastTrack:Math.round(ur(r.lastTrack,0,0,2)),lastDiff:Math.round(ur(r.lastDiff,1,0,2)),quality:c_.includes(r.quality)?r.quality:t.quality};const o=s.records;if(o&&typeof o=="object")for(const[a,l]of Object.entries(o)){if(!/^\d:\d$/.test(a)||!l||typeof l!="object")continue;const c=l,h=Array.isArray(c.bestSplits)?c.bestSplits.filter(f=>typeof f=="number"&&Number.isFinite(f)).slice(0,4):[],u=typeof c.bestPos=="number"&&c.bestPos>=1&&c.bestPos<=4?Math.round(c.bestPos):null;e.records[a]={bestTotal:Ec(c.bestTotal),bestLap:Ec(c.bestLap),bestPos:u,bestSplits:h.length===4?h:[],races:Math.round(ur(c.races,0,0,1e6))}}return e}class f_{constructor(){P(this,"data");P(this,"timer",0);let t=null;try{t=localStorage.getItem(Sc)}catch{t=null}this.data=u_(t)}get settings(){return this.data.settings}record(t,e){return this.data.records[`${t}:${e}`]??bc()}submit(t,e,n,s,r,o){const a=`${t}:${e}`,l=this.data.records[a]??bc(),c=Math.min(...s),h={total:l.bestTotal===null||n<l.bestTotal,lap:l.bestLap===null||c<l.bestLap,pos:l.bestPos===null||o<l.bestPos};return h.total&&(l.bestTotal=n),h.lap&&(l.bestLap=c,r.length===4&&(l.bestSplits=r)),h.pos&&(l.bestPos=o),l.races++,this.data.records[a]=l,this.save(),h}resetRecords(){this.data.records={},this.save()}save(){window.clearTimeout(this.timer),this.timer=window.setTimeout(()=>this.flush(),150)}flush(){try{localStorage.setItem(Sc,JSON.stringify(this.data))}catch{}}}const Qe=[{id:"halogen",name:"HALOGEN RUN",tagline:"Waterfront warm-up",blurb:"Wide avenues, gentle sweepers and a long glowing quay. The Spine runs under the harbour lights.",rank:1,aiBonus:0,hz:110,seed:11,sections:[[25,40,25,0,0],[30,50,30,2,0],[25,40,25,0,12],[25,40,25,-2.5,-8],[40,80,40,0,0],[30,45,30,3,10],[30,45,30,-3,-10],[40,80,40,0,6],[25,40,25,2.5,0],[25,40,25,-2,-6],[30,100,30,0,0],[30,50,30,-3,8],[30,40,30,3,-8],[40,100,40,0,0]],spines:[{at:.1,len:160},{at:.46,len:190},{at:.8,len:150}],overpasses:[.035,.36,.71],palette:{skyTop:"#03061a",skyMid:"#0b1c4a",skyBottom:"#1b6a9a",sun1:"#ff4fb8",sun2:"#ffd36b",ground0:"#07142a",ground1:"#0a1b36",road0:"#1b2540",road1:"#212c4b",rumble0:"#2cf6ff",rumble1:"#0b3d6b",lane:"#c9f8ff",edge:"#2cf6ff",accentA:"#2cf6ff",accentB:"#ff2ea6",fog:"#0b2a55",tints:["#0f2a5c","#12386e","#0b2046","#173f86"],signs:["#2cf6ff","#ff2ea6","#ffb347","#8a4dff"],skyline:"#081a44"}},{id:"violet",name:"VIOLET DESCENT",tagline:"Hill district drop",blurb:"The road climbs over the old terraces and falls away. Crests hide the next gate, so watch your reserve.",rank:2,aiBonus:.03,hz:73.4,seed:23,sections:[[25,40,25,0,0],[30,40,30,2.5,18],[30,40,30,-3,-6],[30,50,30,0,24],[35,40,35,3.5,0],[30,40,30,-4,-22],[25,60,25,0,-8],[30,40,30,4,14],[30,40,30,-4.5,8],[40,60,40,0,28],[30,40,30,3,-20],[30,40,30,-3.5,-12],[40,70,40,0,10],[30,40,30,4.5,-10],[30,40,30,-3,0],[40,80,40,0,0]],spines:[{at:.12,len:180},{at:.47,len:210},{at:.8,len:170}],overpasses:[.04,.62],palette:{skyTop:"#0a0420",skyMid:"#2a0c5e",skyBottom:"#8a2d9b",sun1:"#ff2ea6",sun2:"#ffb347",ground0:"#120826",ground1:"#190c33",road0:"#251540",road1:"#2d1b4d",rumble0:"#ff2ea6",rumble1:"#3b1670",lane:"#f2d8ff",edge:"#ff2ea6",accentA:"#8a4dff",accentB:"#2cf6ff",fog:"#2a0f55",tints:["#2a1060","#3a1580","#1e0a48","#4a1c9a"],signs:["#ff2ea6","#2cf6ff","#ffb347","#b58cff"],skyline:"#1a0a40"}},{id:"meridian",name:"REDLINE MERIDIAN",tagline:"Financial canyon sprint",blurb:"Long flat-out straights between glass cliffs, then violent esses. The Spine is the only honest shortcut.",rank:3,aiBonus:.05,hz:92.5,seed:37,sections:[[25,60,25,0,0],[25,35,25,4,6],[20,30,20,-4.5,-6],[20,30,20,5,0],[30,120,30,0,12],[25,40,25,-5.5,-12],[30,100,30,0,0],[25,40,25,4.5,14],[20,30,20,-5,-10],[20,30,20,5.5,8],[20,30,20,-4,-8],[40,140,40,0,0],[25,40,25,4,10],[25,40,25,-4.5,-10],[30,90,30,0,18],[25,40,25,5,-18],[30,100,30,0,0]],spines:[{at:.09,len:220},{at:.43,len:230},{at:.78,len:200}],overpasses:[.03,.66],tunnels:[{at:.3,len:200}],palette:{skyTop:"#05071a",skyMid:"#1a1250",skyBottom:"#d9582b",sun1:"#ffb347",sun2:"#ff2e63",ground0:"#0a0d22",ground1:"#10142e",road0:"#1a1f38",road1:"#222744",rumble0:"#ffb347",rumble1:"#4a1a3a",lane:"#ffe9c4",edge:"#ffb347",accentA:"#ffb347",accentB:"#ff2ea6",fog:"#3a1840",tints:["#1a1a4a","#26206a","#12123a","#3a2078"],signs:["#ffb347","#ff2ea6","#2cf6ff","#8a4dff"],skyline:"#140f3a"}}],je=(i,t,e)=>i<t?t:i>e?e:i;function d_(i,t){return{s:i,x:t,vx:0,speed:0,reserve:st.RESERVE_START,boosting:!1,drifting:!1,spineMode:!1,wallCd:0,gateCd:0,cleanT:0,slip:0}}function p_(i,t,e,n,s,r){const o=st.MAX_SPEED,a=hi(e,i.s),l=Math.abs(i.x)<=st.OFFROAD_X,c=t.boost&&i.reserve>st.BOOST_MIN&&i.speed>1e3;c&&!i.boosting&&r.push({type:"boostStart",value:1}),i.boosting=c,i.boosting&&(i.reserve-=st.BOOST_DRAIN*s);let h=o*(i.boosting?st.BOOST_MULT:1)*(i.spineMode?st.SPINE_SPEED_MULT:1);if(l||(h=Math.min(h,o*st.OFFROAD_CAP)),t.brake)i.speed>0?i.speed=Math.max(0,i.speed-st.BRAKE*s):i.speed=Math.max(-o*st.REV_MAX,i.speed-st.REV_ACCEL*s);else if(t.throttle){if(i.speed<0)i.speed=Math.min(0,i.speed+st.BRAKE*s);else if(i.speed<h){const y=st.ACCEL*(i.boosting?st.BOOST_ACCEL:1)*(1-.55*(i.speed/h));i.speed=Math.min(h,i.speed+y*s)}}else i.speed>0?i.speed=Math.max(0,i.speed-st.COAST*s):i.speed<0&&(i.speed=Math.min(0,i.speed+st.COAST*s));i.speed>h&&(i.speed=Math.max(h,i.speed-(l?st.OVER_DECEL:st.OFFROAD_DECEL)*s));const u=t.steer;i.drifting?(!t.drift||i.speed<st.DRIFT_HOLD_SPEED*o)&&(i.drifting=!1):t.drift&&i.speed>st.DRIFT_MIN_SPEED*o&&Math.abs(u)>.2&&(i.drifting=!0);const f=je(Math.abs(i.speed)/o,0,1.6),p=je(Math.abs(i.speed)/3600,0,1)*(i.speed<0?-1:1),g=(i.drifting?st.DRIFT_GRIP:st.GRIP)*n.grip,_=st.STEER*(i.drifting?st.DRIFT_STEER:1),m=i.speed>0?a.curve*f*f*st.CENT*(i.drifting?st.DRIFT_CENT:1):0,d=u*_*p-m;i.vx+=(d-i.vx)*Math.min(1,g*s),i.x+=i.vx*s,i.slip=i.vx,i.cleanT+=s,i.drifting&&(i.reserve+=st.DRIFT_GAIN*je(Math.abs(i.vx)/1.2,0,1)*n.regen*s,i.speed=Math.max(0,i.speed-st.DRIFT_SCRUB*s)),i.cleanT>st.CLEAN_AFTER_HIT&&f>.5&&l&&(i.reserve+=st.CLEAN_GAIN*n.regen*s),i.spineMode&&(i.reserve-=st.SPINE_DRAIN*s);const E=i.s;i.s+=i.speed*s*(i.spineMode?st.SPINE_ADVANCE:1),i.s<0&&(i.s=0,i.speed=0),i.gateCd=Math.max(0,i.gateCd-s);const S=e.segs.length,x=Math.floor(E/st.SEG_LEN)+1,F=Math.floor(i.s/st.SEG_LEN);for(let y=x;y<=F;y++){const v=e.segs[(y%S+S)%S];if(v.gate===1)if(Math.abs(i.x)<st.SPINE_RAIL)if(i.reserve>=n.threshold)i.spineMode=!0,r.push({type:"gateOpen",value:i.reserve});else{const R=i.x>=0?1:-1;i.speed*=st.SPINE_CRASH_KEEP,i.x=R*st.SPINE_CRASH_X,i.vx=R*.6,i.gateCd=st.SPINE_GATE_COOLDOWN,i.cleanT=0,i.spineMode=!1,i.boosting=!1,r.push({type:"gateSealed",value:1})}else i.spineMode=!1;else v.gate===2&&(i.spineMode=!1)}if(hi(e,i.s).spine){const y=i.x>=0?1:-1,v=Math.abs(i.x);i.spineMode?v>st.SPINE_INNER_CLAMP&&(Math.abs(i.vx)>.3&&(i.speed*=.985,r.push({type:"rail",value:je(Math.abs(i.vx)/2,.1,1)})),i.x=y*st.SPINE_INNER_CLAMP,i.vx=-y*Math.abs(i.vx)*.3):v<st.SPINE_OUTER&&(Math.abs(i.vx)>.3&&(i.speed*=.99,r.push({type:"rail",value:je(Math.abs(i.vx)/2,.1,1)})),i.x=y*st.SPINE_OUTER,i.vx=y*Math.abs(i.vx)*.3)}else i.spineMode=!1;i.wallCd=Math.max(0,i.wallCd-s);const A=Math.abs(i.x),L=i.x>=0?1:-1;if(A>=st.WALL_X){if(i.wallCd<=0){const y=je(.3+Math.abs(i.vx)*.25+i.speed/o*.35,.2,1);i.speed*=st.WALL_SPEED_KEEP,i.reserve-=st.WALL_PENALTY,i.cleanT=0,i.wallCd=st.WALL_COOLDOWN,r.push({type:"wall",value:y})}i.x=L*(st.WALL_X-.03),i.vx=-L*Math.abs(i.vx)*.35}else A>st.WALL_SCRAPE_X&&i.speed>2e3&&(i.speed=Math.max(0,i.speed-st.SCRAPE_DECEL*s),i.cleanT=0,r.push({type:"scrape",value:je((A-st.WALL_SCRAPE_X)/.1,.2,1)}));i.reserve=je(i.reserve,0,100),(!Number.isFinite(i.speed)||!Number.isFinite(i.x))&&(i.speed=0,i.x=0,i.vx=0)}function m_(){return Dh.map((i,t)=>({name:i.name,color:i.color,skill:i.skill,lane:i.lane,weaveAmp:i.weaveAmp,weaveHz:i.weaveHz,phase:t*2.1,s:i.start.s,x:i.start.x,speed:0,finish:null,early:i.early,late:i.late}))}function wc(i,t,e,n,s,r,o,a){const l=hi(t,i.s),c=st.LAPS*t.length,h=je(i.s/c,0,1),u=i.early+(i.late-i.early)*h;let f=st.MAX_SPEED*(e.ai+n)*i.skill*u;f*=1-.052*Math.abs(l.curve)*(1.05-i.skill*.5);const p=i.s-s;p>6e3?f*=.93:p<-5e3&&(f*=1.04);const g=3e3*a;i.speed+=je(f-i.speed,-g*1.5,g),i.s+=i.speed*a;let _=i.lane+Math.sin(o*i.weaveHz*Math.PI*2+i.phase)*i.weaveAmp;const m=i.s-s;m>0&&m<700&&Math.abs(i.x-r)<.35&&(_+=(i.x>=r?1:-1)*.4);const d=hi(t,i.s+3e3);(l.spine||d.spine)&&Math.abs(_)<.45&&(_=(_>=0?1:-1)*.6),_=je(_,-.9,.9),i.x+=je(_-i.x,-1.2*a,1.2*a),i.finish===null&&i.s>=c&&(i.finish=o-(i.s-c)/Math.max(1,i.speed))}const Tc={steer:0,throttle:!1,brake:!1,drift:!1,boost:!1};class g_{constructor(t,e){P(this,"track");P(this,"diffIdx");P(this,"trackBonus");P(this,"player",d_(0,.5));P(this,"rivals",m_());P(this,"phase","countdown");P(this,"time",0);P(this,"clock",0);P(this,"cdT",0);P(this,"cdShown",0);P(this,"events",[]);P(this,"maxS",0);P(this,"cpCount",0);P(this,"lapStart",0);P(this,"lapTimes",[]);P(this,"splits",[[]]);P(this,"finishTime",null);P(this,"rank",4);P(this,"bumpCd",0);P(this,"results",[]);P(this,"wrongSpine",0);P(this,"spinePasses",0);this.track=t,this.diffIdx=e,this.trackBonus=t.def.aiBonus,this.rank=this.computeRank()}get diff(){return Pn[this.diffIdx]}update(t,e){const n=Math.min(t,st.MAX_DT);this.clock+=n;const s=this.events;if(this.phase==="countdown"){this.cdT+=n;const c=Math.floor((this.cdT-.2)/1),h=c>=0&&c<3?3-c:this.cdT>=st.COUNTDOWN?0:this.cdShown;h!==this.cdShown&&h>0&&s.push({type:"countdown",value:h}),this.cdShown=h,this.cdT>=st.COUNTDOWN&&(this.phase="racing",s.push({type:"go",value:0}));return}this.time+=n;const r=this.phase==="finished",o=r?{steer:0,throttle:!1,brake:this.player.speed>0&&this.time-(this.finishTime??0)>1.2,drift:!1,boost:!1}:e,a=s.length;p_(this.player,o,this.track,this.diff,n,s);for(let c=a;c<s.length;c++)s[c].type==="gateOpen"?this.spinePasses++:s[c].type==="gateSealed"&&this.wrongSpine++;for(const c of this.rivals)wc(c,this.track,this.diff,this.trackBonus,this.player.s,this.player.x,this.time,n);this.collide(n),r||this.progress();const l=this.computeRank();l!==this.rank&&(this.rank=l,s.push({type:"position",value:l}))}collide(t){const e=this.player;this.bumpCd=Math.max(0,this.bumpCd-t);for(const n of this.rivals){const s=n.s-e.s,r=e.x-n.x;if(Math.abs(s)<st.CAR_DS&&Math.abs(r)<st.CAR_DX){const o=r>=0?1:-1,a=(st.CAR_DX-Math.abs(r)+.02)*.5;e.x+=o*a,n.x-=o*a*.6,e.vx+=o*.6,s>0?e.speed>n.speed&&(e.speed=Math.max(n.speed*.94,e.speed*.92)):n.speed*=.93,this.bumpCd<=0&&(this.bumpCd=.4,e.reserve=Math.max(0,e.reserve-st.BUMP_PENALTY),e.cleanT=0,this.events.push({type:"bump",value:Math.min(1,Math.abs(e.speed-n.speed)/4e3+.3)}))}}}progress(){const t=this.track.length;this.maxS=Math.max(this.maxS,this.player.s);const e=Math.floor(this.maxS/(t/st.CHECKPOINTS));for(;this.cpCount<e&&this.phase!=="finished";){this.cpCount++;const n=this.cpCount,s=(n-1)%st.CHECKPOINTS+1,r=Math.floor((n-1)/st.CHECKPOINTS),o=this.time-this.lapStart;if(s<st.CHECKPOINTS)this.splits[r][s-1]=o,this.events.push({type:"checkpoint",value:o,text:String(s)});else{this.lapTimes.push(o),this.splits[r][st.CHECKPOINTS-1]=o,this.lapStart=this.time;const a=r+1;a>=st.LAPS?(this.finishTime=this.time,this.phase="finished",this.events.push({type:"finish",value:this.time})):(this.splits.push([]),this.events.push({type:"lap",value:o,text:String(a+1)}))}}}computeRank(){const t=this.finishTime;let e=1;for(const n of this.rivals)n.finish!==null&&t===null?e++:n.finish!==null&&t!==null?n.finish<t&&e++:t===null&&n.s>this.player.s&&e++;return e}get lap(){return Math.min(st.LAPS,Math.floor(this.maxS/this.track.length)+1)}settle(){if(this.finishTime===null)return;let t=0;for(;this.rivals.some(n=>n.finish===null)&&t++<6e3;){this.time+=1/30;for(const n of this.rivals)wc(n,this.track,this.diff,this.trackBonus,n.s,this.player.x,this.time,1/30)}const e=[{name:"JUNO (YOU)",time:this.finishTime,player:!0,place:0},...this.rivals.map(n=>({name:n.name,time:n.finish??1/0,player:!1,place:0}))];e.sort((n,s)=>n.time-s.time),e.forEach((n,s)=>{n.place=s+1}),this.results=e,this.rank=e.find(n=>n.player)?.place??4}}function cn(i){if(i==null||!Number.isFinite(i))return"--:--.---";const t=Math.floor(i/60),e=i-t*60;return`${t}:${e<10?"0":""}${e.toFixed(3)}`}const bt=i=>{const t=document.getElementById(i);if(!t)throw new Error(`missing #${i}`);return t},Je=i=>i.toLowerCase().replace(/\b\w/g,t=>t.toUpperCase()),Ac=["","first","second","third","fourth"],__=[{id:"auto",name:"Auto"},{id:"low",name:"Low"},{id:"medium",name:"Medium"},{id:"high",name:"High"}];function Rc(i,t,e,n=6){const s=i.segs,r=s.length;let o=1/0,a=-1/0;for(const f of s)o=Math.min(o,f.y1),a=Math.max(a,f.y1);const l=Math.max(1,a-o),c=[],h=Math.max(1,Math.floor(r/160));for(let f=0;f<=r;f+=h){const p=s[Math.min(r-1,f)],g=f/r*t,_=e-n-(p.y1-o)/l*(e-n*2);c.push(`${g.toFixed(1)},${_.toFixed(1)}`)}const u=`M${c.join(" L")}`;return{line:u,area:`${u} L${t},${e} L0,${e} Z`,zones:i.spineStarts.map((f,p)=>[f/r*t,(i.spineEnds[p]-f)/r*t])}}class v_{constructor(t,e){P(this,"current",null);P(this,"returnTo","title");P(this,"selTrack",0);P(this,"selDiff",1);P(this,"msgTimer",0);P(this,"noticeTimer",0);P(this,"last",{});P(this,"dotEls",[]);P(this,"towerEls",[]);P(this,"builtTrack","");P(this,"gfx",{kind:"3d",level:null});this.store=t,this.cb=e,this.buildSetup(),this.buildQuality(),this.buildTower(),this.bind(),this.syncSettings()}set(t,e){this.last[t]!==e&&(this.last[t]=e,bt(t).textContent=e)}show(t){for(const s of document.querySelectorAll(".screen"))s.hidden=!0;if(this.current=t,!t)return;const e=bt("s-"+t);e.hidden=!1,t==="setup"&&this.refreshSetup(),t==="records"&&this.buildRecords(),t==="settings"&&this.syncSettings();const n=t==="setup"?bt("startBtn"):e.querySelector(".primary, .btn, input, button");window.setTimeout(()=>n?.focus({preventScroll:!0}),0)}buildSetup(){const t=bt("trackList");t.innerHTML="",Qe.forEach((n,s)=>{const r=this.cb.track(s),o=fc(r),a=Rc(r,200,26,3),l=document.createElement("button");l.className="track-row",l.type="button",l.setAttribute("role","radio"),l.innerHTML=`<span class="num">${s+1}</span><span class="name">${Je(n.name)}</span><span class="meta">${o.lengthKm.toFixed(1)} km, ${n.tagline.toLowerCase()}</span><svg viewBox="0 0 200 26" preserveAspectRatio="none" aria-hidden="true"><path d="${a.line}"/></svg>`,l.addEventListener("click",()=>{this.selTrack=s,this.cb.onSound("move"),this.refreshSetup()}),t.appendChild(l)});const e=bt("diffRow");e.innerHTML="",Pn.forEach((n,s)=>{const r=document.createElement("button");r.type="button",r.setAttribute("role","radio"),r.textContent=Je(n.name),r.addEventListener("click",()=>{this.selDiff=s,this.cb.onSound("move"),this.refreshSetup()}),e.appendChild(r)})}refreshSetup(){bt("trackList").querySelectorAll(".track-row").forEach((l,c)=>l.setAttribute("aria-checked",String(c===this.selTrack))),bt("diffRow").querySelectorAll("button").forEach((l,c)=>l.setAttribute("aria-checked",String(c===this.selDiff)));const t=Qe[this.selTrack],e=this.cb.track(this.selTrack),n=fc(e);bt("tdName").textContent=Je(t.name),bt("tdBlurb").textContent=t.blurb;const s=Rc(e,600,120);bt("tdProfile").innerHTML=`<defs><linearGradient id="profFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8f0f2" stop-opacity="0.22"/><stop offset="1" stop-color="#e8f0f2" stop-opacity="0"/></linearGradient></defs>${s.zones.map(([l,c])=>`<rect class="zone" x="${l.toFixed(1)}" y="0" width="${c.toFixed(1)}" height="120"/><line class="zone-edge" x1="${l.toFixed(1)}" y1="0" x2="${l.toFixed(1)}" y2="120"/>`).join("")}<path class="area" d="${s.area}"/><path class="line" d="${s.line}"/>`;const r=n.sharpest>=5?"Hairpin":n.sharpest>=4?"Tight":n.sharpest>=3?"Medium":"Open";bt("tdFacts").innerHTML=[["Lap length",`${n.lengthKm.toFixed(2)}<small>km</small>`],["Climb per lap",`${Math.round(n.climbM)}<small>m</small>`],["Spine gates",`${e.spineStarts.length}`],["Sharpest bend",r]].map(([l,c])=>`<div><dt>${l}</dt><dd>${c}</dd></div>`).join("");const o=Pn[this.selDiff];bt("diffBlurb").textContent=`${o.blurb} Spine gates open at ${o.threshold} % reserve.`;const a=this.store.record(this.selTrack,this.selDiff);bt("bestLine").textContent=a.bestTotal===null?"No personal best on this track and difficulty yet.":`Your best: ${cn(a.bestTotal)} race, ${cn(a.bestLap)} lap, best finish ${Ac[a.bestPos??0]??"-"}.`,bt("startBtn").textContent=`Start race on ${Je(t.name)}`}buildRecords(){const t=Qe.flatMap((e,n)=>Pn.map((s,r)=>{const o=this.store.record(n,r);return`<tr><td>${Je(e.name)}</td><td>${Je(s.name)}</td><td class="num">${cn(o.bestTotal)}</td><td class="num">${cn(o.bestLap)}</td><td class="num">${o.bestPos??"-"}</td><td class="num">${o.races}</td></tr>`})).join("");bt("recTable").innerHTML=`<thead><tr><th scope="col">Track</th><th scope="col">Difficulty</th><th scope="col" class="num">Best race</th><th scope="col" class="num">Best lap</th><th scope="col" class="num">Best place</th><th scope="col" class="num">Races</th></tr></thead><tbody>${t}</tbody>`,bt("recConfirm").hidden=!0}buildQuality(){const t=bt("qRow");t.innerHTML="",__.forEach(e=>{const n=document.createElement("button");n.type="button",n.setAttribute("role","radio"),n.textContent=e.name,n.dataset.q=e.id,n.addEventListener("click",()=>{this.store.settings.quality=e.id,this.store.save(),this.cb.onSound("move"),this.cb.onSettings(),this.syncSettings()}),t.appendChild(n)})}setGraphics(t,e){this.gfx={kind:t,level:e},this.syncSettings()}bind(){document.querySelectorAll("[data-go]").forEach(n=>{n.addEventListener("click",()=>{this.cb.onSound(n.dataset.go==="title"?"back":"ok"),this.returnTo="title",this.show(n.dataset.go)})}),bt("startBtn").addEventListener("click",()=>{this.cb.onSound("ok"),this.cb.onStart(this.selTrack,this.selDiff)}),bt("guideBack").addEventListener("click",()=>{this.cb.onSound("back"),this.show(this.returnTo)}),bt("setBack").addEventListener("click",()=>{this.cb.onSound("back"),this.show(this.returnTo)}),bt("pResume").addEventListener("click",()=>this.cb.onResume()),bt("pRestart").addEventListener("click",()=>this.cb.onRestart()),bt("pQuit").addEventListener("click",()=>this.cb.onQuit()),bt("pGuide").addEventListener("click",()=>{this.returnTo="pause",this.show("guide")}),bt("pSettings").addEventListener("click",()=>{this.returnTo="pause",this.show("settings")}),bt("rAgain").addEventListener("click",()=>this.cb.onRestart()),bt("rNext").addEventListener("click",()=>this.cb.onNext()),bt("rMenu").addEventListener("click",()=>this.cb.onQuit()),bt("tutOk").addEventListener("click",()=>this.cb.onTutorialDone()),bt("noticeClose").addEventListener("click",()=>{bt("notice").hidden=!0}),bt("recReset").addEventListener("click",()=>{bt("recConfirm").hidden=!1,bt("recNo").focus()}),bt("recNo").addEventListener("click",()=>{bt("recConfirm").hidden=!0,bt("recReset").focus()}),bt("recYes").addEventListener("click",()=>{this.store.resetRecords(),this.buildRecords(),bt("recReset").focus()});const t=this.store.settings,e=(n,s)=>{bt(n).addEventListener("change",r=>{t[s]=r.target.checked,this.store.save(),this.cb.onSettings()})};e("optMute","muted"),e("optMusic","music"),e("optShake","shake"),e("optLines","speedLines"),e("optFlash","reducedFlash"),e("optHc","highContrast"),bt("optVol").addEventListener("input",n=>{t.volume=Number(n.target.value)/100,bt("volOut").textContent=`${Math.round(t.volume*100)} %`,this.store.save(),this.cb.onSettings()}),window.addEventListener("keydown",n=>{if(!this.current||this.current==="fatal")return;const s=n.target;if(s instanceof HTMLInputElement&&(s.type==="range"||s.type==="checkbox")&&(n.code==="ArrowLeft"||n.code==="ArrowRight"))return;const r=n.code==="ArrowDown"||n.code==="ArrowRight"?1:n.code==="ArrowUp"||n.code==="ArrowLeft"?-1:0;if(!r)return;const o=Array.from(bt("s-"+this.current).querySelectorAll("button, input")).filter(c=>c.offsetParent!==null);if(!o.length)return;n.preventDefault();const a=o.indexOf(document.activeElement);o[(a+r+o.length)%o.length].focus(),this.cb.onSound("move")})}syncSettings(){const t=this.store.settings;bt("optVol").value=String(Math.round(t.volume*100)),bt("volOut").textContent=`${Math.round(t.volume*100)} %`,bt("optMute").checked=t.muted,bt("optMusic").checked=t.music,bt("optShake").checked=t.shake,bt("optLines").checked=t.speedLines,bt("optFlash").checked=t.reducedFlash,bt("optHc").checked=t.highContrast,document.body.classList.toggle("hc",t.highContrast),document.body.classList.toggle("rf",t.reducedFlash),bt("qRow").querySelectorAll("button").forEach(n=>{n.setAttribute("aria-checked",String(n.dataset.q===t.quality)),n.disabled=this.gfx.kind==="2d"});const e=this.gfx.level?Je(this.gfx.level):"";bt("gfxStatus").textContent=this.gfx.kind==="2d"?"Running the simplified 2D view because WebGL is not available. Quality options need the 3D view.":t.quality==="auto"?`Auto chose ${e} for this device. It steps down if frames run slow.`:{Low:"Low: no bloom or shadows and a thinner city. For older or battery-saving laptops.",Medium:"Medium: bloom, car shadows and most of the city. The target for most laptops.",High:"High: sharper image, soft shadows, the full city and more street lights."}[e]??""}notice(t,e){const n=bt("notice");bt("noticeText").textContent=t,n.classList.toggle("ok",e),n.hidden=!1,window.clearTimeout(this.noticeTimer),e&&(this.noticeTimer=window.setTimeout(()=>n.hidden=!0,3e3))}showHud(t){bt("hud").classList.toggle("hidden",!t),document.body.classList.toggle("racing",t)}buildTower(){const t=bt("hTower");t.innerHTML="",this.towerEls=[];for(let e=0;e<4;e++){const n=document.createElement("li"),s=document.createElement("span");s.className="n",s.textContent=String(e+1);const r=document.createElement("span");r.className="code";const o=document.createElement("span");o.className="gap",n.append(s,r,o),t.appendChild(n),this.towerEls.push({li:n,n:s,code:r,gap:o})}}buildProgress(t){if(this.builtTrack===t.def.id)return;this.builtTrack=t.def.id;const e=bt("hProg");e.querySelectorAll(".zone, .dot, .cp").forEach(s=>s.remove());const n=t.segs.length;t.spineStarts.forEach((s,r)=>{const o=document.createElement("i");o.className="zone",o.style.left=`${s/n*100}%`,o.style.width=`${(t.spineEnds[r]-s)/n*100}%`,e.appendChild(o)});for(let s=1;s<st.CHECKPOINTS;s++){const r=document.createElement("i");r.className="cp",r.style.left=`${s/st.CHECKPOINTS*100}%`,e.appendChild(r)}this.dotEls=[];for(let s=0;s<4;s++){const r=document.createElement("i");r.className="dot",e.appendChild(r),this.dotEls.push(r)}}hud(t){this.set("hPos",String(t.pos)),this.set("hLap",String(t.lap)),this.set("hTime",t.time),this.set("hSplit",t.split),this.last.splitClass!==t.splitClass&&(this.last.splitClass=t.splitClass,bt("hSplit").className=`split ${t.splitClass}`),this.set("hSpeed",String(t.speed)),this.set("hRes",String(Math.round(t.reserve)));const e=bt("hResBar"),n=`${t.reserve.toFixed(1)}%`;this.last.resW!==n&&(this.last.resW=n,e.style.width=n);const s=t.reserve>=t.threshold?"1":"0";this.last.ready!==s&&(this.last.ready=s,e.classList.toggle("ready",s==="1"));const r=`${t.threshold}%`;this.last.thr!==r&&(this.last.thr=r,bt("hThr").style.left=r);const o=t.boosting?"1":"0";this.last.bt!==o&&(this.last.bt=o,bt("hBoost").classList.toggle("on",t.boosting));const a=t.spine==="in"?"In the Spine":t.spine==="open"?"Spine open":`Spine sealed below ${t.threshold} %`;this.set("hSpineText",a),this.set("hSpineDist",t.spineDist?`next gate ${t.spineDist}`:""),this.last.spine!==t.spine&&(this.last.spine=t.spine,bt("hSpine").className=`spine ${t.spine}`),t.dots.forEach((l,c)=>{const h=this.dotEls[c];h&&(h.style.left=`${(l.p*100).toFixed(1)}%`,this.last["dot"+c]!==String(l.me)&&(this.last["dot"+c]=String(l.me),h.classList.toggle("me",l.me)))}),t.tower.forEach((l,c)=>{const h=this.towerEls[c];if(!h)return;const u=`${l.code}|${l.gap}|${l.me}`;this.last["tw"+c]!==u&&(this.last["tw"+c]=u,h.code.textContent=l.code,h.gap.textContent=l.gap,h.li.classList.toggle("me",l.me))})}message(t,e=!1,n=1400,s=!1){const r=bt("hMsg");r.textContent=t,r.classList.toggle("bad",e),r.classList.toggle("hint",s),r.classList.add("show"),window.clearTimeout(this.msgTimer),this.msgTimer=window.setTimeout(()=>r.classList.remove("show"),n)}clearMessage(){bt("hMsg").classList.remove("show")}countdown(t){const e=bt("cd");e.textContent=t,e.classList.remove("pop"),t&&(e.offsetWidth,e.classList.add("pop"))}announce(t){bt("live").textContent=t}showResults(t){const e=Qe[t.trackIdx];bt("resTrack").textContent=`${Je(e.name)} on ${Je(Pn[this.selDiff].name)}, total ${cn(t.total)}`,bt("resPlace").textContent=`P${t.place}`,bt("resH").textContent=`You finished ${Ac[t.place]??t.place}`;const n=t.rows[0]?.time??0;bt("resTable").innerHTML=`<thead><tr><th scope="col">Pos</th><th scope="col">Driver</th><th scope="col" class="num">Time</th><th scope="col" class="num">Gap</th></tr></thead><tbody>${t.rows.map(l=>`<tr class="${l.player?"me":""}"><td>${l.place}</td><td>${l.player?"Juno Vael (you)":Je(l.name)}</td><td class="num">${cn(l.time)}</td><td class="num">${l.place===1?"Winner":Number.isFinite(l.time)?`+${(l.time-n).toFixed(2)}`:"-"}</td></tr>`).join("")}</tbody>`;const s=Math.min(...t.laps),r=Math.max(...t.laps),o=s*.92;bt("resLaps").innerHTML=t.laps.map((l,c)=>`<li class="${l===s?"fastest":""}"><span>Lap ${c+1}</span><span class="bar"><i style="width:${((l-o)/Math.max(.001,r-o)*100).toFixed(1)}%"></i></span><span class="t">${cn(l)}</span></li>`).join("");const a=[t.newBest.total?"race time":"",t.newBest.lap?"lap time":"",t.newBest.pos?"finishing place":""].filter(Boolean);bt("resBest").textContent=a.length?`New personal best ${a.join(", ")}. Your fastest lap is highlighted.`:"No new personal best this time. Your fastest lap is highlighted.",bt("rNext").hidden=!t.hasNext,t.hasNext&&(bt("rNext").textContent=`Next track: ${Je(Qe[t.trackIdx+1].name)}`),bt("rAgain").textContent=`Race ${Je(e.name)} again`,this.show("results")}setTouch(t){bt("touch").classList.toggle("hidden",!t)}}function Cc(i,t,e=.2){const n=i.player,s=hi(i.track,n.s),r=hi(i.track,n.s+2400),o=s.spine||r.spine?n.reserve>=i.diff.threshold?0:.6:e,a=Math.max(-1,Math.min(1,(o-n.x)*2.2+s.curve*.32*(n.speed/st.MAX_SPEED))),l=Math.abs(r.curve)>4&&n.speed>st.MAX_SPEED*.8;return{steer:a,throttle:!l,brake:!1,drift:Math.abs(s.curve)>2.4&&Math.abs(a)>.3,boost:n.reserve>t&&!s.spine}}const x_=new Set(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyW","KeyA","KeyS","KeyD","ShiftLeft","ShiftRight","Space","KeyB","Enter","KeyQ"]);class M_{constructor(){P(this,"down",new Set);P(this,"touch",{left:!1,right:!1,gas:!1,brake:!1,drift:!1,boost:!1});P(this,"steerSmooth",0);P(this,"captureGameKeys",!1);P(this,"onAction",()=>{});P(this,"onFirstGesture",()=>{});window.addEventListener("keydown",t=>this.key(t,!0)),window.addEventListener("keyup",t=>this.key(t,!1)),window.addEventListener("blur",()=>this.reset()),document.addEventListener("visibilitychange",()=>{document.hidden&&this.reset()}),window.addEventListener("pointerdown",()=>this.onFirstGesture(),{passive:!0})}reset(){this.down.clear();for(const t of Object.keys(this.touch))this.touch[t]=!1;this.steerSmooth=0}key(t,e){e&&this.onFirstGesture(),this.captureGameKeys&&x_.has(t.code)&&t.preventDefault(),e&&!t.repeat&&(t.code==="KeyR"?this.onAction("restart"):t.code==="KeyP"||t.code==="Escape"?this.onAction("pause"):t.code==="KeyM"&&this.onAction("mute")),e?this.down.add(t.code):this.down.delete(t.code)}bindTouch(t){t.querySelectorAll("[data-touch]").forEach(e=>{const n=e.dataset.touch,s=r=>o=>{o.preventDefault(),this.touch[n]=r,e.classList.toggle("on",r)};e.addEventListener("pointerdown",s(!0));for(const r of["pointerup","pointercancel","pointerleave"])e.addEventListener(r,s(!1));e.addEventListener("contextmenu",r=>r.preventDefault())})}any(...t){return t.some(e=>this.down.has(e))}sample(t){const e=this.any("ArrowLeft","KeyA")||this.touch.left,s=(this.any("ArrowRight","KeyD")||this.touch.right?1:0)-(e?1:0),r=s===0?9:6,o=s-this.steerSmooth;return this.steerSmooth+=Math.sign(o)*Math.min(Math.abs(o),r*t),{steer:this.steerSmooth,throttle:this.any("ArrowUp","KeyW")||this.touch.gas,brake:this.any("ArrowDown","KeyS")||this.touch.brake,drift:this.any("ShiftLeft","ShiftRight","Space")||this.touch.drift,boost:this.any("KeyB","Enter","KeyQ")||this.touch.boost}}}const y_=["ROK","SAB","CIN"],Pc=[1,.85,.7,.55];class S_{constructor(t,e){P(this,"store",new f_);P(this,"audio",new Ih);P(this,"input",new M_);P(this,"renderer");P(this,"r3d",null);P(this,"ui");P(this,"tracks",[]);P(this,"race",null);P(this,"state","menu");P(this,"trackIdx",0);P(this,"diffIdx",1);P(this,"raf",0);P(this,"last",0);P(this,"clock",0);P(this,"boostAmt",0);P(this,"flash",0);P(this,"shake",0);P(this,"attractS",0);P(this,"finishT",0);P(this,"scrapeCd",0);P(this,"perfAcc",0);P(this,"perfN",0);P(this,"scaleIdx",0);P(this,"musicStarted",!1);P(this,"reduced",!1);P(this,"lastSplit","");P(this,"lastSplitClass","");P(this,"disposed",!1);P(this,"pausedFrom","racing");P(this,"lastInput",Tc);P(this,"demo");P(this,"glLost",!1);P(this,"frameMs",16);P(this,"qualityLocked",!1);this.canvas=t,this.demo=e.demo,this.qualityLocked=e.quality!==null;try{this.reduced=!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches}catch{this.reduced=!1}const n=this.store.settings;let s="";if(e.want3d)try{this.r3d=new l_(t,e.quality??n.quality)}catch(r){console.warn("3D renderer failed, using the 2D view",r),s="The 3D view could not start on this device.",this.r3d=null;const o=t.cloneNode(!1);t.replaceWith(o),this.canvas=o}else s="WebGL is not available in this browser.";if(this.renderer=this.r3d??new Yh(this.canvas),this.trackIdx=n.lastTrack,this.diffIdx=n.lastDiff,this.ui=new v_(this.store,{onStart:(r,o)=>this.startRace(r,o),onResume:()=>this.resume(),onRestart:()=>this.restart(),onQuit:()=>this.quit(),onNext:()=>this.next(),onSettings:()=>this.applySettings(),onSound:r=>this.audio.blip(r),onTutorialDone:()=>{this.store.settings.tutorialSeen=!0,this.store.save(),this.ui.show("title")},track:r=>this.track(r)}),this.ui.selTrack=this.trackIdx,this.ui.selDiff=this.diffIdx,this.r3d){const r=this.r3d;this.ui.setGraphics("3d",r.activeLevel),r.onLevelChange=o=>this.ui.setGraphics("3d",o),r.onContext=o=>{this.glLost=o,o?(this.pause(),this.ui.notice("The browser interrupted the graphics. Waiting for it to restore them. If nothing happens, reload the page.",!1)):this.ui.notice("Graphics restored.",!0)}}else this.ui.setGraphics("2d",null),this.ui.notice(`${s} You are seeing the simplified 2D view. For full 3D graphics, turn on hardware acceleration in your browser settings, update the browser, then reload.`,!1);if(this.input.bindTouch(document.getElementById("touch")),this.input.onAction=r=>this.action(r),this.input.onFirstGesture=()=>this.gesture(),this.applySettings(),window.addEventListener("resize",()=>this.resize()),document.addEventListener("visibilitychange",()=>this.visibility()),window.addEventListener("blur",()=>{!this.demo&&(this.state==="racing"||this.state==="countdown")&&this.pause()}),this.resize(),this.demo){this.ui.show(null),this.startRace(Math.max(0,Math.min(Qe.length-1,e.demoTrack)),1);const r=this.race;if(r){r.cdT=st.COUNTDOWN;const o=Math.round(e.demoAt*60);for(let a=0;a<o;a++)r.update(1/60,Cc(r,55,.35)),r.events.length=0;this.ui.countdown(""),r.phase!=="countdown"&&(this.state=r.phase==="finished"?"finishing":"racing"),r.phase==="finished"&&this.showResults(r)}}else{const r=new URLSearchParams(location.search).get("screen"),o=["title","setup","guide","settings","records"].includes(r??"");this.ui.show(o?r:n.tutorialSeen?"title":"tutorial")}}start(){this.last=performance.now();const t=e=>{this.disposed||(this.raf=requestAnimationFrame(t),this.tick(e))};this.raf=requestAnimationFrame(t)}dispose(){this.disposed=!0,cancelAnimationFrame(this.raf),this.audio.stopMusic(),this.store.flush(),this.renderer.dispose()}track(t){var e;return(e=this.tracks)[t]??(e[t]=Fh(Qe[t]))}gesture(){this.audio.ensure(),this.audio.setVolume(this.store.settings.volume),this.audio.setMuted(this.store.settings.muted),this.audio.setMusic(this.store.settings.music),this.musicStarted||(this.musicStarted=!0,this.audio.startMusic(Qe[this.trackIdx].hz))}applySettings(){const t=this.store.settings;this.audio.setVolume(t.volume),this.audio.setMuted(t.muted),this.audio.setMusic(t.music),document.body.classList.toggle("hc",t.highContrast),document.body.classList.toggle("rf",t.reducedFlash),this.qualityLocked||this.r3d?.setQuality(t.quality),this.store.save()}resize(){this.renderer.resize(Pc[this.scaleIdx])}visibility(){document.hidden?(this.audio.suspend(),!this.demo&&(this.state==="racing"||this.state==="countdown")&&this.pause()):(this.audio.resume(),this.last=performance.now())}startRace(t,e){this.gesture(),this.trackIdx=t,this.diffIdx=e,this.ui.selTrack=t,this.ui.selDiff=e;const n=this.store.settings;this.demo||(n.lastTrack=t,n.lastDiff=e,this.store.save());const s=this.track(t);this.race=new g_(s,e),this.state="countdown",this.boostAmt=0,this.flash=0,this.shake=0,this.finishT=0,this.lastSplit="",this.lastSplitClass="",this.renderer.clearFx(),this.ui.buildProgress(s),this.ui.show(null),this.ui.showHud(!0),this.ui.clearMessage(),this.ui.countdown(""),this.input.reset(),this.input.captureGameKeys=!0,document.activeElement?.blur(),this.audio.duck(!1),this.audio.stopMusic(),this.audio.startMusic(Qe[t].hz),this.ui.announce(`${Qe[t].name}. Three laps. Get ready.`)}restart(){this.state==="menu"||!this.race||this.startRace(this.trackIdx,this.diffIdx)}next(){const t=Math.min(Qe.length-1,this.trackIdx+1);this.startRace(t,this.diffIdx)}quit(){this.race=null,this.state="menu",this.input.captureGameKeys=!1,this.ui.showHud(!1),this.ui.countdown(""),this.audio.duck(!1),this.audio.stopMusic(),this.audio.startMusic(110),this.ui.returnTo="title",this.ui.show("title")}pause(){this.state!=="racing"&&this.state!=="countdown"||(this.pausedFrom=this.state,this.state="paused",this.input.reset(),this.audio.duck(!0),this.ui.returnTo="pause",this.ui.show("pause"))}resume(){this.state!=="paused"||this.glLost||(this.state=this.pausedFrom==="countdown"?"countdown":"racing",this.ui.show(null),this.audio.duck(!1),this.last=performance.now(),document.activeElement?.blur())}action(t){if(!this.demo){if(t==="mute"){const e=this.store.settings;e.muted=!e.muted,this.applySettings(),this.ui.syncSettings(),this.state!=="menu"&&this.ui.message(e.muted?"Sound off":"Sound on",!1,900);return}if(t==="restart"){(this.state==="racing"||this.state==="countdown"||this.state==="paused"||this.state==="finishing"||this.state==="results")&&this.restart();return}switch(this.state){case"racing":case"countdown":this.pause();break;case"paused":this.ui.current==="pause"?this.resume():this.ui.show("pause");break;case"menu":{const e=this.ui.current;e==="tutorial"?(this.store.settings.tutorialSeen=!0,this.store.save(),this.ui.show("title")):e&&e!=="title"&&this.ui.show("title");break}}}}tick(t){const e=Math.min(.25,(t-this.last)/1e3);this.last=t;const n=Math.min(e,st.MAX_DT);if(this.frameMs+=(e*1e3-this.frameMs)*.05,window.__nodFrameMs=this.frameMs,this.clock+=n,this.perf(e),this.scrapeCd>0&&(this.scrapeCd-=n),this.state==="menu"||!this.race){this.attractS+=6800*n,this.audio.engine(0,!1,!1,!1),this.renderer.render(this.attractFrame(n));return}const s=this.race,r=this.state;if(r==="racing"||r==="countdown"||r==="finishing"){let a=r==="racing"?this.input.sample(n):Tc;this.demo&&r==="racing"&&(a=Cc(s,55,.35)),this.lastInput=a,s.update(n,a),this.handleEvents(s.events.splice(0)),this.boostAmt+=((s.player.boosting?1:0)-this.boostAmt)*Math.min(1,5*n),this.flash=Math.max(0,this.flash-n*11),this.shake*=Math.exp(-5*n),r==="countdown"&&s.phase==="racing"&&(this.state="racing"),r==="racing"&&s.phase==="finished"&&(this.state="finishing",this.finishT=0,this.input.captureGameKeys=!1),this.state==="finishing"&&(this.finishT+=n,this.finishT>3&&this.showResults(s)),this.audio.engine(Math.abs(s.player.speed)/st.MAX_SPEED,a.throttle,s.player.boosting,!0)}else this.audio.engine(0,!1,!1,!1);const o=this.state==="paused"||this.state==="results";this.renderer.render(this.raceFrame(s,o?0:n)),(this.state==="racing"||this.state==="finishing"||this.state==="countdown")&&this.updateHud(s)}perf(t){if(this.renderer.kind!=="2d"||(this.perfAcc+=t,++this.perfN<40))return;const e=this.perfAcc/this.perfN*1e3;this.perfAcc=0,this.perfN=0,e>21&&this.scaleIdx<Pc.length-1?(this.scaleIdx++,this.resize()):e<12&&this.scaleIdx>0&&(this.scaleIdx--,this.resize())}shakeOffset(){if(!this.store.settings.shake||this.shake<.2)return[0,0];const e=this.renderer.kind==="2d"?this.canvas.height:720,n=(this.reduced?.4:1)*this.shake*(e/720);return[(Math.random()-.5)*2*n,(Math.random()-.5)*2*n]}baseFrame(t,e,n){const s=this.store.settings,[r,o]=this.shakeOffset(),a=Pn[this.diffIdx].threshold;return{track:t,trackIdx:e,boostAmt:this.boostAmt,time:this.clock,dt:n,gateText:`SEALED  NEED ${a}%`,threshold:a,flash:this.flash,shakeX:r,shakeY:o,highContrast:s.highContrast,reducedFlash:s.reducedFlash,speedLines:s.speedLines,reducedMotion:this.reduced}}attractFrame(t){const e=this.ui.current==="setup"?this.ui.selTrack:0,n=this.track(e),s=this.renderer.kind==="3d"?.25+Math.sin(this.clock*.21)*.2:Math.sin(this.clock*.5)*.45;return{...this.baseFrame(n,e,t),s:this.attractS,x:s,speedPct:.57,steer:Math.cos(this.clock*.21)*.1,vx:Math.cos(this.clock*.21)*.04,drifting:!1,boosting:!1,braking:!1,rivals:[],gateOpen:!0,boostAmt:0,cinematic:!0}}raceFrame(t,e){const n=t.player,s=Pn[t.diffIdx],r=this.lastInput;return{...this.baseFrame(t.track,this.trackIdx,e),s:n.s,x:n.x,speedPct:Math.max(0,n.speed)/st.MAX_SPEED,steer:r.steer,vx:n.vx,drifting:n.drifting,boosting:n.boosting,braking:r.brake&&n.speed>0||t.phase==="finished",rivals:t.rivals,gateOpen:n.reserve>=s.threshold||n.spineMode,cinematic:!1}}updateHud(t){const e=t.player,n=Pn[t.diffIdx],s=t.track.length,r=Bh(t.track,e.s)*.0074,o=e.spineMode?"in":e.reserve>=n.threshold?"open":"sealed",a=3*s,l=[{code:"JUN",s:Math.min(e.s,a),speed:e.speed,me:!0,fin:t.finishTime},...t.rivals.map((u,f)=>({code:y_[f],s:Math.min(u.s,a),speed:u.speed,me:!1,fin:u.finish}))];l.sort((u,f)=>u.fin!==null&&f.fin!==null?u.fin-f.fin:u.fin!==null?-1:f.fin!==null?1:f.s-u.s);const c=l[0],h=l.map((u,f)=>{let p="Leader";if(f>0&&u.fin!==null&&c.fin!==null)p=`+${(u.fin-c.fin).toFixed(2)}`;else if(f>0){const g=Math.max(5e3,(u.speed+c.speed)/2);p=`+${((c.s-u.s)/g).toFixed(2)}`}return{code:u.code,gap:p,me:u.me}});this.ui.hud({pos:t.rank,lap:t.lap,time:cn(t.time),split:this.lastSplit,splitClass:this.lastSplitClass,speed:Math.round(Math.abs(e.speed)*(e.spineMode?st.SPINE_ADVANCE:1)*st.KMH),reserve:e.reserve,threshold:n.threshold,boosting:e.boosting,spine:o,spineDist:e.spineMode?"":r<700?`${Math.round(r/10)*10} m`:"",dots:[{p:Math.min(e.s,a)%s/s,me:!0},...t.rivals.map(u=>({p:Math.min(u.s,a)%s/s,me:!1}))],tower:h})}handleEvents(t){const e=this.race;if(!e)return;const s=e.player.x>=0?1:-1;for(const r of t)switch(r.type){case"countdown":this.ui.countdown(String(r.value)),this.audio.countdown(r.value);break;case"go":this.ui.countdown("Go"),this.audio.countdown(0),window.setTimeout(()=>this.state!=="menu"&&this.ui.countdown(""),800),this.ui.message(`The lit centre channel is the Spine. Its gates open at ${Pn[e.diffIdx].threshold} % reserve.`,!1,4200,!0);break;case"checkpoint":{const o=Number(r.text),a=this.store.record(this.trackIdx,this.diffIdx).bestSplits[o-1];let l="";if(this.lastSplitClass="",a!==void 0){const c=r.value-a;l=`${c>=0?"+":"−"}${Math.abs(c).toFixed(2)}`,this.lastSplitClass=c>0?"up":"down"}this.lastSplit=`Split ${o}  ${cn(r.value)}${l?"  "+l:""}`,this.ui.message(`Checkpoint ${o}`,!1,1400),this.ui.announce(`Checkpoint ${o}, ${r.value.toFixed(1)} seconds`),this.audio.chime();break}case"lap":this.lastSplit=`Lap ${Number(r.text)-1}  ${cn(r.value)}`,this.lastSplitClass="",this.ui.message(Number(r.text)===st.LAPS?"Final lap":`Lap ${r.text}`,!1,1600),this.ui.announce(`Lap ${Number(r.text)-1} complete, ${r.value.toFixed(1)} seconds. Lap ${r.text}.`),this.audio.lap();break;case"finish":this.ui.message("Finish",!1,2400),this.audio.finish(e.computeRank()<=2),this.ui.announce(`Finished in position ${e.computeRank()}.`);break;case"wall":this.audio.thud(r.value),this.shake=Math.max(this.shake,6+r.value*10),this.flash=1,this.renderer.sparks(s,18+Math.round(r.value*22));break;case"scrape":this.scrapeCd<=0&&(this.scrapeCd=.07,this.audio.scrape(r.value),this.renderer.sparks(s,4),this.shake=Math.max(this.shake,2.5));break;case"rail":this.audio.thud(.25),this.shake=Math.max(this.shake,3),this.renderer.sparks(s,6);break;case"bump":this.audio.thud(r.value*.7),this.shake=Math.max(this.shake,4+r.value*5),this.renderer.sparks(s,8);break;case"gateOpen":this.audio.gateOpen(),this.ui.message("Spine open",!1,1200),this.ui.announce("Spine gate open.");break;case"gateSealed":this.audio.gateSealed(),this.audio.thud(1),this.shake=16,this.flash=1,this.renderer.sparks(s,30),this.ui.message("Spine sealed. Charge your reserve first.",!0,1800),this.ui.announce("Spine gate sealed. Reserve too low.");break;case"boostStart":this.audio.boost();break;case"position":this.ui.announce(`Position ${r.value} of 4`);break}}showResults(t){t.settle(),this.state="results",this.input.captureGameKeys=!1;const e=t.results.find(o=>o.player)?.place??t.rank;let n=0;t.lapTimes.forEach((o,a)=>{o<t.lapTimes[n]&&(n=a)});const s=t.finishTime??t.time,r=this.demo?{total:!1,lap:!1,pos:!1}:this.store.submit(this.trackIdx,this.diffIdx,s,t.lapTimes,t.splits[n]??[],e);this.ui.showHud(!1),this.ui.showResults({trackIdx:this.trackIdx,rows:t.results,place:e,laps:t.lapTimes,total:s,newBest:r,hasNext:this.trackIdx<Qe.length-1}),this.ui.announce(`Results. Position ${e}. Total time ${cn(s)}.`)}}function go(i){document.querySelectorAll(".screen").forEach(n=>n.hidden=!0);const t=document.getElementById("fatalText");t&&(t.textContent=i);const e=document.getElementById("s-fatal");e&&(e.hidden=!1)}function b_(){try{const t=document.createElement("canvas").getContext("webgl2");return t?(t.getExtension("WEBGL_lose_context")?.loseContext(),!0):!1}catch{return!1}}function E_(){const i=document.getElementById("view");if(!i){go("The game view is missing from the page. Reload to try again.");return}const t=new URLSearchParams(location.search),e=t.get("renderer")!=="2d"&&b_();if(!e&&!document.createElement("canvas").getContext("2d")){go("This browser cannot draw the game: neither WebGL nor Canvas 2D is available. Try a recent Chrome, Edge, Firefox or Safari.");return}let n;try{n=new S_(i,{want3d:e,demo:t.get("demo")==="1",demoTrack:Number(t.get("track")??0)||0,quality:["low","medium","high"].find(s=>s===t.get("quality"))??null,demoAt:Math.max(0,Math.min(600,Number(t.get("at")??9)||0))})}catch(s){console.error(s),go("Neon Overdrive failed to start. Reload the page; if it keeps happening, the details are in the browser console.");return}n.start(),window.addEventListener("pagehide",()=>n.dispose(),{once:!0})}E_();
