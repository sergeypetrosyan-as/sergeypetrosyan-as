var Uu=Object.defineProperty;var Nu=(s,t,e)=>t in s?Uu(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var y=(s,t,e)=>Nu(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const nl="170",ku=0,Nl=1,Fu=2,gh=1,vh=2,kn=3,fi=0,we=1,qe=2,Bn=0,ui=1,We=2,kl=3,Fl=4,zu=5,Ai=100,Ou=101,Bu=102,Hu=103,Vu=104,Gu=200,Wu=201,Xu=202,Yu=203,oo=204,lo=205,qu=206,$u=207,Zu=208,ju=209,Ku=210,Ju=211,Qu=212,td=213,ed=214,co=0,ho=1,uo=2,gs=3,fo=4,po=5,mo=6,go=7,xh=0,nd=1,id=2,di=0,_h=1,Mh=2,yh=3,il=4,sd=5,bh=6,Sh=7,wh=300,vs=301,xs=302,vo=303,xo=304,ca=306,_s=1e3,Ci=1001,_o=1002,tn=1003,rd=1004,or=1005,Tn=1006,Ma=1007,Pi=1008,Wn=1009,Th=1010,Eh=1011,Ks=1012,sl=1013,Ii=1014,En=1015,Hn=1016,rl=1017,al=1018,Ms=1020,Ah=35902,Rh=1021,Ch=1022,mn=1023,Ph=1024,Lh=1025,us=1026,ys=1027,ol=1028,ll=1029,Dh=1030,cl=1031,hl=1033,Wr=33776,Xr=33777,Yr=33778,qr=33779,Mo=35840,yo=35841,bo=35842,So=35843,wo=36196,To=37492,Eo=37496,Ao=37808,Ro=37809,Co=37810,Po=37811,Lo=37812,Do=37813,Io=37814,Uo=37815,No=37816,ko=37817,Fo=37818,zo=37819,Oo=37820,Bo=37821,$r=36492,Ho=36494,Vo=36495,Ih=36283,Go=36284,Wo=36285,Xo=36286,ad=3200,od=3201,Uh=0,ld=1,oi="",Ge="srgb",Ts="srgb-linear",ha="linear",re="srgb",Oi=7680,zl=519,cd=512,hd=513,ud=514,Nh=515,dd=516,fd=517,pd=518,md=519,Yo=35044,ls=35048,Ol="300 es",Fn=2e3,Kr=2001;class Es{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const De=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ya=Math.PI/180,Jr=180/Math.PI;function Vn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(De[s&255]+De[s>>8&255]+De[s>>16&255]+De[s>>24&255]+"-"+De[t&255]+De[t>>8&255]+"-"+De[t>>16&15|64]+De[t>>24&255]+"-"+De[e&63|128]+De[e>>8&255]+"-"+De[e>>16&255]+De[e>>24&255]+De[n&255]+De[n>>8&255]+De[n>>16&255]+De[n>>24&255]).toLowerCase()}function Ne(s,t,e){return Math.max(t,Math.min(e,s))}function gd(s,t){return(s%t+t)%t}function ba(s,t,e){return(1-e)*s+e*t}function wn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ae(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class et{constructor(t=0,e=0){et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gt{constructor(t,e,n,i,r,a,o,l,h){Gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,h)}set(t,e,n,i,r,a,o,l,h){const c=this.elements;return c[0]=t,c[1]=i,c[2]=o,c[3]=e,c[4]=r,c[5]=l,c[6]=n,c[7]=a,c[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],h=n[1],c=n[4],u=n[7],d=n[2],f=n[5],m=n[8],v=i[0],g=i[3],p=i[6],_=i[1],M=i[4],x=i[7],C=i[2],A=i[5],R=i[8];return r[0]=a*v+o*_+l*C,r[3]=a*g+o*M+l*A,r[6]=a*p+o*x+l*R,r[1]=h*v+c*_+u*C,r[4]=h*g+c*M+u*A,r[7]=h*p+c*x+u*R,r[2]=d*v+f*_+m*C,r[5]=d*g+f*M+m*A,r[8]=d*p+f*x+m*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8];return e*a*c-e*o*h-n*r*c+n*o*l+i*r*h-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],u=c*a-o*h,d=o*l-c*r,f=h*r-a*l,m=e*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return t[0]=u*v,t[1]=(i*h-c*n)*v,t[2]=(o*n-i*a)*v,t[3]=d*v,t[4]=(c*e-i*l)*v,t[5]=(i*r-o*e)*v,t[6]=f*v,t[7]=(n*l-h*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),h=Math.sin(r);return this.set(n*l,n*h,-n*(l*a+h*o)+a+t,-i*h,i*l,-i*(-h*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Sa.makeScale(t,e)),this}rotate(t){return this.premultiply(Sa.makeRotation(-t)),this}translate(t,e){return this.premultiply(Sa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Sa=new Gt;function kh(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Qr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function vd(){const s=Qr("canvas");return s.style.display="block",s}const Bl={};function Gs(s){s in Bl||(Bl[s]=!0,console.warn(s))}function xd(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function _d(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Md(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Zt={enabled:!0,workingColorSpace:Ts,spaces:{},convert:function(s,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===re&&(s.r=Gn(s.r),s.g=Gn(s.g),s.b=Gn(s.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(s.applyMatrix3(this.spaces[t].toXYZ),s.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===re&&(s.r=ds(s.r),s.g=ds(s.g),s.b=ds(s.b))),s},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===oi?ha:this.spaces[s].transfer},getLuminanceCoefficients:function(s,t=this.workingColorSpace){return s.fromArray(this.spaces[t].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,t,e){return s.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Gn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ds(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Hl=[.64,.33,.3,.6,.15,.06],Vl=[.2126,.7152,.0722],Gl=[.3127,.329],Wl=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xl=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Zt.define({[Ts]:{primaries:Hl,whitePoint:Gl,transfer:ha,toXYZ:Wl,fromXYZ:Xl,luminanceCoefficients:Vl,workingColorSpaceConfig:{unpackColorSpace:Ge},outputColorSpaceConfig:{drawingBufferColorSpace:Ge}},[Ge]:{primaries:Hl,whitePoint:Gl,transfer:re,toXYZ:Wl,fromXYZ:Xl,luminanceCoefficients:Vl,outputColorSpaceConfig:{drawingBufferColorSpace:Ge}}});let Bi;class yd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Bi===void 0&&(Bi=Qr("canvas")),Bi.width=t.width,Bi.height=t.height;const n=Bi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Bi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Qr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Gn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Gn(e[n]/255)*255):e[n]=Gn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let bd=0;class Fh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bd++}),this.uuid=Vn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(wa(i[a].image)):r.push(wa(i[a]))}else r=wa(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function wa(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?yd.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Sd=0;class Oe extends Es{constructor(t=Oe.DEFAULT_IMAGE,e=Oe.DEFAULT_MAPPING,n=Ci,i=Ci,r=Tn,a=Pi,o=mn,l=Wn,h=Oe.DEFAULT_ANISOTROPY,c=oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sd++}),this.uuid=Vn(),this.name="",this.source=new Fh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new et(0,0),this.repeat=new et(1,1),this.center=new et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case _s:t.x=t.x-Math.floor(t.x);break;case Ci:t.x=t.x<0?0:1;break;case _o:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case _s:t.y=t.y-Math.floor(t.y);break;case Ci:t.y=t.y<0?0:1;break;case _o:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Oe.DEFAULT_IMAGE=null;Oe.DEFAULT_MAPPING=wh;Oe.DEFAULT_ANISOTROPY=1;class oe{constructor(t=0,e=0,n=0,i=1){oe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,h=l[0],c=l[4],u=l[8],d=l[1],f=l[5],m=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(c-d)<.01&&Math.abs(u-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(c+d)<.1&&Math.abs(u+v)<.1&&Math.abs(m+g)<.1&&Math.abs(h+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(h+1)/2,x=(f+1)/2,C=(p+1)/2,A=(c+d)/4,R=(u+v)/4,I=(m+g)/4;return M>x&&M>C?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=A/n,r=R/n):x>C?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=A/i,r=I/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=R/r,i=I/r),this.set(n,i,r,e),this}let _=Math.sqrt((g-m)*(g-m)+(u-v)*(u-v)+(d-c)*(d-c));return Math.abs(_)<.001&&(_=1),this.x=(g-m)/_,this.y=(u-v)/_,this.z=(d-c)/_,this.w=Math.acos((h+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class wd extends Es{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new oe(0,0,t,e),this.scissorTest=!1,this.viewport=new oe(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Oe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Fh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vn extends wd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class zh extends Oe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=tn,this.minFilter=tn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Td extends Oe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=tn,this.minFilter=tn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class As{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],h=n[i+1],c=n[i+2],u=n[i+3];const d=r[a+0],f=r[a+1],m=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=h,t[e+2]=c,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=v;return}if(u!==v||l!==d||h!==f||c!==m){let g=1-o;const p=l*d+h*f+c*m+u*v,_=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const C=Math.sqrt(M),A=Math.atan2(C,p*_);g=Math.sin(g*A)/C,o=Math.sin(o*A)/C}const x=o*_;if(l=l*g+d*x,h=h*g+f*x,c=c*g+m*x,u=u*g+v*x,g===1-o){const C=1/Math.sqrt(l*l+h*h+c*c+u*u);l*=C,h*=C,c*=C,u*=C}}t[e]=l,t[e+1]=h,t[e+2]=c,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],h=n[i+2],c=n[i+3],u=r[a],d=r[a+1],f=r[a+2],m=r[a+3];return t[e]=o*m+c*u+l*f-h*d,t[e+1]=l*m+c*d+h*u-o*f,t[e+2]=h*m+c*f+o*d-l*u,t[e+3]=c*m-o*u-l*d-h*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,h=o(n/2),c=o(i/2),u=o(r/2),d=l(n/2),f=l(i/2),m=l(r/2);switch(a){case"XYZ":this._x=d*c*u+h*f*m,this._y=h*f*u-d*c*m,this._z=h*c*m+d*f*u,this._w=h*c*u-d*f*m;break;case"YXZ":this._x=d*c*u+h*f*m,this._y=h*f*u-d*c*m,this._z=h*c*m-d*f*u,this._w=h*c*u+d*f*m;break;case"ZXY":this._x=d*c*u-h*f*m,this._y=h*f*u+d*c*m,this._z=h*c*m+d*f*u,this._w=h*c*u-d*f*m;break;case"ZYX":this._x=d*c*u-h*f*m,this._y=h*f*u+d*c*m,this._z=h*c*m-d*f*u,this._w=h*c*u+d*f*m;break;case"YZX":this._x=d*c*u+h*f*m,this._y=h*f*u+d*c*m,this._z=h*c*m-d*f*u,this._w=h*c*u-d*f*m;break;case"XZY":this._x=d*c*u-h*f*m,this._y=h*f*u-d*c*m,this._z=h*c*m+d*f*u,this._w=h*c*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],h=e[2],c=e[6],u=e[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(c-l)*f,this._y=(r-h)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(c-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+h)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-h)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+c)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+h)/f,this._y=(l+c)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ne(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,h=e._z,c=e._w;return this._x=n*c+a*o+i*h-r*l,this._y=i*c+a*l+r*o-n*h,this._z=r*c+a*h+n*l-i*o,this._w=a*c-n*o-i*l-r*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const h=Math.sqrt(l),c=Math.atan2(h,o),u=Math.sin((1-e)*c)/h,d=Math.sin(e*c)/h;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Yl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Yl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,h=2*(a*i-o*n),c=2*(o*e-r*i),u=2*(r*n-a*e);return this.x=e+l*h+a*u-o*c,this.y=n+l*c+o*h-r*u,this.z=i+l*u+r*c-a*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ta.copy(this).projectOnVector(t),this.sub(Ta)}reflect(t){return this.sub(Ta.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ta=new D,Yl=new As;class Ni{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,dn):dn.fromBufferAttribute(r,a),dn.applyMatrix4(t.matrixWorld),this.expandByPoint(dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),lr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),lr.copy(n.boundingBox)),lr.applyMatrix4(t.matrixWorld),this.union(lr)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,dn),dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ds),cr.subVectors(this.max,Ds),Hi.subVectors(t.a,Ds),Vi.subVectors(t.b,Ds),Gi.subVectors(t.c,Ds),Zn.subVectors(Vi,Hi),jn.subVectors(Gi,Vi),gi.subVectors(Hi,Gi);let e=[0,-Zn.z,Zn.y,0,-jn.z,jn.y,0,-gi.z,gi.y,Zn.z,0,-Zn.x,jn.z,0,-jn.x,gi.z,0,-gi.x,-Zn.y,Zn.x,0,-jn.y,jn.x,0,-gi.y,gi.x,0];return!Ea(e,Hi,Vi,Gi,cr)||(e=[1,0,0,0,1,0,0,0,1],!Ea(e,Hi,Vi,Gi,cr))?!1:(hr.crossVectors(Zn,jn),e=[hr.x,hr.y,hr.z],Ea(e,Hi,Vi,Gi,cr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ln),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ln=[new D,new D,new D,new D,new D,new D,new D,new D],dn=new D,lr=new Ni,Hi=new D,Vi=new D,Gi=new D,Zn=new D,jn=new D,gi=new D,Ds=new D,cr=new D,hr=new D,vi=new D;function Ea(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){vi.fromArray(s,r);const o=i.x*Math.abs(vi.x)+i.y*Math.abs(vi.y)+i.z*Math.abs(vi.z),l=t.dot(vi),h=e.dot(vi),c=n.dot(vi);if(Math.max(-Math.max(l,h,c),Math.min(l,h,c))>o)return!1}return!0}const Ed=new Ni,Is=new D,Aa=new D;class ki{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Ed.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Is.subVectors(t,this.center);const e=Is.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Is,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Aa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Is.copy(t.center).add(Aa)),this.expandByPoint(Is.copy(t.center).sub(Aa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Dn=new D,Ra=new D,ur=new D,Kn=new D,Ca=new D,dr=new D,Pa=new D;class Oh{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Dn.copy(this.origin).addScaledVector(this.direction,e),Dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ra.copy(t).add(e).multiplyScalar(.5),ur.copy(e).sub(t).normalize(),Kn.copy(this.origin).sub(Ra);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ur),o=Kn.dot(this.direction),l=-Kn.dot(ur),h=Kn.lengthSq(),c=Math.abs(1-a*a);let u,d,f,m;if(c>0)if(u=a*l-o,d=a*o-l,m=r*c,u>=0)if(d>=-m)if(d<=m){const v=1/c;u*=v,d*=v,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+h}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+h;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+h;else d<=-m?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+h):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+h):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+h);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Ra).addScaledVector(ur,d),f}intersectSphere(t,e){Dn.subVectors(t.center,this.origin);const n=Dn.dot(this.direction),i=Dn.dot(Dn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const h=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,d=this.origin;return h>=0?(n=(t.min.x-d.x)*h,i=(t.max.x-d.x)*h):(n=(t.max.x-d.x)*h,i=(t.min.x-d.x)*h),c>=0?(r=(t.min.y-d.y)*c,a=(t.max.y-d.y)*c):(r=(t.max.y-d.y)*c,a=(t.min.y-d.y)*c),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Dn)!==null}intersectTriangle(t,e,n,i,r){Ca.subVectors(e,t),dr.subVectors(n,t),Pa.crossVectors(Ca,dr);let a=this.direction.dot(Pa),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Kn.subVectors(this.origin,t);const l=o*this.direction.dot(dr.crossVectors(Kn,dr));if(l<0)return null;const h=o*this.direction.dot(Ca.cross(Kn));if(h<0||l+h>a)return null;const c=-o*Kn.dot(Pa);return c<0?null:this.at(c/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ie{constructor(t,e,n,i,r,a,o,l,h,c,u,d,f,m,v,g){ie.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,h,c,u,d,f,m,v,g)}set(t,e,n,i,r,a,o,l,h,c,u,d,f,m,v,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=h,p[6]=c,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ie().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Wi.setFromMatrixColumn(t,0).length(),r=1/Wi.setFromMatrixColumn(t,1).length(),a=1/Wi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),h=Math.sin(i),c=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*c,f=a*u,m=o*c,v=o*u;e[0]=l*c,e[4]=-l*u,e[8]=h,e[1]=f+m*h,e[5]=d-v*h,e[9]=-o*l,e[2]=v-d*h,e[6]=m+f*h,e[10]=a*l}else if(t.order==="YXZ"){const d=l*c,f=l*u,m=h*c,v=h*u;e[0]=d+v*o,e[4]=m*o-f,e[8]=a*h,e[1]=a*u,e[5]=a*c,e[9]=-o,e[2]=f*o-m,e[6]=v+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*c,f=l*u,m=h*c,v=h*u;e[0]=d-v*o,e[4]=-a*u,e[8]=m+f*o,e[1]=f+m*o,e[5]=a*c,e[9]=v-d*o,e[2]=-a*h,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*c,f=a*u,m=o*c,v=o*u;e[0]=l*c,e[4]=m*h-f,e[8]=d*h+v,e[1]=l*u,e[5]=v*h+d,e[9]=f*h-m,e[2]=-h,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,f=a*h,m=o*l,v=o*h;e[0]=l*c,e[4]=v-d*u,e[8]=m*u+f,e[1]=u,e[5]=a*c,e[9]=-o*c,e[2]=-h*c,e[6]=f*u+m,e[10]=d-v*u}else if(t.order==="XZY"){const d=a*l,f=a*h,m=o*l,v=o*h;e[0]=l*c,e[4]=-u,e[8]=h*c,e[1]=d*u+v,e[5]=a*c,e[9]=f*u-m,e[2]=m*u-f,e[6]=o*c,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ad,t,Rd)}lookAt(t,e,n){const i=this.elements;return Ke.subVectors(t,e),Ke.lengthSq()===0&&(Ke.z=1),Ke.normalize(),Jn.crossVectors(n,Ke),Jn.lengthSq()===0&&(Math.abs(n.z)===1?Ke.x+=1e-4:Ke.z+=1e-4,Ke.normalize(),Jn.crossVectors(n,Ke)),Jn.normalize(),fr.crossVectors(Ke,Jn),i[0]=Jn.x,i[4]=fr.x,i[8]=Ke.x,i[1]=Jn.y,i[5]=fr.y,i[9]=Ke.y,i[2]=Jn.z,i[6]=fr.z,i[10]=Ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],h=n[12],c=n[1],u=n[5],d=n[9],f=n[13],m=n[2],v=n[6],g=n[10],p=n[14],_=n[3],M=n[7],x=n[11],C=n[15],A=i[0],R=i[4],I=i[8],w=i[12],b=i[1],L=i[5],O=i[9],z=i[13],G=i[2],Y=i[6],W=i[10],K=i[14],V=i[3],ht=i[7],xt=i[11],wt=i[15];return r[0]=a*A+o*b+l*G+h*V,r[4]=a*R+o*L+l*Y+h*ht,r[8]=a*I+o*O+l*W+h*xt,r[12]=a*w+o*z+l*K+h*wt,r[1]=c*A+u*b+d*G+f*V,r[5]=c*R+u*L+d*Y+f*ht,r[9]=c*I+u*O+d*W+f*xt,r[13]=c*w+u*z+d*K+f*wt,r[2]=m*A+v*b+g*G+p*V,r[6]=m*R+v*L+g*Y+p*ht,r[10]=m*I+v*O+g*W+p*xt,r[14]=m*w+v*z+g*K+p*wt,r[3]=_*A+M*b+x*G+C*V,r[7]=_*R+M*L+x*Y+C*ht,r[11]=_*I+M*O+x*W+C*xt,r[15]=_*w+M*z+x*K+C*wt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],h=t[13],c=t[2],u=t[6],d=t[10],f=t[14],m=t[3],v=t[7],g=t[11],p=t[15];return m*(+r*l*u-i*h*u-r*o*d+n*h*d+i*o*f-n*l*f)+v*(+e*l*f-e*h*d+r*a*d-i*a*f+i*h*c-r*l*c)+g*(+e*h*u-e*o*f-r*a*u+n*a*f+r*o*c-n*h*c)+p*(-i*o*c-e*l*u+e*o*d+i*a*u-n*a*d+n*l*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],u=t[9],d=t[10],f=t[11],m=t[12],v=t[13],g=t[14],p=t[15],_=u*g*h-v*d*h+v*l*f-o*g*f-u*l*p+o*d*p,M=m*d*h-c*g*h-m*l*f+a*g*f+c*l*p-a*d*p,x=c*v*h-m*u*h+m*o*f-a*v*f-c*o*p+a*u*p,C=m*u*l-c*v*l-m*o*d+a*v*d+c*o*g-a*u*g,A=e*_+n*M+i*x+r*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return t[0]=_*R,t[1]=(v*d*r-u*g*r-v*i*f+n*g*f+u*i*p-n*d*p)*R,t[2]=(o*g*r-v*l*r+v*i*h-n*g*h-o*i*p+n*l*p)*R,t[3]=(u*l*r-o*d*r-u*i*h+n*d*h+o*i*f-n*l*f)*R,t[4]=M*R,t[5]=(c*g*r-m*d*r+m*i*f-e*g*f-c*i*p+e*d*p)*R,t[6]=(m*l*r-a*g*r-m*i*h+e*g*h+a*i*p-e*l*p)*R,t[7]=(a*d*r-c*l*r+c*i*h-e*d*h-a*i*f+e*l*f)*R,t[8]=x*R,t[9]=(m*u*r-c*v*r-m*n*f+e*v*f+c*n*p-e*u*p)*R,t[10]=(a*v*r-m*o*r+m*n*h-e*v*h-a*n*p+e*o*p)*R,t[11]=(c*o*r-a*u*r-c*n*h+e*u*h+a*n*f-e*o*f)*R,t[12]=C*R,t[13]=(c*v*i-m*u*i+m*n*d-e*v*d-c*n*g+e*u*g)*R,t[14]=(m*o*i-a*v*i-m*n*l+e*v*l+a*n*g-e*o*g)*R,t[15]=(a*u*i-c*o*i+c*n*l-e*u*l-a*n*d+e*o*d)*R,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,h=r*a,c=r*o;return this.set(h*a+n,h*o-i*l,h*l+i*o,0,h*o+i*l,c*o+n,c*l-i*a,0,h*l-i*o,c*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,h=r+r,c=a+a,u=o+o,d=r*h,f=r*c,m=r*u,v=a*c,g=a*u,p=o*u,_=l*h,M=l*c,x=l*u,C=n.x,A=n.y,R=n.z;return i[0]=(1-(v+p))*C,i[1]=(f+x)*C,i[2]=(m-M)*C,i[3]=0,i[4]=(f-x)*A,i[5]=(1-(d+p))*A,i[6]=(g+_)*A,i[7]=0,i[8]=(m+M)*R,i[9]=(g-_)*R,i[10]=(1-(d+v))*R,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Wi.set(i[0],i[1],i[2]).length();const a=Wi.set(i[4],i[5],i[6]).length(),o=Wi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],fn.copy(this);const h=1/r,c=1/a,u=1/o;return fn.elements[0]*=h,fn.elements[1]*=h,fn.elements[2]*=h,fn.elements[4]*=c,fn.elements[5]*=c,fn.elements[6]*=c,fn.elements[8]*=u,fn.elements[9]*=u,fn.elements[10]*=u,e.setFromRotationMatrix(fn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a,o=Fn){const l=this.elements,h=2*r/(e-t),c=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,m;if(o===Fn)f=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===Kr)f=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=c,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=Fn){const l=this.elements,h=1/(e-t),c=1/(n-i),u=1/(a-r),d=(e+t)*h,f=(n+i)*c;let m,v;if(o===Fn)m=(a+r)*u,v=-2*u;else if(o===Kr)m=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*h,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Wi=new D,fn=new ie,Ad=new D(0,0,0),Rd=new D(1,1,1),Jn=new D,fr=new D,Ke=new D,ql=new ie,$l=new As;class An{constructor(t=0,e=0,n=0,i=An.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],h=i[5],c=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Ne(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ne(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ne(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(Ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,h),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,h),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-c,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ql.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ql,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return $l.setFromEuler(this),this.setFromQuaternion($l,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}An.DEFAULT_ORDER="XYZ";class Bh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Cd=0;const Zl=new D,Xi=new As,In=new ie,pr=new D,Us=new D,Pd=new D,Ld=new As,jl=new D(1,0,0),Kl=new D(0,1,0),Jl=new D(0,0,1),Ql={type:"added"},Dd={type:"removed"},Yi={type:"childadded",child:null},La={type:"childremoved",child:null};class ve extends Es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=Vn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ve.DEFAULT_UP.clone();const t=new D,e=new An,n=new As,i=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ie},normalMatrix:{value:new Gt}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Xi.setFromAxisAngle(t,e),this.quaternion.multiply(Xi),this}rotateOnWorldAxis(t,e){return Xi.setFromAxisAngle(t,e),this.quaternion.premultiply(Xi),this}rotateX(t){return this.rotateOnAxis(jl,t)}rotateY(t){return this.rotateOnAxis(Kl,t)}rotateZ(t){return this.rotateOnAxis(Jl,t)}translateOnAxis(t,e){return Zl.copy(t).applyQuaternion(this.quaternion),this.position.add(Zl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(jl,t)}translateY(t){return this.translateOnAxis(Kl,t)}translateZ(t){return this.translateOnAxis(Jl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?pr.copy(t):pr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Us.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(Us,pr,this.up):In.lookAt(pr,Us,this.up),this.quaternion.setFromRotationMatrix(In),i&&(In.extractRotation(i.matrixWorld),Xi.setFromRotationMatrix(In),this.quaternion.premultiply(Xi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ql),Yi.child=t,this.dispatchEvent(Yi),Yi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Dd),La.child=t,this.dispatchEvent(La),La.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),In.multiply(t.parent.matrixWorld)),t.applyMatrix4(In),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ql),Yi.child=t,this.dispatchEvent(Yi),Yi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Us,t,Pd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Us,Ld,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let h=0,c=l.length;h<c;h++){const u=l[h];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),h=a(t.textures),c=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),h.length>0&&(n.textures=h),c.length>0&&(n.images=c),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){const l=[];for(const h in o){const c=o[h];delete c.metadata,l.push(c)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ve.DEFAULT_UP=new D(0,1,0);ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const pn=new D,Un=new D,Da=new D,Nn=new D,qi=new D,$i=new D,tc=new D,Ia=new D,Ua=new D,Na=new D,ka=new oe,Fa=new oe,za=new oe;class on{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),pn.subVectors(t,e),i.cross(pn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){pn.subVectors(i,e),Un.subVectors(n,e),Da.subVectors(t,e);const a=pn.dot(pn),o=pn.dot(Un),l=pn.dot(Da),h=Un.dot(Un),c=Un.dot(Da),u=a*h-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(h*l-o*c)*d,m=(a*c-o*l)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Nn)===null?!1:Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Nn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Nn.x),l.addScaledVector(a,Nn.y),l.addScaledVector(o,Nn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return ka.setScalar(0),Fa.setScalar(0),za.setScalar(0),ka.fromBufferAttribute(t,e),Fa.fromBufferAttribute(t,n),za.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(ka,r.x),a.addScaledVector(Fa,r.y),a.addScaledVector(za,r.z),a}static isFrontFacing(t,e,n,i){return pn.subVectors(n,e),Un.subVectors(t,e),pn.cross(Un).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return pn.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),pn.cross(Un).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return on.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return on.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return on.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return on.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return on.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;qi.subVectors(i,n),$i.subVectors(r,n),Ia.subVectors(t,n);const l=qi.dot(Ia),h=$i.dot(Ia);if(l<=0&&h<=0)return e.copy(n);Ua.subVectors(t,i);const c=qi.dot(Ua),u=$i.dot(Ua);if(c>=0&&u<=c)return e.copy(i);const d=l*u-c*h;if(d<=0&&l>=0&&c<=0)return a=l/(l-c),e.copy(n).addScaledVector(qi,a);Na.subVectors(t,r);const f=qi.dot(Na),m=$i.dot(Na);if(m>=0&&f<=m)return e.copy(r);const v=f*h-l*m;if(v<=0&&h>=0&&m<=0)return o=h/(h-m),e.copy(n).addScaledVector($i,o);const g=c*m-f*u;if(g<=0&&u-c>=0&&f-m>=0)return tc.subVectors(r,i),o=(u-c)/(u-c+(f-m)),e.copy(i).addScaledVector(tc,o);const p=1/(g+v+d);return a=v*p,o=d*p,e.copy(n).addScaledVector(qi,a).addScaledVector($i,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Hh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},mr={h:0,s:0,l:0};function Oa(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class gt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ge){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Zt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Zt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Zt.workingColorSpace){if(t=gd(t,1),e=Ne(e,0,1),n=Ne(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Oa(a,r,t+1/3),this.g=Oa(a,r,t),this.b=Oa(a,r,t-1/3)}return Zt.toWorkingColorSpace(this,i),this}setStyle(t,e=Ge){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ge){const n=Hh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Gn(t.r),this.g=Gn(t.g),this.b=Gn(t.b),this}copyLinearToSRGB(t){return this.r=ds(t.r),this.g=ds(t.g),this.b=ds(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ge){return Zt.fromWorkingColorSpace(Ie.copy(this),t),Math.round(Ne(Ie.r*255,0,255))*65536+Math.round(Ne(Ie.g*255,0,255))*256+Math.round(Ne(Ie.b*255,0,255))}getHexString(t=Ge){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Zt.workingColorSpace){Zt.fromWorkingColorSpace(Ie.copy(this),e);const n=Ie.r,i=Ie.g,r=Ie.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,h;const c=(o+a)/2;if(o===a)l=0,h=0;else{const u=a-o;switch(h=c<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=h,t.l=c,t}getRGB(t,e=Zt.workingColorSpace){return Zt.fromWorkingColorSpace(Ie.copy(this),e),t.r=Ie.r,t.g=Ie.g,t.b=Ie.b,t}getStyle(t=Ge){Zt.fromWorkingColorSpace(Ie.copy(this),t);const e=Ie.r,n=Ie.g,i=Ie.b;return t!==Ge?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Qn),this.setHSL(Qn.h+t,Qn.s+e,Qn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Qn),t.getHSL(mr);const n=ba(Qn.h,mr.h,e),i=ba(Qn.s,mr.s,e),r=ba(Qn.l,mr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ie=new gt;gt.NAMES=Hh;let Id=0;class Fi extends Es{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Id++}),this.uuid=Vn(),this.name="",this.blending=ui,this.side=fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oo,this.blendDst=lo,this.blendEquation=Ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new gt(0,0,0),this.blendAlpha=0,this.depthFunc=gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Oi,this.stencilZFail=Oi,this.stencilZPass=Oi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ui&&(n.blending=this.blending),this.side!==fi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==oo&&(n.blendSrc=this.blendSrc),this.blendDst!==lo&&(n.blendDst=this.blendDst),this.blendEquation!==Ai&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==gs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==zl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Oi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Oi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Oi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Se extends Fi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.combine=xh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const xe=new D,gr=new et;class Pe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Yo,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)gr.fromBufferAttribute(this,e),gr.applyMatrix3(t),this.setXY(e,gr.x,gr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix3(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix4(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyNormalMatrix(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.transformDirection(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=wn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=wn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=wn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=wn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=wn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),i=ae(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),i=ae(i,this.array),r=ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Yo&&(t.usage=this.usage),t}}class Vh extends Pe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Gh extends Pe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Jt extends Pe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ud=0;const nn=new ie,Ba=new ve,Zi=new D,Je=new Ni,Ns=new Ni,Ae=new D;class ye extends Es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=Vn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(kh(t)?Gh:Vh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Gt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return nn.makeRotationFromQuaternion(t),this.applyMatrix4(nn),this}rotateX(t){return nn.makeRotationX(t),this.applyMatrix4(nn),this}rotateY(t){return nn.makeRotationY(t),this.applyMatrix4(nn),this}rotateZ(t){return nn.makeRotationZ(t),this.applyMatrix4(nn),this}translate(t,e,n){return nn.makeTranslation(t,e,n),this.applyMatrix4(nn),this}scale(t,e,n){return nn.makeScale(t,e,n),this.applyMatrix4(nn),this}lookAt(t){return Ba.lookAt(t),Ba.updateMatrix(),this.applyMatrix4(Ba.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zi).negate(),this.translate(Zi.x,Zi.y,Zi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Jt(n,3))}else{for(let n=0,i=e.count;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ni);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Je.setFromBufferAttribute(r),this.morphTargetsRelative?(Ae.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(Ae),Ae.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(Ae)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ki);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Ns.setFromBufferAttribute(o),this.morphTargetsRelative?(Ae.addVectors(Je.min,Ns.min),Je.expandByPoint(Ae),Ae.addVectors(Je.max,Ns.max),Je.expandByPoint(Ae)):(Je.expandByPoint(Ns.min),Je.expandByPoint(Ns.max))}Je.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Ae.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ae));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let h=0,c=o.count;h<c;h++)Ae.fromBufferAttribute(o,h),l&&(Zi.fromBufferAttribute(t,h),Ae.add(Zi)),i=Math.max(i,n.distanceToSquared(Ae))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pe(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new D,l[I]=new D;const h=new D,c=new D,u=new D,d=new et,f=new et,m=new et,v=new D,g=new D;function p(I,w,b){h.fromBufferAttribute(n,I),c.fromBufferAttribute(n,w),u.fromBufferAttribute(n,b),d.fromBufferAttribute(r,I),f.fromBufferAttribute(r,w),m.fromBufferAttribute(r,b),c.sub(h),u.sub(h),f.sub(d),m.sub(d);const L=1/(f.x*m.y-m.x*f.y);isFinite(L)&&(v.copy(c).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(L),g.copy(u).multiplyScalar(f.x).addScaledVector(c,-m.x).multiplyScalar(L),o[I].add(v),o[w].add(v),o[b].add(v),l[I].add(g),l[w].add(g),l[b].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let I=0,w=_.length;I<w;++I){const b=_[I],L=b.start,O=b.count;for(let z=L,G=L+O;z<G;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const M=new D,x=new D,C=new D,A=new D;function R(I){C.fromBufferAttribute(i,I),A.copy(C);const w=o[I];M.copy(w),M.sub(C.multiplyScalar(C.dot(w))).normalize(),x.crossVectors(A,w);const L=x.dot(l[I])<0?-1:1;a.setXYZW(I,M.x,M.y,M.z,L)}for(let I=0,w=_.length;I<w;++I){const b=_[I],L=b.start,O=b.count;for(let z=L,G=L+O;z<G;z+=3)R(t.getX(z+0)),R(t.getX(z+1)),R(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new D,r=new D,a=new D,o=new D,l=new D,h=new D,c=new D,u=new D;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),v=t.getX(d+1),g=t.getX(d+2);i.fromBufferAttribute(e,m),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,g),c.subVectors(a,r),u.subVectors(i,r),c.cross(u),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,g),o.add(c),l.add(c),h.add(c),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,h.x,h.y,h.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),c.subVectors(a,r),u.subVectors(i,r),c.cross(u),n.setXYZ(d+0,c.x,c.y,c.z),n.setXYZ(d+1,c.x,c.y,c.z),n.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ae.fromBufferAttribute(t,e),Ae.normalize(),t.setXYZ(e,Ae.x,Ae.y,Ae.z)}toNonIndexed(){function t(o,l){const h=o.array,c=o.itemSize,u=o.normalized,d=new h.constructor(l.length*c);let f=0,m=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*c;for(let p=0;p<c;p++)d[m++]=h[f++]}return new Pe(d,c,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ye,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],h=t(l,n);e.setAttribute(o,h)}const r=this.morphAttributes;for(const o in r){const l=[],h=r[o];for(let c=0,u=h.length;c<u;c++){const d=h[c],f=t(d,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const h=a[o];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(t[h]=l[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const h=n[l];t.data.attributes[l]=h.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],c=[];for(let u=0,d=h.length;u<d;u++){const f=h[u];c.push(f.toJSON(t.data))}c.length>0&&(i[l]=c,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const h in i){const c=i[h];this.setAttribute(h,c.clone(e))}const r=t.morphAttributes;for(const h in r){const c=[],u=r[h];for(let d=0,f=u.length;d<f;d++)c.push(u[d].clone(e));this.morphAttributes[h]=c}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let h=0,c=a.length;h<c;h++){const u=a[h];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ec=new ie,xi=new Oh,vr=new ki,nc=new D,xr=new D,_r=new D,Mr=new D,Ha=new D,yr=new D,ic=new D,br=new D;class It extends ve{constructor(t=new ye,e=new Se){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){yr.set(0,0,0);for(let l=0,h=r.length;l<h;l++){const c=o[l],u=r[l];c!==0&&(Ha.fromBufferAttribute(u,t),a?yr.addScaledVector(Ha,c):yr.addScaledVector(Ha.sub(e),c))}e.add(yr)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vr.copy(n.boundingSphere),vr.applyMatrix4(r),xi.copy(t.ray).recast(t.near),!(vr.containsPoint(xi.origin)===!1&&(xi.intersectSphere(vr,nc)===null||xi.origin.distanceToSquared(nc)>(t.far-t.near)**2))&&(ec.copy(r).invert(),xi.copy(t.ray).applyMatrix4(ec),!(n.boundingBox!==null&&xi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,xi)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,h=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=a[g.materialIndex],_=Math.max(g.start,f.start),M=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let x=_,C=M;x<C;x+=3){const A=o.getX(x),R=o.getX(x+1),I=o.getX(x+2);i=Sr(this,p,t,n,h,c,u,A,R,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const m=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const _=o.getX(g),M=o.getX(g+1),x=o.getX(g+2);i=Sr(this,a,t,n,h,c,u,_,M,x),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=d.length;m<v;m++){const g=d[m],p=a[g.materialIndex],_=Math.max(g.start,f.start),M=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=_,C=M;x<C;x+=3){const A=x,R=x+1,I=x+2;i=Sr(this,p,t,n,h,c,u,A,R,I),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const _=g,M=g+1,x=g+2;i=Sr(this,a,t,n,h,c,u,_,M,x),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function Nd(s,t,e,n,i,r,a,o){let l;if(t.side===we?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===fi,o),l===null)return null;br.copy(o),br.applyMatrix4(s.matrixWorld);const h=e.ray.origin.distanceTo(br);return h<e.near||h>e.far?null:{distance:h,point:br.clone(),object:s}}function Sr(s,t,e,n,i,r,a,o,l,h){s.getVertexPosition(o,xr),s.getVertexPosition(l,_r),s.getVertexPosition(h,Mr);const c=Nd(s,t,e,n,xr,_r,Mr,ic);if(c){const u=new D;on.getBarycoord(ic,xr,_r,Mr,u),i&&(c.uv=on.getInterpolatedAttribute(i,o,l,h,u,new et)),r&&(c.uv1=on.getInterpolatedAttribute(r,o,l,h,u,new et)),a&&(c.normal=on.getInterpolatedAttribute(a,o,l,h,u,new D),c.normal.dot(n.direction)>0&&c.normal.multiplyScalar(-1));const d={a:o,b:l,c:h,normal:new D,materialIndex:0};on.getNormal(xr,_r,Mr,d.normal),c.face=d,c.barycoord=u}return c}class Fe extends ye{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],h=[],c=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,i,a,2),m("x","z","y",1,-1,t,n,-e,i,a,3),m("x","y","z",1,-1,t,e,n,i,r,4),m("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Jt(h,3)),this.setAttribute("normal",new Jt(c,3)),this.setAttribute("uv",new Jt(u,2));function m(v,g,p,_,M,x,C,A,R,I,w){const b=x/R,L=C/I,O=x/2,z=C/2,G=A/2,Y=R+1,W=I+1;let K=0,V=0;const ht=new D;for(let xt=0;xt<W;xt++){const wt=xt*L-z;for(let Bt=0;Bt<Y;Bt++){const te=Bt*b-O;ht[v]=te*_,ht[g]=wt*M,ht[p]=G,h.push(ht.x,ht.y,ht.z),ht[v]=0,ht[g]=0,ht[p]=A>0?1:-1,c.push(ht.x,ht.y,ht.z),u.push(Bt/R),u.push(1-xt/I),K+=1}}for(let xt=0;xt<I;xt++)for(let wt=0;wt<R;wt++){const Bt=d+wt+Y*xt,te=d+wt+Y*(xt+1),Z=d+(wt+1)+Y*(xt+1),at=d+(wt+1)+Y*xt;l.push(Bt,te,at),l.push(te,Z,at),V+=6}o.addGroup(f,V,w),f+=V,d+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function bs(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function He(s){const t={};for(let e=0;e<s.length;e++){const n=bs(s[e]);for(const i in n)t[i]=n[i]}return t}function kd(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Wh(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Zt.workingColorSpace}const Js={clone:bs,merge:He};var Fd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ge extends Fi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fd,this.fragmentShader=zd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=bs(t.uniforms),this.uniformsGroups=kd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Xh extends ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=Fn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ti=new D,sc=new et,rc=new et;class ke extends Xh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Jr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ya*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Jr*2*Math.atan(Math.tan(ya*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ti.x,ti.y).multiplyScalar(-t/ti.z),ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ti.x,ti.y).multiplyScalar(-t/ti.z)}getViewSize(t,e){return this.getViewBounds(t,sc,rc),e.subVectors(rc,sc)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ya*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,h=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/h,i*=a.width/l,n*=a.height/h}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ji=-90,Ki=1;class Od extends ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new ke(ji,Ki,t,e);i.layers=this.layers,this.add(i);const r=new ke(ji,Ki,t,e);r.layers=this.layers,this.add(r);const a=new ke(ji,Ki,t,e);a.layers=this.layers,this.add(a);const o=new ke(ji,Ki,t,e);o.layers=this.layers,this.add(o);const l=new ke(ji,Ki,t,e);l.layers=this.layers,this.add(l);const h=new ke(ji,Ki,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const h of e)this.remove(h);if(t===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Kr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,h,c]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,a),t.setRenderTarget(n,2,i),t.render(e,o),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,h),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,c),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Yh extends Oe{constructor(t,e,n,i,r,a,o,l,h,c){t=t!==void 0?t:[],e=e!==void 0?e:vs,super(t,e,n,i,r,a,o,l,h,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Bd extends vn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Yh(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Tn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Fe(5,5,5),r=new ge({name:"CubemapFromEquirect",uniforms:bs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:we,blending:Bn});r.uniforms.tEquirect.value=e;const a=new It(i,r),o=e.minFilter;return e.minFilter===Pi&&(e.minFilter=Tn),new Od(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}const Va=new D,Hd=new D,Vd=new Gt;class bi{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Va.subVectors(n,e).cross(Hd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Va),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Vd.getNormalMatrix(t),i=this.coplanarPoint(Va).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _i=new ki,wr=new D;class ul{constructor(t=new bi,e=new bi,n=new bi,i=new bi,r=new bi,a=new bi){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Fn){const n=this.planes,i=t.elements,r=i[0],a=i[1],o=i[2],l=i[3],h=i[4],c=i[5],u=i[6],d=i[7],f=i[8],m=i[9],v=i[10],g=i[11],p=i[12],_=i[13],M=i[14],x=i[15];if(n[0].setComponents(l-r,d-h,g-f,x-p).normalize(),n[1].setComponents(l+r,d+h,g+f,x+p).normalize(),n[2].setComponents(l+a,d+c,g+m,x+_).normalize(),n[3].setComponents(l-a,d-c,g-m,x-_).normalize(),n[4].setComponents(l-o,d-u,g-v,x-M).normalize(),e===Fn)n[5].setComponents(l+o,d+u,g+v,x+M).normalize();else if(e===Kr)n[5].setComponents(o,u,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(t){return _i.center.set(0,0,0),_i.radius=.7071067811865476,_i.applyMatrix4(t.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(wr.x=i.normal.x>0?t.max.x:t.min.x,wr.y=i.normal.y>0?t.max.y:t.min.y,wr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(wr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function qh(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Gd(s){const t=new WeakMap;function e(o,l){const h=o.array,c=o.usage,u=h.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,h,c),o.onUploadCallback();let f;if(h instanceof Float32Array)f=s.FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(h instanceof Int16Array)f=s.SHORT;else if(h instanceof Uint32Array)f=s.UNSIGNED_INT;else if(h instanceof Int32Array)f=s.INT;else if(h instanceof Int8Array)f=s.BYTE;else if(h instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:d,type:f,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,h){const c=l.array,u=l.updateRanges;if(s.bindBuffer(h,o),u.length===0)s.bufferSubData(h,0,c);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],v=u[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const v=u[f];s.bufferSubData(h,v.start*c.BYTES_PER_ELEMENT,c,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=t.get(o);(!c||c.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const h=t.get(o);if(h===void 0)t.set(o,e(o,l));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,o,l),h.version=o.version}}return{get:i,remove:r,update:a}}class gn extends ye{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),h=o+1,c=l+1,u=t/o,d=e/l,f=[],m=[],v=[],g=[];for(let p=0;p<c;p++){const _=p*d-a;for(let M=0;M<h;M++){const x=M*u-r;m.push(x,-_,0),v.push(0,0,1),g.push(M/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let _=0;_<o;_++){const M=_+h*p,x=_+h*(p+1),C=_+1+h*(p+1),A=_+1+h*p;f.push(M,x,A),f.push(x,C,A)}this.setIndex(f),this.setAttribute("position",new Jt(m,3)),this.setAttribute("normal",new Jt(v,3)),this.setAttribute("uv",new Jt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gn(t.width,t.height,t.widthSegments,t.heightSegments)}}var Wd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xd=`#ifdef USE_ALPHAHASH
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
#endif`,Yd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$d=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Zd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jd=`#ifdef USE_AOMAP
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
#endif`,Kd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Jd=`#ifdef USE_BATCHING
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
#endif`,Qd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,tf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ef=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,sf=`#ifdef USE_IRIDESCENCE
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
#endif`,rf=`#ifdef USE_BUMPMAP
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
#endif`,af=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,of=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,uf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,df=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ff=`#if defined( USE_COLOR_ALPHA )
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
#endif`,pf=`#define PI 3.141592653589793
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
} // validated`,mf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,gf=`vec3 transformedNormal = objectNormal;
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
#endif`,vf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_f=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Mf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yf="gl_FragColor = linearToOutputTexel( gl_FragColor );",bf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sf=`#ifdef USE_ENVMAP
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
#endif`,wf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Tf=`#ifdef USE_ENVMAP
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
#endif`,Ef=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Af=`#ifdef USE_ENVMAP
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
#endif`,Rf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Lf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Df=`#ifdef USE_GRADIENTMAP
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
}`,If=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Nf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kf=`uniform bool receiveShadow;
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
#endif`,Ff=`#ifdef USE_ENVMAP
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
#endif`,zf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Of=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vf=`PhysicalMaterial material;
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
#endif`,Gf=`struct PhysicalMaterial {
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
}`,Wf=`
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
#endif`,Xf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Yf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qf=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$f=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zf=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jf=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Kf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Jf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,tp=`#if defined( USE_POINTS_UV )
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
#endif`,ep=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,np=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ip=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ap=`#ifdef USE_MORPHTARGETS
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
#endif`,op=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,cp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,up=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fp=`#ifdef USE_NORMALMAP
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
#endif`,pp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_p=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Mp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Sp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,wp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Tp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ep=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ap=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Cp=`float getShadowMask() {
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
}`,Pp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Lp=`#ifdef USE_SKINNING
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
#endif`,Dp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ip=`#ifdef USE_SKINNING
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
#endif`,Up=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Np=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Fp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,zp=`#ifdef USE_TRANSMISSION
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
#endif`,Op=`#ifdef USE_TRANSMISSION
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
#endif`,Bp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Wp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xp=`uniform sampler2D t2D;
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
}`,Yp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,$p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jp=`#include <common>
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
}`,Kp=`#if DEPTH_PACKING == 3200
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
}`,Jp=`#define DISTANCE
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
}`,Qp=`#define DISTANCE
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
}`,tm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,em=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nm=`uniform float scale;
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
}`,im=`uniform vec3 diffuse;
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
}`,sm=`#include <common>
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
}`,rm=`uniform vec3 diffuse;
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
}`,am=`#define LAMBERT
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
}`,om=`#define LAMBERT
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
}`,lm=`#define MATCAP
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
}`,cm=`#define MATCAP
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
}`,hm=`#define NORMAL
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
}`,um=`#define NORMAL
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
}`,dm=`#define PHONG
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
}`,fm=`#define PHONG
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
}`,pm=`#define STANDARD
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
}`,mm=`#define STANDARD
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
}`,gm=`#define TOON
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
}`,vm=`#define TOON
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
}`,xm=`uniform float size;
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
}`,_m=`uniform vec3 diffuse;
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
}`,Mm=`#include <common>
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
}`,ym=`uniform vec3 color;
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
}`,bm=`uniform float rotation;
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
}`,Sm=`uniform vec3 diffuse;
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
}`,Xt={alphahash_fragment:Wd,alphahash_pars_fragment:Xd,alphamap_fragment:Yd,alphamap_pars_fragment:qd,alphatest_fragment:$d,alphatest_pars_fragment:Zd,aomap_fragment:jd,aomap_pars_fragment:Kd,batching_pars_vertex:Jd,batching_vertex:Qd,begin_vertex:tf,beginnormal_vertex:ef,bsdfs:nf,iridescence_fragment:sf,bumpmap_pars_fragment:rf,clipping_planes_fragment:af,clipping_planes_pars_fragment:of,clipping_planes_pars_vertex:lf,clipping_planes_vertex:cf,color_fragment:hf,color_pars_fragment:uf,color_pars_vertex:df,color_vertex:ff,common:pf,cube_uv_reflection_fragment:mf,defaultnormal_vertex:gf,displacementmap_pars_vertex:vf,displacementmap_vertex:xf,emissivemap_fragment:_f,emissivemap_pars_fragment:Mf,colorspace_fragment:yf,colorspace_pars_fragment:bf,envmap_fragment:Sf,envmap_common_pars_fragment:wf,envmap_pars_fragment:Tf,envmap_pars_vertex:Ef,envmap_physical_pars_fragment:Ff,envmap_vertex:Af,fog_vertex:Rf,fog_pars_vertex:Cf,fog_fragment:Pf,fog_pars_fragment:Lf,gradientmap_pars_fragment:Df,lightmap_pars_fragment:If,lights_lambert_fragment:Uf,lights_lambert_pars_fragment:Nf,lights_pars_begin:kf,lights_toon_fragment:zf,lights_toon_pars_fragment:Of,lights_phong_fragment:Bf,lights_phong_pars_fragment:Hf,lights_physical_fragment:Vf,lights_physical_pars_fragment:Gf,lights_fragment_begin:Wf,lights_fragment_maps:Xf,lights_fragment_end:Yf,logdepthbuf_fragment:qf,logdepthbuf_pars_fragment:$f,logdepthbuf_pars_vertex:Zf,logdepthbuf_vertex:jf,map_fragment:Kf,map_pars_fragment:Jf,map_particle_fragment:Qf,map_particle_pars_fragment:tp,metalnessmap_fragment:ep,metalnessmap_pars_fragment:np,morphinstance_vertex:ip,morphcolor_vertex:sp,morphnormal_vertex:rp,morphtarget_pars_vertex:ap,morphtarget_vertex:op,normal_fragment_begin:lp,normal_fragment_maps:cp,normal_pars_fragment:hp,normal_pars_vertex:up,normal_vertex:dp,normalmap_pars_fragment:fp,clearcoat_normal_fragment_begin:pp,clearcoat_normal_fragment_maps:mp,clearcoat_pars_fragment:gp,iridescence_pars_fragment:vp,opaque_fragment:xp,packing:_p,premultiplied_alpha_fragment:Mp,project_vertex:yp,dithering_fragment:bp,dithering_pars_fragment:Sp,roughnessmap_fragment:wp,roughnessmap_pars_fragment:Tp,shadowmap_pars_fragment:Ep,shadowmap_pars_vertex:Ap,shadowmap_vertex:Rp,shadowmask_pars_fragment:Cp,skinbase_vertex:Pp,skinning_pars_vertex:Lp,skinning_vertex:Dp,skinnormal_vertex:Ip,specularmap_fragment:Up,specularmap_pars_fragment:Np,tonemapping_fragment:kp,tonemapping_pars_fragment:Fp,transmission_fragment:zp,transmission_pars_fragment:Op,uv_pars_fragment:Bp,uv_pars_vertex:Hp,uv_vertex:Vp,worldpos_vertex:Gp,background_vert:Wp,background_frag:Xp,backgroundCube_vert:Yp,backgroundCube_frag:qp,cube_vert:$p,cube_frag:Zp,depth_vert:jp,depth_frag:Kp,distanceRGBA_vert:Jp,distanceRGBA_frag:Qp,equirect_vert:tm,equirect_frag:em,linedashed_vert:nm,linedashed_frag:im,meshbasic_vert:sm,meshbasic_frag:rm,meshlambert_vert:am,meshlambert_frag:om,meshmatcap_vert:lm,meshmatcap_frag:cm,meshnormal_vert:hm,meshnormal_frag:um,meshphong_vert:dm,meshphong_frag:fm,meshphysical_vert:pm,meshphysical_frag:mm,meshtoon_vert:gm,meshtoon_frag:vm,points_vert:xm,points_frag:_m,shadow_vert:Mm,shadow_frag:ym,sprite_vert:bm,sprite_frag:Sm},ut={common:{diffuse:{value:new gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new gt(16777215)},opacity:{value:1},center:{value:new et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},Sn={basic:{uniforms:He([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:He([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new gt(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:He([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new gt(0)},specular:{value:new gt(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:He([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:He([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new gt(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:He([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:He([ut.points,ut.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:He([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:He([ut.common,ut.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:He([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:He([ut.sprite,ut.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distanceRGBA:{uniforms:He([ut.common,ut.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distanceRGBA_vert,fragmentShader:Xt.distanceRGBA_frag},shadow:{uniforms:He([ut.lights,ut.fog,{color:{value:new gt(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};Sn.physical={uniforms:He([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new gt(0)},specularColor:{value:new gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};const Tr={r:0,b:0,g:0},Mi=new An,wm=new ie;function Tm(s,t,e,n,i,r,a){const o=new gt(0);let l=r===!0?0:1,h,c,u=null,d=0,f=null;function m(_){let M=_.isScene===!0?_.background:null;return M&&M.isTexture&&(M=(_.backgroundBlurriness>0?e:t).get(M)),M}function v(_){let M=!1;const x=m(_);x===null?p(o,l):x&&x.isColor&&(p(x,1),M=!0);const C=s.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(_,M){const x=m(M);x&&(x.isCubeTexture||x.mapping===ca)?(c===void 0&&(c=new It(new Fe(1,1,1),new ge({name:"BackgroundCubeMaterial",uniforms:bs(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:we,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(C,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),Mi.copy(M.backgroundRotation),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),c.material.uniforms.envMap.value=x,c.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(wm.makeRotationFromEuler(Mi)),c.material.toneMapped=Zt.getTransfer(x.colorSpace)!==re,(u!==x||d!==x.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,f=s.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(h===void 0&&(h=new It(new gn(2,2),new ge({name:"BackgroundMaterial",uniforms:bs(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:fi,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(h)),h.material.uniforms.t2D.value=x,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.toneMapped=Zt.getTransfer(x.colorSpace)!==re,x.matrixAutoUpdate===!0&&x.updateMatrix(),h.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,f=s.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null))}function p(_,M){_.getRGB(Tr,Wh(s)),n.buffers.color.setClear(Tr.r,Tr.g,Tr.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(_,M=1){o.set(_),l=M,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,p(o,l)},render:v,addToRenderList:g}}function Em(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,a=!1;function o(b,L,O,z,G){let Y=!1;const W=u(z,O,L);r!==W&&(r=W,h(r.object)),Y=f(b,z,O,G),Y&&m(b,z,O,G),G!==null&&t.update(G,s.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,x(b,L,O,z),G!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function l(){return s.createVertexArray()}function h(b){return s.bindVertexArray(b)}function c(b){return s.deleteVertexArray(b)}function u(b,L,O){const z=O.wireframe===!0;let G=n[b.id];G===void 0&&(G={},n[b.id]=G);let Y=G[L.id];Y===void 0&&(Y={},G[L.id]=Y);let W=Y[z];return W===void 0&&(W=d(l()),Y[z]=W),W}function d(b){const L=[],O=[],z=[];for(let G=0;G<e;G++)L[G]=0,O[G]=0,z[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:O,attributeDivisors:z,object:b,attributes:{},index:null}}function f(b,L,O,z){const G=r.attributes,Y=L.attributes;let W=0;const K=O.getAttributes();for(const V in K)if(K[V].location>=0){const xt=G[V];let wt=Y[V];if(wt===void 0&&(V==="instanceMatrix"&&b.instanceMatrix&&(wt=b.instanceMatrix),V==="instanceColor"&&b.instanceColor&&(wt=b.instanceColor)),xt===void 0||xt.attribute!==wt||wt&&xt.data!==wt.data)return!0;W++}return r.attributesNum!==W||r.index!==z}function m(b,L,O,z){const G={},Y=L.attributes;let W=0;const K=O.getAttributes();for(const V in K)if(K[V].location>=0){let xt=Y[V];xt===void 0&&(V==="instanceMatrix"&&b.instanceMatrix&&(xt=b.instanceMatrix),V==="instanceColor"&&b.instanceColor&&(xt=b.instanceColor));const wt={};wt.attribute=xt,xt&&xt.data&&(wt.data=xt.data),G[V]=wt,W++}r.attributes=G,r.attributesNum=W,r.index=z}function v(){const b=r.newAttributes;for(let L=0,O=b.length;L<O;L++)b[L]=0}function g(b){p(b,0)}function p(b,L){const O=r.newAttributes,z=r.enabledAttributes,G=r.attributeDivisors;O[b]=1,z[b]===0&&(s.enableVertexAttribArray(b),z[b]=1),G[b]!==L&&(s.vertexAttribDivisor(b,L),G[b]=L)}function _(){const b=r.newAttributes,L=r.enabledAttributes;for(let O=0,z=L.length;O<z;O++)L[O]!==b[O]&&(s.disableVertexAttribArray(O),L[O]=0)}function M(b,L,O,z,G,Y,W){W===!0?s.vertexAttribIPointer(b,L,O,G,Y):s.vertexAttribPointer(b,L,O,z,G,Y)}function x(b,L,O,z){v();const G=z.attributes,Y=O.getAttributes(),W=L.defaultAttributeValues;for(const K in Y){const V=Y[K];if(V.location>=0){let ht=G[K];if(ht===void 0&&(K==="instanceMatrix"&&b.instanceMatrix&&(ht=b.instanceMatrix),K==="instanceColor"&&b.instanceColor&&(ht=b.instanceColor)),ht!==void 0){const xt=ht.normalized,wt=ht.itemSize,Bt=t.get(ht);if(Bt===void 0)continue;const te=Bt.buffer,Z=Bt.type,at=Bt.bytesPerElement,Tt=Z===s.INT||Z===s.UNSIGNED_INT||ht.gpuType===sl;if(ht.isInterleavedBufferAttribute){const lt=ht.data,Dt=lt.stride,zt=ht.offset;if(lt.isInstancedInterleavedBuffer){for(let kt=0;kt<V.locationSize;kt++)p(V.location+kt,lt.meshPerAttribute);b.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let kt=0;kt<V.locationSize;kt++)g(V.location+kt);s.bindBuffer(s.ARRAY_BUFFER,te);for(let kt=0;kt<V.locationSize;kt++)M(V.location+kt,wt/V.locationSize,Z,xt,Dt*at,(zt+wt/V.locationSize*kt)*at,Tt)}else{if(ht.isInstancedBufferAttribute){for(let lt=0;lt<V.locationSize;lt++)p(V.location+lt,ht.meshPerAttribute);b.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let lt=0;lt<V.locationSize;lt++)g(V.location+lt);s.bindBuffer(s.ARRAY_BUFFER,te);for(let lt=0;lt<V.locationSize;lt++)M(V.location+lt,wt/V.locationSize,Z,xt,wt*at,wt/V.locationSize*lt*at,Tt)}}else if(W!==void 0){const xt=W[K];if(xt!==void 0)switch(xt.length){case 2:s.vertexAttrib2fv(V.location,xt);break;case 3:s.vertexAttrib3fv(V.location,xt);break;case 4:s.vertexAttrib4fv(V.location,xt);break;default:s.vertexAttrib1fv(V.location,xt)}}}}_()}function C(){I();for(const b in n){const L=n[b];for(const O in L){const z=L[O];for(const G in z)c(z[G].object),delete z[G];delete L[O]}delete n[b]}}function A(b){if(n[b.id]===void 0)return;const L=n[b.id];for(const O in L){const z=L[O];for(const G in z)c(z[G].object),delete z[G];delete L[O]}delete n[b.id]}function R(b){for(const L in n){const O=n[L];if(O[b.id]===void 0)continue;const z=O[b.id];for(const G in z)c(z[G].object),delete z[G];delete O[b.id]}}function I(){w(),a=!0,r!==i&&(r=i,h(r.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:I,resetDefaultState:w,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:g,disableUnusedAttributes:_}}function Am(s,t,e){let n;function i(h){n=h}function r(h,c){s.drawArrays(n,h,c),e.update(c,n,1)}function a(h,c,u){u!==0&&(s.drawArraysInstanced(n,h,c,u),e.update(c,n,u))}function o(h,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,c,0,u);let f=0;for(let m=0;m<u;m++)f+=c[m];e.update(f,n,1)}function l(h,c,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<h.length;m++)a(h[m],c[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,h,0,c,0,d,0,u);let m=0;for(let v=0;v<u;v++)m+=c[v]*d[v];e.update(m,n,1)}}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Rm(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(R){return!(R!==mn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const I=R===Hn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Wn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==En&&!I)}function l(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const c=l(h);c!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",c,"instead."),h=c);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),_=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),C=m>0,A=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:_,maxVaryings:M,maxFragmentUniforms:x,vertexTextures:C,maxSamples:A}}function Cm(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new bi,o=new Gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=c(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,p=s.get(u);if(!i||m===null||m.length===0||r&&!g)r?c(null):h();else{const _=r?0:n,M=_*4;let x=p.clippingState||null;l.value=x,x=c(m,d,M,f);for(let C=0;C!==M;++C)x[C]=e[C];p.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function h(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function c(u,d,f,m){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=l.value,m!==!0||g===null){const p=f+v*4,_=d.matrixWorldInverse;o.getNormalMatrix(_),(g===null||g.length<p)&&(g=new Float32Array(p));for(let M=0,x=f;M!==v;++M,x+=4)a.copy(u[M]).applyMatrix4(_,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function Pm(s){let t=new WeakMap;function e(a,o){return o===vo?a.mapping=vs:o===xo&&(a.mapping=xs),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===vo||o===xo)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const h=new Bd(l.height);return h.fromEquirectangularTexture(s,a),t.set(a,h),a.addEventListener("dispose",i),e(h.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class dl extends Xh{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=h*this.view.offsetX,a=r+h*this.view.width,o-=c*this.view.offsetY,l=o-c*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const cs=4,ac=[.125,.215,.35,.446,.526,.582],Ri=20,Ga=new dl,oc=new gt;let Wa=null,Xa=0,Ya=0,qa=!1;const Si=(1+Math.sqrt(5))/2,Ji=1/Si,lc=[new D(-Si,Ji,0),new D(Si,Ji,0),new D(-Ji,0,Si),new D(Ji,0,Si),new D(0,Si,-Ji),new D(0,Si,Ji),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class qo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Wa=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),Ya=this._renderer.getActiveMipmapLevel(),qa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=uc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Wa,Xa,Ya),this._renderer.xr.enabled=qa,t.scissorTest=!1,Er(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===vs||t.mapping===xs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Wa=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),Ya=this._renderer.getActiveMipmapLevel(),qa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Tn,minFilter:Tn,generateMipmaps:!1,type:Hn,format:mn,colorSpace:Ts,depthBuffer:!1},i=cc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Lm(r)),this._blurMaterial=Dm(r,t,e)}return i}_compileMaterial(t){const e=new It(this._lodPlanes[0],t);this._renderer.compile(e,Ga)}_sceneToCubeUV(t,e,n,i){const o=new ke(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],c=this._renderer,u=c.autoClear,d=c.toneMapping;c.getClearColor(oc),c.toneMapping=di,c.autoClear=!1;const f=new Se({name:"PMREM.Background",side:we,depthWrite:!1,depthTest:!1}),m=new It(new Fe,f);let v=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,v=!0):(f.color.copy(oc),v=!0);for(let p=0;p<6;p++){const _=p%3;_===0?(o.up.set(0,l[p],0),o.lookAt(h[p],0,0)):_===1?(o.up.set(0,0,l[p]),o.lookAt(0,h[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,h[p]));const M=this._cubeSize;Er(i,_*M,p>2?M:0,M,M),c.setRenderTarget(i),v&&c.render(m,o),c.render(t,o)}m.geometry.dispose(),m.material.dispose(),c.toneMapping=d,c.autoClear=u,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===vs||t.mapping===xs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=uc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hc());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new It(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Er(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Ga)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=lc[(i-r-1)%lc.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const l=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,u=new It(this._lodPlanes[i],h),d=h.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ri-1),v=r/m,g=isFinite(r)?1+Math.floor(c*v):Ri;g>Ri&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ri}`);const p=[];let _=0;for(let R=0;R<Ri;++R){const I=R/v,w=Math.exp(-I*I/2);p.push(w),R===0?_+=w:R<g&&(_+=2*w)}for(let R=0;R<p.length;R++)p[R]=p[R]/_;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=m,d.mipInt.value=M-n;const x=this._sizeLods[i],C=3*x*(i>M-cs?i-M+cs:0),A=4*(this._cubeSize-x);Er(e,C,A,3*x,2*x),l.setRenderTarget(e),l.render(u,Ga)}}function Lm(s){const t=[],e=[],n=[];let i=s;const r=s-cs+1+ac.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let l=1/o;a>s-cs?l=ac[a-s+cs-1]:a===0&&(l=0),n.push(l);const h=1/(o-2),c=-h,u=1+h,d=[c,c,u,c,u,u,c,c,u,u,c,u],f=6,m=6,v=3,g=2,p=1,_=new Float32Array(v*m*f),M=new Float32Array(g*m*f),x=new Float32Array(p*m*f);for(let A=0;A<f;A++){const R=A%3*2/3-1,I=A>2?0:-1,w=[R,I,0,R+2/3,I,0,R+2/3,I+1,0,R,I,0,R+2/3,I+1,0,R,I+1,0];_.set(w,v*m*A),M.set(d,g*m*A);const b=[A,A,A,A,A,A];x.set(b,p*m*A)}const C=new ye;C.setAttribute("position",new Pe(_,v)),C.setAttribute("uv",new Pe(M,g)),C.setAttribute("faceIndex",new Pe(x,p)),t.push(C),i>cs&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function cc(s,t,e){const n=new vn(s,t,e);return n.texture.mapping=ca,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Er(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Dm(s,t,e){const n=new Float32Array(Ri),i=new D(0,1,0);return new ge({name:"SphericalGaussianBlur",defines:{n:Ri,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:fl(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function hc(){return new ge({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fl(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function uc(){return new ge({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function fl(){return`

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
	`}function Im(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,h=l===vo||l===xo,c=l===vs||l===xs;if(h||c){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new qo(s)),u=h?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return h&&f&&f.height>0||c&&f&&i(f)?(e===null&&(e=new qo(s)),u=h?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function i(o){let l=0;const h=6;for(let c=0;c<h;c++)o[c]!==void 0&&l++;return l===h}function r(o){const l=o.target;l.removeEventListener("dispose",r);const h=t.get(l);h!==void 0&&(t.delete(l),h.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Um(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Gs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Nm(s,t,e,n){const i={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);for(const m in d.morphAttributes){const v=d.morphAttributes[m];for(let g=0,p=v.length;g<p;g++)t.remove(v[g])}d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const m in d)t.update(d[m],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const m in f){const v=f[m];for(let g=0,p=v.length;g<p;g++)t.update(v[g],s.ARRAY_BUFFER)}}function h(u){const d=[],f=u.index,m=u.attributes.position;let v=0;if(f!==null){const _=f.array;v=f.version;for(let M=0,x=_.length;M<x;M+=3){const C=_[M+0],A=_[M+1],R=_[M+2];d.push(C,A,A,R,R,C)}}else if(m!==void 0){const _=m.array;v=m.version;for(let M=0,x=_.length/3-1;M<x;M+=3){const C=M+0,A=M+1,R=M+2;d.push(C,A,A,R,R,C)}}else return;const g=new(kh(d)?Gh:Vh)(d,1);g.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,g)}function c(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&h(u)}else h(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:c}}function km(s,t,e){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*a),e.update(f,n,1)}function h(d,f,m){m!==0&&(s.drawElementsInstanced(n,f,r,d*a,m),e.update(f,n,m))}function c(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,n,1)}function u(d,f,m,v){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)h(d[p]/a,f[p],v[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,v,0,m);let p=0;for(let _=0;_<m;_++)p+=f[_]*v[_];e.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=h,this.renderMultiDraw=c,this.renderMultiDrawInstances=u}function Fm(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function zm(s,t,e){const n=new WeakMap,i=new oe;function r(a,o,l){const h=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=c!==void 0?c.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let b=function(){I.dispose(),n.delete(o),o.removeEventListener("dispose",b)};var f=b;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],_=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let x=0;m===!0&&(x=1),v===!0&&(x=2),g===!0&&(x=3);let C=o.attributes.position.count*x,A=1;C>t.maxTextureSize&&(A=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const R=new Float32Array(C*A*4*u),I=new zh(R,C,A,u);I.type=En,I.needsUpdate=!0;const w=x*4;for(let L=0;L<u;L++){const O=p[L],z=_[L],G=M[L],Y=C*A*4*L;for(let W=0;W<O.count;W++){const K=W*w;m===!0&&(i.fromBufferAttribute(O,W),R[Y+K+0]=i.x,R[Y+K+1]=i.y,R[Y+K+2]=i.z,R[Y+K+3]=0),v===!0&&(i.fromBufferAttribute(z,W),R[Y+K+4]=i.x,R[Y+K+5]=i.y,R[Y+K+6]=i.z,R[Y+K+7]=0),g===!0&&(i.fromBufferAttribute(G,W),R[Y+K+8]=i.x,R[Y+K+9]=i.y,R[Y+K+10]=i.z,R[Y+K+11]=G.itemSize===4?i.w:1)}}d={count:u,texture:I,size:new et(C,A)},n.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let m=0;for(let g=0;g<h.length;g++)m+=h[g];const v=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",h)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function Om(s,t,e,n){let i=new WeakMap;function r(l){const h=n.render.frame,c=l.geometry,u=t.get(l,c);if(i.get(u)!==h&&(t.update(u),i.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==h&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==h&&(d.update(),i.set(d,h))}return u}function a(){i=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:r,dispose:a}}class $h extends Oe{constructor(t,e,n,i,r,a,o,l,h,c=us){if(c!==us&&c!==ys)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&c===us&&(n=Ii),n===void 0&&c===ys&&(n=Ms),super(null,i,r,a,o,l,c,n,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:tn,this.minFilter=l!==void 0?l:tn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Zh=new Oe,dc=new $h(1,1),jh=new zh,Kh=new Td,Jh=new Yh,fc=[],pc=[],mc=new Float32Array(16),gc=new Float32Array(9),vc=new Float32Array(4);function Rs(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=fc[i];if(r===void 0&&(r=new Float32Array(i),fc[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Te(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Ee(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function ua(s,t){let e=pc[t];e===void 0&&(e=new Int32Array(t),pc[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Bm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Hm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;s.uniform2fv(this.addr,t),Ee(e,t)}}function Vm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;s.uniform3fv(this.addr,t),Ee(e,t)}}function Gm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;s.uniform4fv(this.addr,t),Ee(e,t)}}function Wm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(Te(e,n))return;vc.set(n),s.uniformMatrix2fv(this.addr,!1,vc),Ee(e,n)}}function Xm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(Te(e,n))return;gc.set(n),s.uniformMatrix3fv(this.addr,!1,gc),Ee(e,n)}}function Ym(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(Te(e,n))return;mc.set(n),s.uniformMatrix4fv(this.addr,!1,mc),Ee(e,n)}}function qm(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function $m(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;s.uniform2iv(this.addr,t),Ee(e,t)}}function Zm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;s.uniform3iv(this.addr,t),Ee(e,t)}}function jm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;s.uniform4iv(this.addr,t),Ee(e,t)}}function Km(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Jm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;s.uniform2uiv(this.addr,t),Ee(e,t)}}function Qm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;s.uniform3uiv(this.addr,t),Ee(e,t)}}function t0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;s.uniform4uiv(this.addr,t),Ee(e,t)}}function e0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(dc.compareFunction=Nh,r=dc):r=Zh,e.setTexture2D(t||r,i)}function n0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Kh,i)}function i0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Jh,i)}function s0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||jh,i)}function r0(s){switch(s){case 5126:return Bm;case 35664:return Hm;case 35665:return Vm;case 35666:return Gm;case 35674:return Wm;case 35675:return Xm;case 35676:return Ym;case 5124:case 35670:return qm;case 35667:case 35671:return $m;case 35668:case 35672:return Zm;case 35669:case 35673:return jm;case 5125:return Km;case 36294:return Jm;case 36295:return Qm;case 36296:return t0;case 35678:case 36198:case 36298:case 36306:case 35682:return e0;case 35679:case 36299:case 36307:return n0;case 35680:case 36300:case 36308:case 36293:return i0;case 36289:case 36303:case 36311:case 36292:return s0}}function a0(s,t){s.uniform1fv(this.addr,t)}function o0(s,t){const e=Rs(t,this.size,2);s.uniform2fv(this.addr,e)}function l0(s,t){const e=Rs(t,this.size,3);s.uniform3fv(this.addr,e)}function c0(s,t){const e=Rs(t,this.size,4);s.uniform4fv(this.addr,e)}function h0(s,t){const e=Rs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function u0(s,t){const e=Rs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function d0(s,t){const e=Rs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function f0(s,t){s.uniform1iv(this.addr,t)}function p0(s,t){s.uniform2iv(this.addr,t)}function m0(s,t){s.uniform3iv(this.addr,t)}function g0(s,t){s.uniform4iv(this.addr,t)}function v0(s,t){s.uniform1uiv(this.addr,t)}function x0(s,t){s.uniform2uiv(this.addr,t)}function _0(s,t){s.uniform3uiv(this.addr,t)}function M0(s,t){s.uniform4uiv(this.addr,t)}function y0(s,t,e){const n=this.cache,i=t.length,r=ua(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||Zh,r[a])}function b0(s,t,e){const n=this.cache,i=t.length,r=ua(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Kh,r[a])}function S0(s,t,e){const n=this.cache,i=t.length,r=ua(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||Jh,r[a])}function w0(s,t,e){const n=this.cache,i=t.length,r=ua(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ee(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||jh,r[a])}function T0(s){switch(s){case 5126:return a0;case 35664:return o0;case 35665:return l0;case 35666:return c0;case 35674:return h0;case 35675:return u0;case 35676:return d0;case 5124:case 35670:return f0;case 35667:case 35671:return p0;case 35668:case 35672:return m0;case 35669:case 35673:return g0;case 5125:return v0;case 36294:return x0;case 36295:return _0;case 36296:return M0;case 35678:case 36198:case 36298:case 36306:case 35682:return y0;case 35679:case 36299:case 36307:return b0;case 35680:case 36300:case 36308:case 36293:return S0;case 36289:case 36303:case 36311:case 36292:return w0}}class E0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=r0(e.type)}}class A0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=T0(e.type)}}class R0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const $a=/(\w+)(\])?(\[|\.)?/g;function xc(s,t){s.seq.push(t),s.map[t.id]=t}function C0(s,t,e){const n=s.name,i=n.length;for($a.lastIndex=0;;){const r=$a.exec(n),a=$a.lastIndex;let o=r[1];const l=r[2]==="]",h=r[3];if(l&&(o=o|0),h===void 0||h==="["&&a+2===i){xc(e,h===void 0?new E0(o,s,t):new A0(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new R0(o),xc(e,u)),e=u}}}class Zr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);C0(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function _c(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const P0=37297;let L0=0;function D0(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Mc=new Gt;function I0(s){Zt._getMatrix(Mc,Zt.workingColorSpace,s);const t=`mat3( ${Mc.elements.map(e=>e.toFixed(4))} )`;switch(Zt.getTransfer(s)){case ha:return[t,"LinearTransferOETF"];case re:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function yc(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+D0(s.getShaderSource(t),a)}else return i}function U0(s,t){const e=I0(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function N0(s,t){let e;switch(t){case _h:e="Linear";break;case Mh:e="Reinhard";break;case yh:e="Cineon";break;case il:e="ACESFilmic";break;case bh:e="AgX";break;case Sh:e="Neutral";break;case sd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ar=new D;function k0(){Zt.getLuminanceCoefficients(Ar);const s=Ar.x.toFixed(4),t=Ar.y.toFixed(4),e=Ar.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function F0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ws).join(`
`)}function z0(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function O0(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Ws(s){return s!==""}function bc(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Sc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const B0=/^[ \t]*#include +<([\w\d./]+)>/gm;function $o(s){return s.replace(B0,V0)}const H0=new Map;function V0(s,t){let e=Xt[t];if(e===void 0){const n=H0.get(t);if(n!==void 0)e=Xt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return $o(e)}const G0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wc(s){return s.replace(G0,W0)}function W0(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Tc(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}function X0(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===gh?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===vh?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===kn&&(t="SHADOWMAP_TYPE_VSM"),t}function Y0(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case vs:case xs:t="ENVMAP_TYPE_CUBE";break;case ca:t="ENVMAP_TYPE_CUBE_UV";break}return t}function q0(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case xs:t="ENVMAP_MODE_REFRACTION";break}return t}function $0(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case xh:t="ENVMAP_BLENDING_MULTIPLY";break;case nd:t="ENVMAP_BLENDING_MIX";break;case id:t="ENVMAP_BLENDING_ADD";break}return t}function Z0(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function j0(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=X0(e),h=Y0(e),c=q0(e),u=$0(e),d=Z0(e),f=F0(e),m=z0(r),v=i.createProgram();let g,p,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ws).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ws).join(`
`),p.length>0&&(p+=`
`)):(g=[Tc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ws).join(`
`),p=[Tc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==di?"#define TONE_MAPPING":"",e.toneMapping!==di?Xt.tonemapping_pars_fragment:"",e.toneMapping!==di?N0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,U0("linearToOutputTexel",e.outputColorSpace),k0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ws).join(`
`)),a=$o(a),a=bc(a,e),a=Sc(a,e),o=$o(o),o=bc(o,e),o=Sc(o,e),a=wc(a),o=wc(o),e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Ol?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ol?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=_+g+a,x=_+p+o,C=_c(i,i.VERTEX_SHADER,M),A=_c(i,i.FRAGMENT_SHADER,x);i.attachShader(v,C),i.attachShader(v,A),e.index0AttributeName!==void 0?i.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function R(L){if(s.debug.checkShaderErrors){const O=i.getProgramInfoLog(v).trim(),z=i.getShaderInfoLog(C).trim(),G=i.getShaderInfoLog(A).trim();let Y=!0,W=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(Y=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,C,A);else{const K=yc(i,C,"vertex"),V=yc(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+O+`
`+K+`
`+V)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(z===""||G==="")&&(W=!1);W&&(L.diagnostics={runnable:Y,programLog:O,vertexShader:{log:z,prefix:g},fragmentShader:{log:G,prefix:p}})}i.deleteShader(C),i.deleteShader(A),I=new Zr(i,v),w=O0(i,v)}let I;this.getUniforms=function(){return I===void 0&&R(this),I};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=i.getProgramParameter(v,P0)),b},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=L0++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=A,this}let K0=0;class J0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Q0(t),e.set(t,n)),n}}class Q0{constructor(t){this.id=K0++,this.code=t,this.usedTimes=0}}function tg(s,t,e,n,i,r,a){const o=new Bh,l=new J0,h=new Set,c=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return h.add(w),w===0?"uv":`uv${w}`}function g(w,b,L,O,z){const G=O.fog,Y=z.geometry,W=w.isMeshStandardMaterial?O.environment:null,K=(w.isMeshStandardMaterial?e:t).get(w.envMap||W),V=K&&K.mapping===ca?K.image.height:null,ht=m[w.type];w.precision!==null&&(f=i.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));const xt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,wt=xt!==void 0?xt.length:0;let Bt=0;Y.morphAttributes.position!==void 0&&(Bt=1),Y.morphAttributes.normal!==void 0&&(Bt=2),Y.morphAttributes.color!==void 0&&(Bt=3);let te,Z,at,Tt;if(ht){const se=Sn[ht];te=se.vertexShader,Z=se.fragmentShader}else te=w.vertexShader,Z=w.fragmentShader,l.update(w),at=l.getVertexShaderID(w),Tt=l.getFragmentShaderID(w);const lt=s.getRenderTarget(),Dt=s.state.buffers.depth.getReversed(),zt=z.isInstancedMesh===!0,kt=z.isBatchedMesh===!0,jt=!!w.map,J=!!w.matcap,rt=!!K,P=!!w.aoMap,Pt=!!w.lightMap,nt=!!w.bumpMap,yt=!!w.normalMap,ct=!!w.displacementMap,Ut=!!w.emissiveMap,_t=!!w.metalnessMap,E=!!w.roughnessMap,S=w.anisotropy>0,F=w.clearcoat>0,q=w.dispersion>0,Q=w.iridescence>0,$=w.sheen>0,Et=w.transmission>0,dt=S&&!!w.anisotropyMap,Mt=F&&!!w.clearcoatMap,Yt=F&&!!w.clearcoatNormalMap,it=F&&!!w.clearcoatRoughnessMap,bt=Q&&!!w.iridescenceMap,Nt=Q&&!!w.iridescenceThicknessMap,Ft=$&&!!w.sheenColorMap,St=$&&!!w.sheenRoughnessMap,$t=!!w.specularMap,Wt=!!w.specularColorMap,ce=!!w.specularIntensityMap,U=Et&&!!w.transmissionMap,ft=Et&&!!w.thicknessMap,X=!!w.gradientMap,j=!!w.alphaMap,vt=w.alphaTest>0,pt=!!w.alphaHash,Ht=!!w.extensions;let pe=di;w.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(pe=s.toneMapping);const Le={shaderID:ht,shaderType:w.type,shaderName:w.name,vertexShader:te,fragmentShader:Z,defines:w.defines,customVertexShaderID:at,customFragmentShaderID:Tt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:kt,batchingColor:kt&&z._colorsTexture!==null,instancing:zt,instancingColor:zt&&z.instanceColor!==null,instancingMorph:zt&&z.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:lt===null?s.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:Ts,alphaToCoverage:!!w.alphaToCoverage,map:jt,matcap:J,envMap:rt,envMapMode:rt&&K.mapping,envMapCubeUVHeight:V,aoMap:P,lightMap:Pt,bumpMap:nt,normalMap:yt,displacementMap:d&&ct,emissiveMap:Ut,normalMapObjectSpace:yt&&w.normalMapType===ld,normalMapTangentSpace:yt&&w.normalMapType===Uh,metalnessMap:_t,roughnessMap:E,anisotropy:S,anisotropyMap:dt,clearcoat:F,clearcoatMap:Mt,clearcoatNormalMap:Yt,clearcoatRoughnessMap:it,dispersion:q,iridescence:Q,iridescenceMap:bt,iridescenceThicknessMap:Nt,sheen:$,sheenColorMap:Ft,sheenRoughnessMap:St,specularMap:$t,specularColorMap:Wt,specularIntensityMap:ce,transmission:Et,transmissionMap:U,thicknessMap:ft,gradientMap:X,opaque:w.transparent===!1&&w.blending===ui&&w.alphaToCoverage===!1,alphaMap:j,alphaTest:vt,alphaHash:pt,combine:w.combine,mapUv:jt&&v(w.map.channel),aoMapUv:P&&v(w.aoMap.channel),lightMapUv:Pt&&v(w.lightMap.channel),bumpMapUv:nt&&v(w.bumpMap.channel),normalMapUv:yt&&v(w.normalMap.channel),displacementMapUv:ct&&v(w.displacementMap.channel),emissiveMapUv:Ut&&v(w.emissiveMap.channel),metalnessMapUv:_t&&v(w.metalnessMap.channel),roughnessMapUv:E&&v(w.roughnessMap.channel),anisotropyMapUv:dt&&v(w.anisotropyMap.channel),clearcoatMapUv:Mt&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:Yt&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:Nt&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:Ft&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:St&&v(w.sheenRoughnessMap.channel),specularMapUv:$t&&v(w.specularMap.channel),specularColorMapUv:Wt&&v(w.specularColorMap.channel),specularIntensityMapUv:ce&&v(w.specularIntensityMap.channel),transmissionMapUv:U&&v(w.transmissionMap.channel),thicknessMapUv:ft&&v(w.thicknessMap.channel),alphaMapUv:j&&v(w.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(yt||S),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!Y.attributes.uv&&(jt||j),fog:!!G,useFog:w.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Dt,skinning:z.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:wt,morphTextureStride:Bt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:pe,decodeVideoTexture:jt&&w.map.isVideoTexture===!0&&Zt.getTransfer(w.map.colorSpace)===re,decodeVideoTextureEmissive:Ut&&w.emissiveMap.isVideoTexture===!0&&Zt.getTransfer(w.emissiveMap.colorSpace)===re,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===qe,flipSided:w.side===we,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Ht&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ht&&w.extensions.multiDraw===!0||kt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Le.vertexUv1s=h.has(1),Le.vertexUv2s=h.has(2),Le.vertexUv3s=h.has(3),h.clear(),Le}function p(w){const b=[];if(w.shaderID?b.push(w.shaderID):(b.push(w.customVertexShaderID),b.push(w.customFragmentShaderID)),w.defines!==void 0)for(const L in w.defines)b.push(L),b.push(w.defines[L]);return w.isRawShaderMaterial===!1&&(_(b,w),M(b,w),b.push(s.outputColorSpace)),b.push(w.customProgramCacheKey),b.join()}function _(w,b){w.push(b.precision),w.push(b.outputColorSpace),w.push(b.envMapMode),w.push(b.envMapCubeUVHeight),w.push(b.mapUv),w.push(b.alphaMapUv),w.push(b.lightMapUv),w.push(b.aoMapUv),w.push(b.bumpMapUv),w.push(b.normalMapUv),w.push(b.displacementMapUv),w.push(b.emissiveMapUv),w.push(b.metalnessMapUv),w.push(b.roughnessMapUv),w.push(b.anisotropyMapUv),w.push(b.clearcoatMapUv),w.push(b.clearcoatNormalMapUv),w.push(b.clearcoatRoughnessMapUv),w.push(b.iridescenceMapUv),w.push(b.iridescenceThicknessMapUv),w.push(b.sheenColorMapUv),w.push(b.sheenRoughnessMapUv),w.push(b.specularMapUv),w.push(b.specularColorMapUv),w.push(b.specularIntensityMapUv),w.push(b.transmissionMapUv),w.push(b.thicknessMapUv),w.push(b.combine),w.push(b.fogExp2),w.push(b.sizeAttenuation),w.push(b.morphTargetsCount),w.push(b.morphAttributeCount),w.push(b.numDirLights),w.push(b.numPointLights),w.push(b.numSpotLights),w.push(b.numSpotLightMaps),w.push(b.numHemiLights),w.push(b.numRectAreaLights),w.push(b.numDirLightShadows),w.push(b.numPointLightShadows),w.push(b.numSpotLightShadows),w.push(b.numSpotLightShadowsWithMaps),w.push(b.numLightProbes),w.push(b.shadowMapType),w.push(b.toneMapping),w.push(b.numClippingPlanes),w.push(b.numClipIntersection),w.push(b.depthPacking)}function M(w,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),w.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reverseDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),w.push(o.mask)}function x(w){const b=m[w.type];let L;if(b){const O=Sn[b];L=Js.clone(O.uniforms)}else L=w.uniforms;return L}function C(w,b){let L;for(let O=0,z=c.length;O<z;O++){const G=c[O];if(G.cacheKey===b){L=G,++L.usedTimes;break}}return L===void 0&&(L=new j0(s,b,w,r),c.push(L)),L}function A(w){if(--w.usedTimes===0){const b=c.indexOf(w);c[b]=c[c.length-1],c.pop(),w.destroy()}}function R(w){l.remove(w)}function I(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:x,acquireProgram:C,releaseProgram:A,releaseShaderCache:R,programs:c,dispose:I}}function eg(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function ng(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Ec(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Ac(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u,d,f,m,v,g){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:v,group:g},s[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=v,p.group=g),t++,p}function o(u,d,f,m,v,g){const p=a(u,d,f,m,v,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function l(u,d,f,m,v,g){const p=a(u,d,f,m,v,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function h(u,d){e.length>1&&e.sort(u||ng),n.length>1&&n.sort(d||Ec),i.length>1&&i.sort(d||Ec)}function c(){for(let u=t,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:c,sort:h}}function ig(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new Ac,s.set(n,[a])):i>=r.length?(a=new Ac,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function sg(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new gt};break;case"SpotLight":e={position:new D,direction:new D,color:new gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new gt,groundColor:new gt};break;case"RectAreaLight":e={color:new gt,position:new D,halfWidth:new D,halfHeight:new D};break}return s[t.id]=e,e}}}function rg(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let ag=0;function og(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function lg(s){const t=new sg,e=rg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new D);const i=new D,r=new ie,a=new ie;function o(h){let c=0,u=0,d=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,m=0,v=0,g=0,p=0,_=0,M=0,x=0,C=0,A=0,R=0;h.sort(og);for(let w=0,b=h.length;w<b;w++){const L=h[w],O=L.color,z=L.intensity,G=L.distance,Y=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)c+=O.r*z,u+=O.g*z,d+=O.b*z;else if(L.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(L.sh.coefficients[W],z);R++}else if(L.isDirectionalLight){const W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const K=L.shadow,V=e.get(L);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,n.directionalShadow[f]=V,n.directionalShadowMap[f]=Y,n.directionalShadowMatrix[f]=L.shadow.matrix,_++}n.directional[f]=W,f++}else if(L.isSpotLight){const W=t.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(O).multiplyScalar(z),W.distance=G,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,n.spot[v]=W;const K=L.shadow;if(L.map&&(n.spotLightMap[C]=L.map,C++,K.updateMatrices(L),L.castShadow&&A++),n.spotLightMatrix[v]=K.matrix,L.castShadow){const V=e.get(L);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,n.spotShadow[v]=V,n.spotShadowMap[v]=Y,x++}v++}else if(L.isRectAreaLight){const W=t.get(L);W.color.copy(O).multiplyScalar(z),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),n.rectArea[g]=W,g++}else if(L.isPointLight){const W=t.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),W.distance=L.distance,W.decay=L.decay,L.castShadow){const K=L.shadow,V=e.get(L);V.shadowIntensity=K.intensity,V.shadowBias=K.bias,V.shadowNormalBias=K.normalBias,V.shadowRadius=K.radius,V.shadowMapSize=K.mapSize,V.shadowCameraNear=K.camera.near,V.shadowCameraFar=K.camera.far,n.pointShadow[m]=V,n.pointShadowMap[m]=Y,n.pointShadowMatrix[m]=L.shadow.matrix,M++}n.point[m]=W,m++}else if(L.isHemisphereLight){const W=t.get(L);W.skyColor.copy(L.color).multiplyScalar(z),W.groundColor.copy(L.groundColor).multiplyScalar(z),n.hemi[p]=W,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=u,n.ambient[2]=d;const I=n.hash;(I.directionalLength!==f||I.pointLength!==m||I.spotLength!==v||I.rectAreaLength!==g||I.hemiLength!==p||I.numDirectionalShadows!==_||I.numPointShadows!==M||I.numSpotShadows!==x||I.numSpotMaps!==C||I.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=x+C-A,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=R,I.directionalLength=f,I.pointLength=m,I.spotLength=v,I.rectAreaLength=g,I.hemiLength=p,I.numDirectionalShadows=_,I.numPointShadows=M,I.numSpotShadows=x,I.numSpotMaps=C,I.numLightProbes=R,n.version=ag++)}function l(h,c){let u=0,d=0,f=0,m=0,v=0;const g=c.matrixWorldInverse;for(let p=0,_=h.length;p<_;p++){const M=h[p];if(M.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),u++}else if(M.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),f++}else if(M.isRectAreaLight){const x=n.rectArea[m];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(g),a.identity(),r.copy(M.matrixWorld),r.premultiply(g),a.extractRotation(r),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),m++}else if(M.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(g),d++}else if(M.isHemisphereLight){const x=n.hemi[v];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function Rc(s){const t=new lg(s),e=[],n=[];function i(c){h.camera=c,e.length=0,n.length=0}function r(c){e.push(c)}function a(c){n.push(c)}function o(){t.setup(e)}function l(c){t.setupView(e,c)}const h={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:h,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function cg(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new Rc(s),t.set(i,[o])):r>=a.length?(o=new Rc(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class hg extends Fi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=ad,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ug extends Fi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const dg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fg=`uniform sampler2D shadow_pass;
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
}`;function pg(s,t,e){let n=new ul;const i=new et,r=new et,a=new oe,o=new hg({depthPacking:od}),l=new ug,h={},c=e.maxTextureSize,u={[fi]:we,[we]:fi,[qe]:qe},d=new ge({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new et},radius:{value:4}},vertexShader:dg,fragmentShader:fg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new ye;m.setAttribute("position",new Pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new It(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gh;let p=this.type;this.render=function(A,R,I){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;const w=s.getRenderTarget(),b=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),O=s.state;O.setBlending(Bn),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const z=p!==kn&&this.type===kn,G=p===kn&&this.type!==kn;for(let Y=0,W=A.length;Y<W;Y++){const K=A[Y],V=K.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const ht=V.getFrameExtents();if(i.multiply(ht),r.copy(V.mapSize),(i.x>c||i.y>c)&&(i.x>c&&(r.x=Math.floor(c/ht.x),i.x=r.x*ht.x,V.mapSize.x=r.x),i.y>c&&(r.y=Math.floor(c/ht.y),i.y=r.y*ht.y,V.mapSize.y=r.y)),V.map===null||z===!0||G===!0){const wt=this.type!==kn?{minFilter:tn,magFilter:tn}:{};V.map!==null&&V.map.dispose(),V.map=new vn(i.x,i.y,wt),V.map.texture.name=K.name+".shadowMap",V.camera.updateProjectionMatrix()}s.setRenderTarget(V.map),s.clear();const xt=V.getViewportCount();for(let wt=0;wt<xt;wt++){const Bt=V.getViewport(wt);a.set(r.x*Bt.x,r.y*Bt.y,r.x*Bt.z,r.y*Bt.w),O.viewport(a),V.updateMatrices(K,wt),n=V.getFrustum(),x(R,I,V.camera,K,this.type)}V.isPointLightShadow!==!0&&this.type===kn&&_(V,I),V.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(w,b,L)};function _(A,R){const I=t.update(v);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new vn(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(R,null,I,d,v,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(R,null,I,f,v,null)}function M(A,R,I,w){let b=null;const L=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)b=L;else if(b=I.isPointLight===!0?l:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const O=b.uuid,z=R.uuid;let G=h[O];G===void 0&&(G={},h[O]=G);let Y=G[z];Y===void 0&&(Y=b.clone(),G[z]=Y,R.addEventListener("dispose",C)),b=Y}if(b.visible=R.visible,b.wireframe=R.wireframe,w===kn?b.side=R.shadowSide!==null?R.shadowSide:R.side:b.side=R.shadowSide!==null?R.shadowSide:u[R.side],b.alphaMap=R.alphaMap,b.alphaTest=R.alphaTest,b.map=R.map,b.clipShadows=R.clipShadows,b.clippingPlanes=R.clippingPlanes,b.clipIntersection=R.clipIntersection,b.displacementMap=R.displacementMap,b.displacementScale=R.displacementScale,b.displacementBias=R.displacementBias,b.wireframeLinewidth=R.wireframeLinewidth,b.linewidth=R.linewidth,I.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const O=s.properties.get(b);O.light=I}return b}function x(A,R,I,w,b){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===kn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);const z=t.update(A),G=A.material;if(Array.isArray(G)){const Y=z.groups;for(let W=0,K=Y.length;W<K;W++){const V=Y[W],ht=G[V.materialIndex];if(ht&&ht.visible){const xt=M(A,ht,w,b);A.onBeforeShadow(s,A,R,I,z,xt,V),s.renderBufferDirect(I,null,z,xt,A,V),A.onAfterShadow(s,A,R,I,z,xt,V)}}}else if(G.visible){const Y=M(A,G,w,b);A.onBeforeShadow(s,A,R,I,z,Y,null),s.renderBufferDirect(I,null,z,Y,A,null),A.onAfterShadow(s,A,R,I,z,Y,null)}}const O=A.children;for(let z=0,G=O.length;z<G;z++)x(O[z],R,I,w,b)}function C(A){A.target.removeEventListener("dispose",C);for(const I in h){const w=h[I],b=A.target.uuid;b in w&&(w[b].dispose(),delete w[b])}}}const mg={[co]:ho,[uo]:mo,[fo]:go,[gs]:po,[ho]:co,[mo]:uo,[go]:fo,[po]:gs};function gg(s,t){function e(){let U=!1;const ft=new oe;let X=null;const j=new oe(0,0,0,0);return{setMask:function(vt){X!==vt&&!U&&(s.colorMask(vt,vt,vt,vt),X=vt)},setLocked:function(vt){U=vt},setClear:function(vt,pt,Ht,pe,Le){Le===!0&&(vt*=pe,pt*=pe,Ht*=pe),ft.set(vt,pt,Ht,pe),j.equals(ft)===!1&&(s.clearColor(vt,pt,Ht,pe),j.copy(ft))},reset:function(){U=!1,X=null,j.set(-1,0,0,0)}}}function n(){let U=!1,ft=!1,X=null,j=null,vt=null;return{setReversed:function(pt){if(ft!==pt){const Ht=t.get("EXT_clip_control");ft?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT);const pe=vt;vt=null,this.setClear(pe)}ft=pt},getReversed:function(){return ft},setTest:function(pt){pt?lt(s.DEPTH_TEST):Dt(s.DEPTH_TEST)},setMask:function(pt){X!==pt&&!U&&(s.depthMask(pt),X=pt)},setFunc:function(pt){if(ft&&(pt=mg[pt]),j!==pt){switch(pt){case co:s.depthFunc(s.NEVER);break;case ho:s.depthFunc(s.ALWAYS);break;case uo:s.depthFunc(s.LESS);break;case gs:s.depthFunc(s.LEQUAL);break;case fo:s.depthFunc(s.EQUAL);break;case po:s.depthFunc(s.GEQUAL);break;case mo:s.depthFunc(s.GREATER);break;case go:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}j=pt}},setLocked:function(pt){U=pt},setClear:function(pt){vt!==pt&&(ft&&(pt=1-pt),s.clearDepth(pt),vt=pt)},reset:function(){U=!1,X=null,j=null,vt=null,ft=!1}}}function i(){let U=!1,ft=null,X=null,j=null,vt=null,pt=null,Ht=null,pe=null,Le=null;return{setTest:function(se){U||(se?lt(s.STENCIL_TEST):Dt(s.STENCIL_TEST))},setMask:function(se){ft!==se&&!U&&(s.stencilMask(se),ft=se)},setFunc:function(se,hn,Cn){(X!==se||j!==hn||vt!==Cn)&&(s.stencilFunc(se,hn,Cn),X=se,j=hn,vt=Cn)},setOp:function(se,hn,Cn){(pt!==se||Ht!==hn||pe!==Cn)&&(s.stencilOp(se,hn,Cn),pt=se,Ht=hn,pe=Cn)},setLocked:function(se){U=se},setClear:function(se){Le!==se&&(s.clearStencil(se),Le=se)},reset:function(){U=!1,ft=null,X=null,j=null,vt=null,pt=null,Ht=null,pe=null,Le=null}}}const r=new e,a=new n,o=new i,l=new WeakMap,h=new WeakMap;let c={},u={},d=new WeakMap,f=[],m=null,v=!1,g=null,p=null,_=null,M=null,x=null,C=null,A=null,R=new gt(0,0,0),I=0,w=!1,b=null,L=null,O=null,z=null,G=null;const Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,K=0;const V=s.getParameter(s.VERSION);V.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=K>=1):V.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=K>=2);let ht=null,xt={};const wt=s.getParameter(s.SCISSOR_BOX),Bt=s.getParameter(s.VIEWPORT),te=new oe().fromArray(wt),Z=new oe().fromArray(Bt);function at(U,ft,X,j){const vt=new Uint8Array(4),pt=s.createTexture();s.bindTexture(U,pt),s.texParameteri(U,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(U,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ht=0;Ht<X;Ht++)U===s.TEXTURE_3D||U===s.TEXTURE_2D_ARRAY?s.texImage3D(ft,0,s.RGBA,1,1,j,0,s.RGBA,s.UNSIGNED_BYTE,vt):s.texImage2D(ft+Ht,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,vt);return pt}const Tt={};Tt[s.TEXTURE_2D]=at(s.TEXTURE_2D,s.TEXTURE_2D,1),Tt[s.TEXTURE_CUBE_MAP]=at(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Tt[s.TEXTURE_2D_ARRAY]=at(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Tt[s.TEXTURE_3D]=at(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),lt(s.DEPTH_TEST),a.setFunc(gs),nt(!1),yt(Nl),lt(s.CULL_FACE),P(Bn);function lt(U){c[U]!==!0&&(s.enable(U),c[U]=!0)}function Dt(U){c[U]!==!1&&(s.disable(U),c[U]=!1)}function zt(U,ft){return u[U]!==ft?(s.bindFramebuffer(U,ft),u[U]=ft,U===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ft),U===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ft),!0):!1}function kt(U,ft){let X=f,j=!1;if(U){X=d.get(ft),X===void 0&&(X=[],d.set(ft,X));const vt=U.textures;if(X.length!==vt.length||X[0]!==s.COLOR_ATTACHMENT0){for(let pt=0,Ht=vt.length;pt<Ht;pt++)X[pt]=s.COLOR_ATTACHMENT0+pt;X.length=vt.length,j=!0}}else X[0]!==s.BACK&&(X[0]=s.BACK,j=!0);j&&s.drawBuffers(X)}function jt(U){return m!==U?(s.useProgram(U),m=U,!0):!1}const J={[Ai]:s.FUNC_ADD,[Ou]:s.FUNC_SUBTRACT,[Bu]:s.FUNC_REVERSE_SUBTRACT};J[Hu]=s.MIN,J[Vu]=s.MAX;const rt={[Gu]:s.ZERO,[Wu]:s.ONE,[Xu]:s.SRC_COLOR,[oo]:s.SRC_ALPHA,[Ku]:s.SRC_ALPHA_SATURATE,[Zu]:s.DST_COLOR,[qu]:s.DST_ALPHA,[Yu]:s.ONE_MINUS_SRC_COLOR,[lo]:s.ONE_MINUS_SRC_ALPHA,[ju]:s.ONE_MINUS_DST_COLOR,[$u]:s.ONE_MINUS_DST_ALPHA,[Ju]:s.CONSTANT_COLOR,[Qu]:s.ONE_MINUS_CONSTANT_COLOR,[td]:s.CONSTANT_ALPHA,[ed]:s.ONE_MINUS_CONSTANT_ALPHA};function P(U,ft,X,j,vt,pt,Ht,pe,Le,se){if(U===Bn){v===!0&&(Dt(s.BLEND),v=!1);return}if(v===!1&&(lt(s.BLEND),v=!0),U!==zu){if(U!==g||se!==w){if((p!==Ai||x!==Ai)&&(s.blendEquation(s.FUNC_ADD),p=Ai,x=Ai),se)switch(U){case ui:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case We:s.blendFunc(s.ONE,s.ONE);break;case kl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Fl:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case ui:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case We:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case kl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Fl:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}_=null,M=null,C=null,A=null,R.set(0,0,0),I=0,g=U,w=se}return}vt=vt||ft,pt=pt||X,Ht=Ht||j,(ft!==p||vt!==x)&&(s.blendEquationSeparate(J[ft],J[vt]),p=ft,x=vt),(X!==_||j!==M||pt!==C||Ht!==A)&&(s.blendFuncSeparate(rt[X],rt[j],rt[pt],rt[Ht]),_=X,M=j,C=pt,A=Ht),(pe.equals(R)===!1||Le!==I)&&(s.blendColor(pe.r,pe.g,pe.b,Le),R.copy(pe),I=Le),g=U,w=!1}function Pt(U,ft){U.side===qe?Dt(s.CULL_FACE):lt(s.CULL_FACE);let X=U.side===we;ft&&(X=!X),nt(X),U.blending===ui&&U.transparent===!1?P(Bn):P(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),a.setFunc(U.depthFunc),a.setTest(U.depthTest),a.setMask(U.depthWrite),r.setMask(U.colorWrite);const j=U.stencilWrite;o.setTest(j),j&&(o.setMask(U.stencilWriteMask),o.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),o.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ut(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?lt(s.SAMPLE_ALPHA_TO_COVERAGE):Dt(s.SAMPLE_ALPHA_TO_COVERAGE)}function nt(U){b!==U&&(U?s.frontFace(s.CW):s.frontFace(s.CCW),b=U)}function yt(U){U!==ku?(lt(s.CULL_FACE),U!==L&&(U===Nl?s.cullFace(s.BACK):U===Fu?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Dt(s.CULL_FACE),L=U}function ct(U){U!==O&&(W&&s.lineWidth(U),O=U)}function Ut(U,ft,X){U?(lt(s.POLYGON_OFFSET_FILL),(z!==ft||G!==X)&&(s.polygonOffset(ft,X),z=ft,G=X)):Dt(s.POLYGON_OFFSET_FILL)}function _t(U){U?lt(s.SCISSOR_TEST):Dt(s.SCISSOR_TEST)}function E(U){U===void 0&&(U=s.TEXTURE0+Y-1),ht!==U&&(s.activeTexture(U),ht=U)}function S(U,ft,X){X===void 0&&(ht===null?X=s.TEXTURE0+Y-1:X=ht);let j=xt[X];j===void 0&&(j={type:void 0,texture:void 0},xt[X]=j),(j.type!==U||j.texture!==ft)&&(ht!==X&&(s.activeTexture(X),ht=X),s.bindTexture(U,ft||Tt[U]),j.type=U,j.texture=ft)}function F(){const U=xt[ht];U!==void 0&&U.type!==void 0&&(s.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function q(){try{s.compressedTexImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{s.compressedTexImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $(){try{s.texSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Et(){try{s.texSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function dt(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Mt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Yt(){try{s.texStorage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function it(){try{s.texStorage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function bt(){try{s.texImage2D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Nt(){try{s.texImage3D.apply(s,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ft(U){te.equals(U)===!1&&(s.scissor(U.x,U.y,U.z,U.w),te.copy(U))}function St(U){Z.equals(U)===!1&&(s.viewport(U.x,U.y,U.z,U.w),Z.copy(U))}function $t(U,ft){let X=h.get(ft);X===void 0&&(X=new WeakMap,h.set(ft,X));let j=X.get(U);j===void 0&&(j=s.getUniformBlockIndex(ft,U.name),X.set(U,j))}function Wt(U,ft){const j=h.get(ft).get(U);l.get(ft)!==j&&(s.uniformBlockBinding(ft,j,U.__bindingPointIndex),l.set(ft,j))}function ce(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),c={},ht=null,xt={},u={},d=new WeakMap,f=[],m=null,v=!1,g=null,p=null,_=null,M=null,x=null,C=null,A=null,R=new gt(0,0,0),I=0,w=!1,b=null,L=null,O=null,z=null,G=null,te.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:lt,disable:Dt,bindFramebuffer:zt,drawBuffers:kt,useProgram:jt,setBlending:P,setMaterial:Pt,setFlipSided:nt,setCullFace:yt,setLineWidth:ct,setPolygonOffset:Ut,setScissorTest:_t,activeTexture:E,bindTexture:S,unbindTexture:F,compressedTexImage2D:q,compressedTexImage3D:Q,texImage2D:bt,texImage3D:Nt,updateUBOMapping:$t,uniformBlockBinding:Wt,texStorage2D:Yt,texStorage3D:it,texSubImage2D:$,texSubImage3D:Et,compressedTexSubImage2D:dt,compressedTexSubImage3D:Mt,scissor:Ft,viewport:St,reset:ce}}function Cc(s,t,e,n){const i=vg(n);switch(e){case Rh:return s*t;case Ph:return s*t;case Lh:return s*t*2;case ol:return s*t/i.components*i.byteLength;case ll:return s*t/i.components*i.byteLength;case Dh:return s*t*2/i.components*i.byteLength;case cl:return s*t*2/i.components*i.byteLength;case Ch:return s*t*3/i.components*i.byteLength;case mn:return s*t*4/i.components*i.byteLength;case hl:return s*t*4/i.components*i.byteLength;case Wr:case Xr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Yr:case qr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case yo:case So:return Math.max(s,16)*Math.max(t,8)/4;case Mo:case bo:return Math.max(s,8)*Math.max(t,8)/2;case wo:case To:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Eo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ao:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ro:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Co:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Po:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Lo:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Do:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Io:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Uo:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case No:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case ko:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Fo:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case zo:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Oo:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Bo:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case $r:case Ho:case Vo:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Ih:case Go:return Math.ceil(s/4)*Math.ceil(t/4)*8;case Wo:case Xo:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vg(s){switch(s){case Wn:case Th:return{byteLength:1,components:1};case Ks:case Eh:case Hn:return{byteLength:2,components:1};case rl:case al:return{byteLength:2,components:4};case Ii:case sl:case En:return{byteLength:4,components:1};case Ah:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function xg(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new et,c=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(E,S){return f?new OffscreenCanvas(E,S):Qr("canvas")}function v(E,S,F){let q=1;const Q=_t(E);if((Q.width>F||Q.height>F)&&(q=F/Math.max(Q.width,Q.height)),q<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const $=Math.floor(q*Q.width),Et=Math.floor(q*Q.height);u===void 0&&(u=m($,Et));const dt=S?m($,Et):u;return dt.width=$,dt.height=Et,dt.getContext("2d").drawImage(E,0,0,$,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+$+"x"+Et+")."),dt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),E;return E}function g(E){return E.generateMipmaps}function p(E){s.generateMipmap(E)}function _(E){return E.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?s.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(E,S,F,q,Q=!1){if(E!==null){if(s[E]!==void 0)return s[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let $=S;if(S===s.RED&&(F===s.FLOAT&&($=s.R32F),F===s.HALF_FLOAT&&($=s.R16F),F===s.UNSIGNED_BYTE&&($=s.R8)),S===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&($=s.R8UI),F===s.UNSIGNED_SHORT&&($=s.R16UI),F===s.UNSIGNED_INT&&($=s.R32UI),F===s.BYTE&&($=s.R8I),F===s.SHORT&&($=s.R16I),F===s.INT&&($=s.R32I)),S===s.RG&&(F===s.FLOAT&&($=s.RG32F),F===s.HALF_FLOAT&&($=s.RG16F),F===s.UNSIGNED_BYTE&&($=s.RG8)),S===s.RG_INTEGER&&(F===s.UNSIGNED_BYTE&&($=s.RG8UI),F===s.UNSIGNED_SHORT&&($=s.RG16UI),F===s.UNSIGNED_INT&&($=s.RG32UI),F===s.BYTE&&($=s.RG8I),F===s.SHORT&&($=s.RG16I),F===s.INT&&($=s.RG32I)),S===s.RGB_INTEGER&&(F===s.UNSIGNED_BYTE&&($=s.RGB8UI),F===s.UNSIGNED_SHORT&&($=s.RGB16UI),F===s.UNSIGNED_INT&&($=s.RGB32UI),F===s.BYTE&&($=s.RGB8I),F===s.SHORT&&($=s.RGB16I),F===s.INT&&($=s.RGB32I)),S===s.RGBA_INTEGER&&(F===s.UNSIGNED_BYTE&&($=s.RGBA8UI),F===s.UNSIGNED_SHORT&&($=s.RGBA16UI),F===s.UNSIGNED_INT&&($=s.RGBA32UI),F===s.BYTE&&($=s.RGBA8I),F===s.SHORT&&($=s.RGBA16I),F===s.INT&&($=s.RGBA32I)),S===s.RGB&&F===s.UNSIGNED_INT_5_9_9_9_REV&&($=s.RGB9_E5),S===s.RGBA){const Et=Q?ha:Zt.getTransfer(q);F===s.FLOAT&&($=s.RGBA32F),F===s.HALF_FLOAT&&($=s.RGBA16F),F===s.UNSIGNED_BYTE&&($=Et===re?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT_4_4_4_4&&($=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&($=s.RGB5_A1)}return($===s.R16F||$===s.R32F||$===s.RG16F||$===s.RG32F||$===s.RGBA16F||$===s.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function x(E,S){let F;return E?S===null||S===Ii||S===Ms?F=s.DEPTH24_STENCIL8:S===En?F=s.DEPTH32F_STENCIL8:S===Ks&&(F=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Ii||S===Ms?F=s.DEPTH_COMPONENT24:S===En?F=s.DEPTH_COMPONENT32F:S===Ks&&(F=s.DEPTH_COMPONENT16),F}function C(E,S){return g(E)===!0||E.isFramebufferTexture&&E.minFilter!==tn&&E.minFilter!==Tn?Math.log2(Math.max(S.width,S.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?S.mipmaps.length:1}function A(E){const S=E.target;S.removeEventListener("dispose",A),I(S),S.isVideoTexture&&c.delete(S)}function R(E){const S=E.target;S.removeEventListener("dispose",R),b(S)}function I(E){const S=n.get(E);if(S.__webglInit===void 0)return;const F=E.source,q=d.get(F);if(q){const Q=q[S.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&w(E),Object.keys(q).length===0&&d.delete(F)}n.remove(E)}function w(E){const S=n.get(E);s.deleteTexture(S.__webglTexture);const F=E.source,q=d.get(F);delete q[S.__cacheKey],a.memory.textures--}function b(E){const S=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(S.__webglFramebuffer[q]))for(let Q=0;Q<S.__webglFramebuffer[q].length;Q++)s.deleteFramebuffer(S.__webglFramebuffer[q][Q]);else s.deleteFramebuffer(S.__webglFramebuffer[q]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[q])}else{if(Array.isArray(S.__webglFramebuffer))for(let q=0;q<S.__webglFramebuffer.length;q++)s.deleteFramebuffer(S.__webglFramebuffer[q]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let q=0;q<S.__webglColorRenderbuffer.length;q++)S.__webglColorRenderbuffer[q]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[q]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const F=E.textures;for(let q=0,Q=F.length;q<Q;q++){const $=n.get(F[q]);$.__webglTexture&&(s.deleteTexture($.__webglTexture),a.memory.textures--),n.remove(F[q])}n.remove(E)}let L=0;function O(){L=0}function z(){const E=L;return E>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),L+=1,E}function G(E){const S=[];return S.push(E.wrapS),S.push(E.wrapT),S.push(E.wrapR||0),S.push(E.magFilter),S.push(E.minFilter),S.push(E.anisotropy),S.push(E.internalFormat),S.push(E.format),S.push(E.type),S.push(E.generateMipmaps),S.push(E.premultiplyAlpha),S.push(E.flipY),S.push(E.unpackAlignment),S.push(E.colorSpace),S.join()}function Y(E,S){const F=n.get(E);if(E.isVideoTexture&&ct(E),E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){const q=E.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(F,E,S);return}}e.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+S)}function W(E,S){const F=n.get(E);if(E.version>0&&F.__version!==E.version){Z(F,E,S);return}e.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+S)}function K(E,S){const F=n.get(E);if(E.version>0&&F.__version!==E.version){Z(F,E,S);return}e.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+S)}function V(E,S){const F=n.get(E);if(E.version>0&&F.__version!==E.version){at(F,E,S);return}e.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+S)}const ht={[_s]:s.REPEAT,[Ci]:s.CLAMP_TO_EDGE,[_o]:s.MIRRORED_REPEAT},xt={[tn]:s.NEAREST,[rd]:s.NEAREST_MIPMAP_NEAREST,[or]:s.NEAREST_MIPMAP_LINEAR,[Tn]:s.LINEAR,[Ma]:s.LINEAR_MIPMAP_NEAREST,[Pi]:s.LINEAR_MIPMAP_LINEAR},wt={[cd]:s.NEVER,[md]:s.ALWAYS,[hd]:s.LESS,[Nh]:s.LEQUAL,[ud]:s.EQUAL,[pd]:s.GEQUAL,[dd]:s.GREATER,[fd]:s.NOTEQUAL};function Bt(E,S){if(S.type===En&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Tn||S.magFilter===Ma||S.magFilter===or||S.magFilter===Pi||S.minFilter===Tn||S.minFilter===Ma||S.minFilter===or||S.minFilter===Pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(E,s.TEXTURE_WRAP_S,ht[S.wrapS]),s.texParameteri(E,s.TEXTURE_WRAP_T,ht[S.wrapT]),(E===s.TEXTURE_3D||E===s.TEXTURE_2D_ARRAY)&&s.texParameteri(E,s.TEXTURE_WRAP_R,ht[S.wrapR]),s.texParameteri(E,s.TEXTURE_MAG_FILTER,xt[S.magFilter]),s.texParameteri(E,s.TEXTURE_MIN_FILTER,xt[S.minFilter]),S.compareFunction&&(s.texParameteri(E,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(E,s.TEXTURE_COMPARE_FUNC,wt[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===tn||S.minFilter!==or&&S.minFilter!==Pi||S.type===En&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");s.texParameterf(E,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function te(E,S){let F=!1;E.__webglInit===void 0&&(E.__webglInit=!0,S.addEventListener("dispose",A));const q=S.source;let Q=d.get(q);Q===void 0&&(Q={},d.set(q,Q));const $=G(S);if($!==E.__cacheKey){Q[$]===void 0&&(Q[$]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Q[$].usedTimes++;const Et=Q[E.__cacheKey];Et!==void 0&&(Q[E.__cacheKey].usedTimes--,Et.usedTimes===0&&w(S)),E.__cacheKey=$,E.__webglTexture=Q[$].texture}return F}function Z(E,S,F){let q=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(q=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(q=s.TEXTURE_3D);const Q=te(E,S),$=S.source;e.bindTexture(q,E.__webglTexture,s.TEXTURE0+F);const Et=n.get($);if($.version!==Et.__version||Q===!0){e.activeTexture(s.TEXTURE0+F);const dt=Zt.getPrimaries(Zt.workingColorSpace),Mt=S.colorSpace===oi?null:Zt.getPrimaries(S.colorSpace),Yt=S.colorSpace===oi||dt===Mt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);let it=v(S.image,!1,i.maxTextureSize);it=Ut(S,it);const bt=r.convert(S.format,S.colorSpace),Nt=r.convert(S.type);let Ft=M(S.internalFormat,bt,Nt,S.colorSpace,S.isVideoTexture);Bt(q,S);let St;const $t=S.mipmaps,Wt=S.isVideoTexture!==!0,ce=Et.__version===void 0||Q===!0,U=$.dataReady,ft=C(S,it);if(S.isDepthTexture)Ft=x(S.format===ys,S.type),ce&&(Wt?e.texStorage2D(s.TEXTURE_2D,1,Ft,it.width,it.height):e.texImage2D(s.TEXTURE_2D,0,Ft,it.width,it.height,0,bt,Nt,null));else if(S.isDataTexture)if($t.length>0){Wt&&ce&&e.texStorage2D(s.TEXTURE_2D,ft,Ft,$t[0].width,$t[0].height);for(let X=0,j=$t.length;X<j;X++)St=$t[X],Wt?U&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,St.width,St.height,bt,Nt,St.data):e.texImage2D(s.TEXTURE_2D,X,Ft,St.width,St.height,0,bt,Nt,St.data);S.generateMipmaps=!1}else Wt?(ce&&e.texStorage2D(s.TEXTURE_2D,ft,Ft,it.width,it.height),U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,it.width,it.height,bt,Nt,it.data)):e.texImage2D(s.TEXTURE_2D,0,Ft,it.width,it.height,0,bt,Nt,it.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Wt&&ce&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,Ft,$t[0].width,$t[0].height,it.depth);for(let X=0,j=$t.length;X<j;X++)if(St=$t[X],S.format!==mn)if(bt!==null)if(Wt){if(U)if(S.layerUpdates.size>0){const vt=Cc(St.width,St.height,S.format,S.type);for(const pt of S.layerUpdates){const Ht=St.data.subarray(pt*vt/St.data.BYTES_PER_ELEMENT,(pt+1)*vt/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,pt,St.width,St.height,1,bt,Ht)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,St.width,St.height,it.depth,bt,St.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,X,Ft,St.width,St.height,it.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Wt?U&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,X,0,0,0,St.width,St.height,it.depth,bt,Nt,St.data):e.texImage3D(s.TEXTURE_2D_ARRAY,X,Ft,St.width,St.height,it.depth,0,bt,Nt,St.data)}else{Wt&&ce&&e.texStorage2D(s.TEXTURE_2D,ft,Ft,$t[0].width,$t[0].height);for(let X=0,j=$t.length;X<j;X++)St=$t[X],S.format!==mn?bt!==null?Wt?U&&e.compressedTexSubImage2D(s.TEXTURE_2D,X,0,0,St.width,St.height,bt,St.data):e.compressedTexImage2D(s.TEXTURE_2D,X,Ft,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?U&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,St.width,St.height,bt,Nt,St.data):e.texImage2D(s.TEXTURE_2D,X,Ft,St.width,St.height,0,bt,Nt,St.data)}else if(S.isDataArrayTexture)if(Wt){if(ce&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ft,Ft,it.width,it.height,it.depth),U)if(S.layerUpdates.size>0){const X=Cc(it.width,it.height,S.format,S.type);for(const j of S.layerUpdates){const vt=it.data.subarray(j*X/it.data.BYTES_PER_ELEMENT,(j+1)*X/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,j,it.width,it.height,1,bt,Nt,vt)}S.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,bt,Nt,it.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,Ft,it.width,it.height,it.depth,0,bt,Nt,it.data);else if(S.isData3DTexture)Wt?(ce&&e.texStorage3D(s.TEXTURE_3D,ft,Ft,it.width,it.height,it.depth),U&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,bt,Nt,it.data)):e.texImage3D(s.TEXTURE_3D,0,Ft,it.width,it.height,it.depth,0,bt,Nt,it.data);else if(S.isFramebufferTexture){if(ce)if(Wt)e.texStorage2D(s.TEXTURE_2D,ft,Ft,it.width,it.height);else{let X=it.width,j=it.height;for(let vt=0;vt<ft;vt++)e.texImage2D(s.TEXTURE_2D,vt,Ft,X,j,0,bt,Nt,null),X>>=1,j>>=1}}else if($t.length>0){if(Wt&&ce){const X=_t($t[0]);e.texStorage2D(s.TEXTURE_2D,ft,Ft,X.width,X.height)}for(let X=0,j=$t.length;X<j;X++)St=$t[X],Wt?U&&e.texSubImage2D(s.TEXTURE_2D,X,0,0,bt,Nt,St):e.texImage2D(s.TEXTURE_2D,X,Ft,bt,Nt,St);S.generateMipmaps=!1}else if(Wt){if(ce){const X=_t(it);e.texStorage2D(s.TEXTURE_2D,ft,Ft,X.width,X.height)}U&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,bt,Nt,it)}else e.texImage2D(s.TEXTURE_2D,0,Ft,bt,Nt,it);g(S)&&p(q),Et.__version=$.version,S.onUpdate&&S.onUpdate(S)}E.__version=S.version}function at(E,S,F){if(S.image.length!==6)return;const q=te(E,S),Q=S.source;e.bindTexture(s.TEXTURE_CUBE_MAP,E.__webglTexture,s.TEXTURE0+F);const $=n.get(Q);if(Q.version!==$.__version||q===!0){e.activeTexture(s.TEXTURE0+F);const Et=Zt.getPrimaries(Zt.workingColorSpace),dt=S.colorSpace===oi?null:Zt.getPrimaries(S.colorSpace),Mt=S.colorSpace===oi||Et===dt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const Yt=S.isCompressedTexture||S.image[0].isCompressedTexture,it=S.image[0]&&S.image[0].isDataTexture,bt=[];for(let j=0;j<6;j++)!Yt&&!it?bt[j]=v(S.image[j],!0,i.maxCubemapSize):bt[j]=it?S.image[j].image:S.image[j],bt[j]=Ut(S,bt[j]);const Nt=bt[0],Ft=r.convert(S.format,S.colorSpace),St=r.convert(S.type),$t=M(S.internalFormat,Ft,St,S.colorSpace),Wt=S.isVideoTexture!==!0,ce=$.__version===void 0||q===!0,U=Q.dataReady;let ft=C(S,Nt);Bt(s.TEXTURE_CUBE_MAP,S);let X;if(Yt){Wt&&ce&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ft,$t,Nt.width,Nt.height);for(let j=0;j<6;j++){X=bt[j].mipmaps;for(let vt=0;vt<X.length;vt++){const pt=X[vt];S.format!==mn?Ft!==null?Wt?U&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt,0,0,pt.width,pt.height,Ft,pt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt,$t,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Wt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt,0,0,pt.width,pt.height,Ft,St,pt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt,$t,pt.width,pt.height,0,Ft,St,pt.data)}}}else{if(X=S.mipmaps,Wt&&ce){X.length>0&&ft++;const j=_t(bt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ft,$t,j.width,j.height)}for(let j=0;j<6;j++)if(it){Wt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,bt[j].width,bt[j].height,Ft,St,bt[j].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,$t,bt[j].width,bt[j].height,0,Ft,St,bt[j].data);for(let vt=0;vt<X.length;vt++){const Ht=X[vt].image[j].image;Wt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt+1,0,0,Ht.width,Ht.height,Ft,St,Ht.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt+1,$t,Ht.width,Ht.height,0,Ft,St,Ht.data)}}else{Wt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ft,St,bt[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,$t,Ft,St,bt[j]);for(let vt=0;vt<X.length;vt++){const pt=X[vt];Wt?U&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt+1,0,0,Ft,St,pt.image[j]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,vt+1,$t,Ft,St,pt.image[j])}}}g(S)&&p(s.TEXTURE_CUBE_MAP),$.__version=Q.version,S.onUpdate&&S.onUpdate(S)}E.__version=S.version}function Tt(E,S,F,q,Q,$){const Et=r.convert(F.format,F.colorSpace),dt=r.convert(F.type),Mt=M(F.internalFormat,Et,dt,F.colorSpace),Yt=n.get(S),it=n.get(F);if(it.__renderTarget=S,!Yt.__hasExternalTextures){const bt=Math.max(1,S.width>>$),Nt=Math.max(1,S.height>>$);Q===s.TEXTURE_3D||Q===s.TEXTURE_2D_ARRAY?e.texImage3D(Q,$,Mt,bt,Nt,S.depth,0,Et,dt,null):e.texImage2D(Q,$,Mt,bt,Nt,0,Et,dt,null)}e.bindFramebuffer(s.FRAMEBUFFER,E),yt(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,q,Q,it.__webglTexture,0,nt(S)):(Q===s.TEXTURE_2D||Q>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,q,Q,it.__webglTexture,$),e.bindFramebuffer(s.FRAMEBUFFER,null)}function lt(E,S,F){if(s.bindRenderbuffer(s.RENDERBUFFER,E),S.depthBuffer){const q=S.depthTexture,Q=q&&q.isDepthTexture?q.type:null,$=x(S.stencilBuffer,Q),Et=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,dt=nt(S);yt(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,dt,$,S.width,S.height):F?s.renderbufferStorageMultisample(s.RENDERBUFFER,dt,$,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,$,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Et,s.RENDERBUFFER,E)}else{const q=S.textures;for(let Q=0;Q<q.length;Q++){const $=q[Q],Et=r.convert($.format,$.colorSpace),dt=r.convert($.type),Mt=M($.internalFormat,Et,dt,$.colorSpace),Yt=nt(S);F&&yt(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Yt,Mt,S.width,S.height):yt(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Yt,Mt,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,Mt,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Dt(E,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,E),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(S.depthTexture);q.__renderTarget=S,(!q.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Y(S.depthTexture,0);const Q=q.__webglTexture,$=nt(S);if(S.depthTexture.format===us)yt(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0);else if(S.depthTexture.format===ys)yt(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function zt(E){const S=n.get(E),F=E.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==E.depthTexture){const q=E.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),q){const Q=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,q.removeEventListener("dispose",Q)};q.addEventListener("dispose",Q),S.__depthDisposeCallback=Q}S.__boundDepthTexture=q}if(E.depthTexture&&!S.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Dt(S.__webglFramebuffer,E)}else if(F){S.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[q]),S.__webglDepthbuffer[q]===void 0)S.__webglDepthbuffer[q]=s.createRenderbuffer(),lt(S.__webglDepthbuffer[q],E,!1);else{const Q=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,$=S.__webglDepthbuffer[q];s.bindRenderbuffer(s.RENDERBUFFER,$),s.framebufferRenderbuffer(s.FRAMEBUFFER,Q,s.RENDERBUFFER,$)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=s.createRenderbuffer(),lt(S.__webglDepthbuffer,E,!1);else{const q=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Q=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Q),s.framebufferRenderbuffer(s.FRAMEBUFFER,q,s.RENDERBUFFER,Q)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function kt(E,S,F){const q=n.get(E);S!==void 0&&Tt(q.__webglFramebuffer,E,E.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&zt(E)}function jt(E){const S=E.texture,F=n.get(E),q=n.get(S);E.addEventListener("dispose",R);const Q=E.textures,$=E.isWebGLCubeRenderTarget===!0,Et=Q.length>1;if(Et||(q.__webglTexture===void 0&&(q.__webglTexture=s.createTexture()),q.__version=S.version,a.memory.textures++),$){F.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer[dt]=[];for(let Mt=0;Mt<S.mipmaps.length;Mt++)F.__webglFramebuffer[dt][Mt]=s.createFramebuffer()}else F.__webglFramebuffer[dt]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){F.__webglFramebuffer=[];for(let dt=0;dt<S.mipmaps.length;dt++)F.__webglFramebuffer[dt]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if(Et)for(let dt=0,Mt=Q.length;dt<Mt;dt++){const Yt=n.get(Q[dt]);Yt.__webglTexture===void 0&&(Yt.__webglTexture=s.createTexture(),a.memory.textures++)}if(E.samples>0&&yt(E)===!1){F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let dt=0;dt<Q.length;dt++){const Mt=Q[dt];F.__webglColorRenderbuffer[dt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[dt]);const Yt=r.convert(Mt.format,Mt.colorSpace),it=r.convert(Mt.type),bt=M(Mt.internalFormat,Yt,it,Mt.colorSpace,E.isXRRenderTarget===!0),Nt=nt(E);s.renderbufferStorageMultisample(s.RENDERBUFFER,Nt,bt,E.width,E.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+dt,s.RENDERBUFFER,F.__webglColorRenderbuffer[dt])}s.bindRenderbuffer(s.RENDERBUFFER,null),E.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),lt(F.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if($){e.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture),Bt(s.TEXTURE_CUBE_MAP,S);for(let dt=0;dt<6;dt++)if(S.mipmaps&&S.mipmaps.length>0)for(let Mt=0;Mt<S.mipmaps.length;Mt++)Tt(F.__webglFramebuffer[dt][Mt],E,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Mt);else Tt(F.__webglFramebuffer[dt],E,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);g(S)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Et){for(let dt=0,Mt=Q.length;dt<Mt;dt++){const Yt=Q[dt],it=n.get(Yt);e.bindTexture(s.TEXTURE_2D,it.__webglTexture),Bt(s.TEXTURE_2D,Yt),Tt(F.__webglFramebuffer,E,Yt,s.COLOR_ATTACHMENT0+dt,s.TEXTURE_2D,0),g(Yt)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let dt=s.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(dt=E.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(dt,q.__webglTexture),Bt(dt,S),S.mipmaps&&S.mipmaps.length>0)for(let Mt=0;Mt<S.mipmaps.length;Mt++)Tt(F.__webglFramebuffer[Mt],E,S,s.COLOR_ATTACHMENT0,dt,Mt);else Tt(F.__webglFramebuffer,E,S,s.COLOR_ATTACHMENT0,dt,0);g(S)&&p(dt),e.unbindTexture()}E.depthBuffer&&zt(E)}function J(E){const S=E.textures;for(let F=0,q=S.length;F<q;F++){const Q=S[F];if(g(Q)){const $=_(E),Et=n.get(Q).__webglTexture;e.bindTexture($,Et),p($),e.unbindTexture()}}}const rt=[],P=[];function Pt(E){if(E.samples>0){if(yt(E)===!1){const S=E.textures,F=E.width,q=E.height;let Q=s.COLOR_BUFFER_BIT;const $=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Et=n.get(E),dt=S.length>1;if(dt)for(let Mt=0;Mt<S.length;Mt++)e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Mt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Mt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let Mt=0;Mt<S.length;Mt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Q|=s.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Q|=s.STENCIL_BUFFER_BIT)),dt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Et.__webglColorRenderbuffer[Mt]);const Yt=n.get(S[Mt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Yt,0)}s.blitFramebuffer(0,0,F,q,0,0,F,q,Q,s.NEAREST),l===!0&&(rt.length=0,P.length=0,rt.push(s.COLOR_ATTACHMENT0+Mt),E.depthBuffer&&E.resolveDepthBuffer===!1&&(rt.push($),P.push($),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,P)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,rt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),dt)for(let Mt=0;Mt<S.length;Mt++){e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Mt,s.RENDERBUFFER,Et.__webglColorRenderbuffer[Mt]);const Yt=n.get(S[Mt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Et.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Mt,s.TEXTURE_2D,Yt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const S=E.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function nt(E){return Math.min(i.maxSamples,E.samples)}function yt(E){const S=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ct(E){const S=a.render.frame;c.get(E)!==S&&(c.set(E,S),E.update())}function Ut(E,S){const F=E.colorSpace,q=E.format,Q=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||F!==Ts&&F!==oi&&(Zt.getTransfer(F)===re?(q!==mn||Q!==Wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),S}function _t(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(h.width=E.naturalWidth||E.width,h.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(h.width=E.displayWidth,h.height=E.displayHeight):(h.width=E.width,h.height=E.height),h}this.allocateTextureUnit=z,this.resetTextureUnits=O,this.setTexture2D=Y,this.setTexture2DArray=W,this.setTexture3D=K,this.setTextureCube=V,this.rebindTextures=kt,this.setupRenderTarget=jt,this.updateRenderTargetMipmap=J,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=zt,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=yt}function _g(s,t){function e(n,i=oi){let r;const a=Zt.getTransfer(i);if(n===Wn)return s.UNSIGNED_BYTE;if(n===rl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===al)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Ah)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Th)return s.BYTE;if(n===Eh)return s.SHORT;if(n===Ks)return s.UNSIGNED_SHORT;if(n===sl)return s.INT;if(n===Ii)return s.UNSIGNED_INT;if(n===En)return s.FLOAT;if(n===Hn)return s.HALF_FLOAT;if(n===Rh)return s.ALPHA;if(n===Ch)return s.RGB;if(n===mn)return s.RGBA;if(n===Ph)return s.LUMINANCE;if(n===Lh)return s.LUMINANCE_ALPHA;if(n===us)return s.DEPTH_COMPONENT;if(n===ys)return s.DEPTH_STENCIL;if(n===ol)return s.RED;if(n===ll)return s.RED_INTEGER;if(n===Dh)return s.RG;if(n===cl)return s.RG_INTEGER;if(n===hl)return s.RGBA_INTEGER;if(n===Wr||n===Xr||n===Yr||n===qr)if(a===re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Wr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Wr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Yr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===qr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Mo||n===yo||n===bo||n===So)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Mo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===yo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===bo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===So)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===wo||n===To||n===Eo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===wo||n===To)return a===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Eo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ao||n===Ro||n===Co||n===Po||n===Lo||n===Do||n===Io||n===Uo||n===No||n===ko||n===Fo||n===zo||n===Oo||n===Bo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ao)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ro)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Co)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Po)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Lo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Do)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Io)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Uo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===No)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ko)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Fo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===zo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Oo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Bo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===$r||n===Ho||n===Vo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===$r)return a===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ho)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Vo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ih||n===Go||n===Wo||n===Xo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===$r)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Go)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Wo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ms?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class Mg extends ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ze extends ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const yg={type:"move"};class Za{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ze,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ze,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ze,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){a=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),p=this._getHandJoint(h,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const c=h.joints["index-finger-tip"],u=h.joints["thumb-tip"],d=c.position.distanceTo(u.position),f=.02,m=.005;h.inputState.pinching&&d>f+m?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&d<=f-m&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(yg)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ze;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const bg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Sg=`
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

}`;class wg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Oe,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ge({vertexShader:bg,fragmentShader:Sg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new It(new gn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Tg extends Es{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,h=null,c=null,u=null,d=null,f=null,m=null;const v=new wg,g=e.getContextAttributes();let p=null,_=null;const M=[],x=[],C=new et;let A=null;const R=new ke;R.viewport=new oe;const I=new ke;I.viewport=new oe;const w=[R,I],b=new Mg;let L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let at=M[Z];return at===void 0&&(at=new Za,M[Z]=at),at.getTargetRaySpace()},this.getControllerGrip=function(Z){let at=M[Z];return at===void 0&&(at=new Za,M[Z]=at),at.getGripSpace()},this.getHand=function(Z){let at=M[Z];return at===void 0&&(at=new Za,M[Z]=at),at.getHandSpace()};function z(Z){const at=x.indexOf(Z.inputSource);if(at===-1)return;const Tt=M[at];Tt!==void 0&&(Tt.update(Z.inputSource,Z.frame,h||a),Tt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function G(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",Y);for(let Z=0;Z<M.length;Z++){const at=x[Z];at!==null&&(x[Z]=null,M[Z].disconnect(at))}L=null,O=null,v.reset(),t.setRenderTarget(p),f=null,d=null,u=null,i=null,_=null,te.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function(Z){h=Z},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",G),i.addEventListener("inputsourceschange",Y),g.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(C),i.renderState.layers===void 0){const at={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,at),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new vn(f.framebufferWidth,f.framebufferHeight,{format:mn,type:Wn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let at=null,Tt=null,lt=null;g.depth&&(lt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,at=g.stencil?ys:us,Tt=g.stencil?Ms:Ii);const Dt={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:r};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(Dt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new vn(d.textureWidth,d.textureHeight,{format:mn,type:Wn,depthTexture:new $h(d.textureWidth,d.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,at),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),h=null,a=await i.requestReferenceSpace(o),te.setContext(i),te.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function Y(Z){for(let at=0;at<Z.removed.length;at++){const Tt=Z.removed[at],lt=x.indexOf(Tt);lt>=0&&(x[lt]=null,M[lt].disconnect(Tt))}for(let at=0;at<Z.added.length;at++){const Tt=Z.added[at];let lt=x.indexOf(Tt);if(lt===-1){for(let zt=0;zt<M.length;zt++)if(zt>=x.length){x.push(Tt),lt=zt;break}else if(x[zt]===null){x[zt]=Tt,lt=zt;break}if(lt===-1)break}const Dt=M[lt];Dt&&Dt.connect(Tt)}}const W=new D,K=new D;function V(Z,at,Tt){W.setFromMatrixPosition(at.matrixWorld),K.setFromMatrixPosition(Tt.matrixWorld);const lt=W.distanceTo(K),Dt=at.projectionMatrix.elements,zt=Tt.projectionMatrix.elements,kt=Dt[14]/(Dt[10]-1),jt=Dt[14]/(Dt[10]+1),J=(Dt[9]+1)/Dt[5],rt=(Dt[9]-1)/Dt[5],P=(Dt[8]-1)/Dt[0],Pt=(zt[8]+1)/zt[0],nt=kt*P,yt=kt*Pt,ct=lt/(-P+Pt),Ut=ct*-P;if(at.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ut),Z.translateZ(ct),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Dt[10]===-1)Z.projectionMatrix.copy(at.projectionMatrix),Z.projectionMatrixInverse.copy(at.projectionMatrixInverse);else{const _t=kt+ct,E=jt+ct,S=nt-Ut,F=yt+(lt-Ut),q=J*jt/E*_t,Q=rt*jt/E*_t;Z.projectionMatrix.makePerspective(S,F,q,Q,_t,E),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function ht(Z,at){at===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(at.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let at=Z.near,Tt=Z.far;v.texture!==null&&(v.depthNear>0&&(at=v.depthNear),v.depthFar>0&&(Tt=v.depthFar)),b.near=I.near=R.near=at,b.far=I.far=R.far=Tt,(L!==b.near||O!==b.far)&&(i.updateRenderState({depthNear:b.near,depthFar:b.far}),L=b.near,O=b.far),R.layers.mask=Z.layers.mask|2,I.layers.mask=Z.layers.mask|4,b.layers.mask=R.layers.mask|I.layers.mask;const lt=Z.parent,Dt=b.cameras;ht(b,lt);for(let zt=0;zt<Dt.length;zt++)ht(Dt[zt],lt);Dt.length===2?V(b,R,I):b.projectionMatrix.copy(R.projectionMatrix),xt(Z,b,lt)};function xt(Z,at,Tt){Tt===null?Z.matrix.copy(at.matrixWorld):(Z.matrix.copy(Tt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(at.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(at.projectionMatrix),Z.projectionMatrixInverse.copy(at.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Jr*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Z){l=Z,d!==null&&(d.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(b)};let wt=null;function Bt(Z,at){if(c=at.getViewerPose(h||a),m=at,c!==null){const Tt=c.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let lt=!1;Tt.length!==b.cameras.length&&(b.cameras.length=0,lt=!0);for(let zt=0;zt<Tt.length;zt++){const kt=Tt[zt];let jt=null;if(f!==null)jt=f.getViewport(kt);else{const rt=u.getViewSubImage(d,kt);jt=rt.viewport,zt===0&&(t.setRenderTargetTextures(_,rt.colorTexture,d.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(_))}let J=w[zt];J===void 0&&(J=new ke,J.layers.enable(zt),J.viewport=new oe,w[zt]=J),J.matrix.fromArray(kt.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(kt.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(jt.x,jt.y,jt.width,jt.height),zt===0&&(b.matrix.copy(J.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),lt===!0&&b.cameras.push(J)}const Dt=i.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")){const zt=u.getDepthInformation(Tt[0]);zt&&zt.isValid&&zt.texture&&v.init(t,zt,i.renderState)}}for(let Tt=0;Tt<M.length;Tt++){const lt=x[Tt],Dt=M[Tt];lt!==null&&Dt!==void 0&&Dt.update(lt,at,h||a)}wt&&wt(Z,at),at.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:at}),m=null}const te=new qh;te.setAnimationLoop(Bt),this.setAnimationLoop=function(Z){wt=Z},this.dispose=function(){}}}const yi=new An,Eg=new ie;function Ag(s,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Wh(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,_,M,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),c(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,x)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),v(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,_,M):p.isSpriteMaterial?h(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===we&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===we&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const _=t.get(p),M=_.envMap,x=_.envMapRotation;M&&(g.envMap.value=M,yi.copy(x),yi.x*=-1,yi.y*=-1,yi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(yi.y*=-1,yi.z*=-1),g.envMapRotation.value.setFromMatrix4(Eg.makeRotationFromEuler(yi)),g.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,_,M){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*_,g.scale.value=M*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,_){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===we&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const _=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Rg(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,M){const x=M.program;n.uniformBlockBinding(_,x)}function h(_,M){let x=i[_.id];x===void 0&&(m(_),x=c(_),i[_.id]=x,_.addEventListener("dispose",g));const C=M.program;n.updateUBOMapping(_,C);const A=t.render.frame;r[_.id]!==A&&(d(_),r[_.id]=A)}function c(_){const M=u();_.__bindingPointIndex=M;const x=s.createBuffer(),C=_.__size,A=_.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,C,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,x),x}function u(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){const M=i[_.id],x=_.uniforms,C=_.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let A=0,R=x.length;A<R;A++){const I=Array.isArray(x[A])?x[A]:[x[A]];for(let w=0,b=I.length;w<b;w++){const L=I[w];if(f(L,A,w,C)===!0){const O=L.__offset,z=Array.isArray(L.value)?L.value:[L.value];let G=0;for(let Y=0;Y<z.length;Y++){const W=z[Y],K=v(W);typeof W=="number"||typeof W=="boolean"?(L.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,O+G,L.__data)):W.isMatrix3?(L.__data[0]=W.elements[0],L.__data[1]=W.elements[1],L.__data[2]=W.elements[2],L.__data[3]=0,L.__data[4]=W.elements[3],L.__data[5]=W.elements[4],L.__data[6]=W.elements[5],L.__data[7]=0,L.__data[8]=W.elements[6],L.__data[9]=W.elements[7],L.__data[10]=W.elements[8],L.__data[11]=0):(W.toArray(L.__data,G),G+=K.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,O,L.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(_,M,x,C){const A=_.value,R=M+"_"+x;if(C[R]===void 0)return typeof A=="number"||typeof A=="boolean"?C[R]=A:C[R]=A.clone(),!0;{const I=C[R];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return C[R]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function m(_){const M=_.uniforms;let x=0;const C=16;for(let R=0,I=M.length;R<I;R++){const w=Array.isArray(M[R])?M[R]:[M[R]];for(let b=0,L=w.length;b<L;b++){const O=w[b],z=Array.isArray(O.value)?O.value:[O.value];for(let G=0,Y=z.length;G<Y;G++){const W=z[G],K=v(W),V=x%C,ht=V%K.boundary,xt=V+ht;x+=ht,xt!==0&&C-xt<K.storage&&(x+=C-xt),O.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=K.storage}}}const A=x%C;return A>0&&(x+=C-A),_.__size=x,_.__cache={},this}function v(_){const M={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(M.boundary=4,M.storage=4):_.isVector2?(M.boundary=8,M.storage=8):_.isVector3||_.isColor?(M.boundary=16,M.storage=12):_.isVector4?(M.boundary=16,M.storage=16):_.isMatrix3?(M.boundary=48,M.storage=48):_.isMatrix4?(M.boundary=64,M.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),M}function g(_){const M=_.target;M.removeEventListener("dispose",g);const x=a.indexOf(M.__bindingPointIndex);a.splice(x,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function p(){for(const _ in i)s.deleteBuffer(i[_]);a=[],i={},r={}}return{bind:l,update:h,dispose:p}}class Cg{constructor(t={}){const{canvas:e=vd(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,p=null;const _=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ge,this.toneMapping=di,this.toneMappingExposure=1;const x=this;let C=!1,A=0,R=0,I=null,w=-1,b=null;const L=new oe,O=new oe;let z=null;const G=new gt(0);let Y=0,W=e.width,K=e.height,V=1,ht=null,xt=null;const wt=new oe(0,0,W,K),Bt=new oe(0,0,W,K);let te=!1;const Z=new ul;let at=!1,Tt=!1;const lt=new ie,Dt=new ie,zt=new D,kt=new oe,jt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let J=!1;function rt(){return I===null?V:1}let P=n;function Pt(T,N){return e.getContext(T,N)}try{const T={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${nl}`),e.addEventListener("webglcontextlost",j,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",pt,!1),P===null){const N="webgl2";if(P=Pt(N,T),P===null)throw Pt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let nt,yt,ct,Ut,_t,E,S,F,q,Q,$,Et,dt,Mt,Yt,it,bt,Nt,Ft,St,$t,Wt,ce,U;function ft(){nt=new Um(P),nt.init(),Wt=new _g(P,nt),yt=new Rm(P,nt,t,Wt),ct=new gg(P,nt),yt.reverseDepthBuffer&&d&&ct.buffers.depth.setReversed(!0),Ut=new Fm(P),_t=new eg,E=new xg(P,nt,ct,_t,yt,Wt,Ut),S=new Pm(x),F=new Im(x),q=new Gd(P),ce=new Em(P,q),Q=new Nm(P,q,Ut,ce),$=new Om(P,Q,q,Ut),Ft=new zm(P,yt,E),it=new Cm(_t),Et=new tg(x,S,F,nt,yt,ce,it),dt=new Ag(x,_t),Mt=new ig,Yt=new cg(nt),Nt=new Tm(x,S,F,ct,$,f,l),bt=new pg(x,$,yt),U=new Rg(P,Ut,yt,ct),St=new Am(P,nt,Ut),$t=new km(P,nt,Ut),Ut.programs=Et.programs,x.capabilities=yt,x.extensions=nt,x.properties=_t,x.renderLists=Mt,x.shadowMap=bt,x.state=ct,x.info=Ut}ft();const X=new Tg(x,P);this.xr=X,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const T=nt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=nt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(T){T!==void 0&&(V=T,this.setSize(W,K,!1))},this.getSize=function(T){return T.set(W,K)},this.setSize=function(T,N,B=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=T,K=N,e.width=Math.floor(T*V),e.height=Math.floor(N*V),B===!0&&(e.style.width=T+"px",e.style.height=N+"px"),this.setViewport(0,0,T,N)},this.getDrawingBufferSize=function(T){return T.set(W*V,K*V).floor()},this.setDrawingBufferSize=function(T,N,B){W=T,K=N,V=B,e.width=Math.floor(T*B),e.height=Math.floor(N*B),this.setViewport(0,0,T,N)},this.getCurrentViewport=function(T){return T.copy(L)},this.getViewport=function(T){return T.copy(wt)},this.setViewport=function(T,N,B,H){T.isVector4?wt.set(T.x,T.y,T.z,T.w):wt.set(T,N,B,H),ct.viewport(L.copy(wt).multiplyScalar(V).round())},this.getScissor=function(T){return T.copy(Bt)},this.setScissor=function(T,N,B,H){T.isVector4?Bt.set(T.x,T.y,T.z,T.w):Bt.set(T,N,B,H),ct.scissor(O.copy(Bt).multiplyScalar(V).round())},this.getScissorTest=function(){return te},this.setScissorTest=function(T){ct.setScissorTest(te=T)},this.setOpaqueSort=function(T){ht=T},this.setTransparentSort=function(T){xt=T},this.getClearColor=function(T){return T.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor.apply(Nt,arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha.apply(Nt,arguments)},this.clear=function(T=!0,N=!0,B=!0){let H=0;if(T){let k=!1;if(I!==null){const ot=I.texture.format;k=ot===hl||ot===cl||ot===ll}if(k){const ot=I.texture.type,mt=ot===Wn||ot===Ii||ot===Ks||ot===Ms||ot===rl||ot===al,At=Nt.getClearColor(),Rt=Nt.getClearAlpha(),Ot=At.r,Vt=At.g,Ct=At.b;mt?(m[0]=Ot,m[1]=Vt,m[2]=Ct,m[3]=Rt,P.clearBufferuiv(P.COLOR,0,m)):(v[0]=Ot,v[1]=Vt,v[2]=Ct,v[3]=Rt,P.clearBufferiv(P.COLOR,0,v))}else H|=P.COLOR_BUFFER_BIT}N&&(H|=P.DEPTH_BUFFER_BIT),B&&(H|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",j,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),Mt.dispose(),Yt.dispose(),_t.dispose(),S.dispose(),F.dispose(),$.dispose(),ce.dispose(),U.dispose(),Et.dispose(),X.dispose(),X.removeEventListener("sessionstart",Al),X.removeEventListener("sessionend",Rl),mi.stop()};function j(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const T=Ut.autoReset,N=bt.enabled,B=bt.autoUpdate,H=bt.needsUpdate,k=bt.type;ft(),Ut.autoReset=T,bt.enabled=N,bt.autoUpdate=B,bt.needsUpdate=H,bt.type=k}function pt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ht(T){const N=T.target;N.removeEventListener("dispose",Ht),pe(N)}function pe(T){Le(T),_t.remove(T)}function Le(T){const N=_t.get(T).programs;N!==void 0&&(N.forEach(function(B){Et.releaseProgram(B)}),T.isShaderMaterial&&Et.releaseShaderCache(T))}this.renderBufferDirect=function(T,N,B,H,k,ot){N===null&&(N=jt);const mt=k.isMesh&&k.matrixWorld.determinant()<0,At=Lu(T,N,B,H,k);ct.setMaterial(H,mt);let Rt=B.index,Ot=1;if(H.wireframe===!0){if(Rt=Q.getWireframeAttribute(B),Rt===void 0)return;Ot=2}const Vt=B.drawRange,Ct=B.attributes.position;let Kt=Vt.start*Ot,he=(Vt.start+Vt.count)*Ot;ot!==null&&(Kt=Math.max(Kt,ot.start*Ot),he=Math.min(he,(ot.start+ot.count)*Ot)),Rt!==null?(Kt=Math.max(Kt,0),he=Math.min(he,Rt.count)):Ct!=null&&(Kt=Math.max(Kt,0),he=Math.min(he,Ct.count));const ue=he-Kt;if(ue<0||ue===1/0)return;ce.setup(k,H,At,B,Rt);let Xe,ee=St;if(Rt!==null&&(Xe=q.get(Rt),ee=$t,ee.setIndex(Xe)),k.isMesh)H.wireframe===!0?(ct.setLineWidth(H.wireframeLinewidth*rt()),ee.setMode(P.LINES)):ee.setMode(P.TRIANGLES);else if(k.isLine){let Lt=H.linewidth;Lt===void 0&&(Lt=1),ct.setLineWidth(Lt*rt()),k.isLineSegments?ee.setMode(P.LINES):k.isLineLoop?ee.setMode(P.LINE_LOOP):ee.setMode(P.LINE_STRIP)}else k.isPoints?ee.setMode(P.POINTS):k.isSprite&&ee.setMode(P.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)ee.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(nt.get("WEBGL_multi_draw"))ee.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Lt=k._multiDrawStarts,Pn=k._multiDrawCounts,ne=k._multiDrawCount,un=Rt?q.get(Rt).bytesPerElement:1,zi=_t.get(H).currentProgram.getUniforms();for(let je=0;je<ne;je++)zi.setValue(P,"_gl_DrawID",je),ee.render(Lt[je]/un,Pn[je])}else if(k.isInstancedMesh)ee.renderInstances(Kt,ue,k.count);else if(B.isInstancedBufferGeometry){const Lt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Pn=Math.min(B.instanceCount,Lt);ee.renderInstances(Kt,ue,Pn)}else ee.render(Kt,ue)};function se(T,N,B){T.transparent===!0&&T.side===qe&&T.forceSinglePass===!1?(T.side=we,T.needsUpdate=!0,ar(T,N,B),T.side=fi,T.needsUpdate=!0,ar(T,N,B),T.side=qe):ar(T,N,B)}this.compile=function(T,N,B=null){B===null&&(B=T),p=Yt.get(B),p.init(N),M.push(p),B.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),T!==B&&T.traverseVisible(function(k){k.isLight&&k.layers.test(N.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();const H=new Set;return T.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const ot=k.material;if(ot)if(Array.isArray(ot))for(let mt=0;mt<ot.length;mt++){const At=ot[mt];se(At,B,k),H.add(At)}else se(ot,B,k),H.add(ot)}),M.pop(),p=null,H},this.compileAsync=function(T,N,B=null){const H=this.compile(T,N,B);return new Promise(k=>{function ot(){if(H.forEach(function(mt){_t.get(mt).currentProgram.isReady()&&H.delete(mt)}),H.size===0){k(T);return}setTimeout(ot,10)}nt.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let hn=null;function Cn(T){hn&&hn(T)}function Al(){mi.stop()}function Rl(){mi.start()}const mi=new qh;mi.setAnimationLoop(Cn),typeof self<"u"&&mi.setContext(self),this.setAnimationLoop=function(T){hn=T,X.setAnimationLoop(T),T===null?mi.stop():mi.start()},X.addEventListener("sessionstart",Al),X.addEventListener("sessionend",Rl),this.render=function(T,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(N),N=X.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,N,I),p=Yt.get(T,M.length),p.init(N),M.push(p),Dt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Z.setFromProjectionMatrix(Dt),Tt=this.localClippingEnabled,at=it.init(this.clippingPlanes,Tt),g=Mt.get(T,_.length),g.init(),_.push(g),X.enabled===!0&&X.isPresenting===!0){const ot=x.xr.getDepthSensingMesh();ot!==null&&_a(ot,N,-1/0,x.sortObjects)}_a(T,N,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(ht,xt),J=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,J&&Nt.addToRenderList(g,T),this.info.render.frame++,at===!0&&it.beginShadows();const B=p.state.shadowsArray;bt.render(B,T,N),at===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=g.opaque,k=g.transmissive;if(p.setupLights(),N.isArrayCamera){const ot=N.cameras;if(k.length>0)for(let mt=0,At=ot.length;mt<At;mt++){const Rt=ot[mt];Pl(H,k,T,Rt)}J&&Nt.render(T);for(let mt=0,At=ot.length;mt<At;mt++){const Rt=ot[mt];Cl(g,T,Rt,Rt.viewport)}}else k.length>0&&Pl(H,k,T,N),J&&Nt.render(T),Cl(g,T,N);I!==null&&(E.updateMultisampleRenderTarget(I),E.updateRenderTargetMipmap(I)),T.isScene===!0&&T.onAfterRender(x,T,N),ce.resetDefaultState(),w=-1,b=null,M.pop(),M.length>0?(p=M[M.length-1],at===!0&&it.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,_.pop(),_.length>0?g=_[_.length-1]:g=null};function _a(T,N,B,H){if(T.visible===!1)return;if(T.layers.test(N.layers)){if(T.isGroup)B=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(N);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Z.intersectsSprite(T)){H&&kt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Dt);const mt=$.update(T),At=T.material;At.visible&&g.push(T,mt,At,B,kt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Z.intersectsObject(T))){const mt=$.update(T),At=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),kt.copy(T.boundingSphere.center)):(mt.boundingSphere===null&&mt.computeBoundingSphere(),kt.copy(mt.boundingSphere.center)),kt.applyMatrix4(T.matrixWorld).applyMatrix4(Dt)),Array.isArray(At)){const Rt=mt.groups;for(let Ot=0,Vt=Rt.length;Ot<Vt;Ot++){const Ct=Rt[Ot],Kt=At[Ct.materialIndex];Kt&&Kt.visible&&g.push(T,mt,Kt,B,kt.z,Ct)}}else At.visible&&g.push(T,mt,At,B,kt.z,null)}}const ot=T.children;for(let mt=0,At=ot.length;mt<At;mt++)_a(ot[mt],N,B,H)}function Cl(T,N,B,H){const k=T.opaque,ot=T.transmissive,mt=T.transparent;p.setupLightsView(B),at===!0&&it.setGlobalState(x.clippingPlanes,B),H&&ct.viewport(L.copy(H)),k.length>0&&rr(k,N,B),ot.length>0&&rr(ot,N,B),mt.length>0&&rr(mt,N,B),ct.buffers.depth.setTest(!0),ct.buffers.depth.setMask(!0),ct.buffers.color.setMask(!0),ct.setPolygonOffset(!1)}function Pl(T,N,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new vn(1,1,{generateMipmaps:!0,type:nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float")?Hn:Wn,minFilter:Pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Zt.workingColorSpace}));const ot=p.state.transmissionRenderTarget[H.id],mt=H.viewport||L;ot.setSize(mt.z,mt.w);const At=x.getRenderTarget();x.setRenderTarget(ot),x.getClearColor(G),Y=x.getClearAlpha(),Y<1&&x.setClearColor(16777215,.5),x.clear(),J&&Nt.render(B);const Rt=x.toneMapping;x.toneMapping=di;const Ot=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),at===!0&&it.setGlobalState(x.clippingPlanes,H),rr(T,B,H),E.updateMultisampleRenderTarget(ot),E.updateRenderTargetMipmap(ot),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let Ct=0,Kt=N.length;Ct<Kt;Ct++){const he=N[Ct],ue=he.object,Xe=he.geometry,ee=he.material,Lt=he.group;if(ee.side===qe&&ue.layers.test(H.layers)){const Pn=ee.side;ee.side=we,ee.needsUpdate=!0,Ll(ue,B,H,Xe,ee,Lt),ee.side=Pn,ee.needsUpdate=!0,Vt=!0}}Vt===!0&&(E.updateMultisampleRenderTarget(ot),E.updateRenderTargetMipmap(ot))}x.setRenderTarget(At),x.setClearColor(G,Y),Ot!==void 0&&(H.viewport=Ot),x.toneMapping=Rt}function rr(T,N,B){const H=N.isScene===!0?N.overrideMaterial:null;for(let k=0,ot=T.length;k<ot;k++){const mt=T[k],At=mt.object,Rt=mt.geometry,Ot=H===null?mt.material:H,Vt=mt.group;At.layers.test(B.layers)&&Ll(At,N,B,Rt,Ot,Vt)}}function Ll(T,N,B,H,k,ot){T.onBeforeRender(x,N,B,H,k,ot),T.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),k.onBeforeRender(x,N,B,H,T,ot),k.transparent===!0&&k.side===qe&&k.forceSinglePass===!1?(k.side=we,k.needsUpdate=!0,x.renderBufferDirect(B,N,H,k,T,ot),k.side=fi,k.needsUpdate=!0,x.renderBufferDirect(B,N,H,k,T,ot),k.side=qe):x.renderBufferDirect(B,N,H,k,T,ot),T.onAfterRender(x,N,B,H,k,ot)}function ar(T,N,B){N.isScene!==!0&&(N=jt);const H=_t.get(T),k=p.state.lights,ot=p.state.shadowsArray,mt=k.state.version,At=Et.getParameters(T,k.state,ot,N,B),Rt=Et.getProgramCacheKey(At);let Ot=H.programs;H.environment=T.isMeshStandardMaterial?N.environment:null,H.fog=N.fog,H.envMap=(T.isMeshStandardMaterial?F:S).get(T.envMap||H.environment),H.envMapRotation=H.environment!==null&&T.envMap===null?N.environmentRotation:T.envMapRotation,Ot===void 0&&(T.addEventListener("dispose",Ht),Ot=new Map,H.programs=Ot);let Vt=Ot.get(Rt);if(Vt!==void 0){if(H.currentProgram===Vt&&H.lightsStateVersion===mt)return Il(T,At),Vt}else At.uniforms=Et.getUniforms(T),T.onBeforeCompile(At,x),Vt=Et.acquireProgram(At,Rt),Ot.set(Rt,Vt),H.uniforms=At.uniforms;const Ct=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ct.clippingPlanes=it.uniform),Il(T,At),H.needsLights=Iu(T),H.lightsStateVersion=mt,H.needsLights&&(Ct.ambientLightColor.value=k.state.ambient,Ct.lightProbe.value=k.state.probe,Ct.directionalLights.value=k.state.directional,Ct.directionalLightShadows.value=k.state.directionalShadow,Ct.spotLights.value=k.state.spot,Ct.spotLightShadows.value=k.state.spotShadow,Ct.rectAreaLights.value=k.state.rectArea,Ct.ltc_1.value=k.state.rectAreaLTC1,Ct.ltc_2.value=k.state.rectAreaLTC2,Ct.pointLights.value=k.state.point,Ct.pointLightShadows.value=k.state.pointShadow,Ct.hemisphereLights.value=k.state.hemi,Ct.directionalShadowMap.value=k.state.directionalShadowMap,Ct.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ct.spotShadowMap.value=k.state.spotShadowMap,Ct.spotLightMatrix.value=k.state.spotLightMatrix,Ct.spotLightMap.value=k.state.spotLightMap,Ct.pointShadowMap.value=k.state.pointShadowMap,Ct.pointShadowMatrix.value=k.state.pointShadowMatrix),H.currentProgram=Vt,H.uniformsList=null,Vt}function Dl(T){if(T.uniformsList===null){const N=T.currentProgram.getUniforms();T.uniformsList=Zr.seqWithValue(N.seq,T.uniforms)}return T.uniformsList}function Il(T,N){const B=_t.get(T);B.outputColorSpace=N.outputColorSpace,B.batching=N.batching,B.batchingColor=N.batchingColor,B.instancing=N.instancing,B.instancingColor=N.instancingColor,B.instancingMorph=N.instancingMorph,B.skinning=N.skinning,B.morphTargets=N.morphTargets,B.morphNormals=N.morphNormals,B.morphColors=N.morphColors,B.morphTargetsCount=N.morphTargetsCount,B.numClippingPlanes=N.numClippingPlanes,B.numIntersection=N.numClipIntersection,B.vertexAlphas=N.vertexAlphas,B.vertexTangents=N.vertexTangents,B.toneMapping=N.toneMapping}function Lu(T,N,B,H,k){N.isScene!==!0&&(N=jt),E.resetTextureUnits();const ot=N.fog,mt=H.isMeshStandardMaterial?N.environment:null,At=I===null?x.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Ts,Rt=(H.isMeshStandardMaterial?F:S).get(H.envMap||mt),Ot=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Vt=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ct=!!B.morphAttributes.position,Kt=!!B.morphAttributes.normal,he=!!B.morphAttributes.color;let ue=di;H.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ue=x.toneMapping);const Xe=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ee=Xe!==void 0?Xe.length:0,Lt=_t.get(H),Pn=p.state.lights;if(at===!0&&(Tt===!0||T!==b)){const en=T===b&&H.id===w;it.setState(H,T,en)}let ne=!1;H.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==Pn.state.version||Lt.outputColorSpace!==At||k.isBatchedMesh&&Lt.batching===!1||!k.isBatchedMesh&&Lt.batching===!0||k.isBatchedMesh&&Lt.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Lt.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Lt.instancing===!1||!k.isInstancedMesh&&Lt.instancing===!0||k.isSkinnedMesh&&Lt.skinning===!1||!k.isSkinnedMesh&&Lt.skinning===!0||k.isInstancedMesh&&Lt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Lt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Lt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Lt.instancingMorph===!1&&k.morphTexture!==null||Lt.envMap!==Rt||H.fog===!0&&Lt.fog!==ot||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==it.numPlanes||Lt.numIntersection!==it.numIntersection)||Lt.vertexAlphas!==Ot||Lt.vertexTangents!==Vt||Lt.morphTargets!==Ct||Lt.morphNormals!==Kt||Lt.morphColors!==he||Lt.toneMapping!==ue||Lt.morphTargetsCount!==ee)&&(ne=!0):(ne=!0,Lt.__version=H.version);let un=Lt.currentProgram;ne===!0&&(un=ar(H,N,k));let zi=!1,je=!1,Ps=!1;const de=un.getUniforms(),xn=Lt.uniforms;if(ct.useProgram(un.program)&&(zi=!0,je=!0,Ps=!0),H.id!==w&&(w=H.id,je=!0),zi||b!==T){ct.buffers.depth.getReversed()?(lt.copy(T.projectionMatrix),_d(lt),Md(lt),de.setValue(P,"projectionMatrix",lt)):de.setValue(P,"projectionMatrix",T.projectionMatrix),de.setValue(P,"viewMatrix",T.matrixWorldInverse);const qn=de.map.cameraPosition;qn!==void 0&&qn.setValue(P,zt.setFromMatrixPosition(T.matrixWorld)),yt.logarithmicDepthBuffer&&de.setValue(P,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&de.setValue(P,"isOrthographic",T.isOrthographicCamera===!0),b!==T&&(b=T,je=!0,Ps=!0)}if(k.isSkinnedMesh){de.setOptional(P,k,"bindMatrix"),de.setOptional(P,k,"bindMatrixInverse");const en=k.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),de.setValue(P,"boneTexture",en.boneTexture,E))}k.isBatchedMesh&&(de.setOptional(P,k,"batchingTexture"),de.setValue(P,"batchingTexture",k._matricesTexture,E),de.setOptional(P,k,"batchingIdTexture"),de.setValue(P,"batchingIdTexture",k._indirectTexture,E),de.setOptional(P,k,"batchingColorTexture"),k._colorsTexture!==null&&de.setValue(P,"batchingColorTexture",k._colorsTexture,E));const Ls=B.morphAttributes;if((Ls.position!==void 0||Ls.normal!==void 0||Ls.color!==void 0)&&Ft.update(k,B,un),(je||Lt.receiveShadow!==k.receiveShadow)&&(Lt.receiveShadow=k.receiveShadow,de.setValue(P,"receiveShadow",k.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(xn.envMap.value=Rt,xn.flipEnvMap.value=Rt.isCubeTexture&&Rt.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&N.environment!==null&&(xn.envMapIntensity.value=N.environmentIntensity),je&&(de.setValue(P,"toneMappingExposure",x.toneMappingExposure),Lt.needsLights&&Du(xn,Ps),ot&&H.fog===!0&&dt.refreshFogUniforms(xn,ot),dt.refreshMaterialUniforms(xn,H,V,K,p.state.transmissionRenderTarget[T.id]),Zr.upload(P,Dl(Lt),xn,E)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Zr.upload(P,Dl(Lt),xn,E),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&de.setValue(P,"center",k.center),de.setValue(P,"modelViewMatrix",k.modelViewMatrix),de.setValue(P,"normalMatrix",k.normalMatrix),de.setValue(P,"modelMatrix",k.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const en=H.uniformsGroups;for(let qn=0,$n=en.length;qn<$n;qn++){const Ul=en[qn];U.update(Ul,un),U.bind(Ul,un)}}return un}function Du(T,N){T.ambientLightColor.needsUpdate=N,T.lightProbe.needsUpdate=N,T.directionalLights.needsUpdate=N,T.directionalLightShadows.needsUpdate=N,T.pointLights.needsUpdate=N,T.pointLightShadows.needsUpdate=N,T.spotLights.needsUpdate=N,T.spotLightShadows.needsUpdate=N,T.rectAreaLights.needsUpdate=N,T.hemisphereLights.needsUpdate=N}function Iu(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(T,N,B){_t.get(T.texture).__webglTexture=N,_t.get(T.depthTexture).__webglTexture=B;const H=_t.get(T);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=B===void 0,H.__autoAllocateDepthBuffer||nt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,N){const B=_t.get(T);B.__webglFramebuffer=N,B.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(T,N=0,B=0){I=T,A=N,R=B;let H=!0,k=null,ot=!1,mt=!1;if(T){const Rt=_t.get(T);if(Rt.__useDefaultFramebuffer!==void 0)ct.bindFramebuffer(P.FRAMEBUFFER,null),H=!1;else if(Rt.__webglFramebuffer===void 0)E.setupRenderTarget(T);else if(Rt.__hasExternalTextures)E.rebindTextures(T,_t.get(T.texture).__webglTexture,_t.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ct=T.depthTexture;if(Rt.__boundDepthTexture!==Ct){if(Ct!==null&&_t.has(Ct)&&(T.width!==Ct.image.width||T.height!==Ct.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(T)}}const Ot=T.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(mt=!0);const Vt=_t.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Vt[N])?k=Vt[N][B]:k=Vt[N],ot=!0):T.samples>0&&E.useMultisampledRTT(T)===!1?k=_t.get(T).__webglMultisampledFramebuffer:Array.isArray(Vt)?k=Vt[B]:k=Vt,L.copy(T.viewport),O.copy(T.scissor),z=T.scissorTest}else L.copy(wt).multiplyScalar(V).floor(),O.copy(Bt).multiplyScalar(V).floor(),z=te;if(ct.bindFramebuffer(P.FRAMEBUFFER,k)&&H&&ct.drawBuffers(T,k),ct.viewport(L),ct.scissor(O),ct.setScissorTest(z),ot){const Rt=_t.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,Rt.__webglTexture,B)}else if(mt){const Rt=_t.get(T.texture),Ot=N||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Rt.__webglTexture,B||0,Ot)}w=-1},this.readRenderTargetPixels=function(T,N,B,H,k,ot,mt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let At=_t.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&mt!==void 0&&(At=At[mt]),At){ct.bindFramebuffer(P.FRAMEBUFFER,At);try{const Rt=T.texture,Ot=Rt.format,Vt=Rt.type;if(!yt.textureFormatReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!yt.textureTypeReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=T.width-H&&B>=0&&B<=T.height-k&&P.readPixels(N,B,H,k,Wt.convert(Ot),Wt.convert(Vt),ot)}finally{const Rt=I!==null?_t.get(I).__webglFramebuffer:null;ct.bindFramebuffer(P.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(T,N,B,H,k,ot,mt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let At=_t.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&mt!==void 0&&(At=At[mt]),At){const Rt=T.texture,Ot=Rt.format,Vt=Rt.type;if(!yt.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!yt.textureTypeReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=T.width-H&&B>=0&&B<=T.height-k){ct.bindFramebuffer(P.FRAMEBUFFER,At);const Ct=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Ct),P.bufferData(P.PIXEL_PACK_BUFFER,ot.byteLength,P.STREAM_READ),P.readPixels(N,B,H,k,Wt.convert(Ot),Wt.convert(Vt),0);const Kt=I!==null?_t.get(I).__webglFramebuffer:null;ct.bindFramebuffer(P.FRAMEBUFFER,Kt);const he=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await xd(P,he,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Ct),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ot),P.deleteBuffer(Ct),P.deleteSync(he),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,N=null,B=0){T.isTexture!==!0&&(Gs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,T=arguments[1]);const H=Math.pow(2,-B),k=Math.floor(T.image.width*H),ot=Math.floor(T.image.height*H),mt=N!==null?N.x:0,At=N!==null?N.y:0;E.setTexture2D(T,0),P.copyTexSubImage2D(P.TEXTURE_2D,B,0,0,mt,At,k,ot),ct.unbindTexture()},this.copyTextureToTexture=function(T,N,B=null,H=null,k=0){T.isTexture!==!0&&(Gs("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,T=arguments[1],N=arguments[2],k=arguments[3]||0,B=null);let ot,mt,At,Rt,Ot,Vt,Ct,Kt,he;const ue=T.isCompressedTexture?T.mipmaps[k]:T.image;B!==null?(ot=B.max.x-B.min.x,mt=B.max.y-B.min.y,At=B.isBox3?B.max.z-B.min.z:1,Rt=B.min.x,Ot=B.min.y,Vt=B.isBox3?B.min.z:0):(ot=ue.width,mt=ue.height,At=ue.depth||1,Rt=0,Ot=0,Vt=0),H!==null?(Ct=H.x,Kt=H.y,he=H.z):(Ct=0,Kt=0,he=0);const Xe=Wt.convert(N.format),ee=Wt.convert(N.type);let Lt;N.isData3DTexture?(E.setTexture3D(N,0),Lt=P.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(E.setTexture2DArray(N,0),Lt=P.TEXTURE_2D_ARRAY):(E.setTexture2D(N,0),Lt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const Pn=P.getParameter(P.UNPACK_ROW_LENGTH),ne=P.getParameter(P.UNPACK_IMAGE_HEIGHT),un=P.getParameter(P.UNPACK_SKIP_PIXELS),zi=P.getParameter(P.UNPACK_SKIP_ROWS),je=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ue.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ue.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Rt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ot),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Vt);const Ps=T.isDataArrayTexture||T.isData3DTexture,de=N.isDataArrayTexture||N.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const xn=_t.get(T),Ls=_t.get(N),en=_t.get(xn.__renderTarget),qn=_t.get(Ls.__renderTarget);ct.bindFramebuffer(P.READ_FRAMEBUFFER,en.__webglFramebuffer),ct.bindFramebuffer(P.DRAW_FRAMEBUFFER,qn.__webglFramebuffer);for(let $n=0;$n<At;$n++)Ps&&P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_t.get(T).__webglTexture,k,Vt+$n),T.isDepthTexture?(de&&P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_t.get(N).__webglTexture,k,he+$n),P.blitFramebuffer(Rt,Ot,ot,mt,Ct,Kt,ot,mt,P.DEPTH_BUFFER_BIT,P.NEAREST)):de?P.copyTexSubImage3D(Lt,k,Ct,Kt,he+$n,Rt,Ot,ot,mt):P.copyTexSubImage2D(Lt,k,Ct,Kt,he+$n,Rt,Ot,ot,mt);ct.bindFramebuffer(P.READ_FRAMEBUFFER,null),ct.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else de?T.isDataTexture||T.isData3DTexture?P.texSubImage3D(Lt,k,Ct,Kt,he,ot,mt,At,Xe,ee,ue.data):N.isCompressedArrayTexture?P.compressedTexSubImage3D(Lt,k,Ct,Kt,he,ot,mt,At,Xe,ue.data):P.texSubImage3D(Lt,k,Ct,Kt,he,ot,mt,At,Xe,ee,ue):T.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,k,Ct,Kt,ot,mt,Xe,ee,ue.data):T.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,k,Ct,Kt,ue.width,ue.height,Xe,ue.data):P.texSubImage2D(P.TEXTURE_2D,k,Ct,Kt,ot,mt,Xe,ee,ue);P.pixelStorei(P.UNPACK_ROW_LENGTH,Pn),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ne),P.pixelStorei(P.UNPACK_SKIP_PIXELS,un),P.pixelStorei(P.UNPACK_SKIP_ROWS,zi),P.pixelStorei(P.UNPACK_SKIP_IMAGES,je),k===0&&N.generateMipmaps&&P.generateMipmap(Lt),ct.unbindTexture()},this.copyTextureToTexture3D=function(T,N,B=null,H=null,k=0){return T.isTexture!==!0&&(Gs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,H=arguments[1]||null,T=arguments[2],N=arguments[3],k=arguments[4]||0),Gs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,N,B,H,k)},this.initRenderTarget=function(T){_t.get(T).__webglFramebuffer===void 0&&E.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?E.setTextureCube(T,0):T.isData3DTexture?E.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?E.setTexture2DArray(T,0):E.setTexture2D(T,0),ct.unbindTexture()},this.resetState=function(){A=0,R=0,I=null,ct.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Zt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Zt._getUnpackColorSpace()}}class da{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new gt(t),this.density=e}clone(){return new da(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ta extends ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new An,this.environmentIntensity=1,this.environmentRotation=new An,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Pg{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Yo,this.updateRanges=[],this.version=0,this.uuid=Vn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Vn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Be=new D;class ea{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=wn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=wn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=wn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=wn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=wn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),i=ae(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),i=ae(i,this.array),r=ae(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Pe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ea(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Di extends Fi{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new gt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Qi;const ks=new D,ts=new D,es=new D,ns=new et,Fs=new et,Qh=new ie,Rr=new D,zs=new D,Cr=new D,Pc=new et,ja=new et,Lc=new et;class fs extends ve{constructor(t=new Di){if(super(),this.isSprite=!0,this.type="Sprite",Qi===void 0){Qi=new ye;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Pg(e,5);Qi.setIndex([0,1,2,0,2,3]),Qi.setAttribute("position",new ea(n,3,0,!1)),Qi.setAttribute("uv",new ea(n,2,3,!1))}this.geometry=Qi,this.material=t,this.center=new et(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ts.setFromMatrixScale(this.matrixWorld),Qh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),es.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ts.multiplyScalar(-es.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Pr(Rr.set(-.5,-.5,0),es,a,ts,i,r),Pr(zs.set(.5,-.5,0),es,a,ts,i,r),Pr(Cr.set(.5,.5,0),es,a,ts,i,r),Pc.set(0,0),ja.set(1,0),Lc.set(1,1);let o=t.ray.intersectTriangle(Rr,zs,Cr,!1,ks);if(o===null&&(Pr(zs.set(-.5,.5,0),es,a,ts,i,r),ja.set(0,1),o=t.ray.intersectTriangle(Rr,Cr,zs,!1,ks),o===null))return;const l=t.ray.origin.distanceTo(ks);l<t.near||l>t.far||e.push({distance:l,point:ks.clone(),uv:on.getInterpolation(ks,Rr,zs,Cr,Pc,ja,Lc,new et),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Pr(s,t,e,n,i,r){ns.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(Fs.x=r*ns.x-i*ns.y,Fs.y=i*ns.x+r*ns.y):Fs.copy(ns),s.copy(t),s.x+=Fs.x,s.y+=Fs.y,s.applyMatrix4(Qh)}class Lg extends Oe{constructor(t=null,e=1,n=1,i,r,a,o,l,h=tn,c=tn,u,d){super(null,a,o,l,h,c,i,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Dc extends Pe{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const is=new ie,Ic=new ie,Lr=[],Uc=new Ni,Dg=new ie,Os=new It,Bs=new ki;class Nc extends It{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Dc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Dg)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ni),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,is),Uc.copy(t.boundingBox).applyMatrix4(is),this.boundingBox.union(Uc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ki),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,is),Bs.copy(t.boundingSphere).applyMatrix4(is),this.boundingSphere.union(Bs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Os.geometry=this.geometry,Os.material=this.material,Os.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bs.copy(this.boundingSphere),Bs.applyMatrix4(n),t.ray.intersectsSphere(Bs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,is),Ic.multiplyMatrices(n,is),Os.matrixWorld=Ic,Os.raycast(t,Lr);for(let a=0,o=Lr.length;a<o;a++){const l=Lr[a];l.instanceId=r,l.object=this,e.push(l)}Lr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Dc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Lg(new Float32Array(i*this.count),i,this.count,ol,En));const r=this.morphTexture.source.data.data;let a=0;for(let h=0;h<n.length;h++)a+=n[h];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Ig extends Fi{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new gt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const kc=new ie,Zo=new Oh,Dr=new ki,Ir=new D;class Ug extends ve{constructor(t=new ye,e=new Ig){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Dr.copy(n.boundingSphere),Dr.applyMatrix4(i),Dr.radius+=r,t.ray.intersectsSphere(Dr)===!1)return;kc.copy(i).invert(),Zo.copy(t.ray).applyMatrix4(kc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,h=n.index,u=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let m=d,v=f;m<v;m++){const g=h.getX(m);Ir.fromBufferAttribute(u,g),Fc(Ir,g,l,i,t,e,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let m=d,v=f;m<v;m++)Ir.fromBufferAttribute(u,m),Fc(Ir,m,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Fc(s,t,e,n,i,r,a){const o=Zo.distanceSqToPoint(s);if(o<e){const l=new D;Zo.closestPointToPoint(s,l),l.applyMatrix4(n);const h=i.ray.origin.distanceTo(l);if(h<i.near||h>i.far)return;r.push({distance:h,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class tu extends Oe{constructor(t,e,n,i,r,a,o,l,h){super(t,e,n,i,r,a,o,l,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Rn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,h;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),h=n[i]-a,h<0)o=i+1;else if(h>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const c=n[i],d=n[i+1]-c,f=(a-c)/d;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new et:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new D,i=[],r=[],a=[],o=new D,l=new ie;for(let f=0;f<=t;f++){const m=f/t;i[f]=this.getTangentAt(m,new D)}r[0]=new D,a[0]=new D;let h=Number.MAX_VALUE;const c=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);c<=h&&(h=c,n.set(1,0,0)),u<=h&&(h=u,n.set(0,1,0)),d<=h&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(Ne(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Ne(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(i[m],f*m)),a[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class pl extends Rn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new et){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),h=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const c=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=h-this.aY;l=d*c-f*u+this.aX,h=d*u+f*c+this.aY}return n.set(l,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Ng extends pl{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ml(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,h){i(a,o,h*(o-r),h*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,h,c,u){let d=(a-r)/h-(o-r)/(h+c)+(o-a)/c,f=(o-a)/c-(l-a)/(c+u)+(l-o)/u;d*=c,f*=c,i(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const Ur=new D,Ka=new ml,Ja=new ml,Qa=new ml;class kg extends Rn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new D){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let h,c;this.closed||o>0?h=i[(o-1)%r]:(Ur.subVectors(i[0],i[1]).add(i[0]),h=Ur);const u=i[o%r],d=i[(o+1)%r];if(this.closed||o+2<r?c=i[(o+2)%r]:(Ur.subVectors(i[r-1],i[r-2]).add(i[r-1]),c=Ur),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(h.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(c),f);v<1e-4&&(v=1),m<1e-4&&(m=v),g<1e-4&&(g=v),Ka.initNonuniformCatmullRom(h.x,u.x,d.x,c.x,m,v,g),Ja.initNonuniformCatmullRom(h.y,u.y,d.y,c.y,m,v,g),Qa.initNonuniformCatmullRom(h.z,u.z,d.z,c.z,m,v,g)}else this.curveType==="catmullrom"&&(Ka.initCatmullRom(h.x,u.x,d.x,c.x,this.tension),Ja.initCatmullRom(h.y,u.y,d.y,c.y,this.tension),Qa.initCatmullRom(h.z,u.z,d.z,c.z,this.tension));return n.set(Ka.calc(l),Ja.calc(l),Qa.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new D().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function zc(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function Fg(s,t){const e=1-s;return e*e*t}function zg(s,t){return 2*(1-s)*s*t}function Og(s,t){return s*s*t}function qs(s,t,e,n){return Fg(s,t)+zg(s,e)+Og(s,n)}function Bg(s,t){const e=1-s;return e*e*e*t}function Hg(s,t){const e=1-s;return 3*e*e*s*t}function Vg(s,t){return 3*(1-s)*s*s*t}function Gg(s,t){return s*s*s*t}function $s(s,t,e,n,i){return Bg(s,t)+Hg(s,e)+Vg(s,n)+Gg(s,i)}class eu extends Rn{constructor(t=new et,e=new et,n=new et,i=new et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new et){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set($s(t,i.x,r.x,a.x,o.x),$s(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Wg extends Rn{constructor(t=new D,e=new D,n=new D,i=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new D){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set($s(t,i.x,r.x,a.x,o.x),$s(t,i.y,r.y,a.y,o.y),$s(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class nu extends Rn{constructor(t=new et,e=new et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new et){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Xg extends Rn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class iu extends Rn{constructor(t=new et,e=new et,n=new et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new et){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(qs(t,i.x,r.x,a.x),qs(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Yg extends Rn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(qs(t,i.x,r.x,a.x),qs(t,i.y,r.y,a.y),qs(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class su extends Rn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new et){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],h=i[a],c=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(zc(o,l.x,h.x,c.x,u.x),zc(o,l.y,h.y,c.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new et().fromArray(i))}return this}}var jo=Object.freeze({__proto__:null,ArcCurve:Ng,CatmullRomCurve3:kg,CubicBezierCurve:eu,CubicBezierCurve3:Wg,EllipseCurve:pl,LineCurve:nu,LineCurve3:Xg,QuadraticBezierCurve:iu,QuadraticBezierCurve3:Yg,SplineCurve:su});class qg extends Rn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new jo[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const a=i[r]-n,o=this.curves[r],l=o.getLength(),h=l===0?0:1-a/l;return o.getPointAt(h,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const a=r[i],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let h=0;h<l.length;h++){const c=l[h];n&&n.equals(c)||(e.push(c),n=c)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new jo[i.type]().fromJSON(i))}return this}}class Oc extends qg{constructor(t){super(),this.type="Path",this.currentPoint=new et,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new nu(this.currentPoint.clone(),new et(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new iu(this.currentPoint.clone(),new et(t,e),new et(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,a){const o=new eu(this.currentPoint.clone(),new et(t,e),new et(n,i),new et(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new su(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,i,r,a),this}absarc(t,e,n,i,r,a){return this.absellipse(t,e,n,n,i,r,a),this}ellipse(t,e,n,i,r,a,o,l){const h=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(t+h,e+c,n,i,r,a,o,l),this}absellipse(t,e,n,i,r,a,o,l){const h=new pl(t,e,n,i,r,a,o,l);if(this.curves.length>0){const u=h.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(h);const c=h.getPoint(1);return this.currentPoint.copy(c),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class gl extends ye{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],h=new D,c=new et;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;h.x=t*Math.cos(f),h.y=t*Math.sin(f),a.push(h.x,h.y,h.z),o.push(0,0,1),c.x=(a[d]/t+1)/2,c.y=(a[d+1]/t+1)/2,l.push(c.x,c.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Jt(a,3)),this.setAttribute("normal",new Jt(o,3)),this.setAttribute("uv",new Jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class $e extends ye{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const h=this;i=Math.floor(i),r=Math.floor(r);const c=[],u=[],d=[],f=[];let m=0;const v=[],g=n/2;let p=0;_(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(c),this.setAttribute("position",new Jt(u,3)),this.setAttribute("normal",new Jt(d,3)),this.setAttribute("uv",new Jt(f,2));function _(){const x=new D,C=new D;let A=0;const R=(e-t)/n;for(let I=0;I<=r;I++){const w=[],b=I/r,L=b*(e-t)+t;for(let O=0;O<=i;O++){const z=O/i,G=z*l+o,Y=Math.sin(G),W=Math.cos(G);C.x=L*Y,C.y=-b*n+g,C.z=L*W,u.push(C.x,C.y,C.z),x.set(Y,R,W).normalize(),d.push(x.x,x.y,x.z),f.push(z,1-b),w.push(m++)}v.push(w)}for(let I=0;I<i;I++)for(let w=0;w<r;w++){const b=v[w][I],L=v[w+1][I],O=v[w+1][I+1],z=v[w][I+1];(t>0||w!==0)&&(c.push(b,L,z),A+=3),(e>0||w!==r-1)&&(c.push(L,O,z),A+=3)}h.addGroup(p,A,0),p+=A}function M(x){const C=m,A=new et,R=new D;let I=0;const w=x===!0?t:e,b=x===!0?1:-1;for(let O=1;O<=i;O++)u.push(0,g*b,0),d.push(0,b,0),f.push(.5,.5),m++;const L=m;for(let O=0;O<=i;O++){const G=O/i*l+o,Y=Math.cos(G),W=Math.sin(G);R.x=w*W,R.y=g*b,R.z=w*Y,u.push(R.x,R.y,R.z),d.push(0,b,0),A.x=Y*.5+.5,A.y=W*.5*b+.5,f.push(A.x,A.y),m++}for(let O=0;O<i;O++){const z=C+O,G=L+O;x===!0?c.push(G,G+1,z):c.push(G+1,G,z),I+=3}h.addGroup(p,I,x===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class vl extends $e{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new vl(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class xl extends ye{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],a=[];o(i),h(n),c(),this.setAttribute("position",new Jt(r,3)),this.setAttribute("normal",new Jt(r.slice(),3)),this.setAttribute("uv",new Jt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(_){const M=new D,x=new D,C=new D;for(let A=0;A<e.length;A+=3)f(e[A+0],M),f(e[A+1],x),f(e[A+2],C),l(M,x,C,_)}function l(_,M,x,C){const A=C+1,R=[];for(let I=0;I<=A;I++){R[I]=[];const w=_.clone().lerp(x,I/A),b=M.clone().lerp(x,I/A),L=A-I;for(let O=0;O<=L;O++)O===0&&I===A?R[I][O]=w:R[I][O]=w.clone().lerp(b,O/L)}for(let I=0;I<A;I++)for(let w=0;w<2*(A-I)-1;w++){const b=Math.floor(w/2);w%2===0?(d(R[I][b+1]),d(R[I+1][b]),d(R[I][b])):(d(R[I][b+1]),d(R[I+1][b+1]),d(R[I+1][b]))}}function h(_){const M=new D;for(let x=0;x<r.length;x+=3)M.x=r[x+0],M.y=r[x+1],M.z=r[x+2],M.normalize().multiplyScalar(_),r[x+0]=M.x,r[x+1]=M.y,r[x+2]=M.z}function c(){const _=new D;for(let M=0;M<r.length;M+=3){_.x=r[M+0],_.y=r[M+1],_.z=r[M+2];const x=g(_)/2/Math.PI+.5,C=p(_)/Math.PI+.5;a.push(x,1-C)}m(),u()}function u(){for(let _=0;_<a.length;_+=6){const M=a[_+0],x=a[_+2],C=a[_+4],A=Math.max(M,x,C),R=Math.min(M,x,C);A>.9&&R<.1&&(M<.2&&(a[_+0]+=1),x<.2&&(a[_+2]+=1),C<.2&&(a[_+4]+=1))}}function d(_){r.push(_.x,_.y,_.z)}function f(_,M){const x=_*3;M.x=t[x+0],M.y=t[x+1],M.z=t[x+2]}function m(){const _=new D,M=new D,x=new D,C=new D,A=new et,R=new et,I=new et;for(let w=0,b=0;w<r.length;w+=9,b+=6){_.set(r[w+0],r[w+1],r[w+2]),M.set(r[w+3],r[w+4],r[w+5]),x.set(r[w+6],r[w+7],r[w+8]),A.set(a[b+0],a[b+1]),R.set(a[b+2],a[b+3]),I.set(a[b+4],a[b+5]),C.copy(_).add(M).add(x).divideScalar(3);const L=g(C);v(A,b+0,_,L),v(R,b+2,M,L),v(I,b+4,x,L)}}function v(_,M,x,C){C<0&&_.x===1&&(a[M]=_.x-1),x.x===0&&x.z===0&&(a[M]=C/2/Math.PI+.5)}function g(_){return Math.atan2(_.z,-_.x)}function p(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xl(t.vertices,t.indices,t.radius,t.details)}}class ru extends Oc{constructor(t){super(t),this.uuid=Vn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new Oc().fromJSON(i))}return this}}const $g={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=au(s,0,i,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,h,c,u,d,f;if(n&&(r=Qg(s,t,r,e)),s.length>80*e){o=h=s[0],l=c=s[1];for(let m=e;m<i;m+=e)u=s[m],d=s[m+1],u<o&&(o=u),d<l&&(l=d),u>h&&(h=u),d>c&&(c=d);f=Math.max(h-o,c-l),f=f!==0?32767/f:0}return Qs(r,a,e,o,l,f,0),a}};function au(s,t,e,n,i){let r,a;if(i===hv(s,t,e,n)>0)for(r=t;r<e;r+=n)a=Bc(r,s[r],s[r+1],a);else for(r=e-n;r>=t;r-=n)a=Bc(r,s[r],s[r+1],a);return a&&fa(a,a.next)&&(er(a),a=a.next),a}function Ui(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(fa(e,e.next)||fe(e.prev,e,e.next)===0)){if(er(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Qs(s,t,e,n,i,r,a){if(!s)return;!a&&r&&sv(s,n,i,r);let o=s,l,h;for(;s.prev!==s.next;){if(l=s.prev,h=s.next,r?jg(s,n,i,r):Zg(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(h.i/e|0),er(s),s=h.next,o=h.next;continue}if(s=h,s===o){a?a===1?(s=Kg(Ui(s),t,e),Qs(s,t,e,n,i,r,2)):a===2&&Jg(s,t,e,n,i,r):Qs(Ui(s),t,e,n,i,r,1);break}}}function Zg(s){const t=s.prev,e=s,n=s.next;if(fe(t,e,n)>=0)return!1;const i=t.x,r=e.x,a=n.x,o=t.y,l=e.y,h=n.y,c=i<r?i<a?i:a:r<a?r:a,u=o<l?o<h?o:h:l<h?l:h,d=i>r?i>a?i:a:r>a?r:a,f=o>l?o>h?o:h:l>h?l:h;let m=n.next;for(;m!==t;){if(m.x>=c&&m.x<=d&&m.y>=u&&m.y<=f&&hs(i,o,r,l,a,h,m.x,m.y)&&fe(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function jg(s,t,e,n){const i=s.prev,r=s,a=s.next;if(fe(i,r,a)>=0)return!1;const o=i.x,l=r.x,h=a.x,c=i.y,u=r.y,d=a.y,f=o<l?o<h?o:h:l<h?l:h,m=c<u?c<d?c:d:u<d?u:d,v=o>l?o>h?o:h:l>h?l:h,g=c>u?c>d?c:d:u>d?u:d,p=Ko(f,m,t,e,n),_=Ko(v,g,t,e,n);let M=s.prevZ,x=s.nextZ;for(;M&&M.z>=p&&x&&x.z<=_;){if(M.x>=f&&M.x<=v&&M.y>=m&&M.y<=g&&M!==i&&M!==a&&hs(o,c,l,u,h,d,M.x,M.y)&&fe(M.prev,M,M.next)>=0||(M=M.prevZ,x.x>=f&&x.x<=v&&x.y>=m&&x.y<=g&&x!==i&&x!==a&&hs(o,c,l,u,h,d,x.x,x.y)&&fe(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;M&&M.z>=p;){if(M.x>=f&&M.x<=v&&M.y>=m&&M.y<=g&&M!==i&&M!==a&&hs(o,c,l,u,h,d,M.x,M.y)&&fe(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;x&&x.z<=_;){if(x.x>=f&&x.x<=v&&x.y>=m&&x.y<=g&&x!==i&&x!==a&&hs(o,c,l,u,h,d,x.x,x.y)&&fe(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Kg(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!fa(i,r)&&ou(i,n,n.next,r)&&tr(i,r)&&tr(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),er(n),er(n.next),n=s=r),n=n.next}while(n!==s);return Ui(n)}function Jg(s,t,e,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&ov(a,o)){let l=lu(a,o);a=Ui(a,a.next),l=Ui(l,l.next),Qs(a,t,e,n,i,r,0),Qs(l,t,e,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function Qg(s,t,e,n){const i=[];let r,a,o,l,h;for(r=0,a=t.length;r<a;r++)o=t[r]*n,l=r<a-1?t[r+1]*n:s.length,h=au(s,o,l,n,!1),h===h.next&&(h.steiner=!0),i.push(av(h));for(i.sort(tv),r=0;r<i.length;r++)e=ev(i[r],e);return e}function tv(s,t){return s.x-t.x}function ev(s,t){const e=nv(s,t);if(!e)return t;const n=lu(e,s);return Ui(n,n.next),Ui(e,e.next)}function nv(s,t){let e=t,n=-1/0,i;const r=s.x,a=s.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const d=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===r))return i}e=e.next}while(e!==t);if(!i)return null;const o=i,l=i.x,h=i.y;let c=1/0,u;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&hs(a<h?r:n,a,l,h,a<h?n:r,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(r-e.x),tr(e,s)&&(u<c||u===c&&(e.x>i.x||e.x===i.x&&iv(i,e)))&&(i=e,c=u)),e=e.next;while(e!==o);return i}function iv(s,t){return fe(s.prev,s,t.prev)<0&&fe(t.next,s,s.next)<0}function sv(s,t,e,n){let i=s;do i.z===0&&(i.z=Ko(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,rv(i)}function rv(s){let t,e,n,i,r,a,o,l,h=1;do{for(e=s,s=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<h&&(o++,n=n.nextZ,!!n);t++);for(l=h;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,o--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,h*=2}while(a>1);return s}function Ko(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function av(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function hs(s,t,e,n,i,r,a,o){return(i-a)*(t-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(i-a)*(n-o)}function ov(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!lv(s,t)&&(tr(s,t)&&tr(t,s)&&cv(s,t)&&(fe(s.prev,s,t.prev)||fe(s,t.prev,t))||fa(s,t)&&fe(s.prev,s,s.next)>0&&fe(t.prev,t,t.next)>0)}function fe(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function fa(s,t){return s.x===t.x&&s.y===t.y}function ou(s,t,e,n){const i=kr(fe(s,t,e)),r=kr(fe(s,t,n)),a=kr(fe(e,n,s)),o=kr(fe(e,n,t));return!!(i!==r&&a!==o||i===0&&Nr(s,e,t)||r===0&&Nr(s,n,t)||a===0&&Nr(e,s,n)||o===0&&Nr(e,t,n))}function Nr(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function kr(s){return s>0?1:s<0?-1:0}function lv(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&ou(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function tr(s,t){return fe(s.prev,s,s.next)<0?fe(s,t,s.next)>=0&&fe(s,s.prev,t)>=0:fe(s,t,s.prev)<0||fe(s,s.next,t)<0}function cv(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function lu(s,t){const e=new Jo(s.i,s.x,s.y),n=new Jo(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Bc(s,t,e,n){const i=new Jo(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function er(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Jo(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function hv(s,t,e,n){let i=0;for(let r=t,a=e-n;r<e;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}class Zs{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Zs.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];Hc(t),Vc(n,t);let a=t.length;e.forEach(Hc);for(let l=0;l<e.length;l++)i.push(a),a+=e[l].length,Vc(n,e[l]);const o=$g.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Hc(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Vc(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class _l extends ye{constructor(t=new ru([new et(.5,.5),new et(-.5,.5),new et(-.5,-.5),new et(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let o=0,l=t.length;o<l;o++){const h=t[o];a(h)}this.setAttribute("position",new Jt(i,3)),this.setAttribute("uv",new Jt(r,2)),this.computeVertexNormals();function a(o){const l=[],h=e.curveSegments!==void 0?e.curveSegments:12,c=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,_=e.UVGenerator!==void 0?e.UVGenerator:uv;let M,x=!1,C,A,R,I;p&&(M=p.getSpacedPoints(c),x=!0,d=!1,C=p.computeFrenetFrames(c,!1),A=new D,R=new D,I=new D),d||(g=0,f=0,m=0,v=0);const w=o.extractPoints(h);let b=w.shape;const L=w.holes;if(!Zs.isClockWise(b)){b=b.reverse();for(let J=0,rt=L.length;J<rt;J++){const P=L[J];Zs.isClockWise(P)&&(L[J]=P.reverse())}}const z=Zs.triangulateShape(b,L),G=b;for(let J=0,rt=L.length;J<rt;J++){const P=L[J];b=b.concat(P)}function Y(J,rt,P){return rt||console.error("THREE.ExtrudeGeometry: vec does not exist"),J.clone().addScaledVector(rt,P)}const W=b.length,K=z.length;function V(J,rt,P){let Pt,nt,yt;const ct=J.x-rt.x,Ut=J.y-rt.y,_t=P.x-J.x,E=P.y-J.y,S=ct*ct+Ut*Ut,F=ct*E-Ut*_t;if(Math.abs(F)>Number.EPSILON){const q=Math.sqrt(S),Q=Math.sqrt(_t*_t+E*E),$=rt.x-Ut/q,Et=rt.y+ct/q,dt=P.x-E/Q,Mt=P.y+_t/Q,Yt=((dt-$)*E-(Mt-Et)*_t)/(ct*E-Ut*_t);Pt=$+ct*Yt-J.x,nt=Et+Ut*Yt-J.y;const it=Pt*Pt+nt*nt;if(it<=2)return new et(Pt,nt);yt=Math.sqrt(it/2)}else{let q=!1;ct>Number.EPSILON?_t>Number.EPSILON&&(q=!0):ct<-Number.EPSILON?_t<-Number.EPSILON&&(q=!0):Math.sign(Ut)===Math.sign(E)&&(q=!0),q?(Pt=-Ut,nt=ct,yt=Math.sqrt(S)):(Pt=ct,nt=Ut,yt=Math.sqrt(S/2))}return new et(Pt/yt,nt/yt)}const ht=[];for(let J=0,rt=G.length,P=rt-1,Pt=J+1;J<rt;J++,P++,Pt++)P===rt&&(P=0),Pt===rt&&(Pt=0),ht[J]=V(G[J],G[P],G[Pt]);const xt=[];let wt,Bt=ht.concat();for(let J=0,rt=L.length;J<rt;J++){const P=L[J];wt=[];for(let Pt=0,nt=P.length,yt=nt-1,ct=Pt+1;Pt<nt;Pt++,yt++,ct++)yt===nt&&(yt=0),ct===nt&&(ct=0),wt[Pt]=V(P[Pt],P[yt],P[ct]);xt.push(wt),Bt=Bt.concat(wt)}for(let J=0;J<g;J++){const rt=J/g,P=f*Math.cos(rt*Math.PI/2),Pt=m*Math.sin(rt*Math.PI/2)+v;for(let nt=0,yt=G.length;nt<yt;nt++){const ct=Y(G[nt],ht[nt],Pt);lt(ct.x,ct.y,-P)}for(let nt=0,yt=L.length;nt<yt;nt++){const ct=L[nt];wt=xt[nt];for(let Ut=0,_t=ct.length;Ut<_t;Ut++){const E=Y(ct[Ut],wt[Ut],Pt);lt(E.x,E.y,-P)}}}const te=m+v;for(let J=0;J<W;J++){const rt=d?Y(b[J],Bt[J],te):b[J];x?(R.copy(C.normals[0]).multiplyScalar(rt.x),A.copy(C.binormals[0]).multiplyScalar(rt.y),I.copy(M[0]).add(R).add(A),lt(I.x,I.y,I.z)):lt(rt.x,rt.y,0)}for(let J=1;J<=c;J++)for(let rt=0;rt<W;rt++){const P=d?Y(b[rt],Bt[rt],te):b[rt];x?(R.copy(C.normals[J]).multiplyScalar(P.x),A.copy(C.binormals[J]).multiplyScalar(P.y),I.copy(M[J]).add(R).add(A),lt(I.x,I.y,I.z)):lt(P.x,P.y,u/c*J)}for(let J=g-1;J>=0;J--){const rt=J/g,P=f*Math.cos(rt*Math.PI/2),Pt=m*Math.sin(rt*Math.PI/2)+v;for(let nt=0,yt=G.length;nt<yt;nt++){const ct=Y(G[nt],ht[nt],Pt);lt(ct.x,ct.y,u+P)}for(let nt=0,yt=L.length;nt<yt;nt++){const ct=L[nt];wt=xt[nt];for(let Ut=0,_t=ct.length;Ut<_t;Ut++){const E=Y(ct[Ut],wt[Ut],Pt);x?lt(E.x,E.y+M[c-1].y,M[c-1].x+P):lt(E.x,E.y,u+P)}}}Z(),at();function Z(){const J=i.length/3;if(d){let rt=0,P=W*rt;for(let Pt=0;Pt<K;Pt++){const nt=z[Pt];Dt(nt[2]+P,nt[1]+P,nt[0]+P)}rt=c+g*2,P=W*rt;for(let Pt=0;Pt<K;Pt++){const nt=z[Pt];Dt(nt[0]+P,nt[1]+P,nt[2]+P)}}else{for(let rt=0;rt<K;rt++){const P=z[rt];Dt(P[2],P[1],P[0])}for(let rt=0;rt<K;rt++){const P=z[rt];Dt(P[0]+W*c,P[1]+W*c,P[2]+W*c)}}n.addGroup(J,i.length/3-J,0)}function at(){const J=i.length/3;let rt=0;Tt(G,rt),rt+=G.length;for(let P=0,Pt=L.length;P<Pt;P++){const nt=L[P];Tt(nt,rt),rt+=nt.length}n.addGroup(J,i.length/3-J,1)}function Tt(J,rt){let P=J.length;for(;--P>=0;){const Pt=P;let nt=P-1;nt<0&&(nt=J.length-1);for(let yt=0,ct=c+g*2;yt<ct;yt++){const Ut=W*yt,_t=W*(yt+1),E=rt+Pt+Ut,S=rt+nt+Ut,F=rt+nt+_t,q=rt+Pt+_t;zt(E,S,F,q)}}}function lt(J,rt,P){l.push(J),l.push(rt),l.push(P)}function Dt(J,rt,P){kt(J),kt(rt),kt(P);const Pt=i.length/3,nt=_.generateTopUV(n,i,Pt-3,Pt-2,Pt-1);jt(nt[0]),jt(nt[1]),jt(nt[2])}function zt(J,rt,P,Pt){kt(J),kt(rt),kt(Pt),kt(rt),kt(P),kt(Pt);const nt=i.length/3,yt=_.generateSideWallUV(n,i,nt-6,nt-3,nt-2,nt-1);jt(yt[0]),jt(yt[1]),jt(yt[3]),jt(yt[1]),jt(yt[2]),jt(yt[3])}function kt(J){i.push(l[J*3+0]),i.push(l[J*3+1]),i.push(l[J*3+2])}function jt(J){r.push(J.x),r.push(J.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return dv(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new jo[i.type]().fromJSON(i)),new _l(n,t.options)}}const uv={generateTopUV:function(s,t,e,n,i){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],h=t[i*3],c=t[i*3+1];return[new et(r,a),new et(o,l),new et(h,c)]},generateSideWallUV:function(s,t,e,n,i,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],h=t[n*3],c=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],m=t[i*3+2],v=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(o-c)<Math.abs(a-h)?[new et(a,1-l),new et(h,1-u),new et(d,1-m),new et(v,1-p)]:[new et(o,1-l),new et(c,1-u),new et(f,1-m),new et(g,1-p)]}};function dv(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class na extends xl{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new na(t.radius,t.detail)}}class nr extends ye{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],h=[],c=[];let u=t;const d=(e-t)/i,f=new D,m=new et;for(let v=0;v<=i;v++){for(let g=0;g<=n;g++){const p=r+g/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),h.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,c.push(m.x,m.y)}u+=d}for(let v=0;v<i;v++){const g=v*(n+1);for(let p=0;p<n;p++){const _=p+g,M=_,x=_+n+1,C=_+n+2,A=_+1;o.push(M,x,A),o.push(x,C,A)}}this.setIndex(o),this.setAttribute("position",new Jt(l,3)),this.setAttribute("normal",new Jt(h,3)),this.setAttribute("uv",new Jt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class pi extends ye{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let h=0;const c=[],u=new D,d=new D,f=[],m=[],v=[],g=[];for(let p=0;p<=n;p++){const _=[],M=p/n;let x=0;p===0&&a===0?x=.5/e:p===n&&l===Math.PI&&(x=-.5/e);for(let C=0;C<=e;C++){const A=C/e;u.x=-t*Math.cos(i+A*r)*Math.sin(a+M*o),u.y=t*Math.cos(a+M*o),u.z=t*Math.sin(i+A*r)*Math.sin(a+M*o),m.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),g.push(A+x,1-M),_.push(h++)}c.push(_)}for(let p=0;p<n;p++)for(let _=0;_<e;_++){const M=c[p][_+1],x=c[p][_],C=c[p+1][_],A=c[p+1][_+1];(p!==0||a>0)&&f.push(M,x,A),(p!==n-1||l<Math.PI)&&f.push(x,C,A)}this.setIndex(f),this.setAttribute("position",new Jt(m,3)),this.setAttribute("normal",new Jt(v,3)),this.setAttribute("uv",new Jt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ss extends ye{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],h=[],c=new D,u=new D,d=new D;for(let f=0;f<=n;f++)for(let m=0;m<=i;m++){const v=m/i*r,g=f/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(v),u.y=(t+e*Math.cos(g))*Math.sin(v),u.z=e*Math.sin(g),o.push(u.x,u.y,u.z),c.x=t*Math.cos(v),c.y=t*Math.sin(v),d.subVectors(u,c).normalize(),l.push(d.x,d.y,d.z),h.push(m/i),h.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=i;m++){const v=(i+1)*f+m-1,g=(i+1)*(f-1)+m-1,p=(i+1)*(f-1)+m,_=(i+1)*f+m;a.push(v,g,_),a.push(g,p,_)}this.setIndex(a),this.setAttribute("position",new Jt(o,3)),this.setAttribute("normal",new Jt(l,3)),this.setAttribute("uv",new Jt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ss(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class fv extends ge{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class ps extends Fi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new gt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Uh,this.normalScale=new et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class pa extends ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new gt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class cu extends pa{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.groundColor=new gt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const to=new ie,Gc=new D,Wc=new D;class Ml{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new et(512,512),this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ul,this._frameExtents=new et(1,1),this._viewportCount=1,this._viewports=[new oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Gc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Gc),Wc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Wc),e.updateMatrixWorld(),to.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(to),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(to)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class pv extends Ml{constructor(){super(new ke(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=Jr*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||i!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class mv extends pa{constructor(t,e,n=0,i=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.target=new ve,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new pv}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Xc=new ie,Hs=new D,eo=new D;class gv extends Ml{constructor(){super(new ke(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new et(4,2),this._viewportCount=6,this._viewports=[new oe(2,1,1,1),new oe(0,1,1,1),new oe(3,1,1,1),new oe(1,1,1,1),new oe(3,0,1,1),new oe(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Hs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Hs),eo.copy(n.position),eo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(eo),n.updateMatrixWorld(),i.makeTranslation(-Hs.x,-Hs.y,-Hs.z),Xc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xc)}}class ia extends pa{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new gv}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class vv extends Ml{constructor(){super(new dl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Yc extends pa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.target=new ve,this.shadow=new vv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class xv{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=qc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=qc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function qc(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:nl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=nl);const _n=s=>440*Math.pow(2,(s-69)/12),_v=[{root:38,tones:[62,65,69]},{root:34,tones:[58,62,65]},{root:41,tones:[60,65,69]},{root:36,tones:[60,64,67]}];class Mv{constructor(){y(this,"ctx",null);y(this,"master");y(this,"sfx");y(this,"music");y(this,"noise");y(this,"engine",null);y(this,"hum",null);y(this,"scheduler",null);y(this,"nextTime",0);y(this,"step",0);y(this,"masterVol",.8);y(this,"sfxVol",.85);y(this,"musicVol",.45);y(this,"muted",!1);y(this,"intensity",.4);y(this,"lastHitTick",0);y(this,"voices",0)}get ready(){return!!this.ctx&&this.ctx.state==="running"}unlock(){if(!this.ctx){const t=window.AudioContext??window.webkitAudioContext;if(!t)return;try{this.ctx=new t}catch{return}this.build()}this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{})}build(){const t=this.ctx,e=t.createDynamicsCompressor();e.threshold.value=-12,e.ratio.value=5,this.master=t.createGain(),this.master.connect(e).connect(t.destination),this.sfx=t.createGain(),this.music=t.createGain(),this.sfx.connect(this.master),this.music.connect(this.master),this.noise=t.createBuffer(1,t.sampleRate*2,t.sampleRate);const n=this.noise.getChannelData(0);for(let i=0;i<n.length;i++)n[i]=Math.random()*2-1;this.applyVolumes(),this.startMusic()}setVolumes(t,e,n,i){this.masterVol=t,this.sfxVol=e,this.musicVol=n,this.muted=i,this.applyVolumes()}applyVolumes(){if(!this.ctx)return;const t=this.ctx.currentTime;this.master.gain.setTargetAtTime(this.muted?0:this.masterVol,t,.05),this.sfx.gain.setTargetAtTime(this.sfxVol,t,.05),this.music.gain.setTargetAtTime(this.musicVol*.5,t,.2)}suspend(t){this.ctx&&(t?this.ctx.suspend().catch(()=>{}):this.ctx.resume().catch(()=>{}))}setListener(t,e,n,i,r,a){if(!this.ctx)return;const o=this.ctx.listener;if(o.positionX){const l=this.ctx.currentTime;o.positionX.setTargetAtTime(t,l,.02),o.positionY.setTargetAtTime(e,l,.02),o.positionZ.setTargetAtTime(n,l,.02),o.forwardX.setTargetAtTime(i,l,.02),o.forwardY.setTargetAtTime(r,l,.02),o.forwardZ.setTargetAtTime(a,l,.02),o.upX.value=0,o.upY.value=1,o.upZ.value=0}else o.setPosition(t,e,n),o.setOrientation(i,r,a,0,1,0)}setIntensity(t){this.intensity=Math.max(0,Math.min(1,t))}out(t,e){if(!this.ctx||this.ctx.state!=="running"||this.voices>48)return null;const n=this.ctx,i=n.createGain();if(i.gain.value=e,t){const r=n.createPanner();r.panningModel="equalpower",r.distanceModel="inverse",r.refDistance=9,r.maxDistance=220,r.rolloffFactor=1.1,r.positionX?(r.positionX.value=t.x,r.positionY.value=t.y,r.positionZ.value=t.z):r.setPosition(t.x,t.y,t.z),i.connect(r).connect(this.sfx)}else i.connect(this.sfx);return this.voices++,window.setTimeout(()=>{this.voices--,i.disconnect()},2600),i}tone(t,e,n,i,r,a,o,l=.005){const h=this.ctx,c=h.createOscillator(),u=h.createGain();c.type=e,c.frequency.setValueAtTime(n,r),c.frequency.exponentialRampToValueAtTime(Math.max(20,i),r+a),u.gain.setValueAtTime(1e-4,r),u.gain.exponentialRampToValueAtTime(o,r+l),u.gain.exponentialRampToValueAtTime(1e-4,r+a),c.connect(u).connect(t),c.start(r),c.stop(r+a+.05)}burst(t,e,n,i,r,a,o,l=1){const h=this.ctx,c=h.createBufferSource();c.buffer=this.noise,c.playbackRate.value=.8+Math.random()*.4;const u=h.createBiquadFilter();u.type=e,u.Q.value=l,u.frequency.setValueAtTime(n,r),u.frequency.exponentialRampToValueAtTime(Math.max(30,i),r+a);const d=h.createGain();d.gain.setValueAtTime(o,r),d.gain.exponentialRampToValueAtTime(1e-4,r+a),c.connect(u).connect(d).connect(t),c.start(r,Math.random()*1.5),c.stop(r+a+.05)}fire(t,e,n){const i=this.out(n?null:e,n?.9:1);if(!i)return;const r=this.ctx.currentTime;switch(t){case"plasma":this.tone(i,"sawtooth",520,90,r,.22,.35),this.tone(i,"sine",160,50,r,.25,.5),this.burst(i,"lowpass",3e3,300,r,.18,.4);break;case"rail":this.tone(i,"square",1800,120,r,.4,.22),this.tone(i,"sine",90,30,r,.5,.7),this.burst(i,"highpass",6e3,1200,r,.35,.5);break;case"volt":this.tone(i,"square",900+Math.random()*300,420,r,.05,.13),this.burst(i,"bandpass",4e3,2500,r,.05,.18,4);break;case"nova":this.burst(i,"bandpass",900,200,r,.45,.5,1.2),this.tone(i,"triangle",240,80,r,.3,.3);break}}charge(t,e){const n=this.out(t?null:e,.6);if(!n)return;const i=this.ctx.currentTime;this.tone(n,"sine",300,2200,i,.36,.2,.3)}impact(t,e,n){if(t==="nova")return;const i=this.out(e,t==="volt"?.4:.8);if(!i)return;const r=this.ctx.currentTime;n?(this.tone(i,"square",340,140,r,.12,.2),this.burst(i,"bandpass",2400,900,r,.14,.45,2)):this.burst(i,"lowpass",2200,200,r,.2,.4)}explosion(t,e){const n=this.out(t,e?1.4:1);if(!n)return;const i=this.ctx.currentTime;this.burst(n,"lowpass",e?1600:2400,60,i,e?1.6:.8,1),this.tone(n,"sine",e?90:120,28,i,e?1.1:.6,.9)}hitConfirm(t){const e=this.out(null,.6);if(!e)return;const n=this.ctx.currentTime;if(t){this.tone(e,"triangle",880,880,n,.09,.4),this.tone(e,"triangle",1320,1320,n+.08,.16,.4);return}n-this.lastHitTick<.06||(this.lastHitTick=n,this.tone(e,"square",1500,1300,n,.04,.16))}damageTaken(t,e){const n=this.out(null,Math.min(1,.3+t/60));if(!n)return;const i=this.ctx.currentTime;this.tone(n,"sine",140,50,i,.25,.8),this.burst(n,"lowpass",900,100,i,.2,.6),e&&this.tone(n,"square",620,620,i+.05,.12,.08)}pickup(t){const e=this.out(null,.6);if(!e)return;const n=this.ctx.currentTime,i=t==="repair"?60:t==="overdrive"?64:67;[0,4,7,12].forEach((r,a)=>this.tone(e,"triangle",_n(i+r+12),_n(i+r+12),n+a*.05,.16,.3))}ability(t,e,n){const i=this.out(n?null:e,.9);if(!i)return;const r=this.ctx.currentTime;t==="dash"?(this.burst(i,"bandpass",600,3e3,r,.5,.6,1.5),this.tone(i,"sawtooth",120,400,r,.4,.2)):t==="aegis"?(this.tone(i,"sine",220,660,r,.5,.4,.05),this.tone(i,"triangle",330,990,r+.05,.5,.25,.05)):(this.burst(i,"lowpass",1200,40,r,1.2,1),this.tone(i,"sine",70,25,r,.9,1))}reload(t){const e=this.out(null,.4);if(!e)return;const n=this.ctx.currentTime;t?(this.burst(e,"bandpass",3e3,2e3,n,.05,.6,6),this.burst(e,"bandpass",2e3,1500,n+.08,.06,.6,6)):this.burst(e,"bandpass",1500,900,n,.08,.4,4)}overheat(){const t=this.out(null,.5);if(!t)return;const e=this.ctx.currentTime;this.burst(t,"highpass",3e3,6e3,e,.7,.5),this.tone(t,"square",300,150,e,.3,.12)}ui(t){const e=this.out(null,.35);if(!e)return;const n=this.ctx.currentTime;t==="hover"?this.tone(e,"sine",1400,1400,n,.03,.08):t==="click"?this.tone(e,"triangle",900,700,n,.06,.25):t==="confirm"?(this.tone(e,"triangle",660,660,n,.08,.3),this.tone(e,"triangle",990,990,n+.07,.12,.3)):t==="back"?this.tone(e,"triangle",600,400,n,.1,.25):(this.tone(e,"square",200,160,n,.12,.15),this.tone(e,"square",200,160,n+.13,.12,.15))}countdown(t){const e=this.out(null,.6);if(!e)return;const n=this.ctx.currentTime;t>0?this.tone(e,"square",660,660,n,.14,.18):(this.tone(e,"sawtooth",220,220,n,.7,.25,.02),this.tone(e,"sawtooth",330,330,n,.7,.2,.02),this.tone(e,"square",1320,1320,n,.25,.12))}matchEnd(t){const e=this.out(null,.7);if(!e)return;const n=this.ctx.currentTime;(t?[62,65,69,74]:[62,60,57,50]).forEach((r,a)=>this.tone(e,"triangle",_n(r),_n(r),n+a*.16,a===3?.9:.2,.35))}capture(t){const e=this.out(null,.6);if(!e)return;const n=this.ctx.currentTime;(t?[69,74,78]:[69,65,62]).forEach((r,a)=>this.tone(e,"square",_n(r),_n(r),n+a*.1,.14,.14))}setEngine(t){if(!this.ctx||this.ctx.state!=="running")return;const e=this.ctx;if(!t){if(this.engine){const o=this.engine;o.gain.gain.setTargetAtTime(0,e.currentTime,.1),window.setTimeout(()=>{try{o.a.stop(),o.b.stop()}catch{}},500),this.engine=null}return}if(!this.engine){const o=e.createOscillator(),l=e.createOscillator();o.type="sawtooth",l.type="square";const h=e.createBiquadFilter();h.type="lowpass",h.Q.value=2;const c=e.createGain();c.gain.value=0,o.connect(h),l.connect(h),h.connect(c).connect(this.sfx),o.start(),l.start(),this.engine={a:o,b:l,filter:h,gain:c}}const n=this.engine,i=e.currentTime,a=38-t.heavy*10+t.speed*55+t.load*10+(t.boost?25:0);n.a.frequency.setTargetAtTime(a,i,.08),n.b.frequency.setTargetAtTime(a*.5,i,.08),n.filter.frequency.setTargetAtTime(240+t.speed*700+t.load*300+(t.boost?900:0),i,.1),n.gain.gain.setTargetAtTime(.08+t.load*.06+t.speed*.05,i,.1)}setNearbyEngine(t,e){if(!this.ctx||this.ctx.state!=="running")return;const n=this.ctx;if(!this.hum){const a=n.createOscillator();a.type="sawtooth";const o=n.createBiquadFilter();o.type="lowpass",o.frequency.value=380;const l=n.createGain();l.gain.value=0;const h=n.createPanner();h.panningModel="equalpower",h.distanceModel="inverse",h.refDistance=8,h.rolloffFactor=1.3,a.connect(o).connect(l).connect(h).connect(this.sfx),a.start(),this.hum={osc:a,gain:l,pan:h}}const i=this.hum,r=n.currentTime;if(!t){i.gain.gain.setTargetAtTime(0,r,.2);return}i.pan.positionX?(i.pan.positionX.setTargetAtTime(t.x,r,.05),i.pan.positionY.setTargetAtTime(t.y,r,.05),i.pan.positionZ.setTargetAtTime(t.z,r,.05)):i.pan.setPosition(t.x,t.y,t.z),i.osc.frequency.setTargetAtTime(32+e*40,r,.1),i.gain.gain.setTargetAtTime(.1+e*.08,r,.15)}startMusic(){!this.ctx||this.scheduler!==null||(this.nextTime=this.ctx.currentTime+.1,this.scheduler=window.setInterval(()=>this.schedule(),50))}schedule(){const t=this.ctx;if(!t||t.state!=="running")return;const e=60/104/4;for(;this.nextTime<t.currentTime+.15;)this.playStep(this.step,this.nextTime),this.nextTime+=e,this.step=(this.step+1)%256}playStep(t,e){const n=this.ctx,i=_v[Math.floor(t/64)%4],r=t%16,a=this.intensity,o=this.music;if(r%2===0){const l=n.createOscillator(),h=n.createGain(),c=n.createBiquadFilter();l.type="sawtooth",l.frequency.value=_n(i.root+(r===6||r===14?12:0)),c.type="lowpass",c.frequency.setValueAtTime(300+a*500,e),c.frequency.exponentialRampToValueAtTime(120,e+.18),h.gain.setValueAtTime(1e-4,e),h.gain.exponentialRampToValueAtTime(.22,e+.01),h.gain.exponentialRampToValueAtTime(1e-4,e+.2),l.connect(c).connect(h).connect(o),l.start(e),l.stop(e+.25)}if(t%64===0)for(const l of i.tones){const h=n.createOscillator(),c=n.createGain();h.type="triangle",h.frequency.value=_n(l),h.detune.value=(Math.random()-.5)*12,c.gain.setValueAtTime(1e-4,e),c.gain.linearRampToValueAtTime(.05,e+.8),c.gain.linearRampToValueAtTime(1e-4,e+4.4),h.connect(c).connect(o),h.start(e),h.stop(e+4.5)}if((r===0||r===8||a>.6&&r===10)&&this.tone(o,"sine",120,40,e,.22,.5+a*.3),a>.25&&(r===4||r===12)&&this.burst(o,"bandpass",1800,900,e,.14,.18+a*.12,.8),r%2===1&&a>.15&&this.burst(o,"highpass",8e3,7e3,e,.03,.05+a*.05),a>.5&&r%2===0){const l=i.tones[r/2%i.tones.length]+12;this.tone(o,"square",_n(l),_n(l),e,.09,.03)}}dispose(){this.scheduler!==null&&window.clearInterval(this.scheduler),this.scheduler=null,this.ctx?.close().catch(()=>{}),this.ctx=null,this.engine=null,this.hum=null}}const $c=Math.PI*2;function Qe(s,t,e){return s<t?t:s>e?e:s}function yl(s){return s=(s+Math.PI)%$c,s<0&&(s+=$c),s-Math.PI}function ir(s,t){return yl(t-s)}function yv(s,t,e){const n=ir(s,t);return Math.abs(n)<=e?t:yl(s+Math.sign(n)*e)}function no(s,t,e){return s<t?Math.min(t,s+e):Math.max(t,s-e)}function Qo(s,t){return 1-Math.exp(-s*t)}function Re(s,t,e,n){const i=e-s,r=n-t;return Math.sqrt(i*i+r*r)}function Vs(s,t){return Math.atan2(s,t)}class hu{constructor(t){y(this,"s");this.s=t>>>0}next(){let t=this.s=this.s+1831565813>>>0;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}range(t,e){return t+(e-t)*this.next()}int(t,e){return t+Math.floor(this.next()*(e-t))}pick(t){return t[Math.floor(this.next()*t.length)]}}const Zc={t:0,x:0,y:0,z:0,nx:0,ny:0,nz:0};class bv{constructor(t){y(this,"camera");y(this,"yaw",0);y(this,"pitch",.2);y(this,"distance",12);y(this,"targetDistance",12);y(this,"minDistance",5.5);y(this,"maxDistance",22);y(this,"pivot",new D);y(this,"smoothPivot",new D);y(this,"trauma",0);y(this,"shakeT",0);y(this,"initialised",!1);this.camera=t}reset(t){this.yaw=t,this.pitch=.2,this.initialised=!1}look(t,e,n){const i=.0022*n.sensitivity;this.yaw-=t*i,this.pitch=Qe(this.pitch+e*i*(n.invertY?-1:1),-.32,1.15)}zoom(t){this.targetDistance=Qe(this.targetDistance+t*1.4,this.minDistance,this.maxDistance)}addTrauma(t){this.trauma=Math.min(1,this.trauma+t)}dir(t){const e=Math.cos(this.pitch);return t.set(Math.sin(this.yaw)*e,-Math.sin(this.pitch),Math.cos(this.yaw)*e)}update(t,e,n,i,r,a){this.pivot.set(e,n+3.4,i),this.initialised||(this.smoothPivot.copy(this.pivot),this.distance=this.targetDistance,this.initialised=!0);const o=a.smoothing<=0?1:Qo(26/(.4+a.smoothing*1.6),t);this.smoothPivot.lerp(this.pivot,o),this.distance+=(this.targetDistance-this.distance)*Qo(10,t),this.dir(ei);let l=this.distance;r&&r.raycast(this.smoothPivot.x,this.smoothPivot.y,this.smoothPivot.z,-ei.x,-ei.y,-ei.z,l+.6,Zc)&&(l=Math.max(1.8,Zc.t-.6));const h=this.camera;if(h.position.set(this.smoothPivot.x-ei.x*l,this.smoothPivot.y-ei.y*l,this.smoothPivot.z-ei.z*l),h.position.y<n+.6&&r&&(h.position.y=Math.max(h.position.y,r.surfaceHeight(h.position.x,h.position.z,h.position.y+1)+.5)),jc.copy(h.position).add(ei),h.lookAt(jc),this.trauma=Math.max(0,this.trauma-t*1.6),a.shake&&this.trauma>0){this.shakeT+=t*38;const c=this.trauma*this.trauma;h.rotation.z+=Math.sin(this.shakeT*1.3)*.02*c,h.rotateX(Math.sin(this.shakeT*.9+1.7)*.015*c),h.rotateY(Math.sin(this.shakeT*1.1+4.1)*.015*c)}h.fov!==a.fov&&(h.fov=a.fov,h.updateProjectionMatrix())}}const ei=new D,jc=new D,Ze={hornet:{id:"hornet",name:"HORNET",role:"LIGHT RAIDER",blurb:"Low, quick and twitchy. Flanks fast, folds under focused fire.",maxSpeed:17,reverseFactor:.62,accel:24,brake:34,turnRate:2.35,health:195,armor:12,radius:1.75,length:4.3,width:3,turretHeight:1.45,mass:1,ability:"dash",unlockLevel:1,cost:0},vanguard:{id:"vanguard",name:"VANGUARD",role:"MAIN BATTLE",blurb:"The all-rounder. Balanced speed and plating with a tactical shield.",maxSpeed:13.5,reverseFactor:.58,accel:17,brake:28,turnRate:1.85,health:275,armor:25,radius:2,length:4.9,width:3.4,turretHeight:1.7,mass:1.45,ability:"aegis",unlockLevel:1,cost:0},bastion:{id:"bastion",name:"BASTION",role:"SIEGE HEAVY",blurb:"A rolling fortress. Slow to turn, brutal up close with its shockwave.",maxSpeed:10.5,reverseFactor:.55,accel:11.5,brake:22,turnRate:1.38,health:370,armor:45,radius:2.3,length:5.5,width:3.9,turretHeight:1.95,mass:2.1,ability:"shockwave",unlockLevel:3,cost:1200}},sr={dash:{id:"dash",name:"PHASE DASH",blurb:"A burst of thrust that halves incoming damage while it lasts.",chargeTime:13,duration:.7},aegis:{id:"aegis",name:"AEGIS SHIELD",blurb:"A hard-light dome that blocks 60% of damage for 5 seconds.",chargeTime:20,duration:5},shockwave:{id:"shockwave",name:"SHOCKWAVE",blurb:"A ground slam: heavy damage and knockback within 12 m, jams turrets.",chargeTime:22,duration:.4}},Ce={plasma:{id:"plasma",name:"PLASMA CANNON",role:"BALANCED",blurb:"Eight-round magazine of hot plasma slugs with a small splash. Reliable at any range.",damage:26,speed:92,cooldown:.55,magazine:8,reloadTime:2.2,heatPerShot:0,coolRate:0,overheatLock:0,charge:0,splashRadius:2.4,splashDamage:9,gravity:0,lifetime:1.7,spread:.006,pierce:0,knockback:.6,jolt:0,turretSpeed:2.2,pitchMin:-.16,pitchMax:.36,recoil:.28,barrelLength:2.6,projectile:"plasma",color:15986923,unlockLevel:1,cost:0,preferredRange:30},rail:{id:"rail",name:"RAIL DRIVER",role:"SNIPER",blurb:"Charges for a beat, then drives a slug through 50% of armor. Long cooldown — make it count.",damage:80,speed:560,cooldown:2.5,magazine:0,reloadTime:0,heatPerShot:0,coolRate:0,overheatLock:0,charge:.38,splashRadius:0,splashDamage:0,gravity:0,lifetime:.5,spread:0,pierce:.5,knockback:3.2,jolt:0,turretSpeed:1.55,pitchMin:-.14,pitchMax:.32,recoil:.6,barrelLength:3.4,projectile:"rail",color:16579577,unlockLevel:4,cost:1500,preferredRange:48},volt:{id:"volt",name:"VOLT EMITTER",role:"BRAWLER",blurb:"A short-range arc stream. Each hit jolts the target. Watch the heat — R vents early.",damage:6,speed:125,cooldown:.085,magazine:0,reloadTime:1.1,heatPerShot:.045,coolRate:.42,overheatLock:1.8,charge:0,splashRadius:0,splashDamage:0,gravity:0,lifetime:.42,spread:.028,pierce:0,knockback:0,jolt:.6,turretSpeed:2.9,pitchMin:-.2,pitchMax:.38,recoil:.05,barrelLength:2.1,projectile:"volt",color:14931152,unlockLevel:2,cost:800,preferredRange:17},nova:{id:"nova",name:"NOVA ROCKETS",role:"ARTILLERY",blurb:"Four-rocket rack. Arcing shots with a 6 m blast that pushes tanks around. Lob over cover.",damage:22,speed:50,cooldown:.24,magazine:4,reloadTime:3.3,heatPerShot:0,coolRate:0,overheatLock:0,charge:0,splashRadius:6,splashDamage:24,gravity:9,lifetime:3.2,spread:.012,pierce:0,knockback:7.5,jolt:0,turretSpeed:1.9,pitchMin:-.12,pitchMax:.5,recoil:.32,barrelLength:1.9,projectile:"nova",color:15226723,unlockLevel:6,cost:2200,preferredRange:30}},ln=[{id:"graphite",name:"MOONLIGHT",body:13875639,accent:15855079,metal:.65,unlockLevel:1,cost:0},{id:"arctic",name:"BONE & SADDLE",body:15855079,accent:11500926,metal:.45,unlockLevel:1,cost:250},{id:"ultraviolet",name:"WINE CELLAR",body:7476509,accent:15645113,metal:.6,unlockLevel:2,cost:400},{id:"ember",name:"MESA DUSK",body:4722195,accent:13875639,metal:.55,unlockLevel:3,cost:600},{id:"chrome",name:"DUST DEVIL",body:11500926,accent:16777215,metal:.95,unlockLevel:5,cost:900},{id:"midnight",name:"CARVED MOON",body:1377799,accent:15297396,metal:.8,unlockLevel:7,cost:1400}],Sv=[{id:"damage",name:"DAMAGE CORE",perLevel:"+6% weapon damage"},{id:"armor",name:"COMPOSITE PLATING",perLevel:"+7 armor"},{id:"speed",name:"DRIVE COILS",perLevel:"+4% top speed"},{id:"reload",name:"LOADER SERVO",perLevel:"-6% cooldown & reload"}],zn=5,wv=[150,300,500,800,1200],Li={rookie:{id:"rookie",name:"ROOKIE",reaction:.95,aimError:.12,lead:.25,turretMult:.7,fireAlign:.07,retreatHealth:.2,viewRange:55,strafe:.35,think:.7,tactics:.3},veteran:{id:"veteran",name:"VETERAN",reaction:.55,aimError:.07,lead:.65,turretMult:.9,fireAlign:.045,retreatHealth:.32,viewRange:72,strafe:.7,think:.45,tactics:.7},elite:{id:"elite",name:"ELITE",reaction:.3,aimError:.042,lead:.92,turretMult:1.05,fireAlign:.028,retreatHealth:.38,viewRange:88,strafe:1,think:.3,tactics:1}},Me={tdm:{id:"tdm",name:"TEAM DEATHMATCH",short:"TDM",blurb:"Riders versus outlaws, four tanks a side. Every destroyed enemy scores for your team.",scoreLimits:[15,25,40],defaultScore:25,timeLimits:[300,480,600],teams:!0},ffa:{id:"ffa",name:"FREE-FOR-ALL",short:"FFA",blurb:"Eight tanks, no friends. First to the frag limit — or the most frags at the buzzer — wins.",scoreLimits:[10,15,25],defaultScore:15,timeLimits:[300,480,600],teams:!1},cp:{id:"cp",name:"CONTROL POINT",short:"CP",blurb:"Capture the central uplink and hold it. The owning team earns a point every second.",scoreLimits:[60,100,150],defaultScore:100,timeLimits:[300,480,600],teams:!0}},Tv=["KESTREL","RIVET","NOX","SABLE","TALON","MERIDIAN","VEX","ORBIT","GRIDLOCK","PALADIN","ION","FERRO","QUASAR","BRAMBLE","DRIFT","HALO"],Ev=4,Kc=2.2,Av=100,Rv=35,Cv=1.45,Pv=.34,Lv=.16,Dv=6,Iv=.035,sa=.95,Uv=24,Nv=2.3,cn=new Map;function Xn(s,t){const e=document.createElement("canvas");return e.width=s,e.height=t,[e,e.getContext("2d")]}function Yn(s,t,e=!0,n=!0){const i=new tu(t);return e&&(i.wrapS=i.wrapT=_s),n&&(i.colorSpace=Ge),i.anisotropy=4,cn.set(s,i),i}function ma(s){let t=s>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function bl(s,t,e,n,i,r){const a=ma(r);for(let o=0;o<n;o++){s.fillStyle=`rgba(0,0,0,${i*a()})`;const l=1+a()*6;s.fillRect(a()*t,a()*e,l,l*(.5+a()))}}function kv(s,t){const e=`floor:${s}:${t}`,n=cn.get(e);if(n)return n;const[i,r]=Xn(512,512);r.fillStyle=s,r.fillRect(0,0,512,512);const a=ma(11);for(let o=0;o<2;o++)for(let l=0;l<2;l++){const h=.9+a()*.2;r.fillStyle=`rgba(${Math.floor(72*h)},${Math.floor(20*h)},${Math.floor(24*h)},0.35)`,r.fillRect(l*256+6,o*256+6,244,244),r.fillStyle="rgba(3, 3, 3,0.35)",r.fillRect(l*256+30,o*256+120,196,14),r.fillStyle="rgba(255,255,255,0.05)";for(const[c,u]of[[18,18],[238,18],[18,238],[238,238]])r.fillRect(l*256+c-3,o*256+u-3,6,6)}bl(r,512,512,900,.18,5);for(let o=0;o<1400;o++)r.fillStyle=a()<.7?"rgba(211, 185, 183, 0.07)":"rgba(171, 11, 26, 0.08)",r.fillRect(a()*512,a()*512,1+a()*2,1+a()*2);r.strokeStyle="rgba(3, 3, 3, 0.16)",r.lineWidth=1,r.beginPath();for(let o=-512;o<512;o+=9)r.moveTo(o,512),r.lineTo(o+512,0);return r.stroke(),r.strokeStyle=t,r.lineWidth=3,r.globalAlpha=.32,r.strokeRect(1.5,1.5,509,509),r.beginPath(),r.moveTo(256,0),r.lineTo(256,512),r.moveTo(0,256),r.lineTo(512,256),r.stroke(),r.globalAlpha=1,Yn(e,i)}function Fv(){const s="floorGlow",t=cn.get(s);if(t)return t;const[e,n]=Xn(512,512);return n.fillStyle="#030303",n.fillRect(0,0,512,512),n.strokeStyle="#ffffff",n.lineWidth=3,n.strokeRect(1.5,1.5,509,509),n.globalAlpha=.6,n.beginPath(),n.moveTo(256,0),n.lineTo(256,512),n.moveTo(0,256),n.lineTo(512,256),n.stroke(),Yn(s,e)}function ss(s,t,e){const n=`panel:${s}:${t}:${e}`,i=cn.get(n);if(i)return i;const[r,a]=Xn(256,256);a.fillStyle=s,a.fillRect(0,0,256,256);const o=ma(e);for(let l=0;l<4;l++){const h=l*64;a.fillStyle=`rgba(255,255,255,${.02+o()*.04})`,a.fillRect(0,h+4,256,56),a.fillStyle=t,a.fillRect(0,h,256,3);for(let c=0;c<3;c++)a.fillStyle="rgba(3, 3, 3,0.28)",a.fillRect(o()*220,h+12+o()*30,20+o()*30,3)}return a.fillStyle=t,a.fillRect(0,0,3,256),a.fillRect(128,0,2,256),bl(a,256,256,500,.2,e+3),Yn(n,r)}function Fr(s){const t=`container:${s}`,e=cn.get(t);if(e)return e;const[n,i]=Xn(256,128);i.fillStyle=s,i.fillRect(0,0,256,128);for(let r=0;r<256;r+=8){const a=i.createLinearGradient(r,0,r+8,0);a.addColorStop(0,"rgba(3, 3, 3,0.35)"),a.addColorStop(.5,"rgba(255,255,255,0.12)"),a.addColorStop(1,"rgba(3, 3, 3,0.35)"),i.fillStyle=a,i.fillRect(r,0,8,128)}return i.fillStyle="rgba(3, 3, 3,0.45)",i.fillRect(0,0,256,6),i.fillRect(0,122,256,6),bl(i,256,128,400,.3,s.length*7),i.fillStyle="rgba(255,255,255,0.18)",i.font='700 15px "Zilla Slab", Georgia, serif',i.fillText("NTX "+(1e3+s.charCodeAt(2)*13),14,24),Yn(t,n)}function zv(){const s="track",t=cn.get(s);if(t)return t;const[e,n]=Xn(64,128);n.fillStyle="#0b0405",n.fillRect(0,0,64,128);for(let i=0;i<128;i+=16)n.fillStyle="#170607",n.fillRect(2,i+2,60,9),n.fillStyle="#22080a",n.fillRect(6,i+4,52,3),n.fillStyle="#060404",n.fillRect(0,i+12,64,4);return Yn(s,e)}function ga(){const s="glow",t=cn.get(s);if(t)return t;const[e,n]=Xn(64,64),i=n.createRadialGradient(32,32,0,32,32,32);return i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.25,"rgba(255,255,255,0.7)"),i.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=i,n.fillRect(0,0,64,64),Yn(s,e,!1)}function Ov(){const s="scorch",t=cn.get(s);if(t)return t;const[e,n]=Xn(128,128),i=ma(77),r=n.createRadialGradient(64,64,4,64,64,62);r.addColorStop(0,"rgba(3, 3, 3,0.9)"),r.addColorStop(.55,"rgba(7, 4, 4,0.55)"),r.addColorStop(1,"rgba(3, 3, 3,0)"),n.fillStyle=r,n.fillRect(0,0,128,128);for(let a=0;a<40;a++){n.fillStyle=`rgba(0,0,0,${.2*i()})`;const o=i()*Math.PI*2,l=20+i()*40;n.beginPath(),n.arc(64+Math.cos(o)*l,64+Math.sin(o)*l,2+i()*6,0,Math.PI*2),n.fill()}return Yn(s,e,!1)}function Bv(s,t){const e=`sign:${s}:${t}`,n=cn.get(e);if(n)return n;const[i,r]=Xn(512,96);r.fillStyle="rgba(41, 9, 12, 0.95)",r.fillRect(0,0,512,96),r.strokeStyle="rgba(72, 14, 19, 0.9)",r.lineWidth=1;for(let a=14;a<96;a+=12)r.beginPath(),r.moveTo(0,a),r.lineTo(512,a),r.stroke();return r.strokeStyle=t,r.lineWidth=4,r.strokeRect(4,4,504,88),r.lineWidth=1.5,r.strokeRect(12,12,488,72),r.setLineDash([5,6]),r.strokeStyle="rgba(211, 185, 183, 0.45)",r.strokeRect(8,8,496,80),r.setLineDash([]),r.font='700 50px "Zilla Slab", Georgia, serif',r.textAlign="center",r.textBaseline="middle",r.shadowColor=t,r.shadowBlur=10,r.fillStyle=t,r.fillText(s,256,50),r.shadowBlur=0,r.fillStyle="#F1EDE7",r.globalAlpha=.55,r.fillText(s,256,50),Yn(e,i,!1)}function Hv(){const s="hazard",t=cn.get(s);if(t)return t;const[e,n]=Xn(128,32);n.fillStyle="#0d0505",n.fillRect(0,0,128,32),n.fillStyle="#AF7D7E";for(let i=-32;i<160;i+=32)n.beginPath(),n.moveTo(i,32),n.lineTo(i+16,32),n.lineTo(i+32,0),n.lineTo(i+16,0),n.closePath(),n.fill();return Yn(s,e)}function Vv(){cn.forEach(s=>s.dispose()),cn.clear()}const qt={cyan:15855079,blue:13875639,magenta:11209498,amber:15297396,white:15855079,red:14876694,green:15645113},Gv=.62,ms={value:0};class uu{constructor(t){y(this,"surfaces",new Map);y(this,"glows",new Map);y(this,"extra",[]);this.env=t}surface(t){let e=this.surfaces.get(t);return e||(e=this.create(t),this.surfaces.set(t,e)),e}glow(t,e=2.2){const n=`${t}:${e}`;let i=this.glows.get(n);if(!i){const r=new gt(typeof t=="number"?t:qt[t]);r.multiplyScalar(e*Gv),i=new Se({color:r,toneMapped:!1,fog:!0}),this.glows.set(n,i)}return i}track(t){return this.extra.push(t),t}std(t){return new ps({envMap:this.env,envMapIntensity:.9,...t})}create(t){switch(t){case"floor":return this.std({map:kv("#2a0b0d","#d3b9b7"),emissiveMap:Fv(),emissive:new gt(13875639),emissiveIntensity:.1,roughness:.7,metalness:.35});case"deck":return this.std({map:ss("#3a1013","#1a0608",3),roughness:.6,metalness:.45});case"metal":return this.std({map:ss("#4a1a1d","#1c0709",7),roughness:.62,metalness:.4});case"darkMetal":return this.std({map:ss("#24090c","#0e0405",9),roughness:.55,metalness:.6});case"concrete":return this.std({map:Hv(),roughness:.85,metalness:.1,envMapIntensity:.3});case"containerCyan":return this.std({map:Fr("#8f6e6f"),roughness:.6,metalness:.45});case"containerMagenta":return this.std({map:Fr("#72151d"),roughness:.6,metalness:.45});case"containerSteel":return this.std({map:Fr("#3a1215"),roughness:.55,metalness:.55});case"containerAmber":return this.std({map:Fr("#a88886"),roughness:.6,metalness:.45});case"glass":return this.std({color:16184303,transparent:!0,opacity:.25,roughness:.05,metalness:.9});case"trim":return this.std({color:1377799,roughness:.4,metalness:.85});case"boundary":return this.std({map:ss("#2d0a0d","#120405",13),roughness:.6,metalness:.5,emissive:new gt(4722195),emissiveIntensity:.5});case"lab":return this.std({map:ss("#8a6a6b","#3a1013",17),roughness:.38,metalness:.55});case"labDark":return this.std({map:ss("#2a0b0e","#110405",19),roughness:.42,metalness:.7});case"barrier":return Wv()}}dispose(){this.surfaces.forEach(t=>t.dispose()),this.glows.forEach(t=>t.dispose()),this.extra.forEach(t=>t.dispose()),this.surfaces.clear(),this.glows.clear()}}function Wv(){return new ge({transparent:!0,depthWrite:!1,side:qe,blending:We,uniforms:{uTime:ms,uColor:{value:new gt(qt.blue).multiplyScalar(.15)}},vertexShader:`
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
      }`})}function Xv(s,t=!1){const e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,l=new ye;let h=0;for(let c=0;c<s.length;++c){const u=s[c];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". The geometry must have either an index or a position attribute"),null;l.addGroup(h,f,c),h+=f}}if(e){let c=0;const u=[];for(let d=0;d<s.length;++d){const f=s[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+c);c+=s[d].attributes.position.count}l.setIndex(u)}for(const c in r){const u=Jc(r[c]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" attribute."),null;l.setAttribute(c,u)}for(const c in a){const u=a[c][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[c]=[];for(let d=0;d<u;++d){const f=[];for(let v=0;v<a[c].length;++v)f.push(a[c][v][d]);const m=Jc(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" morphAttribute."),null;l.morphAttributes[c].push(m)}}return l}function Jc(s){let t,e,n,i=-1,r=0;for(let h=0;h<s.length;++h){const c=s[h];if(t===void 0&&(t=c.array.constructor),t!==c.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=c.itemSize),e!==c.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=c.normalized),n!==c.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=c.gpuType),i!==c.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=c.count*e}const a=new t(r),o=new Pe(a,e,n);let l=0;for(let h=0;h<s.length;++h){const c=s[h];if(c.isInterleavedBufferAttribute){const u=l/e;for(let d=0,f=c.count;d<f;d++)for(let m=0;m<e;m++){const v=c.getComponent(d,m);o.setComponent(d+u,m,v)}}else a.set(c.array,l);l+=c.count*e}return i!==void 0&&(o.gpuType=i),o}function le(s,t,e,n,i,r,a=4,o=a){const l=n-s,h=i-t,c=r-e,u=new Fe(l,h,c),d=u.attributes.uv,f=[[c,h],[c,h],[l,c],[l,c],[l,h],[l,h]];for(let m=0;m<6;m++){const[v,g]=f[m],p=m===2||m===3?a:o;for(let _=0;_<4;_++){const M=m*4+_;d.setXY(M,d.getX(M)*v/a,d.getY(M)*g/p)}}return u.translate(s+l/2,t+h/2,e+c/2),u}function Yv(s,t,e,n,i=4){const r=[],a=[],o=[],l=(f,m,v,g,p,_,M,x)=>{const C=r.length/3;r.push(...f,...m,...v,...g),a.push(...p,..._,...M,...x),o.push(C,C+1,C+2,C,C+2,C+3)},h=f=>[s[f],e[f],t[f]],c=f=>[s[f],n[f],t[f]],u=f=>[s[f]/i,t[f]/i];l(h(0),h(1),h(2),h(3),u(0),u(1),u(2),u(3)),l(c(0),c(3),c(2),c(1),u(0),u(3),u(2),u(1));for(let f=0;f<4;f++){const m=(f+1)%4,v=Math.hypot(s[m]-s[f],t[m]-t[f])/i;l(c(f),c(m),h(m),h(f),[0,n[f]/i],[v,n[m]/i],[v,e[m]/i],[0,e[f]/i])}const d=new ye;return d.setAttribute("position",new Jt(r,3)),d.setAttribute("uv",new Jt(a,2)),d.setIndex(o),d.computeVertexNormals(),d}function zr(s,t,e,n,i,r,a){const o=Math.hypot(e-s,n-t),l=new Fe(r,a,o);return l.rotateY(Math.atan2(e-s,n-t)),l.translate((s+e)/2,i,(t+n)/2),l}function ci(s){if(s.length===0)return null;for(const e of s){if(!e.index){const n=e.attributes.position.count,i=[];for(let r=0;r<n;r++)i.push(r);e.setIndex(i)}e.attributes.normal===void 0&&e.computeVertexNormals();for(const n of Object.keys(e.attributes))n!=="position"&&n!=="normal"&&n!=="uv"&&e.deleteAttribute(n);e.attributes.uv||e.setAttribute("uv",new Jt(new Float32Array(e.attributes.position.count*2),2))}const t=Xv(s,!1);return s.forEach(e=>e.dispose()),t}class Qc{constructor(){y(this,"groups",new Map)}add(t,e){let n=this.groups.get(t);n||(n=[],this.groups.set(t,n)),n.push(e)}build(t,e){const n=[];return this.groups.forEach((i,r)=>{const a=ci(i);if(!a)return;const o=new It(a,r);o.castShadow=e.cast,o.receiveShadow=e.receive,o.matrixAutoUpdate=!1,o.updateMatrix(),t.add(o),n.push(o)}),this.groups.clear(),n}}const du=Object.freeze({red:"#E30016",wine:"#72151D",bone:"#F1EDE7",ink:"#030303",white:"#FFFFFF"});function tl(s){let t=String(s).replace("#","").trim();(t.length===3||t.length===4)&&(t=[...t].map(n=>n+n).join(""));const e=parseInt(t.slice(0,6),16);return[e>>16&255,e>>8&255,e&255]}function qv([s,t,e]){const n=i=>Math.max(0,Math.min(255,Math.round(i))).toString(16).padStart(2,"0");return`#${n(s)}${n(t)}${n(e)}`.toUpperCase()}function Xs(s,t,e){const n=tl(s),i=tl(t);return qv(n.map((r,a)=>r+(i[a]-r)*e))}function ra(s,t){const[e,n,i]=tl(s);return`rgba(${e}, ${n}, ${i}, ${t})`}const{red:$v,wine:Zv,bone:jv,ink:Kv,white:Jv}=du,Qv=Object.freeze({night:["ink","wine",.16],dusk:["ink","wine",.42],mesa:["wine","ink",.38],ember:["wine","red",.5],rose:["red","bone",.45],blush:["red","bone",.78],tan:["bone","wine",.24],saddle:["bone","wine",.52],umber:["wine","ink",.62],smoke:["bone","ink",.55],ash:["bone","ink",.32]}),th={red:$v,wine:Zv,bone:jv,ink:Kv,white:Jv},tx=Object.freeze(Object.fromEntries(Object.entries(Qv).map(([s,[t,e,n]])=>[s,Xs(th[t],th[e],n)]))),st=Object.freeze({...du,...tx});Object.freeze({bg:st.night,bgDeep:st.ink,bgHorizon:st.dusk,surface:Xs(st.night,st.wine,.22),surfaceRaised:Xs(st.night,st.wine,.38),fg:st.bone,fgStrong:st.white,fgSecondary:st.ash,fgMuted:st.smoke,accent:st.red,accentDeep:st.wine,accentSoft:st.rose,line:st.ember,paper:st.bone,paperShade:st.tan,paperInk:Xs(st.ink,st.wine,.3),paperLine:st.saddle,player:st.bone,hostile:st.red,collectible:st.rose,world:st.tan,quiet:Xs(st.dusk,st.ash,.25)});Object.freeze({neutral:[st.ink,st.night,st.umber,st.smoke,st.tan,st.bone,st.white],red:[st.ink,st.wine,st.ember,st.red,st.rose,st.blush],moon:[st.ink,st.dusk,st.saddle,st.tan,st.bone,st.white],star:[st.ink,st.wine,st.red,st.rose,st.blush],earth:[st.ink,st.umber,st.mesa,st.saddle,st.tan,st.bone],wine:[st.ink,st.night,st.wine,st.ember,st.rose]});function va(s=1){let t=s>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const bn=Math.PI*2;function ex(s,t,e,n,i,{seed:r=7,density:a=.6,colors:o=[st.tan,st.ember],alpha:l=.08}={}){const h=va(r),c=Math.round(n*i*a/1e3);s.save();for(let u=0;u<c;u++){s.globalAlpha=l*(.4+h()*.6),s.fillStyle=o[h()*o.length|0];const d=h()<.9?1:2;s.fillRect(t+h()*n,e+h()*i,d,d)}s.restore()}function fu(s,t,{angle:e=0,gap:n=4,color:i=st.ink,width:r=1,alpha:a=1,bounds:o}){const[l,h,c,u]=o;s.save(),s.beginPath(),t(s),s.clip(),s.globalAlpha=a,s.strokeStyle=i,s.lineWidth=r;const d=l+c/2,f=h+u/2,m=Math.hypot(c,u)/2+n;s.translate(d,f),s.rotate(e),s.beginPath();for(let v=-m;v<=m;v+=n)s.moveTo(-m,v),s.lineTo(m,v);s.stroke(),s.restore()}function nx(s,t,e,n,{face:i=st.bone,ink:r=st.wine,rim:a=st.ember,phase:o=0,shadow:l=st.night,rings:h=3,hatch:c=!0,glow:u=.18}={}){s.save();const d=(1+Math.cos((o%1+1)%1*bn))/2;if(u*=.15+.85*d,u>0){const m=s.createRadialGradient(t,e,n*.8,t,e,n*2.4);m.addColorStop(0,ra(i,u)),m.addColorStop(1,ra(i,0)),s.fillStyle=m,s.beginPath(),s.arc(t,e,n*2.4,0,bn),s.fill()}s.fillStyle=i,s.beginPath(),s.arc(t,e,n,0,bn),s.fill(),c&&fu(s,m=>{m.arc(t,e,n,0,bn)},{angle:-.5,gap:Math.max(2.2,n/9),color:r,width:Math.max(.6,n/60),alpha:.22,bounds:[t-n,e-n*.1,n*2,n*1.1]}),s.strokeStyle=a;for(let m=0;m<h;m++)s.globalAlpha=.55-m*.12,s.lineWidth=Math.max(.8,n/40),s.beginPath(),s.arc(t,e,n*(1-.1*(m+1)),0,bn),s.stroke();s.globalAlpha=1,s.lineWidth=Math.max(1,n/26),s.beginPath(),s.arc(t,e,n,0,bn),s.stroke();const f=(o%1+1)%1;if(f>.001&&f<.999){s.save(),s.beginPath(),s.arc(t,e,n+.5,0,bn),s.clip(),s.fillStyle=l,s.globalAlpha=.9;const m=Math.cos(f*bn),v=f<.5;s.beginPath(),s.arc(t,e,n+1,v?-Math.PI/2:Math.PI/2,v?Math.PI/2:3*Math.PI/2,!1),s.ellipse(t,e,Math.abs(m)*(n+1),n+1,0,v?Math.PI/2:3*Math.PI/2,v?-Math.PI/2:Math.PI/2,m>0),s.fill(),s.restore()}s.restore()}function eh(s,t,e,n,{seed:i=3,height:r=60,fill:a=st.mesa,strata:o=st.ember,bottom:l,plateaus:h=3,strataAlpha:c=.35}={}){const u=va(i),d=e-t,f=[[t,n-r*(.15+u()*.15)]],m=d/h;for(let g=0;g<h;g++){const p=t+g*m+m*(.1+u()*.15),_=t+(g+1)*m-m*(.1+u()*.15),M=n-r*(.65+u()*.35),x=m*(.06+u()*.06);f.push([p,n-r*(.15+u()*.2)]),f.push([p+x,M]),f.push([_-x,M+(u()-.5)*3]),f.push([_,n-r*(.15+u()*.2)])}f.push([e,n-r*(.12+u()*.15)]);const v=g=>{g.moveTo(t,l??n+2);for(const[p,_]of f)g.lineTo(p,_);g.lineTo(e,l??n+2),g.closePath()};return s.fillStyle=a,s.beginPath(),v(s),s.fill(),fu(s,v,{angle:0,gap:Math.max(3,r/9),color:o,width:1,alpha:c,bounds:[t,n-r,d,(l??n)-n+r+2]}),f}function ix(s,t,e,n,{fill:i=st.ink,arms:r=[.55,.35],seed:a=1}={}){const o=Math.max(3,n*.16),l=va(a);s.save(),s.fillStyle=i;const h=(c,u,d,f)=>{s.beginPath(),s.moveTo(c-d/2,u+f),s.lineTo(c-d/2,u+d/2),s.arc(c,u+d/2,d/2,Math.PI,0),s.lineTo(c+d/2,u+f),s.closePath(),s.fill()};h(t,e-n,o,n),r.forEach((c,u)=>{const d=u%2===0?-1:1,f=e-n*c,m=o*(1.3+l()*.4),v=n*(.22+l()*.12);s.fillRect(t+(d<0?-m:0),f-o*.35,m,o*.7),h(t+d*m,f-v,o*.8,v+o*.35)}),s.restore()}function sx(s,t,e,n,i=st.bone,r=1){s.save(),s.globalAlpha=r,s.fillStyle=i,s.beginPath(),s.moveTo(t,e-n),s.quadraticCurveTo(t,e,t+n,e),s.quadraticCurveTo(t,e,t,e+n),s.quadraticCurveTo(t,e,t-n,e),s.quadraticCurveTo(t,e,t,e-n),s.fill(),s.restore()}function rx(s,t,e,n,{fill:i=st.rose,edge:r=st.bone,rot:a=-Math.PI/2,points:o=5,inner:l=.45}={}){s.save(),s.beginPath();for(let h=0;h<o*2;h++){const c=h%2===0?n:n*l,u=a+h*Math.PI/o,d=t+Math.cos(u)*c,f=e+Math.sin(u)*c;h===0?s.moveTo(d,f):s.lineTo(d,f)}s.closePath(),s.fillStyle=i,s.fill(),s.lineWidth=Math.max(1,n/7),s.strokeStyle=r,s.lineJoin="round",s.stroke(),s.restore()}function ax(s,t,e,n,i,{seed:r=11,count:a=80,color:o=st.bone,max:l=1.6,alpha:h=.55,twinkle:c=0}={}){const u=va(r);for(let d=0;d<a;d++){const f=t+u()*n,m=e+u()*i*u(),v=.4+u()*l,g=u()*bn,p=h*(.35+u()*.65)*(c?.75+.25*Math.sin(c*bn+g):1);v>l*.85?sx(s,f,m,v*2.2,o,p):(s.globalAlpha=p,s.fillStyle=o,s.fillRect(f,m,v,v),s.globalAlpha=1)}}const aa=new Map;function xa(s,t,e,n,i=!1){const r=aa.get(s);if(r)return r;const a=document.createElement("canvas");a.width=t,a.height=e,n(a.getContext("2d"));const o=new tu(a);return o.colorSpace=Ge,i&&(o.wrapS=_s,o.repeat.set(2,1)),o.anisotropy=4,aa.set(s,o),o}function pu(){return xa("moon",512,512,s=>{const t=s.createRadialGradient(256,256,140,256,256,254);t.addColorStop(0,ra(st.bone,.16)),t.addColorStop(1,ra(st.bone,0)),s.fillStyle=t,s.fillRect(0,0,512,512),nx(s,256,256,150,{face:st.bone,ink:st.wine,rim:st.saddle,rings:3,glow:0,phase:.1,shadow:st.night})})}function mu(s){return xa(`mesa:${s}`,4096,256,n=>{eh(n,-40,4136,196,{seed:s,height:150,fill:st.mesa,strata:st.ember,bottom:256,plateaus:7,strataAlpha:.22}),eh(n,-40,4136,238,{seed:s+9,height:80,fill:st.umber,strata:st.mesa,bottom:256,plateaus:11,strataAlpha:.7});for(const[i,r]of[[4096*.13,46],[4096*.47,38],[4096*.81,52]])ix(n,i,250,r,{fill:st.night,seed:(i|0)+s});ex(n,0,0,4096,256,{seed:s+3,density:.5,colors:[st.tan,st.ember],alpha:.12})},!0)}function ox(){return xa("stampStar",128,128,s=>{rx(s,64,66,52,{fill:"#FFFFFF",edge:"#FFFFFF"})})}function lx(){return xa("stars",1024,256,s=>{ax(s,0,0,1024,256,{seed:23,count:120,color:st.tan,max:1.5,alpha:.5})},!0)}function cx(){aa.forEach(s=>s.dispose()),aa.clear()}const oa=new Map;function la(s,t){const e=oa.get(s);if(e)return e;const n={body:[],dark:[],accent:[],light:[]};t(n);const i={body:ci(n.body),dark:ci(n.dark),accent:ci(n.accent),light:ci(n.light)};return oa.set(s,i),i}function wi(s,t,e=0){const n=new ru;n.moveTo(s[0][0],s[0][1]);for(let r=1;r<s.length;r++)n.lineTo(s[r][0],s[r][1]);n.closePath();const i=new _l(n,{depth:t,bevelEnabled:!0,bevelSize:.04,bevelThickness:.04,bevelSegments:1});return i.rotateY(-Math.PI/2),i.translate(e+t,0,0),i}function Ve(s,t,e,n,i,r,a,o,l=0){const h=new $e(s,t,e,n);return i&&h.rotateX(i),l&&h.rotateY(l),h.translate(r,a,o),h}function Qt(s,t,e,n,i,r){return le(s-n/2,t-i/2,e-r/2,s+n/2,t+i/2,e+r/2,1)}function hx(s){return la(`hull:${s}`,t=>{const e=Ze[s],n=e.length,i=e.width,r=s==="bastion"?.85:s==="hornet"?.62:.72,a=i-r*2-.08,o=e.turretHeight;if(s==="hornet"){t.body.push(wi([[-n/2,.45],[n/2-.2,.45],[n/2+.15,.62],[n*.2,o-.02],[-n/2+.3,o],[-n/2,o-.25]],a,-a/2));for(const l of[-1,1])t.body.push(wi([[-n/2-.05,.92],[n/2-.4,.92],[n/2+.1,.7],[n/2+.1,.62],[n/2-.5,1.08],[-n/2+.1,1.08]],r+.1,l*(i/2-r/2)-(r+.1)/2)),t.accent.push(Qt(l*(i/2+.03),.98,0,.06,.07,n*.8)),t.dark.push(Qt(l*(a/2-.15),o+.2,-n/2+.35,.08,.5,.6));t.light.push(Qt(0,.75,n/2+.12,a*.7,.06,.06))}else if(s==="vanguard"){t.body.push(wi([[-n/2,.42],[n/2-.3,.42],[n/2+.1,.72],[n/2-.55,o-.05],[-n/2+.2,o],[-n/2,o-.35]],a,-a/2));for(const l of[-1,1])t.body.push(wi([[-n/2-.1,.98],[n/2-.3,.98],[n/2+.12,.74],[n/2+.12,.66],[n/2-.45,1.16],[-n/2+.05,1.16]],r+.12,l*(i/2-r/2)-(r+.12)/2)),t.accent.push(Qt(l*(i/2+.05),1.06,-.2,.06,.08,n*.62)),t.dark.push(Qt(l*(a/2-.35),o+.06,-n/2+.55,.35,.22,.7)),t.light.push(Qt(l*(a/2-.25),.95,n/2-.05,.35,.1,.06));t.dark.push(Qt(0,o+.02,-n/2+.25,a*.8,.1,.3))}else{t.body.push(wi([[-n/2,.4],[n/2-.15,.4],[n/2+.15,.95],[n/2-.35,o-.02],[-n/2+.15,o],[-n/2,o-.2]],a,-a/2));for(const l of[-1,1])t.body.push(wi([[-n/2-.1,.55],[n/2-.1,.55],[n/2+.2,.85],[n/2+.2,1.25],[n/2-.3,1.38],[-n/2+.1,1.38]],r+.16,l*(i/2-r/2)-(r+.16)/2)),t.accent.push(Qt(l*(i/2+.09),1,0,.06,.09,n*.75)),t.accent.push(Qt(l*(i/2+.09),.78,0,.06,.05,n*.75)),t.dark.push(Ve(.12,.14,.6,8,0,l*(a/2-.25),o+.25,-n/2+.3)),t.light.push(Qt(l*(a/2-.3),1,n/2+.16,.4,.12,.05));t.dark.push(Qt(0,1.15,n/2-.02,a*.92,.35,.18))}t.accent.push(Qt(0,o-.25,-n/2-.04,a*.7,.07,.04))})}function ux(s){return la(`wheels:${s}`,t=>{const e=Ze[s],n=e.length,i=e.width,r=s==="bastion"?6:5,a=s==="hornet"?.3:.34;for(const o of[-1,1]){const l=o*(i/2+.01);for(let h=0;h<r;h++){const c=-n/2+.55+h*(n-1.1)/(r-1);t.dark.push(nh(Ve(a,a,.12,12,0,0,0,0),l,.42,c)),t.accent.push(nh(Ve(.07,.07,.14,6,0,0,0,0),l+o*.01,.42,c))}}})}function nh(s,t,e,n){return s.rotateZ(Math.PI/2),s.translate(t,e,n),s}function dx(s,t){const e=t==="bastion"?1.12:t==="hornet"?.88:1,n=Ce[s].barrelLength,i=la(`turret:${s}:${t}`,a=>{const o=e;if(s==="plasma")a.body.push(Ve(.95*o,1.1*o,.55,6,0,0,.28,-.05,Math.PI/6)),a.dark.push(Ve(1.12*o,1.15*o,.1,6,0,0,.02,-.05,Math.PI/6)),a.accent.push(Qt(0,.4,-1*o,.9*o,.06,.06)),a.dark.push(Qt(.55*o,.62,-.5,.25,.18,.5)),a.light.push(Qt(.55*o,.62,-.24,.12,.08,.04));else if(s==="rail"){a.body.push(wi([[-1*o,0],[.7*o,0],[1*o,.25],[.6*o,.5],[-.9*o,.5]],1.6*o,-.8*o)),a.dark.push(Qt(0,.6,-.6,1.1*o,.22,.6)),a.accent.push(Qt(0,.72,-.6,.9*o,.04,.5));for(const l of[-1,1])a.accent.push(Qt(l*.82*o,.25,0,.04,.06,1.4*o))}else if(s==="volt"){const l=new pi(.95*o,16,8,0,Math.PI*2,0,Math.PI/2);l.scale(1,.7,1.1),a.body.push(l),a.dark.push(Ve(1*o,1.05*o,.12,16,0,0,.02,0)),a.accent.push(Ve(.98*o,.98*o,.05,16,0,0,.12,0)),a.light.push(Qt(0,.62*o,-.4,.3,.06,.3))}else a.body.push(Qt(0,.3,-.1,1.5*o,.6,1.5*o)),a.dark.push(Ve(.6*o,.65*o,.25,12,0,0,.6,-.1)),a.accent.push(Qt(0,.45,.66*o,1.2*o,.05,.04))}),r=la(`barrel:${s}:${t}`,a=>{const o=e;if(s==="plasma"){a.body.push(Qt(0,0,.55,.55*o,.45*o,.6)),a.dark.push(Ve(.17*o,.2*o,n-.4,12,Math.PI/2,0,0,.4+(n-.4)/2));for(let l=0;l<3;l++)a.accent.push(Ve(.23*o,.23*o,.07,12,Math.PI/2,0,0,1+l*.35));a.dark.push(Ve(.27*o,.25*o,.35,8,Math.PI/2,0,0,n-.15)),a.light.push(Ve(.12*o,.12*o,.02,10,Math.PI/2,0,0,n+.03))}else if(s==="rail"){a.body.push(Qt(0,0,.7,.6*o,.4*o,.6));for(const l of[-1,1])a.dark.push(Qt(l*.17*o,0,.4+(n-.4)/2,.12*o,.3*o,n-.4));a.accent.push(Qt(0,0,.5+(n-.5)/2,.06,.08*o,n-.6));for(let l=0;l<4;l++)a.dark.push(Qt(0,.19*o,1+l*.6,.48*o,.06,.12));a.light.push(Qt(0,0,n,.2*o,.1,.03))}else if(s==="volt"){a.body.push(Qt(0,0,.6,.45*o,.4*o,.5)),a.dark.push(Ve(.13*o,.17*o,n-.6,10,Math.PI/2,0,0,.6+(n-.6)/2));for(let l=0;l<3;l++){const h=new Ss(.24*o,.05,6,16);h.translate(0,0,1+l*.32),a.accent.push(h)}for(let l=0;l<3;l++){const h=l/3*Math.PI*2,c=Qt(0,0,0,.06,.06,.5);c.rotateX(.35),c.translate(0,.16*o,0),c.rotateZ(h),c.translate(0,0,n-.2),a.dark.push(c)}a.light.push(new pi(.11*o,8,6).translate(0,0,n))}else{a.body.push(Qt(0,.05,.75,1.15*o,.85*o,1.5));for(const l of[-1,1])for(const h of[-1,1])a.dark.push(Ve(.19*o,.19*o,.3,10,Math.PI/2,l*.27*o,.05+h*.21*o,n-.05)),a.light.push(Ve(.12*o,.12*o,.02,8,Math.PI/2,l*.27*o,.05+h*.21*o,n+.11));a.accent.push(Qt(0,.5*o,.75,1.17*o,.05,1.3))}});return{turret:i,barrel:r}}class gu{constructor(t,e,n){y(this,"root",new ze);y(this,"hull",new ze);y(this,"turret",new ze);y(this,"barrelPivot",new ze);y(this,"recoil",new ze);y(this,"shield");y(this,"trackTex");y(this,"bodyMat");y(this,"darkMat");y(this,"accentMat");y(this,"lightMat");y(this,"trackMats",[]);y(this,"ownGeos",[]);y(this,"shieldMat");y(this,"look");y(this,"accentColor",new gt);y(this,"baseBody",new gt);this.look=t;const i=Ze[t.hull];this.bodyMat=new ps({color:t.body,metalness:t.metal,roughness:.45,envMap:e,envMapIntensity:.5}),this.darkMat=new ps({color:853253,metalness:.8,roughness:.45,envMap:e,envMapIntensity:.8}),this.accentColor.setHex(t.accent).multiplyScalar(1.45),this.baseBody.setHex(t.body),this.accentMat=new Se({color:this.accentColor.clone(),toneMapped:!1}),this.lightMat=new Se({color:new gt(t.light).multiplyScalar(1.25),toneMapped:!1});const r=(f,m)=>{const v=[[m.body,this.bodyMat],[m.dark,this.darkMat],[m.accent,this.accentMat],[m.light,this.lightMat]];for(const[g,p]of v){if(!g)continue;const _=new It(g,p);_.castShadow=n&&p!==this.accentMat&&p!==this.lightMat,f.add(_)}},a=t.hull==="bastion"?.85:t.hull==="hornet"?.62:.72,o=zv(),l=o.clone(),h=o.clone();for(const f of[l,h])f.needsUpdate=!0,f.wrapS=f.wrapT=_s,f.repeat.set(1,i.length/1.2);this.trackTex=[l,h];for(const[f,m]of[[1,l],[-1,h]]){const v=new ps({map:m,color:9734535,metalness:.6,roughness:.7});this.trackMats.push(v);const g=new Fe(a,.86,i.length+.1),p=g.attributes.position,_=g.attributes.uv;for(let x=0;x<p.count;x++)_.setXY(x,(p.getX(x)+p.getY(x))/a,p.getZ(x)/i.length+.5);g.translate(f*(i.width/2-a/2),.43,0),this.ownGeos.push(g);const M=new It(g,v);M.castShadow=n,this.hull.add(M)}r(this.hull,hx(t.hull)),r(this.hull,ux(t.hull));const{turret:c,barrel:u}=dx(t.weapon,t.hull);this.turret.position.y=i.turretHeight,r(this.turret,c),this.barrelPivot.position.y=.42,this.turret.add(this.barrelPivot),this.barrelPivot.add(this.recoil),r(this.recoil,u),this.shieldMat=new ge({transparent:!0,depthWrite:!1,blending:We,uniforms:{uColor:{value:new gt(16250353)},uTime:{value:0},uAlpha:{value:1}},vertexShader:`
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
        }`});const d=new pi(1,24,14);this.ownGeos.push(d),this.shield=new It(d,this.shieldMat),this.shield.scale.set(i.width*.85,i.turretHeight*1.5,i.length*.7),this.shield.position.y=i.turretHeight*.5,this.shield.visible=!1,this.root.add(this.hull,this.turret,this.shield)}setTracks(t,e){this.trackTex[0].offset.y=-t/1.2,this.trackTex[1].offset.y=-e/1.2}setShield(t,e,n){this.shield.visible=t,t&&(this.shieldMat.uniforms.uTime.value=e,this.shieldMat.uniforms.uAlpha.value=n)}setWreck(t){this.bodyMat.color.copy(this.baseBody).multiplyScalar(1-t*.85),this.accentMat.color.copy(this.accentColor).multiplyScalar(1-t),this.lightMat.visible=t<.5}setHitFlash(t){this.bodyMat.emissive.setRGB(t*.32,t*.22,t*.14)}dispose(){this.root.removeFromParent(),this.bodyMat.dispose(),this.darkMat.dispose(),this.accentMat.dispose(),this.lightMat.dispose(),this.shieldMat.dispose(),this.trackMats.forEach(t=>t.dispose()),this.trackTex.forEach(t=>t.dispose()),this.ownGeos.forEach(t=>t.dispose())}}function fx(){oa.forEach(s=>{s.body?.dispose(),s.dark?.dispose(),s.accent?.dispose(),s.light?.dispose()}),oa.clear()}class px{constructor(t){y(this,"scene",new ta);y(this,"camera",new ke(38,1,.1,400));y(this,"mats");y(this,"geos",[]);y(this,"turntable",new ze);y(this,"rings",[]);y(this,"model",null);y(this,"lookKey","");y(this,"env");y(this,"spinBoost",0);y(this,"offset",.32);y(this,"vw",1);y(this,"vh",1);this.env=t,this.mats=new uu(t),this.scene.background=new gt(1705480),this.scene.fog=new da(1902345,.028),this.scene.add(new cu(14866130,1705480,.75));const e=new mv(15855079,70,40,.5,.7,1.4);e.position.set(4,12,6),e.target.position.set(0,0,0),e.castShadow=!0,e.shadow.mapSize.set(1024,1024),this.scene.add(e,e.target);const n=new ia(qt.cyan,18,18,1.6);n.position.set(-6,2.5,-2);const i=new ia(qt.amber,16,18,1.6);i.position.set(6,2.5,-3),this.scene.add(n,i);const r=new It(this.geo(new gl(40,64).rotateX(-Math.PI/2)),this.mats.surface("deck"));r.receiveShadow=!0,this.scene.add(r);const a=new It(this.geo(new $e(4.2,4.4,.3,64)),this.mats.surface("deck"));a.position.y=.15,a.receiveShadow=!0,this.turntable.add(a),this.scene.add(this.turntable);for(let d=0;d<3;d++){const f=new It(this.geo(new Ss(4.6+d*1.1,.03+d*.01,6,96).rotateX(Math.PI/2)),this.mats.glow(d===1?"amber":"cyan",1.6));f.position.y=.05+d*.02,this.rings.push(f),this.scene.add(f)}for(let d=-6;d<=6;d++){const f=d*2.4,m=-11-Math.abs(d)*.4,v=new It(this.geo(le(f-1.15,0,m-.2,f+1.15,2.2+(d%2?.25:0),m+.2)),this.mats.surface("darkMetal"));if(this.scene.add(v),d%3===0){const g=new It(this.geo(le(f-.18,0,m-.25,f+.18,3.6,m+.25)),this.mats.surface("metal")),p=new It(this.geo(le(f-.22,3.6,m-.22,f+.22,4.1,m+.22)),this.mats.glow(d===0?"amber":"blue",1.1));this.scene.add(g,p)}}const o=new It(this.geo(new $e(90,90,70,64,1,!0)),this.mats.track(new Se({map:lx(),side:we,transparent:!0,depthWrite:!1,fog:!1})));o.position.y=40,o.renderOrder=-10,this.scene.add(o);const l=new fs(this.mats.track(new Di({map:pu(),transparent:!0,depthWrite:!1,fog:!1,toneMapped:!1,color:new gt(.92,.9,.88)})));l.position.set(-36,10,-62),l.scale.set(14,14,1),l.renderOrder=-9,this.scene.add(l);const h=new It(this.geo(new $e(80,80,15,64,1,!0)),this.mats.track(new Se({map:mu(5),side:we,transparent:!0,alphaTest:.5,depthWrite:!1,fog:!1,color:new gt(.55,.5,.5)})));h.position.y=4.5,h.renderOrder=-8,this.scene.add(h);const c=this.mats.track(new Di({map:ga(),color:new gt(qt.amber).multiplyScalar(.18),transparent:!0,blending:We,depthWrite:!1})),u=new fs(c);u.scale.set(16,6,1),u.position.set(0,.3,0),this.scene.add(u)}geo(t){return this.geos.push(t),t}setLook(t){const e=JSON.stringify(t);e!==this.lookKey&&(this.lookKey=e,this.model?.dispose(),this.model=new gu(t,this.env,!0),this.model.root.position.y=.3,this.model.turret.position.y=Ze[t.hull].turretHeight,this.turntable.add(this.model.root),this.spinBoost=1.6)}resize(t,e){this.vw=Math.max(1,t),this.vh=Math.max(1,e),this.offset=t<900?0:.3}update(t,e){ms.value=e,this.spinBoost=Math.max(0,this.spinBoost-t),this.turntable.rotation.y+=t*(.25+this.spinBoost*1.5),this.model&&(this.model.turret.rotation.y=Math.sin(e*.4)*.6,this.model.barrelPivot.rotation.x=-.05-Math.sin(e*.6)*.05,this.model.setTracks(e*.6,e*.6)),this.rings.forEach((r,a)=>r.rotation.y=e*(a%2?-.2:.15));const n=.6+Math.sin(e*.08)*.25,i=15.5;this.camera.position.set(Math.sin(n)*i,4.6,Math.cos(n)*i),this.camera.lookAt(0,1.1,0),this.camera.setViewOffset(this.vw,this.vh,-this.offset*this.vw*.5,0,this.vw,this.vh)}dispose(){this.model?.dispose(),this.geos.forEach(t=>t.dispose()),this.mats.dispose()}}const vu=.6;function li(s,t,e){let n;return s.axis==="x"?n=(t-s.minX)/(s.maxX-s.minX):n=(e-s.minZ)/(s.maxZ-s.minZ),n=n<0?0:n>1?1:n,s.dir===-1&&(n=1-n),s.h0+(s.h1-s.h0)*n}class mx{constructor(t){y(this,"boxes");y(this,"ramps");y(this,"solidRamps");y(this,"half");this.boxes=t.boxes,this.ramps=t.ramps,this.half=t.half,this.solidRamps=t.ramps.map(e=>e.bridge!==!0)}surfaceHeight(t,e,n,i=sa){const r=n+i;let a=0;const o=this.boxes;for(let h=0;h<o.length;h++){const c=o[h];!c.walkable||c.maxY>r||c.maxY<=a||t<c.minX||t>c.maxX||e<c.minZ||e>c.maxZ||(a=c.maxY)}const l=this.ramps;for(let h=0;h<l.length;h++){const c=l[h];if(t<c.minX||t>c.maxX||e<c.minZ||e>c.maxZ)continue;const u=li(c,t,e);u<=r&&u>a&&(a=u)}return a}circleBlocked(t,e,n,i){return this.resolveCircle(gx.set(t,e),n,i,null)}resolveCircle(t,e,n,i){let r=!1;const a=e+Nv,o=e+sa,l=this.boxes;for(let c=0;c<l.length;c++){const u=l[c];!u.blocksTanks||u.maxY<=o||u.minY>=a||t.x<u.minX-n||t.x>u.maxX+n||t.z<u.minZ-n||t.z>u.maxZ+n||ih(t,n,u.minX,u.minZ,u.maxX,u.maxZ,i)&&(r=!0)}const h=this.ramps;for(let c=0;c<h.length;c++){const u=h[c];if(t.x<u.minX-n||t.x>u.maxX+n||t.z<u.minZ-n||t.z>u.maxZ+n)continue;const d=t.x<u.minX?u.minX:t.x>u.maxX?u.maxX:t.x,f=t.z<u.minZ?u.minZ:t.z>u.maxZ?u.maxZ:t.z,m=li(u,d,f);m<=o||!this.solidRamps[c]&&m-vu>=a||t.x>=u.minX&&t.x<=u.maxX&&t.z>=u.minZ&&t.z<=u.maxZ&&li(u,t.x,t.z)<=o||ih(t,n,u.minX,u.minZ,u.maxX,u.maxZ,i)&&(r=!0)}return r}raycast(t,e,n,i,r,a,o,l,h=!0){let c=o,u=0,d=0,f=0,m=!1;if(r<-1e-9){const x=-e/r;x>=0&&x<c&&(c=x,u=0,d=1,f=0,m=!0)}const v=1/(i||1e-12),g=1/(r||1e-12),p=1/(a||1e-12),_=this.boxes;for(let x=0;x<_.length;x++){const C=_[x];if(h?!C.blocksShots:!C.blocksTanks)continue;let A=(C.minX-t)*v,R=(C.maxX-t)*v,I=Math.min(A,R),w=Math.max(A,R),b=0;A=(C.minY-e)*g,R=(C.maxY-e)*g;let L=Math.min(A,R);if(L>I&&(I=L,b=1),w=Math.min(w,Math.max(A,R)),A=(C.minZ-n)*p,R=(C.maxZ-n)*p,L=Math.min(A,R),L>I&&(I=L,b=2),w=Math.min(w,Math.max(A,R)),!(w<0||I>w||I>=c)){if(I<0){c=0,u=-i,d=-r,f=-a,m=!0;continue}c=I,m=!0,u=b===0?-Math.sign(i):0,d=b===1?-Math.sign(r):0,f=b===2?-Math.sign(a):0}}const M=this.ramps;for(let x=0;x<M.length;x++){const C=M[x];let A=0,R=0,I;const w=C.axis==="x"?C.maxX-C.minX:C.maxZ-C.minZ,b=(C.h1-C.h0)/w*C.dir;C.axis==="x"?(A=b,I=C.dir===1?C.h0-b*C.minX:C.h0-b*C.maxX):(R=b,I=C.dir===1?C.h0-b*C.minZ:C.h0-b*C.maxZ);const L=r-A*i-R*a;if(Math.abs(L)<1e-9)continue;const O=(A*t+R*n+I-e)/L;if(O<0||O>=c)continue;const z=t+i*O,G=n+a*O;if(z<C.minX||z>C.maxX||G<C.minZ||G>C.maxZ)continue;c=O,m=!0;const Y=Math.sqrt(A*A+1+R*R);u=-A/Y,d=1/Y,f=-R/Y,L>0&&(u=-u,d=-d,f=-f)}if(m&&l){l.t=c,l.x=t+i*c,l.y=e+r*c,l.z=n+a*c;const x=Math.sqrt(u*u+d*d+f*f)||1;l.nx=u/x,l.ny=d/x,l.nz=f/x}return m}segmentClear(t,e,n,i,r,a){return!this.raycast(t,e,n,i-t,r-e,a-n,.999,null,!0)}}const gx={x:0,z:0,set(s,t){return this.x=s,this.z=t,this}};function ih(s,t,e,n,i,r,a){const o=s.x<e?e:s.x>i?i:s.x,l=s.z<n?n:s.z>r?r:s.z;let h=s.x-o,c=s.z-l;const u=h*h+c*c;if(u>=t*t)return!1;if(u>1e-10){const p=Math.sqrt(u);h/=p,c/=p;const _=t-p;return s.x+=h*_,s.z+=c*_,a&&(a.x+=h,a.z+=c),!0}const d=s.x-e,f=i-s.x,m=s.z-n,v=r-s.z,g=Math.min(d,f,m,v);return g===d?(s.x=e-t,a&&(a.x-=1)):g===f?(s.x=i+t,a&&(a.x+=1)):g===m?(s.z=n-t,a&&(a.z-=1)):(s.z=r+t,a&&(a.z+=1)),!0}const vx=new Set(["containerCyan","containerMagenta","containerSteel","containerAmber"]);class xx{constructor(t,e,n,i){y(this,"group",new ze);y(this,"mats");y(this,"geos",[]);y(this,"spin",[]);y(this,"blinkers",[]);y(this,"pickups",[]);y(this,"cpRingMat",null);y(this,"cpBeamMat",null);y(this,"arena");this.arena=t,this.mats=new uu(e),this.group.name=`arena:${t.id}`,this.buildStatic(n),this.buildSky();for(const r of t.decor)this.buildDecor(r,n);this.buildSpawnPads(),i&&this.buildControlPoint(),this.buildPickups()}track(t){return this.geos.push(t),t}buildStatic(t){const e=this.arena,n=new Qc,i=new Qc,r=e.half+2;n.add(this.mats.surface("floor"),le(-r,-.5,-r,r,0,r,12));for(const c of e.boxes){if(c.hidden)continue;const u=vx.has(c.mat),d=u?3:c.mat==="concrete"?2:4,f=u?2.6:c.mat==="concrete"?1.3:d;if(c.mat==="barrier"){const m=new It(this.track(le(c.minX,c.minY,c.minZ,c.maxX,c.maxY,c.maxZ,1)),this.mats.surface("barrier"));m.renderOrder=2,this.group.add(m);const g=c.maxX-c.minX>c.maxZ-c.minZ?[[c.minX,(c.minZ+c.maxZ)/2],[c.maxX,(c.minZ+c.maxZ)/2]]:[[(c.minX+c.maxX)/2,c.minZ],[(c.minX+c.maxX)/2,c.maxZ]];for(const[p,_]of g)n.add(this.mats.surface("darkMetal"),le(p-.35,0,_-.35,p+.35,c.maxY+.3,_+.35)),i.add(this.mats.glow("cyan",2.6),le(p-.4,c.maxY+.1,_-.4,p+.4,c.maxY+.25,_+.4));continue}n.add(this.mats.surface(c.mat),le(c.minX,c.minY,c.minZ,c.maxX,c.maxY,c.maxZ,d,f)),c.trim&&c.trim!=="none"&&this.addTrim(i,c,c.trim),(c.mat==="labDark"||c.mat==="lab")&&c.maxY-c.minY>=6&&this.addWindows(i,c),u&&this.addContainerFrame(n,c)}for(const c of e.ramps){const u=[c.minX,c.minX,c.maxX,c.maxX],d=[c.minZ,c.maxZ,c.maxZ,c.minZ],f=u.map((p,_)=>li(c,p,d[_])),m=c.bridge?f.map(p=>p-vu):[0,0,0,0];n.add(this.mats.surface(c.mat),Yv(u,d,f,m,4));const v=c.bridge?"cyan":"amber",g=.06;if(c.axis==="x")for(const p of[c.minZ+.25,c.maxZ-.25]){const _=zr(c.minX,p,c.maxX,p,0,.18,.08);sh(_,c.minX,c.maxX,li(c,c.minX,p)+g,li(c,c.maxX,p)+g,"x"),i.add(this.mats.glow(v,2),_)}else for(const p of[c.minX+.25,c.maxX-.25]){const _=zr(p,c.minZ,p,c.maxZ,0,.18,.08);sh(_,c.minZ,c.maxZ,li(c,p,c.minZ)+g,li(c,p,c.maxZ)+g,"z"),i.add(this.mats.glow(v,2),_)}}const a=4,o=e.boxes.find(c=>c.mat==="boundary")?.maxY??6,l=new ze,h=this.mats.surface("barrier");for(const[c,u,d,f]of[[-e.half,-e.half,e.half,-e.half],[-e.half,e.half,e.half,e.half],[-e.half,-e.half,-e.half,e.half],[e.half,-e.half,e.half,e.half]]){const m=Math.hypot(d-c,f-u),v=new It(this.track(new gn(m,a)),h);v.position.set((c+d)/2,o+a/2,(u+f)/2),v.rotation.y=Math.atan2(d-c,f-u)+Math.PI/2,v.renderOrder=2,l.add(v)}this.group.add(l),n.build(this.group,{cast:t.shadows,receive:t.shadows}),i.build(this.group,{cast:!1,receive:!1})}addTrim(t,e,n){const i=this.mats.glow(n,2.4),r=e.maxY-.08,a=.14,o=.03;t.add(i,le(e.minX-o,r-a,e.minZ-o,e.maxX+o,r,e.minZ-o+a)),t.add(i,le(e.minX-o,r-a,e.maxZ+o-a,e.maxX+o,r,e.maxZ+o)),t.add(i,le(e.minX-o,r-a,e.minZ-o,e.minX-o+a,r,e.maxZ+o)),t.add(i,le(e.maxX+o-a,r-a,e.minZ-o,e.maxX+o,r,e.maxZ+o))}addWindows(t,e){const n=this.mats.glow(13875639,.95),i=.04;for(const r of[.38,.7]){const a=e.minY+(e.maxY-e.minY)*r,o=a+.7;for(let l=e.minX+1;l<e.maxX-1.5;l+=2.4)t.add(n,le(l,a,e.minZ-i,l+1.4,o,e.minZ)),t.add(n,le(l,a,e.maxZ,l+1.4,o,e.maxZ+i));for(let l=e.minZ+1;l<e.maxZ-1.5;l+=2.4)t.add(n,le(e.minX-i,a,l,e.minX,o,l+1.4)),t.add(n,le(e.maxX,a,l,e.maxX+i,o,l+1.4))}}addContainerFrame(t,e){const n=this.mats.surface("trim"),i=.16;for(const[r,a]of[[e.minX,e.minZ],[e.maxX-i,e.minZ],[e.minX,e.maxZ-i],[e.maxX-i,e.maxZ-i]])t.add(n,le(r-.02,e.minY,a-.02,r+i+.02,e.maxY,a+i+.02))}buildSky(){const t=this.arena,e=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches,n=this.mats.track(new ge({side:we,depthWrite:!1,fog:!1,uniforms:{uTop:{value:new gt(t.sky.top)},uBottom:{value:new gt(t.sky.bottom)},uHaze:{value:new gt(4722195).multiplyScalar(.55)},uStar:{value:new gt(13875639).multiplyScalar(.55)},uTwinkle:{value:e?0:.3},uTime:ms},vertexShader:`
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_Position = p.xyww;
        }`,fragmentShader:`
        uniform vec3 uTop;
        uniform vec3 uBottom;
        uniform vec3 uHaze;
        uniform vec3 uStar;
        uniform float uTwinkle;
        uniform float uTime;
        varying vec3 vDir;
        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        void main() {
          float h = vDir.y;
          vec3 c = mix(uBottom, uTop, smoothstep(-0.05, 0.55, h));
          // Warm dusk band along the horizon.
          c += uHaze * exp(-abs(h) * 9.0);
          // Quiet engraved stars, low contrast so they never compete with pickups.
          vec2 g = floor(vDir.xz / max(0.15, h + 0.2) * 220.0);
          float s = step(0.9965, hash(g)) * smoothstep(0.12, 0.5, h);
          c += uStar * s * (1.0 - uTwinkle + uTwinkle * sin(uTime * 1.5 + hash(g) * 30.0));
          gl_FragColor = vec4(c, 1.0);
        }`})),i=new It(this.track(new pi(900,32,16)),n);i.renderOrder=-10,i.frustumCulled=!1,this.group.add(i);const r=t.id==="docks"?new D(1,.22,.6):new D(.6,.22,1);r.normalize().multiplyScalar(640);const a=new fs(this.mats.track(new Di({map:pu(),transparent:!0,depthWrite:!1,fog:!1,toneMapped:!1,color:new gt(.92,.9,.88)})));a.position.copy(r),a.scale.set(150,150,1),a.renderOrder=-9,a.frustumCulled=!1,this.group.add(a);const o=new It(this.track(new $e(560,560,130,96,1,!0)),this.mats.track(new Se({map:mu(t.id==="docks"?3:9),side:we,transparent:!0,alphaTest:.5,depthWrite:!1,fog:!1,color:new gt(.5,.46,.46)})));o.position.y=40,o.renderOrder=-8,o.frustumCulled=!1,this.group.add(o)}buildDecor(t,e){switch(t.kind){case"sign":{const n={cyan:"#F1EDE7",magenta:"#EEB9B9",amber:"#D3B9B7"}[t.color],i=this.mats.track(new Se({map:Bv(t.text,n),toneMapped:!1,color:new gt(1.15,1.15,1.15)})),r=new It(this.track(new gn(t.w,t.h)),i);r.position.set(t.x,t.y,t.z),r.rotation.y=t.yaw,this.group.add(r);break}case"light":{const n=this.sprite(qt[t.color],2.2,.55);if(n.position.set(t.x,t.y,t.z),this.group.add(n),e.maxLights>0&&this.group.children.filter(i=>i.isPointLight).length<e.maxLights){const i=new ia(qt[t.color],t.intensity*14,t.range*1.6,1.6);i.position.set(t.x,t.y,t.z),this.group.add(i)}break}case"holo":{const n=new ze;n.position.set(t.x,t.y,t.z);const i=this.mats.glow(t.color,1.8);for(let a=0;a<3;a++){const o=new It(this.track(new Ss(t.r*(.35+a*.12),.05,6,64)),i);o.position.y=4+a*.9,o.rotation.x=Math.PI/2,n.add(o),this.spin.push({obj:o,speed:(a%2?-1:1)*(.4+a*.25),axis:"z"})}const r=new It(this.track(new na(.8,0)),this.mats.glow(t.color,2.6));r.position.y=5,n.add(r),this.spin.push({obj:r,speed:1.2,axis:"y"}),this.group.add(n);break}case"strip":{const n=zr(t.x0,t.z0,t.x1,t.z1,t.y,t.w??.16,.08);this.group.add(this.staticMesh(n,this.mats.glow(t.color,2.2)));break}case"crane":{const n=this.mats.surface("darkMetal"),i=62,r=[le(t.x-.9,t.h,t.z-i/2-1,t.x+.9,t.h+1.8,t.z+i/2+1),le(t.x-.5,t.h+1.8,t.z-6,t.x+.5,t.h+9,t.z-4.5),le(t.x-1.6,t.h-3,t.z-2,t.x+1.6,t.h,t.z+2),le(Math.min(t.x,t.x-34*Math.sign(t.x||1)),t.h+1.8,t.z-.7,Math.max(t.x,t.x-34*Math.sign(t.x||1)),t.h+3,t.z+.7),le(t.x-20*Math.sign(t.x||1)-3,12.5,t.z-1.25,t.x-20*Math.sign(t.x||1)+3,15.1,t.z+1.25)],a=ci(r),o=this.staticMesh(a,n);o.castShadow=e.shadows,this.group.add(o);const l=ci([le(t.x-20*Math.sign(t.x||1)-2,15.1,t.z-.05,t.x-20*Math.sign(t.x||1)-1.9,t.h+1.8,t.z+.05),le(t.x-20*Math.sign(t.x||1)+1.9,15.1,t.z-.05,t.x-20*Math.sign(t.x||1)+2,t.h+1.8,t.z+.05)]);this.group.add(this.staticMesh(l,this.mats.surface("trim"))),this.group.add(this.staticMesh(zr(t.x,t.z-i/2,t.x,t.z+i/2,t.h-.05,.25,.1),this.mats.glow("amber",2)));for(const h of[t.z-i/2,t.z+i/2,t.z]){const c=this.sprite(qt.magenta,1.6,1);c.position.set(t.x,t.h+2.4,h),this.blinkers.push(c),this.group.add(c)}break}case"pylon":{const n=ci([le(t.x-.3,0,t.z-.3,t.x+.3,t.h,t.z+.3)]);this.group.add(this.staticMesh(n,this.mats.surface("darkMetal"))),this.group.add(this.staticMesh(le(t.x-.36,t.h-3,t.z-.36,t.x+.36,t.h-2.7,t.z+.36),this.mats.glow(t.color,2.4)));const i=this.sprite(qt[t.color],3.5,.55);i.position.set(t.x,t.h+.4,t.z),this.group.add(i);break}case"water":{const n=this.mats.track(new ps({color:1377799,roughness:.18,metalness:.85,envMapIntensity:1.2})),i=new It(this.track(new gn(1400,1400)),n);i.rotation.x=-Math.PI/2,i.position.y=t.y,this.group.add(i);break}}}buildSpawnPads(){const t=this.arena.spawns,e=(n,i)=>{for(const r of n){const a=new It(this.track(new nr(2.4,2.65,40)),this.mats.glow(i,1.6));a.rotation.x=-Math.PI/2,a.position.set(r.x,.04,r.z),this.group.add(a)}};e(t.blue,"blue"),e(t.magenta,"magenta")}buildControlPoint(){const t=this.arena.controlPoint;this.cpRingMat=this.mats.track(new ge({transparent:!0,depthWrite:!1,blending:We,uniforms:{uTime:ms,uProgress:{value:0},uColor:{value:new gt(qt.amber)},uFill:{value:new gt(qt.blue)},uContested:{value:0}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
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
        }`}));const e=new It(this.track(new gn(t.r*2,t.r*2)),this.cpRingMat);e.rotation.x=-Math.PI/2,e.position.set(t.x,t.y+.05,t.z),e.renderOrder=3,this.group.add(e),this.cpBeamMat=this.mats.track(new ge({transparent:!0,depthWrite:!1,side:qe,blending:We,uniforms:{uTime:ms,uColor:{value:new gt(qt.amber)}},vertexShader:"varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`
        uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
        void main() {
          float a = (1.0 - vUv.y) * 0.22 * (0.7 + 0.3 * sin(vUv.y * 30.0 - uTime * 3.0));
          gl_FragColor = vec4(uColor * 1.4, a);
        }`}));const n=new It(this.track(new $e(t.r*.96,t.r,7,48,1,!0)),this.cpBeamMat);n.position.set(t.x,t.y+3.5,t.z),n.renderOrder=3,this.group.add(n)}buildPickups(){for(const t of this.arena.pickups){const e=new ze;e.position.set(t.x,t.y,t.z);const n=t.kind==="repair"?qt.green:t.kind==="overdrive"?qt.amber:qt.cyan,i=this.staticMesh(new $e(2,2.2,.18,24),this.mats.surface("darkMetal"));i.position.y=.09,i.updateMatrix(),e.add(i);const r=this.mats.track(new Se({color:new gt(n).multiplyScalar(2),toneMapped:!1,transparent:!0})),a=new It(this.track(new nr(1.6,1.9,32)),r);a.rotation.x=-Math.PI/2,a.position.y=.2,e.add(a);const o=new ze,l=this.mats.glow(n,2.2);if(t.kind==="repair")o.add(new It(this.track(new Fe(1.1,.35,.35)),l)),o.add(new It(this.track(new Fe(.35,1.1,.35)),l));else if(t.kind==="overdrive"){o.add(new It(this.track(new na(.6,0)),l));const u=new It(this.track(new Ss(.85,.05,6,24)),l);o.add(u)}else for(let u=0;u<2;u++){const d=new It(this.track(new vl(.45,.6,4)),l);d.position.y=u*.5-.25,o.add(d)}const h=this.sprite(n,3,.35),c=new fs(this.mats.track(new Di({map:ox(),color:n,transparent:!0,depthWrite:!1,toneMapped:!1})));c.scale.set(1.5,1.5,1),c.position.y=1.35,o.add(c),o.add(h),o.position.y=1.6,e.add(o),this.group.add(e),this.pickups.push({group:e,icon:o,ring:a,ringMat:r,baseY:1.6})}}sprite(t,e,n,i=ga()){const r=this.mats.track(new Di({map:i,color:new gt(t).multiplyScalar(1.3),transparent:!0,opacity:n,blending:We,depthWrite:!1,toneMapped:!1})),a=new fs(r);return a.scale.set(e,e,1),a}staticMesh(t,e){this.track(t);const n=new It(t,e);return n.matrixAutoUpdate=!1,n.updateMatrix(),n}update(t,e,n){for(const r of this.spin)r.axis==="y"?r.obj.rotation.y=t*r.speed:r.obj.rotation.z=t*r.speed;const i=Math.sin(t*3)>.2?1:.15;for(const r of this.blinkers)r.material.opacity=i;if(e&&this.cpRingMat&&this.cpBeamMat){const r=this.cpRingMat.uniforms;r.uProgress.value=Math.abs(e.progress),r.uFill.value.setHex(e.progress>=0?qt.blue:qt.red);const a=e.owner==="blue"?qt.blue:e.owner==="magenta"?qt.red:qt.amber;r.uColor.value.setHex(a),r.uContested.value=e.contested?1:0,this.cpBeamMat.uniforms.uColor.value.setHex(a)}if(n)for(let r=0;r<this.pickups.length;r++){const a=this.pickups[r],o=n[r];a.icon.visible=o.active,a.icon.position.y=a.baseY+Math.sin(t*2+r)*.25,a.icon.rotation.y=t*1.4+r,a.ringMat.opacity=o.active?.9:.25}}dispose(){this.group.removeFromParent(),this.group.traverse(t=>{const e=t;e.geometry&&!this.geos.includes(e.geometry)&&this.geos.push(e.geometry)}),this.geos.forEach(t=>t.dispose()),this.mats.dispose()}}function sh(s,t,e,n,i,r){const a=s.attributes.position;for(let o=0;o<a.count;o++){const h=((r==="x"?a.getX(o):a.getZ(o))-t)/(e-t);a.setY(o,a.getY(o)+n+(i-n)*h)}a.needsUpdate=!0,s.computeVertexNormals()}class rh{constructor(t,e){y(this,"points");y(this,"cap");y(this,"pos");y(this,"vel");y(this,"col");y(this,"base");y(this,"alpha");y(this,"size");y(this,"size0");y(this,"grow");y(this,"life");y(this,"maxLife");y(this,"grav");y(this,"drag");y(this,"head",0);y(this,"limit");y(this,"geo",new ye);y(this,"mat");this.cap=t,this.limit=t,this.pos=new Float32Array(t*3),this.vel=new Float32Array(t*3),this.col=new Float32Array(t*3),this.base=new Float32Array(t*3),this.alpha=new Float32Array(t),this.size=new Float32Array(t),this.size0=new Float32Array(t),this.grow=new Float32Array(t),this.life=new Float32Array(t),this.maxLife=new Float32Array(t),this.grav=new Float32Array(t),this.drag=new Float32Array(t),this.geo.setAttribute("position",new Pe(this.pos,3).setUsage(ls)),this.geo.setAttribute("color",new Pe(this.col,3).setUsage(ls)),this.geo.setAttribute("aAlpha",new Pe(this.alpha,1).setUsage(ls)),this.geo.setAttribute("aSize",new Pe(this.size,1).setUsage(ls)),this.geo.boundingSphere=new ki(new D,1e5),this.mat=new ge({transparent:!0,depthWrite:!1,blending:e?We:ui,vertexColors:!0,uniforms:{uScale:{value:500},uMap:{value:ga()}},vertexShader:`
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
        }`}),this.points=new Ug(this.geo,this.mat),this.points.frustumCulled=!1,this.points.renderOrder=e?5:4}setScale(t){this.mat.uniforms.uScale.value=t}emit(t,e,n,i,r,a,o,l,h,c,u,d,f){const m=this.head;this.head=(this.head+1)%this.limit;const v=m*3;this.pos[v]=t,this.pos[v+1]=e,this.pos[v+2]=n,this.vel[v]=i,this.vel[v+1]=r,this.vel[v+2]=a,hi.setHex(o),this.base[v]=hi.r*l,this.base[v+1]=hi.g*l,this.base[v+2]=hi.b*l,this.size0[m]=h,this.grow[m]=c,this.life[m]=u,this.maxLife[m]=u,this.grav[m]=d,this.drag[m]=f}update(t){for(let n=0;n<this.cap;n++){if(this.life[n]<=0){this.alpha[n]!==0&&(this.alpha[n]=0,this.size[n]=0);continue}this.life[n]-=t;const i=n*3,r=Math.exp(-this.drag[n]*t);this.vel[i]*=r,this.vel[i+1]=this.vel[i+1]*r-this.grav[n]*t,this.vel[i+2]*=r,this.pos[i]+=this.vel[i]*t,this.pos[i+1]+=this.vel[i+1]*t,this.pos[i+2]+=this.vel[i+2]*t;const a=Math.max(0,this.life[n]/this.maxLife[n]);this.alpha[n]=a<.7?a/.7:1,this.size[n]=this.size0[n]+this.grow[n]*(1-a),this.col[i]=this.base[i],this.col[i+1]=this.base[i+1],this.col[i+2]=this.base[i+2]}const e=this.geo.attributes;e.position.needsUpdate=!0,e.color.needsUpdate=!0,e.aAlpha.needsUpdate=!0,e.aSize.needsUpdate=!0}clear(){this.life.fill(0),this.alpha.fill(0),this.size.fill(0)}dispose(){this.geo.dispose(),this.mat.dispose()}}function ni(s,t){s.count=t,t&&(s.instanceMatrix.needsUpdate=!0)}const hi=new gt,Mn=new D,ii=new As,rs=new D,be=new ie,ah=new D(0,0,1),_x=new D(0,1,0),an={plasma:15855079,rail:16777215,volt:13875639,nova:15297396,shockwave:15855079,tank:15297396};class Mx{constructor(t,e){y(this,"group",new ze);y(this,"add");y(this,"smoke");y(this,"flashes",[]);y(this,"rings",[]);y(this,"beams",[]);y(this,"scorches",[]);y(this,"lights",[]);y(this,"columns",[]);y(this,"shots",new Map);y(this,"glows",new Map);y(this,"debris");y(this,"debrisState",[]);y(this,"geos",[]);y(this,"mats",[]);y(this,"flashIdx",0);y(this,"ringIdx",0);y(this,"beamIdx",0);y(this,"scorchIdx",0);y(this,"lightIdx",0);y(this,"colIdx",0);y(this,"debrisIdx",0);y(this,"trailTimer",0);y(this,"glowKind",new Map);this.add=new rh(t,!0),this.smoke=new rh(Math.floor(t*.6),!1),this.group.add(this.add.points,this.smoke.points);const n=ga();for(let f=0;f<24;f++){const m=this.mat(new Di({map:n,transparent:!0,blending:We,depthWrite:!1,toneMapped:!1})),v=new fs(m);v.visible=!1,v.renderOrder=6,this.group.add(v),this.flashes.push({obj:v,t:0,dur:0,size:1})}const i=this.geo(new nr(.85,1,48));for(let f=0;f<10;f++){const m=new It(i,this.mat(new Se({transparent:!0,blending:We,depthWrite:!1,side:qe,toneMapped:!1})));m.visible=!1,m.renderOrder=6,this.group.add(m),this.rings.push({obj:m,t:0,dur:0,size:1})}const r=this.geo(new $e(1,1,1,8,1,!0).rotateX(Math.PI/2).translate(0,0,.5));for(let f=0;f<10;f++){const m=new It(r,this.mat(new Se({transparent:!0,blending:We,depthWrite:!1,toneMapped:!1})));m.visible=!1,m.renderOrder=6,this.group.add(m),this.beams.push({obj:m,t:0,dur:0,size:1})}const a=this.geo(new gn(1,1).rotateX(-Math.PI/2)),o=this.mat(new Se({map:Ov(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2}));for(let f=0;f<28;f++){const m=new It(a,o.clone());this.mats.push(m.material),m.visible=!1,m.renderOrder=1,this.group.add(m),this.scorches.push({obj:m,t:0,dur:0,size:1})}const l=this.geo(new $e(1.6,2.2,14,24,1,!0).translate(0,7,0));for(let f=0;f<4;f++){const m=new It(l,this.mat(new Se({transparent:!0,blending:We,depthWrite:!1,side:qe,toneMapped:!1})));m.visible=!1,this.group.add(m),this.columns.push({obj:m,t:0,dur:0,size:1})}for(let f=0;f<e;f++){const m=new ia(16777215,0,18,1.8);m.visible=!1,this.group.add(m),this.lights.push({obj:m,t:0,dur:0,size:1})}const h=(f,m,v,g,p)=>{const _=this.mat(new Se({color:new gt(m).multiplyScalar(v),toneMapped:!1,transparent:g,blending:g?We:ui,depthWrite:!g})),M=new Nc(this.geo(f),_,p);return M.count=0,M.frustumCulled=!1,M.instanceMatrix.setUsage(ls),this.group.add(M),M},c=(f,m,v,g)=>{const p=h(f,16777215,v,!0,g);for(let _=0;_<g;_++)p.setColorAt(_,hi.setHex(an[m]));return this.glowKind.set(p,m),p};this.shots.set("plasma",h(new pi(.28,10,8),qt.white,2.2,!1,96)),this.glows.set("plasma",c(new $e(.42,.05,1,10).rotateX(-Math.PI/2).translate(0,0,-.5),"plasma",1.6,96)),this.shots.set("volt",h(new Fe(.09,.09,1),15855079,2.4,!1,160)),this.glows.set("volt",c(new Fe(.3,.3,1.4),"volt",1.2,160)),this.shots.set("rail",h(new Fe(.14,.14,1),qt.white,3,!1,16)),this.glows.set("rail",c(new Fe(.5,.5,1),"rail",1.2,16));const u=new $e(.13,.13,.9,8).rotateX(Math.PI/2);this.shots.set("nova",h(u,2951693,1,!1,64)),this.glows.set("nova",c(new pi(.32,8,6).translate(0,0,-.55),"nova",1.9,64));const d=this.mat(new ps({color:1246727,metalness:.7,roughness:.6,emissive:new gt(8655388),emissiveIntensity:.6}));this.debris=new Nc(this.geo(new Fe(1,1,1)),d,48),this.debris.count=48,this.debris.frustumCulled=!1,this.debris.instanceMatrix.setUsage(ls);for(let f=0;f<48;f++)this.debrisState.push({x:0,y:-100,z:0,vx:0,vy:0,vz:0,rx:0,ry:0,spin:0,t:0,s:0}),be.makeScale(0,0,0),this.debris.setMatrixAt(f,be);this.group.add(this.debris)}geo(t){return this.geos.push(t),t}mat(t){return this.mats.push(t),t}setPixelScale(t,e){const n=t/(2*Math.tan(e*Math.PI/360));this.add.setScale(n),this.smoke.setScale(n)}setParticleLimit(t){this.add.limit=Math.max(32,Math.min(t,900)),this.smoke.limit=Math.max(24,Math.floor(this.add.limit*.6))}flash(t,e,n,i,r,a,o=2){const l=this.flashes[this.flashIdx];this.flashIdx=(this.flashIdx+1)%this.flashes.length,l.obj.position.set(t,e,n),l.obj.material.color.setHex(i).multiplyScalar(o),l.obj.visible=!0,l.t=a,l.dur=a,l.size=r}ring(t,e,n,i,r,a,o=!0){const l=this.rings[this.ringIdx];this.ringIdx=(this.ringIdx+1)%this.rings.length,l.obj.position.set(t,e,n),l.obj.rotation.set(o?-Math.PI/2:0,0,0),l.obj.material.color.setHex(i).multiplyScalar(2),l.obj.visible=!0,l.t=a,l.dur=a,l.size=r}beam(t,e,n,i,r,a,o,l,h){const c=this.beams[this.beamIdx];this.beamIdx=(this.beamIdx+1)%this.beams.length;const u=Math.hypot(i-t,r-e,a-n);u<.01||(c.obj.position.set(t,e,n),Mn.set(i-t,r-e,a-n).divideScalar(u),c.obj.quaternion.setFromUnitVectors(ah,Mn),c.obj.scale.set(l,l,u),c.obj.material.color.setHex(o).multiplyScalar(3),c.obj.visible=!0,c.t=h,c.dur=h,c.size=l)}light(t,e,n,i,r,a){if(!this.lights.length)return;const o=this.lights[this.lightIdx];this.lightIdx=(this.lightIdx+1)%this.lights.length,o.obj.position.set(t,e,n),o.obj.color.setHex(i),o.obj.visible=!0,o.t=a,o.dur=a,o.size=r}scorch(t,e,n,i){const r=this.scorches[this.scorchIdx];this.scorchIdx=(this.scorchIdx+1)%this.scorches.length,r.obj.position.set(t,e+.03,n),r.obj.rotation.y=Math.random()*Math.PI*2,r.obj.scale.set(i,1,i),r.obj.visible=!0,r.t=24,r.dur=24,r.size=i}column(t,e,n,i){const r=this.columns[this.colIdx];this.colIdx=(this.colIdx+1)%this.columns.length,r.obj.position.set(t,e,n),r.obj.material.color.setHex(i).multiplyScalar(.8),r.obj.visible=!0,r.t=.9,r.dur=.9}sparks(t,e,n,i,r,a,o,l,h){for(let c=0;c<l;c++){const u=i*h*.6+(Math.random()-.5)*h,d=r*h*.6+Math.random()*h*.7,f=a*h*.6+(Math.random()-.5)*h;this.add.emit(t,e,n,u,d,f,o,2.2,.12+Math.random()*.12,-.08,.25+Math.random()*.35,14,2.5)}}smokePuff(t,e,n,i,r,a=.12,o=1.6){for(let l=0;l<i;l++){const h=.12+Math.random()*a;hi.setRGB(h,h*1.02,h*1.1),this.smoke.emit(t+(Math.random()-.5)*r*.5,e,n+(Math.random()-.5)*r*.5,(Math.random()-.5)*1.6,1+Math.random()*1.8,(Math.random()-.5)*1.6,hi.getHex(),1,r*.6,r*1.4,o*(.7+Math.random()*.6),-.4,1.2)}}fire(t,e,n,i,r){for(let a=0;a<i;a++){const o=Math.random()<.5?15156563:15436945;this.add.emit(t+(Math.random()-.5)*r,e+Math.random()*.4,n+(Math.random()-.5)*r,(Math.random()-.5)*1.2,1.5+Math.random()*2,(Math.random()-.5)*1.2,o,1.6,r*.5,r*.4,.35+Math.random()*.35,-1,1)}}muzzle(t,e,n,i,r,a,o){const l=an[o],h=o==="rail"?3.2:o==="volt"?.9:o==="nova"?2.2:2.4;this.flash(t,e,n,l,h,o==="volt"?.05:.09,2.4),o!=="volt"&&this.light(t,e,n,l,o==="rail"?40:18,.08);const c=o==="volt"?2:o==="rail"?10:6;for(let u=0;u<c;u++){const d=4+Math.random()*8;this.add.emit(t,e,n,i*d+(Math.random()-.5)*3,r*d+Math.random()*2,a*d+(Math.random()-.5)*3,l,2,.16,-.1,.18,4,4)}(o==="nova"||o==="plasma")&&this.smokePuff(t,e,n,2,.8,.1,.8)}impact(t,e,n,i,r,a,o,l){const h=an[o];if(o==="volt"){this.sparks(t,e,n,i,r,a,h,l?6:3,6),this.flash(t,e,n,h,1.2,.06);return}o!=="nova"&&(this.sparks(t,e,n,i,r,a,l?15505564:h,o==="rail"?22:12,o==="rail"?14:9),this.flash(t,e,n,h,o==="rail"?3.4:2.2,.12),this.light(t,e,n,h,16,.12),l||this.smokePuff(t,e,n,2,.9,.12,1),!l&&r>.7&&o==="rail"&&this.scorch(t,e,n,1.6))}explosion(t,e,n,i,r,a){const o=i>5;this.flash(t,e,n,16777215,i*1.4,.12,2.6),this.flash(t,e,n,r,i*2.2,.32,2),this.light(t,e+1,n,r,o?70:30,.35),this.sparks(t,e,n,0,1,0,15436174,o?26:12,o?16:10),this.fire(t,e,n,o?18:8,i*.45),this.smokePuff(t,e+.5,n,o?10:4,i*.7,.1,2.2),a!==null&&(this.ring(t,a+.1,n,r,i,.45),this.scorch(t,a,n,i*1.1))}tankDestroyed(t,e,n,i){this.explosion(t,e+1.2,n,7,15226723,e),this.flash(t,e+1.5,n,i,10,.5,1.6),this.ring(t,e+.15,n,i,9,.7);for(let r=0;r<10;r++){const a=this.debrisState[this.debrisIdx];this.debrisIdx=(this.debrisIdx+1)%this.debrisState.length,a.x=t,a.y=e+1.2,a.z=n;const o=Math.random()*Math.PI*2,l=4+Math.random()*8;a.vx=Math.cos(o)*l,a.vz=Math.sin(o)*l,a.vy=5+Math.random()*9,a.rx=Math.random()*6,a.ry=Math.random()*6,a.spin=(Math.random()-.5)*14,a.t=3.5+Math.random(),a.s=.25+Math.random()*.45}}spawnBeam(t,e,n,i){this.column(t,e,n,i),this.ring(t,e+.1,n,i,4,.6);for(let r=0;r<16;r++){const a=r/16*Math.PI*2;this.add.emit(t+Math.cos(a)*2,e+.2,n+Math.sin(a)*2,0,4+Math.random()*4,0,i,2,.25,-.15,.7,0,1)}}pickupBurst(t,e,n,i){this.ring(t,e+.2,n,i,4,.5),this.flash(t,e+1.5,n,i,4,.3);for(let r=0;r<18;r++)this.add.emit(t,e+1.5,n,(Math.random()-.5)*6,2+Math.random()*5,(Math.random()-.5)*6,i,2,.22,-.1,.6,6,2)}shockwave(t,e,n){this.ring(t,e+.2,n,an.shockwave,12,.55),this.ring(t,e+.6,n,16777215,8,.35),this.flash(t,e+1,n,an.shockwave,9,.25),this.light(t,e+1,n,an.shockwave,60,.3);for(let i=0;i<40;i++){const r=i/40*Math.PI*2;this.add.emit(t,e+.4,n,Math.cos(r)*18,1+Math.random()*2,Math.sin(r)*18,an.shockwave,2,.35,.2,.5,2,2.5)}this.smokePuff(t,e+.3,n,8,3,.08,1.4)}updateProjectiles(t,e,n=()=>!1){let i=0,r=0,a=0,o=0;const l=this.shots.get("plasma"),h=this.glows.get("plasma"),c=this.shots.get("volt"),u=this.glows.get("volt"),d=this.shots.get("rail"),f=this.glows.get("rail"),m=this.shots.get("nova"),v=this.glows.get("nova");this.trailTimer-=e;const g=this.trailTimer<=0;g&&(this.trailTimer=.03);for(const p of t){if(!p.active)continue;const _=Math.hypot(p.vx,p.vy,p.vz)||1;Mn.set(p.vx/_,p.vy/_,p.vz/_),ii.setFromUnitVectors(ah,Mn);const M=p.weapon.projectile;M==="plasma"&&i<96?(be.compose(rs.set(p.x,p.y,p.z),ii,Mn.set(1,1,1)),l.setMatrixAt(i,be),be.compose(rs.set(p.x,p.y,p.z),ii,Mn.set(1,1,Math.min(4,_*.045))),h.setMatrixAt(i,be),this.tint(h,i,n(p.owner)),i++):M==="volt"&&r<160?(be.compose(rs.set(p.x,p.y,p.z),ii,Mn.set(1,1,1.6)),c.setMatrixAt(r,be),u.setMatrixAt(r,be),this.tint(u,r,n(p.owner)),r++):M==="rail"&&a<16?(be.compose(rs.set(p.x,p.y,p.z),ii,Mn.set(1,1,7)),d.setMatrixAt(a,be),f.setMatrixAt(a,be),this.tint(f,a,n(p.owner)),a++):M==="nova"&&o<64&&(be.compose(rs.set(p.x,p.y,p.z),ii,Mn.set(1,1,1)),m.setMatrixAt(o,be),v.setMatrixAt(o,be),this.tint(v,o,n(p.owner)),o++,g&&(this.smoke.emit(p.x,p.y,p.z,(Math.random()-.5)*.6,.4,(Math.random()-.5)*.6,2033674,1,.35,1.1,.9,-.2,1.5),this.add.emit(p.x,p.y,p.z,0,0,0,an.nova,1.5,.3,-.25,.12,0,0)))}ni(l,i),ni(h,i),ni(c,r),ni(u,r),ni(d,a),ni(f,a),ni(m,o),ni(v,o);for(const p of[h,u,f,v])p.instanceColor&&(p.instanceColor.needsUpdate=!0)}tint(t,e,n){t.setColorAt(e,hi.setHex(n?qt.red:an[this.glowKind.get(t)]))}update(t){this.add.update(t),this.smoke.update(t);for(const n of this.flashes){if(!n.obj.visible)continue;if(n.t-=t,n.t<=0){n.obj.visible=!1;continue}const i=n.t/n.dur,r=n.size*(1.2-i*.4);n.obj.scale.set(r,r,1),n.obj.material.opacity=i}for(const n of this.rings){if(!n.obj.visible)continue;if(n.t-=t,n.t<=0){n.obj.visible=!1;continue}const i=1-n.t/n.dur,r=n.size*(.15+.85*Math.sqrt(i));n.obj.scale.set(r,r,r),n.obj.material.opacity=1-i}for(const n of this.beams){if(!n.obj.visible)continue;if(n.t-=t,n.t<=0){n.obj.visible=!1;continue}const i=n.t/n.dur,r=n.size*(.4+.6*i);n.obj.scale.x=r,n.obj.scale.y=r,n.obj.material.opacity=i}for(const n of this.scorches)if(n.obj.visible){if(n.t-=t,n.t<=0){n.obj.visible=!1;continue}n.obj.material.opacity=Math.min(1,n.t/4)*.85}for(const n of this.columns){if(!n.obj.visible)continue;if(n.t-=t,n.t<=0){n.obj.visible=!1;continue}const i=n.t/n.dur;n.obj.material.opacity=i*.6,n.obj.scale.set(.6+.6*(1-i),1,.6+.6*(1-i))}for(const n of this.lights)if(n.obj.visible){if(n.t-=t,n.t<=0){n.obj.visible=!1,n.obj.intensity=0;continue}n.obj.intensity=n.size*(n.t/n.dur)*12}let e=!1;for(let n=0;n<this.debrisState.length;n++){const i=this.debrisState[n];if(i.t<=0)continue;e=!0,i.t-=t,i.vy-=22*t,i.x+=i.vx*t,i.y+=i.vy*t,i.z+=i.vz*t,i.y<.15&&i.vy<0&&(i.y=.15,i.vy*=-.3,i.vx*=.6,i.vz*=.6,i.spin*=.5),i.rx+=i.spin*t,i.ry+=i.spin*.7*t;const r=i.t>0?i.s*Math.min(1,i.t):0;ii.setFromAxisAngle(_x,i.ry),be.compose(rs.set(i.x,i.y,i.z),ii,Mn.set(r,r*.6,r*1.4)),this.debris.setMatrixAt(n,be),Math.random()<t*6&&i.t>1&&this.smoke.emit(i.x,i.y,i.z,0,.6,0,1312263,1,.3,.8,.8,-.2,1)}e&&(this.debris.instanceMatrix.needsUpdate=!0)}clear(){this.add.clear(),this.smoke.clear();for(const t of[this.flashes,this.rings,this.beams,this.scorches,this.columns])for(const e of t)e.obj.visible=!1,e.t=0;for(const t of this.lights)t.obj.visible=!1,t.t=0;for(let t=0;t<this.debrisState.length;t++)this.debrisState[t].t=0,be.makeScale(0,0,0),this.debris.setMatrixAt(t,be);this.debris.instanceMatrix.needsUpdate=!0}dispose(){this.group.removeFromParent(),this.add.dispose(),this.smoke.dispose(),this.geos.forEach(t=>t.dispose()),this.mats.forEach(t=>t.dispose())}}function yx(s,t){return s.team==="blue"?s.id===t?s.paint.accent:qt.blue:s.team==="magenta"?qt.red:s.id===t?s.paint.accent:s.isBot?[qt.red,13042968,11209498,14876694][s.id%4]:qt.red}class bx{constructor(t,e,n,i){y(this,"model");y(this,"tank");y(this,"visY",0);y(this,"hitFlash",0);y(this,"wasAlive",!1);y(this,"wreckTime",0);y(this,"popY",0);y(this,"popVy",0);y(this,"popSpin",0);y(this,"popTilt",0);y(this,"smokeTimer",0);y(this,"accent");this.tank=t,this.accent=yx(t,e),this.model=new gu({hull:t.hull.id,weapon:t.weapon.id,body:t.paint.body,metal:t.paint.metal,accent:this.accent,light:t.team==="magenta"?14876694:15855079},n,i),this.visY=t.y}get accentColor(){return this.accent}onHit(){this.hitFlash=Math.min(1,this.hitFlash+.6)}onDestroyed(){this.wreckTime=0,this.popY=0,this.popVy=9+Math.random()*4,this.popSpin=(Math.random()-.5)*9,this.popTilt=(Math.random()-.5)*1.5}update(t,e,n){const i=this.tank,r=this.model;i.alive&&!this.wasAlive&&(this.visY=i.y,r.setWreck(0),r.turret.position.set(0,i.hull.turretHeight,0),r.turret.rotation.set(0,0,0),r.root.visible=!0),this.wasAlive=i.alive;const a=i.y-this.visY;if(this.visY+=Math.abs(a)>3?a:a*Math.min(1,t*18),r.root.position.set(i.x,this.visY,i.z),r.hull.rotation.set(-i.tiltPitch,i.heading,i.tiltRoll,"YXZ"),i.alive){oh.set(0,i.hull.turretHeight,0).applyEuler(r.hull.rotation),r.turret.position.copy(oh),r.turret.rotation.set(0,i.turretYaw,0),r.barrelPivot.rotation.x=-i.barrelPitch,r.recoil.position.z=-i.recoil*i.recoil*i.weapon.recoil*1.2,r.setTracks(i.trackL,i.trackR);const o=i.shieldTimer>0;if(r.setShield(o||i.spawnProtect>0,e,o?Math.min(1,i.shieldTimer*2):.18+.08*Math.sin(e*14)),this.hitFlash=Math.max(0,this.hitFlash-t*9),r.setHitFlash(this.hitFlash),this.smokeTimer-=t,this.smokeTimer<=0){this.smokeTimer=.05;const l=i.health/i.maxHealth,h=i.hull.length*.5,c=i.x-Math.sin(i.heading)*h,u=i.z-Math.cos(i.heading)*h;if(i.boosting||i.dashTimer>0){const d=i.dashTimer>0?16777215:i.nitro>0?qt.cyan:this.accent;n.flash(c,this.visY+.9,u,d,i.dashTimer>0?3:1.6,.08,1.6)}l<.35&&(n.smokePuff(i.x,this.visY+i.hull.turretHeight,i.z,1,1.4,.06,1.5),l<.18&&Math.random()<.5&&n.fire(i.x,this.visY+i.hull.turretHeight*.8,i.z,1,.8))}}else{this.wreckTime+=t,r.setWreck(Math.min(1,this.wreckTime*3)),r.setShield(!1,e,0),this.popVy-=24*t,this.popY+=this.popVy*t,this.popY<0&&(this.popY=0,this.popVy*=-.25,this.popSpin*=.4),r.turret.position.y=i.hull.turretHeight+this.popY,r.turret.rotation.y+=this.popSpin*t,r.turret.rotation.z=Math.min(Math.abs(this.popTilt),this.wreckTime*2)*Math.sign(this.popTilt),this.smokeTimer-=t,this.smokeTimer<=0&&(this.smokeTimer=.09,n.smokePuff(i.x,this.visY+1,i.z,1,2.2,.05,2.4),this.wreckTime<2.2&&n.fire(i.x,this.visY+.8,i.z,2,1.4));const o=Math.max(0,this.wreckTime-3)*1.2;r.root.position.y=this.visY-o,r.root.visible=o<2.5}}dispose(){this.model.dispose()}}const oh=new D;class Sx{constructor(t,e){y(this,"scene",new ta);y(this,"arena");y(this,"views");y(this,"fx");y(this,"sun");y(this,"world");y(this,"hostile",t=>{const e=this.world,n=e.tanks[t];if(!n)return!1;const i=e.player;return i?n!==i&&i.isEnemyOf(n):n.team==="magenta"});this.world=t;const n=e.preset,i=t.arena;this.scene.fog=new da(i.fog.color,i.fog.density),this.scene.background=new gt(i.sky.bottom);const r=new cu(14866130,1705480,1.1);if(this.scene.add(r),this.sun=new Yc(i.id==="docks"?15855079:14996689,1.5),this.sun.position.set(-50,90,-35),this.sun.castShadow=n.shadows,n.shadows){this.sun.shadow.mapSize.set(n.shadowMap,n.shadowMap);const l=this.sun.shadow.camera,h=i.half+6;l.left=-h,l.right=h,l.top=h,l.bottom=-h,l.near=10,l.far=260,this.sun.shadow.bias=-5e-4,this.sun.shadow.normalBias=.05}this.scene.add(this.sun,this.sun.target);const a=new Yc(i.id==="docks"?11209498:13875639,.55);a.position.set(60,30,50),this.scene.add(a),this.arena=new xx(i,e.env,n,t.mode==="cp"),this.scene.add(this.arena.group);const o=t.player?t.player.id:-1;this.views=t.tanks.map(l=>new bx(l,o,e.env,n.shadows));for(const l of this.views)this.scene.add(l.model.root);this.fx=new Mx(900,n.maxLights>0?3:0),this.fx.setParticleLimit(n.particles),this.scene.add(this.fx.group)}handle(t){const e=this.world;switch(t.type){case"fire":{const n=Ce[t.kind].projectile;this.fx.muzzle(t.x,t.y,t.z,t.x2,t.y2,t.z2,n);break}case"charge":{e.tanks[t.a].muzzle(Or),this.fx.flash(Or.x,Or.y,Or.z,an.rail,1.6,Ce.rail.charge,1.4);break}case"beam":this.fx.beam(t.x,t.y,t.z,t.x2,t.y2,t.z2,an.rail,.09,.45),this.fx.beam(t.x,t.y,t.z,t.x2,t.y2,t.z2,16052716,.35,.3);break;case"impact":{const n=Ce[t.kind].projectile;this.fx.impact(t.x,t.y,t.z,t.x2,t.y2,t.z2,n,t.a>=0),t.a>=0&&this.views[t.a].onHit();break}case"explode":{if(t.kind==="shockwave"){const n=e.tanks[t.a];this.fx.shockwave(n.x,n.y,n.z)}else{const n=e.collision.surfaceHeight(t.x,t.z,t.y+.5);this.fx.explosion(t.x,t.y,t.z,t.value,an.nova,t.y-n<1.2?n:null)}break}case"kill":{const n=this.views[t.a];n.onDestroyed(),this.fx.tankDestroyed(t.x,t.y,t.z,n.accentColor);break}case"spawn":{const n=e.tanks[t.a];this.fx.spawnBeam(n.x,n.y,n.z,this.views[t.a].accentColor);break}case"pickup":{const n=t.kind==="repair"?qt.green:t.kind==="overdrive"?qt.amber:qt.cyan;this.fx.pickupBurst(t.x,t.y,t.z,n);break}case"capture":{const n=e.arena.controlPoint;this.fx.ring(n.x,n.y+.2,n.z,t.kind==="blue"?qt.blue:qt.red,n.r*1.4,.9),this.fx.flash(n.x,n.y+4,n.z,t.kind==="blue"?qt.blue:qt.red,12,.6);break}case"ability":{const n=e.tanks[t.a];t.kind==="dash"&&this.fx.ring(n.x,n.y+.8,n.z,16777215,4,.3,!1),t.kind==="aegis"&&this.fx.flash(n.x,n.y+1.5,n.z,16250353,8,.3);break}}}update(t,e){ms.value=e;for(const n of this.views)n.update(t,e,this.fx);this.fx.updateProjectiles(this.world.projectiles.items,t,this.hostile),this.fx.update(t),this.arena.update(e,this.world.mode==="cp"?this.world.cp:null,this.world.pickups)}dispose(){this.views.forEach(t=>t.dispose()),this.arena.dispose(),this.fx.dispose(),this.sun.shadow.map?.dispose(),this.scene.clear()}}const Or={x:0,y:0,z:0},xu={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Cs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const wx=new dl(-1,1,1,-1,0,1);class Tx extends ye{constructor(){super(),this.setAttribute("position",new Jt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Jt([0,2,0,0,2,0],2))}}const Ex=new Tx;class Sl{constructor(t){this._mesh=new It(Ex,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,wx)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Ax extends Cs{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof ge?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Js.clone(t.uniforms),this.material=new ge({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Sl(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class lh extends Cs{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const i=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class Rx extends Cs{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Cx{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new et);this._width=n.width,this._height=n.height,e=new vn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Hn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ax(xu),this.copyPass.material.blending=Bn,this.clock=new xv}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}lh!==void 0&&(a instanceof lh?n=!0:a instanceof Rx&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new et);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const Px={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Lx extends Cs{constructor(){super();const t=Px;this.uniforms=Js.clone(t.uniforms),this.material=new fv({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Sl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Zt.getTransfer(this._outputColorSpace)===re&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===_h?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Mh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===yh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===il?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===bh?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Sh&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Dx extends Cs{constructor(t,e,n=null,i=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new gt}render(t,e,n){const i=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=i}}const Ix={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new gt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ws extends Cs{constructor(t,e,n,i){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new et(t.x,t.y):new et(256,256),this.clearColor=new gt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new vn(r,a,{type:Hn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new vn(r,a,{type:Hn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new vn(r,a,{type:Hn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),a=Math.round(a/2)}const o=Ix;this.highPassUniforms=Js.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ge({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new et(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const c=xu;this.copyUniforms=Js.clone(c.uniforms),this.blendMaterial=new ge({uniforms:this.copyUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,blending:We,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new gt,this.oldClearAlpha=1,this.basic=new Se,this.fsQuad=new Sl(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new et(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=ws.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ws.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=a}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new ge({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new et(.5,.5)},direction:{value:new et(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new ge({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}ws.BlurDirectionX=new et(1,0);ws.BlurDirectionY=new et(0,1);const ch={low:{maxPixelRatio:.85,shadows:!1,shadowMap:0,bloom:!1,maxLights:0,particles:260,antialias:!1},medium:{maxPixelRatio:1,shadows:!0,shadowMap:1024,bloom:!0,maxLights:4,particles:520,antialias:!1},high:{maxPixelRatio:1.5,shadows:!0,shadowMap:2048,bloom:!0,maxLights:10,particles:900,antialias:!0}};class Ux{constructor(t,e){y(this,"renderer");y(this,"env");y(this,"composer",null);y(this,"renderPass",null);y(this,"bloom",null);y(this,"envTarget");y(this,"preset");y(this,"level");y(this,"width",1);y(this,"height",1);y(this,"scale",1);this.level=e,this.preset=ch[e],this.renderer=new Cg({canvas:t,antialias:this.preset.antialias,powerPreference:"high-performance",stencil:!1}),this.renderer.outputColorSpace=Ge,this.renderer.toneMapping=il,this.renderer.toneMappingExposure=1,this.renderer.shadowMap.type=vh,this.envTarget=this.buildEnvironment(),this.env=this.envTarget.texture,this.applyQuality()}buildEnvironment(){const t=new ta;t.background=new gt(1377799);const e=new It(new Fe(30,14,30),new Se({color:590852,side:we}));t.add(e);const n=(o,l,h,c,u,d,f,m=3)=>{const v=new It(new gn(u,d),new Se({color:new gt(o).multiplyScalar(m),side:qe}));v.position.set(l,h,c),v.rotation.y=f,t.add(v)};n(16118509,-14.5,4,0,18,1.2,Math.PI/2),n(11209498,14.5,4,0,18,1.2,-Math.PI/2),n(14007482,0,3,-14.5,12,.8,0),n(15366271,0,2,14.5,8,.6,Math.PI,2);const i=new It(new gn(20,6),new Se({color:new gt(15591136).multiplyScalar(.45)}));i.position.y=6.9,i.rotation.x=Math.PI/2,t.add(i);const r=new qo(this.renderer),a=r.fromScene(t,.04);return r.dispose(),t.traverse(o=>{const l=o;l.geometry&&l.geometry.dispose(),l.material&&l.material.dispose()}),a}setQuality(t){this.level=t,this.preset=ch[t],this.scale=1,this.applyQuality()}applyQuality(){const t=this.preset;this.renderer.shadowMap.enabled=t.shadows,this.renderer.shadowMap.needsUpdate=!0,t.bloom&&!this.composer&&(this.composer=new Cx(this.renderer),this.renderPass=new Dx(new ta,new ke),this.composer.addPass(this.renderPass),this.bloom=new ws(new et(256,256),.26,.4,.92),this.composer.addPass(this.bloom),this.composer.addPass(new Lx)),this.bloom&&(this.bloom.enabled=t.bloom),this.resize(this.width,this.height)}get pixelRatio(){return Math.min(window.devicePixelRatio||1,this.preset.maxPixelRatio)*this.scale}resize(t,e){this.width=Math.max(1,t),this.height=Math.max(1,e);const n=this.pixelRatio;this.renderer.setPixelRatio(n),this.renderer.setSize(this.width,this.height,!1),this.composer&&this.bloom&&(this.composer.setPixelRatio(n),this.composer.setSize(this.width,this.height),this.bloom.resolution.set(this.width*n/2,this.height*n/2))}get size(){return{w:this.width,h:this.height}}render(t,e){this.preset.bloom&&this.composer&&this.renderPass?(this.renderPass.scene=t,this.renderPass.camera=e,this.composer.render()):this.renderer.render(t,e)}dispose(){this.composer?.dispose(),this.bloom?.dispose(),this.envTarget.dispose(),fx(),Vv(),cx(),this.renderer.dispose()}}const as={l:6.1,w:2.5,h:2.6};class _u{constructor(){y(this,"boxes",[]);y(this,"ramps",[]);y(this,"decor",[])}solid(t,e,n,i,r,a,o,l={}){const h={minX:Math.min(t,i),minY:Math.min(e,r),minZ:Math.min(n,a),maxX:Math.max(t,i),maxY:Math.max(e,r),maxZ:Math.max(n,a),mat:o,blocksTanks:l.blocksTanks??!0,blocksShots:l.blocksShots??!0,walkable:l.walkable??Math.abs(r-e)>=2.4,trim:l.trim??"none",hidden:l.hidden};return this.boxes.push(h),h}block(t,e,n,i,r,a,o={},l=0){return this.solid(t-n/2,l,e-i/2,t+n/2,l+r,e+i/2,a,o)}container(t,e,n,i,r,a=0){const o=n?as.w:as.l,l=n?as.l:as.w;for(let h=0;h<i;h++)this.block(t,e,o,l,as.h,h%2===0?r:Nx(r),{trim:h===i-1?kx(r):"none"},a+h*as.h)}ramp(t,e,n,i,r,a,o,l,h,c={}){let u,d,f,m;n==="x"?(f=e-a/2,m=e+a/2,i===1?(u=t,d=t+r):(u=t-r,d=t)):(u=t-a/2,d=t+a/2,i===1?(f=e,m=e+r):(f=e-r,m=e));const v={minX:u,maxX:d,minZ:f,maxZ:m,axis:n,dir:i,h0:o,h1:l,mat:h,bridge:c.bridge};return this.ramps.push(v),(c.rails??!0)&&this.rails(v),v}rails(t){for(let i=0;i<5;i++){const r=i/5,a=(i+1)/5,o=t.h0+(t.h1-t.h0)*a+1.15,l=t.bridge?Math.max(0,t.h0+(t.h1-t.h0)*r-.6):0;if(t.axis==="x"){const h=t.maxX-t.minX,c=t.dir===1?t.minX+h*r:t.maxX-h*a,u=t.dir===1?t.minX+h*a:t.maxX-h*r;this.solid(c,l,t.minZ-.45,u,o,t.minZ,"trim",{walkable:!1,trim:"none"}),this.solid(c,l,t.maxZ,u,o,t.maxZ+.45,"trim",{walkable:!1,trim:"none"})}else{const h=t.maxZ-t.minZ,c=t.dir===1?t.minZ+h*r:t.maxZ-h*a,u=t.dir===1?t.minZ+h*a:t.maxZ-h*r;this.solid(t.minX-.45,l,c,t.minX,o,u,"trim",{walkable:!1,trim:"none"}),this.solid(t.maxX,l,c,t.maxX+.45,o,u,"trim",{walkable:!1,trim:"none"})}}}rail(t,e,n,i,r,a=1.2){this.solid(t,r,e,n,r+a,i,"trim",{walkable:!1})}boundary(t,e){this.solid(-t-2,0,-t-2,t+2,e,-t,"boundary",{walkable:!1,trim:"cyan"}),this.solid(-t-2,0,t,t+2,e,t+2,"boundary",{walkable:!1,trim:"cyan"}),this.solid(-t-2,0,-t,-t,e,t,"boundary",{walkable:!1,trim:"cyan"}),this.solid(t,0,-t,t+2,e,t,"boundary",{walkable:!1,trim:"cyan"})}mirror(t){t(1),t(-1)}}function Nx(s){switch(s){case"containerCyan":return"containerSteel";case"containerMagenta":return"containerAmber";case"containerSteel":return"containerCyan";default:return"containerMagenta"}}function kx(s){return s==="containerMagenta"||s==="containerAmber"?"magenta":"cyan"}const Ye=Math.PI/2;function Fx(){const s=new _u,t=72;s.boundary(t,6),s.block(0,0,24,24,3,"deck",{trim:"cyan"}),s.mirror(a=>{s.ramp(-26*a,0,"x",a,14,10,0,3,"deck"),s.container(-7*a,8.5*a,!1,1,"containerCyan",3),s.container(8.5*a,7*a,!0,1,"containerMagenta",3),s.block(0,44*a,60,8,5.5,"metal",{trim:a===1?"magenta":"cyan"}),s.ramp(-46*a,44*a,"x",a,16,8,0,5.5,"metal"),s.ramp(46*a,44*a,"x",a===1?-1:1,16,8,0,5.5,"metal"),s.rail(-30,47.6*a,30,48*a,5.5),s.rail(-30*a,40*a,-12*a,40.4*a,5.5),s.rail(12*a,40*a,30*a,40.4*a,5.5),s.ramp(0,12*a,"z",a,28,8,3,5.5,"metal",{bridge:!0}),s.block(5.3,26*a,.9,.9,4.3,"darkMetal",{walkable:!1}),s.block(-5.3,26*a,.9,.9,4.3,"darkMetal",{walkable:!1}),s.container(-52*a,22*a,!0,2,"containerCyan"),s.container(-40*a,31*a,!1,1,"containerMagenta"),s.container(-34*a,18*a,!0,1,"containerSteel"),s.container(-22*a,29*a,!1,2,"containerAmber"),s.container(-20*a,18*a,!1,1,"containerCyan"),s.container(24*a,20*a,!0,1,"containerMagenta"),s.container(36*a,28*a,!1,2,"containerSteel"),s.container(50*a,18*a,!1,1,"containerAmber"),s.container(52*a,30*a,!0,1,"containerCyan"),s.container(-15*a,60*a,!1,1,"containerSteel"),s.container(14*a,62*a,!1,2,"containerMagenta"),s.container(-40*a,63*a,!0,1,"containerAmber"),s.block(-62*a,30*a,1.6,1.6,16,"darkMetal",{walkable:!1}),s.block(-62*a,-30*a,1.6,1.6,16,"darkMetal",{walkable:!1}),s.block(-34*a,8*a,1,4.5,1.3,"concrete",{trim:"amber"}),s.block(-34*a,-8*a,1,4.5,1.3,"concrete",{trim:"amber"}),s.block(-54*a,9*a,1,4.5,1.3,"concrete",{trim:"amber"}),s.block(-54*a,-9*a,1,4.5,1.3,"concrete",{trim:"amber"}),s.block(11*a,33*a,4.5,1,1.3,"concrete",{trim:"amber"}),s.block(-11*a,33*a,4.5,1,1.3,"concrete",{trim:"amber"})}),s.decor.push({kind:"water",y:-1.4}),s.mirror(a=>{s.decor.push({kind:"crane",x:-62*a,z:0,yaw:0,h:16}),s.decor.push({kind:"sign",x:0,y:2.8,z:39.9*a,yaw:a===1?Math.PI:0,w:12,h:2.2,text:a===1?"DOCK 07":"DOCK 12",color:a===1?"magenta":"cyan"}),s.decor.push({kind:"sign",x:-38*a,y:4.2,z:31*a-1.3*a,yaw:a===1?Math.PI:0,w:5,h:1.2,text:"KAIRO FREIGHT",color:"amber"}),s.decor.push({kind:"strip",x0:-30,z0:40.1*a,x1:30,z1:40.1*a,y:5.45,color:a===1?"magenta":"cyan"}),s.decor.push({kind:"strip",x0:-12,z0:12.05*a,x1:12,z1:12.05*a,y:2.95,color:"cyan"}),s.decor.push({kind:"light",x:0,y:9,z:44*a,color:a===1?"magenta":"cyan",intensity:30,range:34}),s.decor.push({kind:"light",x:-46*a,y:7,z:-2*a,color:a===1?"cyan":"magenta",intensity:24,range:30}),s.decor.push({kind:"pylon",x:-66*a,z:66*a,h:12,color:"cyan"}),s.decor.push({kind:"pylon",x:66*a,z:66*a,h:12,color:"magenta"}),s.decor.push({kind:"pylon",x:0,z:68*a,h:9,color:a===1?"magenta":"cyan"})}),s.decor.push({kind:"holo",x:0,y:3,z:0,r:8,color:"cyan"}),s.decor.push({kind:"light",x:0,y:10,z:0,color:"cyan",intensity:40,range:30});const e=[-18,-6,6,18].map(a=>({x:-59,y:0,z:a,yaw:Ye})),n=e.map(a=>({x:-a.x,y:0,z:-a.z,yaw:-Ye})),i=[{x:-59,y:0,z:-15,yaw:Ye},{x:-59,y:0,z:15,yaw:Ye},{x:59,y:0,z:15,yaw:-Ye},{x:59,y:0,z:-15,yaw:-Ye},{x:0,y:0,z:56,yaw:Math.PI},{x:0,y:0,z:-56,yaw:0},{x:-56,y:0,z:58,yaw:Math.PI*.75},{x:56,y:0,z:-58,yaw:-Math.PI*.25},{x:40,y:0,z:0,yaw:-Ye},{x:-40,y:0,z:0,yaw:Ye}],r=[{kind:"repair",x:0,y:0,z:30},{kind:"repair",x:0,y:0,z:-30},{kind:"overdrive",x:0,y:5.5,z:44},{kind:"overdrive",x:0,y:5.5,z:-44},{kind:"nitro",x:-44,y:0,z:0},{kind:"nitro",x:44,y:0,z:0}];return{id:"docks",name:"NEON DOCKS",subtitle:"Container port · elevated walkways · central pier",half:t,boxes:s.boxes,ramps:s.ramps,spawns:{blue:e,magenta:n,ffa:i},controlPoint:{x:0,y:3,z:0,r:8},pickups:r,decor:s.decor,fog:{color:1902345,density:.0115},sky:{top:525059,bottom:2754828}}}function zx(){const s=new _u,t=66;s.boundary(t,7),s.block(0,0,30,30,4,"lab",{trim:"magenta"}),s.block(0,0,6,6,5.5,"labDark",{walkable:!1,trim:"cyan"},4),s.mirror(a=>{s.ramp(-27*a,6*a,"x",a,12,9,0,4,"lab"),s.ramp(-6*a,-27*a,"z",a,12,9,0,4,"lab"),s.rail(-15*a,14.6*a,-10*a,15*a,4,1.3),s.rail(10*a,14.6*a,15*a,15*a,4,1.3),s.block(-9*a,11*a,3,2,1.7,"labDark",{trim:"cyan"},4),s.block(11*a,9*a,2,3,1.7,"labDark",{trim:"magenta"},4),s.block(-58*a,0,16,44,6,"lab",{trim:"cyan"}),s.ramp(-60*a,-36*a,"z",a,14,12,0,6,"lab"),s.ramp(-60*a,36*a,"z",a===1?-1:1,14,12,0,6,"lab"),s.rail(-50*a,-22*a,-49.6*a,-14*a,6),s.rail(-50*a,14*a,-49.6*a,22*a,6),s.ramp(-15*a,-9.5*a,"x",a===1?-1:1,35,6.5,4,6,"metal",{bridge:!0}),s.block(-32*a,-13.6*a,1,1,4.6,"darkMetal",{walkable:!1}),s.block(-32*a,-5.4*a,1,1,4.6,"darkMetal",{walkable:!1}),s.block(-30*a,-44*a,18,14,8,"labDark",{walkable:!1,trim:"magenta"}),s.block(30*a,-44*a,18,14,8,"labDark",{walkable:!1,trim:"cyan"}),s.block(-42.5*a,-44*a,7,.4,3.2,"barrier",{walkable:!1,blocksShots:!1}),s.block(0,-34*a,12,.4,3.2,"barrier",{walkable:!1,blocksShots:!1}),s.block(-22*a,22*a,2.5,2.5,7,"labDark",{walkable:!1,trim:"cyan"}),s.block(22*a,22*a,2.5,2.5,7,"labDark",{walkable:!1,trim:"magenta"}),s.block(-38*a,0,1.2,6,1.4,"concrete",{trim:"amber"}),s.block(0,-49*a,8,1,1.4,"concrete",{trim:"amber"}),s.block(-14*a,-30*a,1,4,1.4,"concrete",{trim:"amber"})}),s.mirror(a=>{s.decor.push({kind:"sign",x:-30*a,y:5.6,z:-37*a+.05*a,yaw:a===1?0:Math.PI,w:9,h:1.8,text:a===1?"LAB 03 · VOID":"LAB 09 · VOID",color:a===1?"magenta":"cyan"}),s.decor.push({kind:"sign",x:30*a,y:5.6,z:-37*a+.05*a,yaw:a===1?0:Math.PI,w:9,h:1.8,text:"CONTAINMENT",color:a===1?"cyan":"magenta"}),s.decor.push({kind:"strip",x0:-15,z0:-15.05*a,x1:15,z1:-15.05*a,y:3.95,color:"magenta"}),s.decor.push({kind:"strip",x0:-50*a,z0:-22,x1:-50*a,z1:22,y:5.95,color:"cyan"}),s.decor.push({kind:"strip",x0:-21,z0:-30*a,x1:21,z1:-30*a,y:.03,color:a===1?"cyan":"magenta",w:.5}),s.decor.push({kind:"strip",x0:-44*a,z0:-26,x1:-44*a,z1:26,y:.03,color:"cyan",w:.5}),s.decor.push({kind:"light",x:-58*a,y:11,z:0,color:a===1?"cyan":"magenta",intensity:28,range:34}),s.decor.push({kind:"light",x:0,y:8,z:-42*a,color:a===1?"cyan":"magenta",intensity:22,range:26}),s.decor.push({kind:"pylon",x:-62*a,z:-62*a,h:11,color:"magenta"}),s.decor.push({kind:"pylon",x:62*a,z:-62*a,h:11,color:"cyan"})}),s.decor.push({kind:"holo",x:0,y:9.6,z:0,r:4,color:"magenta"}),s.decor.push({kind:"light",x:0,y:13,z:0,color:"magenta",intensity:46,range:36});const e=[-12,-4,4,12].map(a=>({x:a,y:0,z:-55,yaw:0})),n=e.map(a=>({x:-a.x,y:0,z:58,yaw:Math.PI})),i=[{x:-10,y:0,z:-55,yaw:0},{x:10,y:0,z:55,yaw:Math.PI},{x:10,y:0,z:-55,yaw:0},{x:-10,y:0,z:55,yaw:Math.PI},{x:-42,y:0,z:-56,yaw:Ye},{x:42,y:0,z:56,yaw:-Ye},{x:-40,y:0,z:24,yaw:Ye},{x:40,y:0,z:-24,yaw:-Ye},{x:-30,y:0,z:-20,yaw:Ye},{x:30,y:0,z:20,yaw:-Ye}],r=[{kind:"repair",x:-36,y:0,z:14},{kind:"repair",x:36,y:0,z:-14},{kind:"overdrive",x:-58,y:6,z:0},{kind:"overdrive",x:58,y:6,z:0},{kind:"nitro",x:0,y:0,z:-30},{kind:"nitro",x:0,y:0,z:30}];return{id:"void",name:"VOID COMPLEX",subtitle:"Research facility · reactor core · energy barriers",half:t,boxes:s.boxes,ramps:s.ramps,spawns:{blue:e,magenta:n,ffa:i},controlPoint:{x:0,y:4,z:0,r:11},pickups:r,decor:s.decor,fog:{color:1639944,density:.012},sky:{top:459523,bottom:2492941}}}const hh=new Map;function Ox(s){let t=hh.get(s);return t||(t=s==="docks"?Fx():zx(),hh.set(s,t)),t}const Bx=["docks","void"],js={docks:{name:"NEON DOCKS",subtitle:"Container port · elevated walkways · central pier"},void:{name:"VOID COMPLEX",subtitle:"Research facility · reactor core · energy barriers"}};class Hx{constructor(t,e){y(this,"items",[]);y(this,"cursor",0);y(this,"serials",0);for(let n=0;n<t;n++)this.items.push({active:!1,slot:n,serial:0,owner:-1,weapon:e,x:0,y:0,z:0,vx:0,vy:0,vz:0,ox:0,oy:0,oz:0,life:0,dmgMult:1})}spawn(t,e,n,i,r,a,o,l,h){const c=this.items.length;let u=null;for(let d=0;d<c;d++){const f=this.items[(this.cursor+d)%c];if(!f.active){u=f,this.cursor=(f.slot+1)%c;break}}return u||(u=this.items[this.cursor],this.cursor=(this.cursor+1)%c),u.active=!0,u.serial=++this.serials,u.owner=t.id,u.weapon=l,u.x=u.ox=e,u.y=u.oy=n,u.z=u.oz=i,u.vx=r*l.speed,u.vy=a*l.speed,u.vz=o*l.speed,u.life=l.lifetime,u.dmgMult=h,u}clear(){for(const t of this.items)t.active=!1}}function io(s,t,e,n,i,r,a,o,l,h){const c=s-a,u=t-o,d=e-l,f=n*n+i*i+r*r,m=c*n+u*i+d*r,v=c*c+u*u+d*d-h*h;if(v<=0)return 0;if(m>0||f<1e-12)return-1;const g=m*m-f*v;if(g<0)return-1;const p=(-m-Math.sqrt(g))/f;return p>=0&&p<=1?p:-1}function Mu(s,t,e,n,i,r,a){const o=s.hull,l=Math.sin(s.heading),h=Math.cos(s.heading),c=o.length*.24,u=o.width*.5,d=s.y+.95;let f=-1,m=io(t,e,n,i,r,a,s.x+l*c,d,s.z+h*c,u);return m>=0&&(f=m),m=io(t,e,n,i,r,a,s.x-l*c,d,s.z-h*c,u),m>=0&&(f<0||m<f)&&(f=m),m=io(t,e,n,i,r,a,s.x,s.y+o.turretHeight+.35,s.z,1.15),m>=0&&(f<0||m<f)&&(f=m),f}const si={x:0,z:0};class Vx{constructor(t,e,n){y(this,"tank");y(this,"diff");y(this,"rng");y(this,"state","roam");y(this,"targetId",-1);y(this,"targetVisible",!1);y(this,"lastSeenX",0);y(this,"lastSeenY",0);y(this,"lastSeenZ",0);y(this,"lastSeenTime",-99);y(this,"firstSeenTime",-99);y(this,"path",[]);y(this,"pathIdx",0);y(this,"goalX",0);y(this,"goalY",0);y(this,"goalZ",0);y(this,"hasGoal",!1);y(this,"repath",0);y(this,"think",0);y(this,"strafeDir",1);y(this,"strafeTimer",0);y(this,"progressTimer",0);y(this,"snapX",0);y(this,"snapZ",0);y(this,"unstuck",0);y(this,"unstuckSteer",1);y(this,"noiseYaw",0);y(this,"noisePitch",0);y(this,"noiseTY",0);y(this,"noiseTP",0);y(this,"noiseTimer",0);y(this,"losTimer",0);y(this,"abilityRoll",0);y(this,"unstuckCount",0);this.tank=t,this.diff=e,this.rng=new hu(n),this.think=this.rng.range(0,e.think),t.turretMult=e.turretMult}reset(){this.state="roam",this.targetId=-1,this.targetVisible=!1,this.path.length=0,this.hasGoal=!1,this.repath=0,this.unstuck=0,this.progressTimer=0,this.snapX=this.tank.x,this.snapZ=this.tank.z}update(t,e){const n=this.tank,i=n.controls;if(!n.alive){i.throttle=0,i.steer=0,i.fire=!1,i.boost=!1,i.ability=!1,i.reload=!1;return}if(this.think-=e,this.think<=0&&(this.think=this.diff.think*this.rng.range(.8,1.2),this.decide(t)),this.losTimer-=e,this.losTimer<=0&&this.targetId>=0){this.losTimer=.2;const r=t.tanks[this.targetId];this.targetVisible=r.alive&&this.canSee(t,r),this.targetVisible&&this.markSeen(t,r)}this.steer(t,e),this.aim(t,e)}canSee(t,e){const n=this.tank;return Re(n.x,n.z,e.x,e.z)>this.diff.viewRange?!1:t.collision.segmentClear(n.x,n.y+n.pivotHeight,n.z,e.x,e.y+1.1,e.z)}markSeen(t,e){t.time-this.lastSeenTime>2.5&&(this.firstSeenTime=t.time),this.lastSeenX=e.x,this.lastSeenY=e.y,this.lastSeenZ=e.z,this.lastSeenTime=t.time}decide(t){const e=this.tank;let n=null,i=1/0;for(const c of t.tanks){if(!c.alive||!e.isEnemyOf(c))continue;const u=Re(e.x,e.z,c.x,c.z);if(u>this.diff.viewRange||!this.canSee(t,c))continue;let d=u+c.health/c.maxHealth*18;c.id===this.targetId&&(d-=12),e.lastAttacker===c.id&&t.time-e.lastDamageTime<3&&(d-=20),c.spawnProtect>0&&(d+=25),d<i&&(i=d,n=c)}if(n)n.id!==this.targetId&&(this.firstSeenTime=t.time),this.targetId=n.id,this.targetVisible=!0,this.markSeen(t,n);else if(this.targetVisible=!1,e.lastAttacker>=0&&t.time-e.lastDamageTime<1.2){const c=t.tanks[e.lastAttacker];c.alive&&(this.targetId=c.id,this.lastSeenX=c.x,this.lastSeenY=c.y,this.lastSeenZ=c.z,this.lastSeenTime=t.time-1)}this.targetId>=0&&!t.tanks[this.targetId].alive&&(this.targetId=-1,this.targetVisible=!1);const r=e.health/e.maxHealth,a=this.targetVisible||t.time-e.lastDamageTime<2;let o;this.state==="retreat"&&r<this.diff.retreatHealth+.25&&t.time-e.lastDamageTime<8||r<this.diff.retreatHealth&&a?o="retreat":this.targetVisible?o="engage":this.targetId>=0&&t.time-this.lastSeenTime<6?o="pursue":o="roam";const l=o!==this.state;switch(this.state=o,o){case"retreat":(l||this.repath<=0)&&this.pickRetreat(t);break;case"engage":this.pickEngage(t);break;case"pursue":this.setGoal(t,this.lastSeenX,this.lastSeenY,this.lastSeenZ,l);break;case"roam":(l||!this.hasGoal||this.repath<=0||this.pathDone())&&this.pickRoam(t);break}const h=e.weapon;e.controls.reload=!this.targetVisible&&h.magazine>0&&e.ammo<h.magazine*.5,this.abilityRoll=this.rng.next()}pathDone(){return this.pathIdx>=this.path.length}setGoal(t,e,n,i,r){const a=Math.abs(e-this.goalX)+Math.abs(i-this.goalZ)>6;if(this.goalX=e,this.goalY=n,this.goalZ=i,this.hasGoal=!0,!r&&!a&&this.repath>0)return;const o=this.tank,l=t.nav.nearest(o.x,o.y,o.z),h=t.nav.nearest(e,n,i);this.pathIdx=0,t.nav.findPath(l,h,this.path)||(this.path.length=0),this.repath=2.5}pickRoam(t){const e=this.tank,n=this.rng;if(t.mode==="cp"){const r=t.arena.controlPoint;if(!(t.cp.owner===e.team&&!t.cp.contested)||n.next()<.55){const o=n.range(0,Math.PI*2),l=n.range(0,r.r*.6);this.setGoal(t,r.x+Math.sin(o)*l,r.y,r.z+Math.cos(o)*l,!0);return}}if(this.diff.tactics>.4)for(let r=0;r<t.pickups.length;r++){const a=t.pickups[r];if(!(!a.active||a.def.kind==="repair")&&Re(e.x,e.z,a.def.x,a.def.z)<35&&n.next()<.5){this.setGoal(t,a.def.x,a.def.y,a.def.z,!0);return}}if(n.next()<.65){let r=null,a=1/0;for(const o of t.tanks){if(!o.alive||!e.isEnemyOf(o))continue;const l=Re(e.x,e.z,o.x,o.z)*n.range(.7,1.3);l<a&&(a=l,r=o)}if(r){this.setGoal(t,r.x+n.range(-8,8),r.y,r.z+n.range(-8,8),!0);return}}const i=t.nav.nodes[n.int(0,t.nav.nodes.length)];this.setGoal(t,i.x,i.y,i.z,!0)}pickRetreat(t){const e=this.tank;let n=-1,i=70;for(let u=0;u<t.pickups.length;u++){const d=t.pickups[u];if(!d.active||d.def.kind!=="repair")continue;const f=Re(e.x,e.z,d.def.x,d.def.z);f<i&&(i=f,n=u)}if(n>=0){const u=t.pickups[n].def;this.setGoal(t,u.x,u.y,u.z,!0);return}const r=this.lastSeenX,a=this.lastSeenY+1.2,o=this.lastSeenZ;let l=-1,h=-1/0;const c=t.nav.nodes;for(let u=0;u<36;u++){const d=c[this.rng.int(0,c.length)],f=Re(e.x,e.z,d.x,d.z);if(f<8||f>40||t.collision.segmentClear(r,a,o,d.x,d.y+1.2,d.z))continue;const m=Re(r,o,d.x,d.z)-f*.6;m>h&&(h=m,l=d.id)}if(l>=0){const u=c[l];this.setGoal(t,u.x,u.y,u.z,!0)}else{const u=Vs(e.x-r,e.z-o);this.setGoal(t,e.x+Math.sin(u)*20,e.y,e.z+Math.cos(u)*20,!0)}}pickEngage(t){const e=this.tank,n=t.tanks[this.targetId],i=Re(e.x,e.z,n.x,n.z),r=e.weapon.preferredRange;if(this.strafeTimer-=this.diff.think,this.strafeTimer<=0&&(this.strafeTimer=this.rng.range(1.8,4),this.rng.next()<.5&&(this.strafeDir=-this.strafeDir)),i>r+10||Math.abs(n.y-e.y)>2.5){this.setGoal(t,n.x,n.y,n.z,!1);return}const a=Vs(e.x-n.x,e.z-n.z);let o=a+Math.PI/2*this.strafeDir*this.diff.strafe;i<r-8&&(o=a+.5*this.strafeDir);const l=9;let h=e.x+Math.sin(o)*l,c=e.z+Math.cos(o)*l;const u=(d,f)=>t.nav.drivable(e.x,e.y,e.z,d,e.y,f,e.radius+.3);if(!u(h,c)&&(this.strafeDir=-this.strafeDir,o=a+Math.PI/2*this.strafeDir,h=e.x+Math.sin(o)*l,c=e.z+Math.cos(o)*l,!u(h,c))){this.hasGoal=!1,this.path.length=0;return}this.goalX=h,this.goalY=e.y,this.goalZ=c,this.hasGoal=!0,this.path.length=0,this.pathIdx=0}steer(t,e){const n=this.tank,i=n.controls;if(this.repath-=e,this.unstuck>0){this.unstuck-=e,i.throttle=-.9,i.steer=this.unstuckSteer,i.boost=!1,this.unstuck<=0&&(this.repath=0,this.snapX=n.x,this.snapZ=n.z,this.progressTimer=0,this.forceRepath(t));return}if(Math.abs(i.throttle)>.35){if(this.progressTimer+=e,this.progressTimer>1.5){const v=Re(n.x,n.z,this.snapX,this.snapZ);if(this.progressTimer=0,this.snapX=n.x,this.snapZ=n.z,v<1.3){this.unstuck=.9,this.unstuckSteer=this.rng.next()<.5?-1:1,this.unstuckCount++;return}}}else this.progressTimer=0,this.snapX=n.x,this.snapZ=n.z;if(!this.hasGoal){i.throttle=0,i.steer=0;return}let r=this.goalX;this.goalY;let a=this.goalZ,o=!0;for(;this.pathIdx<this.path.length;){const v=t.nav.nodes[this.path[this.pathIdx]];if(Re(n.x,n.z,v.x,v.z)<3.4&&Math.abs(v.y-n.y)<2){this.pathIdx++;continue}r=v.x,v.y,a=v.z,o=!1;break}const l=Re(n.x,n.z,r,a);if(o&&l<3.5){i.throttle=0,i.steer=0,i.boost=!1,this.state==="roam"&&(this.hasGoal=!1);return}const h=Vs(r-n.x,a-n.z);let c=ir(n.heading,h),u;if(Math.abs(c)>2.3&&l<12&&this.state!=="roam")c=ir(n.heading,yl(h+Math.PI)),u=-1;else{const v=Math.abs(c);u=v<.45?1:v<1.1?.55:.12,o&&l<8&&(u*=.5)}let d=Qe(c*2.4,-1,1);const f=u>=0?1:-1;if(si.x=Math.sin(n.heading)*f,si.z=Math.cos(n.heading)*f,this.probeBlocked(t,si.x,si.z)){const v=Math.sin(n.heading+.7*f),g=Math.cos(n.heading+.7*f),p=Math.sin(n.heading-.7*f),_=Math.cos(n.heading-.7*f),M=this.probeBlocked(t,v,g),x=this.probeBlocked(t,p,_);!M&&x?d=1:M&&!x&&(d=-1),u*=.5}for(const v of t.tanks){if(v===n||!v.alive||Math.abs(v.y-n.y)>2)continue;const g=v.x-n.x,p=v.z-n.z,_=Math.sqrt(g*g+p*p);if(_>7||_<.01||(g*si.x+p*si.z)/_<.6)continue;const x=si.x*p-si.z*g;d=Qe(d+(x>0?-.8:.8),-1,1),u*=.7}i.throttle=u,i.steer=d;const m=this.path.length-this.pathIdx;i.boost=this.diff.tactics>.5&&n.boost>.45&&u>.9&&Math.abs(c)<.3&&(this.state==="retreat"||m>5)}probeBlocked(t,e,n){const i=this.tank,r=i.x+e*3.6,a=i.z+n*3.6,o=t.collision.surfaceHeight(r,a,i.y+1.6,0);return o<i.y-.5?!1:t.collision.circleBlocked(r,a,o,i.radius*.9)}forceRepath(t){this.hasGoal&&this.setGoal(t,this.goalX,this.goalY,this.goalZ,!0)}aim(t,e){const n=this.tank,i=n.controls,r=n.weapon;this.noiseTimer-=e,this.noiseTimer<=0&&(this.noiseTimer=this.rng.range(.35,.8),this.noiseTY=(this.rng.next()*2-1)*this.diff.aimError,this.noiseTP=(this.rng.next()*2-1)*this.diff.aimError*.5);const a=1-Math.exp(-4*e);this.noiseYaw+=(this.noiseTY-this.noiseYaw)*a,this.noisePitch+=(this.noiseTP-this.noisePitch)*a,i.fire=!1,i.ability=!1;const o=this.targetId>=0?t.tanks[this.targetId]:null;if(o&&o.alive&&this.targetVisible){const l=n.x,h=n.y+n.pivotHeight,c=n.z;let u=o.x,d=o.y+1,f=o.z;const m=Re(l,c,u,f),v=m/r.speed;u+=o.vx*v*this.diff.lead,f+=o.vz*v*this.diff.lead;const g=Re(l,c,u,f),_=.45+.55*Math.min(1,Math.hypot(o.vx,o.vz)/10);i.aimYaw=Vs(u-l,f-c)+this.noiseYaw*_;let M=Math.atan2(d-h,g);if(r.gravity>0){const w=r.speed,b=r.gravity,L=d-h,O=w*w*w*w-b*(b*g*g+2*L*w*w);M=O>0?Math.atan((w*w-Math.sqrt(O))/(b*g)):r.pitchMax}i.aimPitch=M+this.noisePitch*_;const x=r.speed*r.lifetime*.92,C=t.time-this.firstSeenTime>=this.diff.reaction,A=n.aimError<this.diff.fireAlign+(r.gravity>0?.03:0)+(m<12?.05:0);let R=C&&A&&m<x;R&&r.heatPerShot>0&&this.diff.tactics>.5&&n.heat>.86&&(R=!1),R&&o.spawnProtect>.5&&(R=!1),i.fire=R;const I=n.hull.ability;n.abilityCharge>=1&&this.abilityRoll<this.diff.tactics&&(I==="shockwave"&&m<10||I==="aegis"&&t.time-n.lastDamageTime<.6&&n.health<n.maxHealth*.75||I==="dash"&&(this.state==="retreat"||m>r.preferredRange+12))&&(i.ability=!0)}else this.state==="pursue"||this.targetId>=0&&t.time-this.lastSeenTime<6?i.aimYaw=Vs(this.lastSeenX-n.x,this.lastSeenZ-n.z):i.aimYaw=n.heading,i.aimPitch=0,this.state==="retreat"&&n.hull.ability==="dash"&&n.abilityCharge>=1&&this.abilityRoll<this.diff.tactics&&(i.ability=!0)}}class Gx{constructor(){y(this,"pool",[]);y(this,"count",0)}push(t,e=-1,n=-1,i=""){let r=this.pool[this.count];return r||(r={type:t,a:e,b:n,x:0,y:0,z:0,x2:0,y2:0,z2:0,value:0,kind:i},this.pool.push(r)),this.count++,r.type=t,r.a=e,r.b=n,r.kind=i,r.x=r.y=r.z=r.x2=r.y2=r.z2=r.value=0,r}get(t){return this.pool[t]}clear(){this.count=0}}const uh=2,Br=5,Wx=7.6;class Xx{constructor(t,e){y(this,"nodes",[]);y(this,"world");y(this,"g",new Float64Array(0));y(this,"f",new Float64Array(0));y(this,"came",new Int32Array(0));y(this,"stamp",new Int32Array(0));y(this,"closed",new Int32Array(0));y(this,"search",0);y(this,"heapN",[]);y(this,"heapK",[]);this.world=e;const n=t.half-3,i=(o,l,h)=>{const c=e.surfaceHeight(o,l,h);if(!(Math.abs(c-h)>.6)&&!e.circleBlocked(o,l,c,uh)){for(const u of this.nodes)if(Math.abs(u.x-o)<1.5&&Math.abs(u.z-l)<1.5&&Math.abs(u.y-c)<1)return;this.nodes.push({id:this.nodes.length,x:o,y:c,z:l,edges:[],costs:[]})}};for(let o=-n;o<=n+.01;o+=Br)for(let l=-n;l<=n+.01;l+=Br)i(o,l,0);for(const o of t.boxes){if(!o.walkable||!o.blocksTanks||o.maxY<1.5)continue;const l=o.maxX-o.minX,h=o.maxZ-o.minZ;if(l<5||h<5)continue;const c=Math.max(1,Math.round((l-3)/Br)),u=Math.max(1,Math.round((h-3)/Br));for(let d=0;d<=c;d++)for(let f=0;f<=u;f++){const m=c===0?(o.minX+o.maxX)/2:o.minX+2.2+(l-4.4)*d/c,v=u===0?(o.minZ+o.maxZ)/2:o.minZ+2.2+(h-4.4)*f/u;i(m,v,o.maxY)}}for(const o of t.ramps){const l=(o.minX+o.maxX)/2,h=(o.minZ+o.maxZ)/2,c=o.axis==="x"?o.maxX-o.minX:o.maxZ-o.minZ,u=Math.max(2,Math.ceil(c/5));for(let d=-1;d<=u+1;d++){const f=d/u;let m=l,v=h;o.axis==="x"?m=o.minX+(o.maxX-o.minX)*f:v=o.minZ+(o.maxZ-o.minZ)*f;let g=Math.min(1,Math.max(0,f));o.dir===-1&&(g=1-g);const p=o.h0+(o.h1-o.h0)*g;i(m,v,p)}}const r=this.nodes;for(let o=0;o<r.length;o++){const l=r[o];for(let h=0;h<r.length;h++){if(o===h)continue;const c=r[h],u=c.x-l.x,d=c.z-l.z,f=Math.sqrt(u*u+d*d);f>Wx||f<.5||this.drivable(l.x,l.y,l.z,c.x,c.y,c.z)&&(l.edges.push(h),l.costs.push(f+Math.max(0,c.y-l.y)*.5))}}const a=r.length;this.g=new Float64Array(a),this.f=new Float64Array(a),this.came=new Int32Array(a),this.stamp=new Int32Array(a),this.closed=new Int32Array(a)}drivable(t,e,n,i,r,a,o=uh){const l=i-t,h=a-n,c=Math.sqrt(l*l+h*h),u=Math.max(2,Math.ceil(c/.7));let d=e;for(let f=1;f<=u;f++){const m=f/u,v=t+l*m,g=n+h*m;if(d=this.world.surfaceHeight(v,g,d,sa),this.world.circleBlocked(v,g,d,o))return!1}return Math.abs(d-r)<.6}nearest(t,e,n){let i=-1,r=1/0,a=-1,o=1/0;for(const l of this.nodes){const h=l.x-t,c=l.z-n,u=h*h+c*c+(l.y-e)*(l.y-e)*9;u<o&&(o=u,a=l.id),u<r&&Math.abs(l.y-e)<1.4&&u<400&&this.world.segmentClear(t,e+1,n,l.x,l.y+1,l.z)&&(r=u,i=l.id)}return i>=0?i:a}findPath(t,e,n){if(n.length=0,t<0||e<0)return!1;if(t===e)return n.push(e),!0;const i=this.nodes,r=++this.search,{g:a,f:o,came:l,stamp:h,closed:c}=this,u=this.heapN,d=this.heapK;u.length=0,d.length=0;const f=i[e],m=v=>{const g=i[v],p=g.x-f.x,_=g.z-f.z;return Math.sqrt(p*p+_*_)};for(h[t]=r,a[t]=0,o[t]=m(t),l[t]=-1,dh(u,d,t,o[t]);u.length;){const v=Yx(u,d);if(c[v]===r)continue;if(c[v]=r,v===e){let p=e;for(;p!==t&&p>=0;)n.push(p),p=l[p];return n.reverse(),!0}const g=i[v];for(let p=0;p<g.edges.length;p++){const _=g.edges[p];if(c[_]===r)continue;const M=a[v]+g.costs[p];(h[_]!==r||M<a[_])&&(h[_]=r,a[_]=M,o[_]=M+m(_),l[_]=v,dh(u,d,_,o[_]))}}return!1}reachable(t){const e=new Set([t]),n=[t];for(;n.length;){const i=n.pop();for(const r of this.nodes[i].edges)e.has(r)||(e.add(r),n.push(r))}return e}}function dh(s,t,e,n){s.push(e),t.push(n);let i=s.length-1;for(;i>0;){const r=i-1>>1;if(t[r]<=t[i])break;yu(s,t,r,i),i=r}}function Yx(s,t){const e=s[0],n=s.pop(),i=t.pop();if(s.length){s[0]=n,t[0]=i;let r=0;for(;;){const a=r*2+1,o=a+1;let l=r;if(a<s.length&&t[a]<t[l]&&(l=a),o<s.length&&t[o]<t[l]&&(l=o),l===r)break;yu(s,t,l,r),r=l}}return e}function yu(s,t,e,n){const i=s[e];s[e]=s[n],s[n]=i;const r=t[e];t[e]=t[n],t[n]=r}function qx(){return{throttle:0,steer:0,aimYaw:0,aimPitch:0,fire:!1,boost:!1,ability:!1,reload:!1}}function $x(s){const t=e=>Qe(Math.floor(e),0,zn);return{damage:1+.06*t(s.damage),armor:7*t(s.armor),speed:1+.04*t(s.speed),reload:1-.06*t(s.reload)}}class fh{constructor(t,e,n,i,r,a,o){y(this,"id");y(this,"name");y(this,"isBot");y(this,"team");y(this,"hull");y(this,"weapon");y(this,"paint");y(this,"mods");y(this,"maxHealth");y(this,"armor");y(this,"turretMult",1);y(this,"x",0);y(this,"y",0);y(this,"z",0);y(this,"vy",0);y(this,"heading",0);y(this,"speed",0);y(this,"turnVel",0);y(this,"kx",0);y(this,"kz",0);y(this,"vx",0);y(this,"vz",0);y(this,"grounded",!0);y(this,"turretYaw",0);y(this,"barrelPitch",0);y(this,"tiltPitch",0);y(this,"tiltRoll",0);y(this,"health",0);y(this,"alive",!1);y(this,"respawnTimer",0);y(this,"spawnProtect",0);y(this,"lastDamageTime",-99);y(this,"lastAttacker",-1);y(this,"damagedBy",[]);y(this,"cooldown",0);y(this,"ammo",0);y(this,"reloadTimer",0);y(this,"heat",0);y(this,"overheated",0);y(this,"venting",!1);y(this,"charging",-1);y(this,"boost",1);y(this,"boosting",!1);y(this,"abilityCharge",.35);y(this,"abilityTimer",0);y(this,"dashTimer",0);y(this,"shieldTimer",0);y(this,"overdrive",0);y(this,"nitro",0);y(this,"jolt",0);y(this,"stun",0);y(this,"recoil",0);y(this,"trackL",0);y(this,"trackR",0);y(this,"wallScrape",0);y(this,"controls",qx());y(this,"stats",{kills:0,deaths:0,assists:0,damage:0,shots:0,hits:0,score:0,captureTime:0,streak:0,bestStreak:0});this.id=t,this.name=e,this.isBot=n,this.team=i,this.hull=Ze[r.hull],this.weapon=Ce[r.weapon],this.paint=a,this.mods=$x(r.upgrades),this.maxHealth=this.hull.health,this.armor=this.hull.armor+this.mods.armor,this.damagedBy=new Array(o).fill(-99)}get radius(){return this.hull.radius}get pivotHeight(){return this.hull.turretHeight+.42}isEnemyOf(t){return t!==this&&(this.team==="none"||this.team!==t.team)}spawn(t,e,n,i){this.x=t,this.y=e,this.z=n,this.vy=0,this.speed=0,this.turnVel=0,this.kx=0,this.kz=0,this.vx=0,this.vz=0,this.heading=i,this.turretYaw=i,this.barrelPitch=0,this.tiltPitch=0,this.tiltRoll=0,this.health=this.maxHealth,this.alive=!0,this.spawnProtect=Kc,this.lastAttacker=-1,this.damagedBy.fill(-99),this.cooldown=.4,this.ammo=this.weapon.magazine,this.reloadTimer=0,this.heat=0,this.overheated=0,this.venting=!1,this.charging=-1,this.boost=1,this.abilityTimer=0,this.dashTimer=0,this.shieldTimer=0,this.overdrive=0,this.nitro=0,this.jolt=0,this.stun=0,this.controls.aimYaw=i,this.controls.aimPitch=0}get incomingMult(){if(this.spawnProtect>0)return 0;let t=1;return this.shieldTimer>0&&(t*=.4),this.dashTimer>0&&(t*=.5),t}get outgoingMult(){return this.mods.damage*(this.overdrive>0?1.5:1)}get topSpeed(){let t=this.hull.maxSpeed*this.mods.speed;return this.boosting&&(t*=Cv),this.nitro>0&&(t*=1.18),this.jolt>0&&(t*=.7),t}get reloadProgress(){return this.reloadTimer<=0?-1:1-this.reloadTimer/(this.weapon.reloadTime*this.mods.reload)}startReload(){const t=this.weapon;t.magazine>0&&this.ammo<t.magazine&&this.reloadTimer<=0&&(this.reloadTimer=t.reloadTime*this.mods.reload,this.charging=-1)}step(t,e){const n=this.controls;this.spawnProtect=Math.max(0,this.spawnProtect-t),this.overdrive=Math.max(0,this.overdrive-t),this.nitro=Math.max(0,this.nitro-t),this.jolt=Math.max(0,this.jolt-t),this.stun=Math.max(0,this.stun-t),this.dashTimer=Math.max(0,this.dashTimer-t),this.shieldTimer=Math.max(0,this.shieldTimer-t),this.abilityTimer=Math.max(0,this.abilityTimer-t),this.recoil=Math.max(0,this.recoil-t*3.2),this.spawnProtect>0&&(n.fire||Math.abs(n.throttle)>.1)&&this.spawnProtect<Kc-.6&&(this.spawnProtect=Math.min(this.spawnProtect,.25)),this.stepDrive(t,e.collision),this.stepTurret(t),this.stepWeapon(t,e),this.stepAbility(t,e),this.health<this.maxHealth&&e.time-this.lastDamageTime>Dv&&(this.health=Math.min(this.maxHealth,this.health+this.maxHealth*Iv*t))}stepDrive(t,e){const n=this.controls,i=this.hull,r=n.boost&&n.throttle>.1;this.nitro>0?(this.boost=1,this.boosting=r):r&&this.boost>.02?(this.boosting=!0,this.boost=Math.max(0,this.boost-Pv*t)):(this.boosting=!1,this.boost=Math.min(1,this.boost+Lv*t));const a=this.topSpeed;let o=n.throttle>=0?n.throttle*a:n.throttle*a*i.reverseFactor;this.dashTimer>0&&(o=i.maxSpeed*2.3);let l;Math.abs(n.throttle)<.05&&this.dashTimer<=0?l=i.brake*.45:Math.sign(o)===Math.sign(this.speed)||this.speed===0?l=Math.abs(o)>Math.abs(this.speed)?i.accel*(this.boosting?1.35:1):i.brake*.6:l=i.brake,this.dashTimer>0&&(l=90),this.speed=no(this.speed,o,l*t);const h=Math.min(1,Math.abs(this.speed)/i.maxSpeed),c=n.steer*i.turnRate*(1-.28*h)*(this.jolt>0?.8:1);this.turnVel=no(this.turnVel,c,9*t),this.heading+=this.turnVel*t;const u=Math.sin(this.heading),d=Math.cos(this.heading),f=this.x,m=this.z;this.x+=(u*this.speed+this.kx)*t,this.z+=(d*this.speed+this.kz)*t;const v=Math.exp(-3.5*t);this.kx*=v,this.kz*=v,ri.x=0,ri.z=0,os.x=this.x,os.z=this.z;let g=e.resolveCircle(os,this.y,i.radius,ri);if(g&&(g=e.resolveCircle(os,this.y,i.radius,ri)||g),this.x=os.x,this.z=os.z,this.wallScrape=Math.max(0,this.wallScrape-t*4),g){const G=Math.hypot(ri.x,ri.z);if(G>1e-6){const Y=ri.x/G,W=ri.z/G,K=(u*Y+d*W)*Math.sign(this.speed);K<-.2&&(this.speed*=1-Math.min(1,t*7*-K),this.wallScrape=Math.min(1,this.wallScrape+Math.abs(this.speed)*.05));const V=this.kx*Y+this.kz*W;V<0&&(this.kx-=V*Y,this.kz-=V*W)}}const p=e.surfaceHeight(this.x,this.z,this.y,sa);p>=this.y-.02?(this.y=p,this.vy=0,this.grounded=!0):this.grounded&&this.y-p<.4&&this.vy<=0?(this.y=p,this.vy=0):(this.grounded=!1,this.vy-=Uv*t,this.y+=this.vy*t,this.y<=p&&(this.y=p,this.vy=0,this.grounded=!0)),t>0&&(this.vx=(this.x-f)/t,this.vz=(this.z-m)/t);const _=this.vx*u+this.vz*d,M=this.turnVel*i.width*.5;this.trackL+=(_+M)*t,this.trackR+=(_-M)*t;const x=i.length*.42,C=i.width*.42,A=this.y+.3,R=e.surfaceHeight(this.x+u*x,this.z+d*x,A,.6),I=e.surfaceHeight(this.x-u*x,this.z-d*x,A,.6),w=e.surfaceHeight(this.x+d*C,this.z-u*C,A,.6),b=e.surfaceHeight(this.x-d*C,this.z+u*C,A,.6),L=this.grounded?Qe(Math.atan2(R-I,x*2),-.5,.5):this.tiltPitch*.98,O=this.grounded?Qe(Math.atan2(w-b,C*2),-.4,.4):this.tiltRoll*.98,z=Qo(9,t);this.tiltPitch+=(L-this.tiltPitch)*z,this.tiltRoll+=(O-this.tiltRoll)*z}stepTurret(t){const e=this.controls,n=this.weapon,i=this.stun>0?.15:1;this.turretYaw=yv(this.turretYaw,e.aimYaw,n.turretSpeed*this.turretMult*i*t),this.barrelPitch=no(this.barrelPitch,Qe(e.aimPitch,n.pitchMin,n.pitchMax),1.1*i*t)}get aimError(){return Math.abs(ir(this.turretYaw,this.controls.aimYaw))+Math.abs(this.barrelPitch-Qe(this.controls.aimPitch,this.weapon.pitchMin,this.weapon.pitchMax))}stepWeapon(t,e){const n=this.weapon,i=this.controls;if(this.cooldown=Math.max(0,this.cooldown-t),this.reloadTimer>0&&(this.reloadTimer-=t,this.reloadTimer<=0&&(this.reloadTimer=0,this.ammo=n.magazine,e.events.push("reload",this.id))),n.heatPerShot>0&&(this.overheated>0?(this.overheated=Math.max(0,this.overheated-t),this.heat=Math.max(0,this.heat-n.coolRate*1.6*t),this.overheated===0&&(this.heat=Math.min(this.heat,.25))):this.venting?(this.heat=Math.max(0,this.heat-1/(n.reloadTime*this.mods.reload)*t),this.heat===0&&(this.venting=!1)):this.heat=Math.max(0,this.heat-n.coolRate*t*(i.fire?.15:1))),i.reload&&(n.magazine>0?this.startReload():n.heatPerShot>0&&this.heat>.08&&this.overheated===0&&(this.venting=!0)),this.charging>=0){this.charging-=t,this.charging<=0&&(this.charging=-1,this.shoot(e));return}if(!(!i.fire||!this.alive||this.cooldown>0||this.reloadTimer>0||this.overheated>0||this.venting)){if(n.magazine>0&&this.ammo<=0){this.startReload();return}if(n.charge>0){this.charging=n.charge,e.events.push("charge",this.id);return}this.shoot(e)}}shoot(t){const e=this.weapon;this.cooldown=e.cooldown*this.mods.reload,e.magazine>0&&(this.ammo--,this.ammo<=0&&this.startReload()),e.heatPerShot>0&&(this.heat+=e.heatPerShot,this.heat>=1&&(this.heat=1,this.overheated=e.overheatLock,t.events.push("overheat",this.id))),this.recoil=1,this.stats.shots++,this.spawnProtect=0;const n=e.recoil*1.2/this.hull.mass;this.kx-=Math.sin(this.turretYaw)*n,this.kz-=Math.cos(this.turretYaw)*n,t.fireWeapon(this)}stepAbility(t,e){const n=sr[this.hull.ability];this.abilityTimer<=0&&(this.abilityCharge=Math.min(1,this.abilityCharge+t/n.chargeTime)),!(!this.controls.ability||this.abilityCharge<1||!this.alive)&&(this.abilityCharge=0,this.abilityTimer=n.duration,n.id==="dash"?this.dashTimer=n.duration:n.id==="aegis"?this.shieldTimer=n.duration:e.shockwave(this),e.events.push("ability",this.id,-1,n.id))}addAbilityCharge(t){this.abilityCharge=Math.min(1,this.abilityCharge+t)}barrelDir(t){const e=Math.cos(this.barrelPitch);t.x=Math.sin(this.turretYaw)*e,t.y=Math.sin(this.barrelPitch),t.z=Math.cos(this.turretYaw)*e}muzzle(t){this.barrelDir(t);const e=this.weapon.barrelLength;t.x=this.x+t.x*e,t.y=this.y+this.pivotHeight+t.y*e,t.z=this.z+t.z*e}}const ri={x:0,z:0},os={x:0,z:0},Zx={repair:20,overdrive:30,nitro:22},jx=3,Kx=8,ph=new Map;function bu(s){const t=Ox(s);let e=ph.get(s);if(!e){const n=new mx(t);e={col:n,nav:new Xx(t,n)},ph.set(s,e)}return{arena:t,...e}}const sn={t:0,x:0,y:0,z:0,nx:0,ny:0,nz:0},Ue={x:0,y:0,z:0},rn={x:0,y:0,z:0};class Jx{constructor(t){y(this,"config");y(this,"mode");y(this,"arena");y(this,"collision");y(this,"nav");y(this,"events",new Gx);y(this,"tanks",[]);y(this,"brains",[]);y(this,"projectiles");y(this,"pickups");y(this,"cp",{owner:"none",progress:0,contested:!1,blueIn:0,magentaIn:0,tick:0});y(this,"rng");y(this,"player");y(this,"time",0);y(this,"status","countdown");y(this,"countdown",jx);y(this,"timeLeft");y(this,"score",{blue:0,magenta:0});y(this,"winner","draw");this.config=t,this.mode=t.mode;const e=bu(t.arena);this.arena=e.arena,this.collision=e.col,this.nav=e.nav,this.rng=new hu(t.seed),this.timeLeft=t.timeLimit,this.projectiles=new Hx(320,Ce.plasma),this.pickups=this.arena.pickups.map(u=>({def:u,active:!0,timer:0}));const n=Me[t.mode].teams,i=8,r=[...Tv];for(let u=r.length-1;u>0;u--){const d=this.rng.int(0,u+1);[r[u],r[d]]=[r[d],r[u]]}const a=Li[t.difficulty],o=t.difficulty==="rookie"?0:t.difficulty==="veteran"?1:2,l=["hornet","vanguard","bastion"],h=["plasma","rail","volt","nova"];let c=0;for(let u=0;u<i;u++){const d=n?u%2===0?"blue":"magenta":"none";if(u===0&&t.player){const g=t.player;this.tanks.push(new fh(0,g.name,!1,d,g.loadout,g.paint,i));continue}const f={hull:this.rng.pick(l),weapon:this.rng.pick(h),paint:"graphite",upgrades:{damage:o,armor:o,speed:o,reload:o}},m=ln[this.rng.int(0,ln.length)],v=new fh(u,r[c++%r.length],!0,d,f,m,i);this.tanks.push(v),this.brains.push(new Vx(v,a,t.seed*31+u*977))}this.player=t.player?this.tanks[0]:null;for(const u of this.tanks)this.respawn(u)}step(t){if(this.time+=t,this.status==="countdown"){const e=Math.ceil(this.countdown);this.countdown-=t,Math.ceil(this.countdown)!==e&&this.countdown>0&&(this.events.push("countdown",-1,-1).value=Math.ceil(this.countdown)),this.countdown<=0&&(this.status="playing",this.events.push("countdown",-1,-1).value=0);for(const n of this.brains)n.update(this,t);for(const n of this.tanks)n.controls.throttle=0,n.controls.steer=0,n.controls.fire=!1,n.controls.ability=!1,n.controls.boost=!1,n.step(t,this);return}if(this.status==="ended"){for(const e of this.tanks)e.controls.throttle=0,e.controls.steer=0,e.controls.fire=!1,e.controls.ability=!1,e.controls.boost=!1,e.alive&&e.step(t,this);this.stepProjectiles(t);return}this.timeLeft=Math.max(0,this.timeLeft-t);for(const e of this.brains)e.update(this,t);for(const e of this.tanks)e.alive?e.step(t,this):(e.respawnTimer-=t,e.respawnTimer<=0&&this.respawn(e));this.separateTanks(),this.stepProjectiles(t),this.stepPickups(t),this.mode==="cp"&&this.stepControlPoint(t),this.checkEnd()}separateTanks(){const t=this.tanks;for(let e=0;e<t.length;e++){const n=t[e];if(n.alive)for(let i=e+1;i<t.length;i++){const r=t[i];if(!r.alive||Math.abs(n.y-r.y)>2)continue;const a=r.x-n.x,o=r.z-n.z,l=n.radius+r.radius,h=a*a+o*o;if(h>=l*l)continue;const c=Math.sqrt(h)||.001,u=a/c,d=o/c,f=l-c,m=r.hull.mass/(n.hull.mass+r.hull.mass);n.x-=u*f*m,n.z-=d*f*m,r.x+=u*f*(1-m),r.z+=d*f*(1-m),n.speed*=.96,r.speed*=.96}}for(const e of t)e.alive&&(rn.x=e.x,rn.z=e.z,this.collision.resolveCircle(rn,e.y,e.radius,null)&&(e.x=rn.x,e.z=rn.z))}fireWeapon(t){const e=t.weapon;if(t.barrelDir(Ue),e.spread>0){const u=this.rng.range(0,Math.PI*2),d=this.rng.next()*e.spread,f=Math.cos(t.turretYaw),m=-Math.sin(t.turretYaw);Ue.x+=f*Math.cos(u)*d,Ue.z+=m*Math.cos(u)*d,Ue.y+=Math.sin(u)*d;const v=Math.hypot(Ue.x,Ue.y,Ue.z);Ue.x/=v,Ue.y/=v,Ue.z/=v}t.muzzle(rn);const n=t.x,i=t.y+t.pivotHeight,r=t.z;let a=rn.x,o=rn.y,l=rn.z;this.collision.raycast(n,i,r,a-n,o-i,l-r,1,sn)&&(a=n+(a-n)*Math.max(0,sn.t-.05),o=i+(o-i)*Math.max(0,sn.t-.05),l=r+(l-r)*Math.max(0,sn.t-.05));const h=this.projectiles.spawn(t,a,o,l,Ue.x,Ue.y,Ue.z,e,t.outgoingMult),c=this.events.push("fire",t.id,h.slot,e.id);c.x=rn.x,c.y=rn.y,c.z=rn.z,c.x2=Ue.x,c.y2=Ue.y,c.z2=Ue.z}stepProjectiles(t){for(const e of this.projectiles.items){if(!e.active)continue;const n=e.weapon;e.life-=t,e.vy-=n.gravity*t;const i=e.vx*t,r=e.vy*t,a=e.vz*t;let o=2,l=null;const h=this.tanks[e.owner];for(const u of this.tanks){if(!u.alive||u.id===e.owner||!h.isEnemyOf(u))continue;const d=u.x-e.x,f=u.z-e.z,m=Math.abs(i)+Math.abs(a)+u.hull.length;if(Math.abs(d)>m||Math.abs(f)>m)continue;const v=Mu(u,e.x,e.y,e.z,i,r,a);v>=0&&v<o&&(o=v,l=u)}if(this.collision.raycast(e.x,e.y,e.z,i,r,a,1,sn)&&sn.t<o)this.impact(e,sn.x,sn.y,sn.z,sn.nx,sn.ny,sn.nz,null);else if(l){const u=e.x+i*o,d=e.y+r*o,f=e.z+a*o,m=Math.hypot(i,r,a)||1;this.impact(e,u,d,f,-i/m,-r/m,-a/m,l)}else e.life<=0?(e.x+=i,e.y+=r,e.z+=a,n.splashRadius>3?this.impact(e,e.x,e.y,e.z,0,1,0,null):this.endShot(e,e.x,e.y,e.z)):(e.x+=i,e.y+=r,e.z+=a)}}endShot(t,e,n,i){if(t.weapon.projectile==="rail"){const r=this.events.push("beam",t.owner,-1,"rail");r.x=t.ox,r.y=t.oy,r.z=t.oz,r.x2=e,r.y2=n,r.z2=i}t.active=!1}impact(t,e,n,i,r,a,o,l){const h=t.weapon,c=this.tanks[t.owner];this.endShot(t,e,n,i);const u=this.events.push("impact",l?l.id:-1,t.owner,h.id);if(u.x=e,u.y=n,u.z=i,u.x2=r,u.y2=a,u.z2=o,l){const d=h.damage*t.dmgMult;if(c.stats.hits++,this.applyDamage(l,c,d,h,e,n,i,h.pierce),h.jolt>0&&(l.jolt=Math.max(l.jolt,h.jolt)),h.knockback>0&&h.splashRadius<3){const f=Math.hypot(t.vx,t.vz)||1;l.kx+=t.vx/f*h.knockback/l.hull.mass,l.kz+=t.vz/f*h.knockback/l.hull.mass}}h.splashRadius>0&&this.explode(e+r*.3,n+a*.3,i+o*.3,h.splashRadius,h.splashDamage*t.dmgMult,c,h.splashRadius>3?h.knockback:0,h,null)}explode(t,e,n,i,r,a,o,l,h){const c=this.events.push("explode",a.id,-1,l?l.id:"shockwave");c.x=t,c.y=e,c.z=n,c.value=i;for(const u of this.tanks){if(!u.alive||u===h||!a.isEnemyOf(u))continue;const d=u.x,f=u.y+1,m=u.z,v=Math.hypot(d-t,f-e,m-n)-u.radius*.6;if(v>i||!this.collision.segmentClear(t,e,n,d,f,m))continue;const g=Qe(1-Math.max(0,v)/i,.3,1);if(this.applyDamage(u,a,r*g,l,d,f,m,0),o>0&&u.alive){const p=d-t,_=m-n,M=Math.hypot(p,_)||1,x=o*g/u.hull.mass;u.kx+=p/M*x,u.kz+=_/M*x,u.grounded&&(u.vy=Math.min(4,2.2*g/u.hull.mass*2),u.grounded=!1,u.y+=.02)}}}shockwave(t){this.explode(t.x,t.y+.8,t.z,12,46*t.outgoingMult,t,10,null,null);for(const e of this.tanks)e.alive&&t.isEnemyOf(e)&&Re(t.x,t.z,e.x,e.z)<12&&Math.abs(e.y-t.y)<3&&(e.stun=Math.max(e.stun,1.6))}applyDamage(t,e,n,i,r,a,o,l){if(!t.alive)return;const h=t.incomingMult;if(h<=0)return;const c=t.armor*(1-l),u=n*100/(100+c)*h;if(u<=0)return;t.health-=u,t.lastDamageTime=this.time,t.lastAttacker=e.id,t.damagedBy[e.id]=this.time,e.stats.damage+=u,e.addAbilityCharge(u/260);const d=this.events.push("damage",t.id,e.id,i?i.id:"shockwave");d.x=r,d.y=a,d.z=o,d.value=u,t.health<=0&&this.kill(t,e,i)}kill(t,e,n){t.health=0,t.alive=!1,t.respawnTimer=Ev,t.stats.deaths++,t.stats.streak=0,t.charging=-1,e!==t&&(e.stats.kills++,e.stats.streak++,e.stats.bestStreak=Math.max(e.stats.bestStreak,e.stats.streak),e.stats.score+=Av,this.mode==="tdm"&&e.team!=="none"&&this.score[e.team]++);for(const r of this.tanks)r===e||r===t||this.time-t.damagedBy[r.id]<Kx&&(r.stats.assists++,r.stats.score+=Rv);const i=this.events.push("kill",t.id,e.id,n?n.id:"shockwave");i.x=t.x,i.y=t.y,i.z=t.z,i.value=e.stats.streak}respawn(t){const e=this.pickSpawn(t);t.spawn(e.x,this.collision.surfaceHeight(e.x,e.z,0),e.z,e.yaw);const n=this.brains.find(i=>i.tank===t);n&&n.reset(),this.events.push("spawn",t.id)}pickSpawn(t){const e=this.arena.spawns,n=t.team==="blue"?e.blue:t.team==="magenta"?e.magenta:e.ffa;let i=n[0],r=-1/0;for(const a of n){let o=200,l=!1;for(const c of this.tanks){if(!c.alive||c===t)continue;const u=Re(a.x,a.z,c.x,c.z);u<6&&(l=!0),t.isEnemyOf(c)&&(o=Math.min(o,u))}const h=o+this.rng.range(0,12)-(l?100:0);h>r&&(r=h,i=a)}return i}stepPickups(t){for(let e=0;e<this.pickups.length;e++){const n=this.pickups[e];if(!n.active){n.timer-=t,n.timer<=0&&(n.active=!0,this.events.push("pickupReady",-1,e,n.def.kind));continue}for(const i of this.tanks){if(!i.alive||Math.abs(i.y-n.def.y)>2||Re(i.x,i.z,n.def.x,n.def.z)>2.8)continue;if(n.def.kind==="repair"){if(i.health>=i.maxHealth-1)continue;i.health=Math.min(i.maxHealth,i.health+i.maxHealth*.5)}else n.def.kind==="overdrive"?i.overdrive=12:(i.nitro=10,i.boost=1);n.active=!1,n.timer=Zx[n.def.kind];const r=this.events.push("pickup",i.id,e,n.def.kind);r.x=n.def.x,r.y=n.def.y,r.z=n.def.z;break}}}stepControlPoint(t){const e=this.cp,n=this.arena.controlPoint;let i=0,r=0;for(const o of this.tanks)!o.alive||Math.abs(o.y-n.y)>2.2||Re(o.x,o.z,n.x,n.z)>n.r||(o.team==="blue"?i++:o.team==="magenta"&&r++,o.stats.captureTime+=t);e.blueIn=i,e.magentaIn=r,e.contested=i>0&&r>0;const a=e.progress;if(!e.contested&&(i>0||r>0)){const o=Math.max(i,r),l=.2*(1+.35*(Math.min(o,3)-1));e.progress=Qe(e.progress+(i>0?l:-l)*t,-1,1)}else if(i===0&&r===0){const o=e.owner==="blue"?1:e.owner==="magenta"?-1:0;e.progress+=Qe(o-e.progress,-.06*t,.06*t)}if(e.owner!=="blue"&&e.progress>=1?this.captured("blue"):e.owner!=="magenta"&&e.progress<=-1?this.captured("magenta"):e.owner==="blue"&&a>0&&e.progress<=0?(e.owner="none",this.events.push("neutral")):e.owner==="magenta"&&a<0&&e.progress>=0&&(e.owner="none",this.events.push("neutral")),e.owner==="blue"||e.owner==="magenta")for(e.tick+=t;e.tick>=1;)e.tick-=1,this.score[e.owner]++;else e.tick=0}captured(t){this.cp.owner=t,this.events.push("capture",-1,-1,t);const e=this.arena.controlPoint;for(const n of this.tanks)n.alive&&n.team===t&&Re(n.x,n.z,e.x,e.z)<=e.r&&(n.stats.score+=60)}checkEnd(){const t=this.config.scoreLimit;let e=this.timeLeft<=0;if(Me[this.mode].teams?(this.score.blue>=t||this.score.magenta>=t)&&(e=!0):this.tanks.some(n=>n.stats.kills>=t)&&(e=!0),!!e){if(this.status="ended",Me[this.mode].teams)this.winner=this.score.blue>this.score.magenta?"blue":this.score.magenta>this.score.blue?"magenta":"draw";else{const n=this.ranking(),i=n[0],r=n[1];this.winner=r&&i.stats.kills===r.stats.kills&&i.stats.deaths===r.stats.deaths?"draw":i.id}this.events.push("matchEnd")}}ranking(){return[...this.tanks].sort((t,e)=>e.stats.kills-t.stats.kills||e.stats.score-t.stats.score||t.stats.deaths-e.stats.deaths)}playerResult(){const t=this.player;return!t||this.winner==="draw"?"draw":typeof this.winner=="number"?this.winner===t.id?"win":"loss":this.winner===t.team?"win":"loss"}}function tt(s){const t=document.getElementById(s);if(!t)throw new Error(`#${s} missing from index.html`);return t}const Qx={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};function On(s){return s.replace(/[&<>"']/g,t=>Qx[t])}function Su(s){const t=Math.max(0,Math.ceil(s));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}const ai=new D;class t_{constructor(){y(this,"root",tt("hud"));y(this,"world",null);y(this,"player",null);y(this,"plates",[]);y(this,"dnums",[]);y(this,"dnIdx",0);y(this,"arcs",[]);y(this,"arcIdx",0);y(this,"spotted",[]);y(this,"spottedTimer",0);y(this,"lastFired",[]);y(this,"hitT",0);y(this,"bannerT",0);y(this,"hpGhost",1);y(this,"lastAmmoKey","");y(this,"lastChips","");y(this,"mapBase",null);y(this,"mapCtx",tt("minimap").getContext("2d"));y(this,"damageFlash",0);y(this,"el",{hpFill:tt("hpFill"),hpGhost:tt("hpGhost"),hpNum:tt("hpNum"),boostFill:tt("boostFill"),armorNum:tt("armorNum"),chips:tt("chips"),wName:tt("wName"),ammo:tt("ammo"),wBar:tt("wBar"),wState:tt("wState"),abPanel:tt("abilityPanel"),abFill:tt("abFill"),abName:tt("abName"),abState:tt("abState"),timer:tt("hudTimer"),mode:tt("hudMode"),cpMeter:tt("cpMeter"),cpFill:tt("cpFill"),cpLabel:tt("cpLabel"),sBlue:tt("scoreBlue"),sBlueVal:tt("scoreBlueVal"),sBlueBar:tt("scoreBlueBar"),sBlueLbl:tt("scoreBlueLbl"),sMag:tt("scoreMag"),sMagVal:tt("scoreMagVal"),sMagBar:tt("scoreMagBar"),sMagLbl:tt("scoreMagLbl"),killfeed:tt("killfeed"),reticle:tt("reticle"),hitmarker:tt("hitmarker"),dmgDir:tt("dmgDir"),banner:tt("banner"),bannerKicker:tt("bannerKicker"),bannerTitle:tt("bannerTitle"),countdown:tt("countdown"),respawn:tt("respawn"),respawnBy:tt("respawnBy"),respawnTime:tt("respawnTime"),scoreboard:tt("scoreboard"),fps:tt("fps"),fxDamage:tt("fxDamage"),plates:tt("plates"),dmgNumbers:tt("dmgNumbers")});y(this,"mapScale",1);y(this,"mapHalf",70);for(let t=0;t<24;t++){const e=document.createElement("div");e.className="dnum",e.style.opacity="0",this.el.dmgNumbers.appendChild(e),this.dnums.push({el:e,x:0,y:0,z:0,t:0,drift:0})}for(let t=0;t<4;t++){const e=document.createElement("div");e.className="dmg-arc",e.style.opacity="0",this.el.dmgDir.appendChild(e),this.arcs.push({el:e,t:0,fromX:0,fromZ:0})}}show(t){this.root.classList.toggle("hidden",!t)}setFps(t,e){this.el.fps.classList.toggle("hidden",!t),t&&(this.el.fps.textContent=`${e.toFixed(0)} FPS`)}bind(t){this.world=t,this.player=t.player,this.el.plates.textContent="",this.plates=t.tanks.map(i=>{const r=document.createElement("div");r.className=`plate ${i.team==="none"?"ffa":i.team}`;const a=document.createElement("div");a.className="name",a.innerHTML=`${On(i.name)}${i.isBot?"<small>BOT</small>":""}`;const o=document.createElement("div");o.className="hp";const l=document.createElement("b");return o.appendChild(l),r.append(a,o),r.style.display="none",this.el.plates.appendChild(r),{el:r,name:a,hp:l,visible:!1}}),this.spotted=t.tanks.map(()=>!1),this.lastFired=t.tanks.map(()=>-99),this.el.killfeed.textContent="",this.el.respawn.classList.add("hidden"),this.el.scoreboard.classList.add("hidden"),this.lastAmmoKey="",this.lastChips="",this.hpGhost=1;const e=Me[t.mode];this.el.mode.textContent=`${e.name} · ${t.config.scoreLimit}`,this.el.cpMeter.classList.toggle("hidden",t.mode!=="cp");const n=e.teams;if(this.el.sBlueLbl.textContent=n?"RIDERS":"YOU",this.el.sMagLbl.textContent=n?"OUTLAWS":"LEADER",this.player){const i=this.player.weapon;this.el.wName.textContent=i.name,this.el.abName.textContent=sr[this.player.hull.ability].name}this.buildMinimap()}onEvent(t){const e=this.world,n=this.player;if(e)switch(t.type){case"fire":this.lastFired[t.a]=e.time;break;case"damage":if(n&&t.b===n.id&&t.a!==n.id&&(this.hitT=.22,this.el.hitmarker.classList.remove("kill"),this.number(t.x,t.y+1.5,t.z,t.value,t.value>=40?"big":"")),n&&t.a===n.id){this.damageFlash=Math.min(1,this.damageFlash+t.value/60);const i=e.tanks[t.b];this.arc(i.x,i.z)}break;case"kill":{const i=e.tanks[t.a],r=e.tanks[t.b];if(this.feed(r,i,t.kind),n&&r===n&&i!==n){this.hitT=.4,this.el.hitmarker.classList.add("kill");const a=t.value,o=a>=5?"RAMPAGE":a===4?"QUAD KILL":a===3?"TRIPLE KILL":a===2?"DOUBLE KILL":"ENEMY DESTROYED";this.banner(i.name,o,a>=2?"amber":"")}n&&i===n&&(this.el.respawnBy.textContent=r===n?"SELF-DESTRUCTED":`DESTROYED BY ${r.name}`);break}case"capture":n&&this.banner("CONTROL POINT",t.kind===n.team?"CAPTURED":"LOST",t.kind===n.team?"":"red");break;case"neutral":n&&this.banner("CONTROL POINT","NEUTRALISED","amber");break;case"pickup":n&&t.a===n.id&&this.banner("PICKUP",t.kind==="repair"?"HULL REPAIRED":t.kind==="overdrive"?"OVERDRIVE ×1.5 DMG":"NITRO CHARGED",t.kind==="overdrive"?"amber":"");break;case"overheat":n&&t.a===n.id&&this.banner("VOLT EMITTER","OVERHEATED","red");break;case"countdown":this.countdown(t.value);break}}feed(t,e,n){const i=this.player,r=l=>i&&l===i?"self":l.team==="none"?"ffa":l.team,a=n==="shockwave"?"SHOCKWAVE":Ce[n]?.name??"",o=document.createElement("div");for(o.className=`kf${i&&(t===i||e===i)?" me":""}`,o.innerHTML=`<span class="${r(t)}">${On(t.name)}</span><span class="w">${On(a)}</span><span class="${r(e)}">${On(e.name)}</span>`,this.el.killfeed.prepend(o);this.el.killfeed.children.length>5;)this.el.killfeed.lastElementChild?.remove();window.setTimeout(()=>o.remove(),6e3)}banner(t,e,n=""){this.el.bannerKicker.textContent=t,this.el.bannerTitle.textContent=e,this.el.banner.className=`banner show ${n}`,this.bannerT=2.2}countdown(t){const e=this.el.countdown;e.textContent=t>0?String(t):"FIGHT",e.classList.remove("pop"),e.offsetWidth,e.classList.add("pop")}number(t,e,n,i,r){const a=this.dnums[this.dnIdx];this.dnIdx=(this.dnIdx+1)%this.dnums.length,a.x=t,a.y=e,a.z=n,a.t=.9,a.drift=(Math.random()-.5)*30,a.el.textContent=String(Math.round(i)),a.el.className=`dnum ${r}`}arc(t,e){const n=this.arcs[this.arcIdx];this.arcIdx=(this.arcIdx+1)%this.arcs.length,n.t=1.2,n.fromX=t,n.fromZ=e}update(t,e,n,i,r,a){const o=this.world,l=this.player;if(!o||!l)return;const h=Math.max(0,l.health/l.maxHealth);this.hpGhost=h>this.hpGhost?h:this.hpGhost+(h-this.hpGhost)*Math.min(1,t*2.5),this.el.hpFill.style.width=`${h*100}%`,this.el.hpFill.className=h<.3?"low":h<.6?"mid":"",this.el.hpGhost.style.width=`${this.hpGhost*100}%`,this.el.hpNum.textContent=String(Math.ceil(l.health)),this.el.boostFill.style.width=`${l.boost*100}%`,this.el.armorNum.textContent=`ARM ${l.armor}`;const c=[];l.overdrive>0&&c.push(`<span class="chip amber">OVERDRIVE ${Math.ceil(l.overdrive)}s</span>`),l.nitro>0&&c.push(`<span class="chip cyan">NITRO ${Math.ceil(l.nitro)}s</span>`),l.shieldTimer>0&&c.push(`<span class="chip cyan">AEGIS ${Math.ceil(l.shieldTimer)}s</span>`),l.spawnProtect>0&&c.push('<span class="chip green">SPAWN SHIELD</span>'),l.jolt>0&&c.push('<span class="chip red">JOLTED</span>'),l.stun>0&&c.push('<span class="chip red">TURRET JAMMED</span>'),o.time-l.lastDamageTime>6&&l.health<l.maxHealth&&l.alive&&c.push('<span class="chip green">SELF-REPAIR</span>');const u=c.join("");u!==this.lastChips&&(this.el.chips.innerHTML=u,this.lastChips=u);const d=l.weapon;let f="";if(d.magazine>0&&(f=`m${l.ammo}/${d.magazine}`),f!==this.lastAmmoKey){this.lastAmmoKey=f;let C="";if(d.magazine>0)for(let A=0;A<d.magazine;A++)C+=`<i class="${A<l.ammo?"":"spent"}"></i>`;this.el.ammo.innerHTML=C}let m=1,v="READY",g=!1;l.reloadTimer>0?(m=l.reloadProgress,v="RELOADING"):d.heatPerShot>0?(m=l.heat,g=!0,v=l.overheated>0?"OVERHEATED":l.venting?"VENTING":l.heat>.75?"HEAT CRITICAL":"HEAT"):l.charging>=0?(m=1-l.charging/d.charge,v="CHARGING"):l.cooldown>0&&d.cooldown>.4&&(m=1-l.cooldown/(d.cooldown*l.mods.reload),v="CYCLING"),this.el.wBar.style.width=`${Math.max(0,Math.min(1,m))*100}%`,this.el.wBar.className=g?"hot":"",this.el.wState.textContent=v;const p=l.abilityCharge;this.el.abFill.style.strokeDashoffset=String(125.66*(1-p));const _=p>=1;this.el.abPanel.classList.toggle("ready",_),this.el.abState.textContent=l.abilityTimer>0?"ACTIVE":_?"READY":`${Math.floor(p*100)}%`,this.el.timer.textContent=Su(o.timeLeft),this.el.timer.classList.toggle("low",o.timeLeft<30);const M=o.config.scoreLimit;if(Me[o.mode].teams)this.el.sBlueVal.textContent=String(o.score.blue),this.el.sMagVal.textContent=String(o.score.magenta),this.el.sBlueBar.style.width=`${Math.min(1,o.score.blue/M)*100}%`,this.el.sMagBar.style.width=`${Math.min(1,o.score.magenta/M)*100}%`;else{let C=0;for(const A of o.tanks)A!==l&&(C=Math.max(C,A.stats.kills));this.el.sBlueVal.textContent=String(l.stats.kills),this.el.sMagVal.textContent=String(C),this.el.sBlueBar.style.width=`${Math.min(1,l.stats.kills/M)*100}%`,this.el.sMagBar.style.width=`${Math.min(1,C/M)*100}%`}if(o.mode==="cp"){const C=o.cp,A=this.el.cpFill,R=Math.abs(C.progress)*50;A.style.width=`${R}%`,A.style.left=C.progress>=0?"50%":`${50-R}%`,A.style.background=C.progress>=0?"var(--blue)":"var(--magenta)",this.el.cpLabel.textContent=C.contested?"CONTESTED":C.owner==="none"?C.blueIn||C.magentaIn?"CAPTURING":"NEUTRAL":`${C.owner.toUpperCase()} HOLDS`}this.el.respawn.classList.toggle("hidden",l.alive||o.status!=="playing"),l.alive||(this.el.respawnTime.textContent=String(Math.max(1,Math.ceil(l.respawnTimer)))),this.hitT=Math.max(0,this.hitT-t),this.el.hitmarker.style.opacity=String(Math.min(1,this.hitT*6)),this.bannerT>0&&(this.bannerT-=t,this.bannerT<=0&&this.el.banner.classList.remove("show")),this.damageFlash=Math.max(0,this.damageFlash-t*1.4);const x=l.alive&&h<.3?.25+.15*Math.sin(o.time*6):0;this.el.fxDamage.style.opacity=String(Math.min(1,this.damageFlash+x)),a&&l.alive?(this.el.reticle.style.display="",this.el.reticle.style.transform=`translate(${a.x}px, ${a.y}px)`,this.el.reticle.classList.toggle("blocked",a.blocked),this.el.reticle.classList.toggle("cooling",!a.ready)):this.el.reticle.style.display="none";for(const C of this.arcs){if(C.t<=0){C.el.style.opacity!=="0"&&(C.el.style.opacity="0");continue}C.t-=t;const A=Math.atan2(C.fromX-l.x,C.fromZ-l.z)-n;C.el.style.transform=`rotate(${-A}rad)`,C.el.style.opacity=String(Math.min(1,C.t*1.5))}this.updateSpotting(t),this.updatePlates(e,i,r),this.updateNumbers(t,e,i,r),this.drawMinimap(n)}updateSpotting(t){const e=this.world,n=this.player;if(this.spottedTimer-=t,!(this.spottedTimer>0)){this.spottedTimer=.2;for(const i of e.tanks){if(i===n||!i.alive){this.spotted[i.id]=!1;continue}if(!n.isEnemyOf(i)){this.spotted[i.id]=!0;continue}const r=Math.hypot(i.x-n.x,i.z-n.z),a=r<110&&e.collision.segmentClear(n.x,n.y+n.pivotHeight,n.z,i.x,i.y+1.2,i.z);this.spotted[i.id]=a||r<18||e.time-this.lastFired[i.id]<1.5&&r<70}}}updatePlates(t,e,n){const i=this.world,r=this.player;for(const a of i.tanks){const o=this.plates[a.id];let l=a!==r&&a.alive&&this.spotted[a.id];const h=r.isEnemyOf(a);let c=0,u=0,d=!1;if(l){ai.set(a.x,a.y+a.hull.turretHeight+2.1,a.z).project(t);const f=ai.z>1;c=(ai.x*.5+.5)*e,u=(-ai.y*.5+.5)*n;const m=Math.hypot(a.x-t.position.x,a.z-t.position.z);if(f||c<0||c>e||u<0||u>n)if(!h)l=!1;else{d=!0,f&&(c=e-c,u=n-u);const v=e/2,g=n/2,p=c-v,_=u-g,M=Math.min((v-40)/Math.max(1,Math.abs(p)),(g-50)/Math.max(1,Math.abs(_)));c=v+p*M,u=g+_*M}else m>140&&(l=!1)}l!==o.visible&&(o.el.style.display=l?"":"none",o.visible=l),l&&(o.el.style.transform=`translate(${c.toFixed(1)}px, ${u.toFixed(1)}px) translate(-50%, -100%)`,o.el.classList.toggle("offscreen",d),o.hp.style.width=`${a.health/a.maxHealth*100}%`)}}updateNumbers(t,e,n,i){for(const r of this.dnums){if(r.t<=0)continue;if(r.t-=t,ai.set(r.x,r.y+(.9-r.t)*1.6,r.z).project(e),r.t<=0||ai.z>1){r.el.style.opacity="0";continue}const a=(ai.x*.5+.5)*n+r.drift*(.9-r.t),o=(-ai.y*.5+.5)*i;r.el.style.transform=`translate(${a.toFixed(1)}px, ${o.toFixed(1)}px) translate(-50%, -50%)`,r.el.style.opacity=String(Math.min(1,r.t*3))}}buildMinimap(){const e=this.world.arena,n=200,i=document.createElement("canvas");i.width=n,i.height=n;const r=i.getContext("2d"),a=n/(e.half*2+8),o=c=>(c+e.half+4)*a,l=c=>(c+e.half+4)*a;r.fillStyle="rgba(21, 6, 7, 0.92)",r.fillRect(0,0,n,n),r.strokeStyle="rgba(171, 11, 26, 0.22)";for(let c=-e.half;c<=e.half;c+=10)r.beginPath(),r.moveTo(o(c),l(-e.half)),r.lineTo(o(c),l(e.half)),r.stroke(),r.beginPath(),r.moveTo(o(-e.half),l(c)),r.lineTo(o(e.half),l(c)),r.stroke();const h=[...e.boxes].sort((c,u)=>c.maxY-u.maxY);for(const c of h)if(!c.hidden){if(c.mat==="barrier")r.fillStyle="rgba(241, 237, 231, 0.55)";else if(c.mat==="boundary")r.fillStyle="rgba(175, 125, 126, 0.5)";else{const u=Math.min(1,c.maxY/8);r.fillStyle=`rgba(${Math.round(150+u*61)},${Math.round(100+u*85)},${Math.round(102+u*81)},${.35+u*.4})`}r.fillRect(o(c.minX),l(c.minZ),Math.max(1,(c.maxX-c.minX)*a),Math.max(1,(c.maxZ-c.minZ)*a))}for(const c of e.ramps)r.fillStyle=c.bridge?"rgba(241, 237, 231, 0.3)":"rgba(175, 125, 126, 0.4)",r.fillRect(o(c.minX),l(c.minZ),(c.maxX-c.minX)*a,(c.maxZ-c.minZ)*a);this.mapBase=i,this.mapScale=a,this.mapHalf=e.half+4}drawMinimap(t){const e=this.world,n=this.player,i=this.mapCtx,r=200;i.clearRect(0,0,r,r),this.mapBase&&i.drawImage(this.mapBase,0,0);const a=this.mapScale,o=h=>r-(h+this.mapHalf)*a,l=h=>r-(h+this.mapHalf)*a;if(e.mode==="cp"){const h=e.arena.controlPoint;i.beginPath(),i.arc(o(h.x),l(h.z),h.r*a,0,Math.PI*2),i.fillStyle=e.cp.owner==="blue"?"rgba(211, 185, 183, 0.4)":e.cp.owner==="magenta"?"rgba(227, 0, 22, 0.4)":"rgba(233, 107, 116, 0.18)",i.fill(),i.strokeStyle=e.cp.contested?"#E30016":"#E96B74",i.stroke()}for(let h=0;h<e.pickups.length;h++){const c=e.pickups[h];c.active&&(i.fillStyle=c.def.kind==="repair"?"#EEB9B9":c.def.kind==="overdrive"?"#E96B74":"#F1EDE7",i.fillRect(o(c.def.x)-2.5,l(c.def.z)-2.5,5,5))}for(const h of e.tanks){if(!h.alive||h===n)continue;const c=n.isEnemyOf(h);c&&!this.spotted[h.id]||(i.fillStyle=c?"#E30016":"#D3B9B7",i.beginPath(),i.arc(o(h.x),l(h.z),3.2,0,Math.PI*2),i.fill())}if(n.alive){const h=o(n.x),c=l(n.z);i.fillStyle="rgba(241, 237, 231, 0.12)",i.beginPath(),i.moveTo(h,c);const u=Math.atan2(-Math.cos(t),-Math.sin(t));i.arc(h,c,34,u-.55,u+.55),i.closePath(),i.fill(),i.save(),i.translate(h,c),i.rotate(-n.heading),i.fillStyle="#F1EDE7",i.beginPath(),i.moveTo(0,-6),i.lineTo(4.5,5),i.lineTo(-4.5,5),i.closePath(),i.fill(),i.restore()}}showScoreboard(t){const e=this.world;this.el.scoreboard.classList.toggle("hidden",!t),t&&e&&(this.el.scoreboard.innerHTML=wu(e))}}function wu(s){const t=s.player,e=r=>`<tr class="${r===t?"me":""}${r.alive?"":" dead"}"><td>${On(r.name)}${r.isBot?'<span class="bot">BOT</span>':""}</td><td>${r.stats.kills}</td><td>${r.stats.deaths}</td><td>${r.stats.assists}</td><td>${Math.round(r.stats.damage)}</td><td>${r.stats.score}</td></tr>`,n="<tr><th>TANK</th><th>K</th><th>D</th><th>A</th><th>DMG</th><th>SCORE</th></tr>",i=s.ranking();if(Me[s.mode].teams){const r=i.filter(o=>o.team==="blue"),a=i.filter(o=>o.team==="magenta");return`<div class="sb-cols"><div><div class="sb-title blue">RIDERS · ${s.score.blue}</div><table class="sb">${n}${r.map(e).join("")}</table></div><div><div class="sb-title magenta">OUTLAWS · ${s.score.magenta}</div><table class="sb">${n}${a.map(e).join("")}</table></div></div>`}return`<div class="sb-cols one"><div><div class="sb-title">FREE-FOR-ALL · FIRST TO ${s.config.scoreLimit}</div><table class="sb">${n}${i.map(e).join("")}</table></div></div>`}const el=30;function Tu(){return{version:1,callsign:"PILOT",level:1,xp:0,credits:300,owned:{hulls:["hornet","vanguard"],weapons:["plasma"],paints:["graphite"]},loadout:{hull:"vanguard",weapon:"plasma",paint:"graphite",upgrades:{damage:0,armor:0,speed:0,reload:0}},stats:{matches:0,wins:0,kills:0,deaths:0,assists:0,damage:0,bestStreak:0,playTime:0},tutorialDone:!1,match:{mode:"tdm",arena:"docks",difficulty:"veteran",scoreLimit:25,timeLimit:480}}}function jr(s){return 400+s*200}function e_(s){const t=s.result==="win"?300:s.result==="draw"?150:90,e=Math.round(s.score+s.damage/10+t),n=Math.round(s.kills*20+s.assists*8+s.damage/25+(s.result==="win"?150:60));return{xp:e,credits:n}}function n_(s,t){const{xp:e,credits:n}=e_(t),i=s.level;for(s.credits+=n,s.xp+=e;s.level<el&&s.xp>=jr(s.level);)s.xp-=jr(s.level),s.level++;s.level>=el&&(s.xp=Math.min(s.xp,jr(s.level)));const r=s.stats;r.matches++,t.result==="win"&&r.wins++,r.kills+=t.kills,r.deaths+=t.deaths,r.assists+=t.assists,r.damage+=Math.round(t.damage),r.bestStreak=Math.max(r.bestStreak,t.bestStreak),r.playTime+=t.duration;const a=[];for(const o of Object.values(Ze))o.unlockLevel>i&&o.unlockLevel<=s.level&&a.push(o.name);for(const o of Object.values(Ce))o.unlockLevel>i&&o.unlockLevel<=s.level&&a.push(o.name);for(const o of ln)o.unlockLevel>i&&o.unlockLevel<=s.level&&a.push(o.name);return{xp:e,credits:n,levelsGained:s.level-i,newLevel:s.level,unlocked:a}}function wl(s){if(s.kind==="hull")return{name:Ze[s.id].name,level:Ze[s.id].unlockLevel,cost:Ze[s.id].cost};if(s.kind==="weapon")return{name:Ce[s.id].name,level:Ce[s.id].unlockLevel,cost:Ce[s.id].cost};const t=ln.find(e=>e.id===s.id);return{name:t.name,level:t.unlockLevel,cost:t.cost}}function Eu(s,t){return t.kind==="hull"?s.owned.hulls.includes(t.id):t.kind==="weapon"?s.owned.weapons.includes(t.id):s.owned.paints.includes(t.id)}function Au(s,t){if(Eu(s,t))return"owned";const e=wl(t);return s.level<e.level?"level":s.credits<e.cost?"credits":"ok"}function i_(s,t){const e=Au(s,t);return e!=="ok"?e:(s.credits-=wl(t).cost,t.kind==="hull"?s.owned.hulls.push(t.id):t.kind==="weapon"?s.owned.weapons.push(t.id):s.owned.paints.push(t.id),"ok")}function Ru(s){return s>=zn?1/0:wv[s]}function s_(s,t){const e=s.loadout.upgrades[t],n=Ru(e);return s.credits<n?!1:(s.credits-=n,s.loadout.upgrades[t]=e+1,!0)}const r_=["menu","modes","garage","settings","controls","pause","end"];class a_{constructor(t,e,n){y(this,"current","none");y(this,"returnTo","menu");y(this,"tab","hulls");y(this,"selected",null);y(this,"profile");y(this,"settings");y(this,"cb");this.profile=t,this.settings=e,this.cb=n,this.wire(),this.bindSettings()}setProfile(t){this.profile=t,this.refreshProfile()}wire(){const t=(e,n,i="click")=>{tt(e).addEventListener("click",()=>{this.cb.sound(i),n()})};t("btnPlay",()=>this.cb.deploy(),"confirm"),t("btnModes",()=>this.show("modes")),t("btnGarage",()=>this.show("garage")),t("btnSettings",()=>this.show("settings","menu")),t("btnControls",()=>this.show("controls","menu")),t("btnDeploy",()=>this.cb.deploy(),"confirm"),t("btnGarageDeploy",()=>this.cb.deploy(),"confirm"),t("btnResume",()=>this.cb.resume(),"confirm"),t("btnRestart",()=>this.cb.restart()),t("btnPauseSettings",()=>this.show("settings","pause")),t("btnPauseControls",()=>this.show("controls","pause")),t("btnQuit",()=>this.cb.quit(),"back"),t("btnEndAgain",()=>this.cb.deploy(),"confirm"),t("btnEndGarage",()=>this.show("garage")),t("btnEndMenu",()=>this.show("menu"),"back"),t("btnReset",()=>{window.confirm("Reset level, credits, unlocks and upgrades? This cannot be undone.")&&this.cb.resetProgress()}),document.querySelectorAll("[data-back]").forEach(e=>e.addEventListener("click",()=>{this.cb.sound("back"),this.back()})),document.querySelectorAll(".btn, .card, .tabs button").forEach(e=>e.addEventListener("mouseenter",()=>this.cb.sound("hover"))),tt("garageTabs").addEventListener("click",e=>{const n=e.target.closest("[data-tab]");n&&(this.cb.sound("click"),this.tab=n.dataset.tab,this.selected=null,this.renderGarage())})}back(){switch(this.current){case"settings":case"controls":this.show(this.returnTo);break;case"modes":case"garage":this.cb.preview(this.profile.loadout),this.show("menu");break;case"pause":this.cb.resume();break}}show(t,e){e&&(this.returnTo=e),this.current=t;for(const i of r_)tt(i).classList.toggle("hidden",i!==t);t==="menu"&&this.renderMenu(),t==="modes"&&this.renderModes(),t==="garage"&&(this.selected=null,this.renderGarage()),t==="settings"&&this.syncSettings(),this.cb.screenChanged(t),(t!=="none"?tt(t).querySelector("button, a, input"):null)?.focus({preventScroll:!0})}refreshProfile(){const t=this.profile;tt("pfCall").textContent=t.callsign,tt("pfLevel").textContent=String(t.level);const e=jr(t.level);tt("pfXp").style.width=`${Math.min(1,t.xp/e)*100}%`,tt("pfXpText").textContent=`${t.xp} / ${e} XP`,tt("pfCredits").textContent=t.credits.toLocaleString("en-US"),tt("gCredits").textContent=t.credits.toLocaleString("en-US");const n=t.match;tt("playSub").textContent=`${Me[n.mode].name} · ${js[n.arena].name} · ${Li[n.difficulty].name}`}renderMenu(){this.refreshProfile();const t=this.profile,e=t.stats,n=e.deaths?(e.kills/e.deaths).toFixed(2):e.kills.toFixed(0),i=t.loadout;tt("careerPanel").innerHTML=`
      <h4>CAREER</h4>
      <dl>
        <dt>Matches</dt><dd>${e.matches}</dd>
        <dt>Wins</dt><dd>${e.wins}</dd>
        <dt>Kills / deaths</dt><dd>${e.kills} / ${e.deaths} (${n})</dd>
        <dt>Best streak</dt><dd>${e.bestStreak}</dd>
        <dt>Damage dealt</dt><dd>${e.damage.toLocaleString("en-US")}</dd>
        <dt>Time in combat</dt><dd>${Su(e.playTime)}</dd>
      </dl>
      <div class="build"><b>CURRENT BUILD</b><br>${Ze[i.hull].name} · ${Ce[i.weapon].name}<br><span class="muted">${On(ln.find(r=>r.id===i.paint)?.name??"")} · upgrades ${i.upgrades.damage}/${i.upgrades.armor}/${i.upgrades.speed}/${i.upgrades.reload}</span></div>`}renderModes(){const t=this.profile.match,e=Object.keys(Me).map(a=>{const o=Me[a];return`<button type="button" class="card${t.mode===a?" active":""}" data-mode="${a}"><h5>${o.name}</h5><p>${o.blurb}</p><span class="tag">${o.teams?"4 V 4 · BOTS":"8 TANKS · BOTS"}</span></button>`}).join("");tt("modeCards").innerHTML=e,tt("arenaCards").innerHTML=Bx.map(a=>`<button type="button" class="card${t.arena===a?" active":""}" data-arena="${a}"><h5>${js[a].name}</h5><p>${js[a].subtitle}</p></button>`).join("");const n=(a,o,l,h)=>{tt(a).innerHTML=o.map(([c,u])=>`<button type="button" data-${h}="${c}" class="${c===l?"active":""}">${u}</button>`).join("")};n("segDifficulty",Object.keys(Li).map(a=>[a,Li[a].name]),t.difficulty,"diff");const i=Me[t.mode];n("segScore",i.scoreLimits.map(a=>[String(a),String(a)]),String(t.scoreLimit),"score"),n("segTime",i.timeLimits.map(a=>[String(a),`${a/60} MIN`]),String(t.timeLimit),"time");const r=(a,o,l)=>{tt(a).onclick=h=>{const c=h.target.closest(`[data-${o}]`);c&&(this.cb.sound("click"),l(c.dataset[o]),this.cb.profileChanged(),this.renderModes(),this.refreshProfile())}};r("modeCards","mode",a=>{t.mode=a,Me[t.mode].scoreLimits.includes(t.scoreLimit)||(t.scoreLimit=Me[t.mode].defaultScore)}),r("arenaCards","arena",a=>{t.arena=a}),r("segDifficulty","diff",a=>{t.difficulty=a}),r("segScore","score",a=>{t.scoreLimit=Number(a)}),r("segTime","time",a=>{t.timeLimit=Number(a)})}previewLoadout(){const t={...this.profile.loadout,upgrades:{...this.profile.loadout.upgrades}},e=this.selected;return e?.kind==="hull"&&(t.hull=e.id),e?.kind==="weapon"&&(t.weapon=e.id),e?.kind==="paint"&&(t.paint=e.id),t}renderGarage(){const t=this.profile;this.refreshProfile(),document.querySelectorAll("#garageTabs [data-tab]").forEach(a=>a.classList.toggle("active",a.dataset.tab===this.tab));const e=tt("garageList"),n=this.tab==="hulls"?Object.keys(Ze).map(a=>({kind:"hull",id:a})):this.tab==="weapons"?Object.keys(Ce).map(a=>({kind:"weapon",id:a})):this.tab==="paint"?ln.map(a=>({kind:"paint",id:a.id})):[];if(this.tab==="upgrades"){e.innerHTML=Sv.map(a=>{const o=t.loadout.upgrades[a.id],l=Ru(o),h=o>=zn,c=Array.from({length:zn},(u,d)=>`<i class="${d<o?"on":""}"></i>`).join("");return`<div class="item"><h5>${a.name}</h5><span class="state">LV ${o}/${zn}</span><p>${a.perLevel} per level. Applies to every hull and turret.</p><div class="upg-pips">${c}</div><div class="act">${h?'<span class="state">MAXED</span>':`<button type="button" class="btn${t.credits>=l?" primary":""}" data-upgrade="${a.id}" ${t.credits>=l?"":"disabled"}>UPGRADE · ◆ ${l}</button>`}</div></div>`}).join(""),e.onclick=a=>{const o=a.target.closest("[data-upgrade]");o&&(s_(t,o.dataset.upgrade)?(this.cb.sound("confirm"),this.cb.profileChanged()):this.cb.sound("deny"),this.renderGarage())},this.renderStats(this.previewLoadout()),this.cb.preview(this.previewLoadout());return}const i=a=>a.kind==="hull"?t.loadout.hull===a.id:a.kind==="weapon"?t.loadout.weapon===a.id:t.loadout.paint===a.id;e.innerHTML=n.map((a,o)=>{const l=wl(a),h=Eu(t,a),c=Au(t,a),u=this.selected?this.selected.kind===a.kind&&this.selected.id===a.id:i(a);let d="";i(a)?d='<span class="state">EQUIPPED</span>':h?d='<span class="state">OWNED</span>':c==="level"?d=`<span class="state lock">LOCKED · LV ${l.level}</span>`:d=`<span class="state">◆ ${l.cost}</span>`;let f="",m="",v=On(l.name);if(a.kind==="hull"){const p=Ze[a.id];f=`${p.blurb} Ability: ${sr[p.ability].name}.`,m=p.role}if(a.kind==="weapon"){const p=Ce[a.id];f=p.blurb,m=p.role}if(a.kind==="paint"){const p=ln.find(_=>_.id===a.id);v=`<span class="swatch" style="background:linear-gradient(135deg,#${p.body.toString(16).padStart(6,"0")} 55%,#${p.accent.toString(16).padStart(6,"0")} 55%)"></span>${On(p.name)}`,f="Body finish with a matching emissive trim (team colours still apply in team modes)."}let g="";return u&&!i(a)&&(h?g=`<div class="act"><button type="button" class="btn primary" data-equip="${o}">EQUIP</button></div>`:c==="ok"?g=`<div class="act"><button type="button" class="btn primary" data-buy="${o}">BUY · ◆ ${l.cost}</button></div>`:c==="credits"?g=`<div class="act"><button type="button" class="btn" disabled>NEED ◆ ${l.cost-t.credits} MORE</button></div>`:g=`<div class="act"><button type="button" class="btn" disabled>REACH LEVEL ${l.level}</button></div>`),`<div class="item${u?" selected":""}${!h&&c==="level"?" locked":""}" data-idx="${o}"><div><h5>${v}</h5>${m?`<span class="role">${m}</span>`:""}</div>${d}<p>${f}</p>${g}</div>`}).join(""),e.onclick=a=>{const o=a.target,l=o.closest("[data-equip]"),h=o.closest("[data-buy]");if(l||h){const u=n[Number((l??h).dataset.equip??(l??h).dataset.buy)];if(h&&i_(t,u)!=="ok"){this.cb.sound("deny");return}u.kind==="hull"&&(t.loadout.hull=u.id),u.kind==="weapon"&&(t.loadout.weapon=u.id),u.kind==="paint"&&(t.loadout.paint=u.id),this.cb.sound("confirm"),this.selected=null,this.cb.profileChanged(),this.renderGarage();return}const c=o.closest("[data-idx]");c&&(this.cb.sound("click"),this.selected=n[Number(c.dataset.idx)],this.renderGarage())};const r=this.previewLoadout();this.renderStats(r),this.cb.preview(r)}renderStats(t){const e=Ze[t.hull],n=Ce[t.weapon],i=t.upgrades,r=1+.06*i.damage,a=1-.06*i.reload,o=e.health,l=e.armor+7*i.armor,h=e.maxSpeed*(1+.04*i.speed),c=(n.damage+n.splashDamage)*r,u=1/(n.cooldown*a+n.charge),d=n.magazine>0?n.magazine*c/(n.magazine*n.cooldown*a+n.reloadTime*a):n.heatPerShot>0?c*Math.min(u,n.coolRate/n.heatPerShot+2):c*u,f=n.speed*n.lifetime,m=(g,p,_,M)=>`<div class="stat"><span>${g}</span><i><b style="width:${Math.min(1,p/_)*100}%"></b></i><em>${M}</em></div>`,v=sr[e.ability];tt("garageStats").innerHTML=`
      <h4>${e.name} · ${n.name}</h4>
      ${m("HULL",o,370,String(o))}
      ${m("ARMOR",l,80,String(l))}
      ${m("TOP SPEED",h,20,`${(h*3.6).toFixed(0)} km/h`)}
      ${m("TURNING",e.turnRate,2.4,`${(e.turnRate*180/Math.PI).toFixed(0)}°/s`)}
      ${m("DMG / SHOT",c,90,c.toFixed(0))}
      ${m("FIRE RATE",u,12,`${u.toFixed(1)}/s`)}
      ${m("SUSTAINED",d,80,`${d.toFixed(0)} dps`)}
      ${m("RANGE",f,280,`${f.toFixed(0)} m`)}
      ${m("TURRET",n.turretSpeed,3,`${(n.turretSpeed*180/Math.PI).toFixed(0)}°/s`)}
      <div class="ability"><b>${v.name}</b> — ${v.blurb} Recharges in ${v.chargeTime}s (faster when dealing damage).</div>`}bindSettings(){const t=this.settings,e=(r,a,o,l)=>{const h=tt(r);h.addEventListener("input",()=>{t[o]=Number(h.value),tt(a).textContent=l(Number(h.value)),this.cb.settingsChanged(t)})},n=r=>`${Math.round(r*100)}%`;e("sMaster","oMaster","masterVolume",n),e("sSfx","oSfx","sfxVolume",n),e("sMusic","oMusic","musicVolume",n),e("sSens","oSens","sensitivity",r=>r.toFixed(2)),e("sFov","oFov","fov",r=>`${r}°`),e("sSmooth","oSmooth","smoothing",n),e("sDist","oDist","cameraDistance",r=>`${r} m`);const i=(r,a)=>{const o=tt(r);o.addEventListener("change",()=>{t[a]=o.checked,this.cb.settingsChanged(t)})};i("sMute","muted"),i("sInvert","invertY"),i("sShake","shake"),i("sFps","showFps"),tt("segQuality").addEventListener("click",r=>{const a=r.target.closest("[data-quality]");a&&(this.cb.sound("click"),t.quality=a.dataset.quality,this.syncSettings(),this.cb.settingsChanged(t))})}syncSettings(){const t=this.settings,e=(n,i)=>{const r=tt(n);typeof i=="boolean"?r.checked=i:r.value=String(i),r.dispatchEvent(new Event(typeof i=="boolean"?"sync":"input"))};e("sMaster",t.masterVolume),e("sSfx",t.sfxVolume),e("sMusic",t.musicVolume),e("sSens",t.sensitivity),e("sFov",t.fov),e("sSmooth",t.smoothing),e("sDist",t.cameraDistance),e("sMute",t.muted),e("sInvert",t.invertY),e("sShake",t.shake),e("sFps",t.showFps),document.querySelectorAll("#segQuality [data-quality]").forEach(n=>n.classList.toggle("active",n.dataset.quality===t.quality)),tt("qualityNote").textContent=t.quality==="low"?"Low: no shadows, bloom or dynamic lights. Applies from the next match.":t.quality==="medium"?"Medium: soft shadows, bloom, a few dynamic lights. Applies from the next match.":"High: sharper shadows, all arena lights, higher resolution. Applies from the next match."}setPauseInfo(t){tt("pauseInfo").textContent=t}showEnd(t,e,n){const i=tt("endTitle");if(i.textContent=e.result==="win"?"VICTORY":e.result==="loss"?"DEFEAT":"DRAW",i.className=`result ${e.result}`,tt("endKicker").textContent=`${Me[t.mode].name} · ${t.arena.name} · ${Li[t.config.difficulty].name}`,Me[t.mode].teams)tt("endScore").innerHTML=`<span class="blue">RIDERS ${t.score.blue}</span> — <span class="magenta">${t.score.magenta} OUTLAWS</span>`;else{const l=t.ranking().findIndex(h=>h===t.player)+1;tt("endScore").textContent=`PLACED #${l} OF ${t.tanks.length}`}tt("endBoard").innerHTML=wu(t);const a=n.levelsGained>0?`<div class="lvup">LEVEL UP · LV ${n.newLevel}</div>`:"",o=n.unlocked.length?`<h4 style="margin-top:12px">NOW AVAILABLE</h4><ul>${n.unlocked.map(l=>`<li>${On(l)}</li>`).join("")}</ul>`:"";tt("endRewards").innerHTML=`
      <h4>REWARDS</h4>
      <div class="rw"><span>Kills / deaths / assists</span><span>${e.kills} / ${e.deaths} / ${e.assists}</span></div>
      <div class="rw"><span>Damage dealt</span><span>${Math.round(e.damage)}</span></div>
      <div class="rw"><span>Best streak</span><span>${e.bestStreak}</span></div>
      <div class="rw"><span>Experience</span><strong>+${n.xp} XP</strong></div>
      <div class="rw"><span>Credits</span><strong>+◆ ${n.credits}</strong></div>
      ${a}${o}`,this.refreshProfile(),this.show("end")}}const Hr=[{text:()=>"Drive with <kbd>W</kbd> <kbd>S</kbd> and turn the hull with <kbd>A</kbd> <kbd>D</kbd>.",done:(s,t)=>t.travelled>18},{text:()=>"Move the mouse to aim — the turret turns on its own, independent of the hull.",done:(s,t)=>t.aimed>1.2},{text:()=>"<b>Left-click</b> to fire. The small ring shows where your barrel points right now.",done:(s,t)=>t.shots>=3},{text:()=>"Hold <kbd>Shift</kbd> while driving forward to boost.",done:(s,t)=>t.boostTime>.8},{text:s=>`When the ring fills, press <kbd>Space</kbd> for <b>${sr[s.hull.ability].name}</b>.`,done:(s,t)=>t.ability||s.abilityCharge<.05},{text:()=>"<kbd>R</kbd> reloads or vents heat, <kbd>Tab</kbd> shows the score, <kbd>Esc</kbd> pauses. Good hunting!",done:(s,t)=>t.timer>7||t.kills>0}];class o_{constructor(){y(this,"active",!1);y(this,"step",0);y(this,"hold",0);y(this,"lastX",0);y(this,"lastZ",0);y(this,"lastYaw",0);y(this,"s",{travelled:0,aimed:0,shots:0,boostTime:0,ability:!1,timer:0,kills:0});y(this,"el",tt("tutorial"));y(this,"text",tt("tutText"));y(this,"stepEl",tt("tutStep"));y(this,"onFinish",null);tt("tutSkip").addEventListener("click",()=>this.finish())}start(t){this.active=!0,this.step=0,this.hold=0,Object.assign(this.s,{travelled:0,aimed:0,shots:0,boostTime:0,ability:!1,timer:0,kills:0}),this.lastX=t.x,this.lastZ=t.z,this.lastYaw=t.turretYaw,this.el.classList.remove("hidden"),this.render(t)}stop(){this.active=!1,this.el.classList.add("hidden")}finish(){this.stop(),this.onFinish?.()}noteShot(){this.s.shots++}noteAbility(){this.s.ability=!0}noteKill(){this.s.kills++}update(t,e){if(!this.active)return;const n=this.s;if(t.alive&&(n.travelled+=Math.hypot(t.x-this.lastX,t.z-this.lastZ),n.aimed+=Math.abs(ir(this.lastYaw,t.turretYaw)),t.boosting&&(n.boostTime+=e)),this.lastX=t.x,this.lastZ=t.z,this.lastYaw=t.turretYaw,this.hold>0){if(this.hold-=e,this.hold<=0){if(this.step++,this.step>=Hr.length){this.finish();return}n.timer=0,this.render(t)}return}n.timer+=e,Hr[this.step].done(t,n)&&(this.hold=.9,this.text.classList.add("done"))}render(t){this.text.classList.remove("done"),this.text.innerHTML=Hr[this.step].text(t),this.stepEl.textContent=`${this.step+1} / ${Hr.length}`}}class l_{constructor(t){y(this,"down",new Set);y(this,"pressed",new Set);y(this,"mouseDX",0);y(this,"mouseDY",0);y(this,"wheel",0);y(this,"fireHeld",!1);y(this,"locked",!1);y(this,"enabled",!1);y(this,"allowUnlocked",!1);y(this,"onLockChange",null);y(this,"cleanup",[]);y(this,"target");this.target=t,this.on(window,"keydown",e=>{const n=e;this.enabled&&["Space","Tab","ShiftLeft","ShiftRight","ArrowUp","ArrowDown"].includes(n.code)&&n.preventDefault(),this.down.has(n.code)||this.pressed.add(n.code),this.down.add(n.code)}),this.on(window,"keyup",e=>this.down.delete(e.code)),this.on(window,"blur",()=>this.releaseAll()),this.on(document,"mousemove",e=>{if(!this.locked)return;const n=e;Math.abs(n.movementX)>500||Math.abs(n.movementY)>500||(this.mouseDX+=n.movementX,this.mouseDY+=n.movementY)}),this.on(t,"mousedown",e=>{const n=e;!this.locked&&!this.allowUnlocked||n.button===0&&(this.fireHeld=!0)}),this.on(window,"mouseup",e=>{e.button===0&&(this.fireHeld=!1)}),this.on(t,"contextmenu",e=>e.preventDefault()),this.on(t,"wheel",e=>{const n=e;n.preventDefault(),this.wheel+=Math.sign(n.deltaY)},{passive:!1}),this.on(document,"pointerlockchange",()=>{this.locked=document.pointerLockElement===this.target,this.locked||(this.fireHeld=!1),this.onLockChange?.(this.locked)})}on(t,e,n,i){t.addEventListener(e,n,i),this.cleanup.push(()=>t.removeEventListener(e,n,i))}isDown(t){return this.enabled&&this.down.has(t)}wasPressed(t){return this.pressed.has(t)}axis(t,e,n,i){let r=0;return(this.isDown(t)||n!==void 0&&this.isDown(n))&&(r-=1),(this.isDown(e)||i!==void 0&&this.isDown(i))&&(r+=1),r}requestLock(){if(document.pointerLockElement!==this.target)try{const t=this.target.requestPointerLock();t instanceof Promise&&t.catch(()=>{})}catch{}}exitLock(){document.pointerLockElement&&document.exitPointerLock()}releaseAll(){this.down.clear(),this.fireHeld=!1}endFrame(){this.pressed.clear(),this.mouseDX=0,this.mouseDY=0,this.wheel=0}dispose(){this.cleanup.forEach(t=>t()),this.cleanup.length=0}}const Cu="neon-tanks.settings.v1",Tl="neon-tanks.profile.v1";function Pu(s){try{const t=window.localStorage.getItem(s);return t?JSON.parse(t):null}catch{return null}}function El(s,t){try{window.localStorage.setItem(s,JSON.stringify(t))}catch{}}const Ti=s=>typeof s=="object"&&s!==null&&!Array.isArray(s),me=(s,t,e,n)=>typeof s=="number"&&Number.isFinite(s)?Math.min(e,Math.max(t,s)):n,Ys=(s,t)=>typeof s=="boolean"?s:t,Ei=(s,t,e)=>typeof s=="string"&&t.includes(s)?s:e,c_={masterVolume:.8,sfxVolume:.85,musicVolume:.45,muted:!1,sensitivity:1,invertY:!1,fov:68,smoothing:.35,shake:!0,quality:"medium",showFps:!1,cameraDistance:12.5};function h_(){const s=Pu(Cu),t=c_;return Ti(s)?{masterVolume:me(s.masterVolume,0,1,t.masterVolume),sfxVolume:me(s.sfxVolume,0,1,t.sfxVolume),musicVolume:me(s.musicVolume,0,1,t.musicVolume),muted:Ys(s.muted,t.muted),sensitivity:me(s.sensitivity,.2,3,t.sensitivity),invertY:Ys(s.invertY,t.invertY),fov:me(s.fov,55,90,t.fov),smoothing:me(s.smoothing,0,1,t.smoothing),shake:Ys(s.shake,t.shake),quality:Ei(s.quality,["low","medium","high"],t.quality),showFps:Ys(s.showFps,t.showFps),cameraDistance:me(s.cameraDistance,5.5,22,t.cameraDistance)}:{...t}}function u_(s){El(Cu,s)}const d_=Object.keys(Ze),f_=Object.keys(Ce),p_=ln.map(s=>s.id);function so(s,t,e){const n=new Set(e);if(Array.isArray(s))for(const i of s)typeof i=="string"&&t.includes(i)&&n.add(i);return[...n]}function m_(){const s=Pu(Tl),t=Tu();if(!Ti(s))return t;const e=Ti(s.owned)?s.owned:{},n={version:1,callsign:typeof s.callsign=="string"&&s.callsign.replace(/[^\w\- ]/g,"").slice(0,14).toUpperCase()||t.callsign,level:Math.floor(me(s.level,1,el,1)),xp:Math.floor(me(s.xp,0,1e7,0)),credits:Math.floor(me(s.credits,0,1e8,t.credits)),owned:{hulls:so(e.hulls,d_,t.owned.hulls),weapons:so(e.weapons,f_,t.owned.weapons),paints:so(e.paints,p_,t.owned.paints)},loadout:t.loadout,stats:t.stats,tutorialDone:Ys(s.tutorialDone,!1),match:t.match};if(Ti(s.loadout)){const i=s.loadout,r=Ti(i.upgrades)?i.upgrades:{};n.loadout={hull:Ei(i.hull,n.owned.hulls,t.loadout.hull),weapon:Ei(i.weapon,n.owned.weapons,t.loadout.weapon),paint:Ei(i.paint,n.owned.paints,t.loadout.paint),upgrades:{damage:Math.floor(me(r.damage,0,zn,0)),armor:Math.floor(me(r.armor,0,zn,0)),speed:Math.floor(me(r.speed,0,zn,0)),reload:Math.floor(me(r.reload,0,zn,0))}}}if(Ti(s.stats)){const i=s.stats;n.stats={matches:Math.floor(me(i.matches,0,1e7,0)),wins:Math.floor(me(i.wins,0,1e7,0)),kills:Math.floor(me(i.kills,0,1e8,0)),deaths:Math.floor(me(i.deaths,0,1e8,0)),assists:Math.floor(me(i.assists,0,1e8,0)),damage:Math.floor(me(i.damage,0,1e10,0)),bestStreak:Math.floor(me(i.bestStreak,0,1e5,0)),playTime:me(i.playTime,0,1e9,0)}}if(Ti(s.match)){const i=s.match,r=Ei(i.mode,Object.keys(Me),t.match.mode);n.match={mode:r,arena:Ei(i.arena,["docks","void"],t.match.arena),difficulty:Ei(i.difficulty,Object.keys(Li),t.match.difficulty),scoreLimit:Me[r].scoreLimits.includes(i.scoreLimit)?i.scoreLimit:Me[r].defaultScore,timeLimit:Me[r].timeLimits.includes(i.timeLimit)?i.timeLimit:480}}return n}function ro(s){El(Tl,s)}function g_(){const s=Tu();return El(Tl,s),s}const v_=1/60,x_=.1,yn={t:0,x:0,y:0,z:0,nx:0,ny:0,nz:0},_e=new D,ao=new D,Vr={x:0,y:0,z:0},Gr={x:0,y:0,z:0};class __{constructor(t){y(this,"r");y(this,"garage");y(this,"input");y(this,"audio",new Mv);y(this,"hud",new t_);y(this,"menus");y(this,"tutorial",new o_);y(this,"camera",new ke(68,1,.1,2e3));y(this,"rig");y(this,"settings");y(this,"profile");y(this,"world",null);y(this,"scene",null);y(this,"phase","menu");y(this,"raf",0);y(this,"last",0);y(this,"time",0);y(this,"endTimer",-1);y(this,"wasAlive",!0);y(this,"combatHeat",0);y(this,"fpsAcc",0);y(this,"fpsFrames",0);y(this,"slowAcc",0);y(this,"fastAcc",0);y(this,"resumeLockPending",!1);y(this,"contextLost",!1);y(this,"disposed",!1);y(this,"viewW",0);y(this,"viewH",0);y(this,"cleanup",[]);y(this,"barrelScreen",{x:0,y:0,blocked:!1,ready:!0});this.settings=h_(),this.profile=m_(),this.r=new Ux(t,this.settings.quality),this.garage=new px(this.r.env),this.input=new l_(t),this.rig=new bv(this.camera),this.rig.targetDistance=this.settings.cameraDistance,this.audio.setVolumes(this.settings.masterVolume,this.settings.sfxVolume,this.settings.musicVolume,this.settings.muted),this.menus=new a_(this.profile,this.settings,{deploy:()=>this.deploy(),resume:()=>this.resume(),restart:()=>this.deploy(),quit:()=>this.quitToMenu(),settingsChanged:n=>this.applySettings(n),preview:n=>this.previewLoadout(n),profileChanged:()=>ro(this.profile),resetProgress:()=>{this.profile=g_(),this.menus.setProfile(this.profile),this.previewLoadout(this.profile.loadout),this.menus.show("menu")},sound:n=>{this.audio.unlock(),this.audio.ui(n)},screenChanged:n=>this.onScreen(n)}),this.tutorial.onFinish=()=>{this.profile.tutorialDone=!0,ro(this.profile)},this.input.onLockChange=n=>this.onLockChange(n),tt("btnLock").addEventListener("click",()=>{this.audio.unlock(),this.input.requestLock()});const e=(n,i,r)=>{n.addEventListener(i,r),this.cleanup.push(()=>n.removeEventListener(i,r))};e(window,"resize",()=>this.resize()),e(window,"keydown",n=>this.onKey(n)),e(window,"keyup",n=>{n.code==="Tab"&&this.hud.showScoreboard(!1)}),e(document,"visibilitychange",()=>{this.audio.suspend(document.hidden),document.hidden&&this.phase==="playing"&&this.pause()}),e(window,"pointerdown",()=>this.audio.unlock()),e(t,"webglcontextlost",n=>{n.preventDefault(),this.contextLost=!0,this.phase==="playing"&&this.pause(),tt("loadText").textContent="GRAPHICS CONTEXT LOST — RESTORING…",tt("loading").classList.remove("hidden")}),e(t,"webglcontextrestored",()=>{this.contextLost=!1,tt("loading").classList.add("hidden"),this.resize()}),this.previewLoadout(this.profile.loadout),this.resize(),this.menus.show("menu")}start(){this.last=performance.now();const t=e=>{if(this.disposed)return;this.raf=requestAnimationFrame(t);const n=Math.min(x_,Math.max(0,(e-this.last)/1e3));this.last=e,this.frame(n)};this.raf=requestAnimationFrame(t)}onScreen(t){this.phase==="ended"&&(t==="menu"||t==="garage"||t==="modes")&&(this.teardownMatch(),this.phase="menu"),this.input.enabled=t==="none"&&this.phase==="playing",(t==="garage"||t==="menu"||t==="modes")&&this.previewLoadout(t==="garage"?null:this.profile.loadout)}previewLoadout(t){const e=t??this.profile.loadout,n=ln.find(i=>i.id===e.paint)??ln[0];this.garage.setLook({hull:e.hull,weapon:e.weapon,body:n.body,metal:n.metal,accent:n.accent,light:16447991})}applySettings(t){this.settings=t,u_(t),this.audio.setVolumes(t.masterVolume,t.sfxVolume,t.musicVolume,t.muted),this.phase==="menu"&&t.quality!==this.r.level&&(this.r.setQuality(t.quality),this.resize())}resize(){const t=window.innerWidth,e=window.innerHeight;this.viewW=t,this.viewH=e,this.r.resize(t,e),this.camera.aspect=t/Math.max(1,e),this.camera.updateProjectionMatrix(),this.garage.resize(t,e),this.scene?.fx.setPixelScale(e*this.r.pixelRatio,this.camera.fov)}onKey(t){if(t.code==="KeyM"&&!t.repeat){this.settings.muted=!this.settings.muted,this.applySettings(this.settings),this.menus.syncSettings();return}if(t.code==="Tab"&&(this.phase==="playing"||this.phase==="ended")&&this.world){t.preventDefault(),this.hud.showScoreboard(!0);return}t.code==="Escape"&&(this.phase==="playing"&&!this.input.locked?this.pause():this.phase==="paused"&&this.menus.current==="pause"?this.resume():this.phase==="paused"&&this.menus.current==="none"?(this.resumeLockPending=!1,tt("lockPrompt").classList.add("hidden"),this.menus.show("pause")):this.menus.current!=="none"&&this.menus.current!=="menu"&&this.menus.current!=="end"&&this.menus.back())}onLockChange(t){if(t){tt("lockPrompt").classList.add("hidden"),this.phase==="paused"&&this.resumeLockPending&&this.resume();return}this.phase==="playing"&&this.pause()}deploy(){this.audio.unlock(),this.input.allowUnlocked||this.input.requestLock(),this.teardownMatch(),this.phase="loading",this.menus.show("none");const t=this.profile.match;tt("loadText").textContent=`DEPLOYING TO ${js[t.arena].name}…`,tt("loadBar").style.width="40%",tt("loading").classList.remove("hidden"),window.setTimeout(()=>this.buildMatch(),30)}buildMatch(){const t=this.profile.match;bu(t.arena),tt("loadBar").style.width="75%";const e=ln.find(i=>i.id===this.profile.loadout.paint)??ln[0];this.world=new Jx({mode:t.mode,arena:t.arena,difficulty:t.difficulty,scoreLimit:t.scoreLimit,timeLimit:t.timeLimit,player:{name:this.profile.callsign,loadout:this.profile.loadout,paint:e},seed:(Date.now()&65535)+1}),this.settings.quality!==this.r.level&&this.r.setQuality(this.settings.quality),this.scene=new Sx(this.world,this.r),this.hud.bind(this.world);const n=this.world.player;this.rig.reset(n.heading),this.rig.targetDistance=this.settings.cameraDistance,this.rig.update(0,n.x,n.y,n.z,this.world.collision,this.camSettings()),this.resize(),this.r.renderer.compile(this.scene.scene,this.camera),this.wasAlive=!0,this.endTimer=-1,this.combatHeat=0,this.menus.setPauseInfo(`${Me[t.mode].name} · ${js[t.arena].name} · ${Li[t.difficulty].name}`),tt("loading").classList.add("hidden"),tt("loadBar").style.width="100%",this.hud.show(!0),this.phase="playing",this.input.enabled=!0,this.input.releaseAll(),!this.input.locked&&!this.input.allowUnlocked&&tt("lockPrompt").classList.remove("hidden"),this.profile.tutorialDone?this.tutorial.stop():this.tutorial.start(n)}pause(){this.phase==="playing"&&(this.phase="paused",this.input.enabled=!1,this.input.releaseAll(),this.input.exitLock(),this.hud.showScoreboard(!1),tt("lockPrompt").classList.add("hidden"),this.audio.setEngine(null),this.menus.show("pause"))}resume(){if(this.phase==="paused"){if(!this.input.locked&&!this.input.allowUnlocked){this.resumeLockPending=!0,this.input.requestLock(),this.menus.show("none"),tt("lockPrompt").classList.remove("hidden"),this.phase="paused";return}this.resumeLockPending=!1,this.menus.show("none"),this.phase="playing",this.input.enabled=!0,this.last=performance.now()}}quitToMenu(){this.teardownMatch(),this.phase="menu",this.input.exitLock(),this.menus.show("menu")}teardownMatch(){this.tutorial.stop(),this.hud.show(!1),this.hud.showScoreboard(!1),tt("lockPrompt").classList.add("hidden"),this.audio.setEngine(null),this.audio.setNearbyEngine(null,0),this.scene?.dispose(),this.scene=null,this.world=null,this.resumeLockPending=!1}finishMatch(){const t=this.world,e=t.player,i={result:t.playerResult(),kills:e.stats.kills,deaths:e.stats.deaths,assists:e.stats.assists,damage:e.stats.damage,score:e.stats.score,bestStreak:e.stats.bestStreak,duration:t.config.timeLimit-t.timeLeft},r=n_(this.profile,i);ro(this.profile),this.phase="ended",this.input.enabled=!1,this.input.exitLock(),this.tutorial.stop(),this.audio.setEngine(null),this.menus.showEnd(t,i,r)}camSettings(){return{sensitivity:this.settings.sensitivity,invertY:this.settings.invertY,smoothing:this.settings.smoothing,fov:this.settings.fov,shake:this.settings.shake}}frame(t){if(this.contextLost)return;(window.innerWidth!==this.viewW||window.innerHeight!==this.viewH)&&this.resize(),this.time+=t;const e=performance.now();this.world&&this.scene&&(this.phase==="playing"||this.phase==="paused"||this.phase==="ended")?this.matchFrame(t):(this.garage.update(t,this.time),this.r.render(this.garage.scene,this.garage.camera)),this.input.endFrame(),this.perf(t,performance.now()-e)}matchFrame(t){const e=this.world,n=this.scene,i=e.player,r=this.phase==="playing"||this.phase==="ended",a=this.camSettings();if(this.phase==="playing"&&(this.rig.look(this.input.mouseDX,this.input.mouseDY,a),this.input.wheel&&this.rig.zoom(this.input.wheel),this.playerControls()),r){const h=Math.max(1,Math.ceil(t/v_-1e-6)),c=t/h;for(let u=0;u<h;u++)e.step(c),this.dispatchEvents()}i.alive&&!this.wasAlive&&this.rig.reset(i.heading),this.wasAlive=i.alive,this.rig.update(t,i.x,i.y,i.z,e.collision,a),r&&n.update(t,this.time),this.r.render(n.scene,this.camera),this.computeBarrelScreen();const{w:o,h:l}=this.r.size;if(this.hud.update(r?t:0,this.camera,this.rig.yaw,o,l,this.barrelScreen),this.phase==="playing"&&this.tutorial.update(i,t),this.rig.dir(_e),this.audio.setListener(this.camera.position.x,this.camera.position.y,this.camera.position.z,_e.x,_e.y,_e.z),this.phase==="playing"&&i.alive){this.audio.setEngine({speed:Qe(Math.abs(i.speed)/i.hull.maxSpeed,0,1.4),load:Math.abs(i.controls.throttle),boost:i.boosting,heavy:i.hull.mass/2.1});let h=null,c=45;for(const u of e.tanks){if(u===i||!u.alive)continue;const d=Math.hypot(u.x-i.x,u.z-i.z);d<c&&(c=d,h=u)}this.audio.setNearbyEngine(h?{x:h.x,y:h.y+1,z:h.z}:null,h?Math.min(1,Math.hypot(h.vx,h.vz)/14):0)}else this.phase==="playing"&&this.audio.setEngine(null);this.combatHeat=Math.max(0,this.combatHeat-t*.08),this.audio.setIntensity(this.phase==="playing"?.35+this.combatHeat*.65:.2),this.endTimer>=0&&(this.endTimer-=t,this.endTimer<0&&this.finishMatch())}playerControls(){const t=this.world,e=t.player,n=e.controls,i=this.input;n.throttle=i.axis("KeyS","KeyW","ArrowDown","ArrowUp"),n.steer=i.axis("KeyD","KeyA","ArrowRight","ArrowLeft"),n.boost=i.isDown("ShiftLeft")||i.isDown("ShiftRight"),n.fire=i.fireHeld&&i.enabled,n.ability=i.enabled&&i.wasPressed("Space"),n.reload=i.enabled&&i.wasPressed("KeyR"),this.rig.dir(_e);const r=this.camera.position;let a=420,o=r.x+_e.x*a,l=r.y+_e.y*a,h=r.z+_e.z*a;t.collision.raycast(r.x,r.y,r.z,_e.x,_e.y,_e.z,a,yn)&&(a=yn.t,o=yn.x,l=yn.y,h=yn.z);for(const _ of t.tanks){if(_===e||!_.alive)continue;const M=Mu(_,r.x,r.y,r.z,_e.x*a,_e.y*a,_e.z*a);M>=0&&(a*=M,o=r.x+_e.x*a,l=r.y+_e.y*a,h=r.z+_e.z*a)}const c=e.x,u=e.y+e.pivotHeight,d=e.z;let f=o-c,m=h-d,v=Math.hypot(f,m);v<6&&(o=c+_e.x*40,h=d+_e.z*40,l=u+_e.y*40,f=o-c,m=h-d,v=Math.hypot(f,m)),n.aimYaw=Math.atan2(f,m);const g=e.weapon,p=l-u;if(g.gravity>0){const _=g.speed,M=g.gravity,x=_*_*_*_-M*(M*v*v+2*p*_*_);n.aimPitch=x>0?Math.atan((_*_-Math.sqrt(x))/(M*v)):g.pitchMax}else n.aimPitch=Math.atan2(p,v)}computeBarrelScreen(){const t=this.world,e=t.player,n=this.barrelScreen;if(!e.alive)return;e.muzzle(Vr),e.barrelDir(Gr);const i=e.weapon;let r=Vr.x,a=Vr.y,o=Vr.z,l=Gr.x*i.speed,h=Gr.y*i.speed,c=Gr.z*i.speed;const u=i.gravity>0?.05:Math.min(.1,300/i.speed/20);let d=0,f=!1;for(let g=0;g<60;g++){h-=i.gravity*u;const p=l*u,_=h*u,M=c*u;if(t.collision.raycast(r,a,o,p,_,M,1,yn)){r=yn.x,a=yn.y,o=yn.z,d+=Math.hypot(p,_,M)*yn.t,f=d<7;break}if(r+=p,a+=_,o+=M,d+=Math.hypot(p,_,M),d>i.speed*i.lifetime)break}ao.set(r,a,o).project(this.camera);const{w:m,h:v}=this.r.size;n.x=(ao.x*.5+.5)*m,n.y=(-ao.y*.5+.5)*v,n.blocked=f,n.ready=e.cooldown<=0&&e.reloadTimer<=0&&e.overheated<=0&&!e.venting}dispatchEvents(){const t=this.world,e=this.scene,n=t.player,i=t.events;for(let r=0;r<i.count;r++){const a=i.get(r);e.handle(a),this.hud.onEvent(a);const o=a.a===n.id;switch(a.type){case"fire":{const l=Ce[a.kind].projectile;this.audio.fire(l,a,o),o&&(this.tutorial.noteShot(),(l==="rail"||l==="nova")&&this.rig.addTrauma(l==="rail"?.25:.12));break}case"charge":{const l=t.tanks[a.a];this.audio.charge(o,{x:l.x,y:l.y+2,z:l.z});break}case"impact":this.audio.impact(Ce[a.kind].projectile,a,a.a>=0);break;case"explode":{const l=t.tanks[a.a],h=a.kind==="shockwave"?{x:l.x,y:l.y,z:l.z}:a;a.kind==="shockwave"?this.audio.ability("shockwave",h,o):this.audio.explosion(h,!1);const c=Math.hypot(h.x-n.x,h.z-n.z);c<25&&this.rig.addTrauma((1-c/25)*.35);break}case"damage":a.b===n.id&&a.a!==n.id&&(this.audio.hitConfirm(!1),this.combatHeat=Math.min(1,this.combatHeat+.15)),a.a===n.id&&(this.audio.damageTaken(a.value,n.health<n.maxHealth*.3),this.rig.addTrauma(Math.min(.5,a.value/70)),this.combatHeat=Math.min(1,this.combatHeat+.2));break;case"kill":{const l=t.tanks[a.a];this.audio.explosion({x:l.x,y:l.y+1,z:l.z},!0),a.b===n.id&&a.a!==n.id&&(this.audio.hitConfirm(!0),this.tutorial.noteKill());const h=Math.hypot(l.x-n.x,l.z-n.z);o?this.rig.addTrauma(.6):h<30&&this.rig.addTrauma((1-h/30)*.5);break}case"pickup":o&&this.audio.pickup(a.kind);break;case"ability":{const l=t.tanks[a.a];a.kind!=="shockwave"&&this.audio.ability(a.kind,{x:l.x,y:l.y+1,z:l.z},o),o&&this.tutorial.noteAbility();break}case"reload":o&&this.audio.reload(!0);break;case"overheat":o&&this.audio.overheat();break;case"capture":this.audio.capture(a.kind===n.team);break;case"countdown":this.audio.countdown(a.value);break;case"matchEnd":this.audio.matchEnd(t.playerResult()==="win"),this.hud.banner(Me[t.mode].name,t.playerResult()==="win"?"VICTORY":t.playerResult()==="loss"?"DEFEAT":"DRAW",t.playerResult()==="loss"?"red":""),this.endTimer=3,this.input.enabled=!1,this.tutorial.stop();break}}i.clear()}perf(t,e){this.fpsAcc+=t,this.fpsFrames++,this.fpsAcc>=.5&&(this.hud.setFps(this.settings.showFps&&!!this.world,this.fpsFrames/this.fpsAcc),this.fpsAcc=0,this.fpsFrames=0),this.phase==="playing"&&(t>1/40||e>22?(this.slowAcc+=t,this.fastAcc=0):t<1/55&&(this.fastAcc+=t,this.slowAcc=Math.max(0,this.slowAcc-t*.5)),this.slowAcc>2&&this.r.scale>.6?(this.r.scale=Math.max(.6,this.r.scale-.1),this.slowAcc=0,this.resize()):this.fastAcc>6&&this.r.scale<1&&(this.r.scale=Math.min(1,this.r.scale+.05),this.fastAcc=0,this.resize()))}advance(t,e=1/60){for(let n=0;n<t;n+=e)this.frame(e)}setTestMode(t){this.input.allowUnlocked=t}get debug(){return{world:this.world,phase:this.phase,rig:this.rig,input:this.input,profile:this.profile}}dispose(){this.disposed=!0,cancelAnimationFrame(this.raf),this.teardownMatch(),this.cleanup.forEach(t=>t()),this.input.dispose(),this.audio.dispose(),this.garage.dispose(),this.r.dispose()}}function M_(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function mh(s){document.getElementById("loading")?.classList.add("hidden"),document.getElementById("fatalText").textContent=s,document.getElementById("fatal").classList.remove("hidden")}function y_(){if(!M_()){mh("Your browser could not start WebGL 2, which NEON TANKS needs to render the arena.");return}const s=document.getElementById("loadBar");s&&(s.style.width="60%");let t;try{t=new __(document.getElementById("scene"))}catch(e){console.error(e),mh("The game failed to start on this device. Details are in the browser console.");return}t.start(),s&&(s.style.width="100%"),window.setTimeout(()=>document.getElementById("loading")?.classList.add("hidden"),150),window.addEventListener("pagehide",()=>t.dispose(),{once:!0}),new URLSearchParams(location.search).has("debug")&&(window.__nt=t)}window.setTimeout(()=>{const s=Promise.all([document.fonts.load('700 50px "Zilla Slab"'),document.fonts.load("400 40px Rye")]).catch(()=>{});Promise.race([s,new Promise(t=>setTimeout(t,1500))]).then(y_)},30);
