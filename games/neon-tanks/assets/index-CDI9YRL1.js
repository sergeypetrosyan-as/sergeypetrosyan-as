var _u=Object.defineProperty;var yu=(s,t,e)=>t in s?_u(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var y=(s,t,e)=>yu(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $o="170",Mu=0,Rl=1,bu=2,ah=1,oh=2,Un=3,hi=0,Fe=1,qe=2,zn=0,li=1,Ve=2,Cl=3,Pl=4,Su=5,wi=100,wu=101,Tu=102,Eu=103,Au=104,Ru=200,Cu=201,Pu=202,Lu=203,to=204,eo=205,Du=206,Iu=207,Uu=208,Nu=209,ku=210,Fu=211,zu=212,Ou=213,Bu=214,no=0,io=1,so=2,fs=3,ro=4,ao=5,oo=6,lo=7,lh=0,Hu=1,Vu=2,ci=0,ch=1,hh=2,uh=3,Zo=4,Gu=5,dh=6,fh=7,ph=300,ps=301,ms=302,co=303,ho=304,ia=306,Xs=1e3,Ei=1001,uo=1002,Qe=1003,Wu=1004,nr=1005,Sn=1006,fa=1007,Ai=1008,Vn=1009,mh=1010,gh=1011,Ys=1012,jo=1013,Ci=1014,wn=1015,On=1016,Ko=1017,Jo=1018,gs=1020,vh=35902,xh=1021,_h=1022,fn=1023,yh=1024,Mh=1025,cs=1026,vs=1027,Qo=1028,tl=1029,bh=1030,el=1031,nl=1033,Or=33776,Br=33777,Hr=33778,Vr=33779,fo=35840,po=35841,mo=35842,go=35843,vo=36196,xo=37492,_o=37496,yo=37808,Mo=37809,bo=37810,So=37811,wo=37812,To=37813,Eo=37814,Ao=37815,Ro=37816,Co=37817,Po=37818,Lo=37819,Do=37820,Io=37821,Gr=36492,Uo=36494,No=36495,Sh=36283,ko=36284,Fo=36285,zo=36286,Xu=3200,Yu=3201,wh=0,qu=1,ri="",Ye="srgb",Ms="srgb-linear",sa="linear",se="srgb",ki=7680,Ll=519,$u=512,Zu=513,ju=514,Th=515,Ku=516,Ju=517,Qu=518,td=519,Oo=35044,rs=35048,Dl="300 es",Nn=2e3,Yr=2001;class bs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],pa=Math.PI/180,qr=180/Math.PI;function Bn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Le[s&255]+Le[s>>8&255]+Le[s>>16&255]+Le[s>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]).toLowerCase()}function Ue(s,t,e){return Math.max(t,Math.min(e,s))}function ed(s,t){return(s%t+t)%t}function ma(s,t,e){return(1-e)*s+e*t}function bn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function re(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class et{constructor(t=0,e=0){et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Vt{constructor(t,e,n,i,r,a,o,l,h){Vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,h)}set(t,e,n,i,r,a,o,l,h){const c=this.elements;return c[0]=t,c[1]=i,c[2]=o,c[3]=e,c[4]=r,c[5]=l,c[6]=n,c[7]=a,c[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],h=n[1],c=n[4],u=n[7],d=n[2],f=n[5],g=n[8],v=i[0],m=i[3],p=i[6],_=i[1],b=i[4],x=i[7],C=i[2],A=i[5],R=i[8];return r[0]=a*v+o*_+l*C,r[3]=a*m+o*b+l*A,r[6]=a*p+o*x+l*R,r[1]=h*v+c*_+u*C,r[4]=h*m+c*b+u*A,r[7]=h*p+c*x+u*R,r[2]=d*v+f*_+g*C,r[5]=d*m+f*b+g*A,r[8]=d*p+f*x+g*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8];return e*a*c-e*o*h-n*r*c+n*o*l+i*r*h-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],u=c*a-o*h,d=o*l-c*r,f=h*r-a*l,g=e*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(i*h-c*n)*v,t[2]=(o*n-i*a)*v,t[3]=d*v,t[4]=(c*e-i*l)*v,t[5]=(i*r-o*e)*v,t[6]=f*v,t[7]=(n*l-h*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),h=Math.sin(r);return this.set(n*l,n*h,-n*(l*a+h*o)+a+t,-i*h,i*l,-i*(-h*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ga.makeScale(t,e)),this}rotate(t){return this.premultiply(ga.makeRotation(-t)),this}translate(t,e){return this.premultiply(ga.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ga=new Vt;function Eh(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function $r(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function nd(){const s=$r("canvas");return s.style.display="block",s}const Il={};function zs(s){s in Il||(Il[s]=!0,console.warn(s))}function id(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function sd(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function rd(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const $t={enabled:!0,workingColorSpace:Ms,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===se&&(s.r=Hn(s.r),s.g=Hn(s.g),s.b=Hn(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===se&&(s.r=hs(s.r),s.g=hs(s.g),s.b=hs(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ri?sa:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Hn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function hs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Ul=[.64,.33,.3,.6,.15,.06],Nl=[.2126,.7152,.0722],kl=[.3127,.329],Fl=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zl=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);$t.define({[Ms]:{primaries:Ul,whitePoint:kl,transfer:sa,toXYZ:Fl,fromXYZ:zl,luminanceCoefficients:Nl,workingColorSpaceConfig:{unpackColorSpace:Ye},outputColorSpaceConfig:{drawingBufferColorSpace:Ye}},[Ye]:{primaries:Ul,whitePoint:kl,transfer:se,toXYZ:Fl,fromXYZ:zl,luminanceCoefficients:Nl,outputColorSpaceConfig:{drawingBufferColorSpace:Ye}}});let Fi;class ad{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Fi===void 0&&(Fi=$r("canvas")),Fi.width=t.width,Fi.height=t.height;const n=Fi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Fi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=$r("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Hn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Hn(e[n]/255)*255):e[n]=Hn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let od=0;class Ah{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=Bn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(va(i[a].image)):r.push(va(i[a]))}else r=va(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function va(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ad.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ld=0;class ze extends bs{constructor(t=ze.DEFAULT_IMAGE,e=ze.DEFAULT_MAPPING,n=Ei,i=Ei,r=Sn,a=Ai,o=fn,l=Vn,h=ze.DEFAULT_ANISOTROPY,c=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=Bn(),this.name="",this.source=new Ah(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new et(0,0),this.repeat=new et(1,1),this.center=new et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ph)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Xs:t.x=t.x-Math.floor(t.x);break;case Ei:t.x=t.x<0?0:1;break;case uo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Xs:t.y=t.y-Math.floor(t.y);break;case Ei:t.y=t.y<0?0:1;break;case uo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=ph;ze.DEFAULT_ANISOTROPY=1;class ae{constructor(t=0,e=0,n=0,i=1){ae.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,h=l[0],c=l[4],u=l[8],d=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(c-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(c+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(h+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(h+1)/2,x=(f+1)/2,C=(p+1)/2,A=(c+d)/4,R=(u+v)/4,I=(g+m)/4;return b>x&&b>C?b<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(b),i=A/n,r=R/n):x>C?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=A/i,r=I/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=R/r,i=I/r),this.set(n,i,r,e),this}let _=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-c)*(d-c));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(u-v)/_,this.z=(d-c)/_,this.w=Math.acos((h+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class cd extends bs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ae(0,0,t,e),this.scissorTest=!1,this.viewport=new ae(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new ze(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ah(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gn extends cd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Rh extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class hd extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Li{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],h=n[i+1],c=n[i+2],u=n[i+3];const d=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=h,t[e+2]=c,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==d||h!==f||c!==g){let m=1-o;const p=l*d+h*f+c*g+u*v,_=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const C=Math.sqrt(b),A=Math.atan2(C,p*_);m=Math.sin(m*A)/C,o=Math.sin(o*A)/C}const x=o*_;if(l=l*m+d*x,h=h*m+f*x,c=c*m+g*x,u=u*m+v*x,m===1-o){const C=1/Math.sqrt(l*l+h*h+c*c+u*u);l*=C,h*=C,c*=C,u*=C}}t[e]=l,t[e+1]=h,t[e+2]=c,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],h=n[i+2],c=n[i+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+c*u+l*f-h*d,t[e+1]=l*g+c*d+h*u-o*f,t[e+2]=h*g+c*f+o*d-l*u,t[e+3]=c*g-o*u-l*d-h*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,h=o(n/2),c=o(i/2),u=o(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=d*c*u+h*f*g,this._y=h*f*u-d*c*g,this._z=h*c*g+d*f*u,this._w=h*c*u-d*f*g;break;case"YXZ":this._x=d*c*u+h*f*g,this._y=h*f*u-d*c*g,this._z=h*c*g-d*f*u,this._w=h*c*u+d*f*g;break;case"ZXY":this._x=d*c*u-h*f*g,this._y=h*f*u+d*c*g,this._z=h*c*g+d*f*u,this._w=h*c*u-d*f*g;break;case"ZYX":this._x=d*c*u-h*f*g,this._y=h*f*u+d*c*g,this._z=h*c*g-d*f*u,this._w=h*c*u+d*f*g;break;case"YZX":this._x=d*c*u+h*f*g,this._y=h*f*u+d*c*g,this._z=h*c*g-d*f*u,this._w=h*c*u-d*f*g;break;case"XZY":this._x=d*c*u-h*f*g,this._y=h*f*u-d*c*g,this._z=h*c*g+d*f*u,this._w=h*c*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],h=e[2],c=e[6],u=e[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(c-l)*f,this._y=(r-h)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(c-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+h)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-h)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+c)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+h)/f,this._y=(l+c)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ue(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,h=e._z,c=e._w;return this._x=n*c+a*o+i*h-r*l,this._y=i*c+a*l+r*o-n*h,this._z=r*c+a*h+n*l-i*o,this._w=a*c-n*o-i*l-r*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const h=Math.sqrt(l),c=Math.atan2(h,o),u=Math.sin((1-e)*c)/h,d=Math.sin(e*c)/h;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ol.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ol.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,h=2*(a*i-o*n),c=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+l*h+a*u-o*c,this.y=n+l*c+o*h-r*u,this.z=i+l*u+r*c-a*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return xa.copy(this).projectOnVector(t),this.sub(xa)}reflect(t){return this.sub(xa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xa=new D,Ol=new Li;class Di{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(hn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(hn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=hn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,hn):hn.fromBufferAttribute(r,a),hn.applyMatrix4(t.matrixWorld),this.expandByPoint(hn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ir.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ir.copy(n.boundingBox)),ir.applyMatrix4(t.matrixWorld),this.union(ir)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,hn),hn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(As),sr.subVectors(this.max,As),zi.subVectors(t.a,As),Oi.subVectors(t.b,As),Bi.subVectors(t.c,As),qn.subVectors(Oi,zi),$n.subVectors(Bi,Oi),fi.subVectors(zi,Bi);let e=[0,-qn.z,qn.y,0,-$n.z,$n.y,0,-fi.z,fi.y,qn.z,0,-qn.x,$n.z,0,-$n.x,fi.z,0,-fi.x,-qn.y,qn.x,0,-$n.y,$n.x,0,-fi.y,fi.x,0];return!_a(e,zi,Oi,Bi,sr)||(e=[1,0,0,0,1,0,0,0,1],!_a(e,zi,Oi,Bi,sr))?!1:(rr.crossVectors(qn,$n),e=[rr.x,rr.y,rr.z],_a(e,zi,Oi,Bi,sr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,hn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(hn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Cn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Cn=[new D,new D,new D,new D,new D,new D,new D,new D],hn=new D,ir=new Di,zi=new D,Oi=new D,Bi=new D,qn=new D,$n=new D,fi=new D,As=new D,sr=new D,rr=new D,pi=new D;function _a(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){pi.fromArray(s,r);const o=i.x*Math.abs(pi.x)+i.y*Math.abs(pi.y)+i.z*Math.abs(pi.z),l=t.dot(pi),h=e.dot(pi),c=n.dot(pi);if(Math.max(-Math.max(l,h,c),Math.min(l,h,c))>o)return!1}return!0}const ud=new Di,Rs=new D,ya=new D;class Ii{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):ud.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Rs.subVectors(t,this.center);const e=Rs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Rs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ya.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Rs.copy(t.center).add(ya)),this.expandByPoint(Rs.copy(t.center).sub(ya))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Pn=new D,Ma=new D,ar=new D,Zn=new D,ba=new D,or=new D,Sa=new D;class Ch{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Pn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Pn.copy(this.origin).addScaledVector(this.direction,e),Pn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ma.copy(t).add(e).multiplyScalar(.5),ar.copy(e).sub(t).normalize(),Zn.copy(this.origin).sub(Ma);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ar),o=Zn.dot(this.direction),l=-Zn.dot(ar),h=Zn.lengthSq(),c=Math.abs(1-a*a);let u,d,f,g;if(c>0)if(u=a*l-o,d=a*o-l,g=r*c,u>=0)if(d>=-g)if(d<=g){const v=1/c;u*=v,d*=v,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+h}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+h;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+h;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+h):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+h):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+h);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Ma).addScaledVector(ar,d),f}intersectSphere(t,e){Pn.subVectors(t.center,this.origin);const n=Pn.dot(this.direction),i=Pn.dot(Pn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const h=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,d=this.origin;return h>=0?(n=(t.min.x-d.x)*h,i=(t.max.x-d.x)*h):(n=(t.max.x-d.x)*h,i=(t.min.x-d.x)*h),c>=0?(r=(t.min.y-d.y)*c,a=(t.max.y-d.y)*c):(r=(t.max.y-d.y)*c,a=(t.min.y-d.y)*c),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Pn)!==null}intersectTriangle(t,e,n,i,r){ba.subVectors(e,t),or.subVectors(n,t),Sa.crossVectors(ba,or);let a=this.direction.dot(Sa),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Zn.subVectors(this.origin,t);const l=o*this.direction.dot(or.crossVectors(Zn,or));if(l<0)return null;const h=o*this.direction.dot(ba.cross(Zn));if(h<0||l+h>a)return null;const c=-o*Zn.dot(Sa);return c<0?null:this.at(c/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qt{constructor(t,e,n,i,r,a,o,l,h,c,u,d,f,g,v,m){Qt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,h,c,u,d,f,g,v,m)}set(t,e,n,i,r,a,o,l,h,c,u,d,f,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=h,p[6]=c,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Hi.setFromMatrixColumn(t,0).length(),r=1/Hi.setFromMatrixColumn(t,1).length(),a=1/Hi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),h=Math.sin(i),c=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*c,f=a*u,g=o*c,v=o*u;e[0]=l*c,e[4]=-l*u,e[8]=h,e[1]=f+g*h,e[5]=d-v*h,e[9]=-o*l,e[2]=v-d*h,e[6]=g+f*h,e[10]=a*l}else if(t.order==="YXZ"){const d=l*c,f=l*u,g=h*c,v=h*u;e[0]=d+v*o,e[4]=g*o-f,e[8]=a*h,e[1]=a*u,e[5]=a*c,e[9]=-o,e[2]=f*o-g,e[6]=v+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*c,f=l*u,g=h*c,v=h*u;e[0]=d-v*o,e[4]=-a*u,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*c,e[9]=v-d*o,e[2]=-a*h,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*c,f=a*u,g=o*c,v=o*u;e[0]=l*c,e[4]=g*h-f,e[8]=d*h+v,e[1]=l*u,e[5]=v*h+d,e[9]=f*h-g,e[2]=-h,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,f=a*h,g=o*l,v=o*h;e[0]=l*c,e[4]=v-d*u,e[8]=g*u+f,e[1]=u,e[5]=a*c,e[9]=-o*c,e[2]=-h*c,e[6]=f*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=a*l,f=a*h,g=o*l,v=o*h;e[0]=l*c,e[4]=-u,e[8]=h*c,e[1]=d*u+v,e[5]=a*c,e[9]=f*u-g,e[2]=g*u-f,e[6]=o*c,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(dd,t,fd)}lookAt(t,e,n){const i=this.elements;return je.subVectors(t,e),je.lengthSq()===0&&(je.z=1),je.normalize(),jn.crossVectors(n,je),jn.lengthSq()===0&&(Math.abs(n.z)===1?je.x+=1e-4:je.z+=1e-4,je.normalize(),jn.crossVectors(n,je)),jn.normalize(),lr.crossVectors(je,jn),i[0]=jn.x,i[4]=lr.x,i[8]=je.x,i[1]=jn.y,i[5]=lr.y,i[9]=je.y,i[2]=jn.z,i[6]=lr.z,i[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],h=n[12],c=n[1],u=n[5],d=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],_=n[3],b=n[7],x=n[11],C=n[15],A=i[0],R=i[4],I=i[8],w=i[12],M=i[1],L=i[5],O=i[9],z=i[13],G=i[2],Y=i[6],W=i[10],K=i[14],V=i[3],ct=i[7],gt=i[11],St=i[15];return r[0]=a*A+o*M+l*G+h*V,r[4]=a*R+o*L+l*Y+h*ct,r[8]=a*I+o*O+l*W+h*gt,r[12]=a*w+o*z+l*K+h*St,r[1]=c*A+u*M+d*G+f*V,r[5]=c*R+u*L+d*Y+f*ct,r[9]=c*I+u*O+d*W+f*gt,r[13]=c*w+u*z+d*K+f*St,r[2]=g*A+v*M+m*G+p*V,r[6]=g*R+v*L+m*Y+p*ct,r[10]=g*I+v*O+m*W+p*gt,r[14]=g*w+v*z+m*K+p*St,r[3]=_*A+b*M+x*G+C*V,r[7]=_*R+b*L+x*Y+C*ct,r[11]=_*I+b*O+x*W+C*gt,r[15]=_*w+b*z+x*K+C*St,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],h=t[13],c=t[2],u=t[6],d=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*l*u-i*h*u-r*o*d+n*h*d+i*o*f-n*l*f)+v*(+e*l*f-e*h*d+r*a*d-i*a*f+i*h*c-r*l*c)+m*(+e*h*u-e*o*f-r*a*u+n*a*f+r*o*c-n*h*c)+p*(-i*o*c-e*l*u+e*o*d+i*a*u-n*a*d+n*l*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],u=t[9],d=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],_=u*m*h-v*d*h+v*l*f-o*m*f-u*l*p+o*d*p,b=g*d*h-c*m*h-g*l*f+a*m*f+c*l*p-a*d*p,x=c*v*h-g*u*h+g*o*f-a*v*f-c*o*p+a*u*p,C=g*u*l-c*v*l-g*o*d+a*v*d+c*o*m-a*u*m,A=e*_+n*b+i*x+r*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return t[0]=_*R,t[1]=(v*d*r-u*m*r-v*i*f+n*m*f+u*i*p-n*d*p)*R,t[2]=(o*m*r-v*l*r+v*i*h-n*m*h-o*i*p+n*l*p)*R,t[3]=(u*l*r-o*d*r-u*i*h+n*d*h+o*i*f-n*l*f)*R,t[4]=b*R,t[5]=(c*m*r-g*d*r+g*i*f-e*m*f-c*i*p+e*d*p)*R,t[6]=(g*l*r-a*m*r-g*i*h+e*m*h+a*i*p-e*l*p)*R,t[7]=(a*d*r-c*l*r+c*i*h-e*d*h-a*i*f+e*l*f)*R,t[8]=x*R,t[9]=(g*u*r-c*v*r-g*n*f+e*v*f+c*n*p-e*u*p)*R,t[10]=(a*v*r-g*o*r+g*n*h-e*v*h-a*n*p+e*o*p)*R,t[11]=(c*o*r-a*u*r-c*n*h+e*u*h+a*n*f-e*o*f)*R,t[12]=C*R,t[13]=(c*v*i-g*u*i+g*n*d-e*v*d-c*n*m+e*u*m)*R,t[14]=(g*o*i-a*v*i-g*n*l+e*v*l+a*n*m-e*o*m)*R,t[15]=(a*u*i-c*o*i+c*n*l-e*u*l-a*n*d+e*o*d)*R,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,h=r*a,c=r*o;return this.set(h*a+n,h*o-i*l,h*l+i*o,0,h*o+i*l,c*o+n,c*l-i*a,0,h*l-i*o,c*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,h=r+r,c=a+a,u=o+o,d=r*h,f=r*c,g=r*u,v=a*c,m=a*u,p=o*u,_=l*h,b=l*c,x=l*u,C=n.x,A=n.y,R=n.z;return i[0]=(1-(v+p))*C,i[1]=(f+x)*C,i[2]=(g-b)*C,i[3]=0,i[4]=(f-x)*A,i[5]=(1-(d+p))*A,i[6]=(m+_)*A,i[7]=0,i[8]=(g+b)*R,i[9]=(m-_)*R,i[10]=(1-(d+v))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Hi.set(i[0],i[1],i[2]).length();const a=Hi.set(i[4],i[5],i[6]).length(),o=Hi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],un.copy(this);const h=1/r,c=1/a,u=1/o;return un.elements[0]*=h,un.elements[1]*=h,un.elements[2]*=h,un.elements[4]*=c,un.elements[5]*=c,un.elements[6]*=c,un.elements[8]*=u,un.elements[9]*=u,un.elements[10]*=u,e.setFromRotationMatrix(un),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=Nn){const l=this.elements,h=2*r/(e-t),c=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,g;if(o===Nn)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Yr)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=c,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Nn){const l=this.elements,h=1/(e-t),c=1/(n-i),u=1/(a-r),d=(e+t)*h,f=(n+i)*c;let g,v;if(o===Nn)g=(a+r)*u,v=-2*u;else if(o===Yr)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*h,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Hi=new D,un=new Qt,dd=new D(0,0,0),fd=new D(1,1,1),jn=new D,lr=new D,je=new D,Bl=new Qt,Hl=new Li;class Tn{constructor(t=0,e=0,n=0,i=Tn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],h=i[5],c=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Ue(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Ue(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ue(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ue(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(Ue(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,h),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ue(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,h),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-c,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Bl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Bl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Hl.setFromEuler(this),this.setFromQuaternion(Hl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Tn.DEFAULT_ORDER="XYZ";class Ph{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let pd=0;const Vl=new D,Vi=new Li,Ln=new Qt,cr=new D,Cs=new D,md=new D,gd=new Li,Gl=new D(1,0,0),Wl=new D(0,1,0),Xl=new D(0,0,1),Yl={type:"added"},vd={type:"removed"},Gi={type:"childadded",child:null},wa={type:"childremoved",child:null};class ge extends bs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pd++}),this.uuid=Bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ge.DEFAULT_UP.clone();const t=new D,e=new Tn,n=new Li,i=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Qt},normalMatrix:{value:new Vt}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=ge.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ph,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Vi.setFromAxisAngle(t,e),this.quaternion.multiply(Vi),this}rotateOnWorldAxis(t,e){return Vi.setFromAxisAngle(t,e),this.quaternion.premultiply(Vi),this}rotateX(t){return this.rotateOnAxis(Gl,t)}rotateY(t){return this.rotateOnAxis(Wl,t)}rotateZ(t){return this.rotateOnAxis(Xl,t)}translateOnAxis(t,e){return Vl.copy(t).applyQuaternion(this.quaternion),this.position.add(Vl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Gl,t)}translateY(t){return this.translateOnAxis(Wl,t)}translateZ(t){return this.translateOnAxis(Xl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?cr.copy(t):cr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Cs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(Cs,cr,this.up):Ln.lookAt(cr,Cs,this.up),this.quaternion.setFromRotationMatrix(Ln),i&&(Ln.extractRotation(i.matrixWorld),Vi.setFromRotationMatrix(Ln),this.quaternion.premultiply(Vi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Yl),Gi.child=t,this.dispatchEvent(Gi),Gi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(vd),wa.child=t,this.dispatchEvent(wa),wa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Yl),Gi.child=t,this.dispatchEvent(Gi),Gi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,t,md),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,gd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let h=0,c=l.length;h<c;h++){const u=l[h];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),h=a(t.textures),c=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),h.length>0&&(n.textures=h),c.length>0&&(n.images=c),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const h in o){const c=o[h];delete c.metadata,l.push(c)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ge.DEFAULT_UP=new D(0,1,0);ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const dn=new D,Dn=new D,Ta=new D,In=new D,Wi=new D,Xi=new D,ql=new D,Ea=new D,Aa=new D,Ra=new D,Ca=new ae,Pa=new ae,La=new ae;class rn{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),dn.subVectors(t,e),i.cross(dn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){dn.subVectors(i,e),Dn.subVectors(n,e),Ta.subVectors(t,e);const a=dn.dot(dn),o=dn.dot(Dn),l=dn.dot(Ta),h=Dn.dot(Dn),c=Dn.dot(Ta),u=a*h-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(h*l-o*c)*d,g=(a*c-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,In)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,In.x),l.addScaledVector(a,In.y),l.addScaledVector(o,In.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return Ca.setScalar(0),Pa.setScalar(0),La.setScalar(0),Ca.fromBufferAttribute(t,e),Pa.fromBufferAttribute(t,n),La.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Ca,r.x),a.addScaledVector(Pa,r.y),a.addScaledVector(La,r.z),a}static isFrontFacing(t,e,n,i){return dn.subVectors(n,e),Dn.subVectors(t,e),dn.cross(Dn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return dn.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),dn.cross(Dn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return rn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return rn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return rn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return rn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return rn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;Wi.subVectors(i,n),Xi.subVectors(r,n),Ea.subVectors(t,n);const l=Wi.dot(Ea),h=Xi.dot(Ea);if(l<=0&&h<=0)return e.copy(n);Aa.subVectors(t,i);const c=Wi.dot(Aa),u=Xi.dot(Aa);if(c>=0&&u<=c)return e.copy(i);const d=l*u-c*h;if(d<=0&&l>=0&&c<=0)return a=l/(l-c),e.copy(n).addScaledVector(Wi,a);Ra.subVectors(t,r);const f=Wi.dot(Ra),g=Xi.dot(Ra);if(g>=0&&f<=g)return e.copy(r);const v=f*h-l*g;if(v<=0&&h>=0&&g<=0)return o=h/(h-g),e.copy(n).addScaledVector(Xi,o);const m=c*g-f*u;if(m<=0&&u-c>=0&&f-g>=0)return ql.subVectors(r,i),o=(u-c)/(u-c+(f-g)),e.copy(i).addScaledVector(ql,o);const p=1/(m+v+d);return a=v*p,o=d*p,e.copy(n).addScaledVector(Wi,a).addScaledVector(Xi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Lh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kn={h:0,s:0,l:0},hr={h:0,s:0,l:0};function Da(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class yt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ye){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=$t.workingColorSpace){return this.r=t,this.g=e,this.b=n,$t.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=$t.workingColorSpace){if(t=ed(t,1),e=Ue(e,0,1),n=Ue(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Da(a,r,t+1/3),this.g=Da(a,r,t),this.b=Da(a,r,t-1/3)}return $t.toWorkingColorSpace(this,i),this}setStyle(t,e=Ye){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ye){const n=Lh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Hn(t.r),this.g=Hn(t.g),this.b=Hn(t.b),this}copyLinearToSRGB(t){return this.r=hs(t.r),this.g=hs(t.g),this.b=hs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ye){return $t.fromWorkingColorSpace(De.copy(this),t),Math.round(Ue(De.r*255,0,255))*65536+Math.round(Ue(De.g*255,0,255))*256+Math.round(Ue(De.b*255,0,255))}getHexString(t=Ye){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.fromWorkingColorSpace(De.copy(this),e);const n=De.r,i=De.g,r=De.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,h;const c=(o+a)/2;if(o===a)l=0,h=0;else{const u=a-o;switch(h=c<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=h,t.l=c,t}getRGB(t,e=$t.workingColorSpace){return $t.fromWorkingColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=Ye){$t.fromWorkingColorSpace(De.copy(this),t);const e=De.r,n=De.g,i=De.b;return t!==Ye?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Kn),this.setHSL(Kn.h+t,Kn.s+e,Kn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Kn),t.getHSL(hr);const n=ma(Kn.h,hr.h,e),i=ma(Kn.s,hr.s,e),r=ma(Kn.l,hr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const De=new yt;yt.NAMES=Lh;let xd=0;class Ui extends bs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xd++}),this.uuid=Bn(),this.name="",this.blending=li,this.side=hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=to,this.blendDst=eo,this.blendEquation=wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new yt(0,0,0),this.blendAlpha=0,this.depthFunc=fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ll,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ki,this.stencilZFail=ki,this.stencilZPass=ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==li&&(n.blending=this.blending),this.side!==hi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==to&&(n.blendSrc=this.blendSrc),this.blendDst!==eo&&(n.blendDst=this.blendDst),this.blendEquation!==wi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==fs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ll&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ki&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ki&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ki&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ae extends Ui{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.combine=lh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ve=new D,ur=new et;class Ce{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Oo,this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ur.fromBufferAttribute(this,e),ur.applyMatrix3(t),this.setXY(e,ur.x,ur.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=bn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=bn(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=bn(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=bn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=bn(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Oo&&(t.usage=this.usage),t}}class Dh extends Ce{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Ih extends Ce{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Kt extends Ce{constructor(t,e,n){super(new Float32Array(t),e,n)}}let _d=0;const en=new Qt,Ia=new ge,Yi=new D,Ke=new Di,Ps=new Di,we=new D;class ye extends bs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_d++}),this.uuid=Bn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Eh(t)?Ih:Dh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Vt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return en.makeRotationFromQuaternion(t),this.applyMatrix4(en),this}rotateX(t){return en.makeRotationX(t),this.applyMatrix4(en),this}rotateY(t){return en.makeRotationY(t),this.applyMatrix4(en),this}rotateZ(t){return en.makeRotationZ(t),this.applyMatrix4(en),this}translate(t,e,n){return en.makeTranslation(t,e,n),this.applyMatrix4(en),this}scale(t,e,n){return en.makeScale(t,e,n),this.applyMatrix4(en),this}lookAt(t){return Ia.lookAt(t),Ia.updateMatrix(),this.applyMatrix4(Ia.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yi).negate(),this.translate(Yi.x,Yi.y,Yi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Kt(n,3))}else{for(let n=0,i=e.count;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Di);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Ke.setFromBufferAttribute(r),this.morphTargetsRelative?(we.addVectors(this.boundingBox.min,Ke.min),this.boundingBox.expandByPoint(we),we.addVectors(this.boundingBox.max,Ke.max),this.boundingBox.expandByPoint(we)):(this.boundingBox.expandByPoint(Ke.min),this.boundingBox.expandByPoint(Ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ii);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(Ke.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Ps.setFromBufferAttribute(o),this.morphTargetsRelative?(we.addVectors(Ke.min,Ps.min),Ke.expandByPoint(we),we.addVectors(Ke.max,Ps.max),Ke.expandByPoint(we)):(Ke.expandByPoint(Ps.min),Ke.expandByPoint(Ps.max))}Ke.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)we.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(we));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let h=0,c=o.count;h<c;h++)we.fromBufferAttribute(o,h),l&&(Yi.fromBufferAttribute(t,h),we.add(Yi)),i=Math.max(i,n.distanceToSquared(we))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ce(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new D,l[I]=new D;const h=new D,c=new D,u=new D,d=new et,f=new et,g=new et,v=new D,m=new D;function p(I,w,M){h.fromBufferAttribute(n,I),c.fromBufferAttribute(n,w),u.fromBufferAttribute(n,M),d.fromBufferAttribute(r,I),f.fromBufferAttribute(r,w),g.fromBufferAttribute(r,M),c.sub(h),u.sub(h),f.sub(d),g.sub(d);const L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(v.copy(c).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(L),m.copy(u).multiplyScalar(f.x).addScaledVector(c,-g.x).multiplyScalar(L),o[I].add(v),o[w].add(v),o[M].add(v),l[I].add(m),l[w].add(m),l[M].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let I=0,w=_.length;I<w;++I){const M=_[I],L=M.start,O=M.count;for(let z=L,G=L+O;z<G;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const b=new D,x=new D,C=new D,A=new D;function R(I){C.fromBufferAttribute(i,I),A.copy(C);const w=o[I];b.copy(w),b.sub(C.multiplyScalar(C.dot(w))).normalize(),x.crossVectors(A,w);const L=x.dot(l[I])<0?-1:1;a.setXYZW(I,b.x,b.y,b.z,L)}for(let I=0,w=_.length;I<w;++I){const M=_[I],L=M.start,O=M.count;for(let z=L,G=L+O;z<G;z+=3)R(t.getX(z+0)),R(t.getX(z+1)),R(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ce(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new D,r=new D,a=new D,o=new D,l=new D,h=new D,c=new D,u=new D;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),c.subVectors(a,r),u.subVectors(i,r),c.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,m),o.add(c),l.add(c),h.add(c),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,h.x,h.y,h.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),c.subVectors(a,r),u.subVectors(i,r),c.cross(u),n.setXYZ(d+0,c.x,c.y,c.z),n.setXYZ(d+1,c.x,c.y,c.z),n.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)we.fromBufferAttribute(t,e),we.normalize(),t.setXYZ(e,we.x,we.y,we.z)}toNonIndexed(){function t(o,l){const h=o.array,c=o.itemSize,u=o.normalized,d=new h.constructor(l.length*c);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*c;for(let p=0;p<c;p++)d[g++]=h[f++]}return new Ce(d,c,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ye,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],h=t(l,n);e.setAttribute(o,h)}const r=this.morphAttributes;for(const o in r){const l=[],h=r[o];for(let c=0,u=h.length;c<u;c++){const d=h[c],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const h=a[o];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(t[h]=l[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const h=n[l];t.data.attributes[l]=h.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],c=[];for(let u=0,d=h.length;u<d;u++){const f=h[u];c.push(f.toJSON(t.data))}c.length>0&&(i[l]=c,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const h in i){const c=i[h];this.setAttribute(h,c.clone(e))}const r=t.morphAttributes;for(const h in r){const c=[],u=r[h];for(let d=0,f=u.length;d<f;d++)c.push(u[d].clone(e));this.morphAttributes[h]=c}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let h=0,c=a.length;h<c;h++){const u=a[h];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const $l=new Qt,mi=new Ch,dr=new Ii,Zl=new D,fr=new D,pr=new D,mr=new D,Ua=new D,gr=new D,jl=new D,vr=new D;class kt extends ge{constructor(t=new ye,e=new Ae){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){gr.set(0,0,0);for(let l=0,h=r.length;l<h;l++){const c=o[l],u=r[l];c!==0&&(Ua.fromBufferAttribute(u,t),a?gr.addScaledVector(Ua,c):gr.addScaledVector(Ua.sub(e),c))}e.add(gr)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),dr.copy(n.boundingSphere),dr.applyMatrix4(r),mi.copy(t.ray).recast(t.near),!(dr.containsPoint(mi.origin)===!1&&(mi.intersectSphere(dr,Zl)===null||mi.origin.distanceToSquared(Zl)>(t.far-t.near)**2))&&($l.copy(r).invert(),mi.copy(t.ray).applyMatrix4($l),!(n.boundingBox!==null&&mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,mi)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,h=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=a[m.materialIndex],_=Math.max(m.start,f.start),b=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let x=_,C=b;x<C;x+=3){const A=o.getX(x),R=o.getX(x+1),I=o.getX(x+2);i=xr(this,p,t,n,h,c,u,A,R,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const _=o.getX(m),b=o.getX(m+1),x=o.getX(m+2);i=xr(this,a,t,n,h,c,u,_,b,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=a[m.materialIndex],_=Math.max(m.start,f.start),b=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let x=_,C=b;x<C;x+=3){const A=x,R=x+1,I=x+2;i=xr(this,p,t,n,h,c,u,A,R,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const _=m,b=m+1,x=m+2;i=xr(this,a,t,n,h,c,u,_,b,x),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function yd(s,t,e,n,i,r,a,o){let l;if(t.side===Fe?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===hi,o),l===null)return null;vr.copy(o),vr.applyMatrix4(s.matrixWorld);const h=e.ray.origin.distanceTo(vr);return h<e.near||h>e.far?null:{distance:h,point:vr.clone(),object:s}}function xr(s,t,e,n,i,r,a,o,l,h){s.getVertexPosition(o,fr),s.getVertexPosition(l,pr),s.getVertexPosition(h,mr);const c=yd(s,t,e,n,fr,pr,mr,jl);if(c){const u=new D;rn.getBarycoord(jl,fr,pr,mr,u),i&&(c.uv=rn.getInterpolatedAttribute(i,o,l,h,u,new et)),r&&(c.uv1=rn.getInterpolatedAttribute(r,o,l,h,u,new et)),a&&(c.normal=rn.getInterpolatedAttribute(a,o,l,h,u,new D),c.normal.dot(n.direction)>0&&c.normal.multiplyScalar(-1));const d={a:o,b:l,c:h,normal:new D,materialIndex:0};rn.getNormal(fr,pr,mr,d.normal),c.face=d,c.barycoord=u}return c}class Re extends ye{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],h=[],c=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Kt(h,3)),this.setAttribute("normal",new Kt(c,3)),this.setAttribute("uv",new Kt(u,2));function g(v,m,p,_,b,x,C,A,R,I,w){const M=x/R,L=C/I,O=x/2,z=C/2,G=A/2,Y=R+1,W=I+1;let K=0,V=0;const ct=new D;for(let gt=0;gt<W;gt++){const St=gt*L-z;for(let Ot=0;Ot<Y;Ot++){const te=Ot*M-O;ct[v]=te*_,ct[m]=St*b,ct[p]=G,h.push(ct.x,ct.y,ct.z),ct[v]=0,ct[m]=0,ct[p]=A>0?1:-1,c.push(ct.x,ct.y,ct.z),u.push(Ot/R),u.push(1-gt/I),K+=1}}for(let gt=0;gt<I;gt++)for(let St=0;St<R;St++){const Ot=d+St+Y*gt,te=d+St+Y*(gt+1),Z=d+(St+1)+Y*(gt+1),rt=d+(St+1)+Y*gt;l.push(Ot,te,rt),l.push(te,Z,rt),V+=6}o.addGroup(f,V,w),f+=V,d+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Re(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function xs(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Be(s){const t={};for(let e=0;e<s.length;e++){const n=xs(s[e]);for(const i in n)t[i]=n[i]}return t}function Md(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Uh(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const qs={clone:xs,merge:Be};var bd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class me extends Ui{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bd,this.fragmentShader=Sd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=xs(t.uniforms),this.uniformsGroups=Md(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Nh extends ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=Nn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Jn=new D,Kl=new et,Jl=new et;class Ne extends Nh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=qr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(pa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return qr*2*Math.atan(Math.tan(pa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Jn.x,Jn.y).multiplyScalar(-t/Jn.z),Jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Jn.x,Jn.y).multiplyScalar(-t/Jn.z)}getViewSize(t,e){return this.getViewBounds(t,Kl,Jl),e.subVectors(Jl,Kl)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(pa*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,h=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/h,i*=a.width/l,n*=a.height/h}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const qi=-90,$i=1;class wd extends ge{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ne(qi,$i,t,e);i.layers=this.layers,this.add(i);const r=new Ne(qi,$i,t,e);r.layers=this.layers,this.add(r);const a=new Ne(qi,$i,t,e);a.layers=this.layers,this.add(a);const o=new Ne(qi,$i,t,e);o.layers=this.layers,this.add(o);const l=new Ne(qi,$i,t,e);l.layers=this.layers,this.add(l);const h=new Ne(qi,$i,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const h of e)this.remove(h);if(t===Nn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Yr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,h,c]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,h),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,c),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class kh extends ze{constructor(t,e,n,i,r,a,o,l,h,c){t=t!==void 0?t:[],e=e!==void 0?e:ps,super(t,e,n,i,r,a,o,l,h,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Td extends gn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new kh(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Sn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Re(5,5,5),r=new me({name:"CubemapFromEquirect",uniforms:xs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Fe,blending:zn});r.uniforms.tEquirect.value=e;const a=new kt(i,r),o=e.minFilter;return e.minFilter===Ai&&(e.minFilter=Sn),new wd(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}const Na=new D,Ed=new D,Ad=new Vt;class _i{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Na.subVectors(n,e).cross(Ed.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Na),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ad.getNormalMatrix(t),i=this.coplanarPoint(Na).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const gi=new Ii,_r=new D;class il{constructor(t=new _i,e=new _i,n=new _i,i=new _i,r=new _i,a=new _i){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Nn){const n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],l=i[3],h=i[4],c=i[5],u=i[6],d=i[7],f=i[8],g=i[9],v=i[10],m=i[11],p=i[12],_=i[13],b=i[14],x=i[15];if(n[0].setComponents(l-r,d-h,m-f,x-p).normalize(),n[1].setComponents(l+r,d+h,m+f,x+p).normalize(),n[2].setComponents(l+a,d+c,m+g,x+_).normalize(),n[3].setComponents(l-a,d-c,m-g,x-_).normalize(),n[4].setComponents(l-o,d-u,m-v,x-b).normalize(),e===Nn)n[5].setComponents(l+o,d+u,m+v,x+b).normalize();else if(e===Yr)n[5].setComponents(o,u,v,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),gi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),gi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(gi)}intersectsSprite(t){return gi.center.set(0,0,0),gi.radius=.7071067811865476,gi.applyMatrix4(t.matrixWorld),this.intersectsSphere(gi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(_r.x=i.normal.x>0?t.max.x:t.min.x,_r.y=i.normal.y>0?t.max.y:t.min.y,_r.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(_r)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Fh(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Rd(s){const t=new WeakMap;function e(o,l){const h=o.array,c=o.usage,u=h.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,h,c),o.onUploadCallback();let f;if(h instanceof Float32Array)f=s.FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)f=s.SHORT;else if(h instanceof Uint32Array)f=s.UNSIGNED_INT;else if(h instanceof Int32Array)f=s.INT;else if(h instanceof Int8Array)f=s.BYTE;else if(h instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:d,type:f,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,h){const c=l.array,u=l.updateRanges;if(s.bindBuffer(h,o),u.length===0)s.bufferSubData(h,0,c);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];s.bufferSubData(h,v.start*c.BYTES_PER_ELEMENT,c,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=t.get(o);(!c||c.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const h=t.get(o);if(h===void 0)t.set(o,e(o,l));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,o,l),h.version=o.version}}return{get:i,remove:r,update:a}}class pn extends ye{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),h=o+1,c=l+1,u=t/o,d=e/l,f=[],g=[],v=[],m=[];for(let p=0;p<c;p++){const _=p*d-a;for(let b=0;b<h;b++){const x=b*u-r;g.push(x,-_,0),v.push(0,0,1),m.push(b/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let _=0;_<o;_++){const b=_+h*p,x=_+h*(p+1),C=_+1+h*(p+1),A=_+1+h*p;f.push(b,x,A),f.push(x,C,A)}this.setIndex(f),this.setAttribute("position",new Kt(g,3)),this.setAttribute("normal",new Kt(v,3)),this.setAttribute("uv",new Kt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pn(t.width,t.height,t.widthSegments,t.heightSegments)}}var Cd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pd=`#ifdef USE_ALPHAHASH
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
#endif`,Ld=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Id=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ud=`#ifdef USE_ALPHATEST
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
#endif`,kd=`#ifdef USE_AOMAP
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
#endif`,zd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Od=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Vd=`#ifdef USE_IRIDESCENCE
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
#endif`,Gd=`#ifdef USE_BUMPMAP
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
#endif`,Wd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Xd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$d=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Zd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,jd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Kd=`#if defined( USE_COLOR_ALPHA )
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
} // validated`,Qd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,tf=`vec3 transformedNormal = objectNormal;
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
#endif`,ef=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,af="gl_FragColor = linearToOutputTexel( gl_FragColor );",of=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lf=`#ifdef USE_ENVMAP
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
#endif`,cf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,hf=`#ifdef USE_ENVMAP
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
#endif`,uf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,df=`#ifdef USE_ENVMAP
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
#endif`,ff=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vf=`#ifdef USE_GRADIENTMAP
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
}`,xf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_f=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yf=`varying vec3 vViewPosition;
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
#endif`,bf=`#ifdef USE_ENVMAP
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
material.diffuseColor = diffuseColor.rgb;`,wf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Tf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ef=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Af=`PhysicalMaterial material;
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
#endif`,Rf=`struct PhysicalMaterial {
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
}`,Cf=`
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
#endif`,Pf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Lf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Df=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,If=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Uf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,kf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ff=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Of=`#if defined( USE_POINTS_UV )
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
#endif`,Bf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Vf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xf=`#ifdef USE_MORPHTARGETS
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
#endif`,Yf=`#ifdef USE_MORPHTARGETS
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
vec3 nonPerturbedNormal = normal;`,$f=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Zf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kf=`#ifndef FLAT_SHADED
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
#endif`,Qf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ep=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,np=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ip=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,rp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ap=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,op=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,up=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,pp=`float getShadowMask() {
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
}`,mp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gp=`#ifdef USE_SKINNING
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
#endif`,vp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,xp=`#ifdef USE_SKINNING
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
#endif`,_p=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Mp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bp=`#ifndef saturate
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
#endif`,wp=`#ifdef USE_TRANSMISSION
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
#endif`,Tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ep=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ap=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Cp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pp=`uniform sampler2D t2D;
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
}`,Lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Up=`uniform samplerCube tCube;
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
}`,kp=`#if DEPTH_PACKING == 3200
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
}`,zp=`#define DISTANCE
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
}`,Op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hp=`uniform float scale;
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
}`,Vp=`uniform vec3 diffuse;
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
}`,Gp=`#include <common>
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
}`,Wp=`uniform vec3 diffuse;
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
}`,Xp=`#define LAMBERT
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
}`,Yp=`#define LAMBERT
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
}`,$p=`#define MATCAP
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
}`,Zp=`#define NORMAL
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
}`,jp=`#define NORMAL
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
}`,Kp=`#define PHONG
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
}`,Qp=`#define STANDARD
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
}`,tm=`#define STANDARD
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
}`,em=`#define TOON
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
}`,nm=`#define TOON
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
}`,im=`uniform float size;
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
}`,sm=`uniform vec3 diffuse;
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
}`,rm=`#include <common>
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
}`,am=`uniform vec3 color;
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
}`,lm=`uniform vec3 diffuse;
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
}`,Wt={alphahash_fragment:Cd,alphahash_pars_fragment:Pd,alphamap_fragment:Ld,alphamap_pars_fragment:Dd,alphatest_fragment:Id,alphatest_pars_fragment:Ud,aomap_fragment:Nd,aomap_pars_fragment:kd,batching_pars_vertex:Fd,batching_vertex:zd,begin_vertex:Od,beginnormal_vertex:Bd,bsdfs:Hd,iridescence_fragment:Vd,bumpmap_pars_fragment:Gd,clipping_planes_fragment:Wd,clipping_planes_pars_fragment:Xd,clipping_planes_pars_vertex:Yd,clipping_planes_vertex:qd,color_fragment:$d,color_pars_fragment:Zd,color_pars_vertex:jd,color_vertex:Kd,common:Jd,cube_uv_reflection_fragment:Qd,defaultnormal_vertex:tf,displacementmap_pars_vertex:ef,displacementmap_vertex:nf,emissivemap_fragment:sf,emissivemap_pars_fragment:rf,colorspace_fragment:af,colorspace_pars_fragment:of,envmap_fragment:lf,envmap_common_pars_fragment:cf,envmap_pars_fragment:hf,envmap_pars_vertex:uf,envmap_physical_pars_fragment:bf,envmap_vertex:df,fog_vertex:ff,fog_pars_vertex:pf,fog_fragment:mf,fog_pars_fragment:gf,gradientmap_pars_fragment:vf,lightmap_pars_fragment:xf,lights_lambert_fragment:_f,lights_lambert_pars_fragment:yf,lights_pars_begin:Mf,lights_toon_fragment:Sf,lights_toon_pars_fragment:wf,lights_phong_fragment:Tf,lights_phong_pars_fragment:Ef,lights_physical_fragment:Af,lights_physical_pars_fragment:Rf,lights_fragment_begin:Cf,lights_fragment_maps:Pf,lights_fragment_end:Lf,logdepthbuf_fragment:Df,logdepthbuf_pars_fragment:If,logdepthbuf_pars_vertex:Uf,logdepthbuf_vertex:Nf,map_fragment:kf,map_pars_fragment:Ff,map_particle_fragment:zf,map_particle_pars_fragment:Of,metalnessmap_fragment:Bf,metalnessmap_pars_fragment:Hf,morphinstance_vertex:Vf,morphcolor_vertex:Gf,morphnormal_vertex:Wf,morphtarget_pars_vertex:Xf,morphtarget_vertex:Yf,normal_fragment_begin:qf,normal_fragment_maps:$f,normal_pars_fragment:Zf,normal_pars_vertex:jf,normal_vertex:Kf,normalmap_pars_fragment:Jf,clearcoat_normal_fragment_begin:Qf,clearcoat_normal_fragment_maps:tp,clearcoat_pars_fragment:ep,iridescence_pars_fragment:np,opaque_fragment:ip,packing:sp,premultiplied_alpha_fragment:rp,project_vertex:ap,dithering_fragment:op,dithering_pars_fragment:lp,roughnessmap_fragment:cp,roughnessmap_pars_fragment:hp,shadowmap_pars_fragment:up,shadowmap_pars_vertex:dp,shadowmap_vertex:fp,shadowmask_pars_fragment:pp,skinbase_vertex:mp,skinning_pars_vertex:gp,skinning_vertex:vp,skinnormal_vertex:xp,specularmap_fragment:_p,specularmap_pars_fragment:yp,tonemapping_fragment:Mp,tonemapping_pars_fragment:bp,transmission_fragment:Sp,transmission_pars_fragment:wp,uv_pars_fragment:Tp,uv_pars_vertex:Ep,uv_vertex:Ap,worldpos_vertex:Rp,background_vert:Cp,background_frag:Pp,backgroundCube_vert:Lp,backgroundCube_frag:Dp,cube_vert:Ip,cube_frag:Up,depth_vert:Np,depth_frag:kp,distanceRGBA_vert:Fp,distanceRGBA_frag:zp,equirect_vert:Op,equirect_frag:Bp,linedashed_vert:Hp,linedashed_frag:Vp,meshbasic_vert:Gp,meshbasic_frag:Wp,meshlambert_vert:Xp,meshlambert_frag:Yp,meshmatcap_vert:qp,meshmatcap_frag:$p,meshnormal_vert:Zp,meshnormal_frag:jp,meshphong_vert:Kp,meshphong_frag:Jp,meshphysical_vert:Qp,meshphysical_frag:tm,meshtoon_vert:em,meshtoon_frag:nm,points_vert:im,points_frag:sm,shadow_vert:rm,shadow_frag:am,sprite_vert:om,sprite_frag:lm},ht={common:{diffuse:{value:new yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new yt(16777215)},opacity:{value:1},center:{value:new et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},Mn={basic:{uniforms:Be([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:Be([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new yt(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:Be([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new yt(0)},specular:{value:new yt(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:Be([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:Be([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new yt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:Be([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:Be([ht.points,ht.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:Be([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:Be([ht.common,ht.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:Be([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:Be([ht.sprite,ht.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:Be([ht.common,ht.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:Be([ht.lights,ht.fog,{color:{value:new yt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};Mn.physical={uniforms:Be([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new yt(0)},specularColor:{value:new yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const yr={r:0,b:0,g:0},vi=new Tn,cm=new Qt;function hm(s,t,e,n,i,r,a){const o=new yt(0);let l=r===!0?0:1,h,c,u=null,d=0,f=null;function g(_){let b=_.isScene===!0?_.background:null;return b&&b.isTexture&&(b=(_.backgroundBlurriness>0?e:t).get(b)),b}function v(_){let b=!1;const x=g(_);x===null?p(o,l):x&&x.isColor&&(p(x,1),b=!0);const C=s.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function m(_,b){const x=g(b);x&&(x.isCubeTexture||x.mapping===ia)?(c===void 0&&(c=new kt(new Re(1,1,1),new me({name:"BackgroundCubeMaterial",uniforms:xs(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:Fe,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(C,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),vi.copy(b.backgroundRotation),vi.x*=-1,vi.y*=-1,vi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),c.material.uniforms.envMap.value=x,c.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(cm.makeRotationFromEuler(vi)),c.material.toneMapped=$t.getTransfer(x.colorSpace)!==se,(u!==x||d!==x.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,f=s.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(h===void 0&&(h=new kt(new pn(2,2),new me({name:"BackgroundMaterial",uniforms:xs(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(h)),h.material.uniforms.t2D.value=x,h.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,h.material.toneMapped=$t.getTransfer(x.colorSpace)!==se,x.matrixAutoUpdate===!0&&x.updateMatrix(),h.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,f=s.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null))}function p(_,b){_.getRGB(yr,Uh(s)),n.buffers.color.setClear(yr.r,yr.g,yr.b,b,a)}return{getClearColor:function(){return o},setClearColor:function(_,b=1){o.set(_),l=b,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,p(o,l)},render:v,addToRenderList:m}}function um(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(M,L,O,z,G){let Y=!1;const W=u(z,O,L);r!==W&&(r=W,h(r.object)),Y=f(M,z,O,G),Y&&g(M,z,O,G),G!==null&&t.update(G,s.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,x(M,L,O,z),G!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function l(){return s.createVertexArray()}function h(M){return s.bindVertexArray(M)}function c(M){return s.deleteVertexArray(M)}function u(M,L,O){const z=O.wireframe===!0;let G=n[M.id];G===void 0&&(G={},n[M.id]=G);let Y=G[L.id];Y===void 0&&(Y={},G[L.id]=Y);let W=Y[z];return W===void 0&&(W=d(l()),Y[z]=W),W}function d(M){const L=[],O=[],z=[];for(let G=0;G<e;G++)L[G]=0,O[G]=0,z[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:O,attributeDivisors:z,object:M,attributes:{},index:null}}function f(M,L,O,z){const G=r.attributes,Y=L.attributes;let W=0;const K=O.getAttributes();for(const V in K)if(K[V].location>=0){const gt=G[V];let St=Y[V];if(St===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(St=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(St=M.instanceColor)),gt===void 0||gt.attribute!==St||St&&gt.data!==St.data)return!0;W++}return r.attributesNum!==W||r.index!==z}function g(M,L,O,z){const G={},Y=L.attributes;let W=0;const K=O.getAttributes();for(const V in K)if(K[V].location>=0){let gt=Y[V];gt===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(gt=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(gt=M.instanceColor));const St={};St.attribute=gt,gt&&gt.data&&(St.data=gt.data),G[V]=St,W++}r.attributes=G,r.attributesNum=W,r.index=z}function v(){const M=r.newAttributes;for(let L=0,O=M.length;L<O;L++)M[L]=0}function m(M){p(M,0)}function p(M,L){const O=r.newAttributes,z=r.enabledAttributes,G=r.attributeDivisors;O[M]=1,z[M]===0&&(s.enableVertexAttribArray(M),z[M]=1),G[M]!==L&&(s.vertexAttribDivisor(M,L),G[M]=L)}function _(){const M=r.newAttributes,L=r.enabledAttributes;for(let O=0,z=L.length;O<z;O++)L[O]!==M[O]&&(s.disableVertexAttribArray(O),L[O]=0)}function b(M,L,O,z,G,Y,W){W===!0?s.vertexAttribIPointer(M,L,O,G,Y):s.vertexAttribPointer(M,L,O,z,G,Y)}function x(M,L,O,z){v();const G=z.attributes,Y=O.getAttributes(),W=L.defaultAttributeValues;for(const K in Y){const V=Y[K];if(V.location>=0){let ct=G[K];if(ct===void 0&&(K==="instanceMatrix"&&M.instanceMatrix&&(ct=M.instanceMatrix),K==="instanceColor"&&M.instanceColor&&(ct=M.instanceColor)),ct!==void 0){const gt=ct.normalized,St=ct.itemSize,Ot=t.get(ct);if(Ot===void 0)continue;const te=Ot.buffer,Z=Ot.type,rt=Ot.bytesPerElement,wt=Z===s.INT||Z===s.UNSIGNED_INT||ct.gpuType===jo;if(ct.isInterleavedBufferAttribute){const ot=ct.data,Lt=ot.stride,Ft=ct.offset;if(ot.isInstancedInterleavedBuffer){for(let Ut=0;Ut<V.locationSize;Ut++)p(V.location+Ut,ot.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Ut=0;Ut<V.locationSize;Ut++)m(V.location+Ut);s.bindBuffer(s.ARRAY_BUFFER,te);for(let Ut=0;Ut<V.locationSize;Ut++)b(V.location+Ut,St/V.locationSize,Z,gt,Lt*rt,(Ft+St/V.locationSize*Ut)*rt,wt)}else{if(ct.isInstancedBufferAttribute){for(let ot=0;ot<V.locationSize;ot++)p(V.location+ot,ct.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let ot=0;ot<V.locationSize;ot++)m(V.location+ot);s.bindBuffer(s.ARRAY_BUFFER,te);for(let ot=0;ot<V.locationSize;ot++)b(V.location+ot,St/V.locationSize,Z,gt,St*rt,St/V.locationSize*ot*rt,wt)}}else if(W!==void 0){const gt=W[K];if(gt!==void 0)switch(gt.length){case 2:s.vertexAttrib2fv(V.location,gt);break;case 3:s.vertexAttrib3fv(V.location,gt);break;case 4:s.vertexAttrib4fv(V.location,gt);break;default:s.vertexAttrib1fv(V.location,gt)}}}}_()}function C(){I();for(const M in n){const L=n[M];for(const O in L){const z=L[O];for(const G in z)c(z[G].object),delete z[G];delete L[O]}delete n[M]}}function A(M){if(n[M.id]===void 0)return;const L=n[M.id];for(const O in L){const z=L[O];for(const G in z)c(z[G].object),delete z[G];delete L[O]}delete n[M.id]}function R(M){for(const L in n){const O=n[L];if(O[M.id]===void 0)continue;const z=O[M.id];for(const G in z)c(z[G].object),delete z[G];delete O[M.id]}}function I(){w(),a=!0,r!==i&&(r=i,h(r.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:I,resetDefaultState:w,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:_}}function dm(s,t,e){let n;function i(h){n=h}function r(h,c){s.drawArrays(n,h,c),e.update(c,n,1)}function a(h,c,u){u!==0&&(s.drawArraysInstanced(n,h,c,u),e.update(c,n,u))}function o(h,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,c,0,u);let f=0;for(let g=0;g<u;g++)f+=c[g];e.update(f,n,1)}function l(h,c,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<h.length;g++)a(h[g],c[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,h,0,c,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=c[v]*d[v];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function fm(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==fn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const I=R===On&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Vn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==wn&&!I)}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const c=l(h);c!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",c,"instead."),h=c);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),_=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:_,maxVaryings:b,maxFragmentUniforms:x,vertexTextures:C,maxSamples:A}}function pm(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new _i,o=new Vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=c(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?c(null):h();else{const _=r?0:n,b=_*4;let x=p.clippingState||null;l.value=x,x=c(g,d,b,f);for(let C=0;C!==b;++C)x[C]=e[C];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function h(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function c(u,d,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,_=d.matrixWorldInverse;o.getNormalMatrix(_),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,x=f;b!==v;++b,x+=4)a.copy(u[b]).applyMatrix4(_,o),a.normal.toArray(m,x),m[x+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function mm(s){let t=new WeakMap;function e(a,o){return o===co?a.mapping=ps:o===ho&&(a.mapping=ms),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===co||o===ho)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const h=new Td(l.height);return h.fromEquirectangularTexture(s,a),t.set(a,h),a.addEventListener("dispose",i),e(h.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class sl extends Nh{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,a=r+h*this.view.width,o-=c*this.view.offsetY,l=o-c*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const as=4,Ql=[.125,.215,.35,.446,.526,.582],Ti=20,ka=new sl,tc=new yt;let Fa=null,za=0,Oa=0,Ba=!1;const yi=(1+Math.sqrt(5))/2,Zi=1/yi,ec=[new D(-yi,Zi,0),new D(yi,Zi,0),new D(-Zi,0,yi),new D(Zi,0,yi),new D(0,yi,-Zi),new D(0,yi,Zi),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class Bo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Fa=this._renderer.getRenderTarget(),za=this._renderer.getActiveCubeFace(),Oa=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ic(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Fa,za,Oa),this._renderer.xr.enabled=Ba,t.scissorTest=!1,Mr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ps||t.mapping===ms?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Fa=this._renderer.getRenderTarget(),za=this._renderer.getActiveCubeFace(),Oa=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Sn,minFilter:Sn,generateMipmaps:!1,type:On,format:fn,colorSpace:Ms,depthBuffer:!1},i=nc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gm(r)),this._blurMaterial=vm(r,t,e)}return i}_compileMaterial(t){const e=new kt(this._lodPlanes[0],t);this._renderer.compile(e,ka)}_sceneToCubeUV(t,e,n,i){const o=new Ne(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],c=this._renderer,u=c.autoClear,d=c.toneMapping;c.getClearColor(tc),c.toneMapping=ci,c.autoClear=!1;const f=new Ae({name:"PMREM.Background",side:Fe,depthWrite:!1,depthTest:!1}),g=new kt(new Re,f);let v=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,v=!0):(f.color.copy(tc),v=!0);for(let p=0;p<6;p++){const _=p%3;_===0?(o.up.set(0,l[p],0),o.lookAt(h[p],0,0)):_===1?(o.up.set(0,0,l[p]),o.lookAt(0,h[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,h[p]));const b=this._cubeSize;Mr(i,_*b,p>2?b:0,b,b),c.setRenderTarget(i),v&&c.render(g,o),c.render(t,o)}g.geometry.dispose(),g.material.dispose(),c.toneMapping=d,c.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ps||t.mapping===ms;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=sc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ic());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new kt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Mr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,ka)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=ec[(i-r-1)%ec.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,u=new kt(this._lodPlanes[i],h),d=h.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ti-1),v=r/g,m=isFinite(r)?1+Math.floor(c*v):Ti;m>Ti&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ti}`);const p=[];let _=0;for(let R=0;R<Ti;++R){const I=R/v,w=Math.exp(-I*I/2);p.push(w),R===0?_+=w:R<m&&(_+=2*w)}for(let R=0;R<p.length;R++)p[R]=p[R]/_;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:b}=this;d.dTheta.value=g,d.mipInt.value=b-n;const x=this._sizeLods[i],C=3*x*(i>b-as?i-b+as:0),A=4*(this._cubeSize-x);Mr(e,C,A,3*x,2*x),l.setRenderTarget(e),l.render(u,ka)}}function gm(s){const t=[],e=[],n=[];let i=s;const r=s-as+1+Ql.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-as?l=Ql[a-s+as-1]:a===0&&(l=0),n.push(l);const h=1/(o-2),c=-h,u=1+h,d=[c,c,u,c,u,u,c,c,u,u,c,u],f=6,g=6,v=3,m=2,p=1,_=new Float32Array(v*g*f),b=new Float32Array(m*g*f),x=new Float32Array(p*g*f);for(let A=0;A<f;A++){const R=A%3*2/3-1,I=A>2?0:-1,w=[R,I,0,R+2/3,I,0,R+2/3,I+1,0,R,I,0,R+2/3,I+1,0,R,I+1,0];_.set(w,v*g*A),b.set(d,m*g*A);const M=[A,A,A,A,A,A];x.set(M,p*g*A)}const C=new ye;C.setAttribute("position",new Ce(_,v)),C.setAttribute("uv",new Ce(b,m)),C.setAttribute("faceIndex",new Ce(x,p)),t.push(C),i>as&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function nc(s,t,e){const n=new gn(s,t,e);return n.texture.mapping=ia,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Mr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function vm(s,t,e){const n=new Float32Array(Ti),i=new D(0,1,0);return new me({name:"SphericalGaussianBlur",defines:{n:Ti,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:rl(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function ic(){return new me({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rl(),fragmentShader:`

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
		`,blending:zn,depthTest:!1,depthWrite:!1})}function sc(){return new me({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function rl(){return`

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
	`}function xm(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,h=l===co||l===ho,c=l===ps||l===ms;if(h||c){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new Bo(s)),u=h?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return h&&f&&f.height>0||c&&f&&i(f)?(e===null&&(e=new Bo(s)),u=h?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let l=0;const h=6;for(let c=0;c<h;c++)o[c]!==void 0&&l++;return l===h}function r(o){const l=o.target;l.removeEventListener("dispose",r);const h=t.get(l);h!==void 0&&(t.delete(l),h.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function _m(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&zs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function ym(s,t,e,n){const i={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)t.update(d[g],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const v=f[g];for(let m=0,p=v.length;m<p;m++)t.update(v[m],s.ARRAY_BUFFER)}}function h(u){const d=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const _=f.array;v=f.version;for(let b=0,x=_.length;b<x;b+=3){const C=_[b+0],A=_[b+1],R=_[b+2];d.push(C,A,A,R,R,C)}}else if(g!==void 0){const _=g.array;v=g.version;for(let b=0,x=_.length/3-1;b<x;b+=3){const C=b+0,A=b+1,R=b+2;d.push(C,A,A,R,R,C)}}else return;const m=new(Eh(d)?Ih:Dh)(d,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function c(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&h(u)}else h(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:c}}function Mm(s,t,e){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*a),e.update(f,n,1)}function h(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*a,g),e.update(f,n,g))}function c(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)h(d[p]/a,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,v,0,g);let p=0;for(let _=0;_<g;_++)p+=f[_]*v[_];e.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=h,this.renderMultiDraw=c,this.renderMultiDrawInstances=u}function bm(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Sm(s,t,e){const n=new WeakMap,i=new ae;function r(a,o,l){const h=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=c!==void 0?c.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let M=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var f=M;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),v===!0&&(x=2),m===!0&&(x=3);let C=o.attributes.position.count*x,A=1;C>t.maxTextureSize&&(A=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const R=new Float32Array(C*A*4*u),I=new Rh(R,C,A,u);I.type=wn,I.needsUpdate=!0;const w=x*4;for(let L=0;L<u;L++){const O=p[L],z=_[L],G=b[L],Y=C*A*4*L;for(let W=0;W<O.count;W++){const K=W*w;g===!0&&(i.fromBufferAttribute(O,W),R[Y+K+0]=i.x,R[Y+K+1]=i.y,R[Y+K+2]=i.z,R[Y+K+3]=0),v===!0&&(i.fromBufferAttribute(z,W),R[Y+K+4]=i.x,R[Y+K+5]=i.y,R[Y+K+6]=i.z,R[Y+K+7]=0),m===!0&&(i.fromBufferAttribute(G,W),R[Y+K+8]=i.x,R[Y+K+9]=i.y,R[Y+K+10]=i.z,R[Y+K+11]=G.itemSize===4?i.w:1)}}d={count:u,texture:I,size:new et(C,A)},n.set(o,d),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<h.length;m++)g+=h[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",h)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function wm(s,t,e,n){let i=new WeakMap;function r(l){const h=n.render.frame,c=l.geometry,u=t.get(l,c);if(i.get(u)!==h&&(t.update(u),i.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==h&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==h&&(d.update(),i.set(d,h))}return u}function a(){i=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:r,dispose:a}}class zh extends ze{constructor(t,e,n,i,r,a,o,l,h,c=cs){if(c!==cs&&c!==vs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&c===cs&&(n=Ci),n===void 0&&c===vs&&(n=gs),super(null,i,r,a,o,l,c,n,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Qe,this.minFilter=l!==void 0?l:Qe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Oh=new ze,rc=new zh(1,1),Bh=new Rh,Hh=new hd,Vh=new kh,ac=[],oc=[],lc=new Float32Array(16),cc=new Float32Array(9),hc=new Float32Array(4);function Ss(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=ac[i];if(r===void 0&&(r=new Float32Array(i),ac[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function be(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Se(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function ra(s,t){let e=oc[t];e===void 0&&(e=new Int32Array(t),oc[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Tm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Em(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;s.uniform2fv(this.addr,t),Se(e,t)}}function Am(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;s.uniform3fv(this.addr,t),Se(e,t)}}function Rm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;s.uniform4fv(this.addr,t),Se(e,t)}}function Cm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(be(e,n))return;hc.set(n),s.uniformMatrix2fv(this.addr,!1,hc),Se(e,n)}}function Pm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(be(e,n))return;cc.set(n),s.uniformMatrix3fv(this.addr,!1,cc),Se(e,n)}}function Lm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(be(e,n))return;lc.set(n),s.uniformMatrix4fv(this.addr,!1,lc),Se(e,n)}}function Dm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Im(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;s.uniform2iv(this.addr,t),Se(e,t)}}function Um(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;s.uniform3iv(this.addr,t),Se(e,t)}}function Nm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;s.uniform4iv(this.addr,t),Se(e,t)}}function km(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Fm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;s.uniform2uiv(this.addr,t),Se(e,t)}}function zm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;s.uniform3uiv(this.addr,t),Se(e,t)}}function Om(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;s.uniform4uiv(this.addr,t),Se(e,t)}}function Bm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(rc.compareFunction=Th,r=rc):r=Oh,e.setTexture2D(t||r,i)}function Hm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Hh,i)}function Vm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Vh,i)}function Gm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Bh,i)}function Wm(s){switch(s){case 5126:return Tm;case 35664:return Em;case 35665:return Am;case 35666:return Rm;case 35674:return Cm;case 35675:return Pm;case 35676:return Lm;case 5124:case 35670:return Dm;case 35667:case 35671:return Im;case 35668:case 35672:return Um;case 35669:case 35673:return Nm;case 5125:return km;case 36294:return Fm;case 36295:return zm;case 36296:return Om;case 35678:case 36198:case 36298:case 36306:case 35682:return Bm;case 35679:case 36299:case 36307:return Hm;case 35680:case 36300:case 36308:case 36293:return Vm;case 36289:case 36303:case 36311:case 36292:return Gm}}function Xm(s,t){s.uniform1fv(this.addr,t)}function Ym(s,t){const e=Ss(t,this.size,2);s.uniform2fv(this.addr,e)}function qm(s,t){const e=Ss(t,this.size,3);s.uniform3fv(this.addr,e)}function $m(s,t){const e=Ss(t,this.size,4);s.uniform4fv(this.addr,e)}function Zm(s,t){const e=Ss(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function jm(s,t){const e=Ss(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Km(s,t){const e=Ss(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Jm(s,t){s.uniform1iv(this.addr,t)}function Qm(s,t){s.uniform2iv(this.addr,t)}function t0(s,t){s.uniform3iv(this.addr,t)}function e0(s,t){s.uniform4iv(this.addr,t)}function n0(s,t){s.uniform1uiv(this.addr,t)}function i0(s,t){s.uniform2uiv(this.addr,t)}function s0(s,t){s.uniform3uiv(this.addr,t)}function r0(s,t){s.uniform4uiv(this.addr,t)}function a0(s,t,e){const n=this.cache,i=t.length,r=ra(e,i);be(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||Oh,r[a])}function o0(s,t,e){const n=this.cache,i=t.length,r=ra(e,i);be(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Hh,r[a])}function l0(s,t,e){const n=this.cache,i=t.length,r=ra(e,i);be(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||Vh,r[a])}function c0(s,t,e){const n=this.cache,i=t.length,r=ra(e,i);be(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Bh,r[a])}function h0(s){switch(s){case 5126:return Xm;case 35664:return Ym;case 35665:return qm;case 35666:return $m;case 35674:return Zm;case 35675:return jm;case 35676:return Km;case 5124:case 35670:return Jm;case 35667:case 35671:return Qm;case 35668:case 35672:return t0;case 35669:case 35673:return e0;case 5125:return n0;case 36294:return i0;case 36295:return s0;case 36296:return r0;case 35678:case 36198:case 36298:case 36306:case 35682:return a0;case 35679:case 36299:case 36307:return o0;case 35680:case 36300:case 36308:case 36293:return l0;case 36289:case 36303:case 36311:case 36292:return c0}}class u0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Wm(e.type)}}class d0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=h0(e.type)}}class f0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const Ha=/(\w+)(\])?(\[|\.)?/g;function uc(s,t){s.seq.push(t),s.map[t.id]=t}function p0(s,t,e){const n=s.name,i=n.length;for(Ha.lastIndex=0;;){const r=Ha.exec(n),a=Ha.lastIndex;let o=r[1];const l=r[2]==="]",h=r[3];if(l&&(o=o|0),h===void 0||h==="["&&a+2===i){uc(e,h===void 0?new u0(o,s,t):new d0(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new f0(o),uc(e,u)),e=u}}}class Wr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);p0(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function dc(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const m0=37297;let g0=0;function v0(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const fc=new Vt;function x0(s){$t._getMatrix(fc,$t.workingColorSpace,s);const t=`mat3( ${fc.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(s)){case sa:return[t,"LinearTransferOETF"];case se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function pc(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+v0(s.getShaderSource(t),a)}else return i}function _0(s,t){const e=x0(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function y0(s,t){let e;switch(t){case ch:e="Linear";break;case hh:e="Reinhard";break;case uh:e="Cineon";break;case Zo:e="ACESFilmic";break;case dh:e="AgX";break;case fh:e="Neutral";break;case Gu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const br=new D;function M0(){$t.getLuminanceCoefficients(br);const s=br.x.toFixed(4),t=br.y.toFixed(4),e=br.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function b0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Os).join(`
`)}function S0(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function w0(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Os(s){return s!==""}function mc(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function gc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const T0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ho(s){return s.replace(T0,A0)}const E0=new Map;function A0(s,t){let e=Wt[t];if(e===void 0){const n=E0.get(t);if(n!==void 0)e=Wt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ho(e)}const R0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vc(s){return s.replace(R0,C0)}function C0(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function xc(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function P0(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===ah?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===oh?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Un&&(t="SHADOWMAP_TYPE_VSM"),t}function L0(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ps:case ms:t="ENVMAP_TYPE_CUBE";break;case ia:t="ENVMAP_TYPE_CUBE_UV";break}return t}function D0(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ms:t="ENVMAP_MODE_REFRACTION";break}return t}function I0(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case lh:t="ENVMAP_BLENDING_MULTIPLY";break;case Hu:t="ENVMAP_BLENDING_MIX";break;case Vu:t="ENVMAP_BLENDING_ADD";break}return t}function U0(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function N0(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=P0(e),h=L0(e),c=D0(e),u=I0(e),d=U0(e),f=b0(e),g=S0(r),v=i.createProgram();let m,p,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Os).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Os).join(`
`),p.length>0&&(p+=`
`)):(m=[xc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Os).join(`
`),p=[xc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ci?"#define TONE_MAPPING":"",e.toneMapping!==ci?Wt.tonemapping_pars_fragment:"",e.toneMapping!==ci?y0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,_0("linearToOutputTexel",e.outputColorSpace),M0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Os).join(`
`)),a=Ho(a),a=mc(a,e),a=gc(a,e),o=Ho(o),o=mc(o,e),o=gc(o,e),a=vc(a),o=vc(o),e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===Dl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Dl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=_+m+a,x=_+p+o,C=dc(i,i.VERTEX_SHADER,b),A=dc(i,i.FRAGMENT_SHADER,x);i.attachShader(v,C),i.attachShader(v,A),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function R(L){if(s.debug.checkShaderErrors){const O=i.getProgramInfoLog(v).trim(),z=i.getShaderInfoLog(C).trim(),G=i.getShaderInfoLog(A).trim();let Y=!0,W=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(Y=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,C,A);else{const K=pc(i,C,"vertex"),V=pc(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+O+`
`+K+`
`+V)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(z===""||G==="")&&(W=!1);W&&(L.diagnostics={runnable:Y,programLog:O,vertexShader:{log:z,prefix:m},fragmentShader:{log:G,prefix:p}})}i.deleteShader(C),i.deleteShader(A),I=new Wr(i,v),w=w0(i,v)}let I;this.getUniforms=function(){return I===void 0&&R(this),I};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(v,m0)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=g0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=A,this}let k0=0;class F0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new z0(t),e.set(t,n)),n}}class z0{constructor(t){this.id=k0++,this.code=t,this.usedTimes=0}}function O0(s,t,e,n,i,r,a){const o=new Ph,l=new F0,h=new Set,c=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return h.add(w),w===0?"uv":`uv${w}`}function m(w,M,L,O,z){const G=O.fog,Y=z.geometry,W=w.isMeshStandardMaterial?O.environment:null,K=(w.isMeshStandardMaterial?e:t).get(w.envMap||W),V=K&&K.mapping===ia?K.image.height:null,ct=g[w.type];w.precision!==null&&(f=i.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));const gt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,St=gt!==void 0?gt.length:0;let Ot=0;Y.morphAttributes.position!==void 0&&(Ot=1),Y.morphAttributes.normal!==void 0&&(Ot=2),Y.morphAttributes.color!==void 0&&(Ot=3);let te,Z,rt,wt;if(ct){const ie=Mn[ct];te=ie.vertexShader,Z=ie.fragmentShader}else te=w.vertexShader,Z=w.fragmentShader,l.update(w),rt=l.getVertexShaderID(w),wt=l.getFragmentShaderID(w);const ot=s.getRenderTarget(),Lt=s.state.buffers.depth.getReversed(),Ft=z.isInstancedMesh===!0,Ut=z.isBatchedMesh===!0,Zt=!!w.map,J=!!w.matcap,st=!!K,P=!!w.aoMap,Ct=!!w.lightMap,nt=!!w.bumpMap,_t=!!w.normalMap,lt=!!w.displacementMap,Dt=!!w.emissiveMap,vt=!!w.metalnessMap,E=!!w.roughnessMap,S=w.anisotropy>0,F=w.clearcoat>0,q=w.dispersion>0,Q=w.iridescence>0,$=w.sheen>0,Tt=w.transmission>0,ut=S&&!!w.anisotropyMap,xt=F&&!!w.clearcoatMap,Yt=F&&!!w.clearcoatNormalMap,it=F&&!!w.clearcoatRoughnessMap,Mt=Q&&!!w.iridescenceMap,It=Q&&!!w.iridescenceThicknessMap,Nt=$&&!!w.sheenColorMap,bt=$&&!!w.sheenRoughnessMap,qt=!!w.specularMap,Gt=!!w.specularColorMap,oe=!!w.specularIntensityMap,U=Tt&&!!w.transmissionMap,dt=Tt&&!!w.thicknessMap,X=!!w.gradientMap,j=!!w.alphaMap,mt=w.alphaTest>0,ft=!!w.alphaHash,Bt=!!w.extensions;let fe=ci;w.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(fe=s.toneMapping);const Pe={shaderID:ct,shaderType:w.type,shaderName:w.name,vertexShader:te,fragmentShader:Z,defines:w.defines,customVertexShaderID:rt,customFragmentShaderID:wt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:Ut,batchingColor:Ut&&z._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&z.instanceColor!==null,instancingMorph:Ft&&z.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ot===null?s.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Ms,alphaToCoverage:!!w.alphaToCoverage,map:Zt,matcap:J,envMap:st,envMapMode:st&&K.mapping,envMapCubeUVHeight:V,aoMap:P,lightMap:Ct,bumpMap:nt,normalMap:_t,displacementMap:d&&lt,emissiveMap:Dt,normalMapObjectSpace:_t&&w.normalMapType===qu,normalMapTangentSpace:_t&&w.normalMapType===wh,metalnessMap:vt,roughnessMap:E,anisotropy:S,anisotropyMap:ut,clearcoat:F,clearcoatMap:xt,clearcoatNormalMap:Yt,clearcoatRoughnessMap:it,dispersion:q,iridescence:Q,iridescenceMap:Mt,iridescenceThicknessMap:It,sheen:$,sheenColorMap:Nt,sheenRoughnessMap:bt,specularMap:qt,specularColorMap:Gt,specularIntensityMap:oe,transmission:Tt,transmissionMap:U,thicknessMap:dt,gradientMap:X,opaque:w.transparent===!1&&w.blending===li&&w.alphaToCoverage===!1,alphaMap:j,alphaTest:mt,alphaHash:ft,combine:w.combine,mapUv:Zt&&v(w.map.channel),aoMapUv:P&&v(w.aoMap.channel),lightMapUv:Ct&&v(w.lightMap.channel),bumpMapUv:nt&&v(w.bumpMap.channel),normalMapUv:_t&&v(w.normalMap.channel),displacementMapUv:lt&&v(w.displacementMap.channel),emissiveMapUv:Dt&&v(w.emissiveMap.channel),metalnessMapUv:vt&&v(w.metalnessMap.channel),roughnessMapUv:E&&v(w.roughnessMap.channel),anisotropyMapUv:ut&&v(w.anisotropyMap.channel),clearcoatMapUv:xt&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:Yt&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Mt&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:It&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:bt&&v(w.sheenRoughnessMap.channel),specularMapUv:qt&&v(w.specularMap.channel),specularColorMapUv:Gt&&v(w.specularColorMap.channel),specularIntensityMapUv:oe&&v(w.specularIntensityMap.channel),transmissionMapUv:U&&v(w.transmissionMap.channel),thicknessMapUv:dt&&v(w.thicknessMap.channel),alphaMapUv:j&&v(w.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(_t||S),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!Y.attributes.uv&&(Zt||j),fog:!!G,useFog:w.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Lt,skinning:z.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:Ot,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:fe,decodeVideoTexture:Zt&&w.map.isVideoTexture===!0&&$t.getTransfer(w.map.colorSpace)===se,decodeVideoTextureEmissive:Dt&&w.emissiveMap.isVideoTexture===!0&&$t.getTransfer(w.emissiveMap.colorSpace)===se,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===qe,flipSided:w.side===Fe,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Bt&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&w.extensions.multiDraw===!0||Ut)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Pe.vertexUv1s=h.has(1),Pe.vertexUv2s=h.has(2),Pe.vertexUv3s=h.has(3),h.clear(),Pe}function p(w){const M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(const L in w.defines)M.push(L),M.push(w.defines[L]);return w.isRawShaderMaterial===!1&&(_(M,w),b(M,w),M.push(s.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function _(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function b(w,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),w.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),w.push(o.mask)}function x(w){const M=g[w.type];let L;if(M){const O=Mn[M];L=qs.clone(O.uniforms)}else L=w.uniforms;return L}function C(w,M){let L;for(let O=0,z=c.length;O<z;O++){const G=c[O];if(G.cacheKey===M){L=G,++L.usedTimes;break}}return L===void 0&&(L=new N0(s,M,w,r),c.push(L)),L}function A(w){if(--w.usedTimes===0){const M=c.indexOf(w);c[M]=c[c.length-1],c.pop(),w.destroy()}}function R(w){l.remove(w)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:C,releaseProgram:A,releaseShaderCache:R,programs:c,dispose:I}}function B0(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function H0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function _c(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function yc(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u,d,f,g,v,m){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},s[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function o(u,d,f,g,v,m){const p=a(u,d,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(u,d,f,g,v,m){const p=a(u,d,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function h(u,d){e.length>1&&e.sort(u||H0),n.length>1&&n.sort(d||_c),i.length>1&&i.sort(d||_c)}function c(){for(let u=t,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:c,sort:h}}function V0(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new yc,s.set(n,[a])):i>=r.length?(a=new yc,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function G0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new yt};break;case"SpotLight":e={position:new D,direction:new D,color:new yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new yt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new yt,groundColor:new yt};break;case"RectAreaLight":e={color:new yt,position:new D,halfWidth:new D,halfHeight:new D};break}return s[t.id]=e,e}}}function W0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let X0=0;function Y0(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function q0(s){const t=new G0,e=W0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new D);const i=new D,r=new Qt,a=new Qt;function o(h){let c=0,u=0,d=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,_=0,b=0,x=0,C=0,A=0,R=0;h.sort(Y0);for(let w=0,M=h.length;w<M;w++){const L=h[w],O=L.color,z=L.intensity,G=L.distance,Y=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)c+=O.r*z,u+=O.g*z,d+=O.b*z;else if(L.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(L.sh.coefficients[W],z);R++}else if(L.isDirectionalLight){const W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const K=L.shadow,V=e.get(L);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=Y,n.directionalShadowMatrix[f]=L.shadow.matrix,_++}n.directional[f]=W,f++}else if(L.isSpotLight){const W=t.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(O).multiplyScalar(z),W.distance=G,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,n.spot[v]=W;const K=L.shadow;if(L.map&&(n.spotLightMap[C]=L.map,C++,K.updateMatrices(L),L.castShadow&&A++),n.spotLightMatrix[v]=K.matrix,L.castShadow){const V=e.get(L);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,n.spotShadow[v]=V,n.spotShadowMap[v]=Y,x++}v++}else if(L.isRectAreaLight){const W=t.get(L);W.color.copy(O).multiplyScalar(z),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=W,m++}else if(L.isPointLight){const W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),W.distance=L.distance,W.decay=L.decay,L.castShadow){const K=L.shadow,V=e.get(L);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,V.shadowCameraNear=K.camera.near,V.shadowCameraFar=K.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=Y,n.pointShadowMatrix[g]=L.shadow.matrix,b++}n.point[g]=W,g++}else if(L.isHemisphereLight){const W=t.get(L);W.skyColor.copy(L.color).multiplyScalar(z),W.groundColor.copy(L.groundColor).multiplyScalar(z),n.hemi[p]=W,p++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ht.LTC_FLOAT_1,n.rectAreaLTC2=ht.LTC_FLOAT_2):(n.rectAreaLTC1=ht.LTC_HALF_1,n.rectAreaLTC2=ht.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=u,n.ambient[2]=d;const I=n.hash;(I.directionalLength!==f||I.pointLength!==g||I.spotLength!==v||I.rectAreaLength!==m||I.hemiLength!==p||I.numDirectionalShadows!==_||I.numPointShadows!==b||I.numSpotShadows!==x||I.numSpotMaps!==C||I.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=x+C-A,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,I.directionalLength=f,I.pointLength=g,I.spotLength=v,I.rectAreaLength=m,I.hemiLength=p,I.numDirectionalShadows=_,I.numPointShadows=b,I.numSpotShadows=x,I.numSpotMaps=C,I.numLightProbes=R,n.version=X0++)}function l(h,c){let u=0,d=0,f=0,g=0,v=0;const m=c.matrixWorldInverse;for(let p=0,_=h.length;p<_;p++){const b=h[p];if(b.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),u++}else if(b.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(b.matrixWorld),i.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),f++}else if(b.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),x.halfWidth.set(b.width*.5,0,0),x.halfHeight.set(0,b.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(b.matrixWorld),x.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function Mc(s){const t=new q0(s),e=[],n=[];function i(c){h.camera=c,e.length=0,n.length=0}function r(c){e.push(c)}function a(c){n.push(c)}function o(){t.setup(e)}function l(c){t.setupView(e,c)}const h={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:h,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function $0(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new Mc(s),t.set(i,[o])):r>=a.length?(o=new Mc(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Z0 extends Ui{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Xu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class j0 extends Ui{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const K0=`void main() {
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
}`;function Q0(s,t,e){let n=new il;const i=new et,r=new et,a=new ae,o=new Z0({depthPacking:Yu}),l=new j0,h={},c=e.maxTextureSize,u={[hi]:Fe,[Fe]:hi,[qe]:qe},d=new me({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new et},radius:{value:4}},vertexShader:K0,fragmentShader:J0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new ye;g.setAttribute("position",new Ce(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new kt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ah;let p=this.type;this.render=function(A,R,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const w=s.getRenderTarget(),M=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),O=s.state;O.setBlending(zn),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const z=p!==Un&&this.type===Un,G=p===Un&&this.type!==Un;for(let Y=0,W=A.length;Y<W;Y++){const K=A[Y],V=K.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const ct=V.getFrameExtents();if(i.multiply(ct),r.copy(V.mapSize),(i.x>c||i.y>c)&&(i.x>c&&(r.x=Math.floor(c/ct.x),i.x=r.x*ct.x,V.mapSize.x=r.x),i.y>c&&(r.y=Math.floor(c/ct.y),i.y=r.y*ct.y,V.mapSize.y=r.y)),V.map===null||z===!0||G===!0){const St=this.type!==Un?{minFilter:Qe,magFilter:Qe}:{};V.map!==null&&V.map.dispose(),V.map=new gn(i.x,i.y,St),V.map.texture.name=K.name+".shadowMap",V.camera.updateProjectionMatrix()}s.setRenderTarget(V.map),s.clear();const gt=V.getViewportCount();for(let St=0;St<gt;St++){const Ot=V.getViewport(St);a.set(r.x*Ot.x,r.y*Ot.y,r.x*Ot.z,r.y*Ot.w),O.viewport(a),V.updateMatrices(K,St),n=V.getFrustum(),x(R,I,V.camera,K,this.type)}V.isPointLightShadow!==!0&&this.type===Un&&_(V,I),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(w,M,L)};function _(A,R){const I=t.update(v);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new gn(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(R,null,I,d,v,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(R,null,I,f,v,null)}function b(A,R,I,w){let M=null;const L=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)M=L;else if(M=I.isPointLight===!0?l:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const O=M.uuid,z=R.uuid;let G=h[O];G===void 0&&(G={},h[O]=G);let Y=G[z];Y===void 0&&(Y=M.clone(),G[z]=Y,R.addEventListener("dispose",C)),M=Y}if(M.visible=R.visible,M.wireframe=R.wireframe,w===Un?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:u[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const O=s.properties.get(M);O.light=I}return M}function x(A,R,I,w,M){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===Un)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);const z=t.update(A),G=A.material;if(Array.isArray(G)){const Y=z.groups;for(let W=0,K=Y.length;W<K;W++){const V=Y[W],ct=G[V.materialIndex];if(ct&&ct.visible){const gt=b(A,ct,w,M);A.onBeforeShadow(s,A,R,I,z,gt,V),s.renderBufferDirect(I,null,z,gt,A,V),A.onAfterShadow(s,A,R,I,z,gt,V)}}}else if(G.visible){const Y=b(A,G,w,M);A.onBeforeShadow(s,A,R,I,z,Y,null),s.renderBufferDirect(I,null,z,Y,A,null),A.onAfterShadow(s,A,R,I,z,Y,null)}}const O=A.children;for(let z=0,G=O.length;z<G;z++)x(O[z],R,I,w,M)}function C(A){A.target.removeEventListener("dispose",C);for(const I in h){const w=h[I],M=A.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}const tg={[no]:io,[so]:oo,[ro]:lo,[fs]:ao,[io]:no,[oo]:so,[lo]:ro,[ao]:fs};function eg(s,t){function e(){let U=!1;const dt=new ae;let X=null;const j=new ae(0,0,0,0);return{setMask:function(mt){X!==mt&&!U&&(s.colorMask(mt,mt,mt,mt),X=mt)},setLocked:function(mt){U=mt},setClear:function(mt,ft,Bt,fe,Pe){Pe===!0&&(mt*=fe,ft*=fe,Bt*=fe),dt.set(mt,ft,Bt,fe),j.equals(dt)===!1&&(s.clearColor(mt,ft,Bt,fe),j.copy(dt))},reset:function(){U=!1,X=null,j.set(-1,0,0,0)}}}function n(){let U=!1,dt=!1,X=null,j=null,mt=null;return{setReversed:function(ft){if(dt!==ft){const Bt=t.get("EXT_clip_control");dt?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT);const fe=mt;mt=null,this.setClear(fe)}dt=ft},getReversed:function(){return dt},setTest:function(ft){ft?ot(s.DEPTH_TEST):Lt(s.DEPTH_TEST)},setMask:function(ft){X!==ft&&!U&&(s.depthMask(ft),X=ft)},setFunc:function(ft){if(dt&&(ft=tg[ft]),j!==ft){switch(ft){case no:s.depthFunc(s.NEVER);break;case io:s.depthFunc(s.ALWAYS);break;case so:s.depthFunc(s.LESS);break;case fs:s.depthFunc(s.LEQUAL);break;case ro:s.depthFunc(s.EQUAL);break;case ao:s.depthFunc(s.GEQUAL);break;case oo:s.depthFunc(s.GREATER);break;case lo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}j=ft}},setLocked:function(ft){U=ft},setClear:function(ft){mt!==ft&&(dt&&(ft=1-ft),s.clearDepth(ft),mt=ft)},reset:function(){U=!1,X=null,j=null,mt=null,dt=!1}}}function i(){let U=!1,dt=null,X=null,j=null,mt=null,ft=null,Bt=null,fe=null,Pe=null;return{setTest:function(ie){U||(ie?ot(s.STENCIL_TEST):Lt(s.STENCIL_TEST))},setMask:function(ie){dt!==ie&&!U&&(s.stencilMask(ie),dt=ie)},setFunc:function(ie,ln,An){(X!==ie||j!==ln||mt!==An)&&(s.stencilFunc(ie,ln,An),X=ie,j=ln,mt=An)},setOp:function(ie,ln,An){(ft!==ie||Bt!==ln||fe!==An)&&(s.stencilOp(ie,ln,An),ft=ie,Bt=ln,fe=An)},setLocked:function(ie){U=ie},setClear:function(ie){Pe!==ie&&(s.clearStencil(ie),Pe=ie)},reset:function(){U=!1,dt=null,X=null,j=null,mt=null,ft=null,Bt=null,fe=null,Pe=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,h=new WeakMap;let c={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,_=null,b=null,x=null,C=null,A=null,R=new yt(0,0,0),I=0,w=!1,M=null,L=null,O=null,z=null,G=null;const Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,K=0;const V=s.getParameter(s.VERSION);V.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=K>=1):V.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=K>=2);let ct=null,gt={};const St=s.getParameter(s.SCISSOR_BOX),Ot=s.getParameter(s.VIEWPORT),te=new ae().fromArray(St),Z=new ae().fromArray(Ot);function rt(U,dt,X,j){const mt=new Uint8Array(4),ft=s.createTexture();s.bindTexture(U,ft),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Bt=0;Bt<X;Bt++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(dt,0,s.RGBA,1,1,j,0,s.RGBA,s.UNSIGNED_BYTE,mt):s.texImage2D(dt+Bt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,mt);return ft}const wt={};wt[s.TEXTURE_2D]=rt(s.TEXTURE_2D,s.TEXTURE_2D,1),wt[s.TEXTURE_CUBE_MAP]=rt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),wt[s.TEXTURE_2D_ARRAY]=rt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),wt[s.TEXTURE_3D]=rt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ot(s.DEPTH_TEST),a.setFunc(fs),nt(!1),_t(Rl),ot(s.CULL_FACE),P(zn);function ot(U){c[U]!==!0&&(s.enable(U),c[U]=!0)}function Lt(U){c[U]!==!1&&(s.disable(U),c[U]=!1)}function Ft(U,dt){return u[U]!==dt?(s.bindFramebuffer(U,dt),u[U]=dt,U===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=dt),U===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=dt),!0):!1}function Ut(U,dt){let X=f,j=!1;if(U){X=d.get(dt),X===void 0&&(X=[],d.set(dt,X));const mt=U.textures;if(X.length!==mt.length||X[0]!==s.COLOR_ATTACHMENT0){for(let ft=0,Bt=mt.length;ft<Bt;ft++)X[ft]=s.COLOR_ATTACHMENT0+ft;X.length=mt.length,j=!0}}else X[0]!==s.BACK&&(X[0]=s.BACK,j=!0);j&&s.drawBuffers(X)}function Zt(U){return g!==U?(s.useProgram(U),g=U,!0):!1}const J={[wi]:s.FUNC_ADD,[wu]:s.FUNC_SUBTRACT,[Tu]:s.FUNC_REVERSE_SUBTRACT};J[Eu]=s.MIN,J[Au]=s.MAX;const st={[Ru]:s.ZERO,[Cu]:s.ONE,[Pu]:s.SRC_COLOR,[to]:s.SRC_ALPHA,[ku]:s.SRC_ALPHA_SATURATE,[Uu]:s.DST_COLOR,[Du]:s.DST_ALPHA,[Lu]:s.ONE_MINUS_SRC_COLOR,[eo]:s.ONE_MINUS_SRC_ALPHA,[Nu]:s.ONE_MINUS_DST_COLOR,[Iu]:s.ONE_MINUS_DST_ALPHA,[Fu]:s.CONSTANT_COLOR,[zu]:s.ONE_MINUS_CONSTANT_COLOR,[Ou]:s.CONSTANT_ALPHA,[Bu]:s.ONE_MINUS_CONSTANT_ALPHA};function P(U,dt,X,j,mt,ft,Bt,fe,Pe,ie){if(U===zn){v===!0&&(Lt(s.BLEND),v=!1);return}if(v===!1&&(ot(s.BLEND),v=!0),U!==Su){if(U!==m||ie!==w){if((p!==wi||x!==wi)&&(s.blendEquation(s.FUNC_ADD),p=wi,x=wi),ie)switch(U){case li:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ve:s.blendFunc(s.ONE,s.ONE);break;case Cl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Pl:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case li:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ve:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Cl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Pl:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}_=null,b=null,C=null,A=null,R.set(0,0,0),I=0,m=U,w=ie}return}mt=mt||dt,ft=ft||X,Bt=Bt||j,(dt!==p||mt!==x)&&(s.blendEquationSeparate(J[dt],J[mt]),p=dt,x=mt),(X!==_||j!==b||ft!==C||Bt!==A)&&(s.blendFuncSeparate(st[X],st[j],st[ft],st[Bt]),_=X,b=j,C=ft,A=Bt),(fe.equals(R)===!1||Pe!==I)&&(s.blendColor(fe.r,fe.g,fe.b,Pe),R.copy(fe),I=Pe),m=U,w=!1}function Ct(U,dt){U.side===qe?Lt(s.CULL_FACE):ot(s.CULL_FACE);let X=U.side===Fe;dt&&(X=!X),nt(X),U.blending===li&&U.transparent===!1?P(zn):P(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const j=U.stencilWrite;o.setTest(j),j&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Dt(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ot(s.SAMPLE_ALPHA_TO_COVERAGE):Lt(s.SAMPLE_ALPHA_TO_COVERAGE)}function nt(U){M!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),M=U)}function _t(U){U!==Mu?(ot(s.CULL_FACE),U!==L&&(U===Rl?s.cullFace(s.BACK):U===bu?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Lt(s.CULL_FACE),L=U}function lt(U){U!==O&&(W&&s.lineWidth(U),O=U)}function Dt(U,dt,X){U?(ot(s.POLYGON_OFFSET_FILL),(z!==dt||G!==X)&&(s.polygonOffset(dt,X),z=dt,G=X)):Lt(s.POLYGON_OFFSET_FILL)}function vt(U){U?ot(s.SCISSOR_TEST):Lt(s.SCISSOR_TEST)}function E(U){U===void 0&&(U=s.TEXTURE0+Y-1),ct!==U&&(s.activeTexture(U),ct=U)}function S(U,dt,X){X===void 0&&(ct===null?X=s.TEXTURE0+Y-1:X=ct);let j=gt[X];j===void 0&&(j={type:void 0,texture:void 0},gt[X]=j),(j.type!==U||j.texture!==dt)&&(ct!==X&&(s.activeTexture(X),ct=X),s.bindTexture(U,dt||wt[U]),j.type=U,j.texture=dt)}function F(){const U=gt[ct];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function q(){try{s.compressedTexImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{s.compressedTexImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $(){try{s.texSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Tt(){try{s.texSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ut(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function xt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Yt(){try{s.texStorage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{s.texStorage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(){try{s.texImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function It(){try{s.texImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Nt(U){te.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),te.copy(U))}function bt(U){Z.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),Z.copy(U))}function qt(U,dt){let X=h.get(dt);X===void 0&&(X=new WeakMap,h.set(dt,X));let j=X.get(U);j===void 0&&(j=s.getUniformBlockIndex(dt,U.name),X.set(U,j))}function Gt(U,dt){const j=h.get(dt).get(U);l.get(dt)!==j&&(s.uniformBlockBinding(dt,j,U.__bindingPointIndex),l.set(dt,j))}function oe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),c={},ct=null,gt={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,_=null,b=null,x=null,C=null,A=null,R=new yt(0,0,0),I=0,w=!1,M=null,L=null,O=null,z=null,G=null,te.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ot,disable:Lt,bindFramebuffer:Ft,drawBuffers:Ut,useProgram:Zt,setBlending:P,setMaterial:Ct,setFlipSided:nt,setCullFace:_t,setLineWidth:lt,setPolygonOffset:Dt,setScissorTest:vt,activeTexture:E,bindTexture:S,unbindTexture:F,compressedTexImage2D:q,compressedTexImage3D:Q,texImage2D:Mt,texImage3D:It,updateUBOMapping:qt,uniformBlockBinding:Gt,texStorage2D:Yt,texStorage3D:it,texSubImage2D:$,texSubImage3D:Tt,compressedTexSubImage2D:ut,compressedTexSubImage3D:xt,scissor:Nt,viewport:bt,reset:oe}}function bc(s,t,e,n){const i=ng(n);switch(e){case xh:return s*t;case yh:return s*t;case Mh:return s*t*2;case Qo:return s*t/i.components*i.byteLength;case tl:return s*t/i.components*i.byteLength;case bh:return s*t*2/i.components*i.byteLength;case el:return s*t*2/i.components*i.byteLength;case _h:return s*t*3/i.components*i.byteLength;case fn:return s*t*4/i.components*i.byteLength;case nl:return s*t*4/i.components*i.byteLength;case Or:case Br:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Hr:case Vr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case po:case go:return Math.max(s,16)*Math.max(t,8)/4;case fo:case mo:return Math.max(s,8)*Math.max(t,8)/2;case vo:case xo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case _o:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case yo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Mo:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case bo:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case So:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case wo:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case To:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Eo:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Ao:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Ro:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Co:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Po:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Lo:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Do:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Io:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Gr:case Uo:case No:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Sh:case ko:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Fo:case zo:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ng(s){switch(s){case Vn:case mh:return{byteLength:1,components:1};case Ys:case gh:case On:return{byteLength:2,components:1};case Ko:case Jo:return{byteLength:2,components:4};case Ci:case jo:case wn:return{byteLength:4,components:1};case vh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function ig(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new et,c=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,S){return f?new OffscreenCanvas(E,S):$r("canvas")}function v(E,S,F){let q=1;const Q=vt(E);if((Q.width>F||Q.height>F)&&(q=F/Math.max(Q.width,Q.height)),q<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const $=Math.floor(q*Q.width),Tt=Math.floor(q*Q.height);u===void 0&&(u=g($,Tt));const ut=S?g($,Tt):u;return ut.width=$,ut.height=Tt,ut.getContext("2d").drawImage(E,0,0,$,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+$+"x"+Tt+")."),ut}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){s.generateMipmap(E)}function _(E){return E.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?s.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function b(E,S,F,q,Q=!1){if(E!==null){if(s[E]!==void 0)return s[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let $=S;if(S===s.RED&&(F===s.FLOAT&&($=s.R32F),F===s.HALF_FLOAT&&($=s.R16F),F===s.UNSIGNED_BYTE&&($=s.R8)),S===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&($=s.R8UI),F===s.UNSIGNED_SHORT&&($=s.R16UI),F===s.UNSIGNED_INT&&($=s.R32UI),F===s.BYTE&&($=s.R8I),F===s.SHORT&&($=s.R16I),F===s.INT&&($=s.R32I)),S===s.RG&&(F===s.FLOAT&&($=s.RG32F),F===s.HALF_FLOAT&&($=s.RG16F),F===s.UNSIGNED_BYTE&&($=s.RG8)),S===s.RG_INTEGER&&(F===s.UNSIGNED_BYTE&&($=s.RG8UI),F===s.UNSIGNED_SHORT&&($=s.RG16UI),F===s.UNSIGNED_INT&&($=s.RG32UI),F===s.BYTE&&($=s.RG8I),F===s.SHORT&&($=s.RG16I),F===s.INT&&($=s.RG32I)),S===s.RGB_INTEGER&&(F===s.UNSIGNED_BYTE&&($=s.RGB8UI),F===s.UNSIGNED_SHORT&&($=s.RGB16UI),F===s.UNSIGNED_INT&&($=s.RGB32UI),F===s.BYTE&&($=s.RGB8I),F===s.SHORT&&($=s.RGB16I),F===s.INT&&($=s.RGB32I)),S===s.RGBA_INTEGER&&(F===s.UNSIGNED_BYTE&&($=s.RGBA8UI),F===s.UNSIGNED_SHORT&&($=s.RGBA16UI),F===s.UNSIGNED_INT&&($=s.RGBA32UI),F===s.BYTE&&($=s.RGBA8I),F===s.SHORT&&($=s.RGBA16I),F===s.INT&&($=s.RGBA32I)),S===s.RGB&&F===s.UNSIGNED_INT_5_9_9_9_REV&&($=s.RGB9_E5),S===s.RGBA){const Tt=Q?sa:$t.getTransfer(q);F===s.FLOAT&&($=s.RGBA32F),F===s.HALF_FLOAT&&($=s.RGBA16F),F===s.UNSIGNED_BYTE&&($=Tt===se?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT_4_4_4_4&&($=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&($=s.RGB5_A1)}return($===s.R16F||$===s.R32F||$===s.RG16F||$===s.RG32F||$===s.RGBA16F||$===s.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function x(E,S){let F;return E?S===null||S===Ci||S===gs?F=s.DEPTH24_STENCIL8:S===wn?F=s.DEPTH32F_STENCIL8:S===Ys&&(F=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Ci||S===gs?F=s.DEPTH_COMPONENT24:S===wn?F=s.DEPTH_COMPONENT32F:S===Ys&&(F=s.DEPTH_COMPONENT16),F}function C(E,S){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Qe&&E.minFilter!==Sn?Math.log2(Math.max(S.width,S.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?S.mipmaps.length:1}function A(E){const S=E.target;S.removeEventListener("dispose",A),I(S),S.isVideoTexture&&c.delete(S)}function R(E){const S=E.target;S.removeEventListener("dispose",R),M(S)}function I(E){const S=n.get(E);if(S.__webglInit===void 0)return;const F=E.source,q=d.get(F);if(q){const Q=q[S.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&w(E),Object.keys(q).length===0&&d.delete(F)}n.remove(E)}function w(E){const S=n.get(E);s.deleteTexture(S.__webglTexture);const F=E.source,q=d.get(F);delete q[S.__cacheKey],a.memory.textures--}function M(E){const S=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(S.__webglFramebuffer[q]))for(let Q=0;Q<S.__webglFramebuffer[q].length;Q++)s.deleteFramebuffer(S.__webglFramebuffer[q][Q]);else s.deleteFramebuffer(S.__webglFramebuffer[q]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[q])}else{if(Array.isArray(S.__webglFramebuffer))for(let q=0;q<S.__webglFramebuffer.length;q++)s.deleteFramebuffer(S.__webglFramebuffer[q]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let q=0;q<S.__webglColorRenderbuffer.length;q++)S.__webglColorRenderbuffer[q]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[q]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const F=E.textures;for(let q=0,Q=F.length;q<Q;q++){const $=n.get(F[q]);$.__webglTexture&&(s.deleteTexture($.__webglTexture),a.memory.textures--),n.remove(F[q])}n.remove(E)}let L=0;function O(){L=0}function z(){const E=L;return E>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),L+=1,E}function G(E){const S=[];return S.push(E.wrapS),S.push(E.wrapT),S.push(E.wrapR||0),S.push(E.magFilter),S.push(E.minFilter),S.push(E.anisotropy),S.push(E.internalFormat),S.push(E.format),S.push(E.type),S.push(E.generateMipmaps),S.push(E.premultiplyAlpha),S.push(E.flipY),S.push(E.unpackAlignment),S.push(E.colorSpace),S.join()}function Y(E,S){const F=n.get(E);if(E.isVideoTexture&&lt(E),E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){const q=E.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(F,E,S);return}}e.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+S)}function W(E,S){const F=n.get(E);if(E.version>0&&F.__version!==E.version){Z(F,E,S);return}e.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+S)}function K(E,S){const F=n.get(E);if(E.version>0&&F.__version!==E.version){Z(F,E,S);return}e.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+S)}function V(E,S){const F=n.get(E);if(E.version>0&&F.__version!==E.version){rt(F,E,S);return}e.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+S)}const ct={[Xs]:s.REPEAT,[Ei]:s.CLAMP_TO_EDGE,[uo]:s.MIRRORED_REPEAT},gt={[Qe]:s.NEAREST,[Wu]:s.NEAREST_MIPMAP_NEAREST,[nr]:s.NEAREST_MIPMAP_LINEAR,[Sn]:s.LINEAR,[fa]:s.LINEAR_MIPMAP_NEAREST,[Ai]:s.LINEAR_MIPMAP_LINEAR},St={[$u]:s.NEVER,[td]:s.ALWAYS,[Zu]:s.LESS,[Th]:s.LEQUAL,[ju]:s.EQUAL,[Qu]:s.GEQUAL,[Ku]:s.GREATER,[Ju]:s.NOTEQUAL};function Ot(E,S){if(S.type===wn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Sn||S.magFilter===fa||S.magFilter===nr||S.magFilter===Ai||S.minFilter===Sn||S.minFilter===fa||S.minFilter===nr||S.minFilter===Ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(E,s.TEXTURE_WRAP_S,ct[S.wrapS]),s.texParameteri(E,s.TEXTURE_WRAP_T,ct[S.wrapT]),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,ct[S.wrapR]),s.texParameteri(E,s.TEXTURE_MAG_FILTER,gt[S.magFilter]),s.texParameteri(E,s.TEXTURE_MIN_FILTER,gt[S.minFilter]),S.compareFunction&&(s.texParameteri(E,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(E,s.TEXTURE_COMPARE_FUNC,St[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Qe||S.minFilter!==nr&&S.minFilter!==Ai||S.type===wn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");s.texParameterf(E,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function te(E,S){let F=!1;E.__webglInit===void 0&&(E.__webglInit=!0,S.addEventListener("dispose",A));const q=S.source;let Q=d.get(q);Q===void 0&&(Q={},d.set(q,Q));const $=G(S);if($!==E.__cacheKey){Q[$]===void 0&&(Q[$]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Q[$].usedTimes++;const Tt=Q[E.__cacheKey];Tt!==void 0&&(Q[E.__cacheKey].usedTimes--,Tt.usedTimes===0&&w(S)),E.__cacheKey=$,E.__webglTexture=Q[$].texture}return F}function Z(E,S,F){let q=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(q=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(q=s.TEXTURE_3D);const Q=te(E,S),$=S.source;e.bindTexture(q,E.__webglTexture,s.TEXTURE0+F);const Tt=n.get($);if($.version!==Tt.__version||Q===!0){e.activeTexture(s.TEXTURE0+F);const ut=$t.getPrimaries($t.workingColorSpace),xt=S.colorSpace===ri?null:$t.getPrimaries(S.colorSpace),Yt=S.colorSpace===ri||ut===xt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);let it=v(S.image,!1,i.maxTextureSize);it=Dt(S,it);const Mt=r.convert(S.format,S.colorSpace),It=r.convert(S.type);let Nt=b(S.internalFormat,Mt,It,S.colorSpace,S.isVideoTexture);Ot(q,S);let bt;const qt=S.mipmaps,Gt=S.isVideoTexture!==!0,oe=Tt.__version===void 0||Q===!0,U=$.dataReady,dt=C(S,it);if(S.isDepthTexture)Nt=x(S.format===vs,S.type),oe&&(Gt?e.texStorage2D(s.TEXTURE_2D,1,Nt,it.width,it.height):e.texImage2D(s.TEXTURE_2D,0,Nt,it.width,it.height,0,Mt,It,null));else if(S.isDataTexture)if(qt.length>0){Gt&&oe&&e.texStorage2D(s.TEXTURE_2D,dt,Nt,qt[0].width,qt[0].height);for(let X=0,j=qt.length;X<j;X++)bt=qt[X],Gt?U&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,bt.width,bt.height,Mt,It,bt.data):e.texImage2D(s.TEXTURE_2D,X,Nt,bt.width,bt.height,0,Mt,It,bt.data);S.generateMipmaps=!1}else Gt?(oe&&e.texStorage2D(s.TEXTURE_2D,dt,Nt,it.width,it.height),U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,it.width,it.height,Mt,It,it.data)):e.texImage2D(s.TEXTURE_2D,0,Nt,it.width,it.height,0,Mt,It,it.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Gt&&oe&&e.texStorage3D(s.TEXTURE_2D_ARRAY,dt,Nt,qt[0].width,qt[0].height,it.depth);for(let X=0,j=qt.length;X<j;X++)if(bt=qt[X],S.format!==fn)if(Mt!==null)if(Gt){if(U)if(S.layerUpdates.size>0){const mt=bc(bt.width,bt.height,S.format,S.type);for(const ft of S.layerUpdates){const Bt=bt.data.subarray(ft*mt/bt.data.BYTES_PER_ELEMENT,(ft+1)*mt/bt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,ft,bt.width,bt.height,1,Mt,Bt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,bt.width,bt.height,it.depth,Mt,bt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,X,Nt,bt.width,bt.height,it.depth,0,bt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?U&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,bt.width,bt.height,it.depth,Mt,It,bt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,X,Nt,bt.width,bt.height,it.depth,0,Mt,It,bt.data)}else{Gt&&oe&&e.texStorage2D(s.TEXTURE_2D,dt,Nt,qt[0].width,qt[0].height);for(let X=0,j=qt.length;X<j;X++)bt=qt[X],S.format!==fn?Mt!==null?Gt?U&&e.compressedTexSubImage2D(s.TEXTURE_2D,X,0,0,bt.width,bt.height,Mt,bt.data):e.compressedTexImage2D(s.TEXTURE_2D,X,Nt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?U&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,bt.width,bt.height,Mt,It,bt.data):e.texImage2D(s.TEXTURE_2D,X,Nt,bt.width,bt.height,0,Mt,It,bt.data)}else if(S.isDataArrayTexture)if(Gt){if(oe&&e.texStorage3D(s.TEXTURE_2D_ARRAY,dt,Nt,it.width,it.height,it.depth),U)if(S.layerUpdates.size>0){const X=bc(it.width,it.height,S.format,S.type);for(const j of S.layerUpdates){const mt=it.data.subarray(j*X/it.data.BYTES_PER_ELEMENT,(j+1)*X/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,j,it.width,it.height,1,Mt,It,mt)}S.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,Mt,It,it.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Nt,it.width,it.height,it.depth,0,Mt,It,it.data);else if(S.isData3DTexture)Gt?(oe&&e.texStorage3D(s.TEXTURE_3D,dt,Nt,it.width,it.height,it.depth),U&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,Mt,It,it.data)):e.texImage3D(s.TEXTURE_3D,0,Nt,it.width,it.height,it.depth,0,Mt,It,it.data);else if(S.isFramebufferTexture){if(oe)if(Gt)e.texStorage2D(s.TEXTURE_2D,dt,Nt,it.width,it.height);else{let X=it.width,j=it.height;for(let mt=0;mt<dt;mt++)e.texImage2D(s.TEXTURE_2D,mt,Nt,X,j,0,Mt,It,null),X>>=1,j>>=1}}else if(qt.length>0){if(Gt&&oe){const X=vt(qt[0]);e.texStorage2D(s.TEXTURE_2D,dt,Nt,X.width,X.height)}for(let X=0,j=qt.length;X<j;X++)bt=qt[X],Gt?U&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,Mt,It,bt):e.texImage2D(s.TEXTURE_2D,X,Nt,Mt,It,bt);S.generateMipmaps=!1}else if(Gt){if(oe){const X=vt(it);e.texStorage2D(s.TEXTURE_2D,dt,Nt,X.width,X.height)}U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Mt,It,it)}else e.texImage2D(s.TEXTURE_2D,0,Nt,Mt,It,it);m(S)&&p(q),Tt.__version=$.version,S.onUpdate&&S.onUpdate(S)}E.__version=S.version}function rt(E,S,F){if(S.image.length!==6)return;const q=te(E,S),Q=S.source;e.bindTexture(s.TEXTURE_CUBE_MAP,E.__webglTexture,s.TEXTURE0+F);const $=n.get(Q);if(Q.version!==$.__version||q===!0){e.activeTexture(s.TEXTURE0+F);const Tt=$t.getPrimaries($t.workingColorSpace),ut=S.colorSpace===ri?null:$t.getPrimaries(S.colorSpace),xt=S.colorSpace===ri||Tt===ut?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);const Yt=S.isCompressedTexture||S.image[0].isCompressedTexture,it=S.image[0]&&S.image[0].isDataTexture,Mt=[];for(let j=0;j<6;j++)!Yt&&!it?Mt[j]=v(S.image[j],!0,i.maxCubemapSize):Mt[j]=it?S.image[j].image:S.image[j],Mt[j]=Dt(S,Mt[j]);const It=Mt[0],Nt=r.convert(S.format,S.colorSpace),bt=r.convert(S.type),qt=b(S.internalFormat,Nt,bt,S.colorSpace),Gt=S.isVideoTexture!==!0,oe=$.__version===void 0||q===!0,U=Q.dataReady;let dt=C(S,It);Ot(s.TEXTURE_CUBE_MAP,S);let X;if(Yt){Gt&&oe&&e.texStorage2D(s.TEXTURE_CUBE_MAP,dt,qt,It.width,It.height);for(let j=0;j<6;j++){X=Mt[j].mipmaps;for(let mt=0;mt<X.length;mt++){const ft=X[mt];S.format!==fn?Nt!==null?Gt?U&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,mt,0,0,ft.width,ft.height,Nt,ft.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,mt,qt,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Gt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,mt,0,0,ft.width,ft.height,Nt,bt,ft.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,mt,qt,ft.width,ft.height,0,Nt,bt,ft.data)}}}else{if(X=S.mipmaps,Gt&&oe){X.length>0&&dt++;const j=vt(Mt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,dt,qt,j.width,j.height)}for(let j=0;j<6;j++)if(it){Gt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Mt[j].width,Mt[j].height,Nt,bt,Mt[j].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,qt,Mt[j].width,Mt[j].height,0,Nt,bt,Mt[j].data);for(let mt=0;mt<X.length;mt++){const Bt=X[mt].image[j].image;Gt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,mt+1,0,0,Bt.width,Bt.height,Nt,bt,Bt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,mt+1,qt,Bt.width,Bt.height,0,Nt,bt,Bt.data)}}else{Gt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Nt,bt,Mt[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,qt,Nt,bt,Mt[j]);for(let mt=0;mt<X.length;mt++){const ft=X[mt];Gt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,mt+1,0,0,Nt,bt,ft.image[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,mt+1,qt,Nt,bt,ft.image[j])}}}m(S)&&p(s.TEXTURE_CUBE_MAP),$.__version=Q.version,S.onUpdate&&S.onUpdate(S)}E.__version=S.version}function wt(E,S,F,q,Q,$){const Tt=r.convert(F.format,F.colorSpace),ut=r.convert(F.type),xt=b(F.internalFormat,Tt,ut,F.colorSpace),Yt=n.get(S),it=n.get(F);if(it.__renderTarget=S,!Yt.__hasExternalTextures){const Mt=Math.max(1,S.width>>$),It=Math.max(1,S.height>>$);Q===s.TEXTURE_3D||Q===s.TEXTURE_2D_ARRAY?e.texImage3D(Q,$,xt,Mt,It,S.depth,0,Tt,ut,null):e.texImage2D(Q,$,xt,Mt,It,0,Tt,ut,null)}e.bindFramebuffer(s.FRAMEBUFFER,E),_t(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,q,Q,it.__webglTexture,0,nt(S)):(Q===s.TEXTURE_2D||Q>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,q,Q,it.__webglTexture,$),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ot(E,S,F){if(s.bindRenderbuffer(s.RENDERBUFFER,E),S.depthBuffer){const q=S.depthTexture,Q=q&&q.isDepthTexture?q.type:null,$=x(S.stencilBuffer,Q),Tt=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ut=nt(S);_t(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ut,$,S.width,S.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,ut,$,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,$,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Tt,s.RENDERBUFFER,E)}else{const q=S.textures;for(let Q=0;Q<q.length;Q++){const $=q[Q],Tt=r.convert($.format,$.colorSpace),ut=r.convert($.type),xt=b($.internalFormat,Tt,ut,$.colorSpace),Yt=nt(S);F&&_t(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Yt,xt,S.width,S.height):_t(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Yt,xt,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,xt,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Lt(E,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,E),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(S.depthTexture);q.__renderTarget=S,(!q.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Y(S.depthTexture,0);const Q=q.__webglTexture,$=nt(S);if(S.depthTexture.format===cs)_t(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0);else if(S.depthTexture.format===vs)_t(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ft(E){const S=n.get(E),F=E.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==E.depthTexture){const q=E.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),q){const Q=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,q.removeEventListener("dispose",Q)};q.addEventListener("dispose",Q),S.__depthDisposeCallback=Q}S.__boundDepthTexture=q}if(E.depthTexture&&!S.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Lt(S.__webglFramebuffer,E)}else if(F){S.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[q]),S.__webglDepthbuffer[q]===void 0)S.__webglDepthbuffer[q]=s.createRenderbuffer(),ot(S.__webglDepthbuffer[q],E,!1);else{const Q=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,$=S.__webglDepthbuffer[q];s.bindRenderbuffer(s.RENDERBUFFER,$),s.framebufferRenderbuffer(s.FRAMEBUFFER,Q,s.RENDERBUFFER,$)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=s.createRenderbuffer(),ot(S.__webglDepthbuffer,E,!1);else{const q=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Q=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Q),s.framebufferRenderbuffer(s.FRAMEBUFFER,q,s.RENDERBUFFER,Q)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ut(E,S,F){const q=n.get(E);S!==void 0&&wt(q.__webglFramebuffer,E,E.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&Ft(E)}function Zt(E){const S=E.texture,F=n.get(E),q=n.get(S);E.addEventListener("dispose",R);const Q=E.textures,$=E.isWebGLCubeRenderTarget===!0,Tt=Q.length>1;if(Tt||(q.__webglTexture===void 0&&(q.__webglTexture=s.createTexture()),q.__version=S.version,a.memory.textures++),$){F.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer[ut]=[];for(let xt=0;xt<S.mipmaps.length;xt++)F.__webglFramebuffer[ut][xt]=s.createFramebuffer()}else F.__webglFramebuffer[ut]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer=[];for(let ut=0;ut<S.mipmaps.length;ut++)F.__webglFramebuffer[ut]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if(Tt)for(let ut=0,xt=Q.length;ut<xt;ut++){const Yt=n.get(Q[ut]);Yt.__webglTexture===void 0&&(Yt.__webglTexture=s.createTexture(),a.memory.textures++)}if(E.samples>0&&_t(E)===!1){F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ut=0;ut<Q.length;ut++){const xt=Q[ut];F.__webglColorRenderbuffer[ut]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[ut]);const Yt=r.convert(xt.format,xt.colorSpace),it=r.convert(xt.type),Mt=b(xt.internalFormat,Yt,it,xt.colorSpace,E.isXRRenderTarget===!0),It=nt(E);s.renderbufferStorageMultisample(s.RENDERBUFFER,It,Mt,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.RENDERBUFFER,F.__webglColorRenderbuffer[ut])}s.bindRenderbuffer(s.RENDERBUFFER,null),E.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),ot(F.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if($){e.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture),Ot(s.TEXTURE_CUBE_MAP,S);for(let ut=0;ut<6;ut++)if(S.mipmaps&&S.mipmaps.length>0)for(let xt=0;xt<S.mipmaps.length;xt++)wt(F.__webglFramebuffer[ut][xt],E,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,xt);else wt(F.__webglFramebuffer[ut],E,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);m(S)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let ut=0,xt=Q.length;ut<xt;ut++){const Yt=Q[ut],it=n.get(Yt);e.bindTexture(s.TEXTURE_2D,it.__webglTexture),Ot(s.TEXTURE_2D,Yt),wt(F.__webglFramebuffer,E,Yt,s.COLOR_ATTACHMENT0+ut,s.TEXTURE_2D,0),m(Yt)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let ut=s.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ut=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ut,q.__webglTexture),Ot(ut,S),S.mipmaps&&S.mipmaps.length>0)for(let xt=0;xt<S.mipmaps.length;xt++)wt(F.__webglFramebuffer[xt],E,S,s.COLOR_ATTACHMENT0,ut,xt);else wt(F.__webglFramebuffer,E,S,s.COLOR_ATTACHMENT0,ut,0);m(S)&&p(ut),e.unbindTexture()}E.depthBuffer&&Ft(E)}function J(E){const S=E.textures;for(let F=0,q=S.length;F<q;F++){const Q=S[F];if(m(Q)){const $=_(E),Tt=n.get(Q).__webglTexture;e.bindTexture($,Tt),p($),e.unbindTexture()}}}const st=[],P=[];function Ct(E){if(E.samples>0){if(_t(E)===!1){const S=E.textures,F=E.width,q=E.height;let Q=s.COLOR_BUFFER_BIT;const $=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Tt=n.get(E),ut=S.length>1;if(ut)for(let xt=0;xt<S.length;xt++)e.bindFramebuffer(s.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Tt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let xt=0;xt<S.length;xt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Q|=s.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Q|=s.STENCIL_BUFFER_BIT)),ut){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Tt.__webglColorRenderbuffer[xt]);const Yt=n.get(S[xt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Yt,0)}s.blitFramebuffer(0,0,F,q,0,0,F,q,Q,s.NEAREST),l===!0&&(st.length=0,P.length=0,st.push(s.COLOR_ATTACHMENT0+xt),E.depthBuffer&&E.resolveDepthBuffer===!1&&(st.push($),P.push($),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,P)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,st))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ut)for(let xt=0;xt<S.length;xt++){e.bindFramebuffer(s.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.RENDERBUFFER,Tt.__webglColorRenderbuffer[xt]);const Yt=n.get(S[xt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Tt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.TEXTURE_2D,Yt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const S=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function nt(E){return Math.min(i.maxSamples,E.samples)}function _t(E){const S=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function lt(E){const S=a.render.frame;c.get(E)!==S&&(c.set(E,S),E.update())}function Dt(E,S){const F=E.colorSpace,q=E.format,Q=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||F!==Ms&&F!==ri&&($t.getTransfer(F)===se?(q!==fn||Q!==Vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),S}function vt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(h.width=E.naturalWidth||E.width,h.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(h.width=E.displayWidth,h.height=E.displayHeight):(h.width=E.width,h.height=E.height),h}this.allocateTextureUnit=z,this.resetTextureUnits=O,this.setTexture2D=Y,this.setTexture2DArray=W,this.setTexture3D=K,this.setTextureCube=V,this.rebindTextures=Ut,this.setupRenderTarget=Zt,this.updateRenderTargetMipmap=J,this.updateMultisampleRenderTarget=Ct,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=_t}function sg(s,t){function e(n,i=ri){let r;const a=$t.getTransfer(i);if(n===Vn)return s.UNSIGNED_BYTE;if(n===Ko)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Jo)return s.UNSIGNED_SHORT_5_5_5_1;if(n===vh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===mh)return s.BYTE;if(n===gh)return s.SHORT;if(n===Ys)return s.UNSIGNED_SHORT;if(n===jo)return s.INT;if(n===Ci)return s.UNSIGNED_INT;if(n===wn)return s.FLOAT;if(n===On)return s.HALF_FLOAT;if(n===xh)return s.ALPHA;if(n===_h)return s.RGB;if(n===fn)return s.RGBA;if(n===yh)return s.LUMINANCE;if(n===Mh)return s.LUMINANCE_ALPHA;if(n===cs)return s.DEPTH_COMPONENT;if(n===vs)return s.DEPTH_STENCIL;if(n===Qo)return s.RED;if(n===tl)return s.RED_INTEGER;if(n===bh)return s.RG;if(n===el)return s.RG_INTEGER;if(n===nl)return s.RGBA_INTEGER;if(n===Or||n===Br||n===Hr||n===Vr)if(a===se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Or)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Or)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Br)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Vr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===fo||n===po||n===mo||n===go)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===fo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===po)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===mo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===go)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===vo||n===xo||n===_o)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===vo||n===xo)return a===se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===_o)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===yo||n===Mo||n===bo||n===So||n===wo||n===To||n===Eo||n===Ao||n===Ro||n===Co||n===Po||n===Lo||n===Do||n===Io)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===yo)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Mo)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===bo)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===So)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===wo)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===To)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Eo)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ao)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ro)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Co)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Po)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Lo)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Do)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Io)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Gr||n===Uo||n===No)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Gr)return a===se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Uo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===No)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Sh||n===ko||n===Fo||n===zo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Gr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ko)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Fo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===zo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===gs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class rg extends Ne{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ke extends ge{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ag={type:"move"};class Va{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(h,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const c=h.joints["index-finger-tip"],u=h.joints["thumb-tip"],d=c.position.distanceTo(u.position),f=.02,g=.005;h.inputState.pinching&&d>f+g?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&d<=f-g&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ag)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ke;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const og=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,lg=`
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

}`;class cg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new ze,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new me({vertexShader:og,fragmentShader:lg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new kt(new pn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class hg extends bs{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,h=null,c=null,u=null,d=null,f=null,g=null;const v=new cg,m=e.getContextAttributes();let p=null,_=null;const b=[],x=[],C=new et;let A=null;const R=new Ne;R.viewport=new ae;const I=new Ne;I.viewport=new ae;const w=[R,I],M=new rg;let L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let rt=b[Z];return rt===void 0&&(rt=new Va,b[Z]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(Z){let rt=b[Z];return rt===void 0&&(rt=new Va,b[Z]=rt),rt.getGripSpace()},this.getHand=function(Z){let rt=b[Z];return rt===void 0&&(rt=new Va,b[Z]=rt),rt.getHandSpace()};function z(Z){const rt=x.indexOf(Z.inputSource);if(rt===-1)return;const wt=b[rt];wt!==void 0&&(wt.update(Z.inputSource,Z.frame,h||a),wt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function G(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",Y);for(let Z=0;Z<b.length;Z++){const rt=x[Z];rt!==null&&(x[Z]=null,b[Z].disconnect(rt))}L=null,O=null,v.reset(),t.setRenderTarget(p),f=null,d=null,u=null,i=null,_=null,te.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function(Z){h=Z},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",G),i.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(C),i.renderState.layers===void 0){const rt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,rt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new gn(f.framebufferWidth,f.framebufferHeight,{format:fn,type:Vn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let rt=null,wt=null,ot=null;m.depth&&(ot=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=m.stencil?vs:cs,wt=m.stencil?gs:Ci);const Lt={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:r};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(Lt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new gn(d.textureWidth,d.textureHeight,{format:fn,type:Vn,depthTexture:new zh(d.textureWidth,d.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),h=null,a=await i.requestReferenceSpace(o),te.setContext(i),te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function Y(Z){for(let rt=0;rt<Z.removed.length;rt++){const wt=Z.removed[rt],ot=x.indexOf(wt);ot>=0&&(x[ot]=null,b[ot].disconnect(wt))}for(let rt=0;rt<Z.added.length;rt++){const wt=Z.added[rt];let ot=x.indexOf(wt);if(ot===-1){for(let Ft=0;Ft<b.length;Ft++)if(Ft>=x.length){x.push(wt),ot=Ft;break}else if(x[Ft]===null){x[Ft]=wt,ot=Ft;break}if(ot===-1)break}const Lt=b[ot];Lt&&Lt.connect(wt)}}const W=new D,K=new D;function V(Z,rt,wt){W.setFromMatrixPosition(rt.matrixWorld),K.setFromMatrixPosition(wt.matrixWorld);const ot=W.distanceTo(K),Lt=rt.projectionMatrix.elements,Ft=wt.projectionMatrix.elements,Ut=Lt[14]/(Lt[10]-1),Zt=Lt[14]/(Lt[10]+1),J=(Lt[9]+1)/Lt[5],st=(Lt[9]-1)/Lt[5],P=(Lt[8]-1)/Lt[0],Ct=(Ft[8]+1)/Ft[0],nt=Ut*P,_t=Ut*Ct,lt=ot/(-P+Ct),Dt=lt*-P;if(rt.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Dt),Z.translateZ(lt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Lt[10]===-1)Z.projectionMatrix.copy(rt.projectionMatrix),Z.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const vt=Ut+lt,E=Zt+lt,S=nt-Dt,F=_t+(ot-Dt),q=J*Zt/E*vt,Q=st*Zt/E*vt;Z.projectionMatrix.makePerspective(S,F,q,Q,vt,E),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ct(Z,rt){rt===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(rt.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let rt=Z.near,wt=Z.far;v.texture!==null&&(v.depthNear>0&&(rt=v.depthNear),v.depthFar>0&&(wt=v.depthFar)),M.near=I.near=R.near=rt,M.far=I.far=R.far=wt,(L!==M.near||O!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),L=M.near,O=M.far),R.layers.mask=Z.layers.mask|2,I.layers.mask=Z.layers.mask|4,M.layers.mask=R.layers.mask|I.layers.mask;const ot=Z.parent,Lt=M.cameras;ct(M,ot);for(let Ft=0;Ft<Lt.length;Ft++)ct(Lt[Ft],ot);Lt.length===2?V(M,R,I):M.projectionMatrix.copy(R.projectionMatrix),gt(Z,M,ot)};function gt(Z,rt,wt){wt===null?Z.matrix.copy(rt.matrixWorld):(Z.matrix.copy(wt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(rt.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(rt.projectionMatrix),Z.projectionMatrixInverse.copy(rt.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=qr*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Z){l=Z,d!==null&&(d.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let St=null;function Ot(Z,rt){if(c=rt.getViewerPose(h||a),g=rt,c!==null){const wt=c.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let ot=!1;wt.length!==M.cameras.length&&(M.cameras.length=0,ot=!0);for(let Ft=0;Ft<wt.length;Ft++){const Ut=wt[Ft];let Zt=null;if(f!==null)Zt=f.getViewport(Ut);else{const st=u.getViewSubImage(d,Ut);Zt=st.viewport,Ft===0&&(t.setRenderTargetTextures(_,st.colorTexture,d.ignoreDepthValues?void 0:st.depthStencilTexture),t.setRenderTarget(_))}let J=w[Ft];J===void 0&&(J=new Ne,J.layers.enable(Ft),J.viewport=new ae,w[Ft]=J),J.matrix.fromArray(Ut.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(Ut.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(Zt.x,Zt.y,Zt.width,Zt.height),Ft===0&&(M.matrix.copy(J.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ot===!0&&M.cameras.push(J)}const Lt=i.enabledFeatures;if(Lt&&Lt.includes("depth-sensing")){const Ft=u.getDepthInformation(wt[0]);Ft&&Ft.isValid&&Ft.texture&&v.init(t,Ft,i.renderState)}}for(let wt=0;wt<b.length;wt++){const ot=x[wt],Lt=b[wt];ot!==null&&Lt!==void 0&&Lt.update(ot,rt,h||a)}St&&St(Z,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),g=null}const te=new Fh;te.setAnimationLoop(Ot),this.setAnimationLoop=function(Z){St=Z},this.dispose=function(){}}}const xi=new Tn,ug=new Qt;function dg(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Uh(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,_,b,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),c(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,_,b):p.isSpriteMaterial?h(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Fe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Fe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const _=t.get(p),b=_.envMap,x=_.envMapRotation;b&&(m.envMap.value=b,xi.copy(x),xi.x*=-1,xi.y*=-1,xi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(xi.y*=-1,xi.z*=-1),m.envMapRotation.value.setFromMatrix4(ug.makeRotationFromEuler(xi)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,_,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*_,m.scale.value=b*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,_){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Fe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const _=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function fg(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,b){const x=b.program;n.uniformBlockBinding(_,x)}function h(_,b){let x=i[_.id];x===void 0&&(g(_),x=c(_),i[_.id]=x,_.addEventListener("dispose",m));const C=b.program;n.updateUBOMapping(_,C);const A=t.render.frame;r[_.id]!==A&&(d(_),r[_.id]=A)}function c(_){const b=u();_.__bindingPointIndex=b;const x=s.createBuffer(),C=_.__size,A=_.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,C,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,x),x}function u(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){const b=i[_.id],x=_.uniforms,C=_.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let A=0,R=x.length;A<R;A++){const I=Array.isArray(x[A])?x[A]:[x[A]];for(let w=0,M=I.length;w<M;w++){const L=I[w];if(f(L,A,w,C)===!0){const O=L.__offset,z=Array.isArray(L.value)?L.value:[L.value];let G=0;for(let Y=0;Y<z.length;Y++){const W=z[Y],K=v(W);typeof W=="number"||typeof W=="boolean"?(L.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,O+G,L.__data)):W.isMatrix3?(L.__data[0]=W.elements[0],L.__data[1]=W.elements[1],L.__data[2]=W.elements[2],L.__data[3]=0,L.__data[4]=W.elements[3],L.__data[5]=W.elements[4],L.__data[6]=W.elements[5],L.__data[7]=0,L.__data[8]=W.elements[6],L.__data[9]=W.elements[7],L.__data[10]=W.elements[8],L.__data[11]=0):(W.toArray(L.__data,G),G+=K.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,O,L.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(_,b,x,C){const A=_.value,R=b+"_"+x;if(C[R]===void 0)return typeof A=="number"||typeof A=="boolean"?C[R]=A:C[R]=A.clone(),!0;{const I=C[R];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return C[R]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function g(_){const b=_.uniforms;let x=0;const C=16;for(let R=0,I=b.length;R<I;R++){const w=Array.isArray(b[R])?b[R]:[b[R]];for(let M=0,L=w.length;M<L;M++){const O=w[M],z=Array.isArray(O.value)?O.value:[O.value];for(let G=0,Y=z.length;G<Y;G++){const W=z[G],K=v(W),V=x%C,ct=V%K.boundary,gt=V+ct;x+=ct,gt!==0&&C-gt<K.storage&&(x+=C-gt),O.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=K.storage}}}const A=x%C;return A>0&&(x+=C-A),_.__size=x,_.__cache={},this}function v(_){const b={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(b.boundary=4,b.storage=4):_.isVector2?(b.boundary=8,b.storage=8):_.isVector3||_.isColor?(b.boundary=16,b.storage=12):_.isVector4?(b.boundary=16,b.storage=16):_.isMatrix3?(b.boundary=48,b.storage=48):_.isMatrix4?(b.boundary=64,b.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),b}function m(_){const b=_.target;b.removeEventListener("dispose",m);const x=a.indexOf(b.__bindingPointIndex);a.splice(x,1),s.deleteBuffer(i[b.id]),delete i[b.id],delete r[b.id]}function p(){for(const _ in i)s.deleteBuffer(i[_]);a=[],i={},r={}}return{bind:l,update:h,dispose:p}}class pg{constructor(t={}){const{canvas:e=nd(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const _=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ye,this.toneMapping=ci,this.toneMappingExposure=1;const x=this;let C=!1,A=0,R=0,I=null,w=-1,M=null;const L=new ae,O=new ae;let z=null;const G=new yt(0);let Y=0,W=e.width,K=e.height,V=1,ct=null,gt=null;const St=new ae(0,0,W,K),Ot=new ae(0,0,W,K);let te=!1;const Z=new il;let rt=!1,wt=!1;const ot=new Qt,Lt=new Qt,Ft=new D,Ut=new ae,Zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let J=!1;function st(){return I===null?V:1}let P=n;function Ct(T,N){return e.getContext(T,N)}try{const T={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${$o}`),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",mt,!1),e.addEventListener("webglcontextcreationerror",ft,!1),P===null){const N="webgl2";if(P=Ct(N,T),P===null)throw Ct(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let nt,_t,lt,Dt,vt,E,S,F,q,Q,$,Tt,ut,xt,Yt,it,Mt,It,Nt,bt,qt,Gt,oe,U;function dt(){nt=new _m(P),nt.init(),Gt=new sg(P,nt),_t=new fm(P,nt,t,Gt),lt=new eg(P,nt),_t.reverseDepthBuffer&&d&&lt.buffers.depth.setReversed(!0),Dt=new bm(P),vt=new B0,E=new ig(P,nt,lt,vt,_t,Gt,Dt),S=new mm(x),F=new xm(x),q=new Rd(P),oe=new um(P,q),Q=new ym(P,q,Dt,oe),$=new wm(P,Q,q,Dt),Nt=new Sm(P,_t,E),it=new pm(vt),Tt=new O0(x,S,F,nt,_t,oe,it),ut=new dg(x,vt),xt=new V0,Yt=new $0(nt),It=new hm(x,S,F,lt,$,f,l),Mt=new Q0(x,$,_t),U=new fg(P,Dt,_t,lt),bt=new dm(P,nt,Dt),qt=new Mm(P,nt,Dt),Dt.programs=Tt.programs,x.capabilities=_t,x.extensions=nt,x.properties=vt,x.renderLists=xt,x.shadowMap=Mt,x.state=lt,x.info=Dt}dt();const X=new hg(x,P);this.xr=X,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const T=nt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=nt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(T){T!==void 0&&(V=T,this.setSize(W,K,!1))},this.getSize=function(T){return T.set(W,K)},this.setSize=function(T,N,B=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=T,K=N,e.width=Math.floor(T*V),e.height=Math.floor(N*V),B===!0&&(e.style.width=T+"px",e.style.height=N+"px"),this.setViewport(0,0,T,N)},this.getDrawingBufferSize=function(T){return T.set(W*V,K*V).floor()},this.setDrawingBufferSize=function(T,N,B){W=T,K=N,V=B,e.width=Math.floor(T*B),e.height=Math.floor(N*B),this.setViewport(0,0,T,N)},this.getCurrentViewport=function(T){return T.copy(L)},this.getViewport=function(T){return T.copy(St)},this.setViewport=function(T,N,B,H){T.isVector4?St.set(T.x,T.y,T.z,T.w):St.set(T,N,B,H),lt.viewport(L.copy(St).multiplyScalar(V).round())},this.getScissor=function(T){return T.copy(Ot)},this.setScissor=function(T,N,B,H){T.isVector4?Ot.set(T.x,T.y,T.z,T.w):Ot.set(T,N,B,H),lt.scissor(O.copy(Ot).multiplyScalar(V).round())},this.getScissorTest=function(){return te},this.setScissorTest=function(T){lt.setScissorTest(te=T)},this.setOpaqueSort=function(T){ct=T},this.setTransparentSort=function(T){gt=T},this.getClearColor=function(T){return T.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor.apply(It,arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha.apply(It,arguments)},this.clear=function(T=!0,N=!0,B=!0){let H=0;if(T){let k=!1;if(I!==null){const at=I.texture.format;k=at===nl||at===el||at===tl}if(k){const at=I.texture.type,pt=at===Vn||at===Ci||at===Ys||at===gs||at===Ko||at===Jo,Et=It.getClearColor(),At=It.getClearAlpha(),zt=Et.r,Ht=Et.g,Rt=Et.b;pt?(g[0]=zt,g[1]=Ht,g[2]=Rt,g[3]=At,P.clearBufferuiv(P.COLOR,0,g)):(v[0]=zt,v[1]=Ht,v[2]=Rt,v[3]=At,P.clearBufferiv(P.COLOR,0,v))}else H|=P.COLOR_BUFFER_BIT}N&&(H|=P.DEPTH_BUFFER_BIT),B&&(H|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",mt,!1),e.removeEventListener("webglcontextcreationerror",ft,!1),xt.dispose(),Yt.dispose(),vt.dispose(),S.dispose(),F.dispose(),$.dispose(),oe.dispose(),U.dispose(),Tt.dispose(),X.dispose(),X.removeEventListener("sessionstart",yl),X.removeEventListener("sessionend",Ml),di.stop()};function j(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function mt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const T=Dt.autoReset,N=Mt.enabled,B=Mt.autoUpdate,H=Mt.needsUpdate,k=Mt.type;dt(),Dt.autoReset=T,Mt.enabled=N,Mt.autoUpdate=B,Mt.needsUpdate=H,Mt.type=k}function ft(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Bt(T){const N=T.target;N.removeEventListener("dispose",Bt),fe(N)}function fe(T){Pe(T),vt.remove(T)}function Pe(T){const N=vt.get(T).programs;N!==void 0&&(N.forEach(function(B){Tt.releaseProgram(B)}),T.isShaderMaterial&&Tt.releaseShaderCache(T))}this.renderBufferDirect=function(T,N,B,H,k,at){N===null&&(N=Zt);const pt=k.isMesh&&k.matrixWorld.determinant()<0,Et=gu(T,N,B,H,k);lt.setMaterial(H,pt);let At=B.index,zt=1;if(H.wireframe===!0){if(At=Q.getWireframeAttribute(B),At===void 0)return;zt=2}const Ht=B.drawRange,Rt=B.attributes.position;let jt=Ht.start*zt,le=(Ht.start+Ht.count)*zt;at!==null&&(jt=Math.max(jt,at.start*zt),le=Math.min(le,(at.start+at.count)*zt)),At!==null?(jt=Math.max(jt,0),le=Math.min(le,At.count)):Rt!=null&&(jt=Math.max(jt,0),le=Math.min(le,Rt.count));const he=le-jt;if(he<0||he===1/0)return;oe.setup(k,H,Et,B,At);let Ge,ee=bt;if(At!==null&&(Ge=q.get(At),ee=qt,ee.setIndex(Ge)),k.isMesh)H.wireframe===!0?(lt.setLineWidth(H.wireframeLinewidth*st()),ee.setMode(P.LINES)):ee.setMode(P.TRIANGLES);else if(k.isLine){let Pt=H.linewidth;Pt===void 0&&(Pt=1),lt.setLineWidth(Pt*st()),k.isLineSegments?ee.setMode(P.LINES):k.isLineLoop?ee.setMode(P.LINE_LOOP):ee.setMode(P.LINE_STRIP)}else k.isPoints?ee.setMode(P.POINTS):k.isSprite&&ee.setMode(P.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)ee.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(nt.get("WEBGL_multi_draw"))ee.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Pt=k._multiDrawStarts,Rn=k._multiDrawCounts,ne=k._multiDrawCount,cn=At?q.get(At).bytesPerElement:1,Ni=vt.get(H).currentProgram.getUniforms();for(let Ze=0;Ze<ne;Ze++)Ni.setValue(P,"_gl_DrawID",Ze),ee.render(Pt[Ze]/cn,Rn[Ze])}else if(k.isInstancedMesh)ee.renderInstances(jt,he,k.count);else if(B.isInstancedBufferGeometry){const Pt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Rn=Math.min(B.instanceCount,Pt);ee.renderInstances(jt,he,Rn)}else ee.render(jt,he)};function ie(T,N,B){T.transparent===!0&&T.side===qe&&T.forceSinglePass===!1?(T.side=Fe,T.needsUpdate=!0,er(T,N,B),T.side=hi,T.needsUpdate=!0,er(T,N,B),T.side=qe):er(T,N,B)}this.compile=function(T,N,B=null){B===null&&(B=T),p=Yt.get(B),p.init(N),b.push(p),B.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),T!==B&&T.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();const H=new Set;return T.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const at=k.material;if(at)if(Array.isArray(at))for(let pt=0;pt<at.length;pt++){const Et=at[pt];ie(Et,B,k),H.add(Et)}else ie(at,B,k),H.add(at)}),b.pop(),p=null,H},this.compileAsync=function(T,N,B=null){const H=this.compile(T,N,B);return new Promise(k=>{function at(){if(H.forEach(function(pt){vt.get(pt).currentProgram.isReady()&&H.delete(pt)}),H.size===0){k(T);return}setTimeout(at,10)}nt.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let ln=null;function An(T){ln&&ln(T)}function yl(){di.stop()}function Ml(){di.start()}const di=new Fh;di.setAnimationLoop(An),typeof self<"u"&&di.setContext(self),this.setAnimationLoop=function(T){ln=T,X.setAnimationLoop(T),T===null?di.stop():di.start()},X.addEventListener("sessionstart",yl),X.addEventListener("sessionend",Ml),this.render=function(T,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(N),N=X.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,N,I),p=Yt.get(T,b.length),p.init(N),b.push(p),Lt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Z.setFromProjectionMatrix(Lt),wt=this.localClippingEnabled,rt=it.init(this.clippingPlanes,wt),m=xt.get(T,_.length),m.init(),_.push(m),X.enabled===!0&&X.isPresenting===!0){const at=x.xr.getDepthSensingMesh();at!==null&&da(at,N,-1/0,x.sortObjects)}da(T,N,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(ct,gt),J=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,J&&It.addToRenderList(m,T),this.info.render.frame++,rt===!0&&it.beginShadows();const B=p.state.shadowsArray;Mt.render(B,T,N),rt===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,k=m.transmissive;if(p.setupLights(),N.isArrayCamera){const at=N.cameras;if(k.length>0)for(let pt=0,Et=at.length;pt<Et;pt++){const At=at[pt];Sl(H,k,T,At)}J&&It.render(T);for(let pt=0,Et=at.length;pt<Et;pt++){const At=at[pt];bl(m,T,At,At.viewport)}}else k.length>0&&Sl(H,k,T,N),J&&It.render(T),bl(m,T,N);I!==null&&(E.updateMultisampleRenderTarget(I),E.updateRenderTargetMipmap(I)),T.isScene===!0&&T.onAfterRender(x,T,N),oe.resetDefaultState(),w=-1,M=null,b.pop(),b.length>0?(p=b[b.length-1],rt===!0&&it.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,_.pop(),_.length>0?m=_[_.length-1]:m=null};function da(T,N,B,H){if(T.visible===!1)return;if(T.layers.test(N.layers)){if(T.isGroup)B=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(N);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Z.intersectsSprite(T)){H&&Ut.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Lt);const pt=$.update(T),Et=T.material;Et.visible&&m.push(T,pt,Et,B,Ut.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Z.intersectsObject(T))){const pt=$.update(T),Et=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ut.copy(T.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),Ut.copy(pt.boundingSphere.center)),Ut.applyMatrix4(T.matrixWorld).applyMatrix4(Lt)),Array.isArray(Et)){const At=pt.groups;for(let zt=0,Ht=At.length;zt<Ht;zt++){const Rt=At[zt],jt=Et[Rt.materialIndex];jt&&jt.visible&&m.push(T,pt,jt,B,Ut.z,Rt)}}else Et.visible&&m.push(T,pt,Et,B,Ut.z,null)}}const at=T.children;for(let pt=0,Et=at.length;pt<Et;pt++)da(at[pt],N,B,H)}function bl(T,N,B,H){const k=T.opaque,at=T.transmissive,pt=T.transparent;p.setupLightsView(B),rt===!0&&it.setGlobalState(x.clippingPlanes,B),H&&lt.viewport(L.copy(H)),k.length>0&&tr(k,N,B),at.length>0&&tr(at,N,B),pt.length>0&&tr(pt,N,B),lt.buffers.depth.setTest(!0),lt.buffers.depth.setMask(!0),lt.buffers.color.setMask(!0),lt.setPolygonOffset(!1)}function Sl(T,N,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new gn(1,1,{generateMipmaps:!0,type:nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float")?On:Vn,minFilter:Ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));const at=p.state.transmissionRenderTarget[H.id],pt=H.viewport||L;at.setSize(pt.z,pt.w);const Et=x.getRenderTarget();x.setRenderTarget(at),x.getClearColor(G),Y=x.getClearAlpha(),Y<1&&x.setClearColor(16777215,.5),x.clear(),J&&It.render(B);const At=x.toneMapping;x.toneMapping=ci;const zt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),rt===!0&&it.setGlobalState(x.clippingPlanes,H),tr(T,B,H),E.updateMultisampleRenderTarget(at),E.updateRenderTargetMipmap(at),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Ht=!1;for(let Rt=0,jt=N.length;Rt<jt;Rt++){const le=N[Rt],he=le.object,Ge=le.geometry,ee=le.material,Pt=le.group;if(ee.side===qe&&he.layers.test(H.layers)){const Rn=ee.side;ee.side=Fe,ee.needsUpdate=!0,wl(he,B,H,Ge,ee,Pt),ee.side=Rn,ee.needsUpdate=!0,Ht=!0}}Ht===!0&&(E.updateMultisampleRenderTarget(at),E.updateRenderTargetMipmap(at))}x.setRenderTarget(Et),x.setClearColor(G,Y),zt!==void 0&&(H.viewport=zt),x.toneMapping=At}function tr(T,N,B){const H=N.isScene===!0?N.overrideMaterial:null;for(let k=0,at=T.length;k<at;k++){const pt=T[k],Et=pt.object,At=pt.geometry,zt=H===null?pt.material:H,Ht=pt.group;Et.layers.test(B.layers)&&wl(Et,N,B,At,zt,Ht)}}function wl(T,N,B,H,k,at){T.onBeforeRender(x,N,B,H,k,at),T.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),k.onBeforeRender(x,N,B,H,T,at),k.transparent===!0&&k.side===qe&&k.forceSinglePass===!1?(k.side=Fe,k.needsUpdate=!0,x.renderBufferDirect(B,N,H,k,T,at),k.side=hi,k.needsUpdate=!0,x.renderBufferDirect(B,N,H,k,T,at),k.side=qe):x.renderBufferDirect(B,N,H,k,T,at),T.onAfterRender(x,N,B,H,k,at)}function er(T,N,B){N.isScene!==!0&&(N=Zt);const H=vt.get(T),k=p.state.lights,at=p.state.shadowsArray,pt=k.state.version,Et=Tt.getParameters(T,k.state,at,N,B),At=Tt.getProgramCacheKey(Et);let zt=H.programs;H.environment=T.isMeshStandardMaterial?N.environment:null,H.fog=N.fog,H.envMap=(T.isMeshStandardMaterial?F:S).get(T.envMap||H.environment),H.envMapRotation=H.environment!==null&&T.envMap===null?N.environmentRotation:T.envMapRotation,zt===void 0&&(T.addEventListener("dispose",Bt),zt=new Map,H.programs=zt);let Ht=zt.get(At);if(Ht!==void 0){if(H.currentProgram===Ht&&H.lightsStateVersion===pt)return El(T,Et),Ht}else Et.uniforms=Tt.getUniforms(T),T.onBeforeCompile(Et,x),Ht=Tt.acquireProgram(Et,At),zt.set(At,Ht),H.uniforms=Et.uniforms;const Rt=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Rt.clippingPlanes=it.uniform),El(T,Et),H.needsLights=xu(T),H.lightsStateVersion=pt,H.needsLights&&(Rt.ambientLightColor.value=k.state.ambient,Rt.lightProbe.value=k.state.probe,Rt.directionalLights.value=k.state.directional,Rt.directionalLightShadows.value=k.state.directionalShadow,Rt.spotLights.value=k.state.spot,Rt.spotLightShadows.value=k.state.spotShadow,Rt.rectAreaLights.value=k.state.rectArea,Rt.ltc_1.value=k.state.rectAreaLTC1,Rt.ltc_2.value=k.state.rectAreaLTC2,Rt.pointLights.value=k.state.point,Rt.pointLightShadows.value=k.state.pointShadow,Rt.hemisphereLights.value=k.state.hemi,Rt.directionalShadowMap.value=k.state.directionalShadowMap,Rt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Rt.spotShadowMap.value=k.state.spotShadowMap,Rt.spotLightMatrix.value=k.state.spotLightMatrix,Rt.spotLightMap.value=k.state.spotLightMap,Rt.pointShadowMap.value=k.state.pointShadowMap,Rt.pointShadowMatrix.value=k.state.pointShadowMatrix),H.currentProgram=Ht,H.uniformsList=null,Ht}function Tl(T){if(T.uniformsList===null){const N=T.currentProgram.getUniforms();T.uniformsList=Wr.seqWithValue(N.seq,T.uniforms)}return T.uniformsList}function El(T,N){const B=vt.get(T);B.outputColorSpace=N.outputColorSpace,B.batching=N.batching,B.batchingColor=N.batchingColor,B.instancing=N.instancing,B.instancingColor=N.instancingColor,B.instancingMorph=N.instancingMorph,B.skinning=N.skinning,B.morphTargets=N.morphTargets,B.morphNormals=N.morphNormals,B.morphColors=N.morphColors,B.morphTargetsCount=N.morphTargetsCount,B.numClippingPlanes=N.numClippingPlanes,B.numIntersection=N.numClipIntersection,B.vertexAlphas=N.vertexAlphas,B.vertexTangents=N.vertexTangents,B.toneMapping=N.toneMapping}function gu(T,N,B,H,k){N.isScene!==!0&&(N=Zt),E.resetTextureUnits();const at=N.fog,pt=H.isMeshStandardMaterial?N.environment:null,Et=I===null?x.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Ms,At=(H.isMeshStandardMaterial?F:S).get(H.envMap||pt),zt=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ht=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Rt=!!B.morphAttributes.position,jt=!!B.morphAttributes.normal,le=!!B.morphAttributes.color;let he=ci;H.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(he=x.toneMapping);const Ge=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ee=Ge!==void 0?Ge.length:0,Pt=vt.get(H),Rn=p.state.lights;if(rt===!0&&(wt===!0||T!==M)){const tn=T===M&&H.id===w;it.setState(H,T,tn)}let ne=!1;H.version===Pt.__version?(Pt.needsLights&&Pt.lightsStateVersion!==Rn.state.version||Pt.outputColorSpace!==Et||k.isBatchedMesh&&Pt.batching===!1||!k.isBatchedMesh&&Pt.batching===!0||k.isBatchedMesh&&Pt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Pt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Pt.instancing===!1||!k.isInstancedMesh&&Pt.instancing===!0||k.isSkinnedMesh&&Pt.skinning===!1||!k.isSkinnedMesh&&Pt.skinning===!0||k.isInstancedMesh&&Pt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Pt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Pt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Pt.instancingMorph===!1&&k.morphTexture!==null||Pt.envMap!==At||H.fog===!0&&Pt.fog!==at||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==it.numPlanes||Pt.numIntersection!==it.numIntersection)||Pt.vertexAlphas!==zt||Pt.vertexTangents!==Ht||Pt.morphTargets!==Rt||Pt.morphNormals!==jt||Pt.morphColors!==le||Pt.toneMapping!==he||Pt.morphTargetsCount!==ee)&&(ne=!0):(ne=!0,Pt.__version=H.version);let cn=Pt.currentProgram;ne===!0&&(cn=er(H,N,k));let Ni=!1,Ze=!1,Ts=!1;const ue=cn.getUniforms(),vn=Pt.uniforms;if(lt.useProgram(cn.program)&&(Ni=!0,Ze=!0,Ts=!0),H.id!==w&&(w=H.id,Ze=!0),Ni||M!==T){lt.buffers.depth.getReversed()?(ot.copy(T.projectionMatrix),sd(ot),rd(ot),ue.setValue(P,"projectionMatrix",ot)):ue.setValue(P,"projectionMatrix",T.projectionMatrix),ue.setValue(P,"viewMatrix",T.matrixWorldInverse);const Xn=ue.map.cameraPosition;Xn!==void 0&&Xn.setValue(P,Ft.setFromMatrixPosition(T.matrixWorld)),_t.logarithmicDepthBuffer&&ue.setValue(P,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&ue.setValue(P,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,Ze=!0,Ts=!0)}if(k.isSkinnedMesh){ue.setOptional(P,k,"bindMatrix"),ue.setOptional(P,k,"bindMatrixInverse");const tn=k.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),ue.setValue(P,"boneTexture",tn.boneTexture,E))}k.isBatchedMesh&&(ue.setOptional(P,k,"batchingTexture"),ue.setValue(P,"batchingTexture",k._matricesTexture,E),ue.setOptional(P,k,"batchingIdTexture"),ue.setValue(P,"batchingIdTexture",k._indirectTexture,E),ue.setOptional(P,k,"batchingColorTexture"),k._colorsTexture!==null&&ue.setValue(P,"batchingColorTexture",k._colorsTexture,E));const Es=B.morphAttributes;if((Es.position!==void 0||Es.normal!==void 0||Es.color!==void 0)&&Nt.update(k,B,cn),(Ze||Pt.receiveShadow!==k.receiveShadow)&&(Pt.receiveShadow=k.receiveShadow,ue.setValue(P,"receiveShadow",k.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(vn.envMap.value=At,vn.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&N.environment!==null&&(vn.envMapIntensity.value=N.environmentIntensity),Ze&&(ue.setValue(P,"toneMappingExposure",x.toneMappingExposure),Pt.needsLights&&vu(vn,Ts),at&&H.fog===!0&&ut.refreshFogUniforms(vn,at),ut.refreshMaterialUniforms(vn,H,V,K,p.state.transmissionRenderTarget[T.id]),Wr.upload(P,Tl(Pt),vn,E)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Wr.upload(P,Tl(Pt),vn,E),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&ue.setValue(P,"center",k.center),ue.setValue(P,"modelViewMatrix",k.modelViewMatrix),ue.setValue(P,"normalMatrix",k.normalMatrix),ue.setValue(P,"modelMatrix",k.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const tn=H.uniformsGroups;for(let Xn=0,Yn=tn.length;Xn<Yn;Xn++){const Al=tn[Xn];U.update(Al,cn),U.bind(Al,cn)}}return cn}function vu(T,N){T.ambientLightColor.needsUpdate=N,T.lightProbe.needsUpdate=N,T.directionalLights.needsUpdate=N,T.directionalLightShadows.needsUpdate=N,T.pointLights.needsUpdate=N,T.pointLightShadows.needsUpdate=N,T.spotLights.needsUpdate=N,T.spotLightShadows.needsUpdate=N,T.rectAreaLights.needsUpdate=N,T.hemisphereLights.needsUpdate=N}function xu(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(T,N,B){vt.get(T.texture).__webglTexture=N,vt.get(T.depthTexture).__webglTexture=B;const H=vt.get(T);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=B===void 0,H.__autoAllocateDepthBuffer||nt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,N){const B=vt.get(T);B.__webglFramebuffer=N,B.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(T,N=0,B=0){I=T,A=N,R=B;let H=!0,k=null,at=!1,pt=!1;if(T){const At=vt.get(T);if(At.__useDefaultFramebuffer!==void 0)lt.bindFramebuffer(P.FRAMEBUFFER,null),H=!1;else if(At.__webglFramebuffer===void 0)E.setupRenderTarget(T);else if(At.__hasExternalTextures)E.rebindTextures(T,vt.get(T.texture).__webglTexture,vt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Rt=T.depthTexture;if(At.__boundDepthTexture!==Rt){if(Rt!==null&&vt.has(Rt)&&(T.width!==Rt.image.width||T.height!==Rt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(T)}}const zt=T.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(pt=!0);const Ht=vt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ht[N])?k=Ht[N][B]:k=Ht[N],at=!0):T.samples>0&&E.useMultisampledRTT(T)===!1?k=vt.get(T).__webglMultisampledFramebuffer:Array.isArray(Ht)?k=Ht[B]:k=Ht,L.copy(T.viewport),O.copy(T.scissor),z=T.scissorTest}else L.copy(St).multiplyScalar(V).floor(),O.copy(Ot).multiplyScalar(V).floor(),z=te;if(lt.bindFramebuffer(P.FRAMEBUFFER,k)&&H&&lt.drawBuffers(T,k),lt.viewport(L),lt.scissor(O),lt.setScissorTest(z),at){const At=vt.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,At.__webglTexture,B)}else if(pt){const At=vt.get(T.texture),zt=N||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,At.__webglTexture,B||0,zt)}w=-1},this.readRenderTargetPixels=function(T,N,B,H,k,at,pt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=vt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&pt!==void 0&&(Et=Et[pt]),Et){lt.bindFramebuffer(P.FRAMEBUFFER,Et);try{const At=T.texture,zt=At.format,Ht=At.type;if(!_t.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_t.textureTypeReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=T.width-H&&B>=0&&B<=T.height-k&&P.readPixels(N,B,H,k,Gt.convert(zt),Gt.convert(Ht),at)}finally{const At=I!==null?vt.get(I).__webglFramebuffer:null;lt.bindFramebuffer(P.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(T,N,B,H,k,at,pt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=vt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&pt!==void 0&&(Et=Et[pt]),Et){const At=T.texture,zt=At.format,Ht=At.type;if(!_t.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_t.textureTypeReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=T.width-H&&B>=0&&B<=T.height-k){lt.bindFramebuffer(P.FRAMEBUFFER,Et);const Rt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Rt),P.bufferData(P.PIXEL_PACK_BUFFER,at.byteLength,P.STREAM_READ),P.readPixels(N,B,H,k,Gt.convert(zt),Gt.convert(Ht),0);const jt=I!==null?vt.get(I).__webglFramebuffer:null;lt.bindFramebuffer(P.FRAMEBUFFER,jt);const le=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await id(P,le,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Rt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,at),P.deleteBuffer(Rt),P.deleteSync(le),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,N=null,B=0){T.isTexture!==!0&&(zs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,T=arguments[1]);const H=Math.pow(2,-B),k=Math.floor(T.image.width*H),at=Math.floor(T.image.height*H),pt=N!==null?N.x:0,Et=N!==null?N.y:0;E.setTexture2D(T,0),P.copyTexSubImage2D(P.TEXTURE_2D,B,0,0,pt,Et,k,at),lt.unbindTexture()},this.copyTextureToTexture=function(T,N,B=null,H=null,k=0){T.isTexture!==!0&&(zs("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,T=arguments[1],N=arguments[2],k=arguments[3]||0,B=null);let at,pt,Et,At,zt,Ht,Rt,jt,le;const he=T.isCompressedTexture?T.mipmaps[k]:T.image;B!==null?(at=B.max.x-B.min.x,pt=B.max.y-B.min.y,Et=B.isBox3?B.max.z-B.min.z:1,At=B.min.x,zt=B.min.y,Ht=B.isBox3?B.min.z:0):(at=he.width,pt=he.height,Et=he.depth||1,At=0,zt=0,Ht=0),H!==null?(Rt=H.x,jt=H.y,le=H.z):(Rt=0,jt=0,le=0);const Ge=Gt.convert(N.format),ee=Gt.convert(N.type);let Pt;N.isData3DTexture?(E.setTexture3D(N,0),Pt=P.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(E.setTexture2DArray(N,0),Pt=P.TEXTURE_2D_ARRAY):(E.setTexture2D(N,0),Pt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const Rn=P.getParameter(P.UNPACK_ROW_LENGTH),ne=P.getParameter(P.UNPACK_IMAGE_HEIGHT),cn=P.getParameter(P.UNPACK_SKIP_PIXELS),Ni=P.getParameter(P.UNPACK_SKIP_ROWS),Ze=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,he.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,he.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,At),P.pixelStorei(P.UNPACK_SKIP_ROWS,zt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ht);const Ts=T.isDataArrayTexture||T.isData3DTexture,ue=N.isDataArrayTexture||N.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const vn=vt.get(T),Es=vt.get(N),tn=vt.get(vn.__renderTarget),Xn=vt.get(Es.__renderTarget);lt.bindFramebuffer(P.READ_FRAMEBUFFER,tn.__webglFramebuffer),lt.bindFramebuffer(P.DRAW_FRAMEBUFFER,Xn.__webglFramebuffer);for(let Yn=0;Yn<Et;Yn++)Ts&&P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,vt.get(T).__webglTexture,k,Ht+Yn),T.isDepthTexture?(ue&&P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,vt.get(N).__webglTexture,k,le+Yn),P.blitFramebuffer(At,zt,at,pt,Rt,jt,at,pt,P.DEPTH_BUFFER_BIT,P.NEAREST)):ue?P.copyTexSubImage3D(Pt,k,Rt,jt,le+Yn,At,zt,at,pt):P.copyTexSubImage2D(Pt,k,Rt,jt,le+Yn,At,zt,at,pt);lt.bindFramebuffer(P.READ_FRAMEBUFFER,null),lt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else ue?T.isDataTexture||T.isData3DTexture?P.texSubImage3D(Pt,k,Rt,jt,le,at,pt,Et,Ge,ee,he.data):N.isCompressedArrayTexture?P.compressedTexSubImage3D(Pt,k,Rt,jt,le,at,pt,Et,Ge,he.data):P.texSubImage3D(Pt,k,Rt,jt,le,at,pt,Et,Ge,ee,he):T.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,k,Rt,jt,at,pt,Ge,ee,he.data):T.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,k,Rt,jt,he.width,he.height,Ge,he.data):P.texSubImage2D(P.TEXTURE_2D,k,Rt,jt,at,pt,Ge,ee,he);P.pixelStorei(P.UNPACK_ROW_LENGTH,Rn),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ne),P.pixelStorei(P.UNPACK_SKIP_PIXELS,cn),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ni),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ze),k===0&&N.generateMipmaps&&P.generateMipmap(Pt),lt.unbindTexture()},this.copyTextureToTexture3D=function(T,N,B=null,H=null,k=0){return T.isTexture!==!0&&(zs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,H=arguments[1]||null,T=arguments[2],N=arguments[3],k=arguments[4]||0),zs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,N,B,H,k)},this.initRenderTarget=function(T){vt.get(T).__webglFramebuffer===void 0&&E.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?E.setTextureCube(T,0):T.isData3DTexture?E.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?E.setTexture2DArray(T,0):E.setTexture2D(T,0),lt.unbindTexture()},this.resetState=function(){A=0,R=0,I=null,lt.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}}class aa{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new yt(t),this.density=e}clone(){return new aa(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Zr extends ge{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Tn,this.environmentIntensity=1,this.environmentRotation=new Tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class mg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Oo,this.updateRanges=[],this.version=0,this.uuid=Bn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Oe=new D;class jr{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=bn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=bn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=bn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=bn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=bn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Ce(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new jr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class oa extends Ui{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new yt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ji;const Ls=new D,Ki=new D,Ji=new D,Qi=new et,Ds=new et,Gh=new Qt,Sr=new D,Is=new D,wr=new D,Sc=new et,Ga=new et,wc=new et;class al extends ge{constructor(t=new oa){if(super(),this.isSprite=!0,this.type="Sprite",ji===void 0){ji=new ye;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new mg(e,5);ji.setIndex([0,1,2,0,2,3]),ji.setAttribute("position",new jr(n,3,0,!1)),ji.setAttribute("uv",new jr(n,2,3,!1))}this.geometry=ji,this.material=t,this.center=new et(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ki.setFromMatrixScale(this.matrixWorld),Gh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ji.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ki.multiplyScalar(-Ji.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Tr(Sr.set(-.5,-.5,0),Ji,a,Ki,i,r),Tr(Is.set(.5,-.5,0),Ji,a,Ki,i,r),Tr(wr.set(.5,.5,0),Ji,a,Ki,i,r),Sc.set(0,0),Ga.set(1,0),wc.set(1,1);let o=t.ray.intersectTriangle(Sr,Is,wr,!1,Ls);if(o===null&&(Tr(Is.set(-.5,.5,0),Ji,a,Ki,i,r),Ga.set(0,1),o=t.ray.intersectTriangle(Sr,wr,Is,!1,Ls),o===null))return;const l=t.ray.origin.distanceTo(Ls);l<t.near||l>t.far||e.push({distance:l,point:Ls.clone(),uv:rn.getInterpolation(Ls,Sr,Is,wr,Sc,Ga,wc,new et),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Tr(s,t,e,n,i,r){Qi.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(Ds.x=r*Qi.x-i*Qi.y,Ds.y=i*Qi.x+r*Qi.y):Ds.copy(Qi),s.copy(t),s.x+=Ds.x,s.y+=Ds.y,s.applyMatrix4(Gh)}class gg extends ze{constructor(t=null,e=1,n=1,i,r,a,o,l,h=Qe,c=Qe,u,d){super(null,a,o,l,h,c,i,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Tc extends Ce{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ts=new Qt,Ec=new Qt,Er=[],Ac=new Di,vg=new Qt,Us=new kt,Ns=new Ii;class Kr extends kt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Tc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,vg)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Di),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ts),Ac.copy(t.boundingBox).applyMatrix4(ts),this.boundingBox.union(Ac)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ii),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ts),Ns.copy(t.boundingSphere).applyMatrix4(ts),this.boundingSphere.union(Ns)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Us.geometry=this.geometry,Us.material=this.material,Us.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ns.copy(this.boundingSphere),Ns.applyMatrix4(n),t.ray.intersectsSphere(Ns)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ts),Ec.multiplyMatrices(n,ts),Us.matrixWorld=Ec,Us.raycast(t,Er);for(let a=0,o=Er.length;a<o;a++){const l=Er[a];l.instanceId=r,l.object=this,e.push(l)}Er.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Tc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new gg(new Float32Array(i*this.count),i,this.count,Qo,wn));const r=this.morphTexture.source.data.data;let a=0;for(let h=0;h<n.length;h++)a+=n[h];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class xg extends Ui{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new yt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Rc=new Qt,Vo=new Ch,Ar=new Ii,Rr=new D;class _g extends ge{constructor(t=new ye,e=new xg){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere),Ar.applyMatrix4(i),Ar.radius+=r,t.ray.intersectsSphere(Ar)===!1)return;Rc.copy(i).invert(),Vo.copy(t.ray).applyMatrix4(Rc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,h=n.index,u=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let g=d,v=f;g<v;g++){const m=h.getX(g);Rr.fromBufferAttribute(u,m),Cc(Rr,m,l,i,t,e,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,v=f;g<v;g++)Rr.fromBufferAttribute(u,g),Cc(Rr,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Cc(s,t,e,n,i,r,a){const o=Vo.distanceSqToPoint(s);if(o<e){const l=new D;Vo.closestPointToPoint(s,l),l.applyMatrix4(n);const h=i.ray.origin.distanceTo(l);if(h<i.near||h>i.far)return;r.push({distance:h,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class yg extends ze{constructor(t,e,n,i,r,a,o,l,h){super(t,e,n,i,r,a,o,l,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class En{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,h;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),h=n[i]-a,h<0)o=i+1;else if(h>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const c=n[i],d=n[i+1]-c,f=(a-c)/d;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new et:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new D,i=[],r=[],a=[],o=new D,l=new Qt;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new D)}r[0]=new D,a[0]=new D;let h=Number.MAX_VALUE;const c=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);c<=h&&(h=c,n.set(1,0,0)),u<=h&&(h=u,n.set(0,1,0)),d<=h&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ue(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Ue(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ol extends En{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new et){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),h=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const c=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=h-this.aY;l=d*c-f*u+this.aX,h=d*u+f*c+this.aY}return n.set(l,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Mg extends ol{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ll(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,h){i(a,o,h*(o-r),h*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,h,c,u){let d=(a-r)/h-(o-r)/(h+c)+(o-a)/c,f=(o-a)/c-(l-a)/(c+u)+(l-o)/u;d*=c,f*=c,i(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const Cr=new D,Wa=new ll,Xa=new ll,Ya=new ll;class bg extends En{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new D){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let h,c;this.closed||o>0?h=i[(o-1)%r]:(Cr.subVectors(i[0],i[1]).add(i[0]),h=Cr);const u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?c=i[(o+2)%r]:(Cr.subVectors(i[r-1],i[r-2]).add(i[r-1]),c=Cr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(h.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(c),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Wa.initNonuniformCatmullRom(h.x,u.x,d.x,c.x,g,v,m),Xa.initNonuniformCatmullRom(h.y,u.y,d.y,c.y,g,v,m),Ya.initNonuniformCatmullRom(h.z,u.z,d.z,c.z,g,v,m)}else this.curveType==="catmullrom"&&(Wa.initCatmullRom(h.x,u.x,d.x,c.x,this.tension),Xa.initCatmullRom(h.y,u.y,d.y,c.y,this.tension),Ya.initCatmullRom(h.z,u.z,d.z,c.z,this.tension));return n.set(Wa.calc(l),Xa.calc(l),Ya.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new D().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Pc(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function Sg(s,t){const e=1-s;return e*e*t}function wg(s,t){return 2*(1-s)*s*t}function Tg(s,t){return s*s*t}function Hs(s,t,e,n){return Sg(s,t)+wg(s,e)+Tg(s,n)}function Eg(s,t){const e=1-s;return e*e*e*t}function Ag(s,t){const e=1-s;return 3*e*e*s*t}function Rg(s,t){return 3*(1-s)*s*s*t}function Cg(s,t){return s*s*s*t}function Vs(s,t,e,n,i){return Eg(s,t)+Ag(s,e)+Rg(s,n)+Cg(s,i)}class Wh extends En{constructor(t=new et,e=new et,n=new et,i=new et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new et){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Vs(t,i.x,r.x,a.x,o.x),Vs(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Pg extends En{constructor(t=new D,e=new D,n=new D,i=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new D){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Vs(t,i.x,r.x,a.x,o.x),Vs(t,i.y,r.y,a.y,o.y),Vs(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Xh extends En{constructor(t=new et,e=new et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new et){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Lg extends En{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Yh extends En{constructor(t=new et,e=new et,n=new et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new et){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Hs(t,i.x,r.x,a.x),Hs(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Dg extends En{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(Hs(t,i.x,r.x,a.x),Hs(t,i.y,r.y,a.y),Hs(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qh extends En{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new et){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],h=i[a],c=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Pc(o,l.x,h.x,c.x,u.x),Pc(o,l.y,h.y,c.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new et().fromArray(i))}return this}}var Go=Object.freeze({__proto__:null,ArcCurve:Mg,CatmullRomCurve3:bg,CubicBezierCurve:Wh,CubicBezierCurve3:Pg,EllipseCurve:ol,LineCurve:Xh,LineCurve3:Lg,QuadraticBezierCurve:Yh,QuadraticBezierCurve3:Dg,SplineCurve:qh});class Ig extends En{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Go[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),h=l===0?0:1-a/l;return o.getPointAt(h,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let h=0;h<l.length;h++){const c=l[h];n&&n.equals(c)||(e.push(c),n=c)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Go[i.type]().fromJSON(i))}return this}}class Lc extends Ig{constructor(t){super(),this.type="Path",this.currentPoint=new et,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Xh(this.currentPoint.clone(),new et(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Yh(this.currentPoint.clone(),new et(t,e),new et(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new Wh(this.currentPoint.clone(),new et(t,e),new et(n,i),new et(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new qh(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const h=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(t+h,e+c,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const h=new ol(t,e,n,i,r,a,o,l);if(this.curves.length>0){const u=h.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(h);const c=h.getPoint(1);return this.currentPoint.copy(c),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class cl extends ye{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],h=new D,c=new et;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;h.x=t*Math.cos(f),h.y=t*Math.sin(f),a.push(h.x,h.y,h.z),o.push(0,0,1),c.x=(a[d]/t+1)/2,c.y=(a[d+1]/t+1)/2,l.push(c.x,c.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Kt(a,3)),this.setAttribute("normal",new Kt(o,3)),this.setAttribute("uv",new Kt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class mn extends ye{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const h=this;i=Math.floor(i),r=Math.floor(r);const c=[],u=[],d=[],f=[];let g=0;const v=[],m=n/2;let p=0;_(),a===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(c),this.setAttribute("position",new Kt(u,3)),this.setAttribute("normal",new Kt(d,3)),this.setAttribute("uv",new Kt(f,2));function _(){const x=new D,C=new D;let A=0;const R=(e-t)/n;for(let I=0;I<=r;I++){const w=[],M=I/r,L=M*(e-t)+t;for(let O=0;O<=i;O++){const z=O/i,G=z*l+o,Y=Math.sin(G),W=Math.cos(G);C.x=L*Y,C.y=-M*n+m,C.z=L*W,u.push(C.x,C.y,C.z),x.set(Y,R,W).normalize(),d.push(x.x,x.y,x.z),f.push(z,1-M),w.push(g++)}v.push(w)}for(let I=0;I<i;I++)for(let w=0;w<r;w++){const M=v[w][I],L=v[w+1][I],O=v[w+1][I+1],z=v[w][I+1];(t>0||w!==0)&&(c.push(M,L,z),A+=3),(e>0||w!==r-1)&&(c.push(L,O,z),A+=3)}h.addGroup(p,A,0),p+=A}function b(x){const C=g,A=new et,R=new D;let I=0;const w=x===!0?t:e,M=x===!0?1:-1;for(let O=1;O<=i;O++)u.push(0,m*M,0),d.push(0,M,0),f.push(.5,.5),g++;const L=g;for(let O=0;O<=i;O++){const G=O/i*l+o,Y=Math.cos(G),W=Math.sin(G);R.x=w*W,R.y=m*M,R.z=w*Y,u.push(R.x,R.y,R.z),d.push(0,M,0),A.x=Y*.5+.5,A.y=W*.5*M+.5,f.push(A.x,A.y),g++}for(let O=0;O<i;O++){const z=C+O,G=L+O;x===!0?c.push(G,G+1,z):c.push(G+1,G,z),I+=3}h.addGroup(p,I,x===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new mn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class hl extends mn{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new hl(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ul extends ye{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],a=[];o(i),h(n),c(),this.setAttribute("position",new Kt(r,3)),this.setAttribute("normal",new Kt(r.slice(),3)),this.setAttribute("uv",new Kt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(_){const b=new D,x=new D,C=new D;for(let A=0;A<e.length;A+=3)f(e[A+0],b),f(e[A+1],x),f(e[A+2],C),l(b,x,C,_)}function l(_,b,x,C){const A=C+1,R=[];for(let I=0;I<=A;I++){R[I]=[];const w=_.clone().lerp(x,I/A),M=b.clone().lerp(x,I/A),L=A-I;for(let O=0;O<=L;O++)O===0&&I===A?R[I][O]=w:R[I][O]=w.clone().lerp(M,O/L)}for(let I=0;I<A;I++)for(let w=0;w<2*(A-I)-1;w++){const M=Math.floor(w/2);w%2===0?(d(R[I][M+1]),d(R[I+1][M]),d(R[I][M])):(d(R[I][M+1]),d(R[I+1][M+1]),d(R[I+1][M]))}}function h(_){const b=new D;for(let x=0;x<r.length;x+=3)b.x=r[x+0],b.y=r[x+1],b.z=r[x+2],b.normalize().multiplyScalar(_),r[x+0]=b.x,r[x+1]=b.y,r[x+2]=b.z}function c(){const _=new D;for(let b=0;b<r.length;b+=3){_.x=r[b+0],_.y=r[b+1],_.z=r[b+2];const x=m(_)/2/Math.PI+.5,C=p(_)/Math.PI+.5;a.push(x,1-C)}g(),u()}function u(){for(let _=0;_<a.length;_+=6){const b=a[_+0],x=a[_+2],C=a[_+4],A=Math.max(b,x,C),R=Math.min(b,x,C);A>.9&&R<.1&&(b<.2&&(a[_+0]+=1),x<.2&&(a[_+2]+=1),C<.2&&(a[_+4]+=1))}}function d(_){r.push(_.x,_.y,_.z)}function f(_,b){const x=_*3;b.x=t[x+0],b.y=t[x+1],b.z=t[x+2]}function g(){const _=new D,b=new D,x=new D,C=new D,A=new et,R=new et,I=new et;for(let w=0,M=0;w<r.length;w+=9,M+=6){_.set(r[w+0],r[w+1],r[w+2]),b.set(r[w+3],r[w+4],r[w+5]),x.set(r[w+6],r[w+7],r[w+8]),A.set(a[M+0],a[M+1]),R.set(a[M+2],a[M+3]),I.set(a[M+4],a[M+5]),C.copy(_).add(b).add(x).divideScalar(3);const L=m(C);v(A,M+0,_,L),v(R,M+2,b,L),v(I,M+4,x,L)}}function v(_,b,x,C){C<0&&_.x===1&&(a[b]=_.x-1),x.x===0&&x.z===0&&(a[b]=C/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function p(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ul(t.vertices,t.indices,t.radius,t.details)}}class $h extends Lc{constructor(t){super(t),this.uuid=Bn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new Lc().fromJSON(i))}return this}}const Ug={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Zh(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,h,c,u,d,f;if(n&&(r=Og(s,t,r,e)),s.length>80*e){o=h=s[0],l=c=s[1];for(let g=e;g<i;g+=e)u=s[g],d=s[g+1],u<o&&(o=u),d<l&&(l=d),u>h&&(h=u),d>c&&(c=d);f=Math.max(h-o,c-l),f=f!==0?32767/f:0}return $s(r,a,e,o,l,f,0),a}};function Zh(s,t,e,n,i){let r,a;if(i===jg(s,t,e,n)>0)for(r=t;r<e;r+=n)a=Dc(r,s[r],s[r+1],a);else for(r=e-n;r>=t;r-=n)a=Dc(r,s[r],s[r+1],a);return a&&la(a,a.next)&&(js(a),a=a.next),a}function Pi(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(la(e,e.next)||de(e.prev,e,e.next)===0)){if(js(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function $s(s,t,e,n,i,r,a){if(!s)return;!a&&r&&Wg(s,n,i,r);let o=s,l,h;for(;s.prev!==s.next;){if(l=s.prev,h=s.next,r?kg(s,n,i,r):Ng(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(h.i/e|0),js(s),s=h.next,o=h.next;continue}if(s=h,s===o){a?a===1?(s=Fg(Pi(s),t,e),$s(s,t,e,n,i,r,2)):a===2&&zg(s,t,e,n,i,r):$s(Pi(s),t,e,n,i,r,1);break}}}function Ng(s){const t=s.prev,e=s,n=s.next;if(de(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,h=n.y,c=i<r?i<a?i:a:r<a?r:a,u=o<l?o<h?o:h:l<h?l:h,d=i>r?i>a?i:a:r>a?r:a,f=o>l?o>h?o:h:l>h?l:h;let g=n.next;for(;g!==t;){if(g.x>=c&&g.x<=d&&g.y>=u&&g.y<=f&&os(i,o,r,l,a,h,g.x,g.y)&&de(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function kg(s,t,e,n){const i=s.prev,r=s,a=s.next;if(de(i,r,a)>=0)return!1;const o=i.x,l=r.x,h=a.x,c=i.y,u=r.y,d=a.y,f=o<l?o<h?o:h:l<h?l:h,g=c<u?c<d?c:d:u<d?u:d,v=o>l?o>h?o:h:l>h?l:h,m=c>u?c>d?c:d:u>d?u:d,p=Wo(f,g,t,e,n),_=Wo(v,m,t,e,n);let b=s.prevZ,x=s.nextZ;for(;b&&b.z>=p&&x&&x.z<=_;){if(b.x>=f&&b.x<=v&&b.y>=g&&b.y<=m&&b!==i&&b!==a&&os(o,c,l,u,h,d,b.x,b.y)&&de(b.prev,b,b.next)>=0||(b=b.prevZ,x.x>=f&&x.x<=v&&x.y>=g&&x.y<=m&&x!==i&&x!==a&&os(o,c,l,u,h,d,x.x,x.y)&&de(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;b&&b.z>=p;){if(b.x>=f&&b.x<=v&&b.y>=g&&b.y<=m&&b!==i&&b!==a&&os(o,c,l,u,h,d,b.x,b.y)&&de(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;x&&x.z<=_;){if(x.x>=f&&x.x<=v&&x.y>=g&&x.y<=m&&x!==i&&x!==a&&os(o,c,l,u,h,d,x.x,x.y)&&de(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Fg(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!la(i,r)&&jh(i,n,n.next,r)&&Zs(i,r)&&Zs(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),js(n),js(n.next),n=s=r),n=n.next}while(n!==s);return Pi(n)}function zg(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&qg(a,o)){let l=Kh(a,o);a=Pi(a,a.next),l=Pi(l,l.next),$s(a,t,e,n,i,r,0),$s(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Og(s,t,e,n){const i=[];let r,a,o,l,h;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,h=Zh(s,o,l,n,!1),h===h.next&&(h.steiner=!0),i.push(Yg(h));for(i.sort(Bg),r=0;r<i.length;r++)e=Hg(i[r],e);return e}function Bg(s,t){return s.x-t.x}function Hg(s,t){const e=Vg(s,t);if(!e)return t;const n=Kh(e,s);return Pi(n,n.next),Pi(e,e.next)}function Vg(s,t){let e=t,n=-1/0,i;const r=s.x,a=s.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const d=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===r))return i}e=e.next}while(e!==t);if(!i)return null;const o=i,l=i.x,h=i.y;let c=1/0,u;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&os(a<h?r:n,a,l,h,a<h?n:r,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(r-e.x),Zs(e,s)&&(u<c||u===c&&(e.x>i.x||e.x===i.x&&Gg(i,e)))&&(i=e,c=u)),e=e.next;while(e!==o);return i}function Gg(s,t){return de(s.prev,s,t.prev)<0&&de(t.next,s,s.next)<0}function Wg(s,t,e,n){let i=s;do i.z===0&&(i.z=Wo(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Xg(i)}function Xg(s){let t,e,n,i,r,a,o,l,h=1;do{for(e=s,s=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<h&&(o++,n=n.nextZ,!!n);t++);for(l=h;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,o--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,h*=2}while(a>1);return s}function Wo(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Yg(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function os(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function qg(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!$g(s,t)&&(Zs(s,t)&&Zs(t,s)&&Zg(s,t)&&(de(s.prev,s,t.prev)||de(s,t.prev,t))||la(s,t)&&de(s.prev,s,s.next)>0&&de(t.prev,t,t.next)>0)}function de(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function la(s,t){return s.x===t.x&&s.y===t.y}function jh(s,t,e,n){const i=Lr(de(s,t,e)),r=Lr(de(s,t,n)),a=Lr(de(e,n,s)),o=Lr(de(e,n,t));return!!(i!==r&&a!==o||i===0&&Pr(s,e,t)||r===0&&Pr(s,n,t)||a===0&&Pr(e,s,n)||o===0&&Pr(e,t,n))}function Pr(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Lr(s){return s>0?1:s<0?-1:0}function $g(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&jh(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Zs(s,t){return de(s.prev,s,s.next)<0?de(s,t,s.next)>=0&&de(s,s.prev,t)>=0:de(s,t,s.prev)<0||de(s,s.next,t)<0}function Zg(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Kh(s,t){const e=new Xo(s.i,s.x,s.y),n=new Xo(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Dc(s,t,e,n){const i=new Xo(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function js(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Xo(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function jg(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class Gs{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Gs.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];Ic(t),Uc(n,t);let a=t.length;e.forEach(Ic);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Uc(n,e[l]);const o=Ug.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Ic(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Uc(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class dl extends ye{constructor(t=new $h([new et(.5,.5),new et(-.5,.5),new et(-.5,-.5),new et(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){const h=t[o];a(h)}this.setAttribute("position",new Kt(i,3)),this.setAttribute("uv",new Kt(r,2)),this.computeVertexNormals();function a(o){const l=[],h=e.curveSegments!==void 0?e.curveSegments:12,c=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,_=e.UVGenerator!==void 0?e.UVGenerator:Kg;let b,x=!1,C,A,R,I;p&&(b=p.getSpacedPoints(c),x=!0,d=!1,C=p.computeFrenetFrames(c,!1),A=new D,R=new D,I=new D),d||(m=0,f=0,g=0,v=0);const w=o.extractPoints(h);let M=w.shape;const L=w.holes;if(!Gs.isClockWise(M)){M=M.reverse();for(let J=0,st=L.length;J<st;J++){const P=L[J];Gs.isClockWise(P)&&(L[J]=P.reverse())}}const z=Gs.triangulateShape(M,L),G=M;for(let J=0,st=L.length;J<st;J++){const P=L[J];M=M.concat(P)}function Y(J,st,P){return st||console.error("THREE.ExtrudeGeometry: vec does not exist"),J.clone().addScaledVector(st,P)}const W=M.length,K=z.length;function V(J,st,P){let Ct,nt,_t;const lt=J.x-st.x,Dt=J.y-st.y,vt=P.x-J.x,E=P.y-J.y,S=lt*lt+Dt*Dt,F=lt*E-Dt*vt;if(Math.abs(F)>Number.EPSILON){const q=Math.sqrt(S),Q=Math.sqrt(vt*vt+E*E),$=st.x-Dt/q,Tt=st.y+lt/q,ut=P.x-E/Q,xt=P.y+vt/Q,Yt=((ut-$)*E-(xt-Tt)*vt)/(lt*E-Dt*vt);Ct=$+lt*Yt-J.x,nt=Tt+Dt*Yt-J.y;const it=Ct*Ct+nt*nt;if(it<=2)return new et(Ct,nt);_t=Math.sqrt(it/2)}else{let q=!1;lt>Number.EPSILON?vt>Number.EPSILON&&(q=!0):lt<-Number.EPSILON?vt<-Number.EPSILON&&(q=!0):Math.sign(Dt)===Math.sign(E)&&(q=!0),q?(Ct=-Dt,nt=lt,_t=Math.sqrt(S)):(Ct=lt,nt=Dt,_t=Math.sqrt(S/2))}return new et(Ct/_t,nt/_t)}const ct=[];for(let J=0,st=G.length,P=st-1,Ct=J+1;J<st;J++,P++,Ct++)P===st&&(P=0),Ct===st&&(Ct=0),ct[J]=V(G[J],G[P],G[Ct]);const gt=[];let St,Ot=ct.concat();for(let J=0,st=L.length;J<st;J++){const P=L[J];St=[];for(let Ct=0,nt=P.length,_t=nt-1,lt=Ct+1;Ct<nt;Ct++,_t++,lt++)_t===nt&&(_t=0),lt===nt&&(lt=0),St[Ct]=V(P[Ct],P[_t],P[lt]);gt.push(St),Ot=Ot.concat(St)}for(let J=0;J<m;J++){const st=J/m,P=f*Math.cos(st*Math.PI/2),Ct=g*Math.sin(st*Math.PI/2)+v;for(let nt=0,_t=G.length;nt<_t;nt++){const lt=Y(G[nt],ct[nt],Ct);ot(lt.x,lt.y,-P)}for(let nt=0,_t=L.length;nt<_t;nt++){const lt=L[nt];St=gt[nt];for(let Dt=0,vt=lt.length;Dt<vt;Dt++){const E=Y(lt[Dt],St[Dt],Ct);ot(E.x,E.y,-P)}}}const te=g+v;for(let J=0;J<W;J++){const st=d?Y(M[J],Ot[J],te):M[J];x?(R.copy(C.normals[0]).multiplyScalar(st.x),A.copy(C.binormals[0]).multiplyScalar(st.y),I.copy(b[0]).add(R).add(A),ot(I.x,I.y,I.z)):ot(st.x,st.y,0)}for(let J=1;J<=c;J++)for(let st=0;st<W;st++){const P=d?Y(M[st],Ot[st],te):M[st];x?(R.copy(C.normals[J]).multiplyScalar(P.x),A.copy(C.binormals[J]).multiplyScalar(P.y),I.copy(b[J]).add(R).add(A),ot(I.x,I.y,I.z)):ot(P.x,P.y,u/c*J)}for(let J=m-1;J>=0;J--){const st=J/m,P=f*Math.cos(st*Math.PI/2),Ct=g*Math.sin(st*Math.PI/2)+v;for(let nt=0,_t=G.length;nt<_t;nt++){const lt=Y(G[nt],ct[nt],Ct);ot(lt.x,lt.y,u+P)}for(let nt=0,_t=L.length;nt<_t;nt++){const lt=L[nt];St=gt[nt];for(let Dt=0,vt=lt.length;Dt<vt;Dt++){const E=Y(lt[Dt],St[Dt],Ct);x?ot(E.x,E.y+b[c-1].y,b[c-1].x+P):ot(E.x,E.y,u+P)}}}Z(),rt();function Z(){const J=i.length/3;if(d){let st=0,P=W*st;for(let Ct=0;Ct<K;Ct++){const nt=z[Ct];Lt(nt[2]+P,nt[1]+P,nt[0]+P)}st=c+m*2,P=W*st;for(let Ct=0;Ct<K;Ct++){const nt=z[Ct];Lt(nt[0]+P,nt[1]+P,nt[2]+P)}}else{for(let st=0;st<K;st++){const P=z[st];Lt(P[2],P[1],P[0])}for(let st=0;st<K;st++){const P=z[st];Lt(P[0]+W*c,P[1]+W*c,P[2]+W*c)}}n.addGroup(J,i.length/3-J,0)}function rt(){const J=i.length/3;let st=0;wt(G,st),st+=G.length;for(let P=0,Ct=L.length;P<Ct;P++){const nt=L[P];wt(nt,st),st+=nt.length}n.addGroup(J,i.length/3-J,1)}function wt(J,st){let P=J.length;for(;--P>=0;){const Ct=P;let nt=P-1;nt<0&&(nt=J.length-1);for(let _t=0,lt=c+m*2;_t<lt;_t++){const Dt=W*_t,vt=W*(_t+1),E=st+Ct+Dt,S=st+nt+Dt,F=st+nt+vt,q=st+Ct+vt;Ft(E,S,F,q)}}}function ot(J,st,P){l.push(J),l.push(st),l.push(P)}function Lt(J,st,P){Ut(J),Ut(st),Ut(P);const Ct=i.length/3,nt=_.generateTopUV(n,i,Ct-3,Ct-2,Ct-1);Zt(nt[0]),Zt(nt[1]),Zt(nt[2])}function Ft(J,st,P,Ct){Ut(J),Ut(st),Ut(Ct),Ut(st),Ut(P),Ut(Ct);const nt=i.length/3,_t=_.generateSideWallUV(n,i,nt-6,nt-3,nt-2,nt-1);Zt(_t[0]),Zt(_t[1]),Zt(_t[3]),Zt(_t[1]),Zt(_t[2]),Zt(_t[3])}function Ut(J){i.push(l[J*3+0]),i.push(l[J*3+1]),i.push(l[J*3+2])}function Zt(J){r.push(J.x),r.push(J.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Jg(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Go[i.type]().fromJSON(i)),new dl(n,t.options)}}const Kg={generateTopUV:function(s,t,e,n,i){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],h=t[i*3],c=t[i*3+1];return[new et(r,a),new et(o,l),new et(h,c)]},generateSideWallUV:function(s,t,e,n,i,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],h=t[n*3],c=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],g=t[i*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(o-c)<Math.abs(a-h)?[new et(a,1-l),new et(h,1-u),new et(d,1-g),new et(v,1-p)]:[new et(o,1-l),new et(c,1-u),new et(f,1-g),new et(m,1-p)]}};function Jg(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Jr extends ul{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Jr(t.radius,t.detail)}}class Ks extends ye{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],h=[],c=[];let u=t;const d=(e-t)/i,f=new D,g=new et;for(let v=0;v<=i;v++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),h.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,c.push(g.x,g.y)}u+=d}for(let v=0;v<i;v++){const m=v*(n+1);for(let p=0;p<n;p++){const _=p+m,b=_,x=_+n+1,C=_+n+2,A=_+1;o.push(b,x,A),o.push(x,C,A)}}this.setIndex(o),this.setAttribute("position",new Kt(l,3)),this.setAttribute("normal",new Kt(h,3)),this.setAttribute("uv",new Kt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ks(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ui extends ye{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let h=0;const c=[],u=new D,d=new D,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const _=[],b=p/n;let x=0;p===0&&a===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let C=0;C<=e;C++){const A=C/e;u.x=-t*Math.cos(i+A*r)*Math.sin(a+b*o),u.y=t*Math.cos(a+b*o),u.z=t*Math.sin(i+A*r)*Math.sin(a+b*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(A+x,1-b),_.push(h++)}c.push(_)}for(let p=0;p<n;p++)for(let _=0;_<e;_++){const b=c[p][_+1],x=c[p][_],C=c[p+1][_],A=c[p+1][_+1];(p!==0||a>0)&&f.push(b,x,A),(p!==n-1||l<Math.PI)&&f.push(x,C,A)}this.setIndex(f),this.setAttribute("position",new Kt(g,3)),this.setAttribute("normal",new Kt(v,3)),this.setAttribute("uv",new Kt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ui(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class _s extends ye{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],h=[],c=new D,u=new D,d=new D;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const v=g/i*r,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),c.x=t*Math.cos(v),c.y=t*Math.sin(v),d.subVectors(u,c).normalize(),l.push(d.x,d.y,d.z),h.push(g/i),h.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const v=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,_=(i+1)*f+g;a.push(v,m,_),a.push(m,p,_)}this.setIndex(a),this.setAttribute("position",new Kt(o,3)),this.setAttribute("normal",new Kt(l,3)),this.setAttribute("uv",new Kt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _s(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Qg extends me{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class us extends Ui{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wh,this.normalScale=new et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Tn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ca extends ge{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new yt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Jh extends ca{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.groundColor=new yt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const qa=new Qt,Nc=new D,kc=new D;class fl{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new et(512,512),this.map=null,this.mapPass=null,this.matrix=new Qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new il,this._frameExtents=new et(1,1),this._viewportCount=1,this._viewports=[new ae(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Nc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Nc),kc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(kc),e.updateMatrixWorld(),qa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(qa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class tv extends fl{constructor(){super(new Ne(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=qr*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class ev extends ca{constructor(t,e,n=0,i=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.target=new ge,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new tv}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Fc=new Qt,ks=new D,$a=new D;class nv extends fl{constructor(){super(new Ne(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new et(4,2),this._viewportCount=6,this._viewports=[new ae(2,1,1,1),new ae(0,1,1,1),new ae(3,1,1,1),new ae(1,1,1,1),new ae(3,0,1,1),new ae(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ks.setFromMatrixPosition(t.matrixWorld),n.position.copy(ks),$a.copy(n.position),$a.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt($a),n.updateMatrixWorld(),i.makeTranslation(-ks.x,-ks.y,-ks.z),Fc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fc)}}class Qr extends ca{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new nv}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class iv extends fl{constructor(){super(new sl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class zc extends ca{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.target=new ge,this.shadow=new iv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class sv{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Oc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Oc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Oc(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$o}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$o);const xn=s=>440*Math.pow(2,(s-69)/12),rv=[{root:38,tones:[62,65,69]},{root:34,tones:[58,62,65]},{root:41,tones:[60,65,69]},{root:36,tones:[60,64,67]}];class av{constructor(){y(this,"ctx",null);y(this,"master");y(this,"sfx");y(this,"music");y(this,"noise");y(this,"engine",null);y(this,"hum",null);y(this,"scheduler",null);y(this,"nextTime",0);y(this,"step",0);y(this,"masterVol",.8);y(this,"sfxVol",.85);y(this,"musicVol",.45);y(this,"muted",!1);y(this,"intensity",.4);y(this,"lastHitTick",0);y(this,"voices",0)}get ready(){return!!this.ctx&&this.ctx.state==="running"}unlock(){if(!this.ctx){const t=window.AudioContext??window.webkitAudioContext;if(!t)return;try{this.ctx=new t}catch{return}this.build()}this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{})}build(){const t=this.ctx,e=t.createDynamicsCompressor();e.threshold.value=-12,e.ratio.value=5,this.master=t.createGain(),this.master.connect(e).connect(t.destination),this.sfx=t.createGain(),this.music=t.createGain(),this.sfx.connect(this.master),this.music.connect(this.master),this.noise=t.createBuffer(1,t.sampleRate*2,t.sampleRate);const n=this.noise.getChannelData(0);for(let i=0;i<n.length;i++)n[i]=Math.random()*2-1;this.applyVolumes(),this.startMusic()}setVolumes(t,e,n,i){this.masterVol=t,this.sfxVol=e,this.musicVol=n,this.muted=i,this.applyVolumes()}applyVolumes(){if(!this.ctx)return;const t=this.ctx.currentTime;this.master.gain.setTargetAtTime(this.muted?0:this.masterVol,t,.05),this.sfx.gain.setTargetAtTime(this.sfxVol,t,.05),this.music.gain.setTargetAtTime(this.musicVol*.5,t,.2)}suspend(t){this.ctx&&(t?this.ctx.suspend().catch(()=>{}):this.ctx.resume().catch(()=>{}))}setListener(t,e,n,i,r,a){if(!this.ctx)return;const o=this.ctx.listener;if(o.positionX){const l=this.ctx.currentTime;o.positionX.setTargetAtTime(t,l,.02),o.positionY.setTargetAtTime(e,l,.02),o.positionZ.setTargetAtTime(n,l,.02),o.forwardX.setTargetAtTime(i,l,.02),o.forwardY.setTargetAtTime(r,l,.02),o.forwardZ.setTargetAtTime(a,l,.02),o.upX.value=0,o.upY.value=1,o.upZ.value=0}else o.setPosition(t,e,n),o.setOrientation(i,r,a,0,1,0)}setIntensity(t){this.intensity=Math.max(0,Math.min(1,t))}out(t,e){if(!this.ctx||this.ctx.state!=="running"||this.voices>48)return null;const n=this.ctx,i=n.createGain();if(i.gain.value=e,t){const r=n.createPanner();r.panningModel="equalpower",r.distanceModel="inverse",r.refDistance=9,r.maxDistance=220,r.rolloffFactor=1.1,r.positionX?(r.positionX.value=t.x,r.positionY.value=t.y,r.positionZ.value=t.z):r.setPosition(t.x,t.y,t.z),i.connect(r).connect(this.sfx)}else i.connect(this.sfx);return this.voices++,window.setTimeout(()=>{this.voices--,i.disconnect()},2600),i}tone(t,e,n,i,r,a,o,l=.005){const h=this.ctx,c=h.createOscillator(),u=h.createGain();c.type=e,c.frequency.setValueAtTime(n,r),c.frequency.exponentialRampToValueAtTime(Math.max(20,i),r+a),u.gain.setValueAtTime(1e-4,r),u.gain.exponentialRampToValueAtTime(o,r+l),u.gain.exponentialRampToValueAtTime(1e-4,r+a),c.connect(u).connect(t),c.start(r),c.stop(r+a+.05)}burst(t,e,n,i,r,a,o,l=1){const h=this.ctx,c=h.createBufferSource();c.buffer=this.noise,c.playbackRate.value=.8+Math.random()*.4;const u=h.createBiquadFilter();u.type=e,u.Q.value=l,u.frequency.setValueAtTime(n,r),u.frequency.exponentialRampToValueAtTime(Math.max(30,i),r+a);const d=h.createGain();d.gain.setValueAtTime(o,r),d.gain.exponentialRampToValueAtTime(1e-4,r+a),c.connect(u).connect(d).connect(t),c.start(r,Math.random()*1.5),c.stop(r+a+.05)}fire(t,e,n){const i=this.out(n?null:e,n?.9:1);if(!i)return;const r=this.ctx.currentTime;switch(t){case"plasma":this.tone(i,"sawtooth",520,90,r,.22,.35),this.tone(i,"sine",160,50,r,.25,.5),this.burst(i,"lowpass",3e3,300,r,.18,.4);break;case"rail":this.tone(i,"square",1800,120,r,.4,.22),this.tone(i,"sine",90,30,r,.5,.7),this.burst(i,"highpass",6e3,1200,r,.35,.5);break;case"volt":this.tone(i,"square",900+Math.random()*300,420,r,.05,.13),this.burst(i,"bandpass",4e3,2500,r,.05,.18,4);break;case"nova":this.burst(i,"bandpass",900,200,r,.45,.5,1.2),this.tone(i,"triangle",240,80,r,.3,.3);break}}charge(t,e){const n=this.out(t?null:e,.6);if(!n)return;const i=this.ctx.currentTime;this.tone(n,"sine",300,2200,i,.36,.2,.3)}impact(t,e,n){if(t==="nova")return;const i=this.out(e,t==="volt"?.4:.8);if(!i)return;const r=this.ctx.currentTime;n?(this.tone(i,"square",340,140,r,.12,.2),this.burst(i,"bandpass",2400,900,r,.14,.45,2)):this.burst(i,"lowpass",2200,200,r,.2,.4)}explosion(t,e){const n=this.out(t,e?1.4:1);if(!n)return;const i=this.ctx.currentTime;this.burst(n,"lowpass",e?1600:2400,60,i,e?1.6:.8,1),this.tone(n,"sine",e?90:120,28,i,e?1.1:.6,.9)}hitConfirm(t){const e=this.out(null,.6);if(!e)return;const n=this.ctx.currentTime;if(t){this.tone(e,"triangle",880,880,n,.09,.4),this.tone(e,"triangle",1320,1320,n+.08,.16,.4);return}n-this.lastHitTick<.06||(this.lastHitTick=n,this.tone(e,"square",1500,1300,n,.04,.16))}damageTaken(t,e){const n=this.out(null,Math.min(1,.3+t/60));if(!n)return;const i=this.ctx.currentTime;this.tone(n,"sine",140,50,i,.25,.8),this.burst(n,"lowpass",900,100,i,.2,.6),e&&this.tone(n,"square",620,620,i+.05,.12,.08)}pickup(t){const e=this.out(null,.6);if(!e)return;const n=this.ctx.currentTime,i=t==="repair"?60:t==="overdrive"?64:67;[0,4,7,12].forEach((r,a)=>this.tone(e,"triangle",xn(i+r+12),xn(i+r+12),n+a*.05,.16,.3))}ability(t,e,n){const i=this.out(n?null:e,.9);if(!i)return;const r=this.ctx.currentTime;t==="dash"?(this.burst(i,"bandpass",600,3e3,r,.5,.6,1.5),this.tone(i,"sawtooth",120,400,r,.4,.2)):t==="aegis"?(this.tone(i,"sine",220,660,r,.5,.4,.05),this.tone(i,"triangle",330,990,r+.05,.5,.25,.05)):(this.burst(i,"lowpass",1200,40,r,1.2,1),this.tone(i,"sine",70,25,r,.9,1))}reload(t){const e=this.out(null,.4);if(!e)return;const n=this.ctx.currentTime;t?(this.burst(e,"bandpass",3e3,2e3,n,.05,.6,6),this.burst(e,"bandpass",2e3,1500,n+.08,.06,.6,6)):this.burst(e,"bandpass",1500,900,n,.08,.4,4)}overheat(){const t=this.out(null,.5);if(!t)return;const e=this.ctx.currentTime;this.burst(t,"highpass",3e3,6e3,e,.7,.5),this.tone(t,"square",300,150,e,.3,.12)}ui(t){const e=this.out(null,.35);if(!e)return;const n=this.ctx.currentTime;t==="hover"?this.tone(e,"sine",1400,1400,n,.03,.08):t==="click"?this.tone(e,"triangle",900,700,n,.06,.25):t==="confirm"?(this.tone(e,"triangle",660,660,n,.08,.3),this.tone(e,"triangle",990,990,n+.07,.12,.3)):t==="back"?this.tone(e,"triangle",600,400,n,.1,.25):(this.tone(e,"square",200,160,n,.12,.15),this.tone(e,"square",200,160,n+.13,.12,.15))}countdown(t){const e=this.out(null,.6);if(!e)return;const n=this.ctx.currentTime;t>0?this.tone(e,"square",660,660,n,.14,.18):(this.tone(e,"sawtooth",220,220,n,.7,.25,.02),this.tone(e,"sawtooth",330,330,n,.7,.2,.02),this.tone(e,"square",1320,1320,n,.25,.12))}matchEnd(t){const e=this.out(null,.7);if(!e)return;const n=this.ctx.currentTime;(t?[62,65,69,74]:[62,60,57,50]).forEach((r,a)=>this.tone(e,"triangle",xn(r),xn(r),n+a*.16,a===3?.9:.2,.35))}capture(t){const e=this.out(null,.6);if(!e)return;const n=this.ctx.currentTime;(t?[69,74,78]:[69,65,62]).forEach((r,a)=>this.tone(e,"square",xn(r),xn(r),n+a*.1,.14,.14))}setEngine(t){if(!this.ctx||this.ctx.state!=="running")return;const e=this.ctx;if(!t){if(this.engine){const o=this.engine;o.gain.gain.setTargetAtTime(0,e.currentTime,.1),window.setTimeout(()=>{try{o.a.stop(),o.b.stop()}catch{}},500),this.engine=null}return}if(!this.engine){const o=e.createOscillator(),l=e.createOscillator();o.type="sawtooth",l.type="square";const h=e.createBiquadFilter();h.type="lowpass",h.Q.value=2;const c=e.createGain();c.gain.value=0,o.connect(h),l.connect(h),h.connect(c).connect(this.sfx),o.start(),l.start(),this.engine={a:o,b:l,filter:h,gain:c}}const n=this.engine,i=e.currentTime,a=38-t.heavy*10+t.speed*55+t.load*10+(t.boost?25:0);n.a.frequency.setTargetAtTime(a,i,.08),n.b.frequency.setTargetAtTime(a*.5,i,.08),n.filter.frequency.setTargetAtTime(240+t.speed*700+t.load*300+(t.boost?900:0),i,.1),n.gain.gain.setTargetAtTime(.08+t.load*.06+t.speed*.05,i,.1)}setNearbyEngine(t,e){if(!this.ctx||this.ctx.state!=="running")return;const n=this.ctx;if(!this.hum){const a=n.createOscillator();a.type="sawtooth";const o=n.createBiquadFilter();o.type="lowpass",o.frequency.value=380;const l=n.createGain();l.gain.value=0;const h=n.createPanner();h.panningModel="equalpower",h.distanceModel="inverse",h.refDistance=8,h.rolloffFactor=1.3,a.connect(o).connect(l).connect(h).connect(this.sfx),a.start(),this.hum={osc:a,gain:l,pan:h}}const i=this.hum,r=n.currentTime;if(!t){i.gain.gain.setTargetAtTime(0,r,.2);return}i.pan.positionX?(i.pan.positionX.setTargetAtTime(t.x,r,.05),i.pan.positionY.setTargetAtTime(t.y,r,.05),i.pan.positionZ.setTargetAtTime(t.z,r,.05)):i.pan.setPosition(t.x,t.y,t.z),i.osc.frequency.setTargetAtTime(32+e*40,r,.1),i.gain.gain.setTargetAtTime(.1+e*.08,r,.15)}startMusic(){!this.ctx||this.scheduler!==null||(this.nextTime=this.ctx.currentTime+.1,this.scheduler=window.setInterval(()=>this.schedule(),50))}schedule(){const t=this.ctx;if(!t||t.state!=="running")return;const e=60/104/4;for(;this.nextTime<t.currentTime+.15;)this.playStep(this.step,this.nextTime),this.nextTime+=e,this.step=(this.step+1)%256}playStep(t,e){const n=this.ctx,i=rv[Math.floor(t/64)%4],r=t%16,a=this.intensity,o=this.music;if(r%2===0){const l=n.createOscillator(),h=n.createGain(),c=n.createBiquadFilter();l.type="sawtooth",l.frequency.value=xn(i.root+(r===6||r===14?12:0)),c.type="lowpass",c.frequency.setValueAtTime(300+a*500,e),c.frequency.exponentialRampToValueAtTime(120,e+.18),h.gain.setValueAtTime(1e-4,e),h.gain.exponentialRampToValueAtTime(.22,e+.01),h.gain.exponentialRampToValueAtTime(1e-4,e+.2),l.connect(c).connect(h).connect(o),l.start(e),l.stop(e+.25)}if(t%64===0)for(const l of i.tones){const h=n.createOscillator(),c=n.createGain();h.type="triangle",h.frequency.value=xn(l),h.detune.value=(Math.random()-.5)*12,c.gain.setValueAtTime(1e-4,e),c.gain.linearRampToValueAtTime(.05,e+.8),c.gain.linearRampToValueAtTime(1e-4,e+4.4),h.connect(c).connect(o),h.start(e),h.stop(e+4.5)}if((r===0||r===8||a>.6&&r===10)&&this.tone(o,"sine",120,40,e,.22,.5+a*.3),a>.25&&(r===4||r===12)&&this.burst(o,"bandpass",1800,900,e,.14,.18+a*.12,.8),r%2===1&&a>.15&&this.burst(o,"highpass",8e3,7e3,e,.03,.05+a*.05),a>.5&&r%2===0){const l=i.tones[r/2%i.tones.length]+12;this.tone(o,"square",xn(l),xn(l),e,.09,.03)}}dispose(){this.scheduler!==null&&window.clearInterval(this.scheduler),this.scheduler=null,this.ctx?.close().catch(()=>{}),this.ctx=null,this.engine=null,this.hum=null}}const Bc=Math.PI*2;function Je(s,t,e){return s<t?t:s>e?e:s}function pl(s){return s=(s+Math.PI)%Bc,s<0&&(s+=Bc),s-Math.PI}function Js(s,t){return pl(t-s)}function ov(s,t,e){const n=Js(s,t);return Math.abs(n)<=e?t:pl(s+Math.sign(n)*e)}function Za(s,t,e){return s<t?Math.min(t,s+e):Math.max(t,s-e)}function Yo(s,t){return 1-Math.exp(-s*t)}function Te(s,t,e,n){const i=e-s,r=n-t;return Math.sqrt(i*i+r*r)}function Fs(s,t){return Math.atan2(s,t)}class Qh{constructor(t){y(this,"s");this.s=t>>>0}next(){let t=this.s=this.s+1831565813>>>0;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}range(t,e){return t+(e-t)*this.next()}int(t,e){return t+Math.floor(this.next()*(e-t))}pick(t){return t[Math.floor(this.next()*t.length)]}}const Hc={t:0,x:0,y:0,z:0,nx:0,ny:0,nz:0};class lv{constructor(t){y(this,"camera");y(this,"yaw",0);y(this,"pitch",.2);y(this,"distance",12);y(this,"targetDistance",12);y(this,"minDistance",5.5);y(this,"maxDistance",22);y(this,"pivot",new D);y(this,"smoothPivot",new D);y(this,"trauma",0);y(this,"shakeT",0);y(this,"initialised",!1);this.camera=t}reset(t){this.yaw=t,this.pitch=.2,this.initialised=!1}look(t,e,n){const i=.0022*n.sensitivity;this.yaw-=t*i,this.pitch=Je(this.pitch+e*i*(n.invertY?-1:1),-.32,1.15)}zoom(t){this.targetDistance=Je(this.targetDistance+t*1.4,this.minDistance,this.maxDistance)}addTrauma(t){this.trauma=Math.min(1,this.trauma+t)}dir(t){const e=Math.cos(this.pitch);return t.set(Math.sin(this.yaw)*e,-Math.sin(this.pitch),Math.cos(this.yaw)*e)}update(t,e,n,i,r,a){this.pivot.set(e,n+3.4,i),this.initialised||(this.smoothPivot.copy(this.pivot),this.distance=this.targetDistance,this.initialised=!0);const o=a.smoothing<=0?1:Yo(26/(.4+a.smoothing*1.6),t);this.smoothPivot.lerp(this.pivot,o),this.distance+=(this.targetDistance-this.distance)*Yo(10,t),this.dir(Qn);let l=this.distance;r&&r.raycast(this.smoothPivot.x,this.smoothPivot.y,this.smoothPivot.z,-Qn.x,-Qn.y,-Qn.z,l+.6,Hc)&&(l=Math.max(1.8,Hc.t-.6));const h=this.camera;if(h.position.set(this.smoothPivot.x-Qn.x*l,this.smoothPivot.y-Qn.y*l,this.smoothPivot.z-Qn.z*l),h.position.y<n+.6&&r&&(h.position.y=Math.max(h.position.y,r.surfaceHeight(h.position.x,h.position.z,h.position.y+1)+.5)),Vc.copy(h.position).add(Qn),h.lookAt(Vc),this.trauma=Math.max(0,this.trauma-t*1.6),a.shake&&this.trauma>0){this.shakeT+=t*38;const c=this.trauma*this.trauma;h.rotation.z+=Math.sin(this.shakeT*1.3)*.02*c,h.rotateX(Math.sin(this.shakeT*.9+1.7)*.015*c),h.rotateY(Math.sin(this.shakeT*1.1+4.1)*.015*c)}h.fov!==a.fov&&(h.fov=a.fov,h.updateProjectionMatrix())}}const Qn=new D,Vc=new D,$e={hornet:{id:"hornet",name:"HORNET",role:"LIGHT RAIDER",blurb:"Low, quick and twitchy. Flanks fast, folds under focused fire.",maxSpeed:17,reverseFactor:.62,accel:24,brake:34,turnRate:2.35,health:195,armor:12,radius:1.75,length:4.3,width:3,turretHeight:1.45,mass:1,ability:"dash",unlockLevel:1,cost:0},vanguard:{id:"vanguard",name:"VANGUARD",role:"MAIN BATTLE",blurb:"The all-rounder. Balanced speed and plating with a tactical shield.",maxSpeed:13.5,reverseFactor:.58,accel:17,brake:28,turnRate:1.85,health:275,armor:25,radius:2,length:4.9,width:3.4,turretHeight:1.7,mass:1.45,ability:"aegis",unlockLevel:1,cost:0},bastion:{id:"bastion",name:"BASTION",role:"SIEGE HEAVY",blurb:"A rolling fortress. Slow to turn, brutal up close with its shockwave.",maxSpeed:10.5,reverseFactor:.55,accel:11.5,brake:22,turnRate:1.38,health:370,armor:45,radius:2.3,length:5.5,width:3.9,turretHeight:1.95,mass:2.1,ability:"shockwave",unlockLevel:3,cost:1200}},Qs={dash:{id:"dash",name:"PHASE DASH",blurb:"A burst of thrust that halves incoming damage while it lasts.",chargeTime:13,duration:.7},aegis:{id:"aegis",name:"AEGIS SHIELD",blurb:"A hard-light dome that blocks 60% of damage for 5 seconds.",chargeTime:20,duration:5},shockwave:{id:"shockwave",name:"SHOCKWAVE",blurb:"A ground slam: heavy damage and knockback within 12 m, jams turrets.",chargeTime:22,duration:.4}},Ee={plasma:{id:"plasma",name:"PLASMA CANNON",role:"BALANCED",blurb:"Eight-round magazine of hot plasma slugs with a small splash. Reliable at any range.",damage:26,speed:92,cooldown:.55,magazine:8,reloadTime:2.2,heatPerShot:0,coolRate:0,overheatLock:0,charge:0,splashRadius:2.4,splashDamage:9,gravity:0,lifetime:1.7,spread:.006,pierce:0,knockback:.6,jolt:0,turretSpeed:2.2,pitchMin:-.16,pitchMax:.36,recoil:.28,barrelLength:2.6,projectile:"plasma",color:3729663,unlockLevel:1,cost:0,preferredRange:30},rail:{id:"rail",name:"RAIL DRIVER",role:"SNIPER",blurb:"Charges for a beat, then drives a slug through 50% of armor. Long cooldown — make it count.",damage:80,speed:560,cooldown:2.5,magazine:0,reloadTime:0,heatPerShot:0,coolRate:0,overheatLock:0,charge:.38,splashRadius:0,splashDamage:0,gravity:0,lifetime:.5,spread:0,pierce:.5,knockback:3.2,jolt:0,turretSpeed:1.55,pitchMin:-.14,pitchMax:.32,recoil:.6,barrelLength:3.4,projectile:"rail",color:12121343,unlockLevel:4,cost:1500,preferredRange:48},volt:{id:"volt",name:"VOLT EMITTER",role:"BRAWLER",blurb:"A short-range arc stream. Each hit jolts the target. Watch the heat — R vents early.",damage:6,speed:125,cooldown:.085,magazine:0,reloadTime:1.1,heatPerShot:.045,coolRate:.42,overheatLock:1.8,charge:0,splashRadius:0,splashDamage:0,gravity:0,lifetime:.42,spread:.028,pierce:0,knockback:0,jolt:.6,turretSpeed:2.9,pitchMin:-.2,pitchMax:.38,recoil:.05,barrelLength:2.1,projectile:"volt",color:8363519,unlockLevel:2,cost:800,preferredRange:17},nova:{id:"nova",name:"NOVA ROCKETS",role:"ARTILLERY",blurb:"Four-rocket rack. Arcing shots with a 6 m blast that pushes tanks around. Lob over cover.",damage:22,speed:50,cooldown:.24,magazine:4,reloadTime:3.3,heatPerShot:0,coolRate:0,overheatLock:0,charge:0,splashRadius:6,splashDamage:24,gravity:9,lifetime:3.2,spread:.012,pierce:0,knockback:7.5,jolt:0,turretSpeed:1.9,pitchMin:-.12,pitchMax:.5,recoil:.32,barrelLength:1.9,projectile:"nova",color:16747069,unlockLevel:6,cost:2200,preferredRange:30}},an=[{id:"graphite",name:"GRAPHITE / CYAN",body:2830912,accent:3076863,metal:.65,unlockLevel:1,cost:0},{id:"arctic",name:"ARCTIC SHELL",body:13227234,accent:7329791,metal:.45,unlockLevel:1,cost:250},{id:"ultraviolet",name:"ULTRAVIOLET",body:2891594,accent:10906623,metal:.6,unlockLevel:2,cost:400},{id:"ember",name:"EMBER CORE",body:3808281,accent:16742959,metal:.55,unlockLevel:3,cost:600},{id:"chrome",name:"CHROME TIDE",body:9148072,accent:3473362,metal:.95,unlockLevel:5,cost:900},{id:"midnight",name:"MIDNIGHT GOLD",body:1250847,accent:16761405,metal:.8,unlockLevel:7,cost:1400}],cv=[{id:"damage",name:"DAMAGE CORE",perLevel:"+6% weapon damage"},{id:"armor",name:"COMPOSITE PLATING",perLevel:"+7 armor"},{id:"speed",name:"DRIVE COILS",perLevel:"+4% top speed"},{id:"reload",name:"LOADER SERVO",perLevel:"-6% cooldown & reload"}],kn=5,hv=[150,300,500,800,1200],Ri={rookie:{id:"rookie",name:"ROOKIE",reaction:.95,aimError:.12,lead:.25,turretMult:.7,fireAlign:.07,retreatHealth:.2,viewRange:55,strafe:.35,think:.7,tactics:.3},veteran:{id:"veteran",name:"VETERAN",reaction:.55,aimError:.07,lead:.65,turretMult:.9,fireAlign:.045,retreatHealth:.32,viewRange:72,strafe:.7,think:.45,tactics:.7},elite:{id:"elite",name:"ELITE",reaction:.3,aimError:.042,lead:.92,turretMult:1.05,fireAlign:.028,retreatHealth:.38,viewRange:88,strafe:1,think:.3,tactics:1}},_e={tdm:{id:"tdm",name:"TEAM DEATHMATCH",short:"TDM",blurb:"Blue versus magenta, four tanks a side. Every destroyed enemy scores for your team.",scoreLimits:[15,25,40],defaultScore:25,timeLimits:[300,480,600],teams:!0},ffa:{id:"ffa",name:"FREE-FOR-ALL",short:"FFA",blurb:"Eight tanks, no friends. First to the frag limit — or the most frags at the buzzer — wins.",scoreLimits:[10,15,25],defaultScore:15,timeLimits:[300,480,600],teams:!1},cp:{id:"cp",name:"CONTROL POINT",short:"CP",blurb:"Capture the central uplink and hold it. The owning team earns a point every second.",scoreLimits:[60,100,150],defaultScore:100,timeLimits:[300,480,600],teams:!0}},uv=["KESTREL","RIVET","NOX","SABLE","TALON","MERIDIAN","VEX","ORBIT","GRIDLOCK","PALADIN","ION","FERRO","QUASAR","BRAMBLE","DRIFT","HALO"],dv=4,Gc=2.2,fv=100,pv=35,mv=1.45,gv=.34,vv=.16,xv=6,_v=.035,ta=.95,yv=24,Mv=2.3,on=new Map;function Gn(s,t){const e=document.createElement("canvas");return e.width=s,e.height=t,[e,e.getContext("2d")]}function Wn(s,t,e=!0,n=!0){const i=new yg(t);return e&&(i.wrapS=i.wrapT=Xs),n&&(i.colorSpace=Ye),i.anisotropy=4,on.set(s,i),i}function ha(s){let t=s>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function ml(s,t,e,n,i,r){const a=ha(r);for(let o=0;o<n;o++){s.fillStyle=`rgba(0,0,0,${i*a()})`;const l=1+a()*6;s.fillRect(a()*t,a()*e,l,l*(.5+a()))}}function bv(s,t){const e=`floor:${s}:${t}`,n=on.get(e);if(n)return n;const[i,r]=Gn(512,512);r.fillStyle=s,r.fillRect(0,0,512,512);const a=ha(11);for(let o=0;o<2;o++)for(let l=0;l<2;l++){const h=.9+a()*.2;r.fillStyle=`rgba(${Math.floor(30*h)},${Math.floor(38*h)},${Math.floor(52*h)},0.35)`,r.fillRect(l*256+6,o*256+6,244,244),r.fillStyle="rgba(0,0,0,0.35)",r.fillRect(l*256+30,o*256+120,196,14),r.fillStyle="rgba(255,255,255,0.05)";for(const[c,u]of[[18,18],[238,18],[18,238],[238,238]])r.fillRect(l*256+c-3,o*256+u-3,6,6)}return ml(r,512,512,900,.18,5),r.strokeStyle=t,r.lineWidth=3,r.globalAlpha=.55,r.strokeRect(1.5,1.5,509,509),r.beginPath(),r.moveTo(256,0),r.lineTo(256,512),r.moveTo(0,256),r.lineTo(512,256),r.stroke(),r.globalAlpha=1,Wn(e,i)}function Sv(){const s="floorGlow",t=on.get(s);if(t)return t;const[e,n]=Gn(512,512);return n.fillStyle="#000",n.fillRect(0,0,512,512),n.strokeStyle="#fff",n.lineWidth=3,n.strokeRect(1.5,1.5,509,509),n.globalAlpha=.6,n.beginPath(),n.moveTo(256,0),n.lineTo(256,512),n.moveTo(0,256),n.lineTo(512,256),n.stroke(),Wn(s,e)}function es(s,t,e){const n=`panel:${s}:${t}:${e}`,i=on.get(n);if(i)return i;const[r,a]=Gn(256,256);a.fillStyle=s,a.fillRect(0,0,256,256);const o=ha(e);for(let l=0;l<4;l++){const h=l*64;a.fillStyle=`rgba(255,255,255,${.02+o()*.04})`,a.fillRect(0,h+4,256,56),a.fillStyle=t,a.fillRect(0,h,256,3);for(let c=0;c<3;c++)a.fillStyle="rgba(0,0,0,0.28)",a.fillRect(o()*220,h+12+o()*30,20+o()*30,3)}return a.fillStyle=t,a.fillRect(0,0,3,256),a.fillRect(128,0,2,256),ml(a,256,256,500,.2,e+3),Wn(n,r)}function Dr(s){const t=`container:${s}`,e=on.get(t);if(e)return e;const[n,i]=Gn(256,128);i.fillStyle=s,i.fillRect(0,0,256,128);for(let r=0;r<256;r+=8){const a=i.createLinearGradient(r,0,r+8,0);a.addColorStop(0,"rgba(0,0,0,0.35)"),a.addColorStop(.5,"rgba(255,255,255,0.12)"),a.addColorStop(1,"rgba(0,0,0,0.35)"),i.fillStyle=a,i.fillRect(r,0,8,128)}return i.fillStyle="rgba(0,0,0,0.45)",i.fillRect(0,0,256,6),i.fillRect(0,122,256,6),ml(i,256,128,400,.3,s.length*7),i.fillStyle="rgba(255,255,255,0.18)",i.font="bold 14px monospace",i.fillText("NTX "+(1e3+s.charCodeAt(2)*13),14,24),Wn(t,n)}function wv(){const s="track",t=on.get(s);if(t)return t;const[e,n]=Gn(64,128);n.fillStyle="#121419",n.fillRect(0,0,64,128);for(let i=0;i<128;i+=16)n.fillStyle="#2a2e38",n.fillRect(2,i+2,60,9),n.fillStyle="#3c4250",n.fillRect(6,i+4,52,3),n.fillStyle="#07080b",n.fillRect(0,i+12,64,4);return Wn(s,e)}function ua(){const s="glow",t=on.get(s);if(t)return t;const[e,n]=Gn(64,64),i=n.createRadialGradient(32,32,0,32,32,32);return i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.25,"rgba(255,255,255,0.7)"),i.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=i,n.fillRect(0,0,64,64),Wn(s,e,!1)}function Tv(){const s="scorch",t=on.get(s);if(t)return t;const[e,n]=Gn(128,128),i=ha(77),r=n.createRadialGradient(64,64,4,64,64,62);r.addColorStop(0,"rgba(0,0,0,0.9)"),r.addColorStop(.55,"rgba(10,8,6,0.55)"),r.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=r,n.fillRect(0,0,128,128);for(let a=0;a<40;a++){n.fillStyle=`rgba(0,0,0,${.2*i()})`;const o=i()*Math.PI*2,l=20+i()*40;n.beginPath(),n.arc(64+Math.cos(o)*l,64+Math.sin(o)*l,2+i()*6,0,Math.PI*2),n.fill()}return Wn(s,e,!1)}function Ev(s,t){const e=`sign:${s}:${t}`,n=on.get(e);if(n)return n;const[i,r]=Gn(512,96);return r.fillStyle="rgba(4,6,12,0.92)",r.fillRect(0,0,512,96),r.strokeStyle=t,r.lineWidth=4,r.strokeRect(6,6,500,84),r.font='700 54px "Chakra Petch", "Segoe UI", sans-serif',r.textAlign="center",r.textBaseline="middle",r.shadowColor=t,r.shadowBlur=18,r.fillStyle=t,r.fillText(s,256,50),r.shadowBlur=0,r.fillStyle="#ffffff",r.globalAlpha=.85,r.fillText(s,256,50),Wn(e,i,!1)}function Av(){const s="hazard",t=on.get(s);if(t)return t;const[e,n]=Gn(128,32);n.fillStyle="#16181f",n.fillRect(0,0,128,32),n.fillStyle="#ffb02e";for(let i=-32;i<160;i+=32)n.beginPath(),n.moveTo(i,32),n.lineTo(i+16,32),n.lineTo(i+32,0),n.lineTo(i+16,0),n.closePath(),n.fill();return Wn(s,e)}function Rv(){on.forEach(s=>s.dispose()),on.clear()}const Xt={cyan:3076863,blue:2792959,magenta:16723912,amber:16756782,white:15398655,red:16726862,green:5111706},ds={value:0};class tu{constructor(t){y(this,"surfaces",new Map);y(this,"glows",new Map);y(this,"extra",[]);this.env=t}surface(t){let e=this.surfaces.get(t);return e||(e=this.create(t),this.surfaces.set(t,e)),e}glow(t,e=2.2){const n=`${t}:${e}`;let i=this.glows.get(n);if(!i){const r=new yt(typeof t=="number"?t:Xt[t]);r.multiplyScalar(e),i=new Ae({color:r,toneMapped:!1,fog:!0}),this.glows.set(n,i)}return i}track(t){return this.extra.push(t),t}std(t){return new us({envMap:this.env,envMapIntensity:.9,...t})}create(t){switch(t){case"floor":return this.std({map:bv("#141a25","#2ef2ff"),emissiveMap:Sv(),emissive:new yt(1746884),emissiveIntensity:.22,roughness:.48,metalness:.6});case"deck":return this.std({map:es("#2b323e","#12161d",3),roughness:.42,metalness:.75});case"metal":return this.std({map:es("#39414f","#171b22",7),roughness:.45,metalness:.7});case"darkMetal":return this.std({map:es("#1b1f28","#0b0d11",9),roughness:.5,metalness:.8});case"concrete":return this.std({map:Av(),roughness:.85,metalness:.1,envMapIntensity:.3});case"containerCyan":return this.std({map:Dr("#1d6a80"),roughness:.6,metalness:.45});case"containerMagenta":return this.std({map:Dr("#7a2160"),roughness:.6,metalness:.45});case"containerSteel":return this.std({map:Dr("#4a5361"),roughness:.55,metalness:.55});case"containerAmber":return this.std({map:Dr("#86561b"),roughness:.6,metalness:.45});case"glass":return this.std({color:10475775,transparent:!0,opacity:.25,roughness:.05,metalness:.9});case"trim":return this.std({color:2501429,roughness:.4,metalness:.85});case"boundary":return this.std({map:es("#161a22","#0a0c10",13),roughness:.5,metalness:.8,emissive:new yt(666168),emissiveIntensity:.6});case"lab":return this.std({map:es("#7f8898","#4b525e",17),roughness:.38,metalness:.55});case"labDark":return this.std({map:es("#1d212b","#0b0d12",19),roughness:.42,metalness:.7});case"barrier":return Cv()}}dispose(){this.surfaces.forEach(t=>t.dispose()),this.glows.forEach(t=>t.dispose()),this.extra.forEach(t=>t.dispose()),this.surfaces.clear(),this.glows.clear()}}function Cv(){return new me({transparent:!0,depthWrite:!1,side:qe,blending:Ve,uniforms:{uTime:ds,uColor:{value:new yt(Xt.cyan)}},vertexShader:`
      varying vec3 vPos;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,fragmentShader:`
      uniform float uTime;
      uniform vec3 uColor;
      varying vec3 vPos;
      varying vec2 vUv;
      void main() {
        float lines = 0.5 + 0.5 * sin(vPos.y * 9.0 - uTime * 4.0);
        float hex = 0.5 + 0.5 * sin((vPos.x + vPos.z) * 3.0 + uTime * 1.5);
        float edge = smoothstep(0.85, 1.0, max(abs(vUv.y * 2.0 - 1.0), abs(vUv.x * 2.0 - 1.0)));
        float a = 0.03 + lines * 0.06 + hex * 0.03 + edge * 0.45;
        gl_FragColor = vec4(uColor * (0.55 + edge * 1.4), a);
      }`})}function Pv(s,t=!1){const e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,l=new ye;let h=0;for(let c=0;c<s.length;++c){const u=s[c];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". The geometry must have either an index or a position attribute"),null;l.addGroup(h,f,c),h+=f}}if(e){let c=0;const u=[];for(let d=0;d<s.length;++d){const f=s[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+c);c+=s[d].attributes.position.count}l.setIndex(u)}for(const c in r){const u=Wc(r[c]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" attribute."),null;l.setAttribute(c,u)}for(const c in a){const u=a[c][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[c]=[];for(let d=0;d<u;++d){const f=[];for(let v=0;v<a[c].length;++v)f.push(a[c][v][d]);const g=Wc(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" morphAttribute."),null;l.morphAttributes[c].push(g)}}return l}function Wc(s){let t,e,n,i=-1,r=0;for(let h=0;h<s.length;++h){const c=s[h];if(t===void 0&&(t=c.array.constructor),t!==c.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=c.itemSize),e!==c.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=c.normalized),n!==c.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=c.gpuType),i!==c.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=c.count*e}const a=new t(r),o=new Ce(a,e,n);let l=0;for(let h=0;h<s.length;++h){const c=s[h];if(c.isInterleavedBufferAttribute){const u=l/e;for(let d=0,f=c.count;d<f;d++)for(let g=0;g<e;g++){const v=c.getComponent(d,g);o.setComponent(d+u,g,v)}}else a.set(c.array,l);l+=c.count*e}return i!==void 0&&(o.gpuType=i),o}function ce(s,t,e,n,i,r,a=4,o=a){const l=n-s,h=i-t,c=r-e,u=new Re(l,h,c),d=u.attributes.uv,f=[[c,h],[c,h],[l,c],[l,c],[l,h],[l,h]];for(let g=0;g<6;g++){const[v,m]=f[g],p=g===2||g===3?a:o;for(let _=0;_<4;_++){const b=g*4+_;d.setXY(b,d.getX(b)*v/a,d.getY(b)*m/p)}}return u.translate(s+l/2,t+h/2,e+c/2),u}function Lv(s,t,e,n,i=4){const r=[],a=[],o=[],l=(f,g,v,m,p,_,b,x)=>{const C=r.length/3;r.push(...f,...g,...v,...m),a.push(...p,..._,...b,...x),o.push(C,C+1,C+2,C,C+2,C+3)},h=f=>[s[f],e[f],t[f]],c=f=>[s[f],n[f],t[f]],u=f=>[s[f]/i,t[f]/i];l(h(0),h(1),h(2),h(3),u(0),u(1),u(2),u(3)),l(c(0),c(3),c(2),c(1),u(0),u(3),u(2),u(1));for(let f=0;f<4;f++){const g=(f+1)%4,v=Math.hypot(s[g]-s[f],t[g]-t[f])/i;l(c(f),c(g),h(g),h(f),[0,n[f]/i],[v,n[g]/i],[v,e[g]/i],[0,e[f]/i])}const d=new ye;return d.setAttribute("position",new Kt(r,3)),d.setAttribute("uv",new Kt(a,2)),d.setIndex(o),d.computeVertexNormals(),d}function Ir(s,t,e,n,i,r,a){const o=Math.hypot(e-s,n-t),l=new Re(r,a,o);return l.rotateY(Math.atan2(e-s,n-t)),l.translate((s+e)/2,i,(t+n)/2),l}function oi(s){if(s.length===0)return null;for(const e of s){if(!e.index){const n=e.attributes.position.count,i=[];for(let r=0;r<n;r++)i.push(r);e.setIndex(i)}e.attributes.normal===void 0&&e.computeVertexNormals();for(const n of Object.keys(e.attributes))n!=="position"&&n!=="normal"&&n!=="uv"&&e.deleteAttribute(n);e.attributes.uv||e.setAttribute("uv",new Kt(new Float32Array(e.attributes.position.count*2),2))}const t=Pv(s,!1);return s.forEach(e=>e.dispose()),t}class Xc{constructor(){y(this,"groups",new Map)}add(t,e){let n=this.groups.get(t);n||(n=[],this.groups.set(t,n)),n.push(e)}build(t,e){const n=[];return this.groups.forEach((i,r)=>{const a=oi(i);if(!a)return;const o=new kt(a,r);o.castShadow=e.cast,o.receiveShadow=e.receive,o.matrixAutoUpdate=!1,o.updateMatrix(),t.add(o),n.push(o)}),this.groups.clear(),n}}const ea=new Map;function na(s,t){const e=ea.get(s);if(e)return e;const n={body:[],dark:[],accent:[],light:[]};t(n);const i={body:oi(n.body),dark:oi(n.dark),accent:oi(n.accent),light:oi(n.light)};return ea.set(s,i),i}function Mi(s,t,e=0){const n=new $h;n.moveTo(s[0][0],s[0][1]);for(let r=1;r<s.length;r++)n.lineTo(s[r][0],s[r][1]);n.closePath();const i=new dl(n,{depth:t,bevelEnabled:!0,bevelSize:.04,bevelThickness:.04,bevelSegments:1});return i.rotateY(-Math.PI/2),i.translate(e+t,0,0),i}function He(s,t,e,n,i,r,a,o,l=0){const h=new mn(s,t,e,n);return i&&h.rotateX(i),l&&h.rotateY(l),h.translate(r,a,o),h}function Jt(s,t,e,n,i,r){return ce(s-n/2,t-i/2,e-r/2,s+n/2,t+i/2,e+r/2,1)}function Dv(s){return na(`hull:${s}`,t=>{const e=$e[s],n=e.length,i=e.width,r=s==="bastion"?.85:s==="hornet"?.62:.72,a=i-r*2-.08,o=e.turretHeight;if(s==="hornet"){t.body.push(Mi([[-n/2,.45],[n/2-.2,.45],[n/2+.15,.62],[n*.2,o-.02],[-n/2+.3,o],[-n/2,o-.25]],a,-a/2));for(const l of[-1,1])t.body.push(Mi([[-n/2-.05,.92],[n/2-.4,.92],[n/2+.1,.7],[n/2+.1,.62],[n/2-.5,1.08],[-n/2+.1,1.08]],r+.1,l*(i/2-r/2)-(r+.1)/2)),t.accent.push(Jt(l*(i/2+.03),.98,0,.06,.07,n*.8)),t.dark.push(Jt(l*(a/2-.15),o+.2,-n/2+.35,.08,.5,.6));t.light.push(Jt(0,.75,n/2+.12,a*.7,.06,.06))}else if(s==="vanguard"){t.body.push(Mi([[-n/2,.42],[n/2-.3,.42],[n/2+.1,.72],[n/2-.55,o-.05],[-n/2+.2,o],[-n/2,o-.35]],a,-a/2));for(const l of[-1,1])t.body.push(Mi([[-n/2-.1,.98],[n/2-.3,.98],[n/2+.12,.74],[n/2+.12,.66],[n/2-.45,1.16],[-n/2+.05,1.16]],r+.12,l*(i/2-r/2)-(r+.12)/2)),t.accent.push(Jt(l*(i/2+.05),1.06,-.2,.06,.08,n*.62)),t.dark.push(Jt(l*(a/2-.35),o+.06,-n/2+.55,.35,.22,.7)),t.light.push(Jt(l*(a/2-.25),.95,n/2-.05,.35,.1,.06));t.dark.push(Jt(0,o+.02,-n/2+.25,a*.8,.1,.3))}else{t.body.push(Mi([[-n/2,.4],[n/2-.15,.4],[n/2+.15,.95],[n/2-.35,o-.02],[-n/2+.15,o],[-n/2,o-.2]],a,-a/2));for(const l of[-1,1])t.body.push(Mi([[-n/2-.1,.55],[n/2-.1,.55],[n/2+.2,.85],[n/2+.2,1.25],[n/2-.3,1.38],[-n/2+.1,1.38]],r+.16,l*(i/2-r/2)-(r+.16)/2)),t.accent.push(Jt(l*(i/2+.09),1,0,.06,.09,n*.75)),t.accent.push(Jt(l*(i/2+.09),.78,0,.06,.05,n*.75)),t.dark.push(He(.12,.14,.6,8,0,l*(a/2-.25),o+.25,-n/2+.3)),t.light.push(Jt(l*(a/2-.3),1,n/2+.16,.4,.12,.05));t.dark.push(Jt(0,1.15,n/2-.02,a*.92,.35,.18))}t.accent.push(Jt(0,o-.25,-n/2-.04,a*.7,.07,.04))})}function Iv(s){return na(`wheels:${s}`,t=>{const e=$e[s],n=e.length,i=e.width,r=s==="bastion"?6:5,a=s==="hornet"?.3:.34;for(const o of[-1,1]){const l=o*(i/2+.01);for(let h=0;h<r;h++){const c=-n/2+.55+h*(n-1.1)/(r-1);t.dark.push(Yc(He(a,a,.12,12,0,0,0,0),l,.42,c)),t.accent.push(Yc(He(.07,.07,.14,6,0,0,0,0),l+o*.01,.42,c))}}})}function Yc(s,t,e,n){return s.rotateZ(Math.PI/2),s.translate(t,e,n),s}function Uv(s,t){const e=t==="bastion"?1.12:t==="hornet"?.88:1,n=Ee[s].barrelLength,i=na(`turret:${s}:${t}`,a=>{const o=e;if(s==="plasma")a.body.push(He(.95*o,1.1*o,.55,6,0,0,.28,-.05,Math.PI/6)),a.dark.push(He(1.12*o,1.15*o,.1,6,0,0,.02,-.05,Math.PI/6)),a.accent.push(Jt(0,.4,-1*o,.9*o,.06,.06)),a.dark.push(Jt(.55*o,.62,-.5,.25,.18,.5)),a.light.push(Jt(.55*o,.62,-.24,.12,.08,.04));else if(s==="rail"){a.body.push(Mi([[-1*o,0],[.7*o,0],[1*o,.25],[.6*o,.5],[-.9*o,.5]],1.6*o,-.8*o)),a.dark.push(Jt(0,.6,-.6,1.1*o,.22,.6)),a.accent.push(Jt(0,.72,-.6,.9*o,.04,.5));for(const l of[-1,1])a.accent.push(Jt(l*.82*o,.25,0,.04,.06,1.4*o))}else if(s==="volt"){const l=new ui(.95*o,16,8,0,Math.PI*2,0,Math.PI/2);l.scale(1,.7,1.1),a.body.push(l),a.dark.push(He(1*o,1.05*o,.12,16,0,0,.02,0)),a.accent.push(He(.98*o,.98*o,.05,16,0,0,.12,0)),a.light.push(Jt(0,.62*o,-.4,.3,.06,.3))}else a.body.push(Jt(0,.3,-.1,1.5*o,.6,1.5*o)),a.dark.push(He(.6*o,.65*o,.25,12,0,0,.6,-.1)),a.accent.push(Jt(0,.45,.66*o,1.2*o,.05,.04))}),r=na(`barrel:${s}:${t}`,a=>{const o=e;if(s==="plasma"){a.body.push(Jt(0,0,.55,.55*o,.45*o,.6)),a.dark.push(He(.17*o,.2*o,n-.4,12,Math.PI/2,0,0,.4+(n-.4)/2));for(let l=0;l<3;l++)a.accent.push(He(.23*o,.23*o,.07,12,Math.PI/2,0,0,1+l*.35));a.dark.push(He(.27*o,.25*o,.35,8,Math.PI/2,0,0,n-.15)),a.light.push(He(.12*o,.12*o,.02,10,Math.PI/2,0,0,n+.03))}else if(s==="rail"){a.body.push(Jt(0,0,.7,.6*o,.4*o,.6));for(const l of[-1,1])a.dark.push(Jt(l*.17*o,0,.4+(n-.4)/2,.12*o,.3*o,n-.4));a.accent.push(Jt(0,0,.5+(n-.5)/2,.06,.08*o,n-.6));for(let l=0;l<4;l++)a.dark.push(Jt(0,.19*o,1+l*.6,.48*o,.06,.12));a.light.push(Jt(0,0,n,.2*o,.1,.03))}else if(s==="volt"){a.body.push(Jt(0,0,.6,.45*o,.4*o,.5)),a.dark.push(He(.13*o,.17*o,n-.6,10,Math.PI/2,0,0,.6+(n-.6)/2));for(let l=0;l<3;l++){const h=new _s(.24*o,.05,6,16);h.translate(0,0,1+l*.32),a.accent.push(h)}for(let l=0;l<3;l++){const h=l/3*Math.PI*2,c=Jt(0,0,0,.06,.06,.5);c.rotateX(.35),c.translate(0,.16*o,0),c.rotateZ(h),c.translate(0,0,n-.2),a.dark.push(c)}a.light.push(new ui(.11*o,8,6).translate(0,0,n))}else{a.body.push(Jt(0,.05,.75,1.15*o,.85*o,1.5));for(const l of[-1,1])for(const h of[-1,1])a.dark.push(He(.19*o,.19*o,.3,10,Math.PI/2,l*.27*o,.05+h*.21*o,n-.05)),a.light.push(He(.12*o,.12*o,.02,8,Math.PI/2,l*.27*o,.05+h*.21*o,n+.11));a.accent.push(Jt(0,.5*o,.75,1.17*o,.05,1.3))}});return{turret:i,barrel:r}}class eu{constructor(t,e,n){y(this,"root",new ke);y(this,"hull",new ke);y(this,"turret",new ke);y(this,"barrelPivot",new ke);y(this,"recoil",new ke);y(this,"shield");y(this,"trackTex");y(this,"bodyMat");y(this,"darkMat");y(this,"accentMat");y(this,"lightMat");y(this,"trackMats",[]);y(this,"ownGeos",[]);y(this,"shieldMat");y(this,"look");y(this,"accentColor",new yt);y(this,"baseBody",new yt);this.look=t;const i=$e[t.hull];this.bodyMat=new us({color:t.body,metalness:t.metal,roughness:.45,envMap:e,envMapIntensity:.5}),this.darkMat=new us({color:1316637,metalness:.8,roughness:.45,envMap:e,envMapIntensity:.8}),this.accentColor.setHex(t.accent).multiplyScalar(2.2),this.baseBody.setHex(t.body),this.accentMat=new Ae({color:this.accentColor.clone(),toneMapped:!1}),this.lightMat=new Ae({color:new yt(t.light).multiplyScalar(1.6),toneMapped:!1});const r=(f,g)=>{const v=[[g.body,this.bodyMat],[g.dark,this.darkMat],[g.accent,this.accentMat],[g.light,this.lightMat]];for(const[m,p]of v){if(!m)continue;const _=new kt(m,p);_.castShadow=n&&p!==this.accentMat&&p!==this.lightMat,f.add(_)}},a=t.hull==="bastion"?.85:t.hull==="hornet"?.62:.72,o=wv(),l=o.clone(),h=o.clone();for(const f of[l,h])f.needsUpdate=!0,f.wrapS=f.wrapT=Xs,f.repeat.set(1,i.length/1.2);this.trackTex=[l,h];for(const[f,g]of[[1,l],[-1,h]]){const v=new us({map:g,color:9080988,metalness:.6,roughness:.7});this.trackMats.push(v);const m=new Re(a,.86,i.length+.1),p=m.attributes.position,_=m.attributes.uv;for(let x=0;x<p.count;x++)_.setXY(x,(p.getX(x)+p.getY(x))/a,p.getZ(x)/i.length+.5);m.translate(f*(i.width/2-a/2),.43,0),this.ownGeos.push(m);const b=new kt(m,v);b.castShadow=n,this.hull.add(b)}r(this.hull,Dv(t.hull)),r(this.hull,Iv(t.hull));const{turret:c,barrel:u}=Uv(t.weapon,t.hull);this.turret.position.y=i.turretHeight,r(this.turret,c),this.barrelPivot.position.y=.42,this.turret.add(this.barrelPivot),this.barrelPivot.add(this.recoil),r(this.recoil,u),this.shieldMat=new me({transparent:!0,depthWrite:!1,blending:Ve,uniforms:{uColor:{value:new yt(8382975)},uTime:{value:0},uAlpha:{value:1}},vertexShader:`
        varying vec3 vN; varying vec3 vV; varying vec3 vP;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); vP = position;
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        uniform vec3 uColor; uniform float uTime; uniform float uAlpha;
        varying vec3 vN; varying vec3 vV; varying vec3 vP;
        void main() {
          float f = pow(1.0 - abs(dot(vN, vV)), 2.5);
          float hex = step(0.92, fract(vP.y * 3.0 + uTime * 0.6)) * 0.35;
          gl_FragColor = vec4(uColor * 1.8, (f * 0.85 + hex * 0.4 + 0.04) * uAlpha);
        }`});const d=new ui(1,24,14);this.ownGeos.push(d),this.shield=new kt(d,this.shieldMat),this.shield.scale.set(i.width*.85,i.turretHeight*1.5,i.length*.7),this.shield.position.y=i.turretHeight*.5,this.shield.visible=!1,this.root.add(this.hull,this.turret,this.shield)}setTracks(t,e){this.trackTex[0].offset.y=-t/1.2,this.trackTex[1].offset.y=-e/1.2}setShield(t,e,n){this.shield.visible=t,t&&(this.shieldMat.uniforms.uTime.value=e,this.shieldMat.uniforms.uAlpha.value=n)}setWreck(t){this.bodyMat.color.copy(this.baseBody).multiplyScalar(1-t*.85),this.accentMat.color.copy(this.accentColor).multiplyScalar(1-t),this.lightMat.visible=t<.5}setHitFlash(t){this.bodyMat.emissive.setRGB(t*.32,t*.22,t*.14)}dispose(){this.root.removeFromParent(),this.bodyMat.dispose(),this.darkMat.dispose(),this.accentMat.dispose(),this.lightMat.dispose(),this.shieldMat.dispose(),this.trackMats.forEach(t=>t.dispose()),this.trackTex.forEach(t=>t.dispose()),this.ownGeos.forEach(t=>t.dispose())}}function Nv(){ea.forEach(s=>{s.body?.dispose(),s.dark?.dispose(),s.accent?.dispose(),s.light?.dispose()}),ea.clear()}class kv{constructor(t){y(this,"scene",new Zr);y(this,"camera",new Ne(38,1,.1,400));y(this,"mats");y(this,"geos",[]);y(this,"turntable",new ke);y(this,"rings",[]);y(this,"model",null);y(this,"lookKey","");y(this,"env");y(this,"spinBoost",0);y(this,"offset",.32);y(this,"vw",1);y(this,"vh",1);this.env=t,this.mats=new tu(t),this.scene.background=new yt(329485),this.scene.fog=new aa(461332,.035),this.scene.add(new Jh(9414911,1313312,.7));const e=new ev(14676735,70,40,.5,.7,1.4);e.position.set(4,12,6),e.target.position.set(0,0,0),e.castShadow=!0,e.shadow.mapSize.set(1024,1024),this.scene.add(e,e.target);const n=new Qr(Xt.cyan,22,18,1.6);n.position.set(-6,2.5,-2);const i=new Qr(Xt.magenta,20,18,1.6);i.position.set(6,2.5,-3),this.scene.add(n,i);const r=new kt(this.geo(new cl(40,64).rotateX(-Math.PI/2)),this.mats.surface("deck"));r.receiveShadow=!0,this.scene.add(r);const a=new kt(this.geo(new mn(4.2,4.4,.3,64)),this.mats.surface("deck"));a.position.y=.15,a.receiveShadow=!0,this.turntable.add(a),this.scene.add(this.turntable);for(let h=0;h<3;h++){const c=new kt(this.geo(new _s(4.6+h*1.1,.03+h*.01,6,96).rotateX(Math.PI/2)),this.mats.glow(h===1?"magenta":"cyan",2));c.position.y=.05+h*.02,this.rings.push(c),this.scene.add(c)}for(let h=-6;h<=6;h++){const c=h*2.4,u=-11-Math.abs(h)*.4,d=new kt(this.geo(ce(c-1.1,0,u-.3,c+1.1,9,u+.3)),this.mats.surface("darkMetal"));if(this.scene.add(d),h%2===0){const f=new kt(this.geo(ce(c-.06,.5,u+.31,c+.06,8,u+.36)),this.mats.glow(h%4===0?"cyan":"magenta",2));this.scene.add(f)}}const o=this.mats.track(new oa({map:ua(),color:new yt(Xt.cyan).multiplyScalar(.25),transparent:!0,blending:Ve,depthWrite:!1})),l=new al(o);l.scale.set(16,6,1),l.position.set(0,.3,0),this.scene.add(l)}geo(t){return this.geos.push(t),t}setLook(t){const e=JSON.stringify(t);e!==this.lookKey&&(this.lookKey=e,this.model?.dispose(),this.model=new eu(t,this.env,!0),this.model.root.position.y=.3,this.model.turret.position.y=$e[t.hull].turretHeight,this.turntable.add(this.model.root),this.spinBoost=1.6)}resize(t,e){this.vw=Math.max(1,t),this.vh=Math.max(1,e),this.offset=t<900?0:.3}update(t,e){ds.value=e,this.spinBoost=Math.max(0,this.spinBoost-t),this.turntable.rotation.y+=t*(.25+this.spinBoost*1.5),this.model&&(this.model.turret.rotation.y=Math.sin(e*.4)*.6,this.model.barrelPivot.rotation.x=-.05-Math.sin(e*.6)*.05,this.model.setTracks(e*.6,e*.6)),this.rings.forEach((r,a)=>r.rotation.y=e*(a%2?-.2:.15));const n=.6+Math.sin(e*.08)*.25,i=15.5;this.camera.position.set(Math.sin(n)*i,4.6,Math.cos(n)*i),this.camera.lookAt(0,1.1,0),this.camera.setViewOffset(this.vw,this.vh,-this.offset*this.vw*.5,0,this.vw,this.vh)}dispose(){this.model?.dispose(),this.geos.forEach(t=>t.dispose()),this.mats.dispose()}}const nu=.6;function ai(s,t,e){let n;return s.axis==="x"?n=(t-s.minX)/(s.maxX-s.minX):n=(e-s.minZ)/(s.maxZ-s.minZ),n=n<0?0:n>1?1:n,s.dir===-1&&(n=1-n),s.h0+(s.h1-s.h0)*n}class Fv{constructor(t){y(this,"boxes");y(this,"ramps");y(this,"solidRamps");y(this,"half");this.boxes=t.boxes,this.ramps=t.ramps,this.half=t.half,this.solidRamps=t.ramps.map(e=>e.bridge!==!0)}surfaceHeight(t,e,n,i=ta){const r=n+i;let a=0;const o=this.boxes;for(let h=0;h<o.length;h++){const c=o[h];!c.walkable||c.maxY>r||c.maxY<=a||t<c.minX||t>c.maxX||e<c.minZ||e>c.maxZ||(a=c.maxY)}const l=this.ramps;for(let h=0;h<l.length;h++){const c=l[h];if(t<c.minX||t>c.maxX||e<c.minZ||e>c.maxZ)continue;const u=ai(c,t,e);u<=r&&u>a&&(a=u)}return a}circleBlocked(t,e,n,i){return this.resolveCircle(zv.set(t,e),n,i,null)}resolveCircle(t,e,n,i){let r=!1;const a=e+Mv,o=e+ta,l=this.boxes;for(let c=0;c<l.length;c++){const u=l[c];!u.blocksTanks||u.maxY<=o||u.minY>=a||t.x<u.minX-n||t.x>u.maxX+n||t.z<u.minZ-n||t.z>u.maxZ+n||qc(t,n,u.minX,u.minZ,u.maxX,u.maxZ,i)&&(r=!0)}const h=this.ramps;for(let c=0;c<h.length;c++){const u=h[c];if(t.x<u.minX-n||t.x>u.maxX+n||t.z<u.minZ-n||t.z>u.maxZ+n)continue;const d=t.x<u.minX?u.minX:t.x>u.maxX?u.maxX:t.x,f=t.z<u.minZ?u.minZ:t.z>u.maxZ?u.maxZ:t.z,g=ai(u,d,f);g<=o||!this.solidRamps[c]&&g-nu>=a||t.x>=u.minX&&t.x<=u.maxX&&t.z>=u.minZ&&t.z<=u.maxZ&&ai(u,t.x,t.z)<=o||qc(t,n,u.minX,u.minZ,u.maxX,u.maxZ,i)&&(r=!0)}return r}raycast(t,e,n,i,r,a,o,l,h=!0){let c=o,u=0,d=0,f=0,g=!1;if(r<-1e-9){const x=-e/r;x>=0&&x<c&&(c=x,u=0,d=1,f=0,g=!0)}const v=1/(i||1e-12),m=1/(r||1e-12),p=1/(a||1e-12),_=this.boxes;for(let x=0;x<_.length;x++){const C=_[x];if(h?!C.blocksShots:!C.blocksTanks)continue;let A=(C.minX-t)*v,R=(C.maxX-t)*v,I=Math.min(A,R),w=Math.max(A,R),M=0;A=(C.minY-e)*m,R=(C.maxY-e)*m;let L=Math.min(A,R);if(L>I&&(I=L,M=1),w=Math.min(w,Math.max(A,R)),A=(C.minZ-n)*p,R=(C.maxZ-n)*p,L=Math.min(A,R),L>I&&(I=L,M=2),w=Math.min(w,Math.max(A,R)),!(w<0||I>w||I>=c)){if(I<0){c=0,u=-i,d=-r,f=-a,g=!0;continue}c=I,g=!0,u=M===0?-Math.sign(i):0,d=M===1?-Math.sign(r):0,f=M===2?-Math.sign(a):0}}const b=this.ramps;for(let x=0;x<b.length;x++){const C=b[x];let A=0,R=0,I;const w=C.axis==="x"?C.maxX-C.minX:C.maxZ-C.minZ,M=(C.h1-C.h0)/w*C.dir;C.axis==="x"?(A=M,I=C.dir===1?C.h0-M*C.minX:C.h0-M*C.maxX):(R=M,I=C.dir===1?C.h0-M*C.minZ:C.h0-M*C.maxZ);const L=r-A*i-R*a;if(Math.abs(L)<1e-9)continue;const O=(A*t+R*n+I-e)/L;if(O<0||O>=c)continue;const z=t+i*O,G=n+a*O;if(z<C.minX||z>C.maxX||G<C.minZ||G>C.maxZ)continue;c=O,g=!0;const Y=Math.sqrt(A*A+1+R*R);u=-A/Y,d=1/Y,f=-R/Y,L>0&&(u=-u,d=-d,f=-f)}if(g&&l){l.t=c,l.x=t+i*c,l.y=e+r*c,l.z=n+a*c;const x=Math.sqrt(u*u+d*d+f*f)||1;l.nx=u/x,l.ny=d/x,l.nz=f/x}return g}segmentClear(t,e,n,i,r,a){return!this.raycast(t,e,n,i-t,r-e,a-n,.999,null,!0)}}const zv={x:0,z:0,set(s,t){return this.x=s,this.z=t,this}};function qc(s,t,e,n,i,r,a){const o=s.x<e?e:s.x>i?i:s.x,l=s.z<n?n:s.z>r?r:s.z;let h=s.x-o,c=s.z-l;const u=h*h+c*c;if(u>=t*t)return!1;if(u>1e-10){const p=Math.sqrt(u);h/=p,c/=p;const _=t-p;return s.x+=h*_,s.z+=c*_,a&&(a.x+=h,a.z+=c),!0}const d=s.x-e,f=i-s.x,g=s.z-n,v=r-s.z,m=Math.min(d,f,g,v);return m===d?(s.x=e-t,a&&(a.x-=1)):m===f?(s.x=i+t,a&&(a.x+=1)):m===g?(s.z=n-t,a&&(a.z-=1)):(s.z=r+t,a&&(a.z+=1)),!0}const Ov=new Set(["containerCyan","containerMagenta","containerSteel","containerAmber"]);class Bv{constructor(t,e,n,i){y(this,"group",new ke);y(this,"mats");y(this,"geos",[]);y(this,"spin",[]);y(this,"blinkers",[]);y(this,"pickups",[]);y(this,"cpRingMat",null);y(this,"cpBeamMat",null);y(this,"arena");this.arena=t,this.mats=new tu(e),this.group.name=`arena:${t.id}`,this.buildStatic(n),this.buildSky();for(const r of t.decor)this.buildDecor(r,n);this.buildSpawnPads(),i&&this.buildControlPoint(),this.buildPickups()}track(t){return this.geos.push(t),t}buildStatic(t){const e=this.arena,n=new Xc,i=new Xc,r=e.half+2;n.add(this.mats.surface("floor"),ce(-r,-.5,-r,r,0,r,12));for(const c of e.boxes){if(c.hidden)continue;const u=Ov.has(c.mat),d=u?3:c.mat==="concrete"?2:4,f=u?2.6:c.mat==="concrete"?1.3:d;if(c.mat==="barrier"){const g=new kt(this.track(ce(c.minX,c.minY,c.minZ,c.maxX,c.maxY,c.maxZ,1)),this.mats.surface("barrier"));g.renderOrder=2,this.group.add(g);const m=c.maxX-c.minX>c.maxZ-c.minZ?[[c.minX,(c.minZ+c.maxZ)/2],[c.maxX,(c.minZ+c.maxZ)/2]]:[[(c.minX+c.maxX)/2,c.minZ],[(c.minX+c.maxX)/2,c.maxZ]];for(const[p,_]of m)n.add(this.mats.surface("darkMetal"),ce(p-.35,0,_-.35,p+.35,c.maxY+.3,_+.35)),i.add(this.mats.glow("cyan",2.6),ce(p-.4,c.maxY+.1,_-.4,p+.4,c.maxY+.25,_+.4));continue}n.add(this.mats.surface(c.mat),ce(c.minX,c.minY,c.minZ,c.maxX,c.maxY,c.maxZ,d,f)),c.trim&&c.trim!=="none"&&this.addTrim(i,c,c.trim),(c.mat==="labDark"||c.mat==="lab")&&c.maxY-c.minY>=6&&this.addWindows(i,c),u&&this.addContainerFrame(n,c)}for(const c of e.ramps){const u=[c.minX,c.minX,c.maxX,c.maxX],d=[c.minZ,c.maxZ,c.maxZ,c.minZ],f=u.map((p,_)=>ai(c,p,d[_])),g=c.bridge?f.map(p=>p-nu):[0,0,0,0];n.add(this.mats.surface(c.mat),Lv(u,d,f,g,4));const v=c.bridge?"cyan":"amber",m=.06;if(c.axis==="x")for(const p of[c.minZ+.25,c.maxZ-.25]){const _=Ir(c.minX,p,c.maxX,p,0,.18,.08);$c(_,c.minX,c.maxX,ai(c,c.minX,p)+m,ai(c,c.maxX,p)+m,"x"),i.add(this.mats.glow(v,2),_)}else for(const p of[c.minX+.25,c.maxX-.25]){const _=Ir(p,c.minZ,p,c.maxZ,0,.18,.08);$c(_,c.minZ,c.maxZ,ai(c,p,c.minZ)+m,ai(c,p,c.maxZ)+m,"z"),i.add(this.mats.glow(v,2),_)}}const a=4,o=e.boxes.find(c=>c.mat==="boundary")?.maxY??6,l=new ke,h=this.mats.surface("barrier");for(const[c,u,d,f]of[[-e.half,-e.half,e.half,-e.half],[-e.half,e.half,e.half,e.half],[-e.half,-e.half,-e.half,e.half],[e.half,-e.half,e.half,e.half]]){const g=Math.hypot(d-c,f-u),v=new kt(this.track(new pn(g,a)),h);v.position.set((c+d)/2,o+a/2,(u+f)/2),v.rotation.y=Math.atan2(d-c,f-u)+Math.PI/2,v.renderOrder=2,l.add(v)}this.group.add(l),n.build(this.group,{cast:t.shadows,receive:t.shadows}),i.build(this.group,{cast:!1,receive:!1})}addTrim(t,e,n){const i=this.mats.glow(n,2.4),r=e.maxY-.08,a=.14,o=.03;t.add(i,ce(e.minX-o,r-a,e.minZ-o,e.maxX+o,r,e.minZ-o+a)),t.add(i,ce(e.minX-o,r-a,e.maxZ+o-a,e.maxX+o,r,e.maxZ+o)),t.add(i,ce(e.minX-o,r-a,e.minZ-o,e.minX-o+a,r,e.maxZ+o)),t.add(i,ce(e.maxX+o-a,r-a,e.minZ-o,e.maxX+o,r,e.maxZ+o))}addWindows(t,e){const n=this.mats.glow(10479871,1.3),i=.04;for(const r of[.38,.7]){const a=e.minY+(e.maxY-e.minY)*r,o=a+.7;for(let l=e.minX+1;l<e.maxX-1.5;l+=2.4)t.add(n,ce(l,a,e.minZ-i,l+1.4,o,e.minZ)),t.add(n,ce(l,a,e.maxZ,l+1.4,o,e.maxZ+i));for(let l=e.minZ+1;l<e.maxZ-1.5;l+=2.4)t.add(n,ce(e.minX-i,a,l,e.minX,o,l+1.4)),t.add(n,ce(e.maxX,a,l,e.maxX+i,o,l+1.4))}}addContainerFrame(t,e){const n=this.mats.surface("trim"),i=.16;for(const[r,a]of[[e.minX,e.minZ],[e.maxX-i,e.minZ],[e.minX,e.maxZ-i],[e.maxX-i,e.maxZ-i]])t.add(n,ce(r-.02,e.minY,a-.02,r+i+.02,e.maxY,a+i+.02))}buildSky(){const t=this.arena,e=this.mats.track(new me({side:Fe,depthWrite:!1,fog:!1,uniforms:{uTop:{value:new yt(t.sky.top)},uBottom:{value:new yt(t.sky.bottom)},uTime:ds},vertexShader:`
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_Position = p.xyww;
        }`,fragmentShader:`
        uniform vec3 uTop;
        uniform vec3 uBottom;
        uniform float uTime;
        varying vec3 vDir;
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        void main() {
          float h = vDir.y;
          vec3 c = mix(uBottom, uTop, smoothstep(-0.05, 0.55, h));
          // Horizon haze band.
          c += vec3(0.05, 0.09, 0.16) * exp(-abs(h) * 14.0);
          // Stars.
          vec2 g = floor(vDir.xz / max(0.15, h + 0.2) * 220.0);
          float s = step(0.996, hash(g)) * smoothstep(0.1, 0.5, h);
          c += vec3(0.7, 0.8, 1.0) * s * (0.6 + 0.4 * sin(uTime * 2.0 + hash(g) * 30.0));
          gl_FragColor = vec4(c, 1.0);
        }`})),n=new kt(this.track(new ui(900,32,16)),e);n.renderOrder=-10,n.frustumCulled=!1,this.group.add(n);const i=110,r=this.track(new Re(1,1,1));r.translate(0,.5,0);const a=this.mats.track(new Ae({color:725024,fog:!0})),o=new Kr(r,a,i),l=new Kr(r,this.mats.glow(5818623,1.2),i),h=new Qt,c=new Li,u=new D,d=new D;let f=t.id==="docks"?3:9;const g=()=>(f=(f*9301+49297)%233280)/233280;for(let v=0;v<i;v++){const m=v/i*Math.PI*2+g()*.05,p=190+g()*160,_=10+g()*22,b=25+g()*g()*140;d.set(Math.sin(m)*p,-2,Math.cos(m)*p),c.setFromAxisAngle(new D(0,1,0),m),u.set(_,b,_*(.6+g()*.8)),h.compose(d,c,u),o.setMatrixAt(v,h),d.y=-2+b*(.82+g()*.12),u.set(_*1.02,.8+g()*1.5,u.z*1.02),h.compose(d,c,u),l.setMatrixAt(v,h),l.setColorAt(v,new yt(g()<.5?Xt.cyan:g()<.5?Xt.magenta:9403903).multiplyScalar(1.4))}this.group.add(o,l)}buildDecor(t,e){switch(t.kind){case"sign":{const n="#"+Xt[t.color].toString(16).padStart(6,"0"),i=this.mats.track(new Ae({map:Ev(t.text,n),toneMapped:!1,color:new yt(1.5,1.5,1.5)})),r=new kt(this.track(new pn(t.w,t.h)),i);r.position.set(t.x,t.y,t.z),r.rotation.y=t.yaw,this.group.add(r);break}case"light":{const n=this.sprite(Xt[t.color],2.2,.9);if(n.position.set(t.x,t.y,t.z),this.group.add(n),e.maxLights>0&&this.group.children.filter(i=>i.isPointLight).length<e.maxLights){const i=new Qr(Xt[t.color],t.intensity*14,t.range*1.6,1.6);i.position.set(t.x,t.y,t.z),this.group.add(i)}break}case"holo":{const n=new ke;n.position.set(t.x,t.y,t.z);const i=this.mats.glow(t.color,1.8);for(let a=0;a<3;a++){const o=new kt(this.track(new _s(t.r*(.35+a*.12),.05,6,64)),i);o.position.y=4+a*.9,o.rotation.x=Math.PI/2,n.add(o),this.spin.push({obj:o,speed:(a%2?-1:1)*(.4+a*.25),axis:"z"})}const r=new kt(this.track(new Jr(.8,0)),this.mats.glow(t.color,2.6));r.position.y=5,n.add(r),this.spin.push({obj:r,speed:1.2,axis:"y"}),this.group.add(n);break}case"strip":{const n=Ir(t.x0,t.z0,t.x1,t.z1,t.y,t.w??.16,.08);this.group.add(this.staticMesh(n,this.mats.glow(t.color,2.2)));break}case"crane":{const n=this.mats.surface("darkMetal"),i=62,r=[ce(t.x-.9,t.h,t.z-i/2-1,t.x+.9,t.h+1.8,t.z+i/2+1),ce(t.x-.5,t.h+1.8,t.z-6,t.x+.5,t.h+9,t.z-4.5),ce(t.x-1.6,t.h-3,t.z-2,t.x+1.6,t.h,t.z+2),ce(Math.min(t.x,t.x-34*Math.sign(t.x||1)),t.h+1.8,t.z-.7,Math.max(t.x,t.x-34*Math.sign(t.x||1)),t.h+3,t.z+.7),ce(t.x-20*Math.sign(t.x||1)-3,12.5,t.z-1.25,t.x-20*Math.sign(t.x||1)+3,15.1,t.z+1.25)],a=oi(r),o=this.staticMesh(a,n);o.castShadow=e.shadows,this.group.add(o);const l=oi([ce(t.x-20*Math.sign(t.x||1)-2,15.1,t.z-.05,t.x-20*Math.sign(t.x||1)-1.9,t.h+1.8,t.z+.05),ce(t.x-20*Math.sign(t.x||1)+1.9,15.1,t.z-.05,t.x-20*Math.sign(t.x||1)+2,t.h+1.8,t.z+.05)]);this.group.add(this.staticMesh(l,this.mats.surface("trim"))),this.group.add(this.staticMesh(Ir(t.x,t.z-i/2,t.x,t.z+i/2,t.h-.05,.25,.1),this.mats.glow("amber",2)));for(const h of[t.z-i/2,t.z+i/2,t.z]){const c=this.sprite(Xt.red,1.6,1);c.position.set(t.x,t.h+2.4,h),this.blinkers.push(c),this.group.add(c)}break}case"pylon":{const n=oi([ce(t.x-.3,0,t.z-.3,t.x+.3,t.h,t.z+.3)]);this.group.add(this.staticMesh(n,this.mats.surface("darkMetal"))),this.group.add(this.staticMesh(ce(t.x-.36,t.h-3,t.z-.36,t.x+.36,t.h-2.7,t.z+.36),this.mats.glow(t.color,2.4)));const i=this.sprite(Xt[t.color],3.5,.9);i.position.set(t.x,t.h+.4,t.z),this.group.add(i);break}case"water":{const n=this.mats.track(new us({color:200732,roughness:.12,metalness:.9,envMapIntensity:1.4})),i=new kt(this.track(new pn(1400,1400)),n);i.rotation.x=-Math.PI/2,i.position.y=t.y,this.group.add(i);break}}}buildSpawnPads(){const t=this.arena.spawns,e=(n,i)=>{for(const r of n){const a=new kt(this.track(new Ks(2.4,2.65,40)),this.mats.glow(i,1.6));a.rotation.x=-Math.PI/2,a.position.set(r.x,.04,r.z),this.group.add(a)}};e(t.blue,"blue"),e(t.magenta,"magenta")}buildControlPoint(){const t=this.arena.controlPoint;this.cpRingMat=this.mats.track(new me({transparent:!0,depthWrite:!1,blending:Ve,uniforms:{uTime:ds,uProgress:{value:0},uColor:{value:new yt(Xt.white)},uFill:{value:new yt(Xt.blue)},uContested:{value:0}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
        uniform float uTime; uniform float uProgress; uniform vec3 uColor; uniform vec3 uFill; uniform float uContested;
        varying vec2 vUv;
        void main() {
          vec2 p = vUv * 2.0 - 1.0;
          float r = length(p);
          if (r > 1.0) discard;
          float ang = atan(p.x, p.y) / 6.28318 + 0.5;
          float rim = smoothstep(0.9, 0.96, r) * (1.0 - smoothstep(0.985, 1.0, r));
          float fill = step(ang, abs(uProgress)) * smoothstep(0.8, 0.86, r) * (1.0 - smoothstep(0.88, 0.9, r));
          float grid = (step(0.96, fract(r * 8.0 - uTime * 0.4)) * 0.25 + 0.04) * (1.0 - r * 0.6);
          float pulse = 0.75 + 0.25 * sin(uTime * (3.0 + uContested * 9.0));
          vec3 c = uColor * (rim * 1.6 + grid) * pulse + uFill * fill * 2.0;
          gl_FragColor = vec4(c, max(rim, max(fill, grid)) * 0.9);
        }`}));const e=new kt(this.track(new pn(t.r*2,t.r*2)),this.cpRingMat);e.rotation.x=-Math.PI/2,e.position.set(t.x,t.y+.05,t.z),e.renderOrder=3,this.group.add(e),this.cpBeamMat=this.mats.track(new me({transparent:!0,depthWrite:!1,side:qe,blending:Ve,uniforms:{uTime:ds,uColor:{value:new yt(Xt.white)}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
        uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
        void main() {
          float a = (1.0 - vUv.y) * 0.22 * (0.7 + 0.3 * sin(vUv.y * 30.0 - uTime * 3.0));
          gl_FragColor = vec4(uColor * 1.4, a);
        }`}));const n=new kt(this.track(new mn(t.r*.96,t.r,7,48,1,!0)),this.cpBeamMat);n.position.set(t.x,t.y+3.5,t.z),n.renderOrder=3,this.group.add(n)}buildPickups(){for(const t of this.arena.pickups){const e=new ke;e.position.set(t.x,t.y,t.z);const n=t.kind==="repair"?Xt.green:t.kind==="overdrive"?Xt.amber:Xt.cyan,i=this.staticMesh(new mn(2,2.2,.18,24),this.mats.surface("darkMetal"));i.position.y=.09,i.updateMatrix(),e.add(i);const r=this.mats.track(new Ae({color:new yt(n).multiplyScalar(2),toneMapped:!1,transparent:!0})),a=new kt(this.track(new Ks(1.6,1.9,32)),r);a.rotation.x=-Math.PI/2,a.position.y=.2,e.add(a);const o=new ke,l=this.mats.glow(n,2.2);if(t.kind==="repair")o.add(new kt(this.track(new Re(1.1,.35,.35)),l)),o.add(new kt(this.track(new Re(.35,1.1,.35)),l));else if(t.kind==="overdrive"){o.add(new kt(this.track(new Jr(.6,0)),l));const c=new kt(this.track(new _s(.85,.05,6,24)),l);o.add(c)}else for(let c=0;c<2;c++){const u=new kt(this.track(new hl(.45,.6,4)),l);u.position.y=c*.5-.25,o.add(u)}const h=this.sprite(n,3,.5);o.add(h),o.position.y=1.6,e.add(o),this.group.add(e),this.pickups.push({group:e,icon:o,ring:a,ringMat:r,baseY:1.6})}}sprite(t,e,n){const i=this.mats.track(new oa({map:ua(),color:new yt(t).multiplyScalar(1.6),transparent:!0,opacity:n,blending:Ve,depthWrite:!1,toneMapped:!1})),r=new al(i);return r.scale.set(e,e,1),r}staticMesh(t,e){this.track(t);const n=new kt(t,e);return n.matrixAutoUpdate=!1,n.updateMatrix(),n}update(t,e,n){for(const r of this.spin)r.axis==="y"?r.obj.rotation.y=t*r.speed:r.obj.rotation.z=t*r.speed;const i=Math.sin(t*3)>.2?1:.15;for(const r of this.blinkers)r.material.opacity=i;if(e&&this.cpRingMat&&this.cpBeamMat){const r=this.cpRingMat.uniforms;r.uProgress.value=Math.abs(e.progress),r.uFill.value.setHex(e.progress>=0?Xt.blue:Xt.magenta);const a=e.owner==="blue"?Xt.blue:e.owner==="magenta"?Xt.magenta:Xt.white;r.uColor.value.setHex(a),r.uContested.value=e.contested?1:0,this.cpBeamMat.uniforms.uColor.value.setHex(a)}if(n)for(let r=0;r<this.pickups.length;r++){const a=this.pickups[r],o=n[r];a.icon.visible=o.active,a.icon.position.y=a.baseY+Math.sin(t*2+r)*.25,a.icon.rotation.y=t*1.4+r,a.ringMat.opacity=o.active?.9:.25}}dispose(){this.group.removeFromParent(),this.group.traverse(t=>{const e=t;e.geometry&&!this.geos.includes(e.geometry)&&this.geos.push(e.geometry)}),this.geos.forEach(t=>t.dispose()),this.mats.dispose()}}function $c(s,t,e,n,i,r){const a=s.attributes.position;for(let o=0;o<a.count;o++){const h=((r==="x"?a.getX(o):a.getZ(o))-t)/(e-t);a.setY(o,a.getY(o)+n+(i-n)*h)}a.needsUpdate=!0,s.computeVertexNormals()}class Zc{constructor(t,e){y(this,"points");y(this,"cap");y(this,"pos");y(this,"vel");y(this,"col");y(this,"base");y(this,"alpha");y(this,"size");y(this,"size0");y(this,"grow");y(this,"life");y(this,"maxLife");y(this,"grav");y(this,"drag");y(this,"head",0);y(this,"limit");y(this,"geo",new ye);y(this,"mat");this.cap=t,this.limit=t,this.pos=new Float32Array(t*3),this.vel=new Float32Array(t*3),this.col=new Float32Array(t*3),this.base=new Float32Array(t*3),this.alpha=new Float32Array(t),this.size=new Float32Array(t),this.size0=new Float32Array(t),this.grow=new Float32Array(t),this.life=new Float32Array(t),this.maxLife=new Float32Array(t),this.grav=new Float32Array(t),this.drag=new Float32Array(t),this.geo.setAttribute("position",new Ce(this.pos,3).setUsage(rs)),this.geo.setAttribute("color",new Ce(this.col,3).setUsage(rs)),this.geo.setAttribute("aAlpha",new Ce(this.alpha,1).setUsage(rs)),this.geo.setAttribute("aSize",new Ce(this.size,1).setUsage(rs)),this.geo.boundingSphere=new Ii(new D,1e5),this.mat=new me({transparent:!0,depthWrite:!1,blending:e?Ve:li,vertexColors:!0,uniforms:{uScale:{value:500},uMap:{value:ua()}},vertexShader:`
        uniform float uScale;
        attribute float aAlpha;
        attribute float aSize;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = color;
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aSize * uScale / max(0.5, -mv.z);
        }`,fragmentShader:`
        uniform sampler2D uMap;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float a = texture2D(uMap, gl_PointCoord).a * vAlpha;
          if (a < 0.01) discard;
          gl_FragColor = vec4(vColor, a);
        }`}),this.points=new _g(this.geo,this.mat),this.points.frustumCulled=!1,this.points.renderOrder=e?5:4}setScale(t){this.mat.uniforms.uScale.value=t}emit(t,e,n,i,r,a,o,l,h,c,u,d,f){const g=this.head;this.head=(this.head+1)%this.limit;const v=g*3;this.pos[v]=t,this.pos[v+1]=e,this.pos[v+2]=n,this.vel[v]=i,this.vel[v+1]=r,this.vel[v+2]=a,ls.setHex(o),this.base[v]=ls.r*l,this.base[v+1]=ls.g*l,this.base[v+2]=ls.b*l,this.size0[g]=h,this.grow[g]=c,this.life[g]=u,this.maxLife[g]=u,this.grav[g]=d,this.drag[g]=f}update(t){for(let n=0;n<this.cap;n++){if(this.life[n]<=0){this.alpha[n]!==0&&(this.alpha[n]=0,this.size[n]=0);continue}this.life[n]-=t;const i=n*3,r=Math.exp(-this.drag[n]*t);this.vel[i]*=r,this.vel[i+1]=this.vel[i+1]*r-this.grav[n]*t,this.vel[i+2]*=r,this.pos[i]+=this.vel[i]*t,this.pos[i+1]+=this.vel[i+1]*t,this.pos[i+2]+=this.vel[i+2]*t;const a=Math.max(0,this.life[n]/this.maxLife[n]);this.alpha[n]=a<.7?a/.7:1,this.size[n]=this.size0[n]+this.grow[n]*(1-a),this.col[i]=this.base[i],this.col[i+1]=this.base[i+1],this.col[i+2]=this.base[i+2]}const e=this.geo.attributes;e.position.needsUpdate=!0,e.color.needsUpdate=!0,e.aAlpha.needsUpdate=!0,e.aSize.needsUpdate=!0}clear(){this.life.fill(0),this.alpha.fill(0),this.size.fill(0)}dispose(){this.geo.dispose(),this.mat.dispose()}}function ti(s,t){s.count=t,t&&(s.instanceMatrix.needsUpdate=!0)}const ls=new yt,_n=new D,ei=new Li,ns=new D,Me=new Qt,jc=new D(0,0,1),Hv=new D(0,1,0),We={plasma:3729663,rail:13170431,volt:9414399,nova:16747069,shockwave:10482943,tank:16751168};class Vv{constructor(t,e){y(this,"group",new ke);y(this,"add");y(this,"smoke");y(this,"flashes",[]);y(this,"rings",[]);y(this,"beams",[]);y(this,"scorches",[]);y(this,"lights",[]);y(this,"columns",[]);y(this,"shots",new Map);y(this,"glows",new Map);y(this,"debris");y(this,"debrisState",[]);y(this,"geos",[]);y(this,"mats",[]);y(this,"flashIdx",0);y(this,"ringIdx",0);y(this,"beamIdx",0);y(this,"scorchIdx",0);y(this,"lightIdx",0);y(this,"colIdx",0);y(this,"debrisIdx",0);y(this,"trailTimer",0);this.add=new Zc(t,!0),this.smoke=new Zc(Math.floor(t*.6),!1),this.group.add(this.add.points,this.smoke.points);const n=ua();for(let d=0;d<24;d++){const f=this.mat(new oa({map:n,transparent:!0,blending:Ve,depthWrite:!1,toneMapped:!1})),g=new al(f);g.visible=!1,g.renderOrder=6,this.group.add(g),this.flashes.push({obj:g,t:0,dur:0,size:1})}const i=this.geo(new Ks(.85,1,48));for(let d=0;d<10;d++){const f=new kt(i,this.mat(new Ae({transparent:!0,blending:Ve,depthWrite:!1,side:qe,toneMapped:!1})));f.visible=!1,f.renderOrder=6,this.group.add(f),this.rings.push({obj:f,t:0,dur:0,size:1})}const r=this.geo(new mn(1,1,1,8,1,!0).rotateX(Math.PI/2).translate(0,0,.5));for(let d=0;d<10;d++){const f=new kt(r,this.mat(new Ae({transparent:!0,blending:Ve,depthWrite:!1,toneMapped:!1})));f.visible=!1,f.renderOrder=6,this.group.add(f),this.beams.push({obj:f,t:0,dur:0,size:1})}const a=this.geo(new pn(1,1).rotateX(-Math.PI/2)),o=this.mat(new Ae({map:Tv(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));for(let d=0;d<28;d++){const f=new kt(a,o.clone());this.mats.push(f.material),f.visible=!1,f.renderOrder=1,this.group.add(f),this.scorches.push({obj:f,t:0,dur:0,size:1})}const l=this.geo(new mn(1.6,2.2,14,24,1,!0).translate(0,7,0));for(let d=0;d<4;d++){const f=new kt(l,this.mat(new Ae({transparent:!0,blending:Ve,depthWrite:!1,side:qe,toneMapped:!1})));f.visible=!1,this.group.add(f),this.columns.push({obj:f,t:0,dur:0,size:1})}for(let d=0;d<e;d++){const f=new Qr(16777215,0,18,1.8);f.visible=!1,this.group.add(f),this.lights.push({obj:f,t:0,dur:0,size:1})}const h=(d,f,g,v,m)=>{const p=this.mat(new Ae({color:new yt(f).multiplyScalar(g),toneMapped:!1,transparent:v,blending:v?Ve:li,depthWrite:!v})),_=new Kr(this.geo(d),p,m);return _.count=0,_.frustumCulled=!1,_.instanceMatrix.setUsage(rs),this.group.add(_),_};this.shots.set("plasma",h(new ui(.28,10,8),Xt.white,2.5,!1,96)),this.glows.set("plasma",h(new mn(.42,.05,1,10).rotateX(-Math.PI/2).translate(0,0,-.5),We.plasma,2.2,!0,96)),this.shots.set("volt",h(new Re(.09,.09,1),15133951,3,!1,160)),this.glows.set("volt",h(new Re(.3,.3,1.4),We.volt,1.6,!0,160)),this.shots.set("rail",h(new Re(.14,.14,1),Xt.white,4,!1,16)),this.glows.set("rail",h(new Re(.5,.5,1),We.rail,1.5,!0,16));const c=new mn(.13,.13,.9,8).rotateX(Math.PI/2);this.shots.set("nova",h(c,2830136,1,!1,64)),this.glows.set("nova",h(new ui(.32,8,6).translate(0,0,-.55),We.nova,2.6,!0,64));const u=this.mat(new us({color:2303791,metalness:.7,roughness:.6,emissive:new yt(4198400),emissiveIntensity:.6}));this.debris=new Kr(this.geo(new Re(1,1,1)),u,48),this.debris.count=48,this.debris.frustumCulled=!1,this.debris.instanceMatrix.setUsage(rs);for(let d=0;d<48;d++)this.debrisState.push({x:0,y:-100,z:0,vx:0,vy:0,vz:0,rx:0,ry:0,spin:0,t:0,s:0}),Me.makeScale(0,0,0),this.debris.setMatrixAt(d,Me);this.group.add(this.debris)}geo(t){return this.geos.push(t),t}mat(t){return this.mats.push(t),t}setPixelScale(t,e){const n=t/(2*Math.tan(e*Math.PI/360));this.add.setScale(n),this.smoke.setScale(n)}setParticleLimit(t){this.add.limit=Math.max(32,Math.min(t,900)),this.smoke.limit=Math.max(24,Math.floor(this.add.limit*.6))}flash(t,e,n,i,r,a,o=2){const l=this.flashes[this.flashIdx];this.flashIdx=(this.flashIdx+1)%this.flashes.length,l.obj.position.set(t,e,n),l.obj.material.color.setHex(i).multiplyScalar(o),l.obj.visible=!0,l.t=a,l.dur=a,l.size=r}ring(t,e,n,i,r,a,o=!0){const l=this.rings[this.ringIdx];this.ringIdx=(this.ringIdx+1)%this.rings.length,l.obj.position.set(t,e,n),l.obj.rotation.set(o?-Math.PI/2:0,0,0),l.obj.material.color.setHex(i).multiplyScalar(2),l.obj.visible=!0,l.t=a,l.dur=a,l.size=r}beam(t,e,n,i,r,a,o,l,h){const c=this.beams[this.beamIdx];this.beamIdx=(this.beamIdx+1)%this.beams.length;const u=Math.hypot(i-t,r-e,a-n);u<.01||(c.obj.position.set(t,e,n),_n.set(i-t,r-e,a-n).divideScalar(u),c.obj.quaternion.setFromUnitVectors(jc,_n),c.obj.scale.set(l,l,u),c.obj.material.color.setHex(o).multiplyScalar(3),c.obj.visible=!0,c.t=h,c.dur=h,c.size=l)}light(t,e,n,i,r,a){if(!this.lights.length)return;const o=this.lights[this.lightIdx];this.lightIdx=(this.lightIdx+1)%this.lights.length,o.obj.position.set(t,e,n),o.obj.color.setHex(i),o.obj.visible=!0,o.t=a,o.dur=a,o.size=r}scorch(t,e,n,i){const r=this.scorches[this.scorchIdx];this.scorchIdx=(this.scorchIdx+1)%this.scorches.length,r.obj.position.set(t,e+.03,n),r.obj.rotation.y=Math.random()*Math.PI*2,r.obj.scale.set(i,1,i),r.obj.visible=!0,r.t=24,r.dur=24,r.size=i}column(t,e,n,i){const r=this.columns[this.colIdx];this.colIdx=(this.colIdx+1)%this.columns.length,r.obj.position.set(t,e,n),r.obj.material.color.setHex(i).multiplyScalar(1.4),r.obj.visible=!0,r.t=.9,r.dur=.9}sparks(t,e,n,i,r,a,o,l,h){for(let c=0;c<l;c++){const u=i*h*.6+(Math.random()-.5)*h,d=r*h*.6+Math.random()*h*.7,f=a*h*.6+(Math.random()-.5)*h;this.add.emit(t,e,n,u,d,f,o,2.2,.12+Math.random()*.12,-.08,.25+Math.random()*.35,14,2.5)}}smokePuff(t,e,n,i,r,a=.12,o=1.6){for(let l=0;l<i;l++){const h=.12+Math.random()*a;ls.setRGB(h,h*1.02,h*1.1),this.smoke.emit(t+(Math.random()-.5)*r*.5,e,n+(Math.random()-.5)*r*.5,(Math.random()-.5)*1.6,1+Math.random()*1.8,(Math.random()-.5)*1.6,ls.getHex(),1,r*.6,r*1.4,o*(.7+Math.random()*.6),-.4,1.2)}}fire(t,e,n,i,r){for(let a=0;a<i;a++){const o=Math.random()<.5?16742954:16762458;this.add.emit(t+(Math.random()-.5)*r,e+Math.random()*.4,n+(Math.random()-.5)*r,(Math.random()-.5)*1.2,1.5+Math.random()*2,(Math.random()-.5)*1.2,o,1.6,r*.5,r*.4,.35+Math.random()*.35,-1,1)}}muzzle(t,e,n,i,r,a,o){const l=We[o],h=o==="rail"?3.2:o==="volt"?.9:o==="nova"?2.2:2.4;this.flash(t,e,n,l,h,o==="volt"?.05:.09,2.4),o!=="volt"&&this.light(t,e,n,l,o==="rail"?40:18,.08);const c=o==="volt"?2:o==="rail"?10:6;for(let u=0;u<c;u++){const d=4+Math.random()*8;this.add.emit(t,e,n,i*d+(Math.random()-.5)*3,r*d+Math.random()*2,a*d+(Math.random()-.5)*3,l,2,.16,-.1,.18,4,4)}(o==="nova"||o==="plasma")&&this.smokePuff(t,e,n,2,.8,.1,.8)}impact(t,e,n,i,r,a,o,l){const h=We[o];if(o==="volt"){this.sparks(t,e,n,i,r,a,h,l?6:3,6),this.flash(t,e,n,h,1.2,.06);return}o!=="nova"&&(this.sparks(t,e,n,i,r,a,l?16765578:h,o==="rail"?22:12,o==="rail"?14:9),this.flash(t,e,n,h,o==="rail"?3.4:2.2,.12),this.light(t,e,n,h,16,.12),l||this.smokePuff(t,e,n,2,.9,.12,1),!l&&r>.7&&o==="rail"&&this.scorch(t,e,n,1.6))}explosion(t,e,n,i,r,a){const o=i>5;this.flash(t,e,n,16777215,i*1.4,.12,2.6),this.flash(t,e,n,r,i*2.2,.32,2),this.light(t,e+1,n,r,o?70:30,.35),this.sparks(t,e,n,0,1,0,16760944,o?26:12,o?16:10),this.fire(t,e,n,o?18:8,i*.45),this.smokePuff(t,e+.5,n,o?10:4,i*.7,.1,2.2),a!==null&&(this.ring(t,a+.1,n,r,i,.45),this.scorch(t,a,n,i*1.1))}tankDestroyed(t,e,n,i){this.explosion(t,e+1.2,n,7,16747069,e),this.flash(t,e+1.5,n,i,10,.5,1.6),this.ring(t,e+.15,n,i,9,.7);for(let r=0;r<10;r++){const a=this.debrisState[this.debrisIdx];this.debrisIdx=(this.debrisIdx+1)%this.debrisState.length,a.x=t,a.y=e+1.2,a.z=n;const o=Math.random()*Math.PI*2,l=4+Math.random()*8;a.vx=Math.cos(o)*l,a.vz=Math.sin(o)*l,a.vy=5+Math.random()*9,a.rx=Math.random()*6,a.ry=Math.random()*6,a.spin=(Math.random()-.5)*14,a.t=3.5+Math.random(),a.s=.25+Math.random()*.45}}spawnBeam(t,e,n,i){this.column(t,e,n,i),this.ring(t,e+.1,n,i,4,.6);for(let r=0;r<16;r++){const a=r/16*Math.PI*2;this.add.emit(t+Math.cos(a)*2,e+.2,n+Math.sin(a)*2,0,4+Math.random()*4,0,i,2,.25,-.15,.7,0,1)}}pickupBurst(t,e,n,i){this.ring(t,e+.2,n,i,4,.5),this.flash(t,e+1.5,n,i,4,.3);for(let r=0;r<18;r++)this.add.emit(t,e+1.5,n,(Math.random()-.5)*6,2+Math.random()*5,(Math.random()-.5)*6,i,2,.22,-.1,.6,6,2)}shockwave(t,e,n){this.ring(t,e+.2,n,We.shockwave,12,.55),this.ring(t,e+.6,n,16777215,8,.35),this.flash(t,e+1,n,We.shockwave,9,.25),this.light(t,e+1,n,We.shockwave,60,.3);for(let i=0;i<40;i++){const r=i/40*Math.PI*2;this.add.emit(t,e+.4,n,Math.cos(r)*18,1+Math.random()*2,Math.sin(r)*18,We.shockwave,2,.35,.2,.5,2,2.5)}this.smokePuff(t,e+.3,n,8,3,.08,1.4)}updateProjectiles(t,e){let n=0,i=0,r=0,a=0;const o=this.shots.get("plasma"),l=this.glows.get("plasma"),h=this.shots.get("volt"),c=this.glows.get("volt"),u=this.shots.get("rail"),d=this.glows.get("rail"),f=this.shots.get("nova"),g=this.glows.get("nova");this.trailTimer-=e;const v=this.trailTimer<=0;v&&(this.trailTimer=.03);for(const m of t){if(!m.active)continue;const p=Math.hypot(m.vx,m.vy,m.vz)||1;_n.set(m.vx/p,m.vy/p,m.vz/p),ei.setFromUnitVectors(jc,_n);const _=m.weapon.projectile;_==="plasma"&&n<96?(Me.compose(ns.set(m.x,m.y,m.z),ei,_n.set(1,1,1)),o.setMatrixAt(n,Me),Me.compose(ns.set(m.x,m.y,m.z),ei,_n.set(1,1,Math.min(4,p*.045))),l.setMatrixAt(n,Me),n++):_==="volt"&&i<160?(Me.compose(ns.set(m.x,m.y,m.z),ei,_n.set(1,1,1.6)),h.setMatrixAt(i,Me),c.setMatrixAt(i,Me),i++):_==="rail"&&r<16?(Me.compose(ns.set(m.x,m.y,m.z),ei,_n.set(1,1,7)),u.setMatrixAt(r,Me),d.setMatrixAt(r,Me),r++):_==="nova"&&a<64&&(Me.compose(ns.set(m.x,m.y,m.z),ei,_n.set(1,1,1)),f.setMatrixAt(a,Me),g.setMatrixAt(a,Me),a++,v&&(this.smoke.emit(m.x,m.y,m.z,(Math.random()-.5)*.6,.4,(Math.random()-.5)*.6,3816772,1,.35,1.1,.9,-.2,1.5),this.add.emit(m.x,m.y,m.z,0,0,0,We.nova,1.5,.3,-.25,.12,0,0)))}ti(o,n),ti(l,n),ti(h,i),ti(c,i),ti(u,r),ti(d,r),ti(f,a),ti(g,a)}update(t){this.add.update(t),this.smoke.update(t);for(const n of this.flashes){if(!n.obj.visible)continue;if(n.t-=t,n.t<=0){n.obj.visible=!1;continue}const i=n.t/n.dur,r=n.size*(1.2-i*.4);n.obj.scale.set(r,r,1),n.obj.material.opacity=i}for(const n of this.rings){if(!n.obj.visible)continue;if(n.t-=t,n.t<=0){n.obj.visible=!1;continue}const i=1-n.t/n.dur,r=n.size*(.15+.85*Math.sqrt(i));n.obj.scale.set(r,r,r),n.obj.material.opacity=1-i}for(const n of this.beams){if(!n.obj.visible)continue;if(n.t-=t,n.t<=0){n.obj.visible=!1;continue}const i=n.t/n.dur,r=n.size*(.4+.6*i);n.obj.scale.x=r,n.obj.scale.y=r,n.obj.material.opacity=i}for(const n of this.scorches)if(n.obj.visible){if(n.t-=t,n.t<=0){n.obj.visible=!1;continue}n.obj.material.opacity=Math.min(1,n.t/4)*.85}for(const n of this.columns){if(!n.obj.visible)continue;if(n.t-=t,n.t<=0){n.obj.visible=!1;continue}const i=n.t/n.dur;n.obj.material.opacity=i*.6,n.obj.scale.set(.6+.6*(1-i),1,.6+.6*(1-i))}for(const n of this.lights)if(n.obj.visible){if(n.t-=t,n.t<=0){n.obj.visible=!1,n.obj.intensity=0;continue}n.obj.intensity=n.size*(n.t/n.dur)*12}let e=!1;for(let n=0;n<this.debrisState.length;n++){const i=this.debrisState[n];if(i.t<=0)continue;e=!0,i.t-=t,i.vy-=22*t,i.x+=i.vx*t,i.y+=i.vy*t,i.z+=i.vz*t,i.y<.15&&i.vy<0&&(i.y=.15,i.vy*=-.3,i.vx*=.6,i.vz*=.6,i.spin*=.5),i.rx+=i.spin*t,i.ry+=i.spin*.7*t;const r=i.t>0?i.s*Math.min(1,i.t):0;ei.setFromAxisAngle(Hv,i.ry),Me.compose(ns.set(i.x,i.y,i.z),ei,_n.set(r,r*.6,r*1.4)),this.debris.setMatrixAt(n,Me),Math.random()<t*6&&i.t>1&&this.smoke.emit(i.x,i.y,i.z,0,.6,0,2500654,1,.3,.8,.8,-.2,1)}e&&(this.debris.instanceMatrix.needsUpdate=!0)}clear(){this.add.clear(),this.smoke.clear();for(const t of[this.flashes,this.rings,this.beams,this.scorches,this.columns])for(const e of t)e.obj.visible=!1,e.t=0;for(const t of this.lights)t.obj.visible=!1,t.t=0;for(let t=0;t<this.debrisState.length;t++)this.debrisState[t].t=0,Me.makeScale(0,0,0),this.debris.setMatrixAt(t,Me);this.debris.instanceMatrix.needsUpdate=!0}dispose(){this.group.removeFromParent(),this.add.dispose(),this.smoke.dispose(),this.geos.forEach(t=>t.dispose()),this.mats.forEach(t=>t.dispose())}}function Gv(s,t){return s.team==="blue"?s.id===t?s.paint.accent:Xt.blue:s.team==="magenta"?Xt.magenta:s.id===t?s.paint.accent:s.isBot?[Xt.magenta,16732026,13650943,16738877][s.id%4]:Xt.magenta}class Wv{constructor(t,e,n,i){y(this,"model");y(this,"tank");y(this,"visY",0);y(this,"hitFlash",0);y(this,"wasAlive",!1);y(this,"wreckTime",0);y(this,"popY",0);y(this,"popVy",0);y(this,"popSpin",0);y(this,"popTilt",0);y(this,"smokeTimer",0);y(this,"accent");this.tank=t,this.accent=Gv(t,e),this.model=new eu({hull:t.hull.id,weapon:t.weapon.id,body:t.paint.body,metal:t.paint.metal,accent:this.accent,light:t.team==="magenta"?16743129:14219007},n,i),this.visY=t.y}get accentColor(){return this.accent}onHit(){this.hitFlash=Math.min(1,this.hitFlash+.6)}onDestroyed(){this.wreckTime=0,this.popY=0,this.popVy=9+Math.random()*4,this.popSpin=(Math.random()-.5)*9,this.popTilt=(Math.random()-.5)*1.5}update(t,e,n){const i=this.tank,r=this.model;i.alive&&!this.wasAlive&&(this.visY=i.y,r.setWreck(0),r.turret.position.set(0,i.hull.turretHeight,0),r.turret.rotation.set(0,0,0),r.root.visible=!0),this.wasAlive=i.alive;const a=i.y-this.visY;if(this.visY+=Math.abs(a)>3?a:a*Math.min(1,t*18),r.root.position.set(i.x,this.visY,i.z),r.hull.rotation.set(-i.tiltPitch,i.heading,i.tiltRoll,"YXZ"),i.alive){Kc.set(0,i.hull.turretHeight,0).applyEuler(r.hull.rotation),r.turret.position.copy(Kc),r.turret.rotation.set(0,i.turretYaw,0),r.barrelPivot.rotation.x=-i.barrelPitch,r.recoil.position.z=-i.recoil*i.recoil*i.weapon.recoil*1.2,r.setTracks(i.trackL,i.trackR);const o=i.shieldTimer>0;if(r.setShield(o||i.spawnProtect>0,e,o?Math.min(1,i.shieldTimer*2):.18+.08*Math.sin(e*14)),this.hitFlash=Math.max(0,this.hitFlash-t*9),r.setHitFlash(this.hitFlash),this.smokeTimer-=t,this.smokeTimer<=0){this.smokeTimer=.05;const l=i.health/i.maxHealth,h=i.hull.length*.5,c=i.x-Math.sin(i.heading)*h,u=i.z-Math.cos(i.heading)*h;if(i.boosting||i.dashTimer>0){const d=i.dashTimer>0?16777215:i.nitro>0?Xt.cyan:this.accent;n.flash(c,this.visY+.9,u,d,i.dashTimer>0?3:1.6,.08,1.6)}l<.35&&(n.smokePuff(i.x,this.visY+i.hull.turretHeight,i.z,1,1.4,.06,1.5),l<.18&&Math.random()<.5&&n.fire(i.x,this.visY+i.hull.turretHeight*.8,i.z,1,.8))}}else{this.wreckTime+=t,r.setWreck(Math.min(1,this.wreckTime*3)),r.setShield(!1,e,0),this.popVy-=24*t,this.popY+=this.popVy*t,this.popY<0&&(this.popY=0,this.popVy*=-.25,this.popSpin*=.4),r.turret.position.y=i.hull.turretHeight+this.popY,r.turret.rotation.y+=this.popSpin*t,r.turret.rotation.z=Math.min(Math.abs(this.popTilt),this.wreckTime*2)*Math.sign(this.popTilt),this.smokeTimer-=t,this.smokeTimer<=0&&(this.smokeTimer=.09,n.smokePuff(i.x,this.visY+1,i.z,1,2.2,.05,2.4),this.wreckTime<2.2&&n.fire(i.x,this.visY+.8,i.z,2,1.4));const o=Math.max(0,this.wreckTime-3)*1.2;r.root.position.y=this.visY-o,r.root.visible=o<2.5}}dispose(){this.model.dispose()}}const Kc=new D;class Xv{constructor(t,e){y(this,"scene",new Zr);y(this,"arena");y(this,"views");y(this,"fx");y(this,"sun");y(this,"world");this.world=t;const n=e.preset,i=t.arena;this.scene.fog=new aa(i.fog.color,i.fog.density),this.scene.background=new yt(i.sky.bottom);const r=new Jh(9414911,1708080,1.15);if(this.scene.add(r),this.sun=new zc(i.id==="docks"?10470655:13150463,1.5),this.sun.position.set(-50,90,-35),this.sun.castShadow=n.shadows,n.shadows){this.sun.shadow.mapSize.set(n.shadowMap,n.shadowMap);const l=this.sun.shadow.camera,h=i.half+6;l.left=-h,l.right=h,l.top=h,l.bottom=-h,l.near=10,l.far=260,this.sun.shadow.bias=-5e-4,this.sun.shadow.normalBias=.05}this.scene.add(this.sun,this.sun.target);const a=new zc(i.id==="docks"?16732104:5232895,.55);a.position.set(60,30,50),this.scene.add(a),this.arena=new Bv(i,e.env,n,t.mode==="cp"),this.scene.add(this.arena.group);const o=t.player?t.player.id:-1;this.views=t.tanks.map(l=>new Wv(l,o,e.env,n.shadows));for(const l of this.views)this.scene.add(l.model.root);this.fx=new Vv(900,n.maxLights>0?3:0),this.fx.setParticleLimit(n.particles),this.scene.add(this.fx.group)}handle(t){const e=this.world;switch(t.type){case"fire":{const n=Ee[t.kind].projectile;this.fx.muzzle(t.x,t.y,t.z,t.x2,t.y2,t.z2,n);break}case"charge":{e.tanks[t.a].muzzle(Ur),this.fx.flash(Ur.x,Ur.y,Ur.z,We.rail,1.6,Ee.rail.charge,1.4);break}case"beam":this.fx.beam(t.x,t.y,t.z,t.x2,t.y2,t.z2,We.rail,.09,.45),this.fx.beam(t.x,t.y,t.z,t.x2,t.y2,t.z2,7331071,.35,.3);break;case"impact":{const n=Ee[t.kind].projectile;this.fx.impact(t.x,t.y,t.z,t.x2,t.y2,t.z2,n,t.a>=0),t.a>=0&&this.views[t.a].onHit();break}case"explode":{if(t.kind==="shockwave"){const n=e.tanks[t.a];this.fx.shockwave(n.x,n.y,n.z)}else{const n=e.collision.surfaceHeight(t.x,t.z,t.y+.5);this.fx.explosion(t.x,t.y,t.z,t.value,We.nova,t.y-n<1.2?n:null)}break}case"kill":{const n=this.views[t.a];n.onDestroyed(),this.fx.tankDestroyed(t.x,t.y,t.z,n.accentColor);break}case"spawn":{const n=e.tanks[t.a];this.fx.spawnBeam(n.x,n.y,n.z,this.views[t.a].accentColor);break}case"pickup":{const n=t.kind==="repair"?Xt.green:t.kind==="overdrive"?Xt.amber:Xt.cyan;this.fx.pickupBurst(t.x,t.y,t.z,n);break}case"capture":{const n=e.arena.controlPoint;this.fx.ring(n.x,n.y+.2,n.z,t.kind==="blue"?Xt.blue:Xt.magenta,n.r*1.4,.9),this.fx.flash(n.x,n.y+4,n.z,t.kind==="blue"?Xt.blue:Xt.magenta,12,.6);break}case"ability":{const n=e.tanks[t.a];t.kind==="dash"&&this.fx.ring(n.x,n.y+.8,n.z,16777215,4,.3,!1),t.kind==="aegis"&&this.fx.flash(n.x,n.y+1.5,n.z,8382975,8,.3);break}}}update(t,e){ds.value=e;for(const n of this.views)n.update(t,e,this.fx);this.fx.updateProjectiles(this.world.projectiles.items,t),this.fx.update(t),this.arena.update(e,this.world.mode==="cp"?this.world.cp:null,this.world.pickups)}dispose(){this.views.forEach(t=>t.dispose()),this.arena.dispose(),this.fx.dispose(),this.sun.shadow.map?.dispose(),this.scene.clear()}}const Ur={x:0,y:0,z:0},iu={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class ws{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Yv=new sl(-1,1,1,-1,0,1);class qv extends ye{constructor(){super(),this.setAttribute("position",new Kt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Kt([0,2,0,0,2,0],2))}}const $v=new qv;class gl{constructor(t){this._mesh=new kt($v,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Yv)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Zv extends ws{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof me?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=qs.clone(t.uniforms),this.material=new me({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new gl(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Jc extends ws{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const i=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class jv extends ws{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Kv{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new et);this._width=n.width,this._height=n.height,e=new gn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:On}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Zv(iu),this.copyPass.material.blending=zn,this.clock=new sv}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Jc!==void 0&&(a instanceof Jc?n=!0:a instanceof jv&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new et);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const Jv={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Qv extends ws{constructor(){super();const t=Jv;this.uniforms=qs.clone(t.uniforms),this.material=new Qg({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new gl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},$t.getTransfer(this._outputColorSpace)===se&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ch?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===hh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===uh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Zo?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===dh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===fh&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class tx extends ws{constructor(t,e,n=null,i=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new yt}render(t,e,n){const i=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=i}}const ex={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new yt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ys extends ws{constructor(t,e,n,i){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new et(t.x,t.y):new et(256,256),this.clearColor=new yt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new gn(r,a,{type:On}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new gn(r,a,{type:On});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new gn(r,a,{type:On});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),a=Math.round(a/2)}const o=ex;this.highPassUniforms=qs.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new me({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new et(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const c=iu;this.copyUniforms=qs.clone(c.uniforms),this.blendMaterial=new me({uniforms:this.copyUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,blending:Ve,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new yt,this.oldClearAlpha=1,this.basic=new Ae,this.fsQuad=new gl(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new et(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=ys.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ys.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=a}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new me({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new et(.5,.5)},direction:{value:new et(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new me({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}ys.BlurDirectionX=new et(1,0);ys.BlurDirectionY=new et(0,1);const Qc={low:{maxPixelRatio:.85,shadows:!1,shadowMap:0,bloom:!1,maxLights:0,particles:260,antialias:!1},medium:{maxPixelRatio:1,shadows:!0,shadowMap:1024,bloom:!0,maxLights:4,particles:520,antialias:!1},high:{maxPixelRatio:1.5,shadows:!0,shadowMap:2048,bloom:!0,maxLights:10,particles:900,antialias:!0}};class nx{constructor(t,e){y(this,"renderer");y(this,"env");y(this,"composer",null);y(this,"renderPass",null);y(this,"bloom",null);y(this,"envTarget");y(this,"preset");y(this,"level");y(this,"width",1);y(this,"height",1);y(this,"scale",1);this.level=e,this.preset=Qc[e],this.renderer=new pg({canvas:t,antialias:this.preset.antialias,powerPreference:"high-performance",stencil:!1}),this.renderer.outputColorSpace=Ye,this.renderer.toneMapping=Zo,this.renderer.toneMappingExposure=1,this.renderer.shadowMap.type=oh,this.envTarget=this.buildEnvironment(),this.env=this.envTarget.texture,this.applyQuality()}buildEnvironment(){const t=new Zr;t.background=new yt(329485);const e=new kt(new Re(30,14,30),new Ae({color:724760,side:Fe}));t.add(e);const n=(o,l,h,c,u,d,f,g=3)=>{const v=new kt(new pn(u,d),new Ae({color:new yt(o).multiplyScalar(g),side:qe}));v.position.set(l,h,c),v.rotation.y=f,t.add(v)};n(3076863,-14.5,4,0,18,1.2,Math.PI/2),n(16723912,14.5,4,0,18,1.2,-Math.PI/2),n(7044351,0,3,-14.5,12,.8,0),n(16756782,0,2,14.5,8,.6,Math.PI,2);const i=new kt(new pn(20,6),new Ae({color:new yt(9417983).multiplyScalar(.45)}));i.position.y=6.9,i.rotation.x=Math.PI/2,t.add(i);const r=new Bo(this.renderer),a=r.fromScene(t,.04);return r.dispose(),t.traverse(o=>{const l=o;l.geometry&&l.geometry.dispose(),l.material&&l.material.dispose()}),a}setQuality(t){this.level=t,this.preset=Qc[t],this.scale=1,this.applyQuality()}applyQuality(){const t=this.preset;this.renderer.shadowMap.enabled=t.shadows,this.renderer.shadowMap.needsUpdate=!0,t.bloom&&!this.composer&&(this.composer=new Kv(this.renderer),this.renderPass=new tx(new Zr,new Ne),this.composer.addPass(this.renderPass),this.bloom=new ys(new et(256,256),.42,.35,.9),this.composer.addPass(this.bloom),this.composer.addPass(new Qv)),this.bloom&&(this.bloom.enabled=t.bloom),this.resize(this.width,this.height)}get pixelRatio(){return Math.min(window.devicePixelRatio||1,this.preset.maxPixelRatio)*this.scale}resize(t,e){this.width=Math.max(1,t),this.height=Math.max(1,e);const n=this.pixelRatio;this.renderer.setPixelRatio(n),this.renderer.setSize(this.width,this.height,!1),this.composer&&this.bloom&&(this.composer.setPixelRatio(n),this.composer.setSize(this.width,this.height),this.bloom.resolution.set(this.width*n/2,this.height*n/2))}get size(){return{w:this.width,h:this.height}}render(t,e){this.preset.bloom&&this.composer&&this.renderPass?(this.renderPass.scene=t,this.renderPass.camera=e,this.composer.render()):this.renderer.render(t,e)}dispose(){this.composer?.dispose(),this.bloom?.dispose(),this.envTarget.dispose(),Nv(),Rv(),this.renderer.dispose()}}const is={l:6.1,w:2.5,h:2.6};class su{constructor(){y(this,"boxes",[]);y(this,"ramps",[]);y(this,"decor",[])}solid(t,e,n,i,r,a,o,l={}){const h={minX:Math.min(t,i),minY:Math.min(e,r),minZ:Math.min(n,a),maxX:Math.max(t,i),maxY:Math.max(e,r),maxZ:Math.max(n,a),mat:o,blocksTanks:l.blocksTanks??!0,blocksShots:l.blocksShots??!0,walkable:l.walkable??Math.abs(r-e)>=2.4,trim:l.trim??"none",hidden:l.hidden};return this.boxes.push(h),h}block(t,e,n,i,r,a,o={},l=0){return this.solid(t-n/2,l,e-i/2,t+n/2,l+r,e+i/2,a,o)}container(t,e,n,i,r,a=0){const o=n?is.w:is.l,l=n?is.l:is.w;for(let h=0;h<i;h++)this.block(t,e,o,l,is.h,h%2===0?r:ix(r),{trim:h===i-1?sx(r):"none"},a+h*is.h)}ramp(t,e,n,i,r,a,o,l,h,c={}){let u,d,f,g;n==="x"?(f=e-a/2,g=e+a/2,i===1?(u=t,d=t+r):(u=t-r,d=t)):(u=t-a/2,d=t+a/2,i===1?(f=e,g=e+r):(f=e-r,g=e));const v={minX:u,maxX:d,minZ:f,maxZ:g,axis:n,dir:i,h0:o,h1:l,mat:h,bridge:c.bridge};return this.ramps.push(v),(c.rails??!0)&&this.rails(v),v}rails(t){for(let i=0;i<5;i++){const r=i/5,a=(i+1)/5,o=t.h0+(t.h1-t.h0)*a+1.15,l=t.bridge?Math.max(0,t.h0+(t.h1-t.h0)*r-.6):0;if(t.axis==="x"){const h=t.maxX-t.minX,c=t.dir===1?t.minX+h*r:t.maxX-h*a,u=t.dir===1?t.minX+h*a:t.maxX-h*r;this.solid(c,l,t.minZ-.45,u,o,t.minZ,"trim",{walkable:!1,trim:"none"}),this.solid(c,l,t.maxZ,u,o,t.maxZ+.45,"trim",{walkable:!1,trim:"none"})}else{const h=t.maxZ-t.minZ,c=t.dir===1?t.minZ+h*r:t.maxZ-h*a,u=t.dir===1?t.minZ+h*a:t.maxZ-h*r;this.solid(t.minX-.45,l,c,t.minX,o,u,"trim",{walkable:!1,trim:"none"}),this.solid(t.maxX,l,c,t.maxX+.45,o,u,"trim",{walkable:!1,trim:"none"})}}}rail(t,e,n,i,r,a=1.2){this.solid(t,r,e,n,r+a,i,"trim",{walkable:!1})}boundary(t,e){this.solid(-t-2,0,-t-2,t+2,e,-t,"boundary",{walkable:!1,trim:"cyan"}),this.solid(-t-2,0,t,t+2,e,t+2,"boundary",{walkable:!1,trim:"cyan"}),this.solid(-t-2,0,-t,-t,e,t,"boundary",{walkable:!1,trim:"cyan"}),this.solid(t,0,-t,t+2,e,t,"boundary",{walkable:!1,trim:"cyan"})}mirror(t){t(1),t(-1)}}function ix(s){switch(s){case"containerCyan":return"containerSteel";case"containerMagenta":return"containerAmber";case"containerSteel":return"containerCyan";default:return"containerMagenta"}}function sx(s){return s==="containerMagenta"||s==="containerAmber"?"magenta":"cyan"}const Xe=Math.PI/2;function rx(){const s=new su,t=72;s.boundary(t,6),s.block(0,0,24,24,3,"deck",{trim:"cyan"}),s.mirror(a=>{s.ramp(-26*a,0,"x",a,14,10,0,3,"deck"),s.container(-7*a,8.5*a,!1,1,"containerCyan",3),s.container(8.5*a,7*a,!0,1,"containerMagenta",3),s.block(0,44*a,60,8,5.5,"metal",{trim:a===1?"magenta":"cyan"}),s.ramp(-46*a,44*a,"x",a,16,8,0,5.5,"metal"),s.ramp(46*a,44*a,"x",a===1?-1:1,16,8,0,5.5,"metal"),s.rail(-30,47.6*a,30,48*a,5.5),s.rail(-30*a,40*a,-12*a,40.4*a,5.5),s.rail(12*a,40*a,30*a,40.4*a,5.5),s.ramp(0,12*a,"z",a,28,8,3,5.5,"metal",{bridge:!0}),s.block(5.3,26*a,.9,.9,4.3,"darkMetal",{walkable:!1}),s.block(-5.3,26*a,.9,.9,4.3,"darkMetal",{walkable:!1}),s.container(-52*a,22*a,!0,2,"containerCyan"),s.container(-40*a,31*a,!1,1,"containerMagenta"),s.container(-34*a,18*a,!0,1,"containerSteel"),s.container(-22*a,29*a,!1,2,"containerAmber"),s.container(-20*a,18*a,!1,1,"containerCyan"),s.container(24*a,20*a,!0,1,"containerMagenta"),s.container(36*a,28*a,!1,2,"containerSteel"),s.container(50*a,18*a,!1,1,"containerAmber"),s.container(52*a,30*a,!0,1,"containerCyan"),s.container(-15*a,60*a,!1,1,"containerSteel"),s.container(14*a,62*a,!1,2,"containerMagenta"),s.container(-40*a,63*a,!0,1,"containerAmber"),s.block(-62*a,30*a,1.6,1.6,16,"darkMetal",{walkable:!1}),s.block(-62*a,-30*a,1.6,1.6,16,"darkMetal",{walkable:!1}),s.block(-34*a,8*a,1,4.5,1.3,"concrete",{trim:"amber"}),s.block(-34*a,-8*a,1,4.5,1.3,"concrete",{trim:"amber"}),s.block(-54*a,9*a,1,4.5,1.3,"concrete",{trim:"amber"}),s.block(-54*a,-9*a,1,4.5,1.3,"concrete",{trim:"amber"}),s.block(11*a,33*a,4.5,1,1.3,"concrete",{trim:"amber"}),s.block(-11*a,33*a,4.5,1,1.3,"concrete",{trim:"amber"})}),s.decor.push({kind:"water",y:-1.4}),s.mirror(a=>{s.decor.push({kind:"crane",x:-62*a,z:0,yaw:0,h:16}),s.decor.push({kind:"sign",x:0,y:2.8,z:39.9*a,yaw:a===1?Math.PI:0,w:12,h:2.2,text:a===1?"DOCK 07":"DOCK 12",color:a===1?"magenta":"cyan"}),s.decor.push({kind:"sign",x:-38*a,y:4.2,z:31*a-1.3*a,yaw:a===1?Math.PI:0,w:5,h:1.2,text:"KAIRO FREIGHT",color:"amber"}),s.decor.push({kind:"strip",x0:-30,z0:40.1*a,x1:30,z1:40.1*a,y:5.45,color:a===1?"magenta":"cyan"}),s.decor.push({kind:"strip",x0:-12,z0:12.05*a,x1:12,z1:12.05*a,y:2.95,color:"cyan"}),s.decor.push({kind:"light",x:0,y:9,z:44*a,color:a===1?"magenta":"cyan",intensity:30,range:34}),s.decor.push({kind:"light",x:-46*a,y:7,z:-2*a,color:a===1?"cyan":"magenta",intensity:24,range:30}),s.decor.push({kind:"pylon",x:-66*a,z:66*a,h:12,color:"cyan"}),s.decor.push({kind:"pylon",x:66*a,z:66*a,h:12,color:"magenta"}),s.decor.push({kind:"pylon",x:0,z:68*a,h:9,color:a===1?"magenta":"cyan"})}),s.decor.push({kind:"holo",x:0,y:3,z:0,r:8,color:"cyan"}),s.decor.push({kind:"light",x:0,y:10,z:0,color:"cyan",intensity:40,range:30});const e=[-18,-6,6,18].map(a=>({x:-59,y:0,z:a,yaw:Xe})),n=e.map(a=>({x:-a.x,y:0,z:-a.z,yaw:-Xe})),i=[{x:-59,y:0,z:-15,yaw:Xe},{x:-59,y:0,z:15,yaw:Xe},{x:59,y:0,z:15,yaw:-Xe},{x:59,y:0,z:-15,yaw:-Xe},{x:0,y:0,z:56,yaw:Math.PI},{x:0,y:0,z:-56,yaw:0},{x:-56,y:0,z:58,yaw:Math.PI*.75},{x:56,y:0,z:-58,yaw:-Math.PI*.25},{x:40,y:0,z:0,yaw:-Xe},{x:-40,y:0,z:0,yaw:Xe}],r=[{kind:"repair",x:0,y:0,z:30},{kind:"repair",x:0,y:0,z:-30},{kind:"overdrive",x:0,y:5.5,z:44},{kind:"overdrive",x:0,y:5.5,z:-44},{kind:"nitro",x:-44,y:0,z:0},{kind:"nitro",x:44,y:0,z:0}];return{id:"docks",name:"NEON DOCKS",subtitle:"Container port · elevated walkways · central pier",half:t,boxes:s.boxes,ramps:s.ramps,spawns:{blue:e,magenta:n,ffa:i},controlPoint:{x:0,y:3,z:0,r:8},pickups:r,decor:s.decor,fog:{color:660516,density:.0115},sky:{top:132108,bottom:1056826}}}function ax(){const s=new su,t=66;s.boundary(t,7),s.block(0,0,30,30,4,"lab",{trim:"magenta"}),s.block(0,0,6,6,5.5,"labDark",{walkable:!1,trim:"cyan"},4),s.mirror(a=>{s.ramp(-27*a,6*a,"x",a,12,9,0,4,"lab"),s.ramp(-6*a,-27*a,"z",a,12,9,0,4,"lab"),s.rail(-15*a,14.6*a,-10*a,15*a,4,1.3),s.rail(10*a,14.6*a,15*a,15*a,4,1.3),s.block(-9*a,11*a,3,2,1.7,"labDark",{trim:"cyan"},4),s.block(11*a,9*a,2,3,1.7,"labDark",{trim:"magenta"},4),s.block(-58*a,0,16,44,6,"lab",{trim:"cyan"}),s.ramp(-60*a,-36*a,"z",a,14,12,0,6,"lab"),s.ramp(-60*a,36*a,"z",a===1?-1:1,14,12,0,6,"lab"),s.rail(-50*a,-22*a,-49.6*a,-14*a,6),s.rail(-50*a,14*a,-49.6*a,22*a,6),s.ramp(-15*a,-9.5*a,"x",a===1?-1:1,35,6.5,4,6,"metal",{bridge:!0}),s.block(-32*a,-13.6*a,1,1,4.6,"darkMetal",{walkable:!1}),s.block(-32*a,-5.4*a,1,1,4.6,"darkMetal",{walkable:!1}),s.block(-30*a,-44*a,18,14,8,"labDark",{walkable:!1,trim:"magenta"}),s.block(30*a,-44*a,18,14,8,"labDark",{walkable:!1,trim:"cyan"}),s.block(-42.5*a,-44*a,7,.4,3.2,"barrier",{walkable:!1,blocksShots:!1}),s.block(0,-34*a,12,.4,3.2,"barrier",{walkable:!1,blocksShots:!1}),s.block(-22*a,22*a,2.5,2.5,7,"labDark",{walkable:!1,trim:"cyan"}),s.block(22*a,22*a,2.5,2.5,7,"labDark",{walkable:!1,trim:"magenta"}),s.block(-38*a,0,1.2,6,1.4,"concrete",{trim:"amber"}),s.block(0,-49*a,8,1,1.4,"concrete",{trim:"amber"}),s.block(-14*a,-30*a,1,4,1.4,"concrete",{trim:"amber"})}),s.mirror(a=>{s.decor.push({kind:"sign",x:-30*a,y:5.6,z:-37*a+.05*a,yaw:a===1?0:Math.PI,w:9,h:1.8,text:a===1?"LAB 03 · VOID":"LAB 09 · VOID",color:a===1?"magenta":"cyan"}),s.decor.push({kind:"sign",x:30*a,y:5.6,z:-37*a+.05*a,yaw:a===1?0:Math.PI,w:9,h:1.8,text:"CONTAINMENT",color:a===1?"cyan":"magenta"}),s.decor.push({kind:"strip",x0:-15,z0:-15.05*a,x1:15,z1:-15.05*a,y:3.95,color:"magenta"}),s.decor.push({kind:"strip",x0:-50*a,z0:-22,x1:-50*a,z1:22,y:5.95,color:"cyan"}),s.decor.push({kind:"strip",x0:-21,z0:-30*a,x1:21,z1:-30*a,y:.03,color:a===1?"cyan":"magenta",w:.5}),s.decor.push({kind:"strip",x0:-44*a,z0:-26,x1:-44*a,z1:26,y:.03,color:"cyan",w:.5}),s.decor.push({kind:"light",x:-58*a,y:11,z:0,color:a===1?"cyan":"magenta",intensity:28,range:34}),s.decor.push({kind:"light",x:0,y:8,z:-42*a,color:a===1?"cyan":"magenta",intensity:22,range:26}),s.decor.push({kind:"pylon",x:-62*a,z:-62*a,h:11,color:"magenta"}),s.decor.push({kind:"pylon",x:62*a,z:-62*a,h:11,color:"cyan"})}),s.decor.push({kind:"holo",x:0,y:9.6,z:0,r:4,color:"magenta"}),s.decor.push({kind:"light",x:0,y:13,z:0,color:"magenta",intensity:46,range:36});const e=[-12,-4,4,12].map(a=>({x:a,y:0,z:-55,yaw:0})),n=e.map(a=>({x:-a.x,y:0,z:58,yaw:Math.PI})),i=[{x:-10,y:0,z:-55,yaw:0},{x:10,y:0,z:55,yaw:Math.PI},{x:10,y:0,z:-55,yaw:0},{x:-10,y:0,z:55,yaw:Math.PI},{x:-42,y:0,z:-56,yaw:Xe},{x:42,y:0,z:56,yaw:-Xe},{x:-40,y:0,z:24,yaw:Xe},{x:40,y:0,z:-24,yaw:-Xe},{x:-30,y:0,z:-20,yaw:Xe},{x:30,y:0,z:20,yaw:-Xe}],r=[{kind:"repair",x:-36,y:0,z:14},{kind:"repair",x:36,y:0,z:-14},{kind:"overdrive",x:-58,y:6,z:0},{kind:"overdrive",x:58,y:6,z:0},{kind:"nitro",x:0,y:0,z:-30},{kind:"nitro",x:0,y:0,z:30}];return{id:"void",name:"VOID COMPLEX",subtitle:"Research facility · reactor core · energy barriers",half:t,boxes:s.boxes,ramps:s.ramps,spawns:{blue:e,magenta:n,ffa:i},controlPoint:{x:0,y:4,z:0,r:11},pickups:r,decor:s.decor,fog:{color:1182242,density:.012},sky:{top:328204,bottom:2363450}}}const th=new Map;function ox(s){let t=th.get(s);return t||(t=s==="docks"?rx():ax(),th.set(s,t)),t}const lx=["docks","void"],Ws={docks:{name:"NEON DOCKS",subtitle:"Container port · elevated walkways · central pier"},void:{name:"VOID COMPLEX",subtitle:"Research facility · reactor core · energy barriers"}};class cx{constructor(t,e){y(this,"items",[]);y(this,"cursor",0);y(this,"serials",0);for(let n=0;n<t;n++)this.items.push({active:!1,slot:n,serial:0,owner:-1,weapon:e,x:0,y:0,z:0,vx:0,vy:0,vz:0,ox:0,oy:0,oz:0,life:0,dmgMult:1})}spawn(t,e,n,i,r,a,o,l,h){const c=this.items.length;let u=null;for(let d=0;d<c;d++){const f=this.items[(this.cursor+d)%c];if(!f.active){u=f,this.cursor=(f.slot+1)%c;break}}return u||(u=this.items[this.cursor],this.cursor=(this.cursor+1)%c),u.active=!0,u.serial=++this.serials,u.owner=t.id,u.weapon=l,u.x=u.ox=e,u.y=u.oy=n,u.z=u.oz=i,u.vx=r*l.speed,u.vy=a*l.speed,u.vz=o*l.speed,u.life=l.lifetime,u.dmgMult=h,u}clear(){for(const t of this.items)t.active=!1}}function ja(s,t,e,n,i,r,a,o,l,h){const c=s-a,u=t-o,d=e-l,f=n*n+i*i+r*r,g=c*n+u*i+d*r,v=c*c+u*u+d*d-h*h;if(v<=0)return 0;if(g>0||f<1e-12)return-1;const m=g*g-f*v;if(m<0)return-1;const p=(-g-Math.sqrt(m))/f;return p>=0&&p<=1?p:-1}function ru(s,t,e,n,i,r,a){const o=s.hull,l=Math.sin(s.heading),h=Math.cos(s.heading),c=o.length*.24,u=o.width*.5,d=s.y+.95;let f=-1,g=ja(t,e,n,i,r,a,s.x+l*c,d,s.z+h*c,u);return g>=0&&(f=g),g=ja(t,e,n,i,r,a,s.x-l*c,d,s.z-h*c,u),g>=0&&(f<0||g<f)&&(f=g),g=ja(t,e,n,i,r,a,s.x,s.y+o.turretHeight+.35,s.z,1.15),g>=0&&(f<0||g<f)&&(f=g),f}const ni={x:0,z:0};class hx{constructor(t,e,n){y(this,"tank");y(this,"diff");y(this,"rng");y(this,"state","roam");y(this,"targetId",-1);y(this,"targetVisible",!1);y(this,"lastSeenX",0);y(this,"lastSeenY",0);y(this,"lastSeenZ",0);y(this,"lastSeenTime",-99);y(this,"firstSeenTime",-99);y(this,"path",[]);y(this,"pathIdx",0);y(this,"goalX",0);y(this,"goalY",0);y(this,"goalZ",0);y(this,"hasGoal",!1);y(this,"repath",0);y(this,"think",0);y(this,"strafeDir",1);y(this,"strafeTimer",0);y(this,"progressTimer",0);y(this,"snapX",0);y(this,"snapZ",0);y(this,"unstuck",0);y(this,"unstuckSteer",1);y(this,"noiseYaw",0);y(this,"noisePitch",0);y(this,"noiseTY",0);y(this,"noiseTP",0);y(this,"noiseTimer",0);y(this,"losTimer",0);y(this,"abilityRoll",0);y(this,"unstuckCount",0);this.tank=t,this.diff=e,this.rng=new Qh(n),this.think=this.rng.range(0,e.think),t.turretMult=e.turretMult}reset(){this.state="roam",this.targetId=-1,this.targetVisible=!1,this.path.length=0,this.hasGoal=!1,this.repath=0,this.unstuck=0,this.progressTimer=0,this.snapX=this.tank.x,this.snapZ=this.tank.z}update(t,e){const n=this.tank,i=n.controls;if(!n.alive){i.throttle=0,i.steer=0,i.fire=!1,i.boost=!1,i.ability=!1,i.reload=!1;return}if(this.think-=e,this.think<=0&&(this.think=this.diff.think*this.rng.range(.8,1.2),this.decide(t)),this.losTimer-=e,this.losTimer<=0&&this.targetId>=0){this.losTimer=.2;const r=t.tanks[this.targetId];this.targetVisible=r.alive&&this.canSee(t,r),this.targetVisible&&this.markSeen(t,r)}this.steer(t,e),this.aim(t,e)}canSee(t,e){const n=this.tank;return Te(n.x,n.z,e.x,e.z)>this.diff.viewRange?!1:t.collision.segmentClear(n.x,n.y+n.pivotHeight,n.z,e.x,e.y+1.1,e.z)}markSeen(t,e){t.time-this.lastSeenTime>2.5&&(this.firstSeenTime=t.time),this.lastSeenX=e.x,this.lastSeenY=e.y,this.lastSeenZ=e.z,this.lastSeenTime=t.time}decide(t){const e=this.tank;let n=null,i=1/0;for(const c of t.tanks){if(!c.alive||!e.isEnemyOf(c))continue;const u=Te(e.x,e.z,c.x,c.z);if(u>this.diff.viewRange||!this.canSee(t,c))continue;let d=u+c.health/c.maxHealth*18;c.id===this.targetId&&(d-=12),e.lastAttacker===c.id&&t.time-e.lastDamageTime<3&&(d-=20),c.spawnProtect>0&&(d+=25),d<i&&(i=d,n=c)}if(n)n.id!==this.targetId&&(this.firstSeenTime=t.time),this.targetId=n.id,this.targetVisible=!0,this.markSeen(t,n);else if(this.targetVisible=!1,e.lastAttacker>=0&&t.time-e.lastDamageTime<1.2){const c=t.tanks[e.lastAttacker];c.alive&&(this.targetId=c.id,this.lastSeenX=c.x,this.lastSeenY=c.y,this.lastSeenZ=c.z,this.lastSeenTime=t.time-1)}this.targetId>=0&&!t.tanks[this.targetId].alive&&(this.targetId=-1,this.targetVisible=!1);const r=e.health/e.maxHealth,a=this.targetVisible||t.time-e.lastDamageTime<2;let o;this.state==="retreat"&&r<this.diff.retreatHealth+.25&&t.time-e.lastDamageTime<8||r<this.diff.retreatHealth&&a?o="retreat":this.targetVisible?o="engage":this.targetId>=0&&t.time-this.lastSeenTime<6?o="pursue":o="roam";const l=o!==this.state;switch(this.state=o,o){case"retreat":(l||this.repath<=0)&&this.pickRetreat(t);break;case"engage":this.pickEngage(t);break;case"pursue":this.setGoal(t,this.lastSeenX,this.lastSeenY,this.lastSeenZ,l);break;case"roam":(l||!this.hasGoal||this.repath<=0||this.pathDone())&&this.pickRoam(t);break}const h=e.weapon;e.controls.reload=!this.targetVisible&&h.magazine>0&&e.ammo<h.magazine*.5,this.abilityRoll=this.rng.next()}pathDone(){return this.pathIdx>=this.path.length}setGoal(t,e,n,i,r){const a=Math.abs(e-this.goalX)+Math.abs(i-this.goalZ)>6;if(this.goalX=e,this.goalY=n,this.goalZ=i,this.hasGoal=!0,!r&&!a&&this.repath>0)return;const o=this.tank,l=t.nav.nearest(o.x,o.y,o.z),h=t.nav.nearest(e,n,i);this.pathIdx=0,t.nav.findPath(l,h,this.path)||(this.path.length=0),this.repath=2.5}pickRoam(t){const e=this.tank,n=this.rng;if(t.mode==="cp"){const r=t.arena.controlPoint;if(!(t.cp.owner===e.team&&!t.cp.contested)||n.next()<.55){const o=n.range(0,Math.PI*2),l=n.range(0,r.r*.6);this.setGoal(t,r.x+Math.sin(o)*l,r.y,r.z+Math.cos(o)*l,!0);return}}if(this.diff.tactics>.4)for(let r=0;r<t.pickups.length;r++){const a=t.pickups[r];if(!(!a.active||a.def.kind==="repair")&&Te(e.x,e.z,a.def.x,a.def.z)<35&&n.next()<.5){this.setGoal(t,a.def.x,a.def.y,a.def.z,!0);return}}if(n.next()<.65){let r=null,a=1/0;for(const o of t.tanks){if(!o.alive||!e.isEnemyOf(o))continue;const l=Te(e.x,e.z,o.x,o.z)*n.range(.7,1.3);l<a&&(a=l,r=o)}if(r){this.setGoal(t,r.x+n.range(-8,8),r.y,r.z+n.range(-8,8),!0);return}}const i=t.nav.nodes[n.int(0,t.nav.nodes.length)];this.setGoal(t,i.x,i.y,i.z,!0)}pickRetreat(t){const e=this.tank;let n=-1,i=70;for(let u=0;u<t.pickups.length;u++){const d=t.pickups[u];if(!d.active||d.def.kind!=="repair")continue;const f=Te(e.x,e.z,d.def.x,d.def.z);f<i&&(i=f,n=u)}if(n>=0){const u=t.pickups[n].def;this.setGoal(t,u.x,u.y,u.z,!0);return}const r=this.lastSeenX,a=this.lastSeenY+1.2,o=this.lastSeenZ;let l=-1,h=-1/0;const c=t.nav.nodes;for(let u=0;u<36;u++){const d=c[this.rng.int(0,c.length)],f=Te(e.x,e.z,d.x,d.z);if(f<8||f>40||t.collision.segmentClear(r,a,o,d.x,d.y+1.2,d.z))continue;const g=Te(r,o,d.x,d.z)-f*.6;g>h&&(h=g,l=d.id)}if(l>=0){const u=c[l];this.setGoal(t,u.x,u.y,u.z,!0)}else{const u=Fs(e.x-r,e.z-o);this.setGoal(t,e.x+Math.sin(u)*20,e.y,e.z+Math.cos(u)*20,!0)}}pickEngage(t){const e=this.tank,n=t.tanks[this.targetId],i=Te(e.x,e.z,n.x,n.z),r=e.weapon.preferredRange;if(this.strafeTimer-=this.diff.think,this.strafeTimer<=0&&(this.strafeTimer=this.rng.range(1.8,4),this.rng.next()<.5&&(this.strafeDir=-this.strafeDir)),i>r+10||Math.abs(n.y-e.y)>2.5){this.setGoal(t,n.x,n.y,n.z,!1);return}const a=Fs(e.x-n.x,e.z-n.z);let o=a+Math.PI/2*this.strafeDir*this.diff.strafe;i<r-8&&(o=a+.5*this.strafeDir);const l=9;let h=e.x+Math.sin(o)*l,c=e.z+Math.cos(o)*l;const u=(d,f)=>t.nav.drivable(e.x,e.y,e.z,d,e.y,f,e.radius+.3);if(!u(h,c)&&(this.strafeDir=-this.strafeDir,o=a+Math.PI/2*this.strafeDir,h=e.x+Math.sin(o)*l,c=e.z+Math.cos(o)*l,!u(h,c))){this.hasGoal=!1,this.path.length=0;return}this.goalX=h,this.goalY=e.y,this.goalZ=c,this.hasGoal=!0,this.path.length=0,this.pathIdx=0}steer(t,e){const n=this.tank,i=n.controls;if(this.repath-=e,this.unstuck>0){this.unstuck-=e,i.throttle=-.9,i.steer=this.unstuckSteer,i.boost=!1,this.unstuck<=0&&(this.repath=0,this.snapX=n.x,this.snapZ=n.z,this.progressTimer=0,this.forceRepath(t));return}if(Math.abs(i.throttle)>.35){if(this.progressTimer+=e,this.progressTimer>1.5){const v=Te(n.x,n.z,this.snapX,this.snapZ);if(this.progressTimer=0,this.snapX=n.x,this.snapZ=n.z,v<1.3){this.unstuck=.9,this.unstuckSteer=this.rng.next()<.5?-1:1,this.unstuckCount++;return}}}else this.progressTimer=0,this.snapX=n.x,this.snapZ=n.z;if(!this.hasGoal){i.throttle=0,i.steer=0;return}let r=this.goalX;this.goalY;let a=this.goalZ,o=!0;for(;this.pathIdx<this.path.length;){const v=t.nav.nodes[this.path[this.pathIdx]];if(Te(n.x,n.z,v.x,v.z)<3.4&&Math.abs(v.y-n.y)<2){this.pathIdx++;continue}r=v.x,v.y,a=v.z,o=!1;break}const l=Te(n.x,n.z,r,a);if(o&&l<3.5){i.throttle=0,i.steer=0,i.boost=!1,this.state==="roam"&&(this.hasGoal=!1);return}const h=Fs(r-n.x,a-n.z);let c=Js(n.heading,h),u;if(Math.abs(c)>2.3&&l<12&&this.state!=="roam")c=Js(n.heading,pl(h+Math.PI)),u=-1;else{const v=Math.abs(c);u=v<.45?1:v<1.1?.55:.12,o&&l<8&&(u*=.5)}let d=Je(c*2.4,-1,1);const f=u>=0?1:-1;if(ni.x=Math.sin(n.heading)*f,ni.z=Math.cos(n.heading)*f,this.probeBlocked(t,ni.x,ni.z)){const v=Math.sin(n.heading+.7*f),m=Math.cos(n.heading+.7*f),p=Math.sin(n.heading-.7*f),_=Math.cos(n.heading-.7*f),b=this.probeBlocked(t,v,m),x=this.probeBlocked(t,p,_);!b&&x?d=1:b&&!x&&(d=-1),u*=.5}for(const v of t.tanks){if(v===n||!v.alive||Math.abs(v.y-n.y)>2)continue;const m=v.x-n.x,p=v.z-n.z,_=Math.sqrt(m*m+p*p);if(_>7||_<.01||(m*ni.x+p*ni.z)/_<.6)continue;const x=ni.x*p-ni.z*m;d=Je(d+(x>0?-.8:.8),-1,1),u*=.7}i.throttle=u,i.steer=d;const g=this.path.length-this.pathIdx;i.boost=this.diff.tactics>.5&&n.boost>.45&&u>.9&&Math.abs(c)<.3&&(this.state==="retreat"||g>5)}probeBlocked(t,e,n){const i=this.tank,r=i.x+e*3.6,a=i.z+n*3.6,o=t.collision.surfaceHeight(r,a,i.y+1.6,0);return o<i.y-.5?!1:t.collision.circleBlocked(r,a,o,i.radius*.9)}forceRepath(t){this.hasGoal&&this.setGoal(t,this.goalX,this.goalY,this.goalZ,!0)}aim(t,e){const n=this.tank,i=n.controls,r=n.weapon;this.noiseTimer-=e,this.noiseTimer<=0&&(this.noiseTimer=this.rng.range(.35,.8),this.noiseTY=(this.rng.next()*2-1)*this.diff.aimError,this.noiseTP=(this.rng.next()*2-1)*this.diff.aimError*.5);const a=1-Math.exp(-4*e);this.noiseYaw+=(this.noiseTY-this.noiseYaw)*a,this.noisePitch+=(this.noiseTP-this.noisePitch)*a,i.fire=!1,i.ability=!1;const o=this.targetId>=0?t.tanks[this.targetId]:null;if(o&&o.alive&&this.targetVisible){const l=n.x,h=n.y+n.pivotHeight,c=n.z;let u=o.x,d=o.y+1,f=o.z;const g=Te(l,c,u,f),v=g/r.speed;u+=o.vx*v*this.diff.lead,f+=o.vz*v*this.diff.lead;const m=Te(l,c,u,f),_=.45+.55*Math.min(1,Math.hypot(o.vx,o.vz)/10);i.aimYaw=Fs(u-l,f-c)+this.noiseYaw*_;let b=Math.atan2(d-h,m);if(r.gravity>0){const w=r.speed,M=r.gravity,L=d-h,O=w*w*w*w-M*(M*m*m+2*L*w*w);b=O>0?Math.atan((w*w-Math.sqrt(O))/(M*m)):r.pitchMax}i.aimPitch=b+this.noisePitch*_;const x=r.speed*r.lifetime*.92,C=t.time-this.firstSeenTime>=this.diff.reaction,A=n.aimError<this.diff.fireAlign+(r.gravity>0?.03:0)+(g<12?.05:0);let R=C&&A&&g<x;R&&r.heatPerShot>0&&this.diff.tactics>.5&&n.heat>.86&&(R=!1),R&&o.spawnProtect>.5&&(R=!1),i.fire=R;const I=n.hull.ability;n.abilityCharge>=1&&this.abilityRoll<this.diff.tactics&&(I==="shockwave"&&g<10||I==="aegis"&&t.time-n.lastDamageTime<.6&&n.health<n.maxHealth*.75||I==="dash"&&(this.state==="retreat"||g>r.preferredRange+12))&&(i.ability=!0)}else this.state==="pursue"||this.targetId>=0&&t.time-this.lastSeenTime<6?i.aimYaw=Fs(this.lastSeenX-n.x,this.lastSeenZ-n.z):i.aimYaw=n.heading,i.aimPitch=0,this.state==="retreat"&&n.hull.ability==="dash"&&n.abilityCharge>=1&&this.abilityRoll<this.diff.tactics&&(i.ability=!0)}}class ux{constructor(){y(this,"pool",[]);y(this,"count",0)}push(t,e=-1,n=-1,i=""){let r=this.pool[this.count];return r||(r={type:t,a:e,b:n,x:0,y:0,z:0,x2:0,y2:0,z2:0,value:0,kind:i},this.pool.push(r)),this.count++,r.type=t,r.a=e,r.b=n,r.kind=i,r.x=r.y=r.z=r.x2=r.y2=r.z2=r.value=0,r}get(t){return this.pool[t]}clear(){this.count=0}}const eh=2,Nr=5,dx=7.6;class fx{constructor(t,e){y(this,"nodes",[]);y(this,"world");y(this,"g",new Float64Array(0));y(this,"f",new Float64Array(0));y(this,"came",new Int32Array(0));y(this,"stamp",new Int32Array(0));y(this,"closed",new Int32Array(0));y(this,"search",0);y(this,"heapN",[]);y(this,"heapK",[]);this.world=e;const n=t.half-3,i=(o,l,h)=>{const c=e.surfaceHeight(o,l,h);if(!(Math.abs(c-h)>.6)&&!e.circleBlocked(o,l,c,eh)){for(const u of this.nodes)if(Math.abs(u.x-o)<1.5&&Math.abs(u.z-l)<1.5&&Math.abs(u.y-c)<1)return;this.nodes.push({id:this.nodes.length,x:o,y:c,z:l,edges:[],costs:[]})}};for(let o=-n;o<=n+.01;o+=Nr)for(let l=-n;l<=n+.01;l+=Nr)i(o,l,0);for(const o of t.boxes){if(!o.walkable||!o.blocksTanks||o.maxY<1.5)continue;const l=o.maxX-o.minX,h=o.maxZ-o.minZ;if(l<5||h<5)continue;const c=Math.max(1,Math.round((l-3)/Nr)),u=Math.max(1,Math.round((h-3)/Nr));for(let d=0;d<=c;d++)for(let f=0;f<=u;f++){const g=c===0?(o.minX+o.maxX)/2:o.minX+2.2+(l-4.4)*d/c,v=u===0?(o.minZ+o.maxZ)/2:o.minZ+2.2+(h-4.4)*f/u;i(g,v,o.maxY)}}for(const o of t.ramps){const l=(o.minX+o.maxX)/2,h=(o.minZ+o.maxZ)/2,c=o.axis==="x"?o.maxX-o.minX:o.maxZ-o.minZ,u=Math.max(2,Math.ceil(c/5));for(let d=-1;d<=u+1;d++){const f=d/u;let g=l,v=h;o.axis==="x"?g=o.minX+(o.maxX-o.minX)*f:v=o.minZ+(o.maxZ-o.minZ)*f;let m=Math.min(1,Math.max(0,f));o.dir===-1&&(m=1-m);const p=o.h0+(o.h1-o.h0)*m;i(g,v,p)}}const r=this.nodes;for(let o=0;o<r.length;o++){const l=r[o];for(let h=0;h<r.length;h++){if(o===h)continue;const c=r[h],u=c.x-l.x,d=c.z-l.z,f=Math.sqrt(u*u+d*d);f>dx||f<.5||this.drivable(l.x,l.y,l.z,c.x,c.y,c.z)&&(l.edges.push(h),l.costs.push(f+Math.max(0,c.y-l.y)*.5))}}const a=r.length;this.g=new Float64Array(a),this.f=new Float64Array(a),this.came=new Int32Array(a),this.stamp=new Int32Array(a),this.closed=new Int32Array(a)}drivable(t,e,n,i,r,a,o=eh){const l=i-t,h=a-n,c=Math.sqrt(l*l+h*h),u=Math.max(2,Math.ceil(c/.7));let d=e;for(let f=1;f<=u;f++){const g=f/u,v=t+l*g,m=n+h*g;if(d=this.world.surfaceHeight(v,m,d,ta),this.world.circleBlocked(v,m,d,o))return!1}return Math.abs(d-r)<.6}nearest(t,e,n){let i=-1,r=1/0,a=-1,o=1/0;for(const l of this.nodes){const h=l.x-t,c=l.z-n,u=h*h+c*c+(l.y-e)*(l.y-e)*9;u<o&&(o=u,a=l.id),u<r&&Math.abs(l.y-e)<1.4&&u<400&&this.world.segmentClear(t,e+1,n,l.x,l.y+1,l.z)&&(r=u,i=l.id)}return i>=0?i:a}findPath(t,e,n){if(n.length=0,t<0||e<0)return!1;if(t===e)return n.push(e),!0;const i=this.nodes,r=++this.search,{g:a,f:o,came:l,stamp:h,closed:c}=this,u=this.heapN,d=this.heapK;u.length=0,d.length=0;const f=i[e],g=v=>{const m=i[v],p=m.x-f.x,_=m.z-f.z;return Math.sqrt(p*p+_*_)};for(h[t]=r,a[t]=0,o[t]=g(t),l[t]=-1,nh(u,d,t,o[t]);u.length;){const v=px(u,d);if(c[v]===r)continue;if(c[v]=r,v===e){let p=e;for(;p!==t&&p>=0;)n.push(p),p=l[p];return n.reverse(),!0}const m=i[v];for(let p=0;p<m.edges.length;p++){const _=m.edges[p];if(c[_]===r)continue;const b=a[v]+m.costs[p];(h[_]!==r||b<a[_])&&(h[_]=r,a[_]=b,o[_]=b+g(_),l[_]=v,nh(u,d,_,o[_]))}}return!1}reachable(t){const e=new Set([t]),n=[t];for(;n.length;){const i=n.pop();for(const r of this.nodes[i].edges)e.has(r)||(e.add(r),n.push(r))}return e}}function nh(s,t,e,n){s.push(e),t.push(n);let i=s.length-1;for(;i>0;){const r=i-1>>1;if(t[r]<=t[i])break;au(s,t,r,i),i=r}}function px(s,t){const e=s[0],n=s.pop(),i=t.pop();if(s.length){s[0]=n,t[0]=i;let r=0;for(;;){const a=r*2+1,o=a+1;let l=r;if(a<s.length&&t[a]<t[l]&&(l=a),o<s.length&&t[o]<t[l]&&(l=o),l===r)break;au(s,t,l,r),r=l}}return e}function au(s,t,e,n){const i=s[e];s[e]=s[n],s[n]=i;const r=t[e];t[e]=t[n],t[n]=r}function mx(){return{throttle:0,steer:0,aimYaw:0,aimPitch:0,fire:!1,boost:!1,ability:!1,reload:!1}}function gx(s){const t=e=>Je(Math.floor(e),0,kn);return{damage:1+.06*t(s.damage),armor:7*t(s.armor),speed:1+.04*t(s.speed),reload:1-.06*t(s.reload)}}class ih{constructor(t,e,n,i,r,a,o){y(this,"id");y(this,"name");y(this,"isBot");y(this,"team");y(this,"hull");y(this,"weapon");y(this,"paint");y(this,"mods");y(this,"maxHealth");y(this,"armor");y(this,"turretMult",1);y(this,"x",0);y(this,"y",0);y(this,"z",0);y(this,"vy",0);y(this,"heading",0);y(this,"speed",0);y(this,"turnVel",0);y(this,"kx",0);y(this,"kz",0);y(this,"vx",0);y(this,"vz",0);y(this,"grounded",!0);y(this,"turretYaw",0);y(this,"barrelPitch",0);y(this,"tiltPitch",0);y(this,"tiltRoll",0);y(this,"health",0);y(this,"alive",!1);y(this,"respawnTimer",0);y(this,"spawnProtect",0);y(this,"lastDamageTime",-99);y(this,"lastAttacker",-1);y(this,"damagedBy",[]);y(this,"cooldown",0);y(this,"ammo",0);y(this,"reloadTimer",0);y(this,"heat",0);y(this,"overheated",0);y(this,"venting",!1);y(this,"charging",-1);y(this,"boost",1);y(this,"boosting",!1);y(this,"abilityCharge",.35);y(this,"abilityTimer",0);y(this,"dashTimer",0);y(this,"shieldTimer",0);y(this,"overdrive",0);y(this,"nitro",0);y(this,"jolt",0);y(this,"stun",0);y(this,"recoil",0);y(this,"trackL",0);y(this,"trackR",0);y(this,"wallScrape",0);y(this,"controls",mx());y(this,"stats",{kills:0,deaths:0,assists:0,damage:0,shots:0,hits:0,score:0,captureTime:0,streak:0,bestStreak:0});this.id=t,this.name=e,this.isBot=n,this.team=i,this.hull=$e[r.hull],this.weapon=Ee[r.weapon],this.paint=a,this.mods=gx(r.upgrades),this.maxHealth=this.hull.health,this.armor=this.hull.armor+this.mods.armor,this.damagedBy=new Array(o).fill(-99)}get radius(){return this.hull.radius}get pivotHeight(){return this.hull.turretHeight+.42}isEnemyOf(t){return t!==this&&(this.team==="none"||this.team!==t.team)}spawn(t,e,n,i){this.x=t,this.y=e,this.z=n,this.vy=0,this.speed=0,this.turnVel=0,this.kx=0,this.kz=0,this.vx=0,this.vz=0,this.heading=i,this.turretYaw=i,this.barrelPitch=0,this.tiltPitch=0,this.tiltRoll=0,this.health=this.maxHealth,this.alive=!0,this.spawnProtect=Gc,this.lastAttacker=-1,this.damagedBy.fill(-99),this.cooldown=.4,this.ammo=this.weapon.magazine,this.reloadTimer=0,this.heat=0,this.overheated=0,this.venting=!1,this.charging=-1,this.boost=1,this.abilityTimer=0,this.dashTimer=0,this.shieldTimer=0,this.overdrive=0,this.nitro=0,this.jolt=0,this.stun=0,this.controls.aimYaw=i,this.controls.aimPitch=0}get incomingMult(){if(this.spawnProtect>0)return 0;let t=1;return this.shieldTimer>0&&(t*=.4),this.dashTimer>0&&(t*=.5),t}get outgoingMult(){return this.mods.damage*(this.overdrive>0?1.5:1)}get topSpeed(){let t=this.hull.maxSpeed*this.mods.speed;return this.boosting&&(t*=mv),this.nitro>0&&(t*=1.18),this.jolt>0&&(t*=.7),t}get reloadProgress(){return this.reloadTimer<=0?-1:1-this.reloadTimer/(this.weapon.reloadTime*this.mods.reload)}startReload(){const t=this.weapon;t.magazine>0&&this.ammo<t.magazine&&this.reloadTimer<=0&&(this.reloadTimer=t.reloadTime*this.mods.reload,this.charging=-1)}step(t,e){const n=this.controls;this.spawnProtect=Math.max(0,this.spawnProtect-t),this.overdrive=Math.max(0,this.overdrive-t),this.nitro=Math.max(0,this.nitro-t),this.jolt=Math.max(0,this.jolt-t),this.stun=Math.max(0,this.stun-t),this.dashTimer=Math.max(0,this.dashTimer-t),this.shieldTimer=Math.max(0,this.shieldTimer-t),this.abilityTimer=Math.max(0,this.abilityTimer-t),this.recoil=Math.max(0,this.recoil-t*3.2),this.spawnProtect>0&&(n.fire||Math.abs(n.throttle)>.1)&&this.spawnProtect<Gc-.6&&(this.spawnProtect=Math.min(this.spawnProtect,.25)),this.stepDrive(t,e.collision),this.stepTurret(t),this.stepWeapon(t,e),this.stepAbility(t,e),this.health<this.maxHealth&&e.time-this.lastDamageTime>xv&&(this.health=Math.min(this.maxHealth,this.health+this.maxHealth*_v*t))}stepDrive(t,e){const n=this.controls,i=this.hull,r=n.boost&&n.throttle>.1;this.nitro>0?(this.boost=1,this.boosting=r):r&&this.boost>.02?(this.boosting=!0,this.boost=Math.max(0,this.boost-gv*t)):(this.boosting=!1,this.boost=Math.min(1,this.boost+vv*t));const a=this.topSpeed;let o=n.throttle>=0?n.throttle*a:n.throttle*a*i.reverseFactor;this.dashTimer>0&&(o=i.maxSpeed*2.3);let l;Math.abs(n.throttle)<.05&&this.dashTimer<=0?l=i.brake*.45:Math.sign(o)===Math.sign(this.speed)||this.speed===0?l=Math.abs(o)>Math.abs(this.speed)?i.accel*(this.boosting?1.35:1):i.brake*.6:l=i.brake,this.dashTimer>0&&(l=90),this.speed=Za(this.speed,o,l*t);const h=Math.min(1,Math.abs(this.speed)/i.maxSpeed),c=n.steer*i.turnRate*(1-.28*h)*(this.jolt>0?.8:1);this.turnVel=Za(this.turnVel,c,9*t),this.heading+=this.turnVel*t;const u=Math.sin(this.heading),d=Math.cos(this.heading),f=this.x,g=this.z;this.x+=(u*this.speed+this.kx)*t,this.z+=(d*this.speed+this.kz)*t;const v=Math.exp(-3.5*t);this.kx*=v,this.kz*=v,ii.x=0,ii.z=0,ss.x=this.x,ss.z=this.z;let m=e.resolveCircle(ss,this.y,i.radius,ii);if(m&&(m=e.resolveCircle(ss,this.y,i.radius,ii)||m),this.x=ss.x,this.z=ss.z,this.wallScrape=Math.max(0,this.wallScrape-t*4),m){const G=Math.hypot(ii.x,ii.z);if(G>1e-6){const Y=ii.x/G,W=ii.z/G,K=(u*Y+d*W)*Math.sign(this.speed);K<-.2&&(this.speed*=1-Math.min(1,t*7*-K),this.wallScrape=Math.min(1,this.wallScrape+Math.abs(this.speed)*.05));const V=this.kx*Y+this.kz*W;V<0&&(this.kx-=V*Y,this.kz-=V*W)}}const p=e.surfaceHeight(this.x,this.z,this.y,ta);p>=this.y-.02?(this.y=p,this.vy=0,this.grounded=!0):this.grounded&&this.y-p<.4&&this.vy<=0?(this.y=p,this.vy=0):(this.grounded=!1,this.vy-=yv*t,this.y+=this.vy*t,this.y<=p&&(this.y=p,this.vy=0,this.grounded=!0)),t>0&&(this.vx=(this.x-f)/t,this.vz=(this.z-g)/t);const _=this.vx*u+this.vz*d,b=this.turnVel*i.width*.5;this.trackL+=(_+b)*t,this.trackR+=(_-b)*t;const x=i.length*.42,C=i.width*.42,A=this.y+.3,R=e.surfaceHeight(this.x+u*x,this.z+d*x,A,.6),I=e.surfaceHeight(this.x-u*x,this.z-d*x,A,.6),w=e.surfaceHeight(this.x+d*C,this.z-u*C,A,.6),M=e.surfaceHeight(this.x-d*C,this.z+u*C,A,.6),L=this.grounded?Je(Math.atan2(R-I,x*2),-.5,.5):this.tiltPitch*.98,O=this.grounded?Je(Math.atan2(w-M,C*2),-.4,.4):this.tiltRoll*.98,z=Yo(9,t);this.tiltPitch+=(L-this.tiltPitch)*z,this.tiltRoll+=(O-this.tiltRoll)*z}stepTurret(t){const e=this.controls,n=this.weapon,i=this.stun>0?.15:1;this.turretYaw=ov(this.turretYaw,e.aimYaw,n.turretSpeed*this.turretMult*i*t),this.barrelPitch=Za(this.barrelPitch,Je(e.aimPitch,n.pitchMin,n.pitchMax),1.1*i*t)}get aimError(){return Math.abs(Js(this.turretYaw,this.controls.aimYaw))+Math.abs(this.barrelPitch-Je(this.controls.aimPitch,this.weapon.pitchMin,this.weapon.pitchMax))}stepWeapon(t,e){const n=this.weapon,i=this.controls;if(this.cooldown=Math.max(0,this.cooldown-t),this.reloadTimer>0&&(this.reloadTimer-=t,this.reloadTimer<=0&&(this.reloadTimer=0,this.ammo=n.magazine,e.events.push("reload",this.id))),n.heatPerShot>0&&(this.overheated>0?(this.overheated=Math.max(0,this.overheated-t),this.heat=Math.max(0,this.heat-n.coolRate*1.6*t),this.overheated===0&&(this.heat=Math.min(this.heat,.25))):this.venting?(this.heat=Math.max(0,this.heat-1/(n.reloadTime*this.mods.reload)*t),this.heat===0&&(this.venting=!1)):this.heat=Math.max(0,this.heat-n.coolRate*t*(i.fire?.15:1))),i.reload&&(n.magazine>0?this.startReload():n.heatPerShot>0&&this.heat>.08&&this.overheated===0&&(this.venting=!0)),this.charging>=0){this.charging-=t,this.charging<=0&&(this.charging=-1,this.shoot(e));return}if(!(!i.fire||!this.alive||this.cooldown>0||this.reloadTimer>0||this.overheated>0||this.venting)){if(n.magazine>0&&this.ammo<=0){this.startReload();return}if(n.charge>0){this.charging=n.charge,e.events.push("charge",this.id);return}this.shoot(e)}}shoot(t){const e=this.weapon;this.cooldown=e.cooldown*this.mods.reload,e.magazine>0&&(this.ammo--,this.ammo<=0&&this.startReload()),e.heatPerShot>0&&(this.heat+=e.heatPerShot,this.heat>=1&&(this.heat=1,this.overheated=e.overheatLock,t.events.push("overheat",this.id))),this.recoil=1,this.stats.shots++,this.spawnProtect=0;const n=e.recoil*1.2/this.hull.mass;this.kx-=Math.sin(this.turretYaw)*n,this.kz-=Math.cos(this.turretYaw)*n,t.fireWeapon(this)}stepAbility(t,e){const n=Qs[this.hull.ability];this.abilityTimer<=0&&(this.abilityCharge=Math.min(1,this.abilityCharge+t/n.chargeTime)),!(!this.controls.ability||this.abilityCharge<1||!this.alive)&&(this.abilityCharge=0,this.abilityTimer=n.duration,n.id==="dash"?this.dashTimer=n.duration:n.id==="aegis"?this.shieldTimer=n.duration:e.shockwave(this),e.events.push("ability",this.id,-1,n.id))}addAbilityCharge(t){this.abilityCharge=Math.min(1,this.abilityCharge+t)}barrelDir(t){const e=Math.cos(this.barrelPitch);t.x=Math.sin(this.turretYaw)*e,t.y=Math.sin(this.barrelPitch),t.z=Math.cos(this.turretYaw)*e}muzzle(t){this.barrelDir(t);const e=this.weapon.barrelLength;t.x=this.x+t.x*e,t.y=this.y+this.pivotHeight+t.y*e,t.z=this.z+t.z*e}}const ii={x:0,z:0},ss={x:0,z:0},vx={repair:20,overdrive:30,nitro:22},xx=3,_x=8,sh=new Map;function ou(s){const t=ox(s);let e=sh.get(s);if(!e){const n=new Fv(t);e={col:n,nav:new fx(t,n)},sh.set(s,e)}return{arena:t,...e}}const nn={t:0,x:0,y:0,z:0,nx:0,ny:0,nz:0},Ie={x:0,y:0,z:0},sn={x:0,y:0,z:0};class yx{constructor(t){y(this,"config");y(this,"mode");y(this,"arena");y(this,"collision");y(this,"nav");y(this,"events",new ux);y(this,"tanks",[]);y(this,"brains",[]);y(this,"projectiles");y(this,"pickups");y(this,"cp",{owner:"none",progress:0,contested:!1,blueIn:0,magentaIn:0,tick:0});y(this,"rng");y(this,"player");y(this,"time",0);y(this,"status","countdown");y(this,"countdown",xx);y(this,"timeLeft");y(this,"score",{blue:0,magenta:0});y(this,"winner","draw");this.config=t,this.mode=t.mode;const e=ou(t.arena);this.arena=e.arena,this.collision=e.col,this.nav=e.nav,this.rng=new Qh(t.seed),this.timeLeft=t.timeLimit,this.projectiles=new cx(320,Ee.plasma),this.pickups=this.arena.pickups.map(u=>({def:u,active:!0,timer:0}));const n=_e[t.mode].teams,i=8,r=[...uv];for(let u=r.length-1;u>0;u--){const d=this.rng.int(0,u+1);[r[u],r[d]]=[r[d],r[u]]}const a=Ri[t.difficulty],o=t.difficulty==="rookie"?0:t.difficulty==="veteran"?1:2,l=["hornet","vanguard","bastion"],h=["plasma","rail","volt","nova"];let c=0;for(let u=0;u<i;u++){const d=n?u%2===0?"blue":"magenta":"none";if(u===0&&t.player){const m=t.player;this.tanks.push(new ih(0,m.name,!1,d,m.loadout,m.paint,i));continue}const f={hull:this.rng.pick(l),weapon:this.rng.pick(h),paint:"graphite",upgrades:{damage:o,armor:o,speed:o,reload:o}},g=an[this.rng.int(0,an.length)],v=new ih(u,r[c++%r.length],!0,d,f,g,i);this.tanks.push(v),this.brains.push(new hx(v,a,t.seed*31+u*977))}this.player=t.player?this.tanks[0]:null;for(const u of this.tanks)this.respawn(u)}step(t){if(this.time+=t,this.status==="countdown"){const e=Math.ceil(this.countdown);this.countdown-=t,Math.ceil(this.countdown)!==e&&this.countdown>0&&(this.events.push("countdown",-1,-1).value=Math.ceil(this.countdown)),this.countdown<=0&&(this.status="playing",this.events.push("countdown",-1,-1).value=0);for(const n of this.brains)n.update(this,t);for(const n of this.tanks)n.controls.throttle=0,n.controls.steer=0,n.controls.fire=!1,n.controls.ability=!1,n.controls.boost=!1,n.step(t,this);return}if(this.status==="ended"){for(const e of this.tanks)e.controls.throttle=0,e.controls.steer=0,e.controls.fire=!1,e.controls.ability=!1,e.controls.boost=!1,e.alive&&e.step(t,this);this.stepProjectiles(t);return}this.timeLeft=Math.max(0,this.timeLeft-t);for(const e of this.brains)e.update(this,t);for(const e of this.tanks)e.alive?e.step(t,this):(e.respawnTimer-=t,e.respawnTimer<=0&&this.respawn(e));this.separateTanks(),this.stepProjectiles(t),this.stepPickups(t),this.mode==="cp"&&this.stepControlPoint(t),this.checkEnd()}separateTanks(){const t=this.tanks;for(let e=0;e<t.length;e++){const n=t[e];if(n.alive)for(let i=e+1;i<t.length;i++){const r=t[i];if(!r.alive||Math.abs(n.y-r.y)>2)continue;const a=r.x-n.x,o=r.z-n.z,l=n.radius+r.radius,h=a*a+o*o;if(h>=l*l)continue;const c=Math.sqrt(h)||.001,u=a/c,d=o/c,f=l-c,g=r.hull.mass/(n.hull.mass+r.hull.mass);n.x-=u*f*g,n.z-=d*f*g,r.x+=u*f*(1-g),r.z+=d*f*(1-g),n.speed*=.96,r.speed*=.96}}for(const e of t)e.alive&&(sn.x=e.x,sn.z=e.z,this.collision.resolveCircle(sn,e.y,e.radius,null)&&(e.x=sn.x,e.z=sn.z))}fireWeapon(t){const e=t.weapon;if(t.barrelDir(Ie),e.spread>0){const u=this.rng.range(0,Math.PI*2),d=this.rng.next()*e.spread,f=Math.cos(t.turretYaw),g=-Math.sin(t.turretYaw);Ie.x+=f*Math.cos(u)*d,Ie.z+=g*Math.cos(u)*d,Ie.y+=Math.sin(u)*d;const v=Math.hypot(Ie.x,Ie.y,Ie.z);Ie.x/=v,Ie.y/=v,Ie.z/=v}t.muzzle(sn);const n=t.x,i=t.y+t.pivotHeight,r=t.z;let a=sn.x,o=sn.y,l=sn.z;this.collision.raycast(n,i,r,a-n,o-i,l-r,1,nn)&&(a=n+(a-n)*Math.max(0,nn.t-.05),o=i+(o-i)*Math.max(0,nn.t-.05),l=r+(l-r)*Math.max(0,nn.t-.05));const h=this.projectiles.spawn(t,a,o,l,Ie.x,Ie.y,Ie.z,e,t.outgoingMult),c=this.events.push("fire",t.id,h.slot,e.id);c.x=sn.x,c.y=sn.y,c.z=sn.z,c.x2=Ie.x,c.y2=Ie.y,c.z2=Ie.z}stepProjectiles(t){for(const e of this.projectiles.items){if(!e.active)continue;const n=e.weapon;e.life-=t,e.vy-=n.gravity*t;const i=e.vx*t,r=e.vy*t,a=e.vz*t;let o=2,l=null;const h=this.tanks[e.owner];for(const u of this.tanks){if(!u.alive||u.id===e.owner||!h.isEnemyOf(u))continue;const d=u.x-e.x,f=u.z-e.z,g=Math.abs(i)+Math.abs(a)+u.hull.length;if(Math.abs(d)>g||Math.abs(f)>g)continue;const v=ru(u,e.x,e.y,e.z,i,r,a);v>=0&&v<o&&(o=v,l=u)}if(this.collision.raycast(e.x,e.y,e.z,i,r,a,1,nn)&&nn.t<o)this.impact(e,nn.x,nn.y,nn.z,nn.nx,nn.ny,nn.nz,null);else if(l){const u=e.x+i*o,d=e.y+r*o,f=e.z+a*o,g=Math.hypot(i,r,a)||1;this.impact(e,u,d,f,-i/g,-r/g,-a/g,l)}else e.life<=0?(e.x+=i,e.y+=r,e.z+=a,n.splashRadius>3?this.impact(e,e.x,e.y,e.z,0,1,0,null):this.endShot(e,e.x,e.y,e.z)):(e.x+=i,e.y+=r,e.z+=a)}}endShot(t,e,n,i){if(t.weapon.projectile==="rail"){const r=this.events.push("beam",t.owner,-1,"rail");r.x=t.ox,r.y=t.oy,r.z=t.oz,r.x2=e,r.y2=n,r.z2=i}t.active=!1}impact(t,e,n,i,r,a,o,l){const h=t.weapon,c=this.tanks[t.owner];this.endShot(t,e,n,i);const u=this.events.push("impact",l?l.id:-1,t.owner,h.id);if(u.x=e,u.y=n,u.z=i,u.x2=r,u.y2=a,u.z2=o,l){const d=h.damage*t.dmgMult;if(c.stats.hits++,this.applyDamage(l,c,d,h,e,n,i,h.pierce),h.jolt>0&&(l.jolt=Math.max(l.jolt,h.jolt)),h.knockback>0&&h.splashRadius<3){const f=Math.hypot(t.vx,t.vz)||1;l.kx+=t.vx/f*h.knockback/l.hull.mass,l.kz+=t.vz/f*h.knockback/l.hull.mass}}h.splashRadius>0&&this.explode(e+r*.3,n+a*.3,i+o*.3,h.splashRadius,h.splashDamage*t.dmgMult,c,h.splashRadius>3?h.knockback:0,h,null)}explode(t,e,n,i,r,a,o,l,h){const c=this.events.push("explode",a.id,-1,l?l.id:"shockwave");c.x=t,c.y=e,c.z=n,c.value=i;for(const u of this.tanks){if(!u.alive||u===h||!a.isEnemyOf(u))continue;const d=u.x,f=u.y+1,g=u.z,v=Math.hypot(d-t,f-e,g-n)-u.radius*.6;if(v>i||!this.collision.segmentClear(t,e,n,d,f,g))continue;const m=Je(1-Math.max(0,v)/i,.3,1);if(this.applyDamage(u,a,r*m,l,d,f,g,0),o>0&&u.alive){const p=d-t,_=g-n,b=Math.hypot(p,_)||1,x=o*m/u.hull.mass;u.kx+=p/b*x,u.kz+=_/b*x,u.grounded&&(u.vy=Math.min(4,2.2*m/u.hull.mass*2),u.grounded=!1,u.y+=.02)}}}shockwave(t){this.explode(t.x,t.y+.8,t.z,12,46*t.outgoingMult,t,10,null,null);for(const e of this.tanks)e.alive&&t.isEnemyOf(e)&&Te(t.x,t.z,e.x,e.z)<12&&Math.abs(e.y-t.y)<3&&(e.stun=Math.max(e.stun,1.6))}applyDamage(t,e,n,i,r,a,o,l){if(!t.alive)return;const h=t.incomingMult;if(h<=0)return;const c=t.armor*(1-l),u=n*100/(100+c)*h;if(u<=0)return;t.health-=u,t.lastDamageTime=this.time,t.lastAttacker=e.id,t.damagedBy[e.id]=this.time,e.stats.damage+=u,e.addAbilityCharge(u/260);const d=this.events.push("damage",t.id,e.id,i?i.id:"shockwave");d.x=r,d.y=a,d.z=o,d.value=u,t.health<=0&&this.kill(t,e,i)}kill(t,e,n){t.health=0,t.alive=!1,t.respawnTimer=dv,t.stats.deaths++,t.stats.streak=0,t.charging=-1,e!==t&&(e.stats.kills++,e.stats.streak++,e.stats.bestStreak=Math.max(e.stats.bestStreak,e.stats.streak),e.stats.score+=fv,this.mode==="tdm"&&e.team!=="none"&&this.score[e.team]++);for(const r of this.tanks)r===e||r===t||this.time-t.damagedBy[r.id]<_x&&(r.stats.assists++,r.stats.score+=pv);const i=this.events.push("kill",t.id,e.id,n?n.id:"shockwave");i.x=t.x,i.y=t.y,i.z=t.z,i.value=e.stats.streak}respawn(t){const e=this.pickSpawn(t);t.spawn(e.x,this.collision.surfaceHeight(e.x,e.z,0),e.z,e.yaw);const n=this.brains.find(i=>i.tank===t);n&&n.reset(),this.events.push("spawn",t.id)}pickSpawn(t){const e=this.arena.spawns,n=t.team==="blue"?e.blue:t.team==="magenta"?e.magenta:e.ffa;let i=n[0],r=-1/0;for(const a of n){let o=200,l=!1;for(const c of this.tanks){if(!c.alive||c===t)continue;const u=Te(a.x,a.z,c.x,c.z);u<6&&(l=!0),t.isEnemyOf(c)&&(o=Math.min(o,u))}const h=o+this.rng.range(0,12)-(l?100:0);h>r&&(r=h,i=a)}return i}stepPickups(t){for(let e=0;e<this.pickups.length;e++){const n=this.pickups[e];if(!n.active){n.timer-=t,n.timer<=0&&(n.active=!0,this.events.push("pickupReady",-1,e,n.def.kind));continue}for(const i of this.tanks){if(!i.alive||Math.abs(i.y-n.def.y)>2||Te(i.x,i.z,n.def.x,n.def.z)>2.8)continue;if(n.def.kind==="repair"){if(i.health>=i.maxHealth-1)continue;i.health=Math.min(i.maxHealth,i.health+i.maxHealth*.5)}else n.def.kind==="overdrive"?i.overdrive=12:(i.nitro=10,i.boost=1);n.active=!1,n.timer=vx[n.def.kind];const r=this.events.push("pickup",i.id,e,n.def.kind);r.x=n.def.x,r.y=n.def.y,r.z=n.def.z;break}}}stepControlPoint(t){const e=this.cp,n=this.arena.controlPoint;let i=0,r=0;for(const o of this.tanks)!o.alive||Math.abs(o.y-n.y)>2.2||Te(o.x,o.z,n.x,n.z)>n.r||(o.team==="blue"?i++:o.team==="magenta"&&r++,o.stats.captureTime+=t);e.blueIn=i,e.magentaIn=r,e.contested=i>0&&r>0;const a=e.progress;if(!e.contested&&(i>0||r>0)){const o=Math.max(i,r),l=.2*(1+.35*(Math.min(o,3)-1));e.progress=Je(e.progress+(i>0?l:-l)*t,-1,1)}else if(i===0&&r===0){const o=e.owner==="blue"?1:e.owner==="magenta"?-1:0;e.progress+=Je(o-e.progress,-.06*t,.06*t)}if(e.owner!=="blue"&&e.progress>=1?this.captured("blue"):e.owner!=="magenta"&&e.progress<=-1?this.captured("magenta"):e.owner==="blue"&&a>0&&e.progress<=0?(e.owner="none",this.events.push("neutral")):e.owner==="magenta"&&a<0&&e.progress>=0&&(e.owner="none",this.events.push("neutral")),e.owner==="blue"||e.owner==="magenta")for(e.tick+=t;e.tick>=1;)e.tick-=1,this.score[e.owner]++;else e.tick=0}captured(t){this.cp.owner=t,this.events.push("capture",-1,-1,t);const e=this.arena.controlPoint;for(const n of this.tanks)n.alive&&n.team===t&&Te(n.x,n.z,e.x,e.z)<=e.r&&(n.stats.score+=60)}checkEnd(){const t=this.config.scoreLimit;let e=this.timeLeft<=0;if(_e[this.mode].teams?(this.score.blue>=t||this.score.magenta>=t)&&(e=!0):this.tanks.some(n=>n.stats.kills>=t)&&(e=!0),!!e){if(this.status="ended",_e[this.mode].teams)this.winner=this.score.blue>this.score.magenta?"blue":this.score.magenta>this.score.blue?"magenta":"draw";else{const n=this.ranking(),i=n[0],r=n[1];this.winner=r&&i.stats.kills===r.stats.kills&&i.stats.deaths===r.stats.deaths?"draw":i.id}this.events.push("matchEnd")}}ranking(){return[...this.tanks].sort((t,e)=>e.stats.kills-t.stats.kills||e.stats.score-t.stats.score||t.stats.deaths-e.stats.deaths)}playerResult(){const t=this.player;return!t||this.winner==="draw"?"draw":typeof this.winner=="number"?this.winner===t.id?"win":"loss":this.winner===t.team?"win":"loss"}}function tt(s){const t=document.getElementById(s);if(!t)throw new Error(`#${s} missing from index.html`);return t}const Mx={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function Fn(s){return s.replace(/[&<>"']/g,t=>Mx[t])}function lu(s){const t=Math.max(0,Math.ceil(s));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}const si=new D;class bx{constructor(){y(this,"root",tt("hud"));y(this,"world",null);y(this,"player",null);y(this,"plates",[]);y(this,"dnums",[]);y(this,"dnIdx",0);y(this,"arcs",[]);y(this,"arcIdx",0);y(this,"spotted",[]);y(this,"spottedTimer",0);y(this,"lastFired",[]);y(this,"hitT",0);y(this,"bannerT",0);y(this,"hpGhost",1);y(this,"lastAmmoKey","");y(this,"lastChips","");y(this,"mapBase",null);y(this,"mapCtx",tt("minimap").getContext("2d"));y(this,"damageFlash",0);y(this,"el",{hpFill:tt("hpFill"),hpGhost:tt("hpGhost"),hpNum:tt("hpNum"),boostFill:tt("boostFill"),armorNum:tt("armorNum"),chips:tt("chips"),wName:tt("wName"),ammo:tt("ammo"),wBar:tt("wBar"),wState:tt("wState"),abPanel:tt("abilityPanel"),abFill:tt("abFill"),abName:tt("abName"),abState:tt("abState"),timer:tt("hudTimer"),mode:tt("hudMode"),cpMeter:tt("cpMeter"),cpFill:tt("cpFill"),cpLabel:tt("cpLabel"),sBlue:tt("scoreBlue"),sBlueVal:tt("scoreBlueVal"),sBlueBar:tt("scoreBlueBar"),sBlueLbl:tt("scoreBlueLbl"),sMag:tt("scoreMag"),sMagVal:tt("scoreMagVal"),sMagBar:tt("scoreMagBar"),sMagLbl:tt("scoreMagLbl"),killfeed:tt("killfeed"),reticle:tt("reticle"),hitmarker:tt("hitmarker"),dmgDir:tt("dmgDir"),banner:tt("banner"),bannerKicker:tt("bannerKicker"),bannerTitle:tt("bannerTitle"),countdown:tt("countdown"),respawn:tt("respawn"),respawnBy:tt("respawnBy"),respawnTime:tt("respawnTime"),scoreboard:tt("scoreboard"),fps:tt("fps"),fxDamage:tt("fxDamage"),plates:tt("plates"),dmgNumbers:tt("dmgNumbers")});y(this,"mapScale",1);y(this,"mapHalf",70);for(let t=0;t<24;t++){const e=document.createElement("div");e.className="dnum",e.style.opacity="0",this.el.dmgNumbers.appendChild(e),this.dnums.push({el:e,x:0,y:0,z:0,t:0,drift:0})}for(let t=0;t<4;t++){const e=document.createElement("div");e.className="dmg-arc",e.style.opacity="0",this.el.dmgDir.appendChild(e),this.arcs.push({el:e,t:0,fromX:0,fromZ:0})}}show(t){this.root.classList.toggle("hidden",!t)}setFps(t,e){this.el.fps.classList.toggle("hidden",!t),t&&(this.el.fps.textContent=`${e.toFixed(0)} FPS`)}bind(t){this.world=t,this.player=t.player,this.el.plates.textContent="",this.plates=t.tanks.map(i=>{const r=document.createElement("div");r.className=`plate ${i.team==="none"?"ffa":i.team}`;const a=document.createElement("div");a.className="name",a.innerHTML=`${Fn(i.name)}${i.isBot?"<small>BOT</small>":""}`;const o=document.createElement("div");o.className="hp";const l=document.createElement("b");return o.appendChild(l),r.append(a,o),r.style.display="none",this.el.plates.appendChild(r),{el:r,name:a,hp:l,visible:!1}}),this.spotted=t.tanks.map(()=>!1),this.lastFired=t.tanks.map(()=>-99),this.el.killfeed.textContent="",this.el.respawn.classList.add("hidden"),this.el.scoreboard.classList.add("hidden"),this.lastAmmoKey="",this.lastChips="",this.hpGhost=1;const e=_e[t.mode];this.el.mode.textContent=`${e.name} · ${t.config.scoreLimit}`,this.el.cpMeter.classList.toggle("hidden",t.mode!=="cp");const n=e.teams;if(this.el.sBlueLbl.textContent=n?"BLUE":"YOU",this.el.sMagLbl.textContent=n?"MAGENTA":"LEADER",this.player){const i=this.player.weapon;this.el.wName.textContent=i.name,this.el.abName.textContent=Qs[this.player.hull.ability].name}this.buildMinimap()}onEvent(t){const e=this.world,n=this.player;if(e)switch(t.type){case"fire":this.lastFired[t.a]=e.time;break;case"damage":if(n&&t.b===n.id&&t.a!==n.id&&(this.hitT=.22,this.el.hitmarker.classList.remove("kill"),this.number(t.x,t.y+1.5,t.z,t.value,t.value>=40?"big":"")),n&&t.a===n.id){this.damageFlash=Math.min(1,this.damageFlash+t.value/60);const i=e.tanks[t.b];this.arc(i.x,i.z)}break;case"kill":{const i=e.tanks[t.a],r=e.tanks[t.b];if(this.feed(r,i,t.kind),n&&r===n&&i!==n){this.hitT=.4,this.el.hitmarker.classList.add("kill");const a=t.value,o=a>=5?"RAMPAGE":a===4?"QUAD KILL":a===3?"TRIPLE KILL":a===2?"DOUBLE KILL":"ENEMY DESTROYED";this.banner(i.name,o,a>=2?"amber":"")}n&&i===n&&(this.el.respawnBy.textContent=r===n?"SELF-DESTRUCTED":`DESTROYED BY ${r.name}`);break}case"capture":n&&this.banner("CONTROL POINT",t.kind===n.team?"CAPTURED":"LOST",t.kind===n.team?"":"red");break;case"neutral":n&&this.banner("CONTROL POINT","NEUTRALISED","amber");break;case"pickup":n&&t.a===n.id&&this.banner("PICKUP",t.kind==="repair"?"HULL REPAIRED":t.kind==="overdrive"?"OVERDRIVE ×1.5 DMG":"NITRO CHARGED",t.kind==="overdrive"?"amber":"");break;case"overheat":n&&t.a===n.id&&this.banner("VOLT EMITTER","OVERHEATED","red");break;case"countdown":this.countdown(t.value);break}}feed(t,e,n){const i=this.player,r=l=>i&&l===i?"self":l.team==="none"?"ffa":l.team,a=n==="shockwave"?"SHOCKWAVE":Ee[n]?.name??"",o=document.createElement("div");for(o.className=`kf${i&&(t===i||e===i)?" me":""}`,o.innerHTML=`<span class="${r(t)}">${Fn(t.name)}</span><span class="w">${Fn(a)}</span><span class="${r(e)}">${Fn(e.name)}</span>`,this.el.killfeed.prepend(o);this.el.killfeed.children.length>5;)this.el.killfeed.lastElementChild?.remove();window.setTimeout(()=>o.remove(),6e3)}banner(t,e,n=""){this.el.bannerKicker.textContent=t,this.el.bannerTitle.textContent=e,this.el.banner.className=`banner show ${n}`,this.bannerT=2.2}countdown(t){const e=this.el.countdown;e.textContent=t>0?String(t):"FIGHT",e.classList.remove("pop"),e.offsetWidth,e.classList.add("pop")}number(t,e,n,i,r){const a=this.dnums[this.dnIdx];this.dnIdx=(this.dnIdx+1)%this.dnums.length,a.x=t,a.y=e,a.z=n,a.t=.9,a.drift=(Math.random()-.5)*30,a.el.textContent=String(Math.round(i)),a.el.className=`dnum ${r}`}arc(t,e){const n=this.arcs[this.arcIdx];this.arcIdx=(this.arcIdx+1)%this.arcs.length,n.t=1.2,n.fromX=t,n.fromZ=e}update(t,e,n,i,r,a){const o=this.world,l=this.player;if(!o||!l)return;const h=Math.max(0,l.health/l.maxHealth);this.hpGhost=h>this.hpGhost?h:this.hpGhost+(h-this.hpGhost)*Math.min(1,t*2.5),this.el.hpFill.style.width=`${h*100}%`,this.el.hpFill.className=h<.3?"low":h<.6?"mid":"",this.el.hpGhost.style.width=`${this.hpGhost*100}%`,this.el.hpNum.textContent=String(Math.ceil(l.health)),this.el.boostFill.style.width=`${l.boost*100}%`,this.el.armorNum.textContent=`ARM ${l.armor}`;const c=[];l.overdrive>0&&c.push(`<span class="chip amber">OVERDRIVE ${Math.ceil(l.overdrive)}s</span>`),l.nitro>0&&c.push(`<span class="chip cyan">NITRO ${Math.ceil(l.nitro)}s</span>`),l.shieldTimer>0&&c.push(`<span class="chip cyan">AEGIS ${Math.ceil(l.shieldTimer)}s</span>`),l.spawnProtect>0&&c.push('<span class="chip green">SPAWN SHIELD</span>'),l.jolt>0&&c.push('<span class="chip red">JOLTED</span>'),l.stun>0&&c.push('<span class="chip red">TURRET JAMMED</span>'),o.time-l.lastDamageTime>6&&l.health<l.maxHealth&&l.alive&&c.push('<span class="chip green">SELF-REPAIR</span>');const u=c.join("");u!==this.lastChips&&(this.el.chips.innerHTML=u,this.lastChips=u);const d=l.weapon;let f="";if(d.magazine>0&&(f=`m${l.ammo}/${d.magazine}`),f!==this.lastAmmoKey){this.lastAmmoKey=f;let C="";if(d.magazine>0)for(let A=0;A<d.magazine;A++)C+=`<i class="${A<l.ammo?"":"spent"}"></i>`;this.el.ammo.innerHTML=C}let g=1,v="READY",m=!1;l.reloadTimer>0?(g=l.reloadProgress,v="RELOADING"):d.heatPerShot>0?(g=l.heat,m=!0,v=l.overheated>0?"OVERHEATED":l.venting?"VENTING":l.heat>.75?"HEAT CRITICAL":"HEAT"):l.charging>=0?(g=1-l.charging/d.charge,v="CHARGING"):l.cooldown>0&&d.cooldown>.4&&(g=1-l.cooldown/(d.cooldown*l.mods.reload),v="CYCLING"),this.el.wBar.style.width=`${Math.max(0,Math.min(1,g))*100}%`,this.el.wBar.className=m?"hot":"",this.el.wState.textContent=v;const p=l.abilityCharge;this.el.abFill.style.strokeDashoffset=String(125.66*(1-p));const _=p>=1;this.el.abPanel.classList.toggle("ready",_),this.el.abState.textContent=l.abilityTimer>0?"ACTIVE":_?"READY":`${Math.floor(p*100)}%`,this.el.timer.textContent=lu(o.timeLeft),this.el.timer.classList.toggle("low",o.timeLeft<30);const b=o.config.scoreLimit;if(_e[o.mode].teams)this.el.sBlueVal.textContent=String(o.score.blue),this.el.sMagVal.textContent=String(o.score.magenta),this.el.sBlueBar.style.width=`${Math.min(1,o.score.blue/b)*100}%`,this.el.sMagBar.style.width=`${Math.min(1,o.score.magenta/b)*100}%`;else{let C=0;for(const A of o.tanks)A!==l&&(C=Math.max(C,A.stats.kills));this.el.sBlueVal.textContent=String(l.stats.kills),this.el.sMagVal.textContent=String(C),this.el.sBlueBar.style.width=`${Math.min(1,l.stats.kills/b)*100}%`,this.el.sMagBar.style.width=`${Math.min(1,C/b)*100}%`}if(o.mode==="cp"){const C=o.cp,A=this.el.cpFill,R=Math.abs(C.progress)*50;A.style.width=`${R}%`,A.style.left=C.progress>=0?"50%":`${50-R}%`,A.style.background=C.progress>=0?"var(--blue)":"var(--magenta)",this.el.cpLabel.textContent=C.contested?"CONTESTED":C.owner==="none"?C.blueIn||C.magentaIn?"CAPTURING":"NEUTRAL":`${C.owner.toUpperCase()} HOLDS`}this.el.respawn.classList.toggle("hidden",l.alive||o.status!=="playing"),l.alive||(this.el.respawnTime.textContent=String(Math.max(1,Math.ceil(l.respawnTimer)))),this.hitT=Math.max(0,this.hitT-t),this.el.hitmarker.style.opacity=String(Math.min(1,this.hitT*6)),this.bannerT>0&&(this.bannerT-=t,this.bannerT<=0&&this.el.banner.classList.remove("show")),this.damageFlash=Math.max(0,this.damageFlash-t*1.4);const x=l.alive&&h<.3?.25+.15*Math.sin(o.time*6):0;this.el.fxDamage.style.opacity=String(Math.min(1,this.damageFlash+x)),a&&l.alive?(this.el.reticle.style.display="",this.el.reticle.style.transform=`translate(${a.x}px, ${a.y}px)`,this.el.reticle.classList.toggle("blocked",a.blocked),this.el.reticle.classList.toggle("cooling",!a.ready)):this.el.reticle.style.display="none";for(const C of this.arcs){if(C.t<=0){C.el.style.opacity!=="0"&&(C.el.style.opacity="0");continue}C.t-=t;const A=Math.atan2(C.fromX-l.x,C.fromZ-l.z)-n;C.el.style.transform=`rotate(${-A}rad)`,C.el.style.opacity=String(Math.min(1,C.t*1.5))}this.updateSpotting(t),this.updatePlates(e,i,r),this.updateNumbers(t,e,i,r),this.drawMinimap(n)}updateSpotting(t){const e=this.world,n=this.player;if(this.spottedTimer-=t,!(this.spottedTimer>0)){this.spottedTimer=.2;for(const i of e.tanks){if(i===n||!i.alive){this.spotted[i.id]=!1;continue}if(!n.isEnemyOf(i)){this.spotted[i.id]=!0;continue}const r=Math.hypot(i.x-n.x,i.z-n.z),a=r<110&&e.collision.segmentClear(n.x,n.y+n.pivotHeight,n.z,i.x,i.y+1.2,i.z);this.spotted[i.id]=a||r<18||e.time-this.lastFired[i.id]<1.5&&r<70}}}updatePlates(t,e,n){const i=this.world,r=this.player;for(const a of i.tanks){const o=this.plates[a.id];let l=a!==r&&a.alive&&this.spotted[a.id];const h=r.isEnemyOf(a);let c=0,u=0,d=!1;if(l){si.set(a.x,a.y+a.hull.turretHeight+2.1,a.z).project(t);const f=si.z>1;c=(si.x*.5+.5)*e,u=(-si.y*.5+.5)*n;const g=Math.hypot(a.x-t.position.x,a.z-t.position.z);if(f||c<0||c>e||u<0||u>n)if(!h)l=!1;else{d=!0,f&&(c=e-c,u=n-u);const v=e/2,m=n/2,p=c-v,_=u-m,b=Math.min((v-40)/Math.max(1,Math.abs(p)),(m-50)/Math.max(1,Math.abs(_)));c=v+p*b,u=m+_*b}else g>140&&(l=!1)}l!==o.visible&&(o.el.style.display=l?"":"none",o.visible=l),l&&(o.el.style.transform=`translate(${c.toFixed(1)}px, ${u.toFixed(1)}px) translate(-50%, -100%)`,o.el.classList.toggle("offscreen",d),o.hp.style.width=`${a.health/a.maxHealth*100}%`)}}updateNumbers(t,e,n,i){for(const r of this.dnums){if(r.t<=0)continue;if(r.t-=t,si.set(r.x,r.y+(.9-r.t)*1.6,r.z).project(e),r.t<=0||si.z>1){r.el.style.opacity="0";continue}const a=(si.x*.5+.5)*n+r.drift*(.9-r.t),o=(-si.y*.5+.5)*i;r.el.style.transform=`translate(${a.toFixed(1)}px, ${o.toFixed(1)}px) translate(-50%, -50%)`,r.el.style.opacity=String(Math.min(1,r.t*3))}}buildMinimap(){const e=this.world.arena,n=200,i=document.createElement("canvas");i.width=n,i.height=n;const r=i.getContext("2d"),a=n/(e.half*2+8),o=c=>(c+e.half+4)*a,l=c=>(c+e.half+4)*a;r.fillStyle="rgba(8,14,26,0.9)",r.fillRect(0,0,n,n),r.strokeStyle="rgba(46,242,255,0.08)";for(let c=-e.half;c<=e.half;c+=10)r.beginPath(),r.moveTo(o(c),l(-e.half)),r.lineTo(o(c),l(e.half)),r.stroke(),r.beginPath(),r.moveTo(o(-e.half),l(c)),r.lineTo(o(e.half),l(c)),r.stroke();const h=[...e.boxes].sort((c,u)=>c.maxY-u.maxY);for(const c of h)if(!c.hidden){if(c.mat==="barrier")r.fillStyle="rgba(46,242,255,0.55)";else if(c.mat==="boundary")r.fillStyle="rgba(46,242,255,0.35)";else{const u=Math.min(1,c.maxY/8);r.fillStyle=`rgba(${90+u*60},${110+u*70},${140+u*70},${.35+u*.4})`}r.fillRect(o(c.minX),l(c.minZ),Math.max(1,(c.maxX-c.minX)*a),Math.max(1,(c.maxZ-c.minZ)*a))}for(const c of e.ramps)r.fillStyle=c.bridge?"rgba(46,242,255,0.3)":"rgba(255,176,46,0.35)",r.fillRect(o(c.minX),l(c.minZ),(c.maxX-c.minX)*a,(c.maxZ-c.minZ)*a);this.mapBase=i,this.mapScale=a,this.mapHalf=e.half+4}drawMinimap(t){const e=this.world,n=this.player,i=this.mapCtx,r=200;i.clearRect(0,0,r,r),this.mapBase&&i.drawImage(this.mapBase,0,0);const a=this.mapScale,o=h=>r-(h+this.mapHalf)*a,l=h=>r-(h+this.mapHalf)*a;if(e.mode==="cp"){const h=e.arena.controlPoint;i.beginPath(),i.arc(o(h.x),l(h.z),h.r*a,0,Math.PI*2),i.fillStyle=e.cp.owner==="blue"?"rgba(42,157,255,0.35)":e.cp.owner==="magenta"?"rgba(255,47,200,0.35)":"rgba(255,255,255,0.15)",i.fill(),i.strokeStyle=e.cp.contested?"#ffb02e":"rgba(255,255,255,0.6)",i.stroke()}for(let h=0;h<e.pickups.length;h++){const c=e.pickups[h];c.active&&(i.fillStyle=c.def.kind==="repair"?"#4dff9a":c.def.kind==="overdrive"?"#ffb02e":"#2ef2ff",i.fillRect(o(c.def.x)-2.5,l(c.def.z)-2.5,5,5))}for(const h of e.tanks){if(!h.alive||h===n)continue;const c=n.isEnemyOf(h);c&&!this.spotted[h.id]||(i.fillStyle=c?"#ff2fc8":"#2a9dff",i.beginPath(),i.arc(o(h.x),l(h.z),3.2,0,Math.PI*2),i.fill())}if(n.alive){const h=o(n.x),c=l(n.z);i.fillStyle="rgba(46,242,255,0.12)",i.beginPath(),i.moveTo(h,c);const u=Math.atan2(-Math.cos(t),-Math.sin(t));i.arc(h,c,34,u-.55,u+.55),i.closePath(),i.fill(),i.save(),i.translate(h,c),i.rotate(-n.heading),i.fillStyle="#2ef2ff",i.beginPath(),i.moveTo(0,-6),i.lineTo(4.5,5),i.lineTo(-4.5,5),i.closePath(),i.fill(),i.restore()}}showScoreboard(t){const e=this.world;this.el.scoreboard.classList.toggle("hidden",!t),t&&e&&(this.el.scoreboard.innerHTML=cu(e))}}function cu(s){const t=s.player,e=r=>`<tr class="${r===t?"me":""}${r.alive?"":" dead"}"><td>${Fn(r.name)}${r.isBot?'<span class="bot">BOT</span>':""}</td><td>${r.stats.kills}</td><td>${r.stats.deaths}</td><td>${r.stats.assists}</td><td>${Math.round(r.stats.damage)}</td><td>${r.stats.score}</td></tr>`,n="<tr><th>TANK</th><th>K</th><th>D</th><th>A</th><th>DMG</th><th>SCORE</th></tr>",i=s.ranking();if(_e[s.mode].teams){const r=i.filter(o=>o.team==="blue"),a=i.filter(o=>o.team==="magenta");return`<div class="sb-cols"><div><div class="sb-title blue">BLUE · ${s.score.blue}</div><table class="sb">${n}${r.map(e).join("")}</table></div><div><div class="sb-title magenta">MAGENTA · ${s.score.magenta}</div><table class="sb">${n}${a.map(e).join("")}</table></div></div>`}return`<div class="sb-cols one"><div><div class="sb-title">FREE-FOR-ALL · FIRST TO ${s.config.scoreLimit}</div><table class="sb">${n}${i.map(e).join("")}</table></div></div>`}const qo=30;function hu(){return{version:1,callsign:"PILOT",level:1,xp:0,credits:300,owned:{hulls:["hornet","vanguard"],weapons:["plasma"],paints:["graphite"]},loadout:{hull:"vanguard",weapon:"plasma",paint:"graphite",upgrades:{damage:0,armor:0,speed:0,reload:0}},stats:{matches:0,wins:0,kills:0,deaths:0,assists:0,damage:0,bestStreak:0,playTime:0},tutorialDone:!1,match:{mode:"tdm",arena:"docks",difficulty:"veteran",scoreLimit:25,timeLimit:480}}}function Xr(s){return 400+s*200}function Sx(s){const t=s.result==="win"?300:s.result==="draw"?150:90,e=Math.round(s.score+s.damage/10+t),n=Math.round(s.kills*20+s.assists*8+s.damage/25+(s.result==="win"?150:60));return{xp:e,credits:n}}function wx(s,t){const{xp:e,credits:n}=Sx(t),i=s.level;for(s.credits+=n,s.xp+=e;s.level<qo&&s.xp>=Xr(s.level);)s.xp-=Xr(s.level),s.level++;s.level>=qo&&(s.xp=Math.min(s.xp,Xr(s.level)));const r=s.stats;r.matches++,t.result==="win"&&r.wins++,r.kills+=t.kills,r.deaths+=t.deaths,r.assists+=t.assists,r.damage+=Math.round(t.damage),r.bestStreak=Math.max(r.bestStreak,t.bestStreak),r.playTime+=t.duration;const a=[];for(const o of Object.values($e))o.unlockLevel>i&&o.unlockLevel<=s.level&&a.push(o.name);for(const o of Object.values(Ee))o.unlockLevel>i&&o.unlockLevel<=s.level&&a.push(o.name);for(const o of an)o.unlockLevel>i&&o.unlockLevel<=s.level&&a.push(o.name);return{xp:e,credits:n,levelsGained:s.level-i,newLevel:s.level,unlocked:a}}function vl(s){if(s.kind==="hull")return{name:$e[s.id].name,level:$e[s.id].unlockLevel,cost:$e[s.id].cost};if(s.kind==="weapon")return{name:Ee[s.id].name,level:Ee[s.id].unlockLevel,cost:Ee[s.id].cost};const t=an.find(e=>e.id===s.id);return{name:t.name,level:t.unlockLevel,cost:t.cost}}function uu(s,t){return t.kind==="hull"?s.owned.hulls.includes(t.id):t.kind==="weapon"?s.owned.weapons.includes(t.id):s.owned.paints.includes(t.id)}function du(s,t){if(uu(s,t))return"owned";const e=vl(t);return s.level<e.level?"level":s.credits<e.cost?"credits":"ok"}function Tx(s,t){const e=du(s,t);return e!=="ok"?e:(s.credits-=vl(t).cost,t.kind==="hull"?s.owned.hulls.push(t.id):t.kind==="weapon"?s.owned.weapons.push(t.id):s.owned.paints.push(t.id),"ok")}function fu(s){return s>=kn?1/0:hv[s]}function Ex(s,t){const e=s.loadout.upgrades[t],n=fu(e);return s.credits<n?!1:(s.credits-=n,s.loadout.upgrades[t]=e+1,!0)}const Ax=["menu","modes","garage","settings","controls","pause","end"];class Rx{constructor(t,e,n){y(this,"current","none");y(this,"returnTo","menu");y(this,"tab","hulls");y(this,"selected",null);y(this,"profile");y(this,"settings");y(this,"cb");this.profile=t,this.settings=e,this.cb=n,this.wire(),this.bindSettings()}setProfile(t){this.profile=t,this.refreshProfile()}wire(){const t=(e,n,i="click")=>{tt(e).addEventListener("click",()=>{this.cb.sound(i),n()})};t("btnPlay",()=>this.cb.deploy(),"confirm"),t("btnModes",()=>this.show("modes")),t("btnGarage",()=>this.show("garage")),t("btnSettings",()=>this.show("settings","menu")),t("btnControls",()=>this.show("controls","menu")),t("btnDeploy",()=>this.cb.deploy(),"confirm"),t("btnGarageDeploy",()=>this.cb.deploy(),"confirm"),t("btnResume",()=>this.cb.resume(),"confirm"),t("btnRestart",()=>this.cb.restart()),t("btnPauseSettings",()=>this.show("settings","pause")),t("btnPauseControls",()=>this.show("controls","pause")),t("btnQuit",()=>this.cb.quit(),"back"),t("btnEndAgain",()=>this.cb.deploy(),"confirm"),t("btnEndGarage",()=>this.show("garage")),t("btnEndMenu",()=>this.show("menu"),"back"),t("btnReset",()=>{window.confirm("Reset level, credits, unlocks and upgrades? This cannot be undone.")&&this.cb.resetProgress()}),document.querySelectorAll("[data-back]").forEach(e=>e.addEventListener("click",()=>{this.cb.sound("back"),this.back()})),document.querySelectorAll(".btn, .card, .tabs button").forEach(e=>e.addEventListener("mouseenter",()=>this.cb.sound("hover"))),tt("garageTabs").addEventListener("click",e=>{const n=e.target.closest("[data-tab]");n&&(this.cb.sound("click"),this.tab=n.dataset.tab,this.selected=null,this.renderGarage())})}back(){switch(this.current){case"settings":case"controls":this.show(this.returnTo);break;case"modes":case"garage":this.cb.preview(this.profile.loadout),this.show("menu");break;case"pause":this.cb.resume();break}}show(t,e){e&&(this.returnTo=e),this.current=t;for(const i of Ax)tt(i).classList.toggle("hidden",i!==t);t==="menu"&&this.renderMenu(),t==="modes"&&this.renderModes(),t==="garage"&&(this.selected=null,this.renderGarage()),t==="settings"&&this.syncSettings(),this.cb.screenChanged(t),(t!=="none"?tt(t).querySelector("button, a, input"):null)?.focus({preventScroll:!0})}refreshProfile(){const t=this.profile;tt("pfCall").textContent=t.callsign,tt("pfLevel").textContent=String(t.level);const e=Xr(t.level);tt("pfXp").style.width=`${Math.min(1,t.xp/e)*100}%`,tt("pfXpText").textContent=`${t.xp} / ${e} XP`,tt("pfCredits").textContent=t.credits.toLocaleString("en-US"),tt("gCredits").textContent=t.credits.toLocaleString("en-US");const n=t.match;tt("playSub").textContent=`${_e[n.mode].name} · ${Ws[n.arena].name} · ${Ri[n.difficulty].name}`}renderMenu(){this.refreshProfile();const t=this.profile,e=t.stats,n=e.deaths?(e.kills/e.deaths).toFixed(2):e.kills.toFixed(0),i=t.loadout;tt("careerPanel").innerHTML=`
      <h4>CAREER</h4>
      <dl>
        <dt>Matches</dt><dd>${e.matches}</dd>
        <dt>Wins</dt><dd>${e.wins}</dd>
        <dt>Kills / deaths</dt><dd>${e.kills} / ${e.deaths} (${n})</dd>
        <dt>Best streak</dt><dd>${e.bestStreak}</dd>
        <dt>Damage dealt</dt><dd>${e.damage.toLocaleString("en-US")}</dd>
        <dt>Time in combat</dt><dd>${lu(e.playTime)}</dd>
      </dl>
      <div class="build"><b>CURRENT BUILD</b><br>${$e[i.hull].name} · ${Ee[i.weapon].name}<br><span class="muted">${Fn(an.find(r=>r.id===i.paint)?.name??"")} · upgrades ${i.upgrades.damage}/${i.upgrades.armor}/${i.upgrades.speed}/${i.upgrades.reload}</span></div>`}renderModes(){const t=this.profile.match,e=Object.keys(_e).map(a=>{const o=_e[a];return`<button type="button" class="card${t.mode===a?" active":""}" data-mode="${a}"><h5>${o.name}</h5><p>${o.blurb}</p><span class="tag">${o.teams?"4 V 4 · BOTS":"8 TANKS · BOTS"}</span></button>`}).join("");tt("modeCards").innerHTML=e,tt("arenaCards").innerHTML=lx.map(a=>`<button type="button" class="card${t.arena===a?" active":""}" data-arena="${a}"><h5>${Ws[a].name}</h5><p>${Ws[a].subtitle}</p></button>`).join("");const n=(a,o,l,h)=>{tt(a).innerHTML=o.map(([c,u])=>`<button type="button" data-${h}="${c}" class="${c===l?"active":""}">${u}</button>`).join("")};n("segDifficulty",Object.keys(Ri).map(a=>[a,Ri[a].name]),t.difficulty,"diff");const i=_e[t.mode];n("segScore",i.scoreLimits.map(a=>[String(a),String(a)]),String(t.scoreLimit),"score"),n("segTime",i.timeLimits.map(a=>[String(a),`${a/60} MIN`]),String(t.timeLimit),"time");const r=(a,o,l)=>{tt(a).onclick=h=>{const c=h.target.closest(`[data-${o}]`);c&&(this.cb.sound("click"),l(c.dataset[o]),this.cb.profileChanged(),this.renderModes(),this.refreshProfile())}};r("modeCards","mode",a=>{t.mode=a,_e[t.mode].scoreLimits.includes(t.scoreLimit)||(t.scoreLimit=_e[t.mode].defaultScore)}),r("arenaCards","arena",a=>{t.arena=a}),r("segDifficulty","diff",a=>{t.difficulty=a}),r("segScore","score",a=>{t.scoreLimit=Number(a)}),r("segTime","time",a=>{t.timeLimit=Number(a)})}previewLoadout(){const t={...this.profile.loadout,upgrades:{...this.profile.loadout.upgrades}},e=this.selected;return e?.kind==="hull"&&(t.hull=e.id),e?.kind==="weapon"&&(t.weapon=e.id),e?.kind==="paint"&&(t.paint=e.id),t}renderGarage(){const t=this.profile;this.refreshProfile(),document.querySelectorAll("#garageTabs [data-tab]").forEach(a=>a.classList.toggle("active",a.dataset.tab===this.tab));const e=tt("garageList"),n=this.tab==="hulls"?Object.keys($e).map(a=>({kind:"hull",id:a})):this.tab==="weapons"?Object.keys(Ee).map(a=>({kind:"weapon",id:a})):this.tab==="paint"?an.map(a=>({kind:"paint",id:a.id})):[];if(this.tab==="upgrades"){e.innerHTML=cv.map(a=>{const o=t.loadout.upgrades[a.id],l=fu(o),h=o>=kn,c=Array.from({length:kn},(u,d)=>`<i class="${d<o?"on":""}"></i>`).join("");return`<div class="item"><h5>${a.name}</h5><span class="state">LV ${o}/${kn}</span><p>${a.perLevel} per level. Applies to every hull and turret.</p><div class="upg-pips">${c}</div><div class="act">${h?'<span class="state">MAXED</span>':`<button type="button" class="btn${t.credits>=l?" primary":""}" data-upgrade="${a.id}" ${t.credits>=l?"":"disabled"}>UPGRADE · ◆ ${l}</button>`}</div></div>`}).join(""),e.onclick=a=>{const o=a.target.closest("[data-upgrade]");o&&(Ex(t,o.dataset.upgrade)?(this.cb.sound("confirm"),this.cb.profileChanged()):this.cb.sound("deny"),this.renderGarage())},this.renderStats(this.previewLoadout()),this.cb.preview(this.previewLoadout());return}const i=a=>a.kind==="hull"?t.loadout.hull===a.id:a.kind==="weapon"?t.loadout.weapon===a.id:t.loadout.paint===a.id;e.innerHTML=n.map((a,o)=>{const l=vl(a),h=uu(t,a),c=du(t,a),u=this.selected?this.selected.kind===a.kind&&this.selected.id===a.id:i(a);let d="";i(a)?d='<span class="state">EQUIPPED</span>':h?d='<span class="state">OWNED</span>':c==="level"?d=`<span class="state lock">LOCKED · LV ${l.level}</span>`:d=`<span class="state">◆ ${l.cost}</span>`;let f="",g="",v=Fn(l.name);if(a.kind==="hull"){const p=$e[a.id];f=`${p.blurb} Ability: ${Qs[p.ability].name}.`,g=p.role}if(a.kind==="weapon"){const p=Ee[a.id];f=p.blurb,g=p.role}if(a.kind==="paint"){const p=an.find(_=>_.id===a.id);v=`<span class="swatch" style="background:linear-gradient(135deg,#${p.body.toString(16).padStart(6,"0")} 55%,#${p.accent.toString(16).padStart(6,"0")} 55%)"></span>${Fn(p.name)}`,f="Body finish with a matching emissive trim (team colours still apply in team modes)."}let m="";return u&&!i(a)&&(h?m=`<div class="act"><button type="button" class="btn primary" data-equip="${o}">EQUIP</button></div>`:c==="ok"?m=`<div class="act"><button type="button" class="btn primary" data-buy="${o}">BUY · ◆ ${l.cost}</button></div>`:c==="credits"?m=`<div class="act"><button type="button" class="btn" disabled>NEED ◆ ${l.cost-t.credits} MORE</button></div>`:m=`<div class="act"><button type="button" class="btn" disabled>REACH LEVEL ${l.level}</button></div>`),`<div class="item${u?" selected":""}${!h&&c==="level"?" locked":""}" data-idx="${o}"><div><h5>${v}</h5>${g?`<span class="role">${g}</span>`:""}</div>${d}<p>${f}</p>${m}</div>`}).join(""),e.onclick=a=>{const o=a.target,l=o.closest("[data-equip]"),h=o.closest("[data-buy]");if(l||h){const u=n[Number((l??h).dataset.equip??(l??h).dataset.buy)];if(h&&Tx(t,u)!=="ok"){this.cb.sound("deny");return}u.kind==="hull"&&(t.loadout.hull=u.id),u.kind==="weapon"&&(t.loadout.weapon=u.id),u.kind==="paint"&&(t.loadout.paint=u.id),this.cb.sound("confirm"),this.selected=null,this.cb.profileChanged(),this.renderGarage();return}const c=o.closest("[data-idx]");c&&(this.cb.sound("click"),this.selected=n[Number(c.dataset.idx)],this.renderGarage())};const r=this.previewLoadout();this.renderStats(r),this.cb.preview(r)}renderStats(t){const e=$e[t.hull],n=Ee[t.weapon],i=t.upgrades,r=1+.06*i.damage,a=1-.06*i.reload,o=e.health,l=e.armor+7*i.armor,h=e.maxSpeed*(1+.04*i.speed),c=(n.damage+n.splashDamage)*r,u=1/(n.cooldown*a+n.charge),d=n.magazine>0?n.magazine*c/(n.magazine*n.cooldown*a+n.reloadTime*a):n.heatPerShot>0?c*Math.min(u,n.coolRate/n.heatPerShot+2):c*u,f=n.speed*n.lifetime,g=(m,p,_,b)=>`<div class="stat"><span>${m}</span><i><b style="width:${Math.min(1,p/_)*100}%"></b></i><em>${b}</em></div>`,v=Qs[e.ability];tt("garageStats").innerHTML=`
      <h4>${e.name} · ${n.name}</h4>
      ${g("HULL",o,370,String(o))}
      ${g("ARMOR",l,80,String(l))}
      ${g("TOP SPEED",h,20,`${(h*3.6).toFixed(0)} km/h`)}
      ${g("TURNING",e.turnRate,2.4,`${(e.turnRate*180/Math.PI).toFixed(0)}°/s`)}
      ${g("DMG / SHOT",c,90,c.toFixed(0))}
      ${g("FIRE RATE",u,12,`${u.toFixed(1)}/s`)}
      ${g("SUSTAINED",d,80,`${d.toFixed(0)} dps`)}
      ${g("RANGE",f,280,`${f.toFixed(0)} m`)}
      ${g("TURRET",n.turretSpeed,3,`${(n.turretSpeed*180/Math.PI).toFixed(0)}°/s`)}
      <div class="ability"><b>${v.name}</b> — ${v.blurb} Recharges in ${v.chargeTime}s (faster when dealing damage).</div>`}bindSettings(){const t=this.settings,e=(r,a,o,l)=>{const h=tt(r);h.addEventListener("input",()=>{t[o]=Number(h.value),tt(a).textContent=l(Number(h.value)),this.cb.settingsChanged(t)})},n=r=>`${Math.round(r*100)}%`;e("sMaster","oMaster","masterVolume",n),e("sSfx","oSfx","sfxVolume",n),e("sMusic","oMusic","musicVolume",n),e("sSens","oSens","sensitivity",r=>r.toFixed(2)),e("sFov","oFov","fov",r=>`${r}°`),e("sSmooth","oSmooth","smoothing",n),e("sDist","oDist","cameraDistance",r=>`${r} m`);const i=(r,a)=>{const o=tt(r);o.addEventListener("change",()=>{t[a]=o.checked,this.cb.settingsChanged(t)})};i("sMute","muted"),i("sInvert","invertY"),i("sShake","shake"),i("sFps","showFps"),tt("segQuality").addEventListener("click",r=>{const a=r.target.closest("[data-quality]");a&&(this.cb.sound("click"),t.quality=a.dataset.quality,this.syncSettings(),this.cb.settingsChanged(t))})}syncSettings(){const t=this.settings,e=(n,i)=>{const r=tt(n);typeof i=="boolean"?r.checked=i:r.value=String(i),r.dispatchEvent(new Event(typeof i=="boolean"?"sync":"input"))};e("sMaster",t.masterVolume),e("sSfx",t.sfxVolume),e("sMusic",t.musicVolume),e("sSens",t.sensitivity),e("sFov",t.fov),e("sSmooth",t.smoothing),e("sDist",t.cameraDistance),e("sMute",t.muted),e("sInvert",t.invertY),e("sShake",t.shake),e("sFps",t.showFps),document.querySelectorAll("#segQuality [data-quality]").forEach(n=>n.classList.toggle("active",n.dataset.quality===t.quality)),tt("qualityNote").textContent=t.quality==="low"?"Low: no shadows, bloom or dynamic lights. Applies from the next match.":t.quality==="medium"?"Medium: soft shadows, bloom, a few dynamic lights. Applies from the next match.":"High: sharper shadows, all arena lights, higher resolution. Applies from the next match."}setPauseInfo(t){tt("pauseInfo").textContent=t}showEnd(t,e,n){const i=tt("endTitle");if(i.textContent=e.result==="win"?"VICTORY":e.result==="loss"?"DEFEAT":"DRAW",i.className=`result ${e.result}`,tt("endKicker").textContent=`${_e[t.mode].name} · ${t.arena.name} · ${Ri[t.config.difficulty].name}`,_e[t.mode].teams)tt("endScore").innerHTML=`<span class="blue">BLUE ${t.score.blue}</span> — <span class="magenta">${t.score.magenta} MAGENTA</span>`;else{const l=t.ranking().findIndex(h=>h===t.player)+1;tt("endScore").textContent=`PLACED #${l} OF ${t.tanks.length}`}tt("endBoard").innerHTML=cu(t);const a=n.levelsGained>0?`<div class="lvup">LEVEL UP · LV ${n.newLevel}</div>`:"",o=n.unlocked.length?`<h4 style="margin-top:12px">NOW AVAILABLE</h4><ul>${n.unlocked.map(l=>`<li>${Fn(l)}</li>`).join("")}</ul>`:"";tt("endRewards").innerHTML=`
      <h4>REWARDS</h4>
      <div class="rw"><span>Kills / deaths / assists</span><span>${e.kills} / ${e.deaths} / ${e.assists}</span></div>
      <div class="rw"><span>Damage dealt</span><span>${Math.round(e.damage)}</span></div>
      <div class="rw"><span>Best streak</span><span>${e.bestStreak}</span></div>
      <div class="rw"><span>Experience</span><strong>+${n.xp} XP</strong></div>
      <div class="rw"><span>Credits</span><strong>+◆ ${n.credits}</strong></div>
      ${a}${o}`,this.refreshProfile(),this.show("end")}}const kr=[{text:()=>"Drive with <kbd>W</kbd> <kbd>S</kbd> and turn the hull with <kbd>A</kbd> <kbd>D</kbd>.",done:(s,t)=>t.travelled>18},{text:()=>"Move the mouse to aim — the turret turns on its own, independent of the hull.",done:(s,t)=>t.aimed>1.2},{text:()=>"<b>Left-click</b> to fire. The small ring shows where your barrel points right now.",done:(s,t)=>t.shots>=3},{text:()=>"Hold <kbd>Shift</kbd> while driving forward to boost.",done:(s,t)=>t.boostTime>.8},{text:s=>`When the ring fills, press <kbd>Space</kbd> for <b>${Qs[s.hull.ability].name}</b>.`,done:(s,t)=>t.ability||s.abilityCharge<.05},{text:()=>"<kbd>R</kbd> reloads or vents heat, <kbd>Tab</kbd> shows the score, <kbd>Esc</kbd> pauses. Good hunting!",done:(s,t)=>t.timer>7||t.kills>0}];class Cx{constructor(){y(this,"active",!1);y(this,"step",0);y(this,"hold",0);y(this,"lastX",0);y(this,"lastZ",0);y(this,"lastYaw",0);y(this,"s",{travelled:0,aimed:0,shots:0,boostTime:0,ability:!1,timer:0,kills:0});y(this,"el",tt("tutorial"));y(this,"text",tt("tutText"));y(this,"stepEl",tt("tutStep"));y(this,"onFinish",null);tt("tutSkip").addEventListener("click",()=>this.finish())}start(t){this.active=!0,this.step=0,this.hold=0,Object.assign(this.s,{travelled:0,aimed:0,shots:0,boostTime:0,ability:!1,timer:0,kills:0}),this.lastX=t.x,this.lastZ=t.z,this.lastYaw=t.turretYaw,this.el.classList.remove("hidden"),this.render(t)}stop(){this.active=!1,this.el.classList.add("hidden")}finish(){this.stop(),this.onFinish?.()}noteShot(){this.s.shots++}noteAbility(){this.s.ability=!0}noteKill(){this.s.kills++}update(t,e){if(!this.active)return;const n=this.s;if(t.alive&&(n.travelled+=Math.hypot(t.x-this.lastX,t.z-this.lastZ),n.aimed+=Math.abs(Js(this.lastYaw,t.turretYaw)),t.boosting&&(n.boostTime+=e)),this.lastX=t.x,this.lastZ=t.z,this.lastYaw=t.turretYaw,this.hold>0){if(this.hold-=e,this.hold<=0){if(this.step++,this.step>=kr.length){this.finish();return}n.timer=0,this.render(t)}return}n.timer+=e,kr[this.step].done(t,n)&&(this.hold=.9,this.text.classList.add("done"))}render(t){this.text.classList.remove("done"),this.text.innerHTML=kr[this.step].text(t),this.stepEl.textContent=`${this.step+1} / ${kr.length}`}}class Px{constructor(t){y(this,"down",new Set);y(this,"pressed",new Set);y(this,"mouseDX",0);y(this,"mouseDY",0);y(this,"wheel",0);y(this,"fireHeld",!1);y(this,"locked",!1);y(this,"enabled",!1);y(this,"allowUnlocked",!1);y(this,"onLockChange",null);y(this,"cleanup",[]);y(this,"target");this.target=t,this.on(window,"keydown",e=>{const n=e;this.enabled&&["Space","Tab","ShiftLeft","ShiftRight","ArrowUp","ArrowDown"].includes(n.code)&&n.preventDefault(),this.down.has(n.code)||this.pressed.add(n.code),this.down.add(n.code)}),this.on(window,"keyup",e=>this.down.delete(e.code)),this.on(window,"blur",()=>this.releaseAll()),this.on(document,"mousemove",e=>{if(!this.locked)return;const n=e;Math.abs(n.movementX)>500||Math.abs(n.movementY)>500||(this.mouseDX+=n.movementX,this.mouseDY+=n.movementY)}),this.on(t,"mousedown",e=>{const n=e;!this.locked&&!this.allowUnlocked||n.button===0&&(this.fireHeld=!0)}),this.on(window,"mouseup",e=>{e.button===0&&(this.fireHeld=!1)}),this.on(t,"contextmenu",e=>e.preventDefault()),this.on(t,"wheel",e=>{const n=e;n.preventDefault(),this.wheel+=Math.sign(n.deltaY)},{passive:!1}),this.on(document,"pointerlockchange",()=>{this.locked=document.pointerLockElement===this.target,this.locked||(this.fireHeld=!1),this.onLockChange?.(this.locked)})}on(t,e,n,i){t.addEventListener(e,n,i),this.cleanup.push(()=>t.removeEventListener(e,n,i))}isDown(t){return this.enabled&&this.down.has(t)}wasPressed(t){return this.pressed.has(t)}axis(t,e,n,i){let r=0;return(this.isDown(t)||n!==void 0&&this.isDown(n))&&(r-=1),(this.isDown(e)||i!==void 0&&this.isDown(i))&&(r+=1),r}requestLock(){if(document.pointerLockElement!==this.target)try{const t=this.target.requestPointerLock();t instanceof Promise&&t.catch(()=>{})}catch{}}exitLock(){document.pointerLockElement&&document.exitPointerLock()}releaseAll(){this.down.clear(),this.fireHeld=!1}endFrame(){this.pressed.clear(),this.mouseDX=0,this.mouseDY=0,this.wheel=0}dispose(){this.cleanup.forEach(t=>t()),this.cleanup.length=0}}const pu="neon-tanks.settings.v1",xl="neon-tanks.profile.v1";function mu(s){try{const t=window.localStorage.getItem(s);return t?JSON.parse(t):null}catch{return null}}function _l(s,t){try{window.localStorage.setItem(s,JSON.stringify(t))}catch{}}const bi=s=>typeof s=="object"&&s!==null&&!Array.isArray(s),pe=(s,t,e,n)=>typeof s=="number"&&Number.isFinite(s)?Math.min(e,Math.max(t,s)):n,Bs=(s,t)=>typeof s=="boolean"?s:t,Si=(s,t,e)=>typeof s=="string"&&t.includes(s)?s:e,Lx={masterVolume:.8,sfxVolume:.85,musicVolume:.45,muted:!1,sensitivity:1,invertY:!1,fov:68,smoothing:.35,shake:!0,quality:"medium",showFps:!1,cameraDistance:12.5};function Dx(){const s=mu(pu),t=Lx;return bi(s)?{masterVolume:pe(s.masterVolume,0,1,t.masterVolume),sfxVolume:pe(s.sfxVolume,0,1,t.sfxVolume),musicVolume:pe(s.musicVolume,0,1,t.musicVolume),muted:Bs(s.muted,t.muted),sensitivity:pe(s.sensitivity,.2,3,t.sensitivity),invertY:Bs(s.invertY,t.invertY),fov:pe(s.fov,55,90,t.fov),smoothing:pe(s.smoothing,0,1,t.smoothing),shake:Bs(s.shake,t.shake),quality:Si(s.quality,["low","medium","high"],t.quality),showFps:Bs(s.showFps,t.showFps),cameraDistance:pe(s.cameraDistance,5.5,22,t.cameraDistance)}:{...t}}function Ix(s){_l(pu,s)}const Ux=Object.keys($e),Nx=Object.keys(Ee),kx=an.map(s=>s.id);function Ka(s,t,e){const n=new Set(e);if(Array.isArray(s))for(const i of s)typeof i=="string"&&t.includes(i)&&n.add(i);return[...n]}function Fx(){const s=mu(xl),t=hu();if(!bi(s))return t;const e=bi(s.owned)?s.owned:{},n={version:1,callsign:typeof s.callsign=="string"&&s.callsign.replace(/[^\w\- ]/g,"").slice(0,14).toUpperCase()||t.callsign,level:Math.floor(pe(s.level,1,qo,1)),xp:Math.floor(pe(s.xp,0,1e7,0)),credits:Math.floor(pe(s.credits,0,1e8,t.credits)),owned:{hulls:Ka(e.hulls,Ux,t.owned.hulls),weapons:Ka(e.weapons,Nx,t.owned.weapons),paints:Ka(e.paints,kx,t.owned.paints)},loadout:t.loadout,stats:t.stats,tutorialDone:Bs(s.tutorialDone,!1),match:t.match};if(bi(s.loadout)){const i=s.loadout,r=bi(i.upgrades)?i.upgrades:{};n.loadout={hull:Si(i.hull,n.owned.hulls,t.loadout.hull),weapon:Si(i.weapon,n.owned.weapons,t.loadout.weapon),paint:Si(i.paint,n.owned.paints,t.loadout.paint),upgrades:{damage:Math.floor(pe(r.damage,0,kn,0)),armor:Math.floor(pe(r.armor,0,kn,0)),speed:Math.floor(pe(r.speed,0,kn,0)),reload:Math.floor(pe(r.reload,0,kn,0))}}}if(bi(s.stats)){const i=s.stats;n.stats={matches:Math.floor(pe(i.matches,0,1e7,0)),wins:Math.floor(pe(i.wins,0,1e7,0)),kills:Math.floor(pe(i.kills,0,1e8,0)),deaths:Math.floor(pe(i.deaths,0,1e8,0)),assists:Math.floor(pe(i.assists,0,1e8,0)),damage:Math.floor(pe(i.damage,0,1e10,0)),bestStreak:Math.floor(pe(i.bestStreak,0,1e5,0)),playTime:pe(i.playTime,0,1e9,0)}}if(bi(s.match)){const i=s.match,r=Si(i.mode,Object.keys(_e),t.match.mode);n.match={mode:r,arena:Si(i.arena,["docks","void"],t.match.arena),difficulty:Si(i.difficulty,Object.keys(Ri),t.match.difficulty),scoreLimit:_e[r].scoreLimits.includes(i.scoreLimit)?i.scoreLimit:_e[r].defaultScore,timeLimit:_e[r].timeLimits.includes(i.timeLimit)?i.timeLimit:480}}return n}function Ja(s){_l(xl,s)}function zx(){const s=hu();return _l(xl,s),s}const Ox=1/60,Bx=.1,yn={t:0,x:0,y:0,z:0,nx:0,ny:0,nz:0},xe=new D,Qa=new D,Fr={x:0,y:0,z:0},zr={x:0,y:0,z:0};class Hx{constructor(t){y(this,"r");y(this,"garage");y(this,"input");y(this,"audio",new av);y(this,"hud",new bx);y(this,"menus");y(this,"tutorial",new Cx);y(this,"camera",new Ne(68,1,.1,2e3));y(this,"rig");y(this,"settings");y(this,"profile");y(this,"world",null);y(this,"scene",null);y(this,"phase","menu");y(this,"raf",0);y(this,"last",0);y(this,"time",0);y(this,"endTimer",-1);y(this,"wasAlive",!0);y(this,"combatHeat",0);y(this,"fpsAcc",0);y(this,"fpsFrames",0);y(this,"slowAcc",0);y(this,"fastAcc",0);y(this,"resumeLockPending",!1);y(this,"contextLost",!1);y(this,"disposed",!1);y(this,"viewW",0);y(this,"viewH",0);y(this,"cleanup",[]);y(this,"barrelScreen",{x:0,y:0,blocked:!1,ready:!0});this.settings=Dx(),this.profile=Fx(),this.r=new nx(t,this.settings.quality),this.garage=new kv(this.r.env),this.input=new Px(t),this.rig=new lv(this.camera),this.rig.targetDistance=this.settings.cameraDistance,this.audio.setVolumes(this.settings.masterVolume,this.settings.sfxVolume,this.settings.musicVolume,this.settings.muted),this.menus=new Rx(this.profile,this.settings,{deploy:()=>this.deploy(),resume:()=>this.resume(),restart:()=>this.deploy(),quit:()=>this.quitToMenu(),settingsChanged:n=>this.applySettings(n),preview:n=>this.previewLoadout(n),profileChanged:()=>Ja(this.profile),resetProgress:()=>{this.profile=zx(),this.menus.setProfile(this.profile),this.previewLoadout(this.profile.loadout),this.menus.show("menu")},sound:n=>{this.audio.unlock(),this.audio.ui(n)},screenChanged:n=>this.onScreen(n)}),this.tutorial.onFinish=()=>{this.profile.tutorialDone=!0,Ja(this.profile)},this.input.onLockChange=n=>this.onLockChange(n),tt("btnLock").addEventListener("click",()=>{this.audio.unlock(),this.input.requestLock()});const e=(n,i,r)=>{n.addEventListener(i,r),this.cleanup.push(()=>n.removeEventListener(i,r))};e(window,"resize",()=>this.resize()),e(window,"keydown",n=>this.onKey(n)),e(window,"keyup",n=>{n.code==="Tab"&&this.hud.showScoreboard(!1)}),e(document,"visibilitychange",()=>{this.audio.suspend(document.hidden),document.hidden&&this.phase==="playing"&&this.pause()}),e(window,"pointerdown",()=>this.audio.unlock()),e(t,"webglcontextlost",n=>{n.preventDefault(),this.contextLost=!0,this.phase==="playing"&&this.pause(),tt("loadText").textContent="GRAPHICS CONTEXT LOST — RESTORING…",tt("loading").classList.remove("hidden")}),e(t,"webglcontextrestored",()=>{this.contextLost=!1,tt("loading").classList.add("hidden"),this.resize()}),this.previewLoadout(this.profile.loadout),this.resize(),this.menus.show("menu")}start(){this.last=performance.now();const t=e=>{if(this.disposed)return;this.raf=requestAnimationFrame(t);const n=Math.min(Bx,Math.max(0,(e-this.last)/1e3));this.last=e,this.frame(n)};this.raf=requestAnimationFrame(t)}onScreen(t){this.phase==="ended"&&(t==="menu"||t==="garage"||t==="modes")&&(this.teardownMatch(),this.phase="menu"),this.input.enabled=t==="none"&&this.phase==="playing",(t==="garage"||t==="menu"||t==="modes")&&this.previewLoadout(t==="garage"?null:this.profile.loadout)}previewLoadout(t){const e=t??this.profile.loadout,n=an.find(i=>i.id===e.paint)??an[0];this.garage.setLook({hull:e.hull,weapon:e.weapon,body:n.body,metal:n.metal,accent:n.accent,light:14219007})}applySettings(t){this.settings=t,Ix(t),this.audio.setVolumes(t.masterVolume,t.sfxVolume,t.musicVolume,t.muted),this.phase==="menu"&&t.quality!==this.r.level&&(this.r.setQuality(t.quality),this.resize())}resize(){const t=window.innerWidth,e=window.innerHeight;this.viewW=t,this.viewH=e,this.r.resize(t,e),this.camera.aspect=t/Math.max(1,e),this.camera.updateProjectionMatrix(),this.garage.resize(t,e),this.scene?.fx.setPixelScale(e*this.r.pixelRatio,this.camera.fov)}onKey(t){if(t.code==="KeyM"&&!t.repeat){this.settings.muted=!this.settings.muted,this.applySettings(this.settings),this.menus.syncSettings();return}if(t.code==="Tab"&&(this.phase==="playing"||this.phase==="ended")&&this.world){t.preventDefault(),this.hud.showScoreboard(!0);return}t.code==="Escape"&&(this.phase==="playing"&&!this.input.locked?this.pause():this.phase==="paused"&&this.menus.current==="pause"?this.resume():this.phase==="paused"&&this.menus.current==="none"?(this.resumeLockPending=!1,tt("lockPrompt").classList.add("hidden"),this.menus.show("pause")):this.menus.current!=="none"&&this.menus.current!=="menu"&&this.menus.current!=="end"&&this.menus.back())}onLockChange(t){if(t){tt("lockPrompt").classList.add("hidden"),this.phase==="paused"&&this.resumeLockPending&&this.resume();return}this.phase==="playing"&&this.pause()}deploy(){this.audio.unlock(),this.input.allowUnlocked||this.input.requestLock(),this.teardownMatch(),this.phase="loading",this.menus.show("none");const t=this.profile.match;tt("loadText").textContent=`DEPLOYING TO ${Ws[t.arena].name}…`,tt("loadBar").style.width="40%",tt("loading").classList.remove("hidden"),window.setTimeout(()=>this.buildMatch(),30)}buildMatch(){const t=this.profile.match;ou(t.arena),tt("loadBar").style.width="75%";const e=an.find(i=>i.id===this.profile.loadout.paint)??an[0];this.world=new yx({mode:t.mode,arena:t.arena,difficulty:t.difficulty,scoreLimit:t.scoreLimit,timeLimit:t.timeLimit,player:{name:this.profile.callsign,loadout:this.profile.loadout,paint:e},seed:(Date.now()&65535)+1}),this.settings.quality!==this.r.level&&this.r.setQuality(this.settings.quality),this.scene=new Xv(this.world,this.r),this.hud.bind(this.world);const n=this.world.player;this.rig.reset(n.heading),this.rig.targetDistance=this.settings.cameraDistance,this.rig.update(0,n.x,n.y,n.z,this.world.collision,this.camSettings()),this.resize(),this.r.renderer.compile(this.scene.scene,this.camera),this.wasAlive=!0,this.endTimer=-1,this.combatHeat=0,this.menus.setPauseInfo(`${_e[t.mode].name} · ${Ws[t.arena].name} · ${Ri[t.difficulty].name}`),tt("loading").classList.add("hidden"),tt("loadBar").style.width="100%",this.hud.show(!0),this.phase="playing",this.input.enabled=!0,this.input.releaseAll(),!this.input.locked&&!this.input.allowUnlocked&&tt("lockPrompt").classList.remove("hidden"),this.profile.tutorialDone?this.tutorial.stop():this.tutorial.start(n)}pause(){this.phase==="playing"&&(this.phase="paused",this.input.enabled=!1,this.input.releaseAll(),this.input.exitLock(),this.hud.showScoreboard(!1),tt("lockPrompt").classList.add("hidden"),this.audio.setEngine(null),this.menus.show("pause"))}resume(){if(this.phase==="paused"){if(!this.input.locked&&!this.input.allowUnlocked){this.resumeLockPending=!0,this.input.requestLock(),this.menus.show("none"),tt("lockPrompt").classList.remove("hidden"),this.phase="paused";return}this.resumeLockPending=!1,this.menus.show("none"),this.phase="playing",this.input.enabled=!0,this.last=performance.now()}}quitToMenu(){this.teardownMatch(),this.phase="menu",this.input.exitLock(),this.menus.show("menu")}teardownMatch(){this.tutorial.stop(),this.hud.show(!1),this.hud.showScoreboard(!1),tt("lockPrompt").classList.add("hidden"),this.audio.setEngine(null),this.audio.setNearbyEngine(null,0),this.scene?.dispose(),this.scene=null,this.world=null,this.resumeLockPending=!1}finishMatch(){const t=this.world,e=t.player,i={result:t.playerResult(),kills:e.stats.kills,deaths:e.stats.deaths,assists:e.stats.assists,damage:e.stats.damage,score:e.stats.score,bestStreak:e.stats.bestStreak,duration:t.config.timeLimit-t.timeLeft},r=wx(this.profile,i);Ja(this.profile),this.phase="ended",this.input.enabled=!1,this.input.exitLock(),this.tutorial.stop(),this.audio.setEngine(null),this.menus.showEnd(t,i,r)}camSettings(){return{sensitivity:this.settings.sensitivity,invertY:this.settings.invertY,smoothing:this.settings.smoothing,fov:this.settings.fov,shake:this.settings.shake}}frame(t){if(this.contextLost)return;(window.innerWidth!==this.viewW||window.innerHeight!==this.viewH)&&this.resize(),this.time+=t;const e=performance.now();this.world&&this.scene&&(this.phase==="playing"||this.phase==="paused"||this.phase==="ended")?this.matchFrame(t):(this.garage.update(t,this.time),this.r.render(this.garage.scene,this.garage.camera)),this.input.endFrame(),this.perf(t,performance.now()-e)}matchFrame(t){const e=this.world,n=this.scene,i=e.player,r=this.phase==="playing"||this.phase==="ended",a=this.camSettings();if(this.phase==="playing"&&(this.rig.look(this.input.mouseDX,this.input.mouseDY,a),this.input.wheel&&this.rig.zoom(this.input.wheel),this.playerControls()),r){const h=Math.max(1,Math.ceil(t/Ox-1e-6)),c=t/h;for(let u=0;u<h;u++)e.step(c),this.dispatchEvents()}i.alive&&!this.wasAlive&&this.rig.reset(i.heading),this.wasAlive=i.alive,this.rig.update(t,i.x,i.y,i.z,e.collision,a),r&&n.update(t,this.time),this.r.render(n.scene,this.camera),this.computeBarrelScreen();const{w:o,h:l}=this.r.size;if(this.hud.update(r?t:0,this.camera,this.rig.yaw,o,l,this.barrelScreen),this.phase==="playing"&&this.tutorial.update(i,t),this.rig.dir(xe),this.audio.setListener(this.camera.position.x,this.camera.position.y,this.camera.position.z,xe.x,xe.y,xe.z),this.phase==="playing"&&i.alive){this.audio.setEngine({speed:Je(Math.abs(i.speed)/i.hull.maxSpeed,0,1.4),load:Math.abs(i.controls.throttle),boost:i.boosting,heavy:i.hull.mass/2.1});let h=null,c=45;for(const u of e.tanks){if(u===i||!u.alive)continue;const d=Math.hypot(u.x-i.x,u.z-i.z);d<c&&(c=d,h=u)}this.audio.setNearbyEngine(h?{x:h.x,y:h.y+1,z:h.z}:null,h?Math.min(1,Math.hypot(h.vx,h.vz)/14):0)}else this.phase==="playing"&&this.audio.setEngine(null);this.combatHeat=Math.max(0,this.combatHeat-t*.08),this.audio.setIntensity(this.phase==="playing"?.35+this.combatHeat*.65:.2),this.endTimer>=0&&(this.endTimer-=t,this.endTimer<0&&this.finishMatch())}playerControls(){const t=this.world,e=t.player,n=e.controls,i=this.input;n.throttle=i.axis("KeyS","KeyW","ArrowDown","ArrowUp"),n.steer=i.axis("KeyD","KeyA","ArrowRight","ArrowLeft"),n.boost=i.isDown("ShiftLeft")||i.isDown("ShiftRight"),n.fire=i.fireHeld&&i.enabled,n.ability=i.enabled&&i.wasPressed("Space"),n.reload=i.enabled&&i.wasPressed("KeyR"),this.rig.dir(xe);const r=this.camera.position;let a=420,o=r.x+xe.x*a,l=r.y+xe.y*a,h=r.z+xe.z*a;t.collision.raycast(r.x,r.y,r.z,xe.x,xe.y,xe.z,a,yn)&&(a=yn.t,o=yn.x,l=yn.y,h=yn.z);for(const _ of t.tanks){if(_===e||!_.alive)continue;const b=ru(_,r.x,r.y,r.z,xe.x*a,xe.y*a,xe.z*a);b>=0&&(a*=b,o=r.x+xe.x*a,l=r.y+xe.y*a,h=r.z+xe.z*a)}const c=e.x,u=e.y+e.pivotHeight,d=e.z;let f=o-c,g=h-d,v=Math.hypot(f,g);v<6&&(o=c+xe.x*40,h=d+xe.z*40,l=u+xe.y*40,f=o-c,g=h-d,v=Math.hypot(f,g)),n.aimYaw=Math.atan2(f,g);const m=e.weapon,p=l-u;if(m.gravity>0){const _=m.speed,b=m.gravity,x=_*_*_*_-b*(b*v*v+2*p*_*_);n.aimPitch=x>0?Math.atan((_*_-Math.sqrt(x))/(b*v)):m.pitchMax}else n.aimPitch=Math.atan2(p,v)}computeBarrelScreen(){const t=this.world,e=t.player,n=this.barrelScreen;if(!e.alive)return;e.muzzle(Fr),e.barrelDir(zr);const i=e.weapon;let r=Fr.x,a=Fr.y,o=Fr.z,l=zr.x*i.speed,h=zr.y*i.speed,c=zr.z*i.speed;const u=i.gravity>0?.05:Math.min(.1,300/i.speed/20);let d=0,f=!1;for(let m=0;m<60;m++){h-=i.gravity*u;const p=l*u,_=h*u,b=c*u;if(t.collision.raycast(r,a,o,p,_,b,1,yn)){r=yn.x,a=yn.y,o=yn.z,d+=Math.hypot(p,_,b)*yn.t,f=d<7;break}if(r+=p,a+=_,o+=b,d+=Math.hypot(p,_,b),d>i.speed*i.lifetime)break}Qa.set(r,a,o).project(this.camera);const{w:g,h:v}=this.r.size;n.x=(Qa.x*.5+.5)*g,n.y=(-Qa.y*.5+.5)*v,n.blocked=f,n.ready=e.cooldown<=0&&e.reloadTimer<=0&&e.overheated<=0&&!e.venting}dispatchEvents(){const t=this.world,e=this.scene,n=t.player,i=t.events;for(let r=0;r<i.count;r++){const a=i.get(r);e.handle(a),this.hud.onEvent(a);const o=a.a===n.id;switch(a.type){case"fire":{const l=Ee[a.kind].projectile;this.audio.fire(l,a,o),o&&(this.tutorial.noteShot(),(l==="rail"||l==="nova")&&this.rig.addTrauma(l==="rail"?.25:.12));break}case"charge":{const l=t.tanks[a.a];this.audio.charge(o,{x:l.x,y:l.y+2,z:l.z});break}case"impact":this.audio.impact(Ee[a.kind].projectile,a,a.a>=0);break;case"explode":{const l=t.tanks[a.a],h=a.kind==="shockwave"?{x:l.x,y:l.y,z:l.z}:a;a.kind==="shockwave"?this.audio.ability("shockwave",h,o):this.audio.explosion(h,!1);const c=Math.hypot(h.x-n.x,h.z-n.z);c<25&&this.rig.addTrauma((1-c/25)*.35);break}case"damage":a.b===n.id&&a.a!==n.id&&(this.audio.hitConfirm(!1),this.combatHeat=Math.min(1,this.combatHeat+.15)),a.a===n.id&&(this.audio.damageTaken(a.value,n.health<n.maxHealth*.3),this.rig.addTrauma(Math.min(.5,a.value/70)),this.combatHeat=Math.min(1,this.combatHeat+.2));break;case"kill":{const l=t.tanks[a.a];this.audio.explosion({x:l.x,y:l.y+1,z:l.z},!0),a.b===n.id&&a.a!==n.id&&(this.audio.hitConfirm(!0),this.tutorial.noteKill());const h=Math.hypot(l.x-n.x,l.z-n.z);o?this.rig.addTrauma(.6):h<30&&this.rig.addTrauma((1-h/30)*.5);break}case"pickup":o&&this.audio.pickup(a.kind);break;case"ability":{const l=t.tanks[a.a];a.kind!=="shockwave"&&this.audio.ability(a.kind,{x:l.x,y:l.y+1,z:l.z},o),o&&this.tutorial.noteAbility();break}case"reload":o&&this.audio.reload(!0);break;case"overheat":o&&this.audio.overheat();break;case"capture":this.audio.capture(a.kind===n.team);break;case"countdown":this.audio.countdown(a.value);break;case"matchEnd":this.audio.matchEnd(t.playerResult()==="win"),this.hud.banner(_e[t.mode].name,t.playerResult()==="win"?"VICTORY":t.playerResult()==="loss"?"DEFEAT":"DRAW",t.playerResult()==="loss"?"red":""),this.endTimer=3,this.input.enabled=!1,this.tutorial.stop();break}}i.clear()}perf(t,e){this.fpsAcc+=t,this.fpsFrames++,this.fpsAcc>=.5&&(this.hud.setFps(this.settings.showFps&&!!this.world,this.fpsFrames/this.fpsAcc),this.fpsAcc=0,this.fpsFrames=0),this.phase==="playing"&&(t>1/40||e>22?(this.slowAcc+=t,this.fastAcc=0):t<1/55&&(this.fastAcc+=t,this.slowAcc=Math.max(0,this.slowAcc-t*.5)),this.slowAcc>2&&this.r.scale>.6?(this.r.scale=Math.max(.6,this.r.scale-.1),this.slowAcc=0,this.resize()):this.fastAcc>6&&this.r.scale<1&&(this.r.scale=Math.min(1,this.r.scale+.05),this.fastAcc=0,this.resize()))}advance(t,e=1/60){for(let n=0;n<t;n+=e)this.frame(e)}setTestMode(t){this.input.allowUnlocked=t}get debug(){return{world:this.world,phase:this.phase,rig:this.rig,input:this.input,profile:this.profile}}dispose(){this.disposed=!0,cancelAnimationFrame(this.raf),this.teardownMatch(),this.cleanup.forEach(t=>t()),this.input.dispose(),this.audio.dispose(),this.garage.dispose(),this.r.dispose()}}function Vx(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function rh(s){document.getElementById("loading")?.classList.add("hidden"),document.getElementById("fatalText").textContent=s,document.getElementById("fatal").classList.remove("hidden")}function Gx(){if(!Vx()){rh("Your browser could not start WebGL 2, which NEON TANKS needs to render the arena.");return}const s=document.getElementById("loadBar");s&&(s.style.width="60%");let t;try{t=new Hx(document.getElementById("scene"))}catch(e){console.error(e),rh("The game failed to start on this device. Details are in the browser console.");return}t.start(),s&&(s.style.width="100%"),window.setTimeout(()=>document.getElementById("loading")?.classList.add("hidden"),150),window.addEventListener("pagehide",()=>t.dispose(),{once:!0}),new URLSearchParams(location.search).has("debug")&&(window.__nt=t)}window.setTimeout(Gx,30);
