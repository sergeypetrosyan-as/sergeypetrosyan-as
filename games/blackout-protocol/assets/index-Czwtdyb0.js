var zh=Object.defineProperty;var Hh=(i,t,e)=>t in i?zh(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var G=(i,t,e)=>Hh(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Gh=["##############################","#.......#,,,......#..........#","#.S.....#,,,....r.#........A.#","#.......#.........#...K......#","#.......#.........#,,,.......#","#.......#.........#,,,.......#","#......L#.L.......#,,,.......#","####.########2##########1#####","#.........,,,,,,.....,,,,,,,.#","#.........,,,,L,.....,,,,,,,.#","#####.##############.#########","#..........#.................#","#..........#L...............L#","#.X.......................e..#","#..........#,,,,,,,,,........#","##############################"],Vh=["####################################","#..........#,,,.........#,,,,......#","#.B.......L#,,,......j..#,,,,....i.#","#..........4,,,.........#,,,,......#","#.......K..#,,,.........#,,,,......#","#..........#,,,.........#,,,,......#","#..........#,,,.........#,,,,.....L#","#####5###########bb##########aaa####","#.............,,,,,,,..............#","#........L....,,,,,,,.....L........#","#####.###########.###########.######","#.....,,,,,#............#..........#","#.....,,,,,#L...........#.........L#","#.....,,,,,#............#..e.......#","#.....,,,,,#............#..........#","#.....,,,,,3........K......K.......#","#.....,,,,,#..e.........#..........#","#.X...,,,,,#,,,,,,,,,,,,#.......S..#","#.....,,,,,#,,,,,,,,,,,,#..........#","####################################"],Wh=["########################################","#,,,.......L#.............#............#","#,,r........#.........u...#............#","#,,,........#.............#L...........#","#...........#.............#............#","#.......K...#aaaaaaaaaaaaa#...K........#","#...........#,,,,,,,,,,,,,#...,,,,,....#","#...........#,,,,,,,,,,,e,#...,,,,,....#","#...........#,,,,,,,,,,,,,#...,,,,,..E.#","#.L.........#L,,,,,,,,,,,L#...,,,,,....#","######.############1############2#######","#.......,,,,,,,.......,,,,,,,..........#","#.......,,,,,,,.....L.,,,,,,,.L........#","######.############.############4#######","#...........L.............#,,,,.......L#","#.e.........#.............#,,,,........#","#...........#.............#,,,,........#","#...........3..,,,,,,,,,...,,,,..K.....#","#..S........#..,,,,,,,,,..#,,,,........#","#...........#..,,,,,,,,,..#,,,e......X.#","#.........L.#..,,,,,,,,,..L,,,,........#","########################################"],Xh=["############################################","#,,,..........#..............#......,,,,,,,#","#,B,........K.#..L...i....L..#......,,,,,C,#","#,,,..........7..............#.............#","#.............#..............#.............#","#L............#..............#............L#","#.............#..............#.............#","#######.############aaa#############.#######","#........,,,,,,,,........,,,,,,,,..........#","#........,e,,,L,,........,,,L,,,,..........#","#######.#############5#############.########","#...............#.......D..#,,,,,..........#","#L..K.........e.#.L........#,,,,,...K.....L#","#...............#..........#,,,,,..........#","#...............#..........#,,L,,..........#","#...............#..........#...............#","#...............#####9######...............#","#...,,,,,,,,,,,,#####.######...............#","#...,,,,,,,,,,,,#..........#...............#","#.E.,,,,,,,,,,,L#......L...#..e.........S..#","#...,,,,,,,,,,,,#..........#...............#","#################....X.....#################","#################..........#################","############################################"],bi=0,fn=Math.PI,kn=Math.PI/2,Se=[{id:"cold-entry",index:0,name:"COLD ENTRY",subtitle:"Halcyon Freight Annex",briefing:['Marrow: "Welcome to the dark, Null. The Annex ships suppression hardware to the districts and logs every crate in one manifest."',"The manifest sits on a vault terminal. The vault door is sealed behind a red keycard. Two guards, one camera. Nobody here has seen you before. Keep it that way."],hints:["Shadow tiles shrink a guard's sight to 40 percent. Sneaking shrinks it again.","The vault door can be unlocked with the red keycard in the office, or hacked open for 15 energy.","The corridor camera can be looped (35 energy) or avoided by sneaking through the shadow stretch."],par:150,map:Gh,objectives:[{id:"manifest",label:"Download the shipping manifest (vault terminal)"},{id:"extract",label:"Reach the extraction dock"}],doors:[{id:"1",locked:!0,card:"red"},{id:"2",locked:!1}],terminals:[{id:"A",len:4,label:"MANIFEST DOWNLOAD",effect:{objective:"manifest"}}],lasers:[],items:[],guards:[{zone:"corridor",route:[{x:3,y:8,wait:2,face:bi},{x:26,y:9,wait:2,face:fn}]},{zone:"office",route:[{x:11,y:3,wait:2.5},{x:16,y:5,wait:2.5},{x:11,y:5,wait:1.5}]}],cameras:[{x:28,y:8,dir:fn,sweep:.5,speed:.8,zone:"corridor"}]},{id:"lattice",index:1,name:"LATTICE",subtitle:"Vantage Tower, server floor",briefing:['Marrow: "WARDEN keeps its patrol schedules on two memory shards. Alpha is east, Beta is in the central server room. Both rooms sit behind laser lattices."',"The east lattice pulses. The central one does not. Cut a grid and the alarm echo pulls guards toward the control corridor. Plan your energy."],hints:["A pulsing grid can be crossed for free in the off window. The beam only trips when you stand inside a beam tile.","The west server room terminal opens the locked door into the central room: an alternate route in or out.","Cutting a grid lasts 5 seconds and pings the corridor. Loop the camera in the central room before you step in."],par:240,map:Vh,objectives:[{id:"shardA",label:"Retrieve shard ALPHA (east server room)"},{id:"shardB",label:"Retrieve shard BETA (central server room)"},{id:"extract",label:"Reach the west extraction lift"}],doors:[{id:"3",locked:!1},{id:"4",locked:!0},{id:"5",locked:!1}],terminals:[{id:"B",len:5,label:"WEST DOOR OVERRIDE",effect:{unlock:"4"}}],lasers:[{id:"a",period:{on:2.5,off:1.5,phase:0},echo:{x:27,y:8}},{id:"b",echo:{x:13,y:8}}],items:[{id:"i",objective:"shardA",label:"SHARD ALPHA"},{id:"j",objective:"shardB",label:"SHARD BETA"}],guards:[{zone:"corridor",route:[{x:2,y:8,wait:2.5,face:bi},{x:33,y:9,wait:2.5,face:fn}]},{zone:"south",route:[{x:13,y:13,wait:2},{x:22,y:13,wait:2},{x:22,y:17,wait:2},{x:13,y:17,wait:2}]},{zone:"east",route:[{x:26,y:2,wait:3,face:kn},{x:26,y:5,wait:3,face:-kn}]}],cameras:[{x:34,y:8,dir:fn,sweep:.5,speed:.8,zone:"corridor"},{x:23,y:1,dir:2.36,sweep:.6,speed:.9,zone:"central"}]},{id:"glass-archive",index:2,name:"GLASS ARCHIVE",subtitle:"Meridian Records",briefing:['Marrow: "The audit log that ties Halcyon to the blackouts lives in the archive wing. You need two keycards: red from the admin office, blue from the security hub."',"The hub is split by a pulsing laser band. The atrium is guarded by a man who never leaves his post. Use the maintenance corridor, or give him something to look at."],hints:["The red card opens the hub door. The blue card is behind the pulsing laser band, north of the hub guard.","Locking a door behind you seals a patrol out. Lockers hide you completely, but not if a guard watches you climb in.","The audit terminal has a tighter timer. Watch the pattern, then repeat it without hesitation."],par:330,map:Wh,objectives:[{id:"card_red",label:"Take the RED keycard (admin office)"},{id:"card_blue",label:"Take the BLUE keycard (security hub)"},{id:"audit",label:"Copy the audit log (archive terminal)"},{id:"extract",label:"Reach the dock lift"}],doors:[{id:"1",locked:!0,card:"red"},{id:"2",locked:!0,card:"blue"},{id:"3",locked:!1},{id:"4",locked:!1}],terminals:[{id:"E",len:6,time:13,label:"AUDIT LOG COPY",effect:{objective:"audit"}}],lasers:[{id:"a",period:{on:3,off:2,phase:0},echo:{x:19,y:11}}],items:[],guards:[{zone:"corridor",route:[{x:2,y:11,wait:3,face:bi},{x:37,y:12,wait:3,face:fn}]},{zone:"atrium",route:[{x:15,y:15,wait:2},{x:24,y:15,wait:2},{x:24,y:19,wait:2},{x:15,y:19,wait:2}]},{zone:"atrium",route:[{x:14,y:17,wait:99,face:fn}],range:8},{zone:"hub",route:[{x:14,y:8,wait:2.5},{x:21,y:8,wait:2.5}]},{zone:"admin",route:[{x:8,y:3,wait:2.5},{x:8,y:8,wait:2.5}]}],cameras:[{x:25,y:14,dir:2.36,sweep:.6,speed:.8,zone:"atrium"},{x:38,y:11,dir:fn,sweep:.5,speed:.8,zone:"corridor"},{x:28,y:9,dir:bi,sweep:.4,speed:.9,zone:"archive"}]},{id:"blackout",index:3,name:"BLACKOUT",subtitle:"The Prometheus Core",briefing:[`Marrow: "This is it. WARDEN's mind lives in the Prometheus Core. Take the root key from the north vault, wake three relay terminals, then purge the core."`,"The purge kills every light in the district and starts a 40 second lockdown. Every guard will run for the core. There is one door between the core and the lift. Lock it behind you."],hints:["Relay R1 in the north-west wing opens a side door into the vault, so you can skip the laser entrance.","The core terminal refuses you until the key and all three relays are done.","After the purge, walk, do not sneak: every tile is shadow and cameras are dead. Lock the lift door behind you (15 energy)."],par:480,map:Xh,objectives:[{id:"key",label:"Take the ROOT KEY (north vault)"},{id:"r1",label:"Activate relay R1 (north-west wing)"},{id:"r2",label:"Activate relay R2 (north-east wing)"},{id:"r3",label:"Activate relay R3 (south-west wing)"},{id:"purge",label:"Purge the core (central terminal)"},{id:"extract",label:"Reach the roof lift before lockdown ends"}],doors:[{id:"5",locked:!1},{id:"7",locked:!0},{id:"9",locked:!1}],terminals:[{id:"B",len:5,label:"RELAY R1",effect:{objective:"r1",unlock:"7"}},{id:"C",len:5,label:"RELAY R2",effect:{objective:"r2"}},{id:"E",len:6,label:"RELAY R3",effect:{objective:"r3"}},{id:"D",len:7,time:16,label:"CORE PURGE",effect:{objective:"purge",finale:!0,needs:["key","r1","r2","r3"]}}],lasers:[{id:"a",echo:{x:12,y:8}}],items:[{id:"i",objective:"key",label:"ROOT KEY"}],guards:[{zone:"hall",route:[{x:2,y:8,wait:2.5,face:bi},{x:41,y:9,wait:2.5,face:fn}]},{zone:"nw",route:[{x:9,y:2,wait:3,face:fn},{x:12,y:2,wait:3,face:bi}]},{zone:"ne",route:[{x:31,y:2,wait:3,face:kn},{x:31,y:5,wait:3,face:-kn}]},{zone:"sw",route:[{x:12,y:12,wait:3,face:kn},{x:12,y:16,wait:3,face:-kn}]},{zone:"se",route:[{x:30,y:18,wait:3,face:-kn},{x:30,y:13,wait:3,face:kn}]}],cameras:[{x:42,y:9,dir:fn,sweep:.4,speed:.8,zone:"hall"},{x:28,y:1,dir:2.36,sweep:.5,speed:.9,zone:"vault"}],finale:{countdown:40,alert:50}}],Nc=0,jn=1,De=2,_i=3,kr=4,mn=5,mi=6,hl=new WeakMap,qh="ABCDEFGHIJ",Yh="abcd",$h="eruyijm";function Kh(i){const t=hl.get(i);if(t)return t;const e=i.map,n=e.length,s=e[0]?.length??0,r=new Uint8Array(s*n),a=new Int16Array(s*n).fill(-1),o=[],l={w:s,h:n,kind:r,ref:a,start:{x:-1,y:-1},exit:{x:-1,y:-1},checkpoints:[],items:[],lockers:[],errors:o},c=new Set;for(let h=0;h<n;h++){e[h].length!==s&&o.push(`row ${h} width ${e[h].length} != ${s}`);for(let u=0;u<s;u++){const f=e[h][u]??"#",d=h*s+u;if(r[d]=Nc,f==="#")r[d]=De;else if(f===",")r[d]=jn;else if(f==="L")r[d]=_i,l.lockers.push({x:u,y:h});else if(f==="S")l.start={x:u,y:h};else if(f==="X")l.exit={x:u,y:h};else if(f==="K")l.checkpoints.push({x:u,y:h});else if(f>="1"&&f<="9"){r[d]=mn;const v=i.doors.findIndex(g=>g.id===f);v<0&&o.push(`door ${f} has no def`),a[d]=v,c.add(f)}else if(qh.includes(f)){r[d]=kr;const v=i.terminals.findIndex(g=>g.id===f);v<0&&o.push(`terminal ${f} has no def`),a[d]=v}else if(Yh.includes(f)){r[d]=mi;const v=i.lasers.findIndex(g=>g.id===f);v<0&&o.push(`laser ${f} has no def`),a[d]=v}else $h.includes(f)?l.items.push({ch:f,x:u,y:h}):f!=="."&&o.push(`unknown char '${f}' at ${u},${h}`)}}l.start.x<0&&o.push("no start"),l.exit.x<0&&o.push("no exit");for(const h of i.doors)c.has(h.id)||o.push(`door ${h.id} missing from map`);return hl.set(i,l),l}function xe(i,t,e){return t<0||e<0||t>=i.w||e>=i.h?De:i.kind[e*i.w+t]}function Fs(i,t,e){const n=xe(i.map,t,e);return n===De||n===_i||n===kr?!0:n===mn?i.doors[i.map.ref[e*i.map.w+t]]?.locked??!0:!1}function Br(i,t,e){const n=xe(i.map,t,e);return n===De||n===_i?!0:n===mn?!(i.doors[i.map.ref[e*i.map.w+t]]?.open??!1):!1}function Fc(i,t,e,n,s,r){let a=Math.floor(t),o=Math.floor(e);const l=Math.floor(n),c=Math.floor(s),h=n-t,u=s-e,f=h>0?1:-1,d=u>0?1:-1,v=h===0?1/0:Math.abs(1/h),g=u===0?1/0:Math.abs(1/u);let m=h===0?1/0:(f>0?a+1-t:t-a)*v,p=u===0?1/0:(d>0?o+1-e:e-o)*g,x=0;for(let M=0;M<256&&(a!==l||o!==c)&&(m<p?(m+=v,a+=f):(p+=g,o+=d),!(a===l&&o===c));M++)if(Br(i,a,o)&&(x++,r))return x;return x}function jh(i,t,e,n,s){return Fc(i,t,e,n,s,!0)===0}function zr(i,t,e){return i.blackout?!1:xe(i.map,Math.floor(t),Math.floor(e))!==jn}function $i(i,t,e){return!Fs(i,t,e)}const Jh=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];function Zh(i,t,e,n,s){const r=i.map.w,a=i.map.h;if(t===n&&e===s)return[];if(!$i(i,n,s))return null;const o=new Int32Array(r*a).fill(-2),l=[e*r+t];o[e*r+t]=-1;const c=s*r+n;let h=0;for(;h<l.length;){const f=l[h++];if(f===c)break;const d=f%r,v=f/r|0;for(const[g,m]of Jh){const p=d+g,x=v+m;if(p<0||x<0||p>=r||x>=a)continue;const M=x*r+p;o[M]!==-2||!$i(i,p,x)||g!==0&&m!==0&&(!$i(i,d+g,v)||!$i(i,d,v+m))||(o[M]=f,l.push(M))}}if(o[c]===-2)return null;const u=[];for(let f=c;f!==e*r+t;f=o[f])u.push({x:f%r+.5,y:(f/r|0)+.5});return u.reverse()}function Oc(i,t,e){const n=Math.floor(t),s=Math.floor(e);if($i(i,n,s))return{x:n+.5,y:s+.5};for(let r=1;r<5;r++)for(let a=-r;a<=r;a++)for(let o=-r;o<=r;o++)if($i(i,n+o,s+a))return{x:n+o+.5,y:s+a+.5};return{x:n+.5,y:s+.5}}const Sr=1/60,xt={PLAYER_R:.28,WALK:3.2,SNEAK:1.5,ENERGY_MAX:100,HACK_RANGE:8,COST_LOOP:35,COST_DOOR:15,COST_DECOY:20,COST_CUT:30,LOOP_T:6,LOOP_WATCH:2,CUT_T:5,DECOY_T:8,DECOY_RADIUS:9,ECHO_RADIUS:9,ENERGY_CELL:40,WALK_NOISE:4.5,WALK_NOISE_EVERY:.34,SNEAK_NOISE:1.6,SNEAK_NOISE_EVERY:.5,GUARD_PATROL:1.7,GUARD_INVESTIGATE:2.5,GUARD_CHASE:3,GUARD_FOV:70*Math.PI/180,GUARD_RANGE:7,CAM_FOV:56*Math.PI/180,CAM_RANGE:9,SUS_THRESHOLD:35,FILL_GUARD:55,FILL_CAMERA:70,SEARCH_TIME:15,CATCH_DIST:.8,LOCKDOWN:100,SHADOW_RANGE:.4,SNEAK_RANGE:.75},Jn={easy:{fill:.75,range:.9,regen:5,puzzleExtra:0},normal:{fill:1,range:1,regen:4,puzzleExtra:0},hard:{fill:1.3,range:1.1,regen:3.2,puzzleExtra:1}};function kc(i,t){let e=(i-t)%(Math.PI*2);return e>Math.PI&&(e-=Math.PI*2),e<-Math.PI&&(e+=Math.PI*2),e}function rs(i,t,e){const n=kc(t,i);return Math.abs(n)<=e?t:i+Math.sign(n)*e}function Qh(i,t){const e=i.player,n=zr(i,e.x,e.y);return t*(n?1:xt.SHADOW_RANGE)*(e.sneak?xt.SNEAK_RANGE:1)}function Io(i,t,e,n,s,r){const a=i.player,o={seen:!1,dist:99,prox:0};if(a.hidden)return o;const l=a.x-t,c=a.y-e,h=Math.hypot(l,c),u=Math.max(1,Qh(i,r));if(!(h<=1)&&(h>u||Math.abs(kc(Math.atan2(c,l),n))>s/2)||!jh(i,t,e,a.x,a.y))return o;const d=Math.min(1.7,Math.max(.7,1.7-h/u));return{seen:!0,dist:h,prox:d}}function Gt(i,t,e,n,s,r){i.events.push({k:t,x:e,y:n,msg:s,v:r}),i.events.length>120&&i.events.splice(0,i.events.length-120)}function Os(i,t){i.alert=Math.min(xt.LOCKDOWN,i.alert+t),i.alert>i.alertPeak&&(i.alertPeak=i.alert)}function fi(i,t,e,n,s,r=.7){i.rings.push({x:t,y:e,r:n,age:0,ttl:r,kind:s}),i.rings.length>24&&i.rings.shift()}function Yn(i,t,e,n,s,r){const a=t.state;t.state="suspicious",t.phase="look",t.phaseT=.7,t.target={x:e,y:n},t.path=null,t.decoy=!1,t.sus=Math.max(t.sus,s),r&&a==="patrol"&&(i.stats.detections++,Gt(i,"suspicious",t.x,t.y))}function tu(i,t){t.state="alert",t.lostT=0,t.path=null,t.repathT=0,t.decoy=!1,t.sus=100,i.stats.spotted++,Os(i,20),Gt(i,"alert",t.x,t.y);const e=i.player.x,n=i.player.y;for(const s of i.guards)s===t||s.state==="alert"||Math.hypot(s.x-t.x,s.y-t.y)<=12&&Yn(i,s,e,n,60,!0)}function eu(i,t){t.state="search",t.path=null,t.repathT=0,t.target=t.lastSeen?{...t.lastSeen}:{x:t.x,y:t.y},t.sus=Math.min(t.sus,60),Gt(i,"search",t.x,t.y)}function Ls(i,t,e){const n=i.path;if(!n)return!0;for(;n.length&&Math.hypot(n[0].x-i.x,n[0].y-i.y)<.08;)n.shift();if(!n.length)return!0;const s=n[0].x,r=n[0].y,a=Math.hypot(s-i.x,r-i.y),o=Math.min(a,t*e);return i.x+=(s-i.x)/a*o,i.y+=(r-i.y)/a*o,i.dir=rs(i.dir,Math.atan2(r-i.y,s-i.x),4*e),!1}function Ds(i,t,e,n){const s=Zh(i,Math.floor(t.x),Math.floor(t.y),Math.floor(e),Math.floor(n));return t.path=s,s!==null}function Bc(i,t){if(!t.path||!t.path.length)return!1;const e=t.path[0];return Fs(i,Math.floor(e.x),Math.floor(e.y))}function Oa(i,t,e,n){const s=e+.5*Math.sin(i.time*1.4+t.id*1.7);t.dir=rs(t.dir,s,3*n)}function Is(i,t,e,n,s){for(const r of i.guards){if(r.state==="alert")continue;const a=Math.hypot(r.x-t,r.y-e);if(a>n*2)continue;const o=Fc(i,r.x,r.y,t,e,!1),l=a*(1+.8*o);if(!(l>n)){if(s==="step")(r.state==="patrol"||r.state==="search")&&(r.sus=Math.max(r.sus,20+30*(1-l/n)),r.lastSeen={x:t,y:e},r.state==="patrol"&&r.sus>=xt.SUS_THRESHOLD&&Yn(i,r,t,e,r.sus,!0));else if(s==="alarm")r.sus=Math.max(r.sus,50),r.noContact=0,r.state!=="search"?Yn(i,r,t,e,50,!0):(r.target={x:t,y:e},r.path=null);else if(r.state==="patrol"||r.state==="suspicious"||r.state==="search"){const c=r.state;Yn(i,r,t,e,40,!1),r.decoy=!0,c!=="suspicious"&&i.stats.decoyPulls++,Gt(i,"lure",r.x,r.y)}}}}function nu(i,t){const e=Jn[i.difficulty],n=i.player;for(const s of i.guards){const r=Io(i,s.x,s.y,s.dir,s.fov,s.range*e.range);if(s.seeing=r.seen,r.seen){s.noContact=0,s.lastSeen={x:n.x,y:n.y};const a=xt.FILL_GUARD*r.prox*e.fill*(i.alert>=60?1.25:1)*(s.state==="search"?1.25:1);s.sus=Math.min(100,s.sus+a*t)}else if(s.noContact+=t,s.noContact>.6){const a=s.state==="patrol"?14:s.state==="suspicious"?8:s.state==="search"?6:0;s.sus=Math.max(0,s.sus-a*t)}switch(s.repathT-=t,s.state!=="alert"&&s.sus>=100&&r.seen?tu(i,s):s.state==="patrol"&&s.sus>=xt.SUS_THRESHOLD&&s.lastSeen&&Yn(i,s,s.lastSeen.x,s.lastSeen.y,s.sus,!0),s.state){case"patrol":iu(i,s,t);break;case"suspicious":su(i,s,t);break;case"alert":ru(i,s,t);break;case"search":au(i,s,t);break}}}function iu(i,t,e){const n=t.route[t.ri];if(!n)return;if(t.waitT>0){t.waitT-=e,Oa(i,t,n.face??t.baseFace,e),t.waitT<=0&&(t.ri=(t.ri+1)%t.route.length,t.path=null);return}if(!t.path||Bc(i,t)){if(!Ds(i,t,n.x,n.y)){t.blockedT+=e,Oa(i,t,t.baseFace,e),t.blockedT>2&&(t.blockedT=0,t.ri=(t.ri+1)%t.route.length);return}t.blockedT=0}Ls(t,xt.GUARD_PATROL,e)&&(t.waitT=n.wait,t.baseFace=n.face??t.dir,n.wait<=0&&(t.ri=(t.ri+1)%t.route.length),t.path=null)}function su(i,t,e){const n=t.target;if(!n){t.state="patrol";return}if(t.phase==="look")t.dir=rs(t.dir,Math.atan2(n.y-t.y,n.x-t.x),4*e),t.phaseT-=e,t.phaseT<=0&&(t.phase="go",t.path=null);else if(t.phase==="go"){if((!t.path||Bc(i,t))&&!Ds(i,t,n.x,n.y)){t.phase="inspect",t.phaseT=1.5;return}Ls(t,xt.GUARD_INVESTIGATE,e)&&(t.phase="inspect",t.phaseT=2.5,t.baseFace=t.dir)}else Oa(i,t,t.baseFace,e),t.phaseT-=e,t.decoy&&i.decoy&&(t.phaseT=Math.max(t.phaseT,.6)),t.phaseT<=0&&(t.state="patrol",t.decoy=!1,t.path=null,t.sus=Math.min(t.sus,20))}function ru(i,t,e){const n=i.player;if(n.hidden&&t.lockerTarget){(t.repathT<=0||!t.path)&&(Ds(i,t,t.lockerTarget.x,t.lockerTarget.y),t.repathT=.4),Ls(t,xt.GUARD_CHASE,e),Math.hypot(t.x-t.lockerTarget.x,t.y-t.lockerTarget.y)<1.2&&(i.status="compromised",i.reason="caught");return}const s=t.seeing?{x:n.x,y:n.y}:t.lastSeen??{x:t.x,y:t.y};(t.repathT<=0||!t.path)&&(Ds(i,t,s.x,s.y),t.repathT=.4),Ls(t,xt.GUARD_CHASE,e),t.seeing?(t.dir=rs(t.dir,Math.atan2(n.y-t.y,n.x-t.x),6*e),t.lostT=0,Os(i,6*e),Math.hypot(n.x-t.x,n.y-t.y)<xt.CATCH_DIST&&(i.status="compromised",i.reason="caught")):(t.lostT+=e,t.lostT>3&&eu(i,t))}function au(i,t,e){const n=t.target;if(t.noContact>=xt.SEARCH_TIME){t.state="patrol",t.sus=0,t.path=null,t.lockerTarget=null;return}n&&(!t.path&&Math.hypot(n.x-t.x,n.y-t.y)>.6&&Ds(i,t,n.x,n.y),t.path&&Ls(t,xt.GUARD_INVESTIGATE,e)&&(t.path=null),t.path||(t.dir+=1.2*e))}function ou(i){i.rng=i.rng+1831565813|0;let t=i.rng;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}const lu=["UP","RIGHT","DOWN","LEFT"];function cu(i,t,e,n){const s=[];for(let o=0;o<e;o++)s.push(Math.floor(ou(i)*4));const r=1.4+.5*e,a=n??5+1.3*e;return{terminal:t,seq:s,input:[],phase:"show",showT:r,showTotal:r,timeLeft:a,limit:a,endT:0}}function ul(i,t){i.phase==="show"?(i.showT-=t,i.showT<=0&&(i.phase="input")):i.phase==="input"?(i.timeLeft-=t,i.timeLeft<=0&&(i.timeLeft=0,i.phase="fail",i.endT=.9)):i.endT-=t}function hu(i,t){if(i.phase!=="input"||t<0||t>3)return"none";const e=i.input.length;return i.seq[e]!==t?(i.phase="fail",i.endT=.9,"fail"):(i.input.push(t),i.input.length>=i.seq.length?(i.phase="ok",i.endT=.7,"ok"):"progress")}const Yr={r:"red",u:"blue",y:"yellow"},ka={red:"RED",blue:"BLUE",yellow:"YELLOW"};function $r(i,t="normal",e=1337){const n=Kh(i),s=i.guards.map((u,f)=>{const d=u.route.map(p=>({x:p.x+.5,y:p.y+.5,wait:p.wait,face:p.face})),v=d[0],g=d[1%d.length],m=v.face??Math.atan2(g.y-v.y,g.x-v.x);return{id:f,x:v.x,y:v.y,dir:m,baseFace:m,state:"patrol",sus:0,route:d,ri:d.length>1?1:0,waitT:d.length>1?0:v.wait,fov:u.fov??xt.GUARD_FOV,range:u.range??xt.GUARD_RANGE,zone:u.zone,path:null,repathT:0,target:null,lastSeen:null,noContact:99,seeing:!1,phase:"look",phaseT:0,decoy:!1,lostT:0,blockedT:0,lockerTarget:null}}),r=i.cameras.map((u,f)=>({id:f,x:u.x+.5,y:u.y+.5,baseDir:u.dir,dir:u.dir,sweep:u.sweep,speed:u.speed,phase:f*1.3,fov:u.fov??xt.CAM_FOV,range:u.range??xt.CAM_RANGE,zone:u.zone,sus:0,loopT:0,loopWatch:0,trackT:0,spotCd:0,seeing:!1})),a=i.doors.map(u=>{let f={x:0,y:0};for(let d=0;d<n.h;d++)for(let v=0;v<n.w;v++)n.kind[d*n.w+v]===5&&i.doors[n.ref[d*n.w+v]]===u&&(f={x:v,y:d});return{id:u.id,x:f.x,y:f.y,locked:u.locked,card:u.card,open:!1,msgCd:0}}),o=i.lasers.map((u,f)=>{const d=[];for(let v=0;v<n.h;v++)for(let g=0;g<n.w;g++)n.kind[v*n.w+g]===mi&&n.ref[v*n.w+g]===f&&d.push({x:g,y:v});return{id:u.id,cells:d,cutT:0,clock:0,active:!0,tripCd:0,echo:{x:u.echo.x+.5,y:u.echo.y+.5},period:u.period?{on:u.period.on,off:u.period.off,phase:u.period.phase??0}:void 0}}),l=i.terminals.map((u,f)=>{let d={x:0,y:0};for(let v=0;v<n.h;v++)for(let g=0;g<n.w;g++)n.kind[v*n.w+g]===4&&n.ref[v*n.w+g]===f&&(d={x:g,y:v});return{id:u.id,x:d.x,y:d.y,def:u,done:!1,lockT:0}}),c=n.items.map(u=>{if(u.ch==="e")return{ch:u.ch,x:u.x,y:u.y,kind:"energy",label:"ENERGY CELL",taken:!1};if(Yr[u.ch])return{ch:u.ch,x:u.x,y:u.y,kind:"card",card:Yr[u.ch],label:`${ka[Yr[u.ch]]} KEYCARD`,taken:!1};const f=i.items.find(d=>d.id===u.ch);return{ch:u.ch,x:u.x,y:u.y,kind:"data",objective:f?.objective,label:f?.label??"DATA",taken:!1}}),h={};for(const u of i.objectives)h[u.id]=!1;return{missionId:i.id,map:n,def:i,difficulty:t,time:0,rng:e,player:{x:n.start.x+.5,y:n.start.y+.5,dir:0,sneak:!1,hidden:!1,locker:-1,moving:!1,energy:xt.ENERGY_MAX,hackIdle:99,cards:[],stepT:0,focus:null},guards:s,cameras:r,doors:a,lasers:o,terminals:l,items:c,checkpoints:n.checkpoints.map(u=>({x:u.x+.5,y:u.y+.5,hit:!1})),cpHit:0,decoy:null,puzzle:null,objectives:h,alert:0,alertPeak:0,stats:{spotted:0,alarms:0,retries:0,detections:0,decoyPulls:0,hacks:{camera:0,door:0,decoy:0,laser:0},shadowSneakT:0,sneakT:0,moveT:0,terminals:0},status:"playing",reason:"",finale:{active:!1,t:0,started:!1},blackout:!1,rings:[],events:[]}}function zs(i){const{map:t,def:e,events:n,...s}=i;return structuredClone(s)}function Kr(i,t,e=!0){const n={time:i.time,stats:structuredClone(i.stats),peak:i.alertPeak,cpHit:i.cpHit},s=structuredClone(t);Object.assign(i,s),i.time=n.time,i.stats=n.stats,i.alertPeak=n.peak,i.status="playing",i.reason="",i.events=[],i.puzzle=null,i.player.hidden=!1,i.player.locker=-1,e&&(i.stats.retries++,i.alert=30,i.alert>i.alertPeak&&(i.alertPeak=i.alert));for(const r of i.guards)r.lockerTarget=null,r.seeing=!1}function ie(i,t){Gt(i,"toast",void 0,void 0,t)}function fl(i,t,e){const n=xt.PLAYER_R,s=Math.floor(t-n),r=Math.floor(t+n),a=Math.floor(e-n),o=Math.floor(e+n);for(let l=a;l<=o;l++)for(let c=s;c<=r;c++)if(Fs(i,c,l))return!0;return!1}function as(i){const t=i.player,e=[];return i.cameras.forEach((n,s)=>{const r=Math.hypot(n.x-t.x,n.y-t.y);r<=xt.HACK_RANGE&&e.push({kind:"camera",i:s,x:n.x,y:n.y,dist:r,label:"CAMERA",action:"LOOP CAMERA",cost:xt.COST_LOOP})}),i.doors.forEach((n,s)=>{const r=Math.hypot(n.x+.5-t.x,n.y+.5-t.y);r<=xt.HACK_RANGE&&e.push({kind:"door",i:s,x:n.x+.5,y:n.y+.5,dist:r,label:"DOOR",action:n.locked?"UNLOCK DOOR":"LOCK DOOR",cost:xt.COST_DOOR})}),i.lasers.forEach((n,s)=>{let r=1e9,a=0,o=0;for(const l of n.cells){const c=Math.hypot(l.x+.5-t.x,l.y+.5-t.y);c<r&&(r=c,a=l.x+.5,o=l.y+.5)}r<=xt.HACK_RANGE&&e.push({kind:"laser",i:s,x:a,y:o,dist:r,label:"LASER GRID",action:"CUT GRID",cost:xt.COST_CUT})}),e.sort((n,s)=>n.dist-s.dist),e}function uu(i){const t=as(i),e=i.player.focus;e&&t.some(n=>n.kind===e.kind&&n.i===e.i)||(i.player.focus=t.length?{kind:t[0].kind,i:t[0].i}:null)}function fu(i){const t=as(i);if(!t.length){i.player.focus=null;return}const e=i.player.focus,n=e?t.findIndex(r=>r.kind===e.kind&&r.i===e.i):-1,s=t[(n+1)%t.length];i.player.focus={kind:s.kind,i:s.i},Gt(i,"cycle",s.x,s.y)}function br(i,t){const e=i.player;return e.energy+1e-6<t?(ie(i,`NOT ENOUGH ENERGY (NEED ${t})`),Gt(i,"deny"),!1):(e.energy-=t,e.hackIdle=0,!0)}function du(i){const t=i.player.focus;if(!t)return ie(i,"NO DEVICE IN RANGE"),!1;const n=as(i).find(s=>s.kind===t.kind&&s.i===t.i);if(!n)return ie(i,"TARGET OUT OF RANGE"),!1;if(t.kind==="camera"){const s=i.cameras[t.i];if(s.loopT>0)return ie(i,"FEED ALREADY LOOPED"),!1;if(!br(i,xt.COST_LOOP))return!1;s.loopT=xt.LOOP_T,s.loopWatch=xt.LOOP_WATCH,s.sus=0,s.trackT=0,i.stats.hacks.camera++,Gt(i,"hack",s.x,s.y,"FEED LOOPED — 6s"),ie(i,"CAMERA LOOPED — 6 SECONDS BLIND"),fi(i,s.x,s.y,1.5,"hack",.8)}else if(t.kind==="door"){const s=i.doors[t.i];if(!s.locked){const r=s.x+.5,a=s.y+.5;if(Math.hypot(i.player.x-r,i.player.y-a)<.8||i.guards.some(o=>Math.hypot(o.x-r,o.y-a)<.8))return ie(i,"DOOR OBSTRUCTED"),!1}if(!br(i,xt.COST_DOOR))return!1;s.locked=!s.locked,s.locked&&(s.open=!1),i.stats.hacks.door++,Gt(i,"hack",s.x+.5,s.y+.5),ie(i,s.locked?"DOOR LOCKED":"DOOR UNLOCKED"),fi(i,s.x+.5,s.y+.5,1.2,"hack",.8)}else{const s=i.lasers[t.i];if(s.cutT>0)return ie(i,"GRID ALREADY DOWN"),!1;if(!br(i,xt.COST_CUT))return!1;s.cutT=xt.CUT_T,i.stats.hacks.laser++,Gt(i,"hack",n.x,n.y),ie(i,"GRID CUT — 5 SECONDS. ALARM ECHO SENT"),fi(i,s.echo.x,s.echo.y,xt.ECHO_RADIUS,"alarm",.9),Is(i,s.echo.x,s.echo.y,xt.ECHO_RADIUS,"alarm")}return!0}function pu(i){const t=i.player;if(i.decoy)return ie(i,"DECOY ALREADY ACTIVE"),!1;if(t.hidden||!br(i,xt.COST_DECOY))return!1;let e=t.x,n=t.y;const s=Math.cos(t.dir),r=Math.sin(t.dir);for(let a=.25;a<=3;a+=.25){const o=t.x+s*a,l=t.y+r*a;if(Fs(i,Math.floor(o),Math.floor(l)))break;e=o,n=l}return i.decoy={x:e,y:n,t:xt.DECOY_T,pingT:0},i.stats.hacks.decoy++,Gt(i,"decoy",e,n),ie(i,"DECOY DEPLOYED — 8 SECONDS"),!0}function Ba(i,t,e,n){return Math.hypot(i.player.x-t,i.player.y-e)<=n}function mu(i,t){const e=i.player,n=i.map.lockers[t],s=n.x+.5,r=n.y+.5;for(const a of i.guards)(a.state==="alert"||a.state==="suspicious")&&Math.hypot(a.x-e.x,a.y-e.y)<7&&Io(i,a.x,a.y,a.dir,Math.PI*2,a.range).seen&&(a.lockerTarget={x:s,y:r},a.state="alert",a.lostT=0,a.path=null,a.repathT=0,a.decoy=!1);e.hidden=!0,e.locker=t,e.x=s,e.y=r,e.moving=!1,Gt(i,"locker",s,r),ie(i,"HIDDEN IN LOCKER")}function gu(i){const t=i.player,e=i.map.lockers[t.locker],n=[[0,1],[0,-1],[1,0],[-1,0]];t.hidden=!1;for(const s of i.guards)s.lockerTarget=null;for(const[s,r]of n)if(!Fs(i,e.x+s,e.y+r)){t.x=e.x+s+.5,t.y=e.y+r+.5;break}t.locker=-1,Gt(i,"locker",t.x,t.y)}function vu(i){const t=i.player;if(t.hidden){gu(i);return}let e=1.65,n="",s=-1;if(i.map.lockers.forEach((r,a)=>{const o=Math.hypot(r.x+.5-t.x,r.y+.5-t.y);o<e&&(e=o,n="locker",s=a)}),i.terminals.forEach((r,a)=>{const o=Math.hypot(r.x+.5-t.x,r.y+.5-t.y);o<e&&(e=o,n="terminal",s=a)}),n==="locker"){mu(i,s);return}if(n==="terminal"){const r=i.terminals[s];if(r.done){ie(i,"TERMINAL ALREADY COMPLETE");return}if(r.lockT>0){ie(i,`TERMINAL LOCKED OUT (${Math.ceil(r.lockT)}s)`);return}const a=(r.def.effect.needs??[]).filter(l=>!i.objectives[l]);if(a.length){const l=a.map(c=>i.def.objectives.find(h=>h.id===c)?.label??c);ie(i,`ACCESS DENIED — ${l.join(", ")}`),Gt(i,"deny");return}const o=r.def.len+Jn[i.difficulty].puzzleExtra;i.puzzle=cu(i,s,o,r.def.time),Gt(i,"puzzleStart",r.x+.5,r.y+.5);return}ie(i,"NOTHING TO INTERACT WITH")}function _u(i){const t=i.def.finale;if(!t)return;i.finale={active:!0,t:t.countdown,started:!0},i.blackout=!0,i.alert=Math.max(i.alert,t.alert),i.alertPeak=Math.max(i.alertPeak,i.alert);for(const s of i.cameras)s.loopT=9999,s.sus=0;const e=i.terminals.find(s=>s.def.effect.finale),n=e?Oc(i,e.x+.5,e.y+1.5):{x:i.player.x,y:i.player.y};for(const s of i.guards)s.state!=="alert"&&Yn(i,s,n.x,n.y,60,!0);Gt(i,"finale"),Gt(i,"checkpoint",i.player.x,i.player.y,"purge"),ie(i,"PURGE RUNNING — LIGHTS OUT. REACH THE LIFT")}function xu(i,t){const e=i.terminals[t.terminal];e.done=!0,i.stats.terminals++;const n=e.def.effect;if(n.objective&&(i.objectives[n.objective]=!0,Gt(i,"objective",void 0,void 0,n.objective)),n.unlock){const s=i.doors.find(r=>r.id===n.unlock);s&&(s.locked=!1,ie(i,"DOOR UNLOCKED BY TERMINAL"))}Gt(i,"puzzleOk",e.x+.5,e.y+.5),ie(i,`${e.def.label} — COMPLETE`),n.finale&&_u(i)}function yu(i,t){const e=i.terminals[t.terminal];e.lockT=8;const n=e.x+.5,s=e.y+.5;Gt(i,"puzzleFail",n,s),ie(i,"INTRUSION DETECTED — TERMINAL LOCKED OUT"),Os(i,8),fi(i,n,s,7,"alarm",.9),Is(i,n,s,7,"alarm"),i.stats.alarms++}function Mu(i,t,e=Sr){if(i.status!=="playing")return;const n=i.player;i.time+=e;const s=Jn[i.difficulty];if(i.puzzle){const l=i.puzzle,c=l.phase;if(l.phase==="show"||l.phase==="input")if(t.cancel||t.interact)i.puzzle=null;else{if(t.dir>=0){const u=hu(l,t.dir);u==="progress"?Gt(i,"puzzleKey",void 0,void 0,void 0,l.input.length):u==="fail"&&Gt(i,"puzzleBad")}ul(l,e);const h=l.phase;c==="input"&&h==="ok"?xu(i,l):c==="input"&&h==="fail"&&yu(i,l)}else ul(l,e),l.endT<=0&&(i.puzzle=null)}else t.interact&&vu(i),n.hidden||(t.cycle&&fu(i),t.hack&&du(i),t.decoy&&pu(i));n.sneak=t.sneak;const r=Math.hypot(t.mx,t.my);if(n.moving=!1,!n.hidden&&!i.puzzle&&i.status==="playing"&&r>.01){const l=t.mx/Math.max(1,r),c=t.my/Math.max(1,r),h=(n.sneak?xt.SNEAK:xt.WALK)*Math.min(1,r),u=l*h*e,f=c*h*e,d=n.x,v=n.y;fl(i,n.x+u,n.y)||(n.x+=u),fl(i,n.x,n.y+f)||(n.y+=f),n.moving=Math.hypot(n.x-d,n.y-v)>1e-5,n.dir=rs(n.dir,Math.atan2(c,l),14*e)}if(n.moving){if(i.stats.moveT+=e,n.sneak&&(i.stats.sneakT+=e,(xe(i.map,Math.floor(n.x),Math.floor(n.y))===1||i.blackout)&&(i.stats.shadowSneakT+=e)),n.stepT-=e,n.stepT<=0){n.stepT=n.sneak?xt.SNEAK_NOISE_EVERY:xt.WALK_NOISE_EVERY;const l=n.sneak?xt.SNEAK_NOISE:xt.WALK_NOISE;Is(i,n.x,n.y,l,"step"),fi(i,n.x,n.y,l,n.sneak?"sneak":"step",.5),Gt(i,"step",n.x,n.y,void 0,n.sneak?1:0)}}else n.stepT=0;n.hackIdle+=e,n.hackIdle>=1&&(n.energy=Math.min(xt.ENERGY_MAX,n.energy+s.regen*e)),Su(i,e),bu(i),uu(i),Eu(i,e),nu(i,e),!i.guards.some(l=>l.state==="alert")&&!i.cameras.some(l=>l.trackT>0)&&(i.alert=Math.max(0,i.alert-2*e)),i.alert>=xt.LOCKDOWN&&i.status==="playing"&&(i.status="compromised",i.reason="lockdown");for(const l of i.rings)l.age+=e;if(i.rings=i.rings.filter(l=>l.age<l.ttl),i.finale.active){const l=Math.ceil(i.finale.t);i.finale.t-=e,Math.ceil(i.finale.t)!==l&&i.finale.t>0&&Gt(i,"countdown",void 0,void 0,void 0,Math.ceil(i.finale.t)),i.finale.t<=0&&i.status==="playing"&&(i.status="compromised",i.reason="countdown")}i.def.objectives.filter(l=>l.id!=="extract"&&!l.optional).every(l=>i.objectives[l.id])&&i.status==="playing"&&Ba(i,i.map.exit.x+.5,i.map.exit.y+.5,.75)&&(i.objectives.extract=!0,i.status="complete",Gt(i,"complete")),i.status==="compromised"&&Gt(i,"compromised",n.x,n.y,i.reason)}function Su(i,t){const e=i.player;for(const n of i.doors){n.msgCd-=t;const s=n.x+.5,r=n.y+.5,a=Math.hypot(e.x-s,e.y-r);n.locked&&n.card&&e.cards.includes(n.card)&&a<1.6?(n.locked=!1,ie(i,`ACCESS GRANTED — ${ka[n.card]} KEYCARD`),Gt(i,"door",s,r)):n.locked&&a<1.1&&n.msgCd<=0&&(n.msgCd=2.5,ie(i,n.card?`LOCKED — NEEDS ${ka[n.card]} KEYCARD OR A HACK`:"LOCKED — HACK IT OR FIND ANOTHER WAY"),Gt(i,"deny"));const o=a<1.2||i.guards.some(c=>Math.hypot(c.x-s,c.y-r)<1.2),l=!n.locked&&o;l!==n.open&&Gt(i,"door",s,r),n.open=l}for(const n of i.lasers){n.clock+=t,n.cutT=Math.max(0,n.cutT-t),n.tripCd=Math.max(0,n.tripCd-t);const s=n.period,r=!s||(n.clock+s.phase)%(s.on+s.off)<s.on;if(n.active=n.cutT<=0&&r,n.active&&n.tripCd<=0&&!e.hidden){const a=Math.floor(e.x),o=Math.floor(e.y);xe(i.map,a,o)===mi&&i.def.lasers[i.map.ref[o*i.map.w+a]]?.id===n.id&&(n.tripCd=3,i.stats.alarms++,Os(i,20),Gt(i,"laser",e.x,e.y),ie(i,"LASER TRIPPED — ALARM"),fi(i,e.x,e.y,10,"alarm",.9),Is(i,e.x,e.y,10,"alarm"))}}for(const n of i.terminals)n.lockT=Math.max(0,n.lockT-t);if(i.decoy){const n=i.decoy;n.t-=t,n.pingT-=t,n.pingT<=0&&n.t>0&&(n.pingT=1,fi(i,n.x,n.y,xt.DECOY_RADIUS,"decoy",.9),Gt(i,"ping",n.x,n.y),Is(i,n.x,n.y,xt.DECOY_RADIUS,"decoy")),n.t<=0&&(i.decoy=null)}}function bu(i){const t=i.player;for(const e of i.items)if(!(e.taken||!Ba(i,e.x+.5,e.y+.5,.6)||t.hidden)){if(e.kind==="energy"){if(t.energy>=xt.ENERGY_MAX-1)continue;t.energy=Math.min(xt.ENERGY_MAX,t.energy+xt.ENERGY_CELL),ie(i,"ENERGY CELL +40")}else e.kind==="card"&&e.card?(t.cards.push(e.card),e.card&&(i.objectives["card_"+e.card]=!0),ie(i,`${e.label} ACQUIRED`)):(e.objective&&(i.objectives[e.objective]=!0),ie(i,`${e.label} SECURED`),Gt(i,"objective",void 0,void 0,e.objective));e.taken=!0,Gt(i,"pickup",e.x+.5,e.y+.5,void 0,e.kind==="energy"?0:1)}for(const e of i.checkpoints)!e.hit&&Ba(i,e.x,e.y,.7)&&(e.hit=!0,i.cpHit++,Gt(i,"checkpoint",e.x,e.y,"checkpoint"),ie(i,"CHECKPOINT SAVED"))}function Eu(i,t){for(const e of i.cameras){if(e.spotCd=Math.max(0,e.spotCd-t),e.loopT>0){if(e.loopT-=t,e.seeing=!1,e.sus=Math.max(0,e.sus-40*t),e.loopWatch>0&&(e.loopWatch-=t,e.loopWatch<=0)){const r=Oc(i,e.x,e.y);for(const a of i.guards)a.zone===e.zone&&a.state==="patrol"&&Yn(i,a,r.x,r.y,40,!0)}continue}e.phase+=e.speed*t,e.trackT>0?(e.trackT-=t,e.dir=rs(e.dir,Math.atan2(i.player.y-e.y,i.player.x-e.x),3*t)):e.dir=e.baseDir+e.sweep*Math.sin(e.phase);const n=Jn[i.difficulty],s=Io(i,e.x,e.y,e.dir,e.fov,e.range*n.range);if(e.seeing=s.seen,s.seen){if(e.sus=Math.min(100,e.sus+xt.FILL_CAMERA*s.prox*n.fill*t),e.sus>=100&&e.spotCd<=0){e.spotCd=5,e.trackT=4,e.sus=60,i.stats.spotted++,Os(i,15),Gt(i,"spot",e.x,e.y),ie(i,"CAMERA SPOTTED YOU");for(const r of i.guards)r.zone===e.zone&&r.state!=="alert"&&Yn(i,r,i.player.x,i.player.y,60,!0)}}else e.sus=Math.max(0,e.sus-25*t)}}function Tu(i){const t=i.stats,e=t.hacks.camera+t.hacks.door+t.hacks.decoy+t.hacks.laser,n=t.detections===0&&t.alarms===0&&t.retries===0&&t.spotted===0;let s=1e3-2*Math.max(0,i.time-i.def.par)-4*i.alertPeak-60*t.spotted-15*t.alarms-120*t.retries+(n?150:0);s=Math.max(0,Math.min(1150,Math.round(s)));const r=s>=950?"S":s>=800?"A":s>=600?"B":"C",a=[];return n&&a.push("GHOST"),e>=4&&a.push("HACKER"),t.hacks.decoy>=1&&t.decoyPulls>=1&&a.push("DECOY ARTIST"),t.hacks.door>=1&&a.push("LOCKPICKER"),t.moveT>1&&t.shadowSneakT/t.moveT>=.3&&a.push("SHADOW WALKER"),t.alarms>0&&a.push("LOUD"),a.length||a.push("IMPROVISER"),{time:i.time,par:i.def.par,score:s,rating:r,peakAlert:Math.round(i.alertPeak),spotted:t.spotted,alarms:t.alarms,retries:t.retries,hacks:e,tags:a}}class Au{constructor(){G(this,"ctx",null);G(this,"master",null);G(this,"sfx",null);G(this,"music",null);G(this,"noiseBuf",null);G(this,"hum",null);G(this,"drone",null);G(this,"volume",.7);G(this,"muted",!1);G(this,"lastStep",0);G(this,"musicOn",!1)}ensure(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{});return}try{const t=window.AudioContext??window.webkitAudioContext;if(!t)return;this.ctx=new t,this.master=this.ctx.createGain(),this.sfx=this.ctx.createGain(),this.music=this.ctx.createGain(),this.sfx.gain.value=.9,this.music.gain.value=.35;const e=this.ctx.createDynamicsCompressor();this.sfx.connect(this.master),this.music.connect(this.master),this.master.connect(e),e.connect(this.ctx.destination);const n=this.ctx.sampleRate;this.noiseBuf=this.ctx.createBuffer(1,n,this.ctx.sampleRate);const s=this.noiseBuf.getChannelData(0);for(let r=0;r<n;r++)s[r]=Math.random()*2-1;this.applyVolume(),this.musicOn&&this.startMusic()}catch{this.ctx=null}}setVolume(t,e){this.volume=t,this.muted=e,this.applyVolume()}applyVolume(){!this.master||!this.ctx||this.master.gain.setTargetAtTime(this.muted?0:this.volume*.5,this.ctx.currentTime,.02)}tone(t,e,n="sine",s=.2,r,a=0){if(!this.ctx||!this.sfx)return;const o=this.ctx.currentTime+a,l=this.ctx.createOscillator(),c=this.ctx.createGain();l.type=n,l.frequency.setValueAtTime(t,o),r&&l.frequency.exponentialRampToValueAtTime(r,o+e),c.gain.setValueAtTime(1e-4,o),c.gain.exponentialRampToValueAtTime(s,o+.01),c.gain.exponentialRampToValueAtTime(1e-4,o+e),l.connect(c),c.connect(this.sfx),l.start(o),l.stop(o+e+.05)}noise(t,e,n,s,r=0){if(!this.ctx||!this.sfx||!this.noiseBuf)return;const a=this.ctx.currentTime+r,o=this.ctx.createBufferSource();o.buffer=this.noiseBuf;const l=this.ctx.createBiquadFilter();l.type="bandpass",l.frequency.setValueAtTime(n,a),l.frequency.exponentialRampToValueAtTime(s,a+t);const c=this.ctx.createGain();c.gain.setValueAtTime(e,a),c.gain.exponentialRampToValueAtTime(1e-4,a+t),o.connect(l),l.connect(c),c.connect(this.sfx),o.start(a,Math.random()*.5,t+.05)}play(t){if(this.ctx)switch(t.k){case"step":{const e=this.ctx.currentTime;if(e-this.lastStep<.08)return;this.lastStep=e,this.noise(.06,t.v?.05:.14,700,220);break}case"suspicious":this.tone(420,.28,"sine",.16,780);break;case"alert":for(let e=0;e<4;e++)this.tone(e%2?660:440,.16,"sawtooth",.14,void 0,e*.17);break;case"search":this.tone(300,.3,"triangle",.1,220);break;case"spot":this.tone(900,.12,"square",.12),this.tone(600,.2,"square",.12,void 0,.13);break;case"laser":this.tone(1200,.35,"sawtooth",.16,300),this.noise(.3,.2,3e3,400);break;case"hack":this.tone(220,.25,"square",.1,880),this.tone(880,.1,"sine",.1,void 0,.25);break;case"cycle":this.tone(660,.05,"square",.07);break;case"deny":this.tone(160,.2,"square",.12,110);break;case"pickup":this.tone(660,.1,"sine",.15),this.tone(990,.16,"sine",.15,void 0,.09);break;case"door":this.noise(.25,.12,300,1200);break;case"locker":this.tone(110,.14,"triangle",.2,70);break;case"decoy":this.tone(500,.2,"sine",.14,1e3);break;case"ping":this.tone(1320,.12,"sine",.1),this.tone(1320,.12,"sine",.06,void 0,.14);break;case"lure":break;case"puzzleStart":this.tone(520,.08,"square",.08),this.tone(780,.08,"square",.08,void 0,.09);break;case"puzzleKey":this.tone(600+(t.v??0)*70,.07,"square",.09);break;case"puzzleBad":this.tone(120,.3,"sawtooth",.14,80);break;case"puzzleOk":[523,659,784,1047].forEach((e,n)=>this.tone(e,.14,"triangle",.14,void 0,n*.08));break;case"puzzleFail":this.tone(110,.45,"sawtooth",.16,55),this.noise(.4,.18,2e3,200);break;case"checkpoint":this.tone(440,.12,"sine",.12),this.tone(660,.18,"sine",.12,void 0,.1);break;case"objective":this.tone(784,.14,"triangle",.14),this.tone(1047,.2,"triangle",.14,void 0,.1);break;case"finale":this.tone(80,1.2,"sawtooth",.2,40),this.noise(1,.25,4e3,100);break;case"countdown":this.tone(1e3,.07,"square",.1);break;case"complete":[392,523,659,784].forEach((e,n)=>this.tone(e,.4,"triangle",.14,void 0,n*.12));break;case"compromised":this.tone(300,.7,"sawtooth",.2,60);break}}uiClick(){this.tone(540,.05,"square",.06)}startMusic(){if(this.musicOn=!0,!this.ctx||!this.music||this.drone)return;const t=this.ctx,e=t.createBiquadFilter();e.type="lowpass",e.frequency.value=400;const n=t.createGain();n.gain.value=.5;const s=t.createOscillator(),r=t.createOscillator();s.type="sawtooth",r.type="triangle",s.frequency.value=55,r.frequency.value=82.4;const a=t.createGain();a.gain.value=.35;const o=t.createGain();o.gain.value=.45,s.connect(a),r.connect(o),a.connect(e),o.connect(e),e.connect(n),n.connect(this.music),s.start(),r.start(),this.drone={a:s,b:r,pulse:n,filter:e}}stopMusic(){if(this.musicOn=!1,this.drone){try{this.drone.a.stop(),this.drone.b.stop()}catch{}this.drone=null}this.setHum(0)}ambience(t,e,n,s){if(this.ctx){if(this.drone){const r=Math.min(1,t/100);this.drone.filter.frequency.setTargetAtTime(280+r*900,this.ctx.currentTime,.2);const a=.6+r*3.2;this.drone.pulse.gain.setTargetAtTime(s?.5:.5+.35*Math.sin(n*a*2),this.ctx.currentTime,.05)}this.setHum(e)}}setHum(t){if(!(!this.ctx||!this.sfx)){if(!this.hum&&t>.01){const e=this.ctx.createOscillator(),n=this.ctx.createGain(),s=this.ctx.createBiquadFilter();s.type="lowpass",s.frequency.value=500,e.type="sawtooth",e.frequency.value=110,n.gain.value=0,e.connect(s),s.connect(n),n.connect(this.sfx),e.start(),this.hum={osc:e,gain:n}}this.hum&&this.hum.gain.gain.setTargetAtTime(t*.09,this.ctx.currentTime,.1)}}}const wu={patrol:"#5ef2ff",suspicious:"#ffb347",alert:"#ff3b4e",search:"#c58bff",camera:"#9fd8ff",cyan:"#5ef2ff",amber:"#ffb347",red:"#ff3b4e",green:"#58ffa0"},Ru={patrol:"#4aa3ff",suspicious:"#ffa000",alert:"#ff7bff",search:"#ffffff",camera:"#8ec5ff",cyan:"#4aa3ff",amber:"#ffa000",red:"#ff7bff",green:"#ffffff"};function jr(i,t){const e=document.createElement("canvas");e.width=e.height=8;const n=e.getContext("2d");return n?(n.strokeStyle="rgba(255,255,255,0.55)",n.fillStyle="rgba(255,255,255,0.55)",n.lineWidth=1.4,(t==="diag"||t==="cross")&&(n.beginPath(),n.moveTo(0,8),n.lineTo(8,0),n.stroke()),t==="cross"&&(n.beginPath(),n.moveTo(0,0),n.lineTo(8,8),n.stroke()),t==="dots"&&(n.beginPath(),n.arc(4,4,1.3,0,Math.PI*2),n.fill()),i.createPattern(e,"repeat")):null}class dl{constructor(t){G(this,"kind","2d");G(this,"canvas");G(this,"ctx");G(this,"cw",0);G(this,"ch",0);G(this,"dpr",1);G(this,"camX",0);G(this,"camY",0);G(this,"camInit",!1);G(this,"pat");G(this,"shake",0);G(this,"time",0);this.canvas=t;const e=t.getContext("2d");if(!e)throw new Error("Canvas 2D is not available");this.ctx=e,this.pat={diag:jr(e,"diag"),cross:jr(e,"cross"),dots:jr(e,"dots")},this.resize()}resize(){this.dpr=Math.min(window.devicePixelRatio||1,2),this.cw=Math.max(1,this.canvas.clientWidth),this.ch=Math.max(1,this.canvas.clientHeight),this.canvas.width=Math.round(this.cw*this.dpr),this.canvas.height=Math.round(this.ch*this.dpr)}resetCamera(){this.camInit=!1}dispose(){this.ctx.setTransform(1,0,0,1,0,0),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}kick(){this.shake=.25}tileSize(){return Math.max(22,Math.min(54,Math.min(this.cw,this.ch)/12.5))}draw(t,e,n){const s=this.ctx;this.time+=n;const r=e.cb?Ru:wu,a=this.tileSize(),o=t.player.x,l=t.player.y;this.camInit||(this.camX=o,this.camY=l,this.camInit=!0);const c=1-Math.pow(.001,n);this.camX+=(o-this.camX)*c,this.camY+=(l-this.camY)*c;const h=t.map.w*a,u=t.map.h*a;let f=this.cw/2-this.camX*a,d=this.ch/2-this.camY*a;h<=this.cw&&(f=(this.cw-h)/2),u<=this.ch&&(d=(this.ch-u)/2);let v=0,g=0;if(this.shake>0&&(this.shake-=n,e.reduce||(v=(Math.random()-.5)*8,g=(Math.random()-.5)*8)),s.setTransform(this.dpr,0,0,this.dpr,0,0),s.fillStyle="#04070d",s.fillRect(0,0,this.cw,this.ch),s.save(),s.translate(f+v,d+g),this.drawTiles(t,a,f,d,r,e),this.drawItems(t,a,r,e),e.cones){for(const m of t.cameras)this.drawCameraCone(t,m,a,r);for(const m of t.guards)this.drawGuardCone(t,m,a,r)}this.drawRings(t,a,r),this.drawDecoy(t,a,r),this.drawCameras(t,a,r,e),this.drawGuards(t,a,r,e),this.drawHackFocus(t,a,r),this.drawPlayer(t,a,r,e),s.restore(),this.drawLight(t,a,f,d,e)}drawTiles(t,e,n,s,r,a){const o=this.ctx,l=Math.max(0,Math.floor(-n/e)-1),c=Math.min(t.map.w-1,Math.ceil((this.cw-n)/e)+1),h=Math.max(0,Math.floor(-s/e)-1),u=Math.min(t.map.h-1,Math.ceil((this.ch-s)/e)+1),f=t.def.objectives.filter(g=>g.id!=="extract"&&!g.optional).every(g=>t.objectives[g.id]);for(let g=h;g<=u;g++)for(let m=l;m<=c;m++){const p=xe(t.map,m,g),x=m*e,M=g*e;if(p===De){o.fillStyle="#18294a",o.fillRect(x,M,e,e),o.strokeStyle="#2b4468",o.lineWidth=1;const L=(A,R)=>xe(t.map,m+A,g+R)!==De;o.beginPath(),L(0,-1)&&(o.moveTo(x,M+.5),o.lineTo(x+e,M+.5)),L(0,1)&&(o.moveTo(x,M+e-.5),o.lineTo(x+e,M+e-.5)),L(-1,0)&&(o.moveTo(x+.5,M),o.lineTo(x+.5,M+e)),L(1,0)&&(o.moveTo(x+e-.5,M),o.lineTo(x+e-.5,M+e)),o.stroke();continue}const S=p!==jn&&!t.blackout;if(o.fillStyle=S?"#0d1a2c":"#060b16",o.fillRect(x,M,e,e),o.strokeStyle=S?"rgba(94,242,255,0.06)":"rgba(94,242,255,0.025)",o.strokeRect(x+.5,M+.5,e-1,e-1),p===jn){o.strokeStyle="rgba(120,150,200,0.12)",o.beginPath();for(let L=-e;L<e;L+=8)o.moveTo(x+L,M+e),o.lineTo(x+L+e,M);o.save(),o.beginPath(),o.rect(x,M,e,e),o.clip(),o.stroke(),o.restore()}p===_i?this.drawLocker(t,m,g,e,r):p===kr?this.drawTerminal(t,m,g,e,r,a):p===mn?this.drawDoor(t,m,g,e,r):p===mi&&this.drawLaserTile(t,m,g,e,r,a)}const d=t.map.exit.x*e,v=t.map.exit.y*e;o.fillStyle=f?"rgba(88,255,160,0.22)":"rgba(150,170,200,0.10)",o.fillRect(d+2,v+2,e-4,e-4),o.strokeStyle=f?r.green:"#5b6f8c",o.lineWidth=2,o.strokeRect(d+3,v+3,e-6,e-6),o.beginPath(),o.moveTo(d+e*.3,v+e*.45),o.lineTo(d+e*.5,v+e*.25),o.lineTo(d+e*.7,v+e*.45),o.moveTo(d+e*.3,v+e*.72),o.lineTo(d+e*.5,v+e*.52),o.lineTo(d+e*.7,v+e*.72),o.stroke();for(const g of t.checkpoints){const m=g.x*e,p=g.y*e,x=e*.22;o.beginPath(),o.moveTo(m,p-x),o.lineTo(m+x,p),o.lineTo(m,p+x),o.lineTo(m-x,p),o.closePath(),o.strokeStyle=g.hit?r.green:"#7f93b3",o.fillStyle=g.hit?"rgba(88,255,160,0.35)":"rgba(127,147,179,0.08)",o.lineWidth=1.5,o.fill(),o.stroke()}}drawLocker(t,e,n,s,r){const a=this.ctx,o=e*s,l=n*s,c=t.player.hidden&&Math.floor(t.player.x)===e&&Math.floor(t.player.y)===n;a.fillStyle="#1a2b44",a.fillRect(o+3,l+2,s-6,s-4),a.strokeStyle=c?r.cyan:"#4a6a96",a.lineWidth=c?2.5:1.5,a.strokeRect(o+3.5,l+2.5,s-7,s-5),a.strokeStyle="#33506f",a.lineWidth=1;for(let h=0;h<3;h++)a.beginPath(),a.moveTo(o+s*.3,l+s*(.25+h*.1)),a.lineTo(o+s*.7,l+s*(.25+h*.1)),a.stroke();a.fillStyle=c?r.cyan:"#6f8fb8",a.fillRect(o+s*.62,l+s*.58,3,6)}drawTerminal(t,e,n,s,r,a){const o=this.ctx,l=e*s,c=n*s,h=t.terminals[t.map.ref[n*t.map.w+e]],u=h?.done,f=(h?.lockT??0)>0;o.fillStyle="#10223a",o.fillRect(l+3,c+3,s-6,s-6),o.strokeStyle=u?r.green:f?r.red:r.cyan,o.lineWidth=2,o.strokeRect(l+3.5,c+3.5,s-7,s-7),o.fillStyle=u?"rgba(88,255,160,0.5)":f?"rgba(255,59,78,0.5)":`rgba(94,242,255,${a.reduce?.45:.3+.2*Math.sin(this.time*3)})`,o.fillRect(l+7,c+7,s-14,s*.38),o.fillStyle="#d9f6ff",o.font=`700 ${Math.round(s*.3)}px ui-monospace, Consolas, monospace`,o.textAlign="center",o.textBaseline="middle",o.fillText(u?"OK":f?"X":h?.id??"",l+s/2,c+s*.72)}drawDoor(t,e,n,s,r){const a=this.ctx,o=e*s,l=n*s,c=t.doors[t.map.ref[n*t.map.w+e]];if(!c)return;const h=xe(t.map,e-1,n)===De&&xe(t.map,e+1,n)===De,u=c.locked?r.red:r.amber;if(a.strokeStyle=u,a.fillStyle=c.locked?"rgba(255,59,78,0.28)":"rgba(255,179,71,0.22)",a.lineWidth=2,c.open){h?(a.fillRect(o,l+s*.4,s*.18,s*.2),a.fillRect(o+s*.82,l+s*.4,s*.18,s*.2)):(a.fillRect(o+s*.4,l,s*.2,s*.18),a.fillRect(o+s*.4,l+s*.82,s*.2,s*.18));return}a.fillRect(o+1,l+1,s-2,s-2),a.strokeRect(o+2,l+2,s-4,s-4),a.beginPath(),h?(a.moveTo(o+s/2,l+2),a.lineTo(o+s/2,l+s-2)):(a.moveTo(o+2,l+s/2),a.lineTo(o+s-2,l+s/2)),a.stroke(),c.locked&&(a.fillStyle=u,a.fillRect(o+s*.38,l+s*.42,s*.24,s*.2),a.beginPath(),a.arc(o+s/2,l+s*.42,s*.1,Math.PI,0),a.stroke(),c.card&&(a.fillStyle=c.card==="red"?"#ff5a68":c.card==="blue"?"#5aa8ff":"#ffe14d",a.fillRect(o+s*.7,l+s*.7,s*.2,s*.14)))}drawLaserTile(t,e,n,s,r,a){const o=this.ctx,l=e*s,c=n*s,h=t.lasers[t.map.ref[n*t.map.w+e]];if(!h)return;const u=(p,x)=>xe(t.map,e+p,n+x)===mi,f=u(-1,0)||u(1,0)||!(u(0,-1)||u(0,1)),d=l+s/2,v=c+s/2,g=a.reduce?1:.85+.15*Math.sin(this.time*38+e*3+n);o.save(),h.active?(o.strokeStyle=r.cyan,o.shadowColor=r.cyan,o.shadowBlur=10,o.lineWidth=3,o.globalAlpha=g):(o.strokeStyle="rgba(94,242,255,0.35)",o.lineWidth=1.5,o.setLineDash([3,6])),o.beginPath(),f?(o.moveTo(l,v),o.lineTo(l+s,v)):(o.moveTo(d,c),o.lineTo(d,c+s)),o.stroke(),o.restore(),(f?!u(-1,0)||!u(1,0):!u(0,-1)||!u(0,1))&&(o.fillStyle=h.active?r.cyan:"#46607e",o.fillRect(f?u(-1,0)?l+s-4:l:d-3,f?v-3:u(0,-1)?c+s-4:c,f?4:6,f?6:4)),h.period&&h.active&&(o.fillStyle="rgba(94,242,255,0.5)",o.fillRect(d-2,v-2,4,4))}drawItems(t,e,n,s){const r=this.ctx;for(const a of t.items){if(a.taken)continue;const o=(a.x+.5)*e,l=(a.y+.5)*e,c=s.reduce?0:Math.sin(this.time*3+a.x)*2;if(r.save(),r.translate(o,l+c),a.kind==="energy")r.fillStyle="rgba(88,255,160,0.25)",r.strokeStyle=n.green,r.lineWidth=2,r.beginPath(),r.moveTo(0,-e*.26),r.lineTo(e*.2,0),r.lineTo(0,e*.26),r.lineTo(-e*.2,0),r.closePath(),r.fill(),r.stroke(),r.beginPath(),r.moveTo(-e*.05,-e*.1),r.lineTo(e*.05,-.02*e),r.lineTo(-e*.05,.04*e),r.lineTo(e*.05,e*.12),r.stroke();else if(a.kind==="card")r.fillStyle=a.card==="red"?"#ff5a68":a.card==="blue"?"#5aa8ff":"#ffe14d",r.fillRect(-e*.24,-e*.16,e*.48,e*.32),r.fillStyle="rgba(0,0,0,0.5)",r.fillRect(-e*.18,-e*.04,e*.2,e*.05),r.strokeStyle="#fff",r.lineWidth=1.5,r.strokeRect(-e*.24,-e*.16,e*.48,e*.32);else{r.strokeStyle="#ff9bf2",r.fillStyle="rgba(255,155,242,0.25)",r.lineWidth=2,r.beginPath();for(let h=0;h<6;h++){const u=Math.PI/3*h;r.lineTo(Math.cos(u)*e*.27,Math.sin(u)*e*.27)}r.closePath(),r.fill(),r.stroke(),r.beginPath(),r.arc(0,0,e*.08,0,Math.PI*2),r.fillStyle="#ff9bf2",r.fill()}r.restore()}}conePoly(t,e,n,s,r,a){const o=[{x:e,y:n}],l=36;for(let c=0;c<=l;c++){const h=s-r/2+r*c/l,u=Math.cos(h),f=Math.sin(h);let d=0;for(;d<a&&!Br(t,Math.floor(e+u*d),Math.floor(n+f*d));d+=.12);o.push({x:e+u*Math.min(d,a),y:n+f*Math.min(d,a)})}return o}paintCone(t,e,n,s,r,a,o,l,c,h){const u=this.ctx;u.beginPath(),t.forEach((d,v)=>{v===0?u.moveTo(d.x*e,d.y*e):u.lineTo(d.x*e,d.y*e)}),u.closePath();const f=u.createRadialGradient(n*e,s*e,0,n*e,s*e,r*e);f.addColorStop(0,dn(a,h)),f.addColorStop(1,dn(a,h*.12)),u.fillStyle=f,u.fill(),o&&(u.save(),u.clip(),u.globalAlpha=.16,u.fillStyle=o,u.fillRect((n-r)*e,(s-r)*e,r*2*e,r*2*e),u.restore()),u.strokeStyle=dn(a,.9),u.lineWidth=c,u.setLineDash(l?[6,5]:[]),u.stroke(),u.setLineDash([])}drawGuardCone(t,e,n,s){const r=e.range*Jn[t.difficulty].range,a=this.conePoly(t,e.x,e.y,e.dir,e.fov,r),o=e.state==="patrol"?s.patrol:e.state==="suspicious"?s.suspicious:e.state==="alert"?s.alert:s.search,l=e.state==="patrol"?null:e.state==="suspicious"?this.pat.diag:e.state==="alert"?this.pat.cross:this.pat.dots;this.paintCone(a,n,e.x,e.y,r,o,l,e.state==="suspicious",e.state==="alert"?3:1.5,e.state==="alert"?.34:.24);const c=this.ctx;c.strokeStyle=dn(o,.35),c.lineWidth=1,c.setLineDash([2,4]),c.beginPath(),c.arc(e.x*n,e.y*n,r*xt.SHADOW_RANGE*n,e.dir-e.fov/2,e.dir+e.fov/2),c.stroke(),c.setLineDash([])}drawCameraCone(t,e,n,s){if(e.loopT>0)return;const r=e.range*Jn[t.difficulty].range,a=this.conePoly(t,e.x,e.y,e.dir,e.fov,r),o=e.trackT>0||e.sus>50?s.alert:s.camera;this.paintCone(a,n,e.x,e.y,r,o,this.pat.dots,!0,1.5,.18)}drawRings(t,e,n){const s=this.ctx;for(const r of t.rings){const a=r.age/r.ttl,o=r.r*e*(r.kind==="step"||r.kind==="sneak"?.4+.6*a:.3+.7*a);s.strokeStyle=r.kind==="alarm"?dn(n.red,.7*(1-a)):r.kind==="hack"?dn(n.cyan,.8*(1-a)):r.kind==="decoy"?dn(n.amber,.6*(1-a)):`rgba(200,220,255,${.22*(1-a)})`,s.lineWidth=r.kind==="step"||r.kind==="sneak"?1:2,s.beginPath(),s.arc(r.x*e,r.y*e,o,0,Math.PI*2),s.stroke()}}drawDecoy(t,e,n){if(!t.decoy)return;const s=this.ctx,r=t.decoy,a=r.x*e,o=r.y*e;s.fillStyle=dn(n.amber,.25),s.strokeStyle=n.amber,s.lineWidth=2,s.beginPath(),s.arc(a,o,e*.2,0,Math.PI*2),s.fill(),s.stroke(),s.beginPath(),s.arc(a,o,e*.34,-.7,.7),s.stroke(),s.beginPath(),s.arc(a,o,e*.34,Math.PI-.7,Math.PI+.7),s.stroke(),s.strokeStyle=dn(n.amber,.7),s.beginPath(),s.arc(a,o,e*.5,-Math.PI/2,-Math.PI/2+Math.PI*2*r.t/xt.DECOY_T),s.stroke()}drawCameras(t,e,n,s){const r=this.ctx;for(const a of t.cameras){const o=a.x*e,l=a.y*e;r.save(),r.translate(o,l),r.rotate(a.dir);const c=a.loopT>0;r.fillStyle="#1b2c47",r.strokeStyle=c?"#7f8aa0":a.trackT>0?n.red:n.camera,r.lineWidth=2,r.beginPath(),r.moveTo(-e*.22,-e*.2),r.lineTo(e*.26,-e*.12),r.lineTo(e*.26,e*.12),r.lineTo(-e*.22,e*.2),r.closePath(),r.fill(),r.stroke();const h=s.reduce||Math.floor(this.time*3)%2===0;r.fillStyle=c?"#7f8aa0":h?n.red:"#552029",r.beginPath(),r.arc(e*.18,0,e*.06,0,Math.PI*2),r.fill(),r.restore(),c&&a.loopT<9e3?(r.fillStyle="#c3cce0",r.font=`700 ${Math.round(e*.28)}px ui-monospace, Consolas, monospace`,r.textAlign="center",r.fillText(`LOOP ${a.loopT.toFixed(1)}`,o,l-e*.4)):c?(r.fillStyle="#7f8aa0",r.font=`700 ${Math.round(e*.26)}px ui-monospace, Consolas, monospace`,r.textAlign="center",r.fillText("OFFLINE",o,l-e*.4)):a.sus>1&&this.susBar(o,l-e*.42,e,a.sus,n)}}susBar(t,e,n,s,r){const a=this.ctx,o=n*.9,l=Math.max(4,n*.1);a.fillStyle="rgba(0,0,0,0.65)",a.fillRect(t-o/2-1,e-1,o+2,l+2),a.fillStyle=s>=100?r.alert:s>=xt.SUS_THRESHOLD?r.suspicious:r.patrol,a.fillRect(t-o/2,e,o*Math.min(100,s)/100,l),a.fillStyle="#fff",a.fillRect(t-o/2+o*xt.SUS_THRESHOLD/100-.5,e-2,1.5,l+4)}drawGuards(t,e,n,s){const r=this.ctx;for(const a of t.guards){const o=a.x*e,l=a.y*e,c=a.state==="patrol"?n.patrol:a.state==="suspicious"?n.suspicious:a.state==="alert"?n.alert:n.search;r.save(),r.translate(o,l),r.rotate(a.dir),r.fillStyle="#1b2a45",r.strokeStyle=c,r.lineWidth=2.5;const h=e*.3;Cu(r,-h,-h,h*2,h*2,h*.45),r.fill(),r.stroke(),r.fillStyle=c,r.fillRect(h*.25,-h*.55,h*.5,h*1.1),r.restore();const u=l-e*.62;if(r.lineWidth=2,r.strokeStyle=c,r.fillStyle=c,a.state==="suspicious")r.beginPath(),r.moveTo(o,u-e*.16),r.lineTo(o+e*.16,u+e*.12),r.lineTo(o-e*.16,u+e*.12),r.closePath(),r.stroke(),r.font=`800 ${Math.round(e*.26)}px ui-monospace, Consolas, monospace`,r.textAlign="center",r.textBaseline="middle",r.fillText("?",o,u+e*.03);else if(a.state==="alert"){const f=s.reduce?1:1+.12*Math.sin(this.time*12);r.beginPath(),r.moveTo(o,u-e*.2*f),r.lineTo(o+e*.18*f,u),r.lineTo(o,u+e*.2*f),r.lineTo(o-e*.18*f,u),r.closePath(),r.fill(),r.fillStyle="#10080a",r.font=`800 ${Math.round(e*.26)}px ui-monospace, Consolas, monospace`,r.textAlign="center",r.textBaseline="middle",r.fillText("!",o,u+e*.02)}else if(a.state==="search"){r.beginPath(),r.arc(o,u,e*.15,0,Math.PI*2),r.stroke();for(let f=-1;f<=1;f++)r.beginPath(),r.arc(o+f*e*.07,u,1.4,0,Math.PI*2),r.fill()}a.sus>1&&a.state!=="alert"&&this.susBar(o,l-e*.44,e,a.sus,n)}}drawHackFocus(t,e,n){const s=t.player.focus;if(!s)return;const r=as(t).find(o=>o.kind===s.kind&&o.i===s.i);if(!r)return;const a=this.ctx;a.strokeStyle=n.cyan,a.lineWidth=2,a.setLineDash([5,4]),a.lineDashOffset=-this.time*12,a.beginPath(),a.arc(r.x*e,r.y*e,e*.55,0,Math.PI*2),a.stroke(),a.setLineDash([]),a.lineDashOffset=0,a.strokeStyle=dn(n.cyan,.35),a.lineWidth=1,a.beginPath(),a.moveTo(t.player.x*e,t.player.y*e),a.lineTo(r.x*e,r.y*e),a.stroke()}drawPlayer(t,e,n,s){const r=t.player;if(r.hidden)return;const a=this.ctx,o=r.x*e,l=r.y*e,c=zr(t,r.x,r.y);a.save(),a.translate(o,l),c&&(a.fillStyle="rgba(255,255,255,0.06)",a.beginPath(),a.arc(0,0,e*.5,0,Math.PI*2),a.fill()),a.rotate(r.dir);const h=e*(r.sneak?.22:.27);a.fillStyle="#0b1a2a",a.strokeStyle=n.cyan,a.lineWidth=2.5,r.sneak&&a.setLineDash([4,3]),a.beginPath();for(let u=0;u<6;u++){const f=Math.PI/3*u;a.lineTo(Math.cos(f)*h,Math.sin(f)*h)}a.closePath(),a.fill(),a.stroke(),a.setLineDash([]),a.fillStyle=n.cyan,a.beginPath(),a.moveTo(h*1.35,0),a.lineTo(h*.55,-h*.35),a.lineTo(h*.55,h*.35),a.closePath(),a.fill(),a.restore()}drawLight(t,e,n,s,r){const a=this.ctx;a.setTransform(this.dpr,0,0,this.dpr,0,0);const o=n+t.player.x*e,l=s+t.player.y*e,c=Math.max(this.cw,this.ch);if(t.blackout){const h=a.createRadialGradient(o,l,e*.8,o,l,e*5.5);h.addColorStop(0,"rgba(2,4,9,0)"),h.addColorStop(1,"rgba(2,4,9,0.9)"),a.fillStyle=h,a.fillRect(0,0,this.cw,this.ch)}else{const h=a.createRadialGradient(this.cw/2,this.ch/2,c*.25,this.cw/2,this.ch/2,c*.75);h.addColorStop(0,"rgba(2,4,9,0)"),h.addColorStop(1,"rgba(2,4,9,0.65)"),a.fillStyle=h,a.fillRect(0,0,this.cw,this.ch)}}}function dn(i,t){const e=i.replace("#",""),n=parseInt(e.slice(0,2),16),s=parseInt(e.slice(2,4),16),r=parseInt(e.slice(4,6),16);return`rgba(${n},${s},${r},${t})`}function Cu(i,t,e,n,s,r){i.beginPath(),i.moveTo(t+r,e),i.arcTo(t+n,e,t+n,e+s,r),i.arcTo(t+n,e+s,t,e+s,r),i.arcTo(t,e+s,t,e,r),i.arcTo(t,e,t+n,e,r),i.closePath()}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Uo="170",Pu=0,pl=1,Lu=2,No=1,zc=2,Pn=3,Zn=0,Oe=1,Ve=2,In=0,di=1,_n=2,ml=3,gl=4,Du=5,ci=100,Iu=101,Uu=102,Nu=103,Fu=104,Ou=200,ku=201,Bu=202,zu=203,za=204,Ha=205,Hu=206,Gu=207,Vu=208,Wu=209,Xu=210,qu=211,Yu=212,$u=213,Ku=214,Ga=0,Va=1,Wa=2,Zi=3,Xa=4,qa=5,Ya=6,$a=7,Hc=0,ju=1,Ju=2,$n=0,Gc=1,Vc=2,Wc=3,Fo=4,Zu=5,Xc=6,qc=7,Yc=300,Qi=301,ts=302,Ka=303,ja=304,Hr=306,Pr=1e3,Xn=1001,Ja=1002,ke=1003,Qu=1004,Hs=1005,en=1006,Jr=1007,ui=1008,hn=1009,$c=1010,Kc=1011,Us=1012,Oo=1013,gi=1014,xn=1015,yn=1016,ko=1017,Bo=1018,es=1020,jc=35902,Jc=1021,Zc=1022,$e=1023,Qc=1024,th=1025,ji=1026,ns=1027,zo=1028,Ho=1029,eh=1030,Go=1031,Vo=1033,Er=33776,Tr=33777,Ar=33778,wr=33779,Za=35840,Qa=35841,to=35842,eo=35843,no=36196,io=37492,so=37496,ro=37808,ao=37809,oo=37810,lo=37811,co=37812,ho=37813,uo=37814,fo=37815,po=37816,mo=37817,go=37818,vo=37819,_o=37820,xo=37821,Rr=36492,yo=36494,Mo=36495,nh=36283,So=36284,bo=36285,Eo=36286,tf=3200,ef=3201,ih=0,nf=1,Ln="",Ae="srgb",os="srgb-linear",Gr="linear",ee="srgb",Ei=7680,vl=519,sf=512,rf=513,af=514,sh=515,of=516,lf=517,cf=518,hf=519,To=35044,_l=35048,xl="300 es",Dn=2e3,Lr=2001;class ls{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Pe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Zr=Math.PI/180,Dr=180/Math.PI;function Kn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pe[i&255]+Pe[i>>8&255]+Pe[i>>16&255]+Pe[i>>24&255]+"-"+Pe[t&255]+Pe[t>>8&255]+"-"+Pe[t>>16&15|64]+Pe[t>>24&255]+"-"+Pe[e&63|128]+Pe[e>>8&255]+"-"+Pe[e>>16&255]+Pe[e>>24&255]+Pe[n&255]+Pe[n>>8&255]+Pe[n>>16&255]+Pe[n>>24&255]).toLowerCase()}function we(i,t,e){return Math.max(t,Math.min(e,i))}function uf(i,t){return(i%t+t)%t}function Qr(i,t,e){return(1-e)*i+e*t}function gn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ne(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class rt{constructor(t=0,e=0){rt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(we(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ot{constructor(t,e,n,s,r,a,o,l,c){Ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],v=n[8],g=s[0],m=s[3],p=s[6],x=s[1],M=s[4],S=s[7],L=s[2],A=s[5],R=s[8];return r[0]=a*g+o*x+l*L,r[3]=a*m+o*M+l*A,r[6]=a*p+o*S+l*R,r[1]=c*g+h*x+u*L,r[4]=c*m+h*M+u*A,r[7]=c*p+h*S+u*R,r[2]=f*g+d*x+v*L,r[5]=f*m+d*M+v*A,r[8]=f*p+d*S+v*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,d=c*r-a*l,v=e*u+n*f+s*d;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/v;return t[0]=u*g,t[1]=(s*c-h*n)*g,t[2]=(o*n-s*a)*g,t[3]=f*g,t[4]=(h*e-s*l)*g,t[5]=(s*r-o*e)*g,t[6]=d*g,t[7]=(n*l-c*e)*g,t[8]=(a*e-n*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ta.makeScale(t,e)),this}rotate(t){return this.premultiply(ta.makeRotation(-t)),this}translate(t,e){return this.premultiply(ta.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ta=new Ot;function rh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ir(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ff(){const i=Ir("canvas");return i.style.display="block",i}const yl={};function As(i){i in yl||(yl[i]=!0,console.warn(i))}function df(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function pf(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function mf(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const qt={enabled:!0,workingColorSpace:os,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ee&&(i.r=Un(i.r),i.g=Un(i.g),i.b=Un(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ee&&(i.r=Ji(i.r),i.g=Ji(i.g),i.b=Ji(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ln?Gr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Un(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ji(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Ml=[.64,.33,.3,.6,.15,.06],Sl=[.2126,.7152,.0722],bl=[.3127,.329],El=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Tl=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qt.define({[os]:{primaries:Ml,whitePoint:bl,transfer:Gr,toXYZ:El,fromXYZ:Tl,luminanceCoefficients:Sl,workingColorSpaceConfig:{unpackColorSpace:Ae},outputColorSpaceConfig:{drawingBufferColorSpace:Ae}},[Ae]:{primaries:Ml,whitePoint:bl,transfer:ee,toXYZ:El,fromXYZ:Tl,luminanceCoefficients:Sl,outputColorSpaceConfig:{drawingBufferColorSpace:Ae}}});let Ti;class gf{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ti===void 0&&(Ti=Ir("canvas")),Ti.width=t.width,Ti.height=t.height;const n=Ti.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ti}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ir("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Un(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Un(e[n]/255)*255):e[n]=Un(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let vf=0;class ah{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vf++}),this.uuid=Kn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ea(s[a].image)):r.push(ea(s[a]))}else r=ea(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function ea(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?gf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let _f=0;class Ue extends ls{constructor(t=Ue.DEFAULT_IMAGE,e=Ue.DEFAULT_MAPPING,n=Xn,s=Xn,r=en,a=ui,o=$e,l=hn,c=Ue.DEFAULT_ANISOTROPY,h=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=Kn(),this.name="",this.source=new ah(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Yc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Pr:t.x=t.x-Math.floor(t.x);break;case Xn:t.x=t.x<0?0:1;break;case Ja:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Pr:t.y=t.y-Math.floor(t.y);break;case Xn:t.y=t.y<0?0:1;break;case Ja:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ue.DEFAULT_IMAGE=null;Ue.DEFAULT_MAPPING=Yc;Ue.DEFAULT_ANISOTROPY=1;class se{constructor(t=0,e=0,n=0,s=1){se.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],v=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-g)<.01&&Math.abs(v-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+g)<.1&&Math.abs(v+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,S=(d+1)/2,L=(p+1)/2,A=(h+f)/4,R=(u+g)/4,C=(v+m)/4;return M>S&&M>L?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=A/n,r=R/n):S>L?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=A/s,r=C/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=R/r,s=C/r),this.set(n,s,r,e),this}let x=Math.sqrt((m-v)*(m-v)+(u-g)*(u-g)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(m-v)/x,this.y=(u-g)/x,this.z=(f-h)/x,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xf extends ls{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new se(0,0,t,e),this.scissorTest=!1,this.viewport=new se(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ue(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new ah(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class nn extends xf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class oh extends Ue{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class yf extends Ue{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const f=r[a+0],d=r[a+1],v=r[a+2],g=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=d,t[e+2]=v,t[e+3]=g;return}if(u!==g||l!==f||c!==d||h!==v){let m=1-o;const p=l*f+c*d+h*v+u*g,x=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const L=Math.sqrt(M),A=Math.atan2(L,p*x);m=Math.sin(m*A)/L,o=Math.sin(o*A)/L}const S=o*x;if(l=l*m+f*S,c=c*m+d*S,h=h*m+v*S,u=u*m+g*S,m===1-o){const L=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=L,c*=L,h*=L,u*=L}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],f=r[a+1],d=r[a+2],v=r[a+3];return t[e]=o*v+h*u+l*d-c*f,t[e+1]=l*v+h*f+c*u-o*d,t[e+2]=c*v+h*d+o*f-l*u,t[e+3]=h*v-o*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),f=l(n/2),d=l(s/2),v=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*d*v,this._y=c*d*u-f*h*v,this._z=c*h*v+f*d*u,this._w=c*h*u-f*d*v;break;case"YXZ":this._x=f*h*u+c*d*v,this._y=c*d*u-f*h*v,this._z=c*h*v-f*d*u,this._w=c*h*u+f*d*v;break;case"ZXY":this._x=f*h*u-c*d*v,this._y=c*d*u+f*h*v,this._z=c*h*v+f*d*u,this._w=c*h*u-f*d*v;break;case"ZYX":this._x=f*h*u-c*d*v,this._y=c*d*u+f*h*v,this._z=c*h*v-f*d*u,this._w=c*h*u+f*d*v;break;case"YZX":this._x=f*h*u+c*d*v,this._y=c*d*u+f*h*v,this._z=c*h*v-f*d*u,this._w=c*h*u-f*d*v;break;case"XZY":this._x=f*h*u-c*d*v,this._y=c*d*u-f*h*v,this._z=c*h*v+f*d*u,this._w=c*h*u+f*d*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+o+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(n>o&&n>u){const d=2*Math.sqrt(1+n-o-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>u){const d=2*Math.sqrt(1+o-n-u);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(we(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Al.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Al.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return na.copy(this).projectOnVector(t),this.sub(na)}reflect(t){return this.sub(na.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(we(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const na=new P,Al=new vn;class xi{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(an.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(an.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=an.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,an):an.fromBufferAttribute(r,a),an.applyMatrix4(t.matrixWorld),this.expandByPoint(an);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Gs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Gs.copy(n.boundingBox)),Gs.applyMatrix4(t.matrixWorld),this.union(Gs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,an),an.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ds),Vs.subVectors(this.max,ds),Ai.subVectors(t.a,ds),wi.subVectors(t.b,ds),Ri.subVectors(t.c,ds),Bn.subVectors(wi,Ai),zn.subVectors(Ri,wi),ti.subVectors(Ai,Ri);let e=[0,-Bn.z,Bn.y,0,-zn.z,zn.y,0,-ti.z,ti.y,Bn.z,0,-Bn.x,zn.z,0,-zn.x,ti.z,0,-ti.x,-Bn.y,Bn.x,0,-zn.y,zn.x,0,-ti.y,ti.x,0];return!ia(e,Ai,wi,Ri,Vs)||(e=[1,0,0,0,1,0,0,0,1],!ia(e,Ai,wi,Ri,Vs))?!1:(Ws.crossVectors(Bn,zn),e=[Ws.x,Ws.y,Ws.z],ia(e,Ai,wi,Ri,Vs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,an).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(an).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Tn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Tn=[new P,new P,new P,new P,new P,new P,new P,new P],an=new P,Gs=new xi,Ai=new P,wi=new P,Ri=new P,Bn=new P,zn=new P,ti=new P,ds=new P,Vs=new P,Ws=new P,ei=new P;function ia(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ei.fromArray(i,r);const o=s.x*Math.abs(ei.x)+s.y*Math.abs(ei.y)+s.z*Math.abs(ei.z),l=t.dot(ei),c=e.dot(ei),h=n.dot(ei);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Mf=new xi,ps=new P,sa=new P;class yi{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Mf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ps.subVectors(t,this.center);const e=ps.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ps,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(sa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ps.copy(t.center).add(sa)),this.expandByPoint(ps.copy(t.center).sub(sa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const An=new P,ra=new P,Xs=new P,Hn=new P,aa=new P,qs=new P,oa=new P;class lh{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,An)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=An.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(An.copy(this.origin).addScaledVector(this.direction,e),An.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ra.copy(t).add(e).multiplyScalar(.5),Xs.copy(e).sub(t).normalize(),Hn.copy(this.origin).sub(ra);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Xs),o=Hn.dot(this.direction),l=-Hn.dot(Xs),c=Hn.lengthSq(),h=Math.abs(1-a*a);let u,f,d,v;if(h>0)if(u=a*l-o,f=a*o-l,v=r*h,u>=0)if(f>=-v)if(f<=v){const g=1/h;u*=g,f*=g,d=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;else f<=-v?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=v?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ra).addScaledVector(Xs,f),d}intersectSphere(t,e){An.subVectors(t.center,this.origin);const n=An.dot(this.direction),s=An.dot(An)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,An)!==null}intersectTriangle(t,e,n,s,r){aa.subVectors(e,t),qs.subVectors(n,t),oa.crossVectors(aa,qs);let a=this.direction.dot(oa),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Hn.subVectors(this.origin,t);const l=o*this.direction.dot(qs.crossVectors(Hn,qs));if(l<0)return null;const c=o*this.direction.dot(aa.cross(Hn));if(c<0||l+c>a)return null;const h=-o*Hn.dot(oa);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ht{constructor(t,e,n,s,r,a,o,l,c,h,u,f,d,v,g,m){Ht.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,u,f,d,v,g,m)}set(t,e,n,s,r,a,o,l,c,h,u,f,d,v,g,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=v,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ht().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ci.setFromMatrixColumn(t,0).length(),r=1/Ci.setFromMatrixColumn(t,1).length(),a=1/Ci.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,d=a*u,v=o*h,g=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+v*c,e[5]=f-g*c,e[9]=-o*l,e[2]=g-f*c,e[6]=v+d*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,v=c*h,g=c*u;e[0]=f+g*o,e[4]=v*o-d,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-v,e[6]=g+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,v=c*h,g=c*u;e[0]=f-g*o,e[4]=-a*u,e[8]=v+d*o,e[1]=d+v*o,e[5]=a*h,e[9]=g-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,d=a*u,v=o*h,g=o*u;e[0]=l*h,e[4]=v*c-d,e[8]=f*c+g,e[1]=l*u,e[5]=g*c+f,e[9]=d*c-v,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,d=a*c,v=o*l,g=o*c;e[0]=l*h,e[4]=g-f*u,e[8]=v*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=d*u+v,e[10]=f-g*u}else if(t.order==="XZY"){const f=a*l,d=a*c,v=o*l,g=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+g,e[5]=a*h,e[9]=d*u-v,e[2]=v*u-d,e[6]=o*h,e[10]=g*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Sf,t,bf)}lookAt(t,e,n){const s=this.elements;return Xe.subVectors(t,e),Xe.lengthSq()===0&&(Xe.z=1),Xe.normalize(),Gn.crossVectors(n,Xe),Gn.lengthSq()===0&&(Math.abs(n.z)===1?Xe.x+=1e-4:Xe.z+=1e-4,Xe.normalize(),Gn.crossVectors(n,Xe)),Gn.normalize(),Ys.crossVectors(Xe,Gn),s[0]=Gn.x,s[4]=Ys.x,s[8]=Xe.x,s[1]=Gn.y,s[5]=Ys.y,s[9]=Xe.y,s[2]=Gn.z,s[6]=Ys.z,s[10]=Xe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],v=n[2],g=n[6],m=n[10],p=n[14],x=n[3],M=n[7],S=n[11],L=n[15],A=s[0],R=s[4],C=s[8],y=s[12],_=s[1],w=s[5],O=s[9],D=s[13],k=s[2],X=s[6],V=s[10],Y=s[14],W=s[3],Q=s[7],nt=s[11],mt=s[15];return r[0]=a*A+o*_+l*k+c*W,r[4]=a*R+o*w+l*X+c*Q,r[8]=a*C+o*O+l*V+c*nt,r[12]=a*y+o*D+l*Y+c*mt,r[1]=h*A+u*_+f*k+d*W,r[5]=h*R+u*w+f*X+d*Q,r[9]=h*C+u*O+f*V+d*nt,r[13]=h*y+u*D+f*Y+d*mt,r[2]=v*A+g*_+m*k+p*W,r[6]=v*R+g*w+m*X+p*Q,r[10]=v*C+g*O+m*V+p*nt,r[14]=v*y+g*D+m*Y+p*mt,r[3]=x*A+M*_+S*k+L*W,r[7]=x*R+M*w+S*X+L*Q,r[11]=x*C+M*O+S*V+L*nt,r[15]=x*y+M*D+S*Y+L*mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],v=t[3],g=t[7],m=t[11],p=t[15];return v*(+r*l*u-s*c*u-r*o*f+n*c*f+s*o*d-n*l*d)+g*(+e*l*d-e*c*f+r*a*f-s*a*d+s*c*h-r*l*h)+m*(+e*c*u-e*o*d-r*a*u+n*a*d+r*o*h-n*c*h)+p*(-s*o*h-e*l*u+e*o*f+s*a*u-n*a*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],v=t[12],g=t[13],m=t[14],p=t[15],x=u*m*c-g*f*c+g*l*d-o*m*d-u*l*p+o*f*p,M=v*f*c-h*m*c-v*l*d+a*m*d+h*l*p-a*f*p,S=h*g*c-v*u*c+v*o*d-a*g*d-h*o*p+a*u*p,L=v*u*l-h*g*l-v*o*f+a*g*f+h*o*m-a*u*m,A=e*x+n*M+s*S+r*L;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return t[0]=x*R,t[1]=(g*f*r-u*m*r-g*s*d+n*m*d+u*s*p-n*f*p)*R,t[2]=(o*m*r-g*l*r+g*s*c-n*m*c-o*s*p+n*l*p)*R,t[3]=(u*l*r-o*f*r-u*s*c+n*f*c+o*s*d-n*l*d)*R,t[4]=M*R,t[5]=(h*m*r-v*f*r+v*s*d-e*m*d-h*s*p+e*f*p)*R,t[6]=(v*l*r-a*m*r-v*s*c+e*m*c+a*s*p-e*l*p)*R,t[7]=(a*f*r-h*l*r+h*s*c-e*f*c-a*s*d+e*l*d)*R,t[8]=S*R,t[9]=(v*u*r-h*g*r-v*n*d+e*g*d+h*n*p-e*u*p)*R,t[10]=(a*g*r-v*o*r+v*n*c-e*g*c-a*n*p+e*o*p)*R,t[11]=(h*o*r-a*u*r-h*n*c+e*u*c+a*n*d-e*o*d)*R,t[12]=L*R,t[13]=(h*g*s-v*u*s+v*n*f-e*g*f-h*n*m+e*u*m)*R,t[14]=(v*o*s-a*g*s-v*n*l+e*g*l+a*n*m-e*o*m)*R,t[15]=(a*u*s-h*o*s+h*n*l-e*u*l-a*n*f+e*o*f)*R,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,d=r*h,v=r*u,g=a*h,m=a*u,p=o*u,x=l*c,M=l*h,S=l*u,L=n.x,A=n.y,R=n.z;return s[0]=(1-(g+p))*L,s[1]=(d+S)*L,s[2]=(v-M)*L,s[3]=0,s[4]=(d-S)*A,s[5]=(1-(f+p))*A,s[6]=(m+x)*A,s[7]=0,s[8]=(v+M)*R,s[9]=(m-x)*R,s[10]=(1-(f+g))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ci.set(s[0],s[1],s[2]).length();const a=Ci.set(s[4],s[5],s[6]).length(),o=Ci.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],on.copy(this);const c=1/r,h=1/a,u=1/o;return on.elements[0]*=c,on.elements[1]*=c,on.elements[2]*=c,on.elements[4]*=h,on.elements[5]*=h,on.elements[6]*=h,on.elements[8]*=u,on.elements[9]*=u,on.elements[10]*=u,e.setFromRotationMatrix(on),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Dn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let d,v;if(o===Dn)d=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Lr)d=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Dn){const l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(a-r),f=(e+t)*c,d=(n+s)*h;let v,g;if(o===Dn)v=(a+r)*u,g=-2*u;else if(o===Lr)v=r*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=g,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ci=new P,on=new Ht,Sf=new P(0,0,0),bf=new P(1,1,1),Gn=new P,Ys=new P,Xe=new P,wl=new Ht,Rl=new vn;class Mn{constructor(t=0,e=0,n=0,s=Mn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(we(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-we(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(we(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-we(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(we(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-we(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return wl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(wl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Rl.setFromEuler(this),this.setFromQuaternion(Rl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Mn.DEFAULT_ORDER="XYZ";class ch{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ef=0;const Cl=new P,Pi=new vn,wn=new Ht,$s=new P,ms=new P,Tf=new P,Af=new vn,Pl=new P(1,0,0),Ll=new P(0,1,0),Dl=new P(0,0,1),Il={type:"added"},wf={type:"removed"},Li={type:"childadded",child:null},la={type:"childremoved",child:null};class _e extends ls{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ef++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_e.DEFAULT_UP.clone();const t=new P,e=new Mn,n=new vn,s=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ht},normalMatrix:{value:new Ot}}),this.matrix=new Ht,this.matrixWorld=new Ht,this.matrixAutoUpdate=_e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ch,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.multiply(Pi),this}rotateOnWorldAxis(t,e){return Pi.setFromAxisAngle(t,e),this.quaternion.premultiply(Pi),this}rotateX(t){return this.rotateOnAxis(Pl,t)}rotateY(t){return this.rotateOnAxis(Ll,t)}rotateZ(t){return this.rotateOnAxis(Dl,t)}translateOnAxis(t,e){return Cl.copy(t).applyQuaternion(this.quaternion),this.position.add(Cl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Pl,t)}translateY(t){return this.translateOnAxis(Ll,t)}translateZ(t){return this.translateOnAxis(Dl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(wn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?$s.copy(t):$s.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wn.lookAt(ms,$s,this.up):wn.lookAt($s,ms,this.up),this.quaternion.setFromRotationMatrix(wn),s&&(wn.extractRotation(s.matrixWorld),Pi.setFromRotationMatrix(wn),this.quaternion.premultiply(Pi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Il),Li.child=t,this.dispatchEvent(Li),Li.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(wf),la.child=t,this.dispatchEvent(la),la.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),wn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),wn.multiply(t.parent.matrixWorld)),t.applyMatrix4(wn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Il),Li.child=t,this.dispatchEvent(Li),Li.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,t,Tf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,Af,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),d=a(t.animations),v=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),v.length>0&&(n.nodes=v)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}_e.DEFAULT_UP=new P(0,1,0);_e.DEFAULT_MATRIX_AUTO_UPDATE=!0;_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ln=new P,Rn=new P,ca=new P,Cn=new P,Di=new P,Ii=new P,Ul=new P,ha=new P,ua=new P,fa=new P,da=new se,pa=new se,ma=new se;class tn{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),ln.subVectors(t,e),s.cross(ln);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){ln.subVectors(s,e),Rn.subVectors(n,e),ca.subVectors(t,e);const a=ln.dot(ln),o=ln.dot(Rn),l=ln.dot(ca),c=Rn.dot(Rn),h=Rn.dot(ca),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-o*h)*f,v=(a*h-o*l)*f;return r.set(1-d-v,v,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Cn)===null?!1:Cn.x>=0&&Cn.y>=0&&Cn.x+Cn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Cn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Cn.x),l.addScaledVector(a,Cn.y),l.addScaledVector(o,Cn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return da.setScalar(0),pa.setScalar(0),ma.setScalar(0),da.fromBufferAttribute(t,e),pa.fromBufferAttribute(t,n),ma.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(da,r.x),a.addScaledVector(pa,r.y),a.addScaledVector(ma,r.z),a}static isFrontFacing(t,e,n,s){return ln.subVectors(n,e),Rn.subVectors(t,e),ln.cross(Rn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ln.subVectors(this.c,this.b),Rn.subVectors(this.a,this.b),ln.cross(Rn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return tn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return tn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return tn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return tn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return tn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Di.subVectors(s,n),Ii.subVectors(r,n),ha.subVectors(t,n);const l=Di.dot(ha),c=Ii.dot(ha);if(l<=0&&c<=0)return e.copy(n);ua.subVectors(t,s);const h=Di.dot(ua),u=Ii.dot(ua);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Di,a);fa.subVectors(t,r);const d=Di.dot(fa),v=Ii.dot(fa);if(v>=0&&d<=v)return e.copy(r);const g=d*c-l*v;if(g<=0&&c>=0&&v<=0)return o=c/(c-v),e.copy(n).addScaledVector(Ii,o);const m=h*v-d*u;if(m<=0&&u-h>=0&&d-v>=0)return Ul.subVectors(r,s),o=(u-h)/(u-h+(d-v)),e.copy(s).addScaledVector(Ul,o);const p=1/(m+g+f);return a=g*p,o=f*p,e.copy(n).addScaledVector(Di,a).addScaledVector(Ii,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const hh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},Ks={h:0,s:0,l:0};function ga(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Tt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ae){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,qt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,qt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=qt.workingColorSpace){if(t=uf(t,1),e=we(e,0,1),n=we(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ga(a,r,t+1/3),this.g=ga(a,r,t),this.b=ga(a,r,t-1/3)}return qt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ae){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ae){const n=hh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Un(t.r),this.g=Un(t.g),this.b=Un(t.b),this}copyLinearToSRGB(t){return this.r=Ji(t.r),this.g=Ji(t.g),this.b=Ji(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ae){return qt.fromWorkingColorSpace(Le.copy(this),t),Math.round(we(Le.r*255,0,255))*65536+Math.round(we(Le.g*255,0,255))*256+Math.round(we(Le.b*255,0,255))}getHexString(t=Ae){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=qt.workingColorSpace){qt.fromWorkingColorSpace(Le.copy(this),e);const n=Le.r,s=Le.g,r=Le.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=qt.workingColorSpace){return qt.fromWorkingColorSpace(Le.copy(this),e),t.r=Le.r,t.g=Le.g,t.b=Le.b,t}getStyle(t=Ae){qt.fromWorkingColorSpace(Le.copy(this),t);const e=Le.r,n=Le.g,s=Le.b;return t!==Ae?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Vn),this.setHSL(Vn.h+t,Vn.s+e,Vn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Vn),t.getHSL(Ks);const n=Qr(Vn.h,Ks.h,e),s=Qr(Vn.s,Ks.s,e),r=Qr(Vn.l,Ks.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Le=new Tt;Tt.NAMES=hh;let Rf=0;class Mi extends ls{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=Kn(),this.name="",this.blending=di,this.side=Zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=za,this.blendDst=Ha,this.blendEquation=ci,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Tt(0,0,0),this.blendAlpha=0,this.depthFunc=Zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ei,this.stencilZFail=Ei,this.stencilZPass=Ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==di&&(n.blending=this.blending),this.side!==Zn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==za&&(n.blendSrc=this.blendSrc),this.blendDst!==Ha&&(n.blendDst=this.blendDst),this.blendEquation!==ci&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Zi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ei&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ei&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ei&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class pi extends Mi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=Hc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ve=new P,js=new rt;class Ie{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=To,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)js.fromBufferAttribute(this,e),js.applyMatrix3(t),this.setXY(e,js.x,js.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ne(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=gn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=gn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=gn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=gn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),s=ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),s=ne(s,this.array),r=ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==To&&(t.usage=this.usage),t}}class uh extends Ie{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class fh extends Ie{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class oe extends Ie{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Cf=0;const Je=new Ht,va=new _e,Ui=new P,qe=new xi,gs=new xi,be=new P;class Re extends ls{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(rh(t)?fh:uh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ot().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Je.makeRotationFromQuaternion(t),this.applyMatrix4(Je),this}rotateX(t){return Je.makeRotationX(t),this.applyMatrix4(Je),this}rotateY(t){return Je.makeRotationY(t),this.applyMatrix4(Je),this}rotateZ(t){return Je.makeRotationZ(t),this.applyMatrix4(Je),this}translate(t,e,n){return Je.makeTranslation(t,e,n),this.applyMatrix4(Je),this}scale(t,e,n){return Je.makeScale(t,e,n),this.applyMatrix4(Je),this}lookAt(t){return va.lookAt(t),va.updateMatrix(),this.applyMatrix4(va.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ui).negate(),this.translate(Ui.x,Ui.y,Ui.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new oe(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];qe.setFromBufferAttribute(r),this.morphTargetsRelative?(be.addVectors(this.boundingBox.min,qe.min),this.boundingBox.expandByPoint(be),be.addVectors(this.boundingBox.max,qe.max),this.boundingBox.expandByPoint(be)):(this.boundingBox.expandByPoint(qe.min),this.boundingBox.expandByPoint(qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(qe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];gs.setFromBufferAttribute(o),this.morphTargetsRelative?(be.addVectors(qe.min,gs.min),qe.expandByPoint(be),be.addVectors(qe.max,gs.max),qe.expandByPoint(be)):(qe.expandByPoint(gs.min),qe.expandByPoint(gs.max))}qe.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)be.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(be));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)be.fromBufferAttribute(o,c),l&&(Ui.fromBufferAttribute(t,c),be.add(Ui)),s=Math.max(s,n.distanceToSquared(be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ie(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<n.count;C++)o[C]=new P,l[C]=new P;const c=new P,h=new P,u=new P,f=new rt,d=new rt,v=new rt,g=new P,m=new P;function p(C,y,_){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,y),u.fromBufferAttribute(n,_),f.fromBufferAttribute(r,C),d.fromBufferAttribute(r,y),v.fromBufferAttribute(r,_),h.sub(c),u.sub(c),d.sub(f),v.sub(f);const w=1/(d.x*v.y-v.x*d.y);isFinite(w)&&(g.copy(h).multiplyScalar(v.y).addScaledVector(u,-d.y).multiplyScalar(w),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-v.x).multiplyScalar(w),o[C].add(g),o[y].add(g),o[_].add(g),l[C].add(m),l[y].add(m),l[_].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let C=0,y=x.length;C<y;++C){const _=x[C],w=_.start,O=_.count;for(let D=w,k=w+O;D<k;D+=3)p(t.getX(D+0),t.getX(D+1),t.getX(D+2))}const M=new P,S=new P,L=new P,A=new P;function R(C){L.fromBufferAttribute(s,C),A.copy(L);const y=o[C];M.copy(y),M.sub(L.multiplyScalar(L.dot(y))).normalize(),S.crossVectors(A,y);const w=S.dot(l[C])<0?-1:1;a.setXYZW(C,M.x,M.y,M.z,w)}for(let C=0,y=x.length;C<y;++C){const _=x[C],w=_.start,O=_.count;for(let D=w,k=w+O;D<k;D+=3)R(t.getX(D+0)),R(t.getX(D+1)),R(t.getX(D+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ie(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new P,r=new P,a=new P,o=new P,l=new P,c=new P,h=new P,u=new P;if(t)for(let f=0,d=t.count;f<d;f+=3){const v=t.getX(f+0),g=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,v),r.fromBufferAttribute(e,g),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,v),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(v,o.x,o.y,o.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)be.fromBufferAttribute(t,e),be.normalize(),t.setXYZ(e,be.x,be.y,be.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let d=0,v=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?d=l[g]*o.data.stride+o.offset:d=l[g]*h;for(let p=0;p<h;p++)f[v++]=c[d++]}return new Ie(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Re,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Nl=new Ht,ni=new lh,Js=new yi,Fl=new P,Zs=new P,Qs=new P,tr=new P,_a=new P,er=new P,Ol=new P,nr=new P;class dt extends _e{constructor(t=new Re,e=new pi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){er.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(_a.fromBufferAttribute(u,t),a?er.addScaledVector(_a,h):er.addScaledVector(_a.sub(e),h))}e.add(er)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Js.copy(n.boundingSphere),Js.applyMatrix4(r),ni.copy(t.ray).recast(t.near),!(Js.containsPoint(ni.origin)===!1&&(ni.intersectSphere(Js,Fl)===null||ni.origin.distanceToSquared(Fl)>(t.far-t.near)**2))&&(Nl.copy(r).invert(),ni.copy(t.ray).applyMatrix4(Nl),!(n.boundingBox!==null&&ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ni)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,g=f.length;v<g;v++){const m=f[v],p=a[m.materialIndex],x=Math.max(m.start,d.start),M=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let S=x,L=M;S<L;S+=3){const A=o.getX(S),R=o.getX(S+1),C=o.getX(S+2);s=ir(this,p,t,n,c,h,u,A,R,C),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const v=Math.max(0,d.start),g=Math.min(o.count,d.start+d.count);for(let m=v,p=g;m<p;m+=3){const x=o.getX(m),M=o.getX(m+1),S=o.getX(m+2);s=ir(this,a,t,n,c,h,u,x,M,S),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,g=f.length;v<g;v++){const m=f[v],p=a[m.materialIndex],x=Math.max(m.start,d.start),M=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let S=x,L=M;S<L;S+=3){const A=S,R=S+1,C=S+2;s=ir(this,p,t,n,c,h,u,A,R,C),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const v=Math.max(0,d.start),g=Math.min(l.count,d.start+d.count);for(let m=v,p=g;m<p;m+=3){const x=m,M=m+1,S=m+2;s=ir(this,a,t,n,c,h,u,x,M,S),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Pf(i,t,e,n,s,r,a,o){let l;if(t.side===Oe?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Zn,o),l===null)return null;nr.copy(o),nr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(nr);return c<e.near||c>e.far?null:{distance:c,point:nr.clone(),object:i}}function ir(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Zs),i.getVertexPosition(l,Qs),i.getVertexPosition(c,tr);const h=Pf(i,t,e,n,Zs,Qs,tr,Ol);if(h){const u=new P;tn.getBarycoord(Ol,Zs,Qs,tr,u),s&&(h.uv=tn.getInterpolatedAttribute(s,o,l,c,u,new rt)),r&&(h.uv1=tn.getInterpolatedAttribute(r,o,l,c,u,new rt)),a&&(h.normal=tn.getInterpolatedAttribute(a,o,l,c,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new P,materialIndex:0};tn.getNormal(Zs,Qs,tr,f.normal),h.face=f,h.barycoord=u}return h}class Lt extends Re{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,d=0;v("z","y","x",-1,-1,n,e,t,a,r,0),v("z","y","x",1,-1,n,e,-t,a,r,1),v("x","z","y",1,1,t,n,e,s,a,2),v("x","z","y",1,-1,t,n,-e,s,a,3),v("x","y","z",1,-1,t,e,n,s,r,4),v("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new oe(c,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(u,2));function v(g,m,p,x,M,S,L,A,R,C,y){const _=S/R,w=L/C,O=S/2,D=L/2,k=A/2,X=R+1,V=C+1;let Y=0,W=0;const Q=new P;for(let nt=0;nt<V;nt++){const mt=nt*w-D;for(let Ct=0;Ct<X;Ct++){const Kt=Ct*_-O;Q[g]=Kt*x,Q[m]=mt*M,Q[p]=k,c.push(Q.x,Q.y,Q.z),Q[g]=0,Q[m]=0,Q[p]=A>0?1:-1,h.push(Q.x,Q.y,Q.z),u.push(Ct/R),u.push(1-nt/C),Y+=1}}for(let nt=0;nt<C;nt++)for(let mt=0;mt<R;mt++){const Ct=f+mt+X*nt,Kt=f+mt+X*(nt+1),$=f+(mt+1)+X*(nt+1),tt=f+(mt+1)+X*nt;l.push(Ct,Kt,tt),l.push(Kt,$,tt),W+=6}o.addGroup(d,W,y),d+=W,f+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Lt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function is(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Fe(i){const t={};for(let e=0;e<i.length;e++){const n=is(i[e]);for(const s in n)t[s]=n[s]}return t}function Lf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function dh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:qt.workingColorSpace}const Ns={clone:is,merge:Fe};var Df=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,If=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class de extends Mi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Df,this.fragmentShader=If,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=is(t.uniforms),this.uniformsGroups=Lf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class ph extends _e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ht,this.projectionMatrix=new Ht,this.projectionMatrixInverse=new Ht,this.coordinateSystem=Dn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Wn=new P,kl=new rt,Bl=new rt;class He extends ph{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Dr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Zr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Dr*2*Math.atan(Math.tan(Zr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Wn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Wn.x,Wn.y).multiplyScalar(-t/Wn.z),Wn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wn.x,Wn.y).multiplyScalar(-t/Wn.z)}getViewSize(t,e){return this.getViewBounds(t,kl,Bl),e.subVectors(Bl,kl)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Zr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ni=-90,Fi=1;class Uf extends _e{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new He(Ni,Fi,t,e);s.layers=this.layers,this.add(s);const r=new He(Ni,Fi,t,e);r.layers=this.layers,this.add(r);const a=new He(Ni,Fi,t,e);a.layers=this.layers,this.add(a);const o=new He(Ni,Fi,t,e);o.layers=this.layers,this.add(o);const l=new He(Ni,Fi,t,e);l.layers=this.layers,this.add(l);const c=new He(Ni,Fi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Dn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Lr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=v,n.texture.needsPMREMUpdate=!0}}class mh extends Ue{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Qi,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Nf extends nn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new mh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:en}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Lt(5,5,5),r=new de({name:"CubemapFromEquirect",uniforms:is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Oe,blending:In});r.uniforms.tEquirect.value=e;const a=new dt(s,r),o=e.minFilter;return e.minFilter===ui&&(e.minFilter=en),new Uf(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const xa=new P,Ff=new P,Of=new Ot;class oi{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=xa.subVectors(n,e).cross(Ff.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(xa),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Of.getNormalMatrix(t),s=this.coplanarPoint(xa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ii=new yi,sr=new P;class Wo{constructor(t=new oi,e=new oi,n=new oi,s=new oi,r=new oi,a=new oi){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Dn){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],d=s[8],v=s[9],g=s[10],m=s[11],p=s[12],x=s[13],M=s[14],S=s[15];if(n[0].setComponents(l-r,f-c,m-d,S-p).normalize(),n[1].setComponents(l+r,f+c,m+d,S+p).normalize(),n[2].setComponents(l+a,f+h,m+v,S+x).normalize(),n[3].setComponents(l-a,f-h,m-v,S-x).normalize(),n[4].setComponents(l-o,f-u,m-g,S-M).normalize(),e===Dn)n[5].setComponents(l+o,f+u,m+g,S+M).normalize();else if(e===Lr)n[5].setComponents(o,u,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ii.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ii.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ii)}intersectsSprite(t){return ii.center.set(0,0,0),ii.radius=.7071067811865476,ii.applyMatrix4(t.matrixWorld),this.intersectsSphere(ii)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(sr.x=s.normal.x>0?t.max.x:t.min.x,sr.y=s.normal.y>0?t.max.y:t.min.y,sr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(sr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function gh(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function kf(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,v)=>d.start-v.start);let f=0;for(let d=1;d<u.length;d++){const v=u[f],g=u[d];g.start<=v.start+v.count+1?v.count=Math.max(v.count,g.start+g.count-v.start):(++f,u[f]=g)}u.length=f+1;for(let d=0,v=u.length;d<v;d++){const g=u[d];i.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class ze extends Re{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=t/o,f=e/l,d=[],v=[],g=[],m=[];for(let p=0;p<h;p++){const x=p*f-a;for(let M=0;M<c;M++){const S=M*u-r;v.push(S,-x,0),g.push(0,0,1),m.push(M/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<o;x++){const M=x+c*p,S=x+c*(p+1),L=x+1+c*(p+1),A=x+1+c*p;d.push(M,S,A),d.push(S,L,A)}this.setIndex(d),this.setAttribute("position",new oe(v,3)),this.setAttribute("normal",new oe(g,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ze(t.width,t.height,t.widthSegments,t.heightSegments)}}var Bf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zf=`#ifdef USE_ALPHAHASH
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
#endif`,Hf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Wf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xf=`#ifdef USE_AOMAP
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
#endif`,qf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yf=`#ifdef USE_BATCHING
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
#endif`,$f=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Kf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Zf=`#ifdef USE_IRIDESCENCE
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
#endif`,Qf=`#ifdef USE_BUMPMAP
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
#endif`,td=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ed=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,nd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,id=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,rd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ad=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,od=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ld=`#define PI 3.141592653589793
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
} // validated`,cd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,hd=`vec3 transformedNormal = objectNormal;
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
#endif`,ud=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,dd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,pd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,md="gl_FragColor = linearToOutputTexel( gl_FragColor );",gd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vd=`#ifdef USE_ENVMAP
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
#endif`,_d=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,xd=`#ifdef USE_ENVMAP
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
#endif`,yd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Md=`#ifdef USE_ENVMAP
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
#endif`,Sd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ed=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Td=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ad=`#ifdef USE_GRADIENTMAP
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
}`,wd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Rd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Cd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Pd=`uniform bool receiveShadow;
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
#endif`,Ld=`#ifdef USE_ENVMAP
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
#endif`,Dd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Id=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ud=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Nd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Fd=`PhysicalMaterial material;
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
#endif`,Od=`struct PhysicalMaterial {
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
}`,kd=`
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
#endif`,Bd=`#if defined( RE_IndirectDiffuse )
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
#endif`,zd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Hd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Wd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Xd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Yd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,$d=`#if defined( USE_POINTS_UV )
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
#endif`,Kd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Qd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tp=`#ifdef USE_MORPHTARGETS
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
#endif`,ep=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,np=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ip=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,sp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ap=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,op=`#ifdef USE_NORMALMAP
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
#endif`,lp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,cp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,up=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,pp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_p=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,bp=`float getShadowMask() {
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
}`,Ep=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Tp=`#ifdef USE_SKINNING
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
#endif`,Ap=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wp=`#ifdef USE_SKINNING
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
#endif`,Rp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Cp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Lp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dp=`#ifdef USE_TRANSMISSION
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
#endif`,Ip=`#ifdef USE_TRANSMISSION
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
#endif`,Up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Op=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bp=`uniform sampler2D t2D;
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
}`,zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wp=`#include <common>
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
}`,Xp=`#if DEPTH_PACKING == 3200
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
}`,qp=`#define DISTANCE
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
}`,Yp=`#define DISTANCE
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
}`,$p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Kp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jp=`uniform float scale;
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
}`,Jp=`uniform vec3 diffuse;
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
}`,Zp=`#include <common>
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
}`,Qp=`uniform vec3 diffuse;
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
}`,tm=`#define LAMBERT
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
}`,em=`#define LAMBERT
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
}`,nm=`#define MATCAP
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
}`,im=`#define MATCAP
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
}`,sm=`#define NORMAL
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
}`,rm=`#define NORMAL
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
}`,am=`#define PHONG
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
}`,om=`#define PHONG
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
}`,lm=`#define STANDARD
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
}`,cm=`#define STANDARD
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
}`,hm=`#define TOON
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
}`,um=`#define TOON
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
}`,fm=`uniform float size;
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
}`,dm=`uniform vec3 diffuse;
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
}`,pm=`#include <common>
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
}`,mm=`uniform vec3 color;
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
}`,gm=`uniform float rotation;
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
}`,vm=`uniform vec3 diffuse;
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
}`,Bt={alphahash_fragment:Bf,alphahash_pars_fragment:zf,alphamap_fragment:Hf,alphamap_pars_fragment:Gf,alphatest_fragment:Vf,alphatest_pars_fragment:Wf,aomap_fragment:Xf,aomap_pars_fragment:qf,batching_pars_vertex:Yf,batching_vertex:$f,begin_vertex:Kf,beginnormal_vertex:jf,bsdfs:Jf,iridescence_fragment:Zf,bumpmap_pars_fragment:Qf,clipping_planes_fragment:td,clipping_planes_pars_fragment:ed,clipping_planes_pars_vertex:nd,clipping_planes_vertex:id,color_fragment:sd,color_pars_fragment:rd,color_pars_vertex:ad,color_vertex:od,common:ld,cube_uv_reflection_fragment:cd,defaultnormal_vertex:hd,displacementmap_pars_vertex:ud,displacementmap_vertex:fd,emissivemap_fragment:dd,emissivemap_pars_fragment:pd,colorspace_fragment:md,colorspace_pars_fragment:gd,envmap_fragment:vd,envmap_common_pars_fragment:_d,envmap_pars_fragment:xd,envmap_pars_vertex:yd,envmap_physical_pars_fragment:Ld,envmap_vertex:Md,fog_vertex:Sd,fog_pars_vertex:bd,fog_fragment:Ed,fog_pars_fragment:Td,gradientmap_pars_fragment:Ad,lightmap_pars_fragment:wd,lights_lambert_fragment:Rd,lights_lambert_pars_fragment:Cd,lights_pars_begin:Pd,lights_toon_fragment:Dd,lights_toon_pars_fragment:Id,lights_phong_fragment:Ud,lights_phong_pars_fragment:Nd,lights_physical_fragment:Fd,lights_physical_pars_fragment:Od,lights_fragment_begin:kd,lights_fragment_maps:Bd,lights_fragment_end:zd,logdepthbuf_fragment:Hd,logdepthbuf_pars_fragment:Gd,logdepthbuf_pars_vertex:Vd,logdepthbuf_vertex:Wd,map_fragment:Xd,map_pars_fragment:qd,map_particle_fragment:Yd,map_particle_pars_fragment:$d,metalnessmap_fragment:Kd,metalnessmap_pars_fragment:jd,morphinstance_vertex:Jd,morphcolor_vertex:Zd,morphnormal_vertex:Qd,morphtarget_pars_vertex:tp,morphtarget_vertex:ep,normal_fragment_begin:np,normal_fragment_maps:ip,normal_pars_fragment:sp,normal_pars_vertex:rp,normal_vertex:ap,normalmap_pars_fragment:op,clearcoat_normal_fragment_begin:lp,clearcoat_normal_fragment_maps:cp,clearcoat_pars_fragment:hp,iridescence_pars_fragment:up,opaque_fragment:fp,packing:dp,premultiplied_alpha_fragment:pp,project_vertex:mp,dithering_fragment:gp,dithering_pars_fragment:vp,roughnessmap_fragment:_p,roughnessmap_pars_fragment:xp,shadowmap_pars_fragment:yp,shadowmap_pars_vertex:Mp,shadowmap_vertex:Sp,shadowmask_pars_fragment:bp,skinbase_vertex:Ep,skinning_pars_vertex:Tp,skinning_vertex:Ap,skinnormal_vertex:wp,specularmap_fragment:Rp,specularmap_pars_fragment:Cp,tonemapping_fragment:Pp,tonemapping_pars_fragment:Lp,transmission_fragment:Dp,transmission_pars_fragment:Ip,uv_pars_fragment:Up,uv_pars_vertex:Np,uv_vertex:Fp,worldpos_vertex:Op,background_vert:kp,background_frag:Bp,backgroundCube_vert:zp,backgroundCube_frag:Hp,cube_vert:Gp,cube_frag:Vp,depth_vert:Wp,depth_frag:Xp,distanceRGBA_vert:qp,distanceRGBA_frag:Yp,equirect_vert:$p,equirect_frag:Kp,linedashed_vert:jp,linedashed_frag:Jp,meshbasic_vert:Zp,meshbasic_frag:Qp,meshlambert_vert:tm,meshlambert_frag:em,meshmatcap_vert:nm,meshmatcap_frag:im,meshnormal_vert:sm,meshnormal_frag:rm,meshphong_vert:am,meshphong_frag:om,meshphysical_vert:lm,meshphysical_frag:cm,meshtoon_vert:hm,meshtoon_frag:um,points_vert:fm,points_frag:dm,shadow_vert:pm,shadow_frag:mm,sprite_vert:gm,sprite_frag:vm},at={common:{diffuse:{value:new Tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new Tt(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},pn={basic:{uniforms:Fe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:Fe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Tt(0)}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:Fe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new Tt(0)},specular:{value:new Tt(1118481)},shininess:{value:30}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:Fe([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new Tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:Fe([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new Tt(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:Fe([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:Fe([at.points,at.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:Fe([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:Fe([at.common,at.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:Fe([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:Fe([at.sprite,at.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distanceRGBA:{uniforms:Fe([at.common,at.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Bt.distanceRGBA_vert,fragmentShader:Bt.distanceRGBA_frag},shadow:{uniforms:Fe([at.lights,at.fog,{color:{value:new Tt(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};pn.physical={uniforms:Fe([pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new Tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new Tt(0)},specularColor:{value:new Tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};const rr={r:0,b:0,g:0},si=new Mn,_m=new Ht;function xm(i,t,e,n,s,r,a){const o=new Tt(0);let l=r===!0?0:1,c,h,u=null,f=0,d=null;function v(x){let M=x.isScene===!0?x.background:null;return M&&M.isTexture&&(M=(x.backgroundBlurriness>0?e:t).get(M)),M}function g(x){let M=!1;const S=v(x);S===null?p(o,l):S&&S.isColor&&(p(S,1),M=!0);const L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,a):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(x,M){const S=v(M);S&&(S.isCubeTexture||S.mapping===Hr)?(h===void 0&&(h=new dt(new Lt(1,1,1),new de({name:"BackgroundCubeMaterial",uniforms:is(pn.backgroundCube.uniforms),vertexShader:pn.backgroundCube.vertexShader,fragmentShader:pn.backgroundCube.fragmentShader,side:Oe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),si.copy(M.backgroundRotation),si.x*=-1,si.y*=-1,si.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(_m.makeRotationFromEuler(si)),h.material.toneMapped=qt.getTransfer(S.colorSpace)!==ee,(u!==S||f!==S.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=S,f=S.version,d=i.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new dt(new ze(2,2),new de({name:"BackgroundMaterial",uniforms:is(pn.background.uniforms),vertexShader:pn.background.vertexShader,fragmentShader:pn.background.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=qt.getTransfer(S.colorSpace)!==ee,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||f!==S.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=S,f=S.version,d=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,M){x.getRGB(rr,dh(i)),n.buffers.color.setClear(rr.r,rr.g,rr.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(x,M=1){o.set(x),l=M,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(o,l)},render:g,addToRenderList:m}}function ym(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(_,w,O,D,k){let X=!1;const V=u(D,O,w);r!==V&&(r=V,c(r.object)),X=d(_,D,O,k),X&&v(_,D,O,k),k!==null&&t.update(k,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,S(_,w,O,D),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return i.createVertexArray()}function c(_){return i.bindVertexArray(_)}function h(_){return i.deleteVertexArray(_)}function u(_,w,O){const D=O.wireframe===!0;let k=n[_.id];k===void 0&&(k={},n[_.id]=k);let X=k[w.id];X===void 0&&(X={},k[w.id]=X);let V=X[D];return V===void 0&&(V=f(l()),X[D]=V),V}function f(_){const w=[],O=[],D=[];for(let k=0;k<e;k++)w[k]=0,O[k]=0,D[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:O,attributeDivisors:D,object:_,attributes:{},index:null}}function d(_,w,O,D){const k=r.attributes,X=w.attributes;let V=0;const Y=O.getAttributes();for(const W in Y)if(Y[W].location>=0){const nt=k[W];let mt=X[W];if(mt===void 0&&(W==="instanceMatrix"&&_.instanceMatrix&&(mt=_.instanceMatrix),W==="instanceColor"&&_.instanceColor&&(mt=_.instanceColor)),nt===void 0||nt.attribute!==mt||mt&&nt.data!==mt.data)return!0;V++}return r.attributesNum!==V||r.index!==D}function v(_,w,O,D){const k={},X=w.attributes;let V=0;const Y=O.getAttributes();for(const W in Y)if(Y[W].location>=0){let nt=X[W];nt===void 0&&(W==="instanceMatrix"&&_.instanceMatrix&&(nt=_.instanceMatrix),W==="instanceColor"&&_.instanceColor&&(nt=_.instanceColor));const mt={};mt.attribute=nt,nt&&nt.data&&(mt.data=nt.data),k[W]=mt,V++}r.attributes=k,r.attributesNum=V,r.index=D}function g(){const _=r.newAttributes;for(let w=0,O=_.length;w<O;w++)_[w]=0}function m(_){p(_,0)}function p(_,w){const O=r.newAttributes,D=r.enabledAttributes,k=r.attributeDivisors;O[_]=1,D[_]===0&&(i.enableVertexAttribArray(_),D[_]=1),k[_]!==w&&(i.vertexAttribDivisor(_,w),k[_]=w)}function x(){const _=r.newAttributes,w=r.enabledAttributes;for(let O=0,D=w.length;O<D;O++)w[O]!==_[O]&&(i.disableVertexAttribArray(O),w[O]=0)}function M(_,w,O,D,k,X,V){V===!0?i.vertexAttribIPointer(_,w,O,k,X):i.vertexAttribPointer(_,w,O,D,k,X)}function S(_,w,O,D){g();const k=D.attributes,X=O.getAttributes(),V=w.defaultAttributeValues;for(const Y in X){const W=X[Y];if(W.location>=0){let Q=k[Y];if(Q===void 0&&(Y==="instanceMatrix"&&_.instanceMatrix&&(Q=_.instanceMatrix),Y==="instanceColor"&&_.instanceColor&&(Q=_.instanceColor)),Q!==void 0){const nt=Q.normalized,mt=Q.itemSize,Ct=t.get(Q);if(Ct===void 0)continue;const Kt=Ct.buffer,$=Ct.type,tt=Ct.bytesPerElement,_t=$===i.INT||$===i.UNSIGNED_INT||Q.gpuType===Oo;if(Q.isInterleavedBufferAttribute){const lt=Q.data,Pt=lt.stride,Ut=Q.offset;if(lt.isInstancedInterleavedBuffer){for(let zt=0;zt<W.locationSize;zt++)p(W.location+zt,lt.meshPerAttribute);_.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let zt=0;zt<W.locationSize;zt++)m(W.location+zt);i.bindBuffer(i.ARRAY_BUFFER,Kt);for(let zt=0;zt<W.locationSize;zt++)M(W.location+zt,mt/W.locationSize,$,nt,Pt*tt,(Ut+mt/W.locationSize*zt)*tt,_t)}else{if(Q.isInstancedBufferAttribute){for(let lt=0;lt<W.locationSize;lt++)p(W.location+lt,Q.meshPerAttribute);_.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let lt=0;lt<W.locationSize;lt++)m(W.location+lt);i.bindBuffer(i.ARRAY_BUFFER,Kt);for(let lt=0;lt<W.locationSize;lt++)M(W.location+lt,mt/W.locationSize,$,nt,mt*tt,mt/W.locationSize*lt*tt,_t)}}else if(V!==void 0){const nt=V[Y];if(nt!==void 0)switch(nt.length){case 2:i.vertexAttrib2fv(W.location,nt);break;case 3:i.vertexAttrib3fv(W.location,nt);break;case 4:i.vertexAttrib4fv(W.location,nt);break;default:i.vertexAttrib1fv(W.location,nt)}}}}x()}function L(){C();for(const _ in n){const w=n[_];for(const O in w){const D=w[O];for(const k in D)h(D[k].object),delete D[k];delete w[O]}delete n[_]}}function A(_){if(n[_.id]===void 0)return;const w=n[_.id];for(const O in w){const D=w[O];for(const k in D)h(D[k].object),delete D[k];delete w[O]}delete n[_.id]}function R(_){for(const w in n){const O=n[w];if(O[_.id]===void 0)continue;const D=O[_.id];for(const k in D)h(D[k].object),delete D[k];delete O[_.id]}}function C(){y(),a=!0,r!==s&&(r=s,c(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:y,dispose:L,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:g,enableAttribute:m,disableUnusedAttributes:x}}function Mm(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let v=0;v<u;v++)d+=h[v];e.update(d,n,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let v=0;v<c.length;v++)a(c[v],h[v],f[v]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let v=0;for(let g=0;g<u;g++)v+=h[g]*f[g];e.update(v,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Sm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==$e&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const C=R===yn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==hn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==xn&&!C)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),L=v>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:v,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:S,vertexTextures:L,maxSamples:A}}function bm(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new oi,o=new Ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const v=u.clippingPlanes,g=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||v===null||v.length===0||r&&!m)r?h(null):c();else{const x=r?0:n,M=x*4;let S=p.clippingState||null;l.value=S,S=h(v,f,M,d);for(let L=0;L!==M;++L)S[L]=e[L];p.clippingState=S,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,v){const g=u!==null?u.length:0;let m=null;if(g!==0){if(m=l.value,v!==!0||m===null){const p=d+g*4,x=f.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,S=d;M!==g;++M,S+=4)a.copy(u[M]).applyMatrix4(x,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function Em(i){let t=new WeakMap;function e(a,o){return o===Ka?a.mapping=Qi:o===ja&&(a.mapping=ts),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ka||o===ja)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Nf(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class vh extends ph{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ki=4,zl=[.125,.215,.35,.446,.526,.582],hi=20,ya=new vh,Hl=new Tt;let Ma=null,Sa=0,ba=0,Ea=!1;const li=(1+Math.sqrt(5))/2,Oi=1/li,Gl=[new P(-li,Oi,0),new P(li,Oi,0),new P(-Oi,0,li),new P(Oi,0,li),new P(0,li,-Oi),new P(0,li,Oi),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class Ao{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Ma=this._renderer.getRenderTarget(),Sa=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),Ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ma,Sa,ba),this._renderer.xr.enabled=Ea,t.scissorTest=!1,ar(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Qi||t.mapping===ts?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ma=this._renderer.getRenderTarget(),Sa=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),Ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:en,minFilter:en,generateMipmaps:!1,type:yn,format:$e,colorSpace:os,depthBuffer:!1},s=Vl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Tm(r)),this._blurMaterial=Am(r,t,e)}return s}_compileMaterial(t){const e=new dt(this._lodPlanes[0],t);this._renderer.compile(e,ya)}_sceneToCubeUV(t,e,n,s){const o=new He(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Hl),h.toneMapping=$n,h.autoClear=!1;const d=new pi({name:"PMREM.Background",side:Oe,depthWrite:!1,depthTest:!1}),v=new dt(new Lt,d);let g=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,g=!0):(d.color.copy(Hl),g=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):x===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const M=this._cubeSize;ar(s,x*M,p>2?M:0,M,M),h.setRenderTarget(s),g&&h.render(v,o),h.render(t,o)}v.geometry.dispose(),v.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Qi||t.mapping===ts;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new dt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;ar(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,ya)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Gl[(s-r-1)%Gl.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new dt(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[n]-1,v=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*hi-1),g=r/v,m=isFinite(r)?1+Math.floor(h*g):hi;m>hi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${hi}`);const p=[];let x=0;for(let R=0;R<hi;++R){const C=R/g,y=Math.exp(-C*C/2);p.push(y),R===0?x+=y:R<m&&(x+=2*y)}for(let R=0;R<p.length;R++)p[R]=p[R]/x;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:M}=this;f.dTheta.value=v,f.mipInt.value=M-n;const S=this._sizeLods[s],L=3*S*(s>M-Ki?s-M+Ki:0),A=4*(this._cubeSize-S);ar(e,L,A,3*S,2*S),l.setRenderTarget(e),l.render(u,ya)}}function Tm(i){const t=[],e=[],n=[];let s=i;const r=i-Ki+1+zl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Ki?l=zl[a-i+Ki-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,v=6,g=3,m=2,p=1,x=new Float32Array(g*v*d),M=new Float32Array(m*v*d),S=new Float32Array(p*v*d);for(let A=0;A<d;A++){const R=A%3*2/3-1,C=A>2?0:-1,y=[R,C,0,R+2/3,C,0,R+2/3,C+1,0,R,C,0,R+2/3,C+1,0,R,C+1,0];x.set(y,g*v*A),M.set(f,m*v*A);const _=[A,A,A,A,A,A];S.set(_,p*v*A)}const L=new Re;L.setAttribute("position",new Ie(x,g)),L.setAttribute("uv",new Ie(M,m)),L.setAttribute("faceIndex",new Ie(S,p)),t.push(L),s>Ki&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Vl(i,t,e){const n=new nn(i,t,e);return n.texture.mapping=Hr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ar(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Am(i,t,e){const n=new Float32Array(hi),s=new P(0,1,0);return new de({name:"SphericalGaussianBlur",defines:{n:hi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Xo(),fragmentShader:`

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
		`,blending:In,depthTest:!1,depthWrite:!1})}function Wl(){return new de({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xo(),fragmentShader:`

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
		`,blending:In,depthTest:!1,depthWrite:!1})}function Xl(){return new de({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function Xo(){return`

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
	`}function wm(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Ka||l===ja,h=l===Qi||l===ts;if(c||h){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Ao(i)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const d=o.image;return c&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Ao(i)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Rm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&As("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Cm(i,t,e,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const v in f.attributes)t.remove(f.attributes[v]);for(const v in f.morphAttributes){const g=f.morphAttributes[v];for(let m=0,p=g.length;m<p;m++)t.remove(g[m])}f.removeEventListener("dispose",a),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const v in f)t.update(f[v],i.ARRAY_BUFFER);const d=u.morphAttributes;for(const v in d){const g=d[v];for(let m=0,p=g.length;m<p;m++)t.update(g[m],i.ARRAY_BUFFER)}}function c(u){const f=[],d=u.index,v=u.attributes.position;let g=0;if(d!==null){const x=d.array;g=d.version;for(let M=0,S=x.length;M<S;M+=3){const L=x[M+0],A=x[M+1],R=x[M+2];f.push(L,A,A,R,R,L)}}else if(v!==void 0){const x=v.array;g=v.version;for(let M=0,S=x.length/3-1;M<S;M+=3){const L=M+0,A=M+1,R=M+2;f.push(L,A,A,R,R,L)}}else return;const m=new(rh(f)?fh:uh)(f,1);m.version=g;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Pm(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*a),e.update(d,n,1)}function c(f,d,v){v!==0&&(i.drawElementsInstanced(n,d,r,f*a,v),e.update(d,n,v))}function h(f,d,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,v);let m=0;for(let p=0;p<v;p++)m+=d[p];e.update(m,n,1)}function u(f,d,v,g){if(v===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/a,d[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,g,0,v);let p=0;for(let x=0;x<v;x++)p+=d[x]*g[x];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Lm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Dm(i,t,e){const n=new WeakMap,s=new se;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==u){let _=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",_)};var d=_;f!==void 0&&f.texture.dispose();const v=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let S=0;v===!0&&(S=1),g===!0&&(S=2),m===!0&&(S=3);let L=o.attributes.position.count*S,A=1;L>t.maxTextureSize&&(A=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const R=new Float32Array(L*A*4*u),C=new oh(R,L,A,u);C.type=xn,C.needsUpdate=!0;const y=S*4;for(let w=0;w<u;w++){const O=p[w],D=x[w],k=M[w],X=L*A*4*w;for(let V=0;V<O.count;V++){const Y=V*y;v===!0&&(s.fromBufferAttribute(O,V),R[X+Y+0]=s.x,R[X+Y+1]=s.y,R[X+Y+2]=s.z,R[X+Y+3]=0),g===!0&&(s.fromBufferAttribute(D,V),R[X+Y+4]=s.x,R[X+Y+5]=s.y,R[X+Y+6]=s.z,R[X+Y+7]=0),m===!0&&(s.fromBufferAttribute(k,V),R[X+Y+8]=s.x,R[X+Y+9]=s.y,R[X+Y+10]=s.z,R[X+Y+11]=k.itemSize===4?s.w:1)}}f={count:u,texture:C,size:new rt(L,A)},n.set(o,f),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let v=0;for(let m=0;m<c.length;m++)v+=c[m];const g=o.morphTargetsRelative?1:1-v;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Im(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class _h extends Ue{constructor(t,e,n,s,r,a,o,l,c,h=ji){if(h!==ji&&h!==ns)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ji&&(n=gi),n===void 0&&h===ns&&(n=es),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:ke,this.minFilter=l!==void 0?l:ke,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const xh=new Ue,ql=new _h(1,1),yh=new oh,Mh=new yf,Sh=new mh,Yl=[],$l=[],Kl=new Float32Array(16),jl=new Float32Array(9),Jl=new Float32Array(4);function cs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Yl[s];if(r===void 0&&(r=new Float32Array(s),Yl[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function ye(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Me(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Vr(i,t){let e=$l[t];e===void 0&&(e=new Int32Array(t),$l[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Um(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Nm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2fv(this.addr,t),Me(e,t)}}function Fm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ye(e,t))return;i.uniform3fv(this.addr,t),Me(e,t)}}function Om(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4fv(this.addr,t),Me(e,t)}}function km(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Me(e,t)}else{if(ye(e,n))return;Jl.set(n),i.uniformMatrix2fv(this.addr,!1,Jl),Me(e,n)}}function Bm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Me(e,t)}else{if(ye(e,n))return;jl.set(n),i.uniformMatrix3fv(this.addr,!1,jl),Me(e,n)}}function zm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Me(e,t)}else{if(ye(e,n))return;Kl.set(n),i.uniformMatrix4fv(this.addr,!1,Kl),Me(e,n)}}function Hm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Gm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2iv(this.addr,t),Me(e,t)}}function Vm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;i.uniform3iv(this.addr,t),Me(e,t)}}function Wm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4iv(this.addr,t),Me(e,t)}}function Xm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function qm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;i.uniform2uiv(this.addr,t),Me(e,t)}}function Ym(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;i.uniform3uiv(this.addr,t),Me(e,t)}}function $m(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;i.uniform4uiv(this.addr,t),Me(e,t)}}function Km(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ql.compareFunction=sh,r=ql):r=xh,e.setTexture2D(t||r,s)}function jm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Mh,s)}function Jm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Sh,s)}function Zm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||yh,s)}function Qm(i){switch(i){case 5126:return Um;case 35664:return Nm;case 35665:return Fm;case 35666:return Om;case 35674:return km;case 35675:return Bm;case 35676:return zm;case 5124:case 35670:return Hm;case 35667:case 35671:return Gm;case 35668:case 35672:return Vm;case 35669:case 35673:return Wm;case 5125:return Xm;case 36294:return qm;case 36295:return Ym;case 36296:return $m;case 35678:case 36198:case 36298:case 36306:case 35682:return Km;case 35679:case 36299:case 36307:return jm;case 35680:case 36300:case 36308:case 36293:return Jm;case 36289:case 36303:case 36311:case 36292:return Zm}}function t0(i,t){i.uniform1fv(this.addr,t)}function e0(i,t){const e=cs(t,this.size,2);i.uniform2fv(this.addr,e)}function n0(i,t){const e=cs(t,this.size,3);i.uniform3fv(this.addr,e)}function i0(i,t){const e=cs(t,this.size,4);i.uniform4fv(this.addr,e)}function s0(i,t){const e=cs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function r0(i,t){const e=cs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function a0(i,t){const e=cs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function o0(i,t){i.uniform1iv(this.addr,t)}function l0(i,t){i.uniform2iv(this.addr,t)}function c0(i,t){i.uniform3iv(this.addr,t)}function h0(i,t){i.uniform4iv(this.addr,t)}function u0(i,t){i.uniform1uiv(this.addr,t)}function f0(i,t){i.uniform2uiv(this.addr,t)}function d0(i,t){i.uniform3uiv(this.addr,t)}function p0(i,t){i.uniform4uiv(this.addr,t)}function m0(i,t,e){const n=this.cache,s=t.length,r=Vr(e,s);ye(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||xh,r[a])}function g0(i,t,e){const n=this.cache,s=t.length,r=Vr(e,s);ye(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Mh,r[a])}function v0(i,t,e){const n=this.cache,s=t.length,r=Vr(e,s);ye(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Sh,r[a])}function _0(i,t,e){const n=this.cache,s=t.length,r=Vr(e,s);ye(n,r)||(i.uniform1iv(this.addr,r),Me(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||yh,r[a])}function x0(i){switch(i){case 5126:return t0;case 35664:return e0;case 35665:return n0;case 35666:return i0;case 35674:return s0;case 35675:return r0;case 35676:return a0;case 5124:case 35670:return o0;case 35667:case 35671:return l0;case 35668:case 35672:return c0;case 35669:case 35673:return h0;case 5125:return u0;case 36294:return f0;case 36295:return d0;case 36296:return p0;case 35678:case 36198:case 36298:case 36306:case 35682:return m0;case 35679:case 36299:case 36307:return g0;case 35680:case 36300:case 36308:case 36293:return v0;case 36289:case 36303:case 36311:case 36292:return _0}}class y0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Qm(e.type)}}class M0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=x0(e.type)}}class S0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Ta=/(\w+)(\])?(\[|\.)?/g;function Zl(i,t){i.seq.push(t),i.map[t.id]=t}function b0(i,t,e){const n=i.name,s=n.length;for(Ta.lastIndex=0;;){const r=Ta.exec(n),a=Ta.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Zl(e,c===void 0?new y0(o,i,t):new M0(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new S0(o),Zl(e,u)),e=u}}}class Cr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);b0(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Ql(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const E0=37297;let T0=0;function A0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const tc=new Ot;function w0(i){qt._getMatrix(tc,qt.workingColorSpace,i);const t=`mat3( ${tc.elements.map(e=>e.toFixed(4))} )`;switch(qt.getTransfer(i)){case Gr:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function ec(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+A0(i.getShaderSource(t),a)}else return s}function R0(i,t){const e=w0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function C0(i,t){let e;switch(t){case Gc:e="Linear";break;case Vc:e="Reinhard";break;case Wc:e="Cineon";break;case Fo:e="ACESFilmic";break;case Xc:e="AgX";break;case qc:e="Neutral";break;case Zu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const or=new P;function P0(){qt.getLuminanceCoefficients(or);const i=or.x.toFixed(4),t=or.y.toFixed(4),e=or.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function L0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ws).join(`
`)}function D0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function I0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function ws(i){return i!==""}function nc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ic(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const U0=/^[ \t]*#include +<([\w\d./]+)>/gm;function wo(i){return i.replace(U0,F0)}const N0=new Map;function F0(i,t){let e=Bt[t];if(e===void 0){const n=N0.get(t);if(n!==void 0)e=Bt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return wo(e)}const O0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function sc(i){return i.replace(O0,k0)}function k0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function rc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function B0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===No?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===zc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Pn&&(t="SHADOWMAP_TYPE_VSM"),t}function z0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Qi:case ts:t="ENVMAP_TYPE_CUBE";break;case Hr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function H0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ts:t="ENVMAP_MODE_REFRACTION";break}return t}function G0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Hc:t="ENVMAP_BLENDING_MULTIPLY";break;case ju:t="ENVMAP_BLENDING_MIX";break;case Ju:t="ENVMAP_BLENDING_ADD";break}return t}function V0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function W0(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=B0(e),c=z0(e),h=H0(e),u=G0(e),f=V0(e),d=L0(e),v=D0(r),g=s.createProgram();let m,p,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(ws).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(ws).join(`
`),p.length>0&&(p+=`
`)):(m=[rc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ws).join(`
`),p=[rc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==$n?"#define TONE_MAPPING":"",e.toneMapping!==$n?Bt.tonemapping_pars_fragment:"",e.toneMapping!==$n?C0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Bt.colorspace_pars_fragment,R0("linearToOutputTexel",e.outputColorSpace),P0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ws).join(`
`)),a=wo(a),a=nc(a,e),a=ic(a,e),o=wo(o),o=nc(o,e),o=ic(o,e),a=sc(a),o=sc(o),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===xl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===xl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=x+m+a,S=x+p+o,L=Ql(s,s.VERTEX_SHADER,M),A=Ql(s,s.FRAGMENT_SHADER,S);s.attachShader(g,L),s.attachShader(g,A),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function R(w){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(g).trim(),D=s.getShaderInfoLog(L).trim(),k=s.getShaderInfoLog(A).trim();let X=!0,V=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,L,A);else{const Y=ec(s,L,"vertex"),W=ec(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+O+`
`+Y+`
`+W)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(D===""||k==="")&&(V=!1);V&&(w.diagnostics={runnable:X,programLog:O,vertexShader:{log:D,prefix:m},fragmentShader:{log:k,prefix:p}})}s.deleteShader(L),s.deleteShader(A),C=new Cr(s,g),y=I0(s,g)}let C;this.getUniforms=function(){return C===void 0&&R(this),C};let y;this.getAttributes=function(){return y===void 0&&R(this),y};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(g,E0)),_},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=T0++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=L,this.fragmentShader=A,this}let X0=0;class q0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Y0(t),e.set(t,n)),n}}class Y0{constructor(t){this.id=X0++,this.code=t,this.usedTimes=0}}function $0(i,t,e,n,s,r,a){const o=new ch,l=new q0,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,_,w,O,D){const k=O.fog,X=D.geometry,V=y.isMeshStandardMaterial?O.environment:null,Y=(y.isMeshStandardMaterial?e:t).get(y.envMap||V),W=Y&&Y.mapping===Hr?Y.image.height:null,Q=v[y.type];y.precision!==null&&(d=s.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const nt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,mt=nt!==void 0?nt.length:0;let Ct=0;X.morphAttributes.position!==void 0&&(Ct=1),X.morphAttributes.normal!==void 0&&(Ct=2),X.morphAttributes.color!==void 0&&(Ct=3);let Kt,$,tt,_t;if(Q){const te=pn[Q];Kt=te.vertexShader,$=te.fragmentShader}else Kt=y.vertexShader,$=y.fragmentShader,l.update(y),tt=l.getVertexShaderID(y),_t=l.getFragmentShaderID(y);const lt=i.getRenderTarget(),Pt=i.state.buffers.depth.getReversed(),Ut=D.isInstancedMesh===!0,zt=D.isBatchedMesh===!0,fe=!!y.map,Yt=!!y.matcap,me=!!Y,F=!!y.aoMap,Ke=!!y.lightMap,Vt=!!y.bumpMap,Wt=!!y.normalMap,wt=!!y.displacementMap,le=!!y.emissiveMap,At=!!y.metalnessMap,T=!!y.roughnessMap,b=y.anisotropy>0,B=y.clearcoat>0,j=y.dispersion>0,Z=y.iridescence>0,K=y.sheen>0,bt=y.transmission>0,ct=b&&!!y.anisotropyMap,pt=B&&!!y.clearcoatMap,$t=B&&!!y.clearcoatNormalMap,it=B&&!!y.clearcoatRoughnessMap,gt=Z&&!!y.iridescenceMap,Rt=Z&&!!y.iridescenceThicknessMap,Dt=K&&!!y.sheenColorMap,vt=K&&!!y.sheenRoughnessMap,Xt=!!y.specularMap,kt=!!y.specularColorMap,re=!!y.specularIntensityMap,I=bt&&!!y.transmissionMap,ot=bt&&!!y.thicknessMap,q=!!y.gradientMap,J=!!y.alphaMap,ft=y.alphaTest>0,ht=!!y.alphaHash,Nt=!!y.extensions;let pe=$n;y.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(pe=i.toneMapping);const Ce={shaderID:Q,shaderType:y.type,shaderName:y.name,vertexShader:Kt,fragmentShader:$,defines:y.defines,customVertexShaderID:tt,customFragmentShaderID:_t,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:zt,batchingColor:zt&&D._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&D.instanceColor!==null,instancingMorph:Ut&&D.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:lt===null?i.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:os,alphaToCoverage:!!y.alphaToCoverage,map:fe,matcap:Yt,envMap:me,envMapMode:me&&Y.mapping,envMapCubeUVHeight:W,aoMap:F,lightMap:Ke,bumpMap:Vt,normalMap:Wt,displacementMap:f&&wt,emissiveMap:le,normalMapObjectSpace:Wt&&y.normalMapType===nf,normalMapTangentSpace:Wt&&y.normalMapType===ih,metalnessMap:At,roughnessMap:T,anisotropy:b,anisotropyMap:ct,clearcoat:B,clearcoatMap:pt,clearcoatNormalMap:$t,clearcoatRoughnessMap:it,dispersion:j,iridescence:Z,iridescenceMap:gt,iridescenceThicknessMap:Rt,sheen:K,sheenColorMap:Dt,sheenRoughnessMap:vt,specularMap:Xt,specularColorMap:kt,specularIntensityMap:re,transmission:bt,transmissionMap:I,thicknessMap:ot,gradientMap:q,opaque:y.transparent===!1&&y.blending===di&&y.alphaToCoverage===!1,alphaMap:J,alphaTest:ft,alphaHash:ht,combine:y.combine,mapUv:fe&&g(y.map.channel),aoMapUv:F&&g(y.aoMap.channel),lightMapUv:Ke&&g(y.lightMap.channel),bumpMapUv:Vt&&g(y.bumpMap.channel),normalMapUv:Wt&&g(y.normalMap.channel),displacementMapUv:wt&&g(y.displacementMap.channel),emissiveMapUv:le&&g(y.emissiveMap.channel),metalnessMapUv:At&&g(y.metalnessMap.channel),roughnessMapUv:T&&g(y.roughnessMap.channel),anisotropyMapUv:ct&&g(y.anisotropyMap.channel),clearcoatMapUv:pt&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:$t&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:Rt&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:Dt&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:vt&&g(y.sheenRoughnessMap.channel),specularMapUv:Xt&&g(y.specularMap.channel),specularColorMapUv:kt&&g(y.specularColorMap.channel),specularIntensityMapUv:re&&g(y.specularIntensityMap.channel),transmissionMapUv:I&&g(y.transmissionMap.channel),thicknessMapUv:ot&&g(y.thicknessMap.channel),alphaMapUv:J&&g(y.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Wt||b),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!X.attributes.uv&&(fe||J),fog:!!k,useFog:y.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Pt,skinning:D.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:mt,morphTextureStride:Ct,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&w.length>0,shadowMapType:i.shadowMap.type,toneMapping:pe,decodeVideoTexture:fe&&y.map.isVideoTexture===!0&&qt.getTransfer(y.map.colorSpace)===ee,decodeVideoTextureEmissive:le&&y.emissiveMap.isVideoTexture===!0&&qt.getTransfer(y.emissiveMap.colorSpace)===ee,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ve,flipSided:y.side===Oe,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Nt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Nt&&y.extensions.multiDraw===!0||zt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ce.vertexUv1s=c.has(1),Ce.vertexUv2s=c.has(2),Ce.vertexUv3s=c.has(3),c.clear(),Ce}function p(y){const _=[];if(y.shaderID?_.push(y.shaderID):(_.push(y.customVertexShaderID),_.push(y.customFragmentShaderID)),y.defines!==void 0)for(const w in y.defines)_.push(w),_.push(y.defines[w]);return y.isRawShaderMaterial===!1&&(x(_,y),M(_,y),_.push(i.outputColorSpace)),_.push(y.customProgramCacheKey),_.join()}function x(y,_){y.push(_.precision),y.push(_.outputColorSpace),y.push(_.envMapMode),y.push(_.envMapCubeUVHeight),y.push(_.mapUv),y.push(_.alphaMapUv),y.push(_.lightMapUv),y.push(_.aoMapUv),y.push(_.bumpMapUv),y.push(_.normalMapUv),y.push(_.displacementMapUv),y.push(_.emissiveMapUv),y.push(_.metalnessMapUv),y.push(_.roughnessMapUv),y.push(_.anisotropyMapUv),y.push(_.clearcoatMapUv),y.push(_.clearcoatNormalMapUv),y.push(_.clearcoatRoughnessMapUv),y.push(_.iridescenceMapUv),y.push(_.iridescenceThicknessMapUv),y.push(_.sheenColorMapUv),y.push(_.sheenRoughnessMapUv),y.push(_.specularMapUv),y.push(_.specularColorMapUv),y.push(_.specularIntensityMapUv),y.push(_.transmissionMapUv),y.push(_.thicknessMapUv),y.push(_.combine),y.push(_.fogExp2),y.push(_.sizeAttenuation),y.push(_.morphTargetsCount),y.push(_.morphAttributeCount),y.push(_.numDirLights),y.push(_.numPointLights),y.push(_.numSpotLights),y.push(_.numSpotLightMaps),y.push(_.numHemiLights),y.push(_.numRectAreaLights),y.push(_.numDirLightShadows),y.push(_.numPointLightShadows),y.push(_.numSpotLightShadows),y.push(_.numSpotLightShadowsWithMaps),y.push(_.numLightProbes),y.push(_.shadowMapType),y.push(_.toneMapping),y.push(_.numClippingPlanes),y.push(_.numClipIntersection),y.push(_.depthPacking)}function M(y,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),y.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reverseDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),y.push(o.mask)}function S(y){const _=v[y.type];let w;if(_){const O=pn[_];w=Ns.clone(O.uniforms)}else w=y.uniforms;return w}function L(y,_){let w;for(let O=0,D=h.length;O<D;O++){const k=h[O];if(k.cacheKey===_){w=k,++w.usedTimes;break}}return w===void 0&&(w=new W0(i,_,y,r),h.push(w)),w}function A(y){if(--y.usedTimes===0){const _=h.indexOf(y);h[_]=h[h.length-1],h.pop(),y.destroy()}}function R(y){l.remove(y)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:L,releaseProgram:A,releaseShaderCache:R,programs:h,dispose:C}}function K0(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function j0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function ac(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function oc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,f,d,v,g,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:v,renderOrder:u.renderOrder,z:g,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=v,p.renderOrder=u.renderOrder,p.z=g,p.group=m),t++,p}function o(u,f,d,v,g,m){const p=a(u,f,d,v,g,m);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function l(u,f,d,v,g,m){const p=a(u,f,d,v,g,m);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||j0),n.length>1&&n.sort(f||ac),s.length>1&&s.sort(f||ac)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function J0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new oc,i.set(n,[a])):s>=r.length?(a=new oc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Z0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Tt};break;case"SpotLight":e={position:new P,direction:new P,color:new Tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Tt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Tt,groundColor:new Tt};break;case"RectAreaLight":e={color:new Tt,position:new P,halfWidth:new P,halfHeight:new P};break}return i[t.id]=e,e}}}function Q0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let tg=0;function eg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function ng(i){const t=new Z0,e=Q0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);const s=new P,r=new Ht,a=new Ht;function o(c){let h=0,u=0,f=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let d=0,v=0,g=0,m=0,p=0,x=0,M=0,S=0,L=0,A=0,R=0;c.sort(eg);for(let y=0,_=c.length;y<_;y++){const w=c[y],O=w.color,D=w.intensity,k=w.distance,X=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)h+=O.r*D,u+=O.g*D,f+=O.b*D;else if(w.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(w.sh.coefficients[V],D);R++}else if(w.isDirectionalLight){const V=t.get(w);if(V.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const Y=w.shadow,W=e.get(w);W.shadowIntensity=Y.intensity,W.shadowBias=Y.bias,W.shadowNormalBias=Y.normalBias,W.shadowRadius=Y.radius,W.shadowMapSize=Y.mapSize,n.directionalShadow[d]=W,n.directionalShadowMap[d]=X,n.directionalShadowMatrix[d]=w.shadow.matrix,x++}n.directional[d]=V,d++}else if(w.isSpotLight){const V=t.get(w);V.position.setFromMatrixPosition(w.matrixWorld),V.color.copy(O).multiplyScalar(D),V.distance=k,V.coneCos=Math.cos(w.angle),V.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),V.decay=w.decay,n.spot[g]=V;const Y=w.shadow;if(w.map&&(n.spotLightMap[L]=w.map,L++,Y.updateMatrices(w),w.castShadow&&A++),n.spotLightMatrix[g]=Y.matrix,w.castShadow){const W=e.get(w);W.shadowIntensity=Y.intensity,W.shadowBias=Y.bias,W.shadowNormalBias=Y.normalBias,W.shadowRadius=Y.radius,W.shadowMapSize=Y.mapSize,n.spotShadow[g]=W,n.spotShadowMap[g]=X,S++}g++}else if(w.isRectAreaLight){const V=t.get(w);V.color.copy(O).multiplyScalar(D),V.halfWidth.set(w.width*.5,0,0),V.halfHeight.set(0,w.height*.5,0),n.rectArea[m]=V,m++}else if(w.isPointLight){const V=t.get(w);if(V.color.copy(w.color).multiplyScalar(w.intensity),V.distance=w.distance,V.decay=w.decay,w.castShadow){const Y=w.shadow,W=e.get(w);W.shadowIntensity=Y.intensity,W.shadowBias=Y.bias,W.shadowNormalBias=Y.normalBias,W.shadowRadius=Y.radius,W.shadowMapSize=Y.mapSize,W.shadowCameraNear=Y.camera.near,W.shadowCameraFar=Y.camera.far,n.pointShadow[v]=W,n.pointShadowMap[v]=X,n.pointShadowMatrix[v]=w.shadow.matrix,M++}n.point[v]=V,v++}else if(w.isHemisphereLight){const V=t.get(w);V.skyColor.copy(w.color).multiplyScalar(D),V.groundColor.copy(w.groundColor).multiplyScalar(D),n.hemi[p]=V,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=at.LTC_FLOAT_1,n.rectAreaLTC2=at.LTC_FLOAT_2):(n.rectAreaLTC1=at.LTC_HALF_1,n.rectAreaLTC2=at.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const C=n.hash;(C.directionalLength!==d||C.pointLength!==v||C.spotLength!==g||C.rectAreaLength!==m||C.hemiLength!==p||C.numDirectionalShadows!==x||C.numPointShadows!==M||C.numSpotShadows!==S||C.numSpotMaps!==L||C.numLightProbes!==R)&&(n.directional.length=d,n.spot.length=g,n.rectArea.length=m,n.point.length=v,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=S+L-A,n.spotLightMap.length=L,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,C.directionalLength=d,C.pointLength=v,C.spotLength=g,C.rectAreaLength=m,C.hemiLength=p,C.numDirectionalShadows=x,C.numPointShadows=M,C.numSpotShadows=S,C.numSpotMaps=L,C.numLightProbes=R,n.version=tg++)}function l(c,h){let u=0,f=0,d=0,v=0,g=0;const m=h.matrixWorldInverse;for(let p=0,x=c.length;p<x;p++){const M=c[p];if(M.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),u++}else if(M.isSpotLight){const S=n.spot[d];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const S=n.rectArea[v];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),S.halfWidth.set(M.width*.5,0,0),S.halfHeight.set(0,M.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),v++}else if(M.isPointLight){const S=n.point[f];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const S=n.hemi[g];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:n}}function lc(i){const t=new ng(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function ig(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new lc(i),t.set(s,[o])):r>=a.length?(o=new lc(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class sg extends Mi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=tf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class rg extends Mi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const ag=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,og=`uniform sampler2D shadow_pass;
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
}`;function lg(i,t,e){let n=new Wo;const s=new rt,r=new rt,a=new se,o=new sg({depthPacking:ef}),l=new rg,c={},h=e.maxTextureSize,u={[Zn]:Oe,[Oe]:Zn,[Ve]:Ve},f=new de({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:ag,fragmentShader:og}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const v=new Re;v.setAttribute("position",new Ie(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new dt(v,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=No;let p=this.type;this.render=function(A,R,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const y=i.getRenderTarget(),_=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),O=i.state;O.setBlending(In),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const D=p!==Pn&&this.type===Pn,k=p===Pn&&this.type!==Pn;for(let X=0,V=A.length;X<V;X++){const Y=A[X],W=Y.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const Q=W.getFrameExtents();if(s.multiply(Q),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,W.mapSize.y=r.y)),W.map===null||D===!0||k===!0){const mt=this.type!==Pn?{minFilter:ke,magFilter:ke}:{};W.map!==null&&W.map.dispose(),W.map=new nn(s.x,s.y,mt),W.map.texture.name=Y.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const nt=W.getViewportCount();for(let mt=0;mt<nt;mt++){const Ct=W.getViewport(mt);a.set(r.x*Ct.x,r.y*Ct.y,r.x*Ct.z,r.y*Ct.w),O.viewport(a),W.updateMatrices(Y,mt),n=W.getFrustum(),S(R,C,W.camera,Y,this.type)}W.isPointLightShadow!==!0&&this.type===Pn&&x(W,C),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(y,_,w)};function x(A,R){const C=t.update(g);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,d.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new nn(s.x,s.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(R,null,C,f,g,null),d.uniforms.shadow_pass.value=A.mapPass.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(R,null,C,d,g,null)}function M(A,R,C,y){let _=null;const w=C.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(w!==void 0)_=w;else if(_=C.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const O=_.uuid,D=R.uuid;let k=c[O];k===void 0&&(k={},c[O]=k);let X=k[D];X===void 0&&(X=_.clone(),k[D]=X,R.addEventListener("dispose",L)),_=X}if(_.visible=R.visible,_.wireframe=R.wireframe,y===Pn?_.side=R.shadowSide!==null?R.shadowSide:R.side:_.side=R.shadowSide!==null?R.shadowSide:u[R.side],_.alphaMap=R.alphaMap,_.alphaTest=R.alphaTest,_.map=R.map,_.clipShadows=R.clipShadows,_.clippingPlanes=R.clippingPlanes,_.clipIntersection=R.clipIntersection,_.displacementMap=R.displacementMap,_.displacementScale=R.displacementScale,_.displacementBias=R.displacementBias,_.wireframeLinewidth=R.wireframeLinewidth,_.linewidth=R.linewidth,C.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const O=i.properties.get(_);O.light=C}return _}function S(A,R,C,y,_){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&_===Pn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,A.matrixWorld);const D=t.update(A),k=A.material;if(Array.isArray(k)){const X=D.groups;for(let V=0,Y=X.length;V<Y;V++){const W=X[V],Q=k[W.materialIndex];if(Q&&Q.visible){const nt=M(A,Q,y,_);A.onBeforeShadow(i,A,R,C,D,nt,W),i.renderBufferDirect(C,null,D,nt,A,W),A.onAfterShadow(i,A,R,C,D,nt,W)}}}else if(k.visible){const X=M(A,k,y,_);A.onBeforeShadow(i,A,R,C,D,X,null),i.renderBufferDirect(C,null,D,X,A,null),A.onAfterShadow(i,A,R,C,D,X,null)}}const O=A.children;for(let D=0,k=O.length;D<k;D++)S(O[D],R,C,y,_)}function L(A){A.target.removeEventListener("dispose",L);for(const C in c){const y=c[C],_=A.target.uuid;_ in y&&(y[_].dispose(),delete y[_])}}}const cg={[Ga]:Va,[Wa]:Ya,[Xa]:$a,[Zi]:qa,[Va]:Ga,[Ya]:Wa,[$a]:Xa,[qa]:Zi};function hg(i,t){function e(){let I=!1;const ot=new se;let q=null;const J=new se(0,0,0,0);return{setMask:function(ft){q!==ft&&!I&&(i.colorMask(ft,ft,ft,ft),q=ft)},setLocked:function(ft){I=ft},setClear:function(ft,ht,Nt,pe,Ce){Ce===!0&&(ft*=pe,ht*=pe,Nt*=pe),ot.set(ft,ht,Nt,pe),J.equals(ot)===!1&&(i.clearColor(ft,ht,Nt,pe),J.copy(ot))},reset:function(){I=!1,q=null,J.set(-1,0,0,0)}}}function n(){let I=!1,ot=!1,q=null,J=null,ft=null;return{setReversed:function(ht){if(ot!==ht){const Nt=t.get("EXT_clip_control");ot?Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.ZERO_TO_ONE_EXT):Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.NEGATIVE_ONE_TO_ONE_EXT);const pe=ft;ft=null,this.setClear(pe)}ot=ht},getReversed:function(){return ot},setTest:function(ht){ht?lt(i.DEPTH_TEST):Pt(i.DEPTH_TEST)},setMask:function(ht){q!==ht&&!I&&(i.depthMask(ht),q=ht)},setFunc:function(ht){if(ot&&(ht=cg[ht]),J!==ht){switch(ht){case Ga:i.depthFunc(i.NEVER);break;case Va:i.depthFunc(i.ALWAYS);break;case Wa:i.depthFunc(i.LESS);break;case Zi:i.depthFunc(i.LEQUAL);break;case Xa:i.depthFunc(i.EQUAL);break;case qa:i.depthFunc(i.GEQUAL);break;case Ya:i.depthFunc(i.GREATER);break;case $a:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}J=ht}},setLocked:function(ht){I=ht},setClear:function(ht){ft!==ht&&(ot&&(ht=1-ht),i.clearDepth(ht),ft=ht)},reset:function(){I=!1,q=null,J=null,ft=null,ot=!1}}}function s(){let I=!1,ot=null,q=null,J=null,ft=null,ht=null,Nt=null,pe=null,Ce=null;return{setTest:function(te){I||(te?lt(i.STENCIL_TEST):Pt(i.STENCIL_TEST))},setMask:function(te){ot!==te&&!I&&(i.stencilMask(te),ot=te)},setFunc:function(te,sn,bn){(q!==te||J!==sn||ft!==bn)&&(i.stencilFunc(te,sn,bn),q=te,J=sn,ft=bn)},setOp:function(te,sn,bn){(ht!==te||Nt!==sn||pe!==bn)&&(i.stencilOp(te,sn,bn),ht=te,Nt=sn,pe=bn)},setLocked:function(te){I=te},setClear:function(te){Ce!==te&&(i.clearStencil(te),Ce=te)},reset:function(){I=!1,ot=null,q=null,J=null,ft=null,ht=null,Nt=null,pe=null,Ce=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],v=null,g=!1,m=null,p=null,x=null,M=null,S=null,L=null,A=null,R=new Tt(0,0,0),C=0,y=!1,_=null,w=null,O=null,D=null,k=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,Y=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(W)[1]),V=Y>=1):W.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),V=Y>=2);let Q=null,nt={};const mt=i.getParameter(i.SCISSOR_BOX),Ct=i.getParameter(i.VIEWPORT),Kt=new se().fromArray(mt),$=new se().fromArray(Ct);function tt(I,ot,q,J){const ft=new Uint8Array(4),ht=i.createTexture();i.bindTexture(I,ht),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Nt=0;Nt<q;Nt++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(ot,0,i.RGBA,1,1,J,0,i.RGBA,i.UNSIGNED_BYTE,ft):i.texImage2D(ot+Nt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ft);return ht}const _t={};_t[i.TEXTURE_2D]=tt(i.TEXTURE_2D,i.TEXTURE_2D,1),_t[i.TEXTURE_CUBE_MAP]=tt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),_t[i.TEXTURE_2D_ARRAY]=tt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),_t[i.TEXTURE_3D]=tt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),lt(i.DEPTH_TEST),a.setFunc(Zi),Vt(!1),Wt(pl),lt(i.CULL_FACE),F(In);function lt(I){h[I]!==!0&&(i.enable(I),h[I]=!0)}function Pt(I){h[I]!==!1&&(i.disable(I),h[I]=!1)}function Ut(I,ot){return u[I]!==ot?(i.bindFramebuffer(I,ot),u[I]=ot,I===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ot),I===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ot),!0):!1}function zt(I,ot){let q=d,J=!1;if(I){q=f.get(ot),q===void 0&&(q=[],f.set(ot,q));const ft=I.textures;if(q.length!==ft.length||q[0]!==i.COLOR_ATTACHMENT0){for(let ht=0,Nt=ft.length;ht<Nt;ht++)q[ht]=i.COLOR_ATTACHMENT0+ht;q.length=ft.length,J=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,J=!0);J&&i.drawBuffers(q)}function fe(I){return v!==I?(i.useProgram(I),v=I,!0):!1}const Yt={[ci]:i.FUNC_ADD,[Iu]:i.FUNC_SUBTRACT,[Uu]:i.FUNC_REVERSE_SUBTRACT};Yt[Nu]=i.MIN,Yt[Fu]=i.MAX;const me={[Ou]:i.ZERO,[ku]:i.ONE,[Bu]:i.SRC_COLOR,[za]:i.SRC_ALPHA,[Xu]:i.SRC_ALPHA_SATURATE,[Vu]:i.DST_COLOR,[Hu]:i.DST_ALPHA,[zu]:i.ONE_MINUS_SRC_COLOR,[Ha]:i.ONE_MINUS_SRC_ALPHA,[Wu]:i.ONE_MINUS_DST_COLOR,[Gu]:i.ONE_MINUS_DST_ALPHA,[qu]:i.CONSTANT_COLOR,[Yu]:i.ONE_MINUS_CONSTANT_COLOR,[$u]:i.CONSTANT_ALPHA,[Ku]:i.ONE_MINUS_CONSTANT_ALPHA};function F(I,ot,q,J,ft,ht,Nt,pe,Ce,te){if(I===In){g===!0&&(Pt(i.BLEND),g=!1);return}if(g===!1&&(lt(i.BLEND),g=!0),I!==Du){if(I!==m||te!==y){if((p!==ci||S!==ci)&&(i.blendEquation(i.FUNC_ADD),p=ci,S=ci),te)switch(I){case di:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _n:i.blendFunc(i.ONE,i.ONE);break;case ml:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case gl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case di:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _n:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ml:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case gl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}x=null,M=null,L=null,A=null,R.set(0,0,0),C=0,m=I,y=te}return}ft=ft||ot,ht=ht||q,Nt=Nt||J,(ot!==p||ft!==S)&&(i.blendEquationSeparate(Yt[ot],Yt[ft]),p=ot,S=ft),(q!==x||J!==M||ht!==L||Nt!==A)&&(i.blendFuncSeparate(me[q],me[J],me[ht],me[Nt]),x=q,M=J,L=ht,A=Nt),(pe.equals(R)===!1||Ce!==C)&&(i.blendColor(pe.r,pe.g,pe.b,Ce),R.copy(pe),C=Ce),m=I,y=!1}function Ke(I,ot){I.side===Ve?Pt(i.CULL_FACE):lt(i.CULL_FACE);let q=I.side===Oe;ot&&(q=!q),Vt(q),I.blending===di&&I.transparent===!1?F(In):F(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const J=I.stencilWrite;o.setTest(J),J&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),le(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?lt(i.SAMPLE_ALPHA_TO_COVERAGE):Pt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Vt(I){_!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),_=I)}function Wt(I){I!==Pu?(lt(i.CULL_FACE),I!==w&&(I===pl?i.cullFace(i.BACK):I===Lu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Pt(i.CULL_FACE),w=I}function wt(I){I!==O&&(V&&i.lineWidth(I),O=I)}function le(I,ot,q){I?(lt(i.POLYGON_OFFSET_FILL),(D!==ot||k!==q)&&(i.polygonOffset(ot,q),D=ot,k=q)):Pt(i.POLYGON_OFFSET_FILL)}function At(I){I?lt(i.SCISSOR_TEST):Pt(i.SCISSOR_TEST)}function T(I){I===void 0&&(I=i.TEXTURE0+X-1),Q!==I&&(i.activeTexture(I),Q=I)}function b(I,ot,q){q===void 0&&(Q===null?q=i.TEXTURE0+X-1:q=Q);let J=nt[q];J===void 0&&(J={type:void 0,texture:void 0},nt[q]=J),(J.type!==I||J.texture!==ot)&&(Q!==q&&(i.activeTexture(q),Q=q),i.bindTexture(I,ot||_t[I]),J.type=I,J.texture=ot)}function B(){const I=nt[Q];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Z(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function bt(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ct(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function $t(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function it(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function gt(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Rt(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Dt(I){Kt.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),Kt.copy(I))}function vt(I){$.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),$.copy(I))}function Xt(I,ot){let q=c.get(ot);q===void 0&&(q=new WeakMap,c.set(ot,q));let J=q.get(I);J===void 0&&(J=i.getUniformBlockIndex(ot,I.name),q.set(I,J))}function kt(I,ot){const J=c.get(ot).get(I);l.get(ot)!==J&&(i.uniformBlockBinding(ot,J,I.__bindingPointIndex),l.set(ot,J))}function re(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Q=null,nt={},u={},f=new WeakMap,d=[],v=null,g=!1,m=null,p=null,x=null,M=null,S=null,L=null,A=null,R=new Tt(0,0,0),C=0,y=!1,_=null,w=null,O=null,D=null,k=null,Kt.set(0,0,i.canvas.width,i.canvas.height),$.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:lt,disable:Pt,bindFramebuffer:Ut,drawBuffers:zt,useProgram:fe,setBlending:F,setMaterial:Ke,setFlipSided:Vt,setCullFace:Wt,setLineWidth:wt,setPolygonOffset:le,setScissorTest:At,activeTexture:T,bindTexture:b,unbindTexture:B,compressedTexImage2D:j,compressedTexImage3D:Z,texImage2D:gt,texImage3D:Rt,updateUBOMapping:Xt,uniformBlockBinding:kt,texStorage2D:$t,texStorage3D:it,texSubImage2D:K,texSubImage3D:bt,compressedTexSubImage2D:ct,compressedTexSubImage3D:pt,scissor:Dt,viewport:vt,reset:re}}function cc(i,t,e,n){const s=ug(n);switch(e){case Jc:return i*t;case Qc:return i*t;case th:return i*t*2;case zo:return i*t/s.components*s.byteLength;case Ho:return i*t/s.components*s.byteLength;case eh:return i*t*2/s.components*s.byteLength;case Go:return i*t*2/s.components*s.byteLength;case Zc:return i*t*3/s.components*s.byteLength;case $e:return i*t*4/s.components*s.byteLength;case Vo:return i*t*4/s.components*s.byteLength;case Er:case Tr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ar:case wr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Qa:case eo:return Math.max(i,16)*Math.max(t,8)/4;case Za:case to:return Math.max(i,8)*Math.max(t,8)/2;case no:case io:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case so:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ro:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ao:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case oo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case lo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case co:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ho:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case uo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case fo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case po:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case mo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case go:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case vo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case _o:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case xo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Rr:case yo:case Mo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case nh:case So:return Math.ceil(i/4)*Math.ceil(t/4)*8;case bo:case Eo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ug(i){switch(i){case hn:case $c:return{byteLength:1,components:1};case Us:case Kc:case yn:return{byteLength:2,components:1};case ko:case Bo:return{byteLength:2,components:4};case gi:case Oo:case xn:return{byteLength:4,components:1};case jc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function fg(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new rt,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(T,b){return d?new OffscreenCanvas(T,b):Ir("canvas")}function g(T,b,B){let j=1;const Z=At(T);if((Z.width>B||Z.height>B)&&(j=B/Math.max(Z.width,Z.height)),j<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const K=Math.floor(j*Z.width),bt=Math.floor(j*Z.height);u===void 0&&(u=v(K,bt));const ct=b?v(K,bt):u;return ct.width=K,ct.height=bt,ct.getContext("2d").drawImage(T,0,0,K,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+K+"x"+bt+")."),ct}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){i.generateMipmap(T)}function x(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(T,b,B,j,Z=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let K=b;if(b===i.RED&&(B===i.FLOAT&&(K=i.R32F),B===i.HALF_FLOAT&&(K=i.R16F),B===i.UNSIGNED_BYTE&&(K=i.R8)),b===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.R8UI),B===i.UNSIGNED_SHORT&&(K=i.R16UI),B===i.UNSIGNED_INT&&(K=i.R32UI),B===i.BYTE&&(K=i.R8I),B===i.SHORT&&(K=i.R16I),B===i.INT&&(K=i.R32I)),b===i.RG&&(B===i.FLOAT&&(K=i.RG32F),B===i.HALF_FLOAT&&(K=i.RG16F),B===i.UNSIGNED_BYTE&&(K=i.RG8)),b===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RG8UI),B===i.UNSIGNED_SHORT&&(K=i.RG16UI),B===i.UNSIGNED_INT&&(K=i.RG32UI),B===i.BYTE&&(K=i.RG8I),B===i.SHORT&&(K=i.RG16I),B===i.INT&&(K=i.RG32I)),b===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RGB8UI),B===i.UNSIGNED_SHORT&&(K=i.RGB16UI),B===i.UNSIGNED_INT&&(K=i.RGB32UI),B===i.BYTE&&(K=i.RGB8I),B===i.SHORT&&(K=i.RGB16I),B===i.INT&&(K=i.RGB32I)),b===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),B===i.UNSIGNED_INT&&(K=i.RGBA32UI),B===i.BYTE&&(K=i.RGBA8I),B===i.SHORT&&(K=i.RGBA16I),B===i.INT&&(K=i.RGBA32I)),b===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),b===i.RGBA){const bt=Z?Gr:qt.getTransfer(j);B===i.FLOAT&&(K=i.RGBA32F),B===i.HALF_FLOAT&&(K=i.RGBA16F),B===i.UNSIGNED_BYTE&&(K=bt===ee?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function S(T,b){let B;return T?b===null||b===gi||b===es?B=i.DEPTH24_STENCIL8:b===xn?B=i.DEPTH32F_STENCIL8:b===Us&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===gi||b===es?B=i.DEPTH_COMPONENT24:b===xn?B=i.DEPTH_COMPONENT32F:b===Us&&(B=i.DEPTH_COMPONENT16),B}function L(T,b){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==ke&&T.minFilter!==en?Math.log2(Math.max(b.width,b.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?b.mipmaps.length:1}function A(T){const b=T.target;b.removeEventListener("dispose",A),C(b),b.isVideoTexture&&h.delete(b)}function R(T){const b=T.target;b.removeEventListener("dispose",R),_(b)}function C(T){const b=n.get(T);if(b.__webglInit===void 0)return;const B=T.source,j=f.get(B);if(j){const Z=j[b.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&y(T),Object.keys(j).length===0&&f.delete(B)}n.remove(T)}function y(T){const b=n.get(T);i.deleteTexture(b.__webglTexture);const B=T.source,j=f.get(B);delete j[b.__cacheKey],a.memory.textures--}function _(T){const b=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(b.__webglFramebuffer[j]))for(let Z=0;Z<b.__webglFramebuffer[j].length;Z++)i.deleteFramebuffer(b.__webglFramebuffer[j][Z]);else i.deleteFramebuffer(b.__webglFramebuffer[j]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[j])}else{if(Array.isArray(b.__webglFramebuffer))for(let j=0;j<b.__webglFramebuffer.length;j++)i.deleteFramebuffer(b.__webglFramebuffer[j]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let j=0;j<b.__webglColorRenderbuffer.length;j++)b.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[j]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const B=T.textures;for(let j=0,Z=B.length;j<Z;j++){const K=n.get(B[j]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),a.memory.textures--),n.remove(B[j])}n.remove(T)}let w=0;function O(){w=0}function D(){const T=w;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),w+=1,T}function k(T){const b=[];return b.push(T.wrapS),b.push(T.wrapT),b.push(T.wrapR||0),b.push(T.magFilter),b.push(T.minFilter),b.push(T.anisotropy),b.push(T.internalFormat),b.push(T.format),b.push(T.type),b.push(T.generateMipmaps),b.push(T.premultiplyAlpha),b.push(T.flipY),b.push(T.unpackAlignment),b.push(T.colorSpace),b.join()}function X(T,b){const B=n.get(T);if(T.isVideoTexture&&wt(T),T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){const j=T.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(B,T,b);return}}e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+b)}function V(T,b){const B=n.get(T);if(T.version>0&&B.__version!==T.version){$(B,T,b);return}e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+b)}function Y(T,b){const B=n.get(T);if(T.version>0&&B.__version!==T.version){$(B,T,b);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+b)}function W(T,b){const B=n.get(T);if(T.version>0&&B.__version!==T.version){tt(B,T,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+b)}const Q={[Pr]:i.REPEAT,[Xn]:i.CLAMP_TO_EDGE,[Ja]:i.MIRRORED_REPEAT},nt={[ke]:i.NEAREST,[Qu]:i.NEAREST_MIPMAP_NEAREST,[Hs]:i.NEAREST_MIPMAP_LINEAR,[en]:i.LINEAR,[Jr]:i.LINEAR_MIPMAP_NEAREST,[ui]:i.LINEAR_MIPMAP_LINEAR},mt={[sf]:i.NEVER,[hf]:i.ALWAYS,[rf]:i.LESS,[sh]:i.LEQUAL,[af]:i.EQUAL,[cf]:i.GEQUAL,[of]:i.GREATER,[lf]:i.NOTEQUAL};function Ct(T,b){if(b.type===xn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===en||b.magFilter===Jr||b.magFilter===Hs||b.magFilter===ui||b.minFilter===en||b.minFilter===Jr||b.minFilter===Hs||b.minFilter===ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,Q[b.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,Q[b.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,Q[b.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,nt[b.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,nt[b.minFilter]),b.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,mt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===ke||b.minFilter!==Hs&&b.minFilter!==ui||b.type===xn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Kt(T,b){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,b.addEventListener("dispose",A));const j=b.source;let Z=f.get(j);Z===void 0&&(Z={},f.set(j,Z));const K=k(b);if(K!==T.__cacheKey){Z[K]===void 0&&(Z[K]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Z[K].usedTimes++;const bt=Z[T.__cacheKey];bt!==void 0&&(Z[T.__cacheKey].usedTimes--,bt.usedTimes===0&&y(b)),T.__cacheKey=K,T.__webglTexture=Z[K].texture}return B}function $(T,b,B){let j=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(j=i.TEXTURE_3D);const Z=Kt(T,b),K=b.source;e.bindTexture(j,T.__webglTexture,i.TEXTURE0+B);const bt=n.get(K);if(K.version!==bt.__version||Z===!0){e.activeTexture(i.TEXTURE0+B);const ct=qt.getPrimaries(qt.workingColorSpace),pt=b.colorSpace===Ln?null:qt.getPrimaries(b.colorSpace),$t=b.colorSpace===Ln||ct===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$t);let it=g(b.image,!1,s.maxTextureSize);it=le(b,it);const gt=r.convert(b.format,b.colorSpace),Rt=r.convert(b.type);let Dt=M(b.internalFormat,gt,Rt,b.colorSpace,b.isVideoTexture);Ct(j,b);let vt;const Xt=b.mipmaps,kt=b.isVideoTexture!==!0,re=bt.__version===void 0||Z===!0,I=K.dataReady,ot=L(b,it);if(b.isDepthTexture)Dt=S(b.format===ns,b.type),re&&(kt?e.texStorage2D(i.TEXTURE_2D,1,Dt,it.width,it.height):e.texImage2D(i.TEXTURE_2D,0,Dt,it.width,it.height,0,gt,Rt,null));else if(b.isDataTexture)if(Xt.length>0){kt&&re&&e.texStorage2D(i.TEXTURE_2D,ot,Dt,Xt[0].width,Xt[0].height);for(let q=0,J=Xt.length;q<J;q++)vt=Xt[q],kt?I&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,vt.width,vt.height,gt,Rt,vt.data):e.texImage2D(i.TEXTURE_2D,q,Dt,vt.width,vt.height,0,gt,Rt,vt.data);b.generateMipmaps=!1}else kt?(re&&e.texStorage2D(i.TEXTURE_2D,ot,Dt,it.width,it.height),I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,it.width,it.height,gt,Rt,it.data)):e.texImage2D(i.TEXTURE_2D,0,Dt,it.width,it.height,0,gt,Rt,it.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){kt&&re&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ot,Dt,Xt[0].width,Xt[0].height,it.depth);for(let q=0,J=Xt.length;q<J;q++)if(vt=Xt[q],b.format!==$e)if(gt!==null)if(kt){if(I)if(b.layerUpdates.size>0){const ft=cc(vt.width,vt.height,b.format,b.type);for(const ht of b.layerUpdates){const Nt=vt.data.subarray(ht*ft/vt.data.BYTES_PER_ELEMENT,(ht+1)*ft/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,ht,vt.width,vt.height,1,gt,Nt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,vt.width,vt.height,it.depth,gt,vt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Dt,vt.width,vt.height,it.depth,0,vt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else kt?I&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,vt.width,vt.height,it.depth,gt,Rt,vt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,Dt,vt.width,vt.height,it.depth,0,gt,Rt,vt.data)}else{kt&&re&&e.texStorage2D(i.TEXTURE_2D,ot,Dt,Xt[0].width,Xt[0].height);for(let q=0,J=Xt.length;q<J;q++)vt=Xt[q],b.format!==$e?gt!==null?kt?I&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,vt.width,vt.height,gt,vt.data):e.compressedTexImage2D(i.TEXTURE_2D,q,Dt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?I&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,vt.width,vt.height,gt,Rt,vt.data):e.texImage2D(i.TEXTURE_2D,q,Dt,vt.width,vt.height,0,gt,Rt,vt.data)}else if(b.isDataArrayTexture)if(kt){if(re&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ot,Dt,it.width,it.height,it.depth),I)if(b.layerUpdates.size>0){const q=cc(it.width,it.height,b.format,b.type);for(const J of b.layerUpdates){const ft=it.data.subarray(J*q/it.data.BYTES_PER_ELEMENT,(J+1)*q/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,it.width,it.height,1,gt,Rt,ft)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,gt,Rt,it.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Dt,it.width,it.height,it.depth,0,gt,Rt,it.data);else if(b.isData3DTexture)kt?(re&&e.texStorage3D(i.TEXTURE_3D,ot,Dt,it.width,it.height,it.depth),I&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,gt,Rt,it.data)):e.texImage3D(i.TEXTURE_3D,0,Dt,it.width,it.height,it.depth,0,gt,Rt,it.data);else if(b.isFramebufferTexture){if(re)if(kt)e.texStorage2D(i.TEXTURE_2D,ot,Dt,it.width,it.height);else{let q=it.width,J=it.height;for(let ft=0;ft<ot;ft++)e.texImage2D(i.TEXTURE_2D,ft,Dt,q,J,0,gt,Rt,null),q>>=1,J>>=1}}else if(Xt.length>0){if(kt&&re){const q=At(Xt[0]);e.texStorage2D(i.TEXTURE_2D,ot,Dt,q.width,q.height)}for(let q=0,J=Xt.length;q<J;q++)vt=Xt[q],kt?I&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,gt,Rt,vt):e.texImage2D(i.TEXTURE_2D,q,Dt,gt,Rt,vt);b.generateMipmaps=!1}else if(kt){if(re){const q=At(it);e.texStorage2D(i.TEXTURE_2D,ot,Dt,q.width,q.height)}I&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt,Rt,it)}else e.texImage2D(i.TEXTURE_2D,0,Dt,gt,Rt,it);m(b)&&p(j),bt.__version=K.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function tt(T,b,B){if(b.image.length!==6)return;const j=Kt(T,b),Z=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);const K=n.get(Z);if(Z.version!==K.__version||j===!0){e.activeTexture(i.TEXTURE0+B);const bt=qt.getPrimaries(qt.workingColorSpace),ct=b.colorSpace===Ln?null:qt.getPrimaries(b.colorSpace),pt=b.colorSpace===Ln||bt===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const $t=b.isCompressedTexture||b.image[0].isCompressedTexture,it=b.image[0]&&b.image[0].isDataTexture,gt=[];for(let J=0;J<6;J++)!$t&&!it?gt[J]=g(b.image[J],!0,s.maxCubemapSize):gt[J]=it?b.image[J].image:b.image[J],gt[J]=le(b,gt[J]);const Rt=gt[0],Dt=r.convert(b.format,b.colorSpace),vt=r.convert(b.type),Xt=M(b.internalFormat,Dt,vt,b.colorSpace),kt=b.isVideoTexture!==!0,re=K.__version===void 0||j===!0,I=Z.dataReady;let ot=L(b,Rt);Ct(i.TEXTURE_CUBE_MAP,b);let q;if($t){kt&&re&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ot,Xt,Rt.width,Rt.height);for(let J=0;J<6;J++){q=gt[J].mipmaps;for(let ft=0;ft<q.length;ft++){const ht=q[ft];b.format!==$e?Dt!==null?kt?I&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ft,0,0,ht.width,ht.height,Dt,ht.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ft,Xt,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):kt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ft,0,0,ht.width,ht.height,Dt,vt,ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ft,Xt,ht.width,ht.height,0,Dt,vt,ht.data)}}}else{if(q=b.mipmaps,kt&&re){q.length>0&&ot++;const J=At(gt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ot,Xt,J.width,J.height)}for(let J=0;J<6;J++)if(it){kt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,gt[J].width,gt[J].height,Dt,vt,gt[J].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Xt,gt[J].width,gt[J].height,0,Dt,vt,gt[J].data);for(let ft=0;ft<q.length;ft++){const Nt=q[ft].image[J].image;kt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ft+1,0,0,Nt.width,Nt.height,Dt,vt,Nt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ft+1,Xt,Nt.width,Nt.height,0,Dt,vt,Nt.data)}}else{kt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Dt,vt,gt[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Xt,Dt,vt,gt[J]);for(let ft=0;ft<q.length;ft++){const ht=q[ft];kt?I&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ft+1,0,0,Dt,vt,ht.image[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ft+1,Xt,Dt,vt,ht.image[J])}}}m(b)&&p(i.TEXTURE_CUBE_MAP),K.__version=Z.version,b.onUpdate&&b.onUpdate(b)}T.__version=b.version}function _t(T,b,B,j,Z,K){const bt=r.convert(B.format,B.colorSpace),ct=r.convert(B.type),pt=M(B.internalFormat,bt,ct,B.colorSpace),$t=n.get(b),it=n.get(B);if(it.__renderTarget=b,!$t.__hasExternalTextures){const gt=Math.max(1,b.width>>K),Rt=Math.max(1,b.height>>K);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?e.texImage3D(Z,K,pt,gt,Rt,b.depth,0,bt,ct,null):e.texImage2D(Z,K,pt,gt,Rt,0,bt,ct,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),Wt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,Z,it.__webglTexture,0,Vt(b)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,Z,it.__webglTexture,K),e.bindFramebuffer(i.FRAMEBUFFER,null)}function lt(T,b,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),b.depthBuffer){const j=b.depthTexture,Z=j&&j.isDepthTexture?j.type:null,K=S(b.stencilBuffer,Z),bt=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=Vt(b);Wt(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,K,b.width,b.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,K,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,K,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,bt,i.RENDERBUFFER,T)}else{const j=b.textures;for(let Z=0;Z<j.length;Z++){const K=j[Z],bt=r.convert(K.format,K.colorSpace),ct=r.convert(K.type),pt=M(K.internalFormat,bt,ct,K.colorSpace),$t=Vt(b);B&&Wt(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,$t,pt,b.width,b.height):Wt(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$t,pt,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,pt,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Pt(T,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=n.get(b.depthTexture);j.__renderTarget=b,(!j.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),X(b.depthTexture,0);const Z=j.__webglTexture,K=Vt(b);if(b.depthTexture.format===ji)Wt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(b.depthTexture.format===ns)Wt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Ut(T){const b=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==T.depthTexture){const j=T.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),j){const Z=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,j.removeEventListener("dispose",Z)};j.addEventListener("dispose",Z),b.__depthDisposeCallback=Z}b.__boundDepthTexture=j}if(T.depthTexture&&!b.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Pt(b.__webglFramebuffer,T)}else if(B){b.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[j]),b.__webglDepthbuffer[j]===void 0)b.__webglDepthbuffer[j]=i.createRenderbuffer(),lt(b.__webglDepthbuffer[j],T,!1);else{const Z=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=b.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,K)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),lt(b.__webglDepthbuffer,T,!1);else{const j=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,Z)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function zt(T,b,B){const j=n.get(T);b!==void 0&&_t(j.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Ut(T)}function fe(T){const b=T.texture,B=n.get(T),j=n.get(b);T.addEventListener("dispose",R);const Z=T.textures,K=T.isWebGLCubeRenderTarget===!0,bt=Z.length>1;if(bt||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=b.version,a.memory.textures++),K){B.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer[ct]=[];for(let pt=0;pt<b.mipmaps.length;pt++)B.__webglFramebuffer[ct][pt]=i.createFramebuffer()}else B.__webglFramebuffer[ct]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){B.__webglFramebuffer=[];for(let ct=0;ct<b.mipmaps.length;ct++)B.__webglFramebuffer[ct]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(bt)for(let ct=0,pt=Z.length;ct<pt;ct++){const $t=n.get(Z[ct]);$t.__webglTexture===void 0&&($t.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&Wt(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ct=0;ct<Z.length;ct++){const pt=Z[ct];B.__webglColorRenderbuffer[ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ct]);const $t=r.convert(pt.format,pt.colorSpace),it=r.convert(pt.type),gt=M(pt.internalFormat,$t,it,pt.colorSpace,T.isXRRenderTarget===!0),Rt=Vt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,gt,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,B.__webglColorRenderbuffer[ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),lt(B.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),Ct(i.TEXTURE_CUBE_MAP,b);for(let ct=0;ct<6;ct++)if(b.mipmaps&&b.mipmaps.length>0)for(let pt=0;pt<b.mipmaps.length;pt++)_t(B.__webglFramebuffer[ct][pt],T,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,pt);else _t(B.__webglFramebuffer[ct],T,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(b)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let ct=0,pt=Z.length;ct<pt;ct++){const $t=Z[ct],it=n.get($t);e.bindTexture(i.TEXTURE_2D,it.__webglTexture),Ct(i.TEXTURE_2D,$t),_t(B.__webglFramebuffer,T,$t,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,0),m($t)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let ct=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ct=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ct,j.__webglTexture),Ct(ct,b),b.mipmaps&&b.mipmaps.length>0)for(let pt=0;pt<b.mipmaps.length;pt++)_t(B.__webglFramebuffer[pt],T,b,i.COLOR_ATTACHMENT0,ct,pt);else _t(B.__webglFramebuffer,T,b,i.COLOR_ATTACHMENT0,ct,0);m(b)&&p(ct),e.unbindTexture()}T.depthBuffer&&Ut(T)}function Yt(T){const b=T.textures;for(let B=0,j=b.length;B<j;B++){const Z=b[B];if(m(Z)){const K=x(T),bt=n.get(Z).__webglTexture;e.bindTexture(K,bt),p(K),e.unbindTexture()}}}const me=[],F=[];function Ke(T){if(T.samples>0){if(Wt(T)===!1){const b=T.textures,B=T.width,j=T.height;let Z=i.COLOR_BUFFER_BIT;const K=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,bt=n.get(T),ct=b.length>1;if(ct)for(let pt=0;pt<b.length;pt++)e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let pt=0;pt<b.length;pt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),ct){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,bt.__webglColorRenderbuffer[pt]);const $t=n.get(b[pt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,$t,0)}i.blitFramebuffer(0,0,B,j,0,0,B,j,Z,i.NEAREST),l===!0&&(me.length=0,F.length=0,me.push(i.COLOR_ATTACHMENT0+pt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(me.push(K),F.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,me))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ct)for(let pt=0;pt<b.length;pt++){e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,bt.__webglColorRenderbuffer[pt]);const $t=n.get(b[pt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,bt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,$t,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const b=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function Vt(T){return Math.min(s.maxSamples,T.samples)}function Wt(T){const b=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function wt(T){const b=a.render.frame;h.get(T)!==b&&(h.set(T,b),T.update())}function le(T,b){const B=T.colorSpace,j=T.format,Z=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==os&&B!==Ln&&(qt.getTransfer(B)===ee?(j!==$e||Z!==hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),b}function At(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=D,this.resetTextureUnits=O,this.setTexture2D=X,this.setTexture2DArray=V,this.setTexture3D=Y,this.setTextureCube=W,this.rebindTextures=zt,this.setupRenderTarget=fe,this.updateRenderTargetMipmap=Yt,this.updateMultisampleRenderTarget=Ke,this.setupDepthRenderbuffer=Ut,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=Wt}function dg(i,t){function e(n,s=Ln){let r;const a=qt.getTransfer(s);if(n===hn)return i.UNSIGNED_BYTE;if(n===ko)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Bo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===jc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===$c)return i.BYTE;if(n===Kc)return i.SHORT;if(n===Us)return i.UNSIGNED_SHORT;if(n===Oo)return i.INT;if(n===gi)return i.UNSIGNED_INT;if(n===xn)return i.FLOAT;if(n===yn)return i.HALF_FLOAT;if(n===Jc)return i.ALPHA;if(n===Zc)return i.RGB;if(n===$e)return i.RGBA;if(n===Qc)return i.LUMINANCE;if(n===th)return i.LUMINANCE_ALPHA;if(n===ji)return i.DEPTH_COMPONENT;if(n===ns)return i.DEPTH_STENCIL;if(n===zo)return i.RED;if(n===Ho)return i.RED_INTEGER;if(n===eh)return i.RG;if(n===Go)return i.RG_INTEGER;if(n===Vo)return i.RGBA_INTEGER;if(n===Er||n===Tr||n===Ar||n===wr)if(a===ee)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Er)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Er)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Tr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ar)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Za||n===Qa||n===to||n===eo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Za)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Qa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===to)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===eo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===no||n===io||n===so)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===no||n===io)return a===ee?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===so)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ro||n===ao||n===oo||n===lo||n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===vo||n===_o||n===xo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ro)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ao)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===oo)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===lo)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===co)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ho)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===uo)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fo)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===po)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===mo)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===go)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===vo)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_o)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xo)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Rr||n===yo||n===Mo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Rr)return a===ee?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===yo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Mo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===nh||n===So||n===bo||n===Eo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Rr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===So)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===bo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Eo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===es?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class pg extends He{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ue extends _e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const mg={type:"move"};class Aa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ue,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ue,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ue,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const g of t.hand.values()){const m=e.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,v=.005;c.inputState.pinching&&f>d+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(mg)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ue;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const gg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,vg=`
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

}`;class _g{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ue,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new de({vertexShader:gg,fragmentShader:vg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new dt(new ze(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class xg extends ls{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,v=null;const g=new _g,m=e.getContextAttributes();let p=null,x=null;const M=[],S=[],L=new rt;let A=null;const R=new He;R.viewport=new se;const C=new He;C.viewport=new se;const y=[R,C],_=new pg;let w=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let tt=M[$];return tt===void 0&&(tt=new Aa,M[$]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function($){let tt=M[$];return tt===void 0&&(tt=new Aa,M[$]=tt),tt.getGripSpace()},this.getHand=function($){let tt=M[$];return tt===void 0&&(tt=new Aa,M[$]=tt),tt.getHandSpace()};function D($){const tt=S.indexOf($.inputSource);if(tt===-1)return;const _t=M[tt];_t!==void 0&&(_t.update($.inputSource,$.frame,c||a),_t.dispatchEvent({type:$.type,data:$.inputSource}))}function k(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",X);for(let $=0;$<M.length;$++){const tt=S[$];tt!==null&&(S[$]=null,M[$].disconnect(tt))}w=null,O=null,g.reset(),t.setRenderTarget(p),d=null,f=null,u=null,s=null,x=null,Kt.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",k),s.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){const tt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,tt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new nn(d.framebufferWidth,d.framebufferHeight,{format:$e,type:hn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let tt=null,_t=null,lt=null;m.depth&&(lt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=m.stencil?ns:ji,_t=m.stencil?es:gi);const Pt={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(Pt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new nn(f.textureWidth,f.textureHeight,{format:$e,type:hn,depthTexture:new _h(f.textureWidth,f.textureHeight,_t,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Kt.setContext(s),Kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function X($){for(let tt=0;tt<$.removed.length;tt++){const _t=$.removed[tt],lt=S.indexOf(_t);lt>=0&&(S[lt]=null,M[lt].disconnect(_t))}for(let tt=0;tt<$.added.length;tt++){const _t=$.added[tt];let lt=S.indexOf(_t);if(lt===-1){for(let Ut=0;Ut<M.length;Ut++)if(Ut>=S.length){S.push(_t),lt=Ut;break}else if(S[Ut]===null){S[Ut]=_t,lt=Ut;break}if(lt===-1)break}const Pt=M[lt];Pt&&Pt.connect(_t)}}const V=new P,Y=new P;function W($,tt,_t){V.setFromMatrixPosition(tt.matrixWorld),Y.setFromMatrixPosition(_t.matrixWorld);const lt=V.distanceTo(Y),Pt=tt.projectionMatrix.elements,Ut=_t.projectionMatrix.elements,zt=Pt[14]/(Pt[10]-1),fe=Pt[14]/(Pt[10]+1),Yt=(Pt[9]+1)/Pt[5],me=(Pt[9]-1)/Pt[5],F=(Pt[8]-1)/Pt[0],Ke=(Ut[8]+1)/Ut[0],Vt=zt*F,Wt=zt*Ke,wt=lt/(-F+Ke),le=wt*-F;if(tt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(le),$.translateZ(wt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Pt[10]===-1)$.projectionMatrix.copy(tt.projectionMatrix),$.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const At=zt+wt,T=fe+wt,b=Vt-le,B=Wt+(lt-le),j=Yt*fe/T*At,Z=me*fe/T*At;$.projectionMatrix.makePerspective(b,B,j,Z,At,T),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Q($,tt){tt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(tt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let tt=$.near,_t=$.far;g.texture!==null&&(g.depthNear>0&&(tt=g.depthNear),g.depthFar>0&&(_t=g.depthFar)),_.near=C.near=R.near=tt,_.far=C.far=R.far=_t,(w!==_.near||O!==_.far)&&(s.updateRenderState({depthNear:_.near,depthFar:_.far}),w=_.near,O=_.far),R.layers.mask=$.layers.mask|2,C.layers.mask=$.layers.mask|4,_.layers.mask=R.layers.mask|C.layers.mask;const lt=$.parent,Pt=_.cameras;Q(_,lt);for(let Ut=0;Ut<Pt.length;Ut++)Q(Pt[Ut],lt);Pt.length===2?W(_,R,C):_.projectionMatrix.copy(R.projectionMatrix),nt($,_,lt)};function nt($,tt,_t){_t===null?$.matrix.copy(tt.matrixWorld):($.matrix.copy(_t.matrixWorld),$.matrix.invert(),$.matrix.multiply(tt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(tt.projectionMatrix),$.projectionMatrixInverse.copy(tt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Dr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(_)};let mt=null;function Ct($,tt){if(h=tt.getViewerPose(c||a),v=tt,h!==null){const _t=h.views;d!==null&&(t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x));let lt=!1;_t.length!==_.cameras.length&&(_.cameras.length=0,lt=!0);for(let Ut=0;Ut<_t.length;Ut++){const zt=_t[Ut];let fe=null;if(d!==null)fe=d.getViewport(zt);else{const me=u.getViewSubImage(f,zt);fe=me.viewport,Ut===0&&(t.setRenderTargetTextures(x,me.colorTexture,f.ignoreDepthValues?void 0:me.depthStencilTexture),t.setRenderTarget(x))}let Yt=y[Ut];Yt===void 0&&(Yt=new He,Yt.layers.enable(Ut),Yt.viewport=new se,y[Ut]=Yt),Yt.matrix.fromArray(zt.transform.matrix),Yt.matrix.decompose(Yt.position,Yt.quaternion,Yt.scale),Yt.projectionMatrix.fromArray(zt.projectionMatrix),Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),Yt.viewport.set(fe.x,fe.y,fe.width,fe.height),Ut===0&&(_.matrix.copy(Yt.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),lt===!0&&_.cameras.push(Yt)}const Pt=s.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")){const Ut=u.getDepthInformation(_t[0]);Ut&&Ut.isValid&&Ut.texture&&g.init(t,Ut,s.renderState)}}for(let _t=0;_t<M.length;_t++){const lt=S[_t],Pt=M[_t];lt!==null&&Pt!==void 0&&Pt.update(lt,tt,c||a)}mt&&mt($,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),v=null}const Kt=new gh;Kt.setAnimationLoop(Ct),this.setAnimationLoop=function($){mt=$},this.dispose=function(){}}}const ri=new Mn,yg=new Ht;function Mg(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,dh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,x,M,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),v(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),g(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,x,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Oe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Oe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=t.get(p),M=x.envMap,S=x.envMapRotation;M&&(m.envMap.value=M,ri.copy(S),ri.x*=-1,ri.y*=-1,ri.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ri.y*=-1,ri.z*=-1),m.envMapRotation.value.setFromMatrix4(yg.makeRotationFromEuler(ri)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,x,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Oe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const x=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Sg(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,M){const S=M.program;n.uniformBlockBinding(x,S)}function c(x,M){let S=s[x.id];S===void 0&&(v(x),S=h(x),s[x.id]=S,x.addEventListener("dispose",m));const L=M.program;n.updateUBOMapping(x,L);const A=t.render.frame;r[x.id]!==A&&(f(x),r[x.id]=A)}function h(x){const M=u();x.__bindingPointIndex=M;const S=i.createBuffer(),L=x.__size,A=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,L,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,S),S}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const M=s[x.id],S=x.uniforms,L=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let A=0,R=S.length;A<R;A++){const C=Array.isArray(S[A])?S[A]:[S[A]];for(let y=0,_=C.length;y<_;y++){const w=C[y];if(d(w,A,y,L)===!0){const O=w.__offset,D=Array.isArray(w.value)?w.value:[w.value];let k=0;for(let X=0;X<D.length;X++){const V=D[X],Y=g(V);typeof V=="number"||typeof V=="boolean"?(w.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,O+k,w.__data)):V.isMatrix3?(w.__data[0]=V.elements[0],w.__data[1]=V.elements[1],w.__data[2]=V.elements[2],w.__data[3]=0,w.__data[4]=V.elements[3],w.__data[5]=V.elements[4],w.__data[6]=V.elements[5],w.__data[7]=0,w.__data[8]=V.elements[6],w.__data[9]=V.elements[7],w.__data[10]=V.elements[8],w.__data[11]=0):(V.toArray(w.__data,k),k+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,w.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(x,M,S,L){const A=x.value,R=M+"_"+S;if(L[R]===void 0)return typeof A=="number"||typeof A=="boolean"?L[R]=A:L[R]=A.clone(),!0;{const C=L[R];if(typeof A=="number"||typeof A=="boolean"){if(C!==A)return L[R]=A,!0}else if(C.equals(A)===!1)return C.copy(A),!0}return!1}function v(x){const M=x.uniforms;let S=0;const L=16;for(let R=0,C=M.length;R<C;R++){const y=Array.isArray(M[R])?M[R]:[M[R]];for(let _=0,w=y.length;_<w;_++){const O=y[_],D=Array.isArray(O.value)?O.value:[O.value];for(let k=0,X=D.length;k<X;k++){const V=D[k],Y=g(V),W=S%L,Q=W%Y.boundary,nt=W+Q;S+=Q,nt!==0&&L-nt<Y.storage&&(S+=L-nt),O.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=S,S+=Y.storage}}}const A=S%L;return A>0&&(S+=L-A),x.__size=S,x.__cache={},this}function g(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function m(x){const M=x.target;M.removeEventListener("dispose",m);const S=a.indexOf(M.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function p(){for(const x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class bg{constructor(t={}){const{canvas:e=ff(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const v=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const x=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ae,this.toneMapping=$n,this.toneMappingExposure=1;const S=this;let L=!1,A=0,R=0,C=null,y=-1,_=null;const w=new se,O=new se;let D=null;const k=new Tt(0);let X=0,V=e.width,Y=e.height,W=1,Q=null,nt=null;const mt=new se(0,0,V,Y),Ct=new se(0,0,V,Y);let Kt=!1;const $=new Wo;let tt=!1,_t=!1;const lt=new Ht,Pt=new Ht,Ut=new P,zt=new se,fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Yt=!1;function me(){return C===null?W:1}let F=n;function Ke(E,U){return e.getContext(E,U)}try{const E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Uo}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",ft,!1),e.addEventListener("webglcontextcreationerror",ht,!1),F===null){const U="webgl2";if(F=Ke(U,E),F===null)throw Ke(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Vt,Wt,wt,le,At,T,b,B,j,Z,K,bt,ct,pt,$t,it,gt,Rt,Dt,vt,Xt,kt,re,I;function ot(){Vt=new Rm(F),Vt.init(),kt=new dg(F,Vt),Wt=new Sm(F,Vt,t,kt),wt=new hg(F,Vt),Wt.reverseDepthBuffer&&f&&wt.buffers.depth.setReversed(!0),le=new Lm(F),At=new K0,T=new fg(F,Vt,wt,At,Wt,kt,le),b=new Em(S),B=new wm(S),j=new kf(F),re=new ym(F,j),Z=new Cm(F,j,le,re),K=new Im(F,Z,j,le),Dt=new Dm(F,Wt,T),it=new bm(At),bt=new $0(S,b,B,Vt,Wt,re,it),ct=new Mg(S,At),pt=new J0,$t=new ig(Vt),Rt=new xm(S,b,B,wt,K,d,l),gt=new lg(S,K,Wt),I=new Sg(F,le,Wt,wt),vt=new Mm(F,Vt,le),Xt=new Pm(F,Vt,le),le.programs=bt.programs,S.capabilities=Wt,S.extensions=Vt,S.properties=At,S.renderLists=pt,S.shadowMap=gt,S.state=wt,S.info=le}ot();const q=new xg(S,F);this.xr=q,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const E=Vt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Vt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(E){E!==void 0&&(W=E,this.setSize(V,Y,!1))},this.getSize=function(E){return E.set(V,Y)},this.setSize=function(E,U,z=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=E,Y=U,e.width=Math.floor(E*W),e.height=Math.floor(U*W),z===!0&&(e.style.width=E+"px",e.style.height=U+"px"),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(V*W,Y*W).floor()},this.setDrawingBufferSize=function(E,U,z){V=E,Y=U,W=z,e.width=Math.floor(E*z),e.height=Math.floor(U*z),this.setViewport(0,0,E,U)},this.getCurrentViewport=function(E){return E.copy(w)},this.getViewport=function(E){return E.copy(mt)},this.setViewport=function(E,U,z,H){E.isVector4?mt.set(E.x,E.y,E.z,E.w):mt.set(E,U,z,H),wt.viewport(w.copy(mt).multiplyScalar(W).round())},this.getScissor=function(E){return E.copy(Ct)},this.setScissor=function(E,U,z,H){E.isVector4?Ct.set(E.x,E.y,E.z,E.w):Ct.set(E,U,z,H),wt.scissor(O.copy(Ct).multiplyScalar(W).round())},this.getScissorTest=function(){return Kt},this.setScissorTest=function(E){wt.setScissorTest(Kt=E)},this.setOpaqueSort=function(E){Q=E},this.setTransparentSort=function(E){nt=E},this.getClearColor=function(E){return E.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor.apply(Rt,arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha.apply(Rt,arguments)},this.clear=function(E=!0,U=!0,z=!0){let H=0;if(E){let N=!1;if(C!==null){const st=C.texture.format;N=st===Vo||st===Go||st===Ho}if(N){const st=C.texture.type,ut=st===hn||st===gi||st===Us||st===es||st===ko||st===Bo,yt=Rt.getClearColor(),Mt=Rt.getClearAlpha(),It=yt.r,Ft=yt.g,St=yt.b;ut?(v[0]=It,v[1]=Ft,v[2]=St,v[3]=Mt,F.clearBufferuiv(F.COLOR,0,v)):(g[0]=It,g[1]=Ft,g[2]=St,g[3]=Mt,F.clearBufferiv(F.COLOR,0,g))}else H|=F.COLOR_BUFFER_BIT}U&&(H|=F.DEPTH_BUFFER_BIT),z&&(H|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",ft,!1),e.removeEventListener("webglcontextcreationerror",ht,!1),pt.dispose(),$t.dispose(),At.dispose(),b.dispose(),B.dispose(),K.dispose(),re.dispose(),I.dispose(),bt.dispose(),q.dispose(),q.removeEventListener("sessionstart",nl),q.removeEventListener("sessionend",il),Qn.stop()};function J(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),L=!0}function ft(){console.log("THREE.WebGLRenderer: Context Restored."),L=!1;const E=le.autoReset,U=gt.enabled,z=gt.autoUpdate,H=gt.needsUpdate,N=gt.type;ot(),le.autoReset=E,gt.enabled=U,gt.autoUpdate=z,gt.needsUpdate=H,gt.type=N}function ht(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Nt(E){const U=E.target;U.removeEventListener("dispose",Nt),pe(U)}function pe(E){Ce(E),At.remove(E)}function Ce(E){const U=At.get(E).programs;U!==void 0&&(U.forEach(function(z){bt.releaseProgram(z)}),E.isShaderMaterial&&bt.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,z,H,N,st){U===null&&(U=fe);const ut=N.isMesh&&N.matrixWorld.determinant()<0,yt=Oh(E,U,z,H,N);wt.setMaterial(H,ut);let Mt=z.index,It=1;if(H.wireframe===!0){if(Mt=Z.getWireframeAttribute(z),Mt===void 0)return;It=2}const Ft=z.drawRange,St=z.attributes.position;let jt=Ft.start*It,ae=(Ft.start+Ft.count)*It;st!==null&&(jt=Math.max(jt,st.start*It),ae=Math.min(ae,(st.start+st.count)*It)),Mt!==null?(jt=Math.max(jt,0),ae=Math.min(ae,Mt.count)):St!=null&&(jt=Math.max(jt,0),ae=Math.min(ae,St.count));const ce=ae-jt;if(ce<0||ce===1/0)return;re.setup(N,H,yt,z,Mt);let Be,Jt=vt;if(Mt!==null&&(Be=j.get(Mt),Jt=Xt,Jt.setIndex(Be)),N.isMesh)H.wireframe===!0?(wt.setLineWidth(H.wireframeLinewidth*me()),Jt.setMode(F.LINES)):Jt.setMode(F.TRIANGLES);else if(N.isLine){let Et=H.linewidth;Et===void 0&&(Et=1),wt.setLineWidth(Et*me()),N.isLineSegments?Jt.setMode(F.LINES):N.isLineLoop?Jt.setMode(F.LINE_LOOP):Jt.setMode(F.LINE_STRIP)}else N.isPoints?Jt.setMode(F.POINTS):N.isSprite&&Jt.setMode(F.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Jt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Vt.get("WEBGL_multi_draw"))Jt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Et=N._multiDrawStarts,En=N._multiDrawCounts,Zt=N._multiDrawCount,rn=Mt?j.get(Mt).bytesPerElement:1,Si=At.get(H).currentProgram.getUniforms();for(let We=0;We<Zt;We++)Si.setValue(F,"_gl_DrawID",We),Jt.render(Et[We]/rn,En[We])}else if(N.isInstancedMesh)Jt.renderInstances(jt,ce,N.count);else if(z.isInstancedBufferGeometry){const Et=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,En=Math.min(z.instanceCount,Et);Jt.renderInstances(jt,ce,En)}else Jt.render(jt,ce)};function te(E,U,z){E.transparent===!0&&E.side===Ve&&E.forceSinglePass===!1?(E.side=Oe,E.needsUpdate=!0,Bs(E,U,z),E.side=Zn,E.needsUpdate=!0,Bs(E,U,z),E.side=Ve):Bs(E,U,z)}this.compile=function(E,U,z=null){z===null&&(z=E),p=$t.get(z),p.init(U),M.push(p),z.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),E!==z&&E.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const H=new Set;return E.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const st=N.material;if(st)if(Array.isArray(st))for(let ut=0;ut<st.length;ut++){const yt=st[ut];te(yt,z,N),H.add(yt)}else te(st,z,N),H.add(st)}),M.pop(),p=null,H},this.compileAsync=function(E,U,z=null){const H=this.compile(E,U,z);return new Promise(N=>{function st(){if(H.forEach(function(ut){At.get(ut).currentProgram.isReady()&&H.delete(ut)}),H.size===0){N(E);return}setTimeout(st,10)}Vt.get("KHR_parallel_shader_compile")!==null?st():setTimeout(st,10)})};let sn=null;function bn(E){sn&&sn(E)}function nl(){Qn.stop()}function il(){Qn.start()}const Qn=new gh;Qn.setAnimationLoop(bn),typeof self<"u"&&Qn.setContext(self),this.setAnimationLoop=function(E){sn=E,q.setAnimationLoop(E),E===null?Qn.stop():Qn.start()},q.addEventListener("sessionstart",nl),q.addEventListener("sessionend",il),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(U),U=q.getCamera()),E.isScene===!0&&E.onBeforeRender(S,E,U,C),p=$t.get(E,M.length),p.init(U),M.push(p),Pt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),$.setFromProjectionMatrix(Pt),_t=this.localClippingEnabled,tt=it.init(this.clippingPlanes,_t),m=pt.get(E,x.length),m.init(),x.push(m),q.enabled===!0&&q.isPresenting===!0){const st=S.xr.getDepthSensingMesh();st!==null&&qr(st,U,-1/0,S.sortObjects)}qr(E,U,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(Q,nt),Yt=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Yt&&Rt.addToRenderList(m,E),this.info.render.frame++,tt===!0&&it.beginShadows();const z=p.state.shadowsArray;gt.render(z,E,U),tt===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,N=m.transmissive;if(p.setupLights(),U.isArrayCamera){const st=U.cameras;if(N.length>0)for(let ut=0,yt=st.length;ut<yt;ut++){const Mt=st[ut];rl(H,N,E,Mt)}Yt&&Rt.render(E);for(let ut=0,yt=st.length;ut<yt;ut++){const Mt=st[ut];sl(m,E,Mt,Mt.viewport)}}else N.length>0&&rl(H,N,E,U),Yt&&Rt.render(E),sl(m,E,U);C!==null&&(T.updateMultisampleRenderTarget(C),T.updateRenderTargetMipmap(C)),E.isScene===!0&&E.onAfterRender(S,E,U),re.resetDefaultState(),y=-1,_=null,M.pop(),M.length>0?(p=M[M.length-1],tt===!0&&it.setGlobalState(S.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function qr(E,U,z,H){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)z=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||$.intersectsSprite(E)){H&&zt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Pt);const ut=K.update(E),yt=E.material;yt.visible&&m.push(E,ut,yt,z,zt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||$.intersectsObject(E))){const ut=K.update(E),yt=E.material;if(H&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),zt.copy(E.boundingSphere.center)):(ut.boundingSphere===null&&ut.computeBoundingSphere(),zt.copy(ut.boundingSphere.center)),zt.applyMatrix4(E.matrixWorld).applyMatrix4(Pt)),Array.isArray(yt)){const Mt=ut.groups;for(let It=0,Ft=Mt.length;It<Ft;It++){const St=Mt[It],jt=yt[St.materialIndex];jt&&jt.visible&&m.push(E,ut,jt,z,zt.z,St)}}else yt.visible&&m.push(E,ut,yt,z,zt.z,null)}}const st=E.children;for(let ut=0,yt=st.length;ut<yt;ut++)qr(st[ut],U,z,H)}function sl(E,U,z,H){const N=E.opaque,st=E.transmissive,ut=E.transparent;p.setupLightsView(z),tt===!0&&it.setGlobalState(S.clippingPlanes,z),H&&wt.viewport(w.copy(H)),N.length>0&&ks(N,U,z),st.length>0&&ks(st,U,z),ut.length>0&&ks(ut,U,z),wt.buffers.depth.setTest(!0),wt.buffers.depth.setMask(!0),wt.buffers.color.setMask(!0),wt.setPolygonOffset(!1)}function rl(E,U,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new nn(1,1,{generateMipmaps:!0,type:Vt.has("EXT_color_buffer_half_float")||Vt.has("EXT_color_buffer_float")?yn:hn,minFilter:ui,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qt.workingColorSpace}));const st=p.state.transmissionRenderTarget[H.id],ut=H.viewport||w;st.setSize(ut.z,ut.w);const yt=S.getRenderTarget();S.setRenderTarget(st),S.getClearColor(k),X=S.getClearAlpha(),X<1&&S.setClearColor(16777215,.5),S.clear(),Yt&&Rt.render(z);const Mt=S.toneMapping;S.toneMapping=$n;const It=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),tt===!0&&it.setGlobalState(S.clippingPlanes,H),ks(E,z,H),T.updateMultisampleRenderTarget(st),T.updateRenderTargetMipmap(st),Vt.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let St=0,jt=U.length;St<jt;St++){const ae=U[St],ce=ae.object,Be=ae.geometry,Jt=ae.material,Et=ae.group;if(Jt.side===Ve&&ce.layers.test(H.layers)){const En=Jt.side;Jt.side=Oe,Jt.needsUpdate=!0,al(ce,z,H,Be,Jt,Et),Jt.side=En,Jt.needsUpdate=!0,Ft=!0}}Ft===!0&&(T.updateMultisampleRenderTarget(st),T.updateRenderTargetMipmap(st))}S.setRenderTarget(yt),S.setClearColor(k,X),It!==void 0&&(H.viewport=It),S.toneMapping=Mt}function ks(E,U,z){const H=U.isScene===!0?U.overrideMaterial:null;for(let N=0,st=E.length;N<st;N++){const ut=E[N],yt=ut.object,Mt=ut.geometry,It=H===null?ut.material:H,Ft=ut.group;yt.layers.test(z.layers)&&al(yt,U,z,Mt,It,Ft)}}function al(E,U,z,H,N,st){E.onBeforeRender(S,U,z,H,N,st),E.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),N.onBeforeRender(S,U,z,H,E,st),N.transparent===!0&&N.side===Ve&&N.forceSinglePass===!1?(N.side=Oe,N.needsUpdate=!0,S.renderBufferDirect(z,U,H,N,E,st),N.side=Zn,N.needsUpdate=!0,S.renderBufferDirect(z,U,H,N,E,st),N.side=Ve):S.renderBufferDirect(z,U,H,N,E,st),E.onAfterRender(S,U,z,H,N,st)}function Bs(E,U,z){U.isScene!==!0&&(U=fe);const H=At.get(E),N=p.state.lights,st=p.state.shadowsArray,ut=N.state.version,yt=bt.getParameters(E,N.state,st,U,z),Mt=bt.getProgramCacheKey(yt);let It=H.programs;H.environment=E.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(E.isMeshStandardMaterial?B:b).get(E.envMap||H.environment),H.envMapRotation=H.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,It===void 0&&(E.addEventListener("dispose",Nt),It=new Map,H.programs=It);let Ft=It.get(Mt);if(Ft!==void 0){if(H.currentProgram===Ft&&H.lightsStateVersion===ut)return ll(E,yt),Ft}else yt.uniforms=bt.getUniforms(E),E.onBeforeCompile(yt,S),Ft=bt.acquireProgram(yt,Mt),It.set(Mt,Ft),H.uniforms=yt.uniforms;const St=H.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(St.clippingPlanes=it.uniform),ll(E,yt),H.needsLights=Bh(E),H.lightsStateVersion=ut,H.needsLights&&(St.ambientLightColor.value=N.state.ambient,St.lightProbe.value=N.state.probe,St.directionalLights.value=N.state.directional,St.directionalLightShadows.value=N.state.directionalShadow,St.spotLights.value=N.state.spot,St.spotLightShadows.value=N.state.spotShadow,St.rectAreaLights.value=N.state.rectArea,St.ltc_1.value=N.state.rectAreaLTC1,St.ltc_2.value=N.state.rectAreaLTC2,St.pointLights.value=N.state.point,St.pointLightShadows.value=N.state.pointShadow,St.hemisphereLights.value=N.state.hemi,St.directionalShadowMap.value=N.state.directionalShadowMap,St.directionalShadowMatrix.value=N.state.directionalShadowMatrix,St.spotShadowMap.value=N.state.spotShadowMap,St.spotLightMatrix.value=N.state.spotLightMatrix,St.spotLightMap.value=N.state.spotLightMap,St.pointShadowMap.value=N.state.pointShadowMap,St.pointShadowMatrix.value=N.state.pointShadowMatrix),H.currentProgram=Ft,H.uniformsList=null,Ft}function ol(E){if(E.uniformsList===null){const U=E.currentProgram.getUniforms();E.uniformsList=Cr.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function ll(E,U){const z=At.get(E);z.outputColorSpace=U.outputColorSpace,z.batching=U.batching,z.batchingColor=U.batchingColor,z.instancing=U.instancing,z.instancingColor=U.instancingColor,z.instancingMorph=U.instancingMorph,z.skinning=U.skinning,z.morphTargets=U.morphTargets,z.morphNormals=U.morphNormals,z.morphColors=U.morphColors,z.morphTargetsCount=U.morphTargetsCount,z.numClippingPlanes=U.numClippingPlanes,z.numIntersection=U.numClipIntersection,z.vertexAlphas=U.vertexAlphas,z.vertexTangents=U.vertexTangents,z.toneMapping=U.toneMapping}function Oh(E,U,z,H,N){U.isScene!==!0&&(U=fe),T.resetTextureUnits();const st=U.fog,ut=H.isMeshStandardMaterial?U.environment:null,yt=C===null?S.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:os,Mt=(H.isMeshStandardMaterial?B:b).get(H.envMap||ut),It=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Ft=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),St=!!z.morphAttributes.position,jt=!!z.morphAttributes.normal,ae=!!z.morphAttributes.color;let ce=$n;H.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(ce=S.toneMapping);const Be=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Jt=Be!==void 0?Be.length:0,Et=At.get(H),En=p.state.lights;if(tt===!0&&(_t===!0||E!==_)){const je=E===_&&H.id===y;it.setState(H,E,je)}let Zt=!1;H.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==En.state.version||Et.outputColorSpace!==yt||N.isBatchedMesh&&Et.batching===!1||!N.isBatchedMesh&&Et.batching===!0||N.isBatchedMesh&&Et.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Et.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Et.instancing===!1||!N.isInstancedMesh&&Et.instancing===!0||N.isSkinnedMesh&&Et.skinning===!1||!N.isSkinnedMesh&&Et.skinning===!0||N.isInstancedMesh&&Et.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Et.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Et.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Et.instancingMorph===!1&&N.morphTexture!==null||Et.envMap!==Mt||H.fog===!0&&Et.fog!==st||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==it.numPlanes||Et.numIntersection!==it.numIntersection)||Et.vertexAlphas!==It||Et.vertexTangents!==Ft||Et.morphTargets!==St||Et.morphNormals!==jt||Et.morphColors!==ae||Et.toneMapping!==ce||Et.morphTargetsCount!==Jt)&&(Zt=!0):(Zt=!0,Et.__version=H.version);let rn=Et.currentProgram;Zt===!0&&(rn=Bs(H,U,N));let Si=!1,We=!1,us=!1;const he=rn.getUniforms(),un=Et.uniforms;if(wt.useProgram(rn.program)&&(Si=!0,We=!0,us=!0),H.id!==y&&(y=H.id,We=!0),Si||_!==E){wt.buffers.depth.getReversed()?(lt.copy(E.projectionMatrix),pf(lt),mf(lt),he.setValue(F,"projectionMatrix",lt)):he.setValue(F,"projectionMatrix",E.projectionMatrix),he.setValue(F,"viewMatrix",E.matrixWorldInverse);const Fn=he.map.cameraPosition;Fn!==void 0&&Fn.setValue(F,Ut.setFromMatrixPosition(E.matrixWorld)),Wt.logarithmicDepthBuffer&&he.setValue(F,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&he.setValue(F,"isOrthographic",E.isOrthographicCamera===!0),_!==E&&(_=E,We=!0,us=!0)}if(N.isSkinnedMesh){he.setOptional(F,N,"bindMatrix"),he.setOptional(F,N,"bindMatrixInverse");const je=N.skeleton;je&&(je.boneTexture===null&&je.computeBoneTexture(),he.setValue(F,"boneTexture",je.boneTexture,T))}N.isBatchedMesh&&(he.setOptional(F,N,"batchingTexture"),he.setValue(F,"batchingTexture",N._matricesTexture,T),he.setOptional(F,N,"batchingIdTexture"),he.setValue(F,"batchingIdTexture",N._indirectTexture,T),he.setOptional(F,N,"batchingColorTexture"),N._colorsTexture!==null&&he.setValue(F,"batchingColorTexture",N._colorsTexture,T));const fs=z.morphAttributes;if((fs.position!==void 0||fs.normal!==void 0||fs.color!==void 0)&&Dt.update(N,z,rn),(We||Et.receiveShadow!==N.receiveShadow)&&(Et.receiveShadow=N.receiveShadow,he.setValue(F,"receiveShadow",N.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(un.envMap.value=Mt,un.flipEnvMap.value=Mt.isCubeTexture&&Mt.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(un.envMapIntensity.value=U.environmentIntensity),We&&(he.setValue(F,"toneMappingExposure",S.toneMappingExposure),Et.needsLights&&kh(un,us),st&&H.fog===!0&&ct.refreshFogUniforms(un,st),ct.refreshMaterialUniforms(un,H,W,Y,p.state.transmissionRenderTarget[E.id]),Cr.upload(F,ol(Et),un,T)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Cr.upload(F,ol(Et),un,T),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&he.setValue(F,"center",N.center),he.setValue(F,"modelViewMatrix",N.modelViewMatrix),he.setValue(F,"normalMatrix",N.normalMatrix),he.setValue(F,"modelMatrix",N.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const je=H.uniformsGroups;for(let Fn=0,On=je.length;Fn<On;Fn++){const cl=je[Fn];I.update(cl,rn),I.bind(cl,rn)}}return rn}function kh(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function Bh(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(E,U,z){At.get(E.texture).__webglTexture=U,At.get(E.depthTexture).__webglTexture=z;const H=At.get(E);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=z===void 0,H.__autoAllocateDepthBuffer||Vt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,U){const z=At.get(E);z.__webglFramebuffer=U,z.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,z=0){C=E,A=U,R=z;let H=!0,N=null,st=!1,ut=!1;if(E){const Mt=At.get(E);if(Mt.__useDefaultFramebuffer!==void 0)wt.bindFramebuffer(F.FRAMEBUFFER,null),H=!1;else if(Mt.__webglFramebuffer===void 0)T.setupRenderTarget(E);else if(Mt.__hasExternalTextures)T.rebindTextures(E,At.get(E.texture).__webglTexture,At.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const St=E.depthTexture;if(Mt.__boundDepthTexture!==St){if(St!==null&&At.has(St)&&(E.width!==St.image.width||E.height!==St.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(E)}}const It=E.texture;(It.isData3DTexture||It.isDataArrayTexture||It.isCompressedArrayTexture)&&(ut=!0);const Ft=At.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ft[U])?N=Ft[U][z]:N=Ft[U],st=!0):E.samples>0&&T.useMultisampledRTT(E)===!1?N=At.get(E).__webglMultisampledFramebuffer:Array.isArray(Ft)?N=Ft[z]:N=Ft,w.copy(E.viewport),O.copy(E.scissor),D=E.scissorTest}else w.copy(mt).multiplyScalar(W).floor(),O.copy(Ct).multiplyScalar(W).floor(),D=Kt;if(wt.bindFramebuffer(F.FRAMEBUFFER,N)&&H&&wt.drawBuffers(E,N),wt.viewport(w),wt.scissor(O),wt.setScissorTest(D),st){const Mt=At.get(E.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+U,Mt.__webglTexture,z)}else if(ut){const Mt=At.get(E.texture),It=U||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Mt.__webglTexture,z||0,It)}y=-1},this.readRenderTargetPixels=function(E,U,z,H,N,st,ut){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=At.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ut!==void 0&&(yt=yt[ut]),yt){wt.bindFramebuffer(F.FRAMEBUFFER,yt);try{const Mt=E.texture,It=Mt.format,Ft=Mt.type;if(!Wt.textureFormatReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Wt.textureTypeReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-H&&z>=0&&z<=E.height-N&&F.readPixels(U,z,H,N,kt.convert(It),kt.convert(Ft),st)}finally{const Mt=C!==null?At.get(C).__webglFramebuffer:null;wt.bindFramebuffer(F.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(E,U,z,H,N,st,ut){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=At.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ut!==void 0&&(yt=yt[ut]),yt){const Mt=E.texture,It=Mt.format,Ft=Mt.type;if(!Wt.textureFormatReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Wt.textureTypeReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=E.width-H&&z>=0&&z<=E.height-N){wt.bindFramebuffer(F.FRAMEBUFFER,yt);const St=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,St),F.bufferData(F.PIXEL_PACK_BUFFER,st.byteLength,F.STREAM_READ),F.readPixels(U,z,H,N,kt.convert(It),kt.convert(Ft),0);const jt=C!==null?At.get(C).__webglFramebuffer:null;wt.bindFramebuffer(F.FRAMEBUFFER,jt);const ae=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await df(F,ae,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,St),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,st),F.deleteBuffer(St),F.deleteSync(ae),st}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,U=null,z=0){E.isTexture!==!0&&(As("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,E=arguments[1]);const H=Math.pow(2,-z),N=Math.floor(E.image.width*H),st=Math.floor(E.image.height*H),ut=U!==null?U.x:0,yt=U!==null?U.y:0;T.setTexture2D(E,0),F.copyTexSubImage2D(F.TEXTURE_2D,z,0,0,ut,yt,N,st),wt.unbindTexture()},this.copyTextureToTexture=function(E,U,z=null,H=null,N=0){E.isTexture!==!0&&(As("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,E=arguments[1],U=arguments[2],N=arguments[3]||0,z=null);let st,ut,yt,Mt,It,Ft,St,jt,ae;const ce=E.isCompressedTexture?E.mipmaps[N]:E.image;z!==null?(st=z.max.x-z.min.x,ut=z.max.y-z.min.y,yt=z.isBox3?z.max.z-z.min.z:1,Mt=z.min.x,It=z.min.y,Ft=z.isBox3?z.min.z:0):(st=ce.width,ut=ce.height,yt=ce.depth||1,Mt=0,It=0,Ft=0),H!==null?(St=H.x,jt=H.y,ae=H.z):(St=0,jt=0,ae=0);const Be=kt.convert(U.format),Jt=kt.convert(U.type);let Et;U.isData3DTexture?(T.setTexture3D(U,0),Et=F.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(T.setTexture2DArray(U,0),Et=F.TEXTURE_2D_ARRAY):(T.setTexture2D(U,0),Et=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,U.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,U.unpackAlignment);const En=F.getParameter(F.UNPACK_ROW_LENGTH),Zt=F.getParameter(F.UNPACK_IMAGE_HEIGHT),rn=F.getParameter(F.UNPACK_SKIP_PIXELS),Si=F.getParameter(F.UNPACK_SKIP_ROWS),We=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,ce.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ce.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Mt),F.pixelStorei(F.UNPACK_SKIP_ROWS,It),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ft);const us=E.isDataArrayTexture||E.isData3DTexture,he=U.isDataArrayTexture||U.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const un=At.get(E),fs=At.get(U),je=At.get(un.__renderTarget),Fn=At.get(fs.__renderTarget);wt.bindFramebuffer(F.READ_FRAMEBUFFER,je.__webglFramebuffer),wt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Fn.__webglFramebuffer);for(let On=0;On<yt;On++)us&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,At.get(E).__webglTexture,N,Ft+On),E.isDepthTexture?(he&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,At.get(U).__webglTexture,N,ae+On),F.blitFramebuffer(Mt,It,st,ut,St,jt,st,ut,F.DEPTH_BUFFER_BIT,F.NEAREST)):he?F.copyTexSubImage3D(Et,N,St,jt,ae+On,Mt,It,st,ut):F.copyTexSubImage2D(Et,N,St,jt,ae+On,Mt,It,st,ut);wt.bindFramebuffer(F.READ_FRAMEBUFFER,null),wt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else he?E.isDataTexture||E.isData3DTexture?F.texSubImage3D(Et,N,St,jt,ae,st,ut,yt,Be,Jt,ce.data):U.isCompressedArrayTexture?F.compressedTexSubImage3D(Et,N,St,jt,ae,st,ut,yt,Be,ce.data):F.texSubImage3D(Et,N,St,jt,ae,st,ut,yt,Be,Jt,ce):E.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,N,St,jt,st,ut,Be,Jt,ce.data):E.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,N,St,jt,ce.width,ce.height,Be,ce.data):F.texSubImage2D(F.TEXTURE_2D,N,St,jt,st,ut,Be,Jt,ce);F.pixelStorei(F.UNPACK_ROW_LENGTH,En),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Zt),F.pixelStorei(F.UNPACK_SKIP_PIXELS,rn),F.pixelStorei(F.UNPACK_SKIP_ROWS,Si),F.pixelStorei(F.UNPACK_SKIP_IMAGES,We),N===0&&U.generateMipmaps&&F.generateMipmap(Et),wt.unbindTexture()},this.copyTextureToTexture3D=function(E,U,z=null,H=null,N=0){return E.isTexture!==!0&&(As("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,H=arguments[1]||null,E=arguments[2],U=arguments[3],N=arguments[4]||0),As('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,U,z,H,N)},this.initRenderTarget=function(E){At.get(E).__webglFramebuffer===void 0&&T.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?T.setTextureCube(E,0):E.isData3DTexture?T.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?T.setTexture2DArray(E,0):T.setTexture2D(E,0),wt.unbindTexture()},this.resetState=function(){A=0,R=0,C=null,wt.reset(),re.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=qt._getUnpackColorSpace()}}class qo{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Tt(t),this.density=e}clone(){return new qo(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class bh extends _e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mn,this.environmentIntensity=1,this.environmentRotation=new Mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Eg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=To,this.updateRanges=[],this.version=0,this.uuid=Kn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ne=new P;class Ur{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ne(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=gn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=gn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=gn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=gn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),s=ne(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),n=ne(n,this.array),s=ne(s,this.array),r=ne(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ie(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Ur(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Yo extends Mi{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new Tt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ki;const vs=new P,Bi=new P,zi=new P,Hi=new rt,_s=new rt,Eh=new Ht,lr=new P,xs=new P,cr=new P,hc=new rt,wa=new rt,uc=new rt;class Th extends _e{constructor(t=new Yo){if(super(),this.isSprite=!0,this.type="Sprite",ki===void 0){ki=new Re;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Eg(e,5);ki.setIndex([0,1,2,0,2,3]),ki.setAttribute("position",new Ur(n,3,0,!1)),ki.setAttribute("uv",new Ur(n,2,3,!1))}this.geometry=ki,this.material=t,this.center=new rt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Bi.setFromMatrixScale(this.matrixWorld),Eh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),zi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Bi.multiplyScalar(-zi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;hr(lr.set(-.5,-.5,0),zi,a,Bi,s,r),hr(xs.set(.5,-.5,0),zi,a,Bi,s,r),hr(cr.set(.5,.5,0),zi,a,Bi,s,r),hc.set(0,0),wa.set(1,0),uc.set(1,1);let o=t.ray.intersectTriangle(lr,xs,cr,!1,vs);if(o===null&&(hr(xs.set(-.5,.5,0),zi,a,Bi,s,r),wa.set(0,1),o=t.ray.intersectTriangle(lr,cr,xs,!1,vs),o===null))return;const l=t.ray.origin.distanceTo(vs);l<t.near||l>t.far||e.push({distance:l,point:vs.clone(),uv:tn.getInterpolation(vs,lr,xs,cr,hc,wa,uc,new rt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function hr(i,t,e,n,s,r){Hi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(_s.x=r*Hi.x-s*Hi.y,_s.y=s*Hi.x+r*Hi.y):_s.copy(Hi),i.copy(t),i.x+=_s.x,i.y+=_s.y,i.applyMatrix4(Eh)}class Ro extends Ue{constructor(t=null,e=1,n=1,s,r,a,o,l,c=ke,h=ke,u,f){super(null,a,o,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fc extends Ie{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Gi=new Ht,dc=new Ht,ur=[],pc=new xi,Tg=new Ht,ys=new dt,Ms=new yi;class cn extends dt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new fc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Tg)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new xi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Gi),pc.copy(t.boundingBox).applyMatrix4(Gi),this.boundingBox.union(pc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new yi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Gi),Ms.copy(t.boundingSphere).applyMatrix4(Gi),this.boundingSphere.union(Ms)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(ys.geometry=this.geometry,ys.material=this.material,ys.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ms.copy(this.boundingSphere),Ms.applyMatrix4(n),t.ray.intersectsSphere(Ms)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Gi),dc.multiplyMatrices(n,Gi),ys.matrixWorld=dc,ys.raycast(t,ur);for(let a=0,o=ur.length;a<o;a++){const l=ur[a];l.instanceId=r,l.object=this,e.push(l)}ur.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new fc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ro(new Float32Array(s*this.count),s,this.count,zo,xn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Ah extends Mi{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Nr=new P,Fr=new P,mc=new Ht,Ss=new lh,fr=new yi,Ra=new P,gc=new P;class Ag extends _e{constructor(t=new Re,e=new Ah){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Nr.fromBufferAttribute(e,s-1),Fr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Nr.distanceTo(Fr);t.setAttribute("lineDistance",new oe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fr.copy(n.boundingSphere),fr.applyMatrix4(s),fr.radius+=r,t.ray.intersectsSphere(fr)===!1)return;mc.copy(s).invert(),Ss.copy(t.ray).applyMatrix4(mc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),v=Math.min(h.count,a.start+a.count);for(let g=d,m=v-1;g<m;g+=c){const p=h.getX(g),x=h.getX(g+1),M=dr(this,t,Ss,l,p,x);M&&e.push(M)}if(this.isLineLoop){const g=h.getX(v-1),m=h.getX(d),p=dr(this,t,Ss,l,g,m);p&&e.push(p)}}else{const d=Math.max(0,a.start),v=Math.min(f.count,a.start+a.count);for(let g=d,m=v-1;g<m;g+=c){const p=dr(this,t,Ss,l,g,g+1);p&&e.push(p)}if(this.isLineLoop){const g=dr(this,t,Ss,l,v-1,d);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function dr(i,t,e,n,s,r){const a=i.geometry.attributes.position;if(Nr.fromBufferAttribute(a,s),Fr.fromBufferAttribute(a,r),e.distanceSqToSegment(Nr,Fr,Ra,gc)>n)return;Ra.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ra);if(!(l<t.near||l>t.far))return{distance:l,point:gc.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}class Wr extends Ue{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Sn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(a-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new rt:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new P,s=[],r=[],a=[],o=new P,l=new Ht;for(let d=0;d<=t;d++){const v=d/t;s[d]=this.getTangentAt(v,new P)}r[0]=new P,a[0]=new P;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();const v=Math.acos(we(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,v))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(we(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let v=1;v<=t;v++)r[v].applyMatrix4(l.makeRotationAxis(s[v],d*v)),a[v].crossVectors(s[v],r[v])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class $o extends Sn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new rt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class wg extends $o{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Ko(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let f=(a-r)/c-(o-r)/(c+h)+(o-a)/h,d=(o-a)/h-(l-a)/(h+u)+(l-o)/u;f*=h,d*=h,s(a,o,f,d)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const pr=new P,Ca=new Ko,Pa=new Ko,La=new Ko;class Rg extends Sn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new P){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(pr.subVectors(s[0],s[1]).add(s[0]),c=pr);const u=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(pr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=pr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let v=Math.pow(c.distanceToSquared(u),d),g=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);g<1e-4&&(g=1),v<1e-4&&(v=g),m<1e-4&&(m=g),Ca.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,v,g,m),Pa.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,v,g,m),La.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,v,g,m)}else this.curveType==="catmullrom"&&(Ca.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),Pa.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),La.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(Ca.calc(l),Pa.calc(l),La.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function vc(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function Cg(i,t){const e=1-i;return e*e*t}function Pg(i,t){return 2*(1-i)*i*t}function Lg(i,t){return i*i*t}function Rs(i,t,e,n){return Cg(i,t)+Pg(i,e)+Lg(i,n)}function Dg(i,t){const e=1-i;return e*e*e*t}function Ig(i,t){const e=1-i;return 3*e*e*i*t}function Ug(i,t){return 3*(1-i)*i*i*t}function Ng(i,t){return i*i*i*t}function Cs(i,t,e,n,s){return Dg(i,t)+Ig(i,e)+Ug(i,n)+Ng(i,s)}class wh extends Sn{constructor(t=new rt,e=new rt,n=new rt,s=new rt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new rt){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Cs(t,s.x,r.x,a.x,o.x),Cs(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Fg extends Sn{constructor(t=new P,e=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new P){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Cs(t,s.x,r.x,a.x,o.x),Cs(t,s.y,r.y,a.y,o.y),Cs(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Rh extends Sn{constructor(t=new rt,e=new rt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new rt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new rt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Og extends Sn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ch extends Sn{constructor(t=new rt,e=new rt,n=new rt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new rt){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Rs(t,s.x,r.x,a.x),Rs(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class kg extends Sn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Rs(t,s.x,r.x,a.x),Rs(t,s.y,r.y,a.y),Rs(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ph extends Sn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new rt){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(vc(o,l.x,c.x,h.x,u.x),vc(o,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new rt().fromArray(s))}return this}}var _c=Object.freeze({__proto__:null,ArcCurve:wg,CatmullRomCurve3:Rg,CubicBezierCurve:wh,CubicBezierCurve3:Fg,EllipseCurve:$o,LineCurve:Rh,LineCurve3:Og,QuadraticBezierCurve:Ch,QuadraticBezierCurve3:kg,SplineCurve:Ph});class Bg extends Sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new _c[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new _c[s.type]().fromJSON(s))}return this}}class zg extends Bg{constructor(t){super(),this.type="Path",this.currentPoint=new rt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Rh(this.currentPoint.clone(),new rt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Ch(this.currentPoint.clone(),new rt(t,e),new rt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new wh(this.currentPoint.clone(),new rt(t,e),new rt(n,s),new rt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Ph(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){const c=new $o(t,e,n,s,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class jo extends Re{constructor(t=[new rt(0,-.5),new rt(.5,0),new rt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=we(s,0,Math.PI*2);const r=[],a=[],o=[],l=[],c=[],h=1/e,u=new P,f=new rt,d=new P,v=new P,g=new P;let m=0,p=0;for(let x=0;x<=t.length-1;x++)switch(x){case 0:m=t[x+1].x-t[x].x,p=t[x+1].y-t[x].y,d.x=p*1,d.y=-m,d.z=p*0,g.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:l.push(g.x,g.y,g.z);break;default:m=t[x+1].x-t[x].x,p=t[x+1].y-t[x].y,d.x=p*1,d.y=-m,d.z=p*0,v.copy(d),d.x+=g.x,d.y+=g.y,d.z+=g.z,d.normalize(),l.push(d.x,d.y,d.z),g.copy(v)}for(let x=0;x<=e;x++){const M=n+x*h*s,S=Math.sin(M),L=Math.cos(M);for(let A=0;A<=t.length-1;A++){u.x=t[A].x*S,u.y=t[A].y,u.z=t[A].x*L,a.push(u.x,u.y,u.z),f.x=x/e,f.y=A/(t.length-1),o.push(f.x,f.y);const R=l[3*A+0]*S,C=l[3*A+1],y=l[3*A+0]*L;c.push(R,C,y)}}for(let x=0;x<e;x++)for(let M=0;M<t.length-1;M++){const S=M+x*t.length,L=S,A=S+t.length,R=S+t.length+1,C=S+1;r.push(L,A,C),r.push(R,C,A)}this.setIndex(r),this.setAttribute("position",new oe(a,3)),this.setAttribute("uv",new oe(o,2)),this.setAttribute("normal",new oe(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jo(t.points,t.segments,t.phiStart,t.phiLength)}}class Jo extends jo{constructor(t=1,e=1,n=4,s=8){const r=new zg;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new Jo(t.radius,t.length,t.capSegments,t.radialSegments)}}class Zo extends Re{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new P,h=new rt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*s;c.x=t*Math.cos(d),c.y=t*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[f]/t+1)/2,h.y=(a[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new oe(a,3)),this.setAttribute("normal",new oe(o,3)),this.setAttribute("uv",new oe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zo(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Qe extends Re{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let v=0;const g=[],m=n/2;let p=0;x(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new oe(u,3)),this.setAttribute("normal",new oe(f,3)),this.setAttribute("uv",new oe(d,2));function x(){const S=new P,L=new P;let A=0;const R=(e-t)/n;for(let C=0;C<=r;C++){const y=[],_=C/r,w=_*(e-t)+t;for(let O=0;O<=s;O++){const D=O/s,k=D*l+o,X=Math.sin(k),V=Math.cos(k);L.x=w*X,L.y=-_*n+m,L.z=w*V,u.push(L.x,L.y,L.z),S.set(X,R,V).normalize(),f.push(S.x,S.y,S.z),d.push(D,1-_),y.push(v++)}g.push(y)}for(let C=0;C<s;C++)for(let y=0;y<r;y++){const _=g[y][C],w=g[y+1][C],O=g[y+1][C+1],D=g[y][C+1];(t>0||y!==0)&&(h.push(_,w,D),A+=3),(e>0||y!==r-1)&&(h.push(w,O,D),A+=3)}c.addGroup(p,A,0),p+=A}function M(S){const L=v,A=new rt,R=new P;let C=0;const y=S===!0?t:e,_=S===!0?1:-1;for(let O=1;O<=s;O++)u.push(0,m*_,0),f.push(0,_,0),d.push(.5,.5),v++;const w=v;for(let O=0;O<=s;O++){const k=O/s*l+o,X=Math.cos(k),V=Math.sin(k);R.x=y*V,R.y=m*_,R.z=y*X,u.push(R.x,R.y,R.z),f.push(0,_,0),A.x=X*.5+.5,A.y=V*.5*_+.5,d.push(A.x,A.y),v++}for(let O=0;O<s;O++){const D=L+O,k=w+O;S===!0?h.push(k,k+1,D):h.push(k+1,k,D),C+=3}c.addGroup(p,C,S===!0?1:2),p+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Qo extends Qe{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Qo(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class qn extends Re{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new P,f=new P,d=[],v=[],g=[],m=[];for(let p=0;p<=n;p++){const x=[],M=p/n;let S=0;p===0&&a===0?S=.5/e:p===n&&l===Math.PI&&(S=-.5/e);for(let L=0;L<=e;L++){const A=L/e;u.x=-t*Math.cos(s+A*r)*Math.sin(a+M*o),u.y=t*Math.cos(a+M*o),u.z=t*Math.sin(s+A*r)*Math.sin(a+M*o),v.push(u.x,u.y,u.z),f.copy(u).normalize(),g.push(f.x,f.y,f.z),m.push(A+S,1-M),x.push(c++)}h.push(x)}for(let p=0;p<n;p++)for(let x=0;x<e;x++){const M=h[p][x+1],S=h[p][x],L=h[p+1][x],A=h[p+1][x+1];(p!==0||a>0)&&d.push(M,S,A),(p!==n-1||l<Math.PI)&&d.push(S,L,A)}this.setIndex(d),this.setAttribute("position",new oe(v,3)),this.setAttribute("normal",new oe(g,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Hg extends de{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class Ye extends Mi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Tt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Tt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ih,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class tl extends _e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Tt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Gg extends tl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Tt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Da=new Ht,xc=new P,yc=new P;class Lh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new rt(512,512),this.map=null,this.mapPass=null,this.matrix=new Ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Wo,this._frameExtents=new rt(1,1),this._viewportCount=1,this._viewports=[new se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;xc.setFromMatrixPosition(t.matrixWorld),e.position.copy(xc),yc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(yc),e.updateMatrixWorld(),Da.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Da),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Da)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Vg extends Lh{constructor(){super(new He(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Dr*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Mc extends tl{constructor(t,e,n=0,s=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Vg}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Sc=new Ht,bs=new P,Ia=new P;class Wg extends Lh{constructor(){super(new He(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new rt(4,2),this._viewportCount=6,this._viewports=[new se(2,1,1,1),new se(0,1,1,1),new se(3,1,1,1),new se(1,1,1,1),new se(3,0,1,1),new se(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),bs.setFromMatrixPosition(t.matrixWorld),n.position.copy(bs),Ia.copy(n.position),Ia.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Ia),n.updateMatrixWorld(),s.makeTranslation(-bs.x,-bs.y,-bs.z),Sc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sc)}}class Xg extends tl{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Wg}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class qg{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=bc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=bc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function bc(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uo);const Dh={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class hs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Yg=new vh(-1,1,1,-1,0,1);class $g extends Re{constructor(){super(),this.setAttribute("position",new oe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new oe([0,2,0,0,2,0],2))}}const Kg=new $g;class el{constructor(t){this._mesh=new dt(Kg,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Yg)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class jg extends hs{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof de?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Ns.clone(t.uniforms),this.material=new de({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new el(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Ec extends hs{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class Jg extends hs{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Zg{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new rt);this._width=n.width,this._height=n.height,e=new nn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:yn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new jg(Dh),this.copyPass.material.blending=In,this.clock=new qg}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Ec!==void 0&&(a instanceof Ec?n=!0:a instanceof Jg&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new rt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Qg extends hs{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Tt}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}}const tv={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Tt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ss extends hs{constructor(t,e,n,s){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new rt(t.x,t.y):new rt(256,256),this.clearColor=new Tt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new nn(r,a,{type:yn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const f=new nn(r,a,{type:yn});f.texture.name="UnrealBloomPass.h"+u,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const d=new nn(r,a,{type:yn});d.texture.name="UnrealBloomPass.v"+u,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),a=Math.round(a/2)}const o=tv;this.highPassUniforms=Ns.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new de({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new rt(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Dh;this.copyUniforms=Ns.clone(h.uniforms),this.blendMaterial=new de({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:_n,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Tt,this.oldClearAlpha=1,this.basic=new pi,this.fsQuad=new el(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new rt(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=ss.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ss.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=a}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new de({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new rt(.5,.5)},direction:{value:new rt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new de({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}ss.BlurDirectionX=new rt(1,0);ss.BlurDirectionY=new rt(0,1);const ev={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class nv extends hs{constructor(){super();const t=ev;this.uniforms=Ns.clone(t.uniforms),this.material=new Hg({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new el(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},qt.getTransfer(this._outputColorSpace)===ee&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Gc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Vc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Wc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Fo?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Xc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===qc&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class iv extends bh{constructor(){super();const t=new Lt;t.deleteAttribute("uv");const e=new Ye({side:Oe}),n=new Ye,s=new Xg(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);const r=new dt(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);const a=new dt(t,n);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);const o=new dt(t,n);o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),this.add(o);const l=new dt(t,n);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);const c=new dt(t,n);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);const h=new dt(t,n);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);const u=new dt(t,n);u.position.set(-2.193,-.369,-5.547),u.rotation.set(0,.516,0),u.scale.set(3.875,3.487,2.986),this.add(u);const f=new dt(t,Vi(50));f.position.set(-16.116,14.37,8.208),f.scale.set(.1,2.428,2.739),this.add(f);const d=new dt(t,Vi(50));d.position.set(-16.109,18.021,-8.207),d.scale.set(.1,2.425,2.751),this.add(d);const v=new dt(t,Vi(17));v.position.set(14.904,12.198,-1.832),v.scale.set(.15,4.265,6.331),this.add(v);const g=new dt(t,Vi(43));g.position.set(-.462,8.89,14.52),g.scale.set(4.38,5.441,.088),this.add(g);const m=new dt(t,Vi(20));m.position.set(3.235,11.486,-12.541),m.scale.set(2.5,2,.1),this.add(m);const p=new dt(t,Vi(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function Vi(i){const t=new pi;return t.color.setScalar(i),t}const Tc={low:{name:"low",pixelRatio:1,spots:!1,shadows:!1,shadowSize:256,softShadows:!1,bloom:!1,haze:!1,volumes:!1,bakeRes:8,floorRes:32,msaa:0},medium:{name:"medium",pixelRatio:1.5,spots:!0,shadows:!0,shadowSize:512,softShadows:!1,bloom:!0,haze:!0,volumes:!1,bakeRes:12,floorRes:48,msaa:2},high:{name:"high",pixelRatio:2,spots:!0,shadows:!0,shadowSize:1024,softShadows:!0,bloom:!0,haze:!0,volumes:!0,bakeRes:16,floorRes:64,msaa:4}};function sv(i){let t="";try{if(i){const s=i.getExtension("WEBGL_debug_renderer_info");t=String(s?i.getParameter(s.UNMASKED_RENDERER_WEBGL):i.getParameter(i.RENDERER)).toLowerCase()}}catch{}let e=!1;try{e=matchMedia("(pointer: coarse)").matches}catch{}const n=navigator.hardwareConcurrency||4;return/swiftshader|llvmpipe|software|basic render/.test(t)||e||n<=2?"low":/nvidia|geforce|rtx|radeon rx|apple m\d|apple gpu/.test(t)&&n>=8?"high":"medium"}function Nn(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ge(i,t,e=0){let n=i*374761393+t*668265263+e*2147483647|0;return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function Qt(i,t){const e=document.createElement("canvas");e.width=i,e.height=t;const n=e.getContext("2d");if(!n)throw new Error("2D canvas unavailable");return[e,n]}function rv(i,t,e,n){const s=Math.floor(i),r=Math.floor(t),a=i-s,o=t-r,l=(g,m)=>Ge((g%e+e)%e,(m%e+e)%e,n),c=a*a*(3-2*a),h=o*o*(3-2*o),u=l(s,r),f=l(s+1,r),d=l(s,r+1),v=l(s+1,r+1);return u+(f-u)*c+(d-u)*h+(u-f-d+v)*c*h}function Ih(i,t,e,n,s=4){let r=0,a=.5,o=1,l=0;for(let c=0;c<s;c++)r+=a*rv(i*o,t*o,e*o,n+c*17),l+=a,a*=.5,o*=2;return r/l}function vi(i,t,e,n,s,r){const o=Math.ceil(t/4),l=Math.ceil(e/4),[c,h]=Qt(o,l),u=h.createImageData(o,l);for(let f=0;f<l;f++)for(let d=0;d<o;d++){const v=Ih(d*4/n,f*4/n,4096,r,5),g=Math.max(0,(v-.45)*2.2)*s,m=(f*o+d)*4;u.data[m]=14,u.data[m+1]=12,u.data[m+2]=10,u.data[m+3]=Math.min(255,g*255)}h.putImageData(u,0,0),i.imageSmoothingEnabled=!0,i.drawImage(c,0,0,t,e)}function Uh(i,t,e=i.width,n=i.height){const[s,r]=Qt(e,n);r.drawImage(i,0,0,e,n);const a=r.getImageData(0,0,e,n),o=new Float32Array(e*n);for(let h=0;h<o.length;h++)o[h]=a.data[h*4]/255;const l=(h,u)=>o[Math.min(n-1,Math.max(0,u))*e+Math.min(e-1,Math.max(0,h))],c=r.createImageData(e,n);for(let h=0;h<n;h++)for(let u=0;u<e;u++){const f=(l(u+1,h-1)+2*l(u+1,h)+l(u+1,h+1)-l(u-1,h-1)-2*l(u-1,h)-l(u-1,h+1))*t,d=(l(u-1,h+1)+2*l(u,h+1)+l(u+1,h+1)-l(u-1,h-1)-2*l(u,h-1)-l(u+1,h-1))*t,v=Math.hypot(f,d,1),g=(h*e+u)*4;c.data[g]=(-f/v*.5+.5)*255,c.data[g+1]=(d/v*.5+.5)*255,c.data[g+2]=1/v*255,c.data[g+3]=255}return r.putImageData(c,0,0),s}function ge(i,t,e=!1){const n=new Wr(i);return n.colorSpace=t?Ae:Ln,n.anisotropy=4,e&&(n.wrapS=n.wrapT=Pr),n.needsUpdate=!0,n}function av(i,t){const[e,n]=Qt(i,i),[s,r]=Qt(i,i),a=Nn(t),o=40+Math.floor(a()*6);n.fillStyle=`rgb(${o},${o+3},${o+6})`,n.fillRect(0,0,i,i),r.fillStyle="#7a7a7a",r.fillRect(0,0,i,i);const l=i/2;for(let c=0;c<4;c++){const h=c%2*l,u=Math.floor(c/2)*l,f=(a()-.5)*6;n.fillStyle=`rgba(${o+f},${o+3+f},${o+7+f},1)`,n.fillRect(h+1,u+1,l-2,l-2);const d=4;for(let v=0;v<d;v++)for(let g=0;g<d;g++){const m=h+(g+.5)*(l/d),p=u+(v+.5)*(l/d),x=l/d*.27;r.fillStyle="#c8c8c8",r.beginPath(),r.arc(m,p,x,0,Math.PI*2),r.fill(),n.fillStyle=`rgba(${o+10},${o+13},${o+16},0.9)`,n.beginPath(),n.arc(m-x*.2,p-x*.2,x*.8,0,Math.PI*2),n.fill()}}return n.fillStyle="rgba(8,9,10,0.9)",n.fillRect(0,0,i,1),n.fillRect(0,0,1,i),n.fillRect(0,l-.5,i,1),n.fillRect(l-.5,0,1,i),r.fillStyle="#303030",r.fillRect(0,0,i,1),r.fillRect(0,0,1,i),r.fillRect(0,l-.5,i,1),r.fillRect(l-.5,0,1,i),{albedo:e,height:s}}function ov(i,t){const[e,n]=Qt(i,i),[s,r]=Qt(i,i),a=Nn(t),o=50+Math.floor(a()*8);n.fillStyle=`rgb(${o},${o+2},${o+4})`,n.fillRect(0,0,i,i),r.fillStyle="#707070",r.fillRect(0,0,i,i);const l=6,c=i/l;for(let h=0;h<l;h++)for(let u=0;u<l;u++){const f=(u+.5)*c,d=(h+.5)*c,v=(u+h)%2?Math.PI/4:-Math.PI/4;for(const[g,m]of[[n,`rgba(${o+26},${o+28},${o+30},1)`],[r,"#d8d8d8"]])g.save(),g.translate(f,d),g.rotate(v),g.fillStyle=m,g.fillRect(-c*.34,-c*.07,c*.68,c*.14),g.restore()}n.fillStyle="rgba(10,10,12,0.9)",n.fillRect(0,0,i,1),n.fillRect(0,0,1,i);for(const[h,u]of[[3,3],[i-4,3],[3,i-4],[i-4,i-4]])n.fillStyle="rgba(120,124,128,0.9)",n.beginPath(),n.arc(h,u,1.6,0,Math.PI*2),n.fill();return{albedo:e,height:s}}function lv(i,t){const e=i.map.w,n=i.map.h,[s,r]=Qt(e*t,n*t),[a,o]=Qt(e*t,n*t),[l,c]=Qt(e*16,n*16),h=[0,1,2].map(v=>({rub:av(t,11+v*7),tread:ov(t,31+v*5)}));for(let v=0;v<n;v++)for(let g=0;g<e;g++){const m=xe(i.map,g,v),p=h[Math.floor(Ge(g,v,3)*3)],x=m===jn,M=x?p.tread:p.rub;if(r.drawImage(M.albedo,g*t,v*t),o.drawImage(M.height,g*t,v*t),c.fillStyle=x?"rgb(115,115,115)":"rgb(225,225,225)",m===De&&(c.fillStyle="rgb(240,240,240)"),c.fillRect(g*16,v*16,16,16),m===mi){r.save(),r.beginPath(),r.rect(g*t,v*t,t,t),r.clip();for(let S=-t;S<t*2;S+=t/4)r.fillStyle="rgba(176,138,40,0.55)",r.beginPath(),r.moveTo(g*t+S,v*t),r.lineTo(g*t+S+t/8,v*t),r.lineTo(g*t+S+t/8-t,v*t+t),r.lineTo(g*t+S-t,v*t+t),r.fill();r.restore(),r.fillStyle="rgba(20,20,20,0.6)",r.fillRect(g*t+t*.12,v*t+t*.12,t*.76,t*.76)}m===mn&&(r.fillStyle="rgb(70,74,78)",r.fillRect(g*t+t*.05,v*t+t*.05,t*.9,t*.9),r.fillStyle="rgba(20,22,24,0.9)",xe(i.map,g-1,v)===De?r.fillRect(g*t,v*t+t*.47,t,t*.06):r.fillRect(g*t+t*.47,v*t,t*.06,t),c.fillStyle="rgb(130,130,130)",c.fillRect(g*16,v*16,16,16))}const u=(v,g)=>{const m=xe(i.map,v,g);return m===De||m===_i||m===kr};for(let v=0;v<n;v++)for(let g=0;g<e;g++){if(u(g,v))continue;const m=g*t,p=v*t,x=(S,L,A,R,C,y,_,w,O,D)=>{if(!u(g+S,v+L))return;const k=r.createLinearGradient(A,R,C,y);k.addColorStop(0,"rgba(0,0,0,0.55)"),k.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=k,r.fillRect(_,w,O,D)},M=t*.32;x(0,-1,m,p,m,p+M,m,p,t,M),x(0,1,m,p+t,m,p+t-M,m,p+t-M,t,M),x(-1,0,m,p,m+M,p,m,p,M,t),x(1,0,m+t,p,m+t-M,p,m+t-M,p,M,t)}vi(r,e*t,n*t,t*1.6,.75,91);const f=Nn(77);r.strokeStyle="rgba(150,150,140,0.06)",r.lineWidth=1;for(let v=0;v<e*n*.8;v++){const g=f()*e*t,m=f()*n*t,p=f()*Math.PI,x=t*(.1+f()*.3);r.beginPath(),r.moveTo(g,m),r.lineTo(g+Math.cos(p)*x,m+Math.sin(p)*x),r.stroke()}vi(c,e*16,n*16,24,.35,92);const d=Uh(a,2.2,Math.round(e*t*.5),Math.round(n*t*.5));return{map:ge(s,!0),rough:ge(l,!1),normal:ge(d,!1)}}function cv(i){const e=Math.round(256*i),[n,s]=Qt(256*4,e),[r,a]=Qt(256*4,e),o=e*(1-.42/i);s.fillStyle="#4e555a",s.fillRect(0,0,256*4,o),s.fillStyle="#2e363c",s.fillRect(0,o,256*4,e-o),s.fillStyle="#c99a3d",s.fillRect(0,o-5,256*4,4),s.fillStyle="#23292e",s.fillRect(0,e-14,256*4,14),a.fillStyle="#808080",a.fillRect(0,0,256*4,e),a.fillStyle="#9a9a9a",a.fillRect(0,e-14,256*4,14);for(let g=0;g<256*4;g+=256/2){s.fillStyle="rgba(20,22,24,0.35)",s.fillRect(g,0,2,o-6),a.fillStyle="#5a5a5a",a.fillRect(g,0,2,e-14);for(const m of[.22,.5])s.fillStyle="rgba(30,32,34,0.6)",s.beginPath(),s.arc(g+256/4,e*m,3,0,Math.PI*2),s.fill(),a.fillStyle="#404040",a.beginPath(),a.arc(g+256/4,e*m,3,0,Math.PI*2),a.fill()}const l=s.getImageData(0,0,256*4,e);for(let g=0;g<e;g++)for(let m=0;m<256*4;m++){const p=Ih(m/40,g/40,4096,5,4)-.5,x=(g*256*4+m)*4,M=1+p*.28+(Ge(m,g,9)-.5)*.06;l.data[x]*=M,l.data[x+1]*=M,l.data[x+2]*=M}s.putImageData(l,0,0);const c=s.createLinearGradient(0,e,0,e*.6);c.addColorStop(0,"rgba(10,8,6,0.55)"),c.addColorStop(1,"rgba(10,8,6,0)"),s.fillStyle=c,s.fillRect(0,e*.6,256*4,e*.4);const h=Nn(13);for(let g=0;g<90;g++)s.fillStyle=`rgba(${h()<.5?"15,15,15":"120,110,95"},${.05+h()*.12})`,s.fillRect(h()*256*4,o+h()*(e-o),6+h()*30,1+h()*3);for(let g=0;g<6;g++){const m=h()*256*4,p=10+h()*30,x=e*(.15+h()*.35),M=s.createLinearGradient(0,0,0,x);M.addColorStop(0,"rgba(25,22,18,0.35)"),M.addColorStop(1,"rgba(25,22,18,0)"),s.fillStyle=M,s.fillRect(m,0,p,x)}const[u,f]=Qt(64,64);f.fillStyle="rgb(220,220,220)",f.fillRect(0,0,64,64);const d=ge(n,!0,!0);d.repeat.set(.25,1);const v=ge(Uh(r,1.5,256*2,Math.round(e/2)),!1,!0);return v.repeat.set(.25,1),{map:d,normal:v,rough:ge(u,!1,!0)}}function hv(){const[i,t]=Qt(128,128);t.fillStyle="#24282c",t.fillRect(0,0,128,128);const e=t.getImageData(0,0,128,128);for(let n=0;n<128*128;n++){const s=.85+Ge(n%128,n/128|0,4)*.3;e.data[n*4]*=s,e.data[n*4+1]*=s,e.data[n*4+2]*=s}return t.putImageData(e,0,0),t.strokeStyle="rgba(120,128,134,0.7)",t.lineWidth=4,t.strokeRect(2,2,124,124),ge(i,!0,!0)}function uv(i="#8b9197"){const[t,e]=Qt(256,256),[n,s]=Qt(256,256);e.fillStyle=i,e.fillRect(0,0,256,256),s.fillStyle="rgb(110,110,110)",s.fillRect(0,0,256,256);const r=Nn(3);for(let a=0;a<900;a++){const o=r()*256,l=30+r()*140,c=r()*256,h=r()*.12;e.fillStyle=r()<.5?`rgba(255,255,255,${h})`:`rgba(0,0,0,${h})`,e.fillRect(c,o,l,1),s.fillStyle=`rgba(${r()<.5?"160,160,160":"70,70,70"},${h*2})`,s.fillRect(c,o,l,1)}return vi(e,256,256,60,.35,21),{map:ge(t,!0,!0),rough:ge(n,!1,!0)}}function fv(){const[i,t]=Qt(256,320);t.fillStyle="#4b5853",t.fillRect(0,0,256,320),t.fillStyle="#3d4844",t.fillRect(8,8,240,304),t.fillStyle="#56645e",t.fillRect(14,14,228,292);for(let n=0;n<6;n++)t.fillStyle="#151a18",t.fillRect(70,34+n*12,116,5),t.fillStyle="rgba(160,170,165,0.35)",t.fillRect(70,39+n*12,116,1);for(let n=0;n<4;n++)t.fillStyle="#151a18",t.fillRect(70,252+n*12,116,5);t.fillStyle="#20262a",t.fillRect(196,150,16,46),t.fillStyle="#9aa2a6",t.fillRect(199,154,10,38),t.fillStyle="#d8d2bf",t.fillRect(96,130,64,26),t.fillStyle="#2a2a2a",t.font='600 18px "IBM Plex Mono", monospace',t.textAlign="center",t.textBaseline="middle",t.fillText(String(10+Math.floor(Math.random()*80)),128,144),vi(t,256,320,50,.5,44);const e=Nn(8);for(let n=0;n<40;n++)t.fillStyle=`rgba(170,175,170,${e()*.15})`,t.fillRect(e()*256,e()*320,1+e()*8,1);return ge(i,!0)}function dv(){const[i,t]=Qt(256,288),[e,n]=Qt(256,288);t.fillStyle="#121518",t.fillRect(0,0,256,288),n.fillStyle="#000",n.fillRect(0,0,256,288),t.fillStyle="#2a2f34",t.fillRect(0,0,10,288),t.fillRect(246,0,10,288);const s=Nn(51);let r=10;for(;r<270;){const o=(s()<.7?1:2)*18;t.fillStyle=s()<.5?"#1c2024":"#24292e",t.fillRect(14,r,228,o-2);for(let c=30;c<160;c+=6)t.fillStyle="rgba(0,0,0,0.6)",t.fillRect(c,r+4,3,o-10);const l=2+Math.floor(s()*4);for(let c=0;c<l;c++){const h=s()<.65?"#5dff9a":s()<.6?"#ffb347":"#6bb8ff";n.fillStyle=h,n.fillRect(190+c*10,r+6,4,3),t.fillStyle=h,t.fillRect(190+c*10,r+6,4,3)}r+=o}return{map:ge(i,!0),emissive:ge(e,!0)}}function pv(){const[i,t]=Qt(256,288);t.fillStyle="#0d0f11",t.fillRect(0,0,256,288);const e=Nn(61);for(let n=0;n<4;n++){const s=8+n*70;let r=10;for(;r<240;){const a=26+e()*30,o=40+e()*20,l=e();t.fillStyle=l<.6?`rgb(${150+e()*30},${130+e()*20},${95+e()*15})`:`rgb(${90+e()*20},${95+e()*20},${100+e()*20})`,t.fillRect(r,s+62-o,Math.min(a,246-r),o),t.fillStyle="#efe9d8",t.fillRect(r+a*.25,s+62-o+10,a*.5,9),r+=a+3}t.fillStyle="#7d858c",t.fillRect(0,s+62,256,6)}return t.fillStyle="#5f676e",t.fillRect(0,0,8,288),t.fillRect(248,0,8,288),vi(t,256,288,50,.4,62),ge(i,!0)}function Ac(i){const[t,e]=Qt(256,256),n=Nn(i);if(n()<.5){e.fillStyle=n()<.5?"#3d4f63":"#5a5f3a",e.fillRect(0,0,256,256),e.fillStyle="rgba(0,0,0,0.25)";for(let r=0;r<5;r++)e.fillRect(20,30+r*44,216,14);e.fillStyle="#e6dcc3",e.fillRect(150,190,80,36),e.fillStyle="#222",e.font='600 16px "IBM Plex Mono", monospace',e.fillText(`HX-${Math.floor(n()*900+100)}`,156,214)}else{for(let r=0;r<6;r++){const a=95+n()*25;e.fillStyle=`rgb(${a},${a*.76},${a*.5})`,e.fillRect(0,r*43,256,42),e.fillStyle="rgba(30,20,10,0.6)",e.fillRect(0,r*43+41,256,2)}e.fillStyle="rgba(60,40,20,0.9)",e.fillRect(0,0,256,18),e.fillRect(0,238,256,18),e.fillRect(0,0,18,256),e.fillRect(238,0,18,256),e.fillStyle="rgba(25,25,25,0.75)",e.font='800 34px "Big Shoulders Stencil Display", sans-serif',e.fillText("HALCYON",52,140)}return vi(e,256,256,40,.5,i+1),ge(t,!0)}function mv(){const[i,t]=Qt(256,288);t.fillStyle="#8c8a80",t.fillRect(0,0,256,288);for(let e=0;e<4;e++){const n=8+e*70;t.fillStyle="#9a978c",t.fillRect(8,n,240,64),t.fillStyle="rgba(0,0,0,0.4)",t.fillRect(8,n+63,240,3),t.fillStyle="#4b4a45",t.fillRect(100,n+18,56,10),t.fillStyle="#e8e2cf",t.fillRect(108,n+36,40,14)}return vi(t,256,288,40,.55,71),ge(i,!0)}function gv(){const[i,t]=Qt(128,64);t.fillStyle="#2b3136",t.fillRect(0,0,128,64);for(let e=0;e<8;e++)t.fillStyle="#0a0c0d",t.fillRect(8,6+e*7,112,4);return t.strokeStyle="#535b62",t.lineWidth=3,t.strokeRect(1.5,1.5,125,61),ge(i,!0)}function vv(){const[i,t]=Qt(128,128);t.fillStyle="#1d2124",t.fillRect(0,0,128,128);for(let e=0;e<14;e++)t.fillStyle="#050606",t.fillRect(10,10+e*8,108,4);return t.strokeStyle="#4a5157",t.lineWidth=4,t.strokeRect(2,2,124,124),ge(i,!0)}function _v(){const[i,t]=Qt(256,256);t.fillStyle="#000",t.fillRect(0,0,256,256),t.strokeStyle="#fff",t.lineWidth=10,t.strokeRect(14,14,228,228),t.lineWidth=16,t.lineJoin="miter";for(const e of[110,170])t.beginPath(),t.moveTo(70,e),t.lineTo(128,e-50),t.lineTo(186,e),t.stroke();return ge(i,!0)}function xv(){const[i,t]=Qt(128,128);return t.clearRect(0,0,128,128),t.strokeStyle="#fff",t.lineWidth=7,t.beginPath(),t.moveTo(64,14),t.lineTo(114,64),t.lineTo(64,114),t.lineTo(14,64),t.closePath(),t.stroke(),t.fillStyle="rgba(255,255,255,0.25)",t.fill(),ge(i,!0)}function yv(){const[i,t]=Qt(128,64);t.fillStyle="#a9b8bf",t.fillRect(0,0,128,64);const e=t.getImageData(0,0,128,64);for(let n=0;n<128*64;n++){const s=.9+Ge(n%128,n/128|0,12)*.2;e.data[n*4]*=s,e.data[n*4+1]*=s,e.data[n*4+2]*=s}return t.putImageData(e,0,0),t.fillStyle="rgba(255,255,255,0.2)",t.fillRect(0,20,128,3),ge(i,!0,!0)}function Mv(i,t){const[e,n]=Qt(64,64);n.fillStyle=i,n.fillRect(0,0,64,64);const s=n.getImageData(0,0,64,64);for(let r=0;r<64;r++)for(let a=0;a<64;a++){const o=.92+(a+r)%2*.05+Ge(a,r,t)*.08,l=(r*64+a)*4;s.data[l]*=o,s.data[l+1]*=o,s.data[l+2]*=o}return n.putImageData(s,0,0),ge(e,!0,!0)}const Te=1.25,Ps=1.42,Xr=8,mr=4.6,Sv=.06;function bv(){return{uBake:{value:null},uBeaconIdx:{value:null},uBakeSize:{value:new rt(1,1)},uBakeGain:{value:2.2},uAlert:{value:0},uAlertCol:{value:new Tt(1,.55,.15)},uBeacons:{value:Array.from({length:Xr},()=>new P(-999,-999,0))},uSweep:{value:1},uTime:{value:0},uCut:{value:new P},uCutOn:{value:0},uEmerg:{value:0}}}const Co=i=>i!==De&&i!==jn&&i!==_i,Ev=(i,t,e)=>{const n=xe(i.map,t,e);return n===De||n===_i};function Po(i,t,e,n,s){let r=Math.floor(t),a=Math.floor(e);const o=Math.floor(n),l=Math.floor(s),c=n-t,h=s-e,u=c>0?1:-1,f=h>0?1:-1,d=c===0?1/0:Math.abs(1/c),v=h===0?1/0:Math.abs(1/h);let g=c===0?1/0:(u>0?r+1-t:t-r)*d,m=h===0?1/0:(f>0?a+1-e:e-a)*v;for(let p=0;p<64&&(r!==o||a!==l);p++){if(g<m?(g+=d,r+=u):(m+=v,a+=f),r===o&&a===l)return!0;if(Ev(i,r,a))return!1}return!0}function Tv(i){const t=[],e=i.map.w,n=i.map.h;for(let s=0;s<n;s++)for(let r=0;r<e;r++){if(!Co(xe(i.map,r,s)))continue;const a=r+.5,o=s+.5;if(t.some(d=>Math.hypot(d.x-a,d.y-o)<3.4&&Po(i,d.x,d.y,a,o)))continue;let l=a,c=o;const h=(d,v)=>Co(xe(i.map,r+d,s+v));h(0,1)&&!h(0,-1)&&(c+=.5),h(1,0)&&!h(-1,0)&&(l+=.5);const u=(h(-1,0)?1:0)+(h(1,0)?1:0)+(h(2,0)?1:0),f=(h(0,-1)?1:0)+(h(0,1)?1:0)+(h(0,2)?1:0);t.push({x:l,y:c,horiz:u>=f,warm:Ge(r,s,41)<.12})}return t}function Av(i,t){const e=i.map.w,n=i.map.h,s=Tv(i),r=e*t,a=n*t,o=new Float32Array(r*a*3),l=Array.from({length:e*n},()=>[]);s.forEach((g,m)=>{const p=Math.ceil(mr);for(let x=-p;x<=p;x++)for(let M=-p;M<=p;M++){const S=Math.floor(g.x)+M,L=Math.floor(g.y)+x;S>=0&&L>=0&&S<e&&L<n&&l[L*e+S].push(m)}});const c=Ps*Ps;for(let g=0;g<n;g++)for(let m=0;m<e;m++){const p=xe(i.map,m,g);if(p===De)continue;const x=Co(p)?1:Sv,M=l[g*e+m];for(let S=0;S<t;S++)for(let L=0;L<t;L++){const A=m+(L+.5)/t,R=g+(S+.5)/t;let C=0,y=0,_=0;for(const O of M){const D=s[O],k=D.horiz?Math.max(-.45,Math.min(.45,A-D.x)):0,X=D.horiz?0:Math.max(-.45,Math.min(.45,R-D.y)),V=Math.hypot(A-D.x-k,R-D.y-X);if(V>mr||!Po(i,D.x,D.y,A,R))continue;const Y=Math.pow(c/(c+V*V),2.2)*(1-(V/mr)**4)+.035*(1-V/mr);D.warm?(C+=Y*1,y+=Y*.83,_+=Y*.62):(C+=Y*.86,y+=Y*.94,_+=Y*1)}const w=((g*t+S)*r+m*t+L)*3;o[w]=C*x,o[w+1]=y*x,o[w+2]=_*x}}const h=new Uint8Array(r*a*4);for(let g=0;g<a;g++)for(let m=0;m<r;m++){let p=0,x=0,M=0,S=0;for(let A=-1;A<=1;A++)for(let R=-1;R<=1;R++){const C=m+R,y=g+A;if(C<0||y<0||C>=r||y>=a)continue;const _=(y*r+C)*3;p+=o[_],x+=o[_+1],M+=o[_+2],S++}const L=(g*r+m)*4;h[L]=Math.min(255,p/S/2*255),h[L+1]=Math.min(255,x/S/2*255),h[L+2]=Math.min(255,M/S/2*255),h[L+3]=255}const u=new Ro(h,r,a,$e,hn);u.flipY=!1,u.magFilter=en,u.minFilter=en,u.wrapS=u.wrapT=Xn,u.needsUpdate=!0;const f=[];for(const g of s){if(f.length>=Xr)break;f.some(m=>Math.hypot(m.x-g.x,m.y-g.y)<8)||f.push({x:g.x,y:g.y,phase:Ge(Math.floor(g.x),Math.floor(g.y),5)*Math.PI*2})}const d=new Uint8Array(e*n*4);for(let g=0;g<n;g++)for(let m=0;m<e;m++){if(xe(i.map,m,g)===De)continue;let p=-1,x=1e9;f.forEach((M,S)=>{const L=Math.hypot(M.x-m-.5,M.y-g-.5);L<11&&L<x&&Po(i,M.x,M.y,m+.5,g+.5)&&(x=L,p=S)}),d[(g*e+m)*4]=p+1,d[(g*e+m)*4+3]=255}const v=new Ro(d,e,n,$e,hn);return v.magFilter=ke,v.minFilter=ke,v.needsUpdate=!0,{light:u,beaconIdx:v,fixtures:s,beacons:f}}const wv=`
varying vec3 vBW;
varying vec3 vBN;
`,Rv=`
{
  vec4 bw4 = vec4(transformed, 1.0);
  vec3 bn = objectNormal;
  #ifdef USE_INSTANCING
    bw4 = instanceMatrix * bw4;
    bn = mat3(instanceMatrix) * bn;
  #endif
  vBW = (modelMatrix * bw4).xyz;
  vBN = normalize(mat3(modelMatrix) * bn);
}
`,Cv=`
varying vec3 vBW;
varying vec3 vBN;
uniform sampler2D uBake;
uniform sampler2D uBeaconIdx;
uniform vec2 uBakeSize;
uniform float uBakeGain;
uniform float uAlert;
uniform vec3 uAlertCol;
uniform vec3 uBeacons[${Xr}];
uniform float uSweep;
uniform float uTime;
uniform vec3 uCut;
uniform float uCutOn;
uniform float uEmerg;
`,Pv=`
if (uCutOn > 0.5) {
  vec2 cd = vBW.xz - uCut.xz;
  float lim = 1.55 - max(cd.y, 0.0) * 0.18;
  if (cd.y > -0.35 && cd.y < 2.6 && abs(cd.x) < lim && vBW.y > 0.36) discard;
}
`,Lv=`
{
  vec2 side = vBN.xz * step(0.5, length(vBN.xz)) * 0.3;
  vec2 bUv = (vBW.xz + side) / uBakeSize;
  vec3 baked = texture2D(uBake, bUv).rgb * uBakeGain;
  float wallish = step(0.5, length(vBN.xz));
  float hf = mix(1.0, 0.62 + 0.45 * clamp(vBW.y / ${Te.toFixed(2)}, 0.0, 1.0), wallish);
  irradiance += baked * hf;
  if (uAlert > 0.001 || uEmerg > 0.001) {
    float bi = floor(texture2D(uBeaconIdx, bUv).r * 255.0 + 0.5) - 1.0;
    float sweep = 0.0;
    for (int i = 0; i < ${Xr}; i++) {
      if (abs(float(i) - bi) < 0.5) {
        vec3 b = uBeacons[i];
        vec2 d = vBW.xz - b.xy;
        float r = length(d);
        float ang = atan(d.y, d.x);
        float lobe = pow(abs(cos(ang - uTime * 2.4 - b.z)), 10.0);
        lobe = mix(0.3, lobe, uSweep);
        sweep = lobe * (1.0 / (1.0 + r * r * 0.22)) * smoothstep(11.0, 5.0, r);
      }
    }
    irradiance += uAlertCol * ((sweep * 2.6 + 0.04) * max(uAlert, uEmerg) + uEmerg * 0.1);
  }
}
`;function Lo(i,t,e={}){return i.onBeforeCompile=n=>{Object.assign(n.uniforms,t),n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
${wv}`).replace("#include <project_vertex>",`#include <project_vertex>
${Rv}`),n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
${Cv}`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
${e.cut?Pv:""}`).replace("#include <lights_fragment_maps>",`#include <lights_fragment_maps>
${Lv}`)},i.customProgramCacheKey=()=>`bake-${e.cut?1:0}`,i}const Ze=1,Ee=i=>new Tt(i),wc={patrol:Ee("#dce4e6"),suspicious:Ee("#f0a541"),alert:Ee("#e2483d"),search:Ee("#b58cff"),camera:Ee("#9fd8ff"),laser:Ee("#5ef2ff"),ok:Ee("#6dffa6"),locked:Ee("#e2483d"),amber:Ee("#f0a541")},Rc={patrol:Ee("#4aa3ff"),suspicious:Ee("#ffa000"),alert:Ee("#ff7bff"),search:Ee("#ffffff"),camera:Ee("#8ec5ff"),laser:Ee("#4aa3ff"),ok:Ee("#ffffff"),locked:Ee("#ff7bff"),amber:Ee("#ffa000")};class Dv{constructor(t,e,n,s,r){G(this,"group",new ue);G(this,"bake");G(this,"doors",[]);G(this,"lasers",[]);G(this,"terminals",[]);G(this,"lockers",[]);G(this,"items",[]);G(this,"cams",[]);G(this,"checkpoints",[]);G(this,"exitMat");G(this,"exitColumn");G(this,"fixtureMat");G(this,"beaconMat");G(this,"beaconMesh",null);G(this,"fixHousing",null);G(this,"fixTube",null);G(this,"fixHidden",-2);G(this,"bag",[]);G(this,"skins",new Map);G(this,"steel");G(this,"darkSteel");G(this,"w");this.q=e,this.u=n,this.env=s,this.pal=r,this.w=t,this.bake=Av(t,e.bakeRes),this.bag.push(this.bake.light,this.bake.beaconIdx),n.uBake.value=this.bake.light,n.uBeaconIdx.value=this.bake.beaconIdx,n.uBakeSize.value.set(t.map.w,t.map.h),this.bake.beacons.forEach((o,l)=>n.uBeacons.value[l].set(o.x,o.y,o.phase));for(let o=this.bake.beacons.length;o<n.uBeacons.value.length;o++)n.uBeacons.value[o].set(-999,-999,0);const a=uv();this.bag.push(a.map,a.rough),this.steel=this.std({map:a.map,roughnessMap:a.rough,metalness:.85,roughness:.42,envMap:s,envMapIntensity:.5}),this.darkSteel=this.std({color:2369837,metalness:.6,roughness:.5,envMap:s,envMapIntensity:.3}),this.planSkins(),this.buildFloor(),this.buildWalls(),this.buildDoors(),this.buildLockers(),this.buildTerminals(),this.buildLasers(),this.buildFixtures(),this.buildItems(),this.buildMarkers(),this.buildCameras()}std(t,e=!1){const n=Lo(new Ye(t),this.u,{cut:e});return this.bag.push(n),n}keep(t){return this.bag.push(t),t}mesh(t,e,n=!0,s=!0){this.keep(t);const r=new dt(t,e);return r.castShadow=n&&this.q.shadows,r.receiveShadow=s&&this.q.shadows,this.group.add(r),r}k(t,e){return xe(this.w.map,t,e)}isWall(t,e){return this.k(t,e)===De}openFloor(t,e){const n=this.k(t,e);return n===Nc||n===jn}planSkins(){const t=this.w,e=t.map.w,n=t.map.h,s={0:[["crates",.5],["shelf",.8],["cabinet",1]],1:[["rack",.75],["cabinet",1]],2:[["shelf",.5],["cabinet",.9],["rack",1]],3:[["rack",.5],["crates",.8],["shelf",1]]},r=s[t.def.index]??s[0],a=(l,c)=>t.cameras.some(h=>Math.hypot(h.x-l-.5,h.y-c-.5)<2),o=(l,c)=>{for(let h=-1;h<=1;h++)for(let u=-1;u<=1;u++)if(this.k(l+u,c+h)===mn||this.k(l+u,c+h)===mi)return!0;return!1};for(let l=0;l<n;l++)for(let c=0;c<e;c++)if(this.isWall(c,l))for(const[h,u]of[[0,1],[0,-1],[1,0],[-1,0]]){if(!this.openFloor(c+h,l+u))continue;const f=this.isWall(c-h,l-u),d=this.isWall(c+u,l+h),v=this.isWall(c-u,l-h);if(!f||!d||!v||a(c,l)||o(c,l)||Ge(Math.floor(c/3),Math.floor(l/3),17+t.def.index)>.46||Ge(c,l,23)>.82)continue;const m=Ge(Math.floor(c/3),Math.floor(l/3),29),p=r.find(x=>m<=x[1])?.[0]??"cabinet";this.skins.set(l*e+c,{skin:p,nx:h,ny:u});break}}buildFloor(){const t=this.w,e=lv(t,this.q.floorRes);this.bag.push(e.map,e.rough,e.normal);const n=new ze(t.map.w,t.map.h);n.rotateX(-Math.PI/2),n.translate(t.map.w/2,0,t.map.h/2);const s=this.std({map:e.map,roughnessMap:e.rough,normalMap:e.normal,normalScale:new rt(.8,.8),roughness:1,metalness:.05,envMap:this.env,envMapIntensity:.12}),r=this.mesh(n,s,!1,!0);r.renderOrder=0;const a=this.keep(vv()),o=this.std({map:a,roughness:.6,metalness:.6,envMap:this.env,envMapIntensity:.3,polygonOffset:!0,polygonOffsetFactor:-1}),l=[];for(let c=0;c<t.map.h;c++)for(let h=0;h<t.map.w;h++)this.k(h,c)===jn&&Ge(h,c,61)<.12&&l.push(new rt(h,c));if(l.length){const c=this.keep(new ze(.62,.62).rotateX(-Math.PI/2)),h=this.keep(new cn(c,o,l.length)),u=new Ht;l.forEach((f,d)=>{u.makeTranslation(f.x+.5,.004,f.y+.5),h.setMatrixAt(d,u)}),h.receiveShadow=this.q.shadows,this.group.add(h)}}buildWalls(){const t=this.w,e=t.map.w,n=t.map.h,s=[],r=[],a=[],o=[[],[],[]],l=(y,_,w,O)=>{const D=s.length/3;for(let _t=0;_t<4;_t++)s.push(..._[_t]),r.push(...w),a.push(...O[_t]);const k=_[0],X=_[1],V=_[2],Y=X[0]-k[0],W=X[1]-k[1],Q=X[2]-k[2],nt=V[0]-k[0],mt=V[1]-k[1],Ct=V[2]-k[2],Kt=W*Ct-Q*mt,$=Q*nt-Y*Ct,tt=Y*mt-W*nt;Kt*w[0]+$*w[1]+tt*w[2]>=0?o[y].push(D,D+1,D+2,D,D+2,D+3):o[y].push(D,D+2,D+1,D,D+3,D+2)},c=t.def.index===1||t.def.index===2,h=.62,u=(y,_,w,O,D,k,X,V,Y)=>{const W=[w,0,O];let Q,nt;if(w!==0){const tt=w>0?y+V:y+X;Q=[tt,0,_+D],nt=[tt,0,_+k]}else{const tt=O>0?_+V:_+X;Q=[y+D,0,tt],nt=[y+k,0,tt]}const mt=w!==0?Q[2]:Q[0],Ct=w!==0?nt[2]:nt[0],Kt=tt=>tt/Te,$=Y?h*Te:Te;l(0,[[Q[0],0,Q[2]],[nt[0],0,nt[2]],[nt[0],$,nt[2]],[Q[0],$,Q[2]]],W,[[mt,0],[Ct,0],[Ct,Kt($)],[mt,Kt($)]]),Y&&l(2,[[Q[0],$,Q[2]],[nt[0],$,nt[2]],[nt[0],Te,nt[2]],[Q[0],Te,Q[2]]],W,[[mt,0],[Ct,0],[Ct,1],[mt,1]])},f=(y,_,w,O)=>{l(1,[[y,Te,_],[w,Te,_],[w,Te,O],[y,Te,O]],[0,1,0],[[y,_],[w,_],[w,O],[y,O]])},d=[],v=[],g=[],m=(y,_)=>y===1?Math.PI/2:y===-1?-Math.PI/2:_===-1?Math.PI:0;for(let y=0;y<n;y++)for(let _=0;_<e;_++){if(!this.isWall(_,y))continue;const w=this.skins.get(y*e+_),O=!this.isWall(_,y-1)&&!this.isWall(_,y+1)&&this.k(_,y-1)!==mn&&this.k(_,y+1)!==mn||!this.isWall(_-1,y)&&!this.isWall(_+1,y)&&this.k(_-1,y)!==mn&&this.k(_+1,y)!==mn,D=c&&this.isPartition(_,y);if(w){const{nx:k,ny:X}=w;let V=_,Y=_+1,W=y,Q=y+1;k===1&&(Y=_+.5),k===-1&&(V=_+.5),X===1&&(Q=y+.5),X===-1&&(W=y+.5),f(V,W,Y,Q),k!==0?u(_,y,k,0,0,1,k>0?0:.5,k>0?.5:1,!1):u(_,y,0,X,0,1,X>0?0:.5,X>0?.5:1,!1);continue}f(_,y,_+1,y+1);for(const[k,X]of[[0,-1],[0,1],[-1,0],[1,0]]){const V=_+k,Y=y+X;if(V<0||Y<0||V>=e||Y>=n)continue;const W=this.isWall(V,Y)?this.skins.get(Y*e+V):void 0;if(this.isWall(V,Y)&&!W)continue;if(W){const nt=k!==0?W.ny:W.nx;if(nt===0)continue;const mt=nt>0?.5:0,Ct=nt>0?1:.5;u(_,y,k,X,mt,Ct,0,1,!1);continue}const Q=D&&O&&this.openFloor(V,Y);if(u(_,y,k,X,0,1,0,1,Q),Q){const nt=new Ht().compose(new P(_+.5+k*.5,h*Te,y+.5+X*.5),new vn().setFromAxisAngle(new P(0,1,0),m(k,X)),new P(1,1,1));g.push(nt)}if(this.openFloor(V,Y)){const nt=new vn().setFromAxisAngle(new P(0,1,0),m(k,X));!Q&&Ge(_,y,31+k*3+X)<.32?d.push(new Ht().compose(new P(_+.5+k*.57,Te-.14,y+.5+X*.57),nt,new P(1,1,1))):!Q&&Ge(_,y,37+k*5+X)<.08&&v.push(new Ht().compose(new P(_+.5+k*.505,.9,y+.5+X*.505),nt,new P(1,1,1)))}}}const p=new Re;p.setAttribute("position",new oe(s,3)),p.setAttribute("normal",new oe(r,3)),p.setAttribute("uv",new oe(a,2));const x=[...o[0],...o[1],...o[2]];p.setIndex(x),p.addGroup(0,o[0].length,0),p.addGroup(o[0].length,o[1].length,1),p.addGroup(o[0].length+o[1].length,o[2].length,2);const M=cv(Te),S=hv(),L=yv();this.bag.push(M.map,M.normal,M.rough,S,L);const A=this.std({map:M.map,normalMap:M.normal,roughness:.92,metalness:0},!0),R=this.std({map:S,roughness:.95,metalness:0,emissive:1382684,emissiveIntensity:1},!0),C=this.std({map:L,color:7174012,roughness:.22,metalness:0,envMap:this.env,envMapIntensity:.35,emissive:659475,emissiveIntensity:1},!0);if(this.mesh(p,[A,R,C],!0,!0),d.length){const y=new Lt(1,.05,.13),_=new Lt(1,.045,.1);_.translate(0,.04,0),this.keep(y),this.keep(_);const w=this.std({color:1382170,roughness:.7}),O=this.keep(new cn(y,this.steel,d.length)),D=this.keep(new cn(_,w,d.length));d.forEach((k,X)=>{O.setMatrixAt(X,k),D.setMatrixAt(X,k)}),O.castShadow=D.castShadow=this.q.shadows,this.group.add(O,D)}if(v.length){const y=this.keep(gv()),_=this.keep(new ze(.5,.25));_.rotateY(0);const w=this.std({map:y,roughness:.6,metalness:.5,envMap:this.env,envMapIntensity:.3}),O=this.keep(new cn(_,w,v.length));v.forEach((D,k)=>O.setMatrixAt(k,D)),this.group.add(O)}if(g.length){const y=new Lt(1,.05,.05),_=new Lt(.04,(1-h)*Te,.05);_.translate(-.5,(1-h)*Te/2,0),this.keep(y),this.keep(_);const w=this.keep(new cn(y,this.darkSteel,g.length)),O=this.keep(new cn(_,this.darkSteel,g.length));g.forEach((D,k)=>{w.setMatrixAt(k,D),O.setMatrixAt(k,D)}),this.group.add(w,O)}this.buildSkins()}isPartition(t,e){const n=this.w.map.w,s=this.w.map.h;if(t<=0||e<=0||t>=n-1||e>=s-1)return!1;const r=this.openFloor(t,e-1)&&this.openFloor(t,e+1),a=this.openFloor(t-1,e)&&this.openFloor(t+1,e);return r||a}buildSkins(){const t=this.w.map.w,e=new Map;for(const[s,r]of this.skins){const a=s%t,o=Math.floor(s/t),l=r.nx===1?Math.PI/2:r.nx===-1?-Math.PI/2:r.ny===-1?Math.PI:0,c=new Ht().compose(new P(a+.5+r.nx*.25,0,o+.5+r.ny*.25),new vn().setFromAxisAngle(new P(0,1,0),l),new P(1,1,1));e.has(r.skin)||e.set(r.skin,[]),e.get(r.skin).push(c)}const n=this.std({color:2764595,roughness:.6,metalness:.5,envMap:this.env,envMapIntensity:.25});for(const[s,r]of e){let a,o;if(s==="rack"){const c=dv();this.bag.push(c.map,c.emissive);const h=this.std({map:c.map,emissiveMap:c.emissive,emissive:16777215,emissiveIntensity:2.2,roughness:.5,metalness:.4});a=new Lt(.92,1.14,.46).translate(0,.57,0),o=[n,n,n,n,h,n]}else if(s==="shelf"){const c=this.keep(pv()),h=this.std({map:c,roughness:.85});a=new Lt(.94,1.08,.44).translate(0,.54,0),o=[n,n,n,n,h,n]}else if(s==="cabinet"){const c=this.keep(mv()),h=this.std({map:c,roughness:.55,metalness:.35,envMap:this.env,envMapIntensity:.3}),u=this.std({color:9078910,roughness:.55,metalness:.35});a=new Lt(.9,.9,.46).translate(0,.45,0),o=[u,u,u,u,h,u]}else{const c=this.keep(Ac(5)),h=this.keep(Ac(9)),u=this.std({map:c,roughness:.8}),f=this.std({map:h,roughness:.8}),d=new Lt(.46,.46,.44).translate(-.24,.23,0),v=new Lt(.46,.46,.44).translate(.24,.23,0),g=new Lt(.5,.42,.42).translate(-.05,.67,0).rotateY(.08);this.keep(d),this.keep(v),this.keep(g);for(const[m,p]of[[d,u],[v,f],[g,u]]){const x=this.keep(new cn(m,p,r.length));r.forEach((M,S)=>x.setMatrixAt(S,M)),x.castShadow=x.receiveShadow=this.q.shadows,this.group.add(x)}continue}this.keep(a);const l=this.keep(new cn(a,o,r.length));r.forEach((c,h)=>l.setMatrixAt(h,c)),l.castShadow=l.receiveShadow=this.q.shadows,this.group.add(l)}}buildDoors(){const t=this.std({map:this.steel.map,color:10133927,roughness:.38,metalness:.8,envMap:this.env,envMapIntensity:.55});this.w.doors.forEach((e,n)=>{const s=this.isWall(e.x-1,e.y)||this.isWall(e.x+1,e.y),r=new ue;r.position.set(e.x+.5,0,e.y+.5),s||(r.rotation.y=Math.PI/2),this.group.add(r);const a=(f,d,v,g,m)=>{this.keep(f);const p=new dt(f,d);return p.position.set(v,g,m),p.castShadow=p.receiveShadow=this.q.shadows,r.add(p),p};a(new Lt(.07,Ze,.34),this.steel,-.465,Ze/2,0),a(new Lt(.07,Ze,.34),this.steel,.465,Ze/2,0),a(new Lt(1,Te-Ze,.34),this.darkSteel,0,Ze+(Te-Ze)/2,0);const o=a(new Lt(.5,Ze-.02,.07),t,-.25,Ze/2,0),l=a(new Lt(.5,Ze-.02,.07),t,.25,Ze/2,0);if(e.card){const f=e.card==="red"?13779791:e.card==="blue"?4032224:15254330,d=this.std({color:f,emissive:f,emissiveIntensity:.6,roughness:.5});for(const v of[o,l]){const g=new dt(this.keep(new Lt(.5,.06,.075)),d);g.position.set(0,.18,0),v.add(g)}}const c=this.std({color:1118481,emissive:16777215,emissiveIntensity:2.5});a(new Lt(.16,.05,.36),c,0,Ze+.06,0);const h=this.std({color:2230023,emissive:this.pal.locked,emissiveIntensity:1.8}),u=a(new Lt(.9,.05,.09),h,0,.55,0);this.doors.push({i:n,horiz:s,left:o,right:l,lamp:c,bar:u,open:e.open?1:0,x:e.x,y:e.y})})}faceOf(t,e){for(const[n,s]of[[0,1],[0,-1],[1,0],[-1,0]])if(this.openFloor(t+n,e+s))return[n,s];for(const[n,s]of[[0,1],[0,-1],[1,0],[-1,0]])if(!this.isWall(t+n,e+s))return[n,s];return[0,1]}yawFor(t,e){return t===1?Math.PI/2:t===-1?-Math.PI/2:e===-1?Math.PI:0}buildLockers(){const t=this.keep(fv()),e=this.std({map:t,roughness:.55,metalness:.45,envMap:this.env,envMapIntensity:.3}),n=this.std({color:4608589,roughness:.55,metalness:.45,envMap:this.env,envMapIntensity:.3}),s=this.keep(new Lt(.84,1.18,.64).translate(0,.59,0));for(const r of this.w.map.lockers){const[a,o]=this.faceOf(r.x,r.y),l=new ue;l.position.set(r.x+.5,0,r.y+.5),l.rotation.y=this.yawFor(a,o);const c=new dt(s,[n,n,n,n,e,n]);c.castShadow=c.receiveShadow=this.q.shadows,l.add(c);const h=this.std({color:329223,emissive:10483455,emissiveIntensity:0}),u=new dt(this.keep(new Lt(.012,1.08,.01)),h);u.position.set(0,.6,.325);const f=new dt(this.keep(new Lt(.8,.012,.01)),h);f.position.set(0,1.15,.325);const d=f.clone();d.position.y=.05,l.add(u,f,d);const v=this.keep(new Lt(.84,.02,.03)),g=this.keep(new Lt(.03,.02,.64));for(const[m,p,x]of[[v,0,.305],[v,0,-.305],[g,.405,0],[g,-.405,0]]){const M=new dt(m,h);M.position.set(p,1.19,x),l.add(M)}this.group.add(l),this.lockers.push({x:r.x,y:r.y,seam:h,fx:a,fy:o})}}buildTerminals(){const t=this.std({color:3814961,roughness:.7,metalness:.1}),e=this.std({color:5591114,roughness:.5,metalness:.1}),n=this.std({color:1382427,roughness:.4,metalness:.3});this.w.terminals.forEach((s,r)=>{const[a,o]=this.faceOf(s.x,s.y),l=new ue;l.position.set(s.x+.5,0,s.y+.5),l.rotation.y=this.yawFor(a,o),this.group.add(l);const c=(g,m,p,x,M,S=0)=>{this.keep(g);const L=new dt(g,m);return L.position.set(p,x,M),L.rotation.x=S,L.castShadow=L.receiveShadow=this.q.shadows,l.add(L),L};c(new Lt(.94,.7,.6),t,0,.35,-.05),c(new Lt(.98,.04,.66),e,0,.72,-.04),c(new Lt(.42,.015,.14),n,0,.75,.14),c(new Lt(.06,.16,.06),n,0,.82,-.14),c(new Lt(.56,.36,.04),n,0,1.06,-.12,-.18);const[h,u]=Qt(256,160),f=this.keep(new Wr(h));f.colorSpace=Ae;const d=this.std({color:0,emissive:16777215,emissiveMap:f,emissiveIntensity:1.7,roughness:.2});c(new ze(.5,.31),d,0,1.06,-.098,-.18);const v=this.std({color:724239,emissive:6222591,emissiveIntensity:.7});c(new Lt(.1,.02,.07),v,.36,.75,.12),this.terminals.push({i:r,ctx:u,tex:f,sig:"",screen:d})})}drawScreen(t,e,n){const s=e.terminals[t.i],r=e.puzzle?.terminal===t.i,a=s.done?"done":s.lockT>0?`lock${Math.ceil(s.lockT)}`:r?`run${Math.floor(n*4)}`:"idle";if(a===t.sig)return;t.sig=a;const o=t.ctx,l=s.done?"#7dffb0":s.lockT>0?"#ff6a5e":r?"#f0a541":"#7fe6f2";o.fillStyle="#05080a",o.fillRect(0,0,256,160),o.fillStyle=l,o.globalAlpha=.08,o.fillRect(0,0,256,160),o.globalAlpha=1,o.font='600 15px "IBM Plex Mono", monospace',o.fillText(`Terminal ${s.id}`,14,26),o.font='500 13px "IBM Plex Mono", monospace',o.globalAlpha=.75;const c=s.def.label.charAt(0)+s.def.label.slice(1).toLowerCase();o.fillText(c,14,48),o.globalAlpha=1,o.font='600 24px "IBM Plex Mono", monospace';const h=s.done?"Complete":s.lockT>0?`Locked ${Math.ceil(s.lockT)} s`:r?"Session open":"Standby";o.fillText(h,14,92),o.globalAlpha=.5;for(let u=0;u<4;u++)o.fillRect(14,112+u*9,40+(u*53+(r?Math.floor(n*6)*17:0))%170,3);o.globalAlpha=1,t.tex.needsUpdate=!0}buildLasers(){const t=this.keep(new ze(1,1)),e=this.keep(new de({transparent:!0,depthWrite:!1,blending:_n,side:Ve,uniforms:{uColor:{value:this.pal.laser.clone()},uFlick:{value:1}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform vec3 uColor; uniform float uFlick; varying vec2 vUv;
        void main(){ float y = vUv.y; float a = 0.0;
          a += exp(-pow((y - 0.22) * 22.0, 2.0)); a += exp(-pow((y - 0.5) * 22.0, 2.0)); a += exp(-pow((y - 0.78) * 22.0, 2.0));
          a = a * 0.5 + exp(-pow((y - 0.5) * 2.6, 2.0)) * 0.12;
          float ends = smoothstep(0.0, 0.06, vUv.x) * smoothstep(1.0, 0.94, vUv.x);
          gl_FragColor = vec4(uColor * a * ends * uFlick * 0.55, 1.0); }`})),n=this.keep(new de({transparent:!0,depthWrite:!1,uniforms:{uColor:{value:this.pal.laser.clone()}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uColor; varying vec2 vUv; void main(){ float d = step(0.5, fract(vUv.x * 8.0)); gl_FragColor = vec4(uColor, 0.35 * d); }"})),s=this.keep(new pi({color:this.pal.laser.clone().multiplyScalar(6)})),r=this.keep(new Lt(1,.014,.014)),a=this.keep(new Lt(.1,.96,.16).translate(0,.48,0)),o=this.keep(new Lt(.11,.03,.06));this.w.lasers.forEach((l,c)=>{const h=this.laserRuns(l.cells),u=new ue;this.group.add(u);const f=[],d=[],v=this.std({color:328965,emissive:this.pal.laser,emissiveIntensity:2});for(const g of h){const m=g.horiz?g.x1-g.x0+1:g.y1-g.y0+1,p=g.horiz?(g.x0+g.x1+1)/2:g.x0+.5,x=g.horiz?g.y0+.5:(g.y0+g.y1+1)/2,M=g.horiz?0:Math.PI/2;for(const L of[.22,.5,.78]){const A=new dt(r,s);A.scale.x=m,A.position.set(p,L,x),A.rotation.y=M,u.add(A)}if(this.q.haze){const L=new dt(t,e);L.scale.set(m,1,1),L.position.set(p,.5,x),L.rotation.y=M,L.renderOrder=6,this.group.add(L),f.push(L);const A=L.clone();A.rotation.y=M,A.rotateX(Math.PI/2),A.scale.set(m,.5,1),A.position.y=.012,this.group.add(A),f.push(A)}const S=new dt(this.keep(new ze(1,.05)),n);S.scale.x=m,S.rotation.set(-Math.PI/2,0,-M),S.position.set(p,.01,x),this.group.add(S),d.push(S);for(const L of[-1,1]){const A=g.horiz?p+L*(m/2-.05):p,R=g.horiz?x:x+L*(m/2-.05),C=new dt(a,this.darkSteel);C.position.set(A,0,R),C.rotation.y=M,C.castShadow=this.q.shadows,this.group.add(C);const y=new dt(o,v);y.position.set(A,.93,R),y.rotation.y=M,this.group.add(y)}}this.lasers.push({i:c,beams:u,haze:f,ghost:d,leds:v})})}laserRuns(t){const e=new Set(t.map(r=>`${r.x},${r.y}`)),n=new Set,s=[];for(const r of t){const a=`${r.x},${r.y}`;if(n.has(a))continue;const o=e.has(`${r.x+1},${r.y}`)||e.has(`${r.x-1},${r.y}`),l=e.has(`${r.x},${r.y+1}`)||e.has(`${r.x},${r.y-1}`),c=o||!l&&(this.isWall(r.x-1,r.y)||this.isWall(r.x+1,r.y));let h=r.x,u=r.x,f=r.y,d=r.y;if(c){for(;e.has(`${h-1},${r.y}`);)h--;for(;e.has(`${u+1},${r.y}`);)u++;for(let v=h;v<=u;v++)n.add(`${v},${r.y}`)}else{for(;e.has(`${r.x},${f-1}`);)f--;for(;e.has(`${r.x},${d+1}`);)d++;for(let v=f;v<=d;v++)n.add(`${r.x},${v}`)}s.push({x0:h,y0:f,x1:u,y1:d,horiz:c})}return s}buildFixtures(){const t=this.bake.fixtures,e=this.keep(new Lt(.98,.045,.16)),n=this.keep(new Lt(.9,.025,.08).translate(0,.03,0)),s=this.std({color:2830131,roughness:.5,metalness:.6});this.fixtureMat=this.keep(new Ye({color:0,emissive:15398143,emissiveIntensity:2.6}));const r=this.keep(new cn(e,s,t.length)),a=this.keep(new cn(n,this.fixtureMat,t.length)),o=new Ht,l=new vn;t.forEach((h,u)=>{l.setFromAxisAngle(new P(0,1,0),h.horiz?0:Math.PI/2),o.compose(new P(h.x,Ps,h.y),l,new P(1,1,1)),r.setMatrixAt(u,o),a.setMatrixAt(u,o),a.setColorAt(u,h.warm?new Tt(1,.8,.55):new Tt(1,1,1))}),this.group.add(r,a),this.fixHousing=r,this.fixTube=a;const c=this.bake.beacons;if(this.beaconMat=this.keep(new Ye({color:1707014,emissive:16738858,emissiveIntensity:0,roughness:.3})),c.length){const h=this.keep(new Qe(.07,.09,.11,12)),u=this.keep(new cn(h,this.beaconMat,c.length));c.forEach((f,d)=>{o.makeTranslation(f.x+.35,Ps+.02,f.y),u.setMatrixAt(d,o)}),this.group.add(u),this.beaconMesh=u}}buildItems(){this.w.items.forEach((t,e)=>{let n;if(t.kind==="card"){const s=t.card==="red"?13779791:t.card==="blue"?4032224:15254330,r=new ue,a=new dt(this.keep(new Lt(.3,.012,.19)),this.std({color:s,emissive:s,emissiveIntensity:.9,roughness:.35})),o=new dt(this.keep(new Lt(.06,.014,.05)),this.std({color:13215834,metalness:.9,roughness:.3,envMap:this.env,envMapIntensity:.6}));o.position.set(-.07,.002,.02),r.add(a,o),r.rotation.z=.5,n=r}else if(t.kind==="energy"){const s=new ue,r=new dt(this.keep(new Qe(.075,.075,.22,14)),this.std({color:2764595,metalness:.7,roughness:.4,envMap:this.env,envMapIntensity:.5})),a=new dt(this.keep(new Qe(.078,.078,.06,14)),this.std({color:662032,emissive:7208870,emissiveIntensity:2.2}));s.add(r,a),n=s}else{const s=new dt(this.keep(new Qe(.15,.15,.07,6)),this.std({color:1773338,emissive:16748518,emissiveIntensity:1.6,roughness:.3}));s.rotation.x=Math.PI/2,n=s}n.position.set(t.x+.5,.42,t.y+.5),this.group.add(n),this.items.push({i:e,mesh:n,base:.42})})}buildMarkers(){const t=this.w,e=this.keep(_v());this.exitMat=this.keep(new pi({map:e,color:3819088,transparent:!0,depthWrite:!1,blending:_n}));const n=new dt(this.keep(new ze(.92,.92).rotateX(-Math.PI/2)),this.exitMat);n.position.set(t.map.exit.x+.5,.012,t.map.exit.y+.5),this.group.add(n);const s=this.keep(new de({transparent:!0,depthWrite:!1,blending:_n,side:Ve,uniforms:{uColor:{value:this.pal.ok.clone()}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:"uniform vec3 uColor; varying vec2 vUv; void main(){ float a = pow(1.0 - vUv.y, 2.0) * 0.45; gl_FragColor = vec4(uColor * a, 1.0); }"}));this.exitColumn=new dt(this.keep(new Qe(.42,.42,1.6,20,1,!0).translate(0,.8,0)),s),this.exitColumn.position.set(t.map.exit.x+.5,0,t.map.exit.y+.5),this.exitColumn.visible=!1,this.group.add(this.exitColumn);const r=this.keep(xv());for(const a of t.checkpoints){const o=this.keep(new pi({map:r,color:5661806,transparent:!0,depthWrite:!1,blending:_n})),l=new dt(this.keep(new ze(.6,.6).rotateX(-Math.PI/2)),o);l.position.set(a.x+.5,.011,a.y+.5),this.group.add(l),this.checkpoints.push(o)}}buildCameras(){const t=this.w,e=this.std({color:13225424,roughness:.45,metalness:.2});t.cameras.forEach((n,s)=>{const r=-Math.cos(n.baseDir),a=-Math.sin(n.baseDir);let o=.3;for(let M=.05;M<1.6;M+=.05)if(this.isWall(Math.floor(n.x+r*M),Math.floor(n.y+a*M))){o=M;break}const l=1.08,c=new ue;c.position.set(n.x,l,n.y),this.group.add(c);const h=new dt(this.keep(new Lt(o,.04,.04).translate(o/2,0,0)),this.darkSteel);h.rotation.y=-Math.atan2(a,r),h.castShadow=this.q.shadows,c.add(h);const u=new dt(this.keep(new Lt(.03,.16,.12)),this.darkSteel);u.position.set(r*o,0,a*o),u.rotation.y=-Math.atan2(a,r),c.add(u);const f=new ue;c.add(f);const d=new dt(this.keep(new Lt(.28,.11,.12)),e);d.position.x=.06,d.rotation.z=-.25,d.castShadow=this.q.shadows,f.add(d);const v=new dt(this.keep(new Lt(.3,.015,.15)),this.darkSteel);v.position.set(.07,.065,0),v.rotation.z=-.25,f.add(v);const g=new dt(this.keep(new Qe(.035,.04,.03,14)),this.std({color:329223,roughness:.05,metalness:.4,envMap:this.env,envMapIntensity:1}));g.rotation.z=Math.PI/2-.25,g.position.set(.2,-.035,0),f.add(g);const m=this.std({color:1115397,emissive:this.pal.alert,emissiveIntensity:2}),p=new dt(this.keep(new qn(.014,8,6)),m);p.position.set(.17,.03,.05),f.add(p);const x=new _e;x.position.set(.22,-.045,0),f.add(x),this.cams.push({i:s,yaw:f,led:m,lensPos:x})})}updateFixtures(t,e,n){let s=-1;if(n||this.bake.fixtures.forEach((l,c)=>{Math.abs(l.x-t)<1.1&&e-l.y<1.3&&e-l.y>-.9&&(s=c)}),s===this.fixHidden||!this.fixHousing||!this.fixTube)return;const r=new Ht,a=new vn,o=(l,c)=>{const h=this.bake.fixtures[l];a.setFromAxisAngle(new P(0,1,0),h.horiz?0:Math.PI/2),r.compose(new P(h.x,Ps,h.y),a,new P(c,c,c)),this.fixHousing.setMatrixAt(l,r),this.fixTube.setMatrixAt(l,r)};this.fixHidden>=0&&o(this.fixHidden,1),s>=0&&o(s,1e-4),this.fixHousing.instanceMatrix.needsUpdate=!0,this.fixTube.instanceMatrix.needsUpdate=!0,this.fixHidden=s}update(t,e,n,s,r,a=!1){this.updateFixtures(t.player.x,t.player.y,a||t.player.hidden);for(const c of this.doors){const h=t.doors[c.i],u=h.open?1:0;c.open+=(u-c.open)*(1-Math.exp(-e*9)),e===0&&(c.open=u);const f=c.open*.47;c.left.position.x=-.25-f,c.right.position.x=.25+f,c.lamp.emissive.copy(h.locked?r.locked:r.amber),c.lamp.emissiveIntensity=h.locked?2.4:1.2,c.bar.visible=h.locked&&c.open<.1}const o=s?1:.88+.12*Math.sin(n*41)*Math.sin(n*13);for(const c of this.lasers){const h=t.lasers[c.i];c.beams.visible=h.active;for(const u of c.haze)u.visible=h.active,u.material.uniforms.uFlick.value=o;for(const u of c.ghost)u.visible=!h.active;c.leds.emissiveIntensity=h.active?2.4:s||Math.floor(n*2)%2===0?.6:.15,c.leds.emissive.copy(h.active?r.laser:r.amber)}for(const c of this.terminals)this.drawScreen(c,t,n);for(const c of this.lockers){const h=t.player.hidden&&Math.floor(t.player.x)===c.x&&Math.floor(t.player.y)===c.y;c.seam.emissiveIntensity=h?s?2.2:1.8+.5*Math.sin(n*3):0}for(const c of this.items){const h=t.items[c.i];c.mesh.visible=!h.taken,s||(c.mesh.rotation.y=n*1.4,c.mesh.position.y=c.base+Math.sin(n*2.4+h.x)*.04)}const l=t.def.objectives.filter(c=>c.id!=="extract"&&!c.optional).every(c=>t.objectives[c.id]);this.exitMat.color.copy(l?r.ok:new Tt(3819088)),this.exitColumn.visible=l,t.checkpoints.forEach((c,h)=>{this.checkpoints[h]&&this.checkpoints[h].color.copy(c.hit?r.ok:new Tt(5661806))}),this.cams.forEach(c=>{const h=t.cameras[c.i];c.yaw.rotation.y=-h.dir;const u=h.loopT>0,f=s||Math.floor(n*2.5)%2===0;c.led.emissive.copy(u?new Tt(7829367):(h.trackT>0,r.alert)),c.led.emissiveIntensity=u?.5:f?2.6:.2})}dispose(){this.group.removeFromParent();for(const t of this.bag)t.dispose();this.bag.length=0}}function Iv(i,t){const e=i.onBeforeCompile;i.onBeforeCompile=(n,s)=>{e.call(i,n,s),n.uniforms.uRimCol=t,n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
uniform vec3 uRimCol;`).replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
{ float fr = pow(1.0 - clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0), 2.2); totalEmissiveRadiance += uRimCol * fr; }`)},i.customProgramCacheKey=()=>"bake-0-rim"}function gr(i,t,e,n){const s=new Jo(i,t,4,10);n.push(s);const r=new dt(s,e);return r.castShadow=!0,r}function ai(i,t,e,n,s){const r=new Lt(i,t,e);s.push(r);const a=new dt(r,n);return a.castShadow=!0,a}function Nh(i,t,e){const n=[],s=(C,y,_,w=0)=>{const O=Mv(C,_);n.push(O);const D=Lo(new Ye({map:O,roughness:y,metalness:w}),t);return e&&Iv(D,e),n.push(D),D},r=s(i.suit,.85,1),a=s(i.accent,.7,2),o=s(i.skin,.6,3),l=new ue,c=new ue;c.scale.setScalar(1.2),l.add(c);const h=new ue;h.position.y=.42,c.add(h);const u=C=>{const y=new ue;y.position.set(0,0,C*.075);const _=gr(.055,.3,a,n);_.position.y=-.2,y.add(_);const w=ai(.13,.05,.08,a,n);return w.position.set(.03,-.39,0),y.add(w),h.add(y),y},f=u(-1),d=u(1),v=new ue;h.add(v);const g=gr(.12,.2,r,n);if(g.position.y=.22,g.scale.set(.85,1,1.3),v.add(g),i.band){const C=Lo(new Ye({color:13949660,roughness:.35,metalness:.1}),t);n.push(C);const y=ai(.215,.035,.32,C,n);y.position.y=.27,v.add(y);const _=ai(.215,.025,.3,C,n);_.position.y=.12,v.add(_)}if(i.pack){const C=ai(.13,.27,.24,a,n);C.position.set(-.15,.24,0),v.add(C);const y=gr(.04,.16,r,n);y.rotation.x=Math.PI/2,y.position.set(-.15,.4,0),v.add(y)}const m=new ue;m.position.y=.49,v.add(m);const p=new dt(new qn(.085,14,10),o);n.push(p.geometry),p.castShadow=!0,m.add(p);let x=null,M=null;if(i.headgear==="hood"){const C=new dt(new qn(.098,14,10,Math.PI*.15,Math.PI*1.7),r);n.push(C.geometry),C.rotation.y=Math.PI,C.castShadow=!0,m.add(C);const y=new Ye({color:658703,emissive:4184296,emissiveIntensity:1.6,roughness:.2});n.push(y);const _=ai(.03,.028,.12,y,n);_.position.set(.075,.012,0),m.add(_)}else if(i.headgear==="cap"){const C=new dt(new Qe(.088,.09,.05,14),a);n.push(C.geometry),C.position.y=.055,m.add(C);const y=ai(.07,.012,.12,a,n);y.position.set(.08,.035,0),m.add(y)}else{const C=new dt(new qn(.102,14,8,0,Math.PI*2,0,Math.PI*.55),a);n.push(C.geometry),C.position.y=.012,C.castShadow=!0,m.add(C);const y=new Ye({color:1119255,roughness:.15,metalness:.6});n.push(y);const _=ai(.02,.03,.13,y,n);_.position.set(.085,0,0),m.add(_)}const S=new ue;S.position.y=0,v.add(S);const L=(C,y)=>{const _=new ue;_.position.set(0,.34,C*.165);const w=gr(.04,.24,r,n);w.position.y=-.16,_.add(w);const O=new dt(new qn(.035,8,6),o);return n.push(O.geometry),O.position.y=-.31,_.add(O),y.add(_),_},A=L(-1,v),R=L(1,S);if(i.flashlight){const C=new Ye({color:1777185,roughness:.4,metalness:.7});n.push(C);const y=new dt(new Qe(.022,.03,.15,10),C);n.push(y.geometry),y.rotation.z=-Math.PI/2,y.position.set(.06,0,0),M=new ue,M.position.set(0,-.31,0),M.add(y),R.add(M);const _=new Ye({color:16777215,emissive:16773848,emissiveIntensity:4,roughness:.1});n.push(_),x=new dt(new Zo(.028,12),_),n.push(x.geometry),x.rotation.y=Math.PI/2,x.position.set(.136,0,0),M.add(x)}return{root:l,body:c,hips:h,torso:v,head:m,aim:S,legL:f,legR:d,armL:A,armR:R,lens:x,torch:M,phase:0,px:0,py:0,yaw:0,sneak:0,alert:0,init:!1,disposables:n}}function Uv(i,t){return Nh({suit:"#2b3034",accent:"#1a1d20",skin:"#6b5446",headgear:"hood",band:!1,pack:!0,flashlight:!1},i,t)}function Nv(i,t){const e=[{suit:"#2d3a4f",accent:"#171c24",skin:"#8a6a55",headgear:"cap",band:!0,pack:!1,flashlight:!0},{suit:"#4a4d3e",accent:"#25271f",skin:"#5f4636",headgear:"helmet",band:!0,pack:!1,flashlight:!0}];return Nh(e[t%e.length],i,null)}function Ua(i){for(;i>Math.PI;)i-=Math.PI*2;for(;i<-Math.PI;)i+=Math.PI*2;return i}function Cc(i,t,e,n,s,r){i.init||(i.px=t,i.py=e,i.yaw=n.face,i.init=!0);const a=t-i.px,o=e-i.py,l=Math.hypot(a,o);i.px=t,i.py=e;const c=s>0?l/s:0,h=c>.2&&l<1,u=h&&n.headLead?Math.atan2(o,a):n.face,f=1-Math.exp(-s*(h?10:6));i.yaw=Ua(i.yaw+Ua(u-i.yaw)*f),l>1&&(i.yaw=n.face);const d=Math.max(-1.3,Math.min(1.3,Ua(n.face-i.yaw)));i.root.position.set(t,0,e),i.root.rotation.y=-i.yaw,i.head.rotation.y=-d,i.aim.rotation.y=-d*.9;const v=1-Math.exp(-s*8);i.sneak+=((n.sneak?1:0)-i.sneak)*v,i.alert+=((n.alert?1:0)-i.alert)*(1-Math.exp(-s*6));const g=Math.min(1,c/2.6)*(h?1:0);l<1&&(i.phase+=l/(.62-i.sneak*.18)*Math.PI);const m=r?0:Math.sin(i.phase),p=.62*g*(1-i.sneak*.4);i.legL.rotation.z=m*p+i.sneak*.35,i.legR.rotation.z=-m*p+i.sneak*.35,i.legL.scale.y=i.legR.scale.y=1-i.sneak*.18,i.hips.position.y=.42-i.sneak*.1+(r?0:Math.abs(Math.cos(i.phase))*.02*g),i.torso.rotation.z=-(.06*g+i.sneak*.42+i.alert*.16),i.head.rotation.z=i.sneak*.3+(n.suspicious?.12:0);const x=m*.5*g;i.armL.rotation.z=-x*(1-i.alert)+i.alert*1.25+i.sneak*.5;const M=i.lens?.95:0;i.armR.rotation.z=x*(1-M)+M*(.95+i.alert*.45)+i.sneak*.4,i.armL.rotation.x=-.08,i.armR.rotation.x=.08,i.torch&&(i.torch.rotation.z=-i.armR.rotation.z-i.torso.rotation.z-.12)}function Pc(i){for(const t of i.disposables)t.dispose();i.root.removeFromParent()}const Wi=36,Lc=`
attribute float aR;
attribute float aT;
attribute float aRim;
varying float vR;
varying float vT;
varying float vRim;
varying vec2 vW;
void main() {
  vR = aR; vT = aT; vRim = aRim;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vW = wp.xz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`,Dc=`
uniform vec3 uColor;
uniform float uFill;
uniform float uEdgeA;
uniform float uPattern;   // 0 none, 1 diagonal, 2 cross, 3 dots
uniform float uEdgeStyle; // 0 solid thin, 1 dashed, 2 solid thick, 3 dotted
uniform float uRange;
uniform float uFov;
uniform float uShadowR;
uniform float uLight;     // additive soft light mode (Low quality)
varying float vR;
varying float vT;
varying float vRim;
varying vec2 vW;
void main() {
  float dist = vR * uRange;
  if (uLight > 0.5) {
    float fall = pow(1.0 - clamp(vR, 0.0, 1.0), 1.3);
    float side = smoothstep(0.0, 0.12, min(vT, 1.0 - vT));
    gl_FragColor = vec4(uColor * fall * side * 0.55, 1.0);
    return;
  }
  float fade = mix(1.0, 0.25, vR);
  float a = uFill * fade;
  float pat = 0.0;
  vec2 p = vW * 3.2;
  if (uPattern > 0.5 && uPattern < 1.5) pat = step(0.72, fract(p.x + p.y));
  else if (uPattern > 1.5 && uPattern < 2.5) pat = max(step(0.78, fract(p.x + p.y)), step(0.78, fract(p.x - p.y)));
  else if (uPattern > 2.5) pat = step(length(fract(p) - 0.5), 0.13);
  a += pat * 0.1 * fade;
  // side edges (angular), measured in world units
  float sideW = min(vT, 1.0 - vT) * uFov * max(dist, 0.001);
  float thick = uEdgeStyle > 1.5 && uEdgeStyle < 2.5 ? 0.075 : 0.04;
  float edge = 1.0 - smoothstep(thick * 0.6, thick, sideW);
  float rimDist = (1.0 - vRim) * dist / max(vRim, 0.01);
  float rim = 1.0 - smoothstep(0.025, 0.05, rimDist);
  edge = max(edge, rim * 0.8);
  if (uEdgeStyle > 0.5 && uEdgeStyle < 1.5) edge *= step(0.45, fract(dist * 2.4 + vT * 6.0));
  if (uEdgeStyle > 2.5) edge *= step(0.6, fract(dist * 4.0 + vT * 12.0));
  // dotted arc at the shadow sight range
  float arc = (1.0 - smoothstep(0.015, 0.035, abs(dist - uShadowR))) * step(0.5, fract(vT * 18.0));
  a = max(a, edge * uEdgeA);
  a = max(a, arc * uEdgeA * 0.6);
  gl_FragColor = vec4(uColor, a);
}
`;class Ic{constructor(){G(this,"mesh");G(this,"light");G(this,"mat");G(this,"lightMat");G(this,"pos");G(this,"r");G(this,"rim");G(this,"geo");const t=Wi+2;this.pos=new Float32Array(t*3),this.r=new Float32Array(t),this.rim=new Float32Array(t);const e=new Float32Array(t);e[0]=.5;for(let a=0;a<=Wi;a++)e[a+1]=a/Wi,this.rim[a+1]=1;const n=[];for(let a=1;a<=Wi;a++)n.push(0,a+1,a);const s=new Re;s.setAttribute("position",new Ie(this.pos,3).setUsage(_l)),s.setAttribute("aR",new Ie(this.r,1).setUsage(_l)),s.setAttribute("aT",new Ie(e,1)),s.setAttribute("aRim",new Ie(this.rim,1)),s.setIndex(n),s.boundingSphere=new yi(new P,1e4),this.geo=s;const r=()=>({uColor:{value:new Tt(1,1,1)},uFill:{value:.1},uEdgeA:{value:.5},uPattern:{value:0},uEdgeStyle:{value:0},uRange:{value:7},uFov:{value:1.2},uShadowR:{value:2.8},uLight:{value:0}});this.mat=new de({vertexShader:Lc,fragmentShader:Dc,uniforms:r(),transparent:!0,depthWrite:!1,side:Ve,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),this.lightMat=new de({vertexShader:Lc,fragmentShader:Dc,uniforms:r(),transparent:!0,depthWrite:!1,side:Ve,blending:_n,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),this.lightMat.uniforms.uLight.value=1,this.mesh=new dt(s,this.mat),this.mesh.renderOrder=3,this.mesh.frustumCulled=!1,this.light=new dt(s,this.lightMat),this.light.renderOrder=2,this.light.frustumCulled=!1}update(t,e,n,s,r,a,o,l,c){const h=this.pos;h[0]=e,h[1]=.025,h[2]=n,this.r[0]=0;for(let f=0;f<=Wi;f++){const d=s-r/2+r*f/Wi,v=Math.cos(d),g=Math.sin(d);let m=0;for(;m<a&&!Br(t,Math.floor(e+v*m),Math.floor(n+g*m));m+=.12);m=Math.min(m,a);const p=(f+1)*3;h[p]=e+v*m,h[p+1]=.025,h[p+2]=n+g*m,this.r[f+1]=m/a}this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.aR.needsUpdate=!0;const u=this.mat.uniforms;if(u.uColor.value.copy(l.color),u.uFill.value=l.fill,u.uEdgeA.value=l.edge,u.uPattern.value=l.pattern,u.uEdgeStyle.value=l.edgeStyle,u.uRange.value=a,u.uFov.value=r,u.uShadowR.value=o,c){const f=this.lightMat.uniforms;f.uColor.value.copy(c),f.uRange.value=a,f.uFov.value=r}}dispose(){this.geo.dispose(),this.mat.dispose(),this.lightMat.dispose()}}const Fv="varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",Ov=`
uniform vec3 uColor;
uniform float uAlpha;
uniform float uR0;
uniform float uR1;
uniform float uDashN;
uniform float uRot;
uniform float uProg;
uniform float uRays;
varying vec2 vUv;
const float TAU = 6.2831853;
void main() {
  vec2 p = vUv * 2.0 - 1.0;
  float r = length(p);
  float a = atan(p.y, p.x) / TAU + 0.5;
  float aa = fwidth(r) * 1.2;
  float ring = smoothstep(uR0 - aa, uR0 + aa, r) * (1.0 - smoothstep(uR1 - aa, uR1 + aa, r));
  if (uDashN > 0.5) ring *= step(0.45, fract(a * uDashN + uRot));
  if (uProg < 0.999) ring *= step(a, uProg);
  float rays = 0.0;
  if (uRays > 0.5) {
    float t = fract(a * uRays + 0.125 * step(1.5, uRays) * step(uRays, 2.5));
    float d0 = min(t, 1.0 - t) * TAU / uRays * r;
    rays = (1.0 - smoothstep(0.018, 0.03, d0)) * step(uR1 + 0.1, r) * (1.0 - step(0.97, r));
  }
  float v = max(ring, rays);
  if (v < 0.01) discard;
  gl_FragColor = vec4(uColor, v * uAlpha);
}
`;function vr(i=!1){return new de({vertexShader:Fv,fragmentShader:Ov,transparent:!0,depthWrite:!1,blending:i?_n:di,uniforms:{uColor:{value:new Tt(1,1,1)},uAlpha:{value:1},uR0:{value:.55},uR1:{value:.62},uDashN:{value:0},uRot:{value:0},uProg:{value:1},uRays:{value:0}}})}function _r(i,t,e){const n=new dt(e,t);return n.scale.setScalar(i),n.renderOrder=4,n.frustumCulled=!1,n}function kv(){return new ze(2,2).rotateX(-Math.PI/2)}const Bv=12,zv=60*Math.PI/180;class Uc{constructor(t){G(this,"mesh");G(this,"mat");this.mat=new de({transparent:!0,depthTest:!1,depthWrite:!1,uniforms:{uFill:{value:0},uColor:{value:new Tt},uThresh:{value:xt.SUS_THRESHOLD/100}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform float uFill; uniform vec3 uColor; uniform float uThresh; varying vec2 vUv;
        void main(){
          vec2 px = vUv * vec2(120.0, 14.0);
          bool border = px.x < 1.5 || px.x > 118.5 || px.y < 1.5 || px.y > 12.5;
          vec3 c = vec3(0.03, 0.035, 0.04); float a = 0.82;
          if (vUv.x < uFill && !border) c = uColor;
          if (abs(vUv.x - uThresh) < 0.012) { c = vec3(1.0); }
          if (border) c = vec3(0.6, 0.64, 0.66);
          gl_FragColor = vec4(c, a); }`}),this.mesh=new dt(t,this.mat),this.mesh.renderOrder=20,this.mesh.frustumCulled=!1}dispose(){this.mat.dispose()}}class Hv{constructor(){G(this,"sprite");G(this,"ctx");G(this,"tex");G(this,"text","\0");const[t,e]=Qt(256,64);this.ctx=e,this.tex=new Wr(t),this.tex.colorSpace=Ae;const n=new Yo({map:this.tex,depthTest:!1,transparent:!0});this.sprite=new Th(n),this.sprite.scale.set(1.3,.325,1),this.sprite.renderOrder=21}set(t){if(t===this.text)return;this.text=t;const e=this.ctx;if(e.clearRect(0,0,256,64),!t){this.tex.needsUpdate=!0,this.sprite.visible=!1;return}this.sprite.visible=!0,e.font='600 30px "IBM Plex Sans Condensed", "Segoe UI", sans-serif';const n=e.measureText(t).width;e.fillStyle="rgba(13,16,19,0.86)",e.fillRect(128-n/2-12,10,n+24,44),e.fillStyle="#dce4e6",e.textAlign="center",e.textBaseline="middle",e.fillText(t,128,33),this.tex.needsUpdate=!0}dispose(){this.tex.dispose(),this.sprite.material.dispose()}}function Gv(i,t){const[e,n]=Qt(96,96),s=`#${t.getHexString()}`;if(n.lineWidth=7,n.strokeStyle=s,n.fillStyle=s,n.font='700 46px "IBM Plex Sans Condensed", "Segoe UI", sans-serif',n.textAlign="center",n.textBaseline="middle",n.shadowColor="rgba(0,0,0,0.9)",n.shadowBlur=8,i==="suspicious")n.beginPath(),n.moveTo(48,10),n.lineTo(88,82),n.lineTo(8,82),n.closePath(),n.fillStyle="rgba(13,16,19,0.85)",n.fill(),n.stroke(),n.fillStyle=s,n.shadowBlur=0,n.fillText("?",48,60);else if(i==="alert")n.beginPath(),n.moveTo(48,6),n.lineTo(90,48),n.lineTo(48,90),n.lineTo(6,48),n.closePath(),n.fill(),n.fillStyle="#0d1013",n.shadowBlur=0,n.fillText("!",48,50);else if(i==="search"){n.beginPath(),n.arc(48,48,34,0,Math.PI*2),n.fillStyle="rgba(13,16,19,0.85)",n.fill(),n.stroke(),n.fillStyle=s,n.shadowBlur=0;for(const a of[30,48,66])n.beginPath(),n.arc(a,48,5.5,0,Math.PI*2),n.fill()}const r=new Wr(e);return r.colorSpace=Ae,r}class Vv{constructor(t,e={}){G(this,"kind","3d");G(this,"detected");G(this,"canvas");G(this,"renderer");G(this,"scene",new bh);G(this,"camera",new He(38,1,.1,160));G(this,"composer",null);G(this,"bloom",null);G(this,"q");G(this,"u",bv());G(this,"env",null);G(this,"pmrem");G(this,"hemi");G(this,"level",null);G(this,"def",null);G(this,"dyn",new ue);G(this,"player",null);G(this,"rim",{value:new Tt(.1,.16,.2)});G(this,"guards",[]);G(this,"camsV",[]);G(this,"icons",new Map);G(this,"barGeo",new ze(.8,.095));G(this,"ringGeo",kv());G(this,"visRing");G(this,"visMat",vr(!0));G(this,"focusRing");G(this,"focusMat",vr(!0));G(this,"focusLine");G(this,"noise",[]);G(this,"decoy");G(this,"decoyLed");G(this,"decoyArc");G(this,"camT",new P);G(this,"lead",new P);G(this,"camDist",16);G(this,"camInit",!1);G(this,"lastPX",0);G(this,"lastPY",0);G(this,"shake",0);G(this,"time",0);G(this,"lost",!1);G(this,"lostTimer",0);G(this,"fixtureLevel",1);G(this,"hooks");G(this,"needsRebuild",!1);G(this,"cbMode",!1);G(this,"curDist",16);this.hooks=e;const n=document.createElement("canvas");n.id="view3d",n.setAttribute("aria-label","BLACKOUT PROTOCOL 3D game view"),n.setAttribute("role","img"),this.canvas=n;const s=new bg({canvas:n,antialias:!0,powerPreference:"high-performance",stencil:!1});if(!s.getContext())throw new Error("WebGL context unavailable");this.renderer=s,this.detected=sv(s.getContext()),this.q=Tc[t==="auto"?this.detected:t],document.body.prepend(n),s.outputColorSpace=Ae,s.toneMapping=Fo,s.toneMappingExposure=1.15,this.pmrem=new Ao(s),this.scene.background=new Tt(461068),this.scene.fog=new qo(461068,.02),this.hemi=new Gg(2240578,329223,.35),this.scene.add(this.hemi),this.scene.add(this.dyn),this.visRing=_r(.62,this.visMat,this.ringGeo),this.focusRing=_r(.6,this.focusMat,this.ringGeo),this.focusMat.uniforms.uDashN.value=10,this.focusMat.uniforms.uR0.value=.78,this.focusMat.uniforms.uR1.value=.86;const r=new Re().setAttribute("position",new oe([0,0,0,1,0,1],3));this.focusLine=new Ag(r,new Ah({color:6222591,transparent:!0,opacity:.45,depthWrite:!1})),this.focusLine.frustumCulled=!1,this.scene.add(this.visRing,this.focusRing,this.focusLine);for(let c=0;c<24;c++){const h=vr(!0);h.uniforms.uR0.value=.94,h.uniforms.uR1.value=1;const u=_r(1,h,this.ringGeo);u.visible=!1,this.scene.add(u),this.noise.push({mesh:u,mat:h})}this.decoy=new ue;const a=new dt(new Qe(.11,.13,.06,18),new Ye({color:2303787,metalness:.6,roughness:.4}));a.position.y=.03,this.decoyLed=new Ye({color:1182210,emissive:15770945,emissiveIntensity:3});const o=new dt(new qn(.03,10,8),this.decoyLed);o.position.y=.075,this.decoyArc=vr(!0),this.decoyArc.uniforms.uR0.value=.8,this.decoyArc.uniforms.uR1.value=.9;const l=_r(.5,this.decoyArc,this.ringGeo);l.position.y=.02,this.decoy.add(a,o,l),this.decoy.visible=!1,this.scene.add(this.decoy),this.makeEnv(),this.applyQualityToRenderer(),n.addEventListener("webglcontextlost",c=>{c.preventDefault(),this.lost=!0,this.hooks.onStatus?.("Graphics context lost. Trying to restore the 3D view."),this.lostTimer=window.setTimeout(()=>this.hooks.onFatal?.(),5e3)}),n.addEventListener("webglcontextrestored",()=>{window.clearTimeout(this.lostTimer),this.lost=!1,this.makeEnv(),this.applyQualityToRenderer(),this.needsRebuild=!0,this.hooks.onStatus?.(null)}),this.resize()}get quality(){return this.q.name}setQuality(t){t!==this.q.name&&(this.q=Tc[t],this.applyQualityToRenderer(),this.needsRebuild=!0)}makeEnv(){this.env?.dispose();const t=new iv;this.env=this.pmrem.fromScene(t,.04).texture,t.traverse(e=>{const n=e;n.geometry&&n.geometry.dispose(),n.material&&n.material.dispose()})}applyQualityToRenderer(){const t=this.renderer;if(t.setPixelRatio(Math.min(window.devicePixelRatio||1,this.q.pixelRatio)),t.shadowMap.enabled=this.q.shadows,t.shadowMap.type=this.q.softShadows?zc:No,this.scene.fog.density=this.q.haze?.024:.016,this.composer?.dispose(),this.composer=null,this.bloom=null,this.q.bloom){const e=t.getDrawingBufferSize(new rt),n=new nn(Math.max(1,e.x),Math.max(1,e.y),{type:yn,samples:this.q.msaa}),s=new Zg(t,n);s.addPass(new Qg(this.scene,this.camera)),this.bloom=new ss(new rt(e.x/2,e.y/2),.55,.45,.82),s.addPass(this.bloom),s.addPass(new nv),this.composer=s}this.resize()}resize(){const t=Math.max(1,window.innerWidth),e=Math.max(1,window.innerHeight);this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,this.q.pixelRatio)),this.renderer.setSize(t,e,!1),this.canvas.style.width="100%",this.canvas.style.height="100%",this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.composer&&(this.composer.setPixelRatio(Math.min(window.devicePixelRatio||1,this.q.pixelRatio)),this.composer.setSize(t,e)),this.camDist=17.5*Math.max(1,1.25/(t/e))}resetCamera(){this.camInit=!1}kick(){this.shake=.25}teardown(){this.level?.dispose(),this.level=null,this.player&&Pc(this.player),this.player=null;for(const t of this.guards)Pc(t.rig),t.spot&&(t.spot.shadow.map?.dispose(),t.spot.dispose(),t.spot.target.removeFromParent(),t.spot.removeFromParent()),t.cone.dispose(),t.cone.mesh.removeFromParent(),t.cone.light.removeFromParent(),t.icon.removeFromParent(),t.icon.material.dispose(),t.bar.mesh.removeFromParent(),t.bar.dispose(),t.volume&&(t.volume.removeFromParent(),t.volume.geometry.dispose(),t.volume.material.dispose());for(const t of this.camsV)t.spot&&(t.spot.shadow.map?.dispose(),t.spot.dispose(),t.spot.target.removeFromParent(),t.spot.removeFromParent()),t.cone.dispose(),t.cone.mesh.removeFromParent(),t.cone.light.removeFromParent(),t.bar.mesh.removeFromParent(),t.bar.dispose(),t.label.sprite.removeFromParent(),t.label.dispose();this.guards=[],this.camsV=[],this.def=null,this.renderer.renderLists.dispose()}build(t){this.teardown();const e=this.cbMode?Rc:wc;this.level=new Dv(t,this.q,this.u,this.env,e),this.scene.add(this.level.group),this.player=Uv(this.u,this.rim),this.dyn.add(this.player.root),t.guards.forEach((n,s)=>{const r=Nv(this.u,t.def.index>=2?s%2:s===0&&t.def.index===1?1:0);this.dyn.add(r.root);let a=null;this.q.spots&&(a=new Mc(16773336,0,n.range,n.fov/2,.42,1.35),this.setupShadow(a,this.q.shadowSize,n.range+1.5),this.scene.add(a,a.target));const o=new Ic;this.scene.add(o.light,o.mesh);const l=new Th(new Yo({depthTest:!1,transparent:!0}));l.scale.set(.42,.42,1),l.renderOrder=21,this.scene.add(l);const c=new Uc(this.barGeo);this.scene.add(c.mesh);let h=null;this.q.volumes&&(h=this.makeVolume(),this.scene.add(h)),this.guards.push({rig:r,spot:a,cone:o,icon:l,bar:c,volume:h})}),t.cameras.forEach(n=>{let s=null;this.q.spots&&(s=new Mc(13624575,0,n.range,n.fov/2,.35,1.3),this.setupShadow(s,Math.max(256,this.q.shadowSize/2),n.range+2),this.scene.add(s,s.target));const r=new Ic;this.scene.add(r.light,r.mesh);const a=new Uc(this.barGeo);this.scene.add(a.mesh);const o=new Hv;this.scene.add(o.sprite),this.camsV.push({spot:s,cone:r,bar:a,label:o})}),this.def=t.def,this.camInit=!1,this.needsRebuild=!1}setupShadow(t,e,n){t.castShadow=this.q.shadows,t.shadow.mapSize.set(e,e),t.shadow.camera.near=.1,t.shadow.camera.far=n,t.shadow.bias=-6e-4,t.shadow.normalBias=.025}makeVolume(){const t=new Qo(1,1,24,1,!0);t.translate(0,-.5,0),t.rotateZ(Math.PI/2);const e=new de({transparent:!0,depthWrite:!1,blending:_n,side:Ve,uniforms:{uColor:{value:new Tt(1,.94,.85)},uAlpha:{value:.05}},vertexShader:"varying float vX; varying vec3 vN; varying vec3 vV; void main(){ vX = position.x; vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }",fragmentShader:"uniform vec3 uColor; uniform float uAlpha; varying float vX; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - clamp(vX,0.0,1.0), 1.6); float e = pow(abs(dot(vN, vV)), 1.5); gl_FragColor = vec4(uColor * f * e * uAlpha, 1.0); }"}),n=new dt(t,e);return n.frustumCulled=!1,n.renderOrder=7,n}icon(t,e){if(t==="patrol")return null;const n=`${t}-${this.cbMode?1:0}`;let s=this.icons.get(n);return s||(s=Gv(t,t==="suspicious"?e.suspicious:t==="alert"?e.alert:e.search),this.icons.set(n,s)),s}draw(t,e,n){if(this.lost)return;if(e.cb!==this.cbMode){this.cbMode=e.cb,this.needsRebuild=!0;for(const x of this.icons.values())x.dispose();this.icons.clear()}(t.def!==this.def||this.needsRebuild||!this.level)&&this.build(t);const s=this.level,r=this.cbMode?Rc:wc;this.time+=n;const a=this.time,o=e.reduce,l=this.u;l.uTime.value=a,l.uSweep.value=o?0:1;const c=t.guards.some(x=>x.state==="alert"),h=t.alert>=60||c?2:t.alert>=30?1:0,u=h===2?1:h===1?.55:0;l.uAlert.value+=(u-l.uAlert.value)*(1-Math.exp(-n*3)),l.uAlertCol.value.copy(h===2||t.blackout?r.alert:r.amber);const f=t.blackout?0:1;this.fixtureLevel+=(f-this.fixtureLevel)*(n>0?1-Math.exp(-n*2.2):1),e.menu&&(this.fixtureLevel=1),l.uBakeGain.value=Bv*(.03+.97*this.fixtureLevel),l.uEmerg.value=t.blackout?.7:0,s.fixtureMat.emissiveIntensity=2.6*this.fixtureLevel,s.beaconMat.emissive.copy(l.uAlertCol.value),s.beaconMat.emissiveIntensity=l.uAlert.value>.05||t.blackout?o?2.5:1.5+1.5*Math.abs(Math.sin(a*2.4)):0,s.update(t,n,a,o,r,!!e.menu);const d=t.player,v=this.player;v.root.visible=!d.hidden&&!e.menu,Cc(v,d.x,d.y,{face:d.dir,sneak:d.sneak,alert:!1,suspicious:!1,headLead:!0},n,o);const g=zr(t,d.x,d.y);this.rim.value.setRGB(.08,.13,.17).multiplyScalar(g?.6:1.4);const m=this.visMat.uniforms;this.visRing.visible=!d.hidden&&!e.menu,this.visRing.position.set(d.x,.02,d.y),g?(m.uColor.value.copy(r.suspicious),m.uAlpha.value=.95,m.uDashN.value=0,m.uRays.value=d.sneak?2:4,m.uR0.value=.5,m.uR1.value=.58,this.visRing.scale.setScalar(.62)):(m.uColor.value.copy(r.patrol),m.uAlpha.value=.45,m.uDashN.value=12,m.uRays.value=0,m.uR0.value=.54,m.uR1.value=.58,this.visRing.scale.setScalar(.62)),m.uRot.value=0;const p=e.cones&&!e.menu;t.guards.forEach((x,M)=>this.updateGuard(t,x,this.guards[M],r,p,n,o,e)),t.cameras.forEach((x,M)=>{const S=this.camsV[M],L=x.range*Jn[t.difficulty].range,A=t.blackout,R=x.loopT>0,C=!R&&!A,y=x.trackT>0||x.sus>50,_=y?r.alert:r.camera;if(S.spot){const O=s.cams[M].lensPos.getWorldPosition(new P);S.spot.position.copy(O),S.spot.target.position.set(x.x+Math.cos(x.dir)*L*.62,0,x.y+Math.sin(x.dir)*L*.62),S.spot.distance=L*1.1,S.spot.angle=x.fov/2,S.spot.color.copy(y?new Tt(1,.55,.5):new Tt(.82,.9,1)),S.spot.intensity=C?26:0}const w={color:_,fill:.07,edge:.45,pattern:3,edgeStyle:1};S.cone.update(t,x.x,x.y,x.dir,x.fov,L,L*xt.SHADOW_RANGE,w,new Tt(.55,.62,.7)),S.cone.mesh.visible=p&&C,S.cone.light.visible=!this.q.spots&&C&&!e.menu,S.bar.mesh.visible=C&&x.sus>1&&!e.menu,S.bar.mesh.visible&&(S.bar.mesh.position.set(x.x,1.55,x.y),S.bar.mesh.quaternion.copy(this.camera.quaternion),S.bar.mat.uniforms.uFill.value=Math.min(1,x.sus/100),S.bar.mat.uniforms.uColor.value.copy(x.sus>=100?r.alert:x.sus>=xt.SUS_THRESHOLD?r.suspicious:r.patrol)),S.label.sprite.position.set(x.x,1.62,x.y),S.label.set(e.menu?"":A?"Offline":R&&x.loopT<9e3?`Looped ${x.loopT.toFixed(1)} s`:R?"Offline":"")}),this.updateEffects(t,r,a,o,e),this.updateCamera(t,e,n),this.composer?this.composer.render(n):this.renderer.render(this.scene,this.camera)}updateGuard(t,e,n,s,r,a,o,l){const c=e.range*Jn[t.difficulty].range;Cc(n.rig,e.x,e.y,{face:e.dir,sneak:!1,alert:e.state==="alert",suspicious:e.state==="suspicious"||e.state==="search",headLead:!0},a,o);const h=e.state==="patrol"?s.patrol:e.state==="suspicious"?s.suspicious:e.state==="alert"?s.alert:s.search,u=Math.cos(e.dir),f=Math.sin(e.dir);if(n.spot&&(n.spot.position.set(e.x+u*.24,.64,e.y+f*.24),n.spot.target.position.set(e.x+u*c*.85,0,e.y+f*c*.85),n.spot.distance=c*1.08,n.spot.angle=e.fov/2,n.spot.intensity=e.state==="alert"?40:e.state==="patrol"?28:34),n.volume){let p=0;for(;p<c&&!Br(t,Math.floor(e.x+u*p),Math.floor(e.y+f*p));p+=.15);const x=Math.max(.5,Math.min(p,c)*.9);n.volume.position.set(e.x+u*.24,.64,e.y+f*.24),n.volume.rotation.set(0,-e.dir,-.09),n.volume.scale.set(x,Math.tan(e.fov/2)*x*.8,Math.tan(e.fov/2)*x*.8),n.volume.visible=!l.menu||!0}const d=e.state==="patrol"?{color:h,fill:.06,edge:.4,pattern:(this.cbMode,0),edgeStyle:0}:e.state==="suspicious"?{color:h,fill:.07,edge:.7,pattern:1,edgeStyle:1}:e.state==="alert"?{color:h,fill:.09,edge:.9,pattern:2,edgeStyle:2}:{color:h,fill:.06,edge:.65,pattern:3,edgeStyle:3};n.cone.update(t,e.x,e.y,e.dir,e.fov,c,c*xt.SHADOW_RANGE,d,new Tt(.95,.88,.72)),n.cone.mesh.visible=r,n.cone.light.visible=!this.q.spots;const v=this.icon(e.state,s),g=n.icon.material;n.icon.visible=!!v&&!l.menu,v&&g.map!==v&&(g.map=v,g.needsUpdate=!0);const m=e.state==="alert"&&!o?1+.1*Math.sin(this.time*9):1;n.icon.scale.set(.42*m,.42*m,1),n.icon.position.set(e.x,1.62,e.y),n.bar.mesh.visible=e.sus>1&&e.state!=="alert"&&!l.menu,n.bar.mesh.visible&&(n.bar.mesh.position.set(e.x,1.33,e.y),n.bar.mesh.quaternion.copy(this.camera.quaternion),n.bar.mat.uniforms.uFill.value=Math.min(1,e.sus/100),n.bar.mat.uniforms.uColor.value.copy(e.sus>=100?s.alert:e.sus>=xt.SUS_THRESHOLD?s.suspicious:s.patrol))}updateEffects(t,e,n,s,r){let a=0;for(const h of t.rings){if(a>=this.noise.length)break;const u=this.noise[a++],f=h.age/h.ttl,d=h.kind==="step"||h.kind==="sneak",v=h.r*(d?.4+.6*f:.3+.7*f);u.mesh.visible=!r.menu,u.mesh.position.set(h.x,.03,h.y),u.mesh.scale.setScalar(Math.max(.05,s&&!d?h.r:v));const g=h.kind==="alarm"?e.alert:h.kind==="hack"?e.laser:h.kind==="decoy"?e.amber:e.patrol;u.mat.uniforms.uColor.value.copy(g),u.mat.uniforms.uAlpha.value=(d?.22:.7)*(1-f),u.mat.uniforms.uR0.value=d?.97:.95,u.mat.uniforms.uDashN.value=h.kind==="alarm"?0:h.kind==="decoy"?16:0}for(;a<this.noise.length;a++)this.noise[a].mesh.visible=!1;const o=t.decoy;if(this.decoy.visible=!!o&&!r.menu,o){this.decoy.position.set(o.x,0,o.y);const h=s?!0:Math.floor(n*4)%2===0;this.decoyLed.emissiveIntensity=h?4:.3,this.decoyArc.uniforms.uColor.value.copy(e.amber),this.decoyArc.uniforms.uProg.value=Math.max(0,Math.min(1,o.t/xt.DECOY_T)),this.decoyArc.uniforms.uAlpha.value=.85}const l=t.player.focus,c=l&&!r.menu?as(t).find(h=>h.kind===l.kind&&h.i===l.i):void 0;if(this.focusRing.visible=!!c,this.focusLine.visible=!!c&&!t.player.hidden,c){this.focusRing.position.set(c.x,c.kind==="camera"?.04:.05,c.y),this.focusRing.scale.setScalar(.62),this.focusMat.uniforms.uColor.value.copy(e.laser),this.focusMat.uniforms.uRot.value=s?0:n*.6,this.focusMat.uniforms.uAlpha.value=.9;const h=this.focusLine.geometry.attributes.position;h.setXYZ(0,t.player.x,.05,t.player.y),h.setXYZ(1,c.x,.05,c.y),h.needsUpdate=!0,this.focusLine.material.color.copy(e.laser)}this.u.uCut.value.set(t.player.x,0,t.player.y),this.u.uCutOn.value=r.menu?0:1}updateCamera(t,e,n){const s=t.player;let r,a,o;if(e.menu){const v=this.time*(e.reduce?0:.05);r=t.map.w*(.5+Math.sin(v)*.22),a=t.map.h*(.52+Math.cos(v*.7)*.12),o=Math.max(18,t.map.w*.62)}else{const v=n>0?(s.x-this.lastPX)/n:0,g=n>0?(s.y-this.lastPY)/n:0,m=Math.hypot(v,g),p=new P(m>.3&&m<8&&!e.reduce?v/m*1.4:0,0,m>.3&&m<8&&!e.reduce?g/m*1.4:0);this.lead.lerp(p,1-Math.exp(-n*2.2)),o=e.zoom?30:this.camDist;const x=Math.min(t.map.w/2,o*.42*this.camera.aspect),M=Math.min(t.map.h/2,o*.3);r=Math.max(x,Math.min(t.map.w-x,s.x+this.lead.x)),a=Math.max(M-1,Math.min(t.map.h-M+1.5,s.y+this.lead.z))}this.lastPX=s.x,this.lastPY=s.y,this.camInit||(this.camT.set(r,0,a),this.camInit=!0,this.curDist=o);const l=1-Math.exp(-n*(e.menu?1:4.5));this.camT.x+=(r-this.camT.x)*l,this.camT.z+=(a-this.camT.z)*l,this.curDist+=(o-this.curDist)*(1-Math.exp(-n*3));let c=0,h=0;this.shake>0&&(this.shake-=n,e.reduce||(c=(Math.random()-.5)*.16,h=(Math.random()-.5)*.16));const u=zv-(e.menu?.12:0)+this.lead.z*.02,f=this.camT.x-this.lead.x*.25+c,d=this.camT.z+Math.cos(u)*this.curDist+h;this.camera.position.set(f,Math.sin(u)*this.curDist,d),this.camera.lookAt(this.camT.x+c,0,this.camT.z+h)}dispose(){this.teardown();for(const t of this.icons.values())t.dispose();this.composer?.dispose(),this.env?.dispose(),this.pmrem.dispose(),this.renderer.dispose(),this.canvas.remove()}}const Fh="blackout-protocol:v1";function Wv(){let i=!1;try{i=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}catch{}return{volume:.7,mute:!1,colorblind:!1,cones:!0,difficulty:"normal",reduceMotion:i,quality:"auto"}}function Or(){return{v:1,unlocked:0,best:{},settings:Wv(),checkpoint:null}}let Do=null;const Xi=i=>typeof i=="object"&&i!==null&&!Array.isArray(i),xr=(i,t,e,n)=>typeof i=="number"&&Number.isFinite(i)?Math.min(e,Math.max(t,i)):n;function Xv(i){const t=Or();if(!Xi(i)||i.v!==1)return t;const e=Or();if(e.unlocked=Math.floor(xr(i.unlocked,0,3,0)),Xi(i.best))for(const[n,s]of Object.entries(i.best))Xi(s)&&typeof s.rating=="string"&&/^[SABC]$/.test(s.rating)&&(e.best[n]={score:xr(s.score,0,5e3,0),rating:s.rating,time:xr(s.time,0,99999,0)});if(Xi(i.settings)){const n=i.settings;e.settings={volume:xr(n.volume,0,1,t.settings.volume),mute:typeof n.mute=="boolean"?n.mute:t.settings.mute,colorblind:typeof n.colorblind=="boolean"?n.colorblind:t.settings.colorblind,cones:typeof n.cones=="boolean"?n.cones:t.settings.cones,difficulty:n.difficulty==="easy"||n.difficulty==="hard"||n.difficulty==="normal"?n.difficulty:"normal",reduceMotion:typeof n.reduceMotion=="boolean"?n.reduceMotion:t.settings.reduceMotion,quality:n.quality==="low"||n.quality==="medium"||n.quality==="high"?n.quality:"auto"}}if(Xi(i.checkpoint)&&typeof i.checkpoint.mission=="string"&&Xi(i.checkpoint.snapshot)){const n=i.checkpoint.difficulty;e.checkpoint={mission:i.checkpoint.mission,difficulty:n==="easy"||n==="hard"?n:"normal",snapshot:i.checkpoint.snapshot}}return e}function qv(){let i=null;try{i=localStorage.getItem(Fh)}catch{i=Do}if(i===null&&(i=Do),!i)return Or();try{return Xv(JSON.parse(i))}catch{return Or()}}function Yv(i){let t;try{t=JSON.stringify(i)}catch{return}Do=t;try{localStorage.setItem(Fh,t)}catch{}}const Na={ArrowUp:0,KeyW:0,ArrowRight:1,KeyD:1,ArrowDown:2,KeyS:2,ArrowLeft:3,KeyA:3};class $v{constructor(){G(this,"enabled",!1);G(this,"puzzleActive",!1);G(this,"keys",new Set);G(this,"touchHold",new Set);G(this,"sneakToggle",!1);G(this,"edge",{interact:!1,hack:!1,cycle:!1,decoy:!1,dir:-1,cancel:!1});G(this,"onPause",()=>{});G(this,"onMute",()=>{});G(this,"onGesture",()=>{});G(this,"onMenuNav",()=>{})}attach(){window.addEventListener("keydown",t=>this.down(t)),window.addEventListener("keyup",t=>{this.keys.delete(t.code)}),window.addEventListener("blur",()=>this.releaseAll()),window.addEventListener("pointerdown",()=>this.onGesture(),{passive:!0}),document.querySelectorAll("[data-hold]").forEach(t=>{const e=t.dataset.hold??"",n=r=>{r.preventDefault(),this.touchHold.add(e),this.onGesture()},s=()=>{this.touchHold.delete(e)};t.addEventListener("pointerdown",n),t.addEventListener("pointerup",s),t.addEventListener("pointercancel",s),t.addEventListener("pointerleave",s)}),document.querySelectorAll("[data-tap]").forEach(t=>{t.addEventListener("pointerdown",e=>{e.preventDefault(),this.onGesture();const n=t.dataset.tap;n==="interact"?this.edge.interact=!0:n==="hack"?this.edge.hack=!0:n==="cycle"?this.edge.cycle=!0:n==="decoy"&&(this.edge.decoy=!0)})}),document.querySelectorAll('[data-toggle="sneak"]').forEach(t=>{t.addEventListener("pointerdown",e=>{e.preventDefault(),this.sneakToggle=!this.sneakToggle,t.setAttribute("aria-pressed",String(this.sneakToggle))})}),document.querySelectorAll("[data-pz]").forEach(t=>{t.addEventListener("pointerdown",e=>{e.preventDefault(),this.edge.dir=Number(t.dataset.pz)})})}releaseAll(){this.keys.clear(),this.touchHold.clear(),this.edge={interact:!1,hack:!1,cycle:!1,decoy:!1,dir:-1,cancel:!1}}down(t){if(t.ctrlKey||t.metaKey||t.altKey)return;this.onGesture();const e=t.code;if(e==="KeyM"){t.repeat||this.onMute();return}if(!this.enabled){(e==="ArrowDown"||e==="ArrowUp")&&(t.preventDefault(),this.onMenuNav(e==="ArrowDown"?1:-1));return}if(e==="Escape"){t.preventDefault(),t.repeat||(this.puzzleActive?this.edge.cancel=!0:this.onPause());return}if(e==="KeyP"){t.repeat||this.onPause();return}(e in Na||e==="Tab"||e==="Space"||e==="Enter")&&t.preventDefault(),!t.repeat&&(this.keys.add(e),e in Na?this.edge.dir=Na[e]:e==="KeyE"?this.edge.interact=!0:e==="Space"||e==="KeyH"||e==="Enter"?this.edge.hack=!0:e==="Tab"||e==="KeyQ"?this.edge.cycle=!0:e==="KeyF"&&(this.edge.decoy=!0))}zoomHeld(){return this.enabled&&this.keys.has("KeyZ")}poll(){const t=this.keys,e=this.touchHold,n=t.has("KeyA")||t.has("ArrowLeft")||e.has("left"),s=t.has("KeyD")||t.has("ArrowRight")||e.has("right"),r=t.has("KeyW")||t.has("ArrowUp")||e.has("up"),a=t.has("KeyS")||t.has("ArrowDown")||e.has("down"),o={mx:(s?1:0)-(n?1:0),my:(a?1:0)-(r?1:0),sneak:t.has("ShiftLeft")||t.has("ShiftRight")||t.has("KeyC")||this.sneakToggle,interact:this.edge.interact,hack:this.edge.hack,cycle:this.edge.cycle,decoy:this.edge.decoy,dir:this.edge.dir,cancel:this.edge.cancel};return this.edge={interact:!1,hack:!1,cycle:!1,decoy:!1,dir:-1,cancel:!1},o}}const et=i=>{const t=document.getElementById(i);if(!t)throw new Error(`missing element #${i}`);return t},yr=["▲","▶","▼","◀"],Fa=["title","missions","briefing","settings","help","pause","compromised","result","epilogue","error"],Kv=/^(ALPHA|BETA|WARDEN|R\d|[A-J]|HX-\d+|\d+S?)$/;function qi(i){const t=Math.floor(i);return`${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`}const Yi=i=>String(i).padStart(2,"0");function Es(i){const e=i.split(/(\s+)/).map((s,r)=>{const a=s.replace(/[^A-Z0-9-]/g,"");return a&&Kv.test(a)&&r>0?s:s.toLowerCase()}).join(""),n=e.search(/[a-z]/);return n<0?e:e.slice(0,n)+e.charAt(n).toUpperCase()+e.slice(n+1)}const Mr=i=>i.toLowerCase().replace(/\b[a-z]/g,t=>t.toUpperCase());function Ts(i){try{return new URLSearchParams(location.search).get(i)}catch{return null}}class jv{constructor(){G(this,"save",qv());G(this,"audio",new Au);G(this,"input",new $v);G(this,"renderer");G(this,"r3d",null);G(this,"world",null);G(this,"mission",0);G(this,"startSnap",null);G(this,"cpSnap",null);G(this,"mode","menu");G(this,"acc",0);G(this,"last",0);G(this,"hudT",0);G(this,"settingsReturn","title");G(this,"objSig","");G(this,"pzSig","");G(this,"compT",0);G(this,"resultT",0);G(this,"lastResult",null);G(this,"failed",!1);G(this,"briefingIndex",0);G(this,"noticeT",0);G(this,"qualityOverride",null);G(this,"bgWorld",null);const t=Ts("quality");(t==="low"||t==="medium"||t==="high")&&(this.qualityOverride=t),this.renderer=this.createRenderer(),this.input.attach(),this.input.onGesture=()=>this.audio.ensure(),this.input.onPause=()=>this.togglePause(),this.input.onMute=()=>this.toggleMute(),this.input.onMenuNav=s=>this.menuNav(s),window.addEventListener("resize",()=>this.renderer.resize()),window.addEventListener("orientationchange",()=>setTimeout(()=>this.renderer.resize(),120)),document.addEventListener("visibilitychange",()=>{document.hidden&&this.mode==="playing"&&this.pause()}),window.addEventListener("blur",()=>{this.mode==="playing"&&this.pause()});try{matchMedia("(pointer: coarse)").matches&&document.body.classList.add("touch-on")}catch{}const e=et("meterEnergy");for(let s=0;s<10;s++)e.appendChild(document.createElement("i"));this.bindUi(),this.applySettings(),this.refreshTitle(),this.show("title"),Ts("debug")==="1"&&(window.__bp=this);const n=Number(Ts("mission"));if(Number.isInteger(n)&&n>=1&&n<=Se.length){this.beginMission(n-1);const s=Ts("spawn")?.split(",").map(Number);Ts("debug")==="1"&&s&&s.length===2&&s.every(Number.isFinite)&&this.world&&(this.world.player.x=s[0],this.world.player.y=s[1])}}start(){this.last=performance.now(),requestAnimationFrame(t=>this.frame(t))}qualityPref(){return this.qualityOverride??this.save.settings.quality}createRenderer(){try{const t=new Vv(this.qualityPref(),{onStatus:e=>this.notice(e,0),onFatal:()=>this.fallback2D("The 3D view could not be restored after the graphics driver reset, so the game switched to the 2D tactical view.")});return this.r3d=t,document.body.classList.add("r3d"),t}catch(t){return console.warn("BLACKOUT PROTOCOL: WebGL unavailable, using the 2D view",t),setTimeout(()=>this.notice("WebGL is not available in this browser, so the game is showing the 2D tactical view. The rules are the same.",9),0),document.body.classList.remove("r3d"),new dl(et("view"))}}fallback2D(t){try{this.renderer.dispose()}catch{}this.r3d=null,document.body.classList.remove("r3d"),this.renderer=new dl(et("view")),this.renderer.resize(),this.notice(t,10),this.applySettings()}notice(t,e){const n=et("gfxNotice");if(!t){n.classList.add("hidden"),this.noticeT=0;return}n.textContent=t,n.classList.remove("hidden"),this.noticeT=e}bindUi(){const t=(n,s)=>{et(n).addEventListener("click",()=>{this.audio.ensure(),this.audio.uiClick(),s()})};t("btnContinue",()=>this.continueMission()),t("btnMissions",()=>this.showMissions()),t("btnSettings",()=>this.openSettings("title")),t("btnHelp",()=>this.show("help")),t("helpBack",()=>this.show("title")),t("missionsBack",()=>this.show("title")),t("brBack",()=>this.showMissions()),t("brStart",()=>this.beginMission(this.briefingIndex)),t("settingsBack",()=>this.show(this.settingsReturn)),t("pResume",()=>this.resume()),t("pCheckpoint",()=>this.restartCheckpoint()),t("pRestart",()=>this.beginMission(this.mission)),t("pSettings",()=>this.openSettings("pause")),t("pQuit",()=>this.quitToMissions()),t("resRetry",()=>this.beginMission(this.mission)),t("resMenu",()=>this.quitToMissions()),t("epMenu",()=>this.quitToMissions()),t("errRestart",()=>{this.failed=!1,this.quitToMissions(),this.show("title")}),t("btnPause",()=>this.pause());const e=()=>this.save.settings;et("setVolume").addEventListener("input",n=>{e().volume=Number(n.target.value)/100,this.applySettings(),this.persist()}),et("setMute").addEventListener("change",n=>{e().mute=n.target.checked,this.applySettings(),this.persist()}),et("setCb").addEventListener("change",n=>{e().colorblind=n.target.checked,this.applySettings(),this.persist()}),et("setCones").addEventListener("change",n=>{e().cones=n.target.checked,this.persist()}),et("setReduce").addEventListener("change",n=>{e().reduceMotion=n.target.checked,this.applySettings(),this.persist()}),et("setDiff").addEventListener("change",n=>{e().difficulty=n.target.value,this.world&&(this.world.difficulty=e().difficulty),this.persist()}),et("setQuality").addEventListener("change",n=>{const s=n.target.value;e().quality=s==="low"||s==="medium"||s==="high"?s:"auto",this.qualityOverride=null,this.persist(),this.applySettings()})}persist(){Yv(this.save)}applySettings(){const t=this.save.settings;this.audio.setVolume(t.volume,t.mute),document.documentElement.dataset.cb=t.colorblind?"1":"0",document.body.classList.toggle("reduce",t.reduceMotion),et("setVolume").value=String(Math.round(t.volume*100)),et("outVolume").textContent=String(Math.round(t.volume*100)),et("setMute").checked=t.mute,et("setCb").checked=t.colorblind,et("setCones").checked=t.cones,et("setReduce").checked=t.reduceMotion,et("setDiff").value=t.difficulty,et("setQuality").value=t.quality;const e=et("qualityNote");if(this.r3d){const n=this.qualityPref();this.r3d.setQuality(n==="auto"?this.r3d.detected:n);const s=this.r3d.detected.charAt(0).toUpperCase()+this.r3d.detected.slice(1);et("setQuality").options[0].textContent=`Auto (${s} detected)`,e.textContent="Resolution, shadows, bloom and haze"}else e.textContent="The 2D tactical view is in use, so this has no effect"}toggleMute(){this.save.settings.mute=!this.save.settings.mute,this.applySettings(),this.persist(),(this.mode==="playing"||this.mode==="paused")&&this.toast(this.save.settings.mute?"Sound muted":"Sound on","")}show(t){for(const s of Fa)et(`screen-${s}`).classList.toggle("hidden",s!==t);this.input.enabled=!1,et("hud").classList.toggle("hidden",!(t==="pause"||t==="compromised")),et("puzzle").classList.add("hidden");const n=et(`screen-${t}`).querySelector("button:not(.hidden):not(:disabled), input, select");n&&t!=="compromised"&&setTimeout(()=>n.focus({preventScroll:!0}),0)}hideScreens(){for(const t of Fa)et(`screen-${t}`).classList.add("hidden");et("hud").classList.remove("hidden"),document.activeElement instanceof HTMLElement&&document.activeElement.blur()}menuNav(t){const e=Fa.map(r=>et(`screen-${r}`)).find(r=>!r.classList.contains("hidden"));if(!e)return;const n=Array.from(e.querySelectorAll("button:not(.hidden):not(:disabled), input, select"));if(!n.length)return;const s=n.indexOf(document.activeElement);n[(s+t+n.length)%n.length].focus()}openSettings(t){this.settingsReturn=t,this.show("settings")}refreshTitle(){const t=this.save.checkpoint,e=!!t&&Se.some(n=>n.id===t.mission);if(et("btnContinue").classList.toggle("hidden",!e),e){const n=Se.find(s=>s.id===t.mission);et("btnContinue").textContent=`Continue ${Mr(n.name)} from the checkpoint`}}showMissions(){const t=et("missionList");t.textContent="",Se.forEach((e,n)=>{const s=document.createElement("button");s.type="button",s.className="mission";const r=n>this.save.unlocked;s.disabled=r;const a=this.save.best[e.id],o=document.createElement("span");o.className="file",o.textContent=`File ${Yi(n+1)}`;const l=document.createElement("span"),c=document.createElement("span");c.className="nm",c.textContent=Mr(e.name);const h=document.createElement("span");h.className="sub",h.textContent=r?`Locked. Finish file ${Yi(n)} first.`:e.subtitle,l.append(c,h);const u=document.createElement("span");if(u.className="bst",a){const f=document.createElement("span");f.className="r",f.textContent=a.rating,f.setAttribute("aria-label",`rating ${a.rating}`);const d=document.createElement("span");d.className="num",d.textContent=`${a.score} pts, ${qi(a.time)}`,u.append(f,d)}else u.textContent=r?"":"Not cleared yet";s.append(o,l,u),s.setAttribute("aria-label",`${Mr(e.name)}, ${r?"locked":e.subtitle}${a?`, best rating ${a.rating}`:""}. Open the briefing.`),s.addEventListener("click",()=>{this.audio.ensure(),this.audio.uiClick(),this.showBriefing(n)}),t.appendChild(s)}),this.show("missions")}showBriefing(t){const e=Se[t];this.briefingIndex=t,et("brIndex").textContent=`File ${Yi(t+1)} of ${Yi(Se.length)}, ${e.subtitle}`,et("brName").textContent=e.name,et("brSub").textContent=`Par time ${qi(e.par)}`;const n=et("brText");n.textContent="";for(const a of e.briefing){const o=document.createElement("p");o.textContent=a,n.appendChild(o)}const s=et("brObj");s.textContent="";for(const a of e.objectives){const o=document.createElement("li");o.textContent=a.label,s.appendChild(o)}const r=et("brHints");r.textContent="";for(const a of e.hints){const o=document.createElement("li");o.textContent=a,r.appendChild(o)}this.show("briefing")}beginMission(t){this.mission=t;const e=Se[t],n=$r(e,this.save.settings.difficulty,Math.floor(Math.random()*2147483647));this.world=n,this.startSnap=zs(n),this.cpSnap=null,this.enterPlay()}continueMission(){const t=this.save.checkpoint;if(!t)return;const e=Se.findIndex(n=>n.id===t.mission);if(e<0||e>this.save.unlocked){this.save.checkpoint=null,this.persist(),this.refreshTitle();return}try{const n=$r(Se[e],this.save.settings.difficulty,1);if(this.startSnap=zs(n),Kr(n,t.snapshot,!1),!n.guards.length&&Se[e].guards.length)throw new Error("bad snapshot");this.mission=e,this.world=n,this.cpSnap=zs(n),this.enterPlay()}catch{this.save.checkpoint=null,this.persist(),this.refreshTitle()}}enterPlay(){const t=Se[this.mission];this.mode="playing",this.hideScreens(),this.input.enabled=!0,this.input.releaseAll(),this.renderer.resize(),this.renderer.resetCamera(),this.acc=0,et("hudIndex").textContent=`File ${Yi(this.mission+1)}`,et("hudName").textContent=Mr(t.name),et("hudPar").textContent=qi(t.par),this.objSig="",et("toasts").textContent="",this.audio.ensure(),this.audio.startMusic(),et("countdown").classList.add("hidden"),this.toast("Infiltrate. Stay in the dark.","")}pause(){this.mode==="playing"&&(this.mode="paused",this.show("pause"))}resume(){this.mode==="paused"&&(this.mode="playing",this.hideScreens(),this.input.enabled=!0,this.input.releaseAll(),this.last=performance.now())}togglePause(){this.mode==="playing"?this.pause():this.mode==="paused"&&this.resume()}restartCheckpoint(){this.world&&(Kr(this.world,this.cpSnap??this.startSnap),this.mode="playing",this.hideScreens(),this.input.enabled=!0,this.input.releaseAll(),this.renderer.resetCamera(),this.objSig="",this.toast("Restarted from the checkpoint",""))}quitToMissions(){this.mode="menu",this.audio.stopMusic(),this.world=null,this.refreshTitle(),this.showMissions()}nextMission(){this.mission+1<Se.length?this.showBriefing(this.mission+1):this.showMissions()}finishMission(t){const e=Tu(t);this.lastResult=e;const n=Se[this.mission],s=this.save.best[n.id];(!s||e.score>s.score)&&(this.save.best[n.id]={score:e.score,rating:e.rating,time:Math.round(e.time)}),this.save.unlocked=Math.max(this.save.unlocked,Math.min(Se.length-1,this.mission+1)),this.save.checkpoint=null,this.persist(),this.mode="result",this.resultT=1.1,this.audio.stopMusic()}showResult(){const t=this.lastResult;if(!t)return;const e=Se[this.mission];et("resFile").textContent=`File ${Yi(this.mission+1)}`,et("resName").textContent=e.name,et("resSub").textContent=e.subtitle,et("resRating").textContent=t.rating,et("resRating").setAttribute("aria-label",`Rating ${t.rating}`),et("resTime").textContent=`${qi(t.time)}  (par ${qi(t.par)})`,et("resAlert").textContent=`${t.peakAlert}`,et("resSpotted").textContent=String(t.spotted),et("resAlarms").textContent=String(t.alarms),et("resHacks").textContent=String(t.hacks),et("resRetries").textContent=String(t.retries),et("resScore").textContent=String(t.score);const n=this.save.best[e.id];et("resBest").textContent=n?`${n.rating} ${n.score}`:"-",et("resTags").textContent=t.tags.map(r=>Es(r)).join(", ");const s=this.mission+1>=Se.length;et("resNext").textContent=s?"Read the closing note":"Next mission",et("resNext").onclick=()=>{this.audio.uiClick(),s?this.show("epilogue"):this.nextMission()},this.show("result")}toast(t,e){const n=document.createElement("div");n.className=`toast ${e}`,n.textContent=t;const s=et("toasts");for(s.appendChild(n);s.children.length>3;)s.removeChild(s.firstChild);setTimeout(()=>n.remove(),2800),et("liveRegion").textContent=t}toastClass(t){return/NOT ENOUGH|DENIED|LOCKED —|LOCKED OUT|INTRUSION|TRIPPED|SPOTTED|OBSTRUCTED|OUT OF RANGE|NO DEVICE|ALREADY/.test(t)?"bad":/COMPLETE|GRANTED|SAVED|ACQUIRED|SECURED|\+40|LOOPED|CUT|DEPLOYED|UNLOCKED/.test(t)?"good":""}updateHud(t){const e=t.player;et("hudTime").textContent=qi(t.time);const n=Math.max(0,Math.min(100,e.energy)),s=as(t),r=e.focus&&s.find(M=>M.kind===e.focus.kind&&M.i===e.focus.i),a=r?r.cost:xt.COST_DECOY,o=n+1e-6<a,l=et("meterEnergy").children;for(let M=0;M<10;M++){const S=l[M],L=M*10,A=L+10,R=Math.max(0,Math.min(1,(n-L)/10));S.className=R>=.999?"on":R>0?"part":"",R>0&&R<.999&&S.style.setProperty("--p",`${Math.round(R*100)}%`),r&&A>n-a&&L<n&&S.classList.add("cost")}et("kit").classList.toggle("short",!!r&&o),et("valEnergy").textContent=String(Math.round(n)),et("meterEnergy").setAttribute("aria-valuenow",String(Math.round(n)));const c=Math.round(t.alert),h=t.alert>=100?3:t.alert>=60?2:t.alert>=30?1:0;et("barAlert").style.width=`${Math.min(100,t.alert)}%`,et("valAlert").textContent=["Calm","Caution","Danger","Lockdown"][h],et("numAlert").textContent=String(c),et("meterAlert").dataset.band=String(h),et("meterAlert").setAttribute("aria-valuenow",String(c)),et("meterAlert").setAttribute("aria-valuetext",`${["Calm","Caution","Danger","Lockdown"][h]}, ${c}`);const u=zr(t,e.x,e.y),f=e.hidden?0:u?e.sneak?75:100:e.sneak?30:40,d=e.hidden?"hidden":u?"lit":"shadow";for(const M of Array.from(et("meterVis").children))M.classList.toggle("on",M.dataset.l===d);const v=e.hidden?"In a locker":`${u?"Lit":"Shadow"}, ${e.sneak?"sneaking":"walking"}`;et("valVis").textContent=v,et("meterVis").setAttribute("aria-valuenow",String(f)),et("meterVis").setAttribute("aria-valuetext",v);const g=t.def.objectives.map(M=>t.objectives[M.id]?"1":"0").join("");if(g!==this.objSig){const M=this.objSig;this.objSig=g;const S=et("objList");S.textContent="";for(const L of t.def.objectives){const A=document.createElement("li");A.textContent=L.label,t.objectives[L.id]&&(A.className="done",A.setAttribute("aria-label",`${L.label}, done`)),S.appendChild(A)}M&&(et("liveRegion").textContent="Objective updated")}const m=et("hackTarget"),p=et("hackAction");if(m.textContent="",r){m.append(Es(r.label));const M=document.createElement("span");M.className="num",M.textContent=`${r.dist.toFixed(1)} tiles${s.length>1?`, ${s.length-1} more`:""}`,m.append(M),p.textContent=o?`Need ${r.cost}`:`${Es(r.action)} ${r.cost}`,p.className=`kit-action${o?" short":""}`}else m.textContent="No device in range",p.textContent=`Decoy ${xt.COST_DECOY}`,p.className="kit-action dim";const x=et("countdown");if(t.finale.active){x.classList.remove("hidden"),x.textContent="";const M=document.createElement("small");M.textContent="Lift closes in";const S=document.createElement("span");S.className="num",S.textContent=Math.max(0,t.finale.t).toFixed(1),x.append(M,S)}else x.classList.add("hidden")}updatePuzzle(t){const e=et("puzzle"),n=t.puzzle;if(this.input.puzzleActive=!!n,!n){e.classList.add("hidden"),this.pzSig="";return}e.classList.remove("hidden");const s=t.terminals[n.terminal];et("pzTitle").textContent=`Terminal ${s.id}, ${Es(s.def.label).toLowerCase()}`;const r=et("pzBar");n.phase==="show"?r.style.width=`${Math.max(0,n.showT/n.showTotal*100)}%`:r.style.width=`${Math.max(0,n.timeLeft/n.limit*100)}%`;const a=`${n.phase}|${n.input.length}|${n.seq.length}|${n.terminal}`;if(a===this.pzSig)return;this.pzSig=a;const o=n.phase==="show"?"Memorise the sequence":n.phase==="input"?`Repeat it: ${n.input.length} of ${n.seq.length}`:n.phase==="ok"?"Access granted":"Intrusion detected",l=et("pzStatus");l.textContent=o,l.className=`pz-status${n.phase==="ok"?" ok":n.phase==="fail"?" bad":""}`;const c=et("pzSeq");c.textContent="",n.seq.forEach((h,u)=>{const f=document.createElement("div");f.className="cell",f.setAttribute("aria-label",n.phase==="show"?lu[h]:"hidden"),n.phase==="show"?(f.classList.add("shown"),f.textContent=yr[h]):n.phase==="ok"?(f.classList.add("ok"),f.textContent=yr[h]):n.phase==="fail"?(f.classList.add("bad"),f.textContent=u<n.input.length?yr[h]:"×"):u<n.input.length?(f.classList.add("ok"),f.textContent=yr[h]):(u===n.input.length&&f.classList.add("next"),f.textContent="·"),c.appendChild(f)})}frame(t){if(requestAnimationFrame(e=>this.frame(e)),!this.failed)try{const e=Math.min(.05,Math.max(0,(t-this.last)/1e3));this.last=t,this.tick(e)}catch(e){this.failed=!0,console.error("BLACKOUT PROTOCOL: simulation error",e),this.mode="menu",this.audio.stopMusic(),this.show("error")}}tick(t){const e=this.world,n=this.save.settings;if(this.noticeT>0&&(this.noticeT-=t,this.noticeT<=0&&this.notice(null,0)),e&&(this.mode==="playing"||this.mode==="compromised"||this.mode==="paused"||this.mode==="result")){if(this.mode==="playing"){this.acc+=t;let r=0,a=this.input.poll();for(;this.acc>=Sr&&r<5&&e.status==="playing";)Mu(e,a,Sr),this.consume(e),a={...a,interact:!1,hack:!1,cycle:!1,decoy:!1,dir:-1,cancel:!1},this.acc-=Sr,r++;r>=5&&(this.acc=0),e.status==="compromised"?this.onCompromised(e):e.status==="complete"&&this.finishMission(e),this.hudT-=t,this.hudT<=0&&(this.hudT=.08,this.updateHud(e)),this.updatePuzzle(e);let o=0;for(const l of e.lasers)if(l.active)for(const c of l.cells)o=Math.max(o,1-Math.hypot(c.x+.5-e.player.x,c.y+.5-e.player.y)/7);this.audio.ambience(e.alert,Math.max(0,o),e.time,n.reduceMotion)}else this.mode==="compromised"?(this.compT-=t,this.compT<=0&&this.recover(e)):this.mode==="result"&&(this.resultT-=t,this.resultT<=0&&(this.mode="menu",this.showResult()));const s=this.mode==="playing"||this.mode==="compromised"||this.mode==="result";this.renderer.draw(e,{cb:n.colorblind,cones:n.cones,reduce:n.reduceMotion,zoom:this.input.zoomHeld()},s?t:0)}else this.renderer.draw(this.menuWorld(),{cb:n.colorblind,cones:!0,reduce:n.reduceMotion,menu:!0},this.renderer.kind==="3d"?t:0)}menuWorld(){return this.world?this.world:(this.bgWorld||(this.bgWorld=$r(Se[0],"normal",7)),this.bgWorld)}consume(t){for(const e of t.events)if(this.audio.play(e),e.k==="toast"&&e.msg)this.toast(Es(e.msg),this.toastClass(e.msg));else if(e.k==="alert"||e.k==="spot"||e.k==="laser"){const n=et("flash");n.classList.add("on"),requestAnimationFrame(()=>requestAnimationFrame(()=>n.classList.remove("on")))}else if(e.k==="checkpoint")this.cpSnap=zs(t),this.save.checkpoint={mission:Se[this.mission].id,difficulty:this.save.settings.difficulty,snapshot:this.cpSnap},this.persist();else if(e.k==="objective"){const n=t.def.objectives.find(s=>s.id===e.msg);n&&this.toast(`Objective done: ${n.label}`,"good")}t.events.length=0}onCompromised(t){this.mode="compromised",this.compT=1.6,this.input.enabled=!1,et("puzzle").classList.add("hidden"),this.input.puzzleActive=!1,this.renderer.kick(),this.audio.play({k:"compromised"}),et("cmpTitle").textContent="Compromised",et("cmpText").textContent=t.reason==="caught"?"A guard caught you. Rebooting from the last checkpoint.":t.reason==="lockdown"?"Facility alert reached 100 and the building locked down. Rebooting from the last checkpoint.":"The lockdown completed before you reached the lift. Rebooting from the last checkpoint.",this.show("compromised")}recover(t){Kr(t,this.cpSnap??this.startSnap),this.mode="playing",this.hideScreens(),this.input.enabled=!0,this.input.releaseAll(),this.renderer.resetCamera(),this.objSig="",this.toast("Retry: penalty applied","bad")}}const Jv=new jv;Jv.start();
