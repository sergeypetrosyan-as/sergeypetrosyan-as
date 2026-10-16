var ih=Object.defineProperty;var sh=(i,t,e)=>t in i?ih(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var V=(i,t,e)=>sh(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();function Jl(i,t){const e=new Array(9).fill(0);for(let n=0;n<3;n++)for(let s=0;s<3;s++){let r=0;for(let o=0;o<3;o++)r+=i[n*3+o]*t[o*3+s];e[n*3+s]=r}return e}const rh=[0,-1,0,1,0,0,0,0,1],oh=[0,1,0,-1,0,0,0,0,1],ah=[1,0,0,0,0,1,0,-1,0],lh=[1,0,0,0,0,-1,0,1,0],tc={rollR:rh,rollL:oh,pitchB:ah,pitchA:lh},ec=["rollL","rollR","pitchA","pitchB"],nc=[1,0,0,0,1,0,0,0,1],Se=[nc],ea=i=>i.join(","),ao=new Map([[ea(nc),0]]);for(let i=0;i<Se.length;i++)for(const t of ec){const e=Jl(tc[t],Se[i]),n=ea(e);ao.has(n)||(ao.set(n,Se.length),Se.push(e))}const ic={rollL:[],rollR:[],pitchA:[],pitchB:[]};for(let i=0;i<Se.length;i++)for(const t of ec)ic[t][i]=ao.get(ea(Jl(tc[t],Se[i])));const ch=Se.map(i=>[i[0],i[1],i[2]]),hh=Se.map(i=>[i[3],i[4],i[5]]),uh=Se.map(i=>[i[6],i[7],i[8]]),dh=8;function cs(i){return{room:i.start.room,x:i.start.x,y:i.start.y,z:i.start.z,ori:i.rooms.map(()=>0),got:0,ctl:0}}function sc(i){return{room:i.room,x:i.x,y:i.y,z:i.z,ori:i.ori.slice(),got:i.got,ctl:i.ctl}}function rc(i,t,e,n,s){const r=i.rooms[t];return e+r.w*(n+r.h*s)}function mr(i,t,e,n,s){const r=i.rooms[t];return e>=0&&n>=0&&s>=0&&e<r.w&&n<r.h&&s<r.d}function ki(i,t,e,n,s,r){if(!mr(i,e,n,s,r))return!1;const o=rc(i,e,n,s,r);if(i.rooms[e].solid[o])return!0;const a=i.cellObjs[e].get(o);if(a)for(const l of a){const c=i.objs[l];if(c.kind==="door"&&!(t>>c.bit&1))return!0}return!1}function na(i){return hh[i.ori[i.room]]}function oc(i,t){const e=i.ori[i.room],n=ch[e],s=uh[e];switch(t){case"right":return n;case"left":return[-n[0],-n[1],-n[2]];case"away":return s;default:return[-s[0],-s[1],-s[2]]}}function fh(i,t){if(ki(i,t.ctl,t.room,t.x,t.y,t.z))return!1;const e=na(t);for(let n=0;n<64;n++){const s=t.x+e[0],r=t.y+e[1],o=t.z+e[2];if(!mr(i,t.room,s,r,o))return!1;if(ki(i,t.ctl,t.room,s,r,o))return!0;t.x=s,t.y=r,t.z=o}return!1}function ia(i,t,e){const n=oc(t,e),s=[t.x+n[0],t.y+n[1],t.z+n[2]];if(!mr(i,t.room,s[0],s[1],s[2]))return{ok:!1,reason:"edge",to:s};if(ki(i,t.ctl,t.room,s[0],s[1],s[2]))return{ok:!1,reason:"wall",to:s};const r=na(t);return ki(i,t.ctl,t.room,s[0]+r[0],s[1]+r[1],s[2]+r[2])?{ok:!0,to:s}:{ok:!1,reason:"void",to:s}}function lo(i,t){return i.cellObjs[t.room].get(rc(i,t.room,t.x,t.y,t.z))??[]}function lr(i,t){const e=[];for(const n of i.objs){if(n.room!==t.room||n.kind!=="lever"&&n.kind!=="switch")continue;const s=Math.abs(n.x-t.x)+Math.abs(n.y-t.y)+Math.abs(n.z-t.z);s<=1&&e.push({id:n.id,d:s})}return e.sort((n,s)=>n.d-s.d||n.id-s.id),e.map(n=>n.id)}function gs(i,t){let e=0;for(const n of i.objs)n.kind==="crystal"&&!(t.got>>n.bit&1)&&e++;return e}function ac(i,t,e,n){for(let s=0;s<dh;s++){if(!fh(i,t))return"nofloor";let r=!1;for(const o of lo(i,t)){const a=i.objs[o];(a.kind==="crystal"||a.kind==="shard")&&!(t.got>>a.bit&1)?(t.got|=1<<a.bit,e.push({k:"collect",obj:o})):a.kind==="plate"&&!(t.ctl>>a.bit&1)&&(t.ctl|=1<<a.bit,e.push({k:"latch",obj:o}),e.push({k:"door",open:!0}),r=!0)}if(!r)break}if(n)for(const s of lo(i,t)){const r=i.objs[s];if(r.kind==="portal"&&r.pair!==void 0){const o=i.objs[r.pair];t.room=o.room,t.x=o.x,t.y=o.y,t.z=o.z,e.push({k:"portal",from:s,to:r.pair});const a=ac(i,t,e,!1);return a==="nofloor"?"farside":a}}return null}function co(i,t,e,n){const s=ac(i,t,e,n);if(s)return{ok:!1,reason:s};for(const r of lo(i,t))if(i.objs[r].kind==="exit"){const a=gs(i,t);a===0?e.push({k:"complete"}):n&&e.push({k:"sealed",remaining:a})}return{ok:!0,state:t,events:e}}function Pa(i,t,e,n){const s=t.x,r=t.y,o=t.z;t.ori[t.room]=ic[e][t.ori[t.room]];const a=co(i,t,n,!1);if(!a.ok)return a;const l=t.x!==s||t.y!==r||t.z!==o;return a.events.unshift({k:"fold",kind:e,fell:l}),a}function cr(i,t,e){const n=sc(t),s=[];if(e.t==="move"){const l=ia(i,n,e.dir);return l.ok?(n.x=l.to[0],n.y=l.to[1],n.z=l.to[2],s.push({k:"step"}),co(i,n,s,!0)):{ok:!1,reason:l.reason}}if(e.t==="fold")return i.rooms[n.room].free.includes(e.kind)?Pa(i,n,e.kind,s):{ok:!1,reason:"locked"};if(!lr(i,n).includes(e.obj))return{ok:!1,reason:"reach"};const r=i.objs[e.obj];if(r.kind==="lever")return Pa(i,n,r.fold,s);const o=1<<r.bit;n.ctl^=o;const a=(n.ctl&o)!==0;return s.push({k:"toggle",obj:e.obj,on:a}),s.push({k:"door",open:a}),ki(i,n.ctl,n.room,n.x,n.y,n.z)?{ok:!1,reason:"doorway"}:co(i,n,s,!1)}function ph(i,t){const e=[{t:"move",dir:"right"},{t:"move",dir:"left"},{t:"move",dir:"away"},{t:"move",dir:"toward"}];for(const n of i.rooms[t.room].free)e.push({t:"fold",kind:n});for(const n of lr(i,t))e.push({t:"use",obj:n});return e}function fs(i){let t="";for(const e of i.ori)t+=String.fromCharCode(65+e);return`${i.room}.${i.x}.${i.y}.${i.z}.${t}.${i.got}.${i.ctl}`}function Er(i,t={}){const e=t.from??cs(i),n=t.cap??4e5,s=new Map,r=[{s:e,parent:-1,a:null}];s.set(fs(e),0);for(let o=0;o<r.length;o++){if(r.length>n)return{actions:null,explored:r.length,capped:!0};const a=r[o].s;for(const l of ph(i,a)){if(t.noFolds&&(l.t==="fold"||l.t==="use"&&i.objs[l.obj].kind==="lever"))continue;const c=cr(i,a,l);if(!c.ok)continue;const h=fs(c.state);if(c.events.some(d=>d.k==="complete")&&(!t.wantShards||(c.state.got&i.shardMask)===i.shardMask)){const d=[l];for(let p=o;r[p].parent>=0;p=r[p].parent)d.push(r[p].a);return d.reverse(),{actions:d,explored:r.length,capped:!1}}s.has(h)||(s.set(h,r.length),r.push({s:c.state,parent:o,a:l}))}}return{actions:null,explored:r.length,capped:!1}}const mh={rollL:"roll the room so the left wall becomes the floor",rollR:"roll the room so the right wall becomes the floor",pitchA:"pitch the room so the near wall becomes the floor",pitchB:"pitch the room so the far wall becomes the floor"};function gh(i,t){if(t.t==="move"){const n={right:"Step right",left:"Step left",away:"Step away from you",toward:"Step toward you"}[t.dir],s={right:"D / Right",left:"A / Left",away:"W / Up",toward:"S / Down"}[t.dir];return{text:n,key:s}}if(t.t==="fold"){const n={rollL:"Q",rollR:"F",pitchA:"X",pitchB:"V"}[t.kind];return{text:`Fold: ${mh[t.kind]}`,key:n}}return i.objs[t.obj].kind==="lever"?{text:"Pull the fold lever",key:"E / Space"}:{text:"Flip the switch",key:"E / Space"}}const La={1:"rollL",2:"rollR",3:"pitchA",4:"pitchB"};function _h(i,t){const e=[],n=[],s=[];let r=null;const o=new Map,a=i.links??{};let l=0,c=0;const h=new Map,u=(f,y,b)=>{const M={...f,id:n.length};n.push(M);const P=y.get(b)??[];return P.push(M.id),y.set(b,P),M},d=[];if(i.rooms.forEach((f,y)=>{const b=f.layers.length,M=f.layers[0].length,P=Math.max(...f.layers.flatMap(w=>w.map(x=>x.length))),T=new Uint8Array(P*M*b),A=new Map;s.push(A),f.layers.forEach((w,x)=>{if(w.length!==M)throw new Error(`${i.id}: room ${y} layer ${x} has ${w.length} rows, expected ${M}`);w.forEach((v,C)=>{if(v.length!==P)throw new Error(`${i.id}: room ${y} z${x} row ${C} has width ${v.length}, expected ${P}`);for(let N=0;N<P;N++){const I=v[N],W=N+P*(C+M*x),$={room:y,x:N,y:C,z:x,ch:I};let z=null;if(I==="#")T[W]=1;else if(!(I==="."||I===" "))if(I==="@"){if(r)throw new Error(`${i.id}: two start cells`);r={room:y,x:N,y:C,z:x}}else if(I==="E")z="exit";else if(I==="*")z="crystal";else if(I==="$")z="shard";else if(I>="a"&&I<="h")z="portal";else if(La[I])z="lever";else if(I==="S"||I==="T"||I==="U")z="switch";else if(I==="P"||I==="Q"||I==="R")z="plate";else if(I==="D"||I==="F"||I==="G")z="door";else throw new Error(`${i.id}: unknown cell character '${I}'`);if(!z)continue;const Y=u({...$,kind:z},A,W);if(z==="crystal"||z==="shard")Y.bit=l++;else if(z==="lever")Y.fold=La[I];else if(z==="switch"||z==="plate"){if(o.has(I))throw new Error(`${i.id}: duplicate controller '${I}'`);Y.bit=c++,o.set(I,Y.bit)}else if(z==="door"){const D=a[I];if(!D)throw new Error(`${i.id}: door '${I}' has no link`);d.push({obj:Y,ctl:D})}else if(z==="portal"){const D=h.get(I)??[];D.push(Y.id),h.set(I,D),i.secret?.includes(I)&&(Y.secret=!0)}}})}),e.push({name:f.name,w:P,h:M,d:b,solid:T,free:f.free})}),!r)throw new Error(`${i.id}: no start cell`);for(const f of d){const y=o.get(f.ctl);if(y===void 0)throw new Error(`${i.id}: door '${f.obj.ch}' links to missing controller '${f.ctl}'`);f.obj.bit=y}for(const[f,y]of h){if(y.length!==2)throw new Error(`${i.id}: portal '${f}' appears ${y.length} times, expected 2`);if(n[y[0]].room===n[y[1]].room)throw new Error(`${i.id}: portal '${f}' must join two different rooms`);n[y[0]].pair=y[1],n[y[1]].pair=y[0]}if(l>30||c>30)throw new Error(`${i.id}: too many collectibles or controllers`);let p=0,g=0,_=0,m=0;for(const f of n)f.kind==="crystal"?(p|=1<<f.bit,_++):f.kind==="shard"&&(g|=1<<f.bit,m++);if(!n.some(f=>f.kind==="exit"))throw new Error(`${i.id}: no exit`);return{id:i.id,chapter:i.chapter,index:t,name:i.name,objective:i.objective,intro:i.intro,hints:i.hints,rooms:e,objs:n,cellObjs:s,start:r,crystalMask:p,shardMask:g,nCrystals:_,nShards:m}}const pi=["rollL","rollR","pitchA","pitchB"],Ji=["rollL","rollR"],wr={name:"A Margin",free:[],layers:[["####","#h$#","####"]]},vh=[{id:"1-1",chapter:0,name:"First Fold",objective:"Reach the gate. A pillar stands in the way.",intro:"The House begins as a plain hall. Press Q or F to turn the room a quarter turn.",hints:["The pillar blocks the floor, but every wall can become the floor.","Keep turning the same way. Each fold drops you onto the new floor."],rooms:[{name:"The Hall",free:Ji,layers:[["########","#......#","#.##...#","#.#....#","#@#...E#","########"]]}]},{id:"1-2",chapter:0,name:"Two Axioms",objective:"Collect both axioms, then reach the gate.",intro:"Axioms are the facts the House is built on. The gate stays sealed until you hold every one.",hints:["One axiom sits in a corner of the ceiling; a wall can carry you to it.","The pressure plate opens the door in the divider. Stepping on it is enough."],secret:["h"],rooms:[{name:"The Divided Hall",free:Ji,layers:[["#########","#*..#..h#","#...#...#","#...#...#","#@P.D.*E#","#########"]]},wr],links:{D:"P"}},{id:"1-3",chapter:0,name:"Quiet Corners",objective:"Collect the axiom, then reach the gate.",intro:"When a fold leaves you with no floor beneath you, you fall to the new one. Use that.",hints:["Some corners can only be reached by falling around the room.","Fold so the wall beside the axiom becomes the floor, then walk to it."],rooms:[{name:"The Quiet Hall",free:Ji,layers:[["########","########","########","########","########","########"],["########","#.E#*..#","#......#","#@#....#","##.#..##","########"],["########","########","########","########","########","########"]]}]},{id:"2-1",chapter:1,name:"The Box",objective:"Collect the axiom, then reach the gate.",intro:"Rooms have a near wall and a far wall too. X and V pitch the room toward you or away.",hints:["The far wall and the near wall can be floors now.","Pitch the room, then look for what the new floor lets you reach."],rooms:[{name:"The Box",free:pi,layers:[["#####","#####","#####","#####","#####"],["#####","#..##","#*###","##E@#","#####"],["#####","#..##","##..#","#...#","#####"],["#####","#####","#####","#####","#####"]]}]},{id:"2-2",chapter:1,name:"The Lever Room",objective:"Collect both axioms, then reach the gate. Free folds are locked; use the brass levers.",intro:"Some rooms refuse your hand. Brass levers fold them for you: stand at one and press E or Space.",hints:["Each lever always performs the same fold. Read the bar on its base before you pull.","Pulling a lever may drop you onto another wall. Look for the next lever from there."],secret:["h"],rooms:[{name:"The Lever Room",free:[],layers:[["######","######","######","######","######"],["######","##23.#","#*##.#","#4#*E#","######"],["######","#h#1.#","#.##.#","#..@.#","######"],["######","######","######","######","######"]]},wr]},{id:"2-3",chapter:1,name:"Seam",objective:"Collect the axiom, then reach the gate. A door blocks the way.",intro:"Switches are reversible. Flip one and the door it controls opens or closes.",hints:["The switch is a pale square. Stand on it or beside it and press E.","An open door is empty space; a closed door is solid wall. Fold accordingly."],links:{D:"S"},rooms:[{name:"The Seam",free:pi,layers:[["######","######","######","######","######"],["######","#...##","#..#.#","#.#D.#","######"],["######","#.#..#","#.S#.#","#E@#*#","######"],["######","######","######","######","######"]]}]},{id:"3-1",chapter:2,name:"Two Rooms",objective:"Collect the axiom, then reach the gate.",intro:"Violet rings are portals. Each room remembers its own orientation while you are away.",hints:["A ring may have no floor under it until its room is folded.","Fold the far room while you are in it, then walk back through the ring."],rooms:[{name:"Near Room",free:Ji,layers:[["#######","#######","#######","#######","#######","#######"],["#######","#...a.#","#.#...#","#.....#","#@#..##","#######"],["#######","#######","#######","#######","#######","#######"]]},{name:"Far Room",free:Ji,layers:[["#######","#######","#######","#######","#######","#######"],["#######","#*.#.a#","##....#","#...#.#","#.#.E##","#######"],["#######","#######","#######","#######","#######","#######"]]}]},{id:"3-2",chapter:2,name:"Through the Margin",objective:"Collect both axioms, then reach the gate.",intro:"Rooms can be folded in any direction here, and a ring still leads where it led.",hints:["Fold each room while you stand in it; the other room keeps its own turn.","The axiom in the first room is reached by falling, not walking."],secret:["h"],rooms:[{name:"First Room",free:pi,layers:[["######","######","######","######","######"],["######","##..##","#@#.##","##.#.#","######"],["######","##*#h#","#.#..#","#a...#","######"],["######","######","######","######","######"]]},{name:"Second Room",free:pi,layers:[["######","######","######","######","######"],["######","#....#","##..##","#.#..#","######"],["######","#a*###","##..##","#E.#.#","######"],["######","######","######","######","######"]]},wr]},{id:"3-3",chapter:2,name:"The Last Question",objective:"Collect every axiom, then reach the gate. Which way is down?",intro:"Everything you have learned, in two rooms.",hints:["A plate stays pressed once stepped on. Find what it opens.","You will cross the ring twice. Each room keeps the orientation you leave it in."],links:{D:"P"},rooms:[{name:"The Study",free:pi,layers:[["######","######","######","######","######"],["######","##...#","######","#....#","######"],["######","#*.#D#","###P.#","#a..@#","######"],["######","######","######","######","######"]]},{name:"The Question",free:pi,layers:[["#####","#####","#####","#####","#####"],["#####","#..E#","#..*#","##.a#","#####"],["#####","#####","#####","#####","#####"]]}]}],de=vh.map((i,t)=>_h(i,t)),Da=[{name:"THE FOLDED HALL",blurb:"Gravity turns in the plane."},{name:"THE STAIRWELL THAT ISN'T",blurb:"Depth turns too. Levers take over."},{name:"THE MIRROR HOUSE",blurb:"Rooms remember their own orientation."}],Tr="#05060b",tn=[85,240,255],Un=[255,198,92],Js=[169,139,255],mi=[255,95,168],gn=[232,236,246],Ia=[30,44,84],jt=(i,t)=>`rgba(${i[0]|0},${i[1]|0},${i[2]|0},${t})`;function Ua(i,t,e){return[i[0]+(t[0]-i[0])*e,i[1]+(t[1]-i[1])*e,i[2]+(t[2]-i[2])*e]}function xh(i){const t=i.charCodeAt(0)-97;return[Js,[120,190,255],[255,140,220],[140,255,200]][(t%4+4)%4]}const tr=.45,er=.4,Ar=[-tr,er,1],Rr=(()=>{const i=Math.hypot(.25,.8,.55);return[.25/i,-.8/i,-.55/i]})(),Mh=.38,yh=[{a:0,s:1},{a:0,s:-1},{a:1,s:1},{a:1,s:-1},{a:2,s:1},{a:2,s:-1}],Sh=[[0,0],[1,0],[1,1],[0,1]];function Na(i,t){const e=new Array(9).fill(0);for(let n=0;n<3;n++)for(let s=0;s<3;s++)e[n*3+s]=i[n*3]*t[s]+i[n*3+1]*t[3+s]+i[n*3+2]*t[6+s];return e}function Fa(i,t){const n=(i==="rollR"?90:i==="rollL"?-90:i==="pitchA"?90:-90)*Math.PI*t/180,s=Math.cos(n),r=Math.sin(n);return i==="rollR"||i==="rollL"?[s,-r,0,r,s,0,0,0,1]:[1,0,0,0,s,-r,0,r,s]}const bh=i=>i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2;class Cr{constructor(t){V(this,"kind","2d");V(this,"activeQuality",null);V(this,"canvas");V(this,"ctx");V(this,"W",0);V(this,"H",0);V(this,"dpr",1);V(this,"S",40);V(this,"insetTop",90);V(this,"insetBottom",90);V(this,"level");V(this,"state");V(this,"rm",Se[0].slice());V(this,"fa",null);V(this,"pv",[0,0,0]);V(this,"cam",[0,0]);V(this,"pulses",[]);V(this,"parts",[]);V(this,"doorOpen",new Map);V(this,"time",0);V(this,"squash",0);V(this,"wipe",0);V(this,"caption",{text:"",t:0});V(this,"nudge",[0,0,0]);V(this,"proj",new Map);V(this,"attract",{t:0});V(this,"facing","right");V(this,"snapCamera",!0);this.canvas=t;const e=t.getContext("2d");if(!e)throw new Error("Canvas 2D is unavailable");this.ctx=e,this.resize()}resize(){const t=Math.min(2,window.devicePixelRatio||1),e=Math.max(1,Math.floor(window.innerWidth)),n=Math.max(1,Math.floor(window.innerHeight));this.dpr=t,this.W=e,this.H=n,this.canvas.width=Math.floor(e*t),this.canvas.height=Math.floor(n*t),this.canvas.style.width=e+"px",this.canvas.style.height=n+"px"}setInsets(t,e){this.insetTop=t,this.insetBottom=e}setState(t,e){this.level=t,this.state=e,this.fa=null,this.rm=Se[e.ori[e.room]].slice(),this.pv=[e.x,e.y,e.z],this.pulses=[],this.parts=[],this.doorOpen.clear();for(const n of t.objs)n.kind==="door"&&this.doorOpen.set(n.id,e.ctl>>n.bit&1);this.cam=[0,0],this.snapCamera=!0}setCaption(t){this.caption={text:t,t:2.2}}apply(t,e,n,s){const r=t.room!==e.room;this.state=e,r&&(this.fa=null,this.rm=Se[e.ori[e.room]].slice(),this.pv=[e.x,e.y,e.z],this.snapCamera=!0,this.wipe=1,this.setCaption(this.level.rooms[e.room].name));for(const o of n)if(o.k==="fold"&&!r){const a=Se[t.ori[t.room]].slice();s?this.fa={t:0,from:a,kind:o.kind}:(this.fa=null,this.rm=Se[e.ori[e.room]].slice()),s||(this.pv=[e.x,e.y,e.z])}else if(o.k==="step")this.squash=s?1:0;else if(o.k==="collect"){const a=this.level.objs[o.obj];this.burst(a,a.kind==="shard"?gn:Un,s)}else o.k==="latch"||o.k==="toggle"?this.pulse(this.level.objs[o.obj],tn,!1):o.k==="complete"&&this.pulse(this.exitObj(),Un,!0);s||(this.pv=[e.x,e.y,e.z],this.rm=Se[e.ori[e.room]].slice())}exitObj(){return this.level.objs.find(t=>t.kind==="exit")}pulse(t,e,n){this.pulses.push({room:t.room,c:[t.x,t.y,t.z],t:0,life:n?1.4:.6,color:e,big:n})}burst(t,e,n){if(this.pulse(t,e,!1),!!n)for(let s=0;s<6;s++){const r=s/6*Math.PI*2;this.parts.push({room:t.room,c:[t.x,t.y,t.z],ox:0,oy:0,vx:Math.cos(r)*.9,vy:-.7+Math.sin(r)*.5,t:0})}}used(t){}orbit(t,e){}recenter(){}setQuality(t){}dispose(){}blockedNudge(t){const e=t==="right"?[3,0]:t==="left"?[-3,0]:t==="away"?[0,-3]:[0,3];this.nudge=[e[0],e[1],1]}attractTick(t,e){if(this.attract.t+=t,e&&this.attract.t>3.4&&!this.fa){this.attract.t=0;const n=this.rm.slice();this.fa={t:0,from:n,kind:"rollL"}}}visRot(){return this.fa?Na(Fa(this.fa.kind,bh(Math.min(1,this.fa.t))),this.fa.from):this.rm}center(t){const e=this.level.rooms[t];return[(e.w-1)/2,(e.h-1)/2,(e.d-1)/2]}toView(t,e,n){const s=n[0]-e[0],r=n[1]-e[1],o=n[2]-e[2];return[t[0]*s+t[1]*r+t[2]*o,t[3]*s+t[4]*r+t[5]*o,t[6]*s+t[7]*r+t[8]*o]}sx(t){return(t[0]+tr*t[2])*this.S}sy(t){return(t[1]-er*t[2])*this.S}pick(t,e,n){let s=null,r=(.9*this.S)**2;for(const o of n){const a=this.proj.get(o);if(!a)continue;const l=(a[0]-t)**2+(a[1]-e)**2;l<r&&(r=l,s=o)}return s}frame(t,e){const{ctx:n}=this;this.time+=t,this.fa&&(this.fa.t+=t/Mh,this.fa.t>=1&&(this.rm=Se[this.attractOrFinal()].slice(),this.fa=null)),this.squash=Math.max(0,this.squash-t/.09),this.wipe=Math.max(0,this.wipe-t/.35),this.caption.t=Math.max(0,this.caption.t-t);for(const w of this.pulses)w.t+=t;this.pulses=this.pulses.filter(w=>w.t<w.life);for(const w of this.parts)w.t+=t,w.ox+=w.vx*t,w.oy+=w.vy*t,w.vy+=1.4*t;this.parts=this.parts.filter(w=>w.t<.7),this.nudge[2]=Math.max(0,this.nudge[2]-t/.12);const s=this.state,r=this.level,o=1-Math.exp(-t*16);this.pv[0]+=(s.x-this.pv[0])*o,this.pv[1]+=(s.y-this.pv[1])*o,this.pv[2]+=(s.z-this.pv[2])*o;for(const w of r.objs){if(w.kind!=="door")continue;const x=s.ctl>>w.bit&1,v=this.doorOpen.get(w.id)??x;this.doorOpen.set(w.id,v+(x-v)*(1-Math.exp(-t*10)))}const a=this.visRot(),l=this.center(s.room),c=r.rooms[s.room],h=c.free.some(w=>w==="pitchA"||w==="pitchB")||r.objs.some(w=>w.room===s.room&&w.kind==="lever"&&(w.fold==="pitchA"||w.fold==="pitchB")),u=[c.w,c.h,c.d].sort((w,x)=>x-w),d=h?[u[0]+tr*u[1],u[0]+er*u[1]]:[Math.max(c.w,c.h)+tr*c.d,Math.max(c.w,c.h)+er*c.d],p=this.W-32,g=Math.max(120,this.H-this.insetTop-this.insetBottom);this.S=Math.max(20,Math.min(88,1.15*Math.min(p/(d[0]+1),g/(d[1]+1))));const _=this.toView(a,l,this.pv),m=this.sx(_)/this.S*.6,f=this.sy(_)/this.S*.6;if(this.snapCamera)this.cam=[m,f],this.snapCamera=!1;else{const w=1-Math.exp(-t*9);this.cam[0]+=(m-this.cam[0])*w,this.cam[1]+=(f-this.cam[1])*w}const y=this.W/2-this.cam[0]*this.S+this.nudge[0]*this.nudge[2],b=this.insetTop+g/2-this.cam[1]*this.S+this.nudge[1]*this.nudge[2];n.setTransform(this.dpr,0,0,this.dpr,0,0),this.drawBackground(),n.save(),n.translate(y,b);const M=[];this.proj.clear();const P=[];for(let w=0;w<8;w++){const x=w&1?.5:-.5,v=w&2?.5:-.5,C=w&4?.5:-.5;P.push([a[0]*x+a[1]*v+a[2]*C,a[3]*x+a[4]*v+a[5]*C,a[6]*x+a[7]*v+a[8]*C])}const T=na(s),A=this.state;for(let w=0;w<c.d;w++)for(let x=0;x<c.h;x++)for(let v=0;v<c.w;v++){const C=v+c.w*(x+c.h*w);if(!c.solid[C])continue;const N=this.toView(a,l,[v,x,w]);M.push({z:N[2],y:N[1],x:N[0],order:0,draw:()=>this.drawCube(a,P,N,[v,x,w],T,1,!1,e.contrast,A)})}for(const w of r.objs){if(w.room!==s.room)continue;const x=this.toView(a,l,[w.x,w.y,w.z]);if(w.kind==="door"){const N=this.doorOpen.get(w.id)??0;M.push({z:x[2],y:x[1],x:x[0],order:0,draw:()=>this.drawCube(a,P,x,[w.x,w.y,w.z],T,1-N*.92,!0,e.contrast,A)});continue}const v=this.sx(x)*1,C=this.sy(x)+.2*this.S;this.proj.set(w.id,[y+v,b+C]),M.push({z:x[2],y:x[1],x:x[0],order:1,draw:()=>this.drawObject(w,v,C,e)})}if(e.showPlayer){const w=["right","left","away","toward"];for(const v of w){const C=ia(r,s,v),N=this.toView(a,l,C.ok?[C.to[0],C.to[1],C.to[2]]:[(s.x+C.to[0])/2,(s.y+C.to[1])/2,(s.z+C.to[2])/2]),I=e.hintDir===v;M.push({z:N[2],y:N[1],x:N[0],order:1,draw:()=>this.drawMarker(N,C.ok,I,e.contrast)})}const x=this.toView(a,l,this.pv);M.push({z:x[2],y:x[1],x:x[0],order:2,draw:()=>this.drawPlayer(x)})}M.sort((w,x)=>x.z-w.z||x.y-w.y||w.x-x.x||w.order-x.order);for(const w of M)w.draw();for(const w of this.pulses){if(w.room!==s.room)continue;const x=this.toView(a,l,w.c),v=w.t/w.life,C=(w.big?.4+v*3.2:.3+v*1.1)*this.S;n.strokeStyle=jt(w.color,(1-v)*.9),n.lineWidth=w.big?3:2,n.beginPath(),n.ellipse(this.sx(x),this.sy(x)+.3*this.S,C,C*.55,0,0,Math.PI*2),n.stroke()}for(const w of this.parts){if(w.room!==s.room)continue;const x=this.toView(a,l,w.c);n.fillStyle=jt(Un,1-w.t/.7),n.fillRect(this.sx(x)+w.ox*this.S-2,this.sy(x)+w.oy*this.S-2,4,4)}if(n.restore(),this.wipe>0){const w=n.createLinearGradient(0,0,this.W,0);w.addColorStop(0,jt(Js,0)),w.addColorStop(.5,jt(Js,.45*this.wipe)),w.addColorStop(1,jt(Js,0)),n.fillStyle=w,n.fillRect(0,0,this.W,this.H)}this.caption.t>0&&(n.globalAlpha=Math.min(1,this.caption.t),n.fillStyle=jt(gn,.9),n.font="600 14px system-ui, sans-serif",n.textAlign="center",n.fillText(this.caption.text.toUpperCase().split("").join(" "),this.W/2,this.H-this.insetBottom-12),n.globalAlpha=1)}attractOrFinal(){if(this.fa){const t=Na(Fa(this.fa.kind,1),this.fa.from).map(n=>Math.round(n)),e=Se.findIndex(n=>n.every((s,r)=>s===t[r]));return e<0?0:e}return 0}drawBackground(){const{ctx:t,W:e,H:n}=this;t.fillStyle=Tr,t.fillRect(0,0,e,n);const s=t.createRadialGradient(e/2,n*.5,10,e/2,n*.5,Math.max(e,n)*.7);s.addColorStop(0,"rgba(40,60,120,0.22)"),s.addColorStop(1,"rgba(5,6,11,0)"),t.fillStyle=s,t.fillRect(0,0,e,n)}drawCube(t,e,n,s,r,o,a,l,c){const{ctx:h}=this,u=this.level,d=[],p=[];for(let m=0;m<8;m++)d.push(this.sx([n[0]+e[m][0],n[1]+e[m][1],n[2]+e[m][2]])),p.push(this.sy([n[0]+e[m][0],n[1]+e[m][1],n[2]+e[m][2]]));const g=a?Ua(Ia,mi,.4):Ia,_=a?mi:[110,190,255];for(const m of yh){const f=[0,0,0];f[m.a]=m.s;const y=s[0]+f[0],b=s[1]+f[1],M=s[2]+f[2];if(!mr(u,c.room,y,b,M)||ki(u,c.ctl,c.room,y,b,M))continue;const P=[m.s*t[m.a],m.s*t[3+m.a],m.s*t[6+m.a]],T=P[0]*Ar[0]+P[1]*Ar[1]+P[2]*Ar[2]<0,A=f[0]===-r[0]&&f[1]===-r[1]&&f[2]===-r[2],w=[(m.a+1)%3,(m.a+2)%3],x=m.s>0?1<<m.a:0;if(h.beginPath(),Sh.forEach(([v,C],N)=>{const I=x|v<<w[0]|C<<w[1];N===0?h.moveTo(d[I],p[I]):h.lineTo(d[I],p[I])}),h.closePath(),T){const v=Math.max(0,P[0]*Rr[0]+P[1]*Rr[1]+P[2]*Rr[2]);let C=[g[0]*(.5+.9*v),g[1]*(.5+.9*v),g[2]*(.55+.9*v)];A&&!a&&(C=Ua(C,tn,.2)),h.fillStyle=jt(C,.86*o),h.fill(),h.strokeStyle=jt(A?tn:_,(l?.8:A?.4:.26)*Math.max(o,.3)),h.lineWidth=l?1.6:1,h.stroke()}else h.fillStyle=jt(g,.1*o),h.fill(),h.strokeStyle=jt(_,(l?.5:.17)*Math.max(o,.3)),h.lineWidth=1,h.stroke()}}drawMarker(t,e,n,s){const{ctx:r,S:o}=this,a=t[1]+.5,l=(h,u)=>[this.sx([t[0]+h,a,t[2]+u]),this.sy([t[0]+h,a,t[2]+u])],c=.5+.5*Math.sin(this.time*4);if(e){const h=.28+(n?.1*c:0),u=l(-h,0),d=l(0,-h),p=l(h,0),g=l(0,h);r.beginPath(),r.moveTo(u[0],u[1]),r.lineTo(d[0],d[1]),r.lineTo(p[0],p[1]),r.lineTo(g[0],g[1]),r.closePath(),r.fillStyle=jt(n?mi:tn,n?.5:.14+.08*c),r.fill(),r.strokeStyle=jt(n?mi:tn,s?1:.75),r.lineWidth=n?2.5:1.5,r.stroke()}else{const u=l(-.15,-.15),d=l(.15,.15),p=l(-.15,.15),g=l(.15,-.15);r.strokeStyle=jt(Un,s?.95:.5),r.lineWidth=1.6,r.beginPath(),r.moveTo(u[0],u[1]),r.lineTo(d[0],d[1]),r.moveTo(p[0],p[1]),r.lineTo(g[0],g[1]),r.stroke()}}drawPlayer(t){const{ctx:e,S:n}=this,s=this.sx(t),r=this.sy(t)+.48*n,o=this.squash*.06,a=.2*n*(1+o),l=.78*n*(1-o);e.fillStyle="rgba(0,0,0,0.45)",e.beginPath(),e.ellipse(s,r,.26*n,.11*n,0,0,Math.PI*2),e.fill();const c=e.createRadialGradient(s,r-l*.6,2,s,r-l*.6,n*.9);c.addColorStop(0,jt(tn,.35)),c.addColorStop(1,jt(tn,0)),e.fillStyle=c,e.fillRect(s-n,r-l-n*.4,n*2,n*2),e.fillStyle=jt(tn,.95),e.beginPath(),e.moveTo(s-a,r),e.lineTo(s-a,r-l+a),e.arc(s,r-l+a,a,Math.PI,0),e.lineTo(s+a,r),e.closePath(),e.fill();const h=this.facing==="right"?1:this.facing==="left"?-1:0;e.fillStyle=Tr,e.fillRect(s+h*a*.45-2,r-l*.78,4,6)}drawObject(t,e,n,s){const{ctx:r,S:o}=this,a=s.effects?Math.sin(this.time*2+t.id)*.04*o:0,l=this.state,c=s.target===t.id||s.hover===t.id,h=(u,d,p)=>{const g=r.createRadialGradient(e,n,1,e,n,d);g.addColorStop(0,jt(u,p)),g.addColorStop(1,jt(u,0)),r.fillStyle=g,r.fillRect(e-d,n-d,d*2,d*2)};switch(t.kind){case"crystal":{if(l.got>>t.bit&1)return;h(Un,o*.7,.35),r.fillStyle=jt(Un,.95),r.beginPath(),r.moveTo(e,n-.32*o+a),r.lineTo(e+.17*o,n+a),r.lineTo(e,n+.32*o+a),r.lineTo(e-.17*o,n+a),r.closePath(),r.fill(),r.strokeStyle="rgba(255,255,255,0.7)",r.lineWidth=1,r.stroke();break}case"shard":{if(l.got>>t.bit&1)return;h(gn,o*.6,.3),r.fillStyle=jt(gn,.95),r.beginPath(),r.moveTo(e,n-.25*o+a),r.lineTo(e+.17*o,n+.16*o+a),r.lineTo(e-.17*o,n+.16*o+a),r.closePath(),r.fill();break}case"exit":{const u=gs(this.level,l)===0,d=u?.95:.35;u&&h(Un,o*.9,.35+(s.effects?.15*Math.sin(this.time*3):0)),r.strokeStyle=jt(Un,d),r.lineWidth=2.5,r.beginPath(),r.ellipse(e,n-.05*o,.3*o,.4*o,0,0,Math.PI*2),r.stroke(),r.lineWidth=1.5,r.beginPath(),r.ellipse(e,n-.05*o,.18*o,.26*o,0,0,Math.PI*2),r.stroke(),u||(r.beginPath(),r.moveTo(e-.12*o,n-.05*o),r.lineTo(e+.12*o,n-.05*o),r.stroke());break}case"portal":{const u=xh(t.ch),d=t.secret?.5:.95;h(u,o*.8,t.secret?.15:.3),r.strokeStyle=jt(u,d),r.lineWidth=2.5,r.setLineDash(t.secret?[3,4]:[]),r.beginPath(),r.ellipse(e,n-.05*o,.27*o,.4*o,0,0,Math.PI*2),r.stroke(),r.setLineDash([]);const p=s.effects?this.time*1.5:0;r.lineWidth=1.5,r.beginPath(),r.ellipse(e,n-.05*o,.15*o,.27*o,0,p,p+Math.PI*1.4),r.stroke(),r.fillStyle=jt(u,.95),r.font=`700 ${Math.max(9,.22*o)|0}px system-ui, sans-serif`,r.textAlign="center",r.textBaseline="middle",r.fillText(t.secret?"?":t.ch.toUpperCase(),e,n-.05*o),r.textBaseline="alphabetic";break}case"lever":{const u=t.fold;r.fillStyle=jt(mi,.55),r.fillRect(e-.2*o,n+.14*o,.4*o,.1*o);const d=u==="rollL"?-.6:u==="rollR"?.6:0;r.strokeStyle=jt(mi,.98),r.lineWidth=3,r.beginPath(),r.moveTo(e,n+.16*o),r.lineTo(e+Math.sin(d)*.34*o,n+.16*o-Math.cos(d)*.34*o),r.stroke(),r.fillStyle=jt(gn,.95),r.font=`700 ${Math.max(10,.3*o)|0}px system-ui, sans-serif`,r.textAlign="center";const p=u==="rollL"?"↺":u==="rollR"?"↻":u==="pitchA"?"↓":"↑";r.fillText(p,e,n-.26*o);break}case"switch":{const u=l.ctl>>t.bit&1;r.fillStyle=jt(u?tn:gn,u?.9:.35),r.fillRect(e-.2*o,n-.1*o,.4*o,.3*o),r.fillStyle=Tr,r.fillRect(e-.1*o+(u?.1:-0)*o,n-.02*o,.1*o,.14*o);break}case"plate":{const u=l.ctl>>t.bit&1;r.fillStyle=jt(u?tn:gn,u?.8:.3),r.beginPath(),r.ellipse(e,n+.2*o,.3*o,.12*o,0,0,Math.PI*2),r.fill(),r.strokeStyle=jt(u?tn:gn,.8),r.lineWidth=1.5,r.stroke();break}}c&&(r.strokeStyle=jt(gn,.9),r.lineWidth=1.5,r.setLineDash([4,4]),r.lineDashOffset=s.effects?-this.time*12:0,r.beginPath(),r.arc(e,n-.02*o,.5*o,0,Math.PI*2),r.stroke(),r.setLineDash([]))}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const sa="170",Eh=0,Oa=1,wh=2,lc=1,cc=2,bn=3,Xn=0,Ue=1,je=2,Rn=0,Fi=1,hn=2,Ba=3,ka=4,Th=5,si=100,Ah=101,Rh=102,Ch=103,Ph=104,Lh=200,Dh=201,Ih=202,Uh=203,ho=204,uo=205,Nh=206,Fh=207,Oh=208,Bh=209,kh=210,zh=211,Hh=212,Gh=213,Vh=214,fo=0,po=1,mo=2,zi=3,go=4,_o=5,vo=6,xo=7,hc=0,Wh=1,Xh=2,Vn=0,uc=1,dc=2,fc=3,ra=4,qh=5,pc=6,mc=7,gc=300,Hi=301,Gi=302,Mo=303,yo=304,gr=306,hr=1e3,oi=1001,So=1002,an=1003,$h=1004,Es=1005,un=1006,Pr=1007,ai=1008,Ln=1009,_c=1010,vc=1011,_s=1012,oa=1013,ci=1014,Tn=1015,dn=1016,aa=1017,la=1018,Vi=1020,xc=35902,Mc=1021,yc=1022,on=1023,Sc=1024,bc=1025,Oi=1026,Wi=1027,Ec=1028,ca=1029,wc=1030,ha=1031,ua=1033,nr=33776,ir=33777,sr=33778,rr=33779,bo=35840,Eo=35841,wo=35842,To=35843,Ao=36196,Ro=37492,Co=37496,Po=37808,Lo=37809,Do=37810,Io=37811,Uo=37812,No=37813,Fo=37814,Oo=37815,Bo=37816,ko=37817,zo=37818,Ho=37819,Go=37820,Vo=37821,or=36492,Wo=36494,Xo=36495,Tc=36283,qo=36284,$o=36285,Yo=36286,Yh=3200,jh=3201,Ac=0,Kh=1,wn="",fe="srgb",$i="srgb-linear",_r="linear",Zt="srgb",gi=7680,za=519,Zh=512,Qh=513,Jh=514,Rc=515,tu=516,eu=517,nu=518,iu=519,jo=35044,Ha="300 es",An=2e3,ur=2001;class Yi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Re=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ga=1234567;const ps=Math.PI/180,vs=180/Math.PI;function Cn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Re[i&255]+Re[i>>8&255]+Re[i>>16&255]+Re[i>>24&255]+"-"+Re[t&255]+Re[t>>8&255]+"-"+Re[t>>16&15|64]+Re[t>>24&255]+"-"+Re[e&63|128]+Re[e>>8&255]+"-"+Re[e>>16&255]+Re[e>>24&255]+Re[n&255]+Re[n>>8&255]+Re[n>>16&255]+Re[n>>24&255]).toLowerCase()}function Ee(i,t,e){return Math.max(t,Math.min(e,i))}function da(i,t){return(i%t+t)%t}function su(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function ru(i,t,e){return i!==t?(e-i)/(t-i):0}function ms(i,t,e){return(1-e)*i+e*t}function ou(i,t,e,n){return ms(i,t,1-Math.exp(-e*n))}function au(i,t=1){return t-Math.abs(da(i,t*2)-t)}function lu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function cu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function hu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function uu(i,t){return i+Math.random()*(t-i)}function du(i){return i*(.5-Math.random())}function fu(i){i!==void 0&&(Ga=i);let t=Ga+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function pu(i){return i*ps}function mu(i){return i*vs}function gu(i){return(i&i-1)===0&&i!==0}function _u(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function vu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function xu(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),p=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*p,a*c);break;case"YXY":i.set(l*p,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*p,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function rn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Qt(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const li={DEG2RAD:ps,RAD2DEG:vs,generateUUID:Cn,clamp:Ee,euclideanModulo:da,mapLinear:su,inverseLerp:ru,lerp:ms,damp:ou,pingpong:au,smoothstep:lu,smootherstep:cu,randInt:hu,randFloat:uu,randFloatSpread:du,seededRandom:fu,degToRad:pu,radToDeg:mu,isPowerOfTwo:gu,ceilPowerOfTwo:_u,floorPowerOfTwo:vu,setQuaternionFromProperEuler:xu,normalize:Qt,denormalize:rn};class _t{constructor(t=0,e=0){_t.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ut{constructor(t,e,n,s,r,o,a,l,c){Ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],_=s[0],m=s[3],f=s[6],y=s[1],b=s[4],M=s[7],P=s[2],T=s[5],A=s[8];return r[0]=o*_+a*y+l*P,r[3]=o*m+a*b+l*T,r[6]=o*f+a*M+l*A,r[1]=c*_+h*y+u*P,r[4]=c*m+h*b+u*T,r[7]=c*f+h*M+u*A,r[2]=d*_+p*y+g*P,r[5]=d*m+p*b+g*T,r[8]=d*f+p*M+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,p=c*r-o*l,g=e*u+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*c-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=d*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=p*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Lr.makeScale(t,e)),this}rotate(t){return this.premultiply(Lr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Lr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Lr=new Ut;function Cc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function dr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Mu(){const i=dr("canvas");return i.style.display="block",i}const Va={};function hs(i){i in Va||(Va[i]=!0,console.warn(i))}function yu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Su(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function bu(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Vt={enabled:!0,workingColorSpace:$i,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Zt&&(i.r=Pn(i.r),i.g=Pn(i.g),i.b=Pn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Zt&&(i.r=Bi(i.r),i.g=Bi(i.g),i.b=Bi(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===wn?_r:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Pn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Bi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Wa=[.64,.33,.3,.6,.15,.06],Xa=[.2126,.7152,.0722],qa=[.3127,.329],$a=new Ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ya=new Ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Vt.define({[$i]:{primaries:Wa,whitePoint:qa,transfer:_r,toXYZ:$a,fromXYZ:Ya,luminanceCoefficients:Xa,workingColorSpaceConfig:{unpackColorSpace:fe},outputColorSpaceConfig:{drawingBufferColorSpace:fe}},[fe]:{primaries:Wa,whitePoint:qa,transfer:Zt,toXYZ:$a,fromXYZ:Ya,luminanceCoefficients:Xa,outputColorSpaceConfig:{drawingBufferColorSpace:fe}}});let _i;class Eu{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{_i===void 0&&(_i=dr("canvas")),_i.width=t.width,_i.height=t.height;const n=_i.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=_i}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=dr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Pn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Pn(e[n]/255)*255):e[n]=Pn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let wu=0;class Pc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wu++}),this.uuid=Cn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Dr(s[o].image)):r.push(Dr(s[o]))}else r=Dr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Dr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Eu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Tu=0;class Te extends Yi{constructor(t=Te.DEFAULT_IMAGE,e=Te.DEFAULT_MAPPING,n=oi,s=oi,r=un,o=ai,a=on,l=Ln,c=Te.DEFAULT_ANISOTROPY,h=wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tu++}),this.uuid=Cn(),this.name="",this.source=new Pc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new _t(0,0),this.repeat=new _t(1,1),this.center=new _t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==gc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case hr:t.x=t.x-Math.floor(t.x);break;case oi:t.x=t.x<0?0:1;break;case So:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case hr:t.y=t.y-Math.floor(t.y);break;case oi:t.y=t.y<0?0:1;break;case So:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Te.DEFAULT_IMAGE=null;Te.DEFAULT_MAPPING=gc;Te.DEFAULT_ANISOTROPY=1;class Jt{constructor(t=0,e=0,n=0,s=1){Jt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(c+1)/2,M=(p+1)/2,P=(f+1)/2,T=(h+d)/4,A=(u+_)/4,w=(g+m)/4;return b>M&&b>P?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=T/n,r=A/n):M>P?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=T/s,r=w/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=A/r,s=w/r),this.set(n,s,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-_)/y,this.z=(d-h)/y,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Au extends Yi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Jt(0,0,t,e),this.scissorTest=!1,this.viewport=new Jt(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:un,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Te(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Pc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ze extends Au{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Lc extends Te{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ru extends Te{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ui{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==d||c!==p||h!==g){let m=1-a;const f=l*d+c*p+h*g+u*_,y=f>=0?1:-1,b=1-f*f;if(b>Number.EPSILON){const P=Math.sqrt(b),T=Math.atan2(P,f*y);m=Math.sin(m*T)/P,a=Math.sin(a*T)/P}const M=a*y;if(l=l*m+d*M,c=c*m+p*M,h=h*m+g*M,u=u*m+_*M,m===1-a){const P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,h*=P,u*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*p-c*d,t[e+1]=l*g+h*d+c*u-a*p,t[e+2]=c*g+h*p+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ja.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ja.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ir.copy(this).projectOnVector(t),this.sub(Ir)}reflect(t){return this.sub(Ir.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ir=new L,ja=new ui;class Ms{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(en.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(en.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=en.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,en):en.fromBufferAttribute(r,o),en.applyMatrix4(t.matrixWorld),this.expandByPoint(en);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ws.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ws.copy(n.boundingBox)),ws.applyMatrix4(t.matrixWorld),this.union(ws)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,en),en.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ts),Ts.subVectors(this.max,ts),vi.subVectors(t.a,ts),xi.subVectors(t.b,ts),Mi.subVectors(t.c,ts),Nn.subVectors(xi,vi),Fn.subVectors(Mi,xi),jn.subVectors(vi,Mi);let e=[0,-Nn.z,Nn.y,0,-Fn.z,Fn.y,0,-jn.z,jn.y,Nn.z,0,-Nn.x,Fn.z,0,-Fn.x,jn.z,0,-jn.x,-Nn.y,Nn.x,0,-Fn.y,Fn.x,0,-jn.y,jn.x,0];return!Ur(e,vi,xi,Mi,Ts)||(e=[1,0,0,0,1,0,0,0,1],!Ur(e,vi,xi,Mi,Ts))?!1:(As.crossVectors(Nn,Fn),e=[As.x,As.y,As.z],Ur(e,vi,xi,Mi,Ts))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,en).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(en).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(_n),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const _n=[new L,new L,new L,new L,new L,new L,new L,new L],en=new L,ws=new Ms,vi=new L,xi=new L,Mi=new L,Nn=new L,Fn=new L,jn=new L,ts=new L,Ts=new L,As=new L,Kn=new L;function Ur(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Kn.fromArray(i,r);const a=s.x*Math.abs(Kn.x)+s.y*Math.abs(Kn.y)+s.z*Math.abs(Kn.z),l=t.dot(Kn),c=e.dot(Kn),h=n.dot(Kn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Cu=new Ms,es=new L,Nr=new L;class vr{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Cu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;es.subVectors(t,this.center);const e=es.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(es,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Nr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(es.copy(t.center).add(Nr)),this.expandByPoint(es.copy(t.center).sub(Nr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const vn=new L,Fr=new L,Rs=new L,On=new L,Or=new L,Cs=new L,Br=new L;class Dc{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,vn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=vn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(vn.copy(this.origin).addScaledVector(this.direction,e),vn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Fr.copy(t).add(e).multiplyScalar(.5),Rs.copy(e).sub(t).normalize(),On.copy(this.origin).sub(Fr);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Rs),a=On.dot(this.direction),l=-On.dot(Rs),c=On.lengthSq(),h=Math.abs(1-o*o);let u,d,p,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,p=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Fr).addScaledVector(Rs,d),p}intersectSphere(t,e){vn.subVectors(t.center,this.origin);const n=vn.dot(this.direction),s=vn.dot(vn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,vn)!==null}intersectTriangle(t,e,n,s,r){Or.subVectors(e,t),Cs.subVectors(n,t),Br.crossVectors(Or,Cs);let o=this.direction.dot(Br),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;On.subVectors(this.origin,t);const l=a*this.direction.dot(Cs.crossVectors(On,Cs));if(l<0)return null;const c=a*this.direction.dot(Or.cross(On));if(c<0||l+c>o)return null;const h=-a*On.dot(Br);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ie{constructor(t,e,n,s,r,o,a,l,c,h,u,d,p,g,_,m){ie.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,p,g,_,m)}set(t,e,n,s,r,o,a,l,c,h,u,d,p,g,_,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ie().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/yi.setFromMatrixColumn(t,0).length(),r=1/yi.setFromMatrixColumn(t,1).length(),o=1/yi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,p=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=d-_*c,e[9]=-a*l,e[2]=_-d*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,p=l*u,g=c*h,_=c*u;e[0]=d+_*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=_+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,p=l*u,g=c*h,_=c*u;e[0]=d-_*a,e[4]=-o*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,p=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=g*c-p,e[8]=d*c+_,e[1]=l*u,e[5]=_*c+d,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-d*u,e[8]=g*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=p*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+_,e[5]=o*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Pu,t,Lu)}lookAt(t,e,n){const s=this.elements;return Ge.subVectors(t,e),Ge.lengthSq()===0&&(Ge.z=1),Ge.normalize(),Bn.crossVectors(n,Ge),Bn.lengthSq()===0&&(Math.abs(n.z)===1?Ge.x+=1e-4:Ge.z+=1e-4,Ge.normalize(),Bn.crossVectors(n,Ge)),Bn.normalize(),Ps.crossVectors(Ge,Bn),s[0]=Bn.x,s[4]=Ps.x,s[8]=Ge.x,s[1]=Bn.y,s[5]=Ps.y,s[9]=Ge.y,s[2]=Bn.z,s[6]=Ps.z,s[10]=Ge.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],_=n[6],m=n[10],f=n[14],y=n[3],b=n[7],M=n[11],P=n[15],T=s[0],A=s[4],w=s[8],x=s[12],v=s[1],C=s[5],N=s[9],I=s[13],W=s[2],$=s[6],z=s[10],Y=s[14],D=s[3],X=s[7],tt=s[11],st=s[15];return r[0]=o*T+a*v+l*W+c*D,r[4]=o*A+a*C+l*$+c*X,r[8]=o*w+a*N+l*z+c*tt,r[12]=o*x+a*I+l*Y+c*st,r[1]=h*T+u*v+d*W+p*D,r[5]=h*A+u*C+d*$+p*X,r[9]=h*w+u*N+d*z+p*tt,r[13]=h*x+u*I+d*Y+p*st,r[2]=g*T+_*v+m*W+f*D,r[6]=g*A+_*C+m*$+f*X,r[10]=g*w+_*N+m*z+f*tt,r[14]=g*x+_*I+m*Y+f*st,r[3]=y*T+b*v+M*W+P*D,r[7]=y*A+b*C+M*$+P*X,r[11]=y*w+b*N+M*z+P*tt,r[15]=y*x+b*I+M*Y+P*st,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],_=t[7],m=t[11],f=t[15];return g*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*p-n*l*p)+_*(+e*l*p-e*c*d+r*o*d-s*o*p+s*c*h-r*l*h)+m*(+e*c*u-e*a*p-r*o*u+n*o*p+r*a*h-n*c*h)+f*(-s*a*h-e*l*u+e*a*d+s*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],_=t[13],m=t[14],f=t[15],y=u*m*c-_*d*c+_*l*p-a*m*p-u*l*f+a*d*f,b=g*d*c-h*m*c-g*l*p+o*m*p+h*l*f-o*d*f,M=h*_*c-g*u*c+g*a*p-o*_*p-h*a*f+o*u*f,P=g*u*l-h*_*l-g*a*d+o*_*d+h*a*m-o*u*m,T=e*y+n*b+s*M+r*P;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return t[0]=y*A,t[1]=(_*d*r-u*m*r-_*s*p+n*m*p+u*s*f-n*d*f)*A,t[2]=(a*m*r-_*l*r+_*s*c-n*m*c-a*s*f+n*l*f)*A,t[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*p-n*l*p)*A,t[4]=b*A,t[5]=(h*m*r-g*d*r+g*s*p-e*m*p-h*s*f+e*d*f)*A,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*f-e*l*f)*A,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*p+e*l*p)*A,t[8]=M*A,t[9]=(g*u*r-h*_*r-g*n*p+e*_*p+h*n*f-e*u*f)*A,t[10]=(o*_*r-g*a*r+g*n*c-e*_*c-o*n*f+e*a*f)*A,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*p-e*a*p)*A,t[12]=P*A,t[13]=(h*_*s-g*u*s+g*n*d-e*_*d-h*n*m+e*u*m)*A,t[14]=(g*a*s-o*_*s-g*n*l+e*_*l+o*n*m-e*a*m)*A,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*d+e*a*d)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,p=r*h,g=r*u,_=o*h,m=o*u,f=a*u,y=l*c,b=l*h,M=l*u,P=n.x,T=n.y,A=n.z;return s[0]=(1-(_+f))*P,s[1]=(p+M)*P,s[2]=(g-b)*P,s[3]=0,s[4]=(p-M)*T,s[5]=(1-(d+f))*T,s[6]=(m+y)*T,s[7]=0,s[8]=(g+b)*A,s[9]=(m-y)*A,s[10]=(1-(d+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=yi.set(s[0],s[1],s[2]).length();const o=yi.set(s[4],s[5],s[6]).length(),a=yi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],nn.copy(this);const c=1/r,h=1/o,u=1/a;return nn.elements[0]*=c,nn.elements[1]*=c,nn.elements[2]*=c,nn.elements[4]*=h,nn.elements[5]*=h,nn.elements[6]*=h,nn.elements[8]*=u,nn.elements[9]*=u,nn.elements[10]*=u,e.setFromRotationMatrix(nn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=An){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let p,g;if(a===An)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===ur)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=An){const l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(o-r),d=(e+t)*c,p=(n+s)*h;let g,_;if(a===An)g=(o+r)*u,_=-2*u;else if(a===ur)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const yi=new L,nn=new ie,Pu=new L(0,0,0),Lu=new L(1,1,1),Bn=new L,Ps=new L,Ge=new L,Ka=new ie,Za=new ui;class fn{constructor(t=0,e=0,n=0,s=fn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ee(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ee(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ka.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ka,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Za.setFromEuler(this),this.setFromQuaternion(Za,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fn.DEFAULT_ORDER="XYZ";class Ic{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Du=0;const Qa=new L,Si=new ui,xn=new ie,Ls=new L,ns=new L,Iu=new L,Uu=new ui,Ja=new L(1,0,0),tl=new L(0,1,0),el=new L(0,0,1),nl={type:"added"},Nu={type:"removed"},bi={type:"childadded",child:null},kr={type:"childremoved",child:null};class ge extends Yi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Du++}),this.uuid=Cn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ge.DEFAULT_UP.clone();const t=new L,e=new fn,n=new ui,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ie},normalMatrix:{value:new Ut}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=ge.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ic,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Si.setFromAxisAngle(t,e),this.quaternion.multiply(Si),this}rotateOnWorldAxis(t,e){return Si.setFromAxisAngle(t,e),this.quaternion.premultiply(Si),this}rotateX(t){return this.rotateOnAxis(Ja,t)}rotateY(t){return this.rotateOnAxis(tl,t)}rotateZ(t){return this.rotateOnAxis(el,t)}translateOnAxis(t,e){return Qa.copy(t).applyQuaternion(this.quaternion),this.position.add(Qa.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ja,t)}translateY(t){return this.translateOnAxis(tl,t)}translateZ(t){return this.translateOnAxis(el,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ls.copy(t):Ls.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(ns,Ls,this.up):xn.lookAt(Ls,ns,this.up),this.quaternion.setFromRotationMatrix(xn),s&&(xn.extractRotation(s.matrixWorld),Si.setFromRotationMatrix(xn),this.quaternion.premultiply(Si.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(nl),bi.child=t,this.dispatchEvent(bi),bi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Nu),kr.child=t,this.dispatchEvent(kr),kr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(nl),bi.child=t,this.dispatchEvent(bi),bi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,t,Iu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,Uu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}ge.DEFAULT_UP=new L(0,1,0);ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const sn=new L,Mn=new L,zr=new L,yn=new L,Ei=new L,wi=new L,il=new L,Hr=new L,Gr=new L,Vr=new L,Wr=new Jt,Xr=new Jt,qr=new Jt;class Ke{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),sn.subVectors(t,e),s.cross(sn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){sn.subVectors(s,e),Mn.subVectors(n,e),zr.subVectors(t,e);const o=sn.dot(sn),a=sn.dot(Mn),l=sn.dot(zr),c=Mn.dot(Mn),h=Mn.dot(zr),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,p=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,yn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,yn.x),l.addScaledVector(o,yn.y),l.addScaledVector(a,yn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Wr.setScalar(0),Xr.setScalar(0),qr.setScalar(0),Wr.fromBufferAttribute(t,e),Xr.fromBufferAttribute(t,n),qr.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Wr,r.x),o.addScaledVector(Xr,r.y),o.addScaledVector(qr,r.z),o}static isFrontFacing(t,e,n,s){return sn.subVectors(n,e),Mn.subVectors(t,e),sn.cross(Mn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return sn.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),sn.cross(Mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ke.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ke.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Ke.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Ke.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ke.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Ei.subVectors(s,n),wi.subVectors(r,n),Hr.subVectors(t,n);const l=Ei.dot(Hr),c=wi.dot(Hr);if(l<=0&&c<=0)return e.copy(n);Gr.subVectors(t,s);const h=Ei.dot(Gr),u=wi.dot(Gr);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Ei,o);Vr.subVectors(t,r);const p=Ei.dot(Vr),g=wi.dot(Vr);if(g>=0&&p<=g)return e.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(wi,a);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return il.subVectors(r,s),a=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(il,a);const f=1/(m+_+d);return o=_*f,a=d*f,e.copy(n).addScaledVector(Ei,o).addScaledVector(wi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Uc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},kn={h:0,s:0,l:0},Ds={h:0,s:0,l:0};function $r(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class St{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=fe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Vt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Vt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Vt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Vt.workingColorSpace){if(t=da(t,1),e=Ee(e,0,1),n=Ee(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=$r(o,r,t+1/3),this.g=$r(o,r,t),this.b=$r(o,r,t-1/3)}return Vt.toWorkingColorSpace(this,s),this}setStyle(t,e=fe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=fe){const n=Uc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Pn(t.r),this.g=Pn(t.g),this.b=Pn(t.b),this}copyLinearToSRGB(t){return this.r=Bi(t.r),this.g=Bi(t.g),this.b=Bi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=fe){return Vt.fromWorkingColorSpace(Ce.copy(this),t),Math.round(Ee(Ce.r*255,0,255))*65536+Math.round(Ee(Ce.g*255,0,255))*256+Math.round(Ee(Ce.b*255,0,255))}getHexString(t=fe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Vt.workingColorSpace){Vt.fromWorkingColorSpace(Ce.copy(this),e);const n=Ce.r,s=Ce.g,r=Ce.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Vt.workingColorSpace){return Vt.fromWorkingColorSpace(Ce.copy(this),e),t.r=Ce.r,t.g=Ce.g,t.b=Ce.b,t}getStyle(t=fe){Vt.fromWorkingColorSpace(Ce.copy(this),t);const e=Ce.r,n=Ce.g,s=Ce.b;return t!==fe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(kn),this.setHSL(kn.h+t,kn.s+e,kn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(kn),t.getHSL(Ds);const n=ms(kn.h,Ds.h,e),s=ms(kn.s,Ds.s,e),r=ms(kn.l,Ds.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ce=new St;St.NAMES=Uc;let Fu=0;class di extends Yi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fu++}),this.uuid=Cn(),this.name="",this.blending=Fi,this.side=Xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ho,this.blendDst=uo,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new St(0,0,0),this.blendAlpha=0,this.depthFunc=zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=za,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=gi,this.stencilZFail=gi,this.stencilZPass=gi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fi&&(n.blending=this.blending),this.side!==Xn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ho&&(n.blendSrc=this.blendSrc),this.blendDst!==uo&&(n.blendDst=this.blendDst),this.blendEquation!==si&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==zi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==za&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==gi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==gi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==gi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Be extends di{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new St(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=hc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const pe=new L,Is=new _t;class ze{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=jo,this.updateRanges=[],this.gpuType=Tn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Is.fromBufferAttribute(this,e),Is.applyMatrix3(t),this.setXY(e,Is.x,Is.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix3(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyMatrix4(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.applyNormalMatrix(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)pe.fromBufferAttribute(this,e),pe.transformDirection(t),this.setXYZ(e,pe.x,pe.y,pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=rn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Qt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=rn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=rn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=rn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=rn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array),s=Qt(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array),s=Qt(s,this.array),r=Qt(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==jo&&(t.usage=this.usage),t}}class Nc extends ze{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Fc extends ze{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class qt extends ze{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ou=0;const Ye=new ie,Yr=new ge,Ti=new L,Ve=new Ms,is=new Ms,ye=new L;class Me extends Yi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ou++}),this.uuid=Cn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Cc(t)?Fc:Nc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ut().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ye.makeRotationFromQuaternion(t),this.applyMatrix4(Ye),this}rotateX(t){return Ye.makeRotationX(t),this.applyMatrix4(Ye),this}rotateY(t){return Ye.makeRotationY(t),this.applyMatrix4(Ye),this}rotateZ(t){return Ye.makeRotationZ(t),this.applyMatrix4(Ye),this}translate(t,e,n){return Ye.makeTranslation(t,e,n),this.applyMatrix4(Ye),this}scale(t,e,n){return Ye.makeScale(t,e,n),this.applyMatrix4(Ye),this}lookAt(t){return Yr.lookAt(t),Yr.updateMatrix(),this.applyMatrix4(Yr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ti).negate(),this.translate(Ti.x,Ti.y,Ti.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new qt(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ms);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ve.setFromBufferAttribute(r),this.morphTargetsRelative?(ye.addVectors(this.boundingBox.min,Ve.min),this.boundingBox.expandByPoint(ye),ye.addVectors(this.boundingBox.max,Ve.max),this.boundingBox.expandByPoint(ye)):(this.boundingBox.expandByPoint(Ve.min),this.boundingBox.expandByPoint(Ve.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(Ve.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];is.setFromBufferAttribute(a),this.morphTargetsRelative?(ye.addVectors(Ve.min,is.min),Ve.expandByPoint(ye),ye.addVectors(Ve.max,is.max),Ve.expandByPoint(ye)):(Ve.expandByPoint(is.min),Ve.expandByPoint(is.max))}Ve.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)ye.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ye));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)ye.fromBufferAttribute(a,c),l&&(Ti.fromBufferAttribute(t,c),ye.add(Ti)),s=Math.max(s,n.distanceToSquared(ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ze(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let w=0;w<n.count;w++)a[w]=new L,l[w]=new L;const c=new L,h=new L,u=new L,d=new _t,p=new _t,g=new _t,_=new L,m=new L;function f(w,x,v){c.fromBufferAttribute(n,w),h.fromBufferAttribute(n,x),u.fromBufferAttribute(n,v),d.fromBufferAttribute(r,w),p.fromBufferAttribute(r,x),g.fromBufferAttribute(r,v),h.sub(c),u.sub(c),p.sub(d),g.sub(d);const C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(C),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(C),a[w].add(_),a[x].add(_),a[v].add(_),l[w].add(m),l[x].add(m),l[v].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let w=0,x=y.length;w<x;++w){const v=y[w],C=v.start,N=v.count;for(let I=C,W=C+N;I<W;I+=3)f(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const b=new L,M=new L,P=new L,T=new L;function A(w){P.fromBufferAttribute(s,w),T.copy(P);const x=a[w];b.copy(x),b.sub(P.multiplyScalar(P.dot(x))).normalize(),M.crossVectors(T,x);const C=M.dot(l[w])<0?-1:1;o.setXYZW(w,b.x,b.y,b.z,C)}for(let w=0,x=y.length;w<x;++w){const v=y[w],C=v.start,N=v.count;for(let I=C,W=C+N;I<W;I+=3)A(t.getX(I+0)),A(t.getX(I+1)),A(t.getX(I+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ze(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,u=new L;if(t)for(let d=0,p=t.count;d<p;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ye.fromBufferAttribute(t,e),ye.normalize(),t.setXYZ(e,ye.x,ye.y,ye.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new ze(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Me,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],p=t(d,n);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const sl=new ie,Zn=new Dc,Us=new vr,rl=new L,Ns=new L,Fs=new L,Os=new L,jr=new L,Bs=new L,ol=new L,ks=new L;class at extends ge{constructor(t=new Me,e=new Be){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Bs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(jr.fromBufferAttribute(u,t),o?Bs.addScaledVector(jr,h):Bs.addScaledVector(jr.sub(e),h))}e.add(Bs)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Us.copy(n.boundingSphere),Us.applyMatrix4(r),Zn.copy(t.ray).recast(t.near),!(Us.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(Us,rl)===null||Zn.origin.distanceToSquared(rl)>(t.far-t.near)**2))&&(sl.copy(r).invert(),Zn.copy(t.ray).applyMatrix4(sl),!(n.boundingBox!==null&&Zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Zn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],y=Math.max(m.start,p.start),b=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let M=y,P=b;M<P;M+=3){const T=a.getX(M),A=a.getX(M+1),w=a.getX(M+2);s=zs(this,f,t,n,c,h,u,T,A,w),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const y=a.getX(m),b=a.getX(m+1),M=a.getX(m+2);s=zs(this,o,t,n,c,h,u,y,b,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],y=Math.max(m.start,p.start),b=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=y,P=b;M<P;M+=3){const T=M,A=M+1,w=M+2;s=zs(this,f,t,n,c,h,u,T,A,w),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const y=m,b=m+1,M=m+2;s=zs(this,o,t,n,c,h,u,y,b,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Bu(i,t,e,n,s,r,o,a){let l;if(t.side===Ue?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Xn,a),l===null)return null;ks.copy(a),ks.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(ks);return c<e.near||c>e.far?null:{distance:c,point:ks.clone(),object:i}}function zs(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Ns),i.getVertexPosition(l,Fs),i.getVertexPosition(c,Os);const h=Bu(i,t,e,n,Ns,Fs,Os,ol);if(h){const u=new L;Ke.getBarycoord(ol,Ns,Fs,Os,u),s&&(h.uv=Ke.getInterpolatedAttribute(s,a,l,c,u,new _t)),r&&(h.uv1=Ke.getInterpolatedAttribute(r,a,l,c,u,new _t)),o&&(h.normal=Ke.getInterpolatedAttribute(o,a,l,c,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new L,materialIndex:0};Ke.getNormal(Ns,Fs,Os,d.normal),h.face=d,h.barycoord=u}return h}class Ne extends Me{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new qt(c,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(u,2));function g(_,m,f,y,b,M,P,T,A,w,x){const v=M/A,C=P/w,N=M/2,I=P/2,W=T/2,$=A+1,z=w+1;let Y=0,D=0;const X=new L;for(let tt=0;tt<z;tt++){const st=tt*C-I;for(let vt=0;vt<$;vt++){const Bt=vt*v-N;X[_]=Bt*y,X[m]=st*b,X[f]=W,c.push(X.x,X.y,X.z),X[_]=0,X[m]=0,X[f]=T>0?1:-1,h.push(X.x,X.y,X.z),u.push(vt/A),u.push(1-tt/w),Y+=1}}for(let tt=0;tt<w;tt++)for(let st=0;st<A;st++){const vt=d+st+$*tt,Bt=d+st+$*(tt+1),j=d+(st+1)+$*(tt+1),et=d+(st+1)+$*tt;l.push(vt,Bt,et),l.push(Bt,j,et),D+=6}a.addGroup(p,D,x),p+=D,d+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ne(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Xi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ie(i){const t={};for(let e=0;e<i.length;e++){const n=Xi(i[e]);for(const s in n)t[s]=n[s]}return t}function ku(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Oc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Vt.workingColorSpace}const xs={clone:Xi,merge:Ie};var zu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class we extends di{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zu,this.fragmentShader=Hu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xi(t.uniforms),this.uniformsGroups=ku(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Bc extends ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=An}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const zn=new L,al=new _t,ll=new _t;class We extends Bc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=vs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ps*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return vs*2*Math.atan(Math.tan(ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(zn.x,zn.y).multiplyScalar(-t/zn.z),zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(zn.x,zn.y).multiplyScalar(-t/zn.z)}getViewSize(t,e){return this.getViewBounds(t,al,ll),e.subVectors(ll,al)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ps*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ai=-90,Ri=1;class Gu extends ge{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new We(Ai,Ri,t,e);s.layers=this.layers,this.add(s);const r=new We(Ai,Ri,t,e);r.layers=this.layers,this.add(r);const o=new We(Ai,Ri,t,e);o.layers=this.layers,this.add(o);const a=new We(Ai,Ri,t,e);a.layers=this.layers,this.add(a);const l=new We(Ai,Ri,t,e);l.layers=this.layers,this.add(l);const c=new We(Ai,Ri,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===An)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ur)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class kc extends Te{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Hi,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Vu extends Ze{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new kc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:un}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ne(5,5,5),r=new we({name:"CubemapFromEquirect",uniforms:Xi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ue,blending:Rn});r.uniforms.tEquirect.value=e;const o=new at(s,r),a=e.minFilter;return e.minFilter===ai&&(e.minFilter=un),new Gu(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Kr=new L,Wu=new L,Xu=new Ut;class ni{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Kr.subVectors(n,e).cross(Wu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Kr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Xu.getNormalMatrix(t),s=this.coplanarPoint(Kr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qn=new vr,Hs=new L;class fa{constructor(t=new ni,e=new ni,n=new ni,s=new ni,r=new ni,o=new ni){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=An){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],p=s[8],g=s[9],_=s[10],m=s[11],f=s[12],y=s[13],b=s[14],M=s[15];if(n[0].setComponents(l-r,d-c,m-p,M-f).normalize(),n[1].setComponents(l+r,d+c,m+p,M+f).normalize(),n[2].setComponents(l+o,d+h,m+g,M+y).normalize(),n[3].setComponents(l-o,d-h,m-g,M-y).normalize(),n[4].setComponents(l-a,d-u,m-_,M-b).normalize(),e===An)n[5].setComponents(l+a,d+u,m+_,M+b).normalize();else if(e===ur)n[5].setComponents(a,u,_,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Qn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Qn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Qn)}intersectsSprite(t){return Qn.center.set(0,0,0),Qn.radius=.7071067811865476,Qn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Qn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Hs.x=s.normal.x>0?t.max.x:t.min.x,Hs.y=s.normal.y>0?t.max.y:t.min.y,Hs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Hs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function zc(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function qu(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){const g=u[d],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){const _=u[p];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Xe extends Me{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const y=f*d-o;for(let b=0;b<c;b++){const M=b*u-r;g.push(M,-y,0),_.push(0,0,1),m.push(b/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let y=0;y<a;y++){const b=y+c*f,M=y+c*(f+1),P=y+1+c*(f+1),T=y+1+c*f;p.push(b,M,T),p.push(M,P,T)}this.setIndex(p),this.setAttribute("position",new qt(g,3)),this.setAttribute("normal",new qt(_,3)),this.setAttribute("uv",new qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xe(t.width,t.height,t.widthSegments,t.heightSegments)}}var $u=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yu=`#ifdef USE_ALPHAHASH
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
#endif`,ju=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ku=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ju=`#ifdef USE_AOMAP
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
#endif`,td=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ed=`#ifdef USE_BATCHING
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
#endif`,nd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,id=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,od=`#ifdef USE_IRIDESCENCE
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
#endif`,ad=`#ifdef USE_BUMPMAP
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
#endif`,ld=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,cd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ud=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,fd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,pd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,md=`#if defined( USE_COLOR_ALPHA )
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
#endif`,gd=`#define PI 3.141592653589793
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
} // validated`,_d=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,vd=`vec3 transformedNormal = objectNormal;
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
#endif`,xd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Md=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ed=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wd=`#ifdef USE_ENVMAP
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
#endif`,Td=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ad=`#ifdef USE_ENVMAP
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
#endif`,Rd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cd=`#ifdef USE_ENVMAP
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
#endif`,Pd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ld=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Dd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Id=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ud=`#ifdef USE_GRADIENTMAP
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
}`,Nd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Fd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Od=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bd=`uniform bool receiveShadow;
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
#endif`,kd=`#ifdef USE_ENVMAP
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
#endif`,zd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Hd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wd=`PhysicalMaterial material;
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
#endif`,Xd=`struct PhysicalMaterial {
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
}`,qd=`
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
#endif`,$d=`#if defined( RE_IndirectDiffuse )
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
#endif`,Yd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,jd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Kd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ef=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,nf=`#if defined( USE_POINTS_UV )
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
#endif`,sf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,of=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,af=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cf=`#ifdef USE_MORPHTARGETS
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
#endif`,hf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,df=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,ff=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gf=`#ifdef USE_NORMALMAP
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
#endif`,_f=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,bf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ef=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Af=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Rf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Pf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Df=`float getShadowMask() {
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
}`,If=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Uf=`#ifdef USE_SKINNING
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
#endif`,Nf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ff=`#ifdef USE_SKINNING
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
#endif`,Of=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hf=`#ifdef USE_TRANSMISSION
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
#endif`,Gf=`#ifdef USE_TRANSMISSION
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
#endif`,Vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $f=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Yf=`uniform sampler2D t2D;
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
}`,jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Zf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jf=`#include <common>
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
}`,tp=`#if DEPTH_PACKING == 3200
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
}`,ep=`#define DISTANCE
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
}`,np=`#define DISTANCE
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
}`,ip=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rp=`uniform float scale;
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
}`,op=`uniform vec3 diffuse;
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
}`,ap=`#include <common>
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
}`,lp=`uniform vec3 diffuse;
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
}`,cp=`#define LAMBERT
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
}`,hp=`#define LAMBERT
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
}`,up=`#define MATCAP
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
}`,dp=`#define MATCAP
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
}`,fp=`#define NORMAL
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
}`,pp=`#define NORMAL
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
}`,mp=`#define PHONG
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
}`,gp=`#define PHONG
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
}`,_p=`#define STANDARD
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
}`,vp=`#define STANDARD
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
}`,xp=`#define TOON
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
}`,Mp=`#define TOON
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
}`,yp=`uniform float size;
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
}`,Sp=`uniform vec3 diffuse;
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
}`,bp=`#include <common>
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
}`,Ep=`uniform vec3 color;
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
}`,wp=`uniform float rotation;
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
}`,Tp=`uniform vec3 diffuse;
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
}`,Ot={alphahash_fragment:$u,alphahash_pars_fragment:Yu,alphamap_fragment:ju,alphamap_pars_fragment:Ku,alphatest_fragment:Zu,alphatest_pars_fragment:Qu,aomap_fragment:Ju,aomap_pars_fragment:td,batching_pars_vertex:ed,batching_vertex:nd,begin_vertex:id,beginnormal_vertex:sd,bsdfs:rd,iridescence_fragment:od,bumpmap_pars_fragment:ad,clipping_planes_fragment:ld,clipping_planes_pars_fragment:cd,clipping_planes_pars_vertex:hd,clipping_planes_vertex:ud,color_fragment:dd,color_pars_fragment:fd,color_pars_vertex:pd,color_vertex:md,common:gd,cube_uv_reflection_fragment:_d,defaultnormal_vertex:vd,displacementmap_pars_vertex:xd,displacementmap_vertex:Md,emissivemap_fragment:yd,emissivemap_pars_fragment:Sd,colorspace_fragment:bd,colorspace_pars_fragment:Ed,envmap_fragment:wd,envmap_common_pars_fragment:Td,envmap_pars_fragment:Ad,envmap_pars_vertex:Rd,envmap_physical_pars_fragment:kd,envmap_vertex:Cd,fog_vertex:Pd,fog_pars_vertex:Ld,fog_fragment:Dd,fog_pars_fragment:Id,gradientmap_pars_fragment:Ud,lightmap_pars_fragment:Nd,lights_lambert_fragment:Fd,lights_lambert_pars_fragment:Od,lights_pars_begin:Bd,lights_toon_fragment:zd,lights_toon_pars_fragment:Hd,lights_phong_fragment:Gd,lights_phong_pars_fragment:Vd,lights_physical_fragment:Wd,lights_physical_pars_fragment:Xd,lights_fragment_begin:qd,lights_fragment_maps:$d,lights_fragment_end:Yd,logdepthbuf_fragment:jd,logdepthbuf_pars_fragment:Kd,logdepthbuf_pars_vertex:Zd,logdepthbuf_vertex:Qd,map_fragment:Jd,map_pars_fragment:tf,map_particle_fragment:ef,map_particle_pars_fragment:nf,metalnessmap_fragment:sf,metalnessmap_pars_fragment:rf,morphinstance_vertex:of,morphcolor_vertex:af,morphnormal_vertex:lf,morphtarget_pars_vertex:cf,morphtarget_vertex:hf,normal_fragment_begin:uf,normal_fragment_maps:df,normal_pars_fragment:ff,normal_pars_vertex:pf,normal_vertex:mf,normalmap_pars_fragment:gf,clearcoat_normal_fragment_begin:_f,clearcoat_normal_fragment_maps:vf,clearcoat_pars_fragment:xf,iridescence_pars_fragment:Mf,opaque_fragment:yf,packing:Sf,premultiplied_alpha_fragment:bf,project_vertex:Ef,dithering_fragment:wf,dithering_pars_fragment:Tf,roughnessmap_fragment:Af,roughnessmap_pars_fragment:Rf,shadowmap_pars_fragment:Cf,shadowmap_pars_vertex:Pf,shadowmap_vertex:Lf,shadowmask_pars_fragment:Df,skinbase_vertex:If,skinning_pars_vertex:Uf,skinning_vertex:Nf,skinnormal_vertex:Ff,specularmap_fragment:Of,specularmap_pars_fragment:Bf,tonemapping_fragment:kf,tonemapping_pars_fragment:zf,transmission_fragment:Hf,transmission_pars_fragment:Gf,uv_pars_fragment:Vf,uv_pars_vertex:Wf,uv_vertex:Xf,worldpos_vertex:qf,background_vert:$f,background_frag:Yf,backgroundCube_vert:jf,backgroundCube_frag:Kf,cube_vert:Zf,cube_frag:Qf,depth_vert:Jf,depth_frag:tp,distanceRGBA_vert:ep,distanceRGBA_frag:np,equirect_vert:ip,equirect_frag:sp,linedashed_vert:rp,linedashed_frag:op,meshbasic_vert:ap,meshbasic_frag:lp,meshlambert_vert:cp,meshlambert_frag:hp,meshmatcap_vert:up,meshmatcap_frag:dp,meshnormal_vert:fp,meshnormal_frag:pp,meshphong_vert:mp,meshphong_frag:gp,meshphysical_vert:_p,meshphysical_frag:vp,meshtoon_vert:xp,meshtoon_frag:Mp,points_vert:yp,points_frag:Sp,shadow_vert:bp,shadow_frag:Ep,sprite_vert:wp,sprite_frag:Tp},ot={common:{diffuse:{value:new St(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new _t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new St(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new St(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new St(16777215)},opacity:{value:1},center:{value:new _t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},cn={basic:{uniforms:Ie([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:Ie([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new St(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:Ie([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new St(0)},specular:{value:new St(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:Ie([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new St(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:Ie([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new St(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:Ie([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:Ie([ot.points,ot.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:Ie([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:Ie([ot.common,ot.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:Ie([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:Ie([ot.sprite,ot.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:Ot.backgroundCube_vert,fragmentShader:Ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:Ie([ot.common,ot.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:Ie([ot.lights,ot.fog,{color:{value:new St(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};cn.physical={uniforms:Ie([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new _t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new St(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new _t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new St(0)},specularColor:{value:new St(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new _t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};const Gs={r:0,b:0,g:0},Jn=new fn,Ap=new ie;function Rp(i,t,e,n,s,r,o){const a=new St(0);let l=r===!0?0:1,c,h,u=null,d=0,p=null;function g(y){let b=y.isScene===!0?y.background:null;return b&&b.isTexture&&(b=(y.backgroundBlurriness>0?e:t).get(b)),b}function _(y){let b=!1;const M=g(y);M===null?f(a,l):M&&M.isColor&&(f(M,1),b=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,b){const M=g(b);M&&(M.isCubeTexture||M.mapping===gr)?(h===void 0&&(h=new at(new Ne(1,1,1),new we({name:"BackgroundCubeMaterial",uniforms:Xi(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:Ue,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Jn.copy(b.backgroundRotation),Jn.x*=-1,Jn.y*=-1,Jn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Jn.y*=-1,Jn.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ap.makeRotationFromEuler(Jn)),h.material.toneMapped=Vt.getTransfer(M.colorSpace)!==Zt,(u!==M||d!==M.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=M,d=M.version,p=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new at(new Xe(2,2),new we({name:"BackgroundMaterial",uniforms:Xi(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=Vt.getTransfer(M.colorSpace)!==Zt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||d!==M.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,u=M,d=M.version,p=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function f(y,b){y.getRGB(Gs,Oc(i)),n.buffers.color.setClear(Gs.r,Gs.g,Gs.b,b,o)}return{getClearColor:function(){return a},setClearColor:function(y,b=1){a.set(y),l=b,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,f(a,l)},render:_,addToRenderList:m}}function Cp(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(v,C,N,I,W){let $=!1;const z=u(I,N,C);r!==z&&(r=z,c(r.object)),$=p(v,I,N,W),$&&g(v,I,N,W),W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,M(v,C,N,I),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function l(){return i.createVertexArray()}function c(v){return i.bindVertexArray(v)}function h(v){return i.deleteVertexArray(v)}function u(v,C,N){const I=N.wireframe===!0;let W=n[v.id];W===void 0&&(W={},n[v.id]=W);let $=W[C.id];$===void 0&&($={},W[C.id]=$);let z=$[I];return z===void 0&&(z=d(l()),$[I]=z),z}function d(v){const C=[],N=[],I=[];for(let W=0;W<e;W++)C[W]=0,N[W]=0,I[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:N,attributeDivisors:I,object:v,attributes:{},index:null}}function p(v,C,N,I){const W=r.attributes,$=C.attributes;let z=0;const Y=N.getAttributes();for(const D in Y)if(Y[D].location>=0){const tt=W[D];let st=$[D];if(st===void 0&&(D==="instanceMatrix"&&v.instanceMatrix&&(st=v.instanceMatrix),D==="instanceColor"&&v.instanceColor&&(st=v.instanceColor)),tt===void 0||tt.attribute!==st||st&&tt.data!==st.data)return!0;z++}return r.attributesNum!==z||r.index!==I}function g(v,C,N,I){const W={},$=C.attributes;let z=0;const Y=N.getAttributes();for(const D in Y)if(Y[D].location>=0){let tt=$[D];tt===void 0&&(D==="instanceMatrix"&&v.instanceMatrix&&(tt=v.instanceMatrix),D==="instanceColor"&&v.instanceColor&&(tt=v.instanceColor));const st={};st.attribute=tt,tt&&tt.data&&(st.data=tt.data),W[D]=st,z++}r.attributes=W,r.attributesNum=z,r.index=I}function _(){const v=r.newAttributes;for(let C=0,N=v.length;C<N;C++)v[C]=0}function m(v){f(v,0)}function f(v,C){const N=r.newAttributes,I=r.enabledAttributes,W=r.attributeDivisors;N[v]=1,I[v]===0&&(i.enableVertexAttribArray(v),I[v]=1),W[v]!==C&&(i.vertexAttribDivisor(v,C),W[v]=C)}function y(){const v=r.newAttributes,C=r.enabledAttributes;for(let N=0,I=C.length;N<I;N++)C[N]!==v[N]&&(i.disableVertexAttribArray(N),C[N]=0)}function b(v,C,N,I,W,$,z){z===!0?i.vertexAttribIPointer(v,C,N,W,$):i.vertexAttribPointer(v,C,N,I,W,$)}function M(v,C,N,I){_();const W=I.attributes,$=N.getAttributes(),z=C.defaultAttributeValues;for(const Y in $){const D=$[Y];if(D.location>=0){let X=W[Y];if(X===void 0&&(Y==="instanceMatrix"&&v.instanceMatrix&&(X=v.instanceMatrix),Y==="instanceColor"&&v.instanceColor&&(X=v.instanceColor)),X!==void 0){const tt=X.normalized,st=X.itemSize,vt=t.get(X);if(vt===void 0)continue;const Bt=vt.buffer,j=vt.type,et=vt.bytesPerElement,ft=j===i.INT||j===i.UNSIGNED_INT||X.gpuType===oa;if(X.isInterleavedBufferAttribute){const rt=X.data,wt=rt.stride,Rt=X.offset;if(rt.isInstancedInterleavedBuffer){for(let Nt=0;Nt<D.locationSize;Nt++)f(D.location+Nt,rt.meshPerAttribute);v.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Nt=0;Nt<D.locationSize;Nt++)m(D.location+Nt);i.bindBuffer(i.ARRAY_BUFFER,Bt);for(let Nt=0;Nt<D.locationSize;Nt++)b(D.location+Nt,st/D.locationSize,j,tt,wt*et,(Rt+st/D.locationSize*Nt)*et,ft)}else{if(X.isInstancedBufferAttribute){for(let rt=0;rt<D.locationSize;rt++)f(D.location+rt,X.meshPerAttribute);v.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let rt=0;rt<D.locationSize;rt++)m(D.location+rt);i.bindBuffer(i.ARRAY_BUFFER,Bt);for(let rt=0;rt<D.locationSize;rt++)b(D.location+rt,st/D.locationSize,j,tt,st*et,st/D.locationSize*rt*et,ft)}}else if(z!==void 0){const tt=z[Y];if(tt!==void 0)switch(tt.length){case 2:i.vertexAttrib2fv(D.location,tt);break;case 3:i.vertexAttrib3fv(D.location,tt);break;case 4:i.vertexAttrib4fv(D.location,tt);break;default:i.vertexAttrib1fv(D.location,tt)}}}}y()}function P(){w();for(const v in n){const C=n[v];for(const N in C){const I=C[N];for(const W in I)h(I[W].object),delete I[W];delete C[N]}delete n[v]}}function T(v){if(n[v.id]===void 0)return;const C=n[v.id];for(const N in C){const I=C[N];for(const W in I)h(I[W].object),delete I[W];delete C[N]}delete n[v.id]}function A(v){for(const C in n){const N=n[C];if(N[v.id]===void 0)continue;const I=N[v.id];for(const W in I)h(I[W].object),delete I[W];delete N[v.id]}}function w(){x(),o=!0,r!==s&&(r=s,c(r.object))}function x(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:w,resetDefaultState:x,dispose:P,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function Pp(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function l(c,h,u,d){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Lp(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==on&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const w=A===dn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Ln&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Tn&&!w)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:M,vertexTextures:P,maxSamples:T}}function Dp(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new ni,a=new Ut,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||n!==0||s;return s=d,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const y=r?0:n,b=y*4;let M=f.clippingState||null;l.value=M,M=h(g,d,b,p);for(let P=0;P!==b;++P)M[P]=e[P];f.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=p+_*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<f)&&(m=new Float32Array(f));for(let b=0,M=p;b!==_;++b,M+=4)o.copy(u[b]).applyMatrix4(y,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Ip(i){let t=new WeakMap;function e(o,a){return a===Mo?o.mapping=Hi:a===yo&&(o.mapping=Gi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Mo||a===yo)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Vu(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class pa extends Bc{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ni=4,cl=[.125,.215,.35,.446,.526,.582],ri=20,Zr=new pa,hl=new St;let Qr=null,Jr=0,to=0,eo=!1;const ii=(1+Math.sqrt(5))/2,Ci=1/ii,ul=[new L(-ii,Ci,0),new L(ii,Ci,0),new L(-Ci,0,ii),new L(Ci,0,ii),new L(0,ii,-Ci),new L(0,ii,Ci),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class Ko{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Qr=this._renderer.getRenderTarget(),Jr=this._renderer.getActiveCubeFace(),to=this._renderer.getActiveMipmapLevel(),eo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Qr,Jr,to),this._renderer.xr.enabled=eo,t.scissorTest=!1,Vs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Hi||t.mapping===Gi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Qr=this._renderer.getRenderTarget(),Jr=this._renderer.getActiveCubeFace(),to=this._renderer.getActiveMipmapLevel(),eo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:un,minFilter:un,generateMipmaps:!1,type:dn,format:on,colorSpace:$i,depthBuffer:!1},s=dl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Up(r)),this._blurMaterial=Np(r,t,e)}return s}_compileMaterial(t){const e=new at(this._lodPlanes[0],t);this._renderer.compile(e,Zr)}_sceneToCubeUV(t,e,n,s){const a=new We(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(hl),h.toneMapping=Vn,h.autoClear=!1;const p=new Be({name:"PMREM.Background",side:Ue,depthWrite:!1,depthTest:!1}),g=new at(new Ne,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(hl),_=!0);for(let f=0;f<6;f++){const y=f%3;y===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):y===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const b=this._cubeSize;Vs(s,y*b,f>2?b:0,b,b),h.setRenderTarget(s),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Hi||t.mapping===Gi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=pl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new at(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Vs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Zr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=ul[(s-r-1)%ul.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new at(this._lodPlanes[s],c),d=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ri-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):ri;m>ri&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ri}`);const f=[];let y=0;for(let A=0;A<ri;++A){const w=A/_,x=Math.exp(-w*w/2);f.push(x),A===0?y+=x:A<m&&(y+=2*x)}for(let A=0;A<f.length;A++)f[A]=f[A]/y;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:b}=this;d.dTheta.value=g,d.mipInt.value=b-n;const M=this._sizeLods[s],P=3*M*(s>b-Ni?s-b+Ni:0),T=4*(this._cubeSize-M);Vs(e,P,T,3*M,2*M),l.setRenderTarget(e),l.render(u,Zr)}}function Up(i){const t=[],e=[],n=[];let s=i;const r=i-Ni+1+cl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-Ni?l=cl[o-i+Ni-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,y=new Float32Array(_*g*p),b=new Float32Array(m*g*p),M=new Float32Array(f*g*p);for(let T=0;T<p;T++){const A=T%3*2/3-1,w=T>2?0:-1,x=[A,w,0,A+2/3,w,0,A+2/3,w+1,0,A,w,0,A+2/3,w+1,0,A,w+1,0];y.set(x,_*g*T),b.set(d,m*g*T);const v=[T,T,T,T,T,T];M.set(v,f*g*T)}const P=new Me;P.setAttribute("position",new ze(y,_)),P.setAttribute("uv",new ze(b,m)),P.setAttribute("faceIndex",new ze(M,f)),t.push(P),s>Ni&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function dl(i,t,e){const n=new Ze(i,t,e);return n.texture.mapping=gr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Vs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Np(i,t,e){const n=new Float32Array(ri),s=new L(0,1,0);return new we({name:"SphericalGaussianBlur",defines:{n:ri,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ma(),fragmentShader:`

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
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function fl(){return new we({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ma(),fragmentShader:`

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
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function pl(){return new we({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ma(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function ma(){return`

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
	`}function Fp(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Mo||l===yo,h=l===Hi||l===Gi;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Ko(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return c&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new Ko(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Op(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&hs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Bp(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)t.remove(_[m])}d.removeEventListener("dispose",o),delete s[d.id];const p=r.get(d);p&&(t.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)t.update(_[m],i.ARRAY_BUFFER)}}function c(u){const d=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const y=p.array;_=p.version;for(let b=0,M=y.length;b<M;b+=3){const P=y[b+0],T=y[b+1],A=y[b+2];d.push(P,T,T,A,A,P)}}else if(g!==void 0){const y=g.array;_=g.version;for(let b=0,M=y.length/3-1;b<M;b+=3){const P=b+0,T=b+1,A=b+2;d.push(P,T,T,A,A,P)}}else return;const m=new(Cc(d)?Fc:Nc)(d,1);m.version=_;const f=r.get(u);f&&t.remove(f),r.set(u,m)}function h(u){const d=r.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function kp(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,p){i.drawElements(n,p,r,d*o),e.update(p,n,1)}function c(d,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,d*o,g),e.update(p,n,g))}function h(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,n,1)}function u(d,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/o,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,_,0,g);let f=0;for(let y=0;y<g;y++)f+=p[y]*_[y];e.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function zp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Hp(i,t,e){const n=new WeakMap,s=new Jt;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let v=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",v)};var p=v;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let M=0;g===!0&&(M=1),_===!0&&(M=2),m===!0&&(M=3);let P=a.attributes.position.count*M,T=1;P>t.maxTextureSize&&(T=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const A=new Float32Array(P*T*4*u),w=new Lc(A,P,T,u);w.type=Tn,w.needsUpdate=!0;const x=M*4;for(let C=0;C<u;C++){const N=f[C],I=y[C],W=b[C],$=P*T*4*C;for(let z=0;z<N.count;z++){const Y=z*x;g===!0&&(s.fromBufferAttribute(N,z),A[$+Y+0]=s.x,A[$+Y+1]=s.y,A[$+Y+2]=s.z,A[$+Y+3]=0),_===!0&&(s.fromBufferAttribute(I,z),A[$+Y+4]=s.x,A[$+Y+5]=s.y,A[$+Y+6]=s.z,A[$+Y+7]=0),m===!0&&(s.fromBufferAttribute(W,z),A[$+Y+8]=s.x,A[$+Y+9]=s.y,A[$+Y+10]=s.z,A[$+Y+11]=W.itemSize===4?s.w:1)}}d={count:u,texture:w,size:new _t(P,T)},n.set(a,d),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Gp(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Hc extends Te{constructor(t,e,n,s,r,o,a,l,c,h=Oi){if(h!==Oi&&h!==Wi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Oi&&(n=ci),n===void 0&&h===Wi&&(n=Vi),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:an,this.minFilter=l!==void 0?l:an,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Gc=new Te,ml=new Hc(1,1),Vc=new Lc,Wc=new Ru,Xc=new kc,gl=[],_l=[],vl=new Float32Array(16),xl=new Float32Array(9),Ml=new Float32Array(4);function ji(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=gl[s];if(r===void 0&&(r=new Float32Array(s),gl[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function ve(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function xe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function xr(i,t){let e=_l[t];e===void 0&&(e=new Int32Array(t),_l[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Vp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Wp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2fv(this.addr,t),xe(e,t)}}function Xp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ve(e,t))return;i.uniform3fv(this.addr,t),xe(e,t)}}function qp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4fv(this.addr,t),xe(e,t)}}function $p(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;Ml.set(n),i.uniformMatrix2fv(this.addr,!1,Ml),xe(e,n)}}function Yp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;xl.set(n),i.uniformMatrix3fv(this.addr,!1,xl),xe(e,n)}}function jp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ve(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),xe(e,t)}else{if(ve(e,n))return;vl.set(n),i.uniformMatrix4fv(this.addr,!1,vl),xe(e,n)}}function Kp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Zp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2iv(this.addr,t),xe(e,t)}}function Qp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;i.uniform3iv(this.addr,t),xe(e,t)}}function Jp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4iv(this.addr,t),xe(e,t)}}function tm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function em(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;i.uniform2uiv(this.addr,t),xe(e,t)}}function nm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;i.uniform3uiv(this.addr,t),xe(e,t)}}function im(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;i.uniform4uiv(this.addr,t),xe(e,t)}}function sm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ml.compareFunction=Rc,r=ml):r=Gc,e.setTexture2D(t||r,s)}function rm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Wc,s)}function om(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Xc,s)}function am(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Vc,s)}function lm(i){switch(i){case 5126:return Vp;case 35664:return Wp;case 35665:return Xp;case 35666:return qp;case 35674:return $p;case 35675:return Yp;case 35676:return jp;case 5124:case 35670:return Kp;case 35667:case 35671:return Zp;case 35668:case 35672:return Qp;case 35669:case 35673:return Jp;case 5125:return tm;case 36294:return em;case 36295:return nm;case 36296:return im;case 35678:case 36198:case 36298:case 36306:case 35682:return sm;case 35679:case 36299:case 36307:return rm;case 35680:case 36300:case 36308:case 36293:return om;case 36289:case 36303:case 36311:case 36292:return am}}function cm(i,t){i.uniform1fv(this.addr,t)}function hm(i,t){const e=ji(t,this.size,2);i.uniform2fv(this.addr,e)}function um(i,t){const e=ji(t,this.size,3);i.uniform3fv(this.addr,e)}function dm(i,t){const e=ji(t,this.size,4);i.uniform4fv(this.addr,e)}function fm(i,t){const e=ji(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function pm(i,t){const e=ji(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function mm(i,t){const e=ji(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function gm(i,t){i.uniform1iv(this.addr,t)}function _m(i,t){i.uniform2iv(this.addr,t)}function vm(i,t){i.uniform3iv(this.addr,t)}function xm(i,t){i.uniform4iv(this.addr,t)}function Mm(i,t){i.uniform1uiv(this.addr,t)}function ym(i,t){i.uniform2uiv(this.addr,t)}function Sm(i,t){i.uniform3uiv(this.addr,t)}function bm(i,t){i.uniform4uiv(this.addr,t)}function Em(i,t,e){const n=this.cache,s=t.length,r=xr(e,s);ve(n,r)||(i.uniform1iv(this.addr,r),xe(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Gc,r[o])}function wm(i,t,e){const n=this.cache,s=t.length,r=xr(e,s);ve(n,r)||(i.uniform1iv(this.addr,r),xe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Wc,r[o])}function Tm(i,t,e){const n=this.cache,s=t.length,r=xr(e,s);ve(n,r)||(i.uniform1iv(this.addr,r),xe(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Xc,r[o])}function Am(i,t,e){const n=this.cache,s=t.length,r=xr(e,s);ve(n,r)||(i.uniform1iv(this.addr,r),xe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Vc,r[o])}function Rm(i){switch(i){case 5126:return cm;case 35664:return hm;case 35665:return um;case 35666:return dm;case 35674:return fm;case 35675:return pm;case 35676:return mm;case 5124:case 35670:return gm;case 35667:case 35671:return _m;case 35668:case 35672:return vm;case 35669:case 35673:return xm;case 5125:return Mm;case 36294:return ym;case 36295:return Sm;case 36296:return bm;case 35678:case 36198:case 36298:case 36306:case 35682:return Em;case 35679:case 36299:case 36307:return wm;case 35680:case 36300:case 36308:case 36293:return Tm;case 36289:case 36303:case 36311:case 36292:return Am}}class Cm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=lm(e.type)}}class Pm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Rm(e.type)}}class Lm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const no=/(\w+)(\])?(\[|\.)?/g;function yl(i,t){i.seq.push(t),i.map[t.id]=t}function Dm(i,t,e){const n=i.name,s=n.length;for(no.lastIndex=0;;){const r=no.exec(n),o=no.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){yl(e,c===void 0?new Cm(a,i,t):new Pm(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Lm(a),yl(e,u)),e=u}}}class ar{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Dm(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Sl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Im=37297;let Um=0;function Nm(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const bl=new Ut;function Fm(i){Vt._getMatrix(bl,Vt.workingColorSpace,i);const t=`mat3( ${bl.elements.map(e=>e.toFixed(4))} )`;switch(Vt.getTransfer(i)){case _r:return[t,"LinearTransferOETF"];case Zt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function El(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Nm(i.getShaderSource(t),o)}else return s}function Om(i,t){const e=Fm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Bm(i,t){let e;switch(t){case uc:e="Linear";break;case dc:e="Reinhard";break;case fc:e="Cineon";break;case ra:e="ACESFilmic";break;case pc:e="AgX";break;case mc:e="Neutral";break;case qh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ws=new L;function km(){Vt.getLuminanceCoefficients(Ws);const i=Ws.x.toFixed(4),t=Ws.y.toFixed(4),e=Ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function zm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(us).join(`
`)}function Hm(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Gm(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function us(i){return i!==""}function wl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Tl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Vm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zo(i){return i.replace(Vm,Xm)}const Wm=new Map;function Xm(i,t){let e=Ot[t];if(e===void 0){const n=Wm.get(t);if(n!==void 0)e=Ot[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Zo(e)}const qm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Al(i){return i.replace(qm,$m)}function $m(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Rl(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Ym(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===lc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===cc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===bn&&(t="SHADOWMAP_TYPE_VSM"),t}function jm(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Hi:case Gi:t="ENVMAP_TYPE_CUBE";break;case gr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Km(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Gi:t="ENVMAP_MODE_REFRACTION";break}return t}function Zm(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case hc:t="ENVMAP_BLENDING_MULTIPLY";break;case Wh:t="ENVMAP_BLENDING_MIX";break;case Xh:t="ENVMAP_BLENDING_ADD";break}return t}function Qm(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Jm(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Ym(e),c=jm(e),h=Km(e),u=Zm(e),d=Qm(e),p=zm(e),g=Hm(r),_=s.createProgram();let m,f,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(us).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(us).join(`
`),f.length>0&&(f+=`
`)):(m=[Rl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(us).join(`
`),f=[Rl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Vn?"#define TONE_MAPPING":"",e.toneMapping!==Vn?Ot.tonemapping_pars_fragment:"",e.toneMapping!==Vn?Bm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.colorspace_pars_fragment,Om("linearToOutputTexel",e.outputColorSpace),km(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(us).join(`
`)),o=Zo(o),o=wl(o,e),o=Tl(o,e),a=Zo(a),a=wl(a,e),a=Tl(a,e),o=Al(o),a=Al(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Ha?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ha?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const b=y+m+o,M=y+f+a,P=Sl(s,s.VERTEX_SHADER,b),T=Sl(s,s.FRAGMENT_SHADER,M);s.attachShader(_,P),s.attachShader(_,T),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(C){if(i.debug.checkShaderErrors){const N=s.getProgramInfoLog(_).trim(),I=s.getShaderInfoLog(P).trim(),W=s.getShaderInfoLog(T).trim();let $=!0,z=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,P,T);else{const Y=El(s,P,"vertex"),D=El(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+N+`
`+Y+`
`+D)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(I===""||W==="")&&(z=!1);z&&(C.diagnostics={runnable:$,programLog:N,vertexShader:{log:I,prefix:m},fragmentShader:{log:W,prefix:f}})}s.deleteShader(P),s.deleteShader(T),w=new ar(s,_),x=Gm(s,_)}let w;this.getUniforms=function(){return w===void 0&&A(this),w};let x;this.getAttributes=function(){return x===void 0&&A(this),x};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(_,Im)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Um++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=T,this}let t0=0;class e0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new n0(t),e.set(t,n)),n}}class n0{constructor(t){this.id=t0++,this.code=t,this.usedTimes=0}}function i0(i,t,e,n,s,r,o){const a=new Ic,l=new e0,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return c.add(x),x===0?"uv":`uv${x}`}function m(x,v,C,N,I){const W=N.fog,$=I.geometry,z=x.isMeshStandardMaterial?N.environment:null,Y=(x.isMeshStandardMaterial?e:t).get(x.envMap||z),D=Y&&Y.mapping===gr?Y.image.height:null,X=g[x.type];x.precision!==null&&(p=s.getMaxPrecision(x.precision),p!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",p,"instead."));const tt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,st=tt!==void 0?tt.length:0;let vt=0;$.morphAttributes.position!==void 0&&(vt=1),$.morphAttributes.normal!==void 0&&(vt=2),$.morphAttributes.color!==void 0&&(vt=3);let Bt,j,et,ft;if(X){const Kt=cn[X];Bt=Kt.vertexShader,j=Kt.fragmentShader}else Bt=x.vertexShader,j=x.fragmentShader,l.update(x),et=l.getVertexShaderID(x),ft=l.getFragmentShaderID(x);const rt=i.getRenderTarget(),wt=i.state.buffers.depth.getReversed(),Rt=I.isInstancedMesh===!0,Nt=I.isBatchedMesh===!0,te=!!x.map,kt=!!x.matcap,ue=!!Y,B=!!x.aoMap,qe=!!x.lightMap,zt=!!x.bumpMap,Ht=!!x.normalMap,At=!!x.displacementMap,se=!!x.emissiveMap,Tt=!!x.metalnessMap,R=!!x.roughnessMap,S=x.anisotropy>0,k=x.clearcoat>0,Z=x.dispersion>0,J=x.iridescence>0,K=x.sheen>0,bt=x.transmission>0,ct=S&&!!x.anisotropyMap,pt=k&&!!x.clearcoatMap,Wt=k&&!!x.clearcoatNormalMap,nt=k&&!!x.clearcoatRoughnessMap,mt=J&&!!x.iridescenceMap,Ct=J&&!!x.iridescenceThicknessMap,Pt=K&&!!x.sheenColorMap,gt=K&&!!x.sheenRoughnessMap,Gt=!!x.specularMap,Ft=!!x.specularColorMap,ee=!!x.specularIntensityMap,U=bt&&!!x.transmissionMap,lt=bt&&!!x.thicknessMap,q=!!x.gradientMap,Q=!!x.alphaMap,dt=x.alphaTest>0,ht=!!x.alphaHash,Dt=!!x.extensions;let le=Vn;x.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(le=i.toneMapping);const Ae={shaderID:X,shaderType:x.type,shaderName:x.name,vertexShader:Bt,fragmentShader:j,defines:x.defines,customVertexShaderID:et,customFragmentShaderID:ft,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:p,batching:Nt,batchingColor:Nt&&I._colorsTexture!==null,instancing:Rt,instancingColor:Rt&&I.instanceColor!==null,instancingMorph:Rt&&I.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:rt===null?i.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:$i,alphaToCoverage:!!x.alphaToCoverage,map:te,matcap:kt,envMap:ue,envMapMode:ue&&Y.mapping,envMapCubeUVHeight:D,aoMap:B,lightMap:qe,bumpMap:zt,normalMap:Ht,displacementMap:d&&At,emissiveMap:se,normalMapObjectSpace:Ht&&x.normalMapType===Kh,normalMapTangentSpace:Ht&&x.normalMapType===Ac,metalnessMap:Tt,roughnessMap:R,anisotropy:S,anisotropyMap:ct,clearcoat:k,clearcoatMap:pt,clearcoatNormalMap:Wt,clearcoatRoughnessMap:nt,dispersion:Z,iridescence:J,iridescenceMap:mt,iridescenceThicknessMap:Ct,sheen:K,sheenColorMap:Pt,sheenRoughnessMap:gt,specularMap:Gt,specularColorMap:Ft,specularIntensityMap:ee,transmission:bt,transmissionMap:U,thicknessMap:lt,gradientMap:q,opaque:x.transparent===!1&&x.blending===Fi&&x.alphaToCoverage===!1,alphaMap:Q,alphaTest:dt,alphaHash:ht,combine:x.combine,mapUv:te&&_(x.map.channel),aoMapUv:B&&_(x.aoMap.channel),lightMapUv:qe&&_(x.lightMap.channel),bumpMapUv:zt&&_(x.bumpMap.channel),normalMapUv:Ht&&_(x.normalMap.channel),displacementMapUv:At&&_(x.displacementMap.channel),emissiveMapUv:se&&_(x.emissiveMap.channel),metalnessMapUv:Tt&&_(x.metalnessMap.channel),roughnessMapUv:R&&_(x.roughnessMap.channel),anisotropyMapUv:ct&&_(x.anisotropyMap.channel),clearcoatMapUv:pt&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:Wt&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:nt&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:mt&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:Ct&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:Pt&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:gt&&_(x.sheenRoughnessMap.channel),specularMapUv:Gt&&_(x.specularMap.channel),specularColorMapUv:Ft&&_(x.specularColorMap.channel),specularIntensityMapUv:ee&&_(x.specularIntensityMap.channel),transmissionMapUv:U&&_(x.transmissionMap.channel),thicknessMapUv:lt&&_(x.thicknessMap.channel),alphaMapUv:Q&&_(x.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(Ht||S),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!$.attributes.uv&&(te||Q),fog:!!W,useFog:x.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:wt,skinning:I.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:st,morphTextureStride:vt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:le,decodeVideoTexture:te&&x.map.isVideoTexture===!0&&Vt.getTransfer(x.map.colorSpace)===Zt,decodeVideoTextureEmissive:se&&x.emissiveMap.isVideoTexture===!0&&Vt.getTransfer(x.emissiveMap.colorSpace)===Zt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===je,flipSided:x.side===Ue,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Dt&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Dt&&x.extensions.multiDraw===!0||Nt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ae.vertexUv1s=c.has(1),Ae.vertexUv2s=c.has(2),Ae.vertexUv3s=c.has(3),c.clear(),Ae}function f(x){const v=[];if(x.shaderID?v.push(x.shaderID):(v.push(x.customVertexShaderID),v.push(x.customFragmentShaderID)),x.defines!==void 0)for(const C in x.defines)v.push(C),v.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(y(v,x),b(v,x),v.push(i.outputColorSpace)),v.push(x.customProgramCacheKey),v.join()}function y(x,v){x.push(v.precision),x.push(v.outputColorSpace),x.push(v.envMapMode),x.push(v.envMapCubeUVHeight),x.push(v.mapUv),x.push(v.alphaMapUv),x.push(v.lightMapUv),x.push(v.aoMapUv),x.push(v.bumpMapUv),x.push(v.normalMapUv),x.push(v.displacementMapUv),x.push(v.emissiveMapUv),x.push(v.metalnessMapUv),x.push(v.roughnessMapUv),x.push(v.anisotropyMapUv),x.push(v.clearcoatMapUv),x.push(v.clearcoatNormalMapUv),x.push(v.clearcoatRoughnessMapUv),x.push(v.iridescenceMapUv),x.push(v.iridescenceThicknessMapUv),x.push(v.sheenColorMapUv),x.push(v.sheenRoughnessMapUv),x.push(v.specularMapUv),x.push(v.specularColorMapUv),x.push(v.specularIntensityMapUv),x.push(v.transmissionMapUv),x.push(v.thicknessMapUv),x.push(v.combine),x.push(v.fogExp2),x.push(v.sizeAttenuation),x.push(v.morphTargetsCount),x.push(v.morphAttributeCount),x.push(v.numDirLights),x.push(v.numPointLights),x.push(v.numSpotLights),x.push(v.numSpotLightMaps),x.push(v.numHemiLights),x.push(v.numRectAreaLights),x.push(v.numDirLightShadows),x.push(v.numPointLightShadows),x.push(v.numSpotLightShadows),x.push(v.numSpotLightShadowsWithMaps),x.push(v.numLightProbes),x.push(v.shadowMapType),x.push(v.toneMapping),x.push(v.numClippingPlanes),x.push(v.numClipIntersection),x.push(v.depthPacking)}function b(x,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),x.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),x.push(a.mask)}function M(x){const v=g[x.type];let C;if(v){const N=cn[v];C=xs.clone(N.uniforms)}else C=x.uniforms;return C}function P(x,v){let C;for(let N=0,I=h.length;N<I;N++){const W=h[N];if(W.cacheKey===v){C=W,++C.usedTimes;break}}return C===void 0&&(C=new Jm(i,v,x,r),h.push(C)),C}function T(x){if(--x.usedTimes===0){const v=h.indexOf(x);h[v]=h[h.length-1],h.pop(),x.destroy()}}function A(x){l.remove(x)}function w(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:M,acquireProgram:P,releaseProgram:T,releaseShaderCache:A,programs:h,dispose:w}}function s0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function r0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Cl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Pl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,p,g,_,m){let f=i[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),t++,f}function a(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):e.push(f)}function l(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):e.unshift(f)}function c(u,d){e.length>1&&e.sort(u||r0),n.length>1&&n.sort(d||Cl),s.length>1&&s.sort(d||Cl)}function h(){for(let u=t,d=i.length;u<d;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function o0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Pl,i.set(n,[o])):s>=r.length?(o=new Pl,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function a0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new St};break;case"SpotLight":e={position:new L,direction:new L,color:new St,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new St,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new St,groundColor:new St};break;case"RectAreaLight":e={color:new St,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function l0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let c0=0;function h0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function u0(i){const t=new a0,e=l0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const s=new L,r=new ie,o=new ie;function a(c){let h=0,u=0,d=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,y=0,b=0,M=0,P=0,T=0,A=0;c.sort(h0);for(let x=0,v=c.length;x<v;x++){const C=c[x],N=C.color,I=C.intensity,W=C.distance,$=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=N.r*I,u+=N.g*I,d+=N.b*I;else if(C.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(C.sh.coefficients[z],I);A++}else if(C.isDirectionalLight){const z=t.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Y=C.shadow,D=e.get(C);D.shadowIntensity=Y.intensity,D.shadowBias=Y.bias,D.shadowNormalBias=Y.normalBias,D.shadowRadius=Y.radius,D.shadowMapSize=Y.mapSize,n.directionalShadow[p]=D,n.directionalShadowMap[p]=$,n.directionalShadowMatrix[p]=C.shadow.matrix,y++}n.directional[p]=z,p++}else if(C.isSpotLight){const z=t.get(C);z.position.setFromMatrixPosition(C.matrixWorld),z.color.copy(N).multiplyScalar(I),z.distance=W,z.coneCos=Math.cos(C.angle),z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),z.decay=C.decay,n.spot[_]=z;const Y=C.shadow;if(C.map&&(n.spotLightMap[P]=C.map,P++,Y.updateMatrices(C),C.castShadow&&T++),n.spotLightMatrix[_]=Y.matrix,C.castShadow){const D=e.get(C);D.shadowIntensity=Y.intensity,D.shadowBias=Y.bias,D.shadowNormalBias=Y.normalBias,D.shadowRadius=Y.radius,D.shadowMapSize=Y.mapSize,n.spotShadow[_]=D,n.spotShadowMap[_]=$,M++}_++}else if(C.isRectAreaLight){const z=t.get(C);z.color.copy(N).multiplyScalar(I),z.halfWidth.set(C.width*.5,0,0),z.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=z,m++}else if(C.isPointLight){const z=t.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),z.distance=C.distance,z.decay=C.decay,C.castShadow){const Y=C.shadow,D=e.get(C);D.shadowIntensity=Y.intensity,D.shadowBias=Y.bias,D.shadowNormalBias=Y.normalBias,D.shadowRadius=Y.radius,D.shadowMapSize=Y.mapSize,D.shadowCameraNear=Y.camera.near,D.shadowCameraFar=Y.camera.far,n.pointShadow[g]=D,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=C.shadow.matrix,b++}n.point[g]=z,g++}else if(C.isHemisphereLight){const z=t.get(C);z.skyColor.copy(C.color).multiplyScalar(I),z.groundColor.copy(C.groundColor).multiplyScalar(I),n.hemi[f]=z,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ot.LTC_FLOAT_1,n.rectAreaLTC2=ot.LTC_FLOAT_2):(n.rectAreaLTC1=ot.LTC_HALF_1,n.rectAreaLTC2=ot.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const w=n.hash;(w.directionalLength!==p||w.pointLength!==g||w.spotLength!==_||w.rectAreaLength!==m||w.hemiLength!==f||w.numDirectionalShadows!==y||w.numPointShadows!==b||w.numSpotShadows!==M||w.numSpotMaps!==P||w.numLightProbes!==A)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=M+P-T,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,w.directionalLength=p,w.pointLength=g,w.spotLength=_,w.rectAreaLength=m,w.hemiLength=f,w.numDirectionalShadows=y,w.numPointShadows=b,w.numSpotShadows=M,w.numSpotMaps=P,w.numLightProbes=A,n.version=c0++)}function l(c,h){let u=0,d=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let f=0,y=c.length;f<y;f++){const b=c[f];if(b.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(b.isSpotLight){const M=n.spot[p];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(b.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(b.width*.5,0,0),M.halfHeight.set(0,b.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){const M=n.hemi[_];M.direction.setFromMatrixPosition(b.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function Ll(i){const t=new u0(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function d0(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Ll(i),t.set(s,[a])):r>=o.length?(a=new Ll(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class f0 extends di{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Yh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class p0 extends di{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const m0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,g0=`uniform sampler2D shadow_pass;
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
}`;function _0(i,t,e){let n=new fa;const s=new _t,r=new _t,o=new Jt,a=new f0({depthPacking:jh}),l=new p0,c={},h=e.maxTextureSize,u={[Xn]:Ue,[Ue]:Xn,[je]:je},d=new we({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _t},radius:{value:4}},vertexShader:m0,fragmentShader:g0}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new Me;g.setAttribute("position",new ze(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new at(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lc;let f=this.type;this.render=function(T,A,w){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const x=i.getRenderTarget(),v=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Rn),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const I=f!==bn&&this.type===bn,W=f===bn&&this.type!==bn;for(let $=0,z=T.length;$<z;$++){const Y=T[$],D=Y.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;s.copy(D.mapSize);const X=D.getFrameExtents();if(s.multiply(X),r.copy(D.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/X.x),s.x=r.x*X.x,D.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/X.y),s.y=r.y*X.y,D.mapSize.y=r.y)),D.map===null||I===!0||W===!0){const st=this.type!==bn?{minFilter:an,magFilter:an}:{};D.map!==null&&D.map.dispose(),D.map=new Ze(s.x,s.y,st),D.map.texture.name=Y.name+".shadowMap",D.camera.updateProjectionMatrix()}i.setRenderTarget(D.map),i.clear();const tt=D.getViewportCount();for(let st=0;st<tt;st++){const vt=D.getViewport(st);o.set(r.x*vt.x,r.y*vt.y,r.x*vt.z,r.y*vt.w),N.viewport(o),D.updateMatrices(Y,st),n=D.getFrustum(),M(A,w,D.camera,Y,this.type)}D.isPointLightShadow!==!0&&this.type===bn&&y(D,w),D.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(x,v,C)};function y(T,A){const w=t.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ze(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,w,d,_,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,w,p,_,null)}function b(T,A,w,x){let v=null;const C=w.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(C!==void 0)v=C;else if(v=w.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const N=v.uuid,I=A.uuid;let W=c[N];W===void 0&&(W={},c[N]=W);let $=W[I];$===void 0&&($=v.clone(),W[I]=$,A.addEventListener("dispose",P)),v=$}if(v.visible=A.visible,v.wireframe=A.wireframe,x===bn?v.side=A.shadowSide!==null?A.shadowSide:A.side:v.side=A.shadowSide!==null?A.shadowSide:u[A.side],v.alphaMap=A.alphaMap,v.alphaTest=A.alphaTest,v.map=A.map,v.clipShadows=A.clipShadows,v.clippingPlanes=A.clippingPlanes,v.clipIntersection=A.clipIntersection,v.displacementMap=A.displacementMap,v.displacementScale=A.displacementScale,v.displacementBias=A.displacementBias,v.wireframeLinewidth=A.wireframeLinewidth,v.linewidth=A.linewidth,w.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const N=i.properties.get(v);N.light=w}return v}function M(T,A,w,x,v){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&v===bn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,T.matrixWorld);const I=t.update(T),W=T.material;if(Array.isArray(W)){const $=I.groups;for(let z=0,Y=$.length;z<Y;z++){const D=$[z],X=W[D.materialIndex];if(X&&X.visible){const tt=b(T,X,x,v);T.onBeforeShadow(i,T,A,w,I,tt,D),i.renderBufferDirect(w,null,I,tt,T,D),T.onAfterShadow(i,T,A,w,I,tt,D)}}}else if(W.visible){const $=b(T,W,x,v);T.onBeforeShadow(i,T,A,w,I,$,null),i.renderBufferDirect(w,null,I,$,T,null),T.onAfterShadow(i,T,A,w,I,$,null)}}const N=T.children;for(let I=0,W=N.length;I<W;I++)M(N[I],A,w,x,v)}function P(T){T.target.removeEventListener("dispose",P);for(const w in c){const x=c[w],v=T.target.uuid;v in x&&(x[v].dispose(),delete x[v])}}}const v0={[fo]:po,[mo]:vo,[go]:xo,[zi]:_o,[po]:fo,[vo]:mo,[xo]:go,[_o]:zi};function x0(i,t){function e(){let U=!1;const lt=new Jt;let q=null;const Q=new Jt(0,0,0,0);return{setMask:function(dt){q!==dt&&!U&&(i.colorMask(dt,dt,dt,dt),q=dt)},setLocked:function(dt){U=dt},setClear:function(dt,ht,Dt,le,Ae){Ae===!0&&(dt*=le,ht*=le,Dt*=le),lt.set(dt,ht,Dt,le),Q.equals(lt)===!1&&(i.clearColor(dt,ht,Dt,le),Q.copy(lt))},reset:function(){U=!1,q=null,Q.set(-1,0,0,0)}}}function n(){let U=!1,lt=!1,q=null,Q=null,dt=null;return{setReversed:function(ht){if(lt!==ht){const Dt=t.get("EXT_clip_control");lt?Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.ZERO_TO_ONE_EXT):Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.NEGATIVE_ONE_TO_ONE_EXT);const le=dt;dt=null,this.setClear(le)}lt=ht},getReversed:function(){return lt},setTest:function(ht){ht?rt(i.DEPTH_TEST):wt(i.DEPTH_TEST)},setMask:function(ht){q!==ht&&!U&&(i.depthMask(ht),q=ht)},setFunc:function(ht){if(lt&&(ht=v0[ht]),Q!==ht){switch(ht){case fo:i.depthFunc(i.NEVER);break;case po:i.depthFunc(i.ALWAYS);break;case mo:i.depthFunc(i.LESS);break;case zi:i.depthFunc(i.LEQUAL);break;case go:i.depthFunc(i.EQUAL);break;case _o:i.depthFunc(i.GEQUAL);break;case vo:i.depthFunc(i.GREATER);break;case xo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Q=ht}},setLocked:function(ht){U=ht},setClear:function(ht){dt!==ht&&(lt&&(ht=1-ht),i.clearDepth(ht),dt=ht)},reset:function(){U=!1,q=null,Q=null,dt=null,lt=!1}}}function s(){let U=!1,lt=null,q=null,Q=null,dt=null,ht=null,Dt=null,le=null,Ae=null;return{setTest:function(Kt){U||(Kt?rt(i.STENCIL_TEST):wt(i.STENCIL_TEST))},setMask:function(Kt){lt!==Kt&&!U&&(i.stencilMask(Kt),lt=Kt)},setFunc:function(Kt,Qe,pn){(q!==Kt||Q!==Qe||dt!==pn)&&(i.stencilFunc(Kt,Qe,pn),q=Kt,Q=Qe,dt=pn)},setOp:function(Kt,Qe,pn){(ht!==Kt||Dt!==Qe||le!==pn)&&(i.stencilOp(Kt,Qe,pn),ht=Kt,Dt=Qe,le=pn)},setLocked:function(Kt){U=Kt},setClear:function(Kt){Ae!==Kt&&(i.clearStencil(Kt),Ae=Kt)},reset:function(){U=!1,lt=null,q=null,Q=null,dt=null,ht=null,Dt=null,le=null,Ae=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,y=null,b=null,M=null,P=null,T=null,A=new St(0,0,0),w=0,x=!1,v=null,C=null,N=null,I=null,W=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Y=0;const D=i.getParameter(i.VERSION);D.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(D)[1]),z=Y>=1):D.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),z=Y>=2);let X=null,tt={};const st=i.getParameter(i.SCISSOR_BOX),vt=i.getParameter(i.VIEWPORT),Bt=new Jt().fromArray(st),j=new Jt().fromArray(vt);function et(U,lt,q,Q){const dt=new Uint8Array(4),ht=i.createTexture();i.bindTexture(U,ht),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Dt=0;Dt<q;Dt++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(lt,0,i.RGBA,1,1,Q,0,i.RGBA,i.UNSIGNED_BYTE,dt):i.texImage2D(lt+Dt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,dt);return ht}const ft={};ft[i.TEXTURE_2D]=et(i.TEXTURE_2D,i.TEXTURE_2D,1),ft[i.TEXTURE_CUBE_MAP]=et(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ft[i.TEXTURE_2D_ARRAY]=et(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ft[i.TEXTURE_3D]=et(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),rt(i.DEPTH_TEST),o.setFunc(zi),zt(!1),Ht(Oa),rt(i.CULL_FACE),B(Rn);function rt(U){h[U]!==!0&&(i.enable(U),h[U]=!0)}function wt(U){h[U]!==!1&&(i.disable(U),h[U]=!1)}function Rt(U,lt){return u[U]!==lt?(i.bindFramebuffer(U,lt),u[U]=lt,U===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=lt),U===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=lt),!0):!1}function Nt(U,lt){let q=p,Q=!1;if(U){q=d.get(lt),q===void 0&&(q=[],d.set(lt,q));const dt=U.textures;if(q.length!==dt.length||q[0]!==i.COLOR_ATTACHMENT0){for(let ht=0,Dt=dt.length;ht<Dt;ht++)q[ht]=i.COLOR_ATTACHMENT0+ht;q.length=dt.length,Q=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,Q=!0);Q&&i.drawBuffers(q)}function te(U){return g!==U?(i.useProgram(U),g=U,!0):!1}const kt={[si]:i.FUNC_ADD,[Ah]:i.FUNC_SUBTRACT,[Rh]:i.FUNC_REVERSE_SUBTRACT};kt[Ch]=i.MIN,kt[Ph]=i.MAX;const ue={[Lh]:i.ZERO,[Dh]:i.ONE,[Ih]:i.SRC_COLOR,[ho]:i.SRC_ALPHA,[kh]:i.SRC_ALPHA_SATURATE,[Oh]:i.DST_COLOR,[Nh]:i.DST_ALPHA,[Uh]:i.ONE_MINUS_SRC_COLOR,[uo]:i.ONE_MINUS_SRC_ALPHA,[Bh]:i.ONE_MINUS_DST_COLOR,[Fh]:i.ONE_MINUS_DST_ALPHA,[zh]:i.CONSTANT_COLOR,[Hh]:i.ONE_MINUS_CONSTANT_COLOR,[Gh]:i.CONSTANT_ALPHA,[Vh]:i.ONE_MINUS_CONSTANT_ALPHA};function B(U,lt,q,Q,dt,ht,Dt,le,Ae,Kt){if(U===Rn){_===!0&&(wt(i.BLEND),_=!1);return}if(_===!1&&(rt(i.BLEND),_=!0),U!==Th){if(U!==m||Kt!==x){if((f!==si||M!==si)&&(i.blendEquation(i.FUNC_ADD),f=si,M=si),Kt)switch(U){case Fi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case hn:i.blendFunc(i.ONE,i.ONE);break;case Ba:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ka:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Fi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case hn:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ba:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ka:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}y=null,b=null,P=null,T=null,A.set(0,0,0),w=0,m=U,x=Kt}return}dt=dt||lt,ht=ht||q,Dt=Dt||Q,(lt!==f||dt!==M)&&(i.blendEquationSeparate(kt[lt],kt[dt]),f=lt,M=dt),(q!==y||Q!==b||ht!==P||Dt!==T)&&(i.blendFuncSeparate(ue[q],ue[Q],ue[ht],ue[Dt]),y=q,b=Q,P=ht,T=Dt),(le.equals(A)===!1||Ae!==w)&&(i.blendColor(le.r,le.g,le.b,Ae),A.copy(le),w=Ae),m=U,x=!1}function qe(U,lt){U.side===je?wt(i.CULL_FACE):rt(i.CULL_FACE);let q=U.side===Ue;lt&&(q=!q),zt(q),U.blending===Fi&&U.transparent===!1?B(Rn):B(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);const Q=U.stencilWrite;a.setTest(Q),Q&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),se(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?rt(i.SAMPLE_ALPHA_TO_COVERAGE):wt(i.SAMPLE_ALPHA_TO_COVERAGE)}function zt(U){v!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),v=U)}function Ht(U){U!==Eh?(rt(i.CULL_FACE),U!==C&&(U===Oa?i.cullFace(i.BACK):U===wh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):wt(i.CULL_FACE),C=U}function At(U){U!==N&&(z&&i.lineWidth(U),N=U)}function se(U,lt,q){U?(rt(i.POLYGON_OFFSET_FILL),(I!==lt||W!==q)&&(i.polygonOffset(lt,q),I=lt,W=q)):wt(i.POLYGON_OFFSET_FILL)}function Tt(U){U?rt(i.SCISSOR_TEST):wt(i.SCISSOR_TEST)}function R(U){U===void 0&&(U=i.TEXTURE0+$-1),X!==U&&(i.activeTexture(U),X=U)}function S(U,lt,q){q===void 0&&(X===null?q=i.TEXTURE0+$-1:q=X);let Q=tt[q];Q===void 0&&(Q={type:void 0,texture:void 0},tt[q]=Q),(Q.type!==U||Q.texture!==lt)&&(X!==q&&(i.activeTexture(q),X=q),i.bindTexture(U,lt||ft[U]),Q.type=U,Q.texture=lt)}function k(){const U=tt[X];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Z(){try{i.compressedTexImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function J(){try{i.compressedTexImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function bt(){try{i.texSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ct(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Wt(){try{i.texStorage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function nt(){try{i.texStorage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function mt(){try{i.texImage2D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ct(){try{i.texImage3D.apply(i,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Pt(U){Bt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),Bt.copy(U))}function gt(U){j.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),j.copy(U))}function Gt(U,lt){let q=c.get(lt);q===void 0&&(q=new WeakMap,c.set(lt,q));let Q=q.get(U);Q===void 0&&(Q=i.getUniformBlockIndex(lt,U.name),q.set(U,Q))}function Ft(U,lt){const Q=c.get(lt).get(U);l.get(lt)!==Q&&(i.uniformBlockBinding(lt,Q,U.__bindingPointIndex),l.set(lt,Q))}function ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},X=null,tt={},u={},d=new WeakMap,p=[],g=null,_=!1,m=null,f=null,y=null,b=null,M=null,P=null,T=null,A=new St(0,0,0),w=0,x=!1,v=null,C=null,N=null,I=null,W=null,Bt.set(0,0,i.canvas.width,i.canvas.height),j.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:rt,disable:wt,bindFramebuffer:Rt,drawBuffers:Nt,useProgram:te,setBlending:B,setMaterial:qe,setFlipSided:zt,setCullFace:Ht,setLineWidth:At,setPolygonOffset:se,setScissorTest:Tt,activeTexture:R,bindTexture:S,unbindTexture:k,compressedTexImage2D:Z,compressedTexImage3D:J,texImage2D:mt,texImage3D:Ct,updateUBOMapping:Gt,uniformBlockBinding:Ft,texStorage2D:Wt,texStorage3D:nt,texSubImage2D:K,texSubImage3D:bt,compressedTexSubImage2D:ct,compressedTexSubImage3D:pt,scissor:Pt,viewport:gt,reset:ee}}function Dl(i,t,e,n){const s=M0(n);switch(e){case Mc:return i*t;case Sc:return i*t;case bc:return i*t*2;case Ec:return i*t/s.components*s.byteLength;case ca:return i*t/s.components*s.byteLength;case wc:return i*t*2/s.components*s.byteLength;case ha:return i*t*2/s.components*s.byteLength;case yc:return i*t*3/s.components*s.byteLength;case on:return i*t*4/s.components*s.byteLength;case ua:return i*t*4/s.components*s.byteLength;case nr:case ir:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case sr:case rr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Eo:case To:return Math.max(i,16)*Math.max(t,8)/4;case bo:case wo:return Math.max(i,8)*Math.max(t,8)/2;case Ao:case Ro:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Co:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Po:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Lo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Do:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Io:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Uo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case No:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Fo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Oo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Bo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ko:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case zo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ho:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Go:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Vo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case or:case Wo:case Xo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Tc:case qo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case $o:case Yo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function M0(i){switch(i){case Ln:case _c:return{byteLength:1,components:1};case _s:case vc:case dn:return{byteLength:2,components:1};case aa:case la:return{byteLength:2,components:4};case ci:case oa:case Tn:return{byteLength:4,components:1};case xc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function y0(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new _t,h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,S){return p?new OffscreenCanvas(R,S):dr("canvas")}function _(R,S,k){let Z=1;const J=Tt(R);if((J.width>k||J.height>k)&&(Z=k/Math.max(J.width,J.height)),Z<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const K=Math.floor(Z*J.width),bt=Math.floor(Z*J.height);u===void 0&&(u=g(K,bt));const ct=S?g(K,bt):u;return ct.width=K,ct.height=bt,ct.getContext("2d").drawImage(R,0,0,K,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+K+"x"+bt+")."),ct}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),R;return R}function m(R){return R.generateMipmaps}function f(R){i.generateMipmap(R)}function y(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(R,S,k,Z,J=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let K=S;if(S===i.RED&&(k===i.FLOAT&&(K=i.R32F),k===i.HALF_FLOAT&&(K=i.R16F),k===i.UNSIGNED_BYTE&&(K=i.R8)),S===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.R8UI),k===i.UNSIGNED_SHORT&&(K=i.R16UI),k===i.UNSIGNED_INT&&(K=i.R32UI),k===i.BYTE&&(K=i.R8I),k===i.SHORT&&(K=i.R16I),k===i.INT&&(K=i.R32I)),S===i.RG&&(k===i.FLOAT&&(K=i.RG32F),k===i.HALF_FLOAT&&(K=i.RG16F),k===i.UNSIGNED_BYTE&&(K=i.RG8)),S===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RG8UI),k===i.UNSIGNED_SHORT&&(K=i.RG16UI),k===i.UNSIGNED_INT&&(K=i.RG32UI),k===i.BYTE&&(K=i.RG8I),k===i.SHORT&&(K=i.RG16I),k===i.INT&&(K=i.RG32I)),S===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RGB8UI),k===i.UNSIGNED_SHORT&&(K=i.RGB16UI),k===i.UNSIGNED_INT&&(K=i.RGB32UI),k===i.BYTE&&(K=i.RGB8I),k===i.SHORT&&(K=i.RGB16I),k===i.INT&&(K=i.RGB32I)),S===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),k===i.UNSIGNED_INT&&(K=i.RGBA32UI),k===i.BYTE&&(K=i.RGBA8I),k===i.SHORT&&(K=i.RGBA16I),k===i.INT&&(K=i.RGBA32I)),S===i.RGB&&k===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),S===i.RGBA){const bt=J?_r:Vt.getTransfer(Z);k===i.FLOAT&&(K=i.RGBA32F),k===i.HALF_FLOAT&&(K=i.RGBA16F),k===i.UNSIGNED_BYTE&&(K=bt===Zt?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function M(R,S){let k;return R?S===null||S===ci||S===Vi?k=i.DEPTH24_STENCIL8:S===Tn?k=i.DEPTH32F_STENCIL8:S===_s&&(k=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ci||S===Vi?k=i.DEPTH_COMPONENT24:S===Tn?k=i.DEPTH_COMPONENT32F:S===_s&&(k=i.DEPTH_COMPONENT16),k}function P(R,S){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==an&&R.minFilter!==un?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function T(R){const S=R.target;S.removeEventListener("dispose",T),w(S),S.isVideoTexture&&h.delete(S)}function A(R){const S=R.target;S.removeEventListener("dispose",A),v(S)}function w(R){const S=n.get(R);if(S.__webglInit===void 0)return;const k=R.source,Z=d.get(k);if(Z){const J=Z[S.__cacheKey];J.usedTimes--,J.usedTimes===0&&x(R),Object.keys(Z).length===0&&d.delete(k)}n.remove(R)}function x(R){const S=n.get(R);i.deleteTexture(S.__webglTexture);const k=R.source,Z=d.get(k);delete Z[S.__cacheKey],o.memory.textures--}function v(R){const S=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(S.__webglFramebuffer[Z]))for(let J=0;J<S.__webglFramebuffer[Z].length;J++)i.deleteFramebuffer(S.__webglFramebuffer[Z][J]);else i.deleteFramebuffer(S.__webglFramebuffer[Z]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[Z])}else{if(Array.isArray(S.__webglFramebuffer))for(let Z=0;Z<S.__webglFramebuffer.length;Z++)i.deleteFramebuffer(S.__webglFramebuffer[Z]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Z=0;Z<S.__webglColorRenderbuffer.length;Z++)S.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[Z]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const k=R.textures;for(let Z=0,J=k.length;Z<J;Z++){const K=n.get(k[Z]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(k[Z])}n.remove(R)}let C=0;function N(){C=0}function I(){const R=C;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),C+=1,R}function W(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function $(R,S){const k=n.get(R);if(R.isVideoTexture&&At(R),R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){const Z=R.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(k,R,S);return}}e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+S)}function z(R,S){const k=n.get(R);if(R.version>0&&k.__version!==R.version){j(k,R,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+S)}function Y(R,S){const k=n.get(R);if(R.version>0&&k.__version!==R.version){j(k,R,S);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+S)}function D(R,S){const k=n.get(R);if(R.version>0&&k.__version!==R.version){et(k,R,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+S)}const X={[hr]:i.REPEAT,[oi]:i.CLAMP_TO_EDGE,[So]:i.MIRRORED_REPEAT},tt={[an]:i.NEAREST,[$h]:i.NEAREST_MIPMAP_NEAREST,[Es]:i.NEAREST_MIPMAP_LINEAR,[un]:i.LINEAR,[Pr]:i.LINEAR_MIPMAP_NEAREST,[ai]:i.LINEAR_MIPMAP_LINEAR},st={[Zh]:i.NEVER,[iu]:i.ALWAYS,[Qh]:i.LESS,[Rc]:i.LEQUAL,[Jh]:i.EQUAL,[nu]:i.GEQUAL,[tu]:i.GREATER,[eu]:i.NOTEQUAL};function vt(R,S){if(S.type===Tn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===un||S.magFilter===Pr||S.magFilter===Es||S.magFilter===ai||S.minFilter===un||S.minFilter===Pr||S.minFilter===Es||S.minFilter===ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,X[S.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,X[S.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,X[S.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,tt[S.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,tt[S.minFilter]),S.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,st[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===an||S.minFilter!==Es&&S.minFilter!==ai||S.type===Tn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Bt(R,S){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",T));const Z=S.source;let J=d.get(Z);J===void 0&&(J={},d.set(Z,J));const K=W(S);if(K!==R.__cacheKey){J[K]===void 0&&(J[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),J[K].usedTimes++;const bt=J[R.__cacheKey];bt!==void 0&&(J[R.__cacheKey].usedTimes--,bt.usedTimes===0&&x(S)),R.__cacheKey=K,R.__webglTexture=J[K].texture}return k}function j(R,S,k){let Z=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Z=i.TEXTURE_3D);const J=Bt(R,S),K=S.source;e.bindTexture(Z,R.__webglTexture,i.TEXTURE0+k);const bt=n.get(K);if(K.version!==bt.__version||J===!0){e.activeTexture(i.TEXTURE0+k);const ct=Vt.getPrimaries(Vt.workingColorSpace),pt=S.colorSpace===wn?null:Vt.getPrimaries(S.colorSpace),Wt=S.colorSpace===wn||ct===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt);let nt=_(S.image,!1,s.maxTextureSize);nt=se(S,nt);const mt=r.convert(S.format,S.colorSpace),Ct=r.convert(S.type);let Pt=b(S.internalFormat,mt,Ct,S.colorSpace,S.isVideoTexture);vt(Z,S);let gt;const Gt=S.mipmaps,Ft=S.isVideoTexture!==!0,ee=bt.__version===void 0||J===!0,U=K.dataReady,lt=P(S,nt);if(S.isDepthTexture)Pt=M(S.format===Wi,S.type),ee&&(Ft?e.texStorage2D(i.TEXTURE_2D,1,Pt,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,Pt,nt.width,nt.height,0,mt,Ct,null));else if(S.isDataTexture)if(Gt.length>0){Ft&&ee&&e.texStorage2D(i.TEXTURE_2D,lt,Pt,Gt[0].width,Gt[0].height);for(let q=0,Q=Gt.length;q<Q;q++)gt=Gt[q],Ft?U&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,gt.width,gt.height,mt,Ct,gt.data):e.texImage2D(i.TEXTURE_2D,q,Pt,gt.width,gt.height,0,mt,Ct,gt.data);S.generateMipmaps=!1}else Ft?(ee&&e.texStorage2D(i.TEXTURE_2D,lt,Pt,nt.width,nt.height),U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,nt.width,nt.height,mt,Ct,nt.data)):e.texImage2D(i.TEXTURE_2D,0,Pt,nt.width,nt.height,0,mt,Ct,nt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ft&&ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,Pt,Gt[0].width,Gt[0].height,nt.depth);for(let q=0,Q=Gt.length;q<Q;q++)if(gt=Gt[q],S.format!==on)if(mt!==null)if(Ft){if(U)if(S.layerUpdates.size>0){const dt=Dl(gt.width,gt.height,S.format,S.type);for(const ht of S.layerUpdates){const Dt=gt.data.subarray(ht*dt/gt.data.BYTES_PER_ELEMENT,(ht+1)*dt/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,ht,gt.width,gt.height,1,mt,Dt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,gt.width,gt.height,nt.depth,mt,gt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Pt,gt.width,gt.height,nt.depth,0,gt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?U&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,gt.width,gt.height,nt.depth,mt,Ct,gt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,Pt,gt.width,gt.height,nt.depth,0,mt,Ct,gt.data)}else{Ft&&ee&&e.texStorage2D(i.TEXTURE_2D,lt,Pt,Gt[0].width,Gt[0].height);for(let q=0,Q=Gt.length;q<Q;q++)gt=Gt[q],S.format!==on?mt!==null?Ft?U&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,gt.width,gt.height,mt,gt.data):e.compressedTexImage2D(i.TEXTURE_2D,q,Pt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?U&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,gt.width,gt.height,mt,Ct,gt.data):e.texImage2D(i.TEXTURE_2D,q,Pt,gt.width,gt.height,0,mt,Ct,gt.data)}else if(S.isDataArrayTexture)if(Ft){if(ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,lt,Pt,nt.width,nt.height,nt.depth),U)if(S.layerUpdates.size>0){const q=Dl(nt.width,nt.height,S.format,S.type);for(const Q of S.layerUpdates){const dt=nt.data.subarray(Q*q/nt.data.BYTES_PER_ELEMENT,(Q+1)*q/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Q,nt.width,nt.height,1,mt,Ct,dt)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,mt,Ct,nt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Pt,nt.width,nt.height,nt.depth,0,mt,Ct,nt.data);else if(S.isData3DTexture)Ft?(ee&&e.texStorage3D(i.TEXTURE_3D,lt,Pt,nt.width,nt.height,nt.depth),U&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,mt,Ct,nt.data)):e.texImage3D(i.TEXTURE_3D,0,Pt,nt.width,nt.height,nt.depth,0,mt,Ct,nt.data);else if(S.isFramebufferTexture){if(ee)if(Ft)e.texStorage2D(i.TEXTURE_2D,lt,Pt,nt.width,nt.height);else{let q=nt.width,Q=nt.height;for(let dt=0;dt<lt;dt++)e.texImage2D(i.TEXTURE_2D,dt,Pt,q,Q,0,mt,Ct,null),q>>=1,Q>>=1}}else if(Gt.length>0){if(Ft&&ee){const q=Tt(Gt[0]);e.texStorage2D(i.TEXTURE_2D,lt,Pt,q.width,q.height)}for(let q=0,Q=Gt.length;q<Q;q++)gt=Gt[q],Ft?U&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,mt,Ct,gt):e.texImage2D(i.TEXTURE_2D,q,Pt,mt,Ct,gt);S.generateMipmaps=!1}else if(Ft){if(ee){const q=Tt(nt);e.texStorage2D(i.TEXTURE_2D,lt,Pt,q.width,q.height)}U&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,mt,Ct,nt)}else e.texImage2D(i.TEXTURE_2D,0,Pt,mt,Ct,nt);m(S)&&f(Z),bt.__version=K.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function et(R,S,k){if(S.image.length!==6)return;const Z=Bt(R,S),J=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+k);const K=n.get(J);if(J.version!==K.__version||Z===!0){e.activeTexture(i.TEXTURE0+k);const bt=Vt.getPrimaries(Vt.workingColorSpace),ct=S.colorSpace===wn?null:Vt.getPrimaries(S.colorSpace),pt=S.colorSpace===wn||bt===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const Wt=S.isCompressedTexture||S.image[0].isCompressedTexture,nt=S.image[0]&&S.image[0].isDataTexture,mt=[];for(let Q=0;Q<6;Q++)!Wt&&!nt?mt[Q]=_(S.image[Q],!0,s.maxCubemapSize):mt[Q]=nt?S.image[Q].image:S.image[Q],mt[Q]=se(S,mt[Q]);const Ct=mt[0],Pt=r.convert(S.format,S.colorSpace),gt=r.convert(S.type),Gt=b(S.internalFormat,Pt,gt,S.colorSpace),Ft=S.isVideoTexture!==!0,ee=K.__version===void 0||Z===!0,U=J.dataReady;let lt=P(S,Ct);vt(i.TEXTURE_CUBE_MAP,S);let q;if(Wt){Ft&&ee&&e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,Gt,Ct.width,Ct.height);for(let Q=0;Q<6;Q++){q=mt[Q].mipmaps;for(let dt=0;dt<q.length;dt++){const ht=q[dt];S.format!==on?Pt!==null?Ft?U&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt,0,0,ht.width,ht.height,Pt,ht.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt,Gt,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt,0,0,ht.width,ht.height,Pt,gt,ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt,Gt,ht.width,ht.height,0,Pt,gt,ht.data)}}}else{if(q=S.mipmaps,Ft&&ee){q.length>0&&lt++;const Q=Tt(mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,Gt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(nt){Ft?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,mt[Q].width,mt[Q].height,Pt,gt,mt[Q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Gt,mt[Q].width,mt[Q].height,0,Pt,gt,mt[Q].data);for(let dt=0;dt<q.length;dt++){const Dt=q[dt].image[Q].image;Ft?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt+1,0,0,Dt.width,Dt.height,Pt,gt,Dt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt+1,Gt,Dt.width,Dt.height,0,Pt,gt,Dt.data)}}else{Ft?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Pt,gt,mt[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Gt,Pt,gt,mt[Q]);for(let dt=0;dt<q.length;dt++){const ht=q[dt];Ft?U&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt+1,0,0,Pt,gt,ht.image[Q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,dt+1,Gt,Pt,gt,ht.image[Q])}}}m(S)&&f(i.TEXTURE_CUBE_MAP),K.__version=J.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function ft(R,S,k,Z,J,K){const bt=r.convert(k.format,k.colorSpace),ct=r.convert(k.type),pt=b(k.internalFormat,bt,ct,k.colorSpace),Wt=n.get(S),nt=n.get(k);if(nt.__renderTarget=S,!Wt.__hasExternalTextures){const mt=Math.max(1,S.width>>K),Ct=Math.max(1,S.height>>K);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?e.texImage3D(J,K,pt,mt,Ct,S.depth,0,bt,ct,null):e.texImage2D(J,K,pt,mt,Ct,0,bt,ct,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),Ht(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,J,nt.__webglTexture,0,zt(S)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,J,nt.__webglTexture,K),e.bindFramebuffer(i.FRAMEBUFFER,null)}function rt(R,S,k){if(i.bindRenderbuffer(i.RENDERBUFFER,R),S.depthBuffer){const Z=S.depthTexture,J=Z&&Z.isDepthTexture?Z.type:null,K=M(S.stencilBuffer,J),bt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=zt(S);Ht(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,K,S.width,S.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,K,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,K,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,bt,i.RENDERBUFFER,R)}else{const Z=S.textures;for(let J=0;J<Z.length;J++){const K=Z[J],bt=r.convert(K.format,K.colorSpace),ct=r.convert(K.type),pt=b(K.internalFormat,bt,ct,K.colorSpace),Wt=zt(S);k&&Ht(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Wt,pt,S.width,S.height):Ht(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Wt,pt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,pt,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function wt(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(S.depthTexture);Z.__renderTarget=S,(!Z.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),$(S.depthTexture,0);const J=Z.__webglTexture,K=zt(S);if(S.depthTexture.format===Oi)Ht(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(S.depthTexture.format===Wi)Ht(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Rt(R){const S=n.get(R),k=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const Z=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Z){const J=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Z.removeEventListener("dispose",J)};Z.addEventListener("dispose",J),S.__depthDisposeCallback=J}S.__boundDepthTexture=Z}if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");wt(S.__webglFramebuffer,R)}else if(k){S.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[Z]),S.__webglDepthbuffer[Z]===void 0)S.__webglDepthbuffer[Z]=i.createRenderbuffer(),rt(S.__webglDepthbuffer[Z],R,!1);else{const J=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=S.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,K)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),rt(S.__webglDepthbuffer,R,!1);else{const Z=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,J)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Nt(R,S,k){const Z=n.get(R);S!==void 0&&ft(Z.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Rt(R)}function te(R){const S=R.texture,k=n.get(R),Z=n.get(S);R.addEventListener("dispose",A);const J=R.textures,K=R.isWebGLCubeRenderTarget===!0,bt=J.length>1;if(bt||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=S.version,o.memory.textures++),K){k.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[ct]=[];for(let pt=0;pt<S.mipmaps.length;pt++)k.__webglFramebuffer[ct][pt]=i.createFramebuffer()}else k.__webglFramebuffer[ct]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let ct=0;ct<S.mipmaps.length;ct++)k.__webglFramebuffer[ct]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(bt)for(let ct=0,pt=J.length;ct<pt;ct++){const Wt=n.get(J[ct]);Wt.__webglTexture===void 0&&(Wt.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&Ht(R)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ct=0;ct<J.length;ct++){const pt=J[ct];k.__webglColorRenderbuffer[ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[ct]);const Wt=r.convert(pt.format,pt.colorSpace),nt=r.convert(pt.type),mt=b(pt.internalFormat,Wt,nt,pt.colorSpace,R.isXRRenderTarget===!0),Ct=zt(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ct,mt,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,k.__webglColorRenderbuffer[ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),rt(k.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),vt(i.TEXTURE_CUBE_MAP,S);for(let ct=0;ct<6;ct++)if(S.mipmaps&&S.mipmaps.length>0)for(let pt=0;pt<S.mipmaps.length;pt++)ft(k.__webglFramebuffer[ct][pt],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,pt);else ft(k.__webglFramebuffer[ct],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(S)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let ct=0,pt=J.length;ct<pt;ct++){const Wt=J[ct],nt=n.get(Wt);e.bindTexture(i.TEXTURE_2D,nt.__webglTexture),vt(i.TEXTURE_2D,Wt),ft(k.__webglFramebuffer,R,Wt,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,0),m(Wt)&&f(i.TEXTURE_2D)}e.unbindTexture()}else{let ct=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ct=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ct,Z.__webglTexture),vt(ct,S),S.mipmaps&&S.mipmaps.length>0)for(let pt=0;pt<S.mipmaps.length;pt++)ft(k.__webglFramebuffer[pt],R,S,i.COLOR_ATTACHMENT0,ct,pt);else ft(k.__webglFramebuffer,R,S,i.COLOR_ATTACHMENT0,ct,0);m(S)&&f(ct),e.unbindTexture()}R.depthBuffer&&Rt(R)}function kt(R){const S=R.textures;for(let k=0,Z=S.length;k<Z;k++){const J=S[k];if(m(J)){const K=y(R),bt=n.get(J).__webglTexture;e.bindTexture(K,bt),f(K),e.unbindTexture()}}}const ue=[],B=[];function qe(R){if(R.samples>0){if(Ht(R)===!1){const S=R.textures,k=R.width,Z=R.height;let J=i.COLOR_BUFFER_BIT;const K=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,bt=n.get(R),ct=S.length>1;if(ct)for(let pt=0;pt<S.length;pt++)e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let pt=0;pt<S.length;pt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),ct){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,bt.__webglColorRenderbuffer[pt]);const Wt=n.get(S[pt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Wt,0)}i.blitFramebuffer(0,0,k,Z,0,0,k,Z,J,i.NEAREST),l===!0&&(ue.length=0,B.length=0,ue.push(i.COLOR_ATTACHMENT0+pt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(ue.push(K),B.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,B)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ue))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ct)for(let pt=0;pt<S.length;pt++){e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,bt.__webglColorRenderbuffer[pt]);const Wt=n.get(S[pt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,Wt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const S=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function zt(R){return Math.min(s.maxSamples,R.samples)}function Ht(R){const S=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function At(R){const S=o.render.frame;h.get(R)!==S&&(h.set(R,S),R.update())}function se(R,S){const k=R.colorSpace,Z=R.format,J=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==$i&&k!==wn&&(Vt.getTransfer(k)===Zt?(Z!==on||J!==Ln)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),S}function Tt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=N,this.setTexture2D=$,this.setTexture2DArray=z,this.setTexture3D=Y,this.setTextureCube=D,this.rebindTextures=Nt,this.setupRenderTarget=te,this.updateRenderTargetMipmap=kt,this.updateMultisampleRenderTarget=qe,this.setupDepthRenderbuffer=Rt,this.setupFrameBufferTexture=ft,this.useMultisampledRTT=Ht}function S0(i,t){function e(n,s=wn){let r;const o=Vt.getTransfer(s);if(n===Ln)return i.UNSIGNED_BYTE;if(n===aa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===la)return i.UNSIGNED_SHORT_5_5_5_1;if(n===xc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===_c)return i.BYTE;if(n===vc)return i.SHORT;if(n===_s)return i.UNSIGNED_SHORT;if(n===oa)return i.INT;if(n===ci)return i.UNSIGNED_INT;if(n===Tn)return i.FLOAT;if(n===dn)return i.HALF_FLOAT;if(n===Mc)return i.ALPHA;if(n===yc)return i.RGB;if(n===on)return i.RGBA;if(n===Sc)return i.LUMINANCE;if(n===bc)return i.LUMINANCE_ALPHA;if(n===Oi)return i.DEPTH_COMPONENT;if(n===Wi)return i.DEPTH_STENCIL;if(n===Ec)return i.RED;if(n===ca)return i.RED_INTEGER;if(n===wc)return i.RG;if(n===ha)return i.RG_INTEGER;if(n===ua)return i.RGBA_INTEGER;if(n===nr||n===ir||n===sr||n===rr)if(o===Zt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===nr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===nr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ir)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===sr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===rr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===bo||n===Eo||n===wo||n===To)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===bo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Eo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===To)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ao||n===Ro||n===Co)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ao||n===Ro)return o===Zt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Co)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Po||n===Lo||n===Do||n===Io||n===Uo||n===No||n===Fo||n===Oo||n===Bo||n===ko||n===zo||n===Ho||n===Go||n===Vo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Po)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Lo)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Do)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Io)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Uo)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===No)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Fo)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Oo)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Bo)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ko)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===zo)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ho)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Go)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Vo)return o===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===or||n===Wo||n===Xo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===or)return o===Zt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Wo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Xo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Tc||n===qo||n===$o||n===Yo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===or)return r.COMPRESSED_RED_RGTC1_EXT;if(n===qo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===$o)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Yo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class b0 extends We{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class he extends ge{constructor(){super(),this.isGroup=!0,this.type="Group"}}const E0={type:"move"};class io{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new he,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new he,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new he,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(E0)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new he;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const w0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,T0=`
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

}`;class A0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Te,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new we({vertexShader:w0,fragmentShader:T0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new at(new Xe(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class R0 extends Yi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null;const _=new A0,m=e.getContextAttributes();let f=null,y=null;const b=[],M=[],P=new _t;let T=null;const A=new We;A.viewport=new Jt;const w=new We;w.viewport=new Jt;const x=[A,w],v=new b0;let C=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let et=b[j];return et===void 0&&(et=new io,b[j]=et),et.getTargetRaySpace()},this.getControllerGrip=function(j){let et=b[j];return et===void 0&&(et=new io,b[j]=et),et.getGripSpace()},this.getHand=function(j){let et=b[j];return et===void 0&&(et=new io,b[j]=et),et.getHandSpace()};function I(j){const et=M.indexOf(j.inputSource);if(et===-1)return;const ft=b[et];ft!==void 0&&(ft.update(j.inputSource,j.frame,c||o),ft.dispatchEvent({type:j.type,data:j.inputSource}))}function W(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",$);for(let j=0;j<b.length;j++){const et=M[j];et!==null&&(M[j]=null,b[j].disconnect(et))}C=null,N=null,_.reset(),t.setRenderTarget(f),p=null,d=null,u=null,s=null,y=null,Bt.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",W),s.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(P),s.renderState.layers===void 0){const et={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Ze(p.framebufferWidth,p.framebufferHeight,{format:on,type:Ln,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let et=null,ft=null,rt=null;m.depth&&(rt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=m.stencil?Wi:Oi,ft=m.stencil?Vi:ci);const wt={colorFormat:e.RGBA8,depthFormat:rt,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(wt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new Ze(d.textureWidth,d.textureHeight,{format:on,type:Ln,depthTexture:new Hc(d.textureWidth,d.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Bt.setContext(s),Bt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function $(j){for(let et=0;et<j.removed.length;et++){const ft=j.removed[et],rt=M.indexOf(ft);rt>=0&&(M[rt]=null,b[rt].disconnect(ft))}for(let et=0;et<j.added.length;et++){const ft=j.added[et];let rt=M.indexOf(ft);if(rt===-1){for(let Rt=0;Rt<b.length;Rt++)if(Rt>=M.length){M.push(ft),rt=Rt;break}else if(M[Rt]===null){M[Rt]=ft,rt=Rt;break}if(rt===-1)break}const wt=b[rt];wt&&wt.connect(ft)}}const z=new L,Y=new L;function D(j,et,ft){z.setFromMatrixPosition(et.matrixWorld),Y.setFromMatrixPosition(ft.matrixWorld);const rt=z.distanceTo(Y),wt=et.projectionMatrix.elements,Rt=ft.projectionMatrix.elements,Nt=wt[14]/(wt[10]-1),te=wt[14]/(wt[10]+1),kt=(wt[9]+1)/wt[5],ue=(wt[9]-1)/wt[5],B=(wt[8]-1)/wt[0],qe=(Rt[8]+1)/Rt[0],zt=Nt*B,Ht=Nt*qe,At=rt/(-B+qe),se=At*-B;if(et.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(se),j.translateZ(At),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),wt[10]===-1)j.projectionMatrix.copy(et.projectionMatrix),j.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const Tt=Nt+At,R=te+At,S=zt-se,k=Ht+(rt-se),Z=kt*te/R*Tt,J=ue*te/R*Tt;j.projectionMatrix.makePerspective(S,k,Z,J,Tt,R),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function X(j,et){et===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(et.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let et=j.near,ft=j.far;_.texture!==null&&(_.depthNear>0&&(et=_.depthNear),_.depthFar>0&&(ft=_.depthFar)),v.near=w.near=A.near=et,v.far=w.far=A.far=ft,(C!==v.near||N!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),C=v.near,N=v.far),A.layers.mask=j.layers.mask|2,w.layers.mask=j.layers.mask|4,v.layers.mask=A.layers.mask|w.layers.mask;const rt=j.parent,wt=v.cameras;X(v,rt);for(let Rt=0;Rt<wt.length;Rt++)X(wt[Rt],rt);wt.length===2?D(v,A,w):v.projectionMatrix.copy(A.projectionMatrix),tt(j,v,rt)};function tt(j,et,ft){ft===null?j.matrix.copy(et.matrixWorld):(j.matrix.copy(ft.matrixWorld),j.matrix.invert(),j.matrix.multiply(et.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(et.projectionMatrix),j.projectionMatrixInverse.copy(et.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=vs*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let st=null;function vt(j,et){if(h=et.getViewerPose(c||o),g=et,h!==null){const ft=h.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let rt=!1;ft.length!==v.cameras.length&&(v.cameras.length=0,rt=!0);for(let Rt=0;Rt<ft.length;Rt++){const Nt=ft[Rt];let te=null;if(p!==null)te=p.getViewport(Nt);else{const ue=u.getViewSubImage(d,Nt);te=ue.viewport,Rt===0&&(t.setRenderTargetTextures(y,ue.colorTexture,d.ignoreDepthValues?void 0:ue.depthStencilTexture),t.setRenderTarget(y))}let kt=x[Rt];kt===void 0&&(kt=new We,kt.layers.enable(Rt),kt.viewport=new Jt,x[Rt]=kt),kt.matrix.fromArray(Nt.transform.matrix),kt.matrix.decompose(kt.position,kt.quaternion,kt.scale),kt.projectionMatrix.fromArray(Nt.projectionMatrix),kt.projectionMatrixInverse.copy(kt.projectionMatrix).invert(),kt.viewport.set(te.x,te.y,te.width,te.height),Rt===0&&(v.matrix.copy(kt.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),rt===!0&&v.cameras.push(kt)}const wt=s.enabledFeatures;if(wt&&wt.includes("depth-sensing")){const Rt=u.getDepthInformation(ft[0]);Rt&&Rt.isValid&&Rt.texture&&_.init(t,Rt,s.renderState)}}for(let ft=0;ft<b.length;ft++){const rt=M[ft],wt=b[ft];rt!==null&&wt!==void 0&&wt.update(rt,et,c||o)}st&&st(j,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}const Bt=new zc;Bt.setAnimationLoop(vt),this.setAnimationLoop=function(j){st=j},this.dispose=function(){}}}const ti=new fn,C0=new ie;function P0(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Oc(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,y,b,M){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,M)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,y,b):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ue&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ue&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const y=t.get(f),b=y.envMap,M=y.envMapRotation;b&&(m.envMap.value=b,ti.copy(M),ti.x*=-1,ti.y*=-1,ti.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ti.y*=-1,ti.z*=-1),m.envMapRotation.value.setFromMatrix4(C0.makeRotationFromEuler(ti)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,y,b){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*y,m.scale.value=b*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,y){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ue&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const y=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function L0(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,b){const M=b.program;n.uniformBlockBinding(y,M)}function c(y,b){let M=s[y.id];M===void 0&&(g(y),M=h(y),s[y.id]=M,y.addEventListener("dispose",m));const P=b.program;n.updateUBOMapping(y,P);const T=t.render.frame;r[y.id]!==T&&(d(y),r[y.id]=T)}function h(y){const b=u();y.__bindingPointIndex=b;const M=i.createBuffer(),P=y.__size,T=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,P,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,M),M}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const b=s[y.id],M=y.uniforms,P=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let T=0,A=M.length;T<A;T++){const w=Array.isArray(M[T])?M[T]:[M[T]];for(let x=0,v=w.length;x<v;x++){const C=w[x];if(p(C,T,x,P)===!0){const N=C.__offset,I=Array.isArray(C.value)?C.value:[C.value];let W=0;for(let $=0;$<I.length;$++){const z=I[$],Y=_(z);typeof z=="number"||typeof z=="boolean"?(C.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,N+W,C.__data)):z.isMatrix3?(C.__data[0]=z.elements[0],C.__data[1]=z.elements[1],C.__data[2]=z.elements[2],C.__data[3]=0,C.__data[4]=z.elements[3],C.__data[5]=z.elements[4],C.__data[6]=z.elements[5],C.__data[7]=0,C.__data[8]=z.elements[6],C.__data[9]=z.elements[7],C.__data[10]=z.elements[8],C.__data[11]=0):(z.toArray(C.__data,W),W+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(y,b,M,P){const T=y.value,A=b+"_"+M;if(P[A]===void 0)return typeof T=="number"||typeof T=="boolean"?P[A]=T:P[A]=T.clone(),!0;{const w=P[A];if(typeof T=="number"||typeof T=="boolean"){if(w!==T)return P[A]=T,!0}else if(w.equals(T)===!1)return w.copy(T),!0}return!1}function g(y){const b=y.uniforms;let M=0;const P=16;for(let A=0,w=b.length;A<w;A++){const x=Array.isArray(b[A])?b[A]:[b[A]];for(let v=0,C=x.length;v<C;v++){const N=x[v],I=Array.isArray(N.value)?N.value:[N.value];for(let W=0,$=I.length;W<$;W++){const z=I[W],Y=_(z),D=M%P,X=D%Y.boundary,tt=D+X;M+=X,tt!==0&&P-tt<Y.storage&&(M+=P-tt),N.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=M,M+=Y.storage}}}const T=M%P;return T>0&&(M+=P-T),y.__size=M,y.__cache={},this}function _(y){const b={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(b.boundary=4,b.storage=4):y.isVector2?(b.boundary=8,b.storage=8):y.isVector3||y.isColor?(b.boundary=16,b.storage=12):y.isVector4?(b.boundary=16,b.storage=16):y.isMatrix3?(b.boundary=48,b.storage=48):y.isMatrix4?(b.boundary=64,b.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),b}function m(y){const b=y.target;b.removeEventListener("dispose",m);const M=o.indexOf(b.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function f(){for(const y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:l,update:c,dispose:f}}class D0{constructor(t={}){const{canvas:e=Mu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const y=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=fe,this.toneMapping=Vn,this.toneMappingExposure=1;const M=this;let P=!1,T=0,A=0,w=null,x=-1,v=null;const C=new Jt,N=new Jt;let I=null;const W=new St(0);let $=0,z=e.width,Y=e.height,D=1,X=null,tt=null;const st=new Jt(0,0,z,Y),vt=new Jt(0,0,z,Y);let Bt=!1;const j=new fa;let et=!1,ft=!1;const rt=new ie,wt=new ie,Rt=new L,Nt=new Jt,te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let kt=!1;function ue(){return w===null?D:1}let B=n;function qe(E,F){return e.getContext(E,F)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${sa}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",dt,!1),e.addEventListener("webglcontextcreationerror",ht,!1),B===null){const F="webgl2";if(B=qe(F,E),B===null)throw qe(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let zt,Ht,At,se,Tt,R,S,k,Z,J,K,bt,ct,pt,Wt,nt,mt,Ct,Pt,gt,Gt,Ft,ee,U;function lt(){zt=new Op(B),zt.init(),Ft=new S0(B,zt),Ht=new Lp(B,zt,t,Ft),At=new x0(B,zt),Ht.reverseDepthBuffer&&d&&At.buffers.depth.setReversed(!0),se=new zp(B),Tt=new s0,R=new y0(B,zt,At,Tt,Ht,Ft,se),S=new Ip(M),k=new Fp(M),Z=new qu(B),ee=new Cp(B,Z),J=new Bp(B,Z,se,ee),K=new Gp(B,J,Z,se),Pt=new Hp(B,Ht,R),nt=new Dp(Tt),bt=new i0(M,S,k,zt,Ht,ee,nt),ct=new P0(M,Tt),pt=new o0,Wt=new d0(zt),Ct=new Rp(M,S,k,At,K,p,l),mt=new _0(M,K,Ht),U=new L0(B,se,Ht,At),gt=new Pp(B,zt,se),Gt=new kp(B,zt,se),se.programs=bt.programs,M.capabilities=Ht,M.extensions=zt,M.properties=Tt,M.renderLists=pt,M.shadowMap=mt,M.state=At,M.info=se}lt();const q=new R0(M,B);this.xr=q,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const E=zt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=zt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(E){E!==void 0&&(D=E,this.setSize(z,Y,!1))},this.getSize=function(E){return E.set(z,Y)},this.setSize=function(E,F,H=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=E,Y=F,e.width=Math.floor(E*D),e.height=Math.floor(F*D),H===!0&&(e.style.width=E+"px",e.style.height=F+"px"),this.setViewport(0,0,E,F)},this.getDrawingBufferSize=function(E){return E.set(z*D,Y*D).floor()},this.setDrawingBufferSize=function(E,F,H){z=E,Y=F,D=H,e.width=Math.floor(E*H),e.height=Math.floor(F*H),this.setViewport(0,0,E,F)},this.getCurrentViewport=function(E){return E.copy(C)},this.getViewport=function(E){return E.copy(st)},this.setViewport=function(E,F,H,G){E.isVector4?st.set(E.x,E.y,E.z,E.w):st.set(E,F,H,G),At.viewport(C.copy(st).multiplyScalar(D).round())},this.getScissor=function(E){return E.copy(vt)},this.setScissor=function(E,F,H,G){E.isVector4?vt.set(E.x,E.y,E.z,E.w):vt.set(E,F,H,G),At.scissor(N.copy(vt).multiplyScalar(D).round())},this.getScissorTest=function(){return Bt},this.setScissorTest=function(E){At.setScissorTest(Bt=E)},this.setOpaqueSort=function(E){X=E},this.setTransparentSort=function(E){tt=E},this.getClearColor=function(E){return E.copy(Ct.getClearColor())},this.setClearColor=function(){Ct.setClearColor.apply(Ct,arguments)},this.getClearAlpha=function(){return Ct.getClearAlpha()},this.setClearAlpha=function(){Ct.setClearAlpha.apply(Ct,arguments)},this.clear=function(E=!0,F=!0,H=!0){let G=0;if(E){let O=!1;if(w!==null){const it=w.texture.format;O=it===ua||it===ha||it===ca}if(O){const it=w.texture.type,ut=it===Ln||it===ci||it===_s||it===Vi||it===aa||it===la,xt=Ct.getClearColor(),Mt=Ct.getClearAlpha(),Lt=xt.r,It=xt.g,yt=xt.b;ut?(g[0]=Lt,g[1]=It,g[2]=yt,g[3]=Mt,B.clearBufferuiv(B.COLOR,0,g)):(_[0]=Lt,_[1]=It,_[2]=yt,_[3]=Mt,B.clearBufferiv(B.COLOR,0,_))}else G|=B.COLOR_BUFFER_BIT}F&&(G|=B.DEPTH_BUFFER_BIT),H&&(G|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",dt,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),pt.dispose(),Wt.dispose(),Tt.dispose(),S.dispose(),k.dispose(),K.dispose(),ee.dispose(),U.dispose(),bt.dispose(),q.dispose(),q.removeEventListener("sessionstart",Sa),q.removeEventListener("sessionend",ba),Yn.stop()};function Q(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const E=se.autoReset,F=mt.enabled,H=mt.autoUpdate,G=mt.needsUpdate,O=mt.type;lt(),se.autoReset=E,mt.enabled=F,mt.autoUpdate=H,mt.needsUpdate=G,mt.type=O}function ht(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Dt(E){const F=E.target;F.removeEventListener("dispose",Dt),le(F)}function le(E){Ae(E),Tt.remove(E)}function Ae(E){const F=Tt.get(E).programs;F!==void 0&&(F.forEach(function(H){bt.releaseProgram(H)}),E.isShaderMaterial&&bt.releaseShaderCache(E))}this.renderBufferDirect=function(E,F,H,G,O,it){F===null&&(F=te);const ut=O.isMesh&&O.matrixWorld.determinant()<0,xt=th(E,F,H,G,O);At.setMaterial(G,ut);let Mt=H.index,Lt=1;if(G.wireframe===!0){if(Mt=J.getWireframeAttribute(H),Mt===void 0)return;Lt=2}const It=H.drawRange,yt=H.attributes.position;let Xt=It.start*Lt,ne=(It.start+It.count)*Lt;it!==null&&(Xt=Math.max(Xt,it.start*Lt),ne=Math.min(ne,(it.start+it.count)*Lt)),Mt!==null?(Xt=Math.max(Xt,0),ne=Math.min(ne,Mt.count)):yt!=null&&(Xt=Math.max(Xt,0),ne=Math.min(ne,yt.count));const re=ne-Xt;if(re<0||re===1/0)return;ee.setup(O,G,xt,H,Mt);let Oe,$t=gt;if(Mt!==null&&(Oe=Z.get(Mt),$t=Gt,$t.setIndex(Oe)),O.isMesh)G.wireframe===!0?(At.setLineWidth(G.wireframeLinewidth*ue()),$t.setMode(B.LINES)):$t.setMode(B.TRIANGLES);else if(O.isLine){let Et=G.linewidth;Et===void 0&&(Et=1),At.setLineWidth(Et*ue()),O.isLineSegments?$t.setMode(B.LINES):O.isLineLoop?$t.setMode(B.LINE_LOOP):$t.setMode(B.LINE_STRIP)}else O.isPoints?$t.setMode(B.POINTS):O.isSprite&&$t.setMode(B.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)$t.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(zt.get("WEBGL_multi_draw"))$t.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Et=O._multiDrawStarts,mn=O._multiDrawCounts,Yt=O._multiDrawCount,Je=Mt?Z.get(Mt).bytesPerElement:1,fi=Tt.get(G).currentProgram.getUniforms();for(let He=0;He<Yt;He++)fi.setValue(B,"_gl_DrawID",He),$t.render(Et[He]/Je,mn[He])}else if(O.isInstancedMesh)$t.renderInstances(Xt,re,O.count);else if(H.isInstancedBufferGeometry){const Et=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,mn=Math.min(H.instanceCount,Et);$t.renderInstances(Xt,re,mn)}else $t.render(Xt,re)};function Kt(E,F,H){E.transparent===!0&&E.side===je&&E.forceSinglePass===!1?(E.side=Ue,E.needsUpdate=!0,bs(E,F,H),E.side=Xn,E.needsUpdate=!0,bs(E,F,H),E.side=je):bs(E,F,H)}this.compile=function(E,F,H=null){H===null&&(H=E),f=Wt.get(H),f.init(F),b.push(f),H.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),E!==H&&E.traverseVisible(function(O){O.isLight&&O.layers.test(F.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),f.setupLights();const G=new Set;return E.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const it=O.material;if(it)if(Array.isArray(it))for(let ut=0;ut<it.length;ut++){const xt=it[ut];Kt(xt,H,O),G.add(xt)}else Kt(it,H,O),G.add(it)}),b.pop(),f=null,G},this.compileAsync=function(E,F,H=null){const G=this.compile(E,F,H);return new Promise(O=>{function it(){if(G.forEach(function(ut){Tt.get(ut).currentProgram.isReady()&&G.delete(ut)}),G.size===0){O(E);return}setTimeout(it,10)}zt.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let Qe=null;function pn(E){Qe&&Qe(E)}function Sa(){Yn.stop()}function ba(){Yn.start()}const Yn=new zc;Yn.setAnimationLoop(pn),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(E){Qe=E,q.setAnimationLoop(E),E===null?Yn.stop():Yn.start()},q.addEventListener("sessionstart",Sa),q.addEventListener("sessionend",ba),this.render=function(E,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(F),F=q.getCamera()),E.isScene===!0&&E.onBeforeRender(M,E,F,w),f=Wt.get(E,b.length),f.init(F),b.push(f),wt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),j.setFromProjectionMatrix(wt),ft=this.localClippingEnabled,et=nt.init(this.clippingPlanes,ft),m=pt.get(E,y.length),m.init(),y.push(m),q.enabled===!0&&q.isPresenting===!0){const it=M.xr.getDepthSensingMesh();it!==null&&br(it,F,-1/0,M.sortObjects)}br(E,F,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(X,tt),kt=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,kt&&Ct.addToRenderList(m,E),this.info.render.frame++,et===!0&&nt.beginShadows();const H=f.state.shadowsArray;mt.render(H,E,F),et===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,O=m.transmissive;if(f.setupLights(),F.isArrayCamera){const it=F.cameras;if(O.length>0)for(let ut=0,xt=it.length;ut<xt;ut++){const Mt=it[ut];wa(G,O,E,Mt)}kt&&Ct.render(E);for(let ut=0,xt=it.length;ut<xt;ut++){const Mt=it[ut];Ea(m,E,Mt,Mt.viewport)}}else O.length>0&&wa(G,O,E,F),kt&&Ct.render(E),Ea(m,E,F);w!==null&&(R.updateMultisampleRenderTarget(w),R.updateRenderTargetMipmap(w)),E.isScene===!0&&E.onAfterRender(M,E,F),ee.resetDefaultState(),x=-1,v=null,b.pop(),b.length>0?(f=b[b.length-1],et===!0&&nt.setGlobalState(M.clippingPlanes,f.state.camera)):f=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function br(E,F,H,G){if(E.visible===!1)return;if(E.layers.test(F.layers)){if(E.isGroup)H=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(F);else if(E.isLight)f.pushLight(E),E.castShadow&&f.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||j.intersectsSprite(E)){G&&Nt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(wt);const ut=K.update(E),xt=E.material;xt.visible&&m.push(E,ut,xt,H,Nt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||j.intersectsObject(E))){const ut=K.update(E),xt=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Nt.copy(E.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),Nt.copy(ut.boundingSphere.center)),Nt.applyMatrix4(E.matrixWorld).applyMatrix4(wt)),Array.isArray(xt)){const Mt=ut.groups;for(let Lt=0,It=Mt.length;Lt<It;Lt++){const yt=Mt[Lt],Xt=xt[yt.materialIndex];Xt&&Xt.visible&&m.push(E,ut,Xt,H,Nt.z,yt)}}else xt.visible&&m.push(E,ut,xt,H,Nt.z,null)}}const it=E.children;for(let ut=0,xt=it.length;ut<xt;ut++)br(it[ut],F,H,G)}function Ea(E,F,H,G){const O=E.opaque,it=E.transmissive,ut=E.transparent;f.setupLightsView(H),et===!0&&nt.setGlobalState(M.clippingPlanes,H),G&&At.viewport(C.copy(G)),O.length>0&&Ss(O,F,H),it.length>0&&Ss(it,F,H),ut.length>0&&Ss(ut,F,H),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function wa(E,F,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[G.id]===void 0&&(f.state.transmissionRenderTarget[G.id]=new Ze(1,1,{generateMipmaps:!0,type:zt.has("EXT_color_buffer_half_float")||zt.has("EXT_color_buffer_float")?dn:Ln,minFilter:ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Vt.workingColorSpace}));const it=f.state.transmissionRenderTarget[G.id],ut=G.viewport||C;it.setSize(ut.z,ut.w);const xt=M.getRenderTarget();M.setRenderTarget(it),M.getClearColor(W),$=M.getClearAlpha(),$<1&&M.setClearColor(16777215,.5),M.clear(),kt&&Ct.render(H);const Mt=M.toneMapping;M.toneMapping=Vn;const Lt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),f.setupLightsView(G),et===!0&&nt.setGlobalState(M.clippingPlanes,G),Ss(E,H,G),R.updateMultisampleRenderTarget(it),R.updateRenderTargetMipmap(it),zt.has("WEBGL_multisampled_render_to_texture")===!1){let It=!1;for(let yt=0,Xt=F.length;yt<Xt;yt++){const ne=F[yt],re=ne.object,Oe=ne.geometry,$t=ne.material,Et=ne.group;if($t.side===je&&re.layers.test(G.layers)){const mn=$t.side;$t.side=Ue,$t.needsUpdate=!0,Ta(re,H,G,Oe,$t,Et),$t.side=mn,$t.needsUpdate=!0,It=!0}}It===!0&&(R.updateMultisampleRenderTarget(it),R.updateRenderTargetMipmap(it))}M.setRenderTarget(xt),M.setClearColor(W,$),Lt!==void 0&&(G.viewport=Lt),M.toneMapping=Mt}function Ss(E,F,H){const G=F.isScene===!0?F.overrideMaterial:null;for(let O=0,it=E.length;O<it;O++){const ut=E[O],xt=ut.object,Mt=ut.geometry,Lt=G===null?ut.material:G,It=ut.group;xt.layers.test(H.layers)&&Ta(xt,F,H,Mt,Lt,It)}}function Ta(E,F,H,G,O,it){E.onBeforeRender(M,F,H,G,O,it),E.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),O.onBeforeRender(M,F,H,G,E,it),O.transparent===!0&&O.side===je&&O.forceSinglePass===!1?(O.side=Ue,O.needsUpdate=!0,M.renderBufferDirect(H,F,G,O,E,it),O.side=Xn,O.needsUpdate=!0,M.renderBufferDirect(H,F,G,O,E,it),O.side=je):M.renderBufferDirect(H,F,G,O,E,it),E.onAfterRender(M,F,H,G,O,it)}function bs(E,F,H){F.isScene!==!0&&(F=te);const G=Tt.get(E),O=f.state.lights,it=f.state.shadowsArray,ut=O.state.version,xt=bt.getParameters(E,O.state,it,F,H),Mt=bt.getProgramCacheKey(xt);let Lt=G.programs;G.environment=E.isMeshStandardMaterial?F.environment:null,G.fog=F.fog,G.envMap=(E.isMeshStandardMaterial?k:S).get(E.envMap||G.environment),G.envMapRotation=G.environment!==null&&E.envMap===null?F.environmentRotation:E.envMapRotation,Lt===void 0&&(E.addEventListener("dispose",Dt),Lt=new Map,G.programs=Lt);let It=Lt.get(Mt);if(It!==void 0){if(G.currentProgram===It&&G.lightsStateVersion===ut)return Ra(E,xt),It}else xt.uniforms=bt.getUniforms(E),E.onBeforeCompile(xt,M),It=bt.acquireProgram(xt,Mt),Lt.set(Mt,It),G.uniforms=xt.uniforms;const yt=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(yt.clippingPlanes=nt.uniform),Ra(E,xt),G.needsLights=nh(E),G.lightsStateVersion=ut,G.needsLights&&(yt.ambientLightColor.value=O.state.ambient,yt.lightProbe.value=O.state.probe,yt.directionalLights.value=O.state.directional,yt.directionalLightShadows.value=O.state.directionalShadow,yt.spotLights.value=O.state.spot,yt.spotLightShadows.value=O.state.spotShadow,yt.rectAreaLights.value=O.state.rectArea,yt.ltc_1.value=O.state.rectAreaLTC1,yt.ltc_2.value=O.state.rectAreaLTC2,yt.pointLights.value=O.state.point,yt.pointLightShadows.value=O.state.pointShadow,yt.hemisphereLights.value=O.state.hemi,yt.directionalShadowMap.value=O.state.directionalShadowMap,yt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,yt.spotShadowMap.value=O.state.spotShadowMap,yt.spotLightMatrix.value=O.state.spotLightMatrix,yt.spotLightMap.value=O.state.spotLightMap,yt.pointShadowMap.value=O.state.pointShadowMap,yt.pointShadowMatrix.value=O.state.pointShadowMatrix),G.currentProgram=It,G.uniformsList=null,It}function Aa(E){if(E.uniformsList===null){const F=E.currentProgram.getUniforms();E.uniformsList=ar.seqWithValue(F.seq,E.uniforms)}return E.uniformsList}function Ra(E,F){const H=Tt.get(E);H.outputColorSpace=F.outputColorSpace,H.batching=F.batching,H.batchingColor=F.batchingColor,H.instancing=F.instancing,H.instancingColor=F.instancingColor,H.instancingMorph=F.instancingMorph,H.skinning=F.skinning,H.morphTargets=F.morphTargets,H.morphNormals=F.morphNormals,H.morphColors=F.morphColors,H.morphTargetsCount=F.morphTargetsCount,H.numClippingPlanes=F.numClippingPlanes,H.numIntersection=F.numClipIntersection,H.vertexAlphas=F.vertexAlphas,H.vertexTangents=F.vertexTangents,H.toneMapping=F.toneMapping}function th(E,F,H,G,O){F.isScene!==!0&&(F=te),R.resetTextureUnits();const it=F.fog,ut=G.isMeshStandardMaterial?F.environment:null,xt=w===null?M.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:$i,Mt=(G.isMeshStandardMaterial?k:S).get(G.envMap||ut),Lt=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,It=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),yt=!!H.morphAttributes.position,Xt=!!H.morphAttributes.normal,ne=!!H.morphAttributes.color;let re=Vn;G.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(re=M.toneMapping);const Oe=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,$t=Oe!==void 0?Oe.length:0,Et=Tt.get(G),mn=f.state.lights;if(et===!0&&(ft===!0||E!==v)){const $e=E===v&&G.id===x;nt.setState(G,E,$e)}let Yt=!1;G.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==mn.state.version||Et.outputColorSpace!==xt||O.isBatchedMesh&&Et.batching===!1||!O.isBatchedMesh&&Et.batching===!0||O.isBatchedMesh&&Et.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Et.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Et.instancing===!1||!O.isInstancedMesh&&Et.instancing===!0||O.isSkinnedMesh&&Et.skinning===!1||!O.isSkinnedMesh&&Et.skinning===!0||O.isInstancedMesh&&Et.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Et.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Et.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Et.instancingMorph===!1&&O.morphTexture!==null||Et.envMap!==Mt||G.fog===!0&&Et.fog!==it||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==nt.numPlanes||Et.numIntersection!==nt.numIntersection)||Et.vertexAlphas!==Lt||Et.vertexTangents!==It||Et.morphTargets!==yt||Et.morphNormals!==Xt||Et.morphColors!==ne||Et.toneMapping!==re||Et.morphTargetsCount!==$t)&&(Yt=!0):(Yt=!0,Et.__version=G.version);let Je=Et.currentProgram;Yt===!0&&(Je=bs(G,F,O));let fi=!1,He=!1,Zi=!1;const oe=Je.getUniforms(),ln=Et.uniforms;if(At.useProgram(Je.program)&&(fi=!0,He=!0,Zi=!0),G.id!==x&&(x=G.id,He=!0),fi||v!==E){At.buffers.depth.getReversed()?(rt.copy(E.projectionMatrix),Su(rt),bu(rt),oe.setValue(B,"projectionMatrix",rt)):oe.setValue(B,"projectionMatrix",E.projectionMatrix),oe.setValue(B,"viewMatrix",E.matrixWorldInverse);const Dn=oe.map.cameraPosition;Dn!==void 0&&Dn.setValue(B,Rt.setFromMatrixPosition(E.matrixWorld)),Ht.logarithmicDepthBuffer&&oe.setValue(B,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&oe.setValue(B,"isOrthographic",E.isOrthographicCamera===!0),v!==E&&(v=E,He=!0,Zi=!0)}if(O.isSkinnedMesh){oe.setOptional(B,O,"bindMatrix"),oe.setOptional(B,O,"bindMatrixInverse");const $e=O.skeleton;$e&&($e.boneTexture===null&&$e.computeBoneTexture(),oe.setValue(B,"boneTexture",$e.boneTexture,R))}O.isBatchedMesh&&(oe.setOptional(B,O,"batchingTexture"),oe.setValue(B,"batchingTexture",O._matricesTexture,R),oe.setOptional(B,O,"batchingIdTexture"),oe.setValue(B,"batchingIdTexture",O._indirectTexture,R),oe.setOptional(B,O,"batchingColorTexture"),O._colorsTexture!==null&&oe.setValue(B,"batchingColorTexture",O._colorsTexture,R));const Qi=H.morphAttributes;if((Qi.position!==void 0||Qi.normal!==void 0||Qi.color!==void 0)&&Pt.update(O,H,Je),(He||Et.receiveShadow!==O.receiveShadow)&&(Et.receiveShadow=O.receiveShadow,oe.setValue(B,"receiveShadow",O.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(ln.envMap.value=Mt,ln.flipEnvMap.value=Mt.isCubeTexture&&Mt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&F.environment!==null&&(ln.envMapIntensity.value=F.environmentIntensity),He&&(oe.setValue(B,"toneMappingExposure",M.toneMappingExposure),Et.needsLights&&eh(ln,Zi),it&&G.fog===!0&&ct.refreshFogUniforms(ln,it),ct.refreshMaterialUniforms(ln,G,D,Y,f.state.transmissionRenderTarget[E.id]),ar.upload(B,Aa(Et),ln,R)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(ar.upload(B,Aa(Et),ln,R),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&oe.setValue(B,"center",O.center),oe.setValue(B,"modelViewMatrix",O.modelViewMatrix),oe.setValue(B,"normalMatrix",O.normalMatrix),oe.setValue(B,"modelMatrix",O.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const $e=G.uniformsGroups;for(let Dn=0,In=$e.length;Dn<In;Dn++){const Ca=$e[Dn];U.update(Ca,Je),U.bind(Ca,Je)}}return Je}function eh(E,F){E.ambientLightColor.needsUpdate=F,E.lightProbe.needsUpdate=F,E.directionalLights.needsUpdate=F,E.directionalLightShadows.needsUpdate=F,E.pointLights.needsUpdate=F,E.pointLightShadows.needsUpdate=F,E.spotLights.needsUpdate=F,E.spotLightShadows.needsUpdate=F,E.rectAreaLights.needsUpdate=F,E.hemisphereLights.needsUpdate=F}function nh(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(E,F,H){Tt.get(E.texture).__webglTexture=F,Tt.get(E.depthTexture).__webglTexture=H;const G=Tt.get(E);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=H===void 0,G.__autoAllocateDepthBuffer||zt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,F){const H=Tt.get(E);H.__webglFramebuffer=F,H.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(E,F=0,H=0){w=E,T=F,A=H;let G=!0,O=null,it=!1,ut=!1;if(E){const Mt=Tt.get(E);if(Mt.__useDefaultFramebuffer!==void 0)At.bindFramebuffer(B.FRAMEBUFFER,null),G=!1;else if(Mt.__webglFramebuffer===void 0)R.setupRenderTarget(E);else if(Mt.__hasExternalTextures)R.rebindTextures(E,Tt.get(E.texture).__webglTexture,Tt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const yt=E.depthTexture;if(Mt.__boundDepthTexture!==yt){if(yt!==null&&Tt.has(yt)&&(E.width!==yt.image.width||E.height!==yt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(E)}}const Lt=E.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(ut=!0);const It=Tt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(It[F])?O=It[F][H]:O=It[F],it=!0):E.samples>0&&R.useMultisampledRTT(E)===!1?O=Tt.get(E).__webglMultisampledFramebuffer:Array.isArray(It)?O=It[H]:O=It,C.copy(E.viewport),N.copy(E.scissor),I=E.scissorTest}else C.copy(st).multiplyScalar(D).floor(),N.copy(vt).multiplyScalar(D).floor(),I=Bt;if(At.bindFramebuffer(B.FRAMEBUFFER,O)&&G&&At.drawBuffers(E,O),At.viewport(C),At.scissor(N),At.setScissorTest(I),it){const Mt=Tt.get(E.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+F,Mt.__webglTexture,H)}else if(ut){const Mt=Tt.get(E.texture),Lt=F||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Mt.__webglTexture,H||0,Lt)}x=-1},this.readRenderTargetPixels=function(E,F,H,G,O,it,ut){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xt=Tt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ut!==void 0&&(xt=xt[ut]),xt){At.bindFramebuffer(B.FRAMEBUFFER,xt);try{const Mt=E.texture,Lt=Mt.format,It=Mt.type;if(!Ht.textureFormatReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ht.textureTypeReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=E.width-G&&H>=0&&H<=E.height-O&&B.readPixels(F,H,G,O,Ft.convert(Lt),Ft.convert(It),it)}finally{const Mt=w!==null?Tt.get(w).__webglFramebuffer:null;At.bindFramebuffer(B.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(E,F,H,G,O,it,ut){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xt=Tt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ut!==void 0&&(xt=xt[ut]),xt){const Mt=E.texture,Lt=Mt.format,It=Mt.type;if(!Ht.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ht.textureTypeReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=E.width-G&&H>=0&&H<=E.height-O){At.bindFramebuffer(B.FRAMEBUFFER,xt);const yt=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,yt),B.bufferData(B.PIXEL_PACK_BUFFER,it.byteLength,B.STREAM_READ),B.readPixels(F,H,G,O,Ft.convert(Lt),Ft.convert(It),0);const Xt=w!==null?Tt.get(w).__webglFramebuffer:null;At.bindFramebuffer(B.FRAMEBUFFER,Xt);const ne=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await yu(B,ne,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,yt),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,it),B.deleteBuffer(yt),B.deleteSync(ne),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,F=null,H=0){E.isTexture!==!0&&(hs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,E=arguments[1]);const G=Math.pow(2,-H),O=Math.floor(E.image.width*G),it=Math.floor(E.image.height*G),ut=F!==null?F.x:0,xt=F!==null?F.y:0;R.setTexture2D(E,0),B.copyTexSubImage2D(B.TEXTURE_2D,H,0,0,ut,xt,O,it),At.unbindTexture()},this.copyTextureToTexture=function(E,F,H=null,G=null,O=0){E.isTexture!==!0&&(hs("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,E=arguments[1],F=arguments[2],O=arguments[3]||0,H=null);let it,ut,xt,Mt,Lt,It,yt,Xt,ne;const re=E.isCompressedTexture?E.mipmaps[O]:E.image;H!==null?(it=H.max.x-H.min.x,ut=H.max.y-H.min.y,xt=H.isBox3?H.max.z-H.min.z:1,Mt=H.min.x,Lt=H.min.y,It=H.isBox3?H.min.z:0):(it=re.width,ut=re.height,xt=re.depth||1,Mt=0,Lt=0,It=0),G!==null?(yt=G.x,Xt=G.y,ne=G.z):(yt=0,Xt=0,ne=0);const Oe=Ft.convert(F.format),$t=Ft.convert(F.type);let Et;F.isData3DTexture?(R.setTexture3D(F,0),Et=B.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(R.setTexture2DArray(F,0),Et=B.TEXTURE_2D_ARRAY):(R.setTexture2D(F,0),Et=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,F.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,F.unpackAlignment);const mn=B.getParameter(B.UNPACK_ROW_LENGTH),Yt=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Je=B.getParameter(B.UNPACK_SKIP_PIXELS),fi=B.getParameter(B.UNPACK_SKIP_ROWS),He=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,re.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,re.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Mt),B.pixelStorei(B.UNPACK_SKIP_ROWS,Lt),B.pixelStorei(B.UNPACK_SKIP_IMAGES,It);const Zi=E.isDataArrayTexture||E.isData3DTexture,oe=F.isDataArrayTexture||F.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const ln=Tt.get(E),Qi=Tt.get(F),$e=Tt.get(ln.__renderTarget),Dn=Tt.get(Qi.__renderTarget);At.bindFramebuffer(B.READ_FRAMEBUFFER,$e.__webglFramebuffer),At.bindFramebuffer(B.DRAW_FRAMEBUFFER,Dn.__webglFramebuffer);for(let In=0;In<xt;In++)Zi&&B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Tt.get(E).__webglTexture,O,It+In),E.isDepthTexture?(oe&&B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Tt.get(F).__webglTexture,O,ne+In),B.blitFramebuffer(Mt,Lt,it,ut,yt,Xt,it,ut,B.DEPTH_BUFFER_BIT,B.NEAREST)):oe?B.copyTexSubImage3D(Et,O,yt,Xt,ne+In,Mt,Lt,it,ut):B.copyTexSubImage2D(Et,O,yt,Xt,ne+In,Mt,Lt,it,ut);At.bindFramebuffer(B.READ_FRAMEBUFFER,null),At.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else oe?E.isDataTexture||E.isData3DTexture?B.texSubImage3D(Et,O,yt,Xt,ne,it,ut,xt,Oe,$t,re.data):F.isCompressedArrayTexture?B.compressedTexSubImage3D(Et,O,yt,Xt,ne,it,ut,xt,Oe,re.data):B.texSubImage3D(Et,O,yt,Xt,ne,it,ut,xt,Oe,$t,re):E.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,O,yt,Xt,it,ut,Oe,$t,re.data):E.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,O,yt,Xt,re.width,re.height,Oe,re.data):B.texSubImage2D(B.TEXTURE_2D,O,yt,Xt,it,ut,Oe,$t,re);B.pixelStorei(B.UNPACK_ROW_LENGTH,mn),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Yt),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Je),B.pixelStorei(B.UNPACK_SKIP_ROWS,fi),B.pixelStorei(B.UNPACK_SKIP_IMAGES,He),O===0&&F.generateMipmaps&&B.generateMipmap(Et),At.unbindTexture()},this.copyTextureToTexture3D=function(E,F,H=null,G=null,O=0){return E.isTexture!==!0&&(hs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,G=arguments[1]||null,E=arguments[2],F=arguments[3],O=arguments[4]||0),hs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,F,H,G,O)},this.initRenderTarget=function(E){Tt.get(E).__webglFramebuffer===void 0&&R.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?R.setTextureCube(E,0):E.isData3DTexture?R.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?R.setTexture2DArray(E,0):R.setTexture2D(E,0),At.unbindTexture()},this.resetState=function(){T=0,A=0,w=null,At.reset(),ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Vt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Vt._getUnpackColorSpace()}}class ga{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new St(t),this.density=e}clone(){return new ga(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class qc extends ge{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fn,this.environmentIntensity=1,this.environmentRotation=new fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class I0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=jo,this.updateRanges=[],this.version=0,this.uuid=Cn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Le=new L;class fr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=rn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Qt(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=rn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=rn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=rn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=rn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array),s=Qt(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array),s=Qt(s,this.array),r=Qt(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new ze(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new fr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class $c extends di{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new St(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Pi;const ss=new L,Li=new L,Di=new L,Ii=new _t,rs=new _t,Yc=new ie,Xs=new L,os=new L,qs=new L,Il=new _t,so=new _t,Ul=new _t;class U0 extends ge{constructor(t=new $c){if(super(),this.isSprite=!0,this.type="Sprite",Pi===void 0){Pi=new Me;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new I0(e,5);Pi.setIndex([0,1,2,0,2,3]),Pi.setAttribute("position",new fr(n,3,0,!1)),Pi.setAttribute("uv",new fr(n,2,3,!1))}this.geometry=Pi,this.material=t,this.center=new _t(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Li.setFromMatrixScale(this.matrixWorld),Yc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Di.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Li.multiplyScalar(-Di.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;$s(Xs.set(-.5,-.5,0),Di,o,Li,s,r),$s(os.set(.5,-.5,0),Di,o,Li,s,r),$s(qs.set(.5,.5,0),Di,o,Li,s,r),Il.set(0,0),so.set(1,0),Ul.set(1,1);let a=t.ray.intersectTriangle(Xs,os,qs,!1,ss);if(a===null&&($s(os.set(-.5,.5,0),Di,o,Li,s,r),so.set(0,1),a=t.ray.intersectTriangle(Xs,qs,os,!1,ss),a===null))return;const l=t.ray.origin.distanceTo(ss);l<t.near||l>t.far||e.push({distance:l,point:ss.clone(),uv:Ke.getInterpolation(ss,Xs,os,qs,Il,so,Ul,new _t),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function $s(i,t,e,n,s,r){Ii.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(rs.x=r*Ii.x-s*Ii.y,rs.y=s*Ii.x+r*Ii.y):rs.copy(Ii),i.copy(t),i.x+=rs.x,i.y+=rs.y,i.applyMatrix4(Yc)}class jc extends di{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new St(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Nl=new ie,Qo=new Dc,Ys=new vr,js=new L;class N0 extends ge{constructor(t=new Me,e=new jc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ys.copy(n.boundingSphere),Ys.applyMatrix4(s),Ys.radius+=r,t.ray.intersectsSphere(Ys)===!1)return;Nl.copy(s).invert(),Qo.copy(t.ray).applyMatrix4(Nl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=d,_=p;g<_;g++){const m=c.getX(g);js.fromBufferAttribute(u,m),Fl(js,m,l,s,t,e,this)}}else{const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=d,_=p;g<_;g++)js.fromBufferAttribute(u,g),Fl(js,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Fl(i,t,e,n,s,r,o){const a=Qo.distanceSqToPoint(i);if(a<e){const l=new L;Qo.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class qn extends Te{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _a extends Me{constructor(t=[new _t(0,-.5),new _t(.5,0),new _t(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ee(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/e,u=new L,d=new _t,p=new L,g=new L,_=new L;let m=0,f=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:m=t[y+1].x-t[y].x,f=t[y+1].y-t[y].y,p.x=f*1,p.y=-m,p.z=f*0,_.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:m=t[y+1].x-t[y].x,f=t[y+1].y-t[y].y,p.x=f*1,p.y=-m,p.z=f*0,g.copy(p),p.x+=_.x,p.y+=_.y,p.z+=_.z,p.normalize(),l.push(p.x,p.y,p.z),_.copy(g)}for(let y=0;y<=e;y++){const b=n+y*h*s,M=Math.sin(b),P=Math.cos(b);for(let T=0;T<=t.length-1;T++){u.x=t[T].x*M,u.y=t[T].y,u.z=t[T].x*P,o.push(u.x,u.y,u.z),d.x=y/e,d.y=T/(t.length-1),a.push(d.x,d.y);const A=l[3*T+0]*M,w=l[3*T+1],x=l[3*T+0]*P;c.push(A,w,x)}}for(let y=0;y<e;y++)for(let b=0;b<t.length-1;b++){const M=b+y*t.length,P=M,T=M+t.length,A=M+t.length+1,w=M+1;r.push(P,T,w),r.push(A,w,T)}this.setIndex(r),this.setAttribute("position",new qt(o,3)),this.setAttribute("uv",new qt(a,2)),this.setAttribute("normal",new qt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _a(t.points,t.segments,t.phiStart,t.phiLength)}}class Mr extends Me{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new L,h=new _t;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const p=n+u/e*s;c.x=t*Math.cos(p),c.y=t*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new qt(o,3)),this.setAttribute("normal",new qt(a,3)),this.setAttribute("uv",new qt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mr(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ke extends Me{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],p=[];let g=0;const _=[],m=n/2;let f=0;y(),o===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new qt(u,3)),this.setAttribute("normal",new qt(d,3)),this.setAttribute("uv",new qt(p,2));function y(){const M=new L,P=new L;let T=0;const A=(e-t)/n;for(let w=0;w<=r;w++){const x=[],v=w/r,C=v*(e-t)+t;for(let N=0;N<=s;N++){const I=N/s,W=I*l+a,$=Math.sin(W),z=Math.cos(W);P.x=C*$,P.y=-v*n+m,P.z=C*z,u.push(P.x,P.y,P.z),M.set($,A,z).normalize(),d.push(M.x,M.y,M.z),p.push(I,1-v),x.push(g++)}_.push(x)}for(let w=0;w<s;w++)for(let x=0;x<r;x++){const v=_[x][w],C=_[x+1][w],N=_[x+1][w+1],I=_[x][w+1];(t>0||x!==0)&&(h.push(v,C,I),T+=3),(e>0||x!==r-1)&&(h.push(C,N,I),T+=3)}c.addGroup(f,T,0),f+=T}function b(M){const P=g,T=new _t,A=new L;let w=0;const x=M===!0?t:e,v=M===!0?1:-1;for(let N=1;N<=s;N++)u.push(0,m*v,0),d.push(0,v,0),p.push(.5,.5),g++;const C=g;for(let N=0;N<=s;N++){const W=N/s*l+a,$=Math.cos(W),z=Math.sin(W);A.x=x*z,A.y=m*v,A.z=x*$,u.push(A.x,A.y,A.z),d.push(0,v,0),T.x=$*.5+.5,T.y=z*.5*v+.5,p.push(T.x,T.y),g++}for(let N=0;N<s;N++){const I=P+N,W=C+N;M===!0?h.push(W,W+1,I):h.push(W+1,W,I),w+=3}c.addGroup(f,w,M===!0?1:2),f+=w}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ke(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class pr extends ke{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new pr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class va extends Me{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new qt(r,3)),this.setAttribute("normal",new qt(r.slice(),3)),this.setAttribute("uv",new qt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const b=new L,M=new L,P=new L;for(let T=0;T<e.length;T+=3)p(e[T+0],b),p(e[T+1],M),p(e[T+2],P),l(b,M,P,y)}function l(y,b,M,P){const T=P+1,A=[];for(let w=0;w<=T;w++){A[w]=[];const x=y.clone().lerp(M,w/T),v=b.clone().lerp(M,w/T),C=T-w;for(let N=0;N<=C;N++)N===0&&w===T?A[w][N]=x:A[w][N]=x.clone().lerp(v,N/C)}for(let w=0;w<T;w++)for(let x=0;x<2*(T-w)-1;x++){const v=Math.floor(x/2);x%2===0?(d(A[w][v+1]),d(A[w+1][v]),d(A[w][v])):(d(A[w][v+1]),d(A[w+1][v+1]),d(A[w+1][v]))}}function c(y){const b=new L;for(let M=0;M<r.length;M+=3)b.x=r[M+0],b.y=r[M+1],b.z=r[M+2],b.normalize().multiplyScalar(y),r[M+0]=b.x,r[M+1]=b.y,r[M+2]=b.z}function h(){const y=new L;for(let b=0;b<r.length;b+=3){y.x=r[b+0],y.y=r[b+1],y.z=r[b+2];const M=m(y)/2/Math.PI+.5,P=f(y)/Math.PI+.5;o.push(M,1-P)}g(),u()}function u(){for(let y=0;y<o.length;y+=6){const b=o[y+0],M=o[y+2],P=o[y+4],T=Math.max(b,M,P),A=Math.min(b,M,P);T>.9&&A<.1&&(b<.2&&(o[y+0]+=1),M<.2&&(o[y+2]+=1),P<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function p(y,b){const M=y*3;b.x=t[M+0],b.y=t[M+1],b.z=t[M+2]}function g(){const y=new L,b=new L,M=new L,P=new L,T=new _t,A=new _t,w=new _t;for(let x=0,v=0;x<r.length;x+=9,v+=6){y.set(r[x+0],r[x+1],r[x+2]),b.set(r[x+3],r[x+4],r[x+5]),M.set(r[x+6],r[x+7],r[x+8]),T.set(o[v+0],o[v+1]),A.set(o[v+2],o[v+3]),w.set(o[v+4],o[v+5]),P.copy(y).add(b).add(M).divideScalar(3);const C=m(P);_(T,v+0,y,C),_(A,v+2,b,C),_(w,v+4,M,C)}}function _(y,b,M,P){P<0&&y.x===1&&(o[b]=y.x-1),M.x===0&&M.z===0&&(o[b]=P/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function f(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new va(t.vertices,t.indices,t.radius,t.details)}}class xa extends va{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new xa(t.radius,t.detail)}}class Gn extends Me{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new L,d=new L,p=[],g=[],_=[],m=[];for(let f=0;f<=n;f++){const y=[],b=f/n;let M=0;f===0&&o===0?M=.5/e:f===n&&l===Math.PI&&(M=-.5/e);for(let P=0;P<=e;P++){const T=P/e;u.x=-t*Math.cos(s+T*r)*Math.sin(o+b*a),u.y=t*Math.cos(o+b*a),u.z=t*Math.sin(s+T*r)*Math.sin(o+b*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(T+M,1-b),y.push(c++)}h.push(y)}for(let f=0;f<n;f++)for(let y=0;y<e;y++){const b=h[f][y+1],M=h[f][y],P=h[f+1][y],T=h[f+1][y+1];(f!==0||o>0)&&p.push(b,M,T),(f!==n-1||l<Math.PI)&&p.push(M,P,T)}this.setIndex(p),this.setAttribute("position",new qt(g,3)),this.setAttribute("normal",new qt(_,3)),this.setAttribute("uv",new qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class hi extends Me{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new L,u=new L,d=new L;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){const _=g/s*r,m=p/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(_),u.y=(t+e*Math.cos(m))*Math.sin(_),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){const _=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,y=(s+1)*p+g;o.push(_,m,y),o.push(m,f,y)}this.setIndex(o),this.setAttribute("position",new qt(a,3)),this.setAttribute("normal",new qt(l,3)),this.setAttribute("uv",new qt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hi(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class F0 extends we{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class be extends di{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new St(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new St(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ac,this.normalScale=new _t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Jo extends be{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new _t(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ee(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new St(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new St(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new St(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Ma extends ge{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new St(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class O0 extends Ma{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.groundColor=new St(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ro=new ie,Ol=new L,Bl=new L;class Kc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _t(512,512),this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fa,this._frameExtents=new _t(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ol.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ol),Bl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Bl),e.updateMatrixWorld(),ro.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ro),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ro)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const kl=new ie,as=new L,oo=new L;class B0 extends Kc{constructor(){super(new We(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new _t(4,2),this._viewportCount=6,this._viewports=[new Jt(2,1,1,1),new Jt(0,1,1,1),new Jt(3,1,1,1),new Jt(1,1,1,1),new Jt(3,0,1,1),new Jt(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),as.setFromMatrixPosition(t.matrixWorld),n.position.copy(as),oo.copy(n.position),oo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(oo),n.updateMatrixWorld(),s.makeTranslation(-as.x,-as.y,-as.z),kl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kl)}}class Zc extends Ma{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new B0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class k0 extends Kc{constructor(){super(new pa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class z0 extends Ma{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.target=new ge,this.shadow=new k0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class H0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=zl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=zl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function zl(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:sa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=sa);const Qc={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ki{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const G0=new pa(-1,1,1,-1,0,1);class V0 extends Me{constructor(){super(),this.setAttribute("position",new qt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new qt([0,2,0,0,2,0],2))}}const W0=new V0;class ya{constructor(t){this._mesh=new at(W0,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,G0)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class X0 extends Ki{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof we?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=xs.clone(t.uniforms),this.material=new we({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new ya(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Hl extends Ki{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class q0 extends Ki{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class $0{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new _t);this._width=n.width,this._height=n.height,e=new Ze(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:dn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new X0(Qc),this.copyPass.material.blending=Rn,this.clock=new H0}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Hl!==void 0&&(o instanceof Hl?n=!0:o instanceof q0&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new _t);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Y0 extends Ki{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new St}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const j0={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new St(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class qi extends Ki{constructor(t,e,n,s){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new _t(t.x,t.y):new _t(256,256),this.clearColor=new St(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Ze(r,o,{type:dn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new Ze(r,o,{type:dn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const p=new Ze(r,o,{type:dn});p.texture.name="UnrealBloomPass.v"+u,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),r=Math.round(r/2),o=Math.round(o/2)}const a=j0;this.highPassUniforms=xs.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new we({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new _t(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Qc;this.copyUniforms=xs.clone(h.uniforms),this.blendMaterial=new we({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:hn,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new St,this.oldClearAlpha=1,this.basic=new Be,this.fsQuad=new ya(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new _t(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=qi.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=qi.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new we({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new _t(.5,.5)},direction:{value:new _t(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new we({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}qi.BlurDirectionX=new _t(1,0);qi.BlurDirectionY=new _t(0,1);const K0={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Z0 extends Ki{constructor(){super();const t=K0;this.uniforms=xs.clone(t.uniforms),this.material=new F0({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new ya(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Vt.getTransfer(this._outputColorSpace)===Zt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===uc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===dc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===fc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ra?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===pc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===mc&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Q0 extends qc{constructor(){super();const t=new Ne;t.deleteAttribute("uv");const e=new be({side:Ue}),n=new be,s=new Zc(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new at(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const o=new at(t,n);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const a=new at(t,n);a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),this.add(a);const l=new at(t,n);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const c=new at(t,n);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);const h=new at(t,n);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);const u=new at(t,n);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);const d=new at(t,Ui(50));d.position.set(-16.116,14.37,8.208),d.scale.set(.1,2.428,2.739),this.add(d);const p=new at(t,Ui(50));p.position.set(-16.109,18.021,-8.207),p.scale.set(.1,2.425,2.751),this.add(p);const g=new at(t,Ui(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);const _=new at(t,Ui(43));_.position.set(-.462,8.89,14.52),_.scale.set(4.38,5.441,.088),this.add(_);const m=new at(t,Ui(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const f=new at(t,Ui(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function Ui(i){const t=new Be;return t.color.setScalar(i),t}function J0(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new Me;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in u.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in u.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(u.morphAttributes[p])}if(t){let p;if(e)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,h),c+=p}}if(e){let h=0;const u=[];for(let d=0;d<i.length;++d){const p=i[d].index;for(let g=0;g<p.count;++g)u.push(p.getX(g)+h);h+=i[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=Gl(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const p=[];for(let _=0;_<o[h].length;++_)p.push(o[h][_][d]);const g=Gl(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Gl(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new ze(o,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let d=0,p=h.count;d<p;d++)for(let g=0;g<e;g++){const _=h.getComponent(d,g);a.setComponent(d+u,g,_)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function yr(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function tg(i,t){const e=yr(i),n=new Float32Array(t*t);for(let r=0;r<n.length;r++)n[r]=e();const s=(r,o)=>n[(o%t+t)%t*t+(r%t+t)%t];return(r,o)=>{const a=r*t,l=o*t,c=Math.floor(a),h=Math.floor(l),u=a-c,d=l-h,p=u*u*(3-2*u),g=d*d*(3-2*d),_=s(c,h)+(s(c+1,h)-s(c,h))*p,m=s(c,h+1)+(s(c+1,h+1)-s(c,h+1))*p;return _+(m-_)*g}}function Wn(i,t,e){const n=Array.from({length:t},(s,r)=>tg(i+r*101,e<<r));return(s,r)=>{let o=0,a=.5,l=0;for(const c of n)o+=c(s,r)*a,l+=a,a*=.5;return o/l}}function Fe(i,t){const e=document.createElement("canvas");return e.width=i,e.height=t,[e,e.getContext("2d")]}function Sr(i,t,e,n){const[s,r]=Fe(t,e),o=r.createImageData(t,e),a=(l,c)=>i[(c+e)%e*t+(l+t)%t];for(let l=0;l<e;l++)for(let c=0;c<t;c++){const h=(a(c+1,l)-a(c-1,l))*n,u=(a(c,l+1)-a(c,l-1))*n,d=Math.hypot(h,u,1),p=(l*t+c)*4;o.data[p]=(-h/d*.5+.5)*255,o.data[p+1]=(u/d*.5+.5)*255,o.data[p+2]=(1/d*.5+.5)*255,o.data[p+3]=255}return r.putImageData(o,0,0),s}function ys(i,t,e,n){const[s,r]=Fe(t,e),o=r.createImageData(t,e);for(let a=0;a<t*e;a++){const l=Math.max(0,Math.min(255,n(i[a])*255));o.data[a*4]=l,o.data[a*4+1]=l,o.data[a*4+2]=l,o.data[a*4+3]=255}return r.putImageData(o,0,0),s}function Pe(i,t,e){const n=new qn(i);return n.wrapS=n.wrapT=hr,n.colorSpace=t?fe:wn,n.anisotropy=e,n.generateMipmaps=!0,n.needsUpdate=!0,n}function eg(i,t){const e=Wn(11,5,4),n=Wn(23,3,64),s=Wn(37,3,2),r=new Float32Array(i*i),[o,a]=Fe(i,i),l=a.createImageData(i,i);for(let h=0;h<i;h++)for(let u=0;u<i;u++){const d=u/i,p=h/i,g=e(d,p),_=n(d,p),m=s(d,p),f=g*.6+_*.4;r[h*i+u]=f;const y=.74+(g-.5)*.16+(_-.5)*.06-Math.max(0,m-.62)*.5,b=(h*i+u)*4;l.data[b]=205*y,l.data[b+1]=203*y,l.data[b+2]=194*y,l.data[b+3]=255}a.putImageData(l,0,0);const c=yr(5);a.strokeStyle="rgba(60,58,52,0.35)",a.lineWidth=.8;for(let h=0;h<5;h++){let u=c()*i,d=c()*i;a.beginPath(),a.moveTo(u,d);let p=c()*Math.PI*2;for(let g=0;g<18;g++){p+=(c()-.5)*1.1,u+=Math.cos(p)*6,d+=Math.sin(p)*6,a.lineTo(u,d);const _=Math.floor((u%i+i)%i),m=Math.floor((d%i+i)%i);r[m*i+_]-=.25}a.stroke()}return{map:Pe(o,!0,t),normalMap:Pe(Sr(r,i,i,2.2),!1,t),roughnessMap:Pe(ys(r,i,i,h=>.82+(.5-h)*.2),!1,t)}}function ng(i,t){const e=Wn(41,5,4),n=Wn(53,3,48),s=yr(77),r=[0,1,2,3].map(()=>.82+s()*.22),o=[0,1,2,3].map(()=>s()*.06-.03),a=new Float32Array(i*i),l=new Float32Array(i*i),[c,h]=Fe(i,i),u=h.createImageData(i,i),d=i/2,p=i*.018;for(let g=0;g<i;g++)for(let _=0;_<i;_++){const m=_/i,f=g/i,y=_<d?0:1,b=g<d?0:1,M=_-y*d,P=g-b*d,T=Math.min(M,P,d-M,d-P),A=(e(m*2,f*2)-.5)*i*.012,w=T+A,x=w<p,v=Math.min(1,Math.max(0,(w-p)/(i*.03))),C=e(m,f),N=n(m,f),I=Math.max(0,1-Math.hypot(M-d/2,P-d/2)/(d*.55)),W=r[b*2+y];let $=x?.42:W*(.78+(C-.5)*.35+(N-.5)*.12)*(.82+.18*v)+I*.05;$=Math.max(0,$);const z=(g*i+_)*4,Y=o[b*2+y];u.data[z]=138*$*(1+Y),u.data[z+1]=134*$,u.data[z+2]=126*$*(1-Y),u.data[z+3]=255,a[g*i+_]=x?0:.55*v+(C-.5)*.25+(N-.5)*.1,l[g*i+_]=x?1:.86-I*.3+(N-.5)*.1}h.putImageData(u,0,0);for(let g=0;g<40;g++)h.fillStyle=`rgba(${s()<.5?"40,38,34":"190,186,176"},${.08+s()*.12})`,h.beginPath(),h.arc(s()*i,s()*i,1+s()*3,0,Math.PI*2),h.fill();return{map:Pe(c,!0,t),normalMap:Pe(Sr(a,i,i,3.2),!1,t),roughnessMap:Pe(ys(l,i,i,g=>g),!1,t)}}function ig(i,t){const e=Wn(91,4,3),n=new Float32Array(i*i),[s,r]=Fe(i,i),o=r.createImageData(i,i);for(let a=0;a<i;a++)for(let l=0;l<i;l++){const c=l/i,h=a/i,u=e(c,h*.25)*6,d=.5+.5*Math.sin((c*26+u)*Math.PI),p=.5+.5*Math.sin((c*140+u*4)*Math.PI),g=d*.6+p*.4;n[a*i+l]=g*.4;const _=(a*i+l)*4,m=.55+g*.45;o.data[_]=62*m,o.data[_+1]=36*m,o.data[_+2]=24*m,o.data[_+3]=255}return r.putImageData(o,0,0),{map:Pe(s,!0,t),normalMap:Pe(Sr(n,i,i,.8),!1,t),roughnessMap:Pe(ys(n,i,i,a=>.38+a*.3),!1,t)}}function sg(i,t){const e=Wn(131,3,8),n=new Float32Array(i*i),[s,r]=Fe(i,i),o=r.createImageData(i,i);for(let a=0;a<i;a++)for(let l=0;l<i;l++){const c=(Math.sin(l*1.6)*Math.sin(a*1.6)+1)*.5,h=e(l/i,a/i);n[a*i+l]=c*.5+h*.5;const u=.8+c*.12+(h-.5)*.25,d=(a*i+l)*4;o.data[d]=58*u,o.data[d+1]=68*u,o.data[d+2]=82*u,o.data[d+3]=255}return r.putImageData(o,0,0),{map:Pe(s,!0,t),normalMap:Pe(Sr(n,i,i,1.4),!1,t),roughnessMap:Pe(ys(n,i,i,()=>.95),!1,t)}}function rg(i,t){const e=Wn(171,4,4),n=new Float32Array(i*i);for(let s=0;s<i;s++)for(let r=0;r<i;r++)n[s*i+r]=e(r/i,s/i);return Pe(ys(n,i,i,s=>.25+Math.max(0,s-.45)*.9),!1,t)}function og(i,t){const[e,n]=Fe(i,i);n.fillStyle="#3d4247",n.fillRect(0,0,i,i),n.strokeStyle="rgba(190,196,200,0.38)",n.lineWidth=i/128;const s=i/8;for(let r=-8;r<=16;r++)n.beginPath(),n.moveTo(r*s,0),n.lineTo(r*s+i,i),n.stroke();return Pe(e,!0,t)}function ag(){const[i,t]=Fe(256,256);t.fillStyle="#e4e8e1",t.fillRect(0,0,256,256);const e=yr(201);for(let n=0;n<900;n++)t.fillStyle=`rgba(80,90,90,${e()*.05})`,t.fillRect(e()*256,e()*256,2,2);t.strokeStyle="rgba(106,91,214,0.75)",t.lineWidth=3,t.lineCap="round";for(let n=0;n<6;n++){const s=40+n*32;t.beginPath();let r=28;t.moveTo(r,s);const o=200+e()*30-(n===5?90:0);for(;r<o;)r+=6+e()*6,t.lineTo(r,s+(e()-.5)*8);t.stroke()}return t.strokeStyle="rgba(35,39,44,0.35)",t.lineWidth=1,t.strokeRect(10,10,236,236),Pe(i,!0,4)}function Vl(i,t=128){const[e,n]=Fe(t,t),s=n.createRadialGradient(t/2,t/2,0,t/2,t/2,t/2);for(const[o,a]of i)s.addColorStop(o,a);n.fillStyle=s,n.fillRect(0,0,t,t);const r=new qn(e);return r.colorSpace=fe,r}function lg(){const[i,t]=Fe(128,128),e=t.createRadialGradient(64,64,0,64,64,64);e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.15,"rgba(255,240,210,0.6)"),e.addColorStop(1,"rgba(255,240,210,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),t.globalCompositeOperation="lighter";for(const[s,r]of[[128,3],[3,128]]){const o=t.createLinearGradient(64-s/2,64-r/2,64+s/2,64+r/2);o.addColorStop(0,"rgba(255,255,255,0)"),o.addColorStop(.5,"rgba(255,255,255,0.9)"),o.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=o,t.fillRect(64-s/2,64-r/2,s,r)}const n=new qn(i);return n.colorSpace=fe,n}function cg(){const[i,t]=Fe(256,256);t.strokeStyle="rgba(255,255,255,1)",t.lineWidth=7,t.beginPath(),t.arc(128,128,104,0,Math.PI*2),t.stroke(),t.lineWidth=3,t.setLineDash([10,12]),t.beginPath(),t.arc(128,128,88,0,Math.PI*2),t.stroke();const e=new qn(i);return e.colorSpace=fe,e}function hg(){const[i,t]=Fe(256,256),e=t.createRadialGradient(128,128,10,128,128,150);e.addColorStop(0,"rgba(255,255,255,0.55)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(14,14,228,228),t.strokeStyle="rgba(255,255,255,0.65)",t.lineWidth=3,t.strokeRect(22,22,212,212),t.lineWidth=6,t.beginPath(),t.moveTo(128,70),t.lineTo(186,128),t.lineTo(128,186),t.lineTo(70,128),t.closePath(),t.stroke();const n=new qn(i);return n.colorSpace=fe,n}function ug(){const[i,t]=Fe(128,128);t.strokeStyle="rgba(255,255,255,1)",t.lineWidth=12,t.lineCap="round",t.beginPath(),t.moveTo(36,36),t.lineTo(92,92),t.moveTo(92,36),t.lineTo(36,92),t.stroke();const e=new qn(i);return e.colorSpace=fe,e}function dg(i){const[t,e]=Fe(512,512);e.fillStyle="#0d1013",e.fillRect(0,0,512,512),e.strokeStyle="rgba(127,216,255,0.10)",e.lineWidth=1;for(let n=0;n<=512;n+=32)e.beginPath(),e.moveTo(n+.5,0),e.lineTo(n+.5,512),e.moveTo(0,n+.5),e.lineTo(512,n+.5),e.stroke();return e.strokeStyle="rgba(127,216,255,0.2)",e.lineWidth=2,e.strokeRect(1,1,510,510),Pe(t,!0,i)}function Ks(i){const[t,e]=Fe(128,128);if(e.fillStyle="#2b2116",e.fillRect(0,0,128,128),e.strokeStyle="#e9c77a",e.fillStyle="#e9c77a",e.lineWidth=10,e.lineCap="round",e.beginPath(),i==="rollL"||i==="rollR"){const s=i==="rollR";e.arc(64,64,34,s?Math.PI*.85:Math.PI*.15,s?Math.PI*2.4:-Math.PI*1.4,!s),e.stroke();const r=s?Math.PI*2.4:-Math.PI*1.4,o=64+Math.cos(r)*34,a=64+Math.sin(r)*34;e.beginPath(),e.arc(o,a,12,0,Math.PI*2),e.fill()}else{const s=i==="pitchB";e.moveTo(64,s?104:24),e.lineTo(64,s?30:98),e.stroke(),e.beginPath(),e.moveTo(40,s?50:78),e.lineTo(64,s?22:106),e.lineTo(88,s?50:78),e.stroke()}const n=new qn(t);return n.colorSpace=fe,n}function fg(i,t){const e=i==="low"?256:512,n=Math.min(t,i==="high"?8:4),s={plaster:eg(e,n),stone:ng(e,n),wood:ig(256,n),fabric:sg(128,n),brassRough:rg(128,n),poche:og(256,n),paper:ag(),dot:Vl([[0,"rgba(255,255,255,1)"],[.4,"rgba(255,255,255,0.35)"],[1,"rgba(255,255,255,0)"]],64),glint:lg(),blob:Vl([[0,"rgba(0,0,0,0.75)"],[.55,"rgba(0,0,0,0.35)"],[1,"rgba(0,0,0,0)"]]),ring:cg(),walk:hg(),cross:ug(),grid:dg(n),glyphs:{rollL:Ks("rollL"),rollR:Ks("rollR"),pitchA:Ks("pitchA"),pitchB:Ks("pitchB")},all:[]},r=[];for(const o of Object.values(s))if(o instanceof Te)r.push(o);else if(o&&typeof o=="object"&&!Array.isArray(o))for(const a of Object.values(o))a instanceof Te&&r.push(a);return s.all=r,s}const me={lampBlack:724240,brass:12817989,seam:8378623,pencil:6970326,lantern:16756848};function pg(i,t){const e=new be({map:i.plaster.map,normalMap:i.plaster.normalMap,normalScale:new _t(.6,.6),roughnessMap:i.plaster.roughnessMap,roughness:1,metalness:0,vertexColors:!0}),n=new be({map:i.stone.map,normalMap:i.stone.normalMap,normalScale:new _t(.9,.9),roughnessMap:i.stone.roughnessMap,roughness:1,metalness:0,vertexColors:!0}),s=new be({map:i.poche,roughness:.95,metalness:0,color:16777215}),r=e.clone();r.color=new St(.8,.8,.8);const o=new be({color:me.brass,metalness:1,roughness:.42,roughnessMap:i.brassRough}),a=new be({color:8018474,metalness:1,roughness:.55,roughnessMap:i.brassRough}),l=new Jo({map:i.wood.map,normalMap:i.wood.normalMap,roughnessMap:i.wood.roughnessMap,roughness:1,clearcoat:.8,clearcoatRoughness:.25}),c=new be({map:i.fabric.map,normalMap:i.fabric.normalMap,roughness:.95,metalness:0,color:16777215}),h=new be({color:14474968,roughness:.35,metalness:0,emissive:3811866,emissiveIntensity:.25}),u=new be({color:16766624,emissive:new St(me.lantern),emissiveIntensity:2.6,roughness:.3,transparent:!0,opacity:.9}),d=new Be({color:new St(1,.75,.45).multiplyScalar(5)}),p=new Be({color:new St(me.seam).multiplyScalar(1.2),toneMapped:!0}),g=new Jo({color:14674158,roughness:.55,metalness:0,transmission:t?.9:0,thickness:.05,transparent:!t,opacity:t?1:.55,emissive:new St(16763024),emissiveIntensity:0}),_=new be({map:i.stone.map,roughness:.7,metalness:0,color:12104360}),m=new be({map:i.paper,roughness:.85,side:je,emissive:new St(14673118),emissiveIntensity:.12,emissiveMap:i.paper}),f=new Be({map:i.grid,color:16777215,fog:!0});return{plaster:e,stone:n,poche:s,backWall:r,brass:o,darkBrass:a,wood:l,cloak:c,porcelain:h,glassWarm:u,flame:d,seam:p,frosted:g,plateStone:_,paper:m,grid:f,all:[e,n,s,r,o,a,l,c,h,u,d,p,g,_,m,f]}}const mg=0,gg=1,_g=2,vg=[.42,.62,.82,1];function Sn(i,t,e,n,s,r=new L){const o=i.rooms[t];return r.set(e-(o.w-1)/2,-(n-(o.h-1)/2),-(s-(o.d-1)/2))}function Wl(i,t=new L){return t.set(i[0],-i[1],-i[2])}function xg(i,t){const e=i.rooms[t],n=(f,y,b)=>f>=0&&y>=0&&b>=0&&f<e.w&&y<e.h&&b<e.d&&e.solid[f+e.w*(y+e.h*b)]===1,s=(f,y,b)=>f>=0&&y>=0&&b>=0&&f<e.w&&y<e.h&&b<e.d,r=[0,1,2].map(()=>({pos:[],nor:[],uv:[],col:[],idx:[]})),o=(e.w-1)/2,a=(e.h-1)/2,l=(e.d-1)/2,c=(f,y,b,M,P)=>{const T=r[f],A=[0,0,0];A[b]=M;const w=(b+1)%3,x=(b+2)%3,v=[y[0]+A[0],y[1]+A[1],y[2]+A[2]],C=[[-1,-1],[1,-1],[1,1],[-1,1]],N=T.pos.length/3,I=[];for(const[tt,st]of C){const vt=[y[0]+A[0]*.5,y[1]+A[1]*.5,y[2]+A[2]*.5];vt[w]+=tt*.5,vt[x]+=st*.5,T.pos.push(vt[0]-o,-(vt[1]-a),-(vt[2]-l)),T.nor.push(A[0],-A[1],-A[2]);const Bt=(vt[w]+.5)*.5,j=(vt[x]+.5)*.5;T.uv.push(Bt,j);let et=3;if(P){const rt=[...v];rt[w]+=tt;const wt=[...v];wt[x]+=st;const Rt=[...v];Rt[w]+=tt,Rt[x]+=st;const Nt=n(rt[0],rt[1],rt[2])?1:0,te=n(wt[0],wt[1],wt[2])?1:0,kt=n(Rt[0],Rt[1],Rt[2])?1:0;et=Nt&&te?0:3-(Nt+te+kt)}I.push(et);const ft=vg[et];T.col.push(ft,ft,ft)}const W=tt=>new L(T.pos[(N+tt)*3],T.pos[(N+tt)*3+1],T.pos[(N+tt)*3+2]),$=new L(A[0],-A[1],-A[2]),Y=new L().subVectors(W(1),W(0)).cross(new L().subVectors(W(2),W(0))).dot($)<0;let X=I[0]+I[2]<I[1]+I[3]?[1,2,3,1,3,0]:[0,1,2,0,2,3];Y&&(X=[X[0],X[2],X[1],X[3],X[5],X[4]]);for(const tt of X)T.idx.push(N+tt)};for(let f=0;f<e.d;f++)for(let y=0;y<e.h;y++)for(let b=0;b<e.w;b++)if(n(b,y,f))for(let M=0;M<3;M++)for(const P of[1,-1]){const T=b+(M===0?P:0),A=y+(M===1?P:0),w=f+(M===2?P:0);if(s(T,A,w)){if(n(T,A,w))continue;c(M===1?gg:mg,[b,y,f],M,P,!0)}else e.d===1&&M===2&&P===-1&&c(_g,[b,y,f],M,P,!1)}const h=new Me,u=[],d=[],p=[],g=[],_=[];let m=0;return r.forEach((f,y)=>{const b=u.length/3;u.push(...f.pos),d.push(...f.nor),p.push(...f.uv),g.push(...f.col);for(const M of f.idx)_.push(M+b);h.addGroup(m,f.idx.length,y),m+=f.idx.length}),h.setAttribute("position",new qt(u,3)),h.setAttribute("normal",new qt(d,3)),h.setAttribute("uv",new qt(p,2)),h.setAttribute("color",new qt(g,3)),h.setIndex(_),h.computeBoundingSphere(),h}function Mg(i,t){const e=i.rooms[t];if(e.d!==1)return null;const n=new Xe(e.w,e.h,1,1),s=n.getAttribute("uv");for(let o=0;o<s.count;o++)s.setXY(o,s.getX(o)*e.w*.5,s.getY(o)*e.h*.5);const r=new Float32Array(s.count*3).fill(.85);return n.setAttribute("color",new ze(r,3)),n.translate(0,0,-.5),n}function $n(i){return()=>{for(const t of i)t.dispose()}}const ta=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;function ae(i,t=!0){return i.castShadow=t,i.receiveShadow=!0,i}function yg(i){const t=[me.pencil,5941247,13073919,5628096],e=i.charCodeAt(0)-97;return new St(t[(e%4+4)%4])}function Sg(i){const t=document.createElement("canvas");t.width=t.height=128;const e=t.getContext("2d");e.fillStyle="#2b2116",e.fillRect(0,0,128,128),e.strokeStyle="#e9c77a",e.lineWidth=6,e.strokeRect(8,8,112,112),e.fillStyle="#f1d38d",e.font='600 84px "Barlow Condensed", "Arial Narrow", sans-serif',e.textAlign="center",e.textBaseline="middle",e.fillText(i,64,70);const n=new qn(t);return n.colorSpace=fe,n}function bg(i){const t=[],e=v=>(t.push(v),v),n=new he,s=new he;n.add(s);const r=[[0,0],[.19,0],[.205,.03],[.18,.14],[.15,.27],[.12,.38],[.095,.46],[.06,.5],[0,.51]].map(([v,C])=>new _t(v,C)),o=ae(new at(e(new _a(r,28)),i.cloak));s.add(o);const a=ae(new at(e(new Gn(.085,20,16)),i.porcelain));a.position.set(0,.575,.012),s.add(a);const l=ae(new at(e(new Gn(.105,20,14,Math.PI*.18,Math.PI*1.64,0,Math.PI*.62)),i.cloak));l.material=i.cloak,l.position.set(0,.565,-.008),l.rotation.y=Math.PI,s.add(l);const c=ae(new at(e(new pr(.05,.12,14)),i.cloak));c.position.set(0,.66,-.05),c.rotation.x=-.7,s.add(c);const h=e(new Gn(.011,8,6));for(const v of[-.03,.03]){const C=new at(h,i.flame);C.position.set(v,.585,.09),s.add(C)}const u=ae(new at(e(new ke(.03,.038,.24,10)),i.cloak));u.position.set(.15,.38,.06),u.rotation.set(.55,0,.55),s.add(u);const d=new he;d.position.set(.22,.3,.13),s.add(d);const p=new he;p.position.y=-.03,d.add(p);const g=new at(e(new hi(.035,.005,6,16,Math.PI)),i.brass);g.position.y=-.005,p.add(g);const _=new at(e(new pr(.05,.04,8)),i.brass);_.position.y=-.03,p.add(_);const m=i.glassWarm.clone(),f=new at(e(new ke(.036,.036,.075,12)),m);f.position.y=-.088,p.add(f);const y=e(new ke(.005,.005,.08,5));for(let v=0;v<4;v++){const C=new at(y,i.brass),N=v/4*Math.PI*2+Math.PI/4;C.position.set(Math.cos(N)*.04,-.088,Math.sin(N)*.04),p.add(C)}const b=new at(e(new ke(.045,.05,.016,12)),i.brass);b.position.y=-.132,p.add(b);const M=new at(e(new Gn(.014,8,8)),i.flame);M.position.y=-.09,M.scale.y=1.6,p.add(M);const P=new ge;P.position.set(0,-.09,0),p.add(P);let T=0,A=0,w=0,x=0;return{root:n,body:s,lanternPivot:d,lanternLightAnchor:P,glass:m,update(v,C,N,I,W,$){let z=I-A;for(;z>Math.PI;)z-=Math.PI*2;for(;z<-Math.PI;)z+=Math.PI*2;A+=z*(1-Math.exp(-C*18)),s.rotation.y=A,T+=N*C*Math.PI*2;const Y=Math.min(1,N*.6),D=W?Math.abs(Math.sin(T))*.028*Y:0;s.position.y=D,s.rotation.z=W?Math.sin(T)*.05*Y:0,s.scale.set(1+$*.06,1-$*.06,1+$*.06);const X=-z*2.2+(W?Math.cos(T)*Y*.6:0);x+=(-w*40-x*4+X*6)*C,w+=x*C,W||(w=0),d.rotation.x=w*.5,d.rotation.z=w*.35;const tt=W?.93+.07*Math.sin(v*13.1)*Math.sin(v*7.3+1.2):1;m.emissiveIntensity=2.6*tt,M.scale.set(1,1.6*(.9+.1*tt),1)},dispose:()=>{for(const v of t)v.dispose();m.dispose()}}}function Eg(i,t,e,n){switch(i.kind){case"crystal":return wg(i,e,n);case"shard":return Tg(i,t,e);case"exit":return Ag(i,t,n);case"portal":return Pg(i,t);case"lever":return Lg(i,t,e);case"switch":return Dg(i,t);case"plate":return Ig(i,t);default:return Ug(i,t)}}function Jc(i,t){const e=new $c({map:i.glint,color:t,blending:hn,transparent:!0,depthWrite:!1,opacity:0}),n=new U0(e);return n.scale.set(.34,.34,1),[n,e]}function wg(i,t,e){const n=new he,s=new he;s.position.y=.46,n.add(s);const r=new xa(1,0),o=new Jo({color:15774810,emissive:new St(13666858),emissiveIntensity:.55,roughness:.08,metalness:0,clearcoat:1,ior:1.55,transmission:e?.65:0,thickness:.25,flatShading:!0}),a=ae(new at(r,o));a.scale.set(.13,.24,.13),s.add(a);const l=new Be({color:new St(1,.72,.32).multiplyScalar(2.2)}),c=new at(r,l);c.scale.set(.045,.085,.045),s.add(c);const[h,u]=Jc(t,16769704);h.position.set(.05,.62,.06),n.add(h);let d=0;return{obj:i,mount:"gravity",root:n,focusY:.46,update(p){const g=p.effects?Math.sin(p.time*1.8+i.id)*.035:0;s.position.y=.46+g+d*.3,s.rotation.y+=p.effects?p.dt*.8:0,d=p.active?Math.min(1,d+p.dt/.45):0;const _=1-ta(d);s.scale.setScalar(Math.max(1e-4,_)),s.visible=_>.001,o.emissiveIntensity=(p.highlighted?.9:.55)+d*2;const m=(p.time*.35+i.id*.37)%1;u.opacity=p.active?0:m<.08?Math.sin(m/.08*Math.PI)*.9:0,h.material.rotation=p.time*.5},trigger(){},dispose:$n([r,o,l,u])}}function Tg(i,t,e){const n=new he,s=new he;s.position.y=.42,n.add(s);const r=new Xe(.2,.26),o=ae(new at(r,t.paper));o.position.x=-.045,o.rotation.y=.5;const a=ae(new at(r,t.paper));a.position.x=.045,a.rotation.y=-.5,s.add(o,a);const[l,c]=Jc(e,15266047);l.position.set(.04,.6,.05),n.add(l);let h=0;return{obj:i,mount:"gravity",root:n,focusY:.42,update(u){h=u.active?Math.min(1,h+u.dt/.5):0,s.position.y=.42+(u.effects?Math.sin(u.time*1.3+2)*.03:0)+ta(h)*.5,s.rotation.y=u.effects?Math.sin(u.time*.6)*.5:.3;const d=.5+ta(h)*1;o.rotation.y=d,a.rotation.y=-d,s.visible=h<1;const p=(u.time*.3+.5)%1;c.opacity=u.active?0:p<.1?Math.sin(p/.1*Math.PI)*.8:0},trigger(){},dispose:$n([r,c])}}function Ag(i,t,e){const n=new he,s=new hi(.36,.032,12,48),r=new hi(.27,.014,8,40),o=new Mr(.34,40),a=new ke(.26,.3,.05,28),l=new Ne(.62,.04,.04),c=ae(new at(s,t.brass));c.position.y=.46;const h=ae(new at(r,t.brass));h.position.y=.46;const u=t.frosted.clone();u.transmission=e?.85:0;const d=new at(o,u);d.position.y=.46;const p=ae(new at(a,t.darkBrass));p.position.y=.025;const g=ae(new at(l,t.brass));g.position.set(0,.46,.04),n.add(c,h,d,p,g);let _=0;return{obj:i,mount:"gravity",root:n,focusY:.46,update(m){_+=((m.active?1:0)-_)*(1-Math.exp(-m.dt*6)),g.visible=_<.5,g.scale.x=1-_;const f=m.effects?.15*Math.sin(m.time*2.4):0;u.emissiveIntensity=.05+_*(1.25+f),h.rotation.z=m.effects?m.time*.4*_:0},trigger(){},dispose:$n([s,r,o,a,l,u])}}const Xl=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,Rg=`
uniform float uTime;
uniform vec3 uColor;
uniform float uStrength;
varying vec2 vUv;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = length(p);
  if (r > 1.0) discard;
  float a = atan(p.y, p.x + 1e-4);
  float swirl = noise(vec2(a * 2.0 + uTime * 0.6 + r * 4.0, r * 5.0 - uTime * 0.9));
  float bands = 0.5 + 0.5 * sin(r * 18.0 - uTime * 2.2 + swirl * 4.0);
  float rim = smoothstep(0.7, 1.0, r);
  float core = 1.0 - smoothstep(0.0, 0.9, r);
  float lum = (0.25 + 0.55 * swirl * bands) * (0.4 + 0.6 * core) + rim * 0.9;
  gl_FragColor = vec4(uColor * lum * uStrength, clamp((0.35 + 0.5 * lum) * (1.0 - smoothstep(0.92, 1.0, r)), 0.0, 1.0));
}`,Cg=`
uniform vec3 uColor;
uniform float uStrength;
uniform float uTime;
varying vec2 vUv;
void main() {
  float fade = pow(clamp(1.0 - vUv.y, 0.0, 1.0), 1.6);
  float flick = 0.85 + 0.15 * sin(uTime * 1.3 + vUv.x * 40.0);
  float edge = sin(vUv.x * 3.14159 * 2.0) * 0.5 + 0.5;
  gl_FragColor = vec4(uColor * uStrength * fade * flick * (0.55 + 0.45 * edge), 1.0);
}`;function Pg(i,t){const e=new he,n=yg(i.ch),s=new hi(.33,.03,12,48),r=new Mr(.31,48),o=new ke(.2,.24,.05,24),a=new Xe(.12,.12),l=new ke(.62,.3,2.4,32,1,!0);l.translate(0,1.2,0);const c=i.secret?.35:1,h=new we({uniforms:{uTime:{value:0},uColor:{value:n.clone().multiplyScalar(1.8)},uStrength:{value:c}},vertexShader:Xl,fragmentShader:Rg,transparent:!0,depthWrite:!1,blending:hn,side:je}),u=new we({uniforms:{uTime:{value:0},uColor:{value:n.clone().multiplyScalar(.22)},uStrength:{value:c}},vertexShader:Xl,fragmentShader:Cg,transparent:!0,depthWrite:!1,blending:hn,side:je}),d=ae(new at(s,i.secret?t.darkBrass:t.brass));d.position.y=.44;const p=new at(r,h);p.position.y=.44;const g=ae(new at(o,t.darkBrass));g.position.y=.025,e.add(d,p,g);const _=new at(l,u);_.position.y=.05,e.add(_);let m=null,f=null;if(!i.secret){m=Sg(i.ch.toUpperCase()),f=new be({map:m,metalness:.6,roughness:.45});const y=new at(a,f);y.position.set(0,.055,.205),y.rotation.x=-.6,e.add(y)}return{obj:i,mount:"gravity",root:e,focusY:.44,update(y){h.uniforms.uTime.value=y.effects?y.time:0,u.uniforms.uTime.value=y.effects?y.time:0,p.rotation.z=0},trigger(){},dispose:()=>{$n([s,r,o,a,l,h,u,...f?[f]:[]])(),m?.dispose()}}}function Lg(i,t,e){const n=new he,s=new Ne(.4,.05,.28),r=new Xe(.13,.13),o=new ke(.045,.045,.16,16),a=new ke(.018,.022,.36,10);a.translate(0,.18,0);const l=new Gn(.04,14,10),c=ae(new at(s,t.darkBrass));c.position.y=.025;const h=new be({map:e.glyphs[i.fold],metalness:.5,roughness:.5,emissive:new St(12817989),emissiveMap:e.glyphs[i.fold],emissiveIntensity:.15}),u=new at(r,h);u.rotation.x=-Math.PI/2,u.position.set(.11,.052,.03);const d=ae(new at(o,t.brass));d.rotation.z=Math.PI/2,d.position.set(-.06,.08,0);const p=new he;p.position.set(-.06,.08,0);const g=ae(new at(a,t.wood)),_=ae(new at(l,t.brass));_.position.y=.37,p.add(g,_),n.add(c,u,d,p);let m=-1,f=-.65;return{obj:i,mount:"fixed",root:n,focusY:.2,update(y){const b=m*.65;f=y.effects?f+(b-f)*(1-Math.exp(-y.dt*16)):b,p.rotation.x=f,h.emissiveIntensity=y.highlighted?.6:.15},trigger(){m=-m},dispose:$n([s,r,o,a,l,h])}}function Dg(i,t){const e=new he,n=new Ne(.2,.26,.14),s=new ke(.014,.014,.16,8);s.translate(0,.08,0);const r=new Gn(.03,12,10),o=ae(new at(n,t.wood));o.position.y=.13;const a=ae(new at(new Ne(.16,.02,.1),t.brass));a.position.y=.27;const l=new he;l.position.set(0,.28,0);const c=ae(new at(s,t.brass));l.add(c);const h=new be({color:3358792,emissive:new St(me.seam),emissiveIntensity:0,roughness:.2}),u=new at(r,h);u.position.set(0,.19,.075),e.add(o,a,l,u);let d=-.5;return{obj:i,mount:"fixed",root:e,focusY:.25,update(p){const g=p.active?.5:-.5;d=p.effects?d+(g-d)*(1-Math.exp(-p.dt*20)):g,l.rotation.x=d,h.emissiveIntensity=p.active?2.2:p.highlighted?.3:.05},trigger(){},dispose:$n([n,s,r,h,a.geometry])}}function Ig(i,t){const e=new he,n=new ke(.3,.3,.045,32),s=new hi(.31,.018,8,40),r=ae(new at(n,t.plateStone)),o=new be({color:me.brass,metalness:1,roughness:.35,emissive:new St(me.seam),emissiveIntensity:0}),a=ae(new at(s,o));a.rotation.x=Math.PI/2,a.position.y=.02,e.add(r,a);let l=0;return{obj:i,mount:"fixed",root:e,focusY:.05,update(c){const h=c.active?1:0;l=c.effects?l+(h-l)*(1-Math.exp(-c.dt*14)):h,r.position.y=.03-l*.035,o.emissiveIntensity=l*1.6},trigger(){},dispose:$n([n,s,o])}}function Ug(i,t){const e=new he,n=new he;e.add(n);const s=new Ne(.98,.98,.98),r=ae(new at(s,t.wood));n.add(r);const o=new Be({color:new St(me.seam).multiplyScalar(1.6)}),a=new Ne(.03,.9,.03),l=new Xe(.5,.5),c=t.frosted.clone();c.emissiveIntensity=.25;for(const h of[.5,-.5]){const u=new at(a,o);u.position.set(0,0,h*.99),n.add(u);const d=new at(l,c);d.position.set(0,0,h*1.002),h<0&&(d.rotation.y=Math.PI),n.add(d)}for(const h of[.5,-.5]){const u=new at(l,c);u.position.set(h*1.002,0,0),u.rotation.y=h>0?Math.PI/2:-Math.PI/2,n.add(u)}return{obj:i,mount:"cell",root:e,focusY:0,update(){},trigger(){},dispose:$n([s,o,a,l,c])}}function Ng(i){return i.root.children[0]}const Hn={low:{pixelRatio:1,shadows:!1,shadowSize:0,bloom:!1,dust:0,transmission:!1},medium:{pixelRatio:1.5,shadows:!0,shadowSize:512,bloom:!0,dust:140,transmission:!1},high:{pixelRatio:2,shadows:!0,shadowSize:1024,bloom:!0,dust:320,transmission:!0}};function ql(i){let t="";try{const a=i.getExtension("WEBGL_debug_renderer_info");a&&(t=String(i.getParameter(a.UNMASKED_RENDERER_WEBGL)??""))}catch{}const e=t.toLowerCase();if(/swiftshader|llvmpipe|software|basic render/.test(e))return"low";const n=navigator,s=n.hardwareConcurrency??4,r=n.deviceMemory??8;return(window.matchMedia?.("(pointer: coarse)").matches??!1)||s<=4||r<=4?/apple gpu|adreno \(tm\) 7|mali-g7/.test(e)?"medium":"low":/rtx|radeon rx|geforce gtx 1[06-9]|apple m[1-9]/.test(e)&&s>=8?"high":"medium"}const Fg=li.degToRad(-18),Og=li.degToRad(28),$l=li.degToRad(24),Yl=li.degToRad(10),Bg=34,Zs=["right","left","away","toward"],kg=new L(0,1,0),zg=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;function ls(i,t=new ui){const e=Se[i],n=[1,-1,-1],s=new ie,r=[];for(let o=0;o<3;o++)for(let a=0;a<3;a++)r[o*3+a]=n[o]*e[o*3+a]*n[a];return s.set(r[0],r[1],r[2],0,r[3],r[4],r[5],0,r[6],r[7],r[8],0,0,0,0,1),t.setFromRotationMatrix(s)}class Hg{constructor(t,e,n){V(this,"kind","3d");V(this,"facing","right");V(this,"activeQuality","medium");V(this,"setting","auto");V(this,"gl");V(this,"canvas");V(this,"scene",new qc);V(this,"camera",new We(30,1,.1,160));V(this,"composer",null);V(this,"bloom",null);V(this,"tex");V(this,"mats");V(this,"env",null);V(this,"lantern");V(this,"surveyor");V(this,"dust",null);V(this,"dustVel",null);V(this,"grid");V(this,"walk",[]);V(this,"cross",[]);V(this,"crossFlash",[0,0,0,0]);V(this,"targetRing");V(this,"blob");V(this,"pulses",[]);V(this,"pulseGeo",new Xe(1,1));V(this,"decalGeo",new Xe(.86,.86));V(this,"crossGeo",new Xe(.26,.26));V(this,"caption");V(this,"captionTimer",0);V(this,"level",null);V(this,"state",null);V(this,"rooms",[]);V(this,"shown",-1);V(this,"fold",null);V(this,"pendingDelay",0);V(this,"pv",new L);V(this,"pvTarget",new L);V(this,"fall",null);V(this,"doorOpen",new Map);V(this,"time",0);V(this,"squash",0);V(this,"dip",0);V(this,"shake",{t:0,dir:new L});V(this,"W",1);V(this,"H",1);V(this,"insets",{top:0,bottom:0,left:0});V(this,"camTarget",new L);V(this,"camSnap",!0);V(this,"userYaw",0);V(this,"userPitch",0);V(this,"screen",new Map);V(this,"attractState",null);V(this,"attractT",0);V(this,"lost",!1);V(this,"goneTimer",0);V(this,"perf",{acc:0,n:0,t:0});V(this,"lastNow",performance.now());V(this,"foldTime",.6);V(this,"v1",new L);V(this,"v2",new L);V(this,"q1",new ui);V(this,"onLost",t=>{t.preventDefault(),this.lost=!0,this.hooks.onContextLost(),window.clearTimeout(this.goneTimer),this.goneTimer=window.setTimeout(()=>{this.lost&&this.hooks.onContextGone()},5e3)});V(this,"onRestored",()=>{this.lost=!1,window.clearTimeout(this.goneTimer),this.buildEnvironment();for(const t of this.tex.all)t.needsUpdate=!0;if(this.applyQuality(),this.level&&this.state){const t=this.level;this.level=null,this.setState(t,this.state)}this.hooks.onContextRestored()});this.hooks=n,this.canvas=t;const s=new D0({canvas:t,antialias:!0,powerPreference:"high-performance",stencil:!1});if(!s.capabilities.isWebGL2)throw s.dispose(),new Error("WebGL 2 is unavailable");this.gl=s,s.toneMapping=ra,s.toneMappingExposure=1,s.outputColorSpace=fe,s.shadowMap.type=cc,s.setClearColor(me.lampBlack,1);const r=Number(new URLSearchParams(location.search).get("foldms"));r>0&&r<=2e4&&(this.foldTime=r/1e3),this.setting=e,this.activeQuality=e==="auto"?ql(s.getContext()):e,this.tex=fg(this.activeQuality,s.capabilities.getMaxAnisotropy()),this.mats=pg(this.tex,Hn[this.activeQuality].transmission);const o=this.scene;o.background=new St(me.lampBlack),o.fog=new ga(me.lampBlack,.03),this.buildEnvironment();const a=new O0(9411764,2760728,1.1);o.add(a);const l=new z0(11124188,1.1);l.position.set(-3,10,5),o.add(l),this.surveyor=bg(this.mats),o.add(this.surveyor.root),this.lantern=new Zc(me.lantern,9,0,2),this.lantern.shadow.bias=-.002,this.lantern.shadow.normalBias=.03,this.lantern.shadow.camera.near=.05,this.lantern.shadow.camera.far=30,this.surveyor.lanternLightAnchor.add(this.lantern),this.tex.grid.repeat.set(60,60),this.grid=new at(new Xe(240,240),this.mats.grid),this.grid.rotation.x=-Math.PI/2,this.grid.position.y=-9,o.add(this.grid);for(let c=0;c<4;c++){const h=new Be({map:this.tex.walk,color:me.seam,transparent:!0,depthWrite:!1,blending:hn,polygonOffset:!0,polygonOffsetFactor:-2,fog:!1}),u=new at(this.decalGeo,h);u.rotation.x=-Math.PI/2,u.renderOrder=2,o.add(u),this.walk.push(u);const d=new Be({map:this.tex.cross,color:14673118,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,fog:!1}),p=new at(this.crossGeo,d);p.rotation.x=-Math.PI/2,p.renderOrder=2,o.add(p),this.cross.push(p)}this.targetRing=new at(this.decalGeo,new Be({map:this.tex.ring,color:new St(me.brass).multiplyScalar(1.4),transparent:!0,depthWrite:!1,blending:hn,polygonOffset:!0,polygonOffsetFactor:-3,fog:!1})),this.targetRing.rotation.x=-Math.PI/2,this.targetRing.renderOrder=3,o.add(this.targetRing),this.blob=new at(this.decalGeo,new Be({map:this.tex.blob,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,fog:!1})),this.blob.rotation.x=-Math.PI/2,this.blob.scale.setScalar(.62),this.blob.renderOrder=1,o.add(this.blob),this.caption=document.createElement("div"),this.caption.className="room-caption",this.caption.setAttribute("aria-hidden","true"),document.body.appendChild(this.caption),t.addEventListener("webglcontextlost",this.onLost,!1),t.addEventListener("webglcontextrestored",this.onRestored,!1),this.applyQuality(),this.resize()}buildEnvironment(){this.env?.dispose();const t=new Ko(this.gl),e=new Q0;this.env=t.fromScene(e,.04),e.traverse(n=>{const s=n;s.isMesh&&(s.geometry.dispose(),s.material.dispose())}),t.dispose(),this.scene.environment=this.env.texture,this.scene.environmentIntensity=.5}setQuality(t){this.setting=t;const e=t==="auto"?ql(this.gl.getContext()):t,n=Hn[e].transmission!==Hn[this.activeQuality].transmission;if(this.activeQuality=e,n&&(this.mats.frosted.transmission=Hn[e].transmission?.9:0,this.mats.frosted.transparent=!Hn[e].transmission,this.mats.frosted.opacity=Hn[e].transmission?1:.55,this.mats.frosted.needsUpdate=!0),this.applyQuality(),n&&this.level&&this.state){const s=this.level;this.level=null,this.setState(s,this.state)}}applyQuality(){const t=Hn[this.activeQuality];this.gl.setPixelRatio(Math.min(t.pixelRatio,window.devicePixelRatio||1));const e=this.gl.shadowMap.enabled!==t.shadows||this.lantern.shadow.mapSize.x!==(t.shadowSize||512);if(this.gl.shadowMap.enabled=t.shadows,this.lantern.castShadow=t.shadows,t.shadows&&(this.lantern.shadow.mapSize.set(t.shadowSize,t.shadowSize),this.lantern.shadow.map?.dispose(),this.lantern.shadow.map=null),e&&this.scene.traverse(n=>{const s=n.material;Array.isArray(s)?s.forEach(r=>r.needsUpdate=!0):s&&(s.needsUpdate=!0)}),this.blob.material.opacity=t.shadows?.45:.8,t.bloom&&!this.composer){const n=new Ze(1,1,{type:dn,samples:4});this.composer=new $0(this.gl,n),this.composer.addPass(new Y0(this.scene,this.camera)),this.bloom=new qi(new _t(256,256),.3,.5,1.5),this.composer.addPass(this.bloom),this.composer.addPass(new Z0)}else!t.bloom&&this.composer&&(this.composer.dispose(),this.bloom?.dispose(),this.composer=null,this.bloom=null);if(this.dust&&(this.scene.remove(this.dust),this.dust.geometry.dispose(),this.dust.material.dispose(),this.dust=null),t.dust>0){const n=new Float32Array(t.dust*3);this.dustVel=new Float32Array(t.dust*3);for(let o=0;o<t.dust;o++)n[o*3]=(Math.random()-.5)*9,n[o*3+1]=(Math.random()-.5)*7,n[o*3+2]=(Math.random()-.5)*6,this.dustVel[o*3]=(Math.random()-.5)*.06,this.dustVel[o*3+1]=(Math.random()-.3)*.05,this.dustVel[o*3+2]=(Math.random()-.5)*.06;const s=new Me;s.setAttribute("position",new ze(n,3));const r=new jc({map:this.tex.dot,color:16767144,size:.05,sizeAttenuation:!0,transparent:!0,opacity:.55,depthWrite:!1,blending:hn});this.dust=new N0(s,r),this.dust.frustumCulled=!1,this.scene.add(this.dust)}this.resize()}resize(){const t=Math.max(1,Math.floor(window.innerWidth)),e=Math.max(1,Math.floor(window.innerHeight));this.W=t,this.H=e,this.gl.setSize(t,e,!0),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.composer&&(this.composer.setPixelRatio(this.gl.getPixelRatio()),this.composer.setSize(t,e),this.bloom?.setSize(Math.ceil(t*this.gl.getPixelRatio()/2),Math.ceil(e*this.gl.getPixelRatio()/2)))}setInsets(t,e,n=0){this.insets={top:t,bottom:e,left:n}}disposeRooms(){for(const t of this.rooms){this.scene.remove(t.group);for(const e of t.props)e.dispose();for(const e of t.disposables)e.dispose()}this.rooms=[],this.shown=-1}buildRoom(t,e){const n=t.rooms[e],s=new he,r=[],o=xg(t,e);r.push(o);const a=new at(o,[this.mats.plaster,this.mats.stone,this.mats.poche]);a.castShadow=!0,a.receiveShadow=!0,s.add(a);const l=Mg(t,e);if(l){r.push(l);const P=new at(l,this.mats.backWall);P.receiveShadow=!0,s.add(P)}const c=.016,h=[],u=n.w/2,d=n.h/2,p=n.d/2;for(const P of[-1,1])for(const T of[-1,1])h.push(new Ne(n.w+c,c,c).translate(0,P*d,T*p));for(const P of[-1,1])for(const T of[-1,1])h.push(new Ne(c,n.h+c,c).translate(P*u,0,T*p));for(const P of[-1,1])for(const T of[-1,1])h.push(new Ne(c,c,n.d+c).translate(P*u,T*d,0));const g=J0(h);for(const P of h)P.dispose();const _=this.mats.seam.clone();r.push(g,_),s.add(new at(g,_));const m=(P,T,A)=>P>=0&&T>=0&&A>=0&&P<n.w&&T<n.h&&A<n.d&&n.solid[P+n.w*(T+n.h*A)]===1,f=[],y=new Map,b=[[0,1,0],[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[0,-1,0]];for(const P of t.objs){if(P.room!==e)continue;const T=Eg(P,this.mats,this.tex,Hn[this.activeQuality].transmission),A=Sn(t,e,P.x,P.y,P.z);if(T.mount==="fixed"){const w=b.find(([v,C,N])=>m(P.x+v,P.y+C,P.z+N))??[0,1,0],x=Wl(w);T.root.position.copy(A).addScaledVector(x,.5),T.root.quaternion.setFromUnitVectors(kg,x.clone().negate())}else if(T.mount==="cell"){T.root.position.copy(A);const x=[[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[0,-1,0],[0,1,0]].find(([v,C,N])=>m(P.x+v,P.y+C,P.z+N))??[1,0,0];y.set(P.id,Wl(x))}s.add(T.root),f.push(T)}const M=n.free.some(P=>P==="pitchA"||P==="pitchB")||t.objs.some(P=>P.room===e&&P.kind==="lever"&&(P.fold==="pitchA"||P.fold==="pitchB"))?.5*Math.hypot(n.w,n.h,n.d):.5*Math.hypot(n.w,n.h)+.3;return{group:s,props:f,seamMat:_,radius:M,doorDir:y,disposables:r}}showRoom(t){this.shown!==t&&(this.shown>=0&&this.scene.remove(this.rooms[this.shown].group),this.shown=t,this.scene.add(this.rooms[t].group))}cellOf(t,e=new L){return e.set(t.x,t.y,t.z)}setState(t,e){this.level!==t&&(this.disposeRooms(),this.level=t,this.rooms=t.rooms.map((n,s)=>this.buildRoom(t,s)),this.attractState=null),this.state=e,this.fold=null,this.fall=null,this.pendingDelay=0,this.rooms.forEach((n,s)=>ls(e.ori[s],n.group.quaternion)),this.showRoom(e.room),this.cellOf(e,this.pv),this.pvTarget.copy(this.pv),this.doorOpen.clear();for(const n of t.objs)n.kind==="door"&&this.doorOpen.set(n.id,e.ctl>>n.bit&1);for(const n of this.pulses)this.removePulse(n);this.pulses=[],this.camSnap=!0}setCaption(t){this.caption.textContent=t,this.caption.classList.add("show"),window.clearTimeout(this.captionTimer),this.captionTimer=window.setTimeout(()=>this.caption.classList.remove("show"),2200)}used(t){if(!this.level)return;const e=this.level.objs[t];this.rooms[e.room]?.props.find(s=>s.obj.id===t)?.trigger(),e.kind==="lever"&&(this.pendingDelay=.22)}apply(t,e,n,s){if(!this.level)return;const r=t.room!==e.room;this.state=e,r&&(this.fold=null,this.fall=null,ls(e.ori[e.room],this.rooms[e.room].group.quaternion),this.showRoom(e.room),this.cellOf(e,this.pv),this.pvTarget.copy(this.pv),this.camSnap=!0,s&&(this.dip=1),this.setCaption(this.level.rooms[e.room].name));for(const o of n)if(o.k==="fold"&&!r){const a=t.room,l=this.rooms[a];s?(this.fold={room:a,from:ls(t.ori[a]),to:ls(e.ori[a]),t:0,delay:this.pendingDelay},this.cellOf(t,this.pvTarget)):(this.fold=null,ls(e.ori[a],l.group.quaternion))}else if(o.k==="step")this.squash=s?1:0;else if(o.k==="collect"){const a=this.level.objs[o.obj];this.addPulse(a.x,a.y,a.z,me.brass,1.6,.6)}else if(o.k==="latch"||o.k==="toggle"){const a=this.level.objs[o.obj];this.addPulse(a.x,a.y,a.z,me.seam,1.2,.5)}else if(o.k==="complete"){const a=this.level.objs.find(l=>l.kind==="exit");a&&this.addPulse(a.x,a.y,a.z,me.brass,5,1.4)}this.pendingDelay=0,this.fold||(this.cellOf(e,this.pvTarget),s||this.pv.copy(this.pvTarget))}blockedNudge(t){if(!this.state)return;this.shake.t=.18;const e=Zs.indexOf(t),n=t==="right"?[1,0,0]:t==="left"?[-1,0,0]:t==="away"?[0,0,-1]:[0,0,1];this.shake.dir.set(n[0],n[1],n[2]),e>=0&&(this.crossFlash[e]=1)}attractTick(t,e){if(!this.level||!this.state||(this.attractT+=t,!e||this.fold||this.fall||this.attractT<3.6))return;this.attractT=0;const n=this.attractState??this.state,s=cr(this.level,n,{t:"fold",kind:"rollL"});if(!s.ok){this.attractState=null;return}this.attractState=s.state,this.apply(n,s.state,s.events,!0)}orbit(t,e){this.userYaw=li.clamp(this.userYaw+t,-$l,$l),this.userPitch=li.clamp(this.userPitch+e,-Yl,Yl)}recenter(){this.userYaw=0,this.userPitch=0}pick(t,e,n){let s=null,r=1/0;for(const o of n){const a=this.screen.get(o);if(!a)continue;const l=Math.hypot(a[0]-t,a[1]-e);l<a[2]*.75&&l<r&&(r=l,s=o)}return s}addPulse(t,e,n,s,r,o){if(!this.level||!this.state)return;const a=this.rooms[this.state.room],l=new Be({map:this.tex.ring,color:new St(s).multiplyScalar(1.6),transparent:!0,depthWrite:!1,blending:hn,fog:!1}),c=new at(this.pulseGeo,l);c.rotation.x=-Math.PI/2;const h=Sn(this.level,this.state.room,t,e,n);a.group.updateMatrixWorld(),a.group.localToWorld(h),c.position.set(h.x,h.y-.48,h.z),this.scene.add(c),this.pulses.push({mesh:c,mat:l,t:0,life:o,size:r})}removePulse(t){this.scene.remove(t.mesh),t.mat.dispose()}frame(t,e){if(this.lost||!this.level||!this.state)return;const n=performance.now();this.trackPerf((n-this.lastNow)/1e3),this.lastNow=n;const s=this.level,r=this.state;this.time+=t;const o=this.rooms[r.room];let a=0;if(this.fold){const D=this.fold;D.delay>0?D.delay-=t:D.t+=t/this.foldTime;const X=zg(Math.min(1,Math.max(0,D.t)));if(a=Math.sin(Math.min(1,D.t)*Math.PI),this.rooms[D.room].group.quaternion.slerpQuaternions(D.from,D.to,X),D.t>=1){this.rooms[D.room].group.quaternion.copy(D.to),this.fold=null;const tt=this.cellOf(r,new L),st=tt.distanceTo(this.pv);st>.01&&(this.fall={from:this.pv.clone(),to:tt,t:0,dur:Math.sqrt(2*st/Bg)}),this.pvTarget.copy(tt)}}o.seamMat.color.setHex(me.seam).multiplyScalar((e.contrast?1.2:.28)*(1+5*a));const l=this.v1.copy(this.pv);if(this.fall){this.fall.t+=t;const D=Math.min(1,this.fall.t/this.fall.dur);this.pv.lerpVectors(this.fall.from,this.fall.to,D*D),D>=1&&(this.fall=null,this.squash=e.effects?1:0)}else this.pv.lerp(this.pvTarget,1-Math.exp(-t*14)),this.pv.distanceToSquared(this.pvTarget)<1e-6&&this.pv.copy(this.pvTarget);const c=t>0&&!this.fold&&!this.fall?l.distanceTo(this.pv)/t:0;this.squash=Math.max(0,this.squash-t/.12);for(const D of o.props){if(D.obj.kind!=="door")continue;const X=r.ctl>>D.obj.bit&1,tt=this.doorOpen.get(D.obj.id)??X,st=e.effects?tt+(X-tt)*(1-Math.exp(-t*9)):X;this.doorOpen.set(D.obj.id,st);const vt=o.doorDir.get(D.obj.id),Bt=Ng(D);Bt.position.copy(vt).multiplyScalar(st*.94),Bt.visible=st<.995}o.group.updateMatrixWorld(!0);const h=o.group.quaternion,u=this.q1.copy(h).invert(),d=this.v2.set(0,-.5,0).applyQuaternion(u),p=Sn(s,r.room,this.pv.x,this.pv.y,this.pv.z,new L);o.group.localToWorld(p),p.y-=.5;const g=gs(s,r);this.screen.clear();const _=new L;for(const D of o.props){const X=D.obj;D.mount==="gravity"&&(Sn(s,r.room,X.x,X.y,X.z,D.root.position).add(d),D.root.quaternion.copy(u));const tt=X.kind==="crystal"||X.kind==="shard"?(r.got>>X.bit&1)===1:X.kind==="exit"?g===0:X.kind==="switch"||X.kind==="plate"?(r.ctl>>X.bit&1)===1:!1;D.update({time:this.time,dt:t,effects:e.effects,active:tt,highlighted:e.target===X.id||e.hover===X.id}),(X.kind==="lever"||X.kind==="switch")&&(Sn(s,r.room,X.x,X.y,X.z,_),o.group.localToWorld(_),this.project(X.id,_))}const m=this.surveyor;m.root.position.copy(p),m.root.visible=!0;const f=this.facing==="right"?Math.PI/2:this.facing==="left"?-Math.PI/2:this.facing==="away"?Math.PI:0;m.update(this.time,t,c,f,e.effects,this.squash);const y=e.effects?.94+.04*Math.sin(this.time*11.7)+.03*Math.sin(this.time*23.1+.7):1;this.lantern.intensity=9*y,this.blob.position.set(p.x,p.y+.012,p.z),this.blob.visible=!this.fold&&!this.fall;const b=e.showPlayer&&!this.fold&&!this.fall&&this.pv.distanceToSquared(this.pvTarget)<.01;for(let D=0;D<4;D++){const X=ia(s,r,Zs[D]),tt=this.walk[D],st=this.cross[D],vt=tt.material,Bt=st.material;this.crossFlash[D]=Math.max(0,this.crossFlash[D]-t/.5);const j=e.hintDir===Zs[D];tt.visible=b&&X.ok,st.visible=b&&!X.ok;const et=oc(r,Zs[D]);if(X.ok){Sn(s,r.room,X.to[0],X.to[1],X.to[2],_),o.group.localToWorld(_),tt.position.set(_.x,_.y-.5+.01,_.z);const ft=e.effects?.5+.5*Math.sin(this.time*3.2):.5;vt.color.setHex(j?me.pencil:me.seam).multiplyScalar(j?2.2:1),vt.opacity=j?.75+.25*ft:(e.contrast?.55:.28)+.1*ft}else Sn(s,r.room,r.x+et[0]*.43,r.y+et[1]*.43,r.z+et[2]*.43,_),o.group.localToWorld(_),st.position.set(_.x,_.y-.5+.012,_.z),Bt.opacity=(e.contrast?.7:.32)+.65*this.crossFlash[D],st.scale.setScalar(1+.5*this.crossFlash[D])}const M=e.hover??e.target;if(this.targetRing.visible=b&&M!==null,M!==null){const D=s.objs[M];Sn(s,r.room,D.x,D.y,D.z,_),o.group.localToWorld(_),this.targetRing.position.set(_.x,_.y-.5+.014,_.z),this.targetRing.rotation.z=e.effects?this.time*.6:0,this.targetRing.scale.setScalar(1.05+(e.effects?.05*Math.sin(this.time*3):0))}for(const D of this.pulses){D.t+=t;const X=D.t/D.life;D.mesh.scale.setScalar(.4+X*D.size),D.mat.opacity=Math.max(0,1-X)}const P=this.pulses.filter(D=>D.t<D.life);for(const D of this.pulses)D.t>=D.life&&this.removePulse(D);if(this.pulses=P,this.dust&&this.dustVel){const D=this.dust.geometry.getAttribute("position"),X=D.array,tt=o.radius;for(let st=0;st<D.count;st++)for(let vt=0;vt<3;vt++){X[st*3+vt]+=this.dustVel[st*3+vt]*t*(e.effects?1:0)+(e.effects?Math.sin(this.time*.3+st*1.7+vt)*8e-4:0);const Bt=vt===1?tt*.8:tt;X[st*3+vt]>Bt?X[st*3+vt]=-Bt:X[st*3+vt]<-Bt&&(X[st*3+vt]=Bt)}D.needsUpdate=!0}const T=this.v1.set(0,0,0).lerp(p,.35);T.y+=.15,this.camSnap?(this.camTarget.copy(T),this.camSnap=!1):this.camTarget.lerp(T,1-Math.exp(-t*5));const{top:A,bottom:w,left:x}=this.insets,v=li.degToRad(this.camera.fov),C=Math.max(120,this.H-A-w),N=Math.max(160,this.W-x-32),I=Math.tan(v/2)*(C/this.H),W=Math.tan(v/2)*this.camera.aspect*(N/this.W),$=o.radius*(x>0?.9:.72)/Math.min(I,W),z=Fg+this.userYaw,Y=Og+this.userPitch;if(this.camera.position.set(Math.sin(z)*Math.cos(Y),Math.sin(Y),Math.cos(z)*Math.cos(Y)).multiplyScalar($).add(this.camTarget),this.shake.t=Math.max(0,this.shake.t-t),this.shake.t>0&&e.effects){const D=this.shake.t/.18,X=Math.sin(this.shake.t*90)*.035*D;this.camera.position.addScaledVector(this.shake.dir,.06*D*D).add(new L(X,-Math.abs(X)*.6,0))}this.camera.lookAt(this.camTarget),this.camera.setViewOffset(this.W,this.H,-x/2,(w-A)/2,this.W,this.H),this.camera.updateMatrixWorld();for(const[D]of this.screen){const X=s.objs[D];Sn(s,r.room,X.x,X.y,X.z,_),o.group.localToWorld(_),this.project(D,_)}this.dip=Math.max(0,this.dip-t/.35),this.gl.toneMappingExposure=1-.75*this.dip,this.composer?this.composer.render(t):this.gl.render(this.scene,this.camera)}project(t,e){const n=e.clone().project(this.camera),s=e.clone().add(new L(1,0,0)).project(this.camera),r=(n.x*.5+.5)*this.W,o=(-n.y*.5+.5)*this.H,a=Math.abs((s.x-n.x)*.5*this.W);this.screen.set(t,[r,o,Math.max(24,a)])}trackPerf(t){if(this.setting!=="auto"||t<=0||t>.5||(this.perf.acc+=t,this.perf.n++,this.perf.t+=t,this.perf.t<3))return;const e=this.perf.acc/this.perf.n;this.perf={acc:0,n:0,t:0},e>1/40&&this.activeQuality!=="low"&&(this.activeQuality=this.activeQuality==="high"?"medium":"low",this.applyQuality())}dispose(){this.canvas.removeEventListener("webglcontextlost",this.onLost),this.canvas.removeEventListener("webglcontextrestored",this.onRestored),window.clearTimeout(this.goneTimer),this.disposeRooms();for(const t of this.pulses)this.removePulse(t);this.surveyor.dispose();for(const t of this.mats.all)t.dispose();for(const t of this.tex.all)t.dispose();for(const t of[...this.walk,...this.cross,this.targetRing,this.blob])t.material.dispose();this.pulseGeo.dispose(),this.decalGeo.dispose(),this.crossGeo.dispose(),this.grid.geometry.dispose(),this.dust&&(this.dust.geometry.dispose(),this.dust.material.dispose()),this.composer?.dispose(),this.env?.dispose(),this.caption.remove(),this.gl.dispose()}}class Gg{constructor(){V(this,"ctx",null);V(this,"master",null);V(this,"ambient",null);V(this,"volume",.6);V(this,"muted",!1);V(this,"pluckTimer",null);V(this,"chapter",0)}unlock(){try{if(!this.ctx){const t=window.AudioContext??window.webkitAudioContext;if(!t)return;this.ctx=new t,this.master=this.ctx.createGain(),this.master.connect(this.ctx.destination),this.apply()}this.ctx.state==="suspended"&&this.ctx.resume()}catch{this.ctx=null}}setVolume(t){this.volume=Math.max(0,Math.min(1,t)),this.apply()}setMuted(t){this.muted=t,this.apply()}suspend(){try{this.ctx?.suspend()}catch{}}resume(){try{this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}catch{}}apply(){this.master&&this.ctx&&this.master.gain.setTargetAtTime(this.muted?0:this.volume*this.volume,this.ctx.currentTime,.03)}tone(t,e,n,s,r,o=0,a=.005,l){const c=this.ctx;if(!c||!this.master||this.muted)return;const h=c.currentTime+o,u=c.createOscillator(),d=c.createGain();u.type=n,u.frequency.setValueAtTime(t,h),r&&u.frequency.exponentialRampToValueAtTime(r,h+e),d.gain.setValueAtTime(1e-4,h),d.gain.linearRampToValueAtTime(s,h+a),d.gain.exponentialRampToValueAtTime(1e-4,h+e);let p=u;if(l){const g=c.createBiquadFilter();g.type="lowpass",g.frequency.value=l,u.connect(g),p=g}p.connect(d),d.connect(this.master),u.start(h),u.stop(h+e+.05)}noise(t,e,n,s,r=0){const o=this.ctx;if(!o||!this.master||this.muted)return;const a=o.currentTime+r,l=Math.max(1,Math.floor(o.sampleRate*t)),c=o.createBuffer(1,l,o.sampleRate),h=c.getChannelData(0);for(let g=0;g<l;g++)h[g]=Math.random()*2-1;const u=o.createBufferSource();u.buffer=c;const d=o.createBiquadFilter();d.type="bandpass",d.frequency.setValueAtTime(n,a),d.frequency.exponentialRampToValueAtTime(s,a+t);const p=o.createGain();p.gain.setValueAtTime(e,a),p.gain.exponentialRampToValueAtTime(1e-4,a+t),u.connect(d),d.connect(p),p.connect(this.master),u.start(a)}step(){this.tone(90,.04,"sine",.12)}blocked(){this.tone(70,.09,"triangle",.18,50)}fold(t){const[e,n]=t?[180,60]:[60,180];this.tone(e,.6,"sawtooth",.07,n,0,.02,900),this.tone(e*1.01,.6,"sawtooth",.05,n*1.01,0,.02,900)}crystal(){[660,880,1320].forEach((t,e)=>this.tone(t,.35,"sine",.12,void 0,e*.07))}shard(){[988,1318,1760,2093].forEach((t,e)=>this.tone(t,.5,"sine",.07,void 0,e*.08))}click(){this.noise(.04,.12,2400,800),this.tone(220,.08,"square",.04)}portal(){this.noise(.3,.1,300,2400),this.tone(330,.3,"sine",.08,660)}door(){this.tone(110,.4,"sine",.2,70)}hint(){this.tone(1040,.5,"sine",.1),this.tone(1560,.4,"sine",.04,void 0,.04)}undo(){this.tone(300,.1,"triangle",.08,200)}complete(){[220,277.18,329.63,415.3].forEach((t,e)=>this.tone(t,1.8,"sine",.1,void 0,e*.04,.04)),this.tone(880,1.4,"sine",.04,void 0,.2,.05)}ui(){this.tone(520,.05,"sine",.06)}startAmbient(t){this.chapter=t,this.stopAmbient();const e=this.ctx;if(!e||!this.master)return;const n=[55,73.42,43.65][t%3],s=e.createGain();s.gain.value=.035,s.connect(this.master);const r=e.createOscillator(),o=e.createGain();r.frequency.value=.07,o.gain.value=.015,r.connect(o),o.connect(s.gain);const a=e.createOscillator(),l=e.createOscillator();a.type="sine",l.type="sine",a.frequency.value=n,l.frequency.value=n*1.5,a.connect(s),l.connect(s),r.start(),a.start(),l.start(),this.ambient={stop:()=>{try{a.stop(),l.stop(),r.stop(),s.disconnect()}catch{}}};const c=[0,2,4,7,9],h=()=>{const u=c[Math.floor(Math.random()*c.length)],d=n*4*Math.pow(2,u/12);this.tone(d,2.2,"sine",.03,void 0,0,.02),this.pluckTimer=window.setTimeout(h,6e3+Math.random()*6e3)};this.pluckTimer=window.setTimeout(h,3e3)}stopAmbient(){this.pluckTimer!==null&&window.clearTimeout(this.pluckTimer),this.pluckTimer=null,this.ambient?.stop(),this.ambient=null}get currentChapter(){return this.chapter}}const jl="paradox-room:v1";function ds(){return{v:1,completed:[],best:{},shards:[],settings:{volume:.6,muted:!1,effects:null,textSize:1,contrast:!1,quality:"auto"},last:"1-1",endingSeen:!1}}const Kl=i=>Array.isArray(i)&&i.every(t=>typeof t=="string");function Vg(i){const t=ds();if(!i||typeof i!="object")return t;const e=i;if(e.v!==1)return t;if(Kl(e.completed)&&(t.completed=e.completed.slice(0,64)),Kl(e.shards)&&(t.shards=e.shards.slice(0,64)),e.best&&typeof e.best=="object")for(const[s,r]of Object.entries(e.best))typeof r=="number"&&Number.isFinite(r)&&r>=0&&(t.best[s]=Math.floor(r));typeof e.last=="string"&&(t.last=e.last),typeof e.endingSeen=="boolean"&&(t.endingSeen=e.endingSeen);const n=e.settings;return n&&typeof n=="object"&&(typeof n.volume=="number"&&Number.isFinite(n.volume)&&(t.settings.volume=Math.max(0,Math.min(1,n.volume))),typeof n.muted=="boolean"&&(t.settings.muted=n.muted),(typeof n.effects=="boolean"||n.effects===null)&&(t.settings.effects=n.effects),(n.textSize===0||n.textSize===1||n.textSize===2)&&(t.settings.textSize=n.textSize),typeof n.contrast=="boolean"&&(t.settings.contrast=n.contrast),(n.quality==="auto"||n.quality==="low"||n.quality==="medium"||n.quality==="high")&&(t.settings.quality=n.quality)),t}class Wg{constructor(){V(this,"data",ds());V(this,"ok",!0)}load(){try{const t=window.localStorage.getItem(jl);this.data=t?Vg(JSON.parse(t)):ds()}catch{this.data=ds()}}save(){try{window.localStorage.setItem(jl,JSON.stringify(this.data)),this.ok=!0}catch{this.ok=!1}}reset(){const t=this.data.settings;this.data=ds(),this.data.settings=t,this.save()}}const Xg=`<svg id="plan-defs" width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<pattern id="poche-hatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
<rect width="3" height="3" fill="#23272c"/><line x1="0" y1="0" x2="0" y2="3" stroke="#5d646b" stroke-width="0.9"/></pattern>
</defs></svg>`,_e=6;function qg(i){const t=[i.start.room];for(const e of i.objs){if(e.kind!=="portal"||e.secret||e.pair===void 0)continue;const n=i.objs[e.pair].room;t.includes(n)||t.push(n)}return t.slice(0,2)}function $g(i,t){const e=i.rooms[t];if(t===i.start.room)return i.start.z;let n=0,s=-1;for(let r=0;r<e.d;r++){let o=0;for(let a=0;a<e.h;a++)for(let l=0;l<e.w;l++)e.solid[l+e.w*(a+e.h*r)]||o++;o>s&&(s=o,n=r)}return n}function Yg(i,t){const e=qg(i);let n=0,s="",r=0;for(const a of e){const l=i.rooms[a],c=$g(i,a);let h="";for(let u=0;u<l.h;u++)for(let d=0;d<l.w;d++)l.solid[d+l.w*(u+l.h*c)]&&(h+=`M${n+d*_e} ${u*_e}h${_e}v${_e}h-${_e}z`);if(s+=`<path d="${h}" fill="url(#poche-hatch)"/>`,s+=`<rect x="${n}" y="0" width="${l.w*_e}" height="${l.h*_e}" fill="none" stroke="#23272c" stroke-width="0.8" ${t?'stroke-dasharray="2 2"':""}/>`,!t){for(const u of i.objs){if(u.room!==a||u.z!==c)continue;const d=n+u.x*_e+_e/2,p=u.y*_e+_e/2;switch(u.kind){case"crystal":s+=`<path d="M${d} ${p-2.4}l2 2.4l-2 2.4l-2-2.4z" fill="#c39645"/>`;break;case"exit":s+=`<circle cx="${d}" cy="${p}" r="2.4" fill="none" stroke="#8a6a2c" stroke-width="0.8"/><circle cx="${d}" cy="${p}" r="1.2" fill="none" stroke="#8a6a2c" stroke-width="0.6"/>`;break;case"portal":u.secret||(s+=`<circle cx="${d}" cy="${p}" r="2.2" fill="none" stroke="#6a5bd6" stroke-width="0.9"/>`);break;case"door":s+=`<rect x="${d-3}" y="${p-1}" width="6" height="2" fill="#23272c"/>`;break;case"lever":s+=`<path d="M${d-1.8} ${p+1.8}L${d+1.8} ${p-1.8}" stroke="#23272c" stroke-width="0.9"/>`;break;case"switch":case"plate":s+=`<rect x="${d-1.6}" y="${p-1.6}" width="3.2" height="3.2" fill="none" stroke="#23272c" stroke-width="0.7"/>`;break}}a===i.start.room&&(s+=`<circle cx="${n+i.start.x*_e+_e/2}" cy="${i.start.y*_e+_e/2}" r="1.5" fill="#23272c"/>`)}n+=l.w*_e+_e,r=Math.max(r,l.h*_e)}return`<svg viewBox="-1 -1 ${n-_e+2} ${r+2}" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" focusable="false"${t?' opacity="0.45"':""}>${s}</svg>`}const ce=i=>document.getElementById(i),De=i=>i.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function En(i){const t=i.toLowerCase();return t.charAt(0).toUpperCase()+t.slice(1)}const ei=i=>`<span class="cap" aria-hidden="true">${i}</span>`,jg={rollL:{key:"Q",label:"Roll left",title:"Roll the room: the left wall becomes the floor"},rollR:{key:"F",label:"Roll right",title:"Roll the room: the right wall becomes the floor"},pitchA:{key:"X",label:"Near wall down",title:"Pitch the room: the near wall becomes the floor"},pitchB:{key:"V",label:"Far wall down",title:"Pitch the room: the far wall becomes the floor"}};class Kg{constructor(t,e){V(this,"overlay",ce("overlay"));V(this,"hud",ce("hud"));V(this,"stack",[]);V(this,"screenEl",null);V(this,"msgTimer",0);V(this,"rendererNote","");this.store=t,this.cb=e,document.querySelectorAll("[data-move]").forEach(n=>n.addEventListener("click",()=>this.cb.move(n.dataset.move))),this.overlay.addEventListener("keydown",n=>this.trap(n)),document.getElementById("plan-defs")||document.body.insertAdjacentHTML("beforeend",Xg)}get modalOpen(){return this.stack.length>0}get hasScreen(){return this.screenEl!==null}setRendererNote(t){this.rendererNote=t}trap(t){if(t.key!=="Tab")return;const e=this.stack.length?this.stack[this.stack.length-1].el:this.screenEl;if(!e)return;const n=Array.from(e.querySelectorAll('button, input, [href], [tabindex]:not([tabindex="-1"])')).filter(o=>!o.hasAttribute("disabled"));if(!n.length)return;const s=n[0],r=n[n.length-1];t.shiftKey&&document.activeElement===s?(t.preventDefault(),r.focus()):!t.shiftKey&&document.activeElement===r&&(t.preventDefault(),s.focus())}openModal(t,e,n,s=""){const r=document.createElement("div");return r.className="backdrop",r.innerHTML=`<div class="sheet modal ${s}" role="dialog" aria-modal="true" aria-label="${De(e)}">${t}</div>`,this.overlay.appendChild(r),this.stack.push({el:r,prev:document.activeElement,onClose:n}),r.querySelector("[data-first], button, input")?.focus(),r}closeTop(){const t=this.stack.pop();return t?(t.el.remove(),t.prev?.focus?.(),t.onClose?.(),!0):!1}closeAllModals(){for(;this.stack.length;)this.stack.pop()?.el.remove()}showScreen(t,e){this.clearScreen();const n=document.createElement("section");return n.className="screen "+e,n.innerHTML=t,this.overlay.appendChild(n),this.screenEl=n,n.querySelector("[data-first], button")?.focus(),n}clearScreen(){this.screenEl?.remove(),this.screenEl=null}on(t,e,n){t.querySelectorAll(e).forEach(s=>s.addEventListener("click",()=>n(s)))}leftInset(){const t=this.screenEl?.querySelector(".title-sheet");return!t||window.innerWidth<760?0:Math.ceil(t.getBoundingClientRect().right)}isUnlocked(t){return t===0||this.store.data.completed.includes(de[t-1].id)}firstOpenIndex(){const t=this.store.data.completed;for(let e=0;e<de.length;e++)if(!t.includes(de[e].id))return e;return de.length-1}controlsKey(){return`<table class="keys"><caption>Controls</caption><tbody>${[["W A S D","Walk (arrow keys too)"],["Q F","Roll the room left or right"],["X V","Bring the near or far wall down"],["E","Use a lever or switch"],["Z","Undo a turn"],["R","Restart the room"],["H","Ask Ilse for a hint"],["[ ]","Turn the view a little"],["Esc","Pause"],["M","Mute"]].map(([e,n])=>`<tr><th scope="row">${e.split(" ").map(s=>`<kbd>${s}</kbd>`).join("")}</th><td>${n}</td></tr>`).join("")}</tbody></table>`}showTitle(){this.hud.classList.add("hidden");const t=this.store.data,e=t.completed.length>0||t.last!=="1-1",n=t.completed.length>=de.length;let s=de.findIndex(a=>a.id===t.last);(s<0||!this.isUnlocked(s))&&(s=this.firstOpenIndex());const r=de[s],o=this.showScreen(`<div class="sheet title-sheet">
        <h1 class="wordmark">Paradox Room</h1>
        <p class="tagline">The floor is a matter of opinion.</p>
        <p class="premise">Ilse Varga drew a house she could never finish measuring. Every room agrees with you, then turns a quarter and disagrees. Carry the lantern, fold the rooms, and let a wall become the floor you need.</p>
        <div class="title-actions">
          <button class="btn primary" data-a="play" data-first>${e?`Continue: ${De(r.id)} ${De(En(r.name))}`:"Start the first room"}</button>
          <button class="btn" data-a="select">Open the chapter plans</button>
          <button class="btn" data-a="how">How folds work</button>
          <button class="btn" data-a="settings">Settings</button>
          ${n?'<button class="btn" data-a="ending">Read the ending again</button>':""}
        </div>
        ${this.controlsKey()}
        ${this.store.ok?"":'<p class="note">Progress cannot be saved in this browser.</p>'}
        ${this.rendererNote?`<p class="note">${De(this.rendererNote)}</p>`:""}
      </div>`,"title");this.on(o,'[data-a="play"]',()=>this.cb.continueGame()),this.on(o,'[data-a="select"]',()=>this.cb.openSelect()),this.on(o,'[data-a="how"]',()=>this.cb.openHowTo()),this.on(o,'[data-a="settings"]',()=>this.cb.openSettings()),this.on(o,'[data-a="ending"]',()=>this.cb.replayEnding())}showSelect(){this.hud.classList.add("hidden");const t=this.store.data,e=de.filter(r=>r.nShards).length;let n=`<div class="plan-sheet sheet">
      <header class="plan-head">
        <h2>Plans of the Paradox House</h2>
        <div class="plan-tools"><button class="btn" data-a="settings">Settings</button><button class="btn" data-a="back" data-first>Back to the title</button></div>
      </header>
      <div class="panels">`;Da.forEach((r,o)=>{n+=`<section class="panel" aria-labelledby="ch${o}"><h3 id="ch${o}"><span class="ch-no">${o+1}</span>${De(En(r.name))}</h3><p class="blurb">${De(r.blurb)}</p><ol class="levels">`,de.filter(a=>a.chapter===o).forEach(a=>{const l=this.isUnlocked(a.index),c=t.completed.includes(a.id),h=t.best[a.id],u=l?c?`Solved in ${h??"?"} turns`:"Ready to survey":"Not yet surveyed",d=t.shards.includes(a.id),p=a.nShards>0&&l?d?'<span class="note-mark found"><span class="paper" aria-hidden="true"></span>Note found</span>':'<span class="note-mark pencil" title="A margin note is hidden in this room">a note is hidden here?</span>':"";n+=`<li><button class="level ${c?"done":""} ${l?"":"locked"}" data-i="${a.index}" ${l?"":"disabled"} aria-label="${De(`${a.id} ${En(a.name)}. ${u}.${a.nShards>0&&l?d?" Margin note found.":" A margin note is hidden here.":""}`)}">
          <span class="mini" aria-hidden="true">${Yg(a,!l)}</span>
          <span class="ltext"><span class="lid">${a.id}</span><span class="lname">${De(En(a.name))}</span><span class="lstatus">${u}</span>${p}</span>
        </button></li>`}),n+="</ol></section>"}),n+=`</div>
      <table class="titleblock foot-block"><tbody><tr>
        <th scope="row">Sheet</th><td>Paradox House, all floors</td>
        <th scope="row">Rooms solved</th><td>${t.completed.length} of ${de.length}</td>
        <th scope="row">Margin notes</th><td>${t.shards.length} of ${e}</td>
      </tr></tbody></table>
    </div>`;const s=this.showScreen(n,"select");this.on(s,'[data-a="back"]',()=>this.cb.toTitle()),this.on(s,'[data-a="settings"]',()=>this.cb.openSettings()),this.on(s,".level",r=>this.cb.play(Number(r.dataset.i)))}showHud(t,e){this.clearScreen(),this.hud.classList.remove("hidden"),ce("hudChapter").textContent=En(Da[t.chapter].name),ce("hudLevel").textContent=t.id,ce("hudName").textContent=En(t.name),ce("hudObjective").textContent=t.objective,this.setFolds(e)}setFolds(t){const e=ce("actions");let n="";for(const r of t){const o=jg[r];n+=`<button type="button" class="key fold" data-fold="${r}" title="${De(o.title)}">${ei(o.key)}<span class="lbl">${o.label}</span></button>`}const s=t.length?`<div class="rail-group folds" role="group" aria-label="Folds">${n}</div>`:'<div class="rail-group folds locked-note"><span class="lbl">Folding by hand is locked here. Use the levers.</span></div>';e.innerHTML=`${s}<div class="rail-group" role="group" aria-label="Actions">
      <button type="button" class="key use" data-act="use" title="Use the highlighted lever or switch">${ei("E")}<span class="lbl">Use</span></button>
      <button type="button" class="key" data-act="undo" title="Undo the last turn">${ei("Z")}<span class="lbl">Undo</span></button>
      <button type="button" class="key" data-act="restart" title="Restart this room">${ei("R")}<span class="lbl">Restart</span></button>
      <button type="button" class="key" data-act="hint" id="hintBtn">${ei("H")}<span class="lbl" id="hintLabel">Hint</span></button>
      <button type="button" class="key" data-act="menu" title="Pause menu">${ei("Esc")}<span class="lbl">Menu</span></button></div>`,e.querySelectorAll("[data-fold]").forEach(r=>r.addEventListener("click",()=>this.cb.fold(r.dataset.fold))),e.querySelector('[data-act="use"]')?.addEventListener("click",()=>this.cb.interact()),e.querySelector('[data-act="undo"]')?.addEventListener("click",()=>this.cb.undo()),e.querySelector('[data-act="restart"]')?.addEventListener("click",()=>this.cb.restart()),e.querySelector('[data-act="hint"]')?.addEventListener("click",()=>this.cb.hint()),e.querySelector('[data-act="menu"]')?.addEventListener("click",()=>this.cb.openPause())}setStats(t){ce("hudTurns").textContent=String(t.turns),ce("hudRefLabel").textContent=t.refLabel,ce("hudRef").textContent=t.refValue,ce("hudProgress").textContent=t.progress,ce("hudRoom").textContent=t.room;let e="";for(let s=0;s<t.total;s++)e+=`<span class="gem ${s<t.held?"held":""}"></span>`;ce("hudGlyphs").innerHTML=e,ce("hudNoteRow").classList.toggle("hidden",t.note===null),ce("hudNote").textContent=t.note??""}setObjective(t){ce("hudObjective").textContent=t}setHintButton(t,e){const n=document.getElementById("hintLabel"),s=document.getElementById("hintBtn");!n||!s||(n.textContent=t<=0?"No hints left":e>0?`Hint in ${e}s`:`Hint, ${t} left`,s.disabled=t<=0)}setUseEnabled(t){const e=document.querySelector('[data-act="use"]');e&&(e.disabled=!t)}hintFocus(t){if(document.querySelectorAll(".hinted").forEach(n=>n.classList.remove("hinted")),!t)return;const e=t==="use"?'[data-act="use"]':`[data-fold="${t}"]`;document.querySelector(e)?.classList.add("hinted")}hint(t){const e=ce("hudHint");if(!t){e.classList.add("hidden"),e.textContent="";return}e.classList.remove("hidden"),e.innerHTML=`<span class="hint-no">Hint ${t.stage} of ${t.of}</span> ${De(t.text)}`;const n=ce("hudMsg");window.clearTimeout(this.msgTimer),n.classList.remove("show"),n.classList.add("quiet"),n.textContent=`Hint ${t.stage} of ${t.of}: ${t.text}`}setPrompt(t,e){const n=ce("prompt");if(!t){n.classList.add("hidden");return}n.classList.remove("hidden"),n.innerHTML=`${ei("E")}<span class="pa">${De(t)}</span>${e?`<span class="pd">${De(e)}</span>`:""}`}message(t,e=3600){const n=ce("hudMsg");n.classList.remove("quiet"),n.textContent=t,n.classList.toggle("show",t.length>0),window.clearTimeout(this.msgTimer),t&&e>0&&(this.msgTimer=window.setTimeout(()=>n.classList.remove("show"),e))}insets(){const t=ce("hudTop").getBoundingClientRect(),e=ce("hudBottom").getBoundingClientRect(),n=Math.ceil(window.innerHeight-e.top);return document.documentElement.style.setProperty("--mid-bottom",n+8+"px"),{top:Math.ceil(t.bottom)+8,bottom:n+70}}hideHud(){this.hud.classList.add("hidden")}showPause(){const t=this.openModal(`<h2>Paused</h2><p class="sub">The House waits. Nothing moves while you think.</p>
       <div class="stack"><button class="btn primary" data-a="resume" data-first>Resume</button>
       <button class="btn" data-a="restart">Restart this room</button>
       <button class="btn" data-a="how">How folds work</button>
       <button class="btn" data-a="settings">Settings</button>
       <button class="btn" data-a="select">Open the chapter plans</button>
       <button class="btn" data-a="title">Leave to the title</button></div>`,"Paused");this.on(t,'[data-a="resume"]',()=>this.cb.resume()),this.on(t,'[data-a="restart"]',()=>{this.closeTop(),this.cb.restart()}),this.on(t,'[data-a="how"]',()=>this.cb.openHowTo()),this.on(t,'[data-a="settings"]',()=>this.cb.openSettings()),this.on(t,'[data-a="select"]',()=>this.cb.openSelect()),this.on(t,'[data-a="title"]',()=>this.cb.toTitle())}qualityNote(){const t=this.store.data.settings,e=this.cb.activeQuality();if(!e)return"The flat view has no graphics options.";const n=e.charAt(0).toUpperCase()+e.slice(1);return t.quality==="auto"?`Auto picked ${n} for this device.`:`${n} is in use.`}showSettings(){const t=this.store.data.settings,e=[["auto","Auto"],["low","Low"],["medium","Medium"],["high","High"]],n=this.openModal(`<h2>Settings</h2>
       <label class="field"><span>Volume <output id="volOut">${Math.round(t.volume*100)}</output></span><input id="setVol" type="range" min="0" max="100" value="${Math.round(t.volume*100)}" aria-label="Master volume" /></label>
       <label class="check"><input id="setMute" type="checkbox" ${t.muted?"checked":""} /> Mute sound</label>
       <label class="check"><input id="setFx" type="checkbox" ${this.effectsOn()?"checked":""} /> Camera effects (fold animation, bobbing, shake)</label>
       <label class="check"><input id="setCon" type="checkbox" ${t.contrast?"checked":""} /> High-contrast outlines</label>
       <div class="field"><span id="qLab">Graphics quality</span><div class="seg" role="group" aria-labelledby="qLab">
         ${e.map(([c,h])=>`<button type="button" class="btn small ${t.quality===c?"on":""}" data-q="${c}" aria-pressed="${t.quality===c}">${h}</button>`).join("")}</div>
         <span class="hint-line" id="qNote">${De(this.qualityNote())}</span></div>
       <div class="field"><span id="tsLab">Text size</span><div class="seg" role="group" aria-labelledby="tsLab">
         ${["Small","Medium","Large"].map((c,h)=>`<button type="button" class="btn small ${t.textSize===h?"on":""}" data-ts="${h}" aria-pressed="${t.textSize===h}">${c}</button>`).join("")}</div></div>
       <div class="field"><span>Progress</span><button class="btn small" id="setReset" type="button">Erase solved rooms and notes</button><span class="hint-line" id="resetNote"></span></div>
       ${this.store.ok?"":'<p class="note">Saving is unavailable in this browser; progress lasts until you close the tab.</p>'}
       <div class="stack"><button class="btn primary" data-a="close" data-first>Close settings</button></div>`,"Settings",()=>this.cb.settingsChanged()),s=n.querySelector("#setVol");s.addEventListener("input",()=>{t.volume=Number(s.value)/100,n.querySelector("#volOut").textContent=s.value,this.store.save(),this.cb.settingsChanged()});const r=(c,h)=>n.querySelector(c).addEventListener("change",u=>{h(u.target.checked),this.store.save(),this.cb.settingsChanged()});r("#setMute",c=>t.muted=c),r("#setFx",c=>t.effects=c),r("#setCon",c=>t.contrast=c);const o=(c,h)=>n.querySelectorAll(`[data-${c}]`).forEach(u=>u.addEventListener("click",()=>{h(u.dataset[c]),this.store.save(),this.cb.settingsChanged(),n.querySelectorAll(`[data-${c}]`).forEach(d=>{d.classList.toggle("on",d===u),d.setAttribute("aria-pressed",String(d===u))}),n.querySelector("#qNote").textContent=this.qualityNote()}));o("q",c=>t.quality=c),o("ts",c=>t.textSize=Number(c));let a=!1;const l=n.querySelector("#setReset");l.addEventListener("click",()=>{if(!a){a=!0,l.textContent="Click again to erase",n.querySelector("#resetNote").textContent="This clears solved rooms and margin notes. Settings stay.";return}this.cb.resetProgress(),a=!1,l.textContent="Erase solved rooms and notes",n.querySelector("#resetNote").textContent="Progress erased."}),this.on(n,'[data-a="close"]',()=>this.closeTop())}effectsOn(){const t=this.store.data.settings.effects;return t===null?!window.matchMedia("(prefers-reduced-motion: reduce)").matches:t}showHowTo(){const t=this.openModal(`<h2>How folds work</h2>
       <ol class="rules">
         <li><b>You stand on a floor.</b> Down is whichever wall the room is lying on. You walk on it in four directions; you never climb or jump.</li>
         <li><b>You cannot step onto nothing.</b> A lit square marks every step that works. A pale cross marks a way that is closed.</li>
         <li><b>A fold turns the room a quarter-turn.</b> A wall becomes the floor. If nothing is under you afterwards, you fall along the new down until you land.</li>
         <li><b>No floor at all? The fold is refused.</b> Nothing is lost.</li>
         <li><b>Axioms</b> (amber crystals) open the gate. <b>Levers</b> fold a room for you. <b>Switches</b> toggle doors; <b>plates</b> stay pressed.</li>
         <li><b>Portals</b> (shimmering rings with a letter) join two rooms. Each room remembers how it was turned when you left.</li>
         <li><b>Stuck?</b> Undo with <kbd>Z</kbd>, restart with <kbd>R</kbd>, or ask Ilse for a hint with <kbd>H</kbd>.</li>
       </ol>
       <div class="stack"><button class="btn primary" data-a="close" data-first>Back to the House</button></div>`,"How folds work");this.on(t,'[data-a="close"]',()=>this.closeTop())}showComplete(t,e,n,s,r,o,a){const l=this.openModal(`<h2>${De(En(t.name))} is solved</h2>
       <p class="sub">The gate opens, and so does the next room.${a?" That is your best count for this room.":""}</p>
       <table class="titleblock sum"><tbody>
         <tr><th scope="row">Sheet</th><td>${De(t.id)}</td><th scope="row">Turns</th><td>${e}</td></tr>
         <tr><th scope="row">Shortest known</th><td>${n}</td><th scope="row">Folds</th><td>${s}</td></tr>
         <tr><th scope="row">Hints used</th><td>${r}</td><th scope="row">Result</th><td>${e<=n?"Matched the shortest":`${e-n} over`}</td></tr>
       </tbody></table>
       <div class="stack"><button class="btn primary" data-a="next" data-first>${o?"Go to the next room":"Finish the House"}</button>
       <button class="btn" data-a="replay">Replay this room</button><button class="btn" data-a="select">Open the chapter plans</button></div>`,"Room solved");this.on(l,'[data-a="next"]',()=>this.cb.nextLevel()),this.on(l,'[data-a="replay"]',()=>this.cb.replay()),this.on(l,'[data-a="select"]',()=>this.cb.openSelect())}showEnding(t,e){this.hud.classList.add("hidden");const n=["The last gate opens. Behind it there is nothing but the plan the House was drawn on.","Every room folds flat. Every wall lies down beside the floor it was always standing on.","Ilse Varga left a line in the margin of the final page: “The room I could not finish was never a place. It was a question. Which way is down for you?”",t>=e?"And in the smallest margin, three notes in her hand: “Down is wherever you decide to stand. Decide gently.”":`Margin notes found: ${t} of ${e}. The rest are still folded away somewhere in the House.`,"Fold it again whenever you like."];let s=0;const r=this.showScreen(`<div class="sheet ending"><p class="card-no" id="endNo"></p><p class="card-text" id="endText" aria-live="polite"></p>
       <div class="row"><button class="btn primary" data-a="next" data-first id="endNext">Turn the page</button><button class="btn" data-a="skip">Skip to the title</button></div></div>`,"ending-screen"),o=r.querySelector("#endText"),a=r.querySelector("#endNo"),l=r.querySelector("#endNext"),c=()=>{o.classList.remove("in"),o.textContent=n[s],a.textContent=`Page ${s+1} of ${n.length}`,o.offsetWidth,o.classList.add("in"),l.textContent=s===n.length-1?"Back to the title":"Turn the page"};c(),l.addEventListener("click",()=>{s>=n.length-1?this.cb.endingDone():(s++,c())}),this.on(r,'[data-a="skip"]',()=>this.cb.endingDone())}}const Zg={ArrowUp:{c:"move",dir:"away"},KeyW:{c:"move",dir:"away"},ArrowDown:{c:"move",dir:"toward"},KeyS:{c:"move",dir:"toward"},ArrowLeft:{c:"move",dir:"left"},KeyA:{c:"move",dir:"left"},ArrowRight:{c:"move",dir:"right"},KeyD:{c:"move",dir:"right"},Space:{c:"interact"},KeyE:{c:"interact"},KeyQ:{c:"fold",kind:"rollL"},KeyF:{c:"fold",kind:"rollR"},KeyX:{c:"fold",kind:"pitchA"},KeyV:{c:"fold",kind:"pitchB"},KeyZ:{c:"undo"},Backspace:{c:"restart"},KeyR:{c:"restart"},KeyH:{c:"hint"},Escape:{c:"menu"},KeyP:{c:"menu"},KeyM:{c:"mute"},BracketLeft:{c:"orbit",d:-1},BracketRight:{c:"orbit",d:1},KeyC:{c:"recenter"}};function Qg(i){return i.ctrlKey||i.metaKey||i.altKey?null:Zg[i.code]??null}const Zl=110,Jg=6e3,Qs=3,Ql=15e4,t_={wall:"A wall blocks the way.",void:"There is no floor there.",edge:"The room ends there.",nofloor:"The fold finds no floor.",farside:"The far side has no floor. Fold that room first.",doorway:"Something is standing in the doorway.",locked:"This room will not fold by hand. Find a lever."};class e_{constructor(t){V(this,"store",new Wg);V(this,"sfx",new Gg);V(this,"renderer");V(this,"canvas");V(this,"ui");V(this,"mode","title");V(this,"level",de[0]);V(this,"state",cs(de[0]));V(this,"undoStack",[]);V(this,"turns",0);V(this,"folds",0);V(this,"hintsUsed",new Map);V(this,"hintReadyAt",0);V(this,"hintDir",null);V(this,"lastTurnAt",0);V(this,"lastFrame",0);V(this,"mouse",null);V(this,"drag",null);V(this,"hover",null);V(this,"target",null);V(this,"solvable",new Set);V(this,"ambientFor",-1);V(this,"hintLabel","");V(this,"running",!1);V(this,"completeTimer",0);V(this,"softTimer",0);V(this,"systemEffects",!0);V(this,"parCache",new Map);this.store.load(),this.canvas=t,this.ui=new Kg(this.store,this),this.renderer=this.makeRenderer(t),this.renderer.kind==="2d"&&this.ui.setRendererNote("WebGL 2 is not available in this browser, so the House is drawn in the simpler flat view."),this.applySettings(),window.addEventListener("resize",()=>this.onResize()),window.addEventListener("keydown",a=>this.onKey(a)),window.addEventListener("pointerdown",()=>this.gesture(),{capture:!0}),this.bindCanvas(t),document.addEventListener("visibilitychange",()=>{document.hidden?(this.running=!1,this.sfx.suspend()):(this.sfx.resume(),this.start())});const e=window.matchMedia("(prefers-reduced-motion: reduce)");this.systemEffects=!e.matches,e.addEventListener?.("change",()=>{this.systemEffects=!e.matches});const n=new URLSearchParams(location.search);n.has("debug")&&(window.__paradox=this);const s=n.get("quality");(s==="low"||s==="medium"||s==="high")&&this.renderer.setQuality(s);const r=n.get("level"),o=r?de.findIndex(a=>a.id===r):-1;o>=0?this.beginLevel(o):this.toTitle(),this.start()}makeRenderer(t){try{return new Hg(t,this.store.data.settings.quality,{onContextLost:()=>this.ui.message("The graphics card stopped drawing. Waiting for it to come back.",0),onContextRestored:()=>this.ui.message("The view is back."),onContextGone:()=>this.fallBackTo2D()})}catch{try{return new Cr(t)}catch{return new Cr(this.freshCanvas(!1))}}}freshCanvas(t=!0){const e=this.canvas.cloneNode(!1);return this.canvas.replaceWith(e),this.canvas=e,t&&this.bindCanvas(e),e}fallBackTo2D(){if(this.renderer.kind!=="2d"){try{this.renderer.dispose()}catch{}this.renderer=new Cr(this.freshCanvas()),this.renderer.setState(this.level,this.state),this.onResize(),this.ui.setRendererNote("The 3D view was lost, so the House is now drawn in the simpler flat view."),this.ui.message("The 3D view was lost. Continuing in the flat view.",0)}}bindCanvas(t){t.addEventListener("pointermove",e=>{this.mouse={x:e.clientX,y:e.clientY};const n=this.drag;if(n&&e.pointerId===n.id){const s=e.clientX-n.x,r=e.clientY-n.y;(n.moved||Math.hypot(s,r)>6)&&(n.moved=!0,this.renderer.orbit(-s*.004,r*.003),n.x=e.clientX,n.y=e.clientY)}}),t.addEventListener("pointerleave",()=>{this.mouse=null}),t.addEventListener("pointerdown",e=>{this.drag={x:e.clientX,y:e.clientY,moved:!1,id:e.pointerId}}),t.addEventListener("pointerup",e=>{const n=this.drag;this.drag=null,!(!n||n.moved||e.pointerId!==n.id)&&this.mode==="play"&&this.hover!==null&&this.act({t:"use",obj:this.hover})}),t.addEventListener("pointercancel",()=>{this.drag=null})}activeQuality(){return this.renderer?.activeQuality??null}start(){this.running||(this.running=!0,this.lastFrame=performance.now(),requestAnimationFrame(t=>this.loop(t)))}effects(){const t=this.store.data.settings.effects;return t===null?this.systemEffects:t}applySettings(){const t=this.store.data.settings;this.sfx.setVolume(t.volume),this.sfx.setMuted(t.muted),document.documentElement.dataset.text=String(t.textSize),document.documentElement.dataset.contrast=t.contrast?"1":"0",this.renderer.setQuality(t.quality),this.onResize()}settingsChanged(){this.applySettings()}onResize(){this.renderer.resize(),this.refreshInsets()}refreshInsets(){if(this.mode==="play"||this.mode==="paused"||this.mode==="complete"){const t=this.ui.insets();this.renderer.setInsets(t.top,t.bottom)}else this.renderer.setInsets(0,0,this.mode==="title"?this.ui.leftInset():0)}gesture(){this.sfx.unlock(),this.ambientFor<0&&(this.ambientFor=this.level.chapter,this.sfx.startAmbient(this.ambientFor))}loop(t){if(!this.running)return;const e=Math.min(.05,Math.max(0,(t-this.lastFrame)/1e3));this.lastFrame=t;const n=this.mode==="play"||this.mode==="paused"||this.mode==="complete";if(n||this.renderer.attractTick(e,this.effects()),n&&this.mouse&&this.mode==="play"&&!this.drag?.moved){const s=lr(this.level,this.state),r=this.renderer.pick(this.mouse.x,this.mouse.y,s);r!==this.hover&&(this.hover=r,this.refreshPrompt())}else this.hover!==null&&(this.hover=null,this.refreshPrompt());n&&this.tickHintLabel(t),this.renderer.frame(e,{effects:this.effects(),contrast:this.store.data.settings.contrast,hintDir:this.hintDir,target:this.target,hover:this.hover,showPlayer:n}),requestAnimationFrame(s=>this.loop(s))}toTitle(){this.ui.closeAllModals(),this.mode="title",window.clearTimeout(this.completeTimer),this.level=de[0],this.state=cs(this.level),this.renderer.setState(this.level,this.state),this.renderer.recenter(),this.ui.showTitle(),this.refreshInsets()}openSelect(){this.ui.closeAllModals(),window.clearTimeout(this.completeTimer),this.mode="select",this.refreshInsets(),this.ui.showSelect()}continueGame(){const t=this.store.data;let e=de.findIndex(n=>n.id===t.last);(e<0||!this.ui.isUnlocked(e))&&(e=this.ui.firstOpenIndex()),this.play(e)}play(t){this.sfx.ui(),this.hintsUsed.delete(de[t].id),this.beginLevel(t)}beginLevel(t){this.ui.closeAllModals(),window.clearTimeout(this.completeTimer),this.level=de[t],this.state=cs(this.level),this.undoStack=[],this.turns=0,this.folds=0,this.hintDir=null,this.hintReadyAt=0,this.mode="play",this.store.data.last=this.level.id,this.store.save(),this.renderer.setState(this.level,this.state),this.renderer.facing="right",this.ui.showHud(this.level,this.foldKinds()),this.ui.hint(null),this.refreshInsets(),this.renderer.setCaption(En(this.level.rooms[this.state.room].name)),this.refreshHud(),this.ui.message(this.level.intro,0),window.setTimeout(()=>this.refreshInsets(),50),this.ambientFor!==this.level.chapter&&this.ambientFor>=0&&(this.ambientFor=this.level.chapter,this.sfx.startAmbient(this.ambientFor))}resume(){this.ui.closeAllModals(),this.mode="play"}openPause(){this.mode==="play"&&(this.mode="paused",this.ui.showPause())}openSettings(){this.ui.showSettings()}openHowTo(){this.ui.showHowTo()}resetProgress(){this.store.reset(),this.applySettings()}restart(){this.mode!=="play"&&this.mode!=="paused"||(this.ui.closeAllModals(),this.mode="play",this.state=cs(this.level),this.undoStack=[],this.turns=0,this.folds=0,this.hintDir=null,this.renderer.setState(this.level,this.state),this.ui.setFolds(this.foldKinds()),this.ui.hintFocus(null),this.sfx.undo(),this.refreshHud(),this.ui.message("Room restarted."))}replay(){this.hintsUsed.delete(this.level.id),this.beginLevel(this.level.index)}nextLevel(){const t=this.level.index+1;t<de.length?(this.hintsUsed.delete(de[t].id),this.beginLevel(t)):(this.ui.closeAllModals(),this.runEnding())}runEnding(){this.mode="ending",this.store.data.endingSeen=!0,this.store.save();const t=de.filter(e=>e.nShards>0).length;this.ui.showEnding(this.store.data.shards.length,t)}replayEnding(){this.runEnding()}endingDone(){this.toTitle()}onKey(t){const e=Qg(t);if(!e)return;const n=t.target;if(n&&n.tagName==="INPUT"&&n.type==="text")return;if(this.gesture(),e.c==="mute"){t.preventDefault();const o=this.store.data.settings;o.muted=!o.muted,this.store.save(),this.applySettings(),this.ui.message(o.muted?"Sound muted.":"Sound on.");return}if(e.c==="orbit"||e.c==="recenter"){if(this.ui.modalOpen)return;t.preventDefault(),e.c==="orbit"?this.renderer.orbit(e.d*.07,0):this.renderer.recenter();return}if(e.c==="menu"){if(t.preventDefault(),t.repeat)return;this.ui.modalOpen?(this.ui.closeTop(),this.mode==="paused"&&!this.ui.modalOpen&&(this.mode="play")):this.mode==="play"?this.openPause():this.mode==="select"&&this.toTitle();return}if(this.mode!=="play"||this.ui.modalOpen||t.code==="Space"&&n?.tagName==="BUTTON")return;t.preventDefault();const r=performance.now();switch(e.c){case"move":if(t.repeat&&r-this.lastTurnAt<Zl)return;this.move(e.dir);break;case"fold":if(t.repeat)return;this.fold(e.kind);break;case"interact":if(t.repeat)return;this.interact();break;case"undo":if(t.repeat&&r-this.lastTurnAt<Zl*2)return;this.undo();break;case"restart":if(t.repeat)return;this.restart();break;case"hint":if(t.repeat)return;this.hint();break}}move(t){this.act({t:"move",dir:t})}fold(t){this.act({t:"fold",kind:t})}interact(){const t=this.hover??this.target;if(t===null){this.ui.message("Nothing here to use.");return}this.act({t:"use",obj:t})}foldKinds(){return this.level.rooms[this.state.room].free}act(t){if(this.mode!=="play")return;this.lastTurnAt=performance.now();const e=cr(this.level,this.state,t);if(t.t==="move"&&(this.renderer.facing=t.dir),!e.ok){this.sfx.blocked(),t.t==="move"&&this.renderer.blockedNudge(t.dir),this.ui.message(t_[e.reason]??"That does not work.");return}t.t==="use"&&this.renderer.used(t.obj),this.undoStack.push({state:this.state,turns:this.turns,folds:this.folds}),this.undoStack.length>500&&this.undoStack.shift();const n=this.state;this.state=e.state,this.turns++,this.hintDir=null,this.ui.hintFocus(null);let s="",r=!1;for(const o of e.events){const a=this.onEvent(o);a&&(s=a),o.k==="complete"&&(r=!0),o.k==="fold"&&this.folds++}this.renderer.apply(n,this.state,e.events,this.effects()),n.room!==this.state.room&&this.ui.setFolds(this.foldKinds()),this.ui.message(s),this.refreshHud(),r?this.onComplete():this.queueSoftlockCheck()}onEvent(t){const e=this.level;switch(t.k){case"step":return this.sfx.step(),"";case"fold":return this.sfx.fold(!0),t.fell?"The room turns, and you fall to the new floor.":"The room turns.";case"collect":{if(e.objs[t.obj].kind==="shard"){this.sfx.shard();const r=this.store.data;return r.shards.includes(e.id)||(r.shards.push(e.id),this.store.save()),"A margin note, in a careful hand. Saved."}this.sfx.crystal();const s=gs(e,this.state);return s===0?`Axiom ${e.nCrystals} of ${e.nCrystals}. The gate is open.`:`Axiom ${e.nCrystals-s} of ${e.nCrystals} held.`}case"latch":return this.sfx.click(),"The plate clicks. Something opens.";case"toggle":return this.sfx.click(),t.on?"Switch on. A door opens.":"Switch off. A door closes.";case"door":return this.sfx.door(),"";case"portal":return this.sfx.portal(),"Through the ring.";case"sealed":return`The gate is sealed. ${t.remaining} ${t.remaining===1?"axiom remains":"axioms remain"}.`;default:return""}}undo(){if(this.mode!=="play")return;const t=this.undoStack.pop();if(!t){this.ui.message("Nothing to undo.");return}const e=t.state.room!==this.state.room;this.state=t.state,this.turns=t.turns,this.folds=t.folds,this.hintDir=null,this.ui.hintFocus(null),this.renderer.setState(this.level,this.state),e&&this.ui.setFolds(this.foldKinds()),this.sfx.undo(),this.refreshHud(),this.ui.message("Undone.")}refreshHud(){const t=this.level,e=gs(t,this.state),n=t.nCrystals-e,s=t.nCrystals===0?"No axioms in this room. The gate is open.":`${n} of ${t.nCrystals} ${t.nCrystals===1?"axiom":"axioms"} held`,r=t.nShards>0?this.store.data.shards.includes(t.id)?"Found":"Hidden here":null,o=this.parOf(t),a=this.store.data.best[t.id];this.ui.setStats({turns:this.turns,refLabel:a!==void 0?"Your best":"Shortest known",refValue:a!==void 0?String(a):o!==void 0?String(o):"",progress:s,held:n,total:t.nCrystals,note:r,room:En(t.rooms[this.state.room].name)}),this.ui.setObjective(t.nCrystals>0&&e===0?"All axioms held. Reach the gate.":t.objective),this.refreshPrompt(),this.tickHintLabel(performance.now(),!0),this.refreshInsets()}parOf(t){if(this.parCache.has(t.id))return this.parCache.get(t.id);const e=Er(t);return e.actions&&this.parCache.set(t.id,e.actions.length),e.actions?.length}refreshPrompt(){const t=lr(this.level,this.state);this.target=t.length?t[0]:null;const e=this.hover??this.target;if(this.ui.setUseEnabled(e!==null),e===null){this.ui.setPrompt(null);return}const n=this.level.objs[e];if(n.kind==="lever"){const s={rollL:"rolls the room left",rollR:"rolls the room right",pitchA:"brings the near wall down",pitchB:"brings the far wall down"}[n.fold];this.ui.setPrompt("Pull the lever",s)}else{const s=this.state.ctl>>n.bit&1;this.ui.setPrompt(s?"Flip the switch off":"Flip the switch on",s?"the door will close":"a door will open")}}tickHintLabel(t,e=!1){const n=this.hintsUsed.get(this.level.id)??0,s=Math.max(0,Math.ceil((this.hintReadyAt-t)/1e3)),r=`${Qs-n}:${s}`;!e&&r===this.hintLabel||(this.hintLabel=r,this.ui.setHintButton(Qs-n,s))}hint(){if(this.mode!=="play")return;const t=this.level,e=this.hintsUsed.get(t.id)??0,n=performance.now();if(e>=Qs){this.ui.message("No hints left for this room. Start it again from the chapter plans to refresh them.");return}if(n<this.hintReadyAt){this.ui.message(`The next hint is ready in ${Math.ceil((this.hintReadyAt-n)/1e3)} seconds.`);return}const s=Er(t,{from:this.state,cap:Ql});if(!s.actions){this.ui.message(s.capped?"The search is too large from here. Try undoing a few turns.":"This arrangement can no longer be solved. Undo (Z) or restart (R).",0);return}const r=e+1;this.hintsUsed.set(t.id,r),this.hintReadyAt=n+Jg;const o=s.actions[0];let a;if(r===1)a=t.hints[0]??"Look for what a fold would make reachable.";else if(r===2){const l=o.t==="move"?"walking":o.t==="fold"?"folding the room":"using a lever or switch";a=`${t.hints[1]??""} The shortest way from here is ${s.actions.length} more turns, and the next one is ${l}.`.trim()}else{const l=gh(t,o);a=`${l.text} (${l.key}). Then ${s.actions.length-1} more turns.`,o.t==="move"?this.hintDir=o.dir:o.t==="fold"?this.ui.hintFocus(o.kind):this.ui.hintFocus("use")}this.sfx.hint(),this.ui.hint({stage:r,of:Qs,text:a}),this.tickHintLabel(n,!0),this.refreshInsets()}queueSoftlockCheck(){window.clearTimeout(this.softTimer),this.softTimer=window.setTimeout(()=>this.checkSoftlock(),40)}checkSoftlock(){if(this.mode!=="play")return;const t=fs(this.state);if(this.solvable.has(t))return;const e=Er(this.level,{from:this.state,cap:Ql});if(e.actions){let n=sc(this.state);this.solvable.add(fs(n));for(const s of e.actions){const r=cr(this.level,n,s);if(!r.ok)break;n=r.state,this.solvable.add(fs(n))}}else e.capped||this.ui.message("No way forward from here. Undo (Z) or restart (R).",0)}onComplete(){this.mode="complete",this.sfx.complete();const t=this.store.data,e=this.level;t.completed.includes(e.id)||t.completed.push(e.id);const n=t.best[e.id],s=n===void 0||this.turns<n;s&&(t.best[e.id]=this.turns);const r=de[e.index+1];r&&(t.last=r.id),this.store.save(),this.ui.message("The gate opens.");const o=this.parOf(e)??this.turns;this.completeTimer=window.setTimeout(()=>{this.mode==="complete"&&this.ui.showComplete(e,this.turns,o,this.folds,this.hintsUsed.get(e.id)??0,!!r,s)},this.effects()?1100:300)}}function n_(){const i=document.getElementById("view"),t=document.getElementById("hudMsg");if(window.addEventListener("error",()=>{t&&(t.textContent="Something went wrong. Reload the page to continue.",t.classList.add("show"))}),!!i)try{new e_(i)}catch{const n=document.createElement("p");n.className="fatal",n.textContent="PARADOX ROOM could not start in this browser: it needs either WebGL 2 or a 2D canvas, and neither is available. Try another browser, or turn hardware acceleration back on.",document.body.appendChild(n)}}n_();
